# I50 — Challenge Combination Seasonal Disposition Evidence Adapter

## Decision

```text
RESOLVED_SEASONAL_DISPOSITION_EVIDENCE
```

I50 binds the I49 source-bounded seasonal-disposition semantics to the exact I39 combination condition evidence and, for complete three-combinations, to the exact aligned I45 structural bureau-formation evidence.

## Inputs and alignment

I50 requires:

- I39 status `RESOLVED_CONDITION_EVIDENCE`;
- I45 status `RESOLVED_STRUCTURAL_BUREAU_FORMATION`;
- I45 `upstreamI39ReportId` equal to the supplied I39 report;
- one-to-one three-combination formation identity alignment by mechanism, relation id, subject position, and subject value;
- the exact I49 methodology authorization contract.

Stale or misaligned I45 evidence fails closed and emits no seasonal-disposition items.

## Materialized evidence

For every I39 combination item, I50 emits:

```text
month branch / command element
target element
target 旺/相/休/囚/死 phase
target categorical seasonal disposition
participant element identity
participant categorical seasonal disposition
```

Participant dispositions remain identity-local. No majority, min/max, sum, point, or weighted reduction is performed.

For an aligned I45 `STRUCTURAL_BUREAU_FORMED` branch-three item, I50 additionally derives:

```text
formed bureau element
formed bureau element seasonal phase
formed bureau element categorical seasonal disposition
```

The formed-bureau seasonal disposition does not settle bureau survival after clash or any effective-force question.

## Preserved scope closures

```text
stem challenge transformed-result seasonal disposition = not_emitted
six-combination transformed-result seasonal disposition = not_emitted
```

I50 does not use seasonal context to bypass the I42 day-stem scope closure or the I43 six-combination transformed-element scope closure.

## Hard guards

```text
seasonalCommandConditionEffect = RESOLVED_CATEGORICAL_DISPOSITION
participantSeasonalDispositionAggregation = not_performed
transformedResultSeasonalDisposition = not_emitted
postInteractionBureauState = not_determined
targetPostRelationRootState = not_determined
effectiveMechanismForceVerdict = not_determined
relationSpecificUsefulnessHarmfulness = not_determined
numericScore = not_assigned
classificationAuthorized = false
numericScoringAuthorized = false
```

## Non-equivalences

```text
categorical seasonal disposition != final relative force
旺/相                           != automatic positive combination result
休/囚/死                        != automatic negative combination result
formed-bureau seasonal disposition != post-interaction bureau survival
participant dispositions           != aggregate relation score
seasonal disposition               != effective mechanism force
```

## Verification

```text
I50 code HEAD 7a08654e8046454dc2ad38a2be8129eef794bb45
CI #604        SUCCESS
Test files     98 passed
Tests          518 passed
lint           PASS
typecheck      PASS
build          PASS
```

## Next integration gate

```text
I26 v15 — Challenge Context Availability with Seasonal Disposition Evidence
```

v15 may remove the live seasonal-command-effect capability gap only when I50 is aligned through the same I39/I45 evidence chain. It must keep support/interference, relation settlement, post-relation root state, post-interaction bureau ambiguity, effective force, scoring, and classification unresolved or unauthorized.
