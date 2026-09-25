# TOPIC-FACE-004 — Reader Delivery & Product-safe Display Materialization

> Watchtower-Track: topic-face  
> Product issue: #1638  
> Face authority blocker: #1639  
> Depends on: TOPIC-FACE-003

## 1. Purpose

TOPIC-FACE-003 closes the semantic boundary at:

    governed authority result
    -> Topic-bounded projection
    -> FaceGroundingBundleV1

TOPIC-FACE-004 defines the next Product boundary:

    FaceProductProjectionV1 / FaceGroundingBundleV1
    -> governed neutral display facts
    -> display-fact admission
    -> FaceReaderDeliveryV1
    -> Reader/UI consumer

The Reader renders admitted facts. It does not calculate landmarks, invent thresholds, classify morphology, or create traditional Face meaning.

## 2. Fresh FR293 display-surface audit

The current Face authority contains real product-facing neutral values.

FR293 declares authorityState as product_facing_complete_fr282_schema_no_traditional_semantics and represents all 29 FR282 feature keys, with 18 canonical extractors materialized and 11 hard gaps.

The four required face.discover.structure capabilities are materialized:

- eye.width_height_ratio
- mouth.width_and_relative_size
- chin_lower_face.visible_width_ratio
- nose.alar_width_and_nostril_geometry

The canonical feature contracts already carry numeric neutral values/axes while explicitly keeping traditional binding, classification and threshold application false.

Examples of the current authority shapes include:

- eye width/height: scalar ratio;
- mouth width/relative size: continuous neutral axes;
- lower-face visible width: scalar ratio;
- alar/nostril geometry: composite visible nasal neutral axes.

### Current integration blocker

The values exist, but topic-face does not yet have an authority-owned public join from those values to TOPIC-FACE-003's opaque observationRef.

Two concrete constraints are present:

1. packages/face-reading/src/index.ts does not export the FR284–FR293 canonical morphology payloads as its public package surface.
2. later canonical feature contracts intentionally keep source observation refs opaque, for example sourceObservationRefsExposed: false.

Therefore topic-face must not solve the join by importing private FR293 modules, exposing source observation internals, or inventing a Product observation ref.

Issue #1639 assigns the missing governed public display-fact receipt to Watchtower-Track: face-engine.

## 3. Product-side display receipt contract

TOPIC-FACE-004 introduces FaceDisplayFactReceiptV1.

A fact is bound by:

- factRef;
- observationRef;
- capabilityKey;
- canonical neutral display value;
- qualifiers and provenance;
- traditionalBindingApplied: false;
- classificationApplied: false;
- thresholdApplied: false.

The Product contract accepts only bounded neutral display shapes currently needed by the first Reader path:

- scalar numeric values;
- continuous neutral axes;
- composite visible nasal neutral axes.

It does not accept a generic arbitrary object payload.

## 4. Display-fact admission

admitFaceDisplayFacts() binds a display receipt to the already protected Product projection.

Admission requires:

- receipt sourceResultHash = projection sourceResultHash;
- every display fact observation ref exists in protected grounding;
- capability key exactly matches the bound grounding unit;
- no unavailable capability is reintroduced;
- every protected grounding observation has a display fact;
- no duplicate fact or observation binding;
- no traditional binding, classification or threshold widening.

An authority result outside the Topic projection is not silently exposed to Reader.

## 5. Privacy / authority boundary

The display boundary rejects fields that attempt to carry or control:

- raw image/photo/JPEG material;
- raw landmarks or provider landmark indices;
- MediaPipe payloads;
- pose matrices;
- face embeddings;
- identity templates;
- canonical source asset digests;
- high-resolution crops;
- Character identity / relationship state;
- price / offer / entitlement / payment;
- presentation theme metadata.

This keeps Reader delivery semantic and privacy-safe.

## 6. FaceReaderDeliveryV1

buildFaceReaderDelivery() materializes a deterministic Reader contract containing:

- topic key;
- projection hash;
- grounding hash;
- admitted display-facts hash;
- readiness state;
- semantic header keys;
- ordered Reader sections/items;
- explicit unavailable sections;
- provenance;
- readerDeliveryHash.

CSS, dark/light theme and visual layout are not inputs to this builder and therefore cannot alter Reader semantic identity.

## 7. Current Reader profiles

### face.discover.structure

Current Reader slots:

    eye
      eye.width_height_ratio

    nose
      nose.alar_width_and_nostril_geometry

    mouth
      mouth.width_and_relative_size

    chin_lower_face
      chin_lower_face.visible_width_ratio

All four must be backed by admitted display facts.

### face.discover.extended

The same four required slots are available.

forehead.visible_width_shape remains a FR294 hard gap and is materialized as an explicit unavailable Reader section. No fallback value is generated.

### face.reading.three_divisions

The Topic remains BLOCKED under the current authority snapshot. It has no authorized execution plan, Product projection, display admission or Reader delivery.

Its Product publication state remains coming_soon; the UI-facing availability mapping is therefore coming_soon, not an executable CTA.

## 8. UI availability and progress semantics

The Product contract exports the following readiness mapping:

    available -> available
    partial   -> partial
    blocked + coming_soon -> coming_soon

Internal blockers such as FRB005 counts or issue numbers are not Reader copy.

The neutral analysis progress contract uses semantic copy keys equivalent to:

1. photo check;
2. face-region check;
3. feature measurement;
4. structure assembly;
5. result assembly.

It intentionally does not claim that a traditional physiognomic interpretation is running.

## 9. Frontend audit

This repository contains engine/Product TypeScript surfaces under src/** and the Face authority workspace under packages/face-reading/**.

There is no React/Next/Vite/mobile application tree in this repository to which the previously designed MyeongHa Face Home/Capture/Progress/Result screens can be truthfully attached.

TOPIC-FACE-004 therefore does not create mock frontend components in the engine repository.

The frontend handoff boundary is:

    FaceReaderDeliveryV1
    + FaceTopicUiAvailability
    + FACE_NEUTRAL_ANALYSIS_PROGRESS_KEYS

A real MyeongHa frontend should consume that contract and reuse its existing Saju sibling-page design primitives. Photo preview should remain a separate ephemeral UI concern and must not be inserted into Reader semantic delivery.

## 10. Face authority ownership

TOPIC-FACE-004 does not modify packages/face-reading/**.

The authority gap discovered during this slice is tracked by #1639 under face-engine.

Once #1639 supplies the governed public receipt, the runtime host can replace the test receipt fixture without changing Reader semantics or widening topic-face authority.

## 11. Character boundary

Character integration is intentionally not part of TOPIC-FACE-004.

The Reader consumes neutral facts as facts. It does not turn them into personality, fate, intelligence, morality, wealth or relationship meaning.

A later Character slice must define whether and how neutral Face grounding can be verbalized without semantic promotion.
