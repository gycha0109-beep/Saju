import {
  validateMediaPipeReleaseExactMetricGeometryFR75,
  type MediaPipeReleaseExactMetricGeometryAdmissionFR75V1,
} from './mediapipe-release-exact-metric-geometry-admission-fr75.js';
import { FaceAuthorityValidationError } from './validation.js';

export interface MediaPipeMetricGeometryPointFR76V1 {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

export interface MediaPipeScreenToMetricInputFR76V1 {
  readonly screenLandmarks: readonly MediaPipeMetricGeometryPointFR76V1[];
  readonly canonicalMetricLandmarks: readonly MediaPipeMetricGeometryPointFR76V1[];
  readonly landmarkWeights: readonly number[];
  readonly frameWidth: number;
  readonly frameHeight: number;
}

export interface MediaPipeScreenToMetricOutputFR76V1 {
  readonly schemaVersion: 'fr76-mediapipe-screen-to-metric-output-v1';
  readonly metricLandmarks: readonly MediaPipeMetricGeometryPointFR76V1[];
  readonly poseTransformMatrixPackedColumnMajor: readonly number[];
  readonly firstIterationScale: number;
  readonly secondIterationScale: number;
  readonly totalScale: number;
}

export interface MediaPipeScreenToMetricParityWitnessFR76V1 {
  readonly path: string;
  readonly blobSha: string;
  readonly evidenceRole:
    | 'exact_upstream_face_geometry_test'
    | 'exact_upstream_full_xyz_input_fixture'
    | 'exact_upstream_face_geometry_golden'
    | 'exact_upstream_geometry_metadata';
}

export interface MediaPipeScreenToMetricReimplementationParityFR76V1 {
  readonly schemaVersion: 'fr76-mediapipe-screen-to-metric-reimplementation-parity-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'release_exact_reimplementation_parity_validated';
  readonly upstream: {
    readonly fr75SchemaVersion: 'fr75-mediapipe-release-exact-metric-geometry-admission-v1';
    readonly fr75ArtifactVersion: '0.1.0';
    readonly fr75AuthorityState: 'release_exact_screen_to_metric_source_admitted';
  };
  readonly releaseWitness: {
    readonly repository: 'google-ai-edge/mediapipe';
    readonly releaseTag: 'v0.10.35';
    readonly releaseCommit: 'f8ef212d5c962c0e853db7e59d217056b187084b';
    readonly files: readonly MediaPipeScreenToMetricParityWitnessFR76V1[];
  };
  readonly parityProtocol: {
    readonly implementationPath: 'packages/face-reading/src/mediapipe-screen-to-metric-reimplementation-parity-fr76.ts';
    readonly verifierPath: 'scripts/verify-fr76-mediapipe-parity.mjs';
    readonly frameWidth: 820;
    readonly frameHeight: 1024;
    readonly geometryLandmarkCount: 468;
    readonly expectedPoseMatrixElements: 16;
    readonly providerTolerance: 0.0001;
    readonly exactGitBlobVerificationRequired: true;
    readonly fullMetricLandmarkXYZCompared: true;
    readonly fullPoseMatrixCompared: true;
    readonly inputSource: 'FACE_LANDMARK_PIPELINE';
    readonly originPointLocation: 'TOP_LEFT_CORNER';
    readonly verticalFovDegrees: 63;
    readonly nearPlaneCentimeters: 1;
    readonly farPlaneCentimeters: 10000;
  };
  readonly runtimeAuthority: {
    readonly reimplementationParityValidated: true;
    readonly screenToMetricReimplementationAuthorized: true;
    readonly runtimeMetricGeometryOutputAuthorized: false;
    readonly metricLipsGeometryIssued: false;
    readonly poseNormalizedLipsGeometryIssued: false;
    readonly neutralMetricDefinitionsIssued: 0;
    readonly morphologyProduced: false;
    readonly criterionStatesIssued: 0;
    readonly claimsIssued: 0;
    readonly traditionalSemanticAuthority: false;
    readonly parityValidationAloneAuthorizesProductionOutput: false;
  };
  readonly persistencePolicy: {
    readonly rawProviderResponsePersisted: false;
    readonly rawMetricMeshPersisted: false;
    readonly rawLandmarkDepthPersisted: false;
    readonly parityFixtureBytesPersistedInProductRuntime: false;
  };
  readonly remainingBlockers: readonly [
    'public_web_metric_face_mesh_not_exposed',
    'runtime_metric_geometry_output_not_admitted',
    'fr61_provider_z_not_consumed_as_metric_geometry',
    'outer_inner_lip_roles_not_authorized',
    'mouth_metric_definitions_not_reviewed',
    'mouth_static_thresholds_not_calibrated',
    'five_officers_source_not_scan_checked',
  ];
  readonly prohibitedShortcuts: readonly [
    'golden_parity_to_production_metric_output',
    'screen_to_metric_parity_to_pose_normalized_lips_authority',
    'metric_geometry_to_morphology',
    'metric_geometry_to_traditional_mouth_criteria',
    'first_468_geometry_to_iris_inclusive_478_geometry',
    'provider_tolerance_to_product_calibration_threshold',
  ];
}

type Matrix3 = number[];
type Matrix4 = number[];

const EPSILON = 1e-9;
const JACOBI_EPSILON = 1e-15;
const JACOBI_MAX_SWEEPS = 64;
const EXPECTED_LANDMARK_COUNT = 468;

const PARITY_WITNESSES: readonly MediaPipeScreenToMetricParityWitnessFR76V1[] = Object.freeze([
  Object.freeze({
    path: 'mediapipe/tasks/cc/vision/face_geometry/face_geometry_from_landmarks_graph_test.cc',
    blobSha: '7fa79c5a6524e7907c4c69c4077b4e4d9d98ca96',
    evidenceRole: 'exact_upstream_face_geometry_test' as const,
  }),
  Object.freeze({
    path: 'mediapipe/tasks/testdata/vision/face_blendshapes_in_landmarks.prototxt',
    blobSha: 'ea2e60eefaf6a5c13aee4bb468384edab7e7d5d7',
    evidenceRole: 'exact_upstream_full_xyz_input_fixture' as const,
  }),
  Object.freeze({
    path: 'mediapipe/tasks/testdata/vision/face_geometry_expected_out.pbtxt',
    blobSha: 'df6eaaec358d1c0cda034db7b727bc7ce04f8a5b',
    evidenceRole: 'exact_upstream_face_geometry_golden' as const,
  }),
  Object.freeze({
    path: 'mediapipe/tasks/cc/vision/face_geometry/data/geometry_pipeline_metadata_landmarks.pbtxt',
    blobSha: '252a7b05b24c5c43c5b94179393639f7c9a2fe8f',
    evidenceRole: 'exact_upstream_geometry_metadata' as const,
  }),
]);

const REMAINING_BLOCKERS = Object.freeze([
  'public_web_metric_face_mesh_not_exposed',
  'runtime_metric_geometry_output_not_admitted',
  'fr61_provider_z_not_consumed_as_metric_geometry',
  'outer_inner_lip_roles_not_authorized',
  'mouth_metric_definitions_not_reviewed',
  'mouth_static_thresholds_not_calibrated',
  'five_officers_source_not_scan_checked',
] as const);

const PROHIBITED_SHORTCUTS = Object.freeze([
  'golden_parity_to_production_metric_output',
  'screen_to_metric_parity_to_pose_normalized_lips_authority',
  'metric_geometry_to_morphology',
  'metric_geometry_to_traditional_mouth_criteria',
  'first_468_geometry_to_iris_inclusive_478_geometry',
  'provider_tolerance_to_product_calibration_threshold',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-76 ${message}`);
}

function sameSequence<T>(actual: readonly T[], expected: readonly T[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function finitePoint(point: MediaPipeMetricGeometryPointFR76V1, path: string): void {
  if (!Number.isFinite(point.x) || !Number.isFinite(point.y) || !Number.isFinite(point.z)) {
    fail(`${path} must contain finite x/y/z coordinates.`);
  }
}

function clonePoint(point: MediaPipeMetricGeometryPointFR76V1): MediaPipeMetricGeometryPointFR76V1 {
  return { x: point.x, y: point.y, z: point.z };
}

function identity3(): Matrix3 {
  return [1, 0, 0, 0, 1, 0, 0, 0, 1];
}

function determinant3(matrix: readonly number[]): number {
  return (
    matrix[0]! * (matrix[4]! * matrix[8]! - matrix[5]! * matrix[7]!) -
    matrix[1]! * (matrix[3]! * matrix[8]! - matrix[5]! * matrix[6]!) +
    matrix[2]! * (matrix[3]! * matrix[7]! - matrix[4]! * matrix[6]!)
  );
}

function multiplyMatrix3(left: readonly number[], right: readonly number[]): Matrix3 {
  const result = Array<number>(9).fill(0);
  for (let row = 0; row < 3; row += 1) {
    for (let column = 0; column < 3; column += 1) {
      let value = 0;
      for (let index = 0; index < 3; index += 1) {
        value += left[row * 3 + index]! * right[index * 3 + column]!;
      }
      result[row * 3 + column] = value;
    }
  }
  return result;
}

function transposeMatrix3(matrix: readonly number[]): Matrix3 {
  return [
    matrix[0]!, matrix[3]!, matrix[6]!,
    matrix[1]!, matrix[4]!, matrix[7]!,
    matrix[2]!, matrix[5]!, matrix[8]!,
  ];
}

function multiplyMatrix3Vector(matrix: readonly number[], vector: readonly number[]): [number, number, number] {
  return [
    matrix[0]! * vector[0]! + matrix[1]! * vector[1]! + matrix[2]! * vector[2]!,
    matrix[3]! * vector[0]! + matrix[4]! * vector[1]! + matrix[5]! * vector[2]!,
    matrix[6]! * vector[0]! + matrix[7]! * vector[1]! + matrix[8]! * vector[2]!,
  ];
}

function dot3(left: readonly number[], right: readonly number[]): number {
  return left[0]! * right[0]! + left[1]! * right[1]! + left[2]! * right[2]!;
}

function norm3(vector: readonly number[]): number {
  return Math.sqrt(dot3(vector, vector));
}

function normalize3(vector: readonly number[]): [number, number, number] {
  const norm = norm3(vector);
  if (!(norm > EPSILON)) fail('SVD produced a degenerate singular vector.');
  return [vector[0]! / norm, vector[1]! / norm, vector[2]! / norm];
}

function subtractProjection(
  vector: readonly number[],
  basis: readonly number[],
): [number, number, number] {
  const projection = dot3(vector, basis);
  return [
    vector[0]! - projection * basis[0]!,
    vector[1]! - projection * basis[1]!,
    vector[2]! - projection * basis[2]!,
  ];
}

function column(matrix: readonly number[], columnIndex: number): [number, number, number] {
  return [matrix[columnIndex]!, matrix[3 + columnIndex]!, matrix[6 + columnIndex]!];
}

function setColumn(matrix: Matrix3, columnIndex: number, values: readonly number[]): void {
  matrix[columnIndex] = values[0]!;
  matrix[3 + columnIndex] = values[1]!;
  matrix[6 + columnIndex] = values[2]!;
}

function symmetricEigenDecomposition3(matrix: readonly number[]): {
  readonly values: readonly number[];
  readonly vectors: Matrix3;
} {
  const a = [...matrix];
  const vectors = identity3();

  for (let sweep = 0; sweep < JACOBI_MAX_SWEEPS; sweep += 1) {
    let p = 0;
    let q = 1;
    let maximum = Math.abs(a[1]!);
    const candidates: readonly [number, number][] = [[0, 2], [1, 2]];
    for (const [candidateP, candidateQ] of candidates) {
      const value = Math.abs(a[candidateP * 3 + candidateQ]!);
      if (value > maximum) {
        maximum = value;
        p = candidateP;
        q = candidateQ;
      }
    }
    if (maximum <= JACOBI_EPSILON) break;

    const pp = p * 3 + p;
    const qq = q * 3 + q;
    const pq = p * 3 + q;
    const app = a[pp]!;
    const aqq = a[qq]!;
    const apq = a[pq]!;
    const tau = (aqq - app) / (2 * apq);
    const t = tau >= 0
      ? 1 / (tau + Math.sqrt(1 + tau * tau))
      : -1 / (-tau + Math.sqrt(1 + tau * tau));
    const c = 1 / Math.sqrt(1 + t * t);
    const s = t * c;

    a[pp] = app - t * apq;
    a[qq] = aqq + t * apq;
    a[pq] = 0;
    a[q * 3 + p] = 0;

    for (let k = 0; k < 3; k += 1) {
      if (k === p || k === q) continue;
      const kp = k * 3 + p;
      const kq = k * 3 + q;
      const akp = a[kp]!;
      const akq = a[kq]!;
      const rotatedP = c * akp - s * akq;
      const rotatedQ = s * akp + c * akq;
      a[kp] = rotatedP;
      a[p * 3 + k] = rotatedP;
      a[kq] = rotatedQ;
      a[q * 3 + k] = rotatedQ;
    }

    for (let row = 0; row < 3; row += 1) {
      const vp = vectors[row * 3 + p]!;
      const vq = vectors[row * 3 + q]!;
      vectors[row * 3 + p] = c * vp - s * vq;
      vectors[row * 3 + q] = s * vp + c * vq;
    }
  }

  const order = [0, 1, 2].sort((left, right) => a[right * 3 + right]! - a[left * 3 + left]!);
  const sortedVectors = Array<number>(9).fill(0);
  const values = order.map((sourceColumn, targetColumn) => {
    setColumn(sortedVectors, targetColumn, column(vectors, sourceColumn));
    return a[sourceColumn * 3 + sourceColumn]!;
  });
  return { values, vectors: sortedVectors };
}

function singularValueDecomposition3(design: readonly number[]): {
  readonly u: Matrix3;
  readonly v: Matrix3;
} {
  const transposed = transposeMatrix3(design);
  const gram = multiplyMatrix3(transposed, design);
  const eigen = symmetricEigenDecomposition3(gram);
  const v = eigen.vectors;
  const u = Array<number>(9).fill(0);

  const raw0 = multiplyMatrix3Vector(design, column(v, 0));
  const raw1 = multiplyMatrix3Vector(design, column(v, 1));
  const raw2 = multiplyMatrix3Vector(design, column(v, 2));
  const sigma0 = Math.sqrt(Math.max(eigen.values[0]!, 0));
  const sigma1 = Math.sqrt(Math.max(eigen.values[1]!, 0));
  const sigma2 = Math.sqrt(Math.max(eigen.values[2]!, 0));
  if (!(sigma0 > EPSILON) || !(sigma1 > EPSILON) || !(sigma2 > EPSILON)) {
    fail('weighted Procrustes design matrix must be full rank for FR-76 parity candidate.');
  }

  const u0 = normalize3(raw0.map((value) => value / sigma0));
  const u1 = normalize3(subtractProjection(raw1.map((value) => value / sigma1), u0));
  let u2Candidate = raw2.map((value) => value / sigma2);
  u2Candidate = subtractProjection(u2Candidate, u0);
  u2Candidate = subtractProjection(u2Candidate, u1);
  const u2 = normalize3(u2Candidate);
  setColumn(u, 0, u0);
  setColumn(u, 1, u1);
  setColumn(u, 2, u2);
  return { u, v };
}

export function solveWeightedOrthogonalProblemFR76(
  sourcePoints: readonly MediaPipeMetricGeometryPointFR76V1[],
  targetPoints: readonly MediaPipeMetricGeometryPointFR76V1[],
  pointWeights: readonly number[],
): readonly number[] {
  if (sourcePoints.length === 0 || sourcePoints.length !== targetPoints.length || sourcePoints.length !== pointWeights.length) {
    fail('weighted Procrustes point/weight cardinality mismatch.');
  }

  let totalWeight = 0;
  let sourceCenterX = 0;
  let sourceCenterY = 0;
  let sourceCenterZ = 0;
  for (let index = 0; index < sourcePoints.length; index += 1) {
    const source = sourcePoints[index]!;
    const target = targetPoints[index]!;
    const weight = pointWeights[index]!;
    finitePoint(source, `sourcePoints[${index}]`);
    finitePoint(target, `targetPoints[${index}]`);
    if (!Number.isFinite(weight) || weight < 0) fail(`pointWeights[${index}] must be finite and non-negative.`);
    totalWeight += weight;
    sourceCenterX += source.x * weight;
    sourceCenterY += source.y * weight;
    sourceCenterZ += source.z * weight;
  }
  if (!(totalWeight > EPSILON)) fail('weighted Procrustes total point weight is too small.');
  sourceCenterX /= totalWeight;
  sourceCenterY /= totalWeight;
  sourceCenterZ /= totalWeight;

  const design = Array<number>(9).fill(0);
  let denominator = 0;
  for (let index = 0; index < sourcePoints.length; index += 1) {
    const source = sourcePoints[index]!;
    const target = targetPoints[index]!;
    const weight = pointWeights[index]!;
    if (weight === 0) continue;
    const centered = [source.x - sourceCenterX, source.y - sourceCenterY, source.z - sourceCenterZ] as const;
    const targetVector = [target.x, target.y, target.z] as const;
    for (let row = 0; row < 3; row += 1) {
      for (let col = 0; col < 3; col += 1) {
        design[row * 3 + col] = design[row * 3 + col]! + targetVector[row]! * centered[col]! * weight;
      }
    }
    denominator += dot3(centered, [source.x, source.y, source.z]) * weight;
  }
  if (!(denominator > EPSILON)) fail('weighted Procrustes scale denominator is too small.');

  const svd = singularValueDecomposition3(design);
  const u = [...svd.u];
  const vTranspose = transposeMatrix3(svd.v);
  if (determinant3(u) * determinant3(vTranspose) < 0) {
    setColumn(u, 2, column(u, 2).map((value) => -value));
  }
  const rotation = multiplyMatrix3(u, vTranspose);

  let numerator = 0;
  let weightedTargetX = 0;
  let weightedTargetY = 0;
  let weightedTargetZ = 0;
  for (let index = 0; index < sourcePoints.length; index += 1) {
    const source = sourcePoints[index]!;
    const target = targetPoints[index]!;
    const weight = pointWeights[index]!;
    if (weight === 0) continue;
    const centered = [source.x - sourceCenterX, source.y - sourceCenterY, source.z - sourceCenterZ] as const;
    const rotated = multiplyMatrix3Vector(rotation, centered);
    numerator += (rotated[0] * target.x + rotated[1] * target.y + rotated[2] * target.z) * weight;
    weightedTargetX += target.x * weight;
    weightedTargetY += target.y * weight;
    weightedTargetZ += target.z * weight;
  }
  const scale = numerator / denominator;
  if (!(scale > EPSILON) || !Number.isFinite(scale)) fail('weighted Procrustes scale is too small or non-finite.');

  const sourceCenterRotated = multiplyMatrix3Vector(rotation, [sourceCenterX, sourceCenterY, sourceCenterZ]);
  const translation = [
    weightedTargetX / totalWeight - scale * sourceCenterRotated[0],
    weightedTargetY / totalWeight - scale * sourceCenterRotated[1],
    weightedTargetZ / totalWeight - scale * sourceCenterRotated[2],
  ] as const;

  return Object.freeze([
    scale * rotation[0]!, scale * rotation[1]!, scale * rotation[2]!, translation[0],
    scale * rotation[3]!, scale * rotation[4]!, scale * rotation[5]!, translation[1],
    scale * rotation[6]!, scale * rotation[7]!, scale * rotation[8]!, translation[2],
    0, 0, 0, 1,
  ]);
}

function matrix4Scale(matrix: readonly number[]): number {
  return Math.hypot(matrix[0]!, matrix[4]!, matrix[8]!);
}

function inverseAffineMatrix4(matrix: readonly number[]): Matrix4 {
  const a = [
    matrix[0]!, matrix[1]!, matrix[2]!,
    matrix[4]!, matrix[5]!, matrix[6]!,
    matrix[8]!, matrix[9]!, matrix[10]!,
  ];
  const determinant = determinant3(a);
  if (Math.abs(determinant) <= EPSILON) fail('pose transform matrix is singular.');
  const inverseDeterminant = 1 / determinant;
  const inverseA = [
    (a[4]! * a[8]! - a[5]! * a[7]!) * inverseDeterminant,
    (a[2]! * a[7]! - a[1]! * a[8]!) * inverseDeterminant,
    (a[1]! * a[5]! - a[2]! * a[4]!) * inverseDeterminant,
    (a[5]! * a[6]! - a[3]! * a[8]!) * inverseDeterminant,
    (a[0]! * a[8]! - a[2]! * a[6]!) * inverseDeterminant,
    (a[2]! * a[3]! - a[0]! * a[5]!) * inverseDeterminant,
    (a[3]! * a[7]! - a[4]! * a[6]!) * inverseDeterminant,
    (a[1]! * a[6]! - a[0]! * a[7]!) * inverseDeterminant,
    (a[0]! * a[4]! - a[1]! * a[3]!) * inverseDeterminant,
  ];
  const translation = [matrix[3]!, matrix[7]!, matrix[11]!] as const;
  const inverseTranslationRaw = multiplyMatrix3Vector(inverseA, translation);
  const inverseTranslation = inverseTranslationRaw.map((value) => -value);
  return [
    inverseA[0]!, inverseA[1]!, inverseA[2]!, inverseTranslation[0]!,
    inverseA[3]!, inverseA[4]!, inverseA[5]!, inverseTranslation[1]!,
    inverseA[6]!, inverseA[7]!, inverseA[8]!, inverseTranslation[2]!,
    0, 0, 0, 1,
  ];
}

function transformPoint(matrix: readonly number[], point: MediaPipeMetricGeometryPointFR76V1): MediaPipeMetricGeometryPointFR76V1 {
  return {
    x: matrix[0]! * point.x + matrix[1]! * point.y + matrix[2]! * point.z + matrix[3]!,
    y: matrix[4]! * point.x + matrix[5]! * point.y + matrix[6]! * point.z + matrix[7]!,
    z: matrix[8]! * point.x + matrix[9]! * point.y + matrix[10]! * point.z + matrix[11]!,
  };
}

function packMatrixColumnMajor(matrix: readonly number[]): readonly number[] {
  return Object.freeze([
    matrix[0]!, matrix[4]!, matrix[8]!, matrix[12]!,
    matrix[1]!, matrix[5]!, matrix[9]!, matrix[13]!,
    matrix[2]!, matrix[6]!, matrix[10]!, matrix[14]!,
    matrix[3]!, matrix[7]!, matrix[11]!, matrix[15]!,
  ]);
}

function validateScreenToMetricInput(input: MediaPipeScreenToMetricInputFR76V1): void {
  if (
    input.screenLandmarks.length !== EXPECTED_LANDMARK_COUNT ||
    input.canonicalMetricLandmarks.length !== EXPECTED_LANDMARK_COUNT ||
    input.landmarkWeights.length !== EXPECTED_LANDMARK_COUNT
  ) fail('screen/canonical/weight inputs must each contain exactly 468 geometry landmarks.');
  if (!Number.isInteger(input.frameWidth) || input.frameWidth <= 0 || !Number.isInteger(input.frameHeight) || input.frameHeight <= 0) {
    fail('frameWidth and frameHeight must be positive integers.');
  }
}

export function reimplementMediaPipeScreenToMetricFR76(
  input: MediaPipeScreenToMetricInputFR76V1,
): MediaPipeScreenToMetricOutputFR76V1 {
  validateScreenToMetricInput(input);
  input.screenLandmarks.forEach((point, index) => finitePoint(point, `screenLandmarks[${index}]`));
  input.canonicalMetricLandmarks.forEach((point, index) => finitePoint(point, `canonicalMetricLandmarks[${index}]`));

  const verticalFovRadians = (63 * Math.PI) / 180;
  const nearPlane = 1;
  const heightAtNear = 2 * nearPlane * Math.tan(0.5 * verticalFovRadians);
  const widthAtNear = input.frameWidth * heightAtNear / input.frameHeight;
  const left = -0.5 * widthAtNear;
  const bottom = -0.5 * heightAtNear;

  const projected = input.screenLandmarks.map((point) => ({
    x: point.x * widthAtNear + left,
    y: (1 - point.y) * heightAtNear + bottom,
    z: point.z * widthAtNear,
  }));
  const depthOffset = projected.reduce((sum, point) => sum + point.z, 0) / projected.length;

  const firstIntermediate = projected.map((point) => ({ x: point.x, y: point.y, z: -point.z }));
  const firstPose = solveWeightedOrthogonalProblemFR76(
    input.canonicalMetricLandmarks,
    firstIntermediate,
    input.landmarkWeights,
  );
  const firstIterationScale = matrix4Scale(firstPose);

  const secondIntermediate = projected.map((point) => {
    const z = (point.z - depthOffset + nearPlane) / firstIterationScale;
    return {
      x: (point.x * z) / nearPlane,
      y: (point.y * z) / nearPlane,
      z: -z,
    };
  });
  const secondPose = solveWeightedOrthogonalProblemFR76(
    input.canonicalMetricLandmarks,
    secondIntermediate,
    input.landmarkWeights,
  );
  const secondIterationScale = matrix4Scale(secondPose);
  const totalScale = firstIterationScale * secondIterationScale;

  const runtimeMetricLandmarks = projected.map((point) => {
    const z = (point.z - depthOffset + nearPlane) / totalScale;
    return {
      x: (point.x * z) / nearPlane,
      y: (point.y * z) / nearPlane,
      z: -z,
    };
  });
  const poseTransform = solveWeightedOrthogonalProblemFR76(
    input.canonicalMetricLandmarks,
    runtimeMetricLandmarks,
    input.landmarkWeights,
  );
  const inversePose = inverseAffineMatrix4(poseTransform);
  const metricLandmarks = runtimeMetricLandmarks.map((point) => Object.freeze(transformPoint(inversePose, point)));

  return Object.freeze({
    schemaVersion: 'fr76-mediapipe-screen-to-metric-output-v1' as const,
    metricLandmarks: Object.freeze(metricLandmarks),
    poseTransformMatrixPackedColumnMajor: packMatrixColumnMajor(poseTransform),
    firstIterationScale,
    secondIterationScale,
    totalScale,
  });
}

export function admitMediaPipeScreenToMetricReimplementationParityFR76(
  admission: MediaPipeReleaseExactMetricGeometryAdmissionFR75V1,
): MediaPipeScreenToMetricReimplementationParityFR76V1 {
  validateMediaPipeReleaseExactMetricGeometryFR75(admission);
  if (
    admission.runtimeAuthority.reimplementationParityValidated !== false ||
    admission.runtimeAuthority.screenToMetricReimplementationAuthorized !== false ||
    admission.runtimeAuthority.runtimeMetricGeometryOutputAuthorized !== false
  ) fail('cannot consume widened FR-75 runtime authority.');

  return Object.freeze({
    schemaVersion: 'fr76-mediapipe-screen-to-metric-reimplementation-parity-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'release_exact_reimplementation_parity_validated' as const,
    upstream: Object.freeze({
      fr75SchemaVersion: admission.schemaVersion,
      fr75ArtifactVersion: admission.artifactVersion,
      fr75AuthorityState: admission.authorityState,
    }),
    releaseWitness: Object.freeze({
      repository: 'google-ai-edge/mediapipe' as const,
      releaseTag: 'v0.10.35' as const,
      releaseCommit: 'f8ef212d5c962c0e853db7e59d217056b187084b' as const,
      files: PARITY_WITNESSES,
    }),
    parityProtocol: Object.freeze({
      implementationPath: 'packages/face-reading/src/mediapipe-screen-to-metric-reimplementation-parity-fr76.ts' as const,
      verifierPath: 'scripts/verify-fr76-mediapipe-parity.mjs' as const,
      frameWidth: 820 as const,
      frameHeight: 1024 as const,
      geometryLandmarkCount: 468 as const,
      expectedPoseMatrixElements: 16 as const,
      providerTolerance: 0.0001 as const,
      exactGitBlobVerificationRequired: true as const,
      fullMetricLandmarkXYZCompared: true as const,
      fullPoseMatrixCompared: true as const,
      inputSource: 'FACE_LANDMARK_PIPELINE' as const,
      originPointLocation: 'TOP_LEFT_CORNER' as const,
      verticalFovDegrees: 63 as const,
      nearPlaneCentimeters: 1 as const,
      farPlaneCentimeters: 10000 as const,
    }),
    runtimeAuthority: Object.freeze({
      reimplementationParityValidated: true as const,
      screenToMetricReimplementationAuthorized: true as const,
      runtimeMetricGeometryOutputAuthorized: false as const,
      metricLipsGeometryIssued: false as const,
      poseNormalizedLipsGeometryIssued: false as const,
      neutralMetricDefinitionsIssued: 0 as const,
      morphologyProduced: false as const,
      criterionStatesIssued: 0 as const,
      claimsIssued: 0 as const,
      traditionalSemanticAuthority: false as const,
      parityValidationAloneAuthorizesProductionOutput: false as const,
    }),
    persistencePolicy: Object.freeze({
      rawProviderResponsePersisted: false as const,
      rawMetricMeshPersisted: false as const,
      rawLandmarkDepthPersisted: false as const,
      parityFixtureBytesPersistedInProductRuntime: false as const,
    }),
    remainingBlockers: REMAINING_BLOCKERS,
    prohibitedShortcuts: PROHIBITED_SHORTCUTS,
  });
}

export function validateMediaPipeScreenToMetricReimplementationParityFR76(
  parity: MediaPipeScreenToMetricReimplementationParityFR76V1,
): MediaPipeScreenToMetricReimplementationParityFR76V1 {
  if (
    parity.schemaVersion !== 'fr76-mediapipe-screen-to-metric-reimplementation-parity-v1' ||
    parity.artifactVersion !== '0.1.0' ||
    parity.authorityState !== 'release_exact_reimplementation_parity_validated'
  ) fail('identity/state drift.');
  if (
    parity.upstream.fr75SchemaVersion !== 'fr75-mediapipe-release-exact-metric-geometry-admission-v1' ||
    parity.upstream.fr75ArtifactVersion !== '0.1.0' ||
    parity.upstream.fr75AuthorityState !== 'release_exact_screen_to_metric_source_admitted'
  ) fail('upstream FR-75 boundary drift.');
  if (
    parity.releaseWitness.repository !== 'google-ai-edge/mediapipe' ||
    parity.releaseWitness.releaseTag !== 'v0.10.35' ||
    parity.releaseWitness.releaseCommit !== 'f8ef212d5c962c0e853db7e59d217056b187084b' ||
    parity.releaseWitness.files.length !== PARITY_WITNESSES.length
  ) fail('release witness drift.');
  parity.releaseWitness.files.forEach((file, index) => {
    const expected = PARITY_WITNESSES[index]!;
    if (file.path !== expected.path || file.blobSha !== expected.blobSha || file.evidenceRole !== expected.evidenceRole) {
      fail(`release witness file drift at index ${index}.`);
    }
  });
  const protocol = parity.parityProtocol;
  if (
    protocol.implementationPath !== 'packages/face-reading/src/mediapipe-screen-to-metric-reimplementation-parity-fr76.ts' ||
    protocol.verifierPath !== 'scripts/verify-fr76-mediapipe-parity.mjs' ||
    protocol.frameWidth !== 820 ||
    protocol.frameHeight !== 1024 ||
    protocol.geometryLandmarkCount !== 468 ||
    protocol.expectedPoseMatrixElements !== 16 ||
    protocol.providerTolerance !== 0.0001 ||
    protocol.exactGitBlobVerificationRequired !== true ||
    protocol.fullMetricLandmarkXYZCompared !== true ||
    protocol.fullPoseMatrixCompared !== true ||
    protocol.inputSource !== 'FACE_LANDMARK_PIPELINE' ||
    protocol.originPointLocation !== 'TOP_LEFT_CORNER' ||
    protocol.verticalFovDegrees !== 63 ||
    protocol.nearPlaneCentimeters !== 1 ||
    protocol.farPlaneCentimeters !== 10000
  ) fail('parity protocol drift.');
  const runtime = parity.runtimeAuthority;
  if (
    runtime.reimplementationParityValidated !== true ||
    runtime.screenToMetricReimplementationAuthorized !== true ||
    runtime.runtimeMetricGeometryOutputAuthorized !== false ||
    runtime.metricLipsGeometryIssued !== false ||
    runtime.poseNormalizedLipsGeometryIssued !== false ||
    runtime.neutralMetricDefinitionsIssued !== 0 ||
    runtime.morphologyProduced !== false ||
    runtime.criterionStatesIssued !== 0 ||
    runtime.claimsIssued !== 0 ||
    runtime.traditionalSemanticAuthority !== false ||
    runtime.parityValidationAloneAuthorizesProductionOutput !== false
  ) fail('runtime or semantic authority drift.');
  if (
    parity.persistencePolicy.rawProviderResponsePersisted !== false ||
    parity.persistencePolicy.rawMetricMeshPersisted !== false ||
    parity.persistencePolicy.rawLandmarkDepthPersisted !== false ||
    parity.persistencePolicy.parityFixtureBytesPersistedInProductRuntime !== false
  ) fail('persistence boundary widened.');
  if (!sameSequence(parity.remainingBlockers, REMAINING_BLOCKERS)) fail('required blocker drift.');
  if (!sameSequence(parity.prohibitedShortcuts, PROHIBITED_SHORTCUTS)) fail('prohibited shortcut drift.');
  return parity;
}
