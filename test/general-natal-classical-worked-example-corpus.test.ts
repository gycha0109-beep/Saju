import { describe, expect, it } from 'vitest';
import {
  R081_AUTHORITY,
  R081_CLASSICAL_WORKED_EXAMPLE_CORPUS_VERSION,
  R081_EXAMPLES,
  R081_PRIMARY_SOURCE,
  R081_REJECTED_SHORTCUTS,
} from '../src/research/general-natal-classical-worked-example-corpus.js';

describe('R081 source-bounded classical worked-example corpus', () => {
  it('pins source identity and six bounded examples', () => {
    expect(R081_CLASSICAL_WORKED_EXAMPLE_CORPUS_VERSION).toBe('0.1.0-research');
    expect(R081_PRIMARY_SOURCE.authorityUse).toBe('SOURCE_LOCAL_INTERPRETATION_ONLY');
    expect(R081_EXAMPLES).toHaveLength(6);
  });

  it('separates named commentary examples from schematic examples', () => {
    expect(R081_EXAMPLES.filter((x) => x.kind === 'NAMED_COMMENTARY_EXAMPLE')).toHaveLength(4);
    expect(R081_EXAMPLES.filter((x) => x.kind === 'SCHEMATIC_WORKED_EXAMPLE')).toHaveLength(2);
  });

  it('never treats source examples as independent history or engine ground truth', () => {
    expect(R081_EXAMPLES.every(
      (x) => x.independentlyHistoricallyVerified === false
        && x.engineGroundTruth === false
        && x.executable === false,
    )).toBe(true);
  });

  it('rejects universal-rule and Production promotion shortcuts', () => {
    expect(R081_REJECTED_SHORTCUTS).toContain('SOURCE_EXAMPLE_EQUALS_ENGINE_GROUND_TRUTH');
    expect(R081_REJECTED_SHORTCUTS).toContain('SINGLE_EXAMPLE_PROVES_UNIVERSAL_RULE');
    expect(R081_REJECTED_SHORTCUTS).toContain('SOURCE_ROW_AUTO_PROMOTES_PRODUCTION_AUTHORITY');
  });

  it('keeps the corpus research-only', () => {
    expect(R081_AUTHORITY).toEqual({
      status: 'VERIFIED_SOURCE_BOUNDED_WORKED_EXAMPLE_CORPUS',
      exampleCount: 6,
      namedExampleCount: 4,
      schematicExampleCount: 2,
      engineGroundTruthAuthorized: false,
      historicalOutcomeAuthorityAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
