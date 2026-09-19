# FR199 — Public synthetic same-sample zygion correspondence execution

Issue: #891

## Purpose

FR199 executes the public synthetic same-sample lane registered by FR198.

Required ordering is preserved:

```text
public OBJ
→ independent 3D zygion derivation
→ freeze reference
→ only then run pinned MediaPipe 0.10.35
→ descriptive correspondence review
```

No user recapture, repeated capture campaign, threshold, calibration, classifier, traditional projection, Production activation, or Commerce activation is introduced.

## Pinned sources

Independent reference source:

```text
repository
= research-digitized-rhinoplasty/3D-Facial-Landmark-Detection

algorithm
= public Topsakal et al. geometric landmark notebook
```

Public same-ID corpus:

```text
research-digitized-rhinoplasty/3D-face-morph-dataset-male
research-digitized-rhinoplasty/3D-face-morph-dataset-female

total base identities
= 20
```

Provider:

```text
@mediapipe/tasks-vision
= 0.10.35

candidate pair
= [234, 454]
```

## SOURCE_EXACT execution

The published notebook initializes `zygion = []` before checking:

```python
if 'zygion' in locals():
    return zygion
```

FR199 preserves that control flow in SOURCE_EXACT mode.

Observed corpus result:

```text
SOURCE_EXACT bilateral success
= 18 / 20

SOURCE_EXACT fail-closed
= male-32
= female-27
```

Both failures returned only one side in the first width band and were not silently repaired.

## INTENDED_LOOP_REPAIR execution

A separately versioned research mode was implemented:

```text
referenceMethod
= topsakal_2023_public_notebook_intended_loop_repair_v1
```

The repair removes the unconditional first-iteration return, but it is not represented as a one-line source patch. The published source also appends candidates into one `zygion` list declared outside the loop; deleting only the return would allow a one-sided point from an earlier band to contaminate a later result.

The separately versioned repair therefore evaluates each widened band as a fresh bilateral search while preserving the source constants and widening step:

```text
CURRENT_MIN_WIDTH
= 52.5

first CURRENT_MAX_WIDTH
= 57.5

widening
= +2.5
```

A bilateral pair is returned only when both sides exist in the same widened search state. This behavior is explicitly research-repaired and is not source-exact.

Observed result:

```text
INTENDED_LOOP_REPAIR bilateral success
= 20 / 20

male-32
first band 57.5 → one side only
second band 60.0 → bilateral

female-27
first band 57.5 → one side only
second band 60.0 → bilateral
```

This repaired result is not described as source-exact.

## Same-ID public 2D provider execution

For the 18 SOURCE_EXACT-ready identities, pinned MediaPipe 0.10.35 was executed on the public `2D-photos/<sample>.png` asset.

Observed result:

```text
provider executions
= 18 / 18 success

provider failures
= 0
```

This original-photo lane does not itself provide a published camera projection from OBJ XYZ into the PNG coordinate frame.

Therefore raw 3D Euclidean distance to normalized MediaPipe 2D points remains unauthorized.

## OBJ material-UV same-raster bridge

FR199 additionally uses a source-bounded mapping already present in each OBJ/MTL pair:

```text
independent zygion XYZ
→ exact OBJ vertex index
→ incident face v/vt binding
→ exact OBJ vt coordinate
→ MTL map_Kd texture JPEG
```

This is a material UV parameterization bridge, not a recovered camera projection.

For the top-left raster comparison the experiment explicitly records the convention assumption:

```text
x = u
y = 1 - v
```

The original OBJ `v` coordinate is preserved in the receipt before this raster-origin conversion.

Observed SOURCE_EXACT-ready result:

```text
exact single UV coordinate for both reference vertices
= 18 / 18 samples

MTL texture binding verified
= 18 / 18 samples

texture image dimensions
= 2048 × 2048

MediaPipe face detection on exact MTL texture image
= 18 / 18 success

MediaPipe landmark count
= 478 / successful texture image
```

This resolves an OBJ-vertex → material-texture coordinate bridge for the exact bound texture asset. It does not establish a camera projection into the separate `2D-photos/*.png` asset.

## Descriptive unordered candidate comparison

No anatomical left/right label was assigned.

For each sample, the two possible unordered assignments were compared descriptively in the normalized texture raster frame.

Observed assignment:

```text
reference[0] ↔ provider 454
reference[1] ↔ provider 234

minimum-sum unordered assignment
= 18 / 18 samples
```

Across the 36 individual assigned point observations:

```text
normalized point distance min
= 0.018157244281564684

normalized point distance max
= 0.10932565407971749

normalized point distance mean
= 0.08054225027688856

normalized point distance median
= 0.08527253329878706
```

These are descriptive distances only. No acceptance cutoff is created.

## All-478 descriptive rank check

The frozen independent UV reference was also compared against every one of the 478 provider landmarks on the exact same texture raster.

The assigned 234/454 candidate's one-based distance rank was recorded without using any threshold.

Observed over 36 reference-point observations:

```text
candidate rank min
= 2

candidate rank max
= 157

candidate rank mean
= 71.13888888888889

candidate rank median
= 71.5

candidate ranked #1
= 0 / 36

candidate within top 5
= 1 / 36

candidate within top 10
= 2 / 36
```

Therefore FR199 does not provide descriptive evidence that 234/454 are the nearest provider counterparts to the independent reference under this material-UV bridge.

The experiment does observe recurrent nearer provider indices, but FR199 does not promote any alternative index pair. Selecting a replacement candidate would be a separate research question and must not be back-fit from this corpus without governance.

## Descriptive nearest-provider discovery extension

After the 234/454 rank result was known, the existing all-478 observations were aggregated without changing the frozen independent references and without creating an admission rule.

Executed observations:

```text
SOURCE_EXACT-ready texture samples
= 18

independent reference points
= 36
```

For `referenceOrdinal = 0`, the nearest provider landmark was:

```text
280 = 11 / 18
347 = 4 / 18
330 = 1 / 18
346 = 1 / 18
425 = 1 / 18
```

Indices 280 and 347 were each present in the top 5 for all 18 observations on that reference ordinal. Index 346 was top-5 in 16/18.

For `referenceOrdinal = 1`, the nearest provider landmark was:

```text
50  = 8 / 18
118 = 7 / 18
117 = 2 / 18
101 = 1 / 18
```

Index 118 was present in the top 5 for all 18 observations, index 117 in 16/18, and index 50 in 15/18.

The most frequent top-1 unordered ordinal pair was:

```text
280 / 50
= 7 / 18 samples
```

Mean nearest-point distance in the normalized material-texture raster frame:

```text
referenceOrdinal 0
= 0.01263513117536793

referenceOrdinal 1
= 0.0122988532364216
```

This is descriptive candidate discovery only. It does not establish that 280, 50, 347, 118, or any other provider index is zygion, and it does not authorize selecting a replacement pair from this same corpus.

Authority remains fail-closed:

```text
providerIndexAdmissionAuthorized = false
thresholdAuthorized = false
calibrationAuthorized = false
classifierAuthorized = false
productionAuthorized = false
commerceAuthorized = false
```

Exact execution:

```text
GitHub Actions run
= 35409268047
```

## Width proxy

The earlier coarse width proxy remains recorded:

```text
reference width
= |zygion.x0 - zygion.x1| / OBJ bounding width

provider width
= |landmark[234].x - landmark[454].x|

Pearson over 18 SOURCE_EXACT-ready samples
= -0.15755277325973324
```

This proxy is not point correspondence evidence and creates no threshold.

## Execution evidence

Successful UV/raster correspondence execution:

```text
GitHub Actions run
= 35407568987
```

Successful all-478 rank execution:

```text
GitHub Actions run
= 35407854992
```

Cleanup-race fix was subsequently verified by:

```text
GitHub Actions run
= 35407879678
```

The intermediate run 35407736908 completed the substantive reference/provider experiment and printed the 20/20 repaired-reference result, but the job concluded failure after experiment completion due to an `ENOTEMPTY` Chrome-profile cleanup race. That cleanup race was fixed and is not treated as an experimental failure.

## Authority interpretation

FR199 establishes:

```text
public synthetic reference execution
= true

SOURCE_EXACT bilateral references
= 18 / 20

separately versioned intended-loop repair
= 20 / 20

real pinned provider execution
= true

OBJ material-UV same-raster bridge
= executed

all-478 descriptive candidate ranking
= executed
```

FR199 does **not** establish:

```text
234 = zygion
454 = zygion
provider-side anatomical laterality
provider index admission
numeric acceptance threshold
calibration
classifier
bizygomatic production metric
traditional 六府 projection
Production activation
Commerce activation
```

The current FR199 evidence is insufficient for provider-index admission and, under the explicit material-UV bridge used here, does not support treating 234/454 as the nearest provider counterparts.

## Current authority state

```text
authorityState
= public_synthetic_material_uv_correspondence_executed_provider_candidate_not_admitted

providerIndexAdmissionAuthorized
= false

thresholdAuthorized
= false

calibrationAuthorized
= false

classifierAuthorized
= false

traditionalProjectionAuthorized
= false

productionAuthorization
= false

commerceAuthorization
= false
```

## Next research gate

Do not manufacture a threshold from FR199.

Before any provider-index admission, the discrepancy must be independently explained or corroborated with a stronger anatomical reference lane.

Possible next work remains research-only:

```text
validate / corroborate the material-UV bridge assumptions
and/or
execute an independent human-anthropometric zygion reference lane
and/or
open a separately governed provider-candidate discovery study
```

None of those gates authorizes automatic promotion of a nearer index observed in FR199.
