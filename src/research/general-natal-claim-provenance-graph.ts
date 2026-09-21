export const R093_CLAIM_PROVENANCE_GRAPH_VERSION = '0.2.0-research' as const;

export const R093_NODE_TYPES = Object.freeze([
  'WORK',
  'EDITION',
  'WITNESS',
  'PASSAGE',
  'SOURCE_PROPOSITION',
  'METHODOLOGY',
  'RULE_VERSION',
  'RESEARCH_CLAIM',
  'PRODUCT_CLAIM_CONTENT_HASH',
] as const);

export const R093_EDGE_TYPES = Object.freeze([
  'WITNESS_OF',
  'PASSAGE_IN',
  'STATES',
  'SUPPORTS',
  'PARTIALLY_SUPPORTS',
  'CONTRADICTS',
  'DERIVED_FROM',
  'NARROWS',
  'EXTENDS',
  'IMPLEMENTED_BY',
  'EMITS',
  'SUPERSEDES',
] as const);

export const R093_EDGE_REVIEW_STATES = Object.freeze([
  'VERIFIED',
  'REVIEWED',
  'INCONCLUSIVE',
] as const);

export const R093_EDGE_BINDING_STATES = Object.freeze([
  'EXACT',
  'PARTIAL',
  'MISSING',
] as const);

export const R093_REQUIRED_EDGE_FIELDS = Object.freeze([
  'EDGE_ID',
  'FROM_NODE_REF',
  'TO_NODE_REF',
  'RELATION',
  'SCOPE_REF',
  'REVIEW_STATE',
  'BINDING_STATE',
  'EVIDENCE_REFS',
  'GAP_REASON_REF_IF_NOT_EXACT',
] as const);

export const R093_FIXED_ENDPOINT_RULES = Object.freeze([
  {
    relation: 'WITNESS_OF',
    from: ['WITNESS'],
    to: ['EDITION', 'WORK'],
  },
  {
    relation: 'PASSAGE_IN',
    from: ['PASSAGE'],
    to: ['WITNESS'],
  },
  {
    relation: 'STATES',
    from: ['PASSAGE'],
    to: ['SOURCE_PROPOSITION'],
  },
  {
    relation: 'SUPPORTS',
    from: ['SOURCE_PROPOSITION'],
    to: ['RESEARCH_CLAIM'],
  },
  {
    relation: 'PARTIALLY_SUPPORTS',
    from: ['SOURCE_PROPOSITION'],
    to: ['RESEARCH_CLAIM'],
  },
  {
    relation: 'CONTRADICTS',
    from: ['SOURCE_PROPOSITION'],
    to: ['RESEARCH_CLAIM'],
  },
  {
    relation: 'EMITS',
    from: ['RULE_VERSION'],
    to: ['PRODUCT_CLAIM_CONTENT_HASH'],
  },
] as const);

export const R093_RELATIONS_REQUIRING_EXPLICIT_ENDPOINT_REGISTRY = Object.freeze([
  'DERIVED_FROM',
  'NARROWS',
  'EXTENDS',
  'IMPLEMENTED_BY',
  'SUPERSEDES',
] as const);

export const R093_EDGE_REQUIREMENTS = Object.freeze({
  authorityBearingEdgeRequiresScope: true,
  reviewStateSeparatedFromBindingState: true,
  exactBindingRequiresExactEvidenceRef: true,
  nonExactBindingRequiresGapReasonRef: true,
  transitiveSupportImplicitlyAuthorized: false,
  arbitraryKnownRelationNodePairsAuthorized: false,
  conflictingEdgesMayCoexist: true,
  workEditionWitnessIdentityOwnedByR091: true,
});

export const R093_REJECTED_SHORTCUTS = Object.freeze([
  'RULE_SOURCE_IDS_ALONE_EQUALS_EXACT_CLAIM_PROVENANCE',
  'TRANSITIVE_SUPPORT_WITHOUT_EXPLICIT_EDGE',
  'SOURCE_COUNT_EQUALS_CONFIDENCE',
  'CONTRADICTION_AUTO_RESOLVED_BY_MAJORITY',
  'MISSING_BINDING_COUNTS_AS_EXACT',
  'ARBITRARY_NODE_PAIR_ACCEPTED_FOR_KNOWN_EDGE_NAME',
  'R091_IDENTITY_DUPLICATED_IN_R093',
  'GRAPH_CONNECTIVITY_AUTO_PROMOTES_PRODUCTION',
] as const);

export const R093_AUTHORITY = Object.freeze({
  status: 'CLAIM_LEVEL_PROVENANCE_GRAPH_CONTRACT_DEFINED' as const,
  nodeTypeCount: 9,
  edgeTypeCount: 12,
  identityOwnership: 'R091_REFERENCED_NOT_DUPLICATED' as const,
  automaticAuthorityPropagation: false,
  transitiveSupportAuthorized: false,
  sourceCountConfidenceAuthorized: false,
  majorityConflictResolutionAuthorized: false,
  graphConnectivityPromotesProduction: false,
  productionAuthorityPromoted: false,
});
