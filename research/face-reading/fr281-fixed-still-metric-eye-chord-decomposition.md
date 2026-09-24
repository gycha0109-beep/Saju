# FR281 — Fixed-still FR76 metric eye chord decomposition

Status: implementation / empirical rerun pending

Watchtower-Track: face-research

## Question

FR279 localized the low-angle screen-space eye-tilt collapse primarily to a large reduction in signed vertical rise, with much smaller horizontal-span movement.

FR281 applies the same decomposition to the FR76 canonical metric eye chord from the exact same ephemeral FR257 observation.

The narrow question is whether the residual FR76 viewpoint-associated shift is carried descriptively by canonical-metric horizontal span, canonical-metric signed vertical rise, or both.

## Geometry

FR281 does not invent a new eye-corner mapping. It reuses `deriveEyeOuterCornerTiltInputFromMetricGeometryFR209`, which already derives the two eye chords from the governed 468-point FR76 metric geometry.

For each X-ordered eye cycle:

- horizontal span = `abs(outer.x - inner.x)` centimeters
- signed vertical rise = `outer.y - inner.y` centimeters
- angle = `atan2(signed vertical rise, horizontal span)`

The sign convention is the existing FR208 convention: positive when the outer corner has greater canonical metric Y than the inner corner.

The reconstructed negative-X, positive-X, and bilateral mean angles must match the frozen FR208 eye-tilt result within floating-point tolerance.

The X-side labels are coordinate-order labels only and do not issue anatomical laterality.

## Fixed input

Use the same six local-only JPEGs:

1. front_1
2. front_2
3. high_1
4. high_2
5. low_1
6. low_2

The images are never committed.

The `/fr281/` operator runs the existing FR76/FR257 path and attaches FR269, FR279, and FR281 collectors to the same ephemeral observation.

## Persisted scalar evidence

Per image:

- FR76 eye-tilt mean
- negative-X and positive-X metric chord horizontal span / signed vertical rise / angle
- bilateral metric horizontal-span mean
- bilateral metric signed-vertical-rise mean
- FR279 screen angle / horizontal span / signed vertical rise
- vertical orientation
- screen face-box area

No raw image, screen landmark, metric landmark, pose matrix, providerRunRef, embedding, or identity template is persisted.

## Authority boundary

FR281 does not issue:

- pose or distance acceptance thresholds
- calibration
- correction formula
- causal classification
- population generalization
- frozen metric replacement
- traditional interpretation binding
- Production activation
- Commerce activation

## Empirical protocol

1. Run `/fr281/` with the exact same six JPEGs.
2. Start from a fresh browser/runtime and repeat.
3. Compare all scalar fields excluding `generatedAt`.
4. Confirm FR281 reconstructed angle identity with FR208/FR76.
5. Compare front/high/low metric horizontal span and signed vertical rise.
6. Compare those metric component deltas against the already-recorded FR279 screen-space component deltas.

## Decision boundary

A strong residual metric signed-vertical-rise movement with comparatively stable metric horizontal span would motivate a later propagation study from screen-landmark vertical deformation into FR76 reconstruction.

Strong movement in both metric components would instead motivate investigation of FR76 scale/orientation coupling.

Neither outcome authorizes a correction or acceptance envelope.
