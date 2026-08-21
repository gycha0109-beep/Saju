import { describe, expect, test } from 'vitest';
import {
  buildI107ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryEvidence,
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
    reviewId: 'i106_i107_fixture',
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

describe('I107 source 克 authority candidate discovery evidence', () => {
  test('reinspects one existing normalized source under I106 without borrowing I95 coverage', () => {
    const report = buildI107ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryEvidence(i106());
    expect(report.status).toBe('RESOLVED_SOURCE_KE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE');
    expect(report.externalDiscoveryPerformed).toBe(true);
    expect(report.candidateReconsideredUnderI106).toBe(true);
    expect(report.priorI95CoverageBorrowed).toBe(false);
    expect(report.i95CandidateAutoAcceptanceUsed).toBe(false);
    expect(report.candidateRegistrationMode).toBe('REUSE_EXISTING_NORMALIZED_SOURCE_REFERENCE_NEW_KE_LANE_INSPECTION');
  });

  test('preserves the exact 陈园 1995 source identity and practitioner-secondary ceiling', () => {
    const report = buildI107ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryEvidence(i106());
    expect(report.candidateSourceId).toBe('source_chenyuan_sizhu_yuce_rumen_1995_isbn9787805922515');
    expect(report.candidateSourceReference?.author).toBe('陈园');
    expect(report.candidateSourceReference?.publisher).toBe('广州出版社');
    expect(report.candidateSourceReference?.publicationYear).toBe(1995);
    expect(report.candidateSourceClass).toBe('practitioner_secondary');
    expect(report.sourceBibliographyCrossVerified).toBe(true);
    expect(report.exactBookEditionIdentityResolved).toBe(true);
  });

  test('locates all four 克 requirement topics inside the same candidate', () => {
    const report = buildI107ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryEvidence(i106());
    expect(report.sameCandidateProvidesAllFourTopicLocators).toBe(true);
    expect(report.requirementEvidenceCount).toBe(4);
    expect(report.requirementEvidence.map((item) => item.requirement)).toEqual([
      'EXACT_FIVE_ELEMENT_CONTROL_CYCLE',
      'SOURCE_LOCAL_CONTROL_DIRECTION_MAPPING',
      'STEM_BRANCH_COMPONENT_APPLICABILITY',
      'CONTROL_DIRECTION_VS_DAMAGE_OUTCOME_SEPARATION',
    ]);
    expect(report.requirementEvidence.every((item) => item.sourceTextInspectedAtLocator && item.exactLocatorResolved)).toBe(true);
  });

  test('keeps cycle, position-sensitive direction, branch-hidden-stem applicability and outcome separation as distinct evidence topics', () => {
    const report = buildI107ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryEvidence(i106());
    const byRequirement = new Map(report.requirementEvidence.map((item) => [item.requirement, item]));
    expect(byRequirement.get('EXACT_FIVE_ELEMENT_CONTROL_CYCLE')?.section).toContain('五行生克');
    expect(byRequirement.get('SOURCE_LOCAL_CONTROL_DIRECTION_MAPPING')?.section).toContain('天干生克要则');
    expect(byRequirement.get('STEM_BRANCH_COMPONENT_APPLICABILITY')?.anchor).toContain('地支藏干');
    expect(byRequirement.get('CONTROL_DIRECTION_VS_DAMAGE_OUTCOME_SEPARATION')?.anchor).toContain('见克就凶');
  });

  test('does not evaluate or accept any of the four requirements during discovery', () => {
    const report = buildI107ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryEvidence(i106());
    expect(report.allFourRequirementTopicsRepresentedForLaterEvaluation).toBe(true);
    expect(report.allFourRequirementsRemainNotEvaluated).toBe(true);
    expect(report.requirementEvaluationPerformedByThisGate).toBe(false);
    expect(report.requirementEvidence.every((item) => item.countsAsRequirementSatisfied === false)).toBe(true);
    expect(report.candidateAcceptedForKeAuthority).toBe(false);
    expect(report.keAuthorityAcquiredByThisGate).toBe(false);
  });

  test('records original/reproducible inspection without using snippets synthesis or composition as authority', () => {
    const report = buildI107ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryEvidence(i106());
    expect(report.originalSourceTextInspectedViaTranscription).toBe(true);
    expect(report.sourceTextInspectedAtAllLocators).toBe(true);
    expect(report.exactLocatorResolvedForAllFourRequirements).toBe(true);
    expect(report.equivalentReproducibleLocatorResolved).toBe(true);
    expect(report.searchSnippetUsedAsAuthorityEvidence).toBe(false);
    expect(report.modelGeneratedSynthesisUsedAsAuthorityEvidence).toBe(false);
    expect(report.crossCandidateCompositionPerformed).toBe(false);
    expect(report.generalKnowledgeControlCycleUsedAsAuthority).toBe(false);
  });

  test('fails closed when I106 would auto-accept the I95 candidate', () => {
    const invalid = {
      ...i106(),
      existingI95CandidateAutomaticallyAcceptedForKe: true,
    } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryReadinessReviewReport;
    const report = buildI107ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryEvidence(invalid);
    expect(report.status).toBe('I106_UNRESOLVED_OR_INVALID');
    expect(report.candidateSourceReference).toBeNull();
    expect(report.requirementEvidence).toEqual([]);
  });

  test('is deterministic and preserves all downstream effect and classifier guards', () => {
    const first = buildI107ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryEvidence(i106());
    const second = buildI107ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeAuthorityCandidateDiscoveryEvidence(i106());
    expect(first.evidenceId).toBe(second.evidenceId);
    expect(first.directionEvidencePromotedToDamageOutcome).toBe(false);
    expect(first.keDirectionalAdapterImplementedByThisGate).toBe(false);
    expect(first.methodologyDefinitionCreatedByThisGate).toBe(false);
    expect(first.sourceActivationVerdictAuthorized).toBe(false);
    expect(first.sourcePersistenceVerdictAuthorized).toBe(false);
    expect(first.sourceEffectiveSupportVerdictAuthorized).toBe(false);
    expect(first.relativeForceVerdictAuthorized).toBe(false);
    expect(first.crossRelationPrecedenceAuthorized).toBe(false);
    expect(first.classificationAuthorized).toBe(false);
    expect(first.numericScoringAuthorized).toBe(false);
    expect(first.recommendedNextGate).toBe('UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_AUTHORITY_REQUIREMENT_COVERAGE_EVALUATION_EVIDENCE');
  });
});
