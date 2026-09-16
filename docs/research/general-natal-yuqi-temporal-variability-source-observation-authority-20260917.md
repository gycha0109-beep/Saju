# General Natal — Yuqi temporal variability source observation authority

Date: 2026-09-17  
Issue: #725  
Scope: `yuqi_temporal_variability_source_observation`

## Decision

```text
AUTHORIZED_OBSERVATION_ONLY
```

This artifact preserves one selected-source observation that the referenced 餘氣 context is described differently across temporal positions. It does not authorize a runtime Yuqi temporal classifier or any root-weight scalar.

## Selected direct source

`子平真詮 / 子平真詮評註 — 論十干得時不旺失時不弱`

Source:

```text
https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm
```

Freshly re-verified text:

```text
清明後十二日，乙木猶司令，輕而不輕，在土旺之後，則為輕矣；然亦可抵一比劫也。
```

The observation is stored without converting the phrases into an executable weighting rule:

```text
sourceRootKind              = 餘氣
earlyTemporalAnchor         = 清明後十二日
earlyCommandPhrase          = 乙木猶司令
earlyWeightPhrase           = 輕而不輕
lateTemporalAnchor          = 土旺之後
lateWeightPhrase            = 則為輕矣
comparisonPhrase            = 然亦可抵一比劫也
temporalVariabilityObserved = true
```

## Upstream boundary

This artifact records only issue-level adjacency and consumes no upstream evaluation.

- #566 preserves bounded source comparison propositions without a generalized root-weight evaluator.
- #575 preserves Earth-Wang branch-location evidence while explicitly keeping the 18-day 人元司令 / Earth-command subperiod timing evaluator unauthorized.
- #720 binds already-governed bounded operands to exact source propositions only; it does not authorize global, inverse, transitive, or ordinary-strength ranking.

## Canonical representability

The pinned `manseryeok@2.0.0` solar-term runtime can represent `청명 / 淸明` and its exact term instant. That is a technical representability fact, not semantic authority for the source sentence.

This observation-only artifact consumes no canonical chart input:

```text
canonicalInputRequired                      = false
chartFactsConsumed                          = false
solarTermContextConsumed                    = false
yuqiEvaluationConsumed                      = false
boundedRootComparisonEvaluationConsumed     = false
qingmingTermRuntimeRepresentable            = true
qingmingRuntimeRepresentabilityIsSemanticAuthority = false
tuwangAfterBoundaryGoverned                 = false
earthMonthCommand18DayTimingFactAvailable   = false
generalizedMonthCommandPhaseFactAvailable   = false
```

### Why the full temporal rule remains blocked

`清明` itself can be represented technically, but current governed authority does not settle:

```text
乙木猶司令
土旺之後
18-day 人元司令 / Earth-command subperiod
```

In particular, #575 explicitly left the 18-day command-period timing primitive unauthorized. Therefore `土旺之後` must not be guessed from a calendar duration or external convention.

Likewise, `然亦可抵一比劫也` is preserved as source language. It is **not** promoted to a universal identity such as `餘氣 = 1 比劫`, a numeric weight, or a reusable non-numeric scalar.

## Explicit non-authority

This artifact does not authorize:

```text
清明 elapsed time -> final Yuqi weight
清明 elapsed time -> 乙木 command phase
土旺之後 -> guessed datetime boundary
18-day 人元司令 timing
乙木猶司令 -> generalized month-command resolver
餘氣 = 1 比劫
餘氣 -> numeric weight
餘氣 -> generalized non-numeric scalar
#720 bounded proposition -> global root ranking
#720 bounded proposition -> inverse root ranking
#720 bounded proposition -> transitive root ranking
bounded root comparison -> ordinary strength
餘氣 -> 黨眾 / 強 / 不弱
final 強弱 / 旺衰
Gyeokguk candidate / establishment
Production fact emission
SKU / Commerce activation
```

No executable evaluator is exported from the corresponding source authority module.

## Production invariant

Unchanged:

```text
GEJU_CANDIDATE                     = NOT_EMITTED
GEJU_ESTABLISHMENT_STATE           = NOT_EMITTED
GENERAL_NATAL_PRODUCTION_AUTHORITY = BLOCKED
P0-CM-03                           = OPEN
NEXT_PRODUCTION_SKU                = NONE
Commerce                           = HOLD
```

This authority remains research-only and observation-only.
