import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_EVIDENCE_VERSION,
  RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_RECORD,
  type RelationshipSpouseT8RoleNeutralApplicabilityContractCandidateEvidenceReport,
} from './relationship-spouse-t8-role-neutral-applicability-contract-candidate-evidence.js';
import {
  WANLI_DIRECT_TARGET_PAGE_CONTROL_IDS,
  WANLI_DIRECT_TARGET_PAGE_EVIDENCE_VERSION,
  WANLI_DIRECT_TARGET_PAGE_RECORDS,
  WANLI_DIRECT_TARGET_PAGE_SOURCE_WITNESS,
  type WanliDirectTargetPageEvidenceReport,
} from './wanli-direct-target-page-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_POST_PRIMARY_WITNESS_AUTHORITY_REASSESSMENT_REVIEW_VERSION =
  'myeonghwa-relationship-spouse-t8-post-primary-witness-authority-reassessment-review-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_POST_PRIMARY_WITNESS_AUTHORITY_REASSESSMENT_CONTROL_IDS =
  Object.freeze([
    'POST_PRIMARY_WITNESS_REASSESSMENT_ACCEPTS_ONLY_THE_EXACT_CONTENT_ADDRESSED_DIRECT_WANLI_TARGET_PAGE_EVIDENCE',
    'POST_PRIMARY_WITNESS_REASSESSMENT_ACCEPTS_ONLY_THE_EXACT_CONTENT_ADDRESSED_ROLE_NEUTRAL_APPLICABILITY_CANDIDATE_EVIDENCE',
    'QUALIFYING_PRIMARY_WITNESS_CLOSURE_REMAINS_ESTABLISHED_AFTER_REASSESSMENT',
    'HISTORICAL_DIRECT_PRIMARY_EVIDENCE_DOES_NOT_CREATE_MODERN_NORMATIVE_APPLICABILITY_AUTHORITY',
    'COMMERCIAL_PRACTITIONER_EDITORIAL_METHODOLOGY_REMAINS_INSUFFICIENT_AS_INDEPENDENT_NORMATIVE_PROVENANCE',
    'PARTNER_NEUTRAL_LANGUAGE_AND_NO_IDENTITY_INFERENCE_BOUNDARIES_DO_NOT_DEFINE_AN_EXPLICIT_ROLE_NEUTRAL_NATAL_SPOUSE_STAR_MAPPING',
    'COMPATIBILITY_SCOPED_ROLE_NEUTRAL_CONVENTIONS_ARE_NOT_REUSED_AS_NATAL_AUTHORITY',
    'HISTORICAL_PRIMARY_AND_MODERN_EDITORIAL_EVIDENCE_ARE_NOT_STITCHED_TO_SYNTHESIZE_MISSING_AUTHORITY',
    'INDEPENDENT_NORMATIVE_PROVENANCE_GAP_REMAINS_OPEN',
    'EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_GAP_REMAINS_OPEN',
    'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_GAP_REMAINS_OPEN',
    'RELATIONSHIP_T6_INPUT_GAP_REMAINS_OPEN',
    'EXACTLY_ONE_OF_FIVE_AUTHORITY_GAPS_REMAINS_CLOSED',
    'THIS_REASSESSMENT_CLOSES_ZERO_ADDITIONAL_AUTHORITY_GAPS',
    'AUTHORITY_ADMISSION_REMAINS_NOT_READY',
    'NO_SPOUSE_T8_PRODUCER_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_EFFECT',
  ] as const);

export type RelationshipSpouseT8PostPrimaryWitnessAuthorityGapStatus = Readonly<{
  QUALIFYING_PRIMARY_WITNESS: 'CLOSED' | 'OPEN';
  INDEPENDENT_NORMATIVE_PROVENANCE: 'OPEN';
  EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING: 'OPEN';
  CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE: 'OPEN';
  RELATIONSHIP_T6_INPUT: 'OPEN';
}>;

export interface RelationshipSpouseT8PostPrimaryWitnessAuthorityReassessmentReviewReport {
  reviewId: string;
  reviewVersion: typeof RELATIONSHIP_SPOUSE_T8_POST_PRIMARY_WITNESS_AUTHORITY_REASSESSMENT_REVIEW_VERSION;
  status:
    | 'RESOLVED_RELATIONSHIP_SPOUSE_T8_POST_PRIMARY_WITNESS_AUTHORITY_REASSESSMENT_REVIEW'
    | 'UPSTREAM_DIRECT_WANLI_TARGET_PAGE_EVIDENCE_INVALID'
    | 'UPSTREAM_ROLE_NEUTRAL_APPLICABILITY_CANDIDATE_EVIDENCE_INVALID';
  decision:
    | 'QUALIFYING_PRIMARY_WITNESS_REMAINS_CLOSED_MODERN_EDITORIAL_CANDIDATE_REMAINS_INADEQUATE_EXACTLY_ONE_OF_FIVE_GAPS_CLOSED'
    | 'POST_PRIMARY_WITNESS_AUTHORITY_REASSESSMENT_NOT_ESTABLISHED';
  upstreamDirectWitnessEvidenceId: string;
  upstreamApplicabilityCandidateEvidenceId: string;
  exactUpstreamDirectWitnessBoundaryAccepted: boolean;
  exactUpstreamApplicabilityCandidateBoundaryAccepted: boolean;
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  boundedExistingEvidenceAdequacyReassessmentPerformed: boolean;
  directPrimaryWitnessProgressAccepted: boolean;
  modernEditorialApplicabilityCandidateAcceptedAsResearchEvidence: boolean;
  modernEditorialPartnerNeutralLanguageCandidateLocated: boolean;
  modernEditorialNoPartnerIdentityInferenceBoundaryCandidateLocated: boolean;
  modernEditorialCandidateProvidesExplicitRoleNeutralNatalMapping: false;
  modernEditorialCandidatePeerReviewed: false;
  modernEditorialCandidateInstitutionalNormativeStandard: false;
  modernEditorialCandidateIndependentNormativeAuthority: false;
  compatibilityScopedRoleNeutralConventionReusedForNatalAuthority: false;
  historicalPrimaryAndModernEditorialEvidenceStitchedToCreateMissingAuthority: false;
  authorityGapStatus: RelationshipSpouseT8PostPrimaryWitnessAuthorityGapStatus;
  qualifyingPrimaryWitnessEstablished: boolean;
  independentNormativeProvenanceForCurrentSpouseMethodEstablished: false;
  explicitRoleNeutralSpouseNatalMappingEstablished: false;
  currentGovernedMethodSemanticCorrespondenceEstablished: false;
  currentRelationshipT6InputPathEstablished: false;
  applicabilityGapStatus: 'PARTIAL_EVIDENCE_NOT_ADEQUATE';
  authorityGapClosedByThisReview: false;
  authorityGapsClosedCount: 1 | 0;
  authorityGapsOpenCount: 4 | 5;
  qualifyingAuthorityCandidateCount: 0;
  authorityAcceptedCandidateCount: 0;
  authorityAdmissionReady: false;
  semanticProducerImplementationAuthorized: false;
  historicalGenderRoleUniversalizationAuthorized: false;
  userOrPartnerSexInferenceAuthorized: false;
  partnerSexualOrientationInferenceAuthorized: false;
  crossSourceStitchingAuthorized: false;
  crossTaskStitchingAuthorized: false;
  spouseT8RuleAuthoringAuthorized: false;
  spouseT8ClaimTypeCreationAuthorized: false;
  spouseInterpretationPackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  compatibilityAuthorityAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_POST_PRIMARY_WITNESS_AUTHORITY_REASSESSMENT_CONTROL_IDS)[number][];
  controlCount: 16 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    adequacyReassessmentsPerformed: 1 | 0;
    authorityGapsClosedByThisReview: 0;
    totalAuthorityGapsClosedAfterReview: 1 | 0;
    independentNormativeAuthoritiesEstablished: 0;
    explicitRoleNeutralNatalMappingsEstablished: 0;
    methodologyChoicesMade: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
    productionRoutesChanged: 0;
  };
  recommendedNextAction:
    | 'ACQUIRE_EXPLICIT_ROLE_NEUTRAL_SPOUSE_NATAL_MAPPING_WITH_INDEPENDENT_NORMATIVE_PROVENANCE_OR_CONTINUE_OTHER_OPEN_GAPS_INDEPENDENTLY_WITHOUT_OPENING_ANY_PRODUCER_GATE'
    | 'REESTABLISH_EXACT_POST_PRIMARY_WITNESS_AND_APPLICABILITY_CANDIDATE_BOUNDARIES';
}

function contentAddressedDirectWitnessIdentityValid(
  evidence: WanliDirectTargetPageEvidenceReport,
): boolean {
  const { evidenceId, ...material } = evidence;
  return (
    evidenceId ===
    `wanli_direct_target_page_evidence_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactDirectWitnessBoundaryAccepted(
  evidence: WanliDirectTargetPageEvidenceReport,
): boolean {
  return (
    contentAddressedDirectWitnessIdentityValid(evidence) &&
    evidence.evidenceVersion === WANLI_DIRECT_TARGET_PAGE_EVIDENCE_VERSION &&
    evidence.status === 'RESOLVED_WANLI_DIRECT_TARGET_PAGE_EVIDENCE' &&
    evidence.decision ===
      'WANLI_FIRST_PRINT_SCAN_50_DIRECTLY_INSPECTED_QUALIFYING_PRIMARY_WITNESS_ESTABLISHED_ONE_OF_FIVE_AUTHORITY_GAPS_CLOSED' &&
    evidence.exactUpstreamCollationBoundaryAccepted &&
    evidence.sourceWitness !== null &&
    deterministicContentHash(evidence.sourceWitness) ===
      deterministicContentHash(WANLI_DIRECT_TARGET_PAGE_SOURCE_WITNESS) &&
    evidence.directPageRecordCount === 3 &&
    deterministicContentHash(evidence.directPageRecords) ===
      deterministicContentHash(WANLI_DIRECT_TARGET_PAGE_RECORDS) &&
    evidence.exactFirstPrintTargetScanPageEstablished &&
    evidence.exactFirstPrintTargetScanPage === 50 &&
    evidence.directFirstPrintTargetPageImageInspected &&
    evidence.historicalGenderedRuleDirectlyVisible &&
    evidence.qualifyingPrimaryWitnessEstablished &&
    evidence.qualifyingPrimaryWitnessGapStatus === 'CLOSED' &&
    evidence.authorityGapStatus.QUALIFYING_PRIMARY_WITNESS === 'CLOSED' &&
    evidence.authorityGapStatus.INDEPENDENT_NORMATIVE_PROVENANCE === 'OPEN' &&
    evidence.authorityGapStatus.EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING === 'OPEN' &&
    evidence.authorityGapStatus.CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE === 'OPEN' &&
    evidence.authorityGapStatus.RELATIONSHIP_T6_INPUT === 'OPEN' &&
    evidence.authorityGapsClosedCount === 1 &&
    evidence.authorityGapsOpenCount === 4 &&
    evidence.independentNormativeProvenanceForCurrentSpouseMethodEstablished === false &&
    evidence.explicitRoleNeutralSpouseNatalMappingEstablished === false &&
    evidence.currentGovernedMethodSemanticCorrespondenceEstablished === false &&
    evidence.currentRelationshipT6InputPathEstablished === false &&
    evidence.authorityAdmissionReady === false &&
    evidence.semanticProducerImplementationAuthorized === false &&
    evidence.controlCount === 18 &&
    evidence.controlsFrozen &&
    deterministicContentHash(evidence.controlIds) ===
      deterministicContentHash(WANLI_DIRECT_TARGET_PAGE_CONTROL_IDS)
  );
}

function contentAddressedApplicabilityCandidateIdentityValid(
  evidence: RelationshipSpouseT8RoleNeutralApplicabilityContractCandidateEvidenceReport,
): boolean {
  const { evidenceId, ...material } = evidence;
  return (
    evidenceId ===
    `relationship_spouse_t8_role_neutral_applicability_contract_candidate_evidence_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactApplicabilityCandidateBoundaryAccepted(
  evidence: RelationshipSpouseT8RoleNeutralApplicabilityContractCandidateEvidenceReport,
): boolean {
  return (
    contentAddressedApplicabilityCandidateIdentityValid(evidence) &&
    evidence.evidenceVersion ===
      RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_EVIDENCE_VERSION &&
    evidence.status ===
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_EVIDENCE' &&
    evidence.decision ===
      'EXPLICIT_NO_IDENTITY_INFERENCE_AND_PARTNER_NEUTRAL_EDITORIAL_BOUNDARY_ACQUIRED_BUT_ROLE_NEUTRAL_NATAL_CONVENTION_AND_NORMATIVE_PROVENANCE_REMAIN_UNRESOLVED_ZERO_GAP_CLOSURE' &&
    evidence.exactUpstreamWanliPrimaryTargetBoundaryAccepted &&
    evidence.candidateRecordCount === 1 &&
    evidence.candidateRecord !== null &&
    deterministicContentHash(evidence.candidateRecord) ===
      deterministicContentHash(
        RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_RECORD,
      ) &&
    evidence.explicitModernEditorialHistoricalGenderConventionNotUniversalCandidateLocated &&
    evidence.explicitModernEditorialPartnerNeutralLanguageCandidateLocated &&
    evidence.explicitModernEditorialNoPartnerGenderInferenceCandidateLocated &&
    evidence.explicitModernEditorialNoSexualOrientationInferenceCandidateLocated &&
    evidence.explicitModernEditorialSpouseStarPalaceSeparationCandidateLocated &&
    evidence.explicitModernEditorialWholeChartContextCandidateLocated &&
    evidence.explicitRoleNeutralSpouseNatalConventionCandidateLocated === false &&
    evidence.compatibilityScopedRoleNeutralConventionReusedForNatalAuthority === false &&
    evidence.editorialBoundaryCandidateIsCommercialPractitionerMethodology &&
    evidence.editorialBoundaryCandidatePeerReviewed === false &&
    evidence.editorialBoundaryCandidateInstitutionalNormativeStandard === false &&
    evidence.editorialBoundaryCandidateIndependentNormativeAuthority === false &&
    evidence.editorialBoundaryCandidateAdequateForAuthorityAdmission === false &&
    evidence.applicabilityGapStatus === 'PARTIAL_EVIDENCE_NOT_ADEQUATE' &&
    evidence.applicabilityGapClosedByThisEvidence === false &&
    evidence.independentNormativeProvenanceForCurrentSpouseMethodEstablished === false &&
    evidence.explicitGenderNeutralSpouseNatalApplicabilityEstablished === false &&
    evidence.crossSourceStitchingAuthorized === false &&
    evidence.crossTaskStitchingAuthorized === false &&
    evidence.authorityGapsClosedCount === 0 &&
    evidence.allFiveAuthorityGapsRemainOpen &&
    evidence.authorityAdmissionReady === false &&
    evidence.semanticProducerImplementationAuthorized === false &&
    evidence.controlCount === 17 &&
    evidence.controlsFrozen &&
    deterministicContentHash(evidence.controlIds) ===
      deterministicContentHash(
        RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_APPLICABILITY_CONTRACT_CANDIDATE_CONTROL_IDS,
      )
  );
}

function finalized(
  material: Omit<RelationshipSpouseT8PostPrimaryWitnessAuthorityReassessmentReviewReport, 'reviewId'>,
): RelationshipSpouseT8PostPrimaryWitnessAuthorityReassessmentReviewReport {
  return {
    reviewId: `relationship_spouse_t8_post_primary_witness_authority_reassessment_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildRelationshipSpouseT8PostPrimaryWitnessAuthorityReassessmentReview(
  directWitnessEvidence: WanliDirectTargetPageEvidenceReport,
  applicabilityCandidateEvidence: RelationshipSpouseT8RoleNeutralApplicabilityContractCandidateEvidenceReport,
): RelationshipSpouseT8PostPrimaryWitnessAuthorityReassessmentReviewReport {
  const directAccepted = exactDirectWitnessBoundaryAccepted(directWitnessEvidence);
  const applicabilityAccepted = exactApplicabilityCandidateBoundaryAccepted(
    applicabilityCandidateEvidence,
  );
  const accepted = directAccepted && applicabilityAccepted;

  return finalized({
    reviewVersion: RELATIONSHIP_SPOUSE_T8_POST_PRIMARY_WITNESS_AUTHORITY_REASSESSMENT_REVIEW_VERSION,
    status: !directAccepted
      ? 'UPSTREAM_DIRECT_WANLI_TARGET_PAGE_EVIDENCE_INVALID'
      : !applicabilityAccepted
        ? 'UPSTREAM_ROLE_NEUTRAL_APPLICABILITY_CANDIDATE_EVIDENCE_INVALID'
        : 'RESOLVED_RELATIONSHIP_SPOUSE_T8_POST_PRIMARY_WITNESS_AUTHORITY_REASSESSMENT_REVIEW',
    decision: accepted
      ? 'QUALIFYING_PRIMARY_WITNESS_REMAINS_CLOSED_MODERN_EDITORIAL_CANDIDATE_REMAINS_INADEQUATE_EXACTLY_ONE_OF_FIVE_GAPS_CLOSED'
      : 'POST_PRIMARY_WITNESS_AUTHORITY_REASSESSMENT_NOT_ESTABLISHED',
    upstreamDirectWitnessEvidenceId: directWitnessEvidence.evidenceId,
    upstreamApplicabilityCandidateEvidenceId: applicabilityCandidateEvidence.evidenceId,
    exactUpstreamDirectWitnessBoundaryAccepted: directAccepted,
    exactUpstreamApplicabilityCandidateBoundaryAccepted: applicabilityAccepted,
    domain: 'relationship',
    subcategory: 'spouse',
    temporalScope: 'natal',
    statusClass: 'research',
    boundedExistingEvidenceAdequacyReassessmentPerformed: accepted,
    directPrimaryWitnessProgressAccepted: directAccepted,
    modernEditorialApplicabilityCandidateAcceptedAsResearchEvidence: accepted,
    modernEditorialPartnerNeutralLanguageCandidateLocated: accepted,
    modernEditorialNoPartnerIdentityInferenceBoundaryCandidateLocated: accepted,
    modernEditorialCandidateProvidesExplicitRoleNeutralNatalMapping: false,
    modernEditorialCandidatePeerReviewed: false,
    modernEditorialCandidateInstitutionalNormativeStandard: false,
    modernEditorialCandidateIndependentNormativeAuthority: false,
    compatibilityScopedRoleNeutralConventionReusedForNatalAuthority: false,
    historicalPrimaryAndModernEditorialEvidenceStitchedToCreateMissingAuthority: false,
    authorityGapStatus: Object.freeze({
      QUALIFYING_PRIMARY_WITNESS: directAccepted ? 'CLOSED' : 'OPEN',
      INDEPENDENT_NORMATIVE_PROVENANCE: 'OPEN',
      EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING: 'OPEN',
      CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE: 'OPEN',
      RELATIONSHIP_T6_INPUT: 'OPEN',
    }),
    qualifyingPrimaryWitnessEstablished: directAccepted,
    independentNormativeProvenanceForCurrentSpouseMethodEstablished: false,
    explicitRoleNeutralSpouseNatalMappingEstablished: false,
    currentGovernedMethodSemanticCorrespondenceEstablished: false,
    currentRelationshipT6InputPathEstablished: false,
    applicabilityGapStatus: 'PARTIAL_EVIDENCE_NOT_ADEQUATE',
    authorityGapClosedByThisReview: false,
    authorityGapsClosedCount: directAccepted ? 1 : 0,
    authorityGapsOpenCount: directAccepted ? 4 : 5,
    qualifyingAuthorityCandidateCount: 0,
    authorityAcceptedCandidateCount: 0,
    authorityAdmissionReady: false,
    semanticProducerImplementationAuthorized: false,
    historicalGenderRoleUniversalizationAuthorized: false,
    userOrPartnerSexInferenceAuthorized: false,
    partnerSexualOrientationInferenceAuthorized: false,
    crossSourceStitchingAuthorized: false,
    crossTaskStitchingAuthorized: false,
    spouseT8RuleAuthoringAuthorized: false,
    spouseT8ClaimTypeCreationAuthorized: false,
    spouseInterpretationPackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    compatibilityAuthorityAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: accepted
      ? RELATIONSHIP_SPOUSE_T8_POST_PRIMARY_WITNESS_AUTHORITY_REASSESSMENT_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted ? 16 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      adequacyReassessmentsPerformed: accepted ? 1 : 0,
      authorityGapsClosedByThisReview: 0,
      totalAuthorityGapsClosedAfterReview: directAccepted ? 1 : 0,
      independentNormativeAuthoritiesEstablished: 0,
      explicitRoleNeutralNatalMappingsEstablished: 0,
      methodologyChoicesMade: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
      productionRoutesChanged: 0,
    },
    recommendedNextAction: accepted
      ? 'ACQUIRE_EXPLICIT_ROLE_NEUTRAL_SPOUSE_NATAL_MAPPING_WITH_INDEPENDENT_NORMATIVE_PROVENANCE_OR_CONTINUE_OTHER_OPEN_GAPS_INDEPENDENTLY_WITHOUT_OPENING_ANY_PRODUCER_GATE'
      : 'REESTABLISH_EXACT_POST_PRIMARY_WITNESS_AND_APPLICABILITY_CANDIDATE_BOUNDARIES',
  });
}
