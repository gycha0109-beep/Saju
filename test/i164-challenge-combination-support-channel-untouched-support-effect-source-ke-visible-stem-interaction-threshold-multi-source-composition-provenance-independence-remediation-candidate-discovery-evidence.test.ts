import { describe, expect, it } from 'vitest';
import {
  I163_DISCOVERY_OUTPUT_REQUIREMENT_IDS,
  I164_REMEDIATION_DISCOVERY_CANDIDATE_IDS,
  buildI164ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryEvidence,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryReadinessReviewReport,
} from '../src/index.js';

function validI163(): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryReadinessReviewReport {
  return {
    reviewId: 'i163_fixture',
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_DISCOVERY_READINESS_REVIEW',
    decision:
      'FIVE_REMEDIATION_DISCOVERY_TRACKS_READY_UNDER_FIFTEEN_FROZEN_REQUIREMENTS_NO_CANDIDATE_DISCOVERED_SELECTED_OR_EXECUTED',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI162BoundaryAccepted: true,
    currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE',
    frozenI162RequirementCount: 15,
    reviewableStrategyCount: 5,
    discoveryOutputRequirementIds: I163_DISCOVERY_OUTPUT_REQUIREMENT_IDS,
    discoveryOutputRequirementCount: 9,
    discoveryTrackCount: 5,
    allTracksConclusionNeutral: true,
    remediationCandidateDiscoveryAuthorizedByThisGate: true,
    remediationCandidateDiscoveryExecutedByThisGate: false,
    remediationCandidateDiscoveredByThisGate: false,
    remediationStrategySelectedByThisGate: false,
    remediationExecutionAuthorizedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: true,
    inputPackageMutatedByThisGate: false,
    newPackageVersionCreatedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_DISCOVERY_EVIDENCE',
  } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryReadinessReviewReport;
}

describe('I164 provenance remediation candidate discovery evidence', () => {
  it('executes discovery and records one new provenance candidate plus one lineage-risk signal without selecting remediation', () => {
    const report = buildI164ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryEvidence(validI163());

    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_DISCOVERY_EVIDENCE',
    );
    expect(report.decision).toBe(
      'REMEDIATION_CANDIDATE_DISCOVERY_EXECUTED_ONE_NEW_PROVENANCE_CANDIDATE_AND_ONE_LINEAGE_RISK_SIGNAL_DISCOVERED_ZERO_INDEPENDENCE_OR_REMEDIATION_SELECTION',
    );
    expect(report.candidateEvidenceRecordCount).toBe(2);
    expect(report.newProvenanceCandidatePendingAdjudicationCount).toBe(1);
    expect(report.lineageDependencyRiskSignalCount).toBe(1);
    expect(report.remediationCandidateDiscoveryExecutedByThisGate).toBe(true);
    expect(report.remediationStrategySelectedByThisGate).toBe(false);
  });

  it('records 李涵辰 as a new candidate with explicit binary visible-stem signal but no independence finding', () => {
    const report = buildI164ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryEvidence(validI163());
    const li = report.candidateEvidenceRecords.find(
      (record) => record.candidateId === I164_REMEDIATION_DISCOVERY_CANDIDATE_IDS[0],
    );

    expect(li).toBeDefined();
    expect(li?.authorOrAttribution).toBe('李涵辰');
    expect(li?.workTitle).toBe('《八字预测真踪》');
    expect(li?.visibleStemScopeSignalPresent).toBe(true);
    expect(li?.explicitBinaryInteractionSignalPresent).toBe(true);
    expect(li?.provenanceDisposition).toBe(
      'NEW_PROVENANCE_CANDIDATE_PENDING_DERIVATIVE_RELATIONSHIP_ADJUDICATION',
    );
    expect(li?.potentiallyUsefulForNewProvenanceTrack).toBe(true);
    expect(li?.eligibleToCountAsIndependentAuthorityByThisGate).toBe(false);
    expect(li?.independenceEstablishedByThisGate).toBe(false);
  });

  it('records 孙海义 only as an unresolved lineage-risk signal and does not fabricate textual dependency', () => {
    const report = buildI164ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryEvidence(validI163());
    const sun = report.candidateEvidenceRecords.find(
      (record) => record.candidateId === I164_REMEDIATION_DISCOVERY_CANDIDATE_IDS[1],
    );

    expect(sun).toBeDefined();
    expect(sun?.authorOrAttribution).toBe('孙海义');
    expect(sun?.provenanceDisposition).toBe(
      'LINEAGE_DEPENDENCY_RISK_UNRESOLVED_NOT_ELIGIBLE_AS_INDEPENDENT_AUTHORITY',
    );
    expect(sun?.derivativeDependencyEstablishedByThisGate).toBe(false);
    expect(report.sunHaiyiSpecificTextualDependencyOnLiHanchenNotProven).toBe(true);
    expect(report.thirdPartyNewSchoolLineageSignalRecorded).toBe(true);
    expect(report.sameDoctrineSimilarityNotPromotedToDerivativeDependency).toBe(true);
  });

  it('applies the exact nine I163 discovery-output requirements to both records', () => {
    const report = buildI164ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryEvidence(validI163());

    expect(report.discoveryOutputRequirementIdsApplied).toEqual(I163_DISCOVERY_OUTPUT_REQUIREMENT_IDS);
    expect(report.discoveryOutputRequirementCount).toBe(9);
    expect(report.candidateEvidenceRecords).toHaveLength(2);
    for (const record of report.candidateEvidenceRecords) {
      expect(record.discoveryOutputRequirementIdsApplied).toEqual(I163_DISCOVERY_OUTPUT_REQUIREMENT_IDS);
      expect(record.exactSourceIdentityBound).toBe(true);
      expect(record.reproducibleWitnessLocated).toBe(true);
      expect(record.sameWorkDuplicateWitnessNormalized).toBe(true);
      expect(record.numericWeight).toBeNull();
    }
  });

  it('does not infer independence from chronology, authorship, school labels, or search discovery', () => {
    const report = buildI164ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryEvidence(validI163());

    expect(report.liHanchenIndependenceNotInferredFromAuthorshipOrChronology).toBe(true);
    expect(report.derivativeDependencyEstablishedCount).toBe(0);
    expect(report.explicitNegativeDerivativeFindingEstablishedCount).toBe(0);
    expect(report.independentNormativeProvenanceEstablishedCount).toBe(0);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate).toBe(false);
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
  });

  it('retains current-v2 immutability and every evaluation, production, threshold, numeric, and hidden-stem guard', () => {
    const report = buildI164ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryEvidence(validI163());

    expect(report.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(report.newCandidateDiscoveryIsNotCandidateSetSelection).toBe(true);
    expect(report.newCandidateDiscoveryIsNotCandidateReplacement).toBe(true);
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

  it('fails closed when I163 is mutated to claim discovery was already executed', () => {
    const mutated = {
      ...validI163(),
      remediationCandidateDiscoveryExecutedByThisGate: true,
    } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryReadinessReviewReport;

    const report = buildI164ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryEvidence(mutated);

    expect(report.status).toBe('I163_REMEDIATION_CANDIDATE_DISCOVERY_READINESS_INVALID');
    expect(report.decision).toBe('REMEDIATION_CANDIDATE_DISCOVERY_NOT_EXECUTED');
    expect(report.exactI163ReadinessAccepted).toBe(false);
    expect(report.candidateEvidenceRecordCount).toBe(0);
    expect(report.remediationCandidateDiscoveryExecutedByThisGate).toBe(false);
  });

  it('materializes deterministically for the same frozen I163 input', () => {
    const first = buildI164ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryEvidence(validI163());
    const second = buildI164ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryEvidence(validI163());

    expect(first.evidenceRecordSetId).toBe(second.evidenceRecordSetId);
    expect(first.candidateEvidenceRecords).toEqual(second.candidateEvidenceRecords);
  });
});