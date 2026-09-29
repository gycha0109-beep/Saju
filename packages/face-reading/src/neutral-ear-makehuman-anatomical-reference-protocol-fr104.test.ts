import { describe, expect, it } from 'vitest';
import {
  NEUTRAL_EAR_MAKEHUMAN_ANATOMICAL_REFERENCE_PROTOCOL_FR104,
} from './neutral-ear-makehuman-anatomical-reference-protocol-fr104.js';

describe('FR104 U1 MakeHuman anatomical reference protocol skeleton', () => {
  it('pins the MakeHuman source bundle selected by U0', () => {
    const protocol =
      NEUTRAL_EAR_MAKEHUMAN_ANATOMICAL_REFERENCE_PROTOCOL_FR104;

    expect(protocol.candidate).toEqual({
      candidateRef:
        'makehuman_default_cc0_head_reference',
      selectedByAudit:
        'makehuman_default_cc0_head_reference',
      admittedByAudit: false,
    });
    expect(protocol.sourceBundle).toMatchObject({
      repository: 'makehumancommunity/makehuman',
      commit:
        'a8bc2d54ff0ac92e78ff71431b1023eda42bf482',
      baseMesh: {
        blobSha:
          'd26635e9326e3cca30778fd7b9c00062b03cce09',
      },
      defaultSkeleton: {
        blobSha:
          'b02cbecae00143856410d7561adf006d83bf9b3e',
      },
      licenseWitness: {
        assetLicense: 'CC0-1.0',
      },
    });
  });

  it('derives anatomical anchors only from the independent source family', () => {
    const anchors =
      NEUTRAL_EAR_MAKEHUMAN_ANATOMICAL_REFERENCE_PROTOCOL_FR104
        .independentAnatomicalAnchors;

    expect(anchors).toMatchObject({
      leftEyeJoint: 'eye.L',
      rightEyeJoint: 'eye.R',
      providerLabelDerived: false,
      leftRightVectorWitness:
        'vnormalize(MakeHuman_joint_r_eye-MakeHuman_joint_l_eye)',
    });
  });

  it('requires provider-independent eye projection ground truth', () => {
    const contract =
      NEUTRAL_EAR_MAKEHUMAN_ANATOMICAL_REFERENCE_PROTOCOL_FR104
        .groundTruthProjectionContract;

    expect(contract.sameCameraMatrixAsRenderedFixtureRequired)
      .toBe(true);
    expect(contract.providerLandmarksMayInfluenceGroundTruth)
      .toBe(false);
    expect(contract.providerLabelsMayInfluenceGroundTruth)
      .toBe(false);
    expect(contract.florencePromptSideMayInfluenceGroundTruth)
      .toBe(false);
    expect(contract.imageSpaceXSignMayDefineAnatomicalSide)
      .toBe(false);
  });

  it('admits U1.2 render execution while keeping provider preflight closed', () => {
    const protocol =
      NEUTRAL_EAR_MAKEHUMAN_ANATOMICAL_REFERENCE_PROTOCOL_FR104;

    expect(
      protocol.deterministicRenderContract.implementationState,
    ).toBe('implemented_digest_pinned');
    expect(protocol.providerPreflight.executed).toBe(false);
    expect(
      protocol.providerPreflight.renderedFixtureDigestPinned,
    ).toBe(true);
    expect(
      protocol.deterministicRenderContract.renderedFixtureSha256,
    ).toBe(
      'f72a976d90d61223b8ad273d8d8da98ecd6ed0d1a63dff08ded358eef54e92bb',
    );
    expect(
      protocol.providerPreflight.exactlyOneFaceVerified,
    ).toBe(false);
    expect(protocol.decision.protocolMayBeExecutedNow)
      .toBe(true);
    expect(
      protocol.groundTruthProjectionContract.implementationState,
    ).toBe('implemented_same_camera_projection_in_u1_2_runner');
    expect(
      protocol.decision
        .fixtureMayBeCalledControlledAnatomicalReference,
    ).toBe(false);
  });

  it('keeps all downstream authority closed', () => {
    const authority =
      NEUTRAL_EAR_MAKEHUMAN_ANATOMICAL_REFERENCE_PROTOCOL_FR104
        .authority;

    expect(authority.anatomicalReferenceAdmitted)
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
