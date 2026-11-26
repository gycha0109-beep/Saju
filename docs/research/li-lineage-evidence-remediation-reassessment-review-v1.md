# I172 — Li Lineage Evidence Remediation Reassessment Review

## Status

`CLOSED / VERIFIED`

## Scope

I172 reassesses only the remediation implications of the I171 李顺祥 lineage evidence. It does not rebind evidence, select or replace candidates, mutate the frozen candidate set/package, adjudicate provenance independence, authorize multi-source composition, create threshold semantics, or authorize production interpretation/classification/numeric scoring.

## Upstream binding

I171 established the exact boundary:

- prior-same-author derivative dependency found: `1`
- unresolved external-lineage questions: `3`
- explicit negative derivative findings: `0`
- independent normative provenance established: `0`
- 2004 《四柱玄机》 may not remain presumed normative origin without reassessment
- 1998 《四柱命理学自修教程（普及班）》 is an earlier same-author witness, not automatically independent provenance

## Frozen I172 reassessment requirements

1. `EXACT_I171_ONE_DERIVATIVE_THREE_UNRESOLVED_BOUNDARY_REQUIRED`
2. `CURRENT_2004_WITNESS_MUST_NOT_REMAIN_PRESUMED_NORMATIVE_ORIGIN`
3. `PRIOR_1998_SAME_AUTHOR_WITNESS_MUST_NOT_BE_TREATED_AS_NEW_INDEPENDENT_PROVENANCE`
4. `PRIOR_1998_WITNESS_EXACT_IDENTITY_MUST_BE_ESTABLISHED_BEFORE_ANY_REBINDING`
5. `CHEN_YUAN_SELECTED_SET_LINEAGE_REMAINS_UNRESOLVED`
6. `SHAO_WEIHUA_RESEARCH_CENTER_LINEAGE_REMAINS_UNRESOLVED`
7. `ZHANG_ZHICHUN_TARGET_RULE_AUTHORSHIP_REMAINS_UNRESOLVED`
8. `REBINDING_READINESS_MUST_BE_SEPARATE_FROM_REBINDING_EXECUTION`
9. `ANY_FUTURE_REBINDING_REQUIRES_PROSPECTIVE_NEW_CANDIDATE_SET_AND_PACKAGE_GOVERNANCE`
10. `NO_INDEPENDENCE_SELECTION_MUTATION_OR_REEVALUATION_FROM_THIS_REASSESSMENT`

## Prior-witness identity requirements

Before any future rebinding, the 1998 witness must separately establish:

1. `PRIOR_WORK_AUTHOR_AND_TITLE_IDENTITY`
2. `PRIOR_WORK_FIRST_APPEARANCE_OR_PUBLICATION_DATE_BASIS`
3. `PRIOR_WORK_PUBLICATION_MEDIUM_OR_ENTITY_IDENTITY`
4. `TARGET_CHAPTER_OR_PASSAGE_WITNESS_INTEGRITY`
5. `TARGET_PASSAGE_MATCH_TO_2004_WITNESS`
6. `SAME_AUTHOR_DERIVATIVE_CHAIN_BINDING`
7. `EXTERNAL_LINEAGE_UNRESOLVED_STATUS_PRESERVATION`
8. `NO_INDEPENDENCE_INFERENCE_FROM_EARLIER_DATE_OR_SAME_AUTHORSHIP`

## Decision

`I171_LINEAGE_EVIDENCE_ADEQUATE_TO_RETIRE_2004_AS_PRESUMED_ORIGIN_PRIOR_1998_WITNESS_IDENTITY_ACQUISITION_READINESS_MAY_PROCEED_NO_REBINDING_NO_INDEPENDENCE_THREE_EXTERNAL_LINEAGE_QUESTIONS_REMAIN_UNRESOLVED`

Consequences:

- 2004 witness presumed-origin status = retired
- 1998 prior witness identity acquisition readiness review = permitted
- actual evidence rebinding = not authorized / not performed
- candidate replacement/removal/selection = not authorized / not performed
- provenance independence = not established
- I132 independent normative provenance requirement = unchanged
- current `v1-candidate-set` / `v2-input-package` = immutable and blocked under current evidence
- visible-stem binary effective interaction eligibility = unresolved
- hidden-stem authority gap remains `SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED`

## Verification

Exact implementation/test HEAD:

`f34a6e203eae66c4c882779a4bbb70b280b620d1`

CI:

- run `#1136` — `SUCCESS`
- test files: `230 passed`
- tests: `1486 passed`
- I172 regression tests: `8/8 PASS`
- lint: `PASS`
- typecheck: `PASS`
- build: `PASS`

## Next gate

`I173 — Li 1998 Prior-Witness Identity Acquisition Readiness Review`

I173 may define the bounded evidence needed to establish reproducible identity of the 1998 prior same-author witness. It must not itself infer independence from chronology/same authorship, rebind evidence, mutate the candidate set/package, or authorize production behavior.
