# Saju Engine — Relationship / Spouse T8 P1 Composition Integration

Issue: #1786

Watchtower-Track: saju

## Result

This slice connects the admitted Spouse T8 Engine producer to the repository's existing governed Reading composition path.

No new composition framework or Reading profile is introduced.

## Existing path reused

The integration reuses:

```text
Engine Spouse T8 producer
→ existing relationship / natal / spouse DomainReadingProfile
→ existing profile selection authorization
→ existing buildReadingCompositionEvidence
→ existing governed evidence selector
```

The frozen profile is:

```text
myeonghwa-reading-profile-relationship-spouse-natal-v1
```

Its authorization remains strictly:

```text
scope = reading_evidence_selection_only
```

and therefore cannot authorize interpretation rules, claim generation, domain semantics, or Research authority.

## Positive composition

For a resolved Day Master, the Engine producer emits exactly one admitted Spouse T8 claim.

The existing spouse profile selects that exact claim:

```text
coverageState = complete
targetClaimIds = [exact spouse claim]
selectedClaimIds = [exact spouse claim]
missingRequirements = []
governed evidence bundle = present
```

This applies to both admitted source-bounded branches:

```text
Yang → INDIRECT_WEALTH / 편재 / 偏財
Yin  → INDIRECT_POWER / 편관 / 偏官
```

## Fail-closed composition

When Day Master is:

```text
missing
ambiguous
unavailable
pending
```

the Engine producer emits no Spouse T8 claim and Reading composition remains:

```text
coverageState = insufficient_evidence
selectedClaimIds = []
missingRequirements = [RELATIONSHIP_SPOUSE_DOMAIN_CLAIM_REQUIRED]
governed evidence bundle = absent
```

No missing claim is invented by the Reading layer.

## P1 completion evidence

After this integration:

```text
producerRuntimeExists = true
compositionIntegrated = true
deterministicGuardsComplete = false
e2eComplete = false
```

The admitted G2A contract must therefore route to:

```text
P2_HARDENING
implementationMayProceed = true
```

## Authority boundary

P1 composition does not authorize:

- new Saju semantics;
- a new Reading Profile authority;
- Preview expansion;
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
P2_HARDENING
```

The next slice should implement the deterministic guard matrix and end-to-end Engine evidence without expanding the semantic scope.
