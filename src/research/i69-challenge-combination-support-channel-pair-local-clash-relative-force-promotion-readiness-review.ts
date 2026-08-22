import { deterministicContentHash } from '../interpretation/rule-registry.js';

export const I69_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_PAIR_LOCAL_CLASH_RELATIVE_FORCE_PROMOTION_READINESS_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-pair-local-clash-relative-force-promotion-readiness-review-v1';

export interface ChallengeCombinationSupportChannelPairLocalClashRelativeForcePromotionReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  decision: 'PARTIAL_ORDER_PROMOTION_BLOCKED_EFFECTIVE_SUPPORT_EFFECT_UNRESOLVED';
  exactI68ComparativeEvidenceRequiredForFuturePromotion: true;
  trackedEvidencePartialOrderMayInformFutureRelativeForceReview: true;
  trackedEvidencePartialOrderSufficientForRelativeForceVerdict: false;
  dominanceCandidatePromotableToRelativeForceWinner: false;
  evidenceEquivalencePromotableToRelativeForceTie: false;
  seasonalPhaseAdvantageSufficientForRelativeForceVerdict: false;
  supportSignalSetInclusionSufficientForEffectiveSupportVerdict: false;
  supportSignalPresenceSufficientForEffectiveSupportVerdict: false;
  supportCategoryWeightingAuthorized: false;
  supportPositionCountAggregationAuthorized: false;
  i21DayMasterSameElementPrecedenceReusableForArbitraryClashParticipantSupport: false;
  i22DayMasterSupportFrontierReusableForArbitraryClashParticipantSupport: false;
  i51NetSupportInterferenceEffectAuthorityAvailable: false;
  clashParticipantEffectiveSupportEffectResolved: false;
  pairLocalClashSupportEffectMethodologyRequired: true;
  pairLocalClashSupportEffectEvidenceRequiredAfterMethodology: true;
  relativeForcePromotionAuthorized: false;
  relativeForceVerdict: 'not_determined';
  clashWinnerVerdictAuthorized: false;
  rescueEffectAuthorized: false;
  clashSettlementAuthorized: false;
  crossRelationPrecedenceAuthorized: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  authorityBasis: readonly {
    authorityRef: string;
    finding: string;
  }[];
  requiredNextImplementationGuards: readonly string[];
  notes: readonly string[];
}

const AUTHORITY_BASIS = Object.freeze([
  {
    authorityRef: 'I67 / I68',
    finding:
      'Tracked seasonal order plus qualitative support-signal set inclusion may be materialized as a conservative partial order, but dominance/equivalence are explicitly not relative-force verdicts or ties.',
  },
  {
    authorityRef: 'I20c',
    finding:
      'Named support categories remain structural context only; support effect, relative force, clash winner, and numeric weight are withheld.',
  },
  {
    authorityRef: 'I21 / I22',
    finding:
      'The existing support precedence/frontier authority is scoped to day-master same-element support. It explicitly does not generalize to arbitrary clash participants or resource-support composition.',
  },
  {
    authorityRef: 'I51',
    finding:
      'Support direction and channel presence are source-bounded structural concepts, while activation, persistence through clash, fixed precedence, net support/interference effect, weighting, and scoring remain blocked.',
  },
] as const);

const NEXT_GUARDS = Object.freeze([
  'Require exact I68 relation/participant identity before any later promotion review; do not promote a generic I67 rule without current-chart evidence.',
  'Do not reinterpret FIRST/SECOND_TRACKED_EVIDENCE_DOMINANCE_CANDIDATE as a final relative-force winner.',
  'Do not reinterpret TRACKED_EVIDENCE_EQUIVALENT as an equal-force verdict.',
  'Do not import I21/I22 day-master same-element precedence into arbitrary clash participants or resource-support categories.',
  'A next methodology may address pair-local clash-participant effective support only if it preserves support categories and source identities without additive counts or numeric weights.',
  'Support-channel presence must remain distinct from activation and persistence through the exact clash/combination topology.',
  'Do not emit clash winner, rescue effect, clash settlement, post-relation root state, effective mechanism force, usefulness/harmfulness, numeric scoring, or strong/weak classification.',
] as const);

export function buildI69ChallengeCombinationSupportChannelPairLocalClashRelativeForcePromotionReadinessReview(): ChallengeCombinationSupportChannelPairLocalClashRelativeForcePromotionReadinessReviewReport {
  const material = {
    reviewVersion:
      I69_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_PAIR_LOCAL_CLASH_RELATIVE_FORCE_PROMOTION_READINESS_REVIEW_VERSION,
    decision:
      'PARTIAL_ORDER_PROMOTION_BLOCKED_EFFECTIVE_SUPPORT_EFFECT_UNRESOLVED' as const,
    exactI68ComparativeEvidenceRequiredForFuturePromotion: true as const,
    trackedEvidencePartialOrderMayInformFutureRelativeForceReview: true as const,
    trackedEvidencePartialOrderSufficientForRelativeForceVerdict: false as const,
    dominanceCandidatePromotableToRelativeForceWinner: false as const,
    evidenceEquivalencePromotableToRelativeForceTie: false as const,
    seasonalPhaseAdvantageSufficientForRelativeForceVerdict: false as const,
    supportSignalSetInclusionSufficientForEffectiveSupportVerdict: false as const,
    supportSignalPresenceSufficientForEffectiveSupportVerdict: false as const,
    supportCategoryWeightingAuthorized: false as const,
    supportPositionCountAggregationAuthorized: false as const,
    i21DayMasterSameElementPrecedenceReusableForArbitraryClashParticipantSupport: false as const,
    i22DayMasterSupportFrontierReusableForArbitraryClashParticipantSupport: false as const,
    i51NetSupportInterferenceEffectAuthorityAvailable: false as const,
    clashParticipantEffectiveSupportEffectResolved: false as const,
    pairLocalClashSupportEffectMethodologyRequired: true as const,
    pairLocalClashSupportEffectEvidenceRequiredAfterMethodology: true as const,
    relativeForcePromotionAuthorized: false as const,
    relativeForceVerdict: 'not_determined' as const,
    clashWinnerVerdictAuthorized: false as const,
    rescueEffectAuthorized: false as const,
    clashSettlementAuthorized: false as const,
    crossRelationPrecedenceAuthorized: false as const,
    targetPostRelationRootState: 'not_determined' as const,
    effectiveMechanismForceVerdict: 'not_determined' as const,
    relationSpecificUsefulnessHarmfulness: 'not_determined' as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    authorityBasis: AUTHORITY_BASIS,
    requiredNextImplementationGuards: NEXT_GUARDS,
    notes: [
      'I69 audits promotion readiness rather than emitting another comparative evidence state.',
      'The I68 partial order is informative topology, but the observed support categories do not yet have an authorized participant-local effective-support semantics.',
      'Existing I21/I22 precedence cannot fill this gap because its source scope is day-master same-element support and explicitly excludes arbitrary clash participants/resource support.',
      'Existing I51 likewise stops at support direction/presence and withholds net effect, activation, persistence, and fixed support precedence.',
      'Therefore no I68 dominance or equivalence state can be promoted to relative force at this gate.',
    ],
  };

  return {
    reviewId: `challenge_combination_support_channel_pair_local_clash_relative_force_promotion_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
