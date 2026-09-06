# FR154 — Square-Broad Fang Witness Signature Mechanical Verification

Status: **research mechanical signature verification only; no trusted witness identity, trust-root binding, independent-session admission, construct validation, threshold authority, or repeatability authority**.

## Purpose

FR153 can verify the byte identity of candidate witness artifacts and freeze bounded candidate evidence coordinates. It intentionally does not establish who the witness is or whether any witness claim is true.

FR154 adds a narrower cryptographic mechanism: for every candidate FR153 session, a caller can supply an Ed25519 public key and detached signature over a deterministic, bounded FR154 payload. FR154 verifies that the signature is mathematically valid for the supplied public key and verifies the public-key SPKI digest for self-consistency.

This is **mechanical cryptographic verification**, not witness authentication.

## Predecessor requirement

FR154 accepts only an actually issued process-local FR153 evidence-intake artifact. A copied/reconstructed FR153 object is rejected.

The FR153 artifact must still preserve:

- no historical FR146/FR147 auto-admission,
- no retrospective session relabeling,
- no trusted witness from a caller-supplied authority ref,
- no production witness verification algorithm,
- no pinned witness trust root,
- no independent-session admission,
- no construct, threshold, or repeatability authority.

## Canonical signature payload

For each FR153 candidate session, FR154 signs/verifies only bounded evidence coordinates:

- FR153 record id,
- `evidenceBundleRef`,
- FR153 candidate-evidence bundle digest,
- `sessionRef`,
- `captureEventRef`,
- `captureRef`,
- the unverified prospective capture-execution claim,
- `witnessArtifactRef`,
- `witnessAuthorityRef`,
- the unverified witness-class claim,
- witness artifact digest,
- `sessionSeparationClaimRef`,
- `captureToWitnessBindingClaimRef`.

The payload canonicalization is sorted-object-key JSON with array order preserved. The payload digest uses SHA-256.

No raw face image, source-image digest, provider payload, pixel raster, or raw capture-quality aggregate is part of the signature payload.

## Research Ed25519 primitive

FR154 uses Node's Ed25519 verification primitive for research mechanical verification:

```text
researchSignatureVerificationPrimitive = ed25519_node_crypto_v1
productionWitnessVerificationAlgorithm = null
```

For each candidate session FR154 requires:

- `sessionRef`,
- caller-supplied `signerKeyRef`,
- caller-supplied Ed25519 public-key PEM,
- declared public-key SPKI digest,
- detached signature bytes.

The public-key SPKI digest is recomputed and must match the declared digest. The detached signature must verify over the canonical FR154 payload.

## Critical trust distinction

A valid signature establishes only a mathematical relation among:

1. the canonical payload bytes,
2. the detached signature,
3. the supplied public key.

It does **not** establish that the supplied public key belongs to the claimed witness.

Therefore all of these remain false:

```text
callerSuppliedSignerKeyRefMeansTrustedSigner = false
callerSuppliedPublicKeyMeansPinnedTrustRoot = false
mathematicalSignatureValidityMeansTrustedWitnessIdentity = false
mathematicalSignatureValidityMeansWitnessClaimTrue = false
mathematicalSignatureValidityMeansCaptureExecutionVerified = false
mathematicalSignatureValidityMeansSessionSeparationVerified = false
mathematicalSignatureValidityMeansCaptureToWitnessBindingVerified = false
mathematicalSignatureValidityMeansIndependentSessionEvidenceAdmitted = false
```

A caller cannot create witness authority merely by generating a keypair and producing a mathematically correct signature.

## Exact coverage

FR154 requires exactly one verification record for every FR153 candidate session and rejects:

- missing candidate sessions,
- duplicate `sessionRef` verification entries,
- unknown session refs,
- malformed/non-Ed25519 public keys,
- SPKI digest mismatches,
- invalid detached signatures,
- undeclared request fields.

## Output retention

The output may retain:

- bounded FR153 evidence coordinates,
- caller `signerKeyRef`,
- public-key SPKI digest,
- signature-payload digest,
- mechanical verification booleans.

It does not retain:

- public-key PEM,
- detached signature bytes,
- raw witness artifact bytes,
- raw face media,
- source-image digests.

The public-key digest is a cryptographic coordinate for the supplied witness-signing key candidate. It is not a source-image digest and does not identify a face image.

## Authority boundary

A successful FR154 artifact may state:

```text
mechanicalWitnessSignatureVerificationPerformed = true
allCandidateSessionsCryptographicallyVerified = true
signerPublicKeySpkiDigestSelfConsistencyVerified = true
cryptographicSignatureMathematicallyVerified = true
```

It must still state:

```text
signerKeyTrustEstablished = false
witnessAuthorityTrustBound = false
externalWitnessIdentityVerified = false
witnessClassVerified = false
witnessArtifactSemanticContentVerified = false
independentMultiSessionEvidenceAcquired = false
independentMultiSessionEvidenceAdmitted = false
multiSessionIndependenceVerified = false
empiricalPerturbationValidationPerformed = false
captureQualityMeasurementConstructValidated = false
captureQualityThresholdsDefined = false
captureQualityValidated = false
repeatabilityInterpretationAllowed = false
empiricalRepeatabilityEstablished = false
repeatabilityClassificationIssued = false
numericCaptureQualityThreshold = null
numericRepeatabilityAcceptanceThreshold = null
constructValidity = unresolved
traditionalBinding = unresolved
traditionalSemanticAuthority = false
```

## Historical-data boundary

FR154 does not alter FR152/FR153's prohibition on retroactively promoting historical FR146 captures into independent sessions. Mechanical signatures produced now over historical references would still not create prospective independent-session provenance.

## Public tests

Repository tests generate ephemeral synthetic Ed25519 keypairs and signatures over synthetic FR153 candidate records. They do not use real user images, source-image digests, real witness credentials, or real prospective capture evidence.

Passing these tests demonstrates deterministic cryptographic mechanics only. It does not establish a trusted witness or a real independently witnessed capture session.

## Next frontier

The next repo/design frontier is governed witness trust evidence and trust-root binding. The next empirical frontier is genuinely new source-backed prospective capture execution.

Both are required before independent-session evidence can be admitted. No candidate construct-validity decision, capture-quality threshold, or repeatability interpretation is authorized before those evidence boundaries are satisfied.
