# FR146 — Square Broad Fang Repeated Governed Real-Capture Dataset

## Purpose

FR146 advances the FR145 next frontier by turning multiple **byte-distinct ephemeral source captures from one study-local subject / capture series** into one bounded descriptive acquisition dataset.

The execution path remains:

`ephemeral capture A/B/... -> FR145 -> issued FR144 neutral records -> FR144 dataset materializer -> FR146 bounded repeated-capture summary`

FR146 is empirical acquisition plumbing only. It does not create a traditional `方` classifier, calibration protocol, acceptance threshold, semantic label, criterion state, structured claim, or bounded narrative.

## Repeated-capture admission

A FR146 request contains one `researchSubjectRef`, one `captureSeriesRef`, release-exact geometry metadata / FR76 parity, and at least two capture inputs. Each input must have distinct:

- `acquisitionRunRef`;
- `providerRunRef`;
- `captureRef`;
- source image bytes.

Exact source-byte duplicates are rejected **transiently** with SHA-256 before any FR145 provider execution. The digest is held only in-memory for duplicate detection and is neither persisted nor returned.

This byte-level rule prevents the trivial error of submitting the exact same image file under different opaque refs. It does **not** prove that two byte-distinct files came from independent camera events, that the expression was neutral, or that lighting / blur / occlusion / pose quality is acceptable.

`byte distinctness != independent capture event != capture quality != empirical repeatability`

## Runtime authority

Each admitted capture is executed sequentially through the active FR145 bridge. FR146 requires the FR145 bounded-result invariants and the nested FR144 record lineage. The production dependency uses `assertIssuedSquareBroadFangNeutralCaptureRecordFR144` before materializing the FR144 dataset.

FR146 reuses the FR144 descriptive series summaries for the three FR142 neutral candidate metrics:

- `neutral.mouth.contour_set.horizontal_reflection_nearest_set_residual_ratio@0.1.0`
- `neutral.mouth.contour_set.orthogonal_edge_orientation_concentration@0.1.0`
- `neutral.mouth.contour_set.turning_angle_concentration_index@0.1.0`

The summary remains `count / min / max / mean / range` only. No repeatability classification or acceptance threshold is issued.

FR134 values remain available per FR145 capture but are not promoted into a new FR146 repeatability authority. FR146 is scoped to the existing FR144/FR142 Fang-candidate acquisition lineage.

## Privacy boundary

FR146 preserves all of the following as false:

- `rawImagePersisted`
- `rawProviderResponsePersisted`
- `sourceDigestPersisted`
- `sourceDigestReturned`
- `embeddingPersisted`
- `identityTemplatePersisted`
- `derivedFullFaceMetricGeometryPersisted`
- `derivedPoseNormalizedLipsGeometryPersisted`

The returned capture ledger contains only opaque run/capture refs, study-local subject/series refs, frame dimensions, FR144 PASS provenance, and the explicit statement that capture quality was not validated.

No image bytes, base64 image content, provider landmark payload, full metric mesh, contour coordinates, embedding, identity template, or source digest may be returned by FR146.

## Semantic authority

The state remains:

- `construct validity: unresolved`
- `traditional binding: unresolved`
- `criterionState: null`
- `structuredClaim: null`
- `boundedNarrative: null`
- `traditionalSemanticAuthority: false`

`image geometry != construct validity != traditional meaning` remains the governing separation.

Repeated captures and descriptive ranges do not establish `方`, do not establish construct validity, and do not authorize a threshold.

## Quality boundary

FR145 deliberately reports:

- `captureQualityValidated: false`
- `qualityAuthority: not_assessed_by_fr145`

FR146 preserves that limitation. A repeated series can therefore be materialized without silently claiming that neutral expression, blur, illumination, occlusion, or cross-session capture conditions were controlled.

For that reason FR146 explicitly reports:

- `empiricalRepeatabilityEstablished: false`
- `repeatabilityClassificationIssued: false`
- `numericRepeatabilityAcceptanceThreshold: null`

The descriptive statistics are observations only.

## Verification

Tests and the deterministic verifier must prove:

1. at least two capture inputs are required before execution;
2. duplicate acquisition/provider/capture refs fail closed;
3. exact duplicate source bytes fail before provider execution;
4. each successful capture preserves the exact FR145 zero-persistence / unresolved-semantic boundary;
5. production lineage uses active FR144 issued records and the FR144 dataset materializer;
6. descriptive summaries remain threshold-free and classification-free;
7. no raw image/provider/geometry/digest payload appears in the returned FR146 dataset;
8. byte-level distinctness is not promoted into independent capture-event or quality authority.

Repository tests use synthetic in-memory Blob values only. No real user image is committed or uploaded to CI.

## Current empirical status

A real two-capture FR146 execution has now completed ephemerally through the active MediaPipe 0.10.35 / FR145 -> issued FR144 -> FR146 path. Both capture inputs produced FR144 acquisition `PASS` lineage before the FR144 dataset materializer and FR146 bounded descriptive dataset were issued.

No real user image or face-derived metric value is committed to the repository. Source-image digests, provider payloads, full landmark geometry, pose-normalized contour coordinates, embeddings, and identity templates were not committed as empirical evidence.

The successful two-capture materialization does **not** establish capture quality, independent session provenance, construct validity, traditional binding, a repeatability classification, or a repeatability threshold. Descriptive results remain bounded observations only.

The historical real captures also carry no independently verified multi-session assignment. They must not be retroactively labeled as separate capture sessions to satisfy a later governance gate.

## Next frontier

`square_broad_fang_capture_quality_and_multi_session_condition_governance_before_repeatability_interpretation`

Before interpreting descriptive between-capture dispersion as empirical repeatability evidence, the project needs explicit capture-quality and multi-session condition governance. That future work must remain separate from construct validity and traditional semantic binding.
