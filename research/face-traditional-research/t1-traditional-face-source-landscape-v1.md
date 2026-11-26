# T1 — Traditional Face Source Landscape v1

Watchtower-Track: face-traditional-research

> Repository: `gycha0109-beep/Saju`
> Track: `face-traditional-research`
> Phase: T1 — Corpus / Lineage Inventory
> Baseline main: `ef78a54f66b97ececcd8ae343333f069e56ff647`
> Date: 2026-09-24
> Status: RESEARCH LANDSCAPE / NO PRODUCTION METHODOLOGY SELECTION

---

## 0. Verdict

This Phase T1 review finds that the repository already contains meaningful traditional-source research, but it is interleaved with observation/CV research and older research-pack scaffolding.

The correct next step is **not** to invent a new physiognomy system and **not** to accept `research-pack-v0` as a finished traditional authority.

The traditional research track should instead:

1. preserve already scan-checked source findings;
2. treat later source-context adjudications as successors to older coarse research artifacts;
3. separate textual lineages that use similar terms with different boundaries or meanings;
4. distinguish source-backed methodology from CV operationalization;
5. build Concept Registry and Source Witness extraction on top of a genealogy-aware source landscape.

No Production methodology pack is selected by this document.

---

## 1. Track boundary

Owned here:

- traditional source works and witnesses;
- textual genealogy / transmission;
- 三停, 五官, 六府, 十二宮, 五行形, local-feature and whole-form concepts;
- source passages;
- methodology semantics;
- source conflict and lineage conflict;
- semantic comparison policy when the source itself authorizes comparison;
- observation requirements stated only as traditional descriptive requirements.

Not owned here:

- MediaPipe / landmark IDs;
- RGB/depth extraction;
- camera pose correction;
- metric formulas;
- calibration;
- thresholds;
- provider binding;
- capture repeatability;
- CV validation;
- mapping traditional conditions onto neutral observation columns.

Where an existing artifact mixes both sides, this T1 document records only the traditional-source portion.

---

## 2. Current repository authority inventory

### 2.1 Core contracts already exist

Current `packages/face-reading/src/contracts.ts` already provides the necessary provenance backbone:

- `SourceWork`
- `SourceWitness`
- `SourcePassage`
- `SourceLineageRelation`
- `FaceMethodologyDefinition`
- `FaceAuthorityConflictDefinition`
- `FaceClaimTypeDefinition`
- `FaceComparisonPolicy`
- `FaceMethodologyPackDefinition`

The traditional track should reuse these contracts rather than creating a second authority model.

### 2.2 Important existing traditional assets

| Existing asset | Traditional-research value | T1 interpretation |
|---|---|---|
| `research-pack-v0.ts` | initial works/witnesses/passages/methodologies | inventory substrate, **not final authority** |
| `five-officers-six-fus-research-v0.ts` | 神相全編 / 柳莊 五官·六府 research definitions | useful candidate set; much remains `unverified_ocr` |
| `twelve-palaces-research-v0.ts` | 神相全編 / 柳莊 十二宮 locator research | useful candidate set; currently electronic-text level |
| `direct-source-verification.ts` | scan-check / double-check provenance model | KEEP |
| `source-corroboration.ts` | derivative/transmission evidence cannot promote direct source | KEEP |
| FR261 麻衣 三停 source-context adjudication | direct scan re-review; separates 三府/三主 from explicit 三停 | **current traditional successor for this question** |
| FR263 神異賦 transmission witness | exact Gujin transmission page pinned | separate-lineage research evidence |
| FR117~FR123 五官 出納官 lineage | NLC 1925 witness-qualified passage + research methodology successor | source gate opened; semantic execution remains closed |

### 2.3 Older scaffolding that must not silently override successors

`research-pack-v0.ts` records a Mayi boundary passage and a reviewed `method.mayi.face_three_divisions@0.1.0`, but later FR261 shows that its older framing was too coarse.

FR261 re-read the same 麻衣 context and distinguishes:

- `髮際至印堂 / 山根至準頭 / 人中至地閣`
  - source role: 上府 / 中府 / 下府 with 初主 / 中主 / 末主;
  - **not** the winning 麻衣 face-三停 boundary.

- `髮際至眉 / 眉至準頭 / 準頭至地閣`
  - explicitly labeled 上停 / 中停 / 下停;
  - retained as the 麻衣 三停 research-methodology successor candidate.

Therefore:

> T1 lineage/context adjudication supersedes a flat reading of the older registry without mutating historical artifacts.

---

## 3. Source-genealogy rule

Similar content is not independent corroboration by default.

The following must not be counted as three independent authorities merely because similar text appears in all three:

- 麻衣相法
- 人相編
- 神相全編

Modern textual scholarship specifically shows that the transmitted texts and editions are closely entangled.

### Scholarly genealogy anchors

#### Liang Wei Hean, 2016

梁偉賢, 《麻衣相法》版本初探, 《漢學研究》 34(4), 2016, pp.131–164.

Key T1 implications:

- the compiler / compilation history of 麻衣相法 is not safely reducible to the traditional “麻衣道者 authored it” attribution;
- the study argues for 鮑栗之 as an important compiler;
- the study reconstructs edition relationships;
- the 1587 `新刻校正增釋合併麻衣先生人相編` contains a very broad system including 十三部位, 流年運氣, 十二宮, 五官, 六府三才三停, 五行形 and extensive local-feature sections;
- this 1587 text must not be assumed identical to later five-volume or 1925 麻衣 witnesses.

Reference:
https://www.airitilibrary.com/Article/Detail/02544466-201612-201703010021-201703010021-131-164

#### Minoru Sato, 2021

佐藤実, 「『麻衣相法』について」, 人間生活文化研究 31, 2021, pp.461–470.

Key T1 implications:

- reviews Liang 2016 and earlier bibliographic work;
- notes the survival in Japan of `人相編`;
- compares it with the Wanli 15 (1587) text;
- argues for close textual relationship among the 1587 corpus, 人相編 and 神相全編;
- notes that the widely circulated five-volume 麻衣相法 may preserve editorial reuse from 神相全編, including the 倪岳 preface issue.

Reference:
https://doi.org/10.9748/hcs.2021.461

### T1 consequence

Use a genealogy graph, not source-count voting.

No rule strength may be inferred from “appears in 麻衣 + 神相 + 人相編” until independence / derivation is established.

---

## 4. Candidate source landscape

### 4.1 麻衣相法 textual family

**Current repository witness**

- `witness.mayi_xiangfa.nlc_1925_v1`
- `witness.mayi_xiangfa.nlc_1925_v2`
- Civilisation Book Company / 1925 NLC scans
- repository has scan-checked 三停 passages

**Verified traditional finding now**

For the 1925 witness context reviewed by FR261:

- first non-contiguous triplet = 三府 / 三主 context;
- second contiguous triplet = explicit 三停;
- Mayi research formula retained:
  - 上停: hairline → brow
  - 中停: brow → 準頭
  - 下停: 準頭 → 地閣

**Coverage potential**

The wider 麻衣 / 人相編 textual family contains:

- 十三部位;
- 流年運氣;
- 十二宮;
- 五官;
- 六府 / 三才 / 三停;
- 五行形;
- local-feature judgments;
- whole-form classifications;
- 氣色 material.

But those broad contents belong to specifically identified editions/transmissions and cannot be projected automatically onto the current 1925 Mayi witness.

**T1 assessment**

High-value source family, but genealogy-sensitive.
Use exact witness identity in every later rule.

---

## 4.2 神相全編

**Bibliographic anchor**

A National Central Library rare-book record describes a late-Ming commercial edition:

- title: 神相全編
- 12 juan / 6 fascicles
- late Ming, approximately 1567–1644
- traditionally attributed to 陳希夷 / 陳摶
- 袁忠徹 listed as corrector

Bibliographic attribution is not treated as proof of historical authorship.

NCL rare-book catalog:
https://rbook.ncl.edu.tw/

**Electronic research witness currently used**

- `witness.shenxiang_quanbian.ctext`
- candidate, not direct-scan authority by itself

**System coverage confirmed in electronic text / catalog structure**

- whole-person reading sequence;
- 五岳 and 三停;
- 五官 / 六府;
- 十二宮;
- 十三部位;
- 流年運氣;
- 五行 / form typology;
- forehead, brow, eye, nose, philtrum, mouth, ear and other local-feature chapters.

Current electronic text explicitly preserves the rule-order idea:

`骨格 → 五行 → 三停 → 面部 → 眉目 → 五官 → 六府 → 五岳 → 部位流年 → 形局`

**Repository status**

- 五官 / 六府 research definitions exist;
- 十二宮 locator research exists;
- several source passages remain `unverified_ocr`;
- 出納官 has a later NLC-1925 witness-qualified scan-checked passage path through FR117~FR123;
- no blanket promotion of the whole 神相 methodology is authorized.

**T1 assessment**

Best broad-coverage extraction candidate for T2/T3, but source genealogy with 麻衣 / 人相編 must remain explicit.

---

## 4.3 太清神鑑

**Textual status**

The 四庫總目 states that the old attribution to Later Zhou official 王朴 is unreliable and likely pseudonymous.

The surviving Siku text is an `永樂大典本` reconstruction. The catalog nevertheless considered much of the textual material plausibly Song-period because its cited sources are predominantly pre-Song / early.

Therefore the authority label must be something like:

> 太清神鑑 — 四庫永樂大典輯本 tradition

not:

> 王朴 personal system

**Coverage confirmed**

The current Siku-derived electronic text includes:

- 三停;
- 五行;
- 五岳 / 四瀆;
- local sections for face, brow, eye and other parts;
- whole-form / 格-like configurations;
- static form vs 氣色 discussions.

Example face 三停 text in the Siku-derived transmission uses a contiguous structure from hairline through brow and nose tip into the lower face.

**T1 assessment**

Strong historically earlier comparative lineage.

Advantages:
- helps distinguish later Ming compilation conventions from earlier transmitted systems;
- broad morphology/local-feature material.

Limitations:
- reconstructed text;
- original-author attribution is not reliable;
- exact scan-level passage verification still needed before methodology promotion.

---

## 4.4 人倫大統賦

**Textual status**

四庫 catalog:

- 金 張行簡 撰;
- 元 薛延年 注;
- Xue's preface dated 1313;
- preserved through 永樂大典 and incorporated into the Siku corpus;
- described as a compact text specifically devoted to physiognomy.

**Methodological interest**

The preface makes a particularly useful methodological distinction:

- 骨法 / formed structure = stable;
- 氣色 = changeable.

This distinction is highly relevant to the current MyeongHa static-v1 boundary, but it must remain a historical methodology statement rather than a modern CV rule.

The text includes:

- 五官;
- 六府;
- 五岳 / 四瀆;
- forehead and other local-feature judgments;
- extensive ear/nose/etc. discussions;
- annotated transmission drawing on earlier named traditions.

The preface also refers to six face diagrams containing:

- face parts;
- age movement;
- 氣色;
- bone method;
- marks / patterns.

**T1 assessment**

Excellent compact comparative baseline, especially for:

- stable morphology vs dynamic appearance separation;
- 五官 / 六府 vocabulary;
- local-feature semantic extraction.

Exact 十二宮 coverage is **not yet confirmed** in this T1 pass and must not be assumed.

---

## 4.5 神異賦 transmission

Current FR263 pins an exact transmitted page in:

- 欽定古今圖書集成
- 博物彙編 / 藝術典 / 第636卷
- scan page 48
- section context: 神異賦

The transmission explicitly gives non-contiguous face 三停:

- 髮際 → 印堂
- 山根 → 準頭
- 人中 → 地閣

FR263 correctly concludes only:

- an independent non-contiguous **transmission** is established;
- the original 神異賦 text is not thereby established;
- this does not override the 1925 麻衣 contiguous 三停 result;
- cross-lineage merge is unauthorized.

Open source target already recorded by FR263:

- `新刻麻衣相神異賦`
- Harvard-Yenching Library
- Ming Wanli-period candidate
- exact passage page still unpinned

**T1 assessment**

Keep as a separate 三停 lineage candidate.
Do not elevate it into a full V1 methodology family until an earlier/independent witness is pinned.

---

## 4.6 柳莊相法

**Current repository witnesses**

- `witness.liuzhuang_xiangfa.nlc_1925`
- `witness.liuzhuang_xiangfa.ctext`

The 1925 NLC scan is digitally accessible.

Current repository research has candidate material for:

- 三停;
- 五官;
- 六府;
- 十二宮.

However, most current passages are still electronic-text / `unverified_ocr` level.

**Genealogy caution**

Liang 2016 notes that the widely transmitted `柳莊相法` may be a later work attributed to 柳莊 / 袁珙 rather than a safely authenticated Yuan Gong authorial text.

Therefore:

- do not use the traditional author attribution as provenance fact;
- use exact edition/witness provenance;
- scan-check the 1925 NLC witness before upgrading source semantics.

**T1 assessment**

Useful separate later transmission for conflict comparison, especially 十二宮 / 六府 / 三停.
Not yet a preferred production lineage.

---

## 5. Coverage matrix

Legend:

- **D** = directly confirmed in a named accessible text/witness or current repository source record
- **C** = candidate / electronic transcription / secondary table confirms presence, scan extraction still needed
- **?** = not established in this T1 pass
- **N/A** = source currently used only for a narrower transmission question

| Source family / witness | 三停 | 五官/六府 | 十二宮 | 五行/whole form | local feature judgments | age/流年 map | direct old-text access |
|---|---:|---:|---:|---:|---:|---:|---:|
| 麻衣 1925 NLC current repo witness | **D** | C | C | C | C | C | **D** |
| 1587 人相編-related corpus | **D/C** | **C** | **C** | **C** | **C** | **C** | scholarly reproduction/catalog evidence; exact repo witness not yet pinned |
| 神相全編 late-Ming / CText research | **C** | **C** | **C** | **C** | **C** | **C** | late-Ming NCL witness exists; current many repo passages not scan-pinned |
| 太清神鑑 Siku/Yongle reconstruction | **C** | C | ? | **C** | **C** | C | Siku-derived text accessible; exact passage scan pin pending |
| 人倫大統賦 Siku/Yongle reconstruction | C | **C** | ? | C | **C** | C | Siku text accessible |
| 神異賦 Gujin transmission FR263 | **D transmission** | N/A | N/A | N/A | N/A | N/A | **D transmission page**, earlier independent witness pending |
| 柳莊相法 1925 NLC + electronic | C | C | C | C | C | C | **D witness exists**, target passage scan checks pending |

Important:

> “C” never means production-authorized methodology. It means the corpus is a credible target for T2/T3 extraction.

---

## 6. Candidate lineage strategy for later methodology-pack work

This is a research ordering, **not a production selection**.

### Candidate Group A — late-Ming broad compendium cluster

Works/transmissions:

- 麻衣-related editions;
- 人相編;
- 神相全編.

Role:

- richest coverage for product-relevant concepts;
- likely strongest T2/T3 extraction yield.

Hard constraint:

- preserve work/witness identity;
- model derivation/relationship;
- never treat repeated text as independent votes.

### Candidate Group B — 人倫大統賦 baseline

Role:

- historically earlier compact comparator;
- useful stable-form / dynamic-appearance distinction;
- useful 五官/六府 and local-feature semantics.

### Candidate Group C — 太清神鑑 Siku reconstruction

Role:

- historically earlier broad comparator;
- useful 三停 / 五行 / whole-form / local-feature comparison.

Hard constraint:

- no “王朴 authored this” authority claim;
- reconstructed textual tradition must be explicit.

### Candidate Group D — 柳莊 transmitted tradition

Role:

- conflict/comparison source for 三停, 六府, 十二宮;
- potentially useful later pack if scan verification supports coherent internal methodology.

Hard constraint:

- traditional attribution is not provenance proof.

### Special lineage — 神異賦

Keep separate for 三停 source-history work until earlier independent scan evidence is pinned.

---

## 7. Concept priorities emerging from T1

The track-level priority remains:

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

T1 adds a source strategy:

### T2-A — shared concept registry first

Inventory terms without deciding one universal meaning:

- 三停
- 三才
- 三府 / 三主
- 五官
- 六府
- 五岳
- 四瀆
- 五行形
- 十三部位
- 十二宮
- 流年 / 行運
- local anatomical names such as 印堂, 山根, 準頭, 人中, 地閣, 天倉, 魚尾/奸門, 中正

### T2-B — lineage-qualified definitions

Example:

`三停` must not be one global record with one geometry.

It should support lineage-qualified concept senses such as:

- `mayi_1925_contiguous_face_three_divisions`
- `shenyi_fu_gujin_noncontiguous_three_divisions_transmission`
- `liuzhuang_candidate_three_divisions`
- `taiqing_siku_face_three_divisions`

No cross-lineage normalization is issued in T2.

---

## 8. Repository conflicts / corrections to carry forward

### 8.1 Mayi predecessor correction

Any future T2/T3 work on 麻衣 三停 must cite FR261, not merely the older flat `research-pack-v0` boundary record.

### 8.2 神異賦

FR263 is transmission evidence, not original-text authority.

### 8.3 五官

The broad 五官 v0 criteria set is useful for inventory but most base passages remain `unverified_ocr`.

The 出納官 mouth path is stronger:

- NLC 1925 witness-qualified source is scan-checked;
- research methodology successor exists;
- methodology review / semantic execution remains separately governed.

Do not infer that all five officers are now scan-checked because one officer path advanced.

### 8.4 十二宮

Current `twelve-palaces-research-v0.ts` gives useful locators for 神相 / 柳莊 traditions but the passages are currently `unverified_ocr`.

Therefore 十二宮 is a T3 source-extraction target, not a ready production map.

### 8.5 Region maps / metrics

Existing `FaceRegionMapDefinition`, metrics and CV formulas belong to later observation/binding work.

This track may state:

> “the source distinguishes 髮際, 眉, 準頭, 地閣 and requires their relative ordering.”

This track must not decide:

> “use landmark N and formula X.”

---

## 9. Primary-source acquisition backlog

### T1-S1 — 神相全編 direct witness map

Goal:

- pin a late-Ming or otherwise controlled scan witness;
- record exact pages for:
  - 三停;
  - 五官;
  - 六府;
  - 十二宮;
  - 五行形;
  - 十三部位 / 流年.

### T1-S2 — 麻衣 textual-family genealogy

Goal:

- explicitly model:
  - 1925 current Mayi witness;
  - 1587 人相編-related witness;
  - commonly circulated five-volume text;
  - relation to 神相全編.

Do not collapse them into one “麻衣原典”.

### T1-S3 — 神異賦 earlier witness

Goal:

- inspect the Harvard-Yenching `新刻麻衣相神異賦` candidate or another earlier independent rare-book scan;
- pin the exact 三停 page if accessible.

### T1-S4 — 柳莊 NLC 1925 scan extraction

Target passages:

- 三停;
- 五官 / 六府;
- 十二宮.

Purpose:

- replace electronic-text-only candidate passages with scan-checked witness records where possible.

### T1-S5 — 太清神鑑 controlled witness extraction

Target:

- Siku/Yongle-Dadian reconstructed witness pages for:
  - 三停;
  - 五行;
  - local face sections;
  - whole-form judgments.

### T1-S6 — 人倫大統賦 controlled witness extraction

Target:

- original preface;
- 五官 / 六府;
- face-part passages;
- six-map reference and any recoverable map structure.

---

## 10. V1 research-pack implications

Not authorized yet:

- selecting one winning lineage;
- combining 麻衣 + 神相 + 柳莊 into a synthetic “standard physiognomy”;
- turning shared phrases into weighted consensus;
- ranking palaces/officers without source ordering authority;
- issuing numeric fortune scores;
- promoting OCR transcription directly to production semantics.

Potential future pack shapes to evaluate only after T2–T5:

1. **single-lineage pack**
   - one controlled witness family and compatible methods;

2. **explicit multi-lineage comparative pack**
   - only if the product explicitly presents lineage differences and the engine keeps claims separate.

Default preference for governance remains a pinned compatible methodology set, not an averaged cross-lineage system.

---

## 11. Phase T1 completion state

### Completed in this pass

- fresh-main repository inventory;
- current provenance contract review;
- current Three-Divisions successor review;
- current Five-Officers source-gate review;
- current Twelve-Palaces research status review;
- external bibliographic / textual-history review;
- candidate source-family comparison;
- source-accessibility classification;
- genealogy risk identification;
- T2 concept seed list;
- T3 source-acquisition backlog.

### Explicitly not completed

- full SourcePassage extraction for every concept;
- production methodology selection;
- any CV operationalization;
- any threshold/calibration;
- full original-scan verification of Shenxiang / Liuzhuang / Taiqing / Renlun targets;
- exact universal 十二宮 map;
- full 流年 map.

Those belong to later bounded source tasks.

---

## 12. Phase T2 handoff

Next phase:

> **T2 — Traditional Concept Registry**

Start with `三停` because:

- it already has the strongest repository provenance;
- FR261/FR263 demonstrate exactly why lineage-qualified concepts are necessary;
- it provides a clean model for later 五官 / 十二宮 registry design.

First T2 deliverable should define, without CV formulas:

`TraditionalConcept`
→ source-qualified senses
→ definitions
→ relationships
→ conflicts
→ required traditional observations
→ downstream claim-family candidate

Recommended first registry slice:

1. 三停
2. 三府 / 三主
3. 三才
4. the relationship among those terms within each source context

Only after that should the track expand into 五官.

---

## 13. References used for T1

### Repository authorities

- `packages/face-reading/src/contracts.ts`
- `packages/face-reading/src/research-pack-v0.ts`
- `packages/face-reading/src/five-officers-six-fus-research-v0.ts`
- `packages/face-reading/src/twelve-palaces-research-v0.ts`
- `packages/face-reading/src/twelve-palaces-authority-fr12.ts`
- `packages/face-reading/src/direct-source-verification.ts`
- `packages/face-reading/src/source-corroboration.ts`
- `packages/face-reading/src/mayi-three-divisions-source-context-adjudication-fr261.ts`
- `packages/face-reading/src/shenyi-fu-noncontiguous-three-divisions-transmission-witness-fr263.ts`
- FR117–FR123 Five-Officers intake source/methodology lineage

### External bibliography / witnesses

- 梁偉賢. 〈《麻衣相法》版本初探〉. 《漢學研究》 34.4 (2016): 131–164.
  - https://www.airitilibrary.com/Article/Detail/02544466-201612-201703010021-201703010021-131-164
- 佐藤実. 〈『麻衣相法』について〉. 人間生活文化研究 31 (2021): 461–470.
  - https://doi.org/10.9748/hcs.2021.461
- 國家圖書館古籍影像檢索資料庫 — 神相全編, 明末葉坊刊本, 十二卷六冊.
  - https://rbook.ncl.edu.tw/
- Chinese Text Project — 神相全編.
  - https://ctext.org/wiki.pl?chapter=905153&if=gb
- 四庫全書總目提要 卷109 — 太清神鑑 / 人倫大統賦.
  - https://zh.wikisource.org/zh/四庫全書總目提要/卷109
- Chinese Text Project — 太清神鑑.
  - https://ctext.org/
- Wikisource / Siku transmission — 人倫大統賦.
  - https://zh.wikisource.org/zh-hant/人倫大統賦_(四庫全書本)
- National Library of China scan metadata via Wikimedia Commons — 柳莊相法, 1925.
  - https://commons.wikimedia.org/wiki/File:NLC511-03030560-63880_柳莊相法.pdf

---

## 14. Final T1 decision

```text
T1 CORPUS / LINEAGE INVENTORY
= ESTABLISHED

CURRENT REPOSITORY TRADITIONAL ASSETS
= REAL BUT MIXED WITH OBSERVATION RESEARCH

MAYI THREE-DIVISIONS CURRENT SUCCESSOR
= FR261 CONTIGUOUS FORMULA FOR THE PINNED 1925 CONTEXT

SHENYI FU NONCONTIGUOUS FORMULA
= SEPARATE TRANSMISSION LINEAGE CANDIDATE, FR263

SHENXIANG
= BROAD HIGH-VALUE CORPUS, MANY PASSAGES STILL NEED DIRECT SCAN PINNING

TAIQING SHENJIAN
= STRONG EARLIER COMPARATIVE TRADITION, PSEUDONYMOUS ATTRIBUTION CAUTION

RENLUN DATONGFU
= STRONG COMPACT EARLIER COMPARATOR

LIUZHUANG
= USEFUL SEPARATE TRANSMISSION, SOURCE/ATTRIBUTION REVIEW STILL REQUIRED

PRODUCTION LINEAGE SELECTED
= NO

CROSS-LINEAGE MERGE AUTHORIZED
= NO

NEXT PHASE
= T2 TRADITIONAL CONCEPT REGISTRY, STARTING WITH 三停 / 三府 / 三主 / 三才
```
