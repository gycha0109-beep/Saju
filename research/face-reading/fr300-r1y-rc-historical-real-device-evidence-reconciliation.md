# FR300-R1Y-RC — Historical real-device evidence reconciliation

Watchtower-Track: face-engine

## Decision

FR300-R1W-ZC and FR300-R1X-ZC were created as if the existing-hardware lane still required a first real-device capability receipt and a first non-human calibration probe.

That next-action assumption is superseded by governed historical work already present in this repository.

The repository already contains a real-device sequence:

```text
FR273
→ real SM-S938N Camera2 capability probe

FR275
→ real SM-S938N ARCore Raw Depth probe

FR276
→ real measured-motion Raw Depth cadence characterization

FR278
→ real non-human 500 / 700 / 900 mm physical-reference validation

FR280
→ product-priority supersession of further special-depth work
```

Therefore the current canonical state is:

```text
historical evidence
→ RECONCILED

new capability APK
→ NOT REQUIRED

repeat FR273 / FR275 / FR276 / FR278
→ NOT REQUIRED

next frontier
→ ordinary RGB-selfie independent benchmark/reference strategy
```

## Audit rule

R1Y-RC does **not** rewrite R1W/R1X stage constants.

Those contracts correctly describe what was known to those stages when they were authored.

Instead, R1Y-RC adds a later canonical reconciliation layer.

This preserves the audit trail:

```text
R1X historical stage
→ implementation_ready_device_execution_required

R1Y-RC current stage
→ historical evidence proves that execution had already happened earlier
```

## Important receipt distinction

The historical real-device work predates the R1X runtime receipt schema.

Therefore:

```text
real device was actually tested
= TRUE

real non-human calibration experiment was actually run
= TRUE

native R1X receipt JSON was produced on-device at that time
= FALSE

historical receipt can be reconstructed from governed repository records
= TRUE

reconstructed receipt is byte/field-equivalent to a native R1X runtime artifact
= FALSE
```

This avoids both errors:

1. pretending the physical tests never happened;
2. fabricating a native R1X artifact that did not exist at the time.

## FR273 — real Camera2 capability result

Historical authority:

- issue #1401
- PR #1402
- merge `8aa5fab5c9f02a4a0acb737e084cb1af29f418e3`
- tool: `tools/fr273-android-depth-probe/`

The governed record states that the concrete device was:

```text
SM-S938N
```

and neither front Camera2 device exposed the required user-facing metric-depth path.

Canonical reconciliation:

```text
real capability probe executed
= TRUE

front user-facing DEPTH_OUTPUT
= unavailable

front user-facing DEPTH16
= unavailable

front user-facing Camera2 metric depth path
= unavailable on SM-S938N
```

FR273 captured no face image.

## FR275 — real ARCore Raw Depth result

Historical authority:

- issue #1404
- PR #1405
- merge `91deb9703ddfd0279d15bf9a8b00259f0394bed1`
- tool: `tools/fr275-arcore-raw-depth-probe/`

FR275 established on the same concrete device:

```text
ARCore Raw Depth
→ operational

camera direction
→ world-facing

raw depth + confidence
→ sampled ephemerally

persisted RGB / depth / confidence frames
→ none
```

This never established FR299 ground truth.

Current role:

```text
ARCore Raw Depth
→ research_reference_candidate_only
```

It is not a product runtime prerequisite and is not admitted as an FR299 metric source.

## FR276 — measured-motion cadence

Historical authority:

- issue #1409
- PR #1410
- merge `2388c4961266503f0306d671d4721ca11db57a17`
- tool: `tools/fr276-arcore-depth-cadence/`

The governed FR278 trigger records the successful measured-motion rerun:

```text
elapsed
= 20.026 s

new Raw Depth frames
= 92

new-depth rate
= 4.594 Hz

median new-depth interval
= 166.596 ms

central valid-depth coverage mean
= 0.995854

acquisition errors
= none
```

Therefore the source-behavior blocker was already cleared before FR278.

## FR278 — real physical calibration experiment

Historical authority:

- issue #1414
- PR #1415
- merge `e7aeb3cfdd8fdc1fcf80b8ff9fb2ae11b474834e`
- tool: `tools/fr278-arcore-planar-validation/`

The real-device bundle used:

```text
500 mm
700 mm
900 mm

3 independent trials per distance
5 s per trial
Raw Depth 160 x 90
central ROI 20% x 20%
```

No face was required.

### Superseding opaque-target rerun

The later opaque cardboard-box rerun superseded the earlier interpretation of globally compressed scale.

Observed valid-depth repeat medians:

```text
500 mm
→ 535.5 mm

700 mm
→ 725.0 mm

900 mm
→ 653.5 mm
```

Known 500→700 physical step:

```text
nominal
= 200 mm

recovered
= 189.5 mm

error
= -10.5 mm
= -5.25%
```

The 700→900 result is not usable as a metric step because the 900 mm ROI was contaminated or failed target membership.

Therefore FR278 establishes:

```text
real non-human calibration experiment executed
= TRUE

some useful metric behavior characterized
= TRUE

FR299-grade metric accuracy validated
= FALSE

FR299-grade repeatability validated
= FALSE
```

The correct authority state is:

```text
partially_characterized_not_admitted
```

## FR280 — product-priority supersession

Historical authority:

- issue #1420
- superseded on 2026-09-24

FR280 explicitly changed the research priority.

Product input:

```text
ordinary smartphone RGB selfie
25–30 cm
```

Therefore:

```text
special depth capability as product prerequisite
= FORBIDDEN

ARCore globally invalid
= FALSE

ARCore as offline research candidate
= STILL POSSIBLE

further hardware-depth product-priority work
= SUPERSEDED
```

The next product-relevant question is ordinary RGB-selfie feature recovery and independent benchmarking.

## R1X next-action retirement

R1X had:

```text
real_android_device_or_equivalent_existing_hardware_runtime_receipt_required
```

as its repository-only blocker.

R1Y-RC does not claim that a native R1X receipt existed.

Instead it resolves the practical next-action question from governed historical evidence:

```text
Do we need another APK merely to rediscover the SM-S938N capability facts?
→ NO

Do we need to repeat the existing ARCore operational probe?
→ NO

Do we need to repeat cadence characterization before proceeding?
→ NO

Do we need to repeat FR278 merely to prove that a non-human calibration experiment happened?
→ NO
```

Any future hardware experiment must answer a **new scientific question**, not reproduce FR273–FR278.

## Canonical current state

```text
realDeviceObserved
= true

concreteDeviceModelBound
= true

historicalRealDeviceCapabilityEvidenceExists
= true

historicalReceiptReconstructedFromGovernedRecords
= true

nativeR1XRuntimeReceiptProducedAtTheTime
= false

realNonhumanCalibrationExperimentExecuted
= true

newCapabilityApkRequired
= false

front user-facing Camera2 metric-depth lane
= unavailable_on_sm_s938n

ARCore Raw Depth lane
= operational_research_reference_candidate_only

ARCore metric accuracy validated for FR299
= false

ARCore repeatability validated for FR299
= false

special depth may become product requirement
= false

FR299 eligible candidate count
= 0

FR300-R2 eligible candidate count
= 0

Product
= 18/29

paid spend
= 0
```

## Next frontier

Return to:

```text
ordinary RGB-selfie independent benchmark/reference strategy
```

The benchmark problem is now:

```text
ordinary RGB selfie
→ governed neutral geometry estimate

versus

independent external reference
→ candidate-provider-independent truth
```

The special-depth lane may remain available as bounded offline research evidence, but it may not become a user-facing product dependency.

Watchtower-Track: face-engine
