import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport } from './i47-challenge-root-three-combination-clash-placement-settlement-evidence.js';
import type { ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionOutcomePromotionReadinessReviewReport } from './i78-challenge-combination-support-channel-relation-kind-specific-combination-interaction-outcome-promotion-readiness-review.js';
import {
  buildI79ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementAuthorityApplicabilityReview,
  type ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementAuthorityApplicabilityReviewReport,
  type I79BranchThreeNarrowAuthorityApplicabilityItem,
} from './i79-challenge-combination-support-channel-branch-three-narrow-post-interaction-settlement-authority-applicability-review.js';

export const I80_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_BRANCH_THREE_NARROW_POST_INTERACTION_SETTLEMENT_EVIDENCE_VERSION =
  'myeonghwa-challenge-combination-support-channel-branch-three-narrow-post-interaction-settlement-evidence-v1';

export type I80BranchThreeNarrowSettlementEvidenceState =
  | 'NOT_APPLICABLE'
  | 'I47_EXACT_BUREAU_MATCH_NOT_FOUND'
  | 'I47_EXACT_BUREAU_MATCH_AMBIGUOUS'
  | 'I47_MATCH_PRESENT_NO_DETERMINISTIC_BREAK'
  | 'NARROW_DIRECT_BREAK_STATE_VERIFIED';

export interface I80BranchThreeNarrowSettlementEvidenceItem {
  mechanism: string;
  role: I79BranchThreeNarrowAuthorityApplicabilityItem['role'];
  relationId: string;
  relationKind: I79BranchThreeNarrowAuthorityApplicabilityItem['relationKind'];
  applicability: I79BranchThreeNarrowAuthorityApplicabilityItem['applicability'];
  evidenceState: I80BranchThreeNarrowSettlementEvidenceState;
  i47ExactMatchCount: number;
  i47ExactBureauIdentityMatched: boolean;
  i47DeterministicBreakStateMatched: boolean;
  narrowPostInteractionBureauState:
    | 'BROKEN_BY_TIGHT_EMBEDDED_CLASH'
    | 'not_determined'
    | 'not_applicable';
  narrowPostInteractionBureauStateBasis:
    | 'SINGLE_SOURCE_BOUNDED_TIGHT_EMBEDDED_CLASH'
    | 'NO_DETERMINISTIC_STATE_FROM_I46'
    | 'not_applicable';
  contextualAmbiguityPreserved: boolean;
  bindingVerdict: 'not_determined';
  transformationVerdict: 'not_determined';
  interactionOutcome: 'not_determined';
  neutralizationVerdict: 'not_determined';
  postCombinationSubjectIdentity: 'not_determined';
  precedenceWithinMultiTouch: 'not_determined';
  supportChannelActive: 'not_determined';
  supportChannelPersisted: 'not_determined';
  supportChannelDestroyed: 'not_determined';
  supportChannelNetEffect: 'not_resolved';
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  numericScore: 'not_assigned';
}

export interface ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementEvidenceReport {
  reportId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_BRANCH_THREE_NARROW_POST_INTERACTION_SETTLEMENT_EVIDENCE'
    | 'I78_UNRESOLVED_OR_INVALID'
    | 'I79_METHODOLOGY_NOT_CANONICAL'
    | 'I47_UNRESOLVED_OR_INVALID';
  upstreamI78ReviewId: string;
  upstreamI79ReviewId: string;
  i47ReportId: string;
  items: readonly I80BranchThreeNarrowSettlementEvidenceItem[];
  narrowPostInteractionSettlementEvidenceAvailable: boolean;
  anyNarrowDirectBreakStateVerified: boolean;
  allEligibleBranchThreeCandidatesHaveUniqueI47Match: boolean;
  i48ContextualAmbiguityPreserved: true;
  narrowBreakStateIsBureauLevelOnly: true;
  narrowBreakStateMayBePromotedToBindingOutcome: false;
  narrowBreakStateMayBePromotedToTransformationOutcome: false;
  narrowBreakStateMayBePromotedToGenericInteractionOutcome: false;
  narrowBreakStateMayBePromotedToNeutralizationOutcome: false;
  narrowBreakStateMayBePromotedToSupportSourceDestroyed: false;
  absenceOfNarrowBreakMeansIntactAuthorized: false;
  absenceOfNarrowBreakMeansDamagedAuthorized: false;
  genericCombinationSettlementResolverAuthorized: false;
  directBindingOutcomeAuthorized: false;
  transformationOutcomeAuthorized: false;
  neutralizationOutcomeAuthorized: false;
  noEffectOutcomeAuthorized: false;
  postCombinationSubjectIdentityPolicyResolved: false;
  pairOrderSignificanceAuthorized: false;
  multiTouchAggregationAuthorized: false;
  crossRelationPrecedenceAuthorized: false;
  supportChannelActivationVerdictAuthorized: false;
  supportChannelPersistenceVerdictAuthorized: false;
  supportChannelDestructionVerdictAuthorized: false;
  supportChannelNetEffectVerdictAuthorized: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  notes: readonly string[];
}

function finalized(
  material: Omit<
    ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementEvidenceReport,
    'reportId'
  >,
): ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementEvidenceReport {
  return {
    reportId: `challenge_combination_support_channel_branch_three_narrow_settlement_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function unresolved(
  status: Exclude<
    ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementEvidenceReport['status'],
    'RESOLVED_BRANCH_THREE_NARROW_POST_INTERACTION_SETTLEMENT_EVIDENCE'
  >,
  i78: ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionOutcomePromotionReadinessReviewReport,
  i79: ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementAuthorityApplicabilityReviewReport,
  i47: ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport,
  notes: readonly string[],
): ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementEvidenceReport {
  return finalized({
    evidenceVersion:
      I80_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_BRANCH_THREE_NARROW_POST_INTERACTION_SETTLEMENT_EVIDENCE_VERSION,
    status,
    upstreamI78ReviewId: i78.reviewId,
    upstreamI79ReviewId: i79.reviewId,
    i47ReportId: i47.reportId,
    items: [],
    narrowPostInteractionSettlementEvidenceAvailable: false,
    anyNarrowDirectBreakStateVerified: false,
    allEligibleBranchThreeCandidatesHaveUniqueI47Match: false,
    i48ContextualAmbiguityPreserved: true,
    narrowBreakStateIsBureauLevelOnly: true,
    narrowBreakStateMayBePromotedToBindingOutcome: false,
    narrowBreakStateMayBePromotedToTransformationOutcome: false,
    narrowBreakStateMayBePromotedToGenericInteractionOutcome: false,
    narrowBreakStateMayBePromotedToNeutralizationOutcome: false,
    narrowBreakStateMayBePromotedToSupportSourceDestroyed: false,
    absenceOfNarrowBreakMeansIntactAuthorized: false,
    absenceOfNarrowBreakMeansDamagedAuthorized: false,
    genericCombinationSettlementResolverAuthorized: false,
    directBindingOutcomeAuthorized: false,
    transformationOutcomeAuthorized: false,
    neutralizationOutcomeAuthorized: false,
    noEffectOutcomeAuthorized: false,
    postCombinationSubjectIdentityPolicyResolved: false,
    pairOrderSignificanceAuthorized: false,
    multiTouchAggregationAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    supportChannelActivationVerdictAuthorized: false,
    supportChannelPersistenceVerdictAuthorized: false,
    supportChannelDestructionVerdictAuthorized: false,
    supportChannelNetEffectVerdictAuthorized: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes,
  });
}

function i78Accepted(
  i78: ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionOutcomePromotionReadinessReviewReport,
): boolean {
  return (
    i78.status === 'RESOLVED_OUTCOME_PROMOTION_READINESS' &&
    i78.decision === 'KIND_SPECIFIC_SUBSTRATE_AVAILABLE_DIRECT_BINDING_OUTCOME_PROMOTION_BLOCKED' &&
    i78.anyDirectOutcomePromotionReady === false &&
    i78.narrowBranchThreePostInteractionAuthorityAuditAuthorized &&
    i78.directBindingOutcomeAuthorized === false &&
    i78.transformationOutcomeAuthorized === false &&
    i78.neutralizationOutcomeAuthorized === false &&
    i78.noEffectOutcomeAuthorized === false &&
    i78.crossRelationPrecedenceAuthorized === false &&
    i78.supportChannelActivationVerdictAuthorized === false &&
    i78.supportChannelPersistenceVerdictAuthorized === false &&
    i78.supportChannelNetEffectVerdictAuthorized === false &&
    i78.effectiveMechanismForceVerdict === 'not_determined' &&
    i78.classificationAuthorized === false &&
    i78.numericScoringAuthorized === false
  );
}

function i79Canonical(
  i78: ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionOutcomePromotionReadinessReviewReport,
  i79: ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementAuthorityApplicabilityReviewReport,
): boolean {
  const expected =
    buildI79ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementAuthorityApplicabilityReview(
      i78,
    );
  return (
    i79.reviewId === expected.reviewId &&
    i79.status === 'RESOLVED_BRANCH_THREE_NARROW_AUTHORITY_APPLICABILITY' &&
    i79.decision ===
      'NARROW_I47_DIRECT_BREAK_REUSE_AUTHORIZED_EXACT_BUREAU_IDENTITY_ONLY_GENERIC_OUTCOME_BLOCKED' &&
    i79.exactI47BureauIdentityMatchRequired &&
    i79.exactI47DeterministicStateMatchRequired &&
    i79.eligibleI47PostInteractionBureauState === 'BROKEN_BY_TIGHT_EMBEDDED_CLASH' &&
    i79.i47TightEmbeddedBreakStateReuseAuthorized &&
    i79.i48ContextualAmbiguityMustBePreserved &&
    i79.narrowBreakStateMayBePromotedToBindingOutcome === false &&
    i79.narrowBreakStateMayBePromotedToGenericInteractionOutcome === false &&
    i79.narrowBreakStateMayBePromotedToSupportSourceDestroyed === false &&
    i79.crossRelationPrecedenceAuthorized === false &&
    i79.classificationAuthorized === false &&
    i79.numericScoringAuthorized === false
  );
}

function i47Accepted(i47: ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport): boolean {
  return (
    i47.status === 'RESOLVED_CLASH_PLACEMENT_SETTLEMENT_EVIDENCE' &&
    i47.placementClassificationAvailable &&
    i47.tightEmbeddedBreakStateEmissionAuthorized &&
    i47.genericPostInteractionBureauStateEmissionAuthorized === false &&
    i47.damagedBureauMagnitudeClassificationAuthorized === false &&
    i47.multipleClashAggregationAuthorized === false &&
    i47.targetPostRelationRootState === 'not_determined' &&
    i47.effectiveMechanismForceVerdict === 'not_determined' &&
    i47.classificationAuthorized === false &&
    i47.numericScoringAuthorized === false &&
    i47.items.every(
      (item) =>
        item.formationState === 'STRUCTURAL_BUREAU_FORMED' &&
        item.genericIntactOrDamagedVerdict === 'not_determined' &&
        item.seasonalOverrideResolved === false &&
        item.supportOverrideResolved === false &&
        item.targetPostRelationRootState === 'not_determined' &&
        item.effectiveMechanismForceVerdict === 'not_determined' &&
        item.numericScore === 'not_assigned',
    )
  );
}

function materialize(
  applicabilityItem: I79BranchThreeNarrowAuthorityApplicabilityItem,
  i47: ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport,
): I80BranchThreeNarrowSettlementEvidenceItem {
  const eligible =
    applicabilityItem.applicability === 'EXACT_I47_BUREAU_IDENTITY_AND_STATE_MATCH_REQUIRED';
  const matches = eligible
    ? i47.items.filter(
        (candidate) =>
          String(candidate.mechanism) === applicabilityItem.mechanism &&
          candidate.formationRelationId === applicabilityItem.relationId,
      )
    : [];

  let evidenceState: I80BranchThreeNarrowSettlementEvidenceState = 'NOT_APPLICABLE';
  let narrowPostInteractionBureauState: I80BranchThreeNarrowSettlementEvidenceItem['narrowPostInteractionBureauState'] =
    'not_applicable';
  let narrowPostInteractionBureauStateBasis: I80BranchThreeNarrowSettlementEvidenceItem['narrowPostInteractionBureauStateBasis'] =
    'not_applicable';
  let i47ExactBureauIdentityMatched = false;
  let i47DeterministicBreakStateMatched = false;
  let contextualAmbiguityPreserved = false;

  if (eligible) {
    narrowPostInteractionBureauState = 'not_determined';
    narrowPostInteractionBureauStateBasis = 'NO_DETERMINISTIC_STATE_FROM_I46';
    contextualAmbiguityPreserved = true;
    if (matches.length === 0) {
      evidenceState = 'I47_EXACT_BUREAU_MATCH_NOT_FOUND';
    } else if (matches.length > 1) {
      evidenceState = 'I47_EXACT_BUREAU_MATCH_AMBIGUOUS';
    } else {
      const match = matches[0]!;
      i47ExactBureauIdentityMatched = true;
      if (
        match.postInteractionBureauState === 'BROKEN_BY_TIGHT_EMBEDDED_CLASH' &&
        match.postInteractionBureauStateBasis === 'SINGLE_SOURCE_BOUNDED_TIGHT_EMBEDDED_CLASH'
      ) {
        evidenceState = 'NARROW_DIRECT_BREAK_STATE_VERIFIED';
        i47DeterministicBreakStateMatched = true;
        narrowPostInteractionBureauState = 'BROKEN_BY_TIGHT_EMBEDDED_CLASH';
        narrowPostInteractionBureauStateBasis = 'SINGLE_SOURCE_BOUNDED_TIGHT_EMBEDDED_CLASH';
        contextualAmbiguityPreserved = false;
      } else {
        evidenceState = 'I47_MATCH_PRESENT_NO_DETERMINISTIC_BREAK';
      }
    }
  }

  return {
    mechanism: applicabilityItem.mechanism,
    role: applicabilityItem.role,
    relationId: applicabilityItem.relationId,
    relationKind: applicabilityItem.relationKind,
    applicability: applicabilityItem.applicability,
    evidenceState,
    i47ExactMatchCount: matches.length,
    i47ExactBureauIdentityMatched,
    i47DeterministicBreakStateMatched,
    narrowPostInteractionBureauState,
    narrowPostInteractionBureauStateBasis,
    contextualAmbiguityPreserved,
    bindingVerdict: 'not_determined',
    transformationVerdict: 'not_determined',
    interactionOutcome: 'not_determined',
    neutralizationVerdict: 'not_determined',
    postCombinationSubjectIdentity: 'not_determined',
    precedenceWithinMultiTouch: 'not_determined',
    supportChannelActive: 'not_determined',
    supportChannelPersisted: 'not_determined',
    supportChannelDestroyed: 'not_determined',
    supportChannelNetEffect: 'not_resolved',
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    numericScore: 'not_assigned',
  };
}

export function buildI80ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementEvidence(
  i78: ChallengeCombinationSupportChannelRelationKindSpecificCombinationInteractionOutcomePromotionReadinessReviewReport,
  i79: ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementAuthorityApplicabilityReviewReport,
  i47: ChallengeRootThreeCombinationClashPlacementSettlementEvidenceReport,
): ChallengeCombinationSupportChannelBranchThreeNarrowPostInteractionSettlementEvidenceReport {
  if (!i78Accepted(i78)) {
    return unresolved('I78_UNRESOLVED_OR_INVALID', i78, i79, i47, [
      'Resolved fail-closed I78 outcome-promotion readiness is required before I80 evidence materialization.',
    ]);
  }
  if (!i79Canonical(i78, i79)) {
    return unresolved('I79_METHODOLOGY_NOT_CANONICAL', i78, i79, i47, [
      'I79 must be the canonical applicability review deterministically derived from the supplied I78 report.',
    ]);
  }
  if (!i47Accepted(i47)) {
    return unresolved('I47_UNRESOLVED_OR_INVALID', i78, i79, i47, [
      'Resolved fail-closed I47 clash-placement settlement evidence is required before narrow direct-break evidence can be matched.',
    ]);
  }

  const items = i79.items.map((item) => materialize(item, i47));
  const eligible = items.filter(
    (item) => item.applicability === 'EXACT_I47_BUREAU_IDENTITY_AND_STATE_MATCH_REQUIRED',
  );

  return finalized({
    evidenceVersion:
      I80_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_BRANCH_THREE_NARROW_POST_INTERACTION_SETTLEMENT_EVIDENCE_VERSION,
    status: 'RESOLVED_BRANCH_THREE_NARROW_POST_INTERACTION_SETTLEMENT_EVIDENCE',
    upstreamI78ReviewId: i78.reviewId,
    upstreamI79ReviewId: i79.reviewId,
    i47ReportId: i47.reportId,
    items,
    narrowPostInteractionSettlementEvidenceAvailable: true,
    anyNarrowDirectBreakStateVerified: items.some(
      (item) => item.evidenceState === 'NARROW_DIRECT_BREAK_STATE_VERIFIED',
    ),
    allEligibleBranchThreeCandidatesHaveUniqueI47Match:
      eligible.length > 0 && eligible.every((item) => item.i47ExactMatchCount === 1),
    i48ContextualAmbiguityPreserved: true,
    narrowBreakStateIsBureauLevelOnly: true,
    narrowBreakStateMayBePromotedToBindingOutcome: false,
    narrowBreakStateMayBePromotedToTransformationOutcome: false,
    narrowBreakStateMayBePromotedToGenericInteractionOutcome: false,
    narrowBreakStateMayBePromotedToNeutralizationOutcome: false,
    narrowBreakStateMayBePromotedToSupportSourceDestroyed: false,
    absenceOfNarrowBreakMeansIntactAuthorized: false,
    absenceOfNarrowBreakMeansDamagedAuthorized: false,
    genericCombinationSettlementResolverAuthorized: false,
    directBindingOutcomeAuthorized: false,
    transformationOutcomeAuthorized: false,
    neutralizationOutcomeAuthorized: false,
    noEffectOutcomeAuthorized: false,
    postCombinationSubjectIdentityPolicyResolved: false,
    pairOrderSignificanceAuthorized: false,
    multiTouchAggregationAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    supportChannelActivationVerdictAuthorized: false,
    supportChannelPersistenceVerdictAuthorized: false,
    supportChannelDestructionVerdictAuthorized: false,
    supportChannelNetEffectVerdictAuthorized: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    notes: [
      'I80 materializes only exact mechanism + branch-three formationRelationId matches between canonical I79 candidates and I47 evidence.',
      'BROKEN_BY_TIGHT_EMBEDDED_CLASH is emitted only when the exact I47 item itself emitted that state with SINGLE_SOURCE_BOUNDED_TIGHT_EMBEDDED_CLASH basis.',
      'An exact I47 match whose postInteractionBureauState remains not_determined stays unresolved and preserves I48 contextual ambiguity. No intact or damaged inverse inference is permitted.',
      'Missing or duplicate exact I47 matches are explicit evidence states rather than permission to guess or aggregate.',
      'The narrow break state remains a bureau-level post-interaction fact only and does not establish binding, transformation, generic interaction outcome, neutralization, support-source destruction, activation/persistence, net effect, post-relation root state, effective force, scoring, or classification.',
    ],
  });
}
