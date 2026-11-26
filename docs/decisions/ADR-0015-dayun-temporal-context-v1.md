# ADR-0015 — Deterministic Dayun Temporal Context

- Status: Accepted
- Date: 2026-10-06
- Scope: materialize canonical luck-cycle timing as a product runtime fact without interpreting Dayun
- Extends: ADR-0014

## Context

The canonical calculation snapshot already contains a resolved luck cycle when the deterministic upstream inputs
are available. The product reading layer, however, had no governed way to identify which canonical Dayun pillar
overlaps a requested calendar year.

Annual composition research requires Dayun context, but R152 and R153 do not authorize a universal Dayun
stem/branch interpretation method or an annual/Dayun semantic winner.

## Decision

R197 adds a temporal-only resolver over CanonicalSajuSnapshot.luckCycle.

The resolver uses the upstream detailed start offset:

- startYears;
- startMonths;
- startDays.

The rounded startAge remains an age marker and is not used to calculate the precise product boundary.

### MyeongHa V1 civil-calendar boundary convention

The detailed upstream duration is projected to the normalized solar birth date/time by:

1. adding years;
2. adding months;
3. adding days;
4. clamping an invalid day created by year/month addition to the last day of the destination month.

The resulting civil datetime is the first Dayun boundary.

Each canonical luck pillar then occupies a half-open ten-calendar-year interval. Every later boundary is derived
from the first boundary plus ten calendar years per pillar index, rather than from array order alone. Canonical
age markers must match startAge + 10 * index or resolution fails closed.

This calendar projection is an explicit MyeongHa product convention for using the upstream precise start
duration. It is not a classical interpretation proposition.

## Annual overlap

A target year is represented as [January 1 00:00, next January 1 00:00).

- an ordinary year normally overlaps one Dayun segment;
- a Dayun transition year may overlap two segments;
- a boundary exactly at January 1 belongs only to the new segment because intervals are half-open.

## Fail-closed behavior

Resolution is unavailable when:

- target year is invalid;
- luckCycle is unresolved;
- normalized solar birth date/time is unresolved;
- timezone is not Asia/Seoul;
- detailed start offset is missing or malformed;
- canonical age markers are malformed;
- the requested year does not overlap the available canonical Dayun range.

## Authority boundary

R197 does not decide:

- Dayun stem/branch precedence;
- five-year stem/branch operational split;
- numeric weights;
- favorable/unfavorable polarity;
- natal structural impact;
- annual/Dayun composition;
- concrete events.

ReadingTemporalScope is unchanged. Dayun becomes an internal temporal context fact, not a new consumer reading
intent.
