import type { MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 } from './mediapipe-face-landmarker-runtime-fr26.js';
import type { MediaPipeScreenToMetricReimplementationParityFR76V1 } from './mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import type { MediaPipeMetricGeometryRuntimeRequestFR77V1 } from './governed-metric-geometry-runtime-fr77.js';
import {
  assertPreviewFaceEngineRunFE002,
  runPreviewFaceEngineFE002,
  type FE002PreviewEngineRun,
} from './preview-face-engine-runtime-fe002.js';
import {
  assertConsumerSafePreviewOutputFE003,
  projectConsumerSafePreviewOutputFE003,
  type FE003ConsumerSafePreviewOutput,
} from './consumer-safe-preview-output-fe003.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FE004_CONTRACT_VERSION =
  'FE004-CONSUMER-PREVIEW-ENGINE-FACADE-v1' as const;

export interface FE004ConsumerPreviewEngineResult {
  readonly schemaVersion: 'fe004-consumer-preview-engine-result-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FE004_CONTRACT_VERSION;
  readonly engineState: 'preview_consumer_facade_only';
  readonly providerRunRef: string;
  readonly canonicalAssetDigest: string;
  readonly executionReceipt: {
    readonly internalRuntimeSchemaVersion: 'fe002-preview-engine-run-v1';
    readonly consumerProjectionSchemaVersion: 'fe003-consumer-safe-preview-output-v1';
    readonly failClosedUpstreamErrorsPropagated: true;
    readonly fallbackInvented: false;
  };
  readonly output: FE003ConsumerSafePreviewOutput;
  readonly dataBoundary: {
    readonly internalRuntimeSnapshotExposed: false;
    readonly internalGeometryStagesExposed: false;
    readonly rawLandmarksExposed: false;
    readonly contourPointsExposed: false;
    readonly providerVertexIndicesExposed: false;
    readonly biometricEmbeddingExposed: false;
  };
  readonly authorityBoundary: {
    readonly consumesUpstreamAuthorityOnly: true;
    readonly performsResearchDecision: false;
    readonly performsValidationDecision: false;
    readonly classificationIssued: false;
    readonly scoreIssued: false;
    readonly rankIssued: false;
    readonly traditionalInterpretationIssued: false;
    readonly physiognomyClaimIssued: false;
    readonly fortuneClaimIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
}

const DATA_BOUNDARY = Object.freeze({
  internalRuntimeSnapshotExposed: false as const,
  internalGeometryStagesExposed: false as const,
  rawLandmarksExposed: false as const,
  contourPointsExposed: false as const,
  providerVertexIndicesExposed: false as const,
  biometricEmbeddingExposed: false as const,
});

const AUTHORITY_BOUNDARY = Object.freeze({
  consumesUpstreamAuthorityOnly: true as const,
  performsResearchDecision: false as const,
  performsValidationDecision: false as const,
  classificationIssued: false as const,
  scoreIssued: false as const,
  rankIssued: false as const,
  traditionalInterpretationIssued: false as const,
  physiognomyClaimIssued: false as const,
  fortuneClaimIssued: false as const,
  productionActivated: false as const,
  commerceActivated: false as const,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FE-004 ${message}`);
}

export function composeConsumerPreviewEngineResultFE004(
  internalRun: FE002PreviewEngineRun,
  output: FE003ConsumerSafePreviewOutput,
): FE004ConsumerPreviewEngineResult {
  assertPreviewFaceEngineRunFE002(internalRun);
  assertConsumerSafePreviewOutputFE003(output);

  if (
    internalRun.providerRunRef !== output.providerRunRef ||
    internalRun.canonicalAssetDigest !== output.canonicalAssetDigest
  ) {
    fail('FE002/FE003 identity mismatch.');
  }

  const result: FE004ConsumerPreviewEngineResult = Object.freeze({
    schemaVersion: 'fe004-consumer-preview-engine-result-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FE004_CONTRACT_VERSION,
    engineState: 'preview_consumer_facade_only' as const,
    providerRunRef: output.providerRunRef,
    canonicalAssetDigest: output.canonicalAssetDigest,
    executionReceipt: Object.freeze({
      internalRuntimeSchemaVersion: internalRun.schemaVersion,
      consumerProjectionSchemaVersion: output.schemaVersion,
      failClosedUpstreamErrorsPropagated: true as const,
      fallbackInvented: false as const,
    }),
    output,
    dataBoundary: DATA_BOUNDARY,
    authorityBoundary: AUTHORITY_BOUNDARY,
  });

  assertConsumerPreviewEngineResultFE004(result);
  return result;
}

export async function runConsumerPreviewFaceEngineFE004(
  request: MediaPipeMetricGeometryRuntimeRequestFR77V1,
  parity: MediaPipeScreenToMetricReimplementationParityFR76V1,
  factory?: MediaPipeFaceLandmarkerRuntimeFactoryFR26V1,
): Promise<FE004ConsumerPreviewEngineResult> {
  const internalRun = factory === undefined
    ? await runPreviewFaceEngineFE002(request, parity)
    : await runPreviewFaceEngineFE002(request, parity, factory);

  const output = projectConsumerSafePreviewOutputFE003(internalRun);
  return composeConsumerPreviewEngineResultFE004(internalRun, output);
}

export function assertConsumerPreviewEngineResultFE004(
  result: FE004ConsumerPreviewEngineResult,
): void {
  if (
    result.schemaVersion !== 'fe004-consumer-preview-engine-result-v1' ||
    result.artifactVersion !== '0.1.0' ||
    result.contractVersion !== FE004_CONTRACT_VERSION ||
    result.engineState !== 'preview_consumer_facade_only' ||
    result.providerRunRef.trim().length === 0 ||
    !/^sha256:[0-9a-f]{64}$/u.test(result.canonicalAssetDigest)
  ) {
    fail('consumer facade result identity drift.');
  }

  assertConsumerSafePreviewOutputFE003(result.output);
  if (
    result.output.providerRunRef !== result.providerRunRef ||
    result.output.canonicalAssetDigest !== result.canonicalAssetDigest ||
    result.executionReceipt.internalRuntimeSchemaVersion !== 'fe002-preview-engine-run-v1' ||
    result.executionReceipt.consumerProjectionSchemaVersion !==
      'fe003-consumer-safe-preview-output-v1' ||
    result.executionReceipt.failClosedUpstreamErrorsPropagated !== true ||
    result.executionReceipt.fallbackInvented !== false
  ) {
    fail('consumer facade execution receipt drift.');
  }

  if (Object.values(result.dataBoundary).some((value) => value !== false)) {
    fail('consumer facade data boundary widened.');
  }

  if (
    result.authorityBoundary.consumesUpstreamAuthorityOnly !== true ||
    Object.entries(result.authorityBoundary)
      .filter(([key]) => key !== 'consumesUpstreamAuthorityOnly')
      .some(([, value]) => value !== false)
  ) {
    fail('consumer facade authority widened.');
  }
}
