# R093 — claim-level provenance graph contract

Date: 2026-09-22  
Issue: #1043  
Status: CLAIM-LEVEL GRAPH CONTRACT DEFINED / NO AUTOMATIC AUTHORITY PROPAGATION

## Purpose

Connect existing source identity, passage, methodology, rule, research-claim, and product-claim references at exact claim granularity.

R093 does not replace:
- existing `SourceReference` metadata;
- R091 WORK / EDITION / WITNESS identity authority;
- methodology or rule registries;
- content-addressed rule/product-claim identity.

The graph is a provenance relation layer only.

## Node types

- `WORK`
- `EDITION`
- `WITNESS`
- `PASSAGE`
- `SOURCE_PROPOSITION`
- `METHODOLOGY`
- `RULE_VERSION`
- `RESEARCH_CLAIM`
- `PRODUCT_CLAIM_CONTENT_HASH`

WORK / EDITION / WITNESS nodes reference R091 identities. R093 does not duplicate or mutate those identity records.

## Edge types

- `WITNESS_OF`
- `PASSAGE_IN`
- `STATES`
- `SUPPORTS`
- `PARTIALLY_SUPPORTS`
- `CONTRADICTS`
- `DERIVED_FROM`
- `NARROWS`
- `EXTENDS`
- `IMPLEMENTED_BY`
- `EMITS`
- `SUPERSEDES`

## Review state and binding state are separate axes

The old single-axis idea:

`VERIFIED | REVIEWED | INCONCLUSIVE | MISSING_BINDING`

is rejected because `MISSING_BINDING` is not a review judgment.

### Review state

`VERIFIED | REVIEWED | INCONCLUSIVE`

This records the state of the asserted relation.

### Binding state

`EXACT | PARTIAL | MISSING`

This records whether the edge is tied to exact passage/witness evidence.

Examples:

- `reviewState=REVIEWED + bindingState=EXACT`
- `reviewState=REVIEWED + bindingState=MISSING`
- `reviewState=INCONCLUSIVE + bindingState=EXACT`

A reviewed relation with missing passage binding remains a provenance gap.

## Edge record requirements

Every edge must carry:

- `edgeId`;
- `fromNodeRef`;
- `toNodeRef`;
- `relation`;
- `scopeRef`;
- `reviewState`;
- `bindingState`;
- `evidenceRefs`;
- `gapReasonRef` when binding is not exact.

Authority-bearing support/contradiction edges must not be inferred from graph reachability.

## Endpoint rules

The graph is directed.

The following source-binding endpoints are fixed:

- `WITNESS_OF`: WITNESS -> EDITION or WORK
- `PASSAGE_IN`: PASSAGE -> WITNESS
- `STATES`: PASSAGE -> SOURCE_PROPOSITION
- `SUPPORTS`: SOURCE_PROPOSITION -> RESEARCH_CLAIM
- `PARTIALLY_SUPPORTS`: SOURCE_PROPOSITION -> RESEARCH_CLAIM
- `CONTRADICTS`: SOURCE_PROPOSITION -> RESEARCH_CLAIM
- `EMITS`: RULE_VERSION -> PRODUCT_CLAIM_CONTENT_HASH

Other relation families such as `DERIVED_FROM`, `NARROWS`, `EXTENDS`, `IMPLEMENTED_BY`, and `SUPERSEDES` require an explicitly registered node-pair contract before use. Arbitrary node pairs are not accepted merely because the relation name exists.

## Missing binding

Missing exact passage-level evidence stays explicit.

Allowed:

`SOURCE_PROPOSITION -> SUPPORTS -> RESEARCH_CLAIM`
with
`bindingState=MISSING`

only if:
- the gap is recorded;
- no exact passage is fabricated;
- the edge is not treated as verified exact provenance.

Forbidden:

`rule.sourceIds[] -> assume exact claim support`

or:

`A supports B, B supports C -> therefore A supports C`

without a separately asserted edge.

## Conflict behavior

Many-to-many evidence is preserved.

Multiple source propositions may:
- support the same claim;
- partially support it;
- contradict it.

The graph does not:
- count sources into confidence;
- majority-vote a winner;
- collapse contradictory schools;
- infer independence from multiple witnesses/websites;
- automatically select one methodology.

## Product-claim boundary

`PRODUCT_CLAIM_CONTENT_HASH` identifies emitted claim content.

Graph connectivity alone does not make that claim:
- reviewed;
- active;
- Production-authorized;
- semantically preferred.

Production authority remains owned by existing lifecycle/admission contracts.

## Rejected shortcuts

- `RULE_SOURCE_IDS_ALONE_EQUALS_EXACT_CLAIM_PROVENANCE`
- `TRANSITIVE_SUPPORT_WITHOUT_EXPLICIT_EDGE`
- `SOURCE_COUNT_EQUALS_CONFIDENCE`
- `CONTRADICTION_AUTO_RESOLVED_BY_MAJORITY`
- `MISSING_BINDING_COUNTS_AS_EXACT`
- `ARBITRARY_NODE_PAIR_ACCEPTED_FOR_KNOWN_EDGE_NAME`
- `R091_IDENTITY_DUPLICATED_IN_R093`
- `GRAPH_CONNECTIVITY_AUTO_PROMOTES_PRODUCTION`

## Authority boundary

R093 is a research-only provenance relation contract.

No automatic authority propagation, source-tier promotion, rule activation, conflict resolution, or Production promotion is authorized.
