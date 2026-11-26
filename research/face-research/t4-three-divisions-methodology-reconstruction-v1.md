# T4 — Three-Divisions Methodology Reconstruction v1

> Status: research reconstruction complete for the T3 source-ready slice  
> Watchtower-Track: face-research  
> Baseline main: 8be977e127c7d091b894fc1f767fc21f9a967184  
> Issue: #1466

## 1. Purpose

T3 answered which physical/digitized witnesses and exact passages are sufficiently pinned. T4 answers a different question:

> Given only the source-ready passages, what traditional methodology is actually stated, and what observations would that methodology require before any modern operationalization is attempted?

This phase does **not** choose landmarks, pixels, angles, camera corrections, thresholds, or Production claims.

## 2. Source-ready input

T4 admits only the T3 slice that is already scan-checked enough for reconstruction:

1. 麻衣相法 1925 NLC / FR261 successor — 三停
   - `passage.mayi.fr261.contiguous_three_divisions`
2. 麻衣相法 1925 NLC / FR261 successor — 三府 / 三主
   - `passage.mayi.fr261.three_fus_three_governors`
3. 古今圖書集成 第636卷 / 神異賦 transmission
   - `passage.shenyi_fu.gujin_636.noncontiguous_three_divisions`

神相全編, 柳莊相法, 太清神鑑, 人倫大統賦 remain blocked for this T4 reconstruction because T3 did not pin the relevant target scan page.

## 3. Successor methodology identities

### 3.1 麻衣 FR261 contiguous 三停

Successor methodology:

`method.mayi.face_three_divisions.fr261@0.2.0`

Reconstruction:

| Division | Source-qualified span |
|---|---|
| 上停 | 髮際 → 眉 |
| 中停 | 眉 → 準頭 |
| 下停 | 準頭 → 地閣 |

This supersedes the **authority use** of the coarse historical `method.mayi.face_three_divisions@0.1.0` for this source context. The old artifact is not deleted or rewritten because it remains part of research history.

The reconstruction requires four traditional anchor semantics:

- 髮際
- 眉
- 準頭
- 地閣

T4 does not define how a camera or model obtains any of them.

### 3.2 麻衣 FR261 三府 / 三主

Related methodology:

`method.mayi.three_fus_three_governors.fr261@0.1.0`

Reconstruction:

| 府 | Span | Role |
|---|---|---|
| 上府 | 髮際 → 印堂 | 初主 |
| 中府 | 山根 → 準頭 | 中主 |
| 下府 | 人中 → 地閣 | 末主 |

This is deliberately **not** normalized into the Mayi 三停 formula.

The source context places the systems near one another, but adjacency is not identity. T4 therefore keeps:

`三府 / 三主 != 三停`

unless a source-local statement explicitly establishes a narrower relation.

T4 also refuses to turn 初主/中主/末主 into numeric age intervals. That would require separate source authority.

### 3.3 神異賦 — Gujin transmission 三停

Methodology:

`method.shenyi_fu.gujin_636.face_three_divisions@0.1.0`

Reconstruction:

| Division | Source-qualified span |
|---|---|
| 上停 | 髮際 → 印堂 |
| 中停 | 山根 → 準頭 |
| 下停 | 人中 → 地閣 |

This is a **transmission-qualified** methodology. The Gujin page is scan-checked, but it does not establish the original or earliest 神異賦 text.

The Harvard 萬曆 witness exists, but T3 has not pinned the target passage there. Therefore this methodology cannot be relabeled as an original/independent Shenyi authority.

## 4. The important same-geometry conflict

The following two structures have the same three spans:

`麻衣 三府 / 三主`

and

`神異賦 Gujin transmission 三停`

But their labels and source-local functions differ.

Therefore T4 records the invariant:

`geometry equality != semantic identity`

This prevents the future binding layer from taking an available six-anchor geometry and silently treating the two traditional systems as one methodology.

## 5. 平等 / balance

The Gujin transmission passage explicitly contains:

`三停平等`

T4 reconstructs only the methodological fact that **balance/equality among the three divisions is an evaluated relation**.

It does not reconstruct any of the following because the admitted source does not supply them:

- percentage tolerance;
- millimeter tolerance;
- normalized-distance tolerance;
- near-equal band;
- camera-dependent correction;
- statistical population threshold.

Therefore:

`numericBalanceToleranceAuthorized = false`

The same passage contains the traditional result phrase `一生衣祿無虧`. T4 preserves its existence in source provenance but does not activate it as a Production claim.

## 6. Traditional observation requirements

T4 introduces semantic requirements, not executable measurements.

### Mayi contiguous 三停

Required semantic anchors:

`髮際 / 眉 / 準頭 / 地閣`

### Mayi 三府 / 三主

Required semantic anchors:

`髮際 / 印堂 / 山根 / 準頭 / 人中 / 地閣`

### Shenyi Fu Gujin 三停

Required semantic anchors:

`髮際 / 印堂 / 山根 / 準頭 / 人中 / 地閣`

These requirements say **what the traditional method needs to distinguish**. They do not say which MediaPipe point, contour, pixel, projection, or modern anatomical proxy should satisfy it.

That implementation question remains outside `face-research`.

## 7. Relation to FRB003

FRB003 previously reported:

- Mayi contiguous: methodology exists, metric contract missing;
- Shenyi Fu non-contiguous: primary-lineage witness gap + runtime methodology missing;
- observation anchors are not executable;
- shape metrics must not be substituted for anchor coordinates.

T4 changes only the traditional-methodology side:

### Mayi

The old coarse Mayi methodology now has a source-qualified FR261 successor reconstruction.

### Shenyi Fu

A transmission-qualified runtime/research methodology identity now exists.

The **primary-lineage witness gap remains open**. T4 does not erase it.

### Observation execution

Still blocked. T4 only names the traditional semantic requirements.

Thus FRB003's observation-side blockers remain valid.

## 8. Blocked source families

### 神相全編 1925

T3 has a verified witness and direct-PDF OCR locator, but not a pinned target scan page. No T4 successor methodology is promoted from it.

### 柳莊相法 1925

The physical/digitized witness is verified, but the target 三停 passage is not scan-pinned. The existing research methodology remains historical/provisional.

### 太清神鑑 1925

The OCR locator is useful, but the lower endpoint and exact target page still require page-level adjudication.

### 人倫大統賦

The scan witness exists, but the 三才 commentary target page remains unpinned.

## 9. Explicit non-goals

T4 does not:

- define MediaPipe landmark IDs;
- define RGB geometry;
- define normalized-face coordinates;
- define metric formulas;
- define a numeric 平等 tolerance;
- create a universal age map;
- collapse 三停 / 三府 / 三主 / 三才 / 三表;
- infer source independence from repeated wording;
- emit a FaceClaim;
- activate fortune/personality/career/relationship predictions;
- authorize Production.

## 10. T5 handoff

T5 is **Operationalization Specification**.

Its job is to translate the reconstructed methodology into methodology-side measurable requirements while preserving the traditional semantics.

For Mayi contiguous 三停, T5 must specify the abstract measurements needed to compare:

- 髮際→眉
- 眉→準頭
- 準頭→地閣

For Shenyi Fu Gujin 三停, T5 must specify the abstract measurements needed to compare:

- 髮際→印堂
- 山根→準頭
- 人中→地閣

But T5 must still avoid choosing concrete RGB landmarks. That belongs to the observation/binding tracks.

The expected chain after this T4 is:

```text
scan-checked source passage
        ↓
source-qualified methodology
        ↓
traditional observation semantics
        ↓
T5 operationalization specification
        ↓
face-observation-engine / face-reading-binding handoff
```

## 11. T4 verdict

T4 reconstructs three distinct methodology identities:

1. Mayi FR261 contiguous 三停;
2. Mayi FR261 三府 / 三主;
3. Shenyi Fu Gujin transmission non-contiguous 三停.

No cross-lineage merge is authorized.

No numeric balance threshold is authorized.

No Production promotion is authorized.

The next legitimate step is T5 operationalization specification.
