# I179 — Li 1998 Direct Primary Witness & Variant Normalization Evidence Acquisition Readiness Review v1

## Status

CLOSED_PENDING_EXACT_CLOSEOUT_CI

## Purpose

I179 freezes the admissible evidence classes and acquisition protocol for two still-unresolved Li Shunxiang 1998 witness-identity lanes:

1. 1998 publication-medium / issuing-entity identity;
2. canonical digital-witness normalization across observed 314-page / 413-page representations.

This is a readiness gate only. It does not acquire evidence or authorize rebinding.

## Exact implementation authority

- Final implementation/test HEAD: `ee0116d0d1b18ce39860fd05b3f6e9fe9156db99`
- Exact-head CI: `#1157`
- CI result: `SUCCESS`
- Test files: `237 passed`
- Tests: `1542 passed`
- I179 regression tests: `8/8 passed`
- lint: `PASS`
- typecheck: `PASS`
- build: `PASS`

## Decision

```text
DIRECT_PRIMARY_WITNESS_AND_VARIANT_NORMALIZATION_ACQUISITION_PROTOCOL_FROZEN_TWO_LANES_READY_NO_EVIDENCE_ACQUIRED_NO_REBINDING_NO_INDEPENDENCE
```

## Frozen acquisition lanes

### Lane A — 1998 publication identity

Admissible evidence classes:

1. `1998_TITLE_PAGE_COPYRIGHT_PAGE_COLOPHON_OR_IMPRINT_IMAGE`
2. `1998_LIBRARY_ARCHIVE_OR_BIBLIOGRAPHIC_AUTHORITY_RECORD_WITH_EXPLICIT_PUBLICATION_FIELDS`
3. `1998_PUBLISHER_ISSUER_DISTRIBUTOR_OR_AUTHOR_PRIMARY_RECORD_EXPLICITLY_BINDING_THE_WORK`
4. `1998_DATED_NONFORMAL_SELF_ISSUED_COURSE_MANUSCRIPT_OR_DISTRIBUTION_STATUS_RECORD`

Both formal-publication and explicitly documented nonformal-publication paths are admissible, but every successful binding must be specific to the 1998 work/witness.

The following remain insufficient:

- later 2002 formal-edition metadata;
- company creation recorded in the same chronology entry;
- ambiguous resource-site uploader fields.

### Lane B — digital-witness normalization

Admissible evidence classes:

1. `DIRECT_314_PAGE_DIGITAL_OR_PAGE_IMAGE_WITNESS`
2. `DIRECT_413_PAGE_DIGITAL_OR_PAGE_IMAGE_WITNESS`
3. `COMPARATIVE_TITLE_IMPRINT_AND_COPYRIGHT_PAGE_RECORD`
4. `COMPARATIVE_TOC_PAGINATION_AND_TARGET_PASSAGE_RECORD`
5. `COMPARATIVE_ADDITION_DELETION_REORDERING_AND_SCAN_ARTIFACT_RECORD`
6. `CRYPTOGRAPHIC_HASH_OR_STABLE_FILE_IDENTITY_RECORD`

Normalization requires direct comparable witness material and structural comparison across title/imprint, pagination, TOC, target passage, and additions/deletions/reordering or scan artifacts.

OCR/search snippets, page count, file size, and filename alone cannot resolve variant relationships.

## Frozen requirements

1. `EXACT_I178_REASSESSMENT_BOUNDARY_REQUIRED`
2. `TWO_ACQUISITION_LANES_MUST_REMAIN_SEPARATE_UNTIL_EACH_GAP_IS_RESOLVED`
3. `PUBLICATION_IDENTITY_EVIDENCE_MUST_BIND_EXPLICITLY_TO_THE_1998_WORK_OR_1998_WITNESS`
4. `FORMAL_PUBLICATION_PATH_MAY_USE_DIRECT_IMPRINT_COLOPHON_LIBRARY_OR_ARCHIVE_AUTHORITY_RECORD`
5. `NONFORMAL_PUBLICATION_PATH_REQUIRES_EXPLICIT_DATED_SELF_ISSUED_COURSE_MANUSCRIPT_OR_DISTRIBUTION_STATUS_EVIDENCE`
6. `LATER_EDITION_METADATA_COMPANY_CHRONOLOGY_AND_AMBIGUOUS_UPLOAD_FIELDS_MUST_NOT_BACKFILL_1998`
7. `VARIANT_NORMALIZATION_REQUIRES_DIRECT_ACCESS_TO_COMPARABLE_314_AND_413_REPRESENTATIONS_OR_EQUIVALENT_PRIMARY_PAGE_SETS`
8. `VARIANT_COMPARISON_MUST_INCLUDE_TITLE_IMPRINT_PAGINATION_TOC_TARGET_PASSAGE_AND_STRUCTURAL_CHANGE_CHECKS`
9. `CRYPTOGRAPHIC_OR_STABLE_FILE_IDENTITY_SHOULD_BE_RECORDED_WHEN_ACTUAL_DIGITAL_FILES_ARE_ACQUIRED`
10. `OCR_SEARCH_SNIPPETS_PAGE_COUNT_FILE_SIZE_AND_FILENAME_ALONE_MUST_NOT_RESOLVE_VARIANT_RELATIONSHIPS`
11. `RESOLUTION_OF_ONLY_ONE_LANE_MUST_NOT_AUTHORIZE_REBINDING`
12. `NO_SELECTION_MUTATION_INDEPENDENCE_REEVALUATION_OR_POLICY_RELAXATION_AT_READINESS_STAGE`

## Readiness outcome

- acquisition lanes ready: `2`
- publication-identity evidence acquired: `0`
- variant-normalization evidence acquired: `0`
- publication gap resolved: `false`
- normalization gap resolved: `false`
- one-lane resolution sufficient for rebinding: `false`
- both identity functions required before rebinding readiness: `true`
- evidence rebinding ready: `false`
- evidence rebinding authorized: `false`
- provenance independence adjudicated: `false`
- targeted discovery exhaustion: `false`
- corpus exhaustion: `false`

## Authority guards preserved

- I132 independent normative provenance requirement remains normative.
- The 1998 -> 2004 same-author derivative chain remains bound.
- Three external-lineage questions remain unresolved.
- Current v2 package and candidate set remain immutable and blocked.
- No evidence rebinding, candidate selection, remediation selection/execution, candidate mutation/removal/replacement, new candidate-set version, or new input-package version occurs.
- No candidate-set reevaluation or admissibility decision is authorized.
- No production policy execution, actual composition, multi-source composition, visible-stem binary eligibility resolution, threshold creation, damage evaluation, classification, numeric scoring, or production interpretation is authorized.
- Hidden-stem authority gap remains exactly:
  `SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED`

## Next gate

Recommended:

`I180 — Li 1998 Direct Primary Witness & Variant Normalization Evidence Acquisition Record`

I180 may execute the two frozen acquisition lanes and record whatever primary/bibliographic/direct-comparison evidence is actually obtainable. Failure to obtain such evidence must remain an unresolved finding, not an explicit negative or corpus-exhaustion claim.
