import type { MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 } from './mediapipe-face-landmarker-runtime-fr26.js';
import type { MediaPipeScreenToMetricReimplementationParityFR76V1 } from './mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import {
  runGovernedMetricGeometryFR77,
  type MediaPipeMetricGeometryRuntimeRequestFR77V1,
} from './governed-metric-geometry-runtime-fr77.js';
import {
  projectIssuedGovernedMetricGeometryToLipsSurfaceFR78,
} from './governed-metric-lips-surface-fr78.js';
import {
  projectMetricLipsSurfaceToPoseNormalized2DFR79,
} from './pose-normalized-lips-geometry-fr79.js';
import {
  assertPreviewObservableEngineSnapshotFE001,
  runPreviewObservableEngineFE001,
  type FE001PreviewObservableEngineSnapshot,
} from './preview-observable-engine-fe001.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FE002_CONTRACT_VERSION =
  'FE002-IMAGE-TO-PREVIEW-ENGINE-RUNTIME-v1' as const;

export interface FE002PreviewEngineRun {
  readonly schemaVersion: 'fe002-preview-engine-run-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FE002_CONTRACT_VERSION;
  readonly engineState: 'preview_runtime_only';
  readonly providerRunRef: string;
  readonly canonicalAssetDigest: string;
  readonly stages: {
    readonly metricGeometry: {
      readonly schemaVersion: 'fr77-governed-metric-geometry-candidate-v1';
      readonly artifactVersion: '0.1.0';
    };
    readonly metricLipsSurface: {
      readonly schemaVersion: 'fr78-governed-metric-lips-surface-v1';
      readonly artifactVersion: '0.1.0';
    };
    readonly poseNormalizedLips: {
      readonly schemaVersion: 'fr79-pose-normalized-lips-geometry-v1';
      readonly artifactVersion: '0.1.0';
    };
    readonly observableSnapshot: {
      readonly schemaVersion: 'fe001-preview-observable-engine-snapshot-v1';
      readonly artifactVersion: '0.1.0';
    };
  };
  readonly snapshot: FE001PreviewObservableEngineSnapshot;
  readonly persistence: {
    readonly rawImagePersisted: false;
    readonly rawProviderResponsePersisted: false;
    readonly rawProviderDepthPersisted: false;
    readonly metricGeometryPersisted: false;
    readonly metricLipsSurfacePersisted: false;
    readonly poseNormalizedLipsGeometryPersisted: false;
    readonly biometricEmbeddingPersisted: false;
  };
  readonly authorityBoundary: {
    readonly consumesUpstreamAuthorityOnly: true;
    readonly performsResearchDecision: false;
    readonly performsValidationDecision: false;
    readonly traditionalInterpretationAllowed: false;
    readonly claimGenerationAllowed: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
}

const PERSISTENCE = Object.freeze({
  rawImagePersisted: false as const,
  rawProviderResponsePersisted: false as const,
  rawProviderDepthPersisted: false as const,
  metricGeometryPersisted: false as const,
  metricLipsSurfacePersisted: false as const,
  poseNormalizedLipsGeometryPersisted: false as const,
  biometricEmbeddingPersisted: false as const,
});

const AUTHORITY_BOUNDARY = Object.freeze({
  consumesUpstreamAuthorityOnly: true as const,
  performsResearchDecision: false as const,
  performsValidationDecision: false as const,
  traditionalInterpretationAllowed: false as const,
  claimGenerationAllowed: false as const,
  productionActivated: false as const,
  commerceActivated: false as const,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FE-002 ${message}`);
}

export async function runPreviewFaceEngineFE002(
  request: MediaPipeMetricGeometryRuntimeRequestFR77V1,
  parity: MediaPipeScreenToMetricReimplementationParityFR76V1,
  factory?: MediaPipeFaceLandmarkerRuntimeFactoryFR26V1,
): Promise<FE002PreviewEngineRun> {
  const metricGeometry = factory === undefined
    ? await runGovernedMetricGeometryFR77(request, parity)
    : await runGovernedMetricGeometryFR77(request, parity, factory);

  const metricLipsSurface =
    projectIssuedGovernedMetricGeometryToLipsSurfaceFR78(metricGeometry);
  const poseNormalizedLips =
    projectMetricLipsSurfaceToPoseNormalized2DFR79(metricLipsSurface);
  const snapshot =
    runPreviewObservableEngineFE001(metricGeometry, poseNormalizedLips);
  assertPreviewObservableEngineSnapshotFE001(snapshot);

  if (
    metricGeometry.provider.providerRunRef !== request.providerRunRef ||
    metricLipsSurface.provenance.providerRunRef !== request.providerRunRef ||
    poseNormalizedLips.provenance.providerRunRef !== request.providerRunRef ||
    snapshot.source.providerRunRef !== request.providerRunRef ||
    metricGeometry.provider.canonicalAssetDigest !== request.canonicalAssetDigest ||
    metricLipsSurface.provenance.canonicalAssetDigest !== request.canonicalAssetDigest ||
    poseNormalizedLips.provenance.canonicalAssetDigest !== request.canonicalAssetDigest ||
    snapshot.source.canonicalAssetDigest !== request.canonicalAssetDigest
  ) {
    fail('provider run or canonical asset identity drifted across the runtime pipeline.');
  }

  const result: FE002PreviewEngineRun = Object.freeze({
    schemaVersion: 'fe002-preview-engine-run-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FE002_CONTRACT_VERSION,
    engineState: 'preview_runtime_only' as const,
    providerRunRef: request.providerRunRef,
    canonicalAssetDigest: request.canonicalAssetDigest,
    stages: Object.freeze({
      metricGeometry: Object.freeze({
        schemaVersion: metricGeometry.schemaVersion,
        artifactVersion: metricGeometry.artifactVersion,
      }),
      metricLipsSurface: Object.freeze({
        schemaVersion: metricLipsSurface.schemaVersion,
        artifactVersion: metricLipsSurface.artifactVersion,
      }),
      poseNormalizedLips: Object.freeze({
        schemaVersion: poseNormalizedLips.schemaVersion,
        artifactVersion: poseNormalizedLips.artifactVersion,
      }),
      observableSnapshot: Object.freeze({
        schemaVersion: snapshot.schemaVersion,
        artifactVersion: snapshot.artifactVersion,
      }),
    }),
    snapshot,
    persistence: PERSISTENCE,
    authorityBoundary: AUTHORITY_BOUNDARY,
  });

  assertPreviewFaceEngineRunFE002(result);
  return result;
}

export function assertPreviewFaceEngineRunFE002(
  result: FE002PreviewEngineRun,
): void {
  if (
    result.schemaVersion !== 'fe002-preview-engine-run-v1' ||
    result.artifactVersion !== '0.1.0' ||
    result.contractVersion !== FE002_CONTRACT_VERSION ||
    result.engineState !== 'preview_runtime_only' ||
    result.providerRunRef.trim().length === 0 ||
    !/^sha256:[0-9a-f]{64}$/u.test(result.canonicalAssetDigest)
  ) {
    fail('runtime result identity drift.');
  }

  if (
    result.stages.metricGeometry.schemaVersion !== 'fr77-governed-metric-geometry-candidate-v1' ||
    result.stages.metricGeometry.artifactVersion !== '0.1.0' ||
    result.stages.metricLipsSurface.schemaVersion !== 'fr78-governed-metric-lips-surface-v1' ||
    result.stages.metricLipsSurface.artifactVersion !== '0.1.0' ||
    result.stages.poseNormalizedLips.schemaVersion !== 'fr79-pose-normalized-lips-geometry-v1' ||
    result.stages.poseNormalizedLips.artifactVersion !== '0.1.0' ||
    result.stages.observableSnapshot.schemaVersion !== 'fe001-preview-observable-engine-snapshot-v1' ||
    result.stages.observableSnapshot.artifactVersion !== '0.1.0'
  ) {
    fail('runtime stage receipt drift.');
  }

  if (
    result.snapshot.source.providerRunRef !== result.providerRunRef ||
    result.snapshot.source.canonicalAssetDigest !== result.canonicalAssetDigest
  ) {
    fail('snapshot identity does not match the runtime receipt.');
  }

  if (Object.values(result.persistence).some((value) => value !== false)) {
    fail('runtime persistence boundary widened.');
  }

  if (
    result.authorityBoundary.consumesUpstreamAuthorityOnly !== true ||
    Object.entries(result.authorityBoundary)
      .filter(([key]) => key !== 'consumesUpstreamAuthorityOnly')
      .some(([, value]) => value !== false)
  ) {
    fail('runtime authority widened beyond preview engine execution.');
  }
}
