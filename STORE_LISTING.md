# Chrome Web Store — Listing Material

복사해서 개발자 대시보드에 붙여넣는 용도. 영문/국문 둘 다 준비.

---

## 1. Short description (≤132자)

**EN:** Instantly alerts you when your internet actually goes down or recovers — even when the Wi-Fi icon still looks connected.

**KO:** 와이파이는 멀쩡해 보여도 실제 인터넷이 끊기면 즉시 알려주고, 복구되면 알려줍니다.

---

## 2. Detailed description (스토어 본문)

### EN

> 2026-07-29 대시보드에 반영된 실제 본문. 후킹 문구 + 검색어(internet down,
> wifi not working, network outage, speed test 등)를 자연스럽게 녹임.
> 미출시 기능(v1.1.0 "지금 측정")은 게시 전까지 넣지 않는다.

```
Your Wi-Fi icon lies. Internet Down Alert tells the truth.

A full Wi-Fi signal only means your router is reachable. It says nothing about whether the internet actually works. Internet Down Alert checks the real internet every few seconds and tells you the exact moment your connection drops, and the exact moment it comes back.

WHY PEOPLE KEEP IT INSTALLED

"Is the internet down, or is it just me?" You get the answer in seconds instead of reloading a page over and over.

"Did the call freeze because of my network?" The toolbar badge turns red the moment your connection is actually gone, so you stop guessing.

"How long was I offline?" The recovery notification tells you exactly, which matters when you have to explain a gap to a client or a team.

FEATURES

- Instant desktop notification when the internet goes down
- Recovery notification showing exactly how long you were offline
- Slow connection warning when your speed drops below a threshold you choose
- Automatic internet speed test on your own schedule (5, 10 or 30 minutes)
- Toolbar badge shows current connection status at a glance
- Every notification can be turned off individually
- English and Korean, following your system language or set manually
- No account, no sign-up, no analytics, no tracking, no data collection

WHO IT IS FOR

- Remote workers and video call users who cannot afford to miss a dropout
- Streamers, uploaders and traders who need to know the instant they go offline
- Anyone on unstable Wi-Fi, cafe networks, hotel networks or mobile tethering
- Support and ops people who need to separate a network outage from an app bug

HOW IT WORKS

The extension sends a tiny connectivity check to public endpoints run by Google and Cloudflare. If several checks in a row fail, it treats the connection as genuinely down, so a single hiccup does not trigger a false alarm. You are notified only when the status actually changes, never repeatedly.

PRIVACY

Everything stays on your device. Settings and connection status are stored locally through Chrome storage. Nothing is uploaded, sold or shared, and there is no account to create.
```

### KO

**와이파이 아이콘은 거짓말을 합니다. 이 확장 프로그램은 진실을 알려줍니다.**

와이파이 신호가 가득 차 있어도 그건 공유기까지만 연결됐다는 뜻입니다 —
실제 인터넷이 된다는 보장이 아닙니다. 인터넷 끊김 알림은 주기적으로 진짜
인터넷에 핑을 보내, 연결이 실제로 끊긴 순간과 복구된 순간을 알려줍니다.

**기능**
- 🔴 인터넷이 끊기면 즉시 데스크톱 알림
- 🟢 복구 시 알림 + 끊겨 있던 시간 표시
- ⚡ 원할 때 바로 속도 측정 — 팝업에서 클릭 한 번
- 🐢 사용자 지정 기준 미만이면 속도 저하 경고 (선택)
- 🎛️ 툴바 뱃지로 현재 상태 한눈에
- 🌐 한국어 / 영어, 시스템 언어 자동 또는 수동 선택
- 🔒 계정·추적·데이터 수집 없음 — 모든 데이터는 기기 내부에만

**이런 분께**
- 끊김을 놓치면 안 되는 원격근무자·화상회의 사용자
- 송출 중 끊김을 즉시 알아야 하는 스트리머·업로더
- 불안정한 회선에서 "방금 끊겼나?" 확인하고 싶은 누구나

동작 방식: 약 1분마다 공개 엔드포인트(Google / Cloudflare)로 아주 작은
연결 확인 요청을 보냅니다. 상태가 실제로 바뀔 때만 알림 — 스팸 없음.

---

## 3. Permission justification (대시보드 "권한 사유")

스토어가 각 권한·호스트의 사용 이유를 묻습니다. 아래 그대로 사용:

- **alarms** — Schedule a connectivity check roughly once per minute while the
  browser is running.
- **notifications** — Display a desktop notification only when the connection
  state changes (down / recovered / slow).
- **storage** — Persist user settings and the last known status locally via
  `storage.local`. Nothing is sent anywhere.
- **Host permission `www.gstatic.com`** — Send an empty HTTP 204 connectivity
  check (`/generate_204`) to detect whether the internet is reachable.
- **Host permission `www.cloudflare.com`** — Fallback connectivity check
  (`/cdn-cgi/trace`) so a single endpoint outage is not mistaken for an
  internet outage.
- **Host permission `speed.cloudflare.com`** — Download a small test file
  (`/__down`) to measure connection speed for the optional slow-connection
  warning.

**Remote code:** None. No remote/eval code is executed; all logic ships in the
package.

**Data usage disclosure (대시보드 체크):**
- Does NOT collect or use personal/sensitive user data.
- Check: "I do not sell or transfer user data to third parties."
- Check: "I do not use or transfer user data for purposes unrelated to the
  item's single purpose."

---

## 4. Single purpose (단일 목적 — 필수 입력)

Detect and notify the user when their device's internet connectivity actually
goes down or recovers, with an optional slow-connection warning.

---

## 5. Category & Privacy URL (대시보드 입력값)

- **Category:** Productivity
- **Language:** English (기본 언어)
  - 확장 이름은 두 로케일 모두 영문 `Internet Down Alert` 로 통일 (2026-07-29)
  - 스토어 **등록정보는 로케일별로 따로 입력**해야 함 (자동 번역 안 됨).
    대시보드 → 스토어 등록정보 → 언어 선택에서 `한국어 – ko` 를 골라
    위 2번 KO 본문과 `promo/store-screenshot-ko.png` 를 별도로 등록.
- **Privacy policy URL** (그대로 붙여넣기):
  ```
  https://preview-ashy.vercel.app/net-alert-privacy.html
  ```
  `joshyeom/preview` repo(private)의 `net-alert-privacy.html` 을 Vercel 이
  공개 서빙한다. 이 repo 를 private 로 유지하면서 정책 문서만 공개하기 위한 구조.
  원본 문구는 `PRIVACY.md` 와 동일하며 수정 시 **양쪽 모두** 갱신할 것.

  경고 이력: `raw.githubusercontent.com` URL 은 repo 가 private 이라 404 →
  2026-06-30 "링크가 작동하지 않거나 없습니다" 위반. 링크는 로그인 없이
  200 이어야 한다.

  ⚠️ 이 repo 를 private 로 되돌리면 함께 죽는 링크:
  - 대시보드 **지원 URL** (`.../issues`) → 비우면 Google 기본 지원 폼이 대체
  - 대시보드 **홈페이지 URL** (repo 루트) → 비우거나 스토어 페이지로
  - `manifest.json` 의 `homepage_url` → 스토어 상세 페이지로 교체 (v1.1.0 반영 완료)
  - `PRIVACY.md` 문의 링크 → HTML 판은 스토어 지원 링크로 이미 교체

---

## 6. 업로드용 스크린샷 / 프로모 자산 (검증 완료)

| 자산 | 파일 | 크기 | 규격 |
|------|------|------|------|
| 스크린샷 EN 1 · 히어로 | `promo/store-en-1.png` | 1280×800 | ✅ 필수 |
| 스크린샷 EN 2 · 끊김/복구 알림 | `promo/store-en-2.png` | 1280×800 | ✅ 권장 |
| 스크린샷 EN 3 · 즉시 속도 측정 | `promo/store-en-3.png` | 1280×800 | ✅ 권장 |
| 스크린샷 EN 4 · 설정/프라이버시 | `promo/store-en-4.png` | 1280×800 | ✅ 권장 |
| 스크린샷 (EN, 구버전) | `promo/store-screenshot.png` | 1280×800 | 대체됨 |
| 스크린샷 (KO) | `promo/store-screenshot-ko.png` | 1280×800 | ✅ 선택 |
| 작은 프로모 타일 | `promo/tile-small.png` | 440×280 | ✅ 권장 |
| 마퀴 프로모 타일 | `promo/tile-marquee.png` | 1400×560 | ✅ 선택 |
| 스토어 아이콘 | `icons/icon128.png` | 128×128 | ✅ 필수 |

---

## 7. 등록 체크리스트

작성으로 끝난 항목 (✅) / 사용자 액션 필요 (⬜):

- [x] Short / Detailed description (위 1·2번)
- [x] 권한 사유 (위 3번)
- [x] Single purpose (위 4번)
- [x] Category + Privacy URL (위 5번)
- [x] 스크린샷 1280×800 + 아이콘 128 (위 6번, 규격 검증됨)
- [ ] **(액션)** `./package.sh` 실행 → 최신 `.zip` 생성
- [ ] **(액션)** $5 개발자 등록비 결제
- [ ] **(액션)** Developer Dashboard에서 위 내용 붙여넣기 + zip 업로드
- [ ] **(액션)** Data usage 3개 항목 체크 (위 3번 참조)
- [ ] **(액션)** 심사 제출
