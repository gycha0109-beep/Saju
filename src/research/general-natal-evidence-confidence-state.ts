export const R096_EVIDENCE_STATE_MODEL_VERSION = '0.1.0-research' as const;

export const R096_PRIMARY_STATES = Object.freeze([
  'VERIFIED_BOUNDED',
  'VERIFIED_VARIANT',
  'DIVERGENT_BY_SOURCE_OR_SCHOOL',
  'PARTIALLY_SUPPORTED',
  'INCONCLUSIVE',
  'UNVERIFIED',
  'CONTRADICTED_WITHIN_SCOPE',
  'EXECUTION_PENDING',
] as const);

export const R096_ORTHOGONAL_DIMENSIONS = Object.freeze([
  'PROVENANCE_QUALITY',
  'PASSAGE_BINDING_COMPLETENESS',
  'PROPOSITION_SCOPE_MATCH',
  'SOURCE_INDEPENDENCE_OR_DERIVATION',
  'CROSS_SOURCE_AGREEMENT_OR_DIVERGENCE',
  'IMPLEMENTATION_EXECUTION_VERIFICATION',
  'EXPERT_REVIEW_STATUS',
  'TEMPORAL_CALCULATION_CONVENTION_STABILITY',
] as const);

export const R096_REJECTED_SHORTCUTS = Object.freeze([
  'NUMERIC_CONFIDENCE_PERCENTAGE',
  'STAR_RATING',
  'SOURCE_COUNT_SCORE',
  'HIDDEN_WEIGHTED_SUM',
  'DIVERGENT_EQUALS_LOW_CONFIDENCE',
  'INCONCLUSIVE_EQUALS_FALSE',
] as const);

export const R096_AUTHORITY = Object.freeze({
  status:'QUALITATIVE_EVIDENCE_STATE_MODEL_ONLY' as const,
  arithmeticAggregationAuthorized:false,
  stateTransitionRequiresEvidenceEvent:true,
  verifiedBoundedMeansUniversal:false,
  divergentPreservesPlurality:true,
  inconclusiveCoercesToFalse:false,
  productionAuthorityPromoted:false,
});
