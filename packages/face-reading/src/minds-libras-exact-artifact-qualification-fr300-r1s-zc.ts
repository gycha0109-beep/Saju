import {
  FR300_R1R_ZC_COST_POLICY,
  FR300_R1R_ZC_CURRENT_GATE,
  FR300_R1R_ZC_ZERO_COST_METRIC_3D_CONTRACT_VERSION,
  assertFR300R1RZCZeroCostMetric3DContract,
} from './zero-cost-metric-3d-qualification-fr300-r1r-zc.js';
import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  FR299_INDEPENDENT_3D_NOSE_REFERENCE_BUNDLE_CONTRACT_VERSION,
  assertFR299Independent3DNoseReferenceBundleContract,
} from './independent-3d-nose-reference-bundle-fr299.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR300_R1S_ZC_MINDS_METADATA_CONTRACT_VERSION =
  'FR300-R1S-ZC-MINDS-EXACT-PUBLIC-METADATA-v1' as const;

export const FR300_R1S_ZC_MINDS_PUBLIC_DISTRIBUTION = Object.freeze({
  datasetId: 'minds_libras_rgbd' as const,
  doi: '10.5281/zenodo.4322984' as const,
  version: '1' as const,
  publicationDate: '2020-12-15' as const,
  distributionForm: 'downloadable' as const,
  archiveFormat: 'zip' as const,
  publicDistributionSizeBytes: 2149770033 as const,
  datasetCopyrightLicense:
    'Creative Commons Attribution 4.0 International' as const,
  datasetCopyrightLicenseId: 'CC-BY-4.0' as const,
  metadataSourceRef:
    'https://live.european-language-grid.eu/catalogue/lcr/21907' as const,
  metadataSourceClass:
    'zenodo_derived_catalog_metadata' as const,
  exactPublisherArchiveFilename: null,
  exactPublisherArchiveChecksum: null,
  exactPublisherFileId: null,
  publisherArchiveIdentityState:
    'partial_metadata_bound_filename_checksum_unresolved' as const,
});

export const FR300_R1S_ZC_MINDS_CREATOR_SCHEMA = Object.freeze({
  sourceRef:
    'https://repositorio.ufmg.br/bitstream/1843/39785/3/Tamires_Tese_MINDS.pdf' as const,
  sourceClass: 'creator_ufmg_doctoral_thesis' as const,
  captureDevice: 'Kinect_v2_for_Xbox_One' as const,
  frameCountPerRgbdSample: 150 as const,
  faceLogicalRowsPerFrame: 11 as const,
  faceTextLogicalLineCountPerSample: 1650 as const,
  faceModelPointCount: 1347 as const,
  faceModel: Object.freeze({
    xRow: 5 as const,
    yRow: 6 as const,
    zRow: 7 as const,
    coordinateReference: 'sensor_geometric_center' as const,
    documentedUnit: 'meter' as const,
    documentedRangesMeter: Object.freeze({
      x: Object.freeze([-2.2, 2.2] as const),
      y: Object.freeze([-1.6, 1.6] as const),
      z: Object.freeze([0, 4] as const),
    }),
  }),
  colorFaceModel: Object.freeze({
    xRow: 8 as const,
    yRow: 9 as const,
    mapsSameFaceModelPointIndices: true as const,
    targetFrame: 'rgb' as const,
  }),
  depthFaceModel: Object.freeze({
    xRow: 10 as const,
    yRow: 11 as const,
    mapsSameFaceModelPointIndices: true as const,
    targetFrame: 'depth' as const,
  }),
  auxiliaryPoseFields: Object.freeze({
    faceRotationRow: 2 as const,
    faceRotationDescription: 'Euler_pitch_yaw_roll' as const,
    headPivotRow: 3 as const,
    animationUnitsRow: 4 as const,
  }),
});

export const FR300_R1S_ZC_MINDS_PROVIDER_LANDMARKS = Object.freeze({
  documentedKinectIndices: Object.freeze({
    noseTip: 18 as const,
    noseTop: 24 as const,
  }),
  allowedUses: Object.freeze([
    'topology_orientation_check',
    'debugging',
    'region_of_interest_hint',
    'correspondence_sanity_check',
  ] as const),
  fr266GroundTruthIssued: false as const,
  fr297GroundTruthIssued: false as const,
  providerIndicesVisibleDuringFR266Annotation: false as const,
  providerIndicesVisibleDuringFR297Annotation: false as const,
  noseTopEquivalentToFR297BridgeRootIssued: false as const,
});

export const FR300_R1S_ZC_MINDS_RIGHTS_BOUNDARY = Object.freeze({
  datasetCopyrightLicenseBound: true as const,
  ccBy4CommercialCopyrightUseCompatible: true as const,
  participantCommercialProductDevelopmentScope:
    'unresolved' as const,
  participantConsentEvidenceRef: null,
  datasetLicenseMaySubstituteForParticipantConsent: false as const,
  subjectArtifactInspectionAuthorizedByThisContract: false as const,
  subjectArtifactDownloadPerformedByThisTrack: false as const,
  rawSubjectArtifactCommittedToRepository: false as const,
});

export const FR300_R1S_ZC_MINDS_METRIC_BOUNDARY = Object.freeze({
  creatorDocumentationBindsMeterSemantics: true as const,
  releasedBytesInspected: false as const,
  releasedByteMeterSurvivability:
    'unresolved' as const,
  quantizationOrNormalizationExcluded: false as const,
  exactArtifactChecksumBound: false as const,
  rgb3DSameIndexMappingDocumented: true as const,
  rgb3DSameCaptureBindingIssued: false as const,
  sourceFrame:
    'kinect_v2_sensor_geometric_center_documented_meter_space' as const,
  canonicalRegistrationIssued: false as const,
  canonicalRegistrationValidated: false as const,
  fr299MetricScaleVerifiedIssued: false as const,
});

export const FR300_R1S_ZC_CURRENT_GATE = Object.freeze({
  schemaVersion:
    'fr300-r1s-zc-minds-exact-public-metadata-gate-v1' as const,
  watchtowerTrack: 'face-engine' as const,
  status:
    'public_metadata_and_creator_schema_bound_subject_artifact_inspection_blocked' as const,
  zeroCost: true as const,
  paidSpendAuthorized: false as const,
  publisherMetadata: Object.freeze({
    doiBound: true as const,
    versionBound: true as const,
    publicationDateBound: true as const,
    formatBound: true as const,
    sizeBound: true as const,
    copyrightLicenseBound: true as const,
    exactArchiveFilenameBound: false as const,
    exactArchiveChecksumBound: false as const,
  }),
  technicalQualification:
    'documented_metric_schema_not_released_byte_qualified' as const,
  rightsQualification:
    'dataset_copyright_license_bound_participant_product_scope_unresolved' as const,
  disposition:
    'hold_before_subject_artifact_inspection' as const,
  fr299EligibleCandidateCount: 0 as const,
  fr300R2EligibleCandidateCount: 0 as const,
  nextEvidencePriority: Object.freeze([
    'bind_zenodo_publisher_archive_filename_and_checksum_without_subject_content_inspection',
    'find_source_authority_for_participant_commercial_product_development_scope',
    'only_after_rights_gate_inspect_released_face_artifact_metric_survivability',
    'only_after_metric_survivability_validate_external_canonical_registration',
  ] as const),
  authority: Object.freeze({
    subjectArtifactInspectionAuthorized: false as const,
    realFR299BundleAuthorized: false as const,
    fr300R2Authorized: false as const,
    productColumnMaterialized: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  }),
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-300-R1S-ZC ${message}`);
}

export function assertFR300R1SZCMindsMetadataContract(): void {
  assertFR300R1RZCZeroCostMetric3DContract();
  assertFR299Independent3DNoseReferenceBundleContract();

  if (
    FR300_R1R_ZC_ZERO_COST_METRIC_3D_CONTRACT_VERSION !==
      'FR300-R1R-ZC-ZERO-COST-METRIC-3D-v1' ||
    FR299_INDEPENDENT_3D_NOSE_REFERENCE_BUNDLE_CONTRACT_VERSION !==
      'FR299-INDEPENDENT-3D-NOSE-REFERENCE-BUNDLE-v1'
  ) {
    fail('predecessor authority drift.');
  }

  if (
    FR300_R1S_ZC_MINDS_PUBLIC_DISTRIBUTION.doi !==
      '10.5281/zenodo.4322984' ||
    FR300_R1S_ZC_MINDS_PUBLIC_DISTRIBUTION.version !== '1' ||
    FR300_R1S_ZC_MINDS_PUBLIC_DISTRIBUTION.publicationDate !==
      '2020-12-15' ||
    FR300_R1S_ZC_MINDS_PUBLIC_DISTRIBUTION.archiveFormat !== 'zip' ||
    FR300_R1S_ZC_MINDS_PUBLIC_DISTRIBUTION.publicDistributionSizeBytes !==
      2149770033 ||
    FR300_R1S_ZC_MINDS_PUBLIC_DISTRIBUTION.datasetCopyrightLicenseId !==
      'CC-BY-4.0'
  ) {
    fail('public distribution metadata drift.');
  }

  if (
    FR300_R1S_ZC_MINDS_PUBLIC_DISTRIBUTION.exactPublisherArchiveFilename !==
      null ||
    FR300_R1S_ZC_MINDS_PUBLIC_DISTRIBUTION.exactPublisherArchiveChecksum !==
      null ||
    FR300_R1S_ZC_MINDS_PUBLIC_DISTRIBUTION.exactPublisherFileId !== null
  ) {
    fail('unverified publisher artifact identity was promoted.');
  }

  const schema = FR300_R1S_ZC_MINDS_CREATOR_SCHEMA;
  if (
    schema.frameCountPerRgbdSample !== 150 ||
    schema.faceLogicalRowsPerFrame !== 11 ||
    schema.faceTextLogicalLineCountPerSample !== 1650 ||
    schema.faceModelPointCount !== 1347 ||
    schema.faceModel.xRow !== 5 ||
    schema.faceModel.yRow !== 6 ||
    schema.faceModel.zRow !== 7 ||
    schema.faceModel.coordinateReference !== 'sensor_geometric_center' ||
    schema.faceModel.documentedUnit !== 'meter' ||
    schema.colorFaceModel.xRow !== 8 ||
    schema.colorFaceModel.yRow !== 9 ||
    schema.depthFaceModel.xRow !== 10 ||
    schema.depthFaceModel.yRow !== 11 ||
    !schema.colorFaceModel.mapsSameFaceModelPointIndices ||
    !schema.depthFaceModel.mapsSameFaceModelPointIndices
  ) {
    fail('creator FaceModel schema drift.');
  }

  if (
    FR300_R1S_ZC_MINDS_PROVIDER_LANDMARKS.fr266GroundTruthIssued ||
    FR300_R1S_ZC_MINDS_PROVIDER_LANDMARKS.fr297GroundTruthIssued ||
    FR300_R1S_ZC_MINDS_PROVIDER_LANDMARKS
      .providerIndicesVisibleDuringFR266Annotation ||
    FR300_R1S_ZC_MINDS_PROVIDER_LANDMARKS
      .providerIndicesVisibleDuringFR297Annotation ||
    FR300_R1S_ZC_MINDS_PROVIDER_LANDMARKS
      .noseTopEquivalentToFR297BridgeRootIssued
  ) {
    fail('Kinect provider indices entered FR266/FR297 ground-truth authority.');
  }

  if (
    FR300_R1S_ZC_MINDS_RIGHTS_BOUNDARY
      .participantCommercialProductDevelopmentScope !== 'unresolved' ||
    FR300_R1S_ZC_MINDS_RIGHTS_BOUNDARY
      .datasetLicenseMaySubstituteForParticipantConsent ||
    FR300_R1S_ZC_MINDS_RIGHTS_BOUNDARY
      .subjectArtifactInspectionAuthorizedByThisContract ||
    FR300_R1S_ZC_MINDS_RIGHTS_BOUNDARY.subjectArtifactDownloadPerformedByThisTrack ||
    FR300_R1S_ZC_MINDS_RIGHTS_BOUNDARY.rawSubjectArtifactCommittedToRepository
  ) {
    fail('participant/privacy boundary widened.');
  }

  if (
    !FR300_R1S_ZC_MINDS_METRIC_BOUNDARY.creatorDocumentationBindsMeterSemantics ||
    FR300_R1S_ZC_MINDS_METRIC_BOUNDARY.releasedBytesInspected ||
    FR300_R1S_ZC_MINDS_METRIC_BOUNDARY.releasedByteMeterSurvivability !==
      'unresolved' ||
    FR300_R1S_ZC_MINDS_METRIC_BOUNDARY.quantizationOrNormalizationExcluded ||
    FR300_R1S_ZC_MINDS_METRIC_BOUNDARY.exactArtifactChecksumBound ||
    FR300_R1S_ZC_MINDS_METRIC_BOUNDARY.rgb3DSameCaptureBindingIssued ||
    FR300_R1S_ZC_MINDS_METRIC_BOUNDARY.canonicalRegistrationIssued ||
    FR300_R1S_ZC_MINDS_METRIC_BOUNDARY.canonicalRegistrationValidated ||
    FR300_R1S_ZC_MINDS_METRIC_BOUNDARY.fr299MetricScaleVerifiedIssued
  ) {
    fail('documented meter semantics were promoted beyond released-byte evidence.');
  }

  if (
    FR300_R1R_ZC_COST_POLICY.paidSpendAuthorized ||
    FR300_R1R_ZC_CURRENT_GATE.authority.paidAcquisitionAuthorized ||
    FR300_R1S_ZC_CURRENT_GATE.paidSpendAuthorized ||
    FR300_R1S_ZC_CURRENT_GATE.fr299EligibleCandidateCount !== 0 ||
    FR300_R1S_ZC_CURRENT_GATE.fr300R2EligibleCandidateCount !== 0 ||
    FR300_R1S_ZC_CURRENT_GATE.authority.subjectArtifactInspectionAuthorized ||
    FR300_R1S_ZC_CURRENT_GATE.authority.realFR299BundleAuthorized ||
    FR300_R1S_ZC_CURRENT_GATE.authority.fr300R2Authorized
  ) {
    fail('R1S-ZC gate widened beyond metadata qualification.');
  }

  assertFR293ProductColumnMap();
  const materializedCount = FR293_PRODUCT_COLUMN_MAP.filter(
    (item) =>
      item.implementationState === 'canonical_extractor_materialized',
  ).length;
  if (materializedCount !== 18) {
    fail('R1S-ZC must preserve 18/29 product materialization.');
  }
}

assertFR300R1SZCMindsMetadataContract();
