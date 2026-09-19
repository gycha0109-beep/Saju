# R093 — claim-level provenance graph contract

Date: 2026-09-20  
Issue: #1043  
Status: GRAPH CONTRACT DEFINED / NO AUTOMATIC AUTHORITY PROPAGATION

## Existing substrate

The repository already has source references, content-addressed source refs, methodology/rule registries, content hashes, and provenance audits. R093 connects them at exact claim granularity.

## Node types

- WORK
- EDITION
- WITNESS
- PASSAGE
- SOURCE_PROPOSITION
- METHODOLOGY
- RULE_VERSION
- RESEARCH_CLAIM
- PRODUCT_CLAIM_CONTENT_HASH

## Edge types

- WITNESS_OF
- PASSAGE_IN
- STATES
- SUPPORTS
- PARTIALLY_SUPPORTS
- CONTRADICTS
- DERIVED_FROM
- NARROWS
- EXTENDS
- IMPLEMENTED_BY
- EMITS
- SUPERSEDES

## Edge evidence state

`VERIFIED | REVIEWED | INCONCLUSIVE | MISSING_BINDING`

Every authority-bearing edge must preserve scope and an exact passage locator/witness identity where available. A missing exact passage-to-claim link remains `MISSING_BINDING`; it is not inferred transitively.

## Conflict behavior

Many-to-many evidence and contradictory source propositions coexist in the graph. Source count does not elect a winner and does not become a confidence score.

## Rejected shortcuts

- RULE_SOURCE_IDS_ALONE_EQUALS_EXACT_CLAIM_PROVENANCE
- TRANSITIVE_SUPPORT_WITHOUT_EXPLICIT_EDGE
- SOURCE_COUNT_EQUALS_CONFIDENCE
- CONTRADICTION_AUTO_RESOLVED_BY_MAJORITY
- GRAPH_CONNECTIVITY_AUTO_PROMOTES_PRODUCTION

No Production authority propagation.