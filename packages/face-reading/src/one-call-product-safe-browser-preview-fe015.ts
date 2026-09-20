import type { FE010BrowserBlobPreviewEngineConfig } from './browser-blob-preview-engine-fe010.js';
import {
  FE013_CONTRACT_VERSION,
  runOneShotHostSafeBrowserPreviewFE013,
  type FE013OneShotBrowserPreviewRejected,
  type FE013OneShotBrowserPreviewRequest,
} from './one-shot-browser-preview-engine-fe013.js';
import {
  projectProductSafeBrowserPreviewTransportFE014,
  type FE014ProductSafePreviewTransport,
} from './product-safe-preview-transport-fe014.js';

export const FE015_CONTRACT_VERSION =
  'FE015-ONE-CALL-PRODUCT-SAFE-BROWSER-PREVIEW-v1' as const;

function unexpectedFailure(): FE013OneShotBrowserPreviewRejected {
  return Object.freeze({
    schemaVersion: 'fe013-one-shot-browser-preview-rejected-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FE013_CONTRACT_VERSION,
    status: 'rejected' as const,
    primaryPhase: 'lifecycle' as const,
    rejection: Object.freeze({
      code: 'ENGINE_RUNTIME_FAILED' as const,
      stage: 'lifecycle' as const,
      internalErrorMessageExposed: false as const,
      internalStackExposed: false as const,
      providerPayloadExposed: false as const,
      geometryExposed: false as const,
    }),
    lifecycle: Object.freeze({
      engineOpened: false,
      analysisAttempted: false,
      closeAttempted: false,
      closeSucceeded: false,
      cleanupFailureSuppressed: false,
    }),
  });
}

export async function runProductSafeBrowserPreviewFE015(
  request: FE013OneShotBrowserPreviewRequest,
  config: FE010BrowserBlobPreviewEngineConfig = {
    schemaVersion: 'fe010-browser-blob-preview-engine-config-v1',
  },
): Promise<FE014ProductSafePreviewTransport> {
  try {
    const oneShot = await runOneShotHostSafeBrowserPreviewFE013(request, config);
    return projectProductSafeBrowserPreviewTransportFE014(oneShot);
  } catch {
    return projectProductSafeBrowserPreviewTransportFE014(unexpectedFailure());
  }
}
