export const R093_CLAIM_PROVENANCE_GRAPH_VERSION = '0.1.0-research' as const;

export const R093_NODE_TYPES = Object.freeze([
  'WORK','EDITION','WITNESS','PASSAGE','SOURCE_PROPOSITION','METHODOLOGY',
  'RULE_VERSION','RESEARCH_CLAIM','PRODUCT_CLAIM_CONTENT_HASH',
] as const);

export const R093_EDGE_TYPES = Object.freeze([
  'WITNESS_OF','PASSAGE_IN','STATES','SUPPORTS','PARTIALLY_SUPPORTS','CONTRADICTS',
  'DERIVED_FROM','NARROWS','EXTENDS','IMPLEMENTED_BY','EMITS','SUPERSEDES',
] as const);

export const R093_EDGE_EVIDENCE_STATES = Object.freeze([
  'VERIFIED','REVIEWED','INCONCLUSIVE','MISSING_BINDING',
] as const);

export const R093_EDGE_REQUIREMENTS = Object.freeze({
  authorityBearingEdgeRequiresScope:true,
  passageLocatorOrWitnessIdentityRequiredWhenAvailable:true,
  missingBindingMustRemainExplicit:true,
  transitiveSupportImplicitlyAuthorized:false,
  conflictingEdgesMayCoexist:true,
});

export const R093_REJECTED_SHORTCUTS = Object.freeze([
  'RULE_SOURCE_IDS_ALONE_EQUALS_EXACT_CLAIM_PROVENANCE',
  'TRANSITIVE_SUPPORT_WITHOUT_EXPLICIT_EDGE',
  'SOURCE_COUNT_EQUALS_CONFIDENCE',
  'CONTRADICTION_AUTO_RESOLVED_BY_MAJORITY',
  'GRAPH_CONNECTIVITY_AUTO_PROMOTES_PRODUCTION',
] as const);

export const R093_AUTHORITY = Object.freeze({
  status:'CLAIM_LEVEL_PROVENANCE_GRAPH_CONTRACT_DEFINED' as const,
  nodeTypeCount:9,
  edgeTypeCount:12,
  automaticAuthorityPropagation:false,
  sourceCountConfidenceAuthorized:false,
  productionAuthorityPromoted:false,
});
