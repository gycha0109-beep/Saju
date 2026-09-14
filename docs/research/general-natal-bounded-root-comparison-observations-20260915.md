# General Natal — bounded relative root-comparison observations

Date: 2026-09-15  
Issue: #566  
Status: research-only observation authority  
Production authority: BLOCKED

## Question

Can the repository govern the selected source's directly stated relative root-comparison sentences without silently converting them into a chart evaluator, numeric score, global ordering, or transitive weighting system?

## Duplicate audit

Merged #530/#531 already records the comparative sentences as bounded source evidence, but explicitly keeps:

```text
boundedSourceExampleMatcherAuthorized = false
relative_comparison_to_non_numeric_weighting_rule = unresolved
comparative_phrase_to_numeric_score = forbidden
bounded_example_to_all_stems_extrapolation = forbidden
```

Repository issue/PR/code searches found no dedicated standalone artifact governing the comparison sentences themselves as a machine-readable observation registry.

## Selected direct source

```text
子平真詮 / 子平真詮評註
論十干得時不旺失時不弱
https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm
```

Reviewed directly on 2026-09-15.

The selected source directly states:

```text
得一比肩，不如得支中一墓庫
得二比肩，不如得一餘氣
得三比肩，不如得一長生祿刃
```

This review governs those three statements only as bounded observations.

## Machine-readable observation surface

The research module records exactly three propositions:

```text
1 peer stem  source-stated-less-than  1 applicable 墓庫 root
2 peer stems source-stated-less-than  1 applicable 餘氣 root
3 peer stems source-stated-less-than  1 applicable 長生/祿/刃 root
```

The words `applicable` and `source-stated-less-than` are deliberate.

They do not mean that this artifact can decide whether an arbitrary chart branch is 墓庫, 餘氣, 長生, 祿, or 刃. Those classification authorities are separate. They also do not mean that the source has supplied a numeric scale.

No function accepts a natal chart, day master, stem, branch, hidden-stem array, or calculated root class in this artifact.

## Context-sensitivity boundary

The same 評註 immediately qualifies the surrounding root discussion. For 餘氣 it notes that its lightness depends on its position around seasonal command, including:

```text
輕而不輕，在土旺之後，則為輕矣；然亦可抵一比劫也
```

It later emphasizes:

```text
通根之中，尤以月令之支為最重也
```

These surrounding statements are important authority boundaries. They prevent the three bounded comparison sentences from being promoted into a context-free universal ordering engine.

In particular, this review does not reconcile the source commentary into a single mathematical scale. It preserves the statements and their context separately.

## Verdict

```text
DIRECT_SOURCE_BOUNDED_RELATIVE_COMPARISONS = OBSERVED
DIRECT_SOURCE_CONTEXT_SENSITIVITY = OBSERVED
BOUNDED_COMPARISON_PROPOSITION_REGISTRY = AUTHORIZED_OBSERVATION_ONLY
CHART_LEVEL_COMPARISON_EVALUATOR = UNAUTHORIZED
BOUNDED_SOURCE_EXAMPLE_MATCHER = UNAUTHORIZED
TRANSITIVE_CLOSURE = UNAUTHORIZED
GENERALIZED_GLOBAL_ROOT_RANKING = UNAUTHORIZED
NUMERIC_ROOT_WEIGHT = UNAUTHORIZED
LINEAR_WEIGHT_SCALE = UNAUTHORIZED
NON_NUMERIC_WEIGHTING_RULE = UNRESOLVED
GENERALIZED_ROOT_WEIGHT_CLASSIFIER = UNAUTHORIZED
```

## Why transitive closure is not allowed

The artifact must not reason from the three stored propositions into new claims such as:

```text
A > B and B > C, therefore A > C
```

No such complete relation graph is directly governed by the selected passage. The source statements are bounded rhetorical/comparative propositions embedded in a broader context-sensitive discussion.

## Why numeric conversion is not allowed

Counts of 比肩 in the source sentences are not coefficients. This artifact does not authorize transformations such as:

```text
墓庫 = 1.1
餘氣 = 2.1
長生/祿/刃 = 3.1
```

or any other score, multiplier, linear scale, probability, strength percentage, or ordinary strong/weak threshold.

## Upstream authority chain

This artifact chains only to the merged #530/#531 root-weight authority review and its definition hash. It does not consume:

- #548 `命理探源` Twelve-Growth stage cells;
- hidden-stem array order;
- a generalized Lu matcher;
- a generalized Yangren matcher;
- production interpretation facts.

Existing separately governed research primitives remain separate authorities. This observation registry does not compose them into a classifier.

## Explicit non-authority

```text
chart facts -> comparison result
bounded proposition -> universal matcher
bounded proposition -> transitive relation
bounded proposition -> global root ranking
comparative phrase -> numeric score
counts -> linear weight coefficients
source example -> all stems/branches extrapolation
root comparison -> ordinary strength
root comparison -> GEJU_CANDIDATE
root comparison -> GEJU_ESTABLISHMENT_STATE
root comparison -> production fact
```

All remain unauthorized.

## Product / Commerce invariant

```text
GEJU_CANDIDATE                     = NOT_EMITTED
GEJU_ESTABLISHMENT_STATE           = NOT_EMITTED
GENERAL_NATAL_PRODUCTION_AUTHORITY = BLOCKED
P0-CM-03                           = OPEN
NEXT_PRODUCTION_SKU                = NONE
Commerce                           = HOLD
```

No MyeongHa composition, ProductHost, Character, Narrative, LLM, API/browser, SKU, Payment, Entitlement, Refund, or Commerce behavior is changed.

## Change surface

Exactly three research files:

```text
src/research/general-natal-bounded-root-comparison-observations.ts
test/general-natal-bounded-root-comparison-observations.test.ts
docs/research/general-natal-bounded-root-comparison-observations-20260915.md
```
