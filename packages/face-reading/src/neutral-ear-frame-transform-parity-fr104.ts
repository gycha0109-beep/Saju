import type {
  NeutralEarCaptureTransformReceiptFR104V1,
  NeutralEarExifApplicationFR104V1,
  NeutralEarExifOrientationTagFR104V1,
} from './neutral-ear-capture-transform-provenance-receipt-fr104.js';

export type NeutralEarReflectionParityFR104V1 =
  | 'orientation_preserving'
  | 'orientation_reversing'
  | 'unknown';

export const NEUTRAL_EAR_EXIF_ORIENTATION_PARITY_SOURCE_FR104 =
  Object.freeze({
    currentStandardListing: Object.freeze({
      organization:
        'Camera & Imaging Products Association (CIPA)' as const,
      standard:
        'CIPA DC-008-Translation-2026' as const,
      exifVersion: '3.1' as const,
      publicationDate: '2026-01-30' as const,
      url:
        'https://www.cipa.jp/e/std/std-sec.html' as const,
      role:
        'current_standard_listing_only' as const,
    }),
    directOrientationSemanticsWitness: Object.freeze({
      organization:
        'Camera & Imaging Products Association (CIPA)' as const,
      standard: 'CIPA DC-008-2012' as const,
      document:
        'Exchangeable image file format for digital still cameras: Exif Version 2.3' as const,
      figure:
        'Figure 12 Relationship between image data and orientation on a display screen according to an orientation tag' as const,
      url:
        'https://www.cipa.jp/std/documents/e/DC-008-2012_E.pdf' as const,
      semanticUse:
        'reflection_parity_of_orientation_values_1_through_8' as const,
      currentRevisionParityTextIndependentlyReverified:
        false as const,
    }),
  });

export const NEUTRAL_EAR_EXIF_ORIENTATION_REFLECTION_PARITY_FR104 =
  Object.freeze({
    1: 'orientation_preserving',
    2: 'orientation_reversing',
    3: 'orientation_preserving',
    4: 'orientation_reversing',
    5: 'orientation_reversing',
    6: 'orientation_preserving',
    7: 'orientation_reversing',
    8: 'orientation_preserving',
  } as const satisfies Readonly<
    Record<
      NeutralEarExifOrientationTagFR104V1,
      Exclude<NeutralEarReflectionParityFR104V1, 'unknown'>
    >
  >);

function xorParity(
  left: NeutralEarReflectionParityFR104V1,
  right: NeutralEarReflectionParityFR104V1,
): NeutralEarReflectionParityFR104V1 {
  if (left === 'unknown' || right === 'unknown') {
    return 'unknown';
  }
  return left === right
    ? 'orientation_preserving'
    : 'orientation_reversing';
}

function explicitMirrorParity(
  horizontalMirrorApplied: boolean,
): Exclude<NeutralEarReflectionParityFR104V1, 'unknown'> {
  return horizontalMirrorApplied
    ? 'orientation_reversing'
    : 'orientation_preserving';
}

function exifTagParity(
  orientationTag: NeutralEarExifOrientationTagFR104V1 | null,
): NeutralEarReflectionParityFR104V1 {
  return orientationTag === null
    ? 'unknown'
    : NEUTRAL_EAR_EXIF_ORIENTATION_REFLECTION_PARITY_FR104[
        orientationTag
      ];
}

function deriveExifParity(
  orientationTag: NeutralEarExifOrientationTagFR104V1 | null,
  application: NeutralEarExifApplicationFR104V1,
): Readonly<{
  tagParity: NeutralEarReflectionParityFR104V1;
  encodedToDecodedAppliedParity:
    NeutralEarReflectionParityFR104V1;
  decodedRelativeToIntendedDisplayParity:
    NeutralEarReflectionParityFR104V1;
}> {
  if (application === 'unknown') {
    return Object.freeze({
      tagParity: exifTagParity(orientationTag),
      encodedToDecodedAppliedParity: 'unknown' as const,
      decodedRelativeToIntendedDisplayParity:
        'unknown' as const,
    });
  }

  if (application === 'not_present') {
    return Object.freeze({
      tagParity: 'orientation_preserving' as const,
      encodedToDecodedAppliedParity:
        'orientation_preserving' as const,
      decodedRelativeToIntendedDisplayParity:
        'orientation_preserving' as const,
    });
  }

  const tagParity = exifTagParity(orientationTag);
  if (tagParity === 'unknown') {
    return Object.freeze({
      tagParity,
      encodedToDecodedAppliedParity: 'unknown' as const,
      decodedRelativeToIntendedDisplayParity:
        'unknown' as const,
    });
  }

  if (application === 'applied_by_decode_before_receipt') {
    return Object.freeze({
      tagParity,
      encodedToDecodedAppliedParity: tagParity,
      decodedRelativeToIntendedDisplayParity:
        'orientation_preserving' as const,
    });
  }

  return Object.freeze({
    tagParity,
    encodedToDecodedAppliedParity:
      'orientation_preserving' as const,
    decodedRelativeToIntendedDisplayParity: tagParity,
  });
}

export interface NeutralEarFrameTransformParityFR104V1 {
  readonly schemaVersion:
    'fr104-neutral-ear-frame-transform-parity-v1';
  readonly authorityState:
    'transform_reflection_parity_only_no_anatomical_mapping';
  readonly exif: {
    readonly orientationTag:
      NeutralEarExifOrientationTagFR104V1 | null;
    readonly application: NeutralEarExifApplicationFR104V1;
    readonly tagReflectionParity:
      NeutralEarReflectionParityFR104V1;
    readonly encodedToDecodedAppliedParity:
      NeutralEarReflectionParityFR104V1;
    readonly decodedRelativeToIntendedDisplayParity:
      NeutralEarReflectionParityFR104V1;
  };
  readonly explicitPostDecodeTransform: {
    readonly rotationDegrees: 0 | 90 | 180 | 270;
    readonly horizontalMirrorApplied: boolean;
    readonly rotationChangesReflectionParity: false;
    readonly reflectionParity:
      Exclude<NeutralEarReflectionParityFR104V1, 'unknown'>;
  };
  readonly consumerFrame: {
    readonly netReflectionParityRelativeToIntendedDisplay:
      NeutralEarReflectionParityFR104V1;
    readonly parityResolved: boolean;
  };
  readonly authority: {
    readonly anatomicalLateralityAuthorized: false;
    readonly validatedExternalEarObservationAuthorized: false;
    readonly traditionalBindingAuthorized: false;
    readonly productionAuthorization: false;
  };
}

export function deriveNeutralEarFrameTransformParityFR104(
  receipt: NeutralEarCaptureTransformReceiptFR104V1,
): NeutralEarFrameTransformParityFR104V1 {
  const exif = deriveExifParity(
    receipt.exif.orientationTag,
    receipt.exif.application,
  );
  const explicit = explicitMirrorParity(
    receipt.explicitPostDecodeTransform.horizontalMirrorApplied,
  );
  const net = xorParity(
    exif.decodedRelativeToIntendedDisplayParity,
    explicit,
  );

  return Object.freeze({
    schemaVersion:
      'fr104-neutral-ear-frame-transform-parity-v1' as const,
    authorityState:
      'transform_reflection_parity_only_no_anatomical_mapping' as const,
    exif: Object.freeze({
      orientationTag: receipt.exif.orientationTag,
      application: receipt.exif.application,
      tagReflectionParity: exif.tagParity,
      encodedToDecodedAppliedParity:
        exif.encodedToDecodedAppliedParity,
      decodedRelativeToIntendedDisplayParity:
        exif.decodedRelativeToIntendedDisplayParity,
    }),
    explicitPostDecodeTransform: Object.freeze({
      rotationDegrees:
        receipt.explicitPostDecodeTransform.rotationDegrees,
      horizontalMirrorApplied:
        receipt.explicitPostDecodeTransform.horizontalMirrorApplied,
      rotationChangesReflectionParity: false as const,
      reflectionParity: explicit,
    }),
    consumerFrame: Object.freeze({
      netReflectionParityRelativeToIntendedDisplay: net,
      parityResolved: net !== 'unknown',
    }),
    authority: Object.freeze({
      anatomicalLateralityAuthorized: false as const,
      validatedExternalEarObservationAuthorized:
        false as const,
      traditionalBindingAuthorized: false as const,
      productionAuthorization: false as const,
    }),
  });
}
