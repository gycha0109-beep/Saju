import { describe, expect, it } from 'vitest';
import {
  assessFiveOfficerIntakeMouthSemanticExecutionAdmissionFR122,
  assertIssuedFiveOfficerIntakeMouthSemanticExecutionAdmissionFR122,
  type FiveOfficerIntakeMouthSemanticExecutionAdmissionFR122V1,
} from './five-officers-intake-mouth-semantic-execution-admission-fr122.js';

describe('FR122 intake mouth semantic execution admission hardening', () => {
  it('rejects a forged admission artifact even when its visible fields copy the issued result', () => {
    const issued = assessFiveOfficerIntakeMouthSemanticExecutionAdmissionFR122();
    const forged = structuredClone(issued) as FiveOfficerIntakeMouthSemanticExecutionAdmissionFR122V1;
    expect(() => assertIssuedFiveOfficerIntakeMouthSemanticExecutionAdmissionFR122(forged)).toThrow(/FR-122/);
  });

  it('does not expose an observation-to-criterion, claim, or narrative shortcut', () => {
    const value = assessFiveOfficerIntakeMouthSemanticExecutionAdmissionFR122();
    expect(value.authorityBoundary.witnessQualifiedSourceMeansMetricBinding).toBe(false);
    expect(value.authorityBoundary.neutralMetricMeansTraditionalSourceConcept).toBe(false);
    expect(value.authorityBoundary.runtimeMetricValueMeansCriterionState).toBe(false);
    expect(value.authorityBoundary.staticV1EligibleMeansExecutable).toBe(false);
    expect(value.authorityBoundary.researchMethodologyMeansExecutionAuthority).toBe(false);
    expect(value.authorityBoundary.llmMayClassifyCriterion).toBe(false);
    expect(value.authorityBoundary.llmMayGenerateClaimWithoutCriterionState).toBe(false);
  });

  it('keeps every FR122 criterion fail-closed even when a neutral metric path exists', () => {
    const value = assessFiveOfficerIntakeMouthSemanticExecutionAdmissionFR122();
    const metricBacked = value.criterionReadiness.filter((entry) => entry.machineObservationPath.state === 'existing_neutral_metric_path');
    expect(metricBacked.map((entry) => entry.criterionId)).toEqual([
      'criterion.intake.square_broad',
      'criterion.intake.lips_substantial',
    ]);
    expect(metricBacked.every((entry) => !entry.traditionalMetricBindingAuthorized)).toBe(true);
    expect(metricBacked.every((entry) => !entry.calibratedThresholdAuthorized)).toBe(true);
    expect(metricBacked.every((entry) => !entry.machineCriterionStateAuthorized)).toBe(true);
    expect(metricBacked.every((entry) => !entry.semanticSliceAuthorized)).toBe(true);
  });

  it('preserves capture-sensitive and dynamic-input prohibitions', () => {
    const value = assessFiveOfficerIntakeMouthSemanticExecutionAdmissionFR122();
    expect(value.authorityBoundary.captureSensitiveCriterionMayUseStaticV1Shortcut).toBe(false);
    expect(value.authorityBoundary.dynamicColorMayUseStaticGeometryShortcut).toBe(false);
    const red = value.criterionReadiness.find((entry) => entry.criterionId === 'criterion.intake.red_lip_color');
    expect(red?.blockers).toContain('dynamic_color_appearance_consumption_not_authorized');
  });
});
