import { describe, expect, it } from 'vitest';
import {
  assertIssuedEyePairTraditionalSourceLineageDirectPassageBindingFR175,
  FR175_CURRENT_NEUTRAL_METRIC_REFS,
  FR175_DIRECT_PASSAGE,
  FR175_NEXT_FRONTIER,
  FR175_PASSAGE_CLAUSE_REVIEWS,
  FR175_RESEARCH_NOTE_REF,
  FR175_VERDICT,
  issueEyePairTraditionalSourceLineageDirectPassageBindingFR175,
  type EyePairTraditionalSourceLineageDirectPassageBindingFR175V1,
} from './eye-pair-traditional-source-lineage-direct-passage-binding-fr175.js';

function forgedFR175(): EyePairTraditionalSourceLineageDirectPassageBindingFR175V1 {
  return Object.freeze({}) as unknown as EyePairTraditionalSourceLineageDirectPassageBindingFR175V1;
}

describe('FR175 eye-pair traditional source lineage direct passage binding', () => {
  it('pins exactly one existing NLC 1925 Shenxiang Quanbian lineage and direct eye passage', () => {
    const review = issueEyePairTraditionalSourceLineageDirectPassageBindingFR175();

    expect(review.source).toMatchObject({
      lineageCount: 1,
      workRef: 'work.shenxiang_quanbian',
      witnessId: 'witness.shenxiang_quanbian.nlc_1925',
      editionLabel: '文明書局 民國十四年本 — NLC scan',
      publicationYear: 1925,
      holdingInstitution: '國家圖書館',
      sourcePdfPageCount: 576,
      section: '卷二 / 五官說 / 監察官',
      directPassage: FR175_DIRECT_PASSAGE,
      directBodyReviewed: true,
      translationUsedAsAuthority: false,
      secondarySourceUsedAsAuthority: false,
    });
    expect(review.source.directPassage).toBe('眼須要含藏不露。黑白分明。瞳子端定。光彩射人。或細長極寸。乃為監察官成。');
    expect(review.context.fiveOfficerSequence).toEqual(['採聽官', '保壽官', '監察官', '審辨官', '出納官']);
    expect(review.context.eyeRoleInSection).toBe('三曰眼為監察官');
    expect(review.context.passageIsEyeSpecific).toBe(true);
    expect(() => assertIssuedEyePairTraditionalSourceLineageDirectPassageBindingFR175(review)).not.toThrow();
  });

  it('does not forge an exact scan-page or inherit the FR103 mouth visual match as eye evidence', () => {
    const review = issueEyePairTraditionalSourceLineageDirectPassageBindingFR175();

    expect(review.locator.scanPageWindow).toEqual([87, 88]);
    expect(review.locator.exactEyePassageScanPage).toBeNull();
    expect(review.locator.exactEyePassageScanPageResolved).toBe(false);
    expect(review.locator.existingImmutableScanWindowRefs).toHaveLength(2);
    expect(review.locator.fr103MouthPassageVisualMatchReusedAsEyePassageVisualMatch).toBe(false);
    expect(review.locator.scanCheckedEyePassagePromotionAuthorized).toBe(false);
  });

  it('classifies every source clause without inventing a compatible current observation', () => {
    const review = issueEyePairTraditionalSourceLineageDirectPassageBindingFR175();

    expect(review.clauseReviews).toBe(FR175_PASSAGE_CLAUSE_REVIEWS);
    expect(review.clauseReviews.map((item) => item.original)).toEqual([
      '含藏不露',
      '黑白分明',
      '瞳子端定',
      '光彩射人',
      '或細長極寸',
    ]);
    expect(review.clauseReviews.filter((item) => item.staticMorphologyCandidate).map((item) => item.original)).toEqual([
      '或細長極寸',
    ]);
    expect(review.clauseReviews.every((item) => item.directlyRepresentableByCurrentNeutralMetrics === false)).toBe(true);
  });

  it('pins the current neutral metric surface and keeps missing observation dimensions explicit', () => {
    const review = issueEyePairTraditionalSourceLineageDirectPassageBindingFR175();

    expect(review.observationAuthority.currentMetricRefs).toBe(FR175_CURRENT_NEUTRAL_METRIC_REFS);
    expect(FR175_CURRENT_NEUTRAL_METRIC_REFS).toEqual([
      'neutral.eye_pair.metric_3d.mean_cycle_x_span_to_full_mesh_x_span_ratio@0.1.0',
      'neutral.eye_pair.metric_3d.mean_cycle_perimeter_to_full_mesh_x_span_ratio@0.1.0',
      'neutral.eye_pair.metric_3d.centroid_separation_to_full_mesh_x_span_ratio@0.1.0',
      'neutral.eye_pair.metric_3d.mean_closed_cycle_absolute_turning_angle@0.1.0',
    ]);
    expect(review.observationAuthority).toMatchObject({
      providerPackage: '@mediapipe/tasks-vision',
      providerVersion: '0.10.35',
      providerLandmarkCount: 478,
      governedMetricGeometryLandmarkCount: 468,
      coordinateFrame: 'canonical_aligned_right_handed_metric_3d',
      irisLandmarksExcluded: true,
      eyeApertureMetricAuthorized: false,
      eyeAspectRatioMetricAuthorized: false,
      pupilOrGazeMetricAuthorized: false,
      ocularContrastMetricAuthorized: false,
      dynamicRadianceMetricAuthorized: false,
      traditionalUnitMappingAuthorized: false,
    });
  });

  it('issues the fail-closed C verdict and authorizes no threshold, score, rule, or semantic claim', () => {
    const review = issueEyePairTraditionalSourceLineageDirectPassageBindingFR175();

    expect(review.verdict).toBe(FR175_VERDICT);
    expect(review.verdict).toBe('SOURCE_SEMANTIC_NOT_COMPATIBLE_WITH_CURRENT_OBSERVATION');
    expect(review.decisionBoundary).toEqual({
      sourceIdentityResolved: true,
      directPassageBodyReviewed: true,
      currentObservationDirectlyCompatible: false,
      selectiveLongOnlyDecompositionAuthorized: false,
      thresholdIssued: false,
      scoreIssued: false,
      rankIssued: false,
      calibrationIssued: false,
      productionRuleAuthorized: false,
      structuredSemanticClaimAuthorized: false,
      traditionalSemanticAuthorityPromoted: false,
    });
  });

  it('accepts no participant or biometric evidence and does not reopen C2PA as a blocker', () => {
    const review = issueEyePairTraditionalSourceLineageDirectPassageBindingFR175();

    expect(Object.values(review.privacyBoundary).every((value) => value === false)).toBe(true);
    expect(review.provenanceBoundary).toEqual({
      c2paRequiredForSourceResearch: false,
      c2paHistoricalArtifactsModified: false,
      samePersonInferencePerformed: false,
    });
    expect(Object.keys(review)).not.toContain('participantMetricValues');
    expect(Object.keys(review)).not.toContain('threshold');
  });

  it('rejects structural lookalikes and pins exactly one next source frontier', () => {
    expect(() => assertIssuedEyePairTraditionalSourceLineageDirectPassageBindingFR175(forgedFR175())).toThrow(/not issued/u);
    expect(FR175_RESEARCH_NOTE_REF).toBe('repo:research/face-reading/fr175-eye-pair-traditional-source-lineage-direct-passage-binding.md');
    expect(FR175_NEXT_FRONTIER).toBe(
      'directly_review_the_same_nlc_1925_witness_eye_chapters_for_a_static_morphology_passage_expressible_by_current_neutral_eye_pair_observations_without_new_thresholds',
    );
  });
});
