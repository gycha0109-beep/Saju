# FR281 — Fixed-still FR76 metric eye chord decomposition

Status: empirical rerun completed / metric component localization recorded

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

## Empirical result — 2026-09-24

The exact six local-only JPEGs were executed twice with fresh browser/runtime instances. All FR281 scalar outputs were identical between runs. The reconstructed FR281 angles matched the existing FR208/FR76 eye-tilt values for all six inputs.

Scalar evidence:

`research/face-reading/evidence/fr281-fixed-still-metric-eye-chord/fr281-empirical-evidence.json`

### Condition means

| condition | FR76 angle | metric horizontal span | metric signed vertical rise | FR279 screen angle |
| --- | ---: | ---: | ---: | ---: |
| front | 8.93293° | 2.57220 cm | 0.404382 cm | 9.75051° |
| high_angle | 9.28683° | 2.59936 cm | 0.425013 cm | 12.17312° |
| low_angle | 5.17077° | 2.71509 cm | 0.245018 cm | 2.70687° |

Front-relative metric deltas:

| condition | Δ FR76 angle | Δ metric horizontal span | Δ metric signed vertical rise |
| --- | ---: | ---: | ---: |
| high_angle | +0.353899° | +0.027160 cm | +0.020631 cm |
| low_angle | -3.762162° | +0.142890 cm | -0.159364 cm |

### Descriptive adjudication

The low-angle residual in FR76 remains concentrated primarily in the signed vertical-rise component.

Relative to the front mean:

- metric horizontal span: +5.56%
- metric signed vertical rise: -39.41%
- FR76 angle: -42.12%

The corresponding FR279 screen-space changes were:

- screen horizontal span: +2.50%
- screen signed vertical rise: -71.99%
- screen angle: -72.24%

Therefore the FR76 reconstruction materially attenuates the screen-space vertical-rise collapse, but it does not eliminate it. A smaller canonical-metric horizontal expansion is also present at low angle and acts in the same direction as the remaining angle reduction.

Both low-angle images remain below both front images on canonical-metric signed vertical rise:

- front: 0.381788 / 0.426976 cm
- low: 0.206252 / 0.283784 cm

The high-angle pair is much closer to front after FR76 reconstruction: metric signed vertical rise increases only +0.020631 cm and horizontal span +0.027160 cm, accompanying a +0.353899° FR76 angle change, versus +2.42261° in screen space.

### Research consequence

The evidence now separates two stages:

1. screen-space low-angle deformation is dominated by a large signed vertical-rise collapse;
2. FR76 attenuates that deformation substantially, but a same-direction signed vertical-rise residual remains in canonical metric geometry.

The next narrow research question should therefore inspect how the screen eye-corner vertical component propagates through the FR76 screen-to-metric transform, rather than proposing a correction formula.

No causal claim, threshold, calibration, correction, population generalization, or frozen-metric replacement is authorized.
