import { describe, expect, it } from 'vitest';
import {
  R092_AUTHORITY,
  R092_EVIDENCE_IDENTITY_RULES,
  R092_MATCHING_RULES,
  R092_REJECTED_SHORTCUTS,
  R092_SEARCH_ALIAS_GROUPS,
  R092_TEXT_LAYERS,
  R092_VARIANT_GLYPH_POLICY_VERSION,
} from '../src/research/general-natal-variant-glyph-policy.js';

describe('R092 conservative variant-glyph policy', () => {
  it('separates original text, search aliases, display normalization, and semantics', () => {
    expect(R092_VARIANT_GLYPH_POLICY_VERSION).toBe('0.2.0-research');
    expect(R092_TEXT_LAYERS).toEqual([
      'ORIGINAL_GLYPH',
      'SEARCH_ALIAS',
      'CANONICAL_DISPLAY',
      'SEMANTIC_EQUIVALENCE',
    ]);
  });

  it('defines eleven curated search-only symmetric alias groups', () => {
    expect(R092_SEARCH_ALIAS_GROUPS).toHaveLength(11);
    expect(
      R092_SEARCH_ALIAS_GROUPS.every(
        (x) =>
          x.use === 'SEARCH_ONLY' &&
          x.direction === 'SYMMETRIC_WITHIN_GROUP' &&
          x.semanticEquivalenceGranted === false,
      ),
    ).toBe(true);
    expect(R092_SEARCH_ALIAS_GROUPS).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ members: ['殺', '煞'] }),
        expect.objectContaining({ members: ['祿', '禄'] }),
        expect.objectContaining({ members: ['沖', '冲'] }),
      ]),
    );
  });

  it('forbids automatic, fuzzy, and cross-group alias expansion', () => {
    expect(R092_MATCHING_RULES).toContain('EXACT_CURATED_GROUP_MEMBERSHIP_ONLY');
    expect(R092_MATCHING_RULES).toContain('NO_CROSS_GROUP_TRANSITIVE_CLOSURE');
    expect(R092_MATCHING_RULES).toContain('NO_AUTOMATIC_ALIAS_DISCOVERY');
    expect(R092_MATCHING_RULES).toContain('NO_FUZZY_OR_VISUAL_SIMILARITY_MATCHING');
    expect(R092_AUTHORITY.crossGroupTransitiveClosureAuthorized).toBe(false);
    expect(R092_AUTHORITY.automaticAliasDiscoveryAuthorized).toBe(false);
  });

  it('keeps original witness identity separate from retrieval and display derivatives', () => {
    expect(R092_EVIDENCE_IDENTITY_RULES).toContain(
      'ORIGINAL_WITNESS_CONTENT_REMAINS_IMMUTABLE',
    );
    expect(R092_EVIDENCE_IDENTITY_RULES).toContain(
      'WITNESS_CHECKSUM_USES_ORIGINAL_WITNESS_IDENTITY',
    );
    expect(R092_REJECTED_SHORTCUTS).toContain(
      'CANONICAL_DISPLAY_USED_AS_EVIDENCE_IDENTITY',
    );
    expect(R092_AUTHORITY.canonicalDisplayAffectsEvidenceIdentity).toBe(false);
    expect(R092_AUTHORITY.normalizedWitnessChecksumAuthorized).toBe(false);
  });

  it('never derives technical semantic equivalence from glyph aliases', () => {
    expect(R092_REJECTED_SHORTCUTS).toContain(
      'ALIAS_MEMBERSHIP_IMPLIES_SEMANTIC_EQUIVALENCE',
    );
    expect(R092_AUTHORITY.semanticEquivalenceFromAliasAuthorized).toBe(false);
    expect(R092_AUTHORITY.semanticEquivalenceRequiresPropositionEvidence).toBe(true);
  });

  it('keeps source mutation and Production authority disabled', () => {
    expect(R092_AUTHORITY).toEqual({
      status: 'CURATED_SEARCH_ALIAS_POLICY_ONLY',
      aliasGroupCount: 11,
      searchDirection: 'SYMMETRIC_WITHIN_GROUP',
      sourceWitnessMutationAuthorized: false,
      semanticEquivalenceFromAliasAuthorized: false,
      semanticEquivalenceRequiresPropositionEvidence: true,
      canonicalDisplayAffectsEvidenceIdentity: false,
      normalizedWitnessChecksumAuthorized: false,
      crossGroupTransitiveClosureAuthorized: false,
      automaticAliasDiscoveryAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
