# Relationship / Spouse T8 — SA-5M Project-Governed Narrative Materialization

Issue: #1955  
Track: `saju-bridge`

## 목적

SA-5L에서 승인한 프로젝트 내부 결정을 실제 materialized registry snapshot으로 반영합니다.

외부 전문가 검토는 필요하지 않습니다.

## 실제 변경

SA-5M이 적용하는 변경은 정확히 두 가지입니다.

```text
reviewerStatus: unreviewed -> internal_reviewed
materialForNarrative: false -> true
```

기존 staging 상수는 수정하지 않습니다.

대신 새 materialized rule / claim type / registry snapshot을 만들어 이력을 보존합니다.

## 유지되는 값

다음은 변경하지 않습니다.

```text
provenanceQuality = multi_source_supported
testCoverage = fixture_matrix
methodologyStability = stable_within_method
methodology lifecycle = reviewed
rule lifecycle = reviewed
pack lifecycle = staging
source count = 2
ReviewAttestation count = 0
```

## 허용 의미

서술 재료로 허용되는 의미는 정확히 다음뿐입니다.

```json
{
  "position": "day_branch",
  "traditionalRole": "spouse_palace",
  "semanticScope": "position_only"
}
```

즉, “일지는 전통적으로 배우자궁의 위치로 본다” 수준만 허용합니다.

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

## 외부 검토 요구 없음

이 흐름은 다음을 요구하지 않습니다.

```text
externalHumanDomainReviewRequired = false
reviewAttestationRequired = false
reviewerTrustContextRequired = false
reviewerTrustGrantRequired = false
```

ReviewAttestation 배열은 계속 비어 있습니다.

## 이 단계에서 아직 열지 않는 것

`materialForNarrative=true`는 “서술 재료로 사용할 수 있음”만 의미합니다.

SA-5M 자체는 아직 다음 권한을 만들지 않습니다.

- ClaimNarrativeProfile
- narrative runtime
- narrative generation
- artifact assembly
- delivery authority
- Preview authority
- Official Reading authority
- public semantic authority
- Production authority

Production은 계속 `HOLD`입니다.

## 다음 단계

성공 시:

```text
RUN_SA_5N_POSITION_ONLY_NARRATIVE_PROFILE_MATERIALIZATION
```

SA-5N에서는 이 position-only claim을 실제 문장으로 렌더링할 때 사용할
ClaimNarrativeProfile을 별도 생성합니다.

그 단계에서도 배우자 성격·결혼 시기·결혼 결과 등 금지 의미를 확장해서는 안 됩니다.
