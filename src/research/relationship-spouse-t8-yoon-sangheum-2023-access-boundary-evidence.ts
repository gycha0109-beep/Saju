import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8JeonJeonghunTrainingManualDirectBodyBoundaryEvidence } from './relationship-spouse-t8-jeon-jeonghun-training-manual-direct-body-boundary-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_YOON_SANGHEUM_2023_ACCESS_BOUNDARY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-yoon-sangheum-2023-access-boundary-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_YOON_SANGHEUM_2023_ACCESS_BOUNDARY_CANDIDATE = Object.freeze({
  candidateId: 'YOON_SANGHEUM_2023_YUKCHIN_GENDER_ROLE_ACCESS_BOUNDARY',
  author: '윤상흠',
  authorEnglish: 'Yoon Sangheum',
  publicationYear: 2023,
  title: '성역할과 유전자 관점의 육친론 ― 남명 기준의 財星과 官星을 위주로 ―',
  titleEnglish:
    'Approach to the Yukchin theory in point of gender role and gene - Focusing on Jaesung and Kwansung in Saju of male-',
  journal: '동방문화와 사상',
  journalEnglish: 'East Asian Culture and Thought',
  issue: 15,
  printedPages: '33-55',
  physicalPageCountExpected: 23,
  doi: '10.35203/EACT.2023.15.33',
  kciArticleId: 'ART003042567',
  rissControlNo: '37b95c18ae24bef64884a65323211ff0',
  koreascholarDetailKey: '428909',
  frontierIssue: 523,
  publicIdentitySurfaces: Object.freeze({
    kci: 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003042567',
    riss:
      'https://m.riss.kr/search/detail/DetailView.do?control_no=37b95c18ae24bef64884a65323211ff0&p_mat_type=1a0202e37d52c72d',
    koreascholar: 'https://db.koreascholar.com/Article/Detail/428909',
    dbpia: 'https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE11788553',
  }),
  candidateDiscoverySignal: Object.freeze({
    yukchinTheoryExplicitlyStudied: true as const,
    genderRoleExplicitlyStudied: true as const,
    jaesungAndKwansungPlacementExplicitlyStudied: true as const,
    titleExplicitlyScopesStudyToMaleNative: true as const,
    candidatePrioritizedBeyondSpousePalaceOnlyMaterial: true as const,
    titleAbstractOrKeywordsTreatedAsBodyEvidence: false as const,
    spouseSelectorAdmissionOrRejectionInferredFromTitleOrAbstract: false as const,
  }),
  providerEvidence: Object.freeze({
    kciExactArticleIdentityObserved: true as const,
    kciPreviewControlLabelObserved: true as const,
    kciArticleSpecificStaticPublicPreviewHrefObserved: false as const,
    kciArticleSpecificConcreteOriginalFileIdentifierObserved: false as const,
    rissExactArticleIdentityObserved: true as const,
    rissProviderKoreascholarObserved: true as const,
    rissPaidFulltextLabelObservedOnPublicSearchSurface: true as const,
    koreascholarExactArticleIdentityObserved: true as const,
    koreascholarInstitutionSubscriptionOrIndividualPurchaseRequired: true as const,
    dbpiaExactMetadataAndAbstractObserved: true as const,
    dbpiaCompletePublicBodyObserved: false as const,
    nationalAssemblyLibraryHoldingObserved: true as const,
    nationalAssemblyLibraryRemotePublicCompleteBodyObserved: false as const,
  }),
  currentAccessBoundary: Object.freeze({
    publicSearchRecoveredCompletePdf: false as const,
    publicSearchRecoveredCompleteHtmlBody: false as const,
    kciParsedPageExposedStaticPublicPreviewBodyHref: false as const,
    connectedContainerExternalDnsAvailableForKci: false as const,
    connectedContainerKciStopReason: 'KCI_HOST_DNS_RESOLUTION_UNAVAILABLE',
    publisherProviderRequiresInstitutionOrPurchase: true as const,
    currentDirectCompleteBodyAcquired: false as const,
  }),
  guessedOpaqueIdentifierCount: 0 as const,
  loginBypass: false as const,
  sessionBypass: false as const,
  institutionAuthBypass: false as const,
  paywallBypass: false as const,
  drmRequestExecuted: false as const,
  decryptionActionExecuted: false as const,
  tlsVerificationDisabled: false as const,
  crossSourceSemanticStitching: false as const,
  completePdfAcquired: false as const,
  renderedPageCount: 0 as const,
  directBodySemanticReviewPerformed: false as const,
  bodyLevelAdmissionDecisionMade: false as const,
  semanticDisposition: 'PUBLIC_ACCESS_BOUNDARY_ONLY_NO_DIRECT_BODY_DECISION' as const,
  explicitRoleNeutralNatalMappingGapClosedByThisEvidence: false as const,
  currentGovernedSemanticCorrespondenceGapClosedByThisEvidence: false as const,
  relationshipT6InputGapClosedByThisEvidence: false as const,
  exactBoundary:
    'The exact Yoon Sangheum 2023 article identity is independently confirmed by KCI, RISS, Koreascholar, and DBpia. KCI visibly offers a preview control, but the inspected parsed page exposes no article-specific static public preview-body href or concrete original-file identifier. RISS identifies Koreascholar as provider and the public RISS search surface labels the article as paid full text. Koreascholar requires institution subscription or individual purchase. DBpia exposes metadata and abstract rather than a complete public body, and the National Assembly Library surface identifies a holding/reading-room route rather than a remote public complete body. Public searches did not recover a complete PDF or complete HTML body. Connected-container access to KCI stopped at DNS resolution. No complete body was acquired, so neither admission nor rejection of a native-sex-independent / partner-sex-independent spouse selector is inferred from the title, abstract, keywords, preview label, or provider metadata.',
  noStitchingBoundary:
    'Yoon Sangheum 2023 discovery metadata is not combined with Jeon Jeonghun, Jung Su-a, Nam/Kim 2018, Go Jaemin, Kim Mantae, Lee Namyeon/Kim Kiseung, modern web commentary, or any other source to manufacture or reject the missing complete role-neutral spouse selector.',
});

export const RELATIONSHIP_SPOUSE_T8_YOON_SANGHEUM_2023_ACCESS_BOUNDARY_CONTROL_IDS = Object.freeze([
  'YOON_SANGHEUM_2023_EXACT_ARTICLE_IDENTITY_IS_PINNED',
  'KCI_ART003042567_DOI_RISS_CONTROL_AND_KOREASCHOLAR_KEY_ARE_PINNED',
  'GENDER_ROLE_YUKCHIN_SCOPE_IS_DISCOVERY_SIGNAL_ONLY_NOT_BODY_EVIDENCE',
  'TITLE_MALE_NATIVE_SCOPE_IS_NOT_USED_AS_BODY_LEVEL_ADMISSION_OR_REJECTION',
  'KCI_PREVIEW_LABEL_IS_OBSERVED_WITHOUT_GUESSING_A_PREVIEW_OR_FILE_IDENTIFIER',
  'RISS_KOREASCHOLAR_PROVIDER_RELATION_AND_PAID_FULLTEXT_BOUNDARY_ARE_OBSERVED',
  'KOREASCHOLAR_INSTITUTION_OR_PURCHASE_BOUNDARY_IS_PRESERVED',
  'DBPIA_ABSTRACT_IS_NOT_TREATED_AS_COMPLETE_BODY',
  'NATIONAL_ASSEMBLY_LIBRARY_HOLDING_IS_NOT_TREATED_AS_REMOTE_PUBLIC_BODY',
  'CONNECTED_CONTAINER_KCI_DNS_FAILURE_IS_RECORDED_AS_TOOLING_LIMITATION',
  'NO_LOGIN_SESSION_INSTITUTION_PAYWALL_DRM_TLS_OR_DECRYPTION_BYPASS_IS_PERFORMED',
  'NO_COMPLETE_PDF_OR_RENDERED_BODY_IS_CLAIMED',
  'NO_BODY_LEVEL_ROLE_NEUTRAL_ADMISSION_OR_REJECTION_VERDICT_IS_INFERRED_WITHOUT_BODY',
  'NO_CROSS_SOURCE_STITCHING_TO_MANUFACTURE_OR_REJECT_MISSING_SELECTOR',
  'QUALIFYING_PRIMARY_WITNESS_REMAINS_CLOSED',
  'INDEPENDENT_NORMATIVE_PROVENANCE_REMAINS_CLOSED',
  'EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_REMAINS_OPEN',
  'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN',
  'RELATIONSHIP_T6_INPUT_REMAINS_OPEN',
  'EXACTLY_TWO_OF_FIVE_AUTHORITY_GAPS_REMAIN_CLOSED_AND_PRODUCTION_REMAINS_HOLD',
] as const);

export interface RelationshipSpouseT8YoonSangheum2023AccessBoundaryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_YOON_SANGHEUM_2023_ACCESS_BOUNDARY_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status:
    | 'PUBLIC_ACCESS_BOUNDARY_ONLY_NO_DIRECT_BODY_DECISION'
    | 'UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidate: typeof RELATIONSHIP_SPOUSE_T8_YOON_SANGHEUM_2023_ACCESS_BOUNDARY_CANDIDATE;
  exactUpstreamTwoOfFiveStateAccepted: boolean;
  exactPublicIdentityAndProviderBoundaryInspected: true;
  directFulltextPdfInspected: false;
  directBodySemanticReviewPerformed: false;
  bodyLevelAdmissionDecisionMade: false;
  explicitRoleNeutralNatalMappingEstablished: false;
  currentGovernedMethodSemanticCorrespondenceEstablished: false;
  currentRelationshipT6InputPathEstablished: false;
  qualifyingPrimaryWitnessRemainsClosed: boolean;
  independentNormativeProvenanceRemainsClosed: boolean;
  authorityGapsClosedCount: 2 | 0;
  authorityGapsOpenCount: 3 | 5;
  authorityAdmissionReady: false;
  crossSourceStitchingAuthorized: false;
  spouseT8ProducerReady: false;
  productionPromotionReady: false;
  productionState: 'HOLD';
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_YOON_SANGHEUM_2023_ACCESS_BOUNDARY_CONTROL_IDS)[number][];
  controlCount: number;
  recommendedNextAction:
    | 'CONTINUE_SINGLE_SOURCE_COMPLETE_ROLE_NEUTRAL_SPOUSE_SELECTOR_DISCOVERY_WITH_PUBLIC_DIRECT_BODY_PRIORITY'
    | 'REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE';
}

type UpstreamReport = ReturnType<
  typeof buildRelationshipSpouseT8JeonJeonghunTrainingManualDirectBodyBoundaryEvidence
>;

function upstreamTwoOfFiveStateAccepted(upstream: UpstreamReport): boolean {
  return (
    upstream.status ===
      'DIRECT_BODY_POSITIVE_SPOUSE_PALACE_OPERATIONAL_LAYER_NEGATIVE_COMPLETE_ROLE_NEUTRAL_SELECTOR' &&
    upstream.exactUpstreamTwoOfFiveStateAccepted === true &&
    upstream.explicitRoleNeutralNatalMappingEstablished === false &&
    upstream.currentGovernedMethodSemanticCorrespondenceEstablished === false &&
    upstream.currentRelationshipT6InputPathEstablished === false &&
    upstream.qualifyingPrimaryWitnessRemainsClosed === true &&
    upstream.independentNormativeProvenanceRemainsClosed === true &&
    upstream.authorityGapsClosedCount === 2 &&
    upstream.authorityGapsOpenCount === 3 &&
    upstream.authorityAdmissionReady === false &&
    upstream.spouseT8ProducerReady === false &&
    upstream.productionPromotionReady === false &&
    upstream.productionState === 'HOLD'
  );
}

export function buildRelationshipSpouseT8YoonSangheum2023AccessBoundaryEvidence(): RelationshipSpouseT8YoonSangheum2023AccessBoundaryEvidenceReport {
  const upstream = buildRelationshipSpouseT8JeonJeonghunTrainingManualDirectBodyBoundaryEvidence();
  const accepted = upstreamTwoOfFiveStateAccepted(upstream);
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_YOON_SANGHEUM_2023_ACCESS_BOUNDARY_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status: accepted
      ? ('PUBLIC_ACCESS_BOUNDARY_ONLY_NO_DIRECT_BODY_DECISION' as const)
      : ('UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID' as const),
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidate: RELATIONSHIP_SPOUSE_T8_YOON_SANGHEUM_2023_ACCESS_BOUNDARY_CANDIDATE,
    exactUpstreamTwoOfFiveStateAccepted: accepted,
    exactPublicIdentityAndProviderBoundaryInspected: true as const,
    directFulltextPdfInspected: false as const,
    directBodySemanticReviewPerformed: false as const,
    bodyLevelAdmissionDecisionMade: false as const,
    explicitRoleNeutralNatalMappingEstablished: false as const,
    currentGovernedMethodSemanticCorrespondenceEstablished: false as const,
    currentRelationshipT6InputPathEstablished: false as const,
    qualifyingPrimaryWitnessRemainsClosed: accepted,
    independentNormativeProvenanceRemainsClosed: accepted,
    authorityGapsClosedCount: accepted ? (2 as const) : (0 as const),
    authorityGapsOpenCount: accepted ? (3 as const) : (5 as const),
    authorityAdmissionReady: false as const,
    crossSourceStitchingAuthorized: false as const,
    spouseT8ProducerReady: false as const,
    productionPromotionReady: false as const,
    productionState: 'HOLD' as const,
    controlIds: accepted
      ? RELATIONSHIP_SPOUSE_T8_YOON_SANGHEUM_2023_ACCESS_BOUNDARY_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted
      ? RELATIONSHIP_SPOUSE_T8_YOON_SANGHEUM_2023_ACCESS_BOUNDARY_CONTROL_IDS.length
      : 0,
    recommendedNextAction: accepted
      ? ('CONTINUE_SINGLE_SOURCE_COMPLETE_ROLE_NEUTRAL_SPOUSE_SELECTOR_DISCOVERY_WITH_PUBLIC_DIRECT_BODY_PRIORITY' as const)
      : ('REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE' as const),
  };

  return {
    evidenceId: `relationship_spouse_t8_yoon_sangheum_2023_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
