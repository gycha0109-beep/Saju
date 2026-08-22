# I138 — Source 克 Visible-Stem Interaction Threshold Multi-Source Composition Candidate-Set Evidence Rebinding & Input Registration Contract

## Result

```text
STRICT SUCCESS / CLOSED
```

Decision:

```text
CANDIDATE_SET_EVIDENCE_REBINDING_AND_INPUT_REGISTRATION_CONTRACT_FROZEN_NO_INPUT_PACKAGE_REGISTERED_NO_EVALUATION
```

I138 freezes the adopted-policy-bound candidate-set input package schema and registration invariants. It does not materialize or register an actual candidate set.

## Eight mandatory artifact classes

```text
CANDIDATE_SET_INPUT_MANIFEST
EVIDENCE_REBINDING_RECORDS
REQUIREMENT_OWNERSHIP_BINDINGS
WITNESS_IDENTITY_BINDINGS
SCOPE_COMPATIBILITY_ADJUDICATION_INPUTS
PROVENANCE_INDEPENDENCE_ADJUDICATION_INPUTS
SEMANTIC_BRIDGE_ADJUDICATION_INPUTS
CONTRADICTION_ADJUDICATION_INPUTS
```

All eight artifact classes are mandatory for a package registration.

## Binding invariants

```text
candidateManifestMustBindExactAdoption = true
candidateManifestMustVersionCandidateSet = true
everyEvidenceItemMustRebindExactCandidateSourceWitnessAndLocator = true
everyI118RequirementMustHaveExplicitOwnershipBindings = true
implicitRequirementBorrowingForbidden = true
witnessIdentityMustBeStableAndReproducible = true
scopeCompatibilityMustBeExplicitlyAdjudicatedPerEvidenceUse = true
provenanceIndependenceMustBeExplicitlyAdjudicatedWithoutNumericWeighting = true
```

Prior I126/I128 evidence can enter only through explicit rebinding. Merely referencing a prior gate cannot grandfather evidence.

## Explicit unresolved-state handling

Registration is distinct from semantic resolution:

```text
semanticBridgeInputsMayRemainExplicitlyUnresolvedAtRegistration = true
contradictionInputsMayRemainExplicitlyUnresolvedAtRegistration = true
unresolvedSemanticBridgeMustFailClosedDuringEvaluation = true
unresolvedContradictionMustFailClosedDuringEvaluation = true
```

This allows an auditable input package to represent unresolved authority rather than hiding it or inventing a bridge.

## Registration is not evaluation

```text
inputPackageRegisteredByThisGate = false
candidateSetManifestMaterializedByThisGate = false
evidenceRebindingPerformedByThisGate = false
adjudicationInputsMaterializedByThisGate = false
candidateSetEvaluationAuthorizedByThisGate = false
candidateSetEvaluationPerformedByThisGate = false
actualCompositionPerformedByThisGate = false
multiSourceCompositionAuthorized = false
authorityAcquiredByThisGate = false
```

Input package registration, when later performed, will still not equal evaluation authorization, composition authorization, or threshold authority.

## Verification

Exact implementation/test HEAD:

```text
2479939b4fc373579e51aaf3328a3189e61c9e4d
```

CI:

```text
#995 SUCCESS
196 test files passed
1214 tests passed
I138 8/8
lint PASS
typecheck PASS
test PASS
build PASS
```

## Next gate

```text
I139 — Source 克 Visible-Stem Interaction Threshold Multi-Source Composition Candidate-Set Input Package Materialization Readiness Review
```

Before materialization, I139 must verify that candidate-set selection itself cannot be outcome-driven. If prospective inclusion/exclusion criteria or a fixed candidate-set selection boundary are missing, materialization must fail closed rather than cherry-pick candidates from prior research.
