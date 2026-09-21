# FE022 — Digest-Bound MediaPipe Model Runtime

## Purpose

FE022 closes the model-byte integrity gap left explicit by FE016.

FE016 validates where the host points the browser, but its receipt deliberately records `assetByteDigestVerified: false`. FE022 adds an opt-in runtime factory that requires an expected SHA-256 for the FaceLandmarker model and verifies the fetched model bytes before MediaPipe can consume them.

## Runtime flow

1. Validate the FE016-compatible WASM root and model asset reference.
2. Fetch the configured model with `cache: no-store`.
3. Reject failed HTTP responses, empty bodies, and assets above 64 MiB.
4. Compute SHA-256 with browser Web Crypto.
5. Fail closed if the digest differs from `modelAssetSha256`.
6. Pass the verified bytes to MediaPipe as `modelAssetBuffer`.
7. Create the runtime with the same pinned `@mediapipe/tasks-vision@0.10.35` options.

The model URL is therefore not re-fetched by `FaceLandmarker.createFromOptions`.

## Deliberate remaining boundary

FE022 does **not** claim integrity verification for the WASM files resolved from `wasmRoot`. The public receipt keeps `wasmAssetByteDigestVerified: false`.

A later composition layer may bind FE022 into the product-safe direct-Blob session. FE022 itself only supplies the lower-level verified runtime factory.

## Data and authority boundary

FE022 does not persist model bytes after runtime creation and does not persist raw user images. It creates no identity embedding and issues no classification, traditional interpretation, physiognomy/fortune claim, production activation, or commerce activation.

The frozen `packages/face-reading/src/index.ts` remains unchanged.
