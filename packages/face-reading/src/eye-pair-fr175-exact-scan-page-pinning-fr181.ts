import { FR103_NLC_INTAKE_SCAN_EVIDENCE } from './five-officers-mouth-scan-evidence-acquisition-fr103.js';
import {
  assertIssuedEyePairTraditionalSourceLineageDirectPassageBindingFR175,
  FR175_DIRECT_PASSAGE,
  issueEyePairTraditionalSourceLineageDirectPassageBindingFR175,
} from './eye-pair-traditional-source-lineage-direct-passage-binding-fr175.js';
import {
  assertIssuedEyePairXiChangOperationalizationRequirementsFR180,
  FR180_NEXT_FRONTIER,
  FR180_VERDICT,
  issueEyePairXiChangOperationalizationRequirementsFR180,
} from './eye-pair-xi-chang-operationalization-requirements-fr180.js';
import { FaceAuthorityValidationError } from './validation.js';

const PAGE_87_REF =
  'packages/face-reading/evidence/fr103/nlc-1925-page-87.png#sha256:9a3cbda77616c6c359e2aaca173d8f4d3c7ef867449247d9d3887847d9882073' as const;
const PAGE_88_REF =
  'packages/face-reading/evidence/fr103/nlc-1925-page-88.png#sha256:5ceedcabaa806ab2a4a55a1923681b5b7b246b01c62af42ee8ba56413d207fce' as const;

export const FR181_RECORD_ID =
  'research.face_reading.eye_pair.fr175_exact_scan_page_pinning.fr181' as const;
export const FR181_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr181-fr175-eye-passage-exact-scan-page-pinning.md' as const;
export const FR181_VISUAL_CHECKER_REF =
  'checker.fr181.interactive_visual_review.primary' as const;
export const FR181_VERDICT =
  'FR175_EYE_PASSAGE_EXACT_SCAN_PAGE_PINNED_LOCATOR_ONLY' as const;
export const FR181_NEXT_FRONTIER =
  'acquire_and_pin_exact_fr176_daruma_eye_scan_page_before_any_xi_chang_calibration' as const;

export const FR181_REMAINING_BLOCKERS = Object.freeze([
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

export interface EyePairFR175ExactScanPagePinningFR181V1 {
  readonly schemaVersion: 'fr181-eye-pair-fr175-exact-scan-page-pinning-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR181_RECORD_ID;
  readonly authorityState: 'fr175_exact_scan_page_visually_pinned_locator_only';
  readonly upstreamAuthority: {
    readonly fr180Verdict: typeof FR180_VERDICT;
    readonly fr180NextFrontier: typeof FR180_NEXT_FRONTIER;
    readonly fr175HistoricalDirectPassage: typeof FR175_DIRECT_PASSAGE;
    readonly fr175HistoricalScanPageWindow: readonly [87, 88];
    readonly fr175HistoricalExactScanPage: null;
    readonly fr175HistoricalExactScanPageResolved: false;
    readonly fr175HistoricalScanCheckedPromotionAuthorized: false;
    readonly fr103MouthVisualMatchReusedAsEyeVisualMatch: false;
  };
  readonly sourceIdentity: {
    readonly workRef: 'work.shenxiang_quanbian';
    readonly witnessId: 'witness.shenxiang_quanbian.nlc_1925';
    readonly editionLabel: '文明書局 民國十四年本 — NLC scan';
    readonly publicationYear: 1925;
    readonly holdingInstitution: '國家圖書館';
    readonly sourceFilePageRef: 'https://commons.wikimedia.org/wiki/File:NLC416-13jh001662-59167_神相全編.pdf';
    readonly sourcePdfSha256: typeof FR103_NLC_INTAKE_SCAN_EVIDENCE.sourcePdfSha256;
    readonly sourcePdfPageCount: 576;
    readonly sourceIdentityUnchanged: true;
  };
  readonly visualReview: {
    readonly reviewMode: 'direct_interactive_visual_review_of_repository_frozen_page_images';
    readonly reviewedPageRefs: readonly [typeof PAGE_87_REF, typeof PAGE_88_REF];
    readonly page87Finding: 'five_officer_introduction_and_officer_sequence_without_full_fr175_target_passage';
    readonly page88Finding: 'exact_fr175_monitoring_officer_direct_passage_visible';
    readonly selectedExactScanPage: 88;
    readonly selectedImmutablePageImageRef: typeof PAGE_88_REF;
    readonly visuallyMatchedText: typeof FR175_DIRECT_PASSAGE;
    readonly visualPassageMatchConfirmed: true;
    readonly checkerRef: typeof FR181_VISUAL_CHECKER_REF;
    readonly fr103MouthCheckerReused: false;
    readonly ocrUsedForEvidenceAdmission: false;
    readonly searchIndexUsedForEvidenceAdmission: false;
    readonly translationUsedAsAuthority: false;
    readonly secondarySourceUsedAsAuthority: false;
  };
  readonly locatorClosure: {
    readonly exactEyePassageScanPage: 88;
    readonly exactEyePassageScanPageResolved: true;
    readonly locatorGapResolved: true;
    readonly selectedPageInsideHistoricalWindow: true;
    readonly immutablePageImagePinned: true;
    readonly baseRegistryInsertionAuthorized: false;
    readonly pageVerificationRecordAuthorized: false;
    readonly scanCheckedEyePassagePromotionAuthorized: false;
    readonly doubleCheckedSourceAuthorized: false;
    readonly methodologyProductionPromotionAuthorized: false;
  };
  readonly resolvedBlockers: readonly ['fr175_exact_eye_passage_scan_page_not_pinned'];
  readonly remainingBlockers: typeof FR181_REMAINING_BLOCKERS;
  readonly authorityBoundary: {
    readonly exactPageMeansTraditionalXi: false;
    readonly exactPageMeansTraditionalChang: false;
    readonly directPassageMeansMetricDirectionality: false;
    readonly directPassageMeansThreshold: false;
    readonly directPassageMeansCalibrationEvidence: false;
    readonly directPassageMeansCalibrationProtocol: false;
    readonly directPassageMeansTraditionalJi: false;
    readonly directPassageMeansTraditionalCun: false;
    readonly exactPageMeansCompoundXiErChangRule: false;
    readonly visualMatchMeansScanCheckedRegistryPromotion: false;
    readonly singleVisualCheckerMeansDoubleChecked: false;
    readonly thresholdIssued: false;
    readonly classifierIssued: false;
    readonly scoreIssued: false;
    readonly rankIssued: false;
    readonly calibrationIssued: false;
    readonly morphologyProduced: false;
    readonly criterionStatesIssued: 0;
    readonly structuredClaimsIssued: 0;
    readonly boundedNarrativesIssued: 0;
    readonly productionRuleAuthorized: false;
    readonly traditionalSemanticAuthorityPromoted: false;
  };
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
  readonly verdict: typeof FR181_VERDICT;
  readonly researchNoteRef: typeof FR181_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR181_NEXT_FRONTIER;
}

const ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-181 ${message}`);
}

function validateUpstreamAuthority(): void {
  const fr180 = issueEyePairXiChangOperationalizationRequirementsFR180();
  assertIssuedEyePairXiChangOperationalizationRequirementsFR180(fr180);
  if (
    fr180.verdict !== FR180_VERDICT
    || fr180.nextFrontier !== FR180_NEXT_FRONTIER
    || fr180.sourcePromotionRequirements.exactFR175EyePassageScanPageRequired !== true
    || fr180.sourcePromotionRequirements.exactFR175EyePassageScanPageCurrentlyPinned !== false
    || fr180.sourcePromotionRequirements.exactFR176DarumaEyeScanPageRequired !== true
    || fr180.sourcePromotionRequirements.exactFR176DarumaEyeScanPageCurrentlyPinned !== false
    || fr180.decisionBoundary.thresholdIssued !== false
    || fr180.decisionBoundary.traditionalSemanticAuthorityPromoted !== false
  ) fail('FR-180 operationalization requirements drift.');

  if (FR180_NEXT_FRONTIER !== 'acquire_and_pin_exact_fr175_monitoring_officer_eye_passage_scan_page_before_any_xi_chang_calibration') {
    fail('FR-180 next-frontier authority drift.');
  }

  const fr175 = issueEyePairTraditionalSourceLineageDirectPassageBindingFR175();
  assertIssuedEyePairTraditionalSourceLineageDirectPassageBindingFR175(fr175);
  if (
    fr175.source.directPassage !== FR175_DIRECT_PASSAGE
    || fr175.source.workRef !== 'work.shenxiang_quanbian'
    || fr175.source.witnessId !== 'witness.shenxiang_quanbian.nlc_1925'
    || fr175.source.editionLabel !== '文明書局 民國十四年本 — NLC scan'
    || fr175.source.publicationYear !== 1925
    || fr175.source.holdingInstitution !== '國家圖書館'
    || fr175.source.sourceFilePageRef !== FR103_NLC_INTAKE_SCAN_EVIDENCE.sourceFilePageRef
    || fr175.source.sourcePdfSha256 !== FR103_NLC_INTAKE_SCAN_EVIDENCE.sourcePdfSha256
    || fr175.source.sourcePdfPageCount !== FR103_NLC_INTAKE_SCAN_EVIDENCE.sourcePdfPageCount
    || fr175.locator.scanPageWindow[0] !== 87
    || fr175.locator.scanPageWindow[1] !== 88
    || fr175.locator.exactEyePassageScanPage !== null
    || fr175.locator.exactEyePassageScanPageResolved !== false
    || fr175.locator.scanCheckedEyePassagePromotionAuthorized !== false
  ) fail('FR-175 historical source or unresolved locator boundary drift.');

  const evidence = FR103_NLC_INTAKE_SCAN_EVIDENCE;
  if (
    evidence.sourcePdfSha256 !== 'sha256:94167d8d19d47525535b39e18a20c6b315a3a30751c2063bc2492760f1d927af'
    || evidence.sourcePdfPageCount !== 576
    || evidence.visualEvidenceRefs.length !== 2
    || evidence.visualEvidenceRefs[0] !== PAGE_87_REF
    || evidence.visualEvidenceRefs[1] !== PAGE_88_REF
    || evidence.immutablePageImageRef !== PAGE_88_REF
    || evidence.exactScanPage !== 88
    || evidence.visualPassageMatchConfirmed !== true
    || evidence.visuallyMatchedText !== '口須要方大，唇紅端厚，角弓，開大合小，乃為出納官成。'
    || evidence.ocrUsedForEvidenceAdmission !== false
    || evidence.searchIndexUsedForEvidenceAdmission !== false
  ) fail('FR-103 immutable frozen page-image evidence drift.');
}

export function issueEyePairFR175ExactScanPagePinningFR181(): EyePairFR175ExactScanPagePinningFR181V1 {
  validateUpstreamAuthority();

  const result: EyePairFR175ExactScanPagePinningFR181V1 = Object.freeze({
    schemaVersion: 'fr181-eye-pair-fr175-exact-scan-page-pinning-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR181_RECORD_ID,
    authorityState: 'fr175_exact_scan_page_visually_pinned_locator_only' as const,
    upstreamAuthority: Object.freeze({
      fr180Verdict: FR180_VERDICT,
      fr180NextFrontier: FR180_NEXT_FRONTIER,
      fr175HistoricalDirectPassage: FR175_DIRECT_PASSAGE,
      fr175HistoricalScanPageWindow: Object.freeze([87, 88] as const),
      fr175HistoricalExactScanPage: null,
      fr175HistoricalExactScanPageResolved: false as const,
      fr175HistoricalScanCheckedPromotionAuthorized: false as const,
      fr103MouthVisualMatchReusedAsEyeVisualMatch: false as const,
    }),
    sourceIdentity: Object.freeze({
      workRef: 'work.shenxiang_quanbian' as const,
      witnessId: 'witness.shenxiang_quanbian.nlc_1925' as const,
      editionLabel: '文明書局 民國十四年本 — NLC scan' as const,
      publicationYear: 1925 as const,
      holdingInstitution: '國家圖書館' as const,
      sourceFilePageRef: FR103_NLC_INTAKE_SCAN_EVIDENCE.sourceFilePageRef,
      sourcePdfSha256: FR103_NLC_INTAKE_SCAN_EVIDENCE.sourcePdfSha256,
      sourcePdfPageCount: 576 as const,
      sourceIdentityUnchanged: true as const,
    }),
    visualReview: Object.freeze({
      reviewMode: 'direct_interactive_visual_review_of_repository_frozen_page_images' as const,
      reviewedPageRefs: Object.freeze([PAGE_87_REF, PAGE_88_REF] as const),
      page87Finding: 'five_officer_introduction_and_officer_sequence_without_full_fr175_target_passage' as const,
      page88Finding: 'exact_fr175_monitoring_officer_direct_passage_visible' as const,
      selectedExactScanPage: 88 as const,
      selectedImmutablePageImageRef: PAGE_88_REF,
      visuallyMatchedText: FR175_DIRECT_PASSAGE,
      visualPassageMatchConfirmed: true as const,
      checkerRef: FR181_VISUAL_CHECKER_REF,
      fr103MouthCheckerReused: false as const,
      ocrUsedForEvidenceAdmission: false as const,
      searchIndexUsedForEvidenceAdmission: false as const,
      translationUsedAsAuthority: false as const,
      secondarySourceUsedAsAuthority: false as const,
    }),
    locatorClosure: Object.freeze({
      exactEyePassageScanPage: 88 as const,
      exactEyePassageScanPageResolved: true as const,
      locatorGapResolved: true as const,
      selectedPageInsideHistoricalWindow: true as const,
      immutablePageImagePinned: true as const,
      baseRegistryInsertionAuthorized: false as const,
      pageVerificationRecordAuthorized: false as const,
      scanCheckedEyePassagePromotionAuthorized: false as const,
      doubleCheckedSourceAuthorized: false as const,
      methodologyProductionPromotionAuthorized: false as const,
    }),
    resolvedBlockers: Object.freeze(['fr175_exact_eye_passage_scan_page_not_pinned'] as const),
    remainingBlockers: FR181_REMAINING_BLOCKERS,
    authorityBoundary: Object.freeze({
      exactPageMeansTraditionalXi: false as const,
      exactPageMeansTraditionalChang: false as const,
      directPassageMeansMetricDirectionality: false as const,
      directPassageMeansThreshold: false as const,
      directPassageMeansCalibrationEvidence: false as const,
      directPassageMeansCalibrationProtocol: false as const,
      directPassageMeansTraditionalJi: false as const,
      directPassageMeansTraditionalCun: false as const,
      exactPageMeansCompoundXiErChangRule: false as const,
      visualMatchMeansScanCheckedRegistryPromotion: false as const,
      singleVisualCheckerMeansDoubleChecked: false as const,
      thresholdIssued: false as const,
      classifierIssued: false as const,
      scoreIssued: false as const,
      rankIssued: false as const,
      calibrationIssued: false as const,
      morphologyProduced: false as const,
      criterionStatesIssued: 0 as const,
      structuredClaimsIssued: 0 as const,
      boundedNarrativesIssued: 0 as const,
      productionRuleAuthorized: false as const,
      traditionalSemanticAuthorityPromoted: false as const,
    }),
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
    verdict: FR181_VERDICT,
    researchNoteRef: FR181_RESEARCH_NOTE_REF,
    nextFrontier: FR181_NEXT_FRONTIER,
  });

  ISSUED.add(result);
  return result;
}

export function assertIssuedEyePairFR175ExactScanPagePinningFR181(
  result: EyePairFR175ExactScanPagePinningFR181V1,
): void {
  if (!ISSUED.has(result)) fail('scan-page pinning was not issued by the active FR-181 boundary.');
  if (
    result.schemaVersion !== 'fr181-eye-pair-fr175-exact-scan-page-pinning-v1'
    || result.artifactVersion !== '0.1.0'
    || result.recordId !== FR181_RECORD_ID
    || result.authorityState !== 'fr175_exact_scan_page_visually_pinned_locator_only'
    || result.upstreamAuthority.fr175HistoricalExactScanPage !== null
    || result.upstreamAuthority.fr175HistoricalExactScanPageResolved !== false
    || result.upstreamAuthority.fr103MouthVisualMatchReusedAsEyeVisualMatch !== false
    || result.sourceIdentity.sourcePdfSha256 !== FR103_NLC_INTAKE_SCAN_EVIDENCE.sourcePdfSha256
    || result.sourceIdentity.sourcePdfPageCount !== 576
    || result.visualReview.selectedExactScanPage !== 88
    || result.visualReview.selectedImmutablePageImageRef !== PAGE_88_REF
    || result.visualReview.visuallyMatchedText !== FR175_DIRECT_PASSAGE
    || result.visualReview.visualPassageMatchConfirmed !== true
    || result.visualReview.checkerRef !== FR181_VISUAL_CHECKER_REF
    || result.visualReview.fr103MouthCheckerReused !== false
    || result.visualReview.ocrUsedForEvidenceAdmission !== false
    || result.visualReview.searchIndexUsedForEvidenceAdmission !== false
    || result.locatorClosure.exactEyePassageScanPage !== 88
    || result.locatorClosure.exactEyePassageScanPageResolved !== true
    || result.locatorClosure.locatorGapResolved !== true
    || result.locatorClosure.scanCheckedEyePassagePromotionAuthorized !== false
    || result.locatorClosure.doubleCheckedSourceAuthorized !== false
    || result.remainingBlockers !== FR181_REMAINING_BLOCKERS
    || result.authorityBoundary.directPassageMeansThreshold !== false
    || result.authorityBoundary.calibrationIssued !== false
    || result.authorityBoundary.productionRuleAuthorized !== false
    || result.authorityBoundary.traditionalSemanticAuthorityPromoted !== false
    || result.privacyBoundary.participantDerivedMaterialAccepted !== false
    || result.privacyBoundary.biometricIdentityMatchingPerformed !== false
    || result.verdict !== FR181_VERDICT
    || result.researchNoteRef !== FR181_RESEARCH_NOTE_REF
    || result.nextFrontier !== FR181_NEXT_FRONTIER
  ) fail('FR-181 exact-scan-page locator authority drift.');
}
