import { describe, expect, it } from 'vitest';
import { FaceAuthorityValidationError } from './validation.js';
import {
  admitNeutralEarProviderRotationDependenceResultFR104,
} from './neutral-ear-makehuman-provider-rotation-result-intake-fr104.js';
import {
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_EMPIRICAL_DECISION_FR104,
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_EMPIRICAL_EVIDENCE_FR104,
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_EMPIRICAL_SOURCE_FR104,
} from './neutral-ear-makehuman-provider-rotation-empirical-evidence-fr104.js';

describe('FR104 U3.1 provider rotation empirical evidence', () => {
  it('admits exact-fixture provider rotation dependence without anatomy', () => {
    const evidence =
      NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_EMPIRICAL_EVIDENCE_FR104;

    expect(evidence.summary).toEqual({
      state: 'exact_fixture_rotation_dependence_observed',
      providerRotationEquivarianceRefutedForExactFixture: true,
      crossLabelCaseIds: ['R180'],
      nativeUnavailableControlRecoveredCaseIds: [
        'R270',
        'M180',
        'M270',
      ],
      anatomicalInterpretationUsed: false,
      detectorStageFailureClaimed: false,
      anatomicalMappingReviewOutcome: 'hold',
    });
    expect(
      evidence.authority.providerRotationDependenceInvestigated,
    ).toBe(true);
    expect(
      evidence.authority
        .providerRotationEquivarianceRefutedForExactFixture,
    ).toBe(true);
    expect(evidence.authority.providerLabelMappedToAnatomicalSide)
      .toBe(false);
    expect(evidence.authority.anatomicalLateralityAuthorized)
      .toBe(false);
    expect(evidence.authority.productionAuthorization)
      .toBe(false);
  });

  it('records R180 provider-only cross-label behavior and recovered unavailable controls', () => {
    const decision =
      NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_EMPIRICAL_DECISION_FR104;

    expect(decision.observed.providerCrossLabelCaseIds)
      .toEqual(['R180']);
    expect(
      decision.observed
        .nativeUnavailableControlRecoveredCaseIds,
    ).toEqual(['R270', 'M180', 'M270']);
    expect(decision.observed.r180).toEqual({
      sameLabelCost: 0.34978736535134813,
      crossLabelCost: 0.025722610815087955,
      relation: 'provider_cross_label_closer',
    });
    expect(
      decision.interpretation
        .anatomyRequiredForObservedRotationDependence,
    ).toBe(false);
    expect(
      decision.interpretation.detectorStageFailureClaimed,
    ).toBe(false);
    expect(
      decision.interpretation.anatomicalMappingReviewOutcome,
    ).toBe('hold');
    expect(
      decision.interpretation
        .providerSideRotationCompensationAuditRequired,
    ).toBe(true);
  });

  it('rejects semantic authority promotion in copied empirical evidence', () => {
    const mutated = structuredClone(
      NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_EMPIRICAL_SOURCE_FR104,
    ) as unknown as Record<string, unknown>;
    const authority =
      mutated.authority as Record<string, unknown>;
    authority.providerLabelMappedToAnatomicalSide = true;

    expect(() =>
      admitNeutralEarProviderRotationDependenceResultFR104(
        mutated,
      ),
    ).toThrow(FaceAuthorityValidationError);
  });
});
