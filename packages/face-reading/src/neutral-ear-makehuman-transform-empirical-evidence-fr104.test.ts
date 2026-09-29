import { describe, expect, it } from 'vitest';
import { FaceAuthorityValidationError } from './validation.js';
import {
  admitNeutralEarMakeHumanTransformDiagnosticResultFR104,
} from './neutral-ear-makehuman-transform-result-intake-fr104.js';
import {
  NEUTRAL_EAR_MAKEHUMAN_TRANSFORM_EMPIRICAL_DECISION_FR104,
  NEUTRAL_EAR_MAKEHUMAN_TRANSFORM_EMPIRICAL_EVIDENCE_FR104,
  NEUTRAL_EAR_MAKEHUMAN_TRANSFORM_EMPIRICAL_SOURCE_FR104,
} from './neutral-ear-makehuman-transform-empirical-evidence-fr104.js';

describe('FR104 U3 MakeHuman transform empirical evidence', () => {
  it('admits the exact eight-case bounded result without semantic promotion', () => {
    const evidence =
      NEUTRAL_EAR_MAKEHUMAN_TRANSFORM_EMPIRICAL_EVIDENCE_FR104;

    expect(evidence.diagnosticSummary).toEqual({
      state: 'incomplete_provider_coverage',
      unavailableCaseIds: ['R270', 'M180', 'M270'],
      unresolvedCaseIds: [],
      hypothesisMismatchCaseIds: ['R180'],
    });
    expect(
      evidence.authority
        .exactMakeHumanFixtureTransformDiagnosticsExecuted,
    ).toBe(true);
    expect(
      evidence.authority
        .parityConditionedAssignmentPatternEstablished,
    ).toBe(false);
    expect(evidence.authority.anatomicalLateralityAuthorized)
      .toBe(false);
    expect(evidence.authority.productionAuthorization)
      .toBe(false);
  });

  it('records the R180 mismatch and provider coverage gaps as evidence, not harness failure', () => {
    const decision =
      NEUTRAL_EAR_MAKEHUMAN_TRANSFORM_EMPIRICAL_DECISION_FR104;

    expect(decision.observed.availableRelations).toEqual({
      R0: 'direct_assignment_closer',
      R90: 'direct_assignment_closer',
      R180: 'swapped_assignment_closer',
      M0: 'swapped_assignment_closer',
      M90: 'swapped_assignment_closer',
    });
    expect(
      decision.interpretation.orientationCoverageComplete,
    ).toBe(false);
    expect(
      decision.interpretation
        .parityConditionedHypothesisSatisfied,
    ).toBe(false);
    expect(
      decision.interpretation.providerRotationDependenceObserved,
    ).toBe(true);
    expect(
      decision.interpretation.anatomicalMappingReviewOutcome,
    ).toBe('hold');
  });

  it('rejects semantic authority promotion in copied empirical evidence', () => {
    const mutated = structuredClone(
      NEUTRAL_EAR_MAKEHUMAN_TRANSFORM_EMPIRICAL_SOURCE_FR104,
    ) as unknown as Record<string, unknown>;
    const authority =
      mutated.authority as Record<string, unknown>;
    authority.anatomicalLateralityAuthorized = true;

    expect(() =>
      admitNeutralEarMakeHumanTransformDiagnosticResultFR104(
        mutated,
      ),
    ).toThrow(FaceAuthorityValidationError);
  });
});
