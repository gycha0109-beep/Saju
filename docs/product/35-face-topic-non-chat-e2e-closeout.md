# TOPIC-FACE-004E — Non-chat Face Discover Vertical Slice Closeout

> Track: `topic-face`  
> Issue: #1709  
> Upstream: TOPIC-FACE-004B Runtime Host / 004C immutable result history / 004D Product API handoff

## Closeout target

TOPIC-FACE-004E closes the first Face Product vertical slice without Character or conversation:

```text
face.discover.structure
-> capture handoff
-> observation artifact ref
-> governed FR293 Product receipt
-> Production Runtime Host
-> topic authorization
-> required neutral observation admission
-> FaceProductProjection
-> FaceGrounding
-> display fact admission
-> FaceReaderDelivery
-> immutable result snapshot
-> history lookup
-> same Reader result
```

The Product boundary does not ingest or persist photo bytes. Capture and Face Engine observation remain upstream of the `observationArtifactRef` handed to topic-face.

## Production components under test

The E2E harness composes existing production contracts rather than duplicating them:

- `createFaceTopicRuntimeHost()`
- repository-derived Face authority receipt adapter
- FR293 Product display receipt boundary
- `createFaceProductApi()`
- `FaceResultSnapshotV1`
- `FaceHistoryEntryV1`
- `FaceProductHistoryStoreV1`

No new Product semantic implementation is introduced by 004E.

## Positive path

For `face.discover.structure`:

1. Product catalog reports the topic available.
2. Capture handoff reports `capture_ready`.
3. Runtime receives an observation artifact reference.
4. Repository authority is evaluated.
5. FR293 supplies its 29-feature Product receipt shape.
6. Topic admission selects only the four authorized structure observations.
7. Grounding, display fact admission, and Reader delivery run through the production pipeline.
8. Product returns READY with exactly four Reader items.
9. The immutable snapshot and minimized history entry are persisted through the history port.
10. History detail returns the same Reader result without invoking Face Engine again.

## Superset boundary

The governed FR293 receipt is a 29-feature superset.

`face.discover.structure` admits only:

- `eye.width_height_ratio`
- `nose.alar_width_and_nostril_geometry`
- `mouth.width_and_relative_size`
- `chin_lower_face.visible_width_ratio`

The other FR293 features do not become Product Reader items merely because the engine receipt contains them.

## Partial path

`face.discover.extended` remains PARTIAL.

The four structure observations are available while:

```text
forehead
status = unavailable
items = []
```

No fallback value, heuristic, LLM estimate, or Product-generated threshold is permitted.

## Blocked path

`face.reading.three_divisions` remains blocked by governed authority.

The E2E acceptance requires:

```text
capture = unavailable
Product availability = coming_soon
engine execution count = 0
successful history record = 0
```

Blocked is not converted to failed and is not replaced by a generic AI reading.

## Fail-closed matrix

The E2E suite verifies rejection for:

- required observation missing;
- required observation unavailable;
- `observationArtifactRef` mismatch;
- observationRef mismatch;
- Face Engine authorityRef drift;
- Face Engine source contract version drift;
- raw landmark injection;
- raw image injection;
- semantic claim injection into the neutral receipt;
- Character metadata widening;
- price / offer / entitlement widening.

Character and Commerce request widening is rejected before runtime execution.

## Semantic identity

The protected chain remains:

```text
executionPlanHash
-> sourceResultHash
-> projectionHash
-> groundingHash
-> displayFactsHash
-> readerDeliveryHash
```

The E2E suite compares persisted snapshots and verifies that:

- identical semantic inputs produce identical protected hashes;
- requestId-only differences do not change any protected hash;
- resultRef and snapshotHash remain stable for the same semantic result.

No Product DTO field is added to expose these internal hashes.

## Persistence and history

004E uses the existing `FaceProductHistoryStoreV1` port.

The test store exists only to exercise the production persistence contract. It does not create a new repository database authority.

History reopen:

- loads the stored immutable snapshot;
- validates its content-addressed integrity;
- projects the stored Reader delivery;
- does not call Face Engine again.

A deliberately tampered stored snapshot is rejected with snapshot integrity failure.

## Privacy boundary

Persisted snapshot/history structures are recursively checked to contain no:

- original/raw photo;
- raw landmarks or landmark indices;
- MediaPipe provider payload;
- pose matrix;
- face embedding;
- identity template;
- high-resolution crop;
- Character or relationship state;
- price, offer, entitlement, or payment payload.

The observation artifact reference is the Product boundary; raw capture data is not persisted by topic-face.

## Explicitly out of scope

TOPIC-FACE-004E does not:

- add Character Handoff or conversation;
- add a chatbot;
- alter Commerce readiness;
- authorize traditional Face semantics;
- calculate Face geometry in Product;
- create Product thresholds or classifications;
- infer unavailable observations;
- add a UI framework;
- add a new CI workflow;
- treat a test fixture as production authority.

## Completion condition

The first non-chat Face Product vertical slice is closed when the full acceptance suite and existing repository CI are green on the 004E PR, then the PR is merged with `Watchtower-Track: topic-face`.

TOPIC-FACE-005 Character Handoff / Conversation remains a separate future track.
