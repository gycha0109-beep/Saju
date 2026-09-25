# FRB005 — T7 Methodology-Scoped Binding Ledger

Status: implementation

Watchtower-Track: face-bridge

## Purpose

FRB004 answered:

> For each reconstructed traditional observation requirement, what does the current canonical engine actually provide?

T7 then closed the current traditional-research slice and handed downstream ownership to the observation and binding tracks.

FRB005 consumes both artifacts and publishes the binding-side ledger that T7 asks for.

It does **not** claim that any traditional anchor is already bound.

## Inputs

Bridge baseline:

- FRB004 T4 requirement × canonical observation audit

Traditional handoff:

- T7 baseline pack
- seven T7 anchor handoffs
- three T7 methodology acceptance contracts
- T7 downstream acceptance gates

Current T7 verdict:

`observation_capability_improved_but_no_traditional_anchor_binding_admitted`

FRB005 preserves that verdict.

## Why a binding ledger is useful before bindings exist

T7 requires every eventual binding to carry:

1. neutral observation reference;
2. traditional anchor reference;
3. exact methodologyRef;
4. provenance;
5. review state;
6. unavailable/fail-closed behavior.

The observation engine has not yet issued the governed vertical references needed to fill item 1.

FRB005 therefore creates the stable methodology-scoped binding **slots now**, with:

`neutralObservationRef = null`

and:

`reviewState = blocked_pending_governed_vertical_reference`

This makes the missing authority explicit rather than inventing a neutral reference.

## Ledger cardinality

T4 has 16 methodology-specific observation requirements.

FRB005 therefore creates:

```text
binding slots                    16
unique traditional anchors        7
methodology identities             3
admitted traditional bindings      0
```

Every slot identity includes both the exact methodology and requirement identity.

The two six-endpoint methodologies therefore receive separate binding-slot identities even though their required endpoint sets are equal.

## Methodology isolation

### Mayi contiguous 三停

Required:

```text
髮際 → 眉 → 準頭 → 地閣
```

Four binding slots.

### Mayi 三府 / 三主

Required:

```text
髮際 → 印堂
山根 → 準頭
人中 → 地閣
```

Six binding slots.

### Shenyi Fu Gujin transmission 三停

Required:

```text
髮際 → 印堂
山根 → 準頭
人中 → 地閣
```

Six separate binding slots.

The last two methodologies do not share binding identity.

```text
same endpoint geometry
!=
same methodology
!=
same binding record
```

## FRB004 proxy rejection is inherited

FRB005 carries forward the explicit rejected-proxy ledger.

The following materialized neutral morphology remains unusable as the required vertical anchor:

- `eyebrow.span_arch_tail_orientation` -> 眉
- `nose.bridge_centerline_deviation` -> 山根
- `nose.tip_contour_circularity` -> 準頭
- `mouth.philtrum_length_width` -> 人中
- `chin_lower_face.visible_contour` -> 地閣

The bridge does not discard these features. It preserves them as evidence of nearby neutral capability while refusing semantic promotion.

## Ownership

T7 uses the historical architecture label:

`face-reading-binding`

for the semantic binding owner.

The current operational Watchtower track is:

`face-bridge`

FRB005 preserves both facts explicitly:

```text
observation implementation owner = face-observation-engine
upstream binding owner label      = face-reading-binding
operational bridge track          = face-bridge
```

No observation extractor is implemented in FRB005.

## Promotion condition

A blocked slot can only be reconsidered after the observation engine provides the governed neutral vertical-reference contract requested by T7.

The future review must then establish:

- the neutral observation reference;
- exact methodology scope;
- provenance;
- visibility/unavailable semantics;
- explicit traditional binding review.

Until then the slot remains null and fail-closed.

## T5 boundary

FRB005 does not execute:

- T5 span specifications;
- T5 qualitative comparison specifications;
- coordinate formulas;
- 平等 tolerance;
- near-equal bands.

The existence of a stable binding slot is not an operationalized metric.

The first operationalization bridge can begin only after governed anchor bindings are actually admitted.

## Authority boundary

FRB005 issues none of the following:

- observation extractor implementation;
- provider landmark IDs;
- invented neutral observation references;
- admitted traditional anchor bindings;
- T5 span execution;
- T5 comparison execution;
- coordinate formulas;
- numeric tolerance;
- rule execution;
- FaceClaim;
- Production activation.

## Result

The bridge now has a deterministic destination for every current T7 requirement.

The current state is:

```text
T7 traditional handoff
        ↓
FRB004 capability adjudication
        ↓
FRB005 methodology-scoped binding slots
        ↓
16 / 16 slots present
0 / 16 admitted
        ↓
WAIT FOR GOVERNED VERTICAL REFERENCES
        ↓
face-observation-engine
```

This is the correct stopping point for the bridge until the observation engine returns new vertical-reference authority.

Watchtower-Track: face-bridge