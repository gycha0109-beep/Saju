import {
  CONTROLLED_CAPTURE_CALIBRATION_EVIDENCE_FR21B,
  CONTROLLED_CAPTURE_PROFILES_FR21B,
  validateControlledCaptureProfileAttestationFR21B,
} from './controlled-capture-attestation-fr21b.js';
import type {
  NeutralEarDualConsumerPixelFingerprintEvidenceFR104V1,
} from './neutral-ear-dual-consumer-pixel-fingerprint-fr104.js';
import type {
  NeutralEarFrameTransformParityFR104V1,
} from './neutral-ear-frame-transform-parity-fr104.js';
import {
  assertIssuedMesh6HBrowserCameraHandle,
  type Mesh6HBrowserCameraHandleV1,
  type Mesh6HBrowserFrameTriggerV1,
} from './mesh6h-browser-camera-frame-source.js';
import type {
  Mesh6GCapturedFrameV1,
} from './mesh6g-prospective-operator-capture-session.js';
import { FaceAuthorityValidationError } from './validation.js';

export const NEUTRAL_EAR_MESH6H_FRONT_CAPTURE_IMPLEMENTATION_FR104 =
  Object.freeze({
    repository: 'gycha0109-beep/Saju',
    repositoryCommit:
      '0032700ae853be54e2797a7acdce9ab63db796c7',
    sourcePath:
      'packages/face-reading/src/mesh6h-browser-camera-frame-source.ts',
    sourceBlobSha:
      '0dccf5dee0b69bae24e2b79f1d4e69ca81646396',
    cameraFacing: 'front' as const,
  });

export type NeutralEarControlledCaptureRuntimeBindingBlockerFR104V1 =
  | 'controlled_capture_profile_not_admitted'
  | 'controlled_capture_profile_not_verified'
  | 'controlled_capture_profile_implementation_identity_mismatch'
  | 'controlled_capture_profile_camera_facing_mismatch'
  | 'captured_frame_to_consumer_bytes_not_independently_verified';

export interface NeutralEarControlledCaptureFrameReceiptFR104V1 {
  readonly schemaVersion:
    'fr104-neutral-ear-controlled-capture-frame-receipt-v1';
  readonly authorityState:
    'exact_mesh6h_frame_object_bound_to_profile_ref_no_mirror_authority';
  readonly profileRef: string;
  readonly cameraFacing: 'front';
  readonly implementation:
    typeof NEUTRAL_EAR_MESH6H_FRONT_CAPTURE_IMPLEMENTATION_FR104;
  readonly frame: {
    readonly timestampMs: number;
    readonly frameWidth: number;
    readonly frameHeight: number;
    readonly providerRunRef: string;
    readonly exactCapturedFrameObjectIdentityBound: true;
  };
  readonly privacy: {
    readonly frameObjectPassedEphemerally: true;
    readonly rawFramePersistedByBinding: false;
    readonly imageDigestPersistedByBinding: false;
    readonly biometricEmbeddingProduced: false;
    readonly identityTemplateProduced: false;
  };
  readonly authority: {
    readonly subjectRelativeMirrorProvenanceAuthorized: false;
    readonly anatomicalLateralityAuthorized: false;
    readonly traditionalBindingAuthorized: false;
    readonly productionAuthorization: false;
  };
}

export interface NeutralEarControlledCaptureBoundFrameFR104V1 {
  readonly frame: Mesh6GCapturedFrameV1;
  readonly receipt:
    NeutralEarControlledCaptureFrameReceiptFR104V1;
}

export interface NeutralEarControlledCaptureRuntimeFrameProfileBindingFR104V1 {
  readonly schemaVersion:
    'fr104-neutral-ear-controlled-capture-runtime-frame-profile-binding-v1';
  readonly authorityState:
    'exact_captured_frame_object_profile_binding_consumer_bytes_unverified';
  readonly profileRef: string;
  readonly cameraFacing: 'front';
  readonly profileSnapshot: {
    readonly admitted: boolean;
    readonly verified: boolean;
    readonly implementationIdentityMatches: boolean;
    readonly cameraFacingMatches: boolean;
  };
  readonly binding: {
    readonly exactCapturedFrameObjectBoundToIssuedMesh6HHandle: true;
    readonly exactCapturedFrameObjectBoundToProfileRef: true;
    readonly frameTransformParityObjectIdentityBound: true;
    readonly pixelIdentityEvidenceObjectIdentityBound: true;
    readonly exactFrameToVerifiedProfileBindingVerified: boolean;
    readonly capturedFrameToConsumerBytesIndependentlyVerified: false;
  };
  readonly blockers:
    readonly NeutralEarControlledCaptureRuntimeBindingBlockerFR104V1[];
  readonly privacy: {
    readonly rawFramePersistedByBinding: false;
    readonly imageDigestPersistedByBinding: false;
    readonly rawProviderLandmarksPersisted: false;
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

export interface NeutralEarControlledCaptureRuntimeFrameBindingSessionFR104V1 {
  readonly createBoundFrameSource: (
    triggers: AsyncIterable<Mesh6HBrowserFrameTriggerV1>,
  ) => AsyncIterable<NeutralEarControlledCaptureBoundFrameFR104V1>;
  readonly bindEvidence: (
    boundFrame: NeutralEarControlledCaptureBoundFrameFR104V1,
    evidence: Readonly<{
      frameTransformParity: NeutralEarFrameTransformParityFR104V1;
      pixelIdentityEvidence:
        NeutralEarDualConsumerPixelFingerprintEvidenceFR104V1;
    }>,
  ) => NeutralEarControlledCaptureRuntimeFrameProfileBindingFR104V1;
}

const ISSUED_RECEIPTS = new WeakSet<object>();
const RECEIPT_STATE = new WeakMap<
  object,
  Readonly<{
    frame: Mesh6GCapturedFrameV1;
    handle: Mesh6HBrowserCameraHandleV1;
    profileRef: string;
  }>
>();
const ISSUED_BINDINGS = new WeakSet<object>();
const BINDING_STATE = new WeakMap<
  object,
  Readonly<{
    receipt: NeutralEarControlledCaptureFrameReceiptFR104V1;
    frameTransformParity: NeutralEarFrameTransformParityFR104V1;
    pixelIdentityEvidence:
      NeutralEarDualConsumerPixelFingerprintEvidenceFR104V1;
    profileRef: string;
  }>
>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-104 controlled capture runtime binding ${message}`,
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

function profileSnapshot(profileRef: string) {
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
    NEUTRAL_EAR_MESH6H_FRONT_CAPTURE_IMPLEMENTATION_FR104;
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
      profile.cameraFacing === implementation.cameraFacing,
  });
}

function uniqueBlockers(
  blockers:
    readonly NeutralEarControlledCaptureRuntimeBindingBlockerFR104V1[],
) {
  return Object.freeze([...new Set(blockers)]);
}

export function createNeutralEarControlledCaptureRuntimeFrameBindingSessionFR104(
  input: Readonly<{
    handle: Mesh6HBrowserCameraHandleV1;
    profileRef: string;
  }>,
): NeutralEarControlledCaptureRuntimeFrameBindingSessionFR104V1 {
  assertIssuedMesh6HBrowserCameraHandle(input.handle);
  const profileRef = stableProfileRef(input.profileRef);

  if (
    input.handle.executionBoundary.facingModeRequested !== 'user'
  ) {
    fail('D2A only admits the existing Mesh6H front-camera handle.');
  }

  const boundFrames = new WeakSet<object>();

  return Object.freeze({
    createBoundFrameSource(
      triggers: AsyncIterable<Mesh6HBrowserFrameTriggerV1>,
    ) {
      const source = input.handle.createSweepFrameSource(triggers);
      return Object.freeze({
        async *[Symbol.asyncIterator](
        ): AsyncGenerator<NeutralEarControlledCaptureBoundFrameFR104V1> {
          for await (const frame of source) {
            const receipt = Object.freeze({
              schemaVersion:
                'fr104-neutral-ear-controlled-capture-frame-receipt-v1' as const,
              authorityState:
                'exact_mesh6h_frame_object_bound_to_profile_ref_no_mirror_authority' as const,
              profileRef,
              cameraFacing: 'front' as const,
              implementation:
                NEUTRAL_EAR_MESH6H_FRONT_CAPTURE_IMPLEMENTATION_FR104,
              frame: Object.freeze({
                timestampMs: frame.timestampMs,
                frameWidth: frame.frameWidth,
                frameHeight: frame.frameHeight,
                providerRunRef: frame.providerRunRef,
                exactCapturedFrameObjectIdentityBound: true as const,
              }),
              privacy: Object.freeze({
                frameObjectPassedEphemerally: true as const,
                rawFramePersistedByBinding: false as const,
                imageDigestPersistedByBinding: false as const,
                biometricEmbeddingProduced: false as const,
                identityTemplateProduced: false as const,
              }),
              authority: Object.freeze({
                subjectRelativeMirrorProvenanceAuthorized:
                  false as const,
                anatomicalLateralityAuthorized: false as const,
                traditionalBindingAuthorized: false as const,
                productionAuthorization: false as const,
              }),
            });

            const boundFrame = Object.freeze({
              frame,
              receipt,
            });

            ISSUED_RECEIPTS.add(receipt);
            RECEIPT_STATE.set(
              receipt,
              Object.freeze({
                frame,
                handle: input.handle,
                profileRef,
              }),
            );
            boundFrames.add(boundFrame);

            yield boundFrame;
          }
        },
      });
    },

    bindEvidence(
      boundFrame: NeutralEarControlledCaptureBoundFrameFR104V1,
      evidence: Readonly<{
        frameTransformParity:
          NeutralEarFrameTransformParityFR104V1;
        pixelIdentityEvidence:
          NeutralEarDualConsumerPixelFingerprintEvidenceFR104V1;
      }>,
    ): NeutralEarControlledCaptureRuntimeFrameProfileBindingFR104V1 {
      if (!boundFrames.has(boundFrame)) {
        fail('boundFrame was not issued by this active binding session.');
      }
      if (!ISSUED_RECEIPTS.has(boundFrame.receipt)) {
        fail('frame receipt was not issued by the active D2A runtime.');
      }

      const receiptState = RECEIPT_STATE.get(boundFrame.receipt);
      if (
        receiptState === undefined
        || receiptState.frame !== boundFrame.frame
        || receiptState.handle !== input.handle
        || receiptState.profileRef !== profileRef
      ) {
        fail('frame receipt object-identity binding drift.');
      }

      const snapshot = profileSnapshot(profileRef);
      const blockers:
        NeutralEarControlledCaptureRuntimeBindingBlockerFR104V1[] = [];

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

      blockers.push(
        'captured_frame_to_consumer_bytes_not_independently_verified',
      );

      const exactFrameToVerifiedProfileBindingVerified =
        snapshot.admitted
        && snapshot.verified
        && snapshot.implementationIdentityMatches
        && snapshot.cameraFacingMatches;

      const result = Object.freeze({
        schemaVersion:
          'fr104-neutral-ear-controlled-capture-runtime-frame-profile-binding-v1' as const,
        authorityState:
          'exact_captured_frame_object_profile_binding_consumer_bytes_unverified' as const,
        profileRef,
        cameraFacing: 'front' as const,
        profileSnapshot: snapshot,
        binding: Object.freeze({
          exactCapturedFrameObjectBoundToIssuedMesh6HHandle:
            true as const,
          exactCapturedFrameObjectBoundToProfileRef: true as const,
          frameTransformParityObjectIdentityBound: true as const,
          pixelIdentityEvidenceObjectIdentityBound: true as const,
          exactFrameToVerifiedProfileBindingVerified,
          capturedFrameToConsumerBytesIndependentlyVerified:
            false as const,
        }),
        blockers: uniqueBlockers(blockers),
        privacy: Object.freeze({
          rawFramePersistedByBinding: false as const,
          imageDigestPersistedByBinding: false as const,
          rawProviderLandmarksPersisted: false as const,
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
          receipt: boundFrame.receipt,
          frameTransformParity: evidence.frameTransformParity,
          pixelIdentityEvidence: evidence.pixelIdentityEvidence,
          profileRef,
        }),
      );
      return result;
    },
  });
}

export function assertIssuedNeutralEarControlledCaptureRuntimeFrameProfileBindingFR104(
  binding:
    NeutralEarControlledCaptureRuntimeFrameProfileBindingFR104V1,
  expected: Readonly<{
    profileRef: string;
    frameTransformParity: NeutralEarFrameTransformParityFR104V1;
    pixelIdentityEvidence:
      NeutralEarDualConsumerPixelFingerprintEvidenceFR104V1;
  }>,
): void {
  if (!ISSUED_BINDINGS.has(binding)) {
    fail('binding was not issued by the active D2A runtime.');
  }

  const state = BINDING_STATE.get(binding);
  if (
    state === undefined
    || state.profileRef !== expected.profileRef
    || state.frameTransformParity !== expected.frameTransformParity
    || state.pixelIdentityEvidence !== expected.pixelIdentityEvidence
  ) {
    fail(
      'binding is not tied to the exact profileRef, frame-transform evidence, and pixel-identity evidence objects.',
    );
  }

  if (
    binding.schemaVersion
      !== 'fr104-neutral-ear-controlled-capture-runtime-frame-profile-binding-v1'
    || binding.authorityState
      !== 'exact_captured_frame_object_profile_binding_consumer_bytes_unverified'
    || binding.cameraFacing !== 'front'
    || binding.binding
      .exactCapturedFrameObjectBoundToIssuedMesh6HHandle !== true
    || binding.binding.exactCapturedFrameObjectBoundToProfileRef
      !== true
    || binding.binding
      .capturedFrameToConsumerBytesIndependentlyVerified !== false
    || binding.authority.subjectRelativeMirrorProvenanceAuthorized
      !== false
    || binding.authority.anatomicalLateralityAuthorized !== false
  ) {
    fail('issued D2A binding authority boundary drift.');
  }
}
