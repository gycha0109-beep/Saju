import { describe, expect, it } from 'vitest';
import {
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_COMPENSATION_FR104,
} from './neutral-ear-makehuman-provider-rotation-compensation-fr104.js';

describe('FR104 U3.2B provider rotation compensation protocol', () => {
  it('reuses exact U3.1 native bytes and pre-registers inverse hints', () => {
    const protocol =
      NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_COMPENSATION_FR104;

    expect(protocol.cases).toHaveLength(8);
    expect(
      protocol.cases.map(
        (item) => [
          item.id,
          item.physicalClockwiseRotationDegrees,
          item.compensationDegrees,
        ],
      ),
    ).toEqual([
      ['R0', 0, 0],
      ['R90', 90, 270],
      ['R180', 180, 180],
      ['R270', 270, 90],
      ['M0', 0, 0],
      ['M90', 90, 270],
      ['M180', 180, 180],
      ['M270', 270, 90],
    ]);
  });

  it('compares compensated output directly to provider family baselines', () => {
    const comparison =
      NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_COMPENSATION_FR104
        .comparison;

    expect(
      comparison.compensatedCoordinatesComparedDirectlyToFamilyBaseline,
    ).toBe(true);
    expect(
      comparison.additionalCoordinateRotationAppliedAfterProviderCompensation,
    ).toBe(false);
    expect(comparison.numericAcceptanceThresholdAuthorized)
      .toBe(false);
  });

  it('pre-registers zero, signed, invalid, and opposite controls', () => {
    const controls =
      NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_COMPENSATION_FR104
        .sideControls;

    expect(controls.zeroDegreesVsUndefined).toEqual([
      'R0',
      'M0',
    ]);
    expect(controls.signedEquivalent).toEqual({
      caseId: 'R90',
      positiveDegrees: 270,
      signedDegrees: -90,
    });
    expect(controls.invalidRotation).toEqual({
      caseId: 'R0',
      degrees: 45,
    });
    expect(controls.oppositeDirection).toEqual({
      caseId: 'R90',
      correctDegrees: 270,
      oppositeDegrees: 90,
    });
  });

  it('keeps anatomical/traditional/production authority closed', () => {
    const authority =
      NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_COMPENSATION_FR104
        .authority;

    expect(
      authority.providerRotationCompensationSemanticsAudited,
    ).toBe(false);
    expect(
      authority.providerRotationCompensationEffectiveForExactFixture,
    ).toBe(false);
    expect(
      authority.canonicalProviderOrientationNormalizationAvailable,
    ).toBe(false);
    expect(authority.providerLabelMappedToAnatomicalSide)
      .toBe(false);
    expect(authority.anatomicalLateralityAuthorized).toBe(false);
    expect(authority.traditionalBindingAuthorized).toBe(false);
    expect(authority.productionAuthorization).toBe(false);
  });
});
