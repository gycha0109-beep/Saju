# Domain Evidence Isolation Guard

Status: research infrastructure correction

## Purpose

The cumulative research registry now contains general, career, and wealth T8 claims. The general natal ReadingProfile previously targeted every T8 claim regardless of category, which allowed specialized domain claims to enter the general evidence target set even though the Preview renderer filtered them out later.

This correction narrows `general:natal` to `T8 + category=general` and rebinds the existing selection-only profile authorization hash.

## Preserved invariants

- ReadingIntent does not create interpretation claims.
- ReadingProfile only selects evidence and does not authorize domain semantics.
- Research interpretation packs remain blocked from production composition.
- Missing specialized evidence never falls back to general claims.
- Career and wealth target selections remain category-isolated.

## Validation

Regression coverage explicitly checks:

- general profile authorization after content-addressed selector change;
- no career/wealth T8 leakage into general natal evidence;
- career/wealth wrong-domain isolation;
- relationship missing-evidence fail-closed behavior without general fallback.
