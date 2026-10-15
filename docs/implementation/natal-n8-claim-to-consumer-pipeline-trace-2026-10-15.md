# P0-NATAL N8 — Research T8 claim → 소비자 본문 단계별 진단

Date: 2026-10-15. Issue: #2535. Scope: **내부 QA 관측 전용.** 기존 General Natal Preview/Official Meaning을 수정하거나 승인하지 않는다.

## 이미 확인한 차이

N3/N6 실제 출생 입력 35건 중, 다른 명식인데 본문 의미가 같은 6쌍이 있었다. 그중 3쌍에서 N3 Research 규칙/claim은 달랐다.

- 1984-01-07 00:30 ↔ 12:30: 관성 visible_stems ↔ branches
- 1984-01-07 12:30 ↔ 19:30: 관성 branches ↔ visible_stems
- 2010-02-03 05:30 ↔ 19:30: 비겁 branches ↔ visible_stems

이 규칙들은 `src/research/general-natal-useful-reading-candidate.ts`에서 `status: research`, `provenanceQuality: secondary_only`, `reviewerStatus: unreviewed` 이다. 현재 Preview semantic admission registry에는 해당 General Natal useful-reading 테마를 명시한 `claim/qualifier/observation` 허가가 없다. 이는 제품 본문에 Research 테마의 채널별 해석 의미를 임의 삽입할 권한이 없다는 뜻이다.

## 추가된 실행 진단

기존 `scripts/natal-personalization-audit.mjs`의 35건 실제 HTTP 검사와 N3/N6 지문을 **재사용**하여, 규칙이 다른 3쌍의 고유 5건에만 내부 `runProductReadingInternals` 경로를 추가 실행한다.

관측값:
1. 실제 canonical snapshot과 Research `InterpretationClaim`의 `claimType / predicate / methodology / ruleRefs / sourceRefs`.
2. `ReadingProfile`이 그 Claim을 target으로 선택했는지.
3. `CanonicalReadingSemanticBundleV1`에 unit이 생성되었는지와 claim-owned text 유무.
4. `OfficialReadingPlanV1`의 primary/supporting unit에 남았는지.
5. 실제 Official Renderer 실행 여부 및 report hash; N6 실제 HTTP 결과의 **계산 사실을 제거한 의미-only 지문**.
6. 해당 Research family의 명시적 Preview semantic admission 존재 여부.

결과 파일은 `natal-baseline.n8-trace.json`으로 CI artifact에 보관한다. `sourceToParagraphMappingProven=false`를 유지한다. 현재 claim→개별 문단 ID 직접 연결이 없으므로, unit이 plan에 있다고 해서 특정 최종 문장이 해당 Claim을 표현했다고 **추측하지 않는다**.

## CI 의미

- 정확한 A 유형 3쌍 / 고유 5건이 자동 추적되고, Research claim 차이가 존재하되 의미-only 출력 동일함을 감시한다.
- 내부 Official Reading은 별도 모델 호출 없이 완료되어야 한다.
- Research-only semantic result를 Preview admission/Production에 자동 승격하지 않는다.
- 이후 source-backed admission 또는 제품 해석이 실제로 달라지면 baseline 검사가 실패하고 **증거를 재검토한 뒤** 해당 기대값을 갱신해야 한다.

## 다음 의미 결손 / 해결 조건

- `visible_stems`와 `branches`의 **해석상 차이**가 단순 사실 위치 이상의 의미인지, 원문 및 방법론과 독립 검수로 확인한다.
- 신뢰 가능한 출처/판본/locator, 반례, context에 따른 예외, 기존 `GENERAL_NATAL_USEFUL_*` Claim의 소유 scope, Preview admission `claim/qualifier/observation/hold` 분류가 필요하다.
- 승인 전에는 N7의 실제 계산 십신 위치 표시는 유지하고, **새 성격·재물·직업·운세 해석 문장**은 보류한다.
- 원래 규칙 자체가 같았던 B 유형 3쌍은 #2529 Research에 그대로 남긴다.

**P0-NATAL은 아직 미완료.** 본 진단은 근거 단절 위치를 식별하는 코드/회귀 증거이며 해석 개인화의 의미적 해결을 주장하지 않는다.
