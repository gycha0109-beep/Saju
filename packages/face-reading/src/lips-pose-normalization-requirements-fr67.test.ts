import { describe, expect, it } from 'vitest';
import type { MediaPipeFaceLandmarkerResultFR25V1 } from './mediapipe-eye-landmark-adapter-fr25.js';
import type { MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 } from './mediapipe-face-landmarker-runtime-fr26.js';
import {
  runPhotoToLipsContourNeutralSurfaceFR66,
  type LipsContourNeutralSurfaceFR66V1,
} from './lips-contour-neutral-surface-fr66.js';
import {
  assessLipsPoseNormalizationRequirementsFR67,
  assertLipsPoseNormalizationReadyFR67,
} from './lips-pose-normalization-requirements-fr67.js';

const DIGEST = `sha256:${'b'.repeat(64)}`;

function request(image: unknown = Object.freeze({ image: true })) {
  return {
    schemaVersion: 'fr61-production-neutral-observation-provider-request-v1' as const,
    providerRunRef: 'fr67:lips-pose-normalization-requirements',
    canonicalAssetDigest: DIGEST,
    image,
  };
}

function validResult(): MediaPipeFaceLandmarkerResultFR25V1 {
  return {
    faceLandmarks: [Array.from({ length: 478 }, (_, index) => Object.freeze({
      x: (index + 1) / 500,
      y: (478 - index) / 500,
      z: (index % 5) / 1000,
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

function forged(
  source: LipsContourNeutralSurfaceFR66V1,
  patch: Record<string, unknown>,
): LipsContourNeutralSurfaceFR66V1 {
  return { ...source, ...patch } as unknown as LipsContourNeutralSurfaceFR66V1;
}

describe('FR67 lips pose-normalization requirements', () => {
  it('admits requirements only and keeps normalized geometry, metrics, morphology, criteria, and claims blocked', async () => {
    const source = await runPhotoToLipsContourNeutralSurfaceFR66(request(), factory());
    const report = assessLipsPoseNormalizationRequirementsFR67(source);

    expect(report.schemaVersion).toBe('fr67-lips-pose-normalization-requirements-v1');
    expect(report.artifactVersion).toBe('0.1.0');
    expect(report.authorityState).toBe('blocked_no_authorized_pose_normalization_transform');
    expect(report.targetSurface).toBe('neutral.face.lips_contour_set');
    expect(report.targetCoordinateFrame).toBe('pose_normalized_face_2d');
    expect(report.normalizedGeometryIssued).toBe(false);
    expect(report.neutralMetricDefinitionsIssued).toBe(0);
    expect(report.neutralMetricValuesIssued).toBe(0);
    expect(report.morphologyProduced).toBe(false);
    expect(report.criterionStatesIssued).toBe(0);
    expect(report.claimsIssued).toBe(0);
    expect(report.traditionalSemanticAuthority).toBe(false);
  });

  it('pins the current FR26/FR61 matrix boundary instead of treating an unavailable matrix as observed authority', async () => {
    const source = await runPhotoToLipsContourNeutralSurfaceFR66(request(), factory());
    const report = assessLipsPoseNormalizationRequirementsFR67(source);

    expect(report.providerRuntime).toEqual({
      runtimePackageName: '@mediapipe/tasks-vision',
      runtimePackageVersion: '0.10.35',
      fr26OutputFacialTransformationMatrixes: false,
      fr61TransformationMatrixConsumptionState: 'disabled_and_ignored',
      transformationMatrixObserved: false,
      inverseTransformAuthorized: false,
    });
    expect(report.blockers).toContain('fr26_transformation_matrix_output_disabled');
    expect(report.blockers).toContain('fr61_transformation_matrix_consumption_disabled');
    expect(report.blockers).toContain('no_reviewed_inverse_transform_semantics');
    expect(report.blockers).toContain('no_reviewed_2d_projection_rule');
    expect(report.prohibitedShortcuts).toContain('fr26_disabled_matrix_to_pose_normalized_geometry');
    expect(report.prohibitedShortcuts).toContain('provider_transform_matrix_to_inverse_normalization_without_reviewed_semantics');
  });

  it('preserves the unordered contour-set contract and defines normalization requirements without assigning anatomy', async () => {
    const source = await runPhotoToLipsContourNeutralSurfaceFR66(request(), factory());
    const report = assessLipsPoseNormalizationRequirementsFR67(source);

    expect(report.source).toEqual({
      schemaVersion: 'fr66-lips-contour-neutral-surface-v1',
      artifactVersion: '0.1.0',
      coordinateFrame: 'canonical_image_normalized_2d',
      contourCount: 2,
      contourConsumptionState: 'unordered_set_no_outer_inner_role',
      poseNormalizationIssued: false,
    });
    expect(report.normalizationRequirements).toEqual({
      singleFaceTransformAppliedConsistentlyAcrossContours: true,
      preserveUnorderedContourIdentity: true,
      providerComponentOrderSemanticUseAllowed: false,
      outerInnerAssignmentRequiredForNormalization: false,
      reviewedTransformDerivationRequired: true,
      reviewedInverseTransformSemanticsRequired: true,
      reviewed2DProjectionRuleRequired: true,
    });
  });

  it('records the two static-v1 mouth criterion observation gaps without issuing operationalizations or states', async () => {
    const source = await runPhotoToLipsContourNeutralSurfaceFR66(request(), factory());
    const report = assessLipsPoseNormalizationRequirementsFR67(source);

    expect(report.criterionRequirements).toEqual([
      {
        criterionId: 'criterion.intake.square_broad',
        sourceConcept: '方大',
        modality: 'static_geometry',
        staticV1Eligible: true,
        candidateObservationNeed: 'pose_normalized_mouth_aspect_or_width_metric_plus_calibration',
        operationalizationIssued: false,
        calibrationIssued: false,
        criterionStateIssued: false,
      },
      {
        criterionId: 'criterion.intake.lips_substantial',
        sourceConcept: '端厚',
        modality: 'static_geometry',
        staticV1Eligible: true,
        candidateObservationNeed: 'authorized_outer_inner_lip_geometry_plus_pose_normalized_thickness_metric_plus_calibration',
        operationalizationIssued: false,
        calibrationIssued: false,
        criterionStateIssued: false,
      },
    ]);
  });

  it('rejects forged FR66 authority widening before requirements can be admitted', async () => {
    const source = await runPhotoToLipsContourNeutralSurfaceFR66(request(), factory());
    const variants: readonly [LipsContourNeutralSurfaceFR66V1, RegExp][] = [
      [forged(source, { poseNormalizationIssued: true }), /cannot consume widened FR-66/u],
      [forged(source, { neutralMetricDefinitionsIssued: 1 }), /cannot consume widened FR-66/u],
      [forged(source, { morphologyProduced: true }), /cannot consume widened FR-66/u],
      [forged(source, { criterionStatesIssued: 1 }), /cannot consume widened FR-66/u],
      [forged(source, { claimsIssued: 1 }), /cannot consume widened FR-66/u],
      [forged(source, { traditionalSemanticAuthority: true }), /cannot consume widened FR-66/u],
      [forged(source, { authorityBoundary: { ...source.authorityBoundary, neutralMetricIssuanceAllowed: true } }), /authority boundary/u],
      [forged(source, { blockers: source.blockers.filter((entry) => entry !== 'pose_normalized_lips_geometry_not_issued') }), /blockers/u],
      [forged(source, { prohibitedShortcuts: source.prohibitedShortcuts.filter((entry) => entry !== 'canonical_image_geometry_to_pose_normalized_metric') }), /anti-shortcut/u],
      [forged(source, { provenance: { ...source.provenance, providerDepthPersisted: true } }), /non-persistence/u],
    ];

    for (const [candidate, pattern] of variants) {
      expect(() => assessLipsPoseNormalizationRequirementsFR67(candidate)).toThrow(pattern);
    }
  });

  it('fails closed when a caller asks FR67 to assert normalization readiness', async () => {
    const source = await runPhotoToLipsContourNeutralSurfaceFR66(request(), factory());
    expect(() => assertLipsPoseNormalizationReadyFR67(source)).toThrow(/does not authorize pose-normalized lips geometry/u);
  });

  it('preserves non-persistence provenance', async () => {
    const source = await runPhotoToLipsContourNeutralSurfaceFR66(request(), factory());
    const report = assessLipsPoseNormalizationRequirementsFR67(source);

    expect(report.provenance).toEqual({
      providerRunRef: 'fr67:lips-pose-normalization-requirements',
      canonicalAssetDigest: DIGEST,
      rawSourcePersisted: false,
      rawProviderResponsePersisted: false,
      providerDepthPersisted: false,
      biometricEmbeddingPersisted: false,
    });
  });
});
