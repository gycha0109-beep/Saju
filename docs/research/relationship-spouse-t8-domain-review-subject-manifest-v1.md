# Saju Bridge — Relationship / Spouse T8 Domain-Review Subject Manifest

Issue: #1691

Watchtower-Track: saju-bridge

Depends on: #1681 / PR #1682

## Purpose

The source-bound runtime now has registered sources and passes the governed source-tier classification gate.

The next missing authority is a real domain review.

This artifact does **not** perform that review. It pins the exact content-addressed subjects that a future real reviewer must review so that an attestation cannot silently drift to a different methodology or rule body.

## Exact review surface

The manifest is generated from the current source-bound runtime registry snapshot.

```text
runtime version            = 1.0.1
methodology subjects       = 1
rule subjects              = 2
total review subjects      = 3
required review level      = domain
current attestations       = 0
Production                 = HOLD
```

Every subject is a `ContentAddressedVersionedRef` containing:

```text
id
version
contentHash
```

The content hash is the binding boundary.

A future review attestation for another version or another content hash is not authority for this manifest.

## Subjects

The manifest pins:

1. the source-bound Relationship Spouse T8 methodology;
2. the Yang Day Master selector rule;
3. the Yin Day Master selector rule.

The exact IDs and hashes are read from `RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY.snapshot`, not manually reconstructed.

## Required future attestation shape

The repository contract requires a real `ReviewAttestation` to contain:

```text
attestationId
subjectType = methodology | rule
subjectRef  = exact content-addressed subject
reviewLevel = domain
reviewerId
reviewedAt
decision    = approved | rejected
notes?      = optional
```

This manifest supplies only the exact `subjectType`, `subjectRef`, and required review level.

It intentionally supplies no reviewer identity, timestamp, decision, attestation ID, or trust material.

## Trust remains separate

Even a future domain `ReviewAttestation` is not by itself sufficient for trusted Production promotion.

The promotion path still requires a concrete repository-authorized reviewer trust context / grant that permits the required review level and pins the exact attestation content hash.

Therefore:

```text
review subject manifest
!= review attestation
!= trusted review authority
!= reviewerStatus promotion
!= lifecycle promotion
!= G2A ADMITTED
!= Production admission
```

## Authority state

```text
reviewSubjectManifestEstablished       = true
sourceReferenceRegistered              = true
sourceTierAuthorized                    = true

domainReviewAuthorityEstablished        = false
trustedDomainAttestationEstablished     = false
reviewerStatusPromotionAuthorized       = false
provenanceQualityPromotionAuthorized    = false
lifecyclePromotionAuthorized            = false
G2A ADMITTED                            = false
Official Reading authority              = false
Production admission                    = false

Production = HOLD
```

## Next external dependency

The next authority-bearing input cannot be synthesized by Bridge.

A real domain reviewer must review the three exact content-addressed subjects and produce real review evidence. Only after such evidence exists may a separate admission step materialize `ReviewAttestation` records and evaluate reviewer trust.

Until then, the registry's review-attestation count remains zero.
