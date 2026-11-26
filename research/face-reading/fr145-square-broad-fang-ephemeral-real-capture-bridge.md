# FR145 — Square Broad Fang Ephemeral Real-Capture Bridge

## Purpose

FR145 closes the missing execution bridge between an in-memory browser image and the already-governed neutral geometry / metric chain used by FR134, FR142, and FR144.

The bridge is intentionally narrow:

`ephemeral Blob -> browser decode -> FR77 -> FR78 -> FR79 -> FR134 + FR142 -> FR144`

FR145 does not create a new face detector, landmark topology, geometry implementation, mouth-role model, semantic labeler, traditional criterion classifier, calibration protocol, or threshold.

## Runtime authority

The production dependency path reuses the existing pinned MediaPipe Face Landmarker factory from FR26 and the governed geometry path from FR77. FR77 still requires the FR76 parity-validated screen-to-metric boundary and the release-exact geometry metadata pbtxt.

The bridge computes a SHA-256 digest transiently from the in-memory image bytes only to satisfy the existing governed provenance contract. The raw bytes, decoded browser image, object URL, raw provider response, full-face metric geometry, and pose-normalized contour coordinates are not returned by the FR145 result.

The browser decoder owns an object URL only for the lifetime of one call. `release()` executes in a `finally` block on both success and downstream failure.

## Output allowlist

A successful FR145 result may expose only bounded aggregate/provenance information required for real-capture verification:

- opaque acquisition, capture, and provider run references;
- face-detected success implied by the governed single-face path;
- provider landmark count `478`;
- governed metric landmark count `468`;
- decoded frame dimensions;
- pose-normalization state;
- two unordered 20-point closed-cycle contour counts, without coordinates or outer/inner roles;
- the two FR134 neutral numeric metric values;
- the three FR142 neutral candidate numeric metric values;
- the FR144 neutral acquisition record and successful issued-record validation;
- explicit non-persistence flags;
- explicit unresolved semantic state.

## Privacy boundary

FR145 preserves all of the following as false:

- `rawImagePersisted`
- `rawProviderResponsePersisted`
- `embeddingPersisted`
- `identityTemplatePersisted`
- `derivedFullFaceMetricGeometryPersisted`
- `derivedPoseNormalizedLipsGeometryPersisted`

The runtime must not upload or persist a user's image merely to obtain neutral measurements. CI uses synthetic/injected inputs only. A real photograph is an ephemeral local runtime input and must not be committed, attached to a workflow artifact, logged as bytes/base64, or stored as a provider response.

## Semantic authority

The bridge does not change the evidence state:

- `construct validity: unresolved`
- `traditional binding: unresolved`
- `criterionState: null`
- `structuredClaim: null`
- `boundedNarrative: null`
- `traditionalSemanticAuthority: false`

`image geometry != construct validity != traditional meaning` remains the governing separation.

FR134 and FR142 values are continuous neutral image-geometry measurements. They do not mean `方`, do not establish a traditional class, and do not authorize a threshold.

FR144 records those neutral FR142 values without semantic labels. A successful FR144 record validation means only that the acquisition record satisfies the existing neutral acquisition contract.

## Quality boundary

FR145 does not invent capture-quality authority. Its result therefore reports:

- `captureQualityValidated: false`
- `qualityAuthority: not_assessed_by_fr145`

Face detection success and decodability are not promoted into neutral-expression validity, lighting adequacy, blur acceptance, occlusion acceptance, construct validity, or traditional interpretation.

## Verification

Tests must prove:

1. the bridge uses the exact FR77 -> FR78 -> FR79 -> FR134/FR142 -> FR144 dependency shape;
2. decoded image cleanup occurs on success and failure;
3. request-level raw-provider/identity payload widening fails closed;
4. raw/transient image/provider/geometry payloads do not appear in returned results;
5. semantic authority remains unresolved/null;
6. no real image is embedded in repository tests or CI.

## Next frontier

`square_broad_fang_repeated_governed_real_capture_acquisition_without_semantic_labels`

This next frontier is empirical acquisition only. Repeated neutral captures may support descriptive repeatability observation, but repeatability itself still does not establish construct validity or traditional binding.
