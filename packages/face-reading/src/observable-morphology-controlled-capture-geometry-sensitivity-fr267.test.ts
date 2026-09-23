import { describe, expect, it } from 'vitest';
import {
  FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER,
  FR24_EYE_TOPOLOGY_WITNESS_EDGES,
} from './face-eye-pair-research-bridge-fr24.js';
import { computeEyeOuterCornerTiltFR208 } from './cross-face-neutral-observable-primitives-fr208.js';
import { deriveEyeOuterCornerTiltInputFromMetricGeometryFR209 } from './governed-geometry-to-fr208-adapter-fr209.js';
import type { FR257CaptureGeometryAttributionBundle } from './observable-morphology-capture-geometry-attribution-fr257.js';
import {
  analyzeControlledCaptureGeometrySensitivityFR267,
  buildSameFrameEyeTiltDiagnosticBundleFR267,
  createSameFrameEyeTiltDiagnosticCollectorFR267,
  deriveSameFrameEyeTiltDiagnosticFR267,
} from './observable-morphology-controlled-capture-geometry-sensitivity-fr267.js';
import { orderClosedCycleProviderVerticesFR16 } from './provider-adapter-evidence-fr16.js';

const EYE_CYCLES = FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER.map((symbol) =>
  orderClosedCycleProviderVerticesFR16(FR24_EYE_TOPOLOGY_WITNESS_EDGES[symbol]),
);

function bundle(
  generatedAt: string,
  metrics: readonly number[],
  verticals: readonly number[],
  areas: readonly number[],
): FR257CaptureGeometryAttributionBundle {
  const slots = metrics.map((value, index) => Object.freeze({
    schemaVersion: 'fr257-capture-geometry-attribution-slot-v1' as const,
    sessionOrdinal: (index < 2 ? 1 : 2) as 1 | 2,
    captureOrdinal: ((index % 2) + 1) as 1 | 2,
    timestampMs: index + 1,
    resultStatus: 'accepted_for_dry_run_mechanics_only' as const,
    primaryMetric: Object.freeze({
      metricRef: 'neutral.eye.outer_corner_tilt.mean_degrees@0.1.0' as const,
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

  const range = (values: readonly number[]) => ({
    min: Math.min(...values),
    max: Math.max(...values),
    span: Math.max(...values) - Math.min(...values),
  });
  return Object.freeze({
    schemaVersion: 'fr257-capture-geometry-attribution-bundle-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: 'FR257-SAME-FRAME-CAPTURE-GEOMETRY-ATTRIBUTION-v1' as const,
    authorityState: 'capture_geometry_attribution_descriptive_only_no_threshold_or_calibration' as const,
    generatedAt,
    source: Object.freeze({
      fr251SchemaVersion: 'fr251-localhost-dry-run-sanitized-export-v1' as const,
      fr243RecordSchemaVersion: 'fr243-dry-run-capture-execution-record-v1' as const,
      metricRef: 'neutral.eye.outer_corner_tilt.mean_degrees@0.1.0' as const,
      requiredSlotCount: 4 as const,
    }),
    slots: Object.freeze(slots),
    descriptiveSummary: Object.freeze({
      recordedSlotCount: 4 as const,
      acceptedMetricCount: 4,
      geometryAttributionCount: 4,
      lateralOrientationRadians: range(slots.map((slot) => slot.geometry.lateralOrientationRadians)),
      verticalOrientationRadians: range(verticals),
      relativeRotationFromFirstAcceptedCaptureRadians: range(slots.map((slot) => slot.geometry.relativeRotationFromFirstAcceptedCaptureRadians)),
      inPlaneLateralAxisOrientationRadians: range(slots.map((slot) => slot.geometry.inPlaneLateralAxisOrientationRadians)),
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
    nextFrontier: 'collect_eye_level_low_angle_high_angle_fr251_executions_with_fr257_scalar_geometry_then_review_descriptive_pose_sensitivity' as const,
  });
}

function eyeLandmarks(kind: 'screen' | 'metric') {
  const points = Array.from({ length: 468 }, () => ({ x: kind === 'screen' ? 0.5 : 0, y: kind === 'screen' ? 0.5 : 0, z: 0 }));
  const eyeVertices = new Set(EYE_CYCLES.flat());
  const nonEye = points.map((_, index) => index).filter((index) => !eyeVertices.has(index));
  points[nonEye[0]!] = { x: kind === 'screen' ? 0.1 : -5, y: 0.5, z: 0 };
  points[nonEye[1]!] = { x: kind === 'screen' ? 0.9 : 5, y: 0.5, z: 0 };

  EYE_CYCLES.forEach((cycle, cycleIndex) => {
    cycle.forEach((vertex, index) => {
      const t = index / (cycle.length - 1);
      if (kind === 'screen') {
        const left = cycleIndex === 0;
        const x = left ? 0.25 + 0.15 * t : 0.60 + 0.15 * t;
        const isOuter = left ? index === 0 : index === cycle.length - 1;
        const isInner = left ? index === cycle.length - 1 : index === 0;
        points[vertex] = {
          x,
          y: isOuter ? 0.45 : isInner ? 0.50 : 0.475 + 0.0001 * index,
          z: 0,
        };
      } else {
        const left = cycleIndex === 0;
        const x = left ? -2 + t : 1 + t;
        const isOuter = left ? index === 0 : index === cycle.length - 1;
        const isInner = left ? index === cycle.length - 1 : index === 0;
        points[vertex] = {
          x,
          y: isOuter ? 0.5 : isInner ? 0 : 0.25 + 0.001 * index,
          z: 0,
        };
      }
    });
  });
  return points;
}

describe('FR267 controlled capture geometry sensitivity', () => {
  it('computes three-condition descriptive summaries and baseline-relative deltas', () => {
    const report = analyzeControlledCaptureGeometrySensitivityFR267({
      generatedAt: '2026-09-23T18:14:13.312Z',
      conditions: [
        {
          condition: 'baseline_eye_level',
          sourceRef: 'repo:baseline',
          bundle: bundle(
            '2026-09-23T18:11:52.186Z',
            [7.531284970059925, 8.325633517797781, 8.095432734802369, 8.177208517567424],
            [-0.08092565003620636, -0.09267114043723368, -0.09747509698700428, -0.10294591842233418],
            [0.24262390380881893, 0.244185536320618, 0.24008605643580694, 0.2422038817315002],
          ),
        },
        {
          condition: 'low_angle',
          sourceRef: 'repo:low',
          bundle: bundle(
            '2026-09-23T18:13:59.311Z',
            [2.500390438498058, 3.319405172933375, 2.4925215055191297, 2.967486922061024],
            [0.3627566875502291, 0.3464302793840715, 0.34681074374220333, 0.35157873456986927],
            [0.13108785042862792, 0.13683308091678015, 0.13830363275974378, 0.13735256777592042],
          ),
        },
        {
          condition: 'high_angle',
          sourceRef: 'repo:high',
          bundle: bundle(
            '2026-09-23T18:14:13.312Z',
            [8.157234869262547, 7.873906320123492, 8.632543322897064, 8.408680686913016],
            [-0.23175191313371837, -0.22687975669303445, -0.194368101751514, -0.1931344361232453],
            [0.18984774828021145, 0.1899308838448679, 0.1831185023471198, 0.18266285659974635],
          ),
        },
      ],
    });

    expect(report.conditions[0].primaryMetricDegrees.mean).toBeCloseTo(8.032389935056875);
    expect(report.conditions[1].primaryMetricDegrees.mean).toBeCloseTo(2.8199510097528966);
    expect(report.conditions[2].primaryMetricDegrees.mean).toBeCloseTo(8.26809129979903);
    expect(report.baselineRelativeContrasts[0].deltaMeanPrimaryMetricDegrees)
      .toBeCloseTo(-5.212438925303979);
    expect(report.baselineRelativeContrasts[0].deltaMeanVerticalOrientationDegrees)
      .toBeGreaterThan(25);
    expect(report.baselineRelativeContrasts[1].deltaMeanPrimaryMetricDegrees)
      .toBeCloseTo(0.23570136474215556);
    expect(report.interpretationBoundary.verticalOrientationCausalityEstablished)
      .toBe(false);
    expect(report.interpretationBoundary.faceScaleConfoundingEliminated).toBe(false);
    expect(Object.values(report.authorityBoundary).every((value) => value === false)).toBe(true);
  });

  it('derives same-frame screen-vs-FR76 scalar diagnostic without replacing the frozen metric', () => {
    const metricLandmarks = eyeLandmarks('metric');
    const metricInput = deriveEyeOuterCornerTiltInputFromMetricGeometryFR209(metricLandmarks);
    expect(metricInput.status).toBe('available');
    if (metricInput.status !== 'available') throw new Error('fixture unavailable');
    const frozen = computeEyeOuterCornerTiltFR208(metricInput.input).mean;

    const evidence = deriveSameFrameEyeTiltDiagnosticFR267({
      providerRunRef: 'provider:fr267:test',
      screenLandmarks: eyeLandmarks('screen'),
      metricLandmarks,
      poseTransformMatrixPackedColumnMajor: Object.freeze([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
      ]),
      frameWidth: 1000,
      frameHeight: 1000,
      primaryMetric: Object.freeze({
        metricRef: 'neutral.eye.outer_corner_tilt.mean_degrees@0.1.0' as const,
        unit: 'degree' as const,
        value: frozen.value,
      }),
    });

    expect(evidence.screenSpaceEyeOuterCornerTiltMeanDegrees).toBeGreaterThan(0);
    expect(evidence.fr76CanonicalMetricEyeOuterCornerTiltMeanDegrees).toBe(frozen.value);
    expect(evidence.frozenMetricMatchesFr76Diagnostic).toBe(true);
    expect(evidence.additionalPoseNormalizationCandidateState)
      .toBe('not_issued_fr76_metric_geometry_is_already_inverse_pose_aligned');
    expect(evidence.persistenceBoundary.rawScreenLandmarksPersisted).toBe(false);
    expect(evidence.authorityBoundary.frozenMetricReplaced).toBe(false);
  });

  it('collector consumes raw geometry synchronously and persists scalar bundle only', () => {
    const metricLandmarks = eyeLandmarks('metric');
    const metricInput = deriveEyeOuterCornerTiltInputFromMetricGeometryFR209(metricLandmarks);
    if (metricInput.status !== 'available') throw new Error('fixture unavailable');
    const frozen = computeEyeOuterCornerTiltFR208(metricInput.input).mean;
    const collector = createSameFrameEyeTiltDiagnosticCollectorFR267();
    collector.observe({
      providerRunRef: 'provider:fr267:collector',
      screenLandmarks: eyeLandmarks('screen'),
      metricLandmarks,
      poseTransformMatrixPackedColumnMajor: Object.freeze([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
      ]),
      frameWidth: 1000,
      frameHeight: 1000,
      primaryMetric: Object.freeze({
        metricRef: 'neutral.eye.outer_corner_tilt.mean_degrees@0.1.0' as const,
        unit: 'degree' as const,
        value: frozen.value,
      }),
    });
    expect(collector.pendingEvidenceCount()).toBe(1);
    const evidence = collector.takeEvidence('provider:fr267:collector');
    expect(evidence).not.toBeNull();
    expect(collector.pendingEvidenceCount()).toBe(0);

    const slots = [1, 2, 3, 4].map((ordinal) => Object.freeze({
      schemaVersion: 'fr267-same-frame-eye-tilt-diagnostic-slot-v1' as const,
      sessionOrdinal: (ordinal <= 2 ? 1 : 2) as 1 | 2,
      captureOrdinal: (((ordinal - 1) % 2) + 1) as 1 | 2,
      resultStatus: 'accepted_for_dry_run_mechanics_only' as const,
      frozenPrimaryMetric: evidence!.frozenPrimaryMetric,
      screenSpaceEyeOuterCornerTiltMeanDegrees:
        evidence!.screenSpaceEyeOuterCornerTiltMeanDegrees,
      fr76CanonicalMetricEyeOuterCornerTiltMeanDegrees:
        evidence!.fr76CanonicalMetricEyeOuterCornerTiltMeanDegrees,
      screenMinusFr76Degrees: evidence!.screenMinusFr76Degrees,
    }));
    const result = buildSameFrameEyeTiltDiagnosticBundleFR267({
      generatedAt: '2026-09-23T18:20:00.000Z',
      slots,
    });
    expect(result.descriptiveSummary.acceptedDiagnosticCount).toBe(4);
    expect(result.persistenceBoundary.providerRunRefRetained).toBe(false);
    expect(JSON.stringify(result)).not.toContain('provider:fr267:collector');
  });
});
