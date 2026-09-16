import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_BOUNDARY,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_PACK,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_REGISTRY,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_RULES,
} from './relationship-spouse-t8-runtime-admission.js';

export const RELATIONSHIP_SPOUSE_T8_POST_ADMISSION_PROMOTION_READINESS_VERSION =
  'myeonghwa-relationship-spouse-t8-post-admission-promotion-readiness-v1' as const;

const STAGING_METHODOLOGY_STATUSES: ReadonlySet<string> = new Set(['reviewed', 'active']);
const STAGING_RULE_STATUSES: ReadonlySet<string> = new Set(['reviewed', 'active']);
const STAGING_REVIEWER_STATUSES: ReadonlySet<string> = new Set([
  'internal_reviewed',
  'domain_reviewed',
]);
const STAGING_TEST_COVERAGE: ReadonlySet<string> = new Set([
  'unit',
  'fixture_matrix',
  'regression_suite',
]);
const STAGING_PROVENANCE: ReadonlySet<string> = new Set([
  'primary_supported',
  'multi_source_supported',
  'secondary_only',
  'single_practitioner',
]);
const PRODUCTION_TEST_COVERAGE: ReadonlySet<string> = new Set([
  'fixture_matrix',
  'regression_suite',
]);
const PRODUCTION_PROVENANCE: ReadonlySet<string> = new Set([
  'primary_supported',
  'multi_source_supported',
]);
const PRODUCTION_SOURCE_TIERS: ReadonlySet<string> = new Set([
  'primary',
  'scholarly_secondary',
  'cross_reference',
]);

export const RELATIONSHIP_SPOUSE_T8_POST_ADMISSION_PROMOTION_CONTROL_IDS = Object.freeze([
  'EXACT_ISOLATED_RESEARCH_PRODUCER_IS_REQUIRED',
  'RESEARCH_LIFECYCLE_IS_NOT_STAGING_LIFECYCLE',
  'EMPTY_METHODOLOGY_SOURCE_IDS_BLOCK_PROMOTION',
  'EMPTY_RULE_SOURCE_REFS_BLOCK_PROMOTION',
  'UNREVIEWED_RULE_QUALITY_BLOCKS_STAGING_AND_PRODUCTION',
  'TRUST_PINNED_REVIEW_ATTESTATIONS_MUST_NOT_BE_FABRICATED',
  'CURRENT_BUNDLE_IS_NOT_STAGING_ELIGIBLE',
  'CURRENT_BUNDLE_IS_NOT_PRODUCTION_ELIGIBLE',
  'PRODUCER_READINESS_DOES_NOT_IMPLY_CONSUMER_READINESS',
  'PRODUCER_READINESS_DOES_NOT_IMPLY_DEFAULT_ROUTE_READINESS',
  'PRODUCER_READINESS_DOES_NOT_IMPLY_PRODUCTION_PROMOTION',
  'PRODUCTION_REMAINS_HOLD',
] as const);

export const RELATIONSHIP_SPOUSE_T8_POST_ADMISSION_SEMANTIC_BOUNDARY = Object.freeze({
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

export interface RelationshipSpouseT8PostAdmissionPromotionReadinessReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_POST_ADMISSION_PROMOTION_READINESS_VERSION;
  upstreamRuntimeVersion: string;
  status:
    | 'POST_ADMISSION_PROMOTION_BLOCKED_BY_PROVENANCE_AND_REVIEW_AUTHORITY'
    | 'UPSTREAM_ISOLATED_RUNTIME_ADMISSION_INVALID';
  exactIsolatedResearchProducerAccepted: boolean;
  isolatedResearchProducerAvailable: boolean;
  stagingMethodologyLifecycleReady: boolean;
  stagingRuleLifecycleReady: boolean;
  sourceProvenanceRegistrationReady: boolean;
  stagingRuleQualityReady: boolean;
  reviewAttestationAuthorityPresent: boolean;
  reviewerTrustContextAndAttestationsReady: boolean;
  stagingPackEligibilityReady: boolean;
  productionLifecycleReady: boolean;
  productionSourceTierEligibilityReady: boolean;
  productionDomainReviewReady: boolean;
  productionRuleQualityReady: boolean;
  consumerNarrativeReadiness: boolean;
  compatibilityConsumerReadiness: boolean;
  defaultRouteReadiness: boolean;
  authorityAdmissionReady: boolean;
  spouseT8ProducerReady: boolean;
  productionPromotionReady: false;
  productionState: 'HOLD';
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_POST_ADMISSION_PROMOTION_CONTROL_IDS)[number][];
  controlCount: number;
  recommendedNextAction:
    | 'ESTABLISH_PROMOTION_PROVENANCE_AND_TRUST_PINNED_REVIEW_AUTHORITY_BEFORE_ANY_LIFECYCLE_PROMOTION'
    | 'RESTORE_EXACT_ISOLATED_RUNTIME_ADMISSION_STATE';
}

function exactIsolatedResearchProducerAccepted(): boolean {
  const boundary = RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_BOUNDARY;
  const methodology = RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_METHODOLOGY;
  const pack = RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_PACK;
  const rules = RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_RULES;
  const registry = RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_REGISTRY;

  return (
    boundary.authorityAdmissionReady === true &&
    boundary.spouseT8ProducerReady === true &&
    boundary.runtimeScope === 'isolated_research_only' &&
    boundary.consumerNarrativeActivated === false &&
    boundary.compatibilityConsumerActivated === false &&
    boundary.previewDefaultRouteChanged === false &&
    boundary.productionBehaviorChanged === false &&
    boundary.productionPromotionReady === false &&
    boundary.productionState === 'HOLD' &&
    methodology.status === 'research' &&
    methodology.sourceIds.length === 0 &&
    pack.status === 'research' &&
    rules.length === 2 &&
    rules.every(
      (rule) =>
        rule.status === 'research' &&
        rule.sourceRefs.length === 0 &&
        rule.quality.reviewerStatus === 'unreviewed',
    ) &&
    registry.sources.length === 0 &&
    registry.reviewAttestations.length === 0
  );
}

export function buildRelationshipSpouseT8PostAdmissionPromotionReadiness(): RelationshipSpouseT8PostAdmissionPromotionReadinessReport {
  const upstreamAccepted = exactIsolatedResearchProducerAccepted();
  const methodology = RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_METHODOLOGY;
  const rules = RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_RULES;
  const registry = RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_REGISTRY;
  const boundary = RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_BOUNDARY;

  const stagingMethodologyLifecycleReady = STAGING_METHODOLOGY_STATUSES.has(methodology.status);
  const stagingRuleLifecycleReady = rules.every((rule) => STAGING_RULE_STATUSES.has(rule.status));
  const sourceProvenanceRegistrationReady =
    methodology.sourceIds.length > 0 &&
    rules.every((rule) => rule.sourceRefs.length > 0) &&
    registry.sources.length > 0;
  const stagingRuleQualityReady = rules.every(
    (rule) =>
      STAGING_REVIEWER_STATUSES.has(rule.quality.reviewerStatus) &&
      STAGING_TEST_COVERAGE.has(rule.quality.testCoverage) &&
      STAGING_PROVENANCE.has(rule.quality.provenanceQuality),
  );
  const reviewAttestationAuthorityPresent = registry.reviewAttestations.length > 0;
  const reviewerTrustContextAndAttestationsReady = reviewAttestationAuthorityPresent;
  const stagingPackEligibilityReady =
    upstreamAccepted &&
    stagingMethodologyLifecycleReady &&
    stagingRuleLifecycleReady &&
    sourceProvenanceRegistrationReady &&
    stagingRuleQualityReady &&
    reviewerTrustContextAndAttestationsReady;

  const productionLifecycleReady =
    String(methodology.status) === 'active' && rules.every((rule) => String(rule.status) === 'active');
  const productionSourceTierEligibilityReady =
    sourceProvenanceRegistrationReady &&
    registry.sources.length > 0 &&
    registry.sources.every((source) => PRODUCTION_SOURCE_TIERS.has(source.provenanceTier));
  const productionDomainReviewReady =
    reviewAttestationAuthorityPresent &&
    rules.every((rule) => String(rule.quality.reviewerStatus) === 'domain_reviewed');
  const productionRuleQualityReady = rules.every(
    (rule) =>
      String(rule.quality.reviewerStatus) === 'domain_reviewed' &&
      PRODUCTION_TEST_COVERAGE.has(rule.quality.testCoverage) &&
      PRODUCTION_PROVENANCE.has(rule.quality.provenanceQuality),
  );

  const consumerNarrativeReadiness = false;
  const compatibilityConsumerReadiness = false;
  const defaultRouteReadiness = false;
  const productionPromotionReady = false as const;

  const status = upstreamAccepted
    ? ('POST_ADMISSION_PROMOTION_BLOCKED_BY_PROVENANCE_AND_REVIEW_AUTHORITY' as const)
    : ('UPSTREAM_ISOLATED_RUNTIME_ADMISSION_INVALID' as const);
  const recommendedNextAction = upstreamAccepted
    ? ('ESTABLISH_PROMOTION_PROVENANCE_AND_TRUST_PINNED_REVIEW_AUTHORITY_BEFORE_ANY_LIFECYCLE_PROMOTION' as const)
    : ('RESTORE_EXACT_ISOLATED_RUNTIME_ADMISSION_STATE' as const);

  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_POST_ADMISSION_PROMOTION_READINESS_VERSION,
    upstreamRuntimeVersion: methodology.version,
    status,
    exactIsolatedResearchProducerAccepted: upstreamAccepted,
    isolatedResearchProducerAvailable: upstreamAccepted,
    stagingMethodologyLifecycleReady,
    stagingRuleLifecycleReady,
    sourceProvenanceRegistrationReady,
    stagingRuleQualityReady,
    reviewAttestationAuthorityPresent,
    reviewerTrustContextAndAttestationsReady,
    stagingPackEligibilityReady,
    productionLifecycleReady,
    productionSourceTierEligibilityReady,
    productionDomainReviewReady,
    productionRuleQualityReady,
    consumerNarrativeReadiness,
    compatibilityConsumerReadiness,
    defaultRouteReadiness,
    authorityAdmissionReady: boundary.authorityAdmissionReady,
    spouseT8ProducerReady: boundary.spouseT8ProducerReady,
    productionPromotionReady,
    productionState: 'HOLD' as const,
    controlIds: RELATIONSHIP_SPOUSE_T8_POST_ADMISSION_PROMOTION_CONTROL_IDS,
    recommendedNextAction,
  };

  return Object.freeze({
    evidenceId: deterministicContentHash(material),
    ...material,
    controlCount: material.controlIds.length,
  });
}
