# SA-7D-B1 — Ming printed source L1 six of eight, independent Annual HOLD

> Watchtower-Track: `saju-research` · Research-only printed-page audit. No product/official reading/bridge/engine/monthly authority.

## 1. Direct print source and exact added pages (2026-10-09)

- 『三命通會』 **卷之五上**. NLC `NLC892-411999029701-67240` 第9冊, 明萬曆刻本. Commons official PDF **page 32 (1-based), zero index 31**, heading `論正財`: `正財者乃甲見己乙見戊之例`. This is **甲→己 正財** direct **natal-stem nomenclature L1**, not the prior `正妻` substitution. JPEG SHA-256 `0e3e4af21e99f90b4ba98f519153fb839ccdf38be2a52028c79d11b54101b338`, exact source Commons declared-original SHA-1 `86e7df99e24311edc080910e6d495c7bc21873a3`. Original PDF downloaded/hash locally: **NO**. Evidence: [Actions #37821569245](https://github.com/gycha0109-beep/Saju/actions/runs/37821569245), artifact `11570160182`.
- 『三命通會』 **卷之七下**. NLC `NLC892-411999029701-66491` 第14冊, 明萬曆刻本. Commons official PDF **page 46 (1-based), zero index 45**, heading `論六親`; main paragraph: `六甲生人以癸水爲母癸爲正印如遇己土正財`. This directly witnesses **甲→癸 正印**, and independently corroborates **甲→己 正財**, in **六甲生人 natal context only**. JPEG SHA-256 `71ac0f2f18826fdb5568692422328f3771ee4da2df3ccff15223a309d464a52a`, original Commons-declared SHA-1 `e23875add1ce23db1b3be3251433af3e0f46d641`; original PDF downloaded/hash locally: **NO**. Evidence: [Actions #37822071162](https://github.com/gycha0109-beep/Saju/actions/runs/37822071162), artifact `11569776270`.
- Both source files retrieved only via official Wikimedia Commons imageinfo-issued PDF **derived page JPEG** (not original PDF), JPEG integrity checked and hashes cross-verified. Scanned page content was manually visually inspected at larger scale.
- Additional scouts: [Actions #37820653476](https://github.com/gycha0109-beep/Saju/actions/runs/37820653476), artifact `11569092362` (vols 11,12,13,14; 16 pages) and [#37821035712](https://github.com/gycha0109-beep/Saju/actions/runs/37821035712), artifact `11568114977` (vols 12,14; 10 pages). **Neither scout is used as direct evidence for missing 甲→甲/甲→乙 names.** All scoped job timeouts 8 minutes.

## 2. Combined, pair-independent Ming print L1 table

| day-stem pair | precise historical printed page | L1 | L2 annual-specific |
|---|---|---|---|
| 甲→甲 比肩 | none directly verified | **UNVERIFIED** | none |
| 甲→乙 劫財 | none directly verified | **UNVERIFIED** | none |
| 甲→丙 食神 | 第10冊 卷五下 p25 `論食神` | **VERIFIED** | none |
| 甲→丁 傷官 | 第10冊 卷五下 p19 `論傷官` | **VERIFIED** | none |
| 甲→己 正財 | 第9冊 p32 `論正財`, also 第14冊 p46 | **VERIFIED** | none |
| 甲→辛 正官 | 第9冊 卷五上 p3, p5 | **VERIFIED** | none |
| 甲→壬 偏印 | 第10冊 卷五下 p12: `倒食即偏印之謂` + `今甲見壬為倒食者` | **VERIFIED** | none |
| 甲→癸 正印 | 第14冊 卷七下 p46 `六甲生人...癸爲正印` | **VERIFIED** | none |

Verified historical printed day-stem nomenclature **6/8**. Direct printed **Annual** day-stem versus year-stem applicability **0/8 newly verified**. All 8 requested `sourceSupportGrade='INSUFFICIENT'`; `bridgeReentryReady=false`, `Production='HOLD'`, monthly semantic promotion forbidden. Existing two original annual relations are unchanged.

## 3. School/version terminology trap (L0 only)

- Community transcription of 『淵海子平』 「基礎」 directly lists `以甲為例見甲：為比肩`, `見乙：為劫財、敗財` without a provenance-verified Ming printed page. Community transcription in its separate 「論劫財」 distinguishes `五陽見五陰為敗財`, `五陰見五陽為劫財`; some editions/commentaries specify `甲見乙為敗財，乙見甲為劫財`. A grouped `劫財、敗財` label is **not** necessarily a verbatim `甲見乙為劫財` in the exact scanned edition. **Never merge school terminology silently.**
- Printed alternative source candidate: 『刻京臺增補淵海子平大全』 明萬曆刻本, NLC `NLC892-2642-210287` 第1冊 / `NLC892-2642-210288` 第2冊. Only catalog and separately published transcription lead verified so far; no exact independently bound printed pair yet.
- In the 『三命通會』 NLC volume 3 section `論正印`, "正印" denotes a separate use and is **not interchangeable** with this day-stem identity claim. Direct bound evidence for `甲→癸 正印` comes solely from 第14冊 `論六親`.

## 4. Research handoff / cessation criteria

- Historical first four-pair audit docs (`general-annual-sa7d-b1-ming-volume5-page-preview-witness-v1.md` and `general-annual-sa7d-b1-ming-volume5-lower-four-l1-witness-audit-v1.md`) remain **historical 4/8 snapshots**. This is the later **6/8 superseding supplement**, not a rewrite of original witness quotes.
- Resolve remaining 甲→甲 比肩 and 甲→乙 劫財 **individually** against a specific print edition; differentiate 敗財 vs 劫財 with an explicit recorded naming convention.
- Independently review annual-stem semantics only where historical source explicitly addresses year-stem or 流年/行年/太歲 application. Mere natal-day-stem naming (L1) does not satisfy L2.
- Any original PDF hashes in catalog are Commons **declared** values only, not a locally downloaded original binary verification.
- Permanent CI/workflow additions prohibited. One-off acquisition workflow on research probe branch must be deleted after research; this clean-docs PR contains zero code/workflow modifications.

**Exit:** A=6/8 exact historical printed natal names PASS(partial); B=2/8 unresolved, Annual L2=0, original PDF binary pending HOLD; C=Bridge/Production fail-closed PASS.
