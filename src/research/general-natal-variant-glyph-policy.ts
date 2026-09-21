export const R092_VARIANT_GLYPH_POLICY_VERSION = '0.2.0-research' as const;

export const R092_TEXT_LAYERS = Object.freeze([
  'ORIGINAL_GLYPH',
  'SEARCH_ALIAS',
  'CANONICAL_DISPLAY',
  'SEMANTIC_EQUIVALENCE',
] as const);

const aliasGroups = [
  ['殺', '煞'],
  ['爲', '為'],
  ['劫', '刼'],
  ['祿', '禄'],
  ['氣', '气'],
  ['從', '从'],
  ['會', '会'],
  ['歲', '岁'],
  ['運', '运'],
  ['沖', '冲'],
  ['體', '体'],
] as const;

export const R092_SEARCH_ALIAS_GROUPS = Object.freeze(
  aliasGroups.map((members) =>
    Object.freeze({
      members: Object.freeze([...members]),
      use: 'SEARCH_ONLY' as const,
      direction: 'SYMMETRIC_WITHIN_GROUP' as const,
      semanticEquivalenceGranted: false,
    }),
  ),
);

export const R092_MATCHING_RULES = Object.freeze([
  'EXACT_CURATED_GROUP_MEMBERSHIP_ONLY',
  'SYMMETRIC_WITHIN_GROUP',
  'NO_CROSS_GROUP_TRANSITIVE_CLOSURE',
  'NO_AUTOMATIC_ALIAS_DISCOVERY',
  'NO_FUZZY_OR_VISUAL_SIMILARITY_MATCHING',
] as const);

export const R092_EVIDENCE_IDENTITY_RULES = Object.freeze([
  'ORIGINAL_WITNESS_CONTENT_REMAINS_IMMUTABLE',
  'SEARCH_ALIAS_OUTPUT_IS_DERIVATIVE_ONLY',
  'CANONICAL_DISPLAY_IS_PRESENTATION_ONLY',
  'WITNESS_CHECKSUM_USES_ORIGINAL_WITNESS_IDENTITY',
  'SEMANTIC_EQUIVALENCE_REQUIRES_SEPARATE_PROPOSITION_EVIDENCE',
] as const);

export const R092_REJECTED_SHORTCUTS = Object.freeze([
  'REWRITE_SOURCE_WITNESS_TO_CANONICAL_GLYPHS',
  'WHOLE_STRING_SIMPLIFIED_TRADITIONAL_CONVERSION_AS_EVIDENCE_NORMALIZATION',
  'ALIAS_MEMBERSHIP_IMPLIES_SEMANTIC_EQUIVALENCE',
  'NORMALIZED_TEXT_USED_FOR_WITNESS_CHECKSUM',
  'CANONICAL_DISPLAY_USED_AS_EVIDENCE_IDENTITY',
  'UNKNOWN_GLYPH_PAIR_AUTO_ADDED',
  'CROSS_GROUP_TRANSITIVE_ALIAS_EXPANSION',
  'FUZZY_GLYPH_MATCHING_AS_GOVERNED_ALIAS',
] as const);

export const R092_AUTHORITY = Object.freeze({
  status: 'CURATED_SEARCH_ALIAS_POLICY_ONLY' as const,
  aliasGroupCount: 11,
  searchDirection: 'SYMMETRIC_WITHIN_GROUP' as const,
  sourceWitnessMutationAuthorized: false,
  semanticEquivalenceFromAliasAuthorized: false,
  semanticEquivalenceRequiresPropositionEvidence: true,
  canonicalDisplayAffectsEvidenceIdentity: false,
  normalizedWitnessChecksumAuthorized: false,
  crossGroupTransitiveClosureAuthorized: false,
  automaticAliasDiscoveryAuthorized: false,
  productionAuthorityPromoted: false,
});
