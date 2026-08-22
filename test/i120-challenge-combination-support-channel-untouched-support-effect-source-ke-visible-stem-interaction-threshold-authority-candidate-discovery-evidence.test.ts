import { describe, expect, test } from 'vitest';
import {
  buildI120ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityCandidateDiscoveryEvidence,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityAcquisitionReadinessReviewReport,
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

function i119(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityAcquisitionReadinessReviewReport {
  const admissionRequirements = REQUIREMENT_IDS.map((requirementId) => ({
    requirementId,
    exactEvidenceWithinSameCandidateRequired: true as const,
    exactLocatorRequired: true as const,
    originalOrVerifiedSourceContextRequired: true as const,
    inferredFromGeneralKnowledgeAllowed: false as const,
    searchSnippetSubstitutionAllowed: false as const,
    modelSynthesisSubstitutionAllowed: false as const,
    numericCalibrationSubstitutionAllowed: false as const,
    qualitativeOrderingAloneAllowed: false as const,
    crossCandidateCompositionAllowed: false as const,
  }));

  const base = {
    reviewId: 'i119_i120_fixture',
    reviewVersion: 'fixture',
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_AUTHORITY_ACQUISITION_READINESS',
    decision:
      'VISIBLE_STEM_THRESHOLD_SINGLE_CANDIDATE_GOVERNED_AUTHORITY_ACQUISITION_CONTRACT_FROZEN_NO_AUTHORITY_ACQUIRED',
    upstreamI118ReviewId: 'i118_fixture',
    candidateSourceIdContext: SOURCE_ID,
    targetSourceTerm: '克',
    targetScope: 'VISIBLE_HEAVENLY_STEM_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY',
    acquisitionMode:
      'SINGLE_CANDIDATE_FULL_SIX_REQUIREMENT_VISIBLE_STEM_THRESHOLD_AUTHORITY_ONLY',
    oneCandidatePerEvaluation: true,
    oneNormalizedSourceReferencePerCandidateRequired: true,
    originalSourceInspectionRequired: true,
    exactSourceIdentityRequired: true,
    stableRevisionOrEquivalentReproducibleLocatorRequired: true,
    exactLocatorPerRequirementRequired: true,
    sameCandidateMustCoverAllSixI118Requirements: true,
    singleCandidateFullCoverageRequiredForPromotionUnderThisContract: true,
    admissionRequirements,
    admissionRequirementCount: 6,
    candidateMayBeHistoricalPrimarySource: true,
    candidateMayBeScholarlyOrInstitutionalReference: true,
    candidateMayBePractitionerSecondarySource: true,
    sourceClassAloneMaySatisfyRequirement: false,
    existingNormalizedSourceReferenceMayBeReusedIfIdentityStillExact: true,
    existingI107CandidateAutomaticallyAcceptedForThresholdAuthority: false,
    existingI107CandidateMayBeReconsideredUnderI119: true,
    sourceRegistrationAloneMayCloseThresholdGap: false,
    requirementCoverageEvaluationRequiredAfterDiscovery: true,
    vocabularyMentionAloneMaySatisfyThresholdAuthority: false,
    qualitativePositionLanguageAloneMaySatisfyThresholdAuthority: false,
    searchSnippetMayCountAsAuthorityEvidence: false,
    modelGeneratedSynthesisMayCountAsAuthorityEvidence: false,
    generalKnowledgeMayCountAsAuthorityEvidence: false,
    numericCalibrationMayCountAsNormativeAuthority: false,
    crossCandidateCompositionAuthorized: false,
    multiplePartialCandidatesMaySubstituteForOneAcceptedCandidate: false,
    multiSourceCompositionPolicyResolved: false,
    candidateDiscoveryPerformedByThisGate: false,
    candidateRegisteredByThisGate: false,
    requirementCoverageEvaluatedByThisGate: false,
    authorityAcquiredByThisGate: false,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    effectiveInteractionSetResolved: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    i98KeDamageVocabularyEvaluationResolved: false,
    i98ResearchMethodologyMaterializationAuthorized: false,
    hiddenStemInteractionEligibilityGapRemains: true,
    hiddenStemAuthorityGap:
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    hiddenStemAuthorityMaySubstitute: false,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE',
    notes: [],
  } as const;

  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityAcquisitionReadinessReviewReport;
}

describe('I120 source 克 visible-stem interaction threshold authority candidate discovery evidence', () => {
  test('records a fail-closed negative discovery result with no candidate registered', () => {
    const report = buildI120ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityCandidateDiscoveryEvidence(
      i119(),
    );

    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE',
    );
    expect(report.decision).toBe(
      'NO_SINGLE_CANDIDATE_WITH_ALL_SIX_I118_REQUIRED_SEMANTIC_LOCATORS_VERIFIED_THRESHOLD_AUTHORITY_NOT_REGISTERED',
    );
    expect(report.externalDiscoveryPerformed).toBe(true);
    expect(report.inspectedCandidateCount).toBe(2);
    expect(report.registeredCandidateCount).toBe(0);
    expect(report.registeredCandidate).toBeNull();
    expect(report.noFullSixSemanticLocatorCandidateVerified).toBe(true);
  });

  test('reinspects the existing I107 source without promoting its qualitative positional language', () => {
    const report = buildI120ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityCandidateDiscoveryEvidence(
      i119(),
    );
    const chen = report.inspectedCandidates.find(
      (item) => item.sourceReference.sourceId === SOURCE_ID,
    );

    expect(chen).toBeDefined();
    expect(chen?.inspectionState).toBe('KNOWN_SOURCE_REINSPECTED_STILL_INSUFFICIENT');
    expect(chen?.registrationAcceptedUnderI119).toBe(false);
    expect(chen?.missingRequiredSemanticLocatorIds).toEqual([
      'EXPLICIT_BINARY_EFFECTIVE_INTERACTION_SEMANTICS',
      'QUALITATIVE_FORCE_VS_BINARY_ELIGIBILITY_SEPARATION',
      'WU_LI_BOUNDARY_SEMANTICS_AND_EXCEPTIONS',
    ]);
    expect(report.existingI107CandidatePromoted).toBe(false);
  });

  test('rejects the stronger Wei Qianli candidate because the same source lacks an explicit 无力 boundary locator', () => {
    const report = buildI120ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityCandidateDiscoveryEvidence(
      i119(),
    );
    const wei = report.inspectedCandidates.find(
      (item) => item.sourceReference.author === '韦千里',
    );

    expect(wei).toBeDefined();
    expect(wei?.inspectionState).toBe(
      'NEW_INDEPENDENT_CANDIDATE_REJECTED_MISSING_REQUIRED_SEMANTIC_LOCATOR',
    );
    expect(wei?.verifiedRelevantLocatorCount).toBe(5);
    expect(wei?.missingRequiredSemanticLocatorIds).toEqual([
      'WU_LI_BOUNDARY_SEMANTICS_AND_EXCEPTIONS',
    ]);
    expect(wei?.allSixRequiredSemanticLocatorsVerified).toBe(false);
    expect(wei?.registrationAcceptedUnderI119).toBe(false);
    expect(report.weiQianliCandidatePromoted).toBe(false);
    expect(report.weiQianliExplicitWuLiBoundaryObserved).toBe(false);
    expect(report.missingWuLiBoundaryRemainsPrimaryDiscoveryDeficit).toBe(true);
  });

  test('preserves the observed qualitative-force versus binary-interaction distinction as evidence relevance only', () => {
    const report = buildI120ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityCandidateDiscoveryEvidence(
      i119(),
    );
    const wei = report.inspectedCandidates.find(
      (item) => item.sourceReference.author === '韦千里',
    );
    const forceSeparation = wei?.requirementLocatorObservations.find(
      (item) => item.requirementId === 'QUALITATIVE_FORCE_VS_BINARY_ELIGIBILITY_SEPARATION',
    );
    const binary = wei?.requirementLocatorObservations.find(
      (item) => item.requirementId === 'EXPLICIT_BINARY_EFFECTIVE_INTERACTION_SEMANTICS',
    );

    expect(report.weiQianliQualitativeVsBinaryDistinctionObserved).toBe(true);
    expect(forceSeparation?.exactRelevantLocatorVerified).toBe(true);
    expect(forceSeparation?.sourceAnchor).toContain('克力较轻');
    expect(forceSeparation?.sourceAnchor).toContain('不能相克');
    expect(binary?.exactRelevantLocatorVerified).toBe(true);
    expect(binary?.sourceAnchor).toContain('不能相克');
    expect(forceSeparation?.requirementCoverageEvaluated).toBe(false);
    expect(forceSeparation?.countsAsRequirementSatisfied).toBe(false);
  });

  test('forbids cross-source completion and every non-authoritative substitute', () => {
    const report = buildI120ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityCandidateDiscoveryEvidence(
      i119(),
    );

    expect(report.searchSnippetMayCountAsAuthorityEvidence).toBe(false);
    expect(report.modelSynthesisMayCountAsAuthorityEvidence).toBe(false);
    expect(report.generalKnowledgeMayCountAsAuthorityEvidence).toBe(false);
    expect(report.numericCalibrationMayCountAsNormativeAuthority).toBe(false);
    expect(report.qualitativeOrderingMayCountAsBinaryThreshold).toBe(false);
    expect(report.crossCandidateCompositionPerformed).toBe(false);
    expect(report.crossCandidateCompositionAuthorized).toBe(false);
    expect(report.partialCandidatesMayBeCombinedToCloseGap).toBe(false);
    expect(report.noCandidateFoundMayBeConvertedToDefaultRule).toBe(false);
    expect(report.candidateRegistrationMeansRequirementSatisfied).toBe(false);
    expect(report.candidateRequirementCoverageEvaluatedByThisGate).toBe(false);
    expect(report.candidateSatisfiesAllSixRequirements).toBe('not_evaluated');
  });

  test('keeps threshold, damage, hidden-stem, settlement, scoring, and classification authority closed', () => {
    const report = buildI120ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityCandidateDiscoveryEvidence(
      i119(),
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
    expect(report.clashSettlementAuthorized).toBe(false);
    expect(report.crossRelationPrecedenceAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
  });

  test('is deterministic and routes the discovery deficit to targeted 无力 authority readiness', () => {
    const first = buildI120ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityCandidateDiscoveryEvidence(
      i119(),
    );
    const second = buildI120ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityCandidateDiscoveryEvidence(
      i119(),
    );

    expect(first.evidenceId).toBe(second.evidenceId);
    expect(first.strongestRejectedCandidateInspectionId).toBe(
      second.strongestRejectedCandidateInspectionId,
    );
    expect(first.strongestRejectedCandidateMissingRequirementIds).toEqual([
      'WU_LI_BOUNDARY_SEMANTICS_AND_EXCEPTIONS',
    ]);
    expect(first.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_WU_LI_BOUNDARY_TARGETED_AUTHORITY_DISCOVERY_READINESS_REVIEW',
    );
    expect(first.methodologyDefinitionCreatedByThisGate).toBe(false);
    expect(first.ruleDefinitionCreatedByThisGate).toBe(false);
    expect(first.registrySnapshotMutatedByThisGate).toBe(false);
    expect(first.reviewAttestationCreatedByThisGate).toBe(false);
  });

  test('fails closed when I119 no longer proves the exact governed acquisition contract', () => {
    const report = buildI120ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityCandidateDiscoveryEvidence(
      i119({ crossCandidateCompositionAuthorized: true }),
    );

    expect(report.status).toBe('I119_UNRESOLVED_OR_INVALID');
    expect(report.decision).toBe('VISIBLE_STEM_THRESHOLD_AUTHORITY_DISCOVERY_NOT_PERFORMED');
    expect(report.externalDiscoveryPerformed).toBe(false);
    expect(report.discoveryMode).toBe('NONE');
    expect(report.inspectedCandidateCount).toBe(0);
    expect(report.inspectedCandidates).toEqual([]);
    expect(report.registeredCandidateCount).toBe(0);
    expect(report.registeredCandidate).toBeNull();
    expect(report.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_AUTHORITY_ACQUISITION_READINESS_REVIEW',
    );
  });
});
