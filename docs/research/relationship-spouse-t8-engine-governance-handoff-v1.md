# Saju Bridge — Relationship / Spouse T8 Engine-Governance Handoff

Issue: #1620

Watchtower-Track: saju-bridge

Depends on: #1613 / PR #1615

## Result

```text
capabilityKey = relationship:natal:spouse

BridgeDecision = ENGINE_HANDOFF
G2A upstream disposition = AUTHORITY_GAP
expected G2A routing = HOLD_AUTHORITY

engineSemanticImplementationMayProceed = false
governanceRemediationMayProceed = true

Production = HOLD
```

The critical distinction is:

```text
Bridge ENGINE_HANDOFF
!=
G2A ADMITTED
```

The Bridge has enough evidence to stop reopening the bounded Spouse T8 semantic proposition as Research, but it does not yet have the runtime provenance and trust authority required to emit a complete admitted Engine handoff.

## Why this handoff exists

Relationship / Spouse / Natal T8 already has:

- closed five-of-five bounded research authority;
- governed canonical selector `derivedFacts.dayMaster.yinYang`;
- governed role-neutral spouse-star correspondence;
- an isolated research-only runtime producer.

The remaining blockers are governance blockers:

- runtime source binding authority is not established;
- trust-pinned reviewer authority is not established;
- lifecycle promotion is not authorized.

Those blockers belong to Engine/Governance remediation, but they do not authorize Engine semantic implementation.

## G2A compatibility

The Engine G2A intake contract requires `ADMITTED` before P0/P1/P2/READY can be reached.

This handoff therefore deliberately presents the current state as:

```text
upstreamDisposition = AUTHORITY_GAP
expected routing = HOLD_AUTHORITY
```

The fact that an isolated research producer already exists cannot override that authority gap.

No `admittedAuthorityRef`, admitted methodology ref, or admitted rule/claim contract ref is fabricated.

## Governed claim boundary

Required input:

```text
derivedFacts.dayMaster
```

Canonical selector:

```text
derivedFacts.dayMaster.yinYang
```

Allowed bounded outputs:

```text
resolved 양
  -> INDIRECT_WEALTH / 편재 / 偏財
  -> role-neutral spouse-star marker only

resolved 음
  -> INDIRECT_POWER / 편관 / 偏官
  -> role-neutral spouse-star marker only
```

Forbidden:

- native-sex inference;
- partner-sex inference;
- partner-identity inference;
- sexual-orientation inference;
- marriage existence or guarantee;
- fertility inference;
- relationship legality or ethics inference;
- compatibility scoring;
- second-chart inference;
- relationship outcome prediction;
- Annual or Monthly spouse-authority expansion;
- general Relationship authority relabelled as Spouse T8 authority.

## Negative cases

Fail closed when the canonical Day Master is:

- missing;
- ambiguous;
- unavailable;
- pending-shaped.

Also forbidden:

- T5 subtype reconstruction;
- general Relationship T8 relabelling;
- second-chart compatibility fallback.

These cases emit no new Spouse T8 semantic authority.

## Engine/Governance remediation workstreams

The handoff names exactly five workstreams:

1. `RUNTIME_SOURCE_BINDING`
2. `SOURCE_TIER_ELIGIBILITY_VERIFICATION`
3. `SPOUSE_BOUND_REVIEW_ATTESTATION`
4. `TRUST_PINNED_REVIEWER_GRANT`
5. `SEPARATE_LIFECYCLE_PROMOTION_REVIEW`

The first four establish evidence and review authority. The fifth is a later, separate promotion decision.

None of them may be silently synthesized from tests, docs, fixtures, generic reviewer infrastructure, or the existence of the isolated producer.

## Future ADMITTED handoff gate

A future G2A `ADMITTED` handoff requires fresh Bridge admission and all of the following material:

1. content-addressed admitted authority ref;
2. content-addressed methodology ref;
3. content-addressed rule/claim contract ref;
4. required inputs;
5. allowed claim scope;
6. forbidden claim scope;
7. runtime prerequisites;
8. negative/boundary cases.

The current handoff supplies the bounded semantic shape for items 4–8, but it does not fabricate the admitted authority refs required by items 1–3.

Therefore:

```text
futureG2AAdmittedDispositionAuthorized = false
futureG2AAdmittedDispositionRequiresFreshBridgeAdmission = true
```

## Non-activation boundary

This handoff authorizes none of the following:

```text
Research semantic reopening
Engine P0 runtime semantic implementation
Engine P1 composition implementation
Engine P2 hardening lane
lifecycle promotion
consumer narrative activation
compatibility consumer activation
preview/default-route activation
Official Reading authority
Production admission
```

The existing isolated research producer remains exactly where it is.

## Next state

```text
Spouse T8 closed bounded Research authority
        |
        v
isolated research runtime producer
        |
        v
Bridge #1613: ENGINE_HANDOFF
        |
        v
Bridge #1620: AUTHORITY_GAP governance handoff
        |
        v
Engine/Governance remediation
        |
        v
fresh Bridge admission review
        |
        +-- still incomplete -> HOLD_AUTHORITY
        |
        +-- complete admitted refs + contract -> future G2A ADMITTED
```

Production remains HOLD.
