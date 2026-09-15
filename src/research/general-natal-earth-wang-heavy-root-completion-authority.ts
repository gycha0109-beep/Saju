import { createHash } from 'node:crypto';
import type { EarthlyBranch, StemFact } from '../contracts/calculation.js';
import {
  GENERAL_NATAL_WANG_FOUR_ELEMENT_MAPPING,
  GENERAL_NATAL_WANG_HEAVY_ROOT_AUTHORITY,
  GENERAL_NATAL_WANG_HEAVY_ROOT_DEFINITION_HASH,
} from './general-natal-wang-heavy-root-authority.js';

export const GENERAL_NATAL_EARTH_WANG_HEAVY_ROOT_COMPLETION_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_EARTH_WANG_HEAVY_ROOT_COMPLETION_SCOPE =
  'earth_wang_four_season_branch_location_heavy_root_completion' as const;
export const GENERAL_NATAL_EARTH_WANG_HEAVY_ROOT_COMPLETION_DECISION =
  'AUTHORIZED_RESEARCH_ONLY' as const;

export const GENERAL_NATAL_EARTH_WANG_HEAVY_ROOT_COMPLETION_SOURCES = Object.freeze([
  Object.freeze({
    title: '子平真詮 / 子平真詮評註',
    section: '論十干得時不旺失時不弱',
    url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
    accessedAt: '2026-09-15',
    sourceType: 'classical_transcription_with_commentary',
  }),
  Object.freeze({
    title: '子平真詮 / 子平真詮評註',
    section: '論陰陽生死',
    url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_03.htm',
    accessedAt: '2026-09-15',
    sourceType: 'classical_transcription_with_commentary',
  }),
] as const);

export const GENERAL_NATAL_EARTH_WANG_HEAVY_ROOT_COMPLETION_SOURCE_OBSERVATIONS =
  Object.freeze([
    Object.freeze({
      observation: 'The selected source classifies 長生祿旺 as heavy roots.',
      authority: 'direct_source_wang_heavy_root_semantic' as const,
    }),
    Object.freeze({
      observation:
        'The selected source places Earth Wang across the four seasonal Earth branches 辰戌丑未.',
      authority: 'direct_source_earth_four_season_wang' as const,
    }),
    Object.freeze({
      observation:
        'The selected source treats 生旺墓絕 at the five-element level without a separate Yin/Yang branch-location table.',
      authority: 'direct_source_element_level_scope' as const,
    }),
    Object.freeze({
      observation:
        'The source also records eighteen-day seasonal subperiods, but this completion does not consume or calculate that timing layer.',
      authority: 'direct_source_timing_boundary_not_consumed' as const,
    }),
  ] as const);

export const GENERAL_NATAL_EARTH_WANG_BRANCH_LOCATIONS = Object.freeze([
  '진',
  '술',
  '축',
  '미',
] as const satisfies readonly EarthlyBranch[]);

export type CompleteWangHeavyRootState =
  | 'wang_heavy_root_established'
  | 'no_governed_heavy_root_match';

export interface CompleteWangHeavyRootEvaluation {
  readonly element: StemFact['element'];
  readonly branch: EarthlyBranch;
  readonly heavyRootState: CompleteWangHeavyRootState;
  readonly authority: 'research_only';
}

export function evaluateCompleteWangHeavyRoot(
  dayMaster: Pick<StemFact, 'element'>,
  branch: EarthlyBranch,
): CompleteWangHeavyRootEvaluation {
  if (dayMaster.element === '토') {
    const earthWangMatch = GENERAL_NATAL_EARTH_WANG_BRANCH_LOCATIONS.some(
      (candidate) => candidate === branch,
    );

    return Object.freeze({
      element: dayMaster.element,
      branch,
      heavyRootState: earthWangMatch
        ? 'wang_heavy_root_established'
        : 'no_governed_heavy_root_match',
      authority: 'research_only',
    });
  }

  return Object.freeze({
    element: dayMaster.element,
    branch,
    heavyRootState:
      branch === GENERAL_NATAL_WANG_FOUR_ELEMENT_MAPPING[dayMaster.element]
        ? 'wang_heavy_root_established'
        : 'no_governed_heavy_root_match',
    authority: 'research_only',
  });
}

export const GENERAL_NATAL_EARTH_WANG_HEAVY_ROOT_COMPLETION_UNAUTHORIZED_DERIVATIONS =
  Object.freeze([
    'earth_eighteen_day_month_command_timing_evaluator',
    'earth_wang_exact_eighteen_day_subperiod_consumption',
    'twelve_growth_diwang_to_wang_root_class',
    'diwang_to_yangren_equivalence',
    'four_earth_branches_as_wang_for_non_earth_elements',
    'hidden_stem_order_to_wang_root_class',
    'wang_to_numeric_weight',
    'wang_to_ordinary_strength',
    'wang_to_generalized_root_weight_classifier',
    'wang_to_geju_candidate',
    'wang_to_geju_establishment',
    'wang_to_production_fact',
  ] as const);

export const GENERAL_NATAL_EARTH_WANG_HEAVY_ROOT_COMPLETION_DEFINITION_HASH =
  createHash('sha256')
    .update(
      JSON.stringify({
        version: GENERAL_NATAL_EARTH_WANG_HEAVY_ROOT_COMPLETION_VERSION,
        scope: GENERAL_NATAL_EARTH_WANG_HEAVY_ROOT_COMPLETION_SCOPE,
        decision: GENERAL_NATAL_EARTH_WANG_HEAVY_ROOT_COMPLETION_DECISION,
        sources: GENERAL_NATAL_EARTH_WANG_HEAVY_ROOT_COMPLETION_SOURCES,
        sourceObservations:
          GENERAL_NATAL_EARTH_WANG_HEAVY_ROOT_COMPLETION_SOURCE_OBSERVATIONS,
        earthWangBranchLocations: GENERAL_NATAL_EARTH_WANG_BRANCH_LOCATIONS,
        upstreamWangVersion: GENERAL_NATAL_WANG_HEAVY_ROOT_AUTHORITY.version,
        upstreamWangDefinitionHash: GENERAL_NATAL_WANG_HEAVY_ROOT_DEFINITION_HASH,
        upstreamNonEarthMapping: GENERAL_NATAL_WANG_FOUR_ELEMENT_MAPPING,
        earthEighteenDayTimingConsumed: false,
        twelveGrowthStageMappingConsumedByMatcher: false,
        hiddenStemDataConsumedByMatcher: false,
        unauthorizedDerivations:
          GENERAL_NATAL_EARTH_WANG_HEAVY_ROOT_COMPLETION_UNAUTHORIZED_DERIVATIONS,
      }),
    )
    .digest('hex');

export const GENERAL_NATAL_EARTH_WANG_HEAVY_ROOT_COMPLETION_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_EARTH_WANG_HEAVY_ROOT_COMPLETION_VERSION,
  definitionHash: GENERAL_NATAL_EARTH_WANG_HEAVY_ROOT_COMPLETION_DEFINITION_HASH,
  decision: GENERAL_NATAL_EARTH_WANG_HEAVY_ROOT_COMPLETION_DECISION,
  upstreamWangVersion: GENERAL_NATAL_WANG_HEAVY_ROOT_AUTHORITY.version,
  upstreamWangDefinitionHash: GENERAL_NATAL_WANG_HEAVY_ROOT_DEFINITION_HASH,
  canonicalInputUsesStemFactElement: true,
  canonicalInputUsesEarthlyBranch: true,
  directSourceWangHeavyRootSemanticObserved: true,
  directSourceEarthFourSeasonWangObserved: true,
  directSourceEarthBranchSetObserved: true,
  directSourceElementLevelNoYinYangSplitObserved: true,
  earthWangBranchLocationMappingAuthorizedResearchOnly: true,
  completeFiveElementWangHeavyRootMatcherAuthorizedResearchOnly: true,
  earthMonthCommandEighteenDayTimingEvaluatorAuthorized: false,
  earthWangExactEighteenDaySubperiodConsumed: false,
  twelveGrowthStageMappingConsumedByMatcher: false,
  twelveGrowthDiwangToWangEquivalenceAuthorized: false,
  diwangToYangrenEquivalenceAuthorized: false,
  hiddenStemDataConsumedByMatcher: false,
  generalizedRootWeightClassifierAuthorized: false,
  numericRootWeightAuthorized: false,
  ordinaryStrengthClassificationAuthorized: false,
  candidateDerivationAuthorized: false,
  establishmentPredicateAuthorized: false,
  candidateFactsEmitted: false,
  establishmentFactsEmitted: false,
  productionFactEmissionAuthorized: false,
  unauthorizedDerivations:
    GENERAL_NATAL_EARTH_WANG_HEAVY_ROOT_COMPLETION_UNAUTHORIZED_DERIVATIONS,
  authorityBoundary:
    'This research-only completion preserves the #561 non-Earth Wang mappings and resolves only the selected-source Earth branch-location boundary: Earth Wang is recognized at 辰, 戌, 丑, and 未 at the five-element level. The source-described eighteen-day seasonal timing layer is explicitly not calculated or consumed. The #548 Twelve-Growth table and hidden-stem data are not inputs. Numeric strength, ordinary strength, generalized root-weight classification, Gyeokguk candidate/establishment, and production emission remain unauthorized.',
});
