import { describe, expect, it } from 'vitest';
import {
  NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_PROTOCOL_FR104,
} from './neutral-ear-mirror-multifixture-protocol-fr104.js';

describe('FR104 controlled multi-fixture mirror protocol', () => {
  it('pins four non-user public fixtures with exact digests', () => {
    const fixtures =
      NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_PROTOCOL_FR104.fixtures;

    expect(fixtures).toHaveLength(4);
    expect(fixtures.map((fixture) => fixture.fixtureRef))
      .toEqual([
        'portrait_baseline',
        'portrait_small_candidate',
        'male_full_height_hands_candidate',
        'pose_candidate',
      ]);
    expect(fixtures.map((fixture) => fixture.sha256))
      .toEqual([
        'a6f11efaa834706db23f275b6115058fa87fc7f14362681e6abe14e82749de3e',
        '873a1a5e4cc86c040101362c5dea6a71cf524563b0700640175e5c3763a4246a',
        '8a7fe5be8b90d6078b09913ca28f7e5d342f8d3cde856ab4e3327d2970b887f8',
        'c8a830ed683c0276d713dd5aeda28f415f10cd6291972084a40d0d8b934ed62b',
      ]);
  });

  it('distinguishes exact face witnesses from empirical suitability candidates', () => {
    const fixtures =
      NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_PROTOCOL_FR104.fixtures;

    expect(fixtures[0]!.evidenceRole)
      .toBe('face_landmarker_exact_test_baseline');
    expect(fixtures[1]!.evidenceRole)
      .toBe('public_manifest_face_candidate_face_suitability_empirical');
    expect(fixtures[2]!.evidenceRole)
      .toBe('public_holistic_face_positive_candidate');
    expect(fixtures[3]!.evidenceRole)
      .toBe('public_human_pose_candidate_face_suitability_empirical');
  });

  it('keeps pair transforms exact and threshold-free', () => {
    const protocol =
      NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_PROTOCOL_FR104;

    expect(protocol.transformation).toEqual({
      pairPerFixture: ['original', 'horizontal_mirror'],
      resizeBetweenPairMembers: false,
      cropBetweenPairMembers: false,
      rotationBetweenPairMembers: false,
      taskImageProcessingRotationDegrees: 0,
    });
    expect(
      protocol.boundedMeasurement
        .exactlyOneFaceRequiredPerPairMember,
    ).toBe(true);
    expect(
      protocol.boundedMeasurement
        .numericAcceptanceThresholdAuthorized,
    ).toBe(false);
  });

  it('does not promote repeated patterns to general semantics or anatomy', () => {
    const boundary =
      NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_PROTOCOL_FR104
        .interpretationBoundary;

    expect(
      boundary
        .repeatedCloserPatternMayBeCalledGeneralProviderMirrorSemantics,
    ).toBe(false);
    expect(boundary.providerLabelMayBeCalledAnatomicalSide)
      .toBe(false);
    expect(boundary.anatomicalLateralityAuthorized).toBe(false);
    expect(boundary.validatedExternalEarObservationAuthorized)
      .toBe(false);
    expect(boundary.traditionalBindingAuthorized).toBe(false);
    expect(boundary.productionAuthorization).toBe(false);
  });

  it('accepts no user image or camera input', () => {
    expect(
      NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_PROTOCOL_FR104.localHarness,
    ).toMatchObject({
      pageRoute: '/fr104-mirror-multi/',
      clientRoute: '/fr104-mirror-multi/operator.mjs',
      automaticCaptureOrUserCameraAccess: false,
      userImageInputAccepted: false,
      fixtureDigestVerificationRequiredBeforeInference: true,
    });
  });
});
