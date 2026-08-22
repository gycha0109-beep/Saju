import { describe, expect, test } from 'vitest';
import {
  I156_DISCOVERY_REQUIREMENT_IDS,
  buildI157ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipAuthorityDiscoveryEvidence,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipAuthorityDiscoveryReadinessReviewReport,
} from '../src/index.js';

const targets = [
  ['evidence_chen_yuan_position_distance_wuli', 'source_chenyuan_sizhu_yuce_rumen_1995_isbn9787805922515', []],
  [
    'evidence_wei_qianli_far_position_cannot_ke',
    'source_wei_qianli_qianli_minggao_nlc_1935_scan',
    ['witness_wei_qianli_webpdf_reproduction', 'witness_wei_qianli_ctext_ganke_zhubie'],
  ],
  ['evidence_zhu_zuxia_remote_ke_conditions', 'source_zhu_zuxia_bazi_yu_yongshen_wuxing_xiangke_web_reproduction', []],
  ['evidence_yimeng_wuli_yaoke_example', 'source_yimeng_tiangan_ke_theory_2026_sina_kandian', []],
  [
    'evidence_wu_huaiyun_taxonomy_remote_and_operational_examples',
    'source_wu_huaiyun_yinyang_wuxing_bazi_yucexue_chuji_scribd_733612933',
    [],
  ],
  ['evidence_mingdeng_generic_youli_wuli_criteria', 'source_mingdeng_tiangan_youli_wuli_criteria_2022', []],
] as const;

function validI156(
  overrides: Record<string, unknown> = {},
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipAuthorityDiscoveryReadinessReviewReport {
  const discoveryTargetRecords = targets.map(([evidenceId, provenanceIdentity, registeredDependencyLinks]) => ({
    evidenceId,
    provenanceIdentity,
    registeredDependencyLinks,
    discoveryState: 'TARGETED_DISCOVERY_NOT_EXECUTED',
    requiredDiscoveryRequirementIds: I156_DISCOVERY_REQUIREMENT_IDS,
    relationshipFindingState: 'NOT_RESEARCHED',
    independenceFindingState: 'NOT_AUTHORIZED',
    positiveRelationshipFindingWouldMeanDerivativeDependency: true,
    negativeRelationshipFindingRequiresExplicitEvidence: true,
    unresolvedRelationshipMustRemainUnresolved: true,
    absenceOfKnownDependencySufficientForNegativeFinding: false,
    sourceCountMayResolveRelationship: false,
    provenanceTierMayResolveRelationship: false,
  }));

  const base = {
    reviewId: 'i156_i157_fixture',
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_DERIVATIVE_RELATIONSHIP_AUTHORITY_DISCOVERY_READINESS_REVIEW',
    decision:
      'SIX_PROVENANCE_INPUTS_READY_FOR_TARGETED_DERIVATIVE_RELATIONSHIP_AUTHORITY_DISCOVERY_NO_INDEPENDENCE_FINDING_NO_PACKAGE_MUTATION',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    adoptionId: 'adoption_fixture',
    candidateSetVersion: 'v1-candidate-set',
    candidateSetId: 'candidate_set_fixture',
    inputPackageVersion: 'v2-input-package',
    inputPackageId: 'input_package_v2_fixture',
    exactI155ReadinessAccepted: true,
    discoveryRequirementIds: I156_DISCOVERY_REQUIREMENT_IDS,
    discoveryRequirementCount: 8,
    discoveryTargetRecords,
    discoveryTargetCount: 6,
    knownRegisteredDependencyLinkCount: 2,
    targetsWithKnownRegisteredDependencyLinks: 1,
    allTargetsBoundToExactEvidenceAndProvenanceIdentity: true,
    allTargetsRemainConclusionNeutralBeforeDiscovery: true,
    sourceChronologyCheckRequired: true,
    attributionAndRetransmissionCheckRequired: true,
    sameWorkEditionWitnessNormalizationRequired: true,
    directSourceLineageEvidenceCheckRequired: true,
    triStateRelationshipFindingRequired: true,
    allowedRelationshipFindingStates: [
      'DERIVATIVE_DEPENDENCY_FOUND',
      'NO_DERIVATIVE_DEPENDENCY_FOUND_WITH_EXPLICIT_BASIS',
      'UNRESOLVED_AFTER_TARGETED_DISCOVERY',
    ],
    negativeRelationshipFindingRequiresExplicitSearchBasis: true,
    absenceOfKnownDependencyMayBecomeNegativeFinding: false,
    emptyRegisteredDependencyLinksMayBecomeIndependenceFinding: false,
    uniqueProvenanceIdentityMayBecomeIndependenceFinding: false,
    sourceCountVotingAllowed: false,
    provenanceTierWeightingAllowed: false,
    discoveryExecutedByThisGate: false,
    derivativeRelationshipFindingMadeByThisGate: false,
    provenanceIndependenceFindingAuthorizedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_DERIVATIVE_RELATIONSHIP_AUTHORITY_DISCOVERY_EVIDENCE',
  };

  return { ...base, ...overrides } as unknown as ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipAuthorityDiscoveryReadinessReviewReport;
}

describe('I157 provenance derivative-relationship authority discovery evidence', () => {
  test('executes the exact six-target discovery plan and records six evidence rows', () => {
    const report = buildI157ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipAuthorityDiscoveryEvidence(
      validI156(),
    );

    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_DERIVATIVE_RELATIONSHIP_AUTHORITY_DISCOVERY_EVIDENCE',
    );
    expect(report.discoveryEvidenceRecordCount).toBe(6);
    expect(report.discoveryEvidenceRecords).toHaveLength(6);
    expect(report.discoveryExecutedByThisGate).toBe(true);
    expect(report.derivativeRelationshipFindingsMadeByThisGate).toBe(true);
  });

  test('records exactly three positive derivative relationships and leaves three origins unresolved', () => {
    const report = buildI157ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipAuthorityDiscoveryEvidence(
      validI156(),
    );

    expect(report.derivativeDependencyFoundCount).toBe(3);
    expect(report.explicitNegativeRelationshipFoundCount).toBe(0);
    expect(report.unresolvedAfterDiscoveryCount).toBe(3);
    expect(
      report.discoveryEvidenceRecords.filter(
        (record) => record.relationshipFindingState === 'DERIVATIVE_DEPENDENCY_FOUND',
      ),
    ).toHaveLength(3);
    expect(
      report.discoveryEvidenceRecords.filter(
        (record) => record.relationshipFindingState === 'UNRESOLVED_AFTER_TARGETED_DISCOVERY',
      ),
    ).toHaveLength(3);
  });

  test('identifies the later Sina evidence as a cross-candidate retransmission of the Wu Hua Yun passage', () => {
    const report = buildI157ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipAuthorityDiscoveryEvidence(
      validI156(),
    );
    const yimeng = report.discoveryEvidenceRecords.find(
      (record) => record.evidenceId === 'evidence_yimeng_wuli_yaoke_example',
    );

    expect(report.crossCandidateDependencyFoundCount).toBe(1);
    expect(report.exactCrossCandidateDependencyEvidenceId).toBe('evidence_yimeng_wuli_yaoke_example');
    expect(report.exactCrossCandidateDependencyTargetEvidenceId).toBe(
      'evidence_wu_huaiyun_taxonomy_remote_and_operational_examples',
    );
    expect(report.yimengToWuCrossCandidateTextualRetransmissionFound).toBe(true);
    expect(yimeng?.relationshipClass).toBe('CROSS_CANDIDATE_TEXTUAL_RETRANSMISSION');
    expect(yimeng?.crossCandidateDependencyFound).toBe(true);
  });

  test('separates external editorial/revision lineage from cross-candidate dependency', () => {
    const report = buildI157ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipAuthorityDiscoveryEvidence(
      validI156(),
    );
    const chen = report.discoveryEvidenceRecords.find(
      (record) => record.evidenceId === 'evidence_chen_yuan_position_distance_wuli',
    );
    const zhu = report.discoveryEvidenceRecords.find(
      (record) => record.evidenceId === 'evidence_zhu_zuxia_remote_ke_conditions',
    );

    expect(report.chenEditorialOrLectureLineageFound).toBe(true);
    expect(report.zhuPriorSameAuthorRevisionLineageFound).toBe(true);
    expect(chen?.crossCandidateDependencyFound).toBe(false);
    expect(zhu?.crossCandidateDependencyFound).toBe(false);
    expect(chen?.relationshipClass).toBe('EDITORIAL_OR_LECTURE_LINEAGE');
    expect(zhu?.relationshipClass).toBe('PRIOR_SAME_AUTHOR_WORK_REVISION_LINEAGE');
  });

  test('normalizes Wei same-work retransmissions without inventing a normative-origin conclusion', () => {
    const report = buildI157ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipAuthorityDiscoveryEvidence(
      validI156(),
    );
    const wei = report.discoveryEvidenceRecords.find(
      (record) => record.evidenceId === 'evidence_wei_qianli_far_position_cannot_ke',
    );

    expect(report.weiSameWorkWitnessRetransmissionConfirmedButNormativeOriginStillUnresolved).toBe(true);
    expect(wei?.relationshipFindingState).toBe('UNRESOLVED_AFTER_TARGETED_DISCOVERY');
    expect(wei?.relationshipClass).toBe('SAME_WORK_WITNESS_RETRANSMISSION_ONLY');
    expect(wei?.registeredDependencyLinks).toHaveLength(2);
    expect(wei?.independenceEstablishedByThisRecord).toBe(false);
  });

  test('does not convert search silence for Wu or Mingdeng into a negative or independent finding', () => {
    const report = buildI157ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipAuthorityDiscoveryEvidence(
      validI156(),
    );

    expect(report.wuNormativeOriginStillUnresolved).toBe(true);
    expect(report.mingdengNormativeOriginStillUnresolved).toBe(true);
    expect(report.noNegativeFindingCreatedFromSearchSilence).toBe(true);
    expect(report.noChronologyOnlyIndependenceInference).toBe(true);
    expect(report.allIndependenceFindingsRemainUnestablished).toBe(true);
    expect(report.discoveryEvidenceRecords.every((record) => !record.explicitNegativeSearchBasisEstablished)).toBe(true);
    expect(report.discoveryEvidenceRecords.every((record) => !record.independenceEstablishedByThisRecord)).toBe(true);
  });

  test('fails closed if I156 target identity is altered before discovery execution', () => {
    const i156 = validI156();
    const alteredTargets = i156.discoveryTargetRecords.map((target, index) =>
      index === 0 ? { ...target, evidenceId: 'mutated-evidence-id' } : target,
    );
    const report = buildI157ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipAuthorityDiscoveryEvidence(
      validI156({ discoveryTargetRecords: alteredTargets }),
    );

    expect(report.status).toBe('I156_DISCOVERY_READINESS_INVALID');
    expect(report.discoveryExecutedByThisGate).toBe(false);
    expect(report.discoveryEvidenceRecords).toEqual([]);
  });

  test('preserves all authority ceilings and routes only to evidence adequacy/adjudication readiness review', () => {
    const report = buildI157ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipAuthorityDiscoveryEvidence(
      validI156(),
    );

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
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_DERIVATIVE_RELATIONSHIP_DISCOVERY_EVIDENCE_ADEQUACY_AND_ADJUDICATION_READINESS_REVIEW',
    );
  });
});
