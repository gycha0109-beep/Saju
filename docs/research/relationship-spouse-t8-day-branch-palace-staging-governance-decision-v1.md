# Relationship / Spouse T8 — SA-5G Explicit Staging Governance Decision

Issue: #1895  
Track: `saju-bridge`

## Purpose

SA-5G records the explicit project-owner governance decision for the exact
SA-5F staging-eligible Spouse T8 Day-Branch spouse-palace 2.0.0 candidate.

This phase does not materialize or execute a staging lifecycle. It establishes
only the governance authority required before SA-5H may perform a separate,
content-addressed staging lifecycle mutation.

## Exact lineage

```text
SA-5C 2.0.0 research claim contract
  -> SA-5D Bridge re-entry admission
  -> SA-5E isolated research execution
  -> SA-5F objective staging lifecycle eligibility
  -> SA-5G explicit project-owner staging governance decision
```

SA-5G binds to the exact SA-5F:

- `reviewId`
- `candidateRef`
- `policyRef`
- upstream SA-5E `executionId`
- upstream SA-5E execution authority ref
- capability `relationship:natal:spouse`
- semantic family `DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION`
- semantic version `2.0.0`

Any identity drift fails closed and no governance decision ref is emitted.

## Existing policy reuse

SA-5G reuses `myeonghwa-source-adjudication-promotion-policy@1.0.0`.
It does not create a second staging policy.

The pre-decision SA-5F state must remain:

- objective eligibility: true
- status: `ELIGIBLE_FOR_EXPLICIT_GOVERNANCE_DECISION`
- approved decision present: false
- Gate 12: `PENDING`
- blockers: none

With the exact project-owner approval, the same policy is evaluated again with
an exact source-adjudication governance decision.

Expected post-decision state:

- status: `SOURCE_ADJUDICATION_APPLICABILITY_APPROVED`
- approved decision present: true
- Gate 12: `NOT_APPLICABLE_WITH_JUSTIFICATION`
- blockers: none
- source-adjudication authority established: true

This Gate 12 resolution does not claim or imply human domain review.

## Project-owner decision

The accepted decision token is:

```text
APPROVE_SOURCE_ADJUDICATED_STAGING_AUTHORITY
```

The project owner's explicit instruction to proceed with SA-5G is the decision
basis for this exact candidate. `NOT_APPROVED` fails closed.

The resulting decision ref is deterministic and content-addressed from the
decision material.

## Authority boundary

A PASS establishes only:

- exact-candidate staging governance approval
- source-adjudication authority for lifecycle target `staging`
- authorization to proceed to a separate SA-5H materialization review

A PASS does not establish:

- human domain review
- `ReviewAttestation`
- `ReviewerTrustGrant`
- reviewer-status promotion
- provenance-quality promotion
- methodology/rule/pack/registry mutation
- staging runtime activation
- shadow execution
- narrative consumer activation
- Preview authority
- Official Reading authority
- Production authority

Production remains `HOLD`.

The 2.0.0 research methodology, rule, and pack remain `research`;
`reviewerStatus` remains `unreviewed`; the registry keeps zero review
attestations.

## Fail-close cases

No `decisionRef` is emitted when any of the following is false:

1. exact SA-5F review identity
2. exact 2.0.0 candidate identity
3. exact source-adjudication policy identity
4. exact upstream SA-5E execution identity
5. exact semantic family/version binding
6. SA-5F objective eligibility state
7. reviewer-authority boundary preservation
8. research-only lifecycle preservation
9. explicit project-owner approval

## Next disposition

PASS:

```text
BUILD_SA_5H_SOURCE_ADJUDICATED_STAGING_LIFECYCLE_MATERIALIZATION
```

FAIL:

```text
HOLD_AND_REESTABLISH_EXACT_SA5F_ELIGIBILITY_OR_PROJECT_OWNER_DECISION
```

SA-5H must remain a separate mutation step.
