# FE024 — Digest-Bound Preview Consumer Handoff

## Purpose

FE024 advances the private CI handoff bundle from FE019 to the FE023 digest-bound direct-Blob product preview session.

The bundle remains a machine-verifiable transfer artifact for a separate product repository. It is not a registry publication.

## Bundle

The workflow produces exactly one package tarball and one `manifest.json`.

The manifest binds:

- `@myeongha/face-reading@0.0.0`;
- the only public export, `./preview-engine`;
- tarball SHA-256;
- FE023 contract and `openDigestBoundProductPreviewSessionFE023`;
- the FE023/FE022 runtime configuration schema obligations;
- required consumer-supplied `wasmRoot`, `modelAssetPath`, and `modelAssetSha256`;
- SHA-256 as the required model digest algorithm;
- the explicit fact that WASM bytes are not integrity-verified by the engine;
- `@mediapipe/tasks-vision@0.10.35`;
- source commit when available;
- `registryPublished: false` and `handoffOnly: true`.

Actual runtime asset values are not bundled into the handoff.

## Verification

The verifier recomputes the tarball digest, validates the manifest, installs the exact tarball in an isolated temporary consumer, imports FE023 through `@myeongha/face-reading/preview-engine`, verifies the public open function, and confirms root/internal package paths remain blocked.

## Boundary

FE024 adds no image persistence, identity embedding, interpretation, classification, ranking, production authority, or commerce authority. The frozen root index remains unchanged.
