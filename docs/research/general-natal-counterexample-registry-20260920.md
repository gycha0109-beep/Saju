# R094 — counterexample registry linked to governed rules

Date: 2026-09-20  
Issue: #1046  
Status: REGISTRY CONTRACT DEFINED / NO AUTOMATIC RULE INVALIDATION

## Registry unit

Each counterexample records:
- counterexample ID;
- target rule/methodology/version/content hash;
- exact challenging input or source proposition;
- counterexample class;
- evidence/provenance references;
- expected behavior under the challenged rule;
- observed or source-supported contradictory behavior;
- adjudication state;
- scope impact.

## Classes

- SOURCE_CONTRADICTION
- SOURCE_EXCEPTION
- CALCULATION_EDGE_CASE
- IMPLEMENTATION_REGRESSION
- CROSS_SCHOOL_DIVERGENCE
- TEMPORAL_CONTEXT_REVERSAL
- DOMAIN_PROJECTION_FAILURE
- UNKNOWN_OR_UNRESOLVED

## Adjudication states

`OPEN | REPRODUCED | SOURCE_VERIFIED | RULE_NARROWED | RULE_SUPERSEDED | NOT_APPLICABLE | INCONCLUSIVE`

## Governance

A counterexample challenges a governed claim but does not automatically falsify every scope of that rule. Applicability and scope must be adjudicated.

Rule revision never erases counterexample history. Supersession preserves links to both the superseded and successor rule versions.

Counterexample count is descriptive, not a confidence score.

Production changes require the existing governed promotion path.