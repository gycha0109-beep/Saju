export const R060_HIDDEN_STEM_INTERACTION_VERSION = '0.1.0-research' as const;

export const R060_MECHANISMS = Object.freeze([
  {
    mechanism: 'HIDDEN_MEMBERSHIP',
    sourceMeaning: 'branch contains hidden stem(s)',
    genericUsableRoleAuthorized: false,
    executable: false,
  },
  {
    mechanism: 'STEM_MANIFESTATION_TOU_GAN',
    sourceMeaning: '透則用清; hidden branch stem appears in Heavenly Stems',
    genericUsableRoleAuthorized: false,
    executable: false,
  },
  {
    mechanism: 'BRANCH_MEETING_CONFIGURATION',
    sourceMeaning: '會則力大; meeting can form a larger branch configuration',
    genericUsableRoleAuthorized: false,
    executable: false,
  },
  {
    mechanism: 'CLASH_MOVEMENT_OR_DISRUPTION',
    sourceMeaning: 'clash can move/disrupt context rather than reveal all hidden stems',
    genericUsableRoleAuthorized: false,
    executable: false,
  },
] as const);

export const R060_BOUNDED_COUNTEREXAMPLE = Object.freeze({
  sourceSurface: '辰戌沖 -> 土動; exposed 壬 connection to month command can fail',
  clashRevealsAllHiddenStems: false,
  clashEqualsTouGan: false,
  executable: false,
});

export const R060_REJECTED_SHORTCUTS = Object.freeze([
  'ANY_INTERACTION_ACTIVATES_ALL_HIDDEN_STEMS',
  'CLASH_MAKES_HIDDEN_STEM_VISIBLE',
  'MEETING_ACTIVATES_EACH_HIDDEN_STEM_INDEPENDENTLY',
  'HIDDEN_MEMBERSHIP_IMPLIES_USABLE_ROLE',
  'ACTIVATION_IMPLIES_FIXED_STRENGTH_SCORE',
] as const);

export const R060_EXECUTION_GAPS = Object.freeze([
  'HIDDEN_STEM_ROLE_SELECTION',
  'STEM_MANIFESTATION_EFFECT',
  'MEETING_CONFIGURATION_EFFECT',
  'CLASH_MOVEMENT_EFFECT',
  'ROOT_CONNECTION_EFFECT',
  'INTERACTION_EVENT_SETTLEMENT',
  'ROLE_CONTEXT',
] as const);

export const R060_AUTHORITY = Object.freeze({
  status: 'VERIFIED_DISTINCT_MECHANISMS_ONLY' as const,
  hiddenMembershipDistinctFromManifestation: true,
  meetingDistinctFromTouGan: true,
  clashDistinctFromManifestation: true,
  genericInteractionActivationAuthorized: false,
  executableResolverAuthorized: false,
  productionAuthorityPromoted: false,
});
