# Privacy Policy — Internet Down Alert

_Last updated: 2026-06-02_

## English

**Internet Down Alert** ("the Extension") respects your privacy. This policy
explains what the Extension does and does not do with your data.

### Data collection

The Extension **does not collect, store, transmit, or share any personal
data**. It has no analytics, no tracking, no remote logging, and no user
accounts.

### What the Extension does

- Periodically sends lightweight network requests ("pings") to public
  connectivity-check endpoints to determine whether your device currently has
  working internet access.
- Optionally measures download speed by downloading a small test file from a
  public endpoint.
- Stores your settings (language, alert thresholds, notification toggles) and
  the current connection status **locally on your device** using Chrome's
  `storage.local` API. This data never leaves your device.

### Network endpoints used

The Extension contacts only the following public endpoints, solely to check
connectivity and measure speed:

| Endpoint | Purpose |
|----------|---------|
| `https://www.gstatic.com/generate_204` | Connectivity check (empty 204 response) |
| `https://www.cloudflare.com/cdn-cgi/trace` | Connectivity check (fallback) |
| `https://speed.cloudflare.com/__down` | Download-speed measurement |

No identifying information is sent to these endpoints beyond what any normal
web request includes (your IP address, as required for any internet request).
The Extension does not append cookies, identifiers, or personal data to these
requests.

### Permissions

- `alarms` — schedule periodic connectivity checks while the browser is open.
- `notifications` — show a desktop alert when the connection drops or recovers.
- `storage` — save your settings and the last known status locally.
- `host_permissions` (gstatic.com, cloudflare.com) — required to send the
  connectivity-check and speed-test requests listed above. No other hosts are
  accessed.

### Contact

Questions: open an issue at
<https://github.com/joshyeom/net-alert-extension>.

---

## 한국어

**인터넷 끊김 알림**("본 확장 프로그램")은 사용자의 개인정보를 존중합니다.
본 방침은 확장 프로그램이 데이터를 어떻게 다루는지(그리고 다루지 않는지)를
설명합니다.

### 데이터 수집

본 확장 프로그램은 **어떠한 개인정보도 수집·저장·전송·공유하지 않습니다.**
분석 도구, 추적, 원격 로깅, 사용자 계정이 전혀 없습니다.

### 확장 프로그램의 동작

- 현재 인터넷 연결이 정상인지 확인하기 위해, 공개된 연결 확인 엔드포인트로
  주기적으로 가벼운 네트워크 요청("핑")을 보냅니다.
- 선택적으로, 공개 엔드포인트에서 작은 테스트 파일을 받아 다운로드 속도를
  측정합니다.
- 설정값(언어, 경고 기준, 알림 토글)과 현재 연결 상태를 Chrome의
  `storage.local` API를 사용해 **사용자 기기 내부에만** 저장합니다. 이
  데이터는 기기를 벗어나지 않습니다.

### 사용하는 네트워크 엔드포인트

연결 확인과 속도 측정 목적으로만 아래 공개 엔드포인트에 접속합니다.

| 엔드포인트 | 용도 |
|-----------|------|
| `https://www.gstatic.com/generate_204` | 연결 확인 (빈 204 응답) |
| `https://www.cloudflare.com/cdn-cgi/trace` | 연결 확인 (보조) |
| `https://speed.cloudflare.com/__down` | 다운로드 속도 측정 |

일반 웹 요청에 포함되는 정보(인터넷 요청에 필수인 IP 주소) 외에 식별 정보를
보내지 않습니다. 쿠키나 식별자, 개인정보를 요청에 덧붙이지 않습니다.

### 권한

- `alarms` — 브라우저가 열려 있는 동안 주기적 연결 확인을 예약.
- `notifications` — 연결이 끊기거나 복구될 때 데스크톱 알림 표시.
- `storage` — 설정과 마지막 상태를 로컬에 저장.
- `host_permissions` (gstatic.com, cloudflare.com) — 위 연결 확인·속도 측정
  요청을 보내기 위해 필요. 그 외 호스트에는 접속하지 않습니다.

### 문의

문의: <https://github.com/joshyeom/net-alert-extension> 이슈로 남겨주세요.
