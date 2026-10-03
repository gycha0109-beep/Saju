# Relationship / Spouse T8 Day-Branch Product Narrative Runtime Reauthorization Review v1

> Track: `saju-bridge`
> Stage: SA-5R
> Issue: #2003
> Semantic family: `DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION`
> Semantic version: `2.0.0`
> Semantic scope: `position_only`

## Purpose

SA-5P held product narrative runtime authority because a grounding-valid model output could widen the spouse-palace claim into unsupported spouse-personality semantics.

SA-5Q remediated that blocker by enforcing ClaimNarrativeProfile contracts on model output before artifact assembly.

SA-5R re-runs the actual bounded product path and decides whether the exact position-only capability may now use the existing legacy narrative runtime, artifact assembly, and product delivery.

## Exact authorization scope

```text
authorityScope =
project_governed_relationship_natal_spouse_position_only

readingSection =
relationship:natal:spouse

claimType =
relationship.spouse.traditional_spouse_palace_position

semanticScope =
position_only
```

This is not a generic spouse-reading authorization.

## Canonical semantic

The only governed meaning remains:

```text
전통 명리에서는 일지(日支)를 배우자궁의 위치로 봅니다.
```

Mandatory qualifier:

```text
이는 배우자궁의 위치에 대한 전통적 분류이며, 배우자의 성격이나 정체, 결혼 시기 또는 관계 결과를 의미하지 않습니다.
```

## Reauthorization evidence

SA-5R verifies three paths.

### 1. Profile-compliant model first pass

A model adapter returns the exact ClaimNarrativeProfile-governed draft.

Expected path:

```text
actual SA-5M claim
→ governed reading evidence
→ legacy narrative runtime
→ parser
→ grounding validation
→ ClaimNarrativeProfile validation
→ model_first_pass
→ ReadingArtifact(status=ready)
→ Product Reading Delivery(state=delivered)
```

The final draft, artifact, and delivery all preserve the exact position-only summary and qualifier and contain no prohibited semantic expansion.

### 2. Provider failure

A forced provider error follows the existing deterministic fallback path:

```text
provider failure
→ deterministic profile fallback
→ ReadingArtifact(status=narrative_fallback)
→ Product Reading Delivery(state=delivered_with_fallback)
```

The same canonical copy and semantic exclusions remain intact.

### 3. Adversarial semantic expansion

SA-5Q remains an upstream hard prerequisite.

The recorded expansion probe:

```text
배우자의 성격은 강합니다.
```

must still be rejected on both first pass and repair and must not appear in final artifact or delivery.

## Decision

If every reauthorization check passes:

```text
AUTHORIZE_POSITION_ONLY_PRODUCT_NARRATIVE_RUNTIME_AND_DELIVERY
```

Authorized only inside the exact project-governed scope:

```text
legacyNarrativeRuntimeAuthorityEstablished = true
productNarrativeRuntimeIntegrationAuthorized = true
narrativeGenerationAuthorized = true
artifactAssemblyAuthorized = true
deliveryAuthorityAuthorized = true
```

Still closed:

```text
previewAuthorityAuthorized = false
officialReadingAuthorityAuthorized = false
publicSemanticAuthorityAuthorized = false
persistenceAuthorityAuthorized = false
publicGeneralAvailabilityAuthorityAuthorized = false
productionAuthorityAuthorized = false
production = HOLD
```

## Semantic exclusions remain frozen

This authorization does not establish:

- spouse personality;
- spouse identity;
- spouse appearance;
- spouse occupation;
- marriage timing;
- marriage outcome;
- divorce or remarriage;
- favorable/unfavorable spouse-palace judgment;
- Yongshin/Jisin semantics;
- 財星/官星 spouse-role auto-selection;
- compatibility.

## Preview / Official boundary

`relationship:natal:spouse` still resolves to:

```text
authority = legacy_narrative
```

It is not an Official Reading Preview section.

No Preview, Official, persistence, public general availability, or Production authority is inferred from the runtime/delivery reauthorization.

No external human/domain review, ReviewAttestation, ReviewerTrustContext, or ReviewerTrustGrant is required for this path.

## Next

```text
RUN_SA_5S_POSITION_ONLY_PREVIEW_ADMISSION_REVIEW
```

SA-5S may review whether this exact bounded capability should be admitted to the Preview surface. That review must remain separate from Production authority and must not widen the spouse semantic contract.
