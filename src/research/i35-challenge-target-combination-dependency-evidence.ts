import {
  deriveStructuralRelationCandidates,
  type PillarSlot,
  type StructuralPillarInput,
  type StructuralRelationCandidate,
  type StructuralRelationKind,
  type StructuralRelationParticipant,
} from '../calculation/structural-relations.js';
import type { EarthlyBranch, FiveElement, HeavenlyStem } from '../contracts/calculation.js';
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

export const I35_CHALLENGE_TARGET_COMBINATION_DEPENDENCY_EVIDENCE_VERSION =
  'myeonghwa-challenge-target-combination-dependency-evidence-v1';

const PILLAR_SLOTS = ['year', 'month', 'day', 'hour'] as const satisfies readonly PillarSlot[];

const GENERATES: Readonly<Record<FiveElement, FiveElement>> = Object.freeze({
  목: '화',
  화: '토',
  토: '금',
  금: '수',
  수: '목',
});

export type ChallengeTargetCombinationSubjectKind =
  | 'VISIBLE_TARGET_STEM'
  | 'TARGET_ROOT_CANDIDATE';

export type ChallengeTargetCombinationRelationKind =
  | 'stem_five_combination'
  | 'branch_six_combination'
  | 'branch_three_combination';

export interface ChallengeTargetCombinationParticipantContext {
  pillar: PillarSlot;
  component: 'stem' | 'branch';
  value: HeavenlyStem | EarthlyBranch;
  element: FiveElement;
  seasonalPhase: SeasonalElementPhase;
  visibleSameElementStemPositions: readonly PillarSlot[];
  visibleResourceStemPositions: readonly PillarSlot[];
  sameElementBranchPositions: readonly PillarSlot[];
  resourceBranchPositions: readonly PillarSlot[];
  supportInterferenceEffect: 'not_resolved';
  numericWeight: 'not_assigned';
}

export interface ChallengeTargetCombinationCompetingRelationTopology {
  relationId: string;
  relationKind: StructuralRelationKind;
  sharedParticipantPositions: readonly PillarSlot[];
  precedence: 'not_determined';
  relationEffect: 'not_determined';
}

export interface ChallengeTargetCombinationDependencyEvidenceCandidate {
  mechanism: ChallengeMechanism;
  targetElement: FiveElement;
  subjectKind: ChallengeTargetCombinationSubjectKind;
  subjectPosition: PillarSlot;
  subjectValue: HeavenlyStem | EarthlyBranch;
  rootCandidateClass?: ChallengeTargetRootCandidateClass;
  relationId: string;
  relationKind: ChallengeTargetCombinationRelationKind;
  relationArity: 2 | 3;
  relationSourceIds: readonly string[];
  participants: readonly ChallengeTargetCombinationParticipantContext[];
  monthBranch: EarthlyBranch;
  commandElement: FiveElement;
  targetElementSeasonalPhase: SeasonalElementPhase;
  structuralMembershipComplete: true;
  transformationEstablished: false;
  transformationTargetElement: 'not_emitted';
  completeSupportInterferenceModelAvailable: false;
  competingRelationTopology: readonly ChallengeTargetCombinationCompetingRelationTopology[];
  combinationTransformationConditions: 'not_resolved';
  combinationEffectVerdict: 'not_determined';
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  numericScore: 'not_assigned';
}

export interface ChallengeTargetCombinationDependencyEvidenceReport {
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
  candidates: readonly ChallengeTargetCombinationDependencyEvidenceCandidate[];
  transformationTargetElementEmissionAuthorized: false;
  completeSupportInterferenceModelAvailable: false;
  hiddenOnlyTargetCombinationRootEffectAuthorized: false;
  earthTargetCombinationRootEffectAuthorized: false;
  combinationEffectVerdict: 'not_determined';
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

function resourceElement(element: FiveElement): FiveElement {
  const value = Object.entries(GENERATES).find(([, generated]) => generated === element)?.[0] as
    | FiveElement
    | undefined;
  if (value === undefined) throw new Error(`No generating element found for ${element}`);
  return value;
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

function participantElement(
  participant: StructuralRelationParticipant,
  pillars: StructuralPillarInput,
): FiveElement {
  const pillar = pillars[participant.pillar];
  if (pillar === undefined) throw new Error(`Resolved pillar required for ${participant.pillar}`);
  return participant.component === 'stem' ? pillar.stem.element : pillar.branch.element;
}

function participantContext(
  participant: StructuralRelationParticipant,
  pillars: StructuralPillarInput,
  commandElement: FiveElement,
): ChallengeTargetCombinationParticipantContext {
  const element = participantElement(participant, pillars);
  const resource = resourceElement(element);
  return {
    pillar: participant.pillar,
    component: participant.component,
    value: participant.value,
    element,
    seasonalPhase: seasonalElementPhase(commandElement, element),
    visibleSameElementStemPositions: visibleStemPositions(pillars, element),
    visibleResourceStemPositions: visibleStemPositions(pillars, resource),
    sameElementBranchPositions: branchPositions(pillars, element),
    resourceBranchPositions: branchPositions(pillars, resource),
    supportInterferenceEffect: 'not_resolved',
    numericWeight: 'not_assigned',
  };
}

function participantPositions(candidate: StructuralRelationCandidate): readonly PillarSlot[] {
  return [...new Set(candidate.participants.map((participant) => participant.pillar))].sort();
}

function competingTopology(
  current: StructuralRelationCandidate,
  relations: readonly StructuralRelationCandidate[],
): readonly ChallengeTargetCombinationCompetingRelationTopology[] {
  const positions = new Set(participantPositions(current));
  return relations
    .filter((candidate) => candidate.relationId !== current.relationId)
    .flatMap((candidate) => {
      const shared = participantPositions(candidate).filter((position) => positions.has(position)).sort();
      if (shared.length === 0) return [];
      return [{
        relationId: candidate.relationId,
        relationKind: candidate.kind,
        sharedParticipantPositions: shared,
        precedence: 'not_determined' as const,
        relationEffect: 'not_determined' as const,
      }];
    })
    .sort((left, right) => left.relationId.localeCompare(right.relationId));
}

function relationArity(candidate: StructuralRelationCandidate): 2 | 3 {
  return candidate.participants.length === 3 ? 3 : 2;
}

function finalized(
  material: Omit<ChallengeTargetCombinationDependencyEvidenceReport, 'reportId'>,
): ChallengeTargetCombinationDependencyEvidenceReport {
  return {
    reportId: `challenge_target_combination_dependency_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function unresolvedReport(
  status: Exclude<ChallengeTargetCombinationDependencyEvidenceReport['status'], 'RESOLVED_DEPENDENCY_EVIDENCE'>,
  rootEvidence?: ChallengeTargetIntrinsicRootEvidenceReport,
  relationEvidence?: ChallengeTargetRelationParticipationEvidenceReport,
  notes: readonly string[] = [],
): ChallengeTargetCombinationDependencyEvidenceReport {
  return finalized({
    evidenceVersion: I35_CHALLENGE_TARGET_COMBINATION_DEPENDENCY_EVIDENCE_VERSION,
    status,
    ...(rootEvidence === undefined ? {} : { upstreamI29ReportId: rootEvidence.reportId }),
    ...(relationEvidence === undefined ? {} : { upstreamI31ReportId: relationEvidence.reportId }),
    candidates: [],
    transformationTargetElementEmissionAuthorized: false,
    completeSupportInterferenceModelAvailable: false,
    hiddenOnlyTargetCombinationRootEffectAuthorized: false,
    earthTargetCombinationRootEffectAuthorized: false,
    combinationEffectVerdict: 'not_determined',
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes,
  });
}

function stemCandidate(
  mechanism: ChallengeMechanism,
  targetElement: FiveElement,
  subjectPosition: PillarSlot,
  subjectValue: HeavenlyStem,
  relation: StructuralRelationCandidate,
  relations: readonly StructuralRelationCandidate[],
  pillars: StructuralPillarInput,
  monthBranch: EarthlyBranch,
  commandElement: FiveElement,
): ChallengeTargetCombinationDependencyEvidenceCandidate {
  return {
    mechanism,
    targetElement,
    subjectKind: 'VISIBLE_TARGET_STEM',
    subjectPosition,
    subjectValue,
    relationId: relation.relationId,
    relationKind: 'stem_five_combination',
    relationArity: relationArity(relation),
    relationSourceIds: relation.sourceIds,
    participants: relation.participants.map((participant) =>
      participantContext(participant, pillars, commandElement),
    ),
    monthBranch,
    commandElement,
    targetElementSeasonalPhase: seasonalElementPhase(commandElement, targetElement),
    structuralMembershipComplete: true,
    transformationEstablished: false,
    transformationTargetElement: 'not_emitted',
    completeSupportInterferenceModelAvailable: false,
    competingRelationTopology: competingTopology(relation, relations),
    combinationTransformationConditions: 'not_resolved',
    combinationEffectVerdict: 'not_determined',
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    numericScore: 'not_assigned',
  };
}

function branchCandidate(
  mechanism: ChallengeMechanism,
  targetElement: FiveElement,
  subjectPosition: PillarSlot,
  subjectValue: EarthlyBranch,
  rootCandidateClass: ChallengeTargetRootCandidateClass,
  relation: StructuralRelationCandidate,
  relations: readonly StructuralRelationCandidate[],
  pillars: StructuralPillarInput,
  monthBranch: EarthlyBranch,
  commandElement: FiveElement,
): ChallengeTargetCombinationDependencyEvidenceCandidate {
  return {
    mechanism,
    targetElement,
    subjectKind: 'TARGET_ROOT_CANDIDATE',
    subjectPosition,
    subjectValue,
    rootCandidateClass,
    relationId: relation.relationId,
    relationKind: relation.kind as 'branch_six_combination' | 'branch_three_combination',
    relationArity: relationArity(relation),
    relationSourceIds: relation.sourceIds,
    participants: relation.participants.map((participant) =>
      participantContext(participant, pillars, commandElement),
    ),
    monthBranch,
    commandElement,
    targetElementSeasonalPhase: seasonalElementPhase(commandElement, targetElement),
    structuralMembershipComplete: true,
    transformationEstablished: false,
    transformationTargetElement: 'not_emitted',
    completeSupportInterferenceModelAvailable: false,
    competingRelationTopology: competingTopology(relation, relations),
    combinationTransformationConditions: 'not_resolved',
    combinationEffectVerdict: 'not_determined',
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    numericScore: 'not_assigned',
  };
}

export function buildResolvedI35ChallengeTargetCombinationDependencyEvidence(
  pillars: StructuralPillarInput,
  rootEvidence: ChallengeTargetIntrinsicRootEvidenceReport,
  relationEvidence: ChallengeTargetRelationParticipationEvidenceReport,
): ChallengeTargetCombinationDependencyEvidenceReport {
  if (PILLAR_SLOTS.some((slot) => pillars[slot] === undefined)) {
    return unresolvedReport('PILLARS_UNRESOLVED', rootEvidence, relationEvidence, [
      'All four resolved pillars are required before challenge-target combination dependency evidence is materialized.',
    ]);
  }
  if (rootEvidence.status !== 'RESOLVED_EVIDENCE') {
    return unresolvedReport('ROOT_EVIDENCE_UNRESOLVED', rootEvidence, relationEvidence, [
      'Resolved I29 intrinsic root evidence is required before I35 combination dependency materialization.',
    ]);
  }

  const expectedRootEvidence = buildResolvedI29ChallengeTargetIntrinsicRootEvidence(
    pillars,
    rootEvidence.snapshotId,
  );
  if (expectedRootEvidence.reportId !== rootEvidence.reportId) {
    return unresolvedReport('ROOT_EVIDENCE_MISALIGNED', rootEvidence, relationEvidence, [
      'The supplied I29 report does not match the resolved pillar material used by I35.',
    ]);
  }
  if (relationEvidence.status !== 'RESOLVED_ROUTING_EVIDENCE') {
    return unresolvedReport('RELATION_EVIDENCE_UNRESOLVED', rootEvidence, relationEvidence, [
      'Resolved I31 relation participation evidence is required before I35 combination dependency materialization.',
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
      'The supplied I31 report is not aligned to the same I29 report and pillar material used by I35.',
    ]);
  }

  const month = pillars.month;
  if (month === undefined) {
    return unresolvedReport('PILLARS_UNRESOLVED', rootEvidence, relationEvidence, [
      'A resolved month pillar is required for combination seasonal dependency evidence.',
    ]);
  }

  const monthBranch = month.branch.value;
  const commandElement = month.branch.element;
  const relations = deriveStructuralRelationCandidates(pillars);
  const relationById = new Map(relations.map((candidate) => [candidate.relationId, candidate] as const));
  const candidates: ChallengeTargetCombinationDependencyEvidenceCandidate[] = [];

  for (const mechanism of relationEvidence.mechanisms) {
    for (const stemRelation of mechanism.visibleTargetStemRelations) {
      const relation = relationById.get(stemRelation.relationId);
      if (relation?.kind !== 'stem_five_combination') continue;
      candidates.push(stemCandidate(
        mechanism.mechanism,
        mechanism.targetElement,
        stemRelation.targetStemPosition,
        stemRelation.targetStem,
        relation,
        relations,
        pillars,
        monthBranch,
        commandElement,
      ));
    }

    for (const rootCandidate of mechanism.rootCandidateRelations) {
      const combinationRouted =
        rootCandidate.reviewRequirements.includes('BRANCH_SIX_COMBINATION_EFFECT_REVIEW_REQUIRED') ||
        rootCandidate.reviewRequirements.includes('BRANCH_THREE_COMBINATION_EFFECT_REVIEW_REQUIRED');
      if (!combinationRouted) continue;

      for (const relationId of rootCandidate.touchingRelationIds) {
        const relation = relationById.get(relationId);
        if (
          relation?.kind !== 'branch_six_combination' &&
          relation?.kind !== 'branch_three_combination'
        ) continue;
        candidates.push(branchCandidate(
          mechanism.mechanism,
          mechanism.targetElement,
          rootCandidate.branchPosition,
          rootCandidate.branch,
          rootCandidate.candidateClass,
          relation,
          relations,
          pillars,
          monthBranch,
          commandElement,
        ));
      }
    }
  }

  candidates.sort((left, right) =>
    `${left.mechanism}|${left.subjectKind}|${left.subjectPosition}|${left.relationId}`.localeCompare(
      `${right.mechanism}|${right.subjectKind}|${right.subjectPosition}|${right.relationId}`,
    ),
  );

  return finalized({
    evidenceVersion: I35_CHALLENGE_TARGET_COMBINATION_DEPENDENCY_EVIDENCE_VERSION,
    status: 'RESOLVED_DEPENDENCY_EVIDENCE',
    upstreamI29ReportId: rootEvidence.reportId,
    upstreamI31ReportId: relationEvidence.reportId,
    monthBranch,
    commandElement,
    candidates,
    transformationTargetElementEmissionAuthorized: false,
    completeSupportInterferenceModelAvailable: false,
    hiddenOnlyTargetCombinationRootEffectAuthorized: false,
    earthTargetCombinationRootEffectAuthorized: false,
    combinationEffectVerdict: 'not_determined',
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes: [
      'I35 materializes only combination participation already routed by aligned I31 evidence.',
      'A relation candidate is structurally complete only in the deterministic membership sense; this does not establish transformation or an effective bureau.',
      'Seasonal phase and same-element/resource positions are dependency context only and are not summed, weighted, or converted into support/interference effects.',
      'Other tracked relations sharing participant positions are preserved as competing topology without precedence or effect.',
      'No stem or branch transformation target element is emitted because I34 did not authorize a challenge-target transformation mapping policy.',
      'No hidden-only or earth target root effect, post-relation root state, effective mechanism force, usefulness/harmfulness, numeric score, or strong/weak classification is emitted.',
    ],
  });
}
