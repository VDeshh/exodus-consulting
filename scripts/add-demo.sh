#!/bin/bash
# Encode a screen recording for the web and drop it into public/demos.
#   ./scripts/add-demo.sh <source.mov> <slug>
# Produces <slug>.mp4 (h264), <slug>.webm (vp9) and <slug>.jpg (poster),
# and prints the width/height/seconds to paste into src/content/demos.ts.
set -e
SRC="$1"; SLUG="$2"
[ -f "$SRC" ] || { echo "No such file: $SRC"; exit 1; }
[ -n "$SLUG" ] || { echo "Usage: $0 <source.mov> <slug>"; exit 1; }
OUT="$(cd "$(dirname "$0")/.." && pwd)/public/demos"
mkdir -p "$OUT"

read W H DUR < <(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -show_entries format=duration -of csv=p=0:nk=1 "$SRC" | tr '\n' ' ')
echo "source ${W}x${H} ${DUR}s"

# Cap the long edge at 1600px, keep even dimensions for h264.
ffmpeg -v error -i "$SRC" -vf "scale='min(1600,iw)':-2:flags=lanczos" \
  -c:v libx264 -crf 25 -preset slow -profile:v high -pix_fmt yuv420p -movflags +faststart -an \
  "$OUT/$SLUG.mp4" -y
ffmpeg -v error -i "$SRC" -vf "scale='min(1600,iw)':-2:flags=lanczos" \
  -c:v libvpx-vp9 -crf 36 -b:v 0 -row-mt 1 -an "$OUT/$SLUG.webm" -y
# Poster from 1.5s in, so it is not a blank first frame.
ffmpeg -v error -ss 1.5 -i "$SRC" -frames:v 1 -vf "scale='min(1600,iw)':-2" -q:v 4 "$OUT/$SLUG.jpg" -y

NW=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=p=0 "$OUT/$SLUG.mp4")
NH=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "$OUT/$SLUG.mp4")
echo
ls -lh "$OUT/$SLUG".* | awk '{print $5, $9}'
echo
echo "Paste into src/content/demos.ts:"
echo "  video: { mp4: \"/demos/$SLUG.mp4\", webm: \"/demos/$SLUG.webm\", poster: \"/demos/$SLUG.jpg\", seconds: ${DUR%.*}, width: $NW, height: $NH },"
