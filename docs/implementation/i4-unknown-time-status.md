# I4 — Unknown-Time Scenario Planner Status

- Date: 2026-08-19
- Branch: `agent/architecture-foundation`
- Status: **STRICT CLOSED**

## Scope

I4 closes the uncertainty-preserving calculation behavior for birth records with unknown clock time.

The engine must never convert:

```text
birth time unknown
```

into:

```text
12:00
```

or any other fabricated instant.

---

## Implemented behavior

For unknown birth time, the calculation adapter enumerates all 1,440 civil-clock minutes of the supplied birth date under the selected Calculation Policy.

For each minute it executes the pinned deterministic calculation engine, then deduplicates the resulting:

```text
year pillar
month pillar
day pillar
```

Possible outcomes per fact:

```text
one unique value
-> resolved

multiple unique values
-> ambiguous(candidates)

hour pillar
-> unavailable(birth-time-unknown)
```

No arbitrary representative time is promoted to fact.

---

## Scenario construction

When one or more of year/month/day is ambiguous, the adapter creates `CalculationScenario` records only from combinations that were actually observed during the minute sweep.

It does **not** construct an unrestricted Cartesian product of all candidate facts.

Scenario requirements:

- stable scenario ID
- canonical snapshot ID link
- override candidate IDs must exist in the corresponding ambiguous fact
- override values must equal the referenced candidate
- no duplicate logical scenario signatures
- explicit uncertainty reason refs

---

## Boundary behavior verified

Automated tests cover:

### Ordinary date / midnight policy

```text
1992-10-24, unknown time
```

- year resolved
- month resolved
- day resolved
- hour unavailable
- zero scenarios

### Jasi policy

The same unknown-time date under `dayBoundary = jasi` preserves day-pillar ambiguity rather than choosing one result.

### Lichun + jasi

```text
2024-02-04, unknown time
```

under jasi policy can preserve independent year/month/day boundary changes while remaining compressed to actually observed scenarios.

### True solar time

A civil date can produce more than one possible day identity because true-solar correction can move early civil-clock instants across the local solar-day boundary.

The planner preserves this ambiguity rather than assuming that an unknown civil time stays on one solar date.

---

## Scenario limit gate

Public Calculation Engine options include:

```ts
maxScenarioCount?: number
```

Default:

```text
32
```

Rules:

- must be a positive integer
- invalid configuration -> `INVALID_INPUT`
- deduplicated scenario count above limit -> `SCENARIO_LIMIT_EXCEEDED`
- no random sampling
- no silent truncation

This limit is an execution-safety gate, not a calculation methodology choice, and therefore is not included in the canonical calculation hash.

---

## Determinism

Automated regression verifies that identical:

```text
BirthInput
+ CalculationPolicy
```

with different `createdAt` values produces identical:

```text
snapshotId
calculationHash
pillars
derivedFacts
scenarios
completeness
```

Only audit time changes.

---

## Verification

Primary tests:

```text
test/unknown-time-planner.test.ts
test/unknown-time-limit.test.ts
```

Hosted close gate:

```text
CI run number: 106
run id:        32205760082
npm ci:        PASS
lint:          PASS
TS6 typecheck: PASS
Vitest:        PASS
build:         PASS
job:           SUCCESS
```

---

## Closure

```text
NO_FAKE_CLOCK_TIME = ENFORCED
UNKNOWN_FACT_STATE = EXPLICIT
BOUNDARY_AMBIGUITY = PRESERVED
OBSERVED_SCENARIO_DEDUP = ENFORCED
SCENARIO_LIMIT_FAIL_CLOSED = ENFORCED
DETERMINISM = VERIFIED

I4 = STRICT CLOSED
```
