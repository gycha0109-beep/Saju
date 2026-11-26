# Saju Engine — Relationship / Spouse T8 P0 Engine Producer

Issue: #1782

Watchtower-Track: saju

## Result

This slice implements the first Engine-owned producer for the bounded admitted capability:

```text
relationship:natal:spouse
```

Upstream G2A state before this slice:

```text
ADMITTED
routing = P0_RUNTIME
implementationMayProceed = true
```

## Ownership boundary

The Engine producer is a new execution surface under `src/interpretation`.

It does not call the Research runtime wrapper.

Instead it:

1. validates the exact bounded admission;
2. validates the exact G2A P0 handoff;
3. verifies admitted authority / methodology / rule-claim refs;
4. verifies the exact source-bound registry snapshot;
5. passes that admitted registry directly to the generic `runInterpretation` engine.

Therefore:

```text
Research wrapper != Engine producer
```

while still avoiding rule duplication:

```text
admitted Research registry = semantic reference material
Engine producer = admitted execution owner
```

No rule or Saju semantic is re-authored in the Engine layer.

## Positive equivalence

The Engine producer preserves exactly:

```text
Yang Day Master
-> INDIRECT_WEALTH
-> 편재
-> 偏財

Yin Day Master
-> INDIRECT_POWER
-> 편관
-> 偏官
```

The emitted claim remains only the role-neutral spouse-star marker.

## Fail-closed behavior

The producer emits no Spouse T8 claim when Day Master is:

```text
missing
ambiguous
unavailable
pending
```

## P0 completion evidence

After this producer exists, implementation evidence becomes:

```text
producerRuntimeExists = true
compositionIntegrated = false
deterministicGuardsComplete = false
e2eComplete = false
```

The same admitted G2A contract must therefore evaluate to:

```text
routing = P1_COMPOSITION
implementationMayProceed = true
```

This evidence does not implement P1 composition.

## Authority boundary

P0 completion does not authorize:

- semantic expansion;
- Preview activation;
- Official Reading;
- public semantic authority;
- lifecycle promotion;
- Production admission.

Production remains:

```text
HOLD
```

## Next Engine slice

```text
P1_COMPOSITION
```

The next slice should connect the admitted Spouse T8 claim to the existing generic Reading composition/evidence-selection path without creating a new composition framework.
