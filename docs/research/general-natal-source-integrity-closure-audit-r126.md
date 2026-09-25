# General Natal Source-Integrity Closure Audit — R126

Issue: #1518  
Track: `saju-research`

## Purpose

This artifact converts the Research-return contract merged in #1498 into an exact execution frontier and records the first bounded source-acquisition pass. It does not claim source-integrity completion.

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
| Samyeong v7 peer digital scan | page 174 directly observed |
| Samyeong v7 full source integrity | not established |
| Research terminal state | `BLOCKED_BY_EXTERNAL_SOURCE_ACQUISITION` |
| Bridge re-entry | `RETURN_TO_RESEARCH` |

## Phase 1 — closure matrix

The prior Ming-Wanli Yuanhai inspection records four frozen witnesses as textual divergence:

- `W-YUANHAI-WEALTH-OFFICER`
- `W-YUANHAI-OFFICER-RESOURCE`
- `W-YUANHAI-PEER-WEALTH`
- `W-YUANHAI-WEALTH-RESOURCE`

They remain `ALTERNATE_EXACT_WITNESS_SURFACE_REQUIRED`. No glyph normalization, witness rewrite, or proposition-equivalence shortcut is allowed.

The other twelve witnesses remain `EXACT_IDENTITY_FOLIO_AND_DIGEST_REQUIRED` under the already-governed evidence.

## Phase 2 — bounded source acquisition

Two additional source surfaces were checked without storing raw classical passages in the repository:

1. Wikimedia Commons `NTL-9900014380 / v.2`, a direct scan of `評註淵海子平`.
2. The scan-backed `新刊合併官板音義評注淵海子平` volume-four transcription surface `NGJ892411999032112149610`.

The bounded result is deliberately fail-closed:

| Witness | Result |
|---|---|
| `W-YUANHAI-WEALTH-OFFICER` | exact frozen substring digest located on the NTL scan, but in `挈要捷馳玄妙訣`, not the frozen `四言獨步` section |
| `W-YUANHAI-OFFICER-RESOURCE` | related source surface uses a glyph variant and is in `淵源集說`; exact digest and section both fail |
| `W-YUANHAI-PEER-WEALTH` | no alternate exact scan surface established in this bounded pass |
| `W-YUANHAI-WEALTH-RESOURCE` | exact frozen substring digest located on the NTL scan, but in `格局生死引用`, not the frozen `四言獨步` section |

An exact string in the wrong section is not exact fixed-witness identity. A semantically related glyph variant is also not exact identity.

Therefore all four remain unresolved and R126 records `BLOCKED_BY_EXTERNAL_SOURCE_ACQUISITION`.

This does **not** yet prove that witness re-registration is mandatory. If continued acquisition cannot locate an exact same-section scan surface, a separate reviewed witness re-registration decision becomes the correct next boundary.

## Samyeong v7 peer taxonomy

The existing evidence remains bounded to `CADAL06066043 三命通會·卷七`, digital scan page 174, `兄弟引例章`, with the bounded proposition directly observed. Exact physical page/folio, exact transcription identity, exact witness hash, and full source integrity remain unresolved.

## Authority boundary

This audit grants no ReviewAttestation, ReviewerTrustGrant, provenance promotion, lifecycle promotion, Engine authority, Preview/Official expansion, or Production admission. The actual #1498 evaluator remains `RETURN_TO_RESEARCH`.
