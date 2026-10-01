# Relationship / Spouse T8 — External Human-Domain Review Handoff Packet v1

Issue: #1930  
Track: `saju-bridge`

## Purpose

This document defines the operator-facing handoff packet for the exact
Spouse T8 Day-Branch spouse-palace 2.0.0 SA-5L request.

The packet exists only to make real external human/domain review practical and
exact-bound.

It does **not** create review authority.

## Authority boundary

The packet builder:

```text
buildRelationshipSpouseT8DayBranchPalaceExternalReviewHandoffPacket()
```

may expose:

- the exact current SA-5L `requestId` / `requestRef`
- the exact staging registry snapshot and pack ref
- the exact methodology subject ref
- the exact rule subject ref
- the required domain review level and approved decision
- the exact allowed `position_only` narrative proposition
- the frozen prohibited-extension list
- the requirements that a separately governed ReviewerTrustContext must satisfy
- the exact SA-5L intake validator and next dispositions

It may not create:

```text
ReviewAttestation
ReviewerTrustContext
ReviewerTrustGrant
narrative-materiality approval
reviewerStatus=domain_reviewed
materialForNarrative=true
Preview authority
Official Reading authority
public semantic authority
Production authority
```

Production remains `HOLD`.

## Exact subjects

The packet is built from the current SA-5L request rather than duplicating
content hashes in this document.

At build time it binds exactly two review subjects:

```text
1. current staging methodology ContentAddressedVersionedRef
2. current staging rule ContentAddressedVersionedRef
```

Each requires:

```text
reviewLevel = domain
decision = approved
```

The exact refs are emitted by the packet. A reviewer or operator must not
replace them with a later, earlier, or semantically similar ref.

## Reviewer-authored attestation form

The packet deliberately leaves reviewer-authored fields unset:

```json
{
  "subjectType": "methodology | rule",
  "subjectRef": "<EXACT_PACKET_REF>",
  "requiredReviewLevel": "domain",
  "requiredDecision": "approved",
  "reviewerSupplied": {
    "attestationId": null,
    "reviewerId": null,
    "reviewedAt": null,
    "decision": null,
    "notes": null
  }
}
```

A real external reviewer must supply these fields outside the packet builder.

The resulting submission must conform to the repository `ReviewAttestation`
contract:

```text
attestationId = non-empty
subjectType   = exact packet subject type
subjectRef    = exact packet content-addressed ref
reviewLevel   = domain
reviewerId    = non-empty real reviewer identity
reviewedAt    = valid timestamp
decision      = approved
notes         = optional reviewer-authored text
```

The packet builder does not fill or infer any of these values.

## Reviewer trust

A ReviewAttestation is not trusted merely because it is structurally valid.

A separately governed `ReviewerTrustContext` is required.

For each accepted reviewer, the active grant must satisfy:

```text
reviewerId matches the attestation reviewer
allowedReviewLevels includes domain
status = active
trustedAttestationContentHashes includes
  deterministicContentHash(exact attestation)
```

The packet builder explicitly reports:

```text
trustContextGeneratedByPacket = false
trustGrantGeneratedByPacket   = false
```

No trust grant is synthesized from a reviewer name, a passing test, repository
ownership, project-owner approval, or a normal user instruction to continue.

## Separate narrative-materiality decision

Methodology/rule domain review is necessary but is not the narrative-materiality
decision.

A trusted participating domain reviewer must separately decide:

```text
APPROVE_POSITION_ONLY_NARRATIVE_MATERIALITY
```

for exactly:

```json
{
  "position": "day_branch",
  "traditionalRole": "spouse_palace",
  "semanticScope": "position_only"
}
```

The following extensions remain prohibited:

```text
spouse_star_selection
partner_personality
partner_identity
marriage_timing
marriage_outcome
relationship_outcome
favorable_unfavorable_palace_judgment
yongshin_jisin_semantics
second_chart_compatibility
sex_scoped_spouse_role_expansion
```

The packet leaves the decision author fields unset:

```json
{
  "decision": null,
  "reviewerId": null,
  "decidedAt": null,
  "notes": null
}
```

## Intake procedure

The only valid continuation is:

```text
build exact external review handoff packet
  ↓
real external human/domain review of methodology
  ↓
real external human/domain review of rule
  ↓
separately governed ReviewerTrustContext pins exact attestation hashes
  ↓
trusted participating domain reviewer makes exact position_only materiality decision
  ↓
evaluateRelationshipSpouseT8DayBranchPalaceHumanDomainMaterialitySubmission(...)
```

If the SA-5L validator fails:

```text
HOLD_PENDING_OR_REPAIR_EXTERNAL_HUMAN_DOMAIN_SUBMISSION
```

If it passes:

```text
RUN_SA_5M_TRUSTED_HUMAN_DOMAIN_AUTHORITY_MATERIALIZATION_REVIEW
```

A validator PASS still does not itself materialize reviewer authority. SA-5M is
the later review that may decide whether those external inputs can be
materialized.

## Current state after this packet

```text
humanDomainReviewEstablished = false
reviewAttestationCreated = false
reviewerTrustContextCreated = false
reviewerTrustGrantCreated = false
narrativeMaterialityDecisionCreated = false
reviewerStatusPromotionAuthorized = false
materialForNarrativeMutationAuthorized = false
narrativeGenerationAuthorized = false
artifactAssemblyAuthorized = false
deliveryAuthorityAuthorized = false
previewAuthorityAuthorized = false
officialReadingAuthorityAuthorized = false
publicSemanticAuthorityAuthorized = false
productionAuthorityAuthorized = false
production = HOLD
```

Next disposition:

```text
AWAIT_REAL_EXTERNAL_HUMAN_DOMAIN_REVIEW_INPUTS
```
