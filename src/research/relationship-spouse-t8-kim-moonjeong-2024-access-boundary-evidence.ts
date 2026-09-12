import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8ImJeongsuk2024AccessBoundaryEvidence } from './relationship-spouse-t8-im-jeongsuk-2024-access-boundary-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_KIM_MOONJEONG_2024_ACCESS_BOUNDARY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-kim-moonjeong-2024-access-boundary-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_KIM_MOONJEONG_2024_ACCESS_BOUNDARY_CANDIDATE = Object.freeze({
  candidateId: 'KIM_MOONJEONG_2024_RISS_KONGJU_DCOLLECTION_TLS_ACCESS_BOUNDARY',
  author: '김문정',
  publicationYear: 2024,
  title: '女命觀에서 배우자 宮과 星의 觀係性 硏究',
  school: '국립공주대학교 대학원',
  degreeType: '국내석사',
  rissId: 'T16939717',
  rissControlNo: 'b6d49eb4a0deaa98ffe0bdc3ef48d419',
  disposableAcquisitionPr: 459,
  acquisitionPrClosedUnmerged: true as const,
  acquisitionExactHead: '25f09c4a63e2222773ed5f44b8ca3c243d7532a9',
  acquisitionRunId: 34693881995,
  acquisitionArtifactId: 10297861917,
  acquisitionArtifactDigest:
    'sha256:014ebb0348a9f472176267c7bfe556257346fa49fed2143a0e6b5361fc348e20',
  ciRunId: 34693881932,
  pccRunId: 34693881933,
  pieRunId: 34693882150,
  identityResolution: Object.freeze({
    source: 'CURRENT_PUBLIC_RISS_EXACT_THESIS_SEARCH_RESULT_CARD',
    rule:
      'EXACT_SITE_AUTHORED_RESULT_CARD_TITLE_AUTHOR_YEAR_SCHOOL_AND_LITERAL_DETAIL_ROUTE',
    searchResponseBytes: 185_402,
    searchResponseSha256: '65cf7c829c20db50cee6321482b68a9b208d082ff90202223e2159ac611d4afa',
    siteAuthoredDetailUrl:
      'https://www.riss.kr/search/detail/DetailView.do?p_mat_type=be54d9b8bc7cdb09&control_no=b6d49eb4a0deaa98ffe0bdc3ef48d419&keyword=女命觀에서 배우자 宮과 星의 觀係性 硏究',
    searchCardTitle: '女命觀에서 배우자 宮과 星의 觀係性 硏究',
    searchCardMetadata: '김문정 국립공주대학교 대학원 2024 국내석사',
    detailResponseBytes: 240_207,
    detailResponseSha256: 'a1eb5442e41f4636e073f9580752ae8fba40de717d463bc63831eb42002dca34',
  }),
  rissFulltextTuple: Object.freeze({
    control_no: 'b6d49eb4a0deaa98ffe0bdc3ef48d419',
    p_mat_type: 'be54d9b8bc7cdb09',
    p_submat_type: 'f1a8c7a1de0e08b8',
    fulltext_kind: 'a8cb3aaead67ab5b',
  }),
  rissSiteAuthoredDispatcherObserved: true as const,
  rissDispatcherHttpStatus: 200,
  rissDispatcherContentType: 'text/html; charset=utf-8',
  rissDispatcherResponseBytes: 7_981,
  rissDispatcherResponseSha256: '90d77be30b9252de135be1795bcc7d8e74699f9ca7587bca3848e6a9c23e3763',
  rissAuthoredDcollectionUrl: 'https://kongju.dcollection.net/common/orgView/200001003221',
  dcollectionHost: 'kongju.dcollection.net',
  dcollectionSiteAuthoredItemId: '200001003221',
  dcollectionTlsCertificateVerificationFailed: true as const,
  dcollectionTlsError:
    'SSLCertVerificationError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1010)',
  tlsVerificationDisabled: false as const,
  guessedOpaqueIdentifierCount: 0 as const,
  loginBypass: false as const,
  institutionAuthBypass: false as const,
  paywallBypass: false as const,
  drmRequestExecuted: false as const,
  decryptionActionExecuted: false as const,
  crossSourceSemanticStitching: false as const,
  completePdfAcquired: false as const,
  directBodySemanticReviewPerformed: false as const,
  bodyLevelAdmissionDecisionMade: false as const,
  abstractOrMetadataTreatedAsBodyEvidence: false as const,
  catalogScopeSignal: Object.freeze({
    femaleChartCentered: true as const,
    claimsPossibleApplicationToMaleChartsAndAllKinRelations: true as const,
    admittedAsBodyLevelGeneralization: false as const,
    boundary:
      'The public abstract describes a female-chart-centered study and says case research could be extended to male charts and all kin relations. This is discovery metadata only and is not a directly reviewed body-level role-neutral spouse mapping.',
  }),
  explicitRoleNeutralNatalMappingGapClosedByThisEvidence: false as const,
  currentGovernedSemanticCorrespondenceGapClosedByThisEvidence: false as const,
  relationshipT6InputGapClosedByThisEvidence: false as const,
  exactBoundary:
    'The current public RISS thesis search result card independently identified Kim Moonjeong, Kongju National University graduate school, 2024, domestic master, title 女命觀에서 배우자 宮과 星의 觀係性 硏究. The exact site-authored card supplied control b6d49eb4a0deaa98ffe0bdc3ef48d419 and the literal detail route. The exact detail preserved the same identity signals and exposed the single RISS identifier T16939717. Its current document form supplied be54d9b8bc7cdb09 / f1a8c7a1de0e08b8 / a8cb3aaead67ab5b. The current RISS dispatcher returned HTTP 200 and authored https://kongju.dcollection.net/common/orgView/200001003221. Following only that literal route under standard certificate verification stopped with CERTIFICATE_VERIFY_FAILED. No TLS validation bypass, opaque identifier guessing, protected-route bypass, or complete thesis body acquisition occurred; therefore no body-level spouse-selector admission decision is made.',
  noStitchingBoundary:
    'Kim Moonjeong 2024 search, catalog, detail, dispatcher, and transport metadata remains discovery evidence only. It is not combined with Im Jeongsuk 2024, Kim Insun 2010, Kim Younghee 2006, Kim Insun 2014, Park Byeonggeun 2021, Nam Jiho 2019, Nam Gidong 2020, Hong Seungpil 2017, Lee Changim 2016, or any other partial authority to manufacture the missing single-native role-neutral natal spouse selector.',
});

export const RELATIONSHIP_SPOUSE_T8_KIM_MOONJEONG_2024_ACCESS_BOUNDARY_CONTROL_IDS = Object.freeze([
  'KIM_MOONJEONG_2024_EXACT_RISS_THESIS_SEARCH_CARD_IDENTITY_IS_PINNED',
  'DISPOSABLE_ACQUISITION_PR_459_IS_CLOSED_UNMERGED',
  'EXACT_RISS_ID_CONTROL_AND_FULLTEXT_TUPLE_ARE_PINNED',
  'CURRENT_RISS_SITE_AUTHORED_DISPATCHER_CONTRACT_IS_OBSERVED',
  'RISS_SEARCH_DETAIL_AND_DISPATCHER_RESPONSES_ARE_CONTENT_ADDRESSED',
  'RISS_AUTHORED_KONGJU_DCOLLECTION_ITEM_ROUTE_IS_PINNED_WITHOUT_IDENTIFIER_GUESSING',
  'KONGJU_DCOLLECTION_CERTIFICATE_CHAIN_CANNOT_BE_VALIDATED_BY_HOSTED_RUNNER',
  'TLS_CERTIFICATE_VERIFICATION_IS_NOT_DISABLED_TO_CROSS_THE_ACCESS_BOUNDARY',
  'NO_LOGIN_INSTITUTION_PAYWALL_DRM_OR_DECRYPTION_BYPASS_IS_PERFORMED',
  'NO_COMPLETE_PDF_OR_DIRECT_BODY_IS_CLAIMED',
  'ABSTRACT_OR_METADATA_IS_NOT_TREATED_AS_BODY_EVIDENCE',
  'FEMALE_CHART_ABSTRACT_SCOPE_AND_MALE_APPLICATION_STATEMENT_ARE_DISCOVERY_ONLY',
  'NO_BODY_LEVEL_ROLE_NEUTRAL_ADMISSION_VERDICT_IS_INFERRED_WITHOUT_BODY',
  'NO_CROSS_SOURCE_STITCHING_TO_MANUFACTURE_MISSING_SELECTOR',
  'QUALIFYING_PRIMARY_WITNESS_REMAINS_CLOSED',
  'INDEPENDENT_NORMATIVE_PROVENANCE_REMAINS_CLOSED',
  'EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_REMAINS_OPEN',
  'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN',
  'RELATIONSHIP_T6_INPUT_REMAINS_OPEN',
  'EXACTLY_TWO_OF_FIVE_AUTHORITY_GAPS_REMAIN_CLOSED_AND_PRODUCTION_REMAINS_HOLD',
] as const);

export interface RelationshipSpouseT8KimMoonjeong2024AccessBoundaryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_KIM_MOONJEONG_2024_ACCESS_BOUNDARY_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status:
    | 'PUBLIC_ROUTE_TLS_VERIFICATION_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION'
    | 'UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidate: typeof RELATIONSHIP_SPOUSE_T8_KIM_MOONJEONG_2024_ACCESS_BOUNDARY_CANDIDATE;
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
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_KIM_MOONJEONG_2024_ACCESS_BOUNDARY_CONTROL_IDS)[number][];
  controlCount: number;
  recommendedNextAction:
    | 'CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_TLS_VALIDATION_BYPASS_OR_CROSS_SOURCE_STITCHING'
    | 'REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE';
}

type UpstreamReport = ReturnType<typeof buildRelationshipSpouseT8ImJeongsuk2024AccessBoundaryEvidence>;

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

export function buildRelationshipSpouseT8KimMoonjeong2024AccessBoundaryEvidence(): RelationshipSpouseT8KimMoonjeong2024AccessBoundaryEvidenceReport {
  const upstream = buildRelationshipSpouseT8ImJeongsuk2024AccessBoundaryEvidence();
  const accepted = upstreamTwoOfFiveStateAccepted(upstream);
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_KIM_MOONJEONG_2024_ACCESS_BOUNDARY_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status: accepted
      ? ('PUBLIC_ROUTE_TLS_VERIFICATION_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION' as const)
      : ('UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID' as const),
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidate: RELATIONSHIP_SPOUSE_T8_KIM_MOONJEONG_2024_ACCESS_BOUNDARY_CANDIDATE,
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
      ? RELATIONSHIP_SPOUSE_T8_KIM_MOONJEONG_2024_ACCESS_BOUNDARY_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted
      ? RELATIONSHIP_SPOUSE_T8_KIM_MOONJEONG_2024_ACCESS_BOUNDARY_CONTROL_IDS.length
      : 0,
    recommendedNextAction: accepted
      ? ('CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_TLS_VALIDATION_BYPASS_OR_CROSS_SOURCE_STITCHING' as const)
      : ('REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE' as const),
  };

  return {
    evidenceId: `relationship_spouse_t8_kim_moonjeong_2024_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
