import type { FE004ConsumerPreviewEngineResult } from './consumer-preview-engine-facade-fe004.js';
import type {
  FE010BrowserBlobPreviewEngineConfig,
} from './browser-blob-preview-engine-fe010.js';
import {
  openHostSafeBrowserPreviewFaceEngineFE011,
  type FE011PreviewRejection,
} from './host-safe-browser-preview-engine-fe011.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FE013_CONTRACT_VERSION =
  'FE013-ONE-SHOT-HOST-SAFE-BROWSER-PREVIEW-v1' as const;

export interface FE013OneShotBrowserPreviewRequest {
  readonly schemaVersion: 'fe013-one-shot-browser-preview-request-v1';
  readonly blob: Blob;
}

export interface FE013OneShotLifecycleReceipt {
  readonly engineOpened: boolean;
  readonly analysisAttempted: boolean;
  readonly closeAttempted: boolean;
  readonly closeSucceeded: boolean;
  readonly cleanupFailureSuppressed: boolean;
}

export interface FE013OneShotBrowserPreviewSuccess {
  readonly schemaVersion: 'fe013-one-shot-browser-preview-success-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FE013_CONTRACT_VERSION;
  readonly status: 'ok';
  readonly result: FE004ConsumerPreviewEngineResult;
  readonly lifecycle: FE013OneShotLifecycleReceipt & {
    readonly engineOpened: true;
    readonly analysisAttempted: true;
    readonly closeAttempted: true;
    readonly closeSucceeded: true;
    readonly cleanupFailureSuppressed: false;
  };
}

export interface FE013OneShotBrowserPreviewRejected {
  readonly schemaVersion: 'fe013-one-shot-browser-preview-rejected-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FE013_CONTRACT_VERSION;
  readonly status: 'rejected';
  readonly primaryPhase: 'open' | 'analysis' | 'lifecycle' | 'close';
  readonly rejection: FE011PreviewRejection;
  readonly lifecycle: FE013OneShotLifecycleReceipt;
}

export type FE013OneShotBrowserPreviewResult =
  | FE013OneShotBrowserPreviewSuccess
  | FE013OneShotBrowserPreviewRejected;

const INTERNAL_ERROR_REJECTION: FE011PreviewRejection = Object.freeze({
  code: 'ENGINE_RUNTIME_FAILED',
  stage: 'analysis',
  internalErrorMessageExposed: false,
  internalStackExposed: false,
  providerPayloadExposed: false,
  geometryExposed: false,
});

const INTERNAL_CLOSE_REJECTION: FE011PreviewRejection = Object.freeze({
  code: 'ENGINE_RUNTIME_FAILED',
  stage: 'lifecycle',
  internalErrorMessageExposed: false,
  internalStackExposed: false,
  providerPayloadExposed: false,
  geometryExposed: false,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FE-013 ${message}`);
}

function assertRequest(request: FE013OneShotBrowserPreviewRequest): void {
  if (typeof request !== 'object' || request === null) {
    fail('request must be an object.');
  }
  const allowed = new Set(['schemaVersion', 'blob']);
  const unexpected = Object.keys(request).find((key) => !allowed.has(key));
  if (unexpected !== undefined) {
    fail(`request contains unauthorized field: ${unexpected}.`);
  }
  if (request.schemaVersion !== 'fe013-one-shot-browser-preview-request-v1') {
    fail('request schemaVersion is unsupported.');
  }
}

function rejected(
  primaryPhase: FE013OneShotBrowserPreviewRejected['primaryPhase'],
  rejection: FE011PreviewRejection,
  lifecycle: FE013OneShotLifecycleReceipt,
): FE013OneShotBrowserPreviewRejected {
  return Object.freeze({
    schemaVersion: 'fe013-one-shot-browser-preview-rejected-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FE013_CONTRACT_VERSION,
    status: 'rejected' as const,
    primaryPhase,
    rejection,
    lifecycle: Object.freeze({ ...lifecycle }),
  });
}

export async function runOneShotHostSafeBrowserPreviewFE013(
  request: FE013OneShotBrowserPreviewRequest,
  config: FE010BrowserBlobPreviewEngineConfig = {
    schemaVersion: 'fe010-browser-blob-preview-engine-config-v1',
  },
): Promise<FE013OneShotBrowserPreviewResult> {
  assertRequest(request);

  const opened = await openHostSafeBrowserPreviewFaceEngineFE011(config);
  if (opened.status === 'rejected') {
    return rejected('open', opened.rejection, {
      engineOpened: false,
      analysisAttempted: false,
      closeAttempted: false,
      closeSucceeded: false,
      cleanupFailureSuppressed: false,
    });
  }

  let analysis:
    | Readonly<{ status: 'ok'; result: FE004ConsumerPreviewEngineResult }>
    | Readonly<{ status: 'rejected'; rejection: FE011PreviewRejection }>;

  try {
    analysis = await opened.engine.analyzeBlob({
      schemaVersion: 'fe010-browser-blob-analysis-request-v1',
      blob: request.blob,
    });
  } catch {
    analysis = Object.freeze({
      status: 'rejected' as const,
      rejection: INTERNAL_ERROR_REJECTION,
    });
  }

  let closeResult:
    | Readonly<{ status: 'closed' }>
    | Readonly<{ status: 'rejected'; rejection: FE011PreviewRejection }>;

  try {
    closeResult = await opened.engine.close();
  } catch {
    closeResult = Object.freeze({
      status: 'rejected' as const,
      rejection: INTERNAL_CLOSE_REJECTION,
    });
  }

  if (analysis.status === 'ok') {
    if (closeResult.status === 'rejected') {
      return rejected('close', closeResult.rejection, {
        engineOpened: true,
        analysisAttempted: true,
        closeAttempted: true,
        closeSucceeded: false,
        cleanupFailureSuppressed: false,
      });
    }

    return Object.freeze({
      schemaVersion: 'fe013-one-shot-browser-preview-success-v1' as const,
      artifactVersion: '0.1.0' as const,
      contractVersion: FE013_CONTRACT_VERSION,
      status: 'ok' as const,
      result: analysis.result,
      lifecycle: Object.freeze({
        engineOpened: true as const,
        analysisAttempted: true as const,
        closeAttempted: true as const,
        closeSucceeded: true as const,
        cleanupFailureSuppressed: false as const,
      }),
    });
  }

  const closeFailed = closeResult.status === 'rejected';
  return rejected(
    analysis.rejection.stage === 'lifecycle' ? 'lifecycle' : 'analysis',
    analysis.rejection,
    {
      engineOpened: true,
      analysisAttempted: true,
      closeAttempted: true,
      closeSucceeded: !closeFailed,
      cleanupFailureSuppressed: closeFailed,
    },
  );
}

export function assertOneShotHostSafeBrowserPreviewResultFE013(
  result: FE013OneShotBrowserPreviewResult,
): void {
  if (
    result.artifactVersion !== '0.1.0' ||
    result.contractVersion !== FE013_CONTRACT_VERSION
  ) {
    fail('one-shot result identity drift.');
  }

  if (result.status === 'ok') {
    if (
      result.schemaVersion !== 'fe013-one-shot-browser-preview-success-v1' ||
      result.lifecycle.engineOpened !== true ||
      result.lifecycle.analysisAttempted !== true ||
      result.lifecycle.closeAttempted !== true ||
      result.lifecycle.closeSucceeded !== true ||
      result.lifecycle.cleanupFailureSuppressed !== false
    ) {
      fail('success lifecycle receipt drift.');
    }
    return;
  }

  if (result.schemaVersion !== 'fe013-one-shot-browser-preview-rejected-v1') {
    fail('rejected result identity drift.');
  }
  if (
    result.rejection.internalErrorMessageExposed !== false ||
    result.rejection.internalStackExposed !== false ||
    result.rejection.providerPayloadExposed !== false ||
    result.rejection.geometryExposed !== false
  ) {
    fail('rejected result leaked internal execution detail.');
  }
  if (!result.lifecycle.engineOpened && result.lifecycle.closeAttempted) {
    fail('close cannot be attempted when engine open failed.');
  }
  if (result.lifecycle.closeSucceeded && !result.lifecycle.closeAttempted) {
    fail('close success requires a close attempt.');
  }
}
