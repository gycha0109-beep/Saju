# SAJU-R4 Bounded Root-Presence Structural Claim v1

Issue: #2012

## Purpose

R2 made the governed bounded positive root-presence surface available as deterministic, snapshot-bound `research_only` evidence.

R3 fixed the exact consumer selector contract.

R4 is the first real structural rule that consumes that contract. It materializes **one T2 research claim only when the upstream payload already says `evaluation.rootPresenceObserved === true`**.

## Claim

`DAY_MASTER_BOUNDED_ROOT_PRESENCE_EVIDENCE`

Meaning:

> bounded positive root-presence evidence was observed inside the already-governed R2 surface.

This is intentionally weaker than `四柱有根=true`.

The claim value freezes the following state:

- bounded positive observation = true
- canonical 四柱有根 = not determined
- 無根 = not determined
- observation-count semantics = not authorized
- position weighting = not authorized
- 通根 support constituent = not determined
- 黨眾 / 助寡 = not determined
- 強弱 / 旺衰 = not determined
- 格局 = not determined
- numeric strength = not authorized
- Production authority = false

## Why R4 stops here

Existing governed research explicitly prohibits direct root-class shortcuts into 通根扶助 / 黨眾 and prohibits using a bounded positive set as a complete 四柱有根 resolver.

Therefore R4 does not:

- re-evaluate raw chart roots;
- infer a negative result when no bounded positive is found;
- count observations;
- weight month/day/year/hour positions;
- translate root observations directly into 通根扶助;
- aggregate support;
- classify 強弱/旺衰;
- derive 格局;
- activate a narrative or product route.

## Runtime

The rule runs through the existing generic InterpretationEngine:

`R2 snapshot-bound ResearchEvidence -> R3 exact input contract -> R4 T2 research claim`

It uses:

- the real R2 runtime adapter;
- exact evidence type/version/definition binding;
- a registered claim schema;
- a research-only pack.

The rule does not alter any default runtime route.

## Negative behavior

A valid R2 envelope with `rootPresenceObserved=false` produces:

- rule evaluation: `not_matched`
- claims: none

It does **not** produce `無根`, weak, challenging, or inverse evidence.

Missing R2 evidence produces `skipped_missing_input`.

## Production boundary

The generic registry continues to reject a Production pack that selects this research-evidence-consuming rule.

External human/domain expert review is not required.

## Next step

R5 may inspect the next already-authorized intermediary needed for structural synthesis. It must not skip the governed root -> Tonggen -> support-constituent boundaries or invent support aggregation / strength classification.
