import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8ChoiMisook2023AccessBoundaryEvidence } from './relationship-spouse-t8-choi-misook-2023-access-boundary-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_SON_GUHA_2020_ACCESS_BOUNDARY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-son-guha-2020-access-boundary-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_SON_GUHA_2020_ACCESS_BOUNDARY_CANDIDATE = Object.freeze({
  candidateId: 'SON_GUHA_2020_RISS_DONGBANG_DCOLLECTION_TLS_ACCESS_BOUNDARY',
  author: '손구하',
  publicationYear: 2020,
  title: '조선시대 명과학(命課學)과 단건업(段建業)의 맹파명리(盲波命理)에 관한 연구',
  school: '동방문화대학원대학교',
  degreeType: '국내박사',
  rissId: 'T15540068',
  rissControlNo: '2f46d72928c0f7c8ffe0bdc3ef48d419',
  nationalLibraryLocalBibno: 'KDM202021114',
  disposableAcquisitionPr: 498,
  acquisitionPrClosedUnmerged: true as const,
  supersededFailedAcquisitionHead: '5668dbdf6787d2130fc107c0f4884d4a17a7cad2',
  acquisitionExactHead: '1ea01c37ee383d3b4d7513199955ba3907f6dd04',
  acquisitionRunId: 34716157765,
  acquisitionArtifactId: 10303994162,
  acquisitionArtifactDigest:
    'sha256:17beda00d6249340c77e944255d5dcb8f63adf639f88e025d6058fead05c9152',
  ciRunId: 34716157723,
  pccRunId: 34716157701,
  pieRunId: 34716158107,
  identityResolution: Object.freeze({
    source: 'CURRENT_PUBLIC_RISS_EXACT_THESIS_SEARCH_RESULT_CARD',
    rule: 'EXACT_SITE_AUTHORED_RESULT_CARD_TITLE_AUTHOR_YEAR_SCHOOL_ALIAS_AND_LITERAL_DETAIL_ROUTE',
    searchResponseBytes: 186_888,
    searchResponseSha256: 'f5d3d7150c3d368cdc941a7aa5d459b1f04a33df1e3e207c1ff8bbc9deff0129',
    siteAuthoredDetailUrl:
      'https://www.riss.kr/search/detail/DetailView.do?p_mat_type=be54d9b8bc7cdb09&control_no=2f46d72928c0f7c8ffe0bdc3ef48d419&keyword=조선시대 명과학(命課學)과 단건업(段建業)의 맹파명리(盲波命理)에 관한 연구',
    searchCardTitle: '조선시대 명과학(命課學)과 단건업(段建業)의 맹파명리(盲波命理)에 관한 연구',
    searchCardMetadata: '손구하 東方文化大學院大學校 2020 국내박사',
    normalizedSchoolLabel: '동방문화대학원대학교',
    siteAuthoredSchoolLabel: '東方文化大學院大學校',
    searchCardPublicOriginalLabelObserved: true as const,
    detailResponseBytes: 326_023,
    detailResponseSha256: 'baf684906904c220991907f9cc930525811e9d90c6cbe1d303c40b481be0b30e',
  }),
  rissFulltextTuple: Object.freeze({
    control_no: '2f46d72928c0f7c8ffe0bdc3ef48d419',
    p_mat_type: 'be54d9b8bc7cdb09',
    p_submat_type: 'b51fa0b5ced94fec',
    fulltext_kind: 'a8cb3aaead67ab5b',
  }),
  rissSiteAuthoredDispatcherObserved: true as const,
  rissDispatcherHttpStatus: 200,
  rissDispatcherContentType: 'text/html; charset=utf-8',
  rissDispatcherResponseBytes: 8_477,
  rissDispatcherResponseSha256: 'c2ce2aa0c0edc4146eb208822b3dfc1c52f65eff1f9e822fd0b12cd134119bae',
  rissAuthoredDcollectionUrl: 'http://dongbang.dcollection.net/common/orgView/200000300081',
  dcollectionHost: 'dongbang.dcollection.net',
  dcollectionSiteAuthoredItemId: '200000300081',
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
    mingpaMingliStudyObservedInTitle: true as const,
    duanJianyeLineageObservedInTitle: true as const,
    palaceHostGuestTenGodOperationalRelevanceIsDiscoveryOnly: true as const,
    spouseSpecificSelectorClaimObservedAtBodyLevel: false as const,
    admittedAsBodyLevelRoleNeutralMapping: false as const,
    boundary:
      'The public title and catalog identify a study of Joseon Myeonggwahak and Duan Jianye Mingpa Mingli. Any palace, host-guest, Ten-God, or spouse relevance suggested by discovery surfaces remains metadata-level only because the complete dissertation body was not acquired. Those surfaces cannot establish or reject a native-sex-independent or partner-sex-independent natal spouse selector.',
  }),
  explicitRoleNeutralNatalMappingGapClosedByThisEvidence: false as const,
  currentGovernedSemanticCorrespondenceGapClosedByThisEvidence: false as const,
  relationshipT6InputGapClosedByThisEvidence: false as const,
  exactBoundary:
    'The current public RISS result card independently identified Son Guha, Dongbang Culture Graduate University, 2020, domestic doctorate, with the exact Joseon Myeonggwahak and Duan Jianye Mingpa Mingli dissertation title. The site-authored card rendered the institution as 東方文化大學院大學校, accepted only as the explicit site-authored label for the same normalized school identity, and supplied control 2f46d72928c0f7c8ffe0bdc3ef48d419 plus its literal detail route. The detail exposed the single RISS identifier T15540068, National Assembly local bibliographic number KDM202021114, and form tuple be54d9b8bc7cdb09 / b51fa0b5ced94fec / a8cb3aaead67ab5b. The current site-authored RISS dispatcher returned HTTP 200 and authored http://dongbang.dcollection.net/common/orgView/200000300081. Following only that literal route under standard certificate verification stopped with CERTIFICATE_VERIFY_FAILED. No TLS validation bypass, opaque identifier guessing, protected-route bypass, or complete dissertation body acquisition occurred; therefore no body-level spouse-selector admission or rejection decision is made.',
  noStitchingBoundary:
    'Son Guha 2020 search, title/catalog, detail, dispatcher, Mingpa relevance, and transport metadata remains discovery/access evidence only. It is not combined with Choi Misook 2023, Lee Donwoo 2019, Shin Youngho 2019, Song Jaewoo 2023, Kweon Sujeong 2021, Jung Su-a 2025, or any other partial authority to manufacture the missing single-native role-neutral natal spouse selector.',
});

export const RELATIONSHIP_SPOUSE_T8_SON_GUHA_2020_ACCESS_BOUNDARY_CONTROL_IDS = Object.freeze([
  'SON_GUHA_2020_EXACT_RISS_THESIS_SEARCH_CARD_IDENTITY_IS_PINNED',
  'DISPOSABLE_ACQUISITION_PR_498_IS_CLOSED_UNMERGED',
  'INITIAL_FAILED_ACQUISITION_HEAD_IS_EXPLICITLY_SUPERSEDED',
  'SITE_AUTHORED_HANJA_SCHOOL_LABEL_IS_ACCEPTED_ONLY_AS_EXACT_IDENTITY_ALIAS',
  'EXACT_RISS_ID_CONTROL_FULLTEXT_TUPLE_AND_NANET_BIBNO_ARE_PINNED',
  'CURRENT_RISS_SITE_AUTHORED_DISPATCHER_CONTRACT_IS_OBSERVED',
  'RISS_SEARCH_DETAIL_AND_DISPATCHER_RESPONSES_ARE_CONTENT_ADDRESSED',
  'RISS_AUTHORED_DONGBANG_DCOLLECTION_ITEM_ROUTE_IS_PINNED_WITHOUT_IDENTIFIER_GUESSING',
  'DONGBANG_DCOLLECTION_CERTIFICATE_CHAIN_CANNOT_BE_VALIDATED_BY_HOSTED_RUNNER',
  'TLS_CERTIFICATE_VERIFICATION_IS_NOT_DISABLED_TO_CROSS_THE_ACCESS_BOUNDARY',
  'NO_LOGIN_INSTITUTION_PAYWALL_DRM_OR_DECRYPTION_BYPASS_IS_PERFORMED',
  'NO_COMPLETE_PDF_OR_DIRECT_BODY_IS_CLAIMED',
  'MINGPA_PALACE_HOST_GUEST_TEN_GOD_RELEVANCE_REMAINS_DISCOVERY_METADATA_ONLY',
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

export interface RelationshipSpouseT8SonGuha2020AccessBoundaryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_SON_GUHA_2020_ACCESS_BOUNDARY_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status:
    | 'PUBLIC_ROUTE_TLS_VERIFICATION_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION'
    | 'UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidate: typeof RELATIONSHIP_SPOUSE_T8_SON_GUHA_2020_ACCESS_BOUNDARY_CANDIDATE;
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
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_SON_GUHA_2020_ACCESS_BOUNDARY_CONTROL_IDS)[number][];
  controlCount: number;
  recommendedNextAction:
    | 'CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_TLS_VALIDATION_BYPASS_OR_CROSS_SOURCE_STITCHING'
    | 'REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE';
}

type UpstreamReport = ReturnType<typeof buildRelationshipSpouseT8ChoiMisook2023AccessBoundaryEvidence>;

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

export function buildRelationshipSpouseT8SonGuha2020AccessBoundaryEvidence(): RelationshipSpouseT8SonGuha2020AccessBoundaryEvidenceReport {
  const upstream = buildRelationshipSpouseT8ChoiMisook2023AccessBoundaryEvidence();
  const accepted = upstreamTwoOfFiveStateAccepted(upstream);
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_SON_GUHA_2020_ACCESS_BOUNDARY_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status: accepted
      ? ('PUBLIC_ROUTE_TLS_VERIFICATION_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION' as const)
      : ('UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID' as const),
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidate: RELATIONSHIP_SPOUSE_T8_SON_GUHA_2020_ACCESS_BOUNDARY_CANDIDATE,
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
      ? RELATIONSHIP_SPOUSE_T8_SON_GUHA_2020_ACCESS_BOUNDARY_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted ? RELATIONSHIP_SPOUSE_T8_SON_GUHA_2020_ACCESS_BOUNDARY_CONTROL_IDS.length : 0,
    recommendedNextAction: accepted
      ? ('CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_TLS_VALIDATION_BYPASS_OR_CROSS_SOURCE_STITCHING' as const)
      : ('REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE' as const),
  };
  return {
    evidenceId: `relationship_spouse_t8_son_guha_2020_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
