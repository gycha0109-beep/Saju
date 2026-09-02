import { describe, expect, it } from 'vitest';
import type { MediaPipeFaceLandmarkerResultFR25V1 } from './mediapipe-eye-landmark-adapter-fr25.js';
import type { MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 } from './mediapipe-face-landmarker-runtime-fr26.js';
import { runPhotoToLipsContourNeutralSurfaceFR66 } from './lips-contour-neutral-surface-fr66.js';
import { assessLipsPoseNormalizationRequirementsFR67 } from './lips-pose-normalization-requirements-fr67.js';
import { admitMediaPipeFaceGeometryTransformSemanticsFR68 } from './mediapipe-face-geometry-transform-semantics-fr68.js';
import { admitMediaPipeWebMetricGeometryGapFR69 } from './mediapipe-web-metric-geometry-gap-fr69.js';
import { admitMediaPipeReleaseExactMetricGeometryFR75 } from './mediapipe-release-exact-metric-geometry-admission-fr75.js';
import {
  admitMediaPipeScreenToMetricReimplementationParityFR76,
  reimplementMediaPipeScreenToMetricFR76,
  solveWeightedOrthogonalProblemFR76,
  validateMediaPipeScreenToMetricReimplementationParityFR76,
  type MediaPipeMetricGeometryPointFR76V1,
  type MediaPipeScreenToMetricReimplementationParityFR76V1,
} from './mediapipe-screen-to-metric-reimplementation-parity-fr76.js';

const DIGEST = `sha256:${'8'.repeat(64)}`;

function request() {
  return {
    schemaVersion: 'fr61-production-neutral-observation-provider-request-v1' as const,
    providerRunRef: 'fr76:screen-to-metric-parity',
    canonicalAssetDigest: DIGEST,
    image: Object.freeze({ image: true }),
  };
}

function validResult(): MediaPipeFaceLandmarkerResultFR25V1 {
  return {
    faceLandmarks: [Array.from({ length: 478 }, (_, index) => Object.freeze({
      x: (index + 1) / 500,
      y: (478 - index) / 500,
      z: (index % 13) / 1000,
      visibility: 0.99,
    }))],
    faceBlendshapes: [],
    facialTransformationMatrixes: [],
  };
}

function factory(): MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 {
  return {
    async create() {
      return {
        detect() {
          return validResult();
        },
        close() {},
      };
    },
  };
}

async function parity(): Promise<MediaPipeScreenToMetricReimplementationParityFR76V1> {
  const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66(request(), factory());
  const fr67 = assessLipsPoseNormalizationRequirementsFR67(fr66);
  const fr68 = admitMediaPipeFaceGeometryTransformSemanticsFR68(fr67);
  const fr69 = admitMediaPipeWebMetricGeometryGapFR69(fr68);
  const fr75 = admitMediaPipeReleaseExactMetricGeometryFR75(fr69);
  return admitMediaPipeScreenToMetricReimplementationParityFR76(fr75);
}

function targetPoint(point: MediaPipeMetricGeometryPointFR76V1): MediaPipeMetricGeometryPointFR76V1 {
  return {
    x: -2 * point.y + 3,
    y: 2 * point.x - 4,
    z: 2 * point.z + 5,
  };
}

function forged(
  source: MediaPipeScreenToMetricReimplementationParityFR76V1,
  patch: Record<string, unknown>,
): MediaPipeScreenToMetricReimplementationParityFR76V1 {
  return { ...source, ...patch } as unknown as MediaPipeScreenToMetricReimplementationParityFR76V1;
}

describe('FR76 MediaPipe screen-to-metric reimplementation parity', () => {
  it('solves a weighted similarity transform with proper rotation, uniform scale, and translation', () => {
    const source: readonly MediaPipeMetricGeometryPointFR76V1[] = [
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: 0, y: 1, z: 0 },
      { x: 0, y: 0, z: 1 },
      { x: 1, y: 2, z: 3 },
    ];
    const target = source.map(targetPoint);
    const matrix = solveWeightedOrthogonalProblemFR76(source, target, [1, 2, 3, 4, 5]);

    const expected = [
      0, -2, 0, 3,
      2, 0, 0, -4,
      0, 0, 2, 5,
      0, 0, 0, 1,
    ];
    matrix.forEach((value, index) => expect(value).toBeCloseTo(expected[index]!, 8));
  });

  it('rejects cardinality, negative-weight, zero-total-weight, and non-finite inputs', () => {
    const point = { x: 0, y: 0, z: 0 };
    expect(() => solveWeightedOrthogonalProblemFR76([point], [], [1])).toThrow(/cardinality mismatch/u);
    expect(() => solveWeightedOrthogonalProblemFR76([point], [point], [-1])).toThrow(/non-negative/u);
    expect(() => solveWeightedOrthogonalProblemFR76([point], [point], [0])).toThrow(/total point weight/u);
    expect(() => solveWeightedOrthogonalProblemFR76([{ x: Number.NaN, y: 0, z: 0 }], [point], [1])).toThrow(/finite x\/y\/z/u);
  });

  it('requires the exact 468-landmark geometry cardinality at the public screen-to-metric boundary', () => {
    const points = Array.from({ length: 467 }, (_, index) => ({
      x: index / 1000,
      y: index / 1000,
      z: 0,
    }));
    expect(() => reimplementMediaPipeScreenToMetricFR76({
      screenLandmarks: points,
      canonicalMetricLandmarks: points,
      landmarkWeights: Array.from({ length: 467 }, () => 1),
      frameWidth: 820,
      frameHeight: 1024,
    })).toThrow(/exactly 468/u);
  });

  it('pins the exact upstream full-XYZ golden parity protocol and witnesses', async () => {
    const result = await parity();
    expect(result.releaseWitness).toEqual({
      repository: 'google-ai-edge/mediapipe',
      releaseTag: 'v0.10.35',
      releaseCommit: 'f8ef212d5c962c0e853db7e59d217056b187084b',
      files: [
        {
          path: 'mediapipe/tasks/cc/vision/face_geometry/face_geometry_from_landmarks_graph_test.cc',
          blobSha: '7fa79c5a6524e7907c4c69c4077b4e4d9d98ca96',
          evidenceRole: 'exact_upstream_face_geometry_test',
        },
        {
          path: 'mediapipe/tasks/testdata/vision/face_blendshapes_in_landmarks.prototxt',
          blobSha: 'ea2e60eefaf6a5c13aee4bb468384edab7e7d5d7',
          evidenceRole: 'exact_upstream_full_xyz_input_fixture',
        },
        {
          path: 'mediapipe/tasks/testdata/vision/face_geometry_expected_out.pbtxt',
          blobSha: 'df6eaaec358d1c0cda034db7b727bc7ce04f8a5b',
          evidenceRole: 'exact_upstream_face_geometry_golden',
        },
        {
          path: 'mediapipe/tasks/cc/vision/face_geometry/data/geometry_pipeline_metadata_landmarks.pbtxt',
          blobSha: '252a7b05b24c5c43c5b94179393639f7c9a2fe8f',
          evidenceRole: 'exact_upstream_geometry_metadata',
        },
      ],
    });
    expect(result.parityProtocol).toEqual({
      implementationPath: 'packages/face-reading/src/mediapipe-screen-to-metric-reimplementation-parity-fr76.ts',
      verifierPath: 'scripts/verify-fr76-mediapipe-parity.mjs',
      frameWidth: 820,
      frameHeight: 1024,
      geometryLandmarkCount: 468,
      expectedPoseMatrixElements: 16,
      providerTolerance: 0.0001,
      exactGitBlobVerificationRequired: true,
      fullMetricLandmarkXYZCompared: true,
      fullPoseMatrixCompared: true,
      inputSource: 'FACE_LANDMARK_PIPELINE',
      originPointLocation: 'TOP_LEFT_CORNER',
      verticalFovDegrees: 63,
      nearPlaneCentimeters: 1,
      farPlaneCentimeters: 10000,
    });
  });

  it('authorizes only the parity-validated reimplementation and keeps runtime metric output and semantics closed', async () => {
    const result = await parity();
    expect(result.runtimeAuthority).toEqual({
      reimplementationParityValidated: true,
      screenToMetricReimplementationAuthorized: true,
      runtimeMetricGeometryOutputAuthorized: false,
      metricLipsGeometryIssued: false,
      poseNormalizedLipsGeometryIssued: false,
      neutralMetricDefinitionsIssued: 0,
      morphologyProduced: false,
      criterionStatesIssued: 0,
      claimsIssued: 0,
      traditionalSemanticAuthority: false,
      parityValidationAloneAuthorizesProductionOutput: false,
    });
    expect(result.remainingBlockers).not.toContain('screen_to_metric_reimplementation_parity_not_validated');
    expect(result.remainingBlockers).toContain('runtime_metric_geometry_output_not_admitted');
  });

  it('rejects witness, protocol, runtime-output, semantic, persistence, blocker, and shortcut widening', async () => {
    const source = await parity();
    const driftedFiles = source.releaseWitness.files.map((file, index) =>
      index === 2 ? { ...file, blobSha: 'forged' } : file,
    );
    const variants: readonly [MediaPipeScreenToMetricReimplementationParityFR76V1, RegExp][] = [
      [forged(source, { releaseWitness: { ...source.releaseWitness, releaseTag: 'v0.10.36' } }), /release witness drift/u],
      [forged(source, { releaseWitness: { ...source.releaseWitness, files: driftedFiles } }), /release witness file drift/u],
      [forged(source, { parityProtocol: { ...source.parityProtocol, providerTolerance: 0.02 } }), /parity protocol drift/u],
      [forged(source, { parityProtocol: { ...source.parityProtocol, fullMetricLandmarkXYZCompared: false } }), /parity protocol drift/u],
      [forged(source, { runtimeAuthority: { ...source.runtimeAuthority, runtimeMetricGeometryOutputAuthorized: true } }), /runtime or semantic authority drift/u],
      [forged(source, { runtimeAuthority: { ...source.runtimeAuthority, metricLipsGeometryIssued: true } }), /runtime or semantic authority drift/u],
      [forged(source, { runtimeAuthority: { ...source.runtimeAuthority, morphologyProduced: true } }), /runtime or semantic authority drift/u],
      [forged(source, { runtimeAuthority: { ...source.runtimeAuthority, claimsIssued: 1 } }), /runtime or semantic authority drift/u],
      [forged(source, { persistencePolicy: { ...source.persistencePolicy, rawMetricMeshPersisted: true } }), /persistence boundary widened/u],
      [forged(source, { remainingBlockers: source.remainingBlockers.slice(1) }), /required blocker drift/u],
      [forged(source, { prohibitedShortcuts: source.prohibitedShortcuts.slice(1) }), /prohibited shortcut drift/u],
    ];
    for (const [candidate, pattern] of variants) {
      expect(() => validateMediaPipeScreenToMetricReimplementationParityFR76(candidate)).toThrow(pattern);
    }
  });
});
