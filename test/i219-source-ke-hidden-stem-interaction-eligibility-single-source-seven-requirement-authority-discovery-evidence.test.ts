import { describe, expect, it } from 'vitest';
import type { I218SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryReadinessReviewReport } from '../src/research/i218-source-ke-hidden-stem-interaction-eligibility-single-source-seven-requirement-authority-discovery-readiness-review.js';
import {
  I219_CANDIDATE_EVIDENCE_IDS,
  buildI219SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryEvidence,
} from '../src/research/i219-source-ke-hidden-stem-interaction-eligibility-single-source-seven-requirement-authority-discovery-evidence.js';

const validI218 = (): I218SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryReadinessReviewReport =>
  ({
    reviewId: 'i218_fixture',
    status:
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_AUTHORITY_DISCOVERY_READINESS_REVIEW',
    decision:
      'SINGLE_SOURCE_SEVEN_REQUIREMENT_DISCOVERY_CONTRACT_FROZEN_FIVE_PATHS_SIXTEEN_CONTROLS_NO_DISCOVERY_EXECUTED_NO_AUTHORITY_ACQUIRED',
    exactI217BoundaryAccepted: true,
    authorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    requirementCount: 7,
    primaryResidualRequirementCount: 5,
    discoveryPathCount: 5,
    discoveryPathsFrozen: true,
    discoveryControlCount: 16,
    discoveryControlsFrozen: true,
    singleSourceSevenRequirementCandidateRequired: true,
    allSevenRequirementsMustBeSatisfiedWithinSameCandidate: true,
    currentCandidateEvidenceMayCrossCompleteCandidate: false,
    existingVisibleToHiddenSignalMayBackfillCandidate: false,
    hiddenToVisiblePriorityTargetRequired: true,
    sameCandidateVisibleToHiddenEvidenceRequired: true,
    generalHiddenToHiddenEvidenceRequired: true,
    branchClashOnlyHiddenToHiddenMayBeGeneralized: false,
    explicitMembershipVsEffectiveInteractionSeparationRequired: true,
    explicitPositionContextActivationAndExceptionsRequired: true,
    explicitRelationInteractionDamageSeparationRequired: true,
    exactSourceIdentityRequired: true,
    originalOrVerifiedSourceContextRequired: true,
    reproducibleLocatorRequired: true,
    searchSnippetMayCountAsAuthority: false,
    sourceClassOrAgeAutoAcceptanceAllowed: false,
    discoveryAuthorized: true,
    discoveryExecutedByThisGate: false,
    authorityPromotedByThisGate: false,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_AUTHORITY_DISCOVERY_EVIDENCE',
  }) as unknown as I218SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryReadinessReviewReport;

describe('I219 single-source seven-requirement hidden-stem authority discovery evidence', () => {
  it('accepts the exact I218 discovery boundary and executes five paths', () => {
    const report =
      buildI219SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryEvidence(
        validI218(),
      );
    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_AUTHORITY_DISCOVERY_EVIDENCE',
    );
    expect(report.discoveryExecuted).toBe(true);
    expect(report.executedDiscoveryPathCount).toBe(5);
  });

  it('records exactly three candidate records with one qualifying direct HTML candidate and two leads', () => {
    const report =
      buildI219SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryEvidence(
        validI218(),
      );
    expect(report.candidateEvidenceRecordCount).toBe(3);
    expect(report.candidateEvidenceRecords.map((record) => record.candidateEvidenceId)).toEqual(
      I219_CANDIDATE_EVIDENCE_IDS,
    );
    expect(report.qualifyingDirectHtmlCandidateCount).toBe(1);
    expect(report.leadOnlyCandidateCount).toBe(2);
  });

  it('records all three directional signals inside the direct Sohu candidate only', () => {
    const report =
      buildI219SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryEvidence(
        validI218(),
      );
    const direct = report.candidateEvidenceRecords[0];
    expect(direct?.directlyOpenedHtmlContext).toBe(true);
    expect(direct?.sameSourceVisibleToHiddenObserved).toBe(true);
    expect(direct?.sameSourceHiddenToVisibleObserved).toBe(true);
    expect(direct?.sameSourceHiddenToHiddenObserved).toBe(true);
    expect(report.directHtmlCandidateHasAllThreeDirectionalSignals).toBe(true);
  });

  it('records activation/exception and semantic-layer signals without adjudicating seven-requirement sufficiency', () => {
    const report =
      buildI219SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryEvidence(
        validI218(),
      );
    expect(report.directHtmlCandidateHasActivationExceptionSignals).toBe(true);
    expect(report.directHtmlCandidateHasSemanticSeparationSignals).toBe(true);
    expect(report.sevenRequirementCoverageAdjudicatedByThisGate).toBe(false);
    expect(report.sevenRequirementAuthorityContractSatisfiedByThisGate).toBe(false);
  });

  it('keeps PDF extraction and indexed mirror contexts lead-only', () => {
    const report =
      buildI219SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryEvidence(
        validI218(),
      );
    const pdfLead = report.candidateEvidenceRecords[1];
    const mirrorLead = report.candidateEvidenceRecords[2];
    expect(pdfLead?.leadOnly).toBe(true);
    expect(pdfLead?.qualifyingForLaterSingleSourceCoverageEvaluation).toBe(false);
    expect(pdfLead?.extractedPdfContextOnly).toBe(true);
    expect(mirrorLead?.leadOnly).toBe(true);
    expect(mirrorLead?.qualifyingForLaterSingleSourceCoverageEvaluation).toBe(false);
    expect(mirrorLead?.indexedSearchContextOnly).toBe(true);
    expect(report.searchSnippetUsedAsAuthority).toBe(false);
  });

  it('does not convert access failures or indexed silence into negative or exhaustion findings', () => {
    const report =
      buildI219SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryEvidence(
        validI218(),
      );
    expect(report.failedPdfVisualAccessCreatesNegativeFinding).toBe(false);
    expect(report.failedMirrorOpenCreatesNegativeFinding).toBe(false);
    expect(report.discoverySilenceCreatesExhaustionFinding).toBe(false);
    expect(report.negativeFindingCreatedByThisGate).toBe(false);
    expect(report.discoveryExhaustionClaimed).toBe(false);
    expect(report.corpusExhaustionClaimed).toBe(false);
  });

  it('preserves authority, provenance, package and production guards', () => {
    const report =
      buildI219SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryEvidence(
        validI218(),
      );
    expect(report.authorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
    expect(report.authorityGapClosed).toBe(false);
    expect(report.authorityPromotedByThisGate).toBe(false);
    expect(report.candidateRegisteredByThisGate).toBe(false);
    expect(report.candidateSelectedByThisGate).toBe(false);
    expect(report.sourceClassOrAgeAutoAcceptancePerformed).toBe(false);
    expect(report.crossCandidateCompositionPerformed).toBe(false);
    expect(report.currentCandidateEvidenceUsedToBackfillNewCandidate).toBe(false);
    expect(report.doctrinalConflictPreserved).toBe(true);
    expect(report.quWei2001HoldPreserved).toBe(true);
    expect(report.li1998SameTargetPathSuspendedNotRetired).toBe(true);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(report.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(report.currentV2ProvenanceDisposition).toBe('BLOCKED_UNDER_CURRENT_EVIDENCE');
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.damageEvaluationAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
  });

  it('fails closed if the I218 discovery boundary changes', () => {
    const invalid: I218SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryReadinessReviewReport = {
      ...validI218(),
      discoveryPathCount: 0,
    };
    const report =
      buildI219SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryEvidence(
        invalid,
      );
    expect(report.status).toBe('I218_DISCOVERY_READINESS_BOUNDARY_INVALID');
    expect(report.discoveryExecuted).toBe(false);
    expect(report.candidateEvidenceRecordCount).toBe(0);
    expect(report.qualifyingDirectHtmlCandidateCount).toBe(0);
    expect(report.authorityGap).toBe('UPSTREAM_INVALID');
  });
});
