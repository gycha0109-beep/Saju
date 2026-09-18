# General Natal Conclusion T8 — Scan-Backed Source Qualification Audit

Issue: #860  
Audit base: `1d74dd024c9a603d0d65ff956c269523d4c3d235`

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

The repository-authoritative passage definitions place the four still-unverified structural Yuanhai witnesses in `四言獨步`. Direct inspection of the uploaded 46-page `NLC892-2642-210317 第3冊` showed that it ends earlier in the 卷五 song sequence and does not reach `四言獨步`. The registered scan continuation `NLC892-2642-210318 第4冊 / 卷之五` is therefore the correct remaining scan volume. Earlier `雜論口訣 / 實法第一` locator text is not used as witness authority.

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

For the Yuanhai rows, the Ming Wanli scan independently corroborates the proposition but is a distinct edition surface from the current Wikisource witness. Six rows have exact digital scan-page locators and direct bounded-proposition image comparison; the remaining four `四言獨步` rows still require direct inspection in `NLC892-2642-210318 第4冊`. Even completed visual comparison does not authorize exact transcription identity because the registered witnesses remain the separate fixed Wikisource surface.

No witness can therefore be promoted to full scan qualification in this audit.

## Required next evidence

1. identify and visually verify the exact digital scan page(s) for the four remaining `四言獨步` witnesses in `NLC892-2642-210318 第4冊`;
2. directly compare those four scan images with the bounded propositions, preserving the exact 劫財/peer boundary rather than widening from 比肩-only text;
3. preserve digital scan-page identity separately from any printed page/folio claim;
4. reproduce each relevant witness digest from a scan-verified transcription surface using the already-frozen exact-substring / UTF-8 / no-normalization contract;
5. preserve the distinction between Yuanhai cross-edition corroboration and exact transcription identity;
6. only after those gates pass may source-integrity qualification be reconsidered.

The separate modern consumer-semantic bridge remains unresolved even after source qualification.

## Guardrails

No provenance-quality mutation, reviewer/trust/attestation fabrication, lifecycle promotion, Production activation, Gyeokguk/強弱/旺衰 implementation, ProductHost/Narrative/LLM semantic expansion, SKU change, or Commerce change occurs here.
