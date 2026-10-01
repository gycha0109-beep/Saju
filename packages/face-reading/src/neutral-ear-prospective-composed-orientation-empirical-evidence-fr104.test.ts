import { describe, expect, it } from 'vitest';
import {
  NEUTRAL_EAR_PROSPECTIVE_COMPOSED_ORIENTATION_EMPIRICAL_EVIDENCE_FR104,
} from './neutral-ear-prospective-composed-orientation-empirical-evidence-fr104.js';

describe('FR104 U3.3B prospective composed orientation evidence', () => {
  it('pins preregistration, execution, predecessor, and result digests', () => {
    const evidence =
      NEUTRAL_EAR_PROSPECTIVE_COMPOSED_ORIENTATION_EMPIRICAL_EVIDENCE_FR104;

    expect(evidence.preregistrationMergeSha).toBe(
      '5bf66ddcfa3b6100d93f7259bd87232095c8912d',
    );
    expect(evidence.firstValidExecutionMergeSha).toBe(
      '856ad0c19fdef2471434ed3253cf67b55850ae29',
    );
    expect(evidence.predecessorDerivedResultSha256).toBe(
      '732268b973592f70f606000ffcbd0219e67afcc20b920e57906d14978f5cbb05',
    );
    expect(evidence.prospectiveResultSha256).toBe(
      '793b1059308242d11c176300bd141b70a49c2fa681a49bc6e38e1abddf4aaab4',
    );
  });

  it('admits the preregistered supported state without retuning', () => {
    const evidence =
      NEUTRAL_EAR_PROSPECTIVE_COMPOSED_ORIENTATION_EMPIRICAL_EVIDENCE_FR104;

    expect(evidence.summary.state)
      .toBe('prospective_composed_normalization_supported');
    expect(evidence.summary.evaluatedCaseIds).toEqual([
      'R90','R180','R270','M90','M180','M270',
    ]);
    expect(evidence.summary.unavailableCaseIds).toEqual([]);
    expect(evidence.summary.failedCaseIds).toEqual([]);
    expect(evidence.summary.allSixRotatedCasesAvailable).toBe(true);
    expect(evidence.interpretation.ruleRetunedAfterObservation)
      .toBe(false);
    expect(
      evidence.interpretation
        .prospectiveComposedNormalizationValidated,
    ).toBe(true);
    expect(
      evidence.interpretation
        .providerCompensatedOutputFrameProspectivelyValidated,
    ).toBe(true);
  });

  it('keeps anatomy, traditional binding, and production closed', () => {
    const authority =
      NEUTRAL_EAR_PROSPECTIVE_COMPOSED_ORIENTATION_EMPIRICAL_EVIDENCE_FR104
        .authority;

    expect(authority.providerLabelMappedToAnatomicalSide)
      .toBe(false);
    expect(authority.anatomicalLateralityAuthorized)
      .toBe(false);
    expect(authority.traditionalBindingAuthorized).toBe(false);
    expect(authority.productionAuthorization).toBe(false);
  });
});
