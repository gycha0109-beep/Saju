# FE004 — One-call consumer preview face engine facade

## Scope

FE004 is an implementation facade. It does not research or validate physiognomy.

It composes the already-issued FE002 runtime with the FE003 consumer-safe projection behind one callable engine function.

## Runtime

```text
governed image request
+ issued FR76 parity
+ optional MediaPipe runtime factory
        |
        v
FE002 image-to-preview runtime
        |
        v
FE003 consumer-safe projection
        |
        v
FE004 consumer preview result
```

## Consumer boundary

The returned FE004 result contains:

- provider run reference;
- canonical asset digest;
- bounded FE002/FE003 schema receipts;
- FE003 consumer-safe output.

It does not expose the FE002 internal observable snapshot or internal geometry stage objects.

## Failure behavior

FE004 does not catch and reinterpret upstream authority failures. FR77/FR78/FR79/FE001/FE002/FE003 fail-closed errors propagate to the caller.

No fallback values or synthetic metrics are generated.

## Runtime injection

The existing MediaPipe face-landmarker runtime factory remains injectable. This keeps browser/host runtime ownership outside the engine contract while preserving the same governed execution path.

## Authority

FE004 adds no research decision, validation decision, classifier, score, rank, traditional interpretation, physiognomy claim, fortune claim, Production activation, or Commerce activation.

The frozen package `index.ts` remains unchanged.
