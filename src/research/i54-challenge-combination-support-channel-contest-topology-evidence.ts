import {
  deriveStructuralRelationCandidates,
  type PillarSlot,
  type StructuralPillarInput,
  type StructuralRelationCandidate,
  type StructuralRelationKind,
} from '../calculation/structural-relations.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  ChallengeTargetCombinationConditionEvidenceItem,
  ChallengeTargetCombinationConditionEvidenceReport,
} from './i39-challenge-target-combination-condition-evidence.js';
import type {
  ChallengeCombinationParticipantSupportChannelEvidence,
  ChallengeCombinationSupportChannelEvidence,
  ChallengeCombinationSupportChannelEvidenceItem,
  ChallengeCombinationSupportChannelEvidenceReport,
} from './i52-challenge-combination-support-channel-evidence.js';
import {
  buildI53ChallengeCombinationSupportChannelActivationPersistenceMethodologyReview,
  type ChallengeCombinationSupportChannelActivationPersistenceMethodologyReviewReport,
  type ChallengeCombinationSupportChannelContestTopologyState,
} from './i53-challenge-combination-support-channel-activation-persistence-methodology-review.js';

export const I54_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_CONTEST_TOPOLOGY_EVIDENCE_VERSION =
  'myeonghwa-challenge-combination-support-channel-contest-topology-evidence-v1';

const PILLAR_ORDER = ['year', 'month', 'day', 'hour'] as const satisfies readonly PillarSlot[];

type ParticipantContext =
  ChallengeTargetCombinationConditionEvidenceItem['supportInterference']['participantContexts'][number];

export interface ChallengeCombinationSupportChannelContestTopologyEvidenceItem {
  mechanism: ChallengeTargetCombinationConditionEvidenceItem['mechanism'];
  currentCombinationRelationId: string;
  currentCombinationRelationKind: ChallengeTargetCombinationConditionEvidenceItem['relationKind'];
  targetParticipantPillar: PillarSlot;
  targetParticipantComponent: 'stem' | 'branch';
  targetParticipantValue: string;
  supportChannelKind: ChallengeCombinationSupportChannelEvidence['channelKind'];
  sourcePillar: PillarSlot;
  sourceComponent: 'stem' | 'branch';
  sourceValue: string;
  contestTopologyState: ChallengeCombinationSupportChannelContestTopologyState;
  touchingRelationIds: readonly string[];
  touchingRelationKinds: readonly StructuralRelationKind[];
  touchCount: number;
  supportChannelActive: 'not_determined';
  supportChannelPersisted: 'not_determined';
  supportChannelNeutralized: 'not_determined';
  supportChannelDestroyed: 'not_determined';
  supportChannelNetEffect: 'not_resolved';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  numericScore: 'not_assigned';
}

export interface ChallengeCombinationSupportChannelContestTopologyEvidenceReport {
  reportId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_CONTEST_TOPOLOGY_EVIDENCE'
    | 'PILLARS_UNRESOLVED'
    | 'I39_UNRESOLVED_OR_MISALIGNED'
    | 'I52_UNRESOLVED_OR_MISALIGNED'
    | 'I53_METHODOLOGY_NOT_AUTHORIZED'
    | 'SUPPORT_SOURCE_IDENTITY_MISMATCH'
    | 'CURRENT_COMBINATION_IDENTITY_MISMATCH';
  upstreamI39ReportId: string;
  upstreamI52ReportId: string;
  upstreamI53ReviewId: string;
  items: readonly ChallengeCombinationSupportChannelContestTopologyEvidenceItem[];
  contestTopologyEvidenceAvailable: boolean;
  supportChannelActivationVerdictAuthorized: false;
  supportChannelPersistenceVerdictAuthorized: false;
  supportChannelNeutralizationVerdictAuthorized: false;
  supportChannelDestructionVerdictAuthorized: false;
  supportChannelNetEffectVerdictAuthorized: false;
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelContestTopologyEvidenceReport, 'reportId'>,
): ChallengeCombinationSupportChannelContestTopologyEvidenceReport {
  return {
    reportId: `challenge_combination_support_channel_contest_topology_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function unresolved(
  status: Exclude<
    ChallengeCombinationSupportChannelContestTopologyEvidenceReport['status'],
    'RESOLVED_CONTEST_TOPOLOGY_EVIDENCE'
  >,
  conditionEvidence: ChallengeTargetCombinationConditionEvidenceReport,
  supportEvidence: ChallengeCombinationSupportChannelEvidenceReport,
  methodology: ChallengeCombinationSupportChannelActivationPersistenceMethodologyReviewReport,
  notes: readonly string[],
): ChallengeCombinationSupportChannelContestTopologyEvidenceReport {
  return finalized({
    evidenceVersion: I54_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_CONTEST_TOPOLOGY_EVIDENCE_VERSION,
    status,
    upstreamI39ReportId: conditionEvidence.reportId,
    upstreamI52ReportId: supportEvidence.reportId,
    upstreamI53ReviewId: methodology.reviewId,
    items: [],
    contestTopologyEvidenceAvailable: false,
    supportChannelActivationVerdictAuthorized: false,
    supportChannelPersistenceVerdictAuthorized: false,
    supportChannelNeutralizationVerdictAuthorized: false,
    supportChannelDestructionVerdictAuthorized: false,
    supportChannelNetEffectVerdictAuthorized: false,
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes,
  });
}

function pillarsResolved(pillars: StructuralPillarInput): boolean {
  return PILLAR_ORDER.every((slot) => pillars[slot] !== undefined);
}

function methodologyAuthorized(
  methodology: ChallengeCombinationSupportChannelActivationPersistenceMethodologyReviewReport,
): boolean {
  const canonical =
    buildI53ChallengeCombinationSupportChannelActivationPersistenceMethodologyReview();
  return (
    methodology.reviewId === canonical.reviewId &&
    methodology.decision ===
      'DIRECT_CONTEST_ROUTING_AUTHORIZED_ACTIVATION_PERSISTENCE_VERDICT_BLOCKED' &&
    methodology.supportChannelContestTopologyRoutingAuthorized &&
    methodology.noTrackedRelationTouchStateAuthorized &&
    methodology.currentCombinationParticipationTouchAuthorized &&
    methodology.competingClashTouchAuthorized &&
    methodology.competingCombinationTouchAuthorized &&
    methodology.multipleTrackedRelationTouchesAuthorized &&
    methodology.noTrackedRelationTouchMeansActivated === false &&
    methodology.noTrackedRelationTouchMeansPersistent === false &&
    methodology.currentCombinationParticipationMeansNeutralized === false &&
    methodology.competingClashTouchMeansBroken === false &&
    methodology.competingCombinationTouchMeansBound === false &&
    methodology.directContestTopologyToActivationVerdictAuthorized === false &&
    methodology.directContestTopologyToPersistenceVerdictAuthorized === false &&
    methodology.directContestTopologyToNeutralizationVerdictAuthorized === false &&
    methodology.supportChannelAggregationAuthorized === false &&
    methodology.numericSupportWeightingAuthorized === false &&
    methodology.activationPersistenceToNetSupportEffectAuthorized === false &&
    methodology.activationPersistenceToEffectiveMechanismForceAuthorized === false &&
    methodology.classificationAuthorized === false &&
    methodology.numericScoringAuthorized === false
  );
}

function relationForCondition(
  item: ChallengeTargetCombinationConditionEvidenceItem,
  relations: readonly StructuralRelationCandidate[],
): StructuralRelationCandidate | undefined {
  return relations.find(
    (relation) =>
      relation.relationId === item.relationId && relation.kind === item.relationKind,
  );
}

function conditionItemAlignedToCurrentRelation(
  item: ChallengeTargetCombinationConditionEvidenceItem,
  relation: StructuralRelationCandidate,
): boolean {
  const participants = item.supportInterference.participantContexts;
  if (participants.length !== relation.participants.length) return false;
  if (
    !relation.participants.every((participant) =>
      participants.some(
        (candidate) =>
          candidate.pillar === participant.pillar &&
          candidate.component === participant.component &&
          String(candidate.value) === String(participant.value),
      ),
    )
  ) {
    return false;
  }

  const subjectComponent = item.subjectKind === 'VISIBLE_TARGET_STEM' ? 'stem' : 'branch';
  return participants.some(
    (participant) =>
      participant.pillar === item.subjectPosition &&
      participant.component === subjectComponent &&
      String(participant.value) === String(item.subjectValue),
  );
}

function supportItemForCondition(
  condition: ChallengeTargetCombinationConditionEvidenceItem,
  supportEvidence: ChallengeCombinationSupportChannelEvidenceReport,
): ChallengeCombinationSupportChannelEvidenceItem | undefined {
  return supportEvidence.items.find(
    (item) =>
      item.mechanism === condition.mechanism &&
      item.relationId === condition.relationId &&
      item.relationKind === condition.relationKind &&
      item.subjectKind === condition.subjectKind &&
      item.subjectPosition === condition.subjectPosition &&
      String(item.subjectValue) === String(condition.subjectValue),
  );
}

function supportEvidenceAligned(
  conditionEvidence: ChallengeTargetCombinationConditionEvidenceReport,
  supportEvidence: ChallengeCombinationSupportChannelEvidenceReport,
): boolean {
  if (
    supportEvidence.status !== 'RESOLVED_SUPPORT_CHANNEL_EVIDENCE' ||
    !supportEvidence.supportChannelEvidenceAvailable ||
    supportEvidence.upstreamI39ReportId !== conditionEvidence.reportId ||
    supportEvidence.items.length !== conditionEvidence.items.length
  ) {
    return false;
  }

  return conditionEvidence.items.every((condition) => {
    const support = supportItemForCondition(condition, supportEvidence);
    if (support === undefined) return false;
    const participants = condition.supportInterference.participantContexts;
    if (support.participantSupport.length !== participants.length) return false;
    return participants.every((participant) =>
      support.participantSupport.some(
        (candidate) =>
          candidate.participantPillar === participant.pillar &&
          candidate.participantComponent === participant.component &&
          candidate.participantValue === String(participant.value) &&
          candidate.participantElement === participant.element,
      ),
    );
  });
}

function channelIdentityKey(
  channelKind: ChallengeCombinationSupportChannelEvidence['channelKind'],
  sourcePillar: PillarSlot,
  sourceComponent: 'stem' | 'branch',
): string {
  return `${channelKind}|${sourcePillar}|${sourceComponent}`;
}

function expectedChannelIdentityKeys(participant: ParticipantContext): ReadonlySet<string> {
  const keys = new Set<string>();

  for (const pillar of participant.visibleSameElementStemPositions) {
    if (participant.pillar === pillar && participant.component === 'stem') continue;
    keys.add(channelIdentityKey('SAME_ELEMENT_PEER_SUPPORT_CHANNEL', pillar, 'stem'));
  }
  for (const pillar of participant.sameElementBranchPositions) {
    if (participant.pillar === pillar && participant.component === 'branch') continue;
    keys.add(channelIdentityKey('SAME_ELEMENT_PEER_SUPPORT_CHANNEL', pillar, 'branch'));
  }
  for (const pillar of participant.visibleResourceStemPositions) {
    keys.add(channelIdentityKey('RESOURCE_GENERATION_SUPPORT_CHANNEL', pillar, 'stem'));
  }
  for (const pillar of participant.resourceBranchPositions) {
    keys.add(channelIdentityKey('RESOURCE_GENERATION_SUPPORT_CHANNEL', pillar, 'branch'));
  }

  return keys;
}

function participantForSupport(
  condition: ChallengeTargetCombinationConditionEvidenceItem,
  support: ChallengeCombinationParticipantSupportChannelEvidence,
): ParticipantContext | undefined {
  return condition.supportInterference.participantContexts.find(
    (participant) =>
      participant.pillar === support.participantPillar &&
      participant.component === support.participantComponent &&
      String(participant.value) === support.participantValue &&
      participant.element === support.participantElement,
  );
}

function supportSourceIdentitiesAligned(
  conditionEvidence: ChallengeTargetCombinationConditionEvidenceReport,
  supportEvidence: ChallengeCombinationSupportChannelEvidenceReport,
): boolean {
  return conditionEvidence.items.every((condition) => {
    const supportItem = supportItemForCondition(condition, supportEvidence);
    if (supportItem === undefined) return false;

    return supportItem.participantSupport.every((participantSupport) => {
      const participant = participantForSupport(condition, participantSupport);
      if (participant === undefined) return false;
      const expected = expectedChannelIdentityKeys(participant);
      const actual = new Set(
        participantSupport.supportChannels.map((channel) =>
          channelIdentityKey(
            channel.channelKind,
            channel.sourcePillar,
            channel.sourceComponent,
          ),
        ),
      );
      if (actual.size !== participantSupport.supportChannels.length) return false;
      if (actual.size !== expected.size) return false;
      return [...actual].every((key) => expected.has(key));
    });
  });
}

function currentSourceValue(
  pillars: StructuralPillarInput,
  sourcePillar: PillarSlot,
  sourceComponent: 'stem' | 'branch',
): string | undefined {
  const pillar = pillars[sourcePillar];
  if (pillar === undefined) return undefined;
  return String(
    sourceComponent === 'stem' ? pillar.stem.value : pillar.branch.value,
  );
}

function touchingRelations(
  relations: readonly StructuralRelationCandidate[],
  sourcePillar: PillarSlot,
  sourceComponent: 'stem' | 'branch',
  sourceValue: string,
): readonly StructuralRelationCandidate[] {
  return relations.filter((relation) =>
    relation.participants.some(
      (participant) =>
        participant.pillar === sourcePillar &&
        participant.component === sourceComponent &&
        String(participant.value) === sourceValue,
    ),
  );
}

function topologyState(
  currentCombinationRelationId: string,
  touches: readonly StructuralRelationCandidate[],
): ChallengeCombinationSupportChannelContestTopologyState {
  if (touches.length === 0) return 'NO_TRACKED_RELATION_TOUCH';
  if (touches.length > 1) return 'MULTIPLE_TRACKED_RELATION_TOUCHES';

  const touch = touches[0];
  if (touch === undefined) return 'NO_TRACKED_RELATION_TOUCH';
  if (touch.relationId === currentCombinationRelationId) {
    return 'CURRENT_COMBINATION_PARTICIPATION';
  }
  if (touch.kind === 'branch_clash') return 'COMPETING_CLASH_TOUCH';
  return 'COMPETING_COMBINATION_TOUCH';
}

function evidenceItems(
  pillars: StructuralPillarInput,
  conditionEvidence: ChallengeTargetCombinationConditionEvidenceReport,
  supportEvidence: ChallengeCombinationSupportChannelEvidenceReport,
  relations: readonly StructuralRelationCandidate[],
): readonly ChallengeCombinationSupportChannelContestTopologyEvidenceItem[] | undefined {
  const result: ChallengeCombinationSupportChannelContestTopologyEvidenceItem[] = [];

  for (const condition of conditionEvidence.items) {
    const supportItem = supportItemForCondition(condition, supportEvidence);
    if (supportItem === undefined) return undefined;

    for (const participant of supportItem.participantSupport) {
      for (const channel of participant.supportChannels) {
        const sourceValue = currentSourceValue(
          pillars,
          channel.sourcePillar,
          channel.sourceComponent,
        );
        if (sourceValue === undefined) return undefined;

        const touches = touchingRelations(
          relations,
          channel.sourcePillar,
          channel.sourceComponent,
          sourceValue,
        );
        const touchingRelationKinds = [
          ...new Set(touches.map((touch) => touch.kind)),
        ].sort() as StructuralRelationKind[];

        result.push({
          mechanism: condition.mechanism,
          currentCombinationRelationId: condition.relationId,
          currentCombinationRelationKind: condition.relationKind,
          targetParticipantPillar: participant.participantPillar,
          targetParticipantComponent: participant.participantComponent,
          targetParticipantValue: participant.participantValue,
          supportChannelKind: channel.channelKind,
          sourcePillar: channel.sourcePillar,
          sourceComponent: channel.sourceComponent,
          sourceValue,
          contestTopologyState: topologyState(condition.relationId, touches),
          touchingRelationIds: touches.map((touch) => touch.relationId).sort(),
          touchingRelationKinds,
          touchCount: touches.length,
          supportChannelActive: 'not_determined',
          supportChannelPersisted: 'not_determined',
          supportChannelNeutralized: 'not_determined',
          supportChannelDestroyed: 'not_determined',
          supportChannelNetEffect: 'not_resolved',
          effectiveMechanismForceVerdict: 'not_determined',
          relationSpecificUsefulnessHarmfulness: 'not_determined',
          numericScore: 'not_assigned',
        });
      }
    }
  }

  return result.sort((left, right) =>
    [
      left.mechanism,
      left.currentCombinationRelationId,
      left.targetParticipantPillar,
      left.targetParticipantComponent,
      left.targetParticipantValue,
      left.supportChannelKind,
      left.sourcePillar,
      left.sourceComponent,
      left.sourceValue,
    ]
      .join('|')
      .localeCompare(
        [
          right.mechanism,
          right.currentCombinationRelationId,
          right.targetParticipantPillar,
          right.targetParticipantComponent,
          right.targetParticipantValue,
          right.supportChannelKind,
          right.sourcePillar,
          right.sourceComponent,
          right.sourceValue,
        ].join('|'),
      ),
  );
}

export function buildI54ChallengeCombinationSupportChannelContestTopologyEvidence(
  pillars: StructuralPillarInput,
  conditionEvidence: ChallengeTargetCombinationConditionEvidenceReport,
  supportEvidence: ChallengeCombinationSupportChannelEvidenceReport,
  methodology: ChallengeCombinationSupportChannelActivationPersistenceMethodologyReviewReport,
): ChallengeCombinationSupportChannelContestTopologyEvidenceReport {
  if (!pillarsResolved(pillars)) {
    return unresolved('PILLARS_UNRESOLVED', conditionEvidence, supportEvidence, methodology, [
      'All four resolved pillars are required before exact support-source contest topology can be derived.',
    ]);
  }
  if (conditionEvidence.status !== 'RESOLVED_CONDITION_EVIDENCE') {
    return unresolved(
      'I39_UNRESOLVED_OR_MISALIGNED',
      conditionEvidence,
      supportEvidence,
      methodology,
      ['Resolved I39 condition evidence is required before I54 topology materialization.'],
    );
  }

  const relations = deriveStructuralRelationCandidates(pillars);
  const currentRelations = conditionEvidence.items.map((item) => relationForCondition(item, relations));
  if (
    currentRelations.some((relation) => relation === undefined) ||
    conditionEvidence.items.some((item, index) => {
      const relation = currentRelations[index];
      return relation === undefined || !conditionItemAlignedToCurrentRelation(item, relation);
    })
  ) {
    return unresolved(
      'CURRENT_COMBINATION_IDENTITY_MISMATCH',
      conditionEvidence,
      supportEvidence,
      methodology,
      [
        'Every I39 combination relation must match the exact relation id, kind, participant pillar, component, and value re-derived from the current pillars.',
      ],
    );
  }

  if (!supportEvidenceAligned(conditionEvidence, supportEvidence)) {
    return unresolved(
      'I52_UNRESOLVED_OR_MISALIGNED',
      conditionEvidence,
      supportEvidence,
      methodology,
      [
        'I52 must be resolved, bound to the exact I39 report id, and preserve the same combination and participant identities.',
      ],
    );
  }

  if (!methodologyAuthorized(methodology)) {
    return unresolved(
      'I53_METHODOLOGY_NOT_AUTHORIZED',
      conditionEvidence,
      supportEvidence,
      methodology,
      ['The supplied I53 review does not match the canonical direct-contest-routing-only contract.'],
    );
  }

  if (!supportSourceIdentitiesAligned(conditionEvidence, supportEvidence)) {
    return unresolved(
      'SUPPORT_SOURCE_IDENTITY_MISMATCH',
      conditionEvidence,
      supportEvidence,
      methodology,
      [
        'Every I52 support source must match the exact I39-derived directional source pillar + component identity for its target participant.',
      ],
    );
  }

  const items = evidenceItems(pillars, conditionEvidence, supportEvidence, relations);
  if (items === undefined) {
    return unresolved(
      'SUPPORT_SOURCE_IDENTITY_MISMATCH',
      conditionEvidence,
      supportEvidence,
      methodology,
      ['A support source could not be resolved to an exact current pillar + component value.'],
    );
  }

  return finalized({
    evidenceVersion: I54_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_CONTEST_TOPOLOGY_EVIDENCE_VERSION,
    status: 'RESOLVED_CONTEST_TOPOLOGY_EVIDENCE',
    upstreamI39ReportId: conditionEvidence.reportId,
    upstreamI52ReportId: supportEvidence.reportId,
    upstreamI53ReviewId: methodology.reviewId,
    items,
    contestTopologyEvidenceAvailable: true,
    supportChannelActivationVerdictAuthorized: false,
    supportChannelPersistenceVerdictAuthorized: false,
    supportChannelNeutralizationVerdictAuthorized: false,
    supportChannelDestructionVerdictAuthorized: false,
    supportChannelNetEffectVerdictAuthorized: false,
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes: [
      'I54 independently re-derives the current structural relation graph and classifies direct touches using exact support-source pillar + component + value identity.',
      'CURRENT_COMBINATION_PARTICIPATION identifies only structural participation in the routed combination and does not imply binding, neutralization, activation, or persistence.',
      'COMPETING_CLASH_TOUCH and COMPETING_COMBINATION_TOUCH identify only direct structural contact and do not settle damage, binding, destruction, or support-channel outcome.',
      'MULTIPLE_TRACKED_RELATION_TOUCHES records multiple exact structural contacts without assigning cross-mechanism precedence.',
      'NO_TRACKED_RELATION_TOUCH means only that no tracked structural relation directly touches the source identity; it is not an ACTIVE or PERSISTED verdict.',
      'Touch counts and relation-kind metadata are descriptive topology metadata only and are not converted into weights, magnitude, net effect, or scoring.',
      'Effective mechanism force, usefulness/harmfulness, numeric scoring, and strong/weak classification remain unresolved or unauthorized.',
    ],
  });
}
