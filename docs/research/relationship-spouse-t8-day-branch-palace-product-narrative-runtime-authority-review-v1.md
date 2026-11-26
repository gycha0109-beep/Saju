# Relationship / Spouse T8 Day-Branch Spouse-Palace Product Narrative Runtime Authority Review v1

> Track: `saju-bridge`
> Stage: SA-5P
> Issue: #1992
> Semantic family: `DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION`
> Semantic version: `2.0.0`
> Semantic scope: `position_only`

## Question

After SA-5O registered the bounded spouse-palace ClaimNarrativeProfile in the real Relationship natal consumer collection, is the existing legacy product narrative runtime safe to authorize for this semantic?

The review separates two paths:

1. deterministic fallback rendering;
2. successful model-first-pass rendering.

These paths do not currently have equivalent semantic enforcement.

## Upstream state

SA-5O established:

```text
narrativeConsumerIntegrationEstablished = true
positionOnlyProfileConsumerSelectable = true
governedDeterministicRenderingThroughConsumer = true
```

The bounded meaning remains only:

```text
전통 명리에서는 일지(日支)를 배우자궁의 위치로 봅니다.
```

with the mandatory qualifier:

```text
이는 배우자궁의 위치에 대한 전통적 분류이며, 배우자의 성격이나 정체, 결혼 시기 또는 관계 결과를 의미하지 않습니다.
```

## Actual runtime review

The review uses the actual SA-5M narrative-materialized shadow claim:

```text
taxonomy = T8 / relationship / spouse
claimType = relationship.spouse.traditional_spouse_palace_position
subject = native_chart
predicate = traditional_spouse_palace_position
value.position = day_branch
value.traditionalRole = spouse_palace
value.semanticScope = position_only
factRefs = ["pillars.day"]
```

and the actual SA-5O:

```text
RELATIONSHIP_NATAL_CLAIM_NARRATIVE_PROFILES
```

collection.

## Path A — deterministic fallback

A forced provider failure reaches:

```text
generateGroundedNarrative
→ buildValidatedDeterministicFallback
→ ClaimNarrativeProfile renderer
```

The resulting narrative contains:

- the bounded position-only summary;
- the mandatory qualifier;
- claim evidence;
- methodology attribution;
- no prohibited spouse-personality, spouse-appearance, spouse-job, marriage-outcome, compatibility, Yongshin/Jisin, or spouse-star expansion.

This path is semantically bounded by the profile.

## Path B — model first pass

An adversarial test adapter returns a structurally valid NarrativeDraft containing:

```text
배우자의 성격은 강합니다.
```

The assertion still includes:

- the actual spouse-palace claim id;
- the actual methodology ref;
- `epistemicType = interpretation`.

Therefore the existing grounding validator accepts it.

The current first-pass model path does not independently enforce:

- `ClaimNarrativeProfile.allowedEpistemicTypes` beyond normal grounding shape;
- `mandatoryQualifier`;
- `prohibitedPhrases`;
- exact profile template semantics;
- position-only semantic closure.

The model-first-pass output can therefore be:

```text
grounding-valid
but
profile-semantically-invalid
```

## Delivery consequence

Because the governed execution reaches `state = completed`, the existing Product Reading Delivery layer treats the artifact as deliverable.

Therefore a claim-grounded but profile-semantic-invalid model output can currently reach:

```text
executeProductReading
→ ReadingArtifact
→ buildProductReadingDelivery
→ delivered
```

This is an authority blocker, not merely a copy-quality issue.

## Decision

```text
HOLD_PRODUCT_NARRATIVE_RUNTIME_AUTHORITY_PENDING_PROFILE_ENFORCEMENT
```

Review blockers:

```text
none
```

Authorization blockers:

```text
MODEL_SUCCESS_PATH_DOES_NOT_ENFORCE_CLAIM_NARRATIVE_PROFILE
MANDATORY_QUALIFIER_NOT_ENFORCED_ON_MODEL_SUCCESS
PROHIBITED_PHRASES_NOT_ENFORCED_ON_MODEL_SUCCESS
SEMANTICALLY_UNBOUNDED_MODEL_OUTPUT_CAN_REACH_CONSUMER_DELIVERY
```

## Authority after SA-5P

Verified:

```text
narrativeConsumerIntegrationEstablished = true
positionOnlyProfileConsumerSelectable = true
deterministicFallbackProfileRenderingVerified = true
```

Not established:

```text
modelSuccessProfileSemanticEnforcementVerified = false
productNarrativeRuntimeIntegrationAuthorized = false
narrativeGenerationAuthorized = false
artifactAssemblyAuthorized = false
deliveryAuthorityAuthorized = false
previewAuthorityAuthorized = false
officialReadingAuthorityAuthorized = false
publicSemanticAuthorityAuthorized = false
productionAuthorityAuthorized = false
production = HOLD
```

Spouse natal remains:

```text
readingSection = relationship:natal:spouse
consumer authority = legacy_narrative
Official Reading authority = none
```

No external human review, ReviewAttestation, ReviewerTrustContext, or ReviewerTrustGrant is required for this remediation path.

## Next remediation primitive

```text
RUN_SA_5Q_CLAIM_NARRATIVE_PROFILE_MODEL_OUTPUT_ENFORCEMENT_REMEDIATION
```

SA-5Q should add a generic profile-aware semantic validation gate for model output before ReadingArtifact assembly.

The gate should validate model-backed sections against the selected ClaimNarrativeProfile contract, including at minimum:

- matching profile for the referenced claim;
- allowed epistemic type;
- mandatory qualifier presence;
- prohibited phrase rejection;
- no semantic broadening beyond the selected profile contract.

This should be implemented in the shared narrative path, not as a spouse-specific renderer or one-off string filter.
