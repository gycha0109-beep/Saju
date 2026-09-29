import { describe, expect, it } from 'vitest';
import {
  expectedNeutralEarMakeHumanRelationFR104,
  NEUTRAL_EAR_MAKEHUMAN_TRANSFORM_DIAGNOSTICS_FR104,
  transformNeutralEarMakeHumanPointFR104,
} from './neutral-ear-makehuman-transform-diagnostics-fr104.js';

describe('FR104 U3 MakeHuman controlled transform diagnostics', () => {
  it('pre-registers four preserving and four reversing cases', () => {
    const protocol =
      NEUTRAL_EAR_MAKEHUMAN_TRANSFORM_DIAGNOSTICS_FR104;

    expect(protocol.cases).toHaveLength(8);
    expect(
      protocol.cases.filter(
        (item) =>
          item.reflectionParity === 'orientation_preserving',
      ),
    ).toHaveLength(4);
    expect(
      protocol.cases.filter(
        (item) =>
          item.reflectionParity === 'orientation_reversing',
      ),
    ).toHaveLength(4);

    for (const item of protocol.cases) {
      expect(item.expectedRelationHypothesis).toBe(
        expectedNeutralEarMakeHumanRelationFR104(
          item.reflectionParity,
        ),
      );
    }
  });

  it('applies mirror before clockwise rotation without changing anatomical identity', () => {
    const left =
      NEUTRAL_EAR_MAKEHUMAN_TRANSFORM_DIAGNOSTICS_FR104
        .independentAnatomicalGroundTruth.anatomicalLeftEye;

    expect(
      transformNeutralEarMakeHumanPointFR104(left, {
        horizontalMirror: false,
        clockwiseRotationDegrees: 0,
      }),
    ).toEqual(left);

    expect(
      transformNeutralEarMakeHumanPointFR104(left, {
        horizontalMirror: true,
        clockwiseRotationDegrees: 0,
      }),
    ).toEqual({
      x: 1 - left.x,
      y: left.y,
    });

    expect(
      transformNeutralEarMakeHumanPointFR104(left, {
        horizontalMirror: false,
        clockwiseRotationDegrees: 90,
      }),
    ).toEqual({
      x: 1 - left.y,
      y: left.x,
    });

    expect(
      transformNeutralEarMakeHumanPointFR104(left, {
        horizontalMirror: true,
        clockwiseRotationDegrees: 90,
      }),
    ).toEqual({
      x: 1 - left.y,
      y: 1 - left.x,
    });
  });

  it('pins R0 to the admitted U2 exact scalar control', () => {
    const baseline =
      NEUTRAL_EAR_MAKEHUMAN_TRANSFORM_DIAGNOSTICS_FR104
        .baselineControl;

    expect(baseline.providerLeft).toEqual({
      x: 0.5904278568923473,
      y: 0.512873537838459,
    });
    expect(baseline.providerRight).toEqual({
      x: 0.4134050067514181,
      y: 0.5108402445912361,
    });
    expect(baseline.directCost)
      .toBe(0.02456967216060714);
    expect(baseline.swappedCost)
      .toBe(0.35972525227214214);
    expect(baseline.relation)
      .toBe('direct_assignment_closer');
    expect(baseline.exactScalarMatchRequired).toBe(true);
  });

  it('keeps all anatomical and traditional authority closed', () => {
    const authority =
      NEUTRAL_EAR_MAKEHUMAN_TRANSFORM_DIAGNOSTICS_FR104
        .authority;

    expect(
      authority.exactMakeHumanFixtureTransformDiagnosticsExecuted,
    ).toBe(false);
    expect(
      authority.parityConditionedAssignmentPatternObserved,
    ).toBe(false);
    expect(authority.providerLabelMappedToAnatomicalSide)
      .toBe(false);
    expect(authority.globalProviderAnatomicalSemanticsEstablished)
      .toBe(false);
    expect(authority.anatomicalReferenceAdmitted).toBe(false);
    expect(authority.anatomicalLateralityAuthorized).toBe(false);
    expect(authority.validatedExternalEarObservationAuthorized)
      .toBe(false);
    expect(authority.traditionalBindingAuthorized).toBe(false);
    expect(authority.productionAuthorization).toBe(false);
  });
});
