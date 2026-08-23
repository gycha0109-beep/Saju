import { describe, expect, it } from 'vitest';
import type { I214SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryEvidenceReport } from '../src/research/i214-source-ke-hidden-stem-interaction-eligibility-authority-discovery-evidence.js';
import {
  I215_COVERAGE_EVALUATION_CONTROL_IDS,
  buildI215SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluationReadinessReview,
} from '../src/research/i215-source-ke-hidden-stem-interaction-eligibility-candidate-evidence-adequacy-coverage-evaluation-readiness-review.js';

function validI214(): I214SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryEvidenceReport {
  const records = [
    'CHEN_YUAN_SIZHU_YUCE_XUE_RUMEN_1995_TRANSCRIPTION',
    'ZHANG_NAN_SHENFENG_TONGKAO_TIANYUANFU_TRANSCRIPTION',
    'LI_HANCHEN_BAZI_YUCE_ZHENZONG_2003_REPRESENTATION',
  ].map((candidateEvidenceId) => ({
    candidateEvidenceId,
    sourceIdentityBound: true,
    reproducibleDirectTextLocator: true,
    snippetOnly: false,
    requirementCoverageAdjudicated: false,
    authorityPromoted: false,
    candidateRegistered: false,
    candidateSelected: false,
  }));
  return {
    evidenceId: 'i214_fixture',
    status: 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_DISCOVERY_EVIDENCE',
    decision:
      'FOUR_DISCOVERY_PATHS_EXECUTED_THREE_CANDIDATE_RECORDS_TWO_POSITIVE_DIRECTIONAL_SIGNALS_ONE_RESTRICTIVE_CONFLICT_ZERO_AUTHORITY_PROMOTED_COVERAGE_NOT_ADJUDICATED',
    exactI213BoundaryAccepted: true,
    discoveryExecuted: true,
    executedDiscoveryPathCount: 4,
    candidateEvidenceRecordCount: 3,
    candidateEvidenceRecords: records,
    positiveDirectionalSignalCount: 2,
    restrictiveConflictSignalCount: 1,
    visibleToHiddenDirectSignalObserved: true,
    hiddenToVisibleDirectSignalObserved: false,
    hiddenToHiddenContextualDirectSignalObserved: true,
    restrictiveNonUseDoctrineObserved: true,
    doctrinalConflictPresent: true,
    doctrinalConflictResolvedByThisGate: false,
    crossCandidateCompositionPerformed: false,
    requirementCoverageAdjudicatedByThisGate: false,
    sevenRequirementAuthorityContractSatisfiedByThisGate: false,
    authorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    authorityGapClosed: false,
    authorityPromotedByThisGate: false,
    noHiddenToVisibleCandidateFoundCreatesNegativeFinding: false,
    discoverySilenceCreatesExhaustionFinding: false,
    corpusExhaustionClaimed: false,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION_READINESS_REVIEW',
  } as unknown as I214SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryEvidenceReport;
}

describe('I215 hidden-stem candidate evidence adequacy coverage evaluation readiness', () => {
  it('accepts the exact I214 three-candidate discovery boundary', () => {
    const r = buildI215SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluationReadinessReview(validI214());
    expect(r.status).toBe(
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION_READINESS_REVIEW',
    );
    expect(r.exactI214BoundaryAccepted).toBe(true);
    expect(r.candidateEvidenceCount).toBe(3);
    expect(r.authorityRequirementCount).toBe(7);
  });

  it('freezes fourteen coverage evaluation controls', () => {
    const r = buildI215SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluationReadinessReview(validI214());
    expect(r.coverageEvaluationControlIds).toEqual(I215_COVERAGE_EVALUATION_CONTROL_IDS);
    expect(r.coverageEvaluationControlCount).toBe(14);
    expect(r.controlsFrozen).toBe(true);
    expect(r.allowedCoverageDispositions).toEqual([
      'DIRECT_CANDIDATE_LOCAL_EVIDENCE',
      'CONTEXT_BOUNDED_PARTIAL_EVIDENCE',
      'RESTRICTIVE_CONFLICT_EVIDENCE',
      'NOT_ESTABLISHED',
    ]);
  });

  it('requires candidate-local seven-requirement matrices and forbids cross-candidate composition', () => {
    const r = buildI215SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluationReadinessReview(validI214());
    expect(r.candidateLocalMatrixRequired).toBe(true);
    expect(r.everyCandidateEvaluatedAgainstAllSevenRequirements).toBe(true);
    expect(r.crossCandidateCompositionAuthorized).toBe(false);
    expect(r.coverageEvaluationAuthorized).toBe(true);
    expect(r.coverageEvaluationExecutedByThisGate).toBe(false);
    expect(r.candidateCoverageMatrixCreatedByThisGate).toBe(false);
  });

  it('separates source identity, direct text, context scope, and canonical print binding', () => {
    const r = buildI215SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluationReadinessReview(validI214());
    expect(r.directTextAdequacyEvaluatedSeparately).toBe(true);
    expect(r.sourceIdentityAdequacyEvaluatedSeparately).toBe(true);
    expect(r.contextScopeAdequacyEvaluatedSeparately).toBe(true);
    expect(r.canonicalPrintBindingAdequacyEvaluatedSeparately).toBe(true);
    expect(r.directTextToSpecificPrintEditionCanonicalBindingRequiredForCanonicalEditionClaim).toBe(true);
    expect(r.bibliographicIdentityMayBackfillCanonicalTextBinding).toBe(false);
  });

  it('keeps directional scopes distinct and missing hidden-to-visible unresolved rather than negative', () => {
    const r = buildI215SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluationReadinessReview(validI214());
    expect(r.visibleToHiddenScopeSeparated).toBe(true);
    expect(r.hiddenToVisibleScopeSeparated).toBe(true);
    expect(r.hiddenToHiddenScopeSeparated).toBe(true);
    expect(r.contextualEvidenceMayBeGeneralizedBeyondContext).toBe(false);
    expect(r.missingHiddenToVisibleSignalRemainsUnresolved).toBe(true);
    expect(r.missingHiddenToVisibleSignalCreatesNegativeFinding).toBe(false);
  });

  it('records restrictive doctrine as conflict only and preserves semantic layer separation', () => {
    const r = buildI215SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluationReadinessReview(validI214());
    expect(r.restrictiveDoctrineRecordedAsConflictOnly).toBe(true);
    expect(r.restrictiveDoctrineCreatesUniversalNegativeFinding).toBe(false);
    expect(r.doctrinalConflictResolutionAuthorizedByThisGate).toBe(false);
    expect(r.relationExistenceDistinctFromEffectiveInteraction).toBe(true);
    expect(r.effectiveInteractionDistinctFromDamageOutcome).toBe(true);
    expect(r.fullSevenRequirementCoverageEstablishedByThisGate).toBe(false);
    expect(r.authorityGapClosed).toBe(false);
  });

  it('preserves all current governance guards and authorizes evaluation only', () => {
    const r = buildI215SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluationReadinessReview(validI214());
    expect(r.authorityPromotedByThisGate).toBe(false);
    expect(r.candidateRegisteredByThisGate).toBe(false);
    expect(r.candidateSelectedByThisGate).toBe(false);
    expect(r.quWei2001HoldPreserved).toBe(true);
    expect(r.li1998SameTargetPathSuspendedNotRetired).toBe(true);
    expect(r.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(r.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(r.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(r.derivativeLineageAdjudicatedByThisGate).toBe(false);
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION',
    );
  });

  it('fails closed if I214 is mutated to resolve the doctrinal conflict prematurely', () => {
    const mutated = {
      ...validI214(),
      doctrinalConflictResolvedByThisGate: true,
    } as unknown as I214SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryEvidenceReport;
    const r = buildI215SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluationReadinessReview(mutated);
    expect(r.status).toBe('I214_DISCOVERY_EVIDENCE_BOUNDARY_INVALID');
    expect(r.decision).toBe('HIDDEN_STEM_CANDIDATE_COVERAGE_EVALUATION_NOT_READY');
    expect(r.coverageEvaluationAuthorized).toBe(false);
    expect(r.candidateEvidenceCount).toBe(0);
    expect(r.authorityRequirementCount).toBe(0);
    expect(r.currentV2ProvenanceDisposition).toBe('NOT_ASSESSED');
  });
});
