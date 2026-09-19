export const R076_LUCK_PATTERN_BREAK_RECOVERY_VERSION = '0.1.0-research' as const;

export const R076_CASES = Object.freeze([
  {
    id: 'OFFICER-HARM-BY-LUCK-EXPOSED-HURTING',
    mechanism: 'BREAK_TRIGGER',
    sourceMeaning: '丁生辰月透壬用官，運逢戊可透出辰中傷官而壞用',
    automaticOutcome: false,
    executable: false,
  },
  {
    id: 'NATAL-SEAL-PROTECTS-OFFICER',
    mechanism: 'NATAL_RESCUE',
    sourceMeaning: '丁生辰月透壬用官，逢戊而命有甲，可護官而不忌',
    automaticOutcome: false,
    executable: false,
  },
  {
    id: 'NATAL-METAL-BLOCKS-WOOD-MEETING-CHANGE',
    mechanism: 'COUNTERFORCE_BLOCKS_CHANGE',
    sourceMeaning: '壬生亥月透己用官，運逢卯未；命有庚辛/申酉可回沖而不成會局變格',
    automaticOutcome: false,
    executable: false,
  },
  {
    id: 'COMPLETION-NOT-NECESSARILY-FAVORABLE',
    mechanism: 'COMPLETION_WITH_NATAL_OBSTRUCTION',
    sourceMeaning: '逢成格而不喜',
    automaticOutcome: false,
    executable: false,
  },
  {
    id: 'CHANGE-NOT-NECESSARILY-HARMFUL',
    mechanism: 'CHANGE_WITH_NATAL_RESCUE',
    sourceMeaning: '逢變格而不忌',
    automaticOutcome: false,
    executable: false,
  },
] as const);

export const R076_REJECTED_SHORTCUTS = Object.freeze([
  'BAD_LUCK_AUTOMATICALLY_BREAKS_PATTERN',
  'NEXT_GOOD_LUCK_AUTOMATICALLY_RESTORES_PATTERN',
  'PATTERN_BREAK_IS_PERMANENT_NATAL_MUTATION',
  'ONE_RESCUE_SYMBOL_ALWAYS_WINS',
  'COMPLETION_ALWAYS_GOOD',
  'CHANGE_ALWAYS_BAD',
] as const);

export const R076_EXECUTION_GAPS = Object.freeze([
  'BREAK_TRIGGER_MATCHING',
  'RESCUE_TRIGGER_MATCHING',
  'COUNTERFORCE_PRECEDENCE',
  'CHANGE_SETTLEMENT',
  'TEMPORAL_DURATION',
  'POLARITY_SETTLEMENT',
] as const);

export const R076_AUTHORITY = Object.freeze({
  status: 'VERIFIED_CONFIGURATION_SPECIFIC_BREAK_RESCUE_CASES' as const,
  caseCount: 5,
  globalBreakRecoveryToggleAuthorized: false,
  permanentNatalMutationAuthorized: false,
  executableBreakRecoveryResolverAuthorized: false,
  productionAuthorityPromoted: false,
});
