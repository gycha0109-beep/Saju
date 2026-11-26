# ADR-0009 — MyeongHa V1 Direct Third-Party Stem Interference Policy

- Status: Accepted
- Date: 2026-10-06
- Scope: one-hop visible non-day-master third-party stem interference over R190 stem-five-combination settlements
- Extends: ADR-0008

## Context

ADR-0008 settles each eligible non-day-master stem-five-combination pair locally.
A reading product also needs a deterministic result when a third visible stem directly controls or supports
one participant. The runtime must not choose a result by array order, first-match execution, or LLM judgment.

## Decision

R191 applies one-hop incoming Five-Element interaction from visible non-day-master stems that are not
the pair participants.

Direct influence is recognized only when the third-party source element:

- controls the target element -> CONTROL; or
- generates the target element -> SUPPORT.

The day stem is excluded as an external source in this policy version.

No recursive propagation is performed. The state of the external source is not itself recalculated through
other relations before its direct edge is used.

### Same-target conflict

If CONTROL and SUPPORT are both present for the same target, CONTROL wins.
No counts, scores, or numeric weights are used.

### Controller

R190 base state is constrained.

- incoming CONTROL -> impaired
- otherwise -> constrained
- SUPPORT never restores preserved while the combination remains present

### Pair control effectiveness

- controller constrained -> pair control remains effective
- controller impaired -> pair control is not effective

### Controlled participant

R190 base state is impaired.

Resolution order:

1. incoming CONTROL -> impaired
2. else incoming SUPPORT -> constrained
3. else pair control ineffective -> constrained
4. else -> impaired

This makes the graph deterministic and independent of input enumeration order.

## Product authority

This is a MyeongHa V1 product convention.
It does not claim universal classical precedence between generation and control,
and it does not revise the research record that rejects deriving a global precedence rule from source order.

## Non-decisions

This policy does not authorize:

- recursive graph mutation;
- numeric strength;
- source-count weighting;
- hidden-stem interference;
- day-master interference;
- luck or annual stem layering;
- outgoing drain effects;
- competing duplicate combination-target settlement;
- automatic function loss;
- chart-level favorable/unfavorable finalization.

## User-facing boundary

The reading layer may receive the settled external edges, pair-control-effective flag, base state, and final state.
It must not receive research HOLDs, provenance uncertainty, source conflict, or policy debate as default consumer copy.
