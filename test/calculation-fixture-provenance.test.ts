import { describe, expect, test } from 'vitest';
import {
  CALCULATION_FIXTURE_SOURCES,
  IANA_1955_STANDARD_TIME_FIXTURE,
  IANA_1988_DST_FIXTURE,
  KASI_2024_LICHUN_FIXTURE,
  KASI_2024_LUNAR_NEW_YEAR_FIXTURE,
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

describe('calculation fixture provenance', () => {
  test('every checked fixture resolves all source references', () => {
    for (const fixture of [
      KASI_2024_LUNAR_NEW_YEAR_FIXTURE,
      KASI_2024_LICHUN_FIXTURE,
      IANA_1955_STANDARD_TIME_FIXTURE,
      IANA_1988_DST_FIXTURE,
      UPSTREAM_1992_GOLDEN_FIXTURE,
    ]) {
      assertResolvable(fixture.provenance);
    }
  });

  test('official KASI lunar fixture is backed by an independent Tier A announcement', () => {
    const source = sourcesById.get(KASI_2024_LUNAR_NEW_YEAR_FIXTURE.provenance.sourceIds[0]);
    expect(source?.sourceTier).toBe('A');
    expect(source?.authorityClass).toBe('official_announcement');
    expect(source?.independentFromManseryeok).toBe(true);
    expect(KASI_2024_LUNAR_NEW_YEAR_FIXTURE.provenance.reviewStatus).toBe('verified');
  });

  test('KASI calendar-data Lichun fixture remains provisional until official almanac text is parsed', () => {
    const source = sourcesById.get(KASI_2024_LICHUN_FIXTURE.provenance.sourceIds[0]);
    expect(source?.sourceTier).toBe('B');
    expect(source?.authorityClass).toBe('primary_institution_reference');
    expect(KASI_2024_LICHUN_FIXTURE.provenance.reviewStatus).toBe('provisional');
  });

  test('IANA historical-time fixtures are primary software references, not upstream regressions', () => {
    for (const fixture of [IANA_1955_STANDARD_TIME_FIXTURE, IANA_1988_DST_FIXTURE]) {
      const source = sourcesById.get(fixture.provenance.sourceIds[0]);
      expect(source?.sourceTier).toBe('A');
      expect(source?.authorityClass).toBe('primary_software_reference');
      expect(source?.independentFromManseryeok).toBe(true);
    }
  });

  test('upstream golden data can never masquerade as Tier A authority', () => {
    const source = sourcesById.get(UPSTREAM_1992_GOLDEN_FIXTURE.provenance.sourceIds[0]);
    expect(source?.sourceTier).toBe('D');
    expect(source?.authorityClass).toBe('upstream_regression');
    expect(source?.independentFromManseryeok).toBe(false);
    expect(UPSTREAM_1992_GOLDEN_FIXTURE.provenance.reviewStatus).toBe('upstream-only');
  });
});
