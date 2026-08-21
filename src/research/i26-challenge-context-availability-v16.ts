import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  ChallengeContextCapability,
  ChallengeMechanismContextAvailability,
} from './i26-challenge-context-availability.js';
import type { ChallengeContextAvailabilityV15Report } from './i26-challenge-context-availability-v15.js';
import type { ChallengeTargetCombinationConditionEvidenceReport } from './i39-challenge-target-combination-condition-evidence.js';
import type { ChallengeCombinationSupportInterferenceEffectMethodologyReviewReport } from './i51-challenge-combination-support-interference-effect-methodology-review.js';
import {
  buildI52ChallengeCombinationSupportChannelEvidence,
  type ChallengeCombinationSupportChannelEvidenceItem,
  type ChallengeCombinationSupportChannelEvidenceReport,
} from './i52-challenge-combination-support-channel-evidence.js';

export const I26_CHALLENGE_CONTEXT_AVAILABILITY_V16_VERSION =
  'myeonghwa-challenge-context-availability-v16';

export interface ChallengeContextAvailabilityV16Report {
  reportId: string;
  reportVersion: string;
  upstreamAvailabilityV15ReportId: string;
  conditionEvidenceReportId: string;
  supportMethodologyReviewId: string;
  supportChannelEvidenceReportId: string;
  supportChannelTopologyClosureAccepted: boolean;
  mechanisms: readonly ChallengeMechanismContextAvailability[];
  allRequiredContextsHaveSubstrate: boolean;
  methodologyReadyForEffectResolution: false;
  challengeEffectVerdict: 'not_determined';
  relativeForceVerdictAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

const STEM_SUPPORT_GAP = 'challenge-target stem-combination support/interference effect';
const ROOT_SUPPORT_GAP = 'challenge-root combination support/interference effect';
const STEM_ACTIVATION_GAP =
  'challenge-target stem-combination support-channel activation/persistence and competing-interaction settlement';
const ROOT_ACTIVATION_GAP =
  'challenge-root combination support-channel activation/persistence and competing-interaction settlement';
const ALIGNMENT_GAP =
  'resolved I52 support-channel evidence aligned to current I39/I51/v15 identity';

function chainAligned(
  availabilityV15: ChallengeContextAvailabilityV15Report,
  conditionEvidence: ChallengeTargetCombinationConditionEvidenceReport,
  supportMethodology: ChallengeCombinationSupportInterferenceEffectMethodologyReviewReport,
  supportEvidence: ChallengeCombinationSupportChannelEvidenceReport,
): boolean {
  if (availabilityV15.conditionEvidenceReportId !== conditionEvidence.reportId) return false;
  if (supportEvidence.upstreamI39ReportId !== conditionEvidence.reportId) return false;
  if (supportEvidence.upstreamI51ReviewId !== supportMethodology.reviewId) return false;

  const expected = buildI52ChallengeCombinationSupportChannelEvidence(
    conditionEvidence,
    supportMethodology,
  );
  return expected.reportId === supportEvidence.reportId;
}

function evidenceContractAccepted(
  supportEvidence: ChallengeCombinationSupportChannelEvidenceReport,
): boolean {
  return (
    supportEvidence.status === 'RESOLVED_SUPPORT_CHANNEL_EVIDENCE' &&
    supportEvidence.supportChannelEvidenceAvailable &&
    supportEvidence.supportChannelAggregationAuthorized === false &&
    supportEvidence.supportChannelPrecedenceResolved === false &&
    supportEvidence.supportChannelActivationVerdictAuthorized === false &&
    supportEvidence.supportChannelPersistenceVerdictAuthorized === false &&
    supportEvidence.netSupportInterferenceEffectAuthorized === false &&
    supportEvidence.postInteractionBureauStateEmissionAuthorized === false &&
    supportEvidence.targetPostRelationRootState === 'not_determined' &&
    supportEvidence.effectiveMechanismForceVerdict === 'not_determined' &&
    supportEvidence.relationSpecificUsefulnessHarmfulness === 'not_determined' &&
    supportEvidence.classificationAuthorized === false &&
    supportEvidence.numericScoringAuthorized === false &&
    supportEvidence.items.every(
      (item) =>
        item.supportTopologyState === 'RESOLVED_DIRECTIONAL_CHANNEL_TOPOLOGY' &&
        item.supportChannelAggregation === 'not_performed' &&
        item.supportChannelPrecedence === 'not_determined' &&
        item.netSupportInterferenceEffect === 'not_resolved' &&
        item.transformationConditionVerdict === 'not_determined' &&
        item.bindingState === 'not_determined' &&
        item.postInteractionBureauState === 'not_determined' &&
        item.targetPostRelationRootState === 'not_determined' &&
        item.effectiveMechanismForceVerdict === 'not_determined' &&
        item.relationSpecificUsefulnessHarmfulness === 'not_determined' &&
        item.numericScore === 'not_assigned'
    )
  );
}

function supportCapability(
  items: readonly ChallengeCombinationSupportChannelEvidenceItem[],
): string {
  const subjectObserved = items.filter(
    (item) => item.subjectSupportPresenceState === 'SUPPORT_CHANNELS_OBSERVED',
  ).length;
  const subjectNone = items.length - subjectObserved;
  const subjectChannels = items.reduce(
    (sum, item) => sum + item.subjectSupportChannels.length,
    0,
  );
  const participantChannels = items.reduce(
    (sum, item) =>
      sum + item.participantSupport.reduce((nested, participant) => nested + participant.supportChannels.length, 0),
    0,
  );
  return `I52 directional support-channel topology: ${items.length} combination item(s), ${subjectObserved} subject(s) with tracked channel(s), ${subjectNone} subject(s) with no tracked channel, ${subjectChannels} subject-local channel(s), ${participantChannels} participant-local channel(s); activation/persistence/net effect unresolved`;
}

function refineSupportTopology(
  base: ChallengeContextCapability,
  accepted: boolean,
  items: readonly ChallengeCombinationSupportChannelEvidenceItem[] | undefined,
): ChallengeContextCapability {
  if (
    base.dependency !== 'MECHANISM_EFFECTIVE_FORCE_CONTEXT' ||
    base.availability !== 'PARTIAL_SUBSTRATE'
  ) {
    return base;
  }

  const hasStemGap = base.unresolvedCapabilities.includes(STEM_SUPPORT_GAP);
  const hasRootGap = base.unresolvedCapabilities.includes(ROOT_SUPPORT_GAP);
  if (!hasStemGap && !hasRootGap) return base;

  if (!accepted) {
    return {
      ...base,
      unresolvedCapabilities: [...new Set([...base.unresolvedCapabilities, ALIGNMENT_GAP])].sort(),
    };
  }

  const current = items ?? [];
  const hasStemEvidence = current.some((item) => item.relationKind === 'stem_five_combination');
  const hasRootEvidence = current.some(
    (item) =>
      item.relationKind === 'branch_six_combination' ||
      item.relationKind === 'branch_three_combination',
  );

  const unresolved = base.unresolvedCapabilities.filter((capability) => {
    if (capability === STEM_SUPPORT_GAP) return !hasStemEvidence;
    if (capability === ROOT_SUPPORT_GAP) return !hasRootEvidence;
    return true;
  });

  if (hasStemGap && hasStemEvidence) unresolved.push(STEM_ACTIVATION_GAP);
  if (hasRootGap && hasRootEvidence) unresolved.push(ROOT_ACTIVATION_GAP);
  if (hasStemGap && !hasStemEvidence) {
    unresolved.push('I52 support-channel evidence for routed stem-combination identity');
  }
  if (hasRootGap && !hasRootEvidence) {
    unresolved.push('I52 support-channel evidence for routed root-combination identity');
  }

  if (current.length === 0) {
    return {
      ...base,
      unresolvedCapabilities: [...new Set(unresolved)].sort(),
    };
  }

  return {
    ...base,
    existingCapabilities: [...new Set([...base.existingCapabilities, supportCapability(current)])],
    unresolvedCapabilities: [...new Set(unresolved)].sort(),
  };
}

export function buildI26ChallengeContextAvailabilityV16(
  availabilityV15: ChallengeContextAvailabilityV15Report,
  conditionEvidence: ChallengeTargetCombinationConditionEvidenceReport,
  supportMethodology: ChallengeCombinationSupportInterferenceEffectMethodologyReviewReport,
  supportEvidence: ChallengeCombinationSupportChannelEvidenceReport,
): ChallengeContextAvailabilityV16Report {
  const supportChannelTopologyClosureAccepted =
    chainAligned(availabilityV15, conditionEvidence, supportMethodology, supportEvidence) &&
    evidenceContractAccepted(supportEvidence);

  const evidenceByMechanism = new Map<string, ChallengeCombinationSupportChannelEvidenceItem[]>();
  if (supportChannelTopologyClosureAccepted) {
    for (const item of supportEvidence.items) {
      const current = evidenceByMechanism.get(item.mechanism) ?? [];
      current.push(item);
      evidenceByMechanism.set(item.mechanism, current);
    }
  }

  const mechanisms = availabilityV15.mechanisms.map((mechanism) => {
    const requiredContexts = mechanism.requiredContexts.map((context) =>
      refineSupportTopology(
        context,
        supportChannelTopologyClosureAccepted,
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
    reportVersion: I26_CHALLENGE_CONTEXT_AVAILABILITY_V16_VERSION,
    upstreamAvailabilityV15ReportId: availabilityV15.reportId,
    conditionEvidenceReportId: conditionEvidence.reportId,
    supportMethodologyReviewId: supportMethodology.reviewId,
    supportChannelEvidenceReportId: supportEvidence.reportId,
    supportChannelTopologyClosureAccepted,
    mechanisms,
    allRequiredContextsHaveSubstrate,
    methodologyReadyForEffectResolution: false as const,
    challengeEffectVerdict: 'not_determined' as const,
    relativeForceVerdictAuthorized: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    notes: [
      'I26 v16 accepts I52 only when it is bound to the same I39 condition report carried by v15, the same I51 methodology review, and deterministic I52 recomputation.',
      'The broad support/interference capability gap is removed only for the relation family that has aligned I52 directional support-channel topology.',
      'The broad gap is replaced by a narrower support-channel activation/persistence and competing-interaction settlement dependency; channel presence alone does not settle net support effect.',
      'NO_TRACKED_SUPPORT_CHANNEL remains an evidence state and is not converted into weakness, negative force, damage, or relation failure.',
      'Channel multiplicity is not treated as magnitude and no fixed precedence is assigned between same-element/resource or stem/branch channels.',
      'Seasonal-disposition closure from I49/I50/v15 remains intact, while binding, generic competing-relation settlement, contextual bureau state, post-relation root state, and effective mechanism force remain independently unresolved where applicable.',
      'MECHANISM_EFFECTIVE_FORCE_CONTEXT remains PARTIAL_SUBSTRATE; effectReady remains false and no numeric scoring or strong/weak classification is authorized.',
    ],
  };

  return {
    reportId: `challenge_context_availability_v16_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}
