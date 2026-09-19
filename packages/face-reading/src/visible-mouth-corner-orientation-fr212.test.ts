import { describe, expect, it } from 'vitest';
import type { PoseNormalizedLipsGeometryFR79V1 } from './pose-normalized-lips-geometry-fr79.js';
import {
  assertVisibleMouthCornerOrientationFR212,
  computeVisibleMouthCornerOrientationFR212,
  deriveVisibleMouthCornerInputFR212,
  type FR212MouthCornerOrientationResult,
} from './visible-mouth-corner-orientation-fr212.js';

describe('FR212 visible mouth-corner orientation', () => {
  it('derives horizontal extrema and a role-free bounding-box center from the unordered contour union', () => {
    const derived = deriveVisibleMouthCornerInputFR212([
      { x: -3, y: 0.5 },
      { x: -2, y: 1 },
      { x: 0, y: 1.5 },
      { x: 2, y: 1 },
      { x: 3, y: 0.5 },
      { x: 2, y: -1 },
      { x: 0, y: -1.5 },
      { x: -2, y: -1 },
    ], ['fr212:test:unordered-union']);

    expect(derived.status).toBe('available');
    if (derived.status !== 'available') return;
    expect(derived.input.leftCorner).toEqual({ x: -3, y: 0.5 });
    expect(derived.input.rightCorner).toEqual({ x: 3, y: 0.5 });
    expect(derived.input.visibleMouthCenter).toEqual({ x: 0, y: 0 });
  });

  it('fails closed when a horizontal extremum has multiple vertical values', () => {
    expect(deriveVisibleMouthCornerInputFR212([
      { x: -3, y: 0.5 },
      { x: -3, y: -0.5 },
      { x: 0, y: 1 },
      { x: 3, y: 0 },
      { x: 0, y: -1 },
    ], ['fr212:test:ambiguous-left'])).toEqual({
      status: 'unavailable',
      reason: 'left_horizontal_extremum_has_multiple_vertical_values',
      fallbackInvented: false,
    });
  });

  it('fails closed on collapsed horizontal or vertical contour extent', () => {
    expect(deriveVisibleMouthCornerInputFR212([
      { x: 0, y: -1 }, { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 },
    ], ['fr212:test:collapsed-x'])).toEqual({
      status: 'unavailable',
      reason: 'mouth_horizontal_span_collapsed',
      fallbackInvented: false,
    });

    expect(deriveVisibleMouthCornerInputFR212([
      { x: -2, y: 0 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 },
    ], ['fr212:test:collapsed-y'])).toEqual({
      status: 'unavailable',
      reason: 'mouth_vertical_span_collapsed',
      fallbackInvented: false,
    });
  });

  it('rejects forged FR79 geometry instead of manufacturing a mouth observation', () => {
    expect(() => computeVisibleMouthCornerOrientationFR212(
      {} as PoseNormalizedLipsGeometryFR79V1,
    )).toThrow(/not issued by the active FR-79 projection boundary/u);
  });

  it('rejects any attempted anatomical or traditional authority widening', () => {
    const forged = {
      schemaVersion: 'fr212-mouth-corner-orientation-v1',
      artifactVersion: '0.1.0',
      contractVersion: 'FR212-VISIBLE-MOUTH-CORNER-ORIENTATION-v1',
      authorityState: 'visible_mouth_contour_axis_candidate_only',
      status: 'unavailable',
      reason: 'mouth_vertical_span_collapsed',
      fallbackInvented: false,
      source: {
        fr79ProviderRunRef: 'fr212:test',
        fr79CanonicalAssetDigest: `sha256:${'a'.repeat(64)}`,
        fr79ProjectionRuleRef: 'fr79:canonical-metric-xy-orthographic@0.1.0',
        unorderedContourUnionConsumed: true,
        providerComponentOrderUsedSemantically: false,
        providerVertexIndexExposed: false,
      },
      authorityBoundary: {
        observableMorphologyOnly: true,
        outerInnerLipRoleIssued: false,
        cheilionAnatomicalClaimIssued: true,
        lipThicknessOrFullnessIssued: false,
        classifierIssued: false,
        thresholdIssued: false,
        calibrationIssued: false,
        traditionalBindingIssued: false,
        productionActivated: false,
        commerceActivated: false,
      },
    } as unknown as FR212MouthCornerOrientationResult;

    expect(() => assertVisibleMouthCornerOrientationFR212(forged)).toThrow(/authority widened/u);
  });
});
