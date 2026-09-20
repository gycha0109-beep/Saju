# FE005 — Preview-engine public entrypoint

## Purpose

FE005 defines the narrow source-level public boundary for the implemented preview face engine.

The existing face-reading `index.ts` remains frozen and is not modified.

## Public entrypoint

`packages/face-reading/src/preview-engine.ts`

### Runtime value exports

- `FE004_CONTRACT_VERSION`
- `runConsumerPreviewFaceEngineFE004`
- `assertConsumerPreviewEngineResultFE004`

### Type-only exports

- `FE004ConsumerPreviewEngineResult`
- `MediaPipeMetricGeometryRuntimeRequestFR77V1`
- `MediaPipeScreenToMetricReimplementationParityFR76V1`
- `MediaPipeFaceLandmarkerRuntimeFactoryFR26V1`

## Explicitly not public through this boundary

- FE001 observable composer;
- FE002 internal runtime;
- FE003 internal projection function;
- FR77/FR78/FR79 geometry projectors;
- raw contour/landmark modules;
- research artifacts.

This keeps Host/UI integration on the FE004 consumer contract rather than internal engine stages.

FE005 performs no research or validation decision and adds no semantic authority.
