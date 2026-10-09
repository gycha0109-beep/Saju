import { describe, expect, it } from 'vitest';
import { NEUTRAL_EAR_MIRROR_PAIR_PROTOCOL_FR104 } from './neutral-ear-mirror-pair-protocol-fr104.js';

describe('FR104 controlled provider mirror-pair protocol', () => {
  it('pins the exact public MediaPipe fixture witness and digest', () => {
    expect(NEUTRAL_EAR_MIRROR_PAIR_PROTOCOL_FR104.fixture)
      .toMatchObject({
        sourceClass:
          'mediapipe_public_test_asset_non_user_fixture',
        fileName: 'portrait.jpg',
        sha256:
          'a6f11efaa834706db23f275b6115058fa87fc7f14362681e6abe14e82749de3e',
        sourceWitness: {
          repository: 'google-ai-edge/mediapipe',
          releaseTag: 'v0.10.35',
          releaseCommit:
            'f8ef212d5c962c0e853db7e59d217056b187084b',
          path: 'third_party/external_files.bzl',
          gitBlobSha:
            'f52887c2586679e00c9b0ac10291abc14334e45a',
        },
        rawFixtureCommittedToSaju: false,
        rawFixturePersistedByHarness: false,
      });
  });

  it('reuses the pinned FR26 browser runtime references without widening asset authority', () => {
    const runtime = NEUTRAL_EAR_MIRROR_PAIR_PROTOCOL_FR104.runtime;

    expect(runtime.packageName).toBe('@mediapipe/tasks-vision');
    expect(runtime.packageVersion).toBe('0.10.35');
    expect(runtime.runningMode).toBe('IMAGE');
    expect(runtime.numFaces).toBe(1);
    expect(runtime.runtimeAssetByteDigestVerified).toBe(false);
    expect(runtime.modelAssetByteDigestVerified).toBe(false);
  });

  it('permits only an explicit horizontal pixel reflection between pair members', () => {
    expect(
      NEUTRAL_EAR_MIRROR_PAIR_PROTOCOL_FR104.transformation,
    ).toEqual({
      originalPixelsUsedUnmodifiedAfterDecode: true,
      mirrorTransform:
        'canvas_horizontal_reflection_x_prime_equals_width_minus_x',
      resizeBetweenPairMembers: false,
      cropBetweenPairMembers: false,
      rotationBetweenPairMembers: false,
    });
  });

  it('persists only bounded eye-side scalar evidence', () => {
    const measurement =
      NEUTRAL_EAR_MIRROR_PAIR_PROTOCOL_FR104.boundedMeasurement;

    expect(measurement.topologySources).toEqual([
      'FACE_LANDMARKS_LEFT_EYE',
      'FACE_LANDMARKS_RIGHT_EYE',
    ]);
    expect(measurement.rawLandmarksPersisted).toBe(false);
    expect(measurement.rawLandmarksReturned).toBe(false);
    expect(measurement.numericAcceptanceThresholdAuthorized).toBe(false);
  });

  it('does not promote a one-fixture reflection pattern to anatomy or Production', () => {
    const boundary =
      NEUTRAL_EAR_MIRROR_PAIR_PROTOCOL_FR104.interpretationBoundary;

    expect(boundary.providerLabelMayBeCalledAnatomicalSide)
      .toBe(false);
    expect(
      boundary.sameLabelReflectionCloserMayBeCalledAnatomicalInvariance,
    ).toBe(false);
    expect(
      boundary.crossLabelReflectionCloserMayBeCalledLabelSwapSemantics,
    ).toBe(false);
    expect(boundary.singleFixtureMayEstablishGeneralMirrorBehavior)
      .toBe(false);
    expect(boundary.anatomicalLateralityAuthorized).toBe(false);
    expect(boundary.traditionalBindingAuthorized).toBe(false);
    expect(boundary.productionAuthorization).toBe(false);
  });

  it('does not accept user images or camera input in the controlled harness', () => {
    expect(NEUTRAL_EAR_MIRROR_PAIR_PROTOCOL_FR104.localHarness)
      .toMatchObject({
        pageRoute: '/fr104-mirror/',
        clientRoute: '/fr104-mirror/operator.mjs',
        automaticCaptureOrUserCameraAccess: false,
        userImageInputAccepted: false,
        fixtureDigestVerificationRequiredBeforeInference: true,
      });
  });
});
