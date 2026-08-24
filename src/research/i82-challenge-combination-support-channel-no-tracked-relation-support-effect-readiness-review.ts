import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  buildI51ChallengeCombinationSupportInterferenceEffectMethodologyReview,
  type ChallengeCombinationSupportInterferenceEffectMethodologyReviewReport,
} from './i51-challenge-combination-support-interference-effect-methodology-review.js';
import {
  buildI53ChallengeCombinationSupportChannelActivationPersistenceMethodologyReview,
  type ChallengeCombinationSupportChannelActivationPersistenceMethodologyReviewReport,
} from './i53-challenge-combination-support-channel-activation-persistence-methodology-review.js';
import type {
  ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyResolutionReadinessReviewReport,
  I75SupportSourceDependencyResolutionReadinessItem,
} from './i75-challenge-combination-support-channel-pair-local-clash-participant-support-source-settlement-dependency-resolution-readiness-review.js';

export const I82_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_NO_TRACKED_RELATION_SUPPORT_EFFECT_READINESS_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-no-tracked-relation-support-effect-readiness-review-v1';

export type I82NoTrackedRelationSupportEffectReadiness =
  | 'NOT_APPLICABLE_RELATION_SETTLEMENT_DEPENDENCY_REMAINS'
  | 'RELATION_SETTLEMENT_DEPENDENCY_CLEARED_EFFECT_AUTHORITY_INSUFFICIENT';

export interface I82NoTrackedRelationSupportEffectReadinessItem {
  mechanism: string;
  evaluatedClashRelationId: string;
  participantRole: I75SupportSourceDependencyResolutionReadinessItem['participantRole'];
  participantPosition: I75SupportSourceDependencyResolutionReadinessItem['participantPosition'];
  participantBranch: string;
  sourcePillar: I75SupportSourceDependencyResolutionReadinessItem['sourcePillar'];
  sourceComponent: I75SupportSourceDependencyResolutionReadinessItem['sourceComponent'];
  sourceValue: string;
  upstreamReadiness: I75SupportSourceDependencyResolutionReadinessItem['readiness'];
  readiness: I82NoTrackedRelationSupportEffectReadiness;
  relationSettlementDependencyCleared: boolean;
  trackedDirectContestAbsent: boolean;
  supportDirectionMayBePreservedAsEvidence: boolean;
  currentAuthoritySufficientForSourceActivation: false;
  currentAuthoritySufficientForSourcePersistence: false;
  currentAuthoritySufficientForEffectiveSupport: false;
  sourceActive: 'not_determined';
  sourcePersisted: 'not_determined';
  effectiveSupportEffect: 'not_resolved';
  relativeForceVerdict: 'not_determined';
  numericWeight: 'not_assigned';
}

export interface ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_NO_TRACKED_RELATION_SUPPORT_EFFECT_READINESS'
    | 'I75_UNRESOLVED_OR_INVALID'
    | 'I51_METHODOLOGY_NOT_CANONICAL'
    | 'I53_METHODOLOGY_NOT_CANONICAL';
  decision: 'NO_TRACKED_RELATION_TOUCH_CLEARS_RELATION_SETTLEMENT_DEPENDENCY_NOT_ACTIVATION_PERSISTENCE_EFFECT';
  upstreamI75ReviewId: string;
  upstreamI51ReviewId: string;
  upstreamI53ReviewId: string;
  items: readonly I82NoTrackedRelationSupportEffectReadinessItem[];
  noTrackedRelationPathObserved: boolean;
  relationSettlementIndependenceMayBePreserved: true;
  supportDirectionMayBePreservedWithoutMagnitude: true;
  noTrackedRelationTouchMeansActivated: false;
  noTrackedRelationTouchMeansPersistent: false;
  noTrackedRelationTouchMeansEffectiveSupport: false;
  absenceOfTrackedContestMayBeTreatedAsPositiveSettlementOutcome: false;
  preInteractionSupportPresenceMaySubstituteForPostInteractionEffect: false;
  supportChannelMultiplicityMagnitudeInferenceAuthorized: false;
  supportChannelAggregationAuthorized: false;
  sourceActivationVerdictAuthorized: false;
  sourcePersistenceVerdictAuthorized: false;
  sourceEffectiveSupportVerdictAuthorized: false;
  effectiveSupportToRelativeForceAuthorized: false;
  relativeForceVerdictAuthorized: false;
  clashWinnerVerdictAuthorized: false;
  rescueEffectAuthorized: false;
  clashSettlementAuthorized: false;
  crossRelationPrecedenceAuthorized: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  authorityGap: 'UNIVERSAL_UNTOUCHED_SUPPORT_ACTIVATION_PERSISTENCE_EFFECT_RULE_NOT_ESTABLISHED';
  recommendedNextGate: 'NO_TRACKED_RELATION_SUPPORT_EFFECT_AUTHORITY_GAP_REVIEW';
  notes: readonly string[];
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectReadinessReviewReport, 'reviewId'>,
): ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectReadinessReviewReport {
  return {
    reviewId: `challenge_combination_support_channel_no_touch_effect_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function i75Accepted(
  i75: ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyResolutionReadinessReviewReport,
): boolean {
  return (
    i75.status === 'RESOLVED_DEPENDENCY_RESOLUTION_READINESS' &&
    i75.decision === 'DEPENDENCY_RESOLUTION_PATHS_SEPARATED_NO_GENERIC_RESOLVER_AUTHORIZED' &&
    i75.dependencyResolutionPathsSeparated &&
    i75.genericDependencyResolverAuthorized === false &&
    i75.sameRelationCyclePolicyAuthorized === false &&
    i75.iterativeFixedPointResolutionAuthorized === false &&
    i75.numericConvergenceResolutionAuthorized === false &&
    i75.preInteractionSupportStateSubstitutionAuthorized === false &&
    i75.arbitrarySupportSourceClashSettlementAuthorized === false &&
    i75.arbitrarySupportSourceCombinationSettlementAuthorized === false &&
    i75.crossRelationPrecedenceAuthorized === false &&
    i75.sourceActivationVerdictAuthorized === false &&
    i75.sourcePersistenceVerdictAuthorized === false &&
    i75.sourceEffectiveSupportVerdictAuthorized === false &&
    i75.relativeForceVerdictAuthorized === false &&
    i75.clashWinnerVerdictAuthorized === false &&
    i75.rescueEffectAuthorized === false &&
    i75.clashSettlementAuthorized === false &&
    i75.targetPostRelationRootState === 'not_determined' &&
    i75.effectiveMechanismForceVerdict === 'not_determined' &&
    i75.classificationAuthorized === false &&
    i75.numericScoringAuthorized === false &&
    i75.recommendedNextGate === 'NO_TRACKED_RELATION_SUPPORT_EFFECT_READINESS_REVIEW' &&
    i75.items.every(
      (item) =>
        item.currentAuthoritySufficientForEffectiveSupportResolution === false &&
        item.sourceActivationOrPersistenceResolved === false &&
        item.effectiveSupportResolved === false &&
        item.relativeForceVerdict === 'not_determined' &&
        item.numericWeight === 'not_assigned',
    )
  );
}

function i51Canonical(
  i51: ChallengeCombinationSupportInterferenceEffectMethodologyReviewReport,
): boolean {
  const canonical = buildI51ChallengeCombinationSupportInterferenceEffectMethodologyReview();
  return (
    i51.reviewId === canonical.reviewId &&
    i51.decision === 'SUPPORT_CHANNEL_DIRECTION_AUTHORIZED_NET_EFFECT_BLOCKED' &&
    i51.sameElementSupportDirectionAuthorized &&
    i51.resourceGenerationSupportDirectionAuthorized &&
    i51.supportChannelPresenceStateAuthorized &&
    i51.supportChannelActivationVerdictAuthorized === false &&
    i51.supportChannelPersistenceThroughClashAuthorized === false &&
    i51.supportChannelPersistenceThroughCombinationAuthorized === false &&
    i51.netSupportInterferenceEffectAuthorized === false &&
    i51.supportDirectionToEffectiveMechanismForceAuthorized === false &&
    i51.numericSupportWeightingAuthorized === false &&
    i51.additiveSupportScoringAuthorized === false &&
    i51.classificationAuthorized === false &&
    i51.numericScoringAuthorized === false
  );
}

function i53Canonical(
  i53: ChallengeCombinationSupportChannelActivationPersistenceMethodologyReviewReport,
): boolean {
  const canonical = buildI53ChallengeCombinationSupportChannelActivationPersistenceMethodologyReview();
  return (
    i53.reviewId === canonical.reviewId &&
    i53.decision === 'DIRECT_CONTEST_ROUTING_AUTHORIZED_ACTIVATION_PERSISTENCE_VERDICT_BLOCKED' &&
    i53.supportChannelContestTopologyRoutingAuthorized &&
    i53.noTrackedRelationTouchStateAuthorized &&
    i53.noTrackedRelationTouchMeansActivated === false &&
    i53.noTrackedRelationTouchMeansPersistent === false &&
    i53.directContestTopologyToActivationVerdictAuthorized === false &&
    i53.directContestTopologyToPersistenceVerdictAuthorized === false &&
    i53.activationPersistenceToNetSupportEffectAuthorized === false &&
    i53.activationPersistenceToEffectiveMechanismForceAuthorized === false &&
    i53.numericSupportWeightingAuthorized === false &&
    i53.classificationAuthorized === false &&
    i53.numericScoringAuthorized === false
  );
}

function reviewItem(
  item: I75SupportSourceDependencyResolutionReadinessItem,
): I82NoTrackedRelationSupportEffectReadinessItem {
  const relationSettlementDependencyCleared =
    item.readiness === 'NO_RELATION_SETTLEMENT_DEPENDENCY_EFFECT_METHODOLOGY_REQUIRED' &&
    item.relationSettlementDependencyCleared;
  return {
    mechanism: item.mechanism,
    evaluatedClashRelationId: item.evaluatedClashRelationId,
    participantRole: item.participantRole,
    participantPosition: item.participantPosition,
    participantBranch: item.participantBranch,
    sourcePillar: item.sourcePillar,
    sourceComponent: item.sourceComponent,
    sourceValue: item.sourceValue,
    upstreamReadiness: item.readiness,
    readiness: relationSettlementDependencyCleared
      ? 'RELATION_SETTLEMENT_DEPENDENCY_CLEARED_EFFECT_AUTHORITY_INSUFFICIENT'
      : 'NOT_APPLICABLE_RELATION_SETTLEMENT_DEPENDENCY_REMAINS',
    relationSettlementDependencyCleared,
    trackedDirectContestAbsent: relationSettlementDependencyCleared,
    supportDirectionMayBePreservedAsEvidence: relationSettlementDependencyCleared,
    currentAuthoritySufficientForSourceActivation: false,
    currentAuthoritySufficientForSourcePersistence: false,
    currentAuthoritySufficientForEffectiveSupport: false,
    sourceActive: 'not_determined',
    sourcePersisted: 'not_determined',
    effectiveSupportEffect: 'not_resolved',
    relativeForceVerdict: 'not_determined',
    numericWeight: 'not_assigned',
  };
}

function unresolved(
  status: Exclude<
    ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectReadinessReviewReport['status'],
    'RESOLVED_NO_TRACKED_RELATION_SUPPORT_EFFECT_READINESS'
  >,
  i75: ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyResolutionReadinessReviewReport,
  i51: ChallengeCombinationSupportInterferenceEffectMethodologyReviewReport,
  i53: ChallengeCombinationSupportChannelActivationPersistenceMethodologyReviewReport,
  notes: readonly string[],
): ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectReadinessReviewReport {
  return finalized({
    reviewVersion:
      I82_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_NO_TRACKED_RELATION_SUPPORT_EFFECT_READINESS_REVIEW_VERSION,
    status,
    decision:
      'NO_TRACKED_RELATION_TOUCH_CLEARS_RELATION_SETTLEMENT_DEPENDENCY_NOT_ACTIVATION_PERSISTENCE_EFFECT',
    upstreamI75ReviewId: i75.reviewId,
    upstreamI51ReviewId: i51.reviewId,
    upstreamI53ReviewId: i53.reviewId,
    items: [],
    noTrackedRelationPathObserved: false,
    relationSettlementIndependenceMayBePreserved: true,
    supportDirectionMayBePreservedWithoutMagnitude: true,
    noTrackedRelationTouchMeansActivated: false,
    noTrackedRelationTouchMeansPersistent: false,
    noTrackedRelationTouchMeansEffectiveSupport: false,
    absenceOfTrackedContestMayBeTreatedAsPositiveSettlementOutcome: false,
    preInteractionSupportPresenceMaySubstituteForPostInteractionEffect: false,
    supportChannelMultiplicityMagnitudeInferenceAuthorized: false,
    supportChannelAggregationAuthorized: false,
    sourceActivationVerdictAuthorized: false,
    sourcePersistenceVerdictAuthorized: false,
    sourceEffectiveSupportVerdictAuthorized: false,
    effectiveSupportToRelativeForceAuthorized: false,
    relativeForceVerdictAuthorized: false,
    clashWinnerVerdictAuthorized: false,
    rescueEffectAuthorized: false,
    clashSettlementAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    authorityGap: 'UNIVERSAL_UNTOUCHED_SUPPORT_ACTIVATION_PERSISTENCE_EFFECT_RULE_NOT_ESTABLISHED',
    recommendedNextGate: 'NO_TRACKED_RELATION_SUPPORT_EFFECT_AUTHORITY_GAP_REVIEW',
    notes,
  });
}

export function buildI82ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectReadinessReview(
  i75: ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceSettlementDependencyResolutionReadinessReviewReport,
  i51: ChallengeCombinationSupportInterferenceEffectMethodologyReviewReport =
    buildI51ChallengeCombinationSupportInterferenceEffectMethodologyReview(),
  i53: ChallengeCombinationSupportChannelActivationPersistenceMethodologyReviewReport =
    buildI53ChallengeCombinationSupportChannelActivationPersistenceMethodologyReview(),
): ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectReadinessReviewReport {
  if (!i75Accepted(i75)) {
    return unresolved('I75_UNRESOLVED_OR_INVALID', i75, i51, i53, [
      'Resolved fail-closed I75 dependency-resolution readiness is required before the no-tracked-relation path can be reviewed.',
    ]);
  }
  if (!i51Canonical(i51)) {
    return unresolved('I51_METHODOLOGY_NOT_CANONICAL', i75, i51, i53, [
      'The supplied I51 support-direction methodology must exactly match the canonical fail-closed review.',
    ]);
  }
  if (!i53Canonical(i53)) {
    return unresolved('I53_METHODOLOGY_NOT_CANONICAL', i75, i51, i53, [
      'The supplied I53 contest-topology methodology must exactly match the canonical fail-closed review.',
    ]);
  }

  const items = i75.items.map(reviewItem);
  return finalized({
    reviewVersion:
      I82_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_NO_TRACKED_RELATION_SUPPORT_EFFECT_READINESS_REVIEW_VERSION,
    status: 'RESOLVED_NO_TRACKED_RELATION_SUPPORT_EFFECT_READINESS',
    decision:
      'NO_TRACKED_RELATION_TOUCH_CLEARS_RELATION_SETTLEMENT_DEPENDENCY_NOT_ACTIVATION_PERSISTENCE_EFFECT',
    upstreamI75ReviewId: i75.reviewId,
    upstreamI51ReviewId: i51.reviewId,
    upstreamI53ReviewId: i53.reviewId,
    items,
    noTrackedRelationPathObserved: items.some((item) => item.relationSettlementDependencyCleared),
    relationSettlementIndependenceMayBePreserved: true,
    supportDirectionMayBePreservedWithoutMagnitude: true,
    noTrackedRelationTouchMeansActivated: false,
    noTrackedRelationTouchMeansPersistent: false,
    noTrackedRelationTouchMeansEffectiveSupport: false,
    absenceOfTrackedContestMayBeTreatedAsPositiveSettlementOutcome: false,
    preInteractionSupportPresenceMaySubstituteForPostInteractionEffect: false,
    supportChannelMultiplicityMagnitudeInferenceAuthorized: false,
    supportChannelAggregationAuthorized: false,
    sourceActivationVerdictAuthorized: false,
    sourcePersistenceVerdictAuthorized: false,
    sourceEffectiveSupportVerdictAuthorized: false,
    effectiveSupportToRelativeForceAuthorized: false,
    relativeForceVerdictAuthorized: false,
    clashWinnerVerdictAuthorized: false,
    rescueEffectAuthorized: false,
    clashSettlementAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    authorityGap: 'UNIVERSAL_UNTOUCHED_SUPPORT_ACTIVATION_PERSISTENCE_EFFECT_RULE_NOT_ESTABLISHED',
    recommendedNextGate: 'NO_TRACKED_RELATION_SUPPORT_EFFECT_AUTHORITY_GAP_REVIEW',
    notes: [
      'I82 preserves the useful I75 distinction that a no-touch source has no tracked relation-settlement dependency; this removes one dependency class but does not establish a positive support outcome.',
      'I51 authorizes directional same-element/resource support evidence only. It explicitly blocks activation, persistence, net effect, magnitude, scoring, and force promotion.',
      'I53 explicitly states NO_TRACKED_RELATION_TOUCH != ACTIVE and != PERSISTED; absence of tracked direct contest is an evidence state, not an effectiveness verdict.',
      'The scoped 地旺喜靜 cross-reference in I53 is insufficient to create a universal rule that every untouched support source is active, persistent, or force-bearing.',
      'A further authority-gap review must determine whether a source-bounded rule for untouched support activation/persistence exists; until then effective support and clash relative force remain blocked.',
    ],
  });
}
