import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeCombinationSupportChannelContestSettlementDependency } from './i55-challenge-combination-support-channel-contest-settlement-methodology-review.js';
import {
  buildI59ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationMethodologyReview,
  type CurrentChartSettlementSubstrateVerificationRoute,
} from './i59-challenge-combination-support-channel-current-chart-settlement-substrate-verification-methodology-review.js';

export const I64_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_DISPATCHED_RELATION_CURRENT_CHART_SETTLEMENT_SUBSTRATE_VERIFICATION_METHODOLOGY_REVIEW_VERSION =
  'myeonghwa-challenge-combination-support-channel-dispatched-relation-current-chart-settlement-substrate-verification-methodology-review-v1';

export type I64DispatchedSettlementDependency = Exclude<
  ChallengeCombinationSupportChannelContestSettlementDependency,
  'TOUCH_SPECIFIC_RELATION_SETTLEMENT' | 'COMPETING_RELATION_SETTLEMENT'
>;

export interface DispatchedRelationCurrentChartSettlementSubstrateVerificationRequirement {
  dependency: I64DispatchedSettlementDependency;
  reusedI59Route: CurrentChartSettlementSubstrateVerificationRoute;
  requiredAuthorityRefs: readonly string[];
  pairLocalReuseAuthorized: true;
  exactDispatchedRelationIdMatchRequired: true;
  exactDispatchedRelationKindMatchRequired: true;
  exactSupportSourceIdentityMatchRequired: true;
  mechanismMatchRequired: true;
  currentCombinationIdentityPreservationRequired: true;
  currentChartSettlementSubstrateVerificationAuthorized: true;
  settlementOutcomeResolutionAuthorized: false;
}

export interface ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationMethodologyReviewReport {
  reviewId: string;
  reviewVersion: string;
  decision: 'I59_EXACT_DOMAIN_RULES_REUSABLE_PER_I63_DISPATCHED_PAIR_OUTCOMES_BLOCKED';
  canonicalI59ReviewId: string;
  i59ExactDomainRulesReusablePerDispatchedPair: true;
  authoritativeRelationIdKindPairRequiredFromI61: true;
  canonicalPairDispatchRequiredFromI63: true;
  methodologyApplicabilityAloneSufficientForVerification: false;
  i33ArbitrarySupportSourceReuseAuthorized: false;
  i35ArbitraryCompetingRelationReuseAuthorized: false;
  i47BureauStateToSupportSourceOutcomeAuthorized: false;
  touchSpecificGenericDependencyVerificationAuthorized: false;
  competingRelationPrecedenceSettlementVerificationAuthorized: false;
  crossRelationPrecedenceAuthorized: false;
  multiTouchAggregationAuthorized: false;
  settlementOutcomeResolutionAuthorized: false;
  supportChannelActivationVerdictAuthorized: false;
  supportChannelPersistenceVerdictAuthorized: false;
  supportChannelNeutralizationVerdictAuthorized: false;
  supportChannelDestructionVerdictAuthorized: false;
  supportChannelNetEffectVerdictAuthorized: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  requirements: readonly DispatchedRelationCurrentChartSettlementSubstrateVerificationRequirement[];
  notes: readonly string[];
}

const CONCRETE_DEPENDENCIES = Object.freeze([
  'CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT',
  'CLASH_RELATIVE_FORCE_SETTLEMENT',
  'CLASH_RESCUE_SETTLEMENT_WHERE_APPLICABLE',
  'CLASH_INTERACTION_SETTLEMENT',
  'COMPETING_COMBINATION_BINDING_INTERACTION_SETTLEMENT',
] as const satisfies readonly I64DispatchedSettlementDependency[]);

export function buildI64ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationMethodologyReview(): ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationMethodologyReviewReport {
  const i59 =
    buildI59ChallengeCombinationSupportChannelCurrentChartSettlementSubstrateVerificationMethodologyReview();

  const requirements = CONCRETE_DEPENDENCIES.map((dependency) => {
    const source = i59.requirements.find((requirement) => requirement.dependency === dependency);
    if (source === undefined || !source.chartSpecificSubstrateVerificationAuthorized) {
      throw new Error(`Missing authorized I59 exact-domain requirement for I64 dependency ${dependency}`);
    }
    if (
      source.route === 'MULTI_TOUCH_PAIRING_BLOCKED' ||
      source.route === 'COMPETING_RELATION_PRECEDENCE_BLOCKED'
    ) {
      throw new Error(`I64 concrete dependency unexpectedly maps to blocked I59 route ${source.route}`);
    }
    return {
      dependency,
      reusedI59Route: source.route,
      requiredAuthorityRefs: source.requiredAuthorityRefs,
      pairLocalReuseAuthorized: true as const,
      exactDispatchedRelationIdMatchRequired: true as const,
      exactDispatchedRelationKindMatchRequired: true as const,
      exactSupportSourceIdentityMatchRequired: true as const,
      mechanismMatchRequired: true as const,
      currentCombinationIdentityPreservationRequired: true as const,
      currentChartSettlementSubstrateVerificationAuthorized: true as const,
      settlementOutcomeResolutionAuthorized: false as const,
    };
  });

  const material = {
    reviewVersion:
      I64_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_DISPATCHED_RELATION_CURRENT_CHART_SETTLEMENT_SUBSTRATE_VERIFICATION_METHODOLOGY_REVIEW_VERSION,
    decision:
      'I59_EXACT_DOMAIN_RULES_REUSABLE_PER_I63_DISPATCHED_PAIR_OUTCOMES_BLOCKED' as const,
    canonicalI59ReviewId: i59.reviewId,
    i59ExactDomainRulesReusablePerDispatchedPair: true as const,
    authoritativeRelationIdKindPairRequiredFromI61: true as const,
    canonicalPairDispatchRequiredFromI63: true as const,
    methodologyApplicabilityAloneSufficientForVerification: false as const,
    i33ArbitrarySupportSourceReuseAuthorized: false as const,
    i35ArbitraryCompetingRelationReuseAuthorized: false as const,
    i47BureauStateToSupportSourceOutcomeAuthorized: false as const,
    touchSpecificGenericDependencyVerificationAuthorized: false as const,
    competingRelationPrecedenceSettlementVerificationAuthorized: false as const,
    crossRelationPrecedenceAuthorized: false as const,
    multiTouchAggregationAuthorized: false as const,
    settlementOutcomeResolutionAuthorized: false as const,
    supportChannelActivationVerdictAuthorized: false as const,
    supportChannelPersistenceVerdictAuthorized: false as const,
    supportChannelNeutralizationVerdictAuthorized: false as const,
    supportChannelDestructionVerdictAuthorized: false as const,
    supportChannelNetEffectVerdictAuthorized: false as const,
    targetPostRelationRootState: 'not_determined' as const,
    effectiveMechanismForceVerdict: 'not_determined' as const,
    relationSpecificUsefulnessHarmfulness: 'not_determined' as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    requirements,
    notes: [
      'I64 does not weaken I59 subject-domain restrictions. It only permits I59 exact-domain verification rules to be evaluated pair-locally after I61 supplies authoritative relation-id/kind pairs and I63 supplies canonical pair-local dependency dispatch.',
      'Every dispatched relation must preserve exact mechanism, current-combination identity, relation id, relation kind, and support-source pillar/component/value before I33/I35/I47 substrate can be considered aligned.',
      'I33 remains challenge-target-root clash evidence rather than arbitrary clash evidence; I35 remains challenge-target combination evidence rather than an arbitrary combination catalog.',
      'I47 remains narrow bureau-local context only and cannot convert BROKEN_BY_TIGHT_EMBEDDED_CLASH into support-source destruction or support-channel inactivity.',
      'TOUCH_SPECIFIC_RELATION_SETTLEMENT is no longer used as a generic substrate-verification target after I63 dispatch; each concrete dispatched dependency is verified separately.',
      'COMPETING_RELATION_SETTLEMENT remains a precedence/settlement blocker and is not made verifiable by pair-local substrate evidence.',
      'No verified substrate may be promoted to settlement outcome, activation, persistence, destruction, net effect, effective mechanism force, usefulness/harmfulness, numeric score, or strong/weak classification.',
    ],
  };

  return {
    reviewId: `challenge_combination_support_channel_dispatched_relation_current_chart_settlement_substrate_verification_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
