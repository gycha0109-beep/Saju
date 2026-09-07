import { FaceAuthorityValidationError } from './validation.js';

export const FR159_EYE_PAIR_PROSPECTIVE_REPEATABILITY_PROTOCOL_RECORD_ID =
  'research.face_reading.neutral.eye_pair.prospective_repeatability_capture_sensitivity.fr159' as const;
export const FR159_X_SPAN_METRIC_REF =
  'neutral.eye_pair.metric_3d.mean_cycle_x_span_to_full_mesh_x_span_ratio@0.1.0' as const;
export const FR159_PERIMETER_METRIC_REF =
  'neutral.eye_pair.metric_3d.mean_cycle_perimeter_to_full_mesh_x_span_ratio@0.1.0' as const;
export const FR159_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr159-eye-pair-prospective-repeatability-protocol.md' as const;
export const FR159_NEXT_FRONTIER =
  'collect_fresh_post_preregistration_eye_pair_repeat_capture_series_then_describe_repeatability_and_capture_condition_sensitivity_without_threshold_or_semantic_promotion' as const;

export type EyePairProspectivePrimaryMetricRefFR159V1 =
  | typeof FR159_X_SPAN_METRIC_REF
  | typeof FR159_PERIMETER_METRIC_REF;

export interface EyePairProspectiveCaptureManifestInputFR159V1 {
  readonly prospectiveCollectionRef: string;
  readonly captureSeriesRef: string;
  readonly captureRef: string;
  readonly captureConditionRef: string;
  readonly captureSequenceIndex: number;
  readonly postPreregistrationFreshCaptureAttested: boolean;
  readonly sameParticipantSeriesAttested: boolean;
  readonly usedForCandidateSelection: boolean;
  readonly developmentCaptureReuse: boolean;
  readonly identityMatchingPerformed: boolean;
}

export interface EyePairProspectiveCaptureManifestFR159V1 {
  readonly schemaVersion: 'fr159-eye-pair-prospective-capture-manifest-v1';
  readonly artifactVersion: '0.1.0';
  readonly recordId: typeof FR159_EYE_PAIR_PROSPECTIVE_REPEATABILITY_PROTOCOL_RECORD_ID;
  readonly authorityState: 'prospective_capture_manifest_only_no_empirical_validation';
  readonly prospectiveCollectionRef: string;
  readonly captureSeriesRef: string;
  readonly captureRef: string;
  readonly captureConditionRef: string;
  readonly captureSequenceIndex: number;
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
  readonly traditionalSemanticAuthority: false;
}

export interface EyePairProspectiveDescriptiveMetricSummaryFR159V1 {
  readonly metricRef: EyePairProspectivePrimaryMetricRefFR159V1;
  readonly unit: 'ratio';
  readonly count: number;
  readonly min: number;
  readonly max: number;
  readonly mean: number;
  readonly range: number;
  readonly evaluationState: 'descriptive_only_no_repeatability_adjudication';
  readonly classificationApplied: false;
  readonly calibrationApplied: false;
  readonly acceptanceThresholdApplied: false;
  readonly captureQualityThresholdApplied: false;
  readonly traditionalBindingApplied: false;
}

const MANIFEST_ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-159 ${message}`);
}

function requireOpaqueRef(label: string, value: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    fail(`${label} must be a non-empty protocol-local opaque reference.`);
  }
  return value;
}

function requirePrimaryMetricRef(metricRef: string): EyePairProspectivePrimaryMetricRefFR159V1 {
  if (metricRef === FR159_X_SPAN_METRIC_REF || metricRef === FR159_PERIMETER_METRIC_REF) return metricRef;
  fail(`unsupported prospective primary metric ref ${metricRef}.`);
}

export function getEyePairProspectiveRepeatabilityProtocolFR159() {
  return Object.freeze({
    schemaVersion: 'fr159-eye-pair-prospective-repeatability-protocol-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR159_EYE_PAIR_PROSPECTIVE_REPEATABILITY_PROTOCOL_RECORD_ID,
    authorityState: 'prospective_protocol_preregistered_no_fresh_capture_evidence_collected' as const,
    predecessor: Object.freeze({
      requiredFr158SchemaVersion: 'fr158-role-invariant-eye-pair-neutral-shape-metric-runtime-v1' as const,
      requiredFr158ArtifactVersion: '0.1.0' as const,
      requiredFr158AuthorityState: 'role_invariant_eye_pair_metric_3d_candidates_research_only' as const,
      requiredFr158CoordinateFrame: 'canonical_aligned_right_handed_metric_3d' as const,
      requiredFr158NextFrontier:
        'prospective_eye_pair_metric_3d_repeatability_and_capture_sensitivity_evaluation_without_identity_matching_or_semantic_promotion' as const,
      fr158ProspectiveFreshCaptureEvaluationRequired: true as const,
      fr158EmpiricalRepeatabilityEstablished: false as const,
      fr158CaptureQualityValidated: false as const,
      fr158ConstructValidity: 'unresolved' as const,
    }),
    preregistration: Object.freeze({
      state: 'primary_metrics_frozen_before_prospective_collection' as const,
      primaryMetricRefs: Object.freeze([
        FR159_X_SPAN_METRIC_REF,
        FR159_PERIMETER_METRIC_REF,
      ] as const),
      primaryMetricCount: 2 as const,
      primaryMetricUnit: 'ratio' as const,
      coordinateFrame: 'canonical_aligned_right_handed_metric_3d' as const,
      candidateSelectionFrozenBeforeProspectiveCapture: true as const,
      currentDevelopmentCapturesEligible: false as const,
      retrospectiveDevelopmentCapturePromotionAllowed: false as const,
      postPreregistrationFreshCaptureRequired: true as const,
      numericRepeatabilityAcceptanceThreshold: null,
      numericCaptureQualityThreshold: null,
      calibrationRef: null,
      traditionalCriterionBindingRef: null,
    }),
    acquisition: Object.freeze({
      acquisitionUnit: 'same_participant_repeated_fresh_neutral_capture_series' as const,
      captureManifestRequired: true as const,
      sameParticipantSeriesAttestationRequired: true as const,
      captureConditionStratumRefRequired: true as const,
      captureSequenceIndexRequired: true as const,
      repeatedCaptureSeriesRequiredForFutureEvaluation: true as const,
      minimumCaptureCountForRepeatabilityAdjudication: null,
      minimumConditionCountForCaptureSensitivityAdjudication: null,
      captureCountPerSeries: null,
      seriesCount: null,
      participantCount: null,
      conditionVocabulary: null,
      conditionThresholds: null,
    }),
    descriptiveAnalysis: Object.freeze({
      primaryMetricStatisticsAllowed: Object.freeze(['count', 'min', 'max', 'mean', 'range'] as const),
      repeatabilityPassFailIssued: false as const,
      captureSensitivityPassFailIssued: false as const,
      captureQualityScoreIssued: false as const,
      captureQualityMeasurementConstructValidated: false as const,
      inferentialValidationClaimIssued: false as const,
      descriptiveStatisticMeansRepeatabilityEstablished: false as const,
      descriptiveStatisticMeansCaptureQualityValidated: false as const,
      descriptiveStatisticMeansConstructValidity: false as const,
    }),
    privacyBoundary: Object.freeze({
      rawImageStoredByProtocolArtifact: false as const,
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
      repeatCaptureGroupingMeansBiometricTemplate: false as const,
      descriptiveRepeatabilityMeansEmpiricalRepeatabilityEstablished: false as const,
      descriptiveCaptureSensitivityMeansCaptureQualityValidated: false as const,
      captureConditionRefMeansValidatedCaptureQualityConstruct: false as const,
      physicalAnthropometricInterpretationAllowed: false as const,
      classificationIssued: false as const,
      calibrationIssued: false as const,
      thresholdsIssued: false as const,
      morphologyProduced: false as const,
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
      numericRepeatabilityAcceptanceThreshold: null,
      numericCaptureQualityThreshold: null,
      traditionalSemanticAuthority: false as const,
    }),
    researchNoteRef: FR159_RESEARCH_NOTE_REF,
    nextFrontier: FR159_NEXT_FRONTIER,
  });
}

export function admitEyePairProspectiveCaptureManifestFR159(
  input: EyePairProspectiveCaptureManifestInputFR159V1,
): EyePairProspectiveCaptureManifestFR159V1 {
  const prospectiveCollectionRef = requireOpaqueRef('prospectiveCollectionRef', input.prospectiveCollectionRef);
  const captureSeriesRef = requireOpaqueRef('captureSeriesRef', input.captureSeriesRef);
  const captureRef = requireOpaqueRef('captureRef', input.captureRef);
  const captureConditionRef = requireOpaqueRef('captureConditionRef', input.captureConditionRef);
  if (!Number.isSafeInteger(input.captureSequenceIndex) || input.captureSequenceIndex < 1) {
    fail('captureSequenceIndex must be a positive safe integer within its protocol-local series.');
  }
  if (input.postPreregistrationFreshCaptureAttested !== true) {
    fail('prospective admission requires an explicit post-preregistration fresh-capture attestation.');
  }
  if (input.sameParticipantSeriesAttested !== true) {
    fail('prospective repeatability admission requires same-participant series attestation.');
  }
  if (input.usedForCandidateSelection !== false) {
    fail('a capture used for candidate selection cannot be admitted as prospective evaluation evidence.');
  }
  if (input.developmentCaptureReuse !== false) {
    fail('development captures cannot be reused or retroactively promoted into FR-159 prospective evidence.');
  }
  if (input.identityMatchingPerformed !== false) {
    fail('identity matching is outside the FR-159 prospective repeatability authority boundary.');
  }

  const result: EyePairProspectiveCaptureManifestFR159V1 = Object.freeze({
    schemaVersion: 'fr159-eye-pair-prospective-capture-manifest-v1' as const,
    artifactVersion: '0.1.0' as const,
    recordId: FR159_EYE_PAIR_PROSPECTIVE_REPEATABILITY_PROTOCOL_RECORD_ID,
    authorityState: 'prospective_capture_manifest_only_no_empirical_validation' as const,
    prospectiveCollectionRef,
    captureSeriesRef,
    captureRef,
    captureConditionRef,
    captureSequenceIndex: input.captureSequenceIndex,
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
    traditionalSemanticAuthority: false as const,
  });
  MANIFEST_ISSUED.add(result);
  return result;
}

export function assertIssuedEyePairProspectiveCaptureManifestFR159(
  manifest: EyePairProspectiveCaptureManifestFR159V1,
): void {
  if (!MANIFEST_ISSUED.has(manifest)) fail('capture manifest was not issued by the active FR-159 admission boundary.');
  if (
    manifest.schemaVersion !== 'fr159-eye-pair-prospective-capture-manifest-v1'
    || manifest.artifactVersion !== '0.1.0'
    || manifest.authorityState !== 'prospective_capture_manifest_only_no_empirical_validation'
    || manifest.eligibilityAttestation.postPreregistrationFreshCaptureAttested !== true
    || manifest.eligibilityAttestation.sameParticipantSeriesAttested !== true
    || manifest.eligibilityAttestation.usedForCandidateSelection !== false
    || manifest.eligibilityAttestation.developmentCaptureReuse !== false
    || manifest.eligibilityAttestation.identityMatchingPerformed !== false
    || manifest.identityBoundary.captureSeriesRefMeansIdentityMatch !== false
    || manifest.identityBoundary.externalIdentityResolutionAllowed !== false
    || manifest.identityBoundary.biometricTemplateIssued !== false
    || manifest.traditionalSemanticAuthority !== false
  ) fail('issued capture-manifest authority boundary drift.');
}

export function summarizeEyePairProspectiveMetricValuesFR159(
  metricRef: EyePairProspectivePrimaryMetricRefFR159V1,
  values: readonly number[],
): EyePairProspectiveDescriptiveMetricSummaryFR159V1 {
  const admittedMetricRef = requirePrimaryMetricRef(metricRef);
  if (values.length === 0) fail('descriptive summary requires at least one finite metric value.');
  if (values.some((value) => !Number.isFinite(value))) fail('descriptive summary metric values must all be finite.');
  const min = Math.min(...values);
  const max = Math.max(...values);
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  return Object.freeze({
    metricRef: admittedMetricRef,
    unit: 'ratio' as const,
    count: values.length,
    min,
    max,
    mean,
    range: max - min,
    evaluationState: 'descriptive_only_no_repeatability_adjudication' as const,
    classificationApplied: false as const,
    calibrationApplied: false as const,
    acceptanceThresholdApplied: false as const,
    captureQualityThresholdApplied: false as const,
    traditionalBindingApplied: false as const,
  });
}
