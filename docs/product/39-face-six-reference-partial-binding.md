# TOPIC-FACE-005L-B — Six-reference partial binding review

> Watchtower-Track: `topic-face`  
> Issue: #2356  
> Parent authority issue: #2343  
> Observation owner: #1521

## Goal

Rebase the Three-Divisions bridge on the current Face Observation main rather than the older FRB005 snapshot.

FRB005 remains the historical fail-closed baseline:

```text
16 methodology-scoped slots
7 unique traditional anchors
0 admitted bindings
```

Current Face Observation work has since established six product-neutral vertical-reference contracts. The only remaining neutral-reference capability is the real exact-capture hairline metric reference.

005L-B therefore reviews only the bindings that current source contracts can support. It does not activate Three-Divisions execution.

## Current neutral reference state

The six reviewed neutral references are:

| Traditional consumer | Neutral observation authority |
| --- | --- |
| 眉 | `neutral.face.visible_eyebrow_pair.arc_length_weighted_vertical_coordinate@0.1.0` |
| 印堂 | `neutral.face.visible_interbrow.medial_endpoint_midpoint_vertical_coordinate@0.1.0` |
| 山根 | `neutral.face.nasal_bridge_root.vertical_coordinate@0.1.0` |
| 準頭 | FR304 provider-independent neutral nasal-apex vertical reference |
| 人中 | `neutral.face.visible_central_groove.axis_midpoint_vertical_coordinate.canonical_metric_xy@0.1.0` |
| 地閣 | `neutral.face.visible_lower_face.inferior_vertical_coordinate@0.1.0` |

The binding uses the neutral observation contract as evidence. It does not change the observation contract into traditional semantics.

Runtime unavailability remains fail-closed.

## Hairline remains blocked

`髮際` is intentionally not admitted.

FR305 defines the neutral visible-hairline reference contract and FR318 defines the exact-capture local metric materialization receipt, but current main still states:

```text
realFR318HairlineMetricReferenceMaterialized = false
repositoryActualNeutralReferenceCapabilityCount = 6
repositoryRemainingNeutralReferenceCapabilityCount = 1
realExactCaptureSevenReferenceBundleAvailable = false
```

Therefore no face-oval, mesh-top, hidden completion, synthetic evidence or contract existence may substitute for a real admitted hairline reference.

## FRB006

`traditional-three-divisions-partial-binding-ledger-frb006.ts` derives from the immutable FRB005 slot identities.

Result:

```text
required slots = 16
admitted slots = 13
blocked slots = 3

admitted unique anchors = 6
blocked unique anchors = 1 (hairline)
```

Per methodology:

```text
Mayi contiguous Three-Divisions  3 / 4
Mayi Three-Fus/Three-Governors   5 / 6
Shenyi transmission              5 / 6
```

Every methodology remains `bindingReady=false` because each methodology requires the hairline anchor.

## Product authority receipt

The repository-derived Topic Face authority test adapter now exposes the six current vertical-reference capabilities in addition to the existing FR293 product columns.

The blocked Three-Divisions topic therefore moves from:

```text
7 required observation capabilities missing
0 / 16 bindings
```

to:

```text
1 required observation capability missing
13 / 16 bindings
```

The remaining observation blocker is exactly:

```text
face.vertical_reference.visible_hairline
```

The required semantic claim family remains absent:

```text
face.claim.three_divisions
```

and no Character publication decision exists.

## Authority boundary

005L-B authorizes only the explicit bridge mappings for the six governed neutral references.

It does not authorize:

- methodology review promotion;
- real hairline materialization;
- all-required binding readiness;
- Three-Divisions span subtraction or comparison;
- a 平等 threshold;
- semantic claim emission;
- protected narrative publication;
- Character publication;
- Production or Commerce activation.

The exact methodology review requested in #2343 remains a separate project-owner decision.

## Acceptance

005L-B is complete when:

1. FRB005 remains unchanged at 0/16 as historical baseline.
2. FRB006 deterministically admits 13/16 slots.
3. The three blocked slots are exactly the three hairline slots.
4. Six admitted anchors bind to exact governed neutral observation refs in canonical metric XY.
5. All three methodology statuses remain not ready.
6. Topic readiness reports only the hairline observation blocker plus incomplete binding group and missing semantic claim family.
7. Runtime remains blocked before Face Engine execution and returns no Character meaning.
8. Adding a Character publication decision alone cannot bypass the remaining authority gates.

## Next seam

The source-side critical path is now:

```text
real hairline evidence
→ FR318 exact-capture metric materialization
→ FR319 real seven-reference bundle
→ final three hairline bindings
→ methodology/claim/publication authority closure
→ actual governed source result
```

MyeongHa transport prewire and durable artifact persistence remain independently parallelizable and do not require inventing the missing source authority.
