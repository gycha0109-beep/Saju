import { describe, expect, it } from 'vitest';
import type {
  FR257CaptureGeometryAttributionBundle,
} from './observable-morphology-capture-geometry-attribution-fr257.js';
import type {
  FR269SameFrameEyeTiltDiagnosticBundle,
} from './observable-morphology-controlled-capture-geometry-sensitivity-fr269.js';
import {
  analyzeControlledSameFrameEyeTiltDivergenceFR270,
} from './observable-morphology-controlled-same-frame-eye-tilt-divergence-fr270.js';

const metricRef = 'neutral.eye.outer_corner_tilt.mean_degrees@0.1.0' as const;

function scalarSummary(values: readonly number[]) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  return Object.freeze({
    mean: values.reduce((sum, value) => sum + value, 0) / values.length,
    min,
    max,
    span: max - min,
  });
}

function fr257Bundle(
  generatedAt: string,
  metricValues: readonly number[],
  verticals: readonly number[],
  areas: readonly number[],
): FR257CaptureGeometryAttributionBundle {
  const slots = metricValues.map((value, index) => Object.freeze({
    schemaVersion: 'fr257-capture-geometry-attribution-slot-v1' as const,
    sessionOrdinal: (index < 2 ? 1 : 2) as 1 | 2,
    captureOrdinal: ((index % 2) + 1) as 1 | 2,
    timestampMs: index + 1,
    resultStatus: 'accepted_for_dry_run_mechanics_only' as const,
    primaryMetric: Object.freeze({
      metricRef,
      unit: 'degree' as const,
      value,
    }),
    geometry: Object.freeze({
      lateralOrientationRadians: 0.01 * index,
      verticalOrientationRadians: verticals[index]!,
      relativeRotationFromFirstAcceptedCaptureRadians: 0.005 * index,
      inPlaneLateralAxisOrientationRadians: 0.002 * index,
      poseUniformScaleComponent: 1,
      screenFaceBoxWidthFraction: 0.4 + 0.01 * index,
      screenFaceBoxHeightFraction: 0.4 + 0.01 * index,
      screenFaceBoxAreaFraction: areas[index]!,
    }),
    geometryAttributionState: 'same_frame_scalar_geometry_available' as const,
  }));
  const range = (values: readonly number[]) => Object.freeze({
    min: Math.min(...values),
    max: Math.max(...values),
    span: Math.max(...values) - Math.min(...values),
  });
  return Object.freeze({
    schemaVersion: 'fr257-capture-geometry-attribution-bundle-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: 'FR257-SAME-FRAME-CAPTURE-GEOMETRY-ATTRIBUTION-v1' as const,
    authorityState:
      'capture_geometry_attribution_descriptive_only_no_threshold_or_calibration' as const,
    generatedAt,
    source: Object.freeze({
      fr251SchemaVersion: 'fr251-localhost-dry-run-sanitized-export-v1' as const,
      fr243RecordSchemaVersion: 'fr243-dry-run-capture-execution-record-v1' as const,
      metricRef,
      requiredSlotCount: 4 as const,
    }),
    slots: Object.freeze(slots),
    descriptiveSummary: Object.freeze({
      recordedSlotCount: 4 as const,
      acceptedMetricCount: 4,
      geometryAttributionCount: 4,
      lateralOrientationRadians: range(slots.map((slot) => slot.geometry.lateralOrientationRadians)),
      verticalOrientationRadians: range(verticals),
      relativeRotationFromFirstAcceptedCaptureRadians:
        range(slots.map((slot) => slot.geometry.relativeRotationFromFirstAcceptedCaptureRadians)),
      inPlaneLateralAxisOrientationRadians:
        range(slots.map((slot) => slot.geometry.inPlaneLateralAxisOrientationRadians)),
      poseUniformScaleComponent: range(slots.map((slot) => slot.geometry.poseUniformScaleComponent)),
      screenFaceBoxWidthFraction: range(slots.map((slot) => slot.geometry.screenFaceBoxWidthFraction)),
      screenFaceBoxHeightFraction: range(slots.map((slot) => slot.geometry.screenFaceBoxHeightFraction)),
      screenFaceBoxAreaFraction: range(areas),
      evaluationState: 'descriptive_only_no_pose_acceptance_or_correction' as const,
    }),
    privacyBoundary: Object.freeze({
      participantRefRetained: false as const,
      operatorRefRetained: false as const,
      providerRunRefRetained: false as const,
      rawMediaPersisted: false as const,
      rawImageDigestPersisted: false as const,
      rawProviderResponsePersisted: false as const,
      rawScreenLandmarksPersisted: false as const,
      rawMetricLandmarksPersisted: false as const,
      poseTransformMatrixPersisted: false as const,
      scalarGeometryPersisted: true as const,
      faceEmbeddingPersisted: false as const,
      identityTemplatePersisted: false as const,
    }),
    authorityBoundary: Object.freeze({
      empiricalRepeatabilityEstablished: false as const,
      captureQualityConstructValidated: false as const,
      poseAcceptanceThresholdIssued: false as const,
      distanceAcceptanceThresholdIssued: false as const,
      calibrationIssued: false as const,
      correctionFormulaIssued: false as const,
      confidenceGradeIssued: false as const,
      interpretationValidityEstablished: false as const,
      traditionalBindingIssued: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
    nextFrontier:
      'collect_eye_level_low_angle_high_angle_fr251_executions_with_fr257_scalar_geometry_then_review_descriptive_pose_sensitivity' as const,
  });
}

function fr269Bundle(
  generatedAt: string,
  frozenValues: readonly number[],
  screenValues: readonly number[],
): FR269SameFrameEyeTiltDiagnosticBundle {
  const slots = frozenValues.map((value, index) => Object.freeze({
    schemaVersion: 'fr269-same-frame-eye-tilt-diagnostic-slot-v1' as const,
    sessionOrdinal: (index < 2 ? 1 : 2) as 1 | 2,
    captureOrdinal: ((index % 2) + 1) as 1 | 2,
    resultStatus: 'accepted_for_dry_run_mechanics_only' as const,
    frozenPrimaryMetric: Object.freeze({
      metricRef,
      unit: 'degree' as const,
      value,
    }),
    screenSpaceEyeOuterCornerTiltMeanDegrees: screenValues[index]!,
    fr76CanonicalMetricEyeOuterCornerTiltMeanDegrees: value,
    screenMinusFr76Degrees: screenValues[index]! - value,
  }));
  const differences = slots.map((slot) => slot.screenMinusFr76Degrees);
  return Object.freeze({
    schemaVersion: 'fr269-same-frame-eye-tilt-diagnostic-bundle-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: 'FR269-CONTROLLED-CAPTURE-GEOMETRY-SENSITIVITY-v1' as const,
    authorityState:
      'same_frame_eye_tilt_diagnostic_scalar_only_no_metric_replacement' as const,
    generatedAt,
    slots: Object.freeze(slots),
    descriptiveSummary: Object.freeze({
      acceptedDiagnosticCount: 4,
      screenSpaceEyeOuterCornerTiltMeanDegrees: scalarSummary(screenValues),
      fr76CanonicalMetricEyeOuterCornerTiltMeanDegrees: scalarSummary(frozenValues),
      screenMinusFr76Degrees: scalarSummary(differences),
    }),
    persistenceBoundary: Object.freeze({
      participantRefRetained: false as const,
      operatorRefRetained: false as const,
      providerRunRefRetained: false as const,
      rawMediaPersisted: false as const,
      rawScreenLandmarksPersisted: false as const,
      rawMetricLandmarksPersisted: false as const,
      poseTransformMatrixPersisted: false as const,
      scalarDiagnosticPersisted: true as const,
    }),
    authorityBoundary: Object.freeze({
      frozenMetricReplaced: false as const,
      additionalPoseNormalizationIssued: false as const,
      calibrationIssued: false as const,
      correctionFormulaIssued: false as const,
      thresholdIssued: false as const,
      classificationIssued: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
  });
}

function conditions() {
  const baselineAt = '2026-09-24T00:00:00.000Z';
  const lowAt = '2026-09-24T00:10:00.000Z';
  const highAt = '2026-09-24T00:20:00.000Z';
  const baselineFrozen = [8, 8.1, 7.9, 8];
  const lowFrozen = [2.8, 3, 2.6, 2.8];
  const highFrozen = [8.2, 8.3, 8.1, 8.2];
  return [
    {
      condition: 'baseline_eye_level' as const,
      fr257SourceRef: 'repo:baseline.fr257.json',
      fr269SourceRef: 'repo:baseline.fr269.json',
      fr257: fr257Bundle(baselineAt, baselineFrozen, [-0.09, -0.1, -0.08, -0.09], [0.24, 0.24, 0.25, 0.23]),
      fr269: fr269Bundle(baselineAt, baselineFrozen, [9, 9.1, 8.9, 9]),
    },
    {
      condition: 'low_angle' as const,
      fr257SourceRef: 'repo:low.fr257.json',
      fr269SourceRef: 'repo:low.fr269.json',
      fr257: fr257Bundle(lowAt, lowFrozen, [0.35, 0.34, 0.36, 0.35], [0.13, 0.14, 0.13, 0.14]),
      fr269: fr269Bundle(lowAt, lowFrozen, [4, 4.2, 3.8, 4]),
    },
    {
      condition: 'high_angle' as const,
      fr257SourceRef: 'repo:high.fr257.json',
      fr269SourceRef: 'repo:high.fr269.json',
      fr257: fr257Bundle(highAt, highFrozen, [-0.22, -0.21, -0.23, -0.22], [0.19, 0.19, 0.18, 0.2]),
      fr269: fr269Bundle(highAt, highFrozen, [8.6, 8.7, 8.5, 8.6]),
    },
  ];
}

describe('FR270 controlled same-frame eye-tilt divergence', () => {
  it('pairs FR257 and FR269 by execution and emits descriptive scalar contrasts only', () => {
    const report = analyzeControlledSameFrameEyeTiltDivergenceFR270({
      generatedAt: '2026-09-24T00:30:00.000Z',
      conditions: conditions(),
    });

    expect(report.conditions[0].captureCount).toBe(4);
    expect(report.conditions[1].frozenFR76EyeOuterCornerTiltMeanDegrees.mean)
      .toBeCloseTo(2.8);
    expect(report.conditions[1].screenSpaceEyeOuterCornerTiltMeanDegrees.mean)
      .toBeCloseTo(4);
    expect(report.baselineRelativeContrasts[0].deltaMeanFrozenFR76EyeOuterCornerTiltDegrees)
      .toBeCloseTo(-5.2);
    expect(report.baselineRelativeContrasts[0].deltaMeanScreenSpaceEyeOuterCornerTiltDegrees)
      .toBeCloseTo(-5);
    expect(report.baselineRelativeContrasts[0].deltaMeanScreenMinusFr76Degrees)
      .toBeCloseTo(0.2);
    expect(report.interpretationBoundary.sameExecutionPairVerified).toBe(true);
    expect(report.interpretationBoundary.diagnosticCaseClassificationIssued).toBe(false);
    expect(Object.values(report.authorityBoundary).every((value) => value === false)).toBe(true);
  });

  it('rejects a FR257/FR269 execution timestamp mismatch', () => {
    const input = conditions();
    input[1] = {
      ...input[1]!,
      fr269: fr269Bundle(
        '2026-09-24T00:11:00.000Z',
        [2.8, 3, 2.6, 2.8],
        [4, 4.2, 3.8, 4],
      ),
    };
    expect(() => analyzeControlledSameFrameEyeTiltDivergenceFR270({
      generatedAt: '2026-09-24T00:30:00.000Z',
      conditions: input,
    })).toThrow(/same generatedAt execution timestamp/);
  });

  it('rejects any frozen-metric drift between the paired sidecars', () => {
    const input = conditions();
    const low = input[1]!;
    const drifted = fr269Bundle(
      low.fr269.generatedAt,
      [2.8, 3, 2.6, 2.9],
      [4, 4.2, 3.8, 4],
    );
    input[1] = { ...low, fr269: drifted };
    expect(() => analyzeControlledSameFrameEyeTiltDivergenceFR270({
      generatedAt: '2026-09-24T00:30:00.000Z',
      conditions: input,
    })).toThrow(/exact frozen FR76 primary metric binding/);
  });

  it('does not serialize provider refs, raw geometry, or causal/admission authority', () => {
    const report = analyzeControlledSameFrameEyeTiltDivergenceFR270({
      generatedAt: '2026-09-24T00:30:00.000Z',
      conditions: conditions(),
    });
    const serialized = JSON.stringify(report);
    expect(serialized).not.toContain('providerRunRef');
    expect(serialized).not.toContain('screenLandmarks');
    expect(serialized).not.toContain('metricLandmarks');
    expect(report.privacyBoundary.rawScreenLandmarksPersisted).toBe(false);
    expect(report.privacyBoundary.rawMetricLandmarksPersisted).toBe(false);
    expect(report.authorityBoundary.causalClassificationIssued).toBe(false);
    expect(report.authorityBoundary.correctionFormulaIssued).toBe(false);
    expect(report.authorityBoundary.poseAcceptanceThresholdIssued).toBe(false);
  });
});
