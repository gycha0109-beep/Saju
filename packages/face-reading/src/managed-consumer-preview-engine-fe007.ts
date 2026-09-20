import {
  DEFAULT_MEDIAPIPE_FACE_LANDMARKER_RUNTIME_FACTORY_FR26,
  type MediaPipeFaceLandmarkerRuntimeFactoryFR26V1,
  type MediaPipeFaceLandmarkerRuntimeInstanceFR26V1,
} from './mediapipe-face-landmarker-runtime-fr26.js';
import {
  validateMediaPipeScreenToMetricReimplementationParityFR76,
  type MediaPipeScreenToMetricReimplementationParityFR76V1,
} from './mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import { issueMediaPipeGeometryProfileFR77 } from './governed-metric-geometry-runtime-fr77.js';
import {
  createBoundConsumerPreviewFaceEngineFE006,
  type FE006PreviewImageRequest,
} from './bound-consumer-preview-engine-fe006.js';
import type { FE004ConsumerPreviewEngineResult } from './consumer-preview-engine-facade-fe004.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FE007_CONTRACT_VERSION =
  'FE007-MANAGED-CONSUMER-PREVIEW-ENGINE-SESSION-v1' as const;

export interface FE007ManagedPreviewEngineConfig {
  readonly schemaVersion: 'fe007-managed-preview-engine-config-v1';
  readonly parity: MediaPipeScreenToMetricReimplementationParityFR76V1;
  readonly geometryMetadataPbtxt: string;
  readonly runtimeFactory?: MediaPipeFaceLandmarkerRuntimeFactoryFR26V1;
}

export interface FE007ManagedConsumerPreviewEngine {
  readonly schemaVersion: 'fe007-managed-consumer-preview-engine-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FE007_CONTRACT_VERSION;
  readonly engineState: 'preview_managed_session_only';
  readonly lifecycleReceipt: {
    readonly runtimeInstancesCreated: 1;
    readonly metadataPreflightVerified: true;
    readonly analysesSerialized: true;
    readonly perAnalysisRuntimeCloseSuppressed: true;
    readonly explicitSessionCloseRequired: true;
  };
  readonly dataBoundary: {
    readonly runtimeInstanceExposed: false;
    readonly parityObjectExposed: false;
    readonly geometryMetadataExposed: false;
    readonly rawImageRetainedByEngine: false;
    readonly providerResultRetainedByEngine: false;
  };
  readonly authorityBoundary: {
    readonly consumesUpstreamAuthorityOnly: true;
    readonly performsResearchDecision: false;
    readonly performsValidationDecision: false;
    readonly classificationIssued: false;
    readonly traditionalInterpretationIssued: false;
    readonly claimIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly analyze: (
    request: FE006PreviewImageRequest,
  ) => Promise<FE004ConsumerPreviewEngineResult>;
  readonly close: () => Promise<void>;
}

const DATA_BOUNDARY = Object.freeze({
  runtimeInstanceExposed: false as const,
  parityObjectExposed: false as const,
  geometryMetadataExposed: false as const,
  rawImageRetainedByEngine: false as const,
  providerResultRetainedByEngine: false as const,
});

const AUTHORITY_BOUNDARY = Object.freeze({
  consumesUpstreamAuthorityOnly: true as const,
  performsResearchDecision: false as const,
  performsValidationDecision: false as const,
  classificationIssued: false as const,
  traditionalInterpretationIssued: false as const,
  claimIssued: false as const,
  productionActivated: false as const,
  commerceActivated: false as const,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FE-007 ${message}`);
}

function assertFactory(
  factory: MediaPipeFaceLandmarkerRuntimeFactoryFR26V1,
): void {
  if (
    typeof factory !== 'object' ||
    factory === null ||
    typeof factory.create !== 'function'
  ) {
    fail('runtimeFactory must expose create().');
  }
}

function assertRuntime(
  runtime: MediaPipeFaceLandmarkerRuntimeInstanceFR26V1,
): void {
  if (
    typeof runtime !== 'object' ||
    runtime === null ||
    typeof runtime.detect !== 'function' ||
    typeof runtime.close !== 'function'
  ) {
    fail('runtimeFactory returned an invalid runtime instance.');
  }
}

export async function createManagedConsumerPreviewFaceEngineFE007(
  config: FE007ManagedPreviewEngineConfig,
): Promise<FE007ManagedConsumerPreviewEngine> {
  if (typeof config !== 'object' || config === null) {
    fail('config must be an object.');
  }
  const allowed = new Set([
    'schemaVersion',
    'parity',
    'geometryMetadataPbtxt',
    'runtimeFactory',
  ]);
  const unexpected = Object.keys(config).find((key) => !allowed.has(key));
  if (unexpected !== undefined) {
    fail(`config contains unauthorized field: ${unexpected}.`);
  }
  if (config.schemaVersion !== 'fe007-managed-preview-engine-config-v1') {
    fail('config schemaVersion is unsupported.');
  }

  validateMediaPipeScreenToMetricReimplementationParityFR76(config.parity);
  if (
    typeof config.geometryMetadataPbtxt !== 'string' ||
    config.geometryMetadataPbtxt.length === 0
  ) {
    fail('geometryMetadataPbtxt must be a non-empty release-exact source string.');
  }

  await issueMediaPipeGeometryProfileFR77(config.geometryMetadataPbtxt);

  const sourceFactory =
    config.runtimeFactory ?? DEFAULT_MEDIAPIPE_FACE_LANDMARKER_RUNTIME_FACTORY_FR26;
  assertFactory(sourceFactory);

  const runtime = await sourceFactory.create();
  assertRuntime(runtime);

  const leaseFactory: MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 = Object.freeze({
    async create(): Promise<MediaPipeFaceLandmarkerRuntimeInstanceFR26V1> {
      return Object.freeze({
        detect(image: unknown) {
          return runtime.detect(image);
        },
        close(): void {
          // FR77 closes the per-analysis lease. FE007 owns the shared runtime.
        },
      });
    },
  });

  let boundEngine;
  try {
    boundEngine = createBoundConsumerPreviewFaceEngineFE006({
      schemaVersion: 'fe006-bound-preview-engine-config-v1',
      parity: config.parity,
      geometryMetadataPbtxt: config.geometryMetadataPbtxt,
      runtimeFactory: leaseFactory,
    });
  } catch (error) {
    runtime.close();
    throw error;
  }

  let lifecycleState: 'open' | 'closing' | 'closed' = 'open';
  let tail: Promise<void> = Promise.resolve();

  const engine: FE007ManagedConsumerPreviewEngine = Object.freeze({
    schemaVersion: 'fe007-managed-consumer-preview-engine-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FE007_CONTRACT_VERSION,
    engineState: 'preview_managed_session_only' as const,
    lifecycleReceipt: Object.freeze({
      runtimeInstancesCreated: 1 as const,
      metadataPreflightVerified: true as const,
      analysesSerialized: true as const,
      perAnalysisRuntimeCloseSuppressed: true as const,
      explicitSessionCloseRequired: true as const,
    }),
    dataBoundary: DATA_BOUNDARY,
    authorityBoundary: AUTHORITY_BOUNDARY,
    analyze(request: FE006PreviewImageRequest): Promise<FE004ConsumerPreviewEngineResult> {
      if (lifecycleState !== 'open') {
        return Promise.reject(
          new FaceAuthorityValidationError(
            'FE-007 analysis is unavailable after session close has begun.',
          ),
        );
      }

      const task = tail.then(() => boundEngine.analyze(request));
      tail = task.then(
        () => undefined,
        () => undefined,
      );
      return task;
    },
    async close(): Promise<void> {
      if (lifecycleState === 'closed') return;
      if (lifecycleState === 'closing') {
        await tail;
        return;
      }

      lifecycleState = 'closing';
      await tail;
      try {
        runtime.close();
      } finally {
        lifecycleState = 'closed';
      }
    },
  });

  assertManagedConsumerPreviewFaceEngineFE007(engine);
  return engine;
}

export function assertManagedConsumerPreviewFaceEngineFE007(
  engine: FE007ManagedConsumerPreviewEngine,
): void {
  if (
    engine.schemaVersion !== 'fe007-managed-consumer-preview-engine-v1' ||
    engine.artifactVersion !== '0.1.0' ||
    engine.contractVersion !== FE007_CONTRACT_VERSION ||
    engine.engineState !== 'preview_managed_session_only' ||
    engine.lifecycleReceipt.runtimeInstancesCreated !== 1 ||
    engine.lifecycleReceipt.metadataPreflightVerified !== true ||
    engine.lifecycleReceipt.analysesSerialized !== true ||
    engine.lifecycleReceipt.perAnalysisRuntimeCloseSuppressed !== true ||
    engine.lifecycleReceipt.explicitSessionCloseRequired !== true ||
    typeof engine.analyze !== 'function' ||
    typeof engine.close !== 'function'
  ) {
    fail('managed engine identity or lifecycle receipt drift.');
  }

  if (Object.values(engine.dataBoundary).some((value) => value !== false)) {
    fail('managed engine data boundary widened.');
  }

  if (
    engine.authorityBoundary.consumesUpstreamAuthorityOnly !== true ||
    Object.entries(engine.authorityBoundary)
      .filter(([key]) => key !== 'consumesUpstreamAuthorityOnly')
      .some(([, value]) => value !== false)
  ) {
    fail('managed engine authority widened.');
  }
}
