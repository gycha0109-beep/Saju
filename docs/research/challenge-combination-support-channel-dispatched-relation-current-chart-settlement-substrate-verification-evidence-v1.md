# I65 — Dispatched Relation Current-Chart Settlement Substrate Verification Evidence Adapter

## Status

```text
STRICT CLOSED
```

## Primary result

I65 materializes exact current-chart settlement-substrate verification for each concrete relation/dependency produced by the I61 → I62 → I63 chain, under the canonical I64 reuse boundary for I59 exact-domain rules.

The authoritative chain is:

```text
I61 exact relation-id/kind pair evidence
-> I62 canonical pair-kind dispatch methodology
-> I63 exact pair-local dispatch evidence
-> I64 canonical per-dispatched-pair I59 exact-domain reuse methodology
-> I33 / I35 / I47 exact authority-domain evidence
-> I65 pair-local current-chart settlement substrate verification
```

## Key closure

The former multi-touch limitation is narrowed correctly:

```text
multiple relation touches
!= pair-local substrate verification blocked
```

Once I61 provides authoritative relation-id/kind pairing and I63 dispatches each pair independently, each dispatched relation can be checked against its own exact I33/I35/I47 authority domain.

This does not authorize aggregation, precedence, or outcome resolution.

## Exact-domain rules

### Clash dependencies

For a dispatched clash, I33 reuse requires:

```text
relationKind = branch_clash
isCurrentCombinationRelation = false
exact dispatched clash relation id
same mechanism
sourceComponent = branch
exact source pillar + branch participant
```

This may verify substrate for:

```text
CLASH_RELATIVE_FORCE_SETTLEMENT
CLASH_RESCUE_SETTLEMENT_WHERE_APPLICABLE
CLASH_INTERACTION_SETTLEMENT
```

Rescue topology is preserved as topology only.

### Competing combination dependency

For a dispatched competing combination, I35 reuse requires:

```text
not current combination relation
exact relation id
exact relation kind
same mechanism
exact source pillar + component + value participant
```

This may verify substrate for:

```text
COMPETING_COMBINATION_BINDING_INTERACTION_SETTLEMENT
```

### Current combination dependency

Where the dispatched relation is the current combination, I35 reuse additionally requires exact equality with the current-combination id/kind.

### Narrow I47 context

I47 may annotate only:

```text
currentCombinationRelationKind = branch_three_combination
exact current formation relation id
exact dispatched clash relation id
exact source pillar participation in the clash
```

Even:

```text
BROKEN_BY_TIGHT_EMBEDDED_CLASH
```

remains a bureau-local state and does not set `supportChannelDestroyed`.

## Non-equivalences preserved

```text
pair-local current-chart substrate verified != settlement outcome resolved
rescue topology exists                      != rescue effect resolved
BROKEN_BY_TIGHT_EMBEDDED_CLASH             != support source destroyed
multiple verified pair substrates          != cross-relation precedence
all dispatched pair substrates verified    != support channel active / persisted
```

## Hard guards

```text
anyRoutedSettlementOutcomeResolved          = false
pairOrderSignificanceAuthorized             = false
multiTouchAggregationAuthorized             = false
crossRelationPrecedenceAuthorized           = false
contestOutcomeVerdictAuthorized             = false
supportChannelActivationVerdictAuthorized   = false
supportChannelPersistenceVerdictAuthorized  = false
supportChannelNeutralizationVerdictAuthorized = false
supportChannelDestructionVerdictAuthorized  = false
supportChannelNetEffectVerdictAuthorized    = false
effectiveMechanismForceVerdict              = not_determined
relationSpecificUsefulnessHarmfulness       = not_determined
classificationAuthorized                    = false
numericScoringAuthorized                    = false
```

Every dispatched relation keeps:

```text
precedenceWithinMultiTouch = not_determined
settlementOutcome          = not_determined
```

Every dispatched dependency keeps:

```text
settlementOutcomeResolved = false
```

## Verification

```text
HEAD   a410ca50c8495c830285e197e932c65cee83cf23
CI     #679 SUCCESS
FILES  121 passed
TESTS  655 passed
I65    6 / 6 PASS
lint   PASS
typecheck PASS
test   PASS
build  PASS
```

## Next gate

```text
I26 v23 — integrate dispatched-relation current-chart settlement substrate evidence
```

I26 v23 may replace only an exact per-dispatched-relation substrate-verification blocker with an explicit pair-local settlement-outcome-unresolved blocker when I65 verifies that exact relation/dependency. Competing-relation precedence, support activation/persistence, effective force, scoring, and classification remain unresolved.
