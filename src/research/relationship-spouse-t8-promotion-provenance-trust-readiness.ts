import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_BOUNDARY,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_TYPE,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_PACK,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_REGISTRY,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_RULES,
} from './relationship-spouse-t8-runtime-admission.js';
import { buildRelationshipSpouseT8PostAdmissionPromotionReadiness } from './relationship-spouse-t8-post-admission-promotion-readiness-review.js';

export const RELATIONSHIP_SPOUSE_T8_PROMOTION_PROVENANCE_TRUST_READINESS_VERSION =
  'myeonghwa-relationship-spouse-t8-promotion-provenance-trust-readiness-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_RESEARCH_EVIDENCE_SOURCE_IDS = Object.freeze([
  '4srcLx2Fq2o',
] as const);

export const RELATIONSHIP_SPOUSE_T8_PRODUCTION_SOURCE_TIERS = Object.freeze([
  'primary',
  'scholarly_secondary',
  'cross_reference',
] as const);

export const RELATIONSHIP_SPOUSE_T8_PROMOTION_PROVENANCE_TRUST_CONTROL_IDS = Object.freeze([
  'UPSTREAM_RESEARCH_EVIDENCE_DOES_NOT_AUTO_REGISTER_RUNTIME_SOURCE_REFERENCE',
  'EMPTY_RUNTIME_SOURCE_REGISTRY_BLOCKS_SOURCE_TIER_AUTHORITY',
  'EMPTY_RULE_SOURCE_REFS_BLOCK_PROMOTION_PROVENANCE',
  'EMPTY_METHODOLOGY_SOURCE_IDS_BLOCK_PROMOTION_PROVENANCE',
  'GENERIC_REVIEWER_TRUST_INFRASTRUCTURE_IS_NOT_SPOUSE_BOUND_AUTHORITY',
  'TEST_OR_FIXTURE_REVIEWER_CONTEXT_IS_NOT_ACTUAL_AUTHORITY',
  'TRUST_PINNED_ATTESTATION_MUST_BE_EXTERNALLY_AUTHORIZED',
  'DOMAIN_APPROVED_REVIEW_REQUIRES_TRUST_PINNED_DOMAIN_ATTESTATION',
  'CURRENT_BUNDLE_IS_NOT_STAGING_ELIGIBLE',
  'CURRENT_BUNDLE_IS_NOT_PRODUCTION_PROMOTION_READY',
  'CONSUMER_AND_DEFAULT_ROUTES_REMAIN_INACTIVE',
  'PRODUCTION_REMAINS_HOLD',
] as const);

export const RELATIONSHIP_SPOUSE_T8_PROMOTION_PROVENANCE_TRUST_SEMANTIC_BOUNDARY =
  Object.freeze({
    t5SubtypeReconstructionAuthorized: false,
    t5SlotReconstructionAuthorized: false,
    genericRelationshipT8RelabellingAuthorized: false,
    nativeSexInputRequired: false,
    partnerSexInputRequired: false,
    partnerIdentityInputRequired: false,
    sexualOrientationInputRequired: false,
    genderIdentityInputRequired: false,
    secondChartInputRequired: false,
    compatibilityInputRequired: false,
    marriageGuaranteeInferenceAuthorized: false,
    fertilityInferenceAuthorized: false,
    relationshipLegalityOrEthicsInferenceAuthorized: false,
    compatibilityScoringAuthorized: false,
  } as const);

export function buildRelationshipSpouseT8PromotionProvenanceTrustReadiness() {
  const upstream = buildRelationshipSpouseT8PostAdmissionPromotionReadiness();
  const methodology = RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_METHODOLOGY;
  const rules = RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_RULES;
  const registry = RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_REGISTRY;
  const boundary = RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_BOUNDARY;

  const methodologySourceIds = Object.freeze([...methodology.sourceIds]);
  const ruleSourceIds = Object.freeze(
    [...new Set(rules.flatMap((rule) => rule.sourceRefs.map((sourceRef) => sourceRef.sourceId)))].sort(),
  );
  const registeredSourceIds = Object.freeze(registry.sources.map((source) => source.sourceId).sort());
  const sourceTiers = Object.freeze(
    registry.sources.map((source) => source.provenanceTier).sort(),
  );
  const registeredSourceIdSet = new Set(registeredSourceIds);

  const researchEvidencePresent = true as const;
  const sourceReferenceRegistered =
    methodologySourceIds.length > 0 &&
    ruleSourceIds.length > 0 &&
    [...methodologySourceIds, ...ruleSourceIds].every((sourceId) =>
      registeredSourceIdSet.has(sourceId),
    );
  const sourceTierAuthorized =
    sourceReferenceRegistered &&
    registry.sources.length > 0 &&
    registry.sources.every((source) =>
      RELATIONSHIP_SPOUSE_T8_PRODUCTION_SOURCE_TIERS.includes(source.provenanceTier),
    );

  // No ReviewerTrustContext is bound to the admitted Spouse T8 bundle or its #681 readiness review.
  // Generic reviewer-trust helpers and test fixtures are infrastructure, not concrete authority.
  const trustedReviewerGrantCount = 0 as const;
  const trustedReviewerGrantPresent = false as const;
  const trustPinnedAttestationPresent = false as const;
  const domainApprovedReviewPresent = false as const;

  const promotionProvenanceReady =
    researchEvidencePresent && sourceReferenceRegistered && sourceTierAuthorized;
  const trustPinnedReviewAuthorityReady =
    trustedReviewerGrantPresent && trustPinnedAttestationPresent && domainApprovedReviewPresent;
  const stagingEligibility =
    upstream.stagingPackEligibilityReady &&
    promotionProvenanceReady &&
    trustPinnedReviewAuthorityReady;
  const productionPromotionReady = false as const;

  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_PROMOTION_PROVENANCE_TRUST_READINESS_VERSION,
    issue: '#696' as const,
    auditBaseSha: 'a7373b844438d70d670ba360e152e212434b0f89' as const,
    status: 'PROMOTION_PROVENANCE_AND_TRUST_AUTHORITY_NOT_ESTABLISHED' as const,
    bundle: {
      packId: RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_PACK.packId,
      claimType: RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_TYPE,
      runtimeScope: boundary.runtimeScope,
      methodologyLifecycle: methodology.status,
      ruleLifecycles: Object.freeze(rules.map((rule) => rule.status)),
      packLifecycle: RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_PACK.status,
    },
    researchProvenance: {
      researchEvidencePresent,
      evidenceSourceIds: RELATIONSHIP_SPOUSE_T8_RESEARCH_EVIDENCE_SOURCE_IDS,
      evidenceAuthorityScope: 'research_only' as const,
      upstreamResearchAuthorityClosed: upstream.authorityAdmissionReady,
      runtimePromotionAuthorityImplied: false as const,
    },
    runtimeSourceAuthority: {
      methodologySourceIds,
      ruleSourceIds,
      registeredSourceIds,
      sourceTiers,
      sourceReferenceRegistered,
      sourceTierAuthorized,
      sourceAuthorityPresent: sourceReferenceRegistered && sourceTierAuthorized,
    },
    runtimeReviewerAuthority: {
      reviewAttestationCount: registry.reviewAttestations.length,
      trustedReviewerGrantCount,
      trustedReviewerGrantPresent,
      trustPinnedAttestationPresent,
      domainApprovedReviewPresent,
      reviewerAuthorityPresent: trustPinnedReviewAuthorityReady,
    },
    runtimeContract: {
      genericReviewerTrustInfrastructurePresent: true as const,
      promotedPackRequiresExternallySuppliedReviewerTrustContext: true as const,
      activeReviewerGrantRequiresPinnedAttestationHash: true as const,
      stagingGoverningReviewLevels: Object.freeze(['domain', 'internal'] as const),
      productionGoverningReviewLevel: 'domain' as const,
      approvedDecisionRequired: true as const,
      productionSourceTiers: RELATIONSHIP_SPOUSE_T8_PRODUCTION_SOURCE_TIERS,
      syntheticDomainApprovedFieldExists: false as const,
      syntheticProductionAllowedFieldExists: false as const,
    },
    authorityAudit: {
      genericAuthorityInfrastructureMayExistForOtherBundles: true as const,
      spouseBoundSourceAuthorityPresent: sourceReferenceRegistered && sourceTierAuthorized,
      spouseBoundReviewerTrustContextPresent: false as const,
      spouseBoundReviewerTrustGrantPresent: trustedReviewerGrantPresent,
      spouseBoundReviewAttestationPresent: registry.reviewAttestations.length > 0,
      testsFixturesMocksExamplesDocsCountAsAuthority: false as const,
    },
    readiness: {
      promotionProvenanceReady,
      trustPinnedReviewAuthorityReady,
      stagingEligibility,
      productionPromotionReady,
      productionState: 'HOLD' as const,
    },
    guardrails: {
      consumerNarrativeActivated: boundary.consumerNarrativeActivated,
      compatibilityConsumerActivated: boundary.compatibilityConsumerActivated,
      previewDefaultRouteChanged: boundary.previewDefaultRouteChanged,
      productionBehaviorChanged: boundary.productionBehaviorChanged,
      productionPromotionReady: boundary.productionPromotionReady,
    },
    semanticBoundary: RELATIONSHIP_SPOUSE_T8_PROMOTION_PROVENANCE_TRUST_SEMANTIC_BOUNDARY,
    controlIds: RELATIONSHIP_SPOUSE_T8_PROMOTION_PROVENANCE_TRUST_CONTROL_IDS,
    recommendedNextAction:
      'OBTAIN_REPOSITORY_AUTHORIZED_SOURCE_BINDING_AND_EXTERNAL_TRUST_PINNED_REVIEW_AUTHORITY_BEFORE_ANY_LIFECYCLE_PROMOTION' as const,
  };

  return Object.freeze({
    evidenceId: deterministicContentHash(material),
    ...material,
    controlCount: material.controlIds.length,
  });
}
