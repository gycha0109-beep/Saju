import { describe, expect, it } from 'vitest';
import {
  classifyNeutralEarProviderLabelRelationFR104,
  inverseNeutralEarProviderRotationDegreesFR104,
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_DEPENDENCE_FR104,
  rotateNeutralEarProviderPointFR104,
} from './neutral-ear-makehuman-provider-rotation-dependence-fr104.js';

describe('FR104 U3.1 provider rotation dependence protocol', () => {
  it('freezes two mirror families with exact U3 baselines', () => {
    const protocol =
      NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_DEPENDENCE_FR104;

    expect(protocol.cases).toHaveLength(8);
    expect(protocol.familyBaselines.non_mirrored.caseId)
      .toBe('R0');
    expect(protocol.familyBaselines.mirrored.caseId)
      .toBe('M0');
    expect(protocol.familyBaselines.non_mirrored.rgbaSha256)
      .toBe(
        'fce638e1b435e4d7cf2ba9e8d33b9bbadcd651a70e423a3056f229bcc4298364',
      );
    expect(protocol.familyBaselines.mirrored.rgbaSha256)
      .toBe(
        '5f3b92f9a50d5913d5ba97ff9c5edf9d14e10bdd8a6f8be526cccb32b5f0c0d8',
      );
  });

  it('defines exact inverse rotations', () => {
    expect(inverseNeutralEarProviderRotationDegreesFR104(0))
      .toBe(0);
    expect(inverseNeutralEarProviderRotationDegreesFR104(90))
      .toBe(270);
    expect(inverseNeutralEarProviderRotationDegreesFR104(180))
      .toBe(180);
    expect(inverseNeutralEarProviderRotationDegreesFR104(270))
      .toBe(90);
  });

  it('round-trips normalized points for every cardinal rotation', () => {
    const point = { x: 0.37, y: 0.61 };
    for (const degrees of [0, 90, 180, 270] as const) {
      const rotated =
        rotateNeutralEarProviderPointFR104(point, degrees);
      const recovered =
        rotateNeutralEarProviderPointFR104(
          rotated,
          inverseNeutralEarProviderRotationDegreesFR104(degrees),
        );
      expect(recovered.x).toBeCloseTo(point.x, 15);
      expect(recovered.y).toBeCloseTo(point.y, 15);
    }
  });

  it('classifies same/cross label costs without a numeric threshold', () => {
    expect(
      classifyNeutralEarProviderLabelRelationFR104(0.1, 0.4),
    ).toBe('provider_same_label_closer');
    expect(
      classifyNeutralEarProviderLabelRelationFR104(0.4, 0.1),
    ).toBe('provider_cross_label_closer');
    expect(
      classifyNeutralEarProviderLabelRelationFR104(0.2, 0.2),
    ).toBe('equal_or_unresolved');
    expect(
      NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_DEPENDENCE_FR104
        .comparison.numericAcceptanceThresholdAuthorized,
    ).toBe(false);
  });

  it('forbids anatomical interpretation and keeps authority closed', () => {
    const protocol =
      NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_DEPENDENCE_FR104;

    expect(
      protocol.interpretationBoundary.anatomicalGroundTruthUsed,
    ).toBe(false);
    expect(
      protocol.interpretationBoundary.anatomicalSideSemanticsUsed,
    ).toBe(false);
    expect(
      protocol.interpretationBoundary.detectorStageFailureMayBeClaimed,
    ).toBe(false);
    expect(
      protocol.authority.providerRotationDependenceInvestigated,
    ).toBe(false);
    expect(
      protocol.authority
        .providerRotationEquivarianceRefutedForExactFixture,
    ).toBe(false);
    expect(protocol.authority.anatomicalLateralityAuthorized)
      .toBe(false);
    expect(protocol.authority.productionAuthorization).toBe(false);
  });
});
