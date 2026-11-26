# I52 — Challenge Combination Support Channel Evidence Adapter

## Decision

```text
RESOLVED_SUPPORT_CHANNEL_EVIDENCE
```

I52 materializes only I51-authorized directional support channels from the exact participant-position substrate already present in I39.

## Inputs

I52 requires:

- I39 status `RESOLVED_CONDITION_EVIDENCE`;
- the exact I51 `SUPPORT_CHANNEL_DIRECTION_AUTHORIZED_NET_EFFECT_BLOCKED` contract;
- the exact subject to exist among the routed relation participants.

If the subject participant is absent, I52 fails closed with `SUBJECT_PARTICIPANT_UNRESOLVED` and emits no evidence items.

## Channel kinds

```text
SAME_ELEMENT_PEER_SUPPORT_CHANNEL
RESOURCE_GENERATION_SUPPORT_CHANNEL
```

Every channel remains bound to:

```text
source pillar
source component: stem | branch
participant identity
```

## Self-support filtering

A participant may not support itself through a same-element channel from the exact same pillar/component.

```text
same pillar + same stem participant   -> self same-element channel excluded
same pillar + same branch participant -> self same-element channel excluded
```

A different component on the same pillar remains a distinct structural source. Resource channels are element-distinct and therefore do not represent same-identity self-support.

## Presence states

```text
SUPPORT_CHANNELS_OBSERVED
NO_TRACKED_SUPPORT_CHANNEL
```

`NO_TRACKED_SUPPORT_CHANNEL` is an evidence state only. It is not weakness, negative force, damage, or failure of the combination.

## Preserved unresolved states

```text
supportChannelAggregation = not_performed
supportChannelPrecedence = not_determined
supportActivationVerdict = not_determined
supportPersistenceVerdict = not_determined
netSupportInterferenceEffect = not_resolved
transformationConditionVerdict = not_determined
bindingState = not_determined
postInteractionBureauState = not_determined
targetPostRelationRootState = not_determined
effectiveMechanismForceVerdict = not_determined
relationSpecificUsefulnessHarmfulness = not_determined
numericScore = not_assigned
```

## Non-equivalences

```text
support channel presence    != support activation
support channel multiplicity != support magnitude
support channel topology     != net support effect
NO_TRACKED_SUPPORT_CHANNEL   != weakness
support channel topology     != effective mechanism force
```

## Verification

```text
I52 code HEAD 7c253fb1650e4142d5fac990f7895609d304747c
CI #616        SUCCESS
Test files     101 passed
Tests          533 passed
lint           PASS
typecheck      PASS
build          PASS
```

## Next integration gate

```text
I26 v16 — Challenge Context Availability with Support Channel Evidence
```

v16 may replace the broad support/interference capability gap with narrower activation/persistence and competing-interaction settlement dependencies only when I52 is aligned to the exact current I39/I51 identity. Effective force, root state, usefulness/harmfulness, scoring, and classification must remain blocked.
