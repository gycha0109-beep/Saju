# FR104 Phase F — Controlled FaceLandmarker mirror-pair protocol

Issue: #1810

## Purpose

Phase E established that the exact pinned provider surface contains literal left/right topology labels but does not source-pin horizontal-mirror behavior.

Phase F defines the smallest controlled empirical experiment needed to measure that behavior without using a user image.

## Exact public fixture

The pinned MediaPipe v0.10.35 external-file manifest contains:

```text
name = com_google_mediapipe_portrait_jpg
sha256 = a6f11efaa834706db23f275b6115058fa87fc7f14362681e6abe14e82749de3e
url = https://storage.googleapis.com/mediapipe-assets/portrait.jpg?generation=1674261630039907
```

Source witness:

- repository: `google-ai-edge/mediapipe`
- release: `v0.10.35`
- commit: `f8ef212d5c962c0e853db7e59d217056b187084b`
- file: `third_party/external_files.bzl`
- blob: `f52887c2586679e00c9b0ac10291abc14334e45a`

The pinned FaceLandmarker C++ test also names `portrait.jpg` as its test image:

- file: `mediapipe/tasks/cc/vision/face_landmarker/face_landmarker_test.cc`
- blob: `41b5ede6a42ffd6ad3bbfe368af106f26a556ebf`

The image is fetched only at runtime and is not committed to Saju.

## Runtime

Reuse the existing FR26 Web runtime references:

- `@mediapipe/tasks-vision@0.10.35`
- FR26 WASM root
- FR26 float16/1 FaceLandmarker model
- IMAGE mode
- one face
- blendshapes off
- provider transformation matrices off

FR26 still records that the loaded WASM/model bytes do not have independent byte digests. Phase F does not upgrade that authority.

## Pair construction

One decoded fixture is used twice:

1. original pixels;
2. explicit horizontal canvas reflection.

No resize, crop, or rotation difference is allowed between the pair.

## Bounded output

For the provider-published left-eye and right-eye topology vertex sets, record only:

- original left-eye centroid X;
- original right-eye centroid X;
- mirrored left-eye centroid X;
- mirrored right-eye centroid X;
- same-label reflection total absolute error;
- cross-label reflection total absolute error;
- which error is numerically smaller, or equal.

Raw 478-point outputs remain ephemeral and are discarded after scalar reduction.

## What the result can and cannot mean

The experiment can describe which scalar correspondence is closer on this one exact fixture.

It cannot by itself establish:

- anatomical left/right authority;
- universal provider mirror semantics;
- a numeric acceptance threshold;
- ear laterality;
- validated ear observation;
- traditional semantics;
- Production.

## Execution surface

Local operator route:

`/fr104-mirror/`

The page accepts no user upload and never opens a camera.

Before inference it fetches the pinned public fixture and verifies its SHA-256.

Watchtower-Track: face-observation-engine
