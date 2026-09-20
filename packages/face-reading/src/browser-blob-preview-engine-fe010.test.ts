import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { FE004ConsumerPreviewEngineResult } from './consumer-preview-engine-facade-fe004.js';
import type { FE006PreviewImageRequest } from './bound-consumer-preview-engine-fe006.js';
import { FaceAuthorityValidationError } from './validation.js';
import {
  FE010BrowserBlobPreviewError,
  assertBrowserBlobConsumerPreviewFaceEngineFE010,
  createBrowserBlobConsumerPreviewFaceEngineFE010,
  type FE010BrowserBlobPreviewEngine,
  type FE010BrowserImageBitmapDecoder,
} from './browser-blob-preview-engine-fe010.js';

const mocks = vi.hoisted(() => ({
  analyze: vi.fn<(request: FE006PreviewImageRequest) => Promise<FE004ConsumerPreviewEngineResult>>(),
  close: vi.fn<() => Promise<void>>(),
  createRelease: vi.fn(),
}));

vi.mock('./release-managed-preview-engine-fe009.js', () => ({
  createReleaseManagedConsumerPreviewFaceEngineFE009: mocks.createRelease,
}));

function fakeResult(request: FE006PreviewImageRequest): FE004ConsumerPreviewEngineResult {
  return {
    providerRunRef: request.providerRunRef,
    canonicalAssetDigest: request.canonicalAssetDigest,
  } as FE004ConsumerPreviewEngineResult;
}

function decoder(
  state: { decode: number; bitmapClose: number },
  width = 640,
  height = 480,
): FE010BrowserImageBitmapDecoder {
  return {
    async decode() {
      state.decode += 1;
      return {
        width,
        height,
        close() {
          state.bitmapClose += 1;
        },
      };
    },
  };
}

describe('FE010 browser Blob preview ingress', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.analyze.mockImplementation(async (request) => fakeResult(request));
    mocks.close.mockResolvedValue(undefined);
    mocks.createRelease.mockImplementation(async () => ({
      analyze: mocks.analyze,
      close: mocks.close,
    }));
  });

  it('hashes the exact Blob bytes, derives bitmap dimensions, and closes the bitmap', async () => {
    const state = { decode: 0, bitmapClose: 0 };
    const engine = await createBrowserBlobConsumerPreviewFaceEngineFE010({
      schemaVersion: 'fe010-browser-blob-preview-engine-config-v1',
      bitmapDecoder: decoder(state, 820, 1024),
    });

    const result = await engine.analyzeBlob({
      schemaVersion: 'fe010-browser-blob-analysis-request-v1',
      blob: new Blob(['abc'], { type: 'image/png' }),
    });

    expect(state).toEqual({ decode: 1, bitmapClose: 1 });
    expect(mocks.analyze).toHaveBeenCalledTimes(1);
    const request = mocks.analyze.mock.calls[0]![0];
    expect(request.schemaVersion).toBe('fe006-preview-image-request-v1');
    expect(request.canonicalAssetDigest).toBe(
      'sha256:ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
    );
    expect(request.providerRunRef).toMatch(/^fe010:blob:1:[0-9a-f]{24}$/u);
    expect(request.frameWidth).toBe(820);
    expect(request.frameHeight).toBe(1024);
    expect(result.providerRunRef).toBe(request.providerRunRef);
    expect(result.canonicalAssetDigest).toBe(request.canonicalAssetDigest);

    await engine.close();
    expect(mocks.close).toHaveBeenCalledTimes(1);
  });

  it('serializes Blob decode and downstream analysis across the session', async () => {
    const state = { decode: 0, bitmapClose: 0 };
    let releaseFirst!: () => void;
    const firstGate = new Promise<void>((resolve) => {
      releaseFirst = resolve;
    });
    mocks.analyze
      .mockImplementationOnce(async (request) => {
        await firstGate;
        return fakeResult(request);
      })
      .mockImplementation(async (request) => fakeResult(request));

    const engine = await createBrowserBlobConsumerPreviewFaceEngineFE010({
      schemaVersion: 'fe010-browser-blob-preview-engine-config-v1',
      bitmapDecoder: decoder(state),
    });

    const first = engine.analyzeBlob({
      schemaVersion: 'fe010-browser-blob-analysis-request-v1',
      blob: new Blob(['first'], { type: 'image/jpeg' }),
    });
    const second = engine.analyzeBlob({
      schemaVersion: 'fe010-browser-blob-analysis-request-v1',
      blob: new Blob(['second'], { type: 'image/webp' }),
    });

    await vi.waitFor(() => {
      expect(mocks.analyze).toHaveBeenCalledTimes(1);
    });
    expect(state.decode).toBe(1);

    releaseFirst();
    await first;
    await second;

    expect(mocks.analyze).toHaveBeenCalledTimes(2);
    expect(state.decode).toBe(2);
    expect(state.bitmapClose).toBe(2);
    expect(mocks.analyze.mock.calls[0]![0].providerRunRef).toMatch(/:1:/u);
    expect(mocks.analyze.mock.calls[1]![0].providerRunRef).toMatch(/:2:/u);

    await engine.close();
  });

  it('drains queued analysis before close and rejects new work once close begins', async () => {
    const state = { decode: 0, bitmapClose: 0 };
    let release!: () => void;
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });
    mocks.analyze.mockImplementationOnce(async (request) => {
      await gate;
      return fakeResult(request);
    });

    const engine = await createBrowserBlobConsumerPreviewFaceEngineFE010({
      schemaVersion: 'fe010-browser-blob-preview-engine-config-v1',
      bitmapDecoder: decoder(state),
    });

    const active = engine.analyzeBlob({
      schemaVersion: 'fe010-browser-blob-analysis-request-v1',
      blob: new Blob(['active'], { type: 'image/png' }),
    });
    await vi.waitFor(() => {
      expect(mocks.analyze).toHaveBeenCalledTimes(1);
    });

    const closing = engine.close();
    await expect(engine.analyzeBlob({
      schemaVersion: 'fe010-browser-blob-analysis-request-v1',
      blob: new Blob(['late'], { type: 'image/png' }),
    })).rejects.toThrow(/session close has begun/u);

    expect(mocks.close).not.toHaveBeenCalled();
    release();
    await active;
    await closing;
    expect(state.bitmapClose).toBe(1);
    expect(mocks.close).toHaveBeenCalledTimes(1);

    await engine.close();
    expect(mocks.close).toHaveBeenCalledTimes(1);
  });

  it('fails closed for unsupported or empty Blob input before decode', async () => {
    const state = { decode: 0, bitmapClose: 0 };
    const engine = await createBrowserBlobConsumerPreviewFaceEngineFE010({
      schemaVersion: 'fe010-browser-blob-preview-engine-config-v1',
      bitmapDecoder: decoder(state),
    });

    await expect(engine.analyzeBlob({
      schemaVersion: 'fe010-browser-blob-analysis-request-v1',
      blob: new Blob(['x'], { type: 'image/gif' }),
    })).rejects.toMatchObject({
      code: 'UNSUPPORTED_IMAGE_TYPE',
    });

    await expect(engine.analyzeBlob({
      schemaVersion: 'fe010-browser-blob-analysis-request-v1',
      blob: new Blob([], { type: 'image/png' }),
    })).rejects.toMatchObject({
      code: 'INVALID_IMAGE_INPUT',
    });

    expect(state.decode).toBe(0);
    await engine.close();
  });

  it('types decode, no-face, and provider-geometry failures without leaking upstream errors', async () => {
    const decodeEngine = await createBrowserBlobConsumerPreviewFaceEngineFE010({
      schemaVersion: 'fe010-browser-blob-preview-engine-config-v1',
      bitmapDecoder: {
        async decode() {
          throw new Error('browser decoder internal detail');
        },
      },
    });
    await expect(decodeEngine.analyzeBlob({
      schemaVersion: 'fe010-browser-blob-analysis-request-v1',
      blob: new Blob(['x'], { type: 'image/png' }),
    })).rejects.toMatchObject({
      code: 'IMAGE_DECODE_FAILED',
      message: 'FE-010 browser image decode failed.',
    });
    await decodeEngine.close();

    const state = { decode: 0, bitmapClose: 0 };
    const engine = await createBrowserBlobConsumerPreviewFaceEngineFE010({
      schemaVersion: 'fe010-browser-blob-preview-engine-config-v1',
      bitmapDecoder: decoder(state),
    });

    mocks.analyze.mockRejectedValueOnce(
      new FaceAuthorityValidationError(
        'FR-77 requires exactly one detected face; received 0.',
      ),
    );
    await expect(engine.analyzeBlob({
      schemaVersion: 'fe010-browser-blob-analysis-request-v1',
      blob: new Blob(['no-face'], { type: 'image/jpeg' }),
    })).rejects.toMatchObject({
      code: 'NO_FACE_DETECTED',
    });

    mocks.analyze.mockRejectedValueOnce(
      new FaceAuthorityValidationError(
        'FR-77 requires exactly 478 provider landmarks before the release-exact 468 geometry slice.',
      ),
    );
    await expect(engine.analyzeBlob({
      schemaVersion: 'fe010-browser-blob-analysis-request-v1',
      blob: new Blob(['bad-geometry'], { type: 'image/webp' }),
    })).rejects.toMatchObject({
      code: 'INVALID_PROVIDER_GEOMETRY',
    });

    expect(state.bitmapClose).toBe(2);
    await engine.close();
  });

  it('uses the typed FE010 error class for session closure', async () => {
    const error = new FE010BrowserBlobPreviewError(
      'SESSION_CLOSED',
      'browser Blob session close has begun; new analysis is rejected.',
    );
    expect(error).toBeInstanceOf(FaceAuthorityValidationError);
    expect(error.code).toBe('SESSION_CLOSED');
    expect(error).toBeInstanceOf(FE010BrowserBlobPreviewError);
    expect(error.name).toBe('FaceAuthorityValidationError');
  });

  it('rejects authority widening', async () => {
    const state = { decode: 0, bitmapClose: 0 };
    const engine = await createBrowserBlobConsumerPreviewFaceEngineFE010({
      schemaVersion: 'fe010-browser-blob-preview-engine-config-v1',
      bitmapDecoder: decoder(state),
    });
    const forged = {
      ...engine,
      authorityBoundary: {
        ...engine.authorityBoundary,
        productionActivated: true,
      },
    } as unknown as FE010BrowserBlobPreviewEngine;

    expect(() => assertBrowserBlobConsumerPreviewFaceEngineFE010(forged))
      .toThrow(/authority widened/u);

    await engine.close();
  });
});