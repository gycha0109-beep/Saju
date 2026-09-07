import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8CurrentScholarlyMethodBoundaryEvidence } from './relationship-spouse-t8-current-scholarly-method-boundary-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_KIM_YOUNGJIN_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-kim-youngjin-direct-body-boundary-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_KIM_YOUNGJIN_DIRECT_BODY_BOUNDARY_CANDIDATE = Object.freeze({
  candidateId: 'KIM_YOUNGJIN_2020_KYONGGI_DIRECT_PDF',
  author: '김영진',
  publicationYear: 2020,
  title: '사주명리학의 宮과 星에 관한 연구',
  institution: '경기대학교 행정·사회복지대학원 석사학위논문',
  scholarlyLocator: 'DBpia T15521643 / RISS T15521643',
  rissControlNo: '9e88d3246706b84affe0bdc3ef48d419',
  institutionalOriginalRecord: 'https://dcollection.kyonggi.ac.kr/common/orgView/000000055103',
  inspectedPdfAcquisitionUrl:
    'https://dcollection.kyonggi.ac.kr/public_resource/pdf/000000055103_20260907172125.pdf',
  directInstitutionalPdfObjectInspected: true as const,
  pdfScreenshotReviewed: true as const,
  pdfSha256: '88d82fab599bea08d5778fdd488d8d614af9d26071768a64a9bce63a6433e526',
  pdfBytes: 1_115_446,
  pdfPageCount: 94,
  pdfEncrypted: false as const,
  printedToPhysicalPageMap: Object.freeze([
    Object.freeze({ printedPage: 50, physicalPdfPage: 61, topic: 'basic palace allocation; Day pillar as self/spouse palace' }),
    Object.freeze({ printedPage: 55, physicalPdfPage: 66, topic: 'female-chart palace/star table and explicit spouse-star selector' }),
    Object.freeze({ printedPage: 67, physicalPdfPage: 78, topic: 'Gung/Seong Yukchin relationship interpretation' }),
    Object.freeze({ printedPage: 71, physicalPdfPage: 82, topic: 'application under social change' }),
    Object.freeze({ printedPage: 73, physicalPdfPage: 84, topic: 'developmental application proposal' }),
    Object.freeze({ printedPage: 74, physicalPdfPage: 85, topic: 'modern family/social relationship reinterpretation and gender-role caution' }),
    Object.freeze({ printedPage: 75, physicalPdfPage: 86, topic: 'expanded modern palace meanings and value-change table' }),
    Object.freeze({ printedPage: 77, physicalPdfPage: 88, topic: 'conclusion opening' }),
    Object.freeze({ printedPage: 78, physicalPdfPage: 89, topic: 'conclusion continuation and future direction' }),
  ] as const),
  dayPillarSelfAndSpousePalaceExplicit: true as const,
  explicitGenderConditionedSpouseSelector: Object.freeze({
    maleChart: 'Direct Wealth / 正財',
    femaleChart: 'Direct Officer / 正官',
  } as const),
  genderConditionedSelectorDirectlyReviewedOnPrintedPage55: true as const,
  genderConditionedSelectorRepeatedElsewhereInBody: true as const,
  socialChangeReinterpretationChapterDirectlyReviewed: true as const,
  modernGenderRoleChangeExplicitlyDiscussed: true as const,
  modernFamilyAndSocialRelationshipExpansionExplicitlyDiscussed: true as const,
  roleNeutralOperationalSpouseSelectorIntroducedInReviewedSocialChangeOrConclusionPages: false as const,
  traditionalGenderDistinctionCritiquedOrCautionedWithoutReplacementSelector: true as const,
  explicitRoleNeutralNatalSpouseSelectorEstablished: false as const,
  completeRoleNeutralSingleNatalInputContractEstablished: false as const,
  canonicalLosslessFitEstablished: false as const,
  sourceMethodInputsOrSemantics: Object.freeze([
    'Day Stem and Day Branch positions',
    'exact Ten-God subtype by Day-Stem Yin-Yang/Five-Element relation',
    'male/female chart branch for spouse and other Yukchin assignments',
    'Heavenly-Stem combination relations',
    'Sixty-Jiazi placement logic',
    'source-defined ideal family palace/star relationship chart',
    'branch relation interpretations including Hap/Hyeong/Chung/Pa and Wonjin',
    'expanded family/social-role meanings used in the modern reinterpretation chapter',
  ] as const),
  exactDirectBodyFinding:
    'The directly inspected institutional PDF defines the Day pillar as the native-and-spouse palace and explicitly states on printed p.55 that a male-chart spouse is Direct Wealth while a female-chart spouse is Direct Officer. The later social-change chapter argues that family structure, gender roles, and social relationships have changed and that Gung/Seong interpretation should expand accordingly, but the directly reviewed chapter and conclusion do not publish a replacement partner-gender-independent operational spouse selector.',
  exactRoleNeutralBoundary:
    'Modernization language, criticism of inherited male/female distinctions, and expansion of palace meanings into broader social relationships cannot be converted into an executable role-neutral spouse rule when the same source explicitly retains the male-Direct-Wealth/female-Direct-Officer selector and does not state an alternative selector.',
  exactCanonicalBoundary:
    'The current governed snapshot can represent raw stems/branches and exact Ten-God observations, but the source method additionally depends on a sex-conditioned family-role selector, source-specific palace/star family allocation, Sixty-Jiazi placement logic, relation interpretations including Hap/Hyeong/Chung/Pa/Wonjin, and expanded modern social-role semantics. Raw fact availability therefore does not establish a lossless governed spouse-method correspondence.',
  nextAction:
    'Prioritize direct acquisition of Kweon Sujeong 2021 pp.48/78/82/85 because Kim Young-jin 2020 is now directly verified as gender-conditioned despite its social-change reinterpretation chapter. Only a same-source explicit role-neutral operational selector with a complete governed input contract can change the authority ledger.',
});

export const RELATIONSHIP_SPOUSE_T8_KIM_YOUNGJIN_DIRECT_BODY_BOUNDARY_CONTROL_IDS = Object.freeze([
  'DIRECT_INSTITUTIONAL_PDF_IDENTITY_IS_CONTENT_ADDRESSED',
  'PRINTED_AND_PHYSICAL_PDF_PAGE_COORDINATES_ARE_DISTINGUISHED',
  'DAY_PILLAR_SPOUSE_PALACE_DOES_NOT_BY_ITSELF_DEFINE_ROLE_NEUTRAL_SELECTION',
  'MALE_DIRECT_WEALTH_FEMALE_DIRECT_OFFICER_SELECTOR_IS_PRESERVED_AS_SOURCE_FACT',
  'SOCIAL_CHANGE_REINTERPRETATION_IS_NOT_RELABELED_AS_ROLE_NEUTRAL_OPERATIONAL_SELECTOR',
  'GENDER_ROLE_CRITIQUE_WITHOUT_REPLACEMENT_RULE_DOES_NOT_CLOSE_MAPPING_GAP',
  'NO_NATIVE_OR_PARTNER_GENDER_OR_SEXUAL_ORIENTATION_INFERENCE',
  'NO_CROSS_SOURCE_STITCHING_WITH_KWEON_HONG_SONG_KIM_MANTAE_OR_COMMERCIAL_EDITORIAL_RULES',
  'NO_SOURCE_SPECIFIC_PALACE_STAR_OR_RELATION_SEMANTICS_INVENTED_FROM_RAW_CANONICAL_FACTS',
  'INDEPENDENT_NORMATIVE_PROVENANCE_FOR_CURRENT_ROLE_NEUTRAL_SPOUSE_METHOD_REMAINS_OPEN',
  'EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_REMAINS_OPEN',
  'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN',
  'RELATIONSHIP_T6_INPUT_REMAINS_OPEN',
  'EXACTLY_ONE_OF_FIVE_AUTHORITY_GAPS_REMAINS_CLOSED',
  'NO_SPOUSE_T8_PRODUCER_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_EFFECT',
] as const);

export interface RelationshipSpouseT8KimYoungjinDirectBodyBoundaryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_KIM_YOUNGJIN_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status: 'DIRECT_INSTITUTIONAL_PDF_CONFIRMS_GENDERED_SPOUSE_SELECTOR_SOCIAL_CHANGE_DOES_NOT_SUPPLY_ROLE_NEUTRAL_REPLACEMENT';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidate: typeof RELATIONSHIP_SPOUSE_T8_KIM_YOUNGJIN_DIRECT_BODY_BOUNDARY_CANDIDATE;
  directInstitutionalPdfCandidateCount: 1;
  directInstitutionalPdfInspected: true;
  pdfScreenshotReviewed: true;
  genderConditionedSpouseSelectorConfirmed: true;
  socialChangeReinterpretationReviewed: true;
  roleNeutralReplacementSelectorFound: false;
  roleNeutralNatalMappingEstablished: false;
  pureSingleNatalInputPathEstablished: false;
  independentNormativeProvenanceForCurrentRoleNeutralSpouseMethodEstablished: false;
  currentGovernedMethodSemanticCorrespondenceEstablished: false;
  currentRelationshipT6InputPathEstablished: false;
  qualifyingPrimaryWitnessGapRemainsClosed: true;
  authorityGapsClosedCount: 1;
  authorityGapsOpenCount: 4;
  authorityAdmissionReady: false;
  crossSourceStitchingAuthorized: false;
  genderOrOrientationInferenceAuthorized: false;
  spouseT8ProducerReady: false;
  productionPromotionReady: false;
  controlIds: typeof RELATIONSHIP_SPOUSE_T8_KIM_YOUNGJIN_DIRECT_BODY_BOUNDARY_CONTROL_IDS;
  controlCount: 15;
  recommendedNextAction: 'ACQUIRE_KWEON_2021_ACTUAL_BODY_AS_HIGHEST_PRIORITY_ROLE_NEUTRAL_FRONTIER';
}

export function buildRelationshipSpouseT8KimYoungjinDirectBodyBoundaryEvidence(): RelationshipSpouseT8KimYoungjinDirectBodyBoundaryEvidenceReport {
  const upstream = buildRelationshipSpouseT8CurrentScholarlyMethodBoundaryEvidence();
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_KIM_YOUNGJIN_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status:
      'DIRECT_INSTITUTIONAL_PDF_CONFIRMS_GENDERED_SPOUSE_SELECTOR_SOCIAL_CHANGE_DOES_NOT_SUPPLY_ROLE_NEUTRAL_REPLACEMENT' as const,
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidate: RELATIONSHIP_SPOUSE_T8_KIM_YOUNGJIN_DIRECT_BODY_BOUNDARY_CANDIDATE,
    directInstitutionalPdfCandidateCount: 1 as const,
    directInstitutionalPdfInspected: true as const,
    pdfScreenshotReviewed: true as const,
    genderConditionedSpouseSelectorConfirmed: true as const,
    socialChangeReinterpretationReviewed: true as const,
    roleNeutralReplacementSelectorFound: false as const,
    roleNeutralNatalMappingEstablished: false as const,
    pureSingleNatalInputPathEstablished: false as const,
    independentNormativeProvenanceForCurrentRoleNeutralSpouseMethodEstablished: false as const,
    currentGovernedMethodSemanticCorrespondenceEstablished: false as const,
    currentRelationshipT6InputPathEstablished: false as const,
    qualifyingPrimaryWitnessGapRemainsClosed: true as const,
    authorityGapsClosedCount: 1 as const,
    authorityGapsOpenCount: 4 as const,
    authorityAdmissionReady: false as const,
    crossSourceStitchingAuthorized: false as const,
    genderOrOrientationInferenceAuthorized: false as const,
    spouseT8ProducerReady: false as const,
    productionPromotionReady: false as const,
    controlIds: RELATIONSHIP_SPOUSE_T8_KIM_YOUNGJIN_DIRECT_BODY_BOUNDARY_CONTROL_IDS,
    controlCount: 15 as const,
    recommendedNextAction:
      'ACQUIRE_KWEON_2021_ACTUAL_BODY_AS_HIGHEST_PRIORITY_ROLE_NEUTRAL_FRONTIER' as const,
  };

  return {
    evidenceId: `relationship_spouse_t8_kim_youngjin_direct_body_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
