# Chrome Web Store — Listing Material

복사해서 개발자 대시보드에 붙여넣는 용도. 영문/국문 둘 다 준비.

---

## 1. Short description (≤132자)

**EN:** Instantly alerts you when your internet actually goes down or recovers — even when the Wi-Fi icon still looks connected.

**KO:** 와이파이는 멀쩡해 보여도 실제 인터넷이 끊기면 즉시 알려주고, 복구되면 알려줍니다.

---

## 2. Detailed description (스토어 본문)

### EN

**Your Wi-Fi icon lies. This extension tells the truth.**

A full Wi-Fi signal only means your router is reachable — not that the
internet actually works. Internet Down Alert pings the real internet on a
schedule and tells you the moment your connection actually drops, and the
moment it comes back.

**Features**
- 🔴 Instant desktop notification when the internet drops
- 🟢 Recovery notification with how long you were offline
- 🐢 Optional slow-connection warning with a custom speed threshold
- 🎛️ Toolbar badge shows current status at a glance
- 🌐 English / Korean, follows your system language or set it manually
- 🔒 No accounts, no tracking, no data collection — everything stays on your device

**Who it's for**
- Remote workers and video-call users who can't afford to miss a drop
- Streamers and uploaders who need to know the instant they go offline
- Anyone on an unstable connection who wants to know "did it just drop?"

How it works: it sends a tiny connectivity check about once a minute to public
endpoints (Google / Cloudflare). It only notifies you when the status actually
changes — never spam.

### KO

**와이파이 아이콘은 거짓말을 합니다. 이 확장 프로그램은 진실을 알려줍니다.**

와이파이 신호가 가득 차 있어도 그건 공유기까지만 연결됐다는 뜻입니다 —
실제 인터넷이 된다는 보장이 아닙니다. 인터넷 끊김 알림은 주기적으로 진짜
인터넷에 핑을 보내, 연결이 실제로 끊긴 순간과 복구된 순간을 알려줍니다.

**기능**
- 🔴 인터넷이 끊기면 즉시 데스크톱 알림
- 🟢 복구 시 알림 + 끊겨 있던 시간 표시
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

## 5. 등록 체크리스트

- [ ] Privacy policy URL 등록 (PRIVACY.md → GitHub Pages 등으로 공개 URL)
- [ ] 스크린샷 1280×800 (또는 640×400) 최소 1장
- [ ] 아이콘 128×128 (있음)
- [ ] Short / Detailed description 입력
- [ ] 권한 사유 입력 (위 3번)
- [ ] Single purpose 입력 (위 4번)
- [ ] Data usage 항목 체크
- [ ] test.js 등 제외한 .zip 업로드 (package.sh 사용)
- [ ] $5 개발자 등록비 결제
