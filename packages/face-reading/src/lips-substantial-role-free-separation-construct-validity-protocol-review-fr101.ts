import type { FaceCalibrationProtocolRegistry } from './calibration-protocol.js';
import { validateFaceCalibrationProtocolRegistry } from './calibration-protocol.js';
import {
  FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0,
  FACE_FR3_METHOD_REFS_V0,
} from './five-officers-six-fus-research-v0.js';
import {
  assertIssuedLipsSubstantialRoleFreeSeparationConstructValidityRequirementsReviewFR100,
  reviewLipsSubstantialRoleFreeSeparationConstructValidityRequirementsFR100,
} from './lips-substantial-role-free-separation-construct-validity-requirements-review-fr100.js';
import { FaceAuthorityValidationError } from './validation.js';

const CRITERION_ID = 'criterion.intake.lips_substantial' as const;
const METHOD_REF = 'method.shenxiang.five_officers@0.1.0' as const;
const SOURCE_REF = 'passage.shenxiang.five_officers.intake' as const;
const METRIC_REF = 'neutral.mouth.contour_set.symmetric_arclength_mean_nearest_set_distance@0.1.0' as const;

const QUALITY_REF = 'quality.face.calibration.lips_substantial.neutral_frontal@0.1.0' as const;
const RETENTION_REF = 'retention.face.calibration.lips_substantial.review_artifact@0.1.0' as const;
const INSTRUCTION_REF = 'instructions.face.lips_substantial@0.1.0' as const;
const CAPTURE_REF = 'capture.lips_substantial.role_free_separation.repeat_frontal@0.1.0' as const;
const LABEL_REF = 'label.shenxiang.intake.lips_substantial@0.1.0' as const;
const SPLIT_REF = 'split.face.lips_substantial.participant_holdout@0.1.0' as const;
const STUDY_REF = 'study.face.lips_substantial.role_free_separation@0.1.0' as const;

const SUPPORT_ARTIFACTS = Object.freeze([
  Object.freeze({
    artifactId: 'quality.face.calibration.lips_substantial.neutral_frontal',
    version: '0.1.0',
    kind: 'capture_quality_policy' as const,
    requiredChecks: Object.freeze([
      'single_face',
      'frontal_pose',
      'sharpness',
      'mouth_visibility',
      'neutral_mouth_state',
      'major_occlusion',
    ]),
    acceptancePolicyRef: 'acceptance.face.calibration.lips_substantial.neutral_frontal.research_v0',
    status: 'research' as const,
  }),
  Object.freeze({
    artifactId: 'retention.face.calibration.lips_substantial.review_artifact',
    version: '0.1.0',
    kind: 'review_artifact_retention_policy' as const,
    containsPotentiallyIdentifyingFace: true as const,
    deleteTrigger: 'labeling_and_audit_complete' as const,
    maxRetentionDays: null,
    accessScope: 'assigned_reviewers_and_auditors' as const,
    trainingReuseAllowed: false as const,
    identityMatchingAllowed: false as const,
    status: 'research' as const,
  }),
  Object.freeze({
    artifactId: 'instructions.face.lips_substantial',
    version: '0.1.0',
    kind: 'labeling_instruction' as const,
    methodologyRef: METHOD_REF,
    criterionId: CRITERION_ID,
    traditionalSourceRefs: Object.freeze([SOURCE_REF]),
    reviewerMustNotSee: Object.freeze([
      'metric_values',
      'candidate_threshold',
      'peer_labels',
      'fortune_output',
    ] as const),
    status: 'research' as const,
  }),
] as const);

const CAPTURE_PROTOCOLS = Object.freeze([
  Object.freeze({
    protocolId: 'capture.lips_substantial.role_free_separation.repeat_frontal',
    version: '0.1.0',
    metricRefs: Object.freeze([METRIC_REF]),
    captureMode: 'single_frontal' as const,
    requiredViewKeys: Object.freeze(['frontal']),
    repeatPlan: Object.freeze({
      sessionsPerParticipant: 2,
      acceptedCapturesPerSession: 2,
      independentRecaptureRequired: true,
    }),
    qualityPolicyRef: QUALITY_REF,
    sourceImagePolicy: Object.freeze({
      exifStrippedBeforeProcessing: true as const,
      originalDeletedAfterReviewArtifactCreation: true as const,
      trainingReuseAllowed: false as const,
      identityEmbeddingAllowed: false as const,
    }),
    reviewArtifactPolicy: Object.freeze({
      containsPotentiallyIdentifyingFace: true as const,
      participantPolicy: 'consented_pseudonymous' as const,
      retentionPolicyRef: RETENTION_REF,
      identityMatchingAllowed: false as const,
      trainingReuseAllowed: false as const,
    }),
    status: 'research' as const,
  }),
] as const);

const LABELING_PROTOCOLS = Object.freeze([
  Object.freeze({
    protocolId: 'label.shenxiang.intake.lips_substantial',
    version: '0.1.0',
    methodologyRef: METHOD_REF,
    criterionId: CRITERION_ID,
    traditionalSourceRefs: Object.freeze([SOURCE_REF]),
    labelSet: Object.freeze(['met', 'not_met', 'abstain'] as const),
    reviewerPlan: Object.freeze({
      reviewersPerItem: 3,
      blindToMetricValues: true as const,
      blindToPeerLabels: true as const,
      independentInitialLabels: true as const,
      allowAbstain: true as const,
      agreementRule: Object.freeze({
        kind: 'supermajority_non_abstain' as const,
        minAgreementFraction: 2 / 3,
        minNonAbstainLabels: 2,
      }),
    }),
    instructionArtifactRef: INSTRUCTION_REF,
    participantPolicy: 'consented_pseudonymous' as const,
    status: 'research' as const,
  }),
] as const);

const SPLIT_POLICIES = Object.freeze([
  Object.freeze({
    policyId: 'split.face.lips_substantial.participant_holdout',
    version: '0.1.0',
    splitUnit: 'participant' as const,
    partitions: Object.freeze(['selection', 'holdout'] as const),
    participantLeakageAllowed: false as const,
    captureFamilyLeakageAllowed: false as const,
    thresholdSelectionMayReadHoldout: false as const,
    finalEvaluationMayReadSelectionLabels: false as const,
    status: 'research' as const,
  }),
] as const);

const STUDIES = Object.freeze([
  Object.freeze({
    studyId: 'study.face.lips_substantial.role_free_separation',
    version: '0.1.0',
    metricRef: METRIC_REF,
    criterionId: CRITERION_ID,
    methodologyRef: METHOD_REF,
    traditionalSourceRefs: Object.freeze([SOURCE_REF]),
    captureProtocolRef: CAPTURE_REF,
    labelingProtocolRef: LABEL_REF,
    splitPolicyRef: SPLIT_REF,
    requiredEvidenceClasses: Object.freeze([
      'repeat_capture_stability',
      'blinded_expert_operationalization',
      'threshold_selection_result',
    ] as const),
    executionState: 'blocked' as const,
    blockingReasons: Object.freeze([
      'passage.shenxiang.five_officers.intake is not scan_checked in the current authority registry',
      'method.shenxiang.five_officers@0.1.0 remains research-only',
      'capture/label/split protocols and linked quality/retention/instruction artifacts are research-only',
      'criterion-specific construct-validity evidence has not been collected or admitted',
    ]),
    status: 'research' as const,
  }),
] as const);

export const FACE_LIPS_SUBSTANTIAL_CONSTRUCT_VALIDITY_PROTOCOL_RESEARCH_FR101: FaceCalibrationProtocolRegistry = Object.freeze({
  registryId: 'calibration-protocol.face.lips_substantial.role_free_separation.research_fr101',
  version: '0.1.0',
  supportArtifacts: SUPPORT_ARTIFACTS,
  captureProtocols: CAPTURE_PROTOCOLS,
  labelingProtocols: LABELING_PROTOCOLS,
  splitPolicies: SPLIT_POLICIES,
  studies: STUDIES,
});

export interface LipsSubstantialRoleFreeSeparationConstructValidityProtocolReviewFR101V1 {
  readonly schemaVersion: 'fr101-lips-substantial-role-free-separation-construct-validity-protocol-review-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'lips_substantial_role_free_separation_construct_validity_protocol_review_completed_blocked_research_protocol_issued_no_collection_authority';
  readonly upstreamAuthority: {
    readonly fr100SchemaVersion: 'fr100-lips-substantial-role-free-separation-construct-validity-requirements-review-v1';
    readonly requirementsReviewed: true;
    readonly candidateMetricRef: typeof METRIC_REF;
    readonly criterionId: typeof CRITERION_ID;
    readonly methodologyRef: typeof METHOD_REF;
    readonly traditionalSourceRef: typeof SOURCE_REF;
    readonly sourceVerificationStatus: 'unverified_ocr';
    readonly methodologyReviewStatus: 'research';
    readonly priorProtocolDefinitionsIssued: 0;
    readonly priorSupportArtifactsIssued: 0;
    readonly humanCollectionPreviouslyAuthorized: false;
  };
  readonly issuedProtocolRegistry: FaceCalibrationProtocolRegistry;
  readonly protocolMaterialization: {
    readonly registryValidatedByActiveFramework: true;
    readonly supportArtifactsIssued: 3;
    readonly captureProtocolsIssued: 1;
    readonly labelingProtocolsIssued: 1;
    readonly splitPoliciesIssued: 1;
    readonly blockedResearchStudiesIssued: 1;
    readonly criterionSpecificLabelingInstructionIssued: true;
    readonly repeatCaptureProtocolIssued: true;
    readonly participantHoldoutPolicyIssued: true;
    readonly requiredEvidenceClassesPreserved: readonly [
      'repeat_capture_stability',
      'blinded_expert_operationalization',
      'threshold_selection_result',
    ];
  };
  readonly researchDesignParameters: {
    readonly sessionsPerParticipant: 2;
    readonly acceptedCapturesPerSession: 2;
    readonly reviewersPerItem: 3;
    readonly minAgreementFraction: number;
    readonly minNonAbstainLabels: 2;
    readonly status: 'research_framework_design_parameters_not_traditional_or_calibration_thresholds';
    readonly traditionalSourceDerived: false;
    readonly anatomicalThicknessDerived: false;
    readonly calibrationThresholds: false;
    readonly productCriterionThresholds: false;
  };
  readonly executionGate: {
    readonly studyRef: typeof STUDY_REF;
    readonly executionState: 'blocked';
    readonly humanDataCollectionAuthorized: false;
    readonly sourceScanCheckedRequiredBeforeAuthorization: true;
    readonly methodologyReviewedRequiredBeforeAuthorization: true;
    readonly linkedProtocolReviewRequiredBeforeAuthorization: true;
    readonly currentSourceGateOpen: false;
    readonly currentMethodologyGateOpen: false;
    readonly currentProtocolGateOpen: false;
    readonly blockedResearchProtocolMeansAuthorizedToCollect: false;
  };
  readonly authorityBoundary: {
    readonly protocolIssuanceMeansEvidenceExists: false;
    readonly protocolIssuanceMeansTraditionalBinding: false;
    readonly protocolIssuanceMeansAnatomicalThickness: false;
    readonly researchDesignParameterMeansTraditionalThreshold: false;
    readonly researchDesignParameterMeansCalibrationThreshold: false;
    readonly blindedLabelingProtocolMeansCriterionState: false;
    readonly blockedStudyMeansHumanCollectionAuthorized: false;
    readonly neutralMetricAssociationStudyMeansPhysicalAnthropometry: false;
  };
  readonly protocolDefinitionsIssued: 4;
  readonly supportArtifactsIssued: 3;
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
  readonly resolvedProcessGaps: readonly [
    'lips_substantial_role_free_separation_metric_construct_validity_protocol_not_issued',
    'lips_substantial_criterion_labeling_instruction_not_issued',
  ];
  readonly remainingBlockers: readonly [
    'lips_substantial_role_free_separation_metric_construct_validity_evidence_absent',
    'five_officers_source_not_scan_checked',
    'five_officers_methodology_research_only',
    'lips_substantial_construct_validity_human_collection_not_authorized',
    'fr15_mouth_consumer_slot_not_issued',
    'outer_inner_lip_roles_not_authorized',
    'role_free_cross_contour_correspondence_not_defined',
    'lips_substantial_thickness_metric_not_defined',
    'lips_substantial_calibration_evidence_absent',
    'lips_substantial_threshold_not_calibrated',
  ];
  readonly prohibitedShortcuts: readonly [
    'blocked_research_protocol_to_human_collection_authority',
    'research_design_parameter_to_traditional_threshold',
    'research_design_parameter_to_calibration_threshold',
    'labeling_protocol_to_traditional_binding',
    'construct_validity_protocol_to_construct_validity_evidence',
    'role_free_metric_study_to_anatomical_lip_thickness',
    'role_free_metric_study_to_physical_lip_thickness',
    'protocol_issuance_to_criterion_state',
  ];
  readonly recommendedNextFrontier: {
    readonly frontierKey: 'lips_substantial_construct_validity_collection_authorization_gate_review';
    readonly purpose: 'reconcile the issued blocked research protocol against source, methodology, and protocol-review gates before any human collection or evidence acquisition can be authorized';
    readonly sourceScanVerificationStillRequired: true;
    readonly methodologyReviewStillRequired: true;
    readonly humanCollectionAuthorizationAllowedNow: false;
    readonly evidenceIssuanceAllowedNow: false;
    readonly traditionalBindingIssuanceAllowedNow: false;
    readonly thresholdIssuanceAllowedNow: false;
    readonly criterionStateIssuanceAllowedNow: false;
  };
}

const ISSUED = new WeakSet<object>();
let CACHED: LipsSubstantialRoleFreeSeparationConstructValidityProtocolReviewFR101V1 | null = null;

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-101 ${message}`);
}

function validateFR100Authority(): void {
  const fr100 = reviewLipsSubstantialRoleFreeSeparationConstructValidityRequirementsFR100();
  assertIssuedLipsSubstantialRoleFreeSeparationConstructValidityRequirementsReviewFR100(fr100);
  if (
    fr100.schemaVersion !== 'fr100-lips-substantial-role-free-separation-construct-validity-requirements-review-v1' ||
    fr100.authorityState !== 'lips_substantial_role_free_separation_construct_validity_requirements_review_completed_no_protocol_or_evidence_issued' ||
    fr100.upstreamAuthority.candidateMetricRef !== METRIC_REF ||
    fr100.targetConstruct.criterionId !== CRITERION_ID ||
    fr100.targetConstruct.methodologyRef !== METHOD_REF ||
    fr100.targetConstruct.traditionalSourceRef !== SOURCE_REF ||
    fr100.upstreamAuthority.sourceVerificationStatus !== 'unverified_ocr' ||
    fr100.upstreamAuthority.methodologyReviewStatus !== 'research' ||
    fr100.requirementsReviewed !== true ||
    fr100.protocolDefinitionsIssued !== 0 ||
    fr100.supportArtifactsIssued !== 0 ||
    fr100.humanDataCollectionAuthorized !== false ||
    fr100.constructValidityEvidenceIssued !== 0 ||
    fr100.thresholdRefsIssued !== 0 ||
    fr100.traditionalMetricBindingsIssued !== 0 ||
    fr100.criterionStatesIssued !== 0 ||
    fr100.traditionalSemanticAuthority !== false ||
    fr100.recommendedNextFrontier.frontierKey !== 'lips_substantial_role_free_separation_metric_construct_validity_protocol_review'
  ) fail('FR-100 construct-validity protocol frontier authority drift.');
}

function validateProtocolRegistry(): void {
  if (FACE_FR3_METHOD_REFS_V0.shenxiangFiveOfficers !== METHOD_REF) {
    fail('Five Officers methodology ref drift.');
  }
  validateFaceCalibrationProtocolRegistry(
    FACE_LIPS_SUBSTANTIAL_CONSTRUCT_VALIDITY_PROTOCOL_RESEARCH_FR101,
    {
      faceAuthorityRegistry: FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0,
      knownNeutralMetricRefs: new Set([METRIC_REF]),
    },
  );
  const source = FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0.passages.find((item) => item.passageId === SOURCE_REF);
  const method = FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0.methodologies.find(
    (item) => `${item.methodologyId}@${item.version}` === METHOD_REF,
  );
  if (source?.verificationStatus !== 'unverified_ocr' || method?.reviewStatus !== 'research') {
    fail('current source or methodology gate unexpectedly opened.');
  }
}

export function reviewLipsSubstantialRoleFreeSeparationConstructValidityProtocolFR101(): LipsSubstantialRoleFreeSeparationConstructValidityProtocolReviewFR101V1 {
  if (CACHED !== null) return CACHED;
  validateFR100Authority();
  validateProtocolRegistry();

  const result: LipsSubstantialRoleFreeSeparationConstructValidityProtocolReviewFR101V1 = Object.freeze({
    schemaVersion: 'fr101-lips-substantial-role-free-separation-construct-validity-protocol-review-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'lips_substantial_role_free_separation_construct_validity_protocol_review_completed_blocked_research_protocol_issued_no_collection_authority' as const,
    upstreamAuthority: Object.freeze({
      fr100SchemaVersion: 'fr100-lips-substantial-role-free-separation-construct-validity-requirements-review-v1' as const,
      requirementsReviewed: true as const,
      candidateMetricRef: METRIC_REF,
      criterionId: CRITERION_ID,
      methodologyRef: METHOD_REF,
      traditionalSourceRef: SOURCE_REF,
      sourceVerificationStatus: 'unverified_ocr' as const,
      methodologyReviewStatus: 'research' as const,
      priorProtocolDefinitionsIssued: 0 as const,
      priorSupportArtifactsIssued: 0 as const,
      humanCollectionPreviouslyAuthorized: false as const,
    }),
    issuedProtocolRegistry: FACE_LIPS_SUBSTANTIAL_CONSTRUCT_VALIDITY_PROTOCOL_RESEARCH_FR101,
    protocolMaterialization: Object.freeze({
      registryValidatedByActiveFramework: true as const,
      supportArtifactsIssued: 3 as const,
      captureProtocolsIssued: 1 as const,
      labelingProtocolsIssued: 1 as const,
      splitPoliciesIssued: 1 as const,
      blockedResearchStudiesIssued: 1 as const,
      criterionSpecificLabelingInstructionIssued: true as const,
      repeatCaptureProtocolIssued: true as const,
      participantHoldoutPolicyIssued: true as const,
      requiredEvidenceClassesPreserved: Object.freeze([
        'repeat_capture_stability',
        'blinded_expert_operationalization',
        'threshold_selection_result',
      ] as const),
    }),
    researchDesignParameters: Object.freeze({
      sessionsPerParticipant: 2 as const,
      acceptedCapturesPerSession: 2 as const,
      reviewersPerItem: 3 as const,
      minAgreementFraction: 2 / 3,
      minNonAbstainLabels: 2 as const,
      status: 'research_framework_design_parameters_not_traditional_or_calibration_thresholds' as const,
      traditionalSourceDerived: false as const,
      anatomicalThicknessDerived: false as const,
      calibrationThresholds: false as const,
      productCriterionThresholds: false as const,
    }),
    executionGate: Object.freeze({
      studyRef: STUDY_REF,
      executionState: 'blocked' as const,
      humanDataCollectionAuthorized: false as const,
      sourceScanCheckedRequiredBeforeAuthorization: true as const,
      methodologyReviewedRequiredBeforeAuthorization: true as const,
      linkedProtocolReviewRequiredBeforeAuthorization: true as const,
      currentSourceGateOpen: false as const,
      currentMethodologyGateOpen: false as const,
      currentProtocolGateOpen: false as const,
      blockedResearchProtocolMeansAuthorizedToCollect: false as const,
    }),
    authorityBoundary: Object.freeze({
      protocolIssuanceMeansEvidenceExists: false as const,
      protocolIssuanceMeansTraditionalBinding: false as const,
      protocolIssuanceMeansAnatomicalThickness: false as const,
      researchDesignParameterMeansTraditionalThreshold: false as const,
      researchDesignParameterMeansCalibrationThreshold: false as const,
      blindedLabelingProtocolMeansCriterionState: false as const,
      blockedStudyMeansHumanCollectionAuthorized: false as const,
      neutralMetricAssociationStudyMeansPhysicalAnthropometry: false as const,
    }),
    protocolDefinitionsIssued: 4 as const,
    supportArtifactsIssued: 3 as const,
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
    resolvedProcessGaps: Object.freeze([
      'lips_substantial_role_free_separation_metric_construct_validity_protocol_not_issued',
      'lips_substantial_criterion_labeling_instruction_not_issued',
    ] as const),
    remainingBlockers: Object.freeze([
      'lips_substantial_role_free_separation_metric_construct_validity_evidence_absent',
      'five_officers_source_not_scan_checked',
      'five_officers_methodology_research_only',
      'lips_substantial_construct_validity_human_collection_not_authorized',
      'fr15_mouth_consumer_slot_not_issued',
      'outer_inner_lip_roles_not_authorized',
      'role_free_cross_contour_correspondence_not_defined',
      'lips_substantial_thickness_metric_not_defined',
      'lips_substantial_calibration_evidence_absent',
      'lips_substantial_threshold_not_calibrated',
    ] as const),
    prohibitedShortcuts: Object.freeze([
      'blocked_research_protocol_to_human_collection_authority',
      'research_design_parameter_to_traditional_threshold',
      'research_design_parameter_to_calibration_threshold',
      'labeling_protocol_to_traditional_binding',
      'construct_validity_protocol_to_construct_validity_evidence',
      'role_free_metric_study_to_anatomical_lip_thickness',
      'role_free_metric_study_to_physical_lip_thickness',
      'protocol_issuance_to_criterion_state',
    ] as const),
    recommendedNextFrontier: Object.freeze({
      frontierKey: 'lips_substantial_construct_validity_collection_authorization_gate_review' as const,
      purpose: 'reconcile the issued blocked research protocol against source, methodology, and protocol-review gates before any human collection or evidence acquisition can be authorized' as const,
      sourceScanVerificationStillRequired: true as const,
      methodologyReviewStillRequired: true as const,
      humanCollectionAuthorizationAllowedNow: false as const,
      evidenceIssuanceAllowedNow: false as const,
      traditionalBindingIssuanceAllowedNow: false as const,
      thresholdIssuanceAllowedNow: false as const,
      criterionStateIssuanceAllowedNow: false as const,
    }),
  });
  CACHED = result;
  ISSUED.add(result);
  return result;
}

export function assertIssuedLipsSubstantialRoleFreeSeparationConstructValidityProtocolReviewFR101(
  value: LipsSubstantialRoleFreeSeparationConstructValidityProtocolReviewFR101V1,
): void {
  if (!ISSUED.has(value)) fail('artifact is not an issued FR-101 review.');
}
