import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8YangSoyong2025AccessBoundaryEvidence } from './relationship-spouse-t8-yang-soyong-2025-access-boundary-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_LEE_NAMYEON_KIM_KISEUNG_2022_ACCESS_BOUNDARY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-lee-namyeon-kim-kiseung-2022-access-boundary-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_LEE_NAMYEON_KIM_KISEUNG_2022_ACCESS_BOUNDARY_CANDIDATE = Object.freeze({
  candidateId: 'LEE_NAMYEON_KIM_KISEUNG_2022_FREE_PROVIDER_TOOLING_TRANSPORT_BOUNDARY',
  authors: Object.freeze(['이남연', '김기승'] as const),
  publicationYear: 2022,
  title: '명리학에서 십성(十星)의 성립과 개념 확장에 관한 연구',
  journal: '산업진흥연구',
  volume: 7,
  issue: 1,
  printedPages: '25-34',
  physicalPageCountExpected: 10,
  kciArticleId: 'ART002810441',
  doi: '10.21186/IPR.2022.7.1.025',
  rissControlNo: '6fdd5367a44d74fcb7998d826d417196',
  kissKey: '3931264',
  frontierIssue: 511,
  publicIdentitySurfaces: Object.freeze({
    kci: 'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002810441',
    kciPublisherArchive: 'https://journal.kci.go.kr/ipir/archive/articleView?artiId=ART002810441',
    riss: 'https://m.riss.kr/search/detail/DetailView.do?control_no=6fdd5367a44d74fcb7998d826d417196&p_mat_type=1a0202e37d52c72d',
    kiss: 'https://kiss.kstudy.com/Detail/Ar?key=3931264',
  }),
  providerEvidence: Object.freeze({
    rissScienceOnProviderObserved: true as const,
    rissKissProviderObserved: true as const,
    rissScienceOnMarkedFreeProvider: true as const,
    kciPublisherSearchPdfScienceOnObserved: true as const,
    kciPublisherSearchPdfRissObserved: true as const,
    doiRedirectObserved: true as const,
    doiAuthoredKoreaScienceRecord:
      'http://koreascience.or.kr/journal/view.jsp?kj=SOJHB6&py=2022&vnc=v7n1&sp=25',
    koreaScienceJournalCode: 'SOJHB6',
    koreaSciencePublicationYear: 2022,
    koreaScienceVolumeIssue: 'v7n1',
    koreaScienceStartPage: 25,
    koreaScienceIdentifiersGuessed: false as const,
    jamsExactArticleRowObserved: true as const,
  }),
  discoveryScopeSignal: Object.freeze({
    tenGodsYukchinHistoricalFormationStudied: true as const,
    modernTenGodConceptExpansionStudied: true as const,
    psychologyAndNatalAptitudeExpansionObservedInAbstract: true as const,
    spouseSpecificSelectorClaimObservedAtBodyLevel: false as const,
    admittedAsBodyLevelRoleNeutralMapping: false as const,
  }),
  currentAccessBoundary: Object.freeze({
    rissScienceOnProviderClickCompleted: false as const,
    rissScienceOnProviderClickFailureClass: 'SCIENCEON_HOST_TIMEOUT',
    doiExactKoreaScienceRedirectResolved: true as const,
    webHttpRedirectFollowed: false as const,
    webHttpRedirectStopReason: 'NON_HTTPS_REDIRECT_REJECTED_BY_TOOL_SAFETY_LAYER',
    webHttpsTransportEquivalentOpened: false as const,
    webHttpsStopReason: 'TOOL_URL_NORMALIZATION_SAFETY_REJECTION',
    containerExternalDnsAvailableForKoreaScience: false as const,
    kciConcreteOriginalFileIdentifierObserved: false as const,
    jamsArticleSpecificBodyHrefObservedOnInspectedPublicText: false as const,
    currentDirectCompleteBodyAcquired: false as const,
  }),
  guessedOpaqueIdentifierCount: 0 as const,
  loginBypass: false as const,
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
  abstractOrMetadataTreatedAsBodyEvidence: false as const,
  explicitRoleNeutralNatalMappingGapClosedByThisEvidence: false as const,
  currentGovernedSemanticCorrespondenceGapClosedByThisEvidence: false as const,
  relationshipT6InputGapClosedByThisEvidence: false as const,
  exactBoundary:
    'The current KCI, KCI publisher, RISS, KISS, DOI, and JAMS public surfaces independently identify Lee Namyeon and Kim Kiseung 2022. RISS identifies ScienceON as a free provider and KCI publisher Search PDF identifies ScienceON and RISS. The DOI itself redirects to the exact KoreaScience record with journal code SOJHB6, year 2022, volume/issue v7n1, and start page 25; these values were observed from the DOI redirect and were not guessed. The RISS-authored ScienceON provider hop timed out in the current web environment. The web safety layer rejected the DOI HTTP redirect and then rejected an HTTPS transport-equivalent request after query normalization, while the container runtime had no external DNS resolution. KCI exposed no concrete article-specific original-file identifier and the inspected JAMS text exposed no article-specific body href. No complete PDF or rendered body was acquired; therefore no body-level spouse-selector admission or rejection decision is made.',
  noStitchingBoundary:
    'The article abstract, provider metadata, Ten-God/Yukchin historical scope, and modern psychology/aptitude expansion signal remain discovery/access evidence only. They are not combined with Yang Soyong 2025, Lee Youngeun 2025, Kweon Sujeong 2021, Kim Mantae 2025, or any other source to manufacture a role-neutral spouse selector.',
});

export const RELATIONSHIP_SPOUSE_T8_LEE_NAMYEON_KIM_KISEUNG_2022_ACCESS_BOUNDARY_CONTROL_IDS = Object.freeze([
  'LEE_NAMYEON_KIM_KISEUNG_2022_EXACT_ARTICLE_IDENTITY_IS_PINNED',
  'KCI_ART002810441_DOI_RISS_CONTROL_AND_KISS_KEY_ARE_PINNED',
  'RISS_FREE_SCIENCEON_PROVIDER_RELATION_IS_OBSERVED',
  'KCI_PUBLISHER_SEARCH_PDF_SCIENCEON_AND_RISS_RELATION_IS_OBSERVED',
  'DOI_AUTHORED_EXACT_KOREASCIENCE_RECORD_IS_PINNED_WITHOUT_IDENTIFIER_GUESSING',
  'JAMS_EXACT_ARTICLE_ROW_IS_OBSERVED',
  'CURRENT_PROVIDER_HOP_STOPS_AT_TOOLING_TRANSPORT_BOUNDARY',
  'NO_KCI_CONCRETE_ORIGINAL_FILE_IDENTIFIER_IS_GUESSED_OR_REPLAYED',
  'NO_LOGIN_INSTITUTION_PAYWALL_DRM_TLS_OR_DECRYPTION_BYPASS_IS_PERFORMED',
  'NO_COMPLETE_PDF_OR_RENDERED_BODY_IS_CLAIMED',
  'ABSTRACT_PROVIDER_METADATA_AND_TOC_ARE_NOT_TREATED_AS_BODY_EVIDENCE',
  'NO_BODY_LEVEL_ROLE_NEUTRAL_ADMISSION_OR_REJECTION_VERDICT_IS_INFERRED_WITHOUT_BODY',
  'NO_CROSS_SOURCE_STITCHING_TO_MANUFACTURE_MISSING_SELECTOR',
  'QUALIFYING_PRIMARY_WITNESS_REMAINS_CLOSED',
  'INDEPENDENT_NORMATIVE_PROVENANCE_REMAINS_CLOSED',
  'EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_REMAINS_OPEN',
  'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN',
  'RELATIONSHIP_T6_INPUT_REMAINS_OPEN',
  'EXACTLY_TWO_OF_FIVE_AUTHORITY_GAPS_REMAIN_CLOSED_AND_PRODUCTION_REMAINS_HOLD',
] as const);

export interface RelationshipSpouseT8LeeNamyeonKimKiseung2022AccessBoundaryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_LEE_NAMYEON_KIM_KISEUNG_2022_ACCESS_BOUNDARY_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status:
    | 'PUBLIC_FREE_PROVIDER_TOOLING_TRANSPORT_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION'
    | 'UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidate: typeof RELATIONSHIP_SPOUSE_T8_LEE_NAMYEON_KIM_KISEUNG_2022_ACCESS_BOUNDARY_CANDIDATE;
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
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_LEE_NAMYEON_KIM_KISEUNG_2022_ACCESS_BOUNDARY_CONTROL_IDS)[number][];
  controlCount: number;
  recommendedNextAction:
    | 'CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_ACCESS_BYPASS_OR_CROSS_SOURCE_STITCHING'
    | 'REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE';
}

type UpstreamReport = ReturnType<typeof buildRelationshipSpouseT8YangSoyong2025AccessBoundaryEvidence>;

function upstreamTwoOfFiveStateAccepted(upstream: UpstreamReport): boolean {
  return (
    upstream.status === 'PUBLIC_DISCOVERY_EXTERNAL_LINK_LOGIN_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION' &&
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

export function buildRelationshipSpouseT8LeeNamyeonKimKiseung2022AccessBoundaryEvidence(): RelationshipSpouseT8LeeNamyeonKimKiseung2022AccessBoundaryEvidenceReport {
  const upstream = buildRelationshipSpouseT8YangSoyong2025AccessBoundaryEvidence();
  const accepted = upstreamTwoOfFiveStateAccepted(upstream);
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_LEE_NAMYEON_KIM_KISEUNG_2022_ACCESS_BOUNDARY_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status: accepted
      ? ('PUBLIC_FREE_PROVIDER_TOOLING_TRANSPORT_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION' as const)
      : ('UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID' as const),
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidate: RELATIONSHIP_SPOUSE_T8_LEE_NAMYEON_KIM_KISEUNG_2022_ACCESS_BOUNDARY_CANDIDATE,
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
      ? RELATIONSHIP_SPOUSE_T8_LEE_NAMYEON_KIM_KISEUNG_2022_ACCESS_BOUNDARY_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted
      ? RELATIONSHIP_SPOUSE_T8_LEE_NAMYEON_KIM_KISEUNG_2022_ACCESS_BOUNDARY_CONTROL_IDS.length
      : 0,
    recommendedNextAction: accepted
      ? ('CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_ACCESS_BYPASS_OR_CROSS_SOURCE_STITCHING' as const)
      : ('REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE' as const),
  };
  return {
    evidenceId: `relationship_spouse_t8_lee_namyeon_kim_kiseung_2022_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
