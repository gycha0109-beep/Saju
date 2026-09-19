import { FaceAuthorityValidationError } from './validation.js';

export const FR201_MEDIAPIPE_SOURCE_COMMIT =
  '30590fe8d3fdc57e63a0e9c5b2c0ececffb37301' as const;

export const FR201_DEFAULT_VERTICAL_FOV_DEGREES = 63;
export const FR201_DEFAULT_NEAR_CM = 1;
export const FR201_DEFAULT_FAR_CM = 10000;

export interface FaceGeometryPointFR201V1 {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

export interface FaceGeometryWeightFR201V1 {
  readonly landmarkId: number;
  readonly weight: number;
}

export interface FaceGeometrySimilarityTransformFR201V1 {
  readonly scale: number;
  readonly rotationRowMajor: readonly number[];
  readonly translation: readonly [number, number, number];
  readonly matrixColumnMajor: readonly number[];
}

export interface FaceGeometryMetricResultFR201V1 {
  readonly schemaVersion: 'fr201-mediapipe-metric-face-geometry-v1';
  readonly sourceEvidence: {
    readonly repository: 'google-ai-edge/mediapipe';
    readonly commit: typeof FR201_MEDIAPIPE_SOURCE_COMMIT;
    readonly geometryPipelinePath:
      'mediapipe/tasks/cc/vision/face_geometry/libs/geometry_pipeline.cc';
    readonly metadataPath:
      'mediapipe/modules/face_geometry/data/geometry_pipeline_metadata_landmarks.pbtxt';
  };
  readonly metricLandmarksCanonicalAligned: readonly FaceGeometryPointFR201V1[];
  readonly firstIterationScale: number;
  readonly secondIterationScale: number;
  readonly totalUnprojectionScale: number;
  readonly poseTransform: FaceGeometrySimilarityTransformFR201V1;
  readonly providerIndexAdmissionAuthorized: false;
  readonly anatomicalZygionClaimAuthorized: false;
  readonly numericAcceptanceThresholdAuthorized: false;
  readonly calibrationAuthorized: false;
  readonly classifierAuthorized: false;
  readonly traditionalProjectionAuthorized: false;
  readonly productionAuthorized: false;
  readonly commerceAuthorized: false;
}

type Vec3 = [number, number, number];
type Mat3 = [number, number, number, number, number, number, number, number, number];

const EPS = 1e-10;

function finite(value: number, path: string): void {
  if (!Number.isFinite(value)) {
    throw new FaceAuthorityValidationError(`${path} must be finite.`);
  }
}

function vecAdd(a: Vec3, b: Vec3): Vec3 {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function vecSub(a: Vec3, b: Vec3): Vec3 {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function vecScale(a: Vec3, scalar: number): Vec3 {
  return [a[0] * scalar, a[1] * scalar, a[2] * scalar];
}

function dot(a: Vec3, b: Vec3): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function norm(a: Vec3): number {
  return Math.sqrt(dot(a, a));
}

function normalize(a: Vec3): Vec3 {
  const length = norm(a);
  if (!(length > EPS)) {
    throw new FaceAuthorityValidationError('FR201 cannot normalize a zero-length vector.');
  }
  return vecScale(a, 1 / length);
}

function cross(a: Vec3, b: Vec3): Vec3 {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function matVec(m: Mat3, v: Vec3): Vec3 {
  return [
    m[0] * v[0] + m[1] * v[1] + m[2] * v[2],
    m[3] * v[0] + m[4] * v[1] + m[5] * v[2],
    m[6] * v[0] + m[7] * v[1] + m[8] * v[2],
  ];
}

function matTranspose(m: Mat3): Mat3 {
  return [m[0], m[3], m[6], m[1], m[4], m[7], m[2], m[5], m[8]];
}

function matMul(a: Mat3, b: Mat3): Mat3 {
  const out = Array<number>(9).fill(0);
  for (let row = 0; row < 3; row += 1) {
    for (let col = 0; col < 3; col += 1) {
      let value = 0;
      for (let k = 0; k < 3; k += 1) {
        value += a[row * 3 + k]! * b[k * 3 + col]!;
      }
      out[row * 3 + col] = value;
    }
  }
  return out as Mat3;
}

function determinant(m: Mat3): number {
  return (
    m[0] * (m[4] * m[8] - m[5] * m[7]) -
    m[1] * (m[3] * m[8] - m[5] * m[6]) +
    m[2] * (m[3] * m[7] - m[4] * m[6])
  );
}

function symmetricEigenvectors3x3(input: Mat3): {
  readonly values: readonly [number, number, number];
  readonly vectors: Mat3;
} {
  const a = [...input] as Mat3;
  const v: Mat3 = [1, 0, 0, 0, 1, 0, 0, 0, 1];

  for (let iteration = 0; iteration < 64; iteration += 1) {
    const pairs: readonly [number, number][] = [
      [0, 1],
      [0, 2],
      [1, 2],
    ];
    let p = 0;
    let q = 1;
    let max = Math.abs(a[1]);
    for (const pair of pairs) {
      const candidate = Math.abs(a[pair[0] * 3 + pair[1]]!);
      if (candidate > max) {
        max = candidate;
        p = pair[0];
        q = pair[1];
      }
    }
    if (max < 1e-12) break;

    const app = a[p * 3 + p]!;
    const aqq = a[q * 3 + q]!;
    const apq = a[p * 3 + q]!;
    const angle = 0.5 * Math.atan2(2 * apq, aqq - app);
    const cosine = Math.cos(angle);
    const sine = Math.sin(angle);

    for (let k = 0; k < 3; k += 1) {
      const apk = a[p * 3 + k]!;
      const aqk = a[q * 3 + k]!;
      a[p * 3 + k] = cosine * apk - sine * aqk;
      a[q * 3 + k] = sine * apk + cosine * aqk;
    }
    for (let k = 0; k < 3; k += 1) {
      const akp = a[k * 3 + p]!;
      const akq = a[k * 3 + q]!;
      a[k * 3 + p] = cosine * akp - sine * akq;
      a[k * 3 + q] = sine * akp + cosine * akq;
    }
    for (let k = 0; k < 3; k += 1) {
      const vkp = v[k * 3 + p]!;
      const vkq = v[k * 3 + q]!;
      v[k * 3 + p] = cosine * vkp - sine * vkq;
      v[k * 3 + q] = sine * vkp + cosine * vkq;
    }
  }

  const eigen = [
    { value: a[0], column: 0 },
    { value: a[4], column: 1 },
    { value: a[8], column: 2 },
  ].sort((left, right) => right.value - left.value);

  const vectors = Array<number>(9).fill(0);
  const values: number[] = [];
  for (let newColumn = 0; newColumn < 3; newColumn += 1) {
    const oldColumn = eigen[newColumn]!.column;
    values.push(Math.max(0, eigen[newColumn]!.value));
    for (let row = 0; row < 3; row += 1) {
      vectors[row * 3 + newColumn] = v[row * 3 + oldColumn]!;
    }
  }

  return {
    values: values as [number, number, number],
    vectors: vectors as Mat3,
  };
}

function optimalRotation(design: Mat3): Mat3 {
  const transpose = matTranspose(design);
  const normal = matMul(transpose, design);
  const eigen = symmetricEigenvectors3x3(normal);
  const singular = eigen.values.map((value) => Math.sqrt(Math.max(0, value)));

  const vColumns: Vec3[] = [0, 1, 2].map((column) => [
    eigen.vectors[column]!,
    eigen.vectors[3 + column]!,
    eigen.vectors[6 + column]!,
  ]);

  const uColumns: Vec3[] = [];
  for (let column = 0; column < 3; column += 1) {
    const sigma = singular[column]!;
    if (sigma > EPS) {
      uColumns.push(normalize(vecScale(matVec(design, vColumns[column]!), 1 / sigma)));
    } else if (column === 2 && uColumns.length === 2) {
      uColumns.push(normalize(cross(uColumns[0]!, uColumns[1]!)));
    } else {
      throw new FaceAuthorityValidationError('FR201 Procrustes design matrix is rank deficient.');
    }
  }

  // Stabilize U after floating point eigen/SVD reconstruction.
  uColumns[0] = normalize(uColumns[0]!);
  uColumns[1] = normalize(
    vecSub(uColumns[1]!, vecScale(uColumns[0]!, dot(uColumns[1]!, uColumns[0]!))),
  );
  uColumns[2] = normalize(cross(uColumns[0]!, uColumns[1]!));

  let u: Mat3 = [
    uColumns[0][0], uColumns[1][0], uColumns[2][0],
    uColumns[0][1], uColumns[1][1], uColumns[2][1],
    uColumns[0][2], uColumns[1][2], uColumns[2][2],
  ];
  const v: Mat3 = [
    vColumns[0]![0], vColumns[1]![0], vColumns[2]![0],
    vColumns[0]![1], vColumns[1]![1], vColumns[2]![1],
    vColumns[0]![2], vColumns[1]![2], vColumns[2]![2],
  ];

  if (determinant(u) * determinant(matTranspose(v)) < 0) {
    u = [
      u[0], u[1], -u[2],
      u[3], u[4], -u[5],
      u[6], u[7], -u[8],
    ];
  }
  return matMul(u, matTranspose(v));
}

export function solveWeightedSimilarityFR201(input: {
  readonly source: readonly FaceGeometryPointFR201V1[];
  readonly target: readonly FaceGeometryPointFR201V1[];
  readonly weights: readonly number[];
}): FaceGeometrySimilarityTransformFR201V1 {
  const { source, target, weights } = input;
  if (source.length === 0 || source.length !== target.length || source.length !== weights.length) {
    throw new FaceAuthorityValidationError(
      'FR201 weighted similarity requires equal non-empty source/target/weight arrays.',
    );
  }

  let totalWeight = 0;
  let sourceCenter: Vec3 = [0, 0, 0];
  let targetCenter: Vec3 = [0, 0, 0];
  for (let index = 0; index < source.length; index += 1) {
    const weight = weights[index]!;
    finite(weight, `fr201.weights[${index}]`);
    if (weight < 0) {
      throw new FaceAuthorityValidationError('FR201 Procrustes weights must be non-negative.');
    }
    const s = source[index]!;
    const t = target[index]!;
    for (const [value, label] of [
      [s.x, 'source.x'],
      [s.y, 'source.y'],
      [s.z, 'source.z'],
      [t.x, 'target.x'],
      [t.y, 'target.y'],
      [t.z, 'target.z'],
    ] as const) {
      finite(value, `fr201.${label}[${index}]`);
    }
    totalWeight += weight;
    sourceCenter = vecAdd(sourceCenter, vecScale([s.x, s.y, s.z], weight));
    targetCenter = vecAdd(targetCenter, vecScale([t.x, t.y, t.z], weight));
  }
  if (!(totalWeight > EPS)) {
    throw new FaceAuthorityValidationError('FR201 total Procrustes weight must be positive.');
  }
  sourceCenter = vecScale(sourceCenter, 1 / totalWeight);
  targetCenter = vecScale(targetCenter, 1 / totalWeight);

  const design = Array<number>(9).fill(0);
  let denominator = 0;
  for (let index = 0; index < source.length; index += 1) {
    const weight = weights[index]!;
    if (weight === 0) continue;
    const s = vecSub(
      [source[index]!.x, source[index]!.y, source[index]!.z],
      sourceCenter,
    );
    const t = vecSub(
      [target[index]!.x, target[index]!.y, target[index]!.z],
      targetCenter,
    );
    denominator += weight * dot(s, s);
    for (let row = 0; row < 3; row += 1) {
      for (let col = 0; col < 3; col += 1) {
        design[row * 3 + col] =
          design[row * 3 + col]! + weight * t[row]! * s[col]!;
      }
    }
  }
  if (!(denominator > EPS)) {
    throw new FaceAuthorityValidationError('FR201 Procrustes source variance is too small.');
  }

  const rotation = optimalRotation(design as Mat3);
  let numerator = 0;
  for (let index = 0; index < source.length; index += 1) {
    const weight = weights[index]!;
    if (weight === 0) continue;
    const s = vecSub(
      [source[index]!.x, source[index]!.y, source[index]!.z],
      sourceCenter,
    );
    const t = vecSub(
      [target[index]!.x, target[index]!.y, target[index]!.z],
      targetCenter,
    );
    numerator += weight * dot(matVec(rotation, s), t);
  }
  const scale = numerator / denominator;
  if (!(scale > EPS)) {
    throw new FaceAuthorityValidationError('FR201 Procrustes scale must be positive.');
  }

  const rotatedSourceCenter = vecScale(matVec(rotation, sourceCenter), scale);
  const translation = vecSub(targetCenter, rotatedSourceCenter);
  const rs = rotation.map((value) => value * scale) as Mat3;
  const matrixColumnMajor = Object.freeze([
    rs[0], rs[3], rs[6], 0,
    rs[1], rs[4], rs[7], 0,
    rs[2], rs[5], rs[8], 0,
    translation[0], translation[1], translation[2], 1,
  ]);

  return Object.freeze({
    scale,
    rotationRowMajor: Object.freeze([...rotation]),
    translation: Object.freeze([...translation]) as readonly [number, number, number],
    matrixColumnMajor,
  });
}

function applyInverseSimilarity(
  transform: FaceGeometrySimilarityTransformFR201V1,
  point: FaceGeometryPointFR201V1,
): FaceGeometryPointFR201V1 {
  const translated: Vec3 = [
    point.x - transform.translation[0],
    point.y - transform.translation[1],
    point.z - transform.translation[2],
  ];
  const rotation = transform.rotationRowMajor as Mat3;
  const aligned = matVec(matTranspose(rotation), translated);
  return Object.freeze({
    x: aligned[0] / transform.scale,
    y: aligned[1] / transform.scale,
    z: aligned[2] / transform.scale,
  });
}

export function convertScreenLandmarksToMetricFR201(input: {
  readonly screenLandmarks: readonly FaceGeometryPointFR201V1[];
  readonly canonicalMetricLandmarks: readonly FaceGeometryPointFR201V1[];
  readonly landmarkWeights: readonly FaceGeometryWeightFR201V1[];
  readonly frameWidth: number;
  readonly frameHeight: number;
  readonly verticalFovDegrees?: number;
  readonly nearCm?: number;
}): FaceGeometryMetricResultFR201V1 {
  const {
    screenLandmarks,
    canonicalMetricLandmarks,
    landmarkWeights,
    frameWidth,
    frameHeight,
  } = input;
  if (
    screenLandmarks.length !== 468 ||
    canonicalMetricLandmarks.length !== 468 ||
    !(frameWidth > 0) ||
    !(frameHeight > 0)
  ) {
    throw new FaceAuthorityValidationError(
      'FR201 requires 468 screen/canonical landmarks and positive frame dimensions.',
    );
  }

  const verticalFovDegrees = input.verticalFovDegrees ?? FR201_DEFAULT_VERTICAL_FOV_DEGREES;
  const nearCm = input.nearCm ?? FR201_DEFAULT_NEAR_CM;
  finite(verticalFovDegrees, 'fr201.verticalFovDegrees');
  finite(nearCm, 'fr201.nearCm');
  if (!(verticalFovDegrees > 0 && verticalFovDegrees < 180) || !(nearCm > 0)) {
    throw new FaceAuthorityValidationError('FR201 camera configuration is invalid.');
  }

  const weights = Array<number>(468).fill(0);
  for (const entry of landmarkWeights) {
    if (!Number.isInteger(entry.landmarkId) || entry.landmarkId < 0 || entry.landmarkId >= 468) {
      throw new FaceAuthorityValidationError('FR201 Procrustes landmark id is out of bounds.');
    }
    finite(entry.weight, 'fr201.landmarkWeight');
    if (entry.weight < 0) {
      throw new FaceAuthorityValidationError('FR201 Procrustes landmark weight must be non-negative.');
    }
    weights[entry.landmarkId] = entry.weight;
  }

  const heightAtNear =
    2 * nearCm * Math.tan((0.5 * verticalFovDegrees * Math.PI) / 180);
  const widthAtNear = (frameWidth * heightAtNear) / frameHeight;
  const left = -0.5 * widthAtNear;
  const bottom = -0.5 * heightAtNear;

  const projected = screenLandmarks.map((landmark, index) => {
    finite(landmark.x, `fr201.screen[${index}].x`);
    finite(landmark.y, `fr201.screen[${index}].y`);
    finite(landmark.z, `fr201.screen[${index}].z`);
    return {
      x: landmark.x * widthAtNear + left,
      y: (1 - landmark.y) * heightAtNear + bottom,
      z: landmark.z * widthAtNear,
    };
  });
  const depthOffset =
    projected.reduce((sum, landmark) => sum + landmark.z, 0) / projected.length;

  const changeHandedness = (
    landmarks: readonly FaceGeometryPointFR201V1[],
  ): FaceGeometryPointFR201V1[] =>
    landmarks.map((landmark) => ({
      x: landmark.x,
      y: landmark.y,
      z: -landmark.z,
    }));

  const estimateScale = (landmarks: readonly FaceGeometryPointFR201V1[]): number =>
    solveWeightedSimilarityFR201({
      source: canonicalMetricLandmarks,
      target: landmarks,
      weights,
    }).scale;

  const firstIterationScale = estimateScale(changeHandedness(projected));

  const unproject = (
    scale: number,
    landmarks: readonly FaceGeometryPointFR201V1[],
  ): FaceGeometryPointFR201V1[] =>
    changeHandedness(
      landmarks.map((landmark) => {
        const z = (landmark.z - depthOffset + nearCm) / scale;
        return {
          x: (landmark.x * z) / nearCm,
          y: (landmark.y * z) / nearCm,
          z,
        };
      }),
    );

  const intermediate = unproject(firstIterationScale, projected);
  const secondIterationScale = estimateScale(intermediate);
  const totalUnprojectionScale = firstIterationScale * secondIterationScale;
  const metricRuntime = unproject(totalUnprojectionScale, projected);
  const poseTransform = solveWeightedSimilarityFR201({
    source: canonicalMetricLandmarks,
    target: metricRuntime,
    weights,
  });
  const aligned = metricRuntime.map((landmark) =>
    applyInverseSimilarity(poseTransform, landmark),
  );

  return Object.freeze({
    schemaVersion: 'fr201-mediapipe-metric-face-geometry-v1' as const,
    sourceEvidence: Object.freeze({
      repository: 'google-ai-edge/mediapipe' as const,
      commit: FR201_MEDIAPIPE_SOURCE_COMMIT,
      geometryPipelinePath:
        'mediapipe/tasks/cc/vision/face_geometry/libs/geometry_pipeline.cc' as const,
      metadataPath:
        'mediapipe/modules/face_geometry/data/geometry_pipeline_metadata_landmarks.pbtxt' as const,
    }),
    metricLandmarksCanonicalAligned: Object.freeze(aligned),
    firstIterationScale,
    secondIterationScale,
    totalUnprojectionScale,
    poseTransform,
    providerIndexAdmissionAuthorized: false as const,
    anatomicalZygionClaimAuthorized: false as const,
    numericAcceptanceThresholdAuthorized: false as const,
    calibrationAuthorized: false as const,
    classifierAuthorized: false as const,
    traditionalProjectionAuthorized: false as const,
    productionAuthorized: false as const,
    commerceAuthorized: false as const,
  });
}
