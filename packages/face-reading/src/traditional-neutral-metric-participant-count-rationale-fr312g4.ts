import {
  FR312F_CAPTURE_PROTOCOL,
  FR312F_PARTITION_POLICY,
  FR312F_SAMPLE_DESIGN,
} from './traditional-morphology-pilot-dataset-capture-protocol-fr312f.js';
import {
  FR312G_RELIABILITY_FAMILIES,
  FR312G_STUDY_DESIGN,
  assertNeutralMetricReliabilityStudyDesignFR312G,
} from './traditional-neutral-metric-reliability-study-fr312g.js';
import {
  FR312G3_CONSENT_WITHDRAWAL_PROTOCOL,
  assertParticipantConsentWithdrawalProtocolFR312G3,
} from './traditional-neutral-metric-consent-withdrawal-protocol-fr312g3.js';

export const FR312G4_RATIONALE_ID =
  'fr312g4.participant_count_planning_rationale' as const;

export const FR312G4_REQUIRED_NUMERIC_APPROVAL_INPUTS = Object.freeze([
  'pre_registered_per_axis_precision_target',
  'governed_per_axis_variability_or_availability_evidence',
  'participant_clustered_uncertainty_calculation',
  'attrition_withdrawal_and_unavailable_case_assumptions',
  'proposed_development_partition_effective_participant_count',
  'fr312g5_partition_allocation_rationale',
  'reviewer_signoff_on_assumptions_and_calculation',
] as const);

export const FR312G4_PLANNING_CONTRACT = Object.freeze({
  rationaleId: FR312G4_RATIONALE_ID,
  authorityState: 'sizing_method_defined_no_numeric_sample_approval' as const,
  boundStudyId: FR312G_STUDY_DESIGN.protocolId,
  boundConsentProtocolId: FR312G3_CONSENT_WITHDRAWAL_PROTOCOL.protocolId,
  independentSamplingUnit: 'participant' as const,
  repeatedObservationUnits: Object.freeze([
    'session', 'fresh_capture', 'admitted_image', 'neutral_metric_axis',
  ] as const),
  clusterCorrelationMustBeRespected: true as const,
  sessionOrImageCountsAsIndependentParticipant: false as const,
  requiredSessionsPerParticipant: FR312F_CAPTURE_PROTOCOL.sessionsPerParticipant,
  acceptedCapturesPerSessionTarget:
    FR312F_CAPTURE_PROTOCOL.acceptedCapturesPerSessionTarget,
  repeatedCaptureStructureAloneProvesSufficiency: false as const,
  executionPartition: 'development' as const,
  calibrationMayContributeToReliabilityEstimate: false as const,
  holdoutMayContributeToReliabilityEstimate: false as const,
  sourceNeutralComparatorFamilyCount: FR312G_STUDY_DESIGN.comparatorFamilyCount,
  sourceNeutralMetricAxisCount: FR312G_STUDY_DESIGN.neutralMetricAxisCount,
  axisMetricRefs: Object.freeze(
    FR312G_RELIABILITY_FAMILIES.flatMap((family) =>
      family.metricAxes.map((axis) => axis.metricRef)),
  ),
  sizingEstimands: Object.freeze([
    'within_session_absolute_pair_difference',
    'between_session_absolute_session_mean_difference',
    'within_participant_range',
    'missingness_rate_and_unavailable_reasons',
  ] as const),
  reliabilityDecisionThresholdIsSampleSizeInput: false as const,
  morphologyLabelsMayBeReadForSizing: false as const,
  traditionalSemanticClaimMayBeReadForSizing: false as const,
  futurePrecisionTargetRequiresPreRegistration: true as const,
  participantClusteredResamplingPreferred: true as const,
  repeatedCaptureRowsMustNotInflateEffectiveN: true as const,
  availabilityAndWithdrawalSensitivityMustBeReported: true as const,
  chooseCountFromWorstSupportedAxisRequirementOnlyAfterReview: true as const,
  postHocSampleSizeTuningFromHoldoutAuthorized: false as const,
  prospectiveNumericApprovalInputs: FR312G4_REQUIRED_NUMERIC_APPROVAL_INPUTS,
  numericInputsIssued: false as const,
  uncertaintyTargetPerAxis: null,
  varianceAndMissingnessEvidence: null,
  withdrawalAndAttritionAssumptions: null,
  prospectiveParticipantCount: null,
  developmentEffectiveParticipantCount: null,
  partitionAllocation: null,
  demographicQuotaPlan: null,
  reliabilityAcceptanceThreshold: null,
  populationNormAuthorized: false as const,
  participantCountRationaleMethodDefined: true as const,
  participantCountRationaleNumericallyResolved: false as const,
  participantCountAuthorized: false as const,
  partitionAllocationAuthorized: false as const,
  recruitmentAuthorized: false as const,
  actualParticipantCollectionAuthorized: false as const,
  fr312gReliabilityExecutionAuthorized: false as const,
  fr312hEntryAuthorized: false as const,
  nextAction:
    'define_fr312g5_partition_allocation_and_obtain_evidence_backed_numeric_sizing_signoff_before_collection' as const,
});

export const FR312G4_BLOCKER_ACCOUNTING = Object.freeze({
  dedicatedRetentionPrivacyPolicyIssued: true as const,
  dedicatedConsentWithdrawalProtocolIssued: true as const,
  participantCountSizingMethodDefined: true as const,
  evidenceBackedParticipantCountRationaleIssued: false as const,
  participantCountAuthorized: false as const,
  partitionAllocationRationaleIssued: false as const,
  empiricalCollectionRuntimeIssued: false as const,
  empiricalCollectionAdmissionIssued: false as const,
  actualParticipantCollectionAuthorized: false as const,
  fr312gReliabilityExecutionAuthorized: false as const,
  fr312hEntryAuthorized: false as const,
});

export const FR312G4_AUTHORITY_BOUNDARY = Object.freeze({
  participantCountAuthorized: false as const,
  partitionAllocationAuthorized: false as const,
  demographicQuotaAuthorized: false as const,
  populationNormAuthorized: false as const,
  participantRecruitmentAuthorized: false as const,
  actualParticipantCollectionAuthorized: false as const,
  reliabilityExecutionAuthorized: false as const,
  morphologyEquivalenceAuthorized: false as const,
  thresholdDiscoveryAuthorized: false as const,
  automaticTraditionalBindingAuthorized: false as const,
  productInterpretationAuthorized: false as const,
});

function unique<T>(values: readonly T[]): boolean {
  return new Set(values).size === values.length;
}

export function assertParticipantCountPlanningRationaleFR312G4(): void {
  assertNeutralMetricReliabilityStudyDesignFR312G();
  assertParticipantConsentWithdrawalProtocolFR312G3();

  if (
    FR312G4_PLANNING_CONTRACT.boundStudyId !== FR312G_STUDY_DESIGN.protocolId
    || FR312G4_PLANNING_CONTRACT.boundConsentProtocolId
      !== FR312G3_CONSENT_WITHDRAWAL_PROTOCOL.protocolId
    || FR312G4_PLANNING_CONTRACT.independentSamplingUnit !== 'participant'
    || FR312G4_PLANNING_CONTRACT.sessionOrImageCountsAsIndependentParticipant
      !== false
    || FR312G4_PLANNING_CONTRACT.clusterCorrelationMustBeRespected !== true
  ) {
    throw new Error('fr312g4_sampling_unit_or_binding_drift');
  }

  if (
    FR312G4_PLANNING_CONTRACT.requiredSessionsPerParticipant !== 2
    || FR312G4_PLANNING_CONTRACT.acceptedCapturesPerSessionTarget !== 2
    || FR312G4_PLANNING_CONTRACT.repeatedCaptureStructureAloneProvesSufficiency
      !== false
    || FR312G4_PLANNING_CONTRACT.executionPartition !== 'development'
    || FR312G4_PLANNING_CONTRACT.calibrationMayContributeToReliabilityEstimate
      !== false
    || FR312G4_PLANNING_CONTRACT.holdoutMayContributeToReliabilityEstimate
      !== false
    || FR312F_PARTITION_POLICY.holdoutSealedUntilAnalysisPlanIsFrozen
      !== true
  ) {
    throw new Error('fr312g4_repeatability_or_partition_drift');
  }

  const upstreamMetricRefs = FR312G_RELIABILITY_FAMILIES
    .flatMap((family) => family.metricAxes.map((axis) => axis.metricRef));
  if (
    upstreamMetricRefs.length !== 8
    || !unique(upstreamMetricRefs)
    || FR312G4_PLANNING_CONTRACT.axisMetricRefs.join('|')
      !== upstreamMetricRefs.join('|')
    || FR312G4_PLANNING_CONTRACT.sourceNeutralComparatorFamilyCount !== 4
    || FR312G4_PLANNING_CONTRACT.sourceNeutralMetricAxisCount !== 8
  ) {
    throw new Error('fr312g4_axis_registry_drift');
  }

  if (
    FR312G4_REQUIRED_NUMERIC_APPROVAL_INPUTS.length !== 7
    || !unique(FR312G4_REQUIRED_NUMERIC_APPROVAL_INPUTS)
    || FR312G4_PLANNING_CONTRACT.futurePrecisionTargetRequiresPreRegistration
      !== true
    || FR312G4_PLANNING_CONTRACT.participantClusteredResamplingPreferred
      !== true
    || FR312G4_PLANNING_CONTRACT.repeatedCaptureRowsMustNotInflateEffectiveN
      !== true
    || FR312G4_PLANNING_CONTRACT.availabilityAndWithdrawalSensitivityMustBeReported
      !== true
  ) {
    throw new Error('fr312g4_sizing_method_drift');
  }

  if (
    FR312F_SAMPLE_DESIGN.participantCount !== null
    || FR312F_SAMPLE_DESIGN.participantCountAuthorized !== false
    || FR312F_SAMPLE_DESIGN.partitionRatios !== null
    || FR312G4_PLANNING_CONTRACT.uncertaintyTargetPerAxis !== null
    || FR312G4_PLANNING_CONTRACT.varianceAndMissingnessEvidence !== null
    || FR312G4_PLANNING_CONTRACT.withdrawalAndAttritionAssumptions !== null
    || FR312G4_PLANNING_CONTRACT.prospectiveParticipantCount !== null
    || FR312G4_PLANNING_CONTRACT.developmentEffectiveParticipantCount !== null
    || FR312G4_PLANNING_CONTRACT.partitionAllocation !== null
    || FR312G4_PLANNING_CONTRACT.reliabilityAcceptanceThreshold !== null
    || FR312G4_PLANNING_CONTRACT.participantCountAuthorized !== false
    || FR312G4_PLANNING_CONTRACT.numericInputsIssued !== false
  ) {
    throw new Error('fr312g4_unissued_numeric_authority');
  }

  for (const [key, value] of Object.entries(FR312G4_BLOCKER_ACCOUNTING)) {
    if (key === 'dedicatedRetentionPrivacyPolicyIssued'
      || key === 'dedicatedConsentWithdrawalProtocolIssued'
      || key === 'participantCountSizingMethodDefined') {
      if (value !== true) throw new Error('fr312g4_upstream_or_method_drift:' + key);
    } else if (value !== false) {
      throw new Error('fr312g4_blocker_prematurely_closed:' + key);
    }
  }

  for (const [key, value] of Object.entries(FR312G4_AUTHORITY_BOUNDARY)) {
    if (value !== false) {
      throw new Error('fr312g4_authority_widening:' + key);
    }
  }
}
