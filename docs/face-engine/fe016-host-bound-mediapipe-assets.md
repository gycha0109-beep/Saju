# FE016 — Host-Bound MediaPipe Runtime Assets

## Purpose

FE016 provides a bounded public runtime factory for preview hosts that need to supply their own MediaPipe WASM and FaceLandmarker model asset locations.

The default FR26 runtime remains unchanged. FE016 is an optional injected factory compatible with the existing FE010/FE015 `runtimeFactory` path.

## Accepted asset references

FE016 accepts:

- absolute HTTPS URLs;
- root-relative same-origin paths;
- HTTP URLs only for localhost / loopback development.

It rejects:

- scheme-relative references;
- URL credentials;
- URL fragments;
- whitespace or backslash-bearing references;
- non-loopback HTTP;
- `data:`, `blob:`, `javascript:`, and `file:` schemes;
- unexpected config fields.

## Pinned runtime options

The created MediaPipe FaceLandmarker always uses:

- package: `@mediapipe/tasks-vision@0.10.35`
- running mode: `IMAGE`
- `numFaces: 1`
- face blendshapes disabled
- facial transformation matrices disabled

Host configuration changes only asset locations. It does not widen runtime semantics.

## Asset receipt

The public factory receipt records:

- exact host-configured WASM root;
- exact host-configured model path;
- asset refs are host configured;
- asset byte digests are not verified;
- asset bytes are not persisted by the engine.

The receipt and authority boundary are exact-field validated.

## Usage

```ts
import {
  createHostBoundMediaPipeRuntimeFactoryFE016,
  runProductSafeBrowserPreviewFE015,
} from '@myeongha/face-reading/preview-engine';

const runtimeFactory = createHostBoundMediaPipeRuntimeFactoryFE016({
  schemaVersion: 'fe016-host-bound-mediapipe-asset-config-v1',
  wasmRoot: '/vendor/mediapipe/wasm',
  modelAssetPath: '/models/face_landmarker.task',
});

const result = await runProductSafeBrowserPreviewFE015(
  {
    schemaVersion: 'fe013-one-shot-browser-preview-request-v1',
    blob,
  },
  {
    schemaVersion: 'fe010-browser-blob-preview-engine-config-v1',
    runtimeFactory,
  },
);
```

## Authority boundary

FE016 provides execution plumbing only. It does not issue research or validation decisions, classification, traditional interpretation, physiognomy or fortune claims, production activation, or commerce activation.

The frozen `packages/face-reading/src/index.ts` remains unchanged.
