# FR278 ARCore Planar Accuracy / Repeatability Validation

Watchtower-Track: face-research

FR276 established that Raw Depth is operational on the concrete SM-S938N when the camera receives deliberate motion. FR278 checks whether the source behaves like usable metric geometry before any face-specific annotation work.

## Physical setup

Use one fixed, flat, textured, non-reflective target plane. A rigid board or large book cover with visible texture is suitable.

Mark three camera-to-target distances using one consistent phone datum:

- 500 mm
- 700 mm
- 900 mm

The absolute camera optical center is inside the phone, so the absolute signed-error result includes a small datum offset. The 200 mm step-error statistics largely cancel a constant datum offset.

Keep the target fixed for the entire bundle.

## Collection

At each nominal distance:

1. Select the matching distance button.
2. Place the phone at the measured distance.
3. Keep the target approximately fronto-parallel and centered.
4. Tap `Capture 5s trial`.
5. During the 5 s window, move the phone slightly left/right while maintaining approximately the same front-to-back distance.
6. Repeat until that distance has three trials.

Collect three trials at 500 mm, three at 700 mm, and three at 900 mm.

When `bundle_complete=true`, tap `Copy validation bundle` and return the full report.

## Measurement

The app uses only new ARCore Raw Depth timestamps. In the central 20% x 20% ROI it computes:

- valid-depth coverage;
- confidence >=128 coverage;
- per-frame median depth using only confidence >=128 pixels.

It then reports trial median depth, signed/absolute error, frame-level MAD, repeatability summaries, and measured 200 mm step errors.

No threshold or pass/fail conclusion is embedded in FR278.

## Privacy / authority

No MediaPipe, face detector, biometric inference, network access, or persisted RGB/depth/confidence frames are used. FR278 does not issue an FR266 annotation and does not authorize FR271 collection.
