import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8KweonDirectBodyBoundaryEvidence } from './relationship-spouse-t8-kweon-direct-body-boundary-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_SONG_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-song-direct-body-boundary-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_SONG_DIRECT_BODY_BOUNDARY_CANDIDATE = Object.freeze({
  candidateId: 'SONG_JAEWOO_2023_UBE_DIRECT_PDF',
  author: '송재우',
  publicationYear: 2023,
  title: '명리학 육친론 비교연구 : (연해자평, 적천수, 궁통보감을 중심으로)',
  institution: '국제뇌교육종합대학원대학교 동양학과 실용명리전공 석사학위논문',
  scholarlyLocator: 'RISS T16680125 / UCI I804:44032-200000668457',
  rissControlNo: '105b810f6d2f3decffe0bdc3ef48d419',
  dcollectionItemId: '200000668457',
  institutionalOriginalRecord: 'https://ube.dcollection.net/common/orgView/200000668457',
  inspectedPdfAcquisitionUrl:
    'https://ube.dcollection.net/public_resource/pdf/200000668457_20260908021824.pdf',
  directInstitutionalPdfObjectInspected: true as const,
  pdfScreenshotReviewed: true as const,
  pdfSha256: 'fb71da7de3fd1b511fc071d7d360173e63a134191c6fd10f6b8955cd151917c',
  pdfBytes: 2_867_892,
  pdfPageCount: 165,
  pdfEncrypted: false as const,
  printedToPhysicalPageMap: Object.freeze([
    Object.freeze({ printedPage: 54, physicalPdfPage: 68, topic: 'Yeonhaejapyeong role limitation and Jeokcheonsu role-based alternative' }),
    Object.freeze({ printedPage: 55, physicalPdfPage: 69, topic: 'Jeokcheonsu husband criterion ambiguity and Gungtongbogam situational limits' }),
    Object.freeze({ printedPage: 56, physicalPdfPage: 70, topic: 'three-system comparison table and historical-context boundary' }),
    Object.freeze({ printedPage: 57, physicalPdfPage: 71, topic: 'Yukchin-use proposal chapter and comparison case opening' }),
    Object.freeze({ printedPage: 58, physicalPdfPage: 72, topic: 'gender-conditioned Yeonhaejapyeong case application' }),
    Object.freeze({ printedPage: 59, physicalPdfPage: 73, topic: 'Gungtongbogam wife/child Yongsin-Huisin application and proposal opening' }),
    Object.freeze({ printedPage: 60, physicalPdfPage: 74, topic: 'proposal: choose Yukchin system according to relationship-analysis purpose and household situation' }),
    Object.freeze({ printedPage: 61, physicalPdfPage: 75, topic: 'proposal: married-woman/one-person-household and rural-household contextual branches' }),
    Object.freeze({ printedPage: 62, physicalPdfPage: 76, topic: 'conclusion: sex/genealogy versus actual-role meta-selection rule' }),
    Object.freeze({ printedPage: 63, physicalPdfPage: 77, topic: 'conclusion: social/era/extrinsic-variable limitations' }),
  ] as const),
  yeonhaejapyeongSexAndGenealogyCenteredRelationshipMappingExplicit: true as const,
  jeokcheonsuActualRoleOrInfluenceCenteredRelationshipMappingExplicit: true as const,
  gungtongbogamWifeAndChildYongsinHuisinMappingExplicit: true as const,
  proposalChoosesDifferentYukchinSystemsBySituationExplicit: true as const,
  marriedWomanOrOnePersonHouseholdJeokcheonsuBranchExplicit: true as const,
  ruralOrChildEconomicProviderGungtongbogamBranchExplicit: true as const,
  conclusionSexOrGenealogyVersusActualRoleMetaRuleExplicit: true as const,
  socialEraFamilyStructureExternalVariablesExplicit: true as const,
  jeokcheonsuHusbandCriterionExplicitlyUnclear: true as const,
  onePartnerGenderIndependentOperationalSpouseSelectorFound: false as const,
  spouseSpecificRoleNeutralRuleFound: false as const,
  pureSingleNatalInputContractFound: false as const,
  contextualMetaRuleRequiresNonNatalFacts: true as const,
  sourceSpecificYongsinOrHuisinSemanticsRequiredForOneBranch: true as const,
  explicitRoleNeutralNatalSpouseSelectorEstablished: false as const,
  completeRoleNeutralSingleNatalInputContractEstablished: false as const,
  canonicalLosslessFitEstablished: false as const,
  exactDirectBodyFinding:
    'The directly inspected institutional PDF proposes a modern meta-rule for choosing among three inherited Yukchin systems. Sex or genealogy-centered relationship analysis is assigned primarily to Yeonhaejapyeong, while actual-role or actual-influence-centered analysis may use Jeokcheonsu or Gungtongbogam in specific situations. The source also explicitly recommends Jeokcheonsu for some married-woman or one-person-household contexts and Gungtongbogam for some rural or child-economic-provider households.',
  exactSpouseBoundary:
    'The proposal is not one spouse-specific, partner-gender-independent natal selector. The same source states that Jeokcheonsu lacks a clear criterion for identifying a husband, retains gendered/genealogical Yeonhaejapyeong relationship assignments, and limits Gungtongbogam to wife/child mappings through Yongsin-Huisin semantics. The proposal therefore selects an interpretive system according to relationship purpose and lived situation rather than defining one executable spouse rule.',
  exactInputBoundary:
    'The source expressly treats household form, actual relationship role or influence, rural/economic-family structure, society, era, and other chart-extrinsic circumstances as variables affecting which Yukchin system is appropriate. That contextual meta-rule is not computable from a single CanonicalSajuSnapshot alone.',
  exactCanonicalBoundary:
    'The governed snapshot can represent raw stems, branches, and exact Ten-God observations, but the source proposal additionally needs non-natal role/context facts and, for one branch, source-specific Yongsin-Huisin semantics. It also does not resolve Jeokcheonsu husband selection. Raw canonical fact availability therefore cannot establish a lossless governed role-neutral spouse-method correspondence.',
  nextAction:
    'Freeze the directly inspected Jung Su-a 2025 body next, specifically testing whether its general Day-Branch spouse-palace method remains operationally coupled to gender-conditioned husband-Officer and wife-Wealth selectors in actual cases.',
});

export const RELATIONSHIP_SPOUSE_T8_SONG_DIRECT_BODY_BOUNDARY_CONTROL_IDS = Object.freeze([
  'DIRECT_INSTITUTIONAL_PDF_IDENTITY_IS_CONTENT_ADDRESSED',
  'PRINTED_AND_PHYSICAL_PDF_PAGE_COORDINATES_ARE_DISTINGUISHED',
  'SEX_OR_GENEALOGY_CENTERED_RELATIONSHIP_RULE_IS_PRESERVED_AS_SOURCE_FACT',
  'ACTUAL_ROLE_OR_INFLUENCE_META_RULE_IS_PRESERVED_AS_SOURCE_FACT',
  'CONTEXTUAL_SYSTEM_SELECTION_IS_NOT_RELABELED_AS_ONE_ROLE_NEUTRAL_SPOUSE_SELECTOR',
  'JEOKCHEONSU_HUSBAND_CRITERION_AMBIGUITY_REMAINS_EXPLICIT',
  'GUNGTONGBOGAM_WIFE_CHILD_YONGSIN_HUISIN_LIMIT_IS_PRESERVED',
  'HOUSEHOLD_ROLE_SOCIAL_AND_ERA_CONTEXT_ARE_NOT_INVENTED_FROM_NATAL_FACTS',
  'NO_NATIVE_OR_PARTNER_GENDER_OR_SEXUAL_ORIENTATION_INFERENCE',
  'NO_CROSS_SOURCE_STITCHING_WITH_KWEON_KIM_YOUNGJIN_KIM_MANTAE_HONG_JUNG_OR_COMMERCIAL_EDITORIAL_RULES',
  'INDEPENDENT_NORMATIVE_PROVENANCE_FOR_CURRENT_ROLE_NEUTRAL_SPOUSE_METHOD_REMAINS_OPEN',
  'EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_REMAINS_OPEN',
  'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN',
  'RELATIONSHIP_T6_INPUT_REMAINS_OPEN',
  'EXACTLY_ONE_OF_FIVE_AUTHORITY_GAPS_REMAINS_CLOSED',
  'NO_SPOUSE_T8_PRODUCER_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_EFFECT',
] as const);

export interface RelationshipSpouseT8SongDirectBodyBoundaryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_SONG_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status: 'DIRECT_INSTITUTIONAL_PDF_CONFIRMS_CONTEXTUAL_YUKCHIN_META_RULE_BUT_NO_ROLE_NEUTRAL_NATAL_SPOUSE_SELECTOR';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidate: typeof RELATIONSHIP_SPOUSE_T8_SONG_DIRECT_BODY_BOUNDARY_CANDIDATE;
  directInstitutionalPdfCandidateCount: 1;
  directInstitutionalPdfInspected: true;
  pdfScreenshotReviewed: true;
  contextualYukchinSystemMetaRuleConfirmed: true;
  actualRoleOrInfluenceBranchConfirmed: true;
  oneRoleNeutralSpouseSelectorFound: false;
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
  controlIds: typeof RELATIONSHIP_SPOUSE_T8_SONG_DIRECT_BODY_BOUNDARY_CONTROL_IDS;
  controlCount: 16;
  recommendedNextAction: 'FREEZE_JUNG_SUA_2025_DIRECT_BODY_GENDERED_STAR_COUPLING_BOUNDARY';
}

export function buildRelationshipSpouseT8SongDirectBodyBoundaryEvidence(): RelationshipSpouseT8SongDirectBodyBoundaryEvidenceReport {
  const upstream = buildRelationshipSpouseT8KweonDirectBodyBoundaryEvidence();
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_SONG_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status:
      'DIRECT_INSTITUTIONAL_PDF_CONFIRMS_CONTEXTUAL_YUKCHIN_META_RULE_BUT_NO_ROLE_NEUTRAL_NATAL_SPOUSE_SELECTOR' as const,
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidate: RELATIONSHIP_SPOUSE_T8_SONG_DIRECT_BODY_BOUNDARY_CANDIDATE,
    directInstitutionalPdfCandidateCount: 1 as const,
    directInstitutionalPdfInspected: true as const,
    pdfScreenshotReviewed: true as const,
    contextualYukchinSystemMetaRuleConfirmed: true as const,
    actualRoleOrInfluenceBranchConfirmed: true as const,
    oneRoleNeutralSpouseSelectorFound: false as const,
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
    controlIds: RELATIONSHIP_SPOUSE_T8_SONG_DIRECT_BODY_BOUNDARY_CONTROL_IDS,
    controlCount: 16 as const,
    recommendedNextAction: 'FREEZE_JUNG_SUA_2025_DIRECT_BODY_GENDERED_STAR_COUPLING_BOUNDARY' as const,
  };

  return {
    evidenceId: `relationship_spouse_t8_song_direct_body_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
