# I26 v22 — Challenge Context Availability with Touch-Specific Settlement Dispatch Evidence

## Decision

```text
TOUCH_SPECIFIC_SETTLEMENT_DISPATCH = AVAILABLE WHERE EXACTLY ALIGNED
DISPATCHED_RELATION_CURRENT_CHART_SETTLEMENT_SUBSTRATE = UNRESOLVED
COMPETING_RELATION_PRECEDENCE = UNRESOLVED
SETTLEMENT_OUTCOMES = UNRESOLVED
MECHANISM_EFFECTIVE_FORCE_CONTEXT = PARTIAL_SUBSTRATE
```

I26 v22 consumes aligned I63 touch-specific settlement dispatch evidence. It removes only the former dispatch-methodology blocker and exposes a narrower current-chart settlement substrate verification gap for each exact dispatched relation and routed dependency.

## Exact chain

v22 accepts I63 only when:

```text
I26 v21 relationIdentityPairClosureAccepted == true
I26 v21 I61 report id == supplied I61.reportId
I62 == canonical PAIR_KIND_DISPATCH_AUTHORIZED_PRECEDENCE_AND_OUTCOME_BLOCKED methodology
I63 upstream I61 == supplied I61.reportId
I63 upstream I62 == supplied I62.reviewId
I63 == deterministic recomputation from supplied I61 + I62
```

## Refinement

Where aligned I63 multi-touch dispatch evidence exists, v22 replaces:

```text
... touch-specific relation settlement methodology/dispatch unresolved after verified relation identity pairs: TOUCH_SPECIFIC_RELATION_SETTLEMENT
```

with exact pair/dependency gaps such as:

```text
... dispatched relation current-chart settlement substrate verification unresolved: <relationId>|branch_clash|CLASH_RELATIVE_FORCE_SETTLEMENT
... dispatched relation current-chart settlement substrate verification unresolved: <relationId>|branch_clash|CLASH_RESCUE_SETTLEMENT_WHERE_APPLICABLE
... dispatched relation current-chart settlement substrate verification unresolved: <relationId>|branch_clash|CLASH_INTERACTION_SETTLEMENT
... dispatched relation current-chart settlement substrate verification unresolved: <relationId>|branch_six_combination|COMPETING_COMBINATION_BINDING_INTERACTION_SETTLEMENT
```

This intentionally does not jump from dispatch availability to settlement outcome resolution.

## Preserved blockers

```text
... competing-relation precedence/settlement unresolved: COMPETING_RELATION_SETTLEMENT
... support-channel activation/persistence
```

Existing I60 settlement-outcome blockers for independently verified routes also remain unchanged.

## Non-equivalences

```text
dispatch evidence available != current-chart I33/I35/I47 substrate verified
dispatched clash dependency != clash relative-force verdict
dispatched rescue dependency != rescue effect
dispatched combination dependency != binding / neutralization
dispatched relation substrate gap != settlement outcome gap closed
```

## Hard guards

```text
MECHANISM_EFFECTIVE_FORCE_CONTEXT   = PARTIAL_SUBSTRATE
effectReady                         = false
methodologyReadyForEffectResolution = false
challengeEffectVerdict              = not_determined
relativeForceVerdictAuthorized      = false
classificationAuthorized            = false
numericScoringAuthorized            = false
```

## Verification

```text
I26 v22 HEAD 6e603b0a6222bb9a95c658d0779992a5488f7bf2
CI #671       SUCCESS
Test files    119 passed
Tests         643 passed
lint          PASS
typecheck     PASS
build         PASS
```

Dedicated I26 v22 suite: 5/5 PASS.

## Next gate

```text
I64 — Challenge Combination Support Channel Dispatched Relation Current-Chart Settlement Substrate Verification Methodology Review
```

I64 should determine whether the existing I59 exact-domain verification rules may be applied pair-locally to I63-dispatched relations now that I61 provides authoritative relation-id/kind pairs. It must preserve I33/I35 subject-domain restrictions, I47 bureau-local scope, and all precedence/outcome/activation/force/scoring/classification guards.
