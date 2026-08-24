import { describe, expect, it } from 'vitest';
import type { I213SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryReadinessReviewReport } from '../src/research/i213-source-ke-hidden-stem-interaction-eligibility-authority-discovery-readiness-review.js';
import {
  I214_CANDIDATE_EVIDENCE_IDS,
  buildI214SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryEvidence,
} from '../src/research/i214-source-ke-hidden-stem-interaction-eligibility-authority-discovery-evidence.js';

function validI213(): I213SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryReadinessReviewReport {
  return {
    reviewId: 'i213_fixture',
    status: 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_DISCOVERY_READINESS_REVIEW',
    decision:
      'SEVEN_REQUIREMENT_HIDDEN_STEM_AUTHORITY_DISCOVERY_CONTRACT_FROZEN_FOUR_PATHS_NO_DISCOVERY_EXECUTED_NO_AUTHORITY_ACQUIRED',
    exactI212BoundaryAccepted: true,
    authorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    requirementCount: 7,
    requirementsFrozen: true,
    discoveryPathCount: 4,
    discoveryPathsFrozen: true,
    discoveryControlCount: 14,
    discoveryControlsFrozen: true,
    existingNormalizedSourceDeepReinspectionAllowed: true,
    existingSourceAutoAcceptanceAllowed: false,
    newNormativeSourceDiscoveryAllowed: true,
    sourceClassAloneMayEstablishAuthority: false,
    partialRequirementEvidenceMayBeRecordedAtDiscovery: true,
    partialEvidenceCountsAsRequirementSatisfiedByDiscovery: false,
    crossCandidateCompositionAuthorized: false,
    hiddenStemMembershipCountsAsEligibility: false,
    visibleStemRuleBackfillAuthorized: false,
    discoveryAuthorized: true,
    discoveryExecutedByThisGate: false,
    authorityAcquiredByThisGate: false,
    requirementCoverageEvaluatedByThisGate: false,
    quWei2001HoldPreserved: true,
    li1998SameTargetPathSuspendedNotRetired: true,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    evidenceRebindingAuthorizedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: true,
    currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE',
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    productionPolicyExecutionAuthorized: false,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_DISCOVERY_EVIDENCE',
  } as unknown as I213SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryReadinessReviewReport;
}

describe('I214 hidden-stem interaction eligibility authority discovery evidence', () => {
  it('executes the exact I213 four-path discovery boundary', () => {
    const r = buildI214SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryEvidence(validI213());
    expect(r.status).toBe(
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_DISCOVERY_EVIDENCE',
    );
    expect(r.exactI213BoundaryAccepted).toBe(true);
    expect(r.discoveryExecuted).toBe(true);
    expect(r.executedDiscoveryPathCount).toBe(4);
  });

  it('records exactly three reproducible non-snippet candidate evidence records', () => {
    const r = buildI214SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryEvidence(validI213());
    expect(r.candidateEvidenceRecords.map((x) => x.candidateEvidenceId)).toEqual(I214_CANDIDATE_EVIDENCE_IDS);
    expect(r.candidateEvidenceRecordCount).toBe(3);
    expect(r.qualifyingForLaterCoverageEvaluationCount).toBe(3);
    expect(r.candidateEvidenceRecords.every((x) => x.sourceIdentityBound)).toBe(true);
    expect(r.candidateEvidenceRecords.every((x) => x.reproducibleDirectTextLocator)).toBe(true);
    expect(r.candidateEvidenceRecords.every((x) => x.snippetOnly === false)).toBe(true);
    expect(r.candidateEvidenceRecords.every((x) => x.authorityPromoted === false)).toBe(true);
  });

  it('records the Chen Yuan hidden-to-hidden signal only in its branch-clash context', () => {
    const r = buildI214SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryEvidence(validI213());
    const candidate = r.candidateEvidenceRecords[0];
    expect(candidate?.candidateEvidenceId).toBe('CHEN_YUAN_SIZHU_YUCE_XUE_RUMEN_1995_TRANSCRIPTION');
    expect(candidate?.observedScopes).toEqual(['HIDDEN_TO_HIDDEN']);
    expect(candidate?.directEffectiveInteractionLanguageObserved).toBe(true);
    expect(candidate?.contextConditionObserved).toBe(true);
    expect(candidate?.doctrinalPosition).toBe('CONTEXTUAL_POSITIVE_HIDDEN_STEM_INTERACTION');
    expect(candidate?.directTextToSpecificPrintEditionCanonicallyBound).toBe(false);
  });

  it('records the Shenfeng Tongkao visible-to-hidden direct signal without universalizing it', () => {
    const r = buildI214SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryEvidence(validI213());
    const candidate = r.candidateEvidenceRecords[1];
    expect(candidate?.candidateEvidenceId).toBe('ZHANG_NAN_SHENFENG_TONGKAO_TIANYUANFU_TRANSCRIPTION');
    expect(candidate?.observedScopes).toEqual(['VISIBLE_TO_HIDDEN']);
    expect(candidate?.directEffectiveInteractionLanguageObserved).toBe(true);
    expect(candidate?.contextConditionObserved).toBe(true);
    expect(candidate?.doctrinalPosition).toBe('DIRECT_VISIBLE_TO_HIDDEN_INTERACTION');
    expect(r.visibleToHiddenDirectSignalObserved).toBe(true);
  });

  it('records the Li Hanchen hidden-stem non-use doctrine as a conflict rather than a universal negative rule', () => {
    const r = buildI214SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryEvidence(validI213());
    const candidate = r.candidateEvidenceRecords[2];
    expect(candidate?.candidateEvidenceId).toBe('LI_HANCHEN_BAZI_YUCE_ZHENZONG_2003_REPRESENTATION');
    expect(candidate?.observedScopes).toEqual(['RESTRICTIVE_HIDDEN_STEM_EXCLUSION']);
    expect(candidate?.directEffectiveInteractionLanguageObserved).toBe(false);
    expect(candidate?.doctrinalPosition).toBe('RESTRICTIVE_HIDDEN_STEM_NON_USE');
    expect(r.restrictiveNonUseDoctrineObserved).toBe(true);
    expect(r.doctrinalConflictPresent).toBe(true);
    expect(r.doctrinalConflictResolvedByThisGate).toBe(false);
  });

  it('does not infer hidden-to-visible coverage or authority from the discovery pass', () => {
    const r = buildI214SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryEvidence(validI213());
    expect(r.positiveDirectionalSignalCount).toBe(2);
    expect(r.restrictiveConflictSignalCount).toBe(1);
    expect(r.hiddenToHiddenContextualDirectSignalObserved).toBe(true);
    expect(r.hiddenToVisibleDirectSignalObserved).toBe(false);
    expect(r.noHiddenToVisibleCandidateFoundCreatesNegativeFinding).toBe(false);
    expect(r.discoverySilenceCreatesExhaustionFinding).toBe(false);
    expect(r.corpusExhaustionClaimed).toBe(false);
    expect(r.sevenRequirementAuthorityContractSatisfiedByThisGate).toBe(false);
    expect(r.authorityGapClosed).toBe(false);
  });

  it('keeps per-source evidence separate and preserves all repository governance guards', () => {
    const r = buildI214SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryEvidence(validI213());
    expect(r.sourceClassAutoAcceptancePerformed).toBe(false);
    expect(r.crossCandidateCompositionPerformed).toBe(false);
    expect(r.requirementCoverageAdjudicatedByThisGate).toBe(false);
    expect(r.authorityPromotedByThisGate).toBe(false);
    expect(r.existingMembershipEvidencePromotedToEligibility).toBe(false);
    expect(r.visibleStemRuleBackfilledIntoHiddenStemEligibility).toBe(false);
    expect(r.searchSnippetUsedAsAuthority).toBe(false);
    expect(r.modelSynthesisUsedAsAuthority).toBe(false);
    expect(r.quWei2001HoldPreserved).toBe(true);
    expect(r.li1998SameTargetPathSuspendedNotRetired).toBe(true);
    expect(r.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(r.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(r.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(r.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(r.candidateSetMutatedByThisGate).toBe(false);
    expect(r.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(r.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(r.currentV2ProvenanceDisposition).toBe('BLOCKED_UNDER_CURRENT_EVIDENCE');
    expect(r.actualCompositionPerformedByThisGate).toBe(false);
    expect(r.multiSourceCompositionAuthorized).toBe(false);
    expect(r.thresholdRuleCreatedByThisGate).toBe(false);
    expect(r.damageEvaluationAuthorized).toBe(false);
    expect(r.classificationAuthorized).toBe(false);
    expect(r.numericScoringAuthorized).toBe(false);
    expect(r.productionPolicyExecutionAuthorized).toBe(false);
    expect(r.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION_READINESS_REVIEW',
    );
  });

  it('fails closed when I213 is mutated to permit cross-candidate composition', () => {
    const mutated = {
      ...validI213(),
      crossCandidateCompositionAuthorized: true,
    } as unknown as I213SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryReadinessReviewReport;
    const r = buildI214SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryEvidence(mutated);
    expect(r.status).toBe('I213_DISCOVERY_READINESS_BOUNDARY_INVALID');
    expect(r.decision).toBe('HIDDEN_STEM_AUTHORITY_DISCOVERY_EVIDENCE_NOT_EXECUTED');
    expect(r.discoveryExecuted).toBe(false);
    expect(r.candidateEvidenceRecordCount).toBe(0);
    expect(r.authorityGap).toBe('UPSTREAM_INVALID');
    expect(r.currentV2ProvenanceDisposition).toBe('NOT_ASSESSED');
  });
});
