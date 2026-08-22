import {
  deriveStructuralRelationCandidates,
  type PillarSlot,
  type StructuralPillarInput,
  type StructuralRelationCandidate,
  type StructuralRelationKind,
} from '../calculation/structural-relations.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  ChallengeCombinationSupportChannelContestTopologyEvidenceItem,
  ChallengeCombinationSupportChannelContestTopologyEvidenceReport,
} from './i54-challenge-combination-support-channel-contest-topology-evidence.js';
import type { ChallengeCombinationSupportChannelContestTopologyState } from './i53-challenge-combination-support-channel-activation-persistence-methodology-review.js';

export const I61_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_RELATION_IDENTITY_PAIR_EVIDENCE_VERSION =
  'myeonghwa-challenge-combination-support-channel-relation-identity-pair-evidence-v1';

const PILLAR_ORDER = ['year', 'month', 'day', 'hour'] as const satisfies readonly PillarSlot[];

export interface ChallengeCombinationSupportChannelRelationIdentityPair {
  relationId: string;
  relationKind: StructuralRelationKind;
  isCurrentCombinationRelation: boolean;
  precedence: 'not_determined';
  settlementOutcome: 'not_determined';
}

export interface ChallengeCombinationSupportChannelRelationIdentityPairEvidenceItem {
  mechanism: ChallengeCombinationSupportChannelContestTopologyEvidenceItem['mechanism'];
  currentCombinationRelationId: string;
  currentCombinationRelationKind: ChallengeCombinationSupportChannelContestTopologyEvidenceItem['currentCombinationRelationKind'];
  targetParticipantPillar: PillarSlot;
  targetParticipantComponent: 'stem' | 'branch';
  targetParticipantValue: string;
  supportChannelKind: ChallengeCombinationSupportChannelContestTopologyEvidenceItem['supportChannelKind'];
  sourcePillar: PillarSlot;
  sourceComponent: 'stem' | 'branch';
  sourceValue: string;
  contestTopologyState: ChallengeCombinationSupportChannelContestTopologyState;
  touchingRelations: readonly ChallengeCombinationSupportChannelRelationIdentityPair[];
  touchCount: number;
  relationIdKindPairEvidenceAvailable: true;
  multiTouchPairingResolvedWhereObserved: boolean;
  touchSpecificSettlementDispatchAuthorized: false;
  crossRelationPrecedenceAuthorized: false;
  supportChannelActive: 'not_determined';
  supportChannelPersisted: 'not_determined';
  supportChannelNeutralized: 'not_determined';
  supportChannelDestroyed: 'not_determined';
  supportChannelNetEffect: 'not_resolved';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  numericScore: 'not_assigned';
}

export interface ChallengeCombinationSupportChannelRelationIdentityPairEvidenceReport {
  reportId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_RELATION_IDENTITY_PAIR_EVIDENCE'
    | 'PILLARS_UNRESOLVED'
    | 'I54_UNRESOLVED_OR_INVALID'
    | 'CURRENT_COMBINATION_IDENTITY_MISMATCH'
    | 'SUPPORT_SOURCE_IDENTITY_MISMATCH'
    | 'I54_TOUCH_METADATA_MISMATCH';
  upstreamI54ReportId: string;
  items: readonly ChallengeCombinationSupportChannelRelationIdentityPairEvidenceItem[];
  relationIdKindPairEvidenceAvailable: boolean;
  multiTouchRelationIdKindPairEvidenceAvailable: boolean;
  pairReconstructionFromSeparateI54ArraysUsed: false;
  touchSpecificSettlementDispatchAuthorized: false;
  crossRelationPrecedenceAuthorized: false;
  contestOutcomeVerdictAuthorized: false;
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
  material: Omit<ChallengeCombinationSupportChannelRelationIdentityPairEvidenceReport, 'reportId'>,
): ChallengeCombinationSupportChannelRelationIdentityPairEvidenceReport {
  return {
    reportId: `challenge_combination_support_channel_relation_identity_pair_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function unresolved(
  status: Exclude<
    ChallengeCombinationSupportChannelRelationIdentityPairEvidenceReport['status'],
    'RESOLVED_RELATION_IDENTITY_PAIR_EVIDENCE'
  >,
  topologyEvidence: ChallengeCombinationSupportChannelContestTopologyEvidenceReport,
  notes: readonly string[],
): ChallengeCombinationSupportChannelRelationIdentityPairEvidenceReport {
  return finalized({
    evidenceVersion:
      I61_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_RELATION_IDENTITY_PAIR_EVIDENCE_VERSION,
    status,
    upstreamI54ReportId: topologyEvidence.reportId,
    items: [],
    relationIdKindPairEvidenceAvailable: false,
    multiTouchRelationIdKindPairEvidenceAvailable: false,
    pairReconstructionFromSeparateI54ArraysUsed: false,
    touchSpecificSettlementDispatchAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    contestOutcomeVerdictAuthorized: false,
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

function i54ContractAccepted(
  evidence: ChallengeCombinationSupportChannelContestTopologyEvidenceReport,
): boolean {
  return (
    evidence.status === 'RESOLVED_CONTEST_TOPOLOGY_EVIDENCE' &&
    evidence.contestTopologyEvidenceAvailable &&
    evidence.supportChannelActivationVerdictAuthorized === false &&
    evidence.supportChannelPersistenceVerdictAuthorized === false &&
    evidence.supportChannelNeutralizationVerdictAuthorized === false &&
    evidence.supportChannelDestructionVerdictAuthorized === false &&
    evidence.supportChannelNetEffectVerdictAuthorized === false &&
    evidence.effectiveMechanismForceVerdict === 'not_determined' &&
    evidence.relationSpecificUsefulnessHarmfulness === 'not_determined' &&
    evidence.classificationAuthorized === false &&
    evidence.numericScoringAuthorized === false &&
    evidence.items.every(
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

function currentSourceValue(
  pillars: StructuralPillarInput,
  sourcePillar: PillarSlot,
  sourceComponent: 'stem' | 'branch',
): string | undefined {
  const pillar = pillars[sourcePillar];
  if (pillar === undefined) return undefined;
  return String(sourceComponent === 'stem' ? pillar.stem.value : pillar.branch.value);
}

function currentCombinationAligned(
  item: ChallengeCombinationSupportChannelContestTopologyEvidenceItem,
  relations: readonly StructuralRelationCandidate[],
): boolean {
  const relation = relations.find(
    (candidate) =>
      candidate.relationId === item.currentCombinationRelationId &&
      candidate.kind === item.currentCombinationRelationKind,
  );
  if (relation === undefined) return false;
  return relation.participants.some(
    (participant) =>
      participant.pillar === item.targetParticipantPillar &&
      participant.component === item.targetParticipantComponent &&
      String(participant.value) === item.targetParticipantValue,
  );
}

function touchingRelations(
  relations: readonly StructuralRelationCandidate[],
  item: ChallengeCombinationSupportChannelContestTopologyEvidenceItem,
): readonly StructuralRelationCandidate[] {
  return relations
    .filter((relation) =>
      relation.participants.some(
        (participant) =>
          participant.pillar === item.sourcePillar &&
          participant.component === item.sourceComponent &&
          String(participant.value) === item.sourceValue,
      ),
    )
    .sort((left, right) =>
      `${left.relationId}|${left.kind}`.localeCompare(`${right.relationId}|${right.kind}`),
    );
}

function expectedTopologyState(
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

function exactArrayEqual(left: readonly string[], right: readonly string[]): boolean {
  if (left.length !== right.length) return false;
  return left.every((value, index) => value === right[index]);
}

function metadataAligned(
  item: ChallengeCombinationSupportChannelContestTopologyEvidenceItem,
  touches: readonly StructuralRelationCandidate[],
): boolean {
  const expectedIds = touches.map((touch) => touch.relationId).sort();
  const expectedKinds = [...new Set(touches.map((touch) => touch.kind))].sort();
  const actualIds = [...item.touchingRelationIds].sort();
  const actualKinds = [...item.touchingRelationKinds].sort();
  return (
    item.touchCount === touches.length &&
    exactArrayEqual(expectedIds, actualIds) &&
    exactArrayEqual(expectedKinds, actualKinds) &&
    item.contestTopologyState === expectedTopologyState(item.currentCombinationRelationId, touches)
  );
}

function evidenceItem(
  item: ChallengeCombinationSupportChannelContestTopologyEvidenceItem,
  touches: readonly StructuralRelationCandidate[],
): ChallengeCombinationSupportChannelRelationIdentityPairEvidenceItem {
  const touchingPairs = touches.map((touch) => ({
    relationId: touch.relationId,
    relationKind: touch.kind,
    isCurrentCombinationRelation: touch.relationId === item.currentCombinationRelationId,
    precedence: 'not_determined' as const,
    settlementOutcome: 'not_determined' as const,
  }));

  return {
    mechanism: item.mechanism,
    currentCombinationRelationId: item.currentCombinationRelationId,
    currentCombinationRelationKind: item.currentCombinationRelationKind,
    targetParticipantPillar: item.targetParticipantPillar,
    targetParticipantComponent: item.targetParticipantComponent,
    targetParticipantValue: item.targetParticipantValue,
    supportChannelKind: item.supportChannelKind,
    sourcePillar: item.sourcePillar,
    sourceComponent: item.sourceComponent,
    sourceValue: item.sourceValue,
    contestTopologyState: item.contestTopologyState,
    touchingRelations: touchingPairs,
    touchCount: touchingPairs.length,
    relationIdKindPairEvidenceAvailable: true,
    multiTouchPairingResolvedWhereObserved: touchingPairs.length > 1,
    touchSpecificSettlementDispatchAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    supportChannelActive: 'not_determined',
    supportChannelPersisted: 'not_determined',
    supportChannelNeutralized: 'not_determined',
    supportChannelDestroyed: 'not_determined',
    supportChannelNetEffect: 'not_resolved',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    numericScore: 'not_assigned',
  };
}

export function buildI61ChallengeCombinationSupportChannelRelationIdentityPairEvidence(
  pillars: StructuralPillarInput,
  topologyEvidence: ChallengeCombinationSupportChannelContestTopologyEvidenceReport,
): ChallengeCombinationSupportChannelRelationIdentityPairEvidenceReport {
  if (!pillarsResolved(pillars)) {
    return unresolved('PILLARS_UNRESOLVED', topologyEvidence, [
      'All four resolved pillars are required before relation-id/kind pair evidence can be independently recomputed.',
    ]);
  }
  if (!i54ContractAccepted(topologyEvidence)) {
    return unresolved('I54_UNRESOLVED_OR_INVALID', topologyEvidence, [
      'Resolved fail-closed I54 topology evidence is required before I61 pair materialization.',
    ]);
  }

  const relations = deriveStructuralRelationCandidates(pillars);
  const items: ChallengeCombinationSupportChannelRelationIdentityPairEvidenceItem[] = [];

  for (const item of topologyEvidence.items) {
    if (!currentCombinationAligned(item, relations)) {
      return unresolved('CURRENT_COMBINATION_IDENTITY_MISMATCH', topologyEvidence, [
        'An I54 current-combination relation or target participant does not match the resolved pillar material used by I61.',
      ]);
    }

    const sourceValue = currentSourceValue(pillars, item.sourcePillar, item.sourceComponent);
    if (sourceValue === undefined || sourceValue !== item.sourceValue) {
      return unresolved('SUPPORT_SOURCE_IDENTITY_MISMATCH', topologyEvidence, [
        'An I54 support-source pillar/component/value identity does not match the resolved pillar material used by I61.',
      ]);
    }

    const touches = touchingRelations(relations, item);
    if (!metadataAligned(item, touches)) {
      return unresolved('I54_TOUCH_METADATA_MISMATCH', topologyEvidence, [
        'I54 touch ids, kind set, count, or topology state does not match independent structural recomputation. I61 never reconstructs id-kind pairs from the separate I54 arrays.',
      ]);
    }

    items.push(evidenceItem(item, touches));
  }

  items.sort((left, right) =>
    [
      left.mechanism,
      left.currentCombinationRelationId,
      left.targetParticipantPillar,
      left.targetParticipantComponent,
      left.sourcePillar,
      left.sourceComponent,
      left.sourceValue,
      left.supportChannelKind,
    ]
      .join('|')
      .localeCompare(
        [
          right.mechanism,
          right.currentCombinationRelationId,
          right.targetParticipantPillar,
          right.targetParticipantComponent,
          right.sourcePillar,
          right.sourceComponent,
          right.sourceValue,
          right.supportChannelKind,
        ].join('|'),
      ),
  );

  return finalized({
    evidenceVersion:
      I61_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_RELATION_IDENTITY_PAIR_EVIDENCE_VERSION,
    status: 'RESOLVED_RELATION_IDENTITY_PAIR_EVIDENCE',
    upstreamI54ReportId: topologyEvidence.reportId,
    items,
    relationIdKindPairEvidenceAvailable: true,
    multiTouchRelationIdKindPairEvidenceAvailable: items.some((item) => item.touchCount > 1),
    pairReconstructionFromSeparateI54ArraysUsed: false,
    touchSpecificSettlementDispatchAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    contestOutcomeVerdictAuthorized: false,
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
      'I61 independently recomputes structural touches from resolved pillars and exact support-source identity; it never pairs I54 touchingRelationIds[] with touchingRelationKinds[] by array position or inference.',
      'A relation-id/kind pair proves only structural identity of a touch. It does not establish precedence, clash winner, binding, rescue effectiveness, destruction, neutralization, activation, persistence, or net support effect.',
      'Multi-touch pair evidence removes only the identity-pairing substrate gap. Relation-specific settlement dispatch and cross-relation precedence remain separately unauthorized.',
      'No pair count or relation kind is converted into force magnitude, numeric score, usefulness/harmfulness, or strong/weak classification.',
    ],
  });
}
