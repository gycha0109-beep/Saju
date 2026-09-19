import type { ProviderNormalizedLandmarkFrameFR61V1 } from './production-neutral-observation-provider-fr61.js';
import type { ZygionReferenceReceiptFR199V1 } from './public-synthetic-zygion-reference-fr199.js';
import { FaceAuthorityValidationError } from './validation.js';

export interface ProviderCandidatePointFR199V1 {
  readonly providerIndex: 234 | 454;
  readonly x: number;
  readonly y: number;
}

export interface ProviderCandidatePairFR199V1 {
  readonly schemaVersion: 'fr199-provider-candidate-pair-v1';
  readonly authorityState: 'provider_index_candidate_only';
  readonly coordinateFrame: 'canonical_image_normalized_2d';
  readonly runtimePackageName: '@mediapipe/tasks-vision';
  readonly runtimePackageVersion: '0.10.35';
  readonly candidatePairSemantics: 'unordered_no_anatomical_laterality';
  readonly candidates: readonly [ProviderCandidatePointFR199V1, ProviderCandidatePointFR199V1];
  readonly provider234IsZygion: false;
  readonly provider454IsZygion: false;
  readonly providerIndexAdmissionAuthorized: false;
  readonly thresholdAuthorized: false;
  readonly calibrationAuthorized: false;
  readonly classifierAuthorized: false;
  readonly traditionalProjectionAuthorized: false;
  readonly productionActivationAuthorized: false;
  readonly commerceActivationAuthorized: false;
}

export interface DescriptiveCorrespondenceFR199V1 {
  readonly schemaVersion: 'fr199-descriptive-correspondence-v1';
  readonly authorityState: 'descriptive_cross_frame_observation_only';
  readonly referenceFrame: 'public_obj_3d_model_coordinates';
  readonly providerFrame: 'canonical_image_normalized_2d';
  readonly bridge:
    | 'horizontal_order_only_assuming_public_model_x_axis_maps_to_frontal_image_horizontal_axis';
  readonly rawCrossFrameEuclideanDistanceComputed: false;
  readonly projectionCalibrationEstablished: false;
  readonly referenceHorizontalOrder: readonly [number, number];
  readonly providerHorizontalOrder: readonly [number, number];
  readonly providerCandidateIndicesInHorizontalOrder: readonly [234 | 454, 234 | 454];
  readonly correspondenceAdmissionAuthorized: false;
  readonly thresholdAuthorized: false;
  readonly calibrationAuthorized: false;
  readonly classifierAuthorized: false;
  readonly traditionalProjectionAuthorized: false;
  readonly productionActivationAuthorized: false;
  readonly commerceActivationAuthorized: false;
}

export function extractProviderCandidatePairFR199(
  frame: ProviderNormalizedLandmarkFrameFR61V1,
): ProviderCandidatePairFR199V1 {
  if (
    frame.runtimePackageName !== '@mediapipe/tasks-vision' ||
    frame.runtimePackageVersion !== '0.10.35' ||
    frame.coordinateFrame !== 'canonical_image_normalized_2d'
  ) {
    throw new FaceAuthorityValidationError(
      'FR-199 provider frame must remain pinned to MediaPipe 0.10.35 normalized 2D.',
    );
  }
  const p234 = frame.providerOrderedPoints[234];
  const p454 = frame.providerOrderedPoints[454];
  if (p234 === undefined || p454 === undefined) {
    throw new FaceAuthorityValidationError(
      'FR-199 provider frame must contain indices 234 and 454.',
    );
  }

  return Object.freeze({
    schemaVersion: 'fr199-provider-candidate-pair-v1' as const,
    authorityState: 'provider_index_candidate_only' as const,
    coordinateFrame: 'canonical_image_normalized_2d' as const,
    runtimePackageName: '@mediapipe/tasks-vision' as const,
    runtimePackageVersion: '0.10.35' as const,
    candidatePairSemantics: 'unordered_no_anatomical_laterality' as const,
    candidates: Object.freeze([
      Object.freeze({ providerIndex: 234 as const, x: p234.x, y: p234.y }),
      Object.freeze({ providerIndex: 454 as const, x: p454.x, y: p454.y }),
    ]) as readonly [ProviderCandidatePointFR199V1, ProviderCandidatePointFR199V1],
    provider234IsZygion: false as const,
    provider454IsZygion: false as const,
    providerIndexAdmissionAuthorized: false as const,
    thresholdAuthorized: false as const,
    calibrationAuthorized: false as const,
    classifierAuthorized: false as const,
    traditionalProjectionAuthorized: false as const,
    productionActivationAuthorized: false as const,
    commerceActivationAuthorized: false as const,
  });
}

export function describeCrossFrameCorrespondenceFR199(
  reference: ZygionReferenceReceiptFR199V1,
  provider: ProviderCandidatePairFR199V1,
): DescriptiveCorrespondenceFR199V1 {
  if (reference.zygionCoordinates === null) {
    throw new FaceAuthorityValidationError(
      'FR-199 descriptive correspondence requires a complete frozen reference.',
    );
  }

  const referenceHorizontalOrder = [...reference.zygionCoordinates]
    .map((point) => point.x)
    .sort((a, b) => a - b) as [number, number];
  const providerHorizontal = [...provider.candidates].sort((a, b) => a.x - b.x);

  return Object.freeze({
    schemaVersion: 'fr199-descriptive-correspondence-v1' as const,
    authorityState: 'descriptive_cross_frame_observation_only' as const,
    referenceFrame: 'public_obj_3d_model_coordinates' as const,
    providerFrame: 'canonical_image_normalized_2d' as const,
    bridge:
      'horizontal_order_only_assuming_public_model_x_axis_maps_to_frontal_image_horizontal_axis' as const,
    rawCrossFrameEuclideanDistanceComputed: false as const,
    projectionCalibrationEstablished: false as const,
    referenceHorizontalOrder: Object.freeze(referenceHorizontalOrder) as readonly [
      number,
      number,
    ],
    providerHorizontalOrder: Object.freeze([
      providerHorizontal[0]!.x,
      providerHorizontal[1]!.x,
    ]) as readonly [number, number],
    providerCandidateIndicesInHorizontalOrder: Object.freeze([
      providerHorizontal[0]!.providerIndex,
      providerHorizontal[1]!.providerIndex,
    ]) as readonly [234 | 454, 234 | 454],
    correspondenceAdmissionAuthorized: false as const,
    thresholdAuthorized: false as const,
    calibrationAuthorized: false as const,
    classifierAuthorized: false as const,
    traditionalProjectionAuthorized: false as const,
    productionActivationAuthorized: false as const,
    commerceActivationAuthorized: false as const,
  });
}
