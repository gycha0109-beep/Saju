import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8LeeDonwoo2019AccessBoundaryEvidence } from './relationship-spouse-t8-lee-donwoo-2019-access-boundary-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_CHOI_MISOOK_2023_ACCESS_BOUNDARY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-choi-misook-2023-access-boundary-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_CHOI_MISOOK_2023_ACCESS_BOUNDARY_CANDIDATE = Object.freeze({
  candidateId: 'CHOI_MISOOK_2023_RISS_KONGJU_DCOLLECTION_TLS_ACCESS_BOUNDARY',
  author: '최미숙',
  publicationYear: 2023,
  title:
    '淸代 命理學 十星의 體用論的 解析에 관한 硏究 : 『命理約言』·『滴天髓闡微』 十星論의 生剋制化 樣相을 中心으로',
  school: '공주대학교 대학원',
  degreeType: '국내박사',
  rissId: 'T16823751',
  rissControlNo: 'c8f38783e4b27c73ffe0bdc3ef48d419',
  disposableAcquisitionPr: 490,
  acquisitionPrClosedUnmerged: true as const,
  acquisitionExactHead: 'ad5cf1f74c78188bd6aae7c3e38e2b3dcb9f5609',
  acquisitionRunId: 34710990477,
  acquisitionArtifactId: 10303147457,
  acquisitionArtifactDigest:
    'sha256:db739d169ce9d22bed66a1308b75fe547689b3cbbb28d9f0fe40109378293e0a',
  ciRunId: 34710990434,
  pccRunId: 34710990428,
  pieRunId: 34710990685,
  identityResolution: Object.freeze({
    source: 'CURRENT_PUBLIC_RISS_EXACT_THESIS_SEARCH_RESULT_CARD',
    rule: 'EXACT_SITE_AUTHORED_RESULT_CARD_TITLE_AUTHOR_YEAR_SCHOOL_AND_LITERAL_DETAIL_ROUTE',
    searchResponseBytes: 188_152,
    searchResponseSha256: '82e875e28c7798eeb691478319516758e6162d0d1453ac810146e7043c92372d',
    siteAuthoredDetailUrl:
      'https://www.riss.kr/search/detail/DetailView.do?p_mat_type=be54d9b8bc7cdb09&control_no=c8f38783e4b27c73ffe0bdc3ef48d419',
    searchCardTitle:
      '淸代 命理學 十星의 體用論的 解析에 관한 硏究 : 『命理約言』·『滴天髓闡微』 十星論의 生剋制化 樣相을 中心으로',
    searchCardMetadata: '최미숙 공주대학교 대학원 2023 국내박사',
    searchCardPublicOriginalLabelObserved: true as const,
    detailResponseBytes: 258_625,
    detailResponseSha256: 'b87597910a231e1364eb94bd414961056dfde93853f6bd124d794dc981001ac6',
  }),
  rissFulltextTuple: Object.freeze({
    control_no: 'c8f38783e4b27c73ffe0bdc3ef48d419',
    p_mat_type: 'be54d9b8bc7cdb09',
    p_submat_type: 'b51fa0b5ced94fec',
    fulltext_kind: 'a8cb3aaead67ab5b',
  }),
  rissSiteAuthoredDispatcherObserved: true as const,
  rissDispatcherHttpStatus: 200,
  rissDispatcherContentType: 'text/html; charset=utf-8',
  rissDispatcherResponseBytes: 8_467,
  rissDispatcherResponseSha256: '42d5c23d4eb92978ea886368eae5bc4ead972c2e53144934f6ec3bd177ce01d5',
  rissAuthoredDcollectionUrl: 'https://kongju.dcollection.net/common/orgView/200001003682',
  dcollectionHost: 'kongju.dcollection.net',
  dcollectionSiteAuthoredItemId: '200001003682',
  dcollectionTlsCertificateVerificationFailed: true as const,
  dcollectionTlsError:
    'SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1010)',
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
    tenStarTheoryInTitleObserved: true as const,
    controllingGeneratingTransformationsInTitleObserved: true as const,
    comparedClassicsInTitleObserved: true as const,
    spouseSpecificSelectorClaimObservedAtBodyLevel: false as const,
    admittedAsBodyLevelRoleNeutralMapping: false as const,
    boundary:
      'The public RISS title identifies a Ten-Star / generating-controlling-transformations study centered on Myeongri Yakeon and Jeokcheonsu Cheonmi. The title and catalog metadata are discovery signals only, not the dissertation body, and cannot establish or reject a native-sex-independent or partner-sex-independent natal spouse selector.',
  }),
  explicitRoleNeutralNatalMappingGapClosedByThisEvidence: false as const,
  currentGovernedSemanticCorrespondenceGapClosedByThisEvidence: false as const,
  relationshipT6InputGapClosedByThisEvidence: false as const,
  exactBoundary:
    'The current public RISS result card independently identified Choi Misook, Kongju National University graduate school, 2023, domestic doctorate, with the exact Qing-dynasty Ten-Star theory dissertation title. The card supplied control c8f38783e4b27c73ffe0bdc3ef48d419 and its literal detail route. The detail exposed the single RISS identifier T16823751 and form tuple be54d9b8bc7cdb09 / b51fa0b5ced94fec / a8cb3aaead67ab5b. The current site-authored RISS dispatcher returned HTTP 200 and authored https://kongju.dcollection.net/common/orgView/200001003682. Following only that literal route under standard certificate verification stopped with CERTIFICATE_VERIFY_FAILED. No TLS validation bypass, opaque identifier guessing, protected-route bypass, or complete dissertation body acquisition occurred; therefore no body-level spouse-selector admission or rejection decision is made.',
  noStitchingBoundary:
    'Choi Misook 2023 search, title/catalog, detail, dispatcher, and transport metadata remains discovery/access evidence only. It is not combined with Lee Donwoo 2019, Shin Youngho 2019, Kim Giyong 2017, Choi Sanggil 2020, Song Jaewoo 2023, Jeon Suhyun 2016, or any other partial authority to manufacture the missing single-native role-neutral natal spouse selector.',
});

export const RELATIONSHIP_SPOUSE_T8_CHOI_MISOOK_2023_ACCESS_BOUNDARY_CONTROL_IDS = Object.freeze([
  'CHOI_MISOOK_2023_EXACT_RISS_THESIS_SEARCH_CARD_IDENTITY_IS_PINNED',
  'DISPOSABLE_ACQUISITION_PR_490_IS_CLOSED_UNMERGED',
  'EXACT_RISS_ID_CONTROL_AND_FULLTEXT_TUPLE_ARE_PINNED',
  'CURRENT_RISS_SITE_AUTHORED_DISPATCHER_CONTRACT_IS_OBSERVED',
  'RISS_SEARCH_DETAIL_AND_DISPATCHER_RESPONSES_ARE_CONTENT_ADDRESSED',
  'RISS_AUTHORED_KONGJU_DCOLLECTION_ITEM_ROUTE_IS_PINNED_WITHOUT_IDENTIFIER_GUESSING',
  'KONGJU_DCOLLECTION_CERTIFICATE_CHAIN_CANNOT_BE_VALIDATED_BY_HOSTED_RUNNER',
  'TLS_CERTIFICATE_VERIFICATION_IS_NOT_DISABLED_TO_CROSS_THE_ACCESS_BOUNDARY',
  'NO_LOGIN_INSTITUTION_PAYWALL_DRM_OR_DECRYPTION_BYPASS_IS_PERFORMED',
  'NO_COMPLETE_PDF_OR_DIRECT_BODY_IS_CLAIMED',
  'TEN_STAR_TITLE_SCOPE_REMAINS_DISCOVERY_METADATA_ONLY',
  'ABSTRACT_OR_METADATA_IS_NOT_TREATED_AS_BODY_EVIDENCE',
  'NO_BODY_LEVEL_ROLE_NEUTRAL_ADMISSION_OR_REJECTION_VERDICT_IS_INFERRED_WITHOUT_BODY',
  'NO_CROSS_SOURCE_STITCHING_TO_MANUFACTURE_MISSING_SELECTOR',
  'QUALIFYING_PRIMARY_WITNESS_REMAINS_CLOSED',
  'INDEPENDENT_NORMATIVE_PROVENANCE_REMAINS_CLOSED',
  'EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_REMAINS_OPEN',
  'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN',
  'RELATIONSHIP_T6_INPUT_REMAINS_OPEN',
  'EXACTLY_TWO_OF_FIVE_AUTHORITY_GAPS_REMAIN_CLOSED_AND_PRODUCTION_REMAINS_HOLD',
] as const);

export interface RelationshipSpouseT8ChoiMisook2023AccessBoundaryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_CHOI_MISOOK_2023_ACCESS_BOUNDARY_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status:
    | 'PUBLIC_ROUTE_TLS_VERIFICATION_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION'
    | 'UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidate: typeof RELATIONSHIP_SPOUSE_T8_CHOI_MISOOK_2023_ACCESS_BOUNDARY_CANDIDATE;
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
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_CHOI_MISOOK_2023_ACCESS_BOUNDARY_CONTROL_IDS)[number][];
  controlCount: number;
  recommendedNextAction:
    | 'CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_TLS_VALIDATION_BYPASS_OR_CROSS_SOURCE_STITCHING'
    | 'REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE';
}

type UpstreamReport = ReturnType<typeof buildRelationshipSpouseT8LeeDonwoo2019AccessBoundaryEvidence>;

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

export function buildRelationshipSpouseT8ChoiMisook2023AccessBoundaryEvidence(): RelationshipSpouseT8ChoiMisook2023AccessBoundaryEvidenceReport {
  const upstream = buildRelationshipSpouseT8LeeDonwoo2019AccessBoundaryEvidence();
  const accepted = upstreamTwoOfFiveStateAccepted(upstream);
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_CHOI_MISOOK_2023_ACCESS_BOUNDARY_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status: accepted
      ? ('PUBLIC_ROUTE_TLS_VERIFICATION_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION' as const)
      : ('UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID' as const),
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidate: RELATIONSHIP_SPOUSE_T8_CHOI_MISOOK_2023_ACCESS_BOUNDARY_CANDIDATE,
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
      ? RELATIONSHIP_SPOUSE_T8_CHOI_MISOOK_2023_ACCESS_BOUNDARY_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted ? RELATIONSHIP_SPOUSE_T8_CHOI_MISOOK_2023_ACCESS_BOUNDARY_CONTROL_IDS.length : 0,
    recommendedNextAction: accepted
      ? ('CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_TLS_VALIDATION_BYPASS_OR_CROSS_SOURCE_STITCHING' as const)
      : ('REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE' as const),
  };
  return {
    evidenceId: `relationship_spouse_t8_choi_misook_2023_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
