# FE019 — Direct-Blob Product Preview Session Facade

## Purpose

FE019 is the browser-host-facing layer above FE018.

FE018 already hides MediaPipe runtime-factory construction, but its successful session is still FE017 and therefore requires the host to construct the FE010 analysis request object.

FE019 removes that remaining lower-level request-schema knowledge from product integration.

## Public API

`openDirectBlobProductPreviewSessionFE019(config)`

The open config is the existing FE018 host-bound config.

On success, the returned session exposes only:

```ts
session.analyze(blob)
session.close()
```

The host does not construct `fe010-browser-blob-analysis-request-v1`.

## Usage

```ts
import {
  openDirectBlobProductPreviewSessionFE019,
} from '@myeongha/face-reading/preview-engine';

const opened = await openDirectBlobProductPreviewSessionFE019({
  schemaVersion: 'fe018-host-bound-product-safe-browser-preview-config-v1',
  assets: {
    schemaVersion: 'fe016-host-bound-mediapipe-asset-config-v1',
    wasmRoot: '/vendor/mediapipe/wasm',
    modelAssetPath: '/models/face_landmarker.task',
  },
});

if (opened.status === 'ready') {
  const attempt = await opened.session.analyze(blob);
  await opened.session.close();
}
```

## Composition behavior

FE019:

- delegates opening to FE018;
- hides the FE017 inner session object;
- converts `analyze(blob)` into the exact FE010 request internally;
- preserves the FE017 product-safe attempt object unchanged;
- preserves the FE017 close result unchanged;
- preserves FE018 bounded open rejection code/stage.

## Boundary

FE019 does not expose:

- `analyzeBlob`;
- the FE010 request object;
- the FE017 inner session;
- runtime factories;
- MediaPipe asset references;
- provider trace identity;
- canonical asset digests;
- execution receipts;
- raw provider payloads;
- landmarks or geometry;
- raw exception messages or stacks.

It does not issue research or validation decisions, classifications, scores/ranks, traditional interpretation, physiognomy claims, fortune claims, production activation, or commerce activation.

The frozen `packages/face-reading/src/index.ts` remains unchanged.
