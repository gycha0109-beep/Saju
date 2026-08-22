import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeTargetCombinationConditionEvidenceReport } from './i39-challenge-target-combination-condition-evidence.js';
import type { ChallengeRootThreeCombinationBureauFormationEvidenceReport } from './i45-challenge-root-three-combination-bureau-formation-evidence.js';
import type {
  ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationEvidenceReport,
  I65DispatchedRelationVerification,
} from './i65-challenge-combination-support-channel-dispatched-relation-current-chart-settlement-substrate-verification-evidence.js';
import {
  buildI76ChallengeCombinationSupportChannelRelationKindSpecificCombinationBindingInteractionSettlementMethodologyReview,
  type ChallengeCombinationSupportChannelRelationKindSpecificCombinationBindingInteractionSettlementMethodologyReviewReport,
  type I76CombinationInteractionReadiness,
  type I76CombinationSettlementRole,
} from './i76-challenge-combination-support-channel-relation-kind-specific-combination-binding-interaction-settlement-methodology-review.js';

export const I77_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_RELATION_KIND_SPECIFIC_COMBINATION_INTERACTION_EVIDENCE_VERSION =
  'myeonghwa-challenge-combination-support-channel-relation-kind-specific-combination-interaction-evidence-v1';

export type I77CombinationEvidenceReadiness =
  | 'PAIR_LOCAL_KIND_SUBSTRATE_ALIGNED'
  | 'PARTIAL_KIND_SUBSTRATE';

export interface I77RelationKindSpecificCombinationInteractionEvidenceItem {
  mechanism: string;
  role: I76CombinationSettlementRole;
  relationId: string;
  relationKind: 'stem_five_combination' | 'branch_six_combination' | 'branch_three_combination';
  supportSourcePillar: 'year' | 'month' | 'day' | 'hour';
  supportSourceComponent: 'stem' | 'branch';
  supportSourceValue: string;
  kindReadiness: I76CombinationInteractionReadiness;
  pairLocalSettlementSubstrateVerified: boolean;
  conditionEvidenceAligned: boolean;
  conditionEvidenceMatchCount: number;
  structuralBureauFormationState:
    | 'STRUCTURAL_BUREAU_FORMED'
    | 'not_available'
    | 'not_applicable';
  structuralBureauFormationIsBindingVerdict: false;
  evidenceReadiness: I77CombinationEvidenceReadiness;
  bindingVerdict: 'not_determined';
  transformationVerdict: 'not_determined';
  interactionOutcome: 'not_determined';
  neutralizationVerdict: 'not_determined';
  postCombinationSubjectIdentity: 'not_determined';
  precedenceWithinMultiTouch: 'not_determined';
  supportChannelActive: 'not_determined';
  supportChannelPersisted: 'not_determined';
  supportChannelNetEffect: 'not_resolved';
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  numericScore: 'not_assigned';
}

export interface ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionEvidenceReport {
  reportId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_RELATION_KIND_SPECIFIC_COMBINATION_INTERACTION_EVIDENCE'
    | 'I65_UNRESOLVED_OR_INVALID'
    | 'I39_UNRESOLVED_OR_MISALIGNED'
    | 'I45_UNRESOLVED_OR_MISALIGNED'
    | 'I76_METHODOLOGY_NOT_AUTHORIZED';
  upstreamI65ReportId: string;
  upstreamI39ReportId: string;
  upstreamI45ReportId: string;
  upstreamI76ReviewId: string;
  items: readonly I77RelationKindSpecificCombinationInteractionEvidenceItem[];
  relationKindSpecificCombinationInteractionEvidenceAvailable: boolean;
  allCombinationPairsHaveAlignedKindSpecificSubstrate: boolean;
  anyStructuralBureauFormationEvidenceObserved: boolean;
  directBindingOutcomeAuthorized: false;
  genericCombinationSettlementResolverAuthorized: false;
  transformationOutcomeAuthorized: false;
  neutralizationOutcomeAuthorized: false;
  postCombinationSubjectIdentityPolicyResolved: false;
  pairOrderSignificanceAuthorized: false;
  multiTouchAggregationAuthorized: false;
  crossRelationPrecedenceAuthorized: false;
  supportChannelActivationVerdictAuthorized: false;
  supportChannelPersistenceVerdictAuthorized: false;
  supportChannelNetEffectVerdictAuthorized: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionEvidenceReport, 'reportId'>,
): ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionEvidenceReport {
  return {
    reportId: `challenge_combination_support_channel_relation_kind_specific_combination_interaction_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function unresolved(
  status: Exclude<
    ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionEvidenceReport['status'],
    'RESOLVED_RELATION_KIND_SPECIFIC_COMBINATION_INTERACTION_EVIDENCE'
  >,
  i65: ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationEvidenceReport,
  i39: ChallengeTargetCombinationConditionEvidenceReport,
  i45: ChallengeRootThreeCombinationBureauFormationEvidenceReport,
  methodology: ChallengeCombinationSupportChannelRelationKindSpecificCombinationBindingInteractionSettlementMethodologyReviewReport,
  notes: readonly string[],
): ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionEvidenceReport {
  return finalized({
    evidenceVersion:
      I77_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_RELATION_KIND_SPECIFIC_COMBINATION_INTERACTION_EVIDENCE_VERSION,
    status,
    upstreamI65ReportId: i65.reportId,
    upstreamI39ReportId: i39.reportId,
    upstreamI45ReportId: i45.reportId,
    upstreamI76ReviewId: methodology.reviewId,
    items: [],
    relationKindSpecificCombinationInteractionEvidenceAvailable: false,
    allCombinationPairsHaveAlignedKindSpecificSubstrate: false,
    anyStructuralBureauFormationEvidenceObserved: false,
    directBindingOutcomeAuthorized: false,
    genericCombinationSettlementResolverAuthorized: false,
    transformationOutcomeAuthorized: false,
    neutralizationOutcomeAuthorized: false,
    postCombinationSubjectIdentityPolicyResolved: false,
    pairOrderSignificanceAuthorized: false,
    multiTouchAggregationAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    supportChannelActivationVerdictAuthorized: false,
    supportChannelPersistenceVerdictAuthorized: false,
    supportChannelNetEffectVerdictAuthorized: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes,
  });
}

function isCombinationKind(
  kind: I65DispatchedRelationVerification['relationKind'],
): kind is 'stem_five_combination' | 'branch_six_combination' | 'branch_three_combination' {
  return (
    kind === 'stem_five_combination' ||
    kind === 'branch_six_combination' ||
    kind === 'branch_three_combination'
  );
}

function i65Accepted(
  i65: ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationEvidenceReport,
): boolean {
  return (
    i65.status ===
      'RESOLVED_DISPATCHED_RELATION_CURRENT_CHART_SETTLEMENT_SUBSTRATE_VERIFICATION_EVIDENCE' &&
    i65.dispatchedRelationCurrentChartSettlementSubstrateVerificationEvidenceAvailable &&
    i65.anyRoutedSettlementOutcomeResolved === false &&
    i65.pairOrderSignificanceAuthorized === false &&
    i65.multiTouchAggregationAuthorized === false &&
    i65.crossRelationPrecedenceAuthorized === false &&
    i65.contestOutcomeVerdictAuthorized === false &&
    i65.supportChannelActivationVerdictAuthorized === false &&
    i65.supportChannelPersistenceVerdictAuthorized === false &&
    i65.supportChannelNetEffectVerdictAuthorized === false &&
    i65.effectiveMechanismForceVerdict === 'not_determined' &&
    i65.classificationAuthorized === false &&
    i65.numericScoringAuthorized === false
  );
}

function i39Accepted(
  i65: ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationEvidenceReport,
  i39: ChallengeTargetCombinationConditionEvidenceReport,
): boolean {
  return (
    i39.status === 'RESOLVED_CONDITION_EVIDENCE' &&
    i39.upstreamI35ReportId === i65.i35ReportId &&
    i39.challengeSpecificConditionEvidenceAvailable &&
    i39.transformationConditionVerdict === 'not_determined' &&
    i39.challengeTransformationStateEmissionAuthorized === false &&
    i39.combinationBindingStateEmissionAuthorized === false &&
    i39.postCombinationSubjectIdentityPolicyResolved === false &&
    i39.targetPostRelationRootState === 'not_determined' &&
    i39.effectiveMechanismForceVerdict === 'not_determined' &&
    i39.classificationAuthorized === false &&
    i39.numericScoringAuthorized === false
  );
}

function i45Accepted(
  i39: ChallengeTargetCombinationConditionEvidenceReport,
  i45: ChallengeRootThreeCombinationBureauFormationEvidenceReport,
): boolean {
  return (
    i45.status === 'RESOLVED_STRUCTURAL_BUREAU_FORMATION' &&
    i45.upstreamI39ReportId === i39.reportId &&
    i45.structuralBureauFormationStateEmissionAuthorized &&
    i45.postInteractionBureauStateEmissionAuthorized === false &&
    i45.postInteractionEffectiveBureauVerdictAuthorized === false &&
    i45.postCombinationSubjectIdentityPolicyResolved === false &&
    i45.targetPostRelationRootState === 'not_determined' &&
    i45.effectiveMechanismForceVerdict === 'not_determined' &&
    i45.classificationAuthorized === false &&
    i45.numericScoringAuthorized === false
  );
}

function methodologyAccepted(
  methodology: ChallengeCombinationSupportChannelRelationKindSpecificCombinationBindingInteractionSettlementMethodologyReviewReport,
): boolean {
  const canonical =
    buildI76ChallengeCombinationSupportChannelRelationKindSpecificCombinationBindingInteractionSettlementMethodologyReview();
  return (
    methodology.reviewId === canonical.reviewId &&
    methodology.decision ===
      'RELATION_KIND_SPECIFIC_INTERACTION_PATHS_SEPARATED_DIRECT_BINDING_OUTCOME_BLOCKED' &&
    methodology.relationKindAuditComplete &&
    methodology.stemFiveAndBranchSixAndBranchThreeMayShareOneBindingRule === false &&
    methodology.currentAndCompetingCombinationRolesRemainDistinctOutcomeDomains &&
    methodology.kindSpecificStructuralSubstrateReuseAcrossRolesAuthorized &&
    methodology.directBindingOutcomeAdapterAuthorized === false &&
    methodology.genericCombinationSettlementResolverAuthorized === false &&
    methodology.structuralMembershipEqualsBindingAuthorized === false &&
    methodology.structuralBureauFormationEqualsBindingAuthorized === false &&
    methodology.crossRelationPrecedenceAuthorized === false &&
    methodology.classificationAuthorized === false &&
    methodology.numericScoringAuthorized === false
  );
}

function roleFor(relation: I65DispatchedRelationVerification): I76CombinationSettlementRole {
  return relation.isCurrentCombinationRelation ? 'CURRENT_COMBINATION' : 'COMPETING_COMBINATION';
}

function expectedDependency(role: I76CombinationSettlementRole) {
  return role === 'CURRENT_COMBINATION'
    ? 'CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT'
    : 'COMPETING_COMBINATION_BINDING_INTERACTION_SETTLEMENT';
}

function conditionMatches(
  i39: ChallengeTargetCombinationConditionEvidenceReport,
  mechanism: string,
  relation: I65DispatchedRelationVerification,
  sourcePillar: 'year' | 'month' | 'day' | 'hour',
  sourceComponent: 'stem' | 'branch',
  sourceValue: string,
) {
  return i39.items.filter(
    (item) =>
      item.mechanism === mechanism &&
      item.relationId === relation.relationId &&
      item.relationKind === relation.relationKind &&
      item.supportInterference.participantContexts.some(
        (participant) =>
          participant.pillar === sourcePillar &&
          participant.component === sourceComponent &&
          String(participant.value) === sourceValue,
      ),
  );
}

function bureauFormationState(
  i45: ChallengeRootThreeCombinationBureauFormationEvidenceReport,
  mechanism: string,
  relation: I65DispatchedRelationVerification,
): I77RelationKindSpecificCombinationInteractionEvidenceItem['structuralBureauFormationState'] {
  if (relation.relationKind !== 'branch_three_combination') return 'not_applicable';
  return i45.items.some(
    (item) => item.mechanism === mechanism && item.relationId === relation.relationId,
  )
    ? 'STRUCTURAL_BUREAU_FORMED'
    : 'not_available';
}

export function buildI77ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionEvidence(
  i65: ChallengeCombinationSupportChannelDispatchedRelationCurrentChartSettlementSubstrateVerificationEvidenceReport,
  i39: ChallengeTargetCombinationConditionEvidenceReport,
  i45: ChallengeRootThreeCombinationBureauFormationEvidenceReport,
  methodology: ChallengeCombinationSupportChannelRelationKindSpecificCombinationBindingInteractionSettlementMethodologyReviewReport,
): ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionEvidenceReport {
  if (!methodologyAccepted(methodology)) {
    return unresolved('I76_METHODOLOGY_NOT_AUTHORIZED', i65, i39, i45, methodology, [
      'The supplied I76 review must exactly match the canonical relation-kind-specific, direct-outcome-blocked methodology.',
    ]);
  }
  if (!i65Accepted(i65)) {
    return unresolved('I65_UNRESOLVED_OR_INVALID', i65, i39, i45, methodology, [
      'Resolved fail-closed I65 dispatched-relation current-chart substrate evidence is required.',
    ]);
  }
  if (!i39Accepted(i65, i39)) {
    return unresolved('I39_UNRESOLVED_OR_MISALIGNED', i65, i39, i45, methodology, [
      'Resolved I39 condition evidence must be aligned to the exact I35 report consumed by I65.',
    ]);
  }
  if (!i45Accepted(i39, i45)) {
    return unresolved('I45_UNRESOLVED_OR_MISALIGNED', i65, i39, i45, methodology, [
      'Resolved I45 structural bureau-formation evidence aligned to the exact I39 report is required, even when no branch-three item is present.',
    ]);
  }

  const items: I77RelationKindSpecificCombinationInteractionEvidenceItem[] = [];

  for (const supportItem of i65.items) {
    for (const relation of supportItem.dispatchedRelationVerification) {
      if (!isCombinationKind(relation.relationKind)) continue;
      const role = roleFor(relation);
      const dependency = relation.dependencyVerification.find(
        (candidate) => candidate.dependency === expectedDependency(role),
      );
      const conditionCandidates = conditionMatches(
        i39,
        String(supportItem.mechanism),
        relation,
        supportItem.sourcePillar,
        supportItem.sourceComponent,
        supportItem.sourceValue,
      );
      const kindPolicy = methodology.kindPolicies.find(
        (policy) => policy.relationKind === relation.relationKind,
      );
      if (kindPolicy === undefined) continue;

      const structuralBureauFormationState = bureauFormationState(
        i45,
        String(supportItem.mechanism),
        relation,
      );
      const pairLocalSettlementSubstrateVerified =
        dependency?.currentChartSettlementSubstrateVerified === true;
      const conditionEvidenceAligned = conditionCandidates.length > 0;
      const bureauRequirementSatisfied =
        relation.relationKind !== 'branch_three_combination' ||
        structuralBureauFormationState === 'STRUCTURAL_BUREAU_FORMED';
      const evidenceReadiness: I77CombinationEvidenceReadiness =
        pairLocalSettlementSubstrateVerified && conditionEvidenceAligned && bureauRequirementSatisfied
          ? 'PAIR_LOCAL_KIND_SUBSTRATE_ALIGNED'
          : 'PARTIAL_KIND_SUBSTRATE';

      items.push({
        mechanism: String(supportItem.mechanism),
        role,
        relationId: relation.relationId,
        relationKind: relation.relationKind,
        supportSourcePillar: supportItem.sourcePillar,
        supportSourceComponent: supportItem.sourceComponent,
        supportSourceValue: supportItem.sourceValue,
        kindReadiness: kindPolicy.readiness,
        pairLocalSettlementSubstrateVerified,
        conditionEvidenceAligned,
        conditionEvidenceMatchCount: conditionCandidates.length,
        structuralBureauFormationState,
        structuralBureauFormationIsBindingVerdict: false,
        evidenceReadiness,
        bindingVerdict: 'not_determined',
        transformationVerdict: 'not_determined',
        interactionOutcome: 'not_determined',
        neutralizationVerdict: 'not_determined',
        postCombinationSubjectIdentity: 'not_determined',
        precedenceWithinMultiTouch: 'not_determined',
        supportChannelActive: 'not_determined',
        supportChannelPersisted: 'not_determined',
        supportChannelNetEffect: 'not_resolved',
        targetPostRelationRootState: 'not_determined',
        effectiveMechanismForceVerdict: 'not_determined',
        relationSpecificUsefulnessHarmfulness: 'not_determined',
        numericScore: 'not_assigned',
      });
    }
  }

  items.sort((left, right) =>
    [
      left.mechanism,
      left.role,
      left.relationId,
      left.supportSourcePillar,
      left.supportSourceComponent,
      left.supportSourceValue,
    ]
      .join('|')
      .localeCompare(
        [
          right.mechanism,
          right.role,
          right.relationId,
          right.supportSourcePillar,
          right.supportSourceComponent,
          right.supportSourceValue,
        ].join('|'),
      ),
  );

  return finalized({
    evidenceVersion:
      I77_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_RELATION_KIND_SPECIFIC_COMBINATION_INTERACTION_EVIDENCE_VERSION,
    status: 'RESOLVED_RELATION_KIND_SPECIFIC_COMBINATION_INTERACTION_EVIDENCE',
    upstreamI65ReportId: i65.reportId,
    upstreamI39ReportId: i39.reportId,
    upstreamI45ReportId: i45.reportId,
    upstreamI76ReviewId: methodology.reviewId,
    items,
    relationKindSpecificCombinationInteractionEvidenceAvailable: true,
    allCombinationPairsHaveAlignedKindSpecificSubstrate: items.every(
      (item) => item.evidenceReadiness === 'PAIR_LOCAL_KIND_SUBSTRATE_ALIGNED',
    ),
    anyStructuralBureauFormationEvidenceObserved: items.some(
      (item) => item.structuralBureauFormationState === 'STRUCTURAL_BUREAU_FORMED',
    ),
    directBindingOutcomeAuthorized: false,
    genericCombinationSettlementResolverAuthorized: false,
    transformationOutcomeAuthorized: false,
    neutralizationOutcomeAuthorized: false,
    postCombinationSubjectIdentityPolicyResolved: false,
    pairOrderSignificanceAuthorized: false,
    multiTouchAggregationAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    supportChannelActivationVerdictAuthorized: false,
    supportChannelPersistenceVerdictAuthorized: false,
    supportChannelNetEffectVerdictAuthorized: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes: [
      'I77 materializes I76 relation-kind readiness only for exact I65-dispatched combination pairs and aligned I39/I45 current-chart evidence.',
      'PAIR_LOCAL_KIND_SUBSTRATE_ALIGNED is an evidence-readiness state, not a binding, transformation, interaction-outcome, neutralization, or post-relation verdict.',
      'Branch-three STRUCTURAL_BUREAU_FORMED is preserved only as I45-authorized pre-settlement evidence and never converted to BOUND or post-interaction effective bureau.',
      'Current and competing combination roles remain separate, pair-local, unordered outcome domains. Cross-relation precedence and support-channel activation/persistence remain unauthorized.',
    ],
  });
}
