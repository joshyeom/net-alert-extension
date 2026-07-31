// ============================================================
//  수동 테스트 스크립트 — 서비스 워커 콘솔에 통째로 붙여넣기
//  chrome://extensions → "인터넷 끊김 알림" → "서비스 워커" → Console
//  붙여넣은 뒤:  await test.all()   또는 개별:  await test.notifyDown()
//  (SW 내부 함수에 의존하지 않고 chrome API를 직접 호출 — 독립 실행)
// ============================================================
(() => {
  const ICON = chrome.runtime.getURL("icons/icon128.png");
  const SETTINGS_KEY = "settings";
  const STORE_KEY = "netState";
  const SPEED_KEY = "speedState";
  const THRESHOLD_KEY = "speedThreshold";
  const LANG_KEY = "uiLang";

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const log = (...a) => console.log("%c[TEST]", "color:#1e88e5;font-weight:bold", ...a);
  const ok = (cond, msg) =>
    console.log(`%c${cond ? "✓ PASS" : "✗ FAIL"}%c ${msg}`,
      `color:${cond ? "#43a047" : "#e53935"};font-weight:bold`, "color:inherit");

  // 저장된 언어로 messages.json 직접 로드 (i18n.js 와 동일 규칙)
  const SUPPORTED = ["ko", "en", "es", "id", "tr", "pt_BR", "pl"], FB = "en";
  async function resolveLang() {
    const o = await chrome.storage.local.get(LANG_KEY);
    const pref = o[LANG_KEY] || "system";
    if (pref !== "system" && SUPPORTED.includes(pref)) return pref;
    const ui = (chrome.i18n.getUILanguage() || FB).slice(0, 2);
    return SUPPORTED.includes(ui) ? ui : FB;
  }
  async function dict() {
    const lang = await resolveLang();
    const res = await fetch(chrome.runtime.getURL(`_locales/${lang}/messages.json`));
    return { lang, msgs: await res.json() };
  }
  function sub(t, s) {
    return s && s.length ? t.replace(/\$(\d+)/g, (_, n) => (s[+n - 1] ?? "")) : t;
  }

  let _nCounter = 0;
  async function notify(id, title, message, priority = 2) {
    // 테스트에선 ID를 유니크하게 — 같은 ID면 macOS가 이전 알림을 교체해 1개만 남음
    const uid = `${id}-${++_nCounter}`;
    return new Promise((resolve) => {
      chrome.notifications.create(uid, { type: "basic", iconUrl: ICON, title, message, priority },
        (cid) => { ok(!chrome.runtime.lastError, `notify "${uid}" 생성` +
          (chrome.runtime.lastError ? ` — ${chrome.runtime.lastError.message}` : "")); resolve(cid); });
    });
  }

  const test = {
    // ---- 알림 3종 (현재 언어로) ----
    async notifyDown() {
      const { lang, msgs } = await dict();
      log(`끊김 알림 (lang=${lang})`);
      const clock = new Date().toTimeString().slice(0, 5);
      return notify("net-down", sub(msgs.notifyDownTitle.message),
        sub(msgs.notifyDownMsg.message, [clock]));
    },
    async notifyUp() {
      const { lang, msgs } = await dict();
      log(`복구 알림 (lang=${lang})`);
      const dur = sub(msgs.durationMinSec.message, ["3", "12"]);
      return notify("net-up", sub(msgs.notifyUpTitle.message),
        sub(msgs.notifyUpMsg.message, [dur]));
    },
    async notifySlow() {
      const { lang, msgs } = await dict();
      log(`느림 알림 (lang=${lang})`);
      return notify("net-slow", sub(msgs.notifySlowTitle.message),
        sub(msgs.notifySlowMsg.message, ["3.2", "10"]), 1);
    },

    // ---- 언어 전환 ----
    async lang(code) {
      await chrome.storage.local.set({ [LANG_KEY]: code });
      const { lang, msgs } = await dict();
      log(`언어 설정=${code} → 해석된 로케일=${lang}`);
      ok(msgs.statusOnline, `messages.json 로드됨: statusOnline="${msgs.statusOnline.message}"`);
      log("↑ 팝업 다시 열어 UI 언어 확인. 알림은 test.notifyDown() 으로 확인.");
      return lang;
    },

    // ---- 상태 시뮬레이션 (뱃지/팝업 반영 확인) ----
    async simulate(status) {
      const now = Date.now();
      await chrome.storage.local.set({
        [STORE_KEY]: { status, sinceTs: now, lastCheckTs: now, failStreak: status === "offline" ? 2 : 0, firstFailTs: status === "offline" ? now : 0 },
      });
      // 뱃지 직접 반영
      if (status === "offline") {
        chrome.action.setBadgeBackgroundColor({ color: "#e53935" });
        chrome.action.setBadgeText({ text: "!" });
      } else {
        chrome.action.setBadgeBackgroundColor({ color: "#43a047" });
        chrome.action.setBadgeText({ text: "" });
      }
      log(`상태=${status} 저장 + 뱃지 반영. 팝업 열어 확인.`);
      ok(true, `simulate(${status})`);
    },

    // ---- 속도 상태 주입 (팝업 속도 표시 확인) ----
    async setSpeed(mbps, threshold = 10) {
      await chrome.storage.local.set({
        [SPEED_KEY]: { mbps, lastTs: Date.now(), slow: mbps < threshold },
        [THRESHOLD_KEY]: threshold,
      });
      log(`속도=${mbps} Mbps (기준 ${threshold}) 주입. 팝업서 ${mbps < threshold ? "빨강(느림)" : "정상"} 표시 예상.`);
      ok(true, `setSpeed(${mbps})`);
    },

    // ---- 설정 검증 (저장/로드 라운드트립) ----
    async settings() {
      log("설정 저장/로드 라운드트립 테스트");
      const before = (await chrome.storage.local.get(SETTINGS_KEY))[SETTINGS_KEY];
      const probe = { speedTest: false, speedPeriod: 30, notifyDown: false, notifyUp: true, notifySlow: false };
      await chrome.storage.local.set({ [SETTINGS_KEY]: probe });
      const after = (await chrome.storage.local.get(SETTINGS_KEY))[SETTINGS_KEY];
      ok(JSON.stringify(after) === JSON.stringify(probe), "설정 저장→로드 일치");
      // 알람 동기화 확인 (speedTest=false 면 speedtest 알람 제거돼야)
      await sleep(300);
      const alarm = await chrome.alarms.get("speedtest");
      ok(!alarm, "speedTest=false → speedtest 알람 제거됨");
      // 원복
      if (before) await chrome.storage.local.set({ [SETTINGS_KEY]: before });
      else await chrome.storage.local.remove(SETTINGS_KEY);
      log("설정 원복 완료");
    },

    // ---- 핑 실제 동작 (엔드포인트 살아있나) ----
    async ping() {
      log("핑 엔드포인트 실제 호출");
      for (const url of ["https://www.gstatic.com/generate_204", "https://www.cloudflare.com/cdn-cgi/trace"]) {
        try {
          const r = await fetch(url, { cache: "no-store" });
          ok(r.ok || r.status === 204, `${url} → ${r.status}`);
        } catch (e) { ok(false, `${url} → ${e.message}`); }
      }
    },

    // ---- 속도 측정 실측 ----
    async measure() {
      log("실제 속도 측정 (500KB 다운로드)");
      const start = Date.now();
      try {
        const r = await fetch("https://speed.cloudflare.com/__down?bytes=500000", { cache: "no-store" });
        const buf = await r.arrayBuffer();
        const sec = (Date.now() - start) / 1000;
        const mbps = (buf.byteLength * 8) / sec / 1e6;
        ok(buf.byteLength === 500000, `500KB 수신 (${buf.byteLength}B), ${mbps.toFixed(1)} Mbps`);
      } catch (e) { ok(false, `측정 실패: ${e.message}`); }
    },

    // ---- "지금 측정" 경로 (팝업 버튼이 부르는 SW 함수) ----
    // SW가 자기 자신에게 보낸 sendMessage 는 수신되지 않으므로 함수를 직접 호출한다.
    async speedNow() {
      log('"지금 측정" — measureSpeedNow() 직접 호출');
      if (typeof measureSpeedNow !== "function") {
        ok(false, "measureSpeedNow 없음 — 서비스 워커 콘솔에서 실행했는지 확인");
        return;
      }
      const mbps = await measureSpeedNow();
      ok(typeof mbps === "number" && mbps > 0, `측정값 ${mbps?.toFixed?.(1)} Mbps`);
      const s = (await chrome.storage.local.get(SPEED_KEY))[SPEED_KEY];
      ok(s && s.mbps === mbps, "speedState 에 결과 저장됨");
    },

    // ---- 전체 순차 실행 ----
    async all() {
      console.log("%c═══ 전체 테스트 시작 ═══", "color:#1e88e5;font-size:14px;font-weight:bold");
      await test.ping();
      await test.measure();
      await test.speedNow();
      await test.settings();

      log("─── 한국어 알림 3종 (알림센터에 쌓임) ───");
      await test.lang("ko");
      await test.notifyDown(); await sleep(2500);
      await test.notifyUp(); await sleep(2500);
      await test.notifySlow(); await sleep(2500);

      log("─── 영어 알림 3종 ───");
      await test.lang("en");
      await test.notifyDown(); await sleep(2500);
      await test.notifyUp(); await sleep(2500);
      await test.notifySlow(); await sleep(2500);

      log("─── 언어 시스템 복원 ───");
      await test.lang("system");

      log("─── 상태/속도 시뮬레이션 ───");
      await test.simulate("offline"); await sleep(800);
      await test.simulate("online");
      await test.setSpeed(3.2, 10); await sleep(400);
      await test.setSpeed(85, 10);

      console.log("%c═══ 전체 테스트 끝 ═══", "color:#43a047;font-size:14px;font-weight:bold");
      log("알림 6개 떴는지 + PASS/FAIL 로그 + 팝업 직접 확인.");
    },
  };

  globalThis.test = test;
  console.log("%c테스트 준비 완료.", "color:#43a047;font-weight:bold",
    "\n  await test.all()       전체 실행",
    "\n  await test.notifyDown/Up/Slow()",
    "\n  await test.lang('en'|'ko'|'system')",
    "\n  await test.simulate('offline'|'online')",
    "\n  await test.setSpeed(3.2, 10)",
    "\n  await test.settings() / test.ping() / test.measure()");
})();
