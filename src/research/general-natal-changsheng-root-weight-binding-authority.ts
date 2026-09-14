import { createHash } from 'node:crypto';
import type { EarthlyBranch, StemFact } from '../contracts/calculation.js';
import {
  GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW,
  GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH,
} from './general-natal-geju-root-weight-classification-primitive-authority-review.js';
import {
  GENERAL_NATAL_TWELVE_GROWTH_STAGE_MAPPING_AUTHORITY,
  GENERAL_NATAL_TWELVE_GROWTH_STAGE_MAPPING_DEFINITION_HASH,
  getTwelveGrowthStage,
  type TwelveGrowthStage,
} from './general-natal-twelve-growth-stage-mapping-authority.js';

export const GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_VERSION = '0.1.0-research' as const;
export const GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_SCOPE =
  'ziping_zhenquan_changsheng_heavy_root_binding_with_yin_exception' as const;
export const GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_DECISION =
  'AUTHORIZED_RESEARCH_ONLY' as const;

export const GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_SOURCE = Object.freeze({
  title: '子平真詮 / 子平真詮評注',
  section: '論十干得時不旺失時不弱',
  url: 'https://ctext.org/wiki.pl?chapter=974137&if=en',
  accessedAt: '2026-09-14',
  sourceType: 'classical_transcription',
  authority:
    'Selected semantic authority for the heavy-root Changsheng clause and its explicit Yin-Changsheng exception. The source supplies direct bounded examples 乙午 and 丁酉 for the exception.',
});

export const GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_SOURCE_OBSERVATIONS = Object.freeze([
  Object.freeze({
    observation: '長生祿旺，根之重者也；墓庫餘氣，根之輕者也',
    authority: 'direct_source_semantic' as const,
  }),
  Object.freeze({
    observation: '陰長生不作此論，如乙逢午、丁逢酉之類，然亦為明根，比得一餘氣',
    authority: 'direct_exception_semantic' as const,
  }),
] as const);

export type ChangshengHeavyRootClauseState =
  | 'established'
  | 'excluded_by_yin_exception'
  | 'not_applicable';

export interface ChangshengHeavyRootClauseEvaluation {
  readonly stem: StemFact['value'];
  readonly yinYang: StemFact['yinYang'];
  readonly branch: EarthlyBranch;
  readonly stage: TwelveGrowthStage;
  readonly heavyRootByChangshengClause: ChangshengHeavyRootClauseState;
  readonly authority: 'research_only';
}

export function evaluateChangshengHeavyRootClause(
  dayMaster: Pick<StemFact, 'value' | 'yinYang'>,
  branch: EarthlyBranch,
): ChangshengHeavyRootClauseEvaluation {
  const stage = getTwelveGrowthStage(dayMaster.value, branch);

  if (stage !== '長生') {
    return Object.freeze({
      stem: dayMaster.value,
      yinYang: dayMaster.yinYang,
      branch,
      stage,
      heavyRootByChangshengClause: 'not_applicable',
      authority: 'research_only',
    });
  }

  if (dayMaster.yinYang === '음') {
    return Object.freeze({
      stem: dayMaster.value,
      yinYang: dayMaster.yinYang,
      branch,
      stage,
      heavyRootByChangshengClause: 'excluded_by_yin_exception',
      authority: 'research_only',
    });
  }

  return Object.freeze({
    stem: dayMaster.value,
    yinYang: dayMaster.yinYang,
    branch,
    stage,
    heavyRootByChangshengClause: 'established',
    authority: 'research_only',
  });
}

export const GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_UNAUTHORIZED_DERIVATIONS = Object.freeze([
  'linguan_as_lu',
  'diwang_as_ren',
  'yin_changsheng_as_light_root',
  'yin_changsheng_as_no_root',
  'minggen_as_complete_root_class',
  'minggen_as_yuqi_equivalence',
  'complete_yuqi_stem_branch_mapping',
  'tomb_stage_as_muku_root_class',
  'changsheng_clause_as_numeric_strength',
  'changsheng_clause_as_ordinary_strength',
  'changsheng_clause_as_generalized_root_weight_classifier',
  'changsheng_clause_as_geju_candidate',
  'changsheng_clause_as_geju_establishment',
  'changsheng_clause_as_production_fact',
] as const);

export const GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_DEFINITION_HASH = createHash('sha256')
  .update(
    JSON.stringify({
      version: GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_VERSION,
      scope: GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_SCOPE,
      decision: GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_DECISION,
      source: GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_SOURCE,
      sourceObservations: GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_SOURCE_OBSERVATIONS,
      upstreamRootWeightReviewVersion:
        GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW.reviewVersion,
      upstreamRootWeightReviewDefinitionHash:
        GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH,
      upstreamTwelveGrowthStageMappingVersion:
        GENERAL_NATAL_TWELVE_GROWTH_STAGE_MAPPING_AUTHORITY.version,
      upstreamTwelveGrowthStageMappingDefinitionHash:
        GENERAL_NATAL_TWELVE_GROWTH_STAGE_MAPPING_DEFINITION_HASH,
      unauthorizedDerivations:
        GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_UNAUTHORIZED_DERIVATIONS,
    }),
  )
  .digest('hex');

export const GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_VERSION,
  definitionHash: GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_DEFINITION_HASH,
  decision: GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_DECISION,
  upstreamRootWeightReviewVersion:
    GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW.reviewVersion,
  upstreamRootWeightReviewDefinitionHash:
    GENERAL_NATAL_GEJU_ROOT_WEIGHT_CLASSIFICATION_PRIMITIVE_AUTHORITY_REVIEW_DEFINITION_HASH,
  upstreamTwelveGrowthStageMappingVersion:
    GENERAL_NATAL_TWELVE_GROWTH_STAGE_MAPPING_AUTHORITY.version,
  upstreamTwelveGrowthStageMappingDefinitionHash:
    GENERAL_NATAL_TWELVE_GROWTH_STAGE_MAPPING_DEFINITION_HASH,
  directSourceChangshengHeavyRootSemanticObserved: true,
  directSourceYinChangshengExceptionObserved: true,
  directSourceYinChangshengBoundedExamples: Object.freeze(['乙午', '丁酉'] as const),
  canonicalDayMasterStemAvailable: true,
  canonicalDayMasterYinYangAvailable: true,
  canonicalBranchInputAvailable: true,
  twelveGrowthStageMappingAvailableResearchOnly: true,
  yangChangshengHeavyRootPredicateAuthorizedResearchOnly: true,
  yinChangshengHeavyRootExclusionAuthorizedResearchOnly: true,
  allFiveYinChangshengExclusionAuthorityChainAuthorized: true,
  yinChangshengMinggenSemanticObserved: true,
  yinChangshengMinggenClassifierAuthorized: false,
  yinChangshengYuqiEquivalenceAuthorized: false,
  luToLinGuanEquivalenceAuthorized: false,
  renToDiWangEquivalenceAuthorized: false,
  generalizedRootWeightClassifierAuthorized: false,
  numericStrengthAuthorized: false,
  ordinaryStrengthClassificationAuthorized: false,
  candidateFactsEmitted: false,
  establishmentFactsEmitted: false,
  productionFactEmissionAuthorized: false,
  unauthorizedDerivations:
    GENERAL_NATAL_CHANGSHENG_ROOT_WEIGHT_BINDING_UNAUTHORIZED_DERIVATIONS,
  authorityBoundary:
    'This research-only bridge authorizes only the source-native 長生 heavy-root clause for canonical Yang day masters and the explicit exclusion of canonical Yin day-master 長生 pairs from that clause. Applying the generic 陰長生不作此論 sentence to all five Yin stems is an authority-chain derivation through the governed #548 twelve-growth-stage mapping; only 乙午 and 丁酉 are direct bounded source examples. The exclusion does not classify Yin Changsheng as light root, no root, 餘氣, or any complete 明根 class, and it does not authorize 祿/刃 equivalence, generalized root-weight classification, numeric strength, ordinary strength, Gyeokguk candidate/establishment facts, or production emission.',
});
