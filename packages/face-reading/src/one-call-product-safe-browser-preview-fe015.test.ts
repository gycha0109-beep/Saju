import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { FE014ProductSafePreviewTransport } from './product-safe-preview-transport-fe014.js';
import { runProductSafeBrowserPreviewFE015 } from './one-call-product-safe-browser-preview-fe015.js';

const mocks = vi.hoisted(() => ({
  runOneShot: vi.fn(),
  project: vi.fn(),
}));

vi.mock('./one-shot-browser-preview-engine-fe013.js', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./one-shot-browser-preview-engine-fe013.js')>();
  return {
    ...actual,
    runOneShotHostSafeBrowserPreviewFE013: mocks.runOneShot,
  };
});

vi.mock('./product-safe-preview-transport-fe014.js', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./product-safe-preview-transport-fe014.js')>();
  return {
    ...actual,
    projectProductSafeBrowserPreviewTransportFE014: mocks.project,
  };
});

const PRODUCT_SAFE_REJECTED: FE014ProductSafePreviewTransport = {
  schemaVersion: 'fe014-product-safe-preview-transport-rejected-v1',
  artifactVersion: '0.1.0',
  contractVersion: 'FE014-PRODUCT-SAFE-NEUTRAL-PREVIEW-TRANSPORT-v1',
  status: 'rejected',
  rejection: {
    code: 'NO_FACE_DETECTED',
    stage: 'analysis',
    primaryPhase: 'analysis',
    cleanupFailureSuppressed: false,
  },
  transportReceipt: {
    sourceContractVersion: 'FE013-ONE-SHOT-HOST-SAFE-BROWSER-PREVIEW-v1',
    sourceConsumerProjectionSchemaVersion: null,
    providerRunRefOmitted: true,
    canonicalAssetDigestOmitted: true,
    fe004ExecutionReceiptOmitted: true,
    rawInternalErrorsOmitted: true,
    rawProviderPayloadOmitted: true,
    rawGeometryOmitted: true,
    jsonSafePlainDataOnly: true,
  },
  authorityBoundary: {
    consumesUpstreamNeutralObservationOnly: true,
    performsResearchDecision: false,
    performsValidationDecision: false,
    classificationIssued: false,
    scoreIssued: false,
    rankIssued: false,
    traditionalInterpretationIssued: false,
    physiognomyClaimIssued: false,
    fortuneClaimIssued: false,
    productionActivated: false,
    commerceActivated: false,
  },
};

describe('FE015 one-call product-safe browser preview API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('invokes FE013 once and FE014 once, returning only the FE014 transport', async () => {
    const oneShot = {
      schemaVersion: 'fe013-one-shot-browser-preview-rejected-v1',
      artifactVersion: '0.1.0',
      contractVersion: 'FE013-ONE-SHOT-HOST-SAFE-BROWSER-PREVIEW-v1',
      status: 'rejected',
      primaryPhase: 'analysis',
      rejection: {
        code: 'NO_FACE_DETECTED',
        stage: 'analysis',
        internalErrorMessageExposed: false,
        internalStackExposed: false,
        providerPayloadExposed: false,
        geometryExposed: false,
      },
      lifecycle: {
        engineOpened: true,
        analysisAttempted: true,
        closeAttempted: true,
        closeSucceeded: true,
        cleanupFailureSuppressed: false,
      },
    };
    mocks.runOneShot.mockResolvedValue(oneShot);
    mocks.project.mockReturnValue(PRODUCT_SAFE_REJECTED);

    const request = {
      schemaVersion: 'fe013-one-shot-browser-preview-request-v1' as const,
      blob: new Blob(['face'], { type: 'image/png' }),
    };
    const config = {
      schemaVersion: 'fe010-browser-blob-preview-engine-config-v1' as const,
    };

    const output = await runProductSafeBrowserPreviewFE015(request, config);

    expect(mocks.runOneShot).toHaveBeenCalledTimes(1);
    expect(mocks.runOneShot).toHaveBeenCalledWith(request, config);
    expect(mocks.project).toHaveBeenCalledTimes(1);
    expect(mocks.project).toHaveBeenCalledWith(oneShot);
    expect(output).toBe(PRODUCT_SAFE_REJECTED);
  });

  it('fail-closes unexpected FE013 exceptions through an FE014-safe rejection projection', async () => {
    mocks.runOneShot.mockRejectedValue(new Error('raw internal failure'));
    mocks.project.mockImplementation((input) => {
      expect(input).toMatchObject({
        schemaVersion: 'fe013-one-shot-browser-preview-rejected-v1',
        status: 'rejected',
        primaryPhase: 'lifecycle',
        rejection: {
          code: 'ENGINE_RUNTIME_FAILED',
          stage: 'lifecycle',
          internalErrorMessageExposed: false,
          internalStackExposed: false,
          providerPayloadExposed: false,
          geometryExposed: false,
        },
        lifecycle: {
          engineOpened: false,
          analysisAttempted: false,
          closeAttempted: false,
          closeSucceeded: false,
          cleanupFailureSuppressed: false,
        },
      });
      return PRODUCT_SAFE_REJECTED;
    });

    const output = await runProductSafeBrowserPreviewFE015({
      schemaVersion: 'fe013-one-shot-browser-preview-request-v1',
      blob: new Blob(['x'], { type: 'image/jpeg' }),
    });

    expect(mocks.runOneShot).toHaveBeenCalledTimes(1);
    expect(mocks.project).toHaveBeenCalledTimes(1);
    expect(output).toBe(PRODUCT_SAFE_REJECTED);
    expect(JSON.stringify(output)).not.toContain('raw internal failure');
  });

  it('fail-closes unexpected FE014 projection errors without surfacing the exception', async () => {
    mocks.runOneShot.mockResolvedValue({
      schemaVersion: 'fe013-one-shot-browser-preview-rejected-v1',
      artifactVersion: '0.1.0',
      contractVersion: 'FE013-ONE-SHOT-HOST-SAFE-BROWSER-PREVIEW-v1',
      status: 'rejected',
      primaryPhase: 'analysis',
      rejection: {
        code: 'NO_FACE_DETECTED',
        stage: 'analysis',
        internalErrorMessageExposed: false,
        internalStackExposed: false,
        providerPayloadExposed: false,
        geometryExposed: false,
      },
      lifecycle: {
        engineOpened: true,
        analysisAttempted: true,
        closeAttempted: true,
        closeSucceeded: true,
        cleanupFailureSuppressed: false,
      },
    });

    let calls = 0;
    mocks.project.mockImplementation(() => {
      calls += 1;
      if (calls === 1) throw new Error('projection internals');
      return PRODUCT_SAFE_REJECTED;
    });

    const output = await runProductSafeBrowserPreviewFE015({
      schemaVersion: 'fe013-one-shot-browser-preview-request-v1',
      blob: new Blob(['x'], { type: 'image/webp' }),
    });

    expect(mocks.project).toHaveBeenCalledTimes(2);
    expect(output).toBe(PRODUCT_SAFE_REJECTED);
    expect(JSON.stringify(output)).not.toContain('projection internals');
  });
});
