# Relationship / Spouse T8 — SA-5L Project-Governed Position-Only Narrative Materiality Decision

Issue: #1945  
Track: `saju-bridge`

## 목적

이 단계는 이미 저장소 안에서 검증된 근거·테스트·의미 범위를 기준으로
Day-Branch spouse-palace 2.0의 `position_only` 의미를 서술 재료로 사용할 수 있는지 프로젝트 내부에서 결정합니다.

## 승인 조건

다음 조건이 모두 유지되어야 합니다.

- SA-5K가 정확한 현재 상태로 완료됨
- semantic family = `DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION`
- semantic version = `2.0.0`
- semantic scope = `position_only`
- 소스 2개 유지
- provenanceQuality = `multi_source_supported`
- testCoverage = `fixture_matrix`
- methodologyStability = `stable_within_method`
- 현재 staging 상태가 아직 서술 권한을 받지 않은 상태
- 기존 금지 의미 확장 목록 유지

## 프로젝트 결정

조건이 모두 통과하면:

```text
governanceMode = PROJECT_INTERNAL_GOVERNANCE
decision = APPROVE_POSITION_ONLY_NARRATIVE_MATERIALITY_BY_PROJECT_GOVERNANCE
projectGovernedMaterialityDecisionEstablished = true
```

허용 의미는 정확히 이것뿐입니다.

```json
{
  "position": "day_branch",
  "traditionalRole": "spouse_palace",
  "semanticScope": "position_only"
}
```

## 계속 금지되는 해석

- spouse_star_selection
- partner_personality
- partner_identity
- marriage_timing
- marriage_outcome
- relationship_outcome
- favorable_unfavorable_palace_judgment
- yongshin_jisin_semantics
- second_chart_compatibility
- sex_scoped_spouse_role_expansion

## 다음 단계에서 적용할 변경

SA-5L은 실제 객체를 바꾸지 않고 다음 변경만 승인 대상으로 넘깁니다.

```text
materialForNarrative: false -> true
reviewerStatus: unreviewed -> internal_reviewed
```

다음 값은 유지합니다.

```text
provenanceQuality = multi_source_supported
methodology lifecycle = reviewed
rule lifecycle = reviewed
pack lifecycle = staging
```

## 이 단계에서 아직 하지 않는 것

- 실제 `materialForNarrative` mutation
- 실제 reviewerStatus 변경
- narrative profile 생성
- narrative runtime 활성화
- artifact assembly
- Preview / Official Reading / Production 승격

## 다음 단계

성공 시:

```text
RUN_SA_5M_PROJECT_GOVERNED_NARRATIVE_MATERIALIZATION
```

실패 시:

```text
HOLD_AND_REPAIR_SA_5L_PROJECT_GOVERNED_MATERIALITY_DECISION
```
