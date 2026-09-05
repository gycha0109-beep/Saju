import {
  FR144_NEXT_FRONTIER,
  assertIssuedSquareBroadFangNeutralAcquisitionDatasetFR144,
  assertIssuedSquareBroadFangNeutralCaptureRecordFR144,
  getSquareBroadFangRealCaptureAcquisitionContractFR144,
  materializeSquareBroadFangNeutralAcquisitionDatasetFR144,
  type SquareBroadFangNeutralAcquisitionDatasetFR144V1,
  type SquareBroadFangNeutralCaptureSeriesSummaryFR144V1,
} from './five-officers-square-broad-fang-real-capture-acquisition-fr144.js';
import {
  FR145_NEXT_FRONTIER,
  runSquareBroadFangEphemeralRealCaptureFR145,
  type SquareBroadFangEphemeralRealCaptureRequestFR145V1,
  type SquareBroadFangEphemeralRealCaptureResultFR145V1,
} from './five-officers-square-broad-fang-ephemeral-real-capture-bridge-fr145.js';
import {
  validateMediaPipeScreenToMetricReimplementationParityFR76,
  type MediaPipeScreenToMetricReimplementationParityFR76V1,
} from './mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR146_RECORD_ID =
  'research.face_reading.shenxiang.five_officers.square_broad_fang_repeated_governed_real_capture_dataset.fr146' as const;
export const FR146_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr146-square-broad-fang-repeated-governed-real-capture-dataset.md' as const;
export const FR146_NEXT_FRONTIER =
  'square_broad_fang_capture_quality_and_multi_session_condition_governance_before_repeatability_interpretation' as const;

const SAFE_REF = /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,255}$/u;
const MIN_REPEATED_CAPTURE_COUNT = 2;
const ISSUED = new WeakSet<object>();

export interface SquareBroadFangRepeatedCaptureInputFR146V1 {
  readonly acquisitionRunRef: string;
  readonly providerRunRef: string;
  readonly captureRef: string;
  readonly imageBlob: Blob;
}

export interface SquareBroadFangRepeatedGovernedRealCaptureRequestFR146V1 {
  readonly schemaVersion: 'fr146-square-broad-fang-repeated-governed-real-capture-request-v1';
  readonly researchSubjectRef: string;
  readonly captureSeriesRef: string;
  readonly geometryMetadataPbtxt: string;
  readonly parity: MediaPipeScreenToMetricReimplementationParityFR76V1;
  readonly captures: readonly SquareBroadFangRepeatedCaptureInputFR146V1[];
}

export interface SquareBroadFangRepeatedCaptureLedgerEntryFR146V1 {
  readonly acquisitionRunRef: string;
  readonly providerRunRef: string;
  readonly captureRef: string;
  readonly researchSubjectRef: string;
  readonly captureSeriesRef: string;
  readonly frame: {
    readonly width: number;
    readonly height: number;
  };
  readonly fr144AcquisitionValidation: 'PASS';
  readonly captureQualityValidated: false;
  readonly sourceImageContentEqualityCheckedForOutput: false;
}

export interface SquareBroadFangRepeatedCaptureSeriesSummaryFR146V1 {
  readonly researchSubjectRef: string;
  readonly captureSeriesRef: string;
  readonly captureCount: number;
  readonly metrics: SquareBroadFangNeutralCaptureSeriesSummaryFR144V1['metrics'];
  readonly repeatedCaptureRequirementSatisfied: true;
  readonly descriptiveStatisticsOnly: true;
  readonly captureQualityValidated: false;
  readonly empiricalRepeatabilityEstablished: false;
  readonly repeatabilityClassificationIssued: false;
  readonly repeatabilityAcceptanceThresholdApplied: false;
}

export interface SquareBroadFangRepeatedGovernedRealCaptureDatasetFR146V1 {
  readonly schemaVersion: 'fr146-square-broad-fang-repeated-governed-real-capture-dataset-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR146_RECORD_ID;
  readonly authorityState: 'square_broad_fang_repeated_governed_real_capture_dataset_materialized_descriptive_only_no_semantic_labels';
  readonly targetCriterionRef: 'criterion.intake.square_broad';
  readonly activeConstructScope: 'fang_shape_candidate_features_only';
  readonly predecessor: {
    readonly fr144NextFrontier: typeof FR144_NEXT_FRONTIER;
    readonly fr145NextFrontier: typeof FR145_NEXT_FRONTIER;
    readonly fr145EphemeralBridgeRequired: true;
    readonly fr144DatasetMaterializerReused: true;
  };
  readonly captureLedger: readonly SquareBroadFangRepeatedCaptureLedgerEntryFR146V1[];
  readonly seriesSummary: SquareBroadFangRepeatedCaptureSeriesSummaryFR146V1;
  readonly observedCaptureCount: number;
  readonly observedCaptureSeriesCount: 1;
  readonly observedResearchSubjectCount: 1;
  readonly repeatedCaptureBoundary: {
    readonly minimumCapturesPerSeriesToMaterialize: 2;
    readonly repeatedCaptureRequirementSatisfied: true;
    readonly distinctCaptureRefsRequired: true;
    readonly distinctAcquisitionRunRefsRequired: true;
    readonly distinctProviderRunRefsRequired: true;
    readonly exactSourceByteDuplicateRejectedTransiently: true;
    readonly sourceDigestPersisted: false;
    readonly sourceDigestReturned: false;
    readonly byteDistinctnessMeansIndependentCaptureEvent: false;
    readonly byteDistinctnessMeansNeutralExpressionValidity: false;
    readonly captureQualityValidated: false;
    readonly descriptiveRepeatabilityStatisticsIssued: true;
    readonly empiricalRepeatabilityEstablished: false;
    readonly repeatabilityClassificationIssued: false;
    readonly numericRepeatabilityAcceptanceThreshold: null;
  };
  readonly privacyBoundary: {
    readonly rawImagePersisted: false;
    readonly rawProviderResponsePersisted: false;
    readonly sourceDigestPersisted: false;
    readonly sourceDigestReturned: false;
    readonly embeddingPersisted: false;
    readonly identityTemplatePersisted: false;
    readonly derivedFullFaceMetricGeometryPersisted: false;
    readonly derivedPoseNormalizedLipsGeometryPersisted: false;
  };
  readonly semanticAuthority: {
    readonly humanSemanticLabelsIssued: 0;
    readonly traditionalClassLabelsIssued: 0;
    readonly constructValidity: 'unresolved';
    readonly traditionalBinding: 'unresolved';
    readonly criterionState: null;
    readonly structuredClaim: null;
    readonly boundedNarrative: null;
  };
  readonly traditionalSemanticAuthority: false;
  readonly researchNoteRef: typeof FR146_RESEARCH_NOTE_REF;
  readonly nextFrontier: typeof FR146_NEXT_FRONTIER;
}

export interface SquareBroadFangRepeatedGovernedRealCaptureDependenciesFR146V1 {
  readonly runCapture: (
    request: SquareBroadFangEphemeralRealCaptureRequestFR145V1,
  ) => Promise<SquareBroadFangEphemeralRealCaptureResultFR145V1>;
  readonly assertFR144Record: typeof assertIssuedSquareBroadFangNeutralCaptureRecordFR144;
  readonly materializeFR144Dataset: typeof materializeSquareBroadFangNeutralAcquisitionDatasetFR144;
  readonly assertFR144Dataset: typeof assertIssuedSquareBroadFangNeutralAcquisitionDatasetFR144;
  readonly getFR144Contract: typeof getSquareBroadFangRealCaptureAcquisitionContractFR144;
}

export const DEFAULT_SQUARE_BROAD_FANG_REPEATED_GOVERNED_REAL_CAPTURE_DEPENDENCIES_FR146:
SquareBroadFangRepeatedGovernedRealCaptureDependenciesFR146V1 = Object.freeze({
  runCapture: runSquareBroadFangEphemeralRealCaptureFR145,
  assertFR144Record: assertIssuedSquareBroadFangNeutralCaptureRecordFR144,
  materializeFR144Dataset: materializeSquareBroadFangNeutralAcquisitionDatasetFR144,
  assertFR144Dataset: assertIssuedSquareBroadFangNeutralAcquisitionDatasetFR144,
  getFR144Contract: getSquareBroadFangRealCaptureAcquisitionContractFR144,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-146 ${message}`);
}

function opaqueRef(value: string, label: string): string {
  if (!SAFE_REF.test(value)) fail(`${label} must be a bounded opaque reference without whitespace.`);
  return value;
}

function validateBlob(value: Blob, label: string): void {
  if (
    typeof value !== 'object'
    || value === null
    || typeof value.size !== 'number'
    || !Number.isFinite(value.size)
    || value.size <= 0
    || typeof value.arrayBuffer !== 'function'
  ) fail(`${label} must be a non-empty in-memory Blob-like image source.`);
}

async function transientSha256(blob: Blob): Promise<string> {
  const subtle = globalThis.crypto?.subtle;
  if (subtle === undefined) fail('Web Crypto SubtleCrypto is required for transient duplicate-source detection.');
  const digest = await subtle.digest('SHA-256', await blob.arrayBuffer());
  return Array.from(new Uint8Array(digest), (value) => value.toString(16).padStart(2, '0')).join('');
}

function validateRequest(request: SquareBroadFangRepeatedGovernedRealCaptureRequestFR146V1): void {
  if (typeof request !== 'object' || request === null) fail('request must be an object.');
  if (request.schemaVersion !== 'fr146-square-broad-fang-repeated-governed-real-capture-request-v1') {
    fail('request schemaVersion is unsupported.');
  }
  opaqueRef(request.researchSubjectRef, 'researchSubjectRef');
  opaqueRef(request.captureSeriesRef, 'captureSeriesRef');
  if (typeof request.geometryMetadataPbtxt !== 'string' || request.geometryMetadataPbtxt.length === 0) {
    fail('geometryMetadataPbtxt must be a non-empty release-exact metadata string.');
  }
  validateMediaPipeScreenToMetricReimplementationParityFR76(request.parity);
  if (!Array.isArray(request.captures) || request.captures.length < MIN_REPEATED_CAPTURE_COUNT) {
    fail('repeated governed acquisition requires at least two capture inputs in one capture series.');
  }

  const acquisitionRunRefs = new Set<string>();
  const providerRunRefs = new Set<string>();
  const captureRefs = new Set<string>();
  request.captures.forEach((capture, index) => {
    if (typeof capture !== 'object' || capture === null) fail(`capture ${index} must be an object.`);
    const acquisitionRunRef = opaqueRef(capture.acquisitionRunRef, `capture ${index} acquisitionRunRef`);
    const providerRunRef = opaqueRef(capture.providerRunRef, `capture ${index} providerRunRef`);
    const captureRef = opaqueRef(capture.captureRef, `capture ${index} captureRef`);
    if (acquisitionRunRefs.has(acquisitionRunRef)) fail(`duplicate acquisitionRunRef ${acquisitionRunRef}.`);
    if (providerRunRefs.has(providerRunRef)) fail(`duplicate providerRunRef ${providerRunRef}.`);
    if (captureRefs.has(captureRef)) fail(`duplicate captureRef ${captureRef}.`);
    acquisitionRunRefs.add(acquisitionRunRef);
    providerRunRefs.add(providerRunRef);
    captureRefs.add(captureRef);
    validateBlob(capture.imageBlob, `capture ${index} imageBlob`);
  });
}

function requireExactFR145Result(
  result: SquareBroadFangEphemeralRealCaptureResultFR145V1,
  request: SquareBroadFangRepeatedGovernedRealCaptureRequestFR146V1,
  capture: SquareBroadFangRepeatedCaptureInputFR146V1,
  dependencies: SquareBroadFangRepeatedGovernedRealCaptureDependenciesFR146V1,
): void {
  if (
    result.schemaVersion !== 'fr145-square-broad-fang-ephemeral-real-capture-result-v1'
    || result.artifactVersion !== '0.1.0'
    || result.authorityState !== 'ephemeral_real_capture_neutral_metrics_materialized_no_semantic_promotion'
    || result.acquisitionRunRef !== capture.acquisitionRunRef
    || result.captureRef !== capture.captureRef
    || result.providerRunRef !== capture.providerRunRef
    || result.faceDetected !== true
    || result.providerLandmarkCount !== 478
    || result.governedMetricLandmarkCount !== 468
    || !Number.isInteger(result.frame.width)
    || result.frame.width <= 0
    || !Number.isInteger(result.frame.height)
    || result.frame.height <= 0
    || result.intake.mode !== 'single_ephemeral_browser_image'
    || result.intake.sourceBytesPersisted !== false
    || result.intake.browserDecodedImagePersisted !== false
    || result.quality.captureQualityValidated !== false
    || result.quality.qualityAuthority !== 'not_assessed_by_fr145'
    || result.poseNormalization.coordinateFrame !== 'pose_normalized_face_2d'
    || result.poseNormalization.poseCompensated !== true
    || result.poseNormalization.depthOutputIssued !== false
    || result.lipContours.contourCount !== 2
    || result.lipContours.contourPointCounts[0] !== 20
    || result.lipContours.contourPointCounts[1] !== 20
    || result.lipContours.contourConsumptionState !== 'unordered_set_no_outer_inner_role'
    || result.lipContours.anatomicalRoleAssigned !== false
    || result.lipContours.traditionalRoleAssigned !== false
    || result.fr144.acquisitionValidation !== 'PASS'
    || result.fr144.captureRecord.identity.researchSubjectRef !== request.researchSubjectRef
    || result.fr144.captureRecord.identity.captureSeriesRef !== request.captureSeriesRef
    || result.fr144.captureRecord.identity.captureRef !== capture.captureRef
    || result.persistencePolicy.rawImagePersisted !== false
    || result.persistencePolicy.rawProviderResponsePersisted !== false
    || result.persistencePolicy.embeddingPersisted !== false
    || result.persistencePolicy.identityTemplatePersisted !== false
    || result.persistencePolicy.derivedFullFaceMetricGeometryPersisted !== false
    || result.persistencePolicy.derivedPoseNormalizedLipsGeometryPersisted !== false
    || result.semanticAuthority.constructValidity !== 'unresolved'
    || result.semanticAuthority.traditionalBinding !== 'unresolved'
    || result.semanticAuthority.criterionState !== null
    || result.semanticAuthority.structuredClaim !== null
    || result.semanticAuthority.boundedNarrative !== null
    || result.traditionalSemanticAuthority !== false
    || result.nextFrontier !== FR145_NEXT_FRONTIER
  ) fail(`capture ${capture.captureRef} drifted from the exact FR-145 bounded result contract.`);

  dependencies.assertFR144Record(result.fr144.captureRecord);
  if (
    result.fr144.captureRecord.semanticBoundary.humanSemanticLabel !== null
    || result.fr144.captureRecord.semanticBoundary.traditionalClassLabel !== null
    || result.fr144.captureRecord.privacyBoundary.rawImageStored !== false
    || result.fr144.captureRecord.privacyBoundary.sourceImageContentStored !== false
    || result.fr144.captureRecord.privacyBoundary.rawProviderResponseStored !== false
    || result.fr144.captureRecord.privacyBoundary.faceEmbeddingStored !== false
    || result.fr144.captureRecord.privacyBoundary.identityTemplateStored !== false
    || result.fr144.captureRecord.traditionalSemanticAuthority !== false
  ) fail(`capture ${capture.captureRef} widened FR-144 privacy or semantic authority.`);

  if (result.fr142.metricValues.length !== 3 || result.fr144.captureRecord.neutralMetricValues.length !== 3) {
    fail(`capture ${capture.captureRef} must preserve exactly three FR-142 / FR-144 neutral candidate metrics.`);
  }
  for (const metric of result.fr142.metricValues) {
    const recorded = result.fr144.captureRecord.neutralMetricValues.find((candidate) => candidate.metricRef === metric.metricRef);
    if (
      recorded === undefined
      || recorded.value !== metric.value
      || recorded.unit !== metric.unit
      || metric.unit !== 'ratio'
      || metric.contributingClosedCycleCount !== 2
      || metric.contributingElementCount !== 40
      || metric.classificationApplied !== false
      || metric.calibrationApplied !== false
      || metric.traditionalBindingApplied !== false
    ) fail(`capture ${capture.captureRef} FR-142 metric-to-FR-144 record linkage drift.`);
  }
}

function validateFR144Dataset(
  dataset: SquareBroadFangNeutralAcquisitionDatasetFR144V1,
  expectedCaptureCount: number,
  researchSubjectRef: string,
  captureSeriesRef: string,
): SquareBroadFangNeutralCaptureSeriesSummaryFR144V1 {
  if (
    dataset.schemaVersion !== 'fr144-square-broad-fang-neutral-acquisition-dataset-v1'
    || dataset.artifactVersion !== '0.1.0'
    || dataset.authorityState !== 'square_broad_fang_fr142_neutral_acquisition_dataset_materialized_descriptive_only'
    || dataset.datasetState !== 'neutral_candidate_feature_observations_only_no_semantic_labels'
    || dataset.observedCaptureCount !== expectedCaptureCount
    || dataset.observedCaptureSeriesCount !== 1
    || dataset.observedResearchSubjectCount !== 1
    || dataset.semanticLabelsIssued !== 0
    || dataset.seriesSummaries.length !== 1
    || dataset.authorityBoundary.datasetMaterializationMeansEmpiricalRepeatabilityEstablished !== false
    || dataset.authorityBoundary.descriptiveSeriesSummaryMeansConstructValidity !== false
    || dataset.authorityBoundary.datasetMaterializationMeansTraditionalBinding !== false
    || dataset.authorityBoundary.datasetMaterializationMeansCalibration !== false
    || dataset.authorityBoundary.datasetMaterializationMeansThreshold !== false
    || dataset.authorityBoundary.datasetMaterializationMeansCriterionState !== false
    || dataset.authorityBoundary.datasetMaterializationMeansClaim !== false
    || dataset.authorityBoundary.datasetMaterializationMeansNarrative !== false
    || dataset.traditionalSemanticAuthority !== false
    || dataset.nextFrontier !== FR144_NEXT_FRONTIER
  ) fail('FR-144 materialized dataset authority boundary drift.');
  const summary = dataset.seriesSummaries[0]!;
  if (
    summary.researchSubjectRef !== researchSubjectRef
    || summary.captureSeriesRef !== captureSeriesRef
    || summary.captureCount !== expectedCaptureCount
    || summary.captureCount < MIN_REPEATED_CAPTURE_COUNT
    || summary.metrics.length !== 3
    || summary.metrics.some((metric) => (
      metric.count !== expectedCaptureCount
      || !Number.isFinite(metric.min)
      || !Number.isFinite(metric.max)
      || !Number.isFinite(metric.mean)
      || !Number.isFinite(metric.range)
      || metric.classificationApplied !== false
      || metric.calibrationApplied !== false
      || metric.acceptanceThresholdApplied !== false
    ))
    || summary.repeatabilityClassificationIssued !== false
    || summary.repeatabilityAcceptanceThresholdApplied !== false
  ) fail('FR-144 repeated series descriptive summary boundary drift.');
  return summary;
}

export function getSquareBroadFangRepeatedGovernedRealCaptureContractFR146() {
  const predecessor = getSquareBroadFangRealCaptureAcquisitionContractFR144();
  if (
    predecessor.nextFrontier !== FR144_NEXT_FRONTIER
    || predecessor.acquisition.captureUnit !== 'same_subject_repeated_pose_normalized_neutral_expression_capture'
    || predecessor.acquisition.repeatedCaptureRequired !== true
    || predecessor.acquisition.numericRepeatabilityAcceptanceThresholds !== null
    || predecessor.privacyBoundary.rawImageStoredByThisArtifact !== false
    || predecessor.privacyBoundary.rawProviderResponseStoredByThisArtifact !== false
    || predecessor.authorityBoundary.neutralAcquisitionMeansEmpiricalRepeatabilityEstablished !== false
    || predecessor.execution.traditionalSemanticAuthority !== false
  ) fail('FR-144 predecessor acquisition boundary drift.');
  return Object.freeze({
    schemaVersion: 'fr146-square-broad-fang-repeated-governed-real-capture-contract-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR146_RECORD_ID,
    acquisition: Object.freeze({
      captureUnit: 'same_subject_same_series_distinct_ephemeral_source_capture' as const,
      minimumCapturesPerSeriesToMaterialize: MIN_REPEATED_CAPTURE_COUNT as 2,
      exactSourceByteDuplicateRejectedTransiently: true as const,
      sourceDigestPersisted: false as const,
      sourceDigestReturned: false as const,
      captureQualityValidatedByThisArtifact: false as const,
      numericRepeatabilityAcceptanceThresholds: null,
      humanSemanticLabelsRequired: false as const,
    }),
    authorityBoundary: Object.freeze({
      repeatedCaptureDatasetMeansEmpiricalRepeatabilityEstablished: false as const,
      byteDistinctnessMeansIndependentCaptureEvent: false as const,
      byteDistinctnessMeansNeutralExpressionValidity: false as const,
      descriptiveStatisticsMeanConstructValidity: false as const,
      descriptiveStatisticsMeanTraditionalBinding: false as const,
      descriptiveStatisticsMeanCalibration: false as const,
      descriptiveStatisticsMeanThreshold: false as const,
    }),
    privacyBoundary: Object.freeze({
      rawImageStoredByThisArtifact: false as const,
      rawProviderResponseStoredByThisArtifact: false as const,
      sourceDigestStoredByThisArtifact: false as const,
      faceEmbeddingStoredByThisArtifact: false as const,
      identityTemplateStoredByThisArtifact: false as const,
    }),
    semanticAuthority: Object.freeze({
      constructValidity: 'unresolved' as const,
      traditionalBinding: 'unresolved' as const,
      criterionState: null,
      structuredClaim: null,
      boundedNarrative: null,
      traditionalSemanticAuthority: false as const,
    }),
    researchNoteRef: FR146_RESEARCH_NOTE_REF,
    nextFrontier: FR146_NEXT_FRONTIER,
  });
}

export async function runSquareBroadFangRepeatedGovernedRealCaptureFR146(
  request: SquareBroadFangRepeatedGovernedRealCaptureRequestFR146V1,
  dependencies: SquareBroadFangRepeatedGovernedRealCaptureDependenciesFR146V1 =
    DEFAULT_SQUARE_BROAD_FANG_REPEATED_GOVERNED_REAL_CAPTURE_DEPENDENCIES_FR146,
): Promise<SquareBroadFangRepeatedGovernedRealCaptureDatasetFR146V1> {
  validateRequest(request);
  const predecessor = dependencies.getFR144Contract();
  if (
    predecessor.nextFrontier !== FR144_NEXT_FRONTIER
    || predecessor.acquisition.repeatedCaptureRequired !== true
    || predecessor.acquisition.numericRepeatabilityAcceptanceThresholds !== null
    || predecessor.authorityBoundary.neutralAcquisitionMeansEmpiricalRepeatabilityEstablished !== false
    || predecessor.execution.traditionalSemanticAuthority !== false
  ) fail('FR-144 predecessor contract drift at execution time.');

  const transientDigests = new Set<string>();
  for (const capture of request.captures) {
    const digest = await transientSha256(capture.imageBlob);
    if (transientDigests.has(digest)) {
      fail('repeated governed acquisition rejects exact duplicate source image bytes even when opaque refs differ.');
    }
    transientDigests.add(digest);
  }

  const results: SquareBroadFangEphemeralRealCaptureResultFR145V1[] = [];
  for (const capture of request.captures) {
    const result = await dependencies.runCapture({
      schemaVersion: 'fr145-square-broad-fang-ephemeral-real-capture-request-v1',
      acquisitionRunRef: capture.acquisitionRunRef,
      providerRunRef: capture.providerRunRef,
      identity: Object.freeze({
        researchSubjectRef: request.researchSubjectRef,
        captureSeriesRef: request.captureSeriesRef,
        captureRef: capture.captureRef,
      }),
      imageBlob: capture.imageBlob,
      geometryMetadataPbtxt: request.geometryMetadataPbtxt,
      parity: request.parity,
    });
    requireExactFR145Result(result, request, capture, dependencies);
    results.push(result);
  }

  const fr144Dataset = dependencies.materializeFR144Dataset(results.map((result) => result.fr144.captureRecord));
  dependencies.assertFR144Dataset(fr144Dataset);
  const fr144Summary = validateFR144Dataset(
    fr144Dataset,
    results.length,
    request.researchSubjectRef,
    request.captureSeriesRef,
  );

  const captureLedger = Object.freeze(results.map((result) => Object.freeze({
    acquisitionRunRef: result.acquisitionRunRef,
    providerRunRef: result.providerRunRef,
    captureRef: result.captureRef,
    researchSubjectRef: result.fr144.captureRecord.identity.researchSubjectRef,
    captureSeriesRef: result.fr144.captureRecord.identity.captureSeriesRef,
    frame: Object.freeze({ width: result.frame.width, height: result.frame.height }),
    fr144AcquisitionValidation: 'PASS' as const,
    captureQualityValidated: false as const,
    sourceImageContentEqualityCheckedForOutput: false as const,
  })));

  const seriesSummary: SquareBroadFangRepeatedCaptureSeriesSummaryFR146V1 = Object.freeze({
    researchSubjectRef: fr144Summary.researchSubjectRef,
    captureSeriesRef: fr144Summary.captureSeriesRef,
    captureCount: fr144Summary.captureCount,
    metrics: fr144Summary.metrics,
    repeatedCaptureRequirementSatisfied: true as const,
    descriptiveStatisticsOnly: true as const,
    captureQualityValidated: false as const,
    empiricalRepeatabilityEstablished: false as const,
    repeatabilityClassificationIssued: false as const,
    repeatabilityAcceptanceThresholdApplied: false as const,
  });

  const output: SquareBroadFangRepeatedGovernedRealCaptureDatasetFR146V1 = Object.freeze({
    schemaVersion: 'fr146-square-broad-fang-repeated-governed-real-capture-dataset-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR146_RECORD_ID,
    authorityState: 'square_broad_fang_repeated_governed_real_capture_dataset_materialized_descriptive_only_no_semantic_labels' as const,
    targetCriterionRef: 'criterion.intake.square_broad' as const,
    activeConstructScope: 'fang_shape_candidate_features_only' as const,
    predecessor: Object.freeze({
      fr144NextFrontier: FR144_NEXT_FRONTIER,
      fr145NextFrontier: FR145_NEXT_FRONTIER,
      fr145EphemeralBridgeRequired: true as const,
      fr144DatasetMaterializerReused: true as const,
    }),
    captureLedger,
    seriesSummary,
    observedCaptureCount: results.length,
    observedCaptureSeriesCount: 1 as const,
    observedResearchSubjectCount: 1 as const,
    repeatedCaptureBoundary: Object.freeze({
      minimumCapturesPerSeriesToMaterialize: 2 as const,
      repeatedCaptureRequirementSatisfied: true as const,
      distinctCaptureRefsRequired: true as const,
      distinctAcquisitionRunRefsRequired: true as const,
      distinctProviderRunRefsRequired: true as const,
      exactSourceByteDuplicateRejectedTransiently: true as const,
      sourceDigestPersisted: false as const,
      sourceDigestReturned: false as const,
      byteDistinctnessMeansIndependentCaptureEvent: false as const,
      byteDistinctnessMeansNeutralExpressionValidity: false as const,
      captureQualityValidated: false as const,
      descriptiveRepeatabilityStatisticsIssued: true as const,
      empiricalRepeatabilityEstablished: false as const,
      repeatabilityClassificationIssued: false as const,
      numericRepeatabilityAcceptanceThreshold: null,
    }),
    privacyBoundary: Object.freeze({
      rawImagePersisted: false as const,
      rawProviderResponsePersisted: false as const,
      sourceDigestPersisted: false as const,
      sourceDigestReturned: false as const,
      embeddingPersisted: false as const,
      identityTemplatePersisted: false as const,
      derivedFullFaceMetricGeometryPersisted: false as const,
      derivedPoseNormalizedLipsGeometryPersisted: false as const,
    }),
    semanticAuthority: Object.freeze({
      humanSemanticLabelsIssued: 0 as const,
      traditionalClassLabelsIssued: 0 as const,
      constructValidity: 'unresolved' as const,
      traditionalBinding: 'unresolved' as const,
      criterionState: null,
      structuredClaim: null,
      boundedNarrative: null,
    }),
    traditionalSemanticAuthority: false as const,
    researchNoteRef: FR146_RESEARCH_NOTE_REF,
    nextFrontier: FR146_NEXT_FRONTIER,
  });
  ISSUED.add(output);
  return output;
}

export function assertIssuedSquareBroadFangRepeatedGovernedRealCaptureDatasetFR146(
  value: SquareBroadFangRepeatedGovernedRealCaptureDatasetFR146V1,
): void {
  if (!ISSUED.has(value)) fail('dataset was not issued by the active FR-146 repeated governed acquisition boundary.');
}
