import { describe, expect, it } from 'vitest';
import {
  I233_COMPETING_RELATION_SETTLEMENT_AUTHORITY_REQUIREMENT_IDS,
  I233_REPOSITORY_BOUNDARY_REFS,
  I233_REQUIREMENTS_REVIEW_CONTROL_IDS,
  buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview,
} from '../src/research/i233-challenge-combination-support-channel-competing-relation-settlement-authority-gap-requirements-review.js';

describe('I233 competing-relation settlement authority-gap requirements review', () => {
  it('freezes the exact I55/I63/I69/I78/I81/I26-v24 repository boundary without resolving settlement', () => {
    const report = buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview();
    expect(report.status).toBe('RESOLVED_COMPETING_RELATION_SETTLEMENT_AUTHORITY_GAP_REQUIREMENTS_REVIEW');
    expect(report.decision).toBe(
      'COMPETING_RELATION_SETTLEMENT_AUTHORITY_ACCEPTANCE_CONTRACT_FROZEN_EIGHT_REQUIREMENTS_NO_PRECEDENCE_AGGREGATION_OR_NET_EFFECT_AUTHORITY_ACQUIRED',
    );
    expect(report.repositoryBoundaryRefs).toEqual(I233_REPOSITORY_BOUNDARY_REFS);
    expect(report.repositoryBoundaryRefCount).toBe(6);
    expect(report.I55CompetingRelationSettlementRequirementPreserved).toBe(true);
    expect(report.I26V24CompetingRelationSettlementGapRemainsOpen).toBe(true);
    expect(report.competingRelationSettlementResolved).toBe(false);
  });

  it('freezes all eight mandatory authority requirements as normatively unsatisfied', () => {
    const report = buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview();
    expect(report.requirements.map((item) => item.requirementId)).toEqual(
      I233_COMPETING_RELATION_SETTLEMENT_AUTHORITY_REQUIREMENT_IDS,
    );
    expect(report.requirementCount).toBe(8);
    expect(report.allRequirementsMandatory).toBe(true);
    expect(report.allRequirementsCurrentlyUnsatisfiedByNormativeAuthority).toBe(true);
    expect(report.requirementsFrozenProspectively).toBe(true);
    expect(report.requirements.every((item) => item.mandatory)).toBe(true);
    expect(report.requirements.every((item) => item.currentlySatisfiedByNormativeAuthority === false)).toBe(true);
  });

  it('preserves existing exact relation-pair, role, and multi-touch topology only as substrate', () => {
    const report = buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview();
    expect(report.I63TouchSpecificDispatchSubstratePreserved).toBe(true);
    expect(report.exactRelationIdKindPairSubstrateAvailable).toBe(true);
    expect(report.currentVsCompetingRoleMetadataAvailable).toBe(true);
    expect(report.multipleTouchTopologySubstrateAvailable).toBe(true);
    expect(report.I63CrossRelationPrecedenceAuthorized).toBe(false);
    expect(report.I69PairLocalRelativeForceIsCrossRelationPrecedence).toBe(false);
    expect(report.I78KindSpecificCombinationSubstrateIsGenericCompetingRelationSettlement).toBe(false);
    expect(report.I81NarrowBranchThreeBureauStateIsGenericCompetingRelationSettlement).toBe(false);
  });

  it('requires explicit precedence or coexistence semantics while separating ordering from outcomes and net effect', () => {
    const report = buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview();
    expect(report.futureAuthorityMustBindToExactMultiTouchScope).toBe(true);
    expect(report.futureAuthorityMustPreserveRelationIdKindAndRole).toBe(true);
    expect(report.futureAuthorityMustDefinePrecedenceOrCoexistenceSemantics).toBe(true);
    expect(report.futureAuthorityMustSeparateOrderingFromRelationOutcome).toBe(true);
    expect(report.futureAuthorityMustSeparateOrderingFromNetSupportEffect).toBe(true);
    expect(report.futureAuthorityMustDefineContextAndExceptions).toBe(true);
    expect(report.futureAuthorityMustDefineTieConflictOrUnresolvedDisposition).toBe(true);
  });

  it('forbids inferred precedence from relation count, pair order, aggregation, synthesis, or calibration', () => {
    const report = buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview();
    expect(report.relationTouchCountMayCreatePrecedence).toBe(false);
    expect(report.pairOrderMayBeAssumedSignificant).toBe(false);
    expect(report.multiTouchAggregationAuthorized).toBe(false);
    expect(report.crossRelationPrecedenceAuthorized).toBe(false);
    expect(report.searchSnippetMayCountAsAuthority).toBe(false);
    expect(report.modelSynthesisMayCountAsAuthority).toBe(false);
    expect(report.generalKnowledgeMayCountAsAuthority).toBe(false);
    expect(report.empiricalCalibrationMayCreateAuthority).toBe(false);
  });

  it('preserves effect-resolution guards downstream of the competing-relation gap', () => {
    const report = buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview();
    expect(report.touchSpecificSettlementOutcomeResolvedByThisGate).toBe(false);
    expect(report.supportChannelActivationVerdictAuthorized).toBe(false);
    expect(report.supportChannelPersistenceVerdictAuthorized).toBe(false);
    expect(report.supportChannelDestructionVerdictAuthorized).toBe(false);
    expect(report.supportChannelNetEffectVerdictAuthorized).toBe(false);
    expect(report.targetPostRelationRootState).toBe('not_determined');
    expect(report.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(report.relationSpecificUsefulnessHarmfulness).toBe('not_determined');
  });

  it('keeps I232, I132, Qu Wei, Li 1998, v2, and production guards unchanged', () => {
    const report = buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview();
    expect(report.hiddenStemI232HoldPreserved).toBe(true);
    expect(report.hiddenStemTrackReopenedByThisGate).toBe(false);
    expect(report.hiddenStemAuthorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.quWei2001HoldPreserved).toBe(true);
    expect(report.li1998SameTargetPathSuspendedNotRetired).toBe(true);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(report.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(report.currentV2ProvenanceDisposition).toBe('BLOCKED_UNDER_CURRENT_EVIDENCE');
    expect(report.candidateSetMutatedByThisGate).toBe(false);
    expect(report.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.damageEvaluationAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
  });

  it('freezes fifteen controls, authorizes discovery readiness only, and is deterministic', () => {
    const first = buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview();
    const second = buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview();
    expect(first.reviewId).toBe(second.reviewId);
    expect(first.requirementsReviewControlIds).toEqual(I233_REQUIREMENTS_REVIEW_CONTROL_IDS);
    expect(first.requirementsReviewControlCount).toBe(15);
    expect(first.requirementsReviewControlsFrozen).toBe(true);
    expect(first.candidateDiscoveryReadinessReviewAuthorized).toBe(true);
    expect(first.candidateDiscoveryExecutedByThisGate).toBe(false);
    expect(first.authorityAcquiredByThisGate).toBe(false);
    expect(first.recommendedNextGate).toBe('COMPETING_RELATION_SETTLEMENT_AUTHORITY_DISCOVERY_READINESS_REVIEW');
  });
});
