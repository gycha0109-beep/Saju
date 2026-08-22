import type {
  CanonicalSajuSnapshot,
  EarthlyBranch,
  FiveElement,
  HeavenlyStem,
} from '../contracts/calculation.js';
import {
  deriveStructuralRelationCandidates,
  type PillarSlot,
  type StructuralPillarInput,
  type StructuralRelationCandidate,
  type StructuralRelationKind,
} from '../calculation/structural-relations.js';
import { HIDDEN_STEM_MEMBERSHIP } from '../calculation/hidden-stems.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';

export const I18D_ROOT_RELATION_REVIEW_VERSION = 'myeonghwa-root-relation-review-v1';

const PILLAR_SLOTS = ['year', 'month', 'day', 'hour'] as const satisfies readonly PillarSlot[];

const STEMS_BY_ELEMENT: Readonly<Record<FiveElement, readonly HeavenlyStem[]>> = Object.freeze({
  목: ['갑', '을'],
  화: ['병', '정'],
  토: ['무', '기'],
  금: ['경', '신'],
  수: ['임', '계'],
});

export type RootRelationReviewRequirement =
  | 'CLASH_EFFECT_REVIEW_REQUIRED'
  | 'SIX_COMBINATION_EFFECT_REVIEW_REQUIRED'
  | 'THREE_COMBINATION_EFFECT_REVIEW_REQUIRED';

export type RootRelationReviewStatus =
  | 'RESOLVED_BASIS_ROUTED'
  | 'SCENARIO_REVIEW_REQUIRED'
  | 'DAY_MASTER_UNRESOLVED'
  | 'PILLARS_UNRESOLVED';

export interface RootPositionRelationReview {
  position: PillarSlot;
  branch: EarthlyBranch;
  dayMasterElement: FiveElement;
  sameElementRootMembership: true;
  touchingRelationIds: readonly string[];
  reviewRequirements: readonly RootRelationReviewRequirement[];
  relationEffect: 'unresolved' | 'no_tracked_relation_candidate';
  effectiveRootState: 'not_determined';
  numericWeight: 'not_assigned';
}

export interface RootRelationEffectReviewReport {
  reviewId: string;
  reviewVersion: string;
  status: RootRelationReviewStatus;
  snapshotId?: string;
  dayMasterElement?: FiveElement;
  rootPositions: readonly RootPositionRelationReview[];
  relationCandidates: readonly StructuralRelationCandidate[];
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  terminalDecision: 'RELATION_EFFECT_NOT_RESOLVED';
  notes: readonly string[];
}

function branchContainsElement(branch: EarthlyBranch, element: FiveElement): boolean {
  const stems = STEMS_BY_ELEMENT[element];
  return HIDDEN_STEM_MEMBERSHIP[branch].some((stem) => stems.includes(stem));
}

function requirementFor(kind: StructuralRelationKind): RootRelationReviewRequirement | undefined {
  if (kind === 'branch_clash') return 'CLASH_EFFECT_REVIEW_REQUIRED';
  if (kind === 'branch_six_combination') return 'SIX_COMBINATION_EFFECT_REVIEW_REQUIRED';
  if (kind === 'branch_three_combination') return 'THREE_COMBINATION_EFFECT_REVIEW_REQUIRED';
  return undefined;
}

function touchesBranchPosition(candidate: StructuralRelationCandidate, slot: PillarSlot): boolean {
  return candidate.participants.some(
    (participant) => participant.component === 'branch' && participant.pillar === slot,
  );
}

function reportId(material: Omit<RootRelationEffectReviewReport, 'reviewId'>): string {
  return `root_relation_review_${deterministicContentHash(material).slice(0, 24)}`;
}

function finalized(
  material: Omit<RootRelationEffectReviewReport, 'reviewId'>,
): RootRelationEffectReviewReport {
  return { reviewId: reportId(material), ...material };
}

export function reviewResolvedRootRelationEffects(
  dayMasterElement: FiveElement,
  pillars: StructuralPillarInput,
  snapshotId?: string,
): RootRelationEffectReviewReport {
  const relationCandidates = deriveStructuralRelationCandidates(pillars);
  const rootPositions: RootPositionRelationReview[] = [];

  for (const position of PILLAR_SLOTS) {
    const pillar = pillars[position];
    if (pillar === undefined || !branchContainsElement(pillar.branch.value, dayMasterElement)) continue;

    const touching = relationCandidates.filter((candidate) =>
      touchesBranchPosition(candidate, position),
    );
    const requirements = [...new Set(touching.flatMap((candidate) => {
      const requirement = requirementFor(candidate.kind);
      return requirement === undefined ? [] : [requirement];
    }))].sort();
    const relevantTouching = touching.filter((candidate) => requirementFor(candidate.kind) !== undefined);

    rootPositions.push({
      position,
      branch: pillar.branch.value,
      dayMasterElement,
      sameElementRootMembership: true,
      touchingRelationIds: relevantTouching.map((candidate) => candidate.relationId).sort(),
      reviewRequirements: requirements,
      relationEffect: requirements.length === 0 ? 'no_tracked_relation_candidate' : 'unresolved',
      effectiveRootState: 'not_determined',
      numericWeight: 'not_assigned',
    });
  }

  const material: Omit<RootRelationEffectReviewReport, 'reviewId'> = {
    reviewVersion: I18D_ROOT_RELATION_REVIEW_VERSION,
    status: 'RESOLVED_BASIS_ROUTED',
    ...(snapshotId === undefined ? {} : { snapshotId }),
    dayMasterElement,
    rootPositions,
    relationCandidates,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    terminalDecision: 'RELATION_EFFECT_NOT_RESOLVED',
    notes: [
      'Structural relation presence is not treated as proof of root damage, preservation, or transformation.',
      'A relation touching a rooted branch is routed to methodology review; the effective root state remains undetermined.',
      'Stem five-combination candidates do not directly satisfy this branch-root routing contract.',
    ],
  };
  return finalized(material);
}

export function buildI18DRootRelationReview(
  snapshot: CanonicalSajuSnapshot,
): RootRelationEffectReviewReport {
  const base = {
    reviewVersion: I18D_ROOT_RELATION_REVIEW_VERSION,
    snapshotId: snapshot.snapshotId,
    rootPositions: [] as readonly RootPositionRelationReview[],
    relationCandidates: [] as readonly StructuralRelationCandidate[],
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    terminalDecision: 'RELATION_EFFECT_NOT_RESOLVED' as const,
  };

  if (snapshot.scenarios.length > 0) {
    return finalized({
      ...base,
      status: 'SCENARIO_REVIEW_REQUIRED',
      notes: [
        'Scenario materialization for relation-effect review is intentionally not inferred from the base snapshot.',
        'Each calculation scenario must be reviewed independently before relation-effect routing can be used.',
      ],
    });
  }

  if (snapshot.derivedFacts.dayMaster.status !== 'resolved') {
    return finalized({
      ...base,
      status: 'DAY_MASTER_UNRESOLVED',
      notes: ['A resolved day master is required before same-element root relation review.'],
    });
  }

  const pillars: StructuralPillarInput = {};
  for (const slot of PILLAR_SLOTS) {
    const state = snapshot.pillars[slot];
    if (state.status !== 'resolved') {
      return finalized({
        ...base,
        dayMasterElement: snapshot.derivedFacts.dayMaster.value.element,
        status: 'PILLARS_UNRESOLVED',
        notes: [`Resolved ${slot} pillar is required before base-snapshot relation-effect review.`],
      });
    }
    pillars[slot] = state.value;
  }

  return reviewResolvedRootRelationEffects(
    snapshot.derivedFacts.dayMaster.value.element,
    pillars,
    snapshot.snapshotId,
  );
}
