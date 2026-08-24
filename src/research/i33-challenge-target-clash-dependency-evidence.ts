import {
  deriveStructuralRelationCandidates,
  type PillarSlot,
  type StructuralPillarInput,
  type StructuralRelationCandidate,
} from '../calculation/structural-relations.js';
import type { EarthlyBranch, FiveElement } from '../contracts/calculation.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { seasonalElementPhase, type SeasonalElementPhase } from './i20-relative-force-evidence.js';
import type { ChallengeMechanism } from './i24-challenge-mechanism-composition.js';
import {
  buildResolvedI29ChallengeTargetIntrinsicRootEvidence,
  type ChallengeTargetIntrinsicRootEvidenceReport,
  type ChallengeTargetRootCandidateClass,
} from './i29-challenge-target-intrinsic-root-evidence.js';
import {
  buildResolvedI31ChallengeTargetRelationParticipationEvidence,
  type ChallengeTargetRelationParticipationEvidenceReport,
} from './i31-challenge-target-relation-participation-evidence.js';

export const I33_CHALLENGE_TARGET_CLASH_DEPENDENCY_EVIDENCE_VERSION =
  'myeonghwa-challenge-target-clash-dependency-evidence-v1';

const PILLAR_SLOTS = ['year', 'month', 'day', 'hour'] as const satisfies readonly PillarSlot[];

const GENERATES: Readonly<Record<FiveElement, FiveElement>> = Object.freeze({
  목: '화',
  화: '토',
  토: '금',
  금: '수',
  수: '목',
});

const PHASE_ORDER: Readonly<Record<SeasonalElementPhase, number>> = Object.freeze({
  旺: 5,
  相: 4,
  休: 3,
  囚: 2,
  死: 1,
});

export type ChallengeClashParticipantRole = 'TARGET_ROOT_CANDIDATE' | 'CLASH_COUNTERPART';

export type ChallengeClashSeasonalAdvantageCandidate =
  | 'TARGET_ROOT_CANDIDATE'
  | 'CLASH_COUNTERPART'
  | 'TIED_SEASONAL_PHASE';

export interface ChallengeTargetClashParticipantDependencyEvidence {
  role: ChallengeClashParticipantRole;
  position: PillarSlot;
  branch: EarthlyBranch;
  branchElement: FiveElement;
  seasonalPhase: SeasonalElementPhase;
  visibleSameElementStemPositions: readonly PillarSlot[];
  visibleResourceStemPositions: readonly PillarSlot[];
  sameElementBranchPositions: readonly PillarSlot[];
  additionalSameElementBranchSupportPositions: readonly PillarSlot[];
  resourceBranchPositions: readonly PillarSlot[];
  supportEffect: 'not_resolved';
  relativeForceVerdict: 'not_determined';
  numericWeight: 'not_assigned';
}

export interface ChallengeTargetClashRescueTopologyCandidate {
  rescueRelationId: string;
  rescueKind: 'SIX_COMBINATION_RESCUE_CANDIDATE' | 'THREE_COMBINATION_RESCUE_CANDIDATE';
  sharedClashParticipantPositions: readonly PillarSlot[];
  rescueStrength: 'not_evaluated';
  rescueEffect: 'not_resolved';
  clashSettlement: 'not_determined';
}

export interface ChallengeTargetClashDependencyEvidenceCandidate {
  mechanism: ChallengeMechanism;
  targetElement: FiveElement;
  targetRootCandidatePosition: PillarSlot;
  targetRootCandidateBranch: EarthlyBranch;
  targetRootCandidateClass: ChallengeTargetRootCandidateClass;
  clashRelationId: string;
  participants: readonly [
    ChallengeTargetClashParticipantDependencyEvidence,
    ChallengeTargetClashParticipantDependencyEvidence,
  ];
  seasonalAdvantageCandidate: ChallengeClashSeasonalAdvantageCandidate;
  rescueTopologyCandidates: readonly ChallengeTargetClashRescueTopologyCandidate[];
  earthTargetRootEffectResolutionAuthorized: false;
  relativeBranchForceVerdict: 'not_determined';
  supportEffectVerdict: 'not_resolved';
  clashWinnerVerdict: 'not_determined';
  rescueEffectVerdict: 'not_resolved';
  clashSettlementVerdict: 'not_determined';
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  numericScore: 'not_assigned';
}

export interface ChallengeTargetClashDependencyEvidenceReport {
  reportId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_DEPENDENCY_EVIDENCE'
    | 'PILLARS_UNRESOLVED'
    | 'ROOT_EVIDENCE_UNRESOLVED'
    | 'ROOT_EVIDENCE_MISALIGNED'
    | 'RELATION_EVIDENCE_UNRESOLVED'
    | 'RELATION_EVIDENCE_MISALIGNED';
  upstreamI29ReportId?: string;
  upstreamI31ReportId?: string;
  monthBranch?: EarthlyBranch;
  commandElement?: FiveElement;
  candidates: readonly ChallengeTargetClashDependencyEvidenceCandidate[];
  lowerLevelI20ReportContractReused: false;
  lowerLevelI20bReportContractReused: false;
  lowerLevelI20cReportContractReused: false;
  lowerLevelI20dReportContractReused: false;
  hiddenOnlyTargetClashRootEffectAuthorized: false;
  earthTargetRootEffectResolutionAuthorized: false;
  relativeBranchForceVerdict: 'not_determined';
  clashWinnerVerdict: 'not_determined';
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

function resourceElement(element: FiveElement): FiveElement {
  const match = Object.entries(GENERATES).find(([, generated]) => generated === element)?.[0] as
    | FiveElement
    | undefined;
  if (match === undefined) throw new Error(`No generating element found for ${element}`);
  return match;
}

function visibleStemPositions(
  pillars: StructuralPillarInput,
  targetElement: FiveElement,
): readonly PillarSlot[] {
  return PILLAR_SLOTS.filter((slot) => pillars[slot]?.stem.element === targetElement);
}

function branchPositions(
  pillars: StructuralPillarInput,
  targetElement: FiveElement,
): readonly PillarSlot[] {
  return PILLAR_SLOTS.filter((slot) => pillars[slot]?.branch.element === targetElement);
}

function participantEvidence(
  role: ChallengeClashParticipantRole,
  position: PillarSlot,
  pillars: StructuralPillarInput,
  commandElement: FiveElement,
): ChallengeTargetClashParticipantDependencyEvidence {
  const pillar = pillars[position];
  if (pillar === undefined) throw new Error(`Resolved pillar required for ${position}`);
  const branchElement = pillar.branch.element;
  const resource = resourceElement(branchElement);
  const sameElementBranches = branchPositions(pillars, branchElement);

  return {
    role,
    position,
    branch: pillar.branch.value,
    branchElement,
    seasonalPhase: seasonalElementPhase(commandElement, branchElement),
    visibleSameElementStemPositions: visibleStemPositions(pillars, branchElement),
    visibleResourceStemPositions: visibleStemPositions(pillars, resource),
    sameElementBranchPositions: sameElementBranches,
    additionalSameElementBranchSupportPositions: sameElementBranches.filter((slot) => slot !== position),
    resourceBranchPositions: branchPositions(pillars, resource),
    supportEffect: 'not_resolved',
    relativeForceVerdict: 'not_determined',
    numericWeight: 'not_assigned',
  };
}

function branchParticipantPositions(candidate: StructuralRelationCandidate): readonly PillarSlot[] {
  return candidate.participants.flatMap((participant) =>
    participant.component === 'branch' ? [participant.pillar] : [],
  );
}

function seasonalAdvantage(
  target: ChallengeTargetClashParticipantDependencyEvidence,
  counterpart: ChallengeTargetClashParticipantDependencyEvidence,
): ChallengeClashSeasonalAdvantageCandidate {
  const targetOrder = PHASE_ORDER[target.seasonalPhase];
  const counterpartOrder = PHASE_ORDER[counterpart.seasonalPhase];
  if (targetOrder === counterpartOrder) return 'TIED_SEASONAL_PHASE';
  return targetOrder > counterpartOrder ? 'TARGET_ROOT_CANDIDATE' : 'CLASH_COUNTERPART';
}

function rescueTopology(
  clash: StructuralRelationCandidate,
  relations: readonly StructuralRelationCandidate[],
): readonly ChallengeTargetClashRescueTopologyCandidate[] {
  const clashPositions = new Set(branchParticipantPositions(clash));
  return relations.flatMap((candidate) => {
    const rescueKind = candidate.kind === 'branch_six_combination'
      ? 'SIX_COMBINATION_RESCUE_CANDIDATE' as const
      : candidate.kind === 'branch_three_combination'
        ? 'THREE_COMBINATION_RESCUE_CANDIDATE' as const
        : undefined;
    if (rescueKind === undefined) return [];
    const shared = branchParticipantPositions(candidate)
      .filter((position) => clashPositions.has(position))
      .sort();
    if (shared.length === 0) return [];
    return [{
      rescueRelationId: candidate.relationId,
      rescueKind,
      sharedClashParticipantPositions: shared,
      rescueStrength: 'not_evaluated' as const,
      rescueEffect: 'not_resolved' as const,
      clashSettlement: 'not_determined' as const,
    }];
  }).sort((left, right) => left.rescueRelationId.localeCompare(right.rescueRelationId));
}

function finalized(
  material: Omit<ChallengeTargetClashDependencyEvidenceReport, 'reportId'>,
): ChallengeTargetClashDependencyEvidenceReport {
  return {
    reportId: `challenge_target_clash_dependency_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function unresolvedReport(
  status: Exclude<ChallengeTargetClashDependencyEvidenceReport['status'], 'RESOLVED_DEPENDENCY_EVIDENCE'>,
  rootEvidence?: ChallengeTargetIntrinsicRootEvidenceReport,
  relationEvidence?: ChallengeTargetRelationParticipationEvidenceReport,
  notes: readonly string[] = [],
): ChallengeTargetClashDependencyEvidenceReport {
  return finalized({
    evidenceVersion: I33_CHALLENGE_TARGET_CLASH_DEPENDENCY_EVIDENCE_VERSION,
    status,
    ...(rootEvidence === undefined ? {} : { upstreamI29ReportId: rootEvidence.reportId }),
    ...(relationEvidence === undefined ? {} : { upstreamI31ReportId: relationEvidence.reportId }),
    candidates: [],
    lowerLevelI20ReportContractReused: false,
    lowerLevelI20bReportContractReused: false,
    lowerLevelI20cReportContractReused: false,
    lowerLevelI20dReportContractReused: false,
    hiddenOnlyTargetClashRootEffectAuthorized: false,
    earthTargetRootEffectResolutionAuthorized: false,
    relativeBranchForceVerdict: 'not_determined',
    clashWinnerVerdict: 'not_determined',
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes,
  });
}

export function buildResolvedI33ChallengeTargetClashDependencyEvidence(
  pillars: StructuralPillarInput,
  rootEvidence: ChallengeTargetIntrinsicRootEvidenceReport,
  relationEvidence: ChallengeTargetRelationParticipationEvidenceReport,
): ChallengeTargetClashDependencyEvidenceReport {
  if (PILLAR_SLOTS.some((slot) => pillars[slot] === undefined)) {
    return unresolvedReport('PILLARS_UNRESOLVED', rootEvidence, relationEvidence, [
      'All four resolved pillars are required before challenge-target clash dependency evidence is materialized.',
    ]);
  }
  if (rootEvidence.status !== 'RESOLVED_EVIDENCE') {
    return unresolvedReport('ROOT_EVIDENCE_UNRESOLVED', rootEvidence, relationEvidence, [
      'Resolved I29 intrinsic root evidence is required before I33 clash dependency materialization.',
    ]);
  }

  const expectedRootEvidence = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(
    pillars,
    rootEvidence.snapshotId,
  );
  if (expectedRootEvidence.reportId !== rootEvidence.reportId) {
    return unresolvedReport('ROOT_EVIDENCE_MISALIGNED', rootEvidence, relationEvidence, [
      'The supplied I29 report does not match the same resolved pillar material used by I33.',
    ]);
  }
  if (relationEvidence.status !== 'RESOLVED_ROUTING_EVIDENCE') {
    return unresolvedReport('RELATION_EVIDENCE_UNRESOLVED', rootEvidence, relationEvidence, [
      'Resolved I31 relation participation evidence is required before I33 clash dependency materialization.',
    ]);
  }

  const expectedRelationEvidence = buildResolvedI31ChallengeTargetRelationParticipationEvidence(
    pillars,
    rootEvidence,
  );
  if (
    relationEvidence.upstreamI29ReportId !== rootEvidence.reportId ||
    expectedRelationEvidence.reportId !== relationEvidence.reportId
  ) {
    return unresolvedReport('RELATION_EVIDENCE_MISALIGNED', rootEvidence, relationEvidence, [
      'The supplied I31 report is not aligned to the same I29 report and resolved pillar material used by I33.',
    ]);
  }

  const month = pillars.month;
  if (month === undefined) {
    return unresolvedReport('PILLARS_UNRESOLVED', rootEvidence, relationEvidence, [
      'A resolved month pillar is required for challenge-target clash seasonal dependency evidence.',
    ]);
  }

  const commandElement = month.branch.element;
  const relations = deriveStructuralRelationCandidates(pillars);
  const relationById = new Map(relations.map((candidate) => [candidate.relationId, candidate] as const));
  const candidates: ChallengeTargetClashDependencyEvidenceCandidate[] = [];

  for (const mechanism of relationEvidence.mechanisms) {
    for (const rootCandidate of mechanism.rootCandidateRelations) {
      if (!rootCandidate.reviewRequirements.includes('BRANCH_CLASH_EFFECT_REVIEW_REQUIRED')) continue;
      for (const relationId of rootCandidate.touchingRelationIds) {
        const clash = relationById.get(relationId);
        if (clash?.kind !== 'branch_clash') continue;
        const clashPositions = branchParticipantPositions(clash);
        const counterpartPosition = clashPositions.find(
          (position) => position !== rootCandidate.branchPosition,
        );
        if (counterpartPosition === undefined) continue;

        const targetParticipant = participantEvidence(
          'TARGET_ROOT_CANDIDATE',
          rootCandidate.branchPosition,
          pillars,
          commandElement,
        );
        const counterpartParticipant = participantEvidence(
          'CLASH_COUNTERPART',
          counterpartPosition,
          pillars,
          commandElement,
        );

        candidates.push({
          mechanism: mechanism.mechanism,
          targetElement: mechanism.targetElement,
          targetRootCandidatePosition: rootCandidate.branchPosition,
          targetRootCandidateBranch: rootCandidate.branch,
          targetRootCandidateClass: rootCandidate.candidateClass,
          clashRelationId: clash.relationId,
          participants: [targetParticipant, counterpartParticipant],
          seasonalAdvantageCandidate: seasonalAdvantage(targetParticipant, counterpartParticipant),
          rescueTopologyCandidates: rescueTopology(clash, relations),
          earthTargetRootEffectResolutionAuthorized: false,
          relativeBranchForceVerdict: 'not_determined',
          supportEffectVerdict: 'not_resolved',
          clashWinnerVerdict: 'not_determined',
          rescueEffectVerdict: 'not_resolved',
          clashSettlementVerdict: 'not_determined',
          targetPostRelationRootState: 'not_determined',
          effectiveMechanismForceVerdict: 'not_determined',
          relationSpecificUsefulnessHarmfulness: 'not_determined',
          numericScore: 'not_assigned',
        });
      }
    }
  }

  candidates.sort((left, right) =>
    `${left.mechanism}|${left.targetRootCandidatePosition}|${left.clashRelationId}`.localeCompare(
      `${right.mechanism}|${right.targetRootCandidatePosition}|${right.clashRelationId}`,
    ),
  );

  return finalized({
    evidenceVersion: I33_CHALLENGE_TARGET_CLASH_DEPENDENCY_EVIDENCE_VERSION,
    status: 'RESOLVED_DEPENDENCY_EVIDENCE',
    upstreamI29ReportId: rootEvidence.reportId,
    upstreamI31ReportId: relationEvidence.reportId,
    monthBranch: month.branch.value,
    commandElement,
    candidates,
    lowerLevelI20ReportContractReused: false,
    lowerLevelI20bReportContractReused: false,
    lowerLevelI20cReportContractReused: false,
    lowerLevelI20dReportContractReused: false,
    hiddenOnlyTargetClashRootEffectAuthorized: false,
    earthTargetRootEffectResolutionAuthorized: false,
    relativeBranchForceVerdict: 'not_determined',
    clashWinnerVerdict: 'not_determined',
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes: [
      'I33 materializes only branch-clash dependencies already routed to an aligned I31 challenge root candidate.',
      'Seasonal phase, positional same-element/resource support, seasonal advantage, and rescue topology remain named candidate evidence rather than verdicts.',
      'Seasonal advantage is not a complete relative-force verdict or clash winner; support locations are not summed or weighted.',
      'Six-/three-combination rescue topology does not establish rescue strength, rescue effect, or clash settlement.',
      'Hidden-only targets cannot acquire a manufactured root effect, and earth target root-effect resolution remains blocked by the unresolved earth convention.',
      'No target post-relation root state, effective mechanism force, usefulness/harmfulness, numeric score, or strong/weak classification is emitted.',
    ],
  });
}
