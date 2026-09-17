# General Natal — External Domain-Review Attestation Intake

Issue: #815

## Purpose

This artifact provides the source-bounded General Natal candidate with a narrow intake path for externally supplied `ReviewAttestation` records.

It does **not** create or bundle any reviewer identity, review decision, trust grant, attestation, provenance promotion, lifecycle promotion, or Production authority.

## Existing authority reused

The repository's generic registry already validates review attestation inputs. In particular it rejects:

```text
invalid / empty reviewer identity
invalid reviewedAt
attestation-id duplicates
subject id/version/content-hash mismatch
```

The intake path does not replace or weaken that contract. It passes the supplied attestations unchanged into `createRuleRegistrySnapshot()`.

## Candidate composition

The intake registry is assembled from the exact same current candidate components:

```text
5 T5 source-bounded family rules
5 T8 source-bounded structural-relation rules
1 source-bounded methodology
3 registered classical sources
1 research pack
```

When the supplied attestation array is empty, the resulting registry snapshot must be exactly equal to `createGeneralNatalSourceBoundedRegistry()`.

This regression protects the intake path from silently becoming a second interpretation candidate.

## External attestation behavior

A caller may supply a `ReviewAttestation` whose `subjectRef` exactly matches one of the content-addressed subjects pinned by the #811 review-subject manifest.

The generic registry validates that exact binding before the attestation is admitted into the resolved research registry.

A stale or mutated subject content hash is rejected with:

```text
REVIEW_ATTESTATION_SUBJECT_MISMATCH
```

An invalid reviewer identity or malformed attestation is rejected with:

```text
REVIEW_ATTESTATION_INVALID
```

## Test fixture boundary

Regression tests use a synthetic reviewer identifier and an `approved` test attestation only to exercise the intake contract.

That fixture is not exported, not bundled with runtime candidate content, and does not represent a real review or authority.

## What intake does not mean

Successful registry intake does not change any candidate quality or lifecycle metadata:

```text
pack.status = research
methodology.status = research
rule.status = research
rule.provenanceQuality = secondary_only
rule.reviewerStatus = unreviewed
```

It also does not provide a `ReviewerTrustContext` or trusted attestation hash. Promoted execution continues to require those independently governed inputs.

Therefore:

```text
externalReviewAttestationIntakePathEstablished = true
bundledReviewAttestationCount = 0
reviewSubjectManifestEstablished = true
sourceIntegrityQualificationEstablished = false
provenanceQualityPromotionAuthorized = false
domainReviewAuthorityEstablished = false
trustedDomainAttestationEstablished = false
productionAdmissionAuthority = false
Production = HOLD
```

## Next external dependency

The software path can now accept a real review record without changing candidate semantics.

The next review-side input must come from an actual domain reviewer and must bind the exact current #811 subject content hashes. Reviewer trust must then be supplied independently and pin the exact resulting attestation content hashes. Neither may be synthesized by this artifact.

## Non-scope

No reviewer assignment, no review decision on behalf of a reviewer, no bundled `ReviewAttestation`, no trust policy/grant, no `domain_reviewed` mutation, no provenance promotion, no lifecycle promotion, no Production pack, no semantic expansion, no Gyeokguk, 強弱, 旺衰, Yongshin, timing, SKU, ProductHost, Narrative, LLM semantic expansion, or Commerce change is introduced.
