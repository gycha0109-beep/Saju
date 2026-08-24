import type { StructuralPillarInput } from '../calculation/structural-relations.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  ChallengeContextCapability,
  ChallengeMechanismContextAvailability,
} from './i26-challenge-context-availability.js';
import type { ChallengeContextAvailabilityV16Report } from './i26-challenge-context-availability-v16.js';
import type { ChallengeTargetCombinationConditionEvidenceReport } from './i39-challenge-target-combination-condition-evidence.js';
import type { ChallengeCombinationSupportChannelEvidenceReport } from './i52-challenge-combination-support-channel-evidence.js';
import type { ChallengeCombinationSupportChannelActivationPersistenceMethodologyReviewReport } from './i53-challenge-combination-support-channel-activation-persistence-methodology-review.js';
import {
  buildI54ChallengeCombinationSupportChannelContestTopologyEvidence,
  type ChallengeCombinationSupportChannelContestTopologyEvidenceItem,
  type ChallengeCombinationSupportChannelContestTopologyEvidenceReport,
} from './i54-challenge-combination-support-channel-contest-topology-evidence.js';

export const I26_CHALLENGE_CONTEXT_AVAILABILITY_V17_VERSION =
  'myeonghwa-challenge-context-availability-v17';

export interface ChallengeContextAvailabilityV17Report {
  reportId: string;
  reportVersion: string;
  upstreamAvailabilityV16ReportId: string;
  conditionEvidenceReportId: string;
  supportChannelEvidenceReportId: string;
  contestMethodologyReviewId: string;
  contestTopologyEvidenceReportId: string;
  contestTopologyClosureAccepted: boolean;
  mechanisms: readonly ChallengeMechanismContextAvailability[];
  allRequiredContextsHaveSubstrate: boolean;
  methodologyReadyForEffectResolution: false;
  challengeEffectVerdict: 'not_determined';
  relativeForceVerdictAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

const STEM_COMBINED_GAP =
  'challenge-target stem-combination support-channel activation/persistence and competing-interaction settlement';
const ROOT_COMBINED_GAP =
  'challenge-root combination support-channel activation/persistence and competing-interaction settlement';
const STEM_ACTIVATION_GAP =
  'challenge-target stem-combination support-channel activation/persistence';
const ROOT_ACTIVATION_GAP =
  'challenge-root combination support-channel activation/persistence';
const STEM_CONTEST_SETTLEMENT_GAP =
  'challenge-target stem-combination support-channel contest outcome/persistence settlement';
const ROOT_CONTEST_SETTLEMENT_GAP =
  'challenge-root combination support-channel contest outcome/persistence settlement';
const STEM_TOPOLOGY_EVIDENCE_GAP =
  'I54 direct contest topology evidence for routed stem-combination support-channel source identity';
const ROOT_TOPOLOGY_EVIDENCE_GAP =
  'I54 direct contest topology evidence for routed root-combination support-channel source identity';
const ALIGNMENT_GAP =
  'resolved I54 contest-topology evidence aligned to current pillars/I39/I52/I53/v16 identity';

function chainAligned(
  pillars: StructuralPillarInput,
  availabilityV16: ChallengeContextAvailabilityV16Report,
  conditionEvidence: ChallengeTargetCombinationConditionEvidenceReport,
  supportEvidence: ChallengeCombinationSupportChannelEvidenceReport,
  contestMethodology: ChallengeCombinationSupportChannelActivationPersistenceMethodologyReviewReport,
  contestEvidence: ChallengeCombinationSupportChannelContestTopologyEvidenceReport,
): boolean {
  if (!availabilityV16.supportChannelTopologyClosureAccepted) return false;
  if (availabilityV16.conditionEvidenceReportId !== conditionEvidence.reportId) return false;
  if (availabilityV16.supportChannelEvidenceReportId !== supportEvidence.reportId) return false;
  if (contestEvidence.upstreamI39ReportId !== conditionEvidence.reportId) return false;
  if (contestEvidence.upstreamI52ReportId !== supportEvidence.reportId) return false;
  if (contestEvidence.upstreamI53ReviewId !== contestMethodology.reviewId) return false;

  const expected = buildI54ChallengeCombinationSupportChannelContestTopologyEvidence(
    pillars,
    conditionEvidence,
    supportEvidence,
    contestMethodology,
  );
  return expected.reportId === contestEvidence.reportId;
}

function evidenceContractAccepted(
  contestEvidence: ChallengeCombinationSupportChannelContestTopologyEvidenceReport,
): boolean {
  return (
    contestEvidence.status === 'RESOLVED_CONTEST_TOPOLOGY_EVIDENCE' &&
    contestEvidence.contestTopologyEvidenceAvailable &&
    contestEvidence.supportChannelActivationVerdictAuthorized === false &&
    contestEvidence.supportChannelPersistenceVerdictAuthorized === false &&
    contestEvidence.supportChannelNeutralizationVerdictAuthorized === false &&
    contestEvidence.supportChannelDestructionVerdictAuthorized === false &&
    contestEvidence.supportChannelNetEffectVerdictAuthorized === false &&
    contestEvidence.effectiveMechanismForceVerdict === 'not_determined' &&
    contestEvidence.relationSpecificUsefulnessHarmfulness === 'not_determined' &&
    contestEvidence.classificationAuthorized === false &&
    contestEvidence.numericScoringAuthorized === false &&
    contestEvidence.items.every(
      (item) =>
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

function contestCapability(
  items: readonly ChallengeCombinationSupportChannelContestTopologyEvidenceItem[],
): string {
  const count = (state: ChallengeCombinationSupportChannelContestTopologyEvidenceItem['contestTopologyState']) =>
    items.filter((item) => item.contestTopologyState === state).length;
  return [
    `I54 direct structural contest topology: ${items.length} support-channel source route(s)`,
    `${count('NO_TRACKED_RELATION_TOUCH')} no-touch`,
    `${count('CURRENT_COMBINATION_PARTICIPATION')} current-combination`,
    `${count('COMPETING_CLASH_TOUCH')} competing-clash`,
    `${count('COMPETING_COMBINATION_TOUCH')} competing-combination`,
    `${count('MULTIPLE_TRACKED_RELATION_TOUCHES')} multi-touch`,
    'activation/persistence and contest outcome unresolved',
  ].join(', ');
}

function refineContestTopology(
  base: ChallengeContextCapability,
  accepted: boolean,
  items: readonly ChallengeCombinationSupportChannelContestTopologyEvidenceItem[] | undefined,
): ChallengeContextCapability {
  if (
    base.dependency !== 'MECHANISM_EFFECTIVE_FORCE_CONTEXT' ||
    base.availability !== 'PARTIAL_SUBSTRATE'
  ) {
    return base;
  }

  const hasStemGap = base.unresolvedCapabilities.includes(STEM_COMBINED_GAP);
  const hasRootGap = base.unresolvedCapabilities.includes(ROOT_COMBINED_GAP);
  if (!hasStemGap && !hasRootGap) return base;

  if (!accepted) {
    return {
      ...base,
      unresolvedCapabilities: [...new Set([...base.unresolvedCapabilities, ALIGNMENT_GAP])].sort(),
    };
  }

  const current = items ?? [];
  const hasStemEvidence = current.some(
    (item) => item.currentCombinationRelationKind === 'stem_five_combination',
  );
  const hasRootEvidence = current.some(
    (item) =>
      item.currentCombinationRelationKind === 'branch_six_combination' ||
      item.currentCombinationRelationKind === 'branch_three_combination',
  );

  const unresolved = base.unresolvedCapabilities.filter((capability) => {
    if (capability === STEM_COMBINED_GAP) return !hasStemEvidence;
    if (capability === ROOT_COMBINED_GAP) return !hasRootEvidence;
    return true;
  });

  if (hasStemGap && hasStemEvidence) {
    unresolved.push(STEM_ACTIVATION_GAP, STEM_CONTEST_SETTLEMENT_GAP);
  }
  if (hasRootGap && hasRootEvidence) {
    unresolved.push(ROOT_ACTIVATION_GAP, ROOT_CONTEST_SETTLEMENT_GAP);
  }
  if (hasStemGap && !hasStemEvidence) unresolved.push(STEM_TOPOLOGY_EVIDENCE_GAP);
  if (hasRootGap && !hasRootEvidence) unresolved.push(ROOT_TOPOLOGY_EVIDENCE_GAP);

  if (current.length === 0) {
    return {
      ...base,
      unresolvedCapabilities: [...new Set(unresolved)].sort(),
    };
  }

  return {
    ...base,
    existingCapabilities: [...new Set([...base.existingCapabilities, contestCapability(current)])],
    unresolvedCapabilities: [...new Set(unresolved)].sort(),
  };
}

export function buildI26ChallengeContextAvailabilityV17(
  pillars: StructuralPillarInput,
  availabilityV16: ChallengeContextAvailabilityV16Report,
  conditionEvidence: ChallengeTargetCombinationConditionEvidenceReport,
  supportEvidence: ChallengeCombinationSupportChannelEvidenceReport,
  contestMethodology: ChallengeCombinationSupportChannelActivationPersistenceMethodologyReviewReport,
  contestEvidence: ChallengeCombinationSupportChannelContestTopologyEvidenceReport,
): ChallengeContextAvailabilityV17Report {
  const contestTopologyClosureAccepted =
    chainAligned(
      pillars,
      availabilityV16,
      conditionEvidence,
      supportEvidence,
      contestMethodology,
      contestEvidence,
    ) && evidenceContractAccepted(contestEvidence);

  const evidenceByMechanism = new Map<
    string,
    ChallengeCombinationSupportChannelContestTopologyEvidenceItem[]
  >();
  if (contestTopologyClosureAccepted) {
    for (const item of contestEvidence.items) {
      const current = evidenceByMechanism.get(item.mechanism) ?? [];
      current.push(item);
      evidenceByMechanism.set(item.mechanism, current);
    }
  }

  const mechanisms = availabilityV16.mechanisms.map((mechanism) => {
    const requiredContexts = mechanism.requiredContexts.map((context) =>
      refineContestTopology(
        context,
        contestTopologyClosureAccepted,
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
    reportVersion: I26_CHALLENGE_CONTEXT_AVAILABILITY_V17_VERSION,
    upstreamAvailabilityV16ReportId: availabilityV16.reportId,
    conditionEvidenceReportId: conditionEvidence.reportId,
    supportChannelEvidenceReportId: supportEvidence.reportId,
    contestMethodologyReviewId: contestMethodology.reviewId,
    contestTopologyEvidenceReportId: contestEvidence.reportId,
    contestTopologyClosureAccepted,
    mechanisms,
    allRequiredContextsHaveSubstrate,
    methodologyReadyForEffectResolution: false as const,
    challengeEffectVerdict: 'not_determined' as const,
    relativeForceVerdictAuthorized: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    notes: [
      'I26 v17 accepts I54 only when v16 already accepted the aligned I52 topology chain and I54 is deterministically reproducible from the current pillars, exact I39, exact I52, and exact I53 review.',
      'For relation families with aligned I54 source routes, the v16 combined activation/persistence + competing-interaction gap is refined into separate activation/persistence and contest-outcome/persistence-settlement dependencies.',
      'Directional support-channel topology from I52 and direct structural contest topology from I54 are available substrate only; neither authorizes an ACTIVE, PERSISTED, NEUTRALIZED, DESTROYED, or net support-effect verdict.',
      'NO_TRACKED_RELATION_TOUCH remains absence of tracked direct contact rather than evidence of active or persistent support.',
      'CURRENT_COMBINATION_PARTICIPATION, COMPETING_CLASH_TOUCH, COMPETING_COMBINATION_TOUCH, and MULTIPLE_TRACKED_RELATION_TOUCHES remain topology states and do not settle binding, damage, destruction, neutralization, or precedence.',
      'Existing relation-specific binding/interaction, generic competing-relation settlement, contextual bureau-state, post-relation root-state, and effective-force blockers remain independently unresolved where applicable.',
      'MECHANISM_EFFECTIVE_FORCE_CONTEXT remains PARTIAL_SUBSTRATE; effectReady remains false and no numeric scoring or strong/weak classification is authorized.',
    ],
  };

  return {
    reportId: `challenge_context_availability_v17_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
