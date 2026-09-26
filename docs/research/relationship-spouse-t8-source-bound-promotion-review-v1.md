# Saju Bridge — Relationship / Spouse T8 Source-Bound Promotion Authority Review

Issue: #1681

Watchtower-Track: saju-bridge

Depends on: #1651 / PR #1652

## Verdict

The source-bound runtime changes the promotion frontier materially, but it does not authorize promotion.

```text
sourceReferenceRegistered = true
sourceTierAuthorized       = true
promotionProvenanceReady   = true

reviewerAuthorityReady     = false
stagingEligibility         = false
productionPromotionReady   = false

G2A ADMITTED = false
Production   = HOLD
```

## What is now closed

The source-registration gap is closed for the source-bound research runtime.

The runtime registry contains exactly the reviewed source identities, methodology source IDs resolve, and both selector rules resolve their Whisper `direct_basis` source reference.

The governed Spouse T8 Production source-tier allow-list is:

```text
primary
scholarly_secondary
cross_reference
```

The registered tiers are:

```text
Whisper       = cross_reference
Lee Youngeun  = scholarly_secondary
```

Therefore the source-tier classification gate is satisfied without changing either tier.

## What remains open

### 1. Review attestation

The source-bound registry contains:

```text
reviewAttestations = []
```

No reviewer identity, review decision, timestamp, subject-bound content hash, or attestation may be invented by Bridge.

### 2. Reviewer trust

The repository has generic ReviewerTrustContext infrastructure, but this source-bound runtime does not contain or establish a concrete Spouse-bound active trust grant pinned to the exact attestation hash.

Generic infrastructure and test fixtures are not authority.

### 3. Rule quality

Both rules remain:

```text
reviewerStatus    = unreviewed
provenanceQuality = unknown
testCoverage      = regression_suite
```

Source registration does not automatically upgrade `provenanceQuality` or `reviewerStatus`.

Those are separate governed decisions.

### 4. Lifecycle

The source-bound bundle remains:

```text
methodology.status = research
rule.status        = research
pack.status        = research
```

No lifecycle transition is authorized by source binding.

## Current blocker set

```text
NO_SPOUSE_BOUND_REVIEW_ATTESTATION
NO_SPOUSE_BOUND_REVIEWER_TRUST_CONTEXT
NO_ACTIVE_TRUST_PINNED_REVIEWER_GRANT
NO_TRUST_PINNED_ATTESTATION_HASH
METHODOLOGY_LIFECYCLE_IS_RESEARCH
RULE_LIFECYCLE_IS_RESEARCH
RULE_QUALITY_IS_NOT_STAGING_READY
PACK_AND_RULE_LIFECYCLE_NOT_PRODUCTION
RULE_QUALITY_IS_NOT_PRODUCTION_READY
```

## Boundary

The following implication is explicitly invalid:

```text
source registered
+ source tiers allowed
= Production ready
```

The valid state is:

```text
source registered
+ source tiers allowed
+ no trusted review authority
+ research lifecycle
+ unreviewed / unknown rule quality
= Production HOLD
```

No consumer narrative, compatibility consumer, Official Reading authority, G2A ADMITTED state, or Production admission is created.

## Next action

The next authority-bearing step requires **real external review material**, not another synthetic Bridge assertion.

Required order:

1. obtain a real Spouse-bound review attestation for the exact content-addressed source-bound methodology/rules;
2. obtain or bind a repository-authorized ReviewerTrustContext whose active grant permits the required review level and pins the exact attestation content hash;
3. only after that, separately review whether `reviewerStatus`, `provenanceQuality`, and lifecycle may change;
4. perform a fresh Bridge admission before any G2A ADMITTED handoff or Production promotion.

Until those inputs exist, Bridge must not fabricate them.

Production remains HOLD.
