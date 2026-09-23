import type {
  MediaPipeFaceLandmarkerResultFR25V1,
  MediaPipeNormalizedLandmarkFR25V1,
} from './mediapipe-eye-landmark-adapter-fr25.js';
import {
  DEFAULT_MEDIAPIPE_FACE_LANDMARKER_RUNTIME_FACTORY_FR26,
  type MediaPipeFaceLandmarkerRuntimeFactoryFR26V1,
} from './mediapipe-face-landmarker-runtime-fr26.js';
import {
  reimplementMediaPipeScreenToMetricFR76,
  validateMediaPipeScreenToMetricReimplementationParityFR76,
  type MediaPipeMetricGeometryPointFR76V1,
  type MediaPipeScreenToMetricReimplementationParityFR76V1,
} from './mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import { issueMediaPipeGeometryProfileFR77 } from './governed-metric-geometry-runtime-fr77.js';
import {
  deriveEyeOuterCornerTiltInputFromMetricGeometryFR209,
} from './governed-geometry-to-fr208-adapter-fr209.js';
import { computeEyeOuterCornerTiltFR208 } from './cross-face-neutral-observable-primitives-fr208.js';
import { computeMesh6DPoseEvidence } from './mesh6d-multi-frame-pose-sweep-evidence.js';
import { FR237_PRIMARY_METRIC } from './observable-morphology-repeatability-study-preregistration-fr237.js';
import type {
  FR242PrimaryMetricExtraction,
} from './observable-morphology-ephemeral-live-camera-frame-intake-fr242.js';
import type {
  FR243DryRunCaptureExecutionRecord,
} from './observable-morphology-governed-dry-run-execution-recorder-fr243.js';
import type {
  FR244PreparedPrimaryMetricBinding,
  FR244PrimaryMetricBindingPreparer,
} from './observable-morphology-browser-live-camera-jpeg-bridge-fr244.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR257_CONTRACT_VERSION =
  'FR257-SAME-FRAME-CAPTURE-GEOMETRY-ATTRIBUTION-v1' as const;

export const FR257_NEXT_FRONTIER =
  'collect_eye_level_low_angle_high_angle_fr251_executions_with_fr257_scalar_geometry_then_review_descriptive_pose_sensitivity' as const;

const PROVIDER_LANDMARK_COUNT = 478;
const GEOMETRY_LANDMARK_COUNT = 468;
const SAFE_RUN_REF = /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,255}$/u;
const EPSILON = 1e-12;

export interface FR257CaptureGeometryScalars {
  readonly lateralOrientationRadians: number;
  readonly verticalOrientationRadians: number;
  readonly relativeRotationFromFirstAcceptedCaptureRadians: number;
  readonly inPlaneLateralAxisOrientationRadians: number;
  readonly poseUniformScaleComponent: number;
  readonly screenFaceBoxWidthFraction: number;
  readonly screenFaceBoxHeightFraction: number;
  readonly screenFaceBoxAreaFraction: number;
}

export interface FR257SameFrameAttributionEvidence {
  readonly schemaVersion: 'fr257-same-frame-attribution-evidence-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR257_CONTRACT_VERSION;
  readonly authorityState: 'same_frame_metric_geometry_scalar_attribution_descriptive_only';
  readonly providerRunRef: string;
  readonly sameFrameBinding: {
    readonly providerDetectionSharedByMetricAndGeometry: true;
    readonly fr76MetricGeometrySharedByMetricAndPoseScalars: true;
    readonly exactFR244JpegBindingVerifiedAtMetricExtraction: true;
  };
  readonly primaryMetric: FR242PrimaryMetricExtraction;
  readonly geometry: FR257CaptureGeometryScalars;
  readonly persistenceBoundary: {
    readonly rawMediaPersisted: false;
    readonly rawImageDigestComputed: false;
    readonly rawImageDigestPersisted: false;
    readonly rawProviderResponsePersisted: false;
    readonly rawScreenLandmarksPersisted: false;
    readonly rawMetricLandmarksPersisted: false;
    readonly poseTransformMatrixPersisted: false;
    readonly scalarGeometryPersisted: true;
    readonly faceEmbeddingPersisted: false;
    readonly identityTemplatePersisted: false;
  };
  readonly authorityBoundary: {
    readonly geometryIsDescriptiveOnly: true;
    readonly poseThresholdIssued: false;
    readonly poseClassificationIssued: false;
    readonly calibrationIssued: false;
    readonly correctionFormulaIssued: false;
    readonly empiricalRepeatabilityEstablished: false;
    readonly interpretationValidityEstablished: false;
    readonly traditionalBindingIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
}

export interface FR257CaptureGeometryAttributionSlot {
  readonly schemaVersion: 'fr257-capture-geometry-attribution-slot-v1';
  readonly sessionOrdinal: 1 | 2;
  readonly captureOrdinal: 1 | 2;
  readonly timestampMs: number;
  readonly resultStatus: 'rejected' | 'accepted_for_dry_run_mechanics_only';
  readonly primaryMetric: FR242PrimaryMetricExtraction | null;
  readonly geometry: FR257CaptureGeometryScalars | null;
  readonly geometryAttributionState:
    | 'same_frame_scalar_geometry_available'
    | 'unavailable_capture_rejected_before_primary_metric_extraction';
}

export interface FR257NumericRange {
  readonly min: number;
  readonly max: number;
  readonly span: number;
}

export interface FR257CaptureGeometryAttributionBundle {
  readonly schemaVersion: 'fr257-capture-geometry-attribution-bundle-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR257_CONTRACT_VERSION;
  readonly authorityState: 'capture_geometry_attribution_descriptive_only_no_threshold_or_calibration';
  readonly generatedAt: string;
  readonly source: {
    readonly fr251SchemaVersion: 'fr251-localhost-dry-run-sanitized-export-v1';
    readonly fr243RecordSchemaVersion: 'fr243-dry-run-capture-execution-record-v1';
    readonly metricRef: typeof FR237_PRIMARY_METRIC;
    readonly requiredSlotCount: 4;
  };
  readonly slots: readonly FR257CaptureGeometryAttributionSlot[];
  readonly descriptiveSummary: {
    readonly recordedSlotCount: 4;
    readonly acceptedMetricCount: number;
    readonly geometryAttributionCount: number;
    readonly lateralOrientationRadians: FR257NumericRange | null;
    readonly verticalOrientationRadians: FR257NumericRange | null;
    readonly relativeRotationFromFirstAcceptedCaptureRadians: FR257NumericRange | null;
    readonly inPlaneLateralAxisOrientationRadians: FR257NumericRange | null;
    readonly poseUniformScaleComponent: FR257NumericRange | null;
    readonly screenFaceBoxWidthFraction: FR257NumericRange | null;
    readonly screenFaceBoxHeightFraction: FR257NumericRange | null;
    readonly screenFaceBoxAreaFraction: FR257NumericRange | null;
    readonly evaluationState: 'descriptive_only_no_pose_acceptance_or_correction';
  };
  readonly privacyBoundary: {
    readonly participantRefRetained: false;
    readonly operatorRefRetained: false;
    readonly providerRunRefRetained: false;
    readonly rawMediaPersisted: false;
    readonly rawImageDigestPersisted: false;
    readonly rawProviderResponsePersisted: false;
    readonly rawScreenLandmarksPersisted: false;
    readonly rawMetricLandmarksPersisted: false;
    readonly poseTransformMatrixPersisted: false;
    readonly scalarGeometryPersisted: true;
    readonly faceEmbeddingPersisted: false;
    readonly identityTemplatePersisted: false;
  };
  readonly authorityBoundary: {
    readonly empiricalRepeatabilityEstablished: false;
    readonly captureQualityConstructValidated: false;
    readonly poseAcceptanceThresholdIssued: false;
    readonly distanceAcceptanceThresholdIssued: false;
    readonly calibrationIssued: false;
    readonly correctionFormulaIssued: false;
    readonly confidenceGradeIssued: false;
    readonly interpretationValidityEstablished: false;
    readonly traditionalBindingIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly nextFrontier: typeof FR257_NEXT_FRONTIER;
}

export interface FR257EphemeralGeometryObservation {
  readonly providerRunRef: string;
  readonly screenLandmarks: readonly MediaPipeMetricGeometryPointFR76V1[];
  readonly metricLandmarks: readonly MediaPipeMetricGeometryPointFR76V1[];
  readonly poseTransformMatrixPackedColumnMajor: readonly number[];
  readonly primaryMetric: FR242PrimaryMetricExtraction;
}

export type FR257EphemeralGeometryObserver = (
  observation: FR257EphemeralGeometryObservation,
) => void;

export interface FR257CaptureGeometryCollector {
  readonly primaryMetricBindingPreparer: FR244PrimaryMetricBindingPreparer;
  readonly takeEvidence: (
    providerRunRef: string,
  ) => FR257SameFrameAttributionEvidence | null;
  readonly pendingEvidenceCount: () => number;
}

type PreparedGeometry = {
  readonly screenLandmarks: readonly MediaPipeMetricGeometryPointFR76V1[];
  readonly metricLandmarks: readonly MediaPipeMetricGeometryPointFR76V1[];
  readonly poseTransformMatrixPackedColumnMajor: readonly number[];
};

function fail(message: string): never {
  throw new FaceAuthorityValidationError('FR-257 ' + message);
}

function finite(value: number, label: string): number {
  if (!Number.isFinite(value)) fail(label + ' must be finite.');
  return value;
}

function sameBytes(left: Uint8Array, right: Uint8Array): boolean {
  if (left.byteLength !== right.byteLength) return false;
  for (let index = 0; index < left.byteLength; index += 1) {
    if (left[index] !== right[index]) return false;
  }
  return true;
}

function validateProviderLandmark(
  landmark: MediaPipeNormalizedLandmarkFR25V1,
  index: number,
): MediaPipeMetricGeometryPointFR76V1 {
  if (typeof landmark !== 'object' || landmark === null) {
    fail(`faceLandmarks[${index}] must be an object.`);
  }
  const allowed = new Set(['x', 'y', 'z', 'visibility']);
  const unexpected = Object.keys(landmark).find((key) => !allowed.has(key));
  if (unexpected !== undefined) {
    fail(`faceLandmarks[${index}] contains unauthorized field: ${unexpected}.`);
  }
  if (!Number.isFinite(landmark.x) || landmark.x < 0 || landmark.x > 1) {
    fail(`faceLandmarks[${index}].x must be finite within [0,1].`);
  }
  if (!Number.isFinite(landmark.y) || landmark.y < 0 || landmark.y > 1) {
    fail(`faceLandmarks[${index}].y must be finite within [0,1].`);
  }
  if (!Number.isFinite(landmark.z)) {
    fail(`faceLandmarks[${index}].z must be finite.`);
  }
  if (landmark.visibility !== undefined && !Number.isFinite(landmark.visibility)) {
    fail(`faceLandmarks[${index}].visibility must be finite when present.`);
  }
  return Object.freeze({ x: landmark.x, y: landmark.y, z: landmark.z });
}

function geometryInputFromProviderResult(
  result: MediaPipeFaceLandmarkerResultFR25V1,
): readonly MediaPipeMetricGeometryPointFR76V1[] {
  if (typeof result !== 'object' || result === null) {
    fail('FaceLandmarker result must be an object.');
  }
  const allowed = new Set([
    'faceLandmarks',
    'faceBlendshapes',
    'facialTransformationMatrixes',
  ]);
  const unexpected = Object.keys(result).find((key) => !allowed.has(key));
  if (unexpected !== undefined) {
    fail(`FaceLandmarker result contains unauthorized field: ${unexpected}.`);
  }
  if (
    !Array.isArray(result.faceLandmarks)
    || !Array.isArray(result.faceBlendshapes)
    || !Array.isArray(result.facialTransformationMatrixes)
  ) {
    fail('FaceLandmarker result arrays are malformed.');
  }
  if (result.faceLandmarks.length !== 1) {
    fail(`requires exactly one detected face; received ${result.faceLandmarks.length}.`);
  }
  if (
    result.faceBlendshapes.length !== 0
    || result.facialTransformationMatrixes.length !== 0
  ) {
    fail('blendshape and provider transformation-matrix outputs must remain disabled.');
  }
  const landmarks = result.faceLandmarks[0];
  if (!Array.isArray(landmarks) || landmarks.length !== PROVIDER_LANDMARK_COUNT) {
    fail(`requires exactly ${PROVIDER_LANDMARK_COUNT} provider landmarks.`);
  }
  return Object.freeze(
    landmarks
      .slice(0, GEOMETRY_LANDMARK_COUNT)
      .map((landmark, index) => validateProviderLandmark(landmark, index)),
  );
}

function screenFaceBox(
  landmarks: readonly MediaPipeMetricGeometryPointFR76V1[],
): Readonly<{
  widthFraction: number;
  heightFraction: number;
  areaFraction: number;
}> {
  if (landmarks.length !== GEOMETRY_LANDMARK_COUNT) {
    fail('screen face-box proxy requires exactly 468 landmarks.');
  }
  const xs = landmarks.map((point) => finite(point.x, 'screen landmark x'));
  const ys = landmarks.map((point) => finite(point.y, 'screen landmark y'));
  const widthFraction = Math.max(...xs) - Math.min(...xs);
  const heightFraction = Math.max(...ys) - Math.min(...ys);
  if (!(widthFraction > EPSILON) || !(heightFraction > EPSILON)) {
    fail('screen face-box proxy must have positive width and height.');
  }
  return Object.freeze({
    widthFraction,
    heightFraction,
    areaFraction: widthFraction * heightFraction,
  });
}

function inPlaneLateralAxisOrientationRadians(
  poseTransformMatrixPackedColumnMajor: readonly number[],
): number {
  if (
    poseTransformMatrixPackedColumnMajor.length !== 16
    || poseTransformMatrixPackedColumnMajor.some((value) => !Number.isFinite(value))
  ) {
    fail('pose transform must contain exactly 16 finite packed elements.');
  }
  const x = poseTransformMatrixPackedColumnMajor[0]!;
  const y = poseTransformMatrixPackedColumnMajor[1]!;
  if (!(Math.hypot(x, y) > EPSILON)) {
    fail('projected canonical lateral axis is degenerate.');
  }
  return Math.atan2(y, x);
}

export function deriveCaptureGeometryScalarsFR257(input: {
  readonly screenLandmarks: readonly MediaPipeMetricGeometryPointFR76V1[];
  readonly poseTransformMatrixPackedColumnMajor: readonly number[];
  readonly firstAcceptedPoseTransformMatrixPackedColumnMajor: readonly number[];
}): FR257CaptureGeometryScalars {
  const pose = computeMesh6DPoseEvidence(
    input.poseTransformMatrixPackedColumnMajor,
    input.firstAcceptedPoseTransformMatrixPackedColumnMajor,
  );
  const faceBox = screenFaceBox(input.screenLandmarks);
  return Object.freeze({
    lateralOrientationRadians: finite(
      pose.lateralOrientationRadians,
      'lateralOrientationRadians',
    ),
    verticalOrientationRadians: finite(
      pose.verticalOrientationRadians,
      'verticalOrientationRadians',
    ),
    relativeRotationFromFirstAcceptedCaptureRadians: finite(
      pose.relativeRotationFromFirstFrameRadians,
      'relativeRotationFromFirstAcceptedCaptureRadians',
    ),
    inPlaneLateralAxisOrientationRadians: finite(
      inPlaneLateralAxisOrientationRadians(
        input.poseTransformMatrixPackedColumnMajor,
      ),
      'inPlaneLateralAxisOrientationRadians',
    ),
    poseUniformScaleComponent: finite(
      pose.uniformScaleComponent,
      'poseUniformScaleComponent',
    ),
    screenFaceBoxWidthFraction: faceBox.widthFraction,
    screenFaceBoxHeightFraction: faceBox.heightFraction,
    screenFaceBoxAreaFraction: faceBox.areaFraction,
  });
}

function computePrimaryMetric(
  metricLandmarks: readonly MediaPipeMetricGeometryPointFR76V1[],
): FR242PrimaryMetricExtraction {
  const derived = deriveEyeOuterCornerTiltInputFromMetricGeometryFR209(
    metricLandmarks,
  );
  if (derived.status !== 'available') {
    fail(`frozen primary metric is unavailable: ${derived.reason}.`);
  }
  const metric = computeEyeOuterCornerTiltFR208(Object.freeze({
    ...derived.input,
    sourceObservationRefs: Object.freeze([
      'fr257:same_frame_fr76_metric_geometry',
      'fr24:two_closed_eye_cycles:provider_labels_not_semantic',
      'fr209:role_invariant_cycle_extrema_relative_to_mesh_midline',
    ]),
  })).mean;
  if (
    metric.metricRef !== FR237_PRIMARY_METRIC
    || metric.unit !== 'degree'
    || !Number.isFinite(metric.value)
    || metric.classificationApplied !== false
    || metric.thresholdApplied !== false
    || metric.calibrationApplied !== false
    || metric.traditionalBindingApplied !== false
  ) {
    fail('frozen FR237 primary metric boundary drift.');
  }
  return Object.freeze({
    metricRef: FR237_PRIMARY_METRIC,
    unit: 'degree' as const,
    value: metric.value,
  });
}

function prepareBindingFromGeometry(input: {
  readonly providerRunRef: string;
  readonly expectedJpegBytes: Uint8Array;
  readonly preparedGeometry: PreparedGeometry;
  readonly baselinePoseMatrix: () => readonly number[] | undefined;
  readonly commitFirstAcceptedPoseMatrix: (matrix: readonly number[]) => void;
  readonly commitEvidence: (evidence: FR257SameFrameAttributionEvidence) => void;
  readonly onEphemeralGeometry?: FR257EphemeralGeometryObserver;
}): FR244PreparedPrimaryMetricBinding {
  let expectedJpegBytes: Uint8Array | undefined = Uint8Array.from(
    input.expectedJpegBytes,
  );
  let screenLandmarks:
    | readonly MediaPipeMetricGeometryPointFR76V1[]
    | undefined = input.preparedGeometry.screenLandmarks;
  let metricLandmarks:
    | readonly MediaPipeMetricGeometryPointFR76V1[]
    | undefined = input.preparedGeometry.metricLandmarks;
  let poseMatrix:
    | readonly number[]
    | undefined = input.preparedGeometry.poseTransformMatrixPackedColumnMajor;
  let disposed = false;
  let consumed = false;

  const primaryMetricExtractor = (
    ephemeralBytes: Uint8Array,
  ): FR242PrimaryMetricExtraction => {
    if (disposed) fail('prepared attribution binding has already been disposed.');
    if (consumed) fail('prepared attribution binding is single-use.');
    if (
      expectedJpegBytes === undefined
      || screenLandmarks === undefined
      || metricLandmarks === undefined
      || poseMatrix === undefined
    ) {
      fail('prepared attribution binding has no live ephemeral state.');
    }
    if (!sameBytes(ephemeralBytes, expectedJpegBytes)) {
      fail('FR242 working bytes do not match the exact FR244 JPEG bound to this provider run.');
    }

    const primaryMetric = computePrimaryMetric(metricLandmarks);
    const firstAcceptedPoseMatrix = input.baselinePoseMatrix() ?? poseMatrix;
    const geometry = deriveCaptureGeometryScalarsFR257({
      screenLandmarks,
      poseTransformMatrixPackedColumnMajor: poseMatrix,
      firstAcceptedPoseTransformMatrixPackedColumnMajor: firstAcceptedPoseMatrix,
    });

    input.onEphemeralGeometry?.(Object.freeze({
      providerRunRef: input.providerRunRef,
      screenLandmarks,
      metricLandmarks,
      poseTransformMatrixPackedColumnMajor: poseMatrix,
      primaryMetric,
    }));

    input.commitEvidence(Object.freeze({
      schemaVersion: 'fr257-same-frame-attribution-evidence-v1' as const,
      artifactVersion: '0.1.0' as const,
      contractVersion: FR257_CONTRACT_VERSION,
      authorityState:
        'same_frame_metric_geometry_scalar_attribution_descriptive_only' as const,
      providerRunRef: input.providerRunRef,
      sameFrameBinding: Object.freeze({
        providerDetectionSharedByMetricAndGeometry: true as const,
        fr76MetricGeometrySharedByMetricAndPoseScalars: true as const,
        exactFR244JpegBindingVerifiedAtMetricExtraction: true as const,
      }),
      primaryMetric,
      geometry,
      persistenceBoundary: Object.freeze({
        rawMediaPersisted: false as const,
        rawImageDigestComputed: false as const,
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
        geometryIsDescriptiveOnly: true as const,
        poseThresholdIssued: false as const,
        poseClassificationIssued: false as const,
        calibrationIssued: false as const,
        correctionFormulaIssued: false as const,
        empiricalRepeatabilityEstablished: false as const,
        interpretationValidityEstablished: false as const,
        traditionalBindingIssued: false as const,
        productionActivated: false as const,
        commerceActivated: false as const,
      }),
    }));

    if (input.baselinePoseMatrix() === undefined) {
      input.commitFirstAcceptedPoseMatrix(Object.freeze([...poseMatrix]));
    }

    consumed = true;
    expectedJpegBytes.fill(0);
    expectedJpegBytes = undefined;
    screenLandmarks = undefined;
    metricLandmarks = undefined;
    poseMatrix = undefined;
    return primaryMetric;
  };

  const dispose = (): void => {
    disposed = true;
    if (expectedJpegBytes !== undefined) expectedJpegBytes.fill(0);
    expectedJpegBytes = undefined;
    screenLandmarks = undefined;
    metricLandmarks = undefined;
    poseMatrix = undefined;
  };

  return Object.freeze({
    providerBackedPrimaryMetricBinding: true as const,
    rawImageDigestComputed: false as const,
    rawImageDigestPersisted: false as const,
    primaryMetricExtractor,
    dispose,
  });
}

export function createCaptureGeometryAttributionCollectorFR257(
  input: Readonly<{
    onEphemeralGeometry?: FR257EphemeralGeometryObserver;
  }> = Object.freeze({}),
): FR257CaptureGeometryCollector {
  let firstAcceptedPoseMatrix: readonly number[] | undefined;
  const pendingEvidence = new Map<string, FR257SameFrameAttributionEvidence>();

  const commitEvidence = (
    evidence: FR257SameFrameAttributionEvidence,
  ): void => {
    if (pendingEvidence.has(evidence.providerRunRef)) {
      fail('providerRunRef produced duplicate pending attribution evidence.');
    }
    pendingEvidence.set(evidence.providerRunRef, evidence);
  };

  const primaryMetricBindingPreparer: FR244PrimaryMetricBindingPreparer =
    Object.freeze({
      async prepare(
        input: Parameters<FR244PrimaryMetricBindingPreparer['prepare']>[0],
      ) {
        if (!SAFE_RUN_REF.test(input.providerRunRef)) {
          fail('providerRunRef must be a bounded opaque reference without whitespace.');
        }
        if (
          !(input.jpegBytes instanceof Uint8Array)
          || input.jpegBytes.byteLength === 0
        ) {
          fail('exact FR244 JPEG bytes are required for same-frame attribution.');
        }
        if (
          input.providerContext === undefined
          || typeof input.providerContext !== 'object'
          || input.providerContext === null
        ) {
          fail('FR257 providerContext is required.');
        }
        const context = input.providerContext as {
          readonly geometryMetadataPbtxt?: unknown;
          readonly parity?: unknown;
          readonly factory?: unknown;
        };
        if (typeof context.geometryMetadataPbtxt !== 'string') {
          fail('FR257 geometryMetadataPbtxt provider context is required.');
        }
        validateMediaPipeScreenToMetricReimplementationParityFR76(
          context.parity as MediaPipeScreenToMetricReimplementationParityFR76V1,
        );
        const profile = await issueMediaPipeGeometryProfileFR77(
          context.geometryMetadataPbtxt,
        );
        const factory =
          context.factory === undefined
            ? DEFAULT_MEDIAPIPE_FACE_LANDMARKER_RUNTIME_FACTORY_FR26
            : context.factory as MediaPipeFaceLandmarkerRuntimeFactoryFR26V1;
        if (
          typeof factory !== 'object'
          || factory === null
          || typeof factory.create !== 'function'
        ) {
          fail('runtime factory must expose create().');
        }

        const runtime = await factory.create();
        if (
          typeof runtime !== 'object'
          || runtime === null
          || typeof runtime.detect !== 'function'
          || typeof runtime.close !== 'function'
        ) {
          fail('runtime factory returned an invalid runtime instance.');
        }

        let preparedGeometry: PreparedGeometry;
        try {
          const providerResult = runtime.detect(input.image);
          const screenLandmarks = geometryInputFromProviderResult(providerResult);
          const metric = reimplementMediaPipeScreenToMetricFR76({
            screenLandmarks,
            canonicalMetricLandmarks: profile.canonicalMetricLandmarks,
            landmarkWeights: profile.landmarkWeights,
            frameWidth: input.width,
            frameHeight: input.height,
          });
          if (
            metric.metricLandmarks.length !== GEOMETRY_LANDMARK_COUNT
            || metric.poseTransformMatrixPackedColumnMajor.length !== 16
          ) {
            fail('FR76 metric geometry shape drift.');
          }
          preparedGeometry = Object.freeze({
            screenLandmarks,
            metricLandmarks: metric.metricLandmarks,
            poseTransformMatrixPackedColumnMajor:
              metric.poseTransformMatrixPackedColumnMajor,
          });
        } finally {
          runtime.close();
        }

        return prepareBindingFromGeometry({
          providerRunRef: input.providerRunRef,
          expectedJpegBytes: input.jpegBytes,
          preparedGeometry,
          baselinePoseMatrix: () => firstAcceptedPoseMatrix,
          commitFirstAcceptedPoseMatrix: (matrix) => {
            if (firstAcceptedPoseMatrix !== undefined) {
              fail('first accepted pose matrix may only be committed once.');
            }
            firstAcceptedPoseMatrix = Object.freeze([...matrix]);
          },
          commitEvidence,
          onEphemeralGeometry: input.onEphemeralGeometry,
        });
      },
    });

  const takeEvidence = (
    providerRunRef: string,
  ): FR257SameFrameAttributionEvidence | null => {
    const evidence = pendingEvidence.get(providerRunRef);
    if (evidence === undefined) return null;
    pendingEvidence.delete(providerRunRef);
    return evidence;
  };

  return Object.freeze({
    primaryMetricBindingPreparer,
    takeEvidence,
    pendingEvidenceCount: () => pendingEvidence.size,
  });
}

function exactMetricMatch(
  left: FR242PrimaryMetricExtraction,
  right: FR242PrimaryMetricExtraction,
): boolean {
  return (
    left.metricRef === right.metricRef
    && left.unit === right.unit
    && left.value === right.value
  );
}

export function bindCaptureGeometryAttributionSlotFR257(input: {
  readonly record: FR243DryRunCaptureExecutionRecord;
  readonly timestampMs: number;
  readonly providerRunRef: string;
  readonly evidence: FR257SameFrameAttributionEvidence | null;
}): FR257CaptureGeometryAttributionSlot {
  if (!Number.isFinite(input.timestampMs)) {
    fail('capture timestampMs must be finite.');
  }
  if (!SAFE_RUN_REF.test(input.providerRunRef)) {
    fail('capture providerRunRef must be a bounded opaque reference.');
  }
  if (input.record.schemaVersion !== 'fr243-dry-run-capture-execution-record-v1') {
    fail('requires an FR243 capture execution record.');
  }

  if (input.record.resultStatus === 'accepted_for_dry_run_mechanics_only') {
    if (
      input.record.primaryMetric === null
      || input.record.metricExtractorInvoked !== true
      || input.evidence === null
      || input.evidence.providerRunRef !== input.providerRunRef
      || !exactMetricMatch(input.record.primaryMetric, input.evidence.primaryMetric)
    ) {
      fail('accepted capture must bind exact same-frame FR243 metric and FR257 evidence.');
    }
    return Object.freeze({
      schemaVersion: 'fr257-capture-geometry-attribution-slot-v1' as const,
      sessionOrdinal: input.record.sessionOrdinal,
      captureOrdinal: input.record.captureOrdinal,
      timestampMs: input.timestampMs,
      resultStatus: input.record.resultStatus,
      primaryMetric: Object.freeze({ ...input.record.primaryMetric }),
      geometry: input.evidence.geometry,
      geometryAttributionState:
        'same_frame_scalar_geometry_available' as const,
    });
  }

  if (
    input.record.primaryMetric !== null
    || input.record.metricExtractorInvoked !== false
    || input.evidence !== null
  ) {
    fail('rejected capture must not retain metric or geometry attribution evidence.');
  }
  return Object.freeze({
    schemaVersion: 'fr257-capture-geometry-attribution-slot-v1' as const,
    sessionOrdinal: input.record.sessionOrdinal,
    captureOrdinal: input.record.captureOrdinal,
    timestampMs: input.timestampMs,
    resultStatus: input.record.resultStatus,
    primaryMetric: null,
    geometry: null,
    geometryAttributionState:
      'unavailable_capture_rejected_before_primary_metric_extraction' as const,
  });
}

function numericRange(values: readonly number[]): FR257NumericRange | null {
  if (values.length === 0) return null;
  if (values.some((value) => !Number.isFinite(value))) {
    fail('descriptive range received non-finite values.');
  }
  const min = Math.min(...values);
  const max = Math.max(...values);
  return Object.freeze({ min, max, span: max - min });
}

function exactIso(value: string): void {
  const parsed = Date.parse(value);
  if (!Number.isFinite(parsed) || new Date(parsed).toISOString() !== value) {
    fail('generatedAt must be an exact ISO-8601 UTC timestamp.');
  }
}

export function buildCaptureGeometryAttributionBundleFR257(input: {
  readonly generatedAt: string;
  readonly slots: readonly FR257CaptureGeometryAttributionSlot[];
}): FR257CaptureGeometryAttributionBundle {
  exactIso(input.generatedAt);
  if (input.slots.length !== 4) {
    fail('bundle requires exactly four FR251 capture slots.');
  }
  const expected = ['1:1', '1:2', '2:1', '2:2'];
  const actual = input.slots.map(
    (slot) => `${slot.sessionOrdinal}:${slot.captureOrdinal}`,
  );
  if (actual.some((value, index) => value !== expected[index])) {
    fail('bundle slots must remain ordered exactly as 1:1, 1:2, 2:1, 2:2.');
  }

  const accepted = input.slots.filter(
    (slot) => slot.primaryMetric !== null && slot.geometry !== null,
  );
  const geometries = accepted.map((slot) => slot.geometry!);

  return Object.freeze({
    schemaVersion: 'fr257-capture-geometry-attribution-bundle-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR257_CONTRACT_VERSION,
    authorityState:
      'capture_geometry_attribution_descriptive_only_no_threshold_or_calibration' as const,
    generatedAt: input.generatedAt,
    source: Object.freeze({
      fr251SchemaVersion:
        'fr251-localhost-dry-run-sanitized-export-v1' as const,
      fr243RecordSchemaVersion:
        'fr243-dry-run-capture-execution-record-v1' as const,
      metricRef: FR237_PRIMARY_METRIC,
      requiredSlotCount: 4 as const,
    }),
    slots: Object.freeze([...input.slots]),
    descriptiveSummary: Object.freeze({
      recordedSlotCount: 4 as const,
      acceptedMetricCount: accepted.length,
      geometryAttributionCount: geometries.length,
      lateralOrientationRadians: numericRange(
        geometries.map((item) => item.lateralOrientationRadians),
      ),
      verticalOrientationRadians: numericRange(
        geometries.map((item) => item.verticalOrientationRadians),
      ),
      relativeRotationFromFirstAcceptedCaptureRadians: numericRange(
        geometries.map(
          (item) => item.relativeRotationFromFirstAcceptedCaptureRadians,
        ),
      ),
      inPlaneLateralAxisOrientationRadians: numericRange(
        geometries.map((item) => item.inPlaneLateralAxisOrientationRadians),
      ),
      poseUniformScaleComponent: numericRange(
        geometries.map((item) => item.poseUniformScaleComponent),
      ),
      screenFaceBoxWidthFraction: numericRange(
        geometries.map((item) => item.screenFaceBoxWidthFraction),
      ),
      screenFaceBoxHeightFraction: numericRange(
        geometries.map((item) => item.screenFaceBoxHeightFraction),
      ),
      screenFaceBoxAreaFraction: numericRange(
        geometries.map((item) => item.screenFaceBoxAreaFraction),
      ),
      evaluationState:
        'descriptive_only_no_pose_acceptance_or_correction' as const,
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
    nextFrontier: FR257_NEXT_FRONTIER,
  });
}

export function createSyntheticMechanicsAttributionBindingFR257(input: {
  readonly providerRunRef: string;
  readonly expectedJpegBytes: Uint8Array;
  readonly screenLandmarks: readonly MediaPipeMetricGeometryPointFR76V1[];
  readonly metricLandmarks: readonly MediaPipeMetricGeometryPointFR76V1[];
  readonly poseTransformMatrixPackedColumnMajor: readonly number[];
  readonly firstAcceptedPoseTransformMatrixPackedColumnMajor?: readonly number[];
  readonly onEvidence: (evidence: FR257SameFrameAttributionEvidence) => void;
}): FR244PreparedPrimaryMetricBinding {
  let first = input.firstAcceptedPoseTransformMatrixPackedColumnMajor;
  return prepareBindingFromGeometry({
    providerRunRef: input.providerRunRef,
    expectedJpegBytes: input.expectedJpegBytes,
    preparedGeometry: Object.freeze({
      screenLandmarks: input.screenLandmarks,
      metricLandmarks: input.metricLandmarks,
      poseTransformMatrixPackedColumnMajor:
        input.poseTransformMatrixPackedColumnMajor,
    }),
    baselinePoseMatrix: () => first,
    commitFirstAcceptedPoseMatrix: (matrix) => {
      first = matrix;
    },
    commitEvidence: input.onEvidence,
  });
}
