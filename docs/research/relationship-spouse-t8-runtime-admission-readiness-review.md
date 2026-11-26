# Relationship / Spouse T8 Runtime Admission Readiness Review

Issue: #616  
Status class: research-only readiness review  
Fresh base at implementation start: `e19f0f5ca75d571701f4c54ec285e502cf8f2896`

## 1. Question

The Relationship / Spouse T8 research chain is now exactly `5/5 CLOSED, 0/5 OPEN` after #595 / #611. The remaining question is no longer whether the spouse-star methodology has enough research authority. It is whether the current Saju interpretation runtime can represent that governed authority without inventing a new runtime schema or weakening any fail-closed boundary.

This review does **not** perform runtime admission. It only determines whether a separate admission implementation is now technically and semantically representable.

## 2. Exact upstream authority

The immediate upstream artifact is:

`src/research/relationship-spouse-t8-role-neutral-t6-input-governance.ts`

The readiness review accepts only its successful exact state:

```text
QUALIFYING_PRIMARY_WITNESS = CLOSED
INDEPENDENT_NORMATIVE_PROVENANCE = CLOSED
EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING = CLOSED
CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE = CLOSED
RELATIONSHIP_T6_INPUT = CLOSED

authorityGapsClosed = 5/5
authorityGapsOpen = 0/5
```

The upstream runtime flags must still be false/HOLD before this review can advance readiness.

## 3. Existing runtime contracts are sufficient

No new primitive is required in `src/contracts/interpretation.ts`.

### 3.1 Governed input

The existing `RuleInputRequirement` already represents the complete T6 input contract:

```text
source = derived_fact
pathOrClaimType = derivedFacts.dayMaster
acceptedStatuses = ['resolved']
required = true
ambiguityBehavior = requires_resolved
selector = value.yinYang
```

This preserves fail-closed behavior: ambiguous and unavailable Day Master facts are not admissible inputs.

### 3.2 Taxonomy

The existing `TaxonomyTier` includes both `T6` and `T8`. `RuleDefinition.taxonomy` accepts arbitrary category/subcategory strings, so the output coordinate can be represented directly as:

```text
T8 / relationship / spouse
```

without relabelling the existing generic Relationship T8 output.

### 3.3 Methodology input contract

`MethodologyDefinition.inputContract.factInputs` already admits a required `derived_fact` path pattern. The readiness witness therefore uses exactly `derivedFacts.dayMaster` and does not need a local stem-polarity table, a T5 family tuple, a second chart, or demographic input.

### 3.4 Rule representation

`RuleDefinition` provides a static condition and static output template. Because the governed spouse-star result has two polarity-specific outputs, the narrow faithful representation is **two static rules**, not a new dynamic-output schema:

```text
resolved 양 -> INDIRECT_WEALTH / 편재 / 偏財
resolved 음 -> INDIRECT_POWER / 편관 / 偏官
```

Each rule consumes the same resolved-only Day Master input. This is sufficient to preserve the governed correspondence exactly.

### 3.5 Claim schema

`ClaimValueSchemaDefinition` already supports `union`, `object`, and `literal` nodes. A bounded union can therefore preserve only the two authorized correspondence tuples and reject arbitrary recombination:

```text
양 + INDIRECT_WEALTH + 편재 + 偏財
음 + INDIRECT_POWER + 편관 + 偏官
```

No generic spouse-character, marriage, fertility, legality/ethics, or compatibility value is introduced.

### 3.6 Pack lifecycle

`InterpretationPack` already supports research/staging/production lifecycle, `skip_requires_resolved`, and `registered_required` claim contracts. A future admission can therefore remain research/staging before any Production promotion.

## 4. Readiness verdict

```text
FIVE_OF_FIVE_RESEARCH_AUTHORITY = AVAILABLE
STANDARD_T6_DERIVED_FACT_INPUT_REPRESENTABILITY = AVAILABLE
RELATIONSHIP_SPOUSE_TAXONOMY_REPRESENTABILITY = AVAILABLE
METHODOLOGY_INPUT_CONTRACT_REPRESENTABILITY = AVAILABLE
FAIL_CLOSED_RULE_REPRESENTABILITY = AVAILABLE
BOUNDED_SPOUSE_STAR_CLAIM_SCHEMA_REPRESENTABILITY = AVAILABLE
INTERPRETATION_PACK_REPRESENTABILITY = AVAILABLE
RUNTIME_SCHEMA_INVENTION_REQUIRED = false
AUTHORITY_ADMISSION_READY = true
```

`authorityAdmissionReady=true` has one narrow meaning: a **separate** implementation may now register runtime contracts using the already-governed authority without reopening source research.

It does **not** mean that the current issue has registered or activated anything.

## 5. Non-activation boundary

The following remain unchanged:

```text
methodologyRegistered = false
ruleRegistered = false
producerRegistered = false
claimTypeRegistered = false
claimValueSchemaRegistered = false
interpretationPackRegistered = false
compositionPolicyRegistered = false
consumerNarrativeActivated = false
compatibilityConsumerActivated = false
previewDefaultRouteChanged = false
productionBehaviorChanged = false
spouseT8ProducerReady = false
productionPromotionReady = false
Production = HOLD
```

The exported methodology/rule/schema/pack objects in the research artifact are **type-level representability witnesses only**. They are not inserted into a runtime registry, default pack, ProductHost, narrative consumer, API route, or Production configuration.

## 6. Semantic boundaries retained

The readiness verdict does not authorize any of the following:

- T5 broad-family relabelling or discarded subtype/slot reconstruction;
- native-sex or partner-sex input;
- partner identity or sexual orientation input;
- second-chart input;
- compatibility input or scoring;
- marriage existence/guarantee inference;
- fertility inference;
- relationship legality or ethics inference;
- generic Relationship T8 output relabelled as spouse authority.

The source-bounded, school-dependent character of the admitted spouse-star method remains unchanged.

## 7. Next frontier

The next permitted step is:

```text
REGISTER_SEPARATE_RUNTIME_ADMISSION_CONTRACTS_WITHOUT_PRODUCTION_ACTIVATION
```

That future frontier should decide and register the concrete methodology, source references, claim schema/type, two role-neutral spouse rules, composition-policy/pack placement, and review attestations under the repository's normal registry controls. It must still keep narrative consumption and Production promotion separate.
