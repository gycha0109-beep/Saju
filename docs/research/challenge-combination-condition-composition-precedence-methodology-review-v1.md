# I40 Challenge Combination Condition Composition and Precedence Methodology Review v1

## Purpose

I40 reviews whether the condition evidence now available through I39 can be given a source-bounded dependency structure without inventing one universal transformation formula.

The result is a **partial dependency order**, not a transformation or effective-bureau decision rule.

## Decision

```text
PARTIAL_DEPENDENCY_ORDER_ONLY_GLOBAL_PRECEDENCE_BLOCKED
```

I40 authorizes a future dependency-graph adapter only.

It does not authorize a weighted model, additive model, majority rule, short-circuit rule, or total condition precedence.

## Structural prerequisites and scope gates

I40 distinguishes three edge classes:

```text
PREREQUISITE
SCOPE_GATE
CONTEXT_INPUT
```

### Structural relation membership

A tracked structural combination relation must exist before any condition-composition review can occur.

```text
STRUCTURAL_RELATION_MEMBERSHIP
  -> TRANSFORMATION_CONDITION_COMPOSITION
     [PREREQUISITE]
```

This remains structural substrate only.

### Stem day-master scope boundary

`三命通會` explicitly frames 化氣 result reasoning around the day stem. Therefore:

```text
STEM_DAY_MASTER_SCOPE_BOUNDARY
  -> TRANSFORMATION_OR_BINDING_VERDICT
     [SCOPE_GATE]
```

Seasonal/support/competition evidence can still be recorded for challenge targets, but it cannot cross this scope gate into direct reuse of the traditional true-transformation or `合而不化` result contract.

### Full three-combination membership

`三命通會` states that a missing member prevents `三合化局`. Therefore:

```text
THREE_COMBINATION_FULL_MEMBERSHIP
  -> EFFECTIVE_BUREAU_QUALIFICATION
     [PREREQUISITE]
```

Full membership is necessary, not sufficient.

### Six-combination convention scope

The reviewed source record does not establish one complete, uniform challenge-target transformed-element convention for all six-combination pairs.

Therefore:

```text
SIX_COMBINATION_REFERENCE_CONVENTION
  -> TRANSFORMATION_CONDITION_COMPOSITION
     [SCOPE_GATE]
```

No six-combination transformation target is manufactured.

## Parallel stem context inputs

The reviewed 化氣 material supports relevance of:

```text
SEASONAL_COMMAND_CONTEXT
SUPPORT_INTERFERENCE_CONTEXT
COMPETING_RELATION_TOPOLOGY
```

but does not establish a universal challenge-target order among them.

I40 therefore places them in one parallel context group:

```text
STEM_CONTEXT_INPUTS
fixedInternalPrecedenceAuthorized = false
```

No condition is assigned a weight or automatic veto.

## Parallel three-combination context modifiers

After full membership is established, the following may all remain relevant:

```text
SEASONAL_COMMAND_CONTEXT
SUPPORT_INTERFERENCE_CONTEXT
COMPETING_RELATION_TOPOLOGY
THREE_COMBINATION_ADJACENCY_SPACING
THREE_COMBINATION_CLASH_TOPOLOGY
THREE_COMBINATION_LEAD_OUT_CONTEXT
```

`滴天髓闡微` distinguishes tightly connected versus separated combinations, treats clash placement as contextual, and notes that heavenly-stem lead-out can matter. `通隔論` likewise treats spacing, clash, and intervening factors as forms of obstruction that can interact.

I40 therefore records these as parallel modifiers:

```text
THREE_COMBINATION_CONTEXT_MODIFIERS
fixedInternalPrecedenceAuthorized = false
```

No universal rule such as `clash always first`, `month command always wins`, or `lead-out completes the bureau` is authorized.

## Hard guards

```text
structuralMembershipIsFoundationalPrerequisite              = true
stemDayMasterScopeBoundaryPreventsDirectResultComposition    = true
stemContextDimensionsMayCoexistWithoutFixedPrecedence        = true
threeCombinationFullMembershipIsPreconditionForBureauReview  = true
threeCombinationContextModifiersMayCoexistWithoutFixedPrecedence = true
sixCombinationUniformConventionMustResolveBeforeTransformationTargetComposition = true

globalConditionPrecedenceAuthorized          = false
conditionWeightingAuthorized                  = false
additiveConditionAggregationAuthorized        = false
shortCircuitTransformationVerdictAuthorized   = false
conditionDependencyGraphAdapterAuthorized      = true
transformationConditionCompositionVerdictAuthorized = false
effectiveBureauVerdictAuthorized              = false
transformationOrBindingVerdictAuthorized      = false
postCombinationSubjectIdentityPolicyResolved  = false
targetPostRelationRootState                   = not_determined
effectiveMechanismForceVerdict                = not_determined
relationSpecificUsefulnessHarmfulness          = not_determined
classificationAuthorized                      = false
numericScoringAuthorized                      = false
```

## Non-equivalences

```text
prerequisite satisfied     != result satisfied
scope gate recorded        != scope transferred
a context is relevant      != that context has precedence
parallel contexts present  != additive score
clash topology present     != clash wins
lead-out present           != effective bureau
full three-membership      != effective bureau
all context nodes present  != transformation
```

## Verification

```text
I40 code HEAD: e42b9ae23e97e3734ce3ec3430edef8876ec7ca5
CI run:        #537
result:        SUCCESS

lint:          PASS
typecheck:     PASS
Vitest:        82 files / 438 tests PASS
build:         PASS
```

The dedicated I40 regression suite contains 5 passing tests covering:

- partial dependency order versus blocked global precedence/weighting,
- stem day-master scope gate and parallel stem contexts,
- three-combination full-membership prerequisite and parallel contextual modifiers,
- six-combination convention scope gate,
- deterministic identity and all downstream fail-closed boundaries.

## Conclusion

```text
PARTIAL_DEPENDENCY_ORDER          = AUTHORIZED
GLOBAL_CONDITION_PRECEDENCE       = NOT AUTHORIZED
NUMERIC_WEIGHTING                 = NOT AUTHORIZED
ADDITIVE_AGGREGATION              = NOT AUTHORIZED
SHORT_CIRCUIT_TRANSFORMATION      = NOT AUTHORIZED
CONDITION_DEPENDENCY_GRAPH        = AUTHORIZED AS EVIDENCE STRUCTURE ONLY
TRANSFORMATION_COMPOSITION_VERDICT = NOT AUTHORIZED
EFFECTIVE_BUREAU                  = NOT AUTHORIZED
```

## Next gate

```text
I41 — Challenge Combination Condition Dependency Graph Adapter
```

I41 may bind the I40 dependency structure to aligned I39 condition evidence and expose prerequisite/scope/context readiness states. It must not evaluate the graph into transformation, binding, effective-bureau, post-combination subject identity, post-relation root state, effective force, usefulness/harmfulness, scoring, or classification.
