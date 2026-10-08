import {
  FR312G6_NUMERIC_GOVERNANCE_REVIEW,
} from './traditional-neutral-metric-numeric-governance-review-fr312g6.js';
import {
  FR312G8_FEASIBILITY_VERDICT,
  assertExactAxisEvidenceFeasibilityFR312G8,
} from './traditional-neutral-metric-source-feasibility-fr312g8.js';

/**
 * Source-documentary metadata-only review. Neither sample assets nor actual
 * participant records are fetched. A publisher's dataset-card licence claim
 * is NOT consent for commercial biometric product inference.
 */
export const FR312G12_AUDIT_ID = 'fr312g12.public_manifest_exact_axis_triage' as const;

export const FR312G12_HSRD_DOCUMENTED_RELEASE = Object.freeze({
  source: 'https://huggingface.co/datasets/digitalrealitylab/HSRD-100' as const,
  readme: 'https://huggingface.co/datasets/digitalrealitylab/HSRD-100/blob/main/README.md' as const,
  inventory: 'https://huggingface.co/datasets/digitalrealitylab/HSRD-100/tree/main/manifest' as const,
  manifestCsv: 'https://huggingface.co/datasets/digitalrealitylab/HSRD-100/blob/main/manifest/files.csv' as const,
  poseManifest: 'https://huggingface.co/datasets/digitalrealitylab/HSRD-100/blob/main/manifest/poses.jsonl' as const,
  readmeConfigInventory: 'manifest/files.parquet' as const,
  publishedManifestFiles: Object.freeze(['files.csv', 'persons.jsonl', 'poses.jsonl'] as const),
  declaredIndependentPeople: 10 as const,
  declaredBodyPoses: 100 as const,
  declaredLicence: 'cc-by-4.0' as const,
  independentlyVerifiedFaceConsentForProduct: false as const,
  datedNeutralSessionPairingDocumented: false as const,
  exactEightAxisMeasurementsDocumented: false as const,
  // The following *representative* public rows are not an exhaustive archive scan.
  examplePoseId: 'HSR0040-Body-004' as const,
  poseManifestPaths: Object.freeze({
    originalScan: 'data/HSR0040/HSR0040-Body-004/scans/HSR0040-Body-004-Scan.zip',
    lod0: 'data/HSR0040/HSR0040-Body-004/scans/HSR0040-Body-004-Scan-LOD0.zip',
    captureProject: 'data/HSR0040/HSR0040-Body-004/source/HSR0040-Body-004-RealityCapture.zip',
  }),
  csvManifestPaths: Object.freeze({
    originalScan: 'data/HSR0040/HSR0040-Body-004/source/HSR0040-Body-004-Scan.zip',
    lod0: 'data/HSR0040/HSR0040-Body-004/scans/HSR0040-Body-004-Scan-Lod0.zip',
    captureProject: 'data/HSR0040/HSR0040-Body-004/source/HSR0040-Body-004-Reality_Capture.zip',
  }),
  exampleCsvFileSize: 0 as const,
  exampleCsvSha256: '' as const,
  actualZipBytesInspected: false as const,
});

export const FR312G12_FAIRFACE_DOCUMENTED_RELEASE = Object.freeze({
  source: 'https://github.com/joojs/fairface' as const,
  readme: 'https://github.com/joojs/fairface/blob/master/README.md' as const,
  readmeRepositoryPayload: 'README.md_and_external_Google_Drive_links' as const,
  cropAlignment: 'dlib.get_face_chip' as const,
  documentedPadding: Object.freeze([0.25, 1.25] as const),
  documentClaimsLicense: 'cc-by-4.0' as const,
  contains2DAlignedFaces: true as const,
  repositoryContainsIndependent3DGroundTruth: false as const,
  officialPublicDocumentationProvidesDatedParticipantSessions: false as const,
  officialPublicDocumentationProvidesTwoFreshNeutralCapturesPerSession: false as const,
  sourceImagesCommercialPersonalityRightsIndependentlyVerified: false as const,
  exactEightAxisMeasurementsDocumented: false as const,
  imagesDownloaded: false as const,
  csvLabelsDownloaded: false as const,
});

export type FR312G12Source = 'HSRD-100' | 'FairFace';

export interface FR312G12PublicStructureFinding {
  readonly source: FR312G12Source;
  readonly documentarySourceVerified: true;
  readonly publisherLicenceClaim: 'cc-by-4.0';
  readonly actualBiometricFileContentInspected: false;
  readonly safeMetadataAuditCompleted: true;
  readonly exactArtifactManifestIdentityVerified: false;
  readonly eligibleRepeatedNeutralCaptureProtocol: false;
  readonly allEightExactMetricAxesEquivalent: false;
  readonly commercialBiometricConsentProven: false;
  readonly exactAxisReliabilityEvidenceAdmitted: false;
  readonly downloadOrExternalProcessingAuthorizedByThisAudit: false;
  readonly useCategory: 'metadata_only_3d_pipeline_candidate' | 'metadata_only_2d_robustness_candidate';
  readonly blockers: readonly string[];
}

export function auditHSRDManifestFR312G12(): FR312G12PublicStructureFinding {
  const d = FR312G12_HSRD_DOCUMENTED_RELEASE;
  const manifestMissing = !d.publishedManifestFiles.some(
    (name) => 'manifest/' + name === d.readmeConfigInventory,
  );
  const divergentPaths = (Object.keys(d.poseManifestPaths) as Array<keyof typeof d.poseManifestPaths>)
    .filter((key) => d.poseManifestPaths[key] !== d.csvManifestPaths[key]);
  if (!manifestMissing || divergentPaths.length !== 3 || d.exampleCsvFileSize !== 0 ||
      d.exampleCsvSha256 !== '' || d.actualZipBytesInspected) {
    throw new Error('fr312g12_hsrd_public_source_snapshot_changed_requires_reaudit');
  }
  return Object.freeze({
    source: 'HSRD-100' as const,
    documentarySourceVerified: true as const,
    publisherLicenceClaim: 'cc-by-4.0' as const,
    actualBiometricFileContentInspected: false as const,
    safeMetadataAuditCompleted: true as const,
    exactArtifactManifestIdentityVerified: false as const,
    eligibleRepeatedNeutralCaptureProtocol: false as const,
    allEightExactMetricAxesEquivalent: false as const,
    commercialBiometricConsentProven: false as const,
    exactAxisReliabilityEvidenceAdmitted: false as const,
    downloadOrExternalProcessingAuthorizedByThisAudit: false as const,
    useCategory: 'metadata_only_3d_pipeline_candidate' as const,
    blockers: Object.freeze([
      'readme_references_missing_files_parquet_but_manifest_hosts_files_csv',
      'representative_scan_lod0_capture_project_paths_disagree_between_public_inventories',
      'representative_csv_inventory_lacks_nonzero_size_and_sha256',
      'ten_independent_people_not_one_hundred_independent_subjects',
      'no_dated_sessions_two_fresh_accepted_neutral_captures_or_exact_axis_parity',
      'third_party_human_face_product_consent_not_independently_proven',
    ] as const),
  });
}

export function auditFairFaceManifestFR312G12(): FR312G12PublicStructureFinding {
  const d = FR312G12_FAIRFACE_DOCUMENTED_RELEASE;
  if (d.documentedPadding[0] !== 0.25 || d.documentedPadding[1] !== 1.25 ||
      d.cropAlignment !== 'dlib.get_face_chip' ||
      d.repositoryContainsIndependent3DGroundTruth ||
      d.officialPublicDocumentationProvidesDatedParticipantSessions ||
      d.officialPublicDocumentationProvidesTwoFreshNeutralCapturesPerSession ||
      d.exactEightAxisMeasurementsDocumented || d.imagesDownloaded || d.csvLabelsDownloaded) {
    throw new Error('fr312g12_fairface_public_source_snapshot_changed_requires_reaudit');
  }
  return Object.freeze({
    source: 'FairFace' as const,
    documentarySourceVerified: true as const,
    publisherLicenceClaim: 'cc-by-4.0' as const,
    actualBiometricFileContentInspected: false as const,
    safeMetadataAuditCompleted: true as const,
    exactArtifactManifestIdentityVerified: false as const,
    eligibleRepeatedNeutralCaptureProtocol: false as const,
    allEightExactMetricAxesEquivalent: false as const,
    commercialBiometricConsentProven: false as const,
    exactAxisReliabilityEvidenceAdmitted: false as const,
    downloadOrExternalProcessingAuthorizedByThisAudit: false as const,
    useCategory: 'metadata_only_2d_robustness_candidate' as const,
    blockers: Object.freeze([
      'official_repo_points_to_external_face_images_and_labels_not_embedded_artifacts',
      'cropped_aligned_2d_faces_without_source_coordinate_reconstruction',
      'no_verified_3d_canonical_mesh_reference',
      'no_dated_participant_linked_two_session_fresh_neutral_recaptures',
      'no_eight_axis_exact_measurements_or_missingness',
      'origin_image_personality_rights_not_independently_proven',
    ] as const),
  });
}

export const FR312G12_FINDINGS = Object.freeze([
  auditHSRDManifestFR312G12(),
  auditFairFaceManifestFR312G12(),
] as const);

export function assertPublicManifestResearchBoundaryFR312G12(): void {
  assertExactAxisEvidenceFeasibilityFR312G8();
  if (FR312G8_FEASIBILITY_VERDICT.verifiedExactAxisNumericEvidenceCount !== 0 ||
      FR312G6_NUMERIC_GOVERNANCE_REVIEW.participantCount !== null ||
      FR312G6_NUMERIC_GOVERNANCE_REVIEW.partitionRatios !== null ||
      FR312G6_NUMERIC_GOVERNANCE_REVIEW.evidencePacketIssued) {
    throw new Error('fr312g12_numeric_authority_drift');
  }
  if (FR312G12_FINDINGS.length !== 2 ||
      FR312G12_FINDINGS[0].source !== 'HSRD-100' ||
      FR312G12_FINDINGS[1].source !== 'FairFace') {
    throw new Error('fr312g12_dataset_identity_drift');
  }
  for (const item of FR312G12_FINDINGS) {
    if (!item.safeMetadataAuditCompleted ||
        item.actualBiometricFileContentInspected ||
        item.exactArtifactManifestIdentityVerified ||
        item.eligibleRepeatedNeutralCaptureProtocol ||
        item.allEightExactMetricAxesEquivalent ||
        item.commercialBiometricConsentProven ||
        item.exactAxisReliabilityEvidenceAdmitted ||
        item.downloadOrExternalProcessingAuthorizedByThisAudit) {
      throw new Error('fr312g12_premature_admission:' + item.source);
    }
  }
}
