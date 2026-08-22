import {
  deriveStructuralRelationCandidates,
  type PillarSlot,
  type StructuralPillarInput,
  type StructuralRelationCandidate,
} from '../calculation/structural-relations.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeMechanism } from './i24-challenge-mechanism-composition.js';
import type {
  ChallengeRootThreeCombinationBureauFormationEvidenceItem,
  ChallengeRootThreeCombinationBureauFormationEvidenceReport,
} from './i45-challenge-root-three-combination-bureau-formation-evidence.js';
import type {
  ChallengeRootThreeCombinationClashBreakDamageSettlementMethodologyReviewReport,
  ThreeCombinationClashPlacementClass,
  ThreeCombinationClashSettlementPolicyState,
} from './i46-challenge-root-three-combination-clash-break-damage-settlement-methodology-review.js';

export const I47_CHALLENGE_ROOT_THREE_COMBINATION_CLASH_PLACEMENT_SETTLEMENT_EVIDENCE_VERSION =
  'myeonghwa-challenge-root-three-combination-clash-placement-settlement-evidence-v1';

const PILLAR_ORDER = ['year', 'month', 'day', 'hour'] as const satisfies readonly PillarSlot[];
const PILLAR_INDEX: Readonly<Record<PillarSlot, number>> = Object.freeze({
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
});

export interface ThreeCombinationClashPlacementSettlementEvidence {
  clashRelationId: string;
  clashedBureauParticipantPosition: PillarSlot;
  clashCounterpartPosition: PillarSlot;
  bureauSpanStart: PillarSlot;
  bureauSpanEnd: PillarSlot;
  counterpartEmbeddedWithinBureauSpan: boolean;
  counterpartTightToClashedParticipant: boolean;
  placementClass: ThreeCombinationClashPlacementClass;
  settlement: ThreeCombinationClashSettlementPolicyState;
  deterministicBureauState?: 'BROKEN_BY_TIGHT_EMBEDDED_CLASH';
  damageMagnitude: 'not_assigned';
  numericWeight: 'not_assigned';
}

export interface ChallengeRootThreeCombinationClashPlacementSettlementEvidenceItem {
  mechanism: ChallengeMechanism;
  formationRelationId: string;
  bureauParticipantPositions: readonly PillarSlot[];
  bureauSpanStart: PillarSlot;
  bureauSpanEnd: PillarSlot;
  formationState: 'STRUCTURAL_BUREAU_FORMED';
  clashes: readonly ThreeCombinationClashPlacementSettlementEvidence[];
  trackedClashCount: number;
  directBreakCount: number;
  postInteractionBureauState: 'BROKEN_BY_TIGHT_EMBEDDED_CLASH' | 'not_determined';
  postInteractionBureauStateBasis:
    | 'SINGLE_SOURCE_BOUNDED_TIGHT_EMBEDDED_CLASH'
    | 'NO_DETERMINISTIC_STATE_FROM_I46';
  genericIntactOrDamagedVerdict: 'not_determined';
  seasonalOverrideResolved: false;
  supportOverrideResolved: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  numericScore: 'not_assigned';
}

export interface ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport {
  reportId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_CLASH_PLACEMENT_SETTLEMENT_EVIDENCE'
    | 'PILLARS_UNRESOLVED'
    | 'FORMATION_EVIDENCE_UNRESOLVED'
    | 'FORMATION_EVIDENCE_MISALIGNED'
    | 'METHODOLOGY_NOT_AUTHORIZED'
    | 'CLASH_TOPOLOGY_MISALIGNED';
  upstreamI45ReportId: string;
  upstreamI46ReviewId: string;
  items: readonly ChallengeRootThreeCombinationClashPlacementSettlementEvidenceItem[];
  placementClassificationAvailable: boolean;
  tightEmbeddedBreakStateEmissionAuthorized: true;
  genericPostInteractionBureauStateEmissionAuthorized: false;
  damagedBureauMagnitudeClassificationAuthorized: false;
  multipleClashAggregationAuthorized: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

function finalized(
  material: Omit<ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport, 'reportId'>,
): ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport {
  return {
    reportId: `challenge_root_three_combination_clash_placement_settlement_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function unresolved(
  status: Exclude<
    ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport['status'],
    'RESOLVED_CLASH_PLACEMENT_SETTLEMENT_EVIDENCE'
  >,
  formationEvidence: ChallengeRootThreeCombinationBureauFormationEvidenceReport,
  methodology: ChallengeRootThreeCombinationClashBreakDamageSettlementMethodologyReviewReport,
  notes: readonly string[],
): ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport {
  return finalized({
    evidenceVersion: I47_CHALLENGE_ROOT_THREE_COMBINATION_CLASH_PLACEMENT_SETTLEMENT_EVIDENCE_VERSION,
    status,
    upstreamI45ReportId: formationEvidence.reportId,
    upstreamI46ReviewId: methodology.reviewId,
    items: [],
    placementClassificationAvailable: false,
    tightEmbeddedBreakStateEmissionAuthorized: true,
    genericPostInteractionBureauStateEmissionAuthorized: false,
    damagedBureauMagnitudeClassificationAuthorized: false,
    multipleClashAggregationAuthorized: false,
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

function sortedPositions(positions: readonly PillarSlot[]): readonly PillarSlot[] {
  return [...positions].sort((left, right) => PILLAR_INDEX[left] - PILLAR_INDEX[right]);
}

function exactPositionsEqual(left: readonly PillarSlot[], right: readonly PillarSlot[]): boolean {
  const a = sortedPositions(left);
  const b = sortedPositions(right);
  return a.length === b.length && a.every((position, index) => position === b[index]);
}

function formationAlignedToPillars(
  item: ChallengeRootThreeCombinationBureauFormationEvidenceItem,
  relation: StructuralRelationCandidate | undefined,
): boolean {
  if (relation?.kind !== 'branch_three_combination') return false;
  const relationPositions = relation.participants.map((participant) => participant.pillar);
  return (
    item.formationState === 'STRUCTURAL_BUREAU_FORMED' &&
    item.formationBasis === 'FULL_THREE_BRANCH_MEMBERSHIP' &&
    item.fullMembershipObserved &&
    exactPositionsEqual(item.participantPositions, relationPositions)
  );
}

function span(positions: readonly PillarSlot[]): { start: PillarSlot; end: PillarSlot } {
  const sorted = sortedPositions(positions);
  const start = sorted[0];
  const end = sorted[sorted.length - 1];
  if (start === undefined || end === undefined) throw new Error('Bureau participant span requires positions.');
  return { start, end };
}

function classifyPlacement(
  bureauPositions: readonly PillarSlot[],
  clashedPosition: PillarSlot,
  counterpartPosition: PillarSlot,
): {
  embedded: boolean;
  tight: boolean;
  placementClass: ThreeCombinationClashPlacementClass;
} {
  const bureauSpan = span(bureauPositions);
  const counterpartIndex = PILLAR_INDEX[counterpartPosition];
  const embedded =
    counterpartIndex > PILLAR_INDEX[bureauSpan.start] &&
    counterpartIndex < PILLAR_INDEX[bureauSpan.end] &&
    !bureauPositions.includes(counterpartPosition);
  const tight = Math.abs(counterpartIndex - PILLAR_INDEX[clashedPosition]) === 1;

  const placementClass: ThreeCombinationClashPlacementClass = embedded
    ? tight
      ? 'EMBEDDED_WITHIN_BUREAU_SPAN_TIGHT_TO_CLASHED_PARTICIPANT'
      : 'EMBEDDED_WITHIN_BUREAU_SPAN_NOT_TIGHT'
    : tight
      ? 'OUTSIDE_BUREAU_SPAN_TIGHT_TO_CLASHED_PARTICIPANT'
      : 'OUTSIDE_BUREAU_SPAN_NOT_TIGHT';

  return { embedded, tight, placementClass };
}

function policyFor(
  methodology: ChallengeRootThreeCombinationClashBreakDamageSettlementMethodologyReviewReport,
  placementClass: ThreeCombinationClashPlacementClass,
) {
  return methodology.placementPolicies.find((policy) => policy.placement === placementClass);
}

function clashEvidence(
  item: ChallengeRootThreeCombinationBureauFormationEvidenceItem,
  clashRelation: StructuralRelationCandidate,
  methodology: ChallengeRootThreeCombinationClashBreakDamageSettlementMethodologyReviewReport,
): ThreeCombinationClashPlacementSettlementEvidence | undefined {
  const bureauPositions = new Set(item.participantPositions);
  const bureauParticipants = clashRelation.participants.filter((participant) =>
    bureauPositions.has(participant.pillar),
  );
  const counterparts = clashRelation.participants.filter(
    (participant) => !bureauPositions.has(participant.pillar),
  );
  if (bureauParticipants.length !== 1 || counterparts.length !== 1) return undefined;

  const clashedPosition = bureauParticipants[0]!.pillar;
  const counterpartPosition = counterparts[0]!.pillar;
  const bureauSpan = span(item.participantPositions);
  const placement = classifyPlacement(item.participantPositions, clashedPosition, counterpartPosition);
  const policy = policyFor(methodology, placement.placementClass);
  if (policy === undefined) return undefined;

  return {
    clashRelationId: clashRelation.relationId,
    clashedBureauParticipantPosition: clashedPosition,
    clashCounterpartPosition: counterpartPosition,
    bureauSpanStart: bureauSpan.start,
    bureauSpanEnd: bureauSpan.end,
    counterpartEmbeddedWithinBureauSpan: placement.embedded,
    counterpartTightToClashedParticipant: placement.tight,
    placementClass: placement.placementClass,
    settlement: policy.settlement,
    ...(policy.deterministicBureauState === undefined
      ? {}
      : { deterministicBureauState: policy.deterministicBureauState }),
    damageMagnitude: 'not_assigned',
    numericWeight: 'not_assigned',
  };
}

export function buildI47ChallengeRootThreeCombinationClashPlacementSettlementEvidence(
  pillars: StructuralPillarInput,
  formationEvidence: ChallengeRootThreeCombinationBureauFormationEvidenceReport,
  methodology: ChallengeRootThreeCombinationClashBreakDamageSettlementMethodologyReviewReport,
): ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport {
  if (!pillarsResolved(pillars)) {
    return unresolved('PILLARS_UNRESOLVED', formationEvidence, methodology, [
      'All four resolved pillars are required before I47 can classify bureau-span clash placement.',
    ]);
  }
  if (formationEvidence.status !== 'RESOLVED_STRUCTURAL_BUREAU_FORMATION') {
    return unresolved('FORMATION_EVIDENCE_UNRESOLVED', formationEvidence, methodology, [
      'Resolved I45 structural bureau-formation evidence is required before clash placement settlement.',
    ]);
  }
  if (
    methodology.decision !==
      'TIGHT_EMBEDDED_CLASH_BREAK_AUTHORIZED_OTHER_SETTLEMENT_STATES_CONTEXTUAL' ||
    !methodology.structuralBureauFormationRequiredBeforeSettlement ||
    !methodology.trackedClashTopologyRequiredForClashSettlement ||
    !methodology.placementClassificationAuthorized ||
    !methodology.bureauSpanDefinitionAuthorized ||
    !methodology.tightAdjacencyDefinitionAuthorized ||
    !methodology.tightEmbeddedClashBreakVerdictAuthorized ||
    methodology.tightEmbeddedClashBreakVerdict !== 'BROKEN_BY_TIGHT_EMBEDDED_CLASH' ||
    methodology.embeddedNonTightDeterministicDamageVerdictAuthorized ||
    methodology.outsideTightDeterministicDamageVerdictAuthorized ||
    methodology.outsideNonTightDeterministicSettlementAuthorized ||
    methodology.noTrackedClashIntactVerdictAuthorized ||
    methodology.damagedBureauMagnitudeClassificationAuthorized ||
    methodology.multipleClashAggregationAuthorized ||
    methodology.clashForceWeightingAuthorized ||
    methodology.genericPostInteractionBureauStateEmissionAuthorized ||
    methodology.classificationAuthorized ||
    methodology.numericScoringAuthorized
  ) {
    return unresolved('METHODOLOGY_NOT_AUTHORIZED', formationEvidence, methodology, [
      'I46 does not authorize the narrow source-bounded I47 clash placement settlement contract.',
    ]);
  }

  const relations = deriveStructuralRelationCandidates(pillars);
  const relationById = new Map(relations.map((relation) => [relation.relationId, relation] as const));

  if (
    !formationEvidence.items.every((item) =>
      formationAlignedToPillars(item, relationById.get(item.relationId)),
    )
  ) {
    return unresolved('FORMATION_EVIDENCE_MISALIGNED', formationEvidence, methodology, [
      'The supplied I45 formation items do not match the branch-three structural relations derived from the current pillars.',
    ]);
  }

  const items: ChallengeRootThreeCombinationClashPlacementSettlementEvidenceItem[] = [];
  for (const formation of formationEvidence.items) {
    const trackedClashes = formation.clashTopology.filter(
      (topology) => topology.relationKind === 'branch_clash',
    );
    const clashes: ThreeCombinationClashPlacementSettlementEvidence[] = [];

    for (const topology of trackedClashes) {
      const relation = relationById.get(topology.relationId);
      if (relation?.kind !== 'branch_clash') {
        return unresolved('CLASH_TOPOLOGY_MISALIGNED', formationEvidence, methodology, [
          `I45 clash topology ${topology.relationId} does not match a current branch_clash relation.`,
        ]);
      }
      const classified = clashEvidence(formation, relation, methodology);
      if (classified === undefined) {
        return unresolved('CLASH_TOPOLOGY_MISALIGNED', formationEvidence, methodology, [
          `I45 clash topology ${topology.relationId} does not contain exactly one bureau participant and one external counterpart.`,
        ]);
      }
      clashes.push(classified);
    }

    const directBreaks = clashes.filter(
      (clash) => clash.deterministicBureauState === 'BROKEN_BY_TIGHT_EMBEDDED_CLASH',
    );
    const singleDirectBreak = directBreaks.length === 1;
    const bureauSpan = span(formation.participantPositions);

    items.push({
      mechanism: formation.mechanism,
      formationRelationId: formation.relationId,
      bureauParticipantPositions: sortedPositions(formation.participantPositions),
      bureauSpanStart: bureauSpan.start,
      bureauSpanEnd: bureauSpan.end,
      formationState: 'STRUCTURAL_BUREAU_FORMED',
      clashes,
      trackedClashCount: clashes.length,
      directBreakCount: directBreaks.length,
      postInteractionBureauState: singleDirectBreak
        ? 'BROKEN_BY_TIGHT_EMBEDDED_CLASH'
        : 'not_determined',
      postInteractionBureauStateBasis: singleDirectBreak
        ? 'SINGLE_SOURCE_BOUNDED_TIGHT_EMBEDDED_CLASH'
        : 'NO_DETERMINISTIC_STATE_FROM_I46',
      genericIntactOrDamagedVerdict: 'not_determined',
      seasonalOverrideResolved: false,
      supportOverrideResolved: false,
      targetPostRelationRootState: 'not_determined',
      effectiveMechanismForceVerdict: 'not_determined',
      relationSpecificUsefulnessHarmfulness: 'not_determined',
      numericScore: 'not_assigned',
    });
  }

  return finalized({
    evidenceVersion: I47_CHALLENGE_ROOT_THREE_COMBINATION_CLASH_PLACEMENT_SETTLEMENT_EVIDENCE_VERSION,
    status: 'RESOLVED_CLASH_PLACEMENT_SETTLEMENT_EVIDENCE',
    upstreamI45ReportId: formationEvidence.reportId,
    upstreamI46ReviewId: methodology.reviewId,
    items,
    placementClassificationAvailable: true,
    tightEmbeddedBreakStateEmissionAuthorized: true,
    genericPostInteractionBureauStateEmissionAuthorized: false,
    damagedBureauMagnitudeClassificationAuthorized: false,
    multipleClashAggregationAuthorized: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes: [
      'I47 recomputes the current structural relation graph and accepts I45 items only when the full-three relation identity and participant positions align exactly.',
      'Clash placement is categorical: the external clash counterpart is classified relative to the min/max pillar span of the formed bureau and immediate adjacency to the directly clashed bureau participant.',
      'Only one source-bounded embedded+tight clash emits BROKEN_BY_TIGHT_EMBEDDED_CLASH; embedded non-tight and outside tight cases remain contextual, while outside non-tight or no clash emit no intactness conclusion.',
      'Multiple-clash aggregation is not authorized; I47 emits the deterministic bureau state only when exactly one direct source-bounded break is present.',
      'Bureau breakage remains separate from target-root destruction, post-relation root state, effective mechanism force, usefulness/harmfulness, numeric score, confidence, and strong/weak classification.',
    ],
  });
}
