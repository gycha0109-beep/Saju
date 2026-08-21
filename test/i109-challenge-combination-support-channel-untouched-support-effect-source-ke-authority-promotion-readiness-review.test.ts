import { describe, expect, test } from 'vitest';
import {
  buildI107ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryEvidence,
  buildI108ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityRequirementCoverageEvaluationEvidence,
  buildI109ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityPromotionReadinessReview,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryReadinessReviewReport,
} from '../src/index.js';

function i106(): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryReadinessReviewReport {
  const requirements = [
    'EXACT_FIVE_ELEMENT_CONTROL_CYCLE',
    'SOURCE_LOCAL_CONTROL_DIRECTION_MAPPING',
    'STEM_BRANCH_COMPONENT_APPLICABILITY',
    'CONTROL_DIRECTION_VS_DAMAGE_OUTCOME_SEPARATION',
  ] as const;
  return {
    reviewId: 'i106_i109_fixture',
    reviewVersion: 'fixture',
    status: 'RESOLVED_SOURCE_KE_AUTHORITY_CANDIDATE_DISCOVERY_READINESS',
    decision: 'SOURCE_KE_SINGLE_CANDIDATE_GOVERNED_DISCOVERY_CONTRACT_FROZEN_NO_AUTHORITY_ACQUIRED',
    upstreamI105ReviewId: 'i105_fixture',
    candidateSourceIdContext: 'source_chenyuan_sizhu_yuce_rumen_1995_isbn9787805922515',
    targetSourceTerm: '克',
    targetLaneId: 'SOURCE_KE_CONTROL_DIRECTION_AUTHORITY',
    discoveryMode: 'SINGLE_CANDIDATE_EXACT_KE_AUTHORITY_SCOPE_ONLY',
    oneCandidatePerEvaluation: true,
    oneNormalizedSourceReferencePerCandidateRequired: true,
    originalSourceInspectionRequired: true,
    exactSourceIdentityRequired: true,
    stableRevisionOrEquivalentReproducibleLocatorRequired: true,
    exactLocatorPerRequirementRequired: true,
    sameCandidateMustCoverAllFourKeRequirements: true,
    admissionRequirements: requirements.map((requirement) => ({
      requirement,
      exactEvidenceWithinSameCandidateRequired: true,
      exactLocatorRequired: true,
      inferredFromGeneralKnowledgeAllowed: false,
      inferredFromFiveElementLabelsAllowed: false,
      crossCandidateCompositionAllowed: false,
    })),
    admissionRequirementCount: 4,
    sourceRegistrationContractMayReuseI87: true,
    candidateMayBeHistoricalPrimarySource: true,
    candidateMayBeScholarlyOrInstitutionalReference: true,
    candidateMayBePractitionerSecondarySource: true,
    sourceClassAloneMaySatisfyRequirement: false,
    existingI95CandidateAutomaticallyAcceptedForKe: false,
    vocabularyMentionAloneMaySatisfyKeAuthority: false,
    searchSnippetMayCountAsAuthorityEvidence: false,
    modelGeneratedSynthesisMayCountAsAuthorityEvidence: false,
    generalKnowledgeControlCycleMayCountAsAuthorityEvidence: false,
    fiveElementFactsMayImplicitlyDefineControlCycle: false,
    crossCandidateCompositionAuthorized: false,
    multiplePartialCandidatesMaySubstituteForOneAcceptedCandidate: false,
    numericCalibrationMayCountAsNormativeAuthority: false,
    directionEvidenceMayBePromotedToDamageOutcome: false,
    candidateDiscoveryPerformedByThisGate: false,
    candidateRegisteredByThisGate: false,
    authorityAcquiredByThisGate: false,
    keDirectionalAdapterImplementedByThisGate: false,
    structuralRelationKindMutationAuthorizedByThisGate: false,
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
    recommendedNextGate: 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE',
    notes: [],
  };
}

function i108() {
  const i107 = buildI107ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryEvidence(i106());
  return buildI108ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityRequirementCoverageEvaluationEvidence(i107);
}

describe('I109 source 克 authority promotion readiness', () => {
  test('allows only entry into a research directional-evidence adapter contract', () => {
    const report = buildI109ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityPromotionReadinessReview(i108());
    expect(report.status).toBe('RESOLVED_SOURCE_KE_AUTHORITY_PROMOTION_READINESS');
    expect(report.decision).toBe('KE_FOUR_OF_FOUR_COVERAGE_CAN_ENTER_RESEARCH_DIRECTIONAL_EVIDENCE_ADAPTER_CONTRACT_DIRECT_IMPLEMENTATION_AND_EFFECT_PROMOTION_BLOCKED');
    expect(report.allFourKeAuthorityRequirementsSatisfied).toBe(true);
    expect(report.authorityCoverageGapSatisfied).toBe(true);
    expect(report.promotionLifecycleEntryReady).toBe(true);
    expect(report.authorizedEntryStage).toBe('RESEARCH_KE_DIRECTIONAL_EVIDENCE_ADAPTER_CONTRACT');
    expect(report.semanticCeiling).toBe('EVIDENCE_BINDING_ONLY');
  });

  test('requires exact cycle direction and component identity preservation', () => {
    const report = buildI109ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityPromotionReadinessReview(i108());
    expect(report.researchKeDirectionalEvidenceAdapterContractRequired).toBe(true);
    expect(report.exactFiveElementControlCycleMustBePreserved).toBe(true);
    expect(report.sourceToTargetDirectionMustBePreserved).toBe(true);
    expect(report.sourceAndTargetComponentIdentityRequired).toBe(true);
    expect(report.visibleStemApplicabilityAllowedByContract).toBe(true);
  });

  test('keeps branch applicability scoped to hidden stems', () => {
    const report = buildI109ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityPromotionReadinessReview(i108());
    expect(report.branchHiddenStemApplicabilityAllowedByContract).toBe(true);
    expect(report.branchApplicabilityScope).toBe('EARTHLY_BRANCH_HIDDEN_STEMS_WITHIN_FIVE_ELEMENT_CONTROL_FRAMEWORK');
    expect(report.rawBranchElementDirectControlRuleAuthorized).toBe(false);
  });

  test('keeps control direction separate from damage and settlement', () => {
    const report = buildI109ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityPromotionReadinessReview(i108());
    expect(report.adapterMustKeepControlDirectionSeparateFromDamageOutcome).toBe(true);
    expect(report.adapterMustKeepControlDirectionSeparateFromDamageMagnitude).toBe(true);
    expect(report.adapterMayEmitDamageOutcome).toBe(false);
    expect(report.adapterMayEmitDamageMagnitude).toBe(false);
    expect(report.adapterMayEmitSettlementOutcome).toBe(false);
    expect(report.adapterMayEmitRelativeForceVerdict).toBe(false);
    expect(report.adapterMayEmitPrecedenceVerdict).toBe(false);
  });

  test('does not create or require a new structural relation kind for 克', () => {
    const report = buildI109ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityPromotionReadinessReview(i108());
    expect(report.structuralRelationKindMutationAuthorized).toBe(false);
    expect(report.keStructuralRelationKindRequired).toBe(false);
    expect(report.directSourceToExecutableAdapterPromotionAuthorized).toBe(false);
    expect(report.keDirectionalAdapterImplementationAuthorizedByThisGate).toBe(false);
  });

  test('keeps single-source research entry separate from production quality', () => {
    const report = buildI109ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityPromotionReadinessReview(i108());
    expect(report.singlePractitionerSecondarySourceProductionQualitySufficient).toBe(false);
    expect(report.productionMultiSourceSupportStillRequired).toBe(true);
    expect(report.candidateMayRemainResearchEvidenceWithoutProductionPromotion).toBe(true);
    expect(report.stagingPromotionAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
  });

  test('fails closed if I108 no longer has exact four-of-four supported coverage', () => {
    const upstream = i108();
    const invalid = {
      ...upstream,
      satisfiedRequirementCount: 3,
      candidateSatisfiesAllFourKeRequirements: false,
    } as unknown as typeof upstream;
    const report = buildI109ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityPromotionReadinessReview(invalid);
    expect(report.status).toBe('I108_UNRESOLVED_OR_INVALID');
    expect(report.promotionLifecycleEntryReady).toBe(false);
    expect(report.authorizedEntryStage).toBe('none');
    expect(report.semanticCeiling).toBe('NONE');
  });

  test('is deterministic and preserves all effect scoring classification guards', () => {
    const first = buildI109ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityPromotionReadinessReview(i108());
    const second = buildI109ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityPromotionReadinessReview(i108());
    expect(first.reviewId).toBe(second.reviewId);
    expect(first.keAuthorityGapClosed).toBe(false);
    expect(first.ruleDefinitionCreationAuthorized).toBe(false);
    expect(first.methodologyDefinitionCreationAuthorized).toBe(false);
    expect(first.registrySnapshotMutationAuthorized).toBe(false);
    expect(first.sourceActivationVerdictAuthorized).toBe(false);
    expect(first.sourcePersistenceVerdictAuthorized).toBe(false);
    expect(first.sourceEffectiveSupportVerdictAuthorized).toBe(false);
    expect(first.relativeForceVerdictAuthorized).toBe(false);
    expect(first.clashSettlementAuthorized).toBe(false);
    expect(first.crossRelationPrecedenceAuthorized).toBe(false);
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
    expect(first.recommendedNextGate).toBe('UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_DIRECTIONAL_EVIDENCE_ADAPTER_CONTRACT');
  });
});
