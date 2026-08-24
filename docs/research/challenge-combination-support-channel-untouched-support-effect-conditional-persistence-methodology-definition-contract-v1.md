# I98 — Untouched Support Effect Conditional Persistence Methodology Definition Contract

## Status

**STRICT CLOSED**

## Verified implementation authority

- Code/test/export HEAD: `c179435d54eced6015007772972ae9d0b1bfe0bd`
- CI: **#824 SUCCESS**
- Test Files: **156 passed**
- Tests: **894 passed**
- I98: **8/8 passed**
- lint: PASS
- typecheck: PASS
- build: PASS

## Decision

```text
CONDITIONAL_PERSISTENCE_RESEARCH_METHODOLOGY_CONTRACT_FROZEN_RELATION_VOCABULARY_BINDING_REQUIRED_BEFORE_MATERIALIZATION
```

I98 freezes the contract for a future research-only methodology without creating or registering the methodology itself.

## Frozen methodology envelope

```text
reservedMethodologyId = M-SUPPORT-UNTOUCHED-CONDITIONAL-PERSISTENCE
requiredMethodologyFamily = stem_branch_interaction
methodologyStatusCeiling = research
methodologyVersionConvention = 0.1.0-research
sourceIdsMustContainCandidateSource = true
sourceIdsMayBorrowI88OrI91Candidate = false
```

The candidate source remains:

```text
source_chenyuan_sizhu_yuce_rumen_1995_isbn9787805922515
```

## Required input semantics

I98 freezes seven required semantic inputs:

```text
SUPPORT_SOURCE_IDENTITY
SUPPORT_KIND
SUPPORT_SOURCE_POSITION
RELATION_TOUCH_TOPOLOGY
RELATION_SETTLEMENT_DEPENDENCY_STATE
SOURCE_RELATION_VOCABULARY_BINDING
SUPPORT_OR_PROTECTION_CONDITION
```

The first five have existing research substrate. The final two remain unresolved exact bindings.

```text
canonicalRequiredFactBindingsResolved = false
placeholderRequiredFactPathsAuthorized = false
researchMethodologyMaterializationAuthorized = false
```

No invented placeholder fact path may be used to bypass the missing bindings.

## Source vocabulary binding blocker

The candidate's relevant source vocabulary is preserved exactly as a binding problem:

```text
克
合
刑
冲
生
卫
```

Every item remains:

```text
exactRepositoryBindingState = UNRESOLVED_EXACT_BINDING_REQUIRED
mayBeSilentlyMappedToExistingRelationKind = false
absenceMayBeInferredFromNoTrackedRelationTouch = false
```

Therefore:

```text
exactRelationVocabularyBindingRequired = true
allSourceRelationVocabularyBindingsResolved = false
```

The existence of repository concepts such as `branch_clash`, combination relations, support channels, or settlement dependencies does not by itself prove that a source-language term is semantically identical to one of those concepts.

## Conditional persistence contract

I98 preserves the I96/I97 semantics:

```text
NO_TRACKED_RELATION_TOUCH
-> tracked relation-settlement dependency cleared only
```

It does not establish:

```text
NO_TRACKED_RELATION_TOUCH -> ACTIVE
NO_TRACKED_RELATION_TOUCH -> PERSISTED
NO_TRACKED_RELATION_TOUCH -> effective support
```

Conditional persistence evaluation requires all of the following to be bound and evaluated:

```text
applicable support kind
known source position
exact damage-vocabulary evaluation
support/protection condition evaluation
no unresolved required binding
```

Structural support presence or direction alone is insufficient.

## Materialization boundary

```text
methodologyDefinitionCreatedByThisGate = false
methodologyRegisteredByThisGate = false
ruleDefinitionCreatedByThisGate = false
registrySnapshotMutatedByThisGate = false
reviewAttestationCreatedByThisGate = false
```

The semantic ceiling of this Gate is:

```text
CONDITIONAL_PERSISTENCE_EVALUATION_CONTRACT_ONLY
```

No ACTIVE, PERSISTED, or effective-support state is emitted.

## Hard guards preserved

```text
methodologyOrRulePromotionAuthorized = false
executableAuthorityAuthorized = false
stagingPromotionAuthorized = false
productionPromotionAuthorized = false
untouchedSupportEffectRuleImplementationAuthorized = false
sourceActivationVerdictAuthorized = false
sourcePersistenceVerdictAuthorized = false
sourceEffectiveSupportVerdictAuthorized = false
relativeForceVerdictAuthorized = false
crossRelationPrecedenceAuthorized = false
classificationAuthorized = false
numericScoringAuthorized = false
```

## Next gate

```text
I99 — Untouched Support Effect Source Relation Vocabulary Repository Binding Review
```

I99 may audit current repository authority to determine whether each of `克/合/刑/冲/生/卫` has an exact, scoped, non-lossy binding to existing relation/effect evidence. It must preserve distinctions where a source term is broader than a repository relation kind, identify absent taxonomy rather than invent it, and must not materialize the I98 methodology until every required binding is actually resolved.
