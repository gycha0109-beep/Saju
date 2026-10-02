# Relationship / Spouse T8 — SA-5N Position-Only ClaimNarrativeProfile Materialization

Issue: #1976  
Track: `saju-bridge`

## 목적

SA-5N은 SA-5M에서 narrative material로 승인된
`relationship.spouse.traditional_spouse_palace_position` claim을
실제 deterministic narrative renderer가 사용할 수 있는
`ClaimNarrativeProfile`로 materialize합니다.

이 단계는 **프로필 생성과 isolated deterministic rendering만 허용**합니다.

제품 narrative runtime, artifact assembly, delivery, Preview, Official Reading,
public semantic, Production 권한은 열지 않습니다.

## 대상 의미

허용 semantic은 그대로 다음 하나입니다.

```json
{
  "position": "day_branch",
  "traditionalRole": "spouse_palace",
  "semanticScope": "position_only"
}
```

canonical fact:

```text
pillars.day
```

## 프로필 문구

### headline

```text
배우자궁의 전통적 위치
```

### summary

```text
전통 명리에서는 일지(日支)를 배우자궁의 위치로 봅니다.
```

### mandatory qualifier

```text
이는 배우자궁의 위치에 대한 전통적 분류이며, 배우자의 성격이나 정체, 결혼 시기 또는 관계 결과를 의미하지 않습니다.
```

## profile contract

```text
claimType =
  relationship.spouse.traditional_spouse_palace_position

allowedEpistemicTypes =
  interpretation

requiredMethodAttribution =
  true

axis =
  core

order =
  5
```

profile version:

```text
1.0.0-research
```

## 금지되는 확장

SA-5N에서도 다음 의미는 열지 않습니다.

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

프로필에는 미래 단계에서 잘못 확장되는 것을 막기 위한
prohibited phrase guard도 둡니다.

## 실제 claim 기반 검증

테스트는 임의 claim을 만들지 않습니다.

1. SA-5M narrative-materialized shadow registry로 실제 interpretation을 실행
2. 실제 spouse-palace position claim을 선택
3. governed reading evidence bundle을 생성
4. SA-5N profile로 deterministic narrative plan을 생성
5. section rendering 및 deterministic fallback grounding을 검증

검증되는 실제 claim:

```text
taxonomy = T8 / relationship / spouse
subject = native_chart
predicate = traditional_spouse_palace_position
factRefs = ["pillars.day"]

value.position = day_branch
value.traditionalRole = spouse_palace
value.semanticScope = position_only
```

## 기존 product profile set 미등록

SA-5N profile은 아직
`RELATIONSHIP_NATAL_CLAIM_NARRATIVE_PROFILES`에 넣지 않습니다.

따라서 프로필이 생성되어도 현재 product narrative path에 자동 연결되지 않습니다.

## authority boundary

SA-5N 성공 후:

```text
ClaimNarrativeProfile created = true
narrative profile authority established = true
isolated deterministic profile rendering = allowed

product narrative runtime integration = false
narrative generation = false
artifact assembly = false
delivery = false
Preview = false
Official Reading = false
public semantic = false
Production = HOLD
```

외부 검토 구조는 사용하지 않습니다.

- external reviewer 없음
- ReviewAttestation 없음
- ReviewerTrustContext 없음
- ReviewerTrustGrant 없음

## 다음 단계

성공 시:

```text
RUN_SA_5O_POSITION_ONLY_NARRATIVE_CONSUMER_INTEGRATION
```

SA-5O에서 이 프로필을 실제 governed narrative consumer 경로에 연결할지,
어떤 consumer surface에서 먼저 허용할지를 별도 통제합니다.
