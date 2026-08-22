import { describe, expect, test } from 'vitest';
import {
  buildI106ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryReadinessReview,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectBlockedVocabularyAuthorityAcquisitionReadinessReviewReport,
} from '../src/index.js';

function i105(): ChallengeCombinationSupportChannelUntouchedSupportEffectBlockedVocabularyAuthorityAcquisitionReadinessReviewReport {
  const keLane = {
    sourceTerm: '克',
    laneId: 'SOURCE_KE_CONTROL_DIRECTION_AUTHORITY',
    currentBlocker: 'EXACT_FIVE_ELEMENT_CONTROL_CYCLE_AND_SOURCE_LOCAL_DIRECTION_AUTHORITY_NOT_REGISTERED',
    requiredAuthority: [
      'EXACT_FIVE_ELEMENT_CONTROL_CYCLE',
      'SOURCE_LOCAL_CONTROL_DIRECTION_MAPPING',
      'STEM_BRANCH_COMPONENT_APPLICABILITY',
      'CONTROL_DIRECTION_VS_DAMAGE_OUTCOME_SEPARATION',
    ],
    exactNormativeAuthorityRequired: true,
    originalSourceInspectionRequired: true,
    reproducibleLocatorRequired: true,
    independentRegistrationRequired: true,
    mayReuseI87SourceRegistrationContract: true,
    generalKnowledgeMaySubstitute: false,
    modelSynthesisMaySubstitute: false,
    searchSnippetMaySubstitute: false,
    existingCandidateVocabularyMentionAloneSufficient: false,
    otherLaneAuthorityMaySubstitute: false,
    structuralRelationKindRequiredAfterAuthority: false,
    directionalEvidenceAdapterRequiredAfterAuthority: true,
    protectionEffectStateTaxonomyRequiredAfterAuthority: false,
    implementationAuthorizedByThisGate: false,
    effectOrPersistenceOutcomeAuthorizedByThisGate: false,
    notes: [],
  } as const;

  return {
    reviewId: 'i105_i106_fixture',
    reviewVersion: 'fixture',
    status: 'RESOLVED_BLOCKED_VOCABULARY_AUTHORITY_ACQUISITION_READINESS',
    decision: 'KE_XING_WEI_AUTHORITY_ACQUISITION_LANES_SEPARATED_CROSS_LANE_SUBSTITUTION_BLOCKED',
    upstreamI104ReviewId: 'i104_fixture',
    candidateSourceId: 'source_chenyuan_sizhu_yuce_rumen_1995_isbn9787805922515',
    blockedTerms: ['克', '刑', '卫'],
    lanes: [
      keLane,
      { ...keLane, sourceTerm: '刑', laneId: 'SOURCE_XING_BRANCH_PUNISHMENT_IDENTITY_AUTHORITY' },
      { ...keLane, sourceTerm: '卫', laneId: 'SOURCE_WEI_PROTECTION_EFFECT_CRITERIA_AUTHORITY' },
    ],
    laneCount: 3,
    allThreeBlockedTermsAssignedIndependentLane: true,
    sourceKeLaneReadyForGovernedDiscovery: true,
    sourceXingLaneReadyForGovernedDiscovery: true,
    sourceWeiLaneReadyForGovernedDiscovery: true,
    crossLaneSubstitutionAuthorized: false,
    partialLaneCompletionMaySatisfyAllSixI98Bindings: false,
    existingCandidateVocabularyMentionMayCloseAuthorityGap: false,
    generalKnowledgeInferenceAuthorized: false,
    sourceKeMayInferControlCycleFromFiveElementFacts: false,
    sourceXingMayInferPunishmentPairsWithoutRegisteredAuthority: false,
    sourceWeiMayInferProtectionFromSupportPresence: false,
    sourceWeiMayCollapseIntoClashRescue: false,
    sourceXingMayCollapseIntoBranchClash: false,
    sourceKeStructuralRelationKindRequired: false,
    sourceXingStructuralRelationKindRequired: true,
    sourceWeiStructuralRelationKindRequired: false,
    sourceKeDirectionalEvidenceAdapterRequired: true,
    sourceWeiProtectionEffectStateTaxonomyRequired: true,
    acquisitionResultMayDirectlyCreateMethodologyDefinition: false,
    acquisitionResultMayDirectlyCreateRuleDefinition: false,
    acquisitionResultMayDirectlyMutateRegistry: false,
    acquisitionResultMayDirectlyAuthorizeExecution: false,
    methodologyDefinitionCreatedByThisGate: false,
    methodologyRegisteredByThisGate: false,
    ruleDefinitionCreatedByThisGate: false,
    registrySnapshotMutatedByThisGate: false,
    reviewAttestationCreatedByThisGate: false,
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
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_AUTHORITY_CANDIDATE_DISCOVERY_READINESS_REVIEW',
    notes: [],
  } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectBlockedVocabularyAuthorityAcquisitionReadinessReviewReport;
}

describe('I106 source 克 authority candidate discovery readiness', () => {
  test('freezes the single-candidate governed discovery mode for the 克 lane', () => {
    const report = buildI106ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryReadinessReview(i105());
    expect(report.status).toBe('RESOLVED_SOURCE_KE_AUTHORITY_CANDIDATE_DISCOVERY_READINESS');
    expect(report.targetSourceTerm).toBe('克');
    expect(report.targetLaneId).toBe('SOURCE_KE_CONTROL_DIRECTION_AUTHORITY');
    expect(report.discoveryMode).toBe('SINGLE_CANDIDATE_EXACT_KE_AUTHORITY_SCOPE_ONLY');
    expect(report.oneCandidatePerEvaluation).toBe(true);
  });

  test('requires all four 克 authority requirements inside the same candidate', () => {
    const report = buildI106ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryReadinessReview(i105());
    expect(report.sameCandidateMustCoverAllFourKeRequirements).toBe(true);
    expect(report.admissionRequirementCount).toBe(4);
    expect(report.admissionRequirements.map((item) => item.requirement)).toEqual([
      'EXACT_FIVE_ELEMENT_CONTROL_CYCLE',
      'SOURCE_LOCAL_CONTROL_DIRECTION_MAPPING',
      'STEM_BRANCH_COMPONENT_APPLICABILITY',
      'CONTROL_DIRECTION_VS_DAMAGE_OUTCOME_SEPARATION',
    ]);
    expect(report.admissionRequirements.every((item) => item.exactEvidenceWithinSameCandidateRequired && item.exactLocatorRequired)).toBe(true);
  });

  test('forbids general-knowledge and FiveElement-label inference for the control cycle', () => {
    const report = buildI106ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryReadinessReview(i105());
    expect(report.generalKnowledgeControlCycleMayCountAsAuthorityEvidence).toBe(false);
    expect(report.fiveElementFactsMayImplicitlyDefineControlCycle).toBe(false);
    expect(report.admissionRequirements.every((item) => item.inferredFromGeneralKnowledgeAllowed === false && item.inferredFromFiveElementLabelsAllowed === false)).toBe(true);
  });

  test('forbids cross-candidate composition and partial-candidate substitution', () => {
    const report = buildI106ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryReadinessReview(i105());
    expect(report.crossCandidateCompositionAuthorized).toBe(false);
    expect(report.multiplePartialCandidatesMaySubstituteForOneAcceptedCandidate).toBe(false);
    expect(report.admissionRequirements.every((item) => item.crossCandidateCompositionAllowed === false)).toBe(true);
  });

  test('does not auto-accept the existing I95 candidate or a vocabulary mention', () => {
    const report = buildI106ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryReadinessReview(i105());
    expect(report.existingI95CandidateAutomaticallyAcceptedForKe).toBe(false);
    expect(report.vocabularyMentionAloneMaySatisfyKeAuthority).toBe(false);
    expect(report.searchSnippetMayCountAsAuthorityEvidence).toBe(false);
    expect(report.modelGeneratedSynthesisMayCountAsAuthorityEvidence).toBe(false);
  });

  test('requires reproducible source registration and exact locator evidence regardless of source class', () => {
    const report = buildI106ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryReadinessReview(i105());
    expect(report.oneNormalizedSourceReferencePerCandidateRequired).toBe(true);
    expect(report.originalSourceInspectionRequired).toBe(true);
    expect(report.exactSourceIdentityRequired).toBe(true);
    expect(report.stableRevisionOrEquivalentReproducibleLocatorRequired).toBe(true);
    expect(report.exactLocatorPerRequirementRequired).toBe(true);
    expect(report.sourceRegistrationContractMayReuseI87).toBe(true);
    expect(report.sourceClassAloneMaySatisfyRequirement).toBe(false);
  });

  test('fails closed when the upstream 克 lane improperly permits general-knowledge substitution', () => {
    const upstream = i105();
    const invalid = {
      ...upstream,
      lanes: upstream.lanes.map((lane) =>
        lane.sourceTerm === '克' ? { ...lane, generalKnowledgeMaySubstitute: true } : lane,
      ),
    } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectBlockedVocabularyAuthorityAcquisitionReadinessReviewReport;
    const report = buildI106ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryReadinessReview(invalid);
    expect(report.status).toBe('I105_UNRESOLVED_OR_INVALID');
    expect(report.discoveryMode).toBe('NONE');
    expect(report.admissionRequirements).toEqual([]);
  });

  test('is deterministic and preserves all discovery-only and downstream guards', () => {
    const first = buildI106ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryReadinessReview(i105());
    const second = buildI106ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryReadinessReview(i105());
    expect(first.reviewId).toBe(second.reviewId);
    expect(first.candidateDiscoveryPerformedByThisGate).toBe(false);
    expect(first.candidateRegisteredByThisGate).toBe(false);
    expect(first.authorityAcquiredByThisGate).toBe(false);
    expect(first.keDirectionalAdapterImplementedByThisGate).toBe(false);
    expect(first.structuralRelationKindMutationAuthorizedByThisGate).toBe(false);
    expect(first.directionEvidenceMayBePromotedToDamageOutcome).toBe(false);
    expect(first.sourceActivationVerdictAuthorized).toBe(false);
    expect(first.sourcePersistenceVerdictAuthorized).toBe(false);
    expect(first.sourceEffectiveSupportVerdictAuthorized).toBe(false);
    expect(first.relativeForceVerdictAuthorized).toBe(false);
    expect(first.crossRelationPrecedenceAuthorized).toBe(false);
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
    expect(first.recommendedNextGate).toBe('UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE');
  });
});
