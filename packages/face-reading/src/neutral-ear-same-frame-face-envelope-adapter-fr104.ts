import type {
  MediaPipeMetricGeometryPointFR76V1,
} from './mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import type {
  NeutralEarFaceEnvelopeInputFR104V1,
} from './neutral-ear-plausibility-evidence-fr104.js';
import { FaceAuthorityValidationError } from './validation.js';

const MEDIAPIPE_GEOMETRY_LANDMARK_COUNT = 468;

export interface NeutralEarSameFrameScreenGeometryFR104V1 {
  readonly providerRunRef: string;
  readonly screenLandmarks:
    readonly MediaPipeMetricGeometryPointFR76V1[];
  readonly frameWidth: number;
  readonly frameHeight: number;
}

export interface NeutralEarSameFrameEnvelopeRequestFR104V1 {
  readonly schemaVersion: 'fr104-neutral-ear-same-frame-envelope-request-v1';
  readonly candidateFrame: {
    readonly width: number;
    readonly height: number;
  };
  readonly sameFrameAttested: true;
  readonly geometry: NeutralEarSameFrameScreenGeometryFR104V1;
}

export interface NeutralEarSameFrameEnvelopeAdapterResultFR104V1 {
  readonly schemaVersion: 'fr104-neutral-ear-same-frame-envelope-adapter-result-v1';
  readonly authorityState:
    'ephemeral_same_frame_face_envelope_only_no_plausibility_or_laterality';
  readonly providerRunRef: string;
  readonly candidateFrame: {
    readonly width: number;
    readonly height: number;
  };
  readonly faceEnvelope: NeutralEarFaceEnvelopeInputFR104V1;
  readonly bindingEvidence: {
    readonly candidateAndGeometryFrameDimensionsMatch: true;
    readonly sameFrameAttestationAcceptedButNotIndependentlyVerified: true;
    readonly providerRunRefPreserved: true;
  };
  readonly provenanceResolution: {
    readonly exifOrientationResolved: false;
    readonly decodedPixelOrientationResolved: false;
    readonly frontCameraMirrorResolved: false;
    readonly anatomicalLateralityResolved: false;
  };
  readonly privacy: {
    readonly rawScreenLandmarksPersisted: false;
    readonly rawMetricLandmarksPersisted: false;
    readonly poseTransformMatrixPersisted: false;
    readonly rawCandidatePolygonPersisted: false;
    readonly imageDigestPersisted: false;
  };
  readonly authority: {
    readonly faceEnvelopeMayBeCalledEarZone: false;
    readonly faceRelativeEvidenceMayBeCalledEarPlausibility: false;
    readonly numericThresholdAuthorized: false;
    readonly anatomicalLateralityAuthorized: false;
    readonly validatedExternalEarObservation: false;
    readonly traditionalBindingAuthorized: false;
    readonly productionAuthorization: false;
  };
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-104 ${message}`);
}

function positiveInteger(value: number, label: string): number {
  if (!Number.isInteger(value) || value <= 0) {
    fail(`${label} must be a positive integer.`);
  }
  return value;
}

function finiteUnit(value: number, label: string): number {
  if (!Number.isFinite(value) || value < 0 || value > 1) {
    fail(`${label} must be finite within [0,1].`);
  }
  return value;
}

export function deriveNeutralEarSameFrameFaceEnvelopeFR104(
  request: NeutralEarSameFrameEnvelopeRequestFR104V1,
): NeutralEarSameFrameEnvelopeAdapterResultFR104V1 {
  if (
    request.schemaVersion !== 'fr104-neutral-ear-same-frame-envelope-request-v1'
    || request.sameFrameAttested !== true
  ) {
    fail('same-frame envelope request must preserve the explicit caller attestation boundary.');
  }

  const candidateWidth = positiveInteger(
    request.candidateFrame.width,
    'candidateFrame.width',
  );
  const candidateHeight = positiveInteger(
    request.candidateFrame.height,
    'candidateFrame.height',
  );
  const geometryWidth = positiveInteger(
    request.geometry.frameWidth,
    'geometry.frameWidth',
  );
  const geometryHeight = positiveInteger(
    request.geometry.frameHeight,
    'geometry.frameHeight',
  );

  if (candidateWidth !== geometryWidth || candidateHeight !== geometryHeight) {
    fail('candidate frame dimensions must exactly match the ephemeral FR257 geometry frame.');
  }
  if (
    typeof request.geometry.providerRunRef !== 'string'
    || request.geometry.providerRunRef.trim().length === 0
  ) {
    fail('same-frame providerRunRef must be non-empty.');
  }
  if (
    !Array.isArray(request.geometry.screenLandmarks)
    || request.geometry.screenLandmarks.length !== MEDIAPIPE_GEOMETRY_LANDMARK_COUNT
  ) {
    fail(`same-frame screen geometry must contain exactly ${MEDIAPIPE_GEOMETRY_LANDMARK_COUNT} landmarks.`);
  }

  let minX = Number.POSITIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;

  request.geometry.screenLandmarks.forEach((point, index) => {
    const x = finiteUnit(point.x, `geometry.screenLandmarks[${index}].x`);
    const y = finiteUnit(point.y, `geometry.screenLandmarks[${index}].y`);
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  });

  if (!(maxX > minX) || !(maxY > minY)) {
    fail('same-frame screen geometry must yield a positive face envelope.');
  }

  const faceEnvelope: NeutralEarFaceEnvelopeInputFR104V1 = Object.freeze({
    schemaVersion: 'fr104-neutral-ear-face-envelope-input-v1' as const,
    coordinateFrame: 'canonical_image_normalized_2d' as const,
    sourceAuthority:
      'governed_same_frame_face_geometry_adapter_required' as const,
    sameFrameBinding:
      'caller_attested_ephemeral_not_independently_verified' as const,
    minX,
    minY,
    maxX,
    maxY,
  });

  return Object.freeze({
    schemaVersion:
      'fr104-neutral-ear-same-frame-envelope-adapter-result-v1' as const,
    authorityState:
      'ephemeral_same_frame_face_envelope_only_no_plausibility_or_laterality' as const,
    providerRunRef: request.geometry.providerRunRef,
    candidateFrame: Object.freeze({
      width: candidateWidth,
      height: candidateHeight,
    }),
    faceEnvelope,
    bindingEvidence: Object.freeze({
      candidateAndGeometryFrameDimensionsMatch: true as const,
      sameFrameAttestationAcceptedButNotIndependentlyVerified: true as const,
      providerRunRefPreserved: true as const,
    }),
    provenanceResolution: Object.freeze({
      exifOrientationResolved: false as const,
      decodedPixelOrientationResolved: false as const,
      frontCameraMirrorResolved: false as const,
      anatomicalLateralityResolved: false as const,
    }),
    privacy: Object.freeze({
      rawScreenLandmarksPersisted: false as const,
      rawMetricLandmarksPersisted: false as const,
      poseTransformMatrixPersisted: false as const,
      rawCandidatePolygonPersisted: false as const,
      imageDigestPersisted: false as const,
    }),
    authority: Object.freeze({
      faceEnvelopeMayBeCalledEarZone: false as const,
      faceRelativeEvidenceMayBeCalledEarPlausibility: false as const,
      numericThresholdAuthorized: false as const,
      anatomicalLateralityAuthorized: false as const,
      validatedExternalEarObservation: false as const,
      traditionalBindingAuthorized: false as const,
      productionAuthorization: false as const,
    }),
  });
}
