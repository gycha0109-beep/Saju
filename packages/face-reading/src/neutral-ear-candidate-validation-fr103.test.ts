import { describe, expect, it } from 'vitest';
import { NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103 } from './neutral-ear-candidate-validation-fr103.js';

describe('FR103 neutral external-ear candidate validation authority', () => {
  it('uses dual side prompts as non-authoritative localization probes', () => {
    expect(
      NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.primaryPromptStrategy,
    ).toBe('dual_side_prompt_pair_non_authoritative_laterality');
    expect(
      NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.primaryPromptPair,
    ).toEqual(['left external ear', 'right external ear']);
    expect(
      NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.genericPromptPrimary,
    ).toBe(false);
    expect(
      NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.genericPromptDiagnosticOnly,
    ).toBe(true);
    expect(
      NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.promptSideLabelsAuthoritative,
    ).toBe(false);
    expect(
      NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.sideAssignmentDeferredToFaceGeometry,
    ).toBe(true);
  });

  it('keeps exact structural degeneracy rejection without inventing thresholds', () => {
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
      NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.pairwiseEvidence
        .automaticConsensusAcceptanceAuthorized,
    ).toBe(false);
    expect(
      NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.pairwiseEvidence
        .numericAcceptanceThresholdAuthorized,
    ).toBe(false);
  });

  it('records pairwise evidence without promoting it to validated consensus', () => {
    expect(
      NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.pairwiseEvidence
        .recordBoundingBoxIoU,
    ).toBe(true);
    expect(
      NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.pairwiseEvidence
        .recordCentroidDistance,
    ).toBe(true);
    expect(
      NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.authority
        .pairMetricsMayBeCalledValidatedEarConsensus,
    ).toBe(false);
    expect(
      NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.plausibilityEvidence
        .faceGeometryPlausibilityGateImplemented,
    ).toBe(false);
  });

  it('records the corrected empirical failure modes', () => {
    expect(
      NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.empiricalFindings
        .clearVisibleEarSidePromptLocalizationObserved,
    ).toBe(true);
    expect(
      NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.empiricalFindings
        .leftRightPromptSemanticSeparationObserved,
    ).toBe(false);
    expect(
      NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.empiricalFindings
        .genericPromptClearEarLeakageObserved,
    ).toBe(true);
    expect(
      NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.empiricalFindings
        .genericPromptFrontalHallucinationObserved,
    ).toBe(true);
    expect(
      NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.empiricalFindings
        .partialOcclusionContourCompletionReliable,
    ).toBe(false);
    expect(
      NEUTRAL_EAR_CANDIDATE_VALIDATION_FR103.empiricalFindings
        .fullyOccludedRectangularMaskProducedDegeneratePolygon,
    ).toBe(true);
  });

  it('keeps privacy, laterality, semantics and Production closed', () => {
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
        .anatomicalLateralityAuthorized,
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
