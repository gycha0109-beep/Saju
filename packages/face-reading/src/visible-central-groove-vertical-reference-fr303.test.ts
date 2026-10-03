import { describe, expect, it } from 'vitest';
import type {
  FR291VisibleMouthWidthReference,
  FR291VisiblePhiltrumGeometryInput,
} from './visible-philtrum-geometry-fr291.js';
import {
  FR303_CURRENT_GATE,
  FR303_VISIBLE_CENTRAL_GROOVE_VERTICAL_REFERENCE_REF,
  assertFR303CurrentGate,
  assertVisibleCentralGrooveVerticalReferenceFR303,
  deriveVisibleCentralGrooveVerticalReferenceFR303,
} from './visible-central-groove-vertical-reference-fr303.js';

const ASSET = 'fr303:test:asset';

function reference(
  overrides: Partial<FR291VisibleMouthWidthReference> = {},
): FR291VisibleMouthWidthReference {
  return {
    schemaVersion:
      'fr291-visible-mouth-width-reference-v1',
    authorityState:
      'fr79_visible_lips_horizontal_envelope_reference_only',
    coordinateFrame: 'pose_normalized_face_2d',
    coordinateUnit: 'centimeter',
    mouthMinX: -2,
    mouthMaxX: 2,
    mouthHorizontalSpan: 4,
    sourceFR79SchemaVersion:
      'fr79-pose-normalized-lips-geometry-v1',
    sourceCanonicalAssetDigest: ASSET,
    providerRunRefExposed: false,
    canonicalAssetDigestExposed: false,
    providerVertexIndicesExposed: false,
    anatomicalRoleAssigned: false,
    ...overrides,
  };
}

function input(
  overrides: Partial<FR291VisiblePhiltrumGeometryInput> = {},
): FR291VisiblePhiltrumGeometryInput {
  return {
    schemaVersion:
      'fr291-visible-philtrum-geometry-input-v1',
    authorityState:
      'governed_visible_central_groove_geometry_only',
    coordinateFrame: 'pose_normalized_face_2d',
    coordinateUnit: 'centimeter',
    visibleCentralGrooveAxisEndpoints: [
      { x: 0, y: 1.2 },
      { x: 0, y: 0.2 },
    ],
    visibleCorridorWidthPair: [
      { x: -0.5, y: 0.7 },
      { x: 0.5, y: 0.7 },
    ],
    visibilityAdmitted: true,
    sameCaptureAsFR79LipsVerified: true,
    sourceCanonicalAssetDigest: ASSET,
    sourceObservationRefs: ['fr303:test:central-groove'],
    providerSpecificIndicesExposed: false,
    rawLandmarksExposed: false,
    anatomicalLandmarkNamesAssigned: false,
    hiddenBoundaryInferred: false,
    traditionalBindingApplied: false,
    ...overrides,
  };
}

describe('FR303 visible central-groove vertical reference', () => {
  it('derives a neutral midpoint vertical coordinate from the governed FR291 axis', () => {
    const result =
      deriveVisibleCentralGrooveVerticalReferenceFR303(
        input(),
        reference(),
      );

    expect(result).toMatchObject({
      status: 'available',
      observationRef:
        FR303_VISIBLE_CENTRAL_GROOVE_VERTICAL_REFERENCE_REF,
      value: 0.7,
      unit: 'centimeter',
      coordinateFrame: 'pose_normalized_face_2d',
      endpointOrderSemantic: false,
      failClosedWhenUnavailable: true,
      crossAnchorSpanReady: false,
      crossAnchorSpanBlocker:
        'common_coordinate_frame_bridge_not_issued',
    });
  });

  it('is invariant to central-groove endpoint order', () => {
    const source = input();
    const forward =
      deriveVisibleCentralGrooveVerticalReferenceFR303(
        source,
        reference(),
      );
    const reversed =
      deriveVisibleCentralGrooveVerticalReferenceFR303(
        {
          ...source,
          visibleCentralGrooveAxisEndpoints: [
            source.visibleCentralGrooveAxisEndpoints[1],
            source.visibleCentralGrooveAxisEndpoints[0],
          ],
        },
        reference(),
      );

    expect(reversed).toEqual(forward);
  });

  it('propagates FR291 unavailability without inventing a fallback', () => {
    const result =
      deriveVisibleCentralGrooveVerticalReferenceFR303(
        input({
          visibleCentralGrooveAxisEndpoints: [
            { x: 0, y: 0.5 },
            { x: 0, y: 0.5 },
          ],
        }),
        reference(),
      );

    expect(result).toMatchObject({
      status: 'unavailable',
      reason:
        'fr291_visible_central_groove_geometry_unavailable',
      sourceUnavailableReason:
        'visible_central_groove_axis_collapsed',
      fallbackInvented: false,
      crossAnchorSpanReady: false,
    });
  });

  it('preserves the FR291 coordinate frame instead of silently relabeling it', () => {
    const result =
      deriveVisibleCentralGrooveVerticalReferenceFR303(
        input(),
        reference(),
      );

    expect(result.status).toBe('available');
    if (result.status !== 'available') return;

    expect(result.coordinateFrame).toBe(
      'pose_normalized_face_2d',
    );
    expect(result.coordinateFrame).not.toBe(
      'canonical_aligned_right_handed_metric_xy',
    );
    expect(result.crossAnchorSpanReady).toBe(false);
  });

  it('keeps provider, anatomy, traditional and Three-Divisions authority closed', () => {
    const result =
      deriveVisibleCentralGrooveVerticalReferenceFR303(
        input(),
        reference(),
      );

    expect(result.authorityBoundary).toEqual({
      neutralObservationOnly: true,
      anatomicalPhiltrumGroundTruthIssued: false,
      traditionalRenzhongEquivalenceIssued: false,
      traditionalBindingIssued: false,
      commonFrameBridgeIssued: false,
      mixedFrameSubtractionAllowed: false,
      threeDivisionsBoundaryIssued: false,
      threeDivisionsSpanIssued: false,
      thresholdIssued: false,
      calibrationIssued: false,
      classifierIssued: false,
      productionActivated: false,
      commerceActivated: false,
    });
    expect(result.source).toMatchObject({
      providerSpecificIndicesExposed: false,
      rawLandmarksExposed: false,
      anatomicalLandmarkNamesExposed: false,
      traditionalSemanticsExposed: false,
      sourceObservationRefsExposed: false,
      canonicalAssetDigestExposed: false,
    });
  });

  it('rejects forged common-frame or traditional authority', () => {
    const result =
      deriveVisibleCentralGrooveVerticalReferenceFR303(
        input(),
        reference(),
      );

    expect(() =>
      assertVisibleCentralGrooveVerticalReferenceFR303({
        ...result,
        authorityBoundary: {
          ...result.authorityBoundary,
          traditionalRenzhongEquivalenceIssued: true,
        },
      } as never),
    ).toThrow(/authority widened/);

    expect(() =>
      assertVisibleCentralGrooveVerticalReferenceFR303({
        ...result,
        authorityBoundary: {
          ...result.authorityBoundary,
          commonFrameBridgeIssued: true,
        },
      } as never),
    ).toThrow(/authority widened/);
  });

  it('freezes #1521 at four neutral references while mixed-frame span execution remains blocked', () => {
    expect(FR303_CURRENT_GATE).toMatchObject({
      parentIssue: 1521,
      requiredNeutralVerticalReferenceCapabilityCount: 7,
      handoffReadyNeutralReferenceCapabilityCount: 4,
      remainingNeutralReferenceCapabilityCount: 3,
      traditionalBindingAdmittedCount: 0,
      centralGrooveVerticalReferenceCapabilityReady: true,
      mixedCoordinateFrameSpanBlocked: true,
      commonCoordinateFrameBridgeIssued: false,
      threeDivisionsSpanExecutionReady: false,
      hairlineHardGapPreserved: true,
      productionActivated: false,
      commerceActivated: false,
    });

    expect(() => assertFR303CurrentGate()).not.toThrow();
  });
});
