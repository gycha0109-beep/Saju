# FR257 Capture Geometry Attribution Protocol

Watchtower-Track: face-reading

## 1. Purpose

FR257 attributes variation in the frozen FR237 primary metric to capture geometry descriptors derived from the exact same live-camera shutter frame.

The primary metric remains:

`neutral.eye.outer_corner_tilt.mean_degrees@0.1.0`

FR257 does not establish repeatability, pose adequacy, calibration, correction, interpretation validity, Production authority, or Commerce authority.

## 2. Why this phase exists

The completed FR251/FR255 live runs showed that operator-visible camera geometry can move the eye metric materially while the existing FR255 capture-condition fields remain too coarse to explain the movement.

The earlier follow-up conditions also showed that operator-directed left/right yaw and near/far distance changes did not produce the same scale of block-mean movement seen under vertical camera-angle changes. Those labels remain operator experiment labels rather than independently verified pose measurements.

Therefore the next evidence gap is not more uninstrumented repetition. It is same-frame scalar capture-geometry attribution.

## 3. Same-frame measurement contract

For each accepted FR251 shutter frame FR257 must derive, from the exact provider detection and FR76 geometry used for the frozen eye metric:

- lateral orientation radians;
- vertical orientation radians;
- relative rotation from the first accepted capture in the execution;
- in-plane orientation of the projected canonical lateral axis;
- FR76 pose uniform-scale component;
- normalized screen face-box width fraction;
- normalized screen face-box height fraction;
- normalized screen face-box area fraction.

The face-box values are dimensionless screen-scale proxies. They are not physical camera distance estimates.

FR257 must bind the frozen eye metric and the geometry scalars to the exact same FR244 JPEG bytes before FR242 extraction returns.

## 4. Persistence boundary

Persist only the scalar attribution sidecar.

Do not persist:

- raw photo or video;
- raw JPEG digest;
- raw provider response;
- raw normalized landmarks;
- raw metric landmarks;
- pose transform matrix;
- face embedding;
- identity template;
- participantRef or operatorRef in the FR257 sidecar;
- providerRunRef in the final FR257 sidecar.

The pose transform and landmarks may exist transiently in memory only for same-frame derivation and must be released after extraction.

## 5. Authority boundary

FR257 issues no:

- pose or distance acceptance threshold;
- frontal/profile classification;
- quality score;
- confidence grade;
- calibration;
- pose correction or normalization formula;
- repeatability pass/fail;
- interpretation or traditional physiognomy claim;
- Production or Commerce activation.

All output is descriptive scalar evidence only.

## 6. FR251 compatibility

FR251 and FR255 schemas remain unchanged.

The existing FR251 result continues to download as:

`myeongha-fr251-dry-run-sanitized.json`

FR257 produces a separate sidecar from the same execution:

`myeongha-fr257-capture-geometry-<timestamp>.json`

This preserves FR255 source validation while allowing capture-geometry analysis.

## 7. First controlled collection after implementation

After FR257 implementation is merged, collect only three new FR251 executions initially:

1. eye-level baseline;
2. intentional low-angle capture;
3. intentional high-angle capture.

Each execution keeps the existing FR251 structure:

- Session 1: Capture 1, Capture 2;
- Session 2: Capture 1, Capture 2.

No numerical pose threshold is defined. The three labels are operator-directed experimental conditions only.

Keep device, front camera, portrait orientation, lighting, participant, and neutral expression as consistent as practical.

Do not request another left/right yaw or near/far distance series unless the FR257 scalar evidence creates a concrete unresolved question.

## 8. Review after the three executions

Compare the frozen eye metric against:

- vertical orientation;
- lateral orientation;
- relative rotation;
- in-plane lateral-axis orientation;
- pose scale;
- screen face-box scale proxies.

The first review is descriptive. It may identify candidate sensitivity relationships, but it must not fit or issue a correction formula from the same three executions.

A later phase may decide whether the appropriate response is:

- capture-envelope restriction;
- pose normalization;
- metric redesign;
- or additional controlled evidence.

That decision is outside FR257.

## 9. FR142 reuse boundary

FR257 should not make the capture runtime eye-metric-specific.

Future FR142 mouth metrics should be able to consume the same ephemeral provider/FR76 geometry envelope from the same shutter frame before raw geometry is discarded.

Existing historical FR251/FR255 JSON cannot be retrospectively used to calculate new mouth metrics because raw frame and landmark geometry were intentionally not persisted.

Future live captures should therefore support multi-metric extraction from one shutter event rather than requiring duplicate participant photography.
