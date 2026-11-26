# I24 Challenge Mechanism Composition Review v1

## Purpose

I24 asks whether challenging-side evidence can be composed without collapsing distinct Ten-God relations into one generic weakening quantity.

The answer is deliberately narrow:

- `output` is preserved as an output/leakage mechanism,
- `wealth` is preserved as a day-master-controls / expenditure-control mechanism,
- `officer` is preserved as an external control-pressure mechanism,
- no global precedence or additive magnitude is inferred among them.

## Source boundary

The `滴天髓闡微` strength discussion distinguishes leakage through 食傷 from harm/control through 官殺 and repeatedly makes their usefulness depend on the surrounding chart. This does not support treating the two as interchangeable units of weakening.

The `淵海子平` day-master relation taxonomy also distinguishes:

```text
我生 -> output / 食傷
我克 -> wealth / 財
克我 -> officer-control / 官殺
```

I24 therefore preserves mechanism identity before any later effect review.

## Implemented taxonomy

```text
output  -> OUTPUT_LEAKAGE
wealth  -> WEALTH_EXPENDITURE_CONTROL
officer -> OFFICER_CONTROL_PRESSURE
```

Multiple observations of the same mechanism remain auditable instances. They are not summed into magnitude.

Mixed mechanisms remain mixed instead of being forced into a total order.

## Hard guards

```text
crossMechanismPrecedenceAuthorized = false
repeatedEvidenceAggregation = not_authorized
challengeEffectVerdict = not_determined
relationSpecificEffectRequired = true
relativeForceVerdictAuthorized = false
classificationAuthorized = false
numericScoringAuthorized = false
```

## Prohibited equivalences

```text
output membership  != quantified leakage
wealth membership  != quantified expenditure
官殺 membership    != quantified control pressure
multiple evidence  != larger numeric force
mixed mechanisms   != one challenge score
mechanism grouping != day-master strength verdict
```

## Implementation

- `src/research/i24-challenge-mechanism-composition.ts`
- `test/i24-challenge-mechanism-composition.test.ts`

## Verification

```text
HEAD:          b463419b07dcd95ec1025f5ba8d79b642daa81ae
CI run number: 438
result:        SUCCESS

lint:          PASS
TS6 typecheck: PASS
Vitest:        58 files / 318 tests PASS
build:         PASS
```

## Review conclusion

```text
CHALLENGE_MECHANISM_TAXONOMY = IMPLEMENTED / VERIFIED
CROSS_MECHANISM_PRECEDENCE   = NOT AUTHORIZED
CHALLENGE_EFFECT_VERDICT     = NOT DETERMINED
NUMERIC_CHALLENGE_SCORE      = NOT AUTHORIZED
STRENGTH_CLASSIFICATION      = NOT AUTHORIZED
```

The next problem is relation-specific effect methodology, not mechanism identification.
