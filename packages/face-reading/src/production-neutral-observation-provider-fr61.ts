import {
  assessFaceObservationProviderActivationFR22,
} from './face-observation-provider-contract-fr22.js';
import type {
  MediaPipeFaceLandmarkerResultFR25V1,
  MediaPipeNormalizedLandmarkFR25V1,
} from './mediapipe-eye-landmark-adapter-fr25.js';
import {
  DEFAULT_MEDIAPIPE_FACE_LANDMARKER_RUNTIME_FACTORY_FR26,
  MEDIAPIPE_FACE_LANDMARKER_RUNTIME_EVIDENCE_FR26,
  assessMediaPipeFaceLandmarkerRuntimeFR26,
  type MediaPipeFaceLandmarkerRuntimeFactoryFR26V1,
} from './mediapipe-face-landmarker-runtime-fr26.js';
import {
  assessNeutralProviderBindingReadinessFR14,
} from './neutral-provider-bindings-fr14.js';
import type { NormalizedPoint2DV1 } from './neutral-observation-schema-fr15.js';
import { FaceAuthorityValidationError } from './validation.js';

export interface ProductionNeutralObservationProviderRequestFR61V1 {
  readonly schemaVersion: 'fr61-production-neutral-observation-provider-request-v1';
  readonly providerRunRef: string;
  readonly canonicalAssetDigest: string;
  readonly image: unknown;
}

export interface ProviderNormalizedLandmarkFrameFR61V1 {
  readonly schemaVersion: 'fr61-provider-normalized-landmark-frame-v1';
  readonly authorityState: 'provider_observation_candidate_only';
  readonly coordinateFrame: 'canonical_image_normalized_2d';
  readonly providerKey: 'visually_facelab';
  readonly runtimePackageName: '@mediapipe/tasks-vision';
  readonly runtimePackageVersion: '0.10.35';
  readonly providerRunRef: string;
  readonly canonicalAssetDigest: string;
  readonly faceCount: 1;
  readonly providerOrderedPoints: readonly NormalizedPoint2DV1[];
  readonly providerOrderingAuthority: 'internal_provider_order_only_not_fr15_output';
  readonly validatedThenDiscardedProviderFields: readonly [
    'faceLandmarks[].z',
    'faceLandmarks[].visibility',
  ];
  readonly ignoredProviderResultFields: readonly [
    'faceBlendshapes',
    'facialTransformationMatrixes',
  ];
  readonly rawSourcePersisted: false;
  readonly rawProviderResponsePersisted: false;
  readonly providerDepthPersisted: false;
  readonly biometricEmbeddingPersisted: false;
  readonly productionNeutralObservationIssued: false;
  readonly anatomicalLateralityResolved: false;
  readonly traditionalSemanticAuthority: false;
}

export interface ProductionNeutralObservationPublicationGateFR61V1 {
  readonly schemaVersion: 'fr61-publication-gate-v1';
  readonly providerObservationCandidateReady: true;
  readonly fr14BindingReady: boolean;
  readonly fr22ActivationReady: boolean;
  readonly fr26RuntimeExecutionReady: true;
  readonly productionNeutralObservationAllowed: boolean;
  readonly providerActivationAllowed: boolean;
  readonly blockers: readonly string[];
}

export interface ProductionNeutralObservationProviderRunFR61V1 {
  readonly schemaVersion: 'fr61-production-neutral-observation-provider-run-v1';
  readonly authorityState: 'provider_observation_candidate_only';
  readonly frame: ProviderNormalizedLandmarkFrameFR61V1;
  readonly publicationGate: ProductionNeutralObservationPublicationGateFR61V1;
  readonly productionNeutralObservationIssued: false;
  readonly anatomicalLateralityResolved: false;
  readonly traditionalSemanticAuthority: false;
}

const REQUEST_KEYS = new Set([
  'schemaVersion',
  'providerRunRef',
  'canonicalAssetDigest',
  'image',
]);
const RESULT_KEYS = new Set([
  'faceLandmarks',
  'faceBlendshapes',
  'facialTransformationMatrixes',
]);
const LANDMARK_KEYS = new Set(['x', 'y', 'z', 'visibility']);
const SHA256 = /^sha256:[0-9a-f]{64}$/u;
const SAFE_RUN_REF = /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,255}$/u;

function exactKeys(value: object, allowed: ReadonlySet<string>, path: string): void {
  const unexpected = Object.keys(value).find((key) => !allowed.has(key));
  if (unexpected !== undefined) {
    throw new FaceAuthorityValidationError(`${path} contains unauthorized field: ${unexpected}`);
  }
}

function validateRequestFR61(request: ProductionNeutralObservationProviderRequestFR61V1): void {
  if (typeof request !== 'object' || request === null) {
    throw new FaceAuthorityValidationError('FR-61 request must be an object.');
  }
  exactKeys(request, REQUEST_KEYS, 'FR-61 request');
  if (request.schemaVersion !== 'fr61-production-neutral-observation-provider-request-v1') {
    throw new FaceAuthorityValidationError('FR-61 request schemaVersion is unsupported.');
  }
  if (!SAFE_RUN_REF.test(request.providerRunRef)) {
    throw new FaceAuthorityValidationError(
      'FR-61 providerRunRef must be a bounded opaque reference without whitespace.',
    );
  }
  if (!SHA256.test(request.canonicalAssetDigest)) {
    throw new FaceAuthorityValidationError(
      'FR-61 canonicalAssetDigest must be sha256:<64 lowercase hex>.',
    );
  }
  if (request.image === null || request.image === undefined) {
    throw new FaceAuthorityValidationError(
      'FR-61 image must be present as an opaque in-memory image source.',
    );
  }
}

function sanitizeLandmarkFR61(
  landmark: MediaPipeNormalizedLandmarkFR25V1,
  path: string,
): NormalizedPoint2DV1 {
  if (typeof landmark !== 'object' || landmark === null) {
    throw new FaceAuthorityValidationError(`${path} must be a MediaPipe normalized landmark object.`);
  }
  exactKeys(landmark, LANDMARK_KEYS, path);
  if (!Number.isFinite(landmark.x) || landmark.x < 0 || landmark.x > 1) {
    throw new FaceAuthorityValidationError(`${path}.x must be finite within [0,1].`);
  }
  if (!Number.isFinite(landmark.y) || landmark.y < 0 || landmark.y > 1) {
    throw new FaceAuthorityValidationError(`${path}.y must be finite within [0,1].`);
  }
  if (!Number.isFinite(landmark.z)) {
    throw new FaceAuthorityValidationError(`${path}.z must be finite before it is discarded.`);
  }
  if (landmark.visibility !== undefined && !Number.isFinite(landmark.visibility)) {
    throw new FaceAuthorityValidationError(
      `${path}.visibility must be finite before it is discarded.`,
    );
  }
  return Object.freeze({ x: landmark.x, y: landmark.y });
}

export function sanitizeMediaPipeProviderObservationFR61(
  result: MediaPipeFaceLandmarkerResultFR25V1,
  context: Pick<
    ProductionNeutralObservationProviderRequestFR61V1,
    'providerRunRef' | 'canonicalAssetDigest'
  >,
): ProviderNormalizedLandmarkFrameFR61V1 {
  if (typeof result !== 'object' || result === null) {
    throw new FaceAuthorityValidationError(
      'FR-61 result must be a MediaPipe FaceLandmarkerResult object.',
    );
  }
  exactKeys(result, RESULT_KEYS, 'FR-61 result');
  if (
    !Array.isArray(result.faceLandmarks) ||
    !Array.isArray(result.faceBlendshapes) ||
    !Array.isArray(result.facialTransformationMatrixes)
  ) {
    throw new FaceAuthorityValidationError(
      'FR-61 result must match the witnessed FaceLandmarkerResult array fields.',
    );
  }
  if (result.faceLandmarks.length !== 1) {
    throw new FaceAuthorityValidationError(
      `FR-61 requires exactly one detected face; received ${result.faceLandmarks.length}.`,
    );
  }
  if (result.faceBlendshapes.length !== 0 || result.facialTransformationMatrixes.length !== 0) {
    throw new FaceAuthorityValidationError(
      'FR-61 requires blendshape and transformation outputs to remain disabled.',
    );
  }

  const faceLandmarks = result.faceLandmarks[0];
  if (!Array.isArray(faceLandmarks) || faceLandmarks.length === 0) {
    throw new FaceAuthorityValidationError(
      'FR-61 faceLandmarks[0] must be a non-empty landmark array.',
    );
  }
  const providerOrderedPoints = Object.freeze(
    faceLandmarks.map((landmark, index) =>
      sanitizeLandmarkFR61(landmark, `fr61.faceLandmarks[${index}]`),
    ),
  );

  return Object.freeze({
    schemaVersion: 'fr61-provider-normalized-landmark-frame-v1' as const,
    authorityState: 'provider_observation_candidate_only' as const,
    coordinateFrame: 'canonical_image_normalized_2d' as const,
    providerKey: 'visually_facelab' as const,
    runtimePackageName: MEDIAPIPE_FACE_LANDMARKER_RUNTIME_EVIDENCE_FR26.runtimePackageName,
    runtimePackageVersion: MEDIAPIPE_FACE_LANDMARKER_RUNTIME_EVIDENCE_FR26.runtimePackageVersion,
    providerRunRef: context.providerRunRef,
    canonicalAssetDigest: context.canonicalAssetDigest,
    faceCount: 1 as const,
    providerOrderedPoints,
    providerOrderingAuthority: 'internal_provider_order_only_not_fr15_output' as const,
    validatedThenDiscardedProviderFields: Object.freeze([
      'faceLandmarks[].z',
      'faceLandmarks[].visibility',
    ] as const),
    ignoredProviderResultFields: Object.freeze([
      'faceBlendshapes',
      'facialTransformationMatrixes',
    ] as const),
    rawSourcePersisted: false as const,
    rawProviderResponsePersisted: false as const,
    providerDepthPersisted: false as const,
    biometricEmbeddingPersisted: false as const,
    productionNeutralObservationIssued: false as const,
    anatomicalLateralityResolved: false as const,
    traditionalSemanticAuthority: false as const,
  });
}

export function assessProductionNeutralObservationPublicationFR61(): ProductionNeutralObservationPublicationGateFR61V1 {
  const fr14 = assessNeutralProviderBindingReadinessFR14();
  const fr22 = assessFaceObservationProviderActivationFR22();
  const fr26 = assessMediaPipeFaceLandmarkerRuntimeFR26();
  const blockers = Object.freeze([
    ...fr14.blockers.map((blocker) => `FR-14: ${blocker}`),
    ...fr22.blockers.map((blocker) => `FR-22: ${blocker}`),
    ...fr26.blockers.map((blocker) => `FR-26: ${blocker}`),
  ]);
  const providerActivationAllowed =
    fr22.providerActivationAllowed && fr26.productionProviderActivationReady;
  const productionNeutralObservationAllowed = fr14.ready && providerActivationAllowed;

  return Object.freeze({
    schemaVersion: 'fr61-publication-gate-v1' as const,
    providerObservationCandidateReady: true as const,
    fr14BindingReady: fr14.ready,
    fr22ActivationReady: fr22.implementationReady,
    fr26RuntimeExecutionReady: fr26.runtimeExecutionPathImplemented,
    productionNeutralObservationAllowed,
    providerActivationAllowed,
    blockers,
  });
}

export async function runProductionNeutralObservationProviderFR61(
  request: ProductionNeutralObservationProviderRequestFR61V1,
  factory: MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 =
    DEFAULT_MEDIAPIPE_FACE_LANDMARKER_RUNTIME_FACTORY_FR26,
): Promise<ProductionNeutralObservationProviderRunFR61V1> {
  validateRequestFR61(request);
  if (typeof factory !== 'object' || factory === null || typeof factory.create !== 'function') {
    throw new FaceAuthorityValidationError('FR-61 runtime factory must expose create().');
  }

  const runtime = await factory.create();
  if (
    typeof runtime !== 'object' ||
    runtime === null ||
    typeof runtime.detect !== 'function' ||
    typeof runtime.close !== 'function'
  ) {
    throw new FaceAuthorityValidationError(
      'FR-61 runtime factory returned an invalid runtime instance.',
    );
  }

  try {
    const rawResult = runtime.detect(request.image);
    const frame = sanitizeMediaPipeProviderObservationFR61(rawResult, {
      providerRunRef: request.providerRunRef,
      canonicalAssetDigest: request.canonicalAssetDigest,
    });
    const publicationGate = assessProductionNeutralObservationPublicationFR61();

    if (
      publicationGate.productionNeutralObservationAllowed ||
      publicationGate.providerActivationAllowed
    ) {
      throw new FaceAuthorityValidationError(
        'FR-61 v0.1 is candidate-only and cannot activate or issue a production neutral observation.',
      );
    }

    return Object.freeze({
      schemaVersion: 'fr61-production-neutral-observation-provider-run-v1' as const,
      authorityState: 'provider_observation_candidate_only' as const,
      frame,
      publicationGate,
      productionNeutralObservationIssued: false as const,
      anatomicalLateralityResolved: false as const,
      traditionalSemanticAuthority: false as const,
    });
  } finally {
    runtime.close();
  }
}
