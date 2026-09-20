# FE012 — Managed Preview Session Close Single-Flight

## Purpose

FE012 hardens the existing FE007 managed runtime session. It does not add a new face-reading capability or authority.

The previous FE007 close path used lifecycle state plus the analysis queue tail. A second `close()` call made after closure began could wait only for the analysis tail rather than joining the exact first close operation. That allowed inconsistent observations if the shared runtime's `close()` threw.

## Runtime behavior

Once `close()` is first called:

1. the session changes to `closing`;
2. new analysis is rejected immediately;
3. one close promise is created;
4. that promise drains the already queued analysis tail;
5. the shared runtime is closed exactly once;
6. every concurrent or repeated `close()` call receives the same promise;
7. a runtime-close failure is therefore observed consistently by every caller that joins closure.

After closure begins, the stored close promise is never replaced.

## FE007 lifecycle receipt

FE012 adds two explicit lifecycle guarantees to the existing FE007 receipt:

- `closeSingleFlight: true`
- `closeFailureConsistent: true`

Existing runtime reuse, serialization, no-persistence, and authority boundaries remain unchanged.

## Authority boundary

No research decision, validation decision, classification, traditional interpretation, claim, production activation, or commerce activation is added.

The frozen `packages/face-reading/src/index.ts` remains unchanged.
