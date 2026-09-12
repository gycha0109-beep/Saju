import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8NamGidong2020AccessBoundaryEvidence } from './relationship-spouse-t8-nam-gidong-2020-access-boundary-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_NAM_JIHO_2019_ACCESS_BOUNDARY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-nam-jiho-2019-access-boundary-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_NAM_JIHO_2019_ACCESS_BOUNDARY_CANDIDATE = Object.freeze({
  candidateId: 'NAM_JIHO_2019_RISS_UBE_DCOLLECTION_TLS_ACCESS_BOUNDARY',
  author: '남직호',
  publicationYear: 2019,
  title: '宮合과 離婚에 미치는 命理변수의 영향',
  school: '국제뇌교육종합대학원대학교 동양학과',
  rissId: 'T15169258',
  rissControlNo: 'c357150c3e5609c7ffe0bdc3ef48d419',
  nationalLibraryLocalBibno: 'KDM201955654',
  disposableAcquisitionPr: 435,
  acquisitionPrClosedUnmerged: true as const,
  acquisitionExactHead: '89b90edc7970ff27fcd1a880f41f92960c6f97ca',
  acquisitionRunId: 34548857316,
  acquisitionArtifactId: 10180055145,
  acquisitionArtifactDigest:
    'sha256:5ba6c302063baaf1faf39233ce52ba5249abca69abe1dd3b14db50d3e847ec27',
  ciRunId: 34548857228,
  pccRunId: 34548857217,
  pieRunId: 34548861778,
  rissFulltextTuple: Object.freeze({
    control_no: 'c357150c3e5609c7ffe0bdc3ef48d419',
    p_mat_type: 'be54d9b8bc7cdb09',
    p_submat_type: 'b51fa0b5ced94fec',
    fulltext_kind: 'a8cb3aaead67ab5b',
  }),
  rissSiteAuthoredDispatcherObserved: true as const,
  rissDispatcherHttpStatus: 200,
  rissDispatcherContentType: 'text/html; charset=utf-8',
  rissDispatcherResponseBytes: 7_917,
  rissDispatcherResponseSha256: '723808b5411314cf818eb839799bd9f1b761e04239e55153a383675f358aff6b',
  rissAuthoredDcollectionUrl: 'http://ube.dcollection.net/common/orgView/200000182751',
  dcollectionHost: 'ube.dcollection.net',
  dcollectionSiteAuthoredItemId: '200000182751',
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
    'The current exact RISS record and site-authored fulltext dispatcher were reproduced from observed form values. RISS authored the exact UBE dCollection route http://ube.dcollection.net/common/orgView/200000182751. Following that literal route under standard certificate verification stopped with CERTIFICATE_VERIFY_FAILED because the issuer chain could not be validated by the hosted runner. TLS verification was not disabled, no opaque identifier was guessed, no protected route was bypassed, and no complete thesis body was acquired; therefore no body-level semantic admission decision is made.',
  noStitchingBoundary:
    'Nam Jiho 2019 abstract and catalog language about compatibility, divorce, individual natal variables, and combined male-female chart variables remains discovery metadata only. It is not combined with Nam Gidong 2020, Hong Seungpil 2017, Lee Changim 2016, Choi Eunkyung 2013, or any other partial authority to manufacture the missing single-native role-neutral natal spouse selector.',
});

export const RELATIONSHIP_SPOUSE_T8_NAM_JIHO_2019_ACCESS_BOUNDARY_CONTROL_IDS = Object.freeze([
  'NAM_JIHO_2019_EXACT_TITLE_AUTHOR_YEAR_SCHOOL_RISS_ID_CONTROL_AND_LOCAL_BIBNO_ARE_PINNED',
  'DISPOSABLE_ACQUISITION_PR_435_IS_CLOSED_UNMERGED',
  'EXACT_RISS_FULLTEXT_FORM_TUPLE_IS_PINNED',
  'CURRENT_RISS_SITE_AUTHORED_DISPATCHER_CONTRACT_IS_OBSERVED',
  'RISS_DISPATCHER_RESPONSE_IS_CONTENT_ADDRESSED',
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

export interface RelationshipSpouseT8NamJiho2019AccessBoundaryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_NAM_JIHO_2019_ACCESS_BOUNDARY_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status:
    | 'PUBLIC_ROUTE_TLS_VERIFICATION_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION'
    | 'UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidate: typeof RELATIONSHIP_SPOUSE_T8_NAM_JIHO_2019_ACCESS_BOUNDARY_CANDIDATE;
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
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_NAM_JIHO_2019_ACCESS_BOUNDARY_CONTROL_IDS)[number][];
  controlCount: number;
  recommendedNextAction:
    | 'CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_TLS_VALIDATION_BYPASS_OR_CROSS_SOURCE_STITCHING'
    | 'REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE';
}

type UpstreamReport = ReturnType<typeof buildRelationshipSpouseT8NamGidong2020AccessBoundaryEvidence>;

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

export function buildRelationshipSpouseT8NamJiho2019AccessBoundaryEvidence(): RelationshipSpouseT8NamJiho2019AccessBoundaryEvidenceReport {
  const upstream = buildRelationshipSpouseT8NamGidong2020AccessBoundaryEvidence();
  const accepted = upstreamTwoOfFiveStateAccepted(upstream);
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_NAM_JIHO_2019_ACCESS_BOUNDARY_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status: accepted
      ? ('PUBLIC_ROUTE_TLS_VERIFICATION_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION' as const)
      : ('UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID' as const),
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidate: RELATIONSHIP_SPOUSE_T8_NAM_JIHO_2019_ACCESS_BOUNDARY_CANDIDATE,
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
      ? RELATIONSHIP_SPOUSE_T8_NAM_JIHO_2019_ACCESS_BOUNDARY_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted
      ? RELATIONSHIP_SPOUSE_T8_NAM_JIHO_2019_ACCESS_BOUNDARY_CONTROL_IDS.length
      : 0,
    recommendedNextAction: accepted
      ? ('CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_TLS_VALIDATION_BYPASS_OR_CROSS_SOURCE_STITCHING' as const)
      : ('REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE' as const),
  };

  return {
    evidenceId: `relationship_spouse_t8_nam_jiho_2019_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
