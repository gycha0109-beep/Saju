export const R086_ADVERSARIAL_PAIR_VERSION = '0.1.0-research' as const;

export const R086_PAIRS = Object.freeze([
  { id:'P01', invariant:'OFFICER_PLUS_HURTING', mutation:'SEAL_RESCUE_ABSENT_TO_PRESENT', a:'UNRESOLVED_OR_FAILURE_PATH', b:'RESCUE_CANDIDATE' },
  { id:'P02', invariant:'KILL_PLUS_FOOD_CONTROL', mutation:'SEAL_CONTAMINATION_ABSENT_TO_PRESENT', a:'CONTROLLED_PATH_CANDIDATE', b:'CONTAMINATED_PATH_CANDIDATE' },
  { id:'P03', invariant:'WOOD_MEETING_FAMILY', mutation:'HAI_MAO_TO_HAI_MAO_WEI', a:'PARTIAL_UNRESOLVED', b:'COMPLETE_FAMILY_RECOGNIZED' },
  { id:'P04', invariant:'ONE_SIDED_FOLLOW_CANDIDATE', mutation:'NO_FUYI_TO_VIABLE_FUYI', a:'FOLLOW_ENTRY_CANDIDATE', b:'FOLLOW_ENTRY_BLOCKED' },
  { id:'P05', invariant:'JIANLU_YUEJIE_BASE', mutation:'NO_TRANSITION_TO_OFFICER_WITH_WEALTH_SEAL', a:'SPECIAL_BASE_STATE', b:'OFFICER_LOGIC_TRANSITION_CANDIDATE' },
  { id:'P06', invariant:'SAME_NATAL_HIDDEN_COMPONENT', mutation:'LATENT_TO_LUCK_TRANSPARENT', a:'NATAL_LATENT', b:'TEMPORAL_ACTIVATION_CANDIDATE' },
  { id:'P07', invariant:'SAME_ANNUAL_STEM', mutation:'BRANCH_ROOT_SUPPORT_ABSENT_TO_PRESENT', a:'NO_BRANCH_SUPPORT', b:'BRANCH_SUPPORT_PRESENT' },
  { id:'P08', invariant:'SAME_PRINTED_FOUR_PILLARS', mutation:'INCOMPLETE_TO_COMPLETE_CALCULATION_PROVENANCE', a:'SOURCE_CHART_ONLY', b:'INDEPENDENT_RECALCULATION_ELIGIBLE' },
].map((x)=>Object.freeze({
  ...x,
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
