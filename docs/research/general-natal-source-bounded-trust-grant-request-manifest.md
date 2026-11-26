# General Natal — Trust-Grant Request Manifest

Status: research-only

## Purpose

This artifact is the deterministic handoff between externally supplied General Natal domain-review attestations and the repository's existing reviewer-trust governance model.

It does **not** create a reviewer, trust context, trust grant, approval, lifecycle promotion, provenance promotion, or Production authority.

The handoff exists so that an external trust authority can see the exact values that the existing `ReviewerTrustGrant` contract would need if it independently chooses to trust a reviewer and pin an attestation hash.

## Upstream authority

The manifest consumes two already-established surfaces:

1. `GENERAL-NATAL-SOURCE-BOUNDED-DOMAIN-REVIEW-SUBJECTS`
   - exact current content-addressed review subjects
   - 1 methodology + 10 rules = 11 subjects
2. `createGeneralNatalSourceBoundedRegistryWithExternalReviewAttestations()`
   - accepts external `ReviewAttestation[]`
   - delegates subject/hash/shape validation to generic registry governance

A supplied attestation with a stale or mutated subject hash therefore fails before this handoff is produced.

## Existing trust contract

`ReviewerTrustContext` contains reviewer grants. An active `ReviewerTrustGrant` contains:

```text
reviewerId
allowedReviewLevels[]
trustedAttestationContentHashes[]
status = active | revoked
```

`reviewerTrustsAttestation()` returns true only when the matching reviewer grant is active, the attestation's review level is allowed, and the deterministic content hash of the attestation is present in `trustedAttestationContentHashes`.

`attestationId` is **not** itself a grant field. This manifest retains it only as trace metadata linking the hash back to the review record.

## Candidate fields

Each domain trust-grant request candidate contains:

```text
subjectType
subjectRef.id
subjectRef.version
subjectRef.contentHash
reviewerId
requiredAllowedReviewLevel = domain
attestationId
trustedAttestationContentHash
decision
reviewedAt
```

The actual trust authority would independently decide whether to create or modify a grant whose `allowedReviewLevels` contains `domain` and whose `trustedAttestationContentHashes` contains the supplied hash.

`trustedAttestationContentHash` is produced with the repository's canonical `deterministicContentHash()` function.

The original review decision is preserved. A rejected review remains `rejected`; the manifest never rewrites it to approval.

## Domain boundary

The current General Natal review-subject manifest requires domain review.

Accordingly:

- domain-level attestations become trust-pinning candidates;
- internal-level attestations are valid registry data, but they do not count as domain-review coverage here;
- subject coverage is descriptive only and is not reviewer trust.

## Coverage

The manifest reports:

```text
reviewSubjectCount
suppliedReviewAttestationCount
domainReviewAttestationCount
trustGrantRequestCandidateCount
coveredSubjectCount
uncoveredSubjectCount
uncoveredSubjects
```

Multiple valid domain attestations may exist for one subject. Candidate count and covered-subject count are intentionally separate.

Coverage does not mean that a reviewer is trusted and does not mean that a subject is approved.

## Determinism

Candidates are sorted from exact subject identity plus review time, attestation ID, and reviewer ID.

Uncovered subjects come from the deterministic review-subject manifest.

The complete handoff has a deterministic SHA-256 `manifestHash`.

## Authority boundary

The only newly established capability is:

```text
trustGrantRequestManifestEstablished = true
```

The following remain false or absent:

```text
actualReviewerTrustGrantCount = 0
trustedDomainAttestationEstablished = false
domainReviewAuthorityEstablished = false
sourceIntegrityQualificationEstablished = false
provenanceQualityPromotionAuthorized = false
productionAdmissionAuthority = false
Production = HOLD
```

## Explicit non-authority

A test fixture reviewer, test attestation, or generated request candidate is not a real reviewer identity, human review, trust grant, or approval.

Only an independently supplied `ReviewerTrustContext` with an active matching grant can establish reviewer trust under the existing runtime governance.

## Non-scope

This change does not:

- assign a reviewer;
- fabricate a review decision;
- create `ReviewerTrustContext` or `ReviewerTrustGrant`;
- set `allowedReviewLevels` or reviewer grant status;
- mutate `reviewerStatus`;
- promote provenance quality;
- promote rule/methodology/pack lifecycle;
- activate Production;
- expand consumer semantics;
- implement Gyeokguk, 強弱, 旺衰, Yongshin, SKU, or Commerce behavior.
