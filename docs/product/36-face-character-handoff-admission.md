# TOPIC-FACE-005A — Source-owned Face Character Handoff Admission

> Track: `topic-face`  
> Issue: #1721  
> Upstream: TOPIC-FACE-003 grounding, TOPIC-FACE-004A live FR293 Reader, TOPIC-FACE-004B runtime, TOPIC-FACE-004C snapshot/history, TOPIC-FACE-004D Product API, TOPIC-FACE-004E non-chat E2E

## Goal

TOPIC-FACE-005A establishes the source-owned boundary that makes an admitted Face result consumable by a downstream Character runtime without turning Character into Face semantic authority.

The boundary is:

```text
FaceTopic execution result
  -> FaceProductProjection
  -> FaceGroundingBundleV1
  -> admitted display facts
  -> FaceCharacterGroundingBundleV1
  -> positive source admission
  -> FaceCharacterGroundingBundleRefV1
  -> Character handoff eligibility
```

005A does not implement Character perspective, persona, relationship state, rendering, LLM prompts, memory, conversation, or chatbot behavior.

## Ownership

The Face/source side owns:

- the Character-safe grounding projection contract;
- source-unit and display-fact correlation;
- realization-policy registry/version;
- prohibited inference preservation;
- immutable Character grounding identity;
- positive source admission;
- stable bundle reference;
- semantic eligibility.

The downstream Character runtime may later own:

- Character capability;
- perspective/attention order;
- deterministic insight selection;
- reading plan;
- delivery style;
- relationship/world context;
- renderer;
- semantic preservation guard;
- conversation orchestration.

Character capability cannot widen Face authority.

## Character grounding is not Reader reconstruction

The Character artifact is built from:

```text
FaceProductProjection
  + FaceAdmittedDisplayFactsV1
```

It is not rebuilt from the public Product Reader DTO.

A neutral grounding observation contains source identity and prohibitions, while an admitted display fact contains the Product-safe measured value. The handoff projection joins them by the existing source identities:

```text
grounding.observationRef == displayFact.observationRef
grounding.capabilityKey == displayFact.capabilityKey
```

The existing Face grounding `unitId` remains the Character unit ID. No Character-owned semantic unit identity is invented.

## Contract

`FaceCharacterGroundingBundleV1` pins:

- schema version;
- projection version;
- realization-policy registry version;
- topic key;
- readiness state;
- Face Engine/source-contract version;
- `sourceResultHash`;
- `projectionHash`;
- `groundingHash`;
- `displayFactsHash`;
- Character-safe neutral units;
- unavailable sections;
- prohibited inferences;
- `bundleHash`.

It intentionally does not contain:

- requestId;
- characterId;
- persona version;
- relationship state;
- session/conversation ID;
- Commerce data;
- UI theme;
- creation timestamp;
- raw image;
- raw landmarks;
- face embedding;
- identity template.

## Neutral realization policy

005A activates one source-owned policy:

```text
bounded_neutral_fact_render_v1
```

The policy preserves neutral structure facts only. Its constraints include:

- no added classification;
- no traditional promotion;
- no personality inference;
- no fate inference;
- no wealth inference;
- no relationship inference;
- no threshold generation;
- no certainty strengthening;
- preserve qualifiers;
- preserve prohibited extensions;
- preserve unavailable sections.

A measured neutral value does not authorize a semantic class such as "large", a personality statement, or a traditional/fate reading unless a separate governed authority explicitly supplies that meaning.

## Current positive topics

### face.discover.structure

Expected handoff:

```text
state = eligible
mode = neutral_fact_realization
units = 4
semantic/traditional claims = 0
```

The four units are the Topic-authorized observations:

- `eye.width_height_ratio`;
- `nose.alar_width_and_nostril_geometry`;
- `mouth.width_and_relative_size`;
- `chin_lower_face.visible_width_ratio`.

The FR293 29-feature authority superset does not widen the Character handoff.

### face.discover.extended

Expected handoff:

```text
state = eligible
mode = neutral_fact_realization
units = 4
readiness = partial
forehead = unavailable
```

The unavailable forehead capability is preserved; it is not inferred or filled by Character.

### face.reading.three_divisions

Expected handoff:

```text
Product readiness = blocked
Character source eligibility = not_eligible
reason = source_blocked
engine execution = 0
```

Character cannot restore or substitute for missing Face Bridge/traditional authority.

## Positive source admission

Structural integrity alone is not sufficient.

`assertFaceCharacterGroundingBundleV1()` verifies bundle structure, versions, unit uniqueness/order, policy, prohibited-inference preservation, privacy scope, and `bundleHash`.

`admitFaceCharacterGroundingBundleV1(candidate, source)` additionally rebuilds the expected bundle from the admitted production source and compares deterministic content identity.

Therefore a caller cannot change a measured value, recalculate a matching bundle hash, and have the forged bundle treated as admitted source grounding.

## Stable reference

`FaceCharacterGroundingBundleRefV1` pins:

- topic key;
- source result hash;
- projection hash;
- grounding hash;
- display-facts hash;
- Character bundle hash;
- Character projection version.

It contains no Character ID.

Different characters consuming the same governed Face result must start from the same Face Character grounding ref. Character differentiation is downstream perspective/delivery behavior, not source truth.

## Runtime composition

The live runtime pipeline now produces sibling projections:

```text
execution result
  -> Product projection
  -> admitted display facts
       |-> Face Reader
       |-> Face Character grounding
```

The Character artifact is not derived from Reader presentation.

Runtime success carries the admitted Character bundle/ref for an authorized downstream server consumer.

## Product identity remains unchanged

005A does not add Character fields to `FaceResultSnapshotV1`.

The existing immutable Product identity chain remains:

```text
executionPlanHash
-> sourceResultHash
-> projectionHash
-> groundingHash
-> displayFactsHash
-> readerDeliveryHash
```

`resultRef` and `snapshotHash` remain Product result identities and do not depend on Character integration.

The Character `bundleHash` is a downstream sidecar identity.

## Product API isolation

Existing consumer Product DTOs remain unchanged.

The Product API does not expose:

- `characterGrounding`;
- `characterGroundingRef`;
- Character `bundleHash`;
- realization-policy internals;
- grounding prohibited-extension internals.

005A adds an internal server-owned handoff contract, not a new Product UI surface.

## Historical results

A Product result snapshot and a Character grounding sidecar have different ownership/lifecycles.

An old Product snapshot without an admitted Character sidecar remains a valid historical Reader result. The system must not silently rerun Face Engine from history merely to fabricate a Character sidecar.

A downstream persistence owner may later pin the admitted Character bundle/ref alongside the Face result reference without changing the historical Product result identity.

## Fail-closed requirements

005A rejects or preserves failure for:

- source-result mismatch;
- projection/grounding/display identity tampering;
- Character bundle hash tampering;
- self-consistent bundle not matching admitted source;
- duplicate source unit/display bindings;
- observationRef drift;
- capability drift;
- displayFactRef drift;
- unknown realization policy;
- prohibited inference removal;
- unavailable capability promotion;
- personality/fate semantic widening;
- privacy payload injection;
- Character metadata injection;
- Commerce metadata injection;
- Character attempts to unblock a blocked source.

## Explicit non-scope

005A does not add:

- named Character profiles;
- Character Perspective;
- insight selector;
- Character reading plan;
- Character renderer;
- semantic paraphrase via LLM;
- relationship modulation;
- conversation state;
- follow-up question orchestration;
- council/multi-character behavior;
- traditional Face authority;
- new CI workflows.

Those are downstream slices after source-owned Character handoff admission is green.
