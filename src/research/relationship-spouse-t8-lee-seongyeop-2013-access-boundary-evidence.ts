import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8SonGuha2020AccessBoundaryEvidence } from './relationship-spouse-t8-son-guha-2020-access-boundary-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_LEE_SEONGYEOP_2013_ACCESS_BOUNDARY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-lee-seongyeop-2013-access-boundary-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_LEE_SEONGYEOP_2013_ACCESS_BOUNDARY_CANDIDATE = Object.freeze({
  candidateId: 'LEE_SEONGYEOP_2013_RISS_DISPATCHER_NO_PUBLIC_BODY_ROUTE_ACCESS_BOUNDARY',
  author: '이성엽',
  publicationYear: 2013,
  title: '四柱命理의 宮位論에 관한 硏究',
  school: '경기대학교 문화예술대학원',
  degreeType: '국내석사',
  rissId: 'T13275169',
  rissControlNo: '47682d4d6655c6d5ffe0bdc3ef48d419',
  disposableAcquisitionPr: 500,
  acquisitionPrClosedUnmerged: true as const,
  acquisitionExactHead: '435b24c6f935250827b1b8d877a47b81464ef6e8',
  acquisitionRunId: 34717534314,
  acquisitionArtifactId: 10305651065,
  acquisitionArtifactDigest:
    'sha256:d01723b03cdc88a509369f3131789d98a08eb35beae837676a56622ddc7e0fa1',
  ciRunId: 34717534254,
  pccRunId: 34717534281,
  pieRunId: 34717534544,
  identityResolution: Object.freeze({
    source: 'CURRENT_PUBLIC_RISS_EXACT_THESIS_SEARCH_RESULT_CARD',
    rule: 'EXACT_SITE_AUTHORED_RESULT_CARD_TITLE_AUTHOR_YEAR_SCHOOL_AND_LITERAL_DETAIL_ROUTE',
    searchResponseBytes: 185_012,
    searchResponseSha256: 'cba9d388b5fd82d1acecba3a4a426ae06aa7a53d2cc3f23f6f0a9ac89215fa6b',
    siteAuthoredDetailUrl:
      'https://www.riss.kr/search/detail/DetailView.do?p_mat_type=be54d9b8bc7cdb09&control_no=47682d4d6655c6d5ffe0bdc3ef48d419&keyword=四柱命理의 宮位論에 관한 硏究',
    searchCardTitle: '四柱命理의 宮位論에 관한 硏究',
    searchCardMetadata: '이성엽 경기대학교 문화예술대학원 2013 국내석사',
    detailResponseBytes: 248_156,
    detailResponseSha256: 'bd1a1604a648cf476321b9a0c9fb4edb8cb2b1f429a1838a5c9cf6c15987141b',
  }),
  rissFulltextTuple: Object.freeze({
    control_no: '47682d4d6655c6d5ffe0bdc3ef48d419',
    p_mat_type: 'be54d9b8bc7cdb09',
    p_submat_type: 'f1a8c7a1de0e08b8',
    fulltext_kind: 'a8cb3aaead67ab5b',
  }),
  rissSiteAuthoredDispatcherObserved: true as const,
  rissDispatcherHttpStatus: 200,
  rissDispatcherContentType: 'text/html; charset=utf-8',
  rissDispatcherResponseBytes: 8_021,
  rissDispatcherResponseSha256: 'ba8080f8efd15e437f761e66c2add36dd28f7fdfb013b17e4b8cc23369fced8f',
  rissDispatcherExternalPublicBodyUrls: Object.freeze([] as string[]),
  rissDispatcherPublicBodyRouteObserved: false as const,
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
  acquisitionArtifactFileCount: 8,
  acquisitionArtifactContainsPdf: false as const,
  acquisitionArtifactContainsExtractedBodyText: false as const,
  acquisitionArtifactContainsRenderedPages: false as const,
  catalogScopeSignal: Object.freeze({
    palaceTheoryObservedInTitle: true as const,
    natalKinPositionMethodRelevanceObservedOnlyOnPublicDiscoverySurface: true as const,
    spouseSpecificSelectorClaimObservedAtBodyLevel: false as const,
    admittedAsBodyLevelRoleNeutralMapping: false as const,
    boundary:
      'The public RISS title and catalog surfaces identify a Four-Pillars palace-position study and make natal kin-position interpretation relevant for discovery. The complete thesis body was not acquired, so those surfaces cannot establish or reject a native-sex-independent, partner-sex-independent, natal-facts-only executable spouse selector.',
  }),
  explicitRoleNeutralNatalMappingGapClosedByThisEvidence: false as const,
  currentGovernedSemanticCorrespondenceGapClosedByThisEvidence: false as const,
  relationshipT6InputGapClosedByThisEvidence: false as const,
  exactBoundary:
    'The current public RISS result card independently identified Lee Seongyeop, Kyonggi University Graduate School of Culture and Arts, 2013, domestic masters thesis, with the exact Four-Pillars palace-position title. The site-authored card supplied control 47682d4d6655c6d5ffe0bdc3ef48d419 and its literal detail route. The detail exposed the single RISS identifier T13275169 and form tuple be54d9b8bc7cdb09 / f1a8c7a1de0e08b8 / a8cb3aaead67ab5b. The current site-authored RISS dispatcher returned HTTP 200 but authored no relevant external public body URL. The bounded artifact contained only RISS search/detail/dispatcher surfaces and observed scripts, with no PDF, extracted thesis body, dCollection page, or rendered pages. No opaque identifier guessing or protected-route bypass occurred; therefore no body-level spouse-selector admission or rejection decision is made.',
  noStitchingBoundary:
    'Lee Seongyeop 2013 search, title/catalog, detail, dispatcher, palace-theory relevance, and access metadata remains discovery/access evidence only. It is not combined with Son Guha 2020, Choi Misook 2023, Lee Donwoo 2019, Kweon Sujeong 2021, Jung Su-a 2025, or any other partial authority to manufacture the missing single-native role-neutral natal spouse selector.',
});

export const RELATIONSHIP_SPOUSE_T8_LEE_SEONGYEOP_2013_ACCESS_BOUNDARY_CONTROL_IDS = Object.freeze([
  'LEE_SEONGYEOP_2013_EXACT_RISS_THESIS_SEARCH_CARD_IDENTITY_IS_PINNED',
  'DISPOSABLE_ACQUISITION_PR_500_IS_CLOSED_UNMERGED',
  'EXACT_RISS_ID_CONTROL_AND_FULLTEXT_TUPLE_ARE_PINNED',
  'CURRENT_RISS_SITE_AUTHORED_DISPATCHER_CONTRACT_IS_OBSERVED',
  'RISS_SEARCH_DETAIL_AND_DISPATCHER_RESPONSES_ARE_CONTENT_ADDRESSED',
  'RISS_DISPATCHER_AUTHORED_NO_RELEVANT_EXTERNAL_PUBLIC_BODY_ROUTE',
  'ACQUISITION_ARTIFACT_CONTAINS_NO_PDF_EXTRACTED_BODY_OR_RENDERED_PAGES',
  'NO_LOGIN_INSTITUTION_PAYWALL_DRM_TLS_OR_DECRYPTION_BYPASS_IS_PERFORMED',
  'NO_COMPLETE_PDF_OR_DIRECT_BODY_IS_CLAIMED',
  'PALACE_THEORY_AND_NATAL_KIN_POSITION_RELEVANCE_REMAINS_DISCOVERY_METADATA_ONLY',
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

export interface RelationshipSpouseT8LeeSeongyeop2013AccessBoundaryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_LEE_SEONGYEOP_2013_ACCESS_BOUNDARY_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status:
    | 'PUBLIC_RISS_DISPATCHER_NO_PUBLIC_BODY_ROUTE_NO_BODY_LEVEL_ADMISSION_DECISION'
    | 'UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidate: typeof RELATIONSHIP_SPOUSE_T8_LEE_SEONGYEOP_2013_ACCESS_BOUNDARY_CANDIDATE;
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
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_LEE_SEONGYEOP_2013_ACCESS_BOUNDARY_CONTROL_IDS)[number][];
  controlCount: number;
  recommendedNextAction:
    | 'CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_ACCESS_BYPASS_OR_CROSS_SOURCE_STITCHING'
    | 'REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE';
}

type UpstreamReport = ReturnType<typeof buildRelationshipSpouseT8SonGuha2020AccessBoundaryEvidence>;

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

export function buildRelationshipSpouseT8LeeSeongyeop2013AccessBoundaryEvidence(): RelationshipSpouseT8LeeSeongyeop2013AccessBoundaryEvidenceReport {
  const upstream = buildRelationshipSpouseT8SonGuha2020AccessBoundaryEvidence();
  const accepted = upstreamTwoOfFiveStateAccepted(upstream);
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_LEE_SEONGYEOP_2013_ACCESS_BOUNDARY_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status: accepted
      ? ('PUBLIC_RISS_DISPATCHER_NO_PUBLIC_BODY_ROUTE_NO_BODY_LEVEL_ADMISSION_DECISION' as const)
      : ('UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID' as const),
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidate: RELATIONSHIP_SPOUSE_T8_LEE_SEONGYEOP_2013_ACCESS_BOUNDARY_CANDIDATE,
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
      ? RELATIONSHIP_SPOUSE_T8_LEE_SEONGYEOP_2013_ACCESS_BOUNDARY_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted ? RELATIONSHIP_SPOUSE_T8_LEE_SEONGYEOP_2013_ACCESS_BOUNDARY_CONTROL_IDS.length : 0,
    recommendedNextAction: accepted
      ? ('CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_ACCESS_BYPASS_OR_CROSS_SOURCE_STITCHING' as const)
      : ('REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE' as const),
  };
  return {
    evidenceId: `relationship_spouse_t8_lee_seongyeop_2013_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
