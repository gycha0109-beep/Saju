# Myeonghwa Production Calculation Authority V1

Status: `CALCULATION_AUTHORITY_AUTHORIZED_INTERPRETATION_REQUIRED`

This stage applies the product-methodology decision recorded in ADR-0006 to the fail-closed production composition root.

## Authorized V1 default

```text
clock basis           = civil time
day boundary          = midnight
true solar correction = OFF
time zone              = Asia/Seoul
unknown birth time     = preserve unknown and enumerate boundaries
```

Authority identity:

```text
calculationPolicyId = myeonghwa-production-civil-midnight-v1
authorizationId     = myeonghwa-production-calculation-default-authorization-v1
authorityRecordRef  = docs/decisions/ADR-0006-production-calculation-default-v1.md
```

The production policy is represented separately from `civil-midnight-reference-v1`. The latter remains an engineering reference with `productionDefaultAuthorized=false`.

## Composition behavior

The governed production composition root now:

```text
omitted calculationPolicyId
→ selects myeonghwa-production-civil-midnight-v1
→ exact authority-manifest lookup
→ authorized calculation grant
```

An explicitly requested unregistered policy still fails closed with:

```text
AUTHORIZED_CALCULATION_POLICY_NOT_REGISTERED
```

This selection occurs only in deployment/application composition. The consumer Host request schema remains unchanged and contains no calculation-policy selector.

## Sensitivity behavior

The existing six-profile calculation sensitivity system is preserved. Authorization of the V1 default does not suppress materially different alternatives.

A 23:30 birth can still report day/hour differences under alternative day-boundary conventions. Apparent-solar profiles still require their existing birthplace/timezone inputs and remain sensitivity-only.

## Current production blockers

After this stage:

```text
AUTHORIZED PRODUCTION CALCULATION POLICY = YES
AUTHORIZED PRODUCTION INTERPRETATION REGISTRY = MISSING
DEPLOYMENT NARRATIVE CONFIGURATION = APPLICATION RESPONSIBILITY
PUBLIC PRODUCTION HOST = BLOCKED
```

The next governed stage is the production interpretation-pack inventory and minimum-authority composition audit. Existing research/HOLD/SUSPENDED content must not be promoted merely to unblock deployment.
