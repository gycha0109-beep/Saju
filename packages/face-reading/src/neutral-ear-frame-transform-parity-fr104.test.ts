import { describe, expect, it } from 'vitest';
import {
  issueNeutralEarCaptureTransformReceiptFR104,
} from './neutral-ear-capture-transform-provenance-receipt-fr104.js';
import {
  deriveNeutralEarFrameTransformParityFR104,
  NEUTRAL_EAR_EXIF_ORIENTATION_REFLECTION_PARITY_FR104,
} from './neutral-ear-frame-transform-parity-fr104.js';

function receipt(input: {
  orientationTag: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | null;
  application:
    | 'not_present'
    | 'applied_by_decode_before_receipt'
    | 'preserved_unapplied_at_receipt'
    | 'unknown';
  rotationDegrees?: 0 | 90 | 180 | 270;
  horizontalMirrorApplied?: boolean;
}) {
  const rotationDegrees = input.rotationDegrees ?? 0;
  const swap = rotationDegrees === 90 || rotationDegrees === 270;
  return issueNeutralEarCaptureTransformReceiptFR104({
    schemaVersion:
      'fr104-neutral-ear-capture-transform-receipt-input-v1',
    decodedFrame: { width: 640, height: 480 },
    exif: {
      orientationTag: input.orientationTag,
      application: input.application,
    },
    explicitPostDecodeTransform: {
      rotationDegrees,
      horizontalMirrorApplied:
        input.horizontalMirrorApplied ?? false,
    },
    consumerFrame: swap
      ? { width: 480, height: 640 }
      : { width: 640, height: 480 },
  });
}

describe('FR104 frame transform reflection parity', () => {
  it('pins the orientation-tag reflection classes from the governed witness', () => {
    expect(
      NEUTRAL_EAR_EXIF_ORIENTATION_REFLECTION_PARITY_FR104,
    ).toEqual({
      1: 'orientation_preserving',
      2: 'orientation_reversing',
      3: 'orientation_preserving',
      4: 'orientation_reversing',
      5: 'orientation_reversing',
      6: 'orientation_preserving',
      7: 'orientation_reversing',
      8: 'orientation_preserving',
    });
  });

  it.each([
    1, 3, 6, 8,
  ] as const)(
    'treats unapplied EXIF orientation %s as preserving relative to intended display',
    (orientationTag) => {
      const result =
        deriveNeutralEarFrameTransformParityFR104(
          receipt({
            orientationTag,
            application:
              'preserved_unapplied_at_receipt',
          }),
        );
      expect(
        result.consumerFrame
          .netReflectionParityRelativeToIntendedDisplay,
      ).toBe('orientation_preserving');
    },
  );

  it.each([
    2, 4, 5, 7,
  ] as const)(
    'treats unapplied EXIF orientation %s as reflection-reversing relative to intended display',
    (orientationTag) => {
      const result =
        deriveNeutralEarFrameTransformParityFR104(
          receipt({
            orientationTag,
            application:
              'preserved_unapplied_at_receipt',
          }),
        );
      expect(
        result.consumerFrame
          .netReflectionParityRelativeToIntendedDisplay,
      ).toBe('orientation_reversing');
    },
  );

  it('treats correctly applied EXIF as display-normalized before explicit transforms', () => {
    const result =
      deriveNeutralEarFrameTransformParityFR104(
        receipt({
          orientationTag: 2,
          application:
            'applied_by_decode_before_receipt',
        }),
      );

    expect(
      result.exif.encodedToDecodedAppliedParity,
    ).toBe('orientation_reversing');
    expect(
      result.exif.decodedRelativeToIntendedDisplayParity,
    ).toBe('orientation_preserving');
    expect(
      result.consumerFrame
        .netReflectionParityRelativeToIntendedDisplay,
    ).toBe('orientation_preserving');
  });

  it('toggles parity for one explicit horizontal mirror', () => {
    const result =
      deriveNeutralEarFrameTransformParityFR104(
        receipt({
          orientationTag: 1,
          application:
            'applied_by_decode_before_receipt',
          horizontalMirrorApplied: true,
        }),
      );

    expect(
      result.consumerFrame
        .netReflectionParityRelativeToIntendedDisplay,
    ).toBe('orientation_reversing');
  });

  it.each([0, 90, 180, 270] as const)(
    'does not treat rotation %s as a reflection',
    (rotationDegrees) => {
      const result =
        deriveNeutralEarFrameTransformParityFR104(
          receipt({
            orientationTag: 1,
            application:
              'applied_by_decode_before_receipt',
            rotationDegrees,
          }),
        );

      expect(
        result.explicitPostDecodeTransform
          .rotationChangesReflectionParity,
      ).toBe(false);
      expect(
        result.consumerFrame
          .netReflectionParityRelativeToIntendedDisplay,
      ).toBe('orientation_preserving');
    },
  );

  it('fails closed when EXIF application is unknown', () => {
    const result =
      deriveNeutralEarFrameTransformParityFR104(
        receipt({
          orientationTag: 2,
          application: 'unknown',
        }),
      );

    expect(
      result.consumerFrame
        .netReflectionParityRelativeToIntendedDisplay,
    ).toBe('unknown');
    expect(result.consumerFrame.parityResolved)
      .toBe(false);
    expect(result.authority.anatomicalLateralityAuthorized)
      .toBe(false);
  });
});
