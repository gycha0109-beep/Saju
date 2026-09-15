import { createHash } from 'node:crypto';
import type { EarthlyBranch, HeavenlyStem } from '../contracts/calculation.js';
import {
  GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_OBSERVATION_DEFINITION_HASH,
  GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_OBSERVATION_VERSION,
} from './general-natal-four-element-de-shi-season-observation-authority.js';
import {
  GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_DEFINITION_HASH,
  GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_VERSION,
} from './general-natal-wang-shuai-qiang-ruo-semantic-axis-authority.js';

export const GENERAL_NATAL_WOOD_MONTH_COMMAND_DE_SHI_SHI_SHI_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_WOOD_MONTH_COMMAND_DE_SHI_SHI_SHI_SCOPE =
  'wood_month_command_de_shi_shi_shi_matcher' as const;
export const GENERAL_NATAL_WOOD_MONTH_COMMAND_DE_SHI_SHI_SHI_DECISION =
  'AUTHORIZED_RESEARCH_ONLY' as const;

export const GENERAL_NATAL_WOOD_MONTH_COMMAND_DE_SHI_SHI_SHI_SOURCE = Object.freeze({
  title: '子平真詮 / 子平真詮評註',
  section: '論十干得時不旺失時不弱',
  url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
  accessedAt: '2026-09-15',
  sourceType: 'classical_transcription_with_commentary',
});

export const GENERAL_NATAL_WOOD_MONTH_COMMAND_DE_SHI_SOURCE_TEXT =
  '甲乙木生於寅卯月，為得時者旺' as const;
export const GENERAL_NATAL_WOOD_MONTH_COMMAND_SHI_SHI_SOURCE_TEXT =
  '甲乙木生於申酉月，為失時則衰' as const;

export type GeneralNatalWoodMonthCommandTimingState =
  | 'de_shi_month_observed'
  | 'shi_shi_month_observed'
  | 'unresolved_by_selected_source_primitive'
  | 'outside_selected_source_scope';

export const GENERAL_NATAL_WOOD_MONTH_COMMAND_DE_SHI_BRANCHES = Object.freeze([
  '인',
  '묘',
] as const);
export const GENERAL_NATAL_WOOD_MONTH_COMMAND_SHI_SHI_BRANCHES = Object.freeze([
  '신',
  '유',
] as const);
export const GENERAL_NATAL_WOOD_MONTH_COMMAND_DAY_MASTERS = Object.freeze([
  '갑',
  '을',
] as const);

export const GENERAL_NATAL_WOOD_MONTH_COMMAND_SOURCE_OBSERVATIONS = Object.freeze([
  Object.freeze({
    id: 'jia_yi_yin_mao_de_shi',
    sourceText: GENERAL_NATAL_WOOD_MONTH_COMMAND_DE_SHI_SOURCE_TEXT,
    dayMasters: GENERAL_NATAL_WOOD_MONTH_COMMAND_DAY_MASTERS,
    monthBranches: GENERAL_NATAL_WOOD_MONTH_COMMAND_DE_SHI_BRANCHES,
    timingState: '得時' as const,
    sourceAlsoStates: '旺' as const,
  }),
  Object.freeze({
    id: 'jia_yi_shen_you_shi_shi',
    sourceText: GENERAL_NATAL_WOOD_MONTH_COMMAND_SHI_SHI_SOURCE_TEXT,
    dayMasters: GENERAL_NATAL_WOOD_MONTH_COMMAND_DAY_MASTERS,
    monthBranches: GENERAL_NATAL_WOOD_MONTH_COMMAND_SHI_SHI_BRANCHES,
    timingState: '失時' as const,
    sourceAlsoStates: '衰' as const,
  }),
] as const);

export const GENERAL_NATAL_WOOD_MONTH_COMMAND_CANONICAL_REPRESENTABILITY = Object.freeze({
  canonicalDayMasterStemAvailable: true,
  canonicalDayMasterElementAvailable: true,
  canonicalMonthBranchAvailable: true,
  canonicalSeasonFactRequired: false,
  canonicalSeasonResolverRequired: false,
  canonicalSeasonResolverAuthorized: false,
  monthBranchToSeasonMappingRequired: false,
  monthBranchToSeasonMappingAuthorized: false,
});

export const GENERAL_NATAL_WOOD_MONTH_COMMAND_UNAUTHORIZED_DERIVATIONS = Object.freeze([
  'yin_mao_plus_chen_to_complete_spring_mapping',
  'shen_you_plus_xu_to_complete_autumn_mapping',
  'month_branch_to_season_mapping',
  'solar_term_context_to_season_mapping',
  'wood_other_month_branch_to_timing_negative_verdict',
  'wood_mapping_to_other_elements_by_analogy',
  'four_element_season_observation_to_complete_month_branch_matcher',
  'local_de_shi_to_final_chart_wang',
  'local_shi_shi_to_final_chart_shuai',
  'timing_state_to_ordinary_qiang_ruo',
  'timing_state_to_numeric_strength_score',
  'timing_state_to_nonnumeric_strength_scalar',
  'timing_state_to_geju_candidate',
  'timing_state_to_geju_establishment',
  'timing_state_to_production_fact',
  'same_branch_in_year_day_hour_to_month_command_timing',
] as const);

export function evaluateGeneralNatalWoodMonthCommandTiming(
  dayMaster: HeavenlyStem,
  monthCommandBranch: EarthlyBranch,
): GeneralNatalWoodMonthCommandTimingState {
  if (dayMaster !== '갑' && dayMaster !== '을') {
    return 'outside_selected_source_scope';
  }

  if (monthCommandBranch === '인' || monthCommandBranch === '묘') {
    return 'de_shi_month_observed';
  }

  if (monthCommandBranch === '신' || monthCommandBranch === '유') {
    return 'shi_shi_month_observed';
  }

  return 'unresolved_by_selected_source_primitive';
}

export const GENERAL_NATAL_WOOD_MONTH_COMMAND_DE_SHI_SHI_SHI_DEFINITION_HASH = createHash(
  'sha256',
)
  .update(
    JSON.stringify({
      version: GENERAL_NATAL_WOOD_MONTH_COMMAND_DE_SHI_SHI_SHI_VERSION,
      scope: GENERAL_NATAL_WOOD_MONTH_COMMAND_DE_SHI_SHI_SHI_SCOPE,
      decision: GENERAL_NATAL_WOOD_MONTH_COMMAND_DE_SHI_SHI_SHI_DECISION,
      source: GENERAL_NATAL_WOOD_MONTH_COMMAND_DE_SHI_SHI_SHI_SOURCE,
      observations: GENERAL_NATAL_WOOD_MONTH_COMMAND_SOURCE_OBSERVATIONS,
      representability: GENERAL_NATAL_WOOD_MONTH_COMMAND_CANONICAL_REPRESENTABILITY,
      upstreamSemanticAxisVersion:
        GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_VERSION,
      upstreamSemanticAxisDefinitionHash:
        GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_DEFINITION_HASH,
      upstreamSeasonObservationVersion:
        GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_OBSERVATION_VERSION,
      upstreamSeasonObservationDefinitionHash:
        GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_OBSERVATION_DEFINITION_HASH,
      chartFactsConsumed: ['derivedFacts.dayMaster.value', 'pillars.month.branch.value'],
      unauthorizedDerivations:
        GENERAL_NATAL_WOOD_MONTH_COMMAND_UNAUTHORIZED_DERIVATIONS,
      productionFactEmissionAuthorized: false,
    }),
  )
  .digest('hex');

export const GENERAL_NATAL_WOOD_MONTH_COMMAND_DE_SHI_SHI_SHI_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_WOOD_MONTH_COMMAND_DE_SHI_SHI_SHI_VERSION,
  definitionHash: GENERAL_NATAL_WOOD_MONTH_COMMAND_DE_SHI_SHI_SHI_DEFINITION_HASH,
  decision: GENERAL_NATAL_WOOD_MONTH_COMMAND_DE_SHI_SHI_SHI_DECISION,
  upstreamSemanticAxisVersion: GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_VERSION,
  upstreamSemanticAxisDefinitionHash:
    GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_DEFINITION_HASH,
  upstreamSeasonObservationVersion:
    GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_OBSERVATION_VERSION,
  upstreamSeasonObservationDefinitionHash:
    GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_OBSERVATION_DEFINITION_HASH,
  directSourceJiaYiWoodScopeObserved: true,
  directSourceYinMaoDeShiObserved: true,
  directSourceShenYouShiShiObserved: true,
  directSourceDeShiWangPhraseObserved: true,
  directSourceShiShiShuaiPhraseObserved: true,
  canonicalDayMasterAndMonthBranchAvailable: true,
  woodMonthCommandTimingMatcherAuthorizedResearchOnly: true,
  otherWoodMonthBranchTimingStateResolved: false,
  nonWoodDayMasterOutsideSelectedSourceScope: true,
  yearDayHourBranchMatcherAuthorized: false,
  canonicalSeasonResolverAuthorized: false,
  monthBranchToSeasonMappingAuthorized: false,
  generalizedFiveElementTimingTableAuthorized: false,
  localDeShiToFinalChartWangAuthorized: false,
  localShiShiToFinalChartShuaiAuthorized: false,
  chartLevelWangShuaiClassifierAuthorized: false,
  ordinaryQiangRuoClassifierAuthorized: false,
  numericStrengthAuthorized: false,
  nonNumericStrengthScalarAuthorized: false,
  candidateDerivationAuthorized: false,
  establishmentPredicateAuthorized: false,
  candidateFactsEmitted: false,
  establishmentFactsEmitted: false,
  productionFactEmissionAuthorized: false,
  chartFactsConsumed: Object.freeze([
    'derivedFacts.dayMaster.value',
    'pillars.month.branch.value',
  ] as const),
  unauthorizedDerivations:
    GENERAL_NATAL_WOOD_MONTH_COMMAND_UNAUTHORIZED_DERIVATIONS,
  authorityBoundary:
    'The selected source directly enumerates 甲/乙 Wood day masters born in 寅/卯 month as 得時 and in 申/酉 month as 失時. Canonical day-master stem and month-branch facts are sufficient to evaluate exactly this bounded month-command timing primitive without a Season fact or branch-to-season resolver. All other Wood month branches remain unresolved by this primitive, non-Wood day masters are outside scope, and the local timing result must not be promoted into final chart 旺/衰, ordinary 強/弱, a strength scalar, Gyeokguk derivation, or production emission.',
});
