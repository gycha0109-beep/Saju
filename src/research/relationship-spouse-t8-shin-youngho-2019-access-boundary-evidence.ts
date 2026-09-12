import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8KimGiyong2017AccessBoundaryEvidence } from './relationship-spouse-t8-kim-giyong-2017-access-boundary-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_SHIN_YOUNGHO_2019_ACCESS_BOUNDARY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-shin-youngho-2019-access-boundary-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_SHIN_YOUNGHO_2019_ACCESS_BOUNDARY_CANDIDATE = Object.freeze({
  candidateId: 'SHIN_YOUNGHO_2019_RISS_DONGBANG_DCOLLECTION_TLS_ACCESS_BOUNDARY',
  author: '신영호',
  publicationYear: 2019,
  title: '『命理約言』의 知命體系 硏究',
  school: '동방문화대학원대학교',
  degreeType: '국내박사',
  rissId: 'T15099926',
  rissControlNo: 'd08ee38324aa6aeaffe0bdc3ef48d419',
  nationalLibraryLocalBibno: 'KDM201938404',
  disposableAcquisitionPr: 482,
  acquisitionPrClosedUnmerged: true as const,
  supersededFailedAcquisitionHead: '54c65993dae82f074a174d4adeb6b0a372ca30ff',
  acquisitionExactHead: '12e9ce0a794db6b1f7f53b409672a5f4fc017b2d',
  acquisitionRunId: 34707142999,
  acquisitionArtifactId: 10301937071,
  acquisitionArtifactDigest:
    'sha256:3b963ba813905651925d308a93777f395c032f12ce3806d556a39a9255131136',
  ciRunId: 34707143072,
  pccRunId: 34707143000,
  pieRunId: 34707143444,
  identityResolution: Object.freeze({
    source: 'CURRENT_PUBLIC_RISS_EXACT_THESIS_SEARCH_RESULT_CARD',
    rule: 'EXACT_SITE_AUTHORED_RESULT_CARD_TITLE_AUTHOR_YEAR_SCHOOL_ALIAS_AND_LITERAL_DETAIL_ROUTE',
    searchResponseBytes: 187_480,
    searchResponseSha256: '06b5835fe17a09333450768c270a716987773592edcc7fa52a4ae7dfc7745f21',
    siteAuthoredDetailUrl:
      'https://www.riss.kr/search/detail/DetailView.do?p_mat_type=be54d9b8bc7cdb09&control_no=d08ee38324aa6aeaffe0bdc3ef48d419&keyword=『命理約言』의 知命體系 硏究',
    searchCardTitle: '『命理約言』의 知命體系 硏究',
    searchCardMetadata: '신영호 東方文化大學院大學校 2019 국내박사',
    normalizedSchoolLabel: '동방문화대학원대학교',
    siteAuthoredSchoolLabel: '東方文化大學院大學校',
    searchCardPublicOriginalLabelObserved: true as const,
    detailResponseBytes: 257_825,
    detailResponseSha256: 'cb1d6d7721ce330231971f197e026f1c8909a86cd9c238ccd2d643e021c240cd',
  }),
  rissFulltextTuple: Object.freeze({
    control_no: 'd08ee38324aa6aeaffe0bdc3ef48d419',
    p_mat_type: 'be54d9b8bc7cdb09',
    p_submat_type: 'b51fa0b5ced94fec',
    fulltext_kind: 'a8cb3aaead67ab5b',
  }),
  rissSiteAuthoredDispatcherObserved: true as const,
  rissDispatcherHttpStatus: 200,
  rissDispatcherContentType: 'text/html; charset=utf-8',
  rissDispatcherResponseBytes: 8_093,
  rissDispatcherResponseSha256: 'ec78ef8458f6e7fbe98531aa412fef699be6c636985a9dbdd81a7bbd3e733f91',
  rissAuthoredDcollectionUrl: 'http://dongbang.dcollection.net/common/orgView/200000198616',
  dcollectionHost: 'dongbang.dcollection.net',
  dcollectionSiteAuthoredItemId: '200000198616',
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
    yukchinSystemDiscussionObservedInPublicMetadata: true as const,
    spouseSpecificSelectorClaimObservedAtBodyLevel: false as const,
    admittedAsBodyLevelRoleNeutralMapping: false as const,
    boundary:
      'The public RISS title, abstract/catalog, and detail surfaces identify a Mingli Yak-eon fate-system study and expose Yukchin-related discovery language. Those metadata surfaces are not the complete dissertation body and therefore cannot establish or reject a native-sex-independent or partner-sex-independent natal spouse selector.',
  }),
  explicitRoleNeutralNatalMappingGapClosedByThisEvidence: false as const,
  currentGovernedSemanticCorrespondenceGapClosedByThisEvidence: false as const,
  relationshipT6InputGapClosedByThisEvidence: false as const,
  exactBoundary:
    'The current public RISS result card independently identified Shin Youngho, Dongbang Culture Graduate University, 2019, domestic doctorate, with the exact Mingli Yak-eon fate-system thesis title. The site-authored result card labeled the institution 東方文化大學院大學校, accepted only as the explicit site-authored label for the same normalized school identity, and supplied control d08ee38324aa6aeaffe0bdc3ef48d419 plus its literal detail route. The detail exposed the single RISS identifier T15099926, National Assembly local bibliographic number KDM201938404, and form tuple be54d9b8bc7cdb09 / b51fa0b5ced94fec / a8cb3aaead67ab5b. The current site-authored RISS dispatcher returned HTTP 200 and authored http://dongbang.dcollection.net/common/orgView/200000198616. Following only that literal route under standard certificate verification stopped with CERTIFICATE_VERIFY_FAILED. No TLS validation bypass, opaque identifier guessing, protected-route bypass, or complete thesis body acquisition occurred; therefore no body-level spouse-selector admission or rejection decision is made.',
  noStitchingBoundary:
    'Shin Youngho 2019 search, abstract/catalog, detail, dispatcher, and transport metadata remains discovery/access evidence only. It is not combined with Kim Giyong 2017, Choi Sanggil 2020, Kim Youngsook 2026, Son Jusaeng 2020, Song Jaewoo 2023, Jeon Suhyun 2016, or any other partial authority to manufacture the missing single-native role-neutral natal spouse selector.',
});

export const RELATIONSHIP_SPOUSE_T8_SHIN_YOUNGHO_2019_ACCESS_BOUNDARY_CONTROL_IDS = Object.freeze([
  'SHIN_YOUNGHO_2019_EXACT_RISS_THESIS_SEARCH_CARD_IDENTITY_IS_PINNED',
  'DISPOSABLE_ACQUISITION_PR_482_IS_CLOSED_UNMERGED',
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
  'ABSTRACT_OR_METADATA_YUKCHIN_LANGUAGE_IS_NOT_TREATED_AS_BODY_EVIDENCE',
  'NO_BODY_LEVEL_ROLE_NEUTRAL_ADMISSION_OR_REJECTION_VERDICT_IS_INFERRED_WITHOUT_BODY',
  'NO_CROSS_SOURCE_STITCHING_TO_MANUFACTURE_MISSING_SELECTOR',
  'QUALIFYING_PRIMARY_WITNESS_REMAINS_CLOSED',
  'INDEPENDENT_NORMATIVE_PROVENANCE_REMAINS_CLOSED',
  'EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_REMAINS_OPEN',
  'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN',
  'RELATIONSHIP_T6_INPUT_REMAINS_OPEN',
  'EXACTLY_TWO_OF_FIVE_AUTHORITY_GAPS_REMAIN_CLOSED_AND_PRODUCTION_REMAINS_HOLD',
] as const);

export interface RelationshipSpouseT8ShinYoungho2019AccessBoundaryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_SHIN_YOUNGHO_2019_ACCESS_BOUNDARY_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status:
    | 'PUBLIC_ROUTE_TLS_VERIFICATION_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION'
    | 'UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidate: typeof RELATIONSHIP_SPOUSE_T8_SHIN_YOUNGHO_2019_ACCESS_BOUNDARY_CANDIDATE;
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
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_SHIN_YOUNGHO_2019_ACCESS_BOUNDARY_CONTROL_IDS)[number][];
  controlCount: number;
  recommendedNextAction:
    | 'CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_TLS_VALIDATION_BYPASS_OR_CROSS_SOURCE_STITCHING'
    | 'REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE';
}

type UpstreamReport = ReturnType<typeof buildRelationshipSpouseT8KimGiyong2017AccessBoundaryEvidence>;

function upstreamTwoOfFiveStateAccepted(upstream: UpstreamReport): boolean {
  return (
    upstream.status === 'PUBLIC_RISS_DISPATCHER_NO_PUBLIC_BODY_ROUTE_NO_BODY_LEVEL_ADMISSION_DECISION' &&
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

export function buildRelationshipSpouseT8ShinYoungho2019AccessBoundaryEvidence(): RelationshipSpouseT8ShinYoungho2019AccessBoundaryEvidenceReport {
  const upstream = buildRelationshipSpouseT8KimGiyong2017AccessBoundaryEvidence();
  const accepted = upstreamTwoOfFiveStateAccepted(upstream);
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_SHIN_YOUNGHO_2019_ACCESS_BOUNDARY_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status: accepted
      ? ('PUBLIC_ROUTE_TLS_VERIFICATION_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION' as const)
      : ('UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID' as const),
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidate: RELATIONSHIP_SPOUSE_T8_SHIN_YOUNGHO_2019_ACCESS_BOUNDARY_CANDIDATE,
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
      ? RELATIONSHIP_SPOUSE_T8_SHIN_YOUNGHO_2019_ACCESS_BOUNDARY_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted ? RELATIONSHIP_SPOUSE_T8_SHIN_YOUNGHO_2019_ACCESS_BOUNDARY_CONTROL_IDS.length : 0,
    recommendedNextAction: accepted
      ? ('CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_TLS_VALIDATION_BYPASS_OR_CROSS_SOURCE_STITCHING' as const)
      : ('REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE' as const),
  };
  return {
    evidenceId: `relationship_spouse_t8_shin_youngho_2019_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
