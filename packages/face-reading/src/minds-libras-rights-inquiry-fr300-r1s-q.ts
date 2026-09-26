import {
  FR300_R1S_RIGHTS_CURRENT_GATE,
  FR300_R1S_RIGHTS_MINDS_PARTICIPANT_SCOPE_CONTRACT_VERSION,
  FR300_R1S_RIGHTS_PUBLIC_SOURCE_REVIEW,
  assertFR300R1SRightsMindsParticipantScopeContract,
} from './minds-libras-participant-scope-fr300-r1s-rights.js';
import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR300_R1S_Q_MINDS_RIGHTS_INQUIRY_CONTRACT_VERSION =
  'FR300-R1S-Q-MINDS-RIGHTS-INQUIRY-v1' as const;

export const FR300_R1S_Q_PUBLIC_SEARCH_ADJUDICATION = Object.freeze({
  searchState: 'public_source_search_exhausted_for_current_surface' as const,
  participantCommercialProductDevelopmentScope:
    'unresolved_after_additional_public_search' as const,
  consentNeverExistedClaimed: false as const,
  publicDatasetReleaseEqualsCommercialParticipantConsent: false as const,
  additionalSourceClassesReviewed: Object.freeze([
    'ufmg_repository',
    'minds_project_site',
    'ifmg_project_page',
    'ifmg_institutional_page',
    'ufmg_institutional_page',
    'related_minds_libras_publication',
    'zenodo_derived_dataset_metadata',
  ] as const),
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
    'commercial use',
    'commercial product development',
  ] as const),
});

export const FR300_R1S_Q_OFFICIAL_CONTACT_ROUTES = Object.freeze([
  Object.freeze({
    contactId: 'silvia_almeida_ifmg' as const,
    name: 'Silvia Grasiella Moreira Almeida' as const,
    roleRelevance:
      'MINDS-Libras collaborator and IFMG project contact' as const,
    email: 'silvia.almeida@ifmg.edu.br' as const,
    authoritySourceRef:
      'https://ouropreto.ifmg.edu.br/ouropreto/sobre-o-campus/area-de-imprensa/conhecimento-em-um-minuto-1/ampliacao-da-base-minds-libras-a-partir-da-disponibilizacao-em-massa-de-videos-como-consequencia-das-atividades-remotas-devido-a-pandemia-da-covid-19' as const,
    sourceClass: 'official_ifmg_project_page' as const,
  }),
  Object.freeze({
    contactId: 'frederico_guimaraes_ufmg' as const,
    name: 'Frederico Gadelha Guimaraes' as const,
    roleRelevance:
      'MINDS founder and MINDS-Libras thesis advisor' as const,
    email: 'fredericoguimaraes@ufmg.br' as const,
    authoritySourceRef:
      'https://dcc.ufmg.br/professor/frederico-gadelha-guimaraes/' as const,
    sourceClass: 'official_ufmg_faculty_page' as const,
  }),
] as const);

export const FR300_R1S_Q_INQUIRY_PACKET = Object.freeze({
  purpose:
    'resolve_participant_and_data_use_scope_before_any_subject_artifact_inspection' as const,
  language: 'english' as const,
  sendAuthorized: false as const,
  sendPerformed: false as const,
  contactOrder: Object.freeze([
    'silvia_almeida_ifmg',
    'frederico_guimaraes_ufmg',
  ] as const),
  subject:
    'MINDS-Libras RGB-D dataset — participant/data-use scope clarification' as const,
  questions: Object.freeze([
    Object.freeze({
      id: 'Q1' as const,
      text:
        'Did the original participant consent or data-use authorization permit third-party use of identifiable facial RGB, depth, and 1,347-point FaceModel data for commercial product or service research, development, and validation?' as const,
      required: true as const,
    }),
    Object.freeze({
      id: 'Q2' as const,
      text:
        'If yes, does that permission include development and validation of facial-geometry measurement software when the purpose is not biometric identity recognition?' as const,
      required: true as const,
    }),
    Object.freeze({
      id: 'Q3' as const,
      text:
        'Are there restrictions on storing or processing the facial data, deriving numerical validation measurements, or publishing only aggregate and non-identifying validation results?' as const,
      required: true as const,
    }),
    Object.freeze({
      id: 'Q4' as const,
      text:
        'Is there an authoritative participant-consent, data-use, ethics, or image-rights document that can be cited or supplied for this scope?' as const,
      required: true as const,
    }),
    Object.freeze({
      id: 'Q5' as const,
      text:
        'Does the CC BY 4.0 Zenodo distribution have participant-rights or data-use restrictions that are not expressed in the dataset copyright license?' as const,
      required: true as const,
    }),
  ]),
  prohibitedClaims: Object.freeze([
    'cc_by_4_0_proves_participant_commercial_consent',
    'public_release_proves_commercial_product_development_permission',
    'absence_of_public_consent_text_proves_no_consent_existed',
  ] as const),
});

export const FR300_R1S_Q_CURRENT_GATE = Object.freeze({
  schemaVersion: 'fr300-r1s-q-minds-rights-inquiry-gate-v1' as const,
  watchtowerTrack: 'face-engine' as const,
  status:
    'public_search_exhausted_inquiry_packet_prepared_not_sent' as const,
  paidSpendAuthorized: false as const,
  externalContactAuthorized: false as const,
  externalContactPerformed: false as const,
  subjectArtifactInspectionAuthorized: false as const,
  subjectArtifactDownloadPerformed: false as const,
  fr299EligibleCandidateCount: 0 as const,
  fr300R2EligibleCandidateCount: 0 as const,
  nextActionWithoutNewAuthorization:
    'hold_minds_and_evaluate_next_zero_cost_candidate_or_existing_hardware_path' as const,
  actionIfExternalContactLaterAuthorized:
    'send_inquiry_packet_then_wait_for_source_bound_answer_before_subject_artifact_inspection' as const,
  authority: Object.freeze({
    realFR299BundleAuthorized: false as const,
    fr300R2Authorized: false as const,
    productColumnMaterialized: false as const,
    productionActivated: false as const,
    commerceActivated: false as const,
  }),
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-300-R1S-Q ${message}`);
}

export function assertFR300R1SQMindsRightsInquiryContract(): void {
  assertFR300R1SRightsMindsParticipantScopeContract();

  if (
    FR300_R1S_RIGHTS_MINDS_PARTICIPANT_SCOPE_CONTRACT_VERSION !==
      'FR300-R1S-RIGHTS-MINDS-PARTICIPANT-SCOPE-v1' ||
    FR300_R1S_RIGHTS_CURRENT_GATE.authority.externalContactAuthorized ||
    FR300_R1S_RIGHTS_CURRENT_GATE.authority.subjectArtifactInspectionAuthorized
  ) {
    fail('R1S-RIGHTS predecessor gate drift.');
  }

  if (
    FR300_R1S_Q_PUBLIC_SEARCH_ADJUDICATION.searchState !==
      'public_source_search_exhausted_for_current_surface' ||
    FR300_R1S_Q_PUBLIC_SEARCH_ADJUDICATION
      .participantCommercialProductDevelopmentScope !==
      'unresolved_after_additional_public_search' ||
    FR300_R1S_Q_PUBLIC_SEARCH_ADJUDICATION.consentNeverExistedClaimed ||
    FR300_R1S_Q_PUBLIC_SEARCH_ADJUDICATION
      .publicDatasetReleaseEqualsCommercialParticipantConsent
  ) {
    fail('public-search adjudication overclaimed participant authority.');
  }

  if (
    FR300_R1S_Q_OFFICIAL_CONTACT_ROUTES.length !== 2 ||
    FR300_R1S_Q_OFFICIAL_CONTACT_ROUTES.some((contact) => {
      const domain = contact.email.split('@')[1];
      return (
        !['ifmg.edu.br', 'ufmg.br'].includes(domain ?? '') ||
        !contact.sourceClass.startsWith('official_')
      );
    })
  ) {
    fail('contact routes must remain institutionally source-bound.');
  }

  if (
    FR300_R1S_Q_INQUIRY_PACKET.questions.length !== 5 ||
    FR300_R1S_Q_INQUIRY_PACKET.questions.some(
      (question) => !question.required,
    ) ||
    FR300_R1S_Q_INQUIRY_PACKET.sendAuthorized ||
    FR300_R1S_Q_INQUIRY_PACKET.sendPerformed
  ) {
    fail('rights inquiry packet authority drift.');
  }

  if (
    FR300_R1S_Q_CURRENT_GATE.paidSpendAuthorized ||
    FR300_R1S_Q_CURRENT_GATE.externalContactAuthorized ||
    FR300_R1S_Q_CURRENT_GATE.externalContactPerformed ||
    FR300_R1S_Q_CURRENT_GATE.subjectArtifactInspectionAuthorized ||
    FR300_R1S_Q_CURRENT_GATE.subjectArtifactDownloadPerformed ||
    FR300_R1S_Q_CURRENT_GATE.fr299EligibleCandidateCount !== 0 ||
    FR300_R1S_Q_CURRENT_GATE.fr300R2EligibleCandidateCount !== 0 ||
    FR300_R1S_Q_CURRENT_GATE.authority.realFR299BundleAuthorized ||
    FR300_R1S_Q_CURRENT_GATE.authority.fr300R2Authorized
  ) {
    fail('inquiry preparation widened operational authority.');
  }

  if (
    !FR300_R1S_RIGHTS_PUBLIC_SOURCE_REVIEW.sources.some(
      (source) =>
        source.sourceClass === 'peer_reviewed_dataset_article',
    )
  ) {
    fail('prior peer-reviewed source review disappeared.');
  }

  assertFR293ProductColumnMap();
  const materializedCount = FR293_PRODUCT_COLUMN_MAP.filter(
    (item) =>
      item.implementationState === 'canonical_extractor_materialized',
  ).length;
  if (materializedCount !== 18) {
    fail('R1S-Q must preserve 18/29 product materialization.');
  }
}

assertFR300R1SQMindsRightsInquiryContract();
