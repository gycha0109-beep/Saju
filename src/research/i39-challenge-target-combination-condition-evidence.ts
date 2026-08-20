import {
  deriveStructuralRelationCandidates,
  type PillarSlot,
  type StructuralPillarInput,
} from '../calculation/structural-relations.js';
import type { FiveElement } from '../contracts/calculation.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeMechanism } from './i24-challenge-mechanism-composition.js';
import type {
  ChallengeTargetCombinationCompetingRelationTopology,
  ChallengeTargetCombinationDependencyEvidenceCandidate,
  ChallengeTargetCombinationDependencyEvidenceReport,
  ChallengeTargetCombinationParticipantContext,
  ChallengeTargetCombinationRelationKind,
  ChallengeTargetCombinationSubjectKind,
} from './i35-challenge-target-combination-dependency-evidence.js';
import type {
  ChallengeTargetCombinationTransformationReferenceReport,
  ChallengeTargetTransformationReferenceItem,
} from './i37-challenge-target-combination-transformation-reference.js';
import type { ChallengeTargetCombinationConditionApplicabilityMethodologyReviewReport } from './i38-challenge-target-combination-condition-applicability-methodology-review.js';

export const I39_CHALLENGE_TARGET_COMBINATION_CONDITION_EVIDENCE_VERSION =
  'myeonghwa-challenge-target-combination-condition-evidence-v1';

const PILLAR_ORDER = ['year', 'month', 'day', 'hour'] as const satisfies readonly PillarSlot[];
const PILLAR_INDEX: Readonly<Record<PillarSlot, number>> = Object.freeze({
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
});

export type ThreeCombinationAdjacencyState =
  | 'CONTIGUOUS_THREE_SLOTS'
  | 'SEPARATED_WITH_GAP'
  | 'NOT_APPLICABLE';

export type ThreeCombinationLeadOutState =
  | 'VISIBLE_REFERENCE_ELEMENT_STEM_PRESENT'
  | 'NO_VISIBLE_REFERENCE_ELEMENT_STEM'
  | 'REFERENCE_ELEMENT_UNAVAILABLE'
  | 'NOT_APPLICABLE';

export interface ChallengeCombinationSeasonalConditionEvidence {
  monthBranch: ChallengeTargetCombinationDependencyEvidenceCandidate['monthBranch'];
  commandElement: FiveElement;
  targetElementSeasonalPhase: ChallengeTargetCombinationDependencyEvidenceCandidate['targetElementSeasonalPhase'];
  conditionEffect: 'not_resolved';
}

export interface ChallengeCombinationSupportInterferenceEvidence {
  participantContexts: readonly ChallengeTargetCombinationParticipantContext[];
  completeEffectModelAvailable: false;
  supportInterferenceEffect: 'not_resolved';
}

export interface ChallengeCombinationThreeBranchConditionEvidence {
  fullMembershipNecessary: true;
  fullMembershipObserved: true;
  participantPositions: readonly PillarSlot[];
  adjacencyState: ThreeCombinationAdjacencyState;
  clashTopology: readonly ChallengeTargetCombinationCompetingRelationTopology[];
  traditionalBureauReferenceElement?: FiveElement;
  visibleLeadOutStemPositions: readonly PillarSlot[];
  leadOutState: ThreeCombinationLeadOutState;
  effectiveBureauVerdict: 'not_determined';
}

export interface ChallengeTargetCombinationConditionEvidenceItem {
  mechanism: ChallengeMechanism;
  targetElement: FiveElement;
  subjectKind: ChallengeTargetCombinationSubjectKind;
  subjectPosition: PillarSlot;
  subjectValue: ChallengeTargetCombinationDependencyEvidenceCandidate['subjectValue'];
  relationId: string;
  relationKind: ChallengeTargetCombinationRelationKind;
  seasonalCondition: ChallengeCombinationSeasonalConditionEvidence;
  supportInterference: ChallengeCombinationSupportInterferenceEvidence;
  competingRelationTopology: readonly ChallengeTargetCombinationCompetingRelationTopology[];
  threeBranchCondition?: ChallengeCombinationThreeBranchConditionEvidence;
  sixCombinationConventionState:
    | 'NOT_APPLICABLE'
    | 'UNIFORM_TRANSFORMATION_CONVENTION_UNRESOLVED_SCOPE_MISMATCH';
  conditionEvidenceState: 'CANDIDATE_SUBSTRATE_ONLY';
  transformationConditionVerdict: 'not_determined';
  trueTransformationVerdict: 'not_determined';
  bindingState: 'not_determined';
  postCombinationSubjectIdentity: 'not_determined';
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  numericScore: 'not_assigned';
}

export interface ChallengeTargetCombinationConditionEvidenceReport {
  reportId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_CONDITION_EVIDENCE'
    | 'PILLARS_UNRESOLVED'
    | 'COMBINATION_EVIDENCE_UNRESOLVED'
    | 'COMBINATION_EVIDENCE_MISALIGNED'
    | 'REFERENCE_EVIDENCE_UNRESOLVED'
    | 'REFERENCE_EVIDENCE_MISALIGNED'
    | 'METHODOLOGY_NOT_AUTHORIZED';
  upstreamI35ReportId: string;
  upstreamI37ReportId: string;
  upstreamI38ReviewId: string;
  items: readonly ChallengeTargetCombinationConditionEvidenceItem[];
  challengeSpecificConditionEvidenceAvailable: boolean;
  transformationConditionVerdict: 'not_determined';
  challengeTransformationStateEmissionAuthorized: false;
  combinationBindingStateEmissionAuthorized: false;
  postCombinationSubjectIdentityPolicyResolved: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

function finalized(
  material: Omit<ChallengeTargetCombinationConditionEvidenceReport, 'reportId'>,
): ChallengeTargetCombinationConditionEvidenceReport {
  return {
    reportId: `challenge_target_combination_condition_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function unresolvedReport(
  status: Exclude<ChallengeTargetCombinationConditionEvidenceReport['status'], 'RESOLVED_CONDITION_EVIDENCE'>,
  combinationEvidence: ChallengeTargetCombinationDependencyEvidenceReport,
  referenceEvidence: ChallengeTargetCombinationTransformationReferenceReport,
  methodology: ChallengeTargetCombinationConditionApplicabilityMethodologyReviewReport,
  notes: readonly string[],
): ChallengeTargetCombinationConditionEvidenceReport {
  return finalized({
    evidenceVersion: I39_CHALLENGE_TARGET_COMBINATION_CONDITION_EVIDENCE_VERSION,
    status,
    upstreamI35ReportId: combinationEvidence.reportId,
    upstreamI37ReportId: referenceEvidence.reportId,
    upstreamI38ReviewId: methodology.reviewId,
    items: [],
    challengeSpecificConditionEvidenceAvailable: false,
    transformationConditionVerdict: 'not_determined',
    challengeTransformationStateEmissionAuthorized: false,
    combinationBindingStateEmissionAuthorized: false,
    postCombinationSubjectIdentityPolicyResolved: false,
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

function candidateAlignedToPillars(
  candidate: ChallengeTargetCombinationDependencyEvidenceCandidate,
  pillars: StructuralPillarInput,
): boolean {
  const month = pillars.month;
  if (month === undefined || candidate.monthBranch !== month.branch.value) return false;
  const relations = deriveStructuralRelationCandidates(pillars);
  const relation = relations.find((item) => item.relationId === candidate.relationId);
  if (relation === undefined || relation.kind !== candidate.relationKind) return false;
  if (relation.participants.length !== candidate.participants.length) return false;
  return relation.participants.every((participant) => {
    const evidenceParticipant = candidate.participants.find(
      (item) => item.pillar === participant.pillar && item.component === participant.component,
    );
    return evidenceParticipant?.value === participant.value;
  });
}

function referenceForCandidate(
  candidate: ChallengeTargetCombinationDependencyEvidenceCandidate,
  references: readonly ChallengeTargetTransformationReferenceItem[],
): ChallengeTargetTransformationReferenceItem | undefined {
  return references.find(
    (item) =>
      item.upstreamCombinationRelationId === candidate.relationId &&
      item.mechanism === candidate.mechanism &&
      item.subjectKind === candidate.subjectKind &&
      item.subjectPosition === candidate.subjectPosition,
  );
}

function participantPositions(
  candidate: ChallengeTargetCombinationDependencyEvidenceCandidate,
): readonly PillarSlot[] {
  return [...new Set(candidate.participants.map((participant) => participant.pillar))].sort(
    (left, right) => PILLAR_INDEX[left] - PILLAR_INDEX[right],
  );
}

function adjacencyState(
  candidate: ChallengeTargetCombinationDependencyEvidenceCandidate,
): ThreeCombinationAdjacencyState {
  if (candidate.relationKind !== 'branch_three_combination') return 'NOT_APPLICABLE';
  const indexes = participantPositions(candidate).map((position) => PILLAR_INDEX[position]);
  if (indexes.length !== 3) return 'SEPARATED_WITH_GAP';
  return indexes[2]! - indexes[0]! === 2
    ? 'CONTIGUOUS_THREE_SLOTS'
    : 'SEPARATED_WITH_GAP';
}

function visibleStemPositionsForElement(
  pillars: StructuralPillarInput,
  element: FiveElement,
): readonly PillarSlot[] {
  return PILLAR_ORDER.filter((slot) => pillars[slot]?.stem.element === element);
}

function threeBranchCondition(
  candidate: ChallengeTargetCombinationDependencyEvidenceCandidate,
  reference: ChallengeTargetTransformationReferenceItem | undefined,
  pillars: StructuralPillarInput,
): ChallengeCombinationThreeBranchConditionEvidence | undefined {
  if (candidate.relationKind !== 'branch_three_combination') return undefined;

  const bureauElement =
    reference?.referenceKind === 'THREE_COMBINATION_BUREAU_REFERENCE'
      ? reference.traditionalReferenceElement
      : undefined;
  const visibleLeadOutStemPositions =
    bureauElement === undefined ? [] : visibleStemPositionsForElement(pillars, bureauElement);
  const leadOutState: ThreeCombinationLeadOutState =
    bureauElement === undefined
      ? 'REFERENCE_ELEMENT_UNAVAILABLE'
      : visibleLeadOutStemPositions.length > 0
        ? 'VISIBLE_REFERENCE_ELEMENT_STEM_PRESENT'
        : 'NO_VISIBLE_REFERENCE_ELEMENT_STEM';

  return {
    fullMembershipNecessary: true,
    fullMembershipObserved: true,
    participantPositions: participantPositions(candidate),
    adjacencyState: adjacencyState(candidate),
    clashTopology: candidate.competingRelationTopology.filter(
      (relation) => relation.relationKind === 'branch_clash',
    ),
    ...(bureauElement === undefined ? {} : { traditionalBureauReferenceElement: bureauElement }),
    visibleLeadOutStemPositions,
    leadOutState,
    effectiveBureauVerdict: 'not_determined',
  };
}

function evidenceItem(
  candidate: ChallengeTargetCombinationDependencyEvidenceCandidate,
  reference: ChallengeTargetTransformationReferenceItem | undefined,
  pillars: StructuralPillarInput,
): ChallengeTargetCombinationConditionEvidenceItem {
  const branchCondition = threeBranchCondition(candidate, reference, pillars);
  return {
    mechanism: candidate.mechanism,
    targetElement: candidate.targetElement,
    subjectKind: candidate.subjectKind,
    subjectPosition: candidate.subjectPosition,
    subjectValue: candidate.subjectValue,
    relationId: candidate.relationId,
    relationKind: candidate.relationKind,
    seasonalCondition: {
      monthBranch: candidate.monthBranch,
      commandElement: candidate.commandElement,
      targetElementSeasonalPhase: candidate.targetElementSeasonalPhase,
      conditionEffect: 'not_resolved',
    },
    supportInterference: {
      participantContexts: candidate.participants,
      completeEffectModelAvailable: false,
      supportInterferenceEffect: 'not_resolved',
    },
    competingRelationTopology: candidate.competingRelationTopology,
    ...(branchCondition === undefined ? {} : { threeBranchCondition: branchCondition }),
    sixCombinationConventionState:
      candidate.relationKind === 'branch_six_combination'
        ? 'UNIFORM_TRANSFORMATION_CONVENTION_UNRESOLVED_SCOPE_MISMATCH'
        : 'NOT_APPLICABLE',
    conditionEvidenceState: 'CANDIDATE_SUBSTRATE_ONLY',
    transformationConditionVerdict: 'not_determined',
    trueTransformationVerdict: 'not_determined',
    bindingState: 'not_determined',
    postCombinationSubjectIdentity: 'not_determined',
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    numericScore: 'not_assigned',
  };
}

export function buildResolvedI39ChallengeTargetCombinationConditionEvidence(
  pillars: StructuralPillarInput,
  combinationEvidence: ChallengeTargetCombinationDependencyEvidenceReport,
  referenceEvidence: ChallengeTargetCombinationTransformationReferenceReport,
  methodology: ChallengeTargetCombinationConditionApplicabilityMethodologyReviewReport,
): ChallengeTargetCombinationConditionEvidenceReport {
  if (!pillarsResolved(pillars)) {
    return unresolvedReport('PILLARS_UNRESOLVED', combinationEvidence, referenceEvidence, methodology, [
      'All four resolved pillars are required before I39 condition evidence can be materialized.',
    ]);
  }
  if (combinationEvidence.status !== 'RESOLVED_DEPENDENCY_EVIDENCE') {
    return unresolvedReport(
      'COMBINATION_EVIDENCE_UNRESOLVED',
      combinationEvidence,
      referenceEvidence,
      methodology,
      ['Resolved I35 combination dependency evidence is required before I39 condition evidence.'],
    );
  }
  if (!combinationEvidence.candidates.every((candidate) => candidateAlignedToPillars(candidate, pillars))) {
    return unresolvedReport(
      'COMBINATION_EVIDENCE_MISALIGNED',
      combinationEvidence,
      referenceEvidence,
      methodology,
      ['The supplied I35 candidates do not match the structural relation material derived from the current pillars.'],
    );
  }
  if (referenceEvidence.status !== 'RESOLVED_REFERENCE_METADATA') {
    return unresolvedReport(
      'REFERENCE_EVIDENCE_UNRESOLVED',
      combinationEvidence,
      referenceEvidence,
      methodology,
      ['Resolved I37 transformation-reference metadata is required before reference-aware I39 condition evidence.'],
    );
  }
  if (referenceEvidence.upstreamI35ReportId !== combinationEvidence.reportId) {
    return unresolvedReport(
      'REFERENCE_EVIDENCE_MISALIGNED',
      combinationEvidence,
      referenceEvidence,
      methodology,
      ['The supplied I37 report is not bound to the exact I35 combination evidence used by I39.'],
    );
  }
  if (
    methodology.decision !== 'PARTIAL_CONDITION_APPLICABILITY_ONLY_RESULT_VERDICTS_BLOCKED' ||
    !methodology.challengeSpecificConditionEvidenceAdapterAuthorized ||
    methodology.challengeTransformationStateEmissionAuthorized ||
    methodology.combinationBindingStateEmissionAuthorized ||
    methodology.threeCombinationEffectiveBureauVerdictAuthorized ||
    methodology.sixCombinationTransformationVerdictAuthorized
  ) {
    return unresolvedReport(
      'METHODOLOGY_NOT_AUTHORIZED',
      combinationEvidence,
      referenceEvidence,
      methodology,
      ['I38 does not authorize the fail-closed I39 condition evidence adapter contract.'],
    );
  }

  const items = combinationEvidence.candidates.map((candidate) =>
    evidenceItem(candidate, referenceForCandidate(candidate, referenceEvidence.references), pillars),
  );

  return finalized({
    evidenceVersion: I39_CHALLENGE_TARGET_COMBINATION_CONDITION_EVIDENCE_VERSION,
    status: 'RESOLVED_CONDITION_EVIDENCE',
    upstreamI35ReportId: combinationEvidence.reportId,
    upstreamI37ReportId: referenceEvidence.reportId,
    upstreamI38ReviewId: methodology.reviewId,
    items,
    challengeSpecificConditionEvidenceAvailable: true,
    transformationConditionVerdict: 'not_determined',
    challengeTransformationStateEmissionAuthorized: false,
    combinationBindingStateEmissionAuthorized: false,
    postCombinationSubjectIdentityPolicyResolved: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes: [
      'I39 materializes only condition dimensions authorized by I38 and preserves the exact I35 subject/relation identity.',
      'Stem seasonal command, participant support/interference locations, and competing relation topology remain candidate substrate and do not decide true transformation or binding.',
      'Three-combination full membership, clash topology, adjacency/spacing, and visible traditional-bureau-element lead-out stems remain evidence only and do not establish an effective bureau.',
      'Six-combination condition evidence preserves the unresolved scope-mismatched uniform transformation convention rather than manufacturing a target element.',
      'Transformation condition, transformation state, binding, subject replacement, post-relation root state, effective force, usefulness/harmfulness, scoring, and classification remain fail-closed.',
    ],
  });
}
