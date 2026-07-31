# Chrome Web Store — Listing Material

복사해서 개발자 대시보드에 붙여넣는 용도. 영문/국문 둘 다 준비.

---

## 1. Short description (≤132자)

**EN:** Lagging? Find out in 3 seconds if it's your PC or your internet. Real internet down alert, slow warning & recovery notification.

**KO:** 렉 걸릴 때, 내 컴퓨터 탓인지 인터넷 탓인지 3초 만에 판별. 진짜 인터넷 끊김 알림 · 속도 저하 경고 · 연결 복구 알림.

---

## 2. Detailed description (스토어 본문)

### EN

**Zoom freezing? Page won't load? Is it your PC — or your internet?**

Stop guessing. Internet Down Alert pings the real internet (not just your
router) and shows the verdict on a toolbar badge: if the internet is slow or
down, it's not your computer. Wi-Fi connected but no internet? You'll know in
seconds — with a desktop notification the moment your connection actually
drops, and a recovery notification when it's back.

**Find the culprit in 3 seconds**
- 🎛️ Toolbar badge = always-on diagnosis light. Green means the internet is
  fine — so if things still lag, look at your PC, not your router
- 🐢 Slow connection warning when speed falls below your threshold — instant
  proof it's the network, not you
- 🔴 Internet down alert the moment the connection actually drops
- 🟢 Recovery notification with how long you were offline

**Why it's different**
- Checks the real internet (Google / Cloudflare endpoints) — a full Wi-Fi
  icon only proves your router is reachable, and `navigator.onLine` lies
- Notifies only on real state changes (down / slow / recovered) — never spam
- 🌐 English / Korean, follows your system language or set it manually
- 🔒 Zero setup, no accounts, no tracking, no data collection — everything
  stays on your device. Just 3 permissions.

**Real-world moment**
Your video call stutters → the badge says "slow" → it's the internet, not
your machine → you switch to a hotspot instead of rebooting for nothing.

**Who it's for**
- Remote workers who need to know "is it me or is it Zoom?"
- Anyone on an unstable connection — cafés, trains, shared Wi-Fi
- Streamers, traders, and uploaders who can't afford a silent drop

How it works: a tiny connectivity check about once a minute to public
endpoints (Google / Cloudflare). Status changes only — no noise.

### KO

**줌이 버벅일 때 — 내 컴퓨터 탓일까, 인터넷 탓일까?**

이제 추측하지 마세요. 인터넷 끊김 알림은 공유기가 아닌 진짜 인터넷에
핑을 보내고, 판정을 툴바 뱃지로 보여줍니다. 인터넷이 느리거나 끊겼다면
내 컴퓨터 잘못이 아니라는 뜻입니다. 와이파이는 연결됐는데 인터넷이 안
될 때 — 몇 초 안에 알 수 있습니다. 진짜 끊긴 순간엔 데스크톱 알림,
돌아온 순간엔 연결 복구 알림이 옵니다.

**3초 만에 범인 찾기**
- 🎛️ 툴바 뱃지 = 상시 진단등. 초록이면 인터넷은 정상 — 그래도 느리면
  범인은 내 PC
- 🐢 설정한 기준 아래로 느려지면 속도 저하 경고 — "네트워크 탓"이라는
  즉석 증거
- 🔴 인터넷이 실제로 끊긴 순간 즉시 끊김 알림
- 🟢 복구되면 알림 + 끊겨 있던 시간 표시

**무엇이 다른가**
- 공유기가 아닌 진짜 인터넷(Google / Cloudflare)을 확인 — 와이파이
  아이콘이 가득 차 있어도 그건 공유기까지만 연결됐다는 뜻입니다
- 상태가 실제로 바뀔 때(끊김/느림/복구)만 알림 — 스팸 없음
- 🌐 한국어 / 영어, 시스템 언어 자동 또는 수동 선택
- 🔒 설정 0개, 계정·추적·데이터 수집 없음 — 모든 데이터는 기기 내부에만.
  권한도 3개뿐

**실제 사용 순간**
화상회의가 버벅임 → 뱃지가 "느림" 표시 → 아, 내 탓이 아니라 인터넷
탓이구나 → 괜히 재부팅하는 대신 핫스팟으로 전환.

**이런 분께**
- "내 문제야, 줌 문제야?" 바로 알고 싶은 원격근무자·화상회의 사용자
- 카페·기차·공용 와이파이 등 불안정한 회선을 쓰는 누구나
- 조용한 끊김이 치명적인 스트리머·트레이더·업로더

동작 방식: 약 1분마다 공개 엔드포인트(Google / Cloudflare)로 아주 작은
연결 확인 요청을 보냅니다. 상태 변화 때만 알림 — 소음 없음.

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
- **Language:** English (primary) — Korean 로케일은 자동 노출
- **Privacy policy URL** (그대로 붙여넣기):
  ```
  https://raw.githubusercontent.com/joshyeom/net-alert-extension/main/PRIVACY.md
  ```
  repo PUBLIC + 커밋 push 완료 상태 → GitHub Pages 불필요. 이 raw URL 그대로 동작.

---

## 6. 업로드용 스크린샷 / 프로모 자산 (검증 완료)

| 자산 | 파일 | 크기 | 규격 |
|------|------|------|------|
| 스크린샷 (EN) | `promo/store-screenshot.png` | 1280×800 | ✅ 필수 |
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
