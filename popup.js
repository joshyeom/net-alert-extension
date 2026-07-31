// 팝업: 상태/속도 표시 + 설정 뷰(언어/속도/알림). i18n.js 공유 모듈 사용.
const STORE_KEY = "netState";
const SPEED_KEY = "speedState";
const THRESHOLD_KEY = "speedThreshold";
const DEFAULT_THRESHOLD = 10;
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
  const obj = await chrome.storage.local.get(STORE_KEY);
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
  const obj = await chrome.storage.local.get(SPEED_KEY);
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

// ---- 설정 뷰 ----
async function getSettings() {
  const obj = await chrome.storage.local.get(SETTINGS_KEY);
  return { ...DEFAULT_SETTINGS, ...(obj[SETTINGS_KEY] || {}) };
}

async function saveSettings(patch) {
  const cur = await getSettings();
  await chrome.storage.local.set({ [SETTINGS_KEY]: { ...cur, ...patch } });
}

async function initSettingsView() {
  const s = await getSettings();

  // 언어
  const langObj = await chrome.storage.local.get(I18N_LANG_KEY);
  $("selLang").value = langObj[I18N_LANG_KEY] || "system";
  $("selLang").addEventListener("change", async (e) => {
    await chrome.storage.local.set({ [I18N_LANG_KEY]: e.target.value });
    await reloadLanguage(); // 즉시 UI 갱신
  });

  // 속도측정 토글
  $("swSpeedTest").checked = s.speedTest;
  $("swSpeedTest").addEventListener("change", (e) =>
    saveSettings({ speedTest: e.target.checked })
  );

  // 임계값
  const thObj = await chrome.storage.local.get(THRESHOLD_KEY);
  $("threshold").value = thObj[THRESHOLD_KEY] || DEFAULT_THRESHOLD;
  let thTimer;
  $("threshold").addEventListener("input", () => {
    const v = parseFloat($("threshold").value);
    if (!(v > 0)) return;
    clearTimeout(thTimer);
    thTimer = setTimeout(
      () => chrome.storage.local.set({ [THRESHOLD_KEY]: v }),
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

  const res = await chrome.runtime
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
function checkPermission() {
  chrome.notifications.getPermissionLevel((level) => {
    $("perm").classList.toggle("show", level !== "granted");
  });
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
}

// ---- 초기화 ----
(async () => {
  await reloadLanguage();
  await initSettingsView();
  checkPermission();

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "local") return;
    if (changes[STORE_KEY]) renderStatus();
    if (changes[SPEED_KEY]) renderSpeed();
  });

  // 팝업 열린 순간 SW에 실시간 재확인 요청 — 저장된 stale "연결됨" 방지.
  // 상태가 바뀌면 storage.onChanged 가 renderStatus 를 다시 호출함.
  chrome.runtime.sendMessage({ type: "checkNow" }).catch(() => {});
})();
