# FE020 — Isolated Preview Package Artifact Verification

## Purpose

FE020 verifies the distribution boundary between the Saju repository and an external product consumer.

FE019 makes the browser API product-facing, but FE008 only proves package resolution from the Saju npm workspace. MyeongHa is a separate repository, so the next boundary is the packed artifact itself.

## Verification

The FE020 verifier:

1. builds the preview package into `packages/face-reading/dist`;
2. runs `npm pack --workspace @myeongha/face-reading`;
3. verifies the tarball contains the package manifest and preview-engine JS/type entrypoints and does not ship `src/`;
4. creates a fresh temporary npm project outside the workspace;
5. installs only the generated tarball;
6. imports `@myeongha/face-reading/preview-engine`;
7. verifies the FE019 contract and open function;
8. verifies the package root and selected internal implementation paths remain blocked by the export map;
9. verifies the isolated install resolves `@mediapipe/tasks-vision` exactly at `0.10.35`;
10. deletes the temporary artifact/consumer directory.

## Non-goals

FE020 does not:

- publish to npm or any registry;
- make the package public;
- integrate MyeongHa UI;
- persist raw images;
- create identity embeddings;
- issue interpretation, classification, score/rank, fortune, production, or commerce authority.

The package remains `private: true`.

The frozen `packages/face-reading/src/index.ts` remains unchanged.
