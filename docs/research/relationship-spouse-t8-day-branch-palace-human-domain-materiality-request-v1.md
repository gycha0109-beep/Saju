# Relationship / Spouse T8 — SA-5L Human Domain Narrative-Materiality Request

Issue: #1920  
Track: `saju-bridge`

## Purpose

SA-5L prepares the exact request and fail-closed intake contract required before
the Spouse T8 Day-Branch spouse-palace 2.0.0 claim may be considered for
narrative materiality.

SA-5L does **not** create or simulate human/domain authority.

## Exact lineage

```text
SA-5C research claim contract
  -> SA-5D Bridge re-entry
  -> SA-5E isolated research execution
  -> SA-5F staging eligibility
  -> SA-5G explicit staging governance
  -> SA-5H staging lifecycle materialization
  -> SA-5I isolated shadow staging execution
  -> SA-5J governed consumer evidence selection
  -> SA-5K narrative/delivery HOLD review
  -> SA-5L external human/domain review request
```

SA-5L exact-binds the SA-5K:

- `reviewId`
- upstream SA-5J consumer admission id
- staging execution authority ref
- governed evidence hash
- staging registry snapshot id
- staging pack ref
- completed HOLD review state
- next disposition requesting explicit human/domain review

## Requested domain-review subjects

The request pins exactly the current staging content refs for:

1. the one staging methodology
2. the one staging rule

Each subject requires:

```text
reviewLevel = domain
decision = approved
```

The current staging registry remains unchanged:

```text
reviewAttestations = []
reviewerStatus = unreviewed
materialForNarrative = false
```

## Reviewer trust requirements

Every accepted domain attestation must have an active reviewer trust grant that:

- permits the `domain` review level
- belongs to the attestation reviewer
- pins the exact SHA-256 hash of that attestation

A revoked grant, stale hash, wrong review level, wrong subject ref, rejected
attestation, or malformed trust context fails closed.

## Separate narrative-materiality decision

Methodology/rule domain review is necessary but not identical to deciding that
the claim may be expressed as narrative material.

SA-5L therefore requires a separate explicit materiality decision:

```text
APPROVE_POSITION_ONLY_NARRATIVE_MATERIALITY
```

The decision must target exactly:

```json
{
  "position": "day_branch",
  "traditionalRole": "spouse_palace",
  "semanticScope": "position_only"
}
```

The decision must preserve all prohibited extensions:

- spouse-star selection
- partner personality
- partner identity
- marriage timing
- marriage outcome
- relationship outcome
- favorable/unfavorable palace judgment
- Yongsin/Jisin semantics
- second-chart compatibility
- sex-scoped spouse-role expansion

Removing or changing any prohibited extension fails closed.

## Request state

A normal SA-5L build resolves to:

```text
requestState = PENDING_EXTERNAL_HUMAN_DOMAIN_REVIEW
```

and establishes only the request manifest.

It does not establish:

- human domain review
- trusted domain attestation in the registry
- reviewer trust authority in execution
- narrative materiality authority
- reviewerStatus promotion
- materialForNarrative mutation
- ClaimNarrativeProfile authority
- narrative generation
- artifact assembly
- delivery
- Preview
- Official Reading
- public semantic authority
- Production authority

Production remains `HOLD`.

## External submission intake

SA-5L exports a validator for externally supplied review material.

The submission contains:

- the exact SA-5L request
- exactly two domain ReviewAttestations
- a ReviewerTrustContext
- a separate narrative-materiality decision

A structurally valid submission may resolve to:

```text
submissionReadyForLaterAuthorityMaterialization = true
nextDisposition =
  RUN_SA_5M_TRUSTED_HUMAN_DOMAIN_AUTHORITY_MATERIALIZATION_REVIEW
```

This means only that the external package is exact-bound and ready for a later
authority-materialization review.

Even then, SA-5L keeps:

```text
humanDomainReviewEstablished = false
trustedDomainAttestationMaterializedIntoRegistry = false
reviewerTrustGrantMaterializedIntoExecutionAuthority = false
narrativeMaterialityDecisionMaterialized = false
reviewerStatusPromotionAuthorized = false
materialForNarrativeMutationAuthorized = false
narrativeGenerationAuthorized = false
artifactAssemblyAuthorized = false
deliveryAuthorityAuthorized = false
production = HOLD
```

## Synthetic tests

Unit tests use an explicitly named synthetic reviewer and synthetic
attestations only to exercise the validator.

Those fixtures are not shipped as runtime review authority and are not
registered in the staging registry.

## Fail-close behavior

The intake rejects:

1. stale or modified request identity
2. wrong methodology/rule subject refs
3. missing or extra attestations
4. non-domain attestations
5. rejected attestations
6. invalid reviewedAt/reviewer identity
7. untrusted attestation hashes
8. revoked reviewer grants
9. untrusted materiality decision reviewer
10. a decision reviewer not participating in domain review
11. narrative-scope expansion
12. any current staging authority mutation

## Next disposition

Without real external review material:

```text
PENDING_EXTERNAL_HUMAN_DOMAIN_REVIEW
```

With a structurally accepted external package:

```text
RUN_SA_5M_TRUSTED_HUMAN_DOMAIN_AUTHORITY_MATERIALIZATION_REVIEW
```

SA-5M, not SA-5L, would decide whether trusted external review inputs may be
materialized into registry/reviewer/narrative authority.
