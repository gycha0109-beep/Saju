# I23 Non-Numeric Strength Decision Readiness Review v1

## Purpose

I23 does not ask whether the day master is strong or weak.

It asks:

> Given the current research substrate, is an ordinary strength decision methodologically ready, or which unresolved dependencies require the engine to stop or route elsewhere?

The output is therefore a deterministic **readiness / stop-reason graph**, not a classifier.

## Source findings

### 滴天髓闡微

The month-order discussion explicitly warns against rigid seasonal classification. A chart can be seasonally favored yet endangered by heavy counter-force, or seasonally weak yet become substantial through deep rooting and support. The text also distinguishes heavier and lighter roots and warns against treating season alone as the final strong/weak answer.

The weakening/support discussion further separates `幫` (peer/rob-wealth support) from `助` (resource/印綬 support), with examples where either can be useful or harmful depending on the rest of the chart. This does not support a universal additive support score.

### 子平真詮評注

The commentary explicitly separates several semantic methods, including 扶抑, 病藥, 調候, 專旺/從化, and 通關. Even where 扶抑 is used, special-follow/transform structures are not simply ordinary strength cases.

## Decision-graph policy

I23 therefore uses the following priority:

```text
unresolved input/scenario
  -> STOP_WITH_INDETERMINATE

special-pattern signal
  -> ROUTE_SPECIAL_PATTERN_REVIEW

otherwise unresolved methodology dependencies
  -> STOP_FOR_METHODOLOGY_REVIEW
```

There is intentionally **no** branch for:

```text
STRONG
WEAK
VERY_STRONG
VERY_WEAK
PERCENTAGE
SCORE
```

## Tracked blockers

I23 currently preserves these blocker classes:

```text
INPUT_OR_SCENARIO_INDETERMINATE
SPECIAL_PATTERN_REVIEW_UNRESOLVED
POST_RELATION_ROOT_EFFECT_UNRESOLVED
SUPPORT_FRONTIER_INCOMPARABLE
RESOURCE_SUPPORT_EFFECT_UNRESOLVED
EARTH_ROOT_CLASS_UNRESOLVED
POST_RELATION_ROOT_PRECEDENCE_UNRESOLVED
RESCUE_EFFECT_UNRESOLVED
SUPPORT_EFFECT_VERDICT_UNRESOLVED
CHALLENGE_EFFECT_COMPOSITION_MISSING
CLASSIFIER_POLICY_NOT_AUTHORIZED
```

These blockers are not converted to negative points or confidence penalties.

## Key non-equivalences

```text
NO_BASELINE_SPECIAL_SIGNAL != ordinary classifier ready
singleton support frontier != support effect resolved
seasonal advantage         != clash winner
support evidence present   != support magnitude resolved
challenge membership       != challenge effect composed
no tracked relation        != post-relation preservation proven
```

## Implementation

- `src/research/i23-strength-decision-readiness.ts`
- `test/i23-strength-decision-readiness.test.ts`

Hard guards:

```text
ordinaryStrengthClassificationAuthorized = false
numericScoringAuthorized = false
strongWeakVerdict = not_emitted
```

## Verification

```text
HEAD:          e1148ed0fa7889016f72931efadeb70b5edf0eff
CI run number: 433
result:        SUCCESS

lint:          PASS
TS6 typecheck: PASS
Vitest:        57 files / 313 tests PASS
build:         PASS
```

## Review conclusion

```text
READINESS_GRAPH            = IMPLEMENTED / VERIFIED
DETERMINISTIC_STOP_REASONS = IMPLEMENTED / VERIFIED
STRONG_WEAK_CLASSIFIER     = NOT IMPLEMENTED
NUMERIC_SCORING            = NOT AUTHORIZED
```

The most important newly explicit blocker is `CHALLENGE_EFFECT_COMPOSITION_MISSING`: challenge-side output/wealth/officer evidence exists as membership evidence, but it has not yet received a source-backed non-numeric composition model.
