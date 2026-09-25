# T2 Extension — 五官 / 六府 Concept Registry v1

> Status: research registry / source-gated  
> Watchtower-Track: face-research  
> Baseline main: `b37a548dd2f87e22a8c81d78107e13ff5b6b4d30`  
> Issue: #1510

## 1. Why this is the next traditional-research slice

The T1 source landscape ranked the concept families in this order:

1. 三停 / whole-face vertical structure
2. 五官
3. eye
4. nose
5. mouth / philtrum
6. chin
7. forehead
8. brow
9. 十二宮
10. 五行形 / overall-form classification

The Three-Divisions slice has now completed its T1–T7 path.

The next source-methodology task is therefore to extend the lineage-qualified concept registry into 五官, while carrying 六府 beside it because the current repository research artifact couples those two families and already records a material cross-lineage mapping conflict.

## 2. Existing repository evidence is uneven

The old `five-officers-six-fus-research-v0.ts` is useful inventory, not uniform source authority.

Its broad 神相全編 passages are still electronic / `unverified_ocr`:

- 五官 mapping;
- 採聽官;
- 保壽官;
- 監察官;
- 審辨官;
- 出納官 historical passage;
- 六府 mapping.

The 柳莊 五官 / 六府 passages are also electronic / `unverified_ocr`.

One path is materially stronger:

```text
神相全編 出納官 criterion passage
→ NLC 1925 witness-qualified page
→ scan_checked successor passage
→ research methodology successor
```

This path is represented by:

- `passage.shenxiang.five_officers.intake.nlc_1925`
- `method.shenxiang.five_officers.intake_criteria@0.2.0`
- FR117–FR123

The stronger 出納官 path must **not** be projected onto the other four officers.

## 3. Concept distinction: 五官 mapping vs 官成 criteria

T2 now records two different semantic layers.

### Layer A — 五官 mapping

神相 electronic research text maps:

| Feature | Officer |
|---|---|
| 耳 | 採聽官 |
| 眉 | 保壽官 |
| 眼 | 監察官 |
| 鼻 | 審辨官 |
| 口 | 出納官 |

This mapping passage is not yet scan-pinned in the successor research track.

### Layer B — individual 官成 criteria

Each officer has source-local formation conditions.

For example, the scan-qualified 出納官 passage contains:

`口須要方大，唇紅端厚，角弓，開大合小，乃為出納官成。`

The authority of this criterion passage does not automatically prove:

- the parent 五官 mapping passage;
- the other four officer criterion passages;
- a numeric operationalization of 方大 / 端厚 / 角弓 / 開大合小 / 唇紅;
- a Production 官成 classification.

Therefore:

```text
五官 mapping authority
!=
individual 官成 criterion authority
!=
machine operationalization authority
```

## 4. 神相 vs 柳莊 五官

The current 柳莊 electronic passage preserves the same broad feature/officer family but writes the nose officer as:

`審判官`

where the 神相 electronic passage has:

`審辨官`.

T2 keeps this unresolved.

It is not authorized to silently rewrite one into the other as an OCR error, spelling variant, or exact synonym before controlled witness comparison.

The concept registry therefore stores separate source-qualified senses.

## 5. 出納官 successor state

The current strongest 五官-related traditional source result is narrow:

### Admitted

- NLC-1925 witness-qualified 出納官 criterion passage;
- scan-checked status;
- research methodology successor;
- source concepts:
  - 方大
  - 唇紅端厚
  - 角弓
  - 開大合小

### Still blocked

FR132 already establishes that existing neutral mouth metrics do not prove those traditional constructs.

In particular:

- 方大 must not collapse to one aspect ratio;
- 端厚 must not collapse to thickness alone;
- 角弓 must not collapse to corner curvature alone;
- 開大合小 requires controlled multiple states;
- 唇紅 requires controlled color capture;
- no traditional metric binding is authorized;
- no threshold or automatic criterion state is authorized.

This T2 registry preserves that boundary.

## 6. 六府 is not one universal region map

### 神相 electronic sense

Current source wording:

`天庭日月二角為天府；兩顴為人府；地角邊腮為末景地府。`

Conceptual structure:

- upper pair: 天府 — 天庭 / 日角 / 月角
- middle pair: 人府 — 兩顴
- lower pair: 地府 — 地角 / 邊腮

### 柳莊 electronic sense

Current source wording:

`六府：天倉為上二府，顴骨為中二府，地庫為下二府。`

Conceptual structure:

- upper pair: 上二府 — 天倉
- middle pair: 中二府 — 顴骨
- lower pair: 下二府 — 地庫

These are not normalized into one common coordinate map.

```text
shared term 六府
!=
shared region identity
```

The existing v0 conflict remains valid as a research warning.

## 7. Source-genealogy rule

Repeated wording or similar feature/officer mappings are not counted as independent votes.

The broader T1 genealogy warning still applies:

- 麻衣-related textual families;
- 人相編;
- 神相全編;
- later transmitted compilations.

For 柳莊, traditional attribution is also not treated as secure authorship provenance.

Every later methodology promotion must name the exact witness.

## 8. Next source-extraction gates

The next bounded source task should resolve, in order:

1. 神相全編 五官 mapping page;
2. 神相 non-出納官 criterion pages:
   - 採聽官
   - 保壽官
   - 監察官
   - 審辨官
3. 神相 六府 mapping page;
4. 柳莊 NLC-1925 五官 mapping page;
5. 柳莊 NLC-1925 六府 mapping page.

The 柳莊 scan comparison must explicitly adjudicate the `審判官 / 審辨官` variant.

## 9. What this T2 extension does not authorize

No part of this registry authorizes:

- one universal 五官 methodology;
- one universal 六府 geometry;
- landmark IDs;
- camera formulas;
- numeric 官成 thresholds;
- color/氣色 inference;
- personality, wealth, health, relationship, or fate claims;
- Production execution.

## 10. T2 extension verdict

```text
THREE-DIVISIONS T1–T7
= COMPLETE FOR CURRENT SLICE

NEXT CONCEPT FAMILY
= 五官

神相 五官 MAPPING
= ELECTRONIC / DIRECT PAGE STILL REQUIRED

神相 出納官 CRITERION
= SCAN-CHECKED SUCCESSOR AVAILABLE

OTHER FOUR 神相 官成 CRITERIA
= DIRECT PAGE EXTRACTION REQUIRED

柳莊 五官
= ELECTRONIC CANDIDATE / DIRECT PAGE REQUIRED

神相 六府
= ELECTRONIC CANDIDATE / DIRECT PAGE REQUIRED

柳莊 六府
= ELECTRONIC CANDIDATE / DIRECT PAGE REQUIRED

審辨官 vs 審判官
= UNRESOLVED

CROSS-LINEAGE NORMALIZATION
= NOT AUTHORIZED

NEXT PHASE
= BOUNDED DIRECT SOURCE-WITNESS EXTRACTION
```
