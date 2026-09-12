import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8NamJiho2019AccessBoundaryEvidence } from './relationship-spouse-t8-nam-jiho-2019-access-boundary-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_PARK_BYEONGGEUN_2021_ACCESS_BOUNDARY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-park-byeonggeun-2021-access-boundary-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_PARK_BYEONGGEUN_2021_ACCESS_BOUNDARY_CANDIDATE = Object.freeze({
  candidateId: 'PARK_BYEONGGEUN_2021_RISS_KONGJU_DCOLLECTION_TLS_ACCESS_BOUNDARY',
  author: '박병근',
  publicationYear: 2021,
  title: '宮合의 吉凶 분석방법 연구',
  school: '공주대학교 일반대학원',
  rissId: 'T15747226',
  rissControlNo: '3fb62c8e8f683132ffe0bdc3ef48d419',
  disposableAcquisitionPr: 438,
  acquisitionPrClosedUnmerged: true as const,
  acquisitionExactHead: '8700973bc52987d759dc74df5ac93f7d5b8d6204',
  acquisitionRunId: 34680473197,
  acquisitionArtifactId: 10293242746,
  acquisitionArtifactDigest:
    'sha256:f2b2c1b7c42908fd250f7162914555e240371bf5753d48f2e0849e080734c50b',
  ciRunId: 34680473217,
  pccRunId: 34680473138,
  pieRunId: 34680473459,
  identityResolution: Object.freeze({
    source: 'CURRENT_PUBLIC_RISS_TITLE_SEARCH',
    rule: 'EXACT_TITLE_AUTHOR_YEAR_FROM_SITE_AUTHORED_SEARCH_RESULT_LINK_ONLY',
    searchResponseBytes: 195_564,
    searchResponseSha256: '9d856f27a71fbfb014917e6b712714b19fb25e7bc34561b56756e2e46f4d1087',
    siteAuthoredDetailUrl:
      'https://www.riss.kr/search/detail/DetailView.do?p_mat_type=be54d9b8bc7cdb09&control_no=3fb62c8e8f683132ffe0bdc3ef48d419&keyword=宮合의 吉凶 분석방법 연구',
    detailResponseBytes: 243_643,
    detailResponseSha256: '7c32656397f4cb918fdc1947ddc0a0be8b8c85c92317fd28db7ac07d46b88964',
  }),
  rissFulltextTuple: Object.freeze({
    control_no: '3fb62c8e8f683132ffe0bdc3ef48d419',
    p_mat_type: 'be54d9b8bc7cdb09',
    p_submat_type: 'f1a8c7a1de0e08b8',
    fulltext_kind: 'a8cb3aaead67ab5b',
  }),
  rissSiteAuthoredDispatcherObserved: true as const,
  rissDispatcherHttpStatus: 200,
  rissDispatcherContentType: 'text/html; charset=utf-8',
  rissDispatcherResponseBytes: 7_885,
  rissDispatcherResponseSha256: '214672728493ff227b759bc271049631ddb0ed46070ce49640db9073d1eb8ae5',
  rissAuthoredDcollectionUrl: 'https://kongju.dcollection.net/common/orgView/200001001101',
  dcollectionHost: 'kongju.dcollection.net',
  dcollectionSiteAuthoredItemId: '200001001101',
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
  explicitRoleNeutralNatalMappingGapClosedByThisEvidence: false as const,
  currentGovernedSemanticCorrespondenceGapClosedByThisEvidence: false as const,
  relationshipT6InputGapClosedByThisEvidence: false as const,
  exactBoundary:
    'The exact Park Byeonggeun 2021 RISS record was resolved from a current public RISS title search by following only a site-authored detail link whose returned page matched title, author, and year. The detail form supplied the exact fulltext tuple, and the current RISS dispatcher authored https://kongju.dcollection.net/common/orgView/200001001101. Following that literal route under standard certificate verification stopped with CERTIFICATE_VERIFY_FAILED. TLS verification was not disabled, no opaque identifier was guessed, no protected route was bypassed, and no complete thesis body was acquired; therefore no body-level semantic admission decision is made.',
  noStitchingBoundary:
    'Park Byeonggeun 2021 abstract and catalog language about single and complex marital compatibility remains discovery metadata only. It is not combined with Nam Jiho 2019, Nam Gidong 2020, Hong Seungpil 2017, Lee Changim 2016, or any other partial authority to manufacture the missing single-native role-neutral natal spouse selector.',
});

export const RELATIONSHIP_SPOUSE_T8_PARK_BYEONGGEUN_2021_ACCESS_BOUNDARY_CONTROL_IDS = Object.freeze([
  'PARK_BYEONGGEUN_2021_EXACT_TITLE_AUTHOR_YEAR_SCHOOL_RISS_ID_AND_CONTROL_ARE_PINNED',
  'EXACT_IDENTITY_WAS_RESOLVED_FROM_CURRENT_RISS_TITLE_SEARCH_WITHOUT_OPAQUE_ID_GUESSING',
  'DISPOSABLE_ACQUISITION_PR_438_IS_CLOSED_UNMERGED',
  'EXACT_RISS_FULLTEXT_FORM_TUPLE_IS_PINNED',
  'CURRENT_RISS_SITE_AUTHORED_DISPATCHER_CONTRACT_IS_OBSERVED',
  'RISS_SEARCH_DETAIL_AND_DISPATCHER_RESPONSES_ARE_CONTENT_ADDRESSED',
  'RISS_AUTHORED_KONGJU_DCOLLECTION_ITEM_ROUTE_IS_PINNED_WITHOUT_IDENTIFIER_GUESSING',
  'KONGJU_HTTPS_CERTIFICATE_CHAIN_CANNOT_BE_VALIDATED_BY_HOSTED_RUNNER',
  'TLS_CERTIFICATE_VERIFICATION_IS_NOT_DISABLED_TO_CROSS_THE_ACCESS_BOUNDARY',
  'NO_LOGIN_INSTITUTION_PAYWALL_DRM_OR_DECRYPTION_BYPASS_IS_PERFORMED',
  'NO_COMPLETE_PDF_OR_DIRECT_BODY_IS_CLAIMED',
  'ABSTRACT_OR_METADATA_IS_NOT_TREATED_AS_BODY_EVIDENCE',
  'NO_BODY_LEVEL_ROLE_NEUTRAL_ADMISSION_VERDICT_IS_INFERRED_WITHOUT_BODY',
  'NO_CROSS_SOURCE_STITCHING_TO_MANUFACTURE_MISSING_SELECTOR',
  'QUALIFYING_PRIMARY_WITNESS_REMAINS_CLOSED',
  'INDEPENDENT_NORMATIVE_PROVENANCE_REMAINS_CLOSED',
  'EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_REMAINS_OPEN',
  'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN',
  'RELATIONSHIP_T6_INPUT_REMAINS_OPEN',
  'EXACTLY_TWO_OF_FIVE_AUTHORITY_GAPS_REMAIN_CLOSED_AND_PRODUCTION_REMAINS_HOLD',
] as const);

export interface RelationshipSpouseT8ParkByeonggeun2021AccessBoundaryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_PARK_BYEONGGEUN_2021_ACCESS_BOUNDARY_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status:
    | 'PUBLIC_ROUTE_TLS_VERIFICATION_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION'
    | 'UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidate: typeof RELATIONSHIP_SPOUSE_T8_PARK_BYEONGGEUN_2021_ACCESS_BOUNDARY_CANDIDATE;
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
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_PARK_BYEONGGEUN_2021_ACCESS_BOUNDARY_CONTROL_IDS)[number][];
  controlCount: number;
  recommendedNextAction:
    | 'CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_TLS_VALIDATION_BYPASS_OR_CROSS_SOURCE_STITCHING'
    | 'REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE';
}

type UpstreamReport = ReturnType<typeof buildRelationshipSpouseT8NamJiho2019AccessBoundaryEvidence>;

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

export function buildRelationshipSpouseT8ParkByeonggeun2021AccessBoundaryEvidence(): RelationshipSpouseT8ParkByeonggeun2021AccessBoundaryEvidenceReport {
  const upstream = buildRelationshipSpouseT8NamJiho2019AccessBoundaryEvidence();
  const accepted = upstreamTwoOfFiveStateAccepted(upstream);
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_PARK_BYEONGGEUN_2021_ACCESS_BOUNDARY_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status: accepted
      ? ('PUBLIC_ROUTE_TLS_VERIFICATION_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION' as const)
      : ('UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID' as const),
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidate: RELATIONSHIP_SPOUSE_T8_PARK_BYEONGGEUN_2021_ACCESS_BOUNDARY_CANDIDATE,
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
      ? RELATIONSHIP_SPOUSE_T8_PARK_BYEONGGEUN_2021_ACCESS_BOUNDARY_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted
      ? RELATIONSHIP_SPOUSE_T8_PARK_BYEONGGEUN_2021_ACCESS_BOUNDARY_CONTROL_IDS.length
      : 0,
    recommendedNextAction: accepted
      ? ('CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_TLS_VALIDATION_BYPASS_OR_CROSS_SOURCE_STITCHING' as const)
      : ('REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE' as const),
  };

  return {
    evidenceId: `relationship_spouse_t8_park_byeonggeun_2021_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
