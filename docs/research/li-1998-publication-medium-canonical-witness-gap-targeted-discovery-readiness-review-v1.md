# I176 — Li 1998 Publication-Medium & Canonical-Witness Gap Targeted Discovery Readiness Review

## Status

`CLOSED / VERIFIED`

## Scope

I176 freezes a bounded discovery contract for exactly the two unresolved I175 identity gaps. It does not execute discovery, rebind evidence, adjudicate provenance independence, select/replace/remove candidates, mutate candidate/package state, create threshold semantics, or authorize production behavior.

## Target gaps

1. `LI_1998_PUBLICATION_MEDIUM_OR_ENTITY_IDENTITY_GAP`
2. `LI_1998_CANONICAL_DIGITAL_WITNESS_NORMALIZATION_GAP`

## Frozen controls

1. `EXACT_I175_TWO_GAP_BOUNDARY_REQUIRED`
2. `DISCOVERY_MUST_REMAIN_LIMITED_TO_TWO_REGISTERED_GAPS`
3. `PUBLICATION_MEDIUM_FINDING_REQUIRES_1998_SPECIFIC_BINDING`
4. `LATER_EDITION_METADATA_MAY_SUPPORT_LINEAGE_BUT_NOT_BACKFILL_1998`
5. `AMBIGUOUS_CATALOG_OR_UPLOADER_FIELDS_REQUIRE_FIELD_ROLE_DISAMBIGUATION`
6. `PHYSICAL_OR_DIGITAL_IMPRINT_WITNESS_PREFERRED_WHEN_AVAILABLE`
7. `CANONICAL_WITNESS_NORMALIZATION_REQUIRES_CONTENT_AND_REPRESENTATION_COMPARISON`
8. `PAGE_COUNT_FILE_SIZE_OR_FILENAME_DIFFERENCE_ALONE_NOT_DISTINCT_EDITION_EVIDENCE`
9. `DUPLICATE_DERIVATIVE_SCAN_RELATIONSHIP_MUST_BE_RECORDED_EXPLICITLY`
10. `SEARCH_SILENCE_REMAINS_UNRESOLVED_WITHOUT_CORROBORATED_NEGATIVE_BASIS`
11. `NO_REBINDING_INDEPENDENCE_SELECTION_MUTATION_OR_REEVALUATION_AT_DISCOVERY_STAGE`
12. `I132_AND_CURRENT_V2_BLOCKED_STATE_MUST_REMAIN_UNCHANGED`

## Publication-medium search channels

1. `AUTHOR_OR_ORGANIZATION_1998_CHRONOLOGY_AND_CATALOG_RECORDS`
2. `1998_OR_NEAR_CONTEMPORARY_BOOK_COURSE_OR_MAIL_ORDER_CATALOGS`
3. `PHYSICAL_SCAN_TITLE_COPYRIGHT_IMPRINT_OR_COLOPHON_PAGES`
4. `BIBLIOGRAPHIC_LIBRARY_OR_BOOKSELLER_RECORDS_WITH_EDITION_DATE_BINDING`
5. `COPYRIGHT_REGISTRATION_OR_PUBLICATION_RECORDS_WITH_EXACT_WORK_BINDING`

## Canonical-witness normalization channels

1. `DIGITAL_COPY_TITLE_AND_IMPRINT_PAGE_COMPARISON`
2. `TABLE_OF_CONTENTS_AND_CHAPTER_ANCHOR_COMPARISON`
3. `TARGET_PASSAGE_SEQUENCE_AND_PAGINATION_COMPARISON`
4. `FILE_OR_SCAN_TRANSFORMATION_METADATA_COMPARISON`
5. `EDITION_SPECIFIC_ADDITION_DELETION_OR_REORDERING_CHECK`

## Decision

`TWO_LI_1998_IDENTITY_GAPS_READY_FOR_BOUNDED_TARGETED_DISCOVERY_1998_SPECIFIC_PUBLICATION_BINDING_AND_CANONICAL_WITNESS_NORMALIZATION_REQUIRED_NO_REBINDING_NO_INDEPENDENCE`

Consequences:

- bounded discovery evidence collection = authorized
- evidence rebinding = not authorized / not ready / not performed
- provenance-independence adjudication = not authorized / not performed
- later-edition metadata cannot backfill 1998
- ambiguous metadata cannot establish publication status without field-role disambiguation
- formal publisher/ISBN is not an unconditional requirement; a reproducible 1998-specific nonformal status may resolve the medium gap
- canonical normalization must be content-aware
- page count, file size, or filename variance alone cannot create distinct edition/authority identity
- search silence remains unresolved
- 2004 presumed-origin status remains retired
- 1998 prior same-author witness remains confirmed but non-independent
- three external-lineage questions remain unresolved
- current `v1-candidate-set` / `v2-input-package` remain immutable and `BLOCKED_UNDER_CURRENT_EVIDENCE`
- I132 remains normative
- visible-stem binary effective interaction eligibility remains unresolved
- hidden-stem authority gap remains `SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED`

## Verification

Exact implementation/test HEAD:

`16036ea5b855a381787354bc213e93ec44c12f30`

CI:

- run `#1148` — `SUCCESS`
- test files: `234 passed`
- tests: `1518 passed`
- I176 regression tests: `8/8 PASS`
- lint: `PASS`
- typecheck: `PASS`
- build: `PASS`

## Next gate

`I177 — Li 1998 Publication-Medium & Canonical-Witness Gap Targeted Discovery Evidence`

I177 may execute only the two registered discovery tracks. It must preserve unresolved findings where evidence remains insufficient and must not perform evidence rebinding, provenance-independence adjudication, candidate/package mutation, threshold creation, or production authorization.
