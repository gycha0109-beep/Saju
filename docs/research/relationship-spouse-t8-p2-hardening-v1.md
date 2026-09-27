# Saju Engine — Relationship / Spouse T8 P2 Hardening and Engine E2E

Issue: #1790

Watchtower-Track: saju

## Result

This slice completes the Engine hardening boundary for the already-admitted capability:

```text
relationship:natal:spouse
```

No new Saju semantic is added.

## Guard matrix

The P2 matrix fixes and verifies sixteen boundaries:

```text
Yang -> exactly one INDIRECT_WEALTH / 편재 / 偏財 marker
Yin  -> exactly one INDIRECT_POWER / 편관 / 偏官 marker

missing     -> claim 0
ambiguous   -> claim 0
unavailable -> claim 0
pending     -> claim 0

same snapshot rerun -> same claim identity / content / run hash
unrelated input mutation -> same bounded semantic projection

spouse natal intent -> exact spouse claim selected
relationship general intent -> spouse claim not selected
relationship annual intent -> no spouse auto-expansion
relationship monthly intent -> no spouse auto-expansion
compatibility intent -> spouse claim not reused

second-chart access -> forbidden

canonical input
-> CanonicalSajuSnapshot
-> admitted Engine producer
-> InterpretationClaim / Claim Graph
-> spouse Reading Profile
-> Evidence Selection
-> Governed Reading Evidence
```

## P2-discovered scope bug

Hardening exposed an existing Reading Profile issue.

The previous `relationship:natal:general` required selector matched:

```text
T8 / relationship / *
```

because its subcategory was omitted.

That allowed a spouse-scoped T8 claim to satisfy a general-relationship request.

P2 narrows it to:

```text
T8 / relationship / general
```

The profile content hash therefore changes and the frozen selection-authorization ref is updated to the new exact profile content.

This is a scope restriction, not a new Saju semantic.

## Completion evidence

After P2:

```text
producerRuntimeExists = true
compositionIntegrated = true
deterministicGuardsComplete = true
e2eComplete = true

G2A routing = READY
implementationMayProceed = false
```

The global 21-capability frontier consumes this completion evidence only when the hardening binding is complete.

## Meaning of READY

```text
READY = bounded Engine semantic capability complete
```

It does not mean:

- Preview enabled;
- Official Reading enabled;
- public semantic authority;
- lifecycle promotion;
- Production enabled.

Those remain separate authority decisions.

## Production boundary

```text
Production = HOLD
```

No Production/public activation occurs in this slice.
