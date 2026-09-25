# FRB004 — T4 Methodology × Complete Canonical Schema Bridge

Status: implementation

Watchtower-Track: face-bridge

## Purpose

FRB004 upgrades the bridge from FRB003's concept-level blocker audit to a requirement-level contract.

The traditional side now supplies reconstructed T4 methodologies and explicit observation requirements. The observation side has also advanced beyond the original FR288 complete-schema milestone through FR293.

FRB004 therefore asks, for every T4 requirement:

> Which canonical observation can satisfy this requirement now, which nearby features are only morphology proxies, and who owns the remaining blocker?

It does not execute the traditional methodology.

## Baselines

Traditional:

- T3 source witnesses
- T4 reconstructed methodologies and observation requirements
- T5 binding prerequisites only as a fail-closed guard

Observation:

- FR288 established complete representation of all 29 FR282 feature keys
- FR289–FR293 subsequently materialized additional neutral morphology
- FRB004 consumes the latest FR293 product-column map while preserving the complete-schema invariant

Current complete-schema invariant:

```text
FR282 feature universe              29
represented                         29
structurally missing                 0
pending feature keys                 0
```

The latest materialization progress does not grant traditional semantic authority.

## Reconstructed methodologies

FRB004 consumes exactly three T4 methodology identities:

```text
method.mayi.face_three_divisions.fr261@0.2.0
method.mayi.three_fus_three_governors.fr261@0.1.0
method.shenyi_fu.gujin_636.face_three_divisions@0.1.0
```

Mayi 三府/三主 and the Gujin 神異賦 三停 transmission share the same six anchor set, but they remain separate methodology identities.

```text
same geometry != same methodology
same geometry != same semantic identity
```

## Requirement-level bridge

T4 currently publishes 16 observation requirements over seven semantic anchors:

- 髮際 — `trad.anchor.hairline`
- 眉 — `trad.anchor.brow`
- 印堂 — `trad.anchor.yintang`
- 山根 — `trad.anchor.shangen`
- 準頭 — `trad.anchor.zhuntou`
- 人中 — `trad.anchor.renzhong`
- 地閣 — `trad.anchor.dige`

FRB004 creates one bridge binding record for every T4 requirement. It does not infer bindings by feature-name similarity.

## Current anchor disposition

### 髮際

Canonical candidate:

`forehead.visible_hairline_boundary`

The complete schema represents this feature, but a governed vertical-reference implementation is still unavailable.

Disposition:

`blocked_engine_observation`

Owner:

`face-observation-engine`

### 眉

Materialized related morphology:

`eyebrow.span_arch_tail_orientation`

FR292 materialized visible eyebrow pair geometry, but span/arch/tail morphology is not the governed vertical brow reference required by T4/T5.

Disposition:

`candidate_not_equivalent`

Rejected proxy:

`eyebrow.span_arch_tail_orientation`

### 印堂

No semantically admissible canonical vertical reference exists.

Disposition:

`no_semantically_admissible_feature`

FRB004 does not choose a generic interbrow midpoint or provider landmark.

### 山根

Materialized related morphology:

`nose.bridge_centerline_deviation`

This is a neutral nose-shape measurement, not a governed Shangen vertical reference.

Disposition:

`candidate_not_equivalent`

### 準頭

Materialized related morphology:

`nose.tip_contour_circularity`

Tip contour shape is not a governed Zhuntou vertical reference.

Disposition:

`candidate_not_equivalent`

### 人中

FR291 now materializes:

`mouth.philtrum_length_width`

This is meaningful engine progress, but visible philtrum morphology is not automatically the Renzhong boundary coordinate required by the traditional span contract.

Disposition:

`candidate_not_equivalent`

### 地閣

Materialized related morphology:

`chin_lower_face.visible_contour`

The governed visible soft-tissue contour remains distinct from traditional Dige identity and from a Dige vertical reference.

Disposition:

`candidate_not_equivalent`

## Why FR289–FR293 matter

Several features that were unavailable at FRB003 time are now materialized.

That is deliberately treated as a regression test opportunity:

```text
materialized neutral morphology
        !=
automatic traditional anchor
```

FRB004 fails if these materialized features are silently promoted:

- eyebrow morphology -> 眉 anchor
- bridge-centerline deviation -> 山根 anchor
- tip circularity -> 準頭 anchor
- philtrum length/width -> 人中 anchor
- visible lower-face contour -> 地閣 anchor

## T5 relationship

T5 merged before FRB004 implementation completed.

FRB004 does not absorb FRB005 scope.

It consumes only T5's seven binding prerequisites as a consistency guard:

```text
required capability = governed_vertical_reference
status              = blocked
owner               = face-observation-engine
binding owner       = face-reading-binding
```

It also asserts that T5 still authorizes none of the following:

- concrete coordinate frame
- executable metric formula
- numeric 平等 tolerance
- near-equal band
- cross-lineage metric identity

No T5 span or comparison is executed in FRB004.

## Blocked source gates

The T4 source gates remain separate from reconstructed methodologies:

- Shenxiang NLC 1925
- Liuzhuang NLC 1925
- Taiqing NLC 1925
- Renlun/Siku

Each remains:

`blocked_before_methodology_reconstruction`

Owner:

`face-traditional-research`

FRB004 forbids borrowing Mayi or Shenyi methodology merely because a blocked source appears geometrically similar.

## Routing

Observation capability absent or semantically insufficient:

`face-observation-engine`

Source/methodology reconstruction blocked:

`face-traditional-research`

Once a governed vertical observation exists and the traditional requirement remains admitted:

`face-bridge`

The bridge is the next binding owner, not the extractor owner.

## Authority boundary

FRB004 issues none of the following:

- provider landmark IDs
- coordinate formulas
- numeric thresholds
- 平等 tolerance
- traditional outcomes
- T5 span execution
- T5 comparison execution
- rule execution
- FaceClaim
- Production activation

All three reconstructed methodologies therefore remain non-executable at the bridge boundary.

## Next step

The engine now has a precise observation backlog:

```text
governed vertical reference:
  髮際
  眉
  印堂
  山根
  準頭
  人中
  地閣
```

When those observations become available, the bridge can admit explicit observation bindings.

Because T5 is now merged, the next bridge phase can then consume the T5 span specifications without inventing formula, tolerance, or cross-lineage identity.

That next phase is FRB005.

Watchtower-Track: face-bridge