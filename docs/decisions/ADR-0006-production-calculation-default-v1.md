# ADR-0006 — Myeonghwa V1 Production Calculation Default

- Status: Accepted
- Date: 2026-08-24
- Scope: production calculation authority / product default
- Supersedes: ADR-0005 explicit non-decision for the V1 product default only

## Context

ADR-0005 established six calculation-policy profiles for methodology sensitivity and intentionally refused to choose a production winner. It also separated the engineering reference profile from product authority.

The product Host and production composition root are now implemented, and the absence of an authorized production calculation policy is a concrete deployment blocker. A product-level convention must therefore be selected without rewriting the underlying methodology disagreement as a universal truth claim.

## Decision

Myeonghwa V1 adopts product option C:

```text
Default clock basis     = civil time
Default day boundary    = midnight
True solar correction   = OFF
Service timezone        = Asia/Seoul
Unknown birth time      = preserve unknown and enumerate boundaries
```

The governed production identity is:

```text
calculationPolicyId = myeonghwa-production-civil-midnight-v1
policyId            = myeonghwa/production/civil-midnight-v1
policyVersion       = myeonghwa-production-calculation-policy-v1
authorizationId     = myeonghwa-production-calculation-default-authorization-v1
```

This production policy intentionally has the same calculation semantics as the existing `civil-midnight-reference-v1` engineering reference, but it is a separate authority identity. The research/reference profile itself remains:

```text
role = engineering_reference
productionDefaultAuthorized = false
```

The production composition manifest, not the research profile list, is the authority boundary.

## Why this default

The choice follows the already documented ADR-0005 product rationale:

- preserves the recorded civil birth time rather than applying an unrequested solar-time transformation;
- uses the midnight day boundary, for which a historical calendar precedent exists;
- matches the pinned calculation dependency's default day-boundary behavior;
- provides the least-transformative stable baseline for a Korean V1 service;
- does not fabricate birthplace longitude when the consumer has not supplied it.

This is a **Myeonghwa V1 product convention**, not a declaration that other Saju schools are invalid.

## Sensitivity preservation

Authorization of the default does not retire or hide alternative calculation profiles.

When a materially sensitive case exists, the engine must preserve the existing sensitivity result. Examples include:

```text
23:00–23:59 day-boundary differences
civil time vs apparent-solar-time hour differences
```

A product layer may later disclose or parallel-render alternative charts for those cases. It must not convert methodology disagreement into a numeric accuracy score or silently replace the V1 default.

## Runtime selection boundary

The production composition root may select this governed default when deployment code omits `calculationPolicyId`.

Consumer Host input still cannot select or authorize calculation policy.

```text
Host Input != Calculation Policy Authority
Consumer Request != Calculation Policy Selection
```

An explicit deployment request for any other policy ID must fail closed unless that exact policy receives its own production authority grant in a later governed change.

## Non-decisions

This ADR does not authorize:

- `jasi` or `splitJasi` as a production default;
- apparent-solar-time correction as a production default;
- arbitrary timezone support beyond the currently validated product policy;
- user-controlled methodology selection in the Host API;
- any interpretation rule, strength classifier, Shinsal rule, pillar-domain meaning, numeric fortune score, or narrative claim.

## Consequence

After this decision the calculation portion of the production composition root is authorized. The public production runtime remains blocked until a separately authorized production interpretation registry and deployment narrative configuration are available.

Current authority state after this ADR:

```text
AUTHORIZED PRODUCTION CALCULATION POLICY = YES / V1 C-OPTION
AUTHORIZED PRODUCTION INTERPRETATION REGISTRY = STILL REQUIRED
PUBLIC PRODUCTION HOST = STILL BLOCKED
```
