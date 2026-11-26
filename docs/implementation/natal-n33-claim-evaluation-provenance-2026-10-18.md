# P0-NATAL N33 — 4개 연구 해석의 명식·실행 근거 정합성 강화

2026-10-18 · Watchtower-Track: saju · 내부 연구 Preview 한정

## 기존 실제 간극

N31/N32는 실제 Career, Wealth, Business, Relationship T8 연구 Claim을 기존 한국어 ClaimNarrativeProfile에 연결하고 실제 십신 위치를 표시한다. 다만 소비 단계가 전체 실행의 snapshot ID만 비교하고 개별 Claim.snapshotId, 발행 RuleEvaluation 및 Registry Snapshot/Pack 결박은 검증하지 않았다. 따라서 조작/혼합된 Claim 묶음이 동일한 Rule.output 및 표시 위치를 갖는 경우에도 기존 한국어 문장이 표시될 수 있었다.

## 구현

- 같은 계산 해시, 정확한 Registry Snapshot ID·Pack ref를 실제 Interpreter run과 비교한다.
- 각 연구 Claim의 snapshotId, 시나리오 범위, 매칭된 RuleEvaluation의 ID/Rule 버전/Pack/실제 emittedClaimIds를 검증해 다른 명식 Claim의 차용과 미실행 Rule의 근거 재사용을 차단한다.
- 현재 Registry 안에 해당 연구 Methodology의 정확한 버전이 존재하는지 검증하고, 기존 프로필 버전을 표시한다.
- HTML의 기존 4개 연구 분야별 원문을 유지하면서 실제 `derivedFacts.tenGods.value.*.*.value` 경로를 계산 위치에 1:1로 연결하고 Rule/Methodology/Narrative Profile의 버전을 함께 표시한다.
- 회귀: 변조 Claim의 다른 명식 ID, 변조 run 계산 해시/Registry ID, 불일치 RuleEvaluation 거부, 동일 명식 반복 안정성 및 다른 명식의 실제 Claim·자리 차분, 미상 출생시간 및 원문 보존.

## 경계 및 후속 작업

이 작업은 **근거 추적성과 회귀 품질** 개선이지 출처의 명리 정확성·독립적인 전통 해석 권한을 새롭게 입증한 결과가 아니다. 기존 4개 도메인의 `research` 상태, contested/unreviewed 소스, `mayPublish:false`, `maySell:false`, `usefulComplete:false`를 유지한다. N29의 실제 개인 행동·금전 결과 주장과 읽을 가치 평가, N3–N6의 제품 수준 품질 검증은 여전히 열려 있다. 검증 성공, 병합, 사후 상태는 PR 검증 이후에만 기록한다.
