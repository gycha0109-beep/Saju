import { describe, expect, it } from 'vitest';
import {
  R069_AUTHORITY,
  R069_DIRECT_CLAIMS,
  R069_EXECUTION_GAPS,
  R069_MODERN_TRANSLATION_BOUNDARY,
  R069_REJECTED_SHORTCUTS,
  R069_SPOUSE_CLAIM_CORPUS_VERSION,
} from '../src/research/general-natal-spouse-claim-corpus.js';

describe('R069 spouse interpretation claim corpus', () => {
  it('preserves historically gendered spouse claims with scope', () => {
    expect(R069_SPOUSE_CLAIM_CORPUS_VERSION).toBe('0.1.0-research');
    expect(R069_DIRECT_CLAIMS).toHaveLength(4);
    expect(R069_DIRECT_CLAIMS).toEqual(expect.arrayContaining([
      expect.objectContaining({ historicalSexScope: 'MALE_CHART', claimType: 'DAY_DOMAIN' }),
      expect.objectContaining({ historicalSexScope: 'MALE_CHART', claimType: 'SPOUSE_STAR_RELATION' }),
      expect.objectContaining({ historicalSexScope: 'FEMALE_CHART', claimType: 'SPOUSE_STAR_RELATION' }),
      expect.objectContaining({ historicalSexScope: 'MALE_CHART', claimType: 'CONFIGURATION_LEVEL' }),
    ]));
    expect(R069_DIRECT_CLAIMS.filter((x) => x.surfaceKind === 'DIRECT_QUOTE')).toHaveLength(3);
    expect(R069_DIRECT_CLAIMS.filter((x) => x.surfaceKind === 'PARAPHRASED_SOURCE_CLASS')).toHaveLength(1);
    expect(R069_DIRECT_CLAIMS.every((x) => x.executable === false)).toBe(true);
  });

  it('does not auto-convert historical rules into a universal modern partner ontology', () => {
    expect(R069_MODERN_TRANSLATION_BOUNDARY).toEqual({
      wealthEqualsSpouseUniversally: false,
      officerKillEqualsSpouseUniversally: false,
      historicalGenderRulesAutoConvertedToUniversalPartnerOntology: false,
      dayBranchSpousePalaceEstablishedBySelectedPassages: false,
      pairwiseCompatibilityAuthorized: false,
    });
  });

  it('rejects deterministic marriage and spouse-trait shortcuts', () => {
    expect(R069_REJECTED_SHORTCUTS).toContain('SPOUSE_STAR_PRESENT_GUARANTEES_MARRIAGE');
    expect(R069_REJECTED_SHORTCUTS).toContain('SPOUSE_STAR_ABSENT_IMPLIES_NO_MARRIAGE');
    expect(R069_REJECTED_SHORTCUTS).toContain('NATAL_SPOUSE_CLAIM_IMPLIES_PAIRWISE_COMPATIBILITY');
  });

  it('keeps translation, event semantics, and compatibility unresolved', () => {
    expect(R069_EXECUTION_GAPS).toContain('MODERN_PARTNER_TRANSLATION');
    expect(R069_EXECUTION_GAPS).toContain('MARRIAGE_EVENT_SEMANTICS');
    expect(R069_EXECUTION_GAPS).toContain('PAIRWISE_COMPATIBILITY_BRIDGE');
  });

  it('keeps the frontier research-only', () => {
    expect(R069_AUTHORITY).toEqual({
      status: 'VERIFIED_HISTORICALLY_GENDERED_SPOUSE_CORPUS_ONLY',
      directClaimCount: 4,
      universalModernPartnerOntologyAuthorized: false,
      deterministicMarriageSemanticsAuthorized: false,
      executableSpouseClassifierAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
