import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  assertDigestBoundProductPreviewOpenResultFE023,
  assertDigestBoundProductPreviewSessionFE023,
  openDigestBoundProductPreviewSessionFE023,
} from './digest-bound-product-preview-session-fe023.js';

const mocks = vi.hoisted(() => ({
  createRuntimeFactory: vi.fn(),
  openSession: vi.fn(),
}));

vi.mock('./digest-bound-mediapipe-model-runtime-fe022.js', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./digest-bound-mediapipe-model-runtime-fe022.js')>();
  return {
    ...actual,
    createDigestBoundMediaPipeRuntimeFactoryFE022: mocks.createRuntimeFactory,
  };
});

vi.mock('./product-safe-browser-preview-session-fe017.js', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./product-safe-browser-preview-session-fe017.js')>();
  return {
    ...actual,
    openProductSafeBrowserPreviewSessionFE017: mocks.openSession,
  };
});

const assets = Object.freeze({
  schemaVersion: 'fe022-digest-bound-mediapipe-model-config-v1' as const,
  wasmRoot: '/vendor/mediapipe/wasm',
  modelAssetPath: '/models/face_landmarker.task',
  modelAssetSha256: 'a'.repeat(64),
});

const config = Object.freeze({
  schemaVersion: 'fe023-digest-bound-product-preview-config-v1' as const,
  assets,
});

describe('FE023 digest-bound direct-Blob product preview session', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates FE022 internally, hides lower-level inputs, and preserves attempt/close results', async () => {
    const runtimeFactory = Object.freeze({ create: vi.fn() });
    const attempt = Object.freeze({ status: 'rejected' as const });
    const closeResult = Object.freeze({ status: 'closed' as const });
    const analyzeBlob = vi.fn().mockResolvedValue(attempt);
    const close = vi.fn().mockResolvedValue(closeResult);
    mocks.createRuntimeFactory.mockReturnValue(runtimeFactory);
    mocks.openSession.mockResolvedValue({
      status: 'ready',
      session: { analyzeBlob, close },
    });

    const opened = await openDigestBoundProductPreviewSessionFE023(config);
    expect(mocks.createRuntimeFactory).toHaveBeenCalledWith(assets);
    expect(mocks.openSession).toHaveBeenCalledWith({
      schemaVersion: 'fe010-browser-blob-preview-engine-config-v1',
      runtimeFactory,
    });
    expect(opened.status).toBe('ready');
    if (opened.status !== 'ready') throw new Error('expected ready session');

    expect(() => assertDigestBoundProductPreviewSessionFE023(opened.session)).not.toThrow();
    const blob = new Blob(['face'], { type: 'image/png' });
    expect(await opened.session.analyze(blob)).toBe(attempt);
    expect(analyzeBlob).toHaveBeenCalledWith({
      schemaVersion: 'fe010-browser-blob-analysis-request-v1',
      blob,
    });
    expect(await opened.session.close()).toBe(closeResult);

    expect(opened.session.compositionReceipt).toEqual({
      sourceRuntimeAssetContractVersion: 'FE022-DIGEST-BOUND-MEDIAPIPE-MODEL-RUNTIME-v1',
      sourceReusableSessionContractVersion: 'FE017-REUSABLE-PRODUCT-SAFE-BROWSER-PREVIEW-SESSION-v1',
      digestBoundRuntimeFactoryCreatedInternally: true,
      modelDigestRequiredBeforeRuntimeReady: true,
      runtimeFactoryExposed: false,
      hostAssetRefsExposed: false,
      modelDigestExposed: false,
      lowerLevelAnalysisRequestSchemaHidden: true,
      innerSessionExposed: false,
      productSafeAttemptResultPreserved: true,
      productSafeCloseResultPreserved: true,
    });

    const serialized = JSON.stringify(opened);
    expect(serialized).not.toContain('/vendor/mediapipe/wasm');
    expect(serialized).not.toContain('/models/face_landmarker.task');
    expect(serialized).not.toContain('a'.repeat(64));
    expect(serialized).not.toMatch(/"runtimeFactory"\s*:/u);
    expect(serialized).not.toMatch(/"analyzeBlob"\s*:/u);
  });

  it('maps invalid config and FE022 validation failures to bounded INVALID_CONFIGURATION', async () => {
    const widened = { ...config, token: 'unexpected' } as unknown as typeof config;
    const invalid = await openDigestBoundProductPreviewSessionFE023(widened);
    expect(invalid).toMatchObject({
      status: 'rejected',
      rejection: { code: 'INVALID_CONFIGURATION', stage: 'open' },
    });
    expect(mocks.createRuntimeFactory).not.toHaveBeenCalled();

    mocks.createRuntimeFactory.mockImplementation(() => {
      throw new Error('digest secret');
    });
    const rejected = await openDigestBoundProductPreviewSessionFE023(config);
    expect(rejected).toMatchObject({
      status: 'rejected',
      rejection: { code: 'INVALID_CONFIGURATION', stage: 'open' },
    });
    expect(JSON.stringify(rejected)).not.toContain('digest secret');
    expect(mocks.openSession).not.toHaveBeenCalled();
  });

  it('preserves bounded FE017 rejection and normalizes unexpected open failures', async () => {
    mocks.createRuntimeFactory.mockReturnValue(Object.freeze({ create: vi.fn() }));
    mocks.openSession.mockResolvedValue({
      status: 'rejected',
      rejection: { code: 'BROWSER_CAPABILITY_UNAVAILABLE', stage: 'ingress' },
    });
    const bounded = await openDigestBoundProductPreviewSessionFE023(config);
    expect(bounded).toMatchObject({
      status: 'rejected',
      rejection: { code: 'BROWSER_CAPABILITY_UNAVAILABLE', stage: 'ingress' },
    });

    mocks.openSession.mockRejectedValue(new Error('open secret'));
    const normalized = await openDigestBoundProductPreviewSessionFE023(config);
    expect(normalized).toMatchObject({
      status: 'rejected',
      rejection: { code: 'ENGINE_INITIALIZATION_FAILED', stage: 'open' },
    });
    expect(JSON.stringify(normalized)).not.toContain('open secret');
  });

  it('fails closed on public result or session widening', async () => {
    mocks.createRuntimeFactory.mockReturnValue(Object.freeze({ create: vi.fn() }));
    mocks.openSession.mockResolvedValue({
      status: 'ready',
      session: { analyzeBlob: vi.fn(), close: vi.fn() },
    });
    const opened = await openDigestBoundProductPreviewSessionFE023(config);
    if (opened.status !== 'ready') throw new Error('expected ready session');

    expect(() => assertDigestBoundProductPreviewSessionFE023({
      ...opened.session,
      modelAssetSha256: 'secret',
    } as unknown as typeof opened.session)).toThrow(/unauthorized field/u);

    expect(() => assertDigestBoundProductPreviewOpenResultFE023({
      ...opened,
      wasmRoot: '/secret',
    } as unknown as typeof opened)).toThrow(/unauthorized field/u);
  });
});
