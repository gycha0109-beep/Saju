export const R072_DAYUN_NATAL_INTERACTION_VERSION = '0.1.0-research' as const;

export const R072_INTERACTION_CLASSES = Object.freeze([
  {
    id: 'COMPLETE-INCOMPLETE-NATAL-STRUCTURE',
    sourceMeaning: '本命用神成而未全，逢運配合而完成',
    interaction: 'NATAL_COMPLETION',
    automaticPolarity: false,
    executable: false,
  },
  {
    id: 'LUCK-EXPOSES-NATAL-HIDDEN-MATERIAL',
    sourceMeaning: '原局支中所藏，逢運為透清',
    interaction: 'HIDDEN_TO_EXPOSED',
    automaticPolarity: false,
    executable: false,
  },
  {
    id: 'LUCK-MEETING-CLASH-STRUCTURAL-CHANGE',
    sourceMeaning: '運可因會合或沖而使格局變換',
    interaction: 'STRUCTURAL_CHANGE',
    automaticPolarity: false,
    executable: false,
  },
  {
    id: 'NATAL-BLOCKS-OR-RESCUES-LUCK',
    sourceMeaning: '逢成格而不喜 / 逢變格而不忌',
    interaction: 'NATAL_BLOCK_OR_RESCUE',
    automaticPolarity: false,
    executable: false,
  },
  {
    id: 'ORDINARY-HELP-HARM-DISTINCT-FROM-PATTERN-CHANGE',
    sourceMeaning: '成格變格與行運助用害用有別',
    interaction: 'MECHANISM_CLASS_SEPARATION',
    automaticPolarity: false,
    executable: false,
  },
] as const);

export const R072_REJECTED_SHORTCUTS = Object.freeze([
  'DAYUN_ELEMENT_ALONE_IMPLIES_GOOD_OR_BAD',
  'SAME_DAYUN_SAME_RESULT_ACROSS_CHARTS',
  'LUCK_ADDS_FIXED_ELEMENT_POINTS',
  'ANY_LUCK_MEETING_CHANGES_PATTERN',
  'PATTERN_COMPLETION_ALWAYS_FAVORABLE',
  'PATTERN_CHANGE_ALWAYS_UNFAVORABLE',
] as const);

export const R072_EXECUTION_GAPS = Object.freeze([
  'NATAL_PATTERN_STATE',
  'LUCK_TO_NATAL_INTERACTION_MATCHING',
  'COMPLETION_SUFFICIENCY',
  'CHANGE_SUFFICIENCY',
  'NATAL_BLOCK_RESCUE_PRECEDENCE',
  'TEMPORAL_EFFECT_SETTLEMENT',
] as const);

export const R072_AUTHORITY = Object.freeze({
  status: 'VERIFIED_NATAL_CONTEXT_INTERACTION_CORPUS' as const,
  interactionClassCount: 5,
  independentLuckScoreAuthorized: false,
  sameLuckSameOutcomeAuthorized: false,
  executableDayunInteractionResolverAuthorized: false,
  productionAuthorityPromoted: false,
});
