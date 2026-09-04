# FR134 — Square-Broad Neutral Shape Metric Runtime and Construct-Validity Dataset Design

Status: research-neutral implementation only
Date: 2026-09-04
Traditional binding: not authorized
Calibration / threshold: not authorized

## Purpose

FR133 established that `方大` is only partially image-observable under the current authority boundary. It also identified two shape candidates that can be derived from the existing release-exact, pose-normalized, role-free lip closed cycles without assigning outer/inner anatomy:

- closed-cycle edge orientation relative to the canonical X/Y axes;
- local closed-cycle direction change / turning angle.

FR134 implements those two properties as neutral continuous metrics. It does **not** claim that either metric is `方`, that either closed cycle is the external mouth outline, or that a numeric value is favorable/unfavorable.

## Implemented neutral metrics

### 1. Closed-cycle axis-alignment mean

Ref: `neutral.mouth.contour_set.closed_cycle_axis_alignment_mean@0.1.0`

For every directed edge in both 20-point closed cycles:

`max(|dx|, |dy|) / hypot(dx, dy)`

is computed in `pose_normalized_face_2d`, then averaged over all 40 edges. The metric measures only how strongly local segments align with the canonical horizontal/vertical axes. It does not identify an external outline and does not prove rectilinear mouth morphology.

### 2. Closed-cycle mean absolute turning angle

Ref: `neutral.mouth.contour_set.closed_cycle_mean_absolute_turning_angle@0.1.0`

For every vertex in both closed cycles, the angle between the incoming and outgoing segments is computed with a clamped dot-product arccosine and averaged over all 40 vertices. The result is in radians.

This measures local direction change only. It does not identify named mouth corners and does not establish `方`.

## Why these are currently admissible as neutral metrics

The existing FR79 surface is:

- pose normalized;
- exactly two closed cycles;
- 20 points per cycle;
- role free (`unordered_set_no_outer_inner_role`);
- explicitly without outer/inner anatomical assignment;
- explicitly without provider-component semantic ordering.

Both FR134 metrics aggregate both closed cycles identically, so they do not depend on deciding which component is outer or inner.

## Construct-validity dataset design

FR134 defines the intended evidence structure but does not materialize a dataset.

Candidate feature set for later construct-validity work:

- `neutral.mouth.contour_set.bounding_box_aspect_ratio@0.1.0` (FR80)
- `neutral.mouth.contour_set.closed_cycle_axis_alignment_mean@0.1.0` (FR134)
- `neutral.mouth.contour_set.closed_cycle_mean_absolute_turning_angle@0.1.0` (FR134)
- `neutral.mouth.contour_set.horizontal_span_to_full_mesh_horizontal_span_ratio@0.1.0` (FR82)

The future evidence unit must support repeated captures of the same subject under a pose-normalized neutral-expression protocol. Semantic annotation, when eventually permitted, must be governed independently from metric computation so that the geometry is not labeled by the same mechanism that computes it.

The evaluation order is deliberately:

1. neutral metric repeatability and capture sensitivity;
2. feature redundancy / discriminant structure;
3. convergent and discriminant construct validity only after governed semantic annotation exists;
4. calibration only after construct validity;
5. threshold consideration only after calibration.

FR134 intentionally leaves the following unset:

- subject count;
- capture count per subject;
- train/validation/test split ratios;
- numeric acceptance thresholds;
- reviewer count;
- traditional class labels.

Inventing any of those would create unsupported quantitative authority.

## Remaining blockers

`方` still lacks:

- governed external-mouth-outline identification;
- construct-valid evidence that the neutral orientation/turning metrics correspond to the historical concept;
- governed semantic annotation authority.

`大` still lacks:

- an anatomically governed facial-width or other relative-size denominator;
- a source-grounded operational definition for containment (`收拾` context);
- construct-valid evidence linking neutral size observations to the traditional concept.

Therefore `criterion.intake.square_broad` remains non-machine-classifiable under current authority.

## Authority boundary

FR134 does not:

- promote `method.shenxiang.five_officers.intake_criteria@0.2.0`;
- issue a traditional metric binding;
- identify an outer lip contour;
- treat full-mesh span as anatomical face width;
- materialize a construct-validity dataset;
- issue semantic annotations;
- define calibration;
- define a threshold;
- issue a criterion state, claim, or narrative;
- mutate any historical artifact.

Next frontier: `square_broad_construct_validity_annotation_governance_and_dataset_acquisition`.
