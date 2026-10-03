import { describe, expect, it } from 'vitest';
import {
  FR305_CURRENT_GATE,
  FR305_VISIBLE_HAIRLINE_VERTICAL_REFERENCE_REF,
  assertFR305CurrentGate,
  assertHairlineModelAdmissionReceiptFR305,
  assertVisibleHairlineVerticalReferenceFR305,
  deriveVisibleHairlineVerticalReferenceFR305,
  type FR305HairlineModelAdmissionReceipt,
  type FR305VisibleHairlineObservation,
} from './visible-hairline-vertical-reference-fr305.js';

function receipt(
  overrides: Partial<FR305HairlineModelAdmissionReceipt> = {},
): FR305HairlineModelAdmissionReceipt {
  return {
    schemaVersion:
      'fr305-hairline-model-admission-receipt-v1',
    authorityState:
      'validated_visible_hair_skin_boundary_model_only',
    modelId: 'synthetic:hairline-segmentation-candidate',
    exactRevision: 'synthetic-revision',
    targetClass:
      'visible_hair_skin_boundary_segmentation',
    coordinateFrame:
      'canonical_image_normalized_2d',
    axisConvention:
      'x_right_y_down_unit_square',
    representativeOrdinaryRgbSelfiesValidated: true,
    visibleHairSkinBoundaryValidated: true,
    visibilityHandlingValidated: true,
    occlusionHandlingValidated: true,
    hiddenHairlineCompletionAllowed: false,
    faceOvalSubstitutionAllowed: false,
    faceMeshTopVertexSubstitutionAllowed: false,
    validationEvidenceRefs: [
      'synthetic:test:validation-evidence',
    ],
    runtimeProviderAdmitted: true,
    traditionalBindingIssued: false,
    productionActivated: false,
    commerceActivated: false,
    ...overrides,
  };
}

function observation(
  overrides: Partial<FR305VisibleHairlineObservation> = {},
): FR305VisibleHairlineObservation {
  return {
    schemaVersion:
      'fr305-visible-hairline-observation-v1',
    authorityState:
      'validated_model_visible_boundary_observation_only',
    modelId: 'synthetic:hairline-segmentation-candidate',
    exactRevision: 'synthetic-revision',
    coordinateFrame:
      'canonical_image_normalized_2d',
    axisConvention:
      'x_right_y_down_unit_square',
    boundaryPolyline: [
      { x: 0.2, y: 0.25 },
      { x: 0.5, y: 0.2 },
      { x: 0.8, y: 0.25 },
    ],
    visibilityState:
      'visible_boundary_segment_admitted',
    occlusionHandlingApplied: true,
    hiddenSegmentsCompleted: false,
    sourceImageDigest:
      `sha256:${'a'.repeat(64)}`,
    sourceObservationRefs: [
      'synthetic:test:visible-hairline-boundary',
    ],
    providerFaceOvalUsedAsHairline: false,
    providerFaceMeshTopVerticesUsedAsHairline: false,
    traditionalBindingApplied: false,
    ...overrides,
  };
}

describe('FR305 visible hairline vertical reference', () => {
  it('fails closed when no validated hairline model is admitted', () => {
    const result =
      deriveVisibleHairlineVerticalReferenceFR305();

    expect(result).toEqual({
      schemaVersion:
        'fr305-visible-hairline-vertical-reference-v1',
      artifactVersion: '0.1.0',
      contractVersion:
        'FR305-VISIBLE-HAIRLINE-VERTICAL-REFERENCE-v1',
      authorityState:
        'neutral_visible_hairline_vertical_reference_only',
      status: 'unavailable',
      reason:
        'validated_hairline_model_not_admitted',
      fallbackInvented: false,
      crossAnchorSpanReady: false,
      bridgeReviewState:
        'neutral_observation_not_available_for_binding_review',
      authorityBoundary: {
        neutralObservationOnly: true,
        anatomicalHairlineGroundTruthIssued: false,
        traditionalHairlineEquivalenceIssued: false,
        traditionalBindingIssued: false,
        hiddenHairlineCompletionIssued: false,
        faceOvalHairlineSubstitutionIssued: false,
        faceMeshTopVertexHairlineSubstitutionIssued: false,
        canonicalMetricXYRelabelingIssued: false,
        crossFrameSubtractionAllowed: false,
        threeDivisionsBoundaryIssued: false,
        threeDivisionsSpanIssued: false,
        thresholdIssued: false,
        calibrationIssued: false,
        classifierIssued: false,
        productColumnMaterialized: false,
        productionActivated: false,
        commerceActivated: false,
      },
    });
  });

  it('fails closed when the model is admitted but the visible boundary is unavailable', () => {
    const result =
      deriveVisibleHairlineVerticalReferenceFR305(
        receipt(),
      );

    expect(result).toMatchObject({
      status: 'unavailable',
      reason:
        'visible_hairline_observation_unavailable',
      fallbackInvented: false,
      crossAnchorSpanReady: false,
    });
  });

  it('derives the visible-boundary arc-length-weighted vertical coordinate without hidden completion', () => {
    const result =
      deriveVisibleHairlineVerticalReferenceFR305(
        receipt(),
        observation(),
      );

    expect(result.status).toBe('available');
    if (result.status !== 'available') return;

    expect(result).toMatchObject({
      observationRef:
        FR305_VISIBLE_HAIRLINE_VERTICAL_REFERENCE_REF,
      unit: 'normalized_ratio',
      coordinateFrame:
        'canonical_image_normalized_2d',
      axisConvention:
        'x_right_y_down_unit_square',
      selectionRule:
        'arc_length_weighted_y_centroid_of_explicitly_visible_boundary_polyline',
      visibilitySemantics:
        'visible_segments_only_no_hidden_completion',
      failClosedWhenUnavailable: true,
      crossAnchorSpanReady: false,
      crossAnchorSpanBlocker:
        'common_coordinate_frame_bridge_not_issued',
    });
    expect(result.value).toBeCloseTo(0.225, 12);
  });

  it('is stable when straight visible segments are subdivided', () => {
    const base =
      deriveVisibleHairlineVerticalReferenceFR305(
        receipt(),
        observation(),
      );

    const subdivided =
      deriveVisibleHairlineVerticalReferenceFR305(
        receipt(),
        observation({
          boundaryPolyline: [
            { x: 0.2, y: 0.25 },
            { x: 0.35, y: 0.225 },
            { x: 0.5, y: 0.2 },
            { x: 0.65, y: 0.225 },
            { x: 0.8, y: 0.25 },
          ],
        }),
      );

    expect(base.status).toBe('available');
    expect(subdivided.status).toBe('available');
    if (
      base.status === 'available' &&
      subdivided.status === 'available'
    ) {
      expect(subdivided.value).toBeCloseTo(
        base.value,
        12,
      );
    }
  });

  it('rejects hidden-hairline completion and face-mesh substitution at model admission', () => {
    expect(() =>
      assertHairlineModelAdmissionReceiptFR305(
        receipt({
          hiddenHairlineCompletionAllowed: true,
        } as never),
      ),
    ).toThrow(/model admission receipt boundary drift/);

    expect(() =>
      assertHairlineModelAdmissionReceiptFR305(
        receipt({
          faceOvalSubstitutionAllowed: true,
        } as never),
      ),
    ).toThrow(/model admission receipt boundary drift/);
  });

  it('rejects observations from a different model revision', () => {
    expect(() =>
      deriveVisibleHairlineVerticalReferenceFR305(
        receipt(),
        observation({
          exactRevision: 'different-revision',
        }),
      ),
    ).toThrow(/model identity must match/);
  });

  it('rejects degenerate, out-of-range and substituted boundary observations', () => {
    expect(() =>
      deriveVisibleHairlineVerticalReferenceFR305(
        receipt(),
        observation({
          boundaryPolyline: [
            { x: 0.3, y: 0.2 },
            { x: 0.3, y: 0.2 },
          ],
        }),
      ),
    ).toThrow(/degenerate segment/);

    expect(() =>
      deriveVisibleHairlineVerticalReferenceFR305(
        receipt(),
        observation({
          boundaryPolyline: [
            { x: 0.2, y: -0.1 },
            { x: 0.8, y: 0.2 },
          ],
        }),
      ),
    ).toThrow(/within \[0,1\]/);

    expect(() =>
      deriveVisibleHairlineVerticalReferenceFR305(
        receipt(),
        observation({
          providerFaceOvalUsedAsHairline: true,
        } as never),
      ),
    ).toThrow(/observation boundary drift/);
  });

  it('does not expose image digest, source refs or traditional semantics in the available handoff', () => {
    const result =
      deriveVisibleHairlineVerticalReferenceFR305(
        receipt(),
        observation(),
      );

    expect(result.status).toBe('available');
    if (result.status !== 'available') return;

    expect(result.source).toMatchObject({
      sourceImageDigestRetainedInternally: true,
      sourceImageDigestExposed: false,
      sourceObservationRefsRetainedInternally: true,
      sourceObservationRefsExposed: false,
      traditionalSemanticsExposed: false,
      hiddenHairlineCompletionAllowed: false,
      faceOvalSubstitutionAllowed: false,
      faceMeshTopVertexSubstitutionAllowed: false,
    });
  });

  it('rejects forged traditional or cross-frame authority', () => {
    const result =
      deriveVisibleHairlineVerticalReferenceFR305(
        receipt(),
        observation(),
      );

    expect(() =>
      assertVisibleHairlineVerticalReferenceFR305({
        ...result,
        authorityBoundary: {
          ...result.authorityBoundary,
          traditionalHairlineEquivalenceIssued: true,
        },
      } as never),
    ).toThrow(/authority widened/);

    expect(() =>
      assertVisibleHairlineVerticalReferenceFR305({
        ...result,
        authorityBoundary: {
          ...result.authorityBoundary,
          crossFrameSubtractionAllowed: true,
        },
      } as never),
    ).toThrow(/authority widened/);
  });

  it('keeps #1521 at six of seven until a real validated model is admitted', () => {
    expect(FR305_CURRENT_GATE).toMatchObject({
      parentIssue: 1521,
      requiredNeutralVerticalReferenceCapabilityCount: 7,
      handoffReadyNeutralReferenceCapabilityCount: 6,
      remainingNeutralReferenceCapabilityCount: 1,
      traditionalBindingAdmittedCount: 0,
      visibleHairlineReferenceContractDefined: true,
      validatedHairlineModelAdmitted: false,
      realVisibleHairlineObservationMaterialized: false,
      hairlineHardGapPreserved: true,
      mixedCoordinateFrameSpanBlocked: true,
      commonCoordinateFrameBridgeIssued: false,
      threeDivisionsSpanExecutionReady: false,
      productMaterializedCount: 18,
      productionActivated: false,
      commerceActivated: false,
    });

    expect(() => assertFR305CurrentGate()).not.toThrow();
  });
});
