import {
  getSquareBroadConstructValidityAcquisitionContractFR135,
  type SquareBroadConstructValidityCaptureIdentityFR135V1,
} from './five-officers-square-broad-construct-validity-dataset-acquisition-fr135.js';
import {
  FR142_NEXT_FRONTIER,
  assertIssuedSquareBroadFangNeutralCandidateMetricRuntimeFR142,
  getSquareBroadFangNeutralCandidateMetricDefinitionsFR142,
  type SquareBroadFangNeutralCandidateMetricRuntimeFR142V1,
  type SquareBroadFangNeutralCandidateMetricValueFR142V1,
} from './five-officers-square-broad-fang-neutral-candidate-metric-runtime-fr142.js';
import {
  FR143_NEXT_FRONTIER,
  assessSquareBroadFangNeutralCandidateMetricSyntheticVerificationFR143,
  assertIssuedSquareBroadFangNeutralCandidateMetricSyntheticVerificationFR143,
} from './five-officers-square-broad-fang-neutral-candidate-metric-synthetic-verification-fr143.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR144_CAPTURE_RECORD_ID =
  'research.face_reading.shenxiang.five_officers.square_broad_fang_real_capture_neutral_acquisition.fr144' as const;
export const FR144_CORRESPONDENCE_METRIC_REF =
  'neutral.mouth.contour_set.horizontal_reflection_nearest_set_residual_ratio@0.1.0' as const;
export const FR144_ORTHOGONALITY_METRIC_REF =
  'neutral.mouth.contour_set.orthogonal_edge_orientation_concentration@0.1.0' as const;
export const FR144_TURN_CONCENTRATION_METRIC_REF =
  'neutral.mouth.contour_set.turning_angle_concentration_index@0.1.0' as const;
export const FR144_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr144-square-broad-fang-real-capture-neutral-acquisition-extension.md' as const;
export const FR144_NEXT_FRONTIER =
  'square_broad_fang_governed_real_capture_dataset_materialization_for_descriptive_repeatability_observation_without_semantic_labels' as const;

type FR144MetricRef =
  | typeof FR144_CORRESPONDENCE_METRIC_REF
  | typeof FR144_ORTHOGONALITY_METRIC_REF
  | typeof FR144_TURN_CONCENTRATION_METRIC_REF;

export interface SquareBroadFangNeutralCaptureMetricFR144V1 {
  readonly metricRef: FR144MetricRef;
  readonly value: number;
  readonly unit: 'ratio';
  readonly contributingClosedCycleCount: 2;
  readonly contributingElementCount: 40;
  readonly classificationApplied: false;
  readonly calibrationApplied: false;
  readonly traditionalBindingApplied: false;
}

export interface SquareBroadFangNeutralCaptureRecordFR144V1 {
  readonly schemaVersion: 'fr144-square-broad-fang-neutral-capture-record-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR144_CAPTURE_RECORD_ID;
  readonly authorityState: 'square_broad_fang_fr142_neutral_metric_capture_record_materialized_no_semantic_label';
  readonly targetCriterionRef: 'criterion.intake.square_broad';
  readonly activeConstructScope: 'fang_shape_candidate_features_only';
  readonly identity: SquareBroadConstructValidityCaptureIdentityFR135V1;
  readonly source: {
    readonly fr142SchemaVersion: 'fr142-square-broad-fang-neutral-candidate-metric-runtime-v1';
    readonly fr142ArtifactVersion: '0.1.0';
    readonly fr142AuthorityState: 'square_broad_fang_source_grounded_role_invariant_neutral_candidate_metrics_implemented_no_traditional_binding';
    readonly fr142NextFrontier: typeof FR142_NEXT_FRONTIER;
    readonly fr143SyntheticBehaviorVerified: true;
    readonly fr143SyntheticRepeatabilityMeansEmpiricalCaptureRepeatability: false;
    readonly candidateFeatureCoverage: 'fr142_three_role_invariant_fang_shape_candidate_metrics_only';
  };
  readonly neutralMetricValues: readonly [
    SquareBroadFangNeutralCaptureMetricFR144V1,
    SquareBroadFangNeutralCaptureMetricFR144V1,
    SquareBroadFangNeutralCaptureMetricFR144V1,
  ];
  readonly semanticBoundary: {
    readonly humanSemanticLabel: null;
    readonly traditionalClassLabel: null;
    readonly semanticAnnotationRequiredToRecordNeutralMetrics: false;
    readonly neutralCaptureRecordMeansConstructValidity: false;
    readonly neutralCaptureRecordMeansTraditionalFang: false;
  };
  readonly privacyBoundary: {
    readonly rawImageStored: false;
    readonly sourceImageContentStored: false;
    readonly rawProviderResponseStored: false;
    readonly faceEmbeddingStored: false;
    readonly identityTemplateStored: false;
    readonly researchSubjectRefClaimedAnonymous: false;
  };
  readonly authorityBoundary: {
    readonly descriptiveNeutralRecordMeansCalibration: false;
    readonly descriptiveNeutralRecordMeansThreshold: false;
    readonly componentOrderSemanticUseAllowed: false;
    readonly outerInnerAnatomicalAssignmentAllowed: false;
    readonly namedMouthCornerAssignmentAllowed: false;
  };
  readonly traditionalSemanticAuthority: false;
}

export interface SquareBroadFangNeutralMetricSummaryFR144V1 {
  readonly metricRef: FR144MetricRef;
  readonly unit: 'ratio';
  readonly count: number;
  readonly min: number;
  readonly max: number;
  readonly mean: number;
  readonly range: number;
  readonly classificationApplied: false;
  readonly calibrationApplied: false;
  readonly acceptanceThresholdApplied: false;
}

export interface SquareBroadFangNeutralCaptureSeriesSummaryFR144V1 {
  readonly researchSubjectRef: string;
  readonly captureSeriesRef: string;
  readonly captureCount: number;
  readonly metrics: readonly [
    SquareBroadFangNeutralMetricSummaryFR144V1,
    SquareBroadFangNeutralMetricSummaryFR144V1,
    SquareBroadFangNeutralMetricSummaryFR144V1,
  ];
  readonly repeatabilityClassificationIssued: false;
  readonly repeatabilityAcceptanceThresholdApplied: false;
}

export interface SquareBroadFangNeutralAcquisitionDatasetFR144V1 {
  readonly schemaVersion: 'fr144-square-broad-fang-neutral-acquisition-dataset-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR144_CAPTURE_RECORD_ID;
  readonly authorityState: 'square_broad_fang_fr142_neutral_acquisition_dataset_materialized_descriptive_only';
  readonly datasetState: 'neutral_candidate_feature_observations_only_no_semantic_labels';
  readonly targetCriterionRef: 'criterion.intake.square_broad';
  readonly activeConstructScope: 'fang_shape_candidate_features_only';
  readonly captureRecords: readonly SquareBroadFangNeutralCaptureRecordFR144V1[];
  readonly seriesSummaries: readonly SquareBroadFangNeutralCaptureSeriesSummaryFR144V1[];
  readonly observedCaptureCount: number;
  readonly observedCaptureSeriesCount: number;
  readonly observedResearchSubjectCount: number;
  readonly semanticLabelsIssued: 0;
  readonly authorityBoundary: {
    readonly datasetMaterializationMeansEmpiricalRepeatabilityEstablished: false;
    readonly descriptiveSeriesSummaryMeansConstructValidity: false;
    readonly datasetMaterializationMeansTraditionalBinding: false;
    readonly datasetMaterializationMeansCalibration: false;
    readonly datasetMaterializationMeansThreshold: false;
    readonly datasetMaterializationMeansCriterionState: false;
    readonly datasetMaterializationMeansClaim: false;
    readonly datasetMaterializationMeansNarrative: false;
  };
  readonly traditionalSemanticAuthority: false;
  readonly nextFrontier: typeof FR144_NEXT_FRONTIER;
}

const CAPTURE_ISSUED = new WeakSet<object>();
const DATASET_ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-144 ${message}`);
}

function requireOpaqueRef(label: string, value: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    fail(`${label} must be a non-empty study-local opaque reference.`);
  }
  return value;
}

function validateHistoricalAcquisitionBoundary(): void {
  const fr135 = getSquareBroadConstructValidityAcquisitionContractFR135();
  if (
    fr135.acquisition.captureUnit !== 'same_subject_repeated_pose_normalized_neutral_expression_capture'
    || fr135.acquisition.repeatedCaptureRequired !== true
    || fr135.acquisition.subjectCount !== null
    || fr135.acquisition.captureCountPerSubject !== null
    || fr135.acquisition.splitRatios !== null
    || fr135.acquisition.numericAcceptanceThresholds !== null
    || fr135.privacyBoundary.rawImageStoredByThisArtifact !== false
    || fr135.privacyBoundary.sourceImageContentStoredByThisArtifact !== false
    || fr135.privacyBoundary.faceEmbeddingStoredByThisArtifact !== false
    || fr135.privacyBoundary.identityTemplateStoredByThisArtifact !== false
    || fr135.authorityBoundary.neutralAcquisitionMeansConstructValidity !== false
    || fr135.authorityBoundary.descriptiveStatisticsMeanCalibration !== false
    || fr135.authorityBoundary.descriptiveStatisticsMeanThreshold !== false
    || fr135.execution.traditionalMetricBindingsIssued !== 0
    || fr135.execution.thresholdsIssued !== 0
    || fr135.execution.traditionalSemanticAuthority !== false
  ) fail('FR-135 neutral acquisition invariant or authority boundary drift.');
}

function validateSyntheticPredecessor(): void {
  const fr143 = assessSquareBroadFangNeutralCandidateMetricSyntheticVerificationFR143();
  assertIssuedSquareBroadFangNeutralCandidateMetricSyntheticVerificationFR143(fr143);
  if (
    fr143.nextFrontier !== FR143_NEXT_FRONTIER
    || fr143.syntheticRelations.deterministicRepeatabilityObserved !== true
    || fr143.evidenceBoundary.syntheticRepeatabilityMeansEmpiricalCaptureRepeatability !== false
    || fr143.evidenceBoundary.syntheticDiscriminationMeansConstructValidity !== false
    || fr143.evidenceBoundary.metricSeparationMeansTraditionalCriterionBinding !== false
    || fr143.execution.empiricalCaptureRecordsIssued !== 0
    || fr143.execution.humanSemanticLabelsIssued !== 0
    || fr143.execution.traditionalMetricBindingsIssued !== 0
    || fr143.execution.numericClassificationThresholdsIssued !== 0
    || fr143.execution.traditionalSemanticAuthority !== false
  ) fail('FR-143 synthetic verification predecessor or authority boundary drift.');
}

function validateFR142Definitions(): void {
  const definitions = getSquareBroadFangNeutralCandidateMetricDefinitionsFR142();
  const expected = [
    FR144_CORRESPONDENCE_METRIC_REF,
    FR144_ORTHOGONALITY_METRIC_REF,
    FR144_TURN_CONCENTRATION_METRIC_REF,
  ] as const;
  if (definitions.length !== 3) fail('FR-142 metric definition count drift.');
  definitions.forEach((definition, index) => {
    if (
      definition.metricRef !== expected[index]
      || definition.unit !== 'ratio'
      || definition.providerComponentOrderInvariant !== true
      || definition.outerInnerAnatomicalRoleRequired !== false
      || definition.providerVertexIdentityRequired !== false
      || definition.namedMouthCornerRequired !== false
      || definition.numericClassificationThreshold !== null
      || definition.traditionalCriterionBindingRef !== null
      || definition.calibrationRef !== null
    ) fail(`FR-142 neutral metric definition ${index} authority boundary drift.`);
  });
}

function requireMetric(
  runtime: SquareBroadFangNeutralCandidateMetricRuntimeFR142V1,
  metricRef: FR144MetricRef,
): SquareBroadFangNeutralCandidateMetricValueFR142V1 {
  const matches = runtime.metricValues.filter((metric) => metric.metricRef === metricRef);
  if (matches.length !== 1) fail(`requires exactly one ${metricRef} value from issued FR-142 runtime.`);
  const metric = matches[0]!;
  if (
    !Number.isFinite(metric.value)
    || metric.unit !== 'ratio'
    || metric.contributingClosedCycleCount !== 2
    || metric.contributingElementCount !== 40
    || metric.classificationApplied !== false
    || metric.calibrationApplied !== false
    || metric.traditionalBindingApplied !== false
  ) fail(`FR-142 metric ${metricRef} numeric or authority boundary drift.`);
  return metric;
}

function validateRuntime(runtime: SquareBroadFangNeutralCandidateMetricRuntimeFR142V1): void {
  assertIssuedSquareBroadFangNeutralCandidateMetricRuntimeFR142(runtime);
  validateFR142Definitions();
  if (
    runtime.schemaVersion !== 'fr142-square-broad-fang-neutral-candidate-metric-runtime-v1'
    || runtime.artifactVersion !== '0.1.0'
    || runtime.authorityState !== 'square_broad_fang_source_grounded_role_invariant_neutral_candidate_metrics_implemented_no_traditional_binding'
    || runtime.nextFrontier !== FR142_NEXT_FRONTIER
    || runtime.source.coordinateFrame !== 'pose_normalized_face_2d'
    || runtime.source.contourConsumptionState !== 'unordered_set_no_outer_inner_role'
    || runtime.source.anatomicalRoleAssigned !== false
    || runtime.source.namedMouthCornerAssigned !== false
    || runtime.execution.traditionalMetricBindingsIssued !== 0
    || runtime.execution.calibrationProtocolsIssued !== 0
    || runtime.execution.thresholdsIssued !== 0
    || runtime.execution.criterionStatesIssued !== 0
    || runtime.execution.traditionalSemanticAuthority !== false
    || runtime.authorityBoundary.continuousCandidateMetricMeansConstructValidity !== false
    || runtime.authorityBoundary.metricValueMeansThreshold !== false
    || runtime.authorityBoundary.metricValueMeansCriterionState !== false
  ) fail('requires exact issued FR-142 neutral candidate metric runtime boundary.');
  requireMetric(runtime, FR144_CORRESPONDENCE_METRIC_REF);
  requireMetric(runtime, FR144_ORTHOGONALITY_METRIC_REF);
  requireMetric(runtime, FR144_TURN_CONCENTRATION_METRIC_REF);
}

function copyMetric(
  runtime: SquareBroadFangNeutralCandidateMetricRuntimeFR142V1,
  metricRef: FR144MetricRef,
): SquareBroadFangNeutralCaptureMetricFR144V1 {
  const metric = requireMetric(runtime, metricRef);
  return Object.freeze({
    metricRef,
    value: metric.value,
    unit: 'ratio' as const,
    contributingClosedCycleCount: 2 as const,
    contributingElementCount: 40 as const,
    classificationApplied: false as const,
    calibrationApplied: false as const,
    traditionalBindingApplied: false as const,
  });
}

export function getSquareBroadFangRealCaptureAcquisitionContractFR144() {
  validateHistoricalAcquisitionBoundary();
  validateSyntheticPredecessor();
  validateFR142Definitions();
  return Object.freeze({
    schemaVersion: 'fr144-square-broad-fang-real-capture-neutral-acquisition-contract-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR144_CAPTURE_RECORD_ID,
    predecessor: Object.freeze({
      reusesFR135IdentityAndSeriesGroupingInvariantsWithoutMutatingFR135: true as const,
      fr142NextFrontier: FR142_NEXT_FRONTIER,
      fr143NextFrontier: FR143_NEXT_FRONTIER,
      syntheticRepeatabilityEstablishedForAlgorithmOnly: true as const,
      syntheticRepeatabilityMeansEmpiricalCaptureRepeatability: false as const,
    }),
    acquisition: Object.freeze({
      captureUnit: 'same_subject_repeated_pose_normalized_neutral_expression_capture' as const,
      runtimeInputAuthority: 'issued_fr142_only' as const,
      requiredNeutralMetricRefs: Object.freeze([
        FR144_CORRESPONDENCE_METRIC_REF,
        FR144_ORTHOGONALITY_METRIC_REF,
        FR144_TURN_CONCENTRATION_METRIC_REF,
      ] as const),
      candidateFeatureCoverage: 'fr142_three_role_invariant_fang_shape_candidate_metrics_only' as const,
      repeatedCaptureRequired: true as const,
      subjectCount: null,
      captureCountPerSubject: null,
      splitRatios: null,
      numericRepeatabilityAcceptanceThresholds: null,
      empiricalCaptureRecordsBundledAtDefinitionTime: 0 as const,
    }),
    semanticBoundary: Object.freeze({
      semanticAnnotationRequiredToAcquireNeutralMetrics: false as const,
      humanSemanticLabelsBundledAtDefinitionTime: 0 as const,
      traditionalClassLabelsBundledAtDefinitionTime: 0 as const,
      annotationAuthorityRequiredForThisNeutralExtension: false as const,
      neutralAcquisitionMayLaterBeJoinedToSeparatelyGovernedAnnotations: true as const,
    }),
    privacyBoundary: Object.freeze({
      rawImageStoredByThisArtifact: false as const,
      sourceImageContentStoredByThisArtifact: false as const,
      rawProviderResponseStoredByThisArtifact: false as const,
      faceEmbeddingStoredByThisArtifact: false as const,
      identityTemplateStoredByThisArtifact: false as const,
      researchSubjectRefMustBeStudyLocalOpaqueReference: true as const,
      researchSubjectRefClaimedAnonymous: false as const,
    }),
    authorityBoundary: Object.freeze({
      neutralAcquisitionMeansEmpiricalRepeatabilityEstablished: false as const,
      neutralAcquisitionMeansConstructValidity: false as const,
      neutralAcquisitionMeansTraditionalFang: false as const,
      descriptiveStatisticsMeanCalibration: false as const,
      descriptiveStatisticsMeanThreshold: false as const,
      syntheticVerificationMeansRealCaptureEvidence: false as const,
      historicalFR135ArtifactMutated: false as const,
    }),
    execution: Object.freeze({
      acquisitionRuntimeImplemented: true as const,
      empiricalCaptureRecordsBundledAtDefinitionTime: 0 as const,
      empiricalDatasetsBundledAtDefinitionTime: 0 as const,
      humanSemanticLabelsIssued: 0 as const,
      traditionalMetricBindingsIssued: 0 as const,
      calibrationProtocolsIssued: 0 as const,
      thresholdsIssued: 0 as const,
      criterionStatesIssued: 0 as const,
      structuredClaimsIssued: 0 as const,
      boundedNarrativesIssued: 0 as const,
      traditionalSemanticAuthority: false as const,
    }),
    researchNoteRef: FR144_RESEARCH_NOTE_REF,
    nextFrontier: FR144_NEXT_FRONTIER,
  });
}

export function recordSquareBroadFangNeutralCaptureFR144(
  runtime: SquareBroadFangNeutralCandidateMetricRuntimeFR142V1,
  identity: SquareBroadConstructValidityCaptureIdentityFR135V1,
): SquareBroadFangNeutralCaptureRecordFR144V1 {
  validateHistoricalAcquisitionBoundary();
  validateSyntheticPredecessor();
  validateRuntime(runtime);
  const researchSubjectRef = requireOpaqueRef('researchSubjectRef', identity.researchSubjectRef);
  const captureSeriesRef = requireOpaqueRef('captureSeriesRef', identity.captureSeriesRef);
  const captureRef = requireOpaqueRef('captureRef', identity.captureRef);

  const result: SquareBroadFangNeutralCaptureRecordFR144V1 = Object.freeze({
    schemaVersion: 'fr144-square-broad-fang-neutral-capture-record-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR144_CAPTURE_RECORD_ID,
    authorityState: 'square_broad_fang_fr142_neutral_metric_capture_record_materialized_no_semantic_label' as const,
    targetCriterionRef: 'criterion.intake.square_broad' as const,
    activeConstructScope: 'fang_shape_candidate_features_only' as const,
    identity: Object.freeze({ researchSubjectRef, captureSeriesRef, captureRef }),
    source: Object.freeze({
      fr142SchemaVersion: runtime.schemaVersion,
      fr142ArtifactVersion: runtime.artifactVersion,
      fr142AuthorityState: runtime.authorityState,
      fr142NextFrontier: runtime.nextFrontier,
      fr143SyntheticBehaviorVerified: true as const,
      fr143SyntheticRepeatabilityMeansEmpiricalCaptureRepeatability: false as const,
      candidateFeatureCoverage: 'fr142_three_role_invariant_fang_shape_candidate_metrics_only' as const,
    }),
    neutralMetricValues: Object.freeze([
      copyMetric(runtime, FR144_CORRESPONDENCE_METRIC_REF),
      copyMetric(runtime, FR144_ORTHOGONALITY_METRIC_REF),
      copyMetric(runtime, FR144_TURN_CONCENTRATION_METRIC_REF),
    ] as const),
    semanticBoundary: Object.freeze({
      humanSemanticLabel: null,
      traditionalClassLabel: null,
      semanticAnnotationRequiredToRecordNeutralMetrics: false as const,
      neutralCaptureRecordMeansConstructValidity: false as const,
      neutralCaptureRecordMeansTraditionalFang: false as const,
    }),
    privacyBoundary: Object.freeze({
      rawImageStored: false as const,
      sourceImageContentStored: false as const,
      rawProviderResponseStored: false as const,
      faceEmbeddingStored: false as const,
      identityTemplateStored: false as const,
      researchSubjectRefClaimedAnonymous: false as const,
    }),
    authorityBoundary: Object.freeze({
      descriptiveNeutralRecordMeansCalibration: false as const,
      descriptiveNeutralRecordMeansThreshold: false as const,
      componentOrderSemanticUseAllowed: false as const,
      outerInnerAnatomicalAssignmentAllowed: false as const,
      namedMouthCornerAssignmentAllowed: false as const,
    }),
    traditionalSemanticAuthority: false as const,
  });
  CAPTURE_ISSUED.add(result);
  return result;
}

export function assertIssuedSquareBroadFangNeutralCaptureRecordFR144(
  value: SquareBroadFangNeutralCaptureRecordFR144V1,
): void {
  if (!CAPTURE_ISSUED.has(value)) fail('capture record was not issued by the active FR-144 acquisition boundary.');
}

export function summarizeSquareBroadFangNeutralValuesFR144(
  metricRef: FR144MetricRef,
  values: readonly number[],
): SquareBroadFangNeutralMetricSummaryFR144V1 {
  if (![FR144_CORRESPONDENCE_METRIC_REF, FR144_ORTHOGONALITY_METRIC_REF, FR144_TURN_CONCENTRATION_METRIC_REF]
    .includes(metricRef)) fail(`unsupported FR-144 neutral metric ref ${metricRef}.`);
  if (values.length === 0 || values.some((value) => !Number.isFinite(value))) {
    fail('descriptive summaries require at least one finite neutral metric value.');
  }
  const min = Math.min(...values);
  const max = Math.max(...values);
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  return Object.freeze({
    metricRef,
    unit: 'ratio' as const,
    count: values.length,
    min,
    max,
    mean,
    range: max - min,
    classificationApplied: false as const,
    calibrationApplied: false as const,
    acceptanceThresholdApplied: false as const,
  });
}

export function materializeSquareBroadFangNeutralAcquisitionDatasetFR144(
  records: readonly SquareBroadFangNeutralCaptureRecordFR144V1[],
): SquareBroadFangNeutralAcquisitionDatasetFR144V1 {
  if (records.length === 0) fail('dataset materialization requires at least one issued FR-144 neutral capture record.');
  const captureRefs = new Set<string>();
  const subjects = new Set<string>();
  const series = new Map<string, { subjectRef: string; records: SquareBroadFangNeutralCaptureRecordFR144V1[] }>();

  for (const record of records) {
    assertIssuedSquareBroadFangNeutralCaptureRecordFR144(record);
    if (captureRefs.has(record.identity.captureRef)) fail(`duplicate captureRef ${record.identity.captureRef}.`);
    captureRefs.add(record.identity.captureRef);
    subjects.add(record.identity.researchSubjectRef);
    const existing = series.get(record.identity.captureSeriesRef);
    if (existing !== undefined && existing.subjectRef !== record.identity.researchSubjectRef) {
      fail(`captureSeriesRef ${record.identity.captureSeriesRef} cannot mix research subjects.`);
    }
    if (existing === undefined) {
      series.set(record.identity.captureSeriesRef, {
        subjectRef: record.identity.researchSubjectRef,
        records: [record],
      });
    } else {
      existing.records.push(record);
    }
  }

  const metricRefs = Object.freeze([
    FR144_CORRESPONDENCE_METRIC_REF,
    FR144_ORTHOGONALITY_METRIC_REF,
    FR144_TURN_CONCENTRATION_METRIC_REF,
  ] as const);
  const seriesSummaries = [...series.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([captureSeriesRef, entry]) => Object.freeze({
      researchSubjectRef: entry.subjectRef,
      captureSeriesRef,
      captureCount: entry.records.length,
      metrics: Object.freeze(metricRefs.map((metricRef) => summarizeSquareBroadFangNeutralValuesFR144(
        metricRef,
        entry.records.map((record) => record.neutralMetricValues.find((metric) => metric.metricRef === metricRef)!.value),
      )) as [
        SquareBroadFangNeutralMetricSummaryFR144V1,
        SquareBroadFangNeutralMetricSummaryFR144V1,
        SquareBroadFangNeutralMetricSummaryFR144V1,
      ]),
      repeatabilityClassificationIssued: false as const,
      repeatabilityAcceptanceThresholdApplied: false as const,
    }));

  const result: SquareBroadFangNeutralAcquisitionDatasetFR144V1 = Object.freeze({
    schemaVersion: 'fr144-square-broad-fang-neutral-acquisition-dataset-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR144_CAPTURE_RECORD_ID,
    authorityState: 'square_broad_fang_fr142_neutral_acquisition_dataset_materialized_descriptive_only' as const,
    datasetState: 'neutral_candidate_feature_observations_only_no_semantic_labels' as const,
    targetCriterionRef: 'criterion.intake.square_broad' as const,
    activeConstructScope: 'fang_shape_candidate_features_only' as const,
    captureRecords: Object.freeze([...records]),
    seriesSummaries: Object.freeze(seriesSummaries),
    observedCaptureCount: records.length,
    observedCaptureSeriesCount: series.size,
    observedResearchSubjectCount: subjects.size,
    semanticLabelsIssued: 0 as const,
    authorityBoundary: Object.freeze({
      datasetMaterializationMeansEmpiricalRepeatabilityEstablished: false as const,
      descriptiveSeriesSummaryMeansConstructValidity: false as const,
      datasetMaterializationMeansTraditionalBinding: false as const,
      datasetMaterializationMeansCalibration: false as const,
      datasetMaterializationMeansThreshold: false as const,
      datasetMaterializationMeansCriterionState: false as const,
      datasetMaterializationMeansClaim: false as const,
      datasetMaterializationMeansNarrative: false as const,
    }),
    traditionalSemanticAuthority: false as const,
    nextFrontier: FR144_NEXT_FRONTIER,
  });
  DATASET_ISSUED.add(result);
  return result;
}

export function assertIssuedSquareBroadFangNeutralAcquisitionDatasetFR144(
  value: SquareBroadFangNeutralAcquisitionDatasetFR144V1,
): void {
  if (!DATASET_ISSUED.has(value)) fail('dataset was not issued by the active FR-144 acquisition boundary.');
}
