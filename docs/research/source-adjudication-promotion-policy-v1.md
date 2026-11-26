# Source-Adjudication Promotion Applicability Policy v1

Issue: #1799

Watchtower-Track: saju-bridge

## Purpose

This policy defines a fail-closed alternative promotion-authority path for bounded deterministic correspondence claims when an external human domain reviewer is not available.

It does **not** redefine AI review as human review.

It does **not** create a `ReviewAttestation`, `ReviewerTrustGrant`, or `domain_reviewed` reviewer status.

## Authority model

The repository keeps both authority paths distinct:

```text
trusted human review
→ trust-pinned ReviewAttestation
→ normal reviewer authority path

source adjudication
→ exact source/evidence/implementation package
→ explicit governance decision
→ governed Gate 12 N/A for staging only
```

The second path never claims that a human domain reviewer existed.

## R098 Gate 12

The existing gate remains:

```text
REQUIRED_DOMAIN_REVIEW_ATTESTATION_SATISFIED
```

Its applicability is conditional.

Human path:

```text
status = SATISFIED
```

Source-adjudication path:

```text
status = NOT_APPLICABLE_WITH_JUSTIFICATION
policyRef = exact source-adjudication policy ref
justification = required
explicit governance decision = required
```

A silent skip is never permitted.

Without the explicit governance decision, an otherwise complete source-adjudication candidate remains:

```text
PENDING
ELIGIBLE_FOR_EXPLICIT_GOVERNANCE_DECISION
```

## Eligible claim class

v1 admits only:

```text
bounded_deterministic_correspondence
```

The candidate must have exact, inspectable evidence for:

1. frozen semantic scope;
2. exact content addressing;
3. complete source binding;
4. pinned source roles;
5. passage/proposition binding;
6. explicit rights/reuse handling;
7. counterexample/divergence review;
8. explicit calculation conventions;
9. executable predicates without hidden guesses;
10. fail-closed ambiguity/unknown behavior;
11. deterministic and regression test success;
12. Engine E2E completion;
13. semantic-expansion guards;
14. AI-assisted adversarial/internal review.

## Disqualifiers

The v1 source-adjudication path fails closed when the candidate contains:

- open-ended narrative semantics;
- unresolved methodology conflict;
- a cross-source synthetic rule;
- an unfrozen semantic scope.

## Governance decision

Objective evidence completeness does not itself create authority.

An exact explicit governance decision must bind:

- the candidate content-addressed ref;
- the staging lifecycle target;
- the `source_adjudication` authority class;
- its own content-addressed decision ref.

Candidate hash drift invalidates reuse of the prior decision.

A rejected decision blocks the path.

## Lifecycle boundary

Source-adjudication v1 is staging-only:

```text
allowedLifecycleTargets = ['staging']
```

It does not satisfy Production review authority.

```text
source adjudication v1
!= Production authority
```

Production provenance and Production review requirements are unchanged by this policy.

## Non-authority boundary

Defining this policy does not:

- approve Spouse T8 or any other candidate;
- mutate methodology, rule, or pack lifecycle;
- grant Preview authority;
- grant Official Reading authority;
- grant Production authority;
- claim human domain review;
- claim reviewer trust;
- create a review attestation;
- assign `domain_reviewed`.

Production remains HOLD unless a later, separate authority path explicitly changes it.
