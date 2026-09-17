import {
  assertIssuedMesh6ANeutralObservationFrame,
  type Mesh6AObservationFrameV1,
} from './mesh6a-neutral-observation-frame.js';
import {
  buildMesh6BZygomaticRawMorphology,
  type Mesh6BWeightedRegionAdapterV2,
  type Mesh6BZygomaticRawMorphologyV1,
} from './mesh6b-zygomatic-raw-morphology.js';
import {
  summarizeMesh6CZygomaticRepeatability,
  type Mesh6CRepeatabilitySummaryV1,
} from './mesh6c-morphology-repeatability.js';
import { FaceAuthorityValidationError } from './validation.js';

const MATRIX_ELEMENT_COUNT = 16;

export interface Mesh6DWeightedRegionAdapterV2 extends Mesh6BWeightedRegionAdapterV2 {
  readonly sourceAssetId: string;
  readonly targetAssetId: string;
}

export interface Mesh6DMultiFrameSampleV1 {
  readonly frame: Mesh6AObservationFrameV1;
  readonly timestampMs: number;
}

export interface Mesh6DMultiFrameInputV1 {
  readonly frames: readonly Mesh6DMultiFrameSampleV1[];
  readonly weightedRegionAdapter: Mesh6DWeightedRegionAdapterV2;
}

export interface Mesh6DVector3V1 {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

export interface Mesh6DNumericRangeV1 {
  readonly min: number;
  readonly max: number;
  readonly span: number;
}

export interface Mesh6DPoseEvidenceV1 {
  readonly mappingDirection: 'static_canonical_metric_face_to_runtime_metric_face';
  readonly coordinateDomain: 'right_handed_metric_3d';
  readonly components: readonly ['uniform_scale', 'rotation', 'translation'];
  readonly serializedPackedDataLayout: 'column_major_by_proto_default';
  readonly uniformScaleComponent: number;
  readonly forwardAxisRuntime: Mesh6DVector3V1;
  readonly lateralOrientationRadians: number;
  readonly verticalOrientationRadians: number;
  readonly relativeRotationFromFirstFrameRadians: number;
}

export interface Mesh6DFrameEvidenceV1 {
  readonly timestampMs: number;
  readonly providerRunRef: string;
  readonly poseEvidence: Mesh6DPoseEvidenceV1;
  readonly zygomaticRawMorphology: Mesh6BZygomaticRawMorphologyV1;
}

export interface Mesh6DMultiFramePoseSweepEvidenceV1 {
  readonly schemaVersion: 'mesh6d-multi-frame-pose-sweep-evidence-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'threshold_free_multi_frame_pose_morphology_evidence_only';
  readonly source: {
    readonly observationFrameSchema: 'mesh6a-neutral-observation-frame-v1';
    readonly rawMorphologySchema: 'mesh6b-zygomatic-raw-morphology-v1';
    readonly repeatabilitySchema: 'mesh6c-repeatability-summary-v1';
    readonly coordinateFrame: 'canonical_aligned_right_handed_metric_3d';
    readonly unit: 'centimeter';
    readonly canonicalAssetDigest: string;
    readonly releaseCommit: string;
    readonly geometryMetadataBlobSha: string;
  };
  readonly adapterIdentity: {
    readonly schemaVersion: 'face-geometry-mediapipe468-weighted-region-adapter-v2';
    readonly sourceAssetId: string;
    readonly targetAssetId: string;
    readonly targetVertexCount: 468;
    readonly regionCount: number;
    readonly membershipEdgeCount: number;
  };
  readonly sequence: {
    readonly frameCount: number;
    readonly startTimestampMs: number;
    readonly endTimestampMs: number;
    readonly durationMs: number;
  };
  readonly frames: readonly Mesh6DFrameEvidenceV1[];
  readonly poseSweep: {
    readonly lateralOrientationRadians: Mesh6DNumericRangeV1;
    readonly verticalOrientationRadians: Mesh6DNumericRangeV1;
    readonly relativeRotationFromFirstFrameRadians: Mesh6DNumericRangeV1;
  };
  readonly morphologyRepeatability: Mesh6CRepeatabilitySummaryV1;
  readonly unresolvedCaptureFactors: {
    readonly expressionNeutrality: 'not_verified';
    readonly occlusionValidity: 'not_verified';
    readonly illumination: 'not_assessed';
    readonly motionBlur: 'not_assessed';
    readonly realWorldRepeatabilityThreshold: 'not_defined';
  };
  readonly authorityBoundary: {
    readonly poseThresholdDefined: false;
    readonly frontalClassificationIssued: false;
    readonly threeQuarterClassificationIssued: false;
    readonly profileClassificationIssued: false;
    readonly minimumProductionFrameCountDefined: false;
    readonly acceptablePoseRangeDefined: false;
    readonly captureQualityPassFailIssued: false;
    readonly confidenceScoreIssued: false;
    readonly productionMorphologyAuthorized: false;
    readonly expressionNeutralityVerdictIssued: false;
    readonly occlusionValidityVerdictIssued: false;
    readonly anatomicalMeasurementClaimed: false;
    readonly beautyInterpretationIssued: false;
    readonly traditionalPhysiognomyInterpretationIssued: false;
    readonly claimsIssued: 0;
  };
  readonly persistencePolicy: {
    readonly rawFramesPersisted: false;
    readonly rawProviderResponsesPersisted: false;
    readonly derivedPoseEvidencePersisted: false;
    readonly derivedMorphologyEvidencePersisted: false;
    readonly biometricEmbeddingPersisted: false;
  };
}

type RotationExtraction = {
  readonly rotation: readonly number[];
  readonly uniformScale: number;
};

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`MESH6D ${message}`);
}

function finitePackedMatrix(matrix: readonly number[], context: string): void {
  if (matrix.length !== MATRIX_ELEMENT_COUNT || matrix.some((value) => !Number.isFinite(value))) {
    fail(`${context} requires exactly 16 finite packed matrix elements.`);
  }
}

function determinant3(matrix: readonly number[]): number {
  return (
    matrix[0]! * (matrix[4]! * matrix[8]! - matrix[5]! * matrix[7]!) -
    matrix[1]! * (matrix[3]! * matrix[8]! - matrix[5]! * matrix[6]!) +
    matrix[2]! * (matrix[3]! * matrix[7]! - matrix[4]! * matrix[6]!)
  );
}

function rotationFromPackedColumnMajor(matrix: readonly number[]): RotationExtraction {
  finitePackedMatrix(matrix, 'pose extraction');
  const linearRowMajor = [
    matrix[0]!, matrix[4]!, matrix[8]!,
    matrix[1]!, matrix[5]!, matrix[9]!,
    matrix[2]!, matrix[6]!, matrix[10]!,
  ];
  const determinant = determinant3(linearRowMajor);
  if (!Number.isFinite(determinant) || !(determinant > 0)) {
    fail('pose transform linear component must preserve the positive FR76 uniform-scale rotation determinant.');
  }
  const uniformScale = Math.cbrt(determinant);
  if (!Number.isFinite(uniformScale) || !(uniformScale > 0)) {
    fail('pose transform uniform scale component must be positive and finite.');
  }
  const rotation = linearRowMajor.map((value) => value / uniformScale);
  if (rotation.some((value) => !Number.isFinite(value))) fail('pose rotation extraction produced non-finite values.');
  return Object.freeze({ rotation: Object.freeze(rotation), uniformScale });
}

function transpose3(matrix: readonly number[]): readonly number[] {
  return Object.freeze([
    matrix[0]!, matrix[3]!, matrix[6]!,
    matrix[1]!, matrix[4]!, matrix[7]!,
    matrix[2]!, matrix[5]!, matrix[8]!,
  ]);
}

function multiply3(left: readonly number[], right: readonly number[]): readonly number[] {
  const result = Array<number>(9).fill(0);
  for (let row = 0; row < 3; row += 1) {
    for (let column = 0; column < 3; column += 1) {
      let value = 0;
      for (let index = 0; index < 3; index += 1) {
        value += left[row * 3 + index]! * right[index * 3 + column]!;
      }
      result[row * 3 + column] = value;
    }
  }
  return Object.freeze(result);
}

function sameRotation(left: readonly number[], right: readonly number[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function relativeRotationAngle(current: readonly number[], first: readonly number[]): number {
  if (sameRotation(current, first)) return 0;
  const relative = multiply3(current, transpose3(first));
  const cosine = Math.max(-1, Math.min(1, (relative[0]! + relative[4]! + relative[8]! - 1) * 0.5));
  const angle = Math.acos(cosine);
  if (!Number.isFinite(angle)) fail('relative rotation computation produced a non-finite angle.');
  return angle;
}

function unitForwardAxis(rotation: readonly number[]): Mesh6DVector3V1 {
  const x = rotation[2]!;
  const y = rotation[5]!;
  const z = rotation[8]!;
  const magnitude = Math.hypot(x, y, z);
  if (!Number.isFinite(magnitude) || !(magnitude > 0)) fail('runtime forward axis is degenerate.');
  return Object.freeze({ x: x / magnitude, y: y / magnitude, z: z / magnitude });
}

export function computeMesh6DPoseEvidence(
  poseTransformMatrixPackedColumnMajor: readonly number[],
  firstPoseTransformMatrixPackedColumnMajor: readonly number[],
): Mesh6DPoseEvidenceV1 {
  const current = rotationFromPackedColumnMajor(poseTransformMatrixPackedColumnMajor);
  const first = rotationFromPackedColumnMajor(firstPoseTransformMatrixPackedColumnMajor);
  const forwardAxisRuntime = unitForwardAxis(current.rotation);
  const lateralOrientationRadians = Math.atan2(forwardAxisRuntime.x, forwardAxisRuntime.z);
  const verticalOrientationRadians = Math.atan2(
    forwardAxisRuntime.y,
    Math.hypot(forwardAxisRuntime.x, forwardAxisRuntime.z),
  );
  if (!Number.isFinite(lateralOrientationRadians) || !Number.isFinite(verticalOrientationRadians)) {
    fail('forward-axis orientation computation produced a non-finite angle.');
  }
  return Object.freeze({
    mappingDirection: 'static_canonical_metric_face_to_runtime_metric_face' as const,
    coordinateDomain: 'right_handed_metric_3d' as const,
    components: Object.freeze(['uniform_scale', 'rotation', 'translation'] as const),
    serializedPackedDataLayout: 'column_major_by_proto_default' as const,
    uniformScaleComponent: current.uniformScale,
    forwardAxisRuntime,
    lateralOrientationRadians,
    verticalOrientationRadians,
    relativeRotationFromFirstFrameRadians: relativeRotationAngle(current.rotation, first.rotation),
  });
}

function numericRange(values: readonly number[], context: string): Mesh6DNumericRangeV1 {
  if (values.length === 0 || values.some((value) => !Number.isFinite(value))) {
    fail(`${context} range requires non-empty finite values.`);
  }
  const min = Math.min(...values);
  const max = Math.max(...values);
  return Object.freeze({ min, max, span: max - min });
}

function validateAdapterIdentity(adapter: Mesh6DWeightedRegionAdapterV2): void {
  if (
    adapter.schemaVersion !== 'face-geometry-mediapipe468-weighted-region-adapter-v2' ||
    adapter.targetVertexCount !== 468 ||
    typeof adapter.sourceAssetId !== 'string' || adapter.sourceAssetId.length === 0 ||
    typeof adapter.targetAssetId !== 'string' || adapter.targetAssetId.length === 0
  ) fail('requires an explicit MESH5.1 source/target adapter identity.');
}

function assertCompatibleProvenance(
  frame: Mesh6AObservationFrameV1,
  first: Mesh6AObservationFrameV1,
  index: number,
): void {
  if (
    frame.source.schemaVersion !== first.source.schemaVersion ||
    frame.source.authorityState !== first.source.authorityState ||
    frame.source.canonicalAssetDigest !== first.source.canonicalAssetDigest ||
    frame.source.releaseCommit !== first.source.releaseCommit ||
    frame.source.geometryMetadataBlobSha !== first.source.geometryMetadataBlobSha ||
    frame.coordinateFrame !== first.coordinateFrame ||
    frame.unit !== first.unit
  ) fail(`frame ${index} source provenance is incompatible with frame 0.`);
}

export function buildMesh6DMultiFramePoseSweepEvidence(
  input: Mesh6DMultiFrameInputV1,
): Mesh6DMultiFramePoseSweepEvidenceV1 {
  if (!Array.isArray(input.frames) || input.frames.length === 0) {
    fail('requires a non-empty ordered frame sequence.');
  }
  validateAdapterIdentity(input.weightedRegionAdapter);

  const firstSample = input.frames[0]!;
  assertIssuedMesh6ANeutralObservationFrame(firstSample.frame);
  if (!Number.isFinite(firstSample.timestampMs)) fail('frame 0 timestampMs must be finite.');
  const firstPoseMatrix = firstSample.frame.poseTransformMatrixPackedColumnMajor;

  let previousTimestamp = firstSample.timestampMs;
  const frameEvidence: Mesh6DFrameEvidenceV1[] = [];
  const morphologySamples: Mesh6BZygomaticRawMorphologyV1[] = [];

  for (let index = 0; index < input.frames.length; index += 1) {
    const sample = input.frames[index]!;
    assertIssuedMesh6ANeutralObservationFrame(sample.frame);
    if (!Number.isFinite(sample.timestampMs)) fail(`frame ${index} timestampMs must be finite.`);
    if (index > 0 && !(sample.timestampMs > previousTimestamp)) {
      fail(`frame ${index} timestampMs must be strictly greater than the previous timestamp.`);
    }
    assertCompatibleProvenance(sample.frame, firstSample.frame, index);
    const morphology = buildMesh6BZygomaticRawMorphology(sample.frame, input.weightedRegionAdapter);
    const poseEvidence = computeMesh6DPoseEvidence(
      sample.frame.poseTransformMatrixPackedColumnMajor,
      firstPoseMatrix,
    );
    morphologySamples.push(morphology);
    frameEvidence.push(Object.freeze({
      timestampMs: sample.timestampMs,
      providerRunRef: sample.frame.source.providerRunRef,
      poseEvidence,
      zygomaticRawMorphology: morphology,
    }));
    previousTimestamp = sample.timestampMs;
  }

  const firstTimestamp = input.frames[0]!.timestampMs;
  const lastTimestamp = input.frames[input.frames.length - 1]!.timestampMs;
  const membershipEdgeCount = input.weightedRegionAdapter.regions.reduce(
    (sum, region) => sum + region.weightedVertices.length,
    0,
  );

  const output: Mesh6DMultiFramePoseSweepEvidenceV1 = Object.freeze({
    schemaVersion: 'mesh6d-multi-frame-pose-sweep-evidence-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'threshold_free_multi_frame_pose_morphology_evidence_only' as const,
    source: Object.freeze({
      observationFrameSchema: firstSample.frame.schemaVersion,
      rawMorphologySchema: 'mesh6b-zygomatic-raw-morphology-v1' as const,
      repeatabilitySchema: 'mesh6c-repeatability-summary-v1' as const,
      coordinateFrame: firstSample.frame.coordinateFrame,
      unit: firstSample.frame.unit,
      canonicalAssetDigest: firstSample.frame.source.canonicalAssetDigest,
      releaseCommit: firstSample.frame.source.releaseCommit,
      geometryMetadataBlobSha: firstSample.frame.source.geometryMetadataBlobSha,
    }),
    adapterIdentity: Object.freeze({
      schemaVersion: input.weightedRegionAdapter.schemaVersion,
      sourceAssetId: input.weightedRegionAdapter.sourceAssetId,
      targetAssetId: input.weightedRegionAdapter.targetAssetId,
      targetVertexCount: input.weightedRegionAdapter.targetVertexCount,
      regionCount: input.weightedRegionAdapter.regions.length,
      membershipEdgeCount,
    }),
    sequence: Object.freeze({
      frameCount: frameEvidence.length,
      startTimestampMs: firstTimestamp,
      endTimestampMs: lastTimestamp,
      durationMs: lastTimestamp - firstTimestamp,
    }),
    frames: Object.freeze(frameEvidence),
    poseSweep: Object.freeze({
      lateralOrientationRadians: numericRange(
        frameEvidence.map((item) => item.poseEvidence.lateralOrientationRadians),
        'lateral orientation',
      ),
      verticalOrientationRadians: numericRange(
        frameEvidence.map((item) => item.poseEvidence.verticalOrientationRadians),
        'vertical orientation',
      ),
      relativeRotationFromFirstFrameRadians: numericRange(
        frameEvidence.map((item) => item.poseEvidence.relativeRotationFromFirstFrameRadians),
        'relative rotation',
      ),
    }),
    morphologyRepeatability: summarizeMesh6CZygomaticRepeatability(morphologySamples),
    unresolvedCaptureFactors: Object.freeze({
      expressionNeutrality: 'not_verified' as const,
      occlusionValidity: 'not_verified' as const,
      illumination: 'not_assessed' as const,
      motionBlur: 'not_assessed' as const,
      realWorldRepeatabilityThreshold: 'not_defined' as const,
    }),
    authorityBoundary: Object.freeze({
      poseThresholdDefined: false as const,
      frontalClassificationIssued: false as const,
      threeQuarterClassificationIssued: false as const,
      profileClassificationIssued: false as const,
      minimumProductionFrameCountDefined: false as const,
      acceptablePoseRangeDefined: false as const,
      captureQualityPassFailIssued: false as const,
      confidenceScoreIssued: false as const,
      productionMorphologyAuthorized: false as const,
      expressionNeutralityVerdictIssued: false as const,
      occlusionValidityVerdictIssued: false as const,
      anatomicalMeasurementClaimed: false as const,
      beautyInterpretationIssued: false as const,
      traditionalPhysiognomyInterpretationIssued: false as const,
      claimsIssued: 0 as const,
    }),
    persistencePolicy: Object.freeze({
      rawFramesPersisted: false as const,
      rawProviderResponsesPersisted: false as const,
      derivedPoseEvidencePersisted: false as const,
      derivedMorphologyEvidencePersisted: false as const,
      biometricEmbeddingPersisted: false as const,
    }),
  });
  return output;
}
