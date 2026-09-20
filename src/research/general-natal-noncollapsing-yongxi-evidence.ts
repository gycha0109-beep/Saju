export const R040_NONCOLLAPSING_EVIDENCE_VERSION = '0.1.0-research' as const;

export type R040MethodologyFamily =
  | 'GEJU'
  | 'STRENGTH_FUIYI'
  | 'CLIMATE_TIAOHOU'
  | 'FLOW_TONGGUAN'
  | 'BINGYAO'
  | 'SPECIAL_FOLLOW';

export type R040EvidenceRole =
  | 'PRIMARY_USE'
  | 'XI_SHEN'
  | 'JI_SHEN'
  | 'CLIMATE_REQUIREMENT'
  | 'TONGGUAN_REQUIREMENT'
  | 'BINGYAO_DISEASE'
  | 'BINGYAO_REMEDY_USE'
  | 'SPECIAL_TRANSITION_REQUIREMENT';

export type R040ApplicabilityState =
  | 'APPLICABLE'
  | 'NOT_APPLICABLE'
  | 'UNRESOLVED';

export type R040AuthorityState =
  | 'VERIFIED_BOUNDED'
  | 'RESEARCH_ONLY'
  | 'UNRESOLVED';

export type R040EvidenceRelation =
  | 'COEXISTING_DIFFERENT_ROLES'
  | 'TRUE_CONFLICT_UNRESOLVED'
  | 'METHOD_NOT_APPLICABLE'
  | 'INDETERMINATE';

export interface R040YongXiEvidenceItem {
  evidenceId: string;
  methodologyFamily: R040MethodologyFamily;
  sourceStratum: string;
  sourceRef: string;
  role: R040EvidenceRole;
  value: string;
  applicabilityState: R040ApplicabilityState;
  authorityState: R040AuthorityState;
  evidenceRefs: readonly string[];
  scenarioRef?: string;
  methodologyVersion?: string;
}

export interface R040YongXiEvidenceEnvelope {
  envelopeId: string;
  items: readonly R040YongXiEvidenceItem[];
  relation: R040EvidenceRelation;
  forceSingleWinner: false;
  executable: false;
}

export const R040_FORBIDDEN_COLLAPSES = Object.freeze([
  'ARRAY_ORDER_AS_WINNER',
  'METHOD_COUNT_AS_CONFIDENCE_WINNER',
  'CLIMATE_REQUIREMENT_AS_PRIMARY_USE',
  'XI_SHEN_AS_FINAL_YONGSHEN',
  'JI_SHEN_AS_FIXED_BAD_ELEMENT',
  'UNRESOLVED_CONFLICT_AUTO_TIEBREAK',
  'NUMERIC_METHOD_PRIORITY_SCORE',
] as const);

export const R040_AUTHORITY = Object.freeze({
  status: 'RESEARCH_EVIDENCE_MODEL_DEFINED' as const,
  finalYongShenFieldAuthorized: false,
  methodWinnerResolverAuthorized: false,
  chartRoleAssignmentAuthorized: false,
  productionAuthorityPromoted: false,
});
