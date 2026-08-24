# I237 — Competing-Relation Settlement Candidate Evidence Adequacy Coverage Evaluation Evidence

## Status

CLOSED / SUCCESS

## Authoritative implementation

- initial implementation: `6f2fb310523d14be4f9d1a858c606b3614d20427`
- type-safe correction: `95d8d71543d269a52ac23545f8cc2243cf41d7cb`
- final CI: #1293 SUCCESS
- test files: 295 passed
- tests: 2006 passed
- I237 tests: 8/8
- lint / typecheck / test / build: PASS

The correction did not change the evidence disposition. `I235RequirementCoverage` permits only `DIRECT | PARTIAL | NOT_ESTABLISHED`, so I237 now fixes impossible `CONFLICT` counts at zero instead of comparing against a state excluded by the upstream type contract.

## Frozen evaluation result

The exact 3-candidate × 8-requirement candidate-local matrix was evaluated without candidate-set union, cross-source composition, semantic bridge inference, majority vote, or authority promotion.

Aggregate cells:

- DIRECT: 15
- PARTIAL: 7
- CONFLICT: 0
- NOT_ESTABLISHED: 2
- full 8/8 candidate count: 0
- requirement classes with at least one DIRECT candidate-local witness: 5/8

Each of the three candidates has exactly five DIRECT cells.

## Residual direct-coverage gaps

The following three I233 requirements still have no DIRECT candidate-local witness:

1. `CURRENT_VS_COMPETING_ROLE_SCOPE_EXPLICIT`
2. `PRECEDENCE_VS_RELATION_OUTCOME_SEPARATION`
3. `TIE_CONFLICT_OR_UNRESOLVED_FAIL_CLOSED_DISPOSITION`

Disposition detail:

- requirement 3: PARTIAL in all three candidates
- requirement 5: PARTIAL in all three candidates
- requirement 7: PARTIAL in one candidate, NOT_ESTABLISHED in two

No PARTIAL cell was upgraded to DIRECT and no candidate-local deficiency was repaired by unioning evidence from another candidate.

## Authority disposition

`COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED` remains open.

I237 does **not** authorize:

- competing-relation settlement
- cross-relation precedence
- multi-touch aggregation
- support-channel activation / persistence / destruction / net-effect verdicts
- target post-relation root-state determination
- effective mechanism force determination
- candidate registration or selection
- evidence rebinding
- provenance-independence or derivative-relationship adjudication
- threshold creation
- damage evaluation
- classification
- numeric scoring
- production interpretation

## Preserved guards

Unchanged:

- I232 hidden-stem external-access HOLD
- hidden-stem authority gap remains open
- I132 independent normative provenance requirement
- Qu Wei 2001 HOLD
- Li 1998 same-target path `SUSPENDED_NOT_RETIRED`
- current v2 package/candidate set immutable
- current v2 provenance disposition `BLOCKED_UNDER_CURRENT_EVIDENCE`

## Next gate

`COMPETING_RELATION_SETTLEMENT_COVERAGE_EVIDENCE_ADEQUACY_RESIDUAL_REQUIREMENTS_REASSESSMENT_REVIEW`

The next gate may reassess only the three residual direct-coverage requirements. It may not reopen the five already-direct requirement classes or convert candidate-set union into authority.