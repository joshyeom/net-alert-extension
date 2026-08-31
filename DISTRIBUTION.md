# 멀티 스토어 배포 — Chrome · Edge · Firefox

작성일: 2026-08-31. v1.2.0부터 `package.sh`가 만드는 zip 하나를 세 스토어에 그대로 올린다.

## 한 패키지가 세 브라우저에서 도는 이유

| 항목 | 처리 | 근거 |
|---|---|---|
| 백그라운드 | `background.service_worker` + `background.scripts` 병기 | Chrome 121+는 `scripts`를 무시, Firefox 121+는 `service_worker`를 무시 |
| API 네임스페이스 | `browser.*` 사용, `i18n.js` 첫 줄에서 `globalThis.browser ??= chrome` | Chrome 148부터 `browser.*` 공식 지원. 그 이전 Chrome은 별칭으로 |
| `importScripts` | `typeof importScripts === "function"`일 때만 호출 | Firefox 이벤트 페이지엔 없음. `i18n.js`는 `scripts` 순서로 먼저 로드 |
| 핑 | `mode: "no-cors"`, 응답 도착 자체를 연결 증거로 | Firefox MV3는 `host_permissions`를 설치 시 부여하지 않음 → cors 모드면 오판 |
| 알림 권한 배너 | `notifications.getPermissionLevel` 없으면 건너뜀 | Firefox 미지원 API |
| 데이터 수집 선언 | `gecko.data_collection_permissions.required: ["none"]` | 2025-11-03 이후 AMO 신규 제출 필수, Firefox 140+ |
| 최소 버전 | `minimum_chrome_version: 121`, `gecko.strict_min_version: 140.0` | 위 두 조건 |

Chrome은 `browser_specific_settings`·`background.scripts`를 모르는 키로 경고만 띄우고 정상 동작한다.

## Firefox에서 다른 점 (알려진 한계)

- 속도 측정: `speed.cloudflare.com` 응답에 CORS 헤더가 없으면 본문을 못 읽어 "측정 실패"로 뜬다.
  사용자가 확장 관리에서 사이트 권한을 허용하면 해결. 끊김 감지 자체는 영향 없음.
- 알림 `priority`는 무시된다. 동작엔 문제 없음.
- 팝업 리뷰 배너: `popup.js`의 `REVIEW_URLS.firefox`가 `null`이라 숨겨진다. AMO 게시 후 URL을 채운다.

## 제출 절차

### Edge Add-ons (Partner Center)
1. https://partner.microsoft.com/dashboard/microsoftedge — 등록 무료, Microsoft 계정
2. "새 확장" → `net-alert-extension.zip` 업로드 (Chromium 패키지 그대로)
3. 스토어 리스팅: `STORE_LISTING.md`의 언어별 본문 재사용. 스크린샷 `promo/store-en-*.png`
4. 개인정보처리방침 URL, 지원 URL은 CWS와 동일 값
5. 심사 보통 수일. 게시되면 `REVIEW_URLS.edge`에 `https://microsoftedge.microsoft.com/addons/detail/<id>` 기입

### Firefox Add-ons (AMO)
1. https://addons.mozilla.org/developers/ — Firefox 계정
2. "새 부가 기능 제출" → 배포 방식 "AMO에 게시" → zip 업로드
3. 빌드 단계가 없으므로 소스 코드 별도 제출 불필요
4. 데이터 수집 항목은 manifest 선언(`none`)이 자동 반영된다
5. 게시되면 `REVIEW_URLS.firefox`에 `https://addons.mozilla.org/firefox/addon/<slug>/reviews/` 기입

### 제출 전 로컬 확인
- Chrome: `chrome://extensions` → 압축해제 로드
- Firefox: `about:debugging#/runtime/this-firefox` → "임시 부가 기능 로드" → `manifest.json` 선택
- Edge: `edge://extensions` → 압축해제 로드

## 리뷰 배너 동작

- 조건: 복구 알림 3회 누적(`recoveryCount`) + 현재 스토어의 리뷰 URL 존재 + 닫은 적 없음
- 닫기(✕) 또는 "리뷰 남기기" 클릭 시 `reviewDismissed = true` → 다시 뜨지 않음
- 보상 없는 리뷰 요청은 CWS 정책상 허용 ([GROWTH.md](GROWTH.md) 1절)
