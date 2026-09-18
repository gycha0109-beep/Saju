# General Natal Conclusion T8 — Scan-Backed Source Qualification Audit

Issue: #839  
Audit base: `a45374f0e657729ef28dccb95179b06e1cfa3446`

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

The scan-backed OCR surface contains the `論古人立印食官財名義` material used by the current six Samyeong witnesses. Because the edition identity matches the registered 四庫全書 volume, these rows are recorded as:

```text
SAME_EDITION_SCAN_OCR_CORROBORATED
```

This does not claim that OCR text has been visually checked glyph-for-glyph against the scan image, and it does not establish exact transcription identity or reproduce the existing passage SHA-256.

### 刻京臺增補淵海子平大全

```text
edition = 明萬曆刻本
holding institution = National Library of China
digitization = NLC892-2642-210287/210288/210317/210318
scan = Wikimedia Commons scan collection
corroborating OCR = 識典古籍 scan/OCR surface
```

The Ming Wanli scan-backed surface independently corroborates the bounded propositions used by all ten current Yuanhai witnesses across 卷一、卷三、卷四.

One Yuanhai witness now also has direct image verification:

```text
witness = W-YUANHAI-OUTPUT-WEALTH
scan asset = NLC892-2642-210288 第2冊 / 卷之三
digital scan page = 8
section observed = 論食神
bounded proposition observed = 食神者生我財神之謂也
```

The page number above is the 1-based digital scan-page index. It is not asserted to be a printed page or folio. The scan image was directly compared with the corroborating OCR surface for this bounded proposition only; byte-identical identity with the fixed Wikisource witness is not established.

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
exactDigitalScanPageVerifiedCount = 1
boundedPropositionDirectlyObservedInScanCount = 1
directScanImageComparisonCompletedCount = 1
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

For the Samyeong rows, same-edition scan-backed OCR corroboration establishes a stronger edition link than a mutable transcription alone, but direct image comparison is still pending.

For the Yuanhai rows, the Ming Wanli scan independently corroborates the proposition but is a distinct edition surface from the current Wikisource witness. `W-YUANHAI-OUTPUT-WEALTH` now additionally has an exact digital scan-page locator and direct bounded-proposition image comparison, but that still does not authorize exact transcription identity because the registered witness remains the separate fixed Wikisource surface.

No witness can therefore be promoted to full scan qualification in this audit.

## Required next evidence

1. identify and visually verify the exact digital scan page for the remaining fifteen witnesses;
2. directly compare the remaining scan images with the corroborating transcription/OCR surfaces;
3. preserve digital scan-page identity separately from any printed page/folio claim;
4. reproduce each relevant witness digest from a scan-verified transcription surface using the already-frozen exact-substring / UTF-8 / no-normalization contract;
5. preserve the distinction between Yuanhai cross-edition corroboration and exact transcription identity;
6. only after those gates pass may source-integrity qualification be reconsidered.

The separate modern consumer-semantic bridge remains unresolved even after source qualification.

## Guardrails

No provenance-quality mutation, reviewer/trust/attestation fabrication, lifecycle promotion, Production activation, Gyeokguk/強弱/旺衰 implementation, ProductHost/Narrative/LLM semantic expansion, SKU change, or Commerce change occurs here.
