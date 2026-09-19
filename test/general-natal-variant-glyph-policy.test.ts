import { describe, expect, it } from 'vitest';
import {
  R092_AUTHORITY,
  R092_REJECTED_SHORTCUTS,
  R092_SEARCH_ALIAS_GROUPS,
  R092_TEXT_LAYERS,
  R092_VARIANT_GLYPH_POLICY_VERSION,
} from '../src/research/general-natal-variant-glyph-policy.js';

describe('R092 conservative variant-glyph policy', () => {
  it('separates original text, search aliases, display normalization, and semantics', () => {
    expect(R092_VARIANT_GLYPH_POLICY_VERSION).toBe('0.1.0-research');
    expect(R092_TEXT_LAYERS).toEqual([
      'ORIGINAL_GLYPH','SEARCH_ALIAS','CANONICAL_DISPLAY','SEMANTIC_EQUIVALENCE',
    ]);
  });

  it('defines eleven curated search-only alias groups', () => {
    expect(R092_SEARCH_ALIAS_GROUPS).toHaveLength(11);
    expect(R092_SEARCH_ALIAS_GROUPS.every((x)=>x.use === 'SEARCH_ONLY')).toBe(true);
    expect(R092_SEARCH_ALIAS_GROUPS).toEqual(expect.arrayContaining([
      expect.objectContaining({ members:['殺','煞'] }),
      expect.objectContaining({ members:['祿','禄'] }),
      expect.objectContaining({ members:['沖','冲'] }),
    ]));
  });

  it('never rewrites source witnesses or derives semantics from aliases', () => {
    expect(R092_REJECTED_SHORTCUTS).toContain('REWRITE_SOURCE_WITNESS_TO_CANONICAL_GLYPHS');
    expect(R092_REJECTED_SHORTCUTS).toContain('ALIAS_MEMBERSHIP_IMPLIES_SEMANTIC_EQUIVALENCE');
  });

  it('keeps evidence and Production authority unpromoted', () => {
    expect(R092_AUTHORITY).toEqual({
      status:'CURATED_SEARCH_ALIAS_POLICY_ONLY',
      aliasGroupCount:11,
      sourceWitnessMutationAuthorized:false,
      semanticEquivalenceFromAliasAuthorized:false,
      normalizedWitnessChecksumAuthorized:false,
      productionAuthorityPromoted:false,
    });
  });
});
