import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_REMEDIATION_TRACKS,
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_SOURCE_ACCESS_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_TARGETED_SOURCE_ACCESS_REQUIREMENTS_REVIEW_VERSION,
  type RelationshipSpouseT8BridgeRemediationTrackId,
  type RelationshipSpouseT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReviewReport,
} from './relationship-spouse-t8-current-t5-t6-semantic-bridge-targeted-source-access-requirements-review.js';

export const RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_READINESS_REVIEW_VERSION =
  'myeonghwa-relationship-spouse-t8-current-t5-t6-semantic-bridge-active-remediation-execution-readiness-review-v1' as const;

export type RelationshipSpouseT8BridgeExecutionTaskId =
  | 'SAMYEONG_V5_FACSIMILE_WITNESS_INSPECTION_EXECUTION'
  | 'SAMYEONG_V6_OFFICER_WEALTH_FACSIMILE_WITNESS_INSPECTION_EXECUTION'
  | 'MODERN_SPOUSE_PRODUCT_SCOPE_ADJUDICATION_EXECUTION';

export type RelationshipSpouseT8BridgeExecutionOperation =
  | 'CONFIRM_EXACT_SOURCE_EDITION_IDENTITY'
  | 'ACQUIRE_DIRECT_FACSIMILE_PAGE_IMAGE'
  | 'VERIFY_PAGE_LOCATOR_AGAINST_IMAGE'
  | 'COMPARE_INDEXED_TRANSCRIPTION_TO_IMAGE'
  | 'INSPECT_BOUNDED_FULL_LOCAL_CONTEXT'
  | 'CLASSIFY_HISTORICAL_METHOD_INGREDIENTS'
  | 'EVALUATE_SOURCE_BOUND_CURRENT_T5_WEALTH_CORRESPONDENCE'
  | 'EVALUATE_SOURCE_BOUND_CURRENT_T5_OFFICER_CORRESPONDENCE'
  | 'DISCOVER_INDEPENDENT_NORMATIVE_CORROBORATION'
  | 'DISTINGUISH_HISTORICAL_SOURCE_MEANING_FROM_MODERN_PRODUCT_APPLICABILITY'
  | 'ADJUDICATE_GENDER_NEUTRAL_SPOUSE_APPLICABILITY'
  | 'VERIFY_NO_USER_OR_PARTNER_SEX_INFERENCE'
  | 'VERIFY_NO_PARTNER_ATTRIBUTE_OR_OUTCOME_PROMOTION'
  | 'VERIFY_NO_COMPATIBILITY_OR_TIMING_PROMOTION'
  | 'VERIFY_NO_SOURCE_MEANING_REWRITE'
  | 'VERIFY_NO_SILENT_COMPETING_METHOD_IMPORT';

export type RelationshipSpouseT8BridgeExecutionResultDisposition =
  | 'QUALIFYING_EVIDENCE_ACQUIRED'
  | 'PARTIAL_EVIDENCE_ACQUIRED'
  | 'ACCESS_BLOCKED'
  | 'PRIMARY_WITNESS_MISMATCH'
  | 'CURRENT_T5_CORRESPONDENCE_NOT_ESTABLISHED'
  | 'METHOD_INCOMPATIBLE'
  | 'MODERN_SCOPE_INCOMPATIBLE'
  | 'MODERN_SCOPE_REQUIRES_ADDITIONAL_AUTHORITY'
  | 'NO_INDEPENDENT_CORROBORATION_FOUND';

export interface RelationshipSpouseT8BridgeExecutionEvidenceContract {
  exactSourceIdentityRequired: boolean;
  reproducibleLocatorRequired: boolean;
  directFacsimileImageInspectionRequired: boolean;
  inspectedSurfaceRequired: true;
  indexedTranscriptionMayGuideNavigationOnly: true;
  indexedTranscriptionMaySubstituteForFacsimileInspection: false;
  boundedQuotedTextOrFaithfulEvidenceNoteRequired: true;
  surroundingContextAssessmentRequired: true;
  currentT5SemanticCorrespondenceAssessmentRequired: boolean;
  methodologyCompatibilityAssessmentRequired: boolean;
  modernProductScopeAssessmentRequired: true;
  historicalSourceMeaningMustRemainDistinctFromProductPolicy: true;
  negativeOrBlockedResultMustBeRecorded: true;
  accessSuccessIsNotAuthorityAcceptance: true;
  scopeAdjudicationSuccessIsNotAuthorityAcceptance: true;
  crossTaskEvidenceStitchingForSameGapAllowed: false;
}

export interface RelationshipSpouseT8BridgeExecutionTask {
  taskId: RelationshipSpouseT8BridgeExecutionTaskId;
  sourceTrackId: RelationshipSpouseT8BridgeRemediationTrackId;
  executionAuthorized: true;
  operations: readonly RelationshipSpouseT8BridgeExecutionOperation[];
  evidenceContract: RelationshipSpouseT8BridgeExecutionEvidenceContract;
  allowedResultDispositions: readonly RelationshipSpouseT8BridgeExecutionResultDisposition[];
  authorityAcceptanceOnCompletion: false;
  authorityGapClosureOnCompletion: false;
  spouseT8AuthoringOnCompletion: false;
  currentRelationshipT6CreationOnCompletion: false;
}

export const RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_CONTROL_IDS = Object.freeze([
  'EXECUTION_READINESS_DOES_NOT_PERFORM_SOURCE_ACCESS_OR_SCOPE_ADJUDICATION',
  'ONLY_B13_ACTIVE_PRIMARY_TRACKS_ARE_EXECUTABLE',
  'SAMYEONG_V5_EXECUTION_REQUIRES_DIRECT_WYG_FACSIMILE_IMAGE_INSPECTION',
  'SAMYEONG_V5_EXISTING_WEALTH_CORRESPONDENCE_MUST_REMAIN_BOUNDED_UNTIL_IMAGE_CONTEXT_AND_SCOPE_REVIEW',
  'SAMYEONG_V6_EXECUTION_REQUIRES_DIRECT_WYG_FACSIMILE_IMAGE_INSPECTION_BEFORE_OFFICER_OR_WEALTH_CORRESPONDENCE',
  'INDEXED_TEXT_OCR_AND_SEARCH_SNIPPETS_ARE_NAVIGATION_EVIDENCE_NOT_PRIMARY_WITNESS_SUBSTITUTES',
  'INDEPENDENT_NORMATIVE_CORROBORATION_IS_SEPARATE_FROM_REPEAT_ACCESS_TO_SAMYEONG',
  'MODERN_SCOPE_EXECUTION_MUST_NOT_REWRITE_HISTORICAL_GENDER_ROLE_SOURCE_MEANING',
  'NO_USER_OR_PARTNER_SEX_INFERENCE_MAY_BE_CREATED',
  'NO_PARTNER_ATTRIBUTE_MARRIAGE_BREAKUP_FIDELITY_TIMING_OR_COMPATIBILITY_PROMOTION',
  'COMPETING_HISTORICAL_METHOD_IMPORT_REMAINS_PROHIBITED_WITHOUT_EXPLICIT_CHOICE',
  'NO_CURRENT_RELATIONSHIP_T6_INPUT_OR_REMEDIATION_TASK_MAY_BE_CREATED',
  'NEGATIVE_PARTIAL_BLOCKED_AND_SCOPE_INCOMPATIBLE_RESULTS_ARE_FIRST_CLASS_EVIDENCE',
  'EXECUTION_SUCCESS_DOES_NOT_ACCEPT_AUTHORITY_OR_CLOSE_A_GAP',
  'NO_CROSS_TASK_STITCHING_TO_SIMULATE_SINGLE_GAP_AUTHORITY',
  'NO_SPOUSE_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_ARTIFACT',
] as const);

export interface RelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReviewReport {
  reviewId: string;
  reviewVersion: typeof RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_READINESS_REVIEW_VERSION;
  status:
    | 'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_READINESS'
    | 'UPSTREAM_SOURCE_ACCESS_REQUIREMENTS_BOUNDARY_INVALID';
  decision:
    | 'THREE_ACTIVE_PRIMARY_REMEDIATION_TASKS_EXECUTION_READY_EVIDENCE_ONLY_NO_AUTHORITY_ACQUIRED'
    | 'ACTIVE_REMEDIATION_EXECUTION_NOT_READY';
  upstreamSourceAccessReviewId: string;
  exactSourceAccessBoundaryAccepted: boolean;
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  executionTasks: readonly RelationshipSpouseT8BridgeExecutionTask[];
  executionTaskCount: 3 | 0;
  executableTrackIds: readonly RelationshipSpouseT8BridgeRemediationTrackId[];
  executableTrackCount: 3 | 0;
  samyeongV5FacsimileInspectionExecutionReady: boolean;
  samyeongV5DirectImageRequired: boolean;
  samyeongV5AccessBlockedMayBeRecordedWithoutFallback: boolean;
  samyeongV5IndependentCorroborationDiscoveryRequired: boolean;
  samyeongV5ExistingWealthCorrespondenceAutoAcceptedOnImageMatch: false;
  samyeongV6FacsimileInspectionExecutionReady: boolean;
  samyeongV6DirectImageRequired: boolean;
  samyeongV6AccessBlockedMayBeRecordedWithoutFallback: boolean;
  samyeongV6OfficerCorrespondenceAutoAcceptedOnImageMatch: false;
  samyeongV6WealthCorrespondenceAutoAcceptedOnImageMatch: false;
  modernSpouseScopeAdjudicationExecutionReady: boolean;
  modernScopeMayRewriteHistoricalSourceMeaning: false;
  modernScopeMayInferUserOrPartnerSex: false;
  modernScopeMayPromotePartnerAttributesOrOutcomes: false;
  modernScopeMayPromoteCompatibilityOrTiming: false;
  modernScopeIncompatibleMayBeRecordedWithoutFallback: boolean;
  negativeEvidencePreservedAsFirstClassResult: boolean;
  tasksMayRunIndependently: boolean;
  crossTaskStitchingAuthorized: false;
  secondaryDitianClarificationExecutionAuthorized: false;
  competingHistoricalMethodExecutionAuthorized: false;
  currentRelationshipT6InputPathEstablished: false;
  currentRelationshipT6ExecutionTaskCreated: false;
  allFiveGapsRemainOpen: true;
  unresolvedGapIds: readonly string[];
  sourceAccessPerformedByThisGate: false;
  scopeAdjudicationPerformedByThisGate: false;
  authorityAcquiredByThisGate: false;
  authorityGapClosedByThisGate: false;
  spouseT8RuleAuthoringAuthorized: false;
  spouseT8ClaimTypeCreationAuthorized: false;
  spouseInterpretationPackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  compatibilityAuthorityAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_CONTROL_IDS)[number][];
  controlCount: 16 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    sourceAccessesPerformed: 0;
    scopeAdjudicationsPerformed: 0;
    searchExecutionsPerformed: 0;
    evidenceRecordsCreated: 0;
    candidatesRegistered: 0;
    authorityCandidatesAccepted: 0;
    methodologyDefinitionsCreated: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextGate:
    | 'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_EVIDENCE'
    | 'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_TARGETED_SOURCE_ACCESS_REQUIREMENTS_REVIEW';
}

const EXECUTABLE_TRACK_IDS = Object.freeze([
  'SAMYEONG_V5_WYG_FACSIMILE_WITNESS_ACCESS',
  'SAMYEONG_V6_WYG_OFFICER_WEALTH_FACSIMILE_WITNESS_ACCESS',
  'MODERN_SPOUSE_PRODUCT_SCOPE_ADJUDICATION',
] as const satisfies readonly RelationshipSpouseT8BridgeRemediationTrackId[]);

function evidenceContract(
  directFacsimileImageInspectionRequired: boolean,
  currentT5SemanticCorrespondenceAssessmentRequired: boolean,
  methodologyCompatibilityAssessmentRequired: boolean,
): RelationshipSpouseT8BridgeExecutionEvidenceContract {
  return Object.freeze({
    exactSourceIdentityRequired: directFacsimileImageInspectionRequired,
    reproducibleLocatorRequired: directFacsimileImageInspectionRequired,
    directFacsimileImageInspectionRequired,
    inspectedSurfaceRequired: true,
    indexedTranscriptionMayGuideNavigationOnly: true,
    indexedTranscriptionMaySubstituteForFacsimileInspection: false,
    boundedQuotedTextOrFaithfulEvidenceNoteRequired: true,
    surroundingContextAssessmentRequired: true,
    currentT5SemanticCorrespondenceAssessmentRequired,
    methodologyCompatibilityAssessmentRequired,
    modernProductScopeAssessmentRequired: true,
    historicalSourceMeaningMustRemainDistinctFromProductPolicy: true,
    negativeOrBlockedResultMustBeRecorded: true,
    accessSuccessIsNotAuthorityAcceptance: true,
    scopeAdjudicationSuccessIsNotAuthorityAcceptance: true,
    crossTaskEvidenceStitchingForSameGapAllowed: false,
  });
}

export const RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_TASKS = Object.freeze([
  Object.freeze({
    taskId: 'SAMYEONG_V5_FACSIMILE_WITNESS_INSPECTION_EXECUTION',
    sourceTrackId: 'SAMYEONG_V5_WYG_FACSIMILE_WITNESS_ACCESS',
    executionAuthorized: true,
    operations: Object.freeze([
      'CONFIRM_EXACT_SOURCE_EDITION_IDENTITY',
      'ACQUIRE_DIRECT_FACSIMILE_PAGE_IMAGE',
      'VERIFY_PAGE_LOCATOR_AGAINST_IMAGE',
      'COMPARE_INDEXED_TRANSCRIPTION_TO_IMAGE',
      'INSPECT_BOUNDED_FULL_LOCAL_CONTEXT',
      'CLASSIFY_HISTORICAL_METHOD_INGREDIENTS',
      'EVALUATE_SOURCE_BOUND_CURRENT_T5_WEALTH_CORRESPONDENCE',
      'DISCOVER_INDEPENDENT_NORMATIVE_CORROBORATION',
      'VERIFY_NO_SILENT_COMPETING_METHOD_IMPORT',
    ] as const satisfies readonly RelationshipSpouseT8BridgeExecutionOperation[]),
    evidenceContract: evidenceContract(true, true, true),
    allowedResultDispositions: Object.freeze([
      'QUALIFYING_EVIDENCE_ACQUIRED',
      'PARTIAL_EVIDENCE_ACQUIRED',
      'ACCESS_BLOCKED',
      'PRIMARY_WITNESS_MISMATCH',
      'CURRENT_T5_CORRESPONDENCE_NOT_ESTABLISHED',
      'METHOD_INCOMPATIBLE',
      'MODERN_SCOPE_INCOMPATIBLE',
      'NO_INDEPENDENT_CORROBORATION_FOUND',
    ] as const satisfies readonly RelationshipSpouseT8BridgeExecutionResultDisposition[]),
    authorityAcceptanceOnCompletion: false,
    authorityGapClosureOnCompletion: false,
    spouseT8AuthoringOnCompletion: false,
    currentRelationshipT6CreationOnCompletion: false,
  }),
  Object.freeze({
    taskId: 'SAMYEONG_V6_OFFICER_WEALTH_FACSIMILE_WITNESS_INSPECTION_EXECUTION',
    sourceTrackId: 'SAMYEONG_V6_WYG_OFFICER_WEALTH_FACSIMILE_WITNESS_ACCESS',
    executionAuthorized: true,
    operations: Object.freeze([
      'CONFIRM_EXACT_SOURCE_EDITION_IDENTITY',
      'ACQUIRE_DIRECT_FACSIMILE_PAGE_IMAGE',
      'VERIFY_PAGE_LOCATOR_AGAINST_IMAGE',
      'COMPARE_INDEXED_TRANSCRIPTION_TO_IMAGE',
      'INSPECT_BOUNDED_FULL_LOCAL_CONTEXT',
      'CLASSIFY_HISTORICAL_METHOD_INGREDIENTS',
      'EVALUATE_SOURCE_BOUND_CURRENT_T5_OFFICER_CORRESPONDENCE',
      'EVALUATE_SOURCE_BOUND_CURRENT_T5_WEALTH_CORRESPONDENCE',
      'DISCOVER_INDEPENDENT_NORMATIVE_CORROBORATION',
      'VERIFY_NO_SILENT_COMPETING_METHOD_IMPORT',
    ] as const satisfies readonly RelationshipSpouseT8BridgeExecutionOperation[]),
    evidenceContract: evidenceContract(true, true, true),
    allowedResultDispositions: Object.freeze([
      'QUALIFYING_EVIDENCE_ACQUIRED',
      'PARTIAL_EVIDENCE_ACQUIRED',
      'ACCESS_BLOCKED',
      'PRIMARY_WITNESS_MISMATCH',
      'CURRENT_T5_CORRESPONDENCE_NOT_ESTABLISHED',
      'METHOD_INCOMPATIBLE',
      'MODERN_SCOPE_INCOMPATIBLE',
      'NO_INDEPENDENT_CORROBORATION_FOUND',
    ] as const satisfies readonly RelationshipSpouseT8BridgeExecutionResultDisposition[]),
    authorityAcceptanceOnCompletion: false,
    authorityGapClosureOnCompletion: false,
    spouseT8AuthoringOnCompletion: false,
    currentRelationshipT6CreationOnCompletion: false,
  }),
  Object.freeze({
    taskId: 'MODERN_SPOUSE_PRODUCT_SCOPE_ADJUDICATION_EXECUTION',
    sourceTrackId: 'MODERN_SPOUSE_PRODUCT_SCOPE_ADJUDICATION',
    executionAuthorized: true,
    operations: Object.freeze([
      'DISTINGUISH_HISTORICAL_SOURCE_MEANING_FROM_MODERN_PRODUCT_APPLICABILITY',
      'ADJUDICATE_GENDER_NEUTRAL_SPOUSE_APPLICABILITY',
      'VERIFY_NO_USER_OR_PARTNER_SEX_INFERENCE',
      'VERIFY_NO_PARTNER_ATTRIBUTE_OR_OUTCOME_PROMOTION',
      'VERIFY_NO_COMPATIBILITY_OR_TIMING_PROMOTION',
      'VERIFY_NO_SOURCE_MEANING_REWRITE',
      'VERIFY_NO_SILENT_COMPETING_METHOD_IMPORT',
    ] as const satisfies readonly RelationshipSpouseT8BridgeExecutionOperation[]),
    evidenceContract: evidenceContract(false, false, false),
    allowedResultDispositions: Object.freeze([
      'QUALIFYING_EVIDENCE_ACQUIRED',
      'PARTIAL_EVIDENCE_ACQUIRED',
      'MODERN_SCOPE_INCOMPATIBLE',
      'MODERN_SCOPE_REQUIRES_ADDITIONAL_AUTHORITY',
    ] as const satisfies readonly RelationshipSpouseT8BridgeExecutionResultDisposition[]),
    authorityAcceptanceOnCompletion: false,
    authorityGapClosureOnCompletion: false,
    spouseT8AuthoringOnCompletion: false,
    currentRelationshipT6CreationOnCompletion: false,
  }),
] as const satisfies readonly RelationshipSpouseT8BridgeExecutionTask[]);

function contentAddressedSourceAccessIdentityValid(
  sourceAccess: RelationshipSpouseT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReviewReport,
): boolean {
  const { reviewId, ...material } = sourceAccess;
  return (
    reviewId ===
    `relationship_spouse_t8_current_bridge_source_access_requirements_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactSourceAccessBoundaryAccepted(
  sourceAccess: RelationshipSpouseT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReviewReport,
): boolean {
  return (
    contentAddressedSourceAccessIdentityValid(sourceAccess) &&
    sourceAccess.reviewVersion ===
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_TARGETED_SOURCE_ACCESS_REQUIREMENTS_REVIEW_VERSION &&
    sourceAccess.status ===
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_TARGETED_SOURCE_ACCESS_REQUIREMENTS_REVIEW' &&
    sourceAccess.decision ===
      'ACCESS_AND_SCOPE_REMEDIATION_CLASSIFIED_THREE_ACTIVE_PRIMARY_TRACKS_NO_AUTHORITY_ACQUIRED_ALL_FIVE_GAPS_OPEN' &&
    sourceAccess.exactDiscoveryBoundaryAccepted &&
    sourceAccess.remediationTrackCount === 5 &&
    deterministicContentHash(sourceAccess.remediationTracks) ===
      deterministicContentHash(RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_REMEDIATION_TRACKS) &&
    sourceAccess.activePrimaryTrackCount === 3 &&
    deterministicContentHash(sourceAccess.activePrimaryTrackIds) ===
      deterministicContentHash(EXECUTABLE_TRACK_IDS) &&
    sourceAccess.facsimileAccessTrackCount === 2 &&
    sourceAccess.samyeongV5WygAccessTargetKnown &&
    sourceAccess.samyeongV5FacsimileImageInspectionRequired &&
    sourceAccess.samyeongV5FullLocalContextRequired &&
    sourceAccess.samyeongV5IndependentNormativeCorroborationStillRequired &&
    sourceAccess.samyeongV5AccessSuccessWouldAutoAdmitAuthority === false &&
    sourceAccess.samyeongV6WygAccessTargetKnown &&
    sourceAccess.samyeongV6FacsimileImageInspectionRequired &&
    sourceAccess.samyeongV6OfficerCorrespondenceMustBeReevaluatedAfterImageInspection &&
    sourceAccess.samyeongV6WealthCorrespondenceMustBeReevaluatedAfterImageInspection &&
    sourceAccess.samyeongV6AccessSuccessWouldAutoEstablishCorrespondence === false &&
    sourceAccess.modernSpouseProductScopeAdjudicationRequired &&
    sourceAccess.sourceAccessAloneCanResolveModernProductScope === false &&
    sourceAccess.historicalSexGenderRoleMayBeUniversalized === false &&
    sourceAccess.zipingOrDitianCompetingMethodMayEnterCurrentBridgeAcquisition === false &&
    sourceAccess.currentRelationshipT6InputPathEstablished === false &&
    sourceAccess.relationshipT6RemediationTrackAuthorized === false &&
    sourceAccess.allFiveGapsRemainOpen &&
    sourceAccess.authorityAcquiredByThisGate === false &&
    sourceAccess.authorityGapClosedByThisGate === false &&
    sourceAccess.spouseT8RuleAuthoringAuthorized === false &&
    sourceAccess.productionPromotionAuthorized === false &&
    sourceAccess.controlsFrozen &&
    sourceAccess.controlCount === 14 &&
    deterministicContentHash(sourceAccess.controlIds) ===
      deterministicContentHash(RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_SOURCE_ACCESS_CONTROL_IDS) &&
    sourceAccess.recommendedNextGate ===
      'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_READINESS_REVIEW'
  );
}

function finalized(
  material: Omit<
    RelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReviewReport,
    'reviewId'
  >,
): RelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReviewReport {
  return {
    reviewId: `relationship_spouse_t8_current_bridge_active_remediation_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildRelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReview(
  sourceAccess: RelationshipSpouseT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReviewReport,
): RelationshipSpouseT8CurrentT5T6SemanticBridgeActiveRemediationExecutionReadinessReviewReport {
  const accepted = exactSourceAccessBoundaryAccepted(sourceAccess);

  return finalized({
    reviewVersion:
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_READINESS'
      : 'UPSTREAM_SOURCE_ACCESS_REQUIREMENTS_BOUNDARY_INVALID',
    decision: accepted
      ? 'THREE_ACTIVE_PRIMARY_REMEDIATION_TASKS_EXECUTION_READY_EVIDENCE_ONLY_NO_AUTHORITY_ACQUIRED'
      : 'ACTIVE_REMEDIATION_EXECUTION_NOT_READY',
    upstreamSourceAccessReviewId: sourceAccess.reviewId,
    exactSourceAccessBoundaryAccepted: accepted,
    domain: 'relationship',
    subcategory: 'spouse',
    temporalScope: 'natal',
    statusClass: 'research',
    executionTasks: accepted
      ? RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_TASKS
      : Object.freeze([]),
    executionTaskCount: accepted ? 3 : 0,
    executableTrackIds: accepted ? EXECUTABLE_TRACK_IDS : Object.freeze([]),
    executableTrackCount: accepted ? 3 : 0,
    samyeongV5FacsimileInspectionExecutionReady: accepted,
    samyeongV5DirectImageRequired: accepted,
    samyeongV5AccessBlockedMayBeRecordedWithoutFallback: accepted,
    samyeongV5IndependentCorroborationDiscoveryRequired: accepted,
    samyeongV5ExistingWealthCorrespondenceAutoAcceptedOnImageMatch: false,
    samyeongV6FacsimileInspectionExecutionReady: accepted,
    samyeongV6DirectImageRequired: accepted,
    samyeongV6AccessBlockedMayBeRecordedWithoutFallback: accepted,
    samyeongV6OfficerCorrespondenceAutoAcceptedOnImageMatch: false,
    samyeongV6WealthCorrespondenceAutoAcceptedOnImageMatch: false,
    modernSpouseScopeAdjudicationExecutionReady: accepted,
    modernScopeMayRewriteHistoricalSourceMeaning: false,
    modernScopeMayInferUserOrPartnerSex: false,
    modernScopeMayPromotePartnerAttributesOrOutcomes: false,
    modernScopeMayPromoteCompatibilityOrTiming: false,
    modernScopeIncompatibleMayBeRecordedWithoutFallback: accepted,
    negativeEvidencePreservedAsFirstClassResult: accepted,
    tasksMayRunIndependently: accepted,
    crossTaskStitchingAuthorized: false,
    secondaryDitianClarificationExecutionAuthorized: false,
    competingHistoricalMethodExecutionAuthorized: false,
    currentRelationshipT6InputPathEstablished: false,
    currentRelationshipT6ExecutionTaskCreated: false,
    allFiveGapsRemainOpen: true,
    unresolvedGapIds: Object.freeze([...sourceAccess.unresolvedGapIds]),
    sourceAccessPerformedByThisGate: false,
    scopeAdjudicationPerformedByThisGate: false,
    authorityAcquiredByThisGate: false,
    authorityGapClosedByThisGate: false,
    spouseT8RuleAuthoringAuthorized: false,
    spouseT8ClaimTypeCreationAuthorized: false,
    spouseInterpretationPackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    compatibilityAuthorityAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: accepted
      ? RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted ? 16 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      sourceAccessesPerformed: 0,
      scopeAdjudicationsPerformed: 0,
      searchExecutionsPerformed: 0,
      evidenceRecordsCreated: 0,
      candidatesRegistered: 0,
      authorityCandidatesAccepted: 0,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate: accepted
      ? 'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_EVIDENCE'
      : 'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_TARGETED_SOURCE_ACCESS_REQUIREMENTS_REVIEW',
  });
}
