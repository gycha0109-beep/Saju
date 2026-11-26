# FR173 — Eye-Pair Governed Participant Media Ingress Resource Policy

## Status

FR172 merged the pinned production C2PA verifier runtime but deliberately left participant execution blocked because no governed media-ingress byte ceiling existed.

FR173 resolves that operational resource-policy gap without admitting participant evidence.

## Predecessor

FR173 accepts only an actively issued FR172 runtime-integration artifact. A copied or caller-constructed object is not sufficient.

The predecessor continues to bind the official C2PA verifier path:

```text
contentauth/c2pa-rs
c2patool-v0.27.22
target commit 1a56d244ee77d7e58221eabebede4281d9e868a4
```

FR173 does not replace or weaken the FR170 trust-list / conforming-product pins or the FR171 Proofmode Android/iOS profile policy.

## Governed application resource ceiling

FR173 establishes:

```text
maximum participant media bytes = 33,554,432 bytes
maximum participant media MiB   = 32 MiB
required media type             = image/jpeg
media objects per admission     = 1
transport                       = raw binary
```

The 32 MiB value is a **MyeongHa application operational resource ceiling**. It is not an externally discovered semantic truth.

It is explicitly **not**:

- a C2PA specification threshold;
- a Proofmode specification threshold;
- a biometric threshold;
- a capture-quality threshold;
- an empirical repeatability threshold;
- a participant-derived calibration;
- a traditional face-reading threshold.

The existing Saju product-host `16 * 1024` request-body limit governs JSON calculation/reading requests and is not inherited as participant JPEG authority.

## Length enforcement

For one prospective participant-media admission attempt:

1. the normalized media type must be `image/jpeg`;
2. the transport must provide raw binary media rather than base64 JSON;
3. the actually observed byte count must be a positive safe integer no greater than 33,554,432;
4. when `Content-Length` is present, it must be a non-negative safe integer no greater than 33,554,432;
5. when present, declared length must equal the actually observed byte count;
6. observed bytes remain authoritative for the maximum-size enforcement even when a declared length exists.

A declared header therefore cannot make an oversized or mismatched body admissible.

## Exact-byte C2PA ordering

A general image-privacy pipeline may prefer metadata stripping before downstream analysis, but that transformation cannot be moved in front of C2PA verification. C2PA asset binding is evaluated against the authority-bearing original bytes.

FR173 freezes this order:

```text
new prospective original Proofmode JPEG exact bytes
→ resource admission under FR173
→ pinned c2patool verification against those same exact bytes
→ dispose transient original
→ only then, if needed, derive a sanitized downstream analysis image
```

Before the pinned verifier runs, FR173 forbids:

- EXIF stripping;
- resize;
- recompression;
- transcoding;
- decode/re-encode;
- replacement by a sanitized derivative.

A post-verification sanitized derivative can support downstream Face Reading, but it can never replace the original as the evidence object whose C2PA binding was verified.

## Temporary-resource boundary

If the verifier needs a filesystem path, a temporary file may contain the exact accepted bytes only for verifier execution.

The runtime that consumes this policy must ensure:

- no repository fixture is created from participant media;
- cleanup after successful verification;
- cleanup after failed verification;
- no long-term persistence of the raw original after the verification lifecycle.

FR173 itself accepts metadata only and therefore does not persist participant bytes, manifests, image digests, geometry, embeddings, or identity templates.

## Authority boundary

Resolving an ingress resource ceiling is operational readiness, not witness authority.

FR173 keeps all of the following false:

```text
actualWitnessCredentialAdmitted
captureToWitnessBindingVerifiedForParticipantMedia
signerKeyTrustEstablishedForParticipantMedia
witnessAuthorityTrustBoundForParticipantMedia
externalWitnessAuthorityEstablishedForParticipantMedia
semanticTrustEvidenceVerificationPerformedForParticipantMedia
independentSessionEvidenceAdmitted
multiSessionIndependenceVerified
empiricalRepeatabilityEstablished
captureQualityValidated
inferentialStatisticIssued
repeatabilityPassFailIssued
captureSensitivityPassFailIssued
calibrationIssued
thresholdsIssued
identityMatchingPerformed
biometricTemplateIssued
traditionalSemanticAuthority
```

Issue #492 therefore remains open.

## What FR173 changes

After successful FR173 issuance:

```text
productionIngressByteLimitResolved = true
maximumParticipantMediaBytes = 33,554,432
metadataOnlyAdmissionValidatorImplemented = true
```

This permits a future genuine participant original to proceed to the pinned verifier **only after** the metadata/resource checks succeed. It does not claim that any participant image has yet been received or verified.

## Next frontier

```text
accept_genuine_new_prospective_original_proofmode_jpeg_within_governed_ingress_policy_then_execute_pinned_c2pa_verifier_and_admit_session_if_all_checks_succeed
```

That next step requires genuinely new prospective participant media and cannot be satisfied by public fixtures, synthetic fixtures, ordinary camera images, screenshots, recompressed exports, or FR163–FR165 session images.
