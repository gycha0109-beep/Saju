import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  ChallengeContextCapability,
  ChallengeMechanismContextAvailability,
} from './i26-challenge-context-availability.js';
import type { ChallengeContextAvailabilityV23Report } from './i26-challenge-context-availability-v23.js';
import type { ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementEvidenceReport } from './i80-challenge-combination-support-channel-branch-three-narrow-post-interaction-settlement-evidence.js';
import {
  buildI81ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionBureauStateRoutedCombinationSettlementOutcomePromotionReadinessReview,
  type ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionBureauStateRoutedCombinationSettlementOutcomePromotionReadinessReviewReport,
  type I81NarrowBureauStateOutcomePromotionReadinessItem,
} from './i81-challenge-combination-support-channel-branch-three-narrow-post-interaction-bureau-state-routed-combination-settlement-outcome-promotion-readiness-review.js';

export const I26_CHALLENGE_CONTEXT_AVAILABILITY_V24_VERSION =
  'myeonghwa-challenge-context-availability-v24';

export interface ChallengeContextAvailabilityV24Report {
  reportId: string;
  reportVersion: string;
  upstreamAvailabilityV23ReportId: string;
  narrowBranchThreeSettlementEvidenceReportId: string;
  narrowBranchThreeOutcomePromotionReadinessReviewId: string;
  narrowBranchThreeSettlementRefinementAccepted: boolean;
  mechanisms: readonly ChallengeMechanismContextAvailability[];
  allRequiredContextsHaveSubstrate: boolean;
  methodologyReadyForEffectResolution: false;
  challengeEffectVerdict: 'not_determined';
  relativeForceVerdictAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

const ALIGNMENT_GAP =
  'resolved canonical I80/I81 narrow branch-three post-interaction settlement evidence/readiness aligned to I26-v23 pair-local outcome blockers';

function i80Accepted(
  i80: ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementEvidenceReport,
): boolean {
  return (
    i80.status === 'RESOLVED_BRANCH_THREE_NARROW_POST_INTERACTION_SETTLEMENT_EVIDENCE' &&
    i80.narrowPostInteractionSettlementEvidenceAvailable &&
    i80.i48ContextualAmbiguityPreserved &&
    i80.narrowBreakStateIsBureauLevelOnly &&
    i80.narrowBreakStateMayBePromotedToBindingOutcome === false &&
    i80.narrowBreakStateMayBePromotedToTransformationOutcome === false &&
    i80.narrowBreakStateMayBePromotedToGenericInteractionOutcome === false &&
    i80.narrowBreakStateMayBePromotedToNeutralizationOutcome === false &&
    i80.narrowBreakStateMayBePromotedToSupportSourceDestroyed === false &&
    i80.absenceOfNarrowBreakMeansIntactAuthorized === false &&
    i80.absenceOfNarrowBreakMeansDamagedAuthorized === false &&
    i80.genericCombinationSettlementResolverAuthorized === false &&
    i80.directBindingOutcomeAuthorized === false &&
    i80.transformationOutcomeAuthorized === false &&
    i80.neutralizationOutcomeAuthorized === false &&
    i80.noEffectOutcomeAuthorized === false &&
    i80.postCombinationSubjectIdentityPolicyResolved === false &&
    i80.pairOrderSignificanceAuthorized === false &&
    i80.multiTouchAggregationAuthorized === false &&
    i80.crossRelationPrecedenceAuthorized === false &&
    i80.supportChannelActivationVerdictAuthorized === false &&
    i80.supportChannelPersistenceVerdictAuthorized === false &&
    i80.supportChannelDestructionVerdictAuthorized === false &&
    i80.supportChannelNetEffectVerdictAuthorized === false &&
    i80.targetPostRelationRootState === 'not_determined' &&
    i80.effectiveMechanismForceVerdict === 'not_determined' &&
    i80.classificationAuthorized === false &&
    i80.numericScoringAuthorized === false
  );
}

function i81Accepted(
  i80: ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementEvidenceReport,
  i81: ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionBureauStateRoutedCombinationSettlementOutcomePromotionReadinessReviewReport,
): boolean {
  const expected =
    buildI81ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionBureauStateRoutedCombinationSettlementOutcomePromotionReadinessReview(
      i80,
    );
  return (
    i81.reviewId === expected.reviewId &&
    i81.upstreamI80ReportId === i80.reportId &&
    i81.status === 'RESOLVED_NARROW_BUREAU_STATE_OUTCOME_PROMOTION_READINESS' &&
    i81.decision ===
      'NARROW_BUREAU_POST_INTERACTION_STATE_MAY_BE_VERIFIED_ROUTED_COMBINATION_BINDING_INTERACTION_OUTCOME_PROMOTION_BLOCKED' &&
    i81.anyRoutedCombinationSettlementOutcomePromotionReady === false &&
    i81.currentCombinationBindingInteractionOutcomePromotionAuthorized === false &&
    i81.competingCombinationBindingInteractionOutcomePromotionAuthorized === false &&
    i81.narrowBureauStateMayResolveBindingVerdict === false &&
    i81.narrowBureauStateMayResolveTransformationVerdict === false &&
    i81.narrowBureauStateMayResolveGenericInteractionOutcome === false &&
    i81.narrowBureauStateMayResolveNeutralizationVerdict === false &&
    i81.narrowBureauStateMayResolveNoEffectVerdict === false &&
    i81.narrowBureauStateMayResolveSupportSourceDestroyed === false &&
    i81.currentAndCompetingRolesRemainDistinctOutcomeDomains &&
    i81.genericCombinationSettlementResolverAuthorized === false &&
    i81.directBindingOutcomeAuthorized === false &&
    i81.transformationOutcomeAuthorized === false &&
    i81.neutralizationOutcomeAuthorized === false &&
    i81.noEffectOutcomeAuthorized === false &&
    i81.postCombinationSubjectIdentityPolicyResolved === false &&
    i81.pairOrderSignificanceAuthorized === false &&
    i81.multiTouchAggregationAuthorized === false &&
    i81.crossRelationPrecedenceAuthorized === false &&
    i81.supportChannelActivationVerdictAuthorized === false &&
    i81.supportChannelPersistenceVerdictAuthorized === false &&
    i81.supportChannelDestructionVerdictAuthorized === false &&
    i81.supportChannelNetEffectVerdictAuthorized === false &&
    i81.targetPostRelationRootState === 'not_determined' &&
    i81.effectiveMechanismForceVerdict === 'not_determined' &&
    i81.classificationAuthorized === false &&
    i81.numericScoringAuthorized === false
  );
}

function chainAccepted(
  availabilityV23: ChallengeContextAvailabilityV23Report,
  i80: ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementEvidenceReport,
  i81: ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionBureauStateRoutedCombinationSettlementOutcomePromotionReadinessReviewReport,
): boolean {
  return (
    availabilityV23.dispatchedRelationCurrentChartSettlementSubstrateClosureAccepted &&
    availabilityV23.methodologyReadyForEffectResolution === false &&
    availabilityV23.challengeEffectVerdict === 'not_determined' &&
    availabilityV23.relativeForceVerdictAuthorized === false &&
    availabilityV23.classificationAuthorized === false &&
    availabilityV23.numericScoringAuthorized === false &&
    i80Accepted(i80) &&
    i81Accepted(i80, i81)
  );
}

function oldOutcomeSuffix(item: I81NarrowBureauStateOutcomePromotionReadinessItem): string | undefined {
  if (item.routedCombinationSettlementDependency === 'not_applicable') return undefined;
  return `dispatched relation settlement outcome unresolved after verified current-chart substrate: ${item.relationId}|${item.relationKind}|${item.routedCombinationSettlementDependency}`;
}

function narrowedOutcomeGap(
  prefix: string,
  item: I81NarrowBureauStateOutcomePromotionReadinessItem,
): string {
  return `${prefix} dispatched relation narrow branch-three post-interaction bureau state verified but routed combination settlement outcome unresolved: ${item.relationId}|${item.relationKind}|${item.routedCombinationSettlementDependency}|BROKEN_BY_TIGHT_EMBEDDED_CLASH`;
}

function narrowCapability(item: I81NarrowBureauStateOutcomePromotionReadinessItem): string {
  return `I80/I81 branch-three narrow post-interaction bureau state verified: ${item.relationId}|${item.role}|BROKEN_BY_TIGHT_EMBEDDED_CLASH; routed binding/interaction settlement outcome unresolved`;
}

function refineContext(
  base: ChallengeContextCapability,
  accepted: boolean,
  items: readonly I81NarrowBureauStateOutcomePromotionReadinessItem[],
): ChallengeContextCapability {
  if (
    base.dependency !== 'MECHANISM_EFFECTIVE_FORCE_CONTEXT' ||
    base.availability !== 'PARTIAL_SUBSTRATE'
  ) {
    return base;
  }

  if (!accepted) {
    return {
      ...base,
      unresolvedCapabilities: [...new Set([...base.unresolvedCapabilities, ALIGNMENT_GAP])].sort(),
    };
  }

  const unresolved = [...base.unresolvedCapabilities];
  const existing = [...base.existingCapabilities];

  for (const item of items) {
    if (
      item.promotionReadiness !==
        'NARROW_BUREAU_STATE_VERIFIED_BINDING_INTERACTION_OUTCOME_STILL_BLOCKED' ||
      item.narrowPostInteractionBureauState !== 'BROKEN_BY_TIGHT_EMBEDDED_CLASH' ||
      !item.narrowBureauStateVerified
    ) {
      continue;
    }
    const suffix = oldOutcomeSuffix(item);
    if (suffix === undefined) continue;

    const matches = unresolved
      .map((value, index) => ({ value, index }))
      .filter(({ value }) => value.endsWith(suffix));
    if (matches.length !== 1) continue;

    const match = matches[0]!;
    const marker = ' dispatched relation settlement outcome unresolved after verified current-chart substrate:';
    const markerIndex = match.value.indexOf(marker);
    if (markerIndex < 0) continue;
    const prefix = match.value.slice(0, markerIndex);
    unresolved.splice(match.index, 1, narrowedOutcomeGap(prefix, item));
    existing.push(narrowCapability(item));
  }

  return {
    ...base,
    existingCapabilities: [...new Set(existing)],
    unresolvedCapabilities: [...new Set(unresolved)].sort(),
  };
}

export function buildI26ChallengeContextAvailabilityV24(
  availabilityV23: ChallengeContextAvailabilityV23Report,
  i80: ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementEvidenceReport,
  i81: ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionBureauStateRoutedCombinationSettlementOutcomePromotionReadinessReviewReport,
): ChallengeContextAvailabilityV24Report {
  const narrowBranchThreeSettlementRefinementAccepted = chainAccepted(
    availabilityV23,
    i80,
    i81,
  );

  const itemsByMechanism = new Map<string, I81NarrowBureauStateOutcomePromotionReadinessItem[]>();
  if (narrowBranchThreeSettlementRefinementAccepted) {
    for (const item of i81.items) {
      const current = itemsByMechanism.get(item.mechanism) ?? [];
      current.push(item);
      itemsByMechanism.set(item.mechanism, current);
    }
  }

  const mechanisms = availabilityV23.mechanisms.map((mechanism) => {
    const requiredContexts = mechanism.requiredContexts.map((context) =>
      refineContext(
        context,
        narrowBranchThreeSettlementRefinementAccepted,
        itemsByMechanism.get(mechanism.mechanism) ?? [],
      ),
    );
    return {
      mechanism: mechanism.mechanism,
      requiredContexts,
      missingDependencies: requiredContexts
        .filter((context) => context.availability === 'MISSING_SUBSTRATE')
        .map((context) => context.dependency),
      partialDependencies: requiredContexts
        .filter((context) => context.availability === 'PARTIAL_SUBSTRATE')
        .map((context) => context.dependency),
      evidenceAvailableDependencies: requiredContexts
        .filter((context) => context.availability === 'EVIDENCE_AVAILABLE_EFFECT_UNRESOLVED')
        .map((context) => context.dependency),
      effectReady: false as const,
    };
  });

  const allRequiredContextsHaveSubstrate = mechanisms.every(
    (mechanism) => mechanism.missingDependencies.length === 0,
  );

  const material = {
    reportVersion: I26_CHALLENGE_CONTEXT_AVAILABILITY_V24_VERSION,
    upstreamAvailabilityV23ReportId: availabilityV23.reportId,
    narrowBranchThreeSettlementEvidenceReportId: i80.reportId,
    narrowBranchThreeOutcomePromotionReadinessReviewId: i81.reviewId,
    narrowBranchThreeSettlementRefinementAccepted,
    mechanisms,
    allRequiredContextsHaveSubstrate,
    methodologyReadyForEffectResolution: false as const,
    challengeEffectVerdict: 'not_determined' as const,
    relativeForceVerdictAuthorized: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    notes: [
      'I26 v24 accepts I80/I81 only when I80 remains fail-closed and the supplied I81 review exactly matches deterministic I81 reconstruction from that I80 report.',
      'A verified I80 narrow branch-three bureau state refines only one exact I26-v23 routed-combination outcome blocker with the same relation id, kind, and current/competing routed dependency.',
      'The refinement records BROKEN_BY_TIGHT_EMBEDDED_CLASH as bureau-level post-interaction substrate while explicitly preserving the routed binding/interaction settlement outcome as unresolved.',
      'Missing, duplicate, or contextually unresolved I47 evidence does not refine the I26-v23 outcome blocker.',
      'COMPETING_RELATION_SETTLEMENT precedence, support-channel activation/persistence/destruction, post-relation root state, and effective mechanism force remain unresolved.',
      'MECHANISM_EFFECTIVE_FORCE_CONTEXT remains PARTIAL_SUBSTRATE; effectReady remains false and no relative-force, challenge-effect, scoring, or strong/weak classification verdict is authorized.',
    ],
  };

  return {
    reportId: `challenge_context_availability_v24_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
