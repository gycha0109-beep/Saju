import {
  FACE_READING_PROVIDER_ZYGION_AUTHORITY_ACQUISITION_FR196,
  assertFaceReadingProviderZygionAuthorityAcquisitionFR196,
} from './face-reading-provider-zygion-correspondence-authority-acquisition-fr196.js';

export interface FaceReadingProviderZygionValidationProtocolFR197 {
  readonly schemaVersion: 'fr197-v1';
  readonly contractId: 'face_reading_provider_zygion_validation_protocol_fr197';
  readonly contractVersion: 'FR197-PROVIDER-ZYGION-VALIDATION-PROTOCOL-v1';
  readonly baselineMainSha: '0c3a631944089b9e5d26680317793da228c9f05e';
  readonly authorityState: 'independent_zygion_validation_protocol_defined_execution_evidence_absent';
  readonly upstreamFR196: {
    readonly moduleRef: 'packages/face-reading/src/face-reading-provider-zygion-correspondence-authority-acquisition-fr196.ts';
    readonly contractId: 'face_reading_provider_zygion_authority_acquisition_fr196';
    readonly contractVersion: 'FR196-PROVIDER-ZYGION-AUTHORITY-ACQUISITION-v1';
    readonly authorityState: 'external_authority_exhausted_candidate_supported_direct_validation_required';
    readonly nextRequiredGate: 'independent_provider_to_neutral_zygion_validation_protocol_definition';
  };
  readonly providerCandidate: {
    readonly packageName: '@mediapipe/tasks-vision';
    readonly packageVersion: '0.10.35';
    readonly sourceTag: 'v0.10.35';
    readonly providerIndices: readonly [234, 454];
    readonly pairOrderHasSemanticMeaning: false;
    readonly admittedProviderIndices: readonly [];
    readonly providerIndexAdmissionAuthorized: false;
    readonly providerSideAssignmentAuthorized: false;
  };
  readonly neutralReferencePolicy: {
    readonly allowedEvidenceKinds: readonly [
      'source_governed_direct_semantic_mapping',
      'independently_labelled_neutral_zygion_coordinates',
    ];
    readonly neutralReferenceMustBeIndependentOfProviderCandidate: true;
    readonly labelerMaySeeProviderCandidateAssignment: false;
    readonly providerOutputMaySeedNeutralLabels: false;
    readonly providerOutputMayAdjustNeutralLabels: false;
    readonly providerOutputMayFilterNeutralLabels: false;
    readonly providerDerivedPseudoGroundTruthAllowed: false;
  };
  readonly sampleLinkagePolicy: {
    readonly neutralReferenceAndProviderObservationMustReferToSameSample: true;
    readonly sampleLinkageMeansIdentityProof: false;
    readonly identityMatchingRequired: false;
    readonly biometricEmbeddingRequired: false;
    readonly identityTemplateRequired: false;
  };
  readonly selectionPolicy: {
    readonly providerCandidateSelectionAllowed: false;
    readonly candidateSelectedSamplesAllowed: false;
    readonly valueBasedSampleRejectionAllowed: false;
    readonly retrospectiveRelabellingToImproveCorrespondenceAllowed: false;
    readonly inconvenientObservationDiscardAllowed: false;
  };
  readonly analysisPolicy: {
    readonly analysisState: 'protocol_only_descriptive_correspondence_no_adjudication';
    readonly unorderedPairComparisonRequired: true;
    readonly anatomicalSideAssignmentDuringProtocolDefinitionAllowed: false;
    readonly providerToNeutralCorrespondenceEstablished: false;
    readonly minimumSampleCount: null;
    readonly numericAcceptanceThreshold: null;
    readonly confidenceThreshold: null;
    readonly calibrationCoefficient: null;
    readonly classifierAuthorized: false;
  };
  readonly operatorBurdenPolicy: {
    readonly userRepeatedCaptureCampaignRequired: false;
    readonly productOperatorValidationCampaignRequired: false;
    readonly participantRecruitmentAuthorizedByThisContract: false;
    readonly expertAnnotationCollectionAuthorizedByThisContract: false;
  };
  readonly authorityBoundary: {
    readonly provider234IsZygion: false;
    readonly provider454IsZygion: false;
    readonly providerIndexAdmissionAuthorized: false;
    readonly providerSideAssignmentAuthorized: false;
    readonly bizygomaticMetricAuthorized: false;
    readonly cheekGeometryAuthorized: false;
    readonly thresholdAuthorized: false;
    readonly calibrationAuthorized: false;
    readonly confidenceIssued: false;
    readonly classifierAuthorized: false;
    readonly captureSufficiencyAuthorized: false;
    readonly traditionalProjectionAuthorized: false;
    readonly productionActivationAuthorized: false;
    readonly commerceActivationAuthorized: false;
  };
  readonly readiness: {
    readonly protocolDefinitionReady: true;
    readonly independentReferenceEvidenceReady: false;
    readonly directCorrespondenceEvidenceReady: false;
    readonly providerIndexAdmissionReady: false;
    readonly userValidationBurdenRequired: false;
    readonly nextRequiredGate: 'source_governed_or_independent_reference_correspondence_evidence';
  };
  readonly nextFrontier: 'acquire_source_governed_or_independent_reference_correspondence_evidence_under_fr197_without_user_validation_burden';
}

export const FACE_READING_PROVIDER_ZYGION_VALIDATION_PROTOCOL_FR197: FaceReadingProviderZygionValidationProtocolFR197 =
  Object.freeze({
    schemaVersion: 'fr197-v1' as const,
    contractId: 'face_reading_provider_zygion_validation_protocol_fr197' as const,
    contractVersion: 'FR197-PROVIDER-ZYGION-VALIDATION-PROTOCOL-v1' as const,
    baselineMainSha: '0c3a631944089b9e5d26680317793da228c9f05e' as const,
    authorityState: 'independent_zygion_validation_protocol_defined_execution_evidence_absent' as const,
    upstreamFR196: Object.freeze({
      moduleRef:
        'packages/face-reading/src/face-reading-provider-zygion-correspondence-authority-acquisition-fr196.ts' as const,
      contractId: 'face_reading_provider_zygion_authority_acquisition_fr196' as const,
      contractVersion: 'FR196-PROVIDER-ZYGION-AUTHORITY-ACQUISITION-v1' as const,
      authorityState:
        'external_authority_exhausted_candidate_supported_direct_validation_required' as const,
      nextRequiredGate:
        'independent_provider_to_neutral_zygion_validation_protocol_definition' as const,
    }),
    providerCandidate: Object.freeze({
      packageName: '@mediapipe/tasks-vision' as const,
      packageVersion: '0.10.35' as const,
      sourceTag: 'v0.10.35' as const,
      providerIndices: Object.freeze([234, 454] as const),
      pairOrderHasSemanticMeaning: false as const,
      admittedProviderIndices: Object.freeze([]) as readonly [],
      providerIndexAdmissionAuthorized: false as const,
      providerSideAssignmentAuthorized: false as const,
    }),
    neutralReferencePolicy: Object.freeze({
      allowedEvidenceKinds: Object.freeze([
        'source_governed_direct_semantic_mapping',
        'independently_labelled_neutral_zygion_coordinates',
      ] as const),
      neutralReferenceMustBeIndependentOfProviderCandidate: true as const,
      labelerMaySeeProviderCandidateAssignment: false as const,
      providerOutputMaySeedNeutralLabels: false as const,
      providerOutputMayAdjustNeutralLabels: false as const,
      providerOutputMayFilterNeutralLabels: false as const,
      providerDerivedPseudoGroundTruthAllowed: false as const,
    }),
    sampleLinkagePolicy: Object.freeze({
      neutralReferenceAndProviderObservationMustReferToSameSample: true as const,
      sampleLinkageMeansIdentityProof: false as const,
      identityMatchingRequired: false as const,
      biometricEmbeddingRequired: false as const,
      identityTemplateRequired: false as const,
    }),
    selectionPolicy: Object.freeze({
      providerCandidateSelectionAllowed: false as const,
      candidateSelectedSamplesAllowed: false as const,
      valueBasedSampleRejectionAllowed: false as const,
      retrospectiveRelabellingToImproveCorrespondenceAllowed: false as const,
      inconvenientObservationDiscardAllowed: false as const,
    }),
    analysisPolicy: Object.freeze({
      analysisState: 'protocol_only_descriptive_correspondence_no_adjudication' as const,
      unorderedPairComparisonRequired: true as const,
      anatomicalSideAssignmentDuringProtocolDefinitionAllowed: false as const,
      providerToNeutralCorrespondenceEstablished: false as const,
      minimumSampleCount: null,
      numericAcceptanceThreshold: null,
      confidenceThreshold: null,
      calibrationCoefficient: null,
      classifierAuthorized: false as const,
    }),
    operatorBurdenPolicy: Object.freeze({
      userRepeatedCaptureCampaignRequired: false as const,
      productOperatorValidationCampaignRequired: false as const,
      participantRecruitmentAuthorizedByThisContract: false as const,
      expertAnnotationCollectionAuthorizedByThisContract: false as const,
    }),
    authorityBoundary: Object.freeze({
      provider234IsZygion: false as const,
      provider454IsZygion: false as const,
      providerIndexAdmissionAuthorized: false as const,
      providerSideAssignmentAuthorized: false as const,
      bizygomaticMetricAuthorized: false as const,
      cheekGeometryAuthorized: false as const,
      thresholdAuthorized: false as const,
      calibrationAuthorized: false as const,
      confidenceIssued: false as const,
      classifierAuthorized: false as const,
      captureSufficiencyAuthorized: false as const,
      traditionalProjectionAuthorized: false as const,
      productionActivationAuthorized: false as const,
      commerceActivationAuthorized: false as const,
    }),
    readiness: Object.freeze({
      protocolDefinitionReady: true as const,
      independentReferenceEvidenceReady: false as const,
      directCorrespondenceEvidenceReady: false as const,
      providerIndexAdmissionReady: false as const,
      userValidationBurdenRequired: false as const,
      nextRequiredGate:
        'source_governed_or_independent_reference_correspondence_evidence' as const,
    }),
    nextFrontier:
      'acquire_source_governed_or_independent_reference_correspondence_evidence_under_fr197_without_user_validation_burden' as const,
  });

export function assertFaceReadingProviderZygionValidationProtocolFR197(
  value: FaceReadingProviderZygionValidationProtocolFR197,
): FaceReadingProviderZygionValidationProtocolFR197 {
  assertFaceReadingProviderZygionAuthorityAcquisitionFR196(
    FACE_READING_PROVIDER_ZYGION_AUTHORITY_ACQUISITION_FR196,
  );

  if (
    value.schemaVersion !== 'fr197-v1'
    || value.contractId !== 'face_reading_provider_zygion_validation_protocol_fr197'
    || value.contractVersion !== 'FR197-PROVIDER-ZYGION-VALIDATION-PROTOCOL-v1'
    || value.baselineMainSha !== '0c3a631944089b9e5d26680317793da228c9f05e'
    || value.authorityState
      !== 'independent_zygion_validation_protocol_defined_execution_evidence_absent'
  ) {
    throw new Error('fr197_identity_or_baseline_drift');
  }

  if (
    value.upstreamFR196.contractId
      !== 'face_reading_provider_zygion_authority_acquisition_fr196'
    || value.upstreamFR196.contractVersion
      !== 'FR196-PROVIDER-ZYGION-AUTHORITY-ACQUISITION-v1'
    || value.upstreamFR196.authorityState
      !== 'external_authority_exhausted_candidate_supported_direct_validation_required'
    || value.upstreamFR196.nextRequiredGate
      !== 'independent_provider_to_neutral_zygion_validation_protocol_definition'
  ) {
    throw new Error('fr197_upstream_fr196_drift');
  }

  const candidate = value.providerCandidate;
  if (
    candidate.packageName !== '@mediapipe/tasks-vision'
    || candidate.packageVersion !== '0.10.35'
    || candidate.sourceTag !== 'v0.10.35'
    || candidate.providerIndices.length !== 2
    || candidate.providerIndices[0] !== 234
    || candidate.providerIndices[1] !== 454
    || candidate.pairOrderHasSemanticMeaning !== false
    || candidate.admittedProviderIndices.length !== 0
    || candidate.providerIndexAdmissionAuthorized !== false
    || candidate.providerSideAssignmentAuthorized !== false
  ) {
    throw new Error('fr197_candidate_pair_drift_or_promotion');
  }

  const reference = value.neutralReferencePolicy;
  if (
    reference.allowedEvidenceKinds.length !== 2
    || reference.allowedEvidenceKinds[0] !== 'source_governed_direct_semantic_mapping'
    || reference.allowedEvidenceKinds[1]
      !== 'independently_labelled_neutral_zygion_coordinates'
    || reference.neutralReferenceMustBeIndependentOfProviderCandidate !== true
    || reference.labelerMaySeeProviderCandidateAssignment !== false
    || reference.providerOutputMaySeedNeutralLabels !== false
    || reference.providerOutputMayAdjustNeutralLabels !== false
    || reference.providerOutputMayFilterNeutralLabels !== false
    || reference.providerDerivedPseudoGroundTruthAllowed !== false
  ) {
    throw new Error('fr197_reference_independence_violation');
  }

  const linkage = value.sampleLinkagePolicy;
  if (
    linkage.neutralReferenceAndProviderObservationMustReferToSameSample !== true
    || linkage.sampleLinkageMeansIdentityProof !== false
    || linkage.identityMatchingRequired !== false
    || linkage.biometricEmbeddingRequired !== false
    || linkage.identityTemplateRequired !== false
  ) {
    throw new Error('fr197_linkage_or_identity_authority_widening');
  }

  if (Object.values(value.selectionPolicy).some((flag) => flag !== false)) {
    throw new Error('fr197_selection_bias_path_enabled');
  }

  const analysis = value.analysisPolicy;
  if (
    analysis.analysisState !== 'protocol_only_descriptive_correspondence_no_adjudication'
    || analysis.unorderedPairComparisonRequired !== true
    || analysis.anatomicalSideAssignmentDuringProtocolDefinitionAllowed !== false
    || analysis.providerToNeutralCorrespondenceEstablished !== false
    || analysis.minimumSampleCount !== null
    || analysis.numericAcceptanceThreshold !== null
    || analysis.confidenceThreshold !== null
    || analysis.calibrationCoefficient !== null
    || analysis.classifierAuthorized !== false
  ) {
    throw new Error('fr197_analysis_threshold_or_authority_promotion');
  }

  if (Object.values(value.operatorBurdenPolicy).some((flag) => flag !== false)) {
    throw new Error('fr197_user_or_collection_burden_widening');
  }

  if (Object.values(value.authorityBoundary).some((flag) => flag !== false)) {
    throw new Error('fr197_authority_widening');
  }

  if (
    value.readiness.protocolDefinitionReady !== true
    || value.readiness.independentReferenceEvidenceReady !== false
    || value.readiness.directCorrespondenceEvidenceReady !== false
    || value.readiness.providerIndexAdmissionReady !== false
    || value.readiness.userValidationBurdenRequired !== false
    || value.readiness.nextRequiredGate
      !== 'source_governed_or_independent_reference_correspondence_evidence'
  ) {
    throw new Error('fr197_readiness_drift');
  }

  if (
    value.nextFrontier
      !== 'acquire_source_governed_or_independent_reference_correspondence_evidence_under_fr197_without_user_validation_burden'
  ) {
    throw new Error('fr197_next_frontier_drift');
  }

  return value;
}

const ISSUED = new WeakSet<object>();

export function issueFaceReadingProviderZygionValidationProtocolFR197():
FaceReadingProviderZygionValidationProtocolFR197 {
  const issued = Object.freeze({
    ...FACE_READING_PROVIDER_ZYGION_VALIDATION_PROTOCOL_FR197,
  });
  ISSUED.add(issued);
  return issued;
}

export function assertIssuedFaceReadingProviderZygionValidationProtocolFR197(
  value: FaceReadingProviderZygionValidationProtocolFR197,
): FaceReadingProviderZygionValidationProtocolFR197 {
  assertFaceReadingProviderZygionValidationProtocolFR197(value);
  if (!ISSUED.has(value)) {
    throw new Error('fr197_unissued_provider_zygion_validation_protocol');
  }
  return value;
}
