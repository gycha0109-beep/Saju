# I68 — Challenge Combination Support Channel Pair-Local Clash Relative-Force Comparative Evidence

## Status

STRICT CLOSED / TRACKED-EVIDENCE PARTIAL ORDER MATERIALIZED / FINAL RELATIVE-FORCE VERDICT BLOCKED

## Authority

- Final code HEAD: `ea633266d9e08b72a33aae85f3736868acfb67b2`
- CI #696: SUCCESS
- 125 test files / 678 tests
- dedicated I68 suite: 6/6 PASS
- lint/typecheck/test/build: PASS
- Initial I68 HEAD `53caf5dc...` failed CI #695 only because the test fixture used obsolete dispatch-class literal `COMPETING_CLASH_DISPATCH`; production I68 logic was unchanged. The fixture was corrected to authoritative I62 literal `COMPETING_CLASH_SETTLEMENT_ROUTE`.

## Purpose

I68 materializes the I67 source-bounded non-numeric comparison on exact pair-local current-chart clash evidence.

It consumes:

- I65 exact dispatched-relation current-chart substrate verification,
- aligned I33 clash dependency evidence,
- canonical I20c qualitative support-context evidence,
- exact canonical I67 methodology.

Only an exact dispatched `branch_clash` whose `CLASH_RELATIVE_FORCE_SETTLEMENT` substrate is verified may enter this adapter.

## Evidence contract

For each eligible clash, I68 preserves exact relation and participant identity and derives only:

```text
seasonalComparison
supportSignalSetRelation
trackedEvidencePartialOrderState
```

The partial-order state is one of:

```text
FIRST_TRACKED_EVIDENCE_DOMINANCE_CANDIDATE
SECOND_TRACKED_EVIDENCE_DOMINANCE_CANDIDATE
TRACKED_EVIDENCE_EQUIVALENT
TRACKED_EVIDENCE_INCOMPARABLE
```

`NO_TRACKED_SUPPORT_CONTEXT` is normalized to the empty tracked-signal set. No support signal receives a numeric or ordinal weight. Support positions are not counted or summed.

## Strict non-equivalences

```text
tracked-evidence dominance candidate != relative-force verdict
tracked-evidence equivalence         != relative-force tie verdict
seasonal phase advantage             != clash winner
support-signal superset              != support magnitude verdict
support-signal set equality          != equal effective support
partial-order evidence               != rescue effect
partial-order evidence               != clash settlement
```

## Guards

```text
relativeForceVerdictAuthorized       = false
clashWinnerVerdictAuthorized         = false
supportEffectResolutionAuthorized    = false
rescueEffectAuthorized               = false
clashSettlementAuthorized            = false
crossRelationPrecedenceAuthorized    = false
classificationAuthorized             = false
numericScoringAuthorized             = false

targetPostRelationRootState          = not_determined
effectiveMechanismForceVerdict       = not_determined
relationSpecificUsefulnessHarmfulness= not_determined
```

Item-level outcome fields remain:

```text
relativeForceVerdict   = not_determined
clashWinnerVerdict     = not_determined
supportEffectVerdict   = not_resolved
rescueEffectVerdict    = not_resolved
clashSettlementVerdict = not_determined
numericScore           = not_assigned
```

## Closure decision

I68 closes only current-chart materialization of the I67 tracked-evidence partial order. It does not authorize promotion of a dominance candidate or equivalence state into a final relative-force verdict.

The next gate must explicitly audit whether the available qualitative evidence is sufficient for such promotion. It must fail closed if effective support, rescue, or other required contextual effects remain unresolved.