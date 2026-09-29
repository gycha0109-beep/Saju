import { describe, expect, it } from 'vitest';
import { FaceAuthorityValidationError } from './validation.js';
import {
  admitNeutralEarProviderRotationCompensationResultFR104,
} from './neutral-ear-makehuman-provider-rotation-compensation-result-intake-fr104.js';
import {
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_COMPENSATION_FR104,
} from './neutral-ear-makehuman-provider-rotation-compensation-fr104.js';

const protocol =
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_COMPENSATION_FR104;

function syntheticResult() {
  const relations = {
    R0: 'provider_same_label_closer',
    R90: 'provider_same_label_closer',
    R180: 'provider_cross_label_closer',
    R270: 'provider_cross_label_closer',
    M0: 'provider_same_label_closer',
    M90: 'provider_cross_label_closer',
    M180: 'provider_cross_label_closer',
    M270: 'provider_cross_label_closer',
  } as const;
  const recovered = new Set(['R270', 'M180', 'M270']);

  return {
    schemaVersion:
      'fr104-provider-rotation-compensation-result-v1',
    authorityState:
      'bounded_provider_rotation_compensation_candidate_no_anatomical_mapping',
    fixture: {
      pngSha256: protocol.fixture.pngSha256,
      canonicalRgbaSha256:
        protocol.fixture.canonicalRgbaSha256,
    },
    apiBehavioralProbes: {
      zeroDegreesVsUndefined: {
        R0: { exactProviderResultEqual: true },
        M0: { exactProviderResultEqual: true },
      },
      signedEquivalent: {
        signedDegreesThrows: false,
        exactProviderResultEqual: false,
        canonicalRepresentation:
          'positive_0_90_180_270_only',
      },
      invalidRotation: {
        throws: true,
        resultProduced: false,
      },
    },
    cases: protocol.cases.map((item) => ({
      id: item.id,
      nativeRgbaSha256: item.nativeRgbaSha256,
      compensated: {
        providerEligibilityState:
          'exact_one_face_478_landmarks_observed',
        faceCount: 1,
        landmarkCount: 478,
        comparison: {
          relation: relations[item.id],
          numericAcceptanceThresholdApplied: false,
        },
      },
      effect: {
        availabilityRecovered: recovered.has(item.id),
        crossLabelResolved:
          item.id === 'R180' ? false : null,
      },
    })),
    summary: {
      state:
        'provider_rotation_compensation_partially_effective',
      availabilityRecoveredCaseIds: [
        'R270',
        'M180',
        'M270',
      ],
      sameLabelCompensatedCaseIds: [
        'R0',
        'R90',
        'M0',
      ],
      crossLabelCompensatedCaseIds: [
        'R180',
        'R270',
        'M90',
        'M180',
        'M270',
      ],
      r180CrossLabelResolved: false,
      anatomicalMappingReviewOutcome: 'hold',
    },
    authority: {
      providerRotationCompensationSemanticsAudited: false,
      providerRotationCompensationEffectiveForExactFixture: false,
      canonicalProviderOrientationNormalizationAvailable: false,
      providerLabelMappedToAnatomicalSide: false,
      globalProviderAnatomicalSemanticsEstablished: false,
      anatomicalReferenceAdmitted: false,
      anatomicalLateralityAuthorized: false,
      validatedExternalEarObservationAuthorized: false,
      traditionalBindingAuthorized: false,
      productionAuthorization: false,
    },
  };
}

describe('FR104 U3.2 provider rotation compensation intake', () => {
  it('admits partial availability recovery without coordinate canonicalization', () => {
    const evidence =
      admitNeutralEarProviderRotationCompensationResultFR104(
        syntheticResult(),
      );

    expect(evidence.state).toBe(
      'provider_rotation_compensation_partially_effective',
    );
    expect(evidence.availabilityRecoveredCaseIds).toEqual([
      'R270',
      'M180',
      'M270',
    ]);
    expect(evidence.crossLabelCompensatedCaseIds).toEqual([
      'R180',
      'R270',
      'M90',
      'M180',
      'M270',
    ]);
    expect(
      evidence.interpretation
        .providerAvailabilityRecoveryObserved,
    ).toBe(true);
    expect(
      evidence.interpretation
        .providerCoordinateCanonicalizationEstablished,
    ).toBe(false);
  });

  it('keeps U4 and production authority closed', () => {
    const evidence =
      admitNeutralEarProviderRotationCompensationResultFR104(
        syntheticResult(),
      );

    expect(
      evidence.authority
        .providerRotationCompensationSemanticsAudited,
    ).toBe(true);
    expect(
      evidence.authority
        .providerRotationCompensationEffectiveForExactFixture,
    ).toBe(false);
    expect(
      evidence.authority
        .canonicalProviderOrientationNormalizationAvailable,
    ).toBe(false);
    expect(evidence.authority.anatomicalLateralityAuthorized)
      .toBe(false);
    expect(evidence.authority.productionAuthorization)
      .toBe(false);
  });

  it('rejects unauthorized anatomical promotion', () => {
    const mutated =
      structuredClone(syntheticResult()) as Record<string, unknown>;
    const authority =
      mutated.authority as Record<string, unknown>;
    authority.anatomicalLateralityAuthorized = true;

    expect(() =>
      admitNeutralEarProviderRotationCompensationResultFR104(
        mutated,
      ),
    ).toThrow(FaceAuthorityValidationError);
  });
});
