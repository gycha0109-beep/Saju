import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { FE004ConsumerPreviewEngineResult } from './consumer-preview-engine-facade-fe004.js';
import {
  FE010BrowserBlobPreviewError,
  type FE010BrowserBlobPreviewEngine,
} from './browser-blob-preview-engine-fe010.js';
import {
  assertHostSafeBrowserPreviewFaceEngineFE011,
  openHostSafeBrowserPreviewFaceEngineFE011,
  type FE011HostSafeBrowserPreviewEngine,
} from './host-safe-browser-preview-engine-fe011.js';

const mocks = vi.hoisted(() => ({
  createFE010: vi.fn(),
  analyzeBlob: vi.fn(),
  close: vi.fn(),
}));

vi.mock('./browser-blob-preview-engine-fe010.js', async (importOriginal) => {
  const actual = await importOriginal<
    typeof import('./browser-blob-preview-engine-fe010.js')
  >();
  return {
    ...actual,
    createBrowserBlobConsumerPreviewFaceEngineFE010: mocks.createFE010,
  };
});

function result(): FE004ConsumerPreviewEngineResult {
  return {
    schemaVersion: 'fe004-consumer-preview-engine-result-v1',
    artifactVersion: '0.1.0',
    contractVersion: 'FE004-CONSUMER-PREVIEW-ENGINE-FACADE-v1',
    engineState: 'preview_consumer_facade_only',
    providerRunRef: 'fe011:test',
    canonicalAssetDigest: `sha256:${'a'.repeat(64)}`,
  } as FE004ConsumerPreviewEngineResult;
}

function inner(): FE010BrowserBlobPreviewEngine {
  return {
    analyzeBlob: mocks.analyzeBlob,
    close: mocks.close,
  } as unknown as FE010BrowserBlobPreviewEngine;
}

async function readyEngine(): Promise<FE011HostSafeBrowserPreviewEngine> {
  const opened = await openHostSafeBrowserPreviewFaceEngineFE011();
  expect(opened.status).toBe('ready');
  if (opened.status !== 'ready') throw new Error('expected ready FE011 engine');
  return opened.engine;
}

describe('FE011 host-safe browser preview attempt envelope', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.createFE010.mockResolvedValue(inner());
    mocks.analyzeBlob.mockResolvedValue(result());
    mocks.close.mockResolvedValue(undefined);
  });

  it('preserves the exact FE004 success result without widening the payload', async () => {
    const expected = result();
    mocks.analyzeBlob.mockResolvedValue(expected);
    const engine = await readyEngine();

    const attempt = await engine.analyzeBlob({
      schemaVersion: 'fe010-browser-blob-analysis-request-v1',
      blob: new Blob(['ok'], { type: 'image/png' }),
    });

    expect(attempt).toEqual({
      status: 'ok',
      result: expected,
    });
    if (attempt.status === 'ok') {
      expect(attempt.result).toBe(expected);
    }
    expect(() => assertHostSafeBrowserPreviewFaceEngineFE011(engine)).not.toThrow();
    await engine.close();
  });

  it.each([
    ['INVALID_IMAGE_INPUT', 'ingress'],
    ['UNSUPPORTED_IMAGE_TYPE', 'ingress'],
    ['BROWSER_CAPABILITY_UNAVAILABLE', 'ingress'],
    ['IMAGE_DIGEST_FAILED', 'ingress'],
    ['IMAGE_DECODE_FAILED', 'ingress'],
    ['NO_FACE_DETECTED', 'analysis'],
    ['INVALID_PROVIDER_GEOMETRY', 'analysis'],
    ['ENGINE_RUNTIME_FAILED', 'analysis'],
    ['SESSION_CLOSED', 'lifecycle'],
  ] as const)('normalizes FE010 %s without exposing internal text', async (code, stage) => {
    mocks.analyzeBlob.mockRejectedValue(
      new FE010BrowserBlobPreviewError(code, 'sensitive internal detail'),
    );
    const engine = await readyEngine();

    const attempt = await engine.analyzeBlob({
      schemaVersion: 'fe010-browser-blob-analysis-request-v1',
      blob: new Blob(['x'], { type: 'image/png' }),
    });

    expect(attempt).toEqual({
      status: 'rejected',
      rejection: {
        code,
        stage,
        internalErrorMessageExposed: false,
        internalStackExposed: false,
        providerPayloadExposed: false,
        geometryExposed: false,
      },
    });
    expect(JSON.stringify(attempt)).not.toContain('sensitive internal detail');
    await engine.close();
  });

  it('fails closed to ENGINE_RUNTIME_FAILED for unknown analysis exceptions', async () => {
    mocks.analyzeBlob.mockRejectedValue(new Error('provider secret failure'));
    const engine = await readyEngine();

    const attempt = await engine.analyzeBlob({
      schemaVersion: 'fe010-browser-blob-analysis-request-v1',
      blob: new Blob(['x'], { type: 'image/jpeg' }),
    });

    expect(attempt).toEqual({
      status: 'rejected',
      rejection: {
        code: 'ENGINE_RUNTIME_FAILED',
        stage: 'analysis',
        internalErrorMessageExposed: false,
        internalStackExposed: false,
        providerPayloadExposed: false,
        geometryExposed: false,
      },
    });
    expect(JSON.stringify(attempt)).not.toContain('provider secret failure');
    await engine.close();
  });

  it('normalizes engine-open failures without publishing a partial engine', async () => {
    mocks.createFE010.mockRejectedValueOnce(
      new FE010BrowserBlobPreviewError('INVALID_CONFIG', 'bad config internals'),
    );
    await expect(openHostSafeBrowserPreviewFaceEngineFE011()).resolves.toEqual({
      status: 'rejected',
      rejection: {
        code: 'INVALID_CONFIGURATION',
        stage: 'open',
        internalErrorMessageExposed: false,
        internalStackExposed: false,
        providerPayloadExposed: false,
        geometryExposed: false,
      },
    });

    mocks.createFE010.mockRejectedValueOnce(new Error('network/model internals'));
    const failed = await openHostSafeBrowserPreviewFaceEngineFE011();
    expect(failed).toEqual({
      status: 'rejected',
      rejection: {
        code: 'ENGINE_INITIALIZATION_FAILED',
        stage: 'open',
        internalErrorMessageExposed: false,
        internalStackExposed: false,
        providerPayloadExposed: false,
        geometryExposed: false,
      },
    });
    expect(JSON.stringify(failed)).not.toContain('network/model internals');
  });

  it('suppresses close failures and rejects authority widening', async () => {
    mocks.close.mockRejectedValue(new Error('close internals'));
    const engine = await readyEngine();

    await expect(engine.close()).resolves.toEqual({
      status: 'rejected',
      rejection: {
        code: 'ENGINE_RUNTIME_FAILED',
        stage: 'lifecycle',
        internalErrorMessageExposed: false,
        internalStackExposed: false,
        providerPayloadExposed: false,
        geometryExposed: false,
      },
    });

    const forged = {
      ...engine,
      authorityBoundary: {
        ...engine.authorityBoundary,
        classificationIssued: true,
      },
    } as unknown as FE011HostSafeBrowserPreviewEngine;

    expect(() => assertHostSafeBrowserPreviewFaceEngineFE011(forged))
      .toThrow(/authority widened/u);
  });
});