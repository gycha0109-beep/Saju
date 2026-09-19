import { FaceAuthorityValidationError } from './validation.js';

export const FR200_MEDIAPIPE_SOURCE_COMMIT =
  '30590fe8d3fdc57e63a0e9c5b2c0ececffb37301' as const;
export const FR200_MEDIAPIPE_RUNTIME_PACKAGE = '@mediapipe/tasks-vision' as const;
export const FR200_MEDIAPIPE_RUNTIME_VERSION = '0.10.35' as const;

export const FR200_FACE_OVAL_VERTICES = Object.freeze([
  10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379,
  378, 400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127,
  162, 21, 54, 103, 67, 109,
] as const);

export const FR200_LEFT_EYE_VERTICES = Object.freeze([
  263, 249, 390, 373, 374, 380, 381, 382, 362, 466, 388, 387, 386, 385, 384,
  398,
] as const);

export const FR200_RIGHT_EYE_VERTICES = Object.freeze([
  33, 7, 163, 144, 145, 153, 154, 155, 133, 246, 161, 160, 159, 158, 157, 173,
] as const);

export const FR200_LIP_VERTICES = Object.freeze([
  61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291, 185, 40, 39, 37, 0, 267,
  269, 270, 409, 78, 95, 88, 178, 87, 14, 317, 402, 318, 324, 308, 191, 80,
  81, 82, 13, 312, 311, 310, 415,
] as const);

export interface MediaPipeLandmarkFR200V1 {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

export interface MediaPipeMatrixFR200V1 {
  readonly rows: number;
  readonly columns: number;
  readonly data: readonly number[];
}

export interface MediaPipeMidfaceEnvelopeReceiptFR200V1 {
  readonly schemaVersion: 'fr200-mediapipe-midface-envelope-v1';
  readonly authorityState: 'research_geometry_proxy_only';
  readonly sourceEvidence: {
    readonly repository: 'google-ai-edge/mediapipe';
    readonly commit: typeof FR200_MEDIAPIPE_SOURCE_COMMIT;
    readonly topologySymbol: 'FACE_LANDMARKS_FACE_OVAL';
    readonly runtimePackageName: typeof FR200_MEDIAPIPE_RUNTIME_PACKAGE;
    readonly runtimePackageVersion: typeof FR200_MEDIAPIPE_RUNTIME_VERSION;
  };
  readonly geometry: {
    readonly landmarkCount: number;
    readonly eyeLineRollRadians: number;
    readonly faceOvalHeight: number;
    readonly fullOvalWidth: number;
    readonly fixed234454Width: number;
    readonly bandEnvelopeWidth: number;
    readonly fullOvalWidthByOvalHeight: number;
    readonly fixed234454WidthByOvalHeight: number;
    readonly bandEnvelopeWidthByOvalHeight: number;
    readonly bandDefinition: 'roll_normalized_eye_line_to_halfway_lip_line';
    readonly bandTopY: number;
    readonly bandBottomY: number;
    readonly bandPointCount: number;
    readonly bandEnvelopeProviderIndices: readonly [number, number];
  };
  readonly faceGeometryTransform: {
    readonly observed: true;
    readonly rows: 4;
    readonly columns: 4;
    readonly uniformScaleEstimate: number;
    readonly normalizedRotationDeterminant: number;
    readonly yawDegreesXYZConvention: number;
  };
  readonly providerIndexAdmissionAuthorized: false;
  readonly anatomicalZygionClaimAuthorized: false;
  readonly numericAcceptanceThresholdAuthorized: false;
  readonly calibrationAuthorized: false;
  readonly classifierAuthorized: false;
  readonly traditionalProjectionAuthorized: false;
  readonly productionAuthorized: false;
  readonly commerceAuthorized: false;
}

const REQUIRED_MAX_PROVIDER_INDEX = Math.max(
  ...FR200_FACE_OVAL_VERTICES,
  ...FR200_LEFT_EYE_VERTICES,
  ...FR200_RIGHT_EYE_VERTICES,
  ...FR200_LIP_VERTICES,
  454,
);

function finite(value: number, path: string): void {
  if (!Number.isFinite(value)) {
    throw new FaceAuthorityValidationError(`${path} must be finite.`);
  }
}

function point(
  landmarks: readonly MediaPipeLandmarkFR200V1[],
  index: number,
): MediaPipeLandmarkFR200V1 {
  const value = landmarks[index];
  if (value === undefined) {
    throw new FaceAuthorityValidationError(`FR200 landmark index ${index} is missing.`);
  }
  finite(value.x, `fr200.landmarks[${index}].x`);
  finite(value.y, `fr200.landmarks[${index}].y`);
  finite(value.z, `fr200.landmarks[${index}].z`);
  if (value.x < 0 || value.x > 1 || value.y < 0 || value.y > 1) {
    throw new FaceAuthorityValidationError(
      `FR200 landmark index ${index} must remain in normalized image XY bounds.`,
    );
  }
  return value;
}

function meanPoint(
  landmarks: readonly MediaPipeLandmarkFR200V1[],
  indices: readonly number[],
): Readonly<{ x: number; y: number }> {
  let x = 0;
  let y = 0;
  for (const index of indices) {
    const value = point(landmarks, index);
    x += value.x;
    y += value.y;
  }
  if (indices.length === 0) {
    throw new FaceAuthorityValidationError('FR200 meanPoint requires at least one index.');
  }
  return Object.freeze({ x: x / indices.length, y: y / indices.length });
}

function validateTransform(
  matrix: MediaPipeMatrixFR200V1,
): Readonly<{
  scale: number;
  determinant: number;
  yawDegrees: number;
}> {
  if (
    typeof matrix !== 'object' ||
    matrix === null ||
    matrix.rows !== 4 ||
    matrix.columns !== 4 ||
    matrix.data.length !== 16
  ) {
    throw new FaceAuthorityValidationError(
      'FR200 requires one 4x4 MediaPipe facial transformation matrix.',
    );
  }
  const data = Array.from(matrix.data);
  data.forEach((value, index) => finite(value, `fr200.transform.data[${index}]`));

  const row3 = data.slice(12, 16);
  const lastRowTolerance = 1e-4;
  if (
    Math.abs((row3[0] ?? Infinity) - 0) > lastRowTolerance ||
    Math.abs((row3[1] ?? Infinity) - 0) > lastRowTolerance ||
    Math.abs((row3[2] ?? Infinity) - 0) > lastRowTolerance ||
    Math.abs((row3[3] ?? Infinity) - 1) > lastRowTolerance
  ) {
    throw new FaceAuthorityValidationError(
      'FR200 facial transformation matrix last row is not the expected rigid-transform form.',
    );
  }

  const columnNorm = (column: number): number =>
    Math.hypot(data[column]!, data[4 + column]!, data[8 + column]!);
  const scale = (columnNorm(0) + columnNorm(1) + columnNorm(2)) / 3;
  if (!(scale > 0)) {
    throw new FaceAuthorityValidationError('FR200 transform scale must be positive.');
  }

  const r00 = data[0]! / scale;
  const r01 = data[1]! / scale;
  const r02 = data[2]! / scale;
  const r10 = data[4]! / scale;
  const r11 = data[5]! / scale;
  const r12 = data[6]! / scale;
  const r20 = data[8]! / scale;
  const r21 = data[9]! / scale;
  const r22 = data[10]! / scale;
  const determinant =
    r00 * (r11 * r22 - r12 * r21) -
    r01 * (r10 * r22 - r12 * r20) +
    r02 * (r10 * r21 - r11 * r20);
  finite(determinant, 'fr200.transform.normalizedRotationDeterminant');

  const clamped = Math.max(-1, Math.min(1, -r20));
  const yawDegrees = Math.asin(clamped) * (180 / Math.PI);
  finite(yawDegrees, 'fr200.transform.yawDegrees');

  return Object.freeze({ scale, determinant, yawDegrees });
}

export function deriveMediaPipeMidfaceEnvelopeFR200(input: {
  readonly landmarks: readonly MediaPipeLandmarkFR200V1[];
  readonly facialTransformationMatrix: MediaPipeMatrixFR200V1;
}): MediaPipeMidfaceEnvelopeReceiptFR200V1 {
  if (!Array.isArray(input.landmarks) || input.landmarks.length <= REQUIRED_MAX_PROVIDER_INDEX) {
    throw new FaceAuthorityValidationError(
      `FR200 requires provider landmarks through index ${REQUIRED_MAX_PROVIDER_INDEX}.`,
    );
  }

  const transform = validateTransform(input.facialTransformationMatrix);
  const leftEye = meanPoint(input.landmarks, FR200_LEFT_EYE_VERTICES);
  const rightEye = meanPoint(input.landmarks, FR200_RIGHT_EYE_VERTICES);
  const lipCenter = meanPoint(input.landmarks, FR200_LIP_VERTICES);
  const eyeMid = Object.freeze({
    x: (leftEye.x + rightEye.x) / 2,
    y: (leftEye.y + rightEye.y) / 2,
  });

  const eyeVectorX = leftEye.x - rightEye.x;
  const eyeVectorY = leftEye.y - rightEye.y;
  if (Math.hypot(eyeVectorX, eyeVectorY) <= Number.EPSILON) {
    throw new FaceAuthorityValidationError('FR200 eye centers collapse to one point.');
  }
  const rollRadians = Math.atan2(eyeVectorY, eyeVectorX);
  const cosine = Math.cos(-rollRadians);
  const sine = Math.sin(-rollRadians);

  const rotate = (index: number): Readonly<{ index: number; x: number; y: number }> => {
    const value = point(input.landmarks, index);
    const dx = value.x - eyeMid.x;
    const dy = value.y - eyeMid.y;
    return Object.freeze({
      index,
      x: eyeMid.x + cosine * dx - sine * dy,
      y: eyeMid.y + sine * dx + cosine * dy,
    });
  };

  const rotatedOval = FR200_FACE_OVAL_VERTICES.map(rotate);
  const rotatedLipCenter = (() => {
    const dx = lipCenter.x - eyeMid.x;
    const dy = lipCenter.y - eyeMid.y;
    return Object.freeze({
      x: eyeMid.x + cosine * dx - sine * dy,
      y: eyeMid.y + sine * dx + cosine * dy,
    });
  })();

  const ovalXs = rotatedOval.map((entry) => entry.x);
  const ovalYs = rotatedOval.map((entry) => entry.y);
  const ovalMinY = Math.min(...ovalYs);
  const ovalMaxY = Math.max(...ovalYs);
  const ovalHeight = ovalMaxY - ovalMinY;
  if (!(ovalHeight > 0)) {
    throw new FaceAuthorityValidationError('FR200 face oval height must be positive.');
  }

  const eyeLineY = eyeMid.y;
  if (!(rotatedLipCenter.y > eyeLineY)) {
    throw new FaceAuthorityValidationError(
      'FR200 requires the roll-normalized lip center to lie below the eye line.',
    );
  }
  const bandTopY = eyeLineY;
  const bandBottomY = eyeLineY + (rotatedLipCenter.y - eyeLineY) / 2;
  const bandPoints = rotatedOval.filter(
    (entry) => entry.y >= bandTopY && entry.y <= bandBottomY,
  );
  if (bandPoints.length < 2) {
    throw new FaceAuthorityValidationError(
      'FR200 midface band must contain at least two face-oval vertices.',
    );
  }

  const bandSortedByX = [...bandPoints].sort((a, b) => a.x - b.x || a.index - b.index);
  const bandLeft = bandSortedByX[0]!;
  const bandRight = bandSortedByX.at(-1)!;
  if (bandLeft.index === bandRight.index || !(bandRight.x > bandLeft.x)) {
    throw new FaceAuthorityValidationError(
      'FR200 midface envelope requires distinct left/right provider vertices.',
    );
  }

  const fixed234 = rotate(234);
  const fixed454 = rotate(454);
  const fixed234454Width = Math.abs(fixed454.x - fixed234.x);
  const bandEnvelopeWidth = bandRight.x - bandLeft.x;
  const fullOvalWidth = Math.max(...ovalXs) - Math.min(...ovalXs);
  if (!(fixed234454Width > 0) || !(bandEnvelopeWidth > 0) || !(fullOvalWidth > 0)) {
    throw new FaceAuthorityValidationError('FR200 width measures must be positive.');
  }

  return Object.freeze({
    schemaVersion: 'fr200-mediapipe-midface-envelope-v1' as const,
    authorityState: 'research_geometry_proxy_only' as const,
    sourceEvidence: Object.freeze({
      repository: 'google-ai-edge/mediapipe' as const,
      commit: FR200_MEDIAPIPE_SOURCE_COMMIT,
      topologySymbol: 'FACE_LANDMARKS_FACE_OVAL' as const,
      runtimePackageName: FR200_MEDIAPIPE_RUNTIME_PACKAGE,
      runtimePackageVersion: FR200_MEDIAPIPE_RUNTIME_VERSION,
    }),
    geometry: Object.freeze({
      landmarkCount: input.landmarks.length,
      eyeLineRollRadians: rollRadians,
      faceOvalHeight: ovalHeight,
      fullOvalWidth,
      fixed234454Width,
      bandEnvelopeWidth,
      fullOvalWidthByOvalHeight: fullOvalWidth / ovalHeight,
      fixed234454WidthByOvalHeight: fixed234454Width / ovalHeight,
      bandEnvelopeWidthByOvalHeight: bandEnvelopeWidth / ovalHeight,
      bandDefinition: 'roll_normalized_eye_line_to_halfway_lip_line' as const,
      bandTopY,
      bandBottomY,
      bandPointCount: bandPoints.length,
      bandEnvelopeProviderIndices: Object.freeze([bandLeft.index, bandRight.index] as const),
    }),
    faceGeometryTransform: Object.freeze({
      observed: true as const,
      rows: 4 as const,
      columns: 4 as const,
      uniformScaleEstimate: transform.scale,
      normalizedRotationDeterminant: transform.determinant,
      yawDegreesXYZConvention: transform.yawDegrees,
    }),
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
