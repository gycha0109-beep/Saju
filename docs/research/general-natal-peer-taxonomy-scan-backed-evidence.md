# General Natal — Samyeong Volume-7 Peer-Taxonomy Scan-Backed Evidence

Issue: #829  
Supersedes the weaker direct-inspection state recorded by #812 / PR #813 without changing the peer-family rule semantics.

## Purpose

This artifact binds the peer-family second classical source introduced by #807 to a directly inspected page in the same-edition CADAL scan.

The new evidence is deliberately narrow: it establishes the exact **digital scan page** and a direct visual proposition-level match. It does not claim a verified printed folio/page number, byte-identical transcription identity, scan-derived witness-hash reproduction, reviewer authority, provenance promotion, or Production admission.

## Bound source

```text
sourceId = SRC-SAMYEONG-TONGHOE-V7-FOUR-LIBRARIES-PEER-TAXONOMY
text = 三命通會（四庫全書本）卷七
section = 兄弟
repository bounded proposition = 兄弟者，即劫財比肩
direct scan observed text = 兄弟者即劫財比肩
```

The comma in the repository proposition is editorial punctuation. The direct scan observation is recorded without inserting punctuation into the source image.

The evidence builder remains bound to the exact content-addressed `0.2.0-research` peer-family T5 rule in the current registry snapshot.

## Same-edition scan authority

```text
Wikimedia Commons
CADAL06066043 三命通會·卷七.djvu
edition = 欽定四庫全書本
holding institution = Zhejiang University Library
digitization = CADAL06066043
page count = 198
```

Chinese Text Project remains a corroborating OCR surface for the same digitization family. The direct-image claim below no longer depends on OCR alone.

## Direct scan inspection

The original 198-page DjVu file was directly decoded and inspected. `兄弟引例章` is located on **digital scan page 174** and the source image visibly contains:

```text
兄弟者即劫財比肩
```

Reproducible identifiers from the inspected upload/page are:

```text
uploadedDjvuSha1 = eeb9f80eb97fd385a580aa5bfda28c292aa7761c
digitalScanPage = 174
pageFormDjvuSha256 = f0d83bf196e4b9752d63ad4340f5d74a1f29a6bebf88315b601488fb8fc62ba9
pageSjbzSha256 = fcdd51135abeeb0b22637b7852c809848c74b482ae71a0092d336a2f75cca57b
```

This establishes:

```text
sameEditionScanAuthorityLocated = true
sameEditionDigitizationFamilyEstablished = true
sameEditionScanOcrPropositionCorroborated = true
exactDigitalScanPageVerified = true
boundedPropositionDirectlyObservedInScan = true
directScanImageComparisonCompleted = true
```

## What remains unestablished

Digital page 174 is the page index inside this DjVu object. It is not asserted to be a printed folio/page number because no separate physical folio/page marker was independently established.

The page object hashes identify the inspected binary page representation. They are not the existing repository witness-text hash and must not be presented as such.

Accordingly:

```text
exactPhysicalPageOrFolioVerified = false
exactWitnessHashReproducedFromScan = false
exactTranscriptionIdentityEstablished = false
fullSourceIntegrityQualificationEstablished = false
```

Direct proposition-level visual agreement is therefore stronger than the previous OCR-only state, but it is still narrower than complete source-integrity qualification.

## Peer-rule scope remains unchanged

This evidence does not change rule semantics. The peer T5 rule continues to use:

```text
淵海子平 peer taxonomy
+
三命通會卷七 peer taxonomy
```

The Samyeong volume-five taxonomy source remains excluded from peer-family taxonomy support.

The downstream `PEER -> WEALTH` structural relation still requires exact `겁재`; 比肩-only presence is not widened into the relation.

## Lifecycle and provenance boundary

Nothing is promoted by this direct scan verification:

```text
peer rule status = research
peer rule provenanceQuality = secondary_only
peer rule reviewerStatus = unreviewed
sourceIntegrityQualificationEstablished = false
provenanceQualityPromotionAuthorized = false
domainReviewAuthorityEstablished = false
productionAdmissionAuthority = false
Production = HOLD
```

A future source-integrity promotion would still require the remaining governed evidence, including any required exact transcription/witness-hash identity, and the separate real domain-review/trust chain.

## External evidence surfaces

```text
Commons scan:
https://commons.wikimedia.org/wiki/File:CADAL06066043_%E4%B8%89%E5%91%BD%E9%80%9A%E6%9C%83%C2%B7%E5%8D%B7%E4%B8%83.djvu

CText library metadata:
https://ctext.org/library.pl?if=gb&res=6109

CText volume-7 scan-backed OCR:
https://ctext.org/wiki.pl?chapter=548506&if=gb
```

## Non-scope

No printed folio/page number is guessed. No OCR-to-image identity is claimed. No page-object hash is relabeled as the witness-text hash. No provenance-quality mutation, reviewer identity, review attestation, trust grant, lifecycle promotion, consumer semantic expansion, Gyeokguk, 強弱, 旺衰, Yongshin, timing, SKU, ProductHost, Narrative, LLM semantic expansion, or Commerce change is introduced.
