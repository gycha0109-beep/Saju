import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8ChoiSanggil2020AccessBoundaryEvidence } from './relationship-spouse-t8-choi-sanggil-2020-access-boundary-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_KIM_GIYONG_2017_ACCESS_BOUNDARY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-kim-giyong-2017-access-boundary-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_KIM_GIYONG_2017_ACCESS_BOUNDARY_CANDIDATE = Object.freeze({
  candidateId: 'KIM_GIYONG_2017_RISS_DISPATCHER_NO_PUBLIC_BODY_ROUTE_BOUNDARY',
  author: '김기용',
  publicationYear: 2017,
  title: '관상12궁과 사주육친의 상관성 비교고찰',
  school: '경기대학교 예술대학원',
  degreeType: '국내석사',
  rissId: 'T14596182',
  rissControlNo: 'c269f5bc89f6ee1cffe0bdc3ef48d419',
  disposableAcquisitionPr: 478,
  acquisitionPrClosedUnmerged: true as const,
  acquisitionExactHead: 'f5a13d2bf8c469ad2e886d2d0b427ce41c08ba9d',
  acquisitionRunId: 34706049397,
  acquisitionArtifactId: 10301384973,
  acquisitionArtifactDigest:
    'sha256:8061694f17980f5c69158fc0749acc17407a83fb78c82c41de827d09006064d3',
  ciRunId: 34706049329,
  pccRunId: 34706049450,
  pieRunId: 34706049710,
  identityResolution: Object.freeze({
    source: 'CURRENT_PUBLIC_RISS_EXACT_THESIS_SEARCH_RESULT_CARD',
    rule: 'EXACT_SITE_AUTHORED_RESULT_CARD_TITLE_AUTHOR_YEAR_SCHOOL_AND_LITERAL_DETAIL_ROUTE',
    searchResponseBytes: 185_262,
    searchResponseSha256: '7329eeb7370945cfe7a45c3ee40b30be1d5ad95325d44e5195682b8b2d886dd3',
    siteAuthoredDetailUrl:
      'https://www.riss.kr/search/detail/DetailView.do?p_mat_type=be54d9b8bc7cdb09&control_no=c269f5bc89f6ee1cffe0bdc3ef48d419&keyword=관상12궁과 사주육친의 상관성 비교고찰',
    searchCardTitle: '관상12궁과 사주육친의 상관성 비교고찰',
    searchCardMetadata: '김기용 경기대학교 예술대학원 2017 국내석사',
    searchCardPublicOriginalLabelObserved: true as const,
    detailResponseBytes: 245_968,
    detailResponseSha256: '8215d2138966871d2550042799ae41f601bad94583b32dd15f1a70dc3b2552d3',
  }),
  rissFulltextTuple: Object.freeze({
    control_no: 'c269f5bc89f6ee1cffe0bdc3ef48d419',
    p_mat_type: 'be54d9b8bc7cdb09',
    p_submat_type: 'f1a8c7a1de0e08b8',
    fulltext_kind: 'a8cb3aaead67ab5b',
  }),
  rissSiteAuthoredDispatcherObserved: true as const,
  rissDispatcherHttpStatus: 200,
  rissDispatcherContentType: 'text/html; charset=utf-8',
  rissDispatcherResponseBytes: 8_278,
  rissDispatcherResponseSha256: '83068fc6fc9310ded8819284b07a2dcde7631b730f6df0aca88f4d807441480f',
  rissDispatcherExternalPublicBodyUrls: Object.freeze([] as string[]),
  rissDispatcherDisposition: 'RISS_DISPATCHER_NO_RELEVANT_PUBLIC_BODY_ROUTE_OBSERVED' as const,
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
  catalogScopeSignal: Object.freeze({
    physiognomyTwelvePalaceAndSajuYukchinComparisonObserved: true as const,
    publicTocSpousePalaceAndWealthStarHeadingObserved: true as const,
    publicTocSpousePalaceAndWealthStarHeading: '3) 처첩궁과 재성 118',
    spouseSpecificSelectorClaimObservedAtBodyLevel: false as const,
    admittedAsBodyLevelRoleNeutralMapping: false as const,
    boundary:
      'The public RISS detail metadata includes a table-of-contents heading "3) 처첩궁과 재성 118". A table-of-contents heading is discovery metadata, not the complete thesis body, and therefore cannot establish or reject a native-sex-independent or partner-sex-independent natal spouse selector.',
  }),
  explicitRoleNeutralNatalMappingGapClosedByThisEvidence: false as const,
  currentGovernedSemanticCorrespondenceGapClosedByThisEvidence: false as const,
  relationshipT6InputGapClosedByThisEvidence: false as const,
  exactBoundary:
    'The current public RISS result card independently identified Kim Giyong, Kyonggi University Graduate School of Arts, 2017, domestic master, with the exact physiognomy Twelve-Palace and Saju-Yukchin comparison thesis title. The card supplied control c269f5bc89f6ee1cffe0bdc3ef48d419 and its literal detail route. The detail exposed the single RISS identifier T14596182 and form tuple be54d9b8bc7cdb09 / f1a8c7a1de0e08b8 / a8cb3aaead67ab5b. The current site-authored RISS dispatcher returned HTTP 200 with no relevant external dCollection or public body URL. Although the public detail metadata includes the table-of-contents heading "3) 처첩궁과 재성 118", no complete PDF/body was acquired. No opaque identifier guessing or protected-route bypass was used; therefore no body-level spouse-selector admission or rejection decision is made.',
  noStitchingBoundary:
    'Kim Giyong 2017 search, abstract/catalog, table-of-contents, detail, and dispatcher metadata remains discovery/access evidence only. It is not combined with Choi Sanggil 2020, Kim Youngsook 2026, Son Jusaeng 2020, Song Jaewoo 2023, Jeon Suhyun 2016, or any other partial authority to manufacture the missing single-native role-neutral natal spouse selector.',
});

export const RELATIONSHIP_SPOUSE_T8_KIM_GIYONG_2017_ACCESS_BOUNDARY_CONTROL_IDS = Object.freeze([
  'KIM_GIYONG_2017_EXACT_RISS_THESIS_SEARCH_CARD_IDENTITY_IS_PINNED',
  'DISPOSABLE_ACQUISITION_PR_478_IS_CLOSED_UNMERGED',
  'EXACT_RISS_ID_CONTROL_AND_FULLTEXT_TUPLE_ARE_PINNED',
  'CURRENT_RISS_SITE_AUTHORED_DISPATCHER_CONTRACT_IS_OBSERVED',
  'RISS_SEARCH_DETAIL_AND_DISPATCHER_RESPONSES_ARE_CONTENT_ADDRESSED',
  'SEARCH_CARD_ORIGINAL_VIEW_LABEL_DOES_NOT_EQUAL_BODY_ACQUISITION',
  'CURRENT_RISS_DISPATCHER_AUTHORS_NO_RELEVANT_EXTERNAL_PUBLIC_BODY_ROUTE',
  'PUBLIC_TOC_SPOUSE_PALACE_WEALTH_STAR_HEADING_IS_DISCOVERY_ONLY',
  'NO_OPAQUE_IDENTIFIER_GUESSING_OR_PROTECTED_ROUTE_BYPASS_IS_PERFORMED',
  'NO_LOGIN_INSTITUTION_PAYWALL_DRM_DECRYPTION_OR_TLS_BYPASS_IS_PERFORMED',
  'NO_COMPLETE_PDF_OR_DIRECT_BODY_IS_CLAIMED',
  'ABSTRACT_CATALOG_OR_TOC_IS_NOT_TREATED_AS_BODY_EVIDENCE',
  'NO_BODY_LEVEL_ROLE_NEUTRAL_ADMISSION_OR_REJECTION_VERDICT_IS_INFERRED_WITHOUT_BODY',
  'NO_CROSS_SOURCE_STITCHING_TO_MANUFACTURE_MISSING_SELECTOR',
  'QUALIFYING_PRIMARY_WITNESS_REMAINS_CLOSED',
  'INDEPENDENT_NORMATIVE_PROVENANCE_REMAINS_CLOSED',
  'EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_REMAINS_OPEN',
  'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN',
  'RELATIONSHIP_T6_INPUT_REMAINS_OPEN',
  'EXACTLY_TWO_OF_FIVE_AUTHORITY_GAPS_REMAIN_CLOSED_AND_PRODUCTION_REMAINS_HOLD',
] as const);

export interface RelationshipSpouseT8KimGiyong2017AccessBoundaryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_KIM_GIYONG_2017_ACCESS_BOUNDARY_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status:
    | 'PUBLIC_RISS_DISPATCHER_NO_PUBLIC_BODY_ROUTE_NO_BODY_LEVEL_ADMISSION_DECISION'
    | 'UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidate: typeof RELATIONSHIP_SPOUSE_T8_KIM_GIYONG_2017_ACCESS_BOUNDARY_CANDIDATE;
  exactUpstreamTwoOfFiveStateAccepted: boolean;
  exactPublicIdentityAndRouteInspected: true;
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
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_KIM_GIYONG_2017_ACCESS_BOUNDARY_CONTROL_IDS)[number][];
  controlCount: number;
  recommendedNextAction:
    | 'CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_OPAQUE_ID_GUESSING_OR_CROSS_SOURCE_STITCHING'
    | 'REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE';
}

type UpstreamReport = ReturnType<typeof buildRelationshipSpouseT8ChoiSanggil2020AccessBoundaryEvidence>;

function upstreamTwoOfFiveStateAccepted(upstream: UpstreamReport): boolean {
  return (
    upstream.status === 'PUBLIC_ROUTE_TLS_VERIFICATION_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION' &&
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

export function buildRelationshipSpouseT8KimGiyong2017AccessBoundaryEvidence(): RelationshipSpouseT8KimGiyong2017AccessBoundaryEvidenceReport {
  const upstream = buildRelationshipSpouseT8ChoiSanggil2020AccessBoundaryEvidence();
  const accepted = upstreamTwoOfFiveStateAccepted(upstream);
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_KIM_GIYONG_2017_ACCESS_BOUNDARY_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status: accepted
      ? ('PUBLIC_RISS_DISPATCHER_NO_PUBLIC_BODY_ROUTE_NO_BODY_LEVEL_ADMISSION_DECISION' as const)
      : ('UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID' as const),
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidate: RELATIONSHIP_SPOUSE_T8_KIM_GIYONG_2017_ACCESS_BOUNDARY_CANDIDATE,
    exactUpstreamTwoOfFiveStateAccepted: accepted,
    exactPublicIdentityAndRouteInspected: true as const,
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
      ? RELATIONSHIP_SPOUSE_T8_KIM_GIYONG_2017_ACCESS_BOUNDARY_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted ? RELATIONSHIP_SPOUSE_T8_KIM_GIYONG_2017_ACCESS_BOUNDARY_CONTROL_IDS.length : 0,
    recommendedNextAction: accepted
      ? ('CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_OPAQUE_ID_GUESSING_OR_CROSS_SOURCE_STITCHING' as const)
      : ('REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE' as const),
  };
  return {
    evidenceId: `relationship_spouse_t8_kim_giyong_2017_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
