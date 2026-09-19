export const R090_EXPERT_BLIND_REVIEW_VERSION = '0.1.0-research' as const;

export const R090_REVIEW_STAGES = Object.freeze([
  {
    id:'STAGE_A_BLIND_STRUCTURAL',
    reveals:['NORMALIZED_FACTS','BOUNDED_QUESTION'] as const,
    hides:['PERSON_IDENTITY','OUTCOME_NARRATIVE','ENGINE_ANSWER','RULE_ID','SOURCE_CONCLUSION'] as const,
  },
  {
    id:'STAGE_B_SOURCE_GROUNDING',
    reveals:['SOURCE_EXCERPT','EDITION_SOURCE_IDENTITY','PROVENANCE','RESEARCH_CLAIM'] as const,
    requiresStageALocked:true,
  },
] as const);

export const R090_RESPONSE_STATES = Object.freeze([
  'SUPPORTED','REJECTED','INDETERMINATE','OUT_OF_SCOPE',
] as const);

export const R090_REVIEWER_METADATA = Object.freeze([
  'LINEAGE_OR_SCHOOL',
  'PRACTICE_DURATION_BAND',
  'SOURCE_LANGUAGE_READABILITY',
  'CALCULATION_CONVENTION',
] as const);

export const R090_ADJUDICATION_RULES = Object.freeze([
  'PRESERVE_DISAGREEMENT',
  'PRESERVE_ABSTENTION',
  'SEPARATE_CALCULATION_FROM_INTERPRETATION_DISAGREEMENT',
  'NO_MAJORITY_VOTE_TRUTH',
  'NO_SENIORITY_OVERRIDE_OF_SOURCE_PROVENANCE',
] as const);

export const R090_AUTHORITY = Object.freeze({
  status:'BLIND_REVIEW_PROTOCOL_READY_EXECUTION_PENDING' as const,
  reviewerExecutionPending:true,
  reviewerMetadataAsVotingWeight:false,
  majorityVoteAuthority:false,
  productionAuthorityPromoted:false,
});
