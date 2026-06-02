#!/usr/bin/env bash
# 크롬 웹스토어 업로드용 .zip 생성 — 배포에 불필요한 파일 제외.
set -euo pipefail
cd "$(dirname "$0")"

OUT="net-alert-extension.zip"
rm -f "$OUT"

# 배포에 들어갈 파일만 명시적으로 포함 (화이트리스트 방식 — 실수로 테스트/문서 포함 방지)
zip -r "$OUT" \
  manifest.json \
  service-worker.js \
  i18n.js \
  popup.html \
  popup.js \
  icons/icon16.png \
  icons/icon48.png \
  icons/icon128.png \
  _locales/en/messages.json \
  _locales/ko/messages.json

echo
echo "생성됨: $OUT"
echo "포함 내용:"
unzip -l "$OUT"
