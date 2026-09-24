# FR276 ARCore Raw Depth Cadence Characterization

Watchtower-Track: face-research

FR275 proved that ARCore Raw Depth works on the concrete SM-S938N, but the first run produced only 10 new raw-depth timestamps over 20.6 seconds. ARCore documents raw depth as typically updating at about 10 Hz, with intermediate frames being 3D reprojections.

FR276 measures camera motion and raw-depth update timing in the same fixed 20-second window.

## Operator protocol

1. Install the FR276 debug APK.
2. Grant camera permission and let ARCore reach TRACKING.
3. Aim the rear camera at a static, textured, non-reflective target roughly 0.5–1.0 m away.
4. Tap `Start 20s motion test`.
5. For the full 20 seconds, move the phone smoothly left/right through a clearly visible arc and slightly up/down. Keep the target in the central half of the preview. Do not hold the phone nearly fixed.
6. Wait for `measurement_completed=true`.
7. Tap `Copy scalar report` and return the full report.

No face is required for FR276.

## Boundary

The app uses ARCore only. It does not use MediaPipe, face detection, biometric inference, network access, or persisted RGB/depth/confidence frames. Output is descriptive scalar telemetry only. It does not authorize FR266 annotation or FR271 collection.
