# General Natal — Source-Bounded Domain-Review Subject Manifest

Issue: #810

## Purpose

This artifact creates a deterministic review handoff for the current source-bounded General Natal candidate.

It does **not** create a reviewer, a review decision, a trust grant, an attestation, a provenance promotion, or Production authority.

## Candidate identity

```text
candidateVersion = 0.2.0-research
```

The manifest is derived from `createGeneralNatalSourceBoundedRegistry()` and therefore uses the registry snapshot's own content-addressed refs instead of manually copied hashes.

## Review surface

The current candidate contains:

```text
1 methodology
5 T5 family-presence rules
5 T8 structural-relation rules
--------------------------------
11 domain-review subjects
```

Each subject records:

```text
subjectType
subjectRef.id
subjectRef.version
subjectRef.contentHash
requiredReviewLevel = domain
attestationState = absent
```

The manifest also records the exact `registrySnapshotId` and content-addressed `packRef` from which the review subjects were derived.

## Determinism

Subjects are sorted by stable subject identity and the complete manifest core is hashed with the repository's existing `deterministicContentHash()` function.

Repeated builds over unchanged candidate content must produce the same:

```text
registrySnapshotId
subject refs
manifestHash
```

Any rule or methodology content change changes the corresponding content hash and therefore changes the review handoff surface.

## Review authority boundary

The current registry contains no review attestations for this candidate.

```text
reviewSubjectManifestEstablished = true
reviewSubjectCount = 11
reviewAttestationCount = 0
requiredReviewLevel = domain
```

This artifact deliberately does not invent:

```text
reviewerId
review decision
ReviewAttestation
ReviewerTrustContext
trusted attestation hash
domain_reviewed status
```

A future domain review must bind the exact current content-addressed subject ref. A future trust policy must independently trust the exact resulting attestation content hash before promoted execution can rely on it.

## Source and provenance boundary

#807 closes the source-count asymmetry for the peer-family T5 rule, but two source refs are not by themselves proof of Production-grade provenance.

The following remain fail-closed:

```text
sourceIntegrityQualificationEstablished = false
provenanceQualityPromotionAuthorized = false
domainReviewAuthorityEstablished = false
trustedDomainAttestationEstablished = false
productionAdmissionAuthority = false
Production = HOLD
```

No `secondary_only -> multi_source_supported` change is made here.

## Lifecycle boundary

The candidate remains research-only:

```text
pack.status = research
methodology.status = research
rule.status = research
provenanceQuality = secondary_only
reviewerStatus = unreviewed
```

The manifest is only the immutable subject list a real reviewer would review.

## Non-scope

No source-integrity promotion, no reviewer identity, no review attestation, no trust grant, no lifecycle promotion, no consumer semantic expansion, no Gyeokguk, 強弱, 旺衰, Yongshin, timing, SKU, ProductHost, Narrative, LLM semantic generation, or Commerce change is introduced.
