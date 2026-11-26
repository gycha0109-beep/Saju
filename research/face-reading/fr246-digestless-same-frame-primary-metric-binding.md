# FR246 — Digestless Same-Frame Primary Metric Provider Binding

Status: implementation candidate; capture-quality gate still blocks real FR243 execution  
Contract: `FR246-DIGESTLESS-SAME-FRAME-PRIMARY-METRIC-BINDING-v1`  
Tracking: #1302  
Watchtower-Track: `face-research`

## Purpose

FR245 identified two independent blockers after FR244:

1. capture-quality operationalization;
2. same-frame primary-metric provider binding compatible with the no-raw-image-digest boundary.

FR246 closes only the second blocker.

## Why FR77 cannot be called directly

The existing FR77 runtime request requires `canonicalAssetDigest` and returns that digest in its governed geometry candidate.

FR242 and FR244 explicitly preserve `rawImageDigestComputed=false`.

FR246 therefore does not fabricate a digest and does not reinterpret an unrelated identifier as an image digest.

## Reused governed components

FR246 reuses, rather than replaces:

- the pinned FR26 `@mediapipe/tasks-vision@0.10.35` runtime factory;
- FR76 release-exact screen-to-metric reimplementation;
- FR76 parity validation;
- FR77 exact geometry-metadata blob verifier/profile issuer;
- FR209 role-invariant eye-cycle corner derivation;
- FR208 eye outer-corner tilt formula;
- the FR237 frozen primary endpoint.

The digest-bearing FR77 runtime request/candidate is not invoked.

## Same-frame execution

FR244 now supports an asynchronous primary-metric binding preparation hook after its exact JPEG has been encoded and before FR243/FR242 execute.

FR246 receives both:

- the original in-memory MESH6H frame image;
- the exact encoded JPEG byte array that FR244 will pass to FR243.

MediaPipe detection and FR76 metric-geometry preparation happen against the original frame image.

The frozen primary metric value is **not** calculated during preparation. It is calculated only when FR242 invokes `primaryMetricExtractor` after the capture-quality evaluator has accepted the frame.

The extractor compares the FR242 working-copy bytes against the exact FR244 JPEG byte-for-byte. No digest or hash is used.

## Ephemeral lifecycle

The prepared binding retains only:

- the exact JPEG reference for byte equality;
- derived 468-point metric geometry.

It does not retain the raw provider result.

After primary-metric extraction, both retained references are released. If quality rejects the frame and the extractor is never invoked, FR244 calls `dispose()` in `finally`.

FR244 then zeroizes the JPEG bytes through its existing lifecycle.

## Provider fail-closed conditions

The real provider path requires:

- validated FR76 parity;
- exact FR77 geometry metadata blob;
- exactly one detected face;
- exactly 478 MediaPipe provider landmarks;
- disabled blendshape and provider transformation-matrix outputs;
- positive frame dimensions;
- bounded provider-run reference;
- exact FR244 JPEG bytes.

Only the first 468 provider landmarks enter FR76 geometry, matching the existing FR77 governed geometry path.

## Authority boundary

FR246 establishes only that the frozen FR237 primary metric formula can be bound to provider-backed same-frame geometry without computing a raw-image digest.

It does **not** establish:

- capture-quality validity;
- participant identity;
- independent capture freshness;
- same-participant identity;
- empirical repeatability;
- interpretation validity;
- traditional physiognomy validity;
- Production authority;
- Commerce authority.

Synthetic metric-geometry fixtures are exposed only for CI mechanics and are explicitly ineligible for real-participant execution evidence.

## Remaining blocker

Real FR243 execution remains blocked by capture quality.

FR237 requires all six quality checks before the primary metric is admitted. FR245 established that the current repository does not yet have governed acceptance operationalizations for the full six-check set, especially frontal pose, sharpness, bilateral eye-region visibility, and major eye-region occlusion.

FR246 does not insert a synthetic pass-all evaluator.

## Next frontier

`issue_governed_fr237_capture_quality_operationalizations_before_real_fr243_execution`
