import { describe, expect, test } from 'vitest';
import {
  CALCULATION_FIXTURE_SOURCES,
  IANA_1955_STANDARD_TIME_FIXTURE,
  IANA_1988_DST_FIXTURE,
  KASI_2024_LICHUN_FIXTURE,
  KASI_OFFICIAL_LUNAR_FIXTURES,
  UPSTREAM_1992_GOLDEN_FIXTURE,
  type FixtureProvenance,
  type FixtureSource,
} from './fixtures/calculation-fixtures.js';

const sourcesById = new Map<string, FixtureSource>(
  Object.values(CALCULATION_FIXTURE_SOURCES).map((source) => [source.sourceId, source]),
);

function assertResolvable(provenance: FixtureProvenance): void {
  for (const sourceId of provenance.sourceIds) {
    expect(sourcesById.has(sourceId), `missing source ${sourceId}`).toBe(true);
  }
}

function firstSourceId(provenance: FixtureProvenance): string {
  const sourceId = provenance.sourceIds[0];
  if (sourceId === undefined) {
    throw new Error('fixture provenance requires at least one source');
  }
  return sourceId;
}

describe('calculation fixture provenance', () => {
  test('every checked fixture resolves all source references', () => {
    for (const fixture of [
      ...KASI_OFFICIAL_LUNAR_FIXTURES,
      KASI_2024_LICHUN_FIXTURE,
      IANA_1955_STANDARD_TIME_FIXTURE,
      IANA_1988_DST_FIXTURE,
      UPSTREAM_1992_GOLDEN_FIXTURE,
    ]) {
      assertResolvable(fixture.provenance);
    }
  });

  test('all official KASI lunar fixtures are independent verified Tier A announcements', () => {
    expect(KASI_OFFICIAL_LUNAR_FIXTURES).toHaveLength(12);
    for (const fixture of KASI_OFFICIAL_LUNAR_FIXTURES) {
      const source = sourcesById.get(firstSourceId(fixture.provenance));
      expect(source?.sourceTier).toBe('A');
      expect(source?.authorityClass).toBe('official_announcement');
      expect(source?.independentFromManseryeok).toBe(true);
      expect(fixture.provenance.reviewStatus).toBe('verified');
    }
  });

  test('official lunar corpus spans six consecutive almanac years and two lunar anchors per year', () => {
    const years = new Set(KASI_OFFICIAL_LUNAR_FIXTURES.map((fixture) => fixture.input.date.year));
    expect([...years].sort()).toEqual([2021, 2022, 2023, 2024, 2025, 2026]);

    for (const year of years) {
      const yearFixtures = KASI_OFFICIAL_LUNAR_FIXTURES.filter(
        (fixture) => fixture.input.date.year === year,
      );
      expect(yearFixtures).toHaveLength(2);
      expect(
        yearFixtures
          .map((fixture) => `${fixture.input.date.month}-${fixture.input.date.day}`)
          .sort(),
      ).toEqual(['1-1', '8-15']);
    }
  });

  test('KASI calendar-data Lichun fixture remains provisional until official almanac text is parsed', () => {
    const source = sourcesById.get(firstSourceId(KASI_2024_LICHUN_FIXTURE.provenance));
    expect(source?.sourceTier).toBe('B');
    expect(source?.authorityClass).toBe('primary_institution_reference');
    expect(KASI_2024_LICHUN_FIXTURE.provenance.reviewStatus).toBe('provisional');
  });

  test('IANA historical-time fixtures are primary software references, not upstream regressions', () => {
    for (const fixture of [IANA_1955_STANDARD_TIME_FIXTURE, IANA_1988_DST_FIXTURE]) {
      const source = sourcesById.get(firstSourceId(fixture.provenance));
      expect(source?.sourceTier).toBe('A');
      expect(source?.authorityClass).toBe('primary_software_reference');
      expect(source?.independentFromManseryeok).toBe(true);
    }
  });

  test('upstream golden data can never masquerade as Tier A authority', () => {
    const source = sourcesById.get(firstSourceId(UPSTREAM_1992_GOLDEN_FIXTURE.provenance));
    expect(source?.sourceTier).toBe('D');
    expect(source?.authorityClass).toBe('upstream_regression');
    expect(source?.independentFromManseryeok).toBe(false);
    expect(UPSTREAM_1992_GOLDEN_FIXTURE.provenance.reviewStatus).toBe('upstream-only');
  });
});
