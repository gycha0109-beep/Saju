import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS } from './relationship-spouse-t8-authority-acquisition-readiness-review.js';
import {
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_METHOD_BOUNDARY_REASSESSMENT_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_METHOD_BOUNDARY_RESIDUAL_CLASSES,
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_DISCOVERY_EVIDENCE_ADEQUACY_METHOD_BOUNDARY_REASSESSMENT_REVIEW_VERSION,
  type RelationshipSpouseT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReviewReport,
  type RelationshipSpouseT8ResidualMethodBoundaryClassId,
} from './relationship-spouse-t8-current-t5-t6-semantic-bridge-residual-discovery-evidence-adequacy-method-boundary-reassessment-review.js';

export const RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION =
  'myeonghwa-relationship-spouse-t8-current-method-residual-authority-acquisition-readiness-review-v1' as const;

export type RelationshipSpouseT8CurrentMethodResidualAcquisitionTaskId =
  | 'WYG_DIRECT_PRIMARY_IMAGE_AUTHORITY_ACQUISITION'
  | 'YUANHAI_PRIMARY_PASSAGE_AUTHORITY_ACQUISITION'
  | 'MODERN_APPLICABILITY_NORMATIVE_PROVENANCE_ACQUISITION'
  | 'EXACT_CURRENT_CLAIM_CLASS_COMPOSITION_AUTHORITY_ACQUISITION';

export type RelationshipSpouseT8CurrentMethodResidualAcquisitionOperation =
  | 'CONFIRM_EXACT_SOURCE_IDENTITY_AND_PROVENANCE'
  | 'ACQUIRE_STABLE_REPRODUCIBLE_PASSAGE_OR_PAGE_LOCATOR'
  | 'INSPECT_ORIGINAL_OR_VERIFIED_FULL_LOCAL_CONTEXT'
  | 'VERIFY_CURRENT_GOVERNED_METHOD_COMPATIBILITY'
  | 'BIND_WYG_FOLIO_TO_0810_SCAN_PAGE'
  | 'INSPECT_DIRECT_PRIMARY_PAGE_IMAGE'
  | 'COMPARE_PRIMARY_IMAGE_WITH_INDEXED_TRANSCRIPTION'
  | 'VERIFY_SOURCE_BOUND_HISTORICAL_SPOUSE_ROLE_CORRESPONDENCE'
  | 'VERIFY_HISTORICAL_GENDER_ROLE_BOUNDARY'
  | 'VERIFY_YUANHAI_PASSAGE_INDEPENDENCE_FROM_SAMYEONG'
  | 'DISCOVER_HIGHER_PROVENANCE_MODERN_APPLICABILITY_AUTHORITY'
  | 'VERIFY_GENDER_NEUTRAL_PRODUCT_APPLICABILITY_EXPLICIT'
  | 'VERIFY_NO_USER_PARTNER_SEX_OR_ORIENTATION_INFERENCE'
  | 'DISCOVER_EXACT_CURRENT_CLAIM_CLASS_COMPOSITION_AUTHORITY'
  | 'VERIFY_ELIGIBLE_UPSTREAM_CLAIM_CLASSES_EXPLICIT'
  | 'VERIFY_CONFLICT_AMBIGUITY_POLICY_EXPLICIT'
  | 'VERIFY_POSITIVE_SCOPE_EXCLUSIONS_EXCEPTIONS_EXPLICIT'
  | 'VERIFY_NO_SINGLE_SYMBOL_PARTNER_OUTCOME_SHORTCUT'
  | 'VERIFY_NO_CROSS_SOURCE_STITCHING';

export interface RelationshipSpouseT8CurrentMethodResidualAcquisitionEvidenceContract {
  exactSourceIdentityRequired: true;
  independentNormativeProvenanceRequired: true;
  stableReproducibleLocatorRequired: true;
  originalOrVerifiedContextInspectionRequired: true;
  sourceBoundSemanticCorrespondenceRequired: true;
  explicitApplicabilityBoundaryRequired: true;
  currentGovernedMethodCompatibilityRequired: true;
  sourceMayUseDifferentVocabularyThanInternalClaimTypes: true;
  searchSnippetMayBeLeadOnly: true;
  searchSnippetMayCountAsAuthorityEvidence: false;
  ocrOrIndexedTextMaySubstituteForRequiredPrimaryImage: false;
  separateSourcesMayBeModelStitchedIntoUnstatedBridge: false;
  historicalGenderRoleMayBeUniversalizedAutomatically: false;
  humanMethodologyChoiceMaySubstituteForMissingAuthority: false;
  crossSourceCompositionForSameGapAllowed: false;
  acquisitionSuccessIsNotAuthorityAdmission: true;
  acquisitionSuccessIsNotGapClosure: true;
  negativeOutcomeMustBePreserved: true;
}

export interface RelationshipSpouseT8CurrentMethodResidualAcquisitionTask {
  taskId: RelationshipSpouseT8CurrentMethodResidualAcquisitionTaskId;
  sourceResidualClassId: RelationshipSpouseT8ResidualMethodBoundaryClassId;
  targetGapIds: readonly string[];
  retainedCandidateIds: readonly string[];
  executionReady: true;
  operations: readonly RelationshipSpouseT8CurrentMethodResidualAcquisitionOperation[];
  evidenceContract: RelationshipSpouseT8CurrentMethodResidualAcquisitionEvidenceContract;
  mayDiscoverAdditionalCurrentMethodCandidates: true;
  authorityAdmissionOnCompletion: false;
  gapClosureOnCompletion: false;
  spouseT8AuthoringOnCompletion: false;
}

function evidenceContract(): RelationshipSpouseT8CurrentMethodResidualAcquisitionEvidenceContract {
  return Object.freeze({
    exactSourceIdentityRequired: true,
    independentNormativeProvenanceRequired: true,
    stableReproducibleLocatorRequired: true,
    originalOrVerifiedContextInspectionRequired: true,
    sourceBoundSemanticCorrespondenceRequired: true,
    explicitApplicabilityBoundaryRequired: true,
    currentGovernedMethodCompatibilityRequired: true,
    sourceMayUseDifferentVocabularyThanInternalClaimTypes: true,
    searchSnippetMayBeLeadOnly: true,
    searchSnippetMayCountAsAuthorityEvidence: false,
    ocrOrIndexedTextMaySubstituteForRequiredPrimaryImage: false,
    separateSourcesMayBeModelStitchedIntoUnstatedBridge: false,
    historicalGenderRoleMayBeUniversalizedAutomatically: false,
    humanMethodologyChoiceMaySubstituteForMissingAuthority: false,
    crossSourceCompositionForSameGapAllowed: false,
    acquisitionSuccessIsNotAuthorityAdmission: true,
    acquisitionSuccessIsNotGapClosure: true,
    negativeOutcomeMustBePreserved: true,
  });
}

const SEMANTIC_AND_PROVENANCE_GAPS = Object.freeze([
  'SPOUSE_SPECIFIC_SEMANTIC_BINDING_MISSING',
  'SPOUSE_NORMATIVE_PROVENANCE_REVIEW_MISSING',
]);
const APPLICABILITY_GAPS = Object.freeze(['SPOUSE_APPLICABILITY_BOUNDARY_MISSING']);
const COMPOSITION_SCOPE_GAPS = Object.freeze([
  'SPOUSE_MULTI_CLAIM_COMPOSITION_METHOD_MISSING',
  'SPOUSE_SCOPE_LIMITS_AND_EXCEPTIONS_MISSING',
]);

export const RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_TASKS = Object.freeze([
  Object.freeze({
    taskId: 'WYG_DIRECT_PRIMARY_IMAGE_AUTHORITY_ACQUISITION',
    sourceResidualClassId: 'WYG_DIRECT_PRIMARY_IMAGE_VERIFICATION_FRONTIER',
    targetGapIds: SEMANTIC_AND_PROVENANCE_GAPS,
    retainedCandidateIds: Object.freeze([
      'WYG_0810_SCAN_CONTAINER',
      'KANRIPO_WYG_V5_FOLIO_INDEX',
      'KANRIPO_WYG_V6_FOLIO_INDEX',
    ] as const),
    executionReady: true,
    operations: Object.freeze([
      'CONFIRM_EXACT_SOURCE_IDENTITY_AND_PROVENANCE',
      'ACQUIRE_STABLE_REPRODUCIBLE_PASSAGE_OR_PAGE_LOCATOR',
      'BIND_WYG_FOLIO_TO_0810_SCAN_PAGE',
      'INSPECT_DIRECT_PRIMARY_PAGE_IMAGE',
      'COMPARE_PRIMARY_IMAGE_WITH_INDEXED_TRANSCRIPTION',
      'INSPECT_ORIGINAL_OR_VERIFIED_FULL_LOCAL_CONTEXT',
      'VERIFY_SOURCE_BOUND_HISTORICAL_SPOUSE_ROLE_CORRESPONDENCE',
      'VERIFY_HISTORICAL_GENDER_ROLE_BOUNDARY',
      'VERIFY_CURRENT_GOVERNED_METHOD_COMPATIBILITY',
      'VERIFY_NO_CROSS_SOURCE_STITCHING',
    ] as const satisfies readonly RelationshipSpouseT8CurrentMethodResidualAcquisitionOperation[]),
    evidenceContract: evidenceContract(),
    mayDiscoverAdditionalCurrentMethodCandidates: true,
    authorityAdmissionOnCompletion: false,
    gapClosureOnCompletion: false,
    spouseT8AuthoringOnCompletion: false,
  }),
  Object.freeze({
    taskId: 'YUANHAI_PRIMARY_PASSAGE_AUTHORITY_ACQUISITION',
    sourceResidualClassId: 'YUANHAI_PRIMARY_PASSAGE_VERIFICATION_FRONTIER',
    targetGapIds: SEMANTIC_AND_PROVENANCE_GAPS,
    retainedCandidateIds: Object.freeze([
      'NCL_06593_YUANHAI_MING_1600_SCAN',
      'NLC_YUANHAI_MING_SCAN_SERIES',
      'SHIDIAN_YUANHAI_VOL3_OCR_CONTEXT',
    ] as const),
    executionReady: true,
    operations: Object.freeze([
      'CONFIRM_EXACT_SOURCE_IDENTITY_AND_PROVENANCE',
      'ACQUIRE_STABLE_REPRODUCIBLE_PASSAGE_OR_PAGE_LOCATOR',
      'INSPECT_DIRECT_PRIMARY_PAGE_IMAGE',
      'INSPECT_ORIGINAL_OR_VERIFIED_FULL_LOCAL_CONTEXT',
      'VERIFY_SOURCE_BOUND_HISTORICAL_SPOUSE_ROLE_CORRESPONDENCE',
      'VERIFY_HISTORICAL_GENDER_ROLE_BOUNDARY',
      'VERIFY_YUANHAI_PASSAGE_INDEPENDENCE_FROM_SAMYEONG',
      'VERIFY_CURRENT_GOVERNED_METHOD_COMPATIBILITY',
      'VERIFY_NO_CROSS_SOURCE_STITCHING',
    ] as const satisfies readonly RelationshipSpouseT8CurrentMethodResidualAcquisitionOperation[]),
    evidenceContract: evidenceContract(),
    mayDiscoverAdditionalCurrentMethodCandidates: true,
    authorityAdmissionOnCompletion: false,
    gapClosureOnCompletion: false,
    spouseT8AuthoringOnCompletion: false,
  }),
  Object.freeze({
    taskId: 'MODERN_APPLICABILITY_NORMATIVE_PROVENANCE_ACQUISITION',
    sourceResidualClassId: 'MODERN_APPLICABILITY_NORMATIVE_PROVENANCE_FRONTIER',
    targetGapIds: APPLICABILITY_GAPS,
    retainedCandidateIds: Object.freeze([
      'CLARIFY_GENDER_NEUTRAL_SPOUSE_POLICY',
      'OPENFATE_GENDER_NEUTRAL_SPOUSE_POLICY',
    ] as const),
    executionReady: true,
    operations: Object.freeze([
      'DISCOVER_HIGHER_PROVENANCE_MODERN_APPLICABILITY_AUTHORITY',
      'CONFIRM_EXACT_SOURCE_IDENTITY_AND_PROVENANCE',
      'ACQUIRE_STABLE_REPRODUCIBLE_PASSAGE_OR_PAGE_LOCATOR',
      'INSPECT_ORIGINAL_OR_VERIFIED_FULL_LOCAL_CONTEXT',
      'VERIFY_GENDER_NEUTRAL_PRODUCT_APPLICABILITY_EXPLICIT',
      'VERIFY_HISTORICAL_GENDER_ROLE_BOUNDARY',
      'VERIFY_NO_USER_PARTNER_SEX_OR_ORIENTATION_INFERENCE',
      'VERIFY_CURRENT_GOVERNED_METHOD_COMPATIBILITY',
      'VERIFY_NO_CROSS_SOURCE_STITCHING',
    ] as const satisfies readonly RelationshipSpouseT8CurrentMethodResidualAcquisitionOperation[]),
    evidenceContract: evidenceContract(),
    mayDiscoverAdditionalCurrentMethodCandidates: true,
    authorityAdmissionOnCompletion: false,
    gapClosureOnCompletion: false,
    spouseT8AuthoringOnCompletion: false,
  }),
  Object.freeze({
    taskId: 'EXACT_CURRENT_CLAIM_CLASS_COMPOSITION_AUTHORITY_ACQUISITION',
    sourceResidualClassId: 'EXACT_CURRENT_CLAIM_CLASS_COMPOSITION_AUTHORITY_FRONTIER',
    targetGapIds: COMPOSITION_SCOPE_GAPS,
    retainedCandidateIds: Object.freeze([
      'AUSPDAY_RELATIONSHIP_COMPOSITION_GUIDE',
      'SUPERBAZI_RELATIONSHIP_COMPOSITION_GUIDE',
    ] as const),
    executionReady: true,
    operations: Object.freeze([
      'DISCOVER_EXACT_CURRENT_CLAIM_CLASS_COMPOSITION_AUTHORITY',
      'CONFIRM_EXACT_SOURCE_IDENTITY_AND_PROVENANCE',
      'ACQUIRE_STABLE_REPRODUCIBLE_PASSAGE_OR_PAGE_LOCATOR',
      'INSPECT_ORIGINAL_OR_VERIFIED_FULL_LOCAL_CONTEXT',
      'VERIFY_ELIGIBLE_UPSTREAM_CLAIM_CLASSES_EXPLICIT',
      'VERIFY_CONFLICT_AMBIGUITY_POLICY_EXPLICIT',
      'VERIFY_POSITIVE_SCOPE_EXCLUSIONS_EXCEPTIONS_EXPLICIT',
      'VERIFY_NO_SINGLE_SYMBOL_PARTNER_OUTCOME_SHORTCUT',
      'VERIFY_CURRENT_GOVERNED_METHOD_COMPATIBILITY',
      'VERIFY_NO_CROSS_SOURCE_STITCHING',
    ] as const satisfies readonly RelationshipSpouseT8CurrentMethodResidualAcquisitionOperation[]),
    evidenceContract: evidenceContract(),
    mayDiscoverAdditionalCurrentMethodCandidates: true,
    authorityAdmissionOnCompletion: false,
    gapClosureOnCompletion: false,
    spouseT8AuthoringOnCompletion: false,
  }),
] as const satisfies readonly RelationshipSpouseT8CurrentMethodResidualAcquisitionTask[]);

export const RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_CONTROL_IDS = Object.freeze([
  'ONLY_BOUNDED_ACTIVE_CURRENT_METHOD_FRONTIERS_ARE_ACQUISITION_READY',
  'WYG_ACQUISITION_REQUIRES_EXACT_FOLIO_PAGE_BINDING_AND_DIRECT_PRIMARY_IMAGE_INSPECTION',
  'WYG_INDEXED_TEXT_OR_OCR_MAY_NOT_SUBSTITUTE_FOR_REQUIRED_PRIMARY_IMAGE',
  'YUANHAI_ACQUISITION_REQUIRES_EXACT_PRIMARY_PASSAGE_IMAGE_AND_INDEPENDENT_PROVENANCE',
  'YUANHAI_WORK_IDENTITY_INDEPENDENCE_ALONE_DOES_NOT_COMPLETE_NORMATIVE_PROVENANCE',
  'MODERN_APPLICABILITY_ACQUISITION_REQUIRES_HIGHER_PROVENANCE_AUTHORITY_NOT_WEB_POLICY_REPETITION',
  'HISTORICAL_GENDER_ROLE_MEANING_MUST_BE_PRESERVED_WITH_NO_SEX_OR_ORIENTATION_INFERENCE',
  'COMPOSITION_ACQUISITION_REQUIRES_EXACT_CURRENT_UPSTREAM_CLAIM_CLASSES_AND_EXPLICIT_CONFLICT_POLICY',
  'COMPOSITION_SCOPE_MUST_INCLUDE_POSITIVE_SCOPE_EXCLUSIONS_AND_EXCEPTIONS',
  'NO_SINGLE_SYMBOL_PARTNER_ATTRIBUTE_OR_RELATIONSHIP_OUTCOME_SHORTCUT',
  'HUMAN_METHODOLOGY_CHOICE_CANNOT_SUBSTITUTE_FOR_MISSING_NORMATIVE_AUTHORITY',
  'NO_CROSS_SOURCE_STITCHING_OR_MODEL_SYNTHESIS_TO_SIMULATE_A_BRIDGE',
  'ACQUISITION_SUCCESS_DOES_NOT_ADMIT_AUTHORITY_OR_CLOSE_A_GAP',
  'ALL_FIVE_GAPS_REMAIN_OPEN_NO_SPOUSE_T8_RULE_CLAIM_PACK_NARRATIVE_COMPATIBILITY_PREVIEW_OR_PRODUCTION_ARTIFACT',
] as const);

export interface RelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionReadinessReviewReport {
  reviewId: string;
  reviewVersion: typeof RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION;
  status:
    | 'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS'
    | 'UPSTREAM_METHOD_BOUNDARY_REASSESSMENT_INVALID';
  decision:
    | 'FOUR_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_TASKS_READY_NO_AUTHORITY_ACQUIRED'
    | 'CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_NOT_READY';
  upstreamMethodBoundaryReviewId: string;
  exactMethodBoundaryAccepted: boolean;
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  acquisitionTasks: readonly RelationshipSpouseT8CurrentMethodResidualAcquisitionTask[];
  acquisitionTaskCount: 4 | 0;
  executableResidualClassIds: readonly RelationshipSpouseT8ResidualMethodBoundaryClassId[];
  executableResidualClassCount: 4 | 0;
  wygDirectPrimaryImageAcquisitionReady: boolean;
  yuanhaiPrimaryPassageAcquisitionReady: boolean;
  modernApplicabilityProvenanceAcquisitionReady: boolean;
  exactCurrentClaimClassCompositionAcquisitionReady: boolean;
  currentMethodEvidenceAcquisitionMayContinueWithoutHumanMethodologyChoice: boolean;
  acquisitionExecutionAuthorizedForNextGate: boolean;
  acquisitionPerformedByThisGate: false;
  authorityAcquiredByThisGate: false;
  authorityGapClosedByThisGate: false;
  crossSourceStitchingAuthorized: false;
  currentRelationshipT6InputPathEstablished: false;
  allFiveGapsRemainOpen: true;
  unresolvedGapIds: readonly string[];
  methodologyChoiceMadeByThisGate: false;
  spouseT8RuleAuthoringAuthorized: false;
  spouseT8ClaimTypeCreationAuthorized: false;
  spouseInterpretationPackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  compatibilityAuthorityAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_CONTROL_IDS)[number][];
  controlCount: 14 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    acquisitionExecutionsPerformed: 0;
    sourcesDiscovered: 0;
    candidatesRegistered: 0;
    authorityCandidatesAccepted: 0;
    authorityGapsClosed: 0;
    methodologyChoicesMade: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextGate:
    | 'RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE'
    | 'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_DISCOVERY_EVIDENCE_ADEQUACY_METHOD_BOUNDARY_REASSESSMENT_REVIEW';
}

const EXECUTABLE_CLASS_IDS = Object.freeze([
  'WYG_DIRECT_PRIMARY_IMAGE_VERIFICATION_FRONTIER',
  'YUANHAI_PRIMARY_PASSAGE_VERIFICATION_FRONTIER',
  'MODERN_APPLICABILITY_NORMATIVE_PROVENANCE_FRONTIER',
  'EXACT_CURRENT_CLAIM_CLASS_COMPOSITION_AUTHORITY_FRONTIER',
] as const satisfies readonly RelationshipSpouseT8ResidualMethodBoundaryClassId[]);

const ALL_GAP_IDS = Object.freeze(
  RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS.map((requirement) => requirement.gapId),
);

function contentAddressedMethodBoundaryIdentityValid(
  review: RelationshipSpouseT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReviewReport,
): boolean {
  const { reviewId, ...material } = review;
  return (
    reviewId ===
    `relationship_spouse_t8_current_bridge_method_boundary_reassessment_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactMethodBoundaryAccepted(
  review: RelationshipSpouseT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReviewReport,
): boolean {
  return (
    contentAddressedMethodBoundaryIdentityValid(review) &&
    review.reviewVersion ===
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_DISCOVERY_EVIDENCE_ADEQUACY_METHOD_BOUNDARY_REASSESSMENT_REVIEW_VERSION &&
    review.status ===
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_DISCOVERY_EVIDENCE_ADEQUACY_METHOD_BOUNDARY_REASSESSMENT' &&
    review.decision ===
      'PARTIAL_EVIDENCE_VALID_FOUR_CURRENT_METHOD_AUTHORITY_FRONTIERS_REMAIN_OPEN_NO_COMPETING_METHOD_ADOPTION_NO_AUTHORITY_ACQUIRED' &&
    review.exactExecutionEvidenceBoundaryAccepted &&
    review.executionEvidenceAdequateForResidualClassificationOnly &&
    review.executionEvidenceAdequateForAuthorityAdmission === false &&
    review.executionEvidenceAdequateForGapClosure === false &&
    review.residualClassCount === 4 &&
    deterministicContentHash(review.residualClasses) ===
      deterministicContentHash(RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_METHOD_BOUNDARY_RESIDUAL_CLASSES) &&
    review.activePrimaryWitnessVerificationFrontierCount === 2 &&
    review.activeNormativeProvenanceFrontierCount === 1 &&
    review.activeCurrentMethodAuthorityDiscoveryFrontierCount === 1 &&
    review.wygDirectPrimaryImageVerificationMayContinue &&
    review.yuanhaiPrimaryPassageVerificationMayContinue &&
    review.modernApplicabilityNormativeProvenanceDiscoveryMayContinue &&
    review.exactCurrentClaimClassCompositionAuthorityDiscoveryMayContinue &&
    review.humanMethodologyChoiceRequiredBeforeContinuingEvidenceAcquisition === false &&
    review.competingFoundationalMethodChoiceSurfaced === false &&
    review.methodologyChoiceMadeByThisGate === false &&
    review.crossSourceStitchingAuthorized === false &&
    review.crossFrontierStitchingAuthorized === false &&
    review.currentRelationshipT6InputPathEstablished === false &&
    review.allFiveGapsRemainOpen &&
    deterministicContentHash(review.unresolvedGapIds) === deterministicContentHash(ALL_GAP_IDS) &&
    review.authorityAcquiredByThisGate === false &&
    review.authorityGapClosedByThisGate === false &&
    review.productionPromotionAuthorized === false &&
    review.controlsFrozen &&
    review.controlCount === 14 &&
    deterministicContentHash(review.controlIds) ===
      deterministicContentHash(RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_METHOD_BOUNDARY_REASSESSMENT_CONTROL_IDS) &&
    review.recommendedNextGate ===
      'RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_REVIEW'
  );
}

function finalized(
  material: Omit<RelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionReadinessReviewReport, 'reviewId'>,
): RelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionReadinessReviewReport {
  return {
    reviewId: `relationship_spouse_t8_current_method_residual_authority_acquisition_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionReadinessReview(
  methodBoundary: RelationshipSpouseT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReviewReport,
): RelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionReadinessReviewReport {
  const accepted = exactMethodBoundaryAccepted(methodBoundary);

  return finalized({
    reviewVersion: RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS'
      : 'UPSTREAM_METHOD_BOUNDARY_REASSESSMENT_INVALID',
    decision: accepted
      ? 'FOUR_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_TASKS_READY_NO_AUTHORITY_ACQUIRED'
      : 'CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_NOT_READY',
    upstreamMethodBoundaryReviewId: methodBoundary.reviewId,
    exactMethodBoundaryAccepted: accepted,
    domain: 'relationship',
    subcategory: 'spouse',
    temporalScope: 'natal',
    statusClass: 'research',
    acquisitionTasks: accepted
      ? RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_TASKS
      : Object.freeze([]),
    acquisitionTaskCount: accepted ? 4 : 0,
    executableResidualClassIds: accepted ? EXECUTABLE_CLASS_IDS : Object.freeze([]),
    executableResidualClassCount: accepted ? 4 : 0,
    wygDirectPrimaryImageAcquisitionReady: accepted,
    yuanhaiPrimaryPassageAcquisitionReady: accepted,
    modernApplicabilityProvenanceAcquisitionReady: accepted,
    exactCurrentClaimClassCompositionAcquisitionReady: accepted,
    currentMethodEvidenceAcquisitionMayContinueWithoutHumanMethodologyChoice: accepted,
    acquisitionExecutionAuthorizedForNextGate: accepted,
    acquisitionPerformedByThisGate: false,
    authorityAcquiredByThisGate: false,
    authorityGapClosedByThisGate: false,
    crossSourceStitchingAuthorized: false,
    currentRelationshipT6InputPathEstablished: false,
    allFiveGapsRemainOpen: true,
    unresolvedGapIds: accepted ? ALL_GAP_IDS : Object.freeze([]),
    methodologyChoiceMadeByThisGate: false,
    spouseT8RuleAuthoringAuthorized: false,
    spouseT8ClaimTypeCreationAuthorized: false,
    spouseInterpretationPackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    compatibilityAuthorityAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: accepted
      ? RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted ? 14 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      acquisitionExecutionsPerformed: 0,
      sourcesDiscovered: 0,
      candidatesRegistered: 0,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      methodologyChoicesMade: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate: accepted
      ? 'RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE'
      : 'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_DISCOVERY_EVIDENCE_ADEQUACY_METHOD_BOUNDARY_REASSESSMENT_REVIEW',
  });
}
