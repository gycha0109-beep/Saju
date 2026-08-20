# I25 Relation-Specific Challenge Effect Methodology Review v1

## Purpose

I25 asks what context is required before output, wealth, or officer/control evidence can receive an effective challenge interpretation.

It does **not** assign that effect.

## Source findings

`滴天髓闡微` explicitly separates:

```text
泄 -> 食傷
傷 -> 官殺
```

and explains that either can help or harm depending on day-master force and surrounding structure. The text likewise gives a weak-day-master / repeated-wealth example in which peer and resource support behave differently, so wealth pressure cannot be treated as a fixed negative unit independent of context.

`淵海子平` distinguishes the day-master relations `我生`, `我克`, and `克我`, supporting relation-specific review rather than one generic challenge score.

## Effect-review contract

### OUTPUT_LEAKAGE

Requires:

```text
DAY_MASTER_PRECLASSIFICATION_FORCE_CONTEXT
MECHANISM_EFFECTIVE_FORCE_CONTEXT
ROOT_SUPPORT_CONTEXT
STRUCTURAL_TARGET_CONTEXT
RELATION_INTERACTION_CONTEXT
```

### WEALTH_EXPENDITURE_CONTROL

Requires:

```text
DAY_MASTER_PRECLASSIFICATION_FORCE_CONTEXT
MECHANISM_EFFECTIVE_FORCE_CONTEXT
ROOT_SUPPORT_CONTEXT
PEER_SUPPORT_CONTEXT
RESOURCE_SUPPORT_CONTEXT
RELATION_INTERACTION_CONTEXT
```

### OFFICER_CONTROL_PRESSURE

Requires:

```text
DAY_MASTER_PRECLASSIFICATION_FORCE_CONTEXT
MECHANISM_EFFECTIVE_FORCE_CONTEXT
ROOT_SUPPORT_CONTEXT
RESOURCE_SUPPORT_CONTEXT
STRUCTURAL_TARGET_CONTEXT
RELATION_INTERACTION_CONTEXT
```

These lists are dependency requirements, not formulas.

`DAY_MASTER_PRECLASSIFICATION_FORCE_CONTEXT` must be independent of the final classifier; otherwise post-effect resolution would become circular.

## Hard guards

```text
fixedWeakeningDirectionAuthorized = false
numericMagnitude = not_assigned
mixedMechanismPrecedence = not_authorized
challengeEffectVerdict = not_determined
relativeForceVerdictAuthorized = false
classificationAuthorized = false
numericScoringAuthorized = false
```

## Prohibited equivalences

```text
output present  != effective leakage magnitude
wealth present  != effective burden magnitude
officer present != effective control magnitude
required context != context outcome
context outcome != final strong/weak category
```

## Implementation

- `src/research/i25-challenge-effect-methodology-review.ts`
- `test/i25-challenge-effect-methodology-review.test.ts`

## Verification

```text
HEAD:          6153b6aa53aaa651af9b11ab8d6009036454a83c
CI run number: 446
result:        SUCCESS

lint:          PASS
TS6 typecheck: PASS
Vitest:        60 files / 328 tests PASS
build:         PASS
```

## Review conclusion

```text
RELATION_SPECIFIC_DEPENDENCY_CONTRACT = IMPLEMENTED / VERIFIED
OUTPUT_EFFECT                         = NOT DETERMINED
WEALTH_EFFECT                         = NOT DETERMINED
OFFICER_EFFECT                        = NOT DETERMINED
CROSS_MECHANISM_PRECEDENCE            = NOT AUTHORIZED
STRENGTH_CLASSIFICATION               = NOT AUTHORIZED
```
