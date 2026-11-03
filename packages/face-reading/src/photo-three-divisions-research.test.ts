import { describe, expect, it } from 'vitest';
import {
  analyzePhotoThreeDivisionsResearch,
  type FacePhotoObservation,
  type FacePhotoImageReferenceLabels,
} from './photo-three-divisions-research.js';

// Deliberately synthetic geometry, never image evidence or a source admission.
function observation(): FacePhotoObservation {
  return {
    schemaVersion: 'face-photo-observation-v1',
    provider: 'mediapipe-python',
    providerVersion: '0.10.35',
    width: 100,
    height: 200,
    faceLandmarks: [
      Array.from({ length: 478 }, (_, index) => ({
        x: 0.1 + (index % 13) / 20,
        y: 0.1 + index / 1000,
        z: 0,
      })),
    ],
    faceBlendshapes: [],
    facialTransformationMatrixes: [],
    hairline: {
      methodId: 'adaptive_skin_edge_texture_continuity',
      methodVersion: '0.4.0',
      state: 'visible_interface_candidate',
      candidateBoundaryExposed: true,
      boundaryPoints: [
        [10, 20],
        [20, 25],
      ],
      humanReviewed: false,
    },
  };
}

const labels: FacePhotoImageReferenceLabels = {
  assertionAuthority: 'human_label_assertion',
  visibleOnly: true,
  hairlineY: 20,
  browY: 70,
  nasalApexY: 110,
  lowerFaceY: 170,
};

describe('one-photo research observation and source-specific three-divisions report', () => {
  it('runs existing provider probes and retains numerical observations without inventing traditional anchors', () => {
    const result = analyzePhotoThreeDivisionsResearch(observation());
    expect(result.imageObservation.status).toBe('processed');
    expect(result.providerMeasurements?.eyebrowProviderComponents).toHaveLength(2);
    expect(result.providerMeasurements?.faceOvalInferior.pixelY).toBeGreaterThan(0);
    expect(result.hairline?.imagePixelYRange).toEqual([20, 25]);
    expect(result.anchors.every((anchor) => !anchor.governedReferenceAvailable)).toBe(true);
    expect(result.threeDivisions.lengths).toEqual({ upper: null, middle: null, lower: null });
    expect(result.methodology.ref).toBe('method.mayi.face_three_divisions.fr261@0.3.0');
  });

  it('calculates caller-labelled image gaps and ratios separately; never runs Shenxiang rules on Mayi labels', () => {
    const result = analyzePhotoThreeDivisionsResearch(observation(), labels);
    expect(result.imageLabelDiagnostics?.lengths).toEqual({ upper: 50, middle: 40, lower: 60 });
    expect(result.imageLabelDiagnostics?.relativeOrder?.normalizedShares).toEqual({
      upper: 1 / 3,
      middle: 40 / 150,
      lower: 0.4,
    });
    expect(result.rules).toHaveLength(5);
    expect(
      result.rules.every(
        (rule) => rule.status === 'not_executed' && rule.reason === 'methodology_mismatch',
      ),
    ).toBe(true);
    expect(result.semantic.claims).toEqual([]);
    expect(result.threeDivisions.normalizedShares).toBeNull();
    expect(Object.values(result.authorityBoundary).every((value) => value === false)).toBe(true);
  });

  it('preserves measurable partial gaps without filling a missing hairline', () => {
    const result = analyzePhotoThreeDivisionsResearch(observation(), {
      ...labels,
      hairlineY: null,
    });
    expect(result.imageLabelDiagnostics?.lengths).toEqual({ upper: null, middle: 40, lower: 60 });
    expect(result.imageLabelDiagnostics?.relativeOrder).toBeNull();
  });

  it.each([0, 2])('withholds the face operation for %i detected faces', (count) => {
    const input = observation();
    const result = analyzePhotoThreeDivisionsResearch(
      {
        ...input,
        faceLandmarks: Array.from({ length: count }, () => input.faceLandmarks[0]!),
        hairline: null,
      },
      labels,
    );
    expect(result.imageObservation.status).toBe('unavailable');
    expect(result.imageLabelDiagnostics).toBeNull();
    expect(result.providerMeasurements).toBeNull();
  });

  it('does not serialize raw landmarks, boundary points, image paths or image digests', () => {
    const result = JSON.stringify(analyzePhotoThreeDivisionsResearch(observation()));
    for (const key of [
      'faceLandmarks',
      'boundaryPoints',
      'sourcePath',
      'sourceCaptureDigest',
      'diagnosticBoundaryPoints',
    ])
      expect(result).not.toContain(`"${key}"`);
    expect(result).toContain('passage.mayi.fr261.contiguous_three_divisions');
  });

  it.each([NaN, Infinity, -1, 201])('rejects invalid labelled coordinates %s', (bad) => {
    expect(() =>
      analyzePhotoThreeDivisionsResearch(observation(), { ...labels, browY: bad }),
    ).toThrow();
  });

  it('rejects reversed lines instead of taking absolute distances', () => {
    expect(() =>
      analyzePhotoThreeDivisionsResearch(observation(), { ...labels, browY: 10 }),
    ).toThrow();
  });

  it('rejects re-labelled model versions and suppressed-state boundary leakage', () => {
    const input = observation();
    expect(() =>
      analyzePhotoThreeDivisionsResearch({ ...input, providerVersion: '1.2.0' } as never),
    ).toThrow();
    expect(() =>
      analyzePhotoThreeDivisionsResearch({
        ...input,
        hairline: { ...input.hairline!, state: 'partially_visible_or_occluded' },
      }),
    ).toThrow();
  });
});
