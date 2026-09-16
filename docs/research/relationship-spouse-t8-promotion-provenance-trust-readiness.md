# Relationship / Spouse T8 Promotion Provenance & Trust-Pinned Review Authority Readiness

Issue: #696  
Status class: research-only promotion-provenance / review-authority audit  
Fresh implementation base: `a7373b844438d70d670ba360e152e212434b0f89`

## 1. Question

#650 / PR #676 registered an isolated Relationship / Spouse T8 research producer. #681 / PR #683 then established that the current bundle is not staging- or Production-promotion ready.

This frontier asks a narrower governance question before any lifecycle mutation:

```text
Does the current Spouse T8 bundle have repository-authorized runtime source provenance
and concrete externally authorized, trust-pinned review authority?
```

It does not register sources, assign a source tier, create a reviewer identity, mint a ReviewerTrustGrant, create a ReviewAttestation, promote lifecycle state, or activate any consumer.

## 2. Exact current bundle

```text
packId = relationship-spouse-t8-runtime-admission
claimType = relationship.spouse.role_neutral_spouse_star_marker
runtimeScope = isolated_research_only
methodology.status = research
methodology.sourceIds = []
rule.status = research
rule.sourceRefs = []
registry.sources = []
registry.reviewAttestations = []
spouseT8ProducerReady = true
productionPromotionReady = false
Production = HOLD
```

The live registry is therefore the controlling source for promotion provenance. Historical research prose is not silently converted into `SourceReference` objects.

## 3. Research evidence versus runtime source authority

The upstream Relationship / Spouse research authority is closed and includes the admitted Whisper direct-body evidence path. The inherited research evidence identifier retained by this audit is:

```text
4srcLx2Fq2o
```

The repository's upstream issues describe the merged Whisper direct-body evidence as part of the five-of-five research authority. That establishes `researchEvidencePresent=true` for this frontier.

It does **not** establish any of the following in the current runtime bundle:

```text
methodology.sourceIds != []
rule.sourceRefs != []
registry.sources != []
SourceReference.provenanceTier authority
```

Accordingly:

```text
researchEvidencePresent = true
sourceReferenceRegistered = false
sourceTierAuthorized = false
promotionProvenanceReady = false
```

No source tier is guessed from the source's research role. In particular, research evidence is not automatically labelled `primary`, `scholarly_secondary`, or `cross_reference` for runtime promotion.

## 4. Actual reviewer-trust contract

`src/interpretation/reviewer-trust.ts` provides generic trust infrastructure:

```text
ReviewerTrustContext
  -> policyId
  -> version
  -> grants[]

ReviewerTrustGrant
  -> reviewerId
  -> allowedReviewLevels[]
  -> trustedAttestationContentHashes[]
  -> status = active | revoked
```

An active grant must pin at least one lowercase SHA-256 attestation content hash. `reviewerTrustsAttestation(...)` accepts an attestation only when the reviewer has an active grant, the attestation review level is allowed, and the exact deterministic content hash of that attestation is pinned.

`src/interpretation/execution-plan.ts` then requires promoted packs to receive reviewer trust context externally. For review authorization:

```text
staging    -> latest trusted domain approval, otherwise latest trusted internal approval
Production -> latest trusted domain approval only
```

In both cases the governing attestation must have `decision = approved`.

The runtime contract has no synthetic `DOMAIN_APPROVED` flag and no `productionAllowed=true` reviewer property. Production authority is the result of the actual composite contract above.

## 5. Concrete Spouse T8 authority audit

The repository contains generic reviewer-trust infrastructure and may contain authority objects for unrelated bundles. Those objects are not automatically Spouse T8 authority.

For the current Spouse T8 bundle specifically:

```text
registry.reviewAttestations = []
no ReviewerTrustContext is bound to the admitted bundle
#681 readiness review supplies no concrete trust context
tested/example/fixture reviewer objects are not authority
```

Therefore:

```text
trustedReviewerGrantPresent = false
trustPinnedAttestationPresent = false
domainApprovedReviewPresent = false
trustPinnedReviewAuthorityReady = false
```

This conclusion is bundle-specific. It does not claim that reviewer-trust infrastructure or concrete authority for every other interpretation bundle is absent repository-wide.

## 6. Source-tier and review gates

The current execution-plan contract allows these source provenance tiers for Production source authorization:

```text
primary
scholarly_secondary
cross_reference
```

That allow-list does not assign a tier to an unregistered source. The current Spouse T8 registry has zero sources, so source-tier authorization is absent.

The promoted-pack review contract is similarly fail-closed: an unbound reviewer, a test fixture, an unpinned attestation, an unapproved attestation, or a non-domain Production attestation cannot satisfy the gate.

## 7. Readiness verdict

```text
researchEvidencePresent = true
sourceReferenceRegistered = false
sourceTierAuthorized = false
trustedReviewerGrantPresent = false
trustPinnedAttestationPresent = false
domainApprovedReviewPresent = false
promotionProvenanceReady = false
trustPinnedReviewAuthorityReady = false
stagingEligibility = false
productionPromotionReady = false
Production = HOLD
```

The controlling distinction is:

```text
research authority
!= runtime SourceReference registration
!= source-tier authority
!= reviewer trust grant authority
!= trust-pinned attestation authority
!= staging eligibility
!= Production promotion readiness
```

## 8. What would be required before a future promotion review

A later governance frontier may re-evaluate readiness only after the repository has legitimate authority for all required inputs, including:

- explicit runtime `SourceReference` registration for the actual Spouse T8 methodology/rules;
- an authorized provenance tier for each registered source, established by repository governance rather than inferred here;
- a real externally supplied `ReviewerTrustContext` with an active grant for the actual reviewer;
- exact deterministic-hash pinning of the governing `ReviewAttestation`;
- an approved internal/domain attestation for staging and an approved domain attestation for Production;
- the existing lifecycle and rule-quality gates independently satisfied.

This document does not create any of those objects.

## 9. Non-activation boundary

This frontier preserves:

```text
consumerNarrativeActivated = false
compatibilityConsumerActivated = false
previewDefaultRouteChanged = false
productionBehaviorChanged = false
productionPromotionReady = false
Production = HOLD
```

It also preserves the existing semantic prohibitions: no T5 subtype/slot reconstruction, no generic Relationship T8 relabelling, no native/partner sex or identity routing, no orientation/gender inference, no second-chart compatibility activation, no marriage guarantee, no fertility inference, and no relationship legality/ethics inference.

## 10. Result

The concrete unresolved governance primitive is now recorded without manufacturing authority:

```text
OBTAIN_REPOSITORY_AUTHORIZED_SOURCE_BINDING_AND_EXTERNAL_TRUST_PINNED_REVIEW_AUTHORITY_BEFORE_ANY_LIFECYCLE_PROMOTION
```

Until that authority exists, Spouse T8 remains an isolated research producer and `Production = HOLD`.
