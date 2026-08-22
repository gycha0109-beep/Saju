import { describe, expect, it } from 'vitest';
import {
  I161_PROVENANCE_REMEDIATION_REVIEW_REQUIREMENT_IDS,
  buildI161ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginDiscoveryExhaustionPolicyReassessmentReview,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginGapTargetedDiscoveryEvidenceReport,
} from '../src/index.js';

const frozenDerivativeEvidenceIds = [
  'evidence_chen_yuan_position_distance_wuli',
  'evidence_zhu_zuxia_remote_ke_conditions',
  'evidence_yimeng_wuli_yaoke_example',
] as const;

const unresolvedIds = [
  'evidence_wei_qianli_far_position_cannot_ke',
  'evidence_wu_huaiyun_taxonomy_remote_and_operational_examples',
  'evidence_mingdeng_generic_youli_wuli_criteria',
] as const;

function record(evidenceId: (typeof unresolvedIds)[number]) {
  return {
    evidenceId,
    priorState: 'ORIGIN_UNRESOLVED_REQUIRES_FURTHER_DISCOVERY',
    relationshipFindingState: 'UNRESOLVED_AFTER_TARGETED_ORIGIN_DISCOVERY',
    boundedSearchBasisDocumented: true,
    corroborationSufficientForExplicitNegativeFinding: false,
    explicitNegativeFindingEstablished: false,
    newDerivativeDependencyFound: false,
    independenceEstablishedByThisRecord: false,
    corpusExhaustionProven: false,
    universalNoDependencyProven: false,
    numericWeight: null,
  };
}

function validI160(): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginGapTargetedDiscoveryEvidenceReport {
  return {
    evidenceRecordSetId: 'i160_fixture',
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMAINING_ORIGIN_GAP_TARGETED_DISCOVERY_EVIDENCE',
    decision:
      'TARGETED_REMAINING_ORIGIN_DISCOVERY_EXECUTED_THREE_ORIGINS_REMAIN_UNRESOLVED_ZERO_NEW_DERIVATIVE_ZERO_EXPLICIT_NEGATIVE_FINDINGS_NO_INDEPENDENCE_ADJUDICATION',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    adoptionId: 'adoption_fixture',
    candidateSetVersion: 'v1-candidate-set',
    candidateSetId: 'candidate_set_fixture',
    inputPackageVersion: 'v2-input-package',
    inputPackageId: 'v2_package_fixture',
    exactI159ReadinessAccepted: true,
    frozenDerivativeEvidenceIds,
    frozenDerivativeEvidenceCount: 3,
    frozenDerivativeFindingsReopenedByThisGate: false,
    originGapDiscoveryEvidenceRecords: unresolvedIds.map(record),
    originGapDiscoveryEvidenceRecordCount: 3,
    unresolvedAfterTargetedOriginDiscoveryCount: 3,
    newDerivativeDependencyFoundCount: 0,
    explicitNegativeFindingEstablishedCount: 0,
    independentNormativeProvenanceEstablishedCount: 0,
    exactWeiOriginRemainsUnresolved: true,
    exactWuOriginRemainsUnresolved: true,
    exactMingdengOriginRemainsUnresolved: true,
    wei1934PrefacesAnd1935WorkWitnessChecked: true,
    weiGenericTraditionalDependenceDisclosedButExactTargetLineageUnresolved: true,
    wuPublicWitnessNoLaterThan2007_03_22: true,
    wuDownstreamRetransmissionRemainsFrozen: true,
    mingdeng2022SelfHostedWitnessChecked: true,
    allThreeBoundedSearchBasesDocumented: true,
    noExplicitNegativeFindingFromSearchSilence: true,
    noChronologyOnlyIndependenceInference: true,
    noUniqueSourceIdentityIndependenceInference: true,
    noSourceCountVotingPerformed: true,
    noProvenanceTierWeightingPerformed: true,
    corpusExhaustionProven: false,
    universalNoDerivativeDependencyProven: false,
    targetedOriginGapDiscoveryExecutedByThisGate: true,
    derivativeRelationshipFindingMadeByThisGate: false,
    provenanceIndependenceFindingMadeByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false,
    provenanceIndependenceCheckMayPassByThisGate: false,
    inputPackageMutatedByThisGate: false,
    newPackageVersionCreatedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    candidateSetReevaluationPerformedByThisGate: false,
    candidateSetAdmissibilityEstablishedByThisGate: false,
    productionPolicyExecutionAuthorized: false,
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    authorityAcquiredByThisGate: false,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    thresholdRuleCreatedByThisGate: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    hiddenStemInteractionEligibilityGapRemains: true,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMAINING_ORIGIN_DISCOVERY_EXHAUSTION_AND_POLICY_REASSESSMENT_REVIEW',
  } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginGapTargetedDiscoveryEvidenceReport;
}

describe('I161 provenance origin-discovery exhaustion policy reassessment', () => {
  it('keeps current v2 provenance blocked without claiming corpus exhaustion or relaxing I132', () => {
    const report = buildI161ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginDiscoveryExhaustionPolicyReassessmentReview(validI160());

    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMAINING_ORIGIN_DISCOVERY_EXHAUSTION_POLICY_REASSESSMENT_REVIEW',
    );
    expect(report.decision).toBe(
      'TARGETED_ORIGIN_DISCOVERY_DID_NOT_RESOLVE_THREE_ORIGINS_NO_CORPUS_EXHAUSTION_NO_POLICY_RELAXATION_CURRENT_V2_PROVENANCE_REMAINS_BLOCKED_SEPARATE_CANDIDATE_SET_PROVENANCE_REMEDIATION_REQUIREMENTS_REVIEW_MAY_PROCEED',
    );
    expect(report.currentV2ProvenanceDisposition).toBe('BLOCKED_UNDER_CURRENT_EVIDENCE');
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(report.corpusExhaustionProven).toBe(false);
    expect(report.universalNoDerivativeDependencyProven).toBe(false);
  });

  it('preserves three frozen derivative rows and three unresolved origins with zero promoted independence findings', () => {
    const report = buildI161ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginDiscoveryExhaustionPolicyReassessmentReview(validI160());

    expect(report.frozenDerivativeEvidenceCount).toBe(3);
    expect(report.unresolvedOriginEvidenceCount).toBe(3);
    expect(report.newDerivativeDependencyCount).toBe(0);
    expect(report.explicitNegativeDerivativeFindingCount).toBe(0);
    expect(report.independentNormativeProvenanceEstablishedCount).toBe(0);
    expect(report.targetedOriginDiscoveryResolvedAnyOrigin).toBe(false);
  });

  it('rejects search exhaustion, repetition, chronology, unique identity, and ignored traditional dependence as independence shortcuts', () => {
    const report = buildI161ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginDiscoveryExhaustionPolicyReassessmentReview(validI160());

    expect(report.searchSilenceMayBecomeIndependenceEvidence).toBe(false);
    expect(report.repeatedUnresolvedSearchMayBecomeIndependenceEvidence).toBe(false);
    expect(report.chronologyMayBecomeIndependenceEvidence).toBe(false);
    expect(report.uniqueSourceIdentityMayBecomeIndependenceEvidence).toBe(false);
    expect(report.genericTraditionalDependenceMayBeIgnoredForIndependence).toBe(false);
    expect(report.downstreamRetransmissionMayProveUpstreamIndependence).toBe(false);
    expect(report.unresolvedDefaultRejectIndependenceClaimRemains).toBe(true);
  });

  it('freezes the exact eight prospective remediation-review requirements', () => {
    const report = buildI161ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginDiscoveryExhaustionPolicyReassessmentReview(validI160());

    expect(report.remediationReviewRequirementCount).toBe(8);
    expect(report.remediationReviewRequirementIds).toEqual(I161_PROVENANCE_REMEDIATION_REVIEW_REQUIREMENT_IDS);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(report.priorDerivativeRowsMayBeGrandfatheredAsIndependent).toBe(false);
    expect(report.priorUnresolvedRowsMayBeGrandfatheredAsIndependent).toBe(false);
  });

  it('authorizes only a separate remediation requirements review, not any candidate-set action', () => {
    const report = buildI161ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginDiscoveryExhaustionPolicyReassessmentReview(validI160());

    expect(report.candidateSetProvenanceRemediationRequirementsReviewMethodologicallyJustified).toBe(true);
    expect(report.candidateSetProvenanceRemediationRequirementsReviewAuthorized).toBe(true);
    expect(report.remediationRequirementsReviewAuthorizationIsCandidateSetMutation).toBe(false);
    expect(report.remediationRequirementsReviewAuthorizationIsCandidateRemoval).toBe(false);
    expect(report.remediationRequirementsReviewAuthorizationIsCandidateReplacement).toBe(false);
    expect(report.remediationRequirementsReviewAuthorizationIsEvidenceRebinding).toBe(false);
    expect(report.remediationRequirementsReviewAuthorizationIsPackageVersionCreation).toBe(false);
    expect(report.remediationRequirementsReviewAuthorizationIsEvaluationAuthorization).toBe(false);
    expect(report.remediationRequirementsReviewAuthorizationIsProvenanceAdjudication).toBe(false);
  });

  it('permits further lineage research without making it a prerequisite for alternative governed remediation review', () => {
    const report = buildI161ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginDiscoveryExhaustionPolicyReassessmentReview(validI160());

    expect(report.continuedOriginDiscoveryPermitted).toBe(true);
    expect(report.continuedOriginDiscoveryRequiredBeforeAnyAlternativeGovernanceReview).toBe(false);
    expect(report.anyFutureCandidateSetChangeMustBeProspective).toBe(true);
    expect(report.anyFutureCandidateSetChangeRequiresNewPackageVersion).toBe(true);
    expect(report.anyFutureReevaluationRequiresNewSingleUseAuthorization).toBe(true);
  });

  it('retains package, re-evaluation, production, composition, threshold, classification, numeric, and hidden-stem guards', () => {
    const report = buildI161ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginDiscoveryExhaustionPolicyReassessmentReview(validI160());

    expect(report.currentV2ProvenanceIndependenceSatisfied).toBe(false);
    expect(report.provenanceIndependenceCheckMayPassFromCurrentEvidence).toBe(false);
    expect(report.candidateSetAdmissibilityEstablishedFromCurrentEvidence).toBe(false);
    expect(report.inputPackageMutatedByThisGate).toBe(false);
    expect(report.newPackageVersionCreatedByThisGate).toBe(false);
    expect(report.candidateSetMutatedByThisGate).toBe(false);
    expect(report.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.hiddenStemAuthorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
  });

  it('fails closed if I160 falsely promotes one unresolved row into an explicit negative finding', () => {
    const i160 = validI160();
    const mutated = {
      ...i160,
      originGapDiscoveryEvidenceRecords: [
        {
          ...i160.originGapDiscoveryEvidenceRecords[0],
          relationshipFindingState: 'NO_DERIVATIVE_DEPENDENCY_FOUND_WITH_EXPLICIT_BASIS',
          explicitNegativeFindingEstablished: true,
        },
        ...i160.originGapDiscoveryEvidenceRecords.slice(1),
      ],
    } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginGapTargetedDiscoveryEvidenceReport;

    const report = buildI161ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginDiscoveryExhaustionPolicyReassessmentReview(mutated);

    expect(report.status).toBe('I160_ORIGIN_DISCOVERY_EVIDENCE_INVALID');
    expect(report.decision).toBe('ORIGIN_DISCOVERY_EXHAUSTION_POLICY_REASSESSMENT_NOT_ESTABLISHED');
    expect(report.exactI160EvidenceAccepted).toBe(false);
    expect(report.currentV2ProvenanceDisposition).toBe('NOT_ASSESSED');
    expect(report.candidateSetProvenanceRemediationRequirementsReviewAuthorized).toBe(false);
  });
});
