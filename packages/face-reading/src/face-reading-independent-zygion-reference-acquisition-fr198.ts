import {
  FACE_READING_PROVIDER_ZYGION_VALIDATION_PROTOCOL_FR197,
  assertFaceReadingProviderZygionValidationProtocolFR197,
} from './face-reading-provider-zygion-validation-protocol-fr197.js';

export type FaceReadingZygionReferenceAcquisitionStateFR198 =
  | 'ACQUIRED_EXECUTABLE'
  | 'CONTROLLED_ACCESS_NOT_ACQUIRED'
  | 'PUBLIC_METHOD_ONLY_NO_EXECUTABLE_SAME_SAMPLE_ASSET'
  | 'PUBLIC_SAME_ID_IMAGE_SURFACE_ASSETS_REFERENCE_DERIVATION_PENDING'
  | 'INSUFFICIENT_FOR_ENDPOINT_COORDINATE_CORRESPONDENCE';

export interface FaceReadingIndependentZygionReferenceAcquisitionFR198 {
  readonly schemaVersion: 'fr198-v1';
  readonly contractId: 'face_reading_independent_zygion_reference_acquisition_fr198';
  readonly contractVersion: 'FR198-INDEPENDENT-ZYGION-REFERENCE-ACQUISITION-v1';
  readonly baselineMainSha: 'a0735ab816f4d8c2cc26eb228eee468ee1d0f03c';
  readonly authorityState: 'public_synthetic_same_sample_lane_registered_reference_derivation_pending';
  readonly upstreamFR197: {
    readonly contractVersion: 'FR197-PROVIDER-ZYGION-VALIDATION-PROTOCOL-v1';
    readonly authorityState: 'independent_zygion_validation_protocol_defined_execution_evidence_absent';
    readonly nextRequiredGate: 'source_governed_or_independent_reference_correspondence_evidence';
  };
  readonly providerCandidate: {
    readonly packageName: '@mediapipe/tasks-vision';
    readonly packageVersion: '0.10.35';
    readonly sourceTag: 'v0.10.35';
    readonly providerIndices: readonly [234, 454];
    readonly officialTopologyClassification: 'FACE_LANDMARKS_FACE_OVAL';
    readonly directZygionSemanticMappingEstablished: false;
    readonly providerIndexAdmissionAuthorized: false;
    readonly providerSideAssignmentAuthorized: false;
  };
  readonly evidenceCandidates: readonly {
    readonly candidateId: string;
    readonly sourceClass:
      | 'government_anthropometric_survey'
      | 'peer_reviewed_3d_landmark_study'
      | 'craniofacial_normative_database'
      | 'open_synthetic_3d_face_dataset_with_peer_reviewed_landmark_algorithm';
    readonly evidenceState: FaceReadingZygionReferenceAcquisitionStateFR198;
    readonly preferredAcquisitionLane: boolean;
    readonly bilateralZygionExplicitlyDefined: boolean;
    readonly sameSampleSurfaceAndZygionCoordinatesReported: boolean;
    readonly sameSampleExecutableAssetAcquired: boolean;
    readonly sufficientForEndpointCoordinateCorrespondence: boolean;
    readonly publicSameIdImageAndSurfaceAssetsAvailable: boolean;
    readonly publicSameIdAssetTupleCount: number | null;
    readonly referenceCoordinatesAlreadyPublished: boolean;
    readonly referenceDerivationExecutableWithoutProviderCandidate: boolean;
    readonly publishedReferenceValidationMeanErrorMm: number | null;
    readonly sourceImplementationControlFlowQuirkPresent?: boolean;
    readonly sourceExactExecutionMustFailIfBilateralResultIncomplete?: boolean;
    readonly accessPrerequisite: string | null;
    readonly sourceRefs: readonly string[];
  }[];
  readonly evidenceRules: {
    readonly officialFaceOvalMembershipIsDirectZygionMapping: false;
    readonly controlledAccessListingIsAcquiredEvidence: false;
    readonly caliperBizygomaticWidthAloneIsEndpointCoordinateEvidence: false;
    readonly publishedLandmarkDefinitionAloneIsSameSampleCorrespondenceEvidence: false;
    readonly providerCandidateMaySeedReferenceLabels: false;
    readonly syntheticReferenceDerivationMaySeeProviderCandidate: false;
    readonly publishedAlgorithmErrorIsAcceptanceThreshold: false;
    readonly sourceAlgorithmMayBeSilentlyRepaired: false;
  };
  readonly operatorBurdenPolicy: {
    readonly userRepeatedCaptureCampaignRequired: false;
    readonly productOperatorRepeatedCaptureCampaignRequired: false;
    readonly participantRecruitmentRequired: false;
  };
  readonly readiness: {
    readonly sourceGovernedDirectMappingReady: false;
    readonly independentReferenceCandidateRegistryReady: true;
    readonly publicSyntheticSameSampleLaneReady: true;
    readonly independentReferenceCoordinatesReady: false;
    readonly independentSameSampleExecutableAssetReady: false;
    readonly providerReferenceCorrespondenceReady: false;
    readonly providerIndexAdmissionReady: false;
    readonly nextRequiredGate: 'execute_public_synthetic_reference_derivation_without_provider_visibility';
  };
  readonly authorityBoundary: {
    readonly provider234IsZygion: false;
    readonly provider454IsZygion: false;
    readonly providerIndexAdmissionAuthorized: false;
    readonly bizygomaticMetricAuthorized: false;
    readonly thresholdAuthorized: false;
    readonly calibrationAuthorized: false;
    readonly classifierAuthorized: false;
    readonly traditionalProjectionAuthorized: false;
    readonly productionActivationAuthorized: false;
    readonly commerceActivationAuthorized: false;
  };
  readonly nextFrontier: 'execute_public_synthetic_independent_zygion_reference_derivation_without_provider_visibility_then_run_fr197_correspondence';
}

export const FACE_READING_INDEPENDENT_ZYGION_REFERENCE_ACQUISITION_FR198:
FaceReadingIndependentZygionReferenceAcquisitionFR198 = Object.freeze({
  schemaVersion: 'fr198-v1',
  contractId: 'face_reading_independent_zygion_reference_acquisition_fr198',
  contractVersion: 'FR198-INDEPENDENT-ZYGION-REFERENCE-ACQUISITION-v1',
  baselineMainSha: 'a0735ab816f4d8c2cc26eb228eee468ee1d0f03c',
  authorityState:
    'public_synthetic_same_sample_lane_registered_reference_derivation_pending',
  upstreamFR197: Object.freeze({
    contractVersion: 'FR197-PROVIDER-ZYGION-VALIDATION-PROTOCOL-v1',
    authorityState:
      'independent_zygion_validation_protocol_defined_execution_evidence_absent',
    nextRequiredGate:
      'source_governed_or_independent_reference_correspondence_evidence',
  }),
  providerCandidate: Object.freeze({
    packageName: '@mediapipe/tasks-vision',
    packageVersion: '0.10.35',
    sourceTag: 'v0.10.35',
    providerIndices: Object.freeze([234, 454] as const),
    officialTopologyClassification: 'FACE_LANDMARKS_FACE_OVAL',
    directZygionSemanticMappingEstablished: false,
    providerIndexAdmissionAuthorized: false,
    providerSideAssignmentAuthorized: false,
  }),
  evidenceCandidates: Object.freeze([
    Object.freeze({
      candidateId: 'NIOSH-NPPTL-2003-3D-ANTHROPOMETRIC-SURVEY',
      sourceClass: 'government_anthropometric_survey' as const,
      evidenceState: 'CONTROLLED_ACCESS_NOT_ACQUIRED' as const,
      preferredAcquisitionLane: true,
      bilateralZygionExplicitlyDefined: true,
      sameSampleSurfaceAndZygionCoordinatesReported: true,
      sameSampleExecutableAssetAcquired: false,
      sufficientForEndpointCoordinateCorrespondence: false,
      publicSameIdImageAndSurfaceAssetsAvailable: false,
      publicSameIdAssetTupleCount: null,
      referenceCoordinatesAlreadyPublished: false,
      referenceDerivationExecutableWithoutProviderCandidate: false,
      publishedReferenceValidationMeanErrorMm: null,
      accessPrerequisite: 'NIOSH_DATA_USE_AGREEMENT_OR_CURRENT_RAW_DATA_ACCESS_PROCESS',
      sourceRefs: Object.freeze([
        'https://stacks.cdc.gov/view/cdc/223510',
        'https://archive.cdc.gov/www_cdc_gov/niosh/npptl/topics/respirators/headforms/default.html',
        'https://stacks.cdc.gov/view/cdc/188017',
      ]),
    }),
    Object.freeze({
      candidateId: 'DJORDJEVIC-2016-3D-TWIN-LANDMARK-STUDY',
      sourceClass: 'peer_reviewed_3d_landmark_study' as const,
      evidenceState:
        'PUBLIC_METHOD_ONLY_NO_EXECUTABLE_SAME_SAMPLE_ASSET' as const,
      preferredAcquisitionLane: false,
      bilateralZygionExplicitlyDefined: true,
      sameSampleSurfaceAndZygionCoordinatesReported: true,
      sameSampleExecutableAssetAcquired: false,
      sufficientForEndpointCoordinateCorrespondence: false,
      publicSameIdImageAndSurfaceAssetsAvailable: false,
      publicSameIdAssetTupleCount: null,
      referenceCoordinatesAlreadyPublished: false,
      referenceDerivationExecutableWithoutProviderCandidate: false,
      publishedReferenceValidationMeanErrorMm: null,
      accessPrerequisite: 'OPEN_SAME_SAMPLE_3D_SURFACE_PLUS_COORDINATE_PACKAGE_NOT_ESTABLISHED',
      sourceRefs: Object.freeze([
        'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0162250',
        'https://figshare.com/articles/dataset/Definitions_of_anthropometric_landmarks_identified_on_3D_facial_images_/3802275',
      ]),
    }),
    Object.freeze({
      candidateId: 'TOPSAKAL-2024-OPEN-SYNTHETIC-3D-FACE-DATASET',
      sourceClass:
        'open_synthetic_3d_face_dataset_with_peer_reviewed_landmark_algorithm' as const,
      evidenceState:
        'PUBLIC_SAME_ID_IMAGE_SURFACE_ASSETS_REFERENCE_DERIVATION_PENDING' as const,
      preferredAcquisitionLane: false,
      bilateralZygionExplicitlyDefined: true,
      sameSampleSurfaceAndZygionCoordinatesReported: false,
      sameSampleExecutableAssetAcquired: false,
      sufficientForEndpointCoordinateCorrespondence: false,
      publicSameIdImageAndSurfaceAssetsAvailable: true,
      publicSameIdAssetTupleCount: 20,
      referenceCoordinatesAlreadyPublished: false,
      referenceDerivationExecutableWithoutProviderCandidate: true,
      publishedReferenceValidationMeanErrorMm: 8.08,
      sourceImplementationControlFlowQuirkPresent: true,
      sourceExactExecutionMustFailIfBilateralResultIncomplete: true,
      accessPrerequisite: null,
      sourceRefs: Object.freeze([
        'https://github.com/research-digitized-rhinoplasty/3D-face-morph',
        'https://github.com/research-digitized-rhinoplasty/3D-face-morph-dataset-male',
        'https://github.com/research-digitized-rhinoplasty/3D-face-morph-dataset-female',
        'https://github.com/research-digitized-rhinoplasty/3D-Facial-Landmark-Detection',
        'https://doi.org/10.1109/ACCESS.2023.3255099',
        'https://doi.org/10.1089/fpsam.2023.0030',
      ]),
    }),
    Object.freeze({
      candidateId: 'FACEBASE-3D-FACIAL-NORMS-ZY-ZY-CALIPER',
      sourceClass: 'craniofacial_normative_database' as const,
      evidenceState:
        'INSUFFICIENT_FOR_ENDPOINT_COORDINATE_CORRESPONDENCE' as const,
      preferredAcquisitionLane: false,
      bilateralZygionExplicitlyDefined: true,
      sameSampleSurfaceAndZygionCoordinatesReported: false,
      sameSampleExecutableAssetAcquired: false,
      sufficientForEndpointCoordinateCorrespondence: false,
      publicSameIdImageAndSurfaceAssetsAvailable: false,
      publicSameIdAssetTupleCount: null,
      referenceCoordinatesAlreadyPublished: false,
      referenceDerivationExecutableWithoutProviderCandidate: false,
      publishedReferenceValidationMeanErrorMm: null,
      accessPrerequisite:
        'INDIVIDUAL_LEVEL_DATA_CONTROLLED_ACCESS; ZYGION IS CALIPER_MEASURE_NOT_INCLUDED_IN_24_3D_LANDMARK_SET',
      sourceRefs: Object.freeze([
        'https://www.facebase.org/resources/human/facial_norms/',
        'https://pmc.ncbi.nlm.nih.gov/articles/PMC4841760/',
      ]),
    }),
  ]),
  evidenceRules: Object.freeze({
    officialFaceOvalMembershipIsDirectZygionMapping: false,
    controlledAccessListingIsAcquiredEvidence: false,
    caliperBizygomaticWidthAloneIsEndpointCoordinateEvidence: false,
    publishedLandmarkDefinitionAloneIsSameSampleCorrespondenceEvidence: false,
    providerCandidateMaySeedReferenceLabels: false,
    syntheticReferenceDerivationMaySeeProviderCandidate: false,
    publishedAlgorithmErrorIsAcceptanceThreshold: false,
    sourceAlgorithmMayBeSilentlyRepaired: false,
  }),
  operatorBurdenPolicy: Object.freeze({
    userRepeatedCaptureCampaignRequired: false,
    productOperatorRepeatedCaptureCampaignRequired: false,
    participantRecruitmentRequired: false,
  }),
  readiness: Object.freeze({
    sourceGovernedDirectMappingReady: false,
    independentReferenceCandidateRegistryReady: true,
    publicSyntheticSameSampleLaneReady: true,
    independentReferenceCoordinatesReady: false,
    independentSameSampleExecutableAssetReady: false,
    providerReferenceCorrespondenceReady: false,
    providerIndexAdmissionReady: false,
    nextRequiredGate:
      'execute_public_synthetic_reference_derivation_without_provider_visibility',
  }),
  authorityBoundary: Object.freeze({
    provider234IsZygion: false,
    provider454IsZygion: false,
    providerIndexAdmissionAuthorized: false,
    bizygomaticMetricAuthorized: false,
    thresholdAuthorized: false,
    calibrationAuthorized: false,
    classifierAuthorized: false,
    traditionalProjectionAuthorized: false,
    productionActivationAuthorized: false,
    commerceActivationAuthorized: false,
  }),
  nextFrontier:
    'execute_public_synthetic_independent_zygion_reference_derivation_without_provider_visibility_then_run_fr197_correspondence',
});

export function assertFaceReadingIndependentZygionReferenceAcquisitionFR198(
  value: FaceReadingIndependentZygionReferenceAcquisitionFR198,
): FaceReadingIndependentZygionReferenceAcquisitionFR198 {
  assertFaceReadingProviderZygionValidationProtocolFR197(
    FACE_READING_PROVIDER_ZYGION_VALIDATION_PROTOCOL_FR197,
  );

  if (
    value.schemaVersion !== 'fr198-v1'
    || value.contractId
      !== 'face_reading_independent_zygion_reference_acquisition_fr198'
    || value.contractVersion
      !== 'FR198-INDEPENDENT-ZYGION-REFERENCE-ACQUISITION-v1'
    || value.baselineMainSha
      !== 'a0735ab816f4d8c2cc26eb228eee468ee1d0f03c'
    || value.authorityState
      !== 'public_synthetic_same_sample_lane_registered_reference_derivation_pending'
  ) {
    throw new Error('fr198_identity_or_baseline_drift');
  }

  if (
    value.upstreamFR197.contractVersion
      !== 'FR197-PROVIDER-ZYGION-VALIDATION-PROTOCOL-v1'
    || value.upstreamFR197.authorityState
      !== 'independent_zygion_validation_protocol_defined_execution_evidence_absent'
    || value.upstreamFR197.nextRequiredGate
      !== 'source_governed_or_independent_reference_correspondence_evidence'
  ) {
    throw new Error('fr198_upstream_fr197_drift');
  }

  const provider = value.providerCandidate;
  if (
    provider.packageName !== '@mediapipe/tasks-vision'
    || provider.packageVersion !== '0.10.35'
    || provider.sourceTag !== 'v0.10.35'
    || provider.providerIndices.length !== 2
    || provider.providerIndices[0] !== 234
    || provider.providerIndices[1] !== 454
    || provider.officialTopologyClassification !== 'FACE_LANDMARKS_FACE_OVAL'
  ) {
    throw new Error('fr198_provider_candidate_drift');
  }
  if (
    provider.directZygionSemanticMappingEstablished !== false
    || provider.providerIndexAdmissionAuthorized !== false
    || provider.providerSideAssignmentAuthorized !== false
  ) {
    throw new Error('fr198_direct_mapping_promotion_without_evidence');
  }

  if (value.evidenceCandidates.length !== 4) {
    throw new Error('fr198_evidence_candidate_registry_drift');
  }

  const niosh = value.evidenceCandidates.find(
    (candidate) =>
      candidate.candidateId === 'NIOSH-NPPTL-2003-3D-ANTHROPOMETRIC-SURVEY',
  );
  if (
    !niosh
    || niosh.evidenceState !== 'CONTROLLED_ACCESS_NOT_ACQUIRED'
    || niosh.preferredAcquisitionLane !== true
    || niosh.bilateralZygionExplicitlyDefined !== true
    || niosh.sameSampleSurfaceAndZygionCoordinatesReported !== true
    || niosh.sameSampleExecutableAssetAcquired !== false
    || niosh.sufficientForEndpointCoordinateCorrespondence !== false
  ) {
    throw new Error('fr198_niosh_controlled_access_state_drift');
  }

  const synthetic = value.evidenceCandidates.find(
    (candidate) =>
      candidate.candidateId === 'TOPSAKAL-2024-OPEN-SYNTHETIC-3D-FACE-DATASET',
  );
  if (
    !synthetic
    || synthetic.evidenceState
      !== 'PUBLIC_SAME_ID_IMAGE_SURFACE_ASSETS_REFERENCE_DERIVATION_PENDING'
    || synthetic.publicSameIdImageAndSurfaceAssetsAvailable !== true
    || synthetic.publicSameIdAssetTupleCount !== 20
    || synthetic.referenceCoordinatesAlreadyPublished !== false
    || synthetic.referenceDerivationExecutableWithoutProviderCandidate !== true
    || synthetic.publishedReferenceValidationMeanErrorMm !== 8.08
    || synthetic.sourceImplementationControlFlowQuirkPresent !== true
    || synthetic.sourceExactExecutionMustFailIfBilateralResultIncomplete !== true
    || synthetic.sameSampleExecutableAssetAcquired !== false
    || synthetic.sufficientForEndpointCoordinateCorrespondence !== false
  ) {
    throw new Error('fr198_public_synthetic_reference_lane_drift_or_promotion');
  }

  const faceBase = value.evidenceCandidates.find(
    (candidate) =>
      candidate.candidateId === 'FACEBASE-3D-FACIAL-NORMS-ZY-ZY-CALIPER',
  );
  if (
    !faceBase
    || faceBase.evidenceState
      !== 'INSUFFICIENT_FOR_ENDPOINT_COORDINATE_CORRESPONDENCE'
    || faceBase.sameSampleSurfaceAndZygionCoordinatesReported !== false
    || faceBase.sufficientForEndpointCoordinateCorrespondence !== false
  ) {
    throw new Error('fr198_scalar_width_promoted_to_endpoint_evidence');
  }

  const djordjevic = value.evidenceCandidates.find(
    (candidate) =>
      candidate.candidateId === 'DJORDJEVIC-2016-3D-TWIN-LANDMARK-STUDY',
  );
  if (
    !djordjevic
    || djordjevic.evidenceState
      !== 'PUBLIC_METHOD_ONLY_NO_EXECUTABLE_SAME_SAMPLE_ASSET'
    || djordjevic.sameSampleExecutableAssetAcquired !== false
    || djordjevic.sufficientForEndpointCoordinateCorrespondence !== false
  ) {
    throw new Error('fr198_public_method_promoted_to_acquired_reference');
  }

  if (Object.values(value.evidenceRules).some((flag) => flag !== false)) {
    throw new Error('fr198_evidence_rule_promotion');
  }
  if (Object.values(value.operatorBurdenPolicy).some((flag) => flag !== false)) {
    throw new Error('fr198_user_or_operator_burden_widening');
  }
  if (Object.values(value.authorityBoundary).some((flag) => flag !== false)) {
    throw new Error('fr198_authority_widening');
  }

  if (
    value.readiness.sourceGovernedDirectMappingReady !== false
    || value.readiness.independentReferenceCandidateRegistryReady !== true
    || value.readiness.independentSameSampleExecutableAssetReady !== false
    || value.readiness.providerReferenceCorrespondenceReady !== false
    || value.readiness.providerIndexAdmissionReady !== false
    || value.readiness.nextRequiredGate
      !== 'execute_public_synthetic_reference_derivation_without_provider_visibility'
  ) {
    throw new Error('fr198_readiness_drift');
  }

  if (
    value.nextFrontier
      !== 'execute_public_synthetic_independent_zygion_reference_derivation_without_provider_visibility_then_run_fr197_correspondence'
  ) {
    throw new Error('fr198_next_frontier_drift');
  }

  return value;
}
