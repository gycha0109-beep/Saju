import { describe, expect, it } from 'vitest';
import {
  R086_ADVERSARIAL_PAIR_VERSION,
  R086_AUTHORITY,
  R086_PAIRS,
} from '../src/research/general-natal-adversarial-near-identical-pairs.js';

describe('R086 adversarial near-identical chart-state pairs', () => {
  it('defines eight single-mutation A/B fixtures', () => {
    expect(R086_ADVERSARIAL_PAIR_VERSION).toBe('0.1.0-research');
    expect(R086_PAIRS).toHaveLength(8);
    expect(R086_PAIRS.map((x)=>x.id)).toEqual(['P01','P02','P03','P04','P05','P06','P07','P08']);
  });

  it('keeps every fixture non-executable and outcome-free', () => {
    expect(R086_PAIRS.every(
      (x)=>x.realWorldOutcomeLabel === null && x.numericScore === null && x.executable === false,
    )).toBe(true);
  });

  it('includes structural, temporal, and provenance mutation dimensions', () => {
    expect(R086_PAIRS).toEqual(expect.arrayContaining([
      expect.objectContaining({ mutation:'NO_FUYI_TO_VIABLE_FUYI' }),
      expect.objectContaining({ mutation:'LATENT_TO_LUCK_TRANSPARENT' }),
      expect.objectContaining({ mutation:'INCOMPLETE_TO_COMPLETE_CALCULATION_PROVENANCE' }),
    ]));
  });

  it('keeps the frontier research-only', () => {
    expect(R086_AUTHORITY).toEqual({
      status:'VERIFIED_SINGLE_PREDICATE_ADVERSARIAL_FIXTURES',
      pairCount:8,
      realWorldOutcomeLabelsAuthorized:false,
      executableReplayAuthorized:false,
      productionAuthorityPromoted:false,
    });
  });
});
