import type {
  MediaPipeFaceLandmarkerResultFR25V1,
} from './mediapipe-eye-landmark-adapter-fr25.js';
import type {
  MediaPipeFaceLandmarkerRuntimeFactoryFR26V1,
  MediaPipeFaceLandmarkerRuntimeInstanceFR26V1,
} from './mediapipe-face-landmarker-runtime-fr26.js';
import {
  createHostBoundMediaPipeRuntimeFactoryFE016,
} from './host-bound-mediapipe-runtime-assets-fe016.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FE022_CONTRACT_VERSION =
  'FE022-DIGEST-BOUND-MEDIAPIPE-MODEL-RUNTIME-v1' as const;

export const FE022_MAX_MODEL_ASSET_BYTES = 64 * 1024 * 1024;

export interface FE022DigestBoundMediaPipeModelConfig {
  readonly schemaVersion: 'fe022-digest-bound-mediapipe-model-config-v1';
  readonly wasmRoot: string;
  readonly modelAssetPath: string;
  readonly modelAssetSha256: string;
}

export interface FE022DigestBoundMediaPipeRuntimeFactory
  extends MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 {
  readonly schemaVersion: 'fe022-digest-bound-mediapipe-runtime-factory-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FE022_CONTRACT_VERSION;
  readonly runtimeState: 'preview_digest_bound_model_factory_only';
  readonly assetReceipt: {
    readonly wasmRoot: string;
    readonly modelAssetPath: string;
    readonly modelAssetSha256: string;
    readonly modelAssetDigestAlgorithm: 'SHA-256';
    readonly modelAssetDigestVerifiedBeforeRuntimeCreate: true;
    readonly modelAssetBufferConsumedByRuntime: true;
    readonly modelAssetBytesPersistedByEngine: false;
    readonly wasmAssetByteDigestVerified: false;
    readonly runtimePackageName: '@mediapipe/tasks-vision';
    readonly runtimePackageVersion: '0.10.35';
    readonly runningMode: 'IMAGE';
    readonly numFaces: 1;
    readonly outputFaceBlendshapes: false;
    readonly outputFacialTransformationMatrixes: false;
  };
  readonly authorityBoundary: {
    readonly consumesExistingProviderRuntimeOnly: true;
    readonly verifiesConfiguredModelBytesOnly: true;
    readonly verifiesWasmBytes: false;
    readonly performsResearchDecision: false;
    readonly performsValidationDecision: false;
    readonly classificationIssued: false;
    readonly traditionalInterpretationIssued: false;
    readonly physiognomyClaimIssued: false;
    readonly fortuneClaimIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
}

const CONFIG_KEYS = new Set([
  'schemaVersion',
  'wasmRoot',
  'modelAssetPath',
  'modelAssetSha256',
]);

const FACTORY_KEYS = [
  'schemaVersion',
  'artifactVersion',
  'contractVersion',
  'runtimeState',
  'assetReceipt',
  'authorityBoundary',
  'create',
] as const;

const RECEIPT_KEYS = [
  'wasmRoot',
  'modelAssetPath',
  'modelAssetSha256',
  'modelAssetDigestAlgorithm',
  'modelAssetDigestVerifiedBeforeRuntimeCreate',
  'modelAssetBufferConsumedByRuntime',
  'modelAssetBytesPersistedByEngine',
  'wasmAssetByteDigestVerified',
  'runtimePackageName',
  'runtimePackageVersion',
  'runningMode',
  'numFaces',
  'outputFaceBlendshapes',
  'outputFacialTransformationMatrixes',
] as const;

const AUTHORITY_KEYS = [
  'consumesExistingProviderRuntimeOnly',
  'verifiesConfiguredModelBytesOnly',
  'verifiesWasmBytes',
  'performsResearchDecision',
  'performsValidationDecision',
  'classificationIssued',
  'traditionalInterpretationIssued',
  'physiognomyClaimIssued',
  'fortuneClaimIssued',
  'productionActivated',
  'commerceActivated',
] as const;

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FE-022 ${message}`);
}

function exactKeys(value: object, allowed: readonly string[], path: string): void {
  const allowedSet = new Set(allowed);
  const unexpected = Object.keys(value).find((key) => !allowedSet.has(key));
  if (unexpected !== undefined) {
    fail(`${path} contains unauthorized field: ${unexpected}.`);
  }
}

function normalizeSha256(value: string): string {
  if (typeof value !== 'string' || !/^[0-9a-f]{64}$/u.test(value)) {
    fail('config.modelAssetSha256 must be exactly 64 lowercase hexadecimal characters.');
  }
  return value;
}

function toHex(bytes: ArrayBuffer): string {
  return Array.from(new Uint8Array(bytes), (byte) =>
    byte.toString(16).padStart(2, '0')).join('');
}

async function fetchVerifiedModelBytes(
  modelAssetPath: string,
  expectedSha256: string,
): Promise<Uint8Array> {
  if (
    typeof globalThis.fetch !== 'function' ||
    globalThis.crypto?.subtle === undefined
  ) {
    fail('browser fetch and Web Crypto SubtleCrypto are required.');
  }

  let response: Response;
  try {
    response = await globalThis.fetch(modelAssetPath, {
      cache: 'no-store',
      credentials: 'same-origin',
    });
  } catch {
    fail('model asset fetch failed.');
  }

  if (!response.ok) {
    fail(`model asset fetch returned HTTP ${response.status}.`);
  }

  const declaredLength = response.headers.get('content-length');
  if (declaredLength !== null) {
    const parsed = Number(declaredLength);
    if (
      !Number.isSafeInteger(parsed) ||
      parsed < 0 ||
      parsed > FE022_MAX_MODEL_ASSET_BYTES
    ) {
      fail('model asset Content-Length is invalid or exceeds the byte limit.');
    }
  }

  let buffer: ArrayBuffer;
  try {
    buffer = await response.arrayBuffer();
  } catch {
    fail('model asset body could not be read.');
  }
  if (buffer.byteLength < 1 || buffer.byteLength > FE022_MAX_MODEL_ASSET_BYTES) {
    fail('model asset byte length is empty or exceeds the byte limit.');
  }

  const actualSha256 = toHex(
    await globalThis.crypto.subtle.digest('SHA-256', buffer),
  );
  if (actualSha256 !== expectedSha256) {
    fail('model asset SHA-256 mismatch.');
  }

  return new Uint8Array(buffer);
}

export function createDigestBoundMediaPipeRuntimeFactoryFE022(
  config: FE022DigestBoundMediaPipeModelConfig,
): FE022DigestBoundMediaPipeRuntimeFactory {
  if (typeof config !== 'object' || config === null) {
    fail('config must be an object.');
  }
  exactKeys(config, [...CONFIG_KEYS], 'config');
  if (config.schemaVersion !== 'fe022-digest-bound-mediapipe-model-config-v1') {
    fail('config schemaVersion is unsupported.');
  }

  const fe016 = createHostBoundMediaPipeRuntimeFactoryFE016({
    schemaVersion: 'fe016-host-bound-mediapipe-asset-config-v1',
    wasmRoot: config.wasmRoot,
    modelAssetPath: config.modelAssetPath,
  });
  const modelAssetSha256 = normalizeSha256(config.modelAssetSha256);

  const assetReceipt = Object.freeze({
    wasmRoot: fe016.assetReceipt.wasmRoot,
    modelAssetPath: fe016.assetReceipt.modelAssetPath,
    modelAssetSha256,
    modelAssetDigestAlgorithm: 'SHA-256' as const,
    modelAssetDigestVerifiedBeforeRuntimeCreate: true as const,
    modelAssetBufferConsumedByRuntime: true as const,
    modelAssetBytesPersistedByEngine: false as const,
    wasmAssetByteDigestVerified: false as const,
    runtimePackageName: '@mediapipe/tasks-vision' as const,
    runtimePackageVersion: '0.10.35' as const,
    runningMode: 'IMAGE' as const,
    numFaces: 1 as const,
    outputFaceBlendshapes: false as const,
    outputFacialTransformationMatrixes: false as const,
  });

  const authorityBoundary = Object.freeze({
    consumesExistingProviderRuntimeOnly: true as const,
    verifiesConfiguredModelBytesOnly: true as const,
    verifiesWasmBytes: false as const,
    performsResearchDecision: false as const,
    performsValidationDecision: false as const,
    classificationIssued: false as const,
    traditionalInterpretationIssued: false as const,
    physiognomyClaimIssued: false as const,
    fortuneClaimIssued: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  });

  const factory: FE022DigestBoundMediaPipeRuntimeFactory = Object.freeze({
    schemaVersion: 'fe022-digest-bound-mediapipe-runtime-factory-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FE022_CONTRACT_VERSION,
    runtimeState: 'preview_digest_bound_model_factory_only' as const,
    assetReceipt,
    authorityBoundary,
    async create(): Promise<MediaPipeFaceLandmarkerRuntimeInstanceFR26V1> {
      const modelAssetBuffer = await fetchVerifiedModelBytes(
        assetReceipt.modelAssetPath,
        assetReceipt.modelAssetSha256,
      );
      const vision = await import('@mediapipe/tasks-vision');
      const fileset = await vision.FilesetResolver.forVisionTasks(
        assetReceipt.wasmRoot,
      );
      const landmarker = await vision.FaceLandmarker.createFromOptions(fileset, {
        baseOptions: { modelAssetBuffer },
        runningMode: 'IMAGE',
        numFaces: 1,
        outputFaceBlendshapes: false,
        outputFacialTransformationMatrixes: false,
      });

      return Object.freeze({
        detect(image: unknown): MediaPipeFaceLandmarkerResultFR25V1 {
          const detect = landmarker.detect.bind(landmarker) as unknown as
            (source: unknown) => unknown;
          return detect(image) as MediaPipeFaceLandmarkerResultFR25V1;
        },
        close(): void {
          landmarker.close();
        },
      });
    },
  });

  assertDigestBoundMediaPipeRuntimeFactoryFE022(factory);
  return factory;
}

export function assertDigestBoundMediaPipeRuntimeFactoryFE022(
  factory: FE022DigestBoundMediaPipeRuntimeFactory,
): void {
  exactKeys(factory, FACTORY_KEYS, 'runtimeFactory');
  exactKeys(factory.assetReceipt, RECEIPT_KEYS, 'assetReceipt');
  exactKeys(factory.authorityBoundary, AUTHORITY_KEYS, 'authorityBoundary');

  if (
    factory.schemaVersion !== 'fe022-digest-bound-mediapipe-runtime-factory-v1' ||
    factory.artifactVersion !== '0.1.0' ||
    factory.contractVersion !== FE022_CONTRACT_VERSION ||
    factory.runtimeState !== 'preview_digest_bound_model_factory_only' ||
    typeof factory.create !== 'function' ||
    factory.assetReceipt.modelAssetDigestAlgorithm !== 'SHA-256' ||
    factory.assetReceipt.modelAssetDigestVerifiedBeforeRuntimeCreate !== true ||
    factory.assetReceipt.modelAssetBufferConsumedByRuntime !== true ||
    factory.assetReceipt.modelAssetBytesPersistedByEngine !== false ||
    factory.assetReceipt.wasmAssetByteDigestVerified !== false ||
    factory.assetReceipt.runtimePackageName !== '@mediapipe/tasks-vision' ||
    factory.assetReceipt.runtimePackageVersion !== '0.10.35' ||
    factory.assetReceipt.runningMode !== 'IMAGE' ||
    factory.assetReceipt.numFaces !== 1 ||
    factory.assetReceipt.outputFaceBlendshapes !== false ||
    factory.assetReceipt.outputFacialTransformationMatrixes !== false
  ) {
    fail('runtime factory identity or asset receipt drift.');
  }

  normalizeSha256(factory.assetReceipt.modelAssetSha256);
  createHostBoundMediaPipeRuntimeFactoryFE016({
    schemaVersion: 'fe016-host-bound-mediapipe-asset-config-v1',
    wasmRoot: factory.assetReceipt.wasmRoot,
    modelAssetPath: factory.assetReceipt.modelAssetPath,
  });

  if (
    factory.authorityBoundary.consumesExistingProviderRuntimeOnly !== true ||
    factory.authorityBoundary.verifiesConfiguredModelBytesOnly !== true ||
    factory.authorityBoundary.verifiesWasmBytes !== false ||
    Object.entries(factory.authorityBoundary)
      .filter(([key]) =>
        ![
          'consumesExistingProviderRuntimeOnly',
          'verifiesConfiguredModelBytesOnly',
        ].includes(key))
      .some(([key, value]) => key !== 'verifiesWasmBytes' && value !== false)
  ) {
    fail('runtime factory authority widened.');
  }
}
