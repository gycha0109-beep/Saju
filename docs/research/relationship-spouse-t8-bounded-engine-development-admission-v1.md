# Saju Bridge — Relationship / Spouse T8 Bounded Engine-Development Admission

Issue: #1774

Watchtower-Track: saju-bridge

## Decision

The project owner authorizes the exact current Relationship / Spouse T8 source-bound runtime to cross the Bridge for **bounded Engine development only**.

This is a deliberately narrower authority class than independent human domain review or Production/public semantic authority.

It is based on the exact source-bound runtime plus the merged AI-assisted internal review from #1772.

## Exact dependency surface

```text
capability = relationship:natal:spouse
source-bound runtime = 1.0.1
reviewed subjects = 3
review decisions = 3 x approved/internal
independent human domain review = absent
ReviewerTrustGrant = absent
Production = HOLD
```

Any runtime, methodology, rule, source-role, review-subject, or review-decision drift requires a fresh review and fresh admission.

## Admission meaning

When every prerequisite remains exact, this artifact may authorize only:

```text
Engine producer-runtime development
Engine composition development
deterministic guard development
Engine E2E development
reuse of the existing source-bound producer runtime
```

It does not authorize new Saju semantics.

## Content-addressed handoff material

The artifact produces three inputs required by a later G2A handoff:

1. bounded Engine-development admission ref;
2. exact source-bound methodology ref;
3. bounded rule/claim contract ref.

The rule/claim contract itself pins:

```text
runtime version
registry snapshot
pack ref
methodology ref
two exact selector rule refs
claim type ref
claim value schema ref
required inputs
allowed claims
forbidden claims
runtime prerequisites
negative / boundary cases
```

Therefore a material contract change produces a different content hash.

## Allowed claim scope

Only the existing two source-bounded selector results are admitted for Engine development:

```text
resolved Yang Day Master
→ Indirect Wealth / 편재 / 偏財
→ role-neutral spouse-star marker

resolved Yin Day Master
→ Indirect Power / 편관 / 偏官
→ role-neutral spouse-star marker
```

## Forbidden scope

The admission explicitly does not authorize:

```text
native sex inference
partner sex or identity inference
sexual orientation or gender identity inference
marriage existence / guarantee
fertility
relationship legality / ethics
compatibility scoring
second-chart inference
relationship-outcome prediction
Annual / Monthly spouse expansion
general relationship authority relabelled as Spouse T8
```

## Review-policy boundary

The admission depends on the merged AI-assisted internal review being exact and valid.

That review remains:

```text
AI_ASSISTED_INTERNAL_REVIEW
reviewLevel = internal
3 / 3 approved
```

It is not relabelled as:

```text
independent human domain review
trusted domain attestation
ReviewerTrustGrant
domain_reviewed reviewer status
```

## Public / Production boundary

Even after this bounded admission:

```text
independentHumanDomainReviewStillRequired = true
trustedDomainAttestationStillRequired = true
reviewerTrustGrantStillRequired = true

reviewerStatusPromotionAuthorized = false
provenanceQualityPromotionAuthorized = false
lifecyclePromotionAuthorized = false

Preview activation = false
Official Reading authority = false
public semantic authority = false
Production admission = false
Production = HOLD
```

## G2A boundary

This slice intentionally does **not** mutate G2A.

Current frontier must remain:

```text
relationship:natal:spouse
→ HOLD_AUTHORITY
→ implementationMayProceed = false
```

The artifact only establishes that a later, separate G2A handoff may consume the three content-addressed refs.

That next slice must explicitly bind the admission into G2A before P0/P1/P2 routing can open.

## Why the split exists

The Bridge decision and Engine intake remain separate authority events.

```text
bounded Bridge admission
!= current G2A routing mutation
!= public authority
!= Production admission
```

This preserves the existing authority spine while allowing a one-person project to continue bounded Engine implementation without pretending that AI internal review is independent expert validation.
