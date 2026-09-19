# R096 — non-numeric evidence confidence/state model

Date: 2026-09-20  
Issue: #1049  
Status: QUALITATIVE EVIDENCE-STATE MODEL DEFINED

## Primary states

- VERIFIED_BOUNDED
- VERIFIED_VARIANT
- DIVERGENT_BY_SOURCE_OR_SCHOOL
- PARTIALLY_SUPPORTED
- INCONCLUSIVE
- UNVERIFIED
- CONTRADICTED_WITHIN_SCOPE
- EXECUTION_PENDING

## Orthogonal evidence dimensions

These remain inspectable and are never summed:
1. PROVENANCE_QUALITY
2. PASSAGE_BINDING_COMPLETENESS
3. PROPOSITION_SCOPE_MATCH
4. SOURCE_INDEPENDENCE_OR_DERIVATION
5. CROSS_SOURCE_AGREEMENT_OR_DIVERGENCE
6. IMPLEMENTATION_EXECUTION_VERIFICATION
7. EXPERT_REVIEW_STATUS
8. TEMPORAL_CALCULATION_CONVENTION_STABILITY

## Semantics

`VERIFIED_BOUNDED` means verified only inside the recorded scope.

`DIVERGENT_BY_SOURCE_OR_SCHOOL` preserves plural supported positions; it is not a low numeric score.

`INCONCLUSIVE` remains distinct from false/rejected.

State transitions require explicit evidence events and provenance links.

## Rejected shortcuts

- NUMERIC_CONFIDENCE_PERCENTAGE
- STAR_RATING
- SOURCE_COUNT_SCORE
- HIDDEN_WEIGHTED_SUM
- DIVERGENT_EQUALS_LOW_CONFIDENCE
- INCONCLUSIVE_EQUALS_FALSE

No Production promotion from evidence-state labels alone.