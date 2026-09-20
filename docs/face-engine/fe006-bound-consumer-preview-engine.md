# FE006 — Bound consumer preview engine

## Purpose

FE006 turns the FE004 one-call facade into a configured engine instance so static runtime authority/resources are not supplied on every image analysis.

This is implementation plumbing only.

## Binding

```text
createBoundConsumerPreviewFaceEngineFE006({
  parity,
  geometryMetadataPbtxt,
  runtimeFactory?
})
        |
        v
engine.analyze({
  providerRunRef,
  canonicalAssetDigest,
  image,
  frameWidth,
  frameHeight
})
```

The bound engine validates the FR76 parity authority at creation time.

The release-exact geometry metadata remains verified by FR77 on every analysis. FE006 does not duplicate or weaken the exact Git-blob verification.

## Encapsulation

The returned engine object does not expose:

- the bound FR76 parity object;
- geometry metadata text;
- runtime factory;
- retained raw image state.

The per-image image object is passed directly into FE004/FE002/FR77 and is not stored by FE006.

## Failure behavior

FE006 does not catch or replace upstream errors. Invalid image requests, parity drift, metadata mismatch, provider/runtime errors, and unavailable observables remain fail-closed.

## Public boundary

The existing `preview-engine.ts` entrypoint exports FE006 creation/validation plus its host-facing types. Internal FE001/FE002/FE003 and raw geometry projectors remain private to that boundary.

## Authority

FE006 adds no research decision, validation decision, classifier, traditional interpretation, claim, Production activation, or Commerce activation.
