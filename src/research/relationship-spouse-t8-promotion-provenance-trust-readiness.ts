import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_BOUNDARY,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_PACK,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_REGISTRY,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_RULES,
} from './relationship-spouse-t8-runtime-admission.js';
import { buildRelationshipSpouseT8PostAdmissionPromotionReadiness } from './relationship-spouse-t8-post-admission-promotion-readiness-review.js';
import { RELATIONSHIP_SPOUSE_T8_WHISPER_2026_DAY_MASTER_POLARITY_DIRECT_BODY_CANDIDATE } from './relationship-spouse-t8-whisper-2026-day-master-polarity-direct-body-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_PROMOTION_PROVENANCE_TRUST_READINESS_VERSION =
  'myeonghwa-relationship-spouse-t8-promotion-provenance-trust-readiness-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_PROMOTION_PROVENANCE_TRUST_AUDIT_BASE =
  '506f02c1e55fa5e16c77176f220dd75e3caaf40f' as const;

export const RELATIONSHIP_SPOUSE_T8_PROMOTION_PROVENANCE_TRUST_CONTROL_IDS = Object.freeze([
  'RESEARCH_EVIDENCE_DOES_NOT_SELF_REGISTER_SOURCE_REFERENCE',
  'SOURCE_PROVENANCE_TIER_MUST_NOT_BE_INFERRED_FROM_RESEARCH_EVIDENCE',
  'TEST_FIXTURE_REVIEWER_IS_NOT_REPOSITORY_AUTHORITY',
  'REVIEWER_TRUST_GRANT_MUST_BE_EXTERNALLY_AUTHORIZED',
  'TRUST_GRANT_MUST_PIN_EXACT_ATTESTATION_CONTENT_HASH',
  'STAGING_REQUIRES_ACTUAL_TRUSTED_INTERNAL_OR_DOMAIN_REVIEW',
  'PRODUCTION_REQUIRES_ACTUAL_TRUSTED_DOMAIN_APPROVED_REVIEW',
  'CURRENT_SPOUSE_RUNTIME_SOURCES_REMAIN_EMPTY',
  'CURRENT_SPOUSE_RUNTIME_ATTESTATIONS_REMAIN_EMPTY',
  'CURRENT_SPOUSE_LIFECYCLE_REMAINS_RESEARCH',
  'CONSUMER_AND_DEFAULT_ROUTE_FLAGS_REMAIN_FALSE',
  'PRODUCTION_REMAINS_HOLD',
] as const);

export const RELATIONSHIP_SPOUSE_T8_PROMOTION_PROVENANCE_TRUST_BOUNDARY = Object.freeze({
  researchEvidenceSourceLocator: '4srcLx2Fq2o' as const,
  researchEvidenceRepositoryArtifact:
    'src/research/relationship-spouse-t8-whisper-2026-day-master-polarity-direct-body-evidence.ts' as const,
  researchEvidenceCandidateId:
    RELATIONSHIP_SPOUSE_T8_WHISPER_2026_DAY_MASTER_POLARITY_DIRECT_BODY_CANDIDATE.candidateId,
  researchEvidencePublicUrl:
    RELATIONSHIP_SPOUSE_T8_WHISPER_2026_DAY_MASTER_POLARITY_DIRECT_BODY_CANDIDATE.publicUrl,
  reviewerTrustInfrastructure:
    'src/interpretation/reviewer-trust.ts' as const,
  stagingMinimumReviewLevel: 'internal' as const,
  productionMinimumReviewLevel: 'domain' as const,
  productionEligibleSourceTiers: Object.freeze([
    'primary',
    'scholarly_secondary',
    'cross_reference',
  ] as const),
  domainApprovedLiteralFieldExists: false as const,
  productionAllowedLiteralFieldExists: false as const,
  t5SubtypeReconstructionAuthorized: false as const,
  t5SlotReconstructionAuthorized: false as const,
  genericRelationshipT8RelabellingAuthorized: false as const,
  nativeSexRoutingAuthorized: false as const,
  partnerSexRoutingAuthorized: false as const,
  partnerIdentityInferenceAuthorized: false as const,
  sexualOrientationInferenceAuthorized: false as const,
  genderIdentityInferenceAuthorized: false as const,
  secondChartCompatibilityAuthorized: false as const,
  marriageGuaranteeInferenceAuthorized: false as const,
  fertilityInferenceAuthorized: false as const,
  relationshipLegalityOrEthicsInferenceAuthorized: false as const,
} as const);

export interface RelationshipSpouseT8PromotionProvenanceTrustReadinessReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_PROMOTION_PROVENANCE_TRUST_READINESS_VERSION;
  auditBaseSha: typeof RELATIONSHIP_SPOUSE_T8_PROMOTION_PROVENANCE_TRUST_AUDIT_BASE;
  status:
    | 'PROMOTION_PROVENANCE_AND_TRUST_AUTHORITY_ABSENT_FAIL_CLOSED'
    | 'UPSTREAM_POST_ADMISSION_STATE_INVALID';
  runtimePackId: string;
  runtimeClaimType: string;
  runtimeMethodologyId: string;
  runtimeMethodologyStatus: string;
  runtimePackStatus: string;
  runtimeRuleStatuses: readonly string[];
  runtimeSourceIds: readonly string[];
  runtimeSourceRefs: readonly string[];
  runtimeRegisteredSourceIds: readonly string[];
  runtimeReviewAttestationCount: number;
  researchEvidencePresent: boolean;
  sourceReferenceRegistered: boolean;
  sourceTierAuthorized: boolean;
  trustedReviewerGrantPresent: false;
  trustPinnedAttestationPresent: false;
  domainApprovedReviewPresent: false;
  promotionProvenanceReady: boolean;
  trustPinnedReviewAuthorityReady: boolean;
  stagingEligibility: false;
  productionPromotionReady: false;
  consumerNarrativeActivated: false;
  compatibilityConsumerActivated: false;
  previewDefaultRouteChanged: false;
  productionBehaviorChanged: false;
  productionState: 'HOLD';
  requiredExternalAuthority: readonly string[];
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_PROMOTION_PROVENANCE_TRUST_CONTROL_IDS)[number][];
  controlCount: number;
}

function exactPostAdmissionStateAccepted(): boolean {
  const prior = buildRelationshipSpouseT8PostAdmissionPromotionReadiness();
  const boundary = RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_BOUNDARY;

  return (
    prior.status === 'POST_ADMISSION_PROMOTION_BLOCKED_BY_PROVENANCE_AND_REVIEW_AUTHORITY' &&
    prior.exactIsolatedResearchProducerAccepted === true &&
    prior.sourceProvenanceRegistrationReady === false &&
    prior.reviewAttestationAuthorityPresent === false &&
    prior.stagingPackEligibilityReady === false &&
    prior.productionPromotionReady === false &&
    prior.productionState === 'HOLD' &&
    boundary.runtimeScope === 'isolated_research_only' &&
    boundary.productionPromotionReady === false &&
    boundary.productionState === 'HOLD'
  );
}

export function buildRelationshipSpouseT8PromotionProvenanceTrustReadiness(): RelationshipSpouseT8PromotionProvenanceTrustReadinessReport {
  const accepted = exactPostAdmissionStateAccepted();
  const methodology = RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_METHODOLOGY;
  const pack = RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_PACK;
  const rules = RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_RULES;
  const registry = RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_REGISTRY;
  const boundary = RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_BOUNDARY;
  const candidate = RELATIONSHIP_SPOUSE_T8_WHISPER_2026_DAY_MASTER_POLARITY_DIRECT_BODY_CANDIDATE;

  const runtimeSourceIds = Object.freeze([...methodology.sourceIds]);
  const runtimeSourceRefs = Object.freeze(rules.flatMap((rule) => [...rule.sourceRefs]));
  const runtimeRegisteredSourceIds = Object.freeze(registry.sources.map((source) => source.sourceId));
  const researchEvidencePresent =
    candidate.directBodyAcquisition.completeDirectHtmlBodyAcquired === true &&
    candidate.directBodyEvidence.dayMasterPolaritySelectorExplicit === true &&
    candidate.directBodyEvidence.natalFactsOnlySelector === true;
  const sourceReferenceRegistered =
    runtimeSourceIds.length > 0 &&
    runtimeSourceRefs.length > 0 &&
    runtimeRegisteredSourceIds.length > 0;
  const sourceTierAuthorized =
    sourceReferenceRegistered &&
    registry.sources.every((source) =>
      RELATIONSHIP_SPOUSE_T8_PROMOTION_PROVENANCE_TRUST_BOUNDARY.productionEligibleSourceTiers.includes(
        source.provenanceTier as
          | 'primary'
          | 'scholarly_secondary'
          | 'cross_reference',
      ),
    );
  const trustedReviewerGrantPresent = false as const;
  const trustPinnedAttestationPresent = false as const;
  const domainApprovedReviewPresent = false as const;
  const promotionProvenanceReady = sourceReferenceRegistered && sourceTierAuthorized;
  const trustPinnedReviewAuthorityReady =
    trustedReviewerGrantPresent && trustPinnedAttestationPresent && domainApprovedReviewPresent;
  const stagingEligibility = false as const;
  const productionPromotionReady = false as const;

  const requiredExternalAuthority = Object.freeze([
    'REGISTER_AUTHORIZED_SOURCE_REFERENCE_FOR_CURRENT_SPOUSE_EVIDENCE',
    'AUTHORIZE_SOURCE_PROVENANCE_TIER_WITHOUT_INFERENCE',
    'SUPPLY_REAL_REVIEW_ATTESTATION',
    'SUPPLY_ACTIVE_REVIEWER_TRUST_GRANT_PINNING_EXACT_ATTESTATION_HASH',
    'REQUIRE_DOMAIN_APPROVED_TRUSTED_REVIEW_FOR_PRODUCTION',
  ] as const);

  const status = accepted
    ? ('PROMOTION_PROVENANCE_AND_TRUST_AUTHORITY_ABSENT_FAIL_CLOSED' as const)
    : ('UPSTREAM_POST_ADMISSION_STATE_INVALID' as const);

  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_PROMOTION_PROVENANCE_TRUST_READINESS_VERSION,
    auditBaseSha: RELATIONSHIP_SPOUSE_T8_PROMOTION_PROVENANCE_TRUST_AUDIT_BASE,
    status,
    runtimePackId: pack.packId,
    runtimeClaimType: RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_RULES[0].output.claimType,
    runtimeMethodologyId: methodology.methodologyId,
    runtimeMethodologyStatus: methodology.status,
    runtimePackStatus: pack.status,
    runtimeRuleStatuses: Object.freeze(rules.map((rule) => rule.status)),
    runtimeSourceIds,
    runtimeSourceRefs,
    runtimeRegisteredSourceIds,
    runtimeReviewAttestationCount: registry.reviewAttestations.length,
    researchEvidencePresent,
    sourceReferenceRegistered,
    sourceTierAuthorized,
    trustedReviewerGrantPresent,
    trustPinnedAttestationPresent,
    domainApprovedReviewPresent,
    promotionProvenanceReady,
    trustPinnedReviewAuthorityReady,
    stagingEligibility,
    productionPromotionReady,
    consumerNarrativeActivated: boundary.consumerNarrativeActivated,
    compatibilityConsumerActivated: boundary.compatibilityConsumerActivated,
    previewDefaultRouteChanged: boundary.previewDefaultRouteChanged,
    productionBehaviorChanged: boundary.productionBehaviorChanged,
    productionState: 'HOLD' as const,
    requiredExternalAuthority,
    controlIds: RELATIONSHIP_SPOUSE_T8_PROMOTION_PROVENANCE_TRUST_CONTROL_IDS,
  };

  return Object.freeze({
    evidenceId: deterministicContentHash(material),
    ...material,
    controlCount: material.controlIds.length,
  });
}
