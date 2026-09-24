# FRB002 — FR285 Mouth Capability Handshake

Status: implementation

Watchtower-Track: face-bridge

## Purpose

FRB002 extends the bridge layer from the FR284 eye-only canonical payload to the merged FR285 eye+mouth payload.

It does not create traditional mouth semantics. It only makes the engine-side mouth observations visible to the bridge runtime while preserving the existing FR81/FR83 prohibition against unreviewed traditional binding.

## Upstream baseline

Merged engine baseline:

- FR284: canonical RGB eye morphology
- FR285: canonical RGB mouth morphology

Merged traditional-research baseline:

- T1 corpus / lineage landscape
- T2 Three-Divisions concept registry

The T2 merge advances traditional source/concept authority but does not yet authorize any mouth metric-to-traditional mapping used by FRB002.

## FR285 mouth capability state

The bridge receives six FR285 mouth columns.

Materialized observations:

- `mouth.width_and_relative_size`
- `mouth.corner_orientation`
- `mouth.outline_angularity`

Not materialized:

- `mouth.visible_lip_fullness`
- `mouth.philtrum_length_width`
- `mouth.visible_lip_color`

`mouth.corner_orientation` is an implemented observation that may still be unavailable for a particular capture/source. FRB002 therefore distinguishes:

```text
extractor not implemented
  -> not_materialized / not_evaluated

extractor implemented, this observation unavailable
  -> materialized / unavailable
```

## Complete capability handshake

`buildFR285RuntimeCapabilitiesFRB002` emits the complete 29-feature FR282 vocabulary using the FR285 product-column map.

It preserves:

- materialization state;
- per-observation availability;
- quality evidence refs;
- unsupported product-input boundaries.

It does not emit classification or traditional meaning.

## Traditional mouth binding gate

FRB002 re-checks the existing FR81 and FR83 decisions every time the mouth binding gate audit is created.

Required invariants:

```text
traditional metric bindings = 0
threshold refs = 0
criterion states = 0
claims = 0
```

The relevant candidate relationships remain:

```text
mouth.width_and_relative_size
  -> candidate target: criterion.intake.square_broad (方大)
  -> binding: NOT ADMITTED

mouth.corner_orientation
  -> candidate target: criterion.intake.corners_arched (角弓)
  -> binding: NOT ADMITTED

mouth.outline_angularity
  -> no reviewed traditional target

mouth.visible_lip_fullness
  -> candidate target: criterion.intake.lips_substantial (端厚)
  -> extractor not materialized
  -> binding: NOT ADMITTED

mouth.visible_lip_color
  -> candidate target: criterion.intake.red_lip_color (唇紅)
  -> extractor not materialized
  -> binding: NOT ADMITTED
```

FRB002 treats these as routing/authority facts only.

## Prohibited shortcuts

FRB002 must not infer:

- FR80 aspect ratio -> 方;
- FR82 relative size -> 大;
- FR80 + FR82 -> 方大;
- FR212 mouth corner orientation -> 角弓;
- any numeric threshold for 方大 / 角弓 / 端厚 / 唇紅;
- any traditional claim from a neutral mouth value.

Those transitions require explicit traditional-methodology authority and an admitted bridge binding.

## Ownership

### face-observation-engine

Owns:

- canonical feature extraction;
- geometry/image-model implementation;
- capture-level availability;
- quality context.

### face-traditional-research

Owns:

- traditional source witnesses;
- concept senses;
- methodology rules;
- whether an observation is a valid traditional operationalization.

### face-bridge

Owns:

- explicit observation <-> methodology mapping;
- binding readiness;
- deterministic gap routing;
- rule execution only after both authorities exist.

## Next bridge trigger

The next actual interpretation vertical slice starts only when traditional research provides an admitted, source-governed operationalization for an engine observation.

Until then, new engine clusters may be added to the bridge capability handshake without issuing traditional claims.

Watchtower-Track: face-bridge
