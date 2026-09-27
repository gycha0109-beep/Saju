import {
  R057_AUTHORITY,
  R057_CONTEXT_AXES,
  R057_DIRECT_MODIFIERS,
  R057_EXECUTION_GAPS,
  R057_LIUHAI_EVIDENCE_WEIGHT_VERSION,
  R057_LIUHAI_PAIRS,
  R057_WEIGHT_BOUNDARY,
} from './general-natal-liuhai-evidence-weight.js';
import {
  R058_AUTHORITY,
  R058_EFFECT_BOUNDARY,
  R058_EXECUTION_GAPS,
  R058_LATER_COMMON_VARIANT,
  R058_PO_SOURCE_VARIANCE_VERSION,
  R058_SELECTED_SOURCE_PAIRS,
} from './general-natal-po-source-variance.js';
import {
  GENERAL_NATAL_NON_ADMITTED_MODERN_BRANCH_BREAK_PAIRS,
  GENERAL_NATAL_SOURCE_SCOPED_BRANCH_BREAK_PAIRS,
  GENERAL_NATAL_SOURCE_SCOPED_BRANCH_BREAK_VERSION,
} from './general-natal-source-scoped-branch-break.js';
import {
  R059_AUTHORITY,
  R059_COVERAGE,
  R059_DIRECT_CASES,
  R059_EXECUTION_GAPS,
  R059_INTERACTION_CONFLICT_CORPUS_VERSION,
  type R059RelationKind,
} from './general-natal-interaction-conflict-corpus.js';
import {
  GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW,
  GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW_VERSION,
} from './general-natal-geju-xing-chong-po-hai-effect-primitive-authority-review.js';

export const R145_HARM_BREAK_LOW_EVIDENCE_AUDIT_VERSION =
  '0.1.0-research' as const;

export type R145RelationKind = 'HARM' | 'BREAK';

export interface R145HarmPairAudit {
  auditId: string;
  relationKind: 'HARM';
  pair: readonly [string, string];
  evidenceClass: 'VERIFIED_STRUCTURAL_PAIR_AND_CONTEXT_VARIANCE';
  structuralPairObserved: true;
  fixedEffectAuthorized: false;
  harmfulPolarityAuthorized: false;
  universalDirectionalEffectAuthorized: false;
  numericWeightAuthorized: false;
  executableEffectResolverAuthorized: false;
  productionAuthorityPromoted: false;
}

export interface R145HarmModifierAudit {
  auditId: string;
  relationKind: 'HARM';
  pair: readonly [string, string];
  modifier: string;
  sourceSaysMayIntensify: boolean;
  evidenceClass: 'SOURCE_BOUNDED_CONTEXT_MODIFIER_ONLY';
  sourceBoundedOnly: true;
  universalEffectAuthorized: false;
  numericSeverityAuthorized: false;
  executable: false;
}

export interface R145HarmWeightAudit {
  auditId: string;
  relationKind: 'HARM';
  evidenceClass: 'BOUNDED_RELATIVE_PHRASE_NON_NUMERIC';
  boundedRelativePhraseObserved: true;
  phraseIncludesLiuHaiAsLight: true;
  universalNumericSeverityAuthorized: false;
  universalCrossRelationRankingAuthorized: false;
  sourceOrderAsPrecedenceAuthorized: false;
  executable: false;
}

export interface R145BreakSelectedPairAudit {
  auditId: string;
  relationKind: 'BREAK';
  pair: readonly [string, string];
  evidenceClass: 'SELECTED_SOURCE_MEMBERSHIP_VERIFIED';
  selectedSourceMember: true;
  sourceScopedRegistryMatch: boolean;
  universalPairRegistryAuthorized: false;
  automaticHarmAuthorized: false;
  fixedSeverityAuthorized: false;
  numericWeightAuthorized: false;
  relationEffectAuthorized: false;
  executableEffectResolverAuthorized: false;
  productionAuthorityPromoted: false;
}

export interface R145BreakVariantPairAudit {
  auditId: string;
  relationKind: 'BREAK';
  pair: readonly [string, string];
  evidenceClass: 'LATER_COMMON_VARIANT_NOT_ADMITTED';
  laterCommonVariantObserved: true;
  selectedSourceMember: false;
  selectedSourceScopeAdmitted: false;
  crossSourceReconciliationRequired: true;
  universalPairRegistryAuthorized: false;
  automaticHarmAuthorized: false;
  executable: false;
}

export interface R145ConflictCoverageAudit {
  auditId: string;
  relationKind: R145RelationKind;
  evidenceClass: 'DIRECT_CONFLICT_EVIDENCE_INSUFFICIENT';
  directConflictCaseCount: number;
  coverageState: 'INSUFFICIENT';
  universalPrecedenceAuthorized: false;
  totalOrderAuthorized: false;
  executableConflictResolverAuthorized: false;
  numericWeightAuthorized: false;
  productionAuthorityPromoted: false;
}

export interface R145GejuInputAudit {
  auditId: string;
  relationKind: R145RelationKind;
  evidenceClass: 'MATERIALITY_OBSERVED_CANONICAL_INPUT_MISSING';
  directSourceMaterialityObserved: true;
  canonicalInputAvailable: false;
  sourceContextEffectRequirementObserved: true;
  generalizedEffectPredicateAuthorized: false;
  establishmentPredicateAuthorized: false;
  productionFactEmissionAuthorized: false;
}

const BRANCH_ZH_TO_KO = Object.freeze({
  子: '자',
  丑: '축',
  寅: '인',
  卯: '묘',
  辰: '진',
  巳: '사',
  午: '오',
  未: '미',
  申: '신',
  酉: '유',
  戌: '술',
  亥: '해',
} as const);

const normalizedKoPairKey = (pair: readonly [string, string]): string =>
  pair
    .map((branch) => {
      const value = BRANCH_ZH_TO_KO[branch as keyof typeof BRANCH_ZH_TO_KO];
      if (value === undefined) {
        throw new Error('R145 cannot normalize unsupported branch glyph');
      }
      return value;
    })
    .sort()
    .join('|');

const SOURCE_SCOPED_BREAK_KEYS = new Set(
  GENERAL_NATAL_SOURCE_SCOPED_BRANCH_BREAK_PAIRS.map((pair) =>
    [...pair].sort().join('|'),
  ),
);

const NON_ADMITTED_BREAK_KEYS = new Set(
  GENERAL_NATAL_NON_ADMITTED_MODERN_BRANCH_BREAK_PAIRS.map((pair) =>
    [...pair].sort().join('|'),
  ),
);

export const R145_HARM_PAIR_AUDITS: readonly R145HarmPairAudit[] =
  Object.freeze(
    R057_LIUHAI_PAIRS.map((pair, index) =>
      Object.freeze({
        auditId: 'R145-HARM-PAIR-' + String(index + 1).padStart(2, '0'),
        relationKind: 'HARM' as const,
        pair,
        evidenceClass:
          'VERIFIED_STRUCTURAL_PAIR_AND_CONTEXT_VARIANCE' as const,
        structuralPairObserved: true as const,
        fixedEffectAuthorized: false as const,
        harmfulPolarityAuthorized: false as const,
        universalDirectionalEffectAuthorized: false as const,
        numericWeightAuthorized: false as const,
        executableEffectResolverAuthorized: false as const,
        productionAuthorityPromoted: false as const,
      }),
    ),
  );

export const R145_HARM_MODIFIER_AUDITS: readonly R145HarmModifierAudit[] =
  Object.freeze(
    R057_DIRECT_MODIFIERS.map((item, index) =>
      Object.freeze({
        auditId: 'R145-HARM-MOD-' + String(index + 1).padStart(2, '0'),
        relationKind: 'HARM' as const,
        pair: item.pair,
        modifier: item.modifier,
        sourceSaysMayIntensify: item.sourceSaysMayIntensify,
        evidenceClass: 'SOURCE_BOUNDED_CONTEXT_MODIFIER_ONLY' as const,
        sourceBoundedOnly: true as const,
        universalEffectAuthorized: false as const,
        numericSeverityAuthorized: false as const,
        executable: item.executable,
      }),
    ),
  );

export const R145_HARM_WEIGHT_AUDIT: R145HarmWeightAudit = Object.freeze({
  auditId: 'R145-HARM-WEIGHT-01',
  relationKind: 'HARM',
  evidenceClass: 'BOUNDED_RELATIVE_PHRASE_NON_NUMERIC',
  boundedRelativePhraseObserved: R057_WEIGHT_BOUNDARY.boundedRelativePhraseObserved,
  phraseIncludesLiuHaiAsLight: R057_WEIGHT_BOUNDARY.phraseIncludesLiuHaiAsLight,
  universalNumericSeverityAuthorized:
    R057_WEIGHT_BOUNDARY.universalNumericSeverityAuthorized,
  universalCrossRelationRankingAuthorized:
    R057_WEIGHT_BOUNDARY.universalCrossRelationRankingAuthorized,
  sourceOrderAsPrecedenceAuthorized:
    R057_WEIGHT_BOUNDARY.sourceOrderAsPrecedenceAuthorized,
  executable: false,
});

export const R145_BREAK_SELECTED_PAIR_AUDITS: readonly R145BreakSelectedPairAudit[] =
  Object.freeze(
    R058_SELECTED_SOURCE_PAIRS.map((pair, index) =>
      Object.freeze({
        auditId: 'R145-BREAK-PAIR-' + String(index + 1).padStart(2, '0'),
        relationKind: 'BREAK' as const,
        pair,
        evidenceClass: 'SELECTED_SOURCE_MEMBERSHIP_VERIFIED' as const,
        selectedSourceMember: true as const,
        sourceScopedRegistryMatch: SOURCE_SCOPED_BREAK_KEYS.has(
          normalizedKoPairKey(pair),
        ),
        universalPairRegistryAuthorized: false as const,
        automaticHarmAuthorized: false as const,
        fixedSeverityAuthorized: false as const,
        numericWeightAuthorized: false as const,
        relationEffectAuthorized: false as const,
        executableEffectResolverAuthorized: false as const,
        productionAuthorityPromoted: false as const,
      }),
    ),
  );

export const R145_BREAK_VARIANT_PAIR_AUDITS: readonly R145BreakVariantPairAudit[] =
  Object.freeze(
    R058_LATER_COMMON_VARIANT.pairsOftenAdded.map((pair, index) => {
      const key = normalizedKoPairKey(pair);
      return Object.freeze({
        auditId: 'R145-BREAK-VARIANT-' + String(index + 1).padStart(2, '0'),
        relationKind: 'BREAK' as const,
        pair,
        evidenceClass: 'LATER_COMMON_VARIANT_NOT_ADMITTED' as const,
        laterCommonVariantObserved: true as const,
        selectedSourceMember: false as const,
        selectedSourceScopeAdmitted: false as const,
        crossSourceReconciliationRequired:
          R058_LATER_COMMON_VARIANT.crossSourceReconciliationRequired,
        universalPairRegistryAuthorized: false as const,
        automaticHarmAuthorized: false as const,
        executable: false as const,
        ...(NON_ADMITTED_BREAK_KEYS.has(key) ? {} : {}),
      });
    }),
  );

const directConflictCaseCount = (kind: R059RelationKind): number =>
  R059_DIRECT_CASES.filter(
    (item) => item.actor === kind || item.target === kind,
  ).length;

export const R145_CONFLICT_COVERAGE_AUDITS: readonly R145ConflictCoverageAudit[] =
  Object.freeze([
    Object.freeze({
      auditId: 'R145-CONFLICT-HARM',
      relationKind: 'HARM' as const,
      evidenceClass: 'DIRECT_CONFLICT_EVIDENCE_INSUFFICIENT' as const,
      directConflictCaseCount: directConflictCaseCount('HARM'),
      coverageState: R059_COVERAGE.harmConflictCaseCoverage,
      universalPrecedenceAuthorized: R059_AUTHORITY.universalPrecedenceAuthorized,
      totalOrderAuthorized: R059_AUTHORITY.totalOrderAuthorized,
      executableConflictResolverAuthorized:
        R059_AUTHORITY.executableConflictResolverAuthorized,
      numericWeightAuthorized: R059_COVERAGE.numericWeightAuthorized,
      productionAuthorityPromoted: R059_AUTHORITY.productionAuthorityPromoted,
    }),
    Object.freeze({
      auditId: 'R145-CONFLICT-BREAK',
      relationKind: 'BREAK' as const,
      evidenceClass: 'DIRECT_CONFLICT_EVIDENCE_INSUFFICIENT' as const,
      directConflictCaseCount: directConflictCaseCount('BREAK'),
      coverageState: R059_COVERAGE.breakConflictCaseCoverage,
      universalPrecedenceAuthorized: R059_AUTHORITY.universalPrecedenceAuthorized,
      totalOrderAuthorized: R059_AUTHORITY.totalOrderAuthorized,
      executableConflictResolverAuthorized:
        R059_AUTHORITY.executableConflictResolverAuthorized,
      numericWeightAuthorized: R059_COVERAGE.numericWeightAuthorized,
      productionAuthorityPromoted: R059_AUTHORITY.productionAuthorityPromoted,
    }),
  ]);

export const R145_GEJU_INPUT_AUDITS: readonly R145GejuInputAudit[] =
  Object.freeze([
    Object.freeze({
      auditId: 'R145-GEJU-HARM',
      relationKind: 'HARM' as const,
      evidenceClass: 'MATERIALITY_OBSERVED_CANONICAL_INPUT_MISSING' as const,
      directSourceMaterialityObserved:
        GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW
          .directSourceXingChongPoHaiMaterialityObserved,
      canonicalInputAvailable:
        GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW
          .canonicalBranchHaiInputAvailable,
      sourceContextEffectRequirementObserved:
        GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW
          .sourceContextEffectRequirementObserved,
      generalizedEffectPredicateAuthorized:
        GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW
          .generalizedXingChongPoHaiEffectPredicateAuthorized,
      establishmentPredicateAuthorized:
        GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW
          .establishmentPredicateAuthorized,
      productionFactEmissionAuthorized:
        GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW
          .productionFactEmissionAuthorized,
    }),
    Object.freeze({
      auditId: 'R145-GEJU-BREAK',
      relationKind: 'BREAK' as const,
      evidenceClass: 'MATERIALITY_OBSERVED_CANONICAL_INPUT_MISSING' as const,
      directSourceMaterialityObserved:
        GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW
          .directSourceXingChongPoHaiMaterialityObserved,
      canonicalInputAvailable:
        GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW
          .canonicalBranchPoInputAvailable,
      sourceContextEffectRequirementObserved:
        GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW
          .sourceContextEffectRequirementObserved,
      generalizedEffectPredicateAuthorized:
        GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW
          .generalizedXingChongPoHaiEffectPredicateAuthorized,
      establishmentPredicateAuthorized:
        GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW
          .establishmentPredicateAuthorized,
      productionFactEmissionAuthorized:
        GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW
          .productionFactEmissionAuthorized,
    }),
  ]);

export const R145_REJECTED_PROMOTIONS = Object.freeze([
  'HARM_PAIR_PRESENCE_IMPLIES_FIXED_EFFECT',
  'HARM_PAIR_PRESENCE_IMPLIES_HARMFUL_POLARITY',
  'HARM_MODIFIER_AS_UNIVERSAL_EFFECT',
  'LIUHAI_LIGHT_PHRASE_AS_NUMERIC_SEVERITY',
  'SOURCE_ORDER_AS_CROSS_RELATION_PRECEDENCE',
  'BREAK_SELECTED_SOURCE_AS_UNIVERSAL_SIX_BREAK_REGISTRY',
  'LATER_COMMON_BREAK_PAIRS_AUTO_IMPORTED',
  'BREAK_PAIR_PRESENCE_IMPLIES_HARM',
  'BREAK_WARNING_AS_FIXED_SEVERITY',
  'HARM_CONFLICT_GAP_AS_NO_CONFLICT',
  'BREAK_CONFLICT_GAP_AS_NO_CONFLICT',
  'MISSING_CANONICAL_HARM_INPUT_AS_FALSE',
  'MISSING_CANONICAL_BREAK_INPUT_AS_FALSE',
  'DIRECT_MATERIALITY_AS_ESTABLISHMENT_PREDICATE',
  'STRUCTURAL_MEMBERSHIP_AS_CONTEXTUAL_EFFECT',
  'CROSS_SOURCE_STITCHING_AS_PRODUCTION_AUTHORITY',
] as const);

export const R145_SUMMARY = Object.freeze({
  harmPairAuditCount: R145_HARM_PAIR_AUDITS.length,
  harmModifierAuditCount: R145_HARM_MODIFIER_AUDITS.length,
  harmWeightAuditCount: 1,
  breakSelectedPairAuditCount: R145_BREAK_SELECTED_PAIR_AUDITS.length,
  breakVariantPairAuditCount: R145_BREAK_VARIANT_PAIR_AUDITS.length,
  conflictCoverageAuditCount: R145_CONFLICT_COVERAGE_AUDITS.length,
  gejuInputAuditCount: R145_GEJU_INPUT_AUDITS.length,
  auditRowCount:
    R145_HARM_PAIR_AUDITS.length +
    R145_HARM_MODIFIER_AUDITS.length +
    1 +
    R145_BREAK_SELECTED_PAIR_AUDITS.length +
    R145_BREAK_VARIANT_PAIR_AUDITS.length +
    R145_CONFLICT_COVERAGE_AUDITS.length +
    R145_GEJU_INPUT_AUDITS.length,
  sourceScopedBreakRegistryMatchCount: R145_BREAK_SELECTED_PAIR_AUDITS.filter(
    (item) => item.sourceScopedRegistryMatch,
  ).length,
  harmDirectConflictCaseCount: R145_CONFLICT_COVERAGE_AUDITS.find(
    (item) => item.relationKind === 'HARM',
  )?.directConflictCaseCount ?? -1,
  breakDirectConflictCaseCount: R145_CONFLICT_COVERAGE_AUDITS.find(
    (item) => item.relationKind === 'BREAK',
  )?.directConflictCaseCount ?? -1,
  canonicalInputAvailableCount: R145_GEJU_INPUT_AUDITS.filter(
    (item) => item.canonicalInputAvailable,
  ).length,
  harmfulPolarityAuthorizedCount: R145_HARM_PAIR_AUDITS.filter(
    (item) => item.harmfulPolarityAuthorized,
  ).length,
  automaticBreakHarmAuthorizedCount: R145_BREAK_SELECTED_PAIR_AUDITS.filter(
    (item) => item.automaticHarmAuthorized,
  ).length,
  executableResolverAuthorizedCount:
    R145_HARM_PAIR_AUDITS.filter(
      (item) => item.executableEffectResolverAuthorized,
    ).length +
    R145_BREAK_SELECTED_PAIR_AUDITS.filter(
      (item) => item.executableEffectResolverAuthorized,
    ).length +
    R145_CONFLICT_COVERAGE_AUDITS.filter(
      (item) => item.executableConflictResolverAuthorized,
    ).length,
});

export const R145_UPSTREAM_BINDINGS = Object.freeze({
  r057: {
    version: R057_LIUHAI_EVIDENCE_WEIGHT_VERSION,
    structuralPairCount: R057_AUTHORITY.structuralPairCount,
    pairPresenceImpliesFixedEffect: R057_AUTHORITY.pairPresenceImpliesFixedEffect,
    pairPresenceImpliesHarmfulPolarity:
      R057_AUTHORITY.pairPresenceImpliesHarmfulPolarity,
    universalDirectionalEffectAuthorized:
      R057_AUTHORITY.universalDirectionalEffectAuthorized,
    numericWeightAuthorized: R057_AUTHORITY.numericWeightAuthorized,
    executableEffectResolverAuthorized:
      R057_AUTHORITY.executableEffectResolverAuthorized,
    productionAuthorityPromoted: R057_AUTHORITY.productionAuthorityPromoted,
    contextAxes: R057_CONTEXT_AXES,
    executionGaps: R057_EXECUTION_GAPS,
  },
  r058: {
    version: R058_PO_SOURCE_VARIANCE_VERSION,
    selectedSourcePairCount: R058_AUTHORITY.selectedSourcePairCount,
    universalPairRegistryAuthorized: R058_AUTHORITY.universalPairRegistryAuthorized,
    automaticHarmAuthorized: R058_AUTHORITY.automaticHarmAuthorized,
    numericWeightAuthorized: R058_AUTHORITY.numericWeightAuthorized,
    executableEffectResolverAuthorized:
      R058_AUTHORITY.executableEffectResolverAuthorized,
    productionAuthorityPromoted: R058_AUTHORITY.productionAuthorityPromoted,
    sourceWarningObserved: R058_EFFECT_BOUNDARY.sourceWarningObserved,
    fixedSeverityAuthorized: R058_EFFECT_BOUNDARY.fixedSeverityAuthorized,
    executionGaps: R058_EXECUTION_GAPS,
  },
  sourceScopedBreak: {
    version: GENERAL_NATAL_SOURCE_SCOPED_BRANCH_BREAK_VERSION,
    selectedPairCount: GENERAL_NATAL_SOURCE_SCOPED_BRANCH_BREAK_PAIRS.length,
    nonAdmittedModernPairCount:
      GENERAL_NATAL_NON_ADMITTED_MODERN_BRANCH_BREAK_PAIRS.length,
  },
  r059: {
    version: R059_INTERACTION_CONFLICT_CORPUS_VERSION,
    harmConflictCaseCoverage: R059_COVERAGE.harmConflictCaseCoverage,
    breakConflictCaseCoverage: R059_COVERAGE.breakConflictCaseCoverage,
    universalPrecedenceAuthorized: R059_AUTHORITY.universalPrecedenceAuthorized,
    executableConflictResolverAuthorized:
      R059_AUTHORITY.executableConflictResolverAuthorized,
    executionGaps: R059_EXECUTION_GAPS,
  },
  gejuPrimitiveReview: {
    version:
      GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW_VERSION,
    canonicalBranchPoInputAvailable:
      GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW
        .canonicalBranchPoInputAvailable,
    canonicalBranchHaiInputAvailable:
      GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW
        .canonicalBranchHaiInputAvailable,
    generalizedEffectPredicateAuthorized:
      GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW
        .generalizedXingChongPoHaiEffectPredicateAuthorized,
    productionFactEmissionAuthorized:
      GENERAL_NATAL_GEJU_XING_CHONG_PO_HAI_EFFECT_PRIMITIVE_AUTHORITY_REVIEW
        .productionFactEmissionAuthorized,
  },
});

export const R145_AUTHORITY = Object.freeze({
  status: 'RESEARCH_HARM_BREAK_LOW_EVIDENCE_BOUNDARY_AUDIT_COMPLETE' as const,
  researchOnly: true,
  allR057HarmPairsAudited: true,
  allR057DirectModifiersAudited: true,
  r057RelativeWeightBoundaryAudited: true,
  allR058SelectedBreakPairsAudited: true,
  allR058LaterCommonVariantsAudited: true,
  selectedBreakPairsCrossCheckedAgainstSourceScopedRegistry: true,
  harmConflictEvidenceInsufficiencyPreserved: true,
  breakConflictEvidenceInsufficiencyPreserved: true,
  gejuHarmBreakCanonicalInputGapPreserved: true,
  structuralMembershipDistinctFromEffectObserved: true,
  sourceScopedMembershipDistinctFromUniversalRegistryObserved: true,
  materialityDistinctFromEstablishmentPredicateObserved: true,
  pairPresenceToHarmPolarityAuthorized: false,
  universalHarmDirectionalEffectAuthorized: false,
  universalBreakPairRegistryAuthorized: false,
  laterCommonBreakAutoImportAuthorized: false,
  numericSeverityAuthorized: false,
  harmBreakConflictSettlementAuthorized: false,
  canonicalBranchHaiProductionInputAuthorized: false,
  canonicalBranchPoProductionInputAuthorized: false,
  generalizedGejuEffectPredicateAuthorized: false,
  chartRoleFactEmissionAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
