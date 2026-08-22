import { describe, expect, it } from 'vitest';
import {
  I167_REASSESSMENT_REQUIREMENT_IDS,
  I167_REMAINING_REVIEWABLE_REMEDIATION_PATH_IDS,
  buildI167ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateTargetedLineageEvidenceAdequacyRemediationPathReassessmentReview,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateTargetedLineageAdjudicationEvidenceReport,
} from '../src/index.js';

function validI166(): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateTargetedLineageAdjudicationEvidenceReport {
  return {
    evidenceRecordSetId: 'i166_fixture',
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_TARGETED_LINEAGE_ADJUDICATION_EVIDENCE',
    decision:
      'TARGETED_LINEAGE_DISCOVERY_EXECUTED_TWO_RELATIONSHIP_QUESTIONS_BOTH_UNRESOLVED_ZERO_DERIVATIVE_ZERO_EXPLICIT_NEGATIVE_ZERO_INDEPENDENCE',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI165BoundaryAccepted: true,
    requirementCount: 10,
    lineageEvidenceRecords: [
      {
        questionId: 'LI_HANCHEN_GE_BU_ZUOYONG_EXACT_UPSTREAM_ORIGIN',
        finding: 'UNRESOLVED_AFTER_TARGETED_LINEAGE_DISCOVERY',
      },
      {
        questionId: 'SUN_HAIYI_TO_LI_HANCHEN_SPECIFIC_DEPENDENCY',
        finding: 'UNRESOLVED_AFTER_TARGETED_LINEAGE_DISCOVERY',
      },
    ],
    lineageEvidenceRecordCount: 2,
    unresolvedAfterTargetedLineageDiscoveryCount: 2,
    derivativeDependencyFoundCount: 0,
    explicitNegativeDerivativeFindingCount: 0,
    independentNormativeProvenanceEstablishedCount: 0,
    liHanchenSelfOriginStatementLocated: true,
    liHanchenSelfOriginStatementCorroboratedIndependently: false,
    liHanchenExactEarlierSourceForGeBuZuoyongLocated: false,
    liHanchenOriginFinding: 'UNRESOLVED_AFTER_TARGETED_LINEAGE_DISCOVERY',
    sunHaiyiMultipleTeachersAndCollectionStatementLocated: true,
    sunHaiyiSpecificLiHanchenAttributionLocated: false,
    sunHaiyiSpecificDirectionalTextualDependencyEstablished: false,
    sunHaiyiToLiHanchenFinding: 'UNRESOLVED_AFTER_TARGETED_LINEAGE_DISCOVERY',
    secondaryNewSchoolClassificationLocated: true,
    secondarySchoolClassificationInsufficientForSpecificDependency: true,
    targetedLineageEvidenceAcquisitionExecutedByThisGate: true,
    relationshipFindingsRecordedByThisGate: true,
    provenanceIndependenceAdjudicatedByThisGate: false,
    independentNormativeProvenanceEstablishedByThisGate: false,
    remediationStrategySelectedByThisGate: false,
    remediationExecutionAuthorizedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: true,
    candidateSetMutatedByThisGate: false,
    candidateRemovedByThisGate: false,
    candidateReplacedByThisGate: false,
    evidenceReboundByThisGate: false,
    newCandidateSetVersionCreatedByThisGate: false,
    newInputPackageVersionCreatedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    candidateSetReevaluationPerformedByThisGate: false,
    candidateSetAdmissibilityEstablishedByThisGate: false,
    sourceCountVotingAllowed: false,
    provenanceTierWeightingAllowed: false,
    productionPolicyExecutionAuthorized: false,
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    thresholdRuleCreatedByThisGate: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    hiddenStemInteractionEligibilityGapRemains: true,
    hiddenStemAuthorityGap:
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_TARGETED_LINEAGE_EVIDENCE_ADEQUACY_AND_REMEDIATION_PATH_REASSESSMENT_REVIEW',
  } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateTargetedLineageAdjudicationEvidenceReport;
}

describe('I167 targeted lineage evidence adequacy and remediation path reassessment', () => {
  it('accepts exact I166 and records the current new-provenance attempt as not successful under current evidence', () => {
    const report = buildI167ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateTargetedLineageEvidenceAdequacyRemediationPathReassessmentReview(validI166());

    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_TARGETED_LINEAGE_EVIDENCE_ADEQUACY_REMEDIATION_PATH_REASSESSMENT_REVIEW',
    );
    expect(report.decision).toBe(
      'TARGETED_LINEAGE_EVIDENCE_ADEQUATE_FOR_TWO_UNRESOLVED_FINDINGS_CURRENT_NEW_PROVENANCE_CANDIDATES_NOT_READY_FOR_REMEDIATION_NO_POLICY_RELAXATION_ALTERNATE_REMEDIATION_DISCOVERY_MAY_PROCEED',
    );
    expect(report.i166EvidenceAdequateToRecordTwoUnresolvedLineageFindings).toBe(true);
    expect(report.i166EvidenceAdequateToEstablishIndependentNormativeProvenance).toBe(false);
    expect(report.currentNewProvenanceAcquisitionAttemptDisposition).toBe(
      'NOT_SUCCESSFUL_UNDER_CURRENT_EVIDENCE',
    );
  });

  it('keeps Li and Sun non-remediation-ready without turning unresolved lineage into permanent negative findings', () => {
    const report = buildI167ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateTargetedLineageEvidenceAdequacyRemediationPathReassessmentReview(validI166());

    expect(report.unresolvedLineageFindingCount).toBe(2);
    expect(report.derivativeDependencyFoundCount).toBe(0);
    expect(report.explicitNegativeDerivativeFindingCount).toBe(0);
    expect(report.independentNormativeProvenanceEstablishedCount).toBe(0);
    expect(report.liHanchenCurrentDisposition).toBe(
      'RESEARCH_CANDIDATE_NOT_REMEDIATION_READY_PROVENANCE_UNRESOLVED',
    );
    expect(report.sunHaiyiCurrentDisposition).toBe(
      'LINEAGE_RISK_CANDIDATE_NOT_REMEDIATION_READY_SPECIFIC_DEPENDENCY_UNRESOLVED',
    );
    expect(report.liHanchenMayCountAsIndependentAuthorityFromCurrentEvidence).toBe(false);
    expect(report.sunHaiyiMayCountAsIndependentAuthorityFromCurrentEvidence).toBe(false);
  });

  it('freezes the exact ten reassessment requirements', () => {
    const report = buildI167ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateTargetedLineageEvidenceAdequacyRemediationPathReassessmentReview(validI166());

    expect(report.reassessmentRequirementIds).toEqual(I167_REASSESSMENT_REQUIREMENT_IDS);
    expect(report.reassessmentRequirementCount).toBe(10);
    expect(report.reassessmentRequirementsFrozen).toBe(true);
  });

  it('preserves all five remediation paths as reviewable but selects none', () => {
    const report = buildI167ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateTargetedLineageEvidenceAdequacyRemediationPathReassessmentReview(validI166());

    expect(report.remainingReviewableRemediationPathIds).toEqual(
      I167_REMAINING_REVIEWABLE_REMEDIATION_PATH_IDS,
    );
    expect(report.remainingReviewableRemediationPathCount).toBe(5);
    expect(report.remainingPathsAreReviewableNotSelected).toBe(true);
    expect(report.remediationStrategySelectedByThisGate).toBe(false);
    expect(report.remediationExecutionAuthorizedByThisGate).toBe(false);
  });

  it('does not convert the unsuccessful candidate search into corpus exhaustion or I132 relaxation', () => {
    const report = buildI167ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateTargetedLineageEvidenceAdequacyRemediationPathReassessmentReview(validI166());

    expect(report.currentNewProvenanceAcquisitionAttemptMayBeGrandfatheredAsSuccess).toBe(false);
    expect(report.corpusExhaustionEstablishedByThisGate).toBe(false);
    expect(report.universalNoRemediationCandidateExistsEstablishedByThisGate).toBe(false);
    expect(report.policyRelaxationJustifiedByCurrentSearchFailure).toBe(false);
    expect(report.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate).toBe(false);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
  });

  it('authorizes only a second-wave discovery-readiness review, not discovery, selection, mutation, package creation, or reevaluation', () => {
    const report = buildI167ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateTargetedLineageEvidenceAdequacyRemediationPathReassessmentReview(validI166());

    expect(report.secondWaveNewProvenanceCandidateDiscoveryReadinessReviewMethodologicallyJustified).toBe(true);
    expect(report.secondWaveNewProvenanceCandidateDiscoveryReadinessReviewAuthorized).toBe(true);
    expect(report.secondWaveReadinessAuthorizationIsCandidateDiscovery).toBe(false);
    expect(report.secondWaveReadinessAuthorizationIsCandidateSelection).toBe(false);
    expect(report.secondWaveReadinessAuthorizationIsRemediationSelection).toBe(false);
    expect(report.secondWaveReadinessAuthorizationIsCandidateSetMutation).toBe(false);
    expect(report.secondWaveReadinessAuthorizationIsInputPackageCreation).toBe(false);
    expect(report.secondWaveReadinessAuthorizationIsReevaluationAuthorization).toBe(false);
  });

  it('retains current-v2, production, threshold, numeric, and hidden-stem guards', () => {
    const report = buildI167ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateTargetedLineageEvidenceAdequacyRemediationPathReassessmentReview(validI166());

    expect(report.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(report.currentV2ProvenanceDisposition).toBe('BLOCKED_UNDER_CURRENT_EVIDENCE');
    expect(report.unresolvedCurrentCandidatesMayEnterNewPackageWithoutFurtherGovernance).toBe(false);
    expect(report.candidateSetMutatedByThisGate).toBe(false);
    expect(report.candidateRemovedByThisGate).toBe(false);
    expect(report.candidateReplacedByThisGate).toBe(false);
    expect(report.evidenceReboundByThisGate).toBe(false);
    expect(report.newCandidateSetVersionCreatedByThisGate).toBe(false);
    expect(report.newInputPackageVersionCreatedByThisGate).toBe(false);
    expect(report.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetAdmissibilityEstablishedByThisGate).toBe(false);
    expect(report.sourceCountVotingAllowed).toBe(false);
    expect(report.provenanceTierWeightingAllowed).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.hiddenStemAuthorityGap).toBe(
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    );
  });

  it('fails closed if either I166 lineage finding is promoted away from unresolved', () => {
    const base = validI166();
    const mutated = {
      ...base,
      lineageEvidenceRecords: [
        {
          ...base.lineageEvidenceRecords[0],
          finding: 'NO_DERIVATIVE_DEPENDENCY_FOUND_WITH_EXPLICIT_BASIS',
        },
        base.lineageEvidenceRecords[1],
      ],
    } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateTargetedLineageAdjudicationEvidenceReport;

    const report = buildI167ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateTargetedLineageEvidenceAdequacyRemediationPathReassessmentReview(mutated);

    expect(report.status).toBe('I166_TARGETED_LINEAGE_EVIDENCE_INVALID');
    expect(report.decision).toBe('REMEDIATION_PATH_REASSESSMENT_NOT_READY');
    expect(report.exactI166BoundaryAccepted).toBe(false);
    expect(report.secondWaveNewProvenanceCandidateDiscoveryReadinessReviewAuthorized).toBe(false);
  });
});