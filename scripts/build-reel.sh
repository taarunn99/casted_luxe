#!/usr/bin/env bash
# Casted Luxe — brand-reel montage assembler
# Stitches the seven Higgsfield artpiece clips into one ~22s cinematic reel
# and exports the web tiers into public/reel/.
#
# Usage: ./scripts/build-reel.sh <raw-clips-dir>
#   <raw-clips-dir> must contain: qamar.mp4 ocean-in-six.mp4 nur.mp4
#   andalus.mp4 oneness.mp4 drift-and-ember.mp4 golden-hour.mp4
# Requires ffmpeg (brew install ffmpeg).
set -euo pipefail

RAW="${1:?Usage: ./scripts/build-reel.sh <raw-clips-dir>}"
OUT="public/reel"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
mkdir -p "$OUT"

# Montage order + how long to hold each clip (seconds). Slow open on the
# moon, energy peak on the Porsche, warm resolve on the waves.
NAMES=(qamar ocean-in-six nur andalus oneness drift-and-ember golden-hour)
DURS=(3.8    3.5          3.5 3.5     3.5     2.8             4.0)
START=0.3   # skip any static first beat of each clip
XF=0.45     # crossfade seconds

# 1) Normalise every clip to 1920x1080@30 so xfade can chain them
for i in "${!NAMES[@]}"; do
  n="${NAMES[$i]}"; d="${DURS[$i]}"
  echo "→ trim/normalise $n (${d}s)"
  ffmpeg -y -ss "$START" -i "$RAW/$n.mp4" -t "$d" \
    -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30,setsar=1,eq=contrast=1.04:saturation=1.05" \
    -c:v libx264 -crf 18 -preset fast -an "$TMP/$i.mp4"
done

# 2) Build the xfade chain (offsets are cumulative: prev offset + prev dur - XF)
inputs=(); filter=""; prev="0:v"; offset=0
for i in "${!NAMES[@]}"; do inputs+=(-i "$TMP/$i.mp4"); done
acc=0
for i in "${!NAMES[@]}"; do
  if [ "$i" -eq 0 ]; then
    acc=$(echo "${DURS[0]} - $XF" | bc -l)
    continue
  fi
  out="v$i"
  filter+="[$prev][$i:v]xfade=transition=fade:duration=$XF:offset=$acc[$out];"
  prev="$out"
  acc=$(echo "$acc + ${DURS[$i]} - $XF" | bc -l)
done
last="[$prev]"

echo "→ assemble master reel"
ffmpeg -y "${inputs[@]}" -filter_complex "${filter%;}" -map "$last" \
  -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p "$TMP/master.mp4"

# 3) Web tiers (all silent — brand reel ships muted)
echo "→ reel.mp4 (1080p)"
ffmpeg -y -i "$TMP/master.mp4" -an \
  -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 23 -preset slow \
  -movflags +faststart "$OUT/reel.mp4"

echo "→ reel-720p.mp4 (H.264 mobile)"
ffmpeg -y -i "$TMP/master.mp4" -an -vf "scale=1280:720" \
  -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 24 -preset slow \
  -movflags +faststart "$OUT/reel-720p.mp4"

echo "→ reel-720p-hevc.mp4 (HEVC mobile)"
ffmpeg -y -i "$TMP/master.mp4" -an -vf "scale=1280:720" \
  -c:v libx265 -tag:v hvc1 -pix_fmt yuv420p -crf 26 -preset slow \
  -movflags +faststart "$OUT/reel-720p-hevc.mp4"

echo "→ reel-poster.webp (first frame)"
ffmpeg -y -i "$TMP/master.mp4" -vframes 1 -vf "scale=1600:-2:flags=lanczos" \
  -quality 82 "$OUT/reel-poster.webp"

echo "✓ done:"
du -h "$OUT"/reel*.mp4 "$OUT"/reel-poster.webp
