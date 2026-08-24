import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { IntrinsicRootClass } from './i18c-root-class-evidence.js';

export const I21_SUPPORT_PRECEDENCE_POLICY_VERSION =
  'myeonghwa-day-master-support-precedence-v1';

export type DayMasterSupportEvidenceClass =
  | IntrinsicRootClass
  | 'visible_peer_support'
  | 'visible_resource_support'
  | 'resource_branch_support'
  | 'post_relation_root_state';

export type SupportPrecedenceResult =
  | 'LEFT_PRECEDES'
  | 'RIGHT_PRECEDES'
  | 'NO_AUTHORIZED_ORDER';

export interface SupportPrecedenceRelation {
  higher: DayMasterSupportEvidenceClass;
  lower: DayMasterSupportEvidenceClass;
  scope: 'day_master_same_element_support_only';
  numericMagnitude: 'not_assigned';
}

export interface SupportPrecedencePolicyReport {
  policyId: string;
  policyVersion: string;
  scope: 'day_master_support_methodology_research';
  authorizedRelations: readonly SupportPrecedenceRelation[];
  explicitlyUnorderedClasses: readonly DayMasterSupportEvidenceClass[];
  repeatedEvidenceAggregation: 'not_authorized';
  resourceSupportPrecedence: 'unresolved';
  earthRootPrecedence: 'unresolved';
  postRelationRootPrecedence: 'unresolved';
  supportEffectAuthorized: false;
  relativeForceVerdictAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  sourceBasis: readonly {
    sourceId: string;
    finding: string;
  }[];
  notes: readonly string[];
}

export const I21_SUPPORT_PRECEDENCE_SOURCE_BASIS = Object.freeze([
  {
    sourceId: 'SRC-I21-DITIANSUI-ROOT-PEER-PRECEDENCE-WIKISOURCE',
    finding:
      'The commentary distinguishes heavier longsheng/lu/wang roots from lighter storage/residual roots, states that one residual/storage root can outweigh one visible peer, and that even two visible peers can be less substantial than one longsheng/lu/wang root.',
  },
  {
    sourceId: 'SRC-I18C-XIEJI-FIVE-ELEMENT-GROWTH',
    finding:
      'Cross-reference for root-stage locations; earth-stage disagreement remains unresolved and is excluded from the precedence policy.',
  },
] as const);

const AUTHORIZED_RELATIONS: readonly SupportPrecedenceRelation[] = Object.freeze([
  {
    higher: 'strong_birth_lu_wang_candidate',
    lower: 'residual_storage_candidate',
    scope: 'day_master_same_element_support_only',
    numericMagnitude: 'not_assigned',
  },
  {
    higher: 'strong_birth_lu_wang_candidate',
    lower: 'visible_peer_support',
    scope: 'day_master_same_element_support_only',
    numericMagnitude: 'not_assigned',
  },
  {
    higher: 'residual_storage_candidate',
    lower: 'visible_peer_support',
    scope: 'day_master_same_element_support_only',
    numericMagnitude: 'not_assigned',
  },
]);

const EXPLICITLY_UNORDERED: readonly DayMasterSupportEvidenceClass[] = Object.freeze([
  'earth_root_class_unresolved',
  'visible_resource_support',
  'resource_branch_support',
  'post_relation_root_state',
]);

function finalized(
  material: Omit<SupportPrecedencePolicyReport, 'policyId'>,
): SupportPrecedencePolicyReport {
  return {
    policyId: `support_precedence_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export const I21_SUPPORT_PRECEDENCE_POLICY: SupportPrecedencePolicyReport = Object.freeze(
  finalized({
    policyVersion: I21_SUPPORT_PRECEDENCE_POLICY_VERSION,
    scope: 'day_master_support_methodology_research',
    authorizedRelations: AUTHORIZED_RELATIONS,
    explicitlyUnorderedClasses: EXPLICITLY_UNORDERED,
    repeatedEvidenceAggregation: 'not_authorized',
    resourceSupportPrecedence: 'unresolved',
    earthRootPrecedence: 'unresolved',
    postRelationRootPrecedence: 'unresolved',
    supportEffectAuthorized: false,
    relativeForceVerdictAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    sourceBasis: I21_SUPPORT_PRECEDENCE_SOURCE_BASIS,
    notes: [
      'This is a partial order, not a scoring table.',
      'The ordering applies only to day-master same-element root/peer support described by the cited methodology.',
      'No ordering is generalized to arbitrary clash participants, resource support, earth roots, or post-relation root states.',
      'Repeated evidence is not summed; the source comparisons do not authorize an additive point system.',
    ],
  }),
);

export function compareDayMasterSupportEvidence(
  left: DayMasterSupportEvidenceClass,
  right: DayMasterSupportEvidenceClass,
): SupportPrecedenceResult {
  if (
    AUTHORIZED_RELATIONS.some(
      (relation) => relation.higher === left && relation.lower === right,
    )
  ) {
    return 'LEFT_PRECEDES';
  }
  if (
    AUTHORIZED_RELATIONS.some(
      (relation) => relation.higher === right && relation.lower === left,
    )
  ) {
    return 'RIGHT_PRECEDES';
  }
  return 'NO_AUTHORIZED_ORDER';
}
