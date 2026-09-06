# FR153 — Square-Broad Fang Independent-Session Witness Evidence Intake

Status: **candidate witness-evidence intake contract only; no trusted witness, independent-session admission, construct validation, threshold authority, or repeatability authority**.

## Purpose

FR152 froze the prospective requirement that at least two new source-backed capture sessions must be supported by external or operator-independent witness evidence before multi-session independence can be admitted.

FR153 adds the next mechanical boundary: it can ingest candidate witness artifact bytes for prospective session records, verify each supplied artifact against its declared byte digest, and freeze only bounded evidence coordinates. It intentionally does **not** decide whether the witness is trusted, whether the witness claim is true, whether a capture actually occurred independently, whether two sessions are independently separated, or whether the capture-to-witness binding is semantically valid.

This is analogous to an evidence-intake layer, not an authority or adjudication layer.

## Preconditions

The active process must provide an actually issued FR152 protocol object. A copied or reconstructed FR152 object is rejected by the process-local issuance boundary.

The request must contain at least two candidate session records. Each candidate record must have unique:

- `sessionRef`
- `captureEventRef`
- `captureRef`
- `witnessArtifactRef`

FR153 also requires bounded opaque references for the witness authority, session-separation claim, and capture-to-witness binding claim.

## Candidate witness artifact byte check

At intake, each candidate witness artifact supplies:

- declared canonical `sha256:<64-hex>` digest,
- non-empty witness artifact bytes.

FR153 recomputes the artifact digest and rejects any mismatch.

This byte check establishes only that the bytes supplied to FR153 match the caller-declared byte identity. It does **not** establish:

- witness identity,
- witness independence,
- witness trust,
- witness statement truth,
- witness artifact semantic validity,
- session separation,
- capture-event independence,
- capture-to-witness binding validity.

The output may persist the witness-artifact digest because that digest identifies the witness evidence artifact, not the private source face image. FR153 does not accept a source-image digest.

## Prospective capture claim boundary

Each candidate uses the literal claim:

`prospective_source_backed_capture_executed_after_fr152_freeze_not_independently_verified`

This remains a claim. FR153 does not re-run the capture provider and does not independently verify that the capture occurred after protocol freeze.

A successful FR153 materialization therefore means **candidate witness-evidence intake succeeded**, not that prospective multi-session evidence has been acquired or admitted.

## Historical-data boundary

FR153 preserves FR152's historical restrictions:

- historical FR146/FR147 captures are not automatically admitted as independent sessions;
- retrospective relabeling is forbidden;
- distinct opaque refs do not prove independence;
- byte distinctness does not prove capture-event or session independence;
- upload separation or separate chat attachments do not prove separate sessions;
- perturbation variants are not independent captures;
- study-operator self-attestation alone is insufficient.

## Witness trust boundary

FR153 deliberately keeps both values unresolved:

```text
productionWitnessVerificationAlgorithm = null
pinnedWitnessTrustRootRef = null
```

A caller-supplied `witnessAuthorityRef` is not a trust root. Matching witness bytes are not a trust root. Mathematical signature validity, if introduced later, must not by itself be treated as trusted witness identity unless a governed trust binding is also established.

FR153 therefore leaves:

```text
witnessAuthorityTrustBound = false
witnessClassVerified = false
witnessArtifactSemanticContentVerified = false
independentSessionEvidenceCanBeAdmittedByThisArtifact = false
```

## Privacy boundary

FR153 does not accept or persist:

- raw face images,
- provider responses,
- raw pixel rasters,
- raw capture-quality aggregates,
- source-image digests,
- embeddings,
- identity templates,
- exact capture timestamps,
- geolocation,
- device identifiers.

Witness artifact bytes are required transiently at intake for byte-identity verification but are not retained in the output.

## Authority boundary

A successfully issued FR153 artifact may state:

```text
candidateWitnessEvidenceIntakePerformed = true
candidateWitnessEvidenceByteIdentityVerifiedForEveryEntry = true
candidateEvidenceBundleMaterialized = true
```

It must simultaneously retain:

```text
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

`byte identity verified` is not synonymous with `claim verified`, `witness trusted`, `session independent`, or `construct valid`.

## Public test data

Repository tests use synthetic witness bytes and synthetic opaque references only. They do not contain user face media, source-image digests, real witness evidence, or real prospective capture evidence.

## Next frontier

The next empirical frontier is still external to repository-only synthetic tests:

1. execute new source-backed capture sessions prospectively after the FR152 freeze;
2. collect the corresponding candidate witness evidence;
3. establish a governed witness-verification algorithm and trusted witness authority binding;
4. verify witness identity/content and capture-to-witness/session-separation evidence;
5. only then consider independent multi-session evidence admission.

No candidate construct-validity decision, capture-quality threshold, or repeatability interpretation is authorized before that evidence exists.
