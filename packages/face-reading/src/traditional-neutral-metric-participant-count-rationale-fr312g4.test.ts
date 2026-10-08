import { describe, expect, it } from 'vitest';
import {
  FR312F_CAPTURE_PROTOCOL,
  FR312F_PARTITION_POLICY,
  FR312F_SAMPLE_DESIGN,
} from './traditional-morphology-pilot-dataset-capture-protocol-fr312f.js';
import {
  FR312G_RELIABILITY_FAMILIES,
  FR312G_STUDY_DESIGN,
} from './traditional-neutral-metric-reliability-study-fr312g.js';
import {
  FR312G3_CONSENT_WITHDRAWAL_PROTOCOL,
} from './traditional-neutral-metric-consent-withdrawal-protocol-fr312g3.js';
import {
  FR312G4_AUTHORITY_BOUNDARY,
  FR312G4_BLOCKER_ACCOUNTING,
  FR312G4_PLANNING_CONTRACT,
  FR312G4_REQUIRED_NUMERIC_APPROVAL_INPUTS,
  assertParticipantCountPlanningRationaleFR312G4,
} from './traditional-neutral-metric-participant-count-rationale-fr312g4.js';

describe('FR312G4 participant-count planning rationale', () => {
  it('remains bound to the reliability study and dedicated consent contract', () => {
    expect(() => assertParticipantCountPlanningRationaleFR312G4())
      .not.toThrow();
    expect(FR312G4_PLANNING_CONTRACT.boundStudyId)
      .toBe(FR312G_STUDY_DESIGN.protocolId);
    expect(FR312G4_PLANNING_CONTRACT.boundConsentProtocolId)
      .toBe(FR312G3_CONSENT_WITHDRAWAL_PROTOCOL.protocolId);
  });

  it('counts independent participants rather than repeated images', () => {
    expect(FR312G4_PLANNING_CONTRACT.independentSamplingUnit)
      .toBe('participant');
    expect(FR312G4_PLANNING_CONTRACT.clusterCorrelationMustBeRespected)
      .toBe(true);
    expect(FR312G4_PLANNING_CONTRACT.sessionOrImageCountsAsIndependentParticipant)
      .toBe(false);
    expect(FR312G4_PLANNING_CONTRACT.repeatedCaptureRowsMustNotInflateEffectiveN)
      .toBe(true);
    expect(FR312G4_PLANNING_CONTRACT.requiredSessionsPerParticipant)
      .toBe(FR312F_CAPTURE_PROTOCOL.sessionsPerParticipant);
    expect(FR312G4_PLANNING_CONTRACT.acceptedCapturesPerSessionTarget)
      .toBe(FR312F_CAPTURE_PROTOCOL.acceptedCapturesPerSessionTarget);
    expect(FR312G4_PLANNING_CONTRACT.repeatedCaptureStructureAloneProvesSufficiency)
      .toBe(false);
  });

  it('plans for the exact eight neutral axes without morphology labels', () => {
    expect(FR312G4_PLANNING_CONTRACT.sourceNeutralComparatorFamilyCount)
      .toBe(4);
    expect(FR312G4_PLANNING_CONTRACT.sourceNeutralMetricAxisCount)
      .toBe(8);
    expect(FR312G4_PLANNING_CONTRACT.axisMetricRefs).toEqual(
      FR312G_RELIABILITY_FAMILIES.flatMap((family) =>
        family.metricAxes.map((axis) => axis.metricRef)),
    );
    expect(FR312G4_PLANNING_CONTRACT.morphologyLabelsMayBeReadForSizing)
      .toBe(false);
    expect(FR312G4_PLANNING_CONTRACT.traditionalSemanticClaimMayBeReadForSizing)
      .toBe(false);
    expect(FR312G4_PLANNING_CONTRACT.reliabilityDecisionThresholdIsSampleSizeInput)
      .toBe(false);
  });

  it('reserves calibration and holdout and keeps sample allocation separate', () => {
    expect(FR312G4_PLANNING_CONTRACT.executionPartition)
      .toBe('development');
    expect(FR312G4_PLANNING_CONTRACT.calibrationMayContributeToReliabilityEstimate)
      .toBe(false);
    expect(FR312G4_PLANNING_CONTRACT.holdoutMayContributeToReliabilityEstimate)
      .toBe(false);
    expect(FR312F_PARTITION_POLICY.holdoutSealedUntilAnalysisPlanIsFrozen)
      .toBe(true);
    expect(FR312G4_PLANNING_CONTRACT.partitionAllocation).toBeNull();
    expect(FR312G4_PLANNING_CONTRACT.partitionAllocationAuthorized)
      .toBe(false);
  });

  it('requires independently approved precision evidence before a number', () => {
    expect(FR312G4_REQUIRED_NUMERIC_APPROVAL_INPUTS).toHaveLength(7);
    expect(FR312G4_REQUIRED_NUMERIC_APPROVAL_INPUTS)
      .toContain('governed_per_axis_variability_or_availability_evidence');
    expect(FR312G4_REQUIRED_NUMERIC_APPROVAL_INPUTS)
      .toContain('fr312g5_partition_allocation_rationale');
    expect(FR312G4_PLANNING_CONTRACT.futurePrecisionTargetRequiresPreRegistration)
      .toBe(true);
    expect(FR312G4_PLANNING_CONTRACT.participantClusteredResamplingPreferred)
      .toBe(true);
    expect(FR312G4_PLANNING_CONTRACT.availabilityAndWithdrawalSensitivityMustBeReported)
      .toBe(true);
    expect(FR312G4_PLANNING_CONTRACT.uncertaintyTargetPerAxis).toBeNull();
    expect(FR312G4_PLANNING_CONTRACT.varianceAndMissingnessEvidence).toBeNull();
    expect(FR312G4_PLANNING_CONTRACT.withdrawalAndAttritionAssumptions)
      .toBeNull();
  });

  it('does not infer numeric sample size from four repeat captures', () => {
    expect(FR312F_SAMPLE_DESIGN.participantCount).toBeNull();
    expect(FR312F_SAMPLE_DESIGN.participantCountAuthorized).toBe(false);
    expect(FR312G4_PLANNING_CONTRACT.prospectiveParticipantCount)
      .toBeNull();
    expect(FR312G4_PLANNING_CONTRACT.developmentEffectiveParticipantCount)
      .toBeNull();
    expect(FR312G4_PLANNING_CONTRACT.participantCountRationaleMethodDefined)
      .toBe(true);
    expect(FR312G4_PLANNING_CONTRACT.participantCountRationaleNumericallyResolved)
      .toBe(false);
    expect(FR312G4_PLANNING_CONTRACT.numericInputsIssued).toBe(false);
    expect(FR312G4_PLANNING_CONTRACT.participantCountAuthorized)
      .toBe(false);
  });

  it('preserves consent and retention while blocking collection and downstream gates', () => {
    expect(FR312G4_BLOCKER_ACCOUNTING.dedicatedRetentionPrivacyPolicyIssued)
      .toBe(true);
    expect(FR312G4_BLOCKER_ACCOUNTING.dedicatedConsentWithdrawalProtocolIssued)
      .toBe(true);
    expect(FR312G4_BLOCKER_ACCOUNTING.participantCountSizingMethodDefined)
      .toBe(true);
    for (const [key, value] of Object.entries(FR312G4_BLOCKER_ACCOUNTING)) {
      if (
        key !== 'dedicatedRetentionPrivacyPolicyIssued'
        && key !== 'dedicatedConsentWithdrawalProtocolIssued'
        && key !== 'participantCountSizingMethodDefined'
      ) {
        expect(value, key).toBe(false);
      }
    }
    for (const [key, value] of Object.entries(FR312G4_AUTHORITY_BOUNDARY)) {
      expect(value, key).toBe(false);
    }
  });
});
