import { describe, expect, it } from 'vitest';
import {
  R086_ADVERSARIAL_PAIR_VERSION,
  R086_AUTHORITY,
  R086_PAIRS,
} from '../src/research/general-natal-adversarial-near-identical-pairs.js';

describe('R086 adversarial near-identical chart-state pairs', () => {
  it('defines eight single-mutation A/B fixtures', () => {
    expect(R086_ADVERSARIAL_PAIR_VERSION).toBe('0.2.0-research');
    expect(R086_PAIRS).toHaveLength(8);
    expect(R086_PAIRS.every((x)=>x.mutationDimensionCount === 1)).toBe(true);
    expect(R086_PAIRS.every((x)=>x.unchangedClaims.length > 0 && x.evidenceRefs.length > 0)).toBe(true);
    expect(R086_PAIRS.map((x)=>x.id)).toEqual(['P01','P02','P03','P04','P05','P06','P07','P08']);
  });

  it('keeps every fixture non-executable and outcome-free', () => {
    expect(R086_PAIRS.every(
      (x)=>x.realWorldOutcomeLabel === null && x.numericScore === null && x.executable === false,
    )).toBe(true);
  });

  it('includes structural, temporal, and provenance mutation dimensions', () => {
    expect(R086_PAIRS).toEqual(expect.arrayContaining([
      expect.objectContaining({ mutation:'VIABLE_FUYI_PREDICATE_FALSE_TO_TRUE', invariant:'FOLLOW_PATTERN_EVALUATION_CONTEXT' }),
      expect.objectContaining({ mutation:'TEMPORAL_ACTIVATION_PREDICATE_LATENT_TO_TRANSPARENT' }),
      expect.objectContaining({ mutation:'INDEPENDENT_CALCULATION_EVIDENCE_ABSENT_TO_PRESENT', b:'INDEPENDENTLY_CORROBORATED_CALCULATION_STATE' }),
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
