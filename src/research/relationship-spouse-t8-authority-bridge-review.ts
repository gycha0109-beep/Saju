import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_BOUNDARY,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_TYPE,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_PACK,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_REGISTRY,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_RULES,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_VERSION,
} from './relationship-spouse-t8-runtime-admission.js';
import { buildRelationshipSpouseT8PostAdmissionPromotionReadiness } from './relationship-spouse-t8-post-admission-promotion-readiness-review.js';
import { buildRelationshipSpouseT8PromotionProvenanceTrustReadiness } from './relationship-spouse-t8-promotion-provenance-trust-readiness.js';

export const RELATIONSHIP_SPOUSE_T8_AUTHORITY_BRIDGE_REVIEW_VERSION =
  'myeonghwa-relationship-spouse-t8-authority-bridge-review-v1' as const;

export type RelationshipSpouseT8BridgeDecision = 'ENGINE_HANDOFF';

const ENGINE_GOVERNANCE_PREREQUISITES = Object.freeze([
  'BIND_THE_ALREADY_GOVERNED_SPOUSE_T8_RESEARCH_EVIDENCE_TO_RUNTIME_SOURCE_REFERENCES_WITHOUT_INVENTING_PROVENANCE',
  'REGISTER_ONLY_REPOSITORY_AUTHORIZED_SOURCE_REFERENCES_AND_VERIFY_THEIR_PROMOTION_ELIGIBLE_SOURCE_TIERS',
  'OBTAIN_REAL_SPOUSE_BOUND_REVIEW_ATTESTATIONS_FOR_THE_EXACT_RUNTIME_SUBJECTS',
  'OBTAIN_INDEPENDENT_TRUSTED_REVIEWER_GRANTS_PINNED_TO_THE_EXACT_CANONICAL_ATTESTATION_HASHES',
  'RUN_SEPARATE_STAGING_AND_PRODUCTION_LIFECYCLE_PROMOTION_REVIEWS_AFTER_PROVENANCE_AND_TRUST_AUTHORITY_EXIST',
] as const);

export function buildRelationshipSpouseT8AuthorityBridgeReview() {
  const postAdmission = buildRelationshipSpouseT8PostAdmissionPromotionReadiness();
  const promotion = buildRelationshipSpouseT8PromotionProvenanceTrustReadiness();
  const boundary = RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_BOUNDARY;
  const methodology = RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_METHODOLOGY;
  const pack = RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_PACK;
  const registry = RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_REGISTRY;
  const rules = RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_RULES;

  const exactGovernedResearchAdmissionState =
    boundary.authorityAdmissionReady === true &&
    boundary.spouseT8ProducerReady === true &&
    boundary.runtimeScope === 'isolated_research_only' &&
    methodology.status === 'research' &&
    pack.status === 'research' &&
    rules.length === 2 &&
    rules.every((rule) => rule.status === 'research') &&
    postAdmission.exactIsolatedResearchProducerAccepted === true &&
    postAdmission.authorityAdmissionReady === true &&
    postAdmission.spouseT8ProducerReady === true;

  const runtimeState = Object.freeze({
    runtimeVersion: RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_VERSION,
    claimType: RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_TYPE,
    methodologyId: methodology.methodologyId,
    methodologyLifecycle: methodology.status,
    methodologySourceIds: Object.freeze([...methodology.sourceIds]),
    packId: pack.packId,
    packLifecycle: pack.status,
    runtimeScope: boundary.runtimeScope,
    ruleCount: rules.length,
    ruleLifecycles: Object.freeze(rules.map((rule) => rule.status)),
    ruleSourceRefCounts: Object.freeze(rules.map((rule) => rule.sourceRefs.length)),
    ruleReviewerStatuses: Object.freeze(rules.map((rule) => rule.quality.reviewerStatus)),
    registeredSourceCount: registry.sources.length,
    registeredReviewAttestationCount: registry.reviewAttestations.length,
    authorityAdmissionReady: boundary.authorityAdmissionReady,
    spouseT8ProducerReady: boundary.spouseT8ProducerReady,
    exactGovernedResearchAdmissionState,
  });

  const governedSemanticBoundary = Object.freeze({
    scope: 'relationship:natal:spouse' as const,
    canonicalSelectorInput: 'derivedFacts.dayMaster.yinYang' as const,
    resolvedYangCorrespondence: 'INDIRECT_WEALTH / 편재 / 偏財' as const,
    resolvedYinCorrespondence: 'INDIRECT_POWER / 편관 / 偏官' as const,
    roleNeutralSpouseStarMarkerOnly: true as const,
    generalRelationshipRelabellingAuthorized: false as const,
    nativeSexInferenceAuthorized: false as const,
    partnerSexInferenceAuthorized: false as const,
    partnerIdentityInferenceAuthorized: false as const,
    sexualOrientationInferenceAuthorized: false as const,
    marriageExistenceOrGuaranteeInferenceAuthorized: false as const,
    fertilityInferenceAuthorized: false as const,
    relationshipLegalityOrEthicsInferenceAuthorized: false as const,
    compatibilityScoringAuthorized: false as const,
    secondChartInferenceAuthorized: false as const,
    annualOrMonthlyExpansionAuthorized: false as const,
  });

  const promotionState = Object.freeze({
    postAdmissionStatus: postAdmission.status,
    sourceProvenanceRegistrationReady: postAdmission.sourceProvenanceRegistrationReady,
    stagingMethodologyLifecycleReady: postAdmission.stagingMethodologyLifecycleReady,
    stagingRuleLifecycleReady: postAdmission.stagingRuleLifecycleReady,
    stagingRuleQualityReady: postAdmission.stagingRuleQualityReady,
    reviewerTrustContextAndAttestationsReady:
      postAdmission.reviewerTrustContextAndAttestationsReady,
    stagingPackEligibilityReady: postAdmission.stagingPackEligibilityReady,
    productionLifecycleReady: postAdmission.productionLifecycleReady,
    productionSourceTierEligibilityReady: postAdmission.productionSourceTierEligibilityReady,
    productionDomainReviewReady: postAdmission.productionDomainReviewReady,
    promotionStatus: promotion.status,
    promotionProvenanceReady: promotion.readiness.promotionProvenanceReady,
    trustPinnedReviewAuthorityReady: promotion.readiness.trustPinnedReviewAuthorityReady,
    stagingEligibility: promotion.readiness.stagingEligibility,
    productionPromotionReady: promotion.readiness.productionPromotionReady,
    productionState: promotion.readiness.productionState,
  });

  const authorityState = Object.freeze({
    researchSemanticAuthorityClosed: exactGovernedResearchAdmissionState,
    researchReturnRequired: false as const,
    runtimeProducerAvailable: boundary.spouseT8ProducerReady,
    runtimeSourceBindingAuthorityEstablished: promotion.runtimeSourceAuthority.sourceAuthorityPresent,
    trustedReviewerAuthorityEstablished:
      promotion.runtimeReviewerAuthority.reviewerAuthorityPresent,
    lifecyclePromotionAuthorized: false as const,
    engineAuthorityPromotionAuthorized: false as const,
    previewExpansionAuthorized: false as const,
    officialReadingAuthorityAuthorized: false as const,
    consumerNarrativeActivationAuthorized: false as const,
    compatibilityConsumerActivationAuthorized: false as const,
    productionAdmissionAuthority: false as const,
    production: 'HOLD' as const,
  });

  const reviewSchema = Object.freeze({
    authorityClasses: Object.freeze([
      'Methodology Authority',
      'Rule Authority',
      'Claim Authority',
      'Composition Authority',
      'Product Authority',
    ] as const),
    scope: 'relationship:natal:spouse' as const,
    requiredInputs: Object.freeze(['derivedFacts.dayMaster'] as const),
    preconditions: Object.freeze([
      'EXACT_FIVE_OF_FIVE_RELATIONSHIP_SPOUSE_T8_RESEARCH_AUTHORITY_STATE_REMAINS_VALID',
      'CANONICAL_DAY_MASTER_POLARITY_IS_RESOLVED',
      'ISOLATED_RESEARCH_RUNTIME_ADMISSION_STATE_REMAINS_VALID',
      'NO_T5_SUBTYPE_RECONSTRUCTION_OR_GENERAL_RELATIONSHIP_RELABELLING',
    ] as const),
    allowedConclusion: Object.freeze([
      'THE_EXISTING_GOVERNED_ROLE_NEUTRAL_SPOUSE_STAR_CORRESPONDENCE_DOES_NOT_REQUIRE_NEW_SOURCE_RESEARCH',
      'THE_ISOLATED_RESEARCH_ONLY_SPOUSE_T8_RUNTIME_PRODUCER_MAY_REMAIN_AVAILABLE',
      'THE_REMAINING_BLOCKER_IS_RUNTIME_PROMOTION_PROVENANCE_REVIEWER_TRUST_AND_LIFECYCLE_GOVERNANCE',
      'ENGINE_HANDOFF_DOES_NOT_ITSELF_PROMOTE_LIFECYCLE_OR_ACTIVATE_ANY_CONSUMER',
    ] as const),
    qualifiers: Object.freeze([
      'THE_ADMITTED_SEMANTIC_IS_ONLY_A_ROLE_NEUTRAL_SPOUSE_STAR_MARKER_FOR_THE_GOVERNED_METHODOLOGY_FAMILY',
      'AUTHORITY_ADMISSION_READY_AND_PRODUCER_READY_DO_NOT_IMPLY_STAGING_OR_PRODUCTION_READINESS',
      'EMPTY_RUNTIME_SOURCE_BINDINGS_AND_UNREVIEWED_RUNTIME_RULES_REMAIN_FAIL_CLOSED_PROMOTION_BLOCKERS',
      'PRODUCTION_REMAINS_HOLD_UNTIL_SEPARATE_PROVENANCE_TRUST_AND_LIFECYCLE_GATES_PASS',
    ] as const),
    exceptions: Object.freeze([
      'IF_THE_EXACT_FIVE_OF_FIVE_RESEARCH_AUTHORITY_OR_ISOLATED_RUNTIME_ADMISSION_STATE_BECOMES_INVALID_THIS_ENGINE_HANDOFF_MUST_BE_REVIEWED_AGAIN',
    ] as const),
    conflictingAuthorities: Object.freeze([] as const),
    schoolDependency: 'PRESERVED_BY_UPSTREAM_GOVERNED_SPOUSE_T8_RESEARCH_AUTHORITY' as const,
    lifecycleState: 'research' as const,
  });

  const decision = Object.freeze({
    disposition: 'ENGINE_HANDOFF' as RelationshipSpouseT8BridgeDecision,
    reason:
      'Relationship / Spouse / Natal T8 already has a closed five-of-five research-authority path and an isolated research-only runtime producer. Returning the governed semantic correspondence to source Research would reopen a closed frontier. The remaining blockers are runtime source binding, trust-pinned reviewer authority, and separate lifecycle-promotion governance. Those blockers must fail closed and are handed to Engine/Governance without implying staging, consumer, Official Reading, or Production authority.',
    rejected: false as const,
    semanticResearchReopenRequired: false as const,
    engineGovernanceWorkRequired: true as const,
    reReviewRequiredAfterEngineGovernance: true as const,
  });

  const material = Object.freeze({
    reviewVersion: RELATIONSHIP_SPOUSE_T8_AUTHORITY_BRIDGE_REVIEW_VERSION,
    issue: '#1613' as const,
    auditBaseSha: 'e79197d3e01341a026fbc6ae4e7c4375d587c7cc' as const,
    upstreamEvidence: Object.freeze({
      postAdmissionEvidenceId: postAdmission.evidenceId,
      promotionProvenanceTrustEvidenceId: promotion.evidenceId,
    }),
    runtimeState,
    governedSemanticBoundary,
    promotionState,
    reviewSchema,
    authorityState,
    decision,
    nextAction: Object.freeze({
      owner: 'ENGINE_GOVERNANCE' as const,
      prerequisites: ENGINE_GOVERNANCE_PREREQUISITES,
    }),
    prohibitedExtensions: Object.freeze([
      'NO_REOPENING_CLOSED_SPOUSE_T8_SEMANTIC_RESEARCH_SOLELY_BECAUSE_RUNTIME_PROMOTION_GOVERNANCE_IS_INCOMPLETE',
      'NO_GENERAL_RELATIONSHIP_NATAL_ANNUAL_OR_MONTHLY_AUTHORITY_RELABELLED_AS_SPOUSE_T8_AUTHORITY',
      'NO_RUNTIME_SOURCE_REFERENCE_OR_PROVENANCE_INVENTION',
      'NO_REVIEWER_IDENTITY_TRUST_GRANT_OR_ATTESTATION_FABRICATION',
      'NO_AUTHORITY_ADMISSION_READY_OR_PRODUCER_READY_AS_STAGING_OR_PRODUCTION_READINESS',
      'NO_LIFECYCLE_PROMOTION_FROM_THIS_BRIDGE_REVIEW',
      'NO_CONSUMER_NARRATIVE_COMPATIBILITY_PREVIEW_DEFAULT_OR_PRODUCTION_ACTIVATION',
      'NO_MARRIAGE_FERTILITY_PARTNER_IDENTITY_PARTNER_SEX_ORIENTATION_LEGALITY_ETHICS_COMPATIBILITY_SECOND_CHART_OR_RELATIONSHIP_OUTCOME_INFERENCE',
      'NO_ANNUAL_OR_MONTHLY_SPOUSE_AUTHORITY_EXPANSION',
      'NO_OFFICIAL_READING_OR_PRODUCTION_ADMISSION_FROM_THIS_REVIEW',
    ] as const),
  });

  return Object.freeze({
    reviewId: deterministicContentHash(material),
    ...material,
  });
}
