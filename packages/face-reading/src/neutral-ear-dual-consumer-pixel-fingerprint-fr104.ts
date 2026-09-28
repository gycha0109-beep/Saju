import {
  createHash,
  timingSafeEqual,
} from 'node:crypto';

import { FaceAuthorityValidationError } from './validation.js';

export type NeutralEarPixelFingerprintConsumerFR104V1 =
  | 'florence'
  | 'face_landmarker';

export interface NeutralEarPixelFingerprintAcknowledgementFR104V1 {
  readonly schemaVersion:
    'fr104-neutral-ear-pixel-fingerprint-ack-v1';
  readonly consumer:
    NeutralEarPixelFingerprintConsumerFR104V1;
  readonly algorithm: 'SHA-256';
  readonly frameByteLength: number;
  readonly digestComputed: true;
  readonly digestReturned: false;
  readonly digestPersisted: false;
  readonly rawFrameBytesRetained: false;
}

export interface NeutralEarDualConsumerPixelFingerprintEvidenceFR104V1 {
  readonly schemaVersion:
    'fr104-neutral-ear-dual-consumer-pixel-fingerprint-evidence-v1';
  readonly authorityState:
    'ephemeral_dual_consumer_pixel_identity_evidence_only';
  readonly algorithm: 'SHA-256';
  readonly consumers: readonly [
    'face_landmarker',
    'florence',
  ];
  readonly independentlyComputedByBothConsumers: true;
  readonly frameDigestEqual: boolean;
  readonly samePixelBytesIndependentlyVerified: boolean;
  readonly digestReturned: false;
  readonly digestPersisted: false;
  readonly digestRetainedAfterFinalize: false;
  readonly rawFrameBytesRetained: false;
  readonly identityTemplateProduced: false;
  readonly authority: {
    readonly transformProvenanceOnly: true;
    readonly anatomicalLateralityAuthorized: false;
    readonly validatedExternalEarObservationAuthorized: false;
    readonly traditionalBindingAuthorized: false;
    readonly productionAuthorization: false;
  };
}

export interface NeutralEarDualConsumerPixelFingerprintSessionFR104V1 {
  readonly observe: (
    consumer: NeutralEarPixelFingerprintConsumerFR104V1,
    frameBytes: Uint8Array,
  ) => NeutralEarPixelFingerprintAcknowledgementFR104V1;
  readonly finalize: (
  ) => NeutralEarDualConsumerPixelFingerprintEvidenceFR104V1;
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-104 pixel fingerprint ${message}`,
  );
}

function sha256(frameBytes: Uint8Array): Buffer {
  return createHash('sha256')
    .update(frameBytes)
    .digest();
}

export function createNeutralEarDualConsumerPixelFingerprintSessionFR104(
): NeutralEarDualConsumerPixelFingerprintSessionFR104V1 {
  const digests =
    new Map<NeutralEarPixelFingerprintConsumerFR104V1, Buffer>();
  let finalized = false;

  return Object.freeze({
    observe(
      consumer: NeutralEarPixelFingerprintConsumerFR104V1,
      frameBytes: Uint8Array,
    ): NeutralEarPixelFingerprintAcknowledgementFR104V1 {
      if (finalized) {
        fail('session is already finalized.');
      }
      if (
        consumer !== 'florence'
        && consumer !== 'face_landmarker'
      ) {
        fail('consumer must be florence or face_landmarker.');
      }
      if (!(frameBytes instanceof Uint8Array)) {
        fail('frameBytes must be a Uint8Array.');
      }
      if (frameBytes.byteLength <= 0) {
        fail('frameBytes must not be empty.');
      }
      if (digests.has(consumer)) {
        fail(`${consumer} already submitted a frame fingerprint.`);
      }

      digests.set(consumer, sha256(frameBytes));

      return Object.freeze({
        schemaVersion:
          'fr104-neutral-ear-pixel-fingerprint-ack-v1' as const,
        consumer,
        algorithm: 'SHA-256' as const,
        frameByteLength: frameBytes.byteLength,
        digestComputed: true as const,
        digestReturned: false as const,
        digestPersisted: false as const,
        rawFrameBytesRetained: false as const,
      });
    },

    finalize(
    ): NeutralEarDualConsumerPixelFingerprintEvidenceFR104V1 {
      if (finalized) {
        fail('session is already finalized.');
      }

      const florence = digests.get('florence');
      const faceLandmarker = digests.get('face_landmarker');
      if (florence === undefined || faceLandmarker === undefined) {
        fail(
          'both Florence and FaceLandmarker must independently submit frame bytes before finalization.',
        );
      }

      const equal = timingSafeEqual(
        florence,
        faceLandmarker,
      );

      finalized = true;
      digests.clear();

      return Object.freeze({
        schemaVersion:
          'fr104-neutral-ear-dual-consumer-pixel-fingerprint-evidence-v1' as const,
        authorityState:
          'ephemeral_dual_consumer_pixel_identity_evidence_only' as const,
        algorithm: 'SHA-256' as const,
        consumers: Object.freeze([
          'face_landmarker',
          'florence',
        ] as const),
        independentlyComputedByBothConsumers: true as const,
        frameDigestEqual: equal,
        samePixelBytesIndependentlyVerified: equal,
        digestReturned: false as const,
        digestPersisted: false as const,
        digestRetainedAfterFinalize: false as const,
        rawFrameBytesRetained: false as const,
        identityTemplateProduced: false as const,
        authority: Object.freeze({
          transformProvenanceOnly: true as const,
          anatomicalLateralityAuthorized: false as const,
          validatedExternalEarObservationAuthorized:
            false as const,
          traditionalBindingAuthorized: false as const,
          productionAuthorization: false as const,
        }),
      });
    },
  });
}
