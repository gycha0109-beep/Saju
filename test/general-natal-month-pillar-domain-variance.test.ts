import { describe, expect, it } from 'vitest';
import {
  R062_AUTHORITY,
  R062_EXECUTION_GAPS,
  R062_MONTH_DOMAIN_CLAIMS,
  R062_MONTH_PILLAR_DOMAIN_VERSION,
  R062_REJECTED_EXTENSIONS,
} from '../src/research/general-natal-month-pillar-domain-variance.js';

describe('R062 Month-pillar domain source variance', () => {
  it('preserves multiple direct source-bounded Month domains', () => {
    expect(R062_MONTH_PILLAR_DOMAIN_VERSION).toBe('0.1.0-research');
    expect(R062_MONTH_DOMAIN_CLAIMS).toHaveLength(5);
    expect(R062_MONTH_DOMAIN_CLAIMS).toEqual(expect.arrayContaining([
      expect.objectContaining({ domains: ['PARENTS', 'SIBLINGS', 'HOUSEHOLD_GATEWAY'] }),
      expect.objectContaining({ domains: ['SIBLINGS'] }),
      expect.objectContaining({ domains: ['OFFICIAL_PEERS'], roleScope: 'OFFICIAL' }),
      expect.objectContaining({
        domains: ['SIBLINGS'],
        roleScope: 'BOUNDED_EXAMPLE',
        sourceSurface: '以月為兄弟如火命生酉戌亥子月言兄弟不得力之斷',
      }),
      expect.objectContaining({ domains: ['PARENTS', 'PARENTAL_PROTECTION'] }),
    ]));
    expect(R062_MONTH_DOMAIN_CLAIMS.every((x) => x.executable === false)).toBe(true);
  });

  it('does not collapse the Month pillar to one universal label', () => {
    expect(R062_AUTHORITY.universalSingleMonthDomainAuthorized).toBe(false);
  });

  it('rejects unsourced modern career/social extensions', () => {
    expect(R062_REJECTED_EXTENSIONS).toContain('MONTH_EQUALS_CAREER');
    expect(R062_REJECTED_EXTENSIONS).toContain('MONTH_EQUALS_SOCIETY');
    expect(R062_REJECTED_EXTENSIONS).toContain('MONTH_EQUALS_WORKPLACE');
  });

  it('keeps reconciliation and event semantics unresolved', () => {
    expect(R062_EXECUTION_GAPS).toContain('SOURCE_STRATUM_SELECTION');
    expect(R062_EXECUTION_GAPS).toContain('MULTI_DOMAIN_RECONCILIATION');
    expect(R062_EXECUTION_GAPS).toContain('DOMAIN_TO_EVENT_SEMANTICS');
  });

  it('keeps the frontier research-only', () => {
    expect(R062_AUTHORITY).toEqual({
      status: 'VERIFIED_SOURCE_STRATUM_VARIANCE',
      directClaimCount: 5,
      universalSingleMonthDomainAuthorized: false,
      modernCareerSocialExtensionsAuthorized: false,
      deterministicEventSemanticsAuthorized: false,
      executableResolverAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
