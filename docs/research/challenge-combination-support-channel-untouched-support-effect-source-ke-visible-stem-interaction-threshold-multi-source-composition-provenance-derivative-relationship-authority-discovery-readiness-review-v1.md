# I156 — Source 克 Visible-Stem Interaction Threshold Multi-Source Composition Provenance Derivative-Relationship Authority Discovery Readiness Review v1

## Status

`STRICT CLOSED / VERIFIED`

## Decision

`SIX_PROVENANCE_INPUTS_READY_FOR_TARGETED_DERIVATIVE_RELATIONSHIP_AUTHORITY_DISCOVERY_NO_INDEPENDENCE_FINDING_NO_PACKAGE_MUTATION`

## Accepted upstream authority

I156 accepts only the exact I155 provenance-independence adjudication readiness result that:

- preserves six exact evidence-bound provenance inputs;
- keeps all six provenance states `UNRESOLVED`;
- keeps every numeric weight `null`;
- requires an explicit derivative-relationship check;
- rejects source-count and provenance-tier weighting;
- rejects empty dependency-link arrays or unique provenance identities as independence evidence;
- authorizes only targeted derivative-relationship authority discovery.

## Frozen discovery requirements

Every one of the six discovery targets must satisfy the exact eight requirements below:

1. `EXACT_EVIDENCE_AND_PROVENANCE_IDENTITY_BINDING`
2. `SOURCE_CHRONOLOGY_CHECK`
3. `ATTRIBUTION_AND_RETRANSMISSION_CHECK`
4. `SAME_WORK_EDITION_WITNESS_NORMALIZATION_CHECK`
5. `DIRECT_SOURCE_LINEAGE_EVIDENCE_CHECK`
6. `TRI_STATE_RELATIONSHIP_FINDING_REQUIRED`
7. `NEGATIVE_RELATIONSHIP_FINDING_REQUIRES_EXPLICIT_SEARCH_BASIS`
8. `NO_SOURCE_COUNT_OR_PROVENANCE_TIER_WEIGHTING`

## Conclusion-neutral target state

All six targets begin as:

- discovery: `TARGETED_DISCOVERY_NOT_EXECUTED`
- derivative relationship: `NOT_RESEARCHED`
- independence: `NOT_AUTHORIZED`

I156 does not infer any provenance result from current package metadata.

Known dependency links are retained only for audit. In particular, same-work alternate witnesses do not create additional independent authority.

## Permitted future relationship findings

A later evidence gate may record exactly one of:

- `DERIVATIVE_DEPENDENCY_FOUND`
- `NO_DERIVATIVE_DEPENDENCY_FOUND_WITH_EXPLICIT_BASIS`
- `UNRESOLVED_AFTER_TARGETED_DISCOVERY`

A negative derivative-relationship finding requires an explicit documented search basis.

The following remain invalid shortcuts:

- no currently known dependency != negative derivative finding;
- empty dependency-link array != independence;
- distinct provenance identity != independence;
- distinct source identity != independence;
- chronology alone != independence;
- source count != vote;
- provenance tier != weight.

## Scope of the next gate

The next gate may execute targeted derivative-relationship research and materialize evidence records bound to the exact six I156 targets.

It may inspect:

- source chronology;
- explicit attribution;
- retransmission/copying relationships;
- same-work edition or witness identity;
- direct lineage evidence;
- documented absence searches where a negative finding is proposed.

It may not perform final provenance-independence adjudication.

## Verification

Implementation/test HEAD:

`042fa65d29dfa0c6a40b080e24b87b4f916a3b6d`

CI #1071: `SUCCESS`

- lint: PASS
- typecheck: PASS
- test: PASS
- build: PASS
- test files: 214 passed
- tests: 1358 passed
- I156: 8/8 passed

## Hard guards retained

- discovery executed by I156: `false`
- derivative relationship finding made: `false`
- provenance independence finding authorized: `false`
- provenance independence adjudicated: `false`
- input package mutated: `false`
- new package version created: `false`
- candidate-set re-evaluation authorized/performed: `false`
- candidate-set admissibility established: `false`
- production policy execution authorized: `false`
- actual composition performed: `false`
- multi-source composition authorized: `false`
- visible-stem binary effective interaction eligibility resolved: `false`
- threshold rule created: `false`
- classification authorized: `false`
- numeric scoring authorized: `false`
- hidden-stem authority gap remains: `SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED`

## Next gate

`I157 — Source 克 Visible-Stem Interaction Threshold Multi-Source Composition Provenance Derivative-Relationship Authority Discovery Evidence`
