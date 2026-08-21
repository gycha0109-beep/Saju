import { describe, expect, test } from 'vitest';
import {
  buildI107ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryEvidence,
  buildI108ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityRequirementCoverageEvaluationEvidence,
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
    reviewId: 'i106_i108_fixture',
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

function i107() {
  return buildI107ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryEvidence(i106());
}

describe('I108 source 克 authority requirement coverage evaluation', () => {
  test('independently satisfies all four frozen 克 authority requirements', () => {
    const report = buildI108ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityRequirementCoverageEvaluationEvidence(i107());
    expect(report.status).toBe('RESOLVED_SOURCE_KE_AUTHORITY_REQUIREMENT_COVERAGE_EVALUATION_EVIDENCE');
    expect(report.evaluatedRequirementCount).toBe(4);
    expect(report.satisfiedRequirementCount).toBe(4);
    expect(report.partialRequirementCount).toBe(0);
    expect(report.unsupportedRequirementCount).toBe(0);
    expect(report.allFourRequirementsEvaluated).toBe(true);
    expect(report.candidateSatisfiesAllFourKeRequirements).toBe(true);
    expect(report.keAuthorityCoverageGapSatisfied).toBe(true);
  });

  test('binds exact cycle coverage to registered source evidence rather than general knowledge', () => {
    const report = buildI108ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityRequirementCoverageEvaluationEvidence(i107());
    const item = report.coverage.find((entry) => entry.requirement === 'EXACT_FIVE_ELEMENT_CONTROL_CYCLE');
    expect(item?.coverageState).toBe('SUPPORTED_BY_REGISTERED_EVIDENCE');
    expect(item?.countsAsSatisfiedForKeAuthorityCoverage).toBe(true);
    expect(item?.evidenceLocator).toContain('五行生克');
    expect(item?.generalKnowledgeMaySubstitute).toBe(false);
    expect(item?.fiveElementLabelsAloneMaySubstitute).toBe(false);
  });

  test('satisfies source-local directional mapping without authorizing force or precedence', () => {
    const report = buildI108ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityRequirementCoverageEvaluationEvidence(i107());
    const item = report.coverage.find((entry) => entry.requirement === 'SOURCE_LOCAL_CONTROL_DIRECTION_MAPPING');
    expect(item?.coverageState).toBe('SUPPORTED_BY_REGISTERED_EVIDENCE');
    expect(item?.evidenceLocator).toContain('天干生克要则');
    expect(item?.directionMayBePromotedToDamageOutcome).toBe(false);
    expect(report.crossRelationPrecedenceAuthorized).toBe(false);
    expect(report.relativeForceVerdictAuthorized).toBe(false);
  });

  test('scopes branch applicability to hidden stems rather than inventing raw branch-element control', () => {
    const report = buildI108ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityRequirementCoverageEvaluationEvidence(i107());
    const item = report.coverage.find((entry) => entry.requirement === 'STEM_BRANCH_COMPONENT_APPLICABILITY');
    expect(item?.coverageState).toBe('SUPPORTED_BY_REGISTERED_EVIDENCE');
    expect(item?.evidenceLocator).toContain('地支藏干');
    expect(report.branchApplicabilityScope).toBe('EARTHLY_BRANCH_HIDDEN_STEMS_WITHIN_FIVE_ELEMENT_CONTROL_FRAMEWORK');
    expect(report.rawBranchElementDirectControlRuleAuthorized).toBe(false);
  });

  test('satisfies control-vs-outcome separation while keeping damage settlement unresolved', () => {
    const report = buildI108ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityRequirementCoverageEvaluationEvidence(i107());
    const item = report.coverage.find((entry) => entry.requirement === 'CONTROL_DIRECTION_VS_DAMAGE_OUTCOME_SEPARATION');
    expect(item?.coverageState).toBe('SUPPORTED_BY_REGISTERED_EVIDENCE');
    expect(item?.evidenceLocator).toContain('见生就吉见克就凶');
    expect(report.controlDirectionMayBeTreatedAsDamageOutcome).toBe(false);
    expect(report.controlDirectionMayBeTreatedAsDamageMagnitude).toBe(false);
    expect(report.clashSettlementAuthorized).toBe(false);
  });

  test('closes only the research coverage gap and requires promotion readiness review', () => {
    const report = buildI108ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityRequirementCoverageEvaluationEvidence(i107());
    expect(report.keAuthorityCoverageGapSatisfied).toBe(true);
    expect(report.keAuthorityGapClosed).toBe(false);
    expect(report.candidateAcceptedForKeAuthority).toBe(false);
    expect(report.candidatePromotedToKeAuthority).toBe(false);
    expect(report.sourceReferenceApprovedForKeAdapterUse).toBe(false);
    expect(report.promotionReadinessReviewRequired).toBe(true);
    expect(report.additionalKeCandidateDiscoveryRequired).toBe(false);
  });

  test('fails closed when I107 has already promoted direction evidence to a damage outcome', () => {
    const invalid = {
      ...i107(),
      directionEvidencePromotedToDamageOutcome: true,
    } as unknown as ReturnType<typeof i107>;
    const report = buildI108ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityRequirementCoverageEvaluationEvidence(invalid);
    expect(report.status).toBe('I107_UNRESOLVED_OR_INVALID');
    expect(report.coverage).toEqual([]);
    expect(report.keAuthorityCoverageGapSatisfied).toBe(false);
  });

  test('is deterministic and preserves adapter production scoring and classification guards', () => {
    const first = buildI108ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityRequirementCoverageEvaluationEvidence(i107());
    const second = buildI108ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityRequirementCoverageEvaluationEvidence(i107());
    expect(first.evidenceId).toBe(second.evidenceId);
    expect(first.sourceClassAloneMayAuthorizeAdapter).toBe(false);
    expect(first.singlePractitionerSecondarySourceMayAuthorizeProductionRule).toBe(false);
    expect(first.keDirectionalAdapterImplementationAuthorizedByThisGate).toBe(false);
    expect(first.structuralRelationKindMutationAuthorizedByThisGate).toBe(false);
    expect(first.methodologyDefinitionCreatedByThisGate).toBe(false);
    expect(first.sourceActivationVerdictAuthorized).toBe(false);
    expect(first.sourcePersistenceVerdictAuthorized).toBe(false);
    expect(first.sourceEffectiveSupportVerdictAuthorized).toBe(false);
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
    expect(first.recommendedNextGate).toBe('UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_AUTHORITY_PROMOTION_READINESS_REVIEW');
  });
});
