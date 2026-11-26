# I235 — Challenge Combination Support Channel Competing-Relation Settlement Authority Discovery Evidence

## Status

CLOSED — all five I234 discovery paths were executed. Three directly source-bound rule-text candidates were observed across the Shen Xiaozhan original-text and Xu Lewu commentary layers. The evidence materially advances the competing-relation settlement inquiry, but no single candidate satisfies all eight I233 requirements and three requirements have no DIRECT candidate-local coverage.

## Implementation

- implementation HEAD: `6b329656783bd7c9e87d33376a2a532a3e9236c4`
- CI: `#1288` — SUCCESS
- verification: lint PASS / typecheck PASS / test PASS / build PASS
- test files: 293 passed
- tests: 1990 passed
- I235: 8/8 tests passed

## Decision

`FIVE_DISCOVERY_PATHS_EXECUTED_THREE_DIRECT_SOURCE_BOUND_CANDIDATES_OBSERVED_MULTI_RELATION_AND_COMPETING_COMBINATION_RULE_TEXT_FOUND_NO_SINGLE_CANDIDATE_SATISFIES_ALL_EIGHT_REQUIREMENTS_THREE_REQUIREMENTS_LACK_ANY_DIRECT_CANDIDATE_COVERAGE_NO_PRECEDENCE_SETTLEMENT_OR_NET_EFFECT_PROMOTION`

## Direct source-bound candidates

### A. Shen Xiaozhan — original chapter seven

- candidate: `SHEN_XIAOZHAN_ZIPING_ZHENQUAN_ORIGINAL_CH7_ZHANGYUE_HTML`
- author: 沈孝瞻
- work: `子平真诠（原本）`
- section: `七、论刑冲会合解法`
- locator: `https://s.zhangyue.com/read?bid=13096776&cid=8`

Direct rule-level material records that combinations may resolve clashes or punishments, that one resolution can expose or recreate another conflict, that a combination may fail to resolve a clash because of another combination, and that one conflict may redirect or remove another relation. This supplies explicit multi-relation interaction and contextual-exception language.

Candidate-local I233 coverage:

1. `MULTI_TOUCH_SCOPE_EXPLICIT` — DIRECT
2. `RELATION_ID_KIND_PAIR_SCOPE_EXPLICIT` — DIRECT
3. `CURRENT_VS_COMPETING_ROLE_SCOPE_EXPLICIT` — PARTIAL
4. `CROSS_RELATION_PRECEDENCE_OR_COEXISTENCE_SEMANTICS` — DIRECT
5. `PRECEDENCE_VS_RELATION_OUTCOME_SEPARATION` — PARTIAL
6. `WHOLE_CONFIGURATION_CONTEXT_AND_EXCEPTION_CONDITIONS` — DIRECT
7. `TIE_CONFLICT_OR_UNRESOLVED_FAIL_CLOSED_DISPOSITION` — NOT_ESTABLISHED
8. `EXACT_SOURCE_IDENTITY_ORIGINAL_CONTEXT_AND_REPRODUCIBLE_LOCATOR` — DIRECT

Direct: 5 / Partial: 2 / Not established: 1.

### B. Xu Lewu commentary on chapter seven

- candidate: `XU_LEWU_ZIPING_ZHENQUAN_PINGZHU_CH7_IWZBZ_HTML`
- work: `子平真诠评注`
- layer: 沈孝瞻 original text + 徐乐吾 commentary
- section: `论刑冲会合解法`
- locator: `https://www.iwzbz.com/artical/h5book/v5/3_1_2_9.html`

The commentary directly states that combination and clash can mutually resolve each other, that the result depends on position and the nature of the relation, and that there is no single fixed method that can be applied universally. The page also preserves worked source-local cases for combination resolving clash, clash resolving combination, and context-sensitive exceptions.

Candidate-local I233 coverage:

1. DIRECT
2. DIRECT
3. PARTIAL
4. DIRECT
5. PARTIAL
6. DIRECT
7. NOT_ESTABLISHED
8. DIRECT

Direct: 5 / Partial: 2 / Not established: 1.

This commentary layer is not adjudicated as an independent authority from the underlying work in I235.

### C. Competing combination / `争合妒合`

- candidate: `SHEN_XIAOZHAN_ZIPING_ZHENQUAN_CH5_COMPETING_COMBINATION_IWZBZ_HTML`
- work: `子平真诠评注`
- section: `论十干合而不合`
- locator: `https://www.iwzbz.com/artical/h5book/v5/3_1_2_7.html`

The text directly describes two combinations competing for one participant (`争合妒合`) and also records a positional-separation exception under which the competition is removed. This is directly relevant to combination-vs-combination competition and position-sensitive coexistence/competition semantics.

Candidate-local I233 coverage:

1. DIRECT
2. DIRECT
3. PARTIAL
4. DIRECT
5. PARTIAL
6. DIRECT
7. PARTIAL
8. DIRECT

Direct: 5 / Partial: 3.

## Direct coverage gaps

No candidate in this pass has DIRECT candidate-local coverage for:

1. `CURRENT_VS_COMPETING_ROLE_SCOPE_EXPLICIT`
2. `PRECEDENCE_VS_RELATION_OUTCOME_SEPARATION`
3. `TIE_CONFLICT_OR_UNRESOLVED_FAIL_CLOSED_DISPOSITION`

This means direct evidence has been observed for five of the eight requirement classes, but that is an inventory statement only. It may not be converted into synthetic eight-of-eight coverage by combining candidates.

## Methodological boundary

- candidate set union may not be treated as one authority
- no cross-source composition
- no semantic-bridge inference
- no majority-vote or source-count rule
- same-work/commentary relationships remain visible
- derivative relationship not adjudicated
- provenance independence not adjudicated
- normative admissibility not adjudicated
- no candidate registration or selection
- no authority promotion
- no competing-relation settlement resolution
- no cross-relation precedence authorization
- no multi-touch aggregation authorization

## Preserved downstream guards

- support-channel activation/persistence/destruction/net effect remain unresolved
- target post-relation root state remains `not_determined`
- effective mechanism force remains `not_determined`
- I232 hidden-stem HOLD remains preserved and is not reopened
- hidden-stem authority gap remains `SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED`
- visible-stem binary effective-interaction eligibility remains unresolved
- Qu Wei 2001 HOLD remains preserved
- Li 1998 same-target path remains `SUSPENDED_NOT_RETIRED`
- I132 remains normative and unrelaxed
- current v2 package/candidate set remains immutable
- current v2 provenance disposition remains `BLOCKED_UNDER_CURRENT_EVIDENCE`
- no evidence rebinding, composition, threshold creation, damage evaluation, classification, numeric scoring, or production execution

## Next gate

`COMPETING_RELATION_SETTLEMENT_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION_READINESS_REVIEW`

I236 may freeze the candidate-local 3 × 8 coverage matrix and evaluation controls. It must preserve requirements 3, 5, and 7 as direct-coverage gaps and must prohibit union coverage across candidates.