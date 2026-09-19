export const R077_LUCK_YONGXI_SHIFT_VERSION = '0.1.0-research' as const;

export const R077_ROLE_STATES = Object.freeze([
  {
    state: 'NATAL_ROLE_BASIS',
    sourceMeaning: '命中喜神或用神',
    automaticTemporalReselection: false,
    executable: false,
  },
  {
    state: 'LUCK_SUPPORT_OR_OPPOSITION',
    sourceMeaning: '行運助之 / 行運抑之',
    automaticTemporalReselection: false,
    executable: false,
  },
  {
    state: 'NATAL_RESCUE_OR_BLOCKING',
    sourceMeaning: '凡取運必兼顧四柱之神',
    automaticTemporalReselection: false,
    executable: false,
  },
  {
    state: 'STRUCTURAL_COMPLETION_OR_CHANGE',
    sourceMeaning: '成格變格 distinct from ordinary 助用害用',
    automaticTemporalReselection: false,
    executable: false,
  },
] as const);

export const R077_REJECTED_SHORTCUTS = Object.freeze([
  'EVERY_DAYUN_RESELECTS_YONGSHEN',
  'EVERY_YEAR_RESELECTS_FINAL_YONGSHEN',
  'EVERY_MONTH_RESELECTS_FINAL_YONGSHEN',
  'NOMINAL_XI_YONG_MATCH_ALWAYS_FAVORABLE',
  'STRUCTURAL_CHANGE_PERMANENTLY_REPLACES_NATAL_YONGXI',
  'UNIVERSAL_CURRENT_YONGSHEN_WITHOUT_TRANSITION_PROVENANCE',
] as const);

export const R077_EXECUTION_GAPS = Object.freeze([
  'NATAL_YONGXI_ROLE_AUTHORITY',
  'LUCK_ROLE_INTERACTION',
  'NATAL_RESCUE_BLOCKING_PRECEDENCE',
  'STRUCTURAL_TRANSITION_THRESHOLD',
  'TEMPORAL_ROLE_DURATION',
  'ROLE_PROVENANCE_CHAIN',
] as const);

export const R077_AUTHORITY = Object.freeze({
  status: 'VERIFIED_NATAL_ROLE_LUCK_INTERACTION_BOUNDARY' as const,
  roleStateCount: 4,
  automaticTemporalYongshenReselectionAuthorized: false,
  permanentYongxiReplacementAuthorized: false,
  executableTemporalYongxiSwitcherAuthorized: false,
  productionAuthorityPromoted: false,
});
