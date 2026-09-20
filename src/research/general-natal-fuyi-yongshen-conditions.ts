export const R035_FUIYI_YONGSHEN_VERSION = '0.1.0-research' as const;

export type R035FuyiTarget = 'DAY_MASTER' | 'MONTH_ORDER';
export type R035FuyiDirection = 'SUPPORT' | 'SUPPRESS';

export interface R035FuyiDecisionProposition {
  id: string;
  target: R035FuyiTarget;
  sourceCondition: string;
  direction: R035FuyiDirection;
  candidateFamilies: readonly string[];
  executable: false;
}

export const R035_FUIYI_PROPOSITIONS: readonly R035FuyiDecisionProposition[] = Object.freeze([
  {
    id: 'day-master-strong-suppress',
    target: 'DAY_MASTER',
    sourceCondition: '日元強',
    direction: 'SUPPRESS',
    candidateFamilies: ['官煞以剋之', '食傷以洩之'],
    executable: false,
  },
  {
    id: 'day-master-weak-support',
    target: 'DAY_MASTER',
    sourceCondition: '日元弱',
    direction: 'SUPPORT',
    candidateFamilies: ['印以生之', '劫以助之'],
    executable: false,
  },
  {
    id: 'month-order-too-strong-suppress',
    target: 'MONTH_ORDER',
    sourceCondition: '月令之神太強',
    direction: 'SUPPRESS',
    candidateFamilies: [],
    executable: false,
  },
  {
    id: 'month-order-too-weak-support',
    target: 'MONTH_ORDER',
    sourceCondition: '月令之神太弱',
    direction: 'SUPPORT',
    candidateFamilies: [],
    executable: false,
  },
]);

export const R035_DIRECT_SOURCE_PHRASES = Object.freeze([
  '日元強者抑之，日元弱者扶之，此以扶抑為用神也',
  '月令之神太強則抑之，月令之神太弱則扶之，此以扶抑月令為用神也',
  '扶有二，印以生之，劫以助之是也',
  '抑亦有二，官煞以剋之，食傷以洩之是也',
] as const);

export const R035_EXECUTION_GAPS = Object.freeze([
  'FINAL_BODY_STRENGTH',
  'MONTH_ORDER_RELATIVE_STRENGTH',
  'FUIYI_APPLICABILITY',
  'CANDIDATE_SELECTION_WITHIN_SUPPORT_OR_SUPPRESSION',
  'CROSS_METHOD_RECONCILIATION',
  'XI_YONG_JI_ROLE_ASSIGNMENT',
] as const);

export const R035_FORBIDDEN_SHORTCUTS = Object.freeze([
  'SEASON_IDENTITY_AS_FINAL_BODY_STRENGTH',
  'RESOURCE_OR_PEER_PRESENCE_AS_AUTOMATIC_SUPPORT_YONGSHEN',
  'OFFICER_KILL_OR_OUTPUT_PRESENCE_AS_AUTOMATIC_SUPPRESS_YONGSHEN',
  'NUMERIC_HIDDEN_STRENGTH_SCORE',
  'CROSS_METHOD_FORCE_SINGLE_WINNER',
] as const);

export const R035_AUTHORITY = Object.freeze({
  sourceFamily: 'XU_COMMENTARY_STRENGTH_FUIYI' as const,
  status: 'VERIFIED_BOUNDED_PROPOSITION_FAMILY' as const,
  executableFuyiResolverAuthorized: false,
  canonicalUniversalYongShenResolverAuthorized: false,
  productionAuthorityPromoted: false,
});
