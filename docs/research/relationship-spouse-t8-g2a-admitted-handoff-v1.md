# Saju Bridge — Relationship / Spouse T8 G2A Admitted Handoff

Issue: #1780

Watchtower-Track: saju-bridge

## Result

This slice consumes the exact bounded Engine-development admission merged in #1776 and creates a complete existing G2A intake contract.

```text
capability = relationship:natal:spouse
upstreamDisposition = ADMITTED
authority contract = complete
initial Engine producer = absent

G2A routing = P0_RUNTIME
implementationMayProceed = true
```

## Exact input refs

The handoff consumes, without rewriting:

- #1776 admitted authority ref;
- #1776 admitted methodology ref;
- #1776 bounded rule/claim contract ref;
- the existing #1620 governed required-input / allowed-claim / forbidden-claim / prerequisite / negative-case boundary.

No new Spouse T8 semantic claim is created here.

## Initial Engine implementation evidence

The current evidence is intentionally:

```text
producerRuntimeExists = false
compositionIntegrated = false
deterministicGuardsComplete = false
e2eComplete = false
```

The repository already contains the source-bound Spouse T8 runtime `1.0.1`, but its scope is:

```text
isolated_research_only
```

Therefore:

```text
Research runtime != Engine producer runtime
```

and it cannot be used to skip P0.

## Meaning of G2A ADMITTED

For this handoff, `ADMITTED` means only that the Engine track may begin the already-bounded implementation work.

It does not mean:

- independent human domain review;
- trusted domain attestation;
- ReviewerTrustGrant;
- reviewer-status promotion;
- provenance-quality promotion;
- lifecycle promotion;
- Preview/public semantic expansion;
- Official Reading authority;
- Production admission.

The existing G2A contract itself keeps `mayPromoteProductionAuthority = false`.

Production remains `HOLD`.

## Expected next Engine state

The next implementation slice should build a real Engine-owned Spouse T8 producer while preserving semantic equivalence with the admitted Research reference behavior.

Required positive equivalence:

```text
resolved Yang Day Master
-> INDIRECT_WEALTH / 편재 / 偏財
-> role-neutral spouse-star marker only

resolved Yin Day Master
-> INDIRECT_POWER / 편관 / 偏官
-> role-neutral spouse-star marker only
```

Required fail-closed equivalence:

```text
missing Day Master -> no Spouse T8 claim
ambiguous Day Master -> no Spouse T8 claim
unavailable Day Master -> no Spouse T8 claim
pending Day Master -> no Spouse T8 claim
```

After a real Engine producer exists, a future evidence update may legitimately route to `P1_COMPOSITION`.

## Non-scope

This slice does not:

- implement the Engine producer;
- integrate Product Reading composition;
- add deterministic guards beyond the existing G2A handoff validation;
- activate Preview or Official Reading;
- promote lifecycle;
- authorize Production;
- expand to Annual, Monthly or Compatibility;
- add any new workflow.
