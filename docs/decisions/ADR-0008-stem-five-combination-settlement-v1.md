# ADR-0008 — MyeongHa V1 Five Stem Combination Settlement Policy

- Status: Accepted
- Date: 2026-10-06
- Scope: all five non-day-master heavenly-stem combinations / product convention
- Extends: ADR-0007

## Decision

MyeongHa V1 generalizes the deterministic settlement introduced for 甲己 in ADR-0007 to all five heavenly-stem combination pairs:

- 甲己
- 乙庚
- 丙辛
- 丁壬
- 戊癸

For an exact structural stem-five-combination whose two participants are both non-day-master stems,
whose day master is not either stem in that pair, and for which no separate canonical transformation
authority establishes transformation:

1. preserve the combination relation;
2. do not apply transformation;
3. preserve each participant's original stem, element, and day-master-relative Ten-God identity;
4. treat the combination as constraining both participants;
5. preserve the original Five-Element control direction;
6. set the controller's local function state to constrained;
7. set the controlled participant's local function state to impaired.

The fixed control directions are:

- 甲木 → 己土
- 庚金 → 乙木
- 丙火 → 辛金
- 壬水 → 丁火
- 戊土 → 癸水

## Product authority

This is a MyeongHa V1 product convention, not a claim of universal classical consensus.

R172–R188 remain the research record behind the initial 甲己 decision. R190 extends the same
product decision algorithm by the explicit Five-Element topology of the other four canonical stem pairs.
Future evidence may motivate a versioned successor, but it does not silently mutate v1.

## Runtime boundary

The settlement engine owns:

- pair recognition;
- control direction;
- transformation-not-applied state under this scope;
- participant identity preservation;
- controller constrained state;
- controlled impaired state.

A separately governed structural-role layer owns whether impairment strengthens, weakens, or maintains
the chart-level structure.

The LLM owns none of these decisions. It may only verbalize the settled result.

## User-facing boundary

Default reading projection must not expose research HOLDs, source conflicts, provenance uncertainty,
source URLs, or policy-internal deliberation. Those remain separate explainability/audit concerns.

## Non-decisions

This ADR does not authorize:

- a pair containing the day pillar;
- a day master equal to either pair stem;
- automatic transformation;
- hidden-stem settlement;
- numeric weights;
- automatic function loss;
- generic branch-relation settlement;
- chart-level favorable/unfavorable classification without governed role disposition.
