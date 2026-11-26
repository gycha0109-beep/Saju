# I26 v20 — Challenge Context Availability with Current-Chart Settlement Substrate Verification

## Decision

```text
CURRENT_CHART_SETTLEMENT_SUBSTRATE_VERIFICATION = AVAILABLE WHERE EXACTLY ALIGNED
SETTLEMENT_OUTCOMES                              = UNRESOLVED
SUPPORT_CHANNEL_ACTIVATION_PERSISTENCE            = UNRESOLVED
MECHANISM_EFFECTIVE_FORCE_CONTEXT                 = PARTIAL_SUBSTRATE
```

I26 v20 consumes aligned I60 current-chart settlement substrate verification evidence. Where I60 verifies an exact relation-specific substrate, v20 removes only the prior substrate-verification blocker and replaces it with an explicit settlement-outcome-unresolved blocker. No routed dependency is treated as settled.

## Exact chain

v20 accepts I60 only when the full identity chain is aligned:

```text
I26 v19 authorityApplicabilityClosureAccepted == true
I26 v19 I58 report id                         == supplied I58.reportId
I60 upstreamI58ReportId                       == supplied I58.reportId
I60 upstreamI59ReviewId                       == supplied I59.reviewId
I60 i33ReportId                               == supplied I33.reportId
I60 i35ReportId                               == supplied I35.reportId
I60 i47ReportId                               == supplied I47.reportId
```

The supplied I60 report must also equal deterministic recomputation from the same I58/I59/I33/I35/I47 inputs.

## Refined blocker semantics

For an exact I60 dependency with:

```text
currentChartSettlementSubstrateVerified = true
```

v20 changes only:

```text
... current-chart relation-specific settlement substrate verification unresolved: <DEPENDENCY>
```

into:

```text
... settlement outcome unresolved after verified current-chart substrate: <DEPENDENCY>
```

This is a substrate-availability refinement, not an outcome resolution.

## Preserved blockers

The following remain unresolved regardless of I60 substrate verification:

```text
challenge-target stem-combination support-channel activation/persistence
challenge-root combination support-channel activation/persistence

multi-touch relation id-kind pairing where required
competing-relation precedence/settlement where required
generic support-source settlement despite narrow bureau-state authority where required
```

I47 bureau-local evidence does not authorize generic support-source destruction or channel inactivity.

## Non-equivalences

```text
current-chart substrate verified != settlement outcome resolved
verified I33 substrate           != clash relative-force verdict
verified I33 rescue topology     != rescue effect
verified I35 substrate           != binding / neutralization
I47 bureau break                 != support-source destroyed
substrate verified               != support channel ACTIVE / PERSISTED
substrate verified               != effective mechanism force
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
I26 v20 code HEAD a3486306a3ce8d6edf6b7df5e4c4f3808b286d34
CI #650            SUCCESS
Test files         114 passed
Tests              613 passed
lint                PASS
typecheck           PASS
build               PASS
```

Dedicated I26 v20 suite: 5/5 PASS.

## Next-gate boundary

After v20, the remaining problem is no longer whether reusable relation-specific substrate exists for exact aligned routes. The unresolved layer is the actual relation-specific settlement semantics above that substrate.

A next gate must therefore choose a bounded settlement domain and must not jump directly to support-channel ACTIVE/PERSISTED or to effective-force classification.

Candidate domains include:

```text
clash relative-force / support / rescue settlement
combination binding / interaction settlement
multi-touch identity pairing / competing-relation precedence
```

The next gate should be selected from the actual v20 blocker graph, prioritizing the highest-leverage bounded domain while preserving all classifier and scoring guards.
