import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  ChallengeContextCapability,
  ChallengeMechanismContextAvailability,
} from './i26-challenge-context-availability.js';
import type { ChallengeContextAvailabilityV17Report } from './i26-challenge-context-availability-v17.js';
import type { ChallengeCombinationSupportChannelContestTopologyEvidenceReport } from './i54-challenge-combination-support-channel-contest-topology-evidence.js';
import type { ChallengeCombinationSupportChannelContestSettlementMethodologyReviewReport } from './i55-challenge-combination-support-channel-contest-settlement-methodology-review.js';
import {
  buildI56ChallengeCombinationSupportChannelSettlementDependencyEvidence,
  type ChallengeCombinationSupportChannelSettlementDependencyEvidenceItem,
  type ChallengeCombinationSupportChannelSettlementDependencyEvidenceReport,
} from './i56-challenge-combination-support-channel-settlement-dependency-evidence.js';

export const I26_CHALLENGE_CONTEXT_AVAILABILITY_V18_VERSION =
  'myeonghwa-challenge-context-availability-v18';

export interface ChallengeContextAvailabilityV18Report {
  reportId: string;
  reportVersion: string;
  upstreamAvailabilityV17ReportId: string;
  contestTopologyEvidenceReportId: string;
  contestSettlementMethodologyReviewId: string;
  settlementDependencyEvidenceReportId: string;
  settlementDependencyClosureAccepted: boolean;
  mechanisms: readonly ChallengeMechanismContextAvailability[];
  allRequiredContextsHaveSubstrate: boolean;
  methodologyReadyForEffectResolution: false;
  challengeEffectVerdict: 'not_determined';
  relativeForceVerdictAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

const STEM_CONTEST_SETTLEMENT_GAP =
  'challenge-target stem-combination support-channel contest outcome/persistence settlement';
const ROOT_CONTEST_SETTLEMENT_GAP =
  'challenge-root combination support-channel contest outcome/persistence settlement';
const ALIGNMENT_GAP =
  'resolved I56 settlement-dependency evidence aligned to exact I54/I55/I26-v17 identity';

function chainAligned(
  availabilityV17: ChallengeContextAvailabilityV17Report,
  topologyEvidence: ChallengeCombinationSupportChannelContestTopologyEvidenceReport,
  settlementMethodology: ChallengeCombinationSupportChannelContestSettlementMethodologyReviewReport,
  settlementEvidence: ChallengeCombinationSupportChannelSettlementDependencyEvidenceReport,
): boolean {
  if (!availabilityV17.contestTopologyClosureAccepted) return false;
  if (availabilityV17.contestTopologyEvidenceReportId !== topologyEvidence.reportId) return false;
  if (settlementEvidence.upstreamI54ReportId !== topologyEvidence.reportId) return false;
  if (settlementEvidence.upstreamI55ReviewId !== settlementMethodology.reviewId) return false;

  const expected = buildI56ChallengeCombinationSupportChannelSettlementDependencyEvidence(
    topologyEvidence,
    settlementMethodology,
  );
  return expected.reportId === settlementEvidence.reportId;
}

function evidenceContractAccepted(
  settlementEvidence: ChallengeCombinationSupportChannelSettlementDependencyEvidenceReport,
): boolean {
  return (
    settlementEvidence.status === 'RESOLVED_SETTLEMENT_DEPENDENCY_EVIDENCE' &&
    settlementEvidence.settlementDependencyEvidenceAvailable &&
    settlementEvidence.contestOutcomeVerdictAuthorized === false &&
    settlementEvidence.supportChannelActivationVerdictAuthorized === false &&
    settlementEvidence.supportChannelPersistenceVerdictAuthorized === false &&
    settlementEvidence.supportChannelNeutralizationVerdictAuthorized === false &&
    settlementEvidence.supportChannelDestructionVerdictAuthorized === false &&
    settlementEvidence.supportChannelNetEffectVerdictAuthorized === false &&
    settlementEvidence.effectiveMechanismForceVerdict === 'not_determined' &&
    settlementEvidence.relationSpecificUsefulnessHarmfulness === 'not_determined' &&
    settlementEvidence.classificationAuthorized === false &&
    settlementEvidence.numericScoringAuthorized === false &&
    settlementEvidence.items.every(
      (item) =>
        item.settlementDependenciesResolved === false &&
        item.supportChannelActive === 'not_determined' &&
        item.supportChannelPersisted === 'not_determined' &&
        item.supportChannelNeutralized === 'not_determined' &&
        item.supportChannelDestroyed === 'not_determined' &&
        item.supportChannelNetEffect === 'not_resolved' &&
        item.effectiveMechanismForceVerdict === 'not_determined' &&
        item.relationSpecificUsefulnessHarmfulness === 'not_determined' &&
        item.numericScore === 'not_assigned',
    )
  );
}

type CombinationFamily = 'stem' | 'root';

function familyItems(
  items: readonly ChallengeCombinationSupportChannelSettlementDependencyEvidenceItem[],
  family: CombinationFamily,
): readonly ChallengeCombinationSupportChannelSettlementDependencyEvidenceItem[] {
  return items.filter((item) =>
    family === 'stem'
      ? item.currentCombinationRelationKind === 'stem_five_combination'
      : item.currentCombinationRelationKind === 'branch_six_combination' ||
        item.currentCombinationRelationKind === 'branch_three_combination',
  );
}

function routedDependencyLabel(
  family: CombinationFamily,
  dependency: ChallengeCombinationSupportChannelSettlementDependencyEvidenceItem['requiredSettlementDependencies'][number],
): string {
  return `challenge-${family === 'stem' ? 'target stem-combination' : 'root combination'} support-channel routed settlement dependency unresolved: ${dependency}`;
}

function settlementCapability(
  family: CombinationFamily,
  items: readonly ChallengeCombinationSupportChannelSettlementDependencyEvidenceItem[],
): string {
  const directRoutes = items.filter((item) => item.directContestSettlementRequired).length;
  const dependencyKinds = [
    ...new Set(items.flatMap((item) => item.requiredSettlementDependencies)),
  ].sort();
  return [
    `I56 ${family} support-channel settlement dependency routing: ${items.length} source route(s)`,
    `${directRoutes} direct-settlement route(s)`,
    `dependency kinds [${dependencyKinds.join(', ')}]`,
    'dependencies unresolved',
    'activation/persistence unresolved',
  ].join(', ');
}

function refineSettlementDependencies(
  base: ChallengeContextCapability,
  accepted: boolean,
  allItems: readonly ChallengeCombinationSupportChannelSettlementDependencyEvidenceItem[] | undefined,
): ChallengeContextCapability {
  if (
    base.dependency !== 'MECHANISM_EFFECTIVE_FORCE_CONTEXT' ||
    base.availability !== 'PARTIAL_SUBSTRATE'
  ) {
    return base;
  }

  const hasStemContestGap = base.unresolvedCapabilities.includes(STEM_CONTEST_SETTLEMENT_GAP);
  const hasRootContestGap = base.unresolvedCapabilities.includes(ROOT_CONTEST_SETTLEMENT_GAP);
  if (!hasStemContestGap && !hasRootContestGap) return base;

  if (!accepted) {
    return {
      ...base,
      unresolvedCapabilities: [...new Set([...base.unresolvedCapabilities, ALIGNMENT_GAP])].sort(),
    };
  }

  const items = allItems ?? [];
  const stemItems = familyItems(items, 'stem');
  const rootItems = familyItems(items, 'root');
  const unresolved = base.unresolvedCapabilities.filter((capability) => {
    if (capability === STEM_CONTEST_SETTLEMENT_GAP) return stemItems.length === 0;
    if (capability === ROOT_CONTEST_SETTLEMENT_GAP) return rootItems.length === 0;
    return true;
  });
  const existing = [...base.existingCapabilities];

  if (hasStemContestGap && stemItems.length > 0) {
    existing.push(settlementCapability('stem', stemItems));
    for (const dependency of new Set(stemItems.flatMap((item) => item.requiredSettlementDependencies))) {
      unresolved.push(routedDependencyLabel('stem', dependency));
    }
  }

  if (hasRootContestGap && rootItems.length > 0) {
    existing.push(settlementCapability('root', rootItems));
    for (const dependency of new Set(rootItems.flatMap((item) => item.requiredSettlementDependencies))) {
      unresolved.push(routedDependencyLabel('root', dependency));
    }
  }

  return {
    ...base,
    existingCapabilities: [...new Set(existing)],
    unresolvedCapabilities: [...new Set(unresolved)].sort(),
  };
}

export function buildI26ChallengeContextAvailabilityV18(
  availabilityV17: ChallengeContextAvailabilityV17Report,
  topologyEvidence: ChallengeCombinationSupportChannelContestTopologyEvidenceReport,
  settlementMethodology: ChallengeCombinationSupportChannelContestSettlementMethodologyReviewReport,
  settlementEvidence: ChallengeCombinationSupportChannelSettlementDependencyEvidenceReport,
): ChallengeContextAvailabilityV18Report {
  const settlementDependencyClosureAccepted =
    chainAligned(
      availabilityV17,
      topologyEvidence,
      settlementMethodology,
      settlementEvidence,
    ) && evidenceContractAccepted(settlementEvidence);

  const evidenceByMechanism = new Map<
    string,
    ChallengeCombinationSupportChannelSettlementDependencyEvidenceItem[]
  >();
  if (settlementDependencyClosureAccepted) {
    for (const item of settlementEvidence.items) {
      const current = evidenceByMechanism.get(item.mechanism) ?? [];
      current.push(item);
      evidenceByMechanism.set(item.mechanism, current);
    }
  }

  const mechanisms = availabilityV17.mechanisms.map((mechanism) => {
    const requiredContexts = mechanism.requiredContexts.map((context) =>
      refineSettlementDependencies(
        context,
        settlementDependencyClosureAccepted,
        evidenceByMechanism.get(mechanism.mechanism),
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
    reportVersion: I26_CHALLENGE_CONTEXT_AVAILABILITY_V18_VERSION,
    upstreamAvailabilityV17ReportId: availabilityV17.reportId,
    contestTopologyEvidenceReportId: topologyEvidence.reportId,
    contestSettlementMethodologyReviewId: settlementMethodology.reviewId,
    settlementDependencyEvidenceReportId: settlementEvidence.reportId,
    settlementDependencyClosureAccepted,
    mechanisms,
    allRequiredContextsHaveSubstrate,
    methodologyReadyForEffectResolution: false as const,
    challengeEffectVerdict: 'not_determined' as const,
    relativeForceVerdictAuthorized: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    notes: [
      'I26 v18 accepts I56 only when I26 v17 already accepted the exact I54 topology report and I56 is deterministically reproducible from that I54 report plus the exact I55 routing methodology.',
      'Aligned I56 evidence refines the broad support-channel contest outcome/persistence settlement blocker into explicit unresolved routed settlement dependencies for the affected combination family.',
      'Settlement dependency routing availability is not settlement resolution: every routed dependency remains unresolved and every I56 item keeps settlementDependenciesResolved=false.',
      'When an aligned source has NO_TRACKED_RELATION_TOUCH, no direct tracked-contest settlement dependency is added for that source, but the separate support-channel activation/persistence blocker remains unresolved.',
      'Current-combination, clash, competing-combination, and multi-touch routes do not emit binding, destruction, neutralization, rescue outcome, relative-force outcome, or cross-relation precedence.',
      'Existing relation-specific and broader mechanism dependencies remain independently unresolved even when an I56 routed dependency names the same underlying settlement domain.',
      'MECHANISM_EFFECTIVE_FORCE_CONTEXT remains PARTIAL_SUBSTRATE; effectReady remains false and no numeric scoring, relative-force verdict, challenge-effect verdict, or strong/weak classification is authorized.',
    ],
  };

  return {
    reportId: `challenge_context_availability_v18_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
