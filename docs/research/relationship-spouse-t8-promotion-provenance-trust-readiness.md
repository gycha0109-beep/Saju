# Relationship / Spouse T8 — Promotion Provenance & Trust-Pinned Review Authority Readiness

Issue: #694

Fresh authority-audit base:

```text
506f02c1e55fa5e16c77176f220dd75e3caaf40f
```

## Decision

```text
PROMOTION_PROVENANCE_AND_TRUST_AUTHORITY_ABSENT_FAIL_CLOSED

researchEvidencePresent=true
sourceReferenceRegistered=false
sourceTierAuthorized=false
trustedReviewerGrantPresent=false
trustPinnedAttestationPresent=false
domainApprovedReviewPresent=false
promotionProvenanceReady=false
trustPinnedReviewAuthorityReady=false
stagingEligibility=false
productionPromotionReady=false
Production=HOLD
```

This artifact records the current authority boundary only. It does not promote methodology, rules, pack lifecycle, consumer paths, or Production behavior.

## Upstream runtime state

The current isolated Spouse T8 runtime bundle remains:

```text
packId=relationship-spouse-t8-runtime-admission
claimType=relationship.spouse.role_neutral_spouse_star_marker
runtimeScope=isolated_research_only
methodology.status=research
pack.status=research
rule.status=research
methodology.sourceIds=[]
rule.sourceRefs=[]
registry.sources=[]
registry.reviewAttestations=[]
rule.quality.reviewerStatus=unreviewed
consumerNarrativeActivated=false
compatibilityConsumerActivated=false
previewDefaultRouteChanged=false
productionBehaviorChanged=false
productionPromotionReady=false
Production=HOLD
```

#681/#683 already established that producer admission does not imply staging or Production promotion. This frontier resolves what authority is actually present for provenance and trusted review.

## Research evidence is present

The repository contains direct-body research evidence for the current role-neutral Day-Master-polarity spouse selector:

```text
research source locator: 4srcLx2Fq2o
repository artifact:
  src/research/relationship-spouse-t8-whisper-2026-day-master-polarity-direct-body-evidence.ts
candidate:
  WHISPER_2026_DAY_MASTER_POLARITY_ROLE_NEUTRAL_SPOUSE_SELECTOR
publisher: Whisper
publication date: 2026-06-08
```

The evidence directly records the Yang-Day-Master → Indirect Wealth and Yin-Day-Master → Indirect Power selector and explicitly keeps Production promotion false.

That research evidence is **not** a runtime `SourceReference` and does not authorize a provenance tier by itself.

## Source authority audit

Current Spouse T8 runtime state:

```text
methodology.sourceIds=[]
rule.sourceRefs=[]
registry.sources=[]
```

Therefore:

```text
researchEvidencePresent=true
sourceReferenceRegistered=false
sourceTierAuthorized=false
promotionProvenanceReady=false
```

The current Production-eligible source tiers recognized by the interpretation gate are:

```text
primary
scholarly_secondary
cross_reference
```

No tier is assigned here. The existence, recency, directness, or usefulness of research evidence does not authorize the implementation to infer one.

## Reviewer trust authority audit

`src/interpretation/reviewer-trust.ts` defines and validates the trust mechanism:

```text
ReviewerTrustContext
  -> policyId
  -> version
  -> grants[]

ReviewerTrustGrant
  -> reviewerId
  -> allowedReviewLevels[]
  -> trustedAttestationContentHashes[]
  -> status=active|revoked
```

An active grant must carry at least one exact lowercase SHA-256 attestation content hash. `reviewerTrustsAttestation(...)` validates both the allowed review level and the exact deterministic content hash of the attestation.

This module is infrastructure. It does not contain a concrete Spouse T8 reviewer registry or grant. The Spouse T8 runtime admission does not bind an external trust context or a concrete trusted reviewer grant.

Therefore:

```text
trustedReviewerGrantPresent=false
```

A reviewer or grant created only inside a unit test remains a fixture. It cannot become repository authority merely because it satisfies the trust-context type.

## Review attestation authority audit

Current Spouse T8 registry:

```text
reviewAttestations=[]
```

No actual Spouse T8 attestation is therefore available to hash-pin against a real trusted reviewer grant.

The current contract uses review levels:

```text
internal
domain
```

The relevant gate semantics are:

```text
staging minimum review level = internal
Production minimum review level = domain
```

For Production, the meaningful condition is the composite trusted-review gate: an actual `domain` review with `decision='approved'`, from an authorized active reviewer grant, with the exact attestation content hash pinned by that grant.

There is no literal current authority field named:

```text
DOMAIN_APPROVED
productionAllowed=true
```

Those fields must not be invented. `domainApprovedReviewPresent` in this audit is a semantic readiness label for the real composite contract condition above, not a new runtime schema field.

Current verdict:

```text
trustPinnedAttestationPresent=false
domainApprovedReviewPresent=false
trustPinnedReviewAuthorityReady=false
stagingEligibility=false
productionPromotionReady=false
```

## Required external authority before a future promotion review

The repository cannot manufacture these inputs. A later frontier needs actual authority for all applicable gates:

```text
1. REGISTER_AUTHORIZED_SOURCE_REFERENCE_FOR_CURRENT_SPOUSE_EVIDENCE
2. AUTHORIZE_SOURCE_PROVENANCE_TIER_WITHOUT_INFERENCE
3. SUPPLY_REAL_REVIEW_ATTESTATION
4. SUPPLY_ACTIVE_REVIEWER_TRUST_GRANT_PINNING_EXACT_ATTESTATION_HASH
5. REQUIRE_DOMAIN_APPROVED_TRUSTED_REVIEW_FOR_PRODUCTION
```

Only after those authority objects exist should lifecycle readiness be reassessed. This issue does not authorize creating fake reviewer identities, guessed source tiers, synthetic attestations, or self-approved Production state.

## Fail-closed boundary

The following remain unchanged and unauthorized:

```text
methodology/rule/pack lifecycle promotion
Production activation
consumer narrative activation
compatibility consumer activation
preview default route changes
commerce changes
T5 subtype reconstruction
T5 slot reconstruction
generic Relationship T8 relabeling
native-sex routing
partner-sex routing
partner identity inference
sexual-orientation inference
gender-identity inference
second-chart compatibility
marriage guarantee inference
fertility inference
relationship legality/ethics inference
```

Final state:

```text
promotionProvenanceReady=false
trustPinnedReviewAuthorityReady=false
stagingEligibility=false
productionPromotionReady=false
Production=HOLD
```
