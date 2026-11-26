# Relationship / Spouse T8 Day-Branch ClaimNarrativeProfile Model-Output Enforcement Remediation v1

> Track: `saju-bridge`
> Stage: SA-5Q
> Issue: #1999
> Semantic family: `DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION`
> Semantic version: `2.0.0`
> Semantic scope: `position_only`

## Problem from SA-5P

SA-5P proved that the previous runtime had two different semantic behaviors:

- deterministic fallback used ClaimNarrativeProfile copy and remained bounded;
- model-first-pass output was checked only by parser + grounding rules and could therefore remain evidence-linked while widening the semantic meaning.

The recorded probe:

```text
배우자의 성격은 강합니다.
```

used the real spouse-palace claim id and methodology ref, passed grounding, produced a ReadingArtifact, and could reach Product Reading Delivery.

That produced the SA-5P HOLD.

## SA-5Q remediation

SA-5Q adds a generic validator:

```text
validateNarrativeDraftAgainstClaimNarrativeProfiles
```

to the shared narrative model-attempt path.

The validator runs after ordinary grounding validation whenever `claimNarrativeProfiles` are supplied.

It does not create a spouse-specific renderer or one-off filter.

## Profile-governed assertion contract

For a claim selected by a ClaimNarrativeProfile, model output must preserve:

- an unambiguous matching profile;
- the profile section title;
- the profile-governed assertion text;
- an allowed epistemic type;
- required methodology attribution;
- the mandatory qualifier;
- prohibited-phrase exclusion;
- exactly one rendering of each profile-governed active claim.

When all active claims are profile-covered and there is no mandatory ambiguity/conflict/scope disclosure requirement, additional unmodeled user-visible blocks or sections are rejected.

This makes the profile contract authoritative for model output as well as deterministic fallback output.

## Runtime behavior

The existing orchestrator flow becomes:

```text
model first pass
→ parse
→ grounding validation
→ ClaimNarrativeProfile validation
→ pass
   OR
→ one existing repair attempt
→ parse
→ grounding validation
→ ClaimNarrativeProfile validation
→ pass
   OR
→ existing deterministic profile fallback
```

No additional model retry is introduced.

## Actual spouse-palace probe

SA-5Q replays the exact SA-5P probe on the real SA-5M spouse-palace claim:

```text
claimType = relationship.spouse.traditional_spouse_palace_position
value.position = day_branch
value.traditionalRole = spouse_palace
value.semanticScope = position_only
factRefs = ["pillars.day"]
```

The adapter repeats the invalid output on both first pass and repair:

```text
title = 배우자 특징
assertion = 배우자의 성격은 강합니다.
```

Both attempts are rejected with profile violations including:

```text
PROFILE_SECTION_TITLE_MISMATCH
PROFILE_ASSERTION_TEXT_MISMATCH
PROFILE_MANDATORY_QUALIFIER_MISSING
PROFILE_PROHIBITED_PHRASE_PRESENT
```

The runtime then uses the existing deterministic fallback.

## Safe final copy

The final narrative contains:

```text
전통 명리에서는 일지(日支)를 배우자궁의 위치로 봅니다.
```

and:

```text
이는 배우자궁의 위치에 대한 전통적 분류이며, 배우자의 성격이나 정체, 결혼 시기 또는 관계 결과를 의미하지 않습니다.
```

The rejected spouse-personality probe does not appear in:

- final NarrativeDraft;
- ReadingArtifact;
- Product Reading Delivery.

Delivery remains `delivered_with_fallback`.

## Compatibility boundary

When no ClaimNarrativeProfile matches a claim, the new validator does not impose profile-copy constraints on that claim.

Therefore existing unprofiled legacy narrative behavior is preserved.

## Historical SA-5P record

SA-5P remains a historical HOLD decision.

After SA-5Q, its live regression probe now confirms that the previously unsafe output fails closed. This downstream observation does not rewrite the original SA-5P authority decision; it proves the named blocker has been remediated.

## Decision

```text
PROFILE_MODEL_OUTPUT_ENFORCEMENT_REMEDIATED
```

Established:

```text
modelOutputProfileEnforcementEstablished = true
invalidModelOutputMayReachArtifact = false
invalidModelOutputMayReachDelivery = false
```

Still closed:

```text
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

No external human/domain review, ReviewAttestation, ReviewerTrustContext, or ReviewerTrustGrant is required for this remediation.

## Next

```text
RUN_SA_5R_POSITION_ONLY_PRODUCT_NARRATIVE_RUNTIME_REAUTHORIZATION_REVIEW
```

SA-5R should re-evaluate the product narrative runtime and delivery boundary after the generic semantic enforcement gate is proven in CI and Integration. It must not infer Preview, Official, public semantic, or Production authority merely from this remediation.
