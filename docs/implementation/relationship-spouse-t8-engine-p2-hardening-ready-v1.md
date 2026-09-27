# Saju Engine — Relationship / Spouse T8 P2 Hardening and READY

Issue: #1790

Watchtower-Track: saju

## Result

This slice completes deterministic hardening and Engine E2E for the already-admitted capability:

```text
relationship:natal:spouse
```

No new Saju semantics are created.

The completed Engine path is:

```text
BirthInput
→ calculateCanonicalSajuSnapshot
→ admitted Spouse T8 Engine producer
→ InterpretationClaim / claim graph
→ existing relationship:natal:spouse Reading profile
→ authorized evidence selection
→ governed Reading evidence
```

Product delivery and narrative execution are explicitly not P2 completion criteria.

## Guard matrix

Positive:

```text
resolved Yang Day Master
→ INDIRECT_WEALTH / 편재 / 偏財
→ exactly one role-neutral spouse marker

resolved Yin Day Master
→ INDIRECT_POWER / 편관 / 偏官
→ exactly one role-neutral spouse marker
```

Fail closed:

```text
missing Day Master     → 0 spouse claims
ambiguous Day Master   → 0 spouse claims
unavailable Day Master → 0 spouse claims
pending Day Master     → 0 spouse claims
```

Determinism and scope guards:

- identical canonical birth input + calculation time + interpretation time produces identical snapshot identity, claim identity, and run hash;
- changing only `sexForTraditionalCalculation` does not change the role-neutral spouse semantic projection;
- spouse natal intent selects only the spouse marker;
- relationship-general intent cannot reuse a spouse marker;
- Annual spouse and Monthly spouse intents remain unsupported;
- Compatibility cannot reuse the spouse marker;
- the admitted capability requires only `derivedFacts.dayMaster`;
- `SECOND_CHART_INFERENCE` and second-chart compatibility fallback remain forbidden.

## Relationship general selector hardening

Before this slice, the relationship-general natal profile selected any active `T8 / relationship` claim and therefore could also select `T8 / relationship / spouse`.

P2 closes that asymmetry by adding an explicit exclusion:

```text
T8 / relationship / spouse
```

to the relationship-general natal profile.

Because Reading Profile selection authorization is content-addressed, the frozen authorization hash for:

```text
myeonghwa-reading-profile-relationship-general-natal-v1@1.0.0
```

is updated to the exact new profile hash.

This is a selector isolation repair only. It does not create or promote relationship-general semantics.

## E2E boundary

The P2 E2E surface starts from one canonical `BirthInput` and one calculation policy.

It does not accept:

- a second chart;
- a compatibility chart;
- a caller-supplied Interpretation result;
- a caller-supplied registry;
- a caller-supplied Reading profile;
- a caller-supplied semantic authority decision.

The exact admitted registry and existing spouse composition path are reused internally.

## P2 completion evidence

After this slice:

```text
producerRuntimeExists = true
compositionIntegrated = true
deterministicGuardsComplete = true
e2eComplete = true
```

The existing G2A classifier must therefore resolve:

```text
routing = READY
implementationMayProceed = false
```

`READY` means Engine implementation completion only.

## Global frontier

Expected current global capability frontier:

```text
21 total

5 BOUNDED_PREVIEW_READY
9 HOLD_AUTHORITY
6 HOLD_RESEARCH

0 P0_RUNTIME
0 P1_COMPOSITION
0 P2_HARDENING
1 READY
0 INVALID_EVIDENCE
```

The Engine work queue becomes empty because the admitted Spouse T8 Engine implementation lane is complete.

## Authority boundary

Engine READY does not authorize:

- Preview expansion;
- Official Reading;
- public semantic authority;
- consumer narrative activation;
- independent human domain review;
- ReviewerTrustGrant;
- reviewer/provenance/lifecycle promotion;
- Production admission.

Production remains:

```text
HOLD
```

## Next boundary

Any future consumer/public activation must proceed through its own explicit authority path.

Engine READY must not be used as evidence of Production or Official Reading authority.
