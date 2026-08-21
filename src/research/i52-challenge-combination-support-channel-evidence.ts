import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  ChallengeTargetCombinationConditionEvidenceItem,
  ChallengeTargetCombinationConditionEvidenceReport,
} from './i39-challenge-target-combination-condition-evidence.js';
import type {
  ChallengeCombinationSupportChannelKind,
  ChallengeCombinationSupportInterferenceEffectMethodologyReviewReport,
} from './i51-challenge-combination-support-interference-effect-methodology-review.js';

export const I52_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_EVIDENCE_VERSION =
  'myeonghwa-challenge-combination-support-channel-evidence-v1';

type PillarSlot = ChallengeTargetCombinationConditionEvidenceItem['subjectPosition'];
type ParticipantContext =
  ChallengeTargetCombinationConditionEvidenceItem['supportInterference']['participantContexts'][number];

export interface ChallengeCombinationSupportChannelEvidence {
  channelKind: ChallengeCombinationSupportChannelKind;
  sourcePillar: PillarSlot;
  sourceComponent: 'stem' | 'branch';
  activationState: 'not_determined';
  persistenceState: 'not_determined';
  numericWeight: 'not_assigned';
}

export interface ChallengeCombinationParticipantSupportChannelEvidence {
  participantPillar: PillarSlot;
  participantComponent: 'stem' | 'branch';
  participantValue: string;
  participantElement: ParticipantContext['element'];
  supportPresenceState: 'SUPPORT_CHANNELS_OBSERVED' | 'NO_TRACKED_SUPPORT_CHANNEL';
  supportChannels: readonly ChallengeCombinationSupportChannelEvidence[];
  supportActivationVerdict: 'not_determined';
  supportPersistenceVerdict: 'not_determined';
  netSupportInterferenceEffect: 'not_resolved';
  numericScore: 'not_assigned';
}

export interface ChallengeCombinationSupportChannelEvidenceItem {
  mechanism: ChallengeTargetCombinationConditionEvidenceItem['mechanism'];
  relationId: string;
  relationKind: ChallengeTargetCombinationConditionEvidenceItem['relationKind'];
  subjectKind: ChallengeTargetCombinationConditionEvidenceItem['subjectKind'];
  subjectPosition: PillarSlot;
  subjectValue: string;
  subjectSupportPresenceState: 'SUPPORT_CHANNELS_OBSERVED' | 'NO_TRACKED_SUPPORT_CHANNEL';
  subjectSupportChannels: readonly ChallengeCombinationSupportChannelEvidence[];
  participantSupport: readonly ChallengeCombinationParticipantSupportChannelEvidence[];
  supportTopologyState: 'RESOLVED_DIRECTIONAL_CHANNEL_TOPOLOGY';
  supportChannelAggregation: 'not_performed';
  supportChannelPrecedence: 'not_determined';
  netSupportInterferenceEffect: 'not_resolved';
  transformationConditionVerdict: 'not_determined';
  bindingState: 'not_determined';
  postInteractionBureauState: 'not_determined';
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  numericScore: 'not_assigned';
}

export interface ChallengeCombinationSupportChannelEvidenceReport {
  reportId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_SUPPORT_CHANNEL_EVIDENCE'
    | 'CONDITION_EVIDENCE_UNRESOLVED'
    | 'SUBJECT_PARTICIPANT_UNRESOLVED'
    | 'METHODOLOGY_NOT_AUTHORIZED';
  upstreamI39ReportId: string;
  upstreamI51ReviewId: string;
  items: readonly ChallengeCombinationSupportChannelEvidenceItem[];
  supportChannelEvidenceAvailable: boolean;
  supportChannelAggregationAuthorized: false;
  supportChannelPrecedenceResolved: false;
  supportChannelActivationVerdictAuthorized: false;
  supportChannelPersistenceVerdictAuthorized: false;
  netSupportInterferenceEffectAuthorized: false;
  postInteractionBureauStateEmissionAuthorized: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelEvidenceReport, 'reportId'>,
): ChallengeCombinationSupportChannelEvidenceReport {
  return {
    reportId: `challenge_combination_support_channel_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function unresolved(
  status: Exclude<
    ChallengeCombinationSupportChannelEvidenceReport['status'],
    'RESOLVED_SUPPORT_CHANNEL_EVIDENCE'
  >,
  conditionEvidence: ChallengeTargetCombinationConditionEvidenceReport,
  methodology: ChallengeCombinationSupportInterferenceEffectMethodologyReviewReport,
  notes: readonly string[],
): ChallengeCombinationSupportChannelEvidenceReport {
  return finalized({
    evidenceVersion: I52_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_EVIDENCE_VERSION,
    status,
    upstreamI39ReportId: conditionEvidence.reportId,
    upstreamI51ReviewId: methodology.reviewId,
    items: [],
    supportChannelEvidenceAvailable: false,
    supportChannelAggregationAuthorized: false,
    supportChannelPrecedenceResolved: false,
    supportChannelActivationVerdictAuthorized: false,
    supportChannelPersistenceVerdictAuthorized: false,
    netSupportInterferenceEffectAuthorized: false,
    postInteractionBureauStateEmissionAuthorized: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes,
  });
}

function methodologyAuthorized(
  methodology: ChallengeCombinationSupportInterferenceEffectMethodologyReviewReport,
): boolean {
  return (
    methodology.decision === 'SUPPORT_CHANNEL_DIRECTION_AUTHORIZED_NET_EFFECT_BLOCKED' &&
    methodology.sameElementSupportDirectionAuthorized &&
    methodology.resourceGenerationSupportDirectionAuthorized &&
    methodology.supportChannelPresenceStateAuthorized &&
    methodology.noTrackedSupportChannelStateAuthorized &&
    methodology.noTrackedSupportChannelMeansNegativeForce === false &&
    methodology.participantLocalSupportChannelIdentityAuthorized &&
    methodology.subjectLocalSupportChannelIdentityAuthorized &&
    methodology.visibleStemSupportChannelAuthorized &&
    methodology.branchSupportChannelAuthorized &&
    methodology.supportChannelMultiplicityMagnitudeInferenceAuthorized === false &&
    methodology.supportChannelCountAggregationAuthorized === false &&
    methodology.visibleStemVersusBranchFixedPrecedenceResolved === false &&
    methodology.sameElementVersusResourceFixedPrecedenceResolved === false &&
    methodology.supportChannelActivationVerdictAuthorized === false &&
    methodology.supportChannelPersistenceThroughClashAuthorized === false &&
    methodology.supportChannelPersistenceThroughCombinationAuthorized === false &&
    methodology.competingRelationNeutralizationVerdictAuthorized === false &&
    methodology.netSupportInterferenceEffectAuthorized === false &&
    methodology.supportDirectionToEffectiveMechanismForceAuthorized === false &&
    methodology.numericSupportWeightingAuthorized === false &&
    methodology.additiveSupportScoringAuthorized === false &&
    methodology.classificationAuthorized === false &&
    methodology.numericScoringAuthorized === false
  );
}

function channel(
  channelKind: ChallengeCombinationSupportChannelKind,
  sourcePillar: PillarSlot,
  sourceComponent: 'stem' | 'branch',
): ChallengeCombinationSupportChannelEvidence {
  return {
    channelKind,
    sourcePillar,
    sourceComponent,
    activationState: 'not_determined',
    persistenceState: 'not_determined',
    numericWeight: 'not_assigned',
  };
}

function participantChannels(
  participant: ParticipantContext,
): readonly ChallengeCombinationSupportChannelEvidence[] {
  const channels: ChallengeCombinationSupportChannelEvidence[] = [];

  for (const pillar of participant.visibleSameElementStemPositions) {
    if (participant.pillar === pillar && participant.component === 'stem') continue;
    channels.push(channel('SAME_ELEMENT_PEER_SUPPORT_CHANNEL', pillar, 'stem'));
  }
  for (const pillar of participant.sameElementBranchPositions) {
    if (participant.pillar === pillar && participant.component === 'branch') continue;
    channels.push(channel('SAME_ELEMENT_PEER_SUPPORT_CHANNEL', pillar, 'branch'));
  }
  for (const pillar of participant.visibleResourceStemPositions) {
    channels.push(channel('RESOURCE_GENERATION_SUPPORT_CHANNEL', pillar, 'stem'));
  }
  for (const pillar of participant.resourceBranchPositions) {
    channels.push(channel('RESOURCE_GENERATION_SUPPORT_CHANNEL', pillar, 'branch'));
  }

  const unique = new Map<string, ChallengeCombinationSupportChannelEvidence>();
  for (const item of channels) {
    const key = `${item.channelKind}|${item.sourcePillar}|${item.sourceComponent}`;
    unique.set(key, item);
  }
  return [...unique.values()].sort((left, right) =>
    `${left.sourcePillar}|${left.sourceComponent}|${left.channelKind}`.localeCompare(
      `${right.sourcePillar}|${right.sourceComponent}|${right.channelKind}`,
    ),
  );
}

function participantEvidence(
  participant: ParticipantContext,
): ChallengeCombinationParticipantSupportChannelEvidence {
  const channels = participantChannels(participant);
  return {
    participantPillar: participant.pillar,
    participantComponent: participant.component,
    participantValue: String(participant.value),
    participantElement: participant.element,
    supportPresenceState:
      channels.length === 0 ? 'NO_TRACKED_SUPPORT_CHANNEL' : 'SUPPORT_CHANNELS_OBSERVED',
    supportChannels: channels,
    supportActivationVerdict: 'not_determined',
    supportPersistenceVerdict: 'not_determined',
    netSupportInterferenceEffect: 'not_resolved',
    numericScore: 'not_assigned',
  };
}

function subjectComponent(
  item: ChallengeTargetCombinationConditionEvidenceItem,
): 'stem' | 'branch' {
  return item.subjectKind === 'VISIBLE_TARGET_STEM' ? 'stem' : 'branch';
}

function matchingSubjectParticipant(
  item: ChallengeTargetCombinationConditionEvidenceItem,
): ParticipantContext | undefined {
  const component = subjectComponent(item);
  return item.supportInterference.participantContexts.find(
    (participant) =>
      participant.pillar === item.subjectPosition &&
      participant.component === component &&
      String(participant.value) === String(item.subjectValue),
  );
}

function evidenceItem(
  item: ChallengeTargetCombinationConditionEvidenceItem,
): ChallengeCombinationSupportChannelEvidenceItem {
  const participants = item.supportInterference.participantContexts.map(participantEvidence);
  const component = subjectComponent(item);
  const subject = participants.find(
    (participant) =>
      participant.participantPillar === item.subjectPosition &&
      participant.participantComponent === component &&
      participant.participantValue === String(item.subjectValue),
  );
  if (subject === undefined) throw new Error('I52 subject participant must be prevalidated.');

  return {
    mechanism: item.mechanism,
    relationId: item.relationId,
    relationKind: item.relationKind,
    subjectKind: item.subjectKind,
    subjectPosition: item.subjectPosition,
    subjectValue: String(item.subjectValue),
    subjectSupportPresenceState: subject.supportPresenceState,
    subjectSupportChannels: subject.supportChannels,
    participantSupport: participants,
    supportTopologyState: 'RESOLVED_DIRECTIONAL_CHANNEL_TOPOLOGY',
    supportChannelAggregation: 'not_performed',
    supportChannelPrecedence: 'not_determined',
    netSupportInterferenceEffect: 'not_resolved',
    transformationConditionVerdict: 'not_determined',
    bindingState: 'not_determined',
    postInteractionBureauState: 'not_determined',
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    numericScore: 'not_assigned',
  };
}

export function buildI52ChallengeCombinationSupportChannelEvidence(
  conditionEvidence: ChallengeTargetCombinationConditionEvidenceReport,
  methodology: ChallengeCombinationSupportInterferenceEffectMethodologyReviewReport,
): ChallengeCombinationSupportChannelEvidenceReport {
  if (conditionEvidence.status !== 'RESOLVED_CONDITION_EVIDENCE') {
    return unresolved('CONDITION_EVIDENCE_UNRESOLVED', conditionEvidence, methodology, [
      'Resolved I39 condition evidence is required before I52 support-channel materialization.',
    ]);
  }
  if (!methodologyAuthorized(methodology)) {
    return unresolved('METHODOLOGY_NOT_AUTHORIZED', conditionEvidence, methodology, [
      'I51 does not authorize the identity-local directional support-channel contract required by I52.',
    ]);
  }
  if (conditionEvidence.items.some((item) => matchingSubjectParticipant(item) === undefined)) {
    return unresolved('SUBJECT_PARTICIPANT_UNRESOLVED', conditionEvidence, methodology, [
      'Every routed I39 combination item must contain its exact subject as a relation participant before subject-local support channels can be emitted.',
    ]);
  }

  const items = conditionEvidence.items.map(evidenceItem);
  return finalized({
    evidenceVersion: I52_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_EVIDENCE_VERSION,
    status: 'RESOLVED_SUPPORT_CHANNEL_EVIDENCE',
    upstreamI39ReportId: conditionEvidence.reportId,
    upstreamI51ReviewId: methodology.reviewId,
    items,
    supportChannelEvidenceAvailable: true,
    supportChannelAggregationAuthorized: false,
    supportChannelPrecedenceResolved: false,
    supportChannelActivationVerdictAuthorized: false,
    supportChannelPersistenceVerdictAuthorized: false,
    netSupportInterferenceEffectAuthorized: false,
    postInteractionBureauStateEmissionAuthorized: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes: [
      'I52 materializes only identity-local same-element and resource-generation support channels already implied by the I39 participant positional context.',
      'A participant is excluded from supporting itself through the same pillar/component same-element channel; distinct components at the same pillar remain distinct structural sources.',
      'NO_TRACKED_SUPPORT_CHANNEL is an evidence state, not a weakness or negative-force verdict.',
      'Channel multiplicity is not aggregated or interpreted as magnitude, and no fixed precedence is assigned between channel kinds or locations.',
      'Activation, persistence through clash/combination, competing-relation neutralization, and net support/interference effect remain unresolved.',
      'Transformation, binding, bureau survival, post-relation root state, effective mechanism force, usefulness/harmfulness, scoring, and classification remain unresolved or unauthorized.',
    ],
  });
}
