import { describe, expect, it } from 'vitest';
import {
  R063_AUTHORITY,
  R063_DAY_SELF_SPOUSE_DOMAIN_VERSION,
  R063_DIRECT_CLAIMS,
  R063_EXECUTION_GAPS,
  R063_NARROWER_CLAIM_BOUNDARY,
  R063_REJECTED_SHORTCUTS,
} from '../src/research/general-natal-day-self-spouse-domain.js';

describe('R063 Day self/spouse domain boundary', () => {
  it('preserves direct Day self/spouse source claims', () => {
    expect(R063_DAY_SELF_SPOUSE_DOMAIN_VERSION).toBe('0.1.0-research');
    expect(R063_DIRECT_CLAIMS).toHaveLength(3);
    expect(R063_DIRECT_CLAIMS).toEqual(expect.arrayContaining([
      expect.objectContaining({ sourceSurface: '日為妻妾己身', domains: ['SELF', 'SPOUSE'] }),
      expect.objectContaining({ sourceSurface: '日為己身妻妾', domains: ['SELF', 'SPOUSE'] }),
      expect.objectContaining({ sourceSurface: '以日為己身', domains: ['SELF'] }),
    ]));
    expect(R063_DIRECT_CLAIMS.every((x) => x.branchSpecific === false && x.executable === false)).toBe(true);
  });

  it('does not infer a universal day-branch spouse-palace primitive', () => {
    expect(R063_NARROWER_CLAIM_BOUNDARY).toEqual({
      dayPillarSelfDomainDirectlySupported: true,
      dayPillarSpouseDomainDirectlySupported: true,
      dayBranchSpousePalaceDirectlyEstablishedBySelectedPassages: false,
      deterministicSpouseOutcomeAuthorized: false,
      deterministicMarriageEventAuthorized: false,
    });
  });

  it('rejects deterministic and unsourced narrower shortcuts', () => {
    expect(R063_REJECTED_SHORTCUTS).toContain('DAY_BRANCH_EQUALS_SPOUSE_PALACE_WITHOUT_DIRECT_SOURCE');
    expect(R063_REJECTED_SHORTCUTS).toContain('DAY_INTERACTION_IMPLIES_MARRIAGE_EVENT');
  });

  it('keeps branch-specific ontology and event semantics unresolved', () => {
    expect(R063_EXECUTION_GAPS).toContain('SPOUSE_PALACE_DIRECT_SOURCE');
    expect(R063_EXECUTION_GAPS).toContain('DAY_STEM_VS_DAY_BRANCH_DOMAIN_SPLIT');
    expect(R063_EXECUTION_GAPS).toContain('DOMAIN_TO_EVENT_SEMANTICS');
  });

  it('keeps the frontier research-only', () => {
    expect(R063_AUTHORITY).toEqual({
      status: 'VERIFIED_DAY_SELF_SPOUSE_SURFACE_ONLY',
      directClaimCount: 3,
      universalDayBranchSpousePalaceAuthorized: false,
      deterministicRelationshipSemanticsAuthorized: false,
      executableResolverAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
