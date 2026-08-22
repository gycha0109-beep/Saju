import { describe, expect, it } from 'vitest';
import {
  I167_REASSESSMENT_REQUIREMENT_IDS,
  I167_REMAINING_REVIEWABLE_REMEDIATION_PATH_IDS,
  I168_DISCOVERY_REQUIREMENT_IDS,
  I168_QUERY_CONCEPT_IDS,
  I168_SEARCH_CHANNEL_IDS,
  buildI168SecondWaveProvenanceCandidateDiscoveryReadinessReview,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateTargetedLineageEvidenceAdequacyRemediationPathReassessmentReviewReport,
} from '../src/index.js';

function validI167(): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateTargetedLineageEvidenceAdequacyRemediationPathReassessmentReviewReport {
  return {
    reviewId: 'i167_fixture',
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_TARGETED_LINEAGE_EVIDENCE_ADEQUACY_REMEDIATION_PATH_REASSESSMENT_REVIEW',
    decision:
      'TARGETED_LINEAGE_EVIDENCE_ADEQUATE_FOR_TWO_UNRESOLVED_FINDINGS_CURRENT_NEW_PROVENANCE_CANDIDATES_NOT_READY_FOR_REMEDIATION_NO_POLICY_RELAXATION_ALTERNATE_REMEDIATION_DISCOVERY_MAY_PROCEED',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI166BoundaryAccepted: true,
    i166EvidenceAdequateToRecordTwoUnresolvedLineageFindings: true,
    i166EvidenceAdequateToEstablishIndependentNormativeProvenance: false,
    unresolvedLineageFindingCount: 2,
    derivativeDependencyFoundCount: 0,
    explicitNegativeDerivativeFindingCount: 0,
    independentNormativeProvenanceEstablishedCount: 0,
    liHanchenCurrentDisposition: 'RESEARCH_CANDIDATE_NOT_REMEDIATION_READY_PROVENANCE_UNRESOLVED',
    sunHaiyiCurrentDisposition:
      'LINEAGE_RISK_CANDIDATE_NOT_REMEDIATION_READY_SPECIFIC_DEPENDENCY_UNRESOLVED',
    currentNewProvenanceAcquisitionAttemptDisposition: 'NOT_SUCCESSFUL_UNDER_CURRENT_EVIDENCE',
    currentNewProvenanceAcquisitionAttemptMayBeGrandfatheredAsSuccess: false,
    liHanchenMayCountAsIndependentAuthorityFromCurrentEvidence: false,
    sunHaiyiMayCountAsIndependentAuthorityFromCurrentEvidence: false,
    unresolvedCurrentCandidatesMayEnterNewPackageWithoutFurtherGovernance: false,
    corpusExhaustionEstablishedByThisGate: false,
    universalNoRemediationCandidateExistsEstablishedByThisGate: false,
    policyRelaxationJustifiedByCurrentSearchFailure: false,
    reassessmentRequirementIds: I167_REASSESSMENT_REQUIREMENT_IDS,
    reassessmentRequirementCount: 10,
    reassessmentRequirementsFrozen: true,
    remainingReviewableRemediationPathIds: I167_REMAINING_REVIEWABLE_REMEDIATION_PATH_IDS,
    remainingReviewableRemediationPathCount: 5,
    remainingPathsAreReviewableNotSelected: true,
    secondWaveNewProvenanceCandidateDiscoveryReadinessReviewMethodologicallyJustified: true,
    secondWaveNewProvenanceCandidateDiscoveryReadinessReviewAuthorized: true,
    secondWaveReadinessAuthorizationIsCandidateDiscovery: false,
    secondWaveReadinessAuthorizationIsCandidateSelection: false,
    secondWaveReadinessAuthorizationIsRemediationSelection: false,
    secondWaveReadinessAuthorizationIsCandidateSetMutation: false,
    secondWaveReadinessAuthorizationIsInputPackageCreation: false,
    secondWaveReadinessAuthorizationIsReevaluationAuthorization: false,
    currentV2PackageAndCandidateSetRemainImmutable: true,
    currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE',
    remediationStrategySelectedByThisGate: false,
    remediationExecutionAuthorizedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    candidateRemovedByThisGate: false,
    candidateReplacedByThisGate: false,
    evidenceReboundByThisGate: false,
    newCandidateSetVersionCreatedByThisGate: false,
    newInputPackageVersionCreatedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    candidateSetReevaluationPerformedByThisGate: false,
    candidateSetAdmissibilityEstablishedByThisGate: false,
    sourceCountVotingAllowed: false,
    provenanceTierWeightingAllowed: false,
    productionPolicyExecutionAuthorized: false,
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    authorityAcquiredByThisGate: false,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    hiddenStemInteractionEligibilityGapRemains: true,
    hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_SECOND_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_READINESS_REVIEW',
  } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateTargetedLineageEvidenceAdequacyRemediationPathReassessmentReviewReport;
}

describe('I168 second-wave provenance candidate discovery readiness', () => {
  it('accepts the exact I167 fail-closed boundary and authorizes second-wave discovery only', () => {
    const report = buildI168SecondWaveProvenanceCandidateDiscoveryReadinessReview(validI167());

    expect(report.status).toBe('RESOLVED_SECOND_WAVE_PROVENANCE_CANDIDATE_DISCOVERY_READINESS_REVIEW');
    expect(report.decision).toBe(
      'SECOND_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_READY_CONCLUSION_NEUTRAL_SEARCH_SCOPE_AND_PROVENANCE_CONTROLS_FROZEN_NO_SELECTION_OR_MUTATION',
    );
    expect(report.exactI167BoundaryAccepted).toBe(true);
    expect(report.secondWaveCandidateDiscoveryAuthorized).toBe(true);
    expect(report.actualCandidateDiscoveryExecutedByThisGate).toBe(false);
  });

  it('freezes the exact twelve second-wave discovery requirements', () => {
    const report = buildI168SecondWaveProvenanceCandidateDiscoveryReadinessReview(validI167());

    expect(report.discoveryRequirementIds).toEqual(I168_DISCOVERY_REQUIREMENT_IDS);
    expect(report.discoveryRequirementCount).toBe(12);
    expect(report.discoveryRequirementsFrozen).toBe(true);
  });

  it('freezes five search channels and five query-concept axes without prescribing a desired conclusion', () => {
    const report = buildI168SecondWaveProvenanceCandidateDiscoveryReadinessReview(validI167());

    expect(report.searchChannelIds).toEqual(I168_SEARCH_CHANNEL_IDS);
    expect(report.searchChannelCount).toBe(5);
    expect(report.queryConceptIds).toEqual(I168_QUERY_CONCEPT_IDS);
    expect(report.queryConceptCount).toBe(5);
    expect(report.conclusionNeutralDiscoveryRequired).toBe(true);
  });

  it('requires exact source identity, relevance, and lineage evidence for any later candidate', () => {
    const report = buildI168SecondWaveProvenanceCandidateDiscoveryReadinessReview(validI167());

    expect(report.secondWaveCandidateMustBeNewNormativeProvenanceIdentity).toBe(true);
    expect(report.secondWaveCandidateMustBindExactSourceWorkEditionWitnessIdentity).toBe(true);
    expect(report.secondWaveCandidateMustRecordNormativePassageAndRequirementRelevance).toBe(true);
    expect(report.secondWaveCandidateMustCarryLineageAndDerivativeRelationshipEvidence).toBe(true);
    expect(report.sameWorkAlternateWitnessCreatesNewAuthority).toBe(false);
    expect(report.derivativeRetransmissionOrSummaryCreatesNewAuthority).toBe(false);
    expect(report.uniqueSourceIdentityAloneEstablishesIndependence).toBe(false);
    expect(report.chronologyAloneEstablishesIndependence).toBe(false);
    expect(report.searchSilenceCreatesNegativeDerivativeFinding).toBe(false);
  });

  it('does not grandfather Li or Sun and does not reinterpret first-wave failure as corpus exhaustion', () => {
    const report = buildI168SecondWaveProvenanceCandidateDiscoveryReadinessReview(validI167());

    expect(report.firstWaveUnresolvedLineageFindingCount).toBe(2);
    expect(report.firstWaveIndependentNormativeProvenanceEstablishedCount).toBe(0);
    expect(report.liHanchenRemainsFirstWaveResearchCandidateNotRemediationReady).toBe(true);
    expect(report.sunHaiyiRemainsFirstWaveLineageRiskCandidateNotRemediationReady).toBe(true);
    expect(report.firstWaveCandidatesMayBeGrandfatheredAsSecondWaveSuccess).toBe(false);
    expect(report.corpusExhaustionEstablished).toBe(false);
    expect(report.universalNoRemediationCandidateExistsEstablished).toBe(false);
  });

  it('keeps I132 normative and forbids selection, remediation, mutation, package creation, and reevaluation', () => {
    const report = buildI168SecondWaveProvenanceCandidateDiscoveryReadinessReview(validI167());

    expect(report.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate).toBe(false);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(report.candidateSelectedByThisGate).toBe(false);
    expect(report.remediationStrategySelectedByThisGate).toBe(false);
    expect(report.remediationExecutionAuthorizedByThisGate).toBe(false);
    expect(report.evidenceReboundByThisGate).toBe(false);
    expect(report.candidateSetMutatedByThisGate).toBe(false);
    expect(report.newCandidateSetVersionCreatedByThisGate).toBe(false);
    expect(report.newInputPackageVersionCreatedByThisGate).toBe(false);
    expect(report.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
  });

  it('retains current-v2, production, threshold, numeric, and hidden-stem guards', () => {
    const report = buildI168SecondWaveProvenanceCandidateDiscoveryReadinessReview(validI167());

    expect(report.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(report.currentV2ProvenanceDisposition).toBe('BLOCKED_UNDER_CURRENT_EVIDENCE');
    expect(report.sourceCountVotingAllowed).toBe(false);
    expect(report.provenanceTierWeightingAllowed).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.damageEvaluationAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.hiddenStemAuthorityGap).toBe(
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    );
  });

  it('fails closed if I167 no longer authorizes the second-wave readiness path', () => {
    const mutated = {
      ...validI167(),
      secondWaveNewProvenanceCandidateDiscoveryReadinessReviewAuthorized: false,
    } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateTargetedLineageEvidenceAdequacyRemediationPathReassessmentReviewReport;

    const report = buildI168SecondWaveProvenanceCandidateDiscoveryReadinessReview(mutated);

    expect(report.status).toBe('I167_REMEDIATION_PATH_REASSESSMENT_INVALID');
    expect(report.decision).toBe('SECOND_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_NOT_READY');
    expect(report.exactI167BoundaryAccepted).toBe(false);
    expect(report.secondWaveCandidateDiscoveryAuthorized).toBe(false);
    expect(report.discoveryRequirementsFrozen).toBe(false);
  });
});
