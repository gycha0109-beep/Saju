# General Natal Conclusion T8 — Scan-Backed Source Qualification Audit

Issue: #875  
Audit base: `fca3ef5363999deb2cc21d0c7d8297f123de57cb`

## Purpose

This audit follows the immutable passage-witness subset merged in #789 and the refreshed Production-readiness audit merged in #792.

Its purpose is narrower than Production provenance promotion: determine whether each of the sixteen currently pinned passage propositions can be corroborated against a scan-backed edition surface, while keeping scan identity, exact physical page/folio verification, transcription identity, passage-hash reproduction, and consumer-semantic support as separate authorities.

## Scan-backed authority surfaces

### 三命通會·卷五

```text
edition = 欽定四庫全書本
holding institution = Zhejiang University Library
digitization = CADAL 06066041
scan = Wikimedia Commons CADAL06066041 三命通會·卷五.djvu
scan-backed OCR = Chinese Text Project
```

The scan-backed OCR surface contains the `論古人立印食官財名義` material used by the current six Samyeong witnesses. Because the edition identity matches the registered 四庫全書 volume, these rows remain recorded as:

```text
SAME_EDITION_SCAN_OCR_CORROBORATED
```

The uploaded original `CADAL06066041_三命通會·卷五.djvu` has SHA-1
`dd6be166b360a58bd142235803fc5a19fd8f267b`, exactly matching the registered Commons CADAL06066041 asset. The following bounded propositions were then directly inspected on that scan binary's image surfaces:

```text
scan asset = CADAL06066041 / 卷五
section observed = 論古人立印食官財名義

digital scan page = 4
W-SAMYEONG-FOUR-RELATION-TAXONOMY
→ 謂之日主屬我生我者壬癸水我生者丙丁火尅我者庚辛金我尅者戊己土

digital scan page = 7
W-SAMYEONG-OUTPUT-WEALTH
→ 甲乙生丙丁為子丙丁生戊己為子

W-SAMYEONG-WEALTH-OFFICER
→ 丙丁生戊己為子戊己生庚辛為子

W-SAMYEONG-OFFICER-RESOURCE
→ 戊己生庚辛為子庚辛生壬癸為子

W-SAMYEONG-PEER-WEALTH
→ 財怕劫被劫則分

W-SAMYEONG-WEALTH-RESOURCE
→ 印怕財貪財則壞
```

The digital page indices above are 1-based scan pages, not printed pages or folios. Direct visual agreement establishes neither byte-identical transcription identity nor reproduction of the existing fixed witness SHA-256 values.

### 刻京臺增補淵海子平大全

```text
edition = 明萬曆刻本
holding institution = National Library of China
digitization = NLC892-2642-210287/210288/210317/210318
scan = Wikimedia Commons scan collection
corroborating OCR = 識典古籍 scan/OCR surface
```

The Ming Wanli scan-backed surface independently corroborates the bounded propositions used by all ten current Yuanhai witnesses.

The repository-authoritative fixed passage definitions place the four still-unverified structural Yuanhai witnesses in `四言獨步`. Fresh source inspection now locates that fixed-witness section on the actual Ming Wanli scan surface in `NLC892-2642-210318 第4冊 / 卷之五`, not in the older `第3冊 / 卷之四 / 雜論口訣 / 實法第一` proposition-corroboration surface.

Commons identifies `NLC892-2642-210318 第4冊` as a 41-page National Library of China scan containing `卷之五 / 卷之六`, with SHA-1 `9f6098878cda071f5e1d3cbb0502cb65dfe17eea`. The corresponding NLC-family OCR for `卷之五` explicitly sequences `四言獨步 → 身弱論 → 棄命從殺論 → 龍飛萬曆庚子春月 / 閩建喬山書舍刊行`.

A follow-up direct scan check corrects the boundary recorded in #865: digital page 18, not page 17, contains the terminal `卷之五` colophon `龍飛萬曆庚子春月 / 閩建喬山書舍刊行`. The following digital page 19 is the first page aligned with the next OCR chapter, `卷六`, which begins `榄命活用總套`.

The uploaded `NLC892-2642-210317 第3冊` was also rendered through its final scan pages. Its late pages remain in preceding song/訣 material and end before `四言獨步`; the fixed-witness section therefore remains on the continuation carried by 第4冊.

The exact uploaded original `NLC892-2642-210318_刻京臺增補淵海子平大全_第4冊.pdf` was then inspected directly. It has 41 digital pages and SHA-1 `9f6098878cda071f5e1d3cbb0502cb65dfe17eea`, exactly matching the registered Commons asset.

The directly inspected scan surface is now bounded as:

```text
scan asset = NLC892-2642-210318 第4冊 / 卷之五
scan surface section = 四言獨步
inspected 四言獨步 digital pages = 14..17
terminal 卷五 digital scan page = 18
terminal colophon observed = 龍飛萬曆庚子春月 / 閩建喬山書舍刊行
following 卷六 surface begins = digital scan page 19
```

The high-resolution image comparison resolves the earlier preview-resolution uncertainty but does **not** verify the four frozen fixed witnesses. The directly legible `四言獨步` clauses align to a textual variant represented on the same NLC-family OCR surface. Directly inspectable anchors include the `印綬根輕 / 旺中發達`, `印綬根多 / 旺中不發`, and `先財後印 / 先印後財` sequence; the same scan/OCR surface continues through `八月官星`, then `身弱論`, `棄命從殺論`, and the 卷五 colophon.

The four frozen witness digests still resolve under the existing exact-substring / UTF-8 / no-normalization contract to `財旺生官`, `煞化為印`, `比劫羊刃，財格大忌`, and `印綬見財`. Those frozen strings were not established by this direct image comparison. The deterministic outcome is therefore `NOT_ESTABLISHED_TEXTUAL_VARIANT_DIVERGENCE` for these four rows, not 16/16 direct verification and not a claim that no other exemplar can contain the frozen strings.

Six Yuanhai witnesses already have direct image verification.

Five family-taxonomy witnesses share one directly inspected scan surface:

```text
scan asset = NLC892-2642-210287 第1冊 / 卷之一
digital scan page = 8
section observed = 論五行相生相尅訣

W-YUANHAI-RESOURCE-TAXONOMY → 生我者爲正印偏印
W-YUANHAI-OUTPUT-TAXONOMY   → 我生者爲傷官食神
W-YUANHAI-OFFICER-TAXONOMY  → 尅我者爲正官七殺
W-YUANHAI-WEALTH-TAXONOMY   → 我尅者爲偏財正財
W-YUANHAI-PEER-TAXONOMY     → 比肩者爲刼財敗財
```

The previously verified structural witness remains:

```text
witness = W-YUANHAI-OUTPUT-WEALTH
scan asset = NLC892-2642-210288 第2冊 / 卷之三
digital scan page = 8
section observed = 論食神
bounded proposition observed = 食神者生我財神之謂也
```

These page numbers are 1-based digital scan-page indices. They are not asserted to be printed pages or folios. The scan images were directly compared with the corroborating OCR surfaces for the bounded propositions only; byte-identical identity with the fixed Wikisource witnesses is not established.

These rows are intentionally recorded as:

```text
CROSS_EDITION_PROPOSITION_CORROBORATED
```

The current registered Wikisource revision and the Ming Wanli scan are not assumed to be textually identical. Cross-edition agreement on a bounded proposition is weaker than exact transcription identity.

## Deterministic audit result

```text
witnessCount = 16
scanBackedEditionIdentityEstablishedCount = 16
scanBackedPropositionCorroboratedCount = 16
sameEditionScanOcrCorroboratedCount = 6
crossEditionPropositionCorroboratedCount = 10
exactDigitalScanPageVerifiedCount = 12
boundedPropositionDirectlyObservedInScanCount = 12
directScanImageComparisonCompletedCount = 12
fixedWitnessTextualVariantDivergenceCount = 4
exactPhysicalPageOrFolioVerifiedCount = 0
exactWitnessHashReproducedFromScanCount = 0
fullScanQualificationEstablishedCount = 0
```

Therefore:

```text
scanBackedEditionCorroborationEstablished = true
allWitnessesHaveScanBackedPropositionCorroboration = true
exactPhysicalPageOrFolioAuthorityEstablished = false
exactWitnessHashReproductionAuthorityEstablished = false
sourceIntegrityQualificationEstablished = false
productionEligibleProvenanceEstablished = false
provenanceQualityPromotionAuthorized = false
productionAdmissionAuthority = false
Production = HOLD
```

## Why the remaining gates stay false

A scan file or OCR surface proves neither the exact physical page/folio nor the extraction procedure that produced the existing witness digest.

For all six Samyeong rows, the current bounded propositions now have exact digital scan-page locators and direct image comparison. This still does not establish exact witness-digest reproduction or byte-identical transcription identity with the fixed repository witnesses.

For the Yuanhai rows, the Ming Wanli scan independently corroborates the broader propositions but is a distinct textual surface from the current fixed Wikisource witnesses. Six Yuanhai rows already have exact digital scan-page locators and direct bounded-proposition image comparison. For the remaining four, the exact uploaded 第4冊 scan has now been directly inspected at high resolution across the bounded `四言獨步` surface. That inspection establishes a textual-variant divergence rather than the frozen exact strings, so the four rows remain without `directInspection`: `exactDigitalScanPageVerified`, `boundedPropositionDirectlyObservedInScan`, and `directScanImageComparisonCompleted` remain false.

This is stronger than the previous “resolution is insufficient” state because the current scan route has been tested and did not establish the frozen witnesses. It is still weaker than an exhaustive bibliographic claim about every historical exemplar. The repository must therefore obtain a scan or registered transcription surface that actually contains the frozen exact strings, or use a separate reviewed process to re-register witness definitions. It must not silently substitute this Ming Wanli variant for the existing fixed witnesses.

No witness can therefore be promoted to full scan qualification in this audit.

## Required next evidence

1. obtain a scan or separately registered transcription surface that actually contains the four frozen exact witness strings; do not keep retrying the inspected Ming Wanli `四言獨步` variant as if it were exact witness identity;
2. for PEER→WEALTH, require direct scan support for the rob-wealth/劫 boundary; 比肩-only or merely adjacent semantic support is insufficient;
3. if the fixed witness definitions are ever changed to match another textual variant, do so only through a separate reviewed witness re-registration process rather than mutating this evidence layer;
4. preserve digital scan-page identity separately from any printed page/folio claim;
5. reproduce each relevant witness digest only from a scan-verified transcription surface using the frozen exact-substring / UTF-8 / no-normalization contract;
6. preserve the distinction between Yuanhai cross-edition proposition corroboration and exact transcription identity;
7. only after those gates pass may source-integrity qualification be reconsidered.

The separate modern consumer-semantic bridge remains unresolved even after source qualification.

## Guardrails

No provenance-quality mutation, reviewer/trust/attestation fabrication, lifecycle promotion, Production activation, Gyeokguk/強弱/旺衰 implementation, ProductHost/Narrative/LLM semantic expansion, SKU change, or Commerce change occurs here.
