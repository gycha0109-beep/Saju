import {
  buildMesh6DMultiFramePoseSweepEvidence,
  type Mesh6DMultiFrameInputV1,
  type Mesh6DMultiFramePoseSweepEvidenceV1,
} from './mesh6d-multi-frame-pose-sweep-evidence.js';
import {
  MESH6E_PRIMARY_EVIDENCE_FIELDS,
  assertIssuedMesh6EProspectiveSweepManifest,
  summarizeMesh6EProspectiveEvidenceValues,
  type Mesh6EPrimaryEvidenceField,
  type Mesh6EProspectiveDescriptiveEvidenceSummaryV1,
  type Mesh6EProspectiveSweepManifestV1,
} from './mesh6e-prospective-real-capture-calibration-protocol.js';
import { FaceAuthorityValidationError } from './validation.js';

export const MESH6F_PROSPECTIVE_SWEEP_ACQUISITION_RECORD_ID =
  'research.face_geometry.zygomatic.prospective_sweep_acquisition_runtime.mesh6f' as const;
export const MESH6F_NEXT_FRONTIER =
  'supply_actual_fresh_post_preregistration_sweeps_execute_mesh6d_inside_mesh6f_then_inspect_descriptive_repeatability_and_capture_condition_variation_before_any_calibration_proposal' as const;

export interface Mesh6FProspectiveSweepAcquisitionInputV1 {
  readonly manifest: Mesh6EProspectiveSweepManifestV1;
  readonly mesh6DInput: Mesh6DMultiFrameInputV1;
  readonly mesh6DInputCorrespondsToManifestSweepAttested: boolean;
}

export interface Mesh6FEvidenceObservationV1 {
  readonly evidenceField: Mesh6EPrimaryEvidenceField;
  readonly value: number;
  readonly sourceSchemaVersion: 'mesh6d-multi-frame-pose-sweep-evidence-v1';
  readonly classificationApplied: false;
  readonly calibrationApplied: false;
  readonly thresholdApplied: false;
  readonly productionAdmissionApplied: false;
  readonly identityMatchingApplied: false;
  readonly traditionalBindingApplied: false;
}

export interface Mesh6FSourceProvenanceV1 {
  readonly coordinateFrame: 'canonical_aligned_right_handed_metric_3d';
  readonly unit: 'centimeter';
  readonly canonicalAssetDigest: string;
  readonly releaseCommit: string;
  readonly geometryMetadataBlobSha: string;
  readonly adapterSchemaVersion: 'face-geometry-mediapipe468-weighted-region-adapter-v2';
  readonly adapterSourceAssetId: string;
  readonly adapterTargetAssetId: string;
  readonly adapterTargetVertexCount: 468;
  readonly adapterRegionCount: number;
  readonly adapterMembershipEdgeCount: number;
}

export interface Mesh6FProspectiveSweepAcquisitionRecordV1 {
  readonly schemaVersion: 'mesh6f-prospective-sweep-acquisition-record-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof MESH6F_PROSPECTIVE_SWEEP_ACQUISITION_RECORD_ID;
  readonly authorityState: 'prospective_admitted_mesh6d_observation_record_only_no_calibration_adjudication';
  readonly prospectiveCollectionRef: string;
  readonly captureSeriesRef: string;
  readonly sweepRef: string;
  readonly captureConditionRef: string;
  readonly sweepSequenceIndex: number;
  readonly prospectiveEligibilityState: 'mesh6e_attestations_accepted_not_independently_verified';
  readonly source: {
    readonly mesh6EManifestSchemaVersion: 'mesh6e-prospective-real-capture-sweep-manifest-v1';
    readonly mesh6DRuntimeSchemaVersion: 'mesh6d-multi-frame-pose-sweep-evidence-v1';
    readonly mesh6DConstructedInsideAcquisitionBoundary: true;
    readonly externalPrebuiltMesh6DArtifactAccepted: false;
    readonly primaryEvidenceCoverage: 'mesh6e_preregistered_thirteen_field_set_only';
    readonly mesh6EFreshnessAttestationMeansIndependentFreshnessProof: false;
    readonly mesh6ESameParticipantAttestationMeansIdentityProof: false;
  };
  readonly linkageAttestation: {
    readonly mesh6DInputCorrespondsToManifestSweepAttested: true;
    readonly attestationMeansIndependentCaptureRuntimeProof: false;
  };
  readonly provenance: Mesh6FSourceProvenanceV1;
  readonly evidenceObservations: readonly Mesh6FEvidenceObservationV1[];
  readonly authorityBoundary: {
    readonly observationRecordMeansEmpiricalRepeatabilityEstablished: false;
    readonly observationRecordMeansCaptureQualityValidated: false;
    readonly observationRecordMeansPoseAcceptanceValidated: false;
    readonly observationRecordMeansConstructValidity: false;
    readonly captureSeriesRefMeansIdentityMatch: false;
    readonly identityMatchingPerformed: false;
    readonly biometricTemplateIssued: false;
    readonly classificationIssued: false;
    readonly calibrationIssued: false;
    readonly thresholdIssued: false;
    readonly productionMorphologyAuthorized: false;
    readonly anatomicalMeasurementClaimed: false;
  };
  readonly traditionalSemanticAuthority: false;
}

export interface Mesh6FSeriesConditionSummaryV1 {
  readonly prospectiveCollectionRef: string;
  readonly captureSeriesRef: string;
  readonly captureConditionRef: string;
  readonly sweepCount: number;
  readonly sweepSequenceIndices: readonly number[];
  readonly evidenceSummaries: readonly Mesh6EProspectiveDescriptiveEvidenceSummaryV1[];
  readonly evaluationState: 'descriptive_series_condition_summary_only';
  readonly repeatabilityPassFailIssued: false;
  readonly captureSensitivityPassFailIssued: false;
  readonly poseAcceptancePassFailIssued: false;
  readonly identityComparisonIssued: false;
  readonly productionAdmissionIssued: false;
}

export interface Mesh6FProspectiveSweepAcquisitionDatasetV1 {
  readonly schemaVersion: 'mesh6f-prospective-sweep-acquisition-dataset-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof MESH6F_PROSPECTIVE_SWEEP_ACQUISITION_RECORD_ID;
  readonly authorityState: 'prospective_mesh6d_observation_dataset_descriptive_only';
  readonly prospectiveCollectionRef: string;
  readonly provenance: Mesh6FSourceProvenanceV1;
  readonly sweepRecords: readonly Mesh6FProspectiveSweepAcquisitionRecordV1[];
  readonly seriesConditionSummaries: readonly Mesh6FSeriesConditionSummaryV1[];
  readonly observedSweepCount: number;
  readonly observedCaptureSeriesCount: number;
  readonly observedCaptureConditionCount: number;
  readonly execution: {
    readonly empiricalRepeatabilityEstablished: false;
    readonly captureQualityValidated: false;
    readonly poseAcceptanceValidated: false;
    readonly captureQualityMeasurementConstructValidated: false;
    readonly populationNormDefined: false;
    readonly numericMorphologyRepeatabilityAcceptanceThreshold: null;
    readonly numericCaptureQualityThreshold: null;
    readonly numericPoseAcceptanceThreshold: null;
    readonly confidenceThreshold: null;
    readonly productionMorphologyAuthorized: false;
  };
  readonly authorityBoundary: {
    readonly datasetMaterializationMeansEmpiricalRepeatabilityEstablished: false;
    readonly descriptiveSeriesSummaryMeansRepeatabilityPass: false;
    readonly descriptiveConditionSummaryMeansCaptureQualityValidated: false;
    readonly descriptivePoseSummaryMeansPoseAcceptanceValidated: false;
    readonly betweenSeriesIdentityInferenceAllowed: false;
    readonly sameDifferentParticipantClassificationAllowed: false;
    readonly calibrationIssued: false;
    readonly thresholdsIssued: false;
    readonly productionAdmissionIssued: false;
    readonly anatomicalMeasurementClaimed: false;
    readonly constructValidity: 'unresolved';
    readonly traditionalBinding: 'unresolved';
  };
  readonly privacyBoundary: {
    readonly rawImageStored: false;
    readonly rawVideoStored: false;
    readonly rawProviderResponseStored: false;
    readonly rawLandmarkSetStored: false;
    readonly derivedFullFaceMetricGeometryStored: false;
    readonly faceEmbeddingStored: false;
    readonly identityTemplateStored: false;
  };
  readonly verificationBoundary: {
    readonly syntheticOrRepositoryFixtureAllowedForMechanicsOnly: true;
    readonly verifierFixtureMeansEmpiricalFreshCaptureEvidence: false;
    readonly verifierFixtureMeansRepeatabilityEstablished: false;
    readonly verifierFixtureMeansCaptureQualityValidated: false;
    readonly verifierFixtureMeansProductionAdmissionCalibrated: false;
  };
  readonly traditionalSemanticAuthority: false;
  readonly nextFrontier: typeof MESH6F_NEXT_FRONTIER;
}

const RECORD_ISSUED = new WeakSet<object>();
const DATASET_ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`MESH6F ${message}`);
}

function validateMesh6DEvidence(evidence: Mesh6DMultiFramePoseSweepEvidenceV1): void {
  if (
    evidence.schemaVersion !== 'mesh6d-multi-frame-pose-sweep-evidence-v1'
    || evidence.artifactVersion !== '0.1.0'
    || evidence.authorityState !== 'threshold_free_multi_frame_pose_morphology_evidence_only'
    || evidence.source.coordinateFrame !== 'canonical_aligned_right_handed_metric_3d'
    || evidence.source.unit !== 'centimeter'
    || evidence.morphologyRepeatability.schemaVersion !== 'mesh6c-repeatability-summary-v1'
    || evidence.morphologyRepeatability.authorityState !== 'threshold_free_repeatability_evidence_only'
    || evidence.authorityBoundary.poseThresholdDefined !== false
    || evidence.authorityBoundary.frontalClassificationIssued !== false
    || evidence.authorityBoundary.threeQuarterClassificationIssued !== false
    || evidence.authorityBoundary.profileClassificationIssued !== false
    || evidence.authorityBoundary.acceptablePoseRangeDefined !== false
    || evidence.authorityBoundary.captureQualityPassFailIssued !== false
    || evidence.authorityBoundary.confidenceScoreIssued !== false
    || evidence.authorityBoundary.productionMorphologyAuthorized !== false
    || evidence.authorityBoundary.anatomicalMeasurementClaimed !== false
    || evidence.authorityBoundary.beautyInterpretationIssued !== false
    || evidence.authorityBoundary.traditionalPhysiognomyInterpretationIssued !== false
    || evidence.authorityBoundary.claimsIssued !== 0
    || evidence.unresolvedCaptureFactors.expressionNeutrality !== 'not_verified'
    || evidence.unresolvedCaptureFactors.occlusionValidity !== 'not_verified'
    || evidence.unresolvedCaptureFactors.realWorldRepeatabilityThreshold !== 'not_defined'
    || Object.values(evidence.persistencePolicy).some((value) => value !== false)
  ) fail('internally constructed MESH6D evidence authority boundary drift.');
}

function evidenceValue(
  evidence: Mesh6DMultiFramePoseSweepEvidenceV1,
  field: Mesh6EPrimaryEvidenceField,
): number {
  switch (field) {
    case 'poseSweep.lateralOrientationRadians.span':
      return evidence.poseSweep.lateralOrientationRadians.span;
    case 'poseSweep.verticalOrientationRadians.span':
      return evidence.poseSweep.verticalOrientationRadians.span;
    case 'poseSweep.relativeRotationFromFirstFrameRadians.max':
      return evidence.poseSweep.relativeRotationFromFirstFrameRadians.max;
    case 'morphologyRepeatability.observables.zygomaticSpanRatio.mad':
      return evidence.morphologyRepeatability.observables.zygomaticSpanRatio.mad;
    case 'morphologyRepeatability.observables.zygomaticSpanRatio.robustSpanP10P90':
      return evidence.morphologyRepeatability.observables.zygomaticSpanRatio.robustSpanP10P90;
    case 'morphologyRepeatability.observables.zygomaticTemporalFlareRatio.mad':
      return evidence.morphologyRepeatability.observables.zygomaticTemporalFlareRatio.mad;
    case 'morphologyRepeatability.observables.zygomaticTemporalFlareRatio.robustSpanP10P90':
      return evidence.morphologyRepeatability.observables.zygomaticTemporalFlareRatio.robustSpanP10P90;
    case 'morphologyRepeatability.observables.zygomaticCheekLateralReliefRatio.mad':
      return evidence.morphologyRepeatability.observables.zygomaticCheekLateralReliefRatio.mad;
    case 'morphologyRepeatability.observables.zygomaticCheekLateralReliefRatio.robustSpanP10P90':
      return evidence.morphologyRepeatability.observables.zygomaticCheekLateralReliefRatio.robustSpanP10P90;
    case 'morphologyRepeatability.observables.bilateralZygomaticAsymmetryRatio.mad':
      return evidence.morphologyRepeatability.observables.bilateralZygomaticAsymmetryRatio.mad;
    case 'morphologyRepeatability.observables.bilateralZygomaticAsymmetryRatio.robustSpanP10P90':
      return evidence.morphologyRepeatability.observables.bilateralZygomaticAsymmetryRatio.robustSpanP10P90;
    case 'morphologyRepeatability.observables.zygomaticRelativeDepthRatio.mad':
      return evidence.morphologyRepeatability.observables.zygomaticRelativeDepthRatio.mad;
    case 'morphologyRepeatability.observables.zygomaticRelativeDepthRatio.robustSpanP10P90':
      return evidence.morphologyRepeatability.observables.zygomaticRelativeDepthRatio.robustSpanP10P90;
  }
}

function copyEvidence(
  evidence: Mesh6DMultiFramePoseSweepEvidenceV1,
  field: Mesh6EPrimaryEvidenceField,
): Mesh6FEvidenceObservationV1 {
  const value = evidenceValue(evidence, field);
  if (!Number.isFinite(value)) fail(`MESH6D evidence field ${field} must be finite.`);
  return Object.freeze({
    evidenceField: field,
    value,
    sourceSchemaVersion: evidence.schemaVersion,
    classificationApplied: false as const,
    calibrationApplied: false as const,
    thresholdApplied: false as const,
    productionAdmissionApplied: false as const,
    identityMatchingApplied: false as const,
    traditionalBindingApplied: false as const,
  });
}

function provenanceFrom(evidence: Mesh6DMultiFramePoseSweepEvidenceV1): Mesh6FSourceProvenanceV1 {
  return Object.freeze({
    coordinateFrame: evidence.source.coordinateFrame,
    unit: evidence.source.unit,
    canonicalAssetDigest: evidence.source.canonicalAssetDigest,
    releaseCommit: evidence.source.releaseCommit,
    geometryMetadataBlobSha: evidence.source.geometryMetadataBlobSha,
    adapterSchemaVersion: evidence.adapterIdentity.schemaVersion,
    adapterSourceAssetId: evidence.adapterIdentity.sourceAssetId,
    adapterTargetAssetId: evidence.adapterIdentity.targetAssetId,
    adapterTargetVertexCount: evidence.adapterIdentity.targetVertexCount,
    adapterRegionCount: evidence.adapterIdentity.regionCount,
    adapterMembershipEdgeCount: evidence.adapterIdentity.membershipEdgeCount,
  });
}

function sameProvenance(left: Mesh6FSourceProvenanceV1, right: Mesh6FSourceProvenanceV1): boolean {
  return (
    left.coordinateFrame === right.coordinateFrame
    && left.unit === right.unit
    && left.canonicalAssetDigest === right.canonicalAssetDigest
    && left.releaseCommit === right.releaseCommit
    && left.geometryMetadataBlobSha === right.geometryMetadataBlobSha
    && left.adapterSchemaVersion === right.adapterSchemaVersion
    && left.adapterSourceAssetId === right.adapterSourceAssetId
    && left.adapterTargetAssetId === right.adapterTargetAssetId
    && left.adapterTargetVertexCount === right.adapterTargetVertexCount
    && left.adapterRegionCount === right.adapterRegionCount
    && left.adapterMembershipEdgeCount === right.adapterMembershipEdgeCount
  );
}

function validateObservationSequence(record: Mesh6FProspectiveSweepAcquisitionRecordV1): void {
  if (record.evidenceObservations.length !== MESH6E_PRIMARY_EVIDENCE_FIELDS.length) {
    fail('acquisition record must contain the exact preregistered MESH6E evidence field count.');
  }
  for (let index = 0; index < MESH6E_PRIMARY_EVIDENCE_FIELDS.length; index += 1) {
    const expected = MESH6E_PRIMARY_EVIDENCE_FIELDS[index]!;
    const observation = record.evidenceObservations[index];
    if (
      observation === undefined
      || observation.evidenceField !== expected
      || !Number.isFinite(observation.value)
      || observation.sourceSchemaVersion !== 'mesh6d-multi-frame-pose-sweep-evidence-v1'
      || observation.classificationApplied !== false
      || observation.calibrationApplied !== false
      || observation.thresholdApplied !== false
      || observation.productionAdmissionApplied !== false
      || observation.identityMatchingApplied !== false
      || observation.traditionalBindingApplied !== false
    ) fail(`acquisition record evidence sequence drift at index ${index}.`);
  }
}

function recordEvidenceValue(
  record: Mesh6FProspectiveSweepAcquisitionRecordV1,
  field: Mesh6EPrimaryEvidenceField,
): number {
  const matches = record.evidenceObservations.filter((item) => item.evidenceField === field);
  if (matches.length !== 1) fail(`record requires exactly one observation for ${field}.`);
  return matches[0]!.value;
}

export function getMesh6FProspectiveAcquisitionContract() {
  return Object.freeze({
    schemaVersion: 'mesh6f-prospective-sweep-acquisition-contract-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: MESH6F_PROSPECTIVE_SWEEP_ACQUISITION_RECORD_ID,
    predecessor: Object.freeze({
      mesh6EAuthorityState: 'prospective_protocol_preregistered_no_fresh_capture_evidence_collected' as const,
      mesh6DInputRequired: true as const,
      issuedMesh6EManifestRequired: true as const,
      externalPrebuiltMesh6DArtifactAccepted: false as const,
      mesh6DConstructedInsideAcquisitionBoundary: true as const,
    }),
    acquisition: Object.freeze({
      primaryEvidenceFields: MESH6E_PRIMARY_EVIDENCE_FIELDS,
      mesh6DInputToManifestSweepLinkageAttestationRequired: true as const,
      linkageAttestationMeansIndependentProof: false as const,
      mesh6EFreshnessAttestationMeansIndependentlyVerifiedFreshCapture: false as const,
      mesh6ESameParticipantAttestationMeansIndependentlyVerifiedIdentity: false as const,
      prospectiveCollectionMustBeSingleWithinMaterializedDataset: true as const,
      sourceProvenanceMustBeSingleWithinMaterializedDataset: true as const,
      duplicateSweepRefAllowed: false as const,
      duplicateSweepSequenceIndexWithinSeriesAllowed: false as const,
      empiricalFreshCaptureRecordsBundledAtDefinitionTime: 0 as const,
    }),
    descriptiveAnalysis: Object.freeze({
      grouping: 'capture_series_and_capture_condition' as const,
      statistics: Object.freeze(['count', 'min', 'max', 'mean', 'range'] as const),
      repeatabilityPassFailIssued: false as const,
      captureSensitivityPassFailIssued: false as const,
      poseAcceptancePassFailIssued: false as const,
      betweenSeriesIdentityInferenceAllowed: false as const,
      numericMorphologyRepeatabilityAcceptanceThreshold: null,
      numericCaptureQualityThreshold: null,
      numericPoseAcceptanceThreshold: null,
      confidenceThreshold: null,
    }),
    verificationBoundary: Object.freeze({
      syntheticOrRepositoryFixtureAllowedForMechanicsOnly: true as const,
      verifierFixtureMeansEmpiricalFreshCaptureEvidence: false as const,
      verifierFixtureMeansRepeatabilityEstablished: false as const,
      verifierFixtureMeansCaptureQualityValidated: false as const,
      verifierFixtureMeansProductionAdmissionCalibrated: false as const,
    }),
    privacyBoundary: Object.freeze({
      rawImageStoredByArtifact: false as const,
      rawVideoStoredByArtifact: false as const,
      rawProviderResponseStoredByArtifact: false as const,
      rawLandmarkSetStoredByArtifact: false as const,
      derivedFullFaceMetricGeometryStoredByArtifact: false as const,
      faceEmbeddingStoredByArtifact: false as const,
      identityTemplateStoredByArtifact: false as const,
    }),
    authorityBoundary: Object.freeze({
      acquisitionRecordMeansEmpiricalRepeatabilityEstablished: false as const,
      descriptiveDatasetMeansCaptureQualityValidated: false as const,
      descriptivePoseSummaryMeansPoseAcceptanceValidated: false as const,
      sameParticipantSeriesGroupingMeansIdentityMatching: false as const,
      classificationIssued: false as const,
      calibrationIssued: false as const,
      thresholdsIssued: false as const,
      productionMorphologyAuthorized: false as const,
      anatomicalMeasurementClaimed: false as const,
      constructValidity: 'unresolved' as const,
      traditionalBinding: 'unresolved' as const,
      traditionalSemanticAuthority: false as const,
    }),
    nextFrontier: MESH6F_NEXT_FRONTIER,
  });
}

export function recordMesh6FProspectiveSweepAcquisition(
  input: Mesh6FProspectiveSweepAcquisitionInputV1,
): Mesh6FProspectiveSweepAcquisitionRecordV1 {
  assertIssuedMesh6EProspectiveSweepManifest(input.manifest);
  if (input.mesh6DInputCorrespondsToManifestSweepAttested !== true) {
    fail('record admission requires explicit attestation that the MESH6D input corresponds to the MESH6E manifest sweep.');
  }
  const evidence = buildMesh6DMultiFramePoseSweepEvidence(input.mesh6DInput);
  validateMesh6DEvidence(evidence);
  const result: Mesh6FProspectiveSweepAcquisitionRecordV1 = Object.freeze({
    schemaVersion: 'mesh6f-prospective-sweep-acquisition-record-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: MESH6F_PROSPECTIVE_SWEEP_ACQUISITION_RECORD_ID,
    authorityState: 'prospective_admitted_mesh6d_observation_record_only_no_calibration_adjudication' as const,
    prospectiveCollectionRef: input.manifest.prospectiveCollectionRef,
    captureSeriesRef: input.manifest.captureSeriesRef,
    sweepRef: input.manifest.sweepRef,
    captureConditionRef: input.manifest.captureConditionRef,
    sweepSequenceIndex: input.manifest.sweepSequenceIndex,
    prospectiveEligibilityState: 'mesh6e_attestations_accepted_not_independently_verified' as const,
    source: Object.freeze({
      mesh6EManifestSchemaVersion: input.manifest.schemaVersion,
      mesh6DRuntimeSchemaVersion: evidence.schemaVersion,
      mesh6DConstructedInsideAcquisitionBoundary: true as const,
      externalPrebuiltMesh6DArtifactAccepted: false as const,
      primaryEvidenceCoverage: 'mesh6e_preregistered_thirteen_field_set_only' as const,
      mesh6EFreshnessAttestationMeansIndependentFreshnessProof: false as const,
      mesh6ESameParticipantAttestationMeansIdentityProof: false as const,
    }),
    linkageAttestation: Object.freeze({
      mesh6DInputCorrespondsToManifestSweepAttested: true as const,
      attestationMeansIndependentCaptureRuntimeProof: false as const,
    }),
    provenance: provenanceFrom(evidence),
    evidenceObservations: Object.freeze(
      MESH6E_PRIMARY_EVIDENCE_FIELDS.map((field) => copyEvidence(evidence, field)),
    ),
    authorityBoundary: Object.freeze({
      observationRecordMeansEmpiricalRepeatabilityEstablished: false as const,
      observationRecordMeansCaptureQualityValidated: false as const,
      observationRecordMeansPoseAcceptanceValidated: false as const,
      observationRecordMeansConstructValidity: false as const,
      captureSeriesRefMeansIdentityMatch: false as const,
      identityMatchingPerformed: false as const,
      biometricTemplateIssued: false as const,
      classificationIssued: false as const,
      calibrationIssued: false as const,
      thresholdIssued: false as const,
      productionMorphologyAuthorized: false as const,
      anatomicalMeasurementClaimed: false as const,
    }),
    traditionalSemanticAuthority: false as const,
  });
  RECORD_ISSUED.add(result);
  return result;
}

export function assertIssuedMesh6FProspectiveSweepAcquisitionRecord(
  record: Mesh6FProspectiveSweepAcquisitionRecordV1,
): void {
  if (!RECORD_ISSUED.has(record)) fail('acquisition record was not issued by the active MESH6F boundary.');
  if (
    record.schemaVersion !== 'mesh6f-prospective-sweep-acquisition-record-v1'
    || record.artifactVersion !== '0.1.0'
    || record.authorityState !== 'prospective_admitted_mesh6d_observation_record_only_no_calibration_adjudication'
    || record.prospectiveEligibilityState !== 'mesh6e_attestations_accepted_not_independently_verified'
    || record.source.mesh6DConstructedInsideAcquisitionBoundary !== true
    || record.source.externalPrebuiltMesh6DArtifactAccepted !== false
    || record.source.mesh6EFreshnessAttestationMeansIndependentFreshnessProof !== false
    || record.source.mesh6ESameParticipantAttestationMeansIdentityProof !== false
    || record.linkageAttestation.mesh6DInputCorrespondsToManifestSweepAttested !== true
    || record.linkageAttestation.attestationMeansIndependentCaptureRuntimeProof !== false
    || record.authorityBoundary.observationRecordMeansEmpiricalRepeatabilityEstablished !== false
    || record.authorityBoundary.observationRecordMeansCaptureQualityValidated !== false
    || record.authorityBoundary.observationRecordMeansPoseAcceptanceValidated !== false
    || record.authorityBoundary.captureSeriesRefMeansIdentityMatch !== false
    || record.authorityBoundary.identityMatchingPerformed !== false
    || record.authorityBoundary.biometricTemplateIssued !== false
    || record.authorityBoundary.thresholdIssued !== false
    || record.authorityBoundary.productionMorphologyAuthorized !== false
    || record.authorityBoundary.anatomicalMeasurementClaimed !== false
    || record.traditionalSemanticAuthority !== false
  ) fail('issued MESH6F acquisition-record authority boundary drift.');
  validateObservationSequence(record);
}

export function materializeMesh6FProspectiveSweepAcquisitionDataset(
  records: readonly Mesh6FProspectiveSweepAcquisitionRecordV1[],
): Mesh6FProspectiveSweepAcquisitionDatasetV1 {
  if (records.length === 0) fail('dataset materialization requires at least one issued MESH6F acquisition record.');
  records.forEach(assertIssuedMesh6FProspectiveSweepAcquisitionRecord);

  const prospectiveCollectionRef = records[0]!.prospectiveCollectionRef;
  const provenance = records[0]!.provenance;
  if (records.some((record) => record.prospectiveCollectionRef !== prospectiveCollectionRef)) {
    fail('one materialized MESH6F dataset cannot mix prospectiveCollectionRef values.');
  }
  if (records.some((record) => !sameProvenance(record.provenance, provenance))) {
    fail('one materialized MESH6F dataset cannot mix MESH6D geometry/adapter provenance.');
  }

  const sweepRefs = new Set<string>();
  const sequenceKeys = new Set<string>();
  for (const record of records) {
    if (sweepRefs.has(record.sweepRef)) fail(`duplicate sweepRef ${record.sweepRef}.`);
    sweepRefs.add(record.sweepRef);
    const sequenceKey = JSON.stringify([record.captureSeriesRef, record.sweepSequenceIndex]);
    if (sequenceKeys.has(sequenceKey)) fail('duplicate sweepSequenceIndex within one captureSeriesRef.');
    sequenceKeys.add(sequenceKey);
  }

  const groups = new Map<string, Mesh6FProspectiveSweepAcquisitionRecordV1[]>();
  for (const record of records) {
    const key = JSON.stringify([record.captureSeriesRef, record.captureConditionRef]);
    const group = groups.get(key) ?? [];
    group.push(record);
    groups.set(key, group);
  }

  const seriesConditionSummaries: Mesh6FSeriesConditionSummaryV1[] = [...groups.values()].map((group) => {
    const first = group[0]!;
    return Object.freeze({
      prospectiveCollectionRef,
      captureSeriesRef: first.captureSeriesRef,
      captureConditionRef: first.captureConditionRef,
      sweepCount: group.length,
      sweepSequenceIndices: Object.freeze(group.map((record) => record.sweepSequenceIndex).sort((left, right) => left - right)),
      evidenceSummaries: Object.freeze(
        MESH6E_PRIMARY_EVIDENCE_FIELDS.map((field) =>
          summarizeMesh6EProspectiveEvidenceValues(
            field,
            group.map((record) => recordEvidenceValue(record, field)),
          ),
        ),
      ),
      evaluationState: 'descriptive_series_condition_summary_only' as const,
      repeatabilityPassFailIssued: false as const,
      captureSensitivityPassFailIssued: false as const,
      poseAcceptancePassFailIssued: false as const,
      identityComparisonIssued: false as const,
      productionAdmissionIssued: false as const,
    });
  });

  const result: Mesh6FProspectiveSweepAcquisitionDatasetV1 = Object.freeze({
    schemaVersion: 'mesh6f-prospective-sweep-acquisition-dataset-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: MESH6F_PROSPECTIVE_SWEEP_ACQUISITION_RECORD_ID,
    authorityState: 'prospective_mesh6d_observation_dataset_descriptive_only' as const,
    prospectiveCollectionRef,
    provenance,
    sweepRecords: Object.freeze([...records]),
    seriesConditionSummaries: Object.freeze(seriesConditionSummaries),
    observedSweepCount: records.length,
    observedCaptureSeriesCount: new Set(records.map((record) => record.captureSeriesRef)).size,
    observedCaptureConditionCount: new Set(records.map((record) => record.captureConditionRef)).size,
    execution: Object.freeze({
      empiricalRepeatabilityEstablished: false as const,
      captureQualityValidated: false as const,
      poseAcceptanceValidated: false as const,
      captureQualityMeasurementConstructValidated: false as const,
      populationNormDefined: false as const,
      numericMorphologyRepeatabilityAcceptanceThreshold: null,
      numericCaptureQualityThreshold: null,
      numericPoseAcceptanceThreshold: null,
      confidenceThreshold: null,
      productionMorphologyAuthorized: false as const,
    }),
    authorityBoundary: Object.freeze({
      datasetMaterializationMeansEmpiricalRepeatabilityEstablished: false as const,
      descriptiveSeriesSummaryMeansRepeatabilityPass: false as const,
      descriptiveConditionSummaryMeansCaptureQualityValidated: false as const,
      descriptivePoseSummaryMeansPoseAcceptanceValidated: false as const,
      betweenSeriesIdentityInferenceAllowed: false as const,
      sameDifferentParticipantClassificationAllowed: false as const,
      calibrationIssued: false as const,
      thresholdsIssued: false as const,
      productionAdmissionIssued: false as const,
      anatomicalMeasurementClaimed: false as const,
      constructValidity: 'unresolved' as const,
      traditionalBinding: 'unresolved' as const,
    }),
    privacyBoundary: Object.freeze({
      rawImageStored: false as const,
      rawVideoStored: false as const,
      rawProviderResponseStored: false as const,
      rawLandmarkSetStored: false as const,
      derivedFullFaceMetricGeometryStored: false as const,
      faceEmbeddingStored: false as const,
      identityTemplateStored: false as const,
    }),
    verificationBoundary: Object.freeze({
      syntheticOrRepositoryFixtureAllowedForMechanicsOnly: true as const,
      verifierFixtureMeansEmpiricalFreshCaptureEvidence: false as const,
      verifierFixtureMeansRepeatabilityEstablished: false as const,
      verifierFixtureMeansCaptureQualityValidated: false as const,
      verifierFixtureMeansProductionAdmissionCalibrated: false as const,
    }),
    traditionalSemanticAuthority: false as const,
    nextFrontier: MESH6F_NEXT_FRONTIER,
  });
  DATASET_ISSUED.add(result);
  return result;
}

export function assertIssuedMesh6FProspectiveSweepAcquisitionDataset(
  dataset: Mesh6FProspectiveSweepAcquisitionDatasetV1,
): void {
  if (!DATASET_ISSUED.has(dataset)) fail('acquisition dataset was not issued by the active MESH6F boundary.');
  if (
    dataset.schemaVersion !== 'mesh6f-prospective-sweep-acquisition-dataset-v1'
    || dataset.artifactVersion !== '0.1.0'
    || dataset.authorityState !== 'prospective_mesh6d_observation_dataset_descriptive_only'
    || dataset.observedSweepCount !== dataset.sweepRecords.length
    || dataset.execution.empiricalRepeatabilityEstablished !== false
    || dataset.execution.captureQualityValidated !== false
    || dataset.execution.poseAcceptanceValidated !== false
    || dataset.execution.captureQualityMeasurementConstructValidated !== false
    || dataset.execution.populationNormDefined !== false
    || dataset.execution.numericMorphologyRepeatabilityAcceptanceThreshold !== null
    || dataset.execution.numericCaptureQualityThreshold !== null
    || dataset.execution.numericPoseAcceptanceThreshold !== null
    || dataset.execution.confidenceThreshold !== null
    || dataset.execution.productionMorphologyAuthorized !== false
    || dataset.authorityBoundary.datasetMaterializationMeansEmpiricalRepeatabilityEstablished !== false
    || dataset.authorityBoundary.descriptiveSeriesSummaryMeansRepeatabilityPass !== false
    || dataset.authorityBoundary.descriptiveConditionSummaryMeansCaptureQualityValidated !== false
    || dataset.authorityBoundary.descriptivePoseSummaryMeansPoseAcceptanceValidated !== false
    || dataset.authorityBoundary.betweenSeriesIdentityInferenceAllowed !== false
    || dataset.authorityBoundary.sameDifferentParticipantClassificationAllowed !== false
    || dataset.authorityBoundary.thresholdsIssued !== false
    || dataset.authorityBoundary.productionAdmissionIssued !== false
    || dataset.authorityBoundary.anatomicalMeasurementClaimed !== false
    || dataset.authorityBoundary.constructValidity !== 'unresolved'
    || dataset.authorityBoundary.traditionalBinding !== 'unresolved'
    || dataset.privacyBoundary.rawImageStored !== false
    || dataset.privacyBoundary.rawVideoStored !== false
    || dataset.privacyBoundary.rawLandmarkSetStored !== false
    || dataset.privacyBoundary.faceEmbeddingStored !== false
    || dataset.privacyBoundary.identityTemplateStored !== false
    || dataset.verificationBoundary.verifierFixtureMeansEmpiricalFreshCaptureEvidence !== false
    || dataset.verificationBoundary.verifierFixtureMeansRepeatabilityEstablished !== false
    || dataset.traditionalSemanticAuthority !== false
    || dataset.nextFrontier !== MESH6F_NEXT_FRONTIER
  ) fail('issued MESH6F acquisition-dataset authority boundary drift.');
  dataset.sweepRecords.forEach(assertIssuedMesh6FProspectiveSweepAcquisitionRecord);
}
