import { describe, expect, test } from 'vitest';
import {
  buildI118ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityGapRequirementsReview,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemEffectiveInteractionEligibilityMethodologyReviewReport,
} from '../src/index.js';

const SOURCE_ID = 'source_chenyuan_sizhu_yuce_rumen_1995_isbn9787805922515';

function i117(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemEffectiveInteractionEligibilityMethodologyReviewReport {
  const base = {
    reviewId: 'i117_i118_fixture',
    reviewVersion: 'fixture',
    status: 'RESOLVED_SOURCE_KE_VISIBLE_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY_METHODOLOGY_REVIEW',
    decision:
      'VISIBLE_STEM_POSITIONAL_FORCE_SEMANTICS_AVAILABLE_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY_THRESHOLD_NOT_AUTHORIZED',
    candidateSourceId: SOURCE_ID,
    sourceTerm: '克',
    sourceVisibleStemLocatorVerified: true,
    sourceVisibleStemAnchor: '两干相克；邻干力大，隔干次之，远干无力',
    sourceExplicitlyDescribesVisibleStemKeRelation: true,
    sourceExplicitlyDistinguishesPositionalQualitativeForce: true,
    sourcePositionVocabulary: ['邻干', '隔干', '远干'],
    sourceQualitativeForceVocabulary: ['力大', '次之', '无力'],
    visibleStemPositionalSubstrateComplete: true,
    sourceEstablishesQualitativePositionalForceOrdering: true,
    sourceEstablishesBinaryInteractionThreshold: false,
    sourceExplicitlyDefinesWuLiAsNoInteraction: false,
    sourceExplicitlyDefinesWuLiAsZeroEffect: false,
    sourceProvidesNumericThreshold: false,
    sourceProvidesBooleanEligibilityRule: false,
    binaryEligibilityMayBeInferredFromQualitativeOrdering: false,
    farStemNoForceMayBePromotedToNoInteraction: false,
    qualitativeOrderingMayBeConvertedToNumericWeight: false,
    slotDistanceMayBeUsedAsNumericInteractionThreshold: false,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    visibleStemInteractionThresholdAuthorityGapConfirmed: true,
    visibleStemInteractionThresholdAuthorityGap:
      'SOURCE_KE_VISIBLE_STEM_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY_THRESHOLD_UNRESOLVED',
    additionalAuthorityRequiredForBinaryEligibilityThreshold: true,
    existingSourceMayStillSupportNonBinaryPositionalEvidence: true,
    positionalEvidenceMayRemainResearchEvidenceWithoutBinaryEligibility: true,
    damageEvaluationMayProceedWithoutBinaryEligibilityResolution: false,
    i98KeDamageVocabularyEvaluationResolved: false,
    i98ResearchMethodologyMaterializationAuthorized: false,
    hiddenStemInteractionEligibilityGapRemains: true,
    hiddenStemAuthorityGap:
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    visibleStemThresholdReviewMayResolveHiddenStemEligibility: false,
    effectiveInteractionSetResolved: false,
    damageOutcomeAuthorized: false,
    damageMagnitudeAuthorized: false,
    settlementOutcomeAuthorized: false,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_AUTHORITY_GAP_REQUIREMENTS_REVIEW',
    notes: [],
  } as const;

  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemEffectiveInteractionEligibilityMethodologyReviewReport;
}

describe('I118 source 克 visible-stem interaction threshold authority gap requirements review', () => {
  test('freezes the six-requirement authority acceptance contract without authorizing a threshold', () => {
    const report = buildI118ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityGapRequirementsReview(
      i117(),
    );

    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_AUTHORITY_GAP_REQUIREMENTS_REVIEW',
    );
    expect(report.decision).toBe(
      'VISIBLE_STEM_BINARY_INTERACTION_THRESHOLD_AUTHORITY_ACCEPTANCE_CONTRACT_FROZEN_NO_THRESHOLD_AUTHORIZED',
    );
    expect(report.confirmedAuthorityGap).toBe(
      'SOURCE_KE_VISIBLE_STEM_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY_THRESHOLD_UNRESOLVED',
    );
    expect(report.authorityGapConfirmed).toBe(true);
    expect(report.authorityGapClosed).toBe(false);
    expect(report.additionalAuthorityRequired).toBe(true);
    expect(report.requirementCount).toBe(6);
  });

  test('freezes the exact mandatory requirement inventory', () => {
    const report = buildI118ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityGapRequirementsReview(
      i117(),
    );

    expect(report.requirements.map((item) => item.requirementId)).toEqual([
      'EXPLICIT_BINARY_EFFECTIVE_INTERACTION_SEMANTICS',
      'VISIBLE_STEM_POSITION_SCOPE_AND_POSITION_CLASS_APPLICABILITY',
      'QUALITATIVE_FORCE_VS_BINARY_ELIGIBILITY_SEPARATION',
      'WU_LI_BOUNDARY_SEMANTICS_AND_EXCEPTIONS',
      'CONTEXT_AND_EXCEPTION_CONDITIONS',
      'INDEPENDENT_NORMATIVE_PROVENANCE',
    ]);
    expect(report.allRequirementsMandatory).toBe(true);
    expect(report.allRequirementsCurrentlyUnsatisfied).toBe(true);
    expect(report.requirements.every((item) => item.mandatory)).toBe(true);
  });

  test('forbids general knowledge, snippets, model synthesis, calibration, and qualitative ordering as substitute authority', () => {
    const report = buildI118ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityGapRequirementsReview(
      i117(),
    );

    for (const requirement of report.requirements) {
      expect(requirement.currentlySatisfiedByI107Source).toBe(false);
      expect(requirement.mayBeSatisfiedByGeneralKnowledge).toBe(false);
      expect(requirement.mayBeSatisfiedBySearchSnippet).toBe(false);
      expect(requirement.mayBeSatisfiedByModelSynthesis).toBe(false);
      expect(requirement.mayBeSatisfiedByNumericCalibration).toBe(false);
      expect(requirement.mayBeSatisfiedByQualitativeOrderingAlone).toBe(false);
    }
    expect(report.crossCandidateSynthesisAuthorized).toBe(false);
    expect(report.multiSourceCompositionPolicyResolved).toBe(false);
  });

  test('preserves qualitative force and 无力 boundaries instead of converting them into Boolean eligibility', () => {
    const report = buildI118ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityGapRequirementsReview(
      i117(),
    );

    expect(report.relationExistenceMustRemainDistinctFromEffectiveInteraction).toBe(true);
    expect(report.qualitativeForceOrderingMayNotSubstituteForBinaryThreshold).toBe(true);
    expect(report.wuLiMayNotBePreclassifiedAsNoInteraction).toBe(true);
    expect(report.liDaMayNotBePreclassifiedAsEligible).toBe(true);
    expect(report.ciZhiMayNotBePreclassifiedAsEligible).toBe(true);
    expect(report.numericCutoffMayNotBeInvented).toBe(true);
    expect(report.empiricalCalibrationMayTestButNotCreateNormativeThreshold).toBe(true);
  });

  test('keeps the existing source as non-binary positional authority but blocks automatic threshold promotion', () => {
    const report = buildI118ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityGapRequirementsReview(
      i117(),
    );

    expect(report.candidateSourceIdContext).toBe(SOURCE_ID);
    expect(report.existingI107SourceMayRemainNonBinaryPositionalAuthority).toBe(true);
    expect(report.existingI107SourceMayBeAutoPromotedToThresholdAuthority).toBe(false);
    expect(report.sourceRegistrationAloneClosesGap).toBe(false);
    expect(report.requirementCoverageEvaluationRequiredAfterRegistration).toBe(true);
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.effectiveInteractionSetResolved).toBe(false);
    expect(report.damageEvaluationAuthorized).toBe(false);
  });

  test('keeps hidden-stem authority and global settlement/classification guards closed', () => {
    const report = buildI118ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityGapRequirementsReview(
      i117(),
    );

    expect(report.hiddenStemInteractionEligibilityGapRemains).toBe(true);
    expect(report.hiddenStemAuthorityGap).toBe(
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    );
    expect(report.hiddenStemAuthorityMaySubstitute).toBe(false);
    expect(report.unrelatedClashOrCombinationSettlementAuthorityMaySubstitute).toBe(false);
    expect(report.i98KeDamageVocabularyEvaluationResolved).toBe(false);
    expect(report.i98ResearchMethodologyMaterializationAuthorized).toBe(false);
    expect(report.sourceActivationVerdictAuthorized).toBe(false);
    expect(report.sourcePersistenceVerdictAuthorized).toBe(false);
    expect(report.relativeForceVerdictAuthorized).toBe(false);
    expect(report.clashSettlementAuthorized).toBe(false);
    expect(report.crossRelationPrecedenceAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
  });

  test('is deterministic and routes a valid review to authority acquisition readiness', () => {
    const first = buildI118ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityGapRequirementsReview(
      i117(),
    );
    const second = buildI118ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityGapRequirementsReview(
      i117(),
    );

    expect(first.reviewId).toBe(second.reviewId);
    expect(first.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_AUTHORITY_ACQUISITION_READINESS_REVIEW',
    );
    expect(first.methodologyDefinitionCreatedByThisGate).toBe(false);
    expect(first.ruleDefinitionCreatedByThisGate).toBe(false);
    expect(first.registrySnapshotMutatedByThisGate).toBe(false);
    expect(first.reviewAttestationCreatedByThisGate).toBe(false);
  });

  test('fails closed when I117 no longer proves the exact unresolved-threshold boundary', () => {
    const report = buildI118ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityGapRequirementsReview(
      i117({ sourceEstablishesBinaryInteractionThreshold: true }),
    );

    expect(report.status).toBe('I117_UNRESOLVED_OR_INVALID');
    expect(report.decision).toBe(
      'VISIBLE_STEM_INTERACTION_THRESHOLD_AUTHORITY_REQUIREMENTS_NOT_FROZEN',
    );
    expect(report.confirmedAuthorityGap).toBe('UPSTREAM_INVALID');
    expect(report.authorityGapConfirmed).toBe(false);
    expect(report.additionalAuthorityRequired).toBe(false);
    expect(report.requirementCount).toBe(0);
    expect(report.requirements).toEqual([]);
    expect(report.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_AUTHORITY_GAP_REQUIREMENTS_REVIEW',
    );
  });
});
