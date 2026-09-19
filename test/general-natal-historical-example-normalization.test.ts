import { describe, expect, it } from 'vitest';
import {
  R082_AUTHORITY,
  R082_HISTORICAL_EXAMPLE_NORMALIZATION_VERSION,
  R082_NORMALIZED_EXAMPLES,
  R082_PROVENANCE_MODES,
  R082_REJECTED_SHORTCUTS,
  R082_REQUIRED_CALCULATION_POLICY_FIELDS,
} from '../src/research/general-natal-historical-example-normalization.js';

describe('R082 historical/example calculation normalization', () => {
  it('pins four distinct provenance modes', () => {
    expect(R082_HISTORICAL_EXAMPLE_NORMALIZATION_VERSION).toBe('0.1.0-research');
    expect(R082_PROVENANCE_MODES).toEqual([
      'SOURCE_PROVIDED_CHART',
      'INDEPENDENT_BIRTH_DATA',
      'PARTIAL_BIRTH_DATA',
      'SCHEMATIC_INPUT',
    ]);
  });

  it('normalizes eight examples without claiming independent recalculation', () => {
    expect(R082_NORMALIZED_EXAMPLES).toHaveLength(8);
    expect(R082_NORMALIZED_EXAMPLES.every((x) => x.independentRecalculationAuthorized === false)).toBe(true);
  });

  it('requires explicit calendar/time/place/boundary provenance', () => {
    expect(R082_REQUIRED_CALCULATION_POLICY_FIELDS).toContain('TIMEZONE_AUTHORITY');
    expect(R082_REQUIRED_CALCULATION_POLICY_FIELDS).toContain('DAY_BOUNDARY_POLICY');
    expect(R082_REQUIRED_CALCULATION_POLICY_FIELDS).toContain('SOLAR_TERM_BOUNDARY_POLICY');
    expect(R082_REQUIRED_CALCULATION_POLICY_FIELDS).toContain('EPHEMERIS_CALCULATOR_VERSION');
  });

  it('rejects silent historical-input imputation and source-chart correction', () => {
    expect(R082_REJECTED_SHORTCUTS).toContain('INVENT_MISSING_BIRTH_HOUR');
    expect(R082_REJECTED_SHORTCUTS).toContain('SILENT_TRUE_SOLAR_TIME_CORRECTION');
    expect(R082_REJECTED_SHORTCUTS).toContain('MODIFY_SOURCE_CHART_TO_MATCH_CALCULATOR');
  });

  it('keeps calculation authority unpromoted', () => {
    expect(R082_AUTHORITY).toEqual({
      status: 'VERIFIED_INPUT_PROVENANCE_NORMALIZATION_ONLY',
      normalizedExampleCount: 8,
      independentRecalculatedExampleCount: 0,
      silentInputImputationAuthorized: false,
      productionCalculationAuthorityPromoted: false,
    });
  });
});
