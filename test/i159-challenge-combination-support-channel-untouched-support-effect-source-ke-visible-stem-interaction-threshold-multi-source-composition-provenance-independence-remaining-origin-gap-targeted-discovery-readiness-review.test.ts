import { describe, expect, test } from 'vitest';
import {
  I159_ORIGIN_GAP_DISCOVERY_REQUIREMENT_IDS,
  I159_REMAINING_ORIGIN_GAP_EVIDENCE_IDS,
  buildI159ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginGapTargetedDiscoveryReadinessReview,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipDiscoveryEvidenceAdequacyAdjudicationReadinessReviewReport,
} from '../src/index.js';

const derivativeIds = [
  'evidence_chen_yuan_position_distance_wuli',
  'evidence_zhu_zuxia_remote_ke_conditions',
  'evidence_yimeng_wuli_yaoke_example',
] as const;

function validI158(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipDiscoveryEvidenceAdequacyAdjudicationReadinessReviewReport {
  const evidenceAdequacyRecords = [
    ...derivativeIds.map((evidenceId, index) => ({
      evidenceId,
      provenanceIdentity: `derivative-p-${index + 1}`,
      relationshipFindingState: 'DERIVATIVE_DEPENDENCY_FOUND',
      relationshipClass: 'DERIVATIVE_CLASS',
      sourceLocatorCount: 1,
      derivativeRelationshipEvidenceAdequateForRecordedFinding: true,
      independenceAdjudicationEligibilityState: 'DERIVATIVE_NOT_ELIGIBLE_AS_INDEPENDENT_PROVENANCE',
      explicitNegativeDerivativeFindingPresent: false,
      independentNormativeProvenanceEstablished: false,
      requiresFurtherOriginDiscovery: false,
    })),
    ...I159_REMAINING_ORIGIN_GAP_EVIDENCE_IDS.map((evidenceId, index) => ({
      evidenceId,
      provenanceIdentity: `unresolved-p-${index + 1}`,
      relationshipFindingState: 'UNRESOLVED_AFTER_TARGETED_DISCOVERY',
      relationshipClass: 'ORIGIN_LINEAGE_UNRESOLVED',
      sourceLocatorCount: 1,
      derivativeRelationshipEvidenceAdequateForRecordedFinding: true,
      independenceAdjudicationEligibilityState: 'ORIGIN_UNRESOLVED_REQUIRES_FURTHER_DISCOVERY',
      explicitNegativeDerivativeFindingPresent: false,
      independentNormativeProvenanceEstablished: false,
      requiresFurtherOriginDiscovery: true,
    })),
  ];

  const base = {
    reviewId: 'i158_i159_fixture',
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_DERIVATIVE_RELATIONSHIP_DISCOVERY_EVIDENCE_ADEQUACY_ADJUDICATION_READINESS_REVIEW',
    decision:
      'DISCOVERY_EVIDENCE_ADEQUATE_FOR_RECORDED_DERIVATIVE_FINDINGS_BUT_FULL_PROVENANCE_ADJUDICATION_NOT_READY_THREE_DERIVATIVE_THREE_ORIGIN_UNRESOLVED_ZERO_EXPLICIT_NEGATIVE_FINDINGS',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    adoptionId: 'adoption_fixture',
    candidateSetVersion: 'v1-candidate-set',
    candidateSetId: 'candidate_set_fixture',
    inputPackageVersion: 'v2-input-package',
    inputPackageId: 'input_package_v2_fixture',
    exactI157EvidenceAccepted: true,
    discoveryRequirementIdsAccepted: [],
    discoveryRequirementCount: 8,
    evidenceAdequacyRecords,
    evidenceAdequacyRecordCount: 6,
    derivativeRelationshipEvidenceAdequateCount: 6,
    derivativeNotEligibleAsIndependentCount: 3,
    unresolvedOriginCount: 3,
    explicitNegativeDerivativeFindingCount: 0,
    positivelyIndependentProvenanceEstablishedCount: 0,
    selectedSetCrossCandidateDependencyCountAccepted: 1,
    selectedSetCrossCandidateDependencyEvidenceId: 'evidence_yimeng_wuli_yaoke_example',
    selectedSetCrossCandidateDependencyTargetEvidenceId:
      'evidence_wu_huaiyun_taxonomy_remote_and_operational_examples',
    crossCandidateDependentEvidenceMayCountAsIndependentAuthority: false,
    externalEditorialLineageMayCountAsIndependenceProof: false,
    priorSameAuthorRevisionMayCountAsIndependenceProof: false,
    sameWorkWitnessNormalizationMayCountAsIndependenceProof: false,
    unresolvedOriginMayCountAsIndependenceProof: false,
    searchSilenceMayCountAsExplicitNegativeDerivativeFinding: false,
    chronologyAloneMayEstablishIndependence: false,
    uniqueSourceIdentityMayEstablishIndependence: false,
    sourceCountVotingAllowed: false,
    provenanceTierWeightingAllowed: false,
    I132IndependentNormativeProvenanceRequirementSatisfied: false,
    provenanceIndependenceCheckMayPassFromCurrentEvidence: false,
    provenanceIndependenceAdjudicationReady: false,
    remainingOriginGapTargetCount: 3,
    remainingOriginGapEvidenceIds: I159_REMAINING_ORIGIN_GAP_EVIDENCE_IDS,
    remainingOriginGapTargetedDiscoveryReady: true,
    derivativeEvidenceAcceptedWithoutPackageMutation: true,
    provenanceIndependenceAdjudicatedByThisGate: false,
    provenanceIndependenceEstablishedByThisGate: false,
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
    hiddenStemAuthorityGap:
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMAINING_ORIGIN_GAP_TARGETED_DISCOVERY_READINESS_REVIEW',
  };

  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipDiscoveryEvidenceAdequacyAdjudicationReadinessReviewReport;
}

describe('I159 remaining provenance origin-gap targeted discovery readiness review', () => {
  test('accepts the exact I158 three-derivative/three-unresolved boundary', () => {
    const report = buildI159ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginGapTargetedDiscoveryReadinessReview(
      validI158(),
    );

    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMAINING_ORIGIN_GAP_TARGETED_DISCOVERY_READINESS_REVIEW',
    );
    expect(report.decision).toBe(
      'EXACT_THREE_UNRESOLVED_ORIGIN_GAPS_READY_FOR_TARGETED_DISCOVERY_THREE_DERIVATIVE_FINDINGS_FROZEN_NOT_REOPENED_NO_INDEPENDENCE_ADJUDICATION',
    );
    expect(report.exactI158BoundaryAccepted).toBe(true);
  });

  test('freezes the three derivative findings and does not reopen them', () => {
    const report = buildI159ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginGapTargetedDiscoveryReadinessReview(
      validI158(),
    );

    expect(report.frozenDerivativeEvidenceCount).toBe(3);
    expect(report.frozenDerivativeEvidenceIds).toEqual(derivativeIds);
    expect(report.frozenDerivativeFindingsReopenedByThisGate).toBe(false);
  });

  test('targets exactly Wei, Wu and Mingdeng and no other evidence row', () => {
    const report = buildI159ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginGapTargetedDiscoveryReadinessReview(
      validI158(),
    );

    expect(report.originGapDiscoveryTargetCount).toBe(3);
    expect(report.originGapDiscoveryTargets.map((target) => target.evidenceId)).toEqual(
      I159_REMAINING_ORIGIN_GAP_EVIDENCE_IDS,
    );
    expect(report.exactWeiTargetPresent).toBe(true);
    expect(report.exactWuTargetPresent).toBe(true);
    expect(report.exactMingdengTargetPresent).toBe(true);
    expect(report.onlyI158UnresolvedOriginsTargeted).toBe(true);
  });

  test('freezes all nine origin-gap discovery requirements for each target', () => {
    const report = buildI159ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginGapTargetedDiscoveryReadinessReview(
      validI158(),
    );

    expect(report.discoveryRequirementIds).toEqual(I159_ORIGIN_GAP_DISCOVERY_REQUIREMENT_IDS);
    expect(report.discoveryRequirementCount).toBe(9);
    expect(
      report.originGapDiscoveryTargets.every(
        (target) => target.requiredDiscoveryRequirementIds === I159_ORIGIN_GAP_DISCOVERY_REQUIREMENT_IDS,
      ),
    ).toBe(true);
  });

  test('allows tri-state discovery outcomes but forbids search-silence negative findings', () => {
    const report = buildI159ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginGapTargetedDiscoveryReadinessReview(
      validI158(),
    );

    expect(report.originGapDiscoveryTargets[0]?.allowedFindingStates).toEqual([
      'DERIVATIVE_DEPENDENCY_FOUND',
      'NO_DERIVATIVE_DEPENDENCY_FOUND_WITH_EXPLICIT_BASIS',
      'UNRESOLVED_AFTER_TARGETED_ORIGIN_DISCOVERY',
    ]);
    expect(report.explicitNegativeFindingRequiresDocumentedBoundedSearchBasis).toBe(true);
    expect(report.searchSilenceMayBecomeNegativeFindingAlone).toBe(false);
    expect(report.chronologyMayBecomeIndependenceFindingAlone).toBe(false);
    expect(report.uniqueSourceIdentityMayBecomeIndependenceFindingAlone).toBe(false);
    expect(report.sourceCountVotingAllowed).toBe(false);
    expect(report.provenanceTierWeightingAllowed).toBe(false);
  });

  test('authorizes targeted research only and makes no independence finding', () => {
    const report = buildI159ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginGapTargetedDiscoveryReadinessReview(
      validI158(),
    );

    expect(report.targetedOriginGapDiscoveryAuthorizedByThisGate).toBe(true);
    expect(report.targetedOriginGapDiscoveryExecutedByThisGate).toBe(false);
    expect(report.derivativeRelationshipFindingMadeByThisGate).toBe(false);
    expect(report.provenanceIndependenceFindingMadeByThisGate).toBe(false);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate).toBe(false);
    expect(report.provenanceIndependenceCheckMayPassByThisGate).toBe(false);
  });

  test('fails closed if an I158 derivative row is reclassified as unresolved', () => {
    const i158 = validI158();
    const alteredRecords = i158.evidenceAdequacyRecords.map((record, index) =>
      index === 0
        ? {
            ...record,
            independenceAdjudicationEligibilityState: 'ORIGIN_UNRESOLVED_REQUIRES_FURTHER_DISCOVERY',
            requiresFurtherOriginDiscovery: true,
          }
        : record,
    );
    const report = buildI159ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginGapTargetedDiscoveryReadinessReview(
      validI158({ evidenceAdequacyRecords: alteredRecords }),
    );

    expect(report.status).toBe('I158_REMAINING_ORIGIN_GAP_BOUNDARY_INVALID');
    expect(report.targetedOriginGapDiscoveryAuthorizedByThisGate).toBe(false);
    expect(report.originGapDiscoveryTargets).toEqual([]);
  });

  test('preserves all package, reevaluation and production authority ceilings', () => {
    const report = buildI159ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginGapTargetedDiscoveryReadinessReview(
      validI158(),
    );

    expect(report.inputPackageMutatedByThisGate).toBe(false);
    expect(report.newPackageVersionCreatedByThisGate).toBe(false);
    expect(report.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetReevaluationPerformedByThisGate).toBe(false);
    expect(report.candidateSetAdmissibilityEstablishedByThisGate).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
    expect(report.visibleStemBinaryEffectiveInteractionEligibilityResolved).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMAINING_ORIGIN_GAP_TARGETED_DISCOVERY_EVIDENCE',
    );
  });
});
