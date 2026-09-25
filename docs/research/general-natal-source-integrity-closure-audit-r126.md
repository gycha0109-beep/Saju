# General Natal Source-Integrity Closure Audit — R126

Issue: #1518  
Track: `saju-research`

## Purpose

This artifact converts the Research-return contract merged in #1498 into an exact execution frontier and records bounded source-acquisition passes. It does not claim source-integrity completion.

## Current deterministic result

| Surface | Current result |
|---|---|
| Candidate binding | fresh |
| Fixed T8 witnesses | 16 |
| Direct digital scan page verified in prior evidence | 12 / 16 |
| Frozen-witness textual divergence | 4 / 16 |
| Full fixed-witness source integrity | 0 / 16 |
| Divergent witnesses with same exact string found on another scan | 2 / 4 |
| Divergent witnesses with exact same-section identity | 0 / 4 |
| Additional same-work 1634 volume-four scan | acquired |
| 1634 scan-backed transcription | 四言獨步 located, frozen exact sequence not established |
| Newly acquired alternate direct scans | 3 files / 461 pages |
| Additional cataloged edition leads | 3 |
| Samyeong v7 peer digital scan | page 174 directly observed |
| Samyeong v7 full source integrity | not established |
| Research terminal state | `BLOCKED_BY_EXTERNAL_SOURCE_ACQUISITION` |
| Bridge re-entry | `RETURN_TO_RESEARCH` |

## Fixed textual divergences

The prior Ming-Wanli Yuanhai inspection records four frozen witnesses as textual divergence:

- `W-YUANHAI-WEALTH-OFFICER`
- `W-YUANHAI-OFFICER-RESOURCE`
- `W-YUANHAI-PEER-WEALTH`
- `W-YUANHAI-WEALTH-RESOURCE`

They remain `ALTERNATE_EXACT_WITNESS_SURFACE_REQUIRED`. No glyph normalization, witness rewrite, or proposition-equivalence shortcut is allowed.

## Acquisition pass 1

Two source surfaces were checked without storing raw classical passages:

1. Wikimedia Commons `NTL-9900014380 / v.2`, a direct scan of `評註淵海子平`.
2. The scan-backed `新刊合併官板音義評注淵海子平` volume-four transcription surface `NGJ892411999032112149610`.

Results:

| Witness | Result |
|---|---|
| `W-YUANHAI-WEALTH-OFFICER` | exact frozen substring digest located, but in `挈要捷馳玄妙訣`, not frozen `四言獨步` |
| `W-YUANHAI-OFFICER-RESOURCE` | related surface uses a glyph variant and is in `淵源集說`; exact digest and section fail |
| `W-YUANHAI-PEER-WEALTH` | no alternate exact scan surface established |
| `W-YUANHAI-WEALTH-RESOURCE` | exact frozen substring digest located, but in `格局生死引用`, not frozen `四言獨步` |

## Acquisition pass 2 — 1634 余氏善成堂 volume four

A second same-work direct scan is now registered in the audit:

`NLC892-411999032112-149659 / 新刊合併官板音義評注淵海子平 / 第4冊 / 卷四`

Wikimedia Commons identifies it as a 29-page scan of the 余氏善成堂 崇禎七年 edition. The corresponding scan-backed transcription explicitly locates `四言獨步`.

The transcription is textually divergent from the frozen witness surface. It does not establish the four frozen exact strings inside `四言獨步`. In particular, the same volume exposes `殺化爲印` outside the frozen section, which is not byte-identical to frozen `煞化為印`.

This is **not** treated as proof that the scan image lacks the targets. OCR/transcription absence is not direct scan-image absence. The exact four target glyph surfaces still require direct image comparison before this 1634 scan can be accepted or rejected as the exact witness surface.

## Acquisition pass 3 — Tianyi and Zhuji direct scans

The acquisition frontier advanced again with three directly downloadable scan files:

- Tianyi Pavilion `Tianyige-330000-1705-0005007`: `新刊合併官板音義評註淵海子平五卷`, Ming Chongzhen edition, all five volumes in one 153-page scan. Commons exposes catalog SHA-1 `2ec904422ced60bf241286c6b822623048bb8883`.
- Zhuji Library `ZJSLib-FLDB-2458-1`: Qing Fujian Yushi edition, first book, 138 pages.
- Zhuji Library `ZJSLib-FLDB-2458-2`: Qing Fujian Yushi edition, second book, 170 pages.

These are now acquisition surfaces rather than mere catalog leads. The Tianyi file is especially useful because its metadata says the single scan contains all five volumes, so volume four cannot be missing from the acquired file.

No target identity is promoted yet. The exact `四言獨步` page range and the four frozen target glyphs have not been directly compared on these newly acquired files. The two Zhuji files also require an internal volume-to-file mapping before target inspection.

## Additional acquisition leads

The bounded catalog search located further editions but not directly inspectable digital scan surfaces in this pass:

- 清光緒間上海富文書局石印本;
- 清乾隆三十六年（1771）聚錦堂刻本;
- 掃葉山房後印本.

They remain acquisition leads only. No catalog record is promoted into witness identity.

## Samyeong v7 peer taxonomy

The existing evidence remains bounded to `CADAL06066043 三命通會·卷七`, digital scan page 174, `兄弟引例章`, with the bounded proposition directly observed. Exact physical page/folio, exact transcription identity, exact witness hash, and full source integrity remain unresolved.

## Current Research disposition

`BLOCKED_BY_EXTERNAL_SOURCE_ACQUISITION` remains correct.

Witness re-registration is not yet authorized or declared mandatory. It becomes the next review boundary only if continued acquisition/direct image inspection fails to establish an exact same-section scan surface.

## Authority boundary

This audit grants no ReviewAttestation, ReviewerTrustGrant, provenance promotion, lifecycle promotion, Engine authority, Preview/Official expansion, or Production admission. The actual #1498 evaluator remains `RETURN_TO_RESEARCH`.
