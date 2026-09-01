import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import { CAREER_T8_B63_SCOPE_CONTROL_IDS } from '../src/research/career-personalization-t8-classical-ziping-negative-clash-method-scope-authority-review.js';
import { CAREER_T8_B64_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT } from '../src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-contract.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_OPERATIONAL_CLASH_EFFECTIVENESS_REOPEN_SIGNAL_ADJUDICATION_VERSION,
  CAREER_T8_B78_CANDIDATE_INPUT_DIMENSION,
  CAREER_T8_B78_CANDIDATE_NEGATIVE_CONSTRAINT_ID,
  CAREER_T8_B78_OPERATIONAL_CLASH_EFFECTIVENESS_EVIDENCE_RECORDS,
  CAREER_T8_B78_REOPEN_SIGNAL_CONTROL_IDS,
  CAREER_T8_B78_REVIEWED_REPOSITORY_COMMIT_SHA,
  type CareerPersonalizationT8ClassicalZipingOperationalClashEffectivenessReopenSignalAdjudicationReport,
} from '../src/research/career-personalization-t8-classical-ziping-operational-clash-effectiveness-reopen-signal-adjudication.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_OPERATIONAL_CLASH_WITNESS_CRITICALITY_GOVERNANCE_VERSION,
  CAREER_T8_B79_CRITICALITY_GOVERNANCE_CONTROL_IDS,
  CAREER_T8_B79_PRODUCT_CRITICAL_REACTIVATION_CONDITION_IDS,
  CAREER_T8_B79_PRODUCT_CRITICALITY_QUESTION,
  CAREER_T8_B79_RESEARCH_BACKLOG_IDS,
  CAREER_T8_B79_REVIEWED_REPOSITORY_COMMIT_SHA,
  buildCareerPersonalizationT8ClassicalZipingOperationalClashWitnessCriticalityGovernance,
} from '../src/research/career-personalization-t8-classical-ziping-operational-clash-witness-criticality-governance.js';

function acceptedB78(): CareerPersonalizationT8ClassicalZipingOperationalClashEffectivenessReopenSignalAdjudicationReport {
  const material: Omit<
    CareerPersonalizationT8ClassicalZipingOperationalClashEffectivenessReopenSignalAdjudicationReport,
    'adjudicationId'
  > = {
    adjudicationVersion:
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_OPERATIONAL_CLASH_EFFECTIVENESS_REOPEN_SIGNAL_ADJUDICATION_VERSION,
    status: 'RESOLVED_CLASSICAL_ZIPING_OPERATIONAL_CLASH_EFFECTIVENESS_REOPEN_SIGNAL_ADJUDICATION',
    decision:
      'MATERIAL_NEW_CLASSICAL_SCOPE_SIGNAL_OBSERVED_B77_AUTHORITY_REOPEN_CONDITION_NOT_YET_SATISFIED_TARGET_WITNESS_BINDING_REQUIRED',
    upstreamB77CloseoutId: 'b77_fixture_for_b79',
    exactB77BoundaryAccepted: true,
    reviewedRepository: 'gycha0109-beep/Saju',
    reviewedRepositoryCommitSha: CAREER_T8_B78_REVIEWED_REPOSITORY_COMMIT_SHA,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    candidateInputDimension: CAREER_T8_B78_CANDIDATE_INPUT_DIMENSION,
    candidateNegativeConstraintId: CAREER_T8_B78_CANDIDATE_NEGATIVE_CONSTRAINT_ID,
    evidenceRecords: CAREER_T8_B78_OPERATIONAL_CLASH_EFFECTIVENESS_EVIDENCE_RECORDS,
    evidenceRecordCount: 3,
    independentNewClassicalWorkSignalCount: 1,
    sameWorkNewSurfaceCorroborationCount: 1,
    secondaryCorroborationCount: 1,
    exactTargetHistoricalWitnessBindingCount: 0,
    materialScopeChangeSignalObserved: true,
    b77NewClassicalAuthorityScopeChangeReopenConditionSatisfied: false,
    boundedNegativeMethodScopeAmendmentAuthorized: false,
    existingFiveConstraintGuardMutationAuthorized: false,
    sixthConstraintAuthoringAuthorized: false,
    universalCombinationCancelsClashRuleAuthorized: false,
    universalInteractionPrecedenceRuleAuthorized: false,
    immediatelyExecutableTargetWitnessBindingLaneCount: 1,
    immediatelyExecutableScopeAuthorityAmendmentLaneCount: 0,
    immediatelyExecutableSemanticRuleLaneCount: 0,
    selectedImmediateNextLane:
      'BRANCH_CLASSICAL_ZIPING_OPERATIONAL_CLASH_EFFECTIVENESS_TARGET_WITNESS_BINDING',
    positiveT6InputContractEstablished: false,
    positiveClashEffectContractEstablished: false,
    branchSourceOrMethodTriggerActivationCount: 0,
    currentCareerSemanticBridgeEstablished: false,
    visualCorroborationHoldPreserved: true,
    b56ChenZezhenHoldPreserved: true,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: CAREER_T8_B78_REOPEN_SIGNAL_CONTROL_IDS,
    controlCount: 18,
    controlsFrozen: true,
    implementationEffects: Object.freeze({
      reopenSignalAdjudicationsCreated: 1,
      evidenceRecordsCreated: 3,
      guardConstraintsChanged: 0,
      guardProposalFieldsChanged: 0,
      publicExportsChanged: 0,
      packageScriptsChanged: 0,
      persistenceBehaviorsCreated: 0,
      coreRegistryBehaviorsChanged: 0,
      productionBehaviorsChanged: 0,
    }),
    recommendedNextGate:
      'BRANCH_CLASSICAL_ZIPING_OPERATIONAL_CLASH_EFFECTIVENESS_TARGET_WITNESS_BINDING',
  };

  return {
    adjudicationId: `career_personalization_t8_classical_ziping_operational_clash_effectiveness_reopen_signal_adjudication_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

describe('Career T8 B79 operational clash witness criticality governance', () => {
  test('releases exact historical witness completeness from the current product blocker while retaining the evidence', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingOperationalClashWitnessCriticalityGovernance(acceptedB78());

    expect(report.governanceVersion).toBe(
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_OPERATIONAL_CLASH_WITNESS_CRITICALITY_GOVERNANCE_VERSION,
    );
    expect(report.status).toBe('RESOLVED_OPERATIONAL_CLASH_WITNESS_PRODUCT_CRITICALITY_GOVERNANCE');
    expect(report.decision).toBe(
      'EXACT_WITNESS_COMPLETENESS_RETAINED_AS_OPEN_RESEARCH_BACKLOG_CURRENT_PRODUCT_BLOCKER_RELEASED_NO_POSITIVE_CLASH_EFFECT_AUTHORITY',
    );
    expect(report.reviewedRepositoryCommitSha).toBe(CAREER_T8_B79_REVIEWED_REPOSITORY_COMMIT_SHA);
    expect(report.productCriticalityQuestion).toBe(CAREER_T8_B79_PRODUCT_CRITICALITY_QUESTION);
    expect(report.productCriticalityQuestionApplied).toBe(true);
    expect(report.b78ClassicalSignalRetained).toBe(true);
    expect(report.b78EvidenceDiscarded).toBe(false);
    expect(report.exactHistoricalWitnessResearchOpen).toBe(true);
    expect(report.exactHistoricalWitnessProductBlockerReleased).toBe(true);
    expect(report.exactHistoricalWitnessCurrentlyChangesAuthorizedEngineDecision).toBe(false);
  });

  test('keeps B63/B64 fail-closed authority product-critical and rejects positive effect semantics', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingOperationalClashWitnessCriticalityGovernance(acceptedB78());

    expect(CAREER_T8_B63_SCOPE_CONTROL_IDS).toContain(
      'CLASH_PRESENCE_ALONE_MAY_NOT_BE_USED_AS_A_COMPLETE_SEMANTIC_EFFECT_RESOLVER',
    );
    expect(CAREER_T8_B64_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT.authorizedConstraintIds).toHaveLength(5);
    expect(report.b77ReopenAuthorized).toBe(false);
    expect(report.b63NegativeGuardRetained).toBe(true);
    expect(report.b63NegativeGuardProductCritical).toBe(true);
    expect(report.b64AuthorizedConstraintCount).toBe(5);
    expect(report.b64GuardMutationAuthorized).toBe(false);
    expect(report.sixthConstraintAuthoringAuthorized).toBe(false);
    expect(report.positiveOperationalClashEffectRuleAuthorized).toBe(false);
    expect(report.combinationWeakeningRuleAuthorized).toBe(false);
    expect(report.neutralizationOrNoEffectRuleAuthorized).toBe(false);
    expect(report.universalInteractionPrecedenceRuleAuthorized).toBe(false);
    expect(report.numericClashEffectWeightAuthorized).toBe(false);
  });

  test('records bibliographic completeness as backlog with explicit product-critical reactivation conditions', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingOperationalClashWitnessCriticalityGovernance(acceptedB78());

    expect(report.researchBacklogIds).toEqual(CAREER_T8_B79_RESEARCH_BACKLOG_IDS);
    expect(report.researchBacklogCount).toBe(6);
    expect(report.productCriticalReactivationConditionIds).toEqual(
      CAREER_T8_B79_PRODUCT_CRITICAL_REACTIVATION_CONDITION_IDS,
    );
    expect(report.productCriticalReactivationConditionCount).toBe(5);
    expect(report.productCriticalReactivationConditionCurrentlySatisfiedCount).toBe(0);
    expect(report.selectedImmediateProductLane).toBe(
      'CAREER_PERSONALIZATION_T8_PRODUCT_CRITICAL_AUTHORITY_GAP_PRIORITIZATION',
    );
    expect(report.recommendedNextGate).toBe(
      'CAREER_PERSONALIZATION_T8_PRODUCT_CRITICAL_AUTHORITY_GAP_PRIORITIZATION',
    );
  });

  test('does not mutate calculation, interpretation, narrative, preview, registry, persistence, or production behavior', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingOperationalClashWitnessCriticalityGovernance(acceptedB78());

    expect(report.calculationLogicChangeAuthorized).toBe(false);
    expect(report.interpretationLogicChangeAuthorized).toBe(false);
    expect(report.productionOrNarrativeOperationalEffectConsumptionObserved).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.productionImpact).toBe('NONE');
    expect(report.controlIds).toEqual(CAREER_T8_B79_CRITICALITY_GOVERNANCE_CONTROL_IDS);
    expect(report.controlCount).toBe(18);
    expect(report.controlsFrozen).toBe(true);
    expect(report.implementationEffects).toEqual({
      governanceRecordsCreated: 1,
      historicalEvidenceRecordsDeleted: 0,
      researchBacklogItemsRecorded: 6,
      guardConstraintsChanged: 0,
      guardProposalFieldsChanged: 0,
      calculationBehaviorsChanged: 0,
      interpretationBehaviorsChanged: 0,
      publicExportsChanged: 0,
      packageScriptsChanged: 0,
      persistenceBehaviorsCreated: 0,
      coreRegistryBehaviorsChanged: 0,
      narrativeBehaviorsChanged: 0,
      previewRoutesChanged: 0,
      productionBehaviorsChanged: 0,
    });
  });

  test('fails closed if the exact B78 content-addressed boundary is changed', () => {
    const b78 = acceptedB78();
    const tampered = {
      ...b78,
      materialScopeChangeSignalObserved: false,
    } as CareerPersonalizationT8ClassicalZipingOperationalClashEffectivenessReopenSignalAdjudicationReport;
    const report =
      buildCareerPersonalizationT8ClassicalZipingOperationalClashWitnessCriticalityGovernance(tampered);

    expect(report.status).toBe('UPSTREAM_B78_BOUNDARY_INVALID');
    expect(report.exactB78BoundaryAccepted).toBe(false);
    expect(report.productCriticalityQuestionApplied).toBe(false);
    expect(report.b78ClassicalSignalRetained).toBe(false);
    expect(report.exactHistoricalWitnessResearchOpen).toBe(false);
    expect(report.exactHistoricalWitnessProductBlockerReleased).toBe(false);
    expect(report.b63NegativeGuardRetained).toBe(false);
    expect(report.b64AuthorizedConstraintCount).toBe(0);
    expect(report.researchBacklogCount).toBe(0);
    expect(report.productCriticalReactivationConditionCount).toBe(0);
    expect(report.selectedImmediateProductLane).toBeNull();
    expect(report.recommendedNextGate).toBe(
      'BRANCH_CLASSICAL_ZIPING_OPERATIONAL_CLASH_EFFECTIVENESS_REOPEN_SIGNAL_ADJUDICATION',
    );
  });
});
