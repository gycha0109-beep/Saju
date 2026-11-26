# I26 v13 Challenge Context Availability with Clash Placement Settlement

## Purpose

I26 v13 integrates the I46 methodology and I47 clash-placement settlement evidence into the challenge-force availability graph after I45 structural three-combination bureau formation.

## Accepted upstream chain

```text
I45 STRUCTURAL_BUREAU_FORMED
  -> I46 source-bounded clash placement/settlement methodology
  -> I47 placement + settlement evidence
  -> I26 v13 availability refinement
```

The chain is accepted only when I47 is bound to the exact I45 formation report and exact I46 methodology review and every no-force/no-scoring guard remains closed.

## Generic clash settlement closure

Once I47 has classified every tracked clash topology for a routed three-combination, v13 removes the generic blocker:

```text
challenge-root three-combination clash break/damage settlement policy
```

It replaces that coarse blocker with state-specific availability.

## Direct break route

For a mechanism whose routed I47 bureau items are all:

```text
postInteractionBureauState = BROKEN_BY_TIGHT_EMBEDDED_CLASH
```

v13 also removes:

```text
challenge-root three-combination post-interaction bureau-state policy
```

This closes the bureau-state question only for that exact source-bounded topology.

The resulting existing capability records an I47 settlement summary including direct broken, contextual, and no-direct-settlement item counts.

## Contextual settlement route

For I47 items with:

```text
EMBEDDED_WITHIN_BUREAU_SPAN_NOT_TIGHT
OUTSIDE_BUREAU_SPAN_TIGHT_TO_CLASHED_PARTICIPANT
```

v13 removes the generic clash-settlement blocker but retains the broader post-interaction bureau-state question and adds:

```text
challenge-root three-combination contextual intact-vs-damaged settlement policy
```

No deterministic `DAMAGED` state or damage magnitude is manufactured.

## No-direct-settlement route

For outside/non-tight topology or no tracked clash, I46/I47 provide no intactness conclusion. v13 therefore:

- removes the generic clash break/damage blocker when the placement evidence is aligned,
- does not add the contextual damaged-state blocker unless the source-contextual placement is actually present,
- retains the broader post-interaction bureau-state dependency.

Thus:

```text
outside non-tight != bureau intact
no tracked clash  != bureau intact
```

## Fail-closed alignment

If I47 is stale or not bound to the exact I45/I46 chain, v13:

- does not accept clash-placement settlement closure,
- retains the v12 generic clash and bureau-state blockers,
- adds an explicit requirement for aligned I47 settlement evidence.

## Remaining independent blockers

Even when a direct break state is resolved, these remain independent:

```text
challenge-root combination competing-relation interaction/settlement policy
challenge-root combination seasonal-command effect
challenge-root combination support/interference effect
post-combination subject identity
post-relation root state
effective mechanism force
relation-specific usefulness/harmfulness
```

`BROKEN_BY_TIGHT_EMBEDDED_CLASH` is not converted into root destruction or an effective challenge-force verdict.

## Hard guards

```text
MECHANISM_EFFECTIVE_FORCE_CONTEXT = PARTIAL_SUBSTRATE
methodologyReadyForEffectResolution = false
challengeEffectVerdict = not_determined
relativeForceVerdictAuthorized = false
classificationAuthorized = false
numericScoringAuthorized = false
```

All mechanisms remain `effectReady = false`.

## Verification

```text
I26 v13 code/regression HEAD: 0fd764c523eb433ec897b5bf4adb8998f8c99c19
CI run:                       #588
result:                       SUCCESS

lint:                         PASS
typecheck:                    PASS
Vitest:                       94 files / 498 tests PASS
build:                        PASS
```

Dedicated v13 suite: 5/5 PASS, covering:

- embedded+tight direct-break availability closure,
- embedded non-tight contextual settlement refinement,
- outside non-tight no-direct-settlement behavior,
- stale I47 fail-close,
- deterministic report identity and global no-force/no-scoring guards.

## Conclusion

```text
GENERIC THREE-COMBINATION CLASH SETTLEMENT = RESOLVED TO PLACEMENT-SPECIFIC EVIDENCE
TIGHT EMBEDDED DIRECT BREAK ROUTE           = RESOLVED / BROKEN BUREAU STATE
CONTEXTUAL INTACT-vs-DAMAGED ROUTE          = UNRESOLVED WHERE APPLICABLE
NO-DIRECT-SETTLEMENT BUREAU STATE           = UNRESOLVED
EFFECTIVE MECHANISM FORCE                   = UNRESOLVED
CLASSIFICATION / SCORING                    = NOT AUTHORIZED
```

## Next decision gate

The next gate should determine whether the remaining source-contextual `intact-vs-damaged` cases can be refined further without inventing a damage score or precedence rule. If the classical source basis is insufficient for deterministic refinement, the contextual state must remain terminally unresolved and work should move to another independent blocker such as seasonal-command or support/interference effect.
