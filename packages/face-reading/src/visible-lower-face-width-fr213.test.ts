import { describe, expect, it } from 'vitest';
import type { GovernedMetricGeometryCandidateFR77V1 } from './governed-metric-geometry-runtime-fr77.js';
import type { PoseNormalizedLipsGeometryFR79V1 } from './pose-normalized-lips-geometry-fr79.js';
import { computeVisibleLowerFaceWidthRatioFR208 } from './cross-face-neutral-observable-primitives-fr208.js';
import {
  assertVisibleLowerFaceWidthFR213,
  computeVisibleLowerFaceWidthFR213,
  deriveVisibleLowerFaceWidthInputFR213,
  type FR213VisibleLowerFaceWidthResult,
} from './visible-lower-face-width-fr213.js';

describe('FR213 visible lower-face width', () => {
  it('measures the visible face-oval envelope at or below the visible mouth line', () => {
    const derived = deriveVisibleLowerFaceWidthInputFR213({
      faceOvalPoints: [
        { x: -5, y: 3 },
        { x: 5, y: 3 },
        { x: -4, y: 1 },
        { x: 4, y: 1 },
        { x: -3, y: -1 },
        { x: 3, y: -1 },
        { x: -1, y: -3 },
        { x: 1, y: -3 },
      ],
      lipsUnionPoints: [
        { x: -2, y: 1 }, { x: -1, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 },
      ],
      sourceObservationRefs: ['fr213:test:oval', 'fr213:test:lips'],
    });

    expect(derived.status).toBe('available');
    if (derived.status !== 'available') return;
    expect(derived.mouthLineY).toBe(1);
    expect(derived.lowerFacePointCount).toBe(6);

    const result = computeVisibleLowerFaceWidthRatioFR208(derived.ratioInput);
    expect(result.metric.value).toBeCloseTo(0.8, 8);
    expect(result.metric.metricRef).toBe('neutral.lower_face.visible_width_to_face_width_ratio@0.1.0');
    expect(result.metric.anatomicalInterpretationAllowed).toBe(false);
  });

  it('returns unavailable when fewer than two face-oval points lie below the mouth line', () => {
    expect(deriveVisibleLowerFaceWidthInputFR213({
      faceOvalPoints: [
        { x: -5, y: 3 }, { x: 5, y: 3 }, { x: -4, y: 2 }, { x: 0, y: 0 },
      ],
      lipsUnionPoints: [
        { x: -2, y: 1 }, { x: -1, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 },
      ],
      sourceObservationRefs: ['fr213:test:insufficient'],
    })).toEqual({
      status: 'unavailable',
      reason: 'lower_face_contour_contains_fewer_than_two_points',
      fallbackInvented: false,
    });
  });

  it('returns unavailable when the selected lower-face contour has no horizontal width', () => {
    expect(deriveVisibleLowerFaceWidthInputFR213({
      faceOvalPoints: [
        { x: -5, y: 3 }, { x: 5, y: 3 }, { x: 0, y: 0 }, { x: 0, y: -2 },
      ],
      lipsUnionPoints: [
        { x: -2, y: 1 }, { x: -1, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 },
      ],
      sourceObservationRefs: ['fr213:test:collapsed-lower'],
    })).toEqual({
      status: 'unavailable',
      reason: 'lower_face_horizontal_envelope_collapsed',
      fallbackInvented: false,
    });
  });

  it('rejects forged governed geometry instead of manufacturing lower-face width', () => {
    expect(() => computeVisibleLowerFaceWidthFR213(
      {} as GovernedMetricGeometryCandidateFR77V1,
      {} as PoseNormalizedLipsGeometryFR79V1,
    )).toThrow(/not issued by the active FR-77 runtime boundary/u);
  });

  it('rejects any attempted mandibular or traditional authority widening', () => {
    const forged = {
      schemaVersion: 'fr213-visible-lower-face-width-v1',
      artifactVersion: '0.1.0',
      contractVersion: 'FR213-VISIBLE-LOWER-FACE-WIDTH-v1',
      authorityState: 'observable_lower_face_contour_candidate_only',
      status: 'unavailable',
      reason: 'lower_face_contour_contains_fewer_than_two_points',
      fallbackInvented: false,
      source: {
        fr77ProviderRunRef: 'fr213:test',
        fr77CanonicalAssetDigest: `sha256:${'a'.repeat(64)}`,
        fr79ProjectionRuleRef: 'fr79:canonical-metric-xy-orthographic@0.1.0',
        sameProviderRunVerified: true,
        sameCanonicalAssetDigestVerified: true,
        faceOvalTopologySource: 'fr211_inherited_fr200_recorded_mediapipe_face_oval_topology',
        providerIndicesExposedInOutput: false,
      },
      authorityBoundary: {
        observableMorphologyOnly: true,
        mandibularBoneBoundaryIssued: false,
        gonionAnatomicalMappingIssued: false,
        jawBoneWidthClaimIssued: true,
        skeletalCalibrationIssued: false,
        classifierIssued: false,
        thresholdIssued: false,
        traditionalBindingIssued: false,
        productionActivated: false,
        commerceActivated: false,
      },
    } as unknown as FR213VisibleLowerFaceWidthResult;

    expect(() => assertVisibleLowerFaceWidthFR213(forged)).toThrow(/authority widened/u);
  });
});
