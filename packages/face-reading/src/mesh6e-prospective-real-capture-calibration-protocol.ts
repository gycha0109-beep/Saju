import { FaceAuthorityValidationError } from './validation.js';

export const MESH6E_PROSPECTIVE_CALIBRATION_PROTOCOL_RECORD_ID =
  'research.face_geometry.zygomatic.prospective_real_capture_sweep_calibration.mesh6e' as const;
export const MESH6E_NEXT_FRONTIER =
  'bind_issued_mesh6d_evidence_to_admitted_mesh6e_sweep_manifests_and_materialize_descriptive_fresh_capture_datasets_without_threshold_or_production_promotion' as const;

export const MESH6E_PRIMARY_EVIDENCE_FIELDS = Object.freeze([
  'poseSweep.lateralOrientationRadians.span',
  'poseSweep.verticalOrientationRadians.span',
  'poseSweep.relativeRotationFromFirstFrameRadians.max',
  'morphologyRepeatability.observables.zygomaticSpanRatio.mad',
  'morphologyRepeatability.observables.zygomaticSpanRatio.robustSpanP10P90',
  'morphologyRepeatability.observables.zygomaticTemporalFlareRatio.mad',
  'morphologyRepeatability.observables.zygomaticTemporalFlareRatio.robustSpanP10P90',
  'morphologyRepeatability.observables.zygomaticCheekLateralReliefRatio.mad',
  'morphologyRepeatability.observables.zygomaticCheekLateralReliefRatio.robustSpanP10P90',
  'morphologyRepeatability.observables.bilateralZygomaticAsymmetryRatio.mad',
  'morphologyRepeatability.observables.bilateralZygomaticAsymmetryRatio.robustSpanP10P90',
  'morphologyRepeatability.observables.zygomaticRelativeDepthRatio.mad',
  'morphologyRepeatability.observables.zygomaticRelativeDepthRatio.robustSpanP10P90',
] as const);

export type Mesh6EPrimaryEvidenceField = (typeof MESH6E_PRIMARY_EVIDENCE_FIELDS)[number];

export interface Mesh6EProspectiveSweepManifestInputV1 {
  readonly prospectiveCollectionRef: string;
  readonly captureSeriesRef: string;
  readonly sweepRef: string;
  readonly captureConditionRef: string;
  readonly sweepSequenceIndex: number;
  readonly postPreregistrationFreshCaptureAttested: boolean;
  readonly sameParticipantSeriesAttested: boolean;
  readonly usedForCandidateSelection: boolean;
  readonly developmentCaptureReuse: boolean;
  readonly identityMatchingPerformed: boolean;
}

export interface Mesh6EProspectiveSweepManifestV1 {
  readonly schemaVersion: 'mesh6e-prospective-real-capture-sweep-manifest-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof MESH6E_PROSPECTIVE_CALIBRATION_PROTOCOL_RECORD_ID;
  readonly authorityState: 'prospective_sweep_manifest_only_no_empirical_calibration';
  readonly prospectiveCollectionRef: string;
  readonly captureSeriesRef: string;
  readonly sweepRef: string;
  readonly captureConditionRef: string;
  readonly sweepSequenceIndex: number;
  readonly eligibilityAttestation: {
    readonly postPreregistrationFreshCaptureAttested: true;
    readonly sameParticipantSeriesAttested: true;
    readonly usedForCandidateSelection: false;
    readonly developmentCaptureReuse: false;
    readonly identityMatchingPerformed: false;
  };
  readonly identityBoundary: {
    readonly captureSeriesRefIsProtocolLocalGroupingOnly: true;
    readonly captureSeriesRefMeansIdentityMatch: false;
    readonly externalIdentityResolutionAllowed: false;
    readonly biometricTemplateIssued: false;
  };
  readonly calibrationBoundary: {
    readonly manifestMeansFreshCaptureIndependentlyVerified: false;
    readonly manifestMeansRepeatabilityEstablished: false;
    readonly manifestMeansCaptureQualityValidated: false;
    readonly manifestMeansProductionAdmission: false;
  };
  readonly traditionalSemanticAuthority: false;
}

export interface Mesh6EProspectiveDescriptiveEvidenceSummaryV1 {
  readonly evidenceField: Mesh6EPrimaryEvidenceField;
  readonly count: number;
  readonly min: number;
  readonly max: number;
  readonly mean: number;
  readonly range: number;
  readonly evaluationState: 'descriptive_only_no_calibration_adjudication';
  readonly repeatabilityPassFailIssued: false;
  readonly captureSensitivityPassFailIssued: false;
  readonly poseAcceptanceApplied: false;
  readonly captureQualityThresholdApplied: false;
  readonly calibrationApplied: false;
  readonly productionAdmissionApplied: false;
  readonly traditionalBindingApplied: false;
}

const MANIFEST_ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`MESH6E ${message}`);
}

function requireOpaqueRef(label: string, value: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    fail(`${label} must be a non-empty protocol-local opaque reference.`);
  }
  return value;
}

function requirePrimaryEvidenceField(field: string): Mesh6EPrimaryEvidenceField {
  for (const candidate of MESH6E_PRIMARY_EVIDENCE_FIELDS) {
    if (candidate === field) return candidate;
  }
  fail(`unsupported preregistered evidence field ${field}.`);
}

export function getMesh6EProspectiveCalibrationProtocol() {
  return Object.freeze({
    schemaVersion: 'mesh6e-prospective-real-capture-calibration-protocol-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: MESH6E_PROSPECTIVE_CALIBRATION_PROTOCOL_RECORD_ID,
    authorityState: 'prospective_protocol_preregistered_no_fresh_capture_evidence_collected' as const,
    predecessor: Object.freeze({
      requiredMesh6DSchemaVersion: 'mesh6d-multi-frame-pose-sweep-evidence-v1' as const,
      requiredMesh6DArtifactVersion: '0.1.0' as const,
      requiredMesh6DAuthorityState: 'threshold_free_multi_frame_pose_morphology_evidence_only' as const,
      requiredCoordinateFrame: 'canonical_aligned_right_handed_metric_3d' as const,
      requiredUnit: 'centimeter' as const,
      realRepeatedCaptureEvidenceRequiredBeforeAcceptableRangeOrProductionAdmission: true as const,
      mesh6DThresholdsIssued: false as const,
      mesh6DProductionMorphologyAuthorized: false as const,
    }),
    preregistration: Object.freeze({
      state: 'primary_evidence_fields_frozen_before_prospective_collection' as const,
      primaryEvidenceFields: MESH6E_PRIMARY_EVIDENCE_FIELDS,
      primaryEvidenceFieldCount: MESH6E_PRIMARY_EVIDENCE_FIELDS.length,
      candidateSelectionFrozenBeforeProspectiveCapture: true as const,
      currentDevelopmentCapturesEligible: false as const,
      retrospectiveDevelopmentCapturePromotionAllowed: false as const,
      postPreregistrationFreshCaptureRequired: true as const,
      numericMorphologyRepeatabilityAcceptanceThreshold: null,
      numericCaptureQualityThreshold: null,
      numericPoseAcceptanceThreshold: null,
      confidenceThreshold: null,
      productionAdmissionPolicyRef: null,
      traditionalCriterionBindingRef: null,
    }),
    acquisition: Object.freeze({
      acquisitionUnit: 'same_participant_repeated_fresh_multi_frame_pose_sweep_series' as const,
      sweepManifestRequired: true as const,
      sameParticipantSeriesAttestationRequired: true as const,
      captureConditionStratumRefRequired: true as const,
      sweepSequenceIndexRequired: true as const,
      repeatedSweepSeriesRequiredForFutureCalibration: true as const,
      minimumSweepCountForRepeatabilityAdjudication: null,
      minimumConditionCountForCaptureSensitivityAdjudication: null,
      sweepCountPerSeries: null,
      seriesCount: null,
      participantCount: null,
      conditionVocabulary: null,
      conditionThresholds: null,
    }),
    descriptiveAnalysis: Object.freeze({
      primaryEvidenceStatisticsAllowed: Object.freeze(['count', 'min', 'max', 'mean', 'range'] as const),
      repeatabilityPassFailIssued: false as const,
      captureSensitivityPassFailIssued: false as const,
      poseAcceptancePassFailIssued: false as const,
      captureQualityScoreIssued: false as const,
      confidenceScoreIssued: false as const,
      populationNormDefined: false as const,
      inferentialValidationClaimIssued: false as const,
      descriptiveStatisticMeansRepeatabilityEstablished: false as const,
      descriptiveStatisticMeansCaptureQualityValidated: false as const,
      descriptiveStatisticMeansProductionReady: false as const,
    }),
    verificationBoundary: Object.freeze({
      syntheticVerifierValuesAllowedForMechanicsOnly: true as const,
      verifierValuesMeanEmpiricalFreshCaptureEvidence: false as const,
      verifierValuesMeanRepeatabilityEstablished: false as const,
      verifierValuesMeanCaptureQualityValidated: false as const,
      verifierValuesMeanProductionAdmissionCalibrated: false as const,
    }),
    privacyBoundary: Object.freeze({
      rawImageStoredByProtocolArtifact: false as const,
      rawVideoStoredByProtocolArtifact: false as const,
      rawProviderResponseStoredByProtocolArtifact: false as const,
      rawLandmarkSetStoredByProtocolArtifact: false as const,
      derivedFullFaceMetricGeometryStoredByProtocolArtifact: false as const,
      faceEmbeddingStoredByProtocolArtifact: false as const,
      identityTemplateStoredByProtocolArtifact: false as const,
      externalIdentityStoredByProtocolArtifact: false as const,
      captureSeriesRefMustBeProtocolLocalOpaqueReference: true as const,
      captureSeriesRefClaimedAnonymous: false as const,
    }),
    authorityBoundary: Object.freeze({
      protocolDefinitionMeansFreshCaptureEvidenceCollected: false as const,
      freshnessAttestationMeansIndependentFreshnessProof: false as const,
      sameParticipantSeriesAttestationMeansIdentityMatching: false as const,
      repeatSweepGroupingMeansBiometricTemplate: false as const,
      descriptiveRepeatabilityMeansEmpiricalRepeatabilityEstablished: false as const,
      descriptiveCaptureSensitivityMeansCaptureQualityValidated: false as const,
      captureConditionRefMeansValidatedCaptureQualityConstruct: false as const,
      frontalClassificationIssued: false as const,
      threeQuarterClassificationIssued: false as const,
      profileClassificationIssued: false as const,
      physicalAnthropometricInterpretationAllowed: false as const,
      classificationIssued: false as const,
      calibrationIssued: false as const,
      thresholdsIssued: false as const,
      productionMorphologyAuthorized: false as const,
      anatomicalMeasurementClaimed: false as const,
      criterionStatesIssued: 0 as const,
      structuredClaimsIssued: 0 as const,
      boundedNarrativesIssued: 0 as const,
      traditionalBinding: 'unresolved' as const,
      constructValidity: 'unresolved' as const,
    }),
    execution: Object.freeze({
      protocolArtifactImplemented: true as const,
      empiricalFreshCaptureRecordsBundledAtDefinitionTime: 0 as const,
      empiricalRepeatabilityEstablished: false as const,
      captureQualityValidated: false as const,
      captureQualityMeasurementConstructValidated: false as const,
      numericMorphologyRepeatabilityAcceptanceThreshold: null,
      numericCaptureQualityThreshold: null,
      numericPoseAcceptanceThreshold: null,
      confidenceThreshold: null,
      productionMorphologyAuthorized: false as const,
      traditionalSemanticAuthority: false as const,
    }),
    nextFrontier: MESH6E_NEXT_FRONTIER,
  });
}

export function admitMesh6EProspectiveSweepManifest(
  input: Mesh6EProspectiveSweepManifestInputV1,
): Mesh6EProspectiveSweepManifestV1 {
  const prospectiveCollectionRef = requireOpaqueRef('prospectiveCollectionRef', input.prospectiveCollectionRef);
  const captureSeriesRef = requireOpaqueRef('captureSeriesRef', input.captureSeriesRef);
  const sweepRef = requireOpaqueRef('sweepRef', input.sweepRef);
  const captureConditionRef = requireOpaqueRef('captureConditionRef', input.captureConditionRef);
  if (!Number.isSafeInteger(input.sweepSequenceIndex) || input.sweepSequenceIndex < 1) {
    fail('sweepSequenceIndex must be a positive safe integer within its protocol-local series.');
  }
  if (input.postPreregistrationFreshCaptureAttested !== true) {
    fail('prospective admission requires an explicit post-preregistration fresh-capture attestation.');
  }
  if (input.sameParticipantSeriesAttested !== true) {
    fail('prospective repeatability admission requires same-participant series attestation.');
  }
  if (input.usedForCandidateSelection !== false) {
    fail('a sweep used for candidate selection cannot be admitted as prospective calibration evidence.');
  }
  if (input.developmentCaptureReuse !== false) {
    fail('development captures cannot be reused or retroactively promoted into MESH6E prospective evidence.');
  }
  if (input.identityMatchingPerformed !== false) {
    fail('identity matching is outside the MESH6E prospective calibration authority boundary.');
  }

  const result: Mesh6EProspectiveSweepManifestV1 = Object.freeze({
    schemaVersion: 'mesh6e-prospective-real-capture-sweep-manifest-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: MESH6E_PROSPECTIVE_CALIBRATION_PROTOCOL_RECORD_ID,
    authorityState: 'prospective_sweep_manifest_only_no_empirical_calibration' as const,
    prospectiveCollectionRef,
    captureSeriesRef,
    sweepRef,
    captureConditionRef,
    sweepSequenceIndex: input.sweepSequenceIndex,
    eligibilityAttestation: Object.freeze({
      postPreregistrationFreshCaptureAttested: true as const,
      sameParticipantSeriesAttested: true as const,
      usedForCandidateSelection: false as const,
      developmentCaptureReuse: false as const,
      identityMatchingPerformed: false as const,
    }),
    identityBoundary: Object.freeze({
      captureSeriesRefIsProtocolLocalGroupingOnly: true as const,
      captureSeriesRefMeansIdentityMatch: false as const,
      externalIdentityResolutionAllowed: false as const,
      biometricTemplateIssued: false as const,
    }),
    calibrationBoundary: Object.freeze({
      manifestMeansFreshCaptureIndependentlyVerified: false as const,
      manifestMeansRepeatabilityEstablished: false as const,
      manifestMeansCaptureQualityValidated: false as const,
      manifestMeansProductionAdmission: false as const,
    }),
    traditionalSemanticAuthority: false as const,
  });
  MANIFEST_ISSUED.add(result);
  return result;
}

export function assertIssuedMesh6EProspectiveSweepManifest(
  manifest: Mesh6EProspectiveSweepManifestV1,
): void {
  if (!MANIFEST_ISSUED.has(manifest)) fail('sweep manifest was not issued by the active MESH6E admission boundary.');
  if (
    manifest.schemaVersion !== 'mesh6e-prospective-real-capture-sweep-manifest-v1'
    || manifest.artifactVersion !== '0.1.0'
    || manifest.authorityState !== 'prospective_sweep_manifest_only_no_empirical_calibration'
    || manifest.eligibilityAttestation.postPreregistrationFreshCaptureAttested !== true
    || manifest.eligibilityAttestation.sameParticipantSeriesAttested !== true
    || manifest.eligibilityAttestation.usedForCandidateSelection !== false
    || manifest.eligibilityAttestation.developmentCaptureReuse !== false
    || manifest.eligibilityAttestation.identityMatchingPerformed !== false
    || manifest.identityBoundary.captureSeriesRefMeansIdentityMatch !== false
    || manifest.identityBoundary.externalIdentityResolutionAllowed !== false
    || manifest.identityBoundary.biometricTemplateIssued !== false
    || manifest.calibrationBoundary.manifestMeansFreshCaptureIndependentlyVerified !== false
    || manifest.calibrationBoundary.manifestMeansRepeatabilityEstablished !== false
    || manifest.calibrationBoundary.manifestMeansCaptureQualityValidated !== false
    || manifest.calibrationBoundary.manifestMeansProductionAdmission !== false
    || manifest.traditionalSemanticAuthority !== false
  ) fail('issued prospective sweep-manifest authority boundary drift.');
}

export function summarizeMesh6EProspectiveEvidenceValues(
  evidenceField: Mesh6EPrimaryEvidenceField,
  values: readonly number[],
): Mesh6EProspectiveDescriptiveEvidenceSummaryV1 {
  const admittedField = requirePrimaryEvidenceField(evidenceField);
  if (values.length === 0) fail('descriptive summary requires at least one finite evidence value.');
  if (values.some((value) => !Number.isFinite(value))) {
    fail('descriptive summary evidence values must all be finite.');
  }
  const min = Math.min(...values);
  const max = Math.max(...values);
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  return Object.freeze({
    evidenceField: admittedField,
    count: values.length,
    min,
    max,
    mean,
    range: max - min,
    evaluationState: 'descriptive_only_no_calibration_adjudication' as const,
    repeatabilityPassFailIssued: false as const,
    captureSensitivityPassFailIssued: false as const,
    poseAcceptanceApplied: false as const,
    captureQualityThresholdApplied: false as const,
    calibrationApplied: false as const,
    productionAdmissionApplied: false as const,
    traditionalBindingApplied: false as const,
  });
}
