# FR275 ARCore Raw Depth Probe

Watchtower-Track: face-research

FR273 proved that the concrete SM-S938N exposes no Camera2 DEPTH_OUTPUT path on either front camera. FR275 probes the next independent source candidate: ARCore Raw Depth on the world-facing camera.

The app:

- uses ARCore only;
- does not use MediaPipe or any face detector;
- shows the ARCore world-facing camera preview;
- acquires raw depth plus the matching confidence image;
- keeps RGB/depth/confidence frames ephemeral;
- computes only aggregate scalar diagnostics;
- has no network permission and performs no automatic upload.

## Operator run

1. Install the debug APK from the FR275 GitHub Actions artifact.
2. Grant camera permission and allow/update Google Play Services for AR if Android asks.
3. Point the rear camera at a static textured target roughly 0.5–1.0 m away.
4. Move the phone slowly sideways and slightly up/down for 15–20 seconds while keeping the target in the central half of the preview.
5. Wait until tracking reports `TRACKING` and the raw-depth counters increase.
6. Tap `Copy scalar report`.
7. Return the complete report to the face-research track.

Do not use a mirror as the target for any later face-specific experiment.

## Interpretation boundary

A successful run proves only that ARCore Raw Depth is operational enough to continue source validation. It does not establish source accuracy, repeatability, nasal-apex ground truth, FR266 validity, canonical registration, or FR271 collection authority.
