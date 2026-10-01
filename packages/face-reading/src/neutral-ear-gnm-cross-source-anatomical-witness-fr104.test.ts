import { describe, expect, it } from 'vitest';
import {
  assessNeutralEarGnmCrossSourceWitnessFR104,
  NEUTRAL_EAR_GNM_CROSS_SOURCE_ANATOMICAL_WITNESS_FR104,
} from './neutral-ear-gnm-cross-source-anatomical-witness-fr104.js';

function supported() {
  return {
    assetVerified:true,
    variantNormalized:'head',
    jointNamesReadable:true,
    leftEyeJointCount:1,
    rightEyeJointCount:1,
    templateJointPositionsReadable:true,
    leftEyePositionFinite:true,
    rightEyePositionFinite:true,
    leftRightPositionsDistinct:true,
    requiredProviderGroupsReadable:true,
    requiredProviderGroupsPresent:true,
  } as const;
}

describe('FR104 U5A-A GNM cross-source witness preregistration', () => {
  it('pins the already-governed GNM asset and exact source witnesses', () => {
    const protocol =
      NEUTRAL_EAR_GNM_CROSS_SOURCE_ANATOMICAL_WITNESS_FR104;

    expect(protocol.sourceAsset.repository).toBe('google/GNM');
    expect(protocol.sourceAsset.upstreamCommit).toBe(
      'fe31d4eb089f591a2e0c8ff0c38203b7b1fb1690',
    );
    expect(protocol.sourceAsset.gitBlobSha).toBe(
      'ae49903ad7d50ce1d64e464a0407441f2781873c',
    );
    expect(
      protocol.directSourceWitnesses.numpyTests.gitBlobSha,
    ).toBe(
      'a2a68e526bbe071c94bd4fdb240c837d36e13b85',
    );
    expect(
      protocol.directSourceWitnesses.numpyTests.expectedHeadJointNames,
    ).toEqual(['left_eye','right_eye']);
  });

  it('freezes U5A-A before any NPZ live audit', () => {
    const audit =
      NEUTRAL_EAR_GNM_CROSS_SOURCE_ANATOMICAL_WITNESS_FR104
        .frozenLiveAudit;

    expect(audit.npzFetchAllowedInU5aA).toBe(false);
    expect(audit.npzFetchAllowedInU5aB).toBe(true);
    expect(audit.ruleMayBeRetunedAfterLiveAudit).toBe(false);
    expect(audit.imageSpaceXSignMayAssignSemanticSide).toBe(false);
    expect(audit.gnmAxisOrderingMayAssignSemanticSide).toBe(false);
    expect(audit.mediaPipeProviderLabelsMayAssignSemanticSide).toBe(false);
  });

  it('supports only a complete direct-source joint witness', () => {
    const assessment =
      assessNeutralEarGnmCrossSourceWitnessFR104(supported());

    expect(assessment.state).toBe(
      'gnm_direct_left_right_joint_witness_supported',
    );
    expect(
      assessment.directSourceLeftEyeJointWitnessPresent,
    ).toBe(true);
    expect(
      assessment.directSourceRightEyeJointWitnessPresent,
    ).toBe(true);
    expect(
      assessment.jointPositionsUsableAsControlledAnchors,
    ).toBe(true);
  });

  it('refutes explicit semantic or anchor contradiction', () => {
    const input = {
      ...supported(),
      rightEyeJointCount:0,
    };
    const assessment =
      assessNeutralEarGnmCrossSourceWitnessFR104(input);

    expect(assessment.state).toBe(
      'gnm_direct_left_right_joint_witness_refuted',
    );
  });

  it('keeps incomplete live evidence unresolved', () => {
    const input = {
      ...supported(),
      assetVerified:false,
      jointNamesReadable:false,
      leftEyeJointCount:null,
      rightEyeJointCount:null,
      templateJointPositionsReadable:false,
      leftEyePositionFinite:null,
      rightEyePositionFinite:null,
      leftRightPositionsDistinct:null,
      requiredProviderGroupsReadable:false,
      requiredProviderGroupsPresent:null,
    };
    const assessment =
      assessNeutralEarGnmCrossSourceWitnessFR104(input);

    expect(assessment.state).toBe(
      'gnm_direct_left_right_joint_witness_unresolved',
    );
  });

  it('keeps all runtime and downstream authority closed', () => {
    const authority =
      NEUTRAL_EAR_GNM_CROSS_SOURCE_ANATOMICAL_WITNESS_FR104
        .authority;

    expect(authority.gnmCrossSourceSemanticWitnessAudited).toBe(false);
    expect(
      authority.gnmCrossSourceGeometricValidationExecuted,
    ).toBe(false);
    expect(authority.providerLabelMappedToAnatomicalSide).toBe(false);
    expect(authority.anatomicalLateralityAuthorized).toBe(false);
    expect(authority.traditionalBindingAuthorized).toBe(false);
    expect(authority.productionAuthorization).toBe(false);
  });
});
