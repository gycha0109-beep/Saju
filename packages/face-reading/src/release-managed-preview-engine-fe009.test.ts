import { describe, expect, it } from 'vitest';
import type { MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 } from './mediapipe-face-landmarker-runtime-fr26.js';
import {
  assertReleaseManagedConsumerPreviewFaceEngineFE009,
  createReleaseManagedConsumerPreviewFaceEngineFE009,
  type FE009ReleaseManagedPreviewEngine,
} from './release-managed-preview-engine-fe009.js';

function countingFactory(counter: {
  create: number;
  close: number;
}): MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 {
  return {
    async create() {
      counter.create += 1;
      return {
        detect() {
          return {
            faceLandmarks: [],
            faceBlendshapes: [],
            facialTransformationMatrixes: [],
          };
        },
        close() {
          counter.close += 1;
        },
      };
    },
  };
}

describe('FE009 release asset managed preview engine', () => {
  it('boots from the pinned exact release assets without host-supplied parity or metadata', async () => {
    const counter = { create: 0, close: 0 };
    const engine = await createReleaseManagedConsumerPreviewFaceEngineFE009({
      schemaVersion: 'fe009-release-managed-preview-engine-config-v1',
      runtimeFactory: countingFactory(counter),
    });

    expect(counter.create).toBe(1);
    expect(engine.releaseReceipt).toEqual({
      repository: 'google-ai-edge/mediapipe',
      releaseTag: 'v0.10.35',
      releaseCommit: 'f8ef212d5c962c0e853db7e59d217056b187084b',
      runtimePackageName: '@mediapipe/tasks-vision',
      runtimePackageVersion: '0.10.35',
      geometryMetadataPath:
        'mediapipe/tasks/cc/vision/face_geometry/data/geometry_pipeline_metadata_landmarks.pbtxt',
      geometryMetadataBlobSha: '252a7b05b24c5c43c5b94179393639f7c9a2fe8f',
      paritySchemaVersion:
        'fr76-mediapipe-screen-to-metric-reimplementation-parity-v1',
      metadataExactVerification:
        'delegated_to_fe007_fr77_before_engine_publish',
    });
    expect(() =>
      assertReleaseManagedConsumerPreviewFaceEngineFE009(engine),
    ).not.toThrow();

    await engine.close();
    expect(counter.close).toBe(1);
  });

  it('does not expose static authority payloads or runtime ownership internals', async () => {
    const counter = { create: 0, close: 0 };
    const engine = await createReleaseManagedConsumerPreviewFaceEngineFE009({
      schemaVersion: 'fe009-release-managed-preview-engine-config-v1',
      runtimeFactory: countingFactory(counter),
    });

    expect(engine).not.toHaveProperty('parity');
    expect(engine).not.toHaveProperty('geometryMetadataPbtxt');
    expect(engine).not.toHaveProperty('runtime');
    expect(engine).not.toHaveProperty('runtimeFactory');
    expect(JSON.stringify(engine)).not.toContain('procrustes_landmark_basis');

    await engine.close();
  });

  it('supports the zero-argument host bootstrap config contract shape', async () => {
    const counter = { create: 0, close: 0 };
    const factory = countingFactory(counter);
    const engine = await createReleaseManagedConsumerPreviewFaceEngineFE009({
      schemaVersion: 'fe009-release-managed-preview-engine-config-v1',
      runtimeFactory: factory,
    });

    expect(engine.engineState).toBe('preview_release_asset_bound_only');
    await engine.close();
  });

  it('rejects unauthorized config fields', async () => {
    await expect(
      createReleaseManagedConsumerPreviewFaceEngineFE009({
        schemaVersion: 'fe009-release-managed-preview-engine-config-v1',
        runtimeFactory: countingFactory({ create: 0, close: 0 }),
        parity: {},
      } as never),
    ).rejects.toThrow(/unauthorized field: parity/u);
  });

  it('rejects release-managed authority widening', async () => {
    const counter = { create: 0, close: 0 };
    const engine = await createReleaseManagedConsumerPreviewFaceEngineFE009({
      schemaVersion: 'fe009-release-managed-preview-engine-config-v1',
      runtimeFactory: countingFactory(counter),
    });
    const forged = {
      ...engine,
      authorityBoundary: {
        ...engine.authorityBoundary,
        traditionalInterpretationIssued: true,
      },
    } as unknown as FE009ReleaseManagedPreviewEngine;

    expect(() =>
      assertReleaseManagedConsumerPreviewFaceEngineFE009(forged),
    ).toThrow(/authority widened/u);

    await engine.close();
  });
});
