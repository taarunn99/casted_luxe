#!/usr/bin/env bash
# Casted Luxe — hero video optimisation
# Usage: ./scripts/optimize-hero.sh path/to/higgsfield-output.mp4
# Requires ffmpeg (brew install ffmpeg)
# Produces: public/hero/hero.mp4, public/hero/hero.webm, public/hero/hero-poster.webp

set -euo pipefail

SRC="${1:?Usage: ./scripts/optimize-hero.sh <source-video.mp4>}"
OUT="public/hero"
mkdir -p "$OUT"

echo "→ H.264 MP4 (universal fallback, ~2-4 MB)"
ffmpeg -y -i "$SRC" -an \
  -vf "scale=1600:-2:flags=lanczos" \
  -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -crf 24 -preset slow -movflags +faststart \
  "$OUT/hero.mp4"

echo "→ VP9 WebM (primary, ~30-40% smaller)"
ffmpeg -y -i "$SRC" -an \
  -vf "scale=1600:-2:flags=lanczos" \
  -c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1 \
  "$OUT/hero.webm"

echo "→ Poster frame (WebP, first frame)"
ffmpeg -y -i "$SRC" -vframes 1 \
  -vf "scale=1600:-2:flags=lanczos" \
  -quality 82 "$OUT/hero-poster.webp"

echo ""
echo "Done. Sizes:"
du -h "$OUT"/hero.* | sort
echo ""
echo "Next: git add public/hero components && git commit -m 'feat: luxe hero with motion' && git push"
