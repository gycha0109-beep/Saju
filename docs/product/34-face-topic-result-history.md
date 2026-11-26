# TOPIC-FACE-004C — Immutable Face Result Snapshot and History Projection

> Watchtower-Track: topic-face  
> Product issue: #1676  
> Depends on: TOPIC-FACE-004B / PR #1675  
> Character / chatbot scope: explicitly excluded

## 1. Purpose

TOPIC-FACE-004B can execute the current non-chat Face Product path and return a governed Reader result.

TOPIC-FACE-004C defines what Product storage may finalize and what the history list may expose.

The storage boundary is:

    successful FaceTopicRuntimeResultV1
    -> FaceResultSnapshotV1
    -> Product persistence adapter
    -> FaceHistoryEntryV1 for history lists
    -> stored Reader delivery for result detail

This slice defines the immutable Product contract. It does not add a concrete database migration.

## 2. Finalizable runtime states

Only:

    ready
    partial

may become successful Face result snapshots.

The following are not successful history results:

    blocked
    failed

A blocked authority state must not be converted into a fake result record. A provider or admission failure must not be presented as a completed Face reading.

## 3. Snapshot pins

`FaceResultSnapshotV1` pins:

    topicKey
    topicDefinitionRef
    observationArtifactRef
    authoritySnapshotId
    faceEngineVersion
    methodologyPackRefs
    executionPlanHash
    sourceResultHash
    projectionHash
    groundingHash
    displayFactsHash
    readerDeliveryHash
    readinessState
    unavailableSections
    prohibitedInferences
    renderingProfileRef
    readerDelivery
    createdAt

This is Product provenance. It is not a copy of Face Engine semantic authority.

For the current neutral Discover path, `methodologyPackRefs` is empty.

## 4. Content-addressed identity

The snapshot has two related identities:

    resultRef = face-result:<digest>
    snapshotHash = face-result-snapshot:<digest>

The digest covers the semantic/Product result content, including the Reader delivery and all pinned hash-chain references.

`createdAt` is deliberately excluded from the digest.

Therefore storing the exact same governed result at a different persistence timestamp does not create a different semantic result identity.

A different observation artifact, authority snapshot, projection, grounding, display fact or Reader delivery changes the digest.

## 5. Integrity

`assertFaceResultSnapshot()` verifies:

- schema version;
- canonical timestamp;
- required non-empty refs;
- Reader topic/readiness/hash bindings;
- full content-addressed snapshot digest;
- resultRef and snapshotHash consistency.

A persisted snapshot whose protected content is modified fails closed.

The assertion does not re-run Face Engine or re-evaluate current Topic readiness. Historical results remain pinned to the authority and Topic definition used when they were created.

## 6. History-list minimization

`FaceHistoryEntryV1` is intentionally smaller than the stored result snapshot.

It contains only:

    resultRef
    topicKey
    readinessState
    header
    readerDeliveryHash
    unavailableSections
    createdAt

The history list does not need observation artifact refs, authority snapshot IDs, engine versions or the full Reader payload.

Result detail can resolve `resultRef` to the immutable stored snapshot.

## 7. Privacy boundary

The Product snapshot may retain the opaque `observationArtifactRef` needed for provenance.

It must not retain:

- raw original photo;
- raw JPEG/image bytes;
- raw MediaPipe output;
- raw screen or metric landmarks;
- pose matrices;
- face embeddings;
- identity templates;
- unused high-resolution crops;
- private Face Claim Graph;
- full Rule Registry;
- Character identity or relationship state;
- price, offer, entitlement or payment payloads.

Result history and original-photo history remain separate concerns.

## 8. Runtime pin extension

TOPIC-FACE-004C extends successful TOPIC-FACE-004B runtime results with the persistence pins already produced by the admitted pipeline:

    faceEngineVersion
    methodologyPackRefs
    prohibitedInferences

No new semantic authority is created by exposing these fields.

## 9. Current product behavior

### face.discover.structure

    runtime = ready
    -> immutable result snapshot
    -> history entry
    -> detail can replay stored FaceReaderDeliveryV1

### face.discover.extended

    runtime = partial
    -> immutable result snapshot
    -> forehead unavailable remains pinned
    -> history entry preserves partial state

### face.reading.three_divisions

    runtime = blocked
    -> no successful FaceResultSnapshotV1
    -> no completed result-history entry

## 10. Character / chatbot boundary

No Character Runtime, conversation context, persona, relationship state or Character rendering is introduced.

The stored result remains character-neutral.

TOPIC-FACE-005 remains a separate track.

## 11. Next non-chat seam

The next slice may expose Product API/UI DTOs for:

    Topic catalog
    capture request
    analysis runtime state
    Reader result detail
    history list / history detail

Those DTOs should consume the runtime and snapshot contracts defined here rather than re-reading Face Engine internals.
