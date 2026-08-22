import { describe, expect, test } from 'vitest';
import type {
  ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectReadinessReviewReport,
  ChallengeCombinationSupportInterferenceEffectMethodologyReviewReport,
} from '../src/index.js';
import { buildI51ChallengeCombinationSupportInterferenceEffectMethodologyReview } from '../src/research/i51-challenge-combination-support-interference-effect-methodology-review.js';
import { buildI53ChallengeCombinationSupportChannelActivationPersistenceMethodologyReview } from '../src/research/i53-challenge-combination-support-channel-activation-persistence-methodology-review.js';
import { buildI83ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectAuthorityGapReview } from '../src/research/i83-challenge-combination-support-channel-no-tracked-relation-support-effect-authority-gap-review.js';

function i82(
  noTrackedRelationPathObserved = true,
): ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectReadinessReviewReport {
  const i51 = buildI51ChallengeCombinationSupportInterferenceEffectMethodologyReview();
  const i53 = buildI53ChallengeCombinationSupportChannelActivationPersistenceMethodologyReview();
  return {
    reviewId: 'i82_i83_fixture',
    reviewVersion: 'fixture',
    status: 'RESOLVED_NO_TRACKED_RELATION_SUPPORT_EFFECT_READINESS',
    decision:
      'NO_TRACKED_RELATION_TOUCH_CLEARS_RELATION_SETTLEMENT_DEPENDENCY_NOT_ACTIVATION_PERSISTENCE_EFFECT',
    upstreamI75ReviewId: 'i75_fixture',
    upstreamI51ReviewId: i51.reviewId,
    upstreamI53ReviewId: i53.reviewId,
    items: [],
    noTrackedRelationPathObserved,
    relationSettlementIndependenceMayBePreserved: true,
    supportDirectionMayBePreservedWithoutMagnitude: true,
    noTrackedRelationTouchMeansActivated: false,
    noTrackedRelationTouchMeansPersistent: false,
    noTrackedRelationTouchMeansEffectiveSupport: false,
    absenceOfTrackedContestMayBeTreatedAsPositiveSettlementOutcome: false,
    preInteractionSupportPresenceMaySubstituteForPostInteractionEffect: false,
    supportChannelMultiplicityMagnitudeInferenceAuthorized: false,
    supportChannelAggregationAuthorized: false,
    sourceActivationVerdictAuthorized: false,
    sourcePersistenceVerdictAuthorized: false,
    sourceEffectiveSupportVerdictAuthorized: false,
    effectiveSupportToRelativeForceAuthorized: false,
    relativeForceVerdictAuthorized: false,
    clashWinnerVerdictAuthorized: false,
    rescueEffectAuthorized: false,
    clashSettlementAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    relationSpecificUsefulnessHarmfulness: 'not_determined',
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    authorityGap:
      'UNIVERSAL_UNTOUCHED_SUPPORT_ACTIVATION_PERSISTENCE_EFFECT_RULE_NOT_ESTABLISHED',
    recommendedNextGate: 'NO_TRACKED_RELATION_SUPPORT_EFFECT_AUTHORITY_GAP_REVIEW',
    notes: [],
  };
}

describe('I83 no-tracked-relation support effect authority gap review', () => {
  test('confirms that the existing canonical authority does not close the universal untouched-support effect gap', () => {
    const report =
      buildI83ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectAuthorityGapReview(
        i82(),
      );
    expect(report.status).toBe('RESOLVED_UNTOUCHED_SUPPORT_EFFECT_AUTHORITY_GAP_REVIEW');
    expect(report.decision).toBe(
      'EXISTING_CANONICAL_AUTHORITY_INSUFFICIENT_FOR_UNIVERSAL_UNTOUCHED_SUPPORT_EFFECT_RULE',
    );
    expect(report.authorityGapConfirmed).toBe(true);
    expect(report.authorityGapClosed).toBe(false);
    expect(report.additionalAuthorityRequired).toBe(true);
  });

  test('audits every canonical I51 and I53 source-basis item without promoting any to a universal untouched-source rule', () => {
    const i51 = buildI51ChallengeCombinationSupportInterferenceEffectMethodologyReview();
    const i53 = buildI53ChallengeCombinationSupportChannelActivationPersistenceMethodologyReview();
    const report =
      buildI83ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectAuthorityGapReview(
        i82(),
        i51,
        i53,
      );
    expect(report.authorityAudit).toHaveLength(i51.sourceBasis.length + i53.sourceBasis.length);
    expect(
      report.authorityAudit.every(
        (item) =>
          item.supportsUniversalUntouchedSourceActivationRule === false &&
          item.supportsUniversalUntouchedSourcePersistenceRule === false &&
          item.supportsUniversalUntouchedEffectiveSupportRule === false &&
          item.mayBePromotedFromScopedPatternToUniversalRule === false,
      ),
    ).toBe(true);
  });

  test('preserves direct-basis material as directional or interaction relevance only', () => {
    const report =
      buildI83ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectAuthorityGapReview(
        i82(),
      );
    const direct = report.authorityAudit.filter((item) => item.supportType === 'direct_basis');
    expect(direct.length).toBeGreaterThan(0);
    expect(
      direct.every(
        (item) =>
          item.scopeClassification ===
            'DIRECTIONAL_OR_INTERACTION_RELEVANCE_NOT_UNIVERSAL_EFFECT' &&
          item.supportsStructuralSupportDirectionOrInteractionRelevance,
      ),
    ).toBe(true);
    expect(report.directSupportDirectionOrInteractionEvidenceExists).toBe(true);
  });

  test('keeps scope-limit and cross-reference passages scoped rather than universalizing pattern examples', () => {
    const report =
      buildI83ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectAuthorityGapReview(
        i82(),
      );
    const scoped = report.authorityAudit.filter((item) => item.supportType !== 'direct_basis');
    expect(scoped.length).toBeGreaterThan(0);
    expect(
      scoped.every(
        (item) =>
          item.scopeClassification === 'EXPLICIT_CONTEXT_DEPENDENCE_SCOPE_LIMIT' ||
          item.scopeClassification === 'SCOPED_CROSS_REFERENCE_NOT_UNIVERSAL_RULE',
      ),
    ).toBe(true);
    expect(report.scopedStabilityOrSupportReferencesExist).toBe(true);
  });

  test('fails closed when I82 is not aligned to the canonical I51 identity', () => {
    const invalid = {
      ...i82(),
      upstreamI51ReviewId: 'stale_i51',
    } as ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectReadinessReviewReport;
    const report =
      buildI83ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectAuthorityGapReview(
        invalid,
      );
    expect(report.status).toBe('I82_UNRESOLVED_OR_INVALID');
    expect(report.authorityAudit).toEqual([]);
    expect(report.authorityGapConfirmed).toBe(false);
  });

  test('requires the exact canonical I51 methodology before auditing authority provenance', () => {
    const canonical = buildI51ChallengeCombinationSupportInterferenceEffectMethodologyReview();
    const stale = {
      ...canonical,
      reviewId: 'stale_i51_review',
    } as ChallengeCombinationSupportInterferenceEffectMethodologyReviewReport;
    const report =
      buildI83ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectAuthorityGapReview(
        i82(),
        stale,
      );
    expect(report.status).toBe('I51_METHODOLOGY_NOT_CANONICAL');
    expect(report.authorityAudit).toEqual([]);
  });

  test('is deterministic and preserves activation, relative-force, precedence, scoring, and classification guards', () => {
    const first =
      buildI83ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectAuthorityGapReview(
        i82(),
      );
    const second =
      buildI83ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectAuthorityGapReview(
        i82(),
      );
    expect(first.reviewId).toBe(second.reviewId);
    expect(first.currentChartNoTrackedRelationPathObserved).toBe(true);
    expect(first.universalDefaultActiveRuleAuthorized).toBe(false);
    expect(first.universalDefaultPersistedRuleAuthorized).toBe(false);
    expect(first.universalDefaultEffectiveSupportRuleAuthorized).toBe(false);
    expect(first.sourceEffectiveSupportVerdictAuthorized).toBe(false);
    expect(first.relativeForceVerdictAuthorized).toBe(false);
    expect(first.crossRelationPrecedenceAuthorized).toBe(false);
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
    expect(first.requiredAdditionalAuthorityCharacteristics.length).toBeGreaterThan(0);
    expect(first.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_ADDITIONAL_AUTHORITY_REQUIREMENTS_REVIEW',
    );
  });
});
