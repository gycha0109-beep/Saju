# R098 — research-to-governed promotion checklist

Date: 2026-09-22  
Issue: #1052  
Status: FAIL-CLOSED PROMOTION CHECKLIST CONTRACT DEFINED / ELIGIBILITY IS NOT PROMOTION

## Purpose

Consolidate the repository's authority-first research controls into a fail-closed checklist for moving a bounded research claim toward governed, shadow/staging, and eventual Production eligibility.

R098 does not perform lifecycle mutation.

## Fifteen promotion gates

1. `CLAIM_SCOPE_FROZEN`
2. `METHODOLOGY_AND_SOURCE_SCOPE_IDENTIFIED`
3. `WORK_EDITION_WITNESS_PROVENANCE_BOUND`
4. `PASSAGE_PROPOSITION_BINDING_COMPLETE`
5. `RIGHTS_REUSE_CONSTRAINTS_RECORDED`
6. `COUNTEREXAMPLES_AND_DIVERGENCE_REVIEWED`
7. `CALCULATION_TIME_CONVENTIONS_EXPLICIT`
8. `EXECUTABLE_PREDICATES_NO_HIDDEN_GUESSES`
9. `AMBIGUITY_UNKNOWN_FAIL_CLOSED`
10. `DETERMINISTIC_AND_REGRESSION_TESTS_PASS`
11. `CONTENT_HASH_VERSION_SUPERSESSION_PINNED`
12. `REQUIRED_DOMAIN_REVIEW_ATTESTATION_SATISFIED`
13. `PRODUCT_LANGUAGE_WITHIN_SOURCE_BOUND_SEMANTICS`
14. `REQUIRED_SHADOW_STAGING_EVIDENCE_COMPLETE`
15. `EXPLICIT_GOVERNANCE_AUTHORITY_DECISION_RECORDED`

## Gate record contract

Every gate has an explicit record:

- `gateId`
- `status`
- `applicability`
- `evidenceRefs`
- `reviewedAt`
- `reviewerOrAuthorityRef`
- `blockingReasonRef` when blocked/pending
- `notApplicablePolicyRef` and justification when not applicable

Gate statuses:

- `SATISFIED`
- `PENDING`
- `BLOCKED`
- `NOT_APPLICABLE_WITH_JUSTIFICATION`

Applicability:

- `REQUIRED`
- `CONDITIONAL`

Conditional gates are not silently skipped.

A conditional gate may use `NOT_APPLICABLE_WITH_JUSTIFICATION` only when the governing applicability policy and justification are recorded.

## Cross-contract evidence mapping

The checklist references existing governed/research evidence rather than duplicating it.

Examples:

- gate 2: methodology/source/school scope, including R095 lineage metadata where applicable;
- gate 3: R091 work/edition/witness identity;
- gate 4: R093 exact claim/proposition provenance and R097 inspection manifest when scan evidence is involved;
- gate 6: R094 counterexample registry and divergence review;
- gate 9: fail-closed unknown/ambiguity behavior;
- gate 12: R090 expert review when the governed path requires it;
- evidence-state observations may reference R096 but R096 labels do not replace gate evidence.

Passing a prior research contract does not automatically satisfy a promotion gate. The gate record must cite the exact evidence relevant to the candidate claim/version.

## Checklist result states

- `BLOCKED`
- `RESEARCH_READY`
- `REVIEW_READY`
- `SHADOW_READY`
- `PROMOTION_ELIGIBLE`

These are workflow readiness states, not confidence scores.

## Fail-closed state rules

### BLOCKED

Any required gate is `BLOCKED`, or required evidence/applicability metadata is missing.

### RESEARCH_READY

The bounded claim package is sufficiently identified to continue governed research, but later review/execution/shadow/authority gates remain pending.

### REVIEW_READY

The evidence package is ready for designated review, while later gates may remain pending.

### SHADOW_READY

All prerequisites for the governed shadow/staging step are satisfied; shadow evidence itself may still be pending.

### PROMOTION_ELIGIBLE

Every required gate is either:
- `SATISFIED`; or
- `NOT_APPLICABLE_WITH_JUSTIFICATION` under an explicit governing applicability policy,

and gate 15 records the designated governance decision that the exact candidate is eligible for promotion.

`PROMOTION_ELIGIBLE` does **not** mutate lifecycle/status.

## Gate 15 versus actual lifecycle mutation

Gate 15 records the explicit governance decision for the exact candidate/version.

The actual lifecycle mutation is a separate authorized action with its own:
- actor/authority;
- target content hash/version;
- from-state;
- to-state;
- timestamp;
- audit/event reference.

Therefore:

`PROMOTION_ELIGIBLE != PROMOTED`

and:

`GOVERNANCE_DECISION_RECORDED != LIFECYCLE_MUTATION_EXECUTED`

## Candidate identity

A checklist is bound to an exact promotion candidate:

- claim ID;
- content hash;
- version;
- methodology/source scope;
- intended lifecycle target.

Changing the candidate content hash/version invalidates reuse of the old checklist result until affected gates are re-evaluated.

## No implicit promotion

The following never promote a candidate by themselves:

- merge;
- test pass;
- source count;
- expert vote;
- product demand;
- checklist state;
- shadow success;
- evidence-state label.

## Rejected shortcuts

- `MERGE_IMPLIES_PROMOTION`
- `TEST_PASS_IMPLIES_PROMOTION`
- `SOURCE_COUNT_IMPLIES_PROMOTION`
- `EXPERT_VOTE_IMPLIES_PROMOTION`
- `PRODUCT_DEMAND_IMPLIES_PROMOTION`
- `SHADOW_PASS_IMPLIES_PROMOTION`
- `EVIDENCE_STATE_IMPLIES_PROMOTION`
- `CONDITIONAL_GATE_SILENTLY_SKIPPED`
- `NOT_APPLICABLE_WITHOUT_POLICY_AND_JUSTIFICATION`
- `OLD_CHECKLIST_REUSED_AFTER_CANDIDATE_HASH_CHANGE`
- `ELIGIBLE_STATE_AUTO_MUTATES_LIFECYCLE`

## Authority boundary

R098 defines eligibility evidence and fail-closed readiness only.

Actual rule/lifecycle/Production authority mutation remains a separate designated governance action.
