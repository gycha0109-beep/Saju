# 여울 직업·시기 근거 수집 데모 (2026-11-21)

목적: 동일한 **합성 여성 명식**(2001-11-30 15:30 양력)으로 기존 Saju Career T8/T9, 대운 계산 구간을 재현한다. 본 도구는 사주 엔진의 권한이나 운영 서비스를 변경하지 않는 연구 전용 데모이며, 실제 고객 발급 Reading이 아니다.

1. `npm ci --ignore-scripts` 및 `npm run build`
2. `node scripts/yeoul-career-temporal-research-demo.mjs /private/results/temporal`
3. `node scripts/yeoul-career-temporal-evidence-assembly.mjs /private/results/temporal /private/results/yeoul-career-input.json`

생성: 타고난 Career 해석 7개, 2026~2030년 Career 연운 5개, 2026-11~2027-04 Career 월운 18개, 계산상 대운 구간 2개(현재/다음). 모든 시기 데이터는 같은 snapshotId/calculationHash를 사용하며 불일치하면 종료한다. 월운은 절입 전/후 정보를 유지한다. 원본 해석·출처·규칙은 삭제하지 않는다.

연·월운 근거는 미승인 연구용 후보이며 특정 취업·퇴사·승진·이직·연봉 결과 예언으로 사용할 수 없다. 대운은 구간의 **계산 사실**만 제공하며 길흉 해석은 불허한다. 임의로 실제 고객의 명식으로 대체하거나 결과를 판매·정식 발급에 사용하지 않는다.