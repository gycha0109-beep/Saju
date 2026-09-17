# General Natal Conclusion T8 — Witness Extraction and Digest Reproduction Contract

Issue: #795  
Audit base: `ab413abd1edd0ce8e7032ee3f3742ec89e0c7e4d`

## Purpose

This artifact freezes how the sixteen immutable passage digests introduced by #789 are constructed and what has actually been reproduced.

It follows #794, which established scan-backed edition/proposition corroboration but deliberately left scan-image identity and scan-derived digest reproduction unresolved.

## Observed digest contract

A fresh independent recheck of both fixed transcription surfaces reproduced all sixteen existing `passageSha256` values with one construction rule:

```text
input selection = exact bounded source substring
input encoding = UTF-8
normalization transform = NONE
hash algorithm = SHA-256
```

No Unicode normalization, whitespace folding, punctuation rewriting, case conversion, OCR correction, transliteration, or other transformation is applied before hashing.

The raw classical passages are not copied into this repository by this artifact. Each row reuses the witness ID, fixed revision URL, section locator, and expected digest already governed by #789.

## Result

```text
witnessCount = 16
uniqueWitnessIdCount = 16
fixedTranscriptionDigestReproductionObservedCount = 16
expectedDigestMatchedDuringIndependentRecheckCount = 16
runtimeIndependentExternalRefetchReproductionCount = 0
exactScanTranscriptionIdentityEstablishedCount = 0
scanDerivedDigestReproductionEstablishedCount = 0
```

Therefore:

```text
exactWitnessCoverageEstablished = true
oneDigestContractAppliedToEveryWitness = true
fixedTranscriptionDigestReproductionEstablished = true
rawPassagePersistenceRequired = false
runtimeIndependentExternalRefetchReproductionEstablished = false
exactScanTranscriptionIdentityEstablished = false
scanDerivedDigestReproductionEstablished = false
sourceIntegrityQualificationEstablished = false
modernConsumerSemanticBridgeEstablished = false
productionEligibleProvenanceEstablished = false
provenanceQualityPromotionAuthorized = false
productionAdmissionAuthority = false
Production = HOLD
```

## What the positive result means

The current witness digest is no longer an opaque literal. For every existing witness, the recorded SHA-256 can be reproduced from the exact bounded substring on the already fixed external transcription revision with UTF-8 encoding and no normalization transform.

This establishes the digest construction contract and the observed 16-of-16 transcription reproduction result.

## What it does not mean

Repository tests do not fetch the external transcription at runtime. They verify the completeness and fail-closed shape of the recorded contract, not live network availability or external page immutability beyond the already pinned revision identity.

The following remain separate and unresolved:

```text
exact scan page/folio verification
scan-image-to-transcription glyph identity
scan-derived digest reproduction
source-integrity qualification
exact consumer-semantic bridge
Production-eligible provenance
reviewer / trust / attestation authority
lifecycle promotion
```

In particular, reproducing the digest from a fixed transcription does not prove that the transcription exactly matches the physical scan. It therefore cannot by itself justify `primary_supported`, `multi_source_supported`, or any Production lifecycle change.

## Required next evidence

1. visually identify the exact scan page or folio for the bounded source surface;
2. directly compare the physical scan image with the transcription used as digest input;
3. reproduce the digest from a scan-verified transcription surface;
4. separately establish the modern consumer-semantic bridge for each exact rule/content hash;
5. only then reassess source-integrity and Production provenance authority.

## Guardrails

No raw classical passage is added here. No provenance-quality mutation, reviewer/trust/attestation fabrication, lifecycle promotion, Production activation, Gyeokguk/強弱/旺衰 implementation, ProductHost/Narrative/LLM semantic expansion, SKU change, or Commerce change occurs here.
