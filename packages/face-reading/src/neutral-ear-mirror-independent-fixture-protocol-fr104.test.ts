import { describe, expect, it } from 'vitest';
import {
  NEUTRAL_EAR_MIRROR_INDEPENDENT_FIXTURE_PROTOCOL_FR104,
} from './neutral-ear-mirror-independent-fixture-protocol-fr104.js';

describe('FR104 independent public fixture mirror protocol', () => {
  it('pins the external public fixture and exact digest', () => {
    expect(
      NEUTRAL_EAR_MIRROR_INDEPENDENT_FIXTURE_PROTOCOL_FR104
        .fixture,
    ).toMatchObject({
      fixtureRef: 'skimage_astronaut_public_domain',
      sourceRepository: 'scikit-image/scikit-image',
      sourceCommit:
        '533b7694d2004ae84e49e2cfd0bcfc5f8e562f22',
      fileName: 'astronaut.png',
      sha256:
        '88431cd9653ccd539741b555fb0a46b61558b301d4110412b5bc28b5e3ea6cb5',
      expectedWidth: 512,
      expectedHeight: 512,
      sourceRepositoryDistinctFromMediaPipeFixtureSource: true,
      depictedPersonIdentityUsedForRuntimeDecision: false,
    });
  });

  it('uses the same exact MediaPipe runtime and mirror pair', () => {
    const protocol =
      NEUTRAL_EAR_MIRROR_INDEPENDENT_FIXTURE_PROTOCOL_FR104;

    expect(protocol.runtime).toMatchObject({
      packageName: '@mediapipe/tasks-vision',
      packageVersion: '0.10.35',
      runningMode: 'IMAGE',
      numFaces: 1,
    });
    expect(protocol.transformation).toEqual({
      pair: ['original', 'horizontal_mirror'],
      resizeApplied: false,
      cropApplied: false,
      rotationApplied: false,
      taskImageProcessingRotationDegrees: 0,
    });
  });

  it('requires digest and dimension verification before inference', () => {
    expect(
      NEUTRAL_EAR_MIRROR_INDEPENDENT_FIXTURE_PROTOCOL_FR104
        .localHarness,
    ).toMatchObject({
      userImageInputAccepted: false,
      cameraAccessAuthorized: false,
      fixtureDigestVerificationRequiredBeforeInference: true,
      fixtureDimensionsVerificationRequiredBeforeInference: true,
    });
  });

  it('does not authorize general semantics or anatomy', () => {
    const authority =
      NEUTRAL_EAR_MIRROR_INDEPENDENT_FIXTURE_PROTOCOL_FR104
        .authority;

    expect(
      authority
        .successfulFixtureMayBeCalledGeneralProviderMirrorSemantics,
    ).toBe(false);
    expect(authority.providerLabelMayBeCalledAnatomicalSide)
      .toBe(false);
    expect(authority.anatomicalLateralityAuthorized)
      .toBe(false);
    expect(authority.validatedExternalEarObservationAuthorized)
      .toBe(false);
    expect(authority.traditionalBindingAuthorized)
      .toBe(false);
    expect(authority.productionAuthorization).toBe(false);
  });
});
