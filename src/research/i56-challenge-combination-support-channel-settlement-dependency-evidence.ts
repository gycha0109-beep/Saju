import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { PillarSlot, StructuralRelationKind } from '../calculation/structural-relations.js';
import type { ChallengeCombinationSupportChannelEvidence } from './i52-challenge-combination-support-channel-evidence.js';
import type { ChallengeCombinationSupportChannelContestTopologyState } from './i53-challenge-combination-support-channel-activation-persistence-methodology-review.js';
import type {
  ChallengeCombinationSupportChannelContestTopologyEvidenceItem,
  ChallengeCombinationSupportChannelContestTopologyEvidenceReport,
} from './i54-challenge-combination-support-channel-contest-topology-evidence.js';
import {
  buildI55ChallengeCombinationSupportChannelContestSettlementMethodologyReview,
  routeI55ChallengeCombinationSupportChannelContestSettlement,
  type ChallengeCombinationSupportChannelContestSettlementDependency,
  type ChallengeCombinationSupportChannelContestSettlementMethodologyReviewReport,
} from './i55-challenge-combination-support-channel-contest-settlement-methodology-review.js';

export const I56_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_SETTLEMENT_DEPENDENCY_EVIDENCE_VERSION =
  'myeonghwa-challenge-combination-support-channel-settlement-dependency-evidence-v1';

export interface ChallengeCombinationSupportChannelSettlementDependencyEvidenceItem {
  mechanism: ChallengeCombinationSupportChannelContestTopologyEvidenceItem['mechanism'];
  currentCombinationRelationId: string;
  currentCombinationRelationKind: ChallengeCombinationSupportChannelContestTopologyEvidenceItem['currentCombinationRelationKind'];
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
  directContestSettlementRequired: boolean;
  requiredSettlementDependencies: readonly ChallengeCombinationSupportChannelContestSettlementDependency[];
  settlementDependenciesResolved: false;
  supportChannelActive: 'not_determined';
  supportChannelPersisted: 'not_determined';
  supportChannelNeutralized: 'not_determined';
  supportChannelDestroyed: 'not_determined';
  supportChannelNetEffect: 'not_resolved';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  numericScore: 'not_assigned';
}

export interface ChallengeCombinationSupportChannelSettlementDependencyEvidenceReport {
  reportId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_SETTLEMENT_DEPENDENCY_EVIDENCE'
    | 'I54_UNRESOLVED_OR_INVALID'
    | 'I55_METHODOLOGY_NOT_AUTHORIZED'
    | 'I54_TOPOLOGY_METADATA_MISMATCH';
  upstreamI54ReportId: string;
  upstreamI55ReviewId: string;
  items: readonly ChallengeCombinationSupportChannelSettlementDependencyEvidenceItem[];
  settlementDependencyEvidenceAvailable: boolean;
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
  material: Omit<ChallengeCombinationSupportChannelSettlementDependencyEvidenceReport, 'reportId'>,
): ChallengeCombinationSupportChannelSettlementDependencyEvidenceReport {
  return {
    reportId: `challenge_combination_support_channel_settlement_dependency_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function unresolved(
  status: Exclude<
    ChallengeCombinationSupportChannelSettlementDependencyEvidenceReport['status'],
    'RESOLVED_SETTLEMENT_DEPENDENCY_EVIDENCE'
  >,
  topologyEvidence: ChallengeCombinationSupportChannelContestTopologyEvidenceReport,
  methodology: ChallengeCombinationSupportChannelContestSettlementMethodologyReviewReport,
  notes: readonly string[],
): ChallengeCombinationSupportChannelSettlementDependencyEvidenceReport {
  return finalized({
    evidenceVersion: I56_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_SETTLEMENT_DEPENDENCY_EVIDENCE_VERSION,
    status,
    upstreamI54ReportId: topologyEvidence.reportId,
    upstreamI55ReviewId: methodology.reviewId,
    items: [],
    settlementDependencyEvidenceAvailable: false,
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

function topologyEvidenceContractAccepted(
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

function methodologyAccepted(
  methodology: ChallengeCombinationSupportChannelContestSettlementMethodologyReviewReport,
): boolean {
  const canonical =
    buildI55ChallengeCombinationSupportChannelContestSettlementMethodologyReview();
  return (
    methodology.reviewId === canonical.reviewId &&
    methodology.decision ===
      'RELATION_SPECIFIC_SETTLEMENT_ROUTING_AUTHORIZED_CONTEST_OUTCOME_VERDICT_BLOCKED' &&
    methodology.relationSpecificSettlementRoutingAuthorized &&
    methodology.noTrackedRelationTouchRequiresDirectContestSettlement === false &&
    methodology.noTrackedRelationTouchMeansActivated === false &&
    methodology.noTrackedRelationTouchMeansPersistent === false &&
    methodology.currentCombinationParticipationRequiresBindingInteractionSettlement &&
    methodology.currentCombinationParticipationMeansBound === false &&
    methodology.currentCombinationParticipationMeansNeutralized === false &&
    methodology.competingClashTouchRequiresRelativeForceSettlement &&
    methodology.competingClashTouchRequiresRescueSettlementWhereApplicable &&
    methodology.competingClashTouchRequiresInteractionSettlement &&
    methodology.competingClashTouchMeansDestroyed === false &&
    methodology.competingClashTouchMeansInactive === false &&
    methodology.competingCombinationTouchRequiresBindingInteractionSettlement &&
    methodology.competingCombinationTouchMeansBound === false &&
    methodology.competingCombinationTouchMeansNeutralized === false &&
    methodology.multipleTrackedRelationTouchesRequireTouchSpecificSettlement &&
    methodology.multipleTrackedRelationTouchesRequireCompetingRelationSettlement &&
    methodology.multipleTrackedRelationTouchesAuthorizeFixedPrecedence === false &&
    methodology.directContestTopologyToOutcomeVerdictAuthorized === false &&
    methodology.directContestTopologyToActivationVerdictAuthorized === false &&
    methodology.directContestTopologyToPersistenceVerdictAuthorized === false &&
    methodology.directContestTopologyToNetSupportEffectAuthorized === false &&
    methodology.contestSettlementToEffectiveMechanismForceAuthorized === false &&
    methodology.contestSettlementToUsefulnessHarmfulnessAuthorized === false &&
    methodology.supportChannelAggregationAuthorized === false &&
    methodology.relationTouchCountMagnitudeInferenceAuthorized === false &&
    methodology.numericSupportWeightingAuthorized === false &&
    methodology.classificationAuthorized === false &&
    methodology.numericScoringAuthorized === false
  );
}

function topologyMetadataAligned(
  item: ChallengeCombinationSupportChannelContestTopologyEvidenceItem,
): boolean {
  if (item.touchCount !== item.touchingRelationIds.length) return false;
  if (new Set(item.touchingRelationIds).size !== item.touchingRelationIds.length) return false;
  if (new Set(item.touchingRelationKinds).size !== item.touchingRelationKinds.length) return false;

  switch (item.contestTopologyState) {
    case 'NO_TRACKED_RELATION_TOUCH':
      return (
        item.touchCount === 0 &&
        item.touchingRelationIds.length === 0 &&
        item.touchingRelationKinds.length === 0
      );
    case 'CURRENT_COMBINATION_PARTICIPATION':
      return (
        item.touchCount === 1 &&
        item.touchingRelationIds[0] === item.currentCombinationRelationId &&
        item.touchingRelationKinds.length === 1 &&
        item.touchingRelationKinds[0] === item.currentCombinationRelationKind
      );
    case 'COMPETING_CLASH_TOUCH':
      return (
        item.touchCount === 1 &&
        item.touchingRelationIds[0] !== item.currentCombinationRelationId &&
        item.touchingRelationKinds.length === 1 &&
        item.touchingRelationKinds[0] === 'branch_clash'
      );
    case 'COMPETING_COMBINATION_TOUCH':
      return (
        item.touchCount === 1 &&
        item.touchingRelationIds[0] !== item.currentCombinationRelationId &&
        item.touchingRelationKinds.length === 1 &&
        item.touchingRelationKinds[0] !== 'branch_clash'
      );
    case 'MULTIPLE_TRACKED_RELATION_TOUCHES':
      return item.touchCount > 1 && item.touchingRelationKinds.length > 0;
  }
}

function evidenceItem(
  item: ChallengeCombinationSupportChannelContestTopologyEvidenceItem,
): ChallengeCombinationSupportChannelSettlementDependencyEvidenceItem {
  const route = routeI55ChallengeCombinationSupportChannelContestSettlement(
    item.contestTopologyState,
  );
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
    touchingRelationIds: item.touchingRelationIds,
    touchingRelationKinds: item.touchingRelationKinds,
    touchCount: item.touchCount,
    directContestSettlementRequired: route.directContestSettlementRequired,
    requiredSettlementDependencies: route.requiredSettlementDependencies,
    settlementDependenciesResolved: false,
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

export function buildI56ChallengeCombinationSupportChannelSettlementDependencyEvidence(
  topologyEvidence: ChallengeCombinationSupportChannelContestTopologyEvidenceReport,
  methodology: ChallengeCombinationSupportChannelContestSettlementMethodologyReviewReport,
): ChallengeCombinationSupportChannelSettlementDependencyEvidenceReport {
  if (!topologyEvidenceContractAccepted(topologyEvidence)) {
    return unresolved('I54_UNRESOLVED_OR_INVALID', topologyEvidence, methodology, [
      'Resolved I54 topology evidence with every activation/persistence/net-effect/force/scoring guard closed is required before settlement dependency materialization.',
    ]);
  }
  if (!methodologyAccepted(methodology)) {
    return unresolved('I55_METHODOLOGY_NOT_AUTHORIZED', topologyEvidence, methodology, [
      'The supplied I55 methodology must match the canonical relation-specific-settlement-routing-only contract.',
    ]);
  }
  if (!topologyEvidence.items.every(topologyMetadataAligned)) {
    return unresolved('I54_TOPOLOGY_METADATA_MISMATCH', topologyEvidence, methodology, [
      'I54 topology state, touch count, relation ids, relation kinds, and current-combination identity must remain structurally consistent.',
      'I56 does not reconstruct relation-id to relation-kind pairs when I54 did not emit such a pair mapping.',
    ]);
  }

  const items = topologyEvidence.items.map(evidenceItem);
  return finalized({
    evidenceVersion: I56_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_SETTLEMENT_DEPENDENCY_EVIDENCE_VERSION,
    status: 'RESOLVED_SETTLEMENT_DEPENDENCY_EVIDENCE',
    upstreamI54ReportId: topologyEvidence.reportId,
    upstreamI55ReviewId: methodology.reviewId,
    items,
    settlementDependencyEvidenceAvailable: true,
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
      'I56 binds each exact I54 source-local topology state to the deterministic unresolved settlement dependency route authorized by I55.',
      'Source pillar/component/value, target participant identity, current combination identity, touching relation ids/kinds, and touch count are preserved without aggregation or force inference.',
      'For MULTIPLE_TRACKED_RELATION_TOUCHES, I56 preserves the generic TOUCH_SPECIFIC_RELATION_SETTLEMENT plus COMPETING_RELATION_SETTLEMENT route because I54 emits relation-id and relation-kind sets but not an authoritative id-to-kind pair mapping.',
      'No direct-contest dependency is required for NO_TRACKED_RELATION_TOUCH, but activation and persistence remain not determined because absence of tracked contact is not proof of active force-bearing support.',
      'Settlement dependencies are materialized as unresolved dependencies only; I56 does not settle clash relative force, rescue, combination binding/interaction, or competing-relation precedence.',
      'Net support effect, post-relation root state, effective mechanism force, usefulness/harmfulness, scoring, and strength classification remain unresolved or unauthorized.',
    ],
  });
}
