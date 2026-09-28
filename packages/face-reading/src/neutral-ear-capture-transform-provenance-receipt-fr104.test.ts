import { describe, expect, it } from 'vitest';
import {
  acknowledgeNeutralEarTransformReceiptConsumerFR104,
  deriveNeutralEarPhaseDProvenanceFromTransformReceiptFR104,
  finalizeNeutralEarDualConsumerTransformBindingFR104,
  issueNeutralEarCaptureTransformReceiptFR104,
} from './neutral-ear-capture-transform-provenance-receipt-fr104.js';
import {
  createNeutralEarDualConsumerPixelFingerprintSessionFR104,
} from './neutral-ear-dual-consumer-pixel-fingerprint-fr104.js';

function issueKnownMirroredReceipt() {
  return issueNeutralEarCaptureTransformReceiptFR104({
    schemaVersion:
      'fr104-neutral-ear-capture-transform-receipt-input-v1',
    decodedFrame: Object.freeze({
      width: 1200,
      height: 1600,
    }),
    exif: Object.freeze({
      orientationTag: 6 as const,
      application: 'applied_by_decode_before_receipt' as const,
    }),
    explicitPostDecodeTransform: Object.freeze({
      rotationDegrees: 90 as const,
      horizontalMirrorApplied: true,
    }),
    consumerFrame: Object.freeze({
      width: 1600,
      height: 1200,
    }),
  });
}

function acknowledgeBoth(
  receipt: ReturnType<typeof issueKnownMirroredReceipt>,
) {
  acknowledgeNeutralEarTransformReceiptConsumerFR104(receipt, {
    consumer: 'florence',
    observedFrameWidth: 1600,
    observedFrameHeight: 1200,
    additionalPixelTransformAfterReceipt: 'none',
  });
  acknowledgeNeutralEarTransformReceiptConsumerFR104(receipt, {
    consumer: 'face_landmarker',
    observedFrameWidth: 1600,
    observedFrameHeight: 1200,
    additionalPixelTransformAfterReceipt: 'none',
  });
}

describe('FR104 capture-transform provenance receipt', () => {
  it('issues a bounded transform receipt without image bytes or digests', () => {
    const receipt = issueKnownMirroredReceipt();

    expect(receipt.decodedFrame).toEqual({
      width: 1200,
      height: 1600,
    });
    expect(receipt.consumerFrame).toEqual({
      width: 1600,
      height: 1200,
    });
    expect(receipt.explicitPostDecodeTransform).toEqual({
      rotationDegrees: 90,
      horizontalMirrorApplied: true,
    });
    expect(receipt.privacy).toEqual({
      rawFrameBytesRetained: false,
      imageDigestComputed: false,
      imageDigestPersisted: false,
      identityTemplateProduced: false,
    });
    expect(receipt.authority.samePixelBytesIndependentlyVerified)
      .toBe(false);
  });

  it('fails closed when recorded rotation and consumer dimensions disagree', () => {
    expect(() => issueNeutralEarCaptureTransformReceiptFR104({
      schemaVersion:
        'fr104-neutral-ear-capture-transform-receipt-input-v1',
      decodedFrame: Object.freeze({ width: 1200, height: 1600 }),
      exif: Object.freeze({
        orientationTag: null,
        application: 'not_present',
      }),
      explicitPostDecodeTransform: Object.freeze({
        rotationDegrees: 90,
        horizontalMirrorApplied: false,
      }),
      consumerFrame: Object.freeze({ width: 1200, height: 1600 }),
    })).toThrow(/dimensions must equal decoded-frame dimensions after the recorded rotation/i);
  });

  it('requires both consumers to acknowledge the exact same issued receipt object', () => {
    const receipt = issueKnownMirroredReceipt();

    acknowledgeNeutralEarTransformReceiptConsumerFR104(receipt, {
      consumer: 'florence',
      observedFrameWidth: 1600,
      observedFrameHeight: 1200,
      additionalPixelTransformAfterReceipt: 'none',
    });

    expect(() =>
      finalizeNeutralEarDualConsumerTransformBindingFR104(receipt),
    ).toThrow(/both Florence and FaceLandmarker/i);

    acknowledgeNeutralEarTransformReceiptConsumerFR104(receipt, {
      consumer: 'face_landmarker',
      observedFrameWidth: 1600,
      observedFrameHeight: 1200,
      additionalPixelTransformAfterReceipt: 'none',
    });

    const binding =
      finalizeNeutralEarDualConsumerTransformBindingFR104(receipt);

    expect(
      binding.bindingEvidence.sameIssuedReceiptObjectObservedByBothConsumers,
    ).toBe(true);
    expect(binding.bindingEvidence.samePixelBytesIndependentlyVerified)
      .toBe(false);
  });

  it('does not let acknowledgements from two different receipt objects masquerade as one binding', () => {
    const florenceReceipt = issueKnownMirroredReceipt();
    const faceReceipt = issueKnownMirroredReceipt();

    acknowledgeNeutralEarTransformReceiptConsumerFR104(
      florenceReceipt,
      {
        consumer: 'florence',
        observedFrameWidth: 1600,
        observedFrameHeight: 1200,
        additionalPixelTransformAfterReceipt: 'none',
      },
    );
    acknowledgeNeutralEarTransformReceiptConsumerFR104(
      faceReceipt,
      {
        consumer: 'face_landmarker',
        observedFrameWidth: 1600,
        observedFrameHeight: 1200,
        additionalPixelTransformAfterReceipt: 'none',
      },
    );

    expect(() =>
      finalizeNeutralEarDualConsumerTransformBindingFR104(
        florenceReceipt,
      ),
    ).toThrow(/both Florence and FaceLandmarker/i);
    expect(() =>
      finalizeNeutralEarDualConsumerTransformBindingFR104(
        faceReceipt,
      ),
    ).toThrow(/both Florence and FaceLandmarker/i);
  });

  it('exports capture-pipeline orientation and mirror provenance without promoting independent verification', () => {
    const receipt = issueKnownMirroredReceipt();
    acknowledgeBoth(receipt);
    const binding =
      finalizeNeutralEarDualConsumerTransformBindingFR104(receipt);
    const provenance =
      deriveNeutralEarPhaseDProvenanceFromTransformReceiptFR104(
        receipt,
        binding,
      );

    expect(provenance.exifOrientation).toEqual({
      state: 'present_transform_applied_before_both_pipelines',
      source: 'capture_pipeline_attestation',
      independentlyVerified: false,
    });
    expect(provenance.frontCameraMirror).toEqual({
      state: 'mirrored',
      source: 'capture_pipeline_attestation',
      independentlyVerified: false,
    });
    expect(
      provenance.sharedDecodedPixelFrame
        .candidateAndGeometrySamePixelOrientationAttested,
    ).toBe(true);
    expect(
      provenance.sharedDecodedPixelFrame.independentlyVerified,
    ).toBe(false);
  });

  it('clears only the same-pixel blocker when both consumers independently hash identical frame bytes', () => {
    const receipt = issueKnownMirroredReceipt();
    acknowledgeBoth(receipt);

    const fingerprint =
      createNeutralEarDualConsumerPixelFingerprintSessionFR104();
    const frame = Uint8Array.from([
      1, 3, 3, 7, 9, 21,
    ]);
    fingerprint.observe('florence', frame);
    fingerprint.observe(
      'face_landmarker',
      Uint8Array.from(frame),
    );

    const binding =
      finalizeNeutralEarDualConsumerTransformBindingFR104(
        receipt,
        fingerprint.finalize(),
      );

    expect(
      binding.bindingEvidence
        .samePixelBytesIndependentlyVerified,
    ).toBe(true);
    expect(binding.lateralityBlockers).not.toContain(
      'same_pixel_bytes_not_independently_verified',
    );
    expect(binding.lateralityBlockers).toContain(
      'anatomical_side_mapping_not_reviewed',
    );

    const provenance =
      deriveNeutralEarPhaseDProvenanceFromTransformReceiptFR104(
        receipt,
        binding,
      );
    expect(
      provenance.sharedDecodedPixelFrame.independentlyVerified,
    ).toBe(true);
    expect(
      binding.authority.anatomicalLateralityAuthorized,
    ).toBe(false);
  });

  it('keeps the same-pixel blocker when independent fingerprints differ', () => {
    const receipt = issueKnownMirroredReceipt();
    acknowledgeBoth(receipt);

    const fingerprint =
      createNeutralEarDualConsumerPixelFingerprintSessionFR104();
    fingerprint.observe(
      'florence',
      Uint8Array.from([1, 2, 3]),
    );
    fingerprint.observe(
      'face_landmarker',
      Uint8Array.from([1, 2, 4]),
    );

    const binding =
      finalizeNeutralEarDualConsumerTransformBindingFR104(
        receipt,
        fingerprint.finalize(),
      );

    expect(
      binding.bindingEvidence
        .samePixelBytesIndependentlyVerified,
    ).toBe(false);
    expect(binding.lateralityBlockers).toContain(
      'same_pixel_bytes_not_independently_verified',
    );
  });

  it('keeps anatomical laterality closed even with a complete declared transform chain', () => {
    const receipt = issueKnownMirroredReceipt();
    acknowledgeBoth(receipt);
    const binding =
      finalizeNeutralEarDualConsumerTransformBindingFR104(receipt);

    expect(
      binding.bindingEvidence
        .boundedProviderMirrorBehaviorStatementAdmitted,
    ).toBe(true);
    expect(binding.lateralityBlockers).toEqual([
      'same_pixel_bytes_not_independently_verified',
      'anatomical_side_mapping_not_reviewed',
    ]);
    expect(binding.authority.anatomicalLateralityAuthorized)
      .toBe(false);
    expect(binding.authority.validatedExternalEarObservation)
      .toBe(false);
    expect(binding.authority.traditionalBindingAuthorized)
      .toBe(false);
    expect(binding.authority.productionAuthorization).toBe(false);
  });

  it('preserves unresolved EXIF application as an explicit blocker', () => {
    const receipt = issueNeutralEarCaptureTransformReceiptFR104({
      schemaVersion:
        'fr104-neutral-ear-capture-transform-receipt-input-v1',
      decodedFrame: Object.freeze({ width: 1200, height: 1600 }),
      exif: Object.freeze({
        orientationTag: 6,
        application: 'unknown',
      }),
      explicitPostDecodeTransform: Object.freeze({
        rotationDegrees: 0,
        horizontalMirrorApplied: false,
      }),
      consumerFrame: Object.freeze({ width: 1200, height: 1600 }),
    });

    acknowledgeNeutralEarTransformReceiptConsumerFR104(receipt, {
      consumer: 'florence',
      observedFrameWidth: 1200,
      observedFrameHeight: 1600,
      additionalPixelTransformAfterReceipt: 'none',
    });
    acknowledgeNeutralEarTransformReceiptConsumerFR104(receipt, {
      consumer: 'face_landmarker',
      observedFrameWidth: 1200,
      observedFrameHeight: 1600,
      additionalPixelTransformAfterReceipt: 'none',
    });
    const binding =
      finalizeNeutralEarDualConsumerTransformBindingFR104(receipt);

    expect(binding.lateralityBlockers).toContain(
      'exif_orientation_application_unresolved',
    );
  });
});
