import type {
  MediaPipeFaceLandmarkerResultFR25V1,
} from './mediapipe-eye-landmark-adapter-fr25.js';
import type {
  MediaPipeFaceLandmarkerRuntimeFactoryFR26V1,
  MediaPipeFaceLandmarkerRuntimeInstanceFR26V1,
} from './mediapipe-face-landmarker-runtime-fr26.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FE016_CONTRACT_VERSION =
  'FE016-HOST-BOUND-MEDIAPIPE-RUNTIME-ASSETS-v1' as const;

export interface FE016HostBoundMediaPipeAssetConfig {
  readonly schemaVersion: 'fe016-host-bound-mediapipe-asset-config-v1';
  readonly wasmRoot: string;
  readonly modelAssetPath: string;
}

export interface FE016HostBoundMediaPipeRuntimeFactory
  extends MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 {
  readonly schemaVersion: 'fe016-host-bound-mediapipe-runtime-factory-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FE016_CONTRACT_VERSION;
  readonly runtimeState: 'preview_host_bound_asset_factory_only';
  readonly assetReceipt: {
    readonly wasmRoot: string;
    readonly modelAssetPath: string;
    readonly assetRefsHostConfigured: true;
    readonly assetByteDigestVerified: false;
    readonly assetBytesPersistedByEngine: false;
    readonly runtimePackageName: '@mediapipe/tasks-vision';
    readonly runtimePackageVersion: '0.10.35';
    readonly runningMode: 'IMAGE';
    readonly numFaces: 1;
    readonly outputFaceBlendshapes: false;
    readonly outputFacialTransformationMatrixes: false;
  };
  readonly authorityBoundary: {
    readonly consumesExistingProviderRuntimeOnly: true;
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

const CONFIG_KEYS = new Set(['schemaVersion', 'wasmRoot', 'modelAssetPath']);

const AUTHORITY_BOUNDARY = Object.freeze({
  consumesExistingProviderRuntimeOnly: true as const,
  performsResearchDecision: false as const,
  performsValidationDecision: false as const,
  classificationIssued: false as const,
  traditionalInterpretationIssued: false as const,
  physiognomyClaimIssued: false as const,
  fortuneClaimIssued: false as const,
  productionActivated: false as const,
  commerceActivated: false as const,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FE-016 ${message}`);
}

function isLoopbackHostname(hostname: string): boolean {
  const normalized = hostname.toLowerCase();
  return (
    normalized === 'localhost' ||
    normalized === '127.0.0.1' ||
    normalized === '[::1]' ||
    normalized === '::1'
  );
}

function validateAssetRef(value: string, path: string): void {
  if (
    typeof value !== 'string' ||
    value.length === 0 ||
    value !== value.trim() ||
    value.length > 2048 ||
    /\s/u.test(value) ||
    /\\/u.test(value)
  ) {
    fail(`${path} must be a bounded, whitespace-free asset reference.`);
  }

  if (value.startsWith('/')) {
    if (value.startsWith('//') || value.includes('#')) {
      fail(`${path} root-relative reference must not be scheme-relative or contain a fragment.`);
    }
    return;
  }

  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    fail(`${path} must be an HTTPS URL, localhost HTTP URL, or root-relative same-origin path.`);
  }

  if (parsed.username !== '' || parsed.password !== '') {
    fail(`${path} must not contain URL credentials.`);
  }
  if (parsed.hash !== '') {
    fail(`${path} must not contain a URL fragment.`);
  }
  if (parsed.protocol === 'https:') return;
  if (parsed.protocol === 'http:' && isLoopbackHostname(parsed.hostname)) return;

  fail(`${path} protocol is not allowed.`);
}

function validateConfig(config: FE016HostBoundMediaPipeAssetConfig): void {
  if (typeof config !== 'object' || config === null) {
    fail('config must be an object.');
  }
  const unexpected = Object.keys(config).find((key) => !CONFIG_KEYS.has(key));
  if (unexpected !== undefined) {
    fail(`config contains unauthorized field: ${unexpected}.`);
  }
  if (config.schemaVersion !== 'fe016-host-bound-mediapipe-asset-config-v1') {
    fail('config schemaVersion is unsupported.');
  }
  validateAssetRef(config.wasmRoot, 'config.wasmRoot');
  validateAssetRef(config.modelAssetPath, 'config.modelAssetPath');
}

export function createHostBoundMediaPipeRuntimeFactoryFE016(
  config: FE016HostBoundMediaPipeAssetConfig,
): FE016HostBoundMediaPipeRuntimeFactory {
  validateConfig(config);

  const receipt = Object.freeze({
    wasmRoot: config.wasmRoot,
    modelAssetPath: config.modelAssetPath,
    assetRefsHostConfigured: true as const,
    assetByteDigestVerified: false as const,
    assetBytesPersistedByEngine: false as const,
    runtimePackageName: '@mediapipe/tasks-vision' as const,
    runtimePackageVersion: '0.10.35' as const,
    runningMode: 'IMAGE' as const,
    numFaces: 1 as const,
    outputFaceBlendshapes: false as const,
    outputFacialTransformationMatrixes: false as const,
  });

  const factory: FE016HostBoundMediaPipeRuntimeFactory = Object.freeze({
    schemaVersion: 'fe016-host-bound-mediapipe-runtime-factory-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FE016_CONTRACT_VERSION,
    runtimeState: 'preview_host_bound_asset_factory_only' as const,
    assetReceipt: receipt,
    authorityBoundary: AUTHORITY_BOUNDARY,
    async create(): Promise<MediaPipeFaceLandmarkerRuntimeInstanceFR26V1> {
      const vision = await import('@mediapipe/tasks-vision');
      const fileset = await vision.FilesetResolver.forVisionTasks(receipt.wasmRoot);
      const landmarker = await vision.FaceLandmarker.createFromOptions(fileset, {
        baseOptions: {
          modelAssetPath: receipt.modelAssetPath,
        },
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

  assertHostBoundMediaPipeRuntimeFactoryFE016(factory);
  return factory;
}

export function assertHostBoundMediaPipeRuntimeFactoryFE016(
  factory: FE016HostBoundMediaPipeRuntimeFactory,
): void {
  if (
    factory.schemaVersion !==
      'fe016-host-bound-mediapipe-runtime-factory-v1' ||
    factory.artifactVersion !== '0.1.0' ||
    factory.contractVersion !== FE016_CONTRACT_VERSION ||
    factory.runtimeState !== 'preview_host_bound_asset_factory_only' ||
    typeof factory.create !== 'function'
  ) {
    fail('runtime factory identity drift.');
  }

  validateAssetRef(factory.assetReceipt.wasmRoot, 'assetReceipt.wasmRoot');
  validateAssetRef(
    factory.assetReceipt.modelAssetPath,
    'assetReceipt.modelAssetPath',
  );

  if (
    factory.assetReceipt.assetRefsHostConfigured !== true ||
    factory.assetReceipt.assetByteDigestVerified !== false ||
    factory.assetReceipt.assetBytesPersistedByEngine !== false ||
    factory.assetReceipt.runtimePackageName !== '@mediapipe/tasks-vision' ||
    factory.assetReceipt.runtimePackageVersion !== '0.10.35' ||
    factory.assetReceipt.runningMode !== 'IMAGE' ||
    factory.assetReceipt.numFaces !== 1 ||
    factory.assetReceipt.outputFaceBlendshapes !== false ||
    factory.assetReceipt.outputFacialTransformationMatrixes !== false
  ) {
    fail('runtime asset receipt drift.');
  }

  if (
    factory.authorityBoundary.consumesExistingProviderRuntimeOnly !== true ||
    Object.entries(factory.authorityBoundary)
      .filter(([key]) => key !== 'consumesExistingProviderRuntimeOnly')
      .some(([, value]) => value !== false)
  ) {
    fail('runtime factory authority widened.');
  }
}
