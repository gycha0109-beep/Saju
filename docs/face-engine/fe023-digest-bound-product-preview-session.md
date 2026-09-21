# FE023 — Digest-Bound Direct-Blob Product Preview Session

## Purpose

FE023 composes the FE022 digest-bound MediaPipe model runtime with the FE017 reusable product-safe browser preview session.

A browser product consumer supplies one bounded asset configuration when opening the session, then uses only `analyze(blob)` and `close()`.

## Composition

- FE022 validates the configured asset references and requires an exact model SHA-256.
- FE017 owns the reusable product-safe preview lifecycle.
- FE023 creates the FE022 runtime factory internally and hides the FE010 request envelope behind `analyze(blob)`.
- FE017 product-safe attempt and close results are preserved without adding interpretation or ranking.

A successful open means the underlying reusable session reached ready state through the digest-bound runtime path. Runtime factory objects, asset paths, and the configured digest are not returned by FE023.

## Public boundary

The FE023 result/session does not expose:

- runtime factories;
- WASM/model asset references;
- model SHA-256;
- `analyzeBlob` or the FE010 request schema;
- provider/trace/geometry execution data.

The output remains the existing neutral product-safe preview transport.

## Authority and persistence

FE023 performs no research or validation decision, classification, scoring, ranking, traditional interpretation, physiognomy/fortune claim, production activation, or commerce activation.

Raw user images are not persisted by this composition layer and no identity embedding is created.

The frozen `packages/face-reading/src/index.ts` remains unchanged.
