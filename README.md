# Internet Down Alert — Chrome Extension

> **취미 유지 모드 (2026-09-15부터).** 성장 작업은 중단했고 코드는 v1.2.0에서
> 동결했다. 확장은 정상 동작하며 크롬 웹스토어 게시도 유지한다. 판단 근거는
> [DECISION.md](DECISION.md)에 있다. GitHub 저장소는 archived 상태라 푸시하려면
> 먼저 언아카이브해야 한다.

Your Wi-Fi icon only proves your **router** is reachable — not that the
**internet** actually works. This extension pings the real internet on a
schedule and notifies you the moment your connection actually drops, and the
moment it recovers.

## Features

- 🔴 Instant desktop notification when the internet drops
- 🟢 Recovery notification with offline duration
- 🐢 Optional slow-connection warning with a custom speed threshold
- 🕘 Outage history — last-7-day count / total / longest, plus every outage
  with its start time and duration (sleep and shutdown gaps are excluded)
- 🎛️ Toolbar badge shows current status at a glance
- 🌐 7 languages — follows system language or set manually
- 🦊 Same package runs on Chrome, Edge and Firefox (see [DISTRIBUTION.md](DISTRIBUTION.md))
- 🔒 No accounts, no tracking, no data collection — all local

## Install (development)

1. `chrome://extensions` → enable **Developer mode**
2. **Load unpacked** → select this folder

## How it works

- `alarms` wakes the background script every 30 s; while it is awake a 5 s
  loop pings more often
- A lightweight ping (Google `generate_204`, Cloudflare fallback) checks real
  connectivity — `navigator.onLine` alone is not trusted
- Notifies **only on state change** (down / recovered / slow) — never spam
- Each recovery appends `{start, end}` to a local outage log (max 500). A gap of
  more than 3 min between checks means sleep/shutdown: that time is never
  counted as downtime, and an outage cut off by a gap is marked `≥`
- Optional speed test downloads a small file from Cloudflare

## Privacy

No data is collected or transmitted. See [PRIVACY.md](PRIVACY.md)
(published at the GitHub Pages URL).

## License

MIT
