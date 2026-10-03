import { describe, expect, it } from 'vitest';
import type { FR216VisibleLowerFaceContourResult } from './canonical-visible-lower-face-contour-fr216.js';
import {
  deriveVisibleLowerFaceInferiorVerticalReferenceFR260,
} from './visible-lower-face-inferior-vertical-reference-fr260.js';
import {
  FR301_CURRENT_GATE,
  assertFR301CurrentGate,
  assertLowerFaceVerticalReferenceHandoffFR301,
  createLowerFaceVerticalReferenceHandoffFR301,
} from './lower-face-vertical-reference-handoff-fr301.js';

const SOURCE_BOUNDARY = Object.freeze({
  observableMorphologyOnly: true as const,
  mandibularBoneBoundaryIssued: false as const,
  anatomicalChinBoundaryIssued: false as const,
  gonionAnatomicalMappingIssued: false as const,
  jawBoneWidthClaimIssued: false as const,
  classifierIssued: false as const,
  thresholdIssued: false as const,
  calibrationIssued: false as const,
  traditionalBindingIssued: false as const,
  productionActivated: false as const,
  commerceActivated: false as const,
});

const SOURCE_RECEIPT = Object.freeze({
  fr77ProviderRunRef: 'fr301:test',
  fr77CanonicalAssetDigest: `sha256:${'a'.repeat(64)}`,
  fr79ProjectionRuleRef:
    'fr79:canonical-metric-xy-orthographic@0.1.0' as const,
  sameProviderRunVerified: true as const,
  sameCanonicalAssetDigestVerified: true as const,
  faceOvalTopologySource:
    'fr211_inherited_fr200_recorded_mediapipe_face_oval_topology' as const,
  faceOvalTopologyReleaseExactForInstalledPackage: false as const,
  providerIndicesExposedInOutput: false as const,
  interpolationApplied: false as const,
  smoothingApplied: false as const,
  normalizationApplied: false as const,
});

function availableSource(): FR216VisibleLowerFaceContourResult {
  const points = Object.freeze([
    Object.freeze({ x: -2, y: -1 }),
    Object.freeze({ x: -1, y: -2 }),
    Object.freeze({ x: 0, y: -2.5 }),
    Object.freeze({ x: 1, y: -2 }),
    Object.freeze({ x: 2, y: -1 }),
  ]);

  return Object.freeze({
    schemaVersion: 'fr216-visible-lower-face-contour-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion:
      'FR216-CANONICAL-VISIBLE-LOWER-FACE-CONTOUR-v1' as const,
    authorityState:
      'canonical_visible_soft_tissue_lower_face_contour_only' as const,
    status: 'available' as const,
    coordinateFrame:
      'canonical_aligned_right_handed_metric_xy' as const,
    coordinateUnit: 'centimeter' as const,
    contourDefinition:
      'ordered_face_oval_vertices_at_or_below_unordered_lips_union_mean_y' as const,
    points,
    pointCount: points.length,
    source: SOURCE_RECEIPT,
    authorityBoundary: SOURCE_BOUNDARY,
  });
}

function unavailableSource(): FR216VisibleLowerFaceContourResult {
  return Object.freeze({
    schemaVersion: 'fr216-visible-lower-face-contour-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion:
      'FR216-CANONICAL-VISIBLE-LOWER-FACE-CONTOUR-v1' as const,
    authorityState:
      'canonical_visible_soft_tissue_lower_face_contour_only' as const,
    status: 'unavailable' as const,
    reason:
      'lower_face_contour_contains_fewer_than_three_points' as const,
    fallbackInvented: false as const,
    source: SOURCE_RECEIPT,
    authorityBoundary: SOURCE_BOUNDARY,
  });
}

describe('FR301 lower-face vertical reference handoff', () => {
  it('returns the governed FR260 neutral reference for explicit binding review only', () => {
    const fr260 =
      deriveVisibleLowerFaceInferiorVerticalReferenceFR260(
        availableSource(),
      );
    const result =
      createLowerFaceVerticalReferenceHandoffFR301(fr260);

    expect(result).toMatchObject({
      status: 'available',
      observationRef:
        'neutral.face.visible_lower_face.inferior_vertical_coordinate@0.1.0',
      value: -2.5,
      unit: 'centimeter',
      coordinateFrame:
        'canonical_aligned_right_handed_metric_xy',
      bridgeReviewState:
        'neutral_observation_ready_for_explicit_binding_review',
      failClosedWhenUnavailable: true,
    });
  });

  it('does not expose source provider identity or canonical asset digest', () => {
    const fr260 =
      deriveVisibleLowerFaceInferiorVerticalReferenceFR260(
        availableSource(),
      );
    const result =
      createLowerFaceVerticalReferenceHandoffFR301(fr260);

    expect(result.source).toEqual({
      sourceContractId:
        'visible_lower_face_inferior_vertical_reference_fr260',
      sourceReferenceRef:
        'neutral.face.visible_lower_face.inferior_vertical_coordinate@0.1.0',
      sourceStatus: 'available',
      sourceProvenanceRetainedInternally: true,
      sourceProviderRunRefExposed: false,
      sourceCanonicalAssetDigestExposed: false,
      sourceProviderIndicesExposed: false,
      sourceTraditionalSemanticsExposed: false,
    });
  });

  it('fails closed when FR260 is unavailable', () => {
    const fr260 =
      deriveVisibleLowerFaceInferiorVerticalReferenceFR260(
        unavailableSource(),
      );
    const result =
      createLowerFaceVerticalReferenceHandoffFR301(fr260);

    expect(result).toMatchObject({
      status: 'unavailable',
      reason: 'fr260_neutral_reference_unavailable',
      sourceUnavailableReason:
        'lower_face_contour_contains_fewer_than_three_points',
      fallbackInvented: false,
      bridgeReviewState:
        'neutral_observation_not_available_for_binding_review',
    });
  });

  it('keeps all anatomy, traditional, span, production and commerce authority closed', () => {
    const fr260 =
      deriveVisibleLowerFaceInferiorVerticalReferenceFR260(
        availableSource(),
      );
    const result =
      createLowerFaceVerticalReferenceHandoffFR301(fr260);

    expect(result.authorityBoundary).toEqual({
      neutralObservationOnly: true,
      anatomicalChinIdentityIssued: false,
      traditionalDigeEquivalenceIssued: false,
      traditionalBindingIssued: false,
      threeDivisionsBoundaryIssued: false,
      threeDivisionsSpanIssued: false,
      fr35DirectReplacementIssued: false,
      thresholdIssued: false,
      calibrationIssued: false,
      classifierIssued: false,
      productionActivated: false,
      commerceActivated: false,
    });
  });

  it('rejects forged traditional authority', () => {
    const fr260 =
      deriveVisibleLowerFaceInferiorVerticalReferenceFR260(
        availableSource(),
      );
    const result =
      createLowerFaceVerticalReferenceHandoffFR301(fr260);

    expect(() =>
      assertLowerFaceVerticalReferenceHandoffFR301({
        ...result,
        authorityBoundary: {
          ...result.authorityBoundary,
          traditionalBindingIssued: true,
        },
      } as never),
    ).toThrow(/authority widened/);
  });

  it('freezes #1521 progress at one neutral capability and zero traditional bindings', () => {
    expect(FR301_CURRENT_GATE).toMatchObject({
      parentIssue: 1521,
      requiredNeutralVerticalReferenceCapabilityCount: 7,
      handoffReadyNeutralReferenceCapabilityCount: 1,
      remainingNeutralReferenceCapabilityCount: 6,
      traditionalBindingAdmittedCount: 0,
      lowerFaceInferiorReferenceCapabilityReady: true,
      runtimeAvailabilityConditional: true,
      hairlineHardGapPreserved: true,
      productionActivated: false,
      commerceActivated: false,
    });

    expect(() => assertFR301CurrentGate()).not.toThrow();
  });
});
