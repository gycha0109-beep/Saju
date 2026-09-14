import { FR72_NLC_1925_INTAKE_CANDIDATE } from './five-officers-mouth-direct-source-candidate-extension-fr72.js';
import { FR103_NLC_INTAKE_SCAN_EVIDENCE } from './five-officers-mouth-scan-evidence-acquisition-fr103.js';
import { FR175_CURRENT_NEUTRAL_METRIC_REFS } from './eye-pair-traditional-source-lineage-direct-passage-binding-fr175.js';

export const FR176_DARUMA_EYE_SOURCE_REVIEW_RECORD_ID =
  'research.face_reading.eye_pair.daruma_eye_morphology_source_review.fr176' as const;
export const FR176_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr176-daruma-eye-morphology-source-review.md' as const;
export const FR176_VERDICT = 'SOURCE_SEMANTIC_NOT_COMPATIBLE_WITH_CURRENT_OBSERVATION' as const;
export const FR176_NEXT_FRONTIER =
  'review_governed_role_invariant_eye_aperture_or_aspect_ratio_neutral_metric_feasibility_from_repeated_direct_source_need_without_semantic_thresholds' as const;

export const FR176_DIRECT_SELECTED_WITNESS_CLAUSES = Object.freeze([
  '秀而正',
  '細而長',
  '目大而光',
  '目有三角',
  '目長一寸',
  '目尾相垂',
] as const);

export const FR176_CLAUSE_REVIEWS = Object.freeze([
  Object.freeze({
    original: '秀而正',
    semanticClass: 'compound_appearance_quality_plus_form',
    staticMorphologyCandidate: true,
    directlyRepresentableByCurrentNeutralMetrics: false,
    blocker: 'compound_clause_cannot_drop_xiu_and_current_metrics_do_not_define_zheng_as_a_source_authorized_form_criterion',
  }),
  Object.freeze({
    original: '細而長',
    semanticClass: 'compound_thin_plus_long_static_morphology',
    staticMorphologyCandidate: true,
    directlyRepresentableByCurrentNeutralMetrics: false,
    blocker: 'mean_x_span_does_not_supply_thinness_or_aspect_ratio_and_selective_long_only_decomposition_is_forbidden',
  }),
  Object.freeze({
    original: '目大而光',
    semanticClass: 'compound_size_plus_radiance',
    staticMorphologyCandidate: true,
    directlyRepresentableByCurrentNeutralMetrics: false,
    blocker: 'radiance_is_outside_static_geometry_and_size_only_binding_would_selectively_decompose_the_clause',
  }),
  Object.freeze({
    original: '目有三角',
    semanticClass: 'categorical_eye_shape_triangle',
    staticMorphologyCandidate: true,
    directlyRepresentableByCurrentNeutralMetrics: false,
    blocker: 'mean_absolute_turning_angle_is_not_a_source_authorized_triangle_classifier_and_no_shape_threshold_exists',
  }),
  Object.freeze({
    original: '目長一寸',
    semanticClass: 'static_longitudinal_extent_with_traditional_unit',
    staticMorphologyCandidate: true,
    directlyRepresentableByCurrentNeutralMetrics: false,
    blocker: 'no_source_authorized_mapping_from_cun_to_full_mesh_normalized_x_span_ratio',
  }),
  Object.freeze({
    original: '目尾相垂',
    semanticClass: 'eye_tail_orientation_or_droop',
    staticMorphologyCandidate: true,
    directlyRepresentableByCurrentNeutralMetrics: false,
    blocker: 'current_role_invariant_metric_surface_exposes_no_reviewed_eye_tail_endpoint_orientation_or_angle_primitive',
  }),
] as const);

export interface DarumaEyeMorphologySourceReviewFR176V1 {
  readonly schemaVersion: 'fr176-daruma-eye-morphology-source-review-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR176_DARUMA_EYE_SOURCE_REVIEW_RECORD_ID;
  readonly authorityState: 'direct_selected_witness_clause_review_fail_closed';
  readonly source: {
    readonly lineageCount: 1;
    readonly workRef: 'work.shenxiang_quanbian';
    readonly witnessId: 'witness.shenxiang_quanbian.nlc_1925';
    readonly editionLabel: '文明書局 民國十四年本 — NLC scan';
    readonly publicationYear: 1925;
    readonly holdingInstitution: '國家圖書館';
    readonly sourceFilePageRef: 'https://commons.wikimedia.org/wiki/File:NLC416-13jh001662-59167_神相全編.pdf';
    readonly sourcePdfSha256: typeof FR103_NLC_INTAKE_SCAN_EVIDENCE.sourcePdfSha256;
    readonly sourcePdfPageCount: 576;
    readonly section: '卷三 / 達摩相眼';
    readonly directSelectedWitnessClauses: typeof FR176_DIRECT_SELECTED_WITNESS_CLAUSES;
    readonly directSelectedWitnessClausesReviewed: true;
    readonly directWitnessExtractionMode: 'selected_witness_pdf_indexed_text_with_ocr_uncertainty';
    readonly fullNormalizedPassageClaimed: false;
    readonly translationUsedAsAuthority: false;
    readonly secondarySourceUsedAsAuthority: false;
  };
  readonly locator: {
    readonly exactDarumaEyeScanPage: null;
    readonly exactDarumaEyeScanPageResolved: false;
    readonly repositoryImmutableDarumaEyeScanEvidenceAvailable: false;
    readonly scanCheckedDarumaEyePassagePromotionAuthorized: false;
    readonly fr103MouthScanEvidenceReusedAsDarumaEyeVisualEvidence: false;
  };
  readonly observationAuthority: {
    readonly metricRefs: typeof FR175_CURRENT_NEUTRAL_METRIC_REFS;
    readonly coordinateFrame: 'canonical_aligned_right_handed_metric_3d';
    readonly roleInvariantAggregationOverTwoEyeCycles: true;
    readonly anatomicalLateralityResolved: false;
    readonly individualEyeAsymmetryOutputAuthorized: false;
    readonly eyeApertureMetricAuthorized: false;
    readonly eyeAspectRatioMetricAuthorized: false;
    readonly categoricalEyeShapeClassifierAuthorized: false;
    readonly eyeTailOrientationMetricAuthorized: false;
    readonly ocularRadianceMetricAuthorized: false;
    readonly traditionalUnitMappingAuthorized: false;
    readonly numericTraditionalThresholdAuthorized: false;
  };
  readonly clauseReviews: typeof FR176_CLAUSE_REVIEWS;
  readonly verdict: typeof FR176_VERDICT;
  readonly decisionBoundary: {
    readonly sourceIdentityResolved: true;
    readonly directSelectedWitnessClausesResolved: true;
    readonly fullNormalizedPassageResolved: false;
    readonly exactScanPageVisuallyPinned: false;
    readonly directBindingCandidateFound: false;
    readonly directBindingCandidateCount: 0;
    readonly selectiveSemanticDecompositionAuthorized: false;
    readonly triangleFromMeanTurningAngleInferenceAuthorized: false;
    readonly cunToNormalizedRatioConversionAuthorized: false;
    readonly newObservationPrimitiveIssued: false;
    readonly thresholdIssued: false;
    readonly scoreIssued: false;
    readonly rankIssued: false;
    readonly calibrationIssued: false;
    readonly productionRuleAuthorized: false;
    readonly structuredSemanticClaimAuthorized: false;
    readonly traditionalSemanticAuthorityPromoted: false;
  };
  readonly privacyBoundary: {
    readonly participantDerivedMaterialAccepted: false;
    readonly participantExactMeasurementAccepted: false;
    readonly rawParticipantImageAccepted: false;
    readonly rawProviderResponseAccepted: false;
    readonly rawLandmarkSetAccepted: false;
    readonly faceEmbeddingAccepted: false;
    readonly identityTemplateAccepted: false;
    readonly biometricIdentityMatchingPerformed: false;
  };
  readonly provenanceBoundary: {
    readonly c2paRequiredForSourceResearch: false;
    readonly c2paHistoricalArtifactsModified: false;
    readonly samePersonInferencePerformed: false;
  };
  readonly researchNoteRef: typeof FR176_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR176_NEXT_FRONTIER;
}

const ISSUED = new WeakSet<object>();

export function issueDarumaEyeMorphologySourceReviewFR176(): DarumaEyeMorphologySourceReviewFR176V1 {
  if (
    FR72_NLC_1925_INTAKE_CANDIDATE.workRef !== 'work.shenxiang_quanbian'
    || FR72_NLC_1925_INTAKE_CANDIDATE.witnessId !== 'witness.shenxiang_quanbian.nlc_1925'
    || FR72_NLC_1925_INTAKE_CANDIDATE.editionLabel !== '文明書局 民國十四年本 — NLC scan'
    || FR72_NLC_1925_INTAKE_CANDIDATE.publicationYear !== 1925
    || FR72_NLC_1925_INTAKE_CANDIDATE.digitalSourceUrl !== 'https://commons.wikimedia.org/wiki/File:NLC416-13jh001662-59167_神相全編.pdf'
    || FR103_NLC_INTAKE_SCAN_EVIDENCE.witnessId !== FR72_NLC_1925_INTAKE_CANDIDATE.witnessId
    || FR103_NLC_INTAKE_SCAN_EVIDENCE.sourcePdfPageCount !== 576
  ) {
    throw new Error('FR-176 selected NLC 1925 source lineage drifted.');
  }

  const result: DarumaEyeMorphologySourceReviewFR176V1 = Object.freeze({
    schemaVersion: 'fr176-daruma-eye-morphology-source-review-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR176_DARUMA_EYE_SOURCE_REVIEW_RECORD_ID,
    authorityState: 'direct_selected_witness_clause_review_fail_closed' as const,
    source: Object.freeze({
      lineageCount: 1 as const,
      workRef: 'work.shenxiang_quanbian' as const,
      witnessId: 'witness.shenxiang_quanbian.nlc_1925' as const,
      editionLabel: '文明書局 民國十四年本 — NLC scan' as const,
      publicationYear: 1925 as const,
      holdingInstitution: '國家圖書館' as const,
      sourceFilePageRef: 'https://commons.wikimedia.org/wiki/File:NLC416-13jh001662-59167_神相全編.pdf' as const,
      sourcePdfSha256: FR103_NLC_INTAKE_SCAN_EVIDENCE.sourcePdfSha256,
      sourcePdfPageCount: 576 as const,
      section: '卷三 / 達摩相眼' as const,
      directSelectedWitnessClauses: FR176_DIRECT_SELECTED_WITNESS_CLAUSES,
      directSelectedWitnessClausesReviewed: true as const,
      directWitnessExtractionMode: 'selected_witness_pdf_indexed_text_with_ocr_uncertainty' as const,
      fullNormalizedPassageClaimed: false as const,
      translationUsedAsAuthority: false as const,
      secondarySourceUsedAsAuthority: false as const,
    }),
    locator: Object.freeze({
      exactDarumaEyeScanPage: null,
      exactDarumaEyeScanPageResolved: false as const,
      repositoryImmutableDarumaEyeScanEvidenceAvailable: false as const,
      scanCheckedDarumaEyePassagePromotionAuthorized: false as const,
      fr103MouthScanEvidenceReusedAsDarumaEyeVisualEvidence: false as const,
    }),
    observationAuthority: Object.freeze({
      metricRefs: FR175_CURRENT_NEUTRAL_METRIC_REFS,
      coordinateFrame: 'canonical_aligned_right_handed_metric_3d' as const,
      roleInvariantAggregationOverTwoEyeCycles: true as const,
      anatomicalLateralityResolved: false as const,
      individualEyeAsymmetryOutputAuthorized: false as const,
      eyeApertureMetricAuthorized: false as const,
      eyeAspectRatioMetricAuthorized: false as const,
      categoricalEyeShapeClassifierAuthorized: false as const,
      eyeTailOrientationMetricAuthorized: false as const,
      ocularRadianceMetricAuthorized: false as const,
      traditionalUnitMappingAuthorized: false as const,
      numericTraditionalThresholdAuthorized: false as const,
    }),
    clauseReviews: FR176_CLAUSE_REVIEWS,
    verdict: FR176_VERDICT,
    decisionBoundary: Object.freeze({
      sourceIdentityResolved: true as const,
      directSelectedWitnessClausesResolved: true as const,
      fullNormalizedPassageResolved: false as const,
      exactScanPageVisuallyPinned: false as const,
      directBindingCandidateFound: false as const,
      directBindingCandidateCount: 0 as const,
      selectiveSemanticDecompositionAuthorized: false as const,
      triangleFromMeanTurningAngleInferenceAuthorized: false as const,
      cunToNormalizedRatioConversionAuthorized: false as const,
      newObservationPrimitiveIssued: false as const,
      thresholdIssued: false as const,
      scoreIssued: false as const,
      rankIssued: false as const,
      calibrationIssued: false as const,
      productionRuleAuthorized: false as const,
      structuredSemanticClaimAuthorized: false as const,
      traditionalSemanticAuthorityPromoted: false as const,
    }),
    privacyBoundary: Object.freeze({
      participantDerivedMaterialAccepted: false as const,
      participantExactMeasurementAccepted: false as const,
      rawParticipantImageAccepted: false as const,
      rawProviderResponseAccepted: false as const,
      rawLandmarkSetAccepted: false as const,
      faceEmbeddingAccepted: false as const,
      identityTemplateAccepted: false as const,
      biometricIdentityMatchingPerformed: false as const,
    }),
    provenanceBoundary: Object.freeze({
      c2paRequiredForSourceResearch: false as const,
      c2paHistoricalArtifactsModified: false as const,
      samePersonInferencePerformed: false as const,
    }),
    researchNoteRef: FR176_RESEARCH_NOTE_REF,
    nextFrontier: FR176_NEXT_FRONTIER,
  });
  ISSUED.add(result);
  return result;
}

export function assertIssuedDarumaEyeMorphologySourceReviewFR176(
  result: DarumaEyeMorphologySourceReviewFR176V1,
): void {
  if (!ISSUED.has(result)) throw new Error('FR-176 Daruma Eye source review was not issued by the active FR-176 boundary.');
  if (
    result.schemaVersion !== 'fr176-daruma-eye-morphology-source-review-v1'
    || result.artifactVersion !== '0.1.0'
    || result.recordId !== FR176_DARUMA_EYE_SOURCE_REVIEW_RECORD_ID
    || result.authorityState !== 'direct_selected_witness_clause_review_fail_closed'
    || result.source.lineageCount !== 1
    || result.source.workRef !== 'work.shenxiang_quanbian'
    || result.source.witnessId !== 'witness.shenxiang_quanbian.nlc_1925'
    || result.source.directSelectedWitnessClauses !== FR176_DIRECT_SELECTED_WITNESS_CLAUSES
    || result.source.fullNormalizedPassageClaimed !== false
    || result.locator.exactDarumaEyeScanPage !== null
    || result.locator.exactDarumaEyeScanPageResolved !== false
    || result.locator.scanCheckedDarumaEyePassagePromotionAuthorized !== false
    || result.observationAuthority.metricRefs !== FR175_CURRENT_NEUTRAL_METRIC_REFS
    || result.observationAuthority.individualEyeAsymmetryOutputAuthorized !== false
    || result.observationAuthority.eyeApertureMetricAuthorized !== false
    || result.observationAuthority.eyeAspectRatioMetricAuthorized !== false
    || result.observationAuthority.categoricalEyeShapeClassifierAuthorized !== false
    || result.observationAuthority.eyeTailOrientationMetricAuthorized !== false
    || result.observationAuthority.traditionalUnitMappingAuthorized !== false
    || result.clauseReviews !== FR176_CLAUSE_REVIEWS
    || result.verdict !== FR176_VERDICT
    || result.decisionBoundary.directBindingCandidateFound !== false
    || result.decisionBoundary.directBindingCandidateCount !== 0
    || result.decisionBoundary.selectiveSemanticDecompositionAuthorized !== false
    || result.decisionBoundary.triangleFromMeanTurningAngleInferenceAuthorized !== false
    || result.decisionBoundary.cunToNormalizedRatioConversionAuthorized !== false
    || result.decisionBoundary.newObservationPrimitiveIssued !== false
    || result.decisionBoundary.thresholdIssued !== false
    || result.decisionBoundary.productionRuleAuthorized !== false
    || result.decisionBoundary.structuredSemanticClaimAuthorized !== false
    || result.decisionBoundary.traditionalSemanticAuthorityPromoted !== false
    || result.privacyBoundary.participantDerivedMaterialAccepted !== false
    || result.privacyBoundary.biometricIdentityMatchingPerformed !== false
    || result.provenanceBoundary.c2paHistoricalArtifactsModified !== false
    || result.researchNoteRef !== FR176_RESEARCH_NOTE_REF
    || result.nextFrontier !== FR176_NEXT_FRONTIER
  ) {
    throw new Error('FR-176 Daruma Eye source review authority drift.');
  }
}
