# General Natal Conclusion T8 — Scan-Backed Source Qualification Audit

Issue: #793  
Audit base: `1781e0c72a95360aeac18b3f245da4b46cd8cf65`

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

For the Yuanhai rows, the Ming Wanli scan independently corroborates the proposition but is a distinct edition surface from the current Wikisource witness. It must not be used to assert exact transcription identity.

No witness can therefore be promoted to full scan qualification in this audit.

## Required next evidence

1. identify and visually verify the exact physical scan page or folio for each witness;
2. directly compare the scan image with the corroborating transcription/OCR surface;
3. define the exact extraction and normalization contract used for witness hashing;
4. independently reproduce each relevant SHA-256 from that contract;
5. preserve the distinction between Yuanhai cross-edition corroboration and exact transcription identity;
6. only after those gates pass may source-integrity qualification be reconsidered.

The separate modern consumer-semantic bridge remains unresolved even after source qualification.

## Guardrails

No provenance-quality mutation, reviewer/trust/attestation fabrication, lifecycle promotion, Production activation, Gyeokguk/強弱/旺衰 implementation, ProductHost/Narrative/LLM semantic expansion, SKU change, or Commerce change occurs here.
