import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  createHostBoundMediaPipeRuntimeFactoryFE016,
  assertHostBoundMediaPipeRuntimeFactoryFE016,
} from './host-bound-mediapipe-runtime-assets-fe016.js';

const mocks = vi.hoisted(() => ({
  forVisionTasks: vi.fn(),
  createFromOptions: vi.fn(),
  detect: vi.fn(),
  close: vi.fn(),
}));

vi.mock('@mediapipe/tasks-vision', () => ({
  FilesetResolver: {
    forVisionTasks: mocks.forVisionTasks,
  },
  FaceLandmarker: {
    createFromOptions: mocks.createFromOptions,
  },
}));

describe('FE016 host-bound MediaPipe runtime assets', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.forVisionTasks.mockResolvedValue({ fileset: true });
    mocks.detect.mockReturnValue({
      faceLandmarks: [],
      faceBlendshapes: [],
      facialTransformationMatrixes: [],
    });
    mocks.createFromOptions.mockResolvedValue({
      detect: mocks.detect,
      close: mocks.close,
    });
  });

  it('creates a bounded runtime factory for root-relative same-origin assets', async () => {
    const factory = createHostBoundMediaPipeRuntimeFactoryFE016({
      schemaVersion: 'fe016-host-bound-mediapipe-asset-config-v1',
      wasmRoot: '/vendor/mediapipe/wasm',
      modelAssetPath: '/models/face_landmarker.task',
    });

    expect(() => assertHostBoundMediaPipeRuntimeFactoryFE016(factory)).not.toThrow();
    expect(factory.assetReceipt).toEqual({
      wasmRoot: '/vendor/mediapipe/wasm',
      modelAssetPath: '/models/face_landmarker.task',
      assetRefsHostConfigured: true,
      assetByteDigestVerified: false,
      assetBytesPersistedByEngine: false,
      runtimePackageName: '@mediapipe/tasks-vision',
      runtimePackageVersion: '0.10.35',
      runningMode: 'IMAGE',
      numFaces: 1,
      outputFaceBlendshapes: false,
      outputFacialTransformationMatrixes: false,
    });

    const runtime = await factory.create();
    expect(mocks.forVisionTasks).toHaveBeenCalledOnce();
    expect(mocks.forVisionTasks).toHaveBeenCalledWith('/vendor/mediapipe/wasm');
    expect(mocks.createFromOptions).toHaveBeenCalledOnce();
    expect(mocks.createFromOptions).toHaveBeenCalledWith(
      { fileset: true },
      {
        baseOptions: {
          modelAssetPath: '/models/face_landmarker.task',
        },
        runningMode: 'IMAGE',
        numFaces: 1,
        outputFaceBlendshapes: false,
        outputFacialTransformationMatrixes: false,
      },
    );

    const image = { bitmap: true };
    expect(runtime.detect(image)).toEqual({
      faceLandmarks: [],
      faceBlendshapes: [],
      facialTransformationMatrixes: [],
    });
    expect(mocks.detect).toHaveBeenCalledWith(image);

    runtime.close();
    expect(mocks.close).toHaveBeenCalledOnce();
  });

  it('accepts HTTPS and loopback HTTP asset refs', () => {
    for (const [wasmRoot, modelAssetPath] of [
      [
        'https://static.example.com/mediapipe/wasm',
        'https://static.example.com/models/face_landmarker.task',
      ],
      [
        'http://localhost:5173/mediapipe/wasm',
        'http://127.0.0.1:5173/models/face_landmarker.task',
      ],
      [
        'http://[::1]:5173/mediapipe/wasm',
        'http://localhost:5173/models/face_landmarker.task',
      ],
    ]) {
      expect(() =>
        createHostBoundMediaPipeRuntimeFactoryFE016({
          schemaVersion: 'fe016-host-bound-mediapipe-asset-config-v1',
          wasmRoot,
          modelAssetPath,
        }),
      ).not.toThrow();
    }
  });

  it.each([
    ['http://example.com/mediapipe/wasm', '/models/face_landmarker.task'],
    ['data:text/plain,wasm', '/models/face_landmarker.task'],
    ['blob:https://example.com/id', '/models/face_landmarker.task'],
    ['javascript:alert(1)', '/models/face_landmarker.task'],
    ['file:///tmp/wasm', '/models/face_landmarker.task'],
    ['//cdn.example.com/wasm', '/models/face_landmarker.task'],
    ['https://user:pass@example.com/wasm', '/models/face_landmarker.task'],
    ['https://example.com/wasm#fragment', '/models/face_landmarker.task'],
    ['/vendor/mediapipe/wasm', 'http://example.com/model.task'],
    ['/vendor/mediapipe/wasm', '//cdn.example.com/model.task'],
    ['/vendor/mediapipe/wasm', ' model.task '],
  ])('rejects unsafe asset refs: %s / %s', (wasmRoot, modelAssetPath) => {
    expect(() =>
      createHostBoundMediaPipeRuntimeFactoryFE016({
        schemaVersion: 'fe016-host-bound-mediapipe-asset-config-v1',
        wasmRoot,
        modelAssetPath,
      }),
    ).toThrow();
  });

  it('rejects unexpected config fields and unsupported schema versions', () => {
    expect(() =>
      createHostBoundMediaPipeRuntimeFactoryFE016({
        schemaVersion: 'fe016-host-bound-mediapipe-asset-config-v1',
        wasmRoot: '/wasm',
        modelAssetPath: '/model.task',
        token: 'should-not-exist',
      } as unknown as Parameters<typeof createHostBoundMediaPipeRuntimeFactoryFE016>[0]),
    ).toThrow(/unauthorized field: token/u);

    expect(() =>
      createHostBoundMediaPipeRuntimeFactoryFE016({
        schemaVersion: 'wrong',
        wasmRoot: '/wasm',
        modelAssetPath: '/model.task',
      } as unknown as Parameters<typeof createHostBoundMediaPipeRuntimeFactoryFE016>[0]),
    ).toThrow(/schemaVersion is unsupported/u);
  });
});
