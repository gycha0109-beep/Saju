# FE008 — Preview engine workspace package export

## Purpose

FE008 makes the existing preview-engine source boundary directly consumable by a host through:

```ts
import {
  createManagedConsumerPreviewFaceEngineFE007,
} from '@myeongha/face-reading/preview-engine';
```

This is packaging and engine integration work only. It adds no face-reading semantics.

## Build boundary

The existing face-reading verification build remains unchanged:

```text
npm run face:build
-> .face-reading-dist/
```

FE008 adds a separate host-consumable build:

```text
npm run face:build:preview-package
-> packages/face-reading/dist/
```

The dedicated compiler starts from `preview-engine.ts`, so only that entrypoint and its implementation dependency graph are emitted for package consumption.

## Package exports

`@myeongha/face-reading` exposes only:

```text
./preview-engine
```

The package root and internal modules are not exported. A host therefore cannot import FE001/FE002/FE003, FR77, or other internal geometry paths through the package name.

## Verification

`npm run face:verify:preview-package`:

1. builds the dedicated package output;
2. imports `@myeongha/face-reading/preview-engine` by package name;
3. pins the exact FE004/FE006/FE007 runtime value export surface;
4. verifies contract versions;
5. verifies the package root and selected internal paths fail with `ERR_PACKAGE_PATH_NOT_EXPORTED`.

The frozen root `packages/face-reading/src/index.ts` is not modified.
