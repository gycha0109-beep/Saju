# FR273 Android Depth Capability Probe

Watchtower-Track: face-research

This is a standalone diagnostic APK for the FR272/FR271 acquisition blocker.

It does not open the camera, show a preview, capture RGB/depth, or use the network. It requests CAMERA permission because Android can hide calibration metadata from `CameraCharacteristics` when that permission is absent.

The report enumerates Camera2 devices and marks `fr272_user_facing_depth_candidate=true` only when a front-facing camera advertises `DEPTH_OUTPUT`, exposes DEPTH16, and returns the calibration metadata needed by the FR272 preflight.

That label is capability-only. It does not validate source accuracy/repeatability, issue an FR266 annotation, or authorize FR271 collection.

## Operator flow

1. Install the debug APK from the FR273 GitHub Actions artifact.
2. Launch `FR273 Depth Probe`.
3. Grant camera permission.
4. Tap `Run probe`.
5. Tap `Copy report`.
6. Return the complete text report to the face-research track.

No face image is captured at any point.
