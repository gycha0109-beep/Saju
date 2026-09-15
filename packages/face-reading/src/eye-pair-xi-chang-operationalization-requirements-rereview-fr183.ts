import {
  assertIssuedEyePairXiChangOperationalizationRequirementsFR180,
  FR180_NEXT_FRONTIER,
  FR180_REQUIRED_CALIBRATION_EVIDENCE_CLASSES,
  FR180_VERDICT,
  issueEyePairXiChangOperationalizationRequirementsFR180,
} from './eye-pair-xi-chang-operationalization-requirements-fr180.js';
import {
  assertIssuedEyePairFR175ExactScanPagePinningFR181,
  FR181_VERDICT,
  issueEyePairFR175ExactScanPagePinningFR181,
} from './eye-pair-fr175-exact-scan-page-pinning-fr181.js';
import {
  assertIssuedEyePairFR176DarumaEyeExactScanPagePinningFR182,
  FR182_NEXT_FRONTIER,
  FR182_PAGE_146_IMAGE_SHA256,
  FR182_PAGE_146_REF,
  FR182_REMAINING_BLOCKERS,
  FR182_VERDICT,
  issueEyePairFR176DarumaEyeExactScanPagePinningFR182,
} from './eye-pair-fr176-daruma-eye-exact-scan-page-pinning-fr182.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR183_RECORD_ID =
  'research.face_reading.eye_pair.xi_chang_operationalization_requirements_rereview.fr183' as const;
export const FR183_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr183-eye-pair-xi-chang-operationalization-requirements-rereview.md' as const;
export const FR183_VERDICT =
  'SOURCE_PAGE_PREREQUISITES_SATISFIED_OPERATIONALIZATION_REQUIREMENTS_REVIEWED_TRADITIONAL_BINDING_NOT_ADMITTED' as const;
export const FR183_NEXT_FRONTIER =
  'review_source_authorized_xi_chang_metric_to_concept_mapping_feasibility_before_directionality_or_calibration' as const;
export const FR183_PAGE_88_REF =
  'packages/face-reading/evidence/fr103/nlc-1925-page-88.png#sha256:5ceedcabaa806ab2a4a55a1923681b5b7b246b01c62af42ee8ba56413d207fce' as const;
export const FR183_PAGE_88_IMAGE_SHA256 =
  'sha256:5ceedcabaa806ab2a4a55a1923681b5b7b246b01c62af42ee8ba56413d207fce' as const;
export const FR183_REMAINING_BLOCKERS = FR182_REMAINING_BLOCKERS;

const XI_CANDIDATE_METRIC_REF =
  'neutral.eye_pair.metric_3d.mean_cycle_y_to_x_span_ratio@0.1.0' as const;
const CHANG_CANDIDATE_METRIC_REF =
  'neutral.eye_pair.metric_3d.mean_cycle_x_span_to_full_mesh_x_span_ratio@0.1.0' as const;

export interface FR183AuthorityBoundaryV1 {
  readonly provenancePrerequisitesSatisfied: true;
  readonly provenanceSatisfactionMeansMetricBinding: false;
  readonly xiMetricBindingAuthorized: false;
  readonly changMetricBindingAuthorized: false;
  readonly metricDirectionalityAuthorized: false;
  readonly stableCriterionIdentityIssued: false;
  readonly thresholdIssued: false;
  readonly percentileIssued: false;
  readonly referencePopulationIssued: false;
  readonly calibrationEvidenceIssued: false;
  readonly calibrationProtocolIssued: false;
  readonly calibratedDecisionRuleIssued: false;
  readonly classifierIssued: false;
  readonly scoreIssued: false;
  readonly rankIssued: false;
  readonly traditionalJiOperationalizationAuthorized: false;
  readonly traditionalCunMappingAuthorized: false;
  readonly compoundXiErChangRuleAuthorized: false;
  readonly scanCheckedRegistryPromotionAuthorized: false;
  readonly doubleCheckedSourceAuthorized: false;
  readonly morphologyProduced: false;
  readonly criterionStatesIssued: 0;
  readonly structuredClaimsIssued: 0;
  readonly boundedNarrativesIssued: 0;
  readonly productionRuleAuthorized: false;
  readonly traditionalSemanticAuthorityPromoted: false;
}

export interface EyePairXiChangOperationalizationRequirementsRereviewFR183V1 {
  readonly schemaVersion: 'fr183-eye-pair-xi-chang-operationalization-requirements-rereview-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR183_RECORD_ID;
  readonly authorityState: 'source_page_prerequisites_satisfied_requirements_rereviewed_no_binding_admitted';
  readonly upstreamAuthority: {
    readonly fr180Verdict: typeof FR180_VERDICT;
    readonly fr180NextFrontier: typeof FR180_NEXT_FRONTIER;
    readonly fr181Verdict: typeof FR181_VERDICT;
    readonly fr182Verdict: typeof FR182_VERDICT;
    readonly fr182NextFrontier: typeof FR182_NEXT_FRONTIER;
  };
  readonly sourcePrerequisiteReview: {
    readonly fixedWitnessIdentityConsistent: true;
    readonly exactFR175EyePassageScanPageRequired: true;
    readonly exactFR175EyePassageScanPageNowPinned: true;
    readonly exactFR175EyePassageScanPage: 88;
    readonly fr175ImmutablePageImageRef: typeof FR183_PAGE_88_REF;
    readonly fr175ImmutablePageImageSha256: typeof FR183_PAGE_88_IMAGE_SHA256;
    readonly exactFR176DarumaEyeScanPageRequired: true;
    readonly exactFR176DarumaEyeScanPageNowPinned: true;
    readonly exactFR176DarumaEyeScanPage: 146;
    readonly fr176ImmutablePageImageRef: typeof FR182_PAGE_146_REF;
    readonly fr176ImmutablePageImageSha256: typeof FR182_PAGE_146_IMAGE_SHA256;
    readonly locatorPrerequisitesSatisfied: true;
    readonly scanCheckedPromotionAuthorized: false;
    readonly doubleCheckedSourceAuthorized: false;
    readonly provenanceSatisfactionDoesNotAuthorizeTraditionalBinding: true;
  };
  readonly calibrationReaudit: {
    readonly requiredEvidenceClasses: typeof FR180_REQUIRED_CALIBRATION_EVIDENCE_CLASSES;
    readonly eyePairCoveredEvidenceCount: 0;
    readonly eyePairCaptureProtocolCount: 0;
    readonly eyePairLabelingProtocolCount: 0;
    readonly eyePairStudyCount: 0;
    readonly anyCriterionSpecificCalibrationAuthorityFound: false;
    readonly reviewerBlindingStillRequired: true;
    readonly participantLevelDatasetSplitStillRequired: true;
    readonly thresholdSelectionMayReadHoldout: false;
  };
  readonly xiReview: {
    readonly traditionalConcept: '細';
    readonly candidateMetricRef: typeof XI_CANDIDATE_METRIC_REF;
    readonly neutralMetricAvailable: true;
    readonly sourceAuthorizedMetricRelationCurrentlyIssued: false;
    readonly metricDirectionalityCurrentlyIssued: false;
    readonly stableCriterionIdentityCurrentlyIssued: false;
    readonly criterionSpecificCalibrationEvidencePresent: false;
    readonly criterionSpecificCalibrationProtocolPresent: false;
    readonly calibratedDecisionRulePresent: false;
    readonly traditionalBindingDecision: 'not_admitted';
  };
  readonly changReview: {
    readonly traditionalConcept: '長';
    readonly candidateMetricRef: typeof CHANG_CANDIDATE_METRIC_REF;
    readonly neutralMetricAvailable: true;
    readonly sourceAuthorizedMetricRelationCurrentlyIssued: false;
    readonly metricDirectionalityCurrentlyIssued: false;
    readonly stableCriterionIdentityCurrentlyIssued: false;
    readonly criterionSpecificCalibrationEvidencePresent: false;
    readonly criterionSpecificCalibrationProtocolPresent: false;
    readonly calibratedDecisionRulePresent: false;
    readonly normalizedRatioMeansTraditionalAbsoluteLength: false;
    readonly traditionalBindingDecision: 'not_admitted';
  };
  readonly compoundReview: {
    readonly sourceClause: '細而長';
    readonly xiBindingCurrentlyAdmitted: false;
    readonly changBindingCurrentlyAdmitted: false;
    readonly sourceAuthorizedCompositionRuleCurrentlyIssued: false;
    readonly simpleBooleanAndAuthorized: false;
    readonly compoundBindingDecision: 'not_admitted';
  };
  readonly resolvedSinceFR180: readonly [
    'fr175_exact_eye_passage_scan_page_not_pinned',
    'fr176_exact_daruma_eye_scan_page_not_pinned',
  ];
  readonly remainingBlockers: typeof FR183_REMAINING_BLOCKERS;
  readonly authorityBoundary: FR183AuthorityBoundaryV1;
  readonly privacyBoundary: {
    readonly participantDerivedMaterialAccepted: false;
    readonly participantImageAccepted: false;
    readonly rawProviderResponseAccepted: false;
    readonly rawLandmarkSetAccepted: false;
    readonly metricValuesPersisted: false;
    readonly faceEmbeddingAccepted: false;
    readonly identityTemplateAccepted: false;
    readonly biometricIdentityMatchingPerformed: false;
  };
  readonly verdict: typeof FR183_VERDICT;
  readonly researchNoteRef: typeof FR183_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR183_NEXT_FRONTIER;
}

const ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-183 ${message}`);
}

function blockersMatch(
  actual: readonly string[],
  expected: readonly string[],
): boolean {
  return actual.length === expected.length
    && actual.every((item, index) => item === expected[index]);
}

export function assertFR183AuthorityBoundary(boundary: FR183AuthorityBoundaryV1): void {
  if (
    boundary.provenancePrerequisitesSatisfied !== true
    || boundary.provenanceSatisfactionMeansMetricBinding !== false
    || boundary.xiMetricBindingAuthorized !== false
    || boundary.changMetricBindingAuthorized !== false
    || boundary.metricDirectionalityAuthorized !== false
    || boundary.stableCriterionIdentityIssued !== false
    || boundary.thresholdIssued !== false
    || boundary.percentileIssued !== false
    || boundary.referencePopulationIssued !== false
    || boundary.calibrationEvidenceIssued !== false
    || boundary.calibrationProtocolIssued !== false
    || boundary.calibratedDecisionRuleIssued !== false
    || boundary.classifierIssued !== false
    || boundary.scoreIssued !== false
    || boundary.rankIssued !== false
    || boundary.traditionalJiOperationalizationAuthorized !== false
    || boundary.traditionalCunMappingAuthorized !== false
    || boundary.compoundXiErChangRuleAuthorized !== false
    || boundary.scanCheckedRegistryPromotionAuthorized !== false
    || boundary.doubleCheckedSourceAuthorized !== false
    || boundary.morphologyProduced !== false
    || boundary.criterionStatesIssued !== 0
    || boundary.structuredClaimsIssued !== 0
    || boundary.boundedNarrativesIssued !== 0
    || boundary.productionRuleAuthorized !== false
    || boundary.traditionalSemanticAuthorityPromoted !== false
  ) fail('authority widening detected.');
}

function validateUpstreamAuthority(): {
  calibrationReaudit: EyePairXiChangOperationalizationRequirementsRereviewFR183V1['calibrationReaudit'];
} {
  const fr180 = issueEyePairXiChangOperationalizationRequirementsFR180();
  assertIssuedEyePairXiChangOperationalizationRequirementsFR180(fr180);
  if (
    fr180.verdict !== FR180_VERDICT
    || fr180.nextFrontier !== FR180_NEXT_FRONTIER
    || fr180.sourcePromotionRequirements.exactFR175EyePassageScanPageRequired !== true
    || fr180.sourcePromotionRequirements.exactFR175EyePassageScanPageCurrentlyPinned !== false
    || fr180.sourcePromotionRequirements.exactFR176DarumaEyeScanPageRequired !== true
    || fr180.sourcePromotionRequirements.exactFR176DarumaEyeScanPageCurrentlyPinned !== false
    || fr180.unresolvedAuthorityRequirements.length !== FR182_REMAINING_BLOCKERS.length + 2
    || fr180.unresolvedAuthorityRequirements[0] !== 'fr175_exact_eye_passage_scan_page_not_pinned'
    || fr180.unresolvedAuthorityRequirements[1] !== 'fr176_exact_daruma_eye_scan_page_not_pinned'
    || !blockersMatch(fr180.unresolvedAuthorityRequirements.slice(2), FR182_REMAINING_BLOCKERS)
    || fr180.xiRequirements.candidateMetricRef !== XI_CANDIDATE_METRIC_REF
    || fr180.changRequirements.candidateMetricRef !== CHANG_CANDIDATE_METRIC_REF
    || fr180.xiRequirements.traditionalBindingDecision !== 'not_admitted'
    || fr180.changRequirements.traditionalBindingDecision !== 'not_admitted'
    || fr180.compoundRequirements.compoundBindingDecision !== 'not_admitted'
    || fr180.decisionBoundary.traditionalSemanticAuthorityPromoted !== false
    || fr180.decisionBoundary.productionRuleAuthorized !== false
  ) fail('FR-180 requirements authority drift.');

  if (
    fr180.calibrationFramework.requiredEvidenceClasses !== FR180_REQUIRED_CALIBRATION_EVIDENCE_CLASSES
    || fr180.calibrationFramework.eyePairCoveredEvidenceCount !== 0
    || fr180.calibrationFramework.eyePairCaptureProtocolCount !== 0
    || fr180.calibrationFramework.eyePairLabelingProtocolCount !== 0
    || fr180.calibrationFramework.eyePairStudyCount !== 0
  ) fail('active Eye-Pair calibration coverage is no longer empty; FR-183 must not issue the zero-coverage verdict.');

  const fr181 = issueEyePairFR175ExactScanPagePinningFR181();
  assertIssuedEyePairFR175ExactScanPagePinningFR181(fr181);
  if (
    fr181.verdict !== FR181_VERDICT
    || fr181.locatorClosure.exactEyePassageScanPage !== 88
    || fr181.locatorClosure.exactEyePassageScanPageResolved !== true
    || fr181.visualReview.selectedImmutablePageImageRef !== FR183_PAGE_88_REF
    || fr181.locatorClosure.scanCheckedEyePassagePromotionAuthorized !== false
    || fr181.locatorClosure.doubleCheckedSourceAuthorized !== false
    || fr181.authorityBoundary.traditionalSemanticAuthorityPromoted !== false
  ) fail('FR-181 exact-page locator authority drift.');

  const fr182 = issueEyePairFR176DarumaEyeExactScanPagePinningFR182();
  assertIssuedEyePairFR176DarumaEyeExactScanPagePinningFR182(fr182);
  if (
    fr182.verdict !== FR182_VERDICT
    || fr182.nextFrontier !== FR182_NEXT_FRONTIER
    || FR182_NEXT_FRONTIER !== 'review_fr180_xi_chang_operationalization_requirements_with_both_exact_source_pages_pinned_while_traditional_binding_remains_not_admitted'
    || fr182.locatorClosure.exactDarumaEyeScanPage !== 146
    || fr182.locatorClosure.exactDarumaEyeScanPageResolved !== true
    || fr182.visualReview.selectedImmutablePageImageRef !== FR182_PAGE_146_REF
    || fr182.visualReview.selectedImmutablePageImageSha256 !== FR182_PAGE_146_IMAGE_SHA256
    || fr182.locatorClosure.scanCheckedDarumaEyePassagePromotionAuthorized !== false
    || fr182.locatorClosure.doubleCheckedSourceAuthorized !== false
    || fr182.remainingBlockers !== FR182_REMAINING_BLOCKERS
    || fr182.authorityBoundary.traditionalSemanticAuthorityPromoted !== false
    || fr182.authorityBoundary.productionRuleAuthorized !== false
  ) fail('FR-182 exact-page locator authority drift.');

  return {
    calibrationReaudit: Object.freeze({
      requiredEvidenceClasses: FR180_REQUIRED_CALIBRATION_EVIDENCE_CLASSES,
      eyePairCoveredEvidenceCount: 0 as const,
      eyePairCaptureProtocolCount: 0 as const,
      eyePairLabelingProtocolCount: 0 as const,
      eyePairStudyCount: 0 as const,
      anyCriterionSpecificCalibrationAuthorityFound: false as const,
      reviewerBlindingStillRequired: true as const,
      participantLevelDatasetSplitStillRequired: true as const,
      thresholdSelectionMayReadHoldout: false as const,
    }),
  };
}

export function issueEyePairXiChangOperationalizationRequirementsRereviewFR183(): EyePairXiChangOperationalizationRequirementsRereviewFR183V1 {
  const { calibrationReaudit } = validateUpstreamAuthority();

  const authorityBoundary: FR183AuthorityBoundaryV1 = Object.freeze({
    provenancePrerequisitesSatisfied: true as const,
    provenanceSatisfactionMeansMetricBinding: false as const,
    xiMetricBindingAuthorized: false as const,
    changMetricBindingAuthorized: false as const,
    metricDirectionalityAuthorized: false as const,
    stableCriterionIdentityIssued: false as const,
    thresholdIssued: false as const,
    percentileIssued: false as const,
    referencePopulationIssued: false as const,
    calibrationEvidenceIssued: false as const,
    calibrationProtocolIssued: false as const,
    calibratedDecisionRuleIssued: false as const,
    classifierIssued: false as const,
    scoreIssued: false as const,
    rankIssued: false as const,
    traditionalJiOperationalizationAuthorized: false as const,
    traditionalCunMappingAuthorized: false as const,
    compoundXiErChangRuleAuthorized: false as const,
    scanCheckedRegistryPromotionAuthorized: false as const,
    doubleCheckedSourceAuthorized: false as const,
    morphologyProduced: false as const,
    criterionStatesIssued: 0 as const,
    structuredClaimsIssued: 0 as const,
    boundedNarrativesIssued: 0 as const,
    productionRuleAuthorized: false as const,
    traditionalSemanticAuthorityPromoted: false as const,
  });
  assertFR183AuthorityBoundary(authorityBoundary);

  const result: EyePairXiChangOperationalizationRequirementsRereviewFR183V1 = Object.freeze({
    schemaVersion: 'fr183-eye-pair-xi-chang-operationalization-requirements-rereview-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR183_RECORD_ID,
    authorityState: 'source_page_prerequisites_satisfied_requirements_rereviewed_no_binding_admitted' as const,
    upstreamAuthority: Object.freeze({
      fr180Verdict: FR180_VERDICT,
      fr180NextFrontier: FR180_NEXT_FRONTIER,
      fr181Verdict: FR181_VERDICT,
      fr182Verdict: FR182_VERDICT,
      fr182NextFrontier: FR182_NEXT_FRONTIER,
    }),
    sourcePrerequisiteReview: Object.freeze({
      fixedWitnessIdentityConsistent: true as const,
      exactFR175EyePassageScanPageRequired: true as const,
      exactFR175EyePassageScanPageNowPinned: true as const,
      exactFR175EyePassageScanPage: 88 as const,
      fr175ImmutablePageImageRef: FR183_PAGE_88_REF,
      fr175ImmutablePageImageSha256: FR183_PAGE_88_IMAGE_SHA256,
      exactFR176DarumaEyeScanPageRequired: true as const,
      exactFR176DarumaEyeScanPageNowPinned: true as const,
      exactFR176DarumaEyeScanPage: 146 as const,
      fr176ImmutablePageImageRef: FR182_PAGE_146_REF,
      fr176ImmutablePageImageSha256: FR182_PAGE_146_IMAGE_SHA256,
      locatorPrerequisitesSatisfied: true as const,
      scanCheckedPromotionAuthorized: false as const,
      doubleCheckedSourceAuthorized: false as const,
      provenanceSatisfactionDoesNotAuthorizeTraditionalBinding: true as const,
    }),
    calibrationReaudit,
    xiReview: Object.freeze({
      traditionalConcept: '細' as const,
      candidateMetricRef: XI_CANDIDATE_METRIC_REF,
      neutralMetricAvailable: true as const,
      sourceAuthorizedMetricRelationCurrentlyIssued: false as const,
      metricDirectionalityCurrentlyIssued: false as const,
      stableCriterionIdentityCurrentlyIssued: false as const,
      criterionSpecificCalibrationEvidencePresent: false as const,
      criterionSpecificCalibrationProtocolPresent: false as const,
      calibratedDecisionRulePresent: false as const,
      traditionalBindingDecision: 'not_admitted' as const,
    }),
    changReview: Object.freeze({
      traditionalConcept: '長' as const,
      candidateMetricRef: CHANG_CANDIDATE_METRIC_REF,
      neutralMetricAvailable: true as const,
      sourceAuthorizedMetricRelationCurrentlyIssued: false as const,
      metricDirectionalityCurrentlyIssued: false as const,
      stableCriterionIdentityCurrentlyIssued: false as const,
      criterionSpecificCalibrationEvidencePresent: false as const,
      criterionSpecificCalibrationProtocolPresent: false as const,
      calibratedDecisionRulePresent: false as const,
      normalizedRatioMeansTraditionalAbsoluteLength: false as const,
      traditionalBindingDecision: 'not_admitted' as const,
    }),
    compoundReview: Object.freeze({
      sourceClause: '細而長' as const,
      xiBindingCurrentlyAdmitted: false as const,
      changBindingCurrentlyAdmitted: false as const,
      sourceAuthorizedCompositionRuleCurrentlyIssued: false as const,
      simpleBooleanAndAuthorized: false as const,
      compoundBindingDecision: 'not_admitted' as const,
    }),
    resolvedSinceFR180: Object.freeze([
      'fr175_exact_eye_passage_scan_page_not_pinned',
      'fr176_exact_daruma_eye_scan_page_not_pinned',
    ] as const),
    remainingBlockers: FR183_REMAINING_BLOCKERS,
    authorityBoundary,
    privacyBoundary: Object.freeze({
      participantDerivedMaterialAccepted: false as const,
      participantImageAccepted: false as const,
      rawProviderResponseAccepted: false as const,
      rawLandmarkSetAccepted: false as const,
      metricValuesPersisted: false as const,
      faceEmbeddingAccepted: false as const,
      identityTemplateAccepted: false as const,
      biometricIdentityMatchingPerformed: false as const,
    }),
    verdict: FR183_VERDICT,
    researchNoteRef: FR183_RESEARCH_NOTE_REF,
    nextFrontier: FR183_NEXT_FRONTIER,
  });

  ISSUED.add(result);
  return result;
}

export function assertIssuedEyePairXiChangOperationalizationRequirementsRereviewFR183(
  result: EyePairXiChangOperationalizationRequirementsRereviewFR183V1,
): void {
  if (!ISSUED.has(result)) fail('requirements re-review was not issued by the active FR-183 boundary.');
  assertFR183AuthorityBoundary(result.authorityBoundary);
  if (
    result.schemaVersion !== 'fr183-eye-pair-xi-chang-operationalization-requirements-rereview-v1'
    || result.artifactVersion !== '0.1.0'
    || result.recordId !== FR183_RECORD_ID
    || result.authorityState !== 'source_page_prerequisites_satisfied_requirements_rereviewed_no_binding_admitted'
    || result.sourcePrerequisiteReview.exactFR175EyePassageScanPage !== 88
    || result.sourcePrerequisiteReview.fr175ImmutablePageImageRef !== FR183_PAGE_88_REF
    || result.sourcePrerequisiteReview.exactFR176DarumaEyeScanPage !== 146
    || result.sourcePrerequisiteReview.fr176ImmutablePageImageRef !== FR182_PAGE_146_REF
    || result.sourcePrerequisiteReview.locatorPrerequisitesSatisfied !== true
    || result.calibrationReaudit.requiredEvidenceClasses !== FR180_REQUIRED_CALIBRATION_EVIDENCE_CLASSES
    || result.calibrationReaudit.eyePairCoveredEvidenceCount !== 0
    || result.calibrationReaudit.eyePairCaptureProtocolCount !== 0
    || result.calibrationReaudit.eyePairLabelingProtocolCount !== 0
    || result.calibrationReaudit.eyePairStudyCount !== 0
    || result.xiReview.traditionalBindingDecision !== 'not_admitted'
    || result.changReview.traditionalBindingDecision !== 'not_admitted'
    || result.compoundReview.compoundBindingDecision !== 'not_admitted'
    || result.remainingBlockers !== FR183_REMAINING_BLOCKERS
    || result.privacyBoundary.biometricIdentityMatchingPerformed !== false
    || result.verdict !== FR183_VERDICT
    || result.researchNoteRef !== FR183_RESEARCH_NOTE_REF
    || result.nextFrontier !== FR183_NEXT_FRONTIER
  ) fail('issued FR-183 authority drift.');
}
