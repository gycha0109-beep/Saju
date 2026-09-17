# MESH6E — Prospective Real-capture Sweep Calibration Protocol

MESH6E is the first prospective calibration boundary after MESH6D. It does **not** calibrate a threshold. It freezes what must be observed before fresh capture collection begins and defines which sweep manifests may later enter a descriptive acquisition dataset.

The predecessor is MESH6D:

```text
schemaVersion   = mesh6d-multi-frame-pose-sweep-evidence-v1
authorityState  = threshold_free_multi_frame_pose_morphology_evidence_only
coordinateFrame = canonical_aligned_right_handed_metric_3d
unit            = centimeter
```

MESH6D explicitly leaves acceptable pose, repeatability, capture-quality, confidence, and production-admission policy unresolved. MESH6E preserves that boundary.

## Why protocol and acquisition are separate

The repository already uses a two-step prospective pattern in FR159/FR160:

1. pre-register the future evidence and admit protocol-local manifests;
2. only in a later runtime bind issued metric evidence to those manifests and materialize descriptive datasets.

MESH6E follows that separation. Its protocol object and manifest are not evidence that a real capture occurred. The next layer, MESH6F, may bind an issued MESH6D artifact to an admitted MESH6E manifest.

## Preregistered evidence fields

The following MESH6D output fields are frozen before prospective collection:

```text
poseSweep.lateralOrientationRadians.span
poseSweep.verticalOrientationRadians.span
poseSweep.relativeRotationFromFirstFrameRadians.max

morphologyRepeatability.observables.zygomaticSpanRatio.mad
morphologyRepeatability.observables.zygomaticSpanRatio.robustSpanP10P90
morphologyRepeatability.observables.zygomaticTemporalFlareRatio.mad
morphologyRepeatability.observables.zygomaticTemporalFlareRatio.robustSpanP10P90
morphologyRepeatability.observables.zygomaticCheekLateralReliefRatio.mad
morphologyRepeatability.observables.zygomaticCheekLateralReliefRatio.robustSpanP10P90
morphologyRepeatability.observables.bilateralZygomaticAsymmetryRatio.mad
morphologyRepeatability.observables.bilateralZygomaticAsymmetryRatio.robustSpanP10P90
morphologyRepeatability.observables.zygomaticRelativeDepthRatio.mad
morphologyRepeatability.observables.zygomaticRelativeDepthRatio.robustSpanP10P90
```

These are evidence channels, not acceptance criteria. No value or range is declared good, frontal, stable, sufficient, or production-ready.

## Prospective sweep manifest

`admitMesh6EProspectiveSweepManifest()` admits only a protocol-local manifest with:

- a non-empty prospective collection reference;
- a non-empty capture-series reference;
- a non-empty sweep reference;
- a non-empty capture-condition reference;
- a positive sweep sequence index;
- explicit post-preregistration fresh-capture attestation;
- explicit same-participant-series attestation;
- `usedForCandidateSelection = false`;
- `developmentCaptureReuse = false`;
- `identityMatchingPerformed = false`.

The two positive attestations are accepted as protocol eligibility statements only. They are **not** independently verified freshness or identity proofs. `captureSeriesRef` is only a protocol-local grouping key and is not a biometric identity assertion.

## Descriptive mechanics only

`summarizeMesh6EProspectiveEvidenceValues()` supports only preregistered evidence fields and finite values. It reports:

```text
count
min
max
mean
range
```

The helper is intentionally threshold-free. A summary does not issue repeatability pass/fail, capture-sensitivity pass/fail, pose acceptance, capture-quality acceptance, calibration, production admission, or traditional binding.

Synthetic verifier values are allowed only to test software mechanics. They do not count as real-capture evidence.

## Privacy boundary

The protocol artifact stores none of the following:

```text
raw image
raw video
raw provider response
raw landmark set
derived full-face metric geometry
face embedding
identity template
external identity
```

The protocol-local series reference is not claimed anonymous; it is merely constrained not to carry identity authority.

## Explicit unresolved values

At MESH6E definition time:

```text
empiricalFreshCaptureRecordsBundledAtDefinitionTime = 0
numericMorphologyRepeatabilityAcceptanceThreshold   = null
numericCaptureQualityThreshold                      = null
numericPoseAcceptanceThreshold                      = null
confidenceThreshold                                 = null
productionMorphologyAuthorized                      = false
```

No minimum sweep count, condition count, participant count, or condition threshold is invented in this layer.

## Fail-closed authority boundary

MESH6E keeps all of the following unavailable:

```text
repeatability pass/fail
capture-sensitivity pass/fail
frontal / three-quarter / profile classification
acceptable pose range
capture-quality score or pass/fail
confidence score
population norm
calibration issuance
threshold issuance
production morphology admission
identity matching
biometric template
physical anthropometric interpretation
anatomical measurement claim
beauty interpretation
traditional physiognomy interpretation
```

`constructValidity` and `traditionalBinding` remain `unresolved`.

## Verification

The dedicated verifier requires that:

- the exact 13-field preregistration set and order remain frozen;
- all numeric acceptance/confidence thresholds remain `null`;
- zero empirical fresh-capture records are bundled at protocol-definition time;
- valid manifests preserve the non-identity and non-calibration boundary;
- non-fresh captures are rejected;
- missing same-participant-series attestation is rejected;
- candidate-selection captures are rejected;
- development-capture reuse is rejected;
- identity matching is rejected;
- invalid sequence indices are rejected;
- non-preregistered evidence fields are rejected;
- non-finite descriptive values are rejected.

## Next frontier

MESH6F may bind an **issued MESH6D evidence artifact** to an **issued MESH6E prospective sweep manifest**, enforce one-to-one prospective linkage, and materialize descriptive fresh-capture datasets.

MESH6F still must not turn verifier fixtures, attestations, or descriptive variation into acceptable thresholds or production admission. Numeric calibration can only be considered after actual post-preregistration repeated-capture evidence exists.
