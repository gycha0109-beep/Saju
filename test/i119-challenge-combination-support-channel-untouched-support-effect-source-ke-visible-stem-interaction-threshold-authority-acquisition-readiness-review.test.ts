import { describe, expect, test } from 'vitest';
import {
  buildI119ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityAcquisitionReadinessReview,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityGapRequirementsReviewReport,
} from '../src/index.js';

const SOURCE_ID = 'source_chenyuan_sizhu_yuce_rumen_1995_isbn9787805922515';
const REQUIREMENT_IDS = [
  'EXPLICIT_BINARY_EFFECTIVE_INTERACTION_SEMANTICS',
  'VISIBLE_STEM_POSITION_SCOPE_AND_POSITION_CLASS_APPLICABILITY',
  'QUALITATIVE_FORCE_VS_BINARY_ELIGIBILITY_SEPARATION',
  'WU_LI_BOUNDARY_SEMANTICS_AND_EXCEPTIONS',
  'CONTEXT_AND_EXCEPTION_CONDITIONS',
  'INDEPENDENT_NORMATIVE_PROVENANCE',
] as const;

function i118(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityGapRequirementsReviewReport {
  const requirements = REQUIREMENT_IDS.map((requirementId) => ({
    requirementId,
    mandatory: true as const,
    description: `fixture ${requirementId}`,
    currentlySatisfiedByI107Source: false as const,
    mayBeSatisfiedByGeneralKnowledge: false as const,
    mayBeSatisfiedBySearchSnippet: false as const,
    mayBeSatisfiedByModelSynthesis: false as const,
    mayBeSatisfiedByNumericCalibration: false as const,
    mayBeSatisfiedByQualitativeOrderingAlone: false as const,
  }));
  const base = {
    reviewId: 'i118_i119_fixture',
    reviewVersion: 'fixture',
    status: 'RESOLVED_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_AUTHORITY_GAP_REQUIREMENTS_REVIEW',
    decision:
      'VISIBLE_STEM_BINARY_INTERACTION_THRESHOLD_AUTHORITY_ACCEPTANCE_CONTRACT_FROZEN_NO_THRESHOLD_AUTHORIZED',
    upstreamI117ReviewId: 'i117_fixture',
    candidateSourceIdContext: SOURCE_ID,
    targetSourceTerm: '克',
    targetScope: 'VISIBLE_HEAVENLY_STEM_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY',
    confirmedAuthorityGap:
      'SOURCE_KE_VISIBLE_STEM_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY_THRESHOLD_UNRESOLVED',
    authorityGapConfirmed: true,
    authorityGapClosed: false,
    additionalAuthorityRequired: true,
    requirements,
    requirementCount: 6,
    allRequirementsMandatory: true,
    allRequirementsCurrentlyUnsatisfied: true,
    singleSourceFullCoveragePreferred: true,
    multiSourceCompositionPolicyResolved: false,
    crossCandidateSynthesisAuthorized: false,
    evidenceMustHaveExactLocator: true,
    originalOrVerifiedSourceContextRequired: true,
    explicitVisibleStemScopeRequired: true,
    explicitBinaryEligibilitySemanticsRequired: true,
    explicitWuLiBoundarySemanticsRequired: true,
    explicitExceptionOrContextTreatmentRequired: true,
    relationExistenceMustRemainDistinctFromEffectiveInteraction: true,
    qualitativeForceOrderingMayNotSubstituteForBinaryThreshold: true,
    wuLiMayNotBePreclassifiedAsNoInteraction: true,
    liDaMayNotBePreclassifiedAsEligible: true,
    ciZhiMayNotBePreclassifiedAsEligible: true,
    empiricalCalibrationMayTestButNotCreateNormativeThreshold: true,
    numericCutoffMayNotBeInvented: true,
    existingI107SourceMayRemainNonBinaryPositionalAuthority: true,
    existingI107SourceMayBeAutoPromotedToThresholdAuthority: false,
    hiddenStemAuthorityMaySubstitute: false,
    unrelatedClashOrCombinationSettlementAuthorityMaySubstitute: false,
    sourceRegistrationAloneClosesGap: false,
    requirementCoverageEvaluationRequiredAfterRegistration: true,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    effectiveInteractionSetResolved: false,
    damageEvaluationAuthorized: false,
    i98KeDamageVocabularyEvaluationResolved: false,
    i98ResearchMethodologyMaterializationAuthorized: false,
    hiddenStemInteractionEligibilityGapRemains: true,
    hiddenStemAuthorityGap:
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    methodologyDefinitionCreatedByThisGate: false,
    ruleDefinitionCreatedByThisGate: false,
    registrySnapshotMutatedByThisGate: false,
    reviewAttestationCreatedByThisGate: false,
    noTrackedRelationTouchSemanticsRemainUnchanged: true,
    structuralRelationKindMutationAuthorized: false,
    sourceActivationVerdictAuthorized: false,
    sourcePersistenceVerdictAuthorized: false,
    sourceEffectiveSupportVerdictAuthorized: false,
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
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_AUTHORITY_ACQUISITION_READINESS_REVIEW',
    notes: [],
  } as const;

  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityGapRequirementsReviewReport;
}

describe('I119 source 克 visible-stem interaction threshold authority acquisition readiness review', () => {
  test('freezes a single-candidate governed acquisition contract without acquiring authority', () => {
    const report = buildI119ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityAcquisitionReadinessReview(
      i118(),
    );

    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_AUTHORITY_ACQUISITION_READINESS',
    );
    expect(report.decision).toBe(
      'VISIBLE_STEM_THRESHOLD_SINGLE_CANDIDATE_GOVERNED_AUTHORITY_ACQUISITION_CONTRACT_FROZEN_NO_AUTHORITY_ACQUIRED',
    );
    expect(report.acquisitionMode).toBe(
      'SINGLE_CANDIDATE_FULL_SIX_REQUIREMENT_VISIBLE_STEM_THRESHOLD_AUTHORITY_ONLY',
    );
    expect(report.candidateDiscoveryPerformedByThisGate).toBe(false);
    expect(report.candidateRegisteredByThisGate).toBe(false);
    expect(report.requirementCoverageEvaluatedByThisGate).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
  });

  test('requires one candidate to cover all six I118 authority requirements with exact evidence', () => {
    const report = buildI119ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityAcquisitionReadinessReview(
      i118(),
    );

    expect(report.admissionRequirementCount).toBe(6);
    expect(report.admissionRequirements.map((item) => item.requirementId)).toEqual(
      REQUIREMENT_IDS,
    );
    expect(report.oneCandidatePerEvaluation).toBe(true);
    expect(report.sameCandidateMustCoverAllSixI118Requirements).toBe(true);
    expect(report.singleCandidateFullCoverageRequiredForPromotionUnderThisContract).toBe(true);
    expect(
      report.admissionRequirements.every(
        (item) =>
          item.exactEvidenceWithinSameCandidateRequired &&
          item.exactLocatorRequired &&
          item.originalOrVerifiedSourceContextRequired,
      ),
    ).toBe(true);
  });

  test('requires exact source identity, source inspection, and reproducible locators', () => {
    const report = buildI119ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityAcquisitionReadinessReview(
      i118(),
    );

    expect(report.oneNormalizedSourceReferencePerCandidateRequired).toBe(true);
    expect(report.originalSourceInspectionRequired).toBe(true);
    expect(report.exactSourceIdentityRequired).toBe(true);
    expect(report.stableRevisionOrEquivalentReproducibleLocatorRequired).toBe(true);
    expect(report.exactLocatorPerRequirementRequired).toBe(true);
    expect(report.candidateMayBeHistoricalPrimarySource).toBe(true);
    expect(report.candidateMayBeScholarlyOrInstitutionalReference).toBe(true);
    expect(report.candidateMayBePractitionerSecondarySource).toBe(true);
    expect(report.sourceClassAloneMaySatisfyRequirement).toBe(false);
  });

  test('forbids inference, calibration, qualitative ordering, and partial-candidate composition as substitute authority', () => {
    const report = buildI119ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityAcquisitionReadinessReview(
      i118(),
    );

    for (const requirement of report.admissionRequirements) {
      expect(requirement.inferredFromGeneralKnowledgeAllowed).toBe(false);
      expect(requirement.searchSnippetSubstitutionAllowed).toBe(false);
      expect(requirement.modelSynthesisSubstitutionAllowed).toBe(false);
      expect(requirement.numericCalibrationSubstitutionAllowed).toBe(false);
      expect(requirement.qualitativeOrderingAloneAllowed).toBe(false);
      expect(requirement.crossCandidateCompositionAllowed).toBe(false);
    }
    expect(report.searchSnippetMayCountAsAuthorityEvidence).toBe(false);
    expect(report.modelGeneratedSynthesisMayCountAsAuthorityEvidence).toBe(false);
    expect(report.generalKnowledgeMayCountAsAuthorityEvidence).toBe(false);
    expect(report.numericCalibrationMayCountAsNormativeAuthority).toBe(false);
    expect(report.crossCandidateCompositionAuthorized).toBe(false);
    expect(report.multiplePartialCandidatesMaySubstituteForOneAcceptedCandidate).toBe(false);
    expect(report.multiSourceCompositionPolicyResolved).toBe(false);
  });

  test('allows I107 reconsideration only under the new contract without automatic threshold credit', () => {
    const report = buildI119ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityAcquisitionReadinessReview(
      i118(),
    );

    expect(report.candidateSourceIdContext).toBe(SOURCE_ID);
    expect(report.existingNormalizedSourceReferenceMayBeReusedIfIdentityStillExact).toBe(true);
    expect(report.existingI107CandidateMayBeReconsideredUnderI119).toBe(true);
    expect(report.existingI107CandidateAutomaticallyAcceptedForThresholdAuthority).toBe(false);
    expect(report.sourceRegistrationAloneMayCloseThresholdGap).toBe(false);
    expect(report.requirementCoverageEvaluationRequiredAfterDiscovery).toBe(true);
    expect(report.vocabularyMentionAloneMaySatisfyThresholdAuthority).toBe(false);
    expect(report.qualitativePositionLanguageAloneMaySatisfyThresholdAuthority).toBe(false);
  });

  test('keeps threshold, damage, hidden-stem, settlement, scoring, and classification authority closed', () => {
    const report = buildI119ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityAcquisitionReadinessReview(
      i118(),
    );

    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.effectiveInteractionSetResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.damageEvaluationAuthorized).toBe(false);
    expect(report.i98KeDamageVocabularyEvaluationResolved).toBe(false);
    expect(report.i98ResearchMethodologyMaterializationAuthorized).toBe(false);
    expect(report.hiddenStemInteractionEligibilityGapRemains).toBe(true);
    expect(report.hiddenStemAuthorityGap).toBe(
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    );
    expect(report.hiddenStemAuthorityMaySubstitute).toBe(false);
    expect(report.clashSettlementAuthorized).toBe(false);
    expect(report.crossRelationPrecedenceAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
  });

  test('is deterministic and routes valid readiness to threshold authority candidate discovery evidence', () => {
    const first = buildI119ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityAcquisitionReadinessReview(
      i118(),
    );
    const second = buildI119ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityAcquisitionReadinessReview(
      i118(),
    );

    expect(first.reviewId).toBe(second.reviewId);
    expect(first.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE',
    );
    expect(first.methodologyDefinitionCreatedByThisGate).toBe(false);
    expect(first.ruleDefinitionCreatedByThisGate).toBe(false);
    expect(first.registrySnapshotMutatedByThisGate).toBe(false);
    expect(first.reviewAttestationCreatedByThisGate).toBe(false);
  });

  test('fails closed when I118 no longer proves the exact single-source unresolved threshold contract', () => {
    const report = buildI119ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityAcquisitionReadinessReview(
      i118({ multiSourceCompositionPolicyResolved: true }),
    );

    expect(report.status).toBe('I118_UNRESOLVED_OR_INVALID');
    expect(report.decision).toBe(
      'VISIBLE_STEM_THRESHOLD_AUTHORITY_ACQUISITION_READINESS_NOT_ESTABLISHED',
    );
    expect(report.acquisitionMode).toBe('NONE');
    expect(report.candidateSourceIdContext).toBeNull();
    expect(report.admissionRequirementCount).toBe(0);
    expect(report.admissionRequirements).toEqual([]);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_AUTHORITY_GAP_REQUIREMENTS_REVIEW',
    );
  });
});
