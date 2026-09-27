import { describe, expect, it } from 'vitest';
import { NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103 } from './neutral-ear-candidate-validation-fr103.js';

describe('FR103 neutral external-ear candidate validation authority', () => {
  it('uses generic external-ear localization as the primary prompt', () => {
    expect(NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.primaryPrompt).toBe(
      'external ear',
    );
    expect(
      NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.sideSpecificPromptPrimary,
    ).toBe(false);
    expect(
      NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.sideSpecificPromptAuthoritative,
    ).toBe(false);
    expect(
      NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.sideAssignmentDeferredToFaceGeometry,
    ).toBe(true);
  });

  it('admits only exact structural degeneracy rejection without inventing thresholds', () => {
    expect(
      NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.exactDegeneratePolygonReject.enabled,
    ).toBe(true);
    expect(
      NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.exactDegeneratePolygonReject.conditions,
    ).toEqual([
      'zero_bbox_width',
      'zero_bbox_height',
      'zero_polygon_area',
    ]);
    expect(
      NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.exactDegeneratePolygonReject.rejectedState,
    ).toBe('unavailable');
    expect(
      NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.plausibilityEvidence
        .numericAcceptanceThresholdAuthorized,
    ).toBe(false);
    expect(
      NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.plausibilityEvidence
        .automaticPlausibilityClassificationAuthorized,
    ).toBe(false);
  });

  it('records the bounded empirical failure modes without overclaiming', () => {
    expect(
      NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.empiricalFindings
        .clearVisibleEarLocalizationObserved,
    ).toBe(true);
    expect(
      NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.empiricalFindings
        .leftRightPromptSemanticSeparationObserved,
    ).toBe(false);
    expect(
      NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.empiricalFindings
        .partialOcclusionContourCompletionReliable,
    ).toBe(false);
    expect(
      NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.empiricalFindings
        .fullyOccludedRectangularMaskProducedDegeneratePolygon,
    ).toBe(true);
    expect(
      NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.empiricalFindings
        .frontalNoVisibleEarHallucinationObserved,
    ).toBe(true);
  });

  it('keeps privacy and semantic authority closed', () => {
    expect(
      NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.privacy
        .userImagesAllowedInRepositoryHistory,
    ).toBe(false);
    expect(
      NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.privacy
        .rawUserImagePolygonsAllowedInRepositoryHistory,
    ).toBe(false);
    expect(
      NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.authority
        .neutralRuntimeEarObservationAuthorized,
    ).toBe(false);
    expect(
      NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.authority
        .traditionalBindingAuthorized,
    ).toBe(false);
    expect(
      NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.authority.productionAuthorization,
    ).toBe(false);
  });
});
