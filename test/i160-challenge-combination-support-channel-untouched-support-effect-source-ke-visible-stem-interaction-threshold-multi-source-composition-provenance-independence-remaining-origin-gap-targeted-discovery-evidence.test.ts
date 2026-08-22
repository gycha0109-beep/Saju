import { describe, expect, it } from 'vitest';
import {
  I159_ORIGIN_GAP_DISCOVERY_REQUIREMENT_IDS,
  I159_REMAINING_ORIGIN_GAP_EVIDENCE_IDS,
  buildI160ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginGapTargetedDiscoveryEvidence,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginGapTargetedDiscoveryReadinessReviewReport,
} from '../src/index.js';

const frozenDerivativeIds = [
  'evidence_chen_yuan_position_distance_wuli',
  'evidence_zhu_zuxia_remote_ke_conditions',
  'evidence_yimeng_wuli_yaoke_example',
] as const;

function validI159(): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginGapTargetedDiscoveryReadinessReviewReport {
  return {
    reviewId: 'i159_fixture',
    reviewVersion:
      'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-provenance-independence-remaining-origin-gap-targeted-discovery-readiness-review-v1',
    upstreamI158ReviewId: 'i158_fixture',
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMAINING_ORIGIN_GAP_TARGETED_DISCOVERY_READINESS_REVIEW',
    decision:
      'EXACT_THREE_UNRESOLVED_ORIGIN_GAPS_READY_FOR_TARGETED_DISCOVERY_THREE_DERIVATIVE_FINDINGS_FROZEN_NOT_REOPENED_NO_INDEPENDENCE_ADJUDICATION',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    adoptionId: 'adoption_fixture',
    candidateSetVersion: 'v1-candidate-set',
    candidateSetId: 'candidate_set_fixture',
    inputPackageVersion: 'v2-input-package',
    inputPackageId: 'v2_package_fixture',
    exactI158BoundaryAccepted: true,
    discoveryRequirementIds: I159_ORIGIN_GAP_DISCOVERY_REQUIREMENT_IDS,
    discoveryRequirementCount: 9,
    frozenDerivativeEvidenceIds: frozenDerivativeIds,
    frozenDerivativeEvidenceCount: 3,
    frozenDerivativeFindingsReopenedByThisGate: false,
    originGapDiscoveryTargets: I159_REMAINING_ORIGIN_GAP_EVIDENCE_IDS.map((evidenceId) => ({
      evidenceId,
      priorState: 'ORIGIN_UNRESOLVED_REQUIRES_FURTHER_DISCOVERY',
      targetQuestion: 'NORMATIVE_ORIGIN_DERIVATIVE_RELATIONSHIP',
      requiredDiscoveryRequirementIds: I159_ORIGIN_GAP_DISCOVERY_REQUIREMENT_IDS,
      allowedFindingStates: [
        'DERIVATIVE_DEPENDENCY_FOUND',
        'NO_DERIVATIVE_DEPENDENCY_FOUND_WITH_EXPLICIT_BASIS',
        'UNRESOLVED_AFTER_TARGETED_ORIGIN_DISCOVERY',
      ],
      discoveryState: 'AUTHORIZED_NOT_EXECUTED',
      independenceFindingAuthorizedByReadinessGate: false,
      explicitNegativeFindingMayComeFromSearchSilenceAlone: false,
    })),
    originGapDiscoveryTargetCount: 3,
    exactWeiTargetPresent: true,
    exactWuTargetPresent: true,
    exactMingdengTargetPresent: true,
    onlyI158UnresolvedOriginsTargeted: true,
    earliestWitnessOrEditionCheckRequired: true,
    internalAttributionAndCitationCheckRequired: true,
    datedPredecessorPhraseSearchRequired: true,
    sameWorkDuplicateNormalizationRequired: true,
    selectedSetAndExternalLineageCrossCheckRequired: true,
    explicitNegativeFindingRequiresDocumentedBoundedSearchBasis: true,
    searchSilenceMayBecomeNegativeFindingAlone: false,
    chronologyMayBecomeIndependenceFindingAlone: false,
    uniqueSourceIdentityMayBecomeIndependenceFindingAlone: false,
    sourceCountVotingAllowed: false,
    provenanceTierWeightingAllowed: false,
    targetedOriginGapDiscoveryAuthorizedByThisGate: true,
    targetedOriginGapDiscoveryExecutedByThisGate: false,
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
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    hiddenStemInteractionEligibilityGapRemains: true,
    hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMAINING_ORIGIN_GAP_TARGETED_DISCOVERY_EVIDENCE',
    notes: ['fixture'],
  };
}

describe('I160 remaining provenance origin-gap targeted discovery evidence', () => {
  it('executes the exact authorized three-target discovery and keeps all three origins unresolved', () => {
    const report = buildI160ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginGapTargetedDiscoveryEvidence(validI159());

    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMAINING_ORIGIN_GAP_TARGETED_DISCOVERY_EVIDENCE',
    );
    expect(report.decision).toBe(
      'TARGETED_REMAINING_ORIGIN_DISCOVERY_EXECUTED_THREE_ORIGINS_REMAIN_UNRESOLVED_ZERO_NEW_DERIVATIVE_ZERO_EXPLICIT_NEGATIVE_FINDINGS_NO_INDEPENDENCE_ADJUDICATION',
    );
    expect(report.originGapDiscoveryEvidenceRecordCount).toBe(3);
    expect(report.unresolvedAfterTargetedOriginDiscoveryCount).toBe(3);
    expect(report.targetedOriginGapDiscoveryExecutedByThisGate).toBe(true);
  });

  it('preserves the exact I159 requirement order and exact three evidence bindings', () => {
    const report = buildI160ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginGapTargetedDiscoveryEvidence(validI159());

    expect(report.discoveryRequirementIdsApplied).toEqual(I159_ORIGIN_GAP_DISCOVERY_REQUIREMENT_IDS);
    expect(report.originGapDiscoveryEvidenceRecords.map((record) => record.evidenceId)).toEqual(
      I159_REMAINING_ORIGIN_GAP_EVIDENCE_IDS,
    );
    expect(report.originGapDiscoveryEvidenceRecords.every((record) => record.discoveryRequirementIdsApplied.length === 9)).toBe(true);
  });

  it('records Wei generic traditional dependence without inventing a target-specific predecessor or negative finding', () => {
    const report = buildI160ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginGapTargetedDiscoveryEvidence(validI159());
    const wei = report.originGapDiscoveryEvidenceRecords[0]!;

    expect(wei.evidenceId).toBe('evidence_wei_qianli_far_position_cannot_ke');
    expect(wei.lineageClass).toBe('GENERIC_TRADITIONAL_DEPENDENCE_EXACT_TARGET_LINEAGE_UNRESOLVED');
    expect(wei.relationshipFindingState).toBe('UNRESOLVED_AFTER_TARGETED_ORIGIN_DISCOVERY');
    expect(wei.internalAttributionAndCitationFinding).toContain('prior sages');
    expect(wei.explicitNegativeFindingEstablished).toBe(false);
    expect(wei.independenceEstablishedByThisRecord).toBe(false);
    expect(report.weiGenericTraditionalDependenceDisclosedButExactTargetLineageUnresolved).toBe(true);
  });

  it('pushes the Wu public witness boundary to 2007-03-22 while preserving upstream-origin uncertainty', () => {
    const report = buildI160ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginGapTargetedDiscoveryEvidence(validI159());
    const wu = report.originGapDiscoveryEvidenceRecords[1]!;

    expect(wu.evidenceId).toBe('evidence_wu_huaiyun_taxonomy_remote_and_operational_examples');
    expect(wu.earliestWitnessOrEditionFinding).toContain('2007-03-22');
    expect(wu.relationshipFindingState).toBe('UNRESOLVED_AFTER_TARGETED_ORIGIN_DISCOVERY');
    expect(report.wuPublicWitnessNoLaterThan2007_03_22).toBe(true);
    expect(report.wuDownstreamRetransmissionRemainsFrozen).toBe(true);
  });

  it('keeps Mingdeng unresolved and refuses to convert exact-phrase search silence into a negative finding', () => {
    const report = buildI160ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginGapTargetedDiscoveryEvidence(validI159());
    const mingdeng = report.originGapDiscoveryEvidenceRecords[2]!;

    expect(mingdeng.evidenceId).toBe('evidence_mingdeng_generic_youli_wuli_criteria');
    expect(mingdeng.earliestWitnessOrEditionFinding).toContain('2022-08-05');
    expect(mingdeng.relationshipFindingState).toBe('UNRESOLVED_AFTER_TARGETED_ORIGIN_DISCOVERY');
    expect(mingdeng.explicitNegativeFindingEstablished).toBe(false);
    expect(report.noExplicitNegativeFindingFromSearchSilence).toBe(true);
  });

  it('documents bounded searches but does not claim corpus exhaustion or universal absence', () => {
    const report = buildI160ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginGapTargetedDiscoveryEvidence(validI159());

    expect(report.allThreeBoundedSearchBasesDocumented).toBe(true);
    expect(report.originGapDiscoveryEvidenceRecords.every((record) => record.boundedSearchBasisDocumented)).toBe(true);
    expect(report.originGapDiscoveryEvidenceRecords.every((record) => record.boundedSearchQueries.length >= 5)).toBe(true);
    expect(report.corpusExhaustionProven).toBe(false);
    expect(report.universalNoDerivativeDependencyProven).toBe(false);
    expect(report.explicitNegativeFindingEstablishedCount).toBe(0);
    expect(report.independentNormativeProvenanceEstablishedCount).toBe(0);
  });

  it('retains all evaluation, package, production, threshold, classification, numeric, and hidden-stem guards', () => {
    const report = buildI160ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginGapTargetedDiscoveryEvidence(validI159());

    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate).toBe(false);
    expect(report.provenanceIndependenceCheckMayPassByThisGate).toBe(false);
    expect(report.inputPackageMutatedByThisGate).toBe(false);
    expect(report.newPackageVersionCreatedByThisGate).toBe(false);
    expect(report.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetAdmissibilityEstablishedByThisGate).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.hiddenStemAuthorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
  });

  it('fails closed if the I159 discovery authorization boundary is mutated', () => {
    const mutated = validI159();
    const target = mutated.originGapDiscoveryTargets[0]!;
    const invalid = {
      ...mutated,
      originGapDiscoveryTargets: [
        { ...target, discoveryState: 'EXECUTED' },
        ...mutated.originGapDiscoveryTargets.slice(1),
      ],
    } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginGapTargetedDiscoveryReadinessReviewReport;

    const report = buildI160ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginGapTargetedDiscoveryEvidence(invalid);

    expect(report.status).toBe('I159_REMAINING_ORIGIN_GAP_DISCOVERY_READINESS_INVALID');
    expect(report.decision).toBe('TARGETED_REMAINING_ORIGIN_DISCOVERY_NOT_EXECUTED');
    expect(report.exactI159ReadinessAccepted).toBe(false);
    expect(report.targetedOriginGapDiscoveryExecutedByThisGate).toBe(false);
    expect(report.originGapDiscoveryEvidenceRecordCount).toBe(0);
  });
});
