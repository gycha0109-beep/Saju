# FR201 — MediaPipe Native Metric 3D Face Geometry Port

## Decision

FR201 executed a dependency-free TypeScript port of MediaPipe's Apache-2.0 `ScreenToMetricSpaceConverter` against the same public same-ID corpus used by FR199/FR200.

**Result: the MediaPipe metric-3D path is technically reproduced, but none of the tested metric width proxies is promoted.**

The port reproduces the native FaceLandmarker pose transform to approximately `1e-5` maximum element error, while all tested width/height ratios remain negatively and weakly correlated with the frozen independent source-exact 3D zygion-width ratio.

This materially narrows the problem:
- it is not explained by the FR200 row/column matrix-layout bug;
- it is not explained by using only screen-space XY;
- it is not rescued by MediaPipe's own two-pass perspective unprojection and pose removal;
- therefore another MediaPipe band/index tweak must not be promoted from this corpus.

## Frozen upstream witness

Repository:
`google-ai-edge/mediapipe`

Commit:
`30590fe8d3fdc57e63a0e9c5b2c0ececffb37301`

Upstream implementation:
- `mediapipe/tasks/cc/vision/face_geometry/libs/geometry_pipeline.cc`
- `mediapipe/modules/face_geometry/data/geometry_pipeline_metadata_landmarks.pbtxt`
- `mediapipe/tasks/cc/vision/face_geometry/face_geometry_from_landmarks_graph.cc`

Frozen semantics:
- first 468 landmarks; iris excluded;
- top-left image origin;
- vertical FOV: 63 degrees;
- near plane: 1 cm;
- far plane: 10000 cm;
- official 33-entry weighted Procrustes landmark basis;
- first projected-screen scale estimate;
- first perspective unprojection;
- second scale estimate;
- final perspective unprojection;
- left-handed screen → right-handed metric conversion;
- final weighted similarity solve;
- inverse pose transform into canonical-aligned metric 3D space.

## Execution

Exact head:
`2f9096b30bcebb368aad09b54b452582f55ea060`

Dedicated workflow:
- run: `35412187550`
- job: `105813833435`

PASS:
- npm install/build preparation;
- face-reading typecheck;
- face-reading build;
- deterministic FR201 tests: 3/3;
- real public MediaPipe metric-geometry experiment;
- experiment receipt upload.

Artifact:
- name: `fr201-public-mediapipe-metric-face-geometry-experiment`
- artifact id: `10573563559`

Corpus:
- frozen samples: 20
- source-exact independent bilateral reference ready: 18
- source-exact fail-closed: `male-32`, `female-27`
- provider success: 18/18
- provider failures: 0

Metadata digest:
`sha256:55ca7c4c7bf195673b9d12a1b5d49d4b9c82b5ade8fed4b565496590866e359d`

## Native pose parity

The independently ported solver was compared descriptively with the native FaceLandmarker facial transformation matrix.

- observations: 18
- mean per-sample maximum absolute matrix-element delta:
  `0.000008922596257677433`
- worst per-sample maximum absolute matrix-element delta:
  `0.00002246343247236382`

This is strong implementation evidence that the port is reproducing the native pose transform closely enough that the null width result cannot reasonably be attributed to a gross Procrustes/pose-port error.

## Correlation results

Independent reference:
`source-exact 3D zygion width / source OBJ Y span`

Provider:
pose-removed canonical-aligned MediaPipe Metric 3D.

| Metric-3D provider measure | Pearson r | Spearman rho |
|---|---:|---:|
| 234↔454 X span / metric oval height | -0.166962 | -0.073271 |
| midface band envelope / metric oval height | -0.166962 | -0.073271 |
| full face-oval width / metric oval height | -0.167030 | -0.065015 |
| 234↔454 Euclidean distance / metric oval height | -0.166670 | -0.065015 |

None is evidence for admission or calibration.

## Interpretation

FR200 tested operational screen-space geometry after roll normalization and scale normalization.

FR201 tested MediaPipe's actual metric-geometry construction: perspective unprojection, two-pass scale recovery, handedness conversion, weighted Procrustes pose solve, and inverse pose removal.

The FR201 port agrees tightly with the native MediaPipe pose matrix, yet its width ratios do not track the independently frozen source-exact zygion-width ratio.

Therefore the current evidence does **not** support:
- fixed provider indices 234/454 as anatomical zygion;
- the FR200 band/envelope proxy;
- the same band/envelope proxy merely transplanted into MediaPipe Metric 3D;
- any numeric threshold or calibration derived from these 18 samples.

The next frontier must distinguish two hypotheses without back-fitting:

1. the independent source-exact zygion quantity and the front-image/MediaPipe observable are not measuring the same operational construct; or
2. MediaPipe's canonicalized metric face geometry intentionally regularizes identity shape strongly enough that this anthropometric variation is not recoverable at the required fidelity.

A new provider index/band search on these same 18 samples would be in-sample tuning and is not authorized.

## External 3D model note

MICA and the default 3DDFA_V2/BFM path are not adopted as commercial product dependencies:
- MICA's released license is non-commercial research;
- 3DDFA_V2 code is MIT, but its default Basel Face Model asset has non-commercial restrictions.

USC ICT-FaceKit Light is a commercially compatible MIT 3DMM candidate, but it does not provide a turnkey photo-to-identity fitter. It remains a possible separately governed follow-on, not an FR201 dependency.

## Authority state

```text
providerIndexAdmissionAuthorized=false
anatomicalZygionClaimAuthorized=false
numericAcceptanceThresholdAuthorized=false
calibrationAuthorized=false
classifierAuthorized=false
traditionalProjectionAuthorized=false
productionAuthorized=false
commerceAuthorized=false
```
