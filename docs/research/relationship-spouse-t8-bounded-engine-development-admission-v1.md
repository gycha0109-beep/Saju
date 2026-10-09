# Saju Bridge — Relationship / Spouse T8 Bounded Engine-Development Admission

Issue: #1774

Watchtower-Track: saju-bridge

## Decision

The project owner authorizes the exact current Relationship / Spouse T8 source-bound surface to enter **bounded Engine development only**.

This is a development admission, not a public or Production authority promotion.

```text
capability = relationship:natal:spouse
source-bound runtime = 1.0.1
AI-assisted internal review = 3 / 3 approved

bounded Engine development = ADMITTED
independent human domain review = NOT ESTABLISHED
ReviewerTrustGrant = 0
Official Reading = NOT AUTHORIZED
Production = HOLD
```

## Why a separate Bridge artifact exists

The existing G2A intake contract already distinguishes Engine implementation routing from Production authority, but it requires a complete content-addressed `ADMITTED` handoff before P0/P1/P2 work may begin.

The previous Spouse T8 Engine-governance handoff (#1620) intentionally emitted `AUTHORITY_GAP` because source binding, reviewer authority, and lifecycle gates were not then ready for any Engine implementation lane.

Subsequent work established:

- source-bound runtime `1.0.1`;
- exact source registration and source-role boundaries;
- exact content-addressed review subjects;
- external review-attestation intake;
- trust-grant request manifest;
- AI-assisted internal review of the exact three current subjects.

The AI review is deliberately not treated as independent domain review. #1774 records a narrower project-owner policy: that exact evidence is sufficient for bounded Engine development, while public/Production authority stays closed.

## Exact admission conditions

Admission is valid only while all of these remain true:

1. capability is exactly `relationship:natal:spouse`;
2. runtime version is exactly the source-bound `1.0.1`;
3. runtime scope remains `isolated_research_only`;
4. source binding remains materialized;
5. the current review surface remains exactly one methodology + two rules;
6. all three subject refs match the AI-reviewed refs by exact content hash;
7. all three AI review decisions remain `approved / internal`;
8. Whisper remains the only selector-rule `direct_basis`;
9. Lee Youngeun remains methodology context only;
10. the AI review remains explicitly non-domain and non-trusted;
11. ReviewerTrustGrant count remains zero;
12. lifecycle, Official Reading and Production promotion remain unauthorized.

Any drift returns the artifact to HOLD and requires a fresh review/admission.

## Issued refs

A successful admission emits three content-addressed inputs for the later G2A slice:

```text
admittedAuthorityRef
admittedMethodologyRef
admittedRuleClaimContractRef
```

The rule/claim contract reuses the already-governed #1620 boundary:

- required input: `derivedFacts.dayMaster`;
- selector: `derivedFacts.dayMaster.yinYang`;
- Yang -> `INDIRECT_WEALTH / 편재 / 偏財`, role-neutral spouse-star marker only;
- Yin -> `INDIRECT_POWER / 편관 / 偏官`, role-neutral spouse-star marker only.

The existing forbidden-claim and negative-case lists are preserved rather than rewritten.

## Development scope

When admitted, the artifact authorizes only:

```text
Engine producer-runtime development
Engine composition development
deterministic guard development
Engine E2E development
```

It does not activate those surfaces automatically; the later G2A intake and Engine slices still own their own implementation state.

## Hard non-activation boundary

The artifact always keeps these false:

```text
AI internal review is human domain review
AI internal review creates ReviewerTrustGrant
reviewer-status promotion
provenance-quality promotion
lifecycle promotion
Preview expansion
Official Reading authority
public semantic authority
Production admission
```

Production remains `HOLD`.

## Next slice

After #1774 merges, create a separate G2A handoff that consumes these exact refs.

The first expected Engine intake evidence remains:

```text
producerRuntimeExists = false
compositionIntegrated = false
deterministicGuardsComplete = false
e2eComplete = false
```

The existing isolated Research runtime must not be relabelled as an Engine producer.

Therefore the expected G2A result after the separate handoff is:

```text
upstreamDisposition = ADMITTED
routing = P0_RUNTIME
implementationMayProceed = true
```

That still does not authorize Preview, Official Reading or Production.
