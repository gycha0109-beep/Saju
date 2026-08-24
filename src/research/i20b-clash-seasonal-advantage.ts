import type { EarthlyBranch } from '../contracts/calculation.js';
import type { PillarSlot, StructuralRelationCandidate } from '../calculation/structural-relations.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { RootRelationEffectReviewReport } from './i18d-root-relation-review.js';
import type {
  RelativeForceEvidenceReport,
  RelativeForcePositionEvidence,
  SeasonalElementPhase,
} from './i20-relative-force-evidence.js';

export const I20B_CLASH_SEASONAL_ADVANTAGE_VERSION =
  'myeonghwa-clash-seasonal-advantage-v1';

const PHASE_ORDER: Readonly<Record<SeasonalElementPhase, number>> = Object.freeze({
  旺: 5,
  相: 4,
  休: 3,
  囚: 2,
  死: 1,
});

export type SeasonalAdvantageCandidate =
  | 'FIRST_PARTICIPANT'
  | 'SECOND_PARTICIPANT'
  | 'TIED_SEASONAL_PHASE'
  | 'NOT_COMPARABLE';

export interface ClashParticipantSeasonalEvidence {
  position: PillarSlot;
  branch: EarthlyBranch;
  seasonalPhase: SeasonalElementPhase;
  visibleSameElementStemPositions: readonly PillarSlot[];
  visibleResourceStemPositions: readonly PillarSlot[];
  sameElementBranchPositions: readonly PillarSlot[];
  resourceBranchPositions: readonly PillarSlot[];
}

export interface ClashSeasonalAdvantageCandidate {
  relationId: string;
  participants: readonly [ClashParticipantSeasonalEvidence, ClashParticipantSeasonalEvidence];
  seasonalAdvantageCandidate: SeasonalAdvantageCandidate;
  localSupportEffect: 'not_resolved';
  rescueEffect: 'not_resolved';
  relativeForceVerdict: 'not_determined';
  rootEffectVerdict: 'not_determined';
  numericScore: 'not_assigned';
}

export interface ClashSeasonalAdvantageReport {
  reportId: string;
  reportVersion: string;
  status: 'RESOLVED_CANDIDATES' | 'INPUT_INDETERMINATE';
  relativeForceEvidenceReportId: string;
  rootRelationReviewId: string;
  candidates: readonly ClashSeasonalAdvantageCandidate[];
  relativeForceVerdictAuthorized: false;
  rootEffectResolutionAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

function branchParticipants(
  candidate: StructuralRelationCandidate,
): readonly { position: PillarSlot; branch: EarthlyBranch }[] {
  return candidate.participants.flatMap((participant) => {
    if (participant.component !== 'branch') return [];
    return [{ position: participant.pillar, branch: participant.value as EarthlyBranch }];
  });
}

function participantEvidence(
  participant: { position: PillarSlot; branch: EarthlyBranch },
  evidence: RelativeForceEvidenceReport,
): ClashParticipantSeasonalEvidence | undefined {
  const positionEvidence: RelativeForcePositionEvidence | undefined = evidence.positions.find(
    (item) => item.position === participant.position && item.branch === participant.branch,
  );
  if (positionEvidence === undefined) return undefined;

  return {
    position: positionEvidence.position,
    branch: positionEvidence.branch,
    seasonalPhase: positionEvidence.seasonalPhase,
    visibleSameElementStemPositions: positionEvidence.visibleSameElementStemPositions,
    visibleResourceStemPositions: positionEvidence.visibleResourceStemPositions,
    sameElementBranchPositions: positionEvidence.sameElementBranchPositions,
    resourceBranchPositions: positionEvidence.resourceBranchPositions,
  };
}

function advantage(
  first: ClashParticipantSeasonalEvidence,
  second: ClashParticipantSeasonalEvidence,
): SeasonalAdvantageCandidate {
  const firstOrder = PHASE_ORDER[first.seasonalPhase];
  const secondOrder = PHASE_ORDER[second.seasonalPhase];
  if (firstOrder === secondOrder) return 'TIED_SEASONAL_PHASE';
  return firstOrder > secondOrder ? 'FIRST_PARTICIPANT' : 'SECOND_PARTICIPANT';
}

function finalized(
  material: Omit<ClashSeasonalAdvantageReport, 'reportId'>,
): ClashSeasonalAdvantageReport {
  return {
    reportId: `clash_seasonal_advantage_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI20BClashSeasonalAdvantage(
  relativeForceEvidence: RelativeForceEvidenceReport,
  rootRelationReview: RootRelationEffectReviewReport,
): ClashSeasonalAdvantageReport {
  const base = {
    reportVersion: I20B_CLASH_SEASONAL_ADVANTAGE_VERSION,
    relativeForceEvidenceReportId: relativeForceEvidence.reportId,
    rootRelationReviewId: rootRelationReview.reviewId,
    relativeForceVerdictAuthorized: false as const,
    rootEffectResolutionAuthorized: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
  };

  if (
    relativeForceEvidence.status !== 'RESOLVED_EVIDENCE' ||
    rootRelationReview.status !== 'RESOLVED_BASIS_ROUTED'
  ) {
    return finalized({
      ...base,
      status: 'INPUT_INDETERMINATE',
      candidates: [],
      notes: [
        'Resolved relative-force evidence and a resolved root-relation review are both required.',
        'No seasonal advantage candidate is emitted from unresolved scenario bases.',
      ],
    });
  }

  const candidates = rootRelationReview.relationCandidates.flatMap((relation) => {
    if (relation.kind !== 'branch_clash') return [];
    const participants = branchParticipants(relation);
    if (participants.length !== 2) return [];

    const firstParticipant = participants[0];
    const secondParticipant = participants[1];
    if (firstParticipant === undefined || secondParticipant === undefined) return [];

    const first = participantEvidence(firstParticipant, relativeForceEvidence);
    const second = participantEvidence(secondParticipant, relativeForceEvidence);
    if (first === undefined || second === undefined) return [];

    return [
      {
        relationId: relation.relationId,
        participants: [first, second] as const,
        seasonalAdvantageCandidate: advantage(first, second),
        localSupportEffect: 'not_resolved' as const,
        rescueEffect: 'not_resolved' as const,
        relativeForceVerdict: 'not_determined' as const,
        rootEffectVerdict: 'not_determined' as const,
        numericScore: 'not_assigned' as const,
      },
    ];
  });

  return finalized({
    ...base,
    status: 'RESOLVED_CANDIDATES',
    candidates,
    notes: [
      'Seasonal advantage compares only the source-backed 旺/相/休/囚/死 phase ordering.',
      'The candidate is not a clash winner because visible/branch support context has not been assigned effect or precedence.',
      'No relation rescue, transformation, root damage, or final strength result is inferred.',
    ],
  });
}
