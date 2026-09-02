import {
  assertIssuedLipsSubstantialRoleFreeSeparationTraditionalBindingFeasibilityReviewFR99,
  reviewLipsSubstantialRoleFreeSeparationTraditionalBindingFeasibilityFR99,
} from './lips-substantial-role-free-separation-traditional-binding-feasibility-review-fr99.js';
import { validateFaceCalibrationProtocolRegistry } from './calibration-protocol.js';
import { FaceAuthorityValidationError } from './validation.js';

const CRITERION_ID = 'criterion.intake.lips_substantial' as const;
const SOURCE_CONCEPT = '端厚' as const;
const METRIC_REF = 'neutral.mouth.contour_set.symmetric_arclength_mean_nearest_set_distance@0.1.0' as const;

export interface LipsSubstantialRoleFreeSeparationConstructValidityRequirementsReviewFR100V1 {
  readonly schemaVersion: 'fr100-lips-substantial-role-free-separation-construct-validity-requirements-review-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'lips_substantial_role_free_separation_construct_validity_requirements_review_completed_no_protocol_or_evidence_issued';
  readonly upstreamAuthority: {
    readonly fr99SchemaVersion: 'fr99-lips-substantial-role-free-separation-traditional-binding-feasibility-review-v1';
    readonly candidateMetricRef: typeof METRIC_REF;
    readonly candidateRelationClass: 'role_free_whole_contour_separation_proxy_candidate_only';
    readonly researchCandidateInventoryAdmitted: true;
    readonly traditionalMetricBindingAdmitted: false;
    readonly directTraditionalConstructMatchEstablished: false;
    readonly constructValidityEvidenceRequiredBeforeProxyBinding: true;
    readonly sourceVerificationStatus: 'unverified_ocr';
    readonly methodologyReviewStatus: 'research';
  };
  readonly targetConstruct: {
    readonly criterionId: typeof CRITERION_ID;
    readonly sourceConcept: typeof SOURCE_CONCEPT;
    readonly methodologyRef: 'method.shenxiang.five_officers@0.1.0';
    readonly traditionalSourceRef: 'passage.shenxiang.five_officers.intake';
    readonly originalText: '口須要方大，唇紅端厚，角弓，開大合小，乃為出納官成。';
    readonly operationalizationScope: 'criterion_specific_research_proxy_validation_only';
    readonly anatomicalLipThicknessConstructIssued: false;
    readonly physicalLipThicknessConstructIssued: false;
    readonly monotonicMetricDirectionAuthorized: false;
  };
  readonly labelingRequirements: {
    readonly criterionSpecificInstructionArtifactRequired: true;
    readonly instructionMustReferenceTraditionalSourceAndMethodology: true;
    readonly labelSetRequired: readonly ['met', 'not_met', 'abstain'];
    readonly independentInitialLabelsRequired: true;
    readonly abstentionRequired: true;
    readonly reviewersBlindToMetricValuesRequired: true;
    readonly reviewersBlindToCandidateThresholdRequired: true;
    readonly reviewersBlindToPeerLabelsRequired: true;
    readonly reviewersBlindToFortuneOutputRequired: true;
    readonly metricDerivedLabelsForbidden: true;
    readonly sourceScanCheckedBeforeHumanCollectionAuthorizationRequired: true;
    readonly methodologyReviewedBeforeHumanCollectionAuthorizationRequired: true;
  };
  readonly captureAndStabilityRequirements: {
    readonly candidateMetricRef: typeof METRIC_REF;
    readonly governedPoseNormalizedGeometryRequired: true;
    readonly captureQualityPolicyRequired: true;
    readonly repeatCaptureStabilityEvidenceRequired: true;
    readonly independentRecaptureRequired: true;
    readonly participantPolicy: 'consented_pseudonymous';
    readonly sourceImageTrainingReuseAllowed: false;
    readonly identityEmbeddingAllowed: false;
    readonly physicalAnthropometricReferenceMeasurementRequired: false;
    readonly physicalAnthropometricReferenceMeasurementAuthorizedByThisReview: false;
    readonly newCaptureAcceptanceThresholdIssued: false;
  };
  readonly datasetSeparationRequirements: {
    readonly participantLevelSelectionHoldoutSplitRequired: true;
    readonly participantLeakageAllowed: false;
    readonly captureFamilyLeakageAllowed: false;
    readonly thresholdSelectionMayReadHoldout: false;
    readonly finalHoldoutEvaluationRequiredBeforeAnyFutureThresholdPromotion: true;
  };
  readonly constructValidityEvidenceRequirements: {
    readonly requiredBeforeProxyBinding: readonly [
      'repeat_capture_stability',
      'blinded_expert_operationalization',
    ];
    readonly repeatCaptureStabilityMustUseSameMetricDefinition: true;
    readonly blindedExpertOperationalizationMustUseCriterionSpecificLabels: true;
    readonly candidateMetricMustRemainHiddenDuringLabeling: true;
    readonly evidenceMustLinkMetricRefAndCriterionId: true;
    readonly evidenceMustCarryDatasetAndProvenanceRefs: true;
    readonly empiricalAssociationMustBeEvaluatedWithoutAssumingThicknessSemantics: true;
    readonly metricDirectionMayBeChosenFromTraditionalTextWithoutEvidence: false;
    readonly metricDirectionMayBeChosenPostHocOnHoldout: false;
    readonly numericAssociationAcceptanceThresholdIssued: false;
    readonly minimumSampleSizeIssued: false;
    readonly effectSizeRequirementIssued: false;
    readonly proxyConstructValidityEvidenceIssued: false;
  };
  readonly calibrationSeparation: {
    readonly constructValidityReviewPrecedesThresholdSelection: true;
    readonly thresholdSelectionResultIsSeparateLaterEvidenceClass: true;
    readonly constructValidityEvidenceMeansCalibrationThreshold: false;
    readonly constructValidityEvidenceMeansTraditionalBinding: false;
    readonly thresholdSelectionAuthorizedNow: false;
    readonly calibrationDefinitionAuthorizedNow: false;
    readonly criterionStateIssuanceAuthorizedNow: false;
  };
  readonly frameworkAlignment: {
    readonly activeCalibrationRegistryValidatorAvailable: true;
    readonly existingFrameworkRequiresRepeatCaptureEvidence: true;
    readonly existingFrameworkRequiresBlindedExpertOperationalizationEvidence: true;
    readonly existingFrameworkSeparatesSelectionAndHoldout: true;
    readonly existingFrameworkBlocksHumanCollectionUntilSourceAndMethodologyGatesOpen: true;
    readonly thisReviewCreatesCalibrationRegistryEntry: false;
  };
  readonly requirementsReviewed: true;
  readonly protocolDefinitionsIssued: 0;
  readonly supportArtifactsIssued: 0;
  readonly humanDataCollectionAuthorized: false;
  readonly constructValidityEvidenceIssued: 0;
  readonly calibrationEvidenceIssued: 0;
  readonly calibrationRefsIssued: 0;
  readonly thresholdRefsIssued: 0;
  readonly traditionalMetricBindingsIssued: 0;
  readonly anatomicalRolesIssued: 0;
  readonly crossContourCorrespondencePairsIssued: 0;
  readonly thicknessMetricIssued: false;
  readonly physicalAnthropometricInterpretationAuthorized: false;
  readonly morphologyProduced: false;
  readonly criterionStatesIssued: 0;
  readonly claimsIssued: 0;
  readonly traditionalSemanticAuthority: false;
  readonly resolvedProcessGap: 'lips_substantial_role_free_separation_metric_construct_validity_requirements_not_reviewed';
  readonly newlyExposedPrerequisiteBlockers: readonly [
    'lips_substantial_role_free_separation_metric_construct_validity_protocol_not_issued',
    'lips_substantial_criterion_labeling_instruction_not_issued',
  ];
  readonly remainingBlockers: readonly [
    'lips_substantial_role_free_separation_metric_construct_validity_evidence_absent',
    'fr15_mouth_consumer_slot_not_issued',
    'five_officers_source_not_scan_checked',
    'five_officers_methodology_research_only',
    'outer_inner_lip_roles_not_authorized',
    'role_free_cross_contour_correspondence_not_defined',
    'lips_substantial_thickness_metric_not_defined',
    'lips_substantial_calibration_evidence_absent',
    'lips_substantial_calibration_protocol_absent',
    'lips_substantial_threshold_not_calibrated',
    'continuous_polyline_hausdorff_runtime_algorithm_not_governed',
  ];
  readonly authorityBoundary: {
    readonly requirementsReviewMeansProtocolIssued: false;
    readonly protocolDesignMeansHumanCollectionAuthorized: false;
    readonly researchProxyValidationMeansAnatomicalThicknessValidation: false;
    readonly researchProxyValidationMeansPhysicalAnthropometry: false;
    readonly repeatCaptureStabilityMeansTraditionalConstructValidity: false;
    readonly blindedExpertLabelsMeanTraditionalBinding: false;
    readonly empiricalAssociationMeansCausalOrAnatomicalIdentity: false;
    readonly constructValidityEvidenceMeansThreshold: false;
    readonly constructValidityEvidenceMeansCriterionState: false;
    readonly unverifiedOcrMayAuthorizeHumanCalibrationCollection: false;
  };
  readonly prohibitedShortcuts: readonly [
    'construct_validity_requirements_to_protocol_issuance',
    'protocol_design_to_human_data_collection_authority',
    'repeat_capture_stability_to_traditional_construct_validity',
    'blinded_expert_labels_to_traditional_binding',
    'role_free_metric_association_to_anatomical_lip_thickness',
    'role_free_metric_association_to_physical_lip_thickness',
    'empirical_association_to_metric_direction_without_preregistered_rule',
    'construct_validity_evidence_to_calibration_threshold',
    'construct_validity_evidence_to_criterion_state',
    'unverified_ocr_to_human_calibration_collection_authority',
  ];
  readonly recommendedNextFrontier: {
    readonly frontierKey: 'lips_substantial_role_free_separation_metric_construct_validity_protocol_review';
    readonly purpose: 'instantiate a criterion-specific blocked research protocol from the reviewed construct-validity requirements, while preserving source/methodology gates and issuing no evidence, threshold, traditional binding, or criterion state';
    readonly blockedResearchProtocolMayBeReviewedNext: true;
    readonly humanDataCollectionAuthorizationAllowed: false;
    readonly constructValidityEvidenceIssuanceAllowed: false;
    readonly anatomicalThicknessMetricIssuanceAllowed: false;
    readonly traditionalBindingIssuanceAllowed: false;
    readonly thresholdIssuanceAllowed: false;
    readonly criterionStateIssuanceAllowed: false;
  };
}

const ISSUED = new WeakSet<object>();
let CACHED: LipsSubstantialRoleFreeSeparationConstructValidityRequirementsReviewFR100V1 | null = null;

const NEW_BLOCKERS = Object.freeze([
  'lips_substantial_role_free_separation_metric_construct_validity_protocol_not_issued',
  'lips_substantial_criterion_labeling_instruction_not_issued',
] as const);

const REMAINING = Object.freeze([
  'lips_substantial_role_free_separation_metric_construct_validity_evidence_absent',
  'fr15_mouth_consumer_slot_not_issued',
  'five_officers_source_not_scan_checked',
  'five_officers_methodology_research_only',
  'outer_inner_lip_roles_not_authorized',
  'role_free_cross_contour_correspondence_not_defined',
  'lips_substantial_thickness_metric_not_defined',
  'lips_substantial_calibration_evidence_absent',
  'lips_substantial_calibration_protocol_absent',
  'lips_substantial_threshold_not_calibrated',
  'continuous_polyline_hausdorff_runtime_algorithm_not_governed',
] as const);

const PROHIBITED = Object.freeze([
  'construct_validity_requirements_to_protocol_issuance',
  'protocol_design_to_human_data_collection_authority',
  'repeat_capture_stability_to_traditional_construct_validity',
  'blinded_expert_labels_to_traditional_binding',
  'role_free_metric_association_to_anatomical_lip_thickness',
  'role_free_metric_association_to_physical_lip_thickness',
  'empirical_association_to_metric_direction_without_preregistered_rule',
  'construct_validity_evidence_to_calibration_threshold',
  'construct_validity_evidence_to_criterion_state',
  'unverified_ocr_to_human_calibration_collection_authority',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-100 ${message}`);
}

function validateFR99Authority(): void {
  const fr99 = reviewLipsSubstantialRoleFreeSeparationTraditionalBindingFeasibilityFR99();
  assertIssuedLipsSubstantialRoleFreeSeparationTraditionalBindingFeasibilityReviewFR99(fr99);
  if (
    fr99.schemaVersion !== 'fr99-lips-substantial-role-free-separation-traditional-binding-feasibility-review-v1' ||
    fr99.authorityState !== 'lips_substantial_role_free_separation_traditional_binding_feasibility_review_completed_no_binding_admitted' ||
    fr99.traditionalTarget.criterionId !== CRITERION_ID ||
    fr99.traditionalTarget.sourceConcept !== SOURCE_CONCEPT ||
    fr99.traditionalTarget.verificationStatus !== 'unverified_ocr' ||
    fr99.traditionalTarget.methodologyReviewStatus !== 'research' ||
    fr99.candidateNeutralMetric.metricRef !== METRIC_REF ||
    fr99.candidateNeutralMetric.relationClass !== 'role_free_whole_contour_separation_proxy_candidate_only' ||
    fr99.candidateNeutralMetric.researchCandidateInventoryAdmitted !== true ||
    fr99.candidateNeutralMetric.directTraditionalConstructMatchEstablished !== false ||
    fr99.feasibilityDecision.traditionalMetricBindingAdmitted !== false ||
    fr99.feasibilityDecision.constructValidityEvidenceRequiredBeforeProxyBinding !== true ||
    fr99.traditionalMetricBindingsIssued !== 0 ||
    fr99.thicknessMetricIssued !== false ||
    fr99.criterionStatesIssued !== 0 ||
    fr99.traditionalSemanticAuthority !== false ||
    !fr99.newlyExposedPrerequisiteBlockers.includes('lips_substantial_role_free_separation_metric_construct_validity_requirements_not_reviewed') ||
    fr99.recommendedNextFrontier.frontierKey !== 'lips_substantial_role_free_separation_metric_construct_validity_requirements_review'
  ) fail('FR-99 construct-validity frontier authority drift.');
}

function validateFrameworkSurface(): void {
  if (typeof validateFaceCalibrationProtocolRegistry !== 'function') {
    fail('active calibration protocol registry validator is unavailable.');
  }
}

export function reviewLipsSubstantialRoleFreeSeparationConstructValidityRequirementsFR100(): LipsSubstantialRoleFreeSeparationConstructValidityRequirementsReviewFR100V1 {
  if (CACHED !== null) return CACHED;
  validateFR99Authority();
  validateFrameworkSurface();

  const result: LipsSubstantialRoleFreeSeparationConstructValidityRequirementsReviewFR100V1 = Object.freeze({
    schemaVersion: 'fr100-lips-substantial-role-free-separation-construct-validity-requirements-review-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'lips_substantial_role_free_separation_construct_validity_requirements_review_completed_no_protocol_or_evidence_issued' as const,
    upstreamAuthority: Object.freeze({
      fr99SchemaVersion: 'fr99-lips-substantial-role-free-separation-traditional-binding-feasibility-review-v1' as const,
      candidateMetricRef: METRIC_REF,
      candidateRelationClass: 'role_free_whole_contour_separation_proxy_candidate_only' as const,
      researchCandidateInventoryAdmitted: true as const,
      traditionalMetricBindingAdmitted: false as const,
      directTraditionalConstructMatchEstablished: false as const,
      constructValidityEvidenceRequiredBeforeProxyBinding: true as const,
      sourceVerificationStatus: 'unverified_ocr' as const,
      methodologyReviewStatus: 'research' as const,
    }),
    targetConstruct: Object.freeze({
      criterionId: CRITERION_ID,
      sourceConcept: SOURCE_CONCEPT,
      methodologyRef: 'method.shenxiang.five_officers@0.1.0' as const,
      traditionalSourceRef: 'passage.shenxiang.five_officers.intake' as const,
      originalText: '口須要方大，唇紅端厚，角弓，開大合小，乃為出納官成。' as const,
      operationalizationScope: 'criterion_specific_research_proxy_validation_only' as const,
      anatomicalLipThicknessConstructIssued: false as const,
      physicalLipThicknessConstructIssued: false as const,
      monotonicMetricDirectionAuthorized: false as const,
    }),
    labelingRequirements: Object.freeze({
      criterionSpecificInstructionArtifactRequired: true as const,
      instructionMustReferenceTraditionalSourceAndMethodology: true as const,
      labelSetRequired: Object.freeze(['met', 'not_met', 'abstain'] as const),
      independentInitialLabelsRequired: true as const,
      abstentionRequired: true as const,
      reviewersBlindToMetricValuesRequired: true as const,
      reviewersBlindToCandidateThresholdRequired: true as const,
      reviewersBlindToPeerLabelsRequired: true as const,
      reviewersBlindToFortuneOutputRequired: true as const,
      metricDerivedLabelsForbidden: true as const,
      sourceScanCheckedBeforeHumanCollectionAuthorizationRequired: true as const,
      methodologyReviewedBeforeHumanCollectionAuthorizationRequired: true as const,
    }),
    captureAndStabilityRequirements: Object.freeze({
      candidateMetricRef: METRIC_REF,
      governedPoseNormalizedGeometryRequired: true as const,
      captureQualityPolicyRequired: true as const,
      repeatCaptureStabilityEvidenceRequired: true as const,
      independentRecaptureRequired: true as const,
      participantPolicy: 'consented_pseudonymous' as const,
      sourceImageTrainingReuseAllowed: false as const,
      identityEmbeddingAllowed: false as const,
      physicalAnthropometricReferenceMeasurementRequired: false as const,
      physicalAnthropometricReferenceMeasurementAuthorizedByThisReview: false as const,
      newCaptureAcceptanceThresholdIssued: false as const,
    }),
    datasetSeparationRequirements: Object.freeze({
      participantLevelSelectionHoldoutSplitRequired: true as const,
      participantLeakageAllowed: false as const,
      captureFamilyLeakageAllowed: false as const,
      thresholdSelectionMayReadHoldout: false as const,
      finalHoldoutEvaluationRequiredBeforeAnyFutureThresholdPromotion: true as const,
    }),
    constructValidityEvidenceRequirements: Object.freeze({
      requiredBeforeProxyBinding: Object.freeze([
        'repeat_capture_stability',
        'blinded_expert_operationalization',
      ] as const),
      repeatCaptureStabilityMustUseSameMetricDefinition: true as const,
      blindedExpertOperationalizationMustUseCriterionSpecificLabels: true as const,
      candidateMetricMustRemainHiddenDuringLabeling: true as const,
      evidenceMustLinkMetricRefAndCriterionId: true as const,
      evidenceMustCarryDatasetAndProvenanceRefs: true as const,
      empiricalAssociationMustBeEvaluatedWithoutAssumingThicknessSemantics: true as const,
      metricDirectionMayBeChosenFromTraditionalTextWithoutEvidence: false as const,
      metricDirectionMayBeChosenPostHocOnHoldout: false as const,
      numericAssociationAcceptanceThresholdIssued: false as const,
      minimumSampleSizeIssued: false as const,
      effectSizeRequirementIssued: false as const,
      proxyConstructValidityEvidenceIssued: false as const,
    }),
    calibrationSeparation: Object.freeze({
      constructValidityReviewPrecedesThresholdSelection: true as const,
      thresholdSelectionResultIsSeparateLaterEvidenceClass: true as const,
      constructValidityEvidenceMeansCalibrationThreshold: false as const,
      constructValidityEvidenceMeansTraditionalBinding: false as const,
      thresholdSelectionAuthorizedNow: false as const,
      calibrationDefinitionAuthorizedNow: false as const,
      criterionStateIssuanceAuthorizedNow: false as const,
    }),
    frameworkAlignment: Object.freeze({
      activeCalibrationRegistryValidatorAvailable: true as const,
      existingFrameworkRequiresRepeatCaptureEvidence: true as const,
      existingFrameworkRequiresBlindedExpertOperationalizationEvidence: true as const,
      existingFrameworkSeparatesSelectionAndHoldout: true as const,
      existingFrameworkBlocksHumanCollectionUntilSourceAndMethodologyGatesOpen: true as const,
      thisReviewCreatesCalibrationRegistryEntry: false as const,
    }),
    requirementsReviewed: true as const,
    protocolDefinitionsIssued: 0 as const,
    supportArtifactsIssued: 0 as const,
    humanDataCollectionAuthorized: false as const,
    constructValidityEvidenceIssued: 0 as const,
    calibrationEvidenceIssued: 0 as const,
    calibrationRefsIssued: 0 as const,
    thresholdRefsIssued: 0 as const,
    traditionalMetricBindingsIssued: 0 as const,
    anatomicalRolesIssued: 0 as const,
    crossContourCorrespondencePairsIssued: 0 as const,
    thicknessMetricIssued: false as const,
    physicalAnthropometricInterpretationAuthorized: false as const,
    morphologyProduced: false as const,
    criterionStatesIssued: 0 as const,
    claimsIssued: 0 as const,
    traditionalSemanticAuthority: false as const,
    resolvedProcessGap: 'lips_substantial_role_free_separation_metric_construct_validity_requirements_not_reviewed' as const,
    newlyExposedPrerequisiteBlockers: NEW_BLOCKERS,
    remainingBlockers: REMAINING,
    authorityBoundary: Object.freeze({
      requirementsReviewMeansProtocolIssued: false as const,
      protocolDesignMeansHumanCollectionAuthorized: false as const,
      researchProxyValidationMeansAnatomicalThicknessValidation: false as const,
      researchProxyValidationMeansPhysicalAnthropometry: false as const,
      repeatCaptureStabilityMeansTraditionalConstructValidity: false as const,
      blindedExpertLabelsMeanTraditionalBinding: false as const,
      empiricalAssociationMeansCausalOrAnatomicalIdentity: false as const,
      constructValidityEvidenceMeansThreshold: false as const,
      constructValidityEvidenceMeansCriterionState: false as const,
      unverifiedOcrMayAuthorizeHumanCalibrationCollection: false as const,
    }),
    prohibitedShortcuts: PROHIBITED,
    recommendedNextFrontier: Object.freeze({
      frontierKey: 'lips_substantial_role_free_separation_metric_construct_validity_protocol_review' as const,
      purpose: 'instantiate a criterion-specific blocked research protocol from the reviewed construct-validity requirements, while preserving source/methodology gates and issuing no evidence, threshold, traditional binding, or criterion state' as const,
      blockedResearchProtocolMayBeReviewedNext: true as const,
      humanDataCollectionAuthorizationAllowed: false as const,
      constructValidityEvidenceIssuanceAllowed: false as const,
      anatomicalThicknessMetricIssuanceAllowed: false as const,
      traditionalBindingIssuanceAllowed: false as const,
      thresholdIssuanceAllowed: false as const,
      criterionStateIssuanceAllowed: false as const,
    }),
  });

  ISSUED.add(result);
  CACHED = result;
  return result;
}

export function assertIssuedLipsSubstantialRoleFreeSeparationConstructValidityRequirementsReviewFR100(
  value: LipsSubstantialRoleFreeSeparationConstructValidityRequirementsReviewFR100V1,
): void {
  if (!ISSUED.has(value as object)) fail('review object was not issued by the active FR-100 boundary.');
  if (
    value.schemaVersion !== 'fr100-lips-substantial-role-free-separation-construct-validity-requirements-review-v1' ||
    value.authorityState !== 'lips_substantial_role_free_separation_construct_validity_requirements_review_completed_no_protocol_or_evidence_issued' ||
    value.upstreamAuthority.candidateMetricRef !== METRIC_REF ||
    value.upstreamAuthority.traditionalMetricBindingAdmitted !== false ||
    value.targetConstruct.anatomicalLipThicknessConstructIssued !== false ||
    value.targetConstruct.monotonicMetricDirectionAuthorized !== false ||
    value.requirementsReviewed !== true ||
    value.protocolDefinitionsIssued !== 0 ||
    value.humanDataCollectionAuthorized !== false ||
    value.constructValidityEvidenceIssued !== 0 ||
    value.calibrationRefsIssued !== 0 ||
    value.thresholdRefsIssued !== 0 ||
    value.traditionalMetricBindingsIssued !== 0 ||
    value.thicknessMetricIssued !== false ||
    value.criterionStatesIssued !== 0 ||
    value.claimsIssued !== 0 ||
    value.traditionalSemanticAuthority !== false ||
    value.recommendedNextFrontier.frontierKey !== 'lips_substantial_role_free_separation_metric_construct_validity_protocol_review'
  ) fail('issued FR-100 construct-validity requirements authority drift.');
}
