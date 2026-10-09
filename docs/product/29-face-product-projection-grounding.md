# TOPIC-FACE-003 — Product-safe Projection & Face Grounding Admission

> Watchtower-Track: topic-face  
> Status: implementation slice  
> Depends on: TOPIC-FACE-001, TOPIC-FACE-002

## 1. Purpose

TOPIC-FACE-002 stops at an authorized execution plan. TOPIC-FACE-003 defines the downstream Product boundary:

```text
authorized Face Topic execution plan
  -> governed authority result receipt
  -> result admission
  -> Topic-bounded product projection
  -> character-neutral Face grounding
  -> Reader / Character consumers
```

The Product layer selects governed output. It does not create Face semantics.

## 2. Stable execution identity

Authorized execution plans now carry a content-addressed `executionPlanHash`.

The identity includes Topic definition, authority snapshot, observation artifact, execution kind, readiness and bounded requirements. Transport-only `requestId` is excluded, so retrying the same semantic execution does not create a different plan identity.

Required and optional methodology / semantic-claim scopes remain separate in the plan while the combined lists are retained for bounded execution.

## 3. Authority result receipt

`FaceTopicExecutionResultReceiptV1` is the Product-side transport boundary for governed Face output.

It keeps separate collections for:

- neutral observation units;
- traditional semantic claim units;
- approved narrative blocks.

Admission binds the receipt to the authorized plan by:

- execution plan hash;
- request id;
- authority snapshot id;
- observation artifact ref;
- execution kind.

Required observation, methodology, binding and semantic-claim coverage is fail-closed.

A neutral observation plan rejects traditional claims, methodology packs, binding groups and Face-reading refs. Observation presence therefore cannot promote itself to traditional meaning.

## 4. Superset source, bounded projection

An authority result may contain more governed units than a Product Topic needs. The Product projection selects only units allowed by the Topic execution plan.

```text
governed result: A B C D
Topic allows:     A   C
projection:       A   C
```

Unselected units do not enter `FaceGroundingBundleV1`.

Narrative blocks are stricter: every source ref used by a block must be selected into the Topic projection. A block that would leak an out-of-scope source is rejected.

## 5. Partial means unavailable, not invented

For a `partial` Topic, missing optional authority remains explicit in `unavailableSections`.

For example, the current `face.discover.extended` Topic keeps:

```text
observation:forehead.visible_width_shape
```

unavailable while that FR294 hard gap remains unresolved. No fallback observation or narrative is synthesized.

## 6. Character-neutral grounding

`FaceGroundingBundleV1` contains protected observation units, traditional claim units when governed authority exists, approved narrative blocks, unavailable sections, prohibited inferences and provenance.

It intentionally does not accept:

- character identity or relationship state;
- rendering profile or UI layout;
- price, offer, entitlement or payment state.

The `groundingHash` represents protected selected meaning and excludes transport/source envelope fields such as request id. Character, rendering and commerce therefore cannot redefine semantic grounding.

Observation grounding units carry an explicit prohibition against traditional-semantic promotion without a governed claim.

## 7. Hash separation

The slice keeps three identities distinct:

- `executionPlanHash`: what execution was authorized;
- `sourceResultHash`: what governed authority returned;
- `groundingHash`: what protected selected meaning is exposed to downstream consumers;
- `projectionHash`: which Topic projected which governed result into that grounding.

This lets transport retries remain stable while real source or selected semantic changes remain detectable.

## 8. Privacy boundary

Result admission rejects Product payload fields that attempt to carry raw or identity-sensitive Face material, including raw images, raw landmarks, MediaPipe payloads, pose matrices, face embeddings, identity templates and high-resolution crops.

Product projection keeps opaque governed refs rather than copying the internal Face Claim Graph, Rule Registry or raw landmark graph.

## 9. Current readiness behavior

Against the current governed authority:

| Topic | State | TOPIC-FACE-003 behavior |
|---|---|---|
| `face.discover.structure` | available | neutral result admission and grounding allowed |
| `face.discover.extended` | partial | required neutral result allowed; forehead optional remains unavailable |
| `face.reading.three_divisions` | blocked | no authorized plan, result admission, projection or grounding |

Three-Divisions remains blocked while FRB005 bindings and the required governed semantic claim authority are not ready. TOPIC-FACE-003 does not invent a traditional claim to test the downstream path.

## 10. Ownership boundary

This slice changes Product-side `src/face-topic/**`, tests and Product documentation only.

It does not modify `packages/face-reading/**`. If a future Product flow requires a governed source result surface that the Face authority does not expose, that missing surface belongs to the corresponding Face authority track rather than being recreated in topic-face.

## 11. Next seam

The next slice can connect `FaceProductProjectionV1` / `FaceGroundingBundleV1` to a Reader and later to Character rendering.

Those consumers may choose order, presentation depth, framing, reaction and questions. They may not add claims, restore unavailable sections, strengthen certainty, remove prohibited inferences or turn neutral observations into traditional meaning.
