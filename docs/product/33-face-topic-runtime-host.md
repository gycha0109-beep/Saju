# TOPIC-FACE-004B — Non-chat Face Product Runtime Host

> Watchtower-Track: topic-face  
> Product issue: #1672  
> Depends on: TOPIC-FACE-004A / PR #1662  
> Character / chatbot scope: explicitly excluded

## 1. Purpose

TOPIC-FACE-004A closes the governed FR293 value path to `FaceReaderDeliveryV1`, but the caller still has to assemble authority coverage, execution planning and the Face Engine receipt manually.

TOPIC-FACE-004B adds the Product runtime composition seam:

    FaceTopicRuntimeRequestV1
    -> authority source receipt provider
    -> FaceAuthorityCoverageSnapshot
    -> FaceTopicExecutionPlan
    -> BLOCKED short-circuit
    -> FR293 Product display receipt provider
    -> TOPIC-FACE-004A live Reader pipeline
    -> FaceTopicRuntimeResultV1

The runtime does not create Face semantics. It only composes existing governed boundaries.

## 2. Caller request boundary

The public runtime request admits exactly:

    topicKey
    observationArtifactRef
    requestId

Caller-supplied methodology refs, semantic claim families, binding groups, readiness state, Character state, price, offer or entitlement are not part of the request contract.

Unknown request keys fail before either provider is called.

## 3. Provider boundaries

The host depends on two injected providers.

### Authority provider

    loadAuthorityReceipt()
      -> FaceTopicAuthoritySourceReceipt

The Product runtime builds the current authority coverage snapshot from the receipt. Product does not import private Face Engine or Face Bridge internals to manufacture readiness.

### Face Engine provider

    loadProductDisplayReceipt({
      requestId,
      topicKey,
      observationArtifactRef,
      authoritySnapshotId,
      executionPlanHash
    })

The request is server-created only after Topic readiness and execution planning succeed.

The returned payload is still admitted by the TOPIC-FACE-004A FR293 receipt boundary. Provider success is not semantic admission.

## 4. Runtime states

`FaceTopicRuntimeResultV1` separates four operational outcomes.

### ready

The Topic is AVAILABLE and the complete governed Reader pipeline succeeds.

### partial

The Topic is PARTIAL and only the admitted available portion reaches Reader. Missing optional sections remain explicit.

### blocked

Authority/readiness does not authorize execution.

BLOCKED short-circuits before the Face Engine provider is called. This is a semantic availability state, not a transport failure.

### failed

Operational or validation failure.

The failure stage is one of:

    request
    authority
    planning
    engine
    admission

Provider exceptions are mapped to stable Product runtime error codes. Arbitrary provider error text is not forwarded.

## 5. Current behavior

### face.discover.structure

    authority receipt
    -> AVAILABLE plan
    -> FR293 display receipt
    -> 4 governed observations
    -> Product projection
    -> FaceGrounding
    -> display admission
    -> FaceReaderDelivery
    -> runtime state = ready

### face.discover.extended

    authority receipt
    -> PARTIAL plan
    -> governed structure observations
    -> forehead.visible_width_shape unavailable
    -> Reader forehead section unavailable
    -> runtime state = partial

### face.reading.three_divisions

    authority receipt
    -> BLOCKED plan
    -> runtime state = blocked
    -> Face Engine provider call count = 0

TOPIC-FACE-004B does not alter FRB005 or #1521.

## 6. Hash chain

Successful runtime results retain the existing identity chain:

    authoritySnapshotId
    executionPlanHash
    sourceResultHash
    projectionHash
    groundingHash
    displayFactsHash
    readerDeliveryHash

The runtime host does not replace any of these hashes with a new semantic identity.

## 7. Character / chatbot boundary

This slice does not:

- call Character Runtime;
- create a conversation context;
- choose a persona;
- read relationship state;
- render Character prose;
- grant Reader knowledge to a Character;
- open follow-up chat.

`FaceGroundingBundleV1` remains character-neutral. TOPIC-FACE-005 remains the separate Character Handoff / Conversation track.

## 8. Commerce and persistence boundary

Commerce, pricing, entitlement, result persistence and history are not runtime inputs here.

The next non-chat slice may persist only Product-safe result references/snapshots after a successful runtime result. It must not persist raw original photos, raw landmarks, identity templates or private Face authority graphs for Product convenience.

## 9. Verification

Regression coverage requires:

- AVAILABLE invokes authority then engine and returns Reader delivery;
- PARTIAL preserves unavailable sections;
- BLOCKED never calls the Face Engine provider;
- request scope widening is rejected before provider calls;
- authority-provider failure is not reported as BLOCKED;
- engine transport failure is distinct from receipt/admission failure;
- authority/version drift remains fail-closed;
- the reusable host accepts no Character or Commerce inputs.
