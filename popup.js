// 팝업: 상태/속도 표시 + 끊김 기록 뷰 + 설정 뷰(언어/속도/알림). i18n.js 공유 모듈 사용.
const STORE_KEY = "netState";
const SPEED_KEY = "speedState";
const THRESHOLD_KEY = "speedThreshold";
const DEFAULT_THRESHOLD = 10;
const LOG_KEY = "outageLog"; // SW 가 복구 시 쌓는 [{start, end, partial?}]
const RECOVERY_COUNT_KEY = "recoveryCount";
const REVIEW_DISMISSED_KEY = "reviewDismissed";
const REVIEW_MIN_RECOVERIES = 3; // 이만큼 복구를 겪은 뒤에야 리뷰를 부탁한다
const HIST_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;
const HIST_LIST_MAX = 30;
// 스토어별 리뷰 페이지. Edge·Firefox 는 게시 후 URL 확정되면 채운다(null 이면 배너 숨김).
const REVIEW_URLS = {
  chrome:
    "https://chromewebstore.google.com/detail/egidejbpdcankobpbnofddmjooiicbgg/reviews",
  edge: null,
  firefox: null,
};
const SETTINGS_KEY = "settings";
const DEFAULT_SETTINGS = {
  speedTest: true,
  speedPeriod: 10,
  notifyDown: true,
  notifyUp: true,
  notifySlow: true,
};

let DICT = {}; // 현재 언어 메시지 사전 (tSync 용)

function t(key, subs) {
  return tSync(DICT, key, subs);
}

const $ = (id) => document.getElementById(id);

// data-i18n 대신 id→key 매핑으로 정적 텍스트 채움
const TEXT_MAP = {
  hdrTitle: "popupTitle",
  setTitle: "settingsTitle",
  lblLang: "langLabel",
  optSystem: "langSystem",
  optKo: "langKo",
  optEn: "langEn",
  optEs: "langEs",
  optId: "langId",
  optTr: "langTr",
  optPtBr: "langPtBr",
  optPl: "langPl",
  grpSpeed: "speedTestLabel",
  lblSpeedTest: "speedTestLabel",
  lblThreshold: "thresholdLabel",
  lblPeriod: "speedPeriodLabel",
  optP5: "period5",
  optP10: "period10",
  optP30: "period30",
  grpNotify: "notifyLabel",
  lblNotifyDown: "notifyDownToggle",
  lblNotifyUp: "notifyUpToggle",
  lblNotifySlow: "notifySlowToggle",
  btnSpeedNow: "speedNowBtn",
  permTitle: "permTitle",
  permBody: "permBody",
  permBtn: "permBtn",
  permGuide: "permGuide",
  histTitle: "histTitle",
  histWeek: "histWeek",
  lblHistCount: "histCount",
  lblHistTotal: "histTotal",
  lblHistLongest: "histLongest",
  histEmpty: "histEmpty",
  histNote: "histPartialNote",
  btnHistClear: "histClear",
  reviewAsk: "reviewAsk",
  btnReview: "reviewBtn",
};

function applyStaticText() {
  for (const [id, key] of Object.entries(TEXT_MAP)) {
    const el = $(id);
    if (el) el.textContent = t(key);
  }
}

// ---- 메인 뷰 렌더 ----
function clock(ts) {
  if (!ts) return t("speedDash");
  const d = new Date(ts);
  const p = (n) => String(n).padStart(2, "0");
  return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

async function renderStatus() {
  const obj = await browser.storage.local.get(STORE_KEY);
  const s = obj[STORE_KEY];
  const dot = $("dot"),
    label = $("label"),
    sub = $("sub");

  if (!s || s.status === "unknown") {
    document.body.classList.remove("online", "offline");
    dot.textContent = "⚪";
    label.textContent = t("statusChecking");
    sub.textContent = "";
    return;
  }
  if (s.status === "online") {
    document.body.classList.add("online");
    document.body.classList.remove("offline");
    dot.textContent = "🟢";
    label.textContent = t("statusOnline");
  } else {
    document.body.classList.add("offline");
    document.body.classList.remove("online");
    dot.textContent = "🔴";
    label.textContent = t("statusOffline");
  }
  sub.textContent = t("lastCheck", [clock(s.lastCheckTs)]);
}

async function renderSpeed() {
  const obj = await browser.storage.local.get(SPEED_KEY);
  const s = obj[SPEED_KEY];
  const el = $("speedNow");
  const labelSpan = document.createElement("span");
  labelSpan.textContent = t("speedLabel") + " ";
  const valueB = document.createElement("b");
  if (!s || typeof s.mbps !== "number") {
    valueB.textContent = t("speedMeasuring");
    $("speedBox").classList.remove("slow");
  } else {
    valueB.textContent = t("speedValue", [s.mbps.toFixed(1)]);
    $("speedBox").classList.toggle("slow", !!s.slow);
  }
  el.replaceChildren(labelSpan, valueB);
}

// ---- 끊김 기록 ----
function formatDuration(ms) {
  const totalSec = Math.round(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) return t("durationHourMin", [String(h), String(m)]);
  if (m > 0) return t("durationMinSec", [String(m), String(s)]);
  return t("durationSec", [String(s)]);
}

function formatWhen(ts) {
  const locale = (document.documentElement.lang || "en").replace("_", "-");
  return new Date(ts).toLocaleString(locale, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

async function getLog() {
  const obj = await browser.storage.local.get(LOG_KEY);
  return Array.isArray(obj[LOG_KEY]) ? obj[LOG_KEY] : [];
}

async function renderHistory() {
  const log = await getLog();
  const since = Date.now() - HIST_WINDOW_MS;
  const week = log.filter((e) => e.end >= since);
  const total = week.reduce((acc, e) => acc + (e.end - e.start), 0);
  const longest = week.reduce((acc, e) => Math.max(acc, e.end - e.start), 0);

  $("histSummaryText").textContent = t("histSummary", [
    String(week.length),
    week.length ? formatDuration(total) : t("speedDash"),
  ]);
  $("stCount").textContent = String(week.length);
  $("stTotal").textContent = week.length ? formatDuration(total) : t("speedDash");
  $("stLongest").textContent = week.length ? formatDuration(longest) : t("speedDash");

  const rows = log
    .slice(-HIST_LIST_MAX)
    .reverse()
    .map((e) => {
      const row = document.createElement("div");
      row.className = "hrow";
      const when = document.createElement("span");
      when.textContent = formatWhen(e.start);
      const dur = document.createElement("b");
      dur.textContent = (e.partial ? "≥ " : "") + formatDuration(e.end - e.start);
      row.append(when, dur);
      return row;
    });
  $("histList").replaceChildren(...rows);
  $("histEmpty").style.display = log.length ? "none" : "block";
  $("histNote").style.display = log.some((e) => e.partial) ? "block" : "none";
  $("btnHistClear").style.display = log.length ? "block" : "none";
}

$("histSummary").addEventListener("click", () =>
  document.body.classList.add("historyOpen")
);
$("closeHistory").addEventListener("click", () =>
  document.body.classList.remove("historyOpen")
);
$("btnHistClear").addEventListener("click", () =>
  browser.storage.local.remove(LOG_KEY)
);

// ---- 리뷰 요청 배너 ----
// 보상 없는 요청은 스토어 정책상 허용. 복구를 몇 번 겪어 가치를 확인한 사용자에게만,
// 닫으면 영구히 숨긴다.
function reviewUrl() {
  if (location.protocol === "moz-extension:") return REVIEW_URLS.firefox;
  if (/Edg\//.test(navigator.userAgent)) return REVIEW_URLS.edge;
  return REVIEW_URLS.chrome;
}

async function renderReview() {
  const url = reviewUrl();
  const obj = await browser.storage.local.get([
    RECOVERY_COUNT_KEY,
    REVIEW_DISMISSED_KEY,
  ]);
  const show =
    !!url &&
    !obj[REVIEW_DISMISSED_KEY] &&
    (obj[RECOVERY_COUNT_KEY] || 0) >= REVIEW_MIN_RECOVERIES;
  $("review").classList.toggle("show", show);
}

async function dismissReview() {
  await browser.storage.local.set({ [REVIEW_DISMISSED_KEY]: true });
  $("review").classList.remove("show");
}
$("reviewClose").addEventListener("click", dismissReview);
$("btnReview").addEventListener("click", async () => {
  window.open(reviewUrl(), "_blank");
  await dismissReview();
});

// ---- 설정 뷰 ----
async function getSettings() {
  const obj = await browser.storage.local.get(SETTINGS_KEY);
  return { ...DEFAULT_SETTINGS, ...(obj[SETTINGS_KEY] || {}) };
}

async function saveSettings(patch) {
  const cur = await getSettings();
  await browser.storage.local.set({ [SETTINGS_KEY]: { ...cur, ...patch } });
}

async function initSettingsView() {
  const s = await getSettings();

  // 언어
  const langObj = await browser.storage.local.get(I18N_LANG_KEY);
  $("selLang").value = langObj[I18N_LANG_KEY] || "system";
  $("selLang").addEventListener("change", async (e) => {
    await browser.storage.local.set({ [I18N_LANG_KEY]: e.target.value });
    await reloadLanguage(); // 즉시 UI 갱신
  });

  // 속도측정 토글
  $("swSpeedTest").checked = s.speedTest;
  $("swSpeedTest").addEventListener("change", (e) =>
    saveSettings({ speedTest: e.target.checked })
  );

  // 임계값
  const thObj = await browser.storage.local.get(THRESHOLD_KEY);
  $("threshold").value = thObj[THRESHOLD_KEY] || DEFAULT_THRESHOLD;
  let thTimer;
  $("threshold").addEventListener("input", () => {
    const v = parseFloat($("threshold").value);
    if (!(v > 0)) return;
    clearTimeout(thTimer);
    thTimer = setTimeout(
      () => browser.storage.local.set({ [THRESHOLD_KEY]: v }),
      400
    );
  });

  // 측정 주기
  $("selPeriod").value = String(s.speedPeriod);
  $("selPeriod").addEventListener("change", (e) =>
    saveSettings({ speedPeriod: parseInt(e.target.value, 10) })
  );

  // 알림 토글 3종
  $("swNotifyDown").checked = s.notifyDown;
  $("swNotifyDown").addEventListener("change", (e) =>
    saveSettings({ notifyDown: e.target.checked })
  );
  $("swNotifyUp").checked = s.notifyUp;
  $("swNotifyUp").addEventListener("change", (e) =>
    saveSettings({ notifyUp: e.target.checked })
  );
  $("swNotifySlow").checked = s.notifySlow;
  $("swNotifySlow").addEventListener("change", (e) =>
    saveSettings({ notifySlow: e.target.checked })
  );
}

// 뷰 전환
$("openSettings").addEventListener("click", () =>
  document.body.classList.add("settingsOpen")
);
$("closeSettings").addEventListener("click", () =>
  document.body.classList.remove("settingsOpen")
);

// ---- 지금 측정 ----
// SW에 즉시 측정을 요청. 결과 표시는 storage.onChanged → renderSpeed 가 맡는다.
$("btnSpeedNow").addEventListener("click", async () => {
  const btn = $("btnSpeedNow");
  const err = $("speedErr");
  btn.disabled = true;
  btn.textContent = t("speedMeasuring");
  err.classList.remove("show");

  const res = await browser.runtime
    .sendMessage({ type: "speedNow" })
    .catch(() => null);

  if (!res || !res.ok) {
    err.textContent = t("speedNowFailed");
    err.classList.add("show");
  }
  btn.disabled = false;
  btn.textContent = t("speedNowBtn");
});

// ---- 권한 배너 ----
async function checkPermission() {
  // Firefox 에는 getPermissionLevel 이 없다 — 배너 판단 자체를 건너뛴다.
  if (!browser.notifications.getPermissionLevel) return;
  const level = await browser.notifications.getPermissionLevel();
  $("perm").classList.toggle("show", level !== "granted");
}
$("permBtn").addEventListener("click", () =>
  $("permGuide").classList.add("show")
);

// ---- 언어 로드/적용 ----
async function reloadLanguage() {
  const lang = await resolveLang();
  DICT = await loadMessages(lang);
  document.documentElement.lang = lang;
  applyStaticText();
  await renderStatus();
  await renderSpeed();
  await renderHistory();
}

// ---- 초기화 ----
(async () => {
  await reloadLanguage();
  await initSettingsView();
  await renderReview();
  checkPermission();

  browser.storage.onChanged.addListener((changes, area) => {
    if (area !== "local") return;
    if (changes[STORE_KEY]) renderStatus();
    if (changes[SPEED_KEY]) renderSpeed();
    if (changes[LOG_KEY]) renderHistory();
    if (changes[RECOVERY_COUNT_KEY]) renderReview();
  });

  // 팝업 열린 순간 SW에 실시간 재확인 요청 — 저장된 stale "연결됨" 방지.
  // 상태가 바뀌면 storage.onChanged 가 renderStatus 를 다시 호출함.
  browser.runtime.sendMessage({ type: "checkNow" }).catch(() => {});
})();
