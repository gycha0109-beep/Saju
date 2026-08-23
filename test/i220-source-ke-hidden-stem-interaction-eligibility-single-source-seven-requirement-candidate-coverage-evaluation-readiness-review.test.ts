import { describe, expect, it } from 'vitest';
import type { I219SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryEvidenceReport } from '../src/research/i219-source-ke-hidden-stem-interaction-eligibility-single-source-seven-requirement-authority-discovery-evidence.js';
import {
  I220_COVERAGE_EVALUATION_CONTROL_IDS,
  buildI220SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationReadinessReview,
} from '../src/research/i220-source-ke-hidden-stem-interaction-eligibility-single-source-seven-requirement-candidate-coverage-evaluation-readiness-review.js';

const directCandidate = {
  candidateEvidenceId: 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML',
  directlyOpenedHtmlContext: true,
  leadOnly: false,
  qualifyingForLaterSingleSourceCoverageEvaluation: true,
  sameSourceVisibleToHiddenObserved: true,
  sameSourceHiddenToVisibleObserved: true,
  sameSourceHiddenToHiddenObserved: true,
  activationOrExceptionLanguageObserved: true,
  semanticLayerSeparationSignalObserved: true,
  reproducibleLocator: true,
};

const lead = (id: string) => ({
  candidateEvidenceId: id,
  leadOnly: true,
  qualifyingForLaterSingleSourceCoverageEvaluation: false,
});

const validI219 = (): I219SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryEvidenceReport =>
  ({
    evidenceId: 'i219_fixture',
    status:
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_AUTHORITY_DISCOVERY_EVIDENCE',
    decision:
      'FIVE_DISCOVERY_PATHS_EXECUTED_THREE_CANDIDATE_RECORDS_ONE_DIRECT_HTML_SINGLE_SOURCE_CANDIDATE_TWO_LEADS_ALL_THREE_DIRECTIONAL_SIGNALS_OBSERVED_IN_DIRECT_HTML_ZERO_AUTHORITY_PROMOTED_COVERAGE_NOT_ADJUDICATED',
    exactI218BoundaryAccepted: true,
    discoveryExecuted: true,
    executedDiscoveryPathCount: 5,
    candidateEvidenceRecordCount: 3,
    candidateEvidenceRecords: [
      directCandidate,
      lead('LI_HONGCHENG_SIZHU_1000_WENDA_THIRD_PARTY_PDF_WITNESS_LEAD'),
      lead('LINGRUI_JUSHI_GANZHI_NINE_RELATIONS_AQIOO_2021_INDEXED_MIRROR_LEAD'),
    ],
    qualifyingDirectHtmlCandidateCount: 1,
    leadOnlyCandidateCount: 2,
    materiallyNewSingleSourceCandidateObserved: true,
    directHtmlCandidateHasAllThreeDirectionalSignals: true,
    directHtmlCandidateHasActivationExceptionSignals: true,
    directHtmlCandidateHasSemanticSeparationSignals: true,
    directHtmlCandidateHasReproduciblePublishedContext: true,
    sevenRequirementCoverageAdjudicatedByThisGate: false,
    sevenRequirementAuthorityContractSatisfiedByThisGate: false,
    sourceClassOrAgeAutoAcceptancePerformed: false,
    crossCandidateCompositionPerformed: false,
    currentCandidateEvidenceUsedToBackfillNewCandidate: false,
    searchSnippetUsedAsAuthority: false,
    negativeFindingCreatedByThisGate: false,
    discoveryExhaustionClaimed: false,
    corpusExhaustionClaimed: false,
    authorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    authorityGapClosed: false,
    authorityPromotedByThisGate: false,
    doctrinalConflictPreserved: true,
    doctrinalConflictResolvedByThisGate: false,
    quWei2001HoldPreserved: true,
    li1998SameTargetPathSuspendedNotRetired: true,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    derivativeLineageAdjudicatedByThisGate: false,
    evidenceRebindingAuthorizedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_CANDIDATE_COVERAGE_EVALUATION_READINESS_REVIEW',
  }) as unknown as I219SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryEvidenceReport;

describe('I220 single-source seven-requirement hidden-stem candidate coverage readiness', () => {
  it('accepts the exact I219 boundary and selects only the direct HTML candidate for evaluation', () => {
    const report =
      buildI220SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationReadinessReview(
        validI219(),
      );
    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_CANDIDATE_COVERAGE_EVALUATION_READINESS_REVIEW',
    );
    expect(report.evaluationCandidateId).toBe('LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML');
    expect(report.evaluationCandidateCount).toBe(1);
    expect(report.excludedLeadCandidateCount).toBe(2);
  });

  it('freezes exactly seven candidate-local requirement cells', () => {
    const report =
      buildI220SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationReadinessReview(
        validI219(),
      );
    expect(report.requirementCellCount).toBe(7);
    expect(report.requirementIds).toHaveLength(7);
    expect(report.candidateLocalEvaluationRequired).toBe(true);
    expect(report.leadEvidenceMayEnterMatrix).toBe(false);
  });

  it('freezes direct/partial/conflict/not-established vocabulary and sixteen controls', () => {
    const report =
      buildI220SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationReadinessReview(
        validI219(),
      );
    expect(report.coverageStateVocabulary).toEqual(['DIRECT', 'PARTIAL', 'CONFLICT', 'NOT_ESTABLISHED']);
    expect(report.coverageEvaluationControlCount).toBe(16);
    expect(report.coverageEvaluationControlIds).toEqual(I220_COVERAGE_EVALUATION_CONTROL_IDS);
    expect(report.coverageEvaluationControlsFrozen).toBe(true);
  });

  it('requires separate directional, activation, semantic and source-context adjudication', () => {
    const report =
      buildI220SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationReadinessReview(
        validI219(),
      );
    expect(report.directionalScopesEvaluatedSeparately).toBe(true);
    expect(report.staticRelationMayAutoEqualDynamicInteraction).toBe(false);
    expect(report.activationExceptionExplicitLanguageRequired).toBe(true);
    expect(report.semanticSeparationExplicitLanguageRequired).toBe(true);
    expect(report.sourceIdentityContextLocatorEvaluatedSeparately).toBe(true);
    expect(report.searchSnippetMayCreateDirectCoverage).toBe(false);
  });

  it('authorizes coverage evaluation only', () => {
    const report =
      buildI220SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationReadinessReview(
        validI219(),
      );
    expect(report.coverageEvaluationAuthorized).toBe(true);
    expect(report.coverageEvaluationExecutedByThisGate).toBe(false);
    expect(report.sevenOfSevenCoverageMayAutoPromoteAuthority).toBe(false);
    expect(report.sevenOfSevenCoverageMayAutoCloseAuthorityGap).toBe(false);
    expect(report.authorityPromotedByThisGate).toBe(false);
  });

  it('preserves the hidden-stem gap and doctrinal conflict for later admissibility', () => {
    const report =
      buildI220SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationReadinessReview(
        validI219(),
      );
    expect(report.authorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
    expect(report.authorityGapClosed).toBe(false);
    expect(report.doctrinalConflictPreserved).toBe(true);
    expect(report.doctrinalConflictResolvedByThisGate).toBe(false);
  });

  it('preserves provenance, package and production guards', () => {
    const report =
      buildI220SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationReadinessReview(
        validI219(),
      );
    expect(report.quWei2001HoldPreserved).toBe(true);
    expect(report.li1998SameTargetPathSuspendedNotRetired).toBe(true);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(report.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(report.currentV2ProvenanceDisposition).toBe('BLOCKED_UNDER_CURRENT_EVIDENCE');
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.damageEvaluationAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
  });

  it('fails closed if the I219 qualifying-candidate boundary changes', () => {
    const invalid: I219SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryEvidenceReport = {
      ...validI219(),
      qualifyingDirectHtmlCandidateCount: 0,
    };
    const report =
      buildI220SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationReadinessReview(
        invalid,
      );
    expect(report.status).toBe('I219_DISCOVERY_EVIDENCE_BOUNDARY_INVALID');
    expect(report.evaluationCandidateId).toBeNull();
    expect(report.evaluationCandidateCount).toBe(0);
    expect(report.requirementCellCount).toBe(0);
    expect(report.coverageEvaluationAuthorized).toBe(false);
    expect(report.authorityGap).toBe('UPSTREAM_INVALID');
  });
});
