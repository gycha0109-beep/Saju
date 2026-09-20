import type { MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 } from './mediapipe-face-landmarker-runtime-fr26.js';
import {
  createReleaseManagedConsumerPreviewFaceEngineFE009,
  type FE009ReleaseManagedPreviewEngine,
} from './release-managed-preview-engine-fe009.js';
import type { FE004ConsumerPreviewEngineResult } from './consumer-preview-engine-facade-fe004.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FE010_CONTRACT_VERSION =
  'FE010-BROWSER-BLOB-PREVIEW-INGRESS-v1' as const;

export type FE010BrowserBlobPreviewErrorCode =
  | 'INVALID_CONFIG'
  | 'INVALID_IMAGE_INPUT'
  | 'UNSUPPORTED_IMAGE_TYPE'
  | 'BROWSER_CAPABILITY_UNAVAILABLE'
  | 'IMAGE_DIGEST_FAILED'
  | 'IMAGE_DECODE_FAILED'
  | 'NO_FACE_DETECTED'
  | 'INVALID_PROVIDER_GEOMETRY'
  | 'ENGINE_RUNTIME_FAILED'
  | 'SESSION_CLOSED';

export class FE010BrowserBlobPreviewError extends FaceAuthorityValidationError {
  readonly code: FE010BrowserBlobPreviewErrorCode;

  constructor(code: FE010BrowserBlobPreviewErrorCode, message: string) {
    super(`FE-010 ${message}`);
    this.code = code;
  }
}

export interface FE010BrowserImageBitmapLike {
  readonly width: number;
  readonly height: number;
  readonly close?: () => void;
}

export interface FE010BrowserImageBitmapDecoder {
  readonly decode: (blob: Blob) => Promise<FE010BrowserImageBitmapLike>;
}

export interface FE010BrowserBlobPreviewEngineConfig {
  readonly schemaVersion: 'fe010-browser-blob-preview-engine-config-v1';
  readonly runtimeFactory?: MediaPipeFaceLandmarkerRuntimeFactoryFR26V1;
  readonly bitmapDecoder?: FE010BrowserImageBitmapDecoder;
}

export interface FE010BrowserBlobAnalysisRequest {
  readonly schemaVersion: 'fe010-browser-blob-analysis-request-v1';
  readonly blob: Blob;
}

export interface FE010BrowserBlobPreviewEngine {
  readonly schemaVersion: 'fe010-browser-blob-preview-engine-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FE010_CONTRACT_VERSION;
  readonly engineState: 'preview_browser_blob_ingress_only';
  readonly ingressReceipt: {
    readonly digestAlgorithm: 'SHA-256';
    readonly digestInput: 'exact_input_blob_bytes';
    readonly decodedFrameSource: 'same_input_blob';
    readonly defaultDecodePrimitive: 'createImageBitmap_from_image_orientation';
    readonly providerRunRefSemantics: 'session_local_opaque_trace_only';
    readonly analysesSerialized: true;
    readonly decodedBitmapClosedAfterAnalysis: true;
    readonly closeDrainsQueuedAnalyses: true;
  };
  readonly dataBoundary: {
    readonly blobRetainedByEngine: false;
    readonly blobBytesRetainedByEngine: false;
    readonly decodedBitmapRetainedByEngine: false;
    readonly providerResultRetainedByEngine: false;
    readonly biometricEmbeddingPersisted: false;
  };
  readonly authorityBoundary: {
    readonly consumesUpstreamAuthorityOnly: true;
    readonly providerRunRefExternalIdentityAttested: false;
    readonly anatomicalLateralityIssued: false;
    readonly performsResearchDecision: false;
    readonly performsValidationDecision: false;
    readonly classificationIssued: false;
    readonly traditionalInterpretationIssued: false;
    readonly claimIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly analyzeBlob: (
    request: FE010BrowserBlobAnalysisRequest,
  ) => Promise<FE004ConsumerPreviewEngineResult>;
  readonly close: () => Promise<void>;
}

type BrowserCreateImageBitmap = (
  blob: Blob,
  options?: Readonly<{ imageOrientation?: 'from-image' | 'none' | 'flipY' }>,
) => Promise<FE010BrowserImageBitmapLike>;

const SUPPORTED_IMAGE_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
]);

const INGRESS_RECEIPT = Object.freeze({
  digestAlgorithm: 'SHA-256' as const,
  digestInput: 'exact_input_blob_bytes' as const,
  decodedFrameSource: 'same_input_blob' as const,
  defaultDecodePrimitive: 'createImageBitmap_from_image_orientation' as const,
  providerRunRefSemantics: 'session_local_opaque_trace_only' as const,
  analysesSerialized: true as const,
  decodedBitmapClosedAfterAnalysis: true as const,
  closeDrainsQueuedAnalyses: true as const,
});

const DATA_BOUNDARY = Object.freeze({
  blobRetainedByEngine: false as const,
  blobBytesRetainedByEngine: false as const,
  decodedBitmapRetainedByEngine: false as const,
  providerResultRetainedByEngine: false as const,
  biometricEmbeddingPersisted: false as const,
});

const AUTHORITY_BOUNDARY = Object.freeze({
  consumesUpstreamAuthorityOnly: true as const,
  providerRunRefExternalIdentityAttested: false as const,
  anatomicalLateralityIssued: false as const,
  performsResearchDecision: false as const,
  performsValidationDecision: false as const,
  classificationIssued: false as const,
  traditionalInterpretationIssued: false as const,
  claimIssued: false as const,
  productionActivated: false as const,
  commerceActivated: false as const,
});

function fail(
  message: string,
  code: FE010BrowserBlobPreviewErrorCode = 'INVALID_IMAGE_INPUT',
): never {
  throw new FE010BrowserBlobPreviewError(code, message);
}

function validateConfig(config: FE010BrowserBlobPreviewEngineConfig): void {
  if (typeof config !== 'object' || config === null) {
    fail('config must be an object.', 'INVALID_CONFIG');
  }
  const allowed = new Set(['schemaVersion', 'runtimeFactory', 'bitmapDecoder']);
  const unexpected = Object.keys(config).find((key) => !allowed.has(key));
  if (unexpected !== undefined) {
    fail(`config contains unauthorized field: ${unexpected}.`, 'INVALID_CONFIG');
  }
  if (config.schemaVersion !== 'fe010-browser-blob-preview-engine-config-v1') {
    fail('config schemaVersion is unsupported.', 'INVALID_CONFIG');
  }
  if (
    config.runtimeFactory !== undefined &&
    (
      typeof config.runtimeFactory !== 'object' ||
      config.runtimeFactory === null ||
      typeof config.runtimeFactory.create !== 'function'
    )
  ) {
    fail('runtimeFactory must expose create() when provided.', 'INVALID_CONFIG');
  }
  if (
    config.bitmapDecoder !== undefined &&
    (
      typeof config.bitmapDecoder !== 'object' ||
      config.bitmapDecoder === null ||
      typeof config.bitmapDecoder.decode !== 'function'
    )
  ) {
    fail('bitmapDecoder must expose decode() when provided.', 'INVALID_CONFIG');
  }
}

function validateBlobRequest(request: FE010BrowserBlobAnalysisRequest): void {
  if (typeof request !== 'object' || request === null) {
    fail('analysis request must be an object.');
  }
  const allowed = new Set(['schemaVersion', 'blob']);
  const unexpected = Object.keys(request).find((key) => !allowed.has(key));
  if (unexpected !== undefined) {
    fail(`analysis request contains unauthorized field: ${unexpected}.`);
  }
  if (request.schemaVersion !== 'fe010-browser-blob-analysis-request-v1') {
    fail('analysis request schemaVersion is unsupported.');
  }
  const blob = request.blob as Blob | undefined;
  if (
    blob === undefined ||
    blob === null ||
    typeof blob !== 'object' ||
    typeof blob.arrayBuffer !== 'function' ||
    !Number.isInteger(blob.size) ||
    blob.size <= 0
  ) {
    fail('blob must be a non-empty Blob-compatible object.');
  }
  if (!SUPPORTED_IMAGE_TYPES.has(blob.type.toLowerCase())) {
    fail('blob type must be image/jpeg, image/png, or image/webp.', 'UNSUPPORTED_IMAGE_TYPE');
  }
}

function validateBitmap(bitmap: FE010BrowserImageBitmapLike): void {
  if (
    typeof bitmap !== 'object' ||
    bitmap === null ||
    !Number.isInteger(bitmap.width) ||
    bitmap.width <= 0 ||
    !Number.isInteger(bitmap.height) ||
    bitmap.height <= 0
  ) {
    fail('decoded bitmap must expose positive integer width/height.', 'IMAGE_DECODE_FAILED');
  }
  if (bitmap.close !== undefined && typeof bitmap.close !== 'function') {
    fail('decoded bitmap close must be a function when present.', 'IMAGE_DECODE_FAILED');
  }
}

function defaultBitmapDecoder(): FE010BrowserImageBitmapDecoder {
  return Object.freeze({
    async decode(blob: Blob): Promise<FE010BrowserImageBitmapLike> {
      const createImageBitmap = (
        globalThis as unknown as { readonly createImageBitmap?: BrowserCreateImageBitmap }
      ).createImageBitmap;
      if (typeof createImageBitmap !== 'function') {
        fail('browser createImageBitmap() is required when no bitmapDecoder is supplied.', 'BROWSER_CAPABILITY_UNAVAILABLE');
      }
      return createImageBitmap(blob, { imageOrientation: 'from-image' });
    },
  });
}

function hex(bytes: ArrayBuffer): string {
  return Array.from(
    new Uint8Array(bytes),
    (value) => value.toString(16).padStart(2, '0'),
  ).join('');
}

async function sha256Blob(blob: Blob): Promise<string> {
  const subtle = globalThis.crypto?.subtle;
  if (subtle === undefined) {
    fail('Web Crypto SubtleCrypto is required to hash input Blob bytes.', 'BROWSER_CAPABILITY_UNAVAILABLE');
  }
  try {
    const bytes = await blob.arrayBuffer();
    const digest = await subtle.digest('SHA-256', bytes);
    return `sha256:${hex(digest)}`;
  } catch {
    fail('failed to compute SHA-256 over the exact input Blob bytes.', 'IMAGE_DIGEST_FAILED');
  }
}

function providerRunRef(sequence: number, digest: string): string {
  return `fe010:blob:${sequence}:${digest.slice('sha256:'.length, 'sha256:'.length + 24)}`;
}

export async function createBrowserBlobConsumerPreviewFaceEngineFE010(
  config: FE010BrowserBlobPreviewEngineConfig = {
    schemaVersion: 'fe010-browser-blob-preview-engine-config-v1',
  },
): Promise<FE010BrowserBlobPreviewEngine> {
  validateConfig(config);

  const managed: FE009ReleaseManagedPreviewEngine =
    await createReleaseManagedConsumerPreviewFaceEngineFE009({
      schemaVersion: 'fe009-release-managed-preview-engine-config-v1',
      ...(config.runtimeFactory === undefined
        ? {}
        : { runtimeFactory: config.runtimeFactory }),
    });
  const decoder = config.bitmapDecoder ?? defaultBitmapDecoder();

  let lifecycle: 'open' | 'closing' | 'closed' = 'open';
  let sequence = 0;
  let tail: Promise<void> = Promise.resolve();
  let closePromise: Promise<void> | null = null;

  const analyzeOne = async (
    request: FE010BrowserBlobAnalysisRequest,
  ): Promise<FE004ConsumerPreviewEngineResult> => {
    validateBlobRequest(request);
    const digest = await sha256Blob(request.blob);
    let bitmap: FE010BrowserImageBitmapLike;
    try {
      bitmap = await decoder.decode(request.blob);
    } catch (error) {
      if (error instanceof FE010BrowserBlobPreviewError) throw error;
      fail('browser image decode failed.', 'IMAGE_DECODE_FAILED');
    }

    try {
      validateBitmap(bitmap);
      sequence += 1;
      try {
        return await managed.analyze({
          schemaVersion: 'fe006-preview-image-request-v1',
          providerRunRef: providerRunRef(sequence, digest),
          canonicalAssetDigest: digest,
          image: bitmap,
          frameWidth: bitmap.width,
          frameHeight: bitmap.height,
        });
      } catch (error) {
        if (error instanceof FaceAuthorityValidationError) {
          if (/requires exactly one detected face; received 0\./u.test(error.message)) {
            fail('no face was detected in the decoded image.', 'NO_FACE_DETECTED');
          }
          if (
            /FaceLandmarker result|faceLandmarks|provider landmarks|provider landmark|landmark\[/u
              .test(error.message)
          ) {
            fail('provider face geometry did not satisfy the bounded engine contract.', 'INVALID_PROVIDER_GEOMETRY');
          }
        }
        fail('preview engine runtime analysis failed.', 'ENGINE_RUNTIME_FAILED');
      }
    } finally {
      if (
        typeof bitmap === 'object' &&
        bitmap !== null &&
        typeof bitmap.close === 'function'
      ) {
        bitmap.close();
      }
    }
  };

  const engine: FE010BrowserBlobPreviewEngine = Object.freeze({
    schemaVersion: 'fe010-browser-blob-preview-engine-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FE010_CONTRACT_VERSION,
    engineState: 'preview_browser_blob_ingress_only' as const,
    ingressReceipt: INGRESS_RECEIPT,
    dataBoundary: DATA_BOUNDARY,
    authorityBoundary: AUTHORITY_BOUNDARY,
    analyzeBlob(request: FE010BrowserBlobAnalysisRequest) {
      if (lifecycle !== 'open') {
        return Promise.reject(
          new FE010BrowserBlobPreviewError(
            'SESSION_CLOSED',
            'browser Blob session close has begun; new analysis is rejected.',
          ),
        );
      }

      const task = tail.then(() => analyzeOne(request));
      tail = task.then(
        () => undefined,
        () => undefined,
      );
      return task;
    },
    close() {
      if (closePromise !== null) return closePromise;
      if (lifecycle === 'closed') return Promise.resolve();

      lifecycle = 'closing';
      closePromise = tail
        .then(() => managed.close())
        .finally(() => {
          lifecycle = 'closed';
        });
      return closePromise;
    },
  });

  assertBrowserBlobConsumerPreviewFaceEngineFE010(engine);
  return engine;
}

export function assertBrowserBlobConsumerPreviewFaceEngineFE010(
  engine: FE010BrowserBlobPreviewEngine,
): void {
  if (
    engine.schemaVersion !== 'fe010-browser-blob-preview-engine-v1' ||
    engine.artifactVersion !== '0.1.0' ||
    engine.contractVersion !== FE010_CONTRACT_VERSION ||
    engine.engineState !== 'preview_browser_blob_ingress_only' ||
    engine.ingressReceipt.digestAlgorithm !== 'SHA-256' ||
    engine.ingressReceipt.digestInput !== 'exact_input_blob_bytes' ||
    engine.ingressReceipt.decodedFrameSource !== 'same_input_blob' ||
    engine.ingressReceipt.defaultDecodePrimitive !==
      'createImageBitmap_from_image_orientation' ||
    engine.ingressReceipt.providerRunRefSemantics !==
      'session_local_opaque_trace_only' ||
    engine.ingressReceipt.analysesSerialized !== true ||
    engine.ingressReceipt.decodedBitmapClosedAfterAnalysis !== true ||
    engine.ingressReceipt.closeDrainsQueuedAnalyses !== true ||
    typeof engine.analyzeBlob !== 'function' ||
    typeof engine.close !== 'function'
  ) {
    fail('browser Blob ingress engine identity or receipt drift.');
  }

  if (Object.values(engine.dataBoundary).some((value) => value !== false)) {
    fail('browser Blob ingress data boundary widened.');
  }

  if (
    engine.authorityBoundary.consumesUpstreamAuthorityOnly !== true ||
    Object.entries(engine.authorityBoundary)
      .filter(([key]) => key !== 'consumesUpstreamAuthorityOnly')
      .some(([, value]) => value !== false)
  ) {
    fail('browser Blob ingress authority widened.');
  }
}