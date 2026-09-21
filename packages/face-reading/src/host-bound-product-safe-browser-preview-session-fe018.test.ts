import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  assertHostBoundProductSafeBrowserPreviewOpenResultFE018,
  openHostBoundProductSafeBrowserPreviewSessionFE018,
} from './host-bound-product-safe-browser-preview-session-fe018.js';

const mocks = vi.hoisted(() => ({
  createRuntimeFactory: vi.fn(),
  openSession: vi.fn(),
  assertSession: vi.fn(),
}));

vi.mock('./host-bound-mediapipe-runtime-assets-fe016.js', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./host-bound-mediapipe-runtime-assets-fe016.js')>();
  return {
    ...actual,
    createHostBoundMediaPipeRuntimeFactoryFE016: mocks.createRuntimeFactory,
  };
});

vi.mock('./product-safe-browser-preview-session-fe017.js', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./product-safe-browser-preview-session-fe017.js')>();
  return {
    ...actual,
    openProductSafeBrowserPreviewSessionFE017: mocks.openSession,
    assertProductSafeBrowserPreviewSessionFE017: mocks.assertSession,
  };
});

const assets = Object.freeze({
  schemaVersion: 'fe016-host-bound-mediapipe-asset-config-v1' as const,
  wasmRoot: '/vendor/mediapipe/wasm',
  modelAssetPath: '/models/face_landmarker.task',
});

const config = Object.freeze({
  schemaVersion: 'fe018-host-bound-product-safe-browser-preview-config-v1' as const,
  assets,
});

function fakeSession() {
  return Object.freeze({
    schemaVersion: 'fe017-product-safe-browser-preview-session-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: 'FE017-REUSABLE-PRODUCT-SAFE-BROWSER-PREVIEW-SESSION-v1' as const,
    sessionState: 'preview_product_safe_reusable_session_only' as const,
    sessionReceipt: Object.freeze({}),
    authorityBoundary: Object.freeze({}),
    analyzeBlob: vi.fn(),
    close: vi.fn(),
  });
}

describe('FE018 host-bound product-safe browser preview facade', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.assertSession.mockReturnValue(undefined);
  });

  it('creates FE016 internally and opens FE017 without exposing factory or asset refs', async () => {
    const runtimeFactory = Object.freeze({ create: vi.fn() });
    const session = fakeSession();
    mocks.createRuntimeFactory.mockReturnValue(runtimeFactory);
    mocks.openSession.mockResolvedValue({ status: 'ready', session });

    const result = await openHostBoundProductSafeBrowserPreviewSessionFE018(config);

    expect(mocks.createRuntimeFactory).toHaveBeenCalledTimes(1);
    expect(mocks.createRuntimeFactory).toHaveBeenCalledWith(assets);
    expect(mocks.openSession).toHaveBeenCalledTimes(1);
    expect(mocks.openSession).toHaveBeenCalledWith({
      schemaVersion: 'fe010-browser-blob-preview-engine-config-v1',
      runtimeFactory,
    });
    expect(result.status).toBe('ready');
    expect(() =>
      assertHostBoundProductSafeBrowserPreviewOpenResultFE018(result),
    ).not.toThrow();

    const serialized = JSON.stringify(result);
    expect(serialized).not.toMatch(/"runtimeFactory"\s*:/u);
    expect(serialized).not.toMatch(/"wasmRoot"\s*:/u);
    expect(serialized).not.toMatch(/"modelAssetPath"\s*:/u);
    expect(serialized).not.toContain('/vendor/mediapipe/wasm');
    expect(serialized).not.toContain('/models/face_landmarker.task');

    if (result.status === 'ready') {
      expect(result.session).toBe(session);
      expect(result.compositionReceipt).toEqual({
        sourceRuntimeAssetContractVersion:
          'FE016-HOST-BOUND-MEDIAPIPE-RUNTIME-ASSETS-v1',
        sourceReusableSessionContractVersion:
          'FE017-REUSABLE-PRODUCT-SAFE-BROWSER-PREVIEW-SESSION-v1',
        runtimeFactoryCreatedInternally: true,
        reusableSessionOpenAttempted: true,
        runtimeFactoryExposed: false,
        hostAssetRefsExposed: false,
        productSafeAttemptTransportPreserved: true,
      });
    }
  });

  it('maps invalid top-level config to bounded INVALID_CONFIGURATION without calling upstream', async () => {
    const widened = {
      ...config,
      runtimeFactory: { create: vi.fn() },
    } as unknown as typeof config;

    const result =
      await openHostBoundProductSafeBrowserPreviewSessionFE018(widened);

    expect(result).toMatchObject({
      status: 'rejected',
      rejection: {
        code: 'INVALID_CONFIGURATION',
        stage: 'open',
      },
      compositionReceipt: {
        runtimeFactoryCreatedInternally: false,
        reusableSessionOpenAttempted: false,
      },
    });
    expect(mocks.createRuntimeFactory).not.toHaveBeenCalled();
    expect(mocks.openSession).not.toHaveBeenCalled();
    expect(Object.keys(
      result.status === 'rejected' ? result.rejection : {},
    ).sort()).toEqual(['code', 'stage']);
  });

  it('contains FE016 validation exceptions without reflecting raw messages or asset refs', async () => {
    mocks.createRuntimeFactory.mockImplementation(() => {
      throw new Error('asset validation secret /private/model.task');
    });

    const result =
      await openHostBoundProductSafeBrowserPreviewSessionFE018(config);

    expect(result).toMatchObject({
      status: 'rejected',
      rejection: {
        code: 'INVALID_CONFIGURATION',
        stage: 'open',
      },
    });
    expect(mocks.openSession).not.toHaveBeenCalled();
    expect(JSON.stringify(result)).not.toContain('asset validation secret');
    expect(JSON.stringify(result)).not.toContain('/private/model.task');
  });

  it('preserves FE017 bounded rejection code/stage after internal runtime factory creation', async () => {
    mocks.createRuntimeFactory.mockReturnValue(Object.freeze({ create: vi.fn() }));
    mocks.openSession.mockResolvedValue({
      status: 'rejected',
      rejection: {
        code: 'BROWSER_CAPABILITY_UNAVAILABLE',
        stage: 'ingress',
      },
    });

    const result =
      await openHostBoundProductSafeBrowserPreviewSessionFE018(config);

    expect(result).toMatchObject({
      status: 'rejected',
      rejection: {
        code: 'BROWSER_CAPABILITY_UNAVAILABLE',
        stage: 'ingress',
      },
      compositionReceipt: {
        runtimeFactoryCreatedInternally: true,
        reusableSessionOpenAttempted: true,
      },
    });
  });

  it('normalizes unexpected FE017 open exceptions to bounded initialization failure', async () => {
    mocks.createRuntimeFactory.mockReturnValue(Object.freeze({ create: vi.fn() }));
    mocks.openSession.mockRejectedValue(new Error('open secret'));

    const result =
      await openHostBoundProductSafeBrowserPreviewSessionFE018(config);

    expect(result).toMatchObject({
      status: 'rejected',
      rejection: {
        code: 'ENGINE_INITIALIZATION_FAILED',
        stage: 'open',
      },
    });
    expect(JSON.stringify(result)).not.toContain('open secret');
  });

  it('fails closed when the public result is widened with host/runtime fields', async () => {
    const runtimeFactory = Object.freeze({ create: vi.fn() });
    mocks.createRuntimeFactory.mockReturnValue(runtimeFactory);
    mocks.openSession.mockResolvedValue({
      status: 'ready',
      session: fakeSession(),
    });

    const result =
      await openHostBoundProductSafeBrowserPreviewSessionFE018(config);
    const widened = {
      ...result,
      wasmRoot: '/must-not-exist',
    } as unknown as typeof result;

    expect(() =>
      assertHostBoundProductSafeBrowserPreviewOpenResultFE018(widened),
    ).toThrow(/result contains unauthorized field: wasmRoot/u);
  });
});
