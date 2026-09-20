import { describe, expect, it } from 'vitest';
import type { FE001PreviewObservableEngineSnapshot } from './preview-observable-engine-fe001.js';
import type { FE002PreviewEngineRun } from './preview-face-engine-runtime-fe002.js';
import {
  assertConsumerSafePreviewOutputFE003,
  projectConsumerSafePreviewOutputFE003,
  type FE003ConsumerSafePreviewOutput,
} from './consumer-safe-preview-output-fe003.js';

function snapshot(): FE001PreviewObservableEngineSnapshot {
  return {
    schemaVersion: 'fe001-preview-observable-engine-snapshot-v1',
    artifactVersion: '0.1.0',
    contractVersion: 'FE001-PREVIEW-OBSERVABLE-ENGINE-SNAPSHOT-v1',
    engineState: 'preview_observable_only',
    source: {
      providerRunRef: 'fe003:test',
      canonicalAssetDigest: `sha256:${'a'.repeat(64)}`,
      metricGeometrySchemaVersion: 'fr77-governed-metric-geometry-candidate-v1',
      lipsGeometrySchemaVersion: 'fr79-pose-normalized-lips-geometry-v1',
      sameProviderRunVerified: true,
      sameCanonicalAssetDigestVerified: true,
    },
    regions: {
      eyePair: {
        neutralAxes: {
          axes: {
            relativeHorizontalSpan: {
              sourceMetricRef: 'neutral.eye.span@0.1.0', value: 0.3, unit: 'ratio',
            },
            geometricVerticalToHorizontalRatio: {
              sourceMetricRef: 'neutral.eye.aspect@0.1.0', value: 0.4, unit: 'ratio',
            },
            centroidSeparation: {
              sourceMetricRef: 'neutral.eye.separation@0.1.0', value: 0.5, unit: 'ratio',
            },
            closedCycleTurningAngle: {
              sourceMetricRef: 'neutral.eye.turn@0.1.0', value: 0.6, unit: 'radian',
            },
            outerCornerTilt: {
              axisKey: 'outer_corner_tilt',
              status: 'unavailable',
              reason: 'eye_cycle_extrema_ambiguous',
              fallbackInvented: false,
            },
          },
        },
        asymmetry: {
          axes: {
            horizontalSpanRelativeDifference: {
              metricRef: 'neutral.eye.asym.span@0.1.0', value: 0.01, unit: 'ratio',
            },
            geometricYToXRatioAbsoluteDifference: {
              metricRef: 'neutral.eye.asym.aspect@0.1.0', value: 0.02, unit: 'ratio',
            },
            meanTurningAngleAbsoluteDifference: {
              metricRef: 'neutral.eye.asym.turn@0.1.0', value: 0.03, unit: 'radian',
            },
          },
        },
      },
      cheekMidFace: {
        visibleWidth: {
          status: 'available',
          metric: { metricRef: 'neutral.midface.width@0.1.0', value: 0.8, unit: 'ratio' },
        },
        visibleContourProminence: {
          status: 'available',
          metric: { metricRef: 'neutral.midface.prominence@0.1.0', value: 0.04, unit: 'ratio' },
        },
      },
      mouthLips: {
        visibleCornerOrientation: {
          status: 'available',
          metric: { metricRef: 'neutral.mouth.corner@0.1.0', value: 0.05, unit: 'ratio' },
        },
        visibleOutlineAngularity: {
          metric: { metricRef: 'neutral.mouth.angularity@0.1.0', value: 23, unit: 'degree' },
        },
      },
      chinLowerFace: {
        visibleWidth: {
          status: 'available',
          metric: { metricRef: 'neutral.lower.width@0.1.0', value: 0.7, unit: 'ratio' },
        },
        visibleContour: {
          status: 'unavailable',
          reason: 'lower_face_contour_contains_fewer_than_three_points',
          fallbackInvented: false,
        },
      },
    } as unknown as FE001PreviewObservableEngineSnapshot['regions'],
    availability: {
      state: 'partial',
      unavailableRefs: [
        'eye_pair.outer_corner_tilt',
        'chin_lower_face.visible_contour',
      ],
      fallbackInvented: false,
    },
    authorityBoundary: {
      consumesUpstreamAuthorityOnly: true,
      performsResearchDecision: false,
      performsValidationDecision: false,
      anatomicalInferenceAllowed: false,
      thresholdOrClassifierAllowed: false,
      traditionalInterpretationAllowed: false,
      physiognomyClaimGenerationAllowed: false,
      fortuneClaimGenerationAllowed: false,
      productionActivated: false,
      commerceActivated: false,
    },
  };
}

function run(): FE002PreviewEngineRun {
  return {
    schemaVersion: 'fe002-preview-engine-run-v1',
    artifactVersion: '0.1.0',
    contractVersion: 'FE002-IMAGE-TO-PREVIEW-ENGINE-RUNTIME-v1',
    engineState: 'preview_runtime_only',
    providerRunRef: 'fe003:test',
    canonicalAssetDigest: `sha256:${'a'.repeat(64)}`,
    stages: {
      metricGeometry: {
        schemaVersion: 'fr77-governed-metric-geometry-candidate-v1',
        artifactVersion: '0.1.0',
      },
      metricLipsSurface: {
        schemaVersion: 'fr78-governed-metric-lips-surface-v1',
        artifactVersion: '0.1.0',
      },
      poseNormalizedLips: {
        schemaVersion: 'fr79-pose-normalized-lips-geometry-v1',
        artifactVersion: '0.1.0',
      },
      observableSnapshot: {
        schemaVersion: 'fe001-preview-observable-engine-snapshot-v1',
        artifactVersion: '0.1.0',
      },
    },
    snapshot: snapshot(),
    persistence: {
      rawImagePersisted: false,
      rawProviderResponsePersisted: false,
      rawProviderDepthPersisted: false,
      metricGeometryPersisted: false,
      metricLipsSurfacePersisted: false,
      poseNormalizedLipsGeometryPersisted: false,
      biometricEmbeddingPersisted: false,
    },
    authorityBoundary: {
      consumesUpstreamAuthorityOnly: true,
      performsResearchDecision: false,
      performsValidationDecision: false,
      traditionalInterpretationAllowed: false,
      claimGenerationAllowed: false,
      productionActivated: false,
      commerceActivated: false,
    },
  };
}

describe('FE003 consumer-safe preview output', () => {
  it('projects neutral scalar metrics without contour/landmark geometry', () => {
    const output = projectConsumerSafePreviewOutputFE003(run());

    expect(output.metrics).toHaveLength(12);
    expect(output.metrics.every((entry) => Number.isFinite(entry.value))).toBe(true);
    expect(output.metrics.map((entry) => entry.metricRef)).toEqual([
      'neutral.eye.aspect@0.1.0',
      'neutral.eye.asym.aspect@0.1.0',
      'neutral.eye.asym.span@0.1.0',
      'neutral.eye.asym.turn@0.1.0',
      'neutral.eye.separation@0.1.0',
      'neutral.eye.span@0.1.0',
      'neutral.eye.turn@0.1.0',
      'neutral.midface.prominence@0.1.0',
      'neutral.midface.width@0.1.0',
      'neutral.mouth.angularity@0.1.0',
      'neutral.mouth.corner@0.1.0',
      'neutral.lower.width@0.1.0',
    ]);
    expect(JSON.stringify(output)).not.toMatch(/"points"|"landmarks"|"contours"/u);
  });

  it('preserves fail-closed availability by region', () => {
    const output = projectConsumerSafePreviewOutputFE003(run());
    expect(output.regions).toEqual([
      {
        regionKey: 'eye_pair',
        state: 'partial',
        unavailableSurfaces: ['eye_pair.outer_corner_tilt'],
      },
      {
        regionKey: 'cheek_mid_face',
        state: 'available',
        unavailableSurfaces: [],
      },
      {
        regionKey: 'mouth_lips',
        state: 'available',
        unavailableSurfaces: [],
      },
      {
        regionKey: 'chin_lower_face',
        state: 'partial',
        unavailableSurfaces: ['chin_lower_face.visible_contour'],
      },
    ]);
  });

  it('rejects duplicate metric refs', () => {
    const output = projectConsumerSafePreviewOutputFE003(run());
    const forged = {
      ...output,
      metrics: [...output.metrics, output.metrics[0]!],
    } as FE003ConsumerSafePreviewOutput;
    expect(() => assertConsumerSafePreviewOutputFE003(forged))
      .toThrow(/duplicate metric refs/u);
  });

  it('rejects data exposure widening', () => {
    const output = projectConsumerSafePreviewOutputFE003(run());
    const forged = {
      ...output,
      dataBoundary: {
        ...output.dataBoundary,
        contourPointsExposed: true,
      },
    } as unknown as FE003ConsumerSafePreviewOutput;
    expect(() => assertConsumerSafePreviewOutputFE003(forged))
      .toThrow(/data boundary widened/u);
  });

  it('rejects semantic authority widening', () => {
    const output = projectConsumerSafePreviewOutputFE003(run());
    const forged = {
      ...output,
      authorityBoundary: {
        ...output.authorityBoundary,
        traditionalInterpretationIssued: true,
      },
    } as unknown as FE003ConsumerSafePreviewOutput;
    expect(() => assertConsumerSafePreviewOutputFE003(forged))
      .toThrow(/authority widened/u);
  });
});
