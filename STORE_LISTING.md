# Chrome Web Store — Listing Material

복사해서 개발자 대시보드에 붙여넣는 용도. 7개 언어(EN·KO·ES·ID·TR·PT-BR·PL) 준비.

---

## 1. Short description (≤132자)

**EN:** Lagging? Find out in 3 seconds if it's your PC or your internet. Real internet down alert, slow warning & recovery notification.

**KO:** 렉 걸릴 때, 내 컴퓨터 탓인지 인터넷 탓인지 3초 만에 판별. 진짜 인터넷 끊김 알림 · 속도 저하 경고 · 연결 복구 알림.

**ES:** ¿Va lento? Averigua en 3 segundos si es tu PC o tu internet. Alerta cuando se cae el internet, aviso de lentitud y de recuperación.

**ID:** Lemot? Cari tahu dalam 3 detik: masalahnya di PC atau internet. Peringatan internet putus, koneksi lambat, dan notifikasi pulih.

**TR:** Takılma mı var? 3 saniyede anlayın: PC mi, internet mi? İnternet kesilince uyarı, yavaşlama ve bağlantı geri gelme bildirimi.

**PT-BR:** Travando? Descubra em 3 segundos se é o seu PC ou a sua internet. Alerta de internet caindo, aviso de lentidão e de reconexão.

**PL:** Tnie się? W 3 sekundy sprawdź, czy to komputer, czy internet. Alert o utracie internetu, wolnym łączu i powrocie połączenia.

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
- 🌐 7 languages (English, Korean, Spanish, Indonesian, Turkish,
  Portuguese, Polish) — follows your system language or set it manually
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
- 🌐 7개 언어(한국어·영어·스페인어·인니어·터키어·포르투갈어·폴란드어),
  시스템 언어 자동 또는 수동 선택
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

### ES

**¿Zoom se congela? ¿La página no carga? ¿Es tu PC — o tu internet?**

Deja de adivinar. Alerta de Caída de Internet hace ping al internet real (no
solo a tu router) y muestra el veredicto en una insignia de la barra de
herramientas: si el internet está lento o caído, no es tu computadora. ¿Wifi
conectado pero sin internet? Lo sabrás en segundos — con una notificación de
escritorio en el momento en que la conexión se cae de verdad, y otra cuando
se recupera.

**Encuentra al culpable en 3 segundos**
- 🎛️ Insignia en la barra = luz de diagnóstico permanente. Verde significa
  que el internet está bien — si aun así va lento, mira tu PC, no tu router
- 🐢 Aviso de conexión lenta cuando la velocidad baja del umbral que elijas
  — prueba instantánea de que es la red, no tú
- 🔴 Alerta en el momento exacto en que se cae el internet
- 🟢 Notificación de recuperación con el tiempo que estuviste sin conexión

**Por qué es diferente**
- Comprueba el internet real (endpoints de Google / Cloudflare) — el icono
  de wifi lleno solo prueba que tu router responde
- Notifica solo con cambios reales de estado (caído / lento / recuperado) —
  nunca spam
- 🌐 7 idiomas (incluido español), sigue el idioma del sistema o elígelo
  manualmente
- 🔒 Sin configuración, sin cuentas, sin rastreo, sin recopilación de datos
  — todo queda en tu equipo. Solo 3 permisos.

**Momento real**
La videollamada se entrecorta → la insignia dice "lento" → es el internet,
no tu máquina → cambias al hotspot en vez de reiniciar para nada.

**Para quién es**
- Teletrabajadores que necesitan saber "¿soy yo o es Zoom?"
- Cualquiera a quien se le cae el internet — cafeterías, trenes, wifi
  compartido
- Streamers, traders y creadores que no pueden permitirse una caída
  silenciosa

Cómo funciona: una comprobación de conectividad mínima aprox. una vez por
minuto a endpoints públicos (Google / Cloudflare). Solo cambios de estado —
sin ruido.

### ID

**Zoom macet? Halaman tidak mau terbuka? Masalahnya di PC — atau di internet?**

Berhenti menebak. Peringatan Internet Putus melakukan ping ke internet
sungguhan (bukan cuma router Anda) dan menampilkan hasilnya di lencana
toolbar: kalau internet lambat atau putus, berarti bukan salah komputer
Anda. Wifi tersambung tapi tidak ada internet? Anda tahu dalam hitungan
detik — dengan notifikasi desktop begitu koneksi benar-benar putus, dan
notifikasi lagi saat pulih.

**Temukan biang keladinya dalam 3 detik**
- 🎛️ Lencana toolbar = lampu diagnosis yang selalu aktif. Hijau berarti
  internet baik-baik saja — kalau masih lemot, periksa PC Anda, bukan router
- 🐢 Peringatan koneksi lambat saat kecepatan turun di bawah ambang yang
  Anda atur — bukti instan bahwa masalahnya di jaringan, bukan di Anda
- 🔴 Peringatan internet putus tepat saat koneksi benar-benar terputus
- 🟢 Notifikasi pulih beserta lamanya Anda offline

**Kenapa berbeda**
- Memeriksa internet sungguhan (endpoint Google / Cloudflare) — ikon wifi
  penuh hanya membuktikan router terjangkau
- Memberi tahu hanya saat status benar-benar berubah (putus / lambat /
  pulih) — tidak pernah spam
- 🌐 7 bahasa (termasuk Bahasa Indonesia), ikut bahasa sistem atau pilih
  manual
- 🔒 Tanpa setup, tanpa akun, tanpa pelacakan, tanpa pengumpulan data —
  semuanya tetap di perangkat Anda. Hanya 3 izin.

**Momen nyata**
Video call patah-patah → lencana bilang "lambat" → berarti internetnya,
bukan komputer Anda → Anda pindah ke hotspot alih-alih restart sia-sia.

**Untuk siapa**
- Pekerja remote yang perlu tahu "salah saya atau salah Zoom?"
- Siapa pun yang internetnya sering putus — kafe, kereta, wifi bersama
- Streamer, trader, dan kreator yang tidak boleh kecolongan internet mati

Cara kerja: pemeriksaan konektivitas kecil sekitar sekali per menit ke
endpoint publik (Google / Cloudflare). Hanya saat status berubah — tanpa
berisik.

### TR

**Zoom donuyor mu? Sayfa açılmıyor mu? Sorun PC'nizde mi — internette mi?**

Tahmin etmeyi bırakın. İnternet Kesintisi Uyarısı, yalnızca modeminize değil
gerçek internete ping atar ve kararı araç çubuğu rozetinde gösterir:
internet yavaşsa ya da kesildiyse, suçlu bilgisayarınız değildir. Wifi bağlı
ama internet yok mu? Saniyeler içinde öğrenirsiniz — bağlantı gerçekten
koptuğu anda masaüstü bildirimi, geri geldiğinde de ayrı bir bildirim
alırsınız.

**Suçluyu 3 saniyede bulun**
- 🎛️ Araç çubuğu rozeti = her zaman açık tanı ışığı. Yeşilse internet
  yolunda — hâlâ takılma varsa modeme değil PC'nize bakın
- 🐢 Hız belirlediğiniz eşiğin altına düşünce yavaşlama uyarısı — "suç ağda"
  olduğunun anlık kanıtı
- 🔴 İnternet gerçekten kesildiği anda kesinti uyarısı
- 🟢 Bağlantı geri gelince bildirim + ne kadar süre çevrimdışı kaldığınız

**Neden farklı**
- Modemi değil gerçek interneti kontrol eder (Google / Cloudflare uç
  noktaları) — dolu wifi simgesi yalnızca modeme ulaşabildiğinizi gösterir
- Yalnızca gerçek durum değişimlerinde bildirir (kesildi / yavaş / geri
  geldi) — asla spam yapmaz
- 🌐 7 dil (Türkçe dahil), sistem dilini izler veya elle seçilir
- 🔒 Kurulum yok, hesap yok, izleme yok, veri toplama yok — her şey
  cihazınızda kalır. Yalnızca 3 izin.

**Gerçek bir an**
Görüntülü görüşme takılıyor → rozet "yavaş" diyor → sorun internette,
makinenizde değil → boşuna yeniden başlatmak yerine hotspot'a
geçiyorsunuz.

**Kimler için**
- "Sorun bende mi, Zoom'da mı?" bilmek isteyen uzaktan çalışanlar
- İnterneti sık kesilen herkes — kafe, tren, ortak wifi
- Sessiz bir kesintiyi göze alamayan yayıncılar, trader'lar ve içerik
  üreticileri

Nasıl çalışır: yaklaşık dakikada bir, herkese açık uç noktalara (Google /
Cloudflare) çok küçük bir bağlantı kontrolü gönderir. Yalnızca durum
değişince bildirim — gürültü yok.

### PT-BR

**Zoom travando? Página não carrega? É o seu PC — ou a sua internet?**

Pare de adivinhar. O Alerta de Queda de Internet pinga a internet de verdade
(não só o seu roteador) e mostra o veredito num selo na barra de
ferramentas: se a internet está lenta ou caiu, a culpa não é do seu
computador. Wifi conectado mas sem internet? Você descobre em segundos —
com uma notificação na área de trabalho no momento em que a conexão
realmente cai, e outra quando volta.

**Encontre o culpado em 3 segundos**
- 🎛️ Selo na barra = luz de diagnóstico sempre ligada. Verde significa
  internet ok — se ainda estiver travando, olhe para o PC, não para o
  roteador
- 🐢 Aviso de lentidão quando a velocidade cai abaixo do limite que você
  definir — prova instantânea de que é a rede, não você
- 🔴 Alerta no momento exato em que a internet cai
- 🟢 Notificação de reconexão mostrando quanto tempo você ficou offline

**Por que é diferente**
- Verifica a internet de verdade (endpoints do Google / Cloudflare) — ícone
  de wifi cheio só prova que o roteador responde
- Notifica apenas em mudanças reais de estado (caiu / lenta / voltou) —
  nunca spam
- 🌐 7 idiomas (incluindo português), segue o idioma do sistema ou escolha
  manualmente
- 🔒 Zero configuração, sem conta, sem rastreamento, sem coleta de dados —
  tudo fica no seu aparelho. Só 3 permissões.

**Momento real**
Internet caindo toda hora na videochamada → o selo mostra "lenta" → é a
internet, não a sua máquina → você troca para o hotspot em vez de reiniciar
à toa.

**Para quem é**
- Quem trabalha remoto e precisa saber "sou eu ou é o Zoom?"
- Qualquer pessoa com internet instável — cafés, trens, wifi compartilhado
- Streamers, traders e criadores que não podem ter uma queda silenciosa

Como funciona: uma verificação de conectividade minúscula, cerca de uma vez
por minuto, em endpoints públicos (Google / Cloudflare). Só mudanças de
estado — sem ruído.

### PL

**Zoom się zacina? Strona się nie ładuje? To komputer — czy internet?**

Przestań zgadywać. Alert rozłączenia internetu pinguje prawdziwy internet
(nie tylko router) i pokazuje werdykt na plakietce paska narzędzi: jeśli
internet jest wolny albo padł, to nie wina twojego komputera. Wifi
połączone, ale bez internetu? Dowiesz się w kilka sekund — z powiadomieniem
na pulpicie w chwili, gdy połączenie naprawdę się rozłącza, i drugim, gdy
wraca.

**Znajdź winnego w 3 sekundy**
- 🎛️ Plakietka na pasku = stale włączona lampka diagnostyczna. Zielona
  znaczy, że internet działa — jeśli dalej się tnie, sprawdź komputer, nie
  router
- 🐢 Ostrzeżenie o wolnym łączu, gdy prędkość spadnie poniżej ustawionego
  progu — natychmiastowy dowód, że to sieć, nie ty
- 🔴 Alert w chwili, gdy internet naprawdę się rozłącza
- 🟢 Powiadomienie o powrocie połączenia z czasem trwania przerwy

**Czym się różni**
- Sprawdza prawdziwy internet (endpointy Google / Cloudflare) — pełna ikona
  wifi dowodzi tylko, że router odpowiada
- Powiadamia wyłącznie przy realnej zmianie stanu (brak / wolno / powrót) —
  nigdy spam
- 🌐 7 języków (w tym polski), podąża za językiem systemu albo wybierz
  ręcznie
- 🔒 Zero konfiguracji, bez konta, bez śledzenia, bez zbierania danych —
  wszystko zostaje na twoim urządzeniu. Tylko 3 uprawnienia.

**Scena z życia**
Wideorozmowa się zacina → plakietka pokazuje "wolno" → to internet, nie
twój sprzęt → przełączasz się na hotspot zamiast restartować na darmo.

**Dla kogo**
- Pracujący zdalnie, którzy chcą wiedzieć "to ja czy Zoom?"
- Każdy, komu internet co chwilę się rozłącza — kawiarnie, pociągi, wspólne
  wifi
- Streamerzy, traderzy i twórcy, których cicha przerwa słono kosztuje

Jak to działa: malutkie sprawdzenie łączności mniej więcej raz na minutę do
publicznych endpointów (Google / Cloudflare). Tylko zmiany stanu — bez
szumu.

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
