import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import { CAREER_T8_B64_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT } from '../src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-contract.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_AUTHORING_GOVERNANCE_CLOSEOUT_VERSION,
  CAREER_T8_B77_CLOSED_CAPABILITY_IDS,
  CAREER_T8_B77_CLOSEOUT_CONTROL_IDS,
  CAREER_T8_B77_REOPEN_CONDITION_IDS,
  CAREER_T8_B77_REVIEWED_REPOSITORY_COMMIT_SHA,
  type CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAuthoringGovernanceCloseoutReport,
} from '../src/research/career-personalization-t8-classical-ziping-negative-clash-method-guard-research-authoring-governance-closeout.js';
import {
  CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_OPERATIONAL_CLASH_EFFECTIVENESS_REOPEN_SIGNAL_ADJUDICATION_VERSION,
  CAREER_T8_B78_CANDIDATE_INPUT_DIMENSION,
  CAREER_T8_B78_CANDIDATE_NEGATIVE_CONSTRAINT_ID,
  CAREER_T8_B78_OPERATIONAL_CLASH_EFFECTIVENESS_EVIDENCE_RECORDS,
  CAREER_T8_B78_REOPEN_SIGNAL_CONTROL_IDS,
  CAREER_T8_B78_REVIEWED_REPOSITORY_COMMIT_SHA,
  buildCareerPersonalizationT8ClassicalZipingOperationalClashEffectivenessReopenSignalAdjudication,
} from '../src/research/career-personalization-t8-classical-ziping-operational-clash-effectiveness-reopen-signal-adjudication.js';

function acceptedB77(): CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAuthoringGovernanceCloseoutReport {
  const material: Omit<
    CareerPersonalizationT8ClassicalZipingNegativeClashMethodGuardResearchAuthoringGovernanceCloseoutReport,
    'closeoutId'
  > = {
    closeoutVersion:
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_AUTHORING_GOVERNANCE_CLOSEOUT_VERSION,
    status: 'CLOSED_CLASSICAL_ZIPING_NEGATIVE_CLASH_METHOD_GUARD_RESEARCH_AUTHORING_GOVERNANCE',
    decision:
      'NEGATIVE_CLASH_RESEARCH_AUTHORING_GOVERNANCE_CLOSED_INTERNAL_DIRECT_PATH_READY_NO_PUBLIC_CORE_PRODUCTION_PROMOTION',
    upstreamB76ReviewId: 'b76_fixture_for_b78',
    exactB76BoundaryAccepted: true,
    reviewedRepository: 'gycha0109-beep/Saju',
    reviewedRepositoryCommitSha: CAREER_T8_B77_REVIEWED_REPOSITORY_COMMIT_SHA,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    researchAuthoringGovernanceLaneClosed: true,
    closedCapabilityIds: CAREER_T8_B77_CLOSED_CAPABILITY_IDS,
    closedCapabilityCount: 6,
    reopenConditionIds: CAREER_T8_B77_REOPEN_CONDITION_IDS,
    reopenConditionCount: 3,
    boundedNegativeGuardAvailable: true,
    explicitApplicabilityAdmissionAvailable: true,
    auditableEnvelopeAndAdmissionRecordAvailable: true,
    standaloneThreeOutcomeWorkflowAvailable: true,
    internalAuthoringEntrypointAvailable: true,
    directPathInvocationSufficient: true,
    additionalInvocationSurfaceRequired: false,
    publicOrPackageAdoptionAuthorized: false,
    persistenceRegistrationPromotionAuthorized: false,
    coreRuleRegistryIntegrationAuthorized: false,
    productionEnforcementAuthorized: false,
    immediateContinuationLaneCount: 0,
    selectedImmediateNextLane: null,
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
    controlIds: CAREER_T8_B77_CLOSEOUT_CONTROL_IDS,
    controlCount: 16,
    controlsFrozen: true,
    implementationEffects: Object.freeze({
      closeoutRecordsCreated: 1,
      invocationSurfacesCreated: 0,
      publicExportsChanged: 0,
      packageScriptsChanged: 0,
      persistenceBehaviorsCreated: 0,
      coreRegistryBehaviorsChanged: 0,
      productionBehaviorsChanged: 0,
    }),
    recommendedNextGate: null,
  };

  return {
    closeoutId: `career_personalization_t8_classical_ziping_negative_clash_method_guard_research_authoring_governance_closeout_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

describe('Career T8 B78 operational clash effectiveness reopen signal adjudication', () => {
  test('accepts the exact B77 closeout and records a material scope-change signal only', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingOperationalClashEffectivenessReopenSignalAdjudication(acceptedB77());

    expect(report.adjudicationVersion).toBe(
      CAREER_PERSONALIZATION_T8_CLASSICAL_ZIPING_OPERATIONAL_CLASH_EFFECTIVENESS_REOPEN_SIGNAL_ADJUDICATION_VERSION,
    );
    expect(report.status).toBe('RESOLVED_CLASSICAL_ZIPING_OPERATIONAL_CLASH_EFFECTIVENESS_REOPEN_SIGNAL_ADJUDICATION');
    expect(report.decision).toBe(
      'MATERIAL_NEW_CLASSICAL_SCOPE_SIGNAL_OBSERVED_B77_AUTHORITY_REOPEN_CONDITION_NOT_YET_SATISFIED_TARGET_WITNESS_BINDING_REQUIRED',
    );
    expect(report.exactB77BoundaryAccepted).toBe(true);
    expect(report.reviewedRepositoryCommitSha).toBe(CAREER_T8_B78_REVIEWED_REPOSITORY_COMMIT_SHA);
    expect(report.materialScopeChangeSignalObserved).toBe(true);
    expect(report.b77NewClassicalAuthorityScopeChangeReopenConditionSatisfied).toBe(false);
  });

  test('classifies independent, same-work, and secondary evidence without upgrading any target witness', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingOperationalClashEffectivenessReopenSignalAdjudication(acceptedB77());

    expect(report.evidenceRecords).toEqual(CAREER_T8_B78_OPERATIONAL_CLASH_EFFECTIVENESS_EVIDENCE_RECORDS);
    expect(report.evidenceRecordCount).toBe(3);
    expect(report.independentNewClassicalWorkSignalCount).toBe(1);
    expect(report.sameWorkNewSurfaceCorroborationCount).toBe(1);
    expect(report.secondaryCorroborationCount).toBe(1);
    expect(report.exactTargetHistoricalWitnessBindingCount).toBe(0);
    expect(report.evidenceRecords.filter((record) => record.independentNewClassicalWorkSignal)).toHaveLength(1);
    expect(report.evidenceRecords.filter((record) => record.samePreviouslyCoveredWorkNewSurface)).toHaveLength(1);
    expect(report.evidenceRecords.filter((record) => record.secondaryOnly)).toHaveLength(1);
    expect(report.evidenceRecords.every((record) => record.exactTargetHistoricalWitnessPageBound === false)).toBe(true);
    expect(report.evidenceRecords.every((record) => record.qualifiesAsB77NewClassicalAuthorityScopeChange === false)).toBe(true);
  });

  test('keeps the candidate pre-semantic and refuses universal cancellation or precedence semantics', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingOperationalClashEffectivenessReopenSignalAdjudication(acceptedB77());

    expect(report.candidateInputDimension).toBe(CAREER_T8_B78_CANDIDATE_INPUT_DIMENSION);
    expect(report.candidateInputDimension).toBe('INTERACTION_EFFECTIVENESS_OR_RECOVERY');
    expect(report.candidateNegativeConstraintId).toBe(CAREER_T8_B78_CANDIDATE_NEGATIVE_CONSTRAINT_ID);
    expect(report.candidateNegativeConstraintId).toBe('FORMAL_CLASH_PRESENCE_MAY_NOT_IMPLY_OPERATIONAL_EFFECTIVENESS');
    expect(report.universalCombinationCancelsClashRuleAuthorized).toBe(false);
    expect(report.universalInteractionPrecedenceRuleAuthorized).toBe(false);
    expect(report.evidenceRecords.every((record) => record.universalCombinationCancelsClashRuleSupported === false)).toBe(true);
    expect(report.evidenceRecords.every((record) => record.universalInteractionPrecedenceRuleSupported === false)).toBe(true);
  });

  test('preserves the exact five-constraint B64 guard and does not authorize a sixth field', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingOperationalClashEffectivenessReopenSignalAdjudication(acceptedB77());

    expect(CAREER_T8_B64_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT.authorizedConstraintIds).toHaveLength(5);
    expect(CAREER_T8_B64_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT.positiveEffectSemanticsAuthorized).toBe(false);
    expect(CAREER_T8_B64_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT.numericEffectSemanticsAuthorized).toBe(false);
    expect(CAREER_T8_B64_NEGATIVE_CLASH_METHOD_GUARD_CONTRACT.productionEnforcementEnabled).toBe(false);
    expect(report.boundedNegativeMethodScopeAmendmentAuthorized).toBe(false);
    expect(report.existingFiveConstraintGuardMutationAuthorized).toBe(false);
    expect(report.sixthConstraintAuthoringAuthorized).toBe(false);
    expect(report.implementationEffects.guardConstraintsChanged).toBe(0);
    expect(report.implementationEffects.guardProposalFieldsChanged).toBe(0);
  });

  test('opens only target-witness binding and no scope amendment or semantic lane', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingOperationalClashEffectivenessReopenSignalAdjudication(acceptedB77());

    expect(report.immediatelyExecutableTargetWitnessBindingLaneCount).toBe(1);
    expect(report.immediatelyExecutableScopeAuthorityAmendmentLaneCount).toBe(0);
    expect(report.immediatelyExecutableSemanticRuleLaneCount).toBe(0);
    expect(report.selectedImmediateNextLane).toBe(
      'BRANCH_CLASSICAL_ZIPING_OPERATIONAL_CLASH_EFFECTIVENESS_TARGET_WITNESS_BINDING',
    );
    expect(report.recommendedNextGate).toBe(
      'BRANCH_CLASSICAL_ZIPING_OPERATIONAL_CLASH_EFFECTIVENESS_TARGET_WITNESS_BINDING',
    );
  });

  test('preserves all Career semantic, hold, historical-gap, and production boundaries', () => {
    const report =
      buildCareerPersonalizationT8ClassicalZipingOperationalClashEffectivenessReopenSignalAdjudication(acceptedB77());

    expect(report.positiveT6InputContractEstablished).toBe(false);
    expect(report.positiveClashEffectContractEstablished).toBe(false);
    expect(report.branchSourceOrMethodTriggerActivationCount).toBe(0);
    expect(report.currentCareerSemanticBridgeEstablished).toBe(false);
    expect(report.visualCorroborationHoldPreserved).toBe(true);
    expect(report.b56ChenZezhenHoldPreserved).toBe(true);
    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.productionImpact).toBe('NONE');
    expect(report.controlIds).toEqual(CAREER_T8_B78_REOPEN_SIGNAL_CONTROL_IDS);
    expect(report.controlCount).toBe(18);
    expect(report.controlsFrozen).toBe(true);
    expect(report.implementationEffects.publicExportsChanged).toBe(0);
    expect(report.implementationEffects.packageScriptsChanged).toBe(0);
    expect(report.implementationEffects.persistenceBehaviorsCreated).toBe(0);
    expect(report.implementationEffects.coreRegistryBehaviorsChanged).toBe(0);
    expect(report.implementationEffects.productionBehaviorsChanged).toBe(0);
  });

  test('is deterministic and fails closed when the B77 content address is tampered', () => {
    const b77 = acceptedB77();
    const first =
      buildCareerPersonalizationT8ClassicalZipingOperationalClashEffectivenessReopenSignalAdjudication(b77);
    const second =
      buildCareerPersonalizationT8ClassicalZipingOperationalClashEffectivenessReopenSignalAdjudication(b77);

    expect(first.adjudicationId).toBe(second.adjudicationId);
    expect(first).toEqual(second);

    const failed =
      buildCareerPersonalizationT8ClassicalZipingOperationalClashEffectivenessReopenSignalAdjudication({
        ...b77,
        closeoutId: `${b77.closeoutId}_tampered`,
      });

    expect(failed.status).toBe('UPSTREAM_B77_BOUNDARY_INVALID');
    expect(failed.decision).toBe('OPERATIONAL_CLASH_EFFECTIVENESS_REOPEN_SIGNAL_ADJUDICATION_NOT_ESTABLISHED');
    expect(failed.exactB77BoundaryAccepted).toBe(false);
    expect(failed.materialScopeChangeSignalObserved).toBe(false);
    expect(failed.evidenceRecordCount).toBe(0);
    expect(failed.immediatelyExecutableTargetWitnessBindingLaneCount).toBe(0);
    expect(failed.selectedImmediateNextLane).toBeNull();
    expect(failed.controlCount).toBe(0);
    expect(failed.controlsFrozen).toBe(false);
    expect(failed.recommendedNextGate).toBe(
      'BRANCH_CLASSICAL_ZIPING_OPERATIONAL_CLASH_EFFECTIVENESS_REOPEN_SIGNAL_ADJUDICATION',
    );
  });
});
