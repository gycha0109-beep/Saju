import { describe, expect, it } from 'vitest';
import type { GovernedMetricGeometryCandidateFR77V1 } from './governed-metric-geometry-runtime-fr77.js';
import type { PoseNormalizedLipsGeometryFR79V1 } from './pose-normalized-lips-geometry-fr79.js';
import {
  assertPreviewObservableEngineSnapshotFE001,
  runPreviewObservableEngineFE001,
  type FE001PreviewObservableEngineSnapshot,
} from './preview-observable-engine-fe001.js';

function forgedSnapshot(): FE001PreviewObservableEngineSnapshot {
  return {
    schemaVersion: 'fe001-preview-observable-engine-snapshot-v1',
    artifactVersion: '0.1.0',
    contractVersion: 'FE001-PREVIEW-OBSERVABLE-ENGINE-SNAPSHOT-v1',
    engineState: 'preview_observable_only',
    source: {
      providerRunRef: 'fe001:test',
      canonicalAssetDigest: `sha256:${'a'.repeat(64)}`,
      metricGeometrySchemaVersion: 'fr77-governed-metric-geometry-candidate-v1',
      lipsGeometrySchemaVersion: 'fr79-pose-normalized-lips-geometry-v1',
      sameProviderRunVerified: true,
      sameCanonicalAssetDigestVerified: true,
    },
    regions: {
      eyePair: {} as FE001PreviewObservableEngineSnapshot['regions']['eyePair'],
      cheekMidFace: {} as FE001PreviewObservableEngineSnapshot['regions']['cheekMidFace'],
      mouthLips: {} as FE001PreviewObservableEngineSnapshot['regions']['mouthLips'],
      chinLowerFace: {} as FE001PreviewObservableEngineSnapshot['regions']['chinLowerFace'],
    },
    availability: {
      state: 'complete',
      unavailableRefs: [],
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

describe('FE001 preview observable engine snapshot', () => {
  it('rejects forged upstream geometry at the engine boundary', () => {
    expect(() => runPreviewObservableEngineFE001(
      {} as GovernedMetricGeometryCandidateFR77V1,
      {} as PoseNormalizedLipsGeometryFR79V1,
    )).toThrow(/not issued by the active FR-77 runtime boundary/u);
  });

  it('accepts a structurally consistent preview-only snapshot contract', () => {
    expect(() => assertPreviewObservableEngineSnapshotFE001(forgedSnapshot()))
      .not.toThrow();
  });

  it('rejects availability summary drift', () => {
    const forged = {
      ...forgedSnapshot(),
      availability: {
        state: 'complete',
        unavailableRefs: ['mouth_lips.visible_corner_orientation'],
        fallbackInvented: false,
      },
    } as FE001PreviewObservableEngineSnapshot;

    expect(() => assertPreviewObservableEngineSnapshotFE001(forged))
      .toThrow(/availability summary drift/u);
  });

  it('rejects duplicate unavailable refs', () => {
    const forged = {
      ...forgedSnapshot(),
      availability: {
        state: 'partial',
        unavailableRefs: [
          'chin_lower_face.visible_contour',
          'chin_lower_face.visible_contour',
        ],
        fallbackInvented: false,
      },
    } as FE001PreviewObservableEngineSnapshot;

    expect(() => assertPreviewObservableEngineSnapshotFE001(forged))
      .toThrow(/availability summary drift/u);
  });

  it('rejects research, traditional, Production, or Commerce authority widening', () => {
    const forged = {
      ...forgedSnapshot(),
      authorityBoundary: {
        ...forgedSnapshot().authorityBoundary,
        performsResearchDecision: true,
      },
    } as unknown as FE001PreviewObservableEngineSnapshot;

    expect(() => assertPreviewObservableEngineSnapshotFE001(forged))
      .toThrow(/authority widened/u);
  });
});
