import {
  FR148_NEXT_FRONTIER,
  getSquareBroadFangCaptureQualityCandidateFeatureContractFR148,
  type SquareBroadFangCaptureQualityCandidateFeatureRefFR148V1,
} from './five-officers-square-broad-fang-capture-quality-candidate-features-fr148.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR149_RECORD_ID =
  'research.face_reading.shenxiang.five_officers.square_broad_fang_capture_quality_controlled_perturbation_protocol.fr149' as const;
export const FR149_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr149-square-broad-fang-capture-quality-controlled-perturbation-protocol.md' as const;
export const FR149_NEXT_FRONTIER =
  'square_broad_fang_capture_quality_controlled_perturbation_execution_and_independent_multi_session_evidence_collection_before_construct_validation_or_thresholds' as const;

const ISSUED = new WeakSet<object>();

export type SquareBroadFangControlledPerturbationFamilyRefFR149V1 =
  | 'perturbation.capture_quality.global_intensity_darkening'
  | 'perturbation.capture_quality.global_intensity_brightening'
  | 'perturbation.capture_quality.gaussian_blur'
  | 'perturbation.capture_quality.spatial_illumination_gradient'
  | 'perturbation.capture_quality.opaque_region_mask_negative_control';

export type SquareBroadFangPerturbationExpectedTrendFR149V1 =
  | 'non_increasing_with_strength'
  | 'non_decreasing_with_strength'
  | 'magnitude_change_expected_direction_not_fixed'
  | 'no_directional_acceptance_rule';

export interface SquareBroadFangPerturbationFeatureHypothesisFR149V1 {
  readonly featureRef: SquareBroadFangCaptureQualityCandidateFeatureRefFR148V1;
  readonly role: 'primary' | 'diagnostic';
  readonly expectedTrend: SquareBroadFangPerturbationExpectedTrendFR149V1;
  readonly validationStatus: 'hypothesis_only_unvalidated';
  readonly numericAcceptanceThreshold: null;
}

export interface SquareBroadFangControlledPerturbationFamilyFR149V1 {
  readonly perturbationRef: SquareBroadFangControlledPerturbationFamilyRefFR149V1;
  readonly purpose:
    | 'global_intensity_low_side_probe'
    | 'global_intensity_high_side_probe'
    | 'local_high_frequency_attenuation_probe'
    | 'spatial_intensity_balance_probe'
    | 'occlusion_conflation_negative_control_only';
  readonly requiredAtExecution: true;
  readonly baselineVariantRequired: true;
  readonly minimumDistinctNonBaselineStrengths: 2;
  readonly strengthSchedulePreRegisteredBeforeExecution: true;
  readonly sameDecodedSourceRasterLineageRequired: true;
  readonly singleFactorManipulationRequired: true;
  readonly transformationImplementationPinnedBeforeExecution: true;
  readonly rawRasterPersistenceAllowed: false;
  readonly sourceDigestPersistenceAllowed: false;
  readonly qualityLabelIssued: false;
  readonly featureHypotheses: readonly SquareBroadFangPerturbationFeatureHypothesisFR149V1[];
}

export interface SquareBroadFangCaptureQualityPerturbationProtocolFR149V1 {
  readonly schemaVersion: 'fr149-square-broad-fang-capture-quality-controlled-perturbation-protocol-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR149_RECORD_ID;
  readonly authorityState: 'controlled_perturbation_protocol_frozen_execution_and_construct_validation_not_performed';
  readonly predecessor: {
    readonly fr148NextFrontier: typeof FR148_NEXT_FRONTIER;
    readonly fr148CandidateFeatureCount: 6;
    readonly fr148FormulasFrozenBeforeEmpiricalValidation: true;
    readonly fr148CaptureQualityMeasurementConstructValidated: false;
    readonly fr148CaptureQualityThresholdsDefined: false;
    readonly fr148RepeatabilityInterpretationAllowed: false;
  };
  readonly perturbationDesign: {
    readonly protocolFrozenBeforeEmpiricalExecution: true;
    readonly requiredFamilyCount: 5;
    readonly baselineAndPerturbedVariantsRemainSameSourceLineage: true;
    readonly minimumDistinctNonBaselineStrengthsPerFamily: 2;
    readonly strengthScheduleMustBePreRegistered: true;
    readonly perturbationImplementationMustBePinned: true;
    readonly perturbationParameterMustBeRecordedWithoutImageBytes: true;
    readonly singleFactorManipulationRequired: true;
    readonly candidateFeatureValuesMayBeRecorded: true;
    readonly rawPixelRasterMayBeRecorded: false;
    readonly rawImageMayBeRecorded: false;
    readonly sourceDigestMayBeRecorded: false;
    readonly providerPayloadMayBeRecorded: false;
    readonly traditionalInterpretationMayBeRecorded: false;
  };
  readonly perturbationFamilies: readonly SquareBroadFangControlledPerturbationFamilyFR149V1[];
  readonly empiricalAdmissionRequirements: {
    readonly realOrSourceBackedRasterExecutionRequired: true;
    readonly syntheticArithmeticFixturesAloneSufficient: false;
    readonly eachRequiredFamilyExecutedAgainstEachAdmittedBaseline: true;
    readonly baselineAndPerturbedCandidateFeaturesMustUseFrozenFR148Formulas: true;
    readonly executionEvidenceMustPreservePerturbationStrengthOrder: true;
    readonly observedTrendMustBeEvaluatedWithoutInventingPostHocThresholds: true;
    readonly constructValidationDecisionDeferredToLaterEvidenceReview: true;
  };
  readonly multiSessionEvidenceTrack: {
    readonly independentTrackRequiredBeforeRepeatabilityInterpretation: true;
    readonly minimumDistinctSessionRefs: 2;
    readonly distinctSessionRefsAloneProveIndependence: false;
    readonly independentSessionEvidenceRefRequiredForIndependenceClaim: true;
    readonly retroactiveRelabelingOfHistoricalCapturesForbidden: true;
    readonly captureTimestampRequired: false;
    readonly deviceIdentifierRequired: false;
    readonly geolocationRequired: false;
    readonly currentHistoricalFR146PairProvesIndependentSessions: false;
    readonly independentMultiSessionEvidenceAdmitted: false;
  };
  readonly measurementBoundary: {
    readonly controlledPerturbationProtocolFrozen: true;
    readonly empiricalPerturbationExecutionPerformed: false;
    readonly empiricalPerturbationValidationPerformed: false;
    readonly captureQualityMeasurementConstructValidated: false;
    readonly exposureMetricValidated: false;
    readonly sharpnessMetricValidated: false;
    readonly lightingMetricValidated: false;
    readonly occlusionValidityVerified: false;
    readonly captureQualityThresholdsDefined: false;
    readonly captureQualityValidated: false;
    readonly repeatabilityInterpretationAllowed: false;
    readonly empiricalRepeatabilityEstablished: false;
    readonly numericCaptureQualityThreshold: null;
    readonly numericRepeatabilityAcceptanceThreshold: null;
  };
  readonly privacyBoundary: {
    readonly rawImagePersisted: false;
    readonly rawProviderResponsePersisted: false;
    readonly sourceDigestPersisted: false;
    readonly sourceDigestReturned: false;
    readonly embeddingPersisted: false;
    readonly identityTemplatePersisted: false;
    readonly rawPixelRasterPersisted: false;
  };
  readonly semanticAuthority: {
    readonly constructValidity: 'unresolved';
    readonly traditionalBinding: 'unresolved';
    readonly criterionState: null;
    readonly structuredClaim: null;
    readonly boundedNarrative: null;
  };
  readonly traditionalSemanticAuthority: false;
  readonly researchNoteRef: typeof FR149_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR149_NEXT_FRONTIER;
}

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-149 ${message}`);
}

function hypothesis(
  featureRef: SquareBroadFangCaptureQualityCandidateFeatureRefFR148V1,
  role: 'primary' | 'diagnostic',
  expectedTrend: SquareBroadFangPerturbationExpectedTrendFR149V1,
): SquareBroadFangPerturbationFeatureHypothesisFR149V1 {
  return Object.freeze({
    featureRef,
    role,
    expectedTrend,
    validationStatus: 'hypothesis_only_unvalidated' as const,
    numericAcceptanceThreshold: null,
  });
}

function family(
  perturbationRef: SquareBroadFangControlledPerturbationFamilyRefFR149V1,
  purpose: SquareBroadFangControlledPerturbationFamilyFR149V1['purpose'],
  featureHypotheses: readonly SquareBroadFangPerturbationFeatureHypothesisFR149V1[],
): SquareBroadFangControlledPerturbationFamilyFR149V1 {
  return Object.freeze({
    perturbationRef,
    purpose,
    requiredAtExecution: true as const,
    baselineVariantRequired: true as const,
    minimumDistinctNonBaselineStrengths: 2 as const,
    strengthSchedulePreRegisteredBeforeExecution: true as const,
    sameDecodedSourceRasterLineageRequired: true as const,
    singleFactorManipulationRequired: true as const,
    transformationImplementationPinnedBeforeExecution: true as const,
    rawRasterPersistenceAllowed: false as const,
    sourceDigestPersistenceAllowed: false as const,
    qualityLabelIssued: false as const,
    featureHypotheses: Object.freeze([...featureHypotheses]),
  });
}

function buildPerturbationFamilies(): readonly SquareBroadFangControlledPerturbationFamilyFR149V1[] {
  return Object.freeze([
    family(
      'perturbation.capture_quality.global_intensity_darkening',
      'global_intensity_low_side_probe',
      [
        hypothesis('candidate.capture_quality.rgb_sum_mean_normalized', 'primary', 'non_increasing_with_strength'),
        hypothesis('candidate.capture_quality.any_channel_zero_fraction', 'diagnostic', 'non_decreasing_with_strength'),
        hypothesis('candidate.capture_quality.any_channel_full_scale_fraction', 'diagnostic', 'non_increasing_with_strength'),
      ],
    ),
    family(
      'perturbation.capture_quality.global_intensity_brightening',
      'global_intensity_high_side_probe',
      [
        hypothesis('candidate.capture_quality.rgb_sum_mean_normalized', 'primary', 'non_decreasing_with_strength'),
        hypothesis('candidate.capture_quality.any_channel_full_scale_fraction', 'diagnostic', 'non_decreasing_with_strength'),
        hypothesis('candidate.capture_quality.any_channel_zero_fraction', 'diagnostic', 'non_increasing_with_strength'),
      ],
    ),
    family(
      'perturbation.capture_quality.gaussian_blur',
      'local_high_frequency_attenuation_probe',
      [
        hypothesis('candidate.capture_quality.adjacent_rgb_sum_rms_difference_normalized', 'primary', 'non_increasing_with_strength'),
        hypothesis('candidate.capture_quality.rgb_sum_standard_deviation_normalized', 'diagnostic', 'no_directional_acceptance_rule'),
      ],
    ),
    family(
      'perturbation.capture_quality.spatial_illumination_gradient',
      'spatial_intensity_balance_probe',
      [
        hypothesis('candidate.capture_quality.intensity_centroid_offset_magnitude_normalized', 'primary', 'magnitude_change_expected_direction_not_fixed'),
        hypothesis('candidate.capture_quality.rgb_sum_mean_normalized', 'diagnostic', 'no_directional_acceptance_rule'),
        hypothesis('candidate.capture_quality.rgb_sum_standard_deviation_normalized', 'diagnostic', 'no_directional_acceptance_rule'),
      ],
    ),
    family(
      'perturbation.capture_quality.opaque_region_mask_negative_control',
      'occlusion_conflation_negative_control_only',
      [
        hypothesis('candidate.capture_quality.rgb_sum_mean_normalized', 'diagnostic', 'no_directional_acceptance_rule'),
        hypothesis('candidate.capture_quality.rgb_sum_standard_deviation_normalized', 'diagnostic', 'no_directional_acceptance_rule'),
        hypothesis('candidate.capture_quality.adjacent_rgb_sum_rms_difference_normalized', 'diagnostic', 'no_directional_acceptance_rule'),
        hypothesis('candidate.capture_quality.any_channel_zero_fraction', 'diagnostic', 'no_directional_acceptance_rule'),
        hypothesis('candidate.capture_quality.any_channel_full_scale_fraction', 'diagnostic', 'no_directional_acceptance_rule'),
        hypothesis('candidate.capture_quality.intensity_centroid_offset_magnitude_normalized', 'diagnostic', 'no_directional_acceptance_rule'),
      ],
    ),
  ]);
}

export function getSquareBroadFangCaptureQualityPerturbationProtocolContractFR149() {
  const predecessor = getSquareBroadFangCaptureQualityCandidateFeatureContractFR148();
  if (
    predecessor.nextFrontier !== FR148_NEXT_FRONTIER
    || predecessor.candidateDefinitions.featureCount !== 6
    || predecessor.candidateDefinitions.formulasFrozenBeforeEmpiricalValidation !== true
    || predecessor.authorityBoundary.candidateFeatureDefinitionMeansCaptureQualityConstructValidated !== false
    || predecessor.authorityBoundary.captureQualityThresholdsDefined !== false
    || predecessor.authorityBoundary.repeatabilityInterpretationAllowed !== false
    || predecessor.authorityBoundary.empiricalRepeatabilityEstablished !== false
    || predecessor.authorityBoundary.traditionalSemanticAuthority !== false
  ) fail('FR-148 predecessor contract drift.');

  return Object.freeze({
    schemaVersion: 'fr149-square-broad-fang-capture-quality-controlled-perturbation-protocol-contract-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR149_RECORD_ID,
    predecessor: Object.freeze({ fr148NextFrontier: FR148_NEXT_FRONTIER }),
    protocolBoundary: Object.freeze({
      requiredPerturbationFamilyCount: 5 as const,
      minimumDistinctNonBaselineStrengthsPerFamily: 2 as const,
      protocolFrozenBeforeEmpiricalExecution: true as const,
      syntheticFixturesAloneSufficientForConstructValidity: false as const,
      independentMultiSessionEvidenceRequiredBeforeRepeatabilityInterpretation: true as const,
      historicalSessionRelabelingAllowed: false as const,
      captureQualityThresholdsDefined: false as const,
      repeatabilityThresholdsDefined: false as const,
      traditionalSemanticAuthority: false as const,
    }),
    nextFrontier: FR149_NEXT_FRONTIER,
  });
}

export function materializeSquareBroadFangCaptureQualityPerturbationProtocolFR149(): SquareBroadFangCaptureQualityPerturbationProtocolFR149V1 {
  const contract = getSquareBroadFangCaptureQualityPerturbationProtocolContractFR149();
  if (contract.nextFrontier !== FR149_NEXT_FRONTIER) fail('FR-149 contract drift at materialization time.');

  const perturbationFamilies = buildPerturbationFamilies();
  if (perturbationFamilies.length !== 5) fail('required perturbation family count drift.');
  if (perturbationFamilies.some((entry) => entry.featureHypotheses.length === 0)) {
    fail('every perturbation family must have at least one pre-registered feature hypothesis.');
  }

  const output: SquareBroadFangCaptureQualityPerturbationProtocolFR149V1 = Object.freeze({
    schemaVersion: 'fr149-square-broad-fang-capture-quality-controlled-perturbation-protocol-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR149_RECORD_ID,
    authorityState: 'controlled_perturbation_protocol_frozen_execution_and_construct_validation_not_performed' as const,
    predecessor: Object.freeze({
      fr148NextFrontier: FR148_NEXT_FRONTIER,
      fr148CandidateFeatureCount: 6 as const,
      fr148FormulasFrozenBeforeEmpiricalValidation: true as const,
      fr148CaptureQualityMeasurementConstructValidated: false as const,
      fr148CaptureQualityThresholdsDefined: false as const,
      fr148RepeatabilityInterpretationAllowed: false as const,
    }),
    perturbationDesign: Object.freeze({
      protocolFrozenBeforeEmpiricalExecution: true as const,
      requiredFamilyCount: 5 as const,
      baselineAndPerturbedVariantsRemainSameSourceLineage: true as const,
      minimumDistinctNonBaselineStrengthsPerFamily: 2 as const,
      strengthScheduleMustBePreRegistered: true as const,
      perturbationImplementationMustBePinned: true as const,
      perturbationParameterMustBeRecordedWithoutImageBytes: true as const,
      singleFactorManipulationRequired: true as const,
      candidateFeatureValuesMayBeRecorded: true as const,
      rawPixelRasterMayBeRecorded: false as const,
      rawImageMayBeRecorded: false as const,
      sourceDigestMayBeRecorded: false as const,
      providerPayloadMayBeRecorded: false as const,
      traditionalInterpretationMayBeRecorded: false as const,
    }),
    perturbationFamilies,
    empiricalAdmissionRequirements: Object.freeze({
      realOrSourceBackedRasterExecutionRequired: true as const,
      syntheticArithmeticFixturesAloneSufficient: false as const,
      eachRequiredFamilyExecutedAgainstEachAdmittedBaseline: true as const,
      baselineAndPerturbedCandidateFeaturesMustUseFrozenFR148Formulas: true as const,
      executionEvidenceMustPreservePerturbationStrengthOrder: true as const,
      observedTrendMustBeEvaluatedWithoutInventingPostHocThresholds: true as const,
      constructValidationDecisionDeferredToLaterEvidenceReview: true as const,
    }),
    multiSessionEvidenceTrack: Object.freeze({
      independentTrackRequiredBeforeRepeatabilityInterpretation: true as const,
      minimumDistinctSessionRefs: 2 as const,
      distinctSessionRefsAloneProveIndependence: false as const,
      independentSessionEvidenceRefRequiredForIndependenceClaim: true as const,
      retroactiveRelabelingOfHistoricalCapturesForbidden: true as const,
      captureTimestampRequired: false as const,
      deviceIdentifierRequired: false as const,
      geolocationRequired: false as const,
      currentHistoricalFR146PairProvesIndependentSessions: false as const,
      independentMultiSessionEvidenceAdmitted: false as const,
    }),
    measurementBoundary: Object.freeze({
      controlledPerturbationProtocolFrozen: true as const,
      empiricalPerturbationExecutionPerformed: false as const,
      empiricalPerturbationValidationPerformed: false as const,
      captureQualityMeasurementConstructValidated: false as const,
      exposureMetricValidated: false as const,
      sharpnessMetricValidated: false as const,
      lightingMetricValidated: false as const,
      occlusionValidityVerified: false as const,
      captureQualityThresholdsDefined: false as const,
      captureQualityValidated: false as const,
      repeatabilityInterpretationAllowed: false as const,
      empiricalRepeatabilityEstablished: false as const,
      numericCaptureQualityThreshold: null,
      numericRepeatabilityAcceptanceThreshold: null,
    }),
    privacyBoundary: Object.freeze({
      rawImagePersisted: false as const,
      rawProviderResponsePersisted: false as const,
      sourceDigestPersisted: false as const,
      sourceDigestReturned: false as const,
      embeddingPersisted: false as const,
      identityTemplatePersisted: false as const,
      rawPixelRasterPersisted: false as const,
    }),
    semanticAuthority: Object.freeze({
      constructValidity: 'unresolved' as const,
      traditionalBinding: 'unresolved' as const,
      criterionState: null,
      structuredClaim: null,
      boundedNarrative: null,
    }),
    traditionalSemanticAuthority: false as const,
    researchNoteRef: FR149_RESEARCH_NOTE_REF,
    nextFrontier: FR149_NEXT_FRONTIER,
  });

  ISSUED.add(output);
  return output;
}

export function assertIssuedSquareBroadFangCaptureQualityPerturbationProtocolFR149(
  value: SquareBroadFangCaptureQualityPerturbationProtocolFR149V1,
): void {
  if (!ISSUED.has(value)) fail('perturbation protocol was not issued by the active FR-149 boundary.');
}
