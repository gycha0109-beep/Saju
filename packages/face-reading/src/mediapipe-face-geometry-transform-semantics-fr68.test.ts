import { describe, expect, it } from 'vitest';
import type { MediaPipeFaceLandmarkerResultFR25V1 } from './mediapipe-eye-landmark-adapter-fr25.js';
import type { MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 } from './mediapipe-face-landmarker-runtime-fr26.js';
import { runPhotoToLipsContourNeutralSurfaceFR66 } from './lips-contour-neutral-surface-fr66.js';
import { assessLipsPoseNormalizationRequirementsFR67 } from './lips-pose-normalization-requirements-fr67.js';
import {
  MEDIAPIPE_FACE_GEOMETRY_TRANSFORM_RELEASE_WITNESS_FR68,
  admitMediaPipeFaceGeometryTransformSemanticsFR68,
  assertMediaPipeTransformRuntimeReadyFR68,
  validateMediaPipeFaceGeometryTransformSemanticsFR68,
  type MediaPipeFaceGeometryTransformSemanticsFR68V1,
} from './mediapipe-face-geometry-transform-semantics-fr68.js';

const DIGEST = `sha256:${'c'.repeat(64)}`;

function request() {
  return {
    schemaVersion: 'fr61-production-neutral-observation-provider-request-v1' as const,
    providerRunRef: 'fr68:transform-semantics',
    canonicalAssetDigest: DIGEST,
    image: Object.freeze({ image: true }),
  };
}

function validResult(): MediaPipeFaceLandmarkerResultFR25V1 {
  return {
    faceLandmarks: [Array.from({ length: 478 }, (_, index) => Object.freeze({
      x: (index + 1) / 500,
      y: (478 - index) / 500,
      z: (index % 7) / 1000,
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

async function admission(): Promise<MediaPipeFaceGeometryTransformSemanticsFR68V1> {
  const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66(request(), factory());
  const fr67 = assessLipsPoseNormalizationRequirementsFR67(fr66);
  return admitMediaPipeFaceGeometryTransformSemanticsFR68(fr67);
}

function forged(
  source: MediaPipeFaceGeometryTransformSemanticsFR68V1,
  patch: Record<string, unknown>,
): MediaPipeFaceGeometryTransformSemanticsFR68V1 {
  return { ...source, ...patch } as unknown as MediaPipeFaceGeometryTransformSemanticsFR68V1;
}

describe('FR68 MediaPipe face geometry transform semantics admission', () => {
  it('pins the exact v0.10.35 release commit and all source-file blob witnesses', async () => {
    const result = await admission();

    expect(result.sourceWitness).toBe(MEDIAPIPE_FACE_GEOMETRY_TRANSFORM_RELEASE_WITNESS_FR68);
    expect(result.sourceWitness).toMatchObject({
      repository: 'google-ai-edge/mediapipe',
      releaseTag: 'v0.10.35',
      releaseCommit: 'f8ef212d5c962c0e853db7e59d217056b187084b',
      runtimePackageName: '@mediapipe/tasks-vision',
      runtimePackageVersion: '0.10.35',
      releaseExactForInstalledPackage: true,
    });
    expect(result.sourceWitness.files).toEqual([
      {
        path: 'mediapipe/tasks/web/vision/face_landmarker/face_landmarker_options.d.ts',
        blobSha: '67739b895a2dfde35a591e08f6839ce85f881b80',
        evidenceRole: 'web_option_semantics',
      },
      {
        path: 'mediapipe/tasks/web/vision/face_landmarker/face_landmarker.ts',
        blobSha: '6d9b2f713345fb576301f40c3d520829ab5f23be',
        evidenceRole: 'web_output_gate_and_matrix_unpacking',
      },
      {
        path: 'mediapipe/tasks/web/vision/face_landmarker/face_landmarker_result.d.ts',
        blobSha: '56001bc0779ae58daa1cfd8dca565332ae892027',
        evidenceRole: 'web_result_matrix_shape_surface',
      },
      {
        path: 'mediapipe/tasks/web/components/containers/matrix.d.ts',
        blobSha: '029ca73e715c9e15c774c6ec2a6aa8196181c466',
        evidenceRole: 'web_matrix_container_surface',
      },
      {
        path: 'mediapipe/tasks/cc/vision/face_geometry/proto/face_geometry.proto',
        blobSha: '149e10afde76072196243eb63d4f70693521e6a2',
        evidenceRole: 'face_geometry_transform_semantics',
      },
      {
        path: 'mediapipe/tasks/cc/vision/face_geometry/libs/geometry_pipeline.cc',
        blobSha: '53c880bd5da524749c755acf9fc69dafe9cc49ef',
        evidenceRole: 'screen_metric_conversion_and_inverse_use',
      },
      {
        path: 'mediapipe/framework/formats/matrix_data.proto',
        blobSha: 'd4aa457a5865b2789308764cc35ea0ff7ab22441',
        evidenceRole: 'matrix_proto_layout_default',
      },
      {
        path: 'mediapipe/framework/formats/matrix.cc',
        blobSha: '3254e7fc2a491cce501e6e05c3ec0b239337c506',
        evidenceRole: 'matrix_serialization_layout_behavior',
      },
    ]);
  });

  it('admits the provider matrix semantics in metric 3D without authorizing execution', async () => {
    const result = await admission();

    expect(result.schemaVersion).toBe('fr68-mediapipe-face-geometry-transform-semantics-v1');
    expect(result.authorityState).toBe('release_exact_transform_semantics_evidence_only');
    expect(result.providerMatrixSemantics).toEqual({
      webResultField: 'facialTransformationMatrixes',
      graphOutputTag: 'FACE_GEOMETRY',
      protoField: 'pose_transform_matrix',
      rows: 4,
      columns: 4,
      mappingDirection: 'static_canonical_metric_face_to_runtime_metric_face',
      coordinateDomain: 'right_handed_metric_3d',
      components: ['uniform_scale', 'rotation', 'translation'],
      lastRowGuaranteed: [0, 0, 0, 1],
      serializedPackedDataLayout: 'column_major_by_proto_default',
      webMatrixLayoutFieldExposed: false,
      providerPipelineInverseUse: 'runtime_metric_face_to_canonical_metric_face_alignment',
    });
    expect(result.evidenceResolved).toEqual([
      'release_exact_matrix_output_surface',
      'release_exact_matrix_direction_and_components',
      'release_exact_provider_inverse_use_semantics',
      'release_exact_serialized_matrix_layout',
    ]);
    expect(result.runtimeOutputEnablementAuthorized).toBe(false);
    expect(result.transformationMatrixObservationAuthorized).toBe(false);
    expect(result.matrixInversionImplementationAuthorized).toBe(false);
  });

  it('makes the normalized-image-2D versus metric-3D semantic barrier explicit', async () => {
    const result = await admission();

    expect(result.upstream.sourceCoordinateFrame).toBe('canonical_image_normalized_2d');
    expect(result.semanticBarrier).toEqual({
      normalizedImage2DIsMetric3D: false,
      directApply4x4ToFR66Normalized2DAllowed: false,
      screenToMetricConversionRequiredBeforeProviderInverseSemanticsApply: true,
      perspectiveCameraEnvironmentParticipatesInScreenToMetricConversion: true,
      reviewed2DProjectionRequiredAfterMetricNormalization: true,
    });
    expect(result.remainingBlockers).toContain('normalized_image_to_metric_3d_conversion_not_admitted');
    expect(result.remainingBlockers).toContain('perspective_camera_environment_not_admitted');
    expect(result.remainingBlockers).toContain('metric_lips_landmark_surface_not_admitted');
    expect(result.remainingBlockers).toContain('reviewed_2d_projection_rule_not_admitted');
    expect(result.prohibitedShortcuts).toContain('fr66_normalized_image_2d_to_metric_3d_by_direct_4x4_application');
  });

  it('does not issue pose-normalized lips geometry, metrics, morphology, criteria, claims, or traditional semantics', async () => {
    const result = await admission();

    expect(result.screenToMetricConversionImplementationAuthorized).toBe(false);
    expect(result.metricLipsGeometryIssued).toBe(false);
    expect(result.perspectiveProjectionImplementationAuthorized).toBe(false);
    expect(result.poseNormalizedLipsGeometryIssued).toBe(false);
    expect(result.neutralMetricDefinitionsIssued).toBe(0);
    expect(result.morphologyProduced).toBe(false);
    expect(result.criterionStatesIssued).toBe(0);
    expect(result.claimsIssued).toBe(0);
    expect(result.traditionalSemanticAuthority).toBe(false);
  });

  it('rejects forged widening or semantic-domain substitution', async () => {
    const source = await admission();
    const variants: readonly [MediaPipeFaceGeometryTransformSemanticsFR68V1, RegExp][] = [
      [forged(source, { runtimeOutputEnablementAuthorized: true }), /authority boundary widened/u],
      [forged(source, { transformationMatrixObservationAuthorized: true }), /authority boundary widened/u],
      [forged(source, { matrixInversionImplementationAuthorized: true }), /authority boundary widened/u],
      [forged(source, { poseNormalizedLipsGeometryIssued: true }), /authority boundary widened/u],
      [forged(source, {
        semanticBarrier: { ...source.semanticBarrier, directApply4x4ToFR66Normalized2DAllowed: true },
      }), /semantic barrier/u],
      [forged(source, {
        providerMatrixSemantics: { ...source.providerMatrixSemantics, coordinateDomain: 'canonical_image_normalized_2d' },
      }), /matrix semantics/u],
      [forged(source, {
        providerMatrixSemantics: { ...source.providerMatrixSemantics, serializedPackedDataLayout: 'row_major' },
      }), /matrix semantics/u],
      [forged(source, {
        upstream: { ...source.upstream, fr26OutputFacialTransformationMatrixes: true },
      }), /upstream boundary/u],
    ];

    for (const [candidate, pattern] of variants) {
      expect(() => validateMediaPipeFaceGeometryTransformSemanticsFR68(candidate)).toThrow(pattern);
    }
  });

  it('fails closed when runtime readiness is requested', async () => {
    const result = await admission();
    expect(() => assertMediaPipeTransformRuntimeReadyFR68(result)).toThrow(/evidence only/u);
  });
});
