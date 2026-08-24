# I110 — Source 克 Directional Evidence Adapter Contract

## Result

`STRICT CLOSED`

## Verified authority

```text
code/test/export HEAD = 5da038bdb9e888e61132ea2bbf6d07bdf7ed39d9
CI                    = #873 SUCCESS
Test Files            = 168 passed
Tests                 = 990 passed
I110                   = 8/8 passed
lint/typecheck/test/build = PASS
```

## Decision

```text
SOURCE_KE_COMPONENT_SCOPED_DIRECTIONAL_EVIDENCE_ADAPTER_CONTRACT_FROZEN_IMPLEMENTATION_SEPARATE
```

I110 freezes a research-only `克` evidence-binding contract. No adapter execution occurs in this gate.

## Exact directional cycle

```text
木 -> 土
土 -> 水
水 -> 火
火 -> 金
金 -> 木
```

Each edge is a directed `克` relation. Reversed or transitive inference is not authorized.

## Contracted participant scopes

```text
VISIBLE_STEM
EARTHLY_BRANCH_HIDDEN_STEM
```

All four source/target scope combinations may be evaluated by a future evidence adapter, but only when exact component identities and exact element identities are available.

```text
rawEarthlyBranchElementParticipantAllowed = false
```

The earthly branch participates only through its resolved hidden-stem components under this contract.

## Fail-closed rules

```text
missing component identity   -> FAIL_CLOSED_NO_BINDING
ambiguous component identity -> FAIL_CLOSED_NO_BINDING
missing element identity     -> FAIL_CLOSED_NO_BINDING
ambiguous element identity   -> FAIL_CLOSED_NO_BINDING
non-cycle element pair       -> FAIL_CLOSED_NO_BINDING
```

General-knowledge fallback, five-element-label-only inference, reversed direction, and transitive control are forbidden.

## Semantic ceiling

```text
inputDomain    = COMPONENT_ELEMENT_DIRECTIONAL_EVIDENCE
outputSemantic = SOURCE_KE_COMPONENT_SCOPED_CONTROL_DIRECTION_BINDING
semanticCeiling = EVIDENCE_BINDING_ONLY
```

A future binding may establish only the source-vocabulary directional evidence.

```text
克 direction != damage outcome
克 direction != damage magnitude
克 direction != settlement outcome
克 direction != activation/persistence/effective support
克 direction != relative force
克 direction != precedence
```

## Taxonomy boundary

```text
structuralRelationKindMutationAuthorizedByThisGate = false
keStructuralRelationKindCreatedByThisGate          = false
```

`克` remains outside the `StructuralRelationKind` identity taxonomy.

## Preserved guards

```text
adapterImplementationPerformedByThisGate    = false
adapterImplementationAuthorizedByThisGate   = false
methodologyDefinitionCreatedByThisGate      = false
methodologyRegisteredByThisGate             = false
ruleDefinitionCreatedByThisGate             = false
registrySnapshotMutatedByThisGate           = false
reviewAttestationCreatedByThisGate          = false
sourceActivationVerdictAuthorized           = false
sourcePersistenceVerdictAuthorized          = false
sourceEffectiveSupportVerdictAuthorized     = false
relativeForceVerdictAuthorized              = false
clashWinnerVerdictAuthorized                = false
rescueEffectAuthorized                      = false
clashSettlementAuthorized                   = false
crossRelationPrecedenceAuthorized           = false
targetPostRelationRootState                 = not_determined
effectiveMechanismForceVerdict              = not_determined
relationSpecificUsefulnessHarmfulness       = not_determined
classificationAuthorized                    = false
numericScoringAuthorized                    = false
```

`NO_TRACKED_RELATION_TOUCH` semantics remain unchanged.

## Next gate

```text
I111 — Untouched Support Effect Source 克 Directional Evidence Binding Evidence
```

I111 may materialize research-only current-chart directional `克` bindings under the exact I110 contract. It must independently resolve source/target component identities and element identities, bind only exact directed cycle edges, fail closed on missing/ambiguous/non-cycle pairs, and must not emit damage, settlement, persistence, force, precedence, scoring, or classification outcomes.
