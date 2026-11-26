# Saju Final Unit 14 — Relationship Semantic Coverage Worklog

**Updated:** 2026-11-26  
**Status:** PARTIAL RESEARCH IMPLEMENTATION · T5 SOCIALITY CANDIDATE ADDED · T8 GENERAL RELATIONSHIP NOT AUTHORIZED

## 1. Track scope

This unit concerns `relationship:natal:general` only. Spouse, romance, compatibility, and family-role interpretations remain separate scopes. The previously terminal 11-rule general-relationship candidate and the day-branch intimacy replacement lead remain closed; neither is restored.

## 2. Source decision

### 2022 Ten-God sociality paper

The full official KoreaScience PDF for 이남연·김기승 (2022), `명리학에서 십성(十星)의 성립과 개념 확장에 관한 연구`, was acquired and reviewed on 2026-11-26.

- Journal: 산업진흥연구 7(1), pp.25-34
- DOI: 10.21186/IPR.2022.7.1.025
- Relevant passages: §5.1, pp.31-33
- Source class: scholarly secondary
- License: CC BY-NC 3.0

The article supports individual Ten-God sociality descriptors and broader human-relations discussion. It does not define a multi-factor relationship synthesis rule. It therefore supports a **T5 sociality facet candidate only**, not T8.

The paper summarizes Kim Ki-seung's modern Myeongri method and cites underlying books that were not independently inspected. The source is non-commercial; the candidate is internal research only and cannot be used in the commercial product without separate rights.

See `relationship-natal-sociality-t5-methodology-evidence-v1.md`.

### 2012 《五行结构论》 lead

The publisher catalogue confirms the 2012 book identity and a Chapter 5 section on Ten-God kinship/family/interpersonal relations. The official publisher listing reports 169 pages. Google Books reports 188 pages without a public preview, and CCTSS reports that no electronic edition has been uploaded. The pagination discrepancy remains unresolved and no lawful public body witness was acquired. This book is not used for the T5 candidate.

## 3. Implementation

- Added `src/research/relationship-natal-sociality-t5-candidate.ts`.
- Added `test/relationship-natal-sociality-t5-candidate.test.ts`.
- Added `docs/research/relationship-natal-sociality-t5-methodology-evidence-v1.md`.
- Candidate contains 20 T5 rules (10 Ten Gods × visible-stem/branch channels).
- Every output is one source-bounded sociality facet; no counting, scoring, dominance, or cross-facet synthesis.
- No T8 rule, narrative consumer, Preview route, Official Reading route, Production route, or Commerce route is enabled.
- The earlier incorrect T8 projection candidate based on the 2022 paper was removed before this T5-only implementation.

## 4. Authority and rights boundary

- The article is a secondary source and remains `secondary_only`, `unreviewed`, and `research`.
- CC BY-NC 3.0 prohibits assuming commercial reuse rights.
- No spouse, romance, compatibility, family-role, gender-role, relationship-quality, or future-outcome claim is authorized.
- The paper does not supply a T8 multi-factor synthesis method. General-relationship T8 remains closed.

## 5. Next work

1. Run the candidate test and the repository's whole-chart regression suite through CI.
2. Review the resulting PR and preserve the research-only / non-commercial gate.
3. Continue the six-menu roadmap without reviving the closed T8 candidates. Any future T8 relationship work requires a source that explicitly defines a multi-factor general-relationship method and has usable commercial rights.

## 6. Completion state

Unit 14 has produced a bounded T5 research candidate. It has **not** completed general-relationship T8 semantic coverage and must not be marked as full menu completion.
