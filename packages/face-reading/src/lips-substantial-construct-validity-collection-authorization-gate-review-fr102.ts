import { FR74_SCAN_IMAGE_EVIDENCE_REQUIREMENTS } from './five-officers-mouth-scan-image-acquisition-readiness-fr74.js';
import { FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0 } from './five-officers-six-fus-research-v0.js';
import {
  FACE_LIPS_SUBSTANTIAL_CONSTRUCT_VALIDITY_PROTOCOL_RESEARCH_FR101,
  assertIssuedLipsSubstantialRoleFreeSeparationConstructValidityProtocolReviewFR101,
  reviewLipsSubstantialRoleFreeSeparationConstructValidityProtocolFR101,
} from './lips-substantial-role-free-separation-construct-validity-protocol-review-fr101.js';
import { FaceAuthorityValidationError } from './validation.js';

const CRITERION_ID = 'criterion.intake.lips_substantial' as const;
const METHOD_REF = 'method.shenxiang.five_officers@0.1.0' as const;
const SOURCE_REF = 'passage.shenxiang.five_officers.intake' as const;
const STUDY_REF = 'study.face.lips_substantial.role_free_separation@0.1.0' as const;
const SOURCE_FILE_REF = 'https://commons.wikimedia.org/wiki/File:NLC416-13jh001662-59167_神相全編.pdf' as const;

export interface LipsSubstantialConstructValidityCollectionAuthorizationGateReviewFR102V1 {
  readonly schemaVersion: 'fr102-lips-substantial-construct-validity-collection-authorization-gate-review-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'lips_substantial_construct_validity_collection_authorization_gate_review_completed_authorization_denied';
  readonly upstreamAuthority: {
    readonly fr101SchemaVersion: 'fr101-lips-substantial-role-free-separation-construct-validity-protocol-review-v1';
    readonly blockedResearchProtocolIssued: true;
    readonly criterionId: typeof CRITERION_ID;
    readonly methodologyRef: typeof METHOD_REF;
    readonly traditionalSourceRef: typeof SOURCE_REF;
    readonly studyRef: typeof STUDY_REF;
    readonly studyExecutionState: 'blocked';
    readonly humanCollectionPreviouslyAuthorized: false;
    readonly constructValidityEvidencePreviouslyIssued: 0;
  };
  readonly gateAssessment: {
    readonly sourceGate: {
      readonly requiredVerificationStatus: 'scan_checked';
      readonly currentVerificationStatus: 'unverified_ocr';
      readonly open: false;
      readonly blockingReason: 'five_officers_source_not_scan_checked';
    };
    readonly methodologyGate: {
      readonly requiredReviewStatus: 'reviewed';
      readonly currentReviewStatus: 'research';
      readonly open: false;
      readonly blockingReason: 'five_officers_methodology_research_only';
    };
    readonly linkedProtocolGate: {
      readonly requiredMinimumStatus: 'reviewed';
      readonly captureProtocolStatus: 'research';
      readonly labelingProtocolStatus: 'research';
      readonly splitPolicyStatus: 'research';
      readonly qualityPolicyStatus: 'research';
      readonly retentionPolicyStatus: 'research';
      readonly labelingInstructionStatus: 'research';
      readonly open: false;
      readonly blockingReason: 'lips_substantial_linked_protocols_research_only';
    };
    readonly allRequiredGatesOpen: false;
  };
  readonly authorizationDecision: {
    readonly decision: 'not_authorized';
    readonly humanDataCollectionAuthorized: false;
    readonly constructValidityEvidenceAcquisitionAuthorized: false;
    readonly studyExecutionPromotionAuthorized: false;
    readonly reason: 'source_methodology_and_linked_protocol_review_gates_are_all_closed';
    readonly protocolExistenceMeansCollectionAuthority: false;
    readonly blockedStudyMeansEvidenceMayBeCollected: false;
  };
  readonly nextExternalAuthorityRemediation: {
    readonly remediationClass: 'source_scan_image_acquisition';
    readonly sourceTarget: typeof SOURCE_REF;
    readonly sourceFilePageRef: typeof SOURCE_FILE_REF;
    readonly requiredEvidence: typeof FR74_SCAN_IMAGE_EVIDENCE_REQUIREMENTS;
    readonly acquisitionResearchAuthorized: true;
    readonly exactScanPageCurrentlyAuthorized: false;
    readonly visualPassageMatchCurrentlyConfirmed: false;
    readonly guessedPageOffsetAuthorized: false;
    readonly ocrOnlyLocatorAuthorized: false;
    readonly searchIndexLocatorAuthorized: false;
    readonly sourceAcquisitionMeansScanChecked: false;
    readonly sourceAcquisitionMustPrecedeCollectionAuthorization: true;
  };
  readonly authorityBoundary: {
    readonly gateReviewMeansGateOpened: false;
    readonly blockedProtocolMeansHumanCollection: false;
    readonly protocolReviewStatusMeansTraditionalSourceVerified: false;
    readonly sourceAcquisitionResearchMeansScanChecked: false;
    readonly scanImageRequirementsMeanScanImageEvidenceExists: false;
    readonly sourceScanCheckedMeansTraditionalBindingAutomaticallyValid: false;
    readonly collectionAuthorizationMeansTraditionalCriterionState: false;
  };
  readonly humanDataCollectionAuthorized: false;
  readonly constructValidityEvidenceIssued: 0;
  readonly calibrationEvidenceIssued: 0;
  readonly thresholdRefsIssued: 0;
  readonly traditionalMetricBindingsIssued: 0;
  readonly thicknessMetricIssued: false;
  readonly morphologyProduced: false;
  readonly criterionStatesIssued: 0;
  readonly claimsIssued: 0;
  readonly traditionalSemanticAuthority: false;
  readonly resolvedProcessGap: 'lips_substantial_construct_validity_collection_authorization_gate_not_reviewed';
  readonly remainingBlockers: readonly [
    'five_officers_source_not_scan_checked',
    'five_officers_methodology_research_only',
    'lips_substantial_linked_protocols_research_only',
    'lips_substantial_construct_validity_human_collection_not_authorized',
    'lips_substantial_role_free_separation_metric_construct_validity_evidence_absent',
    'fr15_mouth_consumer_slot_not_issued',
    'outer_inner_lip_roles_not_authorized',
    'role_free_cross_contour_correspondence_not_defined',
    'lips_substantial_thickness_metric_not_defined',
    'lips_substantial_calibration_evidence_absent',
    'lips_substantial_threshold_not_calibrated',
  ];
  readonly recommendedNextFrontier: {
    readonly frontierKey: 'five_officers_intake_scan_image_acquisition_reassessment';
    readonly purpose: 'resume immutable NLC scan-page acquisition for the intake passage and only after reviewed visual evidence consider scan_checked source promotion; do not infer a page from OCR, search-index anchors, other-edition offsets, or guessed PDF offsets';
    readonly internalProtocolExpansionRecommendedBeforeSourceWork: false;
    readonly externalSourceEvidenceAcquisitionRecommendedNow: true;
    readonly humanCollectionAuthorizationAllowedNow: false;
    readonly traditionalBindingIssuanceAllowedNow: false;
    readonly criterionStateIssuanceAllowedNow: false;
  };
}

const ISSUED = new WeakSet<object>();
let CACHED: LipsSubstantialConstructValidityCollectionAuthorizationGateReviewFR102V1 | null = null;

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-102 ${message}`);
}

function validateFR101Authority(): void {
  const fr101 = reviewLipsSubstantialRoleFreeSeparationConstructValidityProtocolFR101();
  assertIssuedLipsSubstantialRoleFreeSeparationConstructValidityProtocolReviewFR101(fr101);
  const study = fr101.issuedProtocolRegistry.studies[0];
  if (
    fr101.schemaVersion !== 'fr101-lips-substantial-role-free-separation-construct-validity-protocol-review-v1' ||
    fr101.authorityState !== 'lips_substantial_role_free_separation_construct_validity_protocol_review_completed_blocked_research_protocol_issued_no_collection_authority' ||
    fr101.upstreamAuthority.criterionId !== CRITERION_ID ||
    fr101.upstreamAuthority.methodologyRef !== METHOD_REF ||
    fr101.upstreamAuthority.traditionalSourceRef !== SOURCE_REF ||
    study === undefined ||
    `${study.studyId}@${study.version}` !== STUDY_REF ||
    study.executionState !== 'blocked' ||
    fr101.humanDataCollectionAuthorized !== false ||
    fr101.constructValidityEvidenceIssued !== 0 ||
    fr101.thresholdRefsIssued !== 0 ||
    fr101.traditionalMetricBindingsIssued !== 0 ||
    fr101.criterionStatesIssued !== 0 ||
    fr101.traditionalSemanticAuthority !== false ||
    fr101.recommendedNextFrontier.frontierKey !== 'lips_substantial_construct_validity_collection_authorization_gate_review'
  ) fail('FR-101 collection-authorization frontier authority drift.');
}

function validateCurrentGateStates(): void {
  const source = FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0.passages.find((item) => item.passageId === SOURCE_REF);
  const method = FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0.methodologies.find(
    (item) => `${item.methodologyId}@${item.version}` === METHOD_REF,
  );
  const registry = FACE_LIPS_SUBSTANTIAL_CONSTRUCT_VALIDITY_PROTOCOL_RESEARCH_FR101;
  const capture = registry.captureProtocols[0];
  const labeling = registry.labelingProtocols[0];
  const split = registry.splitPolicies[0];
  const quality = registry.supportArtifacts.find((item) => item.kind === 'capture_quality_policy');
  const retention = registry.supportArtifacts.find((item) => item.kind === 'review_artifact_retention_policy');
  const instruction = registry.supportArtifacts.find((item) => item.kind === 'labeling_instruction');

  if (source?.verificationStatus !== 'unverified_ocr') fail('source gate unexpectedly changed.');
  if (method?.reviewStatus !== 'research') fail('methodology gate unexpectedly changed.');
  if (
    capture?.status !== 'research' ||
    labeling?.status !== 'research' ||
    split?.status !== 'research' ||
    quality?.status !== 'research' ||
    retention?.status !== 'research' ||
    instruction?.status !== 'research'
  ) fail('linked protocol gate unexpectedly changed.');
  if (
    FR74_SCAN_IMAGE_EVIDENCE_REQUIREMENTS.length !== 5 ||
    !FR74_SCAN_IMAGE_EVIDENCE_REQUIREMENTS.includes('immutable_nlc_1925_page_image_ref') ||
    !FR74_SCAN_IMAGE_EVIDENCE_REQUIREMENTS.includes('exact_scan_page_within_1_576') ||
    !FR74_SCAN_IMAGE_EVIDENCE_REQUIREMENTS.includes('visual_match_of_intake_heading_or_passage_text') ||
    !FR74_SCAN_IMAGE_EVIDENCE_REQUIREMENTS.includes('nonempty_visual_evidence_refs') ||
    !FR74_SCAN_IMAGE_EVIDENCE_REQUIREMENTS.includes('nonempty_checker_refs')
  ) fail('FR-74 scan-image evidence requirements drift.');
}

export function reviewLipsSubstantialConstructValidityCollectionAuthorizationGatesFR102(): LipsSubstantialConstructValidityCollectionAuthorizationGateReviewFR102V1 {
  if (CACHED !== null) return CACHED;
  validateFR101Authority();
  validateCurrentGateStates();

  const result: LipsSubstantialConstructValidityCollectionAuthorizationGateReviewFR102V1 = Object.freeze({
    schemaVersion: 'fr102-lips-substantial-construct-validity-collection-authorization-gate-review-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'lips_substantial_construct_validity_collection_authorization_gate_review_completed_authorization_denied' as const,
    upstreamAuthority: Object.freeze({
      fr101SchemaVersion: 'fr101-lips-substantial-role-free-separation-construct-validity-protocol-review-v1' as const,
      blockedResearchProtocolIssued: true as const,
      criterionId: CRITERION_ID,
      methodologyRef: METHOD_REF,
      traditionalSourceRef: SOURCE_REF,
      studyRef: STUDY_REF,
      studyExecutionState: 'blocked' as const,
      humanCollectionPreviouslyAuthorized: false as const,
      constructValidityEvidencePreviouslyIssued: 0 as const,
    }),
    gateAssessment: Object.freeze({
      sourceGate: Object.freeze({
        requiredVerificationStatus: 'scan_checked' as const,
        currentVerificationStatus: 'unverified_ocr' as const,
        open: false as const,
        blockingReason: 'five_officers_source_not_scan_checked' as const,
      }),
      methodologyGate: Object.freeze({
        requiredReviewStatus: 'reviewed' as const,
        currentReviewStatus: 'research' as const,
        open: false as const,
        blockingReason: 'five_officers_methodology_research_only' as const,
      }),
      linkedProtocolGate: Object.freeze({
        requiredMinimumStatus: 'reviewed' as const,
        captureProtocolStatus: 'research' as const,
        labelingProtocolStatus: 'research' as const,
        splitPolicyStatus: 'research' as const,
        qualityPolicyStatus: 'research' as const,
        retentionPolicyStatus: 'research' as const,
        labelingInstructionStatus: 'research' as const,
        open: false as const,
        blockingReason: 'lips_substantial_linked_protocols_research_only' as const,
      }),
      allRequiredGatesOpen: false as const,
    }),
    authorizationDecision: Object.freeze({
      decision: 'not_authorized' as const,
      humanDataCollectionAuthorized: false as const,
      constructValidityEvidenceAcquisitionAuthorized: false as const,
      studyExecutionPromotionAuthorized: false as const,
      reason: 'source_methodology_and_linked_protocol_review_gates_are_all_closed' as const,
      protocolExistenceMeansCollectionAuthority: false as const,
      blockedStudyMeansEvidenceMayBeCollected: false as const,
    }),
    nextExternalAuthorityRemediation: Object.freeze({
      remediationClass: 'source_scan_image_acquisition' as const,
      sourceTarget: SOURCE_REF,
      sourceFilePageRef: SOURCE_FILE_REF,
      requiredEvidence: FR74_SCAN_IMAGE_EVIDENCE_REQUIREMENTS,
      acquisitionResearchAuthorized: true as const,
      exactScanPageCurrentlyAuthorized: false as const,
      visualPassageMatchCurrentlyConfirmed: false as const,
      guessedPageOffsetAuthorized: false as const,
      ocrOnlyLocatorAuthorized: false as const,
      searchIndexLocatorAuthorized: false as const,
      sourceAcquisitionMeansScanChecked: false as const,
      sourceAcquisitionMustPrecedeCollectionAuthorization: true as const,
    }),
    authorityBoundary: Object.freeze({
      gateReviewMeansGateOpened: false as const,
      blockedProtocolMeansHumanCollection: false as const,
      protocolReviewStatusMeansTraditionalSourceVerified: false as const,
      sourceAcquisitionResearchMeansScanChecked: false as const,
      scanImageRequirementsMeanScanImageEvidenceExists: false as const,
      sourceScanCheckedMeansTraditionalBindingAutomaticallyValid: false as const,
      collectionAuthorizationMeansTraditionalCriterionState: false as const,
    }),
    humanDataCollectionAuthorized: false as const,
    constructValidityEvidenceIssued: 0 as const,
    calibrationEvidenceIssued: 0 as const,
    thresholdRefsIssued: 0 as const,
    traditionalMetricBindingsIssued: 0 as const,
    thicknessMetricIssued: false as const,
    morphologyProduced: false as const,
    criterionStatesIssued: 0 as const,
    claimsIssued: 0 as const,
    traditionalSemanticAuthority: false as const,
    resolvedProcessGap: 'lips_substantial_construct_validity_collection_authorization_gate_not_reviewed' as const,
    remainingBlockers: Object.freeze([
      'five_officers_source_not_scan_checked',
      'five_officers_methodology_research_only',
      'lips_substantial_linked_protocols_research_only',
      'lips_substantial_construct_validity_human_collection_not_authorized',
      'lips_substantial_role_free_separation_metric_construct_validity_evidence_absent',
      'fr15_mouth_consumer_slot_not_issued',
      'outer_inner_lip_roles_not_authorized',
      'role_free_cross_contour_correspondence_not_defined',
      'lips_substantial_thickness_metric_not_defined',
      'lips_substantial_calibration_evidence_absent',
      'lips_substantial_threshold_not_calibrated',
    ] as const),
    recommendedNextFrontier: Object.freeze({
      frontierKey: 'five_officers_intake_scan_image_acquisition_reassessment' as const,
      purpose: 'resume immutable NLC scan-page acquisition for the intake passage and only after reviewed visual evidence consider scan_checked source promotion; do not infer a page from OCR, search-index anchors, other-edition offsets, or guessed PDF offsets' as const,
      internalProtocolExpansionRecommendedBeforeSourceWork: false as const,
      externalSourceEvidenceAcquisitionRecommendedNow: true as const,
      humanCollectionAuthorizationAllowedNow: false as const,
      traditionalBindingIssuanceAllowedNow: false as const,
      criterionStateIssuanceAllowedNow: false as const,
    }),
  });
  CACHED = result;
  ISSUED.add(result);
  return result;
}

export function assertIssuedLipsSubstantialConstructValidityCollectionAuthorizationGateReviewFR102(
  value: LipsSubstantialConstructValidityCollectionAuthorizationGateReviewFR102V1,
): void {
  if (!ISSUED.has(value)) fail('artifact is not an issued FR-102 review.');
}
