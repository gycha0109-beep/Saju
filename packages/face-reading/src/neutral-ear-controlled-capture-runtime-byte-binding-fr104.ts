import {
  CONTROLLED_CAPTURE_CALIBRATION_EVIDENCE_FR21B,
  CONTROLLED_CAPTURE_PROFILES_FR21B,
  validateControlledCaptureProfileAttestationFR21B,
} from './controlled-capture-attestation-fr21b.js';
import {
  assertNeutralEarCapturedFrameConsumerByteEvidenceFR104,
  NEUTRAL_EAR_MESH6H_D2B_CAPTURE_IMPLEMENTATION_FR104,
  type NeutralEarCapturedFrameConsumerByteEvidenceFR104V1,
} from './neutral-ear-captured-frame-consumer-byte-provenance-fr104.js';
import {
  assertIssuedMesh6HBrowserCameraFrame,
  assertIssuedMesh6HBrowserCameraHandle,
  type Mesh6HBrowserCameraHandleV1,
  type Mesh6HCameraFacingV1,
} from './mesh6h-browser-camera-frame-source.js';
import type {
  Mesh6GCapturedFrameV1,
} from './mesh6g-prospective-operator-capture-session.js';
import { FaceAuthorityValidationError } from './validation.js';

export type NeutralEarControlledCaptureRuntimeByteBindingBlockerFR104V1 =
  | 'controlled_capture_profile_not_admitted'
  | 'controlled_capture_profile_not_verified'
  | 'controlled_capture_profile_implementation_identity_mismatch'
  | 'controlled_capture_profile_camera_facing_mismatch'
  | 'subject_relative_mirror_calibration_not_reviewed';

export interface NeutralEarControlledCaptureRuntimeByteBindingFR104V1 {
  readonly schemaVersion:
    'fr104-neutral-ear-controlled-capture-runtime-byte-binding-v1';
  readonly authorityState:
    'exact_frame_consumer_bytes_bound_profile_authority_still_closed';
  readonly profileRef: string;
  readonly cameraFacing: Mesh6HCameraFacingV1;
  readonly implementation:
    typeof NEUTRAL_EAR_MESH6H_D2B_CAPTURE_IMPLEMENTATION_FR104;
  readonly profileSnapshot: {
    readonly admitted: boolean;
    readonly verified: boolean;
    readonly implementationIdentityMatches: boolean;
    readonly cameraFacingMatches: boolean;
  };
  readonly binding: {
    readonly exactIssuedMesh6HFrameObjectVerified: true;
    readonly exactFrameConsumerByteEvidenceObjectIdentityVerified: true;
    readonly capturedFrameToConsumerBytesIndependentlyVerified: true;
    readonly exactFrameToVerifiedProfileBindingVerified: boolean;
    readonly reviewedSubjectRelativeMirrorCalibrationConsumed: false;
  };
  readonly blockers:
    readonly NeutralEarControlledCaptureRuntimeByteBindingBlockerFR104V1[];
  readonly privacy: {
    readonly rawFramePersistedByBinding: false;
    readonly rawFrameBytesPersistedByBinding: false;
    readonly imageDigestReturnedByBinding: false;
    readonly imageDigestPersistedByBinding: false;
    readonly biometricEmbeddingProduced: false;
    readonly identityTemplateProduced: false;
  };
  readonly authority: {
    readonly subjectRelativeMirrorProvenanceAuthorized: false;
    readonly anatomicalLateralityAuthorized: false;
    readonly validatedExternalEarObservationAuthorized: false;
    readonly traditionalBindingAuthorized: false;
    readonly productionAuthorization: false;
  };
}

const ISSUED_BINDINGS = new WeakSet<object>();
const BINDING_STATE = new WeakMap<
  object,
  Readonly<{
    handle: Mesh6HBrowserCameraHandleV1;
    frame: Mesh6GCapturedFrameV1;
    byteEvidence:
      NeutralEarCapturedFrameConsumerByteEvidenceFR104V1;
    profileRef: string;
  }>
>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-104 controlled capture runtime byte binding ${message}`,
  );
}

function stableProfileRef(value: string): string {
  if (
    value.trim().length === 0
    || !/^[a-z0-9][a-z0-9._:-]{0,191}$/u.test(value)
  ) {
    fail('profileRef must be a stable authority key.');
  }
  return value;
}

function profileSnapshot(
  profileRef: string,
  cameraFacing: Mesh6HCameraFacingV1,
) {
  const profile = CONTROLLED_CAPTURE_PROFILES_FR21B.find(
    (entry) => entry.profileRef === profileRef,
  );
  if (profile === undefined) {
    return Object.freeze({
      admitted: false,
      verified: false,
      implementationIdentityMatches: false,
      cameraFacingMatches: false,
    });
  }

  validateControlledCaptureProfileAttestationFR21B(
    profile,
    CONTROLLED_CAPTURE_CALIBRATION_EVIDENCE_FR21B,
  );

  const implementation =
    NEUTRAL_EAR_MESH6H_D2B_CAPTURE_IMPLEMENTATION_FR104;
  return Object.freeze({
    admitted: true,
    verified: profile.reviewState === 'verified',
    implementationIdentityMatches:
      profile.implementation.repository === implementation.repository
      && profile.implementation.repositoryCommit
        === implementation.repositoryCommit
      && profile.implementation.sourcePath
        === implementation.sourcePath
      && profile.implementation.sourceBlobSha
        === implementation.sourceBlobSha,
    cameraFacingMatches:
      profile.cameraFacing === cameraFacing,
  });
}

function uniqueBlockers(
  blockers:
    readonly NeutralEarControlledCaptureRuntimeByteBindingBlockerFR104V1[],
) {
  return Object.freeze([...new Set(blockers)]);
}

export function bindNeutralEarControlledCaptureRuntimeByteEvidenceFR104(
  input: Readonly<{
    handle: Mesh6HBrowserCameraHandleV1;
    frame: Mesh6GCapturedFrameV1;
    profileRef: string;
    byteEvidence:
      NeutralEarCapturedFrameConsumerByteEvidenceFR104V1;
  }>,
): NeutralEarControlledCaptureRuntimeByteBindingFR104V1 {
  assertIssuedMesh6HBrowserCameraHandle(input.handle);
  assertIssuedMesh6HBrowserCameraFrame(input.handle, input.frame);
  assertNeutralEarCapturedFrameConsumerByteEvidenceFR104(
    input.byteEvidence,
    {
      handle: input.handle,
      frame: input.frame,
    },
  );

  const profileRef = stableProfileRef(input.profileRef);
  const cameraFacing =
    input.handle.executionBoundary.cameraFacingRequested;

  if (input.byteEvidence.cameraFacing !== cameraFacing) {
    fail('byte evidence camera-facing metadata does not match the issuing Mesh6H handle.');
  }
  if (
    input.byteEvidence.frame.timestampMs !== input.frame.timestampMs
    || input.byteEvidence.frame.frameWidth !== input.frame.frameWidth
    || input.byteEvidence.frame.frameHeight !== input.frame.frameHeight
    || input.byteEvidence.frame.providerRunRef
      !== input.frame.providerRunRef
  ) {
    fail('byte evidence frame metadata drifted from the exact issued Mesh6H frame.');
  }

  const snapshot = profileSnapshot(profileRef, cameraFacing);
  const blockers:
    NeutralEarControlledCaptureRuntimeByteBindingBlockerFR104V1[] = [];

  if (!snapshot.admitted) {
    blockers.push('controlled_capture_profile_not_admitted');
  } else {
    if (!snapshot.verified) {
      blockers.push('controlled_capture_profile_not_verified');
    }
    if (!snapshot.implementationIdentityMatches) {
      blockers.push(
        'controlled_capture_profile_implementation_identity_mismatch',
      );
    }
    if (!snapshot.cameraFacingMatches) {
      blockers.push(
        'controlled_capture_profile_camera_facing_mismatch',
      );
    }
  }

  blockers.push('subject_relative_mirror_calibration_not_reviewed');

  const exactFrameToVerifiedProfileBindingVerified =
    snapshot.admitted
    && snapshot.verified
    && snapshot.implementationIdentityMatches
    && snapshot.cameraFacingMatches;

  const result = Object.freeze({
    schemaVersion:
      'fr104-neutral-ear-controlled-capture-runtime-byte-binding-v1' as const,
    authorityState:
      'exact_frame_consumer_bytes_bound_profile_authority_still_closed' as const,
    profileRef,
    cameraFacing,
    implementation:
      NEUTRAL_EAR_MESH6H_D2B_CAPTURE_IMPLEMENTATION_FR104,
    profileSnapshot: snapshot,
    binding: Object.freeze({
      exactIssuedMesh6HFrameObjectVerified: true as const,
      exactFrameConsumerByteEvidenceObjectIdentityVerified:
        true as const,
      capturedFrameToConsumerBytesIndependentlyVerified:
        true as const,
      exactFrameToVerifiedProfileBindingVerified,
      reviewedSubjectRelativeMirrorCalibrationConsumed:
        false as const,
    }),
    blockers: uniqueBlockers(blockers),
    privacy: Object.freeze({
      rawFramePersistedByBinding: false as const,
      rawFrameBytesPersistedByBinding: false as const,
      imageDigestReturnedByBinding: false as const,
      imageDigestPersistedByBinding: false as const,
      biometricEmbeddingProduced: false as const,
      identityTemplateProduced: false as const,
    }),
    authority: Object.freeze({
      subjectRelativeMirrorProvenanceAuthorized:
        false as const,
      anatomicalLateralityAuthorized: false as const,
      validatedExternalEarObservationAuthorized:
        false as const,
      traditionalBindingAuthorized: false as const,
      productionAuthorization: false as const,
    }),
  });

  ISSUED_BINDINGS.add(result);
  BINDING_STATE.set(
    result,
    Object.freeze({
      handle: input.handle,
      frame: input.frame,
      byteEvidence: input.byteEvidence,
      profileRef,
    }),
  );
  return result;
}

export function assertIssuedNeutralEarControlledCaptureRuntimeByteBindingFR104(
  binding: NeutralEarControlledCaptureRuntimeByteBindingFR104V1,
  expected: Readonly<{
    handle: Mesh6HBrowserCameraHandleV1;
    frame: Mesh6GCapturedFrameV1;
    byteEvidence:
      NeutralEarCapturedFrameConsumerByteEvidenceFR104V1;
    profileRef: string;
  }>,
): void {
  if (!ISSUED_BINDINGS.has(binding)) {
    fail('binding was not issued by the active D2B runtime.');
  }

  const state = BINDING_STATE.get(binding);
  if (
    state === undefined
    || state.handle !== expected.handle
    || state.frame !== expected.frame
    || state.byteEvidence !== expected.byteEvidence
    || state.profileRef !== expected.profileRef
  ) {
    fail('binding is not tied to the expected exact handle, frame, byte evidence, and profileRef.');
  }

  if (
    binding.schemaVersion
      !== 'fr104-neutral-ear-controlled-capture-runtime-byte-binding-v1'
    || binding.authorityState
      !== 'exact_frame_consumer_bytes_bound_profile_authority_still_closed'
    || binding.binding.exactIssuedMesh6HFrameObjectVerified !== true
    || binding.binding
      .exactFrameConsumerByteEvidenceObjectIdentityVerified !== true
    || binding.binding
      .capturedFrameToConsumerBytesIndependentlyVerified !== true
    || binding.binding
      .reviewedSubjectRelativeMirrorCalibrationConsumed !== false
    || binding.authority.subjectRelativeMirrorProvenanceAuthorized
      !== false
    || binding.authority.anatomicalLateralityAuthorized !== false
    || binding.authority.traditionalBindingAuthorized !== false
    || binding.authority.productionAuthorization !== false
  ) {
    fail('issued D2B runtime byte binding authority boundary drift.');
  }
}
