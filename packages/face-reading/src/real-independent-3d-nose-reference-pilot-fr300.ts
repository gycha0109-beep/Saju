import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  FR299_INDEPENDENT_3D_NOSE_REFERENCE_BUNDLE_CONTRACT_VERSION,
  buildFR299Independent3DNoseReferenceBundle,
  type FR299Independent3DNoseReferenceBundle,
  type FR299Independent3DNoseReferenceBundleInput,
} from './independent-3d-nose-reference-bundle-fr299.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR300_REAL_INDEPENDENT_3D_NOSE_REFERENCE_PILOT_CONTRACT_VERSION =
  'FR300-REAL-INDEPENDENT-3D-NOSE-REFERENCE-PILOT-v1' as const;

export const FR300_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr300-real-independent-3d-reference-pilot.md' as const;

export const FR300_IBUG_3DMDLAB_REAL_SOURCE_REF =
  'https://ibug.doc.ic.ac.uk/resources/itwmm/' as const;

export type FR300RightsStatus =
  | 'explicitly_allowed'
  | 'noncommercial_only'
  | 'explicitly_prohibited'
  | 'unresolved';

export interface FR300DatasetQualificationEvidence {
  readonly schemaVersion:
    'fr300-dataset-qualification-evidence-v1';
  readonly datasetRef: string;
  readonly officialSourceRef: string;
  readonly sourceOwnerRef: string;
  readonly sourceDescriptionEvidenceRef: string;
  readonly licenseEvidenceRef: string | null;
  readonly containsRealRgb: boolean;
  readonly containsIndependent3DGroundTruth: boolean;
  readonly rgb3DPairingDocumented: boolean;
  readonly metricScaleDocumented: boolean;
  readonly source3DRegistrationDocumented: boolean;
  readonly source3DRegistrationFrameRef: string | null;
  readonly sparseLandmarksGeneratedByImageModel: boolean;
  readonly commercialProductDevelopmentStatus:
    FR300RightsStatus;
  readonly localRawDataProcessingStatus: FR300RightsStatus;
  readonly rawDataRedistributionStatus: FR300RightsStatus;
  readonly derivedReferenceMetadataPublicationStatus:
    FR300RightsStatus;
  readonly personalityPrivacyUseStatus: FR300RightsStatus;
  readonly participantConsentScopeStatus: FR300RightsStatus;
}

export type FR300DatasetQualificationBlocker =
  | 'official_source_ref_missing'
  | 'source_description_evidence_ref_missing'
  | 'license_evidence_missing'
  | 'real_rgb_not_documented'
  | 'independent_3d_ground_truth_not_documented'
  | 'rgb_3d_pairing_not_documented'
  | 'metric_scale_not_documented'
  | 'source_3d_registration_not_documented'
  | 'source_3d_registration_frame_missing'
  | 'commercial_product_development_rights_unresolved'
  | 'commercial_product_development_not_allowed'
  | 'local_raw_data_processing_rights_unresolved'
  | 'local_raw_data_processing_not_allowed'
  | 'derived_reference_metadata_publication_rights_unresolved'
  | 'derived_reference_metadata_publication_not_allowed'
  | 'personality_privacy_scope_unresolved'
  | 'personality_privacy_use_not_allowed'
  | 'participant_consent_scope_unresolved'
  | 'participant_consent_scope_not_allowed';

export interface FR300DatasetQualificationReceipt {
  readonly schemaVersion:
    'fr300-dataset-qualification-receipt-v1';
  readonly datasetRef: string;
  readonly status:
    | 'admitted_for_real_reference_pilot'
    | 'blocked';
  readonly blockers:
    readonly FR300DatasetQualificationBlocker[];
  readonly rawDataRedistributionAllowed: boolean;
  readonly sparseImageModelLandmarksAllowedAsGroundTruth: false;
  readonly sourceRegistrationEquivalentToMyeongHaCanonical: false;
}

export interface FR300RealSourceManifest {
  readonly schemaVersion:
    'fr300-real-source-manifest-v1';
  readonly datasetRef: string;
  readonly subjectId: string;
  readonly captureId: string;
  readonly rgb: {
    readonly artifactRef: string;
    readonly artifactDigest: string;
    readonly widthPixels: number;
    readonly heightPixels: number;
    readonly format: 'bmp' | 'png' | 'jpeg';
  };
  readonly mesh: {
    readonly artifactRef: string;
    readonly artifactDigest: string;
    readonly format: 'obj';
    readonly vertexCount: number;
    readonly faceCount: number;
    readonly sourceCoordinateFrameRef: string;
    readonly sourceUnit:
      | 'millimeter'
      | 'centimeter'
      | 'meter';
  };
  readonly pairing: {
    readonly sameSubjectVerified: true;
    readonly sameCaptureVerified: true;
    readonly pairingEvidenceRef: string;
  };
  readonly rawRgbCommittedToRepository: false;
  readonly rawMeshCommittedToRepository: false;
}

export interface FR300RealReferencePilotInput {
  readonly schemaVersion:
    'fr300-real-reference-pilot-input-v1';
  readonly qualification:
    FR300DatasetQualificationReceipt;
  readonly sourceManifest: FR300RealSourceManifest;
  readonly fr299Input:
    FR299Independent3DNoseReferenceBundleInput;
}

export interface FR300RealReferencePilotResult {
  readonly schemaVersion:
    'fr300-real-reference-pilot-result-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion:
    typeof FR300_REAL_INDEPENDENT_3D_NOSE_REFERENCE_PILOT_CONTRACT_VERSION;
  readonly watchtowerTrack: 'face-engine';
  readonly status:
    'real_reference_pilot_materialized';
  readonly datasetRef: string;
  readonly subjectId: string;
  readonly captureId: string;
  readonly sourceManifest: FR300RealSourceManifest;
  readonly referenceBundle:
    FR299Independent3DNoseReferenceBundle;
  readonly reproducibility: {
    readonly rerunCount: 2;
    readonly deterministicReferenceValue: true;
    readonly deterministicProvenanceBinding: true;
  };
  readonly authorityBoundary: {
    readonly datasetRightsInferredByFR300: false;
    readonly sourceRegistrationTransformIssuedByFR300: false;
    readonly imageModelSparseLandmarksPromotedToGroundTruth: false;
    readonly rgbCandidateIssued: false;
    readonly benchmarkWinnerIssued: false;
    readonly acceptanceThresholdIssued: false;
    readonly traditionalBindingIssued: false;
    readonly productColumnMaterialized: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly researchNoteRef: typeof FR300_RESEARCH_NOTE_REF;
}

const SHA256 = /^sha256:[0-9a-f]{64}$/u;
const SAFE_REF = /^[A-Za-z0-9][A-Za-z0-9._:/?=&%-]{0,1023}$/u;

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-300 ${message}`);
}

function ref(value: string, label: string): string {
  const trimmed = value.trim();
  if (!SAFE_REF.test(trimmed)) {
    fail(`${label} must be a bounded non-empty reference without whitespace.`);
  }
  return trimmed;
}

function digest(value: string, label: string): string {
  if (!SHA256.test(value)) {
    fail(`${label} must be sha256:<64 lowercase hex>.`);
  }
  return value;
}

function positiveInteger(value: number, label: string): number {
  if (!Number.isSafeInteger(value) || value <= 0) {
    fail(`${label} must be a positive safe integer.`);
  }
  return value;
}

function rightsBlockers(
  status: FR300RightsStatus,
  unresolved:
    FR300DatasetQualificationBlocker,
  notAllowed:
    FR300DatasetQualificationBlocker,
): FR300DatasetQualificationBlocker[] {
  if (status === 'explicitly_allowed') return [];
  if (status === 'unresolved') return [unresolved];
  return [notAllowed];
}

export function qualifyFR300Dataset(
  evidence: FR300DatasetQualificationEvidence,
): FR300DatasetQualificationReceipt {
  if (
    evidence.schemaVersion !==
      'fr300-dataset-qualification-evidence-v1'
  ) {
    fail('dataset qualification evidence schemaVersion drift.');
  }

  const datasetRef = ref(evidence.datasetRef, 'datasetRef');
  const blockers: FR300DatasetQualificationBlocker[] = [];

  try {
    ref(evidence.officialSourceRef, 'officialSourceRef');
  } catch {
    blockers.push('official_source_ref_missing');
  }
  try {
    ref(
      evidence.sourceDescriptionEvidenceRef,
      'sourceDescriptionEvidenceRef',
    );
  } catch {
    blockers.push('source_description_evidence_ref_missing');
  }

  if (
    evidence.licenseEvidenceRef === null ||
    evidence.licenseEvidenceRef.trim().length === 0
  ) {
    blockers.push('license_evidence_missing');
  } else {
    ref(evidence.licenseEvidenceRef, 'licenseEvidenceRef');
  }

  if (!evidence.containsRealRgb) {
    blockers.push('real_rgb_not_documented');
  }
  if (!evidence.containsIndependent3DGroundTruth) {
    blockers.push('independent_3d_ground_truth_not_documented');
  }
  if (!evidence.rgb3DPairingDocumented) {
    blockers.push('rgb_3d_pairing_not_documented');
  }
  if (!evidence.metricScaleDocumented) {
    blockers.push('metric_scale_not_documented');
  }
  if (!evidence.source3DRegistrationDocumented) {
    blockers.push('source_3d_registration_not_documented');
  }
  if (
    evidence.source3DRegistrationFrameRef === null ||
    evidence.source3DRegistrationFrameRef.trim().length === 0
  ) {
    blockers.push('source_3d_registration_frame_missing');
  } else {
    ref(
      evidence.source3DRegistrationFrameRef,
      'source3DRegistrationFrameRef',
    );
  }

  blockers.push(
    ...rightsBlockers(
      evidence.commercialProductDevelopmentStatus,
      'commercial_product_development_rights_unresolved',
      'commercial_product_development_not_allowed',
    ),
    ...rightsBlockers(
      evidence.localRawDataProcessingStatus,
      'local_raw_data_processing_rights_unresolved',
      'local_raw_data_processing_not_allowed',
    ),
    ...rightsBlockers(
      evidence.derivedReferenceMetadataPublicationStatus,
      'derived_reference_metadata_publication_rights_unresolved',
      'derived_reference_metadata_publication_not_allowed',
    ),
    ...rightsBlockers(
      evidence.personalityPrivacyUseStatus,
      'personality_privacy_scope_unresolved',
      'personality_privacy_use_not_allowed',
    ),
    ...rightsBlockers(
      evidence.participantConsentScopeStatus,
      'participant_consent_scope_unresolved',
      'participant_consent_scope_not_allowed',
    ),
  );

  return Object.freeze({
    schemaVersion:
      'fr300-dataset-qualification-receipt-v1' as const,
    datasetRef,
    status:
      blockers.length === 0
        ? 'admitted_for_real_reference_pilot'
        : 'blocked',
    blockers: Object.freeze(blockers),
    rawDataRedistributionAllowed:
      evidence.rawDataRedistributionStatus ===
      'explicitly_allowed',
    sparseImageModelLandmarksAllowedAsGroundTruth:
      false as const,
    sourceRegistrationEquivalentToMyeongHaCanonical:
      false as const,
  });
}

export const FR300_IBUG_3DMDLAB_REAL_QUALIFICATION_EVIDENCE:
FR300DatasetQualificationEvidence = Object.freeze({
  schemaVersion:
    'fr300-dataset-qualification-evidence-v1' as const,
  datasetRef: 'ibug:3dMDLab_real',
  officialSourceRef: FR300_IBUG_3DMDLAB_REAL_SOURCE_REF,
  sourceOwnerRef: 'organization:imperial-college-london:ibug',
  sourceDescriptionEvidenceRef:
    'https://ibug.doc.ic.ac.uk/resources/itwmm/#3dMDLab-benchmark',
  licenseEvidenceRef: null,
  containsRealRgb: true,
  containsIndependent3DGroundTruth: true,
  rgb3DPairingDocumented: true,
  metricScaleDocumented: false,
  source3DRegistrationDocumented: true,
  source3DRegistrationFrameRef: 'external-model-frame:LSFM',
  sparseLandmarksGeneratedByImageModel: true,
  commercialProductDevelopmentStatus: 'unresolved',
  localRawDataProcessingStatus: 'unresolved',
  rawDataRedistributionStatus: 'unresolved',
  derivedReferenceMetadataPublicationStatus: 'unresolved',
  personalityPrivacyUseStatus: 'unresolved',
  participantConsentScopeStatus: 'unresolved',
});

export const FR300_IBUG_3DMDLAB_REAL_QUALIFICATION =
  qualifyFR300Dataset(
    FR300_IBUG_3DMDLAB_REAL_QUALIFICATION_EVIDENCE,
  );

export function assertFR300RealSourceManifest(
  manifest: FR300RealSourceManifest,
): void {
  if (
    manifest.schemaVersion !==
      'fr300-real-source-manifest-v1'
  ) {
    fail('source manifest schemaVersion drift.');
  }

  ref(manifest.datasetRef, 'manifest.datasetRef');
  ref(manifest.subjectId, 'manifest.subjectId');
  ref(manifest.captureId, 'manifest.captureId');
  ref(manifest.rgb.artifactRef, 'manifest.rgb.artifactRef');
  digest(
    manifest.rgb.artifactDigest,
    'manifest.rgb.artifactDigest',
  );
  positiveInteger(
    manifest.rgb.widthPixels,
    'manifest.rgb.widthPixels',
  );
  positiveInteger(
    manifest.rgb.heightPixels,
    'manifest.rgb.heightPixels',
  );
  ref(manifest.mesh.artifactRef, 'manifest.mesh.artifactRef');
  digest(
    manifest.mesh.artifactDigest,
    'manifest.mesh.artifactDigest',
  );
  positiveInteger(
    manifest.mesh.vertexCount,
    'manifest.mesh.vertexCount',
  );
  positiveInteger(
    manifest.mesh.faceCount,
    'manifest.mesh.faceCount',
  );
  ref(
    manifest.mesh.sourceCoordinateFrameRef,
    'manifest.mesh.sourceCoordinateFrameRef',
  );
  ref(
    manifest.pairing.pairingEvidenceRef,
    'manifest.pairing.pairingEvidenceRef',
  );

  if (
    manifest.pairing.sameSubjectVerified !== true ||
    manifest.pairing.sameCaptureVerified !== true ||
    manifest.rawRgbCommittedToRepository !== false ||
    manifest.rawMeshCommittedToRepository !== false
  ) {
    fail('real source manifest provenance/privacy boundary drift.');
  }
}

function assertPilotBindings(
  input: FR300RealReferencePilotInput,
): void {
  const { sourceManifest, fr299Input } = input;

  if (
    sourceManifest.datasetRef !==
      input.qualification.datasetRef ||
    fr299Input.source.datasetRef !==
      sourceManifest.datasetRef
  ) {
    fail('qualification, source manifest, and FR299 input must bind the same dataset.');
  }
  if (
    fr299Input.source.subjectId !==
      sourceManifest.subjectId ||
    fr299Input.source.captureId !==
      sourceManifest.captureId
  ) {
    fail('FR299 source must bind the exact manifest subject and capture.');
  }
  if (
    fr299Input.source.source3DArtifactRef !==
      sourceManifest.mesh.artifactRef ||
    fr299Input.source.source3DArtifactDigest !==
      sourceManifest.mesh.artifactDigest
  ) {
    fail('FR299 source must bind the exact manifest 3D artifact.');
  }
  if (
    fr299Input.rgbBinding.rgbObservationRef !==
      sourceManifest.rgb.artifactRef
  ) {
    fail('FR299 RGB binding must bind the exact manifest RGB artifact.');
  }
  if (
    fr299Input.registration.sourceCoordinateFrameRef !==
      sourceManifest.mesh.sourceCoordinateFrameRef
  ) {
    fail('FR299 registration must start from the exact manifest source coordinate frame.');
  }
}

function sameProvenance(
  a: FR299Independent3DNoseReferenceBundle,
  b: FR299Independent3DNoseReferenceBundle,
): boolean {
  return (
    a.bundleId === b.bundleId &&
    a.source.datasetRef === b.source.datasetRef &&
    a.source.subjectId === b.source.subjectId &&
    a.source.captureId === b.source.captureId &&
    a.source.source3DArtifactDigest ===
      b.source.source3DArtifactDigest &&
    a.registration.registrationArtifactDigest ===
      b.registration.registrationArtifactDigest &&
    a.frozenAnnotations.tipArtifactDigest ===
      b.frozenAnnotations.tipArtifactDigest &&
    a.frozenAnnotations.bridgeRootArtifactDigest ===
      b.frozenAnnotations.bridgeRootArtifactDigest
  );
}

export function materializeFR300RealReferencePilot(
  input: FR300RealReferencePilotInput,
): FR300RealReferencePilotResult {
  assertFR300RealIndependent3DReferencePilotContract();

  if (
    input.schemaVersion !==
      'fr300-real-reference-pilot-input-v1'
  ) {
    fail('pilot input schemaVersion drift.');
  }
  if (
    input.qualification.status !==
      'admitted_for_real_reference_pilot' ||
    input.qualification.blockers.length !== 0
  ) {
    fail('dataset qualification must be admitted before real source materialization.');
  }

  assertFR300RealSourceManifest(input.sourceManifest);
  assertPilotBindings(input);

  const first =
    buildFR299Independent3DNoseReferenceBundle(
      input.fr299Input,
    );
  const second =
    buildFR299Independent3DNoseReferenceBundle(
      input.fr299Input,
    );

  if (
    !Object.is(first.reference.value, second.reference.value) ||
    !sameProvenance(first, second)
  ) {
    fail('frozen reference materialization must reproduce exactly.');
  }

  return Object.freeze({
    schemaVersion:
      'fr300-real-reference-pilot-result-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion:
      FR300_REAL_INDEPENDENT_3D_NOSE_REFERENCE_PILOT_CONTRACT_VERSION,
    watchtowerTrack: 'face-engine' as const,
    status:
      'real_reference_pilot_materialized' as const,
    datasetRef: input.sourceManifest.datasetRef,
    subjectId: input.sourceManifest.subjectId,
    captureId: input.sourceManifest.captureId,
    sourceManifest: input.sourceManifest,
    referenceBundle: first,
    reproducibility: Object.freeze({
      rerunCount: 2 as const,
      deterministicReferenceValue: true as const,
      deterministicProvenanceBinding: true as const,
    }),
    authorityBoundary: Object.freeze({
      datasetRightsInferredByFR300: false as const,
      sourceRegistrationTransformIssuedByFR300: false as const,
      imageModelSparseLandmarksPromotedToGroundTruth:
        false as const,
      rgbCandidateIssued: false as const,
      benchmarkWinnerIssued: false as const,
      acceptanceThresholdIssued: false as const,
      traditionalBindingIssued: false as const,
      productColumnMaterialized: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
    researchNoteRef: FR300_RESEARCH_NOTE_REF,
  });
}

export function assertFR300RealIndependent3DReferencePilotContract():
void {
  if (
    FR299_INDEPENDENT_3D_NOSE_REFERENCE_BUNDLE_CONTRACT_VERSION !==
      'FR299-INDEPENDENT-3D-NOSE-REFERENCE-BUNDLE-v1'
  ) {
    fail('FR299 predecessor contract drift.');
  }
  assertFR293ProductColumnMap();

  if (
    FR300_IBUG_3DMDLAB_REAL_QUALIFICATION.status !==
      'blocked' ||
    !FR300_IBUG_3DMDLAB_REAL_QUALIFICATION.blockers.includes(
      'license_evidence_missing',
    ) ||
    !FR300_IBUG_3DMDLAB_REAL_QUALIFICATION.blockers.includes(
      'metric_scale_not_documented',
    ) ||
    !FR300_IBUG_3DMDLAB_REAL_QUALIFICATION.blockers.includes(
      'commercial_product_development_rights_unresolved',
    )
  ) {
    fail('3dMDLab_real must remain blocked until explicit rights and metric-scale evidence are supplied.');
  }

  const materializedCount = FR293_PRODUCT_COLUMN_MAP.filter(
    (candidate) =>
      candidate.implementationState ===
        'canonical_extractor_materialized',
  ).length;
  if (materializedCount !== 18) {
    fail('FR300 must preserve 18/29 product materialization.');
  }
}

assertFR300RealIndependent3DReferencePilotContract();
