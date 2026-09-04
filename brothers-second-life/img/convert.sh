#!/usr/bin/env bash
# convert.sh — 핸드폰 사진을 webp(srcset용 2단)로 변환
# 사용법: ./convert.sh <원본.jpg|png> <출력이름>
# 예:     ./convert.sh /sdcard/DCIM/Camera/xxx.jpg hoyadang
set -euo pipefail
SRC="${1:?원본 이미지 경로 필요}"
BASE="${2:-photo}"
mkdir -p img
cwebp -q 82 -resize 900 0 "$SRC" -o "img/${BASE}@900.webp"
cwebp -q 76 -resize 480 0 "$SRC" -o "img/${BASE}@480.webp"
echo "완료: img/${BASE}@480.webp · img/${BASE}@900.webp"
