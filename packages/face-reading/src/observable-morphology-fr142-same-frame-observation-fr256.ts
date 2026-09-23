import {
  orderClosedCycleProviderVerticesFR16,
  type ProviderConnectionEdgeV1,
} from './provider-adapter-evidence-fr16.js';
import {
  FR65_MEDIAPIPE_LIPS_RELEASE_EDGES,
} from './mediapipe-lips-topology-admission-fr65.js';
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
import {
  issueMediaPipeGeometryProfileFR77,
} from './governed-metric-geometry-runtime-fr77.js';
import {
  deriveEyeOuterCornerTiltInputFromMetricGeometryFR209,
} from './governed-geometry-to-fr208-adapter-fr209.js';
import {
  computeEyeOuterCornerTiltFR208,
} from './cross-face-neutral-observable-primitives-fr208.js';
import {
  computeSquareBroadFangNeutralCandidateKernelFR142,
} from './five-officers-square-broad-fang-neutral-candidate-metric-runtime-fr142.js';
import {
  FR237_PRIMARY_METRIC,
} from './observable-morphology-repeatability-study-preregistration-fr237.js';
import type {
  FR242PrimaryMetricExtraction,
} from './observable-morphology-ephemeral-live-camera-frame-intake-fr242.js';
import type {
  FR244PreparedPrimaryMetricBinding,
  FR244PrimaryMetricBindingPreparer,
} from './observable-morphology-browser-live-camera-jpeg-bridge-fr244.js';
import {
  materializeChallengeFirstBrowserDryRunCoordinatorFR250,
} from './observable-morphology-challenge-first-browser-dry-run-fr250.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR256_CONTRACT_VERSION =
  'FR256-SAME-FRAME-FR142-MOUTH-CANDIDATE-OBSERVATION-v1' as const;

export const FR256_METRIC_REFS = Object.freeze([
  'neutral.mouth.contour_set.horizontal_reflection_nearest_set_residual_ratio@0.1.0',
  'neutral.mouth.contour_set.orthogonal_edge_orientation_concentration@0.1.0',
  'neutral.mouth.contour_set.turning_angle_concentration_index@0.1.0',
] as const);

export const FR256_NEXT_FRONTIER =
  'wire_fr256_into_a_separate_operator_surface_then_collect_temporally_separated_real_repeat_capture_observations_for_fr142_candidates' as const;

const PROVIDER_LANDMARK_COUNT = 478;
const GEOMETRY_LANDMARK_COUNT = 468;
const SAFE_RUN_REF = /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,255}$/u;

export interface FR256MouthCandidateObservation {
  readonly schemaVersion: 'fr256-mouth-candidate-observation-v1';
  readonly providerRunRef: string;
  readonly sourceGeometry: {
    readonly coordinateFrame: 'canonical_aligned_right_handed_metric_3d';
    readonly geometryLandmarkCount: 468;
    readonly lipsContourCount: 2;
    readonly lipsContourPointCounts: readonly [20, 20];
    readonly poseNormalizedByCanonicalXYProjection: true;
  };
  readonly metrics: readonly [
    {
      readonly metricRef: typeof FR256_METRIC_REFS[0];
      readonly unit: 'ratio';
      readonly value: number;
    },
    {
      readonly metricRef: typeof FR256_METRIC_REFS[1];
      readonly unit: 'ratio';
      readonly value: number;
    },
    {
      readonly metricRef: typeof FR256_METRIC_REFS[2];
      readonly unit: 'ratio';
      readonly value: number;
    },
  ];
  readonly evidenceBoundary: {
    readonly exactSameFrameBindingRequired: true;
    readonly emittedOnlyAfterFR242QualityAcceptance: true;
    readonly rawImagePersisted: false;
    readonly rawImageDigestComputed: false;
    readonly rawLandmarksPersisted: false;
    readonly derivedGeometryPersisted: false;
    readonly captureQualityConstructValidated: false;
    readonly empiricalRepeatabilityEstablished: false;
    readonly thresholdIssued: false;
    readonly calibrationIssued: false;
    readonly traditionalFangBindingIssued: false;
    readonly registryAdmissionIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
}

export interface FR256CaptureObservationRecord {
  readonly schemaVersion: 'fr256-capture-observation-record-v1';
  readonly participantRef: string;
  readonly sessionRef: string;
  readonly challengeRef: string;
  readonly sessionOrdinal: 1 | 2;
  readonly captureOrdinal: 1 | 2;
  readonly providerRunRef: string;
  readonly observation: FR256MouthCandidateObservation;
  readonly empiricalRepeatabilityEstablished: false;
  readonly canonicalizationAuthorized: false;
}

export interface FR256PreparedPrimaryMetricAndMouthObservationBinding
  extends FR244PreparedPrimaryMetricBinding {
  readonly schemaVersion:
    'fr256-prepared-primary-metric-and-mouth-candidate-binding-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR256_CONTRACT_VERSION;
  readonly authorityState:
    'same_frame_primary_metric_and_fr142_candidate_observation_prepared_no_empirical_promotion';
  readonly providerRunRef: string;
  readonly mouthCandidateMetricRefs: typeof FR256_METRIC_REFS;
  readonly observationPublishedOnlyAfterPrimaryMetricExtraction: true;
  readonly authorityBoundary: {
    readonly fr242ContractMutated: false;
    readonly captureQualityValidated: false;
    readonly empiricalRepeatabilityEstablished: false;
    readonly traditionalFangBindingIssued: false;
    readonly registryAdmissionIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
}

const PUBLISHED = new Map<string, FR256MouthCandidateObservation>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError('FR-256 ' + message);
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
  return Object.freeze({ x: landmark.x, y: landmark.y, z: landmark.z });
}

function geometryInputFromProviderResult(
  result: MediaPipeFaceLandmarkerResultFR25V1,
): readonly MediaPipeMetricGeometryPointFR76V1[] {
  if (
    typeof result !== 'object'
    || result === null
    || !Array.isArray(result.faceLandmarks)
    || !Array.isArray(result.faceBlendshapes)
    || !Array.isArray(result.facialTransformationMatrixes)
  ) {
    fail('FaceLandmarker result shape is invalid.');
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

function connectedComponents(
  edges: readonly ProviderConnectionEdgeV1[],
): readonly (readonly ProviderConnectionEdgeV1[])[] {
  const adjacency = new Map<number, Set<number>>();
  for (const edge of edges) {
    const left = adjacency.get(edge.start) ?? new Set<number>();
    left.add(edge.end);
    adjacency.set(edge.start, left);
    const right = adjacency.get(edge.end) ?? new Set<number>();
    right.add(edge.start);
    adjacency.set(edge.end, right);
  }

  const remaining = new Set(adjacency.keys());
  const vertexComponents: number[][] = [];
  while (remaining.size > 0) {
    const seed = Math.min(...remaining);
    const stack = [seed];
    const vertices: number[] = [];
    remaining.delete(seed);
    while (stack.length > 0) {
      const vertex = stack.pop()!;
      vertices.push(vertex);
      for (const neighbor of adjacency.get(vertex) ?? []) {
        if (remaining.delete(neighbor)) stack.push(neighbor);
      }
    }
    vertices.sort((left, right) => left - right);
    vertexComponents.push(vertices);
  }
  vertexComponents.sort((left, right) => left[0]! - right[0]!);
  return Object.freeze(vertexComponents.map((vertices) => {
    const members = new Set(vertices);
    return Object.freeze(
      edges.filter((edge) => members.has(edge.start) && members.has(edge.end)),
    );
  }));
}

function lipsContoursFromMetricGeometry(
  metricLandmarks: readonly MediaPipeMetricGeometryPointFR76V1[],
): readonly [
  readonly { readonly x: number; readonly y: number }[],
  readonly { readonly x: number; readonly y: number }[],
] {
  if (metricLandmarks.length !== GEOMETRY_LANDMARK_COUNT) {
    fail('metric geometry must contain exactly 468 landmarks.');
  }
  const components = connectedComponents(FR65_MEDIAPIPE_LIPS_RELEASE_EDGES);
  if (components.length !== 2) {
    fail('release-exact lips topology must contain exactly two components.');
  }
  const contours = components.map((component) => {
    const vertices = orderClosedCycleProviderVerticesFR16(component);
    if (vertices.length !== 20) {
      fail('each release-exact lips contour must contain exactly 20 vertices.');
    }
    return Object.freeze(vertices.map((vertex) => {
      const point = metricLandmarks[vertex];
      if (point === undefined) fail(`metric geometry is missing lips vertex ${vertex}.`);
      return Object.freeze({ x: point.x, y: point.y });
    }));
  });
  return Object.freeze([
    contours[0]!,
    contours[1]!,
  ]) as readonly [
    readonly { readonly x: number; readonly y: number }[],
    readonly { readonly x: number; readonly y: number }[],
  ];
}

export function computeMouthCandidateObservationFromMetricGeometryFR256(input: {
  readonly providerRunRef: string;
  readonly metricLandmarks: readonly MediaPipeMetricGeometryPointFR76V1[];
}): FR256MouthCandidateObservation {
  if (!SAFE_RUN_REF.test(input.providerRunRef)) {
    fail('providerRunRef must be a bounded opaque reference.');
  }
  const contours = lipsContoursFromMetricGeometry(input.metricLandmarks);
  const kernel = computeSquareBroadFangNeutralCandidateKernelFR142(contours);
  const values = [
    kernel.horizontalReflectionNearestSetResidualRatio,
    kernel.orthogonalEdgeOrientationConcentration,
    kernel.turningAngleConcentrationIndex,
  ];
  if (values.some((value) => !Number.isFinite(value))) {
    fail('FR142 candidate observation contains a non-finite value.');
  }

  return Object.freeze({
    schemaVersion: 'fr256-mouth-candidate-observation-v1' as const,
    providerRunRef: input.providerRunRef,
    sourceGeometry: Object.freeze({
      coordinateFrame: 'canonical_aligned_right_handed_metric_3d' as const,
      geometryLandmarkCount: 468 as const,
      lipsContourCount: 2 as const,
      lipsContourPointCounts: Object.freeze([20, 20] as const),
      poseNormalizedByCanonicalXYProjection: true as const,
    }),
    metrics: Object.freeze([
      Object.freeze({
        metricRef: FR256_METRIC_REFS[0],
        unit: 'ratio' as const,
        value: values[0]!,
      }),
      Object.freeze({
        metricRef: FR256_METRIC_REFS[1],
        unit: 'ratio' as const,
        value: values[1]!,
      }),
      Object.freeze({
        metricRef: FR256_METRIC_REFS[2],
        unit: 'ratio' as const,
        value: values[2]!,
      }),
    ] as const),
    evidenceBoundary: Object.freeze({
      exactSameFrameBindingRequired: true as const,
      emittedOnlyAfterFR242QualityAcceptance: true as const,
      rawImagePersisted: false as const,
      rawImageDigestComputed: false as const,
      rawLandmarksPersisted: false as const,
      derivedGeometryPersisted: false as const,
      captureQualityConstructValidated: false as const,
      empiricalRepeatabilityEstablished: false as const,
      thresholdIssued: false as const,
      calibrationIssued: false as const,
      traditionalFangBindingIssued: false as const,
      registryAdmissionIssued: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
  });
}

async function prepareBinding(input: {
  readonly image: unknown;
  readonly frameWidth: number;
  readonly frameHeight: number;
  readonly providerRunRef: string;
  readonly jpegBytes: Uint8Array;
  readonly geometryMetadataPbtxt: string;
  readonly parity: MediaPipeScreenToMetricReimplementationParityFR76V1;
  readonly factory?: MediaPipeFaceLandmarkerRuntimeFactoryFR26V1;
}): Promise<FR256PreparedPrimaryMetricAndMouthObservationBinding> {
  if (input.image === null || input.image === undefined) fail('in-memory frame image is required.');
  if (
    !Number.isInteger(input.frameWidth)
    || input.frameWidth <= 0
    || !Number.isInteger(input.frameHeight)
    || input.frameHeight <= 0
  ) {
    fail('frame dimensions must be positive integers.');
  }
  if (!SAFE_RUN_REF.test(input.providerRunRef)) {
    fail('providerRunRef must be a bounded opaque reference.');
  }
  if (!(input.jpegBytes instanceof Uint8Array) || input.jpegBytes.byteLength === 0) {
    fail('exact FR244 JPEG bytes are required.');
  }

  validateMediaPipeScreenToMetricReimplementationParityFR76(input.parity);
  const profile = await issueMediaPipeGeometryProfileFR77(
    input.geometryMetadataPbtxt,
  );
  const factory =
    input.factory ?? DEFAULT_MEDIAPIPE_FACE_LANDMARKER_RUNTIME_FACTORY_FR26;
  const runtime = await factory.create();
  let metricLandmarks: readonly MediaPipeMetricGeometryPointFR76V1[];
  try {
    const providerResult = runtime.detect(input.image);
    const screenLandmarks = geometryInputFromProviderResult(providerResult);
    const metric = reimplementMediaPipeScreenToMetricFR76({
      screenLandmarks,
      canonicalMetricLandmarks: profile.canonicalMetricLandmarks,
      landmarkWeights: profile.landmarkWeights,
      frameWidth: input.frameWidth,
      frameHeight: input.frameHeight,
    });
    if (
      metric.metricLandmarks.length !== GEOMETRY_LANDMARK_COUNT
      || metric.poseTransformMatrixPackedColumnMajor.length !== 16
    ) {
      fail('FR76 metric geometry shape drift.');
    }
    metricLandmarks = metric.metricLandmarks;
  } finally {
    runtime.close();
  }

  let expectedJpegBytes: Uint8Array | undefined = input.jpegBytes;
  let liveMetricLandmarks:
    | readonly MediaPipeMetricGeometryPointFR76V1[]
    | undefined = metricLandmarks;
  let consumed = false;
  let disposed = false;

  const primaryMetricExtractor = (
    ephemeralBytes: Uint8Array,
  ): FR242PrimaryMetricExtraction => {
    if (disposed) fail('prepared FR256 binding has been disposed.');
    if (consumed) fail('prepared FR256 binding is single-use.');
    if (expectedJpegBytes === undefined || liveMetricLandmarks === undefined) {
      fail('prepared FR256 binding has no live ephemeral state.');
    }
    if (!sameBytes(ephemeralBytes, expectedJpegBytes)) {
      fail('FR242 working bytes do not match the exact FR244 JPEG.');
    }

    const eyeInput = deriveEyeOuterCornerTiltInputFromMetricGeometryFR209(
      liveMetricLandmarks,
    );
    if (eyeInput.status !== 'available') {
      fail(`FR237 primary metric is unavailable: ${eyeInput.reason}.`);
    }
    const eyeMetric = computeEyeOuterCornerTiltFR208(Object.freeze({
      ...eyeInput.input,
      sourceObservationRefs: Object.freeze([
        'fr256:digestless_ephemeral_fr76_metric_geometry',
        'fr24:two_closed_eye_cycles:provider_labels_not_semantic',
        'fr209:role_invariant_cycle_extrema_relative_to_mesh_midline',
      ]),
    })).mean;
    if (
      eyeMetric.metricRef !== FR237_PRIMARY_METRIC
      || eyeMetric.unit !== 'degree'
      || !Number.isFinite(eyeMetric.value)
      || eyeMetric.classificationApplied !== false
      || eyeMetric.traditionalBindingApplied !== false
    ) {
      fail('FR237 primary metric boundary drift.');
    }

    const mouthObservation =
      computeMouthCandidateObservationFromMetricGeometryFR256({
        providerRunRef: input.providerRunRef,
        metricLandmarks: liveMetricLandmarks,
      });
    if (PUBLISHED.has(input.providerRunRef)) {
      fail('providerRunRef already has an unconsumed FR256 observation.');
    }
    PUBLISHED.set(input.providerRunRef, mouthObservation);

    consumed = true;
    expectedJpegBytes = undefined;
    liveMetricLandmarks = undefined;

    return Object.freeze({
      metricRef: FR237_PRIMARY_METRIC,
      unit: 'degree' as const,
      value: eyeMetric.value,
    });
  };

  const dispose = (): void => {
    disposed = true;
    expectedJpegBytes = undefined;
    liveMetricLandmarks = undefined;
  };

  return Object.freeze({
    schemaVersion:
      'fr256-prepared-primary-metric-and-mouth-candidate-binding-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR256_CONTRACT_VERSION,
    authorityState:
      'same_frame_primary_metric_and_fr142_candidate_observation_prepared_no_empirical_promotion' as const,
    providerRunRef: input.providerRunRef,
    mouthCandidateMetricRefs: FR256_METRIC_REFS,
    observationPublishedOnlyAfterPrimaryMetricExtraction: true as const,
    providerBackedPrimaryMetricBinding: true as const,
    rawImageDigestComputed: false as const,
    rawImageDigestPersisted: false as const,
    primaryMetricExtractor,
    dispose,
    authorityBoundary: Object.freeze({
      fr242ContractMutated: false as const,
      captureQualityValidated: false as const,
      empiricalRepeatabilityEstablished: false as const,
      traditionalFangBindingIssued: false as const,
      registryAdmissionIssued: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
  });
}

export const FR256_PRIMARY_METRIC_AND_MOUTH_OBSERVATION_PREPARER:
FR244PrimaryMetricBindingPreparer = Object.freeze({
  async prepare(input: Parameters<FR244PrimaryMetricBindingPreparer['prepare']>[0]) {
    if (
      input.providerContext === undefined
      || typeof input.providerContext !== 'object'
      || input.providerContext === null
    ) {
      fail('FR256 providerContext is required.');
    }
    const context = input.providerContext as {
      readonly geometryMetadataPbtxt?: unknown;
      readonly parity?: unknown;
      readonly factory?: unknown;
    };
    if (typeof context.geometryMetadataPbtxt !== 'string') {
      fail('FR256 geometryMetadataPbtxt provider context is required.');
    }
    return prepareBinding({
      image: input.image,
      frameWidth: input.width,
      frameHeight: input.height,
      providerRunRef: input.providerRunRef,
      jpegBytes: input.jpegBytes,
      geometryMetadataPbtxt: context.geometryMetadataPbtxt,
      parity: context.parity as MediaPipeScreenToMetricReimplementationParityFR76V1,
      ...(context.factory === undefined
        ? {}
        : {
            factory:
              context.factory as MediaPipeFaceLandmarkerRuntimeFactoryFR26V1,
          }),
    });
  },
});

export function takePublishedMouthCandidateObservationFR256(
  providerRunRef: string,
): FR256MouthCandidateObservation | null {
  const observation = PUBLISHED.get(providerRunRef) ?? null;
  PUBLISHED.delete(providerRunRef);
  return observation;
}

export function discardPublishedMouthCandidateObservationFR256(
  providerRunRef: string,
): void {
  PUBLISHED.delete(providerRunRef);
}

export type FR256CoordinatorInput = Omit<
  Parameters<typeof materializeChallengeFirstBrowserDryRunCoordinatorFR250>[0],
  'primaryMetricBindingPreparer'
>;

export function materializeMouthCandidateObservationDryRunCoordinatorFR256(
  input: FR256CoordinatorInput,
) {
  const base = materializeChallengeFirstBrowserDryRunCoordinatorFR250({
    ...input,
    primaryMetricBindingPreparer:
      FR256_PRIMARY_METRIC_AND_MOUTH_OBSERVATION_PREPARER,
  });
  const observations: FR256CaptureObservationRecord[] = [];

  return Object.freeze({
    schemaVersion:
      'fr256-mouth-candidate-observation-dry-run-coordinator-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR256_CONTRACT_VERSION,
    participantRef: base.participantRef,
    operatorRef: base.operatorRef,
    beginSession: base.beginSession,
    prepareCapture: base.prepareCapture,
    async capturePrepared(
      captureInput: Parameters<typeof base.capturePrepared>[0],
    ) {
      const result = await base.capturePrepared(captureInput);
      const providerRunRef = result.frame.providerRunRef;
      const observation =
        takePublishedMouthCandidateObservationFR256(providerRunRef);

      if (result.fr243Record.resultStatus === 'rejected') {
        if (observation !== null) {
          fail('quality-rejected capture unexpectedly published an FR256 observation.');
        }
        return Object.freeze({ browserCapture: result, mouthObservation: null });
      }

      if (observation === null) {
        fail('accepted capture did not publish its FR256 same-frame observation.');
      }
      const record: FR256CaptureObservationRecord = Object.freeze({
        schemaVersion: 'fr256-capture-observation-record-v1' as const,
        participantRef: result.fr243Record.participantRef,
        sessionRef: result.fr243Record.sessionRef,
        challengeRef: result.fr243Record.challengeRef,
        sessionOrdinal: result.fr243Record.sessionOrdinal,
        captureOrdinal: result.fr243Record.captureOrdinal,
        providerRunRef,
        observation,
        empiricalRepeatabilityEstablished: false as const,
        canonicalizationAuthorized: false as const,
      });
      observations.push(record);
      return Object.freeze({ browserCapture: result, mouthObservation: record });
    },
    review: base.review,
    getSanitizedRecords: base.getSanitizedRecords,
    getMouthCandidateObservations: () =>
      Object.freeze([...observations]) as readonly FR256CaptureObservationRecord[],
    authorityBoundary: Object.freeze({
      reusesFR250CaptureProtocol: true as const,
      fr242ContractMutated: false as const,
      fr251HistoricalExportMutated: false as const,
      rawMediaPersisted: false as const,
      rawImageDigestComputed: false as const,
      rawLandmarksPersisted: false as const,
      repeatabilityPassFailIssued: false as const,
      captureQualityConstructValidated: false as const,
      traditionalFangBindingIssued: false as const,
      registryAdmissionIssued: false as const,
      canonicalizationAuthorized: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
    nextFrontier: FR256_NEXT_FRONTIER,
  });
}
