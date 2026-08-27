export type PairRelationExpectation = 'same' | 'different';

export interface PersonalizationObservation {
  caseId: string;
  consumedInputFingerprint: string;
  interpretationSignature: string;
}

export interface DiscriminatingPairExpectation {
  consumedInput: PairRelationExpectation;
  interpretation: PairRelationExpectation;
}

export type DiscriminatingPairFailureCode =
  | 'EXPECTED_CONSUMED_INPUT_DIFFERENCE_COLLAPSED'
  | 'EXPECTED_CONSUMED_INPUT_STABILITY_BROKEN'
  | 'EXPECTED_INTERPRETATION_DIFFERENCE_COLLAPSED'
  | 'EXPECTED_INTERPRETATION_STABILITY_BROKEN';

export interface DiscriminatingPairAuditResult {
  leftCaseId: string;
  rightCaseId: string;
  expectation: DiscriminatingPairExpectation;
  observed: {
    consumedInput: PairRelationExpectation;
    interpretation: PairRelationExpectation;
  };
  passed: boolean;
  failures: readonly DiscriminatingPairFailureCode[];
}

function relation(left: string, right: string): PairRelationExpectation {
  return left === right ? 'same' : 'different';
}

export function auditDiscriminatingPair(
  left: PersonalizationObservation,
  right: PersonalizationObservation,
  expectation: DiscriminatingPairExpectation,
): DiscriminatingPairAuditResult {
  const observedConsumed = relation(left.consumedInputFingerprint, right.consumedInputFingerprint);
  const observedInterpretation = relation(left.interpretationSignature, right.interpretationSignature);
  const failures: DiscriminatingPairFailureCode[] = [];

  if (expectation.consumedInput === 'different' && observedConsumed === 'same') {
    failures.push('EXPECTED_CONSUMED_INPUT_DIFFERENCE_COLLAPSED');
  }
  if (expectation.consumedInput === 'same' && observedConsumed === 'different') {
    failures.push('EXPECTED_CONSUMED_INPUT_STABILITY_BROKEN');
  }
  if (expectation.interpretation === 'different' && observedInterpretation === 'same') {
    failures.push('EXPECTED_INTERPRETATION_DIFFERENCE_COLLAPSED');
  }
  if (expectation.interpretation === 'same' && observedInterpretation === 'different') {
    failures.push('EXPECTED_INTERPRETATION_STABILITY_BROKEN');
  }

  return {
    leftCaseId: left.caseId,
    rightCaseId: right.caseId,
    expectation,
    observed: {
      consumedInput: observedConsumed,
      interpretation: observedInterpretation,
    },
    passed: failures.length === 0,
    failures,
  };
}
