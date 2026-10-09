import {
  getNeutralMouthContourMetricDefinitionFR80,
} from './neutral-mouth-contour-metric-fr80.js';
import {
  getNeutralMouthRelativeSizeMetricDefinitionFR82,
} from './neutral-mouth-relative-size-metric-fr82.js';
import {
  FR291_VISIBLE_GROOVE_AXIS_METRIC_REF,
  FR291_VISIBLE_GROOVE_WIDTH_METRIC_REF,
} from './visible-philtrum-geometry-fr291.js';
import {
  FR293_COMBINED_AREA_METRIC_REF,
  FR293_LOWER_VERTICAL_SPAN_METRIC_REF,
  FR293_UPPER_VERTICAL_SPAN_METRIC_REF,
} from './visible-lip-band-fullness-fr293.js';
import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  FR312F_DATASET_DESIGN,
  FR312F_METRIC_TIMING,
  FR312F_PARTITION_POLICY,
  FR312F_PRIVACY_PREREQUISITES,
  FR312F_SAMPLE_DESIGN,
  assertMorphologyPilotDatasetCaptureProtocolFR312F,
} from './traditional-morphology-pilot-dataset-capture-protocol-fr312f.js';

export const FR312G_PROTOCOL_ID =
  'fr312g.neutral_metric_reliability_study_design' as const;

export type NeutralComparatorKeyFR312G =
  | 'mouth.philtrum_length_width'
  | 'mouth.width_and_relative_size'
  | 'mouth.corner_orientation'
  | 'mouth.visible_lip_fullness';

export type NeutralMetricReliabilityAxisStateFR312G =
  | 'not_executed'
  | 'insufficient_evidence'
  | 'reliability_concern'
  | 'eligible_for_fr312h_review';

export type NeutralMetricDescriptiveStatisticFR312G =
  | 'capture_count'
  | 'available_count'
  | 'unavailable_count'
  | 'missingness_rate'
  | 'within_session_absolute_pair_difference'
  | 'between_session_absolute_session_mean_difference'
  | 'within_participant_range'
  | 'unavailable_reason_count';

export interface NeutralMetricReliabilityAxisFR312G {
  readonly comparatorKey: NeutralComparatorKeyFR312G;
  readonly metricRef: string;
  readonly sourceModule: string;
  readonly unit: 'ratio';
  readonly signedValueAllowed: boolean;
  readonly scaleInvariant: true;
  readonly classificationApplied: false;
  readonly thresholdApplied: false;
  readonly calibrationApplied: false;
  readonly traditionalBindingApplied: false;
  readonly missingValueImputationAuthorized: false;
  readonly unavailableFallbackAuthorized: false;
  readonly currentReliabilityState: 'not_executed';
}

export interface NeutralMetricReliabilityFamilyFR312G {
  readonly comparatorKey: NeutralComparatorKeyFR312G;
  readonly sourceFeatureMaterializedRequired: true;
  readonly metricAxes: readonly NeutralMetricReliabilityAxisFR312G[];
  readonly axisCount: number;
  readonly aggregateReliabilityScoreAuthorized: false;
  readonly morphologyLabelReadableDuringReliabilityStudy: false;
  readonly traditionalSemanticClaimReadableDuringReliabilityStudy: false;
  readonly axisSelectionForTraditionalEquivalenceAuthorized: false;
}

export interface NeutralMetricRepeatabilityProtocolFR312G {
  readonly executionPartition: 'development';
  readonly calibrationPartitionReadable: false;
  readonly holdoutPartitionReadable: false;
  readonly admittedImagesOnlyForMetricValues: true;
  readonly rejectedOrUnavailableCaptureMayCreateMetricValue: false;
  readonly withinSessionDesign:
    'compare_two_accepted_captures_within_each_session';
  readonly betweenSessionDesign:
    'compare_session_means_across_two_temporally_distinct_sessions';
  readonly withinParticipantRangeReported: true;
  readonly rawPairwiseDirectionalityClaimAuthorized: false;
  readonly sessionOrderEffectClaimAuthorized: false;
  readonly numericReliabilityAcceptanceThreshold: null;
  readonly reliabilityPassFailAutomationAuthorized: false;
}

export interface NeutralMetricMissingnessProtocolFR312G {
  readonly unavailableRecordedSeparatelyFromNumericValue: true;
  readonly unavailableReasonRequired: true;
  readonly missingValueImputationAuthorized: false;
  readonly zeroSubstitutionAuthorized: false;
  readonly lastObservationCarryForwardAuthorized: false;
  readonly unavailableFallbackMetricAuthorized: false;
  readonly missingnessRateReportedPerAxis: true;
  readonly missingnessRateReportedPerComparatorFamily: true;
  readonly missingnessAcceptanceThreshold: null;
}

export interface NeutralMetricCaptureSensitivityProtocolFR312G {
  readonly onlyFR312FAdmittedCaptureVariationAnalyzed: true;
  readonly outOfProtocolPerturbationUsedForPrimaryReliability: false;
  readonly poseSensitivityReviewed: true;
  readonly expressionSensitivityReviewed: true;
  readonly framingSensitivityReviewed: true;
  readonly imageQualitySensitivityReviewed: true;
  readonly sessionSensitivityReviewed: true;
  readonly captureSequenceSensitivityReviewed: true;
  readonly numericPoseBoundaryIntroducedByFR312G: false;
  readonly numericExpressionBoundaryIntroducedByFR312G: false;
  readonly numericFramingBoundaryIntroducedByFR312G: false;
  readonly numericImageQualityBoundaryIntroducedByFR312G: false;
  readonly sensitivityAcceptanceThreshold: null;
  readonly descriptiveReviewOnly: true;
}

export interface NeutralMetricReliabilityEvidenceContractFR312G {
  readonly descriptiveStatisticsAllowed:
    readonly NeutralMetricDescriptiveStatisticFR312G[];
  readonly perAxisEvidenceRequired: true;
  readonly perComparatorFamilySummaryRequired: true;
  readonly perParticipantRepeatFamilyTraceRequired: true;
  readonly unavailableReasonDistributionRequired: true;
  readonly disagreementWithMorphologyAnnotationAnalyzed: false;
  readonly morphologyLabelAssociationAnalyzed: false;
  readonly thresholdSearchAnalyzed: false;
  readonly reliabilityResultMayValidateTraditionalMeaning: false;
}

export interface NeutralMetricReliabilityGateFR312G {
  readonly currentStudyState: 'not_executed';
  readonly allowedFutureAxisReviewOutcomes: readonly [
    'insufficient_evidence',
    'reliability_concern',
    'eligible_for_fr312h_review',
  ];
  readonly fr312hMayUseAxisWithoutEligibleReviewOutcome: false;
  readonly oneAxisOutcomeAutomaticallyPromotesComparatorFamily: false;
  readonly aggregateAcrossAxesAuthorized: false;
  readonly numericMinimumAcceptanceValueAuthorized: false;
  readonly productionPromotionAuthorized: false;
}

function axis(
  comparatorKey: NeutralComparatorKeyFR312G,
  metricRef: string,
  sourceModule: string,
  signedValueAllowed: boolean,
): NeutralMetricReliabilityAxisFR312G {
  return Object.freeze({
    comparatorKey,
    metricRef,
    sourceModule,
    unit: 'ratio' as const,
    signedValueAllowed,
    scaleInvariant: true as const,
    classificationApplied: false as const,
    thresholdApplied: false as const,
    calibrationApplied: false as const,
    traditionalBindingApplied: false as const,
    missingValueImputationAuthorized: false as const,
    unavailableFallbackAuthorized: false as const,
    currentReliabilityState: 'not_executed' as const,
  });
}

const FR80_DEFINITION = getNeutralMouthContourMetricDefinitionFR80();
const FR82_DEFINITION = getNeutralMouthRelativeSizeMetricDefinitionFR82();

export const FR312G_RELIABILITY_FAMILIES:
readonly NeutralMetricReliabilityFamilyFR312G[] = Object.freeze([
  Object.freeze({
    comparatorKey: 'mouth.philtrum_length_width' as const,
    sourceFeatureMaterializedRequired: true as const,
    metricAxes: Object.freeze([
      axis(
        'mouth.philtrum_length_width',
        FR291_VISIBLE_GROOVE_AXIS_METRIC_REF,
        'packages/face-reading/src/visible-philtrum-geometry-fr291.ts',
        false,
      ),
      axis(
        'mouth.philtrum_length_width',
        FR291_VISIBLE_GROOVE_WIDTH_METRIC_REF,
        'packages/face-reading/src/visible-philtrum-geometry-fr291.ts',
        false,
      ),
    ]),
    axisCount: 2,
    aggregateReliabilityScoreAuthorized: false as const,
    morphologyLabelReadableDuringReliabilityStudy: false as const,
    traditionalSemanticClaimReadableDuringReliabilityStudy: false as const,
    axisSelectionForTraditionalEquivalenceAuthorized: false as const,
  }),
  Object.freeze({
    comparatorKey: 'mouth.width_and_relative_size' as const,
    sourceFeatureMaterializedRequired: true as const,
    metricAxes: Object.freeze([
      axis(
        'mouth.width_and_relative_size',
        FR80_DEFINITION.metricRef,
        'packages/face-reading/src/neutral-mouth-contour-metric-fr80.ts',
        false,
      ),
      axis(
        'mouth.width_and_relative_size',
        FR82_DEFINITION.metricRef,
        'packages/face-reading/src/neutral-mouth-relative-size-metric-fr82.ts',
        false,
      ),
    ]),
    axisCount: 2,
    aggregateReliabilityScoreAuthorized: false as const,
    morphologyLabelReadableDuringReliabilityStudy: false as const,
    traditionalSemanticClaimReadableDuringReliabilityStudy: false as const,
    axisSelectionForTraditionalEquivalenceAuthorized: false as const,
  }),
  Object.freeze({
    comparatorKey: 'mouth.corner_orientation' as const,
    sourceFeatureMaterializedRequired: true as const,
    metricAxes: Object.freeze([
      axis(
        'mouth.corner_orientation',
        'neutral.mouth.corner_elevation.mean_to_mouth_width_ratio@0.1.0',
        'packages/face-reading/src/visible-mouth-corner-orientation-fr212.ts',
        true,
      ),
    ]),
    axisCount: 1,
    aggregateReliabilityScoreAuthorized: false as const,
    morphologyLabelReadableDuringReliabilityStudy: false as const,
    traditionalSemanticClaimReadableDuringReliabilityStudy: false as const,
    axisSelectionForTraditionalEquivalenceAuthorized: false as const,
  }),
  Object.freeze({
    comparatorKey: 'mouth.visible_lip_fullness' as const,
    sourceFeatureMaterializedRequired: true as const,
    metricAxes: Object.freeze([
      axis(
        'mouth.visible_lip_fullness',
        FR293_UPPER_VERTICAL_SPAN_METRIC_REF,
        'packages/face-reading/src/visible-lip-band-fullness-fr293.ts',
        false,
      ),
      axis(
        'mouth.visible_lip_fullness',
        FR293_LOWER_VERTICAL_SPAN_METRIC_REF,
        'packages/face-reading/src/visible-lip-band-fullness-fr293.ts',
        false,
      ),
      axis(
        'mouth.visible_lip_fullness',
        FR293_COMBINED_AREA_METRIC_REF,
        'packages/face-reading/src/visible-lip-band-fullness-fr293.ts',
        false,
      ),
    ]),
    axisCount: 3,
    aggregateReliabilityScoreAuthorized: false as const,
    morphologyLabelReadableDuringReliabilityStudy: false as const,
    traditionalSemanticClaimReadableDuringReliabilityStudy: false as const,
    axisSelectionForTraditionalEquivalenceAuthorized: false as const,
  }),
]);

export const FR312G_REPEATABILITY_PROTOCOL:
NeutralMetricRepeatabilityProtocolFR312G = Object.freeze({
  executionPartition: 'development',
  calibrationPartitionReadable: false,
  holdoutPartitionReadable: false,
  admittedImagesOnlyForMetricValues: true,
  rejectedOrUnavailableCaptureMayCreateMetricValue: false,
  withinSessionDesign:
    'compare_two_accepted_captures_within_each_session',
  betweenSessionDesign:
    'compare_session_means_across_two_temporally_distinct_sessions',
  withinParticipantRangeReported: true,
  rawPairwiseDirectionalityClaimAuthorized: false,
  sessionOrderEffectClaimAuthorized: false,
  numericReliabilityAcceptanceThreshold: null,
  reliabilityPassFailAutomationAuthorized: false,
});

export const FR312G_MISSINGNESS_PROTOCOL:
NeutralMetricMissingnessProtocolFR312G = Object.freeze({
  unavailableRecordedSeparatelyFromNumericValue: true,
  unavailableReasonRequired: true,
  missingValueImputationAuthorized: false,
  zeroSubstitutionAuthorized: false,
  lastObservationCarryForwardAuthorized: false,
  unavailableFallbackMetricAuthorized: false,
  missingnessRateReportedPerAxis: true,
  missingnessRateReportedPerComparatorFamily: true,
  missingnessAcceptanceThreshold: null,
});

export const FR312G_CAPTURE_SENSITIVITY_PROTOCOL:
NeutralMetricCaptureSensitivityProtocolFR312G = Object.freeze({
  onlyFR312FAdmittedCaptureVariationAnalyzed: true,
  outOfProtocolPerturbationUsedForPrimaryReliability: false,
  poseSensitivityReviewed: true,
  expressionSensitivityReviewed: true,
  framingSensitivityReviewed: true,
  imageQualitySensitivityReviewed: true,
  sessionSensitivityReviewed: true,
  captureSequenceSensitivityReviewed: true,
  numericPoseBoundaryIntroducedByFR312G: false,
  numericExpressionBoundaryIntroducedByFR312G: false,
  numericFramingBoundaryIntroducedByFR312G: false,
  numericImageQualityBoundaryIntroducedByFR312G: false,
  sensitivityAcceptanceThreshold: null,
  descriptiveReviewOnly: true,
});

export const FR312G_EVIDENCE_CONTRACT:
NeutralMetricReliabilityEvidenceContractFR312G = Object.freeze({
  descriptiveStatisticsAllowed: Object.freeze([
    'capture_count',
    'available_count',
    'unavailable_count',
    'missingness_rate',
    'within_session_absolute_pair_difference',
    'between_session_absolute_session_mean_difference',
    'within_participant_range',
    'unavailable_reason_count',
  ] as const),
  perAxisEvidenceRequired: true,
  perComparatorFamilySummaryRequired: true,
  perParticipantRepeatFamilyTraceRequired: true,
  unavailableReasonDistributionRequired: true,
  disagreementWithMorphologyAnnotationAnalyzed: false,
  morphologyLabelAssociationAnalyzed: false,
  thresholdSearchAnalyzed: false,
  reliabilityResultMayValidateTraditionalMeaning: false,
});

export const FR312G_RELIABILITY_GATE:
NeutralMetricReliabilityGateFR312G = Object.freeze({
  currentStudyState: 'not_executed',
  allowedFutureAxisReviewOutcomes: Object.freeze([
    'insufficient_evidence',
    'reliability_concern',
    'eligible_for_fr312h_review',
  ] as const),
  fr312hMayUseAxisWithoutEligibleReviewOutcome: false,
  oneAxisOutcomeAutomaticallyPromotesComparatorFamily: false,
  aggregateAcrossAxesAuthorized: false,
  numericMinimumAcceptanceValueAuthorized: false,
  productionPromotionAuthorized: false,
});

export const FR312G_COLLECTION_PREREQUISITES = Object.freeze({
  inheritedFR312FParticipantCollectionAuthorized:
    FR312F_PRIVACY_PREREQUISITES.actualParticipantCollectionAuthorized,
  finiteReviewImageRetentionIssued:
    FR312F_PRIVACY_PREREQUISITES.finiteReviewImageRetentionIssued,
  consentAndWithdrawalProcedureIssued:
    FR312F_PRIVACY_PREREQUISITES.consentAndWithdrawalProcedureIssued,
  participantCountAuthorized:
    FR312F_SAMPLE_DESIGN.participantCountAuthorized,
  partitionRatiosAuthorized:
    FR312F_SAMPLE_DESIGN.partitionRatiosAuthorized,
  executionAuthorized: false as const,
});

export const FR312G_STUDY_DESIGN = Object.freeze({
  protocolId: FR312G_PROTOCOL_ID,
  authorityState:
    'neutral_metric_reliability_protocol_defined_not_executed' as const,
  comparatorFamilyCount: 4 as const,
  neutralMetricAxisCount: 8 as const,
  sourceComparatorKeys: Object.freeze([
    ...FR312F_METRIC_TIMING.comparatorKeys,
  ]),
  families: FR312G_RELIABILITY_FAMILIES,
  repeatability: FR312G_REPEATABILITY_PROTOCOL,
  missingness: FR312G_MISSINGNESS_PROTOCOL,
  captureSensitivity: FR312G_CAPTURE_SENSITIVITY_PROTOCOL,
  evidenceContract: FR312G_EVIDENCE_CONTRACT,
  reliabilityGate: FR312G_RELIABILITY_GATE,
  collectionPrerequisites: FR312G_COLLECTION_PREREQUISITES,
  nextFrontier:
    'execute_only_after_collection_prerequisites_then_review_axis_reliability_before_fr312h' as const,
});

export const FR312G_AUTHORITY_BOUNDARY = Object.freeze({
  empiricalExecutionAuthorized: false as const,
  actualParticipantCollectionAuthorized: false as const,
  morphologyLabelAssociationAuthorized: false as const,
  traditionalSemanticClaimValidationAuthorized: false as const,
  thresholdDiscoveryAuthorized: false as const,
  thresholdValueAuthorized: false as const,
  reliabilityAcceptanceThresholdAuthorized: false as const,
  missingnessAcceptanceThresholdAuthorized: false as const,
  sensitivityAcceptanceThresholdAuthorized: false as const,
  calibrationPartitionUseAuthorized: false as const,
  holdoutPartitionUseAuthorized: false as const,
  automaticTraditionalBindingAuthorized: false as const,
  populationNormAuthorized: false as const,
  aggregateReliabilityScoreAuthorized: false as const,
  productInterpretationAuthorized: false as const,
  prohibitedPersonInferenceAuthorized: false as const,
});

function sameSet(
  actual: readonly string[],
  expected: readonly string[],
): boolean {
  return actual.length === expected.length
    && actual.every((value) => expected.includes(value))
    && expected.every((value) => actual.includes(value));
}

export function assertNeutralMetricReliabilityStudyDesignFR312G(): void {
  assertMorphologyPilotDatasetCaptureProtocolFR312F();
  assertFR293ProductColumnMap();

  const expectedComparatorKeys = [
    'mouth.philtrum_length_width',
    'mouth.width_and_relative_size',
    'mouth.corner_orientation',
    'mouth.visible_lip_fullness',
  ] as const;

  if (
    !sameSet(
      FR312F_METRIC_TIMING.comparatorKeys,
      expectedComparatorKeys,
    )
    || !sameSet(
      FR312G_STUDY_DESIGN.sourceComparatorKeys,
      expectedComparatorKeys,
    )
  ) {
    throw new Error('fr312g_comparator_inventory_drift');
  }

  const productMapByKey = new Map(
    FR293_PRODUCT_COLUMN_MAP.map(
      (item) => [item.featureKey, item] as const,
    ),
  );
  for (const comparatorKey of expectedComparatorKeys) {
    const productEntry = productMapByKey.get(comparatorKey);
    if (
      productEntry === undefined
      || productEntry.implementationState
        !== 'canonical_extractor_materialized'
    ) {
      throw new Error(
        'fr312g_comparator_not_materialized:' + comparatorKey,
      );
    }
  }

  if (
    FR312G_RELIABILITY_FAMILIES.length !== 4
    || FR312G_RELIABILITY_FAMILIES.reduce(
      (sum, family) => sum + family.metricAxes.length,
      0,
    ) !== 8
  ) {
    throw new Error('fr312g_family_or_axis_count_drift');
  }

  const axes = FR312G_RELIABILITY_FAMILIES.flatMap(
    (family) => family.metricAxes,
  );
  const metricRefs = axes.map((item) => item.metricRef);
  if (new Set(metricRefs).size !== 8) {
    throw new Error('fr312g_duplicate_metric_ref');
  }

  const expectedMetricRefs = [
    FR291_VISIBLE_GROOVE_AXIS_METRIC_REF,
    FR291_VISIBLE_GROOVE_WIDTH_METRIC_REF,
    FR80_DEFINITION.metricRef,
    FR82_DEFINITION.metricRef,
    'neutral.mouth.corner_elevation.mean_to_mouth_width_ratio@0.1.0',
    FR293_UPPER_VERTICAL_SPAN_METRIC_REF,
    FR293_LOWER_VERTICAL_SPAN_METRIC_REF,
    FR293_COMBINED_AREA_METRIC_REF,
  ];
  if (!sameSet(metricRefs, expectedMetricRefs)) {
    throw new Error('fr312g_metric_axis_inventory_drift');
  }

  for (const family of FR312G_RELIABILITY_FAMILIES) {
    if (
      family.metricAxes.length !== family.axisCount
      || family.sourceFeatureMaterializedRequired !== true
      || family.aggregateReliabilityScoreAuthorized !== false
      || family.morphologyLabelReadableDuringReliabilityStudy !== false
      || family.traditionalSemanticClaimReadableDuringReliabilityStudy
        !== false
      || family.axisSelectionForTraditionalEquivalenceAuthorized !== false
    ) {
      throw new Error(
        'fr312g_family_authority_drift:' + family.comparatorKey,
      );
    }
  }

  for (const item of axes) {
    if (
      item.unit !== 'ratio'
      || item.scaleInvariant !== true
      || item.classificationApplied !== false
      || item.thresholdApplied !== false
      || item.calibrationApplied !== false
      || item.traditionalBindingApplied !== false
      || item.missingValueImputationAuthorized !== false
      || item.unavailableFallbackAuthorized !== false
      || item.currentReliabilityState !== 'not_executed'
    ) {
      throw new Error(
        'fr312g_axis_authority_drift:' + item.metricRef,
      );
    }
  }

  if (
    FR312G_REPEATABILITY_PROTOCOL.executionPartition !== 'development'
    || FR312G_REPEATABILITY_PROTOCOL.calibrationPartitionReadable !== false
    || FR312G_REPEATABILITY_PROTOCOL.holdoutPartitionReadable !== false
    || FR312G_REPEATABILITY_PROTOCOL.admittedImagesOnlyForMetricValues
      !== true
    || FR312G_REPEATABILITY_PROTOCOL
      .rejectedOrUnavailableCaptureMayCreateMetricValue !== false
    || FR312G_REPEATABILITY_PROTOCOL.numericReliabilityAcceptanceThreshold
      !== null
  ) {
    throw new Error('fr312g_repeatability_protocol_drift');
  }

  if (
    FR312G_MISSINGNESS_PROTOCOL.unavailableRecordedSeparatelyFromNumericValue
      !== true
    || FR312G_MISSINGNESS_PROTOCOL.unavailableReasonRequired !== true
    || FR312G_MISSINGNESS_PROTOCOL.missingValueImputationAuthorized !== false
    || FR312G_MISSINGNESS_PROTOCOL.zeroSubstitutionAuthorized !== false
    || FR312G_MISSINGNESS_PROTOCOL.lastObservationCarryForwardAuthorized
      !== false
    || FR312G_MISSINGNESS_PROTOCOL.unavailableFallbackMetricAuthorized
      !== false
    || FR312G_MISSINGNESS_PROTOCOL.missingnessAcceptanceThreshold !== null
  ) {
    throw new Error('fr312g_missingness_protocol_drift');
  }

  if (
    FR312G_CAPTURE_SENSITIVITY_PROTOCOL
      .onlyFR312FAdmittedCaptureVariationAnalyzed !== true
    || FR312G_CAPTURE_SENSITIVITY_PROTOCOL
      .outOfProtocolPerturbationUsedForPrimaryReliability !== false
    || FR312G_CAPTURE_SENSITIVITY_PROTOCOL.descriptiveReviewOnly !== true
    || FR312G_CAPTURE_SENSITIVITY_PROTOCOL
      .sensitivityAcceptanceThreshold !== null
  ) {
    throw new Error('fr312g_capture_sensitivity_protocol_drift');
  }

  if (
    FR312G_EVIDENCE_CONTRACT.morphologyLabelAssociationAnalyzed !== false
    || FR312G_EVIDENCE_CONTRACT
      .disagreementWithMorphologyAnnotationAnalyzed !== false
    || FR312G_EVIDENCE_CONTRACT.thresholdSearchAnalyzed !== false
    || FR312G_EVIDENCE_CONTRACT
      .reliabilityResultMayValidateTraditionalMeaning !== false
  ) {
    throw new Error('fr312g_evidence_scope_drift');
  }

  if (
    FR312G_RELIABILITY_GATE.currentStudyState !== 'not_executed'
    || FR312G_RELIABILITY_GATE
      .fr312hMayUseAxisWithoutEligibleReviewOutcome !== false
    || FR312G_RELIABILITY_GATE
      .oneAxisOutcomeAutomaticallyPromotesComparatorFamily !== false
    || FR312G_RELIABILITY_GATE.aggregateAcrossAxesAuthorized !== false
    || FR312G_RELIABILITY_GATE
      .numericMinimumAcceptanceValueAuthorized !== false
  ) {
    throw new Error('fr312g_reliability_gate_drift');
  }

  if (
    FR312F_PARTITION_POLICY.partitions.join('|')
      !== 'development|calibration|holdout'
    || FR312G_COLLECTION_PREREQUISITES
      .inheritedFR312FParticipantCollectionAuthorized !== false
    || FR312G_COLLECTION_PREREQUISITES
      .finiteReviewImageRetentionIssued !== false
    || FR312G_COLLECTION_PREREQUISITES
      .consentAndWithdrawalProcedureIssued !== false
    || FR312G_COLLECTION_PREREQUISITES
      .participantCountAuthorized !== false
    || FR312G_COLLECTION_PREREQUISITES
      .partitionRatiosAuthorized !== false
    || FR312G_COLLECTION_PREREQUISITES.executionAuthorized !== false
  ) {
    throw new Error('fr312g_collection_prerequisite_drift');
  }

  for (const [key, value] of Object.entries(FR312G_AUTHORITY_BOUNDARY)) {
    if (value !== false) {
      throw new Error('fr312g_global_authority_widening:' + key);
    }
  }
}
