export const R094_COUNTEREXAMPLE_REGISTRY_VERSION = '0.1.0-research' as const;

export const R094_COUNTEREXAMPLE_CLASSES = Object.freeze([
  'SOURCE_CONTRADICTION',
  'SOURCE_EXCEPTION',
  'CALCULATION_EDGE_CASE',
  'IMPLEMENTATION_REGRESSION',
  'CROSS_SCHOOL_DIVERGENCE',
  'TEMPORAL_CONTEXT_REVERSAL',
  'DOMAIN_PROJECTION_FAILURE',
  'UNKNOWN_OR_UNRESOLVED',
] as const);

export const R094_ADJUDICATION_STATES = Object.freeze([
  'OPEN',
  'REPRODUCED',
  'SOURCE_VERIFIED',
  'RULE_NARROWED',
  'RULE_SUPERSEDED',
  'NOT_APPLICABLE',
  'INCONCLUSIVE',
] as const);

export const R094_REQUIRED_FIELDS = Object.freeze([
  'COUNTEREXAMPLE_ID',
  'TARGET_RULE_OR_METHODOLOGY_VERSION_CONTENT_HASH',
  'CHALLENGING_INPUT_OR_SOURCE_PROPOSITION',
  'COUNTEREXAMPLE_CLASS',
  'EVIDENCE_PROVENANCE_REFS',
  'EXPECTED_BEHAVIOR',
  'CONTRADICTORY_BEHAVIOR',
  'ADJUDICATION_STATE',
  'SCOPE_IMPACT',
] as const);

export const R094_GOVERNANCE = Object.freeze({
  automaticRuleInvalidation:false,
  silentCounterexampleDeletion:false,
  supersessionPreservesHistory:true,
  counterexampleCountAsConfidence:false,
  productionChangeRequiresGovernedPromotion:true,
  productionAuthorityPromoted:false,
});
