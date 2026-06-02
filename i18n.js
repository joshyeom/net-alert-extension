// 공유 i18n 모듈 — SW(importScripts)와 popup(<script>) 양쪽에서 사용.
// 문자열 원본은 _locales/<lang>/messages.json 하나만 유지 (중복 금지).
// 저장된 사용자 언어(system/ko/en)에 따라 런타임 오버라이드.

const I18N_LANG_KEY = "uiLang"; // "system" | "ko" | "en"
const I18N_SUPPORTED = ["ko", "en"];
const I18N_FALLBACK = "en";

const _i18nCache = {}; // { ko: {key: "..."}, en: {...} }

// 저장된 언어 설정 → 실제 사용할 로케일 코드로 해석
async function resolveLang() {
  const obj = await chrome.storage.local.get(I18N_LANG_KEY);
  const pref = obj[I18N_LANG_KEY] || "system";
  if (pref !== "system" && I18N_SUPPORTED.includes(pref)) return pref;
  // system: Chrome UI 언어 앞 2글자로 매칭, 미지원이면 fallback
  const ui = (chrome.i18n.getUILanguage() || I18N_FALLBACK).slice(0, 2);
  return I18N_SUPPORTED.includes(ui) ? ui : I18N_FALLBACK;
}

// 해당 로케일 messages.json 로드(캐시)
async function loadMessages(lang) {
  if (_i18nCache[lang]) return _i18nCache[lang];
  const url = chrome.runtime.getURL(`_locales/${lang}/messages.json`);
  const res = await fetch(url);
  const json = await res.json();
  _i18nCache[lang] = json;
  return json;
}

// $1, $2 ... 치환 ($TIME$ 같은 named placeholder는 메시지 content가 $1로 매핑돼 있음)
function _substitute(template, subs) {
  if (!subs || !subs.length) return template;
  return template.replace(/\$(\d+)/g, (_, n) => {
    const i = parseInt(n, 10) - 1;
    return subs[i] != null ? String(subs[i]) : "";
  });
}

// 비동기 t: 특정 언어로 메시지 조회 + 치환. (SW notify 경로용)
async function tLang(key, subs) {
  const lang = await resolveLang();
  const msgs = await loadMessages(lang);
  let entry = msgs[key];
  if (!entry) {
    const fb = await loadMessages(I18N_FALLBACK);
    entry = fb[key];
  }
  if (!entry) return key;
  return _substitute(entry.message, subs);
}

// 동기 t: 미리 로드된 사전을 받아 즉시 조회 (popup 렌더용)
function tSync(dict, key, subs) {
  const entry = dict && dict[key];
  if (!entry) return key;
  return _substitute(entry.message, subs);
}
