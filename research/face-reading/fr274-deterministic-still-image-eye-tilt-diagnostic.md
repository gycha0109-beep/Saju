# FR274 — Deterministic still-image eye-tilt diagnostic

> Watchtower-Track: `face-research`  
> Status: research diagnostic implementation  
> Tracking: #1403

## Purpose

FR274 freezes the image input itself so vertical-viewpoint sensitivity can be inspected without live-camera frame drift.

It does not introduce another face model, camera workflow, metric, calibration, threshold, or correction. It reuses the existing:

```text
@mediapipe/tasks-vision 0.10.35 / IMAGE
→ FR76 screen-to-metric reconstruction
→ FR208 / FR237 frozen eye metric
→ FR257 pose + face-box scalar attribution
→ FR269 screen-space vs FR76 eye-tilt diagnostic
```

The same JPG can therefore be rerun after future implementation changes and compared against its earlier scalar output.

## Fixed evaluation layout

FR274 accepts exactly six operator-labelled JPEG inputs in this order:

```text
front_1
front_2
high_1
high_2
low_1
low_2
```

The labels are experimental condition labels only. They do not independently verify camera pose.

Each condition has exactly two fixed images.

## Per-image scalar output

- image condition label;
- frame width and height;
- screen-space eye outer-corner tilt mean degrees;
- FR76 canonical metric eye outer-corner tilt mean degrees;
- screen minus FR76 degrees;
- lateral orientation radians;
- vertical orientation radians;
- relative rotation from the first front image;
- in-plane lateral-axis orientation radians;
- pose uniform-scale component;
- screen face-box width fraction;
- screen face-box height fraction;
- screen face-box area fraction.

## Condition summaries

For front, high-angle, and low-angle separately, FR274 records mean, min, max, and span for every diagnostic scalar.

It also records high-vs-front and low-vs-front differences in the condition means for:

- screen-space eye tilt;
- FR76 eye tilt;
- screen-minus-FR76;
- vertical orientation;
- lateral orientation;
- in-plane orientation;
- screen face-box area.

These are descriptive contrasts only.

## Input and persistence boundary

The browser reads the operator-selected JPEG through a local Blob URL, invokes the existing MediaPipe/FR76 path in memory, then revokes the Blob URL and overwrites the local Uint8Array copy.

The repository does not store the operator image.

The FR274 report does not contain:

- source image bytes;
- image digest;
- raw provider response;
- screen landmarks;
- metric landmarks;
- pose transform matrix;
- providerRunRef;
- face embedding;
- identity template.

Only scalar diagnostics and bounded condition labels persist.

## Authority boundary

FR274 does not issue:

- a frontal/high/low pose acceptance threshold;
- a camera-distance threshold;
- calibration;
- correction coefficients;
- pose classification;
- causal classification;
- a replacement for the frozen FR237 metric;
- traditional physiognomy interpretation authority;
- Production or Commerce authority.

Two fixed images per condition do not establish population generalization or causality.

## Operator execution

Start the existing MESH6J research server:

```bash
npm run face:dry-run:operator
```

Open:

```text
http://127.0.0.1:4316/fr274/
```

Select the exact six JPEGs in the labelled slots and run the analysis.

The downloaded file is:

```text
myeongha-fr274-still-image-diagnostic-<timestamp>.json
```

The six input photographs remain outside Git and outside the report.
