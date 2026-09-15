import { describe, expect, test } from 'vitest';
import * as woodTimingModule from '../src/research/general-natal-wood-month-command-de-shi-shi-shi-authority.js';
import type { EarthlyBranch, HeavenlyStem } from '../src/contracts/calculation.js';
import {
  GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_OBSERVATION_DEFINITION_HASH,
  GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_OBSERVATION_VERSION,
} from '../src/research/general-natal-four-element-de-shi-season-observation-authority.js';
import {
  evaluateGeneralNatalWoodMonthCommandTiming,
  GENERAL_NATAL_WOOD_MONTH_COMMAND_DE_SHI_SHI_SHI_AUTHORITY,
  GENERAL_NATAL_WOOD_MONTH_COMMAND_DE_SHI_SHI_SHI_DEFINITION_HASH,
  GENERAL_NATAL_WOOD_MONTH_COMMAND_SOURCE_OBSERVATIONS,
} from '../src/research/general-natal-wood-month-command-de-shi-shi-shi-authority.js';
import {
  GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_DEFINITION_HASH,
  GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_VERSION,
} from '../src/research/general-natal-wang-shuai-qiang-ruo-semantic-axis-authority.js';

const ALL_BRANCHES: readonly EarthlyBranch[] = [
  '자',
  '축',
  '인',
  '묘',
  '진',
  '사',
  '오',
  '미',
  '신',
  '유',
  '술',
  '해',
];

const NON_WOOD_STEMS: readonly HeavenlyStem[] = [
  '병',
  '정',
  '무',
  '기',
  '경',
  '신',
  '임',
  '계',
];

describe('General Natal Wood month-command De-Shi/Shi-Shi authority', () => {
  test('preserves the two direct selected-source observations', () => {
    expect(GENERAL_NATAL_WOOD_MONTH_COMMAND_SOURCE_OBSERVATIONS).toHaveLength(2);
    expect(GENERAL_NATAL_WOOD_MONTH_COMMAND_SOURCE_OBSERVATIONS[0]).toMatchObject({
      dayMasters: ['갑', '을'],
      monthBranches: ['인', '묘'],
      timingState: '得時',
      sourceAlsoStates: '旺',
    });
    expect(GENERAL_NATAL_WOOD_MONTH_COMMAND_SOURCE_OBSERVATIONS[1]).toMatchObject({
      dayMasters: ['갑', '을'],
      monthBranches: ['신', '유'],
      timingState: '失時',
      sourceAlsoStates: '衰',
    });
  });

  test('matches all four 甲/乙 × 寅/卯 combinations as bounded month-command 得時', () => {
    for (const dayMaster of ['갑', '을'] as const) {
      for (const monthBranch of ['인', '묘'] as const) {
        expect(evaluateGeneralNatalWoodMonthCommandTiming(dayMaster, monthBranch)).toBe(
          'de_shi_month_observed',
        );
      }
    }
  });

  test('matches all four 甲/乙 × 申/酉 combinations as bounded month-command 失時', () => {
    for (const dayMaster of ['갑', '을'] as const) {
      for (const monthBranch of ['신', '유'] as const) {
        expect(evaluateGeneralNatalWoodMonthCommandTiming(dayMaster, monthBranch)).toBe(
          'shi_shi_month_observed',
        );
      }
    }
  });

  test('keeps every other Wood month branch unresolved rather than treating it as a negative', () => {
    const unresolvedBranches = ALL_BRANCHES.filter(
      (branch) => !['인', '묘', '신', '유'].includes(branch),
    );
    expect(unresolvedBranches).toHaveLength(8);

    for (const dayMaster of ['갑', '을'] as const) {
      for (const monthBranch of unresolvedBranches) {
        expect(evaluateGeneralNatalWoodMonthCommandTiming(dayMaster, monthBranch)).toBe(
          'unresolved_by_selected_source_primitive',
        );
      }
    }
  });

  test('keeps all non-Wood day masters outside the selected-source scope for every month branch', () => {
    for (const dayMaster of NON_WOOD_STEMS) {
      for (const monthBranch of ALL_BRANCHES) {
        expect(evaluateGeneralNatalWoodMonthCommandTiming(dayMaster, monthBranch)).toBe(
          'outside_selected_source_scope',
        );
      }
    }
  });

  test('pins the exact upstream semantic-axis and season-observation authority identities', () => {
    const authority = GENERAL_NATAL_WOOD_MONTH_COMMAND_DE_SHI_SHI_SHI_AUTHORITY;
    expect(authority.upstreamSemanticAxisVersion).toBe(
      GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_VERSION,
    );
    expect(authority.upstreamSemanticAxisDefinitionHash).toBe(
      GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_DEFINITION_HASH,
    );
    expect(authority.upstreamSeasonObservationVersion).toBe(
      GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_OBSERVATION_VERSION,
    );
    expect(authority.upstreamSeasonObservationDefinitionHash).toBe(
      GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_OBSERVATION_DEFINITION_HASH,
    );
    expect(GENERAL_NATAL_WOOD_MONTH_COMMAND_DE_SHI_SHI_SHI_DEFINITION_HASH).toMatch(
      /^[0-9a-f]{64}$/,
    );
  });

  test('requires no season resolver and exposes no arbitrary-pillar timing API', () => {
    const authority = GENERAL_NATAL_WOOD_MONTH_COMMAND_DE_SHI_SHI_SHI_AUTHORITY;
    expect(authority.canonicalDayMasterAndMonthBranchAvailable).toBe(true);
    expect(authority.canonicalSeasonResolverAuthorized).toBe(false);
    expect(authority.monthBranchToSeasonMappingAuthorized).toBe(false);
    expect(authority.yearDayHourBranchMatcherAuthorized).toBe(false);
    expect('resolveSeason' in woodTimingModule).toBe(false);
    expect('evaluateGeneralNatalWoodPillarTiming' in woodTimingModule).toBe(false);
    expect('evaluateGeneralNatalFiveElementMonthTiming' in woodTimingModule).toBe(false);
  });

  test('keeps final 旺衰, ordinary 強弱, strength scalars, Gyeokguk, and production fail-closed', () => {
    const authority = GENERAL_NATAL_WOOD_MONTH_COMMAND_DE_SHI_SHI_SHI_AUTHORITY;
    expect(authority.generalizedFiveElementTimingTableAuthorized).toBe(false);
    expect(authority.localDeShiToFinalChartWangAuthorized).toBe(false);
    expect(authority.localShiShiToFinalChartShuaiAuthorized).toBe(false);
    expect(authority.chartLevelWangShuaiClassifierAuthorized).toBe(false);
    expect(authority.ordinaryQiangRuoClassifierAuthorized).toBe(false);
    expect(authority.numericStrengthAuthorized).toBe(false);
    expect(authority.nonNumericStrengthScalarAuthorized).toBe(false);
    expect(authority.candidateDerivationAuthorized).toBe(false);
    expect(authority.establishmentPredicateAuthorized).toBe(false);
    expect(authority.candidateFactsEmitted).toBe(false);
    expect(authority.establishmentFactsEmitted).toBe(false);
    expect(authority.productionFactEmissionAuthorized).toBe(false);
  });
});
