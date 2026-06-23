# Internet Down Alert — Promotion Strategy

Research date: 2026-06-23. All channel rules and competitor figures were verified
by opening the live pages in a headless browser (Playwright/Chromium) — not from
memory or training data. Items that could not be read live are flagged.

PO report (visual): https://preview-ashy.vercel.app/e51301f6-d761-4bc1-80f3-7684022866c9.html

---

## Core hook (use everywhere)

> "Your Wi-Fi icon lies. This tells you when the internet **actually** dropped — and for how long."
>
> "와이파이 아이콘은 거짓말한다. 인터넷이 **진짜** 끊긴 순간 + 끊긴 시간까지 알려준다."

Differentiator: real-endpoint ping (Google `generate_204` + Cloudflare fallback,
not `navigator.onLine`) + drop/recovery/offline-duration notification + Korean UI.

---

## Competitor landscape (live Chrome Web Store DOM, verified)

| Extension | Users | Rating | Korean listing? | Focus |
|---|---|---|---|---|
| Internet Connection Monitor | 200,000 | 4.4 (209) | No (English only) | Outage logging, CSV/PDF export, custom ping. "Requires no permissions." |
| SpeedMate | 10,000 | 4.6 (56) | **Yes** | Speed-test first; has real-time drop alerts |
| Network Monitor | 6,000 | 4.5 (42) | **Yes** | Generic real-time monitoring, 52 UI langs |
| Real-Time Internet Speed Monitor | 1,000 | 4.1 (41) | No | Toolbar speed badge |
| VPN Connectivity Monitor | 92 | 0.0 | No | Real-endpoint ping (closest mechanism match), VPN-scoped |
| Internet Health Check | 11 | 0.0 | No | Same pitch as us, no traction |

**Wedge (corrected):** the Korean angle is **partial, not clean**.
- Market leader ICM (200K) is English-only → a Korean listing beats it for Korean searchers.
- BUT SpeedMate (10K) and Network Monitor (6K) already ship full Korean listings — "Korean = no competition" is **false**.
- Real gap = **"Korean-language, drop/recovery-alert-focused"** tool. The two Korean
  competitors are **speed-test framed**, not outage-alert framed. No Korean-localized,
  drop-alert-focused competitor with traction exists.

ICM's "no permissions at all" is the privacy bar to match — mirror it with our
"no tracking / local / free / MV3" copy.

---

## Channel verdicts (live rules, verified)

### Reddit (English)

| Subreddit | Subs | Self-promo rule (read live) | Verdict |
|---|---|---|---|
| r/chrome_extensions | 46K | Rule 4 spam-only; dedicated "Self Promotion" flair, feed full of promo | **GO — best fit** |
| r/SideProject | 386K | "I built X" top-level is the norm (rule text not readable logged-out; judged from feed) | **GO** |
| r/coolgithubprojects | 20K | Open-source GitHub repo shares are the entire sub (no rules widget rendered) | **GO — post repo link** |
| r/webdev | 530K | Showoff Saturdays only: promo removed on other days | **Conditional — Sat only** |
| r/InternetIsBeautiful | large | Rule 7: extensions/downloads outright banned. Rule 11: 90/10 rule | **DO NOT POST — banned** |
| r/sysadmin | large | Rule 3: paid ads only; self-promo posts not allowed | **No — in-context comments only** |

Reddit anti-ban rule: 9:1 (9 genuine interactions per 1 promo). Lead with the pain
story + demo GIF; link in a comment, never a bare link post.

**Blocked during verification:** `*/about/rules.json` and `old.reddit.com` (datacenter-IP
block). r/SideProject and r/coolgithubprojects verbatim rules not readable logged-out —
verdicts based on observed feed behavior, not quoted rules.

### Korea

| Channel | Rule (read live) | Verdict |
|---|---|---|
| GeekNews **Show GN** (news.hada.io) | Directly-usable works only, no signup wall, don't repost per version. **Account must be 1 week old to post links.** | **GO — best fit** |
| OKKY 사는얘기 | Side-project sharing is normal; pure promo draws "광고" pushback | **GO — as a build story** |
| velog | Indexes in Google fast; dev audience | **GO — SEO/credibility asset** |
| Naver blog | For Naver search (55%+ share) discovery | Secondary |
| Clien | 팁/사용기 gate: account ≥50 days, ≥30 logins, ≥1 post, ≥10 comments. Direct-promo board `/board/hongbo` is **corporate-members only**, ₩44,000/7d · ₩66,000/15d · ₩99,000/30d | Conditional |
| DC Inside | General galleries ban commercial promo (ban-eligible). 홍보 갤러리 currently access-blocked (사유: 광고) | Weak/risky |
| Ppomppu | Site-wide ad/promo ban ("광고 글이나 광고 사진은 금지") | **Avoid** |

Correction vs first pass: Clien direct-promo board URL is `/board/hongbo`
(not `cm_directAd`) and is corporate-only; the ₩44,000 / ₩99,000 figures are correct.

### Threads (Meta) — supplementary

Good as a build-in-public / story channel, strong with Korean dev/remote-worker
audience. Weak link conversion (external links not boosted) → hook in body, link in
comment/profile. Use as a **pre-launch serialized buildup** (drop story → build process
→ release), not a one-shot launch-day post. Threads 2026 algorithm specifics: not verified live.

---

## Other channels

- Product Hunt — self-hunt, 12:01 AM PT, maker build-story first comment. ~60% of installs churn within a month. Hundreds of installs realistic, not a growth engine.
- Show HN — `Show HN: Internet Down Alert – open-source extension that detects real internet drops`. Tue–Thu morning ET. Low downside, worth one shot.
- Directories (15 min each): DevHunt, AlternativeTo, BetaList, Uneed.
- dev.to technical write-up — "navigator.onLine lies" — evergreen SEO.

---

## Chrome Web Store ASO

Google-confirmed ranking signals: metadata relevance + ratings + usage (installs vs
uninstalls / retention) + UX. Featured placement = editor discretion, not gameable.

- **Title:** `Internet Down Alert — Connection Monitor & Offline Notifier`
- **Summary (≤132 chars):** lead with "internet drops" + "desktop alert" + "private/free"
- **Description para 1:** front-load Tier-1 keywords naturally; bullets for features; end with privacy line
- **Category:** Workflow & Planning or Developer Tools
- **First reviews:** add `/reviews` link in popup; respond to every review. **Never buy reviews** (removal + account risk).
- **Policy:** current manifest is safe (no wildcard hosts). At submit: state single-purpose, justify each permission, certify "no data collected" matching the privacy policy.

### Keyword gaps to own (evidence-based, from competitor copy)

- Korean (no Korean competitor uses these): `인터넷 끊김 알림`, `연결 끊김`, `연결 복구 알림`, `오프라인 알림`, `와이파이 연결됐는데 인터넷 안됨`
- English (competitors barely use): `internet down alert`, `recovery notification`, `slow connection warning`, `desktop notification`

Competitors cluster on "speed test / monitor / ping". We claim the **drop → notify** event itself.

---

## Personas → where they gather

| Persona | Why they need it | Where |
|---|---|---|
| Stock/crypto traders | Drop during a trade = real money loss (strongest hook) | Naver stock cafes, DC 주갤 (locations unverified) |
| Online-exam / 인강 | Drop = exam invalidated | 수능/공시 cafes (unverified) |
| Remote workers | "Was it me or Zoom?" mid-call drop | OKKY, r/remotework, 재택 cafes |
| Streamers | Drop = dead stream | DC 치지직 galleries, r/Twitch |
| On-call / SRE | My connection vs the service; duration log | r/sysadmin (comments only), r/networking |

---

## Recommended sequence

1. Make one 30s demo GIF (drop → notification → recovery+duration). Reuse everywhere.
2. Polish store listing with the gap keywords + 5 screenshots @1280×800.
3. Start Threads serialized buildup (pre-launch).
4. Post to GeekNews Show GN + r/chrome_extensions simultaneously.
5. velog technical post for SEO; trickle into persona communities over weeks.

## Unverified (confirm before acting)

- Reddit per-sub verbatim rules for SideProject / coolgithubprojects (couldn't read logged-out).
- Exact promo rules for OKKY / individual Naver cafes / Blind / Inven / trader & exam forums.
- Threads 2026 algorithm / link-reach behavior (general reasoning only).
- ASO sub-signal weightings (title > description etc.) are third-party inference, not Google-confirmed.
