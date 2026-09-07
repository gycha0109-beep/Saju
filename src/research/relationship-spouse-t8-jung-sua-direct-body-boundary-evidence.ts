import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8SongDirectBodyBoundaryEvidence } from './relationship-spouse-t8-song-direct-body-boundary-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_JUNG_SUA_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-jung-sua-direct-body-boundary-evidence-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_JUNG_SUA_DIRECT_BODY_BOUNDARY_CANDIDATE = Object.freeze({
  candidateId: 'JUNG_SUA_2025_DHU_DIRECT_PDF',
  author: '정수아',
  publicationYear: 2025,
  title: '명리학의 궁성(宮星)에 관한 연구',
  institution: '대구한의대학교 일반대학원 석사학위논문',
  scholarlyLocator: 'RISS T17210085 / UCI I804:47004-200000872706',
  rissControlNo: 'e25c256113db7c44ffe0bdc3ef48d419',
  dcollectionItemId: '200000872706',
  institutionalOriginalRecord: 'https://dhu.dcollection.net/common/orgView/200000872706',
  inspectedPdfAcquisitionUrl:
    'https://dhu.dcollection.net/public_resource/pdf/200000872706_20260908021831.pdf',
  directInstitutionalPdfObjectInspected: true as const,
  pdfScreenshotReviewed: true as const,
  pdfSha256: '43b8ed24cb8b358b2a450a83a89c1299e905d044652274e17190ac18a108be31',
  pdfBytes: 1_944_006,
  pdfPageCount: 107,
  pdfEncrypted: false as const,
  printedToPhysicalPageMap: Object.freeze([
    Object.freeze({ printedPage: 53, physicalPdfPage: 59, topic: 'Day Branch explicitly assigned to spouse position / spouse palace' }),
    Object.freeze({ printedPage: 56, physicalPdfPage: 62, topic: 'both male and female charts use Day Branch as spouse palace; gender-conditioned favorable contents immediately follow' }),
    Object.freeze({ printedPage: 66, physicalPdfPage: 72, topic: 'Day pillar as household/spouse palace and central personal palace' }),
    Object.freeze({ printedPage: 68, physicalPdfPage: 74, topic: 'female worked case reads Day-Branch Peer as spouse-palace relationship semantics' }),
    Object.freeze({ printedPage: 70, physicalPdfPage: 76, topic: 'female worked case combines spouse palace with husband=Direct Officer semantics' }),
    Object.freeze({ printedPage: 73, physicalPdfPage: 79, topic: 'female worked case continues husband=Officer interpretation' }),
    Object.freeze({ printedPage: 74, physicalPdfPage: 80, topic: 'male worked case continues wife=Direct Wealth semantics' }),
    Object.freeze({ printedPage: 80, physicalPdfPage: 86, topic: 'male Wealth case also reads Day-Branch spouse directly in relationship analysis' }),
    Object.freeze({ printedPage: 83, physicalPdfPage: 89, topic: 'male case reads same-element Day-Branch spouse palace as supportive spouse relationship' }),
    Object.freeze({ printedPage: 92, physicalPdfPage: 98, topic: 'conclusion and modern Gung-Seong application boundary' }),
  ] as const),
  dayBranchSpousePositionExplicit: true as const,
  bothMaleAndFemaleUseDayBranchAsSpousePalaceExplicit: true as const,
  arbitraryDayBranchTenGodOperationallyReadAsSpouseRelationshipInCases: true as const,
  femalePeerDayBranchReadAsSpousePalaceRelationshipExplicit: true as const,
  maleSameElementDayBranchReadAsSupportiveSpouseExplicit: true as const,
  roleNeutralSpousePalaceLocationOperationalized: true as const,
  maleFavorableSpousePalaceContentGenderConditioned: 'Wealth or Output / 財星 또는 食傷',
  femaleFavorableSpousePalaceContentGenderConditioned: 'Officer or Wealth / 官星 또는 財星',
  maleNegativeSpousePalaceExampleGenderConditioned: 'Rob Wealth / 劫財',
  femaleNegativeSpousePalaceExampleGenderConditioned: 'Hurting Officer / 傷官',
  femaleHusbandOfficerSelectorUsedInWorkedCases: true as const,
  maleWifeWealthSelectorUsedInWorkedCases: true as const,
  genderConditionedSpouseStarLayerRetained: true as const,
  genderConditionedSpousePalaceEvaluationLayerRetained: true as const,
  onePartnerGenderIndependentCompleteSpouseMethodFound: false as const,
  completeRoleNeutralNatalInputContractFound: false as const,
  sourceSpecificYongsinJisinAndAdditionalInterpretiveSemanticsUsed: true as const,
  explicitRoleNeutralNatalSpouseMethodEstablished: false as const,
  completeRoleNeutralSingleNatalInputContractEstablished: false as const,
  canonicalLosslessFitEstablished: false as const,
  exactDirectBodyFinding:
    'The directly inspected institutional PDF explicitly states that both male and female charts use the Day Branch as the spouse palace. Worked cases operationalize that positional path by interpreting the actual Ten-God or elemental relation at the Day Branch as spouse-relationship evidence, including a female Peer spouse-palace case and a male same-element spouse-palace case. This is stronger than a merely nominal Day-Branch label.',
  exactGenderCouplingBoundary:
    'The same method immediately retains sex-conditioned spouse semantics. It states different favorable and unfavorable spouse-palace contents for male and female charts, uses Officer as the husband selector in female worked cases, and uses Wealth or Direct Wealth as the wife selector in male worked cases. The role-neutral spouse-palace location is therefore only one layer of a broader method that still branches by native sex.',
  exactRoleNeutralBoundary:
    'A gender-neutral palace location plus operational Day-Branch content reading does not by itself establish one complete partner-gender-independent spouse method when the same source also requires sex-conditioned spouse-star and spouse-palace evaluation branches. The source does not publish a replacement rule that removes those branches or a complete spouse input contract independent of native and partner sex.',
  exactCanonicalBoundary:
    'Raw Day Branch and Ten-God facts can be represented by the governed snapshot, but the source method additionally uses gender-conditioned spouse-star/evaluation rules and interpretive states such as Yongsin/Jisin, favorable or unfavorable palace content, combination/conflict and other Gung-Seong judgments. Those semantics are not all governed as a lossless Relationship T6/T8 contract. Raw fact availability therefore does not close current governed semantic correspondence.',
  nextAction:
    'Stop treating generic Day-Branch spouse-palace scholarship as sufficient. Search only for a same-source method that explicitly removes native-sex and partner-sex rule branching across spouse selection and evaluation, exposes a complete natal input contract, and maps losslessly to governed canonical semantics.',
});

export const RELATIONSHIP_SPOUSE_T8_JUNG_SUA_DIRECT_BODY_BOUNDARY_CONTROL_IDS = Object.freeze([
  'DIRECT_INSTITUTIONAL_PDF_IDENTITY_IS_CONTENT_ADDRESSED',
  'PRINTED_AND_PHYSICAL_PDF_PAGE_COORDINATES_ARE_DISTINGUISHED',
  'BOTH_MALE_AND_FEMALE_DAY_BRANCH_SPOUSE_PALACE_IS_PRESERVED_AS_SOURCE_FACT',
  'DAY_BRANCH_SPOUSE_PALACE_OPERATIONALIZATION_IS_RECOGNIZED_AS_STRONGER_THAN_NOMINAL_LOCATION_ONLY',
  'ARBITRARY_DAY_BRANCH_TEN_GOD_SPOUSE_READING_IS_PRESERVED_AS_SOURCE_FACT',
  'ROLE_NEUTRAL_LOCATION_IS_NOT_RELABELED_AS_COMPLETE_ROLE_NEUTRAL_METHOD',
  'FEMALE_HUSBAND_OFFICER_AND_MALE_WIFE_WEALTH_BRANCHES_REMAIN_EXPLICIT',
  'GENDER_CONDITIONED_SPOUSE_PALACE_EVALUATION_REMAINS_EXPLICIT',
  'NO_NATIVE_OR_PARTNER_GENDER_OR_SEXUAL_ORIENTATION_INFERENCE',
  'NO_CROSS_SOURCE_STITCHING_WITH_SONG_KWEON_KIM_YOUNGJIN_KIM_MANTAE_HONG_OR_COMMERCIAL_EDITORIAL_RULES',
  'INDEPENDENT_NORMATIVE_PROVENANCE_FOR_CURRENT_ROLE_NEUTRAL_SPOUSE_METHOD_REMAINS_OPEN',
  'EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_REMAINS_OPEN',
  'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN',
  'RELATIONSHIP_T6_INPUT_REMAINS_OPEN',
  'EXACTLY_ONE_OF_FIVE_AUTHORITY_GAPS_REMAINS_CLOSED',
  'NO_SPOUSE_T8_PRODUCER_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_EFFECT',
] as const);

export interface RelationshipSpouseT8JungSuaDirectBodyBoundaryEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_JUNG_SUA_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status: 'DIRECT_INSTITUTIONAL_PDF_OPERATIONALIZES_ROLE_NEUTRAL_SPOUSE_PALACE_LOCATION_BUT_RETAINS_GENDER_CONDITIONED_SPOUSE_METHOD_LAYERS';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidate: typeof RELATIONSHIP_SPOUSE_T8_JUNG_SUA_DIRECT_BODY_BOUNDARY_CANDIDATE;
  directInstitutionalPdfCandidateCount: 1;
  directInstitutionalPdfInspected: true;
  pdfScreenshotReviewed: true;
  roleNeutralSpousePalaceLocationOperationalized: true;
  genderConditionedSpouseStarLayerRetained: true;
  genderConditionedSpousePalaceEvaluationLayerRetained: true;
  completeRoleNeutralSpouseMethodFound: false;
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
  controlIds: typeof RELATIONSHIP_SPOUSE_T8_JUNG_SUA_DIRECT_BODY_BOUNDARY_CONTROL_IDS;
  controlCount: 16;
  recommendedNextAction: 'SEARCH_ONLY_COMPLETE_SAME_SOURCE_ROLE_NEUTRAL_SPOUSE_METHOD_WITH_NO_SEX_BRANCHING';
}

export function buildRelationshipSpouseT8JungSuaDirectBodyBoundaryEvidence(): RelationshipSpouseT8JungSuaDirectBodyBoundaryEvidenceReport {
  const upstream = buildRelationshipSpouseT8SongDirectBodyBoundaryEvidence();
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_JUNG_SUA_DIRECT_BODY_BOUNDARY_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status:
      'DIRECT_INSTITUTIONAL_PDF_OPERATIONALIZES_ROLE_NEUTRAL_SPOUSE_PALACE_LOCATION_BUT_RETAINS_GENDER_CONDITIONED_SPOUSE_METHOD_LAYERS' as const,
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    candidate: RELATIONSHIP_SPOUSE_T8_JUNG_SUA_DIRECT_BODY_BOUNDARY_CANDIDATE,
    directInstitutionalPdfCandidateCount: 1 as const,
    directInstitutionalPdfInspected: true as const,
    pdfScreenshotReviewed: true as const,
    roleNeutralSpousePalaceLocationOperationalized: true as const,
    genderConditionedSpouseStarLayerRetained: true as const,
    genderConditionedSpousePalaceEvaluationLayerRetained: true as const,
    completeRoleNeutralSpouseMethodFound: false as const,
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
    controlIds: RELATIONSHIP_SPOUSE_T8_JUNG_SUA_DIRECT_BODY_BOUNDARY_CONTROL_IDS,
    controlCount: 16 as const,
    recommendedNextAction: 'SEARCH_ONLY_COMPLETE_SAME_SOURCE_ROLE_NEUTRAL_SPOUSE_METHOD_WITH_NO_SEX_BRANCHING' as const,
  };

  return {
    evidenceId: `relationship_spouse_t8_jung_sua_direct_body_boundary_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
