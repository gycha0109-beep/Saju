# I173 — Li 1998 Prior-Witness Identity Acquisition Readiness Review

## Status

`CLOSED / VERIFIED`

## Scope

I173 freezes the bounded evidence-acquisition contract for establishing a reproducible identity of 李顺祥's 1998 prior same-author witness 《四柱命理学自修教程（普及班）》. It does not itself collect final identity evidence, rebind evidence, replace/select candidates, mutate the frozen candidate set/package, adjudicate provenance independence, authorize multi-source composition, create threshold semantics, or authorize production interpretation/classification/numeric scoring.

## Upstream boundary

I172 established that:

- the 2004 《四柱玄机》 witness may not remain presumed normative origin;
- the 1998 same-author witness must undergo exact identity acquisition before any rebinding;
- earlier chronology and same authorship do not establish independent normative provenance;
- three external-lineage questions remain unresolved;
- current `v1-candidate-set` / `v2-input-package` remain immutable and blocked.

## Frozen I173 identity-acquisition controls

1. `EXACT_I172_REASSESSMENT_BOUNDARY_REQUIRED`
2. `AUTHOR_TITLE_AND_1998_APPEARANCE_BASIS_MUST_BE_SEPARATELY_BOUND`
3. `FORMAL_PUBLICATION_METADATA_MUST_NOT_BE_INVENTED_WHEN_ABSENT`
4. `EXPLICIT_NONFORMAL_PUBLICATION_STATUS_MAY_BE_RECORDED_AS_IDENTITY_METADATA`
5. `REPRODUCIBLE_PUBLIC_WITNESS_LOCATOR_REQUIRED`
6. `TARGET_CHAPTER_OR_PASSAGE_WITNESS_INTEGRITY_REQUIRED`
7. `TARGET_PASSAGE_MATCH_TO_2004_WITNESS_REQUIRED`
8. `DUPLICATE_AND_DERIVATIVE_DIGITAL_WITNESS_NORMALIZATION_REQUIRED`
9. `DIGITAL_PAGE_COUNT_MISMATCH_MUST_NOT_ALONE_CREATE_DISTINCT_WORK_IDENTITY`
10. `SAME_AUTHOR_DERIVATIVE_CHAIN_BINDING_MUST_BE_PRESERVED`
11. `EXTERNAL_LINEAGE_UNRESOLVED_STATUS_MUST_BE_PRESERVED`
12. `NO_INDEPENDENCE_REBINDING_SELECTION_MUTATION_OR_REEVALUATION_AT_IDENTITY_ACQUISITION_STAGE`

## Evidence functions

1. `AUTHOR_OFFICIAL_CHRONOLOGY_OR_BIBLIOGRAPHIC_APPEARANCE_BASIS`
2. `PUBLICATION_MEDIUM_OR_EXPLICIT_NONFORMAL_STATUS_METADATA`
3. `REPRODUCIBLE_DIGITAL_OR_PHYSICAL_WITNESS_IDENTITY`
4. `TARGET_CHAPTER_OR_PASSAGE_CONTENT_WITNESS`
5. `SAME_AUTHOR_1998_TO_2004_DERIVATIVE_MATCH_EVIDENCE`
6. `DUPLICATE_WITNESS_NORMALIZATION_METADATA`

## Publication identity paths

Both paths are methodologically permitted:

- `FORMAL_PUBLICATION_IDENTITY_PATH`
- `EXPLICIT_NONFORMAL_PUBLICATION_IDENTITY_PATH`

Publisher/ISBN metadata is not an unconditional prerequisite if the 1998 work circulated through a nonformal/internal publication channel. Where formal metadata is absent, the record must remain explicit rather than inventing publisher/ISBN data.

## Decision

`I172_BOUNDARY_SUPPORTS_LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_WITH_FORMAL_OR_EXPLICIT_NONFORMAL_PUBLICATION_PATHS_DUPLICATE_WITNESS_NORMALIZATION_REQUIRED_NO_REBINDING_NO_INDEPENDENCE`

Consequences:

- identity-evidence collection = authorized for the six bounded functions only
- evidence rebinding = not authorized / not performed
- candidate replacement/selection/removal = not authorized / not performed
- provenance independence = not adjudicated / not established
- chronology, same authorship, publication formality, search silence, source counts, and provenance tiers cannot establish independence
- I132 independent normative provenance requirement remains unchanged
- current `v1-candidate-set` / `v2-input-package` remain immutable and blocked under current evidence
- visible-stem binary effective interaction eligibility remains unresolved
- hidden-stem authority gap remains `SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED`

## Verification

Exact implementation/test HEAD:

`07e58339191f57be090e77ca5d93ae141920f420`

CI:

- run `#1139` — `SUCCESS`
- test files: `231 passed`
- tests: `1494 passed`
- I173 regression tests: `8/8 PASS`
- lint: `PASS`
- typecheck: `PASS`
- build: `PASS`

## Next gate

`I174 — Li 1998 Prior-Witness Identity Acquisition Evidence`

I174 may execute the six evidence functions and preserve unresolved publication-medium or duplicate-normalization findings explicitly. It must not perform rebinding, independence adjudication, candidate/package mutation, threshold creation, or production authorization.
