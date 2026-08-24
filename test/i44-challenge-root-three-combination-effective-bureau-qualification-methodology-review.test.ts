import { describe, expect, test } from 'vitest';
import {
  buildI44ChallengeRootThreeCombinationEffectiveBureauQualificationMethodologyReview,
  I44_CHALLENGE_ROOT_THREE_COMBINATION_SOURCE_BASIS,
} from '../src/index.js';

describe('I44 challenge root three-combination effective-bureau qualification methodology review', () => {
  test('authorizes structural bureau formation from complete three-branch membership without promoting post-interaction effective state', () => {
    const report = buildI44ChallengeRootThreeCombinationEffectiveBureauQualificationMethodologyReview();

    expect(report.decision).toBe(
      'FULL_MEMBERSHIP_BUREAU_FORMATION_AUTHORIZED_POST_INTERACTION_STATE_BLOCKED',
    );
    expect(report.fullThreeMembershipRequiredForTraditionalBureau).toBe(true);
    expect(report.missingOneBranchBlocksFullThreeBureauFormation).toBe(true);
    expect(report.fullThreeMembershipAuthorizesStructuralBureauFormation).toBe(true);
    expect(report.structuralBureauFormationStateEmissionAuthorized).toBe(true);
    expect(report.traditionalBureauElementReferenceMayBeUsedForFormationIdentity).toBe(true);
    expect(report.structuralBureauFormationEqualsPostInteractionEffectiveBureau).toBe(false);
    expect(report.postInteractionEffectiveBureauVerdictAuthorized).toBe(false);
  });

  test('does not transfer two-branch adjacency or lead-out rules into full-three formation prerequisites', () => {
    const report = buildI44ChallengeRootThreeCombinationEffectiveBureauQualificationMethodologyReview();

    expect(report.fullThreeAdjacencyRequiredForFormation).toBe(false);
    expect(report.fullThreeVisibleLeadOutRequiredForFormation).toBe(false);
    expect(report.twoBranchAdjacencyRuleTransferToFullThreeAuthorized).toBe(false);
    expect(report.twoBranchLeadOutRuleTransferToFullThreeAuthorized).toBe(false);
  });

  test('keeps clash break/damage and post-interaction settlement unresolved', () => {
    const report = buildI44ChallengeRootThreeCombinationEffectiveBureauQualificationMethodologyReview();

    expect(report.clashCanBreakOrDamageBureau).toBe(true);
    expect(report.clashProximityCanChangeBureauDamageInterpretation).toBe(true);
    expect(report.deterministicClashBreakDamageSettlementPolicyResolved).toBe(false);
    expect(report.postInteractionBureauStateEmissionAuthorized).toBe(false);
    expect(report.competingRelationInteractionSettlementResolved).toBe(false);
  });

  test('separates structural bureau formation from seasonal/support challenge-force effects', () => {
    const report = buildI44ChallengeRootThreeCombinationEffectiveBureauQualificationMethodologyReview();

    expect(report.seasonalCommandRequiredForStructuralBureauFormation).toBe(false);
    expect(report.supportInterferenceRequiredForStructuralBureauFormation).toBe(false);
    expect(report.seasonalCommandEffectOnChallengeForceResolved).toBe(false);
    expect(report.supportInterferenceEffectOnChallengeForceResolved).toBe(false);
    expect(
      I44_CHALLENGE_ROOT_THREE_COMBINATION_SOURCE_BASIS.some(
        (item) => item.supportType === 'scope_limit' && item.finding.includes('two-branch'),
      ),
    ).toBe(true);
  });

  test('is deterministic and preserves post-relation/effective-force/classifier guards', () => {
    const first = buildI44ChallengeRootThreeCombinationEffectiveBureauQualificationMethodologyReview();
    const second = buildI44ChallengeRootThreeCombinationEffectiveBureauQualificationMethodologyReview();

    expect(first.reviewId).toBe(second.reviewId);
    expect(first.postCombinationSubjectIdentityPolicyResolved).toBe(false);
    expect(first.targetPostRelationRootState).toBe('not_determined');
    expect(first.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(first.relationSpecificUsefulnessHarmfulness).toBe('not_determined');
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
  });
});
