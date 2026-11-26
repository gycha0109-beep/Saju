# I150 — Scope-Adjudicated v2 Input Package Prospective Materialization Contract v1

## Status

```text
STRICT SUCCESS / CLOSED
```

## Purpose

I150 prospectively freezes the exact rules under which one later gate may create and register a new deterministic `v2-input-package` from the immutable I143 v1 package plus the I148 scope-adjudication artifact.

This gate is governance only. It does not itself create/register the v2 package and does not authorize candidate-set evaluation.

## Accepted upstream authority

```text
I149 = ACCEPTED
source package = v1-input-package / immutable
scope adjudication = I148 exact artifact required
target package version = v2-input-package
target state when materialized = REGISTERED_NOT_EVALUATED
```

## Frozen package components

The exact ten I149-required components remain mandatory:

```text
SOURCE_V1_PACKAGE_IDENTITY_REFERENCE
FROZEN_V1_CANDIDATE_SET_REFERENCE
ORIGINAL_EVIDENCE_REBINDING_RECORDS
ORIGINAL_REQUIREMENT_OWNERSHIP_BINDINGS_NO_SATISFACTION_FINDINGS
I148_SCOPE_ADJUDICATION_ARTIFACT_REFERENCE
SIX_SCOPE_ADJUDICATION_RESULTS
SCOPE_COVERAGE_ELIGIBILITY_FLAGS
ORIGINAL_PROVENANCE_INPUTS_PRESERVED_UNRESOLVED
ORIGINAL_SEMANTIC_BRIDGE_INPUTS_PRESERVED_UNRESOLVED
ORIGINAL_CONTRADICTION_INPUTS_PRESERVED_UNRESOLVED
```

## Frozen materialization rules

Exactly thirteen ordered rules are frozen:

```text
1  BIND_EXACT_I143_V1_SOURCE_PACKAGE
2  BIND_EXACT_I148_SCOPE_ADJUDICATION_ARTIFACT
3  PRESERVE_EXACT_FROZEN_V1_CANDIDATE_SET
4  GENERATE_DETERMINISTIC_NEW_V2_PACKAGE_IDENTITY
5  PRESERVE_V1_PACKAGE_IMMUTABILITY
6  PRESERVE_ORIGINAL_EVIDENCE_BINDINGS_FOR_AUDIT
7  PRESERVE_ORIGINAL_REQUIREMENT_OWNERSHIP_AS_NON_SATISFACTION_BINDINGS
8  REGISTER_ALL_SIX_I148_SCOPE_RESULTS
9  RETAIN_SCOPE_REJECTED_EVIDENCE_FOR_AUDIT_BUT_EXCLUDE_SCOPE_DEPENDENT_COVERAGE
10 CARRY_SIX_PROVENANCE_INPUTS_UNRESOLVED
11 CARRY_THREE_SEMANTIC_BRIDGE_INPUTS_UNRESOLVED
12 CARRY_TWO_CONTRADICTION_INPUTS_UNRESOLVED
13 REGISTER_V2_AS_NOT_EVALUATED_WITHOUT_EVALUATION_AUTHORIZATION
```

## Scope outcome handling

```text
compatible-scope-only results = 5
scope-mismatch rejection      = 1
```

The rejected generic-force evidence remains auditable but is ineligible for scope-dependent requirement coverage.

Binding non-equivalences remain:

```text
scope compatible != requirement satisfied
scope compatible != binary eligibility established
qualitative force != Boolean eligibility
无力 != no effective interaction
```

## Unresolved inputs carried forward

```text
provenance independence = 6 unresolved
semantic bridges        = 3 unresolved
contradictions          = 2 unresolved
```

I150 performs no adjudication of these inputs.

## Authorization boundary

I150 authorizes only the next materialization/registration gate:

```text
packageMaterializationAuthorizedByThisGate = true
packageRegistrationAuthorizedByThisGate    = true
packageCreatedByThisGate                   = false
packageRegisteredByThisGate                = false
```

The consumed I145 evaluation authorization remains non-reusable. A new evaluation authorization is required after any v2 package registration.

## Hard guards

```text
sourceV1PackageMutatedByThisGate = false
requirementSatisfactionAdjudicatedByThisGate = false
provenanceIndependenceAdjudicatedByThisGate = false
semanticBridgeAdjudicatedByThisGate = false
contradictionAdjudicatedByThisGate = false
candidateSetEvaluationAuthorizedByThisGate = false
candidateSetEvaluationPerformedByThisGate = false
candidateSetAdmissibilityEstablishedByThisGate = false
productionPolicyExecutionAuthorized = false
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
a56d18c6d3f08fc364eff56932dbec46bdab5383
```

GitHub Actions:

```text
CI #1046 = SUCCESS
verify    = SUCCESS
lint      = PASS
typecheck = PASS
test      = PASS
build     = PASS
```

Vitest:

```text
208 test files passed
1310 tests passed
I150: 8 / 8 passed
```

The I150 mutation regression confirms that changing a required I149 readiness invariant while keeping the surrounding structure intact causes materialization authorization to fail closed.

## Decision

```text
EXACT_V2_INPUT_PACKAGE_PROSPECTIVE_MATERIALIZATION_RULES_FROZEN_NO_PACKAGE_CREATED_NO_EVALUATION_AUTHORIZED
```

## Next gate

```text
I151 — Source 克 Visible-Stem Interaction Threshold Multi-Source Composition Scope-Adjudicated v2 Input Package Materialization Record
```

I151 may create/register exactly one deterministic `v2-input-package` under this contract. It must preserve the v1 package immutably, retain the complete audit substrate, register all six I148 scope outcomes, carry remaining provenance/bridge/contradiction inputs unresolved, and keep candidate evaluation/composition/threshold/classification/numeric authority closed.
