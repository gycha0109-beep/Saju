import {
  createHash,
  timingSafeEqual,
} from 'node:crypto';

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

export const NEUTRAL_EAR_MESH6H_D2B_CAPTURE_IMPLEMENTATION_FR104 =
  Object.freeze({
    repository: 'gycha0109-beep/Saju',
    repositoryCommit:
      'aa3109356477d9621a571ac91d250f10b2241955',
    sourcePath:
      'packages/face-reading/src/mesh6h-browser-camera-frame-source.ts',
    sourceBlobSha:
      '49b7fa4277326ad571a01d5414f586128cf5758b',
  });

export type NeutralEarCapturedFrameConsumerFR104V1 =
  | 'florence'
  | 'face_landmarker';

export type NeutralEarCapturedFrameByteMaterializerFR104V1 = (
  input: Readonly<{
    image: unknown;
    width: number;
    height: number;
  }>,
) => Promise<Uint8Array> | Uint8Array;

export interface NeutralEarCapturedFrameConsumerByteEvidenceFR104V1 {
  readonly schemaVersion:
    'fr104-neutral-ear-captured-frame-consumer-byte-evidence-v1';
  readonly authorityState:
    'exact_mesh6h_frame_materialized_to_dual_consumer_byte_boundary_only';
  readonly implementation:
    typeof NEUTRAL_EAR_MESH6H_D2B_CAPTURE_IMPLEMENTATION_FR104;
  readonly cameraFacing: Mesh6HCameraFacingV1;
  readonly frame: {
    readonly timestampMs: number;
    readonly frameWidth: number;
    readonly frameHeight: number;
    readonly providerRunRef: string;
    readonly exactIssuedFrameObjectVerified: true;
  };
  readonly byteBinding: {
    readonly sourceBytesMaterializedFromExactIssuedFrameImageObject: true;
    readonly materializedByteLength: number;
    readonly florenceConsumerBoundaryObserved: true;
    readonly faceLandmarkerConsumerBoundaryObserved: true;
    readonly sourceDigestMatchedFlorenceBoundaryBytes: true;
    readonly sourceDigestMatchedFaceLandmarkerBoundaryBytes: true;
    readonly bothConsumerBoundaryDigestsEqual: true;
    readonly capturedFrameToConsumerBytesIndependentlyVerified: true;
  };
  readonly privacy: {
    readonly sourceDigestReturned: false;
    readonly sourceDigestPersisted: false;
    readonly consumerDigestsReturned: false;
    readonly consumerDigestsPersisted: false;
    readonly rawFrameBytesPersistedByBridge: false;
    readonly bridgeOwnedSourceBytesZeroedAfterFinalize: true;
    readonly bridgeOwnedConsumerCopiesZeroedAfterCallback: true;
    readonly biometricEmbeddingProduced: false;
    readonly identityTemplateProduced: false;
  };
  readonly authority: {
    readonly byteOriginProvenanceOnly: true;
    readonly subjectRelativeMirrorProvenanceAuthorized: false;
    readonly anatomicalLateralityAuthorized: false;
    readonly validatedExternalEarObservationAuthorized: false;
    readonly traditionalBindingAuthorized: false;
    readonly productionAuthorization: false;
  };
}

export interface NeutralEarCapturedFrameConsumerByteSessionFR104V1 {
  readonly consume: <T>(
    consumer: NeutralEarCapturedFrameConsumerFR104V1,
    callback: (frameBytes: Uint8Array) => Promise<T> | T,
  ) => Promise<T>;
  readonly finalize: (
  ) => NeutralEarCapturedFrameConsumerByteEvidenceFR104V1;
}

const ISSUED_EVIDENCE = new WeakSet<object>();
const EVIDENCE_STATE = new WeakMap<
  object,
  Readonly<{
    handle: Mesh6HBrowserCameraHandleV1;
    frame: Mesh6GCapturedFrameV1;
  }>
>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-104 captured-frame consumer-byte provenance ${message}`,
  );
}

function sha256(bytes: Uint8Array): Buffer {
  return createHash('sha256').update(bytes).digest();
}

export async function createNeutralEarCapturedFrameConsumerByteSessionFR104(
  input: Readonly<{
    handle: Mesh6HBrowserCameraHandleV1;
    frame: Mesh6GCapturedFrameV1;
    materializeFrameBytes:
      NeutralEarCapturedFrameByteMaterializerFR104V1;
  }>,
): Promise<NeutralEarCapturedFrameConsumerByteSessionFR104V1> {
  assertIssuedMesh6HBrowserCameraHandle(input.handle);
  assertIssuedMesh6HBrowserCameraFrame(input.handle, input.frame);

  if (typeof input.materializeFrameBytes !== 'function') {
    fail('materializeFrameBytes must be a function.');
  }

  const materialized = await input.materializeFrameBytes(Object.freeze({
    image: input.frame.image,
    width: input.frame.frameWidth,
    height: input.frame.frameHeight,
  }));
  if (!(materialized instanceof Uint8Array) || materialized.byteLength <= 0) {
    fail('materializeFrameBytes must return a non-empty Uint8Array.');
  }

  let sourceBytes: Uint8Array | null = new Uint8Array(materialized);
  const sourceDigest = sha256(sourceBytes);
  const consumerDigests =
    new Map<NeutralEarCapturedFrameConsumerFR104V1, Buffer>();
  let finalized = false;

  return Object.freeze({
    async consume<T>(
      consumer: NeutralEarCapturedFrameConsumerFR104V1,
      callback: (frameBytes: Uint8Array) => Promise<T> | T,
    ): Promise<T> {
      if (finalized || sourceBytes === null) {
        fail('session is already finalized.');
      }
      if (consumer !== 'florence' && consumer !== 'face_landmarker') {
        fail('consumer must be florence or face_landmarker.');
      }
      if (consumerDigests.has(consumer)) {
        fail(`${consumer} already consumed this captured frame byte boundary.`);
      }
      if (typeof callback !== 'function') {
        fail('consumer callback must be a function.');
      }

      const consumerBytes = new Uint8Array(sourceBytes);
      const digest = sha256(consumerBytes);
      try {
        const result = await callback(consumerBytes);
        consumerDigests.set(consumer, digest);
        return result;
      } finally {
        consumerBytes.fill(0);
      }
    },

    finalize(): NeutralEarCapturedFrameConsumerByteEvidenceFR104V1 {
      if (finalized || sourceBytes === null) {
        fail('session is already finalized.');
      }

      const florence = consumerDigests.get('florence');
      const faceLandmarker = consumerDigests.get('face_landmarker');
      if (florence === undefined || faceLandmarker === undefined) {
        fail(
          'both Florence and FaceLandmarker must cross the exact captured-frame byte boundary before finalization.',
        );
      }

      const sourceMatchesFlorence =
        timingSafeEqual(sourceDigest, florence);
      const sourceMatchesFaceLandmarker =
        timingSafeEqual(sourceDigest, faceLandmarker);
      const consumersEqual =
        timingSafeEqual(florence, faceLandmarker);
      if (
        !sourceMatchesFlorence
        || !sourceMatchesFaceLandmarker
        || !consumersEqual
      ) {
        fail('captured-frame source bytes and consumer-boundary bytes diverged.');
      }

      const materializedByteLength = sourceBytes.byteLength;
      sourceBytes.fill(0);
      sourceBytes = null;
      consumerDigests.clear();
      finalized = true;

      const evidence = Object.freeze({
        schemaVersion:
          'fr104-neutral-ear-captured-frame-consumer-byte-evidence-v1' as const,
        authorityState:
          'exact_mesh6h_frame_materialized_to_dual_consumer_byte_boundary_only' as const,
        implementation:
          NEUTRAL_EAR_MESH6H_D2B_CAPTURE_IMPLEMENTATION_FR104,
        cameraFacing:
          input.handle.executionBoundary.cameraFacingRequested,
        frame: Object.freeze({
          timestampMs: input.frame.timestampMs,
          frameWidth: input.frame.frameWidth,
          frameHeight: input.frame.frameHeight,
          providerRunRef: input.frame.providerRunRef,
          exactIssuedFrameObjectVerified: true as const,
        }),
        byteBinding: Object.freeze({
          sourceBytesMaterializedFromExactIssuedFrameImageObject:
            true as const,
          materializedByteLength,
          florenceConsumerBoundaryObserved: true as const,
          faceLandmarkerConsumerBoundaryObserved: true as const,
          sourceDigestMatchedFlorenceBoundaryBytes: true as const,
          sourceDigestMatchedFaceLandmarkerBoundaryBytes: true as const,
          bothConsumerBoundaryDigestsEqual: true as const,
          capturedFrameToConsumerBytesIndependentlyVerified:
            true as const,
        }),
        privacy: Object.freeze({
          sourceDigestReturned: false as const,
          sourceDigestPersisted: false as const,
          consumerDigestsReturned: false as const,
          consumerDigestsPersisted: false as const,
          rawFrameBytesPersistedByBridge: false as const,
          bridgeOwnedSourceBytesZeroedAfterFinalize: true as const,
          bridgeOwnedConsumerCopiesZeroedAfterCallback: true as const,
          biometricEmbeddingProduced: false as const,
          identityTemplateProduced: false as const,
        }),
        authority: Object.freeze({
          byteOriginProvenanceOnly: true as const,
          subjectRelativeMirrorProvenanceAuthorized:
            false as const,
          anatomicalLateralityAuthorized: false as const,
          validatedExternalEarObservationAuthorized:
            false as const,
          traditionalBindingAuthorized: false as const,
          productionAuthorization: false as const,
        }),
      });

      ISSUED_EVIDENCE.add(evidence);
      EVIDENCE_STATE.set(
        evidence,
        Object.freeze({
          handle: input.handle,
          frame: input.frame,
        }),
      );
      return evidence;
    },
  });
}

export function assertNeutralEarCapturedFrameConsumerByteEvidenceFR104(
  evidence: NeutralEarCapturedFrameConsumerByteEvidenceFR104V1,
  expected?: Readonly<{
    handle: Mesh6HBrowserCameraHandleV1;
    frame: Mesh6GCapturedFrameV1;
  }>,
): void {
  if (!ISSUED_EVIDENCE.has(evidence)) {
    fail('consumer-byte evidence was not issued by the active D2B runtime.');
  }
  const state = EVIDENCE_STATE.get(evidence);
  if (
    state === undefined
    || (
      expected !== undefined
      && (
        state.handle !== expected.handle
        || state.frame !== expected.frame
      )
    )
  ) {
    fail('consumer-byte evidence is not bound to the expected exact Mesh6H handle and frame objects.');
  }
  if (
    evidence.schemaVersion
      !== 'fr104-neutral-ear-captured-frame-consumer-byte-evidence-v1'
    || evidence.authorityState
      !== 'exact_mesh6h_frame_materialized_to_dual_consumer_byte_boundary_only'
    || evidence.frame.exactIssuedFrameObjectVerified !== true
    || evidence.byteBinding
      .sourceBytesMaterializedFromExactIssuedFrameImageObject !== true
    || evidence.byteBinding.florenceConsumerBoundaryObserved !== true
    || evidence.byteBinding.faceLandmarkerConsumerBoundaryObserved !== true
    || evidence.byteBinding
      .sourceDigestMatchedFlorenceBoundaryBytes !== true
    || evidence.byteBinding
      .sourceDigestMatchedFaceLandmarkerBoundaryBytes !== true
    || evidence.byteBinding.bothConsumerBoundaryDigestsEqual !== true
    || evidence.byteBinding
      .capturedFrameToConsumerBytesIndependentlyVerified !== true
    || evidence.privacy.sourceDigestReturned !== false
    || evidence.privacy.sourceDigestPersisted !== false
    || evidence.privacy.consumerDigestsReturned !== false
    || evidence.privacy.consumerDigestsPersisted !== false
    || evidence.privacy.rawFrameBytesPersistedByBridge !== false
    || evidence.authority.byteOriginProvenanceOnly !== true
    || evidence.authority.subjectRelativeMirrorProvenanceAuthorized
      !== false
    || evidence.authority.anatomicalLateralityAuthorized !== false
    || evidence.authority.traditionalBindingAuthorized !== false
    || evidence.authority.productionAuthorization !== false
  ) {
    fail('consumer-byte evidence authority boundary drift.');
  }
}
