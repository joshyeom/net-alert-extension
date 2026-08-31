// 인터넷 끊김 알림 — 백그라운드 service worker (MV3)
//
// 동작:
//  - browser.alarms 30초 주기로 깨어나 heartbeat 핑 실행
//  - navigator.onLine + 실제 fetch 핑 이중 검증
//  - 핑 N회 연속 실패하면 offline 판정 (오판 방지)
//  - 상태가 바뀌는 순간(online↔offline)에만 OS 알림 1회
//  - 아이콘 뱃지 색으로 현재 상태 표시
//  - 복구될 때마다 끊김 구간을 outageLog 에 누적 (팝업의 기록/통계용)
//
// Chrome 은 service worker 로, Firefox 는 이벤트 페이지(background.scripts)로
// 같은 파일을 실행한다. 이벤트 페이지엔 importScripts 가 없고 i18n.js 가
// manifest 순서대로 먼저 로드되므로 분기한다.
if (typeof importScripts === "function") importScripts("i18n.js");

const ALARM_NAME = "heartbeat";
// Chrome 120+ 최소 주기 0.5분. 5초 루프가 SW 종료로 끊겨도 30초 안에 다시 깬다.
const HEARTBEAT_PERIOD_MIN = 0.5;
const PING_TIMEOUT_MS = 5000; // 핑 1회 타임아웃
const FAIL_THRESHOLD = 3; // 이만큼 연속 실패해야 offline 판정
const FAST_LOOP_MS = 5000; // 5초 자가 재예약 루프 주기 (빠른 감지용)
// 마지막 확인 뒤 이만큼 비어 있으면 절전·브라우저 종료로 본다.
// 그 사이는 관측하지 못한 구간이라 끊김 시간에 넣지 않는다.
const GAP_MS = 3 * 60 * 1000;
const LOG_MAX = 500; // outageLog 최대 보관 건수

// 하나만 성공해도 online 으로 본다 (단일 엔드포인트 장애 오판 방지)
const PING_URLS = [
  "https://www.gstatic.com/generate_204",
  "https://www.cloudflare.com/cdn-cgi/trace",
];

// ---- 속도 측정 설정 --------------------------------------------------------
const SPEED_ALARM_NAME = "speedtest";
const SPEED_BYTES = 500000; // 500KB 다운로드로 측정
const SPEED_URL = `https://speed.cloudflare.com/__down?bytes=${SPEED_BYTES}`;
const SPEED_TIMEOUT_MS = 15000; // 느린 회선 고려
const DEFAULT_SPEED_THRESHOLD = 10; // 초기 임계값 10 Mbps

// storage 키: 마지막으로 사용자에게 통지한 상태와 부가 정보
const STORE_KEY = "netState";
const SPEED_KEY = "speedState"; // {mbps, lastTs, slow:boolean}
const THRESHOLD_KEY = "speedThreshold"; // 사용자 커스텀 임계값(Mbps)
const SETTINGS_KEY = "settings"; // {speedTest, speedPeriod, notifyDown, notifyUp, notifySlow}
const LOG_KEY = "outageLog"; // [{start, end, partial?}] 오래된 것부터, 최대 LOG_MAX
const RECOVERY_COUNT_KEY = "recoveryCount"; // 복구 누적 횟수 (팝업 리뷰 요청 조건)

const DEFAULT_SETTINGS = {
  speedTest: true, // 속도 측정 on/off
  speedPeriod: 10, // 측정 주기(분): 5/10/30
  notifyDown: true, // 끊김 알림
  notifyUp: true, // 복구 알림
  notifySlow: true, // 느림 알림
};

async function getSettings() {
  const obj = await browser.storage.local.get(SETTINGS_KEY);
  return { ...DEFAULT_SETTINGS, ...(obj[SETTINGS_KEY] || {}) };
}

// ---- 상태 모델 -------------------------------------------------------------
// netState = {
//   status: "online" | "offline" | "unknown",
//   sinceTs: number,        // 현재 status 가 시작된 시각(ms)
//   lastCheckTs: number,    // 마지막 핑 시각(ms)
//   failStreak: number,     // 연속 실패 횟수
// }

async function getState() {
  const obj = await browser.storage.local.get(STORE_KEY);
  return (
    obj[STORE_KEY] || {
      status: "unknown",
      sinceTs: Date.now(),
      lastCheckTs: 0,
      failStreak: 0,
    }
  );
}

async function setState(next) {
  await browser.storage.local.set({ [STORE_KEY]: next });
}

// 끊김 구간 1건을 로그 끝에 추가. partial=true 는 관측이 중간에 끊겨
// (절전·종료) 실제보다 짧게 기록된 구간.
async function appendOutage(start, end, partial) {
  if (!(end > start)) return;
  const obj = await browser.storage.local.get(LOG_KEY);
  const log = Array.isArray(obj[LOG_KEY]) ? obj[LOG_KEY] : [];
  const entry = { start, end };
  if (partial) entry.partial = true;
  log.push(entry);
  if (log.length > LOG_MAX) log.splice(0, log.length - LOG_MAX);
  await browser.storage.local.set({ [LOG_KEY]: log });
}

// ---- 핑 --------------------------------------------------------------------
// 엔드포인트 중 하나라도 성공하면 true.
async function pingOnce() {
  // navigator.onLine 이 false 면 fetch 시도조차 불필요 (확실히 끊김)
  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    return false;
  }

  const attempts = PING_URLS.map((url) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), PING_TIMEOUT_MS);
    // no-cors: 응답 본문·상태는 못 읽지만 "응답이 왔다" 자체가 연결 증거다.
    // Firefox MV3 는 host_permissions 가 설치 시 부여되지 않아 cors 모드면
    // CORS 헤더 없는 generate_204 가 실패로 잡혀 끊김으로 오판한다.
    return fetch(url, {
      method: "GET",
      mode: "no-cors",
      cache: "no-store",
      signal: controller.signal,
    })
      .then(() => {
        clearTimeout(timer);
        return true;
      })
      .catch(() => {
        clearTimeout(timer);
        return false;
      });
  });

  const results = await Promise.all(attempts);
  return results.some(Boolean);
}

// ---- 알림 ------------------------------------------------------------------
// 메시지는 i18n.js 의 tLang() 으로 저장된 언어에 맞춰 비동기 조회.

async function formatDuration(ms) {
  const totalSec = Math.round(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  if (min > 0) return tLang("durationMinSec", [String(min), String(sec)]);
  return tLang("durationSec", [String(sec)]);
}

function formatClock(ts) {
  const d = new Date(ts);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

async function notifyDown(ts) {
  browser.notifications.create("net-down", {
    type: "basic",
    iconUrl: browser.runtime.getURL("icons/icon128.png"),
    title: await tLang("notifyDownTitle"),
    message: await tLang("notifyDownMsg", [formatClock(ts)]),
    priority: 2,
  });
}

async function notifyUp(downDurationMs) {
  browser.notifications.create("net-up", {
    type: "basic",
    iconUrl: browser.runtime.getURL("icons/icon128.png"),
    title: await tLang("notifyUpTitle"),
    message: await tLang("notifyUpMsg", [await formatDuration(downDurationMs)]),
    priority: 2,
  });
}

// ---- 뱃지 ------------------------------------------------------------------
function setBadge(status) {
  if (status === "offline") {
    browser.action.setBadgeBackgroundColor({ color: "#e53935" }); // 빨강
    browser.action.setBadgeText({ text: "!" });
  } else if (status === "online") {
    browser.action.setBadgeBackgroundColor({ color: "#43a047" }); // 초록
    browser.action.setBadgeText({ text: "" }); // 정상은 깔끔하게 비움
  } else {
    browser.action.setBadgeText({ text: "" });
  }
}

// ---- 속도 측정 -------------------------------------------------------------
async function notifySlow(mbps, threshold) {
  browser.notifications.create("net-slow", {
    type: "basic",
    iconUrl: browser.runtime.getURL("icons/icon128.png"),
    title: await tLang("notifySlowTitle"),
    message: await tLang("notifySlowMsg", [mbps.toFixed(1), String(threshold)]),
    priority: 1,
  });
}

async function getThreshold() {
  const obj = await browser.storage.local.get(THRESHOLD_KEY);
  const v = obj[THRESHOLD_KEY];
  return typeof v === "number" && v > 0 ? v : DEFAULT_SPEED_THRESHOLD;
}

// 500KB 다운로드 시간으로 Mbps 계산. 실패하면 null 반환(끊김 등).
// 시간은 요청 시작이 아니라 첫 청크 도착부터 잼 — TTFB(서버 대기·TLS)가
// 섞이면 빠른 회선일수록 값이 지연시간에 좌우돼 오차가 커지기 때문.
async function measureSpeed() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SPEED_TIMEOUT_MS);
  const reqStart = Date.now();
  try {
    const res = await fetch(SPEED_URL, {
      method: "GET",
      cache: "no-store",
      signal: controller.signal,
    });
    if (!res.ok || !res.body) {
      clearTimeout(timer);
      return null;
    }
    const reader = res.body.getReader();
    let firstChunkTs = 0;
    let totalBytes = 0;
    let bytesAfterFirst = 0;
    let lastChunkTs = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      const now = Date.now();
      totalBytes += value.byteLength;
      if (!firstChunkTs) {
        firstChunkTs = now;
      } else {
        bytesAfterFirst += value.byteLength;
        lastChunkTs = now;
      }
    }
    clearTimeout(timer);
    const elapsedSec = (lastChunkTs - firstChunkTs) / 1000;
    if (elapsedSec > 0 && bytesAfterFirst > 0) {
      return (bytesAfterFirst * 8) / elapsedSec / 1_000_000; // Mbps
    }
    // 본문이 사실상 한 청크로 온 경우 — 전체 시간 기준으로 폴백
    const totalSec = (Date.now() - reqStart) / 1000;
    if (totalSec <= 0 || totalBytes <= 0) return null;
    return (totalBytes * 8) / totalSec / 1_000_000;
  } catch {
    clearTimeout(timer);
    return null;
  }
}

// 팝업의 "지금 측정" — 주기 설정(speedTest)과 무관하게 즉시 측정.
// 사용자가 화면을 보고 있으므로 느림 알림은 띄우지 않는다(결과가 팝업에 바로 보임).
// 진행 중이면 같은 측정을 공유해 중복 다운로드를 막는다.
let speedNowRun = null;

// 순차 3회 측정 후 최대값 — 단발 측정은 스톨·순간 혼잡으로 실제보다 낮게만
// 나오므로(링크보다 빨리 받을 수는 없음) 최대값이 회선 용량에 가장 가깝다.
async function measureSpeedNow() {
  const samples = [];
  for (let i = 0; i < 3; i++) {
    const v = await measureSpeed();
    if (v != null) samples.push(v);
  }
  if (samples.length === 0) return null;
  const mbps = Math.max(...samples);
  const threshold = await getThreshold();
  await browser.storage.local.set({
    [SPEED_KEY]: { mbps, lastTs: Date.now(), slow: mbps < threshold },
  });
  return mbps;
}

async function checkSpeed() {
  const settings = await getSettings();
  if (!settings.speedTest) return; // 측정 끄면 스킵

  // 끊긴 상태면 속도측정 무의미 — 스킵
  const net = await getState();
  if (net.status === "offline") return;

  const mbps = await measureSpeed();
  if (mbps == null) return; // 측정 실패는 조용히 무시 (끊김 알림이 따로 처리)

  const threshold = await getThreshold();
  const prevObj = await browser.storage.local.get(SPEED_KEY);
  const prev = prevObj[SPEED_KEY] || { slow: false };

  const slow = mbps < threshold;
  // 정상→느림 전환 순간에만 알림 (계속 느려도 반복 알림 안 함)
  if (slow && !prev.slow && settings.notifySlow) {
    await notifySlow(mbps, threshold);
  }

  await browser.storage.local.set({
    [SPEED_KEY]: { mbps, lastTs: Date.now(), slow },
  });
}

// ---- 핵심: 핑 → 상태 전환 판정 ---------------------------------------------
async function checkAndUpdate() {
  const now = Date.now();
  let prev = await getState();

  // 관측 공백(절전·브라우저 종료) 뒤 첫 확인: 공백 전 상태를 이어 붙이면
  // "5시간 만에 복구" 같은 허위 다운타임이 나온다. 끊긴 채로 공백에 들어갔다면
  // 마지막으로 실제 본 시각까지만 partial 로 기록하고, 상태는 처음부터 다시 판정한다.
  if (prev.lastCheckTs > 0 && now - prev.lastCheckTs > GAP_MS) {
    if (prev.status === "offline") {
      await appendOutage(prev.firstFailTs || prev.sinceTs, prev.lastCheckTs, true);
    }
    prev = { status: "unknown", sinceTs: now, lastCheckTs: 0, failStreak: 0 };
  }

  const alive = await pingOnce();

  let failStreak = alive ? 0 : prev.failStreak + 1;

  // 끊김 시작 추정 시각: 첫 실패 순간을 기록(복구 시 다운타임 정확 계산용)
  let firstFailTs = prev.firstFailTs || 0;
  if (alive) firstFailTs = 0;
  else if (prev.failStreak === 0) firstFailTs = now; // 이번이 첫 실패

  // 실제 연결 여부 판정: 성공이면 online, 실패가 임계치 이상이면 offline.
  // 임계치 미만 실패는 아직 판정 보류(이전 상태 유지) — 일시 오류 흡수.
  let nextStatus = prev.status;
  if (alive) {
    nextStatus = "online";
  } else if (failStreak >= FAIL_THRESHOLD) {
    nextStatus = "offline";
  }

  const changed = nextStatus !== prev.status && prev.status !== "unknown";
  const firstResolve = prev.status === "unknown" && nextStatus !== "unknown";

  // 알림 조건:
  //  - changed: online↔offline 전환 순간
  //  - 첫 판정이 offline: unknown→offline 도 끊김 알림해야 함.
  //    (SW가 끊긴 상태에서 재기동되면 status가 unknown으로 리셋되는데,
  //     이때 changed=false 라 끊김 알림이 누락되던 버그)
  //    단, 첫 판정이 online 인 경우는 "복구" 토스트가 아니므로 알림 안 함.
  const notifyTransition = changed || (firstResolve && nextStatus === "offline");
  if (notifyTransition) {
    const settings = await getSettings();
    if (nextStatus === "offline") {
      if (settings.notifyDown) await notifyDown(now);
    } else if (nextStatus === "online") {
      // 첫 실패 시점부터 복구까지 = 실제 다운타임 (없으면 status 시작 시점 폴백)
      const downStart = prev.firstFailTs || prev.sinceTs;
      if (settings.notifyUp) await notifyUp(now - downStart);
      await appendOutage(downStart, now, false);
      const cnt = await browser.storage.local.get(RECOVERY_COUNT_KEY);
      await browser.storage.local.set({
        [RECOVERY_COUNT_KEY]: (cnt[RECOVERY_COUNT_KEY] || 0) + 1,
      });
    }
  }

  const next = {
    status: nextStatus,
    sinceTs: nextStatus !== prev.status ? now : prev.sinceTs,
    lastCheckTs: now,
    failStreak,
    firstFailTs,
  };
  await setState(next);

  if (changed || firstResolve) setBadge(nextStatus);
  // 첫 부팅시 뱃지 초기화
  else if (prev.status === "unknown") setBadge(nextStatus);
}

// ---- 빠른 감지 루프 (5초 자가 재예약) --------------------------------------
// browser.alarms 최소 주기는 1분이라 빠른 끊김 감지가 불가능.
// setTimeout 을 매번 재예약해 ~5초 간격으로 핑한다. 단일 타이머라 중첩 없음.
// 기존 1분 알람은 SW가 죽었다 깨어날 때를 대비한 fallback 으로 유지.
let fastLoopTimer = null;

function scheduleFastLoop() {
  if (fastLoopTimer) clearTimeout(fastLoopTimer);
  fastLoopTimer = setTimeout(async () => {
    try {
      await checkAndUpdate();
    } finally {
      scheduleFastLoop(); // 끝나면 다음 틱 재예약 (재귀 단일 타이머)
    }
  }, FAST_LOOP_MS);
}

// ---- 부팅 / 알람 등록 ------------------------------------------------------
async function ensureAlarm() {
  const existing = await browser.alarms.get(ALARM_NAME);
  // 없거나 주기가 다르면(구버전 1분 알람) 재생성. delayInMinutes 로 즉시 1회 가깝게.
  if (!existing || existing.periodInMinutes !== HEARTBEAT_PERIOD_MIN) {
    browser.alarms.create(ALARM_NAME, {
      delayInMinutes: 0.1,
      periodInMinutes: HEARTBEAT_PERIOD_MIN,
    });
  }
  await syncSpeedAlarm();
}

// 속도측정 알람을 현재 설정(on/off, 주기)에 맞춰 생성/갱신/제거
async function syncSpeedAlarm() {
  const settings = await getSettings();
  const existing = await browser.alarms.get(SPEED_ALARM_NAME);

  if (!settings.speedTest) {
    if (existing) await browser.alarms.clear(SPEED_ALARM_NAME);
    return;
  }
  // 주기 바뀌었거나 알람 없으면 재생성
  if (!existing || existing.periodInMinutes !== settings.speedPeriod) {
    browser.alarms.create(SPEED_ALARM_NAME, {
      delayInMinutes: 0.2,
      periodInMinutes: settings.speedPeriod,
    });
  }
}

browser.runtime.onInstalled.addListener(() => {
  ensureAlarm();
  checkAndUpdate();
  checkSpeed();
  scheduleFastLoop();
});

browser.runtime.onStartup.addListener(() => {
  ensureAlarm();
  checkAndUpdate();
  checkSpeed();
  scheduleFastLoop();
});

browser.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === ALARM_NAME) {
    checkAndUpdate();
    // SW가 죽었다 알람으로 깨어났으면 루프가 멈춰있음 — 다시 가동
    if (!fastLoopTimer) scheduleFastLoop();
  } else if (alarm.name === SPEED_ALARM_NAME) checkSpeed();
});

// 브라우저의 즉각적인 online/offline 이벤트도 활용 (alarms 1분 기다리지 않고 빠르게 반영)
self.addEventListener("online", () => checkAndUpdate());
self.addEventListener("offline", () => checkAndUpdate());

// 팝업이 열릴 때 즉시 재확인 요청 (저장된 stale 상태 대신 실시간 반영)
browser.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg && msg.type === "checkNow") {
    // 루프가 멈춰있으면 같이 되살림 (SW 깨어난 김에)
    if (!fastLoopTimer) scheduleFastLoop();
    checkAndUpdate().then(() => sendResponse({ ok: true }));
    return true; // 비동기 응답 유지
  }
  if (msg && msg.type === "speedNow") {
    if (!speedNowRun) {
      speedNowRun = measureSpeedNow().finally(() => {
        speedNowRun = null;
      });
    }
    speedNowRun
      .then((mbps) => sendResponse({ ok: mbps != null, mbps }))
      .catch(() => sendResponse({ ok: false }));
    return true; // 비동기 응답 유지
  }
});

// 알림 클릭하면 닫기
browser.notifications.onClicked.addListener((id) => {
  browser.notifications.clear(id);
});

// 설정(속도측정 on/off·주기) 바뀌면 알람 즉시 동기화
browser.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes[SETTINGS_KEY]) syncSpeedAlarm();
});

// SW 스크립트가 평가될 때마다 즉시 가동 — onInstalled/onStartup 은
// 확장 reload(↻) 시 호출되지 않으므로 여기서 루프와 알람·핑을 보장한다.
ensureAlarm();
checkAndUpdate();
scheduleFastLoop();
