# Face Engine — Governed FR293 Product Display-Fact Receipt

> Watchtower-Track: face-engine  
> Authority blocker: #1639  
> Consumer: TOPIC-FACE-004 / topic-face

## Purpose

FR293 already materializes Product-facing neutral morphology values, but Product previously had no authority-owned public binding between those values and an opaque observation reference.

This slice adds that missing Face Engine boundary:

    FR293 canonical morphology
    -> FaceProductDisplayFactReceipt
    -> opaque observationRef + governed neutral value
    -> topic-face admission / Reader

The receipt is neutral observation authority only. It does not issue traditional Face meaning.

## Public surface

The public `@myeongha/face-reading` index now exports:

- `buildFaceProductDisplayFactReceipt()`
- `assertFaceProductDisplayFactReceipt()`
- `FaceProductDisplayFactReceipt`
- display fact/value/quality contracts
- `FACE_PRODUCT_DISPLAY_FACT_AUTHORITY_REF`

The migrated index change is registered in the post-migration evolution ledger under `FACE-ENGINE-1639`; historical source provenance and methodology semantics remain unchanged.

## Binding model

The builder accepts:

1. a governed `FR293CanonicalRgbSelfieMorphologyPayload`;
2. an opaque `face-observation-artifact:...` ref supplied by the host.

Every one of the 29 FR282 feature columns receives a stable Product observation ref derived from the opaque artifact ref plus feature key.

The ref does not contain:

- raw image bytes or path;
- source image URL;
- canonical asset digest;
- provider run ref;
- MediaPipe/provider landmark indices;
- raw landmarks;
- face embedding or identity template.

Consumers must treat the observation ref as opaque and must not parse it for semantic meaning.

## Value projection

Display-safe canonical values are projected as:

- scalar;
- continuous axes;
- composite continuous axes;
- composite visible nasal geometry;
- composite visible lip/geometry axes.

Axis output is normalized to:

- `axisKey`;
- numeric `value`;
- governed `unit`;
- governed `sourceMetricRef`.

No classifier, threshold or traditional binding is introduced.

## Non-persistable contour boundary

`canonical_contour_2d` contains derived point geometry with `persistenceAllowed: false`.

Even when the canonical source feature is available, the Product display receipt does not copy those points. It emits an explicit unavailable fact:

    reason = product_display_value_not_persistable
    sourceReason = canonical_contour_2d_persistence_disallowed

This preserves the existing retention boundary rather than turning derived geometry into a second biometric store.

## Runtime availability

`canonical_extractor_materialized` means the governed extractor exists. It does not force every capture to yield an available value.

If a canonical feature is unavailable for the current capture, the receipt remains unavailable and does not invent a fallback.

Conversely, a column that is not `canonical_extractor_materialized` in the FR293 Product map may not appear as available. A forged hard-gap value fails closed.

## Current DISCOVER structure closure

The current FR293 authority can now publicly carry the four `face.discover.structure` values with stable observation refs:

- `eye.width_height_ratio`
- `mouth.width_and_relative_size`
- `chin_lower_face.visible_width_ratio`
- `nose.alar_width_and_nostril_geometry`

All remain neutral morphology observations.

The Face Engine receipt does not itself make a topic executable. Topic readiness, execution authorization, Product projection and Reader delivery remain owned by topic-face.

## Authority invariants

Every receipt preserves:

    neutralObservationOnly = true
    rawImageExposed = false
    rawLandmarksExposed = false
    providerLandmarkIndicesExposed = false
    sourceObservationRefsExposed = false
    sourceCanonicalAssetDigestExposed = false
    identityRecognitionApplied = false
    biometricTemplateCreated = false
    traditionalInterpretationIncluded = false
    traditionalBindingIssued = false
    classifierIssued = false
    thresholdIssued = false
    commerceActivated = false

This closes #1639 without promoting FR293 geometry into traditional physiognomic semantics.
