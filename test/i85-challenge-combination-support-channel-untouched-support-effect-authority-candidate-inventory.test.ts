import { describe, expect, test } from 'vitest';
import type {
  ChallengeCombinationSupportChannelActivationPersistenceMethodologyReviewReport,
  ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReviewReport,
} from '../src/index.js';
import { buildI51ChallengeCombinationSupportInterferenceEffectMethodologyReview } from '../src/research/i51-challenge-combination-support-interference-effect-methodology-review.js';
import { buildI53ChallengeCombinationSupportChannelActivationPersistenceMethodologyReview } from '../src/research/i53-challenge-combination-support-channel-activation-persistence-methodology-review.js';
import { buildI85ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateInventory } from '../src/research/i85-challenge-combination-support-channel-untouched-support-effect-authority-candidate-inventory.js';

const REQUIREMENTS = [
  {
    requirementId: 'EXPLICIT_POST_INTERACTION_UNTOUCHED_SOURCE_RULE',
    requirement:
      'An explicit post-interaction rule scoped to a support source with no tracked direct relation touch, rather than an inference from absence of contest.',
  },
  {
    requirementId: 'STRUCTURAL_PRESENCE_VS_EFFECT_SEPARATION',
    requirement:
      'A distinction between structural support-channel presence/direction and source activation, persistence, and effective support effect.',
  },
  {
    requirementId: 'SOURCE_POSITION_APPLICABILITY_AND_EXCEPTIONS',
    requirement:
      'Explicit applicability and exception conditions across visible-stem and branch sources without assuming fixed positional precedence.',
  },
  {
    requirementId: 'SUPPORT_KIND_APPLICABILITY_WITHOUT_PRECEDENCE_OR_WEIGHT',
    requirement:
      'Explicit applicability across same-element and resource-generation support without assuming one kind outranks the other or assigning numeric weight.',
  },
  {
    requirementId: 'UNTOUCHED_PERSISTENCE_STATE_SEMANTICS',
    requirement:
      'A statement of whether untouched-source persistence is a default, conditional state, or intentionally unresolved state after all tracked relation settlement is absent.',
  },
  {
    requirementId: 'INDEPENDENT_PROVENANCE_BASIS',
    requirement:
      'A provenance basis strong enough to stand independently of scoped pattern examples or cross-references that were not written as universal settlement rules.',
  },
] as const;

function i84(): ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReviewReport {
  return {
    reviewId: 'i84_i85_fixture',
    reviewVersion: 'fixture',
    status: 'RESOLVED_ADDITIONAL_AUTHORITY_REQUIREMENTS',
    decision:
      'ADDITIONAL_AUTHORITY_ACCEPTANCE_CONTRACT_FROZEN_NO_UNTOUCHED_EFFECT_RULE_AUTHORIZED',
    upstreamI83ReviewId: 'i83_fixture',
    requirements: REQUIREMENTS.map((item) => ({
      ...item,
      mandatory: true,
      currentCanonicalAuthoritySatisfies: false,
      futureAuthorityCandidateMustSatisfy: true,
      silenceOrAbsenceOfContestMaySatisfy: false,
      supportDirectionAloneMaySatisfy: false,
      scopedPatternExampleAloneMaySatisfy: false,
      numericCalibrationMaySubstitute: false,
    })),
    requirementsFrozen: true,
    allRequirementsMandatory: true,
    currentCanonicalAuthoritySatisfiesAllRequirements: false,
    candidateMayPassWithPartialCoverage: false,
    candidateMayPassBySilence: false,
    candidateMayPassFromAbsenceOfTrackedContestAlone: false,
    candidateMayPassFromSupportDirectionAlone: false,
    candidateMayPassFromScopedPatternExampleAlone: false,
    candidateMayPassFromNumericCalibration: false,
    candidateSetCompositionPolicyResolved: false,
    partialCandidateCompositionAuthorized: false,
    implicitCrossSourceSynthesisAuthorized: false,
    newNormativeUntouchedSupportPolicyAuthorized: false,
    untouchedSupportEffectRuleImplementationAuthorized: false,
    universalDefaultActiveRuleAuthorized: false,
    universalDefaultPersistedRuleAuthorized: false,
    universalDefaultEffectiveSupportRuleAuthorized: false,
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
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_AUTHORITY_CANDIDATE_INVENTORY',
    notes: [],
  };
}

describe('I85 untouched support effect authority candidate inventory', () => {
  test('inventories every canonical I51/I53 registration and groups duplicate source ids without losing provenance', () => {
    const i51 = buildI51ChallengeCombinationSupportInterferenceEffectMethodologyReview();
    const i53 = buildI53ChallengeCombinationSupportChannelActivationPersistenceMethodologyReview();
    const report =
      buildI85ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateInventory(
        i84(),
        i51,
        i53,
      );
    expect(report.status).toBe('RESOLVED_AUTHORITY_CANDIDATE_INVENTORY');
    expect(report.registrationCount).toBe(i51.sourceBasis.length + i53.sourceBasis.length);
    expect(report.registrationCount).toBe(8);
    expect(report.uniqueCandidateCount).toBe(6);
    expect(report.duplicateSourceRegistrationsCollapsedBySourceId).toBe(true);
    expect(report.provenancePreservedPerRegistration).toBe(true);
    expect(
      report.candidates.reduce((sum, candidate) => sum + candidate.registrations.length, 0),
    ).toBe(8);
  });

  test('credits no existing canonical candidate with any frozen mandatory requirement', () => {
    const report =
      buildI85ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateInventory(
        i84(),
      );
    expect(report.anyCandidateFullRequirementCoverage).toBe(false);
    expect(report.allCandidatesFailAtLeastOneMandatoryRequirement).toBe(true);
    expect(
      report.candidates.every(
        (candidate) =>
          candidate.satisfiedRequirementIds.length === 0 &&
          candidate.unsatisfiedRequirementIds.length === 6 &&
          candidate.requirementCoverage.every(
            (coverage) => coverage.satisfiedByExistingCanonicalRegistration === false,
          ),
      ),
    ).toBe(true);
  });

  test('preserves direct-basis candidates as relevant without promoting relevance to requirement satisfaction', () => {
    const report =
      buildI85ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateInventory(
        i84(),
      );
    const direct = report.candidates.filter((candidate) => candidate.directBasisRegistrationObserved);
    expect(direct.length).toBeGreaterThan(0);
    expect(
      direct.every(
        (candidate) =>
          candidate.canonicalRelevanceClass ===
            'DIRECT_RELEVANCE_WITHOUT_REQUIREMENT_CLOSURE' &&
          candidate.fullRequirementCoverage === false &&
          candidate.candidateEligibleForUntouchedEffectRulePromotion === false,
      ),
    ).toBe(true);
  });

  test('keeps scope-limit and cross-reference-only candidates non-promotable', () => {
    const report =
      buildI85ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateInventory(
        i84(),
      );
    const nonDirect = report.candidates.filter(
      (candidate) => candidate.directBasisRegistrationObserved === false,
    );
    expect(nonDirect.length).toBeGreaterThan(0);
    expect(
      nonDirect.every(
        (candidate) =>
          candidate.canonicalRelevanceClass ===
            'SCOPED_RELEVANCE_WITHOUT_REQUIREMENT_CLOSURE' ||
          candidate.canonicalRelevanceClass ===
            'CROSS_REFERENCE_RELEVANCE_WITHOUT_REQUIREMENT_CLOSURE',
      ),
    ).toBe(true);
    expect(nonDirect.every((candidate) => candidate.fullRequirementCoverage === false)).toBe(true);
  });

  test('does not synthesize requirement closure across different canonical source candidates', () => {
    const report =
      buildI85ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateInventory(
        i84(),
      );
    expect(report.existingCandidateSetCoverageUnionClosesAnyRequirement).toBe(false);
    expect(report.candidateSetCompositionPolicyResolved).toBe(false);
    expect(report.crossCandidateCoverageCompositionAuthorized).toBe(false);
    expect(report.implicitCrossSourceSynthesisAuthorized).toBe(false);
    expect(report.sameSourceDuplicateRegistrationAggregationAuthorizedForInventoryOnly).toBe(true);
  });

  test('fails closed on stale I84 and stale I53 inputs', () => {
    const staleI84 = {
      ...i84(),
      candidateMayPassWithPartialCoverage: true,
    } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectAdditionalAuthorityRequirementsReviewReport;
    const staleI84Report =
      buildI85ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateInventory(
        staleI84,
      );
    expect(staleI84Report.status).toBe('I84_UNRESOLVED_OR_INVALID');
    expect(staleI84Report.candidates).toEqual([]);

    const canonicalI53 = buildI53ChallengeCombinationSupportChannelActivationPersistenceMethodologyReview();
    const staleI53 = {
      ...canonicalI53,
      reviewId: 'stale_i53',
    } as ChallengeCombinationSupportChannelActivationPersistenceMethodologyReviewReport;
    const staleI53Report =
      buildI85ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateInventory(
        i84(),
        buildI51ChallengeCombinationSupportInterferenceEffectMethodologyReview(),
        staleI53,
      );
    expect(staleI53Report.status).toBe('I53_METHODOLOGY_NOT_CANONICAL');
    expect(staleI53Report.candidates).toEqual([]);
  });

  test('is deterministic, performs no external search, and keeps every effect/scoring/classification guard closed', () => {
    const first =
      buildI85ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateInventory(
        i84(),
      );
    const second =
      buildI85ChallengeCombinationSupportChannelUntouchedSupportEffectAuthorityCandidateInventory(
        i84(),
      );
    expect(first.reportId).toBe(second.reportId);
    expect(first.externalAuthoritySearchPerformed).toBe(false);
    expect(first.newAuthorityCandidateAdded).toBe(false);
    expect(first.candidateApprovalAuthorized).toBe(false);
    expect(first.untouchedSupportEffectRuleImplementationAuthorized).toBe(false);
    expect(first.sourceActivationVerdictAuthorized).toBe(false);
    expect(first.sourcePersistenceVerdictAuthorized).toBe(false);
    expect(first.sourceEffectiveSupportVerdictAuthorized).toBe(false);
    expect(first.relativeForceVerdictAuthorized).toBe(false);
    expect(first.crossRelationPrecedenceAuthorized).toBe(false);
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
    expect(first.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_ADDITIONAL_AUTHORITY_ACQUISITION_READINESS_REVIEW',
    );
  });
});
