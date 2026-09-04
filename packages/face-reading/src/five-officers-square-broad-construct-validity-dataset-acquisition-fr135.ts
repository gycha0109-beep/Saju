import {
  assertIssuedSquareBroadNeutralShapeMetricRuntimeFR134,
  type SquareBroadNeutralShapeMetricRuntimeFR134V1,
  type SquareBroadNeutralShapeMetricValueFR134V1,
} from './five-officers-square-broad-neutral-shape-metric-runtime-fr134.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR135_SQUARE_BROAD_CONSTRUCT_VALIDITY_DATASET_ACQUISITION_RECORD_ID =
  'research.face_reading.shenxiang.five_officers.square_broad_construct_validity_dataset_acquisition.fr135' as const;
export const FR135_AXIS_ALIGNMENT_METRIC_REF =
  'neutral.mouth.contour_set.closed_cycle_axis_alignment_mean@0.1.0' as const;
export const FR135_TURNING_ANGLE_METRIC_REF =
  'neutral.mouth.contour_set.closed_cycle_mean_absolute_turning_angle@0.1.0' as const;
export const FR135_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr135-square-broad-construct-validity-dataset-acquisition.md' as const;
export const FR135_NEXT_FRONTIER =
  'square_broad_independent_semantic_annotation_authority_and_protocol_materialization_then_empirical_collection' as const;

export interface SquareBroadConstructValidityCaptureIdentityFR135V1 {
  readonly researchSubjectRef: string;
  readonly captureSeriesRef: string;
  readonly captureRef: string;
}

export interface SquareBroadNeutralCaptureMetricFR135V1 {
  readonly metricRef: typeof FR135_AXIS_ALIGNMENT_METRIC_REF | typeof FR135_TURNING_ANGLE_METRIC_REF;
  readonly value: number;
  readonly unit: 'ratio' | 'radian';
  readonly coordinateFrame: 'pose_normalized_face_2d';
  readonly poseCompensated: true;
  readonly classificationApplied: false;
  readonly calibrationApplied: false;
  readonly traditionalBindingApplied: false;
}

export interface SquareBroadNeutralCaptureRecordFR135V1 {
  readonly schemaVersion: 'fr135-square-broad-neutral-capture-record-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR135_SQUARE_BROAD_CONSTRUCT_VALIDITY_DATASET_ACQUISITION_RECORD_ID;
  readonly authorityState: 'square_broad_neutral_capture_record_materialized_annotation_authority_pending';
  readonly targetCriterionRef: 'criterion.intake.square_broad';
  readonly activeConstructScope: 'fang_shape_candidate_features_only';
  readonly identity: SquareBroadConstructValidityCaptureIdentityFR135V1;
  readonly source: {
    readonly fr134SchemaVersion: 'fr134-square-broad-neutral-shape-metric-runtime-v1';
    readonly fr134ArtifactVersion: '0.1.0';
    readonly fr134AuthorityState: 'square_broad_role_invariant_neutral_shape_metrics_implemented_construct_validity_pending';
    readonly fr134NextFrontier: 'square_broad_construct_validity_annotation_governance_and_dataset_acquisition';
    readonly candidateFeatureCoverage: 'fr134_role_invariant_shape_metrics_only';
  };
  readonly neutralMetricValues: readonly [
    SquareBroadNeutralCaptureMetricFR135V1,
    SquareBroadNeutralCaptureMetricFR135V1,
  ];
  readonly annotationGovernance: {
    readonly state: 'requirements_frozen_authority_not_materialized';
    readonly independentSemanticAnnotationRequired: true;
    readonly annotationEvidenceMustBeIndependentOfCandidateMetricValues: true;
    readonly sourceGroundedConstructDefinitionRequired: true;
    readonly annotationAuthorityRef: null;
    readonly annotationProtocolRef: null;
    readonly labelSchemaRef: null;
    readonly traditionalSemanticLabel: null;
    readonly projectOwnerGovernanceAutoQualifies: false;
  };
  readonly privacyBoundary: {
    readonly rawImageStored: false;
    readonly sourceImageContentStored: false;
    readonly faceEmbeddingStored: false;
    readonly identityTemplateStored: false;
    readonly researchSubjectRefClaimedAnonymous: false;
  };
  readonly authorityBoundary: {
    readonly neutralCaptureRecordMeansConstructValidity: false;
    readonly neutralCaptureRecordMeansTraditionalFang: false;
    readonly neutralCaptureRecordMeansTraditionalDa: false;
    readonly neutralCaptureRecordMeansTraditionalSquareBroadCriterion: false;
    readonly descriptiveStatisticMeansCalibration: false;
    readonly descriptiveStatisticMeansThreshold: false;
    readonly componentOrderSemanticUseAllowed: false;
    readonly outerInnerAnatomicalAssignmentAllowed: false;
  };
  readonly traditionalSemanticAuthority: false;
}

export interface SquareBroadNeutralMetricSummaryFR135V1 {
  readonly metricRef: typeof FR135_AXIS_ALIGNMENT_METRIC_REF | typeof FR135_TURNING_ANGLE_METRIC_REF;
  readonly unit: 'ratio' | 'radian';
  readonly count: number;
  readonly min: number;
  readonly max: number;
  readonly mean: number;
  readonly range: number;
  readonly classificationApplied: false;
  readonly calibrationApplied: false;
  readonly acceptanceThresholdApplied: false;
}

export interface SquareBroadNeutralCaptureSeriesSummaryFR135V1 {
  readonly researchSubjectRef: string;
  readonly captureSeriesRef: string;
  readonly captureCount: number;
  readonly metrics: readonly [SquareBroadNeutralMetricSummaryFR135V1, SquareBroadNeutralMetricSummaryFR135V1];
}

export interface SquareBroadNeutralAcquisitionDatasetFR135V1 {
  readonly schemaVersion: 'fr135-square-broad-neutral-acquisition-dataset-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR135_SQUARE_BROAD_CONSTRUCT_VALIDITY_DATASET_ACQUISITION_RECORD_ID;
  readonly authorityState: 'square_broad_neutral_acquisition_dataset_materialized_annotation_authority_pending';
  readonly datasetState: 'neutral_candidate_feature_observations_only';
  readonly targetCriterionRef: 'criterion.intake.square_broad';
  readonly activeConstructScope: 'fang_shape_candidate_features_only';
  readonly captureRecords: readonly SquareBroadNeutralCaptureRecordFR135V1[];
  readonly seriesSummaries: readonly SquareBroadNeutralCaptureSeriesSummaryFR135V1[];
  readonly observedCaptureCount: number;
  readonly observedCaptureSeriesCount: number;
  readonly observedResearchSubjectCount: number;
  readonly annotationGovernance: ReturnType<typeof getSquareBroadConstructValidityAcquisitionContractFR135>['annotationGovernance'];
  readonly authorityBoundary: {
    readonly datasetMaterializationMeansConstructValidity: false;
    readonly repeatabilitySummaryMeansConstructValidity: false;
    readonly datasetMaterializationMeansTraditionalBinding: false;
    readonly datasetMaterializationMeansCalibration: false;
    readonly datasetMaterializationMeansThreshold: false;
    readonly datasetMaterializationMeansCriterionState: false;
    readonly datasetMaterializationMeansClaim: false;
    readonly datasetMaterializationMeansNarrative: false;
  };
  readonly traditionalSemanticAuthority: false;
  readonly nextFrontier: typeof FR135_NEXT_FRONTIER;
}

const CAPTURE_ISSUED = new WeakSet<object>();
const DATASET_ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-135 ${message}`);
}

function requireOpaqueRef(label: string, value: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) fail(`${label} must be a non-empty study-local opaque reference.`);
  return value;
}

function expectedUnit(metricRef: string): 'ratio' | 'radian' {
  if (metricRef === FR135_AXIS_ALIGNMENT_METRIC_REF) return 'ratio';
  if (metricRef === FR135_TURNING_ANGLE_METRIC_REF) return 'radian';
  fail(`unsupported neutral metric ref ${metricRef}.`);
}

function requireMetric(
  runtime: SquareBroadNeutralShapeMetricRuntimeFR134V1,
  metricRef: typeof FR135_AXIS_ALIGNMENT_METRIC_REF | typeof FR135_TURNING_ANGLE_METRIC_REF,
): SquareBroadNeutralShapeMetricValueFR134V1 {
  const matches = runtime.metricValues.filter((metric) => metric.metricRef === metricRef);
  if (matches.length !== 1) fail(`requires exactly one ${metricRef} value from FR-134.`);
  const metric = matches[0]!;
  const unit = expectedUnit(metricRef);
  if (
    !Number.isFinite(metric.value) ||
    metric.unit !== unit ||
    metric.coordinateFrame !== 'pose_normalized_face_2d' ||
    metric.poseCompensated !== true ||
    metric.classificationApplied !== false ||
    metric.calibrationApplied !== false ||
    metric.traditionalBindingApplied !== false
  ) fail(`FR-134 metric ${metricRef} authority or numeric boundary drift.`);
  return metric;
}

function validateRuntime(runtime: SquareBroadNeutralShapeMetricRuntimeFR134V1): void {
  assertIssuedSquareBroadNeutralShapeMetricRuntimeFR134(runtime);
  if (
    runtime.schemaVersion !== 'fr134-square-broad-neutral-shape-metric-runtime-v1' ||
    runtime.artifactVersion !== '0.1.0' ||
    runtime.authorityState !== 'square_broad_role_invariant_neutral_shape_metrics_implemented_construct_validity_pending' ||
    runtime.nextFrontier !== 'square_broad_construct_validity_annotation_governance_and_dataset_acquisition' ||
    runtime.constructValidityDatasetDesign.designStatus !== 'schema_only_no_dataset_materialized' ||
    runtime.constructValidityDatasetDesign.repeatedCaptureRequired !== true ||
    runtime.constructValidityDatasetDesign.independentSemanticAnnotationRequired !== true ||
    runtime.constructValidityDatasetDesign.semanticAnnotationAuthorityAvailable !== false ||
    runtime.constructValidityDatasetDesign.numericAcceptanceThresholds !== null ||
    runtime.constructValidityDatasetDesign.traditionalClassLabelsIssued !== 0 ||
    runtime.execution.constructValidityDatasetsMaterialized !== 0 ||
    runtime.execution.semanticAnnotationsIssued !== 0 ||
    runtime.execution.traditionalMetricBindingsIssued !== 0 ||
    runtime.execution.calibrationProtocolsIssued !== 0 ||
    runtime.execution.thresholdsIssued !== 0 ||
    runtime.execution.criterionStatesIssued !== 0 ||
    runtime.execution.traditionalSemanticAuthority !== false ||
    runtime.authorityBoundary.roleInvariantNeutralShapeMetricMeansTraditionalFang !== false ||
    runtime.authorityBoundary.neutralMetricRepeatabilityMeansConstructValidity !== false
  ) fail('requires the exact issued FR-134 neutral-metric / construct-validity-pending boundary.');
  requireMetric(runtime, FR135_AXIS_ALIGNMENT_METRIC_REF);
  requireMetric(runtime, FR135_TURNING_ANGLE_METRIC_REF);
}

function copyMetric(
  runtime: SquareBroadNeutralShapeMetricRuntimeFR134V1,
  metricRef: typeof FR135_AXIS_ALIGNMENT_METRIC_REF | typeof FR135_TURNING_ANGLE_METRIC_REF,
): SquareBroadNeutralCaptureMetricFR135V1 {
  const metric = requireMetric(runtime, metricRef);
  return Object.freeze({
    metricRef,
    value: metric.value,
    unit: expectedUnit(metricRef),
    coordinateFrame: 'pose_normalized_face_2d' as const,
    poseCompensated: true as const,
    classificationApplied: false as const,
    calibrationApplied: false as const,
    traditionalBindingApplied: false as const,
  });
}

export function getSquareBroadConstructValidityAcquisitionContractFR135() {
  return Object.freeze({
    schemaVersion: 'fr135-square-broad-construct-validity-acquisition-contract-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR135_SQUARE_BROAD_CONSTRUCT_VALIDITY_DATASET_ACQUISITION_RECORD_ID,
    predecessor: Object.freeze({
      fr134AuthorityState: 'square_broad_role_invariant_neutral_shape_metrics_implemented_construct_validity_pending' as const,
      fr134NextFrontier: 'square_broad_construct_validity_annotation_governance_and_dataset_acquisition' as const,
      fr134DatasetDesignStatus: 'schema_only_no_dataset_materialized' as const,
    }),
    acquisition: Object.freeze({
      captureUnit: 'same_subject_repeated_pose_normalized_neutral_expression_capture' as const,
      runtimeInputAuthority: 'issued_fr134_only' as const,
      requiredNeutralMetricRefs: Object.freeze([
        FR135_AXIS_ALIGNMENT_METRIC_REF,
        FR135_TURNING_ANGLE_METRIC_REF,
      ] as const),
      candidateFeatureCoverage: 'partial_fr134_shape_metrics_only' as const,
      repeatedCaptureRequired: true as const,
      subjectCount: null,
      captureCountPerSubject: null,
      splitRatios: null,
      numericAcceptanceThresholds: null,
    }),
    annotationGovernance: Object.freeze({
      state: 'requirements_frozen_authority_not_materialized' as const,
      independentSemanticAnnotationRequired: true as const,
      annotationEvidenceMustBeIndependentOfCandidateMetricValues: true as const,
      sourceGroundedConstructDefinitionRequired: true as const,
      annotationAuthorityRef: null,
      annotationProtocolRef: null,
      labelSchemaRef: null,
      projectOwnerGovernanceAutoQualifies: false as const,
      reviewerCount: null,
      quorum: null,
      consensusThreshold: null,
      traditionalClassLabelsIssued: 0 as const,
    }),
    privacyBoundary: Object.freeze({
      rawImageStoredByThisArtifact: false as const,
      sourceImageContentStoredByThisArtifact: false as const,
      faceEmbeddingStoredByThisArtifact: false as const,
      identityTemplateStoredByThisArtifact: false as const,
      researchSubjectRefMustBeStudyLocalOpaqueReference: true as const,
      researchSubjectRefClaimedAnonymous: false as const,
    }),
    authorityBoundary: Object.freeze({
      neutralAcquisitionMeansConstructValidity: false as const,
      neutralAcquisitionMeansTraditionalFang: false as const,
      neutralAcquisitionMeansTraditionalDa: false as const,
      neutralAcquisitionMeansTraditionalSquareBroadCriterion: false as const,
      annotationRequirementsMeanAnnotationAuthority: false as const,
      projectOwnerGovernanceMeansAnnotationAuthority: false as const,
      descriptiveStatisticsMeanCalibration: false as const,
      descriptiveStatisticsMeanThreshold: false as const,
      externalOutlineRoleAssignmentAllowed: false as const,
      componentOrderSemanticUseAllowed: false as const,
    }),
    execution: Object.freeze({
      acquisitionRuntimeImplemented: true as const,
      empiricalCaptureRecordsBundledAtDefinitionTime: 0 as const,
      semanticAnnotationsIssued: 0 as const,
      traditionalMetricBindingsIssued: 0 as const,
      calibrationProtocolsIssued: 0 as const,
      thresholdsIssued: 0 as const,
      criterionStatesIssued: 0 as const,
      structuredClaimsIssued: 0 as const,
      boundedNarrativesIssued: 0 as const,
      traditionalSemanticAuthority: false as const,
    }),
    researchNoteRef: FR135_RESEARCH_NOTE_REF,
    nextFrontier: FR135_NEXT_FRONTIER,
  });
}

export function recordSquareBroadNeutralConstructValidityCaptureFR135(
  runtime: SquareBroadNeutralShapeMetricRuntimeFR134V1,
  identity: SquareBroadConstructValidityCaptureIdentityFR135V1,
): SquareBroadNeutralCaptureRecordFR135V1 {
  validateRuntime(runtime);
  const researchSubjectRef = requireOpaqueRef('researchSubjectRef', identity.researchSubjectRef);
  const captureSeriesRef = requireOpaqueRef('captureSeriesRef', identity.captureSeriesRef);
  const captureRef = requireOpaqueRef('captureRef', identity.captureRef);

  const result: SquareBroadNeutralCaptureRecordFR135V1 = Object.freeze({
    schemaVersion: 'fr135-square-broad-neutral-capture-record-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR135_SQUARE_BROAD_CONSTRUCT_VALIDITY_DATASET_ACQUISITION_RECORD_ID,
    authorityState: 'square_broad_neutral_capture_record_materialized_annotation_authority_pending' as const,
    targetCriterionRef: 'criterion.intake.square_broad' as const,
    activeConstructScope: 'fang_shape_candidate_features_only' as const,
    identity: Object.freeze({ researchSubjectRef, captureSeriesRef, captureRef }),
    source: Object.freeze({
      fr134SchemaVersion: runtime.schemaVersion,
      fr134ArtifactVersion: runtime.artifactVersion,
      fr134AuthorityState: runtime.authorityState,
      fr134NextFrontier: runtime.nextFrontier,
      candidateFeatureCoverage: 'fr134_role_invariant_shape_metrics_only' as const,
    }),
    neutralMetricValues: Object.freeze([
      copyMetric(runtime, FR135_AXIS_ALIGNMENT_METRIC_REF),
      copyMetric(runtime, FR135_TURNING_ANGLE_METRIC_REF),
    ] as const),
    annotationGovernance: Object.freeze({
      state: 'requirements_frozen_authority_not_materialized' as const,
      independentSemanticAnnotationRequired: true as const,
      annotationEvidenceMustBeIndependentOfCandidateMetricValues: true as const,
      sourceGroundedConstructDefinitionRequired: true as const,
      annotationAuthorityRef: null,
      annotationProtocolRef: null,
      labelSchemaRef: null,
      traditionalSemanticLabel: null,
      projectOwnerGovernanceAutoQualifies: false as const,
    }),
    privacyBoundary: Object.freeze({
      rawImageStored: false as const,
      sourceImageContentStored: false as const,
      faceEmbeddingStored: false as const,
      identityTemplateStored: false as const,
      researchSubjectRefClaimedAnonymous: false as const,
    }),
    authorityBoundary: Object.freeze({
      neutralCaptureRecordMeansConstructValidity: false as const,
      neutralCaptureRecordMeansTraditionalFang: false as const,
      neutralCaptureRecordMeansTraditionalDa: false as const,
      neutralCaptureRecordMeansTraditionalSquareBroadCriterion: false as const,
      descriptiveStatisticMeansCalibration: false as const,
      descriptiveStatisticMeansThreshold: false as const,
      componentOrderSemanticUseAllowed: false as const,
      outerInnerAnatomicalAssignmentAllowed: false as const,
    }),
    traditionalSemanticAuthority: false as const,
  });
  CAPTURE_ISSUED.add(result);
  return result;
}

export function assertIssuedSquareBroadNeutralCaptureRecordFR135(
  value: SquareBroadNeutralCaptureRecordFR135V1,
): void {
  if (!CAPTURE_ISSUED.has(value)) fail('capture record was not issued by the active FR-135 acquisition boundary.');
}

export function summarizeNeutralValuesFR135(
  metricRef: typeof FR135_AXIS_ALIGNMENT_METRIC_REF | typeof FR135_TURNING_ANGLE_METRIC_REF,
  unit: 'ratio' | 'radian',
  values: readonly number[],
): SquareBroadNeutralMetricSummaryFR135V1 {
  if (unit !== expectedUnit(metricRef)) fail(`unit does not match ${metricRef}.`);
  if (values.length === 0 || values.some((value) => !Number.isFinite(value))) {
    fail('descriptive summaries require at least one finite neutral metric value.');
  }
  const min = Math.min(...values);
  const max = Math.max(...values);
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  return Object.freeze({
    metricRef,
    unit,
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

export function materializeSquareBroadNeutralAcquisitionDatasetFR135(
  records: readonly SquareBroadNeutralCaptureRecordFR135V1[],
): SquareBroadNeutralAcquisitionDatasetFR135V1 {
  if (records.length === 0) fail('dataset materialization requires at least one issued neutral capture record.');
  const captureRefs = new Set<string>();
  const subjects = new Set<string>();
  const series = new Map<string, { subjectRef: string; records: SquareBroadNeutralCaptureRecordFR135V1[] }>();

  for (const record of records) {
    assertIssuedSquareBroadNeutralCaptureRecordFR135(record);
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

  const seriesSummaries = [...series.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([captureSeriesRef, entry]) => {
      const axisValues = entry.records.map((record) =>
        record.neutralMetricValues.find((metric) => metric.metricRef === FR135_AXIS_ALIGNMENT_METRIC_REF)!.value);
      const turnValues = entry.records.map((record) =>
        record.neutralMetricValues.find((metric) => metric.metricRef === FR135_TURNING_ANGLE_METRIC_REF)!.value);
      return Object.freeze({
        researchSubjectRef: entry.subjectRef,
        captureSeriesRef,
        captureCount: entry.records.length,
        metrics: Object.freeze([
          summarizeNeutralValuesFR135(FR135_AXIS_ALIGNMENT_METRIC_REF, 'ratio', axisValues),
          summarizeNeutralValuesFR135(FR135_TURNING_ANGLE_METRIC_REF, 'radian', turnValues),
        ] as const),
      });
    });

  const contract = getSquareBroadConstructValidityAcquisitionContractFR135();
  const result: SquareBroadNeutralAcquisitionDatasetFR135V1 = Object.freeze({
    schemaVersion: 'fr135-square-broad-neutral-acquisition-dataset-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR135_SQUARE_BROAD_CONSTRUCT_VALIDITY_DATASET_ACQUISITION_RECORD_ID,
    authorityState: 'square_broad_neutral_acquisition_dataset_materialized_annotation_authority_pending' as const,
    datasetState: 'neutral_candidate_feature_observations_only' as const,
    targetCriterionRef: 'criterion.intake.square_broad' as const,
    activeConstructScope: 'fang_shape_candidate_features_only' as const,
    captureRecords: Object.freeze([...records]),
    seriesSummaries: Object.freeze(seriesSummaries),
    observedCaptureCount: records.length,
    observedCaptureSeriesCount: series.size,
    observedResearchSubjectCount: subjects.size,
    annotationGovernance: contract.annotationGovernance,
    authorityBoundary: Object.freeze({
      datasetMaterializationMeansConstructValidity: false as const,
      repeatabilitySummaryMeansConstructValidity: false as const,
      datasetMaterializationMeansTraditionalBinding: false as const,
      datasetMaterializationMeansCalibration: false as const,
      datasetMaterializationMeansThreshold: false as const,
      datasetMaterializationMeansCriterionState: false as const,
      datasetMaterializationMeansClaim: false as const,
      datasetMaterializationMeansNarrative: false as const,
    }),
    traditionalSemanticAuthority: false as const,
    nextFrontier: FR135_NEXT_FRONTIER,
  });
  DATASET_ISSUED.add(result);
  return result;
}

export function assertIssuedSquareBroadNeutralAcquisitionDatasetFR135(
  value: SquareBroadNeutralAcquisitionDatasetFR135V1,
): void {
  if (!DATASET_ISSUED.has(value)) fail('dataset was not issued by the active FR-135 acquisition boundary.');
}
