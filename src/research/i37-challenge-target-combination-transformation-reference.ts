import type { EarthlyBranch, FiveElement, HeavenlyStem } from '../contracts/calculation.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  ChallengeTargetCombinationDependencyEvidenceCandidate,
  ChallengeTargetCombinationDependencyEvidenceReport,
} from './i35-challenge-target-combination-dependency-evidence.js';
import type {
  ChallengeTargetCombinationTransformationPolicyMethodologyReviewReport,
  TraditionalStemTransformationReference,
  TraditionalThreeCombinationBureauReference,
} from './i36-challenge-target-combination-transformation-policy-methodology-review.js';

export const I37_CHALLENGE_TARGET_COMBINATION_TRANSFORMATION_REFERENCE_VERSION =
  'myeonghwa-challenge-target-combination-transformation-reference-v1';

export type ChallengeTargetTransformationReferenceKind =
  | 'STEM_DAY_MASTER_SCOPED_TRADITIONAL_REFERENCE'
  | 'THREE_COMBINATION_BUREAU_REFERENCE'
  | 'SIX_COMBINATION_REFERENCE_MAPPING_UNRESOLVED';

export interface ChallengeTargetTransformationReferenceItem {
  mechanism: ChallengeTargetCombinationDependencyEvidenceCandidate['mechanism'];
  targetElement: FiveElement;
  subjectKind: ChallengeTargetCombinationDependencyEvidenceCandidate['subjectKind'];
  subjectPosition: ChallengeTargetCombinationDependencyEvidenceCandidate['subjectPosition'];
  subjectValue: ChallengeTargetCombinationDependencyEvidenceCandidate['subjectValue'];
  upstreamCombinationRelationId: string;
  upstreamRelationKind: ChallengeTargetCombinationDependencyEvidenceCandidate['relationKind'];
  referenceKind: ChallengeTargetTransformationReferenceKind;
  traditionalReferenceElement?: FiveElement;
  referenceScope:
    | 'DAY_STEM_SCOPED_REFERENCE_ONLY'
    | 'FULL_THREE_BRANCH_BUREAU_REFERENCE_ONLY'
    | 'UNRESOLVED';
  fullThreeBranchMembershipRequired?: true;
  fullThreeBranchMembershipObserved?: true;
  referenceDirectChallengeTransformationUseAuthorized: false;
  currentTransformationEstablished: false;
  currentTransformationTargetElement: 'not_emitted';
  bindingState: 'not_determined';
  postCombinationSubjectIdentity: 'not_determined';
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  numericScore: 'not_assigned';
}

export interface ChallengeTargetCombinationTransformationReferenceReport {
  reportId: string;
  referenceVersion: string;
  status: 'RESOLVED_REFERENCE_METADATA' | 'COMBINATION_EVIDENCE_UNRESOLVED';
  upstreamI35ReportId: string;
  upstreamI36ReviewId: string;
  references: readonly ChallengeTargetTransformationReferenceItem[];
  traditionalReferenceMetadataAuthorized: true;
  challengeTransformationStateEmissionAuthorized: false;
  transformationTargetElementEmissionAuthorized: false;
  combinationBindingStateEmissionAuthorized: false;
  postCombinationSubjectIdentityPolicyResolved: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

function pairKey(values: readonly HeavenlyStem[]): string {
  return [...values].sort().join('|');
}

function branchSetKey(values: readonly EarthlyBranch[]): string {
  return [...values].sort().join('|');
}

function stemReference(
  candidate: ChallengeTargetCombinationDependencyEvidenceCandidate,
  policy: ChallengeTargetCombinationTransformationPolicyMethodologyReviewReport,
): ChallengeTargetTransformationReferenceItem {
  const stemValues = candidate.participants
    .filter((participant) => participant.component === 'stem')
    .map((participant) => participant.value as HeavenlyStem);
  const match: TraditionalStemTransformationReference | undefined = policy.stemReferences.find(
    (reference) => pairKey(reference.pair) === pairKey(stemValues),
  );
  if (match === undefined) {
    throw new Error(`No I36 stem reference found for relation ${candidate.relationId}`);
  }

  return {
    mechanism: candidate.mechanism,
    targetElement: candidate.targetElement,
    subjectKind: candidate.subjectKind,
    subjectPosition: candidate.subjectPosition,
    subjectValue: candidate.subjectValue,
    upstreamCombinationRelationId: candidate.relationId,
    upstreamRelationKind: candidate.relationKind,
    referenceKind: 'STEM_DAY_MASTER_SCOPED_TRADITIONAL_REFERENCE',
    traditionalReferenceElement: match.traditionalElement,
    referenceScope: 'DAY_STEM_SCOPED_REFERENCE_ONLY',
    referenceDirectChallengeTransformationUseAuthorized: false,
    currentTransformationEstablished: false,
    currentTransformationTargetElement: 'not_emitted',
    bindingState: 'not_determined',
    postCombinationSubjectIdentity: 'not_determined',
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    numericScore: 'not_assigned',
  };
}

function threeCombinationReference(
  candidate: ChallengeTargetCombinationDependencyEvidenceCandidate,
  policy: ChallengeTargetCombinationTransformationPolicyMethodologyReviewReport,
): ChallengeTargetTransformationReferenceItem {
  const branches = candidate.participants
    .filter((participant) => participant.component === 'branch')
    .map((participant) => participant.value as EarthlyBranch);
  const match: TraditionalThreeCombinationBureauReference | undefined =
    policy.threeCombinationReferences.find(
      (reference) => branchSetKey(reference.branches) === branchSetKey(branches),
    );
  if (match === undefined) {
    throw new Error(`No I36 three-combination bureau reference found for relation ${candidate.relationId}`);
  }

  return {
    mechanism: candidate.mechanism,
    targetElement: candidate.targetElement,
    subjectKind: candidate.subjectKind,
    subjectPosition: candidate.subjectPosition,
    subjectValue: candidate.subjectValue,
    upstreamCombinationRelationId: candidate.relationId,
    upstreamRelationKind: candidate.relationKind,
    referenceKind: 'THREE_COMBINATION_BUREAU_REFERENCE',
    traditionalReferenceElement: match.traditionalBureauElement,
    referenceScope: 'FULL_THREE_BRANCH_BUREAU_REFERENCE_ONLY',
    fullThreeBranchMembershipRequired: true,
    fullThreeBranchMembershipObserved: true,
    referenceDirectChallengeTransformationUseAuthorized: false,
    currentTransformationEstablished: false,
    currentTransformationTargetElement: 'not_emitted',
    bindingState: 'not_determined',
    postCombinationSubjectIdentity: 'not_determined',
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    numericScore: 'not_assigned',
  };
}

function sixCombinationReference(
  candidate: ChallengeTargetCombinationDependencyEvidenceCandidate,
): ChallengeTargetTransformationReferenceItem {
  return {
    mechanism: candidate.mechanism,
    targetElement: candidate.targetElement,
    subjectKind: candidate.subjectKind,
    subjectPosition: candidate.subjectPosition,
    subjectValue: candidate.subjectValue,
    upstreamCombinationRelationId: candidate.relationId,
    upstreamRelationKind: candidate.relationKind,
    referenceKind: 'SIX_COMBINATION_REFERENCE_MAPPING_UNRESOLVED',
    referenceScope: 'UNRESOLVED',
    referenceDirectChallengeTransformationUseAuthorized: false,
    currentTransformationEstablished: false,
    currentTransformationTargetElement: 'not_emitted',
    bindingState: 'not_determined',
    postCombinationSubjectIdentity: 'not_determined',
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    numericScore: 'not_assigned',
  };
}

function finalized(
  material: Omit<ChallengeTargetCombinationTransformationReferenceReport, 'reportId'>,
): ChallengeTargetCombinationTransformationReferenceReport {
  return {
    reportId: `challenge_target_combination_transformation_reference_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI37ChallengeTargetCombinationTransformationReference(
  combinationEvidence: ChallengeTargetCombinationDependencyEvidenceReport,
  policy: ChallengeTargetCombinationTransformationPolicyMethodologyReviewReport,
): ChallengeTargetCombinationTransformationReferenceReport {
  const base = {
    referenceVersion: I37_CHALLENGE_TARGET_COMBINATION_TRANSFORMATION_REFERENCE_VERSION,
    upstreamI35ReportId: combinationEvidence.reportId,
    upstreamI36ReviewId: policy.reviewId,
    traditionalReferenceMetadataAuthorized: true as const,
    challengeTransformationStateEmissionAuthorized: false as const,
    transformationTargetElementEmissionAuthorized: false as const,
    combinationBindingStateEmissionAuthorized: false as const,
    postCombinationSubjectIdentityPolicyResolved: false as const,
    targetPostRelationRootState: 'not_determined' as const,
    effectiveMechanismForceVerdict: 'not_determined' as const,
    relationSpecificUsefulnessHarmfulness: 'not_determined' as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
  };

  if (combinationEvidence.status !== 'RESOLVED_DEPENDENCY_EVIDENCE') {
    return finalized({
      ...base,
      status: 'COMBINATION_EVIDENCE_UNRESOLVED',
      references: [],
      notes: [
        'Resolved I35 combination dependency evidence is required before traditional transformation references can be attached.',
        'No reference metadata is manufactured from unresolved combination evidence.',
      ],
    });
  }

  if (
    policy.decision !== 'REFERENCE_MAPPINGS_ONLY_TRANSFORMATION_STATE_BLOCKED' ||
    !policy.stemPairTraditionalReferenceEmissionAuthorized ||
    !policy.threeCombinationTraditionalBureauReferenceEmissionAuthorized ||
    policy.challengeTransformationStateEmissionAuthorized
  ) {
    throw new Error('I36 policy does not authorize the fail-closed I37 reference adapter contract.');
  }

  const references = combinationEvidence.candidates.map((candidate) => {
    if (candidate.relationKind === 'stem_five_combination') {
      return stemReference(candidate, policy);
    }
    if (candidate.relationKind === 'branch_three_combination') {
      return threeCombinationReference(candidate, policy);
    }
    return sixCombinationReference(candidate);
  });

  return finalized({
    ...base,
    status: 'RESOLVED_REFERENCE_METADATA',
    references,
    notes: [
      'I37 attaches only I36-authorized traditional reference metadata to already-aligned I35 combination candidates.',
      'A stem reference is explicitly day-stem scoped and is not evidence that a non-day-master challenge target has transformed.',
      'A three-combination bureau reference requires the full structural branch set but is not an effective-bureau or post-relation root-state verdict.',
      'Branch six-combination transformed-element mapping remains unresolved and therefore emits no traditional reference element.',
      'Every reference keeps current transformation, binding, subject replacement, post-relation root state, effective force, usefulness/harmfulness, scoring, and classification fail-closed.',
    ],
  });
}
