# Saju Engine — Relationship / Spouse T8 P1 Composition Integration

Issue: #1786

Watchtower-Track: saju

## Result

This slice connects the admitted Relationship / Spouse T8 Engine producer to the existing governed Reading selection/composition path.

No new Reading profile, selector framework, or Saju semantic rule is introduced.

```text
Spouse T8 Engine producer
        ↓
existing relationship:natal:spouse profile
        ↓
existing profile-selection authorization
        ↓
existing Product Reading preparation/composition
        ↓
governed Reading evidence
```

## Existing surfaces reused

The implementation reuses:

- consumer phrase `배우자운`;
- normalized intent `relationship / natal / spouse`;
- `myeonghwa-reading-profile-relationship-spouse-natal-v1`;
- its existing content-addressed selection authorization;
- the existing scenario-aware Reading composition path;
- the existing governed evidence bundle builder;
- the exact admitted Spouse T8 source-bound registry;
- the actual Engine-owned P0 producer.

The P1 adapter does not accept an arbitrary intent or registry from callers.

## Positive composition

For resolved Day Master polarity, the Engine producer emits exactly one admitted T8 spouse marker.

Yang:

```text
INDIRECT_WEALTH / 편재 / 偏財
```

Yin:

```text
INDIRECT_POWER / 편관 / 偏官
```

The existing spouse profile requires:

```text
tier = T8
category = relationship
subcategory = spouse
```

Therefore the exact producer claim becomes the target and selected claim.

Expected composition state:

```text
coverageState = complete
selectedClaimIds = exact producer claim
missingRequirements = []
governed evidence = present
```

The evidence bundle retains the canonical Day Master fact provenance.

## Fail closed

For:

- missing Day Master;
- ambiguous Day Master;
- unavailable Day Master;
- pending Day Master;

the producer emits no claim.

The P1 composition preserves that absence:

```text
coverageState = insufficient_evidence
selectedClaimIds = []
governed evidence = absent
reading execution = blocked_coverage
```

No general relationship claim or LLM fallback may fill the missing spouse evidence.

## Relationship-general exclusion

The existing spouse profile explicitly excludes:

```text
T8 / relationship / general
```

The integration test verifies that a general relationship claim placed beside the real spouse producer claim is omitted from the spouse selection and evidence bundle.

## P1 implementation evidence

After this slice:

```text
producerRuntimeExists = true
compositionIntegrated = true
deterministicGuardsComplete = false
e2eComplete = false
```

The existing G2A evaluator must therefore produce:

```text
P2_HARDENING
implementationMayProceed = true
```

## Global frontier

Expected current global frontier after P1:

```text
21 total

5 BOUNDED_PREVIEW_READY
9 HOLD_AUTHORITY
6 HOLD_RESEARCH

0 P0_RUNTIME
0 P1_COMPOSITION
1 P2_HARDENING
0 READY
0 INVALID_EVIDENCE
```

The Engine work queue remains:

```text
relationship:natal:spouse
```

## Authority boundary

The Product Reading preparation layer may report `ready_for_execution` when governed spouse evidence is complete, but this P1 slice does not invoke the consumer execution orchestrator.

It specifically does not call:

```text
executeProductReading(...)
```

and does not authorize:

- legacy narrative execution;
- Preview expansion;
- Official Reading;
- public semantic authority;
- reviewer/provenance/lifecycle promotion;
- Production admission.

Production remains `HOLD`.

## Next

The next Engine-owned state is:

```text
P2_HARDENING
```

That slice should add deterministic guard coverage and actual end-to-end boundary tests before any Engine READY disposition is considered.
