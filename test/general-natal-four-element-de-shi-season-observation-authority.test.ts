import { describe, expect, test } from 'vitest';
import * as deShiSeasonModule from '../src/research/general-natal-four-element-de-shi-season-observation-authority.js';
import {
  GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_OBSERVATION_AUTHORITY,
  GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_OBSERVATION_DEFINITION_HASH,
  GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_OBSERVATIONS,
  GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_SOURCE_TEXT,
} from '../src/research/general-natal-four-element-de-shi-season-observation-authority.js';
import {
  GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_DEFINITION_HASH,
  GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_VERSION,
} from '../src/research/general-natal-wang-shuai-qiang-ruo-semantic-axis-authority.js';

describe('General Natal four-element De-Shi season observation authority', () => {
  test('preserves exactly the four source-observed element-season 得時 pairs', () => {
    expect(GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_SOURCE_TEXT).toBe(
      '春木夏火秋金冬水為得時',
    );
    expect(GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_OBSERVATIONS).toHaveLength(4);
    expect(
      GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_OBSERVATIONS.map((observation) => ({
        element: observation.element,
        season: observation.season,
        relation: observation.relation,
      })),
    ).toEqual([
      { element: '木', season: '春', relation: 'source_observed_de_shi_pair' },
      { element: '火', season: '夏', relation: 'source_observed_de_shi_pair' },
      { element: '金', season: '秋', relation: 'source_observed_de_shi_pair' },
      { element: '水', season: '冬', relation: 'source_observed_de_shi_pair' },
    ]);
    expect(
      GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_OBSERVATION_AUTHORITY.directSourceFourElementDeShiSeasonPairsObserved,
    ).toBe(true);
    expect(
      GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_OBSERVATION_AUTHORITY.sourceObservationCount,
    ).toBe(4);
  });

  test('keeps Earth unresolved instead of treating source omission as a negative verdict', () => {
    expect(
      GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_OBSERVATIONS.some(
        (observation) => observation.element === ('土' as never),
      ),
    ).toBe(false);
    expect(
      GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_OBSERVATION_AUTHORITY.earthDeShiSeasonResolved,
    ).toBe(false);
  });

  test('pins the exact upstream Wang-Shuai/Qiang-Ruo semantic-axis authority identity', () => {
    const authority = GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_OBSERVATION_AUTHORITY;
    expect(authority.upstreamSemanticAxisVersion).toBe(
      GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_VERSION,
    );
    expect(authority.upstreamSemanticAxisDefinitionHash).toBe(
      GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_DEFINITION_HASH,
    );
    expect(GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_OBSERVATION_DEFINITION_HASH).toMatch(
      /^[0-9a-f]{64}$/,
    );
  });

  test('records canonical representability without authorizing a season resolver or chart matcher', () => {
    const authority = GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_OBSERVATION_AUTHORITY;
    expect(authority.canonicalFiveElementIdentityAvailable).toBe(true);
    expect(authority.canonicalMonthBranchAvailable).toBe(true);
    expect(authority.canonicalSeasonFactAvailable).toBe(false);
    expect(authority.canonicalSeasonResolverAuthorized).toBe(false);
    expect(authority.monthBranchToSeasonMappingAuthorized).toBe(false);
    expect(authority.solarTermToSeasonMappingAuthorized).toBe(false);
    expect(authority.chartLevelDeShiMatcherAuthorized).toBe(false);
    expect(authority.chartFactsConsumed).toBe(false);
    expect('resolveSeason' in deShiSeasonModule).toBe(false);
    expect('resolveDeShi' in deShiSeasonModule).toBe(false);
    expect('matchDeShi' in deShiSeasonModule).toBe(false);
  });

  test('keeps final 旺衰, ordinary 強弱, and strength scalars fail-closed', () => {
    const authority = GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_OBSERVATION_AUTHORITY;
    expect(authority.deShiToFinalWangVerdictAuthorized).toBe(false);
    expect(authority.chartLevelWangShuaiClassifierAuthorized).toBe(false);
    expect(authority.ordinaryStrengthClassificationAuthorized).toBe(false);
    expect(authority.numericStrengthAuthorized).toBe(false);
    expect(authority.nonNumericStrengthScalarAuthorized).toBe(false);
  });

  test('keeps Gyeokguk and production escalation closed', () => {
    const authority = GENERAL_NATAL_FOUR_ELEMENT_DE_SHI_SEASON_OBSERVATION_AUTHORITY;
    expect(authority.candidateDerivationAuthorized).toBe(false);
    expect(authority.establishmentPredicateAuthorized).toBe(false);
    expect(authority.candidateFactsEmitted).toBe(false);
    expect(authority.establishmentFactsEmitted).toBe(false);
    expect(authority.productionFactEmissionAuthorized).toBe(false);
  });
});
