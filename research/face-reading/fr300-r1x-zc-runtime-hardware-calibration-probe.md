# FR300-R1X-ZC — Runtime existing-hardware manifest and non-human calibration receipt

Watchtower-Track: face-engine

## Decision

FR300-R1W-ZC established that existing hardware is conditionally usable for a zero-cost metric-reference probe.

FR300-R1X-ZC turns that feasibility decision into an executable evidence contract.

Repository-only state:

```text
runtime probe implementation
→ READY

real device capability receipt
→ NOT COLLECTED

real non-human calibration probe
→ NOT EXECUTED

terminal state
→ IMPLEMENTATION_READY_DEVICE_EXECUTION_REQUIRED
```

No concrete device capability is inferred from synthetic tests or static code.

## 1. Runtime hardware receipt

A real runtime receipt must be produced by an actual Android device probe.

It binds:

```text
receipt reference
capture timestamp
manufacturer
device model
Android SDK level
Camera2 camera inventory
Camera2 depth/calibration capability facts
ARCore Raw Depth capability facts
external multi-view calibration capability facts
```

The receipt additionally freezes:

```text
producedByRuntimeProbe = true
alreadyOwnedHardware = true
noPurchaseRequired = true
humanFaceCaptured = false
biometricArtifactCaptured = false
paidHardwareConsumed = false
```

Static repository code cannot manufacture a real receipt.

Synthetic receipts exist only for deterministic contract tests.

## 2. Runtime receipt → R1W lane assessment

The runtime receipt is converted into the existing R1W-ZC evaluator rather than creating a second hardware-authority system.

Each Camera2 camera becomes one:

```text
android_camera2_calibrated_hardware_depth
```

assessment.

The device-level ARCore report becomes one:

```text
arcore_raw_depth
```

assessment.

External calibration capability becomes one:

```text
external_calibrated_multiview_rgb
```

assessment.

A monocular negative control is always evaluated as:

```text
ordinary_monocular_rgb_only
```

and remains blocked as independent metric truth.

The R1W admission result is preserved:

```text
eligible_for_nonhuman_calibration_probe
or
blocked
```

No R1X conversion issues FR299 authority.

## 3. Probe preparation is separate from device capability

Hardware capability and experimental preparation are intentionally separate inputs.

The runtime receipt answers:

> What does this actual device report it can do?

Probe preparation answers:

> Is there a valid non-human, independently measured calibration setup ready?

Required preparation includes:

```text
known-dimension non-human target
independent physical measurement
accuracy-validation plan
repeatability-validation plan
candidate-provider independence
provider output hidden
provider indices hidden
traditional labels hidden
human face capture planned = false
```

This separation prevents a capable device from being treated as validated merely because it exposes depth APIs.

## 4. Non-human calibration receipt

The calibration probe accepts only an R1W assessment already marked:

```text
eligible_for_nonhuman_calibration_probe
```

The target remains:

```text
nonhuman_known_dimension_calibration_target
```

and the probe freezes:

```text
humanSubjectPresent = false
biometricArtifactPresent = false
candidateProviderOutputVisible = false
candidateProviderIndicesVisible = false
traditionalLabelsVisible = false
```

At least two independently measured validation segments are required.

Each validation segment requires at least three repeated measurements.

This stage does not issue a universal accuracy threshold. It records descriptive evidence only.

## 5. Anti-tautology scale rule

For an externally scaled multi-view reconstruction, a physical segment may be used as the scale anchor.

That anchor cannot also be a validation segment.

Required structure:

```text
scale anchor A
→ used to establish reconstruction scale

validation segment B
validation segment C
→ independently measured
→ never used to establish scale
→ used only to measure reconstruction error
```

Forbidden:

```text
scale anchor A
→ sets scale
→ then reused as validation A
→ "accuracy passed"
```

R1X rejects that construction.

For native metric-depth lanes, an explicit external scale anchor is optional, but if one is provided it likewise cannot be reused as a validation segment.

## 6. Descriptive metrics

For each validation segment, R1X calculates:

```text
knownCm
repeatCount
meanMeasuredCm
signedBiasCm
meanAbsoluteErrorCm
meanAbsoluteRelativeError
repeatabilityRangeCm
```

Aggregate output contains:

```text
meanAbsoluteErrorCm
maxAbsoluteErrorCm
meanAbsoluteRelativeError
maxRepeatabilityRangeCm
```

The result state is exactly:

```text
descriptive_probe_complete_threshold_not_issued
```

This means measurements exist. It does not mean the source passed FR299.

Therefore even after a descriptive probe:

```text
metricAccuracyValidated = false
repeatabilityValidated = false
fr299SourceIssued = false
fr299BundleMaterialized = false
```

A later adjudication must define and justify any acceptance rule.

## 7. Current authority boundary

At the repository-only stage:

```text
realRuntimeHardwareReceiptCollected = false
realDeviceCapabilityBound = false
realNonhumanCalibrationProbeExecuted = false
syntheticTestEvidenceIsRealDeviceEvidence = false

humanFaceCapturePerformed = false
biometricArtifactCollected = false

newHardwarePurchaseAuthorized = false
paidSpendAuthorized = false

FR299 eligible candidate count = 0
FR300-R2 eligible count = 0
Product = 18/29
```

No production or commerce authority is changed.

## 8. External execution blocker

The remaining blocker is now concrete:

```text
real_android_device_or_equivalent_existing_hardware_runtime_receipt_required
```

This is not a research ambiguity.

The contracts and calculations can be implemented and tested in the repository, but real capability facts must come from actual hardware execution.

## 9. Next frontier

After R1X is merged, the next evidence frontier is:

```text
FR300-R1Y-ZC
Real-Device Capability Receipt Acquisition
```

Execution order:

1. run the capability probe on existing hardware;
2. persist only non-biometric capability metadata;
3. convert the receipt through the R1W/R1X evaluator;
4. if every lane is blocked, stop the zero-cost existing-hardware path;
5. if a lane is eligible, run the known-dimension non-human calibration target;
6. record descriptive error/repeatability evidence;
7. separately adjudicate whether the evidence is sufficient to attempt a real FR299 source-validation stage.

No face capture is part of R1Y's capability-inventory step.

Watchtower-Track: face-engine
