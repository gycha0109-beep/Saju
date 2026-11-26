# FR213 — Visible lower-face width

Issue: #1051  
Stacked on: FR212

## Decision

Measure the visible lower-face contour directly. Do not reconstruct mandibular bone width from a selfie.

## Derivation

FR213 consumes:

- FR77 canonical-aligned metric face geometry;
- FR79 unordered lips contour union from the same provider run and canonical asset;
- the FACE_OVAL visible-contour selector already inherited by FR211.

Canonical metric +Y points upward.

1. Compute the mean Y of the full unordered lips contour union.
2. Select FACE_OVAL contour points whose Y is at or below that visible mouth line.
3. Measure the X envelope of those selected lower-face contour points.
4. Measure the full FACE_OVAL X envelope.
5. Feed both envelopes to FR208:
   `neutral.lower_face.visible_width_to_face_width_ratio@0.1.0`.

This is a visible lower-face contour ratio only.

## Why this is sufficient for the product observation

FR207 identifies `visible_lower_face_width_ratio` as the smallest missing chin/lower-face observable primitive and separately marks the image-only mandibular bone boundary as unavailable.

FR213 therefore implements the visible construct and leaves the hidden skeletal construct unavailable.

## Fail closed

FR213 returns unavailable when:

- fewer than two visible face-oval points remain at/below the mouth line;
- the selected lower-face X envelope collapses.

Forged/unissued FR77 or FR79 sources are rejected. The sources must share provider run and canonical asset.

## Authority

FR213 does not issue:

- mandibular bone boundary;
- Gonion mapping;
- jaw-bone width;
- skeletal calibration;
- thresholds/classifiers;
- traditional 地閣 or jaw-state binding;
- Production activation;
- Commerce activation.
