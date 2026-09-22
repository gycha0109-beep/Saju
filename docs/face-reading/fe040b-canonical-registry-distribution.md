# FE040B — Canonical Registry Distribution Artifact

Watchtower-Track: face-reading

FE040B materializes the already-reviewed FE035B product-neutral observation contract as an immutable consumer artifact while preserving the FE024 preview-engine export.

## Canonical authority

The canonical registry authority remains the FE035B source on PR #1227:

- source commit: `0f7de13b18a9dd9966074f371cbfd9554490f0ef`
- source path: `packages/face-reading/src/product-neutral-observation-contract-fe035b.ts`
- source blob: `c9ed7dfb347144759694056e89d571c433d4dfc8`
- contract: `FE035B-PRODUCT-NEUTRAL-OBSERVATION-CONTRACT-v1`
- canonical regions: 4
- canonical metrics: 13
- required metrics: 8
- conditional metrics: 5

The distribution branch carries the exact canonical source blob. It does not redefine or mutate the registry.

## Package surface

The private `@myeongha/face-reading@0.0.0` artifact exposes exactly:

- `./preview-engine`
- `./product-neutral-observation-contract-fe035b`

The package root and internal implementation paths remain blocked.

## Deterministic materialization

The existing stable distribution materializer is reused rather than adding another phase workflow.

For the FE040B branch it:

1. verifies the exact FE035B source blob;
2. compiles the preview and FE035B package entry points;
3. builds handoff A and verifies it;
4. builds handoff B and verifies it;
5. requires tarball SHA-256 equality and identical manifests;
6. materializes the verified bytes under `distribution/face-reading/fe040b`;
7. commits only the immutable manifest and tarball bytes.

The manifest binds the artifact to the FE035B source commit/blob and records the artifact SHA-256.

## Authority boundary

Distribution does not authorize interpretation.

The FE035B registry continues to issue no traditional binding, threshold, calibration, classification, score, ranking, narrative, or production interpretation authority.

FE040B exists only to make the canonical neutral observation registry consumable by MyeongHa without copying or locally redefining it.
