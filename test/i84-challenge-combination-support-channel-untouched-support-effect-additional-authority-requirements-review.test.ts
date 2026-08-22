import { describe, expect, test } from 'vitest';
import type { ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectAuthorityGapReviewReport } from '../src/index.js';
import { buildI84ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReview } from '../src/research/i84-challenge-combination-support-channel-untouched-support-effect-additional-authority-requirements-review.js';

const CHARACTERISTICS = [
  'An explicit post-interaction rule scoped to a support source with no tracked direct relation touch, rather than an inference from absence of contest.',
  'A distinction between structural support-channel presence/direction and source activation, persistence, and effective support effect.',
  'Explicit applicability and exception conditions across visible-stem and branch sources without assuming fixed positional precedence.',
  'Explicit applicability across same-element and resource-generation support without assuming one kind outranks the other or assigning numeric weight.',
  'A statement of whether untouched-source persistence is a default, conditional state, or intentionally unresolved state after all tracked relation settlement is absent.',
  'A provenance basis strong enough to stand independently of scoped pattern examples or cross-references that were not written as universal settlement rules.',
] as const;

function i83(): ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectAuthorityGapReviewReport {
  return {
    reviewId: 'i83_i84_fixture',
    reviewVersion: 'fixture',
    status: 'RESOLVED_UNTOUCHED_SUPPORT_EFFECT_AUTHORITY_GAP_REVIEW',
    decision:
      'EXISTING_CANONICAL_AUTHORITY_INSUFFICIENT_FOR_UNIVERSAL_UNTOUCHED_SUPPORT_EFFECT_RULE',
    upstreamI82ReviewId: 'i82_fixture',
    upstreamI51ReviewId: 'i51_fixture',
    upstreamI53ReviewId: 'i53_fixture',
    authorityAudit: [],
    currentChartNoTrackedRelationPathObserved: true,
    directSupportDirectionOrInteractionEvidenceExists: true,
    scopedStabilityOrSupportReferencesExist: true,
    authorityGapConfirmed: true,
    authorityGapClosed: false,
    existingCanonicalAuthoritySufficientForUniversalUntouchedActivation: false,
    existingCanonicalAuthoritySufficientForUniversalUntouchedPersistence: false,
    existingCanonicalAuthoritySufficientForUniversalUntouchedEffectiveSupport: false,
    absenceOfTrackedContestAloneSufficientForActivation: false,
    absenceOfTrackedContestAloneSufficientForPersistence: false,
    absenceOfTrackedContestAloneSufficientForEffectiveSupport: false,
    preInteractionSupportPresenceMaySubstituteForPostInteractionEffect: false,
    universalDefaultActiveRuleAuthorized: false,
    universalDefaultPersistedRuleAuthorized: false,
    universalDefaultEffectiveSupportRuleAuthorized: false,
    supportChannelAggregationAuthorized: false,
    numericSupportWeightingAuthorized: false,
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
    additionalAuthorityRequired: true,
    requiredAdditionalAuthorityCharacteristics: CHARACTERISTICS,
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_ADDITIONAL_AUTHORITY_REQUIREMENTS_REVIEW',
    notes: [],
  };
}

describe('I84 untouched support effect additional authority requirements', () => {
  test('freezes the six mandatory requirements without authorizing an untouched-support rule', () => {
    const report =
      buildI84ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReview(
        i83(),
      );
    expect(report.status).toBe('RESOLVED_ADDITIONAL_AUTHORITY_REQUIREMENTS');
    expect(report.requirementsFrozen).toBe(true);
    expect(report.requirements).toHaveLength(6);
    expect(report.allRequirementsMandatory).toBe(true);
    expect(report.untouchedSupportEffectRuleImplementationAuthorized).toBe(false);
  });

  test('assigns stable requirement ids to every I83 additional-authority characteristic', () => {
    const report =
      buildI84ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReview(
        i83(),
      );
    expect(report.requirements.map((item) => item.requirementId)).toEqual([
      'EXPLICIT_POST_INTERACTION_UNTOUCHED_SOURCE_RULE',
      'STRUCTURAL_PRESENCE_VS_EFFECT_SEPARATION',
      'SOURCE_POSITION_APPLICABILITY_AND_EXCEPTIONS',
      'SUPPORT_KIND_APPLICABILITY_WITHOUT_PRECEDENCE_OR_WEIGHT',
      'UNTOUCHED_PERSISTENCE_STATE_SEMANTICS',
      'INDEPENDENT_PROVENANCE_BASIS',
    ]);
    expect(report.requirements.map((item) => item.requirement)).toEqual(CHARACTERISTICS);
  });

  test('requires every future candidate to satisfy every requirement and keeps current authority insufficient', () => {
    const report =
      buildI84ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReview(
        i83(),
      );
    expect(report.currentCanonicalAuthoritySatisfiesAllRequirements).toBe(false);
    expect(
      report.requirements.every(
        (item) =>
          item.mandatory &&
          item.currentCanonicalAuthoritySatisfies === false &&
          item.futureAuthorityCandidateMustSatisfy,
      ),
    ).toBe(true);
    expect(report.candidateMayPassWithPartialCoverage).toBe(false);
  });

  test('does not allow silence, absence of contest, support direction, scoped examples, or numeric calibration to substitute', () => {
    const report =
      buildI84ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReview(
        i83(),
      );
    expect(report.candidateMayPassBySilence).toBe(false);
    expect(report.candidateMayPassFromAbsenceOfTrackedContestAlone).toBe(false);
    expect(report.candidateMayPassFromSupportDirectionAlone).toBe(false);
    expect(report.candidateMayPassFromScopedPatternExampleAlone).toBe(false);
    expect(report.candidateMayPassFromNumericCalibration).toBe(false);
    expect(
      report.requirements.every(
        (item) =>
          item.silenceOrAbsenceOfContestMaySatisfy === false &&
          item.supportDirectionAloneMaySatisfy === false &&
          item.scopedPatternExampleAloneMaySatisfy === false &&
          item.numericCalibrationMaySubstitute === false,
      ),
    ).toBe(true);
  });

  test('keeps multi-source composition unresolved instead of synthesizing partial candidates', () => {
    const report =
      buildI84ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReview(
        i83(),
      );
    expect(report.candidateSetCompositionPolicyResolved).toBe(false);
    expect(report.partialCandidateCompositionAuthorized).toBe(false);
    expect(report.implicitCrossSourceSynthesisAuthorized).toBe(false);
    expect(report.newNormativeUntouchedSupportPolicyAuthorized).toBe(false);
  });

  test('fails closed when the I83 requirement contract is stale or incomplete', () => {
    const invalid = {
      ...i83(),
      requiredAdditionalAuthorityCharacteristics: CHARACTERISTICS.slice(0, 5),
    } as ChallengeCombinationSupportChannelNoTrackedRelationSupportEffectAuthorityGapReviewReport;
    const report =
      buildI84ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReview(
        invalid,
      );
    expect(report.status).toBe('I83_UNRESOLVED_OR_INVALID');
    expect(report.requirements).toEqual([]);
    expect(report.requirementsFrozen).toBe(false);
  });

  test('is deterministic and preserves effect, relative-force, precedence, scoring, and classification guards', () => {
    const first =
      buildI84ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReview(
        i83(),
      );
    const second =
      buildI84ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReview(
        i83(),
      );
    expect(first.reviewId).toBe(second.reviewId);
    expect(first.sourceActivationVerdictAuthorized).toBe(false);
    expect(first.sourcePersistenceVerdictAuthorized).toBe(false);
    expect(first.sourceEffectiveSupportVerdictAuthorized).toBe(false);
    expect(first.relativeForceVerdictAuthorized).toBe(false);
    expect(first.crossRelationPrecedenceAuthorized).toBe(false);
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
    expect(first.recommendedNextGate).toBe('UNTOUCHED_SUPPORT_EFFECT_AUTHORITY_CANDIDATE_INVENTORY');
  });
});
