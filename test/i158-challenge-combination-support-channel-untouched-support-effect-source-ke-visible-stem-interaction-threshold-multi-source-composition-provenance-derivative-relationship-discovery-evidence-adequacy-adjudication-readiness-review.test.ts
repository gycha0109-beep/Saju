import { describe, expect, test } from 'vitest';
import {
  I156_DISCOVERY_REQUIREMENT_IDS,
  buildI158ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipDiscoveryEvidenceAdequacyAdjudicationReadinessReview,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipAuthorityDiscoveryEvidenceReport,
} from '../src/index.js';

const specs = [
  ['evidence_chen_yuan_position_distance_wuli', 'p-chen', 'DERIVATIVE_DEPENDENCY_FOUND', 'EDITORIAL_OR_LECTURE_LINEAGE', false],
  ['evidence_wei_qianli_far_position_cannot_ke', 'p-wei', 'UNRESOLVED_AFTER_TARGETED_DISCOVERY', 'SAME_WORK_WITNESS_RETRANSMISSION_ONLY', false],
  ['evidence_zhu_zuxia_remote_ke_conditions', 'p-zhu', 'DERIVATIVE_DEPENDENCY_FOUND', 'PRIOR_SAME_AUTHOR_WORK_REVISION_LINEAGE', false],
  ['evidence_yimeng_wuli_yaoke_example', 'p-yimeng', 'DERIVATIVE_DEPENDENCY_FOUND', 'CROSS_CANDIDATE_TEXTUAL_RETRANSMISSION', true],
  ['evidence_wu_huaiyun_taxonomy_remote_and_operational_examples', 'p-wu', 'UNRESOLVED_AFTER_TARGETED_DISCOVERY', 'ORIGIN_LINEAGE_UNRESOLVED', false],
  ['evidence_mingdeng_generic_youli_wuli_criteria', 'p-mingdeng', 'UNRESOLVED_AFTER_TARGETED_DISCOVERY', 'ORIGIN_LINEAGE_UNRESOLVED', false],
] as const;

function validI157(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipAuthorityDiscoveryEvidenceReport {
  const discoveryEvidenceRecords = specs.map(
    ([evidenceId, provenanceIdentity, relationshipFindingState, relationshipClass, crossCandidateDependencyFound]) => ({
      evidenceId,
      provenanceIdentity,
      registeredDependencyLinks: [],
      discoveryRequirementIdsApplied: I156_DISCOVERY_REQUIREMENT_IDS,
      relationshipFindingState,
      relationshipClass,
      relatedProvenanceIdentities: [],
      sourceLocators: [`https://example.test/${evidenceId}`],
      chronologyFinding: `chronology-${evidenceId}`,
      attributionAndRetransmissionFinding: `attribution-${evidenceId}`,
      sameWorkNormalizationFinding: `normalization-${evidenceId}`,
      directLineageFinding: `lineage-${evidenceId}`,
      explicitNegativeSearchBasisEstablished: false,
      crossCandidateDependencyFound,
      findingConclusion: `conclusion-${evidenceId}`,
      independenceEstablishedByThisRecord: false,
      numericWeight: null,
    }),
  );

  const base = {
    evidenceRecordSetId: 'i157_i158_fixture',
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_DERIVATIVE_RELATIONSHIP_AUTHORITY_DISCOVERY_EVIDENCE',
    decision:
      'TARGETED_DERIVATIVE_RELATIONSHIP_DISCOVERY_EXECUTED_THREE_DERIVATIVE_RELATIONSHIPS_FOUND_THREE_ORIGINS_UNRESOLVED_ONE_CROSS_CANDIDATE_RETRANSMISSION_FOUND_NO_INDEPENDENCE_ADJUDICATION',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    adoptionId: 'adoption_fixture',
    candidateSetVersion: 'v1-candidate-set',
    candidateSetId: 'candidate_set_fixture',
    inputPackageVersion: 'v2-input-package',
    inputPackageId: 'input_package_v2_fixture',
    exactI156ReadinessAccepted: true,
    discoveryRequirementIdsApplied: I156_DISCOVERY_REQUIREMENT_IDS,
    discoveryRequirementCount: 8,
    discoveryEvidenceRecords,
    discoveryEvidenceRecordCount: 6,
    derivativeDependencyFoundCount: 3,
    explicitNegativeRelationshipFoundCount: 0,
    unresolvedAfterDiscoveryCount: 3,
    crossCandidateDependencyFoundCount: 1,
    exactCrossCandidateDependencyEvidenceId: 'evidence_yimeng_wuli_yaoke_example',
    exactCrossCandidateDependencyTargetEvidenceId:
      'evidence_wu_huaiyun_taxonomy_remote_and_operational_examples',
    chenEditorialOrLectureLineageFound: true,
    weiSameWorkWitnessRetransmissionConfirmedButNormativeOriginStillUnresolved: true,
    zhuPriorSameAuthorRevisionLineageFound: true,
    yimengToWuCrossCandidateTextualRetransmissionFound: true,
    wuNormativeOriginStillUnresolved: true,
    mingdengNormativeOriginStillUnresolved: true,
    noNegativeFindingCreatedFromSearchSilence: true,
    noChronologyOnlyIndependenceInference: true,
    noSourceCountVotingPerformed: true,
    noProvenanceTierWeightingPerformed: true,
    allIndependenceFindingsRemainUnestablished: true,
    discoveryExecutedByThisGate: true,
    derivativeRelationshipFindingsMadeByThisGate: true,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_DERIVATIVE_RELATIONSHIP_DISCOVERY_EVIDENCE_ADEQUACY_AND_ADJUDICATION_READINESS_REVIEW',
  };

  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipAuthorityDiscoveryEvidenceReport;
}

describe('I158 provenance discovery evidence adequacy and adjudication readiness review', () => {
  test('accepts exact I157 evidence and distinguishes evidence adequacy from adjudication readiness', () => {
    const report = buildI158ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipDiscoveryEvidenceAdequacyAdjudicationReadinessReview(
      validI157(),
    );

    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_DERIVATIVE_RELATIONSHIP_DISCOVERY_EVIDENCE_ADEQUACY_ADJUDICATION_READINESS_REVIEW',
    );
    expect(report.decision).toBe(
      'DISCOVERY_EVIDENCE_ADEQUATE_FOR_RECORDED_DERIVATIVE_FINDINGS_BUT_FULL_PROVENANCE_ADJUDICATION_NOT_READY_THREE_DERIVATIVE_THREE_ORIGIN_UNRESOLVED_ZERO_EXPLICIT_NEGATIVE_FINDINGS',
    );
    expect(report.exactI157EvidenceAccepted).toBe(true);
    expect(report.derivativeRelationshipEvidenceAdequateCount).toBe(6);
    expect(report.provenanceIndependenceAdjudicationReady).toBe(false);
  });

  test('classifies exactly three derivative rows as ineligible for independent provenance', () => {
    const report = buildI158ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipDiscoveryEvidenceAdequacyAdjudicationReadinessReview(
      validI157(),
    );

    expect(report.derivativeNotEligibleAsIndependentCount).toBe(3);
    expect(
      report.evidenceAdequacyRecords.filter(
        (record) =>
          record.independenceAdjudicationEligibilityState ===
          'DERIVATIVE_NOT_ELIGIBLE_AS_INDEPENDENT_PROVENANCE',
      ),
    ).toHaveLength(3);
    expect(report.evidenceAdequacyRecords.every((record) => !record.independentNormativeProvenanceEstablished)).toBe(true);
  });

  test('retains exactly Wei, Wu and Mingdeng as unresolved origin-gap targets', () => {
    const report = buildI158ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipDiscoveryEvidenceAdequacyAdjudicationReadinessReview(
      validI157(),
    );

    expect(report.unresolvedOriginCount).toBe(3);
    expect(report.remainingOriginGapTargetCount).toBe(3);
    expect(report.remainingOriginGapEvidenceIds).toEqual([
      'evidence_wei_qianli_far_position_cannot_ke',
      'evidence_wu_huaiyun_taxonomy_remote_and_operational_examples',
      'evidence_mingdeng_generic_youli_wuli_criteria',
    ]);
    expect(report.remainingOriginGapTargetedDiscoveryReady).toBe(true);
  });

  test('accepts the Sina-to-Wu dependency and forbids counting it as independent authority', () => {
    const report = buildI158ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipDiscoveryEvidenceAdequacyAdjudicationReadinessReview(
      validI157(),
    );

    expect(report.selectedSetCrossCandidateDependencyCountAccepted).toBe(1);
    expect(report.selectedSetCrossCandidateDependencyEvidenceId).toBe(
      'evidence_yimeng_wuli_yaoke_example',
    );
    expect(report.selectedSetCrossCandidateDependencyTargetEvidenceId).toBe(
      'evidence_wu_huaiyun_taxonomy_remote_and_operational_examples',
    );
    expect(report.crossCandidateDependentEvidenceMayCountAsIndependentAuthority).toBe(false);
  });

  test('does not transform lineage, same-work normalization, unresolved origin or search silence into independence proof', () => {
    const report = buildI158ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipDiscoveryEvidenceAdequacyAdjudicationReadinessReview(
      validI157(),
    );

    expect(report.externalEditorialLineageMayCountAsIndependenceProof).toBe(false);
    expect(report.priorSameAuthorRevisionMayCountAsIndependenceProof).toBe(false);
    expect(report.sameWorkWitnessNormalizationMayCountAsIndependenceProof).toBe(false);
    expect(report.unresolvedOriginMayCountAsIndependenceProof).toBe(false);
    expect(report.searchSilenceMayCountAsExplicitNegativeDerivativeFinding).toBe(false);
    expect(report.chronologyAloneMayEstablishIndependence).toBe(false);
    expect(report.uniqueSourceIdentityMayEstablishIndependence).toBe(false);
    expect(report.explicitNegativeDerivativeFindingCount).toBe(0);
    expect(report.positivelyIndependentProvenanceEstablishedCount).toBe(0);
  });

  test('keeps the I132 provenance requirement unsatisfied and the evaluation step fail-closed', () => {
    const report = buildI158ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipDiscoveryEvidenceAdequacyAdjudicationReadinessReview(
      validI157(),
    );

    expect(report.I132IndependentNormativeProvenanceRequirementSatisfied).toBe(false);
    expect(report.provenanceIndependenceCheckMayPassFromCurrentEvidence).toBe(false);
    expect(report.provenanceIndependenceAdjudicationReady).toBe(false);
    expect(report.sourceCountVotingAllowed).toBe(false);
    expect(report.provenanceTierWeightingAllowed).toBe(false);
  });

  test('fails closed if I157 invents one explicit negative derivative finding', () => {
    const i157 = validI157();
    const alteredRecords = i157.discoveryEvidenceRecords.map((record, index) =>
      index === 1
        ? {
            ...record,
            relationshipFindingState: 'NO_DERIVATIVE_DEPENDENCY_FOUND_WITH_EXPLICIT_BASIS',
            explicitNegativeSearchBasisEstablished: true,
          }
        : record,
    );
    const report = buildI158ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipDiscoveryEvidenceAdequacyAdjudicationReadinessReview(
      validI157({ discoveryEvidenceRecords: alteredRecords }),
    );

    expect(report.status).toBe('I157_DISCOVERY_EVIDENCE_INVALID');
    expect(report.exactI157EvidenceAccepted).toBe(false);
    expect(report.remainingOriginGapTargetedDiscoveryReady).toBe(false);
  });

  test('preserves all package, reevaluation and production authority ceilings', () => {
    const report = buildI158ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipDiscoveryEvidenceAdequacyAdjudicationReadinessReview(
      validI157(),
    );

    expect(report.derivativeEvidenceAcceptedWithoutPackageMutation).toBe(true);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.provenanceIndependenceEstablishedByThisGate).toBe(false);
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMAINING_ORIGIN_GAP_TARGETED_DISCOVERY_READINESS_REVIEW',
    );
  });
});
