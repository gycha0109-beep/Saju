import { HIDDEN_STEM_MEMBERSHIP } from '../calculation/hidden-stems.js';
import type { PillarSlot, StructuralPillarInput } from '../calculation/structural-relations.js';
import type {
  CanonicalSajuSnapshot,
  EarthlyBranch,
  FiveElement,
  HeavenlyStem,
} from '../contracts/calculation.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  buildResolvedI27ChallengeMechanismForceEvidence,
  type ChallengeMechanismForceEvidenceItem,
} from './i27-challenge-mechanism-force-evidence.js';
import type { ChallengeMechanism } from './i24-challenge-mechanism-composition.js';

export const I29_CHALLENGE_TARGET_INTRINSIC_ROOT_EVIDENCE_VERSION =
  'myeonghwa-challenge-target-intrinsic-root-evidence-v1';

const PILLAR_SLOTS = ['year', 'month', 'day', 'hour'] as const satisfies readonly PillarSlot[];
const STORAGE_BRANCH_SET: ReadonlySet<EarthlyBranch> = new Set(['진', '술', '축', '미']);
type NonEarthElement = Exclude<FiveElement, '토'>;

const STEMS_BY_ELEMENT: Readonly<Record<FiveElement, readonly HeavenlyStem[]>> = Object.freeze({
  목: ['갑', '을'],
  화: ['병', '정'],
  토: ['무', '기'],
  금: ['경', '신'],
  수: ['임', '계'],
});

const NON_EARTH_BIRTH_LU_WANG_BRANCH_LOCATORS: Readonly<
  Record<NonEarthElement, readonly EarthlyBranch[]>
> = Object.freeze({
  목: ['해', '인', '묘'],
  화: ['인', '사', '오'],
  금: ['사', '신', '유'],
  수: ['신', '해', '자'],
});

export type ChallengeTargetRootCandidateClass =
  | 'target_birth_lu_wang_root_candidate'
  | 'target_storage_residual_root_candidate'
  | 'target_earth_root_class_unresolved';

export type ChallengeTargetRootEvidenceState =
  | 'NO_VISIBLE_TARGET_STEM_ANCHOR'
  | 'NON_EARTH_ROOT_CANDIDATE_EVIDENCE'
  | 'VISIBLE_TARGET_STEM_NO_ROOT_CANDIDATE'
  | 'EARTH_ROOT_CLASS_UNRESOLVED';

export interface ChallengeTargetRootCandidate {
  branchPosition: PillarSlot;
  branch: EarthlyBranch;
  candidateClass: ChallengeTargetRootCandidateClass;
  structuralBasis: 'hidden_stem_membership_and_source_bounded_branch_locator';
  relationEffect: 'not_evaluated';
  effectiveState: 'not_determined';
  numericWeight: 'not_assigned';
}

export interface ChallengeTargetIntrinsicRootEvidenceItem {
  mechanism: ChallengeMechanism;
  targetElement: FiveElement;
  visibleTargetStemPositions: readonly PillarSlot[];
  anchorState: 'VISIBLE_TARGET_STEM_ANCHORED' | 'NO_VISIBLE_TARGET_STEM_ANCHOR';
  evidenceState: ChallengeTargetRootEvidenceState;
  rootCandidates: readonly ChallengeTargetRootCandidate[];
  hiddenOnlyTargetMembershipPromotedToRootQuality: false;
  intrinsicRootQualityVerdict: 'not_determined';
  postRelationForceState: 'not_determined';
  effectiveMechanismForce: 'not_determined';
  numericMagnitude: 'not_assigned';
}

export interface ChallengeTargetIntrinsicRootEvidenceReport {
  reportId: string;
  evidenceVersion: string;
  status: 'RESOLVED_EVIDENCE' | 'SCENARIO_MATERIALIZATION_REQUIRED' | 'PILLARS_UNRESOLVED';
  snapshotId?: string;
  upstreamI27ReportId?: string;
  mechanisms: readonly ChallengeTargetIntrinsicRootEvidenceItem[];
  targetIntrinsicRootEvidenceSubstrate: 'challenge_specific_candidate_evidence_only';
  directI18CClaimReuse: false;
  visibleTargetStemAnchorRequired: true;
  earthRootConventionResolved: false;
  targetIntrinsicRootQualityVerdict: 'not_determined';
  targetPostRelationForceState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  sourceBasis: readonly {
    sourceId: string;
    finding: string;
  }[];
  notes: readonly string[];
}

export const I29_CHALLENGE_TARGET_ROOT_SOURCE_BASIS = Object.freeze([
  {
    sourceId: 'SRC-METHOD-DITIANSUI-CHANWEI-WIKISOURCE',
    finding:
      'Rootedness language is used beyond the day master, but the explicit heavy-versus-light root comparison is day-master-context evidence; I29 therefore emits challenge-specific candidate evidence only when a target heavenly stem is visibly manifested.',
  },
  {
    sourceId: 'SRC-I18C-XIEJI-FIVE-ELEMENT-GROWTH',
    finding:
      'Non-earth five-element growth-stage branch locations may be reused as candidate locators, while the competing earth convention remains unresolved.',
  },
] as const);

function branchContainsElement(branch: EarthlyBranch, element: FiveElement): boolean {
  const targetStems = STEMS_BY_ELEMENT[element];
  return HIDDEN_STEM_MEMBERSHIP[branch].some((stem) => targetStems.includes(stem));
}

function classifyCandidateBranch(
  targetElement: FiveElement,
  branch: EarthlyBranch,
): ChallengeTargetRootCandidateClass | undefined {
  if (!branchContainsElement(branch, targetElement)) return undefined;
  if (targetElement === '토') return 'target_earth_root_class_unresolved';
  if (NON_EARTH_BIRTH_LU_WANG_BRANCH_LOCATORS[targetElement].includes(branch)) {
    return 'target_birth_lu_wang_root_candidate';
  }
  if (STORAGE_BRANCH_SET.has(branch)) return 'target_storage_residual_root_candidate';
  return undefined;
}

function rootCandidates(
  targetElement: FiveElement,
  pillars: StructuralPillarInput,
): readonly ChallengeTargetRootCandidate[] {
  return PILLAR_SLOTS.flatMap((slot) => {
    const branch = pillars[slot]?.branch.value;
    if (branch === undefined) return [];
    const candidateClass = classifyCandidateBranch(targetElement, branch);
    if (candidateClass === undefined) return [];
    return [
      {
        branchPosition: slot,
        branch,
        candidateClass,
        structuralBasis: 'hidden_stem_membership_and_source_bounded_branch_locator' as const,
        relationEffect: 'not_evaluated' as const,
        effectiveState: 'not_determined' as const,
        numericWeight: 'not_assigned' as const,
      },
    ];
  });
}

function mechanismRootEvidence(
  forceEvidence: ChallengeMechanismForceEvidenceItem,
  pillars: StructuralPillarInput,
): ChallengeTargetIntrinsicRootEvidenceItem {
  const visibleTargetStemPositions = [...forceEvidence.visibleStemPositions];
  if (visibleTargetStemPositions.length === 0) {
    return {
      mechanism: forceEvidence.mechanism,
      targetElement: forceEvidence.targetElement,
      visibleTargetStemPositions,
      anchorState: 'NO_VISIBLE_TARGET_STEM_ANCHOR',
      evidenceState: 'NO_VISIBLE_TARGET_STEM_ANCHOR',
      rootCandidates: [],
      hiddenOnlyTargetMembershipPromotedToRootQuality: false,
      intrinsicRootQualityVerdict: 'not_determined',
      postRelationForceState: 'not_determined',
      effectiveMechanismForce: 'not_determined',
      numericMagnitude: 'not_assigned',
    };
  }

  const candidates = rootCandidates(forceEvidence.targetElement, pillars);
  const evidenceState: ChallengeTargetRootEvidenceState =
    forceEvidence.targetElement === '토'
      ? 'EARTH_ROOT_CLASS_UNRESOLVED'
      : candidates.length > 0
        ? 'NON_EARTH_ROOT_CANDIDATE_EVIDENCE'
        : 'VISIBLE_TARGET_STEM_NO_ROOT_CANDIDATE';

  return {
    mechanism: forceEvidence.mechanism,
    targetElement: forceEvidence.targetElement,
    visibleTargetStemPositions,
    anchorState: 'VISIBLE_TARGET_STEM_ANCHORED',
    evidenceState,
    rootCandidates: candidates,
    hiddenOnlyTargetMembershipPromotedToRootQuality: false,
    intrinsicRootQualityVerdict: 'not_determined',
    postRelationForceState: 'not_determined',
    effectiveMechanismForce: 'not_determined',
    numericMagnitude: 'not_assigned',
  };
}

function finalized(
  material: Omit<ChallengeTargetIntrinsicRootEvidenceReport, 'reportId'>,
): ChallengeTargetIntrinsicRootEvidenceReport {
  return {
    reportId: `challenge_target_intrinsic_root_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function unresolvedReport(
  status: 'SCENARIO_MATERIALIZATION_REQUIRED' | 'PILLARS_UNRESOLVED',
  snapshotId?: string,
  notes: readonly string[] = [],
): ChallengeTargetIntrinsicRootEvidenceReport {
  return finalized({
    evidenceVersion: I29_CHALLENGE_TARGET_INTRINSIC_ROOT_EVIDENCE_VERSION,
    status,
    ...(snapshotId === undefined ? {} : { snapshotId }),
    mechanisms: [],
    targetIntrinsicRootEvidenceSubstrate: 'challenge_specific_candidate_evidence_only',
    directI18CClaimReuse: false,
    visibleTargetStemAnchorRequired: true,
    earthRootConventionResolved: false,
    targetIntrinsicRootQualityVerdict: 'not_determined',
    targetPostRelationForceState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    sourceBasis: I29_CHALLENGE_TARGET_ROOT_SOURCE_BASIS,
    notes,
  });
}

export function buildResolvedI29ChallengeTargetIntrinsicRootEvidence(
  pillars: StructuralPillarInput,
  snapshotId?: string,
): ChallengeTargetIntrinsicRootEvidenceReport {
  if (PILLAR_SLOTS.some((slot) => pillars[slot] === undefined)) {
    return unresolvedReport('PILLARS_UNRESOLVED', snapshotId, [
      'All four resolved pillars are required before challenge-target intrinsic root candidate evidence is derived.',
    ]);
  }

  const forceEvidence = buildResolvedI27ChallengeMechanismForceEvidence(pillars, snapshotId);
  if (forceEvidence.status !== 'RESOLVED_EVIDENCE') {
    return unresolvedReport('PILLARS_UNRESOLVED', snapshotId, [
      'Resolved I27 challenge-mechanism structural evidence is required before I29 root candidate adaptation.',
    ]);
  }

  const mechanisms = forceEvidence.mechanisms.map((item) => mechanismRootEvidence(item, pillars));
  return finalized({
    evidenceVersion: I29_CHALLENGE_TARGET_INTRINSIC_ROOT_EVIDENCE_VERSION,
    status: 'RESOLVED_EVIDENCE',
    ...(snapshotId === undefined ? {} : { snapshotId }),
    upstreamI27ReportId: forceEvidence.reportId,
    mechanisms,
    targetIntrinsicRootEvidenceSubstrate: 'challenge_specific_candidate_evidence_only',
    directI18CClaimReuse: false,
    visibleTargetStemAnchorRequired: true,
    earthRootConventionResolved: false,
    targetIntrinsicRootQualityVerdict: 'not_determined',
    targetPostRelationForceState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    sourceBasis: I29_CHALLENGE_TARGET_ROOT_SOURCE_BASIS,
    notes: [
      'A relation-derived target element receives intrinsic root candidate evidence only when at least one target-element heavenly stem is visibly manifested.',
      'Hidden-stem or branch-main target presence without a visible target-stem anchor remains structural evidence and is not promoted to root quality.',
      'Non-earth branch locators are reused only as challenge-specific candidate substrate; I18C day-master claim types and methodology identity are not reused.',
      'Earth root class remains unresolved. No post-relation state, effective force, usefulness/harmfulness, final classification, or numeric weight is emitted.',
    ],
  });
}

export function buildI29ChallengeTargetIntrinsicRootEvidence(
  snapshot: CanonicalSajuSnapshot,
): ChallengeTargetIntrinsicRootEvidenceReport {
  if (snapshot.scenarios.length > 0) {
    return unresolvedReport('SCENARIO_MATERIALIZATION_REQUIRED', snapshot.snapshotId, [
      'Each calculation scenario must be materialized before challenge-target intrinsic root candidate evidence is derived.',
    ]);
  }

  const pillars: StructuralPillarInput = {};
  for (const slot of PILLAR_SLOTS) {
    const state = snapshot.pillars[slot];
    if (state.status !== 'resolved') {
      return unresolvedReport('PILLARS_UNRESOLVED', snapshot.snapshotId, [
        `Resolved ${slot} pillar is required for challenge-target intrinsic root candidate evidence.`,
      ]);
    }
    pillars[slot] = state.value;
  }

  return buildResolvedI29ChallengeTargetIntrinsicRootEvidence(pillars, snapshot.snapshotId);
}
