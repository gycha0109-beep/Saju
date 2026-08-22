import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ClashSupportContextSignal } from './i20c-clash-support-context.js';
import type { SeasonalElementPhase } from './i20-relative-force-evidence.js';

export const I67_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_PAIR_LOCAL_CLASH_RELATIVE_FORCE_SETTLEMENT_METHODOLOGY_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-pair-local-clash-relative-force-settlement-methodology-review-v1';

export type I67SupportSignalSetRelation =
  | 'EQUAL_TRACKED_SUPPORT_SIGNAL_SET'
  | 'FIRST_STRICT_TRACKED_SUPPORT_SIGNAL_SUPERSET'
  | 'SECOND_STRICT_TRACKED_SUPPORT_SIGNAL_SUPERSET'
  | 'INCOMPARABLE_TRACKED_SUPPORT_SIGNAL_SETS';

export type I67TrackedClashEvidencePartialOrderState =
  | 'FIRST_TRACKED_EVIDENCE_DOMINANCE_CANDIDATE'
  | 'SECOND_TRACKED_EVIDENCE_DOMINANCE_CANDIDATE'
  | 'TRACKED_EVIDENCE_EQUIVALENT'
  | 'TRACKED_EVIDENCE_INCOMPARABLE';

export interface ChallengeCombinationSupportChannelPairLocalClashRelativeForceSettlementMethodologyReviewReport {
  reviewId: string;
  reviewVersion: string;
  decision: 'TRACKED_EVIDENCE_PARTIAL_ORDER_COMPARISON_AUTHORIZED_FINAL_RELATIVE_FORCE_VERDICT_BLOCKED';
  exactPairLocalClashIdentityRequired: true;
  seasonalPhaseOrdinalComparisonAuthorized: true;
  seasonalAdvantageAloneSufficientForRelativeForceVerdict: false;
  supportSignalPresenceProjectionAuthorized: true;
  noTrackedSupportContextTreatedAsEmptySignalSet: true;
  supportSignalSetInclusionComparisonAuthorized: true;
  supportSignalCategoryWeightingAuthorized: false;
  supportPositionCountComparisonAuthorized: false;
  supportMagnitudeInferenceAuthorized: false;
  supportEffectResolutionAuthorized: false;
  trackedEvidencePartialOrderClassificationAuthorized: true;
  trackedEvidenceDominanceCandidateIsRelativeForceVerdict: false;
  trackedEvidenceEquivalentIsRelativeForceTieVerdict: false;
  trackedEvidenceIncomparableMayBeForcedToWinner: false;
  clashWinnerVerdictAuthorized: false;
  relativeForceVerdictAuthorized: false;
  rescueEffectAuthorized: false;
  clashSettlementAuthorized: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  crossRelationPrecedenceAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  seasonalPhaseOrder: readonly SeasonalElementPhase[];
  trackedSupportSignalUniverse: readonly Exclude<ClashSupportContextSignal, 'NO_TRACKED_SUPPORT_CONTEXT'>[];
  supportSetRelationRules: readonly {
    relation: I67SupportSignalSetRelation;
    condition: string;
  }[];
  partialOrderRules: readonly {
    state: I67TrackedClashEvidencePartialOrderState;
    condition: string;
  }[];
  authorityBasis: readonly {
    authorityRef: string;
    finding: string;
  }[];
  requiredNextImplementationGuards: readonly string[];
  notes: readonly string[];
}

const SEASONAL_PHASE_ORDER = Object.freeze([
  '旺',
  '相',
  '休',
  '囚',
  '死',
] as const satisfies readonly SeasonalElementPhase[]);

const TRACKED_SUPPORT_SIGNAL_UNIVERSE = Object.freeze([
  'SAME_PILLAR_VISIBLE_SAME_ELEMENT_SUPPORT',
  'EXTERNAL_VISIBLE_SAME_ELEMENT_SUPPORT',
  'VISIBLE_RESOURCE_SUPPORT',
  'ADDITIONAL_SAME_ELEMENT_BRANCH_SUPPORT',
  'RESOURCE_BRANCH_SUPPORT',
] as const satisfies readonly Exclude<ClashSupportContextSignal, 'NO_TRACKED_SUPPORT_CONTEXT'>[]);

const SUPPORT_SET_RELATION_RULES = Object.freeze([
  {
    relation: 'EQUAL_TRACKED_SUPPORT_SIGNAL_SET' as const,
    condition:
      'after removing NO_TRACKED_SUPPORT_CONTEXT, both participants expose exactly the same tracked support-signal categories',
  },
  {
    relation: 'FIRST_STRICT_TRACKED_SUPPORT_SIGNAL_SUPERSET' as const,
    condition:
      'the first participant contains every tracked support-signal category of the second and at least one additional category',
  },
  {
    relation: 'SECOND_STRICT_TRACKED_SUPPORT_SIGNAL_SUPERSET' as const,
    condition:
      'the second participant contains every tracked support-signal category of the first and at least one additional category',
  },
  {
    relation: 'INCOMPARABLE_TRACKED_SUPPORT_SIGNAL_SETS' as const,
    condition:
      'each participant has at least one tracked support-signal category absent from the other',
  },
] as const);

const PARTIAL_ORDER_RULES = Object.freeze([
  {
    state: 'FIRST_TRACKED_EVIDENCE_DOMINANCE_CANDIDATE' as const,
    condition:
      'first seasonal phase is no lower than second, first support-signal set is equal or a strict superset, and at least one of those two dimensions is strictly stronger in the tracked evidence topology',
  },
  {
    state: 'SECOND_TRACKED_EVIDENCE_DOMINANCE_CANDIDATE' as const,
    condition:
      'second seasonal phase is no lower than first, second support-signal set is equal or a strict superset, and at least one of those two dimensions is strictly stronger in the tracked evidence topology',
  },
  {
    state: 'TRACKED_EVIDENCE_EQUIVALENT' as const,
    condition:
      'seasonal phases are equal and the tracked support-signal category sets are equal',
  },
  {
    state: 'TRACKED_EVIDENCE_INCOMPARABLE' as const,
    condition:
      'seasonal advantage and support-set inclusion point in different directions, support-signal sets are incomparable, or neither participant dominates on every tracked comparison dimension',
  },
] as const);

const AUTHORITY_BASIS = Object.freeze([
  {
    authorityRef: 'I20 / I20b',
    finding:
      'The source-backed 旺/相/休/囚/死 seasonal ordering can identify a seasonal-advantage candidate, but I20b explicitly withholds the relative-force verdict and clash winner because whole-chart support context remains relevant.',
  },
  {
    authorityRef: 'I20c',
    finding:
      'I20c preserves named support categories and explicitly prohibits counting, summing, or weighting them; roots and visible peer/resource support remain qualitatively distinct evidence categories.',
  },
  {
    authorityRef: 'I49 / I50',
    finding:
      'Seasonal disposition is categorical evidence only. Participant dispositions must not be aggregated, weighted, or converted directly into relation outcome or effective force.',
  },
  {
    authorityRef: 'I33 / I65',
    finding:
      'Exact clash identity and participant-local seasonal/support substrate can be aligned to a dispatched pair, while relative force, rescue, clash settlement, post-relation root state, and effective mechanism force remain unresolved.',
  },
] as const);

const NEXT_GUARDS = Object.freeze([
  'A next adapter may classify only the partial order of tracked evidence for one exact dispatched clash relation and its two exact participants.',
  'Normalize NO_TRACKED_SUPPORT_CONTEXT to the empty tracked-support set; never treat it as an additional support category.',
  'Support comparison may use only category-set equality or strict set inclusion. Do not compare the number of supporting positions or assign weights among support categories.',
  'Use the traditional seasonal phase order only as an ordinal evidence dimension; do not convert it into points, distances, percentages, or a standalone relative-force verdict.',
  'A tracked-evidence dominance candidate is not a final relative-force verdict, clash winner, support effect, rescue effect, or clash settlement outcome.',
  'If seasonal and support dimensions conflict or support sets are incomparable, preserve TRACKED_EVIDENCE_INCOMPARABLE rather than forcing a winner.',
  'Do not aggregate evidence or outcomes across multiple clash relations and do not infer cross-relation precedence.',
  'Do not emit post-relation root state, effective mechanism force, usefulness/harmfulness, numeric scoring, or strong/weak classification.',
] as const);

export function buildI67ChallengeCombinationSupportChannelPairLocalClashRelativeForceSettlementMethodologyReview(): ChallengeCombinationSupportChannelPairLocalClashRelativeForceSettlementMethodologyReviewReport {
  const material = {
    reviewVersion:
      I67_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_PAIR_LOCAL_CLASH_RELATIVE_FORCE_SETTLEMENT_METHODOLOGY_REVIEW_VERSION,
    decision:
      'TRACKED_EVIDENCE_PARTIAL_ORDER_COMPARISON_AUTHORIZED_FINAL_RELATIVE_FORCE_VERDICT_BLOCKED' as const,
    exactPairLocalClashIdentityRequired: true as const,
    seasonalPhaseOrdinalComparisonAuthorized: true as const,
    seasonalAdvantageAloneSufficientForRelativeForceVerdict: false as const,
    supportSignalPresenceProjectionAuthorized: true as const,
    noTrackedSupportContextTreatedAsEmptySignalSet: true as const,
    supportSignalSetInclusionComparisonAuthorized: true as const,
    supportSignalCategoryWeightingAuthorized: false as const,
    supportPositionCountComparisonAuthorized: false as const,
    supportMagnitudeInferenceAuthorized: false as const,
    supportEffectResolutionAuthorized: false as const,
    trackedEvidencePartialOrderClassificationAuthorized: true as const,
    trackedEvidenceDominanceCandidateIsRelativeForceVerdict: false as const,
    trackedEvidenceEquivalentIsRelativeForceTieVerdict: false as const,
    trackedEvidenceIncomparableMayBeForcedToWinner: false as const,
    clashWinnerVerdictAuthorized: false as const,
    relativeForceVerdictAuthorized: false as const,
    rescueEffectAuthorized: false as const,
    clashSettlementAuthorized: false as const,
    targetPostRelationRootState: 'not_determined' as const,
    effectiveMechanismForceVerdict: 'not_determined' as const,
    relationSpecificUsefulnessHarmfulness: 'not_determined' as const,
    crossRelationPrecedenceAuthorized: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    seasonalPhaseOrder: SEASONAL_PHASE_ORDER,
    trackedSupportSignalUniverse: TRACKED_SUPPORT_SIGNAL_UNIVERSE,
    supportSetRelationRules: SUPPORT_SET_RELATION_RULES,
    partialOrderRules: PARTIAL_ORDER_RULES,
    authorityBasis: AUTHORITY_BASIS,
    requiredNextImplementationGuards: NEXT_GUARDS,
    notes: [
      'I67 authorizes a conservative partial-order classification over tracked evidence dimensions, not a relative-force verdict.',
      'Seasonal phase contributes one ordinal dimension. Support contributes only a set of named qualitative signal categories; set inclusion is used solely to identify whether one participant contains every support category observed for the other without weighting categories or counting positions.',
      'The partial order intentionally produces INCOMPARABLE whenever tracked dimensions conflict or qualitative support sets are not nested.',
      'Even a dominance candidate remains evidence topology because unmodeled support effect, rescue, other relations, and post-relation consequences remain unresolved.',
    ],
  };

  return {
    reviewId: `challenge_combination_support_channel_pair_local_clash_relative_force_methodology_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
