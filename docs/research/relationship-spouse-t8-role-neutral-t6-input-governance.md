# Relationship / Spouse T8 — Role-Neutral T6 Input Governance

Issue: #595

Status: research authority closure only

## 1. Decision

This artifact closes the final `RELATIONSHIP_T6_INPUT` research-authority gap by governing the repository-native input contract that feeds the already admitted and semantically governed role-neutral spouse selector.

The contract is:

```text
taxonomy tier      = T6
source             = derived_fact
pathOrClaimType    = derivedFacts.dayMaster
selector field     = value.yinYang
fact discriminator = status
acceptedStatuses   = [resolved]
required           = true
ambiguityBehavior  = requires_resolved
```

The canonical source is the existing calculation contract:

```text
CanonicalSajuSnapshot.derivedFacts.dayMaster: FactState<StemFact>
StemFact.yinYang: '양' | '음'
```

No new generic runtime object model, provenance field, producer, rule, claim type, interpretation pack, consumer, preview route, or Production route is introduced.

## 2. Correction from failed PR #597

PR #597 is permanently superseded and remains unmerged.

Its implementation incorrectly assumed:

```text
fact.state
fact.evidenceRefs
```

The actual repository contract is:

```text
ResolvedFact<T> = {
  status: 'resolved'
  value: T
}

AmbiguousFact<T> = {
  status: 'ambiguous'
  candidates: ...
  reasonCodes: ...
}

UnavailableFact = {
  status: 'unavailable'
  reasonCode: ...
}
```

`ResolvedFact<T>` has no `evidenceRefs` member.

This replacement therefore uses `status` as the discriminator and introduces no synthetic provenance field. Traceability remains the canonical fact path plus the repository's existing/future `RuleEvaluation.inputRefs` model.

## 3. Exact upstream authority prerequisite

This frontier chains only from:

```text
relationship-spouse-t8-role-neutral-semantic-correspondence-governance
```

and requires its exact content-addressed four-of-five state:

```text
QUALIFYING_PRIMARY_WITNESS = CLOSED
INDEPENDENT_NORMATIVE_PROVENANCE = CLOSED
EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING = CLOSED
CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE = CLOSED
RELATIONSHIP_T6_INPUT = OPEN

authorityGapsClosed = 4/5
authorityGapsOpen = 1/5

authorityAdmissionReady = false
spouseT8ProducerReady = false
productionPromotionReady = false
Production = HOLD
```

If that exact state or its content-addressed identity is not present, this governance fails closed and closes no authority gap.

## 4. Standard repository vocabulary

The existing interpretation contract already defines:

```text
RuleInputRequirement.source = derived_fact
RuleInputRequirement.pathOrClaimType
RuleInputRequirement.acceptedStatuses
RuleInputRequirement.required
RuleInputRequirement.ambiguityBehavior = requires_resolved
TaxonomyTier = ... | T6 | ...
```

This frontier reuses those contracts directly.

The governed requirement is:

```text
key               = relationship_spouse_role_neutral_day_master
source            = derived_fact
pathOrClaimType   = derivedFacts.dayMaster
acceptedStatuses  = ['resolved']
required          = true
ambiguityBehavior = requires_resolved
```

## 5. Resolved-only behavior

### Resolved Yang Day Master

```text
status = resolved
value.yinYang = 양
```

reuses the already governed correspondence:

```text
INDIRECT_WEALTH / 편재 / 偏財
```

### Resolved Yin Day Master

```text
status = resolved
value.yinYang = 음
```

reuses:

```text
INDIRECT_POWER / 편관 / 偏官
```

The correspondence is not redefined by this frontier. The input contract only supplies the canonical selector value.

## 6. Ambiguous and unavailable facts fail closed

```text
status = ambiguous
→ no governed T6 input

status = unavailable
→ no governed T6 input
```

No candidate is selected, synthesized, ranked, or reconstructed downstream.

## 7. Historical PR #312 remains controlling

The old T5 relationship-family path remains lossy for subtype/slot identity.

Still forbidden:

```text
broad T5 family presence -> spouse authority relabelling
discarded Ten-God subtype reconstruction
discarded source-slot reconstruction
general Relationship T8 -> spouse-specific authority relabelling
```

This frontier does not repair or reinterpret the T5 tuple. It consumes the already preserved canonical Day Master fact directly.

Therefore:

```text
t5FamilyInputRequired = false
discardedT5SubtypeReconstructionAuthorized = false
discardedT5SlotReconstructionAuthorized = false
generalRelationshipT8RelabellingAuthorized = false
```

## 8. Input and inference boundary

The governed T6 input does not require:

```text
native sex
partner sex
partner identity
sexual orientation
second chart
compatibility input
```

It does not authorize:

```text
marriage existence or guarantee
fertility inference
relationship legality or ethics inference
compatibility scoring
```

The only selector input is the resolved native Day Master polarity already present in `derivedFacts.dayMaster.value.yinYang`.

## 9. No cross-source stitching

This frontier does not combine external partial rules to manufacture a new selector.

The chain is:

```text
merged direct-body / provenance authority
→ merged explicit role-neutral mapping authority
→ merged repository semantic correspondence governance
→ this repository-owned T6 input contract
```

No DailyAstro bilateral/Nayin semantics, Saju Atelier gender branch, old T5 subtype reconstruction, or second-chart logic is imported.

## 10. Authority result

When the exact upstream four-of-five state is accepted, only the fifth gap changes:

```text
QUALIFYING_PRIMARY_WITNESS = CLOSED
INDEPENDENT_NORMATIVE_PROVENANCE = CLOSED
EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING = CLOSED
CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE = CLOSED
RELATIONSHIP_T6_INPUT = CLOSED

authorityGapsClosed = 5/5
authorityGapsOpen = 0/5
```

This is research authority closure only.

It does **not** imply runtime admission or product activation.

## 11. Runtime / Production boundary

The following remain false:

```text
authorityAdmissionReady = false
spouseT8ProducerReady = false
methodologyRegistered = false
producerRegistered = false
ruleRegistered = false
claimTypeRegistered = false
interpretationPackRegistered = false
consumerNarrativeActivated = false
compatibilityConsumerActivated = false
previewDefaultRouteChanged = false
productionPromotionReady = false
Production = HOLD
```

Five-of-five authority closure must be followed, if desired, by a separate runtime-admission frontier. This artifact does not perform that admission.

## 12. Implementation scope

Exactly three new research-only files are permitted for this replacement:

```text
src/research/relationship-spouse-t8-role-neutral-t6-input-governance.ts
test/relationship-spouse-t8-role-neutral-t6-input-governance.test.ts
docs/research/relationship-spouse-t8-role-neutral-t6-input-governance.md
```

No existing runtime registry, producer, rule, claim, pack, workflow, route, or consumer file is modified.

## 13. Regression contract

Tests pin:

1. exact upstream 4/5 state;
2. canonical source `derivedFacts.dayMaster`;
3. selector `value.yinYang`;
4. FactState discriminator `status`;
5. `acceptedStatuses = ['resolved']`;
6. `ambiguityBehavior = requires_resolved`;
7. resolved `양 -> INDIRECT_WEALTH / 편재 / 偏財`;
8. resolved `음 -> INDIRECT_POWER / 편관 / 偏官`;
9. ambiguous -> no T6 input;
10. unavailable -> no T6 input;
11. no synthetic `evidenceRefs` field on the governed envelope;
12. no T5 family input;
13. no discarded subtype/slot reconstruction;
14. no native-sex input;
15. no partner-sex input;
16. no identity/orientation input;
17. no second-chart input;
18. no compatibility semantics or scoring;
19. `RELATIONSHIP_T6_INPUT` alone moves CLOSED;
20. authority becomes exactly 5/5 CLOSED, 0/5 OPEN;
21. admission/producer/runtime readiness remain false;
22. Production remains HOLD;
23. deterministic content-addressed identity remains stable.

## 14. Next frontier

After exact-head CI/PCC/PIE, fresh-main race preflight, expected-head squash merge, and exact merged-SHA push CI/PCC verification, the appropriate continuation is a separate admission-readiness review.

It must not treat:

```text
5/5 research authority closure
```

as equivalent to:

```text
runtime producer activation
or
Production promotion
```
