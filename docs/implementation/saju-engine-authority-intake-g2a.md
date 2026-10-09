# Saju Engine Authority Intake Gate — G2A

Status: Engine implementation boundary  
Issue: #1566  
Track: `saju`  
Authority effect: **none**

## Purpose

G1 proved that executable Research code, Reading Profile selection, and Preview consumer routing are not equivalent to admitted Engine semantic authority.

G2A turns that boundary into a deterministic Engine-side classifier.

```text
Research / Bridge state
        |
        v
Engine Authority Intake
        |
        +-- RESEARCH_GAP  -> HOLD_RESEARCH
        +-- AUTHORITY_GAP -> HOLD_AUTHORITY
        +-- ADMITTED
              |
              +-- runtime missing      -> P0_RUNTIME
              +-- composition missing  -> P1_COMPOSITION
              +-- guards/E2E missing   -> P2_HARDENING
              +-- complete             -> READY
```

Only `ADMITTED` may enter P0/P1/P2/READY.

## Required admitted handoff

An admitted Engine handoff must explicitly bind:

1. capability key;
2. content-addressed admitted authority ref;
3. required inputs;
4. allowed claim scope;
5. forbidden claim scope;
6. content-addressed methodology ref;
7. content-addressed rule/claim contract ref;
8. runtime prerequisites;
9. negative/boundary cases.

Missing admitted material fails closed as `INVALID_EVIDENCE`.

## Implementation evidence

Engine implementation state is evaluated separately:

```text
producerRuntimeExists
compositionIntegrated
deterministicGuardsComplete
e2eComplete
```

Impossible ordering also fails closed. Composition cannot exist without a producer runtime, and guard/E2E completion cannot precede composition.

## Current examples

The gate deliberately preserves G1 routing:

```text
general:annual
Research runtime exists + AUTHORITY_GAP
=> HOLD_AUTHORITY

family:natal:parents
RESEARCH_GAP
=> HOLD_RESEARCH
```

Neither row becomes Engine work merely because code, a Reading Profile, or a consumer route exists.

## P0 / P1 / P2

`P0_RUNTIME`

Governed authority and handoff are admitted, but the producer runtime is missing.

`P1_COMPOSITION`

The admitted producer runtime exists, but governed composition/integration is missing.

`P2_HARDENING`

Runtime and composition exist, but deterministic guards and/or E2E proof remain incomplete.

`READY`

The admitted capability has runtime, composition, deterministic guards, and E2E proof.

## Authority boundary

G2A does not create or promote:

- Saju interpretation semantics;
- Research authority;
- Bridge admission;
- Reading Profile semantic authority;
- Preview/Official expansion;
- Production interpretation authority.

It only prevents the Engine track from starting semantic implementation before a complete admitted handoff exists.
