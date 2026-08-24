import { describe, expect, test } from 'vitest';
import { buildI76ChallengeCombinationSupportChannelRelationKindSpecificCombinationBindingInteractionSettlementMethodologyReview } from '../src/research/i76-challenge-combination-support-channel-relation-kind-specific-combination-binding-interaction-settlement-methodology-review.js';

describe('I76 relation-kind-specific combination binding/interaction settlement methodology', () => {
  test('separates stem-five, branch-six, and branch-three interaction paths', () => {
    const report = buildI76ChallengeCombinationSupportChannelRelationKindSpecificCombinationBindingInteractionSettlementMethodologyReview();
    expect(report.decision).toBe(
      'RELATION_KIND_SPECIFIC_INTERACTION_PATHS_SEPARATED_DIRECT_BINDING_OUTCOME_BLOCKED',
    );
    expect(report.relationKindAuditComplete).toBe(true);
    expect(report.stemFiveAndBranchSixAndBranchThreeMayShareOneBindingRule).toBe(false);
    expect(report.kindPolicies.map((policy) => policy.relationKind)).toEqual([
      'stem_five_combination',
      'branch_six_combination',
      'branch_three_combination',
    ]);
  });

  test('keeps stem-five day-master result transfer blocked while retaining structural interaction', () => {
    const report = buildI76ChallengeCombinationSupportChannelRelationKindSpecificCombinationBindingInteractionSettlementMethodologyReview();
    const policy = report.kindPolicies.find((item) => item.relationKind === 'stem_five_combination');
    expect(policy?.readiness).toBe('STRUCTURAL_INTERACTION_ONLY_SCOPE_TRANSFER_BLOCKED');
    expect(policy?.structuralRelationAuthorityAvailable).toBe(true);
    expect(policy?.transformationResultRouteAuthorized).toBe(false);
    expect(policy?.directBindingVerdictAuthorized).toBe(false);
    expect(policy?.noEffectConclusionAuthorized).toBe(false);
  });

  test('keeps branch-six structural pairing without inventing transformation or no-effect semantics', () => {
    const report = buildI76ChallengeCombinationSupportChannelRelationKindSpecificCombinationBindingInteractionSettlementMethodologyReview();
    const policy = report.kindPolicies.find((item) => item.relationKind === 'branch_six_combination');
    expect(policy?.readiness).toBe(
      'STRUCTURAL_PAIR_INTERACTION_ONLY_TRANSFORMATION_CONVENTION_BLOCKED',
    );
    expect(policy?.structuralRelationAuthorityAvailable).toBe(true);
    expect(policy?.transformationResultRouteAuthorized).toBe(false);
    expect(policy?.directInteractionOutcomeAuthorized).toBe(false);
    expect(policy?.noEffectConclusionAuthorized).toBe(false);
  });

  test('allows branch-three structural bureau formation only as pre-settlement evidence', () => {
    const report = buildI76ChallengeCombinationSupportChannelRelationKindSpecificCombinationBindingInteractionSettlementMethodologyReview();
    const policy = report.kindPolicies.find((item) => item.relationKind === 'branch_three_combination');
    expect(policy?.readiness).toBe(
      'STRUCTURAL_BUREAU_FORMATION_AVAILABLE_POST_INTERACTION_SETTLEMENT_REQUIRED',
    );
    expect(policy?.structuralBureauFormationMayBeObserved).toBe(true);
    expect(policy?.structuralBureauFormationIsBindingVerdict).toBe(false);
    expect(policy?.postInteractionStateResolved).toBe(false);
    expect(report.structuralBureauFormationEqualsPostInteractionEffectiveBureauAuthorized).toBe(false);
  });

  test('keeps current and competing combination outcome roles distinct', () => {
    const report = buildI76ChallengeCombinationSupportChannelRelationKindSpecificCombinationBindingInteractionSettlementMethodologyReview();
    expect(report.currentAndCompetingCombinationRolesRemainDistinctOutcomeDomains).toBe(true);
    expect(report.kindSpecificStructuralSubstrateReuseAcrossRolesAuthorized).toBe(true);
    expect(report.rolePolicies).toHaveLength(2);
    expect(report.rolePolicies.every((policy) => policy.roleMayBorrowOppositeRoleOutcomeWithoutAudit === false)).toBe(true);
    expect(report.rolePolicies.every((policy) => policy.settlementOutcome === 'not_determined')).toBe(true);
  });

  test('keeps all binding, precedence, downstream force, scoring, and classification verdicts blocked', () => {
    const report = buildI76ChallengeCombinationSupportChannelRelationKindSpecificCombinationBindingInteractionSettlementMethodologyReview();
    expect(report.directBindingOutcomeAdapterAuthorized).toBe(false);
    expect(report.genericCombinationSettlementResolverAuthorized).toBe(false);
    expect(report.transformationEqualsBindingAuthorized).toBe(false);
    expect(report.nonTransformationEqualsBindingAuthorized).toBe(false);
    expect(report.structuralMembershipEqualsBindingAuthorized).toBe(false);
    expect(report.structuralBureauFormationEqualsBindingAuthorized).toBe(false);
    expect(report.globalConditionPrecedenceAuthorized).toBe(false);
    expect(report.crossRelationPrecedenceAuthorized).toBe(false);
    expect(report.supportChannelActivationVerdictAuthorized).toBe(false);
    expect(report.supportChannelPersistenceVerdictAuthorized).toBe(false);
    expect(report.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
  });
});
