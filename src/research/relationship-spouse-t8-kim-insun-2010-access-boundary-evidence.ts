import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8KimYounghee2006AccessBoundaryEvidence } from './relationship-spouse-t8-kim-younghee-2006-access-boundary-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_KIM_INSUN_2010_ACCESS_BOUNDARY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-kim-insun-2010-access-boundary-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_KIM_INSUN_2010_ACCESS_BOUNDARY_CANDIDATE = Object.freeze({
  candidateId: 'KIM_INSUN_2010_RISS_DISPATCHER_NO_PUBLIC_BODY_ROUTE_BOUNDARY',
  author: '김인순',
  publicationYear: 2010,
  title: '命理學의 宮合論 硏究',
  titleKorean: '명리학의 궁합론 연구',
  school: '동방대학원대학교',
  degreeType: '국내석사',
  rissId: 'T12315524',
  rissControlNo: '49561f47589d9efaffe0bdc3ef48d419',
  disposableAcquisitionPr: 449,
  acquisitionPrClosedUnmerged: true as const,
  acquisitionExactHead: '312eae0e019e3580fa899cf21b356754af4eedbb',
  acquisitionRunId: 34685130258,
  acquisitionArtifactId: 10295408468,
  acquisitionArtifactDigest:
    'sha256:db99a0781a2b09daf3ad33539541b9679901c57fcc7f4bc4bed7ff7ef575a9b4',
  ciRunId: 34685130248,
  pccRunId: 34685130357,
  pieRunId: 34685130630,
  identityResolution: Object.freeze({
    source: 'CURRENT_PUBLIC_RISS_EXACT_THESIS_SEARCH_RESULT_CARD',
    rule:
      'EXACT_SITE_AUTHORED_THESIS_SEARCH_RESULT_CARD_TITLE_AUTHOR_SCHOOL_YEAR_TYPE_AND_LITERAL_DETAIL_ROUTE',
    searchResponseBytes: 192_857,
    searchResponseSha256: 'f86efa502172001250f8956839928aebafb6a8172ef79161e69f4b41571cc160',
    siteAuthoredDetailUrl:
      'https://www.riss.kr/search/detail/DetailView.do?p_mat_type=be54d9b8bc7cdb09&control_no=49561f47589d9efaffe0bdc3ef48d419&keyword=명리학의 궁합론 연구',
    searchCardTitle: '命理學의 宮合論 硏究',
    searchCardMetadata: '김인순 동방대학원대학교 2010 국내석사',
    detailResponseBytes: 217_425,
    detailResponseSha256: '0f2686da1aa4228c7c814a86d827c621ae199bc250f2d3ee3f3161605ab1ccae',
  }),
  yearCorrectionProvenance: Object.freeze({
    supersededDisposablePr: 448,
    supersededSecondaryCitationYear: 2011,
    currentRissSelfRecordYear: 2010,
    supersededPrClosedUnmerged: true as const,
    finalAcquisitionIndependentlyResolvedCurrentRissCard: true as const,
    correctionRule:
      'CURRENT_RISS_SELF_RECORD_YEAR_OVERRIDES_SECONDARY_REFERENCE_YEAR_FOR_IDENTITY_RESOLUTION',
  }),
  rissFulltextTuple: Object.freeze({
    control_no: '49561f47589d9efaffe0bdc3ef48d419',
    p_mat_type: 'be54d9b8bc7cdb09',
    p_submat_type: 'f1a8c7a1de0e08b8',
    fulltext_kind: '',
  }),
  rissSiteAuthoredDispatcherObserved: true as const,
  rissDispatcherHttpStatus: 500,
  rissDispatcherContentType: 'text/html; charset=utf-8',
  rissDispatcherResponseBytes: 1_432,
  rissDispatcherResponseSha256: '91c06d7663066163247ba0e4073d9eaf066e29bb31d18d5acc9de5c695c89918',
  rissDispatcherDcollectionRouteObserved: false as const,
  rissDispatcherRelevantPublicBodyRouteObserved: false as const,
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
    'The current public RISS thesis search result card independently identified Kim Insun, Dongbang Graduate University, 2010, domestic master, title 命理學의 宮合論 硏究. That site-authored card supplied control 49561f47589d9efaffe0bdc3ef48d419 and the literal detail route. The exact detail confirmed the same control, title, author, year, and the single RISS identifier T12315524. Its current document form supplied be54d9b8bc7cdb09 / f1a8c7a1de0e08b8 / empty fulltext_kind. The observed current RISS dispatcher request returned HTTP 500 with no RISS-authored dCollection or relevant public body route. No opaque identifier was guessed, no protected route was bypassed, and no complete thesis body was acquired; therefore no body-level spouse-selector admission decision is made.',
  correctionBoundary:
    'Disposable PR 448 tested a 2011 year taken from later secondary references. Current RISS self-record search evidence instead identifies this exact title, author, and school as 2010. PR 448 was closed unmerged and its year is not propagated. Final PR 449 independently re-resolved the 2010 RISS card rather than reusing a guessed or secondary identifier.',
  noStitchingBoundary:
    'Kim Insun 2010 search, catalog, detail, dispatcher, and transport metadata remains discovery evidence only. It is not combined with Kim Younghee 2006, Kim Insun 2014, Park Byeonggeun 2021, Nam Jiho 2019, Nam Gidong 2020, Hong Seungpil 2017, Lee Changim 2016, or any other partial authority to manufacture the missing single-native role-neutral natal spouse selector.',
});

export const RELATIONSHIP_SPOUSE_T8_KIM_INSUN_2010_ACCESS_BOUNDARY_CONTROL_IDS = Object.freeze([
  'KIM_INSUN_2010_EXACT_RISS_THESIS_SEARCH_CARD_IDENTITY_IS_PINNED',
  'SECONDARY_2011_YEAR_IS_SUPERSEDED_BY_CURRENT_RISS_SELF_RECORD_2010',
  'DISPOSABLE_MISDATED_PR_448_IS_CLOSED_UNMERGED',
  'FINAL_ACQUISITION_INDEPENDENTLY_RERESOLVED_CURRENT_RISS_2010_CARD',
  'DISPOSABLE_ACQUISITION_PR_449_IS_CLOSED_UNMERGED',
  'EXACT_RISS_ID_CONTROL_AND_CURRENT_FORM_TUPLE_ARE_PINNED',
  'CURRENT_RISS_SITE_AUTHORED_DISPATCHER_IMPLEMENTATION_IS_OBSERVED',
  'RISS_SEARCH_DETAIL_AND_DISPATCHER_RESPONSES_ARE_CONTENT_ADDRESSED',
  'RISS_DISPATCHER_RETURNED_HTTP_500_WITHOUT_RELEVANT_PUBLIC_BODY_ROUTE',
  'NO_DCOLLECTION_ROUTE_IS_INFERRED_WHEN_RISS_DID_NOT_AUTHOR_ONE',
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

export interface RelationshipSpouseT8KimInsun2010AccessBoundaryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_KIM_INSUN_2010_ACCESS_BOUNDARY_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status:
    | 'PUBLIC_RISS_DISPATCHER_NO_PUBLIC_BODY_ROUTE_NO_BODY_LEVEL_ADMISSION_DECISION'
    | 'UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidate: typeof RELATIONSHIP_SPOUSE_T8_KIM_INSUN_2010_ACCESS_BOUNDARY_CANDIDATE;
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
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_KIM_INSUN_2010_ACCESS_BOUNDARY_CONTROL_IDS)[number][];
  controlCount: number;
  recommendedNextAction:
    | 'CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_SECURITY_BYPASS_OR_CROSS_SOURCE_STITCHING'
    | 'REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE';
}

type UpstreamReport = ReturnType<typeof buildRelationshipSpouseT8KimYounghee2006AccessBoundaryEvidence>;

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

export function buildRelationshipSpouseT8KimInsun2010AccessBoundaryEvidence(): RelationshipSpouseT8KimInsun2010AccessBoundaryEvidenceReport {
  const upstream = buildRelationshipSpouseT8KimYounghee2006AccessBoundaryEvidence();
  const accepted = upstreamTwoOfFiveStateAccepted(upstream);
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_KIM_INSUN_2010_ACCESS_BOUNDARY_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status: accepted
      ? ('PUBLIC_RISS_DISPATCHER_NO_PUBLIC_BODY_ROUTE_NO_BODY_LEVEL_ADMISSION_DECISION' as const)
      : ('UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID' as const),
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidate: RELATIONSHIP_SPOUSE_T8_KIM_INSUN_2010_ACCESS_BOUNDARY_CANDIDATE,
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
      ? RELATIONSHIP_SPOUSE_T8_KIM_INSUN_2010_ACCESS_BOUNDARY_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted
      ? RELATIONSHIP_SPOUSE_T8_KIM_INSUN_2010_ACCESS_BOUNDARY_CONTROL_IDS.length
      : 0,
    recommendedNextAction: accepted
      ? ('CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_SECURITY_BYPASS_OR_CROSS_SOURCE_STITCHING' as const)
      : ('REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE' as const),
  };

  return {
    evidenceId: `relationship_spouse_t8_kim_insun_2010_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
