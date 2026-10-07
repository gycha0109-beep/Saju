import {
  FACE_GOVERNED_HANDOFF_RUNTIME_SCHEMA_VERSION_V1,
  type FaceGovernedHandoffRuntimeResultV1,
} from '../face-topic/governed-handoff-runtime.js';

export const FACE_GOVERNED_HANDOFF_HTTP_PATH =
  '/api/face/governed-character-handoff' as const;

export const FACE_GOVERNED_HANDOFF_HTTP_ADMISSION_HEADER =
  'x-myeonghwa-face-governed-handoff-admitted' as const;

export const FACE_GOVERNED_HANDOFF_HTTP_ADMISSION_VERSION =
  FACE_GOVERNED_HANDOFF_RUNTIME_SCHEMA_VERSION_V1;

export function faceGovernedHandoffHttpStatusV1(
  result: FaceGovernedHandoffRuntimeResultV1,
): number {
  if (
    result.state === 'eligible' ||
    result.state === 'not_eligible'
  ) {
    return 200;
  }

  if (
    result.stage === 'request'
  ) {
    return 400;
  }

  if (
    result.stage === 'authority' ||
    result.stage === 'engine'
  ) {
    return 502;
  }

  return 500;
}
