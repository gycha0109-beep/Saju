import { describe, expect, it } from 'vitest';
import {
  I233_COMPETING_RELATION_SETTLEMENT_AUTHORITY_REQUIREMENT_IDS,
  I233_REQUIREMENTS_REVIEW_CONTROL_IDS,
  buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview,
} from '../src/research/i233-challenge-combination-support-channel-competing-relation-settlement-authority-gap-requirements-review.js';
import {
  I234_COMPETING_RELATION_SETTLEMENT_DISCOVERY_PATH_IDS,
  I234_DISCOVERY_CONTROL_IDS,
  buildI234ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryReadinessReview,
} from '../src/research/i234-challenge-combination-support-channel-competing-relation-settlement-authority-discovery-readiness-review.js';

describe('I234 competing-relation settlement authority discovery readiness review', () => {
  it('accepts the exact canonical I233 boundary and opens discovery readiness only', () => {
    const i233 = buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview();
    const report = buildI234ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryReadinessReview(i233);
    expect(report.status).toBe('RESOLVED_COMPETING_RELATION_SETTLEMENT_AUTHORITY_DISCOVERY_READINESS_REVIEW');
    expect(report.decision).toBe(
      'FIVE_COMPETING_RELATION_AUTHORITY_DISCOVERY_PATHS_SEVENTEEN_CONTROLS_FROZEN_NO_DISCOVERY_EXECUTED_NO_PRECEDENCE_AGGREGATION_OR_NET_EFFECT_AUTHORITY_ACQUIRED',
    );
    expect(report.exactI233BoundaryAccepted).toBe(true);
    expect(report.discoveryAuthorized).toBe(true);
    expect(report.discoveryExecutedByThisGate).toBe(false);
    expect(report.authorityGap).toBe('COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED');
    expect(report.authorityGapClosed).toBe(false);
  });

  it('preserves all eight I233 requirements and all fifteen I233 controls exactly', () => {
    const report = buildI234ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryReadinessReview(
      buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview(),
    );
    expect(report.I233RequirementIds).toEqual(I233_COMPETING_RELATION_SETTLEMENT_AUTHORITY_REQUIREMENT_IDS);
    expect(report.I233RequirementCount).toBe(8);
    expect(report.I233RequirementsFrozenAccepted).toBe(true);
    expect(report.I233ControlIds).toEqual(I233_REQUIREMENTS_REVIEW_CONTROL_IDS);
    expect(report.I233ControlCount).toBe(15);
    expect(report.I233ControlsFrozenAccepted).toBe(true);
  });

  it('freezes five discovery paths and seventeen controls', () => {
    const report = buildI234ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryReadinessReview(
      buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview(),
    );
    expect(report.discoveryPaths.map((path) => path.pathId)).toEqual(
      I234_COMPETING_RELATION_SETTLEMENT_DISCOVERY_PATH_IDS,
    );
    expect(report.discoveryPathCount).toBe(5);
    expect(report.allDiscoveryPathsAuthorized).toBe(true);
    expect(report.discoveryPathSetFrozen).toBe(true);
    expect(report.discoveryControlIds).toEqual(I234_DISCOVERY_CONTROL_IDS);
    expect(report.discoveryControlCount).toBe(17);
    expect(report.discoveryControlsFrozen).toBe(true);
    expect(report.discoveryPaths.every((path) => path.discoveryExecutedByThisGate === false)).toBe(true);
  });

  it('requires direct source-bound positive evidence and keeps snippets, indexes, and examples non-authoritative', () => {
    const report = buildI234ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryReadinessReview(
      buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview(),
    );
    expect(report.directSourceTextRequiredForPositiveAuthorityFinding).toBe(true);
    expect(report.exactSourceIdentityRequired).toBe(true);
    expect(report.originalOrVerifiedSourceContextRequired).toBe(true);
    expect(report.reproducibleLocatorRequired).toBe(true);
    expect(report.searchSnippetMayEstablishPositiveAuthorityFinding).toBe(false);
    expect(report.indexResultMayEstablishPositiveAuthorityFinding).toBe(false);
    expect(report.workedExampleMayBecomeGeneralRuleWithoutRuleLanguage).toBe(false);
    expect(report.genericRelationDescriptionMaySatisfyMultiRelationSettlementScope).toBe(false);
  });

  it('forbids local evidence, relation count, pair order, numeric weighting, voting, and source count from creating precedence', () => {
    const report = buildI234ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryReadinessReview(
      buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview(),
    );
    expect(report.clashLocalRelativeForceMayCreateCrossRelationPrecedence).toBe(false);
    expect(report.combinationLocalBureauStateMayCreateCrossRelationPrecedence).toBe(false);
    expect(report.relationTouchCountMayCreatePrecedence).toBe(false);
    expect(report.pairOrderMayCreatePrecedence).toBe(false);
    expect(report.numericWeightingAuthorized).toBe(false);
    expect(report.majorityVoteAuthorized).toBe(false);
    expect(report.sourceCountMayCreatePrecedence).toBe(false);
    expect(report.crossSourceCompositionAuthorizedByThisGate).toBe(false);
    expect(report.semanticBridgeInferenceAuthorizedByThisGate).toBe(false);
  });

  it('preserves all downstream effect-resolution and production guards', () => {
    const report = buildI234ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryReadinessReview(
      buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview(),
    );
    expect(report.competingRelationSettlementResolved).toBe(false);
    expect(report.crossRelationPrecedenceAuthorized).toBe(false);
    expect(report.multiTouchAggregationAuthorized).toBe(false);
    expect(report.supportChannelActivationVerdictAuthorized).toBe(false);
    expect(report.supportChannelPersistenceVerdictAuthorized).toBe(false);
    expect(report.supportChannelDestructionVerdictAuthorized).toBe(false);
    expect(report.supportChannelNetEffectVerdictAuthorized).toBe(false);
    expect(report.targetPostRelationRootState).toBe('not_determined');
    expect(report.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.damageEvaluationAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
  });

  it('keeps I232, I132, Qu Wei, Li 1998, and v2 guards unchanged', () => {
    const report = buildI234ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryReadinessReview(
      buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview(),
    );
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
  });

  it('fails closed on a mutated I233 boundary and remains deterministic on the canonical boundary', () => {
    const canonical = buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview();
    const first = buildI234ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryReadinessReview(canonical);
    const second = buildI234ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryReadinessReview(canonical);
    expect(first.reviewId).toBe(second.reviewId);
    expect(first.recommendedNextGate).toBe('COMPETING_RELATION_SETTLEMENT_AUTHORITY_DISCOVERY_EVIDENCE');

    const invalid = { ...canonical, requirementCount: 0 } as unknown as typeof canonical;
    const failed = buildI234ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryReadinessReview(invalid);
    expect(failed.status).toBe('I233_REQUIREMENTS_BOUNDARY_INVALID');
    expect(failed.decision).toBe('COMPETING_RELATION_SETTLEMENT_AUTHORITY_DISCOVERY_NOT_READY');
    expect(failed.exactI233BoundaryAccepted).toBe(false);
    expect(failed.discoveryAuthorized).toBe(false);
    expect(failed.discoveryPathCount).toBe(0);
    expect(failed.discoveryControlCount).toBe(0);
    expect(failed.authorityGap).toBe('UPSTREAM_INVALID');
    expect(failed.recommendedNextGate).toBe('COMPETING_RELATION_SETTLEMENT_AUTHORITY_DISCOVERY_READINESS_REVIEW');
  });
});
