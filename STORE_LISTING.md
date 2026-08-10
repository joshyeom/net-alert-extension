# Chrome Web Store — Listing Material

복사해서 개발자 대시보드에 붙여넣는 용도. 7개 언어(EN·KO·ES·ID·TR·PT-BR·PL) 준비.

---

## 1. Short description (≤132자)

> ⚠️ 2026-08-07 거부(Yellow Argon, 스팸/키워드 스터핑) 후 재작성.
> 규칙: 기능 나열식 키워드 금지, 같은 개념 반복 금지, 한 문장으로 무엇을 하는지만.

**EN:** Tells you whether your internet connection is actually working, and notifies you when it drops or comes back.

**KO:** 인터넷 연결이 실제로 되고 있는지 확인하고, 끊기거나 복구되면 알려줍니다.

**ES:** Comprueba si tu conexión a internet funciona de verdad y te avisa cuando se cae o vuelve.

**ID:** Memeriksa apakah koneksi internet Anda benar-benar berfungsi, dan memberi tahu saat putus atau kembali.

**TR:** İnternet bağlantınızın gerçekten çalışıp çalışmadığını kontrol eder ve koptuğunda veya geri geldiğinde bildirir.

**PT-BR:** Verifica se a sua conexão com a internet está mesmo funcionando e avisa quando ela cai ou volta.

**PL:** Sprawdza, czy twoje połączenie z internetem naprawdę działa, i powiadamia, gdy zniknie lub wróci.

---

## 2. Detailed description (스토어 본문)

> 작성 규칙 (거부 재발 방지):
> - 도입부 훅 1~2줄까지만. 그 뒤는 전부 기능·동작 서술.
> - 같은 기능을 다른 표현으로 반복하지 않는다.
> - "이런 분께" 같은 페르소나 나열 금지 (검색어 커버리지로 읽힘).
> - 이모지 불릿 금지, 기능명 반복 금지.

### EN

Is it your PC, or your internet?

When a video call stutters or a page hangs, this extension tells you which
side the problem is on.

It checks the connection about once a minute by sending a small request to a
public endpoint run by Google or Cloudflare. A full Wi-Fi icon only means
your router is reachable, so the check goes past the router to confirm the
connection actually works. The toolbar badge shows the current state at a
glance.

What it does:
- Shows the current connection state on the toolbar badge
- Sends a desktop notification when the connection is lost
- Sends a notification when it returns, including how long it was unavailable
- Optionally warns you when measured speed falls below a threshold you set
- Lets you turn each notification on or off

You are notified only when the state changes, so it stays quiet while
everything is fine.

Settings and the last known state are stored on your device. There is no
account, no sign-up, and no analytics.

### KO

내 컴퓨터 문제일까, 인터넷 문제일까?

화상회의가 버벅이거나 페이지가 멈출 때, 이 확장 프로그램이 어느 쪽 문제인지
알려줍니다.

약 1분마다 Google 또는 Cloudflare가 운영하는 공개 엔드포인트로 작은 요청을
보내 연결을 확인합니다. 와이파이 아이콘이 가득 차 있어도 그건 공유기까지만
연결됐다는 뜻이므로, 공유기 너머까지 확인해 실제로 연결이 되는지 판단합니다.
현재 상태는 툴바 뱃지로 한눈에 보여줍니다.

주요 기능:
- 현재 연결 상태를 툴바 뱃지에 표시
- 연결이 끊기면 데스크톱 알림
- 연결이 돌아오면 알림, 끊겨 있던 시간 함께 표시
- 측정한 속도가 설정한 기준 아래로 내려가면 선택적으로 경고
- 각 알림을 개별로 켜고 끄기

상태가 바뀔 때만 알리므로, 정상일 때는 조용합니다.

설정과 마지막 상태는 기기 안에만 저장됩니다. 계정도, 가입도, 분석 도구도
없습니다.

### ES

¿Es tu PC o es tu conexión?

Cuando una videollamada se entrecorta o una página se queda colgada, esta
extensión te dice de qué lado está el problema.

Comprueba la conexión aproximadamente una vez por minuto enviando una
petición pequeña a un endpoint público de Google o Cloudflare. Un icono de
wifi lleno solo significa que tu router responde, así que la comprobación va
más allá del router para confirmar que la conexión funciona de verdad. La
insignia de la barra de herramientas muestra el estado actual.

Qué hace:
- Muestra el estado actual de la conexión en la insignia de la barra
- Envía una notificación de escritorio cuando se pierde la conexión
- Envía una notificación cuando vuelve, indicando cuánto tiempo estuvo caída
- Opcionalmente avisa cuando la velocidad medida baja de un umbral que elijas
- Permite activar o desactivar cada notificación por separado

Solo recibes avisos cuando el estado cambia, así que permanece en silencio
mientras todo va bien.

Los ajustes y el último estado se guardan en tu dispositivo. No hay cuenta,
ni registro, ni analíticas.

### ID

Masalahnya di PC Anda atau di koneksi?

Saat panggilan video patah-patah atau halaman berhenti memuat, ekstensi ini
memberi tahu di sisi mana masalahnya.

Ekstensi memeriksa koneksi kira-kira sekali per menit dengan mengirim
permintaan kecil ke endpoint publik milik Google atau Cloudflare. Ikon wifi
yang penuh hanya berarti router Anda terjangkau, jadi pemeriksaan ini
menembus router untuk memastikan koneksinya benar-benar bekerja. Lencana
toolbar menampilkan keadaan saat ini.

Yang dilakukan:
- Menampilkan keadaan koneksi saat ini di lencana toolbar
- Mengirim notifikasi desktop saat koneksi hilang
- Mengirim notifikasi saat koneksi kembali, beserta lama gangguannya
- Secara opsional memperingatkan saat kecepatan terukur turun di bawah ambang
  yang Anda tentukan
- Memungkinkan Anda menyalakan atau mematikan tiap notifikasi

Anda hanya diberi tahu ketika keadaan berubah, jadi ekstensi ini diam selama
semuanya baik-baik saja.

Pengaturan dan keadaan terakhir disimpan di perangkat Anda. Tidak ada akun,
tidak ada pendaftaran, dan tidak ada analitik.

### TR

Sorun bilgisayarınızda mı, bağlantınızda mı?

Görüntülü görüşme takıldığında ya da sayfa açılmadığında, bu eklenti sorunun
hangi tarafta olduğunu söyler.

Bağlantıyı yaklaşık dakikada bir, Google veya Cloudflare tarafından işletilen
herkese açık bir uç noktaya küçük bir istek göndererek kontrol eder. Dolu bir
wifi simgesi yalnızca modeminize ulaşılabildiği anlamına gelir; bu yüzden
kontrol modemin ötesine geçerek bağlantının gerçekten çalıştığını doğrular.
Araç çubuğu rozeti mevcut durumu gösterir.

Neler yapar:
- Mevcut bağlantı durumunu araç çubuğu rozetinde gösterir
- Bağlantı koptuğunda masaüstü bildirimi gönderir
- Bağlantı geri geldiğinde, ne kadar süre erişilemediğini de belirterek bildirir
- İsteğe bağlı olarak, ölçülen hız belirlediğiniz eşiğin altına düştüğünde uyarır
- Her bildirimi ayrı ayrı açıp kapatmanıza izin verir

Yalnızca durum değiştiğinde bildirim alırsınız; her şey yolundayken sessiz
kalır.

Ayarlar ve son durum cihazınızda saklanır. Hesap, kayıt ve analitik yoktur.

### PT-BR

É o seu PC ou é a sua conexão?

Quando uma videochamada engasga ou uma página trava, esta extensão diz de que
lado está o problema.

Ela verifica a conexão cerca de uma vez por minuto enviando uma requisição
pequena a um endpoint público operado pelo Google ou pela Cloudflare. Um
ícone de wifi cheio significa apenas que o seu roteador responde, então a
verificação vai além do roteador para confirmar que a conexão realmente
funciona. O selo na barra de ferramentas mostra o estado atual.

O que faz:
- Mostra o estado atual da conexão no selo da barra de ferramentas
- Envia uma notificação na área de trabalho quando a conexão é perdida
- Envia uma notificação quando ela volta, informando quanto tempo ficou fora
- Opcionalmente avisa quando a velocidade medida fica abaixo de um limite que
  você definir
- Permite ligar ou desligar cada notificação separadamente

Você é avisado apenas quando o estado muda, então a extensão fica quieta
enquanto está tudo bem.

As configurações e o último estado ficam guardados no seu aparelho. Não há
conta, nem cadastro, nem análise de dados.

### PL

To twój komputer czy twoje łącze?

Gdy rozmowa wideo się zacina albo strona przestaje się ładować, to
rozszerzenie mówi, po której stronie jest problem.

Sprawdza połączenie mniej więcej raz na minutę, wysyłając małe zapytanie do
publicznego endpointu prowadzonego przez Google lub Cloudflare. Pełna ikona
wifi oznacza tylko, że router odpowiada, więc sprawdzenie sięga poza router,
by potwierdzić, że połączenie naprawdę działa. Plakietka na pasku narzędzi
pokazuje bieżący stan.

Co robi:
- Pokazuje bieżący stan połączenia na plakietce paska narzędzi
- Wysyła powiadomienie na pulpicie, gdy połączenie zostaje utracone
- Wysyła powiadomienie, gdy wraca, wraz z czasem trwania przerwy
- Opcjonalnie ostrzega, gdy zmierzona prędkość spadnie poniżej ustawionego
  progu
- Pozwala włączyć lub wyłączyć każde powiadomienie osobno

Powiadomienia pojawiają się tylko przy zmianie stanu, więc dopóki wszystko
działa, rozszerzenie milczy.

Ustawienia i ostatni stan są zapisywane na twoim urządzeniu. Nie ma konta,
rejestracji ani analityki.

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
- **Language:** English (primary) — 나머지 6개 언어(KO·ES·ID·TR·PT-BR·PL)는
  대시보드에서 언어별 등록정보를 추가하고 위 2번 본문을 붙여넣기
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
