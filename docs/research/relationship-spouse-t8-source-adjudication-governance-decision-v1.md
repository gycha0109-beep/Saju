# Relationship / Spouse T8 — Source-Adjudicated Staging Governance Decision

Issue: #1803

Watchtower-Track: saju-bridge

## Decision

The Project Owner explicitly approves the exact current content-addressed Spouse T8 candidate for the source-adjudicated staging authority path:

```text
APPROVE_SOURCE_ADJUDICATED_STAGING_AUTHORITY
```

This decision applies only to the exact candidate produced by the merged eligibility evaluation from #1801 / #1802.

## Preconditions

The decision is valid only while the exact candidate still resolves to:

```text
objectiveEligibility = true
status = ELIGIBLE_FOR_EXPLICIT_GOVERNANCE_DECISION
Gate 12 = PENDING
blockers = []
```

The exact source-adjudication policy ref must also match the current policy.

Candidate or policy content-hash drift invalidates reuse of this decision.

## Result

When all preconditions remain exact:

```text
sourceAdjudicationAuthorityEstablished = true
Gate 12 = NOT_APPLICABLE_WITH_JUSTIFICATION
allowedLifecycleTarget = staging
```

The decision itself is content-addressed as:

```text
relationship-spouse-t8-source-adjudicated-staging-governance-decision@1.0.0
```

## Authority separation

This decision does not claim or create:

- human domain review;
- ReviewAttestation;
- ReviewerTrustGrant;
- `domain_reviewed`;
- reviewer-status promotion;
- provenance-quality promotion.

It also does not perform lifecycle mutation.

```text
lifecyclePromotionAuthorized = false
stagingLifecycleMutationAuthorized = false
stagingRuntimeActivationAuthorized = false
```

Preview and Official Reading remain unauthorized.

Production remains:

```text
HOLD
```

## Gate 12

Before this decision:

```text
REQUIRED_DOMAIN_REVIEW_ATTESTATION_SATISFIED
→ PENDING
```

After this exact staging-only source-adjudication decision:

```text
REQUIRED_DOMAIN_REVIEW_ATTESTATION_SATISFIED
→ NOT_APPLICABLE_WITH_JUSTIFICATION
```

This does not erase or falsify the absence of human review.

It records that the candidate is governed by the approved source-adjudication staging path defined by the generic v1 policy.

## Next boundary

A later, separate lifecycle mutation may consume this exact governance-decision ref and build a staging candidate.

That mutation must still fail closed on:

- candidate drift;
- policy drift;
- decision-ref drift;
- semantic expansion;
- source-role drift;
- provenance inflation;
- any attempt to activate Production.

This governance decision is authority for the staging path only; it is not the staging mutation itself.
