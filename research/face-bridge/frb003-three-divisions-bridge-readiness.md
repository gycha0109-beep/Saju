# FRB003 — Three-Divisions Bridge Readiness Audit

Status: implementation

Watchtower-Track: face-bridge

## Purpose

FRB003 is the first bridge task that starts from a traditional-research concept and asks whether the current observation engine can actually satisfy it.

It does not create a new Three-Divisions interpretation. It consumes the merged T2 source-qualified concept distinctions and the current FR286 product capability surface, then routes every blocker to its owning track.

## Inputs

Traditional baseline:

- `research/face-traditional-research/t2-concept-registry-three-divisions-v1.md`
- FR261 Mayi source-context adjudication
- FR263 Shenyi Fu transmission witness

Observation / geometry baseline:

- FR259 Three-Divisions neutral-reference reuse audit
- FR262 Mayi contiguous four-anchor requirements
- FR264 successor coordinate-frame adjudication
- FR286 product-column map

T3 source-witness extraction is currently separate work. FRB003 does not consume unmerged T3 authority.

## Source-qualified concepts kept separate

FRB003 audits four concept senses:

| Concept | Required anchors | Shape |
|---|---|---|
| `trad.face.mayi_1925.santing.contiguous` | 髮際 / 眉 / 準頭 / 地閣 | contiguous |
| `trad.face.shenxiang_gujin.santing.contiguous` | 髮際 / 眉 / 準頭 / 地閣 | contiguous |
| `trad.face.shenyi_fu_gujin.santing.noncontiguous` | 髮際 / 印堂 / 山根 / 準頭 / 人中 / 地閣 | non-contiguous |
| `trad.face.liuzhuang.santing.candidate` | 髮際 / 山根 / 準頭 / 人中 / 地閣 | segmented / non-contiguous |

The first two have the same required anchor set, but FRB003 does not merge their semantic identity or source authority.

Core invariant:

```text
geometry equality != semantic identity
```

## Current observation readiness

### 髮際 / hairline

Current product vocabulary contains:

`forehead.visible_hairline_boundary`

but FR286 still reports its implementation state as:

`extractor_required`

Therefore the bridge may name this as a candidate product observation, but it is not materialized.

### 眉 / brow

`eyebrow.span_arch_tail_orientation` is useful eyebrow morphology but is not a governed vertical brow reference.

FR259 already keeps the brow vertical-reference dependency blocked.

FRB003 therefore rejects it as a Three-Divisions anchor proxy.

### 印堂 / Yintang

No acceptable canonical interbrow/Yintang vertical reference currently exists.

### 山根 / Shangen

`nose.bridge_centerline_deviation` is a nose-shape metric.

It is not a governed Shangen vertical coordinate.

FRB003 rejects that substitution.

### 準頭 / Zhuntou

`nose.tip_contour_circularity` describes visible tip shape.

It is not a governed nose-tip vertical reference.

FRB003 rejects that substitution.

### 人中 / Renzhong

`mouth.philtrum_length_width` is not a Renzhong vertical anchor and is not materialized in FR286.

FRB003 rejects that substitution.

### 地閣 / Dige

FR286 now materializes:

`chin_lower_face.visible_contour`

This is useful progress, but FR259 already established that the governed visible soft-tissue lower-face contour is not automatically anatomical chin and is not traditional Dige.

Therefore FRB003 records:

`bounded_candidate_not_equivalent`

rather than silently upgrading the contour into a Dige anchor.

## Coordinate-frame boundary

FR264 currently states:

`research_successor_coordinate_frame_selected_projection_and_anchor_execution_blocked`

FRB003 preserves that state.

It does not issue a new projection, mix old normalized-image coordinates with canonical metric XY, or create an anchor derivation.

## Methodology / metric readiness

### Mayi contiguous

The repository contains a research methodology definition:

`method.mayi.face_three_divisions@0.1.0`

but no executable metric/operationalization registry for that methodology.

Result:

`metric_contract_missing`

Owner:

`face-traditional-research`

The bridge does not invent the missing methodology-side metric contract.

### Shenxiang contiguous

The repository already contains research Three-Divisions metrics and an operationalization for:

`method.shenxiang.face_three_divisions@0.1.0`

but no canonical observation binding has been admitted.

Result:

`research_metric_contract_present_unbound`

Bridge gap:

`metric_binding_missing`

Owner:

`face-bridge`

This remains blocked because the required anchor observations are not currently executable and the direct source-witness status is not yet sufficient for promotion.

### Shenyi Fu non-contiguous

FR263 pins the Gujin compilation transmission page, but it explicitly leaves the earlier/independent primary-lineage witness unresolved.

No runtime methodology is registered for this source-qualified concept.

Result:

- `primary_lineage_witness_gap`
- `runtime_methodology_missing`

Owner:

`face-traditional-research`

### Liuzhuang candidate

The repository has a research methodology definition, but T2 still treats the source as a candidate pending direct scan-check.

No executable metric/operationalization contract is registered.

Result:

- `direct_source_witness_gap`
- `metric_contract_missing`

Owner:

`face-traditional-research`

## Handoff model

FRB003 routes observation blockers to:

`face-observation-engine`

Examples:

- materialize visible hairline boundary;
- establish governed product-neutral vertical references for required anchors;
- do not use shape metrics as anchor proxies.

FRB003 routes source/methodology blockers to:

`face-traditional-research`

Examples:

- direct source witness not admitted;
- primary lineage witness unresolved;
- runtime methodology / metric contract missing.

FRB003 routes an already-defined methodology metric whose observation binding is missing to:

`face-bridge`

Example:

- Shenxiang Three-Divisions research metrics exist, but canonical binding is not admitted.

## Explicitly prohibited

FRB003 does not:

- assign MediaPipe landmark IDs;
- create a universal 三停 formula;
- collapse 三停 / 三才 / 三主;
- select a source lineage because it fits available engine geometry;
- define a percentage tolerance for 平等;
- create camera calibration or correction;
- issue a traditional outcome;
- execute a Three-Divisions rule;
- emit a `FaceClaim`;
- activate Production.

## Current verdict

All four audited concepts remain bridge-blocked.

That is a useful result: the blocker is now explicit rather than hidden inside a generic "research needed" state.

The current critical path is:

```text
traditional source-qualified requirement
        +
governed canonical anchor observations
        ↓
explicit face-bridge metric binding
        ↓
existing/source-governed operationalization
        ↓
structured claim
```

Until both sides exist, the bridge fails closed.

Watchtower-Track: face-bridge
