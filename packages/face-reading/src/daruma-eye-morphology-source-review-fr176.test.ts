import { describe, expect, it } from 'vitest';
import {
  assertIssuedDarumaEyeMorphologySourceReviewFR176,
  FR176_CLAUSE_REVIEWS,
  FR176_DIRECT_SELECTED_WITNESS_CLAUSES,
  FR176_NEXT_FRONTIER,
  FR176_RESEARCH_NOTE_REF,
  FR176_VERDICT,
  issueDarumaEyeMorphologySourceReviewFR176,
  type DarumaEyeMorphologySourceReviewFR176V1,
} from './daruma-eye-morphology-source-review-fr176.js';

function forgedFR176(): DarumaEyeMorphologySourceReviewFR176V1 {
  return Object.freeze({}) as unknown as DarumaEyeMorphologySourceReviewFR176V1;
}

describe('FR176 Daruma Eye morphology source review', () => {
  it('pins the existing single NLC 1925 Shenxiang Quanbian lineage and only directly resolved witness clauses', () => {
    const review = issueDarumaEyeMorphologySourceReviewFR176();

    expect(review.source).toMatchObject({
      lineageCount: 1,
      workRef: 'work.shenxiang_quanbian',
      witnessId: 'witness.shenxiang_quanbian.nlc_1925',
      editionLabel: '文明書局 民國十四年本 — NLC scan',
      publicationYear: 1925,
      holdingInstitution: '國家圖書館',
      sourcePdfPageCount: 576,
      section: '卷三 / 達摩相眼',
      directSelectedWitnessClausesReviewed: true,
      directWitnessExtractionMode: 'selected_witness_pdf_indexed_text_with_ocr_uncertainty',
      fullNormalizedPassageClaimed: false,
      translationUsedAsAuthority: false,
      secondarySourceUsedAsAuthority: false,
    });
    expect(review.source.directSelectedWitnessClauses).toBe(FR176_DIRECT_SELECTED_WITNESS_CLAUSES);
    expect(FR176_DIRECT_SELECTED_WITNESS_CLAUSES).toEqual([
      '秀而正',
      '細而長',
      '目大而光',
      '目有三角',
      '目長一寸',
      '目尾相垂',
    ]);
    expect(() => assertIssuedDarumaEyeMorphologySourceReviewFR176(review)).not.toThrow();
  });

  it('does not fabricate an exact scan page or scan-checked promotion from OCR-indexed witness text', () => {
    const review = issueDarumaEyeMorphologySourceReviewFR176();

    expect(review.locator).toEqual({
      exactDarumaEyeScanPage: null,
      exactDarumaEyeScanPageResolved: false,
      repositoryImmutableDarumaEyeScanEvidenceAvailable: false,
      scanCheckedDarumaEyePassagePromotionAuthorized: false,
      fr103MouthScanEvidenceReusedAsDarumaEyeVisualEvidence: false,
    });
    expect(review.source.fullNormalizedPassageClaimed).toBe(false);
  });

  it('reviews every selected morphology-bearing clause and finds no direct current binding candidate', () => {
    const review = issueDarumaEyeMorphologySourceReviewFR176();

    expect(review.clauseReviews).toBe(FR176_CLAUSE_REVIEWS);
    expect(review.clauseReviews.map((item) => item.original)).toEqual(FR176_DIRECT_SELECTED_WITNESS_CLAUSES);
    expect(review.clauseReviews.every((item) => item.staticMorphologyCandidate)).toBe(true);
    expect(review.clauseReviews.every((item) => item.directlyRepresentableByCurrentNeutralMetrics === false)).toBe(true);
    expect(review.decisionBoundary.directBindingCandidateFound).toBe(false);
    expect(review.decisionBoundary.directBindingCandidateCount).toBe(0);
  });

  it('pins the current FR158 role-invariant metric surface and keeps missing observation dimensions explicit', () => {
    const review = issueDarumaEyeMorphologySourceReviewFR176();

    expect(review.observationAuthority.metricRefs).toEqual([
      'neutral.eye_pair.metric_3d.mean_cycle_x_span_to_full_mesh_x_span_ratio@0.1.0',
      'neutral.eye_pair.metric_3d.mean_cycle_perimeter_to_full_mesh_x_span_ratio@0.1.0',
      'neutral.eye_pair.metric_3d.centroid_separation_to_full_mesh_x_span_ratio@0.1.0',
      'neutral.eye_pair.metric_3d.mean_closed_cycle_absolute_turning_angle@0.1.0',
    ]);
    expect(review.observationAuthority).toMatchObject({
      coordinateFrame: 'canonical_aligned_right_handed_metric_3d',
      roleInvariantAggregationOverTwoEyeCycles: true,
      anatomicalLateralityResolved: false,
      individualEyeAsymmetryOutputAuthorized: false,
      eyeApertureMetricAuthorized: false,
      eyeAspectRatioMetricAuthorized: false,
      categoricalEyeShapeClassifierAuthorized: false,
      eyeTailOrientationMetricAuthorized: false,
      ocularRadianceMetricAuthorized: false,
      traditionalUnitMappingAuthorized: false,
      numericTraditionalThresholdAuthorized: false,
    });
  });

  it('forbids selective decomposition, triangle inference from mean turning angle, and cun conversion', () => {
    const review = issueDarumaEyeMorphologySourceReviewFR176();

    expect(review.clauseReviews.find((item) => item.original === '細而長')?.blocker).toMatch(/selective_long_only_decomposition_is_forbidden/u);
    expect(review.clauseReviews.find((item) => item.original === '目有三角')?.blocker).toMatch(/not_a_source_authorized_triangle_classifier/u);
    expect(review.clauseReviews.find((item) => item.original === '目長一寸')?.blocker).toMatch(/no_source_authorized_mapping_from_cun/u);
    expect(review.decisionBoundary.selectiveSemanticDecompositionAuthorized).toBe(false);
    expect(review.decisionBoundary.triangleFromMeanTurningAngleInferenceAuthorized).toBe(false);
    expect(review.decisionBoundary.cunToNormalizedRatioConversionAuthorized).toBe(false);
  });

  it('issues verdict C without producing a new observation primitive or production semantics', () => {
    const review = issueDarumaEyeMorphologySourceReviewFR176();

    expect(review.verdict).toBe(FR176_VERDICT);
    expect(review.verdict).toBe('SOURCE_SEMANTIC_NOT_COMPATIBLE_WITH_CURRENT_OBSERVATION');
    expect(review.decisionBoundary).toMatchObject({
      newObservationPrimitiveIssued: false,
      thresholdIssued: false,
      scoreIssued: false,
      rankIssued: false,
      calibrationIssued: false,
      productionRuleAuthorized: false,
      structuredSemanticClaimAuthorized: false,
      traditionalSemanticAuthorityPromoted: false,
    });
  });

  it('accepts no participant or biometric evidence and keeps C2PA outside the source blocker path', () => {
    const review = issueDarumaEyeMorphologySourceReviewFR176();

    expect(Object.values(review.privacyBoundary).every((value) => value === false)).toBe(true);
    expect(review.provenanceBoundary).toEqual({
      c2paRequiredForSourceResearch: false,
      c2paHistoricalArtifactsModified: false,
      samePersonInferencePerformed: false,
    });
    expect(Object.keys(review)).not.toContain('participantMetricValues');
    expect(Object.keys(review)).not.toContain('threshold');
  });

  it('rejects structural lookalikes and advances only to neutral aperture/aspect-ratio feasibility review', () => {
    expect(() => assertIssuedDarumaEyeMorphologySourceReviewFR176(forgedFR176())).toThrow(/not issued/u);
    expect(FR176_RESEARCH_NOTE_REF).toBe('repo:research/face-reading/fr176-daruma-eye-morphology-source-review.md');
    expect(FR176_NEXT_FRONTIER).toBe(
      'review_governed_role_invariant_eye_aperture_or_aspect_ratio_neutral_metric_feasibility_from_repeated_direct_source_need_without_semantic_thresholds',
    );
  });
});
