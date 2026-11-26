# Saju Final Unit 14 — Relationship Semantic Coverage Worklog

**Updated:** 2026-11-26  
**Status:** T5 SOCIALITY RESEARCH CANDIDATE IMPLEMENTED · CI GREEN · GENERAL RELATIONSHIP T8 NOT AUTHORIZED

**Post-merge update (2026-11-26):** PR #2825 was merged into the Unit 08 feature branch at 9dcd1e5929a4ac2b2eababb97737f08504a7a118. PR #2826 was subsequently merged into the Unit 14 feature branch at 3d5656820af471d0c25534bc030add3aa0324796. Neither merge targets main.

## 1. Track scope

This unit concerns `relationship:natal:general` sociality coverage only. Spouse, romance, compatibility, and family-role interpretation remain separate scopes.

The terminal 11-rule authority-seeking surface and the day-branch intimacy replacement lead remain closed. Neither is restored by this unit.

## 2. Source decision

### 2022 Ten-God sociality paper

The full official KoreaScience PDF for 이남연·김기승 (2022), `명리학에서 십성(十星)의 성립과 개념 확장에 관한 연구`, was acquired and reviewed on 2026-11-26.

- Journal: 산업진흥연구 7(1), pp.25-34
- DOI: 10.21186/IPR.2022.7.1.025
- Relevant passages: §5.1, pp.31-33
- Source class: scholarly secondary
- License: CC BY-NC 3.0

The article supports individual Ten-God sociality descriptors and broader human-relations discussion. It does not define a multi-factor relationship synthesis rule. It therefore supports a **T5 sociality facet candidate only**, not T8.

The paper summarizes Kim Ki-seung's modern Myeongri method and cites underlying books that were not independently inspected. The source is non-commercial; the candidate is internal research only and is not authorized for commercial product use without separately established rights.

The candidate keeps visible-stem and branch observation paths separate for provenance. This distinction does not assert source-backed channel-specific meaning, weighting, dominance, or frequency scoring.

See `relationship-natal-sociality-t5-methodology-evidence-v1.md`.

### 2012 《五行结构论》 lead

The official publisher catalogue confirms the 2012-09-01 book identity, ISBN 9787548603986, 169 pages, and a Chapter 5 section on Ten-God kinship/family/interpersonal relations; it also lists separate sections on stem combinations/emotion and marriage. The publisher page exposes metadata and a table of contents, but no public sample or full text. Google Books reports 188 pages and no preview; the pagination discrepancy remains unresolved. The CCTSS catalogue page could not be retrieved, so its electronic-access status is unverified. No lawful public body witness was acquired. This book is not used for the T5 candidate.

## 3. Implementation

- Added `src/research/relationship-natal-sociality-t5-candidate.ts`.
- Added `test/relationship-natal-sociality-t5-candidate.test.ts`.
- Added `docs/research/relationship-natal-sociality-t5-methodology-evidence-v1.md`.
- Candidate contains 20 T5 rules (10 Ten Gods × visible-stem/branch observation paths).
- Each output is one source-bounded sociality facet. No counting, scoring, dominance, cross-facet synthesis, or relationship outcome is produced.
- No T8 consumer or Preview/Official/Production/Commerce integration was added by this unit.

### Existing Relationship T8 research surface — unchanged

The separate `src/research/relationship-natal-multifactor-candidate.ts` remains a research-only candidate (v0.2.0) with 20 relationship T8 rules. Its pack also contains three day-branch intimacy rules. It is not promoted or changed by this unit.

The existing Authority Bridge review (Issue #1797) states that the currently bound general Ten-God and generation/control sources do not establish the exact Relationship-domain projections. The candidate therefore remains `research`; Preview readiness is not Engine semantic authority.

The separate terminal authority-seeking revision v0.7.0 remains a zero-candidate surface. Spouse T8 source-bound runtime and Compatibility T10 are separate scopes and must not be used as general-relationship authority.

## 4. Authority and rights boundary

- The 2022 article is secondary evidence; the methodology, pack, and rules remain `research`.
- CC BY-NC 3.0 does not authorize commercial reuse.
- No spouse, romance, compatibility, family-role, gender-role, relationship-quality, or future-outcome claim is authorized by this paper.
- The paper does not supply a T8 multi-factor synthesis method. General-relationship T8 remains closed.
- No existing official reading, product, or Production authority was changed.

## 5. CI and PR status

- PR: [#2825](https://github.com/gycha0109-beep/Saju/pull/2825)
- Branch: `saju-final-unit-14-relationship-semantic-coverage`
- Base: `saju-final-unit-08-role-semantics`
- HEAD at update: `338069359290da7718f9772a04c5725efa9d6534`
- [Whole Chart Regression run 45757062891](https://github.com/gycha0109-beep/Saju/actions/runs/45757062891): **success**
- PR state at the original worklog snapshot: **OPEN / NOT MERGED**. It was later merged into the Unit 08 feature branch; see the post-merge update above.

Unit 15 is a dependent follow-up PR (#2826), not part of this branch's current HEAD. Its scenario matrix and CI status are recorded in the Unit 15 worklog.

## 6. Next work

1. Relationship T8 was checked against the Authority Bridge and terminal revision; no new admissible candidate was found. Keep its closed surface closed.
2. Unit 16 takes the next independently executable P1 gap: connect the existing annual T9 execution and selected Claims to the joined annual Reader without granting Official authority.
3. Career T8 remains blocked by the existing B22 source-evidence gaps. Do not repeat broad source hunting or promote the T5 sociality paper into T8.

## 7. Completion state

Unit 14 has produced a bounded T5 sociality research candidate and passed its Whole Chart Regression CI. It has **not** completed general-relationship T8 semantic coverage, official reading, Production, or the six-menu roadmap. Do not declare `ROADMAP_COMPLETE`.
