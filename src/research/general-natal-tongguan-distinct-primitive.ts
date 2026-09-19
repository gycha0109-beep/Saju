export const R037_TONGGUAN_VERSION = '0.1.0-research' as const;

export const R037_DIRECT_PROPOSITION = Object.freeze({
  sourcePhrase: '兩神對峙，強弱均平，各不相下，須調和之為美，此以通關為用也',
  preconditions: Object.freeze([
    '兩神對峙',
    '強弱均平',
    '各不相下',
  ] as const),
  requiredResolution: '須調和',
  methodologyFamily: 'TONGGUAN',
  executable: false as const,
});

export const R037_EXECUTION_GAPS = Object.freeze([
  'TWO_FORCE_OPPOSITION',
  'RELATIVE_STRENGTH_BALANCE',
  'NO_SIDE_PREVAILS',
  'TONGGUAN_APPLICABILITY',
  'MEDIATOR_OR_TRANSFORMATION_SELECTION',
  'CROSS_METHOD_RECONCILIATION',
] as const);

export const R037_FORBIDDEN_SHORTCUTS = Object.freeze([
  'TWO_ELEMENT_PRESENCE_AS_OPPOSITION',
  'ELEMENT_COUNT_SIMILARITY_AS_BALANCE',
  'MIDDLE_ELEMENT_LOOKUP_AS_TONGGUAN',
  'UNGOVERNED_TRANSFORMATION_EFFECT',
  'CROSS_METHOD_FORCE_SINGLE_WINNER',
] as const);

export const R037_AUTHORITY = Object.freeze({
  sourceFamily: 'XU_COMMENTARY_TONGGUAN' as const,
  status: 'VERIFIED_BOUNDED_PROPOSITION_FAMILY' as const,
  distinctResolutionFamilyVerified: true,
  executableTongguanResolverAuthorized: false,
  universalMediatorSelectionAuthorized: false,
  productionAuthorityPromoted: false,
});
