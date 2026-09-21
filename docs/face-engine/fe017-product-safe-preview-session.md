# FE017 — Reusable Product-Safe Browser Preview Session

## Purpose

FE017 provides the reusable product-facing counterpart to the FE015 one-shot API.

FE015 is appropriate when a host needs exactly one analysis and immediate teardown. FE017 is intended for capture/retake flows where several browser image Blobs may be analyzed during one bounded session without repeatedly initializing the MediaPipe runtime.

## Session lifecycle

`openProductSafeBrowserPreviewSessionFE017(config?)` opens FE011 once.

When opening succeeds, the returned session:

- reuses the same FE011/FE010 runtime across attempts;
- relies on FE010 serialization for underlying analyses;
- rejects new analysis as soon as close begins;
- delegates close once and shares one close promise;
- exposes no runtime instance or provider payload.

## Product-safe projection

A successful FE011 attempt contains FE004, including trace-bearing fields such as `providerRunRef`, `canonicalAssetDigest`, and an execution receipt.

FE017 validates FE004 internally and returns only:

- neutral metrics: region key, metric ref, numeric value, unit;
- four ordered region availability entries.

FE017 omits:

- `providerRunRef`;
- `canonicalAssetDigest`;
- FE004 execution receipt;
- raw error message/stack;
- provider payload;
- landmarks and geometry.

Rejected attempts expose only bounded `code` and `stage`.

## Usage

```ts
import {
  createHostBoundMediaPipeRuntimeFactoryFE016,
  openProductSafeBrowserPreviewSessionFE017,
} from '@myeongha/face-reading/preview-engine';

const runtimeFactory = createHostBoundMediaPipeRuntimeFactoryFE016({
  schemaVersion: 'fe016-host-bound-mediapipe-asset-config-v1',
  wasmRoot: '/vendor/mediapipe/wasm',
  modelAssetPath: '/models/face_landmarker.task',
});

const opened = await openProductSafeBrowserPreviewSessionFE017({
  schemaVersion: 'fe010-browser-blob-preview-engine-config-v1',
  runtimeFactory,
});

if (opened.status === 'ready') {
  const first = await opened.session.analyzeBlob({
    schemaVersion: 'fe010-browser-blob-analysis-request-v1',
    blob: firstBlob,
  });

  const retake = await opened.session.analyzeBlob({
    schemaVersion: 'fe010-browser-blob-analysis-request-v1',
    blob: retakeBlob,
  });

  await opened.session.close();
}
```

## Authority boundary

FE017 performs session management and neutral product-safe transport only.

It does not issue research decisions, validation decisions, classification, scores/ranks, traditional interpretation, physiognomy or fortune claims, production activation, or commerce activation.

The frozen `packages/face-reading/src/index.ts` remains unchanged.
