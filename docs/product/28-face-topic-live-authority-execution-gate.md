# TOPIC-FACE-002 — Live Authority Coverage & Execution Gate

> Watchtower-Track: topic-face  
> Status: implementation slice  
> Depends on: TOPIC-FACE-001

## 1. Purpose

TOPIC-FACE-001 established the Product Topic registry, requirement manifests and fail-closed readiness resolver. Its FR293/FRB005 snapshot is a regression fixture, not a runtime authority source.

TOPIC-FACE-002 adds the next boundary:

```text
governed Face authority
  -> authority source receipt
  -> content-addressed coverage snapshot
  -> Face Topic readiness
  -> execution gate
```

A Topic can produce an execution plan only when its required authority is available. The Topic layer still does not create Face semantics.

## 2. Authority source receipt

The face-reading package owns the adapter that reads its own governed surfaces:

- FR293 product column map: materialized neutral observation capabilities;
- FR294 hard-gap frontier: represented but not materialized product capabilities;
- FRB005 binding ledger: methodology-scoped traditional binding state;
- T7 Three-Divisions handoff: methodology availability and fail-closed traditional state.

The adapter emits a serializable `face-topic-authority-source-receipt-v1`. Topic code consumes the receipt instead of importing face-reading internals into the root product package.

This preserves the build/package boundary and prevents topic-face from becoming an alternative Face authority.

## 3. Observation rule

Only FR293 entries whose `implementationState` is `canonical_extractor_materialized` become `availableObservationCapabilities`.

FR294 hard-gap entries remain unavailable. Schema representation, research candidates and hard-gap work do not become product capability merely because a key exists.

Current partition:

- materialized: 18
- hard gap: 11
- total canonical product columns: 29

## 4. Traditional and bridge rule

Methodology presence is represented separately from executable traditional claims.

Current Three-Divisions authority remains:

- methodology definitions: present;
- FRB005 slots: 16;
- unique traditional anchors: 7;
- admitted bindings: 0;
- governed semantic claim family `face.claim.three_divisions`: unavailable;
- execution: blocked.

Neutral geometry or future observation progress cannot create a traditional binding. Only bridge authority can admit the binding.

## 5. Content-addressed coverage

`buildFaceAuthorityCoverageSnapshot()` normalizes and hashes the authority receipt.

The snapshot identity changes when authority coverage changes, while the Topic definition identity remains unchanged. This permits research progress to alter readiness without editing Product Topic semantics.

The builder rejects:

- materialized/hard-gap overlap;
- duplicate binding groups;
- invalid binding counts;
- `bindingReady=true` with missing admitted bindings.

## 6. Execution gate

`planFaceTopicExecution()` accepts only:

- `topicKey`;
- `observationArtifactRef`;
- `requestId`.

Methodology refs, claim families and binding requirements are derived from the registered Topic. Caller-supplied authority overrides are rejected.

Outcomes:

- `blocked` -> no execution plan;
- `available` -> bounded execution plan;
- `partial` -> bounded execution plan only because the Topic contract already allowed optional omissions.

Execution kinds remain distinct:

- `neutral_observation_projection`;
- `traditional_face_reading`.

An observation-only Topic therefore cannot silently become a traditional reading.

## 7. Current product behavior

Against the live authority receipt:

| Topic | Current state | Reason |
|---|---|---|
| `face.discover.structure` | available | required FR293 neutral observations are materialized |
| `face.discover.extended` | partial | optional `forehead.visible_width_shape` remains FR294 hard gap |
| `face.reading.three_divisions` | blocked | vertical references, semantic claim family and FRB005 admitted bindings are not complete |

## 8. Security / authority invariants

TOPIC-FACE-002 does not authorize:

- observation -> traditional meaning promotion;
- geometry -> traditional anchor relabeling;
- methodology presence -> executable reading;
- client-selected methodology/claim overrides;
- rendering, commerce or character metadata -> semantic readiness changes;
- raw image persistence;
- multi-face reading;
- price/SKU/payment behavior.

## 9. Next seam

The next product slice may consume an authorized execution plan to build a Topic-specific product-safe projection for Reader/Character rendering.

That projection must remain downstream of this execution gate and may only select or frame governed output. It must not create new Face claims.
