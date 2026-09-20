import { describe, expect, it } from 'vitest';
import type { MediaPipeScreenToMetricReimplementationParityFR76V1 } from './mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import type { FE001PreviewObservableEngineSnapshot } from './preview-observable-engine-fe001.js';
import type { FE002PreviewEngineRun } from './preview-face-engine-runtime-fe002.js';
import type { FE003ConsumerSafePreviewOutput } from './consumer-safe-preview-output-fe003.js';
import {
  assertConsumerPreviewEngineResultFE004,
  composeConsumerPreviewEngineResultFE004,
  runConsumerPreviewFaceEngineFE004,
  type FE004ConsumerPreviewEngineResult,
} from './consumer-preview-engine-facade-fe004.js';

const DIGEST = `sha256:${'a'.repeat(64)}`;

function snapshotReceipt(): FE001PreviewObservableEngineSnapshot {
  return {
    schemaVersion: 'fe001-preview-observable-engine-snapshot-v1',
    artifactVersion: '0.1.0',
    contractVersion: 'FE001-PREVIEW-OBSERVABLE-ENGINE-SNAPSHOT-v1',
    engineState: 'preview_observable_only',
    source: {
      providerRunRef: 'fe004:test',
      canonicalAssetDigest: DIGEST,
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

function internalRun(): FE002PreviewEngineRun {
  return {
    schemaVersion: 'fe002-preview-engine-run-v1',
    artifactVersion: '0.1.0',
    contractVersion: 'FE002-IMAGE-TO-PREVIEW-ENGINE-RUNTIME-v1',
    engineState: 'preview_runtime_only',
    providerRunRef: 'fe004:test',
    canonicalAssetDigest: DIGEST,
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

function output(): FE003ConsumerSafePreviewOutput {
  return {
    schemaVersion: 'fe003-consumer-safe-preview-output-v1',
    artifactVersion: '0.1.0',
    contractVersion: 'FE003-CONSUMER-SAFE-PREVIEW-OUTPUT-v1',
    engineState: 'preview_consumer_projection_only',
    providerRunRef: 'fe004:test',
    canonicalAssetDigest: DIGEST,
    metrics: [],
    regions: [
      { regionKey: 'eye_pair', state: 'available', unavailableSurfaces: [] },
      { regionKey: 'cheek_mid_face', state: 'available', unavailableSurfaces: [] },
      { regionKey: 'mouth_lips', state: 'available', unavailableSurfaces: [] },
      { regionKey: 'chin_lower_face', state: 'available', unavailableSurfaces: [] },
    ],
    dataBoundary: {
      rawLandmarksExposed: false,
      contourPointsExposed: false,
      providerVertexIndicesExposed: false,
      biometricEmbeddingExposed: false,
    },
    authorityBoundary: {
      consumesUpstreamAuthorityOnly: true,
      classificationIssued: false,
      scoreIssued: false,
      rankIssued: false,
      traditionalInterpretationIssued: false,
      physiognomyClaimIssued: false,
      fortuneClaimIssued: false,
      productionActivated: false,
      commerceActivated: false,
    },
  };
}

describe('FE004 one-call consumer preview engine facade', () => {
  it('composes bounded FE002/FE003 receipts without exposing internal geometry', () => {
    const result = composeConsumerPreviewEngineResultFE004(internalRun(), output());

    expect(result.providerRunRef).toBe('fe004:test');
    expect(result.output.schemaVersion).toBe('fe003-consumer-safe-preview-output-v1');
    expect(JSON.stringify(result)).not.toMatch(/"snapshot"|"stages"|"landmarks"|"contourPoints":true/u);
    expect(() => assertConsumerPreviewEngineResultFE004(result)).not.toThrow();
  });

  it('rejects FE002/FE003 identity mismatch', () => {
    const forgedOutput = {
      ...output(),
      providerRunRef: 'fe004:other',
    } as FE003ConsumerSafePreviewOutput;
    expect(() => composeConsumerPreviewEngineResultFE004(internalRun(), forgedOutput))
      .toThrow(/identity mismatch/u);
  });

  it('rejects consumer data exposure widening', () => {
    const result = composeConsumerPreviewEngineResultFE004(internalRun(), output());
    const forged = {
      ...result,
      dataBoundary: {
        ...result.dataBoundary,
        internalRuntimeSnapshotExposed: true,
      },
    } as unknown as FE004ConsumerPreviewEngineResult;
    expect(() => assertConsumerPreviewEngineResultFE004(forged))
      .toThrow(/data boundary widened/u);
  });

  it('rejects semantic authority widening', () => {
    const result = composeConsumerPreviewEngineResultFE004(internalRun(), output());
    const forged = {
      ...result,
      authorityBoundary: {
        ...result.authorityBoundary,
        physiognomyClaimIssued: true,
      },
    } as unknown as FE004ConsumerPreviewEngineResult;
    expect(() => assertConsumerPreviewEngineResultFE004(forged))
      .toThrow(/authority widened/u);
  });

  it('propagates upstream fail-closed request validation before provider execution', async () => {
    const invalidRequest = {
      schemaVersion: 'fr77-governed-metric-geometry-runtime-request-v1',
      providerRunRef: 'contains whitespace',
      canonicalAssetDigest: DIGEST,
      image: {},
      frameWidth: 100,
      frameHeight: 100,
      geometryMetadataPbtxt: 'not reached',
    } as const;

    await expect(runConsumerPreviewFaceEngineFE004(
      invalidRequest,
      {} as MediaPipeScreenToMetricReimplementationParityFR76V1,
    )).rejects.toThrow(/providerRunRef/u);
  });
});
