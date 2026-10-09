# TOPIC-FACE-004D — Face Product API / UI Handoff

> Track: `topic-face`  
> Issue: #1699  
> Upstream: TOPIC-FACE-004B runtime host + TOPIC-FACE-004C immutable result snapshot/history

## Purpose

This repository does not own the MyeongHa frontend application. TOPIC-FACE-004D therefore does not introduce React, Next.js, or a synthetic UI tree.

The boundary delivered here is a transport-neutral Product API contract that a real UI or HTTP adapter can consume without learning Face Engine authority internals.

## Consumer surfaces

`createFaceProductApi()` exposes:

- `getCatalog()`
- `requestCapture(topicKey)`
- `analyze({ topicKey, observationArtifactRef, requestId })`
- `listHistory()`
- `getHistoryDetail(resultRef)`

The consumer DTOs cover:

- Face Topic Catalog
- Face Capture Request
- Face Analysis Runtime State
- Face Reader Result
- Face History List
- Face History Detail

## Catalog policy

The catalog maps governed readiness to Product-safe availability.

| Topic | Product availability | Capture | Execute |
| --- | --- | --- | --- |
| `face.discover.structure` | `available` | yes | yes |
| `face.discover.extended` | `partial` | yes | yes |
| `face.reading.three_divisions` | `coming_soon` while blocked | no | no |

Internal blocker counts, binding-group refs, and authority diagnostics are not part of the Product DTO.

## Capture boundary

The Product API does not accept image bytes, base64 photos, landmarks, MediaPipe indices, embeddings, or identity templates.

Capture handoff only declares:

- `rgb_selfie`
- `single_face_only`
- whether capture is currently allowed

After the external capture / Face Engine observation stage, Product analysis accepts only:

```text
topicKey
observationArtifactRef
requestId
```

Any widened request is rejected before runtime execution.

## Runtime state projection

Runtime states remain distinct:

```text
ready   -> ready Product result
partial -> partial Product result + explicit unavailable sections
blocked -> coming_soon, capture/execution disabled
failed  -> generic analysis_failed Product state
```

A blocked traditional topic never becomes a failed neutral analysis and never reaches the engine provider.

## Reader result

The Reader DTO is rebuilt from the admitted immutable snapshot.

It exposes only:

- Product result identity
- topic key
- available/partial readiness
- Reader header localization keys
- section localization keys
- admitted display values and qualifiers
- Product-safe unavailable section keys
- persistence timestamp

It intentionally omits authority internals and semantic hash-chain implementation fields from the UI DTO.

No Product threshold or semantic classification is created here.

## Partial result

`face.discover.extended` keeps the forehead hard gap explicit:

```text
sectionKey = forehead
status = unavailable
items = []
```

The Product layer does not infer or synthesize a forehead result.

## History

`FaceProductHistoryStoreV1` is a persistence port, not a fake production database.

Successful ready/partial analyses:

1. finalize the existing immutable `FaceResultSnapshotV1`;
2. derive the minimized `FaceHistoryEntryV1`;
3. persist both through the supplied store.

History detail loads the stored snapshot, verifies its content-addressed integrity, and projects the same Reader delivery.

It does not call Face Engine again and does not silently reanalyze with a newer engine.

## Semantic identity

TOPIC-FACE-004D does not recompute or widen:

```text
executionPlanHash
  -> sourceResultHash
  -> projectionHash
  -> groundingHash
  -> displayFactsHash
  -> readerDeliveryHash
```

`requestId`, Product DTO shape, localization keys, transport headers, and UI theme remain outside protected semantic identity.

## Explicit exclusions

TOPIC-FACE-004D does not:

- add a frontend framework;
- add a photo-upload endpoint;
- calculate Face geometry;
- create Product thresholds or traditional semantics;
- infer unavailable optional observations;
- unblock Three-Divisions;
- add Character/chatbot/conversation/persona/relationship state;
- add Commerce/price/offer/entitlement authority;
- modify `packages/face-reading/**`;
- add a CI workflow.

## Next gate

TOPIC-FACE-004E may consume this API boundary to close the non-chat vertical slice:

```text
capture
-> observation artifact
-> governed FR293 receipt
-> runtime host
-> Reader
-> immutable snapshot persistence
-> history lookup
-> same Reader result
```
