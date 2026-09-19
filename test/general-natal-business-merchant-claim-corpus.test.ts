import { describe, expect, it } from 'vitest';
import {
  R067_AUTHORITY,
  R067_BUSINESS_MERCHANT_CORPUS_VERSION,
  R067_COVERAGE,
  R067_DIRECT_CLAIMS,
  R067_EXECUTION_GAPS,
  R067_REJECTED_MAPPINGS,
} from '../src/research/general-natal-business-merchant-claim-corpus.js';

describe('R067 business / merchant claim corpus', () => {
  it('preserves the narrow direct merchant-context claims', () => {
    expect(R067_BUSINESS_MERCHANT_CORPUS_VERSION).toBe('0.1.0-research');
    expect(R067_DIRECT_CLAIMS).toEqual([
      expect.objectContaining({
        sourceSurface: '商賈多愛馳寶',
        claimClass: 'HISTORICAL_MERCHANT_CONTEXT',
      }),
      expect.objectContaining({
        sourceSurface: '馳寶則富',
        claimClass: 'HISTORICAL_WEALTH_OUTCOME_CLAIM',
      }),
    ]);
    expect(R067_DIRECT_CLAIMS.every(
      (x) => x.modernEntrepreneurshipEquivalentAuthorized === false && x.executable === false,
    )).toBe(true);
  });

  it('rejects unsourced modern entrepreneurship mappings', () => {
    expect(R067_REJECTED_MAPPINGS).toContain('PIANCAI_EQUALS_ENTREPRENEUR');
    expect(R067_REJECTED_MAPPINGS).toContain('YIMA_EQUALS_ENTREPRENEUR');
    expect(R067_REJECTED_MAPPINGS).toContain('TEN_GOD_PATTERN_EQUALS_STARTUP_SUITABILITY');
  });

  it('keeps historical merchant evidence distinct from modern entrepreneurship ontology', () => {
    expect(R067_COVERAGE).toEqual({
      directHistoricalMerchantClaim: true,
      generalWealthClaimsBusinessSpecific: false,
      modernEntrepreneurshipOntologyEstablished: false,
    });
  });

  it('keeps translation and business outcome unresolved', () => {
    expect(R067_EXECUTION_GAPS).toContain('HISTORICAL_TO_MODERN_BUSINESS_TRANSLATION');
    expect(R067_EXECUTION_GAPS).toContain('ENTREPRENEURSHIP_TRAIT_MODEL');
    expect(R067_EXECUTION_GAPS).toContain('BUSINESS_OUTCOME_SETTLEMENT');
  });

  it('keeps the frontier research-only', () => {
    expect(R067_AUTHORITY).toEqual({
      status: 'VERIFIED_NARROW_HISTORICAL_MERCHANT_CLAIM',
      directClaimCount: 2,
      modernEntrepreneurshipMappingAuthorized: false,
      startupSuitabilityScoringAuthorized: false,
      executableBusinessClassifierAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
