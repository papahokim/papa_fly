#!/bin/bash
# PAPAFLY → HQ(papyrus) 동기화 스크립트
# 데이터 흐름: 현장(papafly) → HQ
# 단방향 — HQ 직접 수정 금지

set -e

HQ_BRANCH="dtslib1979/dtslib-branch"
BRANCH_ID="papafly"

echo "[sync] PAPAFLY → HQ 동기화 시작"
echo "[sync] branch: ${BRANCH_ID}"

# catalog/index.json → HQ에 현황 보고
if [ -f "catalog/index.json" ]; then
  echo "[sync] catalog/index.json 전송 준비"
  TOTAL=$(node -e "console.log(require('./catalog/index.json').total)" 2>/dev/null || echo "?")
  echo "[sync] 현재 상품 수: ${TOTAL}"
fi

# FACTORY.json 상태 리포트
if [ -f "FACTORY.json" ]; then
  echo "[sync] FACTORY.json 상태 확인"
  PHASE=$(node -e "console.log(require('./FACTORY.json').phase)" 2>/dev/null || echo "?")
  echo "[sync] 현재 단계: ${PHASE}"
fi

echo "[sync] 완료. HQ 연동은 별도 매니페스트 경유."
echo "[sync] 직접 편집 금지 — PAPAFLY에서만 데이터 원본 수정."
