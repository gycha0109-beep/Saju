# T5 — Three-Divisions Operationalization Specification v1

> Status: methodology-side specification complete; executable binding blocked  
> Watchtower-Track: face-research  
> Baseline main: a17253533bd67cf377635903ce782464129250d1  
> Issue: #1468

## 1. Purpose

T4 reconstructed what each admitted traditional methodology means. T5 now specifies **what would have to be measured or compared** for those methodologies to become operationalizable.

T5 deliberately stops before choosing how a photograph supplies those measurements.

The boundary is:

```text
traditional source meaning
        ↓
T4 methodology identity
        ↓
T5 abstract measurement/comparison specification
        ↓
face-observation-engine + face-reading-binding
        ↓
executable metric
```

## 2. Why T5 does not reuse the old v0 metrics

The historical `research-pack-v0.ts` contains Shenxiang Three-Divisions region maps, normalized-distance formulas, and a strict relative-order operationalization.

Those artifacts remain useful research history, but they predate the current T2→T4 authority reconstruction.

T5 therefore does **not** silently copy their coordinate frame, formulas, or classification bands into the successor methodologies.

This is required because:

1. source authority and observation implementation are separate;
2. the current observation engine does not yet expose all governed traditional anchors;
3. geometry equality does not establish semantic identity;
4. `平等` does not itself specify a numeric tolerance.

## 3. Mayi FR261 contiguous 三停

Methodology:

`method.mayi.face_three_divisions.fr261@0.2.0`

Abstract span specifications:

| T5 spec | Traditional span | Topology |
|---|---|---|
| `t5.span.mayi_santing.upper` | 髮際 → 眉 | contiguous |
| `t5.span.mayi_santing.middle` | 眉 → 準頭 | contiguous |
| `t5.span.mayi_santing.lower` | 準頭 → 地閣 | contiguous |

The only authorized measurement intent is:

`comparable_vertical_extent`

That phrase is intentionally abstract. T5 does not define:

- normalized face height;
- pixel distance;
- Euclidean distance;
- landmark IDs;
- camera correction;
- perspective projection.

The current T5 slice also does not promote a successor numeric classification for Mayi. The admitted FR261 boundary passage establishes the three spans, not a numeric band system.

## 4. Mayi FR261 三府 / 三主

Methodology:

`method.mayi.three_fus_three_governors.fr261@0.1.0`

Abstract spans:

| T5 spec | Traditional span |
|---|---|
| `t5.span.mayi_sanfu.upper` | 髮際 → 印堂 / 初主 |
| `t5.span.mayi_sanfu.middle` | 山根 → 準頭 / 中主 |
| `t5.span.mayi_sanfu.lower` | 人中 → 地閣 / 末主 |

These are non-contiguous spans.

T5 permits their extents to be represented as methodology-side measurement requirements, but it does not authorize a balance or longest/shortest classifier because the admitted FR261 passage does not state such a rule.

The role labels 初主 / 中主 / 末主 are preserved as roles. They are not converted into numeric age intervals.

## 5. Shenyi Fu — Gujin transmission 三停

Methodology:

`method.shenyi_fu.gujin_636.face_three_divisions@0.1.0`

Abstract spans:

| T5 spec | Traditional span |
|---|---|
| `t5.span.shenyi_gujin_santing.upper` | 髮際 → 印堂 |
| `t5.span.shenyi_gujin_santing.middle` | 山根 → 準頭 |
| `t5.span.shenyi_gujin_santing.lower` | 人中 → 地閣 |

The passage also contains `三停平等`.

T5 therefore authorizes the **existence of a qualitative balance relation**, but nothing more precise.

The following remain false:

- `numericToleranceAuthorized`
- `nearEqualBandAuthorized`
- `exactEqualityIsTraditionalDefinition`

An executable classifier remains blocked until a later calibration/authority step can justify its semantics.

## 6. Same geometry, separate operationalization identity

Mayi 三府 and Shenyi Fu Gujin 三停 use the same six traditional endpoints and the same three span shapes.

T5 still assigns different specification IDs.

This is intentional:

```text
same endpoints
    !=
same source-qualified concept
    !=
same methodology identity
    !=
automatic metric identity
```

A future binding implementation may technically reuse a neutral observation primitive, but it must bind that primitive separately into each methodology. The traditional methodology IDs must not be collapsed.

## 7. Binding prerequisites

T5 converts the T4 anchor semantics into explicit prerequisites.

| Traditional anchor | Required capability | Current T5 state |
|---|---|---|
| 髮際 | governed vertical reference | blocked |
| 眉 | governed vertical reference | blocked |
| 印堂 | governed vertical reference | blocked |
| 山根 | governed vertical reference | blocked |
| 準頭 | governed vertical reference | blocked |
| 人中 | governed vertical reference | blocked |
| 地閣 | governed vertical reference | blocked |

The implementation owner is `face-observation-engine`.

The semantic binding owner is `face-reading-binding`.

T5 explicitly rejects convenient but semantically invalid substitutions, including:

- eyebrow shape metrics for 眉 vertical reference;
- bridge deviation for 山根;
- nose-tip circularity for 準頭;
- philtrum length/width for 人中;
- generic visible lower-face contour for 地閣.

## 8. Fail-closed state

T5 sets:

```text
concreteCoordinateFrameAuthorized = false
executableMetricFormulaAuthorized = false
numericBalanceToleranceAuthorized = false
nearEqualBandAuthorized = false
universalAgeMapAuthorized = false
crossLineageMetricIdentityAuthorized = false
faceClaimEmissionAuthorized = false
productionAuthorization = false
```

This means the specification can be consumed as a requirements contract without pretending the Three-Divisions reading is already executable.

## 9. T6 handoff

T6 is the **Methodology Pack Candidate** phase.

The candidate pack may now pin together:

1. T3 source passages;
2. T4 methodology identities;
3. T5 span specifications;
4. T5 binding prerequisites;
5. explicit authority gates.

The T6 candidate must still state that it lacks executable observation bindings.

It must not claim:

- RGB readiness;
- numeric 平等 thresholds;
- universal age mapping;
- cross-lineage semantic identity;
- Production readiness.

## 10. T5 verdict

The Three-Divisions slice now has a methodology-side operationalization contract without crossing into computer-vision implementation.

The remaining critical dependency is no longer vague “research needed”. It is explicit:

```text
governed traditional vertical references
        +
explicit binding into each source-qualified methodology
        ↓
executable metric candidate
```

Until those dependencies are satisfied, the system remains fail-closed.
