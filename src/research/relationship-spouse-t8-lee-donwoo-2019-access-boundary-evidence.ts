import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8ShinYoungho2019AccessBoundaryEvidence } from './relationship-spouse-t8-shin-youngho-2019-access-boundary-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_LEE_DONWOO_2019_ACCESS_BOUNDARY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-lee-donwoo-2019-access-boundary-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_LEE_DONWOO_2019_ACCESS_BOUNDARY_CANDIDATE = Object.freeze({
  candidateId: 'LEE_DONWOO_2019_RISS_UBE_DCOLLECTION_TLS_ACCESS_BOUNDARY',
  author: '이돈우',
  publicationYear: 2019,
  title: '古典 『命理約言』 이론 硏究',
  school: '국제뇌교육종합대학원대학교',
  degreeType: '국내박사',
  rissId: 'T15169251',
  rissControlNo: '5bc6b703fc5455b2ffe0bdc3ef48d419',
  nationalLibraryLocalBibno: 'KDM201955652',
  disposableAcquisitionPr: 484,
  acquisitionPrClosedUnmerged: true as const,
  acquisitionExactHead: 'fbeb468475bf292b8a07e010a977c29a09183ad6',
  acquisitionRunId: 34708333568,
  acquisitionArtifactId: 10302686537,
  acquisitionArtifactDigest:
    'sha256:6afa5779433a9d45ef36cd313f8c37b702ee566359f21b4f947c627e84886037',
  ciRunId: 34708333526,
  pccRunId: 34708333542,
  pieRunId: 34708333745,
  identityResolution: Object.freeze({
    source: 'CURRENT_PUBLIC_RISS_EXACT_THESIS_SEARCH_RESULT_CARD',
    rule: 'EXACT_SITE_AUTHORED_RESULT_CARD_TITLE_AUTHOR_YEAR_SCHOOL_AND_LITERAL_DETAIL_ROUTE',
    searchResponseBytes: 202_339,
    searchResponseSha256: 'b45ea381463207b02d921a5b55fd7c7e00fcb1fc5d830dabc1f8abeafdc1f6e1',
    siteAuthoredDetailUrl:
      'https://www.riss.kr/search/detail/DetailView.do?p_mat_type=be54d9b8bc7cdb09&control_no=5bc6b703fc5455b2ffe0bdc3ef48d419&keyword=古典 『命理約言』 이론 硏究',
    searchCardTitle: '古典 『命理約言』 이론 硏究',
    searchCardMetadata: '이돈우 국제뇌교육종합대학원대학교 2019 국내박사',
    searchCardPublicOriginalLabelObserved: true as const,
    detailResponseBytes: 242_618,
    detailResponseSha256: '32c5aaa950de1f34e9e6dd6d3bb19e3606a0fc102573297bcd878a8ab7be7fd0',
  }),
  rissFulltextTuple: Object.freeze({
    control_no: '5bc6b703fc5455b2ffe0bdc3ef48d419',
    p_mat_type: 'be54d9b8bc7cdb09',
    p_submat_type: 'b51fa0b5ced94fec',
    fulltext_kind: 'a8cb3aaead67ab5b',
  }),
  rissSiteAuthoredDispatcherObserved: true as const,
  rissDispatcherHttpStatus: 200,
  rissDispatcherContentType: 'text/html; charset=utf-8',
  rissDispatcherResponseBytes: 7_990,
  rissDispatcherResponseSha256: '6a1ef9dcb84135efd577d3f10faf6a7edcf655e2b987d7066250db217beb16e4',
  rissAuthoredDcollectionUrl: 'http://ube.dcollection.net/common/orgView/200000181223',
  dcollectionHost: 'ube.dcollection.net',
  dcollectionSiteAuthoredItemId: '200000181223',
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
    publicTocConfucianYukchinHeadingObserved: true as const,
    publicTocConfucianYukchinHeading: '유교적 관점의 육친론(六親論) 35',
    publicTocYukchinHeadingObserved: true as const,
    publicTocYukchinHeading: '육친론(六親論) 82',
    publicTocFemaleFateHeadingObserved: true as const,
    publicTocFemaleFateHeading: '성정(性情), 질병(疾病), 여명(女命), 소아(小兒) 89',
    spouseSpecificSelectorClaimObservedAtBodyLevel: false as const,
    admittedAsBodyLevelRoleNeutralMapping: false as const,
    boundary:
      'The public RISS table of contents exposes Yukchin and female-fate section headings, but those headings are metadata rather than the complete dissertation body. They cannot establish or reject a native-sex-independent or partner-sex-independent natal spouse selector.',
  }),
  explicitRoleNeutralNatalMappingGapClosedByThisEvidence: false as const,
  currentGovernedSemanticCorrespondenceGapClosedByThisEvidence: false as const,
  relationshipT6InputGapClosedByThisEvidence: false as const,
  exactBoundary:
    'The current public RISS result card independently identified Lee Donwoo, University of Brain Education, 2019, domestic doctorate, with the exact classic Myeongri Yakeon theory thesis title. The card supplied control 5bc6b703fc5455b2ffe0bdc3ef48d419 and its literal detail route. The detail exposed the single RISS identifier T15169251, National Assembly local bibliographic number KDM201955652, and form tuple be54d9b8bc7cdb09 / b51fa0b5ced94fec / a8cb3aaead67ab5b. The current site-authored RISS dispatcher returned HTTP 200 and authored http://ube.dcollection.net/common/orgView/200000181223. Following only that literal route under standard certificate verification stopped with CERTIFICATE_VERIFY_FAILED. No TLS validation bypass, opaque identifier guessing, protected-route bypass, or complete thesis body acquisition occurred; therefore no body-level spouse-selector admission or rejection decision is made.',
  noStitchingBoundary:
    'Lee Donwoo 2019 search, abstract/catalog, table of contents, detail, dispatcher, and transport metadata remains discovery/access evidence only. It is not combined with Shin Youngho 2019, Kim Giyong 2017, Choi Sanggil 2020, Kim Youngsook 2026, Son Jusaeng 2020, Song Jaewoo 2023, Jeon Suhyun 2016, or any other partial authority to manufacture the missing single-native role-neutral natal spouse selector.',
});

export const RELATIONSHIP_SPOUSE_T8_LEE_DONWOO_2019_ACCESS_BOUNDARY_CONTROL_IDS = Object.freeze([
  'LEE_DONWOO_2019_EXACT_RISS_THESIS_SEARCH_CARD_IDENTITY_IS_PINNED',
  'DISPOSABLE_ACQUISITION_PR_484_IS_CLOSED_UNMERGED',
  'EXACT_RISS_ID_CONTROL_FULLTEXT_TUPLE_AND_NANET_BIBNO_ARE_PINNED',
  'CURRENT_RISS_SITE_AUTHORED_DISPATCHER_CONTRACT_IS_OBSERVED',
  'RISS_SEARCH_DETAIL_AND_DISPATCHER_RESPONSES_ARE_CONTENT_ADDRESSED',
  'RISS_AUTHORED_UBE_DCOLLECTION_ITEM_ROUTE_IS_PINNED_WITHOUT_IDENTIFIER_GUESSING',
  'UBE_DCOLLECTION_CERTIFICATE_CHAIN_CANNOT_BE_VALIDATED_BY_HOSTED_RUNNER',
  'TLS_CERTIFICATE_VERIFICATION_IS_NOT_DISABLED_TO_CROSS_THE_ACCESS_BOUNDARY',
  'NO_LOGIN_INSTITUTION_PAYWALL_DRM_OR_DECRYPTION_BYPASS_IS_PERFORMED',
  'NO_COMPLETE_PDF_OR_DIRECT_BODY_IS_CLAIMED',
  'PUBLIC_TOC_YUKCHIN_AND_FEMALE_FATE_HEADINGS_REMAIN_DISCOVERY_METADATA_ONLY',
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

export interface RelationshipSpouseT8LeeDonwoo2019AccessBoundaryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_LEE_DONWOO_2019_ACCESS_BOUNDARY_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status:
    | 'PUBLIC_ROUTE_TLS_VERIFICATION_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION'
    | 'UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidate: typeof RELATIONSHIP_SPOUSE_T8_LEE_DONWOO_2019_ACCESS_BOUNDARY_CANDIDATE;
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
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_LEE_DONWOO_2019_ACCESS_BOUNDARY_CONTROL_IDS)[number][];
  controlCount: number;
  recommendedNextAction:
    | 'CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_TLS_VALIDATION_BYPASS_OR_CROSS_SOURCE_STITCHING'
    | 'REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE';
}

type UpstreamReport = ReturnType<typeof buildRelationshipSpouseT8ShinYoungho2019AccessBoundaryEvidence>;

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

export function buildRelationshipSpouseT8LeeDonwoo2019AccessBoundaryEvidence(): RelationshipSpouseT8LeeDonwoo2019AccessBoundaryEvidenceReport {
  const upstream = buildRelationshipSpouseT8ShinYoungho2019AccessBoundaryEvidence();
  const accepted = upstreamTwoOfFiveStateAccepted(upstream);
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_LEE_DONWOO_2019_ACCESS_BOUNDARY_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status: accepted
      ? ('PUBLIC_ROUTE_TLS_VERIFICATION_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION' as const)
      : ('UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID' as const),
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidate: RELATIONSHIP_SPOUSE_T8_LEE_DONWOO_2019_ACCESS_BOUNDARY_CANDIDATE,
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
      ? RELATIONSHIP_SPOUSE_T8_LEE_DONWOO_2019_ACCESS_BOUNDARY_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted ? RELATIONSHIP_SPOUSE_T8_LEE_DONWOO_2019_ACCESS_BOUNDARY_CONTROL_IDS.length : 0,
    recommendedNextAction: accepted
      ? ('CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_TLS_VALIDATION_BYPASS_OR_CROSS_SOURCE_STITCHING' as const)
      : ('REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE' as const),
  };
  return {
    evidenceId: `relationship_spouse_t8_lee_donwoo_2019_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
