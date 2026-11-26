# Saju Bridge — Relationship / Spouse T8 Trust-Grant Request Manifest

Issue: #1760

Watchtower-Track: saju-bridge

## Purpose

This artifact prepares the next fail-closed governance handoff after the external review-attestation intake merged in #1748.

It converts already validated current-domain `ReviewAttestation[]` records into the exact data a later reviewer-trust authority would need to consider when creating or updating a `ReviewerTrustGrant`.

It does **not** create a trust grant, trust context, reviewer identity, review decision, lifecycle promotion, G2A admission, consumer authority, Official Reading authority, or Production authority.

## Existing authority reused

The manifest reuses:

```text
#1714
→ exact content-addressed Spouse T8 domain-review subjects

#1748
→ external ReviewAttestation[] intake
→ generic createRuleRegistrySnapshot() validation

src/interpretation/reviewer-trust.ts
→ ReviewerTrustGrant contract
→ exact attestation content-hash pinning requirement
```

No parallel reviewer-trust framework is introduced.

## Current review surface

The current source-bound runtime remains:

```text
runtime version = 1.0.1
methodology subjects = 1
rule subjects = 2
review subjects = 3
required review level = domain
```

With no externally supplied review attestations:

```text
trustGrantRequestCandidateCount = 0
coveredSubjectCount = 0
uncoveredSubjectCount = 3
actualReviewerTrustGrantCount = 0
```

## Candidate fields

For each validated current-subject domain attestation, the manifest may expose only the exact request inputs:

```text
subjectType
subjectRef
reviewerId
requiredAllowedReviewLevel = domain
attestationId
trustedAttestationContentHash
decision
reviewedAt
```

The trusted-attestation content hash is deterministic over the exact accepted attestation.

The candidate deliberately does not contain:

```text
allowedReviewLevels[]
status = active | revoked
ReviewerTrustContext
ReviewerTrustGrant
```

Those remain decisions for a later trust-governance authority.

## Fail-closed behavior

The upstream #1748 intake remains authoritative for attestation validation.

Therefore stale or mutated subject hashes fail before a request candidate can be emitted.

Internal-level attestations remain accepted review facts when valid, but do not count as domain-review coverage and do not produce a domain trust-grant request candidate.

Rejected domain attestations remain rejected review facts. The manifest never rewrites them to approval.

## Determinism

Candidate ordering is deterministic over:

```text
exact review subject
reviewedAt
attestationId
reviewerId
```

The manifest hash is deterministic for the same validated attestation set regardless of input ordering.

## Synthetic test fixtures

Tests use synthetic reviewer IDs and synthetic attestations only to exercise the request-manifest contract.

These fixtures are not exported or bundled into the source-bound runtime and are not evidence of a real reviewer, real review, or real trust grant.

## Authority boundary

This change establishes only:

```text
trustGrantRequestManifestEstablished = true
```

It preserves:

```text
actualReviewerTrustGrantCount = 0
trustedDomainAttestationEstablished = false
domainReviewAuthorityEstablished = false
reviewerStatusPromotionAuthorized = false
provenanceQualityPromotionAuthorized = false
lifecyclePromotionAuthorized = false
G2A ADMITTED = false
Official Reading authority = false
Production admission = false
Production = HOLD
```

## Next external dependency

A real domain reviewer must still provide an exact current-subject review attestation.

After that attestation is independently supplied and validated, a separate reviewer-trust authority may decide whether to create an active grant whose:

```text
reviewerId
allowedReviewLevels
trustedAttestationContentHashes
status
```

satisfy the existing reviewer-trust contract.

This request manifest does not make that decision.
