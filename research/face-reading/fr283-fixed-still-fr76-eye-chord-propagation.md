# FR283 — Fixed-still FR76 eye-chord propagation trace

Status: empirical rerun completed / FR76 attenuation stage localized

Watchtower-Track: face-research

## Question

FR279 localized the low-angle screen-space eye-tilt collapse primarily to signed vertical-rise loss.

FR281 showed that FR76 attenuates that deformation substantially but leaves a same-direction residual in canonical metric geometry.

FR283 asks one narrower question:

Where inside the exact FR76 screen-to-metric reconstruction does that attenuation occur?

This is instrumentation only. It does not alter FR76 and does not issue a correction.

## Fixed input

Reuse the exact six local-only JPEGs:

1. front_1
2. front_2
3. high_1
4. high_2
5. low_1
6. low_2

The images remain local-only and are never committed.

## Traced stages

FR283 reproduces the existing FR76 algorithm with the same constants and exported weighted orthogonal solver, then records scalar eye-chord summaries at:

1. screen_pixels_y_up
2. projected_near_plane
3. first_intermediate
4. second_intermediate
5. runtime_metric_pre_pose
6. canonical_metric_post_pose

For each stage it persists only:

- bilateral mean horizontal span;
- bilateral mean signed vertical rise;
- bilateral mean eye-chord angle.

It also persists:

- firstIterationScale;
- secondIterationScale;
- totalScale.

## Exactness requirements

The trace is rejected unless all of the following hold:

- traced final metric landmarks match the existing FR76 output within floating-point tolerance;
- traced packed pose matrix matches the existing FR76 output;
- firstIterationScale / secondIterationScale / totalScale match FR76;
- same-frame final metric landmarks match the FR257 ephemeral metric geometry;
- same-frame pose matches the FR257 ephemeral pose;
- screen-stage angle matches FR279;
- canonical-stage angle matches FR281 / FR208.

The trace therefore observes the existing algorithm rather than defining a replacement implementation.

## Coordinate semantics

The screen stage converts normalized image coordinates into pixel coordinates with Y pointing upward.

The projected and intermediate stages use the exact FR76 virtual-camera projection geometry:

- vertical FOV = 63 degrees;
- near plane = 1 centimeter.

Intermediate coordinate values are not promoted into new product metrics.

Only the final canonical stage retains the existing FR76 centimeter semantics.

## Privacy boundary

Persisted:

- stage-level scalar chord summaries;
- scalar FR76 iteration scales;
- existing scalar pose/context summaries in the fixed-still report.

Not persisted:

- raw image bytes;
- image digest;
- raw provider response;
- screen landmarks;
- intermediate landmarks;
- metric landmark arrays;
- pose transform matrix;
- providerRunRef;
- embedding;
- identity template.

All raw/intermediate geometry exists only ephemerally during one analysis call.

## Authority boundary

FR283 does not issue:

- pose or distance acceptance thresholds;
- calibration;
- correction formula;
- causal classification;
- population generalization;
- frozen metric replacement;
- traditional interpretation binding;
- Production activation;
- Commerce activation.

## Empirical protocol

1. Start the existing MESH6J runtime.
2. Open /fr283/.
3. Select the exact same six JPEGs used by FR274 / FR279 / FR281.
4. Run all six.
5. Export the scalar-only FR283 JSON.
6. Restart with a fresh browser/runtime and repeat.
7. Compare all persisted scalar fields excluding generatedAt.
8. Only after scalar identity is confirmed, inspect front-relative signed-vertical-rise and angle changes at every stage.

## Adjudication target

The expected output is a descriptive propagation map:

screen -> projected -> first intermediate -> second intermediate -> runtime metric -> canonical metric

The goal is to determine at which transition the large low-angle screen-space signed-vertical-rise reduction is attenuated, and whether the final inverse-pose normalization changes it further.

No correction design follows automatically from the result.

## Stop condition

FR283 stops after:

- two scalar-identical fresh-runtime runs;
- exactness checks remain satisfied;
- the low-angle front-relative change is localized descriptively across the six stages.

The result should then be handed to the RGB feature-authority / product-column work so only affected observables consume the finding.

FR283 must not continue into a generic camera-correction subsystem.

## Empirical result — 2026-09-24

The exact same six local-only JPEGs were executed twice with fresh Chromium / MediaPipe runtime instances.

Pinned runtime evidence:

- `@mediapipe/tasks-vision@0.10.35`
- `runningMode = IMAGE`
- Face Landmarker model SHA-256: `64184e229b263107bc2b804c6625db1341ff2bb731874b0bcc2fe6544e0bc9ff`
- `vision_bundle.mjs` SHA-256: `55d7ab624fbb70dcc5adc4ae6d7ea9cfcb569139d3dbfbf2b1deafcb966bc0fe`
- Run A: `2026-09-24T06:20:48.649Z`
- Run B: `2026-09-24T06:20:59.799Z`
- all persisted FR283 scalars were identical between runs, excluding `generatedAt`
- traced final metric geometry matched FR76 for all six inputs
- traced packed pose matched FR76 for all six inputs

Scalar evidence:

`research/face-reading/evidence/fr283-fixed-still-fr76-eye-chord-propagation/fr283-empirical-evidence.json`

### Low-angle front-relative propagation

| stage | Δ horizontal span | Δ signed vertical rise | Δ eye angle |
| --- | ---: | ---: | ---: |
| screen pixels | +2.5032% | -71.9904% | -7.0436° |
| projected near plane | +2.5032% | -71.9904% | -7.0436° |
| first intermediate | +2.5032% | -71.9904% | -7.0436° |
| second intermediate | +4.8669% | -66.2787% | -6.6527° |
| runtime metric pre-pose | +5.5899% | -66.0789% | -6.6527° |
| canonical metric post-pose | +5.5552% | -39.4093% | -3.7622° |

### High-angle front-relative propagation

| stage | Δ horizontal span | Δ signed vertical rise | Δ eye angle |
| --- | ---: | ---: | ---: |
| screen pixels | -3.0583% | +21.6177% | +2.4226° |
| projected near plane | -3.0583% | +21.6177% | +2.4226° |
| first intermediate | -3.0583% | +21.6177% | +2.4226° |
| second intermediate | +0.4069% | +22.3667% | +2.1136° |
| runtime metric pre-pose | +1.0501% | +23.1369% | +2.1136° |
| canonical metric post-pose | +1.0559% | +5.1019% | +0.3539° |

### Descriptive adjudication

The early FR76 projection does not attenuate the observed eye-chord angle deformation. The screen, projected-near-plane, and first-intermediate stages preserve the same front-relative angle and signed-vertical-rise ratio.

The first perspective/depth reconstruction step provides only modest low-angle attenuation:

- signed vertical-rise deficit: -71.9904% -> -66.2787%
- angle delta: -7.0436° -> -6.6527°

The transition from second intermediate to runtime metric changes scale but leaves the eye angle effectively unchanged, with the low-angle angle delta remaining -6.6527°.

The largest attenuation occurs in the final pose-normalization transition from runtime metric pre-pose to canonical metric post-pose:

- signed vertical-rise deficit: -66.0789% -> -39.4093%
- angle delta: -6.6527° -> -3.7622°

The high-angle pair shows the same qualitative localization: its pre-pose +2.1136° angle delta is reduced to +0.3539° after canonical pose normalization.

Therefore, within this six-image single-participant diagnostic, the dominant FR76 attenuation of viewpoint-associated eye-chord deformation is localized descriptively to the final canonical pose-normalization stage rather than the initial screen projection.

This does not establish a causal camera model and does not authorize a correction formula, acceptance threshold, metric replacement, or population generalization.

### Handoff

FR283 stops here. The result should be consumed by the RGB-selfie feature authority / product-column track only for observables that depend on viewpoint-sensitive eye geometry.

No generic camera-correction subsystem is opened from FR283.
