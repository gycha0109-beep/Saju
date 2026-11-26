# Relationship / Spouse T8 — Role-Neutral Semantic Correspondence Governance

Issue: #591

## 1. Decision

This artifact governs the repository-owned semantic correspondence for the already admitted role-neutral spouse-star selector.

The governed correspondence is:

```text
canonical input path:
  derivedFacts.dayMaster.yinYang

양 -> INDIRECT_WEALTH / 편재 / 偏財
음 -> INDIRECT_POWER / 편관 / 偏官
```

The correspondence is admitted only as a **Relationship / Spouse / natal spouse-star marker semantic** for the already admitted methodology family.

It is not a runtime producer, T6 object, rule registration, claim type, interpretation pack, narrative, compatibility consumer, preview default, or Production behavior.

## 2. Upstream authority state

This artifact accepts only the exact current upstream three-of-five state preserved by the merged DailyAstro boundary, which itself chains from the merged Whisper direct-body positive evidence.

Required upstream state:

```text
QUALIFYING_PRIMARY_WITNESS = CLOSED
INDEPENDENT_NORMATIVE_PROVENANCE = CLOSED
EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING = CLOSED
CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE = OPEN
RELATIONSHIP_T6_INPUT = OPEN

authorityGapsClosed = 3/5
authorityGapsOpen = 2/5
Production = HOLD
```

If that exact content-addressed upstream state is not present, this governance artifact fails closed and closes no authority gap.

## 3. Why historical PR #312 remains valid

Historical PR #312 reviewed semantic-correspondence feasibility against the then-current T5 family-presence producer.

Its fail-closed finding remains valid:

- the current T5 family-presence producer collapses Ten-God subtype identity into broad family classes;
- broad Wealth presence does not preserve `편재` versus `정재`;
- the emitted family-presence state does not preserve the source-slot identity required by that old semantic route;
- it also does not establish seasonal-command, strength/wangshuai, or dominance semantics for spouse-specific interpretation;
- general relationship T8 semantics cannot simply be relabelled as spouse-specific semantics;
- discarded information must not be reconstructed downstream and called governed authority.

This artifact does **not** overturn that conclusion.

Instead, the admitted Whisper selector introduces a different input route that never needs the lossy T5 family tuple.

## 4. Canonical fact route

The current calculation contract already defines:

```text
CanonicalSajuSnapshot
  -> derivedFacts
    -> dayMaster: FactState<StemFact>

StemFact
  -> value: HeavenlyStem
  -> element: FiveElement
  -> yinYang: YinYang

YinYang = '양' | '음'
```

Therefore the new semantic correspondence can bind directly to:

```text
derivedFacts.dayMaster.yinYang
```

No Ten-God family reconstruction is required.

No historical sex field is required.

No partner data is required.

No second chart is required.

No Relationship T6 object is required merely to define this correspondence.

## 5. Governed mapping

### Yang Day Master

```text
input:
  derivedFacts.dayMaster.yinYang = 양

semantic marker:
  INDIRECT_WEALTH
  편재
  偏財
```

### Yin Day Master

```text
input:
  derivedFacts.dayMaster.yinYang = 음

semantic marker:
  INDIRECT_POWER
  편관
  偏官
```

The mapping is encoded as a TypeScript record keyed by the repository's `YinYang` type. If the canonical polarity contract drifts, compile-time verification must fail rather than silently accept a new selector domain.

## 6. Meaning boundary

The governed value means only:

> for this admitted Relationship / Spouse / natal methodology family, the selected Ten-God subtype is the spouse-star semantic marker associated with the native Day Master's polarity.

It does not establish or authorize any of the following:

```text
native sex
partner sex
partner identity
sexual orientation
marriage existence
marriage guarantee
fertility
relationship legality
relationship ethics
compatibility score
second-chart properties
```

The Whisper source's school-dependence caveat remains material. This governance contract does not claim that the mapping is a universal classical consensus or scientifically validated causal rule.

## 7. DailyAstro boundary

DailyAstro remains two-chart compatibility discovery evidence only.

The following DailyAstro signals are explicitly **not** imported into this repository-owned natal correspondence:

- bilateral spouse/dating compatibility routing;
- male/female/neutral compatibility columns;
- Nayin fallback;
- generation / same-element / control compatibility weights;
- any second-chart relation;
- any compatibility score.

DailyAstro closes no semantic-correspondence gap here. Its role in the upstream chain is to preserve the current three-of-five authority snapshot and the two-chart boundary, not to manufacture the mapping.

## 8. No cross-source stitching

The semantic correspondence is not manufactured by combining incompatible partial rules from multiple sources.

The relationship is:

```text
Whisper direct-body evidence
  -> admits the Day-Master-polarity selector

repository canonical calculation contract
  -> already preserves the selector input `dayMaster.yinYang`

this governance artifact
  -> freezes the repository-owned meaning of that admitted selector
```

No DailyAstro compatibility rule, old Wanli subtype route, Saju Atelier gender branch, Sajunareum signal, InnerCipher methodology, or other external rule is combined to create the mapping.

## 9. T5 fail-closed invariants

Still forbidden:

```text
T5 broad family presence -> spouse semantic relabelling
T5 discarded subtype reconstruction
T5 discarded slot reconstruction
historical PR #312 blocker erasure
```

This artifact specifically records:

```text
t5FamilyTupleRequired = false
t5SubtypeReconstructionAuthorized = false
generalRelationshipRelabellingAuthorized = false
```

The new path succeeds because the necessary polarity fact already exists canonically, not because old missing T5 information has been recovered.

## 10. T6 / runtime boundary

This artifact does not establish Relationship T6 input.

Frozen false:

```text
currentRelationshipT6InputPathEstablished = false
producerRegistered = false
ruleRegistered = false
claimTypeRegistered = false
interpretationPackRegistered = false
consumerNarrativeActivated = false
compatibilityConsumerActivated = false
previewDefaultRouteChanged = false
productionPromotionReady = false
```

A later T6 frontier must independently establish how a governed input object or producer lineage carries the admitted selector into downstream relationship interpretation.

A generic neutral object must not be invented and relabelled as T6 merely because semantic correspondence now exists.

## 11. Authority ledger after this governance

If the exact upstream three-of-five state is accepted, only the fourth gap closes:

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

`authorityAdmissionReady` remains false because Relationship T6 input authority is still missing.

## 12. Implementation scope

Exactly three research-only artifacts are permitted for #591:

```text
src/research/relationship-spouse-t8-role-neutral-semantic-correspondence-governance.ts
test/relationship-spouse-t8-role-neutral-semantic-correspondence-governance.test.ts
docs/research/relationship-spouse-t8-role-neutral-semantic-correspondence-governance.md
```

No other source, contract, registry, runtime, workflow, pack, route, or consumer file is changed.

## 13. Verification contract

Tests must pin:

1. exact upstream 3/5 authority acceptance;
2. canonical path `derivedFacts.dayMaster.yinYang`;
3. `양 -> INDIRECT_WEALTH / 편재 / 偏財`;
4. `음 -> INDIRECT_POWER / 편관 / 偏官`;
5. historical PR #312 fail-closed boundary remains valid;
6. no T5 subtype reconstruction;
7. no sex/orientation/identity/marriage/fertility/legality/compatibility inference;
8. no DailyAstro bilateral semantic import;
9. semantic correspondence alone changes OPEN -> CLOSED;
10. Relationship T6 input remains OPEN;
11. resulting ledger is exactly 4/5 CLOSED, 1/5 OPEN;
12. no runtime or Production activation;
13. deterministic content-addressed evidence identity.

## 14. Next frontier

After this governance is merged and exact merged-SHA CI/PCC succeeds, the only remaining authority gap is:

```text
RELATIONSHIP_T6_INPUT
```

Recommended next action:

```text
GOVERN_RELATIONSHIP_T6_INPUT_FOR_ADMITTED_ROLE_NEUTRAL_SPOUSE_SELECTOR
```

Production remains HOLD until that independent frontier is resolved and downstream activation is separately authorized.
