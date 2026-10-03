import { describe, expect, it } from 'vitest';
import type { FR292VisibleEyebrowPairGeometryInput } from './visible-eyebrow-pair-geometry-fr292.js';
import {
  FR302_BROW_VERTICAL_REFERENCE_REF,
  FR302_CURRENT_GATE,
  FR302_INTERBROW_VERTICAL_REFERENCE_REF,
  assertBrowInterbrowVerticalReferencesFR302,
  assertFR302CurrentGate,
  deriveBrowInterbrowVerticalReferencesFR302,
} from './brow-interbrow-vertical-reference-fr302.js';

function baseInput(): FR292VisibleEyebrowPairGeometryInput {
  return {
    schemaVersion: 'fr292-visible-eyebrow-pair-input-v1',
    authorityState:
      'governed_explicit_visible_eyebrow_pair_geometry_only',
    coordinateFrame:
      'canonical_aligned_right_handed_metric_xy',
    unorderedVisibleBrows: [
      {
        medialEndpoint: { x: -1, y: 3 },
        lateralEndpoint: { x: -3, y: 3 },
        orderedVisibleCurve: [
          { x: -1, y: 3 },
          { x: -2, y: 4 },
          { x: -3, y: 3 },
        ],
      },
      {
        medialEndpoint: { x: 1, y: 3.2 },
        lateralEndpoint: { x: 3, y: 3.2 },
        orderedVisibleCurve: [
          { x: 1, y: 3.2 },
          { x: 2, y: 4.2 },
          { x: 3, y: 3.2 },
        ],
      },
    ],
    visibleFaceWidthPair: [
      { x: -5, y: 0 },
      { x: 5, y: 0 },
    ],
    visibilityAdmitted: true,
    explicitVisibleEndpointRolesProvided: true,
    sameCaptureAsFR77FullFaceVerified: true,
    sourceCanonicalAssetDigest: `sha256:${'a'.repeat(64)}`,
    sourceObservationRefs: ['fr302:test:brows'],
    providerComponentIdentityUsed: false,
    providerSpecificIndicesExposed: false,
    rawLandmarksExposed: false,
    anatomicalBoundaryRoleAssigned: false,
    traditionalBindingApplied: false,
  };
}

describe('FR302 brow and interbrow vertical references', () => {
  it('derives two neutral vertical references from governed visible brow curves', () => {
    const result =
      deriveBrowInterbrowVerticalReferencesFR302(baseInput());

    expect(result.browVerticalReference.status).toBe('available');
    if (result.browVerticalReference.status === 'available') {
      expect(result.browVerticalReference.observationRef).toBe(
        FR302_BROW_VERTICAL_REFERENCE_REF,
      );
      expect(result.browVerticalReference.value).toBeCloseTo(3.6, 12);
      expect(result.browVerticalReference.unit).toBe('centimeter');
    }

    expect(result.interbrowVerticalReference.status).toBe('available');
    if (result.interbrowVerticalReference.status === 'available') {
      expect(result.interbrowVerticalReference.observationRef).toBe(
        FR302_INTERBROW_VERTICAL_REFERENCE_REF,
      );
      expect(result.interbrowVerticalReference.value).toBeCloseTo(3.1, 12);
      expect(result.interbrowVerticalReference.unit).toBe('centimeter');
    }
  });

  it('is invariant to the unordered brow-pair input order', () => {
    const input = baseInput();
    const forward =
      deriveBrowInterbrowVerticalReferencesFR302(input);
    const reversed =
      deriveBrowInterbrowVerticalReferencesFR302({
        ...input,
        unorderedVisibleBrows: [
          input.unorderedVisibleBrows[1],
          input.unorderedVisibleBrows[0],
        ],
      });

    expect(reversed.browVerticalReference).toEqual(
      forward.browVerticalReference,
    );
    expect(reversed.interbrowVerticalReference).toEqual(
      forward.interbrowVerticalReference,
    );
  });

  it('keeps the curve centroid stable when straight segments are subdivided', () => {
    const input = baseInput();
    const baseline =
      deriveBrowInterbrowVerticalReferencesFR302(input);

    const subdivided =
      deriveBrowInterbrowVerticalReferencesFR302({
        ...input,
        unorderedVisibleBrows: [
          {
            ...input.unorderedVisibleBrows[0],
            orderedVisibleCurve: [
              { x: -1, y: 3 },
              { x: -1.5, y: 3.5 },
              { x: -2, y: 4 },
              { x: -2.5, y: 3.5 },
              { x: -3, y: 3 },
            ],
          },
          {
            ...input.unorderedVisibleBrows[1],
            orderedVisibleCurve: [
              { x: 1, y: 3.2 },
              { x: 1.5, y: 3.7 },
              { x: 2, y: 4.2 },
              { x: 2.5, y: 3.7 },
              { x: 3, y: 3.2 },
            ],
          },
        ],
      });

    expect(baseline.browVerticalReference.status).toBe('available');
    expect(subdivided.browVerticalReference.status).toBe('available');

    if (
      baseline.browVerticalReference.status === 'available' &&
      subdivided.browVerticalReference.status === 'available'
    ) {
      expect(subdivided.browVerticalReference.value).toBeCloseTo(
        baseline.browVerticalReference.value,
        12,
      );
    }
  });

  it('keeps the brow reference but fails the interbrow reference closed when medial width collapses', () => {
    const input = baseInput();
    const result =
      deriveBrowInterbrowVerticalReferencesFR302({
        ...input,
        unorderedVisibleBrows: [
          {
            medialEndpoint: { x: 0, y: 3 },
            lateralEndpoint: { x: -3, y: 3 },
            orderedVisibleCurve: [
              { x: 0, y: 3 },
              { x: -1.5, y: 4 },
              { x: -3, y: 3 },
            ],
          },
          {
            medialEndpoint: { x: 0, y: 3.2 },
            lateralEndpoint: { x: 3, y: 3.2 },
            orderedVisibleCurve: [
              { x: 0, y: 3.2 },
              { x: 1.5, y: 4.2 },
              { x: 3, y: 3.2 },
            ],
          },
        ],
      });

    expect(result.browVerticalReference.status).toBe('available');
    expect(result.interbrowVerticalReference).toEqual({
      status: 'unavailable',
      reason: 'visible_interbrow_horizontal_span_collapsed',
      fallbackInvented: false,
      bridgeReviewState:
        'neutral_observation_not_available_for_binding_review',
    });
  });

  it('propagates FR292 unavailability without inventing either reference', () => {
    const input = baseInput();
    const result =
      deriveBrowInterbrowVerticalReferencesFR302({
        ...input,
        visibleFaceWidthPair: [
          { x: 0, y: 0 },
          { x: 0, y: 1 },
        ],
      });

    expect(result.browVerticalReference).toMatchObject({
      status: 'unavailable',
      reason: 'fr292_visible_eyebrow_pair_unavailable',
      sourceUnavailableReason: 'visible_face_width_collapsed',
      fallbackInvented: false,
    });
    expect(result.interbrowVerticalReference).toMatchObject({
      status: 'unavailable',
      reason: 'fr292_visible_eyebrow_pair_unavailable',
      sourceUnavailableReason: 'visible_face_width_collapsed',
      fallbackInvented: false,
    });
  });

  it('does not expose provider identity, raw landmarks, source refs or traditional semantics', () => {
    const result =
      deriveBrowInterbrowVerticalReferencesFR302(baseInput());

    expect(result.source).toEqual({
      sourceContractVersion:
        'FR292-VISIBLE-EYEBROW-PAIR-GEOMETRY-v1',
      sourceGeometryStatus: 'available',
      explicitVisibleSemanticCurvesConsumed: true,
      canonicalAssetDigestValidatedByFR292: true,
      sourceObservationRefsValidatedByFR292: true,
      providerEyebrowComponentsConsumed: false,
      providerSpecificIndicesExposed: false,
      rawLandmarksExposed: false,
      canonicalAssetDigestExposed: false,
      sourceObservationRefsExposed: false,
      traditionalSemanticsExposed: false,
    });
  });

  it('rejects forged traditional authority', () => {
    const result =
      deriveBrowInterbrowVerticalReferencesFR302(baseInput());

    expect(() =>
      assertBrowInterbrowVerticalReferencesFR302({
        ...result,
        authorityBoundary: {
          ...result.authorityBoundary,
          traditionalBrowEquivalenceIssued: true,
        },
      } as never),
    ).toThrow(/authority widened/);
  });

  it('freezes #1521 progress at three neutral capabilities and zero traditional bindings', () => {
    expect(FR302_CURRENT_GATE).toMatchObject({
      parentIssue: 1521,
      requiredNeutralVerticalReferenceCapabilityCount: 7,
      handoffReadyNeutralReferenceCapabilityCount: 3,
      remainingNeutralReferenceCapabilityCount: 4,
      traditionalBindingAdmittedCount: 0,
      lowerFaceInferiorReferenceCapabilityReady: true,
      browVerticalReferenceCapabilityReady: true,
      interbrowVerticalReferenceCapabilityReady: true,
      hairlineHardGapPreserved: true,
      productionActivated: false,
      commerceActivated: false,
    });

    expect(() => assertFR302CurrentGate()).not.toThrow();
  });
});
