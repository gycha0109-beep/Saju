import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8ParkByeonggeun2021AccessBoundaryEvidence } from './relationship-spouse-t8-park-byeonggeun-2021-access-boundary-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_KIM_INSUN_2014_ACCESS_BOUNDARY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-kim-insun-2014-access-boundary-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_KIM_INSUN_2014_ACCESS_BOUNDARY_CANDIDATE = Object.freeze({
  candidateId: 'KIM_INSUN_2014_RISS_UBE_DCOLLECTION_TLS_ACCESS_BOUNDARY',
  author: '김인순',
  publicationYear: 2014,
  title: '命理學의 宮合論 比較硏究 - 宮合論의 論爭點을 중심으로 -',
  school: '국제뇌교육종합대학원대학교 국학과',
  rissId: 'T14317928',
  rissControlNo: '3020e7280620761dffe0bdc3ef48d419',
  disposableAcquisitionPr: 440,
  acquisitionPrClosedUnmerged: true as const,
  acquisitionExactHead: '771f690c878ea2dcd38dd0ec39b2610c49643204',
  acquisitionRunId: 34681591787,
  acquisitionArtifactId: 10293879851,
  acquisitionArtifactDigest:
    'sha256:5ce2b785ee7b1723895df823aaec77cab4368a26e03ba9d5303a12cf0542f84f',
  ciRunId: 34681591776,
  pccRunId: 34681591772,
  pieRunId: 34681592014,
  identityResolution: Object.freeze({
    source: 'CURRENT_PUBLIC_RISS_TITLE_SEARCH',
    rule: 'EXACT_TITLE_AUTHOR_YEAR_FROM_SITE_AUTHORED_SEARCH_RESULT_LINK_ONLY',
    searchResponseBytes: 185_981,
    searchResponseSha256: 'eb583a54df6563daab5093785ca5b703f7702c782de6635dac6f168465b34756',
    siteAuthoredDetailUrl:
      'https://www.riss.kr/search/detail/DetailView.do?p_mat_type=be54d9b8bc7cdb09&control_no=3020e7280620761dffe0bdc3ef48d419&keyword=命理學의 宮合論 比較硏究 - 宮合論의 論爭點을 중심으로 -',
    detailResponseBytes: 238_948,
    detailResponseSha256: 'b6efb332ab33bcb8f3c64a7b328d2f405414c7b64c4816d217d089b9e60f3c70',
  }),
  rissFulltextTuple: Object.freeze({
    control_no: '3020e7280620761dffe0bdc3ef48d419',
    p_mat_type: 'be54d9b8bc7cdb09',
    p_submat_type: 'b51fa0b5ced94fec',
    fulltext_kind: 'a8cb3aaead67ab5b',
  }),
  rissSiteAuthoredDispatcherObserved: true as const,
  rissDispatcherHttpStatus: 200,
  rissDispatcherContentType: 'text/html; charset=utf-8',
  rissDispatcherResponseBytes: 8_335,
  rissDispatcherResponseSha256: 'c448060be0965f54a5c6a83adb4f16705166da8853f81cbbafbdd9ef7d03cd4f',
  rissSiteAuthoredNationalLibraryLocalBibno: 'KDM201502546',
  rissAuthoredDcollectionUrl:
    'http://ube.dcollection.net/jsp/common/DcLoOrgPer.jsp?sItemId=000002322906',
  dcollectionHost: 'ube.dcollection.net',
  dcollectionSiteAuthoredItemId: '000002322906',
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
    'The exact Kim Insun 2014 RISS record was resolved from a current public RISS title search by following only a site-authored detail link whose returned page matched the candidate author, year, and compatibility-comparison title. The accepted detail supplied RISS ID T14317928, control 3020e7280620761dffe0bdc3ef48d419, the exact fulltext tuple, and site-authored nationalLibraryLocalBibno KDM201502546. The current RISS dispatcher authored http://ube.dcollection.net/jsp/common/DcLoOrgPer.jsp?sItemId=000002322906. Following that literal route under standard redirect and certificate verification stopped with CERTIFICATE_VERIFY_FAILED. TLS verification was not disabled, no opaque identifier was guessed, no protected route was bypassed, and no complete thesis body was acquired; therefore no body-level semantic admission decision is made.',
  noStitchingBoundary:
    'Kim Insun 2014 catalog, search, abstract, and transport metadata remains discovery evidence only. It is not combined with Park Byeonggeun 2021, Nam Jiho 2019, Nam Gidong 2020, Hong Seungpil 2017, Lee Changim 2016, or any other partial authority to manufacture the missing single-native role-neutral natal spouse selector.',
});

export const RELATIONSHIP_SPOUSE_T8_KIM_INSUN_2014_ACCESS_BOUNDARY_CONTROL_IDS = Object.freeze([
  'KIM_INSUN_2014_EXACT_TITLE_AUTHOR_YEAR_SCHOOL_RISS_ID_AND_CONTROL_ARE_PINNED',
  'EXACT_IDENTITY_WAS_RESOLVED_FROM_CURRENT_RISS_TITLE_SEARCH_WITHOUT_OPAQUE_ID_GUESSING',
  'DISPOSABLE_ACQUISITION_PR_440_IS_CLOSED_UNMERGED',
  'EXACT_RISS_FULLTEXT_FORM_TUPLE_IS_PINNED',
  'CURRENT_RISS_SITE_AUTHORED_DISPATCHER_CONTRACT_IS_OBSERVED',
  'RISS_SEARCH_DETAIL_AND_DISPATCHER_RESPONSES_ARE_CONTENT_ADDRESSED',
  'RISS_SITE_AUTHORED_NATIONAL_LIBRARY_LOCAL_BIBNO_IS_PINNED',
  'RISS_AUTHORED_UBE_DCOLLECTION_ITEM_ROUTE_IS_PINNED_WITHOUT_IDENTIFIER_GUESSING',
  'UBE_HTTPS_CERTIFICATE_CHAIN_CANNOT_BE_VALIDATED_BY_HOSTED_RUNNER',
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

export interface RelationshipSpouseT8KimInsun2014AccessBoundaryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_KIM_INSUN_2014_ACCESS_BOUNDARY_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status:
    | 'PUBLIC_ROUTE_TLS_VERIFICATION_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION'
    | 'UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidate: typeof RELATIONSHIP_SPOUSE_T8_KIM_INSUN_2014_ACCESS_BOUNDARY_CANDIDATE;
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
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_KIM_INSUN_2014_ACCESS_BOUNDARY_CONTROL_IDS)[number][];
  controlCount: number;
  recommendedNextAction:
    | 'CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_TLS_VALIDATION_BYPASS_OR_CROSS_SOURCE_STITCHING'
    | 'REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE';
}

type UpstreamReport = ReturnType<typeof buildRelationshipSpouseT8ParkByeonggeun2021AccessBoundaryEvidence>;

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

export function buildRelationshipSpouseT8KimInsun2014AccessBoundaryEvidence(): RelationshipSpouseT8KimInsun2014AccessBoundaryEvidenceReport {
  const upstream = buildRelationshipSpouseT8ParkByeonggeun2021AccessBoundaryEvidence();
  const accepted = upstreamTwoOfFiveStateAccepted(upstream);
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_KIM_INSUN_2014_ACCESS_BOUNDARY_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status: accepted
      ? ('PUBLIC_ROUTE_TLS_VERIFICATION_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION' as const)
      : ('UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID' as const),
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidate: RELATIONSHIP_SPOUSE_T8_KIM_INSUN_2014_ACCESS_BOUNDARY_CANDIDATE,
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
      ? RELATIONSHIP_SPOUSE_T8_KIM_INSUN_2014_ACCESS_BOUNDARY_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted
      ? RELATIONSHIP_SPOUSE_T8_KIM_INSUN_2014_ACCESS_BOUNDARY_CONTROL_IDS.length
      : 0,
    recommendedNextAction: accepted
      ? ('CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_TLS_VALIDATION_BYPASS_OR_CROSS_SOURCE_STITCHING' as const)
      : ('REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE' as const),
  };

  return {
    evidenceId: `relationship_spouse_t8_kim_insun_2014_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
