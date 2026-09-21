# FE033 — Stable Preview Engine Release Handoff

## Purpose

FE024 proves that the private `@myeongha/face-reading` package can be packed, installed in isolation, and consumed only through `./preview-engine`. FE033 adds a stable distribution boundary for that already-verified artifact without publishing it to an npm or GitHub Packages registry.

The intended channel is a versioned GitHub Release asset on `gycha0109-beep/Saju`.

## Release identity

A release tag must match:

```text
face-preview-engine-vX.Y.Z
```

The release manifest binds:

- release tag;
- Saju repository;
- exact source commit;
- package name/version/public export;
- tarball filename and SHA-256;
- FE023 contract/open function;
- MediaPipe `0.10.35` pin;
- consumer digest-verification obligation.

The consumer must verify the tarball digest before installation. A replaced or corrupted asset therefore fails closed even if the release URL remains the same.

## Publish authority

Publishing is manual-only.

The workflow requires:

1. execution from `main`;
2. an exact expected source commit equal to the checked-out commit;
3. explicit confirmation text `PUBLISH_FE023_BROWSER_ENGINE`;
4. no existing release with the requested tag;
5. no existing remote tag with the requested tag;
6. FE024 build + verification;
7. FE033 release-manifest verification.

Pull-request CI never publishes.

## Distribution boundary

The release contains only:

- `myeongha-face-reading-0.0.0.tgz`;
- `release-manifest.json`.

There is no npm/GitHub Packages registry publish. Raw images, identity embeddings, physiognomy claims, production activation, and commerce activation are outside FE033.

No release is dispatched by this implementation PR.
