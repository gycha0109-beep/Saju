export const R092_VARIANT_GLYPH_POLICY_VERSION = '0.1.0-research' as const;

export const R092_TEXT_LAYERS = Object.freeze([
  'ORIGINAL_GLYPH',
  'SEARCH_ALIAS',
  'CANONICAL_DISPLAY',
  'SEMANTIC_EQUIVALENCE',
] as const);

export const R092_SEARCH_ALIAS_GROUPS = Object.freeze([
  ['殺','煞'],
  ['爲','為'],
  ['劫','刼'],
  ['祿','禄'],
  ['氣','气'],
  ['從','从'],
  ['會','会'],
  ['歲','岁'],
  ['運','运'],
  ['沖','冲'],
  ['體','体'],
].map((members)=>Object.freeze({ members:Object.freeze(members), use:'SEARCH_ONLY' as const })));

export const R092_REJECTED_SHORTCUTS = Object.freeze([
  'REWRITE_SOURCE_WITNESS_TO_CANONICAL_GLYPHS',
  'WHOLE_STRING_SIMPLIFIED_TRADITIONAL_CONVERSION_AS_EVIDENCE_NORMALIZATION',
  'ALIAS_MEMBERSHIP_IMPLIES_SEMANTIC_EQUIVALENCE',
  'NORMALIZED_TEXT_USED_FOR_WITNESS_CHECKSUM',
  'UNKNOWN_GLYPH_PAIR_AUTO_ADDED',
] as const);

export const R092_AUTHORITY = Object.freeze({
  status:'CURATED_SEARCH_ALIAS_POLICY_ONLY' as const,
  aliasGroupCount:11,
  sourceWitnessMutationAuthorized:false,
  semanticEquivalenceFromAliasAuthorized:false,
  normalizedWitnessChecksumAuthorized:false,
  productionAuthorityPromoted:false,
});
