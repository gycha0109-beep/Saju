# FE033A — Stable Preview Engine Distribution

FE033A materializes the already-verified FE024 consumer handoff as immutable repository bytes for the MyeongHa FE033 consumer.

## Locked producer evidence

- FE024 source commit: `1c0be383844bd7c5aa75079e2084da7bee9de13c`
- materialized commit: `1f80c30f5c829ce8d0d839cdd5816dad943c5afd`
- package: `@myeongha/face-reading@0.0.0`
- public export: `./preview-engine`
- tarball: `distribution/face-reading/fe024/myeongha-face-reading-0.0.0.tgz`
- SHA-256: `8d793c57e104fc0137a17dc631d208b468131b1d9a9668142a846e34dacbf84a`
- MediaPipe: `0.10.35`

The materialization workflow rebuilds FE024, runs the FE024 isolated consumer verifier, verifies the locked SHA-256, and only then commits the two distribution files.

## Boundary

This is distribution only. It does not publish a registry package, widen package exports, change Face Reading semantics, or add interpretation authority. The manifest remains `registryPublished=false` and `handoffOnly=true`.
