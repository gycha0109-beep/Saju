# ADR-0013 — Official Reading Annual Temporal Structure Delivery

- Status: Accepted
- Date: 2026-10-06
- Scope: route governed R194 annual structure transitions through Official Reading rendering and public Product Reading transport
- Extends: ADR-0012

## Context

R194 binds the actual annual Product Reading period to governed R192 structural impact and the R193 temporal
state machine. It intentionally does not promote annual pillar facts into interpretation authority.

The default Preview Official Reading approval currently covers natal sections only. Annual reading therefore
must not be silently promoted merely because R194 now has deterministic structure-transition semantics.

## Decision

GovernedReadingExecutionOptions may optionally receive one annual temporal structure input:

- governed natal/temporal structure baseline;
- resolved R192 structural-role impact assessments.

When that input is supplied:

1. the normalized request must be annual;
2. the resolved consumer authority must already be Official Reading;
3. R194 must resolve successfully;
4. its reading-safe projection is passed to the Official Reading renderer;
5. the renderer appends one deterministic timing section;
6. the timing section participates in the existing report hash;
7. the existing Official Reading artifact identity therefore changes with that governed temporal content;
8. the existing Product Reading delivery/response exposes the section without any separate transport path.

No post-artifact mutation is allowed.

## Consumer presentation

The timing section displays:

- annual pillar;
- previous structure state;
- current structural direction;
- next structure state;
- deterministic Korean transition text.

It does not add:

- fortune polarity;
- concrete event prediction;
- numeric scoring;
- source uncertainty;
- research HOLD language.

## Authority boundary

R195 does not change the Preview Official Reading section allowlist.

If annual temporal structure input is supplied while the selected consumer authority remains legacy narrative,
execution fails closed rather than dropping the input or mixing the deterministic transition into LLM prose.

If no annual temporal structure input is supplied, existing rendering remains unchanged.

## Dayun boundary

Dayun remains outside this path because R194 still declares production Dayun runtime input unavailable.
