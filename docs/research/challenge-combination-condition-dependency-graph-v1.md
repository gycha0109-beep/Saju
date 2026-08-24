# I41 Challenge Combination Condition Dependency Graph v1

## Purpose

I41 binds the source-bounded partial dependency order authorized by I40 to the aligned challenge-target combination condition evidence produced by I39.

The result is an **evidence dependency graph**, not a transformation evaluator.

## Status

```text
RESOLVED_DEPENDENCY_GRAPH
```

I41 materializes one graph per I39 condition-evidence item while preserving prerequisite, scope-gate, context, unresolved-policy, and blocked-result states as distinct concepts.

## Graph node states

```text
EVIDENCE_OBSERVED
CONTEXT_ASSESSED_EMPTY
SCOPE_GATE_ACTIVE
POLICY_UNRESOLVED_WITH_SUBSTRATE
RESULT_BLOCKED
NOT_APPLICABLE
```

These states are intentionally non-equivalent.

For example:

```text
CONTEXT_ASSESSED_EMPTY != preserved relation / no effect
EVIDENCE_OBSERVED      != favorable effect
SCOPE_GATE_ACTIVE      != scope transfer authorized
POLICY_UNRESOLVED_WITH_SUBSTRATE != result ready
RESULT_BLOCKED         != negative result
```

## Stem five-combination graph

For routed stem five-combinations I41 records:

```text
STRUCTURAL_RELATION_MEMBERSHIP      = EVIDENCE_OBSERVED
SEASONAL_COMMAND_CONTEXT            = EVIDENCE_OBSERVED
SUPPORT_INTERFERENCE_CONTEXT        = EVIDENCE_OBSERVED
COMPETING_RELATION_TOPOLOGY         = EVIDENCE_OBSERVED | CONTEXT_ASSESSED_EMPTY
STEM_DAY_MASTER_SCOPE_BOUNDARY      = SCOPE_GATE_ACTIVE
TRANSFORMATION_CONDITION_COMPOSITION = POLICY_UNRESOLVED_WITH_SUBSTRATE
TRANSFORMATION_OR_BINDING_VERDICT   = RESULT_BLOCKED
```

The day-master result scope remains a hard boundary. No challenge-target true-transformation or binding result is emitted.

## Three-combination graph

For routed branch three-combinations I41 records:

```text
THREE_COMBINATION_FULL_MEMBERSHIP   = EVIDENCE_OBSERVED
THREE_COMBINATION_ADJACENCY_SPACING = EVIDENCE_OBSERVED
THREE_COMBINATION_CLASH_TOPOLOGY    = EVIDENCE_OBSERVED | CONTEXT_ASSESSED_EMPTY
THREE_COMBINATION_LEAD_OUT_CONTEXT  = EVIDENCE_OBSERVED
SEASONAL_COMMAND_CONTEXT            = EVIDENCE_OBSERVED
SUPPORT_INTERFERENCE_CONTEXT        = EVIDENCE_OBSERVED
COMPETING_RELATION_TOPOLOGY         = EVIDENCE_OBSERVED | CONTEXT_ASSESSED_EMPTY
TRANSFORMATION_CONDITION_COMPOSITION = POLICY_UNRESOLVED_WITH_SUBSTRATE
EFFECTIVE_BUREAU_QUALIFICATION      = POLICY_UNRESOLVED_WITH_SUBSTRATE
TRANSFORMATION_OR_BINDING_VERDICT   = RESULT_BLOCKED
```

The I40 prerequisite edge is preserved:

```text
THREE_COMBINATION_FULL_MEMBERSHIP
  -> EFFECTIVE_BUREAU_QUALIFICATION
     [PREREQUISITE]
```

Full membership therefore enables review only. It does not establish an effective bureau.

## Six-combination graph

For routed branch six-combinations I41 preserves the unresolved convention as an active scope gate:

```text
SIX_COMBINATION_REFERENCE_CONVENTION = SCOPE_GATE_ACTIVE
TRANSFORMATION_CONDITION_COMPOSITION = POLICY_UNRESOLVED_WITH_SUBSTRATE
TRANSFORMATION_OR_BINDING_VERDICT    = RESULT_BLOCKED
```

No transformed element is manufactured from the incomplete/non-uniform source convention.

## Context evidence preservation

I41 preserves I39 support/interference context using the actual I35 participant contract:

```text
visibleSameElementStemPositions
visibleResourceStemPositions
sameElementBranchPositions
resourceBranchPositions
```

These positions are evidence references only. They are not weighted or summed.

Empty competing or clash topology is represented as:

```text
CONTEXT_ASSESSED_EMPTY
```

not as `relation preserved`, `no effect`, or a favorable bureau verdict.

## Hard guards

```text
globalConditionPrecedenceAuthorized        = false
numericWeightingAuthorized                 = false
additiveAggregationAuthorized              = false
shortCircuitTransformationAuthorized       = false
transformationConditionCompositionVerdict  = not_determined
effectiveBureauVerdict                     = not_determined
transformationOrBindingVerdict              = not_determined
postCombinationSubjectIdentityPolicyResolved = false
targetPostRelationRootState                 = not_determined
effectiveMechanismForceVerdict              = not_determined
relationSpecificUsefulnessHarmfulness        = not_determined
classificationAuthorized                    = false
numericScoringAuthorized                    = false
```

Per graph:

```text
globalPrecedenceApplied = false
numericWeightsApplied   = false
additiveAggregationApplied = false
shortCircuitRuleApplied = false
graphState = PARTIAL_DEPENDENCY_GRAPH_ONLY
```

## Non-equivalences

```text
observed prerequisite     != result satisfied
empty clash topology      != clash-safe / bureau-effective
observed support positions != support effect resolved
observed seasonal context  != seasonal effect resolved
scope gate active          != scope transferred
all graph nodes present    != transformation ready
partial dependency graph   != decision engine
full three-membership      != effective bureau
lead-out observed          != effective bureau
```

## Verification

Initial I41 CI failures were confined to the new I41 scope:

- CI #541: TypeScript field-name mismatch against the I35 participant contract.
- CI #542: regression fixture incorrectly assumed that `인-오-술-신` had no clash; `인↔신` is a real tracked clash, so the implementation correctly emitted `EVIDENCE_OBSERVED`. The clash-free full-three-combination fixture was corrected to `인-오-술-축`.

Final verified gate:

```text
I41 final HEAD: 150f8ac22b9550b11e3d701dd118d76e4cfa9fa7
CI run:          #543
result:          SUCCESS

lint:            PASS
typecheck:       PASS
Vitest:          83 files / 443 tests PASS
build:           PASS
```

The dedicated I41 suite contains 5 passing tests covering:

- stem scope-gate/context/result-blocked graph materialization,
- three-combination full-membership prerequisite and contextual nodes,
- observed versus assessed-empty clash topology,
- six-combination convention scope gate,
- fail-closed unresolved input and deterministic no-precedence/no-weight/no-result guards.

## Conclusion

```text
CONDITION_DEPENDENCY_GRAPH       = RESOLVED EVIDENCE STRUCTURE
GLOBAL_PRECEDENCE                = NOT AUTHORIZED
WEIGHTING / ADDITIVE AGGREGATION = NOT AUTHORIZED
TRANSFORMATION COMPOSITION       = NOT DETERMINED
EFFECTIVE BUREAU                 = NOT DETERMINED
TRANSFORMATION / BINDING         = NOT DETERMINED
POST-COMBINATION SUBJECT IDENTITY = NOT DETERMINED
EFFECTIVE MECHANISM FORCE        = NOT DETERMINED
```

## Next integration gate

```text
I26 v9 — Challenge Context Availability with Combination Dependency Graph
```

I26 v9 may consume an aligned I41 graph to replace generic combination condition-composition gaps with explicit graph-evaluation/scope-policy dependencies. It must not evaluate any graph node or edge into transformation, binding, effective bureau, post-combination subject identity, post-relation root state, effective mechanism force, usefulness/harmfulness, scoring, or classification.
