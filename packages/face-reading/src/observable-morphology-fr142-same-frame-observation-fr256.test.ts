import { describe, expect, it } from 'vitest';
import {
  FR256_CONTRACT_VERSION,
  FR256_METRIC_REFS,
  FR256_NEXT_FRONTIER,
  computeMouthCandidateObservationFromMetricGeometryFR256,
  materializeMouthCandidateObservationDryRunCoordinatorFR256,
} from './observable-morphology-fr142-same-frame-observation-fr256.js';

function metricGeometry() {
  return Object.freeze(Array.from({ length: 468 }, (_, index) => Object.freeze({
    x: index * 0.01,
    y: Math.sin(index * 0.37) + (index * 0.0001),
    z: Math.cos(index * 0.19) * 0.1,
  })));
}

describe('FR256 same-frame FR142 mouth candidate observation', () => {
  it('computes the exact three FR142 candidate refs as finite ratio observations', () => {
    const observation = computeMouthCandidateObservationFromMetricGeometryFR256({
      providerRunRef: 'provider:fr256:test:1',
      metricLandmarks: metricGeometry(),
    });

    expect(observation.schemaVersion)
      .toBe('fr256-mouth-candidate-observation-v1');
    expect(observation.metrics.map((entry) => entry.metricRef))
      .toEqual(FR256_METRIC_REFS);
    expect(observation.metrics.map((entry) => entry.unit))
      .toEqual(['ratio', 'ratio', 'ratio']);
    expect(observation.metrics.every((entry) => Number.isFinite(entry.value)))
      .toBe(true);
    expect(observation.sourceGeometry).toEqual({
      coordinateFrame: 'canonical_aligned_right_handed_metric_3d',
      geometryLandmarkCount: 468,
      lipsContourCount: 2,
      lipsContourPointCounts: [20, 20],
      poseNormalizedByCanonicalXYProjection: true,
    });
  });

  it('keeps empirical, semantic, registry, and production authority closed', () => {
    const observation = computeMouthCandidateObservationFromMetricGeometryFR256({
      providerRunRef: 'provider:fr256:test:2',
      metricLandmarks: metricGeometry(),
    });

    expect(observation.evidenceBoundary).toEqual({
      exactSameFrameBindingRequired: true,
      emittedOnlyAfterFR242QualityAcceptance: true,
      rawImagePersisted: false,
      rawImageDigestComputed: false,
      rawLandmarksPersisted: false,
      derivedGeometryPersisted: false,
      captureQualityConstructValidated: false,
      empiricalRepeatabilityEstablished: false,
      thresholdIssued: false,
      calibrationIssued: false,
      traditionalFangBindingIssued: false,
      registryAdmissionIssued: false,
      productionActivated: false,
      commerceActivated: false,
    });
  });

  it('fails closed when the lips contour geometry degenerates', () => {
    const degenerate = Object.freeze(Array.from(
      { length: 468 },
      () => Object.freeze({ x: 0, y: 0, z: 0 }),
    ));
    expect(() =>
      computeMouthCandidateObservationFromMetricGeometryFR256({
        providerRunRef: 'provider:fr256:test:degenerate',
        metricLandmarks: degenerate,
      }),
    ).toThrow(/positive length|positive RMS radius/u);
  });

  it('publishes a separate contract identity without mutating FR242 or FR251', () => {
    expect(FR256_CONTRACT_VERSION)
      .toBe('FR256-SAME-FRAME-FR142-MOUTH-CANDIDATE-OBSERVATION-v1');
    expect(FR256_NEXT_FRONTIER)
      .toBe(
        'wire_fr256_into_a_separate_operator_surface_then_collect_temporally_separated_real_repeat_capture_observations_for_fr142_candidates',
      );
    expect(typeof materializeMouthCandidateObservationDryRunCoordinatorFR256)
      .toBe('function');
  });
});
