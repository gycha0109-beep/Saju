import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8KimInsun2014AccessBoundaryEvidence } from './relationship-spouse-t8-kim-insun-2014-access-boundary-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_KIM_YOUNGHEE_2006_ACCESS_BOUNDARY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-kim-younghee-2006-access-boundary-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_KIM_YOUNGHEE_2006_ACCESS_BOUNDARY_CANDIDATE = Object.freeze({
  candidateId: 'KIM_YOUNGHEE_2006_RISS_KONGJU_DCOLLECTION_TLS_ACCESS_BOUNDARY',
  author: '김영희',
  publicationYear: 2006,
  title: '宮合理論硏究',
  school: '공주대학교 대학원',
  degreeType: '국내석사',
  rissId: 'T10989354',
  rissControlNo: '1e310f1b3e5a7214ffe0bdc3ef48d419',
  disposableAcquisitionPr: 443,
  acquisitionPrClosedUnmerged: true as const,
  acquisitionExactHead: 'a4d9d846d359071ab333da1eed262dcdd5fa099b',
  acquisitionRunId: 34683340442,
  acquisitionArtifactId: 10294338068,
  acquisitionArtifactDigest:
    'sha256:3206bc72e20be4ff23eaac5c6ccfaaac5614e88f6a762774be54f8ebfc2829f8',
  ciRunId: 34683340443,
  pccRunId: 34683340444,
  pieRunId: 34683340725,
  identityResolution: Object.freeze({
    source: 'CURRENT_PUBLIC_RISS_EXACT_THESIS_SEARCH_RESULT_CARD',
    rule:
      'EXACT_SITE_AUTHORED_THESIS_SEARCH_RESULT_CARD_TITLE_AUTHOR_SCHOOL_YEAR_TYPE_AND_LITERAL_DETAIL_ROUTE',
    searchResponseBytes: 204_142,
    searchResponseSha256: 'c1d788981c765304655e722238923aac9da8ef4a3fcb1b09f31c3edb6b981e81',
    siteAuthoredDetailUrl:
      'https://www.riss.kr/search/detail/DetailView.do?p_mat_type=be54d9b8bc7cdb09&control_no=1e310f1b3e5a7214ffe0bdc3ef48d419&keyword=宮合理論硏究',
    searchCardTitle: '宮合理論 硏究',
    searchCardMetadata: '김영희 公州大學校 大學院 2006 국내석사',
    detailResponseBytes: 210_836,
    detailResponseSha256: '26db2be61a0853010c81efd3dfb449ce2336063e7f947f722ac4f704c5031dd9',
  }),
  acquisitionCorrectionHistory: Object.freeze({
    run1DiscardedFalsePositive: true as const,
    run1FalsePositiveReason:
      'PAGE_WIDE_MATCH_SELECTED_LEE_SUDONG_2023_ARTICLE_BECAUSE_ITS_REFERENCE_LIST_CONTAINED_KIM_YOUNGHEE_2006',
    run2DiscardedFailClosed: true as const,
    run2Reason: 'BIB_T_WAS_READ_FROM_NON_AUTHORITATIVE_PAGE_UI_FIELD',
    run3DiscardedFailClosed: true as const,
    run3Reason: 'THESIS_DETAIL_PRIMARY_RECORD_MARKUP_REGEX_WAS_TOO_BRITTLE',
    finalRunNumber: 4,
    finalResolutionAuthority: 'EXACT_SITE_AUTHORED_THESIS_SEARCH_RESULT_CARD',
  }),
  rissFulltextTuple: Object.freeze({
    control_no: '1e310f1b3e5a7214ffe0bdc3ef48d419',
    p_mat_type: 'be54d9b8bc7cdb09',
    p_submat_type: 'f1a8c7a1de0e08b8',
    fulltext_kind: 'a8cb3aaead67ab5b',
  }),
  rissSiteAuthoredDispatcherObserved: true as const,
  rissDispatcherHttpStatus: 200,
  rissDispatcherContentType: 'text/html; charset=utf-8',
  rissDispatcherResponseBytes: 7_803,
  rissDispatcherResponseSha256: '422b90a7c32d4f7f6e300891e6f4dcaf205a6d0d8a3ecec62320b6a8f9ae26c5',
  rissAuthoredDcollectionUrl: 'https://kongju.dcollection.net/common/orgView/200000993078',
  dcollectionHost: 'kongju.dcollection.net',
  dcollectionSiteAuthoredItemId: '200000993078',
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
    'The Kim Younghee 2006 thesis identity was resolved from the current public RISS search result card whose own title, author, school, year, and degree type matched the candidate. That exact site-authored card supplied control 1e310f1b3e5a7214ffe0bdc3ef48d419, the be54d9b8bc7cdb09 / f1a8c7a1de0e08b8 / a8cb3aaead67ab5b fulltext tuple, and the literal detail route. The returned exact detail confirmed the same control and exposed the single T10989354 identifier. The current RISS dispatcher then authored https://kongju.dcollection.net/common/orgView/200000993078. Following only that literal route under standard TLS verification stopped with CERTIFICATE_VERIFY_FAILED. No certificate validation bypass, opaque identifier guessing, protected-route bypass, or complete thesis body acquisition occurred; therefore no body-level spouse-selector admission decision is made.',
  noStitchingBoundary:
    'Kim Younghee 2006 search, catalog, detail, dispatcher, and transport metadata remains discovery evidence only. It is not combined with Kim Insun 2014, Park Byeonggeun 2021, Nam Jiho 2019, Nam Gidong 2020, Hong Seungpil 2017, Lee Changim 2016, or any other partial authority to manufacture the missing single-native role-neutral natal spouse selector.',
});

export const RELATIONSHIP_SPOUSE_T8_KIM_YOUNGHEE_2006_ACCESS_BOUNDARY_CONTROL_IDS = Object.freeze([
  'KIM_YOUNGHEE_2006_EXACT_RISS_THESIS_SEARCH_CARD_IDENTITY_IS_PINNED',
  'PAGE_WIDE_REFERENCE_FALSE_POSITIVE_FROM_ACQUISITION_RUN_1_IS_EXPLICITLY_REJECTED',
  'ACQUISITION_RUNS_2_AND_3_FAIL_CLOSED_RESULTS_ARE_NOT_AUTHORITY_EVIDENCE',
  'DISPOSABLE_ACQUISITION_PR_443_IS_CLOSED_UNMERGED',
  'EXACT_RISS_ID_CONTROL_AND_FULLTEXT_TUPLE_ARE_PINNED_FROM_FINAL_RUN',
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

export interface RelationshipSpouseT8KimYounghee2006AccessBoundaryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_KIM_YOUNGHEE_2006_ACCESS_BOUNDARY_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status:
    | 'PUBLIC_ROUTE_TLS_VERIFICATION_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION'
    | 'UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidate: typeof RELATIONSHIP_SPOUSE_T8_KIM_YOUNGHEE_2006_ACCESS_BOUNDARY_CANDIDATE;
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
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_KIM_YOUNGHEE_2006_ACCESS_BOUNDARY_CONTROL_IDS)[number][];
  controlCount: number;
  recommendedNextAction:
    | 'CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_TLS_VALIDATION_BYPASS_OR_CROSS_SOURCE_STITCHING'
    | 'REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE';
}

type UpstreamReport = ReturnType<typeof buildRelationshipSpouseT8KimInsun2014AccessBoundaryEvidence>;

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

export function buildRelationshipSpouseT8KimYounghee2006AccessBoundaryEvidence(): RelationshipSpouseT8KimYounghee2006AccessBoundaryEvidenceReport {
  const upstream = buildRelationshipSpouseT8KimInsun2014AccessBoundaryEvidence();
  const accepted = upstreamTwoOfFiveStateAccepted(upstream);
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_KIM_YOUNGHEE_2006_ACCESS_BOUNDARY_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status: accepted
      ? ('PUBLIC_ROUTE_TLS_VERIFICATION_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION' as const)
      : ('UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID' as const),
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidate: RELATIONSHIP_SPOUSE_T8_KIM_YOUNGHEE_2006_ACCESS_BOUNDARY_CANDIDATE,
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
    controlIds: accepted ? RELATIONSHIP_SPOUSE_T8_KIM_YOUNGHEE_2006_ACCESS_BOUNDARY_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? RELATIONSHIP_SPOUSE_T8_KIM_YOUNGHEE_2006_ACCESS_BOUNDARY_CONTROL_IDS.length : 0,
    recommendedNextAction: accepted
      ? ('CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_TLS_VALIDATION_BYPASS_OR_CROSS_SOURCE_STITCHING' as const)
      : ('REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE' as const),
  };

  return {
    evidenceId: `relationship_spouse_t8_kim_younghee_2006_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
