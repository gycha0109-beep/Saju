import { describe, expect, it } from 'vitest';
import {
  R075_AUTHORITY,
  R075_DIRECT_BOUNDARY,
  R075_EXECUTION_GAPS,
  R075_MONTHLY_LUCK_BOUNDARY_VERSION,
  R075_REJECTED_SHORTCUTS,
  R075_REQUIRED_CONTEXT_LAYERS,
} from '../src/research/general-natal-monthly-luck-boundary.js';

describe('R075 monthly-luck interpretation boundary', () => {
  it('requires the higher temporal layers before monthly interpretation', () => {
    expect(R075_MONTHLY_LUCK_BOUNDARY_VERSION).toBe('0.1.0-research');
    expect(R075_REQUIRED_CONTEXT_LAYERS).toEqual([
      'NATAL_CONTEXT',
      'DAYUN_CONTEXT',
      'ANNUAL_CONTEXT',
      'MONTHLY_STEM_BRANCH',
      'CROSS_LAYER_INTERACTIONS',
    ]);
  });

  it('preserves monthly luck as a lower temporal layer only', () => {
    expect(R075_DIRECT_BOUNDARY).toEqual({
      sourceSurface: '至本年每月之吉凶，倣此推究',
      monthlyIsLowerTemporalLayer: true,
      monthlyStandaloneOracleAuthorized: false,
      monthlyPermanentNatalMutationAuthorized: false,
      executable: false,
    });
  });

  it('rejects standalone monthly event shortcuts', () => {
    expect(R075_REJECTED_SHORTCUTS).toContain('MONTH_PILLAR_ALONE_IMPLIES_EVENT');
    expect(R075_REJECTED_SHORTCUTS).toContain('MONTH_OVERRIDES_NATAL_DAYUN_YEAR');
    expect(R075_REJECTED_SHORTCUTS).toContain('MONTHLY_RESULT_FROM_ZODIAC_RELATION_ONLY');
  });

  it('keeps cross-layer precedence, event bridge, and calendar policy unresolved', () => {
    expect(R075_EXECUTION_GAPS).toContain('CROSS_LAYER_PRECEDENCE');
    expect(R075_EXECUTION_GAPS).toContain('EVENT_BRIDGE');
    expect(R075_EXECUTION_GAPS).toContain('MONTH_BOUNDARY_CALENDAR_POLICY');
  });

  it('keeps the frontier research-only', () => {
    expect(R075_AUTHORITY).toEqual({
      status: 'VERIFIED_LOWER_TEMPORAL_LAYER_BOUNDARY',
      requiredContextLayerCount: 5,
      standaloneMonthlyOracleAuthorized: false,
      deterministicMonthlyEventAuthorized: false,
      executableMonthlyResolverAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
