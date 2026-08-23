# I233 — Challenge Combination Support Channel Competing-Relation Settlement Authority Gap Requirements Review

## Status

CLOSED — the independent I26-v24 `COMPETING_RELATION_SETTLEMENT` authority gap is now prospectively bounded by eight mandatory requirements. This is not a continuation or reopening of the I232 hidden-stem HOLD.

## Implementation

- implementation HEAD: `8895baa8e4f4a78c392993c18fb4ffae2ec6aadd`
- CI: `#1284` — SUCCESS
- verification: lint PASS / typecheck PASS / test PASS / build PASS
- test files: 291 passed
- tests: 1974 passed
- I233: 8/8 tests passed

## Decision

`COMPETING_RELATION_SETTLEMENT_AUTHORITY_ACCEPTANCE_CONTRACT_FROZEN_EIGHT_REQUIREMENTS_NO_PRECEDENCE_AGGREGATION_OR_NET_EFFECT_AUTHORITY_ACQUIRED`

## Target scope

`MULTIPLE_TRACKED_RELATION_TOUCHES_COMPETING_RELATION_SETTLEMENT`

Authority gap:

`COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED`

## Repository boundary

I233 preserves the existing chain rather than reinterpreting it:

1. I55 requires `COMPETING_RELATION_SETTLEMENT` whenever a support source has `MULTIPLE_TRACKED_RELATION_TOUCHES`.
2. I63 already preserves exact relation-id/kind pairs and touch-specific dispatch, but explicitly withholds cross-relation precedence and aggregation.
3. I69 provides only pair-local clash comparative substrate; it is not a cross-relation precedence rule.
4. I78 provides relation-kind-specific combination substrate while direct outcome promotion and cross-relation precedence remain blocked.
5. I81 preserves only a narrow branch-three post-interaction bureau state and still blocks routed combination settlement outcome promotion.
6. I26-v24 continues to carry `COMPETING_RELATION_SETTLEMENT` as an unresolved effect-resolution capability.

Therefore exact relation identity, current-vs-competing role metadata, and multi-touch topology already exist as substrate, but no normative rule currently decides cross-relation ordering, coexistence, cancellation, or aggregation.

## Eight frozen authority requirements

1. `MULTI_TOUCH_SCOPE_EXPLICIT`
2. `RELATION_ID_KIND_PAIR_SCOPE_EXPLICIT`
3. `CURRENT_VS_COMPETING_ROLE_SCOPE_EXPLICIT`
4. `CROSS_RELATION_PRECEDENCE_OR_COEXISTENCE_SEMANTICS`
5. `PRECEDENCE_VS_RELATION_OUTCOME_SEPARATION`
6. `WHOLE_CONFIGURATION_CONTEXT_AND_EXCEPTION_CONDITIONS`
7. `TIE_CONFLICT_OR_UNRESOLVED_FAIL_CLOSED_DISPOSITION`
8. `EXACT_SOURCE_IDENTITY_ORIGINAL_CONTEXT_AND_REPRODUCIBLE_LOCATOR`

All eight are mandatory and currently unsatisfied by normative authority.

A future authority must explicitly bind to the multi-touch scope, preserve exact relation identity/kind and current-vs-competing roles, define precedence or coexistence semantics, keep ordering distinct from relation-local outcome and net support effect, specify context/exceptions, and define a fail-closed treatment for ties, conflict, or unresolved cases.

## Fifteen frozen controls

1. I232 hidden-stem HOLD is separate and must not be reopened.
2. The exact I55 `COMPETING_RELATION_SETTLEMENT` gap is the target scope.
3. I61/I63 relation-id/kind substrate may be reused without outcome promotion.
4. Touch-specific dispatch is not cross-relation precedence.
5. Relation-specific partial order is not cross-relation precedence.
6. Branch-three bureau state is not generic multi-relation settlement.
7. Relation-touch count must not create precedence.
8. Pair order must not be invented.
9. Multi-touch aggregation must not be invented.
10. Precedence remains distinct from relation outcome and net support effect.
11. Unresolved relation-local outcomes may not be hidden by a cross-relation rule.
12. Search snippets, model synthesis, and general knowledge do not count as authority.
13. Visible- or hidden-stem `克` authority may not backfill this gap.
14. I132, Qu Wei 2001, Li 1998, and v2 guards remain unchanged.
15. No composition, threshold, damage, classification, numeric scoring, or production authority.

## Preserved guards

- `crossRelationPrecedenceAuthorized = false`
- `multiTouchAggregationAuthorized = false`
- `competingRelationSettlementResolved = false`
- support-channel activation/persistence/destruction/net effect remain unresolved
- target post-relation root state remains `not_determined`
- effective mechanism force remains `not_determined`
- I232 hidden-stem HOLD remains active and is not reopened
- hidden-stem authority gap remains `SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED`
- visible-stem binary effective-interaction eligibility remains unresolved
- Qu Wei 2001 HOLD remains preserved
- Li 1998 same-target path remains `SUSPENDED_NOT_RETIRED`
- I132 remains normative and unrelaxed
- current v2 package/candidate set remains immutable
- current v2 provenance disposition remains `BLOCKED_UNDER_CURRENT_EVIDENCE`
- no candidate-set mutation, evidence rebinding, provenance-independence adjudication, composition, threshold creation, damage evaluation, classification, numeric scoring, or production execution

## Next gate

`COMPETING_RELATION_SETTLEMENT_AUTHORITY_DISCOVERY_READINESS_REVIEW`

The next gate may only define and freeze a source-discovery contract against the eight I233 requirements. It must not itself settle competing relations or promote any downstream effect verdict.