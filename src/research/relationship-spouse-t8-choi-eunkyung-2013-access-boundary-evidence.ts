import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8JoManseop2007AccessBoundaryEvidence } from './relationship-spouse-t8-jo-manseop-2007-access-boundary-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_CHOI_EUNKYUNG_2013_ACCESS_BOUNDARY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-choi-eunkyung-2013-access-boundary-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_CHOI_EUNKYUNG_2013_ACCESS_BOUNDARY_CANDIDATE = Object.freeze({
  candidateId: 'CHOI_EUNKYUNG_2013_RISS_DCOLLECTION_TLS_ACCESS_BOUNDARY',
  author: '최은경',
  publicationYear: 2013,
  title: '命理學 六親論의 傷官에 관한 硏究',
  school: '원광대학교 동양학대학원',
  rissId: 'T13097800',
  rissControlNo: 'a2d2aa37279fbaaaffe0bdc3ef48d419',
  disposableAcquisitionPr: 427,
  acquisitionPrClosedUnmerged: true as const,
  acquisitionExactHead: 'b39fd06aa1d0ce7b7855040305f7b63e05bf856c',
  acquisitionRunId: 34530063646,
  acquisitionArtifactId: 10173140266,
  acquisitionArtifactDigest:
    'sha256:fafca5141769d495b3f671fdf366f4cfcc62cfcc9a720fee3ac66828c7fee4c4',
  ciRunId: 34530063651,
  pccRunId: 34530063714,
  pieRunId: 34530064571,
  rissFulltextTuple: Object.freeze({
    control_no: 'a2d2aa37279fbaaaffe0bdc3ef48d419',
    p_mat_type: 'be54d9b8bc7cdb09',
    p_submat_type: 'f1a8c7a1de0e08b8',
    fulltext_kind: 'a8cb3aaead67ab5b',
  }),
  rissOriginalCheckContractObserved: true as const,
  rissSiteAuthoredDispatcherObserved: true as const,
  rissDownloadingRouteObserved: true as const,
  rissDownloadingHttpStatus: 200,
  rissDownloadingContentType: 'text/html; charset=utf-8',
  rissDownloadingResponseBytes: 3_053,
  rissDownloadingResponseSha256: 'ee69b793c7f796279516d872addd7d241b398fc7626e1bc4f40d530209160fa3',
  rissDownloadingDirectPdfAcquired: false as const,
  rissAuthoredDcollectionUrl:
    'http://wonkwang.dcollection.net/jsp/common/DcLoOrgPer.jsp?sItemId=000001991979',
  dcollectionHost: 'wonkwang.dcollection.net',
  dcollectionSiteAuthoredItemId: '000001991979',
  dcollectionRedirectedToHttps: true as const,
  dcollectionTlsCertificateVerificationFailed: true as const,
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
  abstractSexConditionedSignalTreatedAsBodyEvidence: false as const,
  explicitRoleNeutralNatalMappingGapClosedByThisEvidence: false as const,
  currentGovernedSemanticCorrespondenceGapClosedByThisEvidence: false as const,
  relationshipT6InputGapClosedByThisEvidence: false as const,
  exactBoundary:
    'The current RISS public detail and fulltext dispatcher contracts were reproduced exactly. RISS Downloading.do returned HTML rather than a PDF. The RISS-authored Wonkwang dCollection item route redirected to HTTPS, where the GitHub hosted runner could not validate the server certificate chain. TLS verification was not disabled, no protected route was bypassed, and no direct thesis body was acquired; therefore no body-level semantic admission decision is made.',
  noStitchingBoundary:
    'Choi Eunkyung 2013 abstract language, RISS metadata, dispatcher metadata, and the dCollection transport boundary are not combined with Jo Manseop 2007, Nam/Kim 2018, Lee Sangcheon 2017, or any other partial authority to manufacture the missing role-neutral natal spouse selector.',
});

export const RELATIONSHIP_SPOUSE_T8_CHOI_EUNKYUNG_2013_ACCESS_BOUNDARY_CONTROL_IDS = Object.freeze([
  'CHOI_EUNKYUNG_2013_EXACT_TITLE_AUTHOR_YEAR_SCHOOL_RISS_ID_AND_CONTROL_ARE_PINNED',
  'DISPOSABLE_ACQUISITION_PR_427_IS_CLOSED_UNMERGED',
  'EXACT_RISS_FULLTEXT_FORM_TUPLE_IS_PINNED',
  'CURRENT_RISS_ORIGINAL_CHECK_AND_SITE_AUTHORED_DISPATCHER_CONTRACTS_ARE_OBSERVED',
  'RISS_AUTHORED_DOWNLOADING_ROUTE_RETURNS_HTML_WITHOUT_DIRECT_PDF',
  'RISS_AUTHORED_WONKWANG_DCOLLECTION_ITEM_ROUTE_IS_PINNED_WITHOUT_IDENTIFIER_GUESSING',
  'WONKWANG_HTTPS_CERTIFICATE_CHAIN_CANNOT_BE_VALIDATED_BY_HOSTED_RUNNER',
  'TLS_CERTIFICATE_VERIFICATION_IS_NOT_DISABLED_TO_CROSS_THE_ACCESS_BOUNDARY',
  'NO_LOGIN_INSTITUTION_PAYWALL_DRM_OR_DECRYPTION_BYPASS_IS_PERFORMED',
  'NO_COMPLETE_PDF_OR_DIRECT_BODY_IS_CLAIMED',
  'ABSTRACT_SEX_CONDITIONED_SIGNAL_IS_DISCOVERY_METADATA_NOT_BODY_EVIDENCE',
  'NO_BODY_LEVEL_ROLE_NEUTRAL_ADMISSION_VERDICT_IS_INFERRED_WITHOUT_BODY',
  'NO_CROSS_SOURCE_STITCHING_TO_MANUFACTURE_MISSING_SELECTOR',
  'QUALIFYING_PRIMARY_WITNESS_REMAINS_CLOSED',
  'INDEPENDENT_NORMATIVE_PROVENANCE_REMAINS_CLOSED',
  'EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_REMAINS_OPEN',
  'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN',
  'RELATIONSHIP_T6_INPUT_REMAINS_OPEN',
  'EXACTLY_TWO_OF_FIVE_AUTHORITY_GAPS_REMAIN_CLOSED_AND_PRODUCTION_REMAINS_HOLD',
] as const);

export interface RelationshipSpouseT8ChoiEunkyung2013AccessBoundaryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_CHOI_EUNKYUNG_2013_ACCESS_BOUNDARY_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status:
    | 'PUBLIC_ROUTE_TLS_VERIFICATION_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION'
    | 'UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidate: typeof RELATIONSHIP_SPOUSE_T8_CHOI_EUNKYUNG_2013_ACCESS_BOUNDARY_CANDIDATE;
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
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_CHOI_EUNKYUNG_2013_ACCESS_BOUNDARY_CONTROL_IDS)[number][];
  controlCount: number;
  recommendedNextAction:
    | 'CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_TLS_VALIDATION_BYPASS_OR_CROSS_SOURCE_STITCHING'
    | 'REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE';
}

type JoManseop2007BoundaryReport = ReturnType<
  typeof buildRelationshipSpouseT8JoManseop2007AccessBoundaryEvidence
>;

function upstreamTwoOfFiveStateAccepted(upstream: JoManseop2007BoundaryReport): boolean {
  return (
    upstream.status === 'ACCESS_SECURITY_TRANSFORM_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION' &&
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

export function buildRelationshipSpouseT8ChoiEunkyung2013AccessBoundaryEvidence(): RelationshipSpouseT8ChoiEunkyung2013AccessBoundaryEvidenceReport {
  const upstream = buildRelationshipSpouseT8JoManseop2007AccessBoundaryEvidence();
  const accepted = upstreamTwoOfFiveStateAccepted(upstream);
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_CHOI_EUNKYUNG_2013_ACCESS_BOUNDARY_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status: accepted
      ? ('PUBLIC_ROUTE_TLS_VERIFICATION_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION' as const)
      : ('UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID' as const),
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidate: RELATIONSHIP_SPOUSE_T8_CHOI_EUNKYUNG_2013_ACCESS_BOUNDARY_CANDIDATE,
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
      ? RELATIONSHIP_SPOUSE_T8_CHOI_EUNKYUNG_2013_ACCESS_BOUNDARY_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted
      ? RELATIONSHIP_SPOUSE_T8_CHOI_EUNKYUNG_2013_ACCESS_BOUNDARY_CONTROL_IDS.length
      : 0,
    recommendedNextAction: accepted
      ? ('CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_TLS_VALIDATION_BYPASS_OR_CROSS_SOURCE_STITCHING' as const)
      : ('REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE' as const),
  };

  return {
    evidenceId: `relationship_spouse_t8_choi_eunkyung_2013_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
