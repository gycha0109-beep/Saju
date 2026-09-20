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