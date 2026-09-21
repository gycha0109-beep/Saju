export const R090_EXPERT_BLIND_REVIEW_VERSION = '0.2.0-research' as const;

export const R090_PACKET_PREREGISTRATION_FIELDS = Object.freeze([
  'PACKET_ID',
  'PROTOCOL_VERSION',
  'BOUNDED_QUESTION',
  'CASE_FACT_REF',
  'CASE_FACT_PROVENANCE_KIND',
  'CALCULATION_AUTHORITY_REF_IF_APPLICABLE',
  'HIDDEN_RESEARCH_CLAIM_REF',
  'REVIEWER_DISCLOSURE_MANIFEST',
  'RANDOMIZATION_MANIFEST_REF',
  'PACKET_HASH',
] as const);

export const R090_FACT_PROVENANCE_KINDS = Object.freeze([
  'GOVERNED_CALCULATION',
  'SOURCE_PROVIDED_RECORD',
  'RESEARCH_FIXTURE',
] as const);

export const R090_REVIEW_STAGES = Object.freeze([
  {
    id: 'STAGE_A_BLIND_STRUCTURAL',
    reveals: ['NORMALIZED_CASE_FACTS', 'BOUNDED_QUESTION'] as const,
    hides: [
      'PERSON_IDENTITY',
      'OUTCOME_NARRATIVE',
      'ENGINE_ANSWER',
      'RULE_ID',
      'SOURCE_EXCERPT',
      'SOURCE_CONCLUSION',
      'HIDDEN_RESEARCH_CLAIM',
    ] as const,
  },
  {
    id: 'STAGE_B_SOURCE_GROUNDING',
    reveals: [
      'SOURCE_EXCERPT',
      'EDITION_SOURCE_IDENTITY',
      'PROVENANCE',
      'BOUNDED_RESEARCH_CLAIM',
    ] as const,
    requiresStageALocked: true,
  },
] as const);

export const R090_STAGE_A_RESPONSE_STATES = Object.freeze([
  'SUPPORTED',
  'REJECTED',
  'INDETERMINATE',
  'OUT_OF_SCOPE',
] as const);

export const R090_STAGE_B_SOURCE_FIDELITY_STATES = Object.freeze([
  'FAITHFUL_BOUNDED_READING',
  'OVERSTATED',
  'UNDERSTATED',
  'SOURCE_AMBIGUOUS',
  'OUT_OF_SCOPE',
] as const);

export const R090_REVIEWER_METADATA = Object.freeze([
  'LINEAGE_OR_SCHOOL',
  'PRACTICE_DURATION_BAND',
  'SOURCE_LANGUAGE_READABILITY',
  'CALCULATION_CONVENTION',
] as const);

export const R090_RANDOMIZATION_RULES = Object.freeze([
  'LOCK_PACKET_HASHES_BEFORE_BATCH',
  'RECORD_RANDOMIZATION_ORDER_MANIFEST',
  'NO_POST_START_MANUAL_REORDERING',
  'PRESERVE_ORIGINAL_ORDER_FOR_AUDIT',
] as const);

export const R090_DISAGREEMENT_CLASSES = Object.freeze([
  'CALCULATION_INPUT_OR_POLICY',
  'INTERPRETATION',
  'SOURCE_READING',
  'OUT_OF_SCOPE',
] as const);

export const R090_ADJUDICATION_RULES = Object.freeze([
  'PRESERVE_DISAGREEMENT',
  'PRESERVE_ABSTENTION',
  'PRESERVE_SCHOOL_DIVERGENCE',
  'SEPARATE_CALCULATION_FROM_INTERPRETATION_DISAGREEMENT',
  'NO_MAJORITY_VOTE_TRUTH',
  'NO_SENIORITY_OVERRIDE_OF_SOURCE_PROVENANCE',
  'AGREEMENT_RATE_IS_DESCRIPTIVE_ONLY',
  'SOURCE_FIDELITY_IS_NOT_PREDICTIVE_VALIDATION',
] as const);

export const R090_AUTHORITY = Object.freeze({
  status: 'BLIND_REVIEW_PROTOCOL_READY_EXECUTION_PENDING' as const,
  reviewerExecutionPending: true,
  packetPreRegistrationRequired: true,
  stageAImmutableBeforeStageB: true,
  normalizedFactsUpgradeProvenance: false,
  sourceProvidedChartCountsAsIndependentCalculation: false,
  reviewerMetadataAsVotingWeight: false,
  majorityVoteAuthority: false,
  agreementRateAsTruthAuthority: false,
  productionAuthorityPromoted: false,
});
