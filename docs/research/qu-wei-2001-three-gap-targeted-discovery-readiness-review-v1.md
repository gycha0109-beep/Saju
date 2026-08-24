# I196 — Qu Wei 2001 Three-Gap Targeted Discovery Readiness Review

## Status

```text
RESOLVED_QU_WEI_2001_THREE_GAP_TARGETED_DISCOVERY_READINESS_REVIEW
```

Decision:

```text
QU_WEI_2001_THREE_GAP_TARGETED_DISCOVERY_READY_THREE_GAPS_NINE_CHANNELS_FIFTEEN_CONTROLS_FROZEN_DISCOVERY_ONLY_NO_REBINDING_NO_INDEPENDENCE
```

## Entry boundary

I196 accepts the exact I195 evidence-adequacy and rebinding-readiness boundary.

The direct 2001 target-scope doctrinal antecedent remains accepted, while rebinding remains fail-closed because three independent evidence gaps remain unresolved.

## Target gaps

Exactly three gaps are frozen for bounded targeted discovery:

```text
QU_WEI_2001_PUBLICATION_MEDIUM_OR_ENTITY_IDENTITY_GAP
QU_WEI_2001_CANONICAL_WITNESS_NORMALIZATION_GAP
QU_WEI_2001_EXACT_TARGET_PASSAGE_BINDING_GAP
```

The gaps are independent obligations. Evidence for one gap may not backfill another.

## Nine discovery channels

### Publication identity

```text
PUBLICATION_INSTITUTIONAL_LIBRARY_BIBLIOGRAPHIC_RECORD
PUBLICATION_DIRECT_TITLE_COPYRIGHT_IMPRINT_COLOPHON
PUBLICATION_AUTHOR_OR_ISSUER_CONTEMPORARY_RECORD
```

Qualifying evidence requires a 2001-specific bibliographic, title/imprint/colophon, or contemporary author/issuer binding.

Later-edition metadata, a secondary catalog label, or an unverified aggregator ISBN alone cannot resolve the gap.

### Canonical witness normalization

```text
NORMALIZATION_DIRECT_FULL_WITNESS_ACQUISITION
NORMALIZATION_TITLE_IMPRINT_TOC_PAGINATION_COMPARISON
NORMALIZATION_FILE_HASH_SCAN_TRANSFORMATION_PROVENANCE
```

Qualifying evidence requires direct representation comparison or transformation provenance sufficient to group or distinguish the observed digital witnesses.

Page-count, file-size, filename, or hosting variance alone is not sufficient.

### Exact target-passage binding

```text
PASSAGE_DIRECT_2001_TARGET_SECTION_INSPECTION
PASSAGE_2001_2003_SEQUENCE_AND_CONTEXT_COMPARISON
PASSAGE_ALTERNATE_2001_REPRESENTATION_CROSS_CHECK
```

Qualifying evidence requires a direct 2001 textual witness and comparison to the governed 2003 target claim.

Generic doctrine-level similarity alone cannot resolve the exact-passage gap, and failure to find an exact phrase in one witness does not prove absence.

## Fifteen discovery controls

1. exact I195 three-gap boundary required
2. discovery limited to the three frozen gaps
3. publication identity requires 2001-specific binding
4. later edition metadata cannot backfill 2001 publication identity
5. secondary catalog or unverified ISBN alone cannot establish publication identity
6. canonical normalization requires direct representation comparison or transformation provenance
7. page/file/name variance alone cannot resolve normalization
8. exact passage binding requires a direct 2001 textual witness
9. doctrine-level similarity alone cannot resolve exact passage binding
10. failure to find an exact phrase cannot establish absence
11. each gap is recorded independently without cross-backfill
12. all three gaps are required before rebinding readiness
13. same-author 2001→2003 dependency and three external lineage gaps remain preserved
14. I132 provenance controls and frozen v2 package remain unchanged
15. no rebinding, selection, registration, mutation, reevaluation, composition, threshold, scoring, or production authority

## Readiness-only boundary

```text
targeted discovery evidence may proceed = true
discovery executed by I196 = false
evidence acquired by I196 = false
gaps resolved by I196 = 0
all three gaps required before rebinding readiness = true
one-gap resolution sufficient = false
evidence rebinding methodologically ready = false
evidence rebinding authorized = false
evidence rebinding executed = false
```

## Provenance and I132 preservation

```text
direct 2001 doctrinal antecedent = PRESERVED
same-author 2001→2003 doctrinal dependency = PRESERVED
external target-lineage unresolved questions = 3
provenance independence adjudicated = false
independent normative provenance established = 0
explicit derivative relationship check = REQUIRED
derivative retransmission counts as independent = false
unresolved lineage default = REJECT_INDEPENDENCE_CLAIM
I132 independent normative provenance requirement = NORMATIVE
I132 policy relaxation = NOT AUTHORIZED
source class alone sufficient = false
source count numeric weighting = false
provenance tier numeric weighting = false
```

## Frozen v2 / Li path / production guards

```text
candidate selection = false
candidate registration = NOT AUTHORIZED
candidate-set mutation = false
candidate-set reevaluation = NOT AUTHORIZED
candidate-set admissibility = NOT ESTABLISHED
v2 package/candidate set = IMMUTABLE
current v2 provenance disposition = BLOCKED_UNDER_CURRENT_EVIDENCE
Li 1998 path = SUSPENDED_NOT_RETIRED
Li may reopen on materially new direct lead = true
Li publication-medium/entity gap = OPEN
Li canonical-witness-normalization gap = OPEN
targeted discovery exhaustion = false
corpus exhaustion = false
search silence creates negative finding = false
actual composition = NOT PERFORMED
multi-source composition = NOT AUTHORIZED
visible-stem binary effective interaction eligibility = UNRESOLVED
threshold rule = NOT CREATED
damage evaluation = NOT AUTHORIZED
classification = NOT AUTHORIZED
numeric scoring = NOT AUTHORIZED
production policy execution = NOT AUTHORIZED
hidden-stem authority gap = SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED
```

## Verification

Implementation/test exact HEAD:

```text
02832f0b717fdefe357050ae38b5a63c62e068cd
```

CI:

```text
#1208 SUCCESS
254 test files / 1678 tests / I196 8/8
lint PASS
typecheck PASS
test PASS
build PASS
```

## Next gate

```text
I197 — Qu Wei 2001 Three-Gap Targeted Discovery Evidence
```

I197 may execute the nine frozen discovery channels and record each gap independently. It must not infer absence from search silence, use later-edition metadata to backfill 2001 identity, treat representation-count differences as provenance, or rebind evidence unless a later dedicated readiness/adjudication gate establishes that all required evidence obligations have been met.
