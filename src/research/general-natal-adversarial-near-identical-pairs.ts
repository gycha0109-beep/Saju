export const R086_ADVERSARIAL_PAIR_VERSION = '0.2.0-research' as const;

export const R086_PAIRS = Object.freeze([
  {
    id:'P01', invariant:'OFFICER_PLUS_HURTING', mutation:'SEAL_RESCUE_PREDICATE_ABSENT_TO_PRESENT',
    a:'UNRESOLVED_OR_FAILURE_PATH', b:'RESCUE_CANDIDATE',
    unchangedClaims:['OFFICER_PLUS_HURTING_PRESENT','NO_REAL_WORLD_EVENT_CLAIM'], evidenceRefs:['R023','R047'],
  },
  {
    id:'P02', invariant:'KILL_PLUS_FOOD_CONTROL', mutation:'SEAL_CONTAMINATION_PREDICATE_ABSENT_TO_PRESENT',
    a:'CONTROLLED_PATH_CANDIDATE', b:'CONTAMINATED_PATH_CANDIDATE',
    unchangedClaims:['KILL_PLUS_FOOD_CONTROL_PRESENT','NO_REAL_WORLD_EVENT_CLAIM'], evidenceRefs:['R027','R048'],
  },
  {
    id:'P03', invariant:'WOOD_MEETING_FAMILY', mutation:'SANHE_COMPLETENESS_PARTIAL_TO_COMPLETE',
    a:'PARTIAL_UNRESOLVED', b:'COMPLETE_FAMILY_RECOGNIZED',
    unchangedClaims:['HAI_MAO_SUBSET_PRESENT','NO_OUTCOME_POLARITY'], evidenceRefs:['R053'],
  },
  {
    id:'P04', invariant:'FOLLOW_PATTERN_EVALUATION_CONTEXT', mutation:'VIABLE_FUYI_PREDICATE_FALSE_TO_TRUE',
    a:'FOLLOW_ENTRY_CANDIDATE', b:'FOLLOW_ENTRY_BLOCKED',
    unchangedClaims:['METHODOLOGY_SOURCE_SCOPE','NO_REAL_WORLD_OUTCOME_CLAIM'], evidenceRefs:['R029'],
  },
  {
    id:'P05', invariant:'JIANLU_YUEJIE_EVALUATION_CONTEXT', mutation:'TRANSITION_EVIDENCE_PREDICATE_FALSE_TO_TRUE',
    a:'SPECIAL_BASE_STATE', b:'OFFICER_LOGIC_TRANSITION_CANDIDATE',
    unchangedClaims:['JIANLU_YUEJIE_BASE','NO_FINAL_GEJU_VERDICT'], evidenceRefs:['R028'],
  },
  {
    id:'P06', invariant:'SAME_NATAL_HIDDEN_COMPONENT', mutation:'TEMPORAL_ACTIVATION_PREDICATE_LATENT_TO_TRANSPARENT',
    a:'NATAL_LATENT', b:'TEMPORAL_ACTIVATION_CANDIDATE',
    unchangedClaims:['NATAL_HIDDEN_COMPONENT','NO_CONCRETE_EVENT'], evidenceRefs:['R060','R073'],
  },
  {
    id:'P07', invariant:'SAME_ANNUAL_STEM', mutation:'BRANCH_ROOT_SUPPORT_PREDICATE_ABSENT_TO_PRESENT',
    a:'NO_BRANCH_SUPPORT', b:'BRANCH_SUPPORT_PRESENT',
    unchangedClaims:['ANNUAL_STEM','NO_FIXED_PRECEDENCE_SCORE'], evidenceRefs:['R074'],
  },
  {
    id:'P08', invariant:'SAME_PRINTED_FOUR_PILLARS', mutation:'INDEPENDENT_CALCULATION_EVIDENCE_ABSENT_TO_PRESENT',
    a:'SOURCE_CHART_ONLY', b:'INDEPENDENTLY_CORROBORATED_CALCULATION_STATE',
    unchangedClaims:['PRINTED_CHART_CONTENT','NO_INTERPRETATION_VERDICT'], evidenceRefs:['R081','R082','R083:#1235'],
  },
].map((x)=>Object.freeze({
  ...x,
  mutationDimensionCount: 1 as const,
  realWorldOutcomeLabel: null,
  numericScore: null,
  executable: false,
})));

export const R086_AUTHORITY = Object.freeze({
  status: 'VERIFIED_SINGLE_PREDICATE_ADVERSARIAL_FIXTURES' as const,
  pairCount: 8,
  realWorldOutcomeLabelsAuthorized: false,
  executableReplayAuthorized: false,
  productionAuthorityPromoted: false,
});
