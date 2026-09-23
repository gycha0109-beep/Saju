# FR266 — Controlled Capture Geometry Sensitivity

Watchtower-Track: face-reading

## 1. Purpose

FR266 freezes the completed controlled FR257 evidence set and turns it into a deterministic descriptive sensitivity report.

The three operator-directed conditions are:

- `baseline_eye_level`
- `low_angle`
- `high_angle`

The frozen primary metric remains:

`neutral.eye.outer_corner_tilt.mean_degrees@0.1.0`

FR266 does not issue a capture threshold, pass/fail rule, calibration, correction formula, interpretation claim, Production authority, or Commerce authority.

## 2. Evidence inputs

The committed evidence set contains exactly three sanitized FR257 bundles:

- `baseline-eye-level.fr257.json`
- `low-angle.fr257.json`
- `high-angle.fr257.json`

Each bundle contains four accepted capture slots with same-frame scalar geometry attribution and no persisted raw media, raw landmarks, pose matrix, embedding, or identity template.

The condition labels are operator-directed experiment labels. They are not independent pose verification.

## 3. Deterministic descriptive result

The committed FR266 report records:

| condition | eye metric mean | vertical orientation mean |
| --- | ---: | ---: |
| baseline eye-level | 8.0323899351° | -5.3574104350° |
| low angle | 2.8199510098° | +20.1620474137° |
| high angle | 8.2680912998° | -12.1199797507° |

Baseline-relative contrasts:

- low angle: eye metric `-5.2124389253°`, vertical orientation `+25.5194578486°`;
- high angle: eye metric `+0.2357013647°`, vertical orientation `-6.7625693158°`.

The low-angle condition also changes screen face-box scale materially relative to baseline. Therefore FR266 does not claim that vertical orientation alone causally explains the metric movement.

The observed response is not treated as linear.

## 4. Analyzer

`analyzeControlledCaptureGeometrySensitivityFR266` validates the three FR257 bundles and emits:

- per-condition primary metric mean/min/max/span;
- per-condition geometry mean/min/max/span;
- radian and degree summaries for orientation scalars;
- baseline-relative deltas for primary metric and geometry;
- explicit interpretation and authority boundaries.

`scripts/analyze-fr266-controlled-geometry.mjs --verify` deterministically regenerates the report from committed evidence and verifies it against the committed report JSON.

## 5. Same-frame diagnostic instrumentation

Historical FR257 JSON cannot reconstruct screen-space eye geometry because raw screen landmarks were intentionally not persisted.

FR266 therefore adds an ephemeral observer hook to FR257. During a future live shutter event only, FR266 may consume the transient screen landmarks and FR76 canonical metric landmarks and persist scalar diagnostic values only:

- screen-space eye outer-corner tilt mean;
- FR76 canonical metric eye outer-corner tilt mean;
- their scalar difference.

The existing frozen FR237 primary metric must exactly equal the FR76 canonical metric diagnostic.

FR76 already inverse-pose-aligns runtime metric landmarks into canonical metric geometry before the frozen eye metric is computed. FR266 therefore does **not** invent an additional pose-normalization correction. Its explicit state is:

`not_issued_fr76_metric_geometry_is_already_inverse_pose_aligned`

## 6. Privacy boundary

FR266 diagnostic persistence is scalar-only.

Do not persist:

- raw photo/video;
- raw screen landmarks;
- raw metric landmarks;
- pose transformation matrices;
- face embeddings;
- identity templates;
- participant/operator/provider identifiers in the final FR266 sidecar.

## 7. Next decision

After a small controlled set of new FR266 diagnostic captures, compare whether the low-angle failure is already visible in screen-space eye tilt, appears only after FR76 metric reconstruction, or remains in both.

That distinction will guide the next branch:

- capture-envelope guidance;
- metric redesign;
- or additional geometry-model investigation.

No threshold or correction formula is authorized by FR266.
