# General Natal Conclusion T8 — Yuanhai Acquisition Target Registry

Issue: #883  
Audit base: `a0735ab816f4d8c2cc26eb228eee468ee1d0f03c`

## Purpose

The four unresolved Yuanhai witnesses cannot advance from the currently inspected Ming Wanli NLC `四言獨步` surface because #875 / #876 established a textual-variant divergence, and #877 / #878 found no production-admissible alternate 4/4 scan surface.

This registry turns the next evidence step into concrete acquisition targets.

It does **not** treat a catalog record as phrase-level evidence.

## Unresolved witnesses

```text
W-YUANHAI-WEALTH-OFFICER
W-YUANHAI-OFFICER-RESOURCE
W-YUANHAI-PEER-WEALTH
W-YUANHAI-WEALTH-RESOURCE
```

Current direct-scan count remains **12 / 16**.

## P1 — Gangwon Yulgok Korean Studies Archive

```text
catalog id   = YG015-01-470
title        = 新刊合倂官板音義評註淵海子平 卷1~5
books        = 1
size         = 14.7 × 9.8 cm
author       = 徐大升
edition      = 石印本
catalog note = 增補淵海子平音義評註
```

Catalog source:

```text
https://db.yulgok.or.kr/data/media/EB000008_svc.pdf
```

Public page images have not been established.

Acquisition action:

```text
obtain page images or a digital reproduction of the relevant later-volume
surface and inspect 四言獨步 directly
```

## P1 — University of Tokyo Institute for Advanced Studies on Asia

```text
CiNii NCID     = BB19249231
title          = 増補淵海子平音義評註
imprint        = 上海錦章圖書局, [19--]
edition        = 石印本
extent         = 6冊
relevant item  = [4]
call number    = 6402838715
```

Catalog:

```text
https://ci.nii.ac.jp/ncid/BB19249231
```

Public digital scan has not been established.

## P1 — Bukkyo University Library

```text
CiNii NCID     = BA88839860
title          = 新刊合併官板音義評註淵海子平 5卷
imprint        = 千頃堂書局, [19--]
edition        = 石印本
relevant item  = 卷之4-5
call number    = 000241369
```

Catalog:

```text
https://ci.nii.ac.jp/ncid/BA88839860
```

Public digital scan has not been established.

## P1 — Bukkyo University Library / 乾隆51 [1786] 文光堂

```text
CiNii NCID     = BA88832205
title          = 新刊合併官板音義評註淵海子平 5卷
imprint        = 文光堂, 乾隆51 [1786] 刊
extent         = 5冊
relevant item  = 卷之4
call number    = 000241364
```

Catalog:

```text
https://ci.nii.ac.jp/ncid/BA88832205
```

This is a confirmed older printed holding and is directly relevant to the frozen `四言獨步` volume. Public page images have not been established.

## P1 — Bukkyo University Library / 掃葉山房 [清]

```text
CiNii NCID     = BB08851308
title          = 新刋合併官板音義評註淵海子平 5卷
imprint        = 掃葉山房, [清], 刊本
relevant item  = 卷之3-5
call number    = 000241358
size           = 23.7 × 15.3 cm
```

Catalog:

```text
https://ci.nii.ac.jp/ncid/BB08851308
```

The catalog explicitly records `崇禎七年孟冬吉日重梓` and `福建余氏 鐫梓`. This makes it a high-value acquisition target for testing whether the frozen text belongs to a different later impression / transmission branch. Public page images have not been established.

## P1 — University of Tokyo General Library / 敬文堂後印

```text
CiNii NCID     = BB1246745X
title          = 新刊合併官板音義評註淵海子平 5巻
imprint        = 敬文堂, [出版年不明]
relevant item  = 卷之3-5
call number    = A90:1323 / 0005484761
size           = 24 cm
```

Catalog:

```text
https://ci.nii.ac.jp/ncid/BB1246745X
```

The catalog identifies this item as a later impression of the `福建余氏繡梓崇禎7年重梓` blocks. Public page images have not been established.

## P0 — Tianyi Pavilion public 崇禎 scan

```text
asset          = Tianyige-330000-1705-0005007
title          = 新刊合併官板音義評註淵海子平五卷
holding        = Tianyi Pavilion Museum
edition        = 明崇禎刻本
census         = 330000-1705-0005007
call number    = 善2875
pages          = 153
scan size      = 1781 × 1431
SHA-1          = 2ec904422ced60bf241286c6b822623048bb8883
file bytes     = 133016361
```

Commons file:

```text
https://commons.wikimedia.org/wiki/File:Tianyige-330000-1705-0005007_新刊合併官板音義評註淵海子平五卷_宋徐升編_明楊淙增校_明崇禎刻本.pdf
```

The exact registered binary was directly inspected after verifying:

```text
SHA-1      = 2ec904422ced60bf241286c6b822623048bb8883
file bytes = 133016361
pages      = 153
```

Direct image review established:

```text
digital page 113 = 四言獨步 title / section begins
digital pages 113..116 = inspected 四言獨步 surface
digital page 116 = transition into 身弱論 / 棄命從殺論
```

Directly visible variant anchors include:

```text
先財後印
先印後財
印綬根深
```

The four frozen exact witnesses were **not established** within the inspected `四言獨步` surface:

```text
財旺生官                 NOT ESTABLISHED IN 四言獨步
煞化為印                 NOT ESTABLISHED IN 四言獨步
比劫羊刃，財格大忌       NOT ESTABLISHED IN 四言獨步
印綬見財                 NOT ESTABLISHED IN 四言獨步
```

A particularly important negative control is digital page **112**, where `財旺生官` is directly visible **before** the `四言獨步` title page. The same string in a different section does not satisfy the frozen witness identity and is therefore explicitly excluded.

Deterministic outcome:

```text
directInspectionState = DIRECTLY_INSPECTED
exactFrozenWitnessCountEstablished = 0
fixedWitnessDirectVerificationOutcome =
  NOT_ESTABLISHED_TEXTUAL_VARIANT_DIVERGENCE
```

This advances acquisition inspection state only. It does **not** create new direct witness evidence. The next P0 direct-inspection target is the Zhuji Library public scan.

## P0 — Zhuji Library public 福建余氏 scan

```text
assets         = ZJSLib-FLDB-2458-1 / ZJSLib-FLDB-2458-2
title          = 新刊合併官板音義評註淵海子平五卷
holding        = Zhuji Library
edition        = 清福建余氏刻本
layout         = 13行25字小字雙行25字白口四周單邊
part 1         = 138 pages / 64.85 MiB
part 2         = 170 pages / 79.26 MiB
scan size      = 937 × 1608
```

Commons category:

```text
https://commons.wikimedia.org/wiki/Category:新刊合併官板音義評註淵海子平
```

Both public PDFs are directly surfaced by Commons and together cover the five-volume work. The relevant `四言獨步` part/page and frozen witness strings remain to be inspected. No textual identity is inferred from the edition label.

## P2 — Shanghai Fuwen Shuju bibliographic lead

```text
title   = 淵海子平（新刊合併官板音義評註淵海子平）五卷
edition = 清光緒間上海富文書局石印本
```

Bibliographic lead:

```text
https://www.guoxuedashi.com/shumu/gj-1762324oo.html
```

The surfaced record does not establish a holding institution or a retrievable scan. It therefore remains a bibliographic lead only.

## Deterministic counts

```text
unresolvedWitnessCount                 = 4
acquisitionTargetCount                 = 9
confirmedPhysicalHoldingCount          = 6
bibliographicLeadCount                 = 1
publicDigitalPageImageVerifiedCount    = 2
directlyInspectedAcquisitionTargetCount = 1
newDirectWitnessEvidenceCount          = 0
productionAdmissionEvidenceCount       = 0
```

## Acquisition protocol

An acquired target may advance a witness only after:

1. exact item or reproduction identity is pinned to the catalog record;
2. relevant volume and `四言獨步` section are verified;
3. exact image/page/folio locator is recorded without invention;
4. bounded glyphs are read directly from the acquired surface;
5. PEER→WEALTH includes an actual rob-wealth `劫` glyph;
6. orthographic variants are not normalized into frozen hash identity;
7. frozen SHA-256 reproduction is performed as a separate step;
8. any changed source definition uses a separate reviewed witness re-registration process.

## Authority boundary

Still false:

- catalogRecordIsPhraseLevelEvidence
- anyTargetFrozenWitnessContentEstablished
- anyTargetReadyForWitnessPromotion
- witnessReregistrationAuthorized
- exactWitnessHashReproductionAuthorityEstablished
- sourceIntegrityQualificationEstablished
- productionEligibleProvenanceEstablished
- provenanceQualityPromotionAuthorized
- productionAdmissionAuthority

Production remains **HOLD**.
