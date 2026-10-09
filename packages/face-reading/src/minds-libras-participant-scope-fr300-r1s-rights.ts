import {
  FR300_R1S_ZC_CURRENT_GATE,
  FR300_R1S_ZC_MINDS_METADATA_CONTRACT_VERSION,
  FR300_R1S_ZC_MINDS_RIGHTS_BOUNDARY,
  assertFR300R1SZCMindsMetadataContract,
} from './minds-libras-exact-artifact-qualification-fr300-r1s-zc.js';
import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR300_R1S_RIGHTS_MINDS_PARTICIPANT_SCOPE_CONTRACT_VERSION =
  'FR300-R1S-RIGHTS-MINDS-PARTICIPANT-SCOPE-v1' as const;

export const FR300_R1S_RIGHTS_PUBLIC_SOURCE_REVIEW = Object.freeze({
  datasetRef: 'doi:10.5281/zenodo.4322984' as const,
  sources: Object.freeze([
    Object.freeze({
      sourceClass: 'creator_ufmg_doctoral_thesis' as const,
      sourceRef:
        'https://repositorio.ufmg.br/bitstream/1843/39785/3/Tamires_Tese_MINDS.pdf' as const,
      publicDatasetAndParticipantRecordingDescribed: true as const,
      participantCommercialProductDevelopmentConsentStatementLocated:
        false as const,
      irbOrCaaeAuthorityLocatedForMindsCollection: false as const,
    }),
    Object.freeze({
      sourceClass: 'peer_reviewed_dataset_article' as const,
      sourceRef: 'doi:10.1007/s00521-021-05802-4' as const,
      publicDatasetAndParticipantRecordingDescribed: true as const,
      complianceWithEthicalStandardsSectionLocated: true as const,
      complianceSectionContainsConflictOfInterestStatement: true as const,
      informedConsentStatementLocated: false as const,
      ethicalApprovalStatementLocated: false as const,
      participantCommercialProductDevelopmentConsentStatementLocated:
        false as const,
    }),
    Object.freeze({
      sourceClass: 'zenodo_derived_public_catalog_metadata' as const,
      sourceRef:
        'https://live.european-language-grid.eu/catalogue/lcr/21907' as const,
      ccBy4DatasetCopyrightLicenseBound: true as const,
      participantCommercialProductDevelopmentConsentStatementLocated:
        false as const,
    }),
  ]),
  searchTermsReviewed: Object.freeze([
    'consent',
    'consentimento',
    'informed consent',
    'ethical approval',
    'CAAE',
    'CEP',
    'TCLE',
    'uso de imagem',
    'direito de imagem',
  ] as const),
  absenceFindingSemantics:
    'no_public_source_authority_located_not_proof_consent_never_existed' as const,
});

export const FR300_R1S_RIGHTS_ADJUDICATION = Object.freeze({
  datasetCopyrightLicenseStatus: 'cc_by_4_0_bound' as const,
  participantCommercialProductDevelopmentScope:
    'unresolved_after_public_source_review' as const,
  participantConsentNeverExistedClaimed: false as const,
  publicReleaseEqualsCommercialProductConsent: false as const,
  ccByCopyrightLicenseEqualsParticipantConsent: false as const,
  externalContactRequiredToResolve:
    'likely_if_no_additional_primary_record_is_found' as const,
  authorOrInstitutionContactAuthorizedByThisTrack: false as const,
  subjectArtifactInspectionAuthorized: false as const,
  subjectArtifactDownloadPerformed: false as const,
  disposition:
    'rights_hold_public_evidence_exhausted_for_current_surface' as const,
  fr299Eligible: false as const,
  fr300R2Eligible: false as const,
});

export const FR300_R1S_RIGHTS_CURRENT_GATE = Object.freeze({
  schemaVersion:
    'fr300-r1s-rights-minds-participant-scope-gate-v1' as const,
  watchtowerTrack: 'face-engine' as const,
  status:
    'participant_product_scope_unresolved_external_authority_needed_before_subject_artifact_inspection' as const,
  paidSpendAuthorized: false as const,
  fr299EligibleCandidateCount: 0 as const,
  fr300R2EligibleCandidateCount: 0 as const,
  nextEvidencePriority: Object.freeze([
    'zenodo_publisher_file_identity_metadata_if_public_endpoint_becomes_available',
    'primary_participant_consent_or_data_use_authority_if_publicly_locatable',
    'otherwise_prepare_author_or_institution_rights_question_without_sending',
    'do_not_inspect_subject_face_artifacts_until_rights_gate_changes',
  ] as const),
  authority: Object.freeze({
    externalContactAuthorized: false as const,
    subjectArtifactInspectionAuthorized: false as const,
    realFR299BundleAuthorized: false as const,
    fr300R2Authorized: false as const,
    productColumnMaterialized: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  }),
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-300-R1S-RIGHTS ${message}`);
}

export function assertFR300R1SRightsMindsParticipantScopeContract(): void {
  assertFR300R1SZCMindsMetadataContract();

  if (
    FR300_R1S_ZC_MINDS_METADATA_CONTRACT_VERSION !==
      'FR300-R1S-ZC-MINDS-EXACT-PUBLIC-METADATA-v1' ||
    FR300_R1S_ZC_CURRENT_GATE.authority.subjectArtifactInspectionAuthorized ||
    FR300_R1S_ZC_MINDS_RIGHTS_BOUNDARY
      .subjectArtifactInspectionAuthorizedByThisContract
  ) {
    fail('R1S-ZC predecessor rights gate drift.');
  }

  const article = FR300_R1S_RIGHTS_PUBLIC_SOURCE_REVIEW.sources.find(
    (source) => source.sourceClass === 'peer_reviewed_dataset_article',
  );
  if (
    article?.complianceWithEthicalStandardsSectionLocated !== true ||
    article.complianceSectionContainsConflictOfInterestStatement !== true ||
    article.informedConsentStatementLocated !== false ||
    article.ethicalApprovalStatementLocated !== false ||
    article.participantCommercialProductDevelopmentConsentStatementLocated !==
      false
  ) {
    fail('peer-reviewed public-source review receipt drift.');
  }

  if (
    FR300_R1S_RIGHTS_PUBLIC_SOURCE_REVIEW.absenceFindingSemantics !==
      'no_public_source_authority_located_not_proof_consent_never_existed' ||
    FR300_R1S_RIGHTS_ADJUDICATION.participantConsentNeverExistedClaimed ||
    FR300_R1S_RIGHTS_ADJUDICATION.publicReleaseEqualsCommercialProductConsent ||
    FR300_R1S_RIGHTS_ADJUDICATION
      .ccByCopyrightLicenseEqualsParticipantConsent
  ) {
    fail('absence-of-public-authority finding was overclaimed.');
  }

  if (
    FR300_R1S_RIGHTS_ADJUDICATION
      .participantCommercialProductDevelopmentScope !==
      'unresolved_after_public_source_review' ||
    FR300_R1S_RIGHTS_ADJUDICATION.authorOrInstitutionContactAuthorizedByThisTrack ||
    FR300_R1S_RIGHTS_ADJUDICATION.subjectArtifactInspectionAuthorized ||
    FR300_R1S_RIGHTS_ADJUDICATION.subjectArtifactDownloadPerformed ||
    FR300_R1S_RIGHTS_ADJUDICATION.fr299Eligible ||
    FR300_R1S_RIGHTS_ADJUDICATION.fr300R2Eligible
  ) {
    fail('participant rights hold widened.');
  }

  if (
    FR300_R1S_RIGHTS_CURRENT_GATE.paidSpendAuthorized ||
    FR300_R1S_RIGHTS_CURRENT_GATE.fr299EligibleCandidateCount !== 0 ||
    FR300_R1S_RIGHTS_CURRENT_GATE.fr300R2EligibleCandidateCount !== 0 ||
    FR300_R1S_RIGHTS_CURRENT_GATE.authority.externalContactAuthorized ||
    FR300_R1S_RIGHTS_CURRENT_GATE.authority.subjectArtifactInspectionAuthorized ||
    FR300_R1S_RIGHTS_CURRENT_GATE.authority.realFR299BundleAuthorized ||
    FR300_R1S_RIGHTS_CURRENT_GATE.authority.fr300R2Authorized
  ) {
    fail('R1S rights gate widened beyond public-source adjudication.');
  }

  assertFR293ProductColumnMap();
  const materializedCount = FR293_PRODUCT_COLUMN_MAP.filter(
    (item) =>
      item.implementationState === 'canonical_extractor_materialized',
  ).length;
  if (materializedCount !== 18) {
    fail('R1S rights adjudication must preserve 18/29 product materialization.');
  }
}

assertFR300R1SRightsMindsParticipantScopeContract();
