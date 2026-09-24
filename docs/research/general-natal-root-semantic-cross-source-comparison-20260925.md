# R011 — Root / 通根 cross-source comparison

Date: 2026-09-25  
Issue: #934  
Track: saju-research  
Status: VERIFIED_BOUNDED_DIRECT_VISUAL_CLOSURE_COMPLETE

## 1. Research question

Do not normalize `根 / 有根 / 無根 / 根氣 / 通根` across 淵海子平, 三命通會, and 子平真詮/評註 as though they were one universal technical predicate.

R011 compares:

- the lexical form actually present in each source;
- the chart relation explicitly described;
- whether a generic 通根 definition is actually stated;
- whether root classes such as 長生 / 祿旺 / 墓庫 / 餘氣 are admitted;
- whether month-branch priority is stated;
- whether source wording is case-oriented or generic;
- whether shared wording is independent corroboration or a lineage question.

## 2. Closure event

R011 had remained open only because the exact direct-image pages for the compared Yuanhai and Sanming root sequence had not been pinned.

That blocker is now removed.

### 2.1 淵海子平 — NTL 1926

Registered scan identity:

```text
holding institution = National Taiwan Library
digitization        = NTL-9900014380
title               = 淵海子平子平真詮 v.2
editor              = 秦慎安 校勘
publisher           = 文明
publication year    = 1926
digital pages       = 164
```

Existing repository direct-inspection evidence had already pinned:

```text
digital page 29      = 四言獨步 title/start
digital pages 29..33 = 四言獨步 bounded content
digital page 34      = 身弱論 transition
```

Fresh direct visual inspection of the registered scan page now visibly confirms on **digital page 34 / zero-based index 33 / printed marker 三三**:

```text
評註淵海子平卷四
身弱論
陽木無根
```

The same visible page continues the bounded root-presence sequence.

Evidence capture:

```text
SHA-256
b4b469b46cf023b1d97f5db0365419ebe21c46bde53f931edaaf5a57320fe288

capture dimensions
538 x 831
```

The screenshot is recorded only as a corroborating visual derivative. Witness identity remains the registered NTL scan.

Public registered scan surface:

https://commons.wikimedia.org/wiki/File:NTL-9900014380_%E6%B7%B5%E6%B5%B7%E5%AD%90%E5%B9%B3%E5%AD%90%E5%B9%B3%E7%9C%9F%E8%A9%AE_v.2.pdf

### 2.2 三命通會 — NLC 1926

Directly inspected binary:

```text
digitization = NLC416-13jh000624-42998
title        = 三命通會
publisher    = 文明書局
year         = 民國十五年 [1926]
file pages   = 345
```

The uploaded original PDF binary was checksummed before inspection:

```text
SHA-256
b90f9e722407fed6d564300eb71cbae55014f6a35a849ce9e2b940fae4b915bd
```

Direct render:

```text
human PDF page       = 341 / 345
zero-based page index = 340
printed page label    = 四四
render                = 1084 x 1500 px @ 200 DPI
section               = 三命通會 卷十二
```

The rendered witness visibly contains:

```text
陽木無根
有根南旺
會逢根氣
```

The page also visibly carries the same 身弱/root case neighborhood that motivated the comparison.

This is no longer OCR-only or transcription-only evidence.

## 3. Source comparison

### 3.1 淵海子平

Observed bounded lexical surface:

```text
無根
有根
露根
歸根
根氣
```

Observed role:

- case-condition language inside 身弱 / 棄命-related material;
- root presence changes the disposition of the example;
- no generic universal `通根` definition is established by this bounded page;
- no complete hidden-stem predicate is stated here;
- no numeric root weight is stated.

Disposition:

```text
CASE-ORIENTED ROOT-PRESENCE SURFACE
NOT A UNIVERSAL TONGGEN DEFINITION
```

### 3.2 三命通會

Observed bounded lexical surface includes:

```text
無根
有根
根氣
```

The directly inspected 卷十二 page visibly preserves wording substantially overlapping the Yuanhai root sequence.

Disposition:

```text
CASE-ORIENTED ROOT-PRESENCE SURFACE
SHARED WORDING WITH YUANHAI
NOT AN INDEPENDENT SECOND VOTE BY DEFAULT
```

### 3.3 子平真詮 / 評註

Existing governed repository research records a more explicit selected-source root discussion:

```text
四柱有根
長生祿旺，根之重者也
墓庫餘氣，根之輕者也
通根如室家之可住
通根之中，尤以月令之支為最重也
```

The repository also already preserves:

- base text vs later commentary separation;
- bounded contained-element exclusions;
- month-branch priority only within the stated 通根 context;
- heavy/light comparative language without numeric weights.

Disposition:

```text
MORE EXPLICIT GENERIC ROOT / TONGGEN DISCUSSION
SOURCE-STRATUM SEPARATION REQUIRED
```

## 4. Pairwise verdicts

### Yuanhai ↔ Sanming

```text
TEXTUAL_INHERITANCE_SUSPECTED
exact lineage mechanism = INCONCLUSIVE_DIRECT_OR_COMMON_SOURCE
```

The directly inspected pages make the wording overlap real rather than OCR artefact.

They do **not** establish whether:

- Sanming copied Yuanhai directly;
- both copied a common source;
- a later compilation/reproduction layer produced the overlap.

Therefore the exact mechanism remains INCONCLUSIVE.

The shared wording is not counted as independent doctrinal corroboration.

### Yuanhai ↔ Ziping

```text
PARTIAL_OVERLAP
```

Both treat root presence as material to strength/capacity.

However:

- Yuanhai's inspected passage is case-oriented;
- the selected Ziping chain explicitly discusses root classes and 通根.

Therefore the surfaces overlap semantically but are not one normalized predicate.

### Sanming ↔ Ziping

```text
DIFFERENT_SCOPE
```

The inspected Sanming page preserves case/verse root language.

The selected Ziping chain contains a more explicit generic root/Tonggen discussion.

The comparison does not authorize semantic collapse.

## 5. Direct-visual closure vs R097 reproducibility

R011's own closure requirement was:

1. visually pin the exact Yuanhai target page;
2. visually pin the exact Sanming target page;
3. classify lineage more precisely or explicitly leave the exact mechanism inconclusive.

All three are now satisfied.

Therefore:

```text
directScanClosureComplete = true
R011 semantic comparison = CLOSED / VERIFIED_BOUNDED
```

A separate reproducibility-hardening distinction is preserved.

The Sanming binary has an exact SHA-256 and reproducible page render.

For the NTL Yuanhai scan, the repository has registered witness identity, prior governed page mapping, and a fresh visual derivative digest, but this closure artifact does not newly retain the 65.69 MB original NTL binary checksum.

Therefore a future fully materialized R097 manifest for that exact binary remains useful hardening.

It is **not** treated as an R011 semantic-closure blocker.

This distinction prevents:

```text
R097 hardening incomplete
→ pretend the target page was not visually inspected
```

while also preventing:

```text
user screenshot
→ silently replace witness identity
```

## 6. Explicit rejected normalizations

```text
three source families
!= one universal Tonggen predicate

shared Yuanhai/Sanming wording
!= independent corroboration

root presence
!= hidden-stem containment in every source

heavy/light root language
!= numeric root weights

month-branch priority
!= complete Tonggen resolver

R011 direct-visual closure
!= global negative root resolver

R011 direct-visual closure
!= final 強弱/旺衰 classifier

research closure
!= governed methodology
!= InterpretationClaim
!= Preview/Production authority
```

## 7. What R011 does establish

R011 now establishes the following bounded conclusions:

1. Yuanhai's inspected page uses root vocabulary materially in 身弱/case logic.
2. Sanming 卷十二 preserves a directly inspected, substantially overlapping root sequence.
3. The Yuanhai/Sanming overlap is a lineage/dependency problem rather than an independent-source vote.
4. Ziping's selected-source chain is more explicit about 通根/root-class semantics.
5. The three source families must remain source-scoped rather than normalized into one universal predicate.

## 8. What R011 does not establish

Still unauthorized:

- universal Tonggen resolver;
- universal `有根 / 無根` resolver;
- global negative root inference;
- numeric root weighting;
- automatic 長生/祿旺/墓庫/餘氣 weighting;
- final whole-chart 強弱/旺衰 classifier;
- Gyeokguk authority;
- Production behavior.

## 9. Final status

```text
R011
= VERIFIED_BOUNDED_DIRECT_VISUAL_CLOSURE_COMPLETE

Yuanhai direct target page
= PINNED

Sanming direct target page
= PINNED

Yuanhai ↔ Sanming
= TEXTUAL_INHERITANCE_SUSPECTED
  exact mechanism INCONCLUSIVE

UNIVERSAL TONGGEN AUTHORITY
= NOT GRANTED

GLOBAL NEGATIVE ROOT RESOLVER
= NOT GRANTED

FINAL STRENGTH CLASSIFIER
= NOT GRANTED

PRODUCTION AUTHORITY
= NOT GRANTED
```

RESEARCH COMPLETE.  
AUTHORITY NOT GRANTED.
