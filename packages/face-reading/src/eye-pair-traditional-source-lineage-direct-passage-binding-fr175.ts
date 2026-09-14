import { FR72_NLC_1925_INTAKE_CANDIDATE } from './five-officers-mouth-direct-source-candidate-extension-fr72.js';
import { FR103_NLC_INTAKE_SCAN_EVIDENCE } from './five-officers-mouth-scan-evidence-acquisition-fr103.js';

export const FR175_EYE_PAIR_TRADITIONAL_SOURCE_BINDING_RECORD_ID =
  'research.face_reading.eye_pair.traditional_source_lineage.direct_passage_binding.fr175' as const;
export const FR175_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr175-eye-pair-traditional-source-lineage-direct-passage-binding.md' as const;
export const FR175_DIRECT_PASSAGE =
  '眼須要含藏不露。黑白分明。瞳子端定。光彩射人。或細長極寸。乃為監察官成。' as const;
export const FR175_VERDICT = 'SOURCE_SEMANTIC_NOT_COMPATIBLE_WITH_CURRENT_OBSERVATION' as const;
export const FR175_NEXT_FRONTIER =
  'directly_review_the_same_nlc_1925_witness_eye_chapters_for_a_static_morphology_passage_expressible_by_current_neutral_eye_pair_observations_without_new_thresholds' as const;

export const FR175_CURRENT_NEUTRAL_METRIC_REFS = Object.freeze([
  'neutral.eye_pair.metric_3d.mean_cycle_x_span_to_full_mesh_x_span_ratio@0.1.0',
  'neutral.eye_pair.metric_3d.mean_cycle_perimeter_to_full_mesh_x_span_ratio@0.1.0',
  'neutral.eye_pair.metric_3d.centroid_separation_to_full_mesh_x_span_ratio@0.1.0',
  'neutral.eye_pair.metric_3d.mean_closed_cycle_absolute_turning_angle@0.1.0',
] as const);

export const FR175_PASSAGE_CLAUSE_REVIEWS = Object.freeze([
  Object.freeze({
    original: '含藏不露',
    semanticClass: 'appearance_or_openness_not_yet_operationalized',
    staticMorphologyCandidate: false,
    directlyRepresentableByCurrentNeutralMetrics: false,
    blocker: 'no_reviewed_static_operationalization_for_contained_not_exposed',
  }),
  Object.freeze({
    original: '黑白分明',
    semanticClass: 'ocular_contrast_appearance',
    staticMorphologyCandidate: false,
    directlyRepresentableByCurrentNeutralMetrics: false,
    blocker: 'current_static_shape_runtime_does_not_authorize_ocular_color_or_contrast',
  }),
  Object.freeze({
    original: '瞳子端定',
    semanticClass: 'pupil_or_gaze_state',
    staticMorphologyCandidate: false,
    directlyRepresentableByCurrentNeutralMetrics: false,
    blocker: 'iris_landmarks_are_excluded_and_gaze_state_is_not_an_authorized_static_observation',
  }),
  Object.freeze({
    original: '光彩射人',
    semanticClass: 'dynamic_radiance_or_shen',
    staticMorphologyCandidate: false,
    directlyRepresentableByCurrentNeutralMetrics: false,
    blocker: 'dynamic_appearance_is_outside_the_static_eye_pair_shape_authority',
  }),
  Object.freeze({
    original: '或細長極寸',
    semanticClass: 'compound_static_morphology_with_traditional_extent_expression',
    staticMorphologyCandidate: true,
    directlyRepresentableByCurrentNeutralMetrics: false,
    blocker: 'no_governed_eye_aperture_or_aspect_ratio_and_no_source_authorized_cun_mapping',
  }),
] as const);

export interface EyePairTraditionalSourceLineageDirectPassageBindingFR175V1 {
  readonly schemaVersion: 'fr175-eye-pair-traditional-source-lineage-direct-passage-binding-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR175_EYE_PAIR_TRADITIONAL_SOURCE_BINDING_RECORD_ID;
  readonly authorityState: 'direct_source_reviewed_semantic_binding_fail_closed';
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
    readonly section: '卷二 / 五官說 / 監察官';
    readonly directPassage: typeof FR175_DIRECT_PASSAGE;
    readonly directBodyReviewed: true;
    readonly translationUsedAsAuthority: false;
    readonly secondarySourceUsedAsAuthority: false;
  };
  readonly locator: {
    readonly existingImmutableScanWindowRefs: typeof FR103_NLC_INTAKE_SCAN_EVIDENCE.visualEvidenceRefs;
    readonly scanPageWindow: readonly [87, 88];
    readonly exactEyePassageScanPage: null;
    readonly exactEyePassageScanPageResolved: false;
    readonly fr103MouthPassageVisualMatchReusedAsEyePassageVisualMatch: false;
    readonly scanCheckedEyePassagePromotionAuthorized: false;
  };
  readonly context: {
    readonly fiveOfficerSequence: readonly ['採聽官', '保壽官', '監察官', '審辨官', '出納官'];
    readonly eyeRoleInSection: '三曰眼為監察官';
    readonly previousOfficer: '保壽官';
    readonly nextOfficer: '審辨官';
    readonly passageIsEyeSpecific: true;
  };
  readonly observationAuthority: {
    readonly providerPackage: '@mediapipe/tasks-vision';
    readonly providerVersion: '0.10.35';
    readonly providerLandmarkCount: 478;
    readonly governedMetricGeometryLandmarkCount: 468;
    readonly coordinateFrame: 'canonical_aligned_right_handed_metric_3d';
    readonly irisLandmarksExcluded: true;
    readonly currentMetricRefs: typeof FR175_CURRENT_NEUTRAL_METRIC_REFS;
    readonly eyeApertureMetricAuthorized: false;
    readonly eyeAspectRatioMetricAuthorized: false;
    readonly pupilOrGazeMetricAuthorized: false;
    readonly ocularContrastMetricAuthorized: false;
    readonly dynamicRadianceMetricAuthorized: false;
    readonly traditionalUnitMappingAuthorized: false;
  };
  readonly clauseReviews: typeof FR175_PASSAGE_CLAUSE_REVIEWS;
  readonly verdict: typeof FR175_VERDICT;
  readonly decisionBoundary: {
    readonly sourceIdentityResolved: true;
    readonly directPassageBodyReviewed: true;
    readonly currentObservationDirectlyCompatible: false;
    readonly selectiveLongOnlyDecompositionAuthorized: false;
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
    readonly faceEmbeddingAccepted: false;
    readonly identityTemplateAccepted: false;
    readonly biometricIdentityMatchingPerformed: false;
  };
  readonly provenanceBoundary: {
    readonly c2paRequiredForSourceResearch: false;
    readonly c2paHistoricalArtifactsModified: false;
    readonly samePersonInferencePerformed: false;
  };
  readonly researchNoteRef: typeof FR175_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR175_NEXT_FRONTIER;
}

const ISSUED = new WeakSet<object>();

export function issueEyePairTraditionalSourceLineageDirectPassageBindingFR175(): EyePairTraditionalSourceLineageDirectPassageBindingFR175V1 {
  if (
    FR72_NLC_1925_INTAKE_CANDIDATE.workRef !== 'work.shenxiang_quanbian'
    || FR72_NLC_1925_INTAKE_CANDIDATE.witnessId !== 'witness.shenxiang_quanbian.nlc_1925'
    || FR72_NLC_1925_INTAKE_CANDIDATE.editionLabel !== '文明書局 民國十四年本 — NLC scan'
    || FR72_NLC_1925_INTAKE_CANDIDATE.publicationYear !== 1925
    || FR72_NLC_1925_INTAKE_CANDIDATE.digitalSourceUrl !== 'https://commons.wikimedia.org/wiki/File:NLC416-13jh001662-59167_神相全編.pdf'
    || FR103_NLC_INTAKE_SCAN_EVIDENCE.witnessId !== FR72_NLC_1925_INTAKE_CANDIDATE.witnessId
    || FR103_NLC_INTAKE_SCAN_EVIDENCE.sourcePdfPageCount !== 576
  ) {
    throw new Error('FR-175 selected NLC 1925 source lineage drifted.');
  }

  const result: EyePairTraditionalSourceLineageDirectPassageBindingFR175V1 = Object.freeze({
    schemaVersion: 'fr175-eye-pair-traditional-source-lineage-direct-passage-binding-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR175_EYE_PAIR_TRADITIONAL_SOURCE_BINDING_RECORD_ID,
    authorityState: 'direct_source_reviewed_semantic_binding_fail_closed' as const,
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
      section: '卷二 / 五官說 / 監察官' as const,
      directPassage: FR175_DIRECT_PASSAGE,
      directBodyReviewed: true as const,
      translationUsedAsAuthority: false as const,
      secondarySourceUsedAsAuthority: false as const,
    }),
    locator: Object.freeze({
      existingImmutableScanWindowRefs: FR103_NLC_INTAKE_SCAN_EVIDENCE.visualEvidenceRefs,
      scanPageWindow: Object.freeze([87, 88] as const),
      exactEyePassageScanPage: null,
      exactEyePassageScanPageResolved: false as const,
      fr103MouthPassageVisualMatchReusedAsEyePassageVisualMatch: false as const,
      scanCheckedEyePassagePromotionAuthorized: false as const,
    }),
    context: Object.freeze({
      fiveOfficerSequence: Object.freeze(['採聽官', '保壽官', '監察官', '審辨官', '出納官'] as const),
      eyeRoleInSection: '三曰眼為監察官' as const,
      previousOfficer: '保壽官' as const,
      nextOfficer: '審辨官' as const,
      passageIsEyeSpecific: true as const,
    }),
    observationAuthority: Object.freeze({
      providerPackage: '@mediapipe/tasks-vision' as const,
      providerVersion: '0.10.35' as const,
      providerLandmarkCount: 478 as const,
      governedMetricGeometryLandmarkCount: 468 as const,
      coordinateFrame: 'canonical_aligned_right_handed_metric_3d' as const,
      irisLandmarksExcluded: true as const,
      currentMetricRefs: FR175_CURRENT_NEUTRAL_METRIC_REFS,
      eyeApertureMetricAuthorized: false as const,
      eyeAspectRatioMetricAuthorized: false as const,
      pupilOrGazeMetricAuthorized: false as const,
      ocularContrastMetricAuthorized: false as const,
      dynamicRadianceMetricAuthorized: false as const,
      traditionalUnitMappingAuthorized: false as const,
    }),
    clauseReviews: FR175_PASSAGE_CLAUSE_REVIEWS,
    verdict: FR175_VERDICT,
    decisionBoundary: Object.freeze({
      sourceIdentityResolved: true as const,
      directPassageBodyReviewed: true as const,
      currentObservationDirectlyCompatible: false as const,
      selectiveLongOnlyDecompositionAuthorized: false as const,
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
      faceEmbeddingAccepted: false as const,
      identityTemplateAccepted: false as const,
      biometricIdentityMatchingPerformed: false as const,
    }),
    provenanceBoundary: Object.freeze({
      c2paRequiredForSourceResearch: false as const,
      c2paHistoricalArtifactsModified: false as const,
      samePersonInferencePerformed: false as const,
    }),
    researchNoteRef: FR175_RESEARCH_NOTE_REF,
    nextFrontier: FR175_NEXT_FRONTIER,
  });
  ISSUED.add(result);
  return result;
}

export function assertIssuedEyePairTraditionalSourceLineageDirectPassageBindingFR175(
  result: EyePairTraditionalSourceLineageDirectPassageBindingFR175V1,
): void {
  if (!ISSUED.has(result)) throw new Error('FR-175 source binding was not issued by the active FR-175 boundary.');
  if (
    result.schemaVersion !== 'fr175-eye-pair-traditional-source-lineage-direct-passage-binding-v1'
    || result.artifactVersion !== '0.1.0'
    || result.recordId !== FR175_EYE_PAIR_TRADITIONAL_SOURCE_BINDING_RECORD_ID
    || result.authorityState !== 'direct_source_reviewed_semantic_binding_fail_closed'
    || result.source.lineageCount !== 1
    || result.source.workRef !== 'work.shenxiang_quanbian'
    || result.source.witnessId !== 'witness.shenxiang_quanbian.nlc_1925'
    || result.source.directPassage !== FR175_DIRECT_PASSAGE
    || result.locator.exactEyePassageScanPage !== null
    || result.locator.exactEyePassageScanPageResolved !== false
    || result.locator.scanCheckedEyePassagePromotionAuthorized !== false
    || result.observationAuthority.currentMetricRefs !== FR175_CURRENT_NEUTRAL_METRIC_REFS
    || result.clauseReviews !== FR175_PASSAGE_CLAUSE_REVIEWS
    || result.verdict !== FR175_VERDICT
    || result.decisionBoundary.currentObservationDirectlyCompatible !== false
    || result.decisionBoundary.selectiveLongOnlyDecompositionAuthorized !== false
    || result.decisionBoundary.thresholdIssued !== false
    || result.decisionBoundary.scoreIssued !== false
    || result.decisionBoundary.rankIssued !== false
    || result.decisionBoundary.productionRuleAuthorized !== false
    || result.decisionBoundary.structuredSemanticClaimAuthorized !== false
    || result.decisionBoundary.traditionalSemanticAuthorityPromoted !== false
    || result.privacyBoundary.participantDerivedMaterialAccepted !== false
    || result.privacyBoundary.biometricIdentityMatchingPerformed !== false
    || result.provenanceBoundary.c2paHistoricalArtifactsModified !== false
    || result.researchNoteRef !== FR175_RESEARCH_NOTE_REF
    || result.nextFrontier !== FR175_NEXT_FRONTIER
  ) {
    throw new Error('FR-175 source binding authority drift.');
  }
}
