# Chrome Web Store — 검색 노출(SEO) 현황과 전략

> **보류 (2026-09-15).** 여기 적힌 순위는 2026-09-15 재측정에서도 유지됐다
> ("인터넷 끊김" 1위, 어순을 섞어도 1위). 문제는 순위가 아니라 검색량이다.
> 1위인데 30일 페이지 조회가 22회였다. 이 문서의 랭킹 요소 정리는 유효하되
> 더 최적화하지 않는다. [DECISION.md](DECISION.md) 참고.
>
> 정정: "Featured 배지"는 2026-08-20 구글 발표로 폐지 예정이다.

조사일: 2026-08-11. 모든 수치는 개발자 대시보드와 CWS 실제 페이지에서 직접 확인한 값이다.
추측으로 채운 칸은 없으며, 확인하지 못한 항목은 "확인 안 됨"으로 표기했다.

---

## 1. 구글이 공식적으로 밝힌 랭킹 요소 (3개뿐)

출처:
- https://developer.chrome.com/docs/webstore/discovery
- https://support.google.com/chrome_webstore/answer/12225786

| # | 요소 | 공식 원문 | 우리 현황 |
|---|------|-----------|-----------|
| 1 | 이름·설명의 관련성 | "item name, description relevancy" | **양호** — 주요 키워드 1~2위 |
| 2 | 평점 수 + 평균 평점 | "the number of ratings and the average rating are taken into account" | **0개 — 최대 병목** |
| 3 | 설치 대비 삭제 비율 추이 | "the number of downloads vs. uninstalls over time" | 30일 설치 42 / 삭제 4 (약 10%) |

### 근거 없는 것으로 확인된 통설

공식 문서에 언급 자체가 없다. 출처는 대부분 ASO 서비스를 파는 마케팅 블로그
(extensionfast.com, extensionranker.com, extensionbooster.net)이며 근거 제시가 없다.

- 주간 활성 사용자 수 · 유지율(retention)
- 업데이트 빈도
- 카테고리 선택
- 제목 앞부분 키워드 가중치

### 그 외 확인된 사실

- **Established Publisher 배지**: 공식 블로그에 "may receive higher rankings in search and
  filtering" 명시 — 확인된 지렛대.
  출처: https://blog.google/products-and-platforms/products/chrome/find-great-extensions-new-chrome-web-store-badges/
- **이름 75자 제한**: 2024-02-23부터 전 언어 통일. 이전에는 영어 45자/타 로케일 무제한이었고,
  이 비대칭이 스팸에 악용돼 통일됨.
  출처: https://groups.google.com/a/chromium.org/g/chromium-extensions/c/mpDvFpT0KJM/m/WWFFQZFyAAAJ
- **키워드 스터핑 기준**: "It's best to keep instances of a specific keyword to under 5"
  출처: https://developer.chrome.com/docs/webstore/program-policies/spam-faq
- **구글 웹 검색 색인**: `chromewebstore.google.com/robots.txt` 직접 확인 결과 `/detail/`
  경로는 차단돼 있지 않아 상세페이지가 일반 웹 검색에 색인된다.
  단 `/search`, `/detail/*/privacy`, `/detail/*/support` 및 utm 파라미터 URL은 차단.
- **2024~2026 알고리즘 변경**: 검색 랭킹 자체를 대상으로 한 공식 발표는 **없음**.
  확인된 변경은 이름 글자수 제한(2024)과 콘텐츠·프라이버시·도박 관련 정책뿐.

---

## 2. 실측 검색 순위 (2026-08-11, CWS 직접 검색)

| 검색어 | 우리 순위 | 비고 |
|--------|-----------|------|
| 인터넷 끊김 | **1위** | 나머지는 화이트노이즈 앱·게임 등 무관 확장. 사실상 무경쟁 |
| internet down | **2위** | 1위는 Internet Connection Monitor(20만) |
| connection monitor | 10위권 밖 | |
| internet speed | 10위권 밖 | |
| network monitor | 10위권 밖 | |
| 인터넷 속도 | 10위권 밖 | |

**핵심 해석**: 키워드 순위는 이미 이겼는데 설치로 이어지지 않는다.
"internet down" 2위인데 30일 스토어 페이지 조회가 22회다.
따라서 병목은 검색 노출이 아니라 **리스팅의 신뢰 신호(별점)** 다.

검색 결과 카드에는 사용자 수가 아니라 **별점만 표시**된다.
1~2위로 떠도 옆 카드는 4.4★이고 우리 카드는 별점이 비어 있으니 클릭이 나지 않는다.

---

## 3. 경쟁 현황

| 확장 | 사용자 | 평점(리뷰) | 언어 |
|------|--------|-----------|------|
| Internet Connection Monitor | 200,000 | 4.4 (211) | 7 |
| Speed Test & WiFi Fixer by SpeedMate | 10,000 | 4.6 (58) | 1 |
| Network Monitor | 6,000 | 4.5 (41) | 52 |
| Real-Time Internet Speed Monitor | 2,000 | 4.2 (47) | 1 |
| Internet Health Check | 17 | 0.0 (0) | 1 |
| **인터넷 끊김 알림 (우리)** | **15** | **0.0 (0)** | 7 |

### 경쟁사 이름 키워드 배치 패턴

- 콜론 + 앰퍼샌드: `Internet Health Check: Connection Monitor & Speed Test`
- 하이픈 + 기능 나열: `Internet Speed Test - Ping & WiFi Check`
- "by 브랜드" 접미: `Speed Test & WiFi Fixer by SpeedMate` (기능 키워드 앞, 브랜드 뒤)

**주의**: 이 패턴을 그대로 따라하면 키워드 스터핑 재거부 위험이 있다. 아래 4절 참조.

---

## 4. 하지 않기로 한 것 — 본문 키워드 작업

2026-08-07 **키워드 스터핑으로 심사 거부**됨 (Yellow Argon / 스팸 및 스토어 내 게재위치).
"항목 설명에 불필요한 키워드가 포함" — 7개 언어 전부 지적.

원인은 현지 검색 표현을 본문에 심고 같은 기능을 여러 표현으로 반복 나열한 ASO 문구였다.
이후 7개 언어 전면 재작성 + 키워드 5회 미만 규칙을 적용해 재제출(v1.1.2)한 상태.

현재 본문 재검증 결과, 4회 이상 등장하는 단어는 접속사·대명사뿐이고
(EN `when` 5, ES `cuando` 5, ID `anda`/`saat` 6, PT-BR `quando` 5) 기능 키워드 반복은 없다.
정책이 겨냥하는 것은 랭킹 조작용 키워드이므로 현 상태는 안전하다.

**결론**: 이미 주요 키워드 1~2위이고 거부 이력이 있으므로, 추가 키워드 작업은 기대값이
마이너스다. 본문·이름은 건드리지 않는다.

---

## 5. 적용 완료 항목 (2026-08-11)

본문 키워드를 건드리지 않는 항목만 적용했으므로 재거부 위험이 없다.
새로고침 후 값 유지를 확인했고 심사 재제출까지 마쳤다.

| 항목 | 적용 전 | 적용한 값 | 근거 |
|------|---------|-----------|------|
| 홈페이지 URL | 비어 있음 | GitHub 레포 | 대시보드 안내문: "설명 및 지원 페이지 URL을 제공하면 항목과 관련해 더욱 의미 있는 평점과 댓글을 받을 수 있습니다" → 랭킹 요소 #2에 직접 연결 |
| 지원 URL | 비어 있음 | GitHub Issues | 동일 |
| 스크린샷 | 2개 | 4장 추가 → 총 5장 | 전환율 → 랭킹 요소 #3에 간접 영향 |
| 작은 프로모션 타일 | 미등록 | 440×280 | 큐레이션·노출면 진입 조건 |
| 마키 프로모션 타일 | 미등록 | 1400×560 | 동일 |

### 미적용: 공식 URL

Google Search Console에서 사이트 소유권을 인증해야 드롭다운에 후보가 뜨는 구조다.
현재 소유 도메인이 없어 보류. Established Publisher 배지 요건이므로
도메인 확보 시 적용한다.

---

## 6. 우선순위

1. **리뷰 확보** — 랭킹 요소 3개 중 유일하게 0점인 항목이자, 검색 카드에 노출되는 유일한
   신뢰 신호. 위 5절을 전부 적용해도 리뷰가 0개면 설치는 크게 늘지 않는다.
2. **5절 항목 일괄 적용** — 심사 통과 직후
3. 언어별 노출수 변화 측정 — 7개 언어 리스팅 게시 후 대시보드 '노출수' 지표로 확인

### 측정 지표 (주 1회)

페이지 조회수(유입) → 설치(전환) → 주간 활성(리텐션) → 리뷰 수(신뢰)

대시보드 '캠페인별 조회수'는 현재 비어 있다. 외부 채널 집행 시 UTM 파라미터를 붙이면 잡힌다.
단 utm 파라미터가 붙은 URL은 robots.txt에서 차단되므로 웹 검색 색인에는 반영되지 않는다.

---

## 부록: 30일 대시보드 지표 (2026-07-05 ~ 08-02)

| 지표 | 값 |
|------|-----|
| 설치 수 | 42 (+10.5%) |
| 제거 수 | 4 (+33%) |
| 스토어 페이지 조회수 | 22 (0%) — 유입 소스 `ext_sidebar` 100% |
| 주간 활성 사용자 | 13 (+58.5%) |
| 평점·리뷰 | 0 |

설치는 미국 86%·ChromeOS 74%인데 활성 사용자는 한국 71%·macOS 92%다.
미국 ChromeOS 설치가 활성으로 이어지지 않는 것으로 보이나, 원인은 확인 안 됨.

검색어별 검색량은 Chrome Web Store가 제공하지 않는다(확인 불가).
실행 횟수 지표도 없어 주간 활성 사용자로 대체한다.
