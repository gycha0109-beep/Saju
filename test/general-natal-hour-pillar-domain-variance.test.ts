import { describe, expect, it } from 'vitest';
import {
  R064_AUTHORITY,
  R064_EXECUTION_GAPS,
  R064_HOUR_DOMAIN_CLAIMS,
  R064_HOUR_PILLAR_DOMAIN_VERSION,
  R064_REJECTED_EXTENSIONS,
} from '../src/research/general-natal-hour-pillar-domain-variance.js';

describe('R064 Hour-pillar domain source variance', () => {
  it('preserves multiple direct source-bounded Hour domains', () => {
    expect(R064_HOUR_PILLAR_DOMAIN_VERSION).toBe('0.1.0-research');
    expect(R064_HOUR_DOMAIN_CLAIMS).toHaveLength(5);
    expect(R064_HOUR_DOMAIN_CLAIMS).toEqual(expect.arrayContaining([
      expect.objectContaining({ domains: ['OFFSPRING'] }),
      expect.objectContaining({ domains: ['DESCENDANTS'] }),
      expect.objectContaining({ domains: ['OFFICIAL_SEAT_FORTUNE'], roleScope: 'OFFICIAL' }),
      expect.objectContaining({
        domains: ['OFFSPRING'],
        roleScope: 'BOUNDED_EXAMPLE',
        sourceSurface: '或時為子臨死絕傷煞之鄉言少子之斷',
      }),
      expect.objectContaining({ domains: ['STATUS_CONDITION_FIELD'] }),
    ]));
    expect(R064_HOUR_DOMAIN_CLAIMS.every((x) => x.executable === false)).toBe(true);
  });

  it('does not collapse the Hour pillar to one universal label', () => {
    expect(R064_AUTHORITY.universalSingleHourDomainAuthorized).toBe(false);
  });

  it('rejects unsourced modern future/legacy extensions', () => {
    expect(R064_REJECTED_EXTENSIONS).toContain('HOUR_EQUALS_OLD_AGE');
    expect(R064_REJECTED_EXTENSIONS).toContain('HOUR_EQUALS_LEGACY');
    expect(R064_REJECTED_EXTENSIONS).toContain('HOUR_EQUALS_FUTURE_SELF');
  });

  it('keeps reconciliation and event semantics unresolved', () => {
    expect(R064_EXECUTION_GAPS).toContain('SOURCE_STRATUM_SELECTION');
    expect(R064_EXECUTION_GAPS).toContain('MULTI_DOMAIN_RECONCILIATION');
    expect(R064_EXECUTION_GAPS).toContain('DOMAIN_TO_EVENT_SEMANTICS');
  });

  it('keeps the frontier research-only', () => {
    expect(R064_AUTHORITY).toEqual({
      status: 'VERIFIED_SOURCE_STRATUM_VARIANCE',
      directClaimCount: 5,
      universalSingleHourDomainAuthorized: false,
      modernFutureLegacyExtensionsAuthorized: false,
      deterministicEventSemanticsAuthorized: false,
      executableResolverAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
