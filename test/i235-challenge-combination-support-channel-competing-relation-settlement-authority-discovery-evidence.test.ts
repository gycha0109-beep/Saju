import { describe, expect, it } from 'vitest';
import { buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview } from '../src/research/i233-challenge-combination-support-channel-competing-relation-settlement-authority-gap-requirements-review.js';
import { buildI234ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryReadinessReview } from '../src/research/i234-challenge-combination-support-channel-competing-relation-settlement-authority-discovery-readiness-review.js';
import {
  I235_DIRECT_COVERAGE_GAP_REQUIREMENT_IDS,
  I235_DISCOVERY_CANDIDATE_IDS,
  buildI235ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryEvidence,
} from '../src/research/i235-challenge-combination-support-channel-competing-relation-settlement-authority-discovery-evidence.js';

const validI234 = () =>
  buildI234ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryReadinessReview(
    buildI233ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityGapRequirementsReview(),
  );

describe('I235 competing-relation settlement authority discovery evidence', () => {
  it('accepts the exact I234 boundary and executes all five discovery paths', () => {
    const report = buildI235ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryEvidence(validI234());
    expect(report.status).toBe('RESOLVED_COMPETING_RELATION_SETTLEMENT_AUTHORITY_DISCOVERY_EVIDENCE');
    expect(report.decision).toBe(
      'FIVE_DISCOVERY_PATHS_EXECUTED_THREE_DIRECT_SOURCE_BOUND_CANDIDATES_OBSERVED_MULTI_RELATION_AND_COMPETING_COMBINATION_RULE_TEXT_FOUND_NO_SINGLE_CANDIDATE_SATISFIES_ALL_EIGHT_REQUIREMENTS_THREE_REQUIREMENTS_LACK_ANY_DIRECT_CANDIDATE_COVERAGE_NO_PRECEDENCE_SETTLEMENT_OR_NET_EFFECT_PROMOTION',
    );
    expect(report.exactI234BoundaryAccepted).toBe(true);
    expect(report.discoveryExecuted).toBe(true);
    expect(report.executedDiscoveryPathCount).toBe(5);
    expect(report.I234ControlCountAccepted).toBe(17);
    expect(report.authorityGap).toBe('COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED');
    expect(report.authorityGapClosed).toBe(false);
  });

  it('records exactly three direct source-bound candidates and no full-eight candidate', () => {
    const report = buildI235ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryEvidence(validI234());
    expect(report.candidateRecords.map((record) => record.candidateId)).toEqual(I235_DISCOVERY_CANDIDATE_IDS);
    expect(report.candidateRecordCount).toBe(3);
    expect(report.qualifyingDirectSourceBoundCandidateCount).toBe(3);
    expect(report.candidateRecords.every((record) => record.sourceBoundDirectTextObserved)).toBe(true);
    expect(report.candidateRecords.every((record) => record.ruleLevelLanguageObserved)).toBe(true);
    expect(report.candidateRecords.every((record) => record.fullEightRequirementCoverage === false)).toBe(true);
    expect(report.fullEightRequirementCandidateCount).toBe(0);
    expect(report.anySingleCandidateFullEightRequirementCoverage).toBe(false);
  });

  it('records the Shen Xiaozhan original chapter-seven candidate with five direct requirements and two partials', () => {
    const report = buildI235ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryEvidence(validI234());
    const candidate = report.candidateRecords[0];
    expect(candidate?.candidateId).toBe('SHEN_XIAOZHAN_ZIPING_ZHENQUAN_ORIGINAL_CH7_ZHANGYUE_HTML');
    expect(candidate?.sourceAuthorOrCommentator).toBe('沈孝瞻');
    expect(candidate?.workTitle).toBe('子平真诠（原本）');
    expect(candidate?.chapterOrSection).toBe('七、论刑冲会合解法');
    expect(candidate?.locator).toBe('https://s.zhangyue.com/read?bid=13096776&cid=8');
    expect(candidate?.originalTextLayerObserved).toBe(true);
    expect(candidate?.commentaryLayerObserved).toBe(false);
    expect(candidate?.directRequirementCount).toBe(5);
    expect(candidate?.partialRequirementCount).toBe(2);
    expect(candidate?.directRuleAnchorIds).toEqual([
      'ORIGINAL_CH7_COMBINATION_CAN_RESOLVE_CLASH',
      'ORIGINAL_CH7_RESOLUTION_CAN_REINTRODUCE_CLASH',
      'ORIGINAL_CH7_COMBINATION_MAY_FAIL_TO_RESOLVE_CLASH',
      'ORIGINAL_CH7_ONE_CLASH_MAY_RESOLVE_ANOTHER_RELATION',
    ]);
    expect(candidate?.requirementCoverage.map((item) => item.coverage)).toEqual([
      'DIRECT',
      'DIRECT',
      'PARTIAL',
      'DIRECT',
      'PARTIAL',
      'DIRECT',
      'NOT_ESTABLISHED',
      'DIRECT',
    ]);
  });

  it('records Xu Lewu commentary as source-bound context evidence without independent-authority adjudication', () => {
    const report = buildI235ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryEvidence(validI234());
    const candidate = report.candidateRecords[1];
    expect(candidate?.candidateId).toBe('XU_LEWU_ZIPING_ZHENQUAN_PINGZHU_CH7_IWZBZ_HTML');
    expect(candidate?.locator).toBe('https://www.iwzbz.com/artical/h5book/v5/3_1_2_9.html');
    expect(candidate?.commentaryLayerObserved).toBe(true);
    expect(candidate?.derivativeOrSameWorkRelationshipKnown).toBe(true);
    expect(candidate?.derivativeRelationshipAdjudicatedAsIndependentAuthority).toBe(false);
    expect(candidate?.directRequirementCount).toBe(5);
    expect(candidate?.partialRequirementCount).toBe(2);
    expect(candidate?.directRuleAnchorIds).toEqual([
      'XU_NOTE_COMBINATION_AND_CLASH_CAN_MUTUALLY_RESOLVE',
      'XU_NOTE_DEPENDS_ON_POSITION_AND_NATURE',
      'XU_NOTE_NO_SINGLE_FIXED_METHOD',
      'XU_NOTE_SAME_POSITION_DIFFERENT_NATURE_DIFFERENT_RESOLUTION',
    ]);
    expect(report.xuCommentaryPositionAndNatureConditionalityObserved).toBe(true);
    expect(report.xuCommentaryNoFixedUniversalMethodLanguageObserved).toBe(true);
  });

  it('records chapter-five competing-combination semantics and the positional separation exception', () => {
    const report = buildI235ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryEvidence(validI234());
    const candidate = report.candidateRecords[2];
    expect(candidate?.candidateId).toBe('SHEN_XIAOZHAN_ZIPING_ZHENQUAN_CH5_COMPETING_COMBINATION_IWZBZ_HTML');
    expect(candidate?.chapterOrSection).toBe('论十干合而不合');
    expect(candidate?.locator).toBe('https://www.iwzbz.com/artical/h5book/v5/3_1_2_7.html');
    expect(candidate?.directRequirementCount).toBe(5);
    expect(candidate?.partialRequirementCount).toBe(3);
    expect(candidate?.directRuleAnchorIds).toEqual([
      'CH5_TWO_COMBINATIONS_COMPETE_FOR_ONE_PARTICIPANT',
      'CH5_COMPETING_COMBINATIONS_RETAIN_NONEXCLUSIVE_COMBINATION_INTENT',
      'CH5_SEPARATED_POSITION_REMOVES_COMPETITION',
      'CH5_POSITION_REQUIRED_TO_IDENTIFY_COMPETING_COMBINATION',
    ]);
    expect(candidate?.requirementCoverage.map((item) => item.coverage)).toEqual([
      'DIRECT',
      'DIRECT',
      'PARTIAL',
      'DIRECT',
      'PARTIAL',
      'DIRECT',
      'PARTIAL',
      'DIRECT',
    ]);
    expect(report.chapterFiveCompetingCombinationTwoToOneLanguageObserved).toBe(true);
    expect(report.chapterFivePositionSeparationExceptionObserved).toBe(true);
  });

  it('keeps requirements three, five, and seven as direct-coverage gaps and forbids union coverage', () => {
    const report = buildI235ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryEvidence(validI234());
    expect(report.directCoverageGapRequirementIds).toEqual(I235_DIRECT_COVERAGE_GAP_REQUIREMENT_IDS);
    expect(report.directCoverageGapRequirementCount).toBe(3);
    expect(report.directCoverageEstablishedForFiveOfEightRequirements).toBe(true);
    expect(report.explicitSystemCurrentVsCompetingRoleMappingEstablished).toBe(false);
    expect(report.precedenceVsRelationOutcomeSeparationEstablished).toBe(false);
    expect(report.tieConflictOrUnresolvedFailClosedDispositionEstablished).toBe(false);
    expect(report.candidateSetUnionMayBeTreatedAsSingleAuthority).toBe(false);
    expect(report.crossSourceCompositionAuthorizedByThisGate).toBe(false);
    expect(report.semanticBridgeInferenceAuthorizedByThisGate).toBe(false);
  });

  it('preserves all authority, provenance, hidden-stem HOLD, v2, and downstream effect guards', () => {
    const report = buildI235ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryEvidence(validI234());
    expect(report.derivativeRelationshipAdjudicatedByThisGate).toBe(false);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.sourceNormativeAdmissibilityAdjudicatedByThisGate).toBe(false);
    expect(report.candidateRegistrationAuthorizedByThisGate).toBe(false);
    expect(report.candidateSelectedByThisGate).toBe(false);
    expect(report.competingRelationSettlementResolved).toBe(false);
    expect(report.crossRelationPrecedenceAuthorized).toBe(false);
    expect(report.multiTouchAggregationAuthorized).toBe(false);
    expect(report.supportChannelActivationVerdictAuthorized).toBe(false);
    expect(report.supportChannelPersistenceVerdictAuthorized).toBe(false);
    expect(report.supportChannelDestructionVerdictAuthorized).toBe(false);
    expect(report.supportChannelNetEffectVerdictAuthorized).toBe(false);
    expect(report.targetPostRelationRootState).toBe('not_determined');
    expect(report.effectiveMechanismForceVerdict).toBe('not_determined');
    expect(report.hiddenStemI232HoldPreserved).toBe(true);
    expect(report.hiddenStemTrackReopenedByThisGate).toBe(false);
    expect(report.hiddenStemAuthorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
    expect(report.quWei2001HoldPreserved).toBe(true);
    expect(report.li1998SameTargetPathSuspendedNotRetired).toBe(true);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(report.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(report.currentV2ProvenanceDisposition).toBe('BLOCKED_UNDER_CURRENT_EVIDENCE');
    expect(report.candidateSetMutatedByThisGate).toBe(false);
    expect(report.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.damageEvaluationAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
  });

  it('fails closed when the I234 discovery-readiness boundary is mutated', () => {
    const invalid = { ...validI234(), discoveryControlCount: 0 } as unknown as ReturnType<typeof validI234>;
    const report = buildI235ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryEvidence(invalid);
    expect(report.status).toBe('I234_DISCOVERY_READINESS_BOUNDARY_INVALID');
    expect(report.decision).toBe('COMPETING_RELATION_SETTLEMENT_AUTHORITY_DISCOVERY_NOT_EXECUTED');
    expect(report.exactI234BoundaryAccepted).toBe(false);
    expect(report.discoveryExecuted).toBe(false);
    expect(report.executedDiscoveryPathCount).toBe(0);
    expect(report.candidateRecordCount).toBe(0);
    expect(report.qualifyingDirectSourceBoundCandidateCount).toBe(0);
    expect(report.directCoverageGapRequirementCount).toBe(0);
    expect(report.authorityGap).toBe('UPSTREAM_INVALID');
    expect(report.recommendedNextGate).toBe('COMPETING_RELATION_SETTLEMENT_AUTHORITY_DISCOVERY_EVIDENCE');
  });
});
