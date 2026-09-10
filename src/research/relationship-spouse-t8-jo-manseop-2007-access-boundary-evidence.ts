import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8NamKim2018DirectBodyBoundaryEvidence } from './relationship-spouse-t8-nam-kim-2018-direct-body-boundary-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_JO_MANSEOP_2007_ACCESS_BOUNDARY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-jo-manseop-2007-access-boundary-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_JO_MANSEOP_2007_ACCESS_BOUNDARY_CANDIDATE = Object.freeze({
  candidateId: 'JO_MANSEOP_2007_NANET_PUBLIC_READER_ACCESS_BOUNDARY',
  author: '조만섭',
  publicationYear: 2007,
  title: '명리이론과 궁합의 상관관계 연구',
  school: '경기대학교 국제·문화대학원',
  nanetControlNo: 'KDMT1200725555',
  catalogExtent: 'vi, 135 p.',
  disposableAcquisitionPr: 425,
  acquisitionPrClosedUnmerged: true as const,
  acquisitionExactHead: '609d05c622cf908a26505e6e1a362ea4f9634d8c',
  acquisitionRunId: 34514260820,
  acquisitionArtifactId: 10167029281,
  acquisitionArtifactDigest:
    'sha256:3a8d4812fab74e7427dfebf732fa89c721c69b9759b5adf2a874ca51d5cade3e',
  ciRunId: 34514260666,
  pccRunId: 34514260806,
  pieRunId: 34514261401,
  pageAuthoredLandingControl:
    "viewDoc(this, 'KDMT1200725555', '1')",
  pageAuthoredViewerUrl:
    'https://dl.nanet.go.kr/view/callViewer.do?controlNo=KDMT1200725555&orgId=dl&linkSysId=NADL',
  serverIssuedReaderCertIdUsedWithoutGuessing: true as const,
  boundedDocInfoRequestSucceeded: true as const,
  docInfoHttpStatus: 200,
  docInfoContentType: 'application/json; charset=utf-8',
  docInfoResponseBytes: 11_228,
  docInfoResponseSha256: '7fce958d13aa2f44dec1526e62b634b4454b73c7e13d608ced7a7879542302ee',
  docInfoFilename: 'KDMT1200725555.pdf.docinfo.json',
  docInfoPhysicalPageCount: 145,
  docInfoMetaAuthor: '조만섭',
  docInfoMetaTitle: '명리이론과 궁합의 상관관계 연구',
  docInfoTopicLocators: Object.freeze([
    '남자와 여자의 사주 분석 방법',
    '명리학과 부부관계 활용법',
    '궁합',
    '사주로 보는 궁합법',
  ] as const),
  topicRelevanceEstablishedAtManifestLevel: true as const,
  readerUseSec: true as const,
  drmRequestSecurityTransformObserved: true as const,
  drmRequestTransform:
    'requests whose URL contains drm/ are intercepted and rewritten to an encrypted-token POST to drm/req?token=...',
  encryptedRequestTokenGenerated: false as const,
  protectedPagePayloadDecryptedOrUnwrapped: false as const,
  directProtectedInfoOrPageEndpointBypassAttempted: false as const,
  loginGatedDownloadRouteUsed: false as const,
  alternateOpaqueDocumentOrPageIdentifiersGuessed: false as const,
  completePdfAcquired: false as const,
  candidatePdfPresent: false as const,
  completePdfRendered: false as const,
  directBodySemanticReviewPerformed: false as const,
  bodyLevelAdmissionDecisionMade: false as const,
  manifestTopicLocatorsTreatedAsBodyEvidence: false as const,
  explicitRoleNeutralNatalMappingGapClosedByThisEvidence: false as const,
  currentGovernedSemanticCorrespondenceGapClosedByThisEvidence: false as const,
  relationshipT6InputGapClosedByThisEvidence: false as const,
  exactBoundary:
    'The exact public reader yielded identity-matching DOC_INFO metadata and 145-page manifest locators, but protected page/body requests are subject to an encrypted-token security transform. No complete PDF or direct body was acquired, so this record freezes an access/security boundary and makes no body-level semantic admission decision.',
  noStitchingBoundary:
    'Jo Manseop 2007 manifest topic locators are not combined with Nam/Kim 2018 spouse-palace priority, Lee Sangcheon 2017 equality language, any other partial authority, or product terminology to manufacture the missing role-neutral natal spouse selector.',
});

export const RELATIONSHIP_SPOUSE_T8_JO_MANSEOP_2007_ACCESS_BOUNDARY_CONTROL_IDS = Object.freeze([
  'JO_MANSEOP_2007_EXACT_TITLE_AUTHOR_YEAR_SCHOOL_AND_NANET_CONTROL_ARE_PINNED',
  'DISPOSABLE_ACQUISITION_PR_425_IS_CLOSED_UNMERGED',
  'CURRENT_PAGE_AUTHORED_VIEWER_ROUTE_IS_REPRODUCED_WITHOUT_OPAQUE_ID_GUESSING',
  'SERVER_ISSUED_READER_CERT_ID_IS_USED_WITHOUT_GUESSING',
  'BOUNDED_DOC_INFO_METADATA_REQUEST_SUCCEEDS_AND_EXACT_RESPONSE_HASH_IS_PINNED',
  'CATALOG_EXTENT_AND_145_PHYSICAL_PAGE_READER_MANIFEST_ARE_PRESERVED_AS_DISTINCT_PROVENANCE',
  'DOC_INFO_IDENTITY_MATCHES_JO_MANSEOP_AND_EXACT_TITLE',
  'MANIFEST_TOPIC_LOCATORS_ARE_RELEVANCE_ONLY_NOT_BODY_SEMANTIC_EVIDENCE',
  'READER_USE_SEC_AND_DRM_ENCRYPTED_REQUEST_TRANSFORM_ARE_PRESERVED_AS_ACCESS_BOUNDARY',
  'NO_ENCRYPTED_REQUEST_TOKEN_GENERATION_OR_DECRYPTION_IS_PERFORMED',
  'NO_DIRECT_PROTECTED_INFO_OR_PAGE_ENDPOINT_BYPASS_IS_PERFORMED',
  'NO_LOGIN_GATED_DOWNLOAD_OR_OPAQUE_IDENTIFIER_GUESSING_IS_PERFORMED',
  'NO_COMPLETE_PDF_OR_DIRECT_BODY_IS_CLAIMED',
  'NO_RENDER_FIRST_REVIEW_IS_CLAIMED_WITHOUT_PDF',
  'NO_BODY_LEVEL_ROLE_NEUTRAL_ADMISSION_VERDICT_IS_INFERRED_FROM_MANIFEST_METADATA',
  'NO_CROSS_SOURCE_STITCHING_TO_MANUFACTURE_MISSING_SELECTOR',
  'QUALIFYING_PRIMARY_WITNESS_REMAINS_CLOSED',
  'INDEPENDENT_NORMATIVE_PROVENANCE_REMAINS_CLOSED',
  'EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_REMAINS_OPEN',
  'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN',
  'RELATIONSHIP_T6_INPUT_REMAINS_OPEN',
  'EXACTLY_TWO_OF_FIVE_AUTHORITY_GAPS_REMAIN_CLOSED_AND_PRODUCTION_REMAINS_HOLD',
] as const);

export interface RelationshipSpouseT8JoManseop2007AccessBoundaryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_JO_MANSEOP_2007_ACCESS_BOUNDARY_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status:
    | 'ACCESS_SECURITY_TRANSFORM_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION'
    | 'UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidate: typeof RELATIONSHIP_SPOUSE_T8_JO_MANSEOP_2007_ACCESS_BOUNDARY_CANDIDATE;
  exactUpstreamTwoOfFiveStateAccepted: boolean;
  manifestMetadataInspected: true;
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
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_JO_MANSEOP_2007_ACCESS_BOUNDARY_CONTROL_IDS)[number][];
  controlCount: number;
  recommendedNextAction:
    | 'CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_CROSS_SOURCE_STITCHING_OR_PROTECTED_READER_BYPASS'
    | 'REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE';
}

type NamKim2018BoundaryReport = ReturnType<
  typeof buildRelationshipSpouseT8NamKim2018DirectBodyBoundaryEvidence
>;

function upstreamTwoOfFiveStateAccepted(upstream: NamKim2018BoundaryReport): boolean {
  return (
    upstream.status ===
      'DIRECT_FULLTEXT_CONFIRMS_SPOUSE_PALACE_PRIORITY_WITH_SEX_CONDITIONED_SPOUSE_STARS_AND_DYADIC_INPUT' &&
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

export function buildRelationshipSpouseT8JoManseop2007AccessBoundaryEvidence(): RelationshipSpouseT8JoManseop2007AccessBoundaryEvidenceReport {
  const upstream = buildRelationshipSpouseT8NamKim2018DirectBodyBoundaryEvidence();
  const accepted = upstreamTwoOfFiveStateAccepted(upstream);
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_JO_MANSEOP_2007_ACCESS_BOUNDARY_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status: accepted
      ? ('ACCESS_SECURITY_TRANSFORM_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION' as const)
      : ('UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID' as const),
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidate: RELATIONSHIP_SPOUSE_T8_JO_MANSEOP_2007_ACCESS_BOUNDARY_CANDIDATE,
    exactUpstreamTwoOfFiveStateAccepted: accepted,
    manifestMetadataInspected: true as const,
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
      ? RELATIONSHIP_SPOUSE_T8_JO_MANSEOP_2007_ACCESS_BOUNDARY_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted
      ? RELATIONSHIP_SPOUSE_T8_JO_MANSEOP_2007_ACCESS_BOUNDARY_CONTROL_IDS.length
      : 0,
    recommendedNextAction: accepted
      ? ('CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_CROSS_SOURCE_STITCHING_OR_PROTECTED_READER_BYPASS' as const)
      : ('REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE' as const),
  };

  return {
    evidenceId: `relationship_spouse_t8_jo_manseop_2007_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
