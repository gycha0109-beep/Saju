import { describe, expect, it } from 'vitest';
import {
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_COMPENSATION_EMPIRICAL_EVIDENCE_FR104,
} from './neutral-ear-makehuman-provider-rotation-compensation-empirical-evidence-fr104.js';

describe('FR104 U3.2 provider rotation compensation evidence', () => {
  it('pins the full empirical result digest and partial-effect state', () => {
    const evidence =
      NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_COMPENSATION_EMPIRICAL_EVIDENCE_FR104;

    expect(evidence.resultSha256).toBe(
      '9b278cf355ec497f5978ce3ae22f5cf94a84bc0ce94908990157e04322a14a0c',
    );
    expect(evidence.summary.state).toBe(
      'provider_rotation_compensation_partially_effective',
    );
    expect(evidence.summary.availabilityRecoveredCaseIds)
      .toEqual(['R270','M180','M270']);
    expect(evidence.summary.crossLabelCompensatedCaseIds)
      .toEqual(['R180','R270','M90','M180','M270']);
  });

  it('records availability recovery but rejects coordinate canonicalization', () => {
    const interpretation =
      NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_COMPENSATION_EMPIRICAL_EVIDENCE_FR104
        .interpretation;

    expect(
      interpretation.providerAvailabilityRecoveryObserved,
    ).toBe(true);
    expect(
      interpretation.providerCoordinateCanonicalizationEstablished,
    ).toBe(false);
    expect(
      interpretation.providerRotationCompensationEffectiveForExactFixture,
    ).toBe(false);
    expect(
      interpretation.canonicalProviderOrientationNormalizationAvailable,
    ).toBe(false);
    expect(interpretation.anatomicalMappingReviewOutcome)
      .toBe('hold');
  });

  it('keeps anatomical/traditional/production authority closed', () => {
    const authority =
      NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_COMPENSATION_EMPIRICAL_EVIDENCE_FR104
        .authority;

    expect(authority.providerLabelMappedToAnatomicalSide)
      .toBe(false);
    expect(authority.anatomicalLateralityAuthorized)
      .toBe(false);
    expect(authority.traditionalBindingAuthorized).toBe(false);
    expect(authority.productionAuthorization).toBe(false);
  });
});
