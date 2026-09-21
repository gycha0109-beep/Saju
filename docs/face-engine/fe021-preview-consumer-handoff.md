# FE021 — Preview Consumer Handoff Bundle

## Purpose

FE021 turns the FE020 isolated-install proof into a portable, machine-verifiable handoff artifact for a separate product repository.

The handoff remains private and CI-only. It is not an npm or GitHub Packages publication.

## Bundle

The workflow produces exactly:

- one `.tgz` containing `@myeongha/face-reading`;
- one `manifest.json`.

The manifest binds the tarball to:

- package name/version;
- the only public package export, `./preview-engine`;
- tarball SHA-256;
- FE019 contract version;
- `@mediapipe/tasks-vision@0.10.35`;
- the source commit when `GITHUB_SHA` is available;
- an explicit `registryPublished: false` / `handoffOnly: true` distribution boundary.

## Verification

The verifier recomputes the tarball SHA-256, checks the manifest and installed package metadata, installs the exact tarball into a fresh temporary consumer project, imports `@myeongha/face-reading/preview-engine`, checks FE019, and confirms root/internal package paths remain blocked.

## Authority boundary

FE021 adds no face interpretation or product authority. It does not persist raw images, create identity embeddings, classify or rank people, issue fortune claims, or grant production/commerce authority.

The frozen `packages/face-reading/src/index.ts` is unchanged.
