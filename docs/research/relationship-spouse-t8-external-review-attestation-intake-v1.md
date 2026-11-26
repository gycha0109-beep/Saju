# Saju Bridge — Relationship / Spouse T8 External Domain-Review Attestation Intake

Issue: #1746

Watchtower-Track: saju-bridge

## Purpose

This artifact adds a narrow intake path for externally supplied `ReviewAttestation[]` records against the exact Relationship / Spouse T8 source-bound runtime subjects pinned by #1714.

It does **not** create or bundle a reviewer identity, review decision, review timestamp, attestation, reviewer trust grant, trusted attestation hash, rule-quality promotion, lifecycle promotion, G2A admission, Official Reading authority, or Production authority.

## Existing authority reused

The repository's generic `createRuleRegistrySnapshot()` governance remains authoritative for review-attestation validation.

It rejects:

```text
empty / invalid reviewer identity
invalid reviewedAt
duplicate attestation IDs
subject id/version/content-hash mismatch
```

The intake path passes externally supplied attestations unchanged into that existing validator.

## Canonical candidate identity

The intake registry is assembled from the exact current source-bound Spouse T8 runtime:

```text
runtime version = 1.0.1
methodologies   = 1
rules           = 2
registered sources = 2
claim type definition = preserved
claim value schema    = preserved
pack.status = research
```

With an empty attestation array, the resolved registry and registry snapshot must be exactly equal to the canonical `RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY`.

This prevents the intake path from becoming a second interpretation candidate.

## External attestation behavior

A caller may supply a `ReviewAttestation` whose `subjectRef` exactly matches one of the three content-addressed domain-review subjects pinned by #1714.

A stale or mutated subject hash fails closed with:

```text
REVIEW_ATTESTATION_SUBJECT_MISMATCH
```

An empty or invalid reviewer identity fails closed with:

```text
REVIEW_ATTESTATION_INVALID
```

## Test fixture boundary

Tests use a synthetic reviewer identifier and synthetic approved domain attestation only to exercise the intake contract.

Those fixtures are not exported, not bundled into the runtime candidate, and do not represent a real reviewer, review, trust grant, or approval.

## Authority boundary

Successful intake does not mutate:

```text
methodology.status = research
rule.status = research
rule.quality.reviewerStatus = unreviewed
rule.quality.provenanceQuality = unknown
pack.status = research
```

It also does not establish a `ReviewerTrustContext`, active `ReviewerTrustGrant`, trusted attestation hash, or lifecycle promotion.

Therefore the newly established capability is only:

```text
externalReviewAttestationIntakePathEstablished = true
```

The authority state remains:

```text
bundledReviewAttestationCount = 0
domainReviewAuthorityEstablished = false
trustedDomainAttestationEstablished = false
reviewerStatusPromotionAuthorized = false
provenanceQualityPromotionAuthorized = false
lifecyclePromotionAuthorized = false
G2A ADMITTED = false
Official Reading authority = false
Production admission = false
Production = HOLD
```

## Next external dependency

A real domain reviewer must supply a review record bound to the exact current #1714 subject hashes.

Only after such a record is independently supplied and validated may a separate trust-governance step consider pinning its deterministic attestation hash. That later trust decision must not be synthesized by this intake artifact.
