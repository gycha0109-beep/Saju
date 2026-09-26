import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { RELATIONSHIP_SPOUSE_T8_PRODUCTION_SOURCE_TIERS } from './relationship-spouse-t8-promotion-provenance-trust-readiness.js';
import {
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_BOUNDARY,
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_PACK,
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY,
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_RULES,
} from './relationship-spouse-t8-source-bound-runtime.js';

export const RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_PROMOTION_REVIEW_VERSION =
  'myeonghwa-relationship-spouse-t8-source-bound-promotion-review-v1' as const;

const STAGING_METHODOLOGY_STATUSES = new Set<string>(['reviewed', 'active']);
const STAGING_RULE_STATUSES = new Set<string>(['reviewed', 'active']);
const STAGING_REVIEWER_STATUSES = new Set<string>([
  'internal_reviewed',
  'domain_reviewed',
]);
const STAGING_PROVENANCE = new Set<string>([
  'primary_supported',
  'multi_source_supported',
  'secondary_only',
  'single_practitioner',
]);
const PRODUCTION_PROVENANCE = new Set<string>([
  'primary_supported',
  'multi_source_supported',
]);

export const RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_PROMOTION_CONTROL_IDS = Object.freeze([
  'SOURCE_REGISTRATION_AND_SOURCE_TIER_ELIGIBILITY_ARE_SEPARATE_GATES',
  'SOURCE_BOUND_RUNTIME_HAS_REGISTERED_METHODOLOGY_AND_RULE_SOURCES',
  'CROSS_REFERENCE_IS_ALLOWED_BY_THE_GOVERNED_SPOUSE_T8_SOURCE_TIER_POLICY',
  'SOURCE_TIER_ELIGIBILITY_DOES_NOT_IMPLY_RULE_PROVENANCE_QUALITY_PROMOTION',
  'UNKNOWN_RULE_PROVENANCE_QUALITY_REMAINS_UNCHANGED',
  'UNREVIEWED_RULE_STATUS_REMAINS_UNCHANGED',
  'EMPTY_REVIEW_ATTESTATIONS_BLOCK_REVIEW_AUTHORITY',
  'GENERIC_REVIEWER_TRUST_INFRASTRUCTURE_IS_NOT_SPOUSE_BOUND_AUTHORITY',
  'REVIEWER_ID_DECISION_TIMESTAMP_ATTESTATION_HASH_AND_TRUST_GRANT_MUST_NOT_BE_FABRICATED',
  'RESEARCH_LIFECYCLE_BLOCKS_STAGING_AND_PRODUCTION',
  'SOURCE_AUTHORITY_DOES_NOT_IMPLY_G2A_ADMITTED',
  'SOURCE_AUTHORITY_DOES_NOT_ACTIVATE_CONSUMERS_OR_OFFICIAL_READING',
  'STAGING_REMAINS_BLOCKED',
  'PRODUCTION_PROMOTION_REMAINS_BLOCKED',
  'PRODUCTION_REMAINS_HOLD',
] as const);

export function buildRelationshipSpouseT8SourceBoundPromotionReview() {
  const methodology = RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_METHODOLOGY;
  const rules = RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_RULES;
  const registry = RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY;
  const pack = RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_PACK;
  const boundary = RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_BOUNDARY;

  const registeredSourceIds = Object.freeze(registry.sources.map((source) => source.sourceId).sort());
  const registeredSourceIdSet = new Set<string>(registeredSourceIds);
  const methodologySourceIds = Object.freeze([...methodology.sourceIds].sort());
  const ruleSourceIds = Object.freeze(
    [...new Set(rules.flatMap((rule) => rule.sourceRefs.map((sourceRef) => sourceRef.sourceId)))].sort(),
  );
  const productionSourceTierSet = new Set<string>(RELATIONSHIP_SPOUSE_T8_PRODUCTION_SOURCE_TIERS);

  const sourceReferenceRegistered =
    registeredSourceIds.length > 0 &&
    methodologySourceIds.length > 0 &&
    ruleSourceIds.length > 0 &&
    [...methodologySourceIds, ...ruleSourceIds].every((sourceId) =>
      registeredSourceIdSet.has(sourceId),
    );

  const sourceTierAuthorized =
    sourceReferenceRegistered &&
    registry.sources.every((source) => productionSourceTierSet.has(source.provenanceTier));

  const reviewAttestationPresent = registry.reviewAttestations.length > 0;
  const spouseBoundReviewerTrustContextPresent = false as const;
  const trustedReviewerGrantPresent = false as const;
  const trustPinnedAttestationPresent = false as const;
  const reviewerAuthorityReady =
    reviewAttestationPresent &&
    spouseBoundReviewerTrustContextPresent &&
    trustedReviewerGrantPresent &&
    trustPinnedAttestationPresent;

  const stagingMethodologyLifecycleReady = STAGING_METHODOLOGY_STATUSES.has(methodology.status);
  const stagingRuleLifecycleReady = rules.every((rule) => STAGING_RULE_STATUSES.has(rule.status));
  const stagingRuleQualityReady = rules.every(
    (rule) =>
      STAGING_REVIEWER_STATUSES.has(rule.quality.reviewerStatus) &&
      STAGING_PROVENANCE.has(rule.quality.provenanceQuality),
  );
  const productionLifecycleReady =
    String(methodology.status) === 'active' &&
    rules.every((rule) => String(rule.status) === 'active') &&
    String(pack.status) === 'production';
  const productionRuleQualityReady = rules.every(
    (rule) =>
      String(rule.quality.reviewerStatus) === 'domain_reviewed' &&
      PRODUCTION_PROVENANCE.has(rule.quality.provenanceQuality),
  );

  const promotionProvenanceReady = sourceReferenceRegistered && sourceTierAuthorized;
  const stagingEligibility =
    promotionProvenanceReady &&
    reviewerAuthorityReady &&
    stagingMethodologyLifecycleReady &&
    stagingRuleLifecycleReady &&
    stagingRuleQualityReady;
  const productionPromotionReady =
    stagingEligibility &&
    productionLifecycleReady &&
    productionRuleQualityReady;

  const blockers = Object.freeze([
    ...(!reviewAttestationPresent ? ['NO_SPOUSE_BOUND_REVIEW_ATTESTATION'] : []),
    ...(!spouseBoundReviewerTrustContextPresent
      ? ['NO_SPOUSE_BOUND_REVIEWER_TRUST_CONTEXT']
      : []),
    ...(!trustedReviewerGrantPresent ? ['NO_ACTIVE_TRUST_PINNED_REVIEWER_GRANT'] : []),
    ...(!trustPinnedAttestationPresent ? ['NO_TRUST_PINNED_ATTESTATION_HASH'] : []),
    ...(!stagingMethodologyLifecycleReady ? ['METHODOLOGY_LIFECYCLE_IS_RESEARCH'] : []),
    ...(!stagingRuleLifecycleReady ? ['RULE_LIFECYCLE_IS_RESEARCH'] : []),
    ...(!stagingRuleQualityReady ? ['RULE_QUALITY_IS_NOT_STAGING_READY'] : []),
    ...(!productionLifecycleReady ? ['PACK_AND_RULE_LIFECYCLE_NOT_PRODUCTION'] : []),
    ...(!productionRuleQualityReady ? ['RULE_QUALITY_IS_NOT_PRODUCTION_READY'] : []),
  ]);

  const material = Object.freeze({
    reviewVersion: RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_PROMOTION_REVIEW_VERSION,
    issue: '#1681' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    upstreamRuntimeVersion: boundary.sourceBoundRuntimeVersion,
    sourceAuthority: Object.freeze({
      sourceReferenceRegistered,
      sourceTierAuthorized,
      promotionProvenanceReady,
      methodologySourceIds,
      ruleSourceIds,
      registeredSourceIds,
      sourceTiers: Object.freeze(registry.sources.map((source) => source.provenanceTier).sort()),
      productionSourceTiers: RELATIONSHIP_SPOUSE_T8_PRODUCTION_SOURCE_TIERS,
    }),
    reviewerAuthority: Object.freeze({
      reviewAttestationCount: registry.reviewAttestations.length,
      reviewAttestationPresent,
      spouseBoundReviewerTrustContextPresent,
      trustedReviewerGrantPresent,
      trustPinnedAttestationPresent,
      reviewerAuthorityReady,
    }),
    lifecycleAndQuality: Object.freeze({
      methodologyStatus: methodology.status,
      ruleStatuses: Object.freeze(rules.map((rule) => rule.status)),
      packStatus: pack.status,
      ruleReviewerStatuses: Object.freeze(rules.map((rule) => rule.quality.reviewerStatus)),
      ruleProvenanceQualities: Object.freeze(
        rules.map((rule) => rule.quality.provenanceQuality),
      ),
      stagingMethodologyLifecycleReady,
      stagingRuleLifecycleReady,
      stagingRuleQualityReady,
      productionLifecycleReady,
      productionRuleQualityReady,
    }),
    readiness: Object.freeze({
      stagingEligibility,
      productionPromotionReady,
      g2aAdmitted: false as const,
      consumerNarrativeActivated: false as const,
      compatibilityConsumerActivated: false as const,
      officialReadingAuthorityAuthorized: false as const,
      productionAdmissionAuthorized: false as const,
      productionState: 'HOLD' as const,
    }),
    blockers,
    authorityBoundary: Object.freeze({
      sourceTierInflationAuthorized: false as const,
      ruleQualityAutoPromotionAuthorized: false as const,
      reviewerIdentityFabricationAuthorized: false as const,
      reviewAttestationFabricationAuthorized: false as const,
      reviewerTrustGrantFabricationAuthorized: false as const,
      lifecycleAutoPromotionAuthorized: false as const,
      semanticExpansionAuthorized: false as const,
    }),
    controlIds: RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_PROMOTION_CONTROL_IDS,
    recommendedNextAction:
      'OBTAIN_REAL_SPOUSE_BOUND_REVIEW_ATTESTATION_AND_TRUST_PINNED_REVIEW_AUTHORITY_THEN_REVIEW_RULE_QUALITY_AND_LIFECYCLE_SEPARATELY' as const,
  });

  return Object.freeze({
    reviewId: deterministicContentHash(material),
    ...material,
    controlCount: material.controlIds.length,
  });
}
