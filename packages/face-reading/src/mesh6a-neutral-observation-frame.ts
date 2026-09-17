import {
  assertIssuedGovernedMetricGeometryFR77,
  type GovernedMetricGeometryCandidateFR77V1,
} from './governed-metric-geometry-runtime-fr77.js';
import { FaceAuthorityValidationError } from './validation.js';

const LANDMARK_COUNT = 468;

export type Mesh6ACaptureQualityBlocker =
  | 'capture_quality_thresholds_not_calibrated'
  | 'expression_neutrality_not_validated'
  | 'occlusion_validity_not_validated'
  | 'multi_capture_repeatability_not_validated'
  | 'morphology_metric_definitions_not_authorized';

export interface Mesh6APoint3D {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

export interface Mesh6ABounds3D {
  readonly min: Mesh6APoint3D;
  readonly max: Mesh6APoint3D;
  readonly span: Mesh6APoint3D;
}

export interface Mesh6AThresholdFreeDiagnostics {
  readonly landmarkCount: 468;
  readonly allCoordinatesFinite: true;
  readonly poseTransformFinite: true;
  readonly frameDimensionsPositive: true;
  readonly nonDegenerateAxisCount: number;
  readonly centroidCm: Mesh6APoint3D;
  readonly boundsCm: Mesh6ABounds3D;
  readonly rmsRadiusCm: number;
  readonly poseLinearDeterminant: number;
}

export interface Mesh6AObservationFrameV1 {
  readonly schemaVersion: 'mesh6a-neutral-observation-frame-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'threshold_free_observation_frame_only';
  readonly source: {
    readonly schemaVersion: 'fr77-governed-metric-geometry-candidate-v1';
    readonly authorityState: 'governed_metric_geometry_candidate_only';
    readonly providerRunRef: string;
    readonly canonicalAssetDigest: string;
    readonly releaseCommit: string;
    readonly geometryMetadataBlobSha: string;
  };
  readonly coordinateFrame: 'canonical_aligned_right_handed_metric_3d';
  readonly unit: 'centimeter';
  readonly frame: {
    readonly width: number;
    readonly height: number;
  };
  readonly metricLandmarks: readonly Mesh6APoint3D[];
  readonly poseTransformMatrixPackedColumnMajor: readonly number[];
  readonly diagnostics: Mesh6AThresholdFreeDiagnostics;
  readonly captureQuality: {
    readonly thresholdFreeDiagnosticsIssued: true;
    readonly captureQualityThresholdsDefined: false;
    readonly captureQualityPassFailIssued: false;
    readonly frontalPoseAdequacyVerified: false;
    readonly expressionNeutralityVerified: false;
    readonly occlusionValidityVerified: false;
    readonly repeatedCaptureStabilityVerified: false;
  };
  readonly metricEligibility: {
    readonly candidateGeometryAvailable: true;
    readonly weightedRegionAttachmentAllowedForResearchInspection: true;
    readonly morphologyMetricEvaluationAllowed: false;
    readonly productionMorphologyMetricAllowed: false;
    readonly state: 'blocked_pending_capture_quality_and_metric_calibration';
    readonly blockers: readonly Mesh6ACaptureQualityBlocker[];
  };
  readonly authorityBoundary: {
    readonly fr77PoseNormalizationReimplemented: false;
    readonly canonicalInversePoseSemanticsInheritedFromFR77: true;
    readonly frData05RawPixelsPromotedToQualityAuthority: false;
    readonly frData12EvaluationReadinessPromotedToRuntimeAuthority: false;
    readonly subjectSpecific3DReconstructionClaimed: false;
    readonly anatomicalDiagnosticClaimed: false;
    readonly traditionalSemanticAuthority: false;
    readonly morphologyProduced: false;
    readonly criterionStatesIssued: 0;
    readonly claimsIssued: 0;
  };
  readonly persistencePolicy: {
    readonly rawSourcePersisted: false;
    readonly rawProviderResponsePersisted: false;
    readonly rawProviderDepthPersisted: false;
    readonly derivedMetricGeometryPersisted: false;
    readonly biometricEmbeddingPersisted: false;
  };
}

const BLOCKERS = Object.freeze([
  'capture_quality_thresholds_not_calibrated',
  'expression_neutrality_not_validated',
  'occlusion_validity_not_validated',
  'multi_capture_repeatability_not_validated',
  'morphology_metric_definitions_not_authorized',
] as const satisfies readonly Mesh6ACaptureQualityBlocker[]);

const ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`MESH6A ${message}`);
}

function point(x: number, y: number, z: number): Mesh6APoint3D {
  return Object.freeze({ x, y, z });
}

function determinant3x3FromPackedColumnMajor(matrix: readonly number[]): number {
  if (matrix.length !== 16 || matrix.some((value) => !Number.isFinite(value))) {
    fail('requires the finite 4x4 FR77 pose transform matrix.');
  }
  const m00 = matrix[0]!;
  const m01 = matrix[4]!;
  const m02 = matrix[8]!;
  const m10 = matrix[1]!;
  const m11 = matrix[5]!;
  const m12 = matrix[9]!;
  const m20 = matrix[2]!;
  const m21 = matrix[6]!;
  const m22 = matrix[10]!;
  return (
    m00 * (m11 * m22 - m12 * m21) -
    m01 * (m10 * m22 - m12 * m20) +
    m02 * (m10 * m21 - m11 * m20)
  );
}

function diagnostics(source: GovernedMetricGeometryCandidateFR77V1): Mesh6AThresholdFreeDiagnostics {
  if (source.metricLandmarks.length !== LANDMARK_COUNT) {
    fail(`requires exactly ${LANDMARK_COUNT} FR77 metric landmarks.`);
  }
  if (!Number.isInteger(source.frame.width) || source.frame.width <= 0 ||
      !Number.isInteger(source.frame.height) || source.frame.height <= 0) {
    fail('requires positive integer FR77 frame dimensions.');
  }

  let minX = Number.POSITIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let minZ = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;
  let maxZ = Number.NEGATIVE_INFINITY;
  let sumX = 0;
  let sumY = 0;
  let sumZ = 0;

  for (let index = 0; index < source.metricLandmarks.length; index += 1) {
    const landmark = source.metricLandmarks[index];
    if (landmark === undefined || !Number.isFinite(landmark.x) ||
        !Number.isFinite(landmark.y) || !Number.isFinite(landmark.z)) {
      fail(`FR77 metric landmark ${index} must contain finite XYZ.`);
    }
    minX = Math.min(minX, landmark.x);
    minY = Math.min(minY, landmark.y);
    minZ = Math.min(minZ, landmark.z);
    maxX = Math.max(maxX, landmark.x);
    maxY = Math.max(maxY, landmark.y);
    maxZ = Math.max(maxZ, landmark.z);
    sumX += landmark.x;
    sumY += landmark.y;
    sumZ += landmark.z;
  }

  const centroid = point(sumX / LANDMARK_COUNT, sumY / LANDMARK_COUNT, sumZ / LANDMARK_COUNT);
  let squaredRadiusSum = 0;
  for (const landmark of source.metricLandmarks) {
    const dx = landmark.x - centroid.x;
    const dy = landmark.y - centroid.y;
    const dz = landmark.z - centroid.z;
    squaredRadiusSum += dx * dx + dy * dy + dz * dz;
  }

  const span = point(maxX - minX, maxY - minY, maxZ - minZ);
  const nonDegenerateAxisCount = [span.x, span.y, span.z].filter((value) => value > 0).length;
  const rmsRadiusCm = Math.sqrt(squaredRadiusSum / LANDMARK_COUNT);
  const poseLinearDeterminant = determinant3x3FromPackedColumnMajor(
    source.poseTransformMatrixPackedColumnMajor,
  );
  if (!Number.isFinite(rmsRadiusCm) || !Number.isFinite(poseLinearDeterminant)) {
    fail('threshold-free geometry diagnostics must remain finite.');
  }

  return Object.freeze({
    landmarkCount: 468 as const,
    allCoordinatesFinite: true as const,
    poseTransformFinite: true as const,
    frameDimensionsPositive: true as const,
    nonDegenerateAxisCount,
    centroidCm: centroid,
    boundsCm: Object.freeze({
      min: point(minX, minY, minZ),
      max: point(maxX, maxY, maxZ),
      span,
    }),
    rmsRadiusCm,
    poseLinearDeterminant,
  });
}

export function buildMesh6ANeutralObservationFrame(
  source: GovernedMetricGeometryCandidateFR77V1,
): Mesh6AObservationFrameV1 {
  assertIssuedGovernedMetricGeometryFR77(source);
  if (
    source.coordinateFrame !== 'canonical_aligned_right_handed_metric_3d' ||
    source.unit !== 'centimeter' ||
    source.provider.geometryLandmarkCount !== 468 ||
    source.provider.irisLandmarksExcluded !== true ||
    source.authorityBoundary.governedResearchMetricGeometryOutputAuthorized !== true ||
    source.authorityBoundary.productionNeutralObservationIssued !== false ||
    source.authorityBoundary.morphologyProduced !== false ||
    source.authorityBoundary.traditionalSemanticAuthority !== false
  ) fail('requires the exact fail-closed FR77 governed metric geometry boundary.');

  const output: Mesh6AObservationFrameV1 = Object.freeze({
    schemaVersion: 'mesh6a-neutral-observation-frame-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'threshold_free_observation_frame_only' as const,
    source: Object.freeze({
      schemaVersion: source.schemaVersion,
      authorityState: source.authorityState,
      providerRunRef: source.provider.providerRunRef,
      canonicalAssetDigest: source.provider.canonicalAssetDigest,
      releaseCommit: source.geometryProfile.releaseCommit,
      geometryMetadataBlobSha: source.geometryProfile.metadataBlobSha,
    }),
    coordinateFrame: source.coordinateFrame,
    unit: source.unit,
    frame: Object.freeze({ width: source.frame.width, height: source.frame.height }),
    metricLandmarks: source.metricLandmarks,
    poseTransformMatrixPackedColumnMajor: source.poseTransformMatrixPackedColumnMajor,
    diagnostics: diagnostics(source),
    captureQuality: Object.freeze({
      thresholdFreeDiagnosticsIssued: true as const,
      captureQualityThresholdsDefined: false as const,
      captureQualityPassFailIssued: false as const,
      frontalPoseAdequacyVerified: false as const,
      expressionNeutralityVerified: false as const,
      occlusionValidityVerified: false as const,
      repeatedCaptureStabilityVerified: false as const,
    }),
    metricEligibility: Object.freeze({
      candidateGeometryAvailable: true as const,
      weightedRegionAttachmentAllowedForResearchInspection: true as const,
      morphologyMetricEvaluationAllowed: false as const,
      productionMorphologyMetricAllowed: false as const,
      state: 'blocked_pending_capture_quality_and_metric_calibration' as const,
      blockers: BLOCKERS,
    }),
    authorityBoundary: Object.freeze({
      fr77PoseNormalizationReimplemented: false as const,
      canonicalInversePoseSemanticsInheritedFromFR77: true as const,
      frData05RawPixelsPromotedToQualityAuthority: false as const,
      frData12EvaluationReadinessPromotedToRuntimeAuthority: false as const,
      subjectSpecific3DReconstructionClaimed: false as const,
      anatomicalDiagnosticClaimed: false as const,
      traditionalSemanticAuthority: false as const,
      morphologyProduced: false as const,
      criterionStatesIssued: 0 as const,
      claimsIssued: 0 as const,
    }),
    persistencePolicy: Object.freeze({
      rawSourcePersisted: false as const,
      rawProviderResponsePersisted: false as const,
      rawProviderDepthPersisted: false as const,
      derivedMetricGeometryPersisted: false as const,
      biometricEmbeddingPersisted: false as const,
    }),
  });
  ISSUED.add(output);
  return output;
}

export function assertIssuedMesh6ANeutralObservationFrame(
  frame: Mesh6AObservationFrameV1,
): void {
  if (!ISSUED.has(frame)) fail('observation frame was not issued from an active FR77 governed candidate.');
  if (
    frame.schemaVersion !== 'mesh6a-neutral-observation-frame-v1' ||
    frame.authorityState !== 'threshold_free_observation_frame_only' ||
    frame.coordinateFrame !== 'canonical_aligned_right_handed_metric_3d' ||
    frame.unit !== 'centimeter' ||
    frame.metricLandmarks.length !== LANDMARK_COUNT ||
    frame.captureQuality.captureQualityThresholdsDefined !== false ||
    frame.captureQuality.captureQualityPassFailIssued !== false ||
    frame.metricEligibility.morphologyMetricEvaluationAllowed !== false ||
    frame.metricEligibility.productionMorphologyMetricAllowed !== false ||
    frame.authorityBoundary.fr77PoseNormalizationReimplemented !== false ||
    frame.authorityBoundary.canonicalInversePoseSemanticsInheritedFromFR77 !== true ||
    frame.authorityBoundary.morphologyProduced !== false ||
    frame.authorityBoundary.traditionalSemanticAuthority !== false
  ) fail('issued MESH6A observation frame authority drift.');
}
