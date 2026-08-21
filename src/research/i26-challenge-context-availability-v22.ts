import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  ChallengeContextCapability,
  ChallengeMechanismContextAvailability,
} from './i26-challenge-context-availability.js';
import type { ChallengeContextAvailabilityV21Report } from './i26-challenge-context-availability-v21.js';
import type { ChallengeCombinationSupportChannelRelationIdentityPairEvidenceReport } from './i61-challenge-combination-support-channel-relation-identity-pair-evidence.js';
import {
  buildI62ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReview,
  type ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReviewReport,
} from './i62-challenge-combination-support-channel-touch-specific-settlement-dispatch-methodology-review.js';
import {
  buildI63ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidence,
  type ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidenceItem,
  type ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidenceReport,
} from './i63-challenge-combination-support-channel-touch-specific-settlement-dispatch-evidence.js';

export const I26_CHALLENGE_CONTEXT_AVAILABILITY_V22_VERSION =
  'myeonghwa-challenge-context-availability-v22';

export interface ChallengeContextAvailabilityV22Report {
  reportId: string;
  reportVersion: string;
  upstreamAvailabilityV21ReportId: string;
  touchSpecificSettlementDispatchEvidenceReportId: string;
  touchSpecificSettlementDispatchClosureAccepted: boolean;
  mechanisms: readonly ChallengeMechanismContextAvailability[];
  allRequiredContextsHaveSubstrate: boolean;
  methodologyReadyForEffectResolution: false;
  challengeEffectVerdict: 'not_determined';
  relativeForceVerdictAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

type CombinationFamily = 'stem' | 'root';

const ALIGNMENT_GAP =
  'resolved I63 touch-specific settlement dispatch evidence aligned to exact I61/I62/I26-v21 identity';

function familyPrefix(family: CombinationFamily): string {
  return family === 'stem' ? 'challenge-target stem-combination' : 'challenge-root combination';
}

function familyForItem(
  item: ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidenceItem,
): CombinationFamily {
  return item.currentCombinationRelationKind === 'stem_five_combination' ? 'stem' : 'root';
}

function preDispatchGap(family: CombinationFamily): string {
  return `${familyPrefix(family)} support-channel touch-specific relation settlement methodology/dispatch unresolved after verified relation identity pairs: TOUCH_SPECIFIC_RELATION_SETTLEMENT`;
}

function dispatchedSubstrateGap(
  family: CombinationFamily,
  relationId: string,
  relationKind: string,
  dependency: string,
): string {
  return `${familyPrefix(family)} support-channel dispatched relation current-chart settlement substrate verification unresolved: ${relationId}|${relationKind}|${dependency}`;
}

function chainAccepted(
  availabilityV21: ChallengeContextAvailabilityV21Report,
  pairEvidence: ChallengeCombinationSupportChannelRelationIdentityPairEvidenceReport,
  methodology: ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReviewReport,
  dispatchEvidence: ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidenceReport,
): boolean {
  if (!availabilityV21.relationIdentityPairClosureAccepted) return false;
  if (availabilityV21.relationIdentityPairEvidenceReportId !== pairEvidence.reportId) return false;

  const canonicalMethodology =
    buildI62ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReview();
  if (
    methodology.reviewId !== canonicalMethodology.reviewId ||
    methodology.decision !== 'PAIR_KIND_DISPATCH_AUTHORIZED_PRECEDENCE_AND_OUTCOME_BLOCKED'
  ) {
    return false;
  }
  if (dispatchEvidence.upstreamI61ReportId !== pairEvidence.reportId) return false;
  if (dispatchEvidence.upstreamI62ReviewId !== methodology.reviewId) return false;
  if (
    dispatchEvidence.status !== 'RESOLVED_TOUCH_SPECIFIC_SETTLEMENT_DISPATCH_EVIDENCE' ||
    !dispatchEvidence.touchSpecificSettlementDispatchEvidenceAvailable ||
    !dispatchEvidence.allRelationPairsDispatched ||
    dispatchEvidence.pairOrderSignificanceAuthorized ||
    dispatchEvidence.multiTouchAggregationAuthorized ||
    dispatchEvidence.crossRelationPrecedenceAuthorized ||
    dispatchEvidence.settlementOutcomeVerdictAuthorized ||
    dispatchEvidence.supportChannelActivationVerdictAuthorized ||
    dispatchEvidence.supportChannelPersistenceVerdictAuthorized ||
    dispatchEvidence.supportChannelNeutralizationVerdictAuthorized ||
    dispatchEvidence.supportChannelDestructionVerdictAuthorized ||
    dispatchEvidence.supportChannelNetEffectVerdictAuthorized ||
    dispatchEvidence.effectiveMechanismForceVerdict !== 'not_determined' ||
    dispatchEvidence.relationSpecificUsefulnessHarmfulness !== 'not_determined' ||
    dispatchEvidence.classificationAuthorized ||
    dispatchEvidence.numericScoringAuthorized ||
    dispatchEvidence.items.some(
      (item) =>
        !item.allRelationPairsDispatched ||
        item.anySettlementOutcomeResolved ||
        item.dispatchedRelations.length !== item.touchCount ||
        item.dispatchedRelations.some(
          (dispatch) =>
            dispatch.precedenceWithinMultiTouch !== 'not_determined' ||
            dispatch.settlementOutcome !== 'not_determined',
        ) ||
        item.supportChannelActive !== 'not_determined' ||
        item.supportChannelPersisted !== 'not_determined' ||
        item.supportChannelNeutralized !== 'not_determined' ||
        item.supportChannelDestroyed !== 'not_determined' ||
        item.supportChannelNetEffect !== 'not_resolved' ||
        item.effectiveMechanismForceVerdict !== 'not_determined' ||
        item.relationSpecificUsefulnessHarmfulness !== 'not_determined' ||
        item.numericScore !== 'not_assigned',
    )
  ) {
    return false;
  }

  const expected = buildI63ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidence(
    pairEvidence,
    methodology,
  );
  return expected.reportId === dispatchEvidence.reportId;
}

function dispatchCapability(
  family: CombinationFamily,
  items: readonly ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidenceItem[],
): string {
  const relationCount = items.reduce((count, item) => count + item.dispatchedRelations.length, 0);
  const dependencyCount = items.reduce(
    (count, item) =>
      count +
      item.dispatchedRelations.reduce(
        (routeCount, dispatch) => routeCount + dispatch.routedDependencies.length,
        0,
      ),
    0,
  );
  return `I63 ${family} touch-specific settlement dispatch: ${items.length} multi-touch source route(s), ${relationCount} exact relation dispatch(es), ${dependencyCount} routed dependency occurrence(s); current-chart substrate/outcomes/precedence unresolved`;
}

function refineDispatch(
  base: ChallengeContextCapability,
  accepted: boolean,
  items: readonly ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidenceItem[] | undefined,
): ChallengeContextCapability {
  if (
    base.dependency !== 'MECHANISM_EFFECTIVE_FORCE_CONTEXT' ||
    base.availability !== 'PARTIAL_SUBSTRATE'
  ) {
    return base;
  }

  const hasDispatchGap = base.unresolvedCapabilities.some((capability) =>
    capability.includes(
      'touch-specific relation settlement methodology/dispatch unresolved after verified relation identity pairs: TOUCH_SPECIFIC_RELATION_SETTLEMENT',
    ),
  );
  if (!hasDispatchGap) return base;

  if (!accepted) {
    return {
      ...base,
      unresolvedCapabilities: [...new Set([...base.unresolvedCapabilities, ALIGNMENT_GAP])].sort(),
    };
  }

  const unresolved = [...base.unresolvedCapabilities];
  const existing = [...base.existingCapabilities];
  const currentItems = items ?? [];

  for (const family of ['stem', 'root'] as const) {
    const familyItems = currentItems.filter(
      (item) => familyForItem(item) === family && item.touchCount > 1,
    );
    if (familyItems.length === 0) continue;
    if (!familyItems.every((item) => item.allRelationPairsDispatched)) continue;

    const prior = preDispatchGap(family);
    const priorIndex = unresolved.indexOf(prior);
    if (priorIndex < 0) continue;
    unresolved.splice(priorIndex, 1);

    for (const item of familyItems) {
      for (const dispatch of item.dispatchedRelations) {
        for (const dependency of dispatch.routedDependencies) {
          unresolved.push(
            dispatchedSubstrateGap(
              family,
              dispatch.relationId,
              dispatch.relationKind,
              dependency,
            ),
          );
        }
      }
    }
    existing.push(dispatchCapability(family, familyItems));
  }

  return {
    ...base,
    existingCapabilities: [...new Set(existing)],
    unresolvedCapabilities: [...new Set(unresolved)].sort(),
  };
}

export function buildI26ChallengeContextAvailabilityV22(
  availabilityV21: ChallengeContextAvailabilityV21Report,
  pairEvidence: ChallengeCombinationSupportChannelRelationIdentityPairEvidenceReport,
  methodology: ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReviewReport,
  dispatchEvidence: ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidenceReport,
): ChallengeContextAvailabilityV22Report {
  const touchSpecificSettlementDispatchClosureAccepted = chainAccepted(
    availabilityV21,
    pairEvidence,
    methodology,
    dispatchEvidence,
  );

  const itemsByMechanism = new Map<
    string,
    ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidenceItem[]
  >();
  if (touchSpecificSettlementDispatchClosureAccepted) {
    for (const item of dispatchEvidence.items) {
      const current = itemsByMechanism.get(item.mechanism) ?? [];
      current.push(item);
      itemsByMechanism.set(item.mechanism, current);
    }
  }

  const mechanisms = availabilityV21.mechanisms.map((mechanism) => {
    const requiredContexts = mechanism.requiredContexts.map((context) =>
      refineDispatch(
        context,
        touchSpecificSettlementDispatchClosureAccepted,
        itemsByMechanism.get(mechanism.mechanism),
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
    reportVersion: I26_CHALLENGE_CONTEXT_AVAILABILITY_V22_VERSION,
    upstreamAvailabilityV21ReportId: availabilityV21.reportId,
    touchSpecificSettlementDispatchEvidenceReportId: dispatchEvidence.reportId,
    touchSpecificSettlementDispatchClosureAccepted,
    mechanisms,
    allRequiredContextsHaveSubstrate,
    methodologyReadyForEffectResolution: false as const,
    challengeEffectVerdict: 'not_determined' as const,
    relativeForceVerdictAuthorized: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    notes: [
      'I26 v22 accepts I63 only through exact I61/I62/I26-v21 identity and deterministic I63 recomputation.',
      'Aligned I63 evidence removes only the touch-specific dispatch-methodology blocker and exposes per-relation, per-dependency current-chart settlement substrate verification gaps.',
      'A dispatched dependency is not treated as having verified current-chart I33/I35/I47 substrate and is not treated as settled.',
      'COMPETING_RELATION_SETTLEMENT precedence and the separate support-channel activation/persistence blocker remain unchanged.',
      'MECHANISM_EFFECTIVE_FORCE_CONTEXT remains PARTIAL_SUBSTRATE; effectReady remains false and no relative-force, challenge-effect, scoring, or strong/weak classification verdict is authorized.',
    ],
  };

  return {
    reportId: `challenge_context_availability_v22_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
