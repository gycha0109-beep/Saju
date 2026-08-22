import type { FiveElement } from '../contracts/calculation.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeMechanism } from './i24-challenge-mechanism-composition.js';
import type { ChallengeTargetCombinationCompetingRelationTopology } from './i35-challenge-target-combination-dependency-evidence.js';
import type {
  ChallengeTargetCombinationConditionEvidenceReport,
  ThreeCombinationAdjacencyState,
  ThreeCombinationLeadOutState,
} from './i39-challenge-target-combination-condition-evidence.js';
import type { ChallengeRootThreeCombinationEffectiveBureauQualificationMethodologyReviewReport } from './i44-challenge-root-three-combination-effective-bureau-qualification-methodology-review.js';

export const I45_CHALLENGE_ROOT_THREE_COMBINATION_BUREAU_FORMATION_EVIDENCE_VERSION =
  'myeonghwa-challenge-root-three-combination-bureau-formation-evidence-v1';

export interface ChallengeRootThreeCombinationBureauFormationEvidenceItem {
  mechanism: ChallengeMechanism;
  relationId: string;
  subjectPosition: 'year' | 'month' | 'day' | 'hour';
  subjectValue: string;
  participantPositions: readonly ('year' | 'month' | 'day' | 'hour')[];
  traditionalBureauElement: FiveElement;
  formationState: 'STRUCTURAL_BUREAU_FORMED';
  formationBasis: 'FULL_THREE_BRANCH_MEMBERSHIP';
  fullMembershipObserved: true;
  adjacencyState: ThreeCombinationAdjacencyState;
  adjacencyRequiredForFormation: false;
  leadOutState: ThreeCombinationLeadOutState;
  visibleLeadOutStemPositions: readonly ('year' | 'month' | 'day' | 'hour')[];
  visibleLeadOutRequiredForFormation: false;
  clashTopology: readonly ChallengeTargetCombinationCompetingRelationTopology[];
  clashCanBreakOrDamageBureau: true;
  clashBreakDamageSettlement: 'not_determined';
  postInteractionBureauState: 'not_determined';
  postInteractionEffectiveBureauVerdict: 'not_determined';
  seasonalCommandEffectOnChallengeForce: 'not_resolved';
  supportInterferenceEffectOnChallengeForce: 'not_resolved';
  competingRelationInteractionSettlement: 'not_determined';
  postCombinationSubjectIdentity: 'not_determined';
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  numericScore: 'not_assigned';
}

export interface ChallengeRootThreeCombinationBureauFormationEvidenceReport {
  reportId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_STRUCTURAL_BUREAU_FORMATION'
    | 'CONDITION_EVIDENCE_UNRESOLVED'
    | 'METHODOLOGY_NOT_AUTHORIZED'
    | 'BUREAU_REFERENCE_UNRESOLVED';
  upstreamI39ReportId: string;
  upstreamI44ReviewId: string;
  items: readonly ChallengeRootThreeCombinationBureauFormationEvidenceItem[];
  allThreeCombinationItemsHaveFormationEvidence: boolean;
  structuralBureauFormationStateEmissionAuthorized: true;
  postInteractionBureauStateEmissionAuthorized: false;
  postInteractionEffectiveBureauVerdictAuthorized: false;
  adjacencyRequiredForFullThreeFormation: false;
  visibleLeadOutRequiredForFullThreeFormation: false;
  postCombinationSubjectIdentityPolicyResolved: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

function finalized(
  material: Omit<ChallengeRootThreeCombinationBureauFormationEvidenceReport, 'reportId'>,
): ChallengeRootThreeCombinationBureauFormationEvidenceReport {
  return {
    reportId: `challenge_root_three_combination_bureau_formation_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function unresolved(
  status: Exclude<
    ChallengeRootThreeCombinationBureauFormationEvidenceReport['status'],
    'RESOLVED_STRUCTURAL_BUREAU_FORMATION'
  >,
  evidence: ChallengeTargetCombinationConditionEvidenceReport,
  methodology: ChallengeRootThreeCombinationEffectiveBureauQualificationMethodologyReviewReport,
  notes: readonly string[],
): ChallengeRootThreeCombinationBureauFormationEvidenceReport {
  return finalized({
    evidenceVersion: I45_CHALLENGE_ROOT_THREE_COMBINATION_BUREAU_FORMATION_EVIDENCE_VERSION,
    status,
    upstreamI39ReportId: evidence.reportId,
    upstreamI44ReviewId: methodology.reviewId,
    items: [],
    allThreeCombinationItemsHaveFormationEvidence: false,
    structuralBureauFormationStateEmissionAuthorized: true,
    postInteractionBureauStateEmissionAuthorized: false,
    postInteractionEffectiveBureauVerdictAuthorized: false,
    adjacencyRequiredForFullThreeFormation: false,
    visibleLeadOutRequiredForFullThreeFormation: false,
    postCombinationSubjectIdentityPolicyResolved: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes,
  });
}

export function buildI45ChallengeRootThreeCombinationBureauFormationEvidence(
  conditionEvidence: ChallengeTargetCombinationConditionEvidenceReport,
  methodology: ChallengeRootThreeCombinationEffectiveBureauQualificationMethodologyReviewReport,
): ChallengeRootThreeCombinationBureauFormationEvidenceReport {
  if (conditionEvidence.status !== 'RESOLVED_CONDITION_EVIDENCE') {
    return unresolved('CONDITION_EVIDENCE_UNRESOLVED', conditionEvidence, methodology, [
      'Resolved I39 condition evidence is required before I45 structural bureau formation can be materialized.',
    ]);
  }

  if (
    methodology.decision !==
      'FULL_MEMBERSHIP_BUREAU_FORMATION_AUTHORIZED_POST_INTERACTION_STATE_BLOCKED' ||
    !methodology.fullThreeMembershipAuthorizesStructuralBureauFormation ||
    !methodology.structuralBureauFormationStateEmissionAuthorized ||
    !methodology.traditionalBureauElementReferenceMayBeUsedForFormationIdentity ||
    methodology.structuralBureauFormationEqualsPostInteractionEffectiveBureau ||
    methodology.fullThreeAdjacencyRequiredForFormation ||
    methodology.fullThreeVisibleLeadOutRequiredForFormation ||
    methodology.twoBranchAdjacencyRuleTransferToFullThreeAuthorized ||
    methodology.twoBranchLeadOutRuleTransferToFullThreeAuthorized ||
    methodology.deterministicClashBreakDamageSettlementPolicyResolved ||
    methodology.postInteractionBureauStateEmissionAuthorized ||
    methodology.postInteractionEffectiveBureauVerdictAuthorized
  ) {
    return unresolved('METHODOLOGY_NOT_AUTHORIZED', conditionEvidence, methodology, [
      'I44 does not authorize the source-bounded, post-interaction-blocked I45 bureau-formation evidence contract.',
    ]);
  }

  const threeItems = conditionEvidence.items.filter(
    (item) => item.relationKind === 'branch_three_combination',
  );

  if (
    threeItems.some(
      (item) =>
        item.threeBranchCondition === undefined ||
        item.threeBranchCondition.fullMembershipObserved !== true ||
        item.threeBranchCondition.traditionalBureauReferenceElement === undefined,
    )
  ) {
    return unresolved('BUREAU_REFERENCE_UNRESOLVED', conditionEvidence, methodology, [
      'Every routed full-three combination requires aligned I39 full-membership evidence and an I37-derived traditional bureau element before I45 formation identity can be emitted.',
    ]);
  }

  const items: ChallengeRootThreeCombinationBureauFormationEvidenceItem[] = threeItems.map((item) => {
    const condition = item.threeBranchCondition!;
    return {
      mechanism: item.mechanism,
      relationId: item.relationId,
      subjectPosition: item.subjectPosition,
      subjectValue: String(item.subjectValue),
      participantPositions: condition.participantPositions,
      traditionalBureauElement: condition.traditionalBureauReferenceElement!,
      formationState: 'STRUCTURAL_BUREAU_FORMED',
      formationBasis: 'FULL_THREE_BRANCH_MEMBERSHIP',
      fullMembershipObserved: true,
      adjacencyState: condition.adjacencyState,
      adjacencyRequiredForFormation: false,
      leadOutState: condition.leadOutState,
      visibleLeadOutStemPositions: condition.visibleLeadOutStemPositions,
      visibleLeadOutRequiredForFormation: false,
      clashTopology: condition.clashTopology,
      clashCanBreakOrDamageBureau: true,
      clashBreakDamageSettlement: 'not_determined',
      postInteractionBureauState: 'not_determined',
      postInteractionEffectiveBureauVerdict: 'not_determined',
      seasonalCommandEffectOnChallengeForce: 'not_resolved',
      supportInterferenceEffectOnChallengeForce: 'not_resolved',
      competingRelationInteractionSettlement: 'not_determined',
      postCombinationSubjectIdentity: 'not_determined',
      targetPostRelationRootState: 'not_determined',
      effectiveMechanismForceVerdict: 'not_determined',
      relationSpecificUsefulnessHarmfulness: 'not_determined',
      numericScore: 'not_assigned',
    };
  });

  return finalized({
    evidenceVersion: I45_CHALLENGE_ROOT_THREE_COMBINATION_BUREAU_FORMATION_EVIDENCE_VERSION,
    status: 'RESOLVED_STRUCTURAL_BUREAU_FORMATION',
    upstreamI39ReportId: conditionEvidence.reportId,
    upstreamI44ReviewId: methodology.reviewId,
    items,
    allThreeCombinationItemsHaveFormationEvidence: items.length === threeItems.length,
    structuralBureauFormationStateEmissionAuthorized: true,
    postInteractionBureauStateEmissionAuthorized: false,
    postInteractionEffectiveBureauVerdictAuthorized: false,
    adjacencyRequiredForFullThreeFormation: false,
    visibleLeadOutRequiredForFullThreeFormation: false,
    postCombinationSubjectIdentityPolicyResolved: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes: [
      'I45 emits only the I44-authorized structural bureau-formation state for complete branch-three combinations already present in aligned I39 evidence.',
      'The traditional bureau element identifies the formed structural bureau; it does not replace the challenge-root subject or become an effective-force verdict.',
      'Adjacency and visible lead-out remain recorded observations but are not full-three formation prerequisites.',
      'Clash topology remains capable of affecting the formed bureau, but break/damage/settlement and post-interaction bureau state are not evaluated here.',
      'Seasonal, support/interference, competing-relation settlement, post-relation root state, effective force, usefulness/harmfulness, scoring, and classification remain unresolved or unauthorized.',
    ],
  });
}
