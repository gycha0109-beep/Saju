# FE007 — Managed consumer preview engine session

## Purpose

FE007 reuses one MediaPipe FaceLandmarker runtime for a bounded preview-engine session instead of creating and closing the WASM/model runtime for every image.

This is engine implementation only.

## Lifecycle

```text
await createManagedConsumerPreviewFaceEngineFE007(config)
        |
        +-- exact FR76 parity validation
        +-- exact FR77 metadata preflight
        +-- create one MediaPipe runtime
        |
        v
managedEngine
        |
        +-- analyze(image A) --+
        +-- analyze(image B) --+--> serialized FE006 -> FE004 pipeline
        +-- analyze(image C) --+
        |
        v
await managedEngine.close()
        |
        +-- drain queued analyses
        +-- close real MediaPipe runtime exactly once
```

FR77 still receives a factory because its ownership contract requires one runtime lease per analysis. FE007 supplies lightweight leases over the session-owned runtime. The lease `close()` is intentionally a no-op; only FE007 closes the real runtime.

## Concurrency

Analyses are serialized through a promise tail. The shared IMAGE-mode FaceLandmarker is therefore never invoked concurrently.

Once `close()` begins, new analyses are rejected. Existing queued work drains before the runtime is closed.

## Preflight

FE007 calls the existing FR77 exact metadata verifier during session creation. Invalid or non-release-exact geometry metadata therefore fails before the session is published.

FR77 continues to verify the metadata on each analysis; FE007 does not weaken that authority boundary.

## Data boundary

The managed engine does not expose:

- the runtime instance;
- FR76 parity object;
- geometry metadata text;
- runtime factory;
- retained raw images;
- retained provider results.

## Authority

FE007 adds no research decision, validation decision, classifier, traditional interpretation, claim, Production activation, or Commerce activation.

The root face-reading `index.ts` remains untouched.
