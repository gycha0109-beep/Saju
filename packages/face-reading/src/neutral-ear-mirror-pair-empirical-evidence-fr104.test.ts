import { describe, expect, it } from 'vitest';
import {
  NEUTRAL_EAR_MIRROR_PAIR_EMPIRICAL_DECISION_FR104,
  NEUTRAL_EAR_MIRROR_PAIR_EMPIRICAL_EVIDENCE_FR104,
  NEUTRAL_EAR_MIRROR_PAIR_EMPIRICAL_SOURCE_FR104,
} from './neutral-ear-mirror-pair-empirical-evidence-fr104.js';

describe('FR104 controlled mirror-pair empirical evidence', () => {
  it('pins the exact locally executed public-fixture scalar result', () => {
    expect(NEUTRAL_EAR_MIRROR_PAIR_EMPIRICAL_SOURCE_FR104.fixture)
      .toEqual({
        sourceClass:
          'mediapipe_public_test_asset_non_user_fixture',
        fileName: 'portrait.jpg',
        expectedSha256:
          'a6f11efaa834706db23f275b6115058fa87fc7f14362681e6abe14e82749de3e',
        observedSha256:
          'a6f11efaa834706db23f275b6115058fa87fc7f14362681e6abe14e82749de3e',
        digestVerified: true,
        width: 820,
        height: 1024,
        rawFixturePersisted: false,
      });

    expect(
      NEUTRAL_EAR_MIRROR_PAIR_EMPIRICAL_SOURCE_FR104.scalarEvidence,
    ).toEqual({
      original: {
        leftEyeCentroidX: 0.5461522229015827,
        rightEyeCentroidX: 0.44472135603427887,
      },
      mirrored: {
        leftEyeCentroidX: 0.5557297803461552,
        rightEyeCentroidX: 0.4528836291283369,
      },
      sameLabelReflectionTotalAbsoluteError:
        0.2042770180851221,
      crossLabelReflectionTotalAbsoluteError:
        0.001415284350514412,
      closerPattern: 'cross_label_reflection_closer',
      numericAcceptanceThresholdApplied: false,
    });
  });

  it('re-admits the result through the Phase H recomputation gate', () => {
    expect(
      NEUTRAL_EAR_MIRROR_PAIR_EMPIRICAL_EVIDENCE_FR104
        .integrity.sourceResultRecomputed,
    ).toBe(true);
    expect(
      NEUTRAL_EAR_MIRROR_PAIR_EMPIRICAL_EVIDENCE_FR104
        .integrity.fixtureDigestMatchedPinnedProtocol,
    ).toBe(true);
    expect(
      NEUTRAL_EAR_MIRROR_PAIR_EMPIRICAL_EVIDENCE_FR104
        .scalarEvidence.closerPattern,
    ).toBe('cross_label_reflection_closer');
  });

  it('records the observed cross-label relation only for this exact fixture', () => {
    const decision =
      NEUTRAL_EAR_MIRROR_PAIR_EMPIRICAL_DECISION_FR104;

    expect(
      decision.exactFixtureObservation
        .crossLabelErrorLowerThanSameLabelError,
    ).toBe(true);
    expect(
      decision.interpretation
        .exactFixtureSupportsCrossLabelReflectionRelation,
    ).toBe(true);
    expect(
      decision.interpretation
        .exactFixtureSupportsSameLabelReflectionRelation,
    ).toBe(false);
    expect(
      decision.interpretation
        .generalProviderMirrorSemanticsEstablished,
    ).toBe(false);
  });

  it('does not promote the empirical relation to anatomy, ear validity, or Production', () => {
    const decision =
      NEUTRAL_EAR_MIRROR_PAIR_EMPIRICAL_DECISION_FR104;

    expect(
      decision.interpretation
        .providerLabelsAdmittedAsAnatomicalSide,
    ).toBe(false);
    expect(
      decision.interpretation
        .anatomicalLateralityMappingAdmitted,
    ).toBe(false);
    expect(
      decision.authority.numericAcceptanceThresholdAuthorized,
    ).toBe(false);
    expect(
      decision.authority
        .validatedExternalEarObservationAuthorized,
    ).toBe(false);
    expect(
      decision.authority.traditionalBindingAuthorized,
    ).toBe(false);
    expect(
      decision.authority.productionAuthorization,
    ).toBe(false);
  });
});
