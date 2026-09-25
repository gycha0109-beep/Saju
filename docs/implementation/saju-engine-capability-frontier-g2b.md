# Saju Engine Capability Frontier — G2B

Status: executable Engine frontier snapshot  
Issue: #1578  
Track: `saju`  
Stack: G2A / #1567  
Authority effect: **none**

## Purpose

G1 recorded the original 21-capability state in an audit document. G2A introduced the fail-closed Engine intake classifier. G2B applies newer merged upstream dispositions over that baseline; in particular, merged Bridge review #1514 supersedes G1's older `general:annual = AUTHORITY_GAP` observation with `RETURN_TO_RESEARCH`.

G2B materializes that audited state as deterministic Engine code so the Engine track has one executable answer to:

```text
What can Engine implement right now?
```

Current answer:

```text
Engine-owned P0/P1/P2 queue = empty
```

This is intentional. It prevents executable Research code from being mistaken for admitted Engine authority.

## Current frontier

```text
21 total capabilities

5  BOUNDED_PREVIEW_READY
10 HOLD_AUTHORITY
6  HOLD_RESEARCH

0 P0_RUNTIME
0 P1_COMPOSITION
0 P2_HARDENING
0 READY_FROM_ADMITTED_INTAKE
```

### Bounded Preview-ready

```text
general:natal
career:natal
wealth:natal
business:natal
relationship:natal:general
```

These five preserve the existing Canary boundary. G2B does not reinterpret Preview readiness as a new Engine admission or Production authority.

### Authority hold

```text
general:monthly
career:annual
career:monthly
wealth:annual
wealth:monthly
business:annual
business:monthly
relationship:annual:general
relationship:monthly:general
relationship:natal:spouse
```

All eleven have executable Research runtime evidence, but G2A still returns `HOLD_AUTHORITY`.

### Research hold

```text
general:annual
family:natal:parents
family:natal:children
compatibility:natal
life_stage:life_stage
question_specific:natal
```

General Annual is here because merged Bridge review #1514 returned the executable candidate to Research. The other five rows remain the original G1 Research gaps. Runtime existence does not override a merged `RETURN_TO_RESEARCH` disposition.

## Promotion rule

A future row may enter:

```text
P0_RUNTIME
P1_COMPOSITION
P2_HARDENING
READY
```

only through a complete G2A `ADMITTED` handoff.

Neither this frontier, a Reading Profile, a Research runtime, nor Preview consumer authority can create that admission.

## Boundary

G2B performs no Research and no Bridge decision.

It creates no:

- interpretation semantics;
- claim authority;
- Research promotion;
- Preview expansion;
- Production interpretation authority.

Its only function is to make the current Engine work frontier executable and fail-closed.
