import { describe, expect, it } from 'vitest';
import {
  R061_AUTHORITY,
  R061_EXECUTION_GAPS,
  R061_REJECTED_EXTENSIONS,
  R061_YEAR_DOMAIN_CLAIMS,
  R061_YEAR_PILLAR_DOMAIN_VERSION,
} from '../src/research/general-natal-year-pillar-domain-variance.js';

describe('R061 Year-pillar domain source variance', () => {
  it('preserves the three direct source-bounded Year domains', () => {
    expect(R061_YEAR_PILLAR_DOMAIN_VERSION).toBe('0.1.0-research');
    expect(R061_YEAR_DOMAIN_CLAIMS).toEqual([
      expect.objectContaining({
        domain: 'ANCESTRAL_ESTATE',
        sourceSurface: '以年為祖業',
      }),
      expect.objectContaining({
        domain: 'ANCESTRAL_LINEAGE',
        sourceSurface: '四柱以年為祖上則知世代宗派盛衰之理',
      }),
      expect.objectContaining({
        domain: 'FATHER',
        sexScope: 'MALE_CHART',
        sourceSurface: '男命以年為父',
      }),
    ]);
    expect(R061_YEAR_DOMAIN_CLAIMS.every((x) => x.executable === false)).toBe(true);
  });

  it('does not collapse source-stratum claims into one universal label', () => {
    expect(new Set(R061_YEAR_DOMAIN_CLAIMS.map((x) => x.domain)).size).toBe(3);
    expect(R061_AUTHORITY.universalSingleYearDomainAuthorized).toBe(false);
  });

  it('rejects unsourced modern extensions and deterministic event semantics', () => {
    expect(R061_REJECTED_EXTENSIONS).toContain('YEAR_EQUALS_CHILDHOOD');
    expect(R061_REJECTED_EXTENSIONS).toContain('YEAR_EQUALS_PUBLIC_IMAGE');
    expect(R061_REJECTED_EXTENSIONS).toContain('DOMAIN_ASSOCIATION_IMPLIES_EVENT_PREDICTION');
  });

  it('keeps reconciliation and event semantics unresolved', () => {
    expect(R061_EXECUTION_GAPS).toContain('SOURCE_STRATUM_SELECTION');
    expect(R061_EXECUTION_GAPS).toContain('MULTI_DOMAIN_RECONCILIATION');
    expect(R061_EXECUTION_GAPS).toContain('DOMAIN_TO_EVENT_SEMANTICS');
  });

  it('keeps the frontier research-only', () => {
    expect(R061_AUTHORITY).toEqual({
      status: 'VERIFIED_SOURCE_STRATUM_VARIANCE',
      directClaimCount: 3,
      universalSingleYearDomainAuthorized: false,
      modernPsychologicalExtensionsAuthorized: false,
      deterministicEventSemanticsAuthorized: false,
      executableResolverAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
