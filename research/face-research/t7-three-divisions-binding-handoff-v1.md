# T7 — Three-Divisions Binding Handoff v1

> Status: traditional research closeout / downstream binding blocked  
> Watchtower-Track: face-research  
> Baseline main: `0345c4263e333cf55ede41b89ffd5e397095f4f5`  
> Issue: #1506

## 1. Purpose

T7 closes the current traditional Three-Divisions research slice at the correct boundary.

T3–T6 established:

```text
scan-qualified source witness
→ source-qualified concept
→ reconstructed methodology
→ abstract operationalization requirement
→ fail-closed methodology-pack candidate
```

T7 does **not** turn that package into an RGB implementation.

Instead, it freezes exactly what the observation and binding tracks must provide before any Three-Divisions methodology can become executable.

## 2. T6 baseline

The handoff starts from:

`pack.face.three_divisions.t6_candidate@0.1.0`

T6 already pins three methodology identities:

1. `method.mayi.face_three_divisions.fr261@0.2.0`
2. `method.mayi.three_fus_three_governors.fr261@0.1.0`
3. `method.shenyi_fu.gujin_636.face_three_divisions@0.1.0`

They remain separate.

```text
same endpoints
!=
same traditional concept
!=
same source authority
!=
same binding identity
```

## 3. Observation-engine delta since FRB003

The observation engine has materially advanced since FRB003.

| Engine work | What improved | Traditional-anchor result |
|---|---|---|
| FR287 | canonical neutral nose bridge/tip morphology | 山根 / 準頭 still unbound |
| FR289 | visible lower-face dimensions | 地閣 still unbound |
| FR291 | visible central-groove / philtrum neutral axes | 人中 still unbound |
| FR292 | visible eyebrow-pair geometry | 眉 still unbound |

This is not a contradiction.

The new artifacts improve neutral observable morphology, while the Three-Divisions methodology requires **governed vertical references with explicit binding semantics**.

T7 therefore records:

`observation_capability_improved_but_no_traditional_anchor_binding_admitted`

## 4. Anchor readiness matrix

| Traditional anchor | Current neutral candidate | T7 status | Reason |
|---|---|---|---|
| 髮際 | `forehead.visible_hairline_boundary` vocabulary | blocked | materialized governed extractor/reference still missing |
| 眉 | FR292 visible eyebrow-pair geometry | blocked | span/arch/tail geometry is not a governed vertical 眉 reference |
| 印堂 | none admitted | blocked | canonical interbrow vertical reference absent |
| 山根 | FR287 nose bridge morphology | blocked | centerline deviation is shape, not 山根 position |
| 準頭 | FR287 tip contour morphology | blocked | circularity is shape, not 準頭 position |
| 人中 | FR291 central-groove geometry | blocked | length/width geometry is not a governed 人中 vertical anchor |
| 地閣 | FR216/FR289 lower-face geometry | blocked | visible inferior contour is not automatically traditional 地閣 |

**Newly admitted traditional anchors in T7: 0.**

This is the intended fail-closed result.

## 5. Methodology-specific acceptance

### 5.1 Mayi FR261 contiguous 三停

Required chain:

```text
髮際 → 眉 → 準頭 → 地閣
```

All four must have governed observation bindings before the methodology is executable.

Partial execution is not admitted.

### 5.2 Mayi 三府 / 三主

Required spans:

```text
髮際 → 印堂
山根 → 準頭
人中 → 地閣
```

All six endpoint semantics must be bound.

### 5.3 Shenyi Fu Gujin transmission 三停

Required spans are geometrically the same six-endpoint pattern:

```text
髮際 → 印堂
山根 → 準頭
人中 → 地閣
```

But the binding identity remains separate from Mayi 三府 / 三主.

The bridge must not implement one shared “six endpoint traditional concept” and alias both methodologies to it.

## 6. What face-observation-engine must deliver

The observation engine owns neutral observation authority.

For every required anchor surface it must provide, where applicable:

- a governed vertical-reference semantic;
- explicit coordinate-frame identity;
- visibility/admission semantics;
- fail-closed unavailable behavior;
- observation provenance;
- no provider-index leakage into the traditional layer;
- no traditional interpretation.

T7 does not prescribe MediaPipe indices, pixel formulas, or camera correction.

## 7. What face-reading-binding must deliver

The binding track owns the semantic bridge.

Each binding record must state:

1. neutral observation reference;
2. traditional anchor reference;
3. exact `methodologyRef`;
4. provenance;
5. review state;
6. unavailable/fail-closed behavior.

A binding that happens to use the same neutral geometry for two lineages still needs separate methodology-scoped binding identities.

## 8. Candidate-specific adjudication

### FR292 → 眉

FR292 is useful because it now accepts governed visible eyebrow curves.

However FR292 explicitly does not issue anatomical eyebrow boundary authority or traditional binding.

Therefore T7 does not select a point, average Y, arch apex, medial endpoint, or any other derived value as “眉”.

That selection belongs to observation/binding adjudication.

### FR291 → 人中

FR291 materially closes the visible central-groove geometry gap.

But its continuous length/width axes intentionally avoid named anatomical landmarks.

T7 therefore does not relabel either axis endpoint as 人中.

### FR289 → 地閣

FR289 can identify an inferior visible-envelope level/center candidate as neutral geometry.

It explicitly does not issue Menton/Gnathion, anatomical chin boundary, or traditional meaning.

Therefore the candidate remains useful but non-equivalent.

### FR287 → 山根 / 準頭

Bridge centerline deviation and tip contour circularity remain morphology metrics.

Neither defines the vertical location required by the traditional methodology.

## 9. Explicitly prohibited downstream shortcuts

The handoff rejects:

- shape metric → vertical anchor substitution;
- provider landmark index → traditional anchor by naming convention;
- same geometry → same traditional concept;
- legacy research-v0 region map auto-promotion;
- legacy strict relative-order bands auto-promotion;
- invented percentage tolerance for `平等`;
- universal age map derived from Three-Divisions spans;
- `FaceClaim` emission before reviewed binding;
- Production activation from this research closeout.

## 10. Research closeout

The current traditional research slice is complete **for the admitted T3–T6 evidence set**.

That does not mean the feature is executable.

Final state:

```text
face-research
  source research            COMPLETE
  concept separation         COMPLETE
  methodology reconstruction COMPLETE
  abstract operationalization COMPLETE
  pack candidate             COMPLETE
  binding handoff            COMPLETE

face-observation-engine
  required vertical refs     BLOCKED / PARTIAL CANDIDATES

face-reading-binding
  methodology bindings       BLOCKED

Production
  Three-Divisions reading    NOT AUTHORIZED
```

The next work belongs to `face-observation-engine` and `face-reading-binding`, not to further invention inside `face-research`.

The research track should reopen only when a concrete source-authority question, lineage adjudication, or methodology ambiguity is returned from those downstream tracks.
