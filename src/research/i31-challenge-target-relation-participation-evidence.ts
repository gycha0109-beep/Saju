import {
  deriveStructuralRelationCandidates,
  type PillarSlot,
  type StructuralPillarInput,
  type StructuralRelationCandidate,
  type StructuralRelationKind,
} from '../calculation/structural-relations.js';
import type {
  CanonicalSajuSnapshot,
  EarthlyBranch,
  FiveElement,
  HeavenlyStem,
} from '../contracts/calculation.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeMechanism } from './i24-challenge-mechanism-composition.js';
import {
  buildI29ChallengeTargetIntrinsicRootEvidence,
  buildResolvedI29ChallengeTargetIntrinsicRootEvidence,
  type ChallengeTargetIntrinsicRootEvidenceItem,
  type ChallengeTargetIntrinsicRootEvidenceReport,
  type ChallengeTargetRootCandidateClass,
} from './i29-challenge-target-intrinsic-root-evidence.js';
import type { ChallengeTargetPostRelationDependency } from './i30-challenge-target-post-relation-root-state-methodology-review.js';

export const I31_CHALLENGE_TARGET_RELATION_PARTICIPATION_EVIDENCE_VERSION =
  'myeonghwa-challenge-target-relation-participation-evidence-v1';

const PILLAR_SLOTS = ['year', 'month', 'day', 'hour'] as const satisfies readonly PillarSlot[];

export type ChallengeTargetRelationReviewRequirement =
  | 'STEM_FIVE_COMBINATION_EFFECT_REVIEW_REQUIRED'
  | 'BRANCH_CLASH_EFFECT_REVIEW_REQUIRED'
  | 'BRANCH_SIX_COMBINATION_EFFECT_REVIEW_REQUIRED'
  | 'BRANCH_THREE_COMBINATION_EFFECT_REVIEW_REQUIRED';

export interface ChallengeTargetStemRelationParticipation {
  targetStemPosition: PillarSlot;
  targetStem: HeavenlyStem;
  relationId: string;
  relationKind: 'stem_five_combination';
  reviewRequirement: 'STEM_FIVE_COMBINATION_EFFECT_REVIEW_REQUIRED';
  dependencies: readonly ChallengeTargetPostRelationDependency[];
  transformationEstablished: false;
  relationEffect: 'not_determined';
}

export interface ChallengeTargetRootCandidateRelationParticipation {
  branchPosition: PillarSlot;
  branch: EarthlyBranch;
  candidateClass: ChallengeTargetRootCandidateClass;
  touchingRelationIds: readonly string[];
  reviewRequirements: readonly ChallengeTargetRelationReviewRequirement[];
  dependencies: readonly ChallengeTargetPostRelationDependency[];
  relationRoutingState: 'NO_TRACKED_RELATION_CANDIDATE' | 'TRACKED_RELATION_REVIEW_REQUIRED';
  postRelationRootState: 'not_determined';
  numericWeight: 'not_assigned';
}

export type ChallengeTargetRelationRoutingState =
  | 'NO_VISIBLE_TARGET_STEM_ANCHOR'
  | 'VISIBLE_TARGET_STEM_NO_INTRINSIC_ROOT_CANDIDATE'
  | 'EARTH_ROOT_CONVENTION_UNRESOLVED'
  | 'TRACKED_RELATION_REVIEW_REQUIRED'
  | 'NO_TRACKED_RELATION_CANDIDATE';

export interface ChallengeTargetRelationParticipationEvidenceItem {
  mechanism: ChallengeMechanism;
  targetElement: FiveElement;
  upstreamAnchorState: ChallengeTargetIntrinsicRootEvidenceItem['anchorState'];
  upstreamIntrinsicEvidenceState: ChallengeTargetIntrinsicRootEvidenceItem['evidenceState'];
  visibleTargetStemRelations: readonly ChallengeTargetStemRelationParticipation[];
  rootCandidateRelations: readonly ChallengeTargetRootCandidateRelationParticipation[];
  routingState: ChallengeTargetRelationRoutingState;
  hiddenOnlyTargetPostRelationRootStateAuthorized: false;
  targetIntrinsicRootQualityVerdict: 'not_determined';
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForce: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  numericMagnitude: 'not_assigned';
}

export interface ChallengeTargetRelationParticipationEvidenceReport {
  reportId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_ROUTING_EVIDENCE'
    | 'SCENARIO_MATERIALIZATION_REQUIRED'
    | 'PILLARS_UNRESOLVED'
    | 'ROOT_EVIDENCE_UNRESOLVED'
    | 'ROOT_EVIDENCE_MISALIGNED';
  snapshotId?: string;
  upstreamI29ReportId?: string;
  relationCandidateIds: readonly string[];
  mechanisms: readonly ChallengeTargetRelationParticipationEvidenceItem[];
  relationParticipationSubstrate: 'tracked_structural_relations_only';
  currentStructuralRouterScope: readonly [
    'stem_five_combination',
    'branch_six_combination',
    'branch_clash',
    'branch_three_combination',
  ];
  untrackedRelationFamiliesExplicitlyUnresolved: true;
  targetPostRelationRootStateVerdict: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

function stemDependencies(): readonly ChallengeTargetPostRelationDependency[] {
  return [
    'COMBINATION_TRANSFORMATION_CONDITIONS',
    'TARGET_STEM_COMPETING_SUPPORT_INTERFERENCE',
    'SEASONAL_COMMAND_CONTEXT',
  ];
}

function branchRequirement(
  kind: StructuralRelationKind,
): ChallengeTargetRelationReviewRequirement | undefined {
  if (kind === 'branch_clash') return 'BRANCH_CLASH_EFFECT_REVIEW_REQUIRED';
  if (kind === 'branch_six_combination') return 'BRANCH_SIX_COMBINATION_EFFECT_REVIEW_REQUIRED';
  if (kind === 'branch_three_combination') return 'BRANCH_THREE_COMBINATION_EFFECT_REVIEW_REQUIRED';
  return undefined;
}

function branchDependencies(
  requirement: ChallengeTargetRelationReviewRequirement,
): readonly ChallengeTargetPostRelationDependency[] {
  if (requirement === 'BRANCH_CLASH_EFFECT_REVIEW_REQUIRED') {
    return ['RELATIVE_BRANCH_FORCE', 'SEASONAL_COMMAND_CONTEXT', 'EXTERNAL_SUPPORT_RESCUE'];
  }
  if (
    requirement === 'BRANCH_SIX_COMBINATION_EFFECT_REVIEW_REQUIRED' ||
    requirement === 'BRANCH_THREE_COMBINATION_EFFECT_REVIEW_REQUIRED'
  ) {
    return [
      'COMBINATION_TRANSFORMATION_CONDITIONS',
      'COMPETING_RELATION_PRECEDENCE',
      'SEASONAL_COMMAND_CONTEXT',
    ];
  }
  return [];
}

function touchesStemPosition(candidate: StructuralRelationCandidate, slot: PillarSlot): boolean {
  return candidate.kind === 'stem_five_combination' && candidate.participants.some(
    (participant) => participant.component === 'stem' && participant.pillar === slot,
  );
}

function touchesBranchPosition(candidate: StructuralRelationCandidate, slot: PillarSlot): boolean {
  return candidate.participants.some(
    (participant) => participant.component === 'branch' && participant.pillar === slot,
  );
}

function visibleStemRelations(
  item: ChallengeTargetIntrinsicRootEvidenceItem,
  pillars: StructuralPillarInput,
  relationCandidates: readonly StructuralRelationCandidate[],
): readonly ChallengeTargetStemRelationParticipation[] {
  return item.visibleTargetStemPositions.flatMap((position) => {
    const targetStem = pillars[position]?.stem.value;
    if (targetStem === undefined) return [];
    return relationCandidates
      .filter((candidate) => touchesStemPosition(candidate, position))
      .map((candidate) => ({
        targetStemPosition: position,
        targetStem,
        relationId: candidate.relationId,
        relationKind: 'stem_five_combination' as const,
        reviewRequirement: 'STEM_FIVE_COMBINATION_EFFECT_REVIEW_REQUIRED' as const,
        dependencies: stemDependencies(),
        transformationEstablished: false as const,
        relationEffect: 'not_determined' as const,
      }));
  }).sort((left, right) => left.relationId.localeCompare(right.relationId));
}

function rootCandidateRelations(
  item: ChallengeTargetIntrinsicRootEvidenceItem,
  relationCandidates: readonly StructuralRelationCandidate[],
): readonly ChallengeTargetRootCandidateRelationParticipation[] {
  return item.rootCandidates.map((rootCandidate) => {
    const touching = relationCandidates.filter((candidate) =>
      touchesBranchPosition(candidate, rootCandidate.branchPosition),
    );
    const requirements = [...new Set(touching.flatMap((candidate) => {
      const requirement = branchRequirement(candidate.kind);
      return requirement === undefined ? [] : [requirement];
    }))].sort() as ChallengeTargetRelationReviewRequirement[];
    const relevantTouching = touching.filter((candidate) => branchRequirement(candidate.kind) !== undefined);
    const dependencies = [...new Set(requirements.flatMap((requirement) => branchDependencies(requirement)))].sort() as ChallengeTargetPostRelationDependency[];

    return {
      branchPosition: rootCandidate.branchPosition,
      branch: rootCandidate.branch,
      candidateClass: rootCandidate.candidateClass,
      touchingRelationIds: relevantTouching.map((candidate) => candidate.relationId).sort(),
      reviewRequirements: requirements,
      dependencies,
      relationRoutingState:
        requirements.length === 0
          ? 'NO_TRACKED_RELATION_CANDIDATE' as const
          : 'TRACKED_RELATION_REVIEW_REQUIRED' as const,
      postRelationRootState: 'not_determined' as const,
      numericWeight: 'not_assigned' as const,
    };
  });
}

function routingState(
  item: ChallengeTargetIntrinsicRootEvidenceItem,
  stemRelations: readonly ChallengeTargetStemRelationParticipation[],
  rootRelations: readonly ChallengeTargetRootCandidateRelationParticipation[],
): ChallengeTargetRelationRoutingState {
  if (item.anchorState === 'NO_VISIBLE_TARGET_STEM_ANCHOR') {
    return 'NO_VISIBLE_TARGET_STEM_ANCHOR';
  }
  if (item.evidenceState === 'EARTH_ROOT_CLASS_UNRESOLVED') {
    return 'EARTH_ROOT_CONVENTION_UNRESOLVED';
  }
  if (item.evidenceState === 'VISIBLE_TARGET_STEM_NO_ROOT_CANDIDATE') {
    return stemRelations.length > 0
      ? 'TRACKED_RELATION_REVIEW_REQUIRED'
      : 'VISIBLE_TARGET_STEM_NO_INTRINSIC_ROOT_CANDIDATE';
  }
  if (
    stemRelations.length > 0 ||
    rootRelations.some((candidate) => candidate.relationRoutingState === 'TRACKED_RELATION_REVIEW_REQUIRED')
  ) {
    return 'TRACKED_RELATION_REVIEW_REQUIRED';
  }
  return 'NO_TRACKED_RELATION_CANDIDATE';
}

function mechanismEvidence(
  item: ChallengeTargetIntrinsicRootEvidenceItem,
  pillars: StructuralPillarInput,
  relationCandidates: readonly StructuralRelationCandidate[],
): ChallengeTargetRelationParticipationEvidenceItem {
  const stemRelations = visibleStemRelations(item, pillars, relationCandidates);
  const rootRelations = rootCandidateRelations(item, relationCandidates);
  return {
    mechanism: item.mechanism,
    targetElement: item.targetElement,
    upstreamAnchorState: item.anchorState,
    upstreamIntrinsicEvidenceState: item.evidenceState,
    visibleTargetStemRelations: stemRelations,
    rootCandidateRelations: rootRelations,
    routingState: routingState(item, stemRelations, rootRelations),
    hiddenOnlyTargetPostRelationRootStateAuthorized: false,
    targetIntrinsicRootQualityVerdict: 'not_determined',
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForce: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    numericMagnitude: 'not_assigned',
  };
}

function finalized(
  material: Omit<ChallengeTargetRelationParticipationEvidenceReport, 'reportId'>,
): ChallengeTargetRelationParticipationEvidenceReport {
  return {
    reportId: `challenge_target_relation_participation_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function unresolvedReport(
  status: Exclude<ChallengeTargetRelationParticipationEvidenceReport['status'], 'RESOLVED_ROUTING_EVIDENCE'>,
  snapshotId?: string,
  upstreamI29ReportId?: string,
  notes: readonly string[] = [],
): ChallengeTargetRelationParticipationEvidenceReport {
  return finalized({
    evidenceVersion: I31_CHALLENGE_TARGET_RELATION_PARTICIPATION_EVIDENCE_VERSION,
    status,
    ...(snapshotId === undefined ? {} : { snapshotId }),
    ...(upstreamI29ReportId === undefined ? {} : { upstreamI29ReportId }),
    relationCandidateIds: [],
    mechanisms: [],
    relationParticipationSubstrate: 'tracked_structural_relations_only',
    currentStructuralRouterScope: [
      'stem_five_combination',
      'branch_six_combination',
      'branch_clash',
      'branch_three_combination',
    ],
    untrackedRelationFamiliesExplicitlyUnresolved: true,
    targetPostRelationRootStateVerdict: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes,
  });
}

export function buildResolvedI31ChallengeTargetRelationParticipationEvidence(
  pillars: StructuralPillarInput,
  rootEvidence: ChallengeTargetIntrinsicRootEvidenceReport,
): ChallengeTargetRelationParticipationEvidenceReport {
  if (PILLAR_SLOTS.some((slot) => pillars[slot] === undefined)) {
    return unresolvedReport('PILLARS_UNRESOLVED', rootEvidence.snapshotId, rootEvidence.reportId, [
      'All four resolved pillars are required before challenge-target relation participation is routed.',
    ]);
  }
  if (rootEvidence.status !== 'RESOLVED_EVIDENCE') {
    return unresolvedReport('ROOT_EVIDENCE_UNRESOLVED', rootEvidence.snapshotId, rootEvidence.reportId, [
      'A resolved I29 intrinsic root evidence report is required before post-relation participation routing.',
    ]);
  }

  const expectedRootEvidence = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(
    pillars,
    rootEvidence.snapshotId,
  );
  if (expectedRootEvidence.reportId !== rootEvidence.reportId) {
    return unresolvedReport('ROOT_EVIDENCE_MISALIGNED', rootEvidence.snapshotId, rootEvidence.reportId, [
      'The supplied I29 report does not match the same resolved pillar material used for I31 relation derivation.',
    ]);
  }

  const relationCandidates = deriveStructuralRelationCandidates(pillars);
  const mechanisms = rootEvidence.mechanisms.map((item) =>
    mechanismEvidence(item, pillars, relationCandidates),
  );
  return finalized({
    evidenceVersion: I31_CHALLENGE_TARGET_RELATION_PARTICIPATION_EVIDENCE_VERSION,
    status: 'RESOLVED_ROUTING_EVIDENCE',
    ...(rootEvidence.snapshotId === undefined ? {} : { snapshotId: rootEvidence.snapshotId }),
    upstreamI29ReportId: rootEvidence.reportId,
    relationCandidateIds: relationCandidates.map((candidate) => candidate.relationId).sort(),
    mechanisms,
    relationParticipationSubstrate: 'tracked_structural_relations_only',
    currentStructuralRouterScope: [
      'stem_five_combination',
      'branch_six_combination',
      'branch_clash',
      'branch_three_combination',
    ],
    untrackedRelationFamiliesExplicitlyUnresolved: true,
    targetPostRelationRootStateVerdict: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes: [
      'Visible target-stem five-combination participation and root-candidate branch relation participation are preserved as separate channels.',
      'Tracked relation presence never establishes transformation, root destruction, preservation, or effective force.',
      'A root candidate with no tracked touching relation remains NO_TRACKED_RELATION_CANDIDATE, which is not a preserved-root verdict.',
      'Targets with no visible stem anchor do not receive a post-relation root state, and earth targets remain blocked by the unresolved earth convention.',
      'Punishment, harm, and break relations remain explicitly outside the current structural router scope.',
    ],
  });
}

export function buildI31ChallengeTargetRelationParticipationEvidence(
  snapshot: CanonicalSajuSnapshot,
): ChallengeTargetRelationParticipationEvidenceReport {
  if (snapshot.scenarios.length > 0) {
    return unresolvedReport('SCENARIO_MATERIALIZATION_REQUIRED', snapshot.snapshotId, undefined, [
      'Each calculation scenario must be materialized before challenge-target relation participation is routed.',
    ]);
  }

  const pillars: StructuralPillarInput = {};
  for (const slot of PILLAR_SLOTS) {
    const state = snapshot.pillars[slot];
    if (state.status !== 'resolved') {
      return unresolvedReport('PILLARS_UNRESOLVED', snapshot.snapshotId, undefined, [
        `Resolved ${slot} pillar is required before challenge-target relation participation is routed.`,
      ]);
    }
    pillars[slot] = state.value;
  }

  const rootEvidence = buildI29ChallengeTargetIntrinsicRootEvidence(snapshot);
  return buildResolvedI31ChallengeTargetRelationParticipationEvidence(pillars, rootEvidence);
}
