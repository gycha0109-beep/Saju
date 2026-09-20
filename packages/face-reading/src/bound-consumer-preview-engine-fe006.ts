import type { MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 } from './mediapipe-face-landmarker-runtime-fr26.js';
import {
  validateMediaPipeScreenToMetricReimplementationParityFR76,
  type MediaPipeScreenToMetricReimplementationParityFR76V1,
} from './mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import {
  runConsumerPreviewFaceEngineFE004,
  type FE004ConsumerPreviewEngineResult,
} from './consumer-preview-engine-facade-fe004.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FE006_CONTRACT_VERSION =
  'FE006-BOUND-CONSUMER-PREVIEW-ENGINE-v1' as const;

export interface FE006BoundPreviewEngineConfig {
  readonly schemaVersion: 'fe006-bound-preview-engine-config-v1';
  readonly parity: MediaPipeScreenToMetricReimplementationParityFR76V1;
  readonly geometryMetadataPbtxt: string;
  readonly runtimeFactory?: MediaPipeFaceLandmarkerRuntimeFactoryFR26V1;
}

export interface FE006PreviewImageRequest {
  readonly schemaVersion: 'fe006-preview-image-request-v1';
  readonly providerRunRef: string;
  readonly canonicalAssetDigest: string;
  readonly image: unknown;
  readonly frameWidth: number;
  readonly frameHeight: number;
}

export interface FE006BoundConsumerPreviewEngine {
  readonly schemaVersion: 'fe006-bound-consumer-preview-engine-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FE006_CONTRACT_VERSION;
  readonly engineState: 'preview_bound_runtime_only';
  readonly configurationReceipt: {
    readonly paritySchemaVersion: 'fr76-mediapipe-screen-to-metric-reimplementation-parity-v1';
    readonly parityReleaseTag: 'v0.10.35';
    readonly metadataVerification: 'performed_by_fr77_on_each_analysis';
    readonly runtimeFactoryBound: boolean;
  };
  readonly dataBoundary: {
    readonly parityObjectExposed: false;
    readonly geometryMetadataExposed: false;
    readonly runtimeFactoryExposed: false;
    readonly rawImageRetainedByEngine: false;
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
}

const DATA_BOUNDARY = Object.freeze({
  parityObjectExposed: false as const,
  geometryMetadataExposed: false as const,
  runtimeFactoryExposed: false as const,
  rawImageRetainedByEngine: false as const,
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
  throw new FaceAuthorityValidationError(`FE-006 ${message}`);
}

function validateConfig(config: FE006BoundPreviewEngineConfig): void {
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
  if (config.schemaVersion !== 'fe006-bound-preview-engine-config-v1') {
    fail('config schemaVersion is unsupported.');
  }

  validateMediaPipeScreenToMetricReimplementationParityFR76(config.parity);

  if (
    typeof config.geometryMetadataPbtxt !== 'string' ||
    config.geometryMetadataPbtxt.length === 0
  ) {
    fail('geometryMetadataPbtxt must be a non-empty release-exact source string.');
  }
  if (
    config.runtimeFactory !== undefined &&
    (
      typeof config.runtimeFactory !== 'object' ||
      config.runtimeFactory === null ||
      typeof config.runtimeFactory.create !== 'function'
    )
  ) {
    fail('runtimeFactory must expose create() when provided.');
  }
}

export function createBoundConsumerPreviewFaceEngineFE006(
  config: FE006BoundPreviewEngineConfig,
): FE006BoundConsumerPreviewEngine {
  validateConfig(config);

  const parity = config.parity;
  const geometryMetadataPbtxt = config.geometryMetadataPbtxt;
  const runtimeFactory = config.runtimeFactory;

  const engine: FE006BoundConsumerPreviewEngine = Object.freeze({
    schemaVersion: 'fe006-bound-consumer-preview-engine-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FE006_CONTRACT_VERSION,
    engineState: 'preview_bound_runtime_only' as const,
    configurationReceipt: Object.freeze({
      paritySchemaVersion: parity.schemaVersion,
      parityReleaseTag: parity.releaseWitness.releaseTag,
      metadataVerification: 'performed_by_fr77_on_each_analysis' as const,
      runtimeFactoryBound: runtimeFactory !== undefined,
    }),
    dataBoundary: DATA_BOUNDARY,
    authorityBoundary: AUTHORITY_BOUNDARY,
    analyze: async (
      request: FE006PreviewImageRequest,
    ): Promise<FE004ConsumerPreviewEngineResult> => {
      if (typeof request !== 'object' || request === null) {
        fail('analysis request must be an object.');
      }
      const allowed = new Set([
        'schemaVersion',
        'providerRunRef',
        'canonicalAssetDigest',
        'image',
        'frameWidth',
        'frameHeight',
      ]);
      const unexpected = Object.keys(request).find((key) => !allowed.has(key));
      if (unexpected !== undefined) {
        fail(`analysis request contains unauthorized field: ${unexpected}.`);
      }
      if (request.schemaVersion !== 'fe006-preview-image-request-v1') {
        fail('analysis request schemaVersion is unsupported.');
      }

      const runtimeRequest = {
        schemaVersion: 'fr77-governed-metric-geometry-runtime-request-v1' as const,
        providerRunRef: request.providerRunRef,
        canonicalAssetDigest: request.canonicalAssetDigest,
        image: request.image,
        frameWidth: request.frameWidth,
        frameHeight: request.frameHeight,
        geometryMetadataPbtxt,
      };

      return runtimeFactory === undefined
        ? runConsumerPreviewFaceEngineFE004(runtimeRequest, parity)
        : runConsumerPreviewFaceEngineFE004(runtimeRequest, parity, runtimeFactory);
    },
  });

  assertBoundConsumerPreviewFaceEngineFE006(engine);
  return engine;
}

export function assertBoundConsumerPreviewFaceEngineFE006(
  engine: FE006BoundConsumerPreviewEngine,
): void {
  if (
    engine.schemaVersion !== 'fe006-bound-consumer-preview-engine-v1' ||
    engine.artifactVersion !== '0.1.0' ||
    engine.contractVersion !== FE006_CONTRACT_VERSION ||
    engine.engineState !== 'preview_bound_runtime_only' ||
    engine.configurationReceipt.paritySchemaVersion !==
      'fr76-mediapipe-screen-to-metric-reimplementation-parity-v1' ||
    engine.configurationReceipt.parityReleaseTag !== 'v0.10.35' ||
    engine.configurationReceipt.metadataVerification !==
      'performed_by_fr77_on_each_analysis' ||
    typeof engine.configurationReceipt.runtimeFactoryBound !== 'boolean' ||
    typeof engine.analyze !== 'function'
  ) {
    fail('bound engine identity or configuration receipt drift.');
  }

  if (Object.values(engine.dataBoundary).some((value) => value !== false)) {
    fail('bound engine data boundary widened.');
  }

  if (
    engine.authorityBoundary.consumesUpstreamAuthorityOnly !== true ||
    Object.entries(engine.authorityBoundary)
      .filter(([key]) => key !== 'consumesUpstreamAuthorityOnly')
      .some(([, value]) => value !== false)
  ) {
    fail('bound engine authority widened.');
  }
}
