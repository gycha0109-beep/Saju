# I51 — Challenge Combination Support / Interference Effect Methodology Review

## Decision

```text
SUPPORT_CHANNEL_DIRECTION_AUTHORIZED_NET_EFFECT_BLOCKED
```

I51 resolves the source-bounded direction and presence semantics of same-element and resource-generation support channels. It does not resolve whether those channels remain active after clash/combination/competing interactions or what their net force effect is.

## Source boundary

`滴天髓闡微` explicitly connects root firmness with `生扶` and root loss with `衝剋`, and explains `地旺喜靜` through both absence of disturbance and presence of `生助`. The `合局` discussion also shows that a combination can assist, remove, bind, or strengthen an unfavorable structure depending on role and actual resolution.

Therefore:

```text
same-element structural relation -> support-direction channel may be recorded
resource-generating relation      -> support-direction channel may be recorded
channel presence                  -> activation / persistence / net effect NOT implied
```

## Authorized channel kinds

```text
SAME_ELEMENT_PEER_SUPPORT_CHANNEL
RESOURCE_GENERATION_SUPPORT_CHANNEL
```

The absence of either tracked channel may be recorded as `NO_TRACKED_SUPPORT_CHANNEL`, but this is not weakness or negative force.

## Explicitly blocked

```text
channel count -> force magnitude                  BLOCKED
multiple channels -> stronger than one            BLOCKED
visible-stem support > branch support              NOT RESOLVED
same-element support > resource support            NOT RESOLVED
channel presence -> activated support              BLOCKED
channel presence -> survives clash/combination     BLOCKED
competing relation -> deterministic neutralization BLOCKED
support topology -> transformation/binding result  BLOCKED
support topology -> post-relation root state       BLOCKED
support topology -> effective mechanism force      BLOCKED
numeric weighting / additive scoring               BLOCKED
```

## Verification

```text
I51 code HEAD abb67756d65c08acc2115b9efc4156d7e61be231
CI #612        SUCCESS
Test files     100 passed
Tests          528 passed
lint           PASS
typecheck      PASS
build          PASS
```

## Next gate

```text
I52 — Challenge Combination Support Channel Evidence Adapter
```

I52 may materialize identity-local support channels from the positional evidence already present in I39. It must filter self-identity from same-element support, avoid channel aggregation, and preserve activation, persistence, net-effect, force, scoring, and classification guards.
