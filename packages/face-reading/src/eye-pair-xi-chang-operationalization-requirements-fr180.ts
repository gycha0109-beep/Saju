import { FACE_CALIBRATION_EVIDENCE_RESEARCH_V0 } from './calibration-authority.js';
import { FACE_NOSE_BRIDGE_CALIBRATION_PROTOCOL_RESEARCH_V0 } from './calibration-protocol.js';
import {
  assertIssuedDarumaEyeMorphologySourceReviewFR176,
  issueDarumaEyeMorphologySourceReviewFR176,
} from './daruma-eye-morphology-source-review-fr176.js';
import {
  assertIssuedEyePairTraditionalSourceLineageDirectPassageBindingFR175,
  issueEyePairTraditionalSourceLineageDirectPassageBindingFR175,
} from './eye-pair-traditional-source-lineage-direct-passage-binding-fr175.js';
import {
  assertIssuedEyePairDirectSourceMorphologyRepresentabilityReassessmentFR179,
  FR179_NEXT_FRONTIER,
  FR179_VERDICT,
  issueEyePairDirectSourceMorphologyRepresentabilityReassessmentFR179,
} from './eye-pair-direct-source-morphology-representability-reassessment-fr179.js';
import { FaceAuthorityValidationError } from './validation.js';

const X_SPAN_REF = 'neutral.eye_pair.metric_3d.mean_cycle_x_span_to_full_mesh_x_span_ratio@0.1.0' as const;
const Y_TO_X_REF = 'neutral.eye_pair.metric_3d.mean_cycle_y_to_x_span_ratio@0.1.0' as const;

export const FR180_RECORD_ID =
  'research.face_reading.eye_pair.xi_chang_source_authorized_operationalization_requirements.fr180' as const;
export const FR180_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr180-eye-pair-xi-chang-operationalization-requirements.md' as const;
export const FR180_VERDICT =
  'OPERATIONALIZATION_REQUIREMENTS_DEFINED_TRADITIONAL_BINDING_NOT_ADMITTED' as const;
export const FR180_NEXT_FRONTIER =
  'acquire_and_pin_exact_fr175_monitoring_officer_eye_passage_scan_page_before_any_xi_chang_calibration' as const;

export const FR180_REQUIRED_CALIBRATION_EVIDENCE_CLASSES = Object.freeze([
  'repeat_capture_stability',
  'blinded_expert_operationalization',
  'threshold_selection_result',
] as const);

export const FR180_PROHIBITED_SHORTCUTS = Object.freeze([
  'y_to_x_ratio_to_traditional_xi_without_governed_mapping',
  'relative_x_span_to_traditional_chang_without_governed_mapping',
  'source_wording_to_metric_directionality',
  'source_wording_to_machine_threshold',
  'percentile_choice_without_governed_calibration_authority',
  'reference_population_choice_without_governed_calibration_authority',
  'two_unbound_neutral_metrics_to_compound_xi_er_chang',
  'partial_clause_geometry_to_full_clause_binding',
  'traditional_ji_from_neutral_geometry',
  'traditional_cun_from_normalized_ratio',
  'individual_eye_asymmetry_from_role_invariant_pair_metric',
] as const);

export interface EyePairXiChangOperationalizationRequirementsFR180V1 {
  readonly schemaVersion: 'fr180-eye-pair-xi-chang-operationalization-requirements-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR180_RECORD_ID;
  readonly authorityState: 'xi_chang_operationalization_requirements_reviewed_no_binding_admitted';
  readonly upstreamAuthority: {
    readonly fr179Verdict: typeof FR179_VERDICT;
    readonly fr179NextFrontier: typeof FR179_NEXT_FRONTIER;
    readonly fr175DirectPassageReviewed: true;
    readonly fr175ExactEyePassageScanPagePinned: false;
    readonly fr175ScanCheckedPromotionAuthorized: false;
    readonly fr176SelectedClausesReviewed: true;
    readonly fr176ExactDarumaEyeScanPagePinned: false;
    readonly fr176ScanCheckedPromotionAuthorized: false;
  };
  readonly currentNeutralObservationSurface: {
    readonly xiCandidateMetricRef: typeof Y_TO_X_REF;
    readonly changCandidateMetricRef: typeof X_SPAN_REF;
    readonly coordinateFrame: 'canonical_aligned_right_handed_metric_3d';
    readonly roleInvariantOverTwoEyeCycles: true;
    readonly individualEyeValuesExposed: false;
    readonly physiologicalApertureInterpretationAllowed: false;
    readonly physicalAnthropometricInterpretationAllowed: false;
  };
  readonly sourcePromotionRequirements: {
    readonly sourceIdentityResolved: true;
    readonly exactFR175EyePassageScanPageRequired: true;
    readonly exactFR175EyePassageScanPageCurrentlyPinned: false;
    readonly exactFR176DarumaEyeScanPageRequired: true;
    readonly exactFR176DarumaEyeScanPageCurrentlyPinned: false;
    readonly scanCheckedSourceRequiredBeforeProductionCalibration: true;
    readonly translationMaySubstituteForDirectSource: false;
    readonly secondarySourceMaySubstituteForDirectSource: false;
  };
  readonly xiRequirements: {
    readonly traditionalConcept: '細';
    readonly candidateMetricRef: typeof Y_TO_X_REF;
    readonly neutralMetricAvailable: true;
    readonly sourceAuthorizedMetricRelationRequired: true;
    readonly sourceAuthorizedMetricRelationCurrentlyIssued: false;
    readonly metricDirectionalityMustBeGoverned: true;
    readonly metricDirectionalityCurrentlyIssued: false;
    readonly stableCriterionIdentityRequired: true;
    readonly stableCriterionIdentityCurrentlyIssued: false;
    readonly criterionSpecificCalibrationEvidenceRequired: true;
    readonly criterionSpecificCalibrationProtocolRequired: true;
    readonly calibratedDecisionRuleRequired: true;
    readonly traditionalBindingDecision: 'not_admitted';
  };
  readonly changRequirements: {
    readonly traditionalConcept: '長';
    readonly candidateMetricRef: typeof X_SPAN_REF;
    readonly neutralMetricAvailable: true;
    readonly sourceAuthorizedMetricRelationRequired: true;
    readonly sourceAuthorizedMetricRelationCurrentlyIssued: false;
    readonly metricDirectionalityMustBeGoverned: true;
    readonly metricDirectionalityCurrentlyIssued: false;
    readonly stableCriterionIdentityRequired: true;
    readonly stableCriterionIdentityCurrentlyIssued: false;
    readonly criterionSpecificCalibrationEvidenceRequired: true;
    readonly criterionSpecificCalibrationProtocolRequired: true;
    readonly calibratedDecisionRuleRequired: true;
    readonly normalizedRatioMeansTraditionalAbsoluteLength: false;
    readonly traditionalBindingDecision: 'not_admitted';
  };
  readonly compoundRequirements: {
    readonly sourceClause: '細而長';
    readonly xiBindingMustBeAdmittedFirst: true;
    readonly changBindingMustBeAdmittedFirst: true;
    readonly sourceAuthorizedCompositionRuleRequired: true;
    readonly xiBindingCurrentlyAdmitted: false;
    readonly changBindingCurrentlyAdmitted: false;
    readonly sourceAuthorizedCompositionRuleCurrentlyIssued: false;
    readonly simpleBooleanAndOfFutureThresholdsAuthorized: false;
    readonly selectiveSemanticDecompositionAuthorized: false;
    readonly compoundBindingDecision: 'not_admitted';
  };
  readonly calibrationFramework: {
    readonly evidenceRegistryId: typeof FACE_CALIBRATION_EVIDENCE_RESEARCH_V0.registryId;
    readonly evidenceRegistryVersion: typeof FACE_CALIBRATION_EVIDENCE_RESEARCH_V0.version;
    readonly requiredEvidenceClasses: typeof FR180_REQUIRED_CALIBRATION_EVIDENCE_CLASSES;
    readonly eyePairCoveredEvidenceCount: 0;
    readonly eyePairCoveredEvidenceRefs: readonly [];
    readonly protocolRegistryId: typeof FACE_NOSE_BRIDGE_CALIBRATION_PROTOCOL_RESEARCH_V0.registryId;
    readonly protocolRegistryVersion: typeof FACE_NOSE_BRIDGE_CALIBRATION_PROTOCOL_RESEARCH_V0.version;
    readonly eyePairCaptureProtocolCount: 0;
    readonly eyePairLabelingProtocolCount: 0;
    readonly eyePairStudyCount: 0;
    readonly participantSpecificIdentityMatchingRequired: false;
    readonly reviewerBlindingRequiredForFutureOperationalization: true;
    readonly participantLevelDatasetSplitRequired: true;
    readonly thresholdSelectionMayReadHoldout: false;
  };
  readonly unresolvedAuthorityRequirements: readonly string[];
  readonly prohibitedShortcuts: typeof FR180_PROHIBITED_SHORTCUTS;
  readonly decisionBoundary: {
    readonly requirementsReviewCompleted: true;
    readonly traditionalXiOperationalized: false;
    readonly traditionalChangOperationalized: false;
    readonly compoundXiErChangOperationalized: false;
    readonly traditionalJiOperationalized: false;
    readonly traditionalCunMappingIssued: false;
    readonly metricDirectionalityIssued: false;
    readonly criterionIdentityIssued: false;
    readonly calibrationEvidenceIssuedByThisPhase: false;
    readonly calibrationProtocolIssuedByThisPhase: false;
    readonly thresholdIssued: false;
    readonly classifierIssued: false;
    readonly scoreIssued: false;
    readonly rankIssued: false;
    readonly morphologyProduced: false;
    readonly criterionStatesIssued: 0;
    readonly structuredClaimsIssued: 0;
    readonly boundedNarrativesIssued: 0;
    readonly productionRuleAuthorized: false;
    readonly traditionalSemanticAuthorityPromoted: false;
  };
  readonly privacyBoundary: {
    readonly participantDataCollected: false;
    readonly participantImageAccepted: false;
    readonly rawProviderResponseAccepted: false;
    readonly rawLandmarkSetAccepted: false;
    readonly metricValuesPersisted: false;
    readonly faceEmbeddingAccepted: false;
    readonly identityTemplateAccepted: false;
    readonly biometricIdentityMatchingPerformed: false;
  };
  readonly verdict: typeof FR180_VERDICT;
  readonly researchNoteRef: typeof FR180_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR180_NEXT_FRONTIER;
}

const UNRESOLVED_REQUIREMENTS = Object.freeze([
  'fr175_exact_eye_passage_scan_page_not_pinned',
  'fr176_exact_daruma_eye_scan_page_not_pinned',
  'xi_metric_to_source_concept_mapping_not_authorized',
  'xi_metric_directionality_not_governed',
  'xi_stable_criterion_identity_not_issued',
  'xi_criterion_specific_calibration_evidence_absent',
  'xi_criterion_specific_calibration_protocol_absent',
  'xi_calibrated_decision_rule_absent',
  'chang_metric_to_source_concept_mapping_not_authorized',
  'chang_metric_directionality_not_governed',
  'chang_stable_criterion_identity_not_issued',
  'chang_criterion_specific_calibration_evidence_absent',
  'chang_criterion_specific_calibration_protocol_absent',
  'chang_calibrated_decision_rule_absent',
  'compound_xi_er_chang_composition_rule_not_authorized',
] as const);

const ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-180 ${message}`);
}

function validateUpstreamAuthority(): void {
  const fr175 = issueEyePairTraditionalSourceLineageDirectPassageBindingFR175();
  assertIssuedEyePairTraditionalSourceLineageDirectPassageBindingFR175(fr175);
  if (
    fr175.source.directPassage !== '眼須要含藏不露。黑白分明。瞳子端定。光彩射人。或細長極寸。乃為監察官成。'
    || fr175.source.directBodyReviewed !== true
    || fr175.locator.exactEyePassageScanPage !== null
    || fr175.locator.exactEyePassageScanPageResolved !== false
    || fr175.locator.scanCheckedEyePassagePromotionAuthorized !== false
  ) fail('FR-175 direct-source provenance boundary drift.');

  const fr176 = issueDarumaEyeMorphologySourceReviewFR176();
  assertIssuedDarumaEyeMorphologySourceReviewFR176(fr176);
  if (
    !fr176.source.directSelectedWitnessClauses.includes('細而長')
    || !fr176.source.directSelectedWitnessClauses.includes('目長一寸')
    || fr176.source.directSelectedWitnessClausesReviewed !== true
    || fr176.locator.exactDarumaEyeScanPage !== null
    || fr176.locator.exactDarumaEyeScanPageResolved !== false
    || fr176.locator.scanCheckedDarumaEyePassagePromotionAuthorized !== false
  ) fail('FR-176 selected-source provenance boundary drift.');

  const fr179 = issueEyePairDirectSourceMorphologyRepresentabilityReassessmentFR179();
  assertIssuedEyePairDirectSourceMorphologyRepresentabilityReassessmentFR179(fr179);
  if (
    fr179.verdict !== FR179_VERDICT
    || fr179.nextFrontier !== FR179_NEXT_FRONTIER
    || fr179.representabilitySummary.directlyRepresentableClauseCount !== 0
    || fr179.representabilitySummary.traditionalMetricBindingsIssued !== 0
    || fr179.representabilitySummary.calibrationRefsIssued !== 0
    || fr179.representabilitySummary.thresholdRefsIssued !== 0
    || fr179.authorityBoundary.neutralYToXRatioMeansTraditionalXi !== false
    || fr179.authorityBoundary.relativeXSpanMeansTraditionalChang !== false
    || fr179.authorityBoundary.neutralMetricPairMeansTraditionalXiErChang !== false
    || fr179.authorityBoundary.directSourceTextMeansMachineThreshold !== false
    || fr179.authorityBoundary.traditionalSemanticAuthorityPromoted !== false
  ) fail('FR-179 representability boundary drift.');

  if (FR179_NEXT_FRONTIER !== 'review_source_authorized_operationalization_requirements_for_eye_pair_xi_chang_without_inventing_thresholds_or_cun_mapping') {
    fail('FR-179 next-frontier authority drift.');
  }
}

function auditCurrentCalibrationCoverage(): EyePairXiChangOperationalizationRequirementsFR180V1['calibrationFramework'] {
  const eyeMetricRefs = new Set<string>([X_SPAN_REF, Y_TO_X_REF]);
  const eyeEvidence = FACE_CALIBRATION_EVIDENCE_RESEARCH_V0.evidence.filter((item) =>
    item.metricRefs.some((ref) => eyeMetricRefs.has(ref)),
  );
  const eyeCapture = FACE_NOSE_BRIDGE_CALIBRATION_PROTOCOL_RESEARCH_V0.captureProtocols.filter((item) =>
    item.metricRefs.some((ref) => eyeMetricRefs.has(ref)),
  );
  const eyeLabeling = FACE_NOSE_BRIDGE_CALIBRATION_PROTOCOL_RESEARCH_V0.labelingProtocols.filter((item) =>
    item.criterionId.includes('eye') || item.criterionId.includes('xi') || item.criterionId.includes('chang'),
  );
  const eyeStudies = FACE_NOSE_BRIDGE_CALIBRATION_PROTOCOL_RESEARCH_V0.studies.filter((item) =>
    eyeMetricRefs.has(item.metricRef) || item.criterionId.includes('eye') || item.criterionId.includes('xi') || item.criterionId.includes('chang'),
  );
  if (eyeEvidence.length !== 0 || eyeCapture.length !== 0 || eyeLabeling.length !== 0 || eyeStudies.length !== 0) {
    fail('current calibration registries now contain Eye-Pair Xi/Chang coverage; FR-180 must be re-reviewed.');
  }
  return Object.freeze({
    evidenceRegistryId: FACE_CALIBRATION_EVIDENCE_RESEARCH_V0.registryId,
    evidenceRegistryVersion: FACE_CALIBRATION_EVIDENCE_RESEARCH_V0.version,
    requiredEvidenceClasses: FR180_REQUIRED_CALIBRATION_EVIDENCE_CLASSES,
    eyePairCoveredEvidenceCount: 0 as const,
    eyePairCoveredEvidenceRefs: Object.freeze([] as const),
    protocolRegistryId: FACE_NOSE_BRIDGE_CALIBRATION_PROTOCOL_RESEARCH_V0.registryId,
    protocolRegistryVersion: FACE_NOSE_BRIDGE_CALIBRATION_PROTOCOL_RESEARCH_V0.version,
    eyePairCaptureProtocolCount: 0 as const,
    eyePairLabelingProtocolCount: 0 as const,
    eyePairStudyCount: 0 as const,
    participantSpecificIdentityMatchingRequired: false as const,
    reviewerBlindingRequiredForFutureOperationalization: true as const,
    participantLevelDatasetSplitRequired: true as const,
    thresholdSelectionMayReadHoldout: false as const,
  });
}

export function issueEyePairXiChangOperationalizationRequirementsFR180(): EyePairXiChangOperationalizationRequirementsFR180V1 {
  validateUpstreamAuthority();
  const calibrationFramework = auditCurrentCalibrationCoverage();
  const result: EyePairXiChangOperationalizationRequirementsFR180V1 = Object.freeze({
    schemaVersion: 'fr180-eye-pair-xi-chang-operationalization-requirements-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR180_RECORD_ID,
    authorityState: 'xi_chang_operationalization_requirements_reviewed_no_binding_admitted' as const,
    upstreamAuthority: Object.freeze({
      fr179Verdict: FR179_VERDICT,
      fr179NextFrontier: FR179_NEXT_FRONTIER,
      fr175DirectPassageReviewed: true as const,
      fr175ExactEyePassageScanPagePinned: false as const,
      fr175ScanCheckedPromotionAuthorized: false as const,
      fr176SelectedClausesReviewed: true as const,
      fr176ExactDarumaEyeScanPagePinned: false as const,
      fr176ScanCheckedPromotionAuthorized: false as const,
    }),
    currentNeutralObservationSurface: Object.freeze({
      xiCandidateMetricRef: Y_TO_X_REF,
      changCandidateMetricRef: X_SPAN_REF,
      coordinateFrame: 'canonical_aligned_right_handed_metric_3d' as const,
      roleInvariantOverTwoEyeCycles: true as const,
      individualEyeValuesExposed: false as const,
      physiologicalApertureInterpretationAllowed: false as const,
      physicalAnthropometricInterpretationAllowed: false as const,
    }),
    sourcePromotionRequirements: Object.freeze({
      sourceIdentityResolved: true as const,
      exactFR175EyePassageScanPageRequired: true as const,
      exactFR175EyePassageScanPageCurrentlyPinned: false as const,
      exactFR176DarumaEyeScanPageRequired: true as const,
      exactFR176DarumaEyeScanPageCurrentlyPinned: false as const,
      scanCheckedSourceRequiredBeforeProductionCalibration: true as const,
      translationMaySubstituteForDirectSource: false as const,
      secondarySourceMaySubstituteForDirectSource: false as const,
    }),
    xiRequirements: Object.freeze({
      traditionalConcept: '細' as const,
      candidateMetricRef: Y_TO_X_REF,
      neutralMetricAvailable: true as const,
      sourceAuthorizedMetricRelationRequired: true as const,
      sourceAuthorizedMetricRelationCurrentlyIssued: false as const,
      metricDirectionalityMustBeGoverned: true as const,
      metricDirectionalityCurrentlyIssued: false as const,
      stableCriterionIdentityRequired: true as const,
      stableCriterionIdentityCurrentlyIssued: false as const,
      criterionSpecificCalibrationEvidenceRequired: true as const,
      criterionSpecificCalibrationProtocolRequired: true as const,
      calibratedDecisionRuleRequired: true as const,
      traditionalBindingDecision: 'not_admitted' as const,
    }),
    changRequirements: Object.freeze({
      traditionalConcept: '長' as const,
      candidateMetricRef: X_SPAN_REF,
      neutralMetricAvailable: true as const,
      sourceAuthorizedMetricRelationRequired: true as const,
      sourceAuthorizedMetricRelationCurrentlyIssued: false as const,
      metricDirectionalityMustBeGoverned: true as const,
      metricDirectionalityCurrentlyIssued: false as const,
      stableCriterionIdentityRequired: true as const,
      stableCriterionIdentityCurrentlyIssued: false as const,
      criterionSpecificCalibrationEvidenceRequired: true as const,
      criterionSpecificCalibrationProtocolRequired: true as const,
      calibratedDecisionRuleRequired: true as const,
      normalizedRatioMeansTraditionalAbsoluteLength: false as const,
      traditionalBindingDecision: 'not_admitted' as const,
    }),
    compoundRequirements: Object.freeze({
      sourceClause: '細而長' as const,
      xiBindingMustBeAdmittedFirst: true as const,
      changBindingMustBeAdmittedFirst: true as const,
      sourceAuthorizedCompositionRuleRequired: true as const,
      xiBindingCurrentlyAdmitted: false as const,
      changBindingCurrentlyAdmitted: false as const,
      sourceAuthorizedCompositionRuleCurrentlyIssued: false as const,
      simpleBooleanAndOfFutureThresholdsAuthorized: false as const,
      selectiveSemanticDecompositionAuthorized: false as const,
      compoundBindingDecision: 'not_admitted' as const,
    }),
    calibrationFramework,
    unresolvedAuthorityRequirements: UNRESOLVED_REQUIREMENTS,
    prohibitedShortcuts: FR180_PROHIBITED_SHORTCUTS,
    decisionBoundary: Object.freeze({
      requirementsReviewCompleted: true as const,
      traditionalXiOperationalized: false as const,
      traditionalChangOperationalized: false as const,
      compoundXiErChangOperationalized: false as const,
      traditionalJiOperationalized: false as const,
      traditionalCunMappingIssued: false as const,
      metricDirectionalityIssued: false as const,
      criterionIdentityIssued: false as const,
      calibrationEvidenceIssuedByThisPhase: false as const,
      calibrationProtocolIssuedByThisPhase: false as const,
      thresholdIssued: false as const,
      classifierIssued: false as const,
      scoreIssued: false as const,
      rankIssued: false as const,
      morphologyProduced: false as const,
      criterionStatesIssued: 0 as const,
      structuredClaimsIssued: 0 as const,
      boundedNarrativesIssued: 0 as const,
      productionRuleAuthorized: false as const,
      traditionalSemanticAuthorityPromoted: false as const,
    }),
    privacyBoundary: Object.freeze({
      participantDataCollected: false as const,
      participantImageAccepted: false as const,
      rawProviderResponseAccepted: false as const,
      rawLandmarkSetAccepted: false as const,
      metricValuesPersisted: false as const,
      faceEmbeddingAccepted: false as const,
      identityTemplateAccepted: false as const,
      biometricIdentityMatchingPerformed: false as const,
    }),
    verdict: FR180_VERDICT,
    researchNoteRef: FR180_RESEARCH_NOTE_REF,
    nextFrontier: FR180_NEXT_FRONTIER,
  });
  ISSUED.add(result);
  return result;
}

export function assertIssuedEyePairXiChangOperationalizationRequirementsFR180(
  result: EyePairXiChangOperationalizationRequirementsFR180V1,
): void {
  if (!ISSUED.has(result)) fail('requirements review was not issued by the active FR-180 boundary.');
  if (
    result.schemaVersion !== 'fr180-eye-pair-xi-chang-operationalization-requirements-v1'
    || result.artifactVersion !== '0.1.0'
    || result.recordId !== FR180_RECORD_ID
    || result.authorityState !== 'xi_chang_operationalization_requirements_reviewed_no_binding_admitted'
    || result.xiRequirements.candidateMetricRef !== Y_TO_X_REF
    || result.xiRequirements.traditionalBindingDecision !== 'not_admitted'
    || result.changRequirements.candidateMetricRef !== X_SPAN_REF
    || result.changRequirements.normalizedRatioMeansTraditionalAbsoluteLength !== false
    || result.changRequirements.traditionalBindingDecision !== 'not_admitted'
    || result.compoundRequirements.compoundBindingDecision !== 'not_admitted'
    || result.calibrationFramework.requiredEvidenceClasses !== FR180_REQUIRED_CALIBRATION_EVIDENCE_CLASSES
    || result.calibrationFramework.eyePairCoveredEvidenceCount !== 0
    || result.calibrationFramework.eyePairCaptureProtocolCount !== 0
    || result.calibrationFramework.eyePairLabelingProtocolCount !== 0
    || result.calibrationFramework.eyePairStudyCount !== 0
    || result.prohibitedShortcuts !== FR180_PROHIBITED_SHORTCUTS
    || result.decisionBoundary.requirementsReviewCompleted !== true
    || result.decisionBoundary.thresholdIssued !== false
    || result.decisionBoundary.calibrationEvidenceIssuedByThisPhase !== false
    || result.decisionBoundary.productionRuleAuthorized !== false
    || result.decisionBoundary.traditionalSemanticAuthorityPromoted !== false
    || result.privacyBoundary.participantDataCollected !== false
    || result.privacyBoundary.biometricIdentityMatchingPerformed !== false
    || result.verdict !== FR180_VERDICT
    || result.researchNoteRef !== FR180_RESEARCH_NOTE_REF
    || result.nextFrontier !== FR180_NEXT_FRONTIER
  ) fail('Eye-Pair Xi/Chang operationalization-requirements authority drift.');
}
