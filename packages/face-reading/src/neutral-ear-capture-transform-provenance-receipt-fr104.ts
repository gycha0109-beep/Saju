import type {
  NeutralEarOrientationMirrorProvenanceFR104V1,
} from './neutral-ear-ephemeral-orchestration-fr104.js';
import {
  NEUTRAL_EAR_PROVIDER_MIRROR_SEMANTICS_REVIEW_FR104,
} from './neutral-ear-provider-mirror-semantics-review-fr104.js';
import { FaceAuthorityValidationError } from './validation.js';

export type NeutralEarExifOrientationTagFR104V1 =
  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type NeutralEarExifApplicationFR104V1 =
  | 'not_present'
  | 'applied_by_decode_before_receipt'
  | 'preserved_unapplied_at_receipt'
  | 'unknown';

export type NeutralEarCaptureTransformConsumerFR104V1 =
  | 'florence'
  | 'face_landmarker';

export interface NeutralEarCaptureTransformReceiptInputFR104V1 {
  readonly schemaVersion:
    'fr104-neutral-ear-capture-transform-receipt-input-v1';
  readonly decodedFrame: {
    readonly width: number;
    readonly height: number;
  };
  readonly exif: {
    readonly orientationTag: NeutralEarExifOrientationTagFR104V1 | null;
    readonly application: NeutralEarExifApplicationFR104V1;
  };
  readonly explicitPostDecodeTransform: {
    readonly rotationDegrees: 0 | 90 | 180 | 270;
    readonly horizontalMirrorApplied: boolean;
  };
  readonly consumerFrame: {
    readonly width: number;
    readonly height: number;
  };
}

export interface NeutralEarCaptureTransformReceiptFR104V1 {
  readonly schemaVersion:
    'fr104-neutral-ear-capture-transform-receipt-v1';
  readonly authorityState:
    'ephemeral_transform_provenance_receipt_no_pixel_identity_proof';
  readonly decodedFrame: {
    readonly width: number;
    readonly height: number;
  };
  readonly exif: {
    readonly orientationTag: NeutralEarExifOrientationTagFR104V1 | null;
    readonly application: NeutralEarExifApplicationFR104V1;
  };
  readonly explicitPostDecodeTransform: {
    readonly rotationDegrees: 0 | 90 | 180 | 270;
    readonly horizontalMirrorApplied: boolean;
  };
  readonly consumerFrame: {
    readonly width: number;
    readonly height: number;
  };
  readonly privacy: {
    readonly rawFrameBytesRetained: false;
    readonly imageDigestComputed: false;
    readonly imageDigestPersisted: false;
    readonly identityTemplateProduced: false;
  };
  readonly authority: {
    readonly transformProvenanceRecorded: true;
    readonly samePixelBytesIndependentlyVerified: false;
    readonly anatomicalLateralityAuthorized: false;
    readonly traditionalBindingAuthorized: false;
    readonly productionAuthorization: false;
  };
}

export interface NeutralEarCaptureTransformConsumerAcknowledgementFR104V1 {
  readonly schemaVersion:
    'fr104-neutral-ear-capture-transform-consumer-ack-v1';
  readonly consumer: NeutralEarCaptureTransformConsumerFR104V1;
  readonly receiptObjectIdentityAccepted: true;
  readonly consumerFrameDimensionsMatchReceipt: true;
  readonly additionalPixelTransformAfterReceipt: 'none';
  readonly rawFramePersistedByAcknowledgement: false;
}

export interface NeutralEarDualConsumerTransformBindingFR104V1 {
  readonly schemaVersion:
    'fr104-neutral-ear-dual-consumer-transform-binding-v1';
  readonly authorityState:
    'same_ephemeral_receipt_consumed_by_both_pipelines_no_pixel_digest';
  readonly consumers: readonly [
    'face_landmarker',
    'florence',
  ];
  readonly bindingEvidence: {
    readonly sameIssuedReceiptObjectObservedByBothConsumers: true;
    readonly consumerFrameDimensionsMatch: true;
    readonly additionalPixelTransformsDeclaredNone: true;
    readonly samePixelBytesIndependentlyVerified: false;
    readonly boundedProviderMirrorBehaviorStatementAdmitted: true;
  };
  readonly lateralityBlockers: readonly (
    | 'exif_orientation_application_unresolved'
    | 'same_pixel_bytes_not_independently_verified'
    | 'anatomical_side_mapping_not_reviewed'
  )[];
  readonly authority: {
    readonly orientationMirrorProvenanceMayBeExportedToPhaseD: true;
    readonly anatomicalLateralityAuthorized: false;
    readonly validatedExternalEarObservation: false;
    readonly traditionalBindingAuthorized: false;
    readonly productionAuthorization: false;
  };
}

const ISSUED_RECEIPTS = new WeakSet<object>();
const CONSUMERS_BY_RECEIPT =
  new WeakMap<object, Set<NeutralEarCaptureTransformConsumerFR104V1>>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-104 ${message}`);
}

function positiveInteger(value: number, label: string): number {
  if (!Number.isInteger(value) || value <= 0) {
    fail(`${label} must be a positive integer.`);
  }
  return value;
}

function validateExif(input: NeutralEarCaptureTransformReceiptInputFR104V1['exif']): void {
  const tag = input.orientationTag;
  if (
    tag !== null
    && (!Number.isInteger(tag) || tag < 1 || tag > 8)
  ) {
    fail('EXIF orientationTag must be null or an integer within [1,8].');
  }
  if (input.application === 'not_present' && tag !== null) {
    fail('EXIF not_present requires orientationTag=null.');
  }
  if (
    (
      input.application === 'applied_by_decode_before_receipt'
      || input.application === 'preserved_unapplied_at_receipt'
    )
    && tag === null
  ) {
    fail('known EXIF application state requires an orientationTag.');
  }
}

function expectedConsumerDimensions(
  width: number,
  height: number,
  rotationDegrees: 0 | 90 | 180 | 270,
): Readonly<{ width: number; height: number }> {
  if (rotationDegrees === 90 || rotationDegrees === 270) {
    return Object.freeze({ width: height, height: width });
  }
  return Object.freeze({ width, height });
}

function assertIssuedReceipt(
  receipt: NeutralEarCaptureTransformReceiptFR104V1,
): void {
  if (!ISSUED_RECEIPTS.has(receipt)) {
    fail('capture transform receipt was not issued by the active FR104 runtime.');
  }
  if (
    receipt.schemaVersion
      !== 'fr104-neutral-ear-capture-transform-receipt-v1'
    || receipt.authorityState
      !== 'ephemeral_transform_provenance_receipt_no_pixel_identity_proof'
    || receipt.authority.transformProvenanceRecorded !== true
    || receipt.authority.samePixelBytesIndependentlyVerified !== false
  ) {
    fail('capture transform receipt authority drift.');
  }
}

export function issueNeutralEarCaptureTransformReceiptFR104(
  input: NeutralEarCaptureTransformReceiptInputFR104V1,
): NeutralEarCaptureTransformReceiptFR104V1 {
  if (
    input.schemaVersion
      !== 'fr104-neutral-ear-capture-transform-receipt-input-v1'
  ) {
    fail('capture transform receipt input schema mismatch.');
  }

  const decodedWidth = positiveInteger(
    input.decodedFrame.width,
    'decodedFrame.width',
  );
  const decodedHeight = positiveInteger(
    input.decodedFrame.height,
    'decodedFrame.height',
  );
  const consumerWidth = positiveInteger(
    input.consumerFrame.width,
    'consumerFrame.width',
  );
  const consumerHeight = positiveInteger(
    input.consumerFrame.height,
    'consumerFrame.height',
  );
  validateExif(input.exif);

  const expected = expectedConsumerDimensions(
    decodedWidth,
    decodedHeight,
    input.explicitPostDecodeTransform.rotationDegrees,
  );
  if (
    consumerWidth !== expected.width
    || consumerHeight !== expected.height
  ) {
    fail(
      'consumerFrame dimensions must equal decoded-frame dimensions after the recorded rotation.',
    );
  }

  const receipt: NeutralEarCaptureTransformReceiptFR104V1 = Object.freeze({
    schemaVersion:
      'fr104-neutral-ear-capture-transform-receipt-v1' as const,
    authorityState:
      'ephemeral_transform_provenance_receipt_no_pixel_identity_proof' as const,
    decodedFrame: Object.freeze({
      width: decodedWidth,
      height: decodedHeight,
    }),
    exif: Object.freeze({
      orientationTag: input.exif.orientationTag,
      application: input.exif.application,
    }),
    explicitPostDecodeTransform: Object.freeze({
      rotationDegrees:
        input.explicitPostDecodeTransform.rotationDegrees,
      horizontalMirrorApplied:
        input.explicitPostDecodeTransform.horizontalMirrorApplied,
    }),
    consumerFrame: Object.freeze({
      width: consumerWidth,
      height: consumerHeight,
    }),
    privacy: Object.freeze({
      rawFrameBytesRetained: false as const,
      imageDigestComputed: false as const,
      imageDigestPersisted: false as const,
      identityTemplateProduced: false as const,
    }),
    authority: Object.freeze({
      transformProvenanceRecorded: true as const,
      samePixelBytesIndependentlyVerified: false as const,
      anatomicalLateralityAuthorized: false as const,
      traditionalBindingAuthorized: false as const,
      productionAuthorization: false as const,
    }),
  });

  ISSUED_RECEIPTS.add(receipt);
  CONSUMERS_BY_RECEIPT.set(receipt, new Set());
  return receipt;
}

export function acknowledgeNeutralEarTransformReceiptConsumerFR104(
  receipt: NeutralEarCaptureTransformReceiptFR104V1,
  input: {
    readonly consumer: NeutralEarCaptureTransformConsumerFR104V1;
    readonly observedFrameWidth: number;
    readonly observedFrameHeight: number;
    readonly additionalPixelTransformAfterReceipt: 'none';
  },
): NeutralEarCaptureTransformConsumerAcknowledgementFR104V1 {
  assertIssuedReceipt(receipt);

  if (
    input.consumer !== 'florence'
    && input.consumer !== 'face_landmarker'
  ) {
    fail('consumer must be florence or face_landmarker.');
  }
  if (input.additionalPixelTransformAfterReceipt !== 'none') {
    fail('additional pixel transforms after receipt are not admitted.');
  }

  const observedWidth = positiveInteger(
    input.observedFrameWidth,
    'observedFrameWidth',
  );
  const observedHeight = positiveInteger(
    input.observedFrameHeight,
    'observedFrameHeight',
  );
  if (
    observedWidth !== receipt.consumerFrame.width
    || observedHeight !== receipt.consumerFrame.height
  ) {
    fail('consumer frame dimensions must match the issued receipt.');
  }

  const consumers = CONSUMERS_BY_RECEIPT.get(receipt);
  if (consumers === undefined) {
    fail('issued receipt consumer state is unavailable.');
  }
  if (consumers.has(input.consumer)) {
    fail(`${input.consumer} already acknowledged this receipt.`);
  }
  consumers.add(input.consumer);

  return Object.freeze({
    schemaVersion:
      'fr104-neutral-ear-capture-transform-consumer-ack-v1' as const,
    consumer: input.consumer,
    receiptObjectIdentityAccepted: true as const,
    consumerFrameDimensionsMatchReceipt: true as const,
    additionalPixelTransformAfterReceipt: 'none' as const,
    rawFramePersistedByAcknowledgement: false as const,
  });
}

export function finalizeNeutralEarDualConsumerTransformBindingFR104(
  receipt: NeutralEarCaptureTransformReceiptFR104V1,
): NeutralEarDualConsumerTransformBindingFR104V1 {
  assertIssuedReceipt(receipt);
  const consumers = CONSUMERS_BY_RECEIPT.get(receipt);
  if (
    consumers === undefined
    || !consumers.has('florence')
    || !consumers.has('face_landmarker')
  ) {
    fail('dual-consumer binding requires both Florence and FaceLandmarker to acknowledge the same issued receipt object.');
  }

  const blockers: Array<
    NeutralEarDualConsumerTransformBindingFR104V1['lateralityBlockers'][number]
  > = [];
  if (receipt.exif.application === 'unknown') {
    blockers.push('exif_orientation_application_unresolved');
  }
  blockers.push(
    'same_pixel_bytes_not_independently_verified',
    'anatomical_side_mapping_not_reviewed',
  );

  return Object.freeze({
    schemaVersion:
      'fr104-neutral-ear-dual-consumer-transform-binding-v1' as const,
    authorityState:
      'same_ephemeral_receipt_consumed_by_both_pipelines_no_pixel_digest' as const,
    consumers: Object.freeze([
      'face_landmarker',
      'florence',
    ] as const),
    bindingEvidence: Object.freeze({
      sameIssuedReceiptObjectObservedByBothConsumers: true as const,
      consumerFrameDimensionsMatch: true as const,
      additionalPixelTransformsDeclaredNone: true as const,
      samePixelBytesIndependentlyVerified: false as const,
      boundedProviderMirrorBehaviorStatementAdmitted:
        NEUTRAL_EAR_PROVIDER_MIRROR_SEMANTICS_REVIEW_FR104
          .decision
          .boundedProviderMirrorBehaviorStatementAdmitted,
    }),
    lateralityBlockers: Object.freeze(blockers),
    authority: Object.freeze({
      orientationMirrorProvenanceMayBeExportedToPhaseD: true as const,
      anatomicalLateralityAuthorized: false as const,
      validatedExternalEarObservation: false as const,
      traditionalBindingAuthorized: false as const,
      productionAuthorization: false as const,
    }),
  });
}

export function deriveNeutralEarPhaseDProvenanceFromTransformReceiptFR104(
  receipt: NeutralEarCaptureTransformReceiptFR104V1,
  binding: NeutralEarDualConsumerTransformBindingFR104V1,
): NeutralEarOrientationMirrorProvenanceFR104V1 {
  assertIssuedReceipt(receipt);

  if (
    binding.schemaVersion
      !== 'fr104-neutral-ear-dual-consumer-transform-binding-v1'
    || binding.bindingEvidence
      .sameIssuedReceiptObjectObservedByBothConsumers !== true
    || binding.bindingEvidence.samePixelBytesIndependentlyVerified !== false
    || binding.bindingEvidence
      .boundedProviderMirrorBehaviorStatementAdmitted !== true
    || binding.authority.orientationMirrorProvenanceMayBeExportedToPhaseD
      !== true
  ) {
    fail('dual-consumer binding is not eligible for Phase D provenance export.');
  }

  const exifState:
    NeutralEarOrientationMirrorProvenanceFR104V1['exifOrientation']['state'] =
      receipt.exif.application === 'not_present'
        ? 'absent_or_not_required'
        : receipt.exif.application === 'applied_by_decode_before_receipt'
          ? 'present_transform_applied_before_both_pipelines'
          : receipt.exif.application === 'preserved_unapplied_at_receipt'
            ? 'present_transform_not_applied_before_both_pipelines'
            : 'unknown';

  const exifSource:
    NeutralEarOrientationMirrorProvenanceFR104V1['exifOrientation']['source'] =
      exifState === 'unknown'
        ? 'unknown'
        : 'capture_pipeline_attestation';

  return Object.freeze({
    schemaVersion:
      'fr104-neutral-ear-orientation-mirror-provenance-v1' as const,
    sharedDecodedPixelFrame: Object.freeze({
      candidateAndGeometrySamePixelOrientationAttested: true as const,
      independentlyVerified: false as const,
    }),
    exifOrientation: Object.freeze({
      state: exifState,
      source: exifSource,
      independentlyVerified: false as const,
    }),
    frontCameraMirror: Object.freeze({
      state:
        receipt.explicitPostDecodeTransform.horizontalMirrorApplied
          ? 'mirrored'
          : 'not_mirrored',
      source: 'capture_pipeline_attestation' as const,
      independentlyVerified: false as const,
    }),
  });
}
