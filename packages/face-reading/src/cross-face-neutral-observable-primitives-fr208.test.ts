import { describe, expect, it } from 'vitest';
import {
  assertFaceReadingNeutralObservablePrimitivePackFR208,
  computeEyeOuterCornerTiltFR208,
  computeEyebrowVisibleCurveFR208,
  computeMouthCornerElevationFR208,
  computeVisibleLowerFaceWidthRatioFR208,
  computeVisibleMidfaceWidthRatioFR208,
} from './cross-face-neutral-observable-primitives-fr208.js';

const refs = ['observation.fr208.fixture'];

describe('FR208 cross-face neutral observable primitives', () => {
  it('keeps the primitive pack fail-closed and authority-neutral', () => {
    expect(() => assertFaceReadingNeutralObservablePrimitivePackFR208()).not.toThrow();
  });

  it('computes side-normalized eye outer-corner tilt with positive=outer greater canonical Y', () => {
    const result = computeEyeOuterCornerTiltFR208({
      coordinateFrame: 'canonical_aligned_right_handed_metric_xy',
      leftEye: {
        innerCorner: { x: 0.42, y: 0.40 },
        outerCorner: { x: 0.30, y: 0.44 },
      },
      rightEye: {
        innerCorner: { x: 0.58, y: 0.40 },
        outerCorner: { x: 0.70, y: 0.44 },
      },
      sourceObservationRefs: refs,
    });

    expect(result.left.value).toBeCloseTo(18.4349488, 6);
    expect(result.right.value).toBeCloseTo(18.4349488, 6);
    expect(result.mean.value).toBeCloseTo(18.4349488, 6);
    expect(result.mean.unit).toBe('degree');
    expect(result.mean.classificationApplied).toBe(false);
    expect(result.mean.traditionalBindingApplied).toBe(false);
    expect(result.mean.anatomicalInterpretationAllowed).toBe(false);
  });

  it('preserves negative eye tilt when outer corners have smaller canonical Y', () => {
    const result = computeEyeOuterCornerTiltFR208({
      coordinateFrame: 'canonical_aligned_right_handed_metric_xy',
      leftEye: {
        innerCorner: { x: 0.42, y: 0.40 },
        outerCorner: { x: 0.30, y: 0.36 },
      },
      rightEye: {
        innerCorner: { x: 0.58, y: 0.40 },
        outerCorner: { x: 0.70, y: 0.36 },
      },
      sourceObservationRefs: refs,
    });

    expect(result.left.value).toBeLessThan(0);
    expect(result.right.value).toBeLessThan(0);
    expect(result.mean.value).toBeLessThan(0);
  });

  it('computes eyebrow span, arch amplitude, and explicit lateral-endpoint tilt', () => {
    const result = computeEyebrowVisibleCurveFR208({
      coordinateFrame: 'canonical_aligned_right_handed_metric_xy',
      medialEndpoint: { x: 0.46, y: 0.30 },
      lateralEndpoint: { x: 0.28, y: 0.33 },
      orderedVisibleCurve: [
        { x: 0.46, y: 0.30 },
        { x: 0.40, y: 0.40 },
        { x: 0.34, y: 0.43 },
        { x: 0.28, y: 0.33 },
      ],
      visibleFaceLeft: { x: 0.20, y: 0.00 },
      visibleFaceRight: { x: 0.80, y: 0.00 },
      sourceObservationRefs: refs,
    });

    expect(result.spanToFaceWidth.value).toBeCloseTo(0.3, 8);
    expect(result.spanToFaceWidth.value).toBeLessThan(1);
    expect(result.archAmplitudeToSpan.value).toBeGreaterThan(0);
    expect(result.lateralEndpointTilt.value).toBeGreaterThan(0);
    expect(result.spanToFaceWidth.classificationApplied).toBe(false);
  });

  it('computes mouth-corner elevation relative to an explicit visible mouth center', () => {
    const result = computeMouthCornerElevationFR208({
      coordinateFrame: 'canonical_aligned_right_handed_metric_xy',
      leftCorner: { x: 0.40, y: 0.62 },
      rightCorner: { x: 0.60, y: 0.62 },
      visibleMouthCenter: { x: 0.50, y: 0.60 },
      sourceObservationRefs: refs,
    });

    expect(result.left.value).toBeCloseTo(0.1, 8);
    expect(result.right.value).toBeCloseTo(0.1, 8);
    expect(result.mean.value).toBeCloseTo(0.1, 8);
  });

  it('computes visible midface and lower-face width ratios without anatomy labels', () => {
    const base = {
      coordinateFrame: 'canonical_aligned_right_handed_metric_xy' as const,
      visibleFaceLeft: { x: 0.20, y: 0.00 },
      visibleFaceRight: { x: 0.80, y: 0.00 },
      sourceObservationRefs: refs,
    };

    const midface = computeVisibleMidfaceWidthRatioFR208({
      ...base,
      regionLeft: { x: 0.25, y: 0.45 },
      regionRight: { x: 0.75, y: 0.45 },
    });
    const lower = computeVisibleLowerFaceWidthRatioFR208({
      ...base,
      regionLeft: { x: 0.30, y: -0.40 },
      regionRight: { x: 0.70, y: -0.40 },
    });

    expect(midface.metric.value).toBeCloseTo(5 / 6, 8);
    expect(lower.metric.value).toBeCloseTo(2 / 3, 8);
    expect(midface.metric.metricRef).toBe(
      'neutral.midface.visible_width_to_face_width_ratio@0.1.0',
    );
    expect(lower.metric.metricRef).toBe(
      'neutral.lower_face.visible_width_to_face_width_ratio@0.1.0',
    );
    expect(midface.metric.anatomicalInterpretationAllowed).toBe(false);
    expect(lower.metric.anatomicalInterpretationAllowed).toBe(false);
  });

  it('fails closed on missing provenance, degenerate geometry, and invalid width nesting', () => {
    expect(() => computeEyeOuterCornerTiltFR208({
      coordinateFrame: 'canonical_aligned_right_handed_metric_xy',
      leftEye: {
        innerCorner: { x: 0.4, y: 0.4 },
        outerCorner: { x: 0.4, y: 0.4 },
      },
      rightEye: {
        innerCorner: { x: 0.6, y: 0.4 },
        outerCorner: { x: 0.7, y: 0.4 },
      },
      sourceObservationRefs: refs,
    })).toThrow(/horizontal span must be positive/);

    expect(() => computeMouthCornerElevationFR208({
      coordinateFrame: 'canonical_aligned_right_handed_metric_xy',
      leftCorner: { x: 0.5, y: 0.6 },
      rightCorner: { x: 0.5, y: 0.6 },
      visibleMouthCenter: { x: 0.5, y: 0.61 },
      sourceObservationRefs: refs,
    })).toThrow(/horizontal span must be positive/);

    expect(() => computeVisibleMidfaceWidthRatioFR208({
      coordinateFrame: 'canonical_aligned_right_handed_metric_xy',
      regionLeft: { x: 0.1, y: 0.4 },
      regionRight: { x: 0.9, y: 0.4 },
      visibleFaceLeft: { x: 0.2, y: 0.4 },
      visibleFaceRight: { x: 0.8, y: 0.4 },
      sourceObservationRefs: refs,
    })).toThrow(/endpoints must lie inside/);

    expect(() => computeVisibleLowerFaceWidthRatioFR208({
      coordinateFrame: 'canonical_aligned_right_handed_metric_xy',
      regionLeft: { x: 0.3, y: 0.7 },
      regionRight: { x: 0.7, y: 0.7 },
      visibleFaceLeft: { x: 0.2, y: 0.4 },
      visibleFaceRight: { x: 0.8, y: 0.4 },
      sourceObservationRefs: [],
    })).toThrow(/sourceObservationRefs must be non-empty/);

    expect(() => computeEyebrowVisibleCurveFR208({
      coordinateFrame: 'canonical_aligned_right_handed_metric_xy',
      medialEndpoint: { x: 0.45, y: 0.3 },
      lateralEndpoint: { x: 0.3, y: 0.3 },
      orderedVisibleCurve: [
        { x: 0.45, y: 0.3 },
        { x: 0.40, y: 0.25 },
        { x: 0.40, y: 0.25 },
      ],
      visibleFaceLeft: { x: 0.2, y: 0.4 },
      visibleFaceRight: { x: 0.8, y: 0.4 },
      sourceObservationRefs: refs,
    })).toThrow(/points must be unique/);
  });

  it('rejects an unreviewed coordinate frame', () => {
    expect(() => computeEyeOuterCornerTiltFR208({
      coordinateFrame: 'canonical_aligned_metric_xy' as never,
      leftEye: {
        innerCorner: { x: 0.42, y: 0.40 },
        outerCorner: { x: 0.30, y: 0.44 },
      },
      rightEye: {
        innerCorner: { x: 0.58, y: 0.40 },
        outerCorner: { x: 0.70, y: 0.44 },
      },
      sourceObservationRefs: refs,
    })).toThrow(/canonical_aligned_right_handed_metric_xy/);
  });
});
