import { describe, expect, it } from 'vitest';
import {
  I165_LINEAGE_ADJUDICATION_REQUIREMENT_IDS,
  buildI166ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateTargetedLineageAdjudicationEvidence,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateEvidenceAdequacyLineageAdjudicationReadinessReviewReport,
} from '../src/index.js';

function validI165(): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateEvidenceAdequacyLineageAdjudicationReadinessReviewReport {
  return {
    reviewId: 'i165_fixture',
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_EVIDENCE_ADEQUACY_LINEAGE_ADJUDICATION_READINESS_REVIEW',
    decision:
      'I164_EVIDENCE_ADEQUATE_FOR_TARGETED_LINEAGE_ADJUDICATION_READINESS_TWO_RELATIONSHIP_QUESTIONS_FROZEN_NO_INDEPENDENCE_ADJUDICATION',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI164BoundaryAccepted: true,
    i164EvidenceAdequateForCandidateDiscoveryRecord: true,
    i164EvidenceAdequateToEstablishIndependenceWithoutFurtherEvidence: false,
    candidateEvidenceRecordCount: 2,
    liHanchenNewCandidateIdentityAndScopeEvidenceAdequate: true,
    liHanchenUpstreamOriginStillUnresolved: true,
    sunHaiyiIdentityScopeAndContextEvidenceAdequate: true,
    sunHaiyiSpecificDependencyStillUnresolved: true,
    schoolLineageSignalAloneInsufficientForDependencyFinding: true,
    chronologyAloneInsufficientForDependencyFinding: true,
    doctrineSimilarityAloneInsufficientForDependencyFinding: true,
    requirementIds: I165_LINEAGE_ADJUDICATION_REQUIREMENT_IDS,
    requirementCount: 10,
    requirementsFrozen: true,
    lineageTargets: [
      { questionId: 'LI_HANCHEN_GE_BU_ZUOYONG_EXACT_UPSTREAM_ORIGIN' },
      { questionId: 'SUN_HAIYI_TO_LI_HANCHEN_SPECIFIC_DEPENDENCY' },
    ],
    lineageTargetCount: 2,
    targetedLineageEvidenceAcquisitionAuthorizedByThisGate: true,
    targetedLineageEvidenceAcquisitionExecutedByThisGate: false,
    relationshipFindingMadeByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    independentNormativeProvenanceEstablishedByThisGate: false,
    remediationStrategySelectedByThisGate: false,
    remediationExecutionAuthorizedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: true,
    candidateSetMutatedByThisGate: false,
    evidenceReboundByThisGate: false,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_TARGETED_LINEAGE_ADJUDICATION_EVIDENCE',
  } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateEvidenceAdequacyLineageAdjudicationReadinessReviewReport;
}

describe('I166 targeted remediation lineage adjudication evidence', () => {
  it('executes the exact two lineage questions and leaves both unresolved', () => {
    const report = buildI166ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateTargetedLineageAdjudicationEvidence(validI165());

    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_TARGETED_LINEAGE_ADJUDICATION_EVIDENCE',
    );
    expect(report.decision).toBe(
      'TARGETED_LINEAGE_DISCOVERY_EXECUTED_TWO_RELATIONSHIP_QUESTIONS_BOTH_UNRESOLVED_ZERO_DERIVATIVE_ZERO_EXPLICIT_NEGATIVE_ZERO_INDEPENDENCE',
    );
    expect(report.lineageEvidenceRecordCount).toBe(2);
    expect(report.unresolvedAfterTargetedLineageDiscoveryCount).toBe(2);
    expect(report.lineageEvidenceRecords.map((record) => record.finding)).toEqual([
      'UNRESOLVED_AFTER_TARGETED_LINEAGE_DISCOVERY',
      'UNRESOLVED_AFTER_TARGETED_LINEAGE_DISCOVERY',
    ]);
  });

  it('records Li self-origin language without treating it as independent corroboration', () => {
    const report = buildI166ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateTargetedLineageAdjudicationEvidence(validI165());
    const li = report.lineageEvidenceRecords[0];

    expect(report.liHanchenSelfOriginStatementLocated).toBe(true);
    expect(report.liHanchenSelfOriginStatementCorroboratedIndependently).toBe(false);
    expect(report.liHanchenExactEarlierSourceForGeBuZuoyongLocated).toBe(false);
    expect(report.liHanchenOriginFinding).toBe('UNRESOLVED_AFTER_TARGETED_LINEAGE_DISCOVERY');
    expect(li?.selfOriginClaimTreatedAsIndependentCorroboration).toBe(false);
    expect(li?.authorshipAloneUsedAsIndependenceProof).toBe(false);
    expect(li?.independenceEstablished).toBe(false);
  });

  it('records Sun multiple-teacher/collection provenance but no specific Li attribution or directional dependency', () => {
    const report = buildI166ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateTargetedLineageAdjudicationEvidence(validI165());
    const sun = report.lineageEvidenceRecords[1];

    expect(report.sunHaiyiMultipleTeachersAndCollectionStatementLocated).toBe(true);
    expect(report.sunHaiyiSpecificLiHanchenAttributionLocated).toBe(false);
    expect(report.sunHaiyiSpecificDirectionalTextualDependencyEstablished).toBe(false);
    expect(report.sunHaiyiToLiHanchenFinding).toBe('UNRESOLVED_AFTER_TARGETED_LINEAGE_DISCOVERY');
    expect(report.secondaryNewSchoolClassificationLocated).toBe(true);
    expect(report.secondarySchoolClassificationInsufficientForSpecificDependency).toBe(true);
    expect(sun?.schoolLabelAloneUsedAsDependencyProof).toBe(false);
    expect(sun?.doctrineSimilarityAloneUsedAsDependencyProof).toBe(false);
  });

  it('applies all ten I165 requirements and never converts search silence into a negative finding', () => {
    const report = buildI166ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateTargetedLineageAdjudicationEvidence(validI165());

    expect(report.requirementIdsApplied).toEqual(I165_LINEAGE_ADJUDICATION_REQUIREMENT_IDS);
    expect(report.requirementCount).toBe(10);
    for (const record of report.lineageEvidenceRecords) {
      expect(record.requirementIdsApplied).toEqual(I165_LINEAGE_ADJUDICATION_REQUIREMENT_IDS);
      expect(record.searchSilenceUsedAsNegativeFinding).toBe(false);
      expect(record.chronologyAloneUsedAsDependencyProof).toBe(false);
      expect(record.numericWeight).toBeNull();
    }
    expect(report.derivativeDependencyFoundCount).toBe(0);
    expect(report.explicitNegativeDerivativeFindingCount).toBe(0);
  });

  it('records relationship outcomes without adjudicating independent normative provenance', () => {
    const report = buildI166ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateTargetedLineageAdjudicationEvidence(validI165());

    expect(report.targetedLineageEvidenceAcquisitionExecutedByThisGate).toBe(true);
    expect(report.relationshipFindingsRecordedByThisGate).toBe(true);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.independentNormativeProvenanceEstablishedCount).toBe(0);
    expect(report.independentNormativeProvenanceEstablishedByThisGate).toBe(false);
    expect(report.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate).toBe(false);
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
  });

  it('preserves every remediation, package, production, threshold, numeric, and hidden-stem guard', () => {
    const report = buildI166ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateTargetedLineageAdjudicationEvidence(validI165());

    expect(report.remediationStrategySelectedByThisGate).toBe(false);
    expect(report.remediationExecutionAuthorizedByThisGate).toBe(false);
    expect(report.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
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

  it('fails closed if I165 has already claimed lineage evidence acquisition', () => {
    const mutated = {
      ...validI165(),
      targetedLineageEvidenceAcquisitionExecutedByThisGate: true,
    } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateEvidenceAdequacyLineageAdjudicationReadinessReviewReport;

    const report = buildI166ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateTargetedLineageAdjudicationEvidence(mutated);

    expect(report.status).toBe('I165_LINEAGE_ADJUDICATION_READINESS_INVALID');
    expect(report.decision).toBe('TARGETED_LINEAGE_DISCOVERY_NOT_EXECUTED');
    expect(report.exactI165BoundaryAccepted).toBe(false);
    expect(report.lineageEvidenceRecordCount).toBe(0);
  });

  it('materializes deterministically for the same frozen I165 input', () => {
    const first = buildI166ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateTargetedLineageAdjudicationEvidence(validI165());
    const second = buildI166ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateTargetedLineageAdjudicationEvidence(validI165());

    expect(first.evidenceRecordSetId).toBe(second.evidenceRecordSetId);
    expect(first.lineageEvidenceRecords).toEqual(second.lineageEvidenceRecords);
  });
});