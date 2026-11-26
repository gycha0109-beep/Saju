# Relationship / Spouse T8 Day-Branch Spouse-Palace Narrative Consumer Integration v1

> Track: `saju-bridge`
> Stage: SA-5O
> Issue: #1988
> Semantic family: `DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION`
> Semantic version: `2.0.0`
> Semantic scope: `position_only`

## Decision

SA-5N established one bounded `ClaimNarrativeProfile` for:

```text
relationship.spouse.traditional_spouse_palace_position
```

SA-5O registers that exact profile in the existing:

```text
RELATIONSHIP_NATAL_CLAIM_NARRATIVE_PROFILES
```

consumer collection.

No parallel narrative runtime, semantic mapper, or spouse-specific renderer is introduced.

## Canonical copy

Headline:

```text
배우자궁의 전통적 위치
```

Summary:

```text
전통 명리에서는 일지(日支)를 배우자궁의 위치로 봅니다.
```

Mandatory qualifier:

```text
이는 배우자궁의 위치에 대한 전통적 분류이며, 배우자의 성격이나 정체, 결혼 시기 또는 관계 결과를 의미하지 않습니다.
```

## Consumer path

```text
SA-5M narrative-materialized shadow execution
→ actual T8 spouse-palace position claim
→ governed evidence bundle
→ RELATIONSHIP_NATAL_CLAIM_NARRATIVE_PROFILES
→ buildClaimNarrativePlan
→ renderClaimNarrativeProfileSections
→ buildValidatedDeterministicFallback
```

The profile is registered exactly once and is ordered as:

```text
axis:core
order:5
```

Existing Relationship natal profiles remain unchanged and continue at their existing orders.

## Evidence boundary

The integrated claim remains:

```text
taxonomy = T8 / relationship / spouse
claimType = relationship.spouse.traditional_spouse_palace_position
subject = native_chart
predicate = traditional_spouse_palace_position
value.position = day_branch
value.traditionalRole = spouse_palace
value.semanticScope = position_only
polarity = neutral
factRefs = ["pillars.day"]
```

Methodology attribution remains mandatory.

## Prohibited extension

SA-5O does not authorize:

- spouse-star selection
- partner personality, identity, appearance, or occupation
- marriage timing or outcome
- relationship outcome
- divorce or remarriage prediction
- favorable/unfavorable spouse-palace judgment
- Yongshin/Jisin semantics
- second-chart compatibility
- sex-scoped spouse-role expansion

## Authority after SA-5O

Established:

```text
narrativeConsumerIntegrationEstablished = true
positionOnlyProfileConsumerSelectable = true
governedDeterministicRenderingThroughConsumer = true
```

Still closed:

```text
narrativeGenerationAuthorized = false
artifactAssemblyAuthorized = false
deliveryAuthorityAuthorized = false
previewAuthorityAuthorized = false
officialReadingAuthorityAuthorized = false
publicSemanticAuthorityAuthorized = false
productionAuthorityAuthorized = false
production = HOLD
```

External human review, ReviewAttestation, ReviewerTrustContext, and ReviewerTrustGrant are not required for this path.

## Next

```text
RUN_SA_5P_POSITION_ONLY_PRODUCT_NARRATIVE_RUNTIME_AUTHORITY_REVIEW
```

SA-5P should revisit the product narrative/delivery authority boundary now that the bounded profile is actually consumer-selectable. It must not infer Preview, Official, public semantic, or Production authority from SA-5O alone.
