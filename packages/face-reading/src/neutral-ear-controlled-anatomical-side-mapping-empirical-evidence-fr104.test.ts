import { describe, expect, it } from 'vitest';
import {
  NEUTRAL_EAR_CONTROLLED_ANATOMICAL_SIDE_MAPPING_EMPIRICAL_EVIDENCE_FR104,
} from './neutral-ear-controlled-anatomical-side-mapping-empirical-evidence-fr104.js';

describe('FR104 U4A controlled anatomical mapping empirical evidence', () => {
  it('pins audit provenance and derived digest', () => {
    const evidence =
      NEUTRAL_EAR_CONTROLLED_ANATOMICAL_SIDE_MAPPING_EMPIRICAL_EVIDENCE_FR104;

    expect(evidence.auditHeadSha).toBe(
      'a69a07b872a2bedb3bfe5611c4d383c5c2ff8325',
    );
    expect(evidence.auditWorkflowRunId).toBe(36813396882);
    expect(evidence.auditMergeSha).toBe(
      '2964d334bb6264517872e9d540ed40b7e034d614',
    );
    expect(evidence.u4aDerivedResultSha256).toBe(
      '863b1909b2bb33437496c990fd97529d986b2fca1564addb6e1591d232b7f2cf',
    );
  });

  it('admits only exact-fixture reflection-parity support', () => {
    const evidence =
      NEUTRAL_EAR_CONTROLLED_ANATOMICAL_SIDE_MAPPING_EMPIRICAL_EVIDENCE_FR104;

    expect(evidence.summary.state).toBe(
      'reflection_parity_conditional_mapping_supported',
    );
    expect(evidence.summary.evaluatedCaseIds).toEqual([
      'R0','R90','R180','R270',
      'M0','M90','M180','M270',
    ]);
    expect(evidence.summary.unavailableCaseIds).toEqual([]);
    expect(evidence.summary.failedCaseIds).toEqual([]);
    expect(
      evidence.interpretation.controlledAnatomicalMappingAudited,
    ).toBe(true);
    expect(
      evidence.interpretation
        .reflectionParityConditionalMappingSupportedOnExactFixture,
    ).toBe(true);
    expect(
      evidence.interpretation
        .controlledAnatomicalReferenceAdmittedForExactFixture,
    ).toBe(true);
    expect(
      evidence.interpretation
        .prospectiveIndependentAnatomicalValidationStillRequired,
    ).toBe(true);
  });

  it('keeps global and downstream anatomical authority closed', () => {
    const authority =
      NEUTRAL_EAR_CONTROLLED_ANATOMICAL_SIDE_MAPPING_EMPIRICAL_EVIDENCE_FR104
        .authority;

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
