import type {
  MediaPipeFaceLandmarkerResultFR25V1,
  MediaPipeNormalizedLandmarkFR25V1,
} from './mediapipe-eye-landmark-adapter-fr25.js';
import type {
  MediaPipeMetricGeometryPointFR76V1,
} from './mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import { FaceAuthorityValidationError } from './validation.js';

export const MEDIAPIPE_PROVIDER_LANDMARK_COUNT_EPHEMERAL = 478;
export const MEDIAPIPE_SCREEN_GEOMETRY_LANDMARK_COUNT_EPHEMERAL = 468;

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `MediaPipe ephemeral screen geometry ${message}`,
  );
}

function validateProviderLandmark(
  landmark: MediaPipeNormalizedLandmarkFR25V1,
  index: number,
): MediaPipeMetricGeometryPointFR76V1 {
  if (typeof landmark !== 'object' || landmark === null) {
    fail(`faceLandmarks[${index}] must be an object.`);
  }
  const allowed = new Set(['x', 'y', 'z', 'visibility']);
  const unexpected = Object.keys(landmark)
    .find((key) => !allowed.has(key));
  if (unexpected !== undefined) {
    fail(
      `faceLandmarks[${index}] contains unauthorized field: ${unexpected}.`,
    );
  }
  if (
    !Number.isFinite(landmark.x)
    || landmark.x < 0
    || landmark.x > 1
  ) {
    fail(
      `faceLandmarks[${index}].x must be finite within [0,1].`,
    );
  }
  if (
    !Number.isFinite(landmark.y)
    || landmark.y < 0
    || landmark.y > 1
  ) {
    fail(
      `faceLandmarks[${index}].y must be finite within [0,1].`,
    );
  }
  if (!Number.isFinite(landmark.z)) {
    fail(`faceLandmarks[${index}].z must be finite.`);
  }
  if (
    landmark.visibility !== undefined
    && !Number.isFinite(landmark.visibility)
  ) {
    fail(
      `faceLandmarks[${index}].visibility must be finite when present.`,
    );
  }
  return Object.freeze({
    x: landmark.x,
    y: landmark.y,
    z: landmark.z,
  });
}

export function extractMediaPipeEphemeralScreenGeometry(
  result: MediaPipeFaceLandmarkerResultFR25V1,
): readonly MediaPipeMetricGeometryPointFR76V1[] {
  if (typeof result !== 'object' || result === null) {
    fail('FaceLandmarker result must be an object.');
  }
  const allowed = new Set([
    'faceLandmarks',
    'faceBlendshapes',
    'facialTransformationMatrixes',
  ]);
  const unexpected = Object.keys(result)
    .find((key) => !allowed.has(key));
  if (unexpected !== undefined) {
    fail(
      `FaceLandmarker result contains unauthorized field: ${unexpected}.`,
    );
  }
  if (
    !Array.isArray(result.faceLandmarks)
    || !Array.isArray(result.faceBlendshapes)
    || !Array.isArray(result.facialTransformationMatrixes)
  ) {
    fail('FaceLandmarker result arrays are malformed.');
  }
  if (result.faceLandmarks.length !== 1) {
    fail(
      `requires exactly one detected face; received ${result.faceLandmarks.length}.`,
    );
  }
  if (
    result.faceBlendshapes.length !== 0
    || result.facialTransformationMatrixes.length !== 0
  ) {
    fail(
      'blendshape and provider transformation-matrix outputs must remain disabled.',
    );
  }
  const landmarks = result.faceLandmarks[0];
  if (
    !Array.isArray(landmarks)
    || landmarks.length !== MEDIAPIPE_PROVIDER_LANDMARK_COUNT_EPHEMERAL
  ) {
    fail(
      `requires exactly ${MEDIAPIPE_PROVIDER_LANDMARK_COUNT_EPHEMERAL} provider landmarks.`,
    );
  }
  return Object.freeze(
    landmarks
      .slice(0, MEDIAPIPE_SCREEN_GEOMETRY_LANDMARK_COUNT_EPHEMERAL)
      .map((landmark, index) =>
        validateProviderLandmark(landmark, index)),
  );
}
