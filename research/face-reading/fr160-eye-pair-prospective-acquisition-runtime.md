# FR160 — Eye-pair prospective acquisition runtime

## Purpose

FR160 is the authority-safe ingestion layer between the FR159 preregistered prospective protocol and future fresh-capture observations.

It does **not** add empirical evidence at definition time. Instead, it defines how a future FR159 capture manifest may be paired with the issued FR158 metric runtime generated from that capture without opening identity matching, thresholding, calibration, construct validity, or traditional semantics.

## Exact predecessor boundary

FR160 requires:

- an issued FR159 prospective capture manifest;
- an issued FR158 role-invariant eye-pair metric-3D runtime;
- the exact two preregistered FR159 primary metric refs;
- an explicit attestation that the FR158 runtime corresponds to the capture represented by the FR159 manifest.

The runtime/manifest correspondence attestation is **not** treated as independent proof. It is protocol input metadata only.

## Primary metrics

Only these two metric values are copied into an FR160 acquisition record:

1. `neutral.eye_pair.metric_3d.mean_cycle_x_span_to_full_mesh_x_span_ratio@0.1.0`
2. `neutral.eye_pair.metric_3d.mean_cycle_perimeter_to_full_mesh_x_span_ratio@0.1.0`

The other FR158 exploratory metrics remain outside the preregistered primary prospective feature set.

## Acquisition record

An FR160 record stores only protocol-local references and the two primary metric values:

- `prospectiveCollectionRef`
- `captureSeriesRef`
- `captureRef`
- `captureConditionRef`
- `captureSequenceIndex`
- two ratio-valued metric observations

It does not store raw images, provider responses, raw landmarks, derived full-face metric geometry, embeddings, or identity templates.

`captureSeriesRef` remains a protocol-local grouping reference. It is not an identity match, identity template, or external identity resolution mechanism.

## Dataset materialization

FR160 may materialize an in-memory descriptive dataset from issued FR160 records when empirical records are supplied later.

Dataset invariants:

- a dataset may contain only one `prospectiveCollectionRef`;
- duplicate `captureRef` values are rejected;
- duplicate `captureSequenceIndex` values inside one `captureSeriesRef` are rejected;
- summaries are grouped by `captureSeriesRef` and `captureConditionRef`;
- permitted statistics remain `count`, `min`, `max`, `mean`, and `range`.

These summaries are descriptive only. They do not issue repeatability PASS/FAIL, capture-sensitivity PASS/FAIL, capture-quality validity, calibration, or thresholds.

## Verification fixture boundary

The FR160 verifier creates an in-memory synthetic mechanics fixture by replaying the governed FR66 → FR67 → FR68 → FR69 → FR75 → FR76 → FR77 → FR158 path against the exact MediaPipe release fixture.

That verifier fixture is **not** prospective empirical evidence and cannot establish repeatability.

Definition-time empirical state remains:

```text
empiricalFreshCaptureRecordsBundledAtDefinitionTime = 0
empiricalRepeatabilityEstablished = false
captureQualityValidated = false
numericRepeatabilityAcceptanceThreshold = null
numericCaptureQualityThreshold = null
constructValidity = unresolved
traditionalBinding = unresolved
traditionalSemanticAuthority = false
```

## Identity and semantic boundary

FR160 forbids:

- face identity matching;
- same/different participant classification;
- biometric templates or embeddings;
- between-series identity inference;
- physical anthropometric interpretation;
- traditional criterion binding;
- morphology promotion;
- traditional semantic claims.

## Next frontier

Actual progress after FR160 requires user-supplied **fresh post-preregistration captures**. Those captures must run through the governed geometry path and FR158, receive FR159 manifests, and only then be admitted as FR160 records.

The next frontier is:

`supply_fresh_post_preregistration_captures_execute_fr66_to_fr158_then_record_fr160_and_describe_within_series_and_condition_variation_without_identity_threshold_or_semantic_promotion`
