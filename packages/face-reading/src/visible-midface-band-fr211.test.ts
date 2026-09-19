import { describe, expect, it } from 'vitest';
import type { GovernedMetricGeometryCandidateFR77V1 } from './governed-metric-geometry-runtime-fr77.js';
import type { PoseNormalizedLipsGeometryFR79V1 } from './pose-normalized-lips-geometry-fr79.js';
import { computeVisibleMidfaceWidthRatioFR208 } from './cross-face-neutral-observable-primitives-fr208.js';
import {
  FR211_FACE_OVAL_TOPOLOGY_VERTICES,
  assertVisibleMidfaceBandFR211,
  computeVisibleMidfaceBandFR211,
  deriveVisibleMidfaceBandFromPointSetsFR211,
  type FR211VisibleMidfaceBandResult,
} from './visible-midface-band-fr211.js';

describe('FR211 visible midface band', () => {
  it('derives a visible contour band between the eye line and halfway toward the mouth line', () => {
    const derived = deriveVisibleMidfaceBandFromPointSetsFR211({
      faceOvalPoints: [
        { x: -5, y: 3 },
        { x: 5, y: 3 },
        { x: -4, y: 1.5 },
        { x: 4, y: 1.5 },
        { x: -3, y: 0 },
        { x: 3, y: 0 },
      ],
      eyeCyclePoints: [
        { x: -2, y: 2 }, { x: -1, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 },
      ],
      lipsUnionPoints: [
        { x: -1, y: 0 }, { x: -0.5, y: 0 }, { x: 0.5, y: 0 }, { x: 1, y: 0 },
      ],
      sourceObservationRefs: ['fr211:test:oval', 'fr211:test:eyes', 'fr211:test:lips'],
    });

    expect(derived.status).toBe('available');
    if (derived.status !== 'available') return;
    expect(derived.bandLowY).toBe(1);
    expect(derived.bandHighY).toBe(2);
    expect(derived.bandPointCount).toBe(2);

    const result = computeVisibleMidfaceWidthRatioFR208(derived.ratioInput);
    expect(result.metric.value).toBeCloseTo(0.8, 8);
    expect(result.metric.metricRef).toBe('neutral.midface.visible_width_to_face_width_ratio@0.1.0');
    expect(result.metric.anatomicalInterpretationAllowed).toBe(false);
    expect(result.metric.classificationApplied).toBe(false);
  });

  it('returns unavailable rather than inventing a band when eye and mouth vertical references collapse', () => {
    expect(deriveVisibleMidfaceBandFromPointSetsFR211({
      faceOvalPoints: [
        { x: -5, y: 2 }, { x: 5, y: 2 }, { x: -4, y: 1 }, { x: 4, y: 1 },
      ],
      eyeCyclePoints: [
        { x: -2, y: 1 }, { x: -1, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 },
      ],
      lipsUnionPoints: [
        { x: -1, y: 1 }, { x: -0.5, y: 1 }, { x: 0.5, y: 1 }, { x: 1, y: 1 },
      ],
      sourceObservationRefs: ['fr211:test:collapse'],
    })).toEqual({
      status: 'unavailable',
      reason: 'eye_and_mouth_vertical_references_collapsed',
      fallbackInvented: false,
    });
  });

  it('returns unavailable when the selected band has no usable horizontal contour envelope', () => {
    expect(deriveVisibleMidfaceBandFromPointSetsFR211({
      faceOvalPoints: [
        { x: -5, y: 3 }, { x: 5, y: 3 }, { x: 0, y: 1.5 }, { x: 0, y: 1.2 },
      ],
      eyeCyclePoints: [
        { x: -2, y: 2 }, { x: -1, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 },
      ],
      lipsUnionPoints: [
        { x: -1, y: 0 }, { x: -0.5, y: 0 }, { x: 0.5, y: 0 }, { x: 1, y: 0 },
      ],
      sourceObservationRefs: ['fr211:test:collapsed-band'],
    })).toEqual({
      status: 'unavailable',
      reason: 'midface_band_horizontal_envelope_collapsed',
      fallbackInvented: false,
    });
  });

  it('keeps the inherited FACE_OVAL selector fixed without treating it as anatomy', () => {
    expect(FR211_FACE_OVAL_TOPOLOGY_VERTICES).toHaveLength(36);
    expect(FR211_FACE_OVAL_TOPOLOGY_VERTICES).toContain(234);
    expect(FR211_FACE_OVAL_TOPOLOGY_VERTICES).toContain(454);
  });

  it('rejects forged governed sources before any visible-midface output', () => {
    expect(() => computeVisibleMidfaceBandFR211(
      {} as GovernedMetricGeometryCandidateFR77V1,
      {} as PoseNormalizedLipsGeometryFR79V1,
    )).toThrow(/not issued by the active FR-77 runtime boundary/u);
  });

  it('rejects any result that attempts to authorize zygion or skeletal calibration', () => {
    const forged = {
      schemaVersion: 'fr211-visible-midface-band-v1',
      artifactVersion: '0.1.0',
      contractVersion: 'FR211-VISIBLE-MIDFACE-BAND-v1',
      authorityState: 'observable_midface_contour_candidate_only',
      status: 'unavailable',
      reason: 'midface_band_contains_fewer_than_two_contour_points',
      fallbackInvented: false,
      source: {
        fr77ProviderRunRef: 'fr211:test',
        fr77CanonicalAssetDigest: `sha256:${'a'.repeat(64)}`,
        fr79ProjectionRuleRef: 'fr79:canonical-metric-xy-orthographic@0.1.0',
        sameProviderRunVerified: true,
        sameCanonicalAssetDigestVerified: true,
        faceOvalTopologySource: 'fr200_recorded_mediapipe_face_oval_topology',
        faceOvalTopologyReleaseExactForInstalledPackage: false,
        providerIndicesExposedInOutput: false,
      },
      authorityBoundary: {
        observableMorphologyOnly: true,
        zygionClaimIssued: true,
        bizygomaticBreadthClaimIssued: false,
        trueZygomaticBoneWidthClaimIssued: false,
        mediaPipe234454AnatomyBindingIssued: false,
        fr204CalibrationApplied: false,
        skeletalCalibrationIssued: false,
        classifierIssued: false,
        thresholdIssued: false,
        traditionalBindingIssued: false,
        productionActivated: false,
        commerceActivated: false,
      },
    } as unknown as FR211VisibleMidfaceBandResult;

    expect(() => assertVisibleMidfaceBandFR211(forged)).toThrow(/authority widened/u);
  });
});
