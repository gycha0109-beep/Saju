import {
  assertIssuedEyePairProspectiveCaptureManifestFR159,
  FR159_PERIMETER_METRIC_REF,
  FR159_X_SPAN_METRIC_REF,
  summarizeEyePairProspectiveMetricValuesFR159,
  type EyePairProspectiveCaptureManifestFR159V1,
  type EyePairProspectiveDescriptiveMetricSummaryFR159V1,
  type EyePairProspectivePrimaryMetricRefFR159V1,
} from './eye-pair-prospective-repeatability-protocol-fr159.js';
import {
  assertIssuedRoleInvariantEyePairNeutralShapeMetricsFR158,
  type RoleInvariantEyePairNeutralShapeMetricRuntimeFR158V1,
  type RoleInvariantEyePairNeutralShapeMetricValueFR158V1,
} from './role-invariant-eye-pair-neutral-shape-metric-runtime-fr158.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR160_EYE_PAIR_PROSPECTIVE_ACQUISITION_RECORD_ID =
  'research.face_reading.neutral.eye_pair.prospective_acquisition_runtime.fr160' as const;
export const FR160_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr160-eye-pair-prospective-acquisition-runtime.md' as const;
export const FR160_NEXT_FRONTIER =
  'supply_fresh_post_preregistration_captures_execute_fr66_to_fr158_then_record_fr160_and_describe_within_series_and_condition_variation_without_identity_threshold_or_semantic_promotion' as const;

export interface EyePairProspectiveAcquisitionInputFR160V1 {
  readonly manifest: EyePairProspectiveCaptureManifestFR159V1;
  readonly metricRuntime: RoleInvariantEyePairNeutralShapeMetricRuntimeFR158V1;
  readonly metricRuntimeCorrespondsToManifestCaptureAttested: boolean;
}

export interface EyePairProspectiveMetricObservationFR160V1 {
  readonly metricRef: EyePairProspectivePrimaryMetricRefFR159V1;
  readonly value: number;
  readonly unit: 'ratio';
  readonly coordinateFrame: 'canonical_aligned_right_handed_metric_3d';
  readonly sourceMetricRuntimeSchemaVersion: 'fr158-role-invariant-eye-pair-neutral-shape-metric-runtime-v1';
  readonly classificationApplied: false;
  readonly calibrationApplied: false;
  readonly thresholdApplied: false;
  readonly identityMatchingApplied: false;
  readonly traditionalBindingApplied: false;
}

export interface EyePairProspectiveAcquisitionRecordFR160V1 {
  readonly schemaVersion: 'fr160-eye-pair-prospective-acquisition-record-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR160_EYE_PAIR_PROSPECTIVE_ACQUISITION_RECORD_ID;
  readonly authorityState: 'fresh_capture_metric_observation_record_only_no_repeatability_adjudication';
  readonly prospectiveCollectionRef: string;
  readonly captureSeriesRef: string;
  readonly captureRef: string;
  readonly captureConditionRef: string;
  readonly captureSequenceIndex: number;
  readonly source: {
    readonly fr159ManifestSchemaVersion: 'fr159-eye-pair-prospective-capture-manifest-v1';
    readonly fr158RuntimeSchemaVersion: 'fr158-role-invariant-eye-pair-neutral-shape-metric-runtime-v1';
    readonly fr158CoordinateFrame: 'canonical_aligned_right_handed_metric_3d';
    readonly primaryMetricCoverage: 'fr159_preregistered_two_metric_subset_only';
  };
  readonly linkageAttestation: {
    readonly metricRuntimeCorrespondsToManifestCaptureAttested: true;
    readonly attestationMeansIndependentCaptureRuntimeProof: false;
  };
  readonly metricObservations: readonly [
    EyePairProspectiveMetricObservationFR160V1,
    EyePairProspectiveMetricObservationFR160V1,
  ];
  readonly authorityBoundary: {
    readonly observationRecordMeansEmpiricalRepeatabilityEstablished: false;
    readonly observationRecordMeansCaptureQualityValidated: false;
    readonly observationRecordMeansConstructValidity: false;
    readonly captureSeriesRefMeansIdentityMatch: false;
    readonly identityMatchingPerformed: false;
    readonly biometricTemplateIssued: false;
    readonly classificationIssued: false;
    readonly calibrationIssued: false;
    readonly thresholdIssued: false;
  };
  readonly traditionalSemanticAuthority: false;
}

export interface EyePairProspectiveSeriesConditionSummaryFR160V1 {
  readonly prospectiveCollectionRef: string;
  readonly captureSeriesRef: string;
  readonly captureConditionRef: string;
  readonly captureCount: number;
  readonly captureSequenceIndices: readonly number[];
  readonly metrics: readonly [
    EyePairProspectiveDescriptiveMetricSummaryFR159V1,
    EyePairProspectiveDescriptiveMetricSummaryFR159V1,
  ];
  readonly evaluationState: 'descriptive_series_condition_summary_only';
  readonly repeatabilityPassFailIssued: false;
  readonly captureSensitivityPassFailIssued: false;
  readonly identityComparisonIssued: false;
}

export interface EyePairProspectiveAcquisitionDatasetFR160V1 {
  readonly schemaVersion: 'fr160-eye-pair-prospective-acquisition-dataset-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR160_EYE_PAIR_PROSPECTIVE_ACQUISITION_RECORD_ID;
  readonly authorityState: 'prospective_metric_observation_dataset_descriptive_only';
  readonly prospectiveCollectionRef: string;
  readonly captureRecords: readonly EyePairProspectiveAcquisitionRecordFR160V1[];
  readonly seriesConditionSummaries: readonly EyePairProspectiveSeriesConditionSummaryFR160V1[];
  readonly observedCaptureCount: number;
  readonly observedCaptureSeriesCount: number;
  readonly observedCaptureConditionCount: number;
  readonly authorityBoundary: {
    readonly datasetMaterializationMeansEmpiricalRepeatabilityEstablished: false;
    readonly descriptiveSeriesSummaryMeansRepeatabilityPass: false;
    readonly descriptiveConditionSummaryMeansCaptureQualityValidated: false;
    readonly betweenSeriesIdentityInferenceAllowed: false;
    readonly sameDifferentParticipantClassificationAllowed: false;
    readonly calibrationIssued: false;
    readonly thresholdsIssued: false;
    readonly constructValidity: 'unresolved';
    readonly traditionalBinding: 'unresolved';
  };
  readonly privacyBoundary: {
    readonly rawImageStored: false;
    readonly rawProviderResponseStored: false;
    readonly rawLandmarkSetStored: false;
    readonly derivedFullFaceMetricGeometryStored: false;
    readonly faceEmbeddingStored: false;
    readonly identityTemplateStored: false;
  };
  readonly traditionalSemanticAuthority: false;
  readonly nextFrontier: typeof FR160_NEXT_FRONTIER;
}

const RECORD_ISSUED = new WeakSet<object>();
const DATASET_ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-160 ${message}`);
}

function primaryMetric(
  runtime: RoleInvariantEyePairNeutralShapeMetricRuntimeFR158V1,
  metricRef: EyePairProspectivePrimaryMetricRefFR159V1,
): RoleInvariantEyePairNeutralShapeMetricValueFR158V1 {
  const matches = runtime.metricValues.filter((metric) => metric.metricRef === metricRef);
  if (matches.length !== 1) fail(`requires exactly one ${metricRef} value from issued FR-158 runtime.`);
  const metric = matches[0]!;
  if (
    !Number.isFinite(metric.value)
    || metric.unit !== 'ratio'
    || metric.coordinateFrame !== 'canonical_aligned_right_handed_metric_3d'
    || metric.classificationApplied !== false
    || metric.calibrationApplied !== false
    || metric.thresholdApplied !== false
    || metric.identityMatchingApplied !== false
    || metric.traditionalBindingApplied !== false
  ) fail(`FR-158 primary metric ${metricRef} numeric or authority boundary drift.`);
  return metric;
}

function validateMetricRuntime(runtime: RoleInvariantEyePairNeutralShapeMetricRuntimeFR158V1): void {
  assertIssuedRoleInvariantEyePairNeutralShapeMetricsFR158(runtime);
  if (
    runtime.schemaVersion !== 'fr158-role-invariant-eye-pair-neutral-shape-metric-runtime-v1'
    || runtime.artifactVersion !== '0.1.0'
    || runtime.authorityState !== 'role_invariant_eye_pair_metric_3d_candidates_research_only'
    || runtime.source.coordinateFrame !== 'canonical_aligned_right_handed_metric_3d'
    || runtime.geometryBoundary.reviewed2DProjectionUsed !== false
    || runtime.geometryBoundary.metricXYZDroppedTo2D !== false
    || runtime.empiricalBoundary.currentDevelopmentCapturesCanEstablishValidation !== false
    || runtime.empiricalBoundary.prospectiveFreshCaptureEvaluationRequired !== true
    || runtime.empiricalBoundary.empiricalRepeatabilityEstablished !== false
    || runtime.empiricalBoundary.captureQualityValidated !== false
    || runtime.empiricalBoundary.numericRepeatabilityAcceptanceThreshold !== null
    || runtime.authorityBoundary.identityMatchingPerformed !== false
    || runtime.authorityBoundary.biometricTemplateIssued !== false
    || runtime.authorityBoundary.thresholdsIssued !== false
    || runtime.authorityBoundary.traditionalBinding !== 'unresolved'
    || runtime.traditionalSemanticAuthority !== false
    || runtime.nextFrontier !== 'prospective_eye_pair_metric_3d_repeatability_and_capture_sensitivity_evaluation_without_identity_matching_or_semantic_promotion'
  ) fail('requires the exact issued FR-158 research-only prospective-evaluation boundary.');
  primaryMetric(runtime, FR159_X_SPAN_METRIC_REF);
  primaryMetric(runtime, FR159_PERIMETER_METRIC_REF);
}

function copyMetric(
  runtime: RoleInvariantEyePairNeutralShapeMetricRuntimeFR158V1,
  metricRef: EyePairProspectivePrimaryMetricRefFR159V1,
): EyePairProspectiveMetricObservationFR160V1 {
  const metric = primaryMetric(runtime, metricRef);
  return Object.freeze({
    metricRef,
    value: metric.value,
    unit: 'ratio' as const,
    coordinateFrame: 'canonical_aligned_right_handed_metric_3d' as const,
    sourceMetricRuntimeSchemaVersion: runtime.schemaVersion,
    classificationApplied: false as const,
    calibrationApplied: false as const,
    thresholdApplied: false as const,
    identityMatchingApplied: false as const,
    traditionalBindingApplied: false as const,
  });
}

export function getEyePairProspectiveAcquisitionContractFR160() {
  return Object.freeze({
    schemaVersion: 'fr160-eye-pair-prospective-acquisition-contract-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR160_EYE_PAIR_PROSPECTIVE_ACQUISITION_RECORD_ID,
    predecessor: Object.freeze({
      fr159AuthorityState: 'prospective_protocol_preregistered_no_fresh_capture_evidence_collected' as const,
      fr159NextFrontier:
        'collect_fresh_post_preregistration_eye_pair_repeat_capture_series_then_describe_repeatability_and_capture_condition_sensitivity_without_threshold_or_semantic_promotion' as const,
      fr158RuntimeRequired: true as const,
      issuedFr159ManifestRequired: true as const,
      issuedFr158RuntimeRequired: true as const,
    }),
    acquisition: Object.freeze({
      primaryMetricRefs: Object.freeze([FR159_X_SPAN_METRIC_REF, FR159_PERIMETER_METRIC_REF] as const),
      metricRuntimeToManifestCaptureLinkageAttestationRequired: true as const,
      linkageAttestationMeansIndependentProof: false as const,
      prospectiveCollectionMustBeSingleWithinMaterializedDataset: true as const,
      duplicateCaptureRefAllowed: false as const,
      duplicateCaptureSequenceIndexWithinSeriesAllowed: false as const,
      empiricalFreshCaptureRecordsBundledAtDefinitionTime: 0 as const,
    }),
    descriptiveAnalysis: Object.freeze({
      grouping: 'capture_series_and_capture_condition' as const,
      statistics: Object.freeze(['count', 'min', 'max', 'mean', 'range'] as const),
      repeatabilityPassFailIssued: false as const,
      captureSensitivityPassFailIssued: false as const,
      betweenSeriesIdentityInferenceAllowed: false as const,
      numericRepeatabilityAcceptanceThreshold: null,
      numericCaptureQualityThreshold: null,
    }),
    verificationBoundary: Object.freeze({
      syntheticVerifierFixtureAllowedForMechanicsOnly: true as const,
      verifierFixtureMeansEmpiricalFreshCaptureEvidence: false as const,
      verifierFixtureMeansRepeatabilityEstablished: false as const,
    }),
    privacyBoundary: Object.freeze({
      rawImageStoredByArtifact: false as const,
      rawProviderResponseStoredByArtifact: false as const,
      rawLandmarkSetStoredByArtifact: false as const,
      derivedFullFaceMetricGeometryStoredByArtifact: false as const,
      faceEmbeddingStoredByArtifact: false as const,
      identityTemplateStoredByArtifact: false as const,
    }),
    authorityBoundary: Object.freeze({
      acquisitionRecordMeansEmpiricalRepeatabilityEstablished: false as const,
      descriptiveDatasetMeansCaptureQualityValidated: false as const,
      sameParticipantSeriesGroupingMeansIdentityMatching: false as const,
      classificationIssued: false as const,
      calibrationIssued: false as const,
      thresholdsIssued: false as const,
      constructValidity: 'unresolved' as const,
      traditionalBinding: 'unresolved' as const,
      traditionalSemanticAuthority: false as const,
    }),
    researchNoteRef: FR160_RESEARCH_NOTE_REF,
    nextFrontier: FR160_NEXT_FRONTIER,
  });
}

export function recordEyePairProspectiveAcquisitionFR160(
  input: EyePairProspectiveAcquisitionInputFR160V1,
): EyePairProspectiveAcquisitionRecordFR160V1 {
  assertIssuedEyePairProspectiveCaptureManifestFR159(input.manifest);
  validateMetricRuntime(input.metricRuntime);
  if (input.metricRuntimeCorrespondsToManifestCaptureAttested !== true) {
    fail('record admission requires explicit attestation that the FR-158 runtime corresponds to the FR-159 manifest capture.');
  }

  const result: EyePairProspectiveAcquisitionRecordFR160V1 = Object.freeze({
    schemaVersion: 'fr160-eye-pair-prospective-acquisition-record-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR160_EYE_PAIR_PROSPECTIVE_ACQUISITION_RECORD_ID,
    authorityState: 'fresh_capture_metric_observation_record_only_no_repeatability_adjudication' as const,
    prospectiveCollectionRef: input.manifest.prospectiveCollectionRef,
    captureSeriesRef: input.manifest.captureSeriesRef,
    captureRef: input.manifest.captureRef,
    captureConditionRef: input.manifest.captureConditionRef,
    captureSequenceIndex: input.manifest.captureSequenceIndex,
    source: Object.freeze({
      fr159ManifestSchemaVersion: input.manifest.schemaVersion,
      fr158RuntimeSchemaVersion: input.metricRuntime.schemaVersion,
      fr158CoordinateFrame: 'canonical_aligned_right_handed_metric_3d' as const,
      primaryMetricCoverage: 'fr159_preregistered_two_metric_subset_only' as const,
    }),
    linkageAttestation: Object.freeze({
      metricRuntimeCorrespondsToManifestCaptureAttested: true as const,
      attestationMeansIndependentCaptureRuntimeProof: false as const,
    }),
    metricObservations: Object.freeze([
      copyMetric(input.metricRuntime, FR159_X_SPAN_METRIC_REF),
      copyMetric(input.metricRuntime, FR159_PERIMETER_METRIC_REF),
    ] as const),
    authorityBoundary: Object.freeze({
      observationRecordMeansEmpiricalRepeatabilityEstablished: false as const,
      observationRecordMeansCaptureQualityValidated: false as const,
      observationRecordMeansConstructValidity: false as const,
      captureSeriesRefMeansIdentityMatch: false as const,
      identityMatchingPerformed: false as const,
      biometricTemplateIssued: false as const,
      classificationIssued: false as const,
      calibrationIssued: false as const,
      thresholdIssued: false as const,
    }),
    traditionalSemanticAuthority: false as const,
  });
  RECORD_ISSUED.add(result);
  return result;
}

export function assertIssuedEyePairProspectiveAcquisitionRecordFR160(
  record: EyePairProspectiveAcquisitionRecordFR160V1,
): void {
  if (!RECORD_ISSUED.has(record)) fail('acquisition record was not issued by the active FR-160 boundary.');
  if (
    record.schemaVersion !== 'fr160-eye-pair-prospective-acquisition-record-v1'
    || record.artifactVersion !== '0.1.0'
    || record.authorityState !== 'fresh_capture_metric_observation_record_only_no_repeatability_adjudication'
    || record.linkageAttestation.metricRuntimeCorrespondsToManifestCaptureAttested !== true
    || record.linkageAttestation.attestationMeansIndependentCaptureRuntimeProof !== false
    || record.metricObservations.length !== 2
    || record.metricObservations[0]?.metricRef !== FR159_X_SPAN_METRIC_REF
    || record.metricObservations[1]?.metricRef !== FR159_PERIMETER_METRIC_REF
    || record.metricObservations.some((metric) => !Number.isFinite(metric.value) || metric.identityMatchingApplied !== false || metric.thresholdApplied !== false)
    || record.authorityBoundary.observationRecordMeansEmpiricalRepeatabilityEstablished !== false
    || record.authorityBoundary.captureSeriesRefMeansIdentityMatch !== false
    || record.authorityBoundary.identityMatchingPerformed !== false
    || record.authorityBoundary.biometricTemplateIssued !== false
    || record.traditionalSemanticAuthority !== false
  ) fail('issued acquisition-record authority boundary drift.');
}

export function materializeEyePairProspectiveAcquisitionDatasetFR160(
  records: readonly EyePairProspectiveAcquisitionRecordFR160V1[],
): EyePairProspectiveAcquisitionDatasetFR160V1 {
  if (records.length === 0) fail('dataset materialization requires at least one issued FR-160 acquisition record.');
  records.forEach(assertIssuedEyePairProspectiveAcquisitionRecordFR160);

  const prospectiveCollectionRef = records[0]!.prospectiveCollectionRef;
  if (records.some((record) => record.prospectiveCollectionRef !== prospectiveCollectionRef)) {
    fail('one materialized FR-160 dataset cannot mix prospectiveCollectionRef values.');
  }
  const captureRefs = new Set<string>();
  const sequenceKeys = new Set<string>();
  for (const record of records) {
    if (captureRefs.has(record.captureRef)) fail(`duplicate captureRef ${record.captureRef}.`);
    captureRefs.add(record.captureRef);
    const sequenceKey = JSON.stringify([record.captureSeriesRef, record.captureSequenceIndex]);
    if (sequenceKeys.has(sequenceKey)) fail('duplicate captureSequenceIndex within one captureSeriesRef.');
    sequenceKeys.add(sequenceKey);
  }

  const groups = new Map<string, EyePairProspectiveAcquisitionRecordFR160V1[]>();
  for (const record of records) {
    const key = JSON.stringify([record.captureSeriesRef, record.captureConditionRef]);
    const group = groups.get(key) ?? [];
    group.push(record);
    groups.set(key, group);
  }

  const seriesConditionSummaries = [...groups.values()].map((group) => {
    const first = group[0]!;
    const xValues = group.map((record) => record.metricObservations[0].value);
    const perimeterValues = group.map((record) => record.metricObservations[1].value);
    return Object.freeze({
      prospectiveCollectionRef,
      captureSeriesRef: first.captureSeriesRef,
      captureConditionRef: first.captureConditionRef,
      captureCount: group.length,
      captureSequenceIndices: Object.freeze(group.map((record) => record.captureSequenceIndex).sort((left, right) => left - right)),
      metrics: Object.freeze([
        summarizeEyePairProspectiveMetricValuesFR159(FR159_X_SPAN_METRIC_REF, xValues),
        summarizeEyePairProspectiveMetricValuesFR159(FR159_PERIMETER_METRIC_REF, perimeterValues),
      ] as const),
      evaluationState: 'descriptive_series_condition_summary_only' as const,
      repeatabilityPassFailIssued: false as const,
      captureSensitivityPassFailIssued: false as const,
      identityComparisonIssued: false as const,
    });
  });

  const result: EyePairProspectiveAcquisitionDatasetFR160V1 = Object.freeze({
    schemaVersion: 'fr160-eye-pair-prospective-acquisition-dataset-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR160_EYE_PAIR_PROSPECTIVE_ACQUISITION_RECORD_ID,
    authorityState: 'prospective_metric_observation_dataset_descriptive_only' as const,
    prospectiveCollectionRef,
    captureRecords: Object.freeze([...records]),
    seriesConditionSummaries: Object.freeze(seriesConditionSummaries),
    observedCaptureCount: records.length,
    observedCaptureSeriesCount: new Set(records.map((record) => record.captureSeriesRef)).size,
    observedCaptureConditionCount: new Set(records.map((record) => record.captureConditionRef)).size,
    authorityBoundary: Object.freeze({
      datasetMaterializationMeansEmpiricalRepeatabilityEstablished: false as const,
      descriptiveSeriesSummaryMeansRepeatabilityPass: false as const,
      descriptiveConditionSummaryMeansCaptureQualityValidated: false as const,
      betweenSeriesIdentityInferenceAllowed: false as const,
      sameDifferentParticipantClassificationAllowed: false as const,
      calibrationIssued: false as const,
      thresholdsIssued: false as const,
      constructValidity: 'unresolved' as const,
      traditionalBinding: 'unresolved' as const,
    }),
    privacyBoundary: Object.freeze({
      rawImageStored: false as const,
      rawProviderResponseStored: false as const,
      rawLandmarkSetStored: false as const,
      derivedFullFaceMetricGeometryStored: false as const,
      faceEmbeddingStored: false as const,
      identityTemplateStored: false as const,
    }),
    traditionalSemanticAuthority: false as const,
    nextFrontier: FR160_NEXT_FRONTIER,
  });
  DATASET_ISSUED.add(result);
  return result;
}

export function assertIssuedEyePairProspectiveAcquisitionDatasetFR160(
  dataset: EyePairProspectiveAcquisitionDatasetFR160V1,
): void {
  if (!DATASET_ISSUED.has(dataset)) fail('acquisition dataset was not issued by the active FR-160 boundary.');
  if (
    dataset.schemaVersion !== 'fr160-eye-pair-prospective-acquisition-dataset-v1'
    || dataset.artifactVersion !== '0.1.0'
    || dataset.authorityState !== 'prospective_metric_observation_dataset_descriptive_only'
    || dataset.observedCaptureCount !== dataset.captureRecords.length
    || dataset.authorityBoundary.datasetMaterializationMeansEmpiricalRepeatabilityEstablished !== false
    || dataset.authorityBoundary.betweenSeriesIdentityInferenceAllowed !== false
    || dataset.authorityBoundary.sameDifferentParticipantClassificationAllowed !== false
    || dataset.authorityBoundary.thresholdsIssued !== false
    || dataset.authorityBoundary.constructValidity !== 'unresolved'
    || dataset.authorityBoundary.traditionalBinding !== 'unresolved'
    || dataset.privacyBoundary.rawImageStored !== false
    || dataset.privacyBoundary.rawLandmarkSetStored !== false
    || dataset.privacyBoundary.faceEmbeddingStored !== false
    || dataset.privacyBoundary.identityTemplateStored !== false
    || dataset.traditionalSemanticAuthority !== false
    || dataset.nextFrontier !== FR160_NEXT_FRONTIER
  ) fail('issued acquisition-dataset authority boundary drift.');
}