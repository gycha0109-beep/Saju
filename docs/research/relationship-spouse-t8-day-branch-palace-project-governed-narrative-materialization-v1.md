# Relationship / Spouse T8 — SA-5M Project-Governed Narrative Materialization

Issue: #1959  
Track: `saju-bridge`

## 목적

SA-5M은 SA-5L에서 프로젝트 내부적으로 승인된 **position_only 서술 재료화**를 실제 registry variant에 반영합니다.

외부 전문가 검토는 요구하지 않습니다.

## 적용하는 변경

정확히 두 가지 metadata만 변경합니다.

```text
rule.quality.reviewerStatus
  unreviewed -> internal_reviewed

claimType.materialForNarrative
  false -> true
```

## 기존 staging 보존

기존 staging registry는 과거 SA-5H~SA-5L 검증의 기준이므로 직접 수정하지 않습니다.

```text
기존 staging registry
  reviewerStatus = unreviewed
  materialForNarrative = false

새 narrative-materialized registry
  reviewerStatus = internal_reviewed
  materialForNarrative = true
```

두 registry는 서로 다른 content-addressed snapshot ID를 가집니다.

## 그대로 유지되는 것

다음은 변경하지 않습니다.

- semantic version = `2.0.0`
- semantic scope = `position_only`
- claim type
- claim value schema
- rule condition/input/output
- methodology
- direct-basis source 2개
- provenanceQuality = `multi_source_supported`
- testCoverage = `fixture_matrix`
- methodologyStability = `stable_within_method`
- methodology lifecycle = `reviewed`
- rule lifecycle = `reviewed`
- pack lifecycle = `staging`
- pack identity/content
- `reviewAttestations = []`

## 허용되는 의미

정확히 다음 의미만 서술 재료가 됩니다.

```json
{
  "position": "day_branch",
  "traditionalRole": "spouse_palace",
  "semanticScope": "position_only"
}
```

즉 전통 명리에서 일지(日支)를 배우자궁의 위치로 본다는 **위치 분류**만 다룹니다.

## 계속 금지되는 확장

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

## 외부 검토 없음

이 경로는 다음을 요구하거나 생성하지 않습니다.

```text
external human/domain reviewer
ReviewAttestation
ReviewerTrustContext
ReviewerTrustGrant
```

`internal_reviewed`는 프로젝트 내부 governance 결과입니다.

## 검증

SA-5M은 다음을 확인합니다.

1. 정확한 현재 SA-5L 내부 결정과 연결됨
2. 기존 staging 상태가 예상한 pre-materiality 상태임
3. Rule에서 reviewerStatus 외 필드 parity 유지
4. ClaimType에서 materialForNarrative 외 필드 parity 유지
5. methodology/source/schema/pack parity 유지
6. 새 registry content integrity PASS
7. 기존 staging snapshot과 새 snapshot identity가 다름
8. 실제 interpretation 실행 결과의 의미가 기존 staging과 동일함

## Shadow parity 실행 권한

새 registry의 pack lifecycle은 계속 `staging`입니다. 공용 실행기는 staging pack을 무권한으로 직접 실행하지 않으므로,
SA-5M 회귀 검증은 기존 SA-5I source-adjudication lineage를 새 registry snapshot에 정확히 재바인딩한
**shadow-only source-adjudication execution authority**를 사용합니다.

이 경로는 다음 특성을 가집니다.

- 외부 reviewer trust를 요구하지 않음
- ReviewAttestation을 만들지 않음
- ReviewerTrustContext/Grant를 만들지 않음
- 호출자가 promotion/reviewer trust를 주입할 수 없음
- 새 registry snapshot에만 결박됨
- Production authority는 항상 false
- 실제 narrative generation/delivery를 허용하지 않음

이 authority의 용도는 SA-5M 전후 interpretation semantic parity 검증뿐입니다.

## 이 단계에서 하지 않는 것

SA-5M은 아직 실제 문장을 만들지 않습니다.

다음은 모두 false/HOLD 상태입니다.

- ClaimNarrativeProfile 생성
- narrative profile authority
- narrative generation
- artifact assembly
- delivery authority
- Preview authority
- Official Reading authority
- public semantic authority
- Production authority

## 다음 단계

성공 시:

```text
RUN_SA_5N_POSITION_ONLY_CLAIM_NARRATIVE_PROFILE_MATERIALIZATION
```

SA-5N에서 처음으로 이 claim을 어떤 한국어 문장으로 표현할지 정의합니다.
