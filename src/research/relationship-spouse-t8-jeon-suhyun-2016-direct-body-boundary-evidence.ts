import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8YangJihun2025DirectBodyBoundaryEvidence } from './relationship-spouse-t8-yang-jihun-2025-direct-body-boundary-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_JEON_SUHYUN_2016_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-jeon-suhyun-2016-direct-body-boundary-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_JEON_SUHYUN_2016_DIRECT_BODY_BOUNDARY_CANDIDATE = Object.freeze({
  candidateId: 'JEON_SUHYUN_2016_RISS_KYONGGI_DCOLLECTION_DIRECT_FULLTEXT_PDF',
  author: '전수현',
  publicationYear: 2016,
  title: '官星의 十干別 特性에 관한 硏究',
  institution: '경기대학교 문화예술대학원',
  department: '동양철학과',
  degree: '석사',
  rissId: 'T14205413',
  rissControl: '648380763c455520ffe0bdc3ef48d419',
  nanetCallNumber: 'TM 181 -16-52',
  dcollectionItemId: '000000043819',
  exactRissIdentityDirectlyObserved: true as const,
  rissPublicFulltextObserved: true as const,
  rissAuthoredDcollectionRouteFollowed: true as const,
  dcollectionPublicPdfRouteDirectlyAuthored: true as const,
  dcollectionDrm: 'N' as const,
  dcollectionAgree: 'Y' as const,
  directPublicPdfObjectInspected: true as const,
  completePdfTextExtracted: true as const,
  materialPagesVisuallyReviewed: true as const,
  pdfSha256: '980564548e5e8a354013f2ac2388f608f784b566a297bd8ef93d690919013f6f',
  pdfBytes: 1_252_987,
  pdfPageCount: 124,
  pdfEncrypted: false as const,
  pdfVersion: '1.4' as const,
  printedBodyPageOffset: 10,
  printedToPhysicalPageMap: Object.freeze([
    Object.freeze({
      printedPage: 86,
      physicalPdfPage: 96,
      topic: 'dedicated spouse-and-Officer section begins with a female natal chart',
    }),
    Object.freeze({
      printedPage: 87,
      physicalPdfPage: 97,
      topic:
        'female-chart Officer analysis applies Officer mechanics to spouse condition and concludes the spouse would not have been intact',
    }),
    Object.freeze({
      printedPage: 88,
      physicalPdfPage: 98,
      topic:
        'female chart explicitly discusses a present-day husband and family while analyzing the native chart through strong Ji-Earth Direct Officer',
    }),
    Object.freeze({
      printedPage: 100,
      physicalPdfPage: 110,
      topic:
        'modern-significance section explicitly maps Officer to husband or lover for women, children for men, and society or workplace for both sexes',
    }),
    Object.freeze({
      printedPage: 104,
      physicalPdfPage: 114,
      topic:
        'future-research section calls for finer validation of occupational, spouse, and child roles rather than replacing the spouse selector',
    }),
    Object.freeze({
      printedPage: 105,
      physicalPdfPage: 115,
      topic:
        'conclusion repeats that Officer kinship maps to spouse for women and children for men',
    }),
  ] as const),
  femaleOfficerSpouseApplicationExplicit: true as const,
  modernSectionNativeSexConditionedOfficerMappingExplicit: true as const,
  femaleOfficerAsHusbandOrLoverExplicit: true as const,
  maleOfficerAsChildExplicit: true as const,
  bothSexesOfficerAsSocietyOrOccupationExplicit: true as const,
  modernCounselingScopeExpansionExplicit: true as const,
  modernExpansionReplacesSpouseSelector: false as const,
  futureResearchCallsForSpouseAndChildRoleValidation: true as const,
  conclusionRepeatsSexConditionedKinshipMapping: true as const,
  spouseSpecificOperationalReplacementSelectorPublished: false as const,
  nativeSexIndependentOperationalSelectorFound: false as const,
  partnerSexIndependentOperationalSelectorFound: false as const,
  pureNatalRoleNeutralSpouseSelectorFound: false as const,
  completeRoleNeutralNatalInputContractFound: false as const,
  explicitRoleNeutralNatalMappingGapClosedByThisEvidence: false as const,
  currentGovernedSemanticCorrespondenceGapClosedByThisEvidence: false as const,
  relationshipT6InputGapClosedByThisEvidence: false as const,
  exactPositiveBoundary:
    'The directly inspected thesis provides detailed Ten-Stem-specific Officer interpretation, applies Officer mechanics to female spouse cases, and proposes broader modern counseling that considers differentiated occupations and kinship relationships. Its modern section also gives a sex-common Officer meaning for society and workplace.',
  exactNegativeBoundary:
    'The same modern section explicitly preserves native-sex-conditioned kinship semantics: Officer means husband or lover for women, children for men, and society or workplace for both sexes. The conclusion again maps Officer kinship to spouse for women and children for men. The source does not publish a spouse-specific operational replacement selector independent of native sex and partner sex, nor a complete natal-facts-only role-neutral spouse input contract.',
  noStitchingBoundary:
    'Jeon Suhyun 2016 modern counseling expansion and sex-common social or workplace meaning are not combined with Yang Jihun 2025 marriage-as-choice critique, Kim Sanghan 2026 equal-evaluation language, Lee Youngeun contextual remapping, Shin Jae-eok Five-Element transformation, spouse-palace evidence, actual-role language, same-sex-family discussion, or editorial convention to manufacture a role-neutral spouse selector that this source does not publish.',
});

export const RELATIONSHIP_SPOUSE_T8_JEON_SUHYUN_2016_DIRECT_BODY_BOUNDARY_CONTROL_IDS = Object.freeze([
  'JEON_SUHYUN_2016_EXACT_RISS_TITLE_AUTHOR_YEAR_INSTITUTION_IDENTITY_IS_PINNED',
  'RISS_ID_AND_CONTROL_ARE_PINNED_FROM_THE_EXACT_RECORD',
  'RISS_SITE_AUTHORED_FULLTEXT_CHAIN_IS_FOLLOWED_WITHOUT_OPAQUE_ID_GUESSING',
  'KYONGGI_DCOLLECTION_ITEM_000000043819_IS_RISS_AUTHORED',
  'DCOLLECTION_PAGE_AUTHORS_THE_PUBLIC_PDF_TARGET',
  'DCOLLECTION_DRM_N_AND_AGREE_Y_ARE_PINNED',
  'FULL_PDF_SHA256_BYTES_PAGE_COUNT_VERSION_AND_ENCRYPTION_STATE_ARE_CONTENT_ADDRESSED',
  'PRINTED_86_PHYSICAL_96_SPOUSE_AND_OFFICER_SECTION_IS_DIRECTLY_VISUALLY_REVIEWED',
  'PRINTED_87_PHYSICAL_97_FEMALE_OFFICER_MECHANICS_ARE_APPLIED_TO_SPOUSE_CONDITION',
  'PRINTED_88_PHYSICAL_98_PRESENT_DAY_HUSBAND_IS_ANALYZED_WITH_DIRECT_OFFICER',
  'PRINTED_100_PHYSICAL_110_MODERN_SECTION_PRESERVES_NATIVE_SEX_CONDITIONED_OFFICER_MAPPING',
  'MODERN_FEMALE_OFFICER_AS_HUSBAND_OR_LOVER_IS_EXPLICIT',
  'MODERN_MALE_OFFICER_AS_CHILD_IS_EXPLICIT',
  'MODERN_BOTH_SEXES_OFFICER_AS_SOCIETY_OR_WORKPLACE_IS_EXPLICIT',
  'PRINTED_104_PHYSICAL_114_CALLS_FOR_MORE_VALIDATION_OF_SPOUSE_AND_CHILD_ROLES',
  'PRINTED_105_PHYSICAL_115_CONCLUSION_REPEATS_SEX_CONDITIONED_KINSHIP_MAPPING',
  'MODERN_COUNSELING_SCOPE_EXPANSION_IS_NOT_CONVERTED_TO_A_REPLACEMENT_SPOUSE_SELECTOR',
  'NO_NATIVE_SEX_INDEPENDENT_SPOUSE_SELECTOR_IS_INVENTED',
  'NO_PARTNER_SEX_INDEPENDENT_SPOUSE_SELECTOR_IS_INVENTED',
  'NO_PURE_NATAL_COMPLETE_ROLE_NEUTRAL_INPUT_CONTRACT_IS_INVENTED',
  'NO_CROSS_SOURCE_STITCHING_TO_MANUFACTURE_MISSING_SELECTOR',
  'QUALIFYING_PRIMARY_WITNESS_REMAINS_CLOSED',
  'INDEPENDENT_NORMATIVE_PROVENANCE_REMAINS_CLOSED',
  'EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_REMAINS_OPEN',
  'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN',
  'RELATIONSHIP_T6_INPUT_REMAINS_OPEN',
  'EXACTLY_TWO_OF_FIVE_AUTHORITY_GAPS_REMAIN_CLOSED_AND_PRODUCTION_REMAINS_HOLD',
] as const);

export interface RelationshipSpouseT8JeonSuhyun2016DirectBodyBoundaryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_JEON_SUHYUN_2016_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status:
    | 'DIRECT_FULLTEXT_CONFIRMS_MODERN_SEX_CONDITIONED_OFFICER_SPOUSE_USAGE_WITHOUT_ROLE_NEUTRAL_REPLACEMENT_SELECTOR'
    | 'UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidate: typeof RELATIONSHIP_SPOUSE_T8_JEON_SUHYUN_2016_DIRECT_BODY_BOUNDARY_CANDIDATE;
  exactUpstreamTwoOfFiveStateAccepted: boolean;
  directFulltextPdfInspected: true;
  femaleOfficerSpouseApplicationConfirmed: true;
  modernNativeSexConditionedOfficerMappingConfirmed: true;
  modernCounselingScopeExpansionConfirmed: true;
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
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_JEON_SUHYUN_2016_DIRECT_BODY_BOUNDARY_CONTROL_IDS)[number][];
  controlCount: number;
  recommendedNextAction:
    | 'CONTINUE_SINGLE_SOURCE_ROLE_NEUTRAL_NATAL_SPOUSE_MAPPING_DISCOVERY_WITH_EXPLICIT_NATIVE_AND_PARTNER_SEX_INDEPENDENCE_REQUIRED'
    | 'REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE';
}

function upstreamTwoOfFiveStateAccepted(): boolean {
  const upstream = buildRelationshipSpouseT8YangJihun2025DirectBodyBoundaryEvidence();
  return (
    upstream.status ===
      'DIRECT_FULLTEXT_CONFIRMS_SEX_CONDITIONED_SPOUSE_MAPPING_AND_MODERN_APPLICABILITY_CRITIQUE_WITHOUT_ROLE_NEUTRAL_REPLACEMENT_SELECTOR' &&
    upstream.exactUpstreamTwoOfFiveStateAccepted === true &&
    upstream.explicitRoleNeutralNatalMappingEstablished === false &&
    upstream.currentGovernedMethodSemanticCorrespondenceEstablished === false &&
    upstream.currentRelationshipT6InputPathEstablished === false &&
    upstream.qualifyingPrimaryWitnessRemainsClosed === true &&
    upstream.independentNormativeProvenanceRemainsClosed === true &&
    upstream.authorityGapsClosedCount === 2 &&
    upstream.authorityGapsOpenCount === 3 &&
    upstream.authorityAdmissionReady === false &&
    upstream.productionPromotionReady === false &&
    upstream.productionState === 'HOLD'
  );
}

export function buildRelationshipSpouseT8JeonSuhyun2016DirectBodyBoundaryEvidence(): RelationshipSpouseT8JeonSuhyun2016DirectBodyBoundaryEvidenceReport {
  const upstream = buildRelationshipSpouseT8YangJihun2025DirectBodyBoundaryEvidence();
  const accepted = upstreamTwoOfFiveStateAccepted();
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_JEON_SUHYUN_2016_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status: accepted
      ? ('DIRECT_FULLTEXT_CONFIRMS_MODERN_SEX_CONDITIONED_OFFICER_SPOUSE_USAGE_WITHOUT_ROLE_NEUTRAL_REPLACEMENT_SELECTOR' as const)
      : ('UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID' as const),
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidate: RELATIONSHIP_SPOUSE_T8_JEON_SUHYUN_2016_DIRECT_BODY_BOUNDARY_CANDIDATE,
    exactUpstreamTwoOfFiveStateAccepted: accepted,
    directFulltextPdfInspected: true as const,
    femaleOfficerSpouseApplicationConfirmed: true as const,
    modernNativeSexConditionedOfficerMappingConfirmed: true as const,
    modernCounselingScopeExpansionConfirmed: true as const,
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
      ? RELATIONSHIP_SPOUSE_T8_JEON_SUHYUN_2016_DIRECT_BODY_BOUNDARY_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted ? RELATIONSHIP_SPOUSE_T8_JEON_SUHYUN_2016_DIRECT_BODY_BOUNDARY_CONTROL_IDS.length : 0,
    recommendedNextAction: accepted
      ? ('CONTINUE_SINGLE_SOURCE_ROLE_NEUTRAL_NATAL_SPOUSE_MAPPING_DISCOVERY_WITH_EXPLICIT_NATIVE_AND_PARTNER_SEX_INDEPENDENCE_REQUIRED' as const)
      : ('REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE' as const),
  };
  return {
    evidenceId: `relationship_spouse_t8_jeon_suhyun_2016_direct_body_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
