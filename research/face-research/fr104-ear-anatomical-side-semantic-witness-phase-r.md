# FR104 Phase R — anatomical-side semantic witness audit

Issue: #1810

## Question

Can the exact pinned MediaPipe FaceLandmarker 0.10.35 source surface directly authorize the mapping:

```text
provider LEFT  -> subject anatomical left
provider RIGHT -> subject anatomical right
```

The answer is **no**.

The exact release is not merely missing a perspective sentence; it also contains a side-label inconsistency that must be preserved rather than silently reconciled.

## Exact release witnesses

Release:

- `google-ai-edge/mediapipe`
- tag `v0.10.35`
- commit `f8ef212d5c962c0e853db7e59d217056b187084b`

### Published named topology

`face_landmarks_connections.ts`
blob `644de9d8c7cd90880d92b2393b4913fa93ace927`

The file publishes:

- `FACE_LANDMARKS_LEFT_EYE`, containing landmark 263 and not 33;
- `FACE_LANDMARKS_RIGHT_EYE`, containing landmark 33 and not 263.

Its comments call these “left eye” and “right eye”.

It does not state whether left/right is subject-relative or viewer/image-relative.

### Public FaceLandmarker API comments

`face_landmarker.ts`
blob `6d9b2f713345fb576301f40c3d520829ab5f23be`

The API comments refer to “a face's left eye” and “a face's right eye”.

They do not explicitly define subject versus viewer perspective.

### FaceLandmarker detector-graph rotation comments

`face_landmarks_detector_graph.cc`
blob `b17c528ceb03ddb0eef858cd6ec74e20425703f9`

The pinned source configures the rotation vector using:

```text
index 33  — "Left side of left eye."
index 263 — "Right side of right eye."
```

That wording conflicts with the published named topology surface, where 33 belongs to the provider RIGHT-eye group and 263 belongs to the provider LEFT-eye group.

The project does not reinterpret or silently correct either source.

## Adjacent Google convention

Google ML Kit face APIs explicitly document left/right as relative to the subject in the image.

That is useful contextual evidence, but it is a different product/API surface and cannot resolve conflicting or perspective-ambiguous exact FaceLandmarker sources.

It therefore has no FaceLandmarker anatomical authority in FR104.

## Decision

State:

```text
conflicting_or_ambiguous
```

Not admitted:

- provider LEFT = subject anatomical left;
- provider RIGHT = subject anatomical right;
- anatomical ear laterality.

The provider mirror experiment remains valid as a statement about label behavior under explicit horizontal pixel reflection.

It does not repair this semantic gap.

## Next work

Transform parity and same-frame identity verification may proceed because they are useful regardless of the final anatomical mapping source.

The anatomical mapping gate remains closed until either:

1. a direct, governed FaceLandmarker anatomical-side witness is found; or
2. a separately governed controlled anatomical-reference protocol is designed and admitted.

Florence prompt-side labels and image-space X sign remain prohibited substitutes.

Watchtower-Track: face-observation-engine
