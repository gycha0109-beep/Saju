import { createHash } from 'node:crypto';
import {
  GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_DEFINITION_HASH,
  GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_VERSION,
} from './general-natal-wang-shuai-qiang-ruo-semantic-axis-authority.js';

export const GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_OBSERVATION_VERSION =
  '0.1.0-research' as const;
export const GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_OBSERVATION_SCOPE =
  'four_element_de_shi_season_observation' as const;
export const GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_OBSERVATION_DECISION =
  'AUTHORIZED_OBSERVATION_ONLY' as const;

export const GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_OBSERVATION_SOURCE = Object.freeze({
  title: '子平真詮 / 子平真詮評註',
  section: '論十干得時不旺失時不弱',
  url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
  accessedAt: '2026-09-15',
  sourceType: 'classical_transcription_with_commentary',
});

export const GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_SOURCE_TEXT =
  '春木夏火秋金冬水為得時' as const;

export const GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_OBSERVATIONS = Object.freeze([
  Object.freeze({
    id: 'wood_spring_de_shi_pair',
    sourceText: GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_SOURCE_TEXT,
    element: '木' as const,
    season: '春' as const,
    relation: 'source_observed_de_shi_pair' as const,
  }),
  Object.freeze({
    id: 'fire_summer_de_shi_pair',
    sourceText: GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_SOURCE_TEXT,
    element: '火' as const,
    season: '夏' as const,
    relation: 'source_observed_de_shi_pair' as const,
  }),
  Object.freeze({
    id: 'metal_autumn_de_shi_pair',
    sourceText: GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_SOURCE_TEXT,
    element: '金' as const,
    season: '秋' as const,
    relation: 'source_observed_de_shi_pair' as const,
  }),
  Object.freeze({
    id: 'water_winter_de_shi_pair',
    sourceText: GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_SOURCE_TEXT,
    element: '水' as const,
    season: '冬' as const,
    relation: 'source_observed_de_shi_pair' as const,
  }),
] as const);

export const GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_CANONICAL_REPRESENTABILITY =
  Object.freeze({
    canonicalFiveElementIdentityAvailable: true,
    canonicalMonthBranchAvailable: true,
    canonicalSeasonFactAvailable: false,
    canonicalSeasonResolverAuthorized: false,
    monthBranchToSeasonMappingAuthorized: false,
    solarTermToSeasonMappingAuthorized: false,
    executableDeShiMatcherAuthorized: false,
  });

export const GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_UNAUTHORIZED_DERIVATIONS =
  Object.freeze([
    'source_season_pair_to_canonical_season_resolver',
    'month_branch_to_season_mapping',
    'solar_term_context_to_season_mapping',
    'source_observed_pairs_to_earth_de_shi_season',
    'source_omission_to_earth_negative_verdict',
    'source_observed_pairs_to_complete_five_element_de_shi_table',
    'source_observed_pairs_to_chart_level_de_shi_matcher',
    'de_shi_to_final_chart_wang_verdict',
    'de_shi_to_ordinary_qiang_ruo',
    'season_to_numeric_strength_score',
    'season_to_nonnumeric_strength_scalar',
    'source_observation_to_geju_candidate',
    'source_observation_to_geju_establishment',
    'source_observation_to_production_fact',
  ] as const);

export const GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_OBSERVATION_DEFINITION_HASH =
  createHash('sha256')
    .update(
      JSON.stringify({
        version: GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_OBSERVATION_VERSION,
        scope: GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_OBSERVATION_SCOPE,
        decision: GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_OBSERVATION_DECISION,
        source: GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_OBSERVATION_SOURCE,
        sourceText: GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_SOURCE_TEXT,
        observations: GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_OBSERVATIONS,
        representability: GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_CANONICAL_REPRESENTABILITY,
        upstreamSemanticAxisVersion:
          GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_VERSION,
        upstreamSemanticAxisDefinitionHash:
          GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_DEFINITION_HASH,
        unauthorizedDerivations:
          GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_UNAUTHORIZED_DERIVATIONS,
        chartFactsConsumed: false,
        earthDeShiSeasonResolved: false,
        productionFactEmissionAuthorized: false,
      }),
    )
    .digest('hex');

export const GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_OBSERVATION_AUTHORITY =
  Object.freeze({
    version: GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_OBSERVATION_VERSION,
    definitionHash: GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_OBSERVATION_DEFINITION_HASH,
    decision: GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_OBSERVATION_DECISION,
    upstreamSemanticAxisVersion: GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_VERSION,
    upstreamSemanticAxisDefinitionHash:
      GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_DEFINITION_HASH,
    directSourceFourElementDeShiSeasonPairsObserved: true,
    sourceObservationCount:
      GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_OBSERVATIONS.length,
    earthDeShiSeasonResolved: false,
    canonicalFiveElementIdentityAvailable: true,
    canonicalMonthBranchAvailable: true,
    canonicalSeasonFactAvailable: false,
    canonicalSeasonResolverAuthorized: false,
    monthBranchToSeasonMappingAuthorized: false,
    solarTermToSeasonMappingAuthorized: false,
    chartLevelDeShiMatcherAuthorized: false,
    deShiToFinalWangVerdictAuthorized: false,
    chartLevelWangShuaiClassifierAuthorized: false,
    ordinaryStrengthClassificationAuthorized: false,
    numericStrengthAuthorized: false,
    nonNumericStrengthScalarAuthorized: false,
    candidateDerivationAuthorized: false,
    establishmentPredicateAuthorized: false,
    chartFactsConsumed: false,
    candidateFactsEmitted: false,
    establishmentFactsEmitted: false,
    productionFactEmissionAuthorized: false,
    unauthorizedDerivations:
      GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_UNAUTHORIZED_DERIVATIONS,
    authorityBoundary:
      'The selected source directly states only four element-season 得時 observations: 木/春, 火/夏, 金/秋, 水/冬. The canonical contract has Five-Element identity and month-branch facts but no canonical Season fact or governed branch/solar-term-to-season resolver. Earth is not enumerated by this sentence and remains unresolved rather than negative. Therefore these observations do not authorize a canonical season resolver, chart-level 得時 matcher, final 旺 verdict, ordinary 強弱 classification, strength scalar, Gyeokguk derivation, or production emission.',
  });
