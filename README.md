# Internet Down Alert — Chrome Extension

Your Wi-Fi icon only proves your **router** is reachable — not that the
**internet** actually works. This extension pings the real internet on a
schedule and notifies you the moment your connection actually drops, and the
moment it recovers.

## Features

- 🔴 Instant desktop notification when the internet drops
- 🟢 Recovery notification with offline duration
- 🐢 Optional slow-connection warning with a custom speed threshold
- 🎛️ Toolbar badge shows current status at a glance
- 🌐 English / Korean — follows system language or set manually
- 🔒 No accounts, no tracking, no data collection — all local

## Install (development)

1. `chrome://extensions` → enable **Developer mode**
2. **Load unpacked** → select this folder

## How it works

- `chrome.alarms` wakes the service worker ~once per minute
- A lightweight ping (Google `generate_204`, Cloudflare fallback) checks real
  connectivity — `navigator.onLine` alone is not trusted
- Notifies **only on state change** (down / recovered / slow) — never spam
- Optional speed test downloads a small file from Cloudflare

## Privacy

No data is collected or transmitted. See [PRIVACY.md](PRIVACY.md)
(published at the GitHub Pages URL).

## License

MIT
