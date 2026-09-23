import { describe, expect, it } from 'vitest';
import {
  FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER,
  FR24_EYE_TOPOLOGY_WITNESS_EDGES,
} from './face-eye-pair-research-bridge-fr24.js';
import { orderClosedCycleProviderVerticesFR16 } from './provider-adapter-evidence-fr16.js';
import type {
  FR243DryRunCaptureExecutionRecord,
} from './observable-morphology-governed-dry-run-execution-recorder-fr243.js';
import {
  bindCaptureGeometryAttributionSlotFR257,
  buildCaptureGeometryAttributionBundleFR257,
  createSyntheticMechanicsAttributionBindingFR257,
  deriveCaptureGeometryScalarsFR257,
  type FR257SameFrameAttributionEvidence,
} from './observable-morphology-capture-geometry-attribution-fr257.js';

function metricEyeFixture() {
  const points = Array.from({ length: 468 }, () => ({ x: 0, y: 0, z: 0 }));
  points[1] = { x: -5, y: 0, z: 0 };
  points[2] = { x: 5, y: 0, z: 0 };

  const cycles = FR24_EYE_TOPOLOGY_SERIALIZATION_ORDER.map((symbol) =>
    orderClosedCycleProviderVerticesFR16(FR24_EYE_TOPOLOGY_WITNESS_EDGES[symbol]),
  );
  const negative = cycles[0]!;
  const positive = cycles[1]!;

  negative.forEach((vertex, index) => {
    const t = index / (negative.length - 1);
    points[vertex] = {
      x: -2 + t,
      y: index === 0 ? 1 : index === negative.length - 1 ? 0 : 0.4,
      z: 0,
    };
  });
  positive.forEach((vertex, index) => {
    const t = index / (positive.length - 1);
    points[vertex] = {
      x: 1 + t,
      y: index === 0 ? 0 : index === positive.length - 1 ? 1 : 0.4,
      z: 0,
    };
  });
  return points;
}

function screenFixture() {
  const points = Array.from({ length: 468 }, () => ({ x: 0.5, y: 0.5, z: 0 }));
  points[0] = { x: 0.2, y: 0.3, z: 0 };
  points[1] = { x: 0.8, y: 0.7, z: 0 };
  return points;
}

const IDENTITY_PACKED_COLUMN_MAJOR = Object.freeze([
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1,
]);

function acceptedRecord(value: number): FR243DryRunCaptureExecutionRecord {
  return Object.freeze({
    schemaVersion: 'fr243-dry-run-capture-execution-record-v1' as const,
    runtimeRef: 'runtime:fr243:test',
    participantRef: 'participant:test',
    operatorRef: 'operator:test',
    sessionRef: 'session:test',
    challengeRef: 'challenge:test',
    sessionOrdinal: 1 as const,
    captureOrdinal: 1 as const,
    challengeIssuedAt: '2026-09-23T00:00:00.000Z',
    operatorAttestation: Object.freeze({
      schemaVersion: 'fr243-operator-execution-attestation-v1' as const,
      operatorRef: 'operator:test',
      recordedAt: '2026-09-23T00:00:01.000Z',
      participantPresentObserved: true as const,
      liveCameraCaptureObserved: true as const,
      consentReconfirmedImmediatelyBeforeCapture: true as const,
      challengePresentedBeforeCapture: true as const,
    }),
    resultStatus: 'accepted_for_dry_run_mechanics_only' as const,
    observedByteLength: 7,
    qualityAssessment: Object.freeze({
      schemaVersion: 'fr242-capture-quality-assessment-v1' as const,
      singleFace: true,
      frontalPose: true,
      sharpness: true,
      bilateralEyeRegionVisibility: true,
      bilateralEyeLandmarkCoverage: true,
      majorEyeRegionOcclusionAbsent: true,
    }),
    rejectionReasons: Object.freeze([]),
    primaryMetric: Object.freeze({
      metricRef: 'neutral.eye.outer_corner_tilt.mean_degrees@0.1.0' as const,
      unit: 'degree' as const,
      value,
    }),
    metricExtractorInvoked: true,
    workingBufferZeroizedAfterProcessing: true as const,
    rawBytesPersisted: false as const,
    rawImageDigestPersisted: false as const,
    reviewImagePersisted: false as const,
    faceEmbeddingPersisted: false as const,
    identityTemplatePersisted: false as const,
    operatorAttestedRealParticipantExecution: true as const,
    independentRealParticipantExecutionVerification: false as const,
    empiricalEvidenceEligible: false as const,
    confirmatoryEvidenceEligible: false as const,
  });
}

describe('FR257 same-frame capture geometry attribution', () => {
  it('derives threshold-free pose and face-box scalars from governed geometry inputs', () => {
    const geometry = deriveCaptureGeometryScalarsFR257({
      screenLandmarks: screenFixture(),
      poseTransformMatrixPackedColumnMajor: IDENTITY_PACKED_COLUMN_MAJOR,
      firstAcceptedPoseTransformMatrixPackedColumnMajor:
        IDENTITY_PACKED_COLUMN_MAJOR,
    });

    expect(geometry.lateralOrientationRadians).toBe(0);
    expect(geometry.verticalOrientationRadians).toBe(0);
    expect(geometry.relativeRotationFromFirstAcceptedCaptureRadians).toBe(0);
    expect(geometry.inPlaneLateralAxisOrientationRadians).toBe(0);
    expect(geometry.poseUniformScaleComponent).toBe(1);
    expect(geometry.screenFaceBoxWidthFraction).toBeCloseTo(0.6);
    expect(geometry.screenFaceBoxHeightFraction).toBeCloseTo(0.4);
    expect(geometry.screenFaceBoxAreaFraction).toBeCloseTo(0.24);
  });

  it('binds the frozen metric and scalar geometry to the exact same JPEG bytes', () => {
    const jpeg = new Uint8Array([0xff, 0xd8, 1, 2, 3, 0xff, 0xd9]);
    let evidence: FR257SameFrameAttributionEvidence | null = null;
    const binding = createSyntheticMechanicsAttributionBindingFR257({
      providerRunRef: 'provider:fr257:s1:c1:test',
      expectedJpegBytes: jpeg,
      screenLandmarks: screenFixture(),
      metricLandmarks: metricEyeFixture(),
      poseTransformMatrixPackedColumnMajor: IDENTITY_PACKED_COLUMN_MAJOR,
      onEvidence: (value) => {
        evidence = value;
      },
    });

    const metric = binding.primaryMetricExtractor(Uint8Array.from(jpeg));
    expect(metric.metricRef)
      .toBe('neutral.eye.outer_corner_tilt.mean_degrees@0.1.0');
    expect(Number.isFinite(metric.value)).toBe(true);
    expect(evidence).not.toBeNull();
    expect(evidence!.sameFrameBinding.providerDetectionSharedByMetricAndGeometry)
      .toBe(true);
    expect(evidence!.geometry.relativeRotationFromFirstAcceptedCaptureRadians)
      .toBe(0);
    expect(evidence!.persistenceBoundary.rawScreenLandmarksPersisted).toBe(false);
    expect(evidence!.persistenceBoundary.scalarGeometryPersisted).toBe(true);
  });

  it('fails closed when FR242 bytes do not match the prepared FR244 JPEG', () => {
    const binding = createSyntheticMechanicsAttributionBindingFR257({
      providerRunRef: 'provider:fr257:mismatch',
      expectedJpegBytes: new Uint8Array([0xff, 0xd8, 1, 0xff, 0xd9]),
      screenLandmarks: screenFixture(),
      metricLandmarks: metricEyeFixture(),
      poseTransformMatrixPackedColumnMajor: IDENTITY_PACKED_COLUMN_MAJOR,
      onEvidence: () => undefined,
    });

    expect(() => binding.primaryMetricExtractor(
      new Uint8Array([0xff, 0xd8, 9, 0xff, 0xd9]),
    )).toThrow(/exact FR244 JPEG/u);
  });

  it('builds a four-slot privacy-minimized descriptive sidecar', () => {
    const jpeg = new Uint8Array([0xff, 0xd8, 1, 2, 3, 0xff, 0xd9]);
    let captured: FR257SameFrameAttributionEvidence | null = null;
    const binding = createSyntheticMechanicsAttributionBindingFR257({
      providerRunRef: 'provider:fr257:bundle',
      expectedJpegBytes: jpeg,
      screenLandmarks: screenFixture(),
      metricLandmarks: metricEyeFixture(),
      poseTransformMatrixPackedColumnMajor: IDENTITY_PACKED_COLUMN_MAJOR,
      onEvidence: (value) => {
        captured = value;
      },
    });
    const metric = binding.primaryMetricExtractor(Uint8Array.from(jpeg));
    const baseRecord = acceptedRecord(metric.value);
    const first = bindCaptureGeometryAttributionSlotFR257({
      record: baseRecord,
      timestampMs: 10,
      providerRunRef: 'provider:fr257:bundle',
      evidence: captured,
    });

    const slots = [
      first,
      Object.freeze({ ...first, captureOrdinal: 2 as const, timestampMs: 20 }),
      Object.freeze({ ...first, sessionOrdinal: 2 as const, captureOrdinal: 1 as const, timestampMs: 30 }),
      Object.freeze({ ...first, sessionOrdinal: 2 as const, captureOrdinal: 2 as const, timestampMs: 40 }),
    ];
    const bundle = buildCaptureGeometryAttributionBundleFR257({
      generatedAt: '2026-09-23T00:00:10.000Z',
      slots,
    });

    expect(bundle.descriptiveSummary.recordedSlotCount).toBe(4);
    expect(bundle.descriptiveSummary.geometryAttributionCount).toBe(4);
    expect(bundle.privacyBoundary.participantRefRetained).toBe(false);
    expect(bundle.privacyBoundary.providerRunRefRetained).toBe(false);
    expect(bundle.privacyBoundary.rawMetricLandmarksPersisted).toBe(false);
    expect(bundle.privacyBoundary.scalarGeometryPersisted).toBe(true);
    expect(bundle.authorityBoundary.poseAcceptanceThresholdIssued).toBe(false);
    expect(bundle.authorityBoundary.correctionFormulaIssued).toBe(false);
    expect(JSON.stringify(bundle)).not.toContain('participant:test');
    expect(JSON.stringify(bundle)).not.toContain('provider:fr257:bundle');
  });
});
