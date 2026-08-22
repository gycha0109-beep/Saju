import { describe, expect, it } from 'vitest';
import {
  I165_LINEAGE_ADJUDICATION_REQUIREMENT_IDS,
  buildI165ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateEvidenceAdequacyLineageAdjudicationReadinessReview,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryEvidenceReport,
} from '../src/index.js';

function validI164(): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryEvidenceReport {
  return {
    evidenceRecordSetId: 'i164_fixture',
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_DISCOVERY_EVIDENCE',
    decision:
      'REMEDIATION_CANDIDATE_DISCOVERY_EXECUTED_ONE_NEW_PROVENANCE_CANDIDATE_AND_ONE_LINEAGE_RISK_SIGNAL_DISCOVERED_ZERO_INDEPENDENCE_OR_REMEDIATION_SELECTION',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI163ReadinessAccepted: true,
    discoveryOutputRequirementCount: 9,
    candidateEvidenceRecords: [
      {
        candidateId: 'candidate_li_hanchen_bazi_yuce_zhenzong_ge_bu_zuoyong',
      },
      {
        candidateId: 'candidate_sun_haiyi_mingli_guo_sanguan_gegan_yaoge',
      },
    ],
    candidateEvidenceRecordCount: 2,
    newProvenanceCandidatePendingAdjudicationCount: 1,
    lineageDependencyRiskSignalCount: 1,
    derivativeDependencyEstablishedCount: 0,
    explicitNegativeDerivativeFindingEstablishedCount: 0,
    independentNormativeProvenanceEstablishedCount: 0,
    liHanchenCandidateDiscovered: true,
    liHanchen1997_1999SelfDisclosedWorkChronologyRecorded: true,
    liHanchen2003InspectedEditionRecorded: true,
    liHanchenBinaryNonInteractionRuleRecorded: true,
    liHanchenIndependenceNotInferredFromAuthorshipOrChronology: true,
    sunHaiyiCandidateRecordedAsLineageRiskOnly: true,
    sunHaiyi2004WitnessRecorded: true,
    sunHaiyiSpecificTextualDependencyOnLiHanchenNotProven: true,
    thirdPartyNewSchoolLineageSignalRecorded: true,
    sameDoctrineSimilarityNotPromotedToDerivativeDependency: true,
    sameWorkDuplicateWitnessesNotCountedAsIndependentAuthority: true,
    currentV2PackageAndCandidateSetRemainImmutable: true,
    remediationCandidateDiscoveryExecutedByThisGate: true,
    remediationStrategySelectedByThisGate: false,
    remediationExecutionAuthorizedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    candidateReplacedByThisGate: false,
    evidenceReboundByThisGate: false,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_EVIDENCE_ADEQUACY_AND_LINEAGE_ADJUDICATION_READINESS_REVIEW',
  } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryEvidenceReport;
}

describe('I165 remediation candidate evidence adequacy and lineage adjudication readiness', () => {
  it('accepts exact I164 and authorizes only targeted lineage evidence acquisition', () => {
    const report = buildI165ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateEvidenceAdequacyLineageAdjudicationReadinessReview(validI164());

    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_EVIDENCE_ADEQUACY_LINEAGE_ADJUDICATION_READINESS_REVIEW',
    );
    expect(report.decision).toBe(
      'I164_EVIDENCE_ADEQUATE_FOR_TARGETED_LINEAGE_ADJUDICATION_READINESS_TWO_RELATIONSHIP_QUESTIONS_FROZEN_NO_INDEPENDENCE_ADJUDICATION',
    );
    expect(report.i164EvidenceAdequateForCandidateDiscoveryRecord).toBe(true);
    expect(report.i164EvidenceAdequateToEstablishIndependenceWithoutFurtherEvidence).toBe(false);
    expect(report.targetedLineageEvidenceAcquisitionAuthorizedByThisGate).toBe(true);
    expect(report.targetedLineageEvidenceAcquisitionExecutedByThisGate).toBe(false);
  });

  it('freezes the exact ten lineage-adjudication requirements in order', () => {
    const report = buildI165ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateEvidenceAdequacyLineageAdjudicationReadinessReview(validI164());

    expect(report.requirementIds).toEqual(I165_LINEAGE_ADJUDICATION_REQUIREMENT_IDS);
    expect(report.requirementCount).toBe(10);
    expect(report.requirementsFrozen).toBe(true);
  });

  it('targets exactly Li upstream origin and Sun-to-Li specific dependency', () => {
    const report = buildI165ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateEvidenceAdequacyLineageAdjudicationReadinessReview(validI164());

    expect(report.lineageTargetCount).toBe(2);
    expect(report.lineageTargets.map((target) => target.questionId)).toEqual([
      'LI_HANCHEN_GE_BU_ZUOYONG_EXACT_UPSTREAM_ORIGIN',
      'SUN_HAIYI_TO_LI_HANCHEN_SPECIFIC_DEPENDENCY',
    ]);
    expect(report.lineageTargets.map((target) => target.candidateId)).toEqual([
      'candidate_li_hanchen_bazi_yuce_zhenzong_ge_bu_zuoyong',
      'candidate_sun_haiyi_mingli_guo_sanguan_gegan_yaoge',
    ]);
    expect(report.exactLiHanchenOriginQuestionPresent).toBe(true);
    expect(report.exactSunHaiyiToLiHanchenQuestionPresent).toBe(true);
  });

  it('keeps both lineage questions unresolved and permits only the exact tri-state future findings', () => {
    const report = buildI165ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateEvidenceAdequacyLineageAdjudicationReadinessReview(validI164());

    for (const target of report.lineageTargets) {
      expect(target.currentFinding).toBe('UNRESOLVED_REQUIRES_TARGETED_LINEAGE_EVIDENCE');
      expect(target.readinessState).toBe('READY_FOR_TARGETED_LINEAGE_EVIDENCE_ACQUISITION');
      expect(target.allowedFutureFindingStates).toEqual([
        'DERIVATIVE_DEPENDENCY_FOUND',
        'NO_DERIVATIVE_DEPENDENCY_FOUND_WITH_EXPLICIT_BASIS',
        'UNRESOLVED_AFTER_TARGETED_LINEAGE_DISCOVERY',
      ]);
      expect(target.lineageEvidenceAcquiredByReadinessGate).toBe(false);
      expect(target.relationshipAdjudicatedByReadinessGate).toBe(false);
      expect(target.independenceAdjudicatedByReadinessGate).toBe(false);
    }
  });

  it('rejects chronology, school lineage, and doctrine similarity as standalone dependency evidence', () => {
    const report = buildI165ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateEvidenceAdequacyLineageAdjudicationReadinessReview(validI164());

    expect(report.liHanchenUpstreamOriginStillUnresolved).toBe(true);
    expect(report.sunHaiyiSpecificDependencyStillUnresolved).toBe(true);
    expect(report.schoolLineageSignalAloneInsufficientForDependencyFinding).toBe(true);
    expect(report.chronologyAloneInsufficientForDependencyFinding).toBe(true);
    expect(report.doctrineSimilarityAloneInsufficientForDependencyFinding).toBe(true);
    expect(report.relationshipFindingMadeByThisGate).toBe(false);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
  });

  it('retains package, remediation, production, threshold, numeric, and hidden-stem guards', () => {
    const report = buildI165ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateEvidenceAdequacyLineageAdjudicationReadinessReview(validI164());

    expect(report.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(report.remediationStrategySelectedByThisGate).toBe(false);
    expect(report.remediationExecutionAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetMutatedByThisGate).toBe(false);
    expect(report.candidateRemovedByThisGate).toBe(false);
    expect(report.candidateReplacedByThisGate).toBe(false);
    expect(report.evidenceReboundByThisGate).toBe(false);
    expect(report.newCandidateSetVersionCreatedByThisGate).toBe(false);
    expect(report.newInputPackageVersionCreatedByThisGate).toBe(false);
    expect(report.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate).toBe(false);
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
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

  it('fails closed if I164 fabricates a specific Sun-to-Li dependency', () => {
    const mutated = {
      ...validI164(),
      sunHaiyiSpecificTextualDependencyOnLiHanchenNotProven: false,
    } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryEvidenceReport;

    const report = buildI165ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateEvidenceAdequacyLineageAdjudicationReadinessReview(mutated);

    expect(report.status).toBe('I164_REMEDIATION_CANDIDATE_EVIDENCE_INVALID');
    expect(report.decision).toBe('LINEAGE_ADJUDICATION_NOT_READY');
    expect(report.exactI164BoundaryAccepted).toBe(false);
    expect(report.lineageTargetCount).toBe(0);
    expect(report.targetedLineageEvidenceAcquisitionAuthorizedByThisGate).toBe(false);
  });

  it('fails closed if I164 claims independent provenance was already established', () => {
    const mutated = {
      ...validI164(),
      independentNormativeProvenanceEstablishedCount: 1,
    } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryEvidenceReport;

    const report = buildI165ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateEvidenceAdequacyLineageAdjudicationReadinessReview(mutated);

    expect(report.status).toBe('I164_REMEDIATION_CANDIDATE_EVIDENCE_INVALID');
    expect(report.exactI164BoundaryAccepted).toBe(false);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.independentNormativeProvenanceEstablishedByThisGate).toBe(false);
  });
});