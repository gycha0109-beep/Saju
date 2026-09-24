# FR279 — Fixed-still screen-space eye chord decomposition

Status: implementation / empirical rerun pending

Watchtower-Track: face-research

## Question

FR277 found a strong descriptive association between vertical orientation and the screen-space eye outer-corner tilt on the fixed six-image set. FR279 asks a narrower geometry question:

When the same six exact still images are rerun, does the screen-space angle change accompany a change in the eye chord's horizontal span, signed vertical rise, or both?

This is localization of the already-observed screen-space diagnostic. It is not a correction model and does not establish causality.

## Input

Use the same six local-only JPEGs used by FR274, in this exact order:

1. front_1
2. front_2
3. high_1
4. high_2
5. low_1
6. low_2

The images are never committed as repository fixtures.

Runtime remains the existing deterministic still path:

- @mediapipe/tasks-vision 0.10.35
- runningMode = IMAGE
- existing release-exact FR76 parity/bootstrap
- FR257 ephemeral same-frame geometry
- FR269 screen-space eye-tilt diagnostic
- FR279 component collector attached to the same FR257 ephemeral observation

## Component definition

FR279 reuses the same FR24 eye-cycle topology and the same inner/outer-corner selection semantics already used by FR269.

For each display-side eye cycle:

- horizontalSpanPixels = abs(outer.x - inner.x) * frameWidth
- horizontalSpanFrameWidthFraction = abs(outer.x - inner.x)
- signedVerticalRisePixels = (inner.y - outer.y) * frameHeight
- signedVerticalRiseFrameHeightFraction = inner.y - outer.y
- angleDegrees = atan2(signedVerticalRisePixels, horizontalSpanPixels)

The bilateral reconstructed mean angle must match the existing FR269 screen-space eye-tilt scalar within floating-point tolerance. "screen_left" and "screen_right" are display-coordinate labels, not anatomical left/right claims.

## Persisted scalar evidence

Per image:

- frame dimensions
- existing FR269 screen-space eye-tilt mean
- reconstructed FR279 screen-space eye-tilt mean
- screen-left and screen-right horizontal span / signed vertical rise / angle scalars
- bilateral mean horizontal span
- bilateral mean signed vertical rise
- FR257 vertical orientation
- FR257 lateral orientation
- FR257 in-plane orientation
- screen face-box area fraction

Per condition:

- mean / min / max / span for the screen angle
- mean / min / max / span for horizontal span
- mean / min / max / span for signed vertical rise
- descriptive pose/context scalars

Front-relative contrasts are emitted for high-angle and low-angle conditions.

## Privacy boundary

Persisted:

- scalar diagnostic values only.

Not persisted:

- raw image bytes
- image digest
- raw provider response
- raw screen landmarks
- raw metric landmarks
- pose transform matrix
- providerRunRef
- embedding
- identity template

The providerRunRef exists only as an in-memory join key while the same-frame collectors are active.

## Authority boundary

FR279 does not issue:

- pose/distance acceptance thresholds
- calibration
- correction formula
- causal classification
- linear-model admission
- frozen metric replacement
- traditional interpretation binding
- Production activation
- Commerce activation

The six-image set is one participant with deliberately separated viewpoints and cannot support population generalization.

## Empirical run protocol

1. Start the existing MESH6J operator runtime.
2. Open /fr279/.
3. Select the exact same six JPEG files used for FR274.
4. Run the six-image component analysis.
5. Export the FR279 JSON.
6. Restart the runtime and repeat with the exact same six files.
7. Compare all persisted scalar fields between the two reports, excluding generatedAt.
8. Only after scalar identity is confirmed, compare front/high/low component means and front-relative deltas.

## Stop condition

Do not infer a correction formula from this run.

The immediate adjudication is descriptive only:

- horizontal span changed materially across the fixed conditions;
- signed vertical rise changed materially;
- both changed;
- or the two-image within-condition spread is too large to localize the pattern cleanly.

Any acceptance envelope, correction, metric redesign, or causal claim requires a separate issue and independent evidence.
