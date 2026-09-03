import { describe, expect, it } from 'vitest';
import { FIVE_OFFICER_CRITERIA_V0 } from './five-officers-six-fus-research-v0.js';
import { FIVE_OFFICER_CRITERIA_FR121_WITNESS_QUALIFIED } from './five-officers-intake-criterion-definition-witness-qualified-source-rebind-implementation-fr121.js';
import {
  assessFiveOfficerIntakeMouthSemanticExecutionAdmissionFR122,
  assertIssuedFiveOfficerIntakeMouthSemanticExecutionAdmissionFR122,
} from './five-officers-intake-mouth-semantic-execution-admission-fr122.js';

describe('FR122 intake mouth semantic execution admission', () => {
  it('fails closed because no intake criterion has an authoritative machine criterion state', () => {
    const value = assessFiveOfficerIntakeMouthSemanticExecutionAdmissionFR122();
    expect(() => assertIssuedFiveOfficerIntakeMouthSemanticExecutionAdmissionFR122(value)).not.toThrow();
    expect(value.authorityState).toBe('mouth_semantic_vertical_slice_blocked_no_authoritative_machine_criterion_state');
    expect(value.executableCriterionId).toBeNull();
    expect(value.execution.deterministicCriterionEvaluatorsIssued).toBe(0);
    expect(value.execution.criterionStatesIssued).toBe(0);
    expect(value.execution.structuredClaimsIssued).toBe(0);
    expect(value.execution.boundedNarrativesIssued).toBe(0);
  });

  it('recognizes existing neutral mouth metric paths without promoting them to traditional criterion states', () => {
    const value = assessFiveOfficerIntakeMouthSemanticExecutionAdmissionFR122();
    const squareBroad = value.criterionReadiness.find((entry) => entry.criterionId === 'criterion.intake.square_broad');
    const lipsSubstantial = value.criterionReadiness.find((entry) => entry.criterionId === 'criterion.intake.lips_substantial');
    expect(squareBroad?.machineObservationPath.state).toBe('existing_neutral_metric_path');
    expect(squareBroad?.machineObservationPath.metricRefs).toEqual([
      'neutral.mouth.contour_set.bounding_box_aspect_ratio@0.1.0',
      'neutral.mouth.contour_set.horizontal_span_to_full_mesh_horizontal_span_ratio@0.1.0',
    ]);
    expect(squareBroad?.blockers).toContain('square_broad_metric_to_source_concept_mapping_not_authorized');
    expect(squareBroad?.calibratedThresholdAuthorized).toBe(false);
    expect(squareBroad?.machineCriterionStateAuthorized).toBe(false);
    expect(lipsSubstantial?.machineObservationPath.metricRefs).toEqual([
      'neutral.mouth.contour_set.symmetric_arclength_mean_nearest_set_distance@0.1.0',
    ]);
    expect(lipsSubstantial?.blockers).toContain('lips_substantial_construct_validity_evidence_absent');
    expect(lipsSubstantial?.traditionalMetricBindingAuthorized).toBe(false);
  });

  it('keeps capture-sensitive and dynamic criteria outside static-v1 semantic execution', () => {
    const value = assessFiveOfficerIntakeMouthSemanticExecutionAdmissionFR122();
    for (const criterionId of [
      'criterion.intake.corners_arched',
      'criterion.intake.open_close_relation',
      'criterion.intake.red_lip_color',
    ] as const) {
      const readiness = value.criterionReadiness.find((entry) => entry.criterionId === criterionId);
      expect(readiness?.staticV1Eligible).toBe(false);
      expect(readiness?.machineObservationPath.state).toBe('not_admissible_for_static_v1');
      expect(readiness?.semanticSliceAuthorized).toBe(false);
    }
  });

  it('preserves the historical criterion set while consuming the FR121 witness-qualified derived set', () => {
    const historicalIntake = FIVE_OFFICER_CRITERIA_V0.filter((criterion) => criterion.officerKey === 'intake');
    const currentIntake = FIVE_OFFICER_CRITERIA_FR121_WITNESS_QUALIFIED.filter((criterion) => criterion.officerKey === 'intake');
    expect(historicalIntake).toHaveLength(5);
    expect(currentIntake).toHaveLength(5);
    expect(historicalIntake.every((criterion) => criterion.sourceRefs[0] === 'passage.shenxiang.five_officers.intake')).toBe(true);
    expect(currentIntake.every((criterion) => criterion.sourceRefs[0] === 'passage.shenxiang.five_officers.intake.nlc_1925')).toBe(true);
    expect(assessFiveOfficerIntakeMouthSemanticExecutionAdmissionFR122().provenance.semanticIdentityEquivalenceAsserted).toBe(false);
  });

  it('chooses square-broad only as the closest next candidate, not as an executable criterion', () => {
    const value = assessFiveOfficerIntakeMouthSemanticExecutionAdmissionFR122();
    expect(value.closestStaticCandidateCriterionId).toBe('criterion.intake.square_broad');
    expect(value.executableCriterionId).toBeNull();
    expect(value.nextFrontier).toBe('square_broad_metric_to_source_operationalization_and_calibration_authority');
  });
});
