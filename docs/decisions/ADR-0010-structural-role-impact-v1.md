# ADR-0010 — MyeongHa V1 Governed Structural Role Impact Policy

- Status: Accepted
- Date: 2026-10-06
- Scope: deterministic structure-impact evaluation from settled stem interaction plus governed role assignments
- Extends: ADR-0009

## Context

R189-R191 determine local stem-interaction state. They intentionally do not decide whether a stem is
beneficial or harmful to the chart as a whole.

The research record explicitly shows that the same symbol can serve opposite functions in different
configurations, that 喜神/忌神 are not globally fixed by element or Ten-God identity, and that canonical
格 candidate/establishment execution remains unauthorized.

Therefore structure role must not be inferred inside this resolver.

## Decision

R192 consumes role assignments from a separately governed upstream authority.

Every settlement participant must have exactly one matching assignment for the same structure identity:

- exact pillar;
- exact stem;
- exact Ten-God identity;
- disposition: supports_structure / harms_structure / neutral;
- criticality: core / supporting / secondary.

Missing or duplicate assignments fail closed.

### Individual impact

For a neutral role, any local function state maintains the structure.

For a role that supports the structure:

- preserved -> maintains
- constrained / impaired / lost -> weakens

For a role that harms the structure:

- preserved -> maintains
- constrained / impaired / lost -> strengthens

### Multi-role settlement

Directional impacts are reduced deterministically:

1. highest criticality wins: core > supporting > secondary;
2. inside the same criticality, strongest function degradation wins:
   lost > impaired > constrained > preserved;
3. if the surviving directions agree, emit that direction;
4. if weakening and strengthening remain exactly tied,
   MyeongHa V1 uses a conservative weakening tie-break.

No numeric weights or source-order ranking are used.

## Authority boundary

This is a MyeongHa product settlement policy. It does not:

- infer 格;
- infer 喜神 or 忌神;
- assign fixed polarity to a Ten God;
- promote research-only 格 establishment logic;
- invent a role assignment when upstream authority is absent.

R192 owns only the mapping from governed role + settled local function state to deterministic structural impact.

## Runtime boundary

R192 is implemented as a pure resolver and does not mutate the canonical Saju snapshot.
This is intentional: the current canonical snapshot does not yet contain an authorized structure identity
or role-assignment producer.

R193 may consume a resolved R192 assessment together with a governed temporal structure baseline to decide
whether an incoming period breaks, restores, or preserves that structure.

## User-facing boundary

The reading projection exposes only:

- structure identity;
- participant role semantics;
- final function states;
- individual structure impacts;
- one final overall structure impact;
- deterministic decision rule.

Research HOLDs, source disputes, provenance uncertainty, and policy-internal authority metadata remain outside
the default reading payload.
