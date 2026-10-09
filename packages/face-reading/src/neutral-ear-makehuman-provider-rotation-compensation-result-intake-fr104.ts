import {
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_COMPENSATION_FR104,
} from './neutral-ear-makehuman-provider-rotation-compensation-fr104.js';
import { FaceAuthorityValidationError } from './validation.js';

export type NeutralEarProviderRotationCompensationEvidenceFR104V1 =
  Readonly<{
    schemaVersion:
      'fr104-provider-rotation-compensation-evidence-v1';
    authorityState:
      'partial_availability_recovery_without_coordinate_canonicalization';
    state:
      'provider_rotation_compensation_partially_effective';
    availabilityRecoveredCaseIds:
      readonly ['R270', 'M180', 'M270'];
    sameLabelCompensatedCaseIds:
      readonly ['R0', 'R90', 'M0'];
    crossLabelCompensatedCaseIds:
      readonly ['R180', 'R270', 'M90', 'M180', 'M270'];
    r180CrossLabelResolved: false;
    interpretation: Readonly<{
      providerAvailabilityRecoveryObserved: true;
      providerCoordinateCanonicalizationEstablished: false;
      anatomicalMappingReviewOutcome: 'hold';
    }>;
    authority: Readonly<{
      providerRotationCompensationSemanticsAudited: true;
      providerRotationCompensationEffectiveForExactFixture: false;
      canonicalProviderOrientationNormalizationAvailable: false;
      providerLabelMappedToAnatomicalSide: false;
      anatomicalLateralityAuthorized: false;
      traditionalBindingAuthorized: false;
      productionAuthorization: false;
    }>;
  }>;

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-104 provider rotation compensation ${message}`,
  );
}
function object(
  value: unknown,
  label: string,
): Record<string, unknown> {
  if (
    typeof value !== 'object'
    || value === null
    || Array.isArray(value)
  ) {
    fail(`${label} must be an object.`);
  }
  return value as Record<string, unknown>;
}
function exact(
  actual: unknown,
  expected: string | number | boolean | null,
  label: string,
): void {
  if (!Object.is(actual, expected)) {
    fail(`${label} must equal the governed value.`);
  }
}

export function admitNeutralEarProviderRotationCompensationResultFR104(
  input: unknown,
): NeutralEarProviderRotationCompensationEvidenceFR104V1 {
  const root = object(input, 'result');
  const protocol =
    NEUTRAL_EAR_MAKEHUMAN_PROVIDER_ROTATION_COMPENSATION_FR104;

  exact(
    root.schemaVersion,
    'fr104-provider-rotation-compensation-result-v1',
    'schemaVersion',
  );
  exact(
    root.authorityState,
    'bounded_provider_rotation_compensation_candidate_no_anatomical_mapping',
    'authorityState',
  );

  const fixture = object(root.fixture, 'fixture');
  exact(
    fixture.pngSha256,
    protocol.fixture.pngSha256,
    'fixture.pngSha256',
  );
  exact(
    fixture.canonicalRgbaSha256,
    protocol.fixture.canonicalRgbaSha256,
    'fixture.canonicalRgbaSha256',
  );

  const probes = object(
    root.apiBehavioralProbes,
    'apiBehavioralProbes',
  );
  const zero = object(
    probes.zeroDegreesVsUndefined,
    'zeroDegreesVsUndefined',
  );
  for (const id of ['R0', 'M0'] as const) {
    const item = object(zero[id], `zero.${id}`);
    exact(
      item.exactProviderResultEqual,
      true,
      `zero.${id}.exactProviderResultEqual`,
    );
  }
  const signed = object(
    probes.signedEquivalent,
    'signedEquivalent',
  );
  exact(
    signed.signedDegreesThrows,
    false,
    'signedEquivalent.signedDegreesThrows',
  );
  exact(
    signed.exactProviderResultEqual,
    false,
    'signedEquivalent.exactProviderResultEqual',
  );
  exact(
    signed.canonicalRepresentation,
    'positive_0_90_180_270_only',
    'signedEquivalent.canonicalRepresentation',
  );
  const invalid = object(
    probes.invalidRotation,
    'invalidRotation',
  );
  exact(invalid.throws, true, 'invalidRotation.throws');
  exact(
    invalid.resultProduced,
    false,
    'invalidRotation.resultProduced',
  );

  if (!Array.isArray(root.cases) || root.cases.length !== 8) {
    fail('cases must contain exactly eight entries.');
  }

  const expectedRelations = Object.freeze({
    R0: 'provider_same_label_closer',
    R90: 'provider_same_label_closer',
    R180: 'provider_cross_label_closer',
    R270: 'provider_cross_label_closer',
    M0: 'provider_same_label_closer',
    M90: 'provider_cross_label_closer',
    M180: 'provider_cross_label_closer',
    M270: 'provider_cross_label_closer',
  });
  const recovered = new Set(['R270', 'M180', 'M270']);

  for (const [index, expected] of protocol.cases.entries()) {
    const item = object(root.cases[index], `cases[${index}]`);
    exact(item.id, expected.id, `${expected.id}.id`);
    exact(
      item.nativeRgbaSha256,
      expected.nativeRgbaSha256,
      `${expected.id}.nativeRgbaSha256`,
    );

    const compensated = object(
      item.compensated,
      `${expected.id}.compensated`,
    );
    exact(
      compensated.providerEligibilityState,
      'exact_one_face_478_landmarks_observed',
      `${expected.id}.compensated.providerEligibilityState`,
    );
    exact(
      compensated.faceCount,
      1,
      `${expected.id}.compensated.faceCount`,
    );
    exact(
      compensated.landmarkCount,
      478,
      `${expected.id}.compensated.landmarkCount`,
    );
    const comparison = object(
      compensated.comparison,
      `${expected.id}.comparison`,
    );
    exact(
      comparison.relation,
      expectedRelations[expected.id],
      `${expected.id}.comparison.relation`,
    );
    exact(
      comparison.numericAcceptanceThresholdApplied,
      false,
      `${expected.id}.numericAcceptanceThresholdApplied`,
    );

    const effect = object(
      item.effect,
      `${expected.id}.effect`,
    );
    exact(
      effect.availabilityRecovered,
      recovered.has(expected.id),
      `${expected.id}.availabilityRecovered`,
    );
    if (expected.id === 'R180') {
      exact(
        effect.crossLabelResolved,
        false,
        'R180.crossLabelResolved',
      );
    }
  }

  const summary = object(root.summary, 'summary');
  exact(
    summary.state,
    'provider_rotation_compensation_partially_effective',
    'summary.state',
  );
  if (
    JSON.stringify(summary.availabilityRecoveredCaseIds)
      !== JSON.stringify(['R270', 'M180', 'M270'])
  ) {
    fail('summary.availabilityRecoveredCaseIds mismatch.');
  }
  if (
    JSON.stringify(summary.sameLabelCompensatedCaseIds)
      !== JSON.stringify(['R0', 'R90', 'M0'])
  ) {
    fail('summary.sameLabelCompensatedCaseIds mismatch.');
  }
  if (
    JSON.stringify(summary.crossLabelCompensatedCaseIds)
      !== JSON.stringify([
        'R180',
        'R270',
        'M90',
        'M180',
        'M270',
      ])
  ) {
    fail('summary.crossLabelCompensatedCaseIds mismatch.');
  }
  exact(
    summary.r180CrossLabelResolved,
    false,
    'summary.r180CrossLabelResolved',
  );
  exact(
    summary.anatomicalMappingReviewOutcome,
    'hold',
    'summary.anatomicalMappingReviewOutcome',
  );

  const sourceAuthority = object(root.authority, 'authority');
  for (const key of [
    'providerRotationCompensationSemanticsAudited',
    'providerRotationCompensationEffectiveForExactFixture',
    'canonicalProviderOrientationNormalizationAvailable',
    'providerLabelMappedToAnatomicalSide',
    'globalProviderAnatomicalSemanticsEstablished',
    'anatomicalReferenceAdmitted',
    'anatomicalLateralityAuthorized',
    'validatedExternalEarObservationAuthorized',
    'traditionalBindingAuthorized',
    'productionAuthorization',
  ] as const) {
    exact(sourceAuthority[key], false, `authority.${key}`);
  }

  return Object.freeze({
    schemaVersion:
      'fr104-provider-rotation-compensation-evidence-v1' as const,
    authorityState:
      'partial_availability_recovery_without_coordinate_canonicalization' as const,
    state:
      'provider_rotation_compensation_partially_effective' as const,
    availabilityRecoveredCaseIds:
      Object.freeze(['R270', 'M180', 'M270'] as const),
    sameLabelCompensatedCaseIds:
      Object.freeze(['R0', 'R90', 'M0'] as const),
    crossLabelCompensatedCaseIds:
      Object.freeze([
        'R180',
        'R270',
        'M90',
        'M180',
        'M270',
      ] as const),
    r180CrossLabelResolved: false as const,
    interpretation: Object.freeze({
      providerAvailabilityRecoveryObserved: true as const,
      providerCoordinateCanonicalizationEstablished:
        false as const,
      anatomicalMappingReviewOutcome: 'hold' as const,
    }),
    authority: Object.freeze({
      providerRotationCompensationSemanticsAudited:
        true as const,
      providerRotationCompensationEffectiveForExactFixture:
        false as const,
      canonicalProviderOrientationNormalizationAvailable:
        false as const,
      providerLabelMappedToAnatomicalSide: false as const,
      anatomicalLateralityAuthorized: false as const,
      traditionalBindingAuthorized: false as const,
      productionAuthorization: false as const,
    }),
  });
}
