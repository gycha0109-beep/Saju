# FE002 — Image-to-preview face engine runtime

## Scope

FE002 is an implementation orchestrator. It does not make research or validation decisions.

It turns the already-governed geometry pipeline into one callable preview-engine path.

## Runtime

```text
image
+ frame width/height
+ providerRunRef
+ canonicalAssetDigest
+ exact geometry metadata
+ issued FR76 parity
        |
        v
FR77 governed metric geometry
        |
        v
FR78 governed metric lips surface
        |
        v
FR79 pose-normalized lips geometry
        |
        v
FE001 preview observable snapshot
```

The existing MediaPipe runtime factory remains injectable for host/runtime control.

## Identity continuity

`providerRunRef` and `canonicalAssetDigest` must remain identical through FR77, FR78, FR79, and FE001. FE002 fails closed on drift.

## Returned data

FE002 returns:

- bounded stage schema/version receipts;
- the FE001 observable snapshot;
- non-persistence and authority receipts.

It does not return or persist the raw provider response.

## Persistence

The runtime contract keeps all of the following false:

- raw image persistence;
- raw provider response persistence;
- provider depth persistence;
- metric geometry persistence;
- metric lips surface persistence;
- pose-normalized lips geometry persistence;
- biometric embedding persistence.

## Track boundary

This module consumes upstream authority only. It does not research or validate physiognomy, invent thresholds, bind traditional interpretations, or issue claims.

The frozen package `index.ts` remains unchanged.
