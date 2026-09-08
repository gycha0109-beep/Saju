import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAdequacyReview } from './relationship-spouse-t8-lee-youngeun-independent-normative-provenance-adequacy-review.js';

export const RELATIONSHIP_SPOUSE_T8_LEE_SUDONG_PUBLIC_ACCESS_BOUNDARY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-lee-sudong-public-access-boundary-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_LEE_SUDONG_PUBLIC_ACCESS_BOUNDARY_CANDIDATE = Object.freeze({
  candidateId: 'LEE_SUDONG_2020_PUBLIC_ACCESS_BOUNDARY',
  author: '이수동',
  publicationYear: 2020,
  title: '명리학 육친론의 이론체계 고찰 - 궁위론과 십성론을 중심으로-',
  journal: '문화와융합 제42권 제9호',
  kciArticleId: 'ART002630397',
  doi: '10.33645/cnc.2020.09.42.9.755',
  kyoboArticleBarcode: '4010027924050',
  rissId: 'A107064519',
  dbpiaNodeId: 'NODE11887585',
  bibliographicPages: '755-780',
  expectedPhysicalPages: 26,
  acquisitionPrNumber: 366,
  acquisitionExactHead: 'e104293da63cc0cafab81847e331b358656cd012',
  acquisitionRunId: 34_174_079_993,
  acquisitionArtifactId: 10_036_659_558,
  acquisitionArtifactDigest: 'e30fe997e41316e257a95a9a13583b66d6d4d4bda6739770107630ff051110f2',
  kciPreviewUrl:
    'https://www.kci.go.kr/kciportal/ci/sereArticleSearch/artiPreView.kci?sereArticleSearchBean.artiId=ART002630397&v=2019',
  kciPreviewSha256: '4348a037c0511debf6dfddf82502e7535967d798c8b95dac50710148780801b5',
  kciPreviewBytes: 417_988,
  kciPreviewPageCount: 1,
  kciPreviewEncrypted: true as const,
  kciPreviewTextHealthy: true as const,
  kciFullOriginalPubliclyAvailable: false as const,
  kciOriginalBoundaryMessage: '공개되지 않은 원문입니다.',
  kyoboPublicPdfRouteExposed: false as const,
  dbpiaDetailUrl: 'https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE11887585',
  dbpiaExactViewerUrl: 'https://www.dbpia.co.kr/pdf/pdfView.do?nodeId=NODE11887585',
  dbpiaDetailExposesReadCall: true as const,
  dbpiaDetailExposesDownloadCall: true as const,
  dbpiaViewerJavascriptExposesStandardViewerShape: true as const,
  dbpiaUnauthenticatedFulltextGateExplicit: true as const,
  dbpiaLoginGateExplicit: true as const,
  dbpiaInstitutionAuthenticationGateExplicit: true as const,
  dbpiaPurchaseGateExplicit: true as const,
  publicFullLengthPdfAcquired: false as const,
  directFullBodyInspected: false as const,
  previewOnlyEvidence: true as const,
  previewExplicitlyFramesResearchAsInnateNatal: true as const,
  previewExplicitlyDefinesYukchinIncludingSpouseAsWifeHusband: true as const,
  abstractDiscoveryMentionsSpousePalaceAndGyeokgukYongshin: true as const,
  roleNeutralNatalSelectorFound: false as const,
  roleNeutralNatalSelectorAbsenceProven: false as const,
  roleNeutralNatalSelectorStatus: 'NOT_ESTABLISHED_DUE_TO_DIRECT_BODY_ACCESS_BOUNDARY' as const,
  completeRoleNeutralNatalInputContractEstablished: false as const,
  explicitRoleNeutralNatalMappingGapClosedByThisEvidence: false as const,
  currentGovernedSemanticCorrespondenceGapClosedByThisEvidence: false as const,
  relationshipT6InputGapClosedByThisEvidence: false as const,
  exactPositiveBoundary:
    'The public one-page KCI preview and bibliographic abstracts make Lee Sudong 2020 a high-relevance natal candidate: the article explicitly frames family harmony and disharmony through innate birth-chart factors and identifies spouse-palace and Gyeokguk/Yongshin relations as research material.',
  exactAccessBoundary:
    'The full 26-page body was not publicly acquired. KCI reports the original as non-public, the Kyobo detail exposes no public PDF delivery route, and the exact DBpia detail/viewer path exposes login, institutional-authentication, and purchase gates. The repository therefore stops before any gated access and does not infer the body-level spouse selector from the one-page preview or abstract.',
  exactSemanticBoundary:
    'This record does not claim that Lee Sudong 2020 lacks a role-neutral natal spouse selector. It records that such a selector is not established under admissible public direct-body evidence. Preview wording such as wife/husband is preserved as preview evidence only and is not promoted into a full-body semantic verdict.',
  noStitchingBoundary:
    'Lee Sudong preview/abstract signals are not combined with Lee Youngeun, Lee Ockhwa, Lee Myengjae, Hong Yooseon, Jung Su-a, Kweon Sujeong, Song Jaewoo, Kim Sanghan, Shin Jaeeok, or commercial/editorial sources to manufacture the missing role-neutral natal spouse mapping.',
});

export const RELATIONSHIP_SPOUSE_T8_LEE_SUDONG_PUBLIC_ACCESS_BOUNDARY_CONTROL_IDS = Object.freeze([
  'LEE_SUDONG_2020_IDENTITY_IS_PINNED_ACROSS_KCI_KYOBO_RISS_DBPIA',
  'LEE_SUDONG_EXACT_ACQUISITION_HEAD_AND_RUN_ARE_PINNED',
  'KCI_PREVIEW_IS_PINNED_AS_ONE_PAGE_ENCRYPTED_CONTROL_ONLY',
  'KCI_NON_PUBLIC_ORIGINAL_MESSAGE_IS_PRESERVED',
  'KYOBO_PUBLIC_DETAIL_WITHOUT_PUBLIC_PDF_ROUTE_IS_PRESERVED',
  'DBPIA_EXACT_NODE_AND_VIEWER_ROUTE_ARE_PINNED',
  'DBPIA_LOGIN_GATE_IS_PRESERVED',
  'DBPIA_INSTITUTION_AUTH_GATE_IS_PRESERVED',
  'DBPIA_PURCHASE_GATE_IS_PRESERVED',
  'NO_LOGIN_PAYWALL_OR_INSTITUTION_AUTH_BYPASS',
  'DIRECT_FULL_BODY_INSPECTION_REMAINS_FALSE',
  'PREVIEW_NATAL_RELEVANCE_IS_PRESERVED_WITHOUT_BODY_PROMOTION',
  'PREVIEW_WIFE_HUSBAND_WORDING_IS_NOT_PROMOTED_TO_BODY_VERDICT',
  'ROLE_NEUTRAL_SELECTOR_ABSENCE_IS_NOT_CLAIMED',
  'EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_REMAINS_OPEN',
  'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN',
  'RELATIONSHIP_T6_INPUT_REMAINS_OPEN',
  'EXACTLY_TWO_OF_FIVE_AUTHORITY_GAPS_REMAIN_CLOSED',
  'NO_CROSS_SOURCE_STITCHING',
  'NO_SPOUSE_T8_PRODUCER_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_EFFECT',
] as const);

export interface RelationshipSpouseT8LeeSudongPublicAccessBoundaryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_LEE_SUDONG_PUBLIC_ACCESS_BOUNDARY_EVIDENCE_VERSION;
  upstreamReviewId: string;
  status:
    | 'PUBLIC_DIRECT_BODY_ACCESS_BOUNDARY_PREVENTS_SEMANTIC_ADMISSION'
    | 'UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidate: typeof RELATIONSHIP_SPOUSE_T8_LEE_SUDONG_PUBLIC_ACCESS_BOUNDARY_CANDIDATE;
  exactUpstreamTwoOfFiveStateAccepted: boolean;
  highRelevanceNatalCandidate: true;
  directFullBodyInspected: false;
  publicFullLengthPdfAcquired: false;
  bodyLevelRoleNeutralSelectorEstablished: false;
  bodyLevelRoleNeutralSelectorAbsenceEstablished: false;
  qualifyingPrimaryWitnessRemainsClosed: boolean;
  independentNormativeProvenanceRemainsClosed: boolean;
  authorityGapsClosedCount: 2 | 0;
  authorityGapsOpenCount: 3 | 5;
  authorityAdmissionReady: false;
  crossSourceStitchingAuthorized: false;
  gatedAccessBypassAuthorized: false;
  spouseT8ProducerReady: false;
  productionPromotionReady: false;
  productionState: 'HOLD';
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_LEE_SUDONG_PUBLIC_ACCESS_BOUNDARY_CONTROL_IDS)[number][];
  controlCount: 20 | 0;
  recommendedNextAction:
    | 'CONTINUE_SINGLE_SOURCE_SCHOLARLY_DISCOVERY_FOR_PUBLICLY_INSPECTABLE_ROLE_NEUTRAL_NATAL_SPOUSE_MAPPING'
    | 'REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE';
}

function upstreamTwoOfFiveStateAccepted(): boolean {
  const upstream = buildRelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAdequacyReview();
  return (
    upstream.status === 'RESOLVED_LEE_YOUNGEUN_2025_INDEPENDENT_NORMATIVE_PROVENANCE_ADEQUACY_REVIEW' &&
    upstream.decision === 'LEE_YOUNGEUN_2025_SINGLE_SOURCE_ADEQUATE_FOR_INDEPENDENT_NORMATIVE_PROVENANCE_EXACTLY_TWO_OF_FIVE_GAPS_CLOSED' &&
    upstream.authorityGapStatus.QUALIFYING_PRIMARY_WITNESS === 'CLOSED' &&
    upstream.authorityGapStatus.INDEPENDENT_NORMATIVE_PROVENANCE === 'CLOSED' &&
    upstream.authorityGapStatus.EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING === 'OPEN' &&
    upstream.authorityGapStatus.CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE === 'OPEN' &&
    upstream.authorityGapStatus.RELATIONSHIP_T6_INPUT === 'OPEN' &&
    upstream.authorityGapsClosedCount === 2 &&
    upstream.authorityGapsOpenCount === 3 &&
    upstream.authorityAdmissionReady === false &&
    upstream.productionPromotionAuthorized === false &&
    upstream.productionState === 'HOLD'
  );
}

export function buildRelationshipSpouseT8LeeSudongPublicAccessBoundaryEvidence(): RelationshipSpouseT8LeeSudongPublicAccessBoundaryEvidenceReport {
  const upstream = buildRelationshipSpouseT8LeeYoungeunIndependentNormativeProvenanceAdequacyReview();
  const accepted = upstreamTwoOfFiveStateAccepted();
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_LEE_SUDONG_PUBLIC_ACCESS_BOUNDARY_EVIDENCE_VERSION,
    upstreamReviewId: upstream.reviewId,
    status: accepted
      ? 'PUBLIC_DIRECT_BODY_ACCESS_BOUNDARY_PREVENTS_SEMANTIC_ADMISSION' as const
      : 'UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID' as const,
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidate: RELATIONSHIP_SPOUSE_T8_LEE_SUDONG_PUBLIC_ACCESS_BOUNDARY_CANDIDATE,
    exactUpstreamTwoOfFiveStateAccepted: accepted,
    highRelevanceNatalCandidate: true as const,
    directFullBodyInspected: false as const,
    publicFullLengthPdfAcquired: false as const,
    bodyLevelRoleNeutralSelectorEstablished: false as const,
    bodyLevelRoleNeutralSelectorAbsenceEstablished: false as const,
    qualifyingPrimaryWitnessRemainsClosed: accepted,
    independentNormativeProvenanceRemainsClosed: accepted,
    authorityGapsClosedCount: accepted ? 2 as const : 0 as const,
    authorityGapsOpenCount: accepted ? 3 as const : 5 as const,
    authorityAdmissionReady: false as const,
    crossSourceStitchingAuthorized: false as const,
    gatedAccessBypassAuthorized: false as const,
    spouseT8ProducerReady: false as const,
    productionPromotionReady: false as const,
    productionState: 'HOLD' as const,
    controlIds: accepted ? RELATIONSHIP_SPOUSE_T8_LEE_SUDONG_PUBLIC_ACCESS_BOUNDARY_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 20 as const : 0 as const,
    recommendedNextAction: accepted
      ? 'CONTINUE_SINGLE_SOURCE_SCHOLARLY_DISCOVERY_FOR_PUBLICLY_INSPECTABLE_ROLE_NEUTRAL_NATAL_SPOUSE_MAPPING' as const
      : 'REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE' as const,
  };
  return {
    evidenceId: `relationship_spouse_t8_lee_sudong_public_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
