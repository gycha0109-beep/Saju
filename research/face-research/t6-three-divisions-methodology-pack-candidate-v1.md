# T6 — Three-Divisions Methodology Pack Candidate v1

> Status: research candidate assembled; fail-closed  
> Watchtower-Track: face-research  
> Baseline main: 0abaa9b7496fa559df76d1d53f44399e6e6a0f0a  
> Issue: #1487

## 1. Purpose

T6 assembles the source-ready Three-Divisions research slice into one pinned candidate package.

The key word is **candidate**.

The repository already has a general `FaceMethodologyPackDefinition`, but that contract assumes concrete region-map, metric, operationalization, claim, rule, and comparison-policy registry references. This successor Three-Divisions slice does not yet possess those executable artifacts.

T6 therefore does not fabricate placeholder production registries and does not silently inherit the legacy `research-pack-v0` implementations. It creates a fail-closed candidate manifest that makes every ready and blocked slot explicit.

## 2. Pinned source witness set

Candidate witness set:

`witness-set.face.three_divisions.t6_candidate@0.1.0`

Admitted witnesses:

1. `witness.mayi_xiangfa.nlc_1925_v1`
2. `witness.shenyi_fu.gujin_636_transmission`

Admitted passages:

1. `passage.mayi.fr261.contiguous_three_divisions`
2. `passage.mayi.fr261.three_fus_three_governors`
3. `passage.shenyi_fu.gujin_636.noncontiguous_three_divisions`

This is intentionally narrower than the historical research registry.

The Harvard 萬曆 神異賦 witness is not admitted because its target passage is not yet pinned. 神相全編, 柳莊相法, 太清神鑑, and 人倫大統賦 are also not admitted into this T6 slice where the relevant target page remains unresolved.

## 3. Pinned methodology identities

T6 pins exactly three T4 methodology identities:

| Methodology | Status |
|---|---|
| `method.mayi.face_three_divisions.fr261@0.2.0` | pinned |
| `method.mayi.three_fus_three_governors.fr261@0.1.0` | pinned |
| `method.shenyi_fu.gujin_636.face_three_divisions@0.1.0` | pinned |

No identity is collapsed into another.

In particular:

```text
Mayi 三府 geometry
        ==
Shenyi Fu Gujin 三停 geometry

does NOT imply

Mayi 三府 methodology
        ==
Shenyi Fu Gujin 三停 methodology
```

## 4. Pinned T5 specification layer

T6 includes all nine T5 abstract span specifications.

### Mayi contiguous 三停

- `t5.span.mayi_santing.upper`
- `t5.span.mayi_santing.middle`
- `t5.span.mayi_santing.lower`

### Mayi 三府 / 三主

- `t5.span.mayi_sanfu.upper`
- `t5.span.mayi_sanfu.middle`
- `t5.span.mayi_sanfu.lower`

### Shenyi Fu Gujin transmission 三停

- `t5.span.shenyi_gujin_santing.upper`
- `t5.span.shenyi_gujin_santing.middle`
- `t5.span.shenyi_gujin_santing.lower`

It also pins the three T5 comparison specifications.

The T5 layer is still a **research specification**, not an executable metric registry.

## 5. Pack slot state

| Pack slot | T6 state | Reason |
|---|---|---|
| source witness set | pinned | T3 source-ready slice |
| methodology definitions | pinned | T4 reconstruction complete |
| region maps | blocked | governed anchor binding absent |
| metric registry | research spec only | abstract vertical extents only |
| operationalization registry | research spec only | no executable bands |
| claim type registry | blocked | successor claim mapping not authorized |
| rule registry | blocked | no executable rule authorized |
| comparison policy | blocked | legacy policy not auto-inherited |

This is the central T6 result.

A complete-looking `FaceMethodologyPackDefinition` would currently overstate readiness. The candidate manifest records the gap instead.

## 6. Why legacy v0 artifacts are not auto-promoted

The old research pack contains useful historical work, including normalized-distance formulas, region maps, and relative-order classifications.

But T2–T5 changed the authority model:

- concepts are lineage-qualified;
- FR261 supersedes the old coarse Mayi passage use;
- Gujin 神異賦 is transmission-qualified;
- observation anchors must be governed;
- `平等` has no source-authorized numeric tolerance;
- same geometry is not semantic identity.

Therefore T6 does not reuse legacy executable artifacts merely because they are convenient.

They may later be reconsidered as implementation candidates only through explicit binding/adjudication.

## 7. Production state

T6 explicitly sets:

```text
governedObservationBindingsReady = false
executableRegionMapsReady = false
executableMetricRegistryReady = false
executableOperationalizationRegistryReady = false
claimTypeRegistryReady = false
ruleRegistryReady = false
numericBalanceToleranceAuthorized = false
universalAgeMapAuthorized = false
crossLineageMergeAuthorized = false
productionAuthorization = false
```

No Production tier is enabled.

## 8. T7 Binding Handoff candidate

T6 now makes the T7 dependency concrete.

Required traditional observation semantics:

- 髮際
- 眉
- 印堂
- 山根
- 準頭
- 人中
- 地閣

The handoff targets two tracks:

1. `face-observation-engine`
   - owns neutral, governed observable references;
2. `face-reading-binding`
   - owns explicit mapping from those neutral observations to each traditional methodology.

### Required binding behavior

A valid binding must:

- preserve the traditional anchor label;
- identify the neutral observation primitive used;
- name the exact methodology it satisfies;
- fail closed when the anchor is unavailable;
- preserve the separate topology and identity of each methodology.

### Forbidden shortcuts

The handoff forbids:

- Photo → VLM → traditional interpretation;
- silent reuse of legacy region maps;
- silent reuse of legacy strict relative-order bands;
- merging Mayi 三府 and Shenyi Fu 三停 because endpoints match;
- replacing missing traditional anchors with unrelated shape metrics.

## 9. T6 verdict

The Three-Divisions research slice now has a coherent candidate package from source witness through methodology-side operationalization specification.

What is complete:

```text
source witness
→ source passage
→ methodology identity
→ abstract span specification
→ explicit binding prerequisites
```

What is intentionally incomplete:

```text
governed observation binding
→ executable metric
→ executable operationalization
→ claim/rule
→ Production
```

Therefore the next phase is T7 Binding Handoff, not Production promotion.
