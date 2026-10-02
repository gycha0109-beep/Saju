import { describe, expect, it } from 'vitest';
import {
  NEUTRAL_EAR_GNM_CROSS_SOURCE_ANATOMICAL_WITNESS_EMPIRICAL_EVIDENCE_FR104,
} from './neutral-ear-gnm-cross-source-anatomical-witness-empirical-evidence-fr104.js';

describe('FR104 U5A-B2 admitted GNM witness evidence', () => {
  it('pins exact candidate provenance and digest', () => {
    const evidence =
      NEUTRAL_EAR_GNM_CROSS_SOURCE_ANATOMICAL_WITNESS_EMPIRICAL_EVIDENCE_FR104;

    expect(evidence.preregistrationMergeSha).toBe(
      '2868ba01d36b89dbb739216fdbc9eb6f69842a25',
    );
    expect(evidence.candidateMergeSha).toBe(
      'd2b615c3f027860d6cf8de65f502585d54e95fdc',
    );
    expect(evidence.resultSha256).toBe(
      '7eac8cb7b030fed200cf6d4b7d8406901449f130deb3b44c7ef2b98a79b6cd21',
    );
    expect(evidence.state).toBe(
      'gnm_direct_left_right_joint_witness_supported',
    );
  });

  it('pins direct source semantic eye anchors exactly', () => {
    const witness =
      NEUTRAL_EAR_GNM_CROSS_SOURCE_ANATOMICAL_WITNESS_EMPIRICAL_EVIDENCE_FR104
        .directSourceSemanticWitness;

    expect(witness.leftEye.jointName).toBe('left_eye');
    expect(witness.leftEye.jointIndex).toBe(2);
    expect(witness.leftEye.templateJointPosition).toEqual([
      0.030839037150144577,
      0.30316492915153503,
      0.09888789802789688,
    ]);

    expect(witness.rightEye.jointName).toBe('right_eye');
    expect(witness.rightEye.jointIndex).toBe(3);
    expect(witness.rightEye.templateJointPosition).toEqual([
      -0.030866222456097603,
      0.3031134307384491,
      0.09897840023040771,
    ]);
  });

  it('admits semantic witness only and keeps downstream authority closed', () => {
    const authority =
      NEUTRAL_EAR_GNM_CROSS_SOURCE_ANATOMICAL_WITNESS_EMPIRICAL_EVIDENCE_FR104
        .authority;

    expect(authority.gnmCrossSourceSemanticWitnessAudited).toBe(true);
    expect(authority.gnmCrossSourceGeometricValidationExecuted).toBe(false);
    expect(authority.providerLabelMappedToAnatomicalSide).toBe(false);
    expect(
      authority.globalProviderAnatomicalSemanticsEstablished,
    ).toBe(false);
    expect(authority.anatomicalReferenceAdmitted).toBe(false);
    expect(authority.anatomicalLateralityAuthorized).toBe(false);
    expect(
      authority.validatedExternalEarObservationAuthorized,
    ).toBe(false);
    expect(authority.traditionalBindingAuthorized).toBe(false);
    expect(authority.productionAuthorization).toBe(false);
  });
});
