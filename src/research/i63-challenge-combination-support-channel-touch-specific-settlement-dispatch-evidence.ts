import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  ChallengeCombinationSupportChannelRelationIdentityPairEvidenceItem,
  ChallengeCombinationSupportChannelRelationIdentityPairEvidenceReport,
} from './i61-challenge-combination-support-channel-relation-identity-pair-evidence.js';
import {
  buildI62ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReview,
  routeI62TouchSpecificSettlementPair,
  type ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReviewReport,
  type TouchSpecificSettlementDispatchResult,
} from './i62-challenge-combination-support-channel-touch-specific-settlement-dispatch-methodology-review.js';

export const I63_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_TOUCH_SPECIFIC_SETTLEMENT_DISPATCH_EVIDENCE_VERSION =
  'myeonghwa-challenge-combination-support-channel-touch-specific-settlement-dispatch-evidence-v1';

export interface ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidenceItem {
  mechanism: ChallengeCombinationSupportChannelRelationIdentityPairEvidenceItem['mechanism'];
  currentCombinationRelationId: string;
  currentCombinationRelationKind: ChallengeCombinationSupportChannelRelationIdentityPairEvidenceItem['currentCombinationRelationKind'];
  targetParticipantPillar: ChallengeCombinationSupportChannelRelationIdentityPairEvidenceItem['targetParticipantPillar'];
  targetParticipantComponent: ChallengeCombinationSupportChannelRelationIdentityPairEvidenceItem['targetParticipantComponent'];
  targetParticipantValue: string;
  supportChannelKind: ChallengeCombinationSupportChannelRelationIdentityPairEvidenceItem['supportChannelKind'];
  sourcePillar: ChallengeCombinationSupportChannelRelationIdentityPairEvidenceItem['sourcePillar'];
  sourceComponent: ChallengeCombinationSupportChannelRelationIdentityPairEvidenceItem['sourceComponent'];
  sourceValue: string;
  contestTopologyState: ChallengeCombinationSupportChannelRelationIdentityPairEvidenceItem['contestTopologyState'];
  touchCount: number;
  dispatchedRelations: readonly TouchSpecificSettlementDispatchResult[];
  allRelationPairsDispatched: true;
  anySettlementOutcomeResolved: false;
  supportChannelActive: 'not_determined';
  supportChannelPersisted: 'not_determined';
  supportChannelNeutralized: 'not_determined';
  supportChannelDestroyed: 'not_determined';
  supportChannelNetEffect: 'not_resolved';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  numericScore: 'not_assigned';
}

export interface ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidenceReport {
  reportId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_TOUCH_SPECIFIC_SETTLEMENT_DISPATCH_EVIDENCE'
    | 'I61_UNRESOLVED_OR_INVALID'
    | 'I62_METHODOLOGY_NOT_AUTHORIZED'
    | 'DISPATCH_MATERIALIZATION_MISMATCH';
  upstreamI61ReportId: string;
  upstreamI62ReviewId: string;
  items: readonly ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidenceItem[];
  touchSpecificSettlementDispatchEvidenceAvailable: boolean;
  allRelationPairsDispatched: boolean;
  pairOrderSignificanceAuthorized: false;
  multiTouchAggregationAuthorized: false;
  crossRelationPrecedenceAuthorized: false;
  settlementOutcomeVerdictAuthorized: false;
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
  material: Omit<
    ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidenceReport,
    'reportId'
  >,
): ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidenceReport {
  return {
    reportId: `challenge_combination_support_channel_touch_specific_settlement_dispatch_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function unresolved(
  status: Exclude<
    ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidenceReport['status'],
    'RESOLVED_TOUCH_SPECIFIC_SETTLEMENT_DISPATCH_EVIDENCE'
  >,
  pairEvidence: ChallengeCombinationSupportChannelRelationIdentityPairEvidenceReport,
  methodology: ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReviewReport,
  notes: readonly string[],
): ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidenceReport {
  return finalized({
    evidenceVersion:
      I63_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_TOUCH_SPECIFIC_SETTLEMENT_DISPATCH_EVIDENCE_VERSION,
    status,
    upstreamI61ReportId: pairEvidence.reportId,
    upstreamI62ReviewId: methodology.reviewId,
    items: [],
    touchSpecificSettlementDispatchEvidenceAvailable: false,
    allRelationPairsDispatched: false,
    pairOrderSignificanceAuthorized: false,
    multiTouchAggregationAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    settlementOutcomeVerdictAuthorized: false,
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

function i61ContractAccepted(
  evidence: ChallengeCombinationSupportChannelRelationIdentityPairEvidenceReport,
): boolean {
  return (
    evidence.status === 'RESOLVED_RELATION_IDENTITY_PAIR_EVIDENCE' &&
    evidence.relationIdKindPairEvidenceAvailable &&
    evidence.pairReconstructionFromSeparateI54ArraysUsed === false &&
    evidence.touchSpecificSettlementDispatchAuthorized === false &&
    evidence.crossRelationPrecedenceAuthorized === false &&
    evidence.contestOutcomeVerdictAuthorized === false &&
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
        item.relationIdKindPairEvidenceAvailable &&
        item.touchSpecificSettlementDispatchAuthorized === false &&
        item.crossRelationPrecedenceAuthorized === false &&
        item.touchCount === item.touchingRelations.length &&
        item.touchingRelations.every(
          (pair) =>
            pair.precedence === 'not_determined' && pair.settlementOutcome === 'not_determined',
        ) &&
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

function i62MethodologyAccepted(
  review: ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReviewReport,
): boolean {
  const canonical =
    buildI62ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReview();
  return (
    review.reviewId === canonical.reviewId &&
    review.decision === 'PAIR_KIND_DISPATCH_AUTHORIZED_PRECEDENCE_AND_OUTCOME_BLOCKED' &&
    review.exactI61PairRequired &&
    review.touchSpecificSettlementDispatchAuthorized &&
    review.currentCombinationPairDispatchAuthorized &&
    review.competingClashPairDispatchAuthorized &&
    review.competingCombinationPairDispatchAuthorized &&
    review.pairDispatchMayReuseI55DependencyVocabulary &&
    review.crossRelationPrecedenceAuthorized === false &&
    review.multiTouchAggregationAuthorized === false &&
    review.pairOrderSignificanceAuthorized === false &&
    review.dispatchToSettlementOutcomeAuthorized === false &&
    review.dispatchToSupportChannelActivationAuthorized === false &&
    review.dispatchToSupportChannelPersistenceAuthorized === false &&
    review.dispatchToSupportChannelDestructionAuthorized === false &&
    review.dispatchToSupportChannelNetEffectAuthorized === false &&
    review.dispatchToEffectiveMechanismForceAuthorized === false &&
    review.dispatchToUsefulnessHarmfulnessAuthorized === false &&
    review.classificationAuthorized === false &&
    review.numericScoringAuthorized === false
  );
}

function materializeItem(
  item: ChallengeCombinationSupportChannelRelationIdentityPairEvidenceItem,
): ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidenceItem | undefined {
  let dispatchedRelations: TouchSpecificSettlementDispatchResult[];
  try {
    dispatchedRelations = item.touchingRelations.map(routeI62TouchSpecificSettlementPair);
  } catch {
    return undefined;
  }

  if (
    dispatchedRelations.length !== item.touchingRelations.length ||
    dispatchedRelations.some((dispatch, index) => {
      const pair = item.touchingRelations[index];
      return (
        pair === undefined ||
        dispatch.relationId !== pair.relationId ||
        dispatch.relationKind !== pair.relationKind ||
        dispatch.isCurrentCombinationRelation !== pair.isCurrentCombinationRelation ||
        dispatch.precedenceWithinMultiTouch !== 'not_determined' ||
        dispatch.settlementOutcome !== 'not_determined'
      );
    })
  ) {
    return undefined;
  }

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
    touchCount: item.touchCount,
    dispatchedRelations,
    allRelationPairsDispatched: true,
    anySettlementOutcomeResolved: false,
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

export function buildI63ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidence(
  pairEvidence: ChallengeCombinationSupportChannelRelationIdentityPairEvidenceReport,
  methodology: ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchMethodologyReviewReport,
): ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidenceReport {
  if (!i61ContractAccepted(pairEvidence)) {
    return unresolved('I61_UNRESOLVED_OR_INVALID', pairEvidence, methodology, [
      'Resolved fail-closed I61 relation identity pair evidence is required before pair-local settlement dispatch is materialized.',
    ]);
  }
  if (!i62MethodologyAccepted(methodology)) {
    return unresolved('I62_METHODOLOGY_NOT_AUTHORIZED', pairEvidence, methodology, [
      'The supplied I62 review is not the canonical pair-kind dispatch methodology with precedence and outcomes blocked.',
    ]);
  }

  const items: ChallengeCombinationSupportChannelTouchSpecificSettlementDispatchEvidenceItem[] = [];
  for (const item of pairEvidence.items) {
    const materialized = materializeItem(item);
    if (materialized === undefined) {
      return unresolved('DISPATCH_MATERIALIZATION_MISMATCH', pairEvidence, methodology, [
        'At least one exact I61 relation pair could not be materialized through the canonical I62 pair-kind dispatch map without identity drift.',
      ]);
    }
    items.push(materialized);
  }

  return finalized({
    evidenceVersion:
      I63_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_TOUCH_SPECIFIC_SETTLEMENT_DISPATCH_EVIDENCE_VERSION,
    status: 'RESOLVED_TOUCH_SPECIFIC_SETTLEMENT_DISPATCH_EVIDENCE',
    upstreamI61ReportId: pairEvidence.reportId,
    upstreamI62ReviewId: methodology.reviewId,
    items,
    touchSpecificSettlementDispatchEvidenceAvailable: true,
    allRelationPairsDispatched: true,
    pairOrderSignificanceAuthorized: false,
    multiTouchAggregationAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    settlementOutcomeVerdictAuthorized: false,
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
      'I63 preserves each exact I61 relation identity and materializes only the canonical I62 dependency route for that individual pair.',
      'Dispatched relations remain unordered and unaggregated. The report does not authorize cross-relation precedence or combine multiple pair outcomes.',
      'Every dispatched dependency remains unresolved. Dispatch does not imply relative-force, rescue, binding, neutralization, support activation/persistence/destruction, net effect, effective mechanism force, usefulness/harmfulness, numeric score, or strong/weak classification.',
    ],
  });
}
