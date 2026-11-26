# I174 — Li 1998 Prior-Witness Identity Acquisition Evidence

## Status

`CLOSED / VERIFIED`

## Scope

I174 executes only the six identity-evidence functions authorized by I173 for 李顺祥's 1998 prior same-author witness 《四柱命理学自修教程（普及班）》. It does not perform evidence rebinding, select/replace/remove candidates, mutate the frozen candidate set/package, adjudicate provenance independence, authorize multi-source composition, create threshold semantics, or authorize production interpretation/classification/numeric scoring.

## Evidence outcome

| Evidence function | Finding |
| --- | --- |
| `AUTHOR_OFFICIAL_CHRONOLOGY_OR_BIBLIOGRAPHIC_APPEARANCE_BASIS` | `SATISFIED` |
| `PUBLICATION_MEDIUM_OR_EXPLICIT_NONFORMAL_STATUS_METADATA` | `UNRESOLVED_AFTER_TARGETED_IDENTITY_DISCOVERY` |
| `REPRODUCIBLE_DIGITAL_OR_PHYSICAL_WITNESS_IDENTITY` | `SATISFIED` |
| `TARGET_CHAPTER_OR_PASSAGE_CONTENT_WITNESS` | `SATISFIED` |
| `SAME_AUTHOR_1998_TO_2004_DERIVATIVE_MATCH_EVIDENCE` | `SATISFIED` |
| `DUPLICATE_WITNESS_NORMALIZATION_METADATA` | `UNRESOLVED_AFTER_TARGETED_IDENTITY_DISCOVERY` |

Counts:

- evidence functions executed: `6`
- satisfied: `4`
- unresolved: `2`

## Established evidence

- the author official chronology binds 李顺祥, 《四柱命理学自修教程（普及班）》 and 1998 appearance;
- multiple publicly addressable witnesses bind the work title/author and expose reproducible target content;
- chapter nine `日干`, section `干支紧密度及其生克力量` is reproducibly witnessed;
- the 1998-title witness and 2004 《四柱玄机》 show materially matching target-rule structure/content, preserving the already frozen same-author derivative-chain finding.

## Unresolved evidence

### 1. 1998 publication medium/entity

The inspected author chronology states that the work appeared in 1998 but does not bind the inspected 1998 witness to a publisher or ISBN.

A later formal edition is observable with:

- year: `2002`
- ISBN: `9789627943679`

That later edition metadata is not back-projected to 1998.

A download-site field displaying `非正式出版` is an ambiguous uploader/metadata field and is not treated as authoritative evidence of the 1998 publication medium.

Therefore:

- formal 1998 publisher/ISBN established: `false`
- explicit nonformal 1998 publication status established: `false`
- publication medium/entity identity established: `false`

### 2. Canonical digital witness normalization

Public catalogs expose multiple representations, including observed 314-page and 413-page variants and different file sizes. No inspected evidence establishes one canonical scan or proves that those representation differences create distinct normative work identities.

Therefore:

- digital variants observed: `true`
- canonical digital witness normalization established: `false`
- page-count/file-size differences create distinct authority: `false`
- derivative digital copies count as independent authorities: `false`

## Decision

`LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_EXECUTED_FOUR_FUNCTIONS_SATISFIED_TWO_UNRESOLVED_PUBLICATION_MEDIUM_AND_CANONICAL_WITNESS_NORMALIZATION_UNRESOLVED_NO_REBINDING_NO_INDEPENDENCE`

Consequences:

- identity evidence adequate for immediate rebinding by I174: `false`
- evidence rebinding selected/executed: `false / false`
- candidate/remediation strategy selected: `false`
- candidate-set/package mutation: `false`
- independent normative provenance established: `0`
- I132 independent normative provenance requirement remains normative
- three external-lineage questions remain unresolved
- current `v1-candidate-set` / `v2-input-package` remain immutable and `BLOCKED_UNDER_CURRENT_EVIDENCE`
- visible-stem binary effective interaction eligibility remains unresolved
- hidden-stem authority gap remains `SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED`

## Verification

Exact implementation/test HEAD:

`e7aaef3259f5662355b4abaac0ca442e10e6283e`

CI:

- run `#1142` — `SUCCESS`
- test files: `232 passed`
- tests: `1502 passed`
- I174 regression tests: `8/8 PASS`
- lint: `PASS`
- typecheck: `PASS`
- build: `PASS`

## Next gate

`I175 — Li 1998 Prior-Witness Identity Evidence Adequacy & Rebinding Readiness Review`

I175 may decide whether the I174 evidence package is sufficient for a separate prospective rebinding process. It must fail closed if required identity functions remain unresolved and may only route unresolved gaps to a bounded follow-up discovery gate. It must not itself rebind evidence or infer independence.
