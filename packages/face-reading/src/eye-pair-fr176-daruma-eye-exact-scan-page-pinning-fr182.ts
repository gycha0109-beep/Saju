import { FR103_NLC_INTAKE_SCAN_EVIDENCE } from './five-officers-mouth-scan-evidence-acquisition-fr103.js';
import {
  assertIssuedDarumaEyeMorphologySourceReviewFR176,
  FR176_DIRECT_SELECTED_WITNESS_CLAUSES,
  FR176_NEXT_FRONTIER,
  FR176_VERDICT,
  issueDarumaEyeMorphologySourceReviewFR176,
} from './daruma-eye-morphology-source-review-fr176.js';
import {
  assertIssuedEyePairFR175ExactScanPagePinningFR181,
  FR181_NEXT_FRONTIER,
  FR181_REMAINING_BLOCKERS,
  FR181_VERDICT,
  issueEyePairFR175ExactScanPagePinningFR181,
} from './eye-pair-fr175-exact-scan-page-pinning-fr181.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR182_RECORD_ID =
  'research.face_reading.eye_pair.fr176_daruma_eye_exact_scan_page_pinning.fr182' as const;
export const FR182_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr182-fr176-daruma-eye-exact-scan-page-pinning.md' as const;
export const FR182_VISUAL_CHECKER_REF =
  'checker.fr182.interactive_visual_review.primary' as const;
export const FR182_VERDICT =
  'FR176_DARUMA_EYE_EXACT_SCAN_PAGE_PINNED_LOCATOR_ONLY' as const;
export const FR182_NEXT_FRONTIER =
  'review_fr180_xi_chang_operationalization_requirements_with_both_exact_source_pages_pinned_while_traditional_binding_remains_not_admitted' as const;
export const FR182_PAGE_146_IMAGE_SHA256 =
  'sha256:522e5cc94a1fbd885a298cedd8aea94e7a95dd4877d93afa10129e707e8059c7' as const;
export const FR182_PAGE_146_REF =
  'packages/face-reading/evidence/fr182/nlc-1925-page-146.png#sha256:522e5cc94a1fbd885a298cedd8aea94e7a95dd4877d93afa10129e707e8059c7' as const;
export const FR182_REVIEWED_PAGE_WINDOW = Object.freeze([145, 147] as const);

export const FR182_REMAINING_BLOCKERS = Object.freeze([
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

export interface DarumaEyeFrozenEvidenceManifestFR182V1 {
  readonly workRef: 'work.shenxiang_quanbian';
  readonly witnessId: 'witness.shenxiang_quanbian.nlc_1925';
  readonly sourcePdfSha256: 'sha256:94167d8d19d47525535b39e18a20c6b315a3a30751c2063bc2492760f1d927af';
  readonly sourcePdfPageCount: 576;
  readonly section: '卷三 / 達摩相眼';
  readonly reviewedPageWindow: readonly [145, 147];
  readonly exactScanPage: 146;
  readonly immutablePageImageRef: typeof FR182_PAGE_146_REF;
  readonly immutablePageImageSha256: typeof FR182_PAGE_146_IMAGE_SHA256;
  readonly visibleHeading: '達摩相眼';
  readonly visuallyMatchedClauses: typeof FR176_DIRECT_SELECTED_WITNESS_CLAUSES;
  readonly visualPassageMatchConfirmed: true;
  readonly ocrUsedForEvidenceAdmission: false;
  readonly searchIndexUsedForEvidenceAdmission: false;
}

export const FR182_FROZEN_EVIDENCE_MANIFEST: DarumaEyeFrozenEvidenceManifestFR182V1 = Object.freeze({
  workRef: 'work.shenxiang_quanbian' as const,
  witnessId: 'witness.shenxiang_quanbian.nlc_1925' as const,
  sourcePdfSha256: 'sha256:94167d8d19d47525535b39e18a20c6b315a3a30751c2063bc2492760f1d927af' as const,
  sourcePdfPageCount: 576 as const,
  section: '卷三 / 達摩相眼' as const,
  reviewedPageWindow: FR182_REVIEWED_PAGE_WINDOW,
  exactScanPage: 146 as const,
  immutablePageImageRef: FR182_PAGE_146_REF,
  immutablePageImageSha256: FR182_PAGE_146_IMAGE_SHA256,
  visibleHeading: '達摩相眼' as const,
  visuallyMatchedClauses: FR176_DIRECT_SELECTED_WITNESS_CLAUSES,
  visualPassageMatchConfirmed: true as const,
  ocrUsedForEvidenceAdmission: false as const,
  searchIndexUsedForEvidenceAdmission: false as const,
});

export interface FR182AuthorityBoundaryV1 {
  readonly thinMetricBindingAuthorized: false;
  readonly longMetricBindingAuthorized: false;
  readonly metricDirectionalityAuthorized: false;
  readonly thresholdIssued: false;
  readonly percentileIssued: false;
  readonly referencePopulationIssued: false;
  readonly calibrationEvidenceIssued: false;
  readonly calibrationProtocolIssued: false;
  readonly decisionRuleIssued: false;
  readonly classifierIssued: false;
  readonly scoreIssued: false;
  readonly rankIssued: false;
  readonly traditionalJiOperationalizationAuthorized: false;
  readonly traditionalCunMappingAuthorized: false;
  readonly compoundXiErChangRuleAuthorized: false;
  readonly morphologyProduced: false;
  readonly criterionStatesIssued: 0;
  readonly structuredClaimsIssued: 0;
  readonly boundedNarrativesIssued: 0;
  readonly scanCheckedRegistryPromotionAuthorized: false;
  readonly doubleCheckedSourceAuthorized: false;
  readonly anatomicalLateralityResolved: false;
  readonly individualEyeAsymmetryOutputAuthorized: false;
  readonly productionRuleAuthorized: false;
  readonly traditionalSemanticAuthorityPromoted: false;
}

export interface EyePairFR176DarumaEyeExactScanPagePinningFR182V1 {
  readonly schemaVersion: 'fr182-eye-pair-fr176-daruma-eye-exact-scan-page-pinning-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR182_RECORD_ID;
  readonly authorityState: 'fr176_daruma_eye_exact_scan_page_visually_pinned_locator_only';
  readonly upstreamAuthority: {
    readonly fr181Verdict: typeof FR181_VERDICT;
    readonly fr181NextFrontier: typeof FR181_NEXT_FRONTIER;
    readonly fr181ExactEyePassageScanPage: 88;
    readonly fr176Verdict: typeof FR176_VERDICT;
    readonly fr176NextFrontier: typeof FR176_NEXT_FRONTIER;
    readonly fr176HistoricalSection: '卷三 / 達摩相眼';
    readonly fr176HistoricalSelectedClauses: typeof FR176_DIRECT_SELECTED_WITNESS_CLAUSES;
    readonly fr176HistoricalExactDarumaEyeScanPage: null;
    readonly fr176HistoricalExactDarumaEyeScanPageResolved: false;
    readonly fr176HistoricalImmutableScanEvidenceAvailable: false;
    readonly fr176HistoricalScanCheckedPromotionAuthorized: false;
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
    readonly reviewMode: 'direct_interactive_visual_review_of_fixed_witness_render';
    readonly reviewedPageWindow: typeof FR182_REVIEWED_PAGE_WINDOW;
    readonly page145Finding: 'preceding_xiang_mu_lun_context_without_fr176_daruma_eye_heading';
    readonly page146Finding: 'exact_daruma_eye_heading_and_all_six_fr176_selected_clauses_visible';
    readonly page147Finding: 'subsequent_eye_interpretation_continuation_after_fr176_target_page';
    readonly selectedExactScanPage: 146;
    readonly selectedImmutablePageImageRef: typeof FR182_PAGE_146_REF;
    readonly selectedImmutablePageImageSha256: typeof FR182_PAGE_146_IMAGE_SHA256;
    readonly visibleHeading: '達摩相眼';
    readonly visuallyMatchedClauses: typeof FR176_DIRECT_SELECTED_WITNESS_CLAUSES;
    readonly allSelectedClausesVisible: true;
    readonly checkerRef: typeof FR182_VISUAL_CHECKER_REF;
    readonly ocrUsedForEvidenceAdmission: false;
    readonly searchIndexUsedForEvidenceAdmission: false;
    readonly translationUsedAsAuthority: false;
    readonly secondarySourceUsedAsAuthority: false;
  };
  readonly locatorClosure: {
    readonly exactDarumaEyeScanPage: 146;
    readonly exactDarumaEyeScanPageResolved: true;
    readonly locatorGapResolved: true;
    readonly immutablePageImagePinned: true;
    readonly baseRegistryInsertionAuthorized: false;
    readonly pageVerificationRecordAuthorized: false;
    readonly scanCheckedDarumaEyePassagePromotionAuthorized: false;
    readonly doubleCheckedSourceAuthorized: false;
    readonly methodologyProductionPromotionAuthorized: false;
  };
  readonly resolvedBlockers: readonly ['fr176_exact_daruma_eye_scan_page_not_pinned'];
  readonly remainingBlockers: typeof FR182_REMAINING_BLOCKERS;
  readonly authorityBoundary: FR182AuthorityBoundaryV1;
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
  readonly provenanceBoundary: {
    readonly c2paRequiredForSourceResearch: false;
    readonly c2paHistoricalArtifactsModified: false;
    readonly samePersonInferencePerformed: false;
  };
  readonly verdict: typeof FR182_VERDICT;
  readonly researchNoteRef: typeof FR182_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR182_NEXT_FRONTIER;
}

const ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-182 ${message}`);
}

function sameClauses(value: readonly string[]): boolean {
  return value.length === FR176_DIRECT_SELECTED_WITNESS_CLAUSES.length
    && value.every((clause, index) => clause === FR176_DIRECT_SELECTED_WITNESS_CLAUSES[index]);
}

export function assertFR182FrozenEvidenceManifest(
  manifest: DarumaEyeFrozenEvidenceManifestFR182V1,
): void {
  if (
    manifest.workRef !== 'work.shenxiang_quanbian'
    || manifest.witnessId !== 'witness.shenxiang_quanbian.nlc_1925'
    || manifest.sourcePdfSha256 !== 'sha256:94167d8d19d47525535b39e18a20c6b315a3a30751c2063bc2492760f1d927af'
    || manifest.sourcePdfPageCount !== 576
    || manifest.section !== '卷三 / 達摩相眼'
    || manifest.reviewedPageWindow[0] !== 145
    || manifest.reviewedPageWindow[1] !== 147
    || manifest.exactScanPage !== 146
    || manifest.immutablePageImageRef !== FR182_PAGE_146_REF
    || manifest.immutablePageImageSha256 !== FR182_PAGE_146_IMAGE_SHA256
    || manifest.visibleHeading !== '達摩相眼'
    || !sameClauses(manifest.visuallyMatchedClauses)
    || manifest.visualPassageMatchConfirmed !== true
    || manifest.ocrUsedForEvidenceAdmission !== false
    || manifest.searchIndexUsedForEvidenceAdmission !== false
  ) fail('frozen evidence manifest drift.');
}

export function assertFR182AuthorityBoundary(boundary: FR182AuthorityBoundaryV1): void {
  if (
    boundary.thinMetricBindingAuthorized !== false
    || boundary.longMetricBindingAuthorized !== false
    || boundary.metricDirectionalityAuthorized !== false
    || boundary.thresholdIssued !== false
    || boundary.percentileIssued !== false
    || boundary.referencePopulationIssued !== false
    || boundary.calibrationEvidenceIssued !== false
    || boundary.calibrationProtocolIssued !== false
    || boundary.decisionRuleIssued !== false
    || boundary.classifierIssued !== false
    || boundary.scoreIssued !== false
    || boundary.rankIssued !== false
    || boundary.traditionalJiOperationalizationAuthorized !== false
    || boundary.traditionalCunMappingAuthorized !== false
    || boundary.compoundXiErChangRuleAuthorized !== false
    || boundary.morphologyProduced !== false
    || boundary.criterionStatesIssued !== 0
    || boundary.structuredClaimsIssued !== 0
    || boundary.boundedNarrativesIssued !== 0
    || boundary.scanCheckedRegistryPromotionAuthorized !== false
    || boundary.doubleCheckedSourceAuthorized !== false
    || boundary.anatomicalLateralityResolved !== false
    || boundary.individualEyeAsymmetryOutputAuthorized !== false
    || boundary.productionRuleAuthorized !== false
    || boundary.traditionalSemanticAuthorityPromoted !== false
  ) fail('authority widening detected.');
}

function validateUpstreamAuthority(): void {
  const fr181 = issueEyePairFR175ExactScanPagePinningFR181();
  assertIssuedEyePairFR175ExactScanPagePinningFR181(fr181);
  if (
    fr181.verdict !== FR181_VERDICT
    || fr181.nextFrontier !== FR181_NEXT_FRONTIER
    || FR181_NEXT_FRONTIER !== 'acquire_and_pin_exact_fr176_daruma_eye_scan_page_before_any_xi_chang_calibration'
    || fr181.locatorClosure.exactEyePassageScanPage !== 88
    || fr181.locatorClosure.exactEyePassageScanPageResolved !== true
    || fr181.locatorClosure.scanCheckedEyePassagePromotionAuthorized !== false
    || fr181.remainingBlockers !== FR181_REMAINING_BLOCKERS
    || fr181.remainingBlockers[0] !== 'fr176_exact_daruma_eye_scan_page_not_pinned'
  ) fail('FR-181 locator frontier drift.');

  if (
    FR181_REMAINING_BLOCKERS.length !== FR182_REMAINING_BLOCKERS.length + 1
    || FR181_REMAINING_BLOCKERS.slice(1).some(
      (blocker, index) => blocker !== FR182_REMAINING_BLOCKERS[index],
    )
  ) fail('remaining blocker lineage drift.');

  const fr176 = issueDarumaEyeMorphologySourceReviewFR176();
  assertIssuedDarumaEyeMorphologySourceReviewFR176(fr176);
  if (
    fr176.verdict !== FR176_VERDICT
    || fr176.nextFrontier !== FR176_NEXT_FRONTIER
    || fr176.source.workRef !== 'work.shenxiang_quanbian'
    || fr176.source.witnessId !== 'witness.shenxiang_quanbian.nlc_1925'
    || fr176.source.editionLabel !== '文明書局 民國十四年本 — NLC scan'
    || fr176.source.publicationYear !== 1925
    || fr176.source.holdingInstitution !== '國家圖書館'
    || fr176.source.sourceFilePageRef !== FR103_NLC_INTAKE_SCAN_EVIDENCE.sourceFilePageRef
    || fr176.source.sourcePdfSha256 !== FR103_NLC_INTAKE_SCAN_EVIDENCE.sourcePdfSha256
    || fr176.source.sourcePdfPageCount !== FR103_NLC_INTAKE_SCAN_EVIDENCE.sourcePdfPageCount
    || fr176.source.section !== '卷三 / 達摩相眼'
    || fr176.source.directSelectedWitnessClauses !== FR176_DIRECT_SELECTED_WITNESS_CLAUSES
    || fr176.locator.exactDarumaEyeScanPage !== null
    || fr176.locator.exactDarumaEyeScanPageResolved !== false
    || fr176.locator.repositoryImmutableDarumaEyeScanEvidenceAvailable !== false
    || fr176.locator.scanCheckedDarumaEyePassagePromotionAuthorized !== false
    || fr176.decisionBoundary.traditionalSemanticAuthorityPromoted !== false
    || fr176.decisionBoundary.productionRuleAuthorized !== false
  ) fail('FR-176 historical source or unresolved locator boundary drift.');

  if (
    FR103_NLC_INTAKE_SCAN_EVIDENCE.sourcePdfSha256 !== 'sha256:94167d8d19d47525535b39e18a20c6b315a3a30751c2063bc2492760f1d927af'
    || FR103_NLC_INTAKE_SCAN_EVIDENCE.sourcePdfPageCount !== 576
  ) fail('fixed NLC witness identity drift.');
}

export function issueEyePairFR176DarumaEyeExactScanPagePinningFR182(): EyePairFR176DarumaEyeExactScanPagePinningFR182V1 {
  validateUpstreamAuthority();
  assertFR182FrozenEvidenceManifest(FR182_FROZEN_EVIDENCE_MANIFEST);

  const authorityBoundary: FR182AuthorityBoundaryV1 = Object.freeze({
    thinMetricBindingAuthorized: false as const,
    longMetricBindingAuthorized: false as const,
    metricDirectionalityAuthorized: false as const,
    thresholdIssued: false as const,
    percentileIssued: false as const,
    referencePopulationIssued: false as const,
    calibrationEvidenceIssued: false as const,
    calibrationProtocolIssued: false as const,
    decisionRuleIssued: false as const,
    classifierIssued: false as const,
    scoreIssued: false as const,
    rankIssued: false as const,
    traditionalJiOperationalizationAuthorized: false as const,
    traditionalCunMappingAuthorized: false as const,
    compoundXiErChangRuleAuthorized: false as const,
    morphologyProduced: false as const,
    criterionStatesIssued: 0 as const,
    structuredClaimsIssued: 0 as const,
    boundedNarrativesIssued: 0 as const,
    scanCheckedRegistryPromotionAuthorized: false as const,
    doubleCheckedSourceAuthorized: false as const,
    anatomicalLateralityResolved: false as const,
    individualEyeAsymmetryOutputAuthorized: false as const,
    productionRuleAuthorized: false as const,
    traditionalSemanticAuthorityPromoted: false as const,
  });
  assertFR182AuthorityBoundary(authorityBoundary);

  const result: EyePairFR176DarumaEyeExactScanPagePinningFR182V1 = Object.freeze({
    schemaVersion: 'fr182-eye-pair-fr176-daruma-eye-exact-scan-page-pinning-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR182_RECORD_ID,
    authorityState: 'fr176_daruma_eye_exact_scan_page_visually_pinned_locator_only' as const,
    upstreamAuthority: Object.freeze({
      fr181Verdict: FR181_VERDICT,
      fr181NextFrontier: FR181_NEXT_FRONTIER,
      fr181ExactEyePassageScanPage: 88 as const,
      fr176Verdict: FR176_VERDICT,
      fr176NextFrontier: FR176_NEXT_FRONTIER,
      fr176HistoricalSection: '卷三 / 達摩相眼' as const,
      fr176HistoricalSelectedClauses: FR176_DIRECT_SELECTED_WITNESS_CLAUSES,
      fr176HistoricalExactDarumaEyeScanPage: null,
      fr176HistoricalExactDarumaEyeScanPageResolved: false as const,
      fr176HistoricalImmutableScanEvidenceAvailable: false as const,
      fr176HistoricalScanCheckedPromotionAuthorized: false as const,
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
      reviewMode: 'direct_interactive_visual_review_of_fixed_witness_render' as const,
      reviewedPageWindow: FR182_REVIEWED_PAGE_WINDOW,
      page145Finding: 'preceding_xiang_mu_lun_context_without_fr176_daruma_eye_heading' as const,
      page146Finding: 'exact_daruma_eye_heading_and_all_six_fr176_selected_clauses_visible' as const,
      page147Finding: 'subsequent_eye_interpretation_continuation_after_fr176_target_page' as const,
      selectedExactScanPage: 146 as const,
      selectedImmutablePageImageRef: FR182_PAGE_146_REF,
      selectedImmutablePageImageSha256: FR182_PAGE_146_IMAGE_SHA256,
      visibleHeading: '達摩相眼' as const,
      visuallyMatchedClauses: FR176_DIRECT_SELECTED_WITNESS_CLAUSES,
      allSelectedClausesVisible: true as const,
      checkerRef: FR182_VISUAL_CHECKER_REF,
      ocrUsedForEvidenceAdmission: false as const,
      searchIndexUsedForEvidenceAdmission: false as const,
      translationUsedAsAuthority: false as const,
      secondarySourceUsedAsAuthority: false as const,
    }),
    locatorClosure: Object.freeze({
      exactDarumaEyeScanPage: 146 as const,
      exactDarumaEyeScanPageResolved: true as const,
      locatorGapResolved: true as const,
      immutablePageImagePinned: true as const,
      baseRegistryInsertionAuthorized: false as const,
      pageVerificationRecordAuthorized: false as const,
      scanCheckedDarumaEyePassagePromotionAuthorized: false as const,
      doubleCheckedSourceAuthorized: false as const,
      methodologyProductionPromotionAuthorized: false as const,
    }),
    resolvedBlockers: Object.freeze(['fr176_exact_daruma_eye_scan_page_not_pinned'] as const),
    remainingBlockers: FR182_REMAINING_BLOCKERS,
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
    provenanceBoundary: Object.freeze({
      c2paRequiredForSourceResearch: false as const,
      c2paHistoricalArtifactsModified: false as const,
      samePersonInferencePerformed: false as const,
    }),
    verdict: FR182_VERDICT,
    researchNoteRef: FR182_RESEARCH_NOTE_REF,
    nextFrontier: FR182_NEXT_FRONTIER,
  });
  ISSUED.add(result);
  return result;
}

export function assertIssuedEyePairFR176DarumaEyeExactScanPagePinningFR182(
  result: EyePairFR176DarumaEyeExactScanPagePinningFR182V1,
): void {
  if (!ISSUED.has(result)) fail('result was not issued by the active FR-182 boundary.');
  assertFR182FrozenEvidenceManifest(FR182_FROZEN_EVIDENCE_MANIFEST);
  assertFR182AuthorityBoundary(result.authorityBoundary);
  if (
    result.schemaVersion !== 'fr182-eye-pair-fr176-daruma-eye-exact-scan-page-pinning-v1'
    || result.artifactVersion !== '0.1.0'
    || result.recordId !== FR182_RECORD_ID
    || result.authorityState !== 'fr176_daruma_eye_exact_scan_page_visually_pinned_locator_only'
    || result.upstreamAuthority.fr176HistoricalExactDarumaEyeScanPage !== null
    || result.upstreamAuthority.fr176HistoricalExactDarumaEyeScanPageResolved !== false
    || result.sourceIdentity.sourcePdfSha256 !== FR103_NLC_INTAKE_SCAN_EVIDENCE.sourcePdfSha256
    || result.sourceIdentity.sourcePdfPageCount !== 576
    || result.visualReview.selectedExactScanPage !== 146
    || result.visualReview.selectedImmutablePageImageRef !== FR182_PAGE_146_REF
    || result.visualReview.selectedImmutablePageImageSha256 !== FR182_PAGE_146_IMAGE_SHA256
    || result.visualReview.visibleHeading !== '達摩相眼'
    || !sameClauses(result.visualReview.visuallyMatchedClauses)
    || result.visualReview.ocrUsedForEvidenceAdmission !== false
    || result.visualReview.searchIndexUsedForEvidenceAdmission !== false
    || result.locatorClosure.exactDarumaEyeScanPage !== 146
    || result.locatorClosure.exactDarumaEyeScanPageResolved !== true
    || result.locatorClosure.scanCheckedDarumaEyePassagePromotionAuthorized !== false
    || result.locatorClosure.doubleCheckedSourceAuthorized !== false
    || result.remainingBlockers !== FR182_REMAINING_BLOCKERS
    || result.verdict !== FR182_VERDICT
    || result.researchNoteRef !== FR182_RESEARCH_NOTE_REF
    || result.nextFrontier !== FR182_NEXT_FRONTIER
    || result.privacyBoundary.biometricIdentityMatchingPerformed !== false
    || result.provenanceBoundary.c2paHistoricalArtifactsModified !== false
  ) fail('issued authority drift.');
}
