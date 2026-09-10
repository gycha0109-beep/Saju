import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8KimSanghan2026DirectBodyBoundaryEvidence } from './relationship-spouse-t8-kim-sanghan-2026-direct-body-boundary-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_YANG_JIHUN_2025_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-yang-jihun-2025-direct-body-boundary-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_YANG_JIHUN_2025_DIRECT_BODY_BOUNDARY_CANDIDATE = Object.freeze({
  candidateId: 'YANG_JIHUN_2025_RISS_UBE_DCOLLECTION_DIRECT_FULLTEXT_PDF',
  author: '양지훈',
  publicationYear: 2025,
  title: '명리학 곤명(坤命) 길흉(吉凶)에 대한 연구 : 『연해자평』을 중심으로',
  institution: '국제뇌교육종합대학원대학교',
  department: '동양학과 실용명리전공',
  degree: '석사',
  rissId: 'T17159723',
  rissControl: 'a0a78b8578ab695effe0bdc3ef48d419',
  uci: 'I804:44032-200000847815',
  dcollectionId: '200000847815',
  nanetControl: 'KDMT12025000053655',
  rissPublicFulltextObserved: true as const,
  exactRissIdentityDirectlyObserved: true as const,
  rissAuthoredDcollectionRouteFollowed: true as const,
  directPublicPdfObjectInspected: true as const,
  completePdfTextExtracted: true as const,
  materialPagesVisuallyReviewed: true as const,
  pdfSha256: '1239c35a62f1e98324d619c0f1703f7b577b611b1511f988677db41ddd754091',
  pdfBytes: 2_371_449,
  pdfPageCount: 83,
  pdfEncrypted: false as const,
  printedBodyPageOffset: 8,
  printedToPhysicalPageMap: Object.freeze([
    Object.freeze({
      printedPage: 17,
      physicalPdfPage: 25,
      topic:
        'states that kinship targets partly differ by native sex and explicitly maps male Wealth to wife while female Officer maps to husband',
    }),
    Object.freeze({
      printedPage: 51,
      physicalPdfPage: 59,
      topic:
        'modern female case analysis explicitly applies Food/Output as children and Officer as husband while judging the chart through the classical female-fate framework',
    }),
    Object.freeze({
      printedPage: 68,
      physicalPdfPage: 76,
      topic:
        'conclusion identifies husband and children plus marriage-centered evaluation as core classical female-fate criteria and finds limits for unmarried or no-childbirth modern women',
    }),
    Object.freeze({
      printedPage: 69,
      physicalPdfPage: 77,
      topic:
        'proposes broader natal-pattern-useful-god-luck-cycle evaluation and supplementary shinsal use, and states marriage is a choice, without publishing a replacement spouse selector',
    }),
  ] as const),
  classicalSexConditionedKinshipMappingExplicit: true as const,
  maleWealthAsWifeMappingExplicit: true as const,
  femaleOfficerAsHusbandMappingExplicit: true as const,
  sameMappingUsedInModernFemaleCaseAnalysis: true as const,
  husbandChildrenMarriageCenteredEvaluationExplicit: true as const,
  modernUnmarriedOrNoChildbirthApplicabilityLimitExplicit: true as const,
  modernMarriageAsChoiceExplicit: true as const,
  modernBroaderLifeEvaluationDirectionExplicit: true as const,
  alternativeUsesNatalChartPatternYongshinLuckCyclesAndSupplementaryShinsal: true as const,
  alternativePublishesRoleNeutralReplacementSpouseSelector: false as const,
  spouseSpecificOperationalReplacementSelectorPublished: false as const,
  nativeSexIndependentOperationalSelectorFound: false as const,
  partnerSexIndependentOperationalSelectorFound: false as const,
  pureNatalRoleNeutralSpouseSelectorFound: false as const,
  completeRoleNeutralNatalInputContractFound: false as const,
  explicitRoleNeutralNatalMappingGapClosedByThisEvidence: false as const,
  currentGovernedSemanticCorrespondenceGapClosedByThisEvidence: false as const,
  relationshipT6InputGapClosedByThisEvidence: false as const,
  modernApplicabilityCritiqueConfirmed: true as const,
  exactPositiveBoundary:
    'The directly inspected thesis establishes that classical Yeonhaejapyeong female-fate evaluation is centered on husband, children, marriage, and related household criteria, and it explicitly finds limits when that framework is applied to unmarried modern women or women who do not seek childbirth. It recommends a broader life evaluation using the natal chart, pattern, Yongshin, luck cycles, and supplementary Shinsal, and states that marriage in modern society is a choice rather than a necessity.',
  exactNegativeBoundary:
    'The same thesis explicitly preserves sex-conditioned kinship mapping in its own Ten-God table, mapping male Wealth to wife and female Officer to husband, and it reuses Officer as husband in a modern female case. Its proposed modernization broadens the criteria used to judge a life but does not publish a spouse-specific operational selector that is independent of native sex and partner sex or a complete role-neutral natal spouse input contract.',
  noStitchingBoundary:
    'Yang Jihun 2025 modern-applicability critique and broader life-evaluation proposal are not combined with Kim Sanghan 2026 equal-evaluation language, Lee Youngeun contextual remapping, Shin Jae-eok Five-Element transformation, spouse-palace evidence, actual-role language, same-sex-family discussion, or any commercial or editorial convention to manufacture a role-neutral spouse selector that this thesis does not publish.',
});

export const RELATIONSHIP_SPOUSE_T8_YANG_JIHUN_2025_DIRECT_BODY_BOUNDARY_CONTROL_IDS = Object.freeze([
  'YANG_JIHUN_2025_EXACT_RISS_TITLE_AUTHOR_YEAR_INSTITUTION_IDENTITY_IS_PINNED',
  'RISS_PUBLIC_FULLTEXT_ROUTE_IS_DIRECTLY_RESOLVED_WITHOUT_OPAQUE_ID_GUESSING',
  'RISS_AUTHORED_DCOLLECTION_ROUTE_LEADS_TO_COMPLETE_83_PAGE_PDF',
  'FULL_PDF_SHA256_BYTES_PAGE_COUNT_AND_ENCRYPTION_STATE_ARE_CONTENT_ADDRESSED',
  'PRINTED_17_PHYSICAL_25_SEX_CONDITIONED_KINSHIP_TABLE_IS_DIRECTLY_VISUALLY_REVIEWED',
  'MALE_WEALTH_AS_WIFE_MAPPING_IS_EXPLICIT',
  'FEMALE_OFFICER_AS_HUSBAND_MAPPING_IS_EXPLICIT',
  'PRINTED_51_PHYSICAL_59_MODERN_FEMALE_CASE_REUSES_OFFICER_AS_HUSBAND',
  'PRINTED_68_PHYSICAL_76_MARRIAGE_HUSBAND_CHILDREN_CENTERED_CLASSICAL_EVALUATION_IS_EXPLICIT',
  'MODERN_UNMARRIED_OR_NO_CHILDBIRTH_APPLICABILITY_LIMIT_IS_EXPLICIT',
  'PRINTED_69_PHYSICAL_77_MARRIAGE_AS_CHOICE_AND_BROADER_LIFE_EVALUATION_DIRECTION_IS_EXPLICIT',
  'MODERN_ALTERNATIVE_USES_NATAL_PATTERN_YONGSHIN_LUCK_CYCLES_AND_SUPPLEMENTARY_SHINSAL',
  'MODERN_APPLICABILITY_CRITIQUE_IS_NOT_CONVERTED_TO_A_REPLACEMENT_SPOUSE_SELECTOR',
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

export interface RelationshipSpouseT8YangJihun2025DirectBodyBoundaryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_YANG_JIHUN_2025_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status:
    | 'DIRECT_FULLTEXT_CONFIRMS_SEX_CONDITIONED_SPOUSE_MAPPING_AND_MODERN_APPLICABILITY_CRITIQUE_WITHOUT_ROLE_NEUTRAL_REPLACEMENT_SELECTOR'
    | 'UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidate: typeof RELATIONSHIP_SPOUSE_T8_YANG_JIHUN_2025_DIRECT_BODY_BOUNDARY_CANDIDATE;
  exactUpstreamTwoOfFiveStateAccepted: boolean;
  directFulltextPdfInspected: true;
  classicalSexConditionedSpouseMappingConfirmed: true;
  modernFemaleCaseReuseConfirmed: true;
  modernApplicabilityCritiqueConfirmed: true;
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
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_YANG_JIHUN_2025_DIRECT_BODY_BOUNDARY_CONTROL_IDS)[number][];
  controlCount: number;
  recommendedNextAction:
    | 'CONTINUE_SINGLE_SOURCE_ROLE_NEUTRAL_NATAL_SPOUSE_MAPPING_DISCOVERY_WITHOUT_CONVERTING_MODERN_APPLICABILITY_CRITIQUE_INTO_A_SPOUSE_SELECTOR'
    | 'REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE';
}

function upstreamTwoOfFiveStateAccepted(): boolean {
  const upstream = buildRelationshipSpouseT8KimSanghan2026DirectBodyBoundaryEvidence();
  return (
    upstream.status ===
      'DIRECT_FULLTEXT_CONFIRMS_MODERN_EQUAL_EVALUATION_BUT_NO_ROLE_NEUTRAL_OPERATIONAL_SPOUSE_SELECTOR' &&
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

export function buildRelationshipSpouseT8YangJihun2025DirectBodyBoundaryEvidence(): RelationshipSpouseT8YangJihun2025DirectBodyBoundaryEvidenceReport {
  const upstream = buildRelationshipSpouseT8KimSanghan2026DirectBodyBoundaryEvidence();
  const accepted = upstreamTwoOfFiveStateAccepted();
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_YANG_JIHUN_2025_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status: accepted
      ? ('DIRECT_FULLTEXT_CONFIRMS_SEX_CONDITIONED_SPOUSE_MAPPING_AND_MODERN_APPLICABILITY_CRITIQUE_WITHOUT_ROLE_NEUTRAL_REPLACEMENT_SELECTOR' as const)
      : ('UPSTREAM_TWO_OF_FIVE_AUTHORITY_STATE_INVALID' as const),
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidate: RELATIONSHIP_SPOUSE_T8_YANG_JIHUN_2025_DIRECT_BODY_BOUNDARY_CANDIDATE,
    exactUpstreamTwoOfFiveStateAccepted: accepted,
    directFulltextPdfInspected: true as const,
    classicalSexConditionedSpouseMappingConfirmed: true as const,
    modernFemaleCaseReuseConfirmed: true as const,
    modernApplicabilityCritiqueConfirmed: true as const,
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
      ? RELATIONSHIP_SPOUSE_T8_YANG_JIHUN_2025_DIRECT_BODY_BOUNDARY_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted ? RELATIONSHIP_SPOUSE_T8_YANG_JIHUN_2025_DIRECT_BODY_BOUNDARY_CONTROL_IDS.length : 0,
    recommendedNextAction: accepted
      ? ('CONTINUE_SINGLE_SOURCE_ROLE_NEUTRAL_NATAL_SPOUSE_MAPPING_DISCOVERY_WITHOUT_CONVERTING_MODERN_APPLICABILITY_CRITIQUE_INTO_A_SPOUSE_SELECTOR' as const)
      : ('REESTABLISH_TWO_OF_FIVE_AUTHORITY_STATE' as const),
  };
  return {
    evidenceId: `relationship_spouse_t8_yang_jihun_2025_direct_body_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
