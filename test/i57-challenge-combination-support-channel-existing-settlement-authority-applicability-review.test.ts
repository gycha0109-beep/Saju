import { describe, expect, test } from 'vitest';
import {
  buildI57ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityReview,
  type ChallengeCombinationSupportChannelContestSettlementDependency,
} from '../src/index.js';

function item(dependency: ChallengeCombinationSupportChannelContestSettlementDependency) {
  const report = buildI57ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityReview();
  const found = report.applicability.find((candidate) => candidate.dependency === dependency);
  if (found === undefined) throw new Error(`Missing I57 applicability item for ${dependency}`);
  return found;
}

describe('I57 existing relation-specific settlement authority applicability review', () => {
  test('authorizes existing substrate reuse while blocking generic settlement outcomes and downstream verdicts', () => {
    const report = buildI57ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityReview();

    expect(report.decision).toBe(
      'EXISTING_RELATION_SPECIFIC_SUBSTRATE_REUSE_AUTHORIZED_GENERIC_SETTLEMENT_RESOLUTION_BLOCKED',
    );
    expect(report.existingRelationSpecificSubstrateReuseAuthorized).toBe(true);
    expect(report.routedDependencyOutcomeResolutionAuthorized).toBe(false);
    expect(report.supportChannelActivationVerdictAuthorized).toBe(false);
    expect(report.supportChannelPersistenceVerdictAuthorized).toBe(false);
    expect(report.supportChannelNetEffectVerdictAuthorized).toBe(false);
    expect(report.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
  });

  test('keeps current and competing combination participation as substrate rather than binding or neutralization', () => {
    const current = item('CURRENT_COMBINATION_BINDING_INTERACTION_SETTLEMENT');
    const competing = item('COMPETING_COMBINATION_BINDING_INTERACTION_SETTLEMENT');

    expect(current.status).toBe('SUBSTRATE_REUSE_ONLY_OUTCOME_UNRESOLVED');
    expect(current.reusableSubstrateAvailable).toBe(true);
    expect(current.settlementOutcomeResolved).toBe(false);
    expect(competing.status).toBe('SUBSTRATE_REUSE_ONLY_OUTCOME_UNRESOLVED');
    expect(competing.settlementOutcomeResolved).toBe(false);
  });

  test('keeps seasonal advantage and rescue topology below clash relative-force and rescue-effect verdicts', () => {
    const report = buildI57ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityReview();
    const relative = item('CLASH_RELATIVE_FORCE_SETTLEMENT');
    const rescue = item('CLASH_RESCUE_SETTLEMENT_WHERE_APPLICABLE');

    expect(relative.reusableSubstrateAvailable).toBe(true);
    expect(relative.settlementOutcomeResolved).toBe(false);
    expect(rescue.reusableSubstrateAvailable).toBe(true);
    expect(rescue.settlementOutcomeResolved).toBe(false);
    expect(report.seasonalAdvantageToRelativeForceVerdictAuthorized).toBe(false);
    expect(report.rescueTopologyToRescueEffectAuthorized).toBe(false);
  });

  test('keeps the I47 direct break authority bureau-local and refuses generic support-source destruction', () => {
    const report = buildI57ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityReview();
    const clash = item('CLASH_INTERACTION_SETTLEMENT');

    expect(clash.status).toBe(
      'NARROW_BUREAU_STATE_AUTHORITY_NOT_GENERIC_SUPPORT_CHANNEL_SETTLEMENT',
    );
    expect(clash.authorityRefs).toContain('I47');
    expect(clash.settlementOutcomeResolved).toBe(false);
    expect(report.threeCombinationDirectBreakReuseAuthorizedOnlyForExactBureauIdentity).toBe(true);
    expect(report.bureauBreakToSupportSourceDestroyedAuthorized).toBe(false);
  });

  test('keeps multi-touch dispatch and competing-relation precedence unresolved', () => {
    const report = buildI57ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityReview();
    const touchSpecific = item('TOUCH_SPECIFIC_RELATION_SETTLEMENT');
    const competing = item('COMPETING_RELATION_SETTLEMENT');

    expect(touchSpecific.status).toBe('MULTI_TOUCH_ID_KIND_PAIRING_INSUFFICIENT');
    expect(touchSpecific.reusableSubstrateAvailable).toBe(false);
    expect(competing.status).toBe('COMPETING_RELATION_PRECEDENCE_UNRESOLVED');
    expect(competing.settlementOutcomeResolved).toBe(false);
    expect(report.multiTouchIdKindPairingSufficient).toBe(false);
    expect(report.crossRelationPrecedenceAuthorized).toBe(false);
  });

  test('is deterministic and leaves every routed dependency unresolved', () => {
    const first = buildI57ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityReview();
    const second = buildI57ChallengeCombinationSupportChannelExistingSettlementAuthorityApplicabilityReview();

    expect(first.reviewId).toBe(second.reviewId);
    expect(first.applicability).toHaveLength(7);
    expect(first.applicability.every((candidate) => candidate.settlementOutcomeResolved === false)).toBe(true);
    expect(first.applicability.every((candidate) => candidate.supportChannelActivationResolved === false)).toBe(true);
    expect(first.applicability.every((candidate) => candidate.supportChannelPersistenceResolved === false)).toBe(true);
    expect(first.targetPostRelationRootState).toBe('not_determined');
    expect(first.relationSpecificUsefulnessHarmfulness).toBe('not_determined');
  });
});
