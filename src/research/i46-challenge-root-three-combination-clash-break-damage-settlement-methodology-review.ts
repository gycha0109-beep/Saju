import { deterministicContentHash } from '../interpretation/rule-registry.js';

export const I46_CHALLENGE_ROOT_THREE_COMBINATION_CLASH_BREAK_DAMAGE_SETTLEMENT_METHODOLOGY_REVIEW_VERSION =
  'myeonghwa-challenge-root-three-combination-clash-break-damage-settlement-methodology-review-v1';

export type ThreeCombinationClashPlacementClass =
  | 'EMBEDDED_WITHIN_BUREAU_SPAN_TIGHT_TO_CLASHED_PARTICIPANT'
  | 'EMBEDDED_WITHIN_BUREAU_SPAN_NOT_TIGHT'
  | 'OUTSIDE_BUREAU_SPAN_TIGHT_TO_CLASHED_PARTICIPANT'
  | 'OUTSIDE_BUREAU_SPAN_NOT_TIGHT'
  | 'NO_TRACKED_CLASH';

export type ThreeCombinationClashSettlementPolicyState =
  | 'BREAK_AUTHORIZED'
  | 'CONTEXTUAL_INTACT_OR_DAMAGED_UNRESOLVED'
  | 'NO_DIRECT_SETTLEMENT_FROM_THIS_RULE';

export interface ChallengeRootThreeCombinationClashBreakDamageSettlementMethodologyReviewReport {
  reviewId: string;
  reviewVersion: string;
  decision: 'TIGHT_EMBEDDED_CLASH_BREAK_AUTHORIZED_OTHER_SETTLEMENT_STATES_CONTEXTUAL';
  structuralBureauFormationRequiredBeforeSettlement: true;
  trackedClashTopologyRequiredForClashSettlement: true;
  placementClassificationAuthorized: true;
  bureauSpanDefinitionAuthorized: true;
  tightAdjacencyDefinitionAuthorized: true;
  tightEmbeddedClashBreakVerdictAuthorized: true;
  tightEmbeddedClashBreakVerdict: 'BROKEN_BY_TIGHT_EMBEDDED_CLASH';
  embeddedNonTightDeterministicDamageVerdictAuthorized: false;
  outsideTightDeterministicDamageVerdictAuthorized: false;
  outsideNonTightDeterministicSettlementAuthorized: false;
  noTrackedClashIntactVerdictAuthorized: false;
  damagedBureauMagnitudeClassificationAuthorized: false;
  multipleClashAggregationAuthorized: false;
  clashForceWeightingAuthorized: false;
  seasonalOverrideOfTightEmbeddedBreakResolved: false;
  supportOverrideOfTightEmbeddedBreakResolved: false;
  postInteractionBureauStateEmissionAuthorizedForTightEmbeddedBreakOnly: true;
  genericPostInteractionBureauStateEmissionAuthorized: false;
  effectiveMechanismForceVerdict: 'not_determined';
  targetPostRelationRootState: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  placementPolicies: readonly {
    placement: ThreeCombinationClashPlacementClass;
    settlement: ThreeCombinationClashSettlementPolicyState;
    deterministicBureauState?: 'BROKEN_BY_TIGHT_EMBEDDED_CLASH';
  }[];
  sourceBasis: readonly {
    sourceId: string;
    supportType: 'direct_break_rule' | 'contextual_limit' | 'anti_generalization';
    finding: string;
  }[];
  requiredNextImplementationGuards: readonly string[];
  notes: readonly string[];
}

export const I46_CHALLENGE_ROOT_THREE_COMBINATION_SOURCE_BASIS = Object.freeze([
  {
    sourceId: 'SRC-METHOD-DITIANSUI-CHANWEI-FANGJU-TIGHT-EMBEDDED-CLASH',
    supportType: 'direct_break_rule' as const,
    finding:
      'In the full three-combination discussion, a clash branch mixed within the bureau and tightly adjacent to the bureau participant it clashes is explicitly treated as breaking the bureau.',
  },
  {
    sourceId: 'SRC-METHOD-DITIANSUI-CHANWEI-FANGJU-NONTIGHT-OR-OUTSIDE',
    supportType: 'contextual_limit' as const,
    finding:
      'When the clash branch is within the bureau arrangement but not tightly adjacent, or is outside the bureau arrangement while tightly adjacent, the source directs the reader to consider both the assembled bureau and a damaged bureau rather than issuing one deterministic break/damage result.',
  },
  {
    sourceId: 'SRC-T0-SANMING-TONGHUI-V2-CHONGJI',
    supportType: 'anti_generalization' as const,
    finding:
      'The Chongji discussion states that clash can produce benefit or harm depending on context and must not be generalized into one universal destructive result.',
  },
] as const);

const PLACEMENT_POLICIES = Object.freeze([
  {
    placement: 'EMBEDDED_WITHIN_BUREAU_SPAN_TIGHT_TO_CLASHED_PARTICIPANT' as const,
    settlement: 'BREAK_AUTHORIZED' as const,
    deterministicBureauState: 'BROKEN_BY_TIGHT_EMBEDDED_CLASH' as const,
  },
  {
    placement: 'EMBEDDED_WITHIN_BUREAU_SPAN_NOT_TIGHT' as const,
    settlement: 'CONTEXTUAL_INTACT_OR_DAMAGED_UNRESOLVED' as const,
  },
  {
    placement: 'OUTSIDE_BUREAU_SPAN_TIGHT_TO_CLASHED_PARTICIPANT' as const,
    settlement: 'CONTEXTUAL_INTACT_OR_DAMAGED_UNRESOLVED' as const,
  },
  {
    placement: 'OUTSIDE_BUREAU_SPAN_NOT_TIGHT' as const,
    settlement: 'NO_DIRECT_SETTLEMENT_FROM_THIS_RULE' as const,
  },
  {
    placement: 'NO_TRACKED_CLASH' as const,
    settlement: 'NO_DIRECT_SETTLEMENT_FROM_THIS_RULE' as const,
  },
] as const);

const NEXT_IMPLEMENTATION_GUARDS = Object.freeze([
  'Require aligned I45 STRUCTURAL_BUREAU_FORMED evidence before any I46-derived clash settlement can be applied.',
  'Classify the non-bureau clash participant as embedded within or outside the min/max pillar span occupied by the three bureau participants; do not redefine structural bureau formation from this placement.',
  'Treat tightness only as immediate pillar adjacency between the clash counterpart and the bureau participant it directly clashes.',
  'Emit BROKEN_BY_TIGHT_EMBEDDED_CLASH only for the source-bounded embedded+tight case.',
  'For embedded but non-tight or outside but tight cases, preserve the contextual intact-versus-damaged question; do not manufacture a deterministic DAMAGED state.',
  'For outside and non-tight or no tracked clash, emit no bureau-intactness conclusion from I46; absence of this break rule is not proof of intactness.',
  'Do not aggregate multiple clashes, assign clash weights, or allow seasonal/support evidence to numerically override the direct break rule without a later dedicated methodology gate.',
  'Do not convert bureau breakage into target root destruction, effective mechanism force, usefulness/harmfulness, numeric scoring, or strong/weak classification.',
] as const);

export function buildI46ChallengeRootThreeCombinationClashBreakDamageSettlementMethodologyReview(): ChallengeRootThreeCombinationClashBreakDamageSettlementMethodologyReviewReport {
  const material = {
    reviewVersion:
      I46_CHALLENGE_ROOT_THREE_COMBINATION_CLASH_BREAK_DAMAGE_SETTLEMENT_METHODOLOGY_REVIEW_VERSION,
    decision: 'TIGHT_EMBEDDED_CLASH_BREAK_AUTHORIZED_OTHER_SETTLEMENT_STATES_CONTEXTUAL' as const,
    structuralBureauFormationRequiredBeforeSettlement: true as const,
    trackedClashTopologyRequiredForClashSettlement: true as const,
    placementClassificationAuthorized: true as const,
    bureauSpanDefinitionAuthorized: true as const,
    tightAdjacencyDefinitionAuthorized: true as const,
    tightEmbeddedClashBreakVerdictAuthorized: true as const,
    tightEmbeddedClashBreakVerdict: 'BROKEN_BY_TIGHT_EMBEDDED_CLASH' as const,
    embeddedNonTightDeterministicDamageVerdictAuthorized: false as const,
    outsideTightDeterministicDamageVerdictAuthorized: false as const,
    outsideNonTightDeterministicSettlementAuthorized: false as const,
    noTrackedClashIntactVerdictAuthorized: false as const,
    damagedBureauMagnitudeClassificationAuthorized: false as const,
    multipleClashAggregationAuthorized: false as const,
    clashForceWeightingAuthorized: false as const,
    seasonalOverrideOfTightEmbeddedBreakResolved: false as const,
    supportOverrideOfTightEmbeddedBreakResolved: false as const,
    postInteractionBureauStateEmissionAuthorizedForTightEmbeddedBreakOnly: true as const,
    genericPostInteractionBureauStateEmissionAuthorized: false as const,
    effectiveMechanismForceVerdict: 'not_determined' as const,
    targetPostRelationRootState: 'not_determined' as const,
    relationSpecificUsefulnessHarmfulness: 'not_determined' as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    placementPolicies: PLACEMENT_POLICIES,
    sourceBasis: I46_CHALLENGE_ROOT_THREE_COMBINATION_SOURCE_BASIS,
    requiredNextImplementationGuards: NEXT_IMPLEMENTATION_GUARDS,
    notes: [
      'I46 authorizes exactly one deterministic full-three clash settlement: a clash counterpart embedded within the bureau span and immediately adjacent to the bureau participant it clashes may emit BROKEN_BY_TIGHT_EMBEDDED_CLASH.',
      'The source does not authorize a generic clash-equals-break rule; embedded non-tight and outside tight cases remain contextual intact-versus-damaged questions.',
      'Outside non-tight and no-tracked-clash cases receive no intactness verdict from this rule because absence of the direct break condition is not evidence that no other interaction can damage the bureau.',
      'Seasonal command and support/interference remain relevant to challenge-force interpretation but I46 does not authorize them as numeric weights or override rules for clash settlement.',
      'A broken bureau state remains separate from challenge-root destruction, post-relation root state, effective mechanism force, usefulness/harmfulness, scoring, and classification.',
    ],
  };

  return {
    reviewId: `challenge_root_three_combination_clash_settlement_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
