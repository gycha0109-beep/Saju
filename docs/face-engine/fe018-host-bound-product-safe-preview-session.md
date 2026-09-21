# FE018 — Host-Bound Product-Safe Browser Preview Session Facade

## Purpose

FE018 closes the consumer composition gap between FE016 and FE017.

Before FE018, a product host had to:

1. build an FE016 MediaPipe runtime factory;
2. know the lower-level FE010 config schema;
3. inject that factory into FE017.

FE018 reduces that startup path to one host-facing configuration while preserving the existing FE016 asset restrictions and FE017 reusable product-safe session.

## Public API

`openHostBoundProductSafeBrowserPreviewSessionFE018(config)`

The config contains only:

- `schemaVersion`;
- `assets`, using the existing FE016 host-bound asset config.

FE018 creates the runtime factory internally and does not return it.

## Usage

```ts
import {
  openHostBoundProductSafeBrowserPreviewSessionFE018,
} from '@myeongha/face-reading/preview-engine';

const opened = await openHostBoundProductSafeBrowserPreviewSessionFE018({
  schemaVersion: 'fe018-host-bound-product-safe-browser-preview-config-v1',
  assets: {
    schemaVersion: 'fe016-host-bound-mediapipe-asset-config-v1',
    wasmRoot: '/vendor/mediapipe/wasm',
    modelAssetPath: '/models/face_landmarker.task',
  },
});

if (opened.status === 'ready') {
  const attempt = await opened.session.analyzeBlob({
    schemaVersion: 'fe010-browser-blob-analysis-request-v1',
    blob,
  });

  await opened.session.close();
}
```

## Composition guarantees

FE018:

- validates the host-facing top-level config exactly;
- delegates asset-reference validation to FE016;
- creates FE016's runtime factory internally;
- opens FE017 with that factory;
- preserves FE017 reusable-session lifecycle and product-safe attempt projection;
- returns only bounded rejection `code` and `stage` on failure;
- does not expose the runtime factory or configured asset references.

The composition receipt reports only contract identities and boolean composition facts.

## Authority and data boundary

FE018 does not issue:

- research or validation decisions;
- classifications;
- scores or ranks;
- traditional interpretation;
- physiognomy or fortune claims;
- production activation;
- commerce activation.

It does not expose:

- `runtimeFactory`;
- `wasmRoot`;
- `modelAssetPath`;
- provider run references;
- canonical asset digests;
- FE004 execution receipts;
- raw provider payloads;
- landmarks or geometry;
- raw exception messages or stacks.

The frozen `packages/face-reading/src/index.ts` remains unchanged.
