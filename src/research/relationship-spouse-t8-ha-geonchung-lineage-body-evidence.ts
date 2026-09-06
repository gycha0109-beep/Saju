import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { buildRelationshipSpouseT8KimMantaeScholarlyBodyMethodInputEvidence } from './relationship-spouse-t8-kim-mantae-scholarly-body-method-input-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_HA_GEONCHUNG_LINEAGE_BODY_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-ha-geonchung-lineage-body-evidence-v1' as const;

export type HaGeonchungCapabilityState =
  | 'AVAILABLE_CANONICAL_FACT'
  | 'PARTIAL_UNDERLYING_DATA_ONLY'
  | 'MISSING_GOVERNED_FACT_OR_SEMANTICS'
  | 'SOURCE_SEMANTIC_LINK_NOT_ESTABLISHED'
  | 'METHODOLOGY_CONSTANT_NOT_CANONICAL_INPUT';

export interface HaGeonchungRequiredInputCapabilityRecord {
  sourceInputId: string;
  sourceInput: string;
  exactSourceContext: string;
  currentCanonicalPaths: readonly string[];
  capabilityState: HaGeonchungCapabilityState;
  exactCurrentBoundary: string;
  sufficientForCurrentSpouseT6: false;
}

export const RELATIONSHIP_SPOUSE_T8_HA_GEONCHUNG_SOURCE_RECORD = Object.freeze({
  sourceId: 'RISS-T17090336',
  title: '선진유학의 심리명리학적 연구 : 하건충 이론을 중심으로',
  author: '손예진',
  publicationYear: 2024,
  publicationMonth: 8,
  institution: '원광대학교 대학원',
  degree: '박사학위논문',
  rissControlId: 'T17090336',
  uci: 'I804:45008-200000806617',
  nationalAssemblyControlId: 'KDMT12025000004959',
  sourceClass: 'doctoral_scholarly_thesis_on_ha_jianzhong_lineage',
  haJianzhongWorksQuoted: Object.freeze([
    '八字心理推命學',
    '千古八字祕決總解',
  ] as const),
  officialMetadataEstablished: true,
  directlyInspectedBodySurface:
    'third_party_indexed_fulltext_mirror_of_the_scholarly_thesis',
  directlyInspectedBodySurfaceUrl:
    'https://www.scribd.com/document/1067379461/선진유학의-심리명리학적-연구-하건충-이론을-중심으로',
  directInstitutionalOrLibraryPdfObjectInspected: false,
  pdfScreenshotReviewed: false,
  mirrorReliabilityAdequateForAuthorityAdmission: false,
  exactRelevantPrintedPages: '40-44',
  exactRelevantSection: 'Ⅱ. 하건충 심리명리학 / 3) 變星變宮論',
  exactRelevantAnchors: Object.freeze([
    '일지와 정재궁',
    '<표-6> 궁위과 십성',
    '각 궁에 자리한 십성이 해당 궁과 生旺, 助旺, 損傷, 破의 관계',
  ] as const),
  fixedPalaceSystemMateriallySurfaced: true,
  dayBranchFixedPalaceExplicit: '正財宮',
  hourBranchFixedPalaceExplicit: '傷官宮',
  hourStemFixedPalaceExplicit: '偏印宮',
  monthBranchFixedPalaceExplicit: '正官宮',
  monthStemFixedPalaceExplicit: '食神宮',
  yearStemFixedPalaceExplicit: '偏財宮',
  yearBranchFixedPalaceExplicit: '正印宮',
  sourceSpecificPalaceStarOperationExplicit: true,
  sourceSpecificOperationLabels: Object.freeze(['生旺', '助旺', '損傷', '破'] as const),
  sourceSpecificTransformationInputsExplicit: Object.freeze([
    'stem/branch combination or attraction relation',
    'clash',
    'punishment',
    'break/destructive relation',
    'void',
  ] as const),
  spouseSpecificDayBranchToFixedPalaceSemanticEstablishedOnInspectedBody: false,
  roleNeutralNatalSpouseMappingExplicit: false,
  sourceGenderDifferentiatedPsychologyExplicitElsewhere: true,
  sourceGenderDifferentiatedPsychologyRecord: Object.freeze({
    section: '성별 심리사회적 발달론',
    male: Object.freeze(['正財', '傷官'] as const),
    female: Object.freeze(['正官', '傷官', '食神'] as const),
  }),
  crossSourceSemanticCompositionUsed: false,
  exactSupportedClaim:
    'The inspected scholarly thesis body materially surfaces Ha Jianzhong-lineage fixed palace assignments, including Day Branch = 正財宮, and the source-specific 變星變宮 operating vocabulary. The inspected body does not itself establish that 正財宮 at the Day Branch is a spouse-specific, role-neutral natal mapping.',
  exactNonClaim:
    'This evidence does not prove that every original Ha Jianzhong work lacks spouse semantics. It only records that the acquired scholarly body does not establish the same-source spouse-specific link required for current authority admission.',
} as const);

export const RELATIONSHIP_SPOUSE_T8_HA_GEONCHUNG_REQUIRED_INPUT_CAPABILITY = Object.freeze([
  Object.freeze({
    sourceInputId: 'FIXED_PALACE_ASSIGNMENT',
    sourceInput: 'Position-fixed palace labels including Day Branch = 正財宮',
    exactSourceContext: '變星變宮論, printed pp.40-42 / <표-6> 궁위과 십성',
    currentCanonicalPaths: Object.freeze([] as const),
    capabilityState: 'METHODOLOGY_CONSTANT_NOT_CANONICAL_INPUT',
    exactCurrentBoundary:
      'The fixed palace labels are source methodology semantics, not natal facts that should be materialized merely because pillar positions exist.',
    sufficientForCurrentSpouseT6: false,
  }),
  Object.freeze({
    sourceInputId: 'ACTUAL_TEN_GOD_BY_SLOT',
    sourceInput: 'Actual Ten-God occupying each palace position',
    exactSourceContext: 'Palace-star operation examples in 變星變宮論',
    currentCanonicalPaths: Object.freeze(['derivedFacts.tenGods'] as const),
    capabilityState: 'AVAILABLE_CANONICAL_FACT',
    exactCurrentBoundary:
      'Exact Ten-God subtype and source slot survive in CanonicalSajuSnapshot, but this does not authorize Ha-lineage palace semantics or spouse semantics.',
    sufficientForCurrentSpouseT6: false,
  }),
  Object.freeze({
    sourceInputId: 'STEM_BRANCH_RELATION_INPUTS',
    sourceInput: 'Combination/clash/punishment and related relations used by 變星變宮',
    exactSourceContext: 'Printed pp.43-44 transformation rules',
    currentCanonicalPaths: Object.freeze(['derivedFacts.structuralRelations'] as const),
    capabilityState: 'PARTIAL_UNDERLYING_DATA_ONLY',
    exactCurrentBoundary:
      'Canonical structural relations cover stem five-combination and branch clash, but not the full source relation vocabulary such as punishment and break/destructive relations.',
    sufficientForCurrentSpouseT6: false,
  }),
  Object.freeze({
    sourceInputId: 'VOID_INPUT',
    sourceInput: 'Void / 공망 used in transformed-star or transformed-palace rules',
    exactSourceContext: 'Printed pp.43-44',
    currentCanonicalPaths: Object.freeze(['derivedFacts.voidBranches'] as const),
    capabilityState: 'PARTIAL_UNDERLYING_DATA_ONLY',
    exactCurrentBoundary:
      'Void branches are canonical facts, but the Ha-lineage transformation semantics triggered by void are not governed current semantics.',
    sufficientForCurrentSpouseT6: false,
  }),
  Object.freeze({
    sourceInputId: 'PALACE_STAR_OPERATION_STATE',
    sourceInput: '生旺 / 助旺 / 損傷 / 破 state between fixed palace and occupying Ten-God',
    exactSourceContext: 'Printed pp.42-43',
    currentCanonicalPaths: Object.freeze([] as const),
    capabilityState: 'MISSING_GOVERNED_FACT_OR_SEMANTICS',
    exactCurrentBoundary:
      'CanonicalSajuSnapshot has no governed Ha-lineage palace-star operation state and the repository must not derive one from generic Five-Element relations without admitting the methodology.',
    sufficientForCurrentSpouseT6: false,
  }),
  Object.freeze({
    sourceInputId: 'COMPOSITE_STAR_SEMANTICS',
    sourceInput: '複合星 / compound-star interpretation keyed by Day Stem and another stem',
    exactSourceContext: 'Printed pp.39-40 immediately before 變星變宮論',
    currentCanonicalPaths: Object.freeze(['pillars', 'derivedFacts.tenGods'] as const),
    capabilityState: 'MISSING_GOVERNED_FACT_OR_SEMANTICS',
    exactCurrentBoundary:
      'The underlying stems and Ten-God identities exist, but the source-specific compound-star semantic transformation is not a governed canonical or interpretation fact.',
    sufficientForCurrentSpouseT6: false,
  }),
  Object.freeze({
    sourceInputId: 'SPOUSE_SPECIFIC_DAY_BRANCH_SEMANTIC_LINK',
    sourceInput: 'Same-source explicit link from Day Branch / 正財宮 to spouse semantics',
    exactSourceContext: 'Required current authority question, not established by the inspected scholarly body',
    currentCanonicalPaths: Object.freeze([] as const),
    capabilityState: 'SOURCE_SEMANTIC_LINK_NOT_ESTABLISHED',
    exactCurrentBoundary:
      'Day Branch = 正財宮 is explicit in the inspected body, but spouse = 正財宮 is not established there. A commercial or other external spouse-palace statement cannot be stitched onto this scholarly fixed-palace rule.',
    sufficientForCurrentSpouseT6: false,
  }),
] as const satisfies readonly HaGeonchungRequiredInputCapabilityRecord[]);

export const RELATIONSHIP_SPOUSE_T8_HA_GEONCHUNG_CONTROL_IDS = Object.freeze([
  'HA_LINEAGE_SCHOLARLY_THESIS_IDENTITY_IS_INDEPENDENTLY_TRACEABLE',
  'THIRD_PARTY_FULLTEXT_MIRROR_IS_NOT_RELABELED_AS_INSTITUTIONAL_PDF',
  'DIRECT_PDF_OBJECT_INSPECTION_REMAINS_FALSE',
  'PDF_SCREENSHOT_REVIEW_REMAINS_FALSE',
  'DAY_BRANCH_EQUALS_FIXED_JEONGJAE_PALACE_IS_EXPLICIT_IN_THE_INSPECTED_BODY',
  'FIXED_JEONGJAE_PALACE_IS_NOT_AUTOMATICALLY_RELABELED_AS_SPOUSE',
  'NO_COMMERCIAL_SPOUSE_SEMANTIC_IS_STITCHED_ONTO_THE_SCHOLARLY_BODY',
  'ABSENCE_OF_A_SPOUSE_LINK_IN_THIS_BODY_IS_NOT_A_CLAIM_ABOUT_EVERY_ORIGINAL_HA_WORK',
  'SOURCE_GENDER_DIFFERENTIATED_PSYCHOLOGY_IS_PRESERVED_WITHOUT_UNIVERSALIZATION',
  'EXACT_TEN_GOD_SLOT_AVAILABILITY_DOES_NOT_AUTHORIZE_HA_PALACE_SEMANTICS',
  'PARTIAL_RELATION_FACTS_DO_NOT_SATISFY_THE_FULL_TRANSFORMATION_METHOD',
  'VOID_FACT_AVAILABILITY_DOES_NOT_AUTHORIZE_TRANSFORMATION_SEMANTICS',
  'PALACE_STAR_OPERATION_STATE_IS_NOT_INVENTED_FROM_GENERIC_ELEMENT_RELATIONS',
  'COMPOSITE_STAR_SEMANTICS_REMAIN_UNGOVERNED',
  'EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING_REMAINS_OPEN',
  'INDEPENDENT_NORMATIVE_PROVENANCE_FOR_CURRENT_SPOUSE_METHOD_REMAINS_OPEN',
  'CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE_REMAINS_OPEN',
  'RELATIONSHIP_T6_INPUT_REMAINS_OPEN',
  'EXACTLY_ONE_OF_FIVE_AUTHORITY_GAPS_REMAINS_CLOSED',
  'NO_SPOUSE_T8_PRODUCER_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_EFFECT',
] as const);

export interface RelationshipSpouseT8HaGeonchungLineageBodyEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_HA_GEONCHUNG_LINEAGE_BODY_EVIDENCE_VERSION;
  upstreamEvidenceId: string;
  status: 'MATERIAL_HA_LINEAGE_BODY_ACQUIRED_BUT_SPOUSE_SPECIFIC_ROLE_NEUTRAL_LINK_NOT_ESTABLISHED';
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  sourceRecord: typeof RELATIONSHIP_SPOUSE_T8_HA_GEONCHUNG_SOURCE_RECORD;
  requiredInputCapability: typeof RELATIONSHIP_SPOUSE_T8_HA_GEONCHUNG_REQUIRED_INPUT_CAPABILITY;
  scholarlyLineageBodyMateriallyAcquired: true;
  directInstitutionalOrLibraryPdfObjectInspected: false;
  pdfScreenshotReviewed: false;
  fixedDayBranchJeongjaePalaceEstablished: true;
  spouseSpecificSameSourceSemanticLinkEstablished: false;
  roleNeutralNatalMappingEstablished: false;
  allSourceRequiredInputsAvailableAndGoverned: false;
  independentNormativeProvenanceForCurrentSpouseMethodEstablished: false;
  currentGovernedMethodSemanticCorrespondenceEstablished: false;
  currentRelationshipT6InputPathEstablished: false;
  qualifyingPrimaryWitnessGapRemainsClosed: true;
  authorityGapsClosedCount: 1;
  authorityGapsOpenCount: 4;
  authorityAdmissionReady: false;
  crossSourceStitchingAuthorized: false;
  sexualOrientationInferenceAuthorized: false;
  spouseT8ProducerReady: false;
  productionPromotionReady: false;
  controlIds: typeof RELATIONSHIP_SPOUSE_T8_HA_GEONCHUNG_CONTROL_IDS;
  controlCount: 20;
  recommendedNextAction:
    'ACQUIRE_KIM_YOUNGJIN_2020_ACTUAL_BODY_OR_ANOTHER_SAME_SOURCE_EXPLICIT_ROLE_NEUTRAL_SCHOLARLY_NATAL_SPOUSE_MAPPING_BEFORE_ANY_T6_OR_PRODUCER_GATE';
}

export function buildRelationshipSpouseT8HaGeonchungLineageBodyEvidence(): RelationshipSpouseT8HaGeonchungLineageBodyEvidenceReport {
  const upstream = buildRelationshipSpouseT8KimMantaeScholarlyBodyMethodInputEvidence();
  const material = {
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_HA_GEONCHUNG_LINEAGE_BODY_EVIDENCE_VERSION,
    upstreamEvidenceId: upstream.evidenceId,
    status:
      'MATERIAL_HA_LINEAGE_BODY_ACQUIRED_BUT_SPOUSE_SPECIFIC_ROLE_NEUTRAL_LINK_NOT_ESTABLISHED' as const,
    domain: 'relationship' as const,
    subcategory: 'spouse' as const,
    temporalScope: 'natal' as const,
    statusClass: 'research' as const,
    sourceRecord: RELATIONSHIP_SPOUSE_T8_HA_GEONCHUNG_SOURCE_RECORD,
    requiredInputCapability: RELATIONSHIP_SPOUSE_T8_HA_GEONCHUNG_REQUIRED_INPUT_CAPABILITY,
    scholarlyLineageBodyMateriallyAcquired: true as const,
    directInstitutionalOrLibraryPdfObjectInspected: false as const,
    pdfScreenshotReviewed: false as const,
    fixedDayBranchJeongjaePalaceEstablished: true as const,
    spouseSpecificSameSourceSemanticLinkEstablished: false as const,
    roleNeutralNatalMappingEstablished: false as const,
    allSourceRequiredInputsAvailableAndGoverned: false as const,
    independentNormativeProvenanceForCurrentSpouseMethodEstablished: false as const,
    currentGovernedMethodSemanticCorrespondenceEstablished: false as const,
    currentRelationshipT6InputPathEstablished: false as const,
    qualifyingPrimaryWitnessGapRemainsClosed: true as const,
    authorityGapsClosedCount: 1 as const,
    authorityGapsOpenCount: 4 as const,
    authorityAdmissionReady: false as const,
    crossSourceStitchingAuthorized: false as const,
    sexualOrientationInferenceAuthorized: false as const,
    spouseT8ProducerReady: false as const,
    productionPromotionReady: false as const,
    controlIds: RELATIONSHIP_SPOUSE_T8_HA_GEONCHUNG_CONTROL_IDS,
    controlCount: 20 as const,
    recommendedNextAction:
      'ACQUIRE_KIM_YOUNGJIN_2020_ACTUAL_BODY_OR_ANOTHER_SAME_SOURCE_EXPLICIT_ROLE_NEUTRAL_SCHOLARLY_NATAL_SPOUSE_MAPPING_BEFORE_ANY_T6_OR_PRODUCER_GATE' as const,
  };

  return Object.freeze({
    evidenceId: `relationship_spouse_t8_ha_geonchung_lineage_body_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  });
}
