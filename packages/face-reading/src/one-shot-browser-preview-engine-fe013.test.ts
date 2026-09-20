import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { FE004ConsumerPreviewEngineResult } from './consumer-preview-engine-facade-fe004.js';
import type {
  FE011HostSafeBrowserPreviewEngine,
  FE011PreviewRejection,
} from './host-safe-browser-preview-engine-fe011.js';
import {
  assertOneShotHostSafeBrowserPreviewResultFE013,
  runOneShotHostSafeBrowserPreviewFE013,
} from './one-shot-browser-preview-engine-fe013.js';

const mocks = vi.hoisted(() => ({
  open: vi.fn(),
  analyzeBlob: vi.fn(),
  close: vi.fn(),
}));

vi.mock('./host-safe-browser-preview-engine-fe011.js', () => ({
  openHostSafeBrowserPreviewFaceEngineFE011: mocks.open,
}));

const SAFE_REJECTION: FE011PreviewRejection = {
  code: 'NO_FACE_DETECTED',
  stage: 'analysis',
  internalErrorMessageExposed: false,
  internalStackExposed: false,
  providerPayloadExposed: false,
  geometryExposed: false,
};

function result(): FE004ConsumerPreviewEngineResult {
  return {
    schemaVersion: 'fe004-consumer-preview-engine-result-v1',
    artifactVersion: '0.1.0',
    contractVersion: 'FE004-CONSUMER-PREVIEW-ENGINE-FACADE-v1',
    engineState: 'preview_consumer_facade_only',
    providerRunRef: 'fe013:test',
    canonicalAssetDigest: `sha256:${'a'.repeat(64)}`,
  } as FE004ConsumerPreviewEngineResult;
}

function engine(): FE011HostSafeBrowserPreviewEngine {
  return {
    analyzeBlob: mocks.analyzeBlob,
    close: mocks.close,
  } as unknown as FE011HostSafeBrowserPreviewEngine;
}

describe('FE013 one-shot host-safe browser preview runner', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.open.mockResolvedValue({
      status: 'ready',
      engine: engine(),
    });
    mocks.analyzeBlob.mockResolvedValue({
      status: 'ok',
      result: result(),
    });
    mocks.close.mockResolvedValue({ status: 'closed' });
  });

  it('opens, analyzes exactly once, closes, and returns the FE004 result on full success', async () => {
    const expected = result();
    mocks.analyzeBlob.mockResolvedValue({ status: 'ok', result: expected });

    const output = await runOneShotHostSafeBrowserPreviewFE013({
      schemaVersion: 'fe013-one-shot-browser-preview-request-v1',
      blob: new Blob(['ok'], { type: 'image/png' }),
    });

    expect(mocks.open).toHaveBeenCalledTimes(1);
    expect(mocks.analyzeBlob).toHaveBeenCalledTimes(1);
    expect(mocks.close).toHaveBeenCalledTimes(1);
    expect(output).toEqual({
      schemaVersion: 'fe013-one-shot-browser-preview-success-v1',
      artifactVersion: '0.1.0',
      contractVersion: 'FE013-ONE-SHOT-HOST-SAFE-BROWSER-PREVIEW-v1',
      status: 'ok',
      result: expected,
      lifecycle: {
        engineOpened: true,
        analysisAttempted: true,
        closeAttempted: true,
        closeSucceeded: true,
        cleanupFailureSuppressed: false,
      },
    });
    expect(() => assertOneShotHostSafeBrowserPreviewResultFE013(output)).not.toThrow();
  });

  it('returns open rejection without attempting analysis or close', async () => {
    mocks.open.mockResolvedValue({
      status: 'rejected',
      rejection: {
        ...SAFE_REJECTION,
        code: 'ENGINE_INITIALIZATION_FAILED',
        stage: 'open',
      },
    });

    const output = await runOneShotHostSafeBrowserPreviewFE013({
      schemaVersion: 'fe013-one-shot-browser-preview-request-v1',
      blob: new Blob(['x'], { type: 'image/jpeg' }),
    });

    expect(output).toMatchObject({
      status: 'rejected',
      primaryPhase: 'open',
      rejection: {
        code: 'ENGINE_INITIALIZATION_FAILED',
        stage: 'open',
      },
      lifecycle: {
        engineOpened: false,
        analysisAttempted: false,
        closeAttempted: false,
        closeSucceeded: false,
        cleanupFailureSuppressed: false,
      },
    });
    expect(mocks.analyzeBlob).not.toHaveBeenCalled();
    expect(mocks.close).not.toHaveBeenCalled();
  });

  it('always closes after an analysis rejection and preserves that rejection', async () => {
    mocks.analyzeBlob.mockResolvedValue({
      status: 'rejected',
      rejection: SAFE_REJECTION,
    });

    const output = await runOneShotHostSafeBrowserPreviewFE013({
      schemaVersion: 'fe013-one-shot-browser-preview-request-v1',
      blob: new Blob(['no-face'], { type: 'image/webp' }),
    });

    expect(mocks.close).toHaveBeenCalledTimes(1);
    expect(output).toMatchObject({
      status: 'rejected',
      primaryPhase: 'analysis',
      rejection: SAFE_REJECTION,
      lifecycle: {
        engineOpened: true,
        analysisAttempted: true,
        closeAttempted: true,
        closeSucceeded: true,
        cleanupFailureSuppressed: false,
      },
    });
  });

  it('fails closed on cleanup failure after successful analysis', async () => {
    mocks.close.mockResolvedValue({
      status: 'rejected',
      rejection: {
        ...SAFE_REJECTION,
        code: 'ENGINE_RUNTIME_FAILED',
        stage: 'lifecycle',
      },
    });

    const output = await runOneShotHostSafeBrowserPreviewFE013({
      schemaVersion: 'fe013-one-shot-browser-preview-request-v1',
      blob: new Blob(['ok-but-close-fails'], { type: 'image/png' }),
    });

    expect(output).toMatchObject({
      status: 'rejected',
      primaryPhase: 'close',
      rejection: {
        code: 'ENGINE_RUNTIME_FAILED',
        stage: 'lifecycle',
      },
      lifecycle: {
        engineOpened: true,
        analysisAttempted: true,
        closeAttempted: true,
        closeSucceeded: false,
        cleanupFailureSuppressed: false,
      },
    });
    expect(output).not.toHaveProperty('result');
  });

  it('preserves analysis rejection when cleanup also fails and exposes only a cleanup boolean', async () => {
    mocks.analyzeBlob.mockResolvedValue({
      status: 'rejected',
      rejection: SAFE_REJECTION,
    });
    mocks.close.mockResolvedValue({
      status: 'rejected',
      rejection: {
        ...SAFE_REJECTION,
        code: 'ENGINE_RUNTIME_FAILED',
        stage: 'lifecycle',
      },
    });

    const output = await runOneShotHostSafeBrowserPreviewFE013({
      schemaVersion: 'fe013-one-shot-browser-preview-request-v1',
      blob: new Blob(['no-face-and-close-fails'], { type: 'image/jpeg' }),
    });

    expect(output).toMatchObject({
      status: 'rejected',
      primaryPhase: 'analysis',
      rejection: SAFE_REJECTION,
      lifecycle: {
        closeAttempted: true,
        closeSucceeded: false,
        cleanupFailureSuppressed: true,
      },
    });
    expect(JSON.stringify(output)).not.toContain('close internals');
  });

  it('suppresses unexpected analysis and close exceptions', async () => {
    mocks.analyzeBlob.mockRejectedValue(new Error('analysis internals'));
    mocks.close.mockRejectedValue(new Error('close internals'));

    const output = await runOneShotHostSafeBrowserPreviewFE013({
      schemaVersion: 'fe013-one-shot-browser-preview-request-v1',
      blob: new Blob(['x'], { type: 'image/png' }),
    });

    expect(output).toMatchObject({
      status: 'rejected',
      primaryPhase: 'analysis',
      rejection: {
        code: 'ENGINE_RUNTIME_FAILED',
        stage: 'analysis',
        internalErrorMessageExposed: false,
        internalStackExposed: false,
      },
      lifecycle: {
        closeAttempted: true,
        closeSucceeded: false,
        cleanupFailureSuppressed: true,
      },
    });
    const serialized = JSON.stringify(output);
    expect(serialized).not.toContain('analysis internals');
    expect(serialized).not.toContain('close internals');
  });
});
