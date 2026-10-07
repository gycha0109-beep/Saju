import { describe, expect, it } from 'vitest';
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
} from './rgb-selfie-product-column-map-fr293.js';
import {
  FR312F_METRIC_TIMING,
  FR312F_PARTITION_POLICY,
} from './traditional-morphology-pilot-dataset-capture-protocol-fr312f.js';
import {
  FR312G_AUTHORITY_BOUNDARY,
  FR312G_CAPTURE_SENSITIVITY_PROTOCOL,
  FR312G_COLLECTION_PREREQUISITES,
  FR312G_EVIDENCE_CONTRACT,
  FR312G_MISSINGNESS_PROTOCOL,
  FR312G_RELIABILITY_FAMILIES,
  FR312G_RELIABILITY_GATE,
  FR312G_REPEATABILITY_PROTOCOL,
  FR312G_STUDY_DESIGN,
  assertNeutralMetricReliabilityStudyDesignFR312G,
} from './traditional-neutral-metric-reliability-study-fr312g.js';

describe('FR312G neutral metric reliability study design', () => {
  it('remains regression-linked to the four FR312F comparator families', () => {
    expect(() => assertNeutralMetricReliabilityStudyDesignFR312G())
      .not.toThrow();

    const expected = new Set([
      'mouth.philtrum_length_width',
      'mouth.width_and_relative_size',
      'mouth.corner_orientation',
      'mouth.visible_lip_fullness',
    ]);

    expect(new Set(FR312F_METRIC_TIMING.comparatorKeys)).toEqual(expected);
    expect(new Set(FR312G_STUDY_DESIGN.sourceComparatorKeys))
      .toEqual(expected);
    expect(FR312G_RELIABILITY_FAMILIES).toHaveLength(4);
  });

  it('requires every comparator family to be canonically materialized', () => {
    const map = new Map(
      FR293_PRODUCT_COLUMN_MAP.map((item) => [item.featureKey, item] as const),
    );

    for (const family of FR312G_RELIABILITY_FAMILIES) {
      expect(map.get(family.comparatorKey)?.implementationState)
        .toBe('canonical_extractor_materialized');
      expect(family.sourceFeatureMaterializedRequired).toBe(true);
    }
  });

  it('freezes eight neutral ratio axes across the four comparator families', () => {
    const axes = FR312G_RELIABILITY_FAMILIES.flatMap(
      (family) => family.metricAxes,
    );
    const refs = new Set(axes.map((item) => item.metricRef));
    const fr80 = getNeutralMouthContourMetricDefinitionFR80();
    const fr82 = getNeutralMouthRelativeSizeMetricDefinitionFR82();

    expect(axes).toHaveLength(8);
    expect(refs.size).toBe(8);
    expect(refs).toEqual(new Set([
      FR291_VISIBLE_GROOVE_AXIS_METRIC_REF,
      FR291_VISIBLE_GROOVE_WIDTH_METRIC_REF,
      fr80.metricRef,
      fr82.metricRef,
      'neutral.mouth.corner_elevation.mean_to_mouth_width_ratio@0.1.0',
      FR293_UPPER_VERTICAL_SPAN_METRIC_REF,
      FR293_LOWER_VERTICAL_SPAN_METRIC_REF,
      FR293_COMBINED_AREA_METRIC_REF,
    ]));

    for (const axis of axes) {
      expect(axis.unit).toBe('ratio');
      expect(axis.scaleInvariant).toBe(true);
      expect(axis.classificationApplied).toBe(false);
      expect(axis.thresholdApplied).toBe(false);
      expect(axis.calibrationApplied).toBe(false);
      expect(axis.traditionalBindingApplied).toBe(false);
      expect(axis.currentReliabilityState).toBe('not_executed');
    }
  });

  it('keeps the signed corner-orientation axis distinct from nonnegative size axes', () => {
    const axes = FR312G_RELIABILITY_FAMILIES.flatMap(
      (family) => family.metricAxes,
    );
    const signed = axes.filter((item) => item.signedValueAllowed);

    expect(signed).toHaveLength(1);
    expect(signed[0]?.metricRef)
      .toBe('neutral.mouth.corner_elevation.mean_to_mouth_width_ratio@0.1.0');

    for (const axis of axes.filter((item) => !item.signedValueAllowed)) {
      expect(axis.signedValueAllowed).toBe(false);
    }
  });

  it('uses within-session recapture and between-session mean shift without issuing a cutoff', () => {
    expect(FR312G_REPEATABILITY_PROTOCOL.executionPartition)
      .toBe('development');
    expect(FR312G_REPEATABILITY_PROTOCOL.calibrationPartitionReadable)
      .toBe(false);
    expect(FR312G_REPEATABILITY_PROTOCOL.holdoutPartitionReadable)
      .toBe(false);
    expect(FR312G_REPEATABILITY_PROTOCOL.withinSessionDesign)
      .toBe('compare_two_accepted_captures_within_each_session');
    expect(FR312G_REPEATABILITY_PROTOCOL.betweenSessionDesign)
      .toBe('compare_session_means_across_two_temporally_distinct_sessions');
    expect(FR312G_REPEATABILITY_PROTOCOL.withinParticipantRangeReported)
      .toBe(true);
    expect(
      FR312G_REPEATABILITY_PROTOCOL.numericReliabilityAcceptanceThreshold,
    ).toBeNull();
    expect(
      FR312G_REPEATABILITY_PROTOCOL.reliabilityPassFailAutomationAuthorized,
    ).toBe(false);
  });

  it('treats unavailable values as missingness rather than inventing values', () => {
    expect(
      FR312G_MISSINGNESS_PROTOCOL.unavailableRecordedSeparatelyFromNumericValue,
    ).toBe(true);
    expect(FR312G_MISSINGNESS_PROTOCOL.unavailableReasonRequired).toBe(true);
    expect(FR312G_MISSINGNESS_PROTOCOL.missingValueImputationAuthorized)
      .toBe(false);
    expect(FR312G_MISSINGNESS_PROTOCOL.zeroSubstitutionAuthorized).toBe(false);
    expect(FR312G_MISSINGNESS_PROTOCOL.lastObservationCarryForwardAuthorized)
      .toBe(false);
    expect(FR312G_MISSINGNESS_PROTOCOL.unavailableFallbackMetricAuthorized)
      .toBe(false);
    expect(FR312G_MISSINGNESS_PROTOCOL.missingnessRateReportedPerAxis)
      .toBe(true);
    expect(FR312G_MISSINGNESS_PROTOCOL.missingnessAcceptanceThreshold)
      .toBeNull();

    for (const family of FR312G_RELIABILITY_FAMILIES) {
      for (const axis of family.metricAxes) {
        expect(axis.missingValueImputationAuthorized).toBe(false);
        expect(axis.unavailableFallbackAuthorized).toBe(false);
      }
    }
  });

  it('reviews capture sensitivity only inside the admitted FR312F capture envelope', () => {
    expect(
      FR312G_CAPTURE_SENSITIVITY_PROTOCOL
        .onlyFR312FAdmittedCaptureVariationAnalyzed,
    ).toBe(true);
    expect(
      FR312G_CAPTURE_SENSITIVITY_PROTOCOL
        .outOfProtocolPerturbationUsedForPrimaryReliability,
    ).toBe(false);
    expect(FR312G_CAPTURE_SENSITIVITY_PROTOCOL.poseSensitivityReviewed)
      .toBe(true);
    expect(FR312G_CAPTURE_SENSITIVITY_PROTOCOL.expressionSensitivityReviewed)
      .toBe(true);
    expect(FR312G_CAPTURE_SENSITIVITY_PROTOCOL.framingSensitivityReviewed)
      .toBe(true);
    expect(FR312G_CAPTURE_SENSITIVITY_PROTOCOL.imageQualitySensitivityReviewed)
      .toBe(true);
    expect(FR312G_CAPTURE_SENSITIVITY_PROTOCOL.sessionSensitivityReviewed)
      .toBe(true);
    expect(
      FR312G_CAPTURE_SENSITIVITY_PROTOCOL.captureSequenceSensitivityReviewed,
    ).toBe(true);

    expect(
      FR312G_CAPTURE_SENSITIVITY_PROTOCOL
        .numericPoseBoundaryIntroducedByFR312G,
    ).toBe(false);
    expect(
      FR312G_CAPTURE_SENSITIVITY_PROTOCOL
        .numericExpressionBoundaryIntroducedByFR312G,
    ).toBe(false);
    expect(
      FR312G_CAPTURE_SENSITIVITY_PROTOCOL
        .numericFramingBoundaryIntroducedByFR312G,
    ).toBe(false);
    expect(
      FR312G_CAPTURE_SENSITIVITY_PROTOCOL
        .numericImageQualityBoundaryIntroducedByFR312G,
    ).toBe(false);
    expect(FR312G_CAPTURE_SENSITIVITY_PROTOCOL.sensitivityAcceptanceThreshold)
      .toBeNull();
  });

  it('allows descriptive reliability evidence but never morphology equivalence in FR312G', () => {
    expect(FR312G_EVIDENCE_CONTRACT.descriptiveStatisticsAllowed)
      .toEqual([
        'capture_count',
        'available_count',
        'unavailable_count',
        'missingness_rate',
        'within_session_absolute_pair_difference',
        'between_session_absolute_session_mean_difference',
        'within_participant_range',
        'unavailable_reason_count',
      ]);
    expect(FR312G_EVIDENCE_CONTRACT.perAxisEvidenceRequired).toBe(true);
    expect(FR312G_EVIDENCE_CONTRACT.perComparatorFamilySummaryRequired)
      .toBe(true);
    expect(FR312G_EVIDENCE_CONTRACT.perParticipantRepeatFamilyTraceRequired)
      .toBe(true);
    expect(FR312G_EVIDENCE_CONTRACT.unavailableReasonDistributionRequired)
      .toBe(true);

    expect(FR312G_EVIDENCE_CONTRACT.morphologyLabelAssociationAnalyzed)
      .toBe(false);
    expect(
      FR312G_EVIDENCE_CONTRACT.disagreementWithMorphologyAnnotationAnalyzed,
    ).toBe(false);
    expect(FR312G_EVIDENCE_CONTRACT.thresholdSearchAnalyzed).toBe(false);
    expect(
      FR312G_EVIDENCE_CONTRACT.reliabilityResultMayValidateTraditionalMeaning,
    ).toBe(false);
  });

  it('keeps calibration and holdout sealed during neutral metric reliability work', () => {
    expect(FR312F_PARTITION_POLICY.partitions).toEqual([
      'development',
      'calibration',
      'holdout',
    ]);
    expect(FR312G_REPEATABILITY_PROTOCOL.executionPartition)
      .toBe('development');
    expect(FR312G_REPEATABILITY_PROTOCOL.calibrationPartitionReadable)
      .toBe(false);
    expect(FR312G_REPEATABILITY_PROTOCOL.holdoutPartitionReadable)
      .toBe(false);
  });

  it('does not execute while FR312F collection prerequisites remain closed', () => {
    expect(
      FR312G_COLLECTION_PREREQUISITES
        .inheritedFR312FParticipantCollectionAuthorized,
    ).toBe(false);
    expect(FR312G_COLLECTION_PREREQUISITES.finiteReviewImageRetentionIssued)
      .toBe(false);
    expect(
      FR312G_COLLECTION_PREREQUISITES.consentAndWithdrawalProcedureIssued,
    ).toBe(false);
    expect(FR312G_COLLECTION_PREREQUISITES.participantCountAuthorized)
      .toBe(false);
    expect(FR312G_COLLECTION_PREREQUISITES.partitionRatiosAuthorized)
      .toBe(false);
    expect(FR312G_COLLECTION_PREREQUISITES.executionAuthorized).toBe(false);
    expect(FR312G_RELIABILITY_GATE.currentStudyState).toBe('not_executed');
  });

  it('requires a future axis-level reliability review before FR312H can use a metric', () => {
    expect(FR312G_RELIABILITY_GATE.allowedFutureAxisReviewOutcomes)
      .toEqual([
        'insufficient_evidence',
        'reliability_concern',
        'eligible_for_fr312h_review',
      ]);
    expect(
      FR312G_RELIABILITY_GATE.fr312hMayUseAxisWithoutEligibleReviewOutcome,
    ).toBe(false);
    expect(
      FR312G_RELIABILITY_GATE.oneAxisOutcomeAutomaticallyPromotesComparatorFamily,
    ).toBe(false);
    expect(FR312G_RELIABILITY_GATE.aggregateAcrossAxesAuthorized).toBe(false);
    expect(
      FR312G_RELIABILITY_GATE.numericMinimumAcceptanceValueAuthorized,
    ).toBe(false);
    expect(FR312G_RELIABILITY_GATE.productionPromotionAuthorized).toBe(false);
  });

  it('keeps all semantic, threshold, binding, aggregate, and product authority closed', () => {
    for (const family of FR312G_RELIABILITY_FAMILIES) {
      expect(family.aggregateReliabilityScoreAuthorized).toBe(false);
      expect(family.morphologyLabelReadableDuringReliabilityStudy).toBe(false);
      expect(family.traditionalSemanticClaimReadableDuringReliabilityStudy)
        .toBe(false);
      expect(family.axisSelectionForTraditionalEquivalenceAuthorized)
        .toBe(false);
    }

    for (const [key, value] of Object.entries(FR312G_AUTHORITY_BOUNDARY)) {
      expect(value, key).toBe(false);
    }
  });
});
