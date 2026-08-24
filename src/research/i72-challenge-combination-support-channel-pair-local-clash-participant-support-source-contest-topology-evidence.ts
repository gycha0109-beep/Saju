import {
  deriveStructuralRelationCandidates,
  type PillarSlot,
  type StructuralPillarInput,
  type StructuralRelationCandidate,
  type StructuralRelationKind,
} from '../calculation/structural-relations.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  ClashParticipantSupportContext,
  ClashSupportContextReport,
  ClashSupportContextSignal,
} from './i20c-clash-support-context.js';
import type {
  ChallengeCombinationSupportChannelPairLocalClashRelativeForceComparativeEvidenceReport,
  I68PairLocalClashRelativeForceComparativeEvidenceItem,
  I68TrackedClashParticipantEvidence,
} from './i68-challenge-combination-support-channel-pair-local-clash-relative-force-comparative-evidence.js';
import {
  buildI71ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceContestTopologyMethodologyReview,
  type ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceContestTopologyMethodologyReviewReport,
  type I71SupportSourceContestTopologyState,
} from './i71-challenge-combination-support-channel-pair-local-clash-participant-support-source-contest-topology-methodology-review.js';

export const I72_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_PAIR_LOCAL_CLASH_PARTICIPANT_SUPPORT_SOURCE_CONTEST_TOPOLOGY_EVIDENCE_VERSION =
  'myeonghwa-challenge-combination-support-channel-pair-local-clash-participant-support-source-contest-topology-evidence-v1';

const PILLAR_ORDER = ['year', 'month', 'day', 'hour'] as const satisfies readonly PillarSlot[];

type TrackedSupportSignal = Exclude<ClashSupportContextSignal, 'NO_TRACKED_SUPPORT_CONTEXT'>;

export interface I72SupportSourceRelationTouchEvidence {
  relationId: string;
  relationKind: StructuralRelationKind;
  isEvaluatedClashRelation: boolean;
  precedence: 'not_determined';
  settlementOutcome: 'not_determined';
}

export interface I72ParticipantSupportSourceContestEvidence {
  participantRole: I68TrackedClashParticipantEvidence['role'];
  participantPosition: PillarSlot;
  participantBranch: string;
  sourcePillar: PillarSlot;
  sourceComponent: 'stem' | 'branch';
  sourceValue: string;
  supportSignals: readonly TrackedSupportSignal[];
  contestTopologyState: I71SupportSourceContestTopologyState;
  touchingRelations: readonly I72SupportSourceRelationTouchEvidence[];
  touchCount: number;
  relationIdKindPairEvidenceAvailable: true;
  sourceActive: 'not_determined';
  sourcePersisted: 'not_determined';
  sourceNeutralized: 'not_determined';
  sourceDestroyed: 'not_determined';
  effectiveSupportEffect: 'not_resolved';
  relativeForceVerdict: 'not_determined';
  numericWeight: 'not_assigned';
}

export interface I72PairLocalClashParticipantSupportSourceContestTopologyEvidenceItem {
  mechanism: string;
  evaluatedClashRelationId: string;
  evaluatedSupportChannelSourcePillar: PillarSlot;
  evaluatedSupportChannelSourceBranch: string;
  participantSupportSources: readonly I72ParticipantSupportSourceContestEvidence[];
  sourceContestTopologyEvidenceAvailable: true;
  anyMultiTouchSupportSource: boolean;
  sourceActivationVerdictAuthorized: false;
  sourcePersistenceVerdictAuthorized: false;
  sourceEffectiveSupportVerdictAuthorized: false;
  relativeForceVerdict: 'not_determined';
  clashWinnerVerdict: 'not_determined';
  rescueEffectVerdict: 'not_resolved';
  clashSettlementVerdict: 'not_determined';
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  numericScore: 'not_assigned';
}

export interface ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceContestTopologyEvidenceReport {
  reportId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_SUPPORT_SOURCE_CONTEST_TOPOLOGY_EVIDENCE'
    | 'PILLARS_UNRESOLVED'
    | 'I68_UNRESOLVED_OR_INVALID'
    | 'I20C_UNRESOLVED_OR_MISALIGNED'
    | 'I71_METHODOLOGY_NOT_AUTHORIZED'
    | 'EVALUATED_CLASH_IDENTITY_MISMATCH'
    | 'SUPPORT_SIGNAL_METADATA_MISMATCH';
  upstreamI68ReportId: string;
  upstreamI20cReportId: string;
  upstreamI71ReviewId: string;
  items: readonly I72PairLocalClashParticipantSupportSourceContestTopologyEvidenceItem[];
  supportSourceIdentityEvidenceAvailable: boolean;
  supportSourceContestTopologyEvidenceAvailable: boolean;
  authoritativeRelationIdKindPairEvidenceAvailable: boolean;
  sourceActivationVerdictAuthorized: false;
  sourcePersistenceVerdictAuthorized: false;
  sourceEffectiveSupportVerdictAuthorized: false;
  relativeForceVerdictAuthorized: false;
  clashWinnerVerdictAuthorized: false;
  rescueEffectAuthorized: false;
  clashSettlementAuthorized: false;
  crossRelationPrecedenceAuthorized: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

interface SourceDraft {
  participantRole: I68TrackedClashParticipantEvidence['role'];
  participantPosition: PillarSlot;
  participantBranch: string;
  sourcePillar: PillarSlot;
  sourceComponent: 'stem' | 'branch';
  sourceValue: string;
  supportSignals: Set<TrackedSupportSignal>;
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceContestTopologyEvidenceReport, 'reportId'>,
): ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceContestTopologyEvidenceReport {
  return {
    reportId: `challenge_combination_support_channel_pair_local_clash_support_source_topology_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function unresolved(
  status: Exclude<
    ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceContestTopologyEvidenceReport['status'],
    'RESOLVED_SUPPORT_SOURCE_CONTEST_TOPOLOGY_EVIDENCE'
  >,
  i68: ChallengeCombinationSupportChannelPairLocalClashRelativeForceComparativeEvidenceReport,
  i20c: ClashSupportContextReport,
  methodology: ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceContestTopologyMethodologyReviewReport,
  notes: readonly string[],
): ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceContestTopologyEvidenceReport {
  return finalized({
    evidenceVersion:
      I72_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_PAIR_LOCAL_CLASH_PARTICIPANT_SUPPORT_SOURCE_CONTEST_TOPOLOGY_EVIDENCE_VERSION,
    status,
    upstreamI68ReportId: i68.reportId,
    upstreamI20cReportId: i20c.reportId,
    upstreamI71ReviewId: methodology.reviewId,
    items: [],
    supportSourceIdentityEvidenceAvailable: false,
    supportSourceContestTopologyEvidenceAvailable: false,
    authoritativeRelationIdKindPairEvidenceAvailable: false,
    sourceActivationVerdictAuthorized: false,
    sourcePersistenceVerdictAuthorized: false,
    sourceEffectiveSupportVerdictAuthorized: false,
    relativeForceVerdictAuthorized: false,
    clashWinnerVerdictAuthorized: false,
    rescueEffectAuthorized: false,
    clashSettlementAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    targetPostRelationRootState: 'not_determined',
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

function methodologyAccepted(
  methodology: ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceContestTopologyMethodologyReviewReport,
): boolean {
  const canonical =
    buildI71ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceContestTopologyMethodologyReview();
  return (
    methodology.reviewId === canonical.reviewId &&
    methodology.decision ===
      'EXACT_SUPPORT_SOURCE_IDENTITY_AND_CONTEST_TOPOLOGY_AUTHORIZED_EFFECT_VERDICTS_BLOCKED' &&
    methodology.resolvedPillarsRequiredForSourceValueMaterialization &&
    methodology.supportSignalToSourceComponentMappingAuthorized &&
    methodology.structuralRelationGraphIndependentRecomputationAuthorized &&
    methodology.authoritativeRelationIdKindPairEmissionAuthorized &&
    methodology.sourceIdentityMayBeInferredFromSignalLabelAlone === false &&
    methodology.sourceActivationVerdictAuthorized === false &&
    methodology.sourcePersistenceVerdictAuthorized === false &&
    methodology.sourceEffectiveSupportVerdictAuthorized === false &&
    methodology.relativeForceVerdictAuthorized === false &&
    methodology.crossRelationPrecedenceAuthorized === false &&
    methodology.numericScoringAuthorized === false
  );
}

function i68Accepted(
  i68: ChallengeCombinationSupportChannelPairLocalClashRelativeForceComparativeEvidenceReport,
  i20c: ClashSupportContextReport,
): boolean {
  return (
    i68.status === 'RESOLVED_TRACKED_EVIDENCE_PARTIAL_ORDER' &&
    i68.upstreamI20cReportId === i20c.reportId &&
    i68.trackedEvidencePartialOrderEvidenceAvailable &&
    i68.relativeForceVerdictAuthorized === false &&
    i68.clashWinnerVerdictAuthorized === false &&
    i68.supportEffectResolutionAuthorized === false &&
    i68.rescueEffectAuthorized === false &&
    i68.clashSettlementAuthorized === false &&
    i68.crossRelationPrecedenceAuthorized === false &&
    i68.effectiveMechanismForceVerdict === 'not_determined' &&
    i68.classificationAuthorized === false &&
    i68.numericScoringAuthorized === false
  );
}

function i20cAccepted(i20c: ClashSupportContextReport): boolean {
  return (
    i20c.status === 'RESOLVED_SUPPORT_CONTEXT' &&
    i20c.supportEffectAuthorized === false &&
    i20c.relativeForceVerdictAuthorized === false &&
    i20c.rootEffectResolutionAuthorized === false &&
    i20c.classificationAuthorized === false &&
    i20c.numericScoringAuthorized === false
  );
}

function sourceValue(
  pillars: StructuralPillarInput,
  pillar: PillarSlot,
  component: 'stem' | 'branch',
): string | undefined {
  const fact = pillars[pillar];
  if (fact === undefined) return undefined;
  return String(component === 'stem' ? fact.stem.value : fact.branch.value);
}

function normalizedSignals(signals: readonly ClashSupportContextSignal[]): readonly TrackedSupportSignal[] {
  return [...new Set(signals.filter(
    (signal): signal is TrackedSupportSignal => signal !== 'NO_TRACKED_SUPPORT_CONTEXT',
  ))].sort();
}

function exactArrayEqual(left: readonly string[], right: readonly string[]): boolean {
  if (left.length !== right.length) return false;
  return left.every((value, index) => value === right[index]);
}

function participantMetadataAligned(
  i68Participant: I68TrackedClashParticipantEvidence,
  i20cParticipant: ClashParticipantSupportContext,
): boolean {
  return (
    i68Participant.position === i20cParticipant.position &&
    i68Participant.branch === String(i20cParticipant.branch) &&
    exactArrayEqual(
      [...i68Participant.trackedSupportSignals].sort(),
      [...normalizedSignals(i20cParticipant.signals)].sort(),
    )
  );
}

function supportSignalMetadataAligned(participant: ClashParticipantSupportContext): boolean {
  const signals = new Set(participant.signals);
  const expected = new Set<ClashSupportContextSignal>();
  if (participant.samePillarVisibleSameElementSupport) {
    expected.add('SAME_PILLAR_VISIBLE_SAME_ELEMENT_SUPPORT');
  }
  if (participant.externalVisibleSameElementSupportPositions.length > 0) {
    expected.add('EXTERNAL_VISIBLE_SAME_ELEMENT_SUPPORT');
  }
  if (participant.visibleResourceSupportPositions.length > 0) {
    expected.add('VISIBLE_RESOURCE_SUPPORT');
  }
  if (participant.additionalSameElementBranchSupportPositions.length > 0) {
    expected.add('ADDITIONAL_SAME_ELEMENT_BRANCH_SUPPORT');
  }
  if (participant.resourceBranchSupportPositions.length > 0) {
    expected.add('RESOURCE_BRANCH_SUPPORT');
  }
  if (expected.size === 0) expected.add('NO_TRACKED_SUPPORT_CONTEXT');
  return exactArrayEqual([...signals].sort(), [...expected].sort());
}

function addSource(
  drafts: Map<string, SourceDraft>,
  participant: I68TrackedClashParticipantEvidence,
  pillars: StructuralPillarInput,
  sourcePillar: PillarSlot,
  sourceComponent: 'stem' | 'branch',
  signal: TrackedSupportSignal,
): boolean {
  const value = sourceValue(pillars, sourcePillar, sourceComponent);
  if (value === undefined) return false;
  const key = [
    participant.role,
    participant.position,
    participant.branch,
    sourcePillar,
    sourceComponent,
    value,
  ].join('|');
  const existing = drafts.get(key);
  if (existing !== undefined) {
    existing.supportSignals.add(signal);
    return true;
  }
  drafts.set(key, {
    participantRole: participant.role,
    participantPosition: participant.position,
    participantBranch: participant.branch,
    sourcePillar,
    sourceComponent,
    sourceValue: value,
    supportSignals: new Set([signal]),
  });
  return true;
}

function sourceDrafts(
  i68Participant: I68TrackedClashParticipantEvidence,
  i20cParticipant: ClashParticipantSupportContext,
  pillars: StructuralPillarInput,
): readonly SourceDraft[] | undefined {
  const drafts = new Map<string, SourceDraft>();
  if (
    i20cParticipant.samePillarVisibleSameElementSupport &&
    !addSource(
      drafts,
      i68Participant,
      pillars,
      i20cParticipant.position,
      'stem',
      'SAME_PILLAR_VISIBLE_SAME_ELEMENT_SUPPORT',
    )
  ) return undefined;

  for (const position of i20cParticipant.externalVisibleSameElementSupportPositions) {
    if (!addSource(drafts, i68Participant, pillars, position, 'stem', 'EXTERNAL_VISIBLE_SAME_ELEMENT_SUPPORT')) return undefined;
  }
  for (const position of i20cParticipant.visibleResourceSupportPositions) {
    if (!addSource(drafts, i68Participant, pillars, position, 'stem', 'VISIBLE_RESOURCE_SUPPORT')) return undefined;
  }
  for (const position of i20cParticipant.additionalSameElementBranchSupportPositions) {
    if (!addSource(drafts, i68Participant, pillars, position, 'branch', 'ADDITIONAL_SAME_ELEMENT_BRANCH_SUPPORT')) return undefined;
  }
  for (const position of i20cParticipant.resourceBranchSupportPositions) {
    if (!addSource(drafts, i68Participant, pillars, position, 'branch', 'RESOURCE_BRANCH_SUPPORT')) return undefined;
  }
  return [...drafts.values()].sort((left, right) =>
    `${left.participantPosition}|${left.sourcePillar}|${left.sourceComponent}|${left.sourceValue}`.localeCompare(
      `${right.participantPosition}|${right.sourcePillar}|${right.sourceComponent}|${right.sourceValue}`,
    ),
  );
}

function touchesForSource(
  relations: readonly StructuralRelationCandidate[],
  draft: SourceDraft,
): readonly StructuralRelationCandidate[] {
  return relations.filter((relation) =>
    relation.participants.some(
      (participant) =>
        participant.pillar === draft.sourcePillar &&
        participant.component === draft.sourceComponent &&
        String(participant.value) === draft.sourceValue,
    ),
  );
}

function topologyState(
  evaluatedClashRelationId: string,
  touches: readonly StructuralRelationCandidate[],
): I71SupportSourceContestTopologyState {
  if (touches.length === 0) return 'NO_TRACKED_RELATION_TOUCH';
  if (touches.length > 1) return 'MULTIPLE_TRACKED_RELATION_TOUCHES';
  const touch = touches[0];
  if (touch === undefined) return 'NO_TRACKED_RELATION_TOUCH';
  if (touch.relationId === evaluatedClashRelationId) return 'EVALUATED_CLASH_PARTICIPATION';
  if (touch.kind === 'branch_clash') return 'OTHER_CLASH_TOUCH';
  return 'COMBINATION_TOUCH';
}

function sourceEvidence(
  draft: SourceDraft,
  evaluatedClashRelationId: string,
  relations: readonly StructuralRelationCandidate[],
): I72ParticipantSupportSourceContestEvidence {
  const touches = [...touchesForSource(relations, draft)].sort((left, right) =>
    `${left.relationId}|${left.kind}`.localeCompare(`${right.relationId}|${right.kind}`),
  );
  return {
    participantRole: draft.participantRole,
    participantPosition: draft.participantPosition,
    participantBranch: draft.participantBranch,
    sourcePillar: draft.sourcePillar,
    sourceComponent: draft.sourceComponent,
    sourceValue: draft.sourceValue,
    supportSignals: [...draft.supportSignals].sort(),
    contestTopologyState: topologyState(evaluatedClashRelationId, touches),
    touchingRelations: touches.map((touch) => ({
      relationId: touch.relationId,
      relationKind: touch.kind,
      isEvaluatedClashRelation: touch.relationId === evaluatedClashRelationId,
      precedence: 'not_determined' as const,
      settlementOutcome: 'not_determined' as const,
    })),
    touchCount: touches.length,
    relationIdKindPairEvidenceAvailable: true,
    sourceActive: 'not_determined',
    sourcePersisted: 'not_determined',
    sourceNeutralized: 'not_determined',
    sourceDestroyed: 'not_determined',
    effectiveSupportEffect: 'not_resolved',
    relativeForceVerdict: 'not_determined',
    numericWeight: 'not_assigned',
  };
}

function evaluatedClashAligned(
  item: I68PairLocalClashRelativeForceComparativeEvidenceItem,
  relations: readonly StructuralRelationCandidate[],
): boolean {
  const relation = relations.find(
    (candidate) => candidate.relationId === item.relationId && candidate.kind === 'branch_clash',
  );
  if (relation === undefined) return false;
  return item.participants.every((tracked) =>
    relation.participants.some(
      (participant) =>
        participant.pillar === tracked.position &&
        participant.component === 'branch' &&
        String(participant.value) === tracked.branch,
    ),
  );
}

export function buildI72ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceContestTopologyEvidence(
  pillars: StructuralPillarInput,
  i68: ChallengeCombinationSupportChannelPairLocalClashRelativeForceComparativeEvidenceReport,
  i20c: ClashSupportContextReport,
  methodology: ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceContestTopologyMethodologyReviewReport,
): ChallengeCombinationSupportChannelPairLocalClashParticipantSupportSourceContestTopologyEvidenceReport {
  if (!methodologyAccepted(methodology)) {
    return unresolved('I71_METHODOLOGY_NOT_AUTHORIZED', i68, i20c, methodology, [
      'The supplied I71 review must exactly match the canonical support-source identity/topology methodology.',
    ]);
  }
  if (!pillarsResolved(pillars)) {
    return unresolved('PILLARS_UNRESOLVED', i68, i20c, methodology, [
      'All four resolved pillars are required to materialize exact support-source values and independently recompute structural relations.',
    ]);
  }
  if (!i68Accepted(i68, i20c)) {
    return unresolved('I68_UNRESOLVED_OR_INVALID', i68, i20c, methodology, [
      'Resolved fail-closed I68 comparative evidence aligned to the exact I20c report is required.',
    ]);
  }
  if (!i20cAccepted(i20c)) {
    return unresolved('I20C_UNRESOLVED_OR_MISALIGNED', i68, i20c, methodology, [
      'Resolved canonical I20c support-context evidence with effect verdicts withheld is required.',
    ]);
  }

  const relations = deriveStructuralRelationCandidates(pillars);
  const items: I72PairLocalClashParticipantSupportSourceContestTopologyEvidenceItem[] = [];

  for (const i68Item of i68.items) {
    if (!evaluatedClashAligned(i68Item, relations)) {
      return unresolved('EVALUATED_CLASH_IDENTITY_MISMATCH', i68, i20c, methodology, [
        'An I68 evaluated clash relation or exact branch participant does not match independent structural recomputation from the resolved pillars.',
      ]);
    }
    const i20cCandidate = i20c.candidates.find((candidate) => candidate.relationId === i68Item.relationId);
    if (i20cCandidate === undefined) {
      return unresolved('I20C_UNRESOLVED_OR_MISALIGNED', i68, i20c, methodology, [
        'An exact I20c candidate is required for every I68 evaluated clash relation.',
      ]);
    }

    const sources: I72ParticipantSupportSourceContestEvidence[] = [];
    for (const trackedParticipant of i68Item.participants) {
      const supportParticipant = i20cCandidate.participants.find(
        (candidate) =>
          candidate.position === trackedParticipant.position &&
          String(candidate.branch) === trackedParticipant.branch,
      );
      if (
        supportParticipant === undefined ||
        !participantMetadataAligned(trackedParticipant, supportParticipant) ||
        !supportSignalMetadataAligned(supportParticipant)
      ) {
        return unresolved('SUPPORT_SIGNAL_METADATA_MISMATCH', i68, i20c, methodology, [
          'I68 tracked support signals must exactly match the canonical I20c participant identity and source-position metadata before support-source materialization.',
        ]);
      }
      const drafts = sourceDrafts(trackedParticipant, supportParticipant, pillars);
      if (drafts === undefined) {
        return unresolved('PILLARS_UNRESOLVED', i68, i20c, methodology, [
          'Every I20c support-source position must resolve to an exact stem or branch value in the supplied pillars.',
        ]);
      }
      sources.push(...drafts.map((draft) => sourceEvidence(draft, i68Item.relationId, relations)));
    }

    sources.sort((left, right) =>
      `${left.participantPosition}|${left.sourcePillar}|${left.sourceComponent}|${left.sourceValue}`.localeCompare(
        `${right.participantPosition}|${right.sourcePillar}|${right.sourceComponent}|${right.sourceValue}`,
      ),
    );

    items.push({
      mechanism: i68Item.mechanism,
      evaluatedClashRelationId: i68Item.relationId,
      evaluatedSupportChannelSourcePillar: i68Item.sourcePillar,
      evaluatedSupportChannelSourceBranch: i68Item.sourceBranch,
      participantSupportSources: sources,
      sourceContestTopologyEvidenceAvailable: true,
      anyMultiTouchSupportSource: sources.some((source) => source.touchCount > 1),
      sourceActivationVerdictAuthorized: false,
      sourcePersistenceVerdictAuthorized: false,
      sourceEffectiveSupportVerdictAuthorized: false,
      relativeForceVerdict: 'not_determined',
      clashWinnerVerdict: 'not_determined',
      rescueEffectVerdict: 'not_resolved',
      clashSettlementVerdict: 'not_determined',
      targetPostRelationRootState: 'not_determined',
      effectiveMechanismForceVerdict: 'not_determined',
      relationSpecificUsefulnessHarmfulness: 'not_determined',
      numericScore: 'not_assigned',
    });
  }

  items.sort((left, right) =>
    `${left.mechanism}|${left.evaluatedClashRelationId}|${left.evaluatedSupportChannelSourcePillar}|${left.evaluatedSupportChannelSourceBranch}`.localeCompare(
      `${right.mechanism}|${right.evaluatedClashRelationId}|${right.evaluatedSupportChannelSourcePillar}|${right.evaluatedSupportChannelSourceBranch}`,
    ),
  );

  return finalized({
    evidenceVersion:
      I72_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_PAIR_LOCAL_CLASH_PARTICIPANT_SUPPORT_SOURCE_CONTEST_TOPOLOGY_EVIDENCE_VERSION,
    status: 'RESOLVED_SUPPORT_SOURCE_CONTEST_TOPOLOGY_EVIDENCE',
    upstreamI68ReportId: i68.reportId,
    upstreamI20cReportId: i20c.reportId,
    upstreamI71ReviewId: methodology.reviewId,
    items,
    supportSourceIdentityEvidenceAvailable: true,
    supportSourceContestTopologyEvidenceAvailable: true,
    authoritativeRelationIdKindPairEvidenceAvailable: true,
    sourceActivationVerdictAuthorized: false,
    sourcePersistenceVerdictAuthorized: false,
    sourceEffectiveSupportVerdictAuthorized: false,
    relativeForceVerdictAuthorized: false,
    clashWinnerVerdictAuthorized: false,
    rescueEffectAuthorized: false,
    clashSettlementAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes: [
      'I72 materializes exact support-source values from resolved pillars, preserving the I20c support-signal provenance attached to each deduplicated source.',
      'Structural relation touches are independently recomputed and relation id-kind pairs are emitted directly from exact candidates rather than reconstructed from separate metadata arrays.',
      'Source-local topology is evidence only. Untouched, evaluated-clash, other-clash, combination, and multi-touch states do not establish activation, persistence, destruction, neutralization, effective support, or relative force.',
    ],
  });
}
