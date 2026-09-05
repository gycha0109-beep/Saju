import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  GENERAL_NATAL_CONCLUSION_FAMILY_RULES,
  GENERAL_NATAL_CONCLUSION_METHODOLOGY,
} from './general-natal-conclusion-synthesis-candidate.js';
import {
  RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_ADEQUACY_REASSESSMENT_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_ADEQUACY_REASSESSMENT_REVIEW_VERSION,
  RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_REQUIREMENT_ADEQUACY_ASSESSMENTS,
  type RelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidenceAdequacyReassessmentReviewReport,
} from './relationship-spouse-t8-current-method-residual-authority-acquisition-evidence-adequacy-reassessment-review.js';

export const RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_AUTHORITY_ACQUISITION_CONTINUATION_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-current-method-authority-acquisition-continuation-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_AUTHORITY_ACQUISITION_CONTINUATION_SOURCE_LEAD =
  Object.freeze({
    sourceId: 'SRC-SAMYEONG-TONGHOE-V7-WIFE-CONCUBINE-EXAMPLE-LEAD',
    title: '三命通會 卷七',
    chapter: '妻妾引例章',
    author: '萬民英',
    sourceClass: 'classical_text_transcription_with_folio_image_locators',
    transcriptionSurfaces: Object.freeze([
      'https://ctext.org/wiki.pl?chapter=548506',
      'https://zh.wikisource.org/wiki/三命通會_(四庫全書本)/卷07',
    ]),
    imageLocatorSurface: 'https://www.kanripo.org/text/KR3g0042/007',
    stableFolioLocators: Object.freeze(['007-88b', '007-89a']),
    exactTargetTextLocatorEstablished: true,
    exactTargetPrimaryImageInspected: false,
    targetImageFetchBlockedByAccessSurface: true,
    qualifyingPrimaryWitnessEstablished: false,
    observedMethodDimensions: Object.freeze([
      '正財與偏財的區分',
      '日干健旺／日主旺衰',
      '時令與旺鄉',
      '官星',
      '印',
      '比肩',
      '坐支與死絕墓等狀態條件',
    ]),
    multiFactorSpouseMethodObservedInTranscription: true,
    notes:
      'The chapter is a stronger spouse-method lead because its reasoning is conditional and multi-factor rather than a single-symbol mapping. The direct target facsimile was not successfully inspected, so the lead remains non-qualifying research evidence only.',
  } as const);

export const RELATIONSHIP_SPOUSE_T8_CURRENT_T5_EXPECTED_CLAIM_TYPES = Object.freeze([
  'TEN_GOD_FAMILY_PEER_PRESENT',
  'TEN_GOD_FAMILY_RESOURCE_PRESENT',
  'TEN_GOD_FAMILY_OUTPUT_PRESENT',
  'TEN_GOD_FAMILY_WEALTH_PRESENT',
  'TEN_GOD_FAMILY_OFFICER_PRESENT',
] as const);

export const RELATIONSHIP_SPOUSE_T8_CURRENT_T5_SUBTYPE_COLLAPSE = Object.freeze({
  peer: Object.freeze(['비견', '겁재']),
  resource: Object.freeze(['편인', '정인']),
  output: Object.freeze(['식신', '상관']),
  wealth: Object.freeze(['편재', '정재']),
  officer: Object.freeze(['편관', '정관']),
} as const);

export const RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_AUTHORITY_ACQUISITION_CONTINUATION_CONTROL_IDS =
  Object.freeze([
    'CONTINUATION_EVIDENCE_ACCEPTS_ONLY_THE_EXACT_POST_ACQUISITION_ADEQUACY_REASSESSMENT_BOUNDARY',
    'SAMYEONG_TONGHOE_WIFE_CONCUBINE_EXAMPLE_IS_A_MULTI_FACTOR_SPOUSE_METHOD_LEAD_ONLY',
    'SAMYEONG_TONGHOE_TARGET_TEXT_LOCATOR_DOES_NOT_EQUAL_DIRECT_PRIMARY_IMAGE_INSPECTION',
    'CURRENT_T5_FAMILY_PRESENCE_COLLAPSES_TEN_GOD_SUBTYPES_IN_THE_EMITTED_CLAIM',
    'CURRENT_T5_FAMILY_PRESENCE_EMITS_NO_SLOT_IDENTITY_SEASONAL_COMMAND_OR_STRENGTH_STATE',
    'CURRENT_T5_DOMINANCE_IS_EXPLICITLY_NOT_SCORED',
    'CURRENT_T5_METHODOLOGY_EXPLICITLY_EXCLUDES_SPOUSE_SPECIFIC_SEMANTICS',
    'SAMYEONG_TONGHOE_MULTI_FACTOR_METHOD_CANNOT_BE_RECONSTRUCTED_FROM_CURRENT_T5_FAMILY_PRESENCE_CLAIMS',
    'SEMANTIC_RECONSTRUCTION_FROM_DISCARDED_UPSTREAM_INFORMATION_IS_NOT_AUTHORIZED',
    'CURRENT_T5_INFORMATION_LOSS_SEMANTIC_MISMATCH_CLOSES_ZERO_AUTHORITY_GAPS',
    'HISTORICAL_GENDER_ROLE_MAPPING_IS_NOT_UNIVERSALIZED',
    'NO_USER_OR_PARTNER_SEX_OR_SEXUAL_ORIENTATION_INFERENCE',
    'NO_CROSS_SOURCE_OR_CROSS_TASK_STITCHING',
    'NO_SPOUSE_T8_PRODUCER_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_EFFECT',
    'EXTERNAL_SOURCE_ACQUISITION_MUST_CONTINUE_UNTIL_GENUINELY_QUALIFYING_AUTHORITY_EXISTS',
  ] as const);

type CurrentT5ObservedClaim = {
  claimType: (typeof RELATIONSHIP_SPOUSE_T8_CURRENT_T5_EXPECTED_CLAIM_TYPES)[number];
  family: keyof typeof RELATIONSHIP_SPOUSE_T8_CURRENT_T5_SUBTYPE_COLLAPSE;
  presence: 'observed';
  dominance: 'not_scored';
};

export interface RelationshipSpouseT8CurrentMethodAuthorityAcquisitionContinuationEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_AUTHORITY_ACQUISITION_CONTINUATION_EVIDENCE_VERSION;
  status:
    | 'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_AUTHORITY_ACQUISITION_CONTINUATION_EVIDENCE'
    | 'UPSTREAM_ADEQUACY_REASSESSMENT_BOUNDARY_INVALID'
    | 'CURRENT_T5_PRODUCER_BOUNDARY_INVALID';
  decision:
    | 'NEW_MULTI_FACTOR_SPOUSE_METHOD_LEAD_ACQUIRED_BUT_CURRENT_T5_INFORMATION_LOSS_SEMANTIC_MISMATCH_CONFIRMED_ZERO_GAP_CLOSURE'
    | 'CONTINUATION_EVIDENCE_NOT_ESTABLISHED';
  upstreamAdequacyReassessmentReviewId: string;
  exactUpstreamAdequacyBoundaryAccepted: boolean;
  exactCurrentT5ProducerBoundaryAccepted: boolean;
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  sourceLeadId: typeof RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_AUTHORITY_ACQUISITION_CONTINUATION_SOURCE_LEAD.sourceId;
  sourceLeadChapter: typeof RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_AUTHORITY_ACQUISITION_CONTINUATION_SOURCE_LEAD.chapter;
  sourceLeadStableFolioLocators: readonly string[];
  sourceLeadExactTargetTextLocatorEstablished: boolean;
  sourceLeadDirectPrimaryImageInspected: false;
  sourceLeadQualifyingPrimaryWitnessEstablished: false;
  sourceLeadMultiFactorSpouseMethodObserved: boolean;
  sourceLeadObservedMethodDimensions: readonly string[];
  currentT5ProducerPath: 'src/research/general-natal-conclusion-synthesis-candidate.ts';
  currentT5ObservedClaims: readonly CurrentT5ObservedClaim[];
  currentT5ClaimCount: 5 | 0;
  currentT5FamilySubtypeCollapse: typeof RELATIONSHIP_SPOUSE_T8_CURRENT_T5_SUBTYPE_COLLAPSE;
  currentT5EmittedClaimPreservesTenGodSubtypeIdentity: false;
  currentT5EmittedClaimPreservesSourceSlotIdentity: false;
  currentT5EmittedClaimPreservesSeasonalCommand: false;
  currentT5EmittedClaimPreservesDayMasterStrengthOrWangShuai: false;
  currentT5DominanceScored: false;
  currentT5SpouseSpecificSemanticAuthorityPresent: false;
  currentT5InformationLossSemanticMismatchConfirmed: boolean;
  semanticReconstructionWouldBeRequired: boolean;
  semanticReconstructionAuthorized: false;
  exactCurrentClaimClassCompositionAuthorityEstablished: false;
  currentGovernedMethodSemanticCorrespondenceEstablished: false;
  currentRelationshipT6InputPathEstablished: false;
  qualifyingAuthorityCandidateCount: 0;
  authorityAcceptedCandidateCount: 0;
  authorityGapClosedByThisEvidence: false;
  authorityGapsClosedCount: 0;
  allFiveAuthorityGapsRemainOpen: true;
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
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_AUTHORITY_ACQUISITION_CONTINUATION_CONTROL_IDS)[number][];
  controlCount: 15 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    newExternalSourceLeadsRecorded: 1 | 0;
    directPrimaryTargetImagesNewlyInspected: 0;
    currentT5ProducerBoundariesInspected: 1 | 0;
    semanticMismatchesConfirmed: 1 | 0;
    authorityRequirementsSatisfied: 0;
    authorityCandidatesAccepted: 0;
    authorityGapsClosed: 0;
    methodologyChoicesMade: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextAction:
    | 'CONTINUE_EXTERNAL_SOURCE_ACQUISITION_UNTIL_NEW_QUALIFYING_EVIDENCE_EXISTS_BEFORE_ANY_ADMISSION_OR_PRODUCER_GATE'
    | 'REESTABLISH_RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_ADEQUACY_REASSESSMENT_REVIEW'
    | 'REESTABLISH_EXACT_CURRENT_T5_FAMILY_PRESENCE_PRODUCER_BOUNDARY';
}

function contentAddressedAdequacyReviewIdentityValid(
  review: RelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidenceAdequacyReassessmentReviewReport,
): boolean {
  const { reviewId, ...material } = review;
  return (
    reviewId ===
    `relationship_spouse_t8_current_method_acquisition_evidence_adequacy_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactUpstreamAdequacyBoundaryAccepted(
  review: RelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidenceAdequacyReassessmentReviewReport,
): boolean {
  return (
    contentAddressedAdequacyReviewIdentityValid(review) &&
    review.reviewVersion ===
      RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_ADEQUACY_REASSESSMENT_REVIEW_VERSION &&
    review.status ===
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_ADEQUACY_REASSESSMENT' &&
    review.decision ===
      'ACQUISITION_EVIDENCE_VALID_RESEARCH_PROGRESS_ZERO_OF_FIVE_REQUIREMENTS_ADEQUATE_AUTHORITY_NOT_ADMISSION_READY' &&
    review.exactAcquisitionEvidenceBoundaryAccepted &&
    review.acquisitionEvidenceAdequateForResearchOutcome &&
    review.acquisitionEvidenceAdequateForAuthorityAdmission === false &&
    review.acquisitionEvidenceAdequateForAnyGapClosure === false &&
    review.mandatoryRequirementCount === 5 &&
    review.adequateMandatoryRequirementCount === 0 &&
    review.partialButInadequateRequirementCount === 4 &&
    review.noQualifyingEvidenceRequirementCount === 1 &&
    deterministicContentHash(review.requirementAssessments) ===
      deterministicContentHash(
        RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_REQUIREMENT_ADEQUACY_ASSESSMENTS,
      ) &&
    review.qualifyingAuthorityCandidateCount === 0 &&
    review.authorityAcceptedCandidateCount === 0 &&
    review.allFiveGapsRemainOpen &&
    review.authorityAdmissionReady === false &&
    review.semanticProducerImplementationAuthorized === false &&
    review.exactCurrentClaimClassCompositionAuthorityEstablished === false &&
    review.currentGovernedMethodSemanticCorrespondenceEstablished === false &&
    review.currentRelationshipT6InputPathEstablished === false &&
    review.historicalGenderRoleUniversalizationAuthorized === false &&
    review.userOrPartnerSexInferenceAuthorized === false &&
    review.partnerSexualOrientationInferenceAuthorized === false &&
    review.crossSourceStitchingAuthorized === false &&
    review.crossTaskStitchingAuthorized === false &&
    review.controlCount === 14 &&
    review.controlsFrozen &&
    deterministicContentHash(review.controlIds) ===
      deterministicContentHash(
        RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_ADEQUACY_REASSESSMENT_CONTROL_IDS,
      ) &&
    review.recommendedNextAction ===
      'CONTINUE_EXTERNAL_SOURCE_ACQUISITION_UNTIL_NEW_QUALIFYING_EVIDENCE_EXISTS_BEFORE_ANY_ADMISSION_OR_PRODUCER_GATE'
  );
}

function ruleOutputValue(rule: (typeof GENERAL_NATAL_CONCLUSION_FAMILY_RULES)[number]): Record<string, unknown> {
  return rule.output.value as Record<string, unknown>;
}

function observedCurrentT5Claims(): readonly CurrentT5ObservedClaim[] {
  const observed: CurrentT5ObservedClaim[] = [];
  for (const claimType of RELATIONSHIP_SPOUSE_T8_CURRENT_T5_EXPECTED_CLAIM_TYPES) {
    const rule = GENERAL_NATAL_CONCLUSION_FAMILY_RULES.find(
      (candidate) => candidate.output.claimType === claimType,
    );
    if (!rule) return Object.freeze([]);
    const value = ruleOutputValue(rule);
    if (
      rule.taxonomy.tier !== 'T5' ||
      rule.taxonomy.category !== 'ten_gods' ||
      rule.taxonomy.subcategory !== 'family_presence' ||
      rule.output.subject !== 'natal_chart' ||
      rule.output.predicate !== 'ten_god_family_presence' ||
      value.presence !== 'observed' ||
      value.dominance !== 'not_scored' ||
      typeof value.family !== 'string' ||
      !(value.family in RELATIONSHIP_SPOUSE_T8_CURRENT_T5_SUBTYPE_COLLAPSE)
    ) {
      return Object.freeze([]);
    }
    observed.push({
      claimType,
      family: value.family as CurrentT5ObservedClaim['family'],
      presence: 'observed',
      dominance: 'not_scored',
    });
  }
  return Object.freeze(observed);
}

function exactCurrentT5ProducerBoundaryAccepted(
  observed: readonly CurrentT5ObservedClaim[],
): boolean {
  const familyPresenceNotDominanceAssumption =
    'Family presence is not a numeric dominance score and does not establish strong/weak classification.';
  const spouseExclusionAssumption =
    'Specific income, occupation, spouse, health, event, luck polarity, and future timing remain outside this candidate.';
  return (
    observed.length === 5 &&
    observed.every((item) => item.presence === 'observed' && item.dominance === 'not_scored') &&
    deterministicContentHash(observed.map((item) => item.claimType)) ===
      deterministicContentHash(RELATIONSHIP_SPOUSE_T8_CURRENT_T5_EXPECTED_CLAIM_TYPES) &&
    GENERAL_NATAL_CONCLUSION_METHODOLOGY.assumptions.includes(
      familyPresenceNotDominanceAssumption,
    ) &&
    GENERAL_NATAL_CONCLUSION_METHODOLOGY.assumptions.includes(spouseExclusionAssumption)
  );
}

function finalized(
  material: Omit<RelationshipSpouseT8CurrentMethodAuthorityAcquisitionContinuationEvidenceReport, 'evidenceId'>,
): RelationshipSpouseT8CurrentMethodAuthorityAcquisitionContinuationEvidenceReport {
  return {
    evidenceId: `relationship_spouse_t8_current_method_authority_acquisition_continuation_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildRelationshipSpouseT8CurrentMethodAuthorityAcquisitionContinuationEvidence(
  upstream: RelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidenceAdequacyReassessmentReviewReport,
): RelationshipSpouseT8CurrentMethodAuthorityAcquisitionContinuationEvidenceReport {
  const upstreamAccepted = exactUpstreamAdequacyBoundaryAccepted(upstream);
  const observedT5Claims = observedCurrentT5Claims();
  const t5Accepted = exactCurrentT5ProducerBoundaryAccepted(observedT5Claims);
  const valid = upstreamAccepted && t5Accepted;

  const status = !upstreamAccepted
    ? 'UPSTREAM_ADEQUACY_REASSESSMENT_BOUNDARY_INVALID'
    : !t5Accepted
      ? 'CURRENT_T5_PRODUCER_BOUNDARY_INVALID'
      : 'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_AUTHORITY_ACQUISITION_CONTINUATION_EVIDENCE';

  const recommendedNextAction = !upstreamAccepted
    ? 'REESTABLISH_RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_ADEQUACY_REASSESSMENT_REVIEW'
    : !t5Accepted
      ? 'REESTABLISH_EXACT_CURRENT_T5_FAMILY_PRESENCE_PRODUCER_BOUNDARY'
      : 'CONTINUE_EXTERNAL_SOURCE_ACQUISITION_UNTIL_NEW_QUALIFYING_EVIDENCE_EXISTS_BEFORE_ANY_ADMISSION_OR_PRODUCER_GATE';

  return finalized({
    evidenceVersion:
      RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_AUTHORITY_ACQUISITION_CONTINUATION_EVIDENCE_VERSION,
    status,
    decision: valid
      ? 'NEW_MULTI_FACTOR_SPOUSE_METHOD_LEAD_ACQUIRED_BUT_CURRENT_T5_INFORMATION_LOSS_SEMANTIC_MISMATCH_CONFIRMED_ZERO_GAP_CLOSURE'
      : 'CONTINUATION_EVIDENCE_NOT_ESTABLISHED',
    upstreamAdequacyReassessmentReviewId: upstream.reviewId,
    exactUpstreamAdequacyBoundaryAccepted: upstreamAccepted,
    exactCurrentT5ProducerBoundaryAccepted: t5Accepted,
    domain: 'relationship',
    subcategory: 'spouse',
    temporalScope: 'natal',
    statusClass: 'research',
    sourceLeadId:
      RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_AUTHORITY_ACQUISITION_CONTINUATION_SOURCE_LEAD.sourceId,
    sourceLeadChapter:
      RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_AUTHORITY_ACQUISITION_CONTINUATION_SOURCE_LEAD.chapter,
    sourceLeadStableFolioLocators: valid
      ? RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_AUTHORITY_ACQUISITION_CONTINUATION_SOURCE_LEAD.stableFolioLocators
      : Object.freeze([]),
    sourceLeadExactTargetTextLocatorEstablished:
      valid &&
      RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_AUTHORITY_ACQUISITION_CONTINUATION_SOURCE_LEAD.exactTargetTextLocatorEstablished,
    sourceLeadDirectPrimaryImageInspected: false,
    sourceLeadQualifyingPrimaryWitnessEstablished: false,
    sourceLeadMultiFactorSpouseMethodObserved:
      valid &&
      RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_AUTHORITY_ACQUISITION_CONTINUATION_SOURCE_LEAD.multiFactorSpouseMethodObservedInTranscription,
    sourceLeadObservedMethodDimensions: valid
      ? RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_AUTHORITY_ACQUISITION_CONTINUATION_SOURCE_LEAD.observedMethodDimensions
      : Object.freeze([]),
    currentT5ProducerPath: 'src/research/general-natal-conclusion-synthesis-candidate.ts',
    currentT5ObservedClaims: valid ? observedT5Claims : Object.freeze([]),
    currentT5ClaimCount: valid ? 5 : 0,
    currentT5FamilySubtypeCollapse: RELATIONSHIP_SPOUSE_T8_CURRENT_T5_SUBTYPE_COLLAPSE,
    currentT5EmittedClaimPreservesTenGodSubtypeIdentity: false,
    currentT5EmittedClaimPreservesSourceSlotIdentity: false,
    currentT5EmittedClaimPreservesSeasonalCommand: false,
    currentT5EmittedClaimPreservesDayMasterStrengthOrWangShuai: false,
    currentT5DominanceScored: false,
    currentT5SpouseSpecificSemanticAuthorityPresent: false,
    currentT5InformationLossSemanticMismatchConfirmed: valid,
    semanticReconstructionWouldBeRequired: valid,
    semanticReconstructionAuthorized: false,
    exactCurrentClaimClassCompositionAuthorityEstablished: false,
    currentGovernedMethodSemanticCorrespondenceEstablished: false,
    currentRelationshipT6InputPathEstablished: false,
    qualifyingAuthorityCandidateCount: 0,
    authorityAcceptedCandidateCount: 0,
    authorityGapClosedByThisEvidence: false,
    authorityGapsClosedCount: 0,
    allFiveAuthorityGapsRemainOpen: true,
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
    controlIds: valid
      ? RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_AUTHORITY_ACQUISITION_CONTINUATION_CONTROL_IDS
      : Object.freeze([]),
    controlCount: valid ? 15 : 0,
    controlsFrozen: valid,
    implementationEffects: {
      newExternalSourceLeadsRecorded: valid ? 1 : 0,
      directPrimaryTargetImagesNewlyInspected: 0,
      currentT5ProducerBoundariesInspected: valid ? 1 : 0,
      semanticMismatchesConfirmed: valid ? 1 : 0,
      authorityRequirementsSatisfied: 0,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      methodologyChoicesMade: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextAction,
  });
}
