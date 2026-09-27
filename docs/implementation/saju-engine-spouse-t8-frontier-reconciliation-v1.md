# Saju Engine — Spouse T8 Capability Frontier Reconciliation

Issue: #1784

Watchtower-Track: saju

## Result

The global Saju Engine capability frontier is reconciled with the exact merged Relationship / Spouse T8 authority and P0 producer state.

Before this slice, the global frontier still carried the historical row:

```text
relationship:natal:spouse
upstream = AUTHORITY_GAP
routing = HOLD_AUTHORITY
```

That state became stale after:

- #1776 bounded Engine-development admission;
- #1781 complete G2A `ADMITTED` handoff;
- #1783 real Engine-owned P0 producer.

The reconciled current state is:

```text
relationship:natal:spouse
upstream = ADMITTED
producerRuntimeExists = true
routing = P1_COMPOSITION
implementationMayProceed = true
```

## Exact authority source

The spouse row does not use a fabricated or incomplete ADMITTED contract.

It consumes the exact merged G2A contract from the Spouse T8 handoff and the exact P0 producer completion evidence.

If the P0 producer completion evidence stops being valid, the frontier no longer treats the producer as present for routing.

## Global frontier

Expected current counts:

```text
21 total

5 BOUNDED_PREVIEW_READY
9 HOLD_AUTHORITY
6 HOLD_RESEARCH

0 P0_RUNTIME
1 P1_COMPOSITION
0 P2_HARDENING
0 READY_FROM_ADMITTED_INTAKE
0 INVALID_EVIDENCE
```

Current Engine work queue:

```text
relationship:natal:spouse
```

## Historical Research runtime distinction

The old frontier row observed that an executable Spouse T8 Research runtime existed.

That historical observation did not authorize Engine implementation.

The current `producerRuntimeExists = true` has a different basis:

```text
#1783 Engine-owned producer completion
```

Therefore:

```text
Research runtime != Engine producer authority
```

remains preserved.

## Unchanged capability boundary

The other 20 capability rows retain their existing routing.

No other authority-gap or research-gap row is promoted by this reconciliation.

## Authority boundary

This slice changes no Saju meaning and activates no consumer surface.

It does not authorize:

- new semantic claims;
- P1 composition implementation by itself;
- Preview expansion;
- Official Reading;
- public semantic authority;
- reviewer/provenance/lifecycle promotion;
- Production admission.

Production remains `HOLD`.

## Next

The next Engine-owned slice is:

```text
P1_COMPOSITION
```

Its job is to connect the admitted Spouse T8 Engine claim to the existing generic reading selection/composition evidence path without activating Official Reading or Production.
