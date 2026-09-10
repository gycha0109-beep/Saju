import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8LeeChangim2016DirectBodyBoundaryEvidence } from './relationship-spouse-t8-lee-changim-2016-direct-body-boundary-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_HONG_SEUNGPIL_2017_ACCESS_BOUNDARY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-hong-seungpil-2017-access-boundary-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_HONG_SEUNGPIL_2017_ACCESS_BOUNDARY_CANDIDATE = Object.freeze({
  candidateId: 'HONG_SEUNGPIL_2017_RISS_KONGJU_DCOLLECTION_TLS_ACCESS_BOUNDARY',
  author: '홍승필',
  publicationYear: 2017,
  title: '『자평진전』에 기초한 궁합실관 연구',
  school: '공주대학교 대학원 동양학과',
  rissId: 'T14388745',
  rissControlNo: '8ebdb4487e4de984ffe0bdc3ef48d419',
  disposableAcquisitionPr: 431,
  acquisitionPrClosedUnmerged: true as const,
  acquisitionExactHead: '6924d2e4ce0f2de20fce3e6364d5def4060b5ed6',
  acquisitionRunId: 34543130721,
  acquisitionArtifactId: 10178025781,
  acquisitionArtifactDigest:
    'sha256:11e7325b4537999a78171ad21165ead321f72aca9b0371fd56bddcd1e5b0e26d',
  ciRunId: 34543130773,
  pccRunId: 34543130704,
  pieRunId: 34543131227,
  rissFulltextTuple: Object.freeze({
    control_no: '8ebdb4487e4de984ffe0bdc3ef48d419',
    p_mat_type: 'be54d9b8bc7cdb09',
    p_submat_type: 'f1a8c7a1de0e08b8',
    fulltext_kind: '',
  }),
  rissSiteAuthoredDispatcherObserved: true as const,
  rissAuthoredDcollectionUrl: 'https://kongju.dcollection.net/common/orgView/200000999222',
  dcollectionHost: 'kongju.dcollection.net',
  dcollectionSiteAuthoredItemId: '200000999222',
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
    'The current RISS public record and site-authored fulltext dispatcher were reproduced without guessing an opaque identifier. RISS authored the exact Kongju dCollection route https://kongju.dcollection.net/common/orgView/200000999222. Standard certificate verification on the hosted runner failed with CERTIFICATE_VERIFY_FAILED because the issuer chain could not be validated. TLS verification was not disabled, no protected route was bypassed, and no complete thesis body was acquired; therefore no body-level semantic admission decision is made.',
  noStitchingBoundary:
    'Hong Seungpil 2017 abstract or catalog language, RISS metadata, dispatcher metadata, and the dCollection transport boundary are not combined with Lee Changim 2016, Choi Eunkyung 2013, Jo Manseop 2007, or any other partial authority to manufacture the missing single-native role-neutral natal spouse selector.',
});

export const RELATIONSHIP_SPOUSE_T8_HONG_SEUNGPIL_2017_ACCESS_BOUNDARY_CONTROL_IDS = Object.freeze([
  'HONG_SEUNGPIL_2017_EXACT_TITLE_AUTHOR_YEAR_SCHOOL_RISS_ID_AND_CONTROL_ARE_PINNED',
  'DISPOSABLE_ACQUISITION_PR_431_IS_CLOSED_UNMERGED',
  'EXACT_RISS_FORM_VALUES_ARE_PINNED_WITH_OBSERVED_EMPTY_FULLTEXT_KIND',
  'CURRENT_RISS_SITE_AUTHORED_DISPATCHER_CONTRACT_IS_OBSERVED',
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

export interface RelationshipSpouseT8HongSeungpil2017AccessBoundaryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_HONG_SEUNGPIL_2017_ACCESS_BOUNDARY_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status:
    | 'PUBLIC_ROUTE_TLS_VERIFICATION_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION'
    | 'UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidate: typeof RELATIONSHIP_SPOUSE_T8_HONG_SEUNGPIL_2017_ACCESS_BOUNDARY_CANDIDATE;
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
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_HONG_SEUNGPIL_2017_ACCESS_BOUNDARY_CONTROL_IDS)[number][];
  controlCount: number;
  recommendedNextAction:
    | 'CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_TLS_VALIDATION_BYPASS_OR_CROSS_SOURCE_STITCHING'
    | 'REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE';
}

type UpstreamReport = ReturnType<
  typeof buildRelationshipSpouseT8LeeChangim2016DirectBodyBoundaryEvidence
>;

function upstreamTwoOfFiveStateAccepted(upstream: UpstreamReport): boolean {
  return (
    upstream.status ===
      'DIRECT_BODY_OPERATIONAL_DYADIC_GUNGWI_POSITIVE_SINGLE_NATIVE_ROLE_NEUTRAL_SELECTOR_NEGATIVE' &&
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

export function buildRelationshipSpouseT8HongSeungpil2017AccessBoundaryEvidence(): RelationshipSpouseT8HongSeungpil2017AccessBoundaryEvidenceReport {
  const upstream = buildRelationshipSpouseT8LeeChangim2016DirectBodyBoundaryEvidence();
  const accepted = upstreamTwoOfFiveStateAccepted(upstream);
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_HONG_SEUNGPIL_2017_ACCESS_BOUNDARY_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status: accepted
      ? ('PUBLIC_ROUTE_TLS_VERIFICATION_BOUNDARY_NO_BODY_LEVEL_ADMISSION_DECISION' as const)
      : ('UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID' as const),
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidate: RELATIONSHIP_SPOUSE_T8_HONG_SEUNGPIL_2017_ACCESS_BOUNDARY_CANDIDATE,
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
      ? RELATIONSHIP_SPOUSE_T8_HONG_SEUNGPIL_2017_ACCESS_BOUNDARY_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted
      ? RELATIONSHIP_SPOUSE_T8_HONG_SEUNGPIL_2017_ACCESS_BOUNDARY_CONTROL_IDS.length
      : 0,
    recommendedNextAction: accepted
      ? ('CONTINUE_SINGLE_SOURCE_PUBLIC_FULLTEXT_DISCOVERY_WITHOUT_TLS_VALIDATION_BYPASS_OR_CROSS_SOURCE_STITCHING' as const)
      : ('REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE' as const),
  };

  return {
    evidenceId: `relationship_spouse_t8_hong_seungpil_2017_access_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
