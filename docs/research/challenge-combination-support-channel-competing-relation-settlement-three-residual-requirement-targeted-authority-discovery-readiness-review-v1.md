# I239 — Competing-Relation Settlement Three-Residual Targeted Authority Discovery Readiness Review

## Status

CLOSED / SUCCESS

## Authoritative implementation

- implementation: `5ddb77500776b21a56d21579953a720e23e6b749`
- CI: #1297 SUCCESS
- test files: 297 passed
- tests: 2022 passed
- I239 tests: 8/8
- lint / typecheck / test / build: PASS

## Target boundary

I239 permits discovery for exactly three I238 residual requirements:

1. `CURRENT_VS_COMPETING_ROLE_SCOPE_EXPLICIT`
2. `PRECEDENCE_VS_RELATION_OUTCOME_SEPARATION`
3. `TIE_CONFLICT_OR_UNRESOLVED_FAIL_CLOSED_DISPOSITION`

The five I233 requirement classes that already have DIRECT candidate-local coverage remain closed to rediscovery in this gate.

## Frozen discovery paths

1. `SYSTEM_ROLE_MAPPING_CURRENT_VS_COMPETING_DIRECT_RULE_SEARCH`
2. `PRECEDENCE_OPERATION_VS_RELATION_OUTCOME_SEPARATION_DIRECT_RULE_SEARCH`
3. `TIE_CONFLICT_UNRESOLVED_FAIL_CLOSED_DIRECT_RULE_SEARCH`
4. `SAME_WORK_CHAPTER_OR_COMMENTARY_TARGETED_CROSS_CHECK`
5. `INDEPENDENT_RULE_LEVEL_SOURCE_TARGETED_RESIDUAL_SEARCH`

## Frozen controls

18 controls are frozen. Critical acceptance rules:

- DIRECT requires source-bound direct rule text.
- Current-versus-competing role mapping must be explicit and cannot be inferred only from an example.
- Precedence operation must be distinguished from the relation outcome/state; the two may not be collapsed by inference.
- Tie/conflict/unresolved handling must carry an explicit disposition. Silence cannot establish fail-closed behavior.
- A directly stated bounded deferral or non-decision disposition may qualify for the third residual.
- Generic combination/clash explanations do not count as residual progress.
- Search snippets or index-only material are lead-only.
- Same-work and commentary relationships remain preserved and cannot be relabeled as independent sources.
- Candidate-set union, cross-source completion, and PARTIAL-to-DIRECT auto-upgrade are forbidden.

## Authority disposition

No discovery was executed by I239.

`COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED` remains open. No settlement, precedence, aggregation, downstream support-channel verdict, registration, selection, rebinding, provenance adjudication, composition, threshold, damage evaluation, classification, scoring, or production authority is granted.

## Preserved guards

Unchanged:

- I232 hidden-stem HOLD and open hidden-stem authority gap
- I132 normative provenance requirement
- Qu Wei 2001 HOLD
- Li 1998 `SUSPENDED_NOT_RETIRED`
- current v2 package/candidate set immutable
- current v2 provenance disposition `BLOCKED_UNDER_CURRENT_EVIDENCE`
- no negative/exhaustion finding from silence or access failure

## Next gate

`COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_REQUIREMENT_TARGETED_AUTHORITY_DISCOVERY_EVIDENCE`