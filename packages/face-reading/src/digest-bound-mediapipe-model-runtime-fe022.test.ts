import { createHash, webcrypto } from 'node:crypto';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  FE022_MAX_MODEL_ASSET_BYTES,
  assertDigestBoundMediaPipeRuntimeFactoryFE022,
  createDigestBoundMediaPipeRuntimeFactoryFE022,
} from './digest-bound-mediapipe-model-runtime-fe022.js';

const mocks = vi.hoisted(() => ({
  forVisionTasks: vi.fn(),
  createFromOptions: vi.fn(),
  detect: vi.fn(),
  close: vi.fn(),
}));

vi.mock('@mediapipe/tasks-vision', () => ({
  FilesetResolver: { forVisionTasks: mocks.forVisionTasks },
  FaceLandmarker: { createFromOptions: mocks.createFromOptions },
}));

const MODEL_BYTES = new TextEncoder().encode('verified-face-landmarker-model');
const MODEL_SHA256 = createHash('sha256').update(MODEL_BYTES).digest('hex');

describe('FE022 digest-bound MediaPipe model runtime', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    if (globalThis.crypto?.subtle === undefined) {
      Object.defineProperty(globalThis, 'crypto', {
        configurable: true,
        value: webcrypto,
      });
    }
    mocks.forVisionTasks.mockResolvedValue({ fileset: true });
    mocks.createFromOptions.mockResolvedValue({
      detect: mocks.detect,
      close: mocks.close,
    });
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
      new Response(MODEL_BYTES, {
        status: 200,
        headers: { 'content-length': String(MODEL_BYTES.byteLength) },
      }),
    ));
  });

  it('verifies the configured model digest before passing the same bytes to MediaPipe', async () => {
    const factory = createDigestBoundMediaPipeRuntimeFactoryFE022({
      schemaVersion: 'fe022-digest-bound-mediapipe-model-config-v1',
      wasmRoot: '/vendor/mediapipe/wasm',
      modelAssetPath: '/models/face_landmarker.task',
      modelAssetSha256: MODEL_SHA256,
    });

    expect(() => assertDigestBoundMediaPipeRuntimeFactoryFE022(factory)).not.toThrow();
    expect(factory.assetReceipt).toMatchObject({
      modelAssetSha256: MODEL_SHA256,
      modelAssetDigestVerifiedBeforeRuntimeCreate: true,
      modelAssetBufferConsumedByRuntime: true,
      modelAssetBytesPersistedByEngine: false,
      wasmAssetByteDigestVerified: false,
    });

    const runtime = await factory.create();
    expect(fetch).toHaveBeenCalledWith('/models/face_landmarker.task', {
      cache: 'no-store',
      credentials: 'same-origin',
    });
    expect(mocks.forVisionTasks).toHaveBeenCalledWith('/vendor/mediapipe/wasm');
    expect(mocks.createFromOptions).toHaveBeenCalledOnce();
    const options = mocks.createFromOptions.mock.calls[0]?.[1];
    expect(options.baseOptions.modelAssetPath).toBeUndefined();
    expect(Array.from(options.baseOptions.modelAssetBuffer)).toEqual(
      Array.from(MODEL_BYTES),
    );

    runtime.close();
    expect(mocks.close).toHaveBeenCalledOnce();
  });

  it('fails closed on digest mismatch before MediaPipe runtime creation', async () => {
    const factory = createDigestBoundMediaPipeRuntimeFactoryFE022({
      schemaVersion: 'fe022-digest-bound-mediapipe-model-config-v1',
      wasmRoot: '/wasm',
      modelAssetPath: '/model.task',
      modelAssetSha256: '0'.repeat(64),
    });

    await expect(factory.create()).rejects.toThrow(/SHA-256 mismatch/u);
    expect(mocks.forVisionTasks).not.toHaveBeenCalled();
    expect(mocks.createFromOptions).not.toHaveBeenCalled();
  });

  it('fails closed on HTTP failure and oversized declared assets', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
      new Response('missing', { status: 404 }),
    ));
    const httpFailure = createDigestBoundMediaPipeRuntimeFactoryFE022({
      schemaVersion: 'fe022-digest-bound-mediapipe-model-config-v1',
      wasmRoot: '/wasm',
      modelAssetPath: '/model.task',
      modelAssetSha256: MODEL_SHA256,
    });
    await expect(httpFailure.create()).rejects.toThrow(/HTTP 404/u);

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Headers({
        'content-length': String(FE022_MAX_MODEL_ASSET_BYTES + 1),
      }),
      arrayBuffer: vi.fn(),
    }));
    const oversized = createDigestBoundMediaPipeRuntimeFactoryFE022({
      schemaVersion: 'fe022-digest-bound-mediapipe-model-config-v1',
      wasmRoot: '/wasm',
      modelAssetPath: '/model.task',
      modelAssetSha256: MODEL_SHA256,
    });
    await expect(oversized.create()).rejects.toThrow(/byte limit/u);
  });

  it('rejects malformed digests, unsafe refs, config widening, and factory widening', () => {
    const base = {
      schemaVersion: 'fe022-digest-bound-mediapipe-model-config-v1' as const,
      wasmRoot: '/wasm',
      modelAssetPath: '/model.task',
      modelAssetSha256: MODEL_SHA256,
    };

    expect(() => createDigestBoundMediaPipeRuntimeFactoryFE022({
      ...base,
      modelAssetSha256: MODEL_SHA256.toUpperCase(),
    })).toThrow(/64 lowercase hexadecimal/u);

    expect(() => createDigestBoundMediaPipeRuntimeFactoryFE022({
      ...base,
      modelAssetPath: 'http://example.com/model.task',
    })).toThrow();

    expect(() => createDigestBoundMediaPipeRuntimeFactoryFE022({
      ...base,
      token: 'unexpected',
    } as unknown as Parameters<typeof createDigestBoundMediaPipeRuntimeFactoryFE022>[0]))
      .toThrow(/unauthorized field: token/u);

    const factory = createDigestBoundMediaPipeRuntimeFactoryFE022(base);
    expect(() => assertDigestBoundMediaPipeRuntimeFactoryFE022({
      ...factory,
      token: 'unexpected',
    } as unknown as typeof factory)).toThrow(/unauthorized field: token/u);
  });
});
