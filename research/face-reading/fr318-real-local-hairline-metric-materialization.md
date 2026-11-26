# FR318 — Real-local hairline metric materialization receipt

Status: contract implemented; no real FR318 evidence or metric hairline reference exists in the repository

Watchtower-Track: face-observation-engine

## Purpose

FR318 defines the first real-local execution contract that can materialize the admitted visible-hairline observation into the canonical metric XY frame.

Implementation is not evidence.

The repository current gate remains unchanged until real FR313, FR314 and FR316 evidence exists and a local FR318 execution actually succeeds.

## Why FR316 assessment alone is insufficient

The public FR316 assessment intentionally excludes source-image digests, registration parameters and raw artifact identity.

Therefore FR318 must not accept a detached boolean assessment as proof of exact-capture continuity.

FR318 receives the original private `FR316RegistrationInput` again and reruns:

`assessSameCaptureHairlineRegistrationFR316`

This revalidates:

- real-local artifact class;
- exact same-capture binding;
- exact artifact-pair binding;
- M3-equivalent metric scale authority;
- selected registration evidence;
- visible hairline support region;
- privacy and prohibited-shortcut boundaries.

A synthetic FR316 input is rejected by the real-local executor.

## Private local execution input

After FR316 is revalidated as execution-eligible, FR318 accepts a local transformed boundary only when all of the following hold:

- execution method exactly matches the FR316 method;
- output frame is `canonical_aligned_right_handed_metric_xy`;
- unit is centimeter;
- axes are x-right / y-up;
- execution was actually observed;
- all transformed values are finite;
- transformed point count equals the FR314 source visible-boundary point count;
- source/transformed point order is explicitly bound;
- no extrapolation occurred beyond the validated hairline support region;
- no hidden-completed points were introduced;
- face-oval and top-mesh substitution remain false.

The transformed metric polyline must contain at least two points and no degenerate segments.

## Metric neutral reference

For an eligible exact capture, FR318 calculates:

`sum(segment_length * segment_midpoint_y) / sum(segment_length)`

over the transformed visible-boundary polyline.

The runtime-only result is:

- neutral visible hair-skin boundary only;
- canonical metric XY;
- centimeter;
- x-right / y-up;
- exact-capture-local;
- fail-closed.

This is the metric-frame counterpart of the FR305 visible-boundary vertical reference.

## Privacy

The following must remain private/local and are never included in a repository-safe receipt:

- source face image;
- source-image digest;
- source normalized hairline coordinates;
- transformed metric hairline coordinates;
- raw camera parameters;
- raw registration parameters;
- raw correspondences;
- subject-level metric vertical coordinate.

The repository-safe receipt records only execution and authority-state booleans.

## Authority boundary

A successful real FR318 execution proves only that, for that exact capture and its governed metric support, the visible hairline neutral reference can be expressed in canonical metric XY.

It does not issue:

- anatomical hairline ground truth;
- traditional 髮際 equivalence;
- traditional binding;
- a globally reusable image-to-metric transform;
- permission to relabel arbitrary normalized image coordinates as metric;
- Three-Divisions boundaries or spans;
- thresholds or classifiers;
- Product materialization;
- Production;
- Commerce.

FR318 success makes the hairline metric reference eligible to participate in a seven-reference exact-capture common-frame bundle.

It does not itself prove that the other six references belong to the same exact capture.

That assembly is deferred to FR319.

## Current repository state

No real FR313/FR314/FR316 chain has been materialized in the repository.

Therefore:

- FR318 contract implemented: true;
- real FR316 eligible evidence available: false;
- real FR318 metric hairline reference materialized: false;
- repository actual neutral references: 6 / 7;
- remaining neutral reference: 1;
- seven-reference common-frame bundle assembled: false;
- traditional bindings: 0;
- Three-Divisions span execution: false;
- Product: 18 / 29;
- Production / Commerce: false.

## Next

FR319 may define an exact-capture seven-reference common-frame bundle assembler.

It must require a real FR318 runtime receipt plus exact-capture provenance for the other six governed neutral references before declaring any seven-reference bundle ready.
