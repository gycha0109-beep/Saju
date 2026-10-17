# P0-NATAL N27 — Claim-scoped Bridge Research return / no consumer admission

Issue [#2557](https://github.com/gycha0109-beep/Saju/issues/2557) · 2026-10-17 · Watchtower-Track: saju-bridge

**Decision: RETURN_TO_RESEARCH / all five claim types HOLD.** This is a deterministic review snapshot under the existing #1447/#1482 governance, not a new review authority, Rule Registry, semantic approval or reviewer attestation.

## Pinned inputs
- Base `main` SHA: `fbee167b690f08c2e58e72211f196e58e7c04708` at review authoring. Existing source-bounded registry source code blob `9919f4c2e55a4119726a2505cc8bdbf585c27d13`, methodology `M-GENERAL-NATAL-CONCLUSION-SOURCE-BOUNDED-V1@0.2.0-research`, rule subject hash `0fd69bb361ddcf9babd78b3238f9fe51dcda9dcbc1ee34f58654d8002aef2238`, candidate surface hash `420cb351c1288af54ef50fc85972bd080a92a851147d5b71062e8c30b0534cb9`.
- Research [PR #2553](https://github.com/gycha0109-beep/Saju/pull/2553) exact `4d50b66cd0e30122e4a7b782d2249d46f4f76b0b`, **Draft/unmerged**. Source-grade research evidence only. The Research PR's 2010 05:30 vs 19:30 1-vs-0 existing N13 `劫財→財` T8 is an **emission fact**, never a universal classical rule of exclusion or differentiated personal fortune.
- Existing Authority Bridge [#1447](https://github.com/gycha0109-beep/Saju/issues/1447), [#1449](https://github.com/gycha0109-beep/Saju/pull/1449), re-entry [#1482](https://github.com/gycha0109-beep/Saju/issues/1482), manifest of **11 content-addressed subjects**. Existing source qualification incomplete, reviewer domain attestation and trust grant absent, provenance `secondary_only`, stability `contested`.
- Current Preview [`src/preview/preview-semantic-admission.ts`](../../src/preview/preview-semantic-admission.ts): admission entries are **research ID and target-section scoped**, not mere matching Claim Type strings. Existing registry does **not** explicitly admit this source-bounded methodology or the current officer family theme methodology. No entries added.
- Witness boundary (source location corrected): 『淵海子平』 `基礎/論劫財` (甲/乙 劫財/敗財) and 四庫全書本 卷七 `兄弟引例章/妻妾引例章` remain unqualified online transcriptions. The **three additional chapters are directly located under [『三命通會（四庫全書本）/卷05』](https://zh.wikisource.org/zh-hant/三命通會_(四庫全書本)/卷05)**: `論正財/論偏財/時上偏財`. The [general online 卷六](https://zh.wikisource.org/zh-hant/三命通會/卷六) retains `（以下內容與書不合）` before those chapters; it is not the same bibliographic volume locator as 四庫卷06. Different characters include 四庫 `刼` vs general `劫`, and `巳` vs modern normalized `己` (needs full collation). Online chapter location is now **verified**, but printed folio/scan and independent physical witness verification are still absent. No source-integrity promotion or consumer approval.

## Separate exact claim decisions

| Claim type | Registered method/rule | Max observed research-only proposition | Decision |
|---|---|---|---|
| `GENERAL_NATAL_SOURCE_BOUNDED_PEER_TO_WEALTH_ADVERSE` (T8) | `M-GENERAL-NATAL-CONCLUSION-SOURCE-BOUNDED-V1@0.2.0-research`; exact `겁재` + separate Peer/Wealth T5 + same snapshot/scenario | 05:30 T8 emitted 1; 19:30 0; not proof 比肩 has no relationship to 財 | **HOLD** claim/observation/qualifier |
| `TEN_GOD_OFFICER_VISIBLE_STEMS_THEME` (T5) | `M-TEN-GOD-CONSUMER-THEME-YUANHAI@0.1.0-research` | 1984 00:30 hour stem 丙(편관) | **HOLD** |
| `TEN_GOD_OFFICER_BRANCHES_THEME` (T5) | Same research method | 1984 12:30 hour branch 午(정관) | **HOLD** |
| `GENERAL_NATAL_OFFICER_VISIBLE_STEMS_THEME` (T8) | `M-GENERAL-NATAL-USEFUL-SYNTHESIS-YUANHAI@0.1.0-research` | Broad officer-family research theme; no chart-level behavioral meaning | **HOLD** |
| `GENERAL_NATAL_OFFICER_BRANCHES_THEME` (T8) | Same research method | Broad officer-family research theme; no chart-level behavioral meaning | **HOLD** |

**Target section**: `general:natal`. This disposition neither revokes unrelated existing Preview admissions nor grants any new ones. An **observation/qualifier** could only become consumer-visible via a later *explicit* reviewed claim-scoped decision; raw calculated chart facts remain governed by their existing separate calculation contracts.

## Alternative disposition evaluation
- `claim`: NO. Physical source/statement reliability and independent domain-reviewed meaning unsupported.
- `observation`: NO **new bridge admission**. Exact T0 facts are already observable but no authorization to package unreviewed T5/T8 semantics as a new Preview proposition.
- `qualifier`: NO. Channel and 正/偏 change together in 1984 case; cannot infer public/private, stronger/weaker, career/personality effects. In 2010 source semantic context is disputed.
- `hold`: **YES, exact all five**. `RETURN_TO_RESEARCH` does not reject research rule execution and does not convert non-emission into negative classical evidence.

## Minimal re-review prerequisites and owners
**Research:** Collate general editable `卷六` against the now-located 四庫全書本 **卷05** chapters (not 卷06), verify original scan/folio/revision/edition lineage and `以下內容與書不合` note scope; clarify 甲見乙's 敗財/劫財 nomenclature, 卯藏乙 channel and proper-vs-hidden evidence, 正財 versus 偏財, original chart versus 大運, `甲戌` example's one-location multiplicity and 年干己 restriction, month/旺衰 premises and counterexamples. Source lineage/independence must be established; other composite claim bases must not be inferred from peer+wealth co-presence.

**Bridge / independent domain governance:** Re-run existing #1447/#1482 with new content-addressed snapshots; then real independent reviewer/domain attestation on the exact method/rule/claim/source locator and trust grant; provenance-quality promotion and lifecycle promotion remain distinct decisions. Even fully verified sources do not automatically authorize `claim`, `observation` or `qualifier`.

**Engine:** Retain real 2010 N13 1-vs-0 emission and upstream T5 provenance as internal Research regression; keep N15 overclaim and unknown-hour guard, N12 `usefulComplete:false`. No new 比肩→財 engine rule, generic stem/exterior branch/interior template, forced consumer lexical diversification, official/preview/production/LLM/commerce projection without explicit bridge approval.

## Machine-verifiable negative boundary
`src/research/general-natal-p0-n27-claim-scoped-bridge-hold.ts` is a **read-only deterministic audit packet** consuming existing authority. Its `decisionHash` includes observed reviewer/quality status, reference hashes, per-claim HOLD decisions and source locator caveat; it cannot mutate the existing admission registry. Test validates all five decisions, exact `겁재` input, missing explicit admission, no new production authority, and existing candidate-drift fail-closed. If the Research PR HEAD, candidate subjects, or source corpus change, re-review rather than silently reuse this opinion.

**Research Freeze unchanged, Bridge admission HOLD, Draft until separately merged, zero consumer distinct meanings authorized.**

## Reviewed Research-only shadow, not reviewer authorization

Research PR #2553 also adds `src/research/general-natal-p0-n27-bijeon-wealth-shadow.ts` and its real-canonical-snapshot regression. Exact `甲日/甲戌時` fragment matches the 2010 19:30 chart, but carries **no** verified 旺衰, unique 財, `戊巳` scan-character collation or personal-outcome condition. The 05:30 counterpart is an actual non-match and unknown hour remains unavailable. This packet runs without any fabricated human ReviewAttestation and is **not** an admissible InterpretationClaim or source-integrity proof. Five Claim-level HOLD decisions unchanged.

## Additional reviewer-independent source/strength/multiplicity audit (no admission)

Research PR #2553 at exact `4d50b66cd0e30122e4a7b782d2249d46f4f76b0b` extends the existing real-canonical `N27BijeonWealthShadow` v2: 正/偏財 representative observation-slot counts, visible-stem vs branch-representative split, four-branch hidden-stem facts, and a **separate unresolved classical `只要一位` condition**. Multiple observed 財 slots are *not* a source-qualified single-location 格 determination. R020’s governed 旺衰/強弱 semantic-axis authority explicitly forbids any chart-level strength classifier, so `丁丑月` does not imply a final strength verdict.

Original scan file leads, not inspected pages: [CADAL06056481](https://commons.wikimedia.org/wiki/File:CADAL06056481_三命通會·卷五.djvu) (230 pages), [CADAL06066041](https://commons.wikimedia.org/wiki/File:CADAL06066041_三命通會·卷五.djvu) (226 pages). Their exact printed clause folios, independence, character collation and hashes are **not verified**. Two scan *catalog hits* are not two independently authenticated witnesses. The five N27 Claim decisions remain HOLD. No human attestation fabricated, no Production meaning expansion.

## Direct online character collation, not physical scan admission

Exact Research HEAD `4d50b66cd0e30122e4a7b782d2249d46f4f76b0b` adds actual-source digital witnesses for the 「時上偏財」 terminal glyph: [維基文庫四庫卷五](https://zh.wikisource.org/zh-hant/三命通會_(四庫全書本)/卷05) **`柱中不宜再見戊巳`**, [識典古籍卷五](https://www.shidianguji.com/zh/book/HY1521/chapter/1knwennx4qwp8) **`柱中不宜再見戊己`**, [維基文庫一般卷六](https://zh.wikisource.org/zh-hant/三命通會/卷六) **`柱中不宜再見戊己`** with `（以下內容與書不合）` warning. Distinct rendered digital text is not proof of independent historical editions. Original printed glyph **UNRESOLVED**; scan target folio **NOT READ**; source-integrity **HOLD**.

Real 2010 19:30 `年干己` and hidden `戊` at `申` and `戌` are only calculated structural facts; classical applicability remains `NOT_ADJUDICATED` and 旺衰/強弱 `UNCLASSIFIED`. No newly authorized Claim or consumer inference.
