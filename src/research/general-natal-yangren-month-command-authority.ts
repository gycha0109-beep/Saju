import { createHash } from 'node:crypto';
import type { EarthlyBranch, StemFact } from '../contracts/calculation.js';
import {
  GENERAL_NATAL_YANGREN_ELIGIBILITY_AUTHORITY,
  GENERAL_NATAL_YANGREN_ELIGIBILITY_DEFINITION_HASH,
  evaluateYangrenEligibility,
} from './general-natal-yangren-eligibility-authority.js';

export const GENERAL_NATAL_YANGREN_MONTH_COMMAND_VERSION = '0.1.0-research' as const;
export const GENERAL_NATAL_YANGREN_MONTH_COMMAND_SCOPE =
  'five_yang_stem_month_command_yangren_matcher' as const;
export const GENERAL_NATAL_YANGREN_MONTH_COMMAND_DECISION =
  'AUTHORIZED_RESEARCH_ONLY' as const;

export const GENERAL_NATAL_YANGREN_MONTH_COMMAND_SOURCE = Object.freeze({
  title: '子平真詮 / 子平真詮評註 — 論陽刃 / 論建祿月劫',
  url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_035.htm',
  accessedAt: '2026-09-15',
  sourceType: 'classical_transcription_with_commentary',
});

export const GENERAL_NATAL_YANGREN_MONTH_COMMAND_SOURCE_OBSERVATIONS = Object.freeze([
  Object.freeze({
    id: 'five_yang_scope',
    observation: '祿前一位，惟五陽有之；五陽者，甲丙戊庚壬也',
    authority: 'direct_selected_source_scope' as const,
  }),
  Object.freeze({
    id: 'month_command_boundary',
    observation:
      '甲木生卯月為刃；若非卯月而年日時支為卯，則應名之為劫而不名為刃',
    authority: 'direct_selected_source_month_command_boundary' as const,
  }),
  Object.freeze({
    id: 'jia_mao',
    observation: '甲木生卯月為刃',
    authority: 'direct_selected_source_mapping' as const,
  }),
  Object.freeze({
    id: 'bing_wu',
    observation: '丙生午月',
    authority: 'direct_selected_source_mapping' as const,
  }),
  Object.freeze({
    id: 'wu_wu',
    observation: '戊生午月',
    authority: 'direct_selected_source_mapping' as const,
  }),
  Object.freeze({
    id: 'geng_you',
    observation: '辛卯、丁酉、庚午、丙子，即陽刃格',
    authority: 'direct_selected_source_month_command_example' as const,
  }),
  Object.freeze({
    id: 'ren_zi',
    observation: '己酉、丙子、壬寅、丙午；月令陽刃',
    authority: 'direct_selected_source_month_command_example' as const,
  }),
  Object.freeze({
    id: 'yin_reclassification',
    observation: '月劫者月令逢劫也，陽干為刃，陰乾為劫',
    authority: 'direct_selected_source_yin_exclusion_boundary' as const,
  }),
] as const);

export const GENERAL_NATAL_FIVE_YANG_MONTH_COMMAND_YANGREN_MAPPING = Object.freeze({
  갑: '묘',
  병: '오',
  무: '오',
  경: '유',
  임: '자',
} as const);

type GovernedYangStem = keyof typeof GENERAL_NATAL_FIVE_YANG_MONTH_COMMAND_YANGREN_MAPPING;

function isGovernedYangStem(value: StemFact['value']): value is GovernedYangStem {
  return Object.prototype.hasOwnProperty.call(
    GENERAL_NATAL_FIVE_YANG_MONTH_COMMAND_YANGREN_MAPPING,
    value,
  );
}

export type YangrenMonthCommandState =
  | 'yangren_month_command_established'
  | 'no_governed_yangren_month_match'
  | 'excluded_by_selected_source_scope';

export interface YangrenMonthCommandEvaluation {
  readonly dayMaster: StemFact['value'];
  readonly yinYang: StemFact['yinYang'];
  readonly monthBranch: EarthlyBranch;
  readonly governedYangrenMonthBranch: EarthlyBranch | null;
  readonly state: YangrenMonthCommandState;
  readonly authority: 'research_only';
}

export function evaluateYangrenMonthCommand(
  dayMaster: Pick<StemFact, 'value' | 'yinYang'>,
  monthBranch: EarthlyBranch,
): YangrenMonthCommandEvaluation {
  const eligibility = evaluateYangrenEligibility(dayMaster);

  if (eligibility.yangrenEligibility === 'excluded_by_selected_source_scope') {
    return Object.freeze({
      dayMaster: dayMaster.value,
      yinYang: dayMaster.yinYang,
      monthBranch,
      governedYangrenMonthBranch: null,
      state: 'excluded_by_selected_source_scope',
      authority: 'research_only',
    });
  }

  if (!isGovernedYangStem(dayMaster.value)) {
    return Object.freeze({
      dayMaster: dayMaster.value,
      yinYang: dayMaster.yinYang,
      monthBranch,
      governedYangrenMonthBranch: null,
      state: 'no_governed_yangren_month_match',
      authority: 'research_only',
    });
  }

  const governedYangrenMonthBranch =
    GENERAL_NATAL_FIVE_YANG_MONTH_COMMAND_YANGREN_MAPPING[dayMaster.value];

  return Object.freeze({
    dayMaster: dayMaster.value,
    yinYang: dayMaster.yinYang,
    monthBranch,
    governedYangrenMonthBranch,
    state:
      monthBranch === governedYangrenMonthBranch
        ? 'yangren_month_command_established'
        : 'no_governed_yangren_month_match',
    authority: 'research_only',
  });
}

export const GENERAL_NATAL_YANGREN_MONTH_COMMAND_UNAUTHORIZED_DERIVATIONS = Object.freeze([
  'diwang_as_yangren',
  'mingli_tanyuan_twelve_growth_cell_as_yangren',
  'yin_stem_yangren_mapping',
  'same_branch_in_year_pillar_as_month_command_yangren',
  'same_branch_in_day_pillar_as_month_command_yangren',
  'same_branch_in_hour_pillar_as_month_command_yangren',
  'month_command_yangren_as_heavy_root_equivalence',
  'month_command_yangren_as_numeric_weight',
  'month_command_yangren_as_ordinary_strength',
  'month_command_yangren_as_generalized_root_weight_class',
  'month_command_yangren_as_geju_candidate',
  'month_command_yangren_as_geju_establishment',
  'month_command_yangren_as_production_fact',
] as const);

export const GENERAL_NATAL_YANGREN_MONTH_COMMAND_DEFINITION_HASH = createHash('sha256')
  .update(
    JSON.stringify({
      version: GENERAL_NATAL_YANGREN_MONTH_COMMAND_VERSION,
      scope: GENERAL_NATAL_YANGREN_MONTH_COMMAND_SCOPE,
      decision: GENERAL_NATAL_YANGREN_MONTH_COMMAND_DECISION,
      source: GENERAL_NATAL_YANGREN_MONTH_COMMAND_SOURCE,
      sourceObservations: GENERAL_NATAL_YANGREN_MONTH_COMMAND_SOURCE_OBSERVATIONS,
      mapping: GENERAL_NATAL_FIVE_YANG_MONTH_COMMAND_YANGREN_MAPPING,
      upstreamEligibilityVersion: GENERAL_NATAL_YANGREN_ELIGIBILITY_AUTHORITY.version,
      upstreamEligibilityDefinitionHash: GENERAL_NATAL_YANGREN_ELIGIBILITY_DEFINITION_HASH,
      monthBranchInputOnly: true,
      arbitraryPillarYangrenMatcherAuthorized: false,
      twelveGrowthStageMappingConsumed: false,
      diwangToYangrenEquivalenceAuthorized: false,
      yangrenToHeavyRootEquivalenceAuthorized: false,
      unauthorizedDerivations: GENERAL_NATAL_YANGREN_MONTH_COMMAND_UNAUTHORIZED_DERIVATIONS,
    }),
  )
  .digest('hex');

export const GENERAL_NATAL_YANGREN_MONTH_COMMAND_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_YANGREN_MONTH_COMMAND_VERSION,
  definitionHash: GENERAL_NATAL_YANGREN_MONTH_COMMAND_DEFINITION_HASH,
  decision: GENERAL_NATAL_YANGREN_MONTH_COMMAND_DECISION,
  upstreamEligibilityVersion: GENERAL_NATAL_YANGREN_ELIGIBILITY_AUTHORITY.version,
  upstreamEligibilityDefinitionHash: GENERAL_NATAL_YANGREN_ELIGIBILITY_DEFINITION_HASH,
  directSourceFiveYangScopeObserved: true,
  directSourceMonthCommandBoundaryObserved: true,
  directSourceJiaMaoYangrenObserved: true,
  directSourceBingWuYangrenObserved: true,
  directSourceWuWuYangrenObserved: true,
  directSourceGengYouYangrenObserved: true,
  directSourceRenZiYangrenObserved: true,
  canonicalDayMasterAvailable: true,
  canonicalMonthBranchAvailable: true,
  fiveYangMonthCommandYangrenMatcherAuthorizedResearchOnly: true,
  yinStemYangrenExclusionAuthorizedResearchOnly:
    GENERAL_NATAL_YANGREN_ELIGIBILITY_AUTHORITY.yinStemYangrenExclusionAuthorizedResearchOnly,
  monthBranchInputOnly: true,
  arbitraryPillarYangrenMatcherAuthorized: false,
  sameBranchInYearDayHourAsYangrenAuthorized: false,
  twelveGrowthStageMappingConsumed: false,
  diwangToYangrenEquivalenceAuthorized: false,
  yangrenToHeavyRootEquivalenceAuthorized: false,
  hiddenStemDataConsumed: false,
  generalizedRootWeightClassifierAuthorized: false,
  numericRootWeightAuthorized: false,
  ordinaryStrengthClassificationAuthorized: false,
  candidateDerivationAuthorized: false,
  establishmentPredicateAuthorized: false,
  candidateFactsEmitted: false,
  establishmentFactsEmitted: false,
  productionFactEmissionAuthorized: false,
  unauthorizedDerivations: GENERAL_NATAL_YANGREN_MONTH_COMMAND_UNAUTHORIZED_DERIVATIONS,
  authorityBoundary:
    'The selected source authorizes a research-only Yangren matcher only at month-command scope for the five Yang day stems: 甲卯, 丙午, 戊午, 庚酉, 壬子. It explicitly distinguishes the same branch in year/day/hour positions from month-command 刃, and the upstream eligibility authority excludes Yin stems. This artifact consumes no Twelve-Growth table, makes no 帝旺 bridge, emits no heavy-root equivalence, and grants no ordinary-strength, Gyeokguk, or production authority.',
});
