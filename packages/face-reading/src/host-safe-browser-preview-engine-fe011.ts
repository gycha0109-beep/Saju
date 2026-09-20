import type { FE004ConsumerPreviewEngineResult } from './consumer-preview-engine-facade-fe004.js';
import {
  FE010BrowserBlobPreviewError,
  createBrowserBlobConsumerPreviewFaceEngineFE010,
  type FE010BrowserBlobAnalysisRequest,
  type FE010BrowserBlobPreviewEngine,
  type FE010BrowserBlobPreviewEngineConfig,
} from './browser-blob-preview-engine-fe010.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FE011_CONTRACT_VERSION =
  'FE011-HOST-SAFE-BROWSER-PREVIEW-ATTEMPT-v1' as const;

export type FE011PreviewRejectionCode =
  | 'INVALID_CONFIGURATION'
  | 'INVALID_IMAGE_INPUT'
  | 'UNSUPPORTED_IMAGE_TYPE'
  | 'BROWSER_CAPABILITY_UNAVAILABLE'
  | 'IMAGE_DIGEST_FAILED'
  | 'IMAGE_DECODE_FAILED'
  | 'NO_FACE_DETECTED'
  | 'INVALID_PROVIDER_GEOMETRY'
  | 'ENGINE_INITIALIZATION_FAILED'
  | 'ENGINE_RUNTIME_FAILED'
  | 'SESSION_CLOSED';

export type FE011PreviewRejectionStage =
  | 'open'
  | 'ingress'
  | 'analysis'
  | 'lifecycle';

export interface FE011PreviewRejection {
  readonly code: FE011PreviewRejectionCode;
  readonly stage: FE011PreviewRejectionStage;
  readonly internalErrorMessageExposed: false;
  readonly internalStackExposed: false;
  readonly providerPayloadExposed: false;
  readonly geometryExposed: false;
}

export interface FE011PreviewAttemptSuccess {
  readonly status: 'ok';
  readonly result: FE004ConsumerPreviewEngineResult;
}

export interface FE011PreviewAttemptRejected {
  readonly status: 'rejected';
  readonly rejection: FE011PreviewRejection;
}

export type FE011PreviewAttempt =
  | FE011PreviewAttemptSuccess
  | FE011PreviewAttemptRejected;

export interface FE011HostSafeBrowserPreviewEngine {
  readonly schemaVersion: 'fe011-host-safe-browser-preview-engine-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FE011_CONTRACT_VERSION;
  readonly engineState: 'preview_host_safe_attempt_only';
  readonly normalizationReceipt: {
    readonly successPayloadPreservedFromFE004: true;
    readonly rawInternalErrorsSuppressed: true;
    readonly multipleFaceInferenceAllowed: false;
    readonly captureQualityDecisionIssued: false;
  };
  readonly dataBoundary: {
    readonly rawExceptionMessageExposed: false;
    readonly rawExceptionStackExposed: false;
    readonly providerPayloadExposed: false;
    readonly landmarksExposed: false;
    readonly geometryExposed: false;
    readonly biometricEmbeddingExposed: false;
  };
  readonly authorityBoundary: {
    readonly consumesUpstreamAuthorityOnly: true;
    readonly performsResearchDecision: false;
    readonly performsValidationDecision: false;
    readonly captureQualityDecisionIssued: false;
    readonly anatomicalLateralityIssued: false;
    readonly classificationIssued: false;
    readonly traditionalInterpretationIssued: false;
    readonly claimIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly analyzeBlob: (
    request: FE010BrowserBlobAnalysisRequest,
  ) => Promise<FE011PreviewAttempt>;
  readonly close: () => Promise<FE011PreviewAttemptRejected | Readonly<{ status: 'closed' }>>;
}

export interface FE011HostSafeBrowserPreviewOpenSuccess {
  readonly status: 'ready';
  readonly engine: FE011HostSafeBrowserPreviewEngine;
}

export interface FE011HostSafeBrowserPreviewOpenRejected {
  readonly status: 'rejected';
  readonly rejection: FE011PreviewRejection;
}

export type FE011HostSafeBrowserPreviewOpenResult =
  | FE011HostSafeBrowserPreviewOpenSuccess
  | FE011HostSafeBrowserPreviewOpenRejected;

const NORMALIZATION_RECEIPT = Object.freeze({
  successPayloadPreservedFromFE004: true as const,
  rawInternalErrorsSuppressed: true as const,
  multipleFaceInferenceAllowed: false as const,
  captureQualityDecisionIssued: false as const,
});

const DATA_BOUNDARY = Object.freeze({
  rawExceptionMessageExposed: false as const,
  rawExceptionStackExposed: false as const,
  providerPayloadExposed: false as const,
  landmarksExposed: false as const,
  geometryExposed: false as const,
  biometricEmbeddingExposed: false as const,
});

const AUTHORITY_BOUNDARY = Object.freeze({
  consumesUpstreamAuthorityOnly: true as const,
  performsResearchDecision: false as const,
  performsValidationDecision: false as const,
  captureQualityDecisionIssued: false as const,
  anatomicalLateralityIssued: false as const,
  classificationIssued: false as const,
  traditionalInterpretationIssued: false as const,
  claimIssued: false as const,
  productionActivated: false as const,
  commerceActivated: false as const,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FE-011 ${message}`);
}

function rejection(
  code: FE011PreviewRejectionCode,
  stage: FE011PreviewRejectionStage,
): FE011PreviewAttemptRejected {
  return Object.freeze({
    status: 'rejected' as const,
    rejection: Object.freeze({
      code,
      stage,
      internalErrorMessageExposed: false as const,
      internalStackExposed: false as const,
      providerPayloadExposed: false as const,
      geometryExposed: false as const,
    }),
  });
}

function stageForCode(code: FE011PreviewRejectionCode): FE011PreviewRejectionStage {
  switch (code) {
    case 'INVALID_CONFIGURATION':
    case 'ENGINE_INITIALIZATION_FAILED':
      return 'open';
    case 'INVALID_IMAGE_INPUT':
    case 'UNSUPPORTED_IMAGE_TYPE':
    case 'BROWSER_CAPABILITY_UNAVAILABLE':
    case 'IMAGE_DIGEST_FAILED':
    case 'IMAGE_DECODE_FAILED':
      return 'ingress';
    case 'NO_FACE_DETECTED':
    case 'INVALID_PROVIDER_GEOMETRY':
    case 'ENGINE_RUNTIME_FAILED':
      return 'analysis';
    case 'SESSION_CLOSED':
      return 'lifecycle';
  }
}

function normalizeFE010Error(error: unknown): FE011PreviewAttemptRejected {
  if (!(error instanceof FE010BrowserBlobPreviewError)) {
    return rejection('ENGINE_RUNTIME_FAILED', 'analysis');
  }

  const code: FE011PreviewRejectionCode =
    error.code === 'INVALID_CONFIG'
      ? 'INVALID_CONFIGURATION'
      : error.code;
  return rejection(code, stageForCode(code));
}

function wrapEngine(inner: FE010BrowserBlobPreviewEngine): FE011HostSafeBrowserPreviewEngine {
  const engine: FE011HostSafeBrowserPreviewEngine = Object.freeze({
    schemaVersion: 'fe011-host-safe-browser-preview-engine-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FE011_CONTRACT_VERSION,
    engineState: 'preview_host_safe_attempt_only' as const,
    normalizationReceipt: NORMALIZATION_RECEIPT,
    dataBoundary: DATA_BOUNDARY,
    authorityBoundary: AUTHORITY_BOUNDARY,
    async analyzeBlob(request: FE010BrowserBlobAnalysisRequest): Promise<FE011PreviewAttempt> {
      try {
        const result = await inner.analyzeBlob(request);
        return Object.freeze({
          status: 'ok' as const,
          result,
        });
      } catch (error) {
        return normalizeFE010Error(error);
      }
    },
    async close(): Promise<FE011PreviewAttemptRejected | Readonly<{ status: 'closed' }>> {
      try {
        await inner.close();
        return Object.freeze({ status: 'closed' as const });
      } catch {
        return rejection('ENGINE_RUNTIME_FAILED', 'lifecycle');
      }
    },
  });

  assertHostSafeBrowserPreviewFaceEngineFE011(engine);
  return engine;
}

export async function openHostSafeBrowserPreviewFaceEngineFE011(
  config: FE010BrowserBlobPreviewEngineConfig = {
    schemaVersion: 'fe010-browser-blob-preview-engine-config-v1',
  },
): Promise<FE011HostSafeBrowserPreviewOpenResult> {
  try {
    const inner = await createBrowserBlobConsumerPreviewFaceEngineFE010(config);
    return Object.freeze({
      status: 'ready' as const,
      engine: wrapEngine(inner),
    });
  } catch (error) {
    if (
      error instanceof FE010BrowserBlobPreviewError &&
      error.code === 'INVALID_CONFIG'
    ) {
      return Object.freeze({
        status: 'rejected' as const,
        rejection: rejection('INVALID_CONFIGURATION', 'open').rejection,
      });
    }
    return Object.freeze({
      status: 'rejected' as const,
      rejection: rejection('ENGINE_INITIALIZATION_FAILED', 'open').rejection,
    });
  }
}

export function assertHostSafeBrowserPreviewFaceEngineFE011(
  engine: FE011HostSafeBrowserPreviewEngine,
): void {
  if (
    engine.schemaVersion !== 'fe011-host-safe-browser-preview-engine-v1' ||
    engine.artifactVersion !== '0.1.0' ||
    engine.contractVersion !== FE011_CONTRACT_VERSION ||
    engine.engineState !== 'preview_host_safe_attempt_only' ||
    engine.normalizationReceipt.successPayloadPreservedFromFE004 !== true ||
    engine.normalizationReceipt.rawInternalErrorsSuppressed !== true ||
    engine.normalizationReceipt.multipleFaceInferenceAllowed !== false ||
    engine.normalizationReceipt.captureQualityDecisionIssued !== false ||
    typeof engine.analyzeBlob !== 'function' ||
    typeof engine.close !== 'function'
  ) {
    fail('host-safe preview engine identity or normalization receipt drift.');
  }

  if (Object.values(engine.dataBoundary).some((value) => value !== false)) {
    fail('host-safe preview data boundary widened.');
  }

  if (
    engine.authorityBoundary.consumesUpstreamAuthorityOnly !== true ||
    Object.entries(engine.authorityBoundary)
      .filter(([key]) => key !== 'consumesUpstreamAuthorityOnly')
      .some(([, value]) => value !== false)
  ) {
    fail('host-safe preview authority widened.');
  }
}
