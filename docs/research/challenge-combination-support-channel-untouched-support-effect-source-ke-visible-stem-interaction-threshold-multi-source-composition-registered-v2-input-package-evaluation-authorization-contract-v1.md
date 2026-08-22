# I153 — Registered v2 Input Package Evaluation Authorization Contract v1

## Status

```text
STRICT SUCCESS / CLOSED
```

## Purpose

I153 issues exactly one new single-use governed research evaluation authorization for the exact registered I151 `v2-input-package` after I152 established structural readiness.

This authorization is distinct from the consumed I145 v1 authorization. I153 does not itself execute the evaluation.

## Authorization binding

```text
authorization state = AUTHORIZED_NOT_EXECUTED
authorized evaluations = 1
scope = EXACT_REGISTERED_V2_PACKAGE_SINGLE_RESEARCH_EVALUATION
```

The authorization is bound to:

```text
exact policy version
exact adoption ID
exact frozen candidate-set ID
exact registered v2 package ID
exact nine-step fail-closed evaluation algorithm
```

Any pre-execution mutation of policy version, candidate set, or registered package invalidates the authorization.

## Prior authorization lifecycle

```text
prior I145 authorization reusable = false
this authorization new and distinct from I145 = true
```

No consumed authorization is revived or reused.

## Scope-adjudication handling

The registered I148 scope outcome must be consumed at `SCOPE_COMPATIBILITY_CHECK`.

I153 freezes these non-equivalences:

```text
scope compatible != requirement satisfied
scope compatible != binary eligibility established
```

The authorization may not re-adjudicate scope.

## Remaining unresolved inputs

The evaluator must preserve unresolved inputs as unresolved unless a separate governed package version later contains adjudicated outcomes.

```text
provenance independence = unresolved
semantic bridges        = unresolved
contradictions          = unresolved
```

The authorized evaluator:

```text
may not infer provenance independence
may not infer missing semantic bridges
may not resolve contradictions by vote or weight
must fail closed at the first unsatisfied mandatory step
must not promote later steps to PASS after first failure
```

## Execution boundary

```text
researchEvaluationExecutionAuthorized = true
candidateSetEvaluationAuthorizedByThisGate = true
candidateSetEvaluationPerformedByThisGate = false
evaluationResultCreatedByThisGate = false
unresolvedInputAdjudicationPerformedByThisGate = false
inputPackageMutatedByThisGate = false
```

## Hard guards

```text
productionPolicyExecutionAuthorized = false
productionPolicyExecutableByThisGate = false
candidateSetAdmissibilityEstablishedByThisGate = false
actualCompositionPerformedByThisGate = false
multiSourceCompositionAuthorized = false
authorityAcquiredByThisGate = false
visibleStemBinaryEffectiveInteractionEligibilityResolved = false
thresholdRuleCreatedByThisGate = false
damageEvaluationAuthorized = false
classificationAuthorized = false
numericScoringAuthorized = false
```

Hidden-stem authority remains unresolved:

```text
SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED
```

## Verification

Implementation/test exact branch HEAD:

```text
4f51b862836370b58c0d58ffc481ba6ff48599e0
```

GitHub Actions:

```text
CI #1058 = SUCCESS
verify    = SUCCESS
lint      = PASS
typecheck = PASS
test      = PASS
build     = PASS
```

Vitest:

```text
211 test files passed
1334 tests passed
I153: 8 / 8 passed
```

The mutation regression preserves the nine-step count while changing one step ID. Authorization fails closed, proving binding to the exact ordered evaluation algorithm rather than count alone.

## Decision

```text
EXACT_REGISTERED_V2_INPUT_PACKAGE_AUTHORIZED_FOR_ONE_NEW_SINGLE_USE_GOVERNED_FAIL_CLOSED_RESEARCH_EVALUATION_NOT_EXECUTED
```

## Next gate

```text
I154 — Source 克 Visible-Stem Interaction Threshold Multi-Source Composition Authorized Registered v2 Input Package Fail-Closed Candidate-Set Evaluation Record
```

I154 must consume this exact single-use authorization exactly once, bind the exact registered I151 v2 package, consume the registered I148 scope outcome without re-adjudication, execute the exact nine-step sequence, and stop at the first unresolved mandatory input. No production/composition/threshold/classification/numeric authority may be created.
