# I64 — Dispatched Relation Current-Chart Settlement Substrate Verification Methodology Review

## Status

```text
STRICT CLOSED
```

## Canonical decision

```text
I59_EXACT_DOMAIN_RULES_REUSABLE_PER_I63_DISPATCHED_PAIR_OUTCOMES_BLOCKED
```

I64 authorizes reuse of the already-closed I59 exact-domain substrate verification rules on each exact I61 relation-id/kind pair after I63 has canonically dispatched that pair to a concrete settlement dependency.

It does not define a parallel substrate policy and does not weaken I59 authority-domain restrictions.

## Authorized concrete dependencies

```text
CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT
CLASH_RELATIVE_FORCE_SETTLEMENT
CLASH_RESCUE_SETTLEMENT_WHERE_APPLICABLE
CLASH_INTERACTION_SETTLEMENT
COMPETING_COMBINATION_BINDING_INTERACTION_SETTLEMENT
```

`TOUCH_SPECIFIC_RELATION_SETTLEMENT` is no longer a generic verification target after I63 dispatch. `COMPETING_RELATION_SETTLEMENT` remains a precedence/settlement blocker.

## Required exact identity

Every pair-local verification must preserve:

```text
mechanism
current-combination identity
dispatched relation id
dispatched relation kind
support-source pillar
support-source component
support-source value
```

The original I59/I33/I35/I47 scope boundaries remain authoritative.

## Hard boundaries

```text
I33 challenge-target-root clash evidence != arbitrary support-source clash evidence
I35 challenge-target combination evidence != arbitrary combination catalog
I47 bureau-state evidence                != support-source destruction
pair-local substrate verified            != settlement outcome resolved
multiple verified pair substrates        != cross-relation precedence
```

```text
methodologyApplicabilityAloneSufficientForVerification = false
crossRelationPrecedenceAuthorized                       = false
multiTouchAggregationAuthorized                         = false
settlementOutcomeResolutionAuthorized                   = false
supportChannelActivationVerdictAuthorized               = false
supportChannelPersistenceVerdictAuthorized              = false
supportChannelNeutralizationVerdictAuthorized           = false
supportChannelDestructionVerdictAuthorized               = false
supportChannelNetEffectVerdictAuthorized                 = false
targetPostRelationRootState                              = not_determined
effectiveMechanismForceVerdict                           = not_determined
relationSpecificUsefulnessHarmfulness                    = not_determined
classificationAuthorized                                 = false
numericScoringAuthorized                                 = false
```

## Verification

```text
HEAD   20efc488d039e09e6645ce35a601c25c9b3c87d7
CI     #675 SUCCESS
FILES  120 passed
TESTS  649 passed
I64    6 / 6 PASS
lint   PASS
typecheck PASS
test   PASS
build  PASS
```

## Next gate

```text
I65 — Challenge Combination Support Channel Dispatched Relation Current-Chart Settlement Substrate Verification Evidence Adapter
```

I65 may materialize pair-local current-chart substrate verification from exact I61/I63 dispatch identity against I33/I35/I47 authority. It must not resolve settlement outcomes, competing-relation precedence, support activation/persistence, effective force, scoring, or classification.
