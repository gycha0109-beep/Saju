# General Natal Gyeokguk Establishment Outcome Representation Review — 2026-09-13

## Scope

Issue #516 continues the General Natal establishment frontier after merged #514.

The question is narrower than establishment derivation:

```text
Given direct source observations for 成 / 敗,
成中有敗 / 敗中有成,
帶忌 / 救應,
and 因成得敗 / 因敗得成,
what representation can be preserved without inventing a canonical terminal GEJU_ESTABLISHMENT_STATE?
```

This is a research-only authority review. It does not change production calculation, ProductHost, Character, narrative generation, SKU, payment, entitlement, refund, or Commerce behavior.

## Upstream authority

This review chains exactly to merged #514 by version and definition hash:

```text
GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_REVIEW_VERSION
GENERAL_NATAL_GEJU_ESTABLISHMENT_SOURCE_CLAUSE_ADMISSION_REVIEW_DEFINITION_HASH
```

#514 established that direct source success/failure clause families plus a mixed-outcome/rescue layer are available at research authority, while canonical execution remains unauthorized.

## Direct source surfaces

Selected source:

- `子平真詮評注`
- `論用神成敗救應`
- `論用神因成得敗因敗得成`
- Chinese Text Project cross-reference: `https://ctext.org/wiki.pl?chapter=974137&if=gb`

The first section directly distinguishes:

```text
成
敗
成中有敗
敗中有成
帶忌
救應
```

and directly binds the mixed-outcome language to the intervention layer:

```text
成中有敗 -> 帶忌
敗中有成 -> 救應
```

A later section separately uses the causal-transition vocabulary:

```text
因成得敗
因敗得成
```

The repository must not silently declare these later causal-transition terms semantically identical to the earlier mixed-outcome phrases. They are preserved as a separate source-semantic axis unless a governed authority explicitly establishes equivalence.

## Representation decision

The source supports a layered research representation with four distinct axes:

| axis | admitted source-semantic vocabulary |
| --- | --- |
| base outcome | `cheng`, `bai` |
| mixed outcome | `cheng_zhong_you_bai`, `bai_zhong_you_cheng` |
| intervention | `dai_ji`, `jiu_ying` |
| causal transition | `yin_cheng_de_bai`, `yin_bai_de_cheng` |

Decision:

```text
SOURCE_SEMANTIC_LAYERED_REPRESENTATION = AUTHORIZED_RESEARCH_ONLY
SOURCE_MIXED_OUTCOME_INTERVENTION_BINDINGS = AUTHORIZED
SOURCE_CAUSAL_TRANSITION_VOCABULARY = OBSERVED

MIXED_OUTCOME_TO_TRANSITION_EQUIVALENCE = UNAUTHORIZED
CANONICAL_OUTCOME_REPRESENTATION = UNAUTHORIZED
CANONICAL_TERMINAL_STATE = UNAUTHORIZED
BINARY_COLLAPSE = UNAUTHORIZED
RESCUE_PRECEDENCE = UNAUTHORIZED
```

## Why a single enum is not enough

A flat enum such as:

```text
formed | failed | mixed | rescued
```

would erase source structure.

The source distinguishes at least:

1. a base success/failure assessment;
2. a countervailing mixed-outcome statement;
3. an intervention mechanism such as 帶忌 or 救應;
4. separately worded causal-transition examples.

Therefore this review does not authorize reducing every source observation to a single terminal boolean or winner state.

## Direct relation bindings admitted

Only two relations are admitted as direct bindings here:

```text
cheng_zhong_you_bai -> dai_ji
bai_zhong_you_cheng -> jiu_ying
```

No relation is created between:

```text
cheng_zhong_you_bai <-> yin_cheng_de_bai
bai_zhong_you_cheng <-> yin_bai_de_cheng
```

Those may be related in interpretation, but this review does not elevate that inference into repository authority.

## Canonical execution remains blocked

The following primitives remain unresolved for chart-level execution:

```text
canonical_candidate_identity
canonical_clause_input_resolution
mixed_outcome_application_predicate
intervention_effect_resolution
transition_trigger_predicate
cross_section_semantic_equivalence
terminal_state_precedence
```

In particular:

- candidate identity is still not canonically defined;
- source clause inputs are not all available as governed canonical facts;
- the presence or absence of 帶忌 / 救應 cannot yet be calculated generally;
- transition triggers are not generalized;
- rescue ordering, strength, and precedence are not governed;
- absence of an intervention must not be converted into a terminal verdict;
- a canonical `GEJU_ESTABLISHMENT_STATE` is still not emitted.

## Coarse blocker status

This review narrows the representation problem but does not edit the shared coarse-gap contract.

All five remain open:

```text
MONTH_ORDER_HIDDEN_STEM_SELECTION_PREDICATE_AUTHORITY_MISSING
VISIBLE_STEM_TRANSPARENCY_SELECTION_PREDICATE_AUTHORITY_MISSING
BRANCH_MEETING_SELECTION_EFFECT_AUTHORITY_MISSING
MULTIPLE_GEJU_CANDIDATE_REPRESENTATION_AUTHORITY_MISSING
GEJU_ESTABLISHMENT_SUCCESS_FAILURE_PREDICATE_AUTHORITY_MISSING
```

## Product / Commerce invariant

```text
GEJU_CANDIDATE = NOT_EMITTED
GEJU_ESTABLISHMENT_STATE = NOT_EMITTED
GENERAL_NATAL_PRODUCTION_AUTHORITY = BLOCKED
P0-CM-03 = OPEN
NEXT_PRODUCTION_SKU = NONE
Commerce = HOLD
```

## Change surface

Exactly three research files:

```text
src/research/general-natal-geju-establishment-outcome-representation-review.ts
test/general-natal-geju-establishment-outcome-representation-review.test.ts
docs/research/general-natal-geju-establishment-outcome-representation-review-20260913.md
```

No production runtime or product behavior changes are authorized by this review.
