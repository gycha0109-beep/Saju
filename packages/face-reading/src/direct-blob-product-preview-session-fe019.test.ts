import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  assertDirectBlobProductPreviewOpenResultFE019,
  assertDirectBlobProductPreviewSessionFE019,
  openDirectBlobProductPreviewSessionFE019,
} from './direct-blob-product-preview-session-fe019.js';

const mocks = vi.hoisted(() => ({
  openHostBound: vi.fn(),
}));

vi.mock('./host-bound-product-safe-browser-preview-session-fe018.js', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./host-bound-product-safe-browser-preview-session-fe018.js')>();
  return {
    ...actual,
    openHostBoundProductSafeBrowserPreviewSessionFE018: mocks.openHostBound,
  };
});

const config = Object.freeze({
  schemaVersion: 'fe018-host-bound-product-safe-browser-preview-config-v1' as const,
  assets: Object.freeze({
    schemaVersion: 'fe016-host-bound-mediapipe-asset-config-v1' as const,
    wasmRoot: '/vendor/mediapipe/wasm',
    modelAssetPath: '/models/face_landmarker.task',
  }),
});

describe('FE019 direct-Blob product preview session facade', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('hides the FE010 request schema behind analyze(blob) and preserves attempt/close results', async () => {
    const attempt = Object.freeze({
      schemaVersion: 'fe017-product-safe-preview-attempt-rejected-v1' as const,
      artifactVersion: '0.1.0' as const,
      contractVersion:
        'FE017-REUSABLE-PRODUCT-SAFE-BROWSER-PREVIEW-SESSION-v1' as const,
      status: 'rejected' as const,
      rejection: Object.freeze({
        code: 'NO_FACE_DETECTED' as const,
        stage: 'analysis' as const,
      }),
      transportReceipt: Object.freeze({}),
      authorityBoundary: Object.freeze({}),
    });
    const closeResult = Object.freeze({ status: 'closed' as const });
    const analyzeBlob = vi.fn().mockResolvedValue(attempt);
    const close = vi.fn().mockResolvedValue(closeResult);

    mocks.openHostBound.mockResolvedValue({
      status: 'ready',
      session: { analyzeBlob, close },
    });

    const opened = await openDirectBlobProductPreviewSessionFE019(config);
    expect(mocks.openHostBound).toHaveBeenCalledTimes(1);
    expect(mocks.openHostBound).toHaveBeenCalledWith(config);
    expect(opened.status).toBe('ready');
    if (opened.status !== 'ready') throw new Error('expected ready session');

    expect(() =>
      assertDirectBlobProductPreviewSessionFE019(opened.session),
    ).not.toThrow();

    const blob = new Blob(['face'], { type: 'image/png' });
    const returnedAttempt = await opened.session.analyze(blob);
    expect(analyzeBlob).toHaveBeenCalledTimes(1);
    expect(analyzeBlob).toHaveBeenCalledWith({
      schemaVersion: 'fe010-browser-blob-analysis-request-v1',
      blob,
    });
    expect(returnedAttempt).toBe(attempt);

    const returnedClose = await opened.session.close();
    expect(close).toHaveBeenCalledTimes(1);
    expect(returnedClose).toBe(closeResult);

    expect(Object.keys(opened.session).sort()).toEqual([
      'analyze',
      'artifactVersion',
      'authorityBoundary',
      'close',
      'compositionReceipt',
      'contractVersion',
      'schemaVersion',
      'sessionState',
    ]);
    const serialized = JSON.stringify(opened);
    expect(serialized).not.toMatch(/"analyzeBlob"\s*:/u);
    expect(serialized).not.toMatch(/"runtimeFactory"\s*:/u);
    expect(serialized).not.toMatch(/"wasmRoot"\s*:/u);
    expect(serialized).not.toMatch(/"modelAssetPath"\s*:/u);
  });

  it('preserves bounded FE018 open rejection code/stage', async () => {
    mocks.openHostBound.mockResolvedValue({
      status: 'rejected',
      rejection: {
        code: 'INVALID_CONFIGURATION',
        stage: 'open',
      },
    });

    const result = await openDirectBlobProductPreviewSessionFE019(config);
    expect(result).toMatchObject({
      status: 'rejected',
      rejection: {
        code: 'INVALID_CONFIGURATION',
        stage: 'open',
      },
    });
    expect(Object.keys(
      result.status === 'rejected' ? result.rejection : {},
    ).sort()).toEqual(['code', 'stage']);
  });

  it('normalizes unexpected open failure without reflecting raw errors', async () => {
    mocks.openHostBound.mockRejectedValue(new Error('host secret'));

    const result = await openDirectBlobProductPreviewSessionFE019(config);
    expect(result).toMatchObject({
      status: 'rejected',
      rejection: {
        code: 'ENGINE_INITIALIZATION_FAILED',
        stage: 'open',
      },
    });
    expect(JSON.stringify(result)).not.toContain('host secret');
  });

  it('fails closed when the public session is widened with the lower-level method', async () => {
    mocks.openHostBound.mockResolvedValue({
      status: 'ready',
      session: {
        analyzeBlob: vi.fn(),
        close: vi.fn(),
      },
    });

    const opened = await openDirectBlobProductPreviewSessionFE019(config);
    if (opened.status !== 'ready') throw new Error('expected ready session');

    const widened = {
      ...opened.session,
      analyzeBlob: vi.fn(),
    } as unknown as typeof opened.session;

    expect(() => assertDirectBlobProductPreviewSessionFE019(widened))
      .toThrow(/session contains unauthorized field: analyzeBlob/u);
  });

  it('fails closed when the public open result is widened with host asset data', async () => {
    mocks.openHostBound.mockResolvedValue({
      status: 'ready',
      session: {
        analyzeBlob: vi.fn(),
        close: vi.fn(),
      },
    });

    const opened = await openDirectBlobProductPreviewSessionFE019(config);
    const widened = {
      ...opened,
      wasmRoot: '/must-not-exist',
    } as unknown as typeof opened;

    expect(() =>
      assertDirectBlobProductPreviewOpenResultFE019(widened),
    ).toThrow(/result contains unauthorized field: wasmRoot/u);
  });
});
