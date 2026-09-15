# Relationship / Spouse T8 — Role-Neutral T6 Input Governance

Issue: #595

Status: research authority closure only

## Decision

The final `RELATIONSHIP_T6_INPUT` authority gap is closed by governing a repository-native, fail-closed input contract over the canonical Day Master fact.

The contract is:

```text
taxonomy tier         = T6
source                = derived_fact
pathOrClaimType       = derivedFacts.dayMaster
selector field        = value.yinYang
acceptedStatuses      = [resolved]
required              = true
ambiguityBehavior     = requires_resolved
provenance            = preserve dayMaster.evidenceRefs
```

The input contract does not reconstruct or infer a Day Master. It consumes the canonical fact only after the calculation layer has resolved it.

## Why this closes the final authority gap

The preceding governance chain already established all four earlier authority requirements:

```text
QUALIFYING_PRIMARY_WITNESS = CLOSED
INDEPENDENT_NORMATIVE_PROVENANCE = CLOSED
EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING = CLOSED
CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE = CLOSED
RELATIONSHIP_T6_INPUT = OPEN
```

The missing step was not another external source or another semantic rule. It was the repository-owned contract for how the admitted spouse selector receives a canonical fact at the T6 input boundary.

The repository already defines:

- `TaxonomyTier`, including `T6`;
- `RuleInputRequirement` with `derived_fact`, `acceptedStatuses`, `required`, and `ambiguityBehavior`;
- `FactState<T>` with `resolved`, `ambiguous`, and `unavailable` states;
- `CanonicalSajuSnapshot.derivedFacts.dayMaster: FactState<StemFact>`;
- `StemFact.yinYang: '양' | '음'`.

No new runtime object model is necessary.

## Resolved-only projection

A resolved canonical Day Master can be projected into the governed T6 envelope:

```text
resolved Day Master
  -> read value.yinYang
  -> preserve evidenceRefs
  -> reuse the already governed semantic correspondence
```

The correspondence is not redefined here:

```text
양 -> INDIRECT_WEALTH / 편재 / 偏財
음 -> INDIRECT_POWER / 편관 / 偏官
```

This frontier only governs the input boundary that supplies the selector value.

## Fail-closed behavior

The contract does not select among ambiguous candidates and does not invent a value when the canonical fact is unavailable.

```text
resolved    -> governed T6 input envelope
ambiguous   -> no T6 input
unavailable -> no T6 input
```

This matches the repository's existing `requires_resolved` ambiguity vocabulary.

## Provenance

For a resolved Day Master, `evidenceRefs` are copied into the T6 envelope unchanged in meaning. The research projector does not replace them with a synthetic source reference and does not drop them.

That keeps the T6 input traceable back to the canonical calculation fact.

## Historical T5 boundary remains intact

PR #312 remains controlling for the old lossy T5 path.

Still forbidden:

```text
broad T5 family presence -> spouse authority relabelling
discarded Ten-God subtype reconstruction
discarded source-slot reconstruction
general relationship T8 -> spouse-specific authority relabelling
```

This T6 contract consumes `derivedFacts.dayMaster` directly. It does not use the T5 family-presence tuple.

## No demographic or partner inference

The governed input requires no field for:

```text
native sex
partner sex
partner identity
sexual orientation
second chart
compatibility score
```

The T6 envelope also does not authorize conclusions about:

```text
marriage existence or guarantee
fertility
relationship legality or ethics
```

The only governed selector input is resolved native Day Master polarity.

## No cross-source stitching

This input governance chains from the merged repository-owned semantic correspondence contract. It does not import DailyAstro bilateral/Nayin compatibility semantics or combine separate sources to manufacture a T6 selector.

## Authority ledger after this governance

If the exact upstream four-of-five state is valid, the research authority ledger becomes:

```text
QUALIFYING_PRIMARY_WITNESS = CLOSED
INDEPENDENT_NORMATIVE_PROVENANCE = CLOSED
EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING = CLOSED
CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE = CLOSED
RELATIONSHIP_T6_INPUT = CLOSED

authorityGapsClosed = 5/5
authorityGapsOpen = 0/5
```

This means the research authority prerequisites tracked by this five-gap ledger are complete.

It does **not** mean a runtime spouse interpretation feature is admitted or activated.

## Runtime / Production boundary

This change does not register or activate any of the following:

```text
MethodologyDefinition
producer
RuleDefinition
ClaimTypeDefinition
InterpretationPack
consumer narrative
compatibility consumer
preview/default route
Production route
```

Therefore, even after five-of-five research authority closure:

```text
authorityAdmissionReady = false
spouseT8ProducerReady = false
productionPromotionReady = false
Production = HOLD
```

A separate runtime-admission review must decide whether and how to convert the research authority chain into registered methodology/rule/claim artifacts.

## Implementation shape

The research module exports:

1. a standard `RuleInputRequirement`-compatible requirement;
2. a typed T6 input envelope;
3. a resolved-only projector over `FactState<StemFact>`;
4. a content-addressed governance report chained from the exact four-of-five semantic-governance report.

The projector is research-only and is not registered with the runtime engine.

## Regression requirements

Tests pin all of the following:

- `T6` target taxonomy tier;
- `derived_fact` source;
- `derivedFacts.dayMaster` canonical path;
- `value.yinYang` selector field;
- resolved-only acceptance;
- `requires_resolved` ambiguity behavior;
- Yang and Yin reuse of the existing governed correspondence;
- preservation of `evidenceRefs`;
- fail-closed ambiguous/unavailable behavior;
- no T5 reconstruction;
- no demographic, partner, second-chart, or compatibility input;
- exact `5/5 CLOSED, 0/5 OPEN` research ledger;
- readiness/runtime/Production remain disabled/HOLD;
- deterministic content addressing.

## Next frontier

After this governance is merged and exact merged-SHA CI/PCC passes, any continuation must be a **separate runtime-admission frontier**. It must not treat five-of-five research authority closure as automatic authorization to register a producer, rule, claim type, pack, narrative, preview route, or Production behavior.
