import { describe, expect, it } from 'vitest';
import type { MediaPipeScreenToMetricReimplementationParityFR76V1 } from './mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import {
  assertPreviewFaceEngineRunFE002,
  runPreviewFaceEngineFE002,
  type FE002PreviewEngineRun,
} from './preview-face-engine-runtime-fe002.js';
import type { FE001PreviewObservableEngineSnapshot } from './preview-observable-engine-fe001.js';

function snapshotReceipt(): FE001PreviewObservableEngineSnapshot {
  return {
    schemaVersion: 'fe001-preview-observable-engine-snapshot-v1',
    artifactVersion: '0.1.0',
    contractVersion: 'FE001-PREVIEW-OBSERVABLE-ENGINE-SNAPSHOT-v1',
    engineState: 'preview_observable_only',
    source: {
      providerRunRef: 'fe002:test',
      canonicalAssetDigest: `sha256:${'a'.repeat(64)}`,
      metricGeometrySchemaVersion: 'fr77-governed-metric-geometry-candidate-v1',
      lipsGeometrySchemaVersion: 'fr79-pose-normalized-lips-geometry-v1',
      sameProviderRunVerified: true,
      sameCanonicalAssetDigestVerified: true,
    },
    regions: {} as FE001PreviewObservableEngineSnapshot['regions'],
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

function runReceipt(): FE002PreviewEngineRun {
  return {
    schemaVersion: 'fe002-preview-engine-run-v1',
    artifactVersion: '0.1.0',
    contractVersion: 'FE002-IMAGE-TO-PREVIEW-ENGINE-RUNTIME-v1',
    engineState: 'preview_runtime_only',
    providerRunRef: 'fe002:test',
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
    snapshot: snapshotReceipt(),
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

describe('FE002 image-to-preview engine runtime', () => {
  it('accepts a bounded preview runtime receipt', () => {
    expect(() => assertPreviewFaceEngineRunFE002(runReceipt())).not.toThrow();
  });

  it('rejects snapshot/run identity drift', () => {
    const forged = {
      ...runReceipt(),
      providerRunRef: 'fe002:other',
    } as FE002PreviewEngineRun;
    expect(() => assertPreviewFaceEngineRunFE002(forged))
      .toThrow(/snapshot identity/u);
  });

  it('rejects persistence widening', () => {
    const forged = {
      ...runReceipt(),
      persistence: {
        ...runReceipt().persistence,
        rawImagePersisted: true,
      },
    } as unknown as FE002PreviewEngineRun;
    expect(() => assertPreviewFaceEngineRunFE002(forged))
      .toThrow(/persistence boundary widened/u);
  });

  it('rejects research or semantic authority widening', () => {
    const forged = {
      ...runReceipt(),
      authorityBoundary: {
        ...runReceipt().authorityBoundary,
        performsResearchDecision: true,
      },
    } as unknown as FE002PreviewEngineRun;
    expect(() => assertPreviewFaceEngineRunFE002(forged))
      .toThrow(/authority widened/u);
  });

  it('fails before provider execution for an invalid FR77 request', async () => {
    const invalidRequest = {
      schemaVersion: 'fr77-governed-metric-geometry-runtime-request-v1',
      providerRunRef: 'contains whitespace',
      canonicalAssetDigest: `sha256:${'a'.repeat(64)}`,
      image: {},
      frameWidth: 100,
      frameHeight: 100,
      geometryMetadataPbtxt: 'not reached',
    } as const;

    await expect(runPreviewFaceEngineFE002(
      invalidRequest,
      {} as MediaPipeScreenToMetricReimplementationParityFR76V1,
    )).rejects.toThrow(/providerRunRef/u);
  });
});
