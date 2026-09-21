import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  assertProductSafeBrowserPreviewAttemptFE017,
  assertProductSafeBrowserPreviewSessionFE017,
  openProductSafeBrowserPreviewSessionFE017,
} from './product-safe-browser-preview-session-fe017.js';

const mocks = vi.hoisted(() => ({
  open: vi.fn(),
  assertFE004: vi.fn(),
}));

vi.mock('./host-safe-browser-preview-engine-fe011.js', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./host-safe-browser-preview-engine-fe011.js')>();
  return {
    ...actual,
    openHostSafeBrowserPreviewFaceEngineFE011: mocks.open,
  };
});

vi.mock('./consumer-preview-engine-facade-fe004.js', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./consumer-preview-engine-facade-fe004.js')>();
  return {
    ...actual,
    assertConsumerPreviewEngineResultFE004: mocks.assertFE004,
  };
});

function fe004Result() {
  return {
    schemaVersion: 'fe004-consumer-preview-engine-result-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: 'FE004-CONSUMER-PREVIEW-ENGINE-FACADE-v1' as const,
    engineState: 'preview_consumer_facade_only' as const,
    providerRunRef: 'fe010:blob:1:0123456789abcdef01234567',
    canonicalAssetDigest:
      'sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
    executionReceipt: {
      internalRuntimeSchemaVersion: 'fe002-preview-engine-run-v1' as const,
      consumerProjectionSchemaVersion: 'fe003-consumer-safe-preview-output-v1' as const,
      failClosedUpstreamErrorsPropagated: true as const,
      fallbackInvented: false as const,
    },
    output: {
      schemaVersion: 'fe003-consumer-safe-preview-output-v1' as const,
      artifactVersion: '0.1.0' as const,
      contractVersion: 'FE003-CONSUMER-SAFE-PREVIEW-OUTPUT-v1' as const,
      providerRunRef: 'fe010:blob:1:0123456789abcdef01234567',
      canonicalAssetDigest:
        'sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
      metrics: [
        {
          regionKey: 'eye_pair' as const,
          metricRef: 'neutral.eye.test@0.1.0',
          value: 0.25,
          unit: 'ratio' as const,
          order: 0,
        },
        {
          regionKey: 'mouth_lips' as const,
          metricRef: 'neutral.mouth.test@0.1.0',
          value: 2.5,
          unit: 'degree' as const,
          order: 1,
        },
      ],
      regions: [
        {
          regionKey: 'eye_pair' as const,
          state: 'available' as const,
          unavailableSurfaces: [],
        },
        {
          regionKey: 'cheek_mid_face' as const,
          state: 'partial' as const,
          unavailableSurfaces: ['visible_width'],
        },
        {
          regionKey: 'mouth_lips' as const,
          state: 'available' as const,
          unavailableSurfaces: [],
        },
        {
          regionKey: 'chin_lower_face' as const,
          state: 'available' as const,
          unavailableSurfaces: [],
        },
      ],
      dataBoundary: {},
      authorityBoundary: {},
    },
    dataBoundary: {},
    authorityBoundary: {},
  };
}

function safeRejection(
  code:
    | 'NO_FACE_DETECTED'
    | 'SESSION_CLOSED'
    | 'ENGINE_RUNTIME_FAILED'
    | 'ENGINE_INITIALIZATION_FAILED' = 'NO_FACE_DETECTED',
  stage: 'analysis' | 'lifecycle' | 'open' = 'analysis',
) {
  return {
    code,
    stage,
    internalErrorMessageExposed: false as const,
    internalStackExposed: false as const,
    providerPayloadExposed: false as const,
    geometryExposed: false as const,
  };
}

describe('FE017 reusable product-safe browser preview session', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.assertFE004.mockReturnValue(undefined);
  });

  it('opens FE011 once, reuses it across attempts, and strips trace-bearing fields', async () => {
    const analyzeBlob = vi.fn().mockResolvedValue({
      status: 'ok',
      result: fe004Result(),
    });
    const close = vi.fn().mockResolvedValue({ status: 'closed' });
    mocks.open.mockResolvedValue({
      status: 'ready',
      engine: {
        analyzeBlob,
        close,
      },
    });

    const opened = await openProductSafeBrowserPreviewSessionFE017({
      schemaVersion: 'fe010-browser-blob-preview-engine-config-v1',
    });

    expect(mocks.open).toHaveBeenCalledTimes(1);
    expect(opened.status).toBe('ready');
    if (opened.status !== 'ready') throw new Error('expected ready session');

    const first = await opened.session.analyzeBlob({
      schemaVersion: 'fe010-browser-blob-analysis-request-v1',
      blob: new Blob(['first'], { type: 'image/png' }),
    });
    const second = await opened.session.analyzeBlob({
      schemaVersion: 'fe010-browser-blob-analysis-request-v1',
      blob: new Blob(['second'], { type: 'image/png' }),
    });

    expect(analyzeBlob).toHaveBeenCalledTimes(2);
    expect(mocks.open).toHaveBeenCalledTimes(1);

    for (const attempt of [first, second]) {
      expect(attempt.status).toBe('ok');
      expect(() => assertProductSafeBrowserPreviewAttemptFE017(attempt)).not.toThrow();
      const serialized = JSON.stringify(attempt);
      expect(serialized).not.toMatch(/"providerRunRef"\\s*:/u);
      expect(serialized).not.toMatch(/"canonicalAssetDigest"\\s*:/u);
      expect(serialized).not.toMatch(/"executionReceipt"\\s*:/u);
      expect(serialized).not.toContain('sha256:');
      if (attempt.status === 'ok') {
        expect(attempt.preview.metrics).toEqual([
          {
            regionKey: 'eye_pair',
            metricRef: 'neutral.eye.test@0.1.0',
            value: 0.25,
            unit: 'ratio',
          },
          {
            regionKey: 'mouth_lips',
            metricRef: 'neutral.mouth.test@0.1.0',
            value: 2.5,
            unit: 'degree',
          },
        ]);
      }
    }

    expect(opened.session.sessionReceipt).toMatchObject({
      runtimeOpenedOncePerSession: true,
      runtimeReusedAcrossAttempts: true,
      underlyingAnalysesSerialized: true,
      closeSingleFlight: true,
      traceIdentityExposed: false,
      rawGeometryExposed: false,
    });
  });

  it('maps FE011 rejection to bounded product-safe rejection fields only', async () => {
    const analyzeBlob = vi.fn().mockResolvedValue({
      status: 'rejected',
      rejection: safeRejection('NO_FACE_DETECTED', 'analysis'),
    });
    mocks.open.mockResolvedValue({
      status: 'ready',
      engine: {
        analyzeBlob,
        close: vi.fn().mockResolvedValue({ status: 'closed' }),
      },
    });

    const opened = await openProductSafeBrowserPreviewSessionFE017();
    if (opened.status !== 'ready') throw new Error('expected ready session');

    const attempt = await opened.session.analyzeBlob({
      schemaVersion: 'fe010-browser-blob-analysis-request-v1',
      blob: new Blob(['x'], { type: 'image/jpeg' }),
    });

    expect(attempt).toMatchObject({
      status: 'rejected',
      rejection: {
        code: 'NO_FACE_DETECTED',
        stage: 'analysis',
      },
    });
    expect(Object.keys(
      attempt.status === 'rejected' ? attempt.rejection : {},
    ).sort()).toEqual(['code', 'stage']);
  });

  it('makes close single-flight and rejects new analysis as soon as close begins', async () => {
    let resolveClose!: (value: { status: 'closed' }) => void;
    const innerClose = vi.fn().mockReturnValue(
      new Promise<{ status: 'closed' }>((resolve) => {
        resolveClose = resolve;
      }),
    );
    const analyzeBlob = vi.fn().mockResolvedValue({
      status: 'ok',
      result: fe004Result(),
    });
    mocks.open.mockResolvedValue({
      status: 'ready',
      engine: {
        analyzeBlob,
        close: innerClose,
      },
    });

    const opened = await openProductSafeBrowserPreviewSessionFE017();
    if (opened.status !== 'ready') throw new Error('expected ready session');

    const firstClose = opened.session.close();
    const secondClose = opened.session.close();
    expect(firstClose).toBe(secondClose);
    expect(innerClose).toHaveBeenCalledTimes(1);

    const afterCloseBegins = await opened.session.analyzeBlob({
      schemaVersion: 'fe010-browser-blob-analysis-request-v1',
      blob: new Blob(['late'], { type: 'image/webp' }),
    });
    expect(afterCloseBegins).toMatchObject({
      status: 'rejected',
      rejection: {
        code: 'SESSION_CLOSED',
        stage: 'lifecycle',
      },
    });
    expect(analyzeBlob).not.toHaveBeenCalled();

    resolveClose({ status: 'closed' });
    await expect(firstClose).resolves.toEqual({ status: 'closed' });
    await expect(secondClose).resolves.toEqual({ status: 'closed' });
  });

  it('normalizes unexpected analyze and close exceptions without exposing messages', async () => {
    const analyzeBlob = vi.fn().mockRejectedValue(new Error('analysis secret'));
    const close = vi.fn().mockRejectedValue(new Error('close secret'));
    mocks.open.mockResolvedValue({
      status: 'ready',
      engine: { analyzeBlob, close },
    });

    const opened = await openProductSafeBrowserPreviewSessionFE017();
    if (opened.status !== 'ready') throw new Error('expected ready session');

    const attempt = await opened.session.analyzeBlob({
      schemaVersion: 'fe010-browser-blob-analysis-request-v1',
      blob: new Blob(['x'], { type: 'image/png' }),
    });
    expect(attempt).toMatchObject({
      status: 'rejected',
      rejection: {
        code: 'ENGINE_RUNTIME_FAILED',
        stage: 'analysis',
      },
    });
    expect(JSON.stringify(attempt)).not.toContain('analysis secret');

    const closed = await opened.session.close();
    expect(closed).toEqual({
      status: 'rejected',
      rejection: {
        code: 'ENGINE_RUNTIME_FAILED',
        stage: 'lifecycle',
      },
    });
    expect(JSON.stringify(closed)).not.toContain('close secret');
  });

  it('maps open rejection and unexpected open exceptions to bounded results', async () => {
    mocks.open.mockResolvedValueOnce({
      status: 'rejected',
      rejection: safeRejection('ENGINE_INITIALIZATION_FAILED', 'open'),
    });

    await expect(openProductSafeBrowserPreviewSessionFE017()).resolves.toEqual({
      status: 'rejected',
      rejection: {
        code: 'ENGINE_INITIALIZATION_FAILED',
        stage: 'open',
      },
    });

    mocks.open.mockRejectedValueOnce(new Error('open secret'));
    const unexpected = await openProductSafeBrowserPreviewSessionFE017();
    expect(unexpected).toEqual({
      status: 'rejected',
      rejection: {
        code: 'ENGINE_INITIALIZATION_FAILED',
        stage: 'open',
      },
    });
    expect(JSON.stringify(unexpected)).not.toContain('open secret');
  });

  it('fails closed when public session fields are widened', async () => {
    mocks.open.mockResolvedValue({
      status: 'ready',
      engine: {
        analyzeBlob: vi.fn(),
        close: vi.fn(),
      },
    });

    const opened = await openProductSafeBrowserPreviewSessionFE017();
    if (opened.status !== 'ready') throw new Error('expected ready session');

    const widened = {
      ...opened.session,
      providerRunRef: 'must-not-exist',
    } as unknown as typeof opened.session;

    expect(() => assertProductSafeBrowserPreviewSessionFE017(widened))
      .toThrow(/session contains unauthorized field: providerRunRef/u);
  });
});