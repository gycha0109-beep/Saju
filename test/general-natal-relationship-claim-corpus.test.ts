import { describe, expect, it } from 'vitest';
import {
  R068_AUTHORITY,
  R068_DIRECT_CLAIMS,
  R068_EXECUTION_GAPS,
  R068_REJECTED_ROMANCE_MAPPINGS,
  R068_RELATIONSHIP_CLAIM_CORPUS_VERSION,
} from '../src/research/general-natal-relationship-claim-corpus.js';

describe('R068 relationship/social-bond claim corpus', () => {
  it('preserves social, kin/friend, and contextual combination claims separately', () => {
    expect(R068_RELATIONSHIP_CLAIM_CORPUS_VERSION).toBe('0.1.0-research');
    expect(R068_DIRECT_CLAIMS).toEqual(expect.arrayContaining([
      expect.objectContaining({ domain: 'SOCIAL_FRIENDSHIP' }),
      expect.objectContaining({ domain: 'KIN_FRIEND' }),
      expect.objectContaining({ domain: 'SOCIAL_CHARACTER_CONTEXT' }),
    ]));
    expect(R068_DIRECT_CLAIMS.every(
      (x) => x.fixedPolarityAuthorized === false && x.executable === false,
    )).toBe(true);
  });

  it('rejects automatic romance compatibility mappings', () => {
    expect(R068_REJECTED_ROMANCE_MAPPINGS).toContain('LIUHE_EQUALS_SOULMATE');
    expect(R068_REJECTED_ROMANCE_MAPPINGS).toContain('LIUCHONG_EQUALS_BREAKUP');
    expect(R068_REJECTED_ROMANCE_MAPPINGS).toContain('ONE_RELATION_EQUALS_COMPATIBILITY_SCORE');
  });

  it('keeps domain selection and romance transfer unresolved', () => {
    expect(R068_EXECUTION_GAPS).toContain('RELATIONSHIP_DOMAIN_SELECTION');
    expect(R068_EXECUTION_GAPS).toContain('ROMANCE_TRANSFER_EVIDENCE');
    expect(R068_EXECUTION_GAPS).toContain('CONTEXT_EFFECT_SETTLEMENT');
  });

  it('keeps the frontier research-only', () => {
    expect(R068_AUTHORITY).toEqual({
      status: 'VERIFIED_SOCIAL_KIN_CLAIM_CORPUS_ONLY',
      directClaimCount: 3,
      romanceCompatibilityMappingAuthorized: false,
      universalRelationPolarityAuthorized: false,
      executableCompatibilityScorerAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
