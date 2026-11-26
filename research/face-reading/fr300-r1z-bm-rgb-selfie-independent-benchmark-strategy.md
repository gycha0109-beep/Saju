# FR300-R1Z-BM — Ordinary RGB-Selfie Independent Benchmark Strategy

Watchtower-Track: face-engine

## Decision

The next Face Reading benchmark is frozen around the real product input:

```text
ordinary smartphone front-camera RGB selfie
25–30 cm
```

The first benchmark target is:

```text
nose.tip_bridge_relative_projection
```

No special depth capability becomes a product prerequisite.

This stage does not acquire a dataset, capture a subject, issue an acceptance threshold, select a benchmark winner, or materialize an FR299 reference.

Terminal state:

```text
benchmark_strategy_frozen_reference_acquisition_next
```

## 1. Why nose tip ↔ bridge relative projection is first

FR282 already classifies:

```text
nose.tip_bridge_relative_projection
→ rgb_relative_3d_shape
→ relative_3d_benchmark_required
```

FR298 already freezes the neutral reference definition:

```text
abs(tip.z - bridgeRoot.z)
/
euclideanDistance3D(tip, bridgeRoot)
```

The result is a unitless ratio in [0,1].

Therefore R1Z-BM does not invent a new nose measurement.

It reuses the existing FR298 definition and adds the missing benchmark execution contract.

## 2. Product candidate lane

The candidate under test must be generated from the same class of input the product uses:

```text
ordinary smartphone RGB front camera
RGB only
25–30 cm
```

The candidate must declare:

```text
sourceRgbOnly = true
specialDepthHardwareConsumed = false
metric3DInputConsumed = false
physicalMillimeterOutputClaimed = false
candidateOutputSemantics = unitless_relative_shape_only
traditionalSemanticBindingClaimed = false
```

The benchmark must not create a separate privileged candidate pipeline that is unavailable to the product.

The candidate receipt also binds:

- RGB observation reference;
- subject binding reference;
- provider version;
- canonicalizer version;
- face snapshot version;
- capture distance;
- yaw bin;
- pitch bin;
- device reference;
- lighting bin.

## 3. Final reference authority

A final benchmark pair may use only an FR299-grade reference.

That means the source must be:

```text
independent_calibrated_3d
or
independent_validated_depth
```

and must preserve the FR299 requirements:

- metric scale verified;
- independent from the candidate provider;
- provider output not used as reference;
- provider indices not used as reference;
- externally validated canonical registration;
- metric scale preserved or calibrated;
- same-capture or validated-registration correspondence;
- correspondence verified;
- provider-blind construction;
- provider-index-blind construction;
- traditional-label-blind construction;
- reference frozen before candidate scoring.

Candidate-derived geometry can never become benchmark truth.

## 4. Historical ARCore role

FR273–FR280 are already reconciled by FR300-R1Y-RC.

Their current role remains:

```text
ARCore Raw Depth
→ operational research reference candidate only
→ not FR299 truth
```

R1Z-BM does not reopen the old special-depth product path.

ARCore may still be used for:

- research sanity checks;
- coarse consistency checks;
- experiments that answer a new scientific question.

It cannot satisfy final FR299-grade benchmark admission by itself under the current evidence.

## 5. Candidate/reference correspondence

A correct 3D source is insufficient if it is not correctly paired with the exact RGB observation being scored.

R1Z-BM therefore requires both:

```text
subjectBindingRef(candidate)
=
subjectBindingRef(reference)
```

and:

```text
candidate.rgbObservationRef
=
FR299.rgbBinding.rgbObservationRef
```

The FR299 bundle itself must already establish either:

```text
same-capture binding
or
validated-registration binding
```

This prevents comparison across mismatched subject/capture evidence.

## 6. Leakage prevention

The benchmark must fail closed if reference construction depends on the candidate provider.

Forbidden:

```text
MediaPipe/provider output
→ choose the 3D truth point

provider landmark index
→ define FR266 or FR297 truth

candidate result
→ tune registration

traditional interpretation label
→ choose or adjust reference annotation
```

The existing FR295/FR299 contracts already enforce the core blindness requirements.

R1Z-BM requires the final reference to remain inside that authority chain.

## 7. Per-pair descriptive metrics

For every admitted pair:

```text
candidateScalar
referenceScalar

signedError
= candidateScalar - referenceScalar

absoluteError
= abs(signedError)

relativeError
= absoluteError / abs(referenceScalar)
```

If the reference scalar is exactly zero:

```text
relativeError = null
```

rather than emitting infinity or an arbitrary replacement value.

All of these remain descriptive measurements.

## 8. Cohort descriptive metrics

When multiple admitted observations exist, the frozen aggregate schema reports:

- mean absolute error;
- median absolute error;
- mean signed bias;
- signed-error standard deviation;
- Spearman rank correlation when mathematically defined.

The benchmark also carries explicit strata for:

- capture distance;
- yaw;
- pitch;
- device;
- lighting.

This is necessary because a global mean can hide a systematic product-boundary failure such as:

```text
25 cm → stable
30 cm → unstable
```

No threshold is issued by R1Z-BM.

## 9. Capture strata

Product capture remains bounded to 25–30 cm.

R1Z-BM records the exact capture distance rather than inventing a pass threshold or forcing three hard-coded distance buckets.

Pose bins are frozen as:

```text
yaw:
neutral
slight_left
slight_right

pitch:
neutral
slight_up
slight_down
```

These are descriptive strata.

They do not yet define the final recapture threshold.

## 10. Rights receipt

A technically valid 3D pair is still not benchmark-admissible if the intended internal product-development use is not authorized.

The rights receipt separates:

```text
internal research use
commercial research and development
raw artifact redistribution
derived metric metadata publication
product runtime use
```

For R1Z-BM pair admission, at minimum:

```text
internal research use
= explicitly_allowed

commercial research and development
= explicitly_allowed
```

Raw redistribution and runtime use do not need to be allowed merely to perform the internal benchmark.

Those rights remain separately recorded rather than inferred.

## 11. Privacy and Git boundary

The benchmark may persist:

- governed opaque references;
- SHA-256 artifact digests;
- derived scalar receipts;
- aggregate metrics.

It may not commit:

```text
raw RGB face image
raw 3D face mesh
raw depth
```

to Git.

R1Z-BM itself captures no human subject and acquires no dataset.

## 12. Existing authority reused

R1Z-BM depends on and preserves:

### FR282

Product capture:

```text
ordinary_smartphone_rgb_front_camera
25–30 cm
special depth not required
```

Target feature:

```text
nose.tip_bridge_relative_projection
→ relative_3d_benchmark_required
```

### FR295

Candidate/reference benchmark admission and provider-independence boundaries.

### FR298

Provider-independent neutral tip–bridge relative projection axis.

### FR299

Independent metric 3D/reference bundle, external registration, correspondence, privacy, and freeze-before-scoring requirements.

### FR300-R1Y-RC

Historical real-device depth evidence reconciled and special-depth product dependency retired.

## 13. What R1Z-BM does not do

This stage does not:

- acquire AST, UL-DD, MINDS, or another dataset;
- request controlled access;
- sign a DUA;
- capture a new face;
- use ARCore as FR299 truth;
- choose a benchmark winner;
- issue a numerical acceptance threshold;
- calibrate the product output;
- create a traditional physiognomy binding;
- increment Product materialization;
- activate production or commerce;
- authorize paid spend.

## 14. Canonical current state

```text
first benchmark target
= nose.tip_bridge_relative_projection

product candidate lane
= ordinary RGB selfie / 25–30 cm / RGB-only

final reference authority
= FR299-grade independent metric 3D only

ARCore
= research-only auxiliary candidate

correspondence
= exact RGB observation + subject binding
  plus FR299 same-capture or validated registration

error schema
= frozen

cohort aggregate schema
= frozen

threshold
= not issued

dataset acquired
= false

human subject captured
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

## 15. Next frontier

The next task is now narrow:

```text
qualify and acquire the first FR299-grade
RGB + independent 3D reference pair
for nose.tip_bridge_relative_projection
```

Candidate sources such as AST controlled raw, UL-DD, MINDS, or a separately acquired calibrated source should be judged against this exact benchmark contract.

The next source must not be selected merely because it contains a 3D face.

It must satisfy:

1. rights for internal/commercial R&D;
2. real RGB;
3. independent metric 3D;
4. metric-scale authority;
5. subject/capture pairing;
6. candidate-independent canonical registration;
7. verified RGB↔3D correspondence;
8. provider-blind FR266/FR297 annotation feasibility;
9. raw-artifact privacy handling.

Only then can the first real benchmark pair be materialized.

Watchtower-Track: face-engine
