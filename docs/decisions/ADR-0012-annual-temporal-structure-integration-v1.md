# ADR-0012 — Product Annual Period Facts to Temporal Structure Transition

- Status: Accepted
- Date: 2026-10-06
- Scope: bind actual annual Product Reading period facts to governed R192/R193 structural semantics
- Extends: ADR-0011

## Context

The runtime already has a product-facing annual request model, annual sexagenary pillar context, and
AnnualInterpretationFacts. Research governance explicitly treats those annual facts as input evidence rather
than interpretation authority.

R193 now provides a deterministic temporal structure transition, but it requires governed R192 structural
impact assessments. R194 connects the actual annual product period to that state machine without converting
the annual pillar itself into an unauthorized meaning resolver.

## Decision

For an annual ReadingRequest:

1. require an annual target period;
2. build the existing TemporalReadingContext;
3. build the existing AnnualInterpretationFacts from the canonical Saju snapshot;
4. map the resolved year to:
   - scope = annual
   - periodKey = annual:<year>
   - sequence = <year>
5. require one or more separately governed R192 assessments for semantic structural impact;
6. delegate the transition to R193.

Annual facts remain attached to the integration result so the calculated period identity is inspectable.

## Annual fact boundary

R194 does not infer structural impact from:

- annual stem;
- annual branch;
- annual stem Ten God;
- annual branch clash relation.

Changing the annual pillar does not change the R193 impact unless the separately governed R192 semantic input
also changes.

This preserves the existing annual research boundary that annual facts are evidence/input facts, not automatic
interpretation authority.

## Dayun boundary

The current product reading contract exposes natal, annual, monthly, and life-stage scopes. It does not expose
a production Dayun target period. Existing Dayun research also does not authorize an executable method winner
for the competing stem/branch formulations.

R194 therefore declares Dayun runtime input unavailable instead of fabricating a Dayun period model from
research assets.

A later phase may enable Dayun only after a governed product input contract and method policy exist.

## Fail-closed behavior

R194 refuses to resolve when:

- the request is not annual;
- an annual target period is absent or inconsistent;
- temporal context or annual fact materialization fails;
- R193 refuses the supplied R192 assessments.

## Product integration boundary

This phase provides the executable integration adapter and reading-safe projection. It does not yet change the
existing Product Reading service orchestration or official-reading section assembly.

That service-level consumption is a separate subsequent responsibility.

## User-facing boundary

The reading projection may expose:

- annual target year;
- annual pillar;
- annual stem Ten-God fact;
- settled temporal structure transition.

It does not expose research HOLDs, source disputes, provenance uncertainty, or product-policy internals.
