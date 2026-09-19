import { describe, expect, it } from 'vitest';
import {
  R013_ADVERSARIAL_STATE_MATRIX,
  R013_AUTHORITY,
  R013_RELATION_DEFINITIONS,
  R013_TOUGAN_TONGGEN_VERSION,
} from '../src/research/general-natal-tougan-tonggen-independence.js';

describe('R013 Tougan vs Tonggen workbench', () => {
  it('models the relations as opposite directional predicates', () => {
    expect(R013_TOUGAN_TONGGEN_VERSION).toBe('0.1.0-research');
    expect(R013_RELATION_DEFINITIONS).toEqual([
      expect.objectContaining({
        relation: 'TOUGAN',
        direction: 'BRANCH_HIDDEN_STEM_TO_HEAVENLY_STEM',
      }),
      expect.objectContaining({
        relation: 'TONGGEN',
        direction: 'HEAVENLY_STEM_TO_BRANCH_ROOT',
      }),
    ]);
  });

  it('preserves all four logical states until canonical representability is verified', () => {
    expect(R013_ADVERSARIAL_STATE_MATRIX.map((row) => row.state)).toEqual([
      'TOUGAN_ONLY',
      'TONGGEN_ONLY',
      'BOTH',
      'NEITHER',
    ]);
    expect(R013_ADVERSARIAL_STATE_MATRIX.every((row) => row.canonicalRepresentability === 'OPEN')).toBe(true);
  });

  it('does not collapse the pair into strength, Gyeokguk, or Production authority', () => {
    expect(R013_AUTHORITY).toEqual(
      expect.objectContaining({
        status: 'research',
        touganEqualsTonggen: false,
        directionalIndependenceSupported: true,
        complementaryInteractionSupported: true,
        canonicalFourStateRepresentabilityVerified: false,
        universalDownstreamRequirementAuthorized: false,
        numericStrengthAuthorized: false,
        gyeokgukAuthorityPromoted: false,
        productionAuthorityPromoted: false,
      }),
    );
  });
});
