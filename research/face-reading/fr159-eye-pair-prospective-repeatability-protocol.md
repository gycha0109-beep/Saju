# FR159 — Eye-pair prospective repeatability / capture-sensitivity protocol

## Decision

FR158의 네 개 neutral metric-3D 후보 중 prospective collection 전에 primary feature를 정확히 두 개로 동결한다.

1. `neutral.eye_pair.metric_3d.mean_cycle_x_span_to_full_mesh_x_span_ratio@0.1.0`
2. `neutral.eye_pair.metric_3d.mean_cycle_perimeter_to_full_mesh_x_span_ratio@0.1.0`

FR159는 **prospective protocol / capture-manifest boundary**다. 현재 fresh capture evidence가 없으므로 empirical repeatability, capture-quality validity, threshold, construct validity를 발행하지 않는다.

## Exact predecessor

Required FR158 state:

```text
schemaVersion = fr158-role-invariant-eye-pair-neutral-shape-metric-runtime-v1
authorityState = role_invariant_eye_pair_metric_3d_candidates_research_only
coordinateFrame = canonical_aligned_right_handed_metric_3d
prospectiveFreshCaptureEvaluationRequired = true
empiricalRepeatabilityEstablished = false
captureQualityValidated = false
constructValidity = unresolved
```

FR158 development captures used to select/refine candidate features are not prospective validation evidence.

## Preregistration freeze

Before any FR159 empirical collection:

```text
primary metric count = 2
candidate selection frozen = true
current development captures eligible = false
retrospective development-capture promotion = forbidden
numeric repeatability threshold = null
numeric capture-quality threshold = null
calibration ref = null
traditional criterion binding ref = null
```

The other two FR158 exploratory metrics are not silently promoted into the FR159 primary analysis set.

## Capture manifest

A future capture admitted under this protocol must carry protocol-local refs for:

- prospective collection;
- repeated capture series;
- individual capture;
- capture-condition stratum;
- sequence index within the series.

It must additionally attest:

```text
post-preregistration fresh capture = true
same-participant series = true
used for candidate selection = false
development capture reuse = false
identity matching performed = false
```

The runtime can validate the presence and exact value of these attestations. It **cannot independently prove real-world freshness or participant sameness**. Those remain acquisition-governance evidence, not computationally inferred facts.

## Identity boundary

`captureSeriesRef` exists only to group repeat captures under the study protocol.

It is not:

- an external identity;
- an identity match;
- a face embedding;
- a biometric template;
- proof of anonymity.

FR159 must not resolve or infer real-world identity in order to group captures.

## Descriptive analysis boundary

Allowed per primary metric:

```text
count
min
max
mean
range
```

These values are descriptive only.

They do **not** mean:

```text
repeatability PASS/FAIL
empirical repeatability established
capture sensitivity PASS/FAIL
capture quality validated
capture-quality construct validated
calibration
acceptance threshold
construct validity
classification
morphology
traditional binding
traditional semantic authority
```

No numeric acceptance threshold is selected from development data or invented in FR159.

## Capture-condition sensitivity

`captureConditionRef` allows future data to be stratified by protocol-defined capture conditions. FR159 does not yet define a quality vocabulary, score, ordinal quality scale, or numeric quality threshold.

Therefore a difference between condition strata may be described later but cannot automatically be called a validated capture-quality effect.

## Privacy / persistence

The FR159 protocol artifact stores none of the following:

- raw face image;
- raw provider response;
- full landmark set;
- derived full-face metric geometry;
- face embedding;
- identity template;
- external identity.

No empirical capture record or subject-derived metric dataset is bundled in the FR159 definition PR.

## Current authority state

```text
protocol implemented = true
fresh empirical capture records bundled = 0
empiricalRepeatabilityEstablished = false
captureQualityValidated = false
captureQualityMeasurementConstructValidated = false
numericRepeatabilityAcceptanceThreshold = null
numericCaptureQualityThreshold = null
constructValidity = unresolved
traditionalBinding = unresolved
traditionalSemanticAuthority = false
```

## Next frontier

`collect_fresh_post_preregistration_eye_pair_repeat_capture_series_then_describe_repeatability_and_capture_condition_sensitivity_without_threshold_or_semantic_promotion`

Only captures collected after this preregistration boundary may be considered for that frontier. Existing FR158 development captures remain ineligible.
