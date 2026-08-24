# Myeonghwa Production Composition Root

Status: `BLOCKED_INTERPRETATION_AUTHORITY_REQUIRED`

The product host is structurally implemented. The production composition root assembles it only after exact calculation authority, interpretation authority, and deployment narrative configuration are available.

## Runtime path

```text
Production deployment configuration
→ production composition inspection
→ authorized calculation policy manifest check
→ production interpretation registry preflight
→ narrative/runtime configuration check
→ createAuthorizedMyeonghwaProductionHost()
→ Product Host
```

## Calculation authority

ADR-0006 separately authorized the Myeonghwa V1 product default:

```text
calculationPolicyId = myeonghwa-production-civil-midnight-v1
clock basis         = civil time
day boundary        = midnight
true solar          = OFF
time zone            = Asia/Seoul
```

The existing `civil-midnight-reference-v1` remains an engineering reference with `productionDefaultAuthorized=false`. The production identity and authority grant are separate from the research/reference profile list.

The production composition root may select the governed V1 default when deployment omits `calculationPolicyId`. Explicitly requesting an unregistered calculation policy still fails closed.

Current state:

```text
authorized production calculation policy count = 1
production calculation default                  = myeonghwa-production-civil-midnight-v1
```

## Interpretation authority

A supplied registry must satisfy both conditions:

```text
registry.pack.status = production
+
existing buildInterpretationExecutionPlan() authorization preflight = PASS
```

The preflight preserves the existing production requirements, including content integrity, executable methodology/rule status, source quality, reviewer trust, and trust-pinned approved domain attestations.

Changing a research pack's `status` field to `production` does not authorize it. The existing interpretation authorization gate still runs and fails closed.

As of the production interpretation authority audit recorded in `22-production-interpretation-authority-audit.md`, no repository-backed real Saju domain registry satisfies those requirements. Synthetic production fixtures prove the authorization mechanism only and are not product authority.

## Narrative/runtime configuration

The composition root also requires explicit deployment configuration for:

```text
NarrativeModelAdapter
NarrativePolicy
ProductReadingServiceOptions
```

These values are runtime configuration only and do not grant calculation or interpretation authority.

## Public package surface

The package exposes:

```text
myeonghwa-saju-engine/production-runtime
```

Primary operations:

```text
inspectMyeonghwaProductionComposition()
listAuthorizedProductionCalculationPolicies()
createAuthorizedMyeonghwaProductionHost()
```

`createAuthorizedMyeonghwaProductionHost()` throws `ProductionCompositionBlockedError` unless every authority/configuration requirement passes.

## Current blockers

The authoritative current state is:

```text
AUTHORIZED PRODUCTION CALCULATION POLICY = YES / V1 C-OPTION
AUTHORIZED PRODUCTION INTERPRETATION REGISTRY = MISSING
DEPLOYMENT NARRATIVE CONFIGURATION = APPLICATION RESPONSIBILITY
PUBLIC PRODUCTION HOST = BLOCKED
```

This composition boundary does not create a production interpretation rule, authorize a strength classifier, authorize numeric scoring, activate Shinsal, authorize pillar-domain semantics, or change any existing research HOLD/SUSPENDED state.

## Reopen condition

The production composition root can return `ready` only after governed work supplies:

1. the already-authorized calculation policy grant;
2. a resolved `production` interpretation registry that passes the existing authorization preflight;
3. deployment narrative and reading configuration.

Until then, the correct operational result is a deterministic blocked composition state rather than a partially authorized public reading service.
