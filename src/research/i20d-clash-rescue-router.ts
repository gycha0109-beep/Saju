import type { PillarSlot, StructuralRelationCandidate } from '../calculation/structural-relations.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { RootRelationEffectReviewReport } from './i18d-root-relation-review.js';

export const I20D_CLASH_RESCUE_ROUTER_VERSION = 'myeonghwa-clash-rescue-router-v1';

export type ClashRescueCandidateKind =
  | 'SIX_COMBINATION_RESCUE_CANDIDATE'
  | 'THREE_COMBINATION_RESCUE_CANDIDATE';

export interface ClashRescueRelationCandidate {
  clashRelationId: string;
  rescueRelationId: string;
  rescueKind: ClashRescueCandidateKind;
  sharedClashParticipantPositions: readonly PillarSlot[];
  rescueStrength: 'not_evaluated';
  rescueEffect: 'not_resolved';
  clashSettlement: 'not_determined';
  relativeForceVerdict: 'not_determined';
  rootEffectVerdict: 'not_determined';
  numericScore: 'not_assigned';
}

export interface ClashRescueRouterReport {
  reportId: string;
  reportVersion: string;
  status: 'RESOLVED_RESCUE_ROUTING' | 'INPUT_INDETERMINATE';
  rootRelationReviewId: string;
  candidates: readonly ClashRescueRelationCandidate[];
  rescueEffectAuthorized: false;
  clashSettlementAuthorized: false;
  relativeForceVerdictAuthorized: false;
  rootEffectResolutionAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  sourceBasis: readonly {
    sourceId: string;
    finding: string;
  }[];
  notes: readonly string[];
}

export const I20D_RESCUE_SOURCE_BASIS = Object.freeze([
  {
    sourceId: 'SRC-I20D-DITIANSUI-ZHANHE-WIKISOURCE',
    finding:
      'The text gives cases where a clash can be settled by a combination or meeting relation, but requires the combining/meeting influence to have effective force.',
  },
  {
    sourceId: 'SRC-METHOD-DITIANSUI-CHANWEI-WIKISOURCE',
    finding:
      'Combination can help or hinder depending on context, so structural combination presence is only a rescue-review candidate and not proof that a clash is neutralized.',
  },
] as const);

function branchParticipantPositions(
  candidate: StructuralRelationCandidate,
): readonly PillarSlot[] {
  return candidate.participants.flatMap((participant) =>
    participant.component === 'branch' ? [participant.pillar] : [],
  );
}

function rescueKind(candidate: StructuralRelationCandidate): ClashRescueCandidateKind | undefined {
  if (candidate.kind === 'branch_six_combination') return 'SIX_COMBINATION_RESCUE_CANDIDATE';
  if (candidate.kind === 'branch_three_combination') return 'THREE_COMBINATION_RESCUE_CANDIDATE';
  return undefined;
}

function finalized(
  material: Omit<ClashRescueRouterReport, 'reportId'>,
): ClashRescueRouterReport {
  return {
    reportId: `clash_rescue_router_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI20DClashRescueRouter(
  rootRelationReview: RootRelationEffectReviewReport,
): ClashRescueRouterReport {
  const base = {
    reportVersion: I20D_CLASH_RESCUE_ROUTER_VERSION,
    rootRelationReviewId: rootRelationReview.reviewId,
    rescueEffectAuthorized: false as const,
    clashSettlementAuthorized: false as const,
    relativeForceVerdictAuthorized: false as const,
    rootEffectResolutionAuthorized: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    sourceBasis: I20D_RESCUE_SOURCE_BASIS,
  };

  if (rootRelationReview.status !== 'RESOLVED_BASIS_ROUTED') {
    return finalized({
      ...base,
      status: 'INPUT_INDETERMINATE',
      candidates: [],
      notes: [
        'A resolved structural relation review is required before rescue candidates can be routed.',
        'No rescue effect or clash settlement is inferred from unresolved scenario bases.',
      ],
    });
  }

  const clashes = rootRelationReview.relationCandidates.filter(
    (candidate) => candidate.kind === 'branch_clash',
  );
  const potentialRescues = rootRelationReview.relationCandidates.filter(
    (candidate) => rescueKind(candidate) !== undefined,
  );

  const candidates = clashes.flatMap((clash) => {
    const clashPositions = new Set(branchParticipantPositions(clash));
    return potentialRescues.flatMap((rescue) => {
      const kind = rescueKind(rescue);
      if (kind === undefined) return [];
      const shared = branchParticipantPositions(rescue)
        .filter((position) => clashPositions.has(position))
        .sort();
      if (shared.length === 0) return [];

      return [
        {
          clashRelationId: clash.relationId,
          rescueRelationId: rescue.relationId,
          rescueKind: kind,
          sharedClashParticipantPositions: shared,
          rescueStrength: 'not_evaluated' as const,
          rescueEffect: 'not_resolved' as const,
          clashSettlement: 'not_determined' as const,
          relativeForceVerdict: 'not_determined' as const,
          rootEffectVerdict: 'not_determined' as const,
          numericScore: 'not_assigned' as const,
        },
      ];
    });
  }).sort((left, right) =>
    `${left.clashRelationId}|${left.rescueRelationId}`.localeCompare(
      `${right.clashRelationId}|${right.rescueRelationId}`,
    ),
  );

  return finalized({
    ...base,
    status: 'RESOLVED_RESCUE_ROUTING',
    candidates,
    notes: [
      'A rescue candidate means only that a tracked combination/meeting relation structurally touches a clash participant.',
      'The source requires effective force and contextual judgment before such a relation can settle or redirect a clash.',
      'No rescue strength, clash settlement, root effect, relative-force verdict, or numeric score is produced here.',
    ],
  });
}
