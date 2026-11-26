# FR279 — Fixed-still screen-space eye chord decomposition

Status: empirical rerun completed / descriptive component localization recorded

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

## Empirical result — 2026-09-24

The exact six local-only JPEGs were executed twice with fresh browser/runtime instances.

Pinned runtime evidence:

- `@mediapipe/tasks-vision@0.10.35`
- `runningMode = IMAGE`
- Face Landmarker model SHA-256: `64184e229b263107bc2b804c6625db1341ff2bb731874b0bcc2fe6544e0bc9ff`
- `vision_bundle.mjs` SHA-256: `55d7ab624fbb70dcc5adc4ae6d7ea9cfcb569139d3dbfbf2b1deafcb966bc0fe`
- Run A: `2026-09-24T05:08:22.568Z`
- Run B: `2026-09-24T05:08:35.363Z`
- all persisted FR279 scalars were identical between the two fresh runs, excluding `generatedAt`
- the reconstructed FR279 bilateral screen angle matched the existing FR269 screen-space angle for all six images

Scalar evidence is stored at:

`research/face-reading/evidence/fr279-fixed-still-screen-eye-chord/fr279-empirical-evidence.json`

### Condition means

| condition | screen angle | horizontal span | signed vertical rise | vertical orientation | face-box area |
| --- | ---: | ---: | ---: | ---: | ---: |
| front | 9.7505° | 165.2423 px | 28.4116 px | -4.7297° | 0.313807 |
| high_angle | 12.1731° | 160.1888 px | 34.5536 px | -12.7668° | 0.275096 |
| low_angle | 2.70687° | 169.3786 px | 7.95799 px | +11.4835° | 0.307463 |

Front-relative deltas:

| condition | Δ screen angle | Δ horizontal span | Δ signed vertical rise | Δ vertical orientation | Δ face-box area |
| --- | ---: | ---: | ---: | ---: | ---: |
| high_angle | +2.42261° | -5.05354 px | +6.14194 px | -8.03703° | -0.038710 |
| low_angle | -7.04364° | +4.13627 px | -20.45363 px | +16.21319° | -0.006344 |

### Descriptive adjudication

Within this deliberately pose-separated six-image diagnostic, the low-angle screen-space eye-tilt collapse is localized primarily to the signed vertical-rise component:

- front signed vertical rise mean: 28.4116 px
- low-angle signed vertical rise mean: 7.95799 px
- front-relative change: -20.45363 px

The horizontal-span change is much smaller:

- front horizontal span mean: 165.2423 px
- low-angle horizontal span mean: 169.3786 px
- front-relative change: +4.13627 px

Both low-angle images independently remain below both front images on signed vertical rise (4.22665 / 11.68933 px versus 28.03528 / 28.78796 px), despite substantial within-low spread.

High-angle evidence points in the corresponding opposite direction: signed vertical rise increases by 6.14194 px while horizontal span decreases by 5.05354 px, accompanying a +2.42261° screen-angle increase.

This is descriptive localization only. It does not establish that vertical viewpoint causally changes the landmarks, does not authorize a correction formula or acceptance threshold, and does not replace FR76.

### Relation to FR274 / FR277

The fixed-image FR274 screen-space means were 9.7505° front, 12.1731° high, and 2.70687° low. FR279 reconstructs those values exactly from the eye-chord components.

FR274 FR76 canonical means were 8.93293° front, 9.28683° high, and 5.17077° low. Thus the fixed-image pattern continues to show that FR76 attenuates, but does not eliminate, the screen-space viewpoint-associated shift:

- high: screen +2.42261° versus FR76 +0.35390° from front
- low: screen -7.04364° versus FR76 -3.76216° from front

No causal or population claim follows from this six-image single-participant diagnostic.
