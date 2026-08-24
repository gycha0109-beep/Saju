# Myeonghwa Production Composition Root

Status: `BLOCKED_AUTHORITY_REQUIRED`

The product host is structurally implemented, but a deployable production runtime must not select calculation or interpretation authority implicitly. This stage adds the single governed composition boundary that will eventually assemble the Host only after exact production authority is available.

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

The existing calculation policy profiles remain reference/sensitivity profiles and explicitly declare:

```text
productionDefaultAuthorized = false
```

Therefore the production composition root does not choose `civil-midnight-reference-v1` or any other existing profile as a production default.

The production authority manifest is an in-repository allowlist with no runtime mutation or registration API. It is intentionally empty in this stage. Adding an entry requires a separate governed repository change that binds an exact `CalculationPolicySnapshot` to an authority record.

Current state:

```text
authorized production calculation policy count = 0
production calculation default                  = NONE
```

## Interpretation authority

A supplied registry must satisfy both conditions:

```text
registry.pack.status = production
+
existing buildInterpretationExecutionPlan() authorization preflight = PASS
```

The preflight preserves the existing production requirements, including content integrity, executable methodology/rule status, source quality, reviewer trust, and approved trust-pinned domain attestations.

Changing a research pack's `status` field to `production` does not authorize it. The existing interpretation authorization gate still runs and fails closed.

## Narrative/runtime configuration

The composition root also requires explicit deployment configuration for:

```text
NarrativeModelAdapter
NarrativePolicy
ProductReadingServiceOptions
```

These values are runtime configuration only and do not grant calculation or interpretation authority.

## Public package surface

The package adds:

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

The authoritative current state remains:

```text
AUTHORIZED PRODUCTION CALCULATION POLICY = MISSING
AUTHORIZED PRODUCTION INTERPRETATION REGISTRY = MISSING
DEPLOYMENT NARRATIVE CONFIGURATION = APPLICATION RESPONSIBILITY
PUBLIC PRODUCTION HOST = BLOCKED
```

This stage does not create a production interpretation rule, authorize a strength classifier, authorize numeric scoring, activate shinsal, authorize pillar-domain semantics, or change any existing research HOLD/SUSPENDED state.

## Reopen condition

The production composition root becomes capable of returning `ready` only after separate governed work supplies:

1. an exact authorized calculation policy manifest entry;
2. a resolved `production` interpretation registry that passes the existing authorization preflight;
3. deployment narrative and reading configuration.

Until then, the correct operational result is a deterministic blocked composition state rather than a partially authorized public reading service.
