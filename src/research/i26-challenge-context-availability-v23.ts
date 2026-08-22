import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  ChallengeContextCapability,
  ChallengeMechanismContextAvailability,
} from './i26-challenge-context-availability.js';
import type { ChallengeContextAvailabilityV22Report } from './i26-challenge-context-availability-v22.js';
import type { ChallengeTargetClashDependencyEvidenceReport } from './i33-challenge-target-clash-dependency-evidence.js';
import type { ChallengeTargetCombinationDependencyEvidenceReport } from './i35-challenge-target-combination-dependency-evidence.js';
import type { ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport } from './i47-challenge-root-three-combination-clash-placement-settlement-evidence.js';
import type { ChallengeCombinationSupportChannelRelationIdentityPairEvidenceReport } from './i61-challenge-combination-support-channel-relation-identity-pair-evidence.js';
import {
  buildI62ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReview,
  type ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReviewReport,
} from './i62-challenge-combination-support-channel-touch-specific-settlement-dispatch-methodology-review.js';
import {
  buildI63ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidence,
  type ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidenceReport,
} from './i63-challenge-combination-support-channel-touch-specific-settlement-dispatch-evidence.js';
import {
  buildI64ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationMethodologyReview,
  type ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationMethodologyReviewReport,
} from './i64-challenge-combination-support-channel-dispatched-relation-current-chart-settlement-substrate-verification-methodology-review.js';
import {
  buildI65ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationEvidence,
  type ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationEvidenceItem,
  type ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationEvidenceReport,
} from './i65-challenge-combination-support-channel-dispatched-relation-current-chart-settlement-substrate-verification-evidence.js';

export const I26_CHALLENGE_CONTEXT_AVAILABILITY_V23_VERSION =
  'myeonghwa-challenge-context-availability-v23';

export interface ChallengeContextAvailabilityV23Report {
  reportId: string;
  reportVersion: string;
  upstreamAvailabilityV22ReportId: string;
  dispatchedRelationCurrentChartSettlementSubstrateEvidenceReportId: string;
  dispatchedRelationCurrentChartSettlementSubstrateClosureAccepted: boolean;
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
  'resolved I65 dispatched-relation current-chart settlement substrate evidence aligned to exact I61/I62/I63/I64/I33/I35/I47/I26-v22 identity';

function familyPrefix(family: CombinationFamily): string {
  return family === 'stem' ? 'challenge-target stem-combination' : 'challenge-root combination';
}

function familyForItem(
  item: ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationEvidenceItem,
): CombinationFamily {
  return item.currentCombinationRelationKind === 'stem_five_combination' ? 'stem' : 'root';
}

function substrateGap(
  family: CombinationFamily,
  relationId: string,
  relationKind: string,
  dependency: string,
): string {
  return `${familyPrefix(family)} support-channel dispatched relation current-chart settlement substrate verification unresolved: ${relationId}|${relationKind}|${dependency}`;
}

function outcomeGap(
  family: CombinationFamily,
  relationId: string,
  relationKind: string,
  dependency: string,
): string {
  return `${familyPrefix(family)} support-channel dispatched relation settlement outcome unresolved after verified current-chart substrate: ${relationId}|${relationKind}|${dependency}`;
}

function chainAccepted(
  availabilityV22: ChallengeContextAvailabilityV22Report,
  pairEvidence: ChallengeCombinationSupportChannelRelationIdentityPairEvidenceReport,
  dispatchMethodology: ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReviewReport,
  dispatchEvidence: ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidenceReport,
  substrateMethodology: ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationMethodologyReviewReport,
  substrateEvidence: ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationEvidenceReport,
  i33: ChallengeTargetClashDependencyEvidenceReport,
  i35: ChallengeTargetCombinationDependencyEvidenceReport,
  i47: ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport,
): boolean {
  if (!availabilityV22.touchSpecificSettlementDispatchClosureAccepted) return false;
  if (availabilityV22.touchSpecificSettlementDispatchEvidenceReportId !== dispatchEvidence.reportId) {
    return false;
  }

  const canonicalI62 =
    buildI62ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReview();
  if (dispatchMethodology.reviewId !== canonicalI62.reviewId) return false;

  const expectedI63 = buildI63ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidence(
    pairEvidence,
    dispatchMethodology,
  );
  if (dispatchEvidence.reportId !== expectedI63.reportId) return false;

  const canonicalI64 =
    buildI64ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationMethodologyReview();
  if (substrateMethodology.reviewId !== canonicalI64.reviewId) return false;

  if (
    substrateEvidence.upstreamI61ReportId !== pairEvidence.reportId ||
    substrateEvidence.upstreamI62ReviewId !== dispatchMethodology.reviewId ||
    substrateEvidence.upstreamI63ReportId !== dispatchEvidence.reportId ||
    substrateEvidence.upstreamI64ReviewId !== substrateMethodology.reviewId ||
    substrateEvidence.i33ReportId !== i33.reportId ||
    substrateEvidence.i35ReportId !== i35.reportId ||
    substrateEvidence.i47ReportId !== i47.reportId
  ) {
    return false;
  }

  const expectedI65 =
    buildI65ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationEvidence(
      pairEvidence,
      dispatchMethodology,
      dispatchEvidence,
      substrateMethodology,
      i33,
      i35,
      i47,
    );

  return (
    substrateEvidence.reportId === expectedI65.reportId &&
    substrateEvidence.status ===
      'RESOLVED_DISPATCHED_RELATION_CURRENT_CHART_SETTLEMENT_SUBSTRATE_VERIFICATION_EVIDENCE' &&
    substrateEvidence.dispatchedRelationCurrentChartSettlementSubstrateVerificationEvidenceAvailable &&
    substrateEvidence.anyRoutedSettlementOutcomeResolved === false &&
    substrateEvidence.pairOrderSignificanceAuthorized === false &&
    substrateEvidence.multiTouchAggregationAuthorized === false &&
    substrateEvidence.crossRelationPrecedenceAuthorized === false &&
    substrateEvidence.contestOutcomeVerdictAuthorized === false &&
    substrateEvidence.supportChannelActivationVerdictAuthorized === false &&
    substrateEvidence.supportChannelPersistenceVerdictAuthorized === false &&
    substrateEvidence.supportChannelNeutralizationVerdictAuthorized === false &&
    substrateEvidence.supportChannelDestructionVerdictAuthorized === false &&
    substrateEvidence.supportChannelNetEffectVerdictAuthorized === false &&
    substrateEvidence.effectiveMechanismForceVerdict === 'not_determined' &&
    substrateEvidence.relationSpecificUsefulnessHarmfulness === 'not_determined' &&
    substrateEvidence.classificationAuthorized === false &&
    substrateEvidence.numericScoringAuthorized === false &&
    substrateEvidence.items.every(
      (item) =>
        item.anySettlementOutcomeResolved === false &&
        item.supportChannelActive === 'not_determined' &&
        item.supportChannelPersisted === 'not_determined' &&
        item.supportChannelNeutralized === 'not_determined' &&
        item.supportChannelDestroyed === 'not_determined' &&
        item.supportChannelNetEffect === 'not_resolved' &&
        item.effectiveMechanismForceVerdict === 'not_determined' &&
        item.relationSpecificUsefulnessHarmfulness === 'not_determined' &&
        item.numericScore === 'not_assigned' &&
        item.dispatchedRelationVerification.every(
          (relation) =>
            relation.precedenceWithinMultiTouch === 'not_determined' &&
            relation.settlementOutcome === 'not_determined' &&
            relation.dependencyVerification.every(
              (dependency) => dependency.settlementOutcomeResolved === false,
            ),
        ),
    )
  );
}

function substrateCapability(
  family: CombinationFamily,
  items: readonly ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationEvidenceItem[],
): string {
  const verifications = items.flatMap((item) =>
    item.dispatchedRelationVerification.flatMap((relation) => relation.dependencyVerification),
  );
  const verified = verifications.filter(
    (verification) => verification.currentChartSettlementSubstrateVerified,
  ).length;
  return `I65 ${family} dispatched-relation current-chart settlement substrate: ${verified}/${verifications.length} concrete dependency substrate(s) verified; settlement outcomes/precedence unresolved`;
}

function hasDispatchedSubstrateGap(base: ChallengeContextCapability): boolean {
  return base.unresolvedCapabilities.some((capability) =>
    capability.includes(
      'support-channel dispatched relation current-chart settlement substrate verification unresolved:',
    ),
  );
}

function refineSubstrate(
  base: ChallengeContextCapability,
  accepted: boolean,
  items: readonly ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationEvidenceItem[] | undefined,
): ChallengeContextCapability {
  if (
    base.dependency !== 'MECHANISM_EFFECTIVE_FORCE_CONTEXT' ||
    base.availability !== 'PARTIAL_SUBSTRATE' ||
    !hasDispatchedSubstrateGap(base)
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
  const currentItems = items ?? [];

  for (const family of ['stem', 'root'] as const) {
    const familyItems = currentItems.filter((item) => familyForItem(item) === family);
    if (familyItems.length === 0) continue;

    let changed = false;
    for (const item of familyItems) {
      for (const relation of item.dispatchedRelationVerification) {
        for (const verification of relation.dependencyVerification) {
          if (!verification.currentChartSettlementSubstrateVerified) continue;
          const prior = substrateGap(
            family,
            relation.relationId,
            relation.relationKind,
            verification.dependency,
          );
          const index = unresolved.indexOf(prior);
          if (index < 0) continue;
          unresolved.splice(index, 1);
          unresolved.push(
            outcomeGap(
              family,
              relation.relationId,
              relation.relationKind,
              verification.dependency,
            ),
          );
          changed = true;
        }
      }
    }

    if (changed) existing.push(substrateCapability(family, familyItems));
  }

  return {
    ...base,
    existingCapabilities: [...new Set(existing)],
    unresolvedCapabilities: [...new Set(unresolved)].sort(),
  };
}

export function buildI26ChallengeContextAvailabilityV23(
  availabilityV22: ChallengeContextAvailabilityV22Report,
  pairEvidence: ChallengeCombinationSupportChannelRelationIdentityPairEvidenceReport,
  dispatchMethodology: ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReviewReport,
  dispatchEvidence: ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidenceReport,
  substrateMethodology: ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationMethodologyReviewReport,
  substrateEvidence: ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationEvidenceReport,
  i33: ChallengeTargetClashDependencyEvidenceReport,
  i35: ChallengeTargetCombinationDependencyEvidenceReport,
  i47: ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport,
): ChallengeContextAvailabilityV23Report {
  const dispatchedRelationCurrentChartSettlementSubstrateClosureAccepted = chainAccepted(
    availabilityV22,
    pairEvidence,
    dispatchMethodology,
    dispatchEvidence,
    substrateMethodology,
    substrateEvidence,
    i33,
    i35,
    i47,
  );

  const itemsByMechanism = new Map<
    string,
    ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationEvidenceItem[]
  >();
  if (dispatchedRelationCurrentChartSettlementSubstrateClosureAccepted) {
    for (const item of substrateEvidence.items) {
      const current = itemsByMechanism.get(item.mechanism) ?? [];
      current.push(item);
      itemsByMechanism.set(item.mechanism, current);
    }
  }

  const mechanisms = availabilityV22.mechanisms.map((mechanism) => {
    const requiredContexts = mechanism.requiredContexts.map((context) =>
      refineSubstrate(
        context,
        dispatchedRelationCurrentChartSettlementSubstrateClosureAccepted,
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
    reportVersion: I26_CHALLENGE_CONTEXT_AVAILABILITY_V23_VERSION,
    upstreamAvailabilityV22ReportId: availabilityV22.reportId,
    dispatchedRelationCurrentChartSettlementSubstrateEvidenceReportId: substrateEvidence.reportId,
    dispatchedRelationCurrentChartSettlementSubstrateClosureAccepted,
    mechanisms,
    allRequiredContextsHaveSubstrate,
    methodologyReadyForEffectResolution: false as const,
    challengeEffectVerdict: 'not_determined' as const,
    relativeForceVerdictAuthorized: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    notes: [
      'I26 v23 accepts I65 only through exact I61/I62/I63/I64/I33/I35/I47/I26-v22 identity and deterministic I65 recomputation.',
      'An exact I65 current-chart substrate verification replaces only the matching per-relation substrate-verification blocker with an explicit per-relation settlement-outcome-unresolved blocker.',
      'Unverified dispatched relation/dependency substrates remain unresolved and are not promoted.',
      'COMPETING_RELATION_SETTLEMENT precedence and the separate support-channel activation/persistence blocker remain unchanged; multiple verified pair substrates are not aggregated or ranked.',
      'MECHANISM_EFFECTIVE_FORCE_CONTEXT remains PARTIAL_SUBSTRATE; effectReady remains false and no relative-force, challenge-effect, scoring, or strong/weak classification verdict is authorized.',
    ],
  };

  return {
    reportId: `challenge_context_availability_v23_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
