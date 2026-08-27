import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_POST_B43_GLOBAL_RESEARCH_HOLD_REVIEW_VERSION,
  CAREER_T8_B44_GLOBAL_REOPEN_SIGNAL_CLASSES,
  CAREER_T8_B44_GLOBAL_RESEARCH_FRONTIER_RECORDS,
  CAREER_T8_B44_GLOBAL_RESEARCH_HOLD_CONTROL_IDS,
  type CareerPersonalizationT8PostB43GlobalResearchHoldReviewReport,
} from '../src/research/career-personalization-t8-post-b43-global-research-hold-review.js';
import {
  CAREER_PERSONALIZATION_T8_RESEARCH_REOPEN_TRIGGER_ACTIVATION_EVIDENCE_VERSION,
  CAREER_T8_B45_REOPEN_SIGNAL_EVIDENCE_RECORDS,
  CAREER_T8_B45_REOPEN_TRIGGER_ACTIVATION_CONTROL_IDS,
  buildCareerPersonalizationT8ResearchReopenTriggerActivationEvidence,
} from '../src/research/career-personalization-t8-research-reopen-trigger-activation-evidence.js';

function acceptedB44(): CareerPersonalizationT8PostB43GlobalResearchHoldReviewReport {
  const material: Omit<CareerPersonalizationT8PostB43GlobalResearchHoldReviewReport, 'reviewId'> = {
    reviewVersion: CAREER_PERSONALIZATION_T8_POST_B43_GLOBAL_RESEARCH_HOLD_REVIEW_VERSION,
    status: 'RESOLVED_CAREER_PERSONALIZATION_T8_POST_B43_GLOBAL_RESEARCH_HOLD_REVIEW',
    decision:
      'GLOBAL_TRIGGER_GATED_RESEARCH_HOLD_ZERO_EXECUTABLE_LANES_RESUME_ONLY_ON_EXPLICIT_EVIDENCE_OR_GOVERNED_METHOD_CHANGE',
    upstreamB43ReviewId: 'b43_fixture_for_b45',
    exactB43BoundaryAccepted: true,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    globalResearchHoldActive: true,
    frontierRecords: CAREER_T8_B44_GLOBAL_RESEARCH_FRONTIER_RECORDS,
    frontierRecordCount: 9,
    globalReopenSignalClasses: CAREER_T8_B44_GLOBAL_REOPEN_SIGNAL_CLASSES,
    globalReopenSignalClassCount: 8,
    admittedBoundedAuthorityComponentCountPreserved: 1,
    branchTriggerContractCountPreserved: 2,
    branchSatisfiedTriggerCount: 0,
    familyTriggerContractCountPreserved: 3,
    familySatisfiedTriggerCount: 0,
    externalEvidenceSurfaceHoldCount: 2,
    unconsumedDimensionCount: 3,
    packLevelDeferredLaneCount: 1,
    immediatelyExecutableAuthorityAdmissionLaneCount: 0,
    immediatelyExecutableExistingSurfaceResearchLaneCount: 0,
    boundedGovernanceGateExecutableCount: 0,
    qinP464DirectBodyAcquired: false,
    qianli1936P50ToP53ExactPagesBound: false,
    visibilityConsumedByCurrentContinuation: false,
    pluralityConsumedByCurrentContinuation: false,
    pluralityHeldUnderI254: true,
    seasonalConsumedByCurrentContinuation: false,
    conflictPolicyDisposition: 'PACK_LEVEL_DEFERRED',
    resumeRequiresExplicitSignalChange: true,
    broadSearchRestartAuthorized: false,
    repeatedUnchangedSurfaceSearchAuthorized: false,
    crossSourceRequirementStitchingAuthorized: false,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: CAREER_T8_B44_GLOBAL_RESEARCH_HOLD_CONTROL_IDS,
    controlCount: 12,
    controlsFrozen: true,
    selectedImmediateNextLane: null,
    recommendedNextGate: 'CAREER_PERSONALIZATION_T8_RESEARCH_REOPEN_TRIGGER_ACTIVATION_EVIDENCE',
  };

  return {
    reviewId: `career_personalization_t8_post_b43_global_research_hold_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

describe('Career T8 research reopen trigger activation evidence', () => {
  test('accepts the exact content-addressed B44 boundary', () => {
    const report = buildCareerPersonalizationT8ResearchReopenTriggerActivationEvidence(acceptedB44());
    expect(report.evidenceVersion).toBe(CAREER_PERSONALIZATION_T8_RESEARCH_REOPEN_TRIGGER_ACTIVATION_EVIDENCE_VERSION);
    expect(report.status).toBe('RESOLVED_CAREER_PERSONALIZATION_T8_RESEARCH_REOPEN_TRIGGER_ACTIVATION_EVIDENCE');
    expect(report.decision).toBe(
      'ONE_BRANCH_SIGNAL_MATERIALLY_CHANGED_ZERO_FROZEN_TRIGGERS_SATISFIED_AUTHORITY_RESEARCH_HOLD_PRESERVED_ONE_BOUNDED_METHODOLOGY_RECONCILIATION_GATE_EXECUTABLE',
    );
    expect(report.exactB44BoundaryAccepted).toBe(true);
  });

  test('reconciles all eight frozen B44 signal classes exactly once', () => {
    const report = buildCareerPersonalizationT8ResearchReopenTriggerActivationEvidence(acceptedB44());
    expect(report.evidenceRecords).toEqual(CAREER_T8_B45_REOPEN_SIGNAL_EVIDENCE_RECORDS);
    expect(report.evidenceRecordCount).toBe(8);
    expect(new Set(report.evidenceRecords.map((record) => record.signalClass)).size).toBe(8);
    expect(report.evidenceRecords.map((record) => record.signalClass)).toEqual(CAREER_T8_B44_GLOBAL_REOPEN_SIGNAL_CLASSES);
  });

  test('records four supporting surface changes but only one qualifying frozen signal change', () => {
    const report = buildCareerPersonalizationT8ResearchReopenTriggerActivationEvidence(acceptedB44());
    expect(report.supportingEvidenceChangedSignalCount).toBe(4);
    expect(report.qualifyingFrozenSignalChangeCount).toBe(1);
    expect(report.qualifyingFrozenSignalClasses).toEqual(['BRANCH_B41_TRIGGER_CONDITION_CHANGE']);
  });

  test('materially changes the Branch B41 condition state without satisfying either frozen trigger', () => {
    const report = buildCareerPersonalizationT8ResearchReopenTriggerActivationEvidence(acceptedB44());
    const branch = report.evidenceRecords.find((record) => record.signalClass === 'BRANCH_B41_TRIGGER_CONDITION_CHANGE');
    expect(report.branchB41SignalMateriallyChanged).toBe(true);
    expect(report.branch2015TriggerSatisfied).toBe(false);
    expect(report.branchIndependentCompletePathTriggerSatisfied).toBe(false);
    expect(report.branchCurrentMethodCompatibilityEstablished).toBe(false);
    expect(branch?.qualifyingFrozenSignalChange).toBe(true);
    expect(branch?.boundedGovernanceFollowupJustified).toBe(true);
    expect(branch?.remainingBlockers).toContain('NO_SINGLE_SOURCE_CURRENT_METHOD_COMPATIBLE_NATAL_ZHENGGUAN_CLASH_MODIFIER_PATH');
  });

  test('keeps Qianli on exact target-page hold despite exact witness surface acquisition', () => {
    const report = buildCareerPersonalizationT8ResearchReopenTriggerActivationEvidence(acceptedB44());
    const qianli = report.evidenceRecords.find(
      (record) => record.signalClass === 'QIANLI_1936_EXACT_TARGET_PAGE_EVIDENCE_CHANGE',
    );
    expect(qianli?.supportingEvidenceChanged).toBe(true);
    expect(qianli?.qualifyingFrozenSignalChange).toBe(false);
    expect(report.qianli1936P50ToP53ExactPagesBound).toBe(false);
  });

  test('keeps Qin on direct p464 body hold despite tighter locator and method context', () => {
    const report = buildCareerPersonalizationT8ResearchReopenTriggerActivationEvidence(acceptedB44());
    const qin = report.evidenceRecords.find((record) => record.signalClass === 'QIN_P464_DIRECT_BODY_EVIDENCE_CHANGE');
    expect(qin?.supportingEvidenceChanged).toBe(true);
    expect(qin?.qualifyingFrozenSignalChange).toBe(false);
    expect(report.qinP464DirectBodyAcquired).toBe(false);
  });

  test('does not promote Family supporting locator changes into a B43 trigger', () => {
    const report = buildCareerPersonalizationT8ResearchReopenTriggerActivationEvidence(acceptedB44());
    const family = report.evidenceRecords.find((record) => record.signalClass === 'FAMILY_B43_TRIGGER_CONDITION_CHANGE');
    expect(family?.supportingEvidenceChanged).toBe(true);
    expect(family?.qualifyingFrozenSignalChange).toBe(false);
    expect(report.familyB43AnyTriggerSatisfied).toBe(false);
  });

  test('keeps visibility plurality seasonal and pack-conflict signals unchanged', () => {
    const report = buildCareerPersonalizationT8ResearchReopenTriggerActivationEvidence(acceptedB44());
    for (const signalClass of [
      'VISIBILITY_GOVERNED_METHOD_SCOPE_CHANGE',
      'PLURALITY_I254_GOVERNANCE_RELEASE',
      'SEASONAL_GOVERNED_METHOD_SCOPE_CHANGE',
      'UPSTREAM_AUTHORITY_SUFFICIENCY_FOR_PACK_LEVEL_CONFLICT_REVIEW',
    ] as const) {
      const record = report.evidenceRecords.find((candidate) => candidate.signalClass === signalClass);
      expect(record?.supportingEvidenceChanged).toBe(false);
      expect(record?.qualifyingFrozenSignalChange).toBe(false);
    }
  });

  test('opens no authority research lane but permits exactly one bounded governance reconciliation gate', () => {
    const report = buildCareerPersonalizationT8ResearchReopenTriggerActivationEvidence(acceptedB44());
    expect(report.frozenTriggerSatisfiedCount).toBe(0);
    expect(report.authorityResearchLaneReopenedCount).toBe(0);
    expect(report.boundedGovernanceGateExecutableCount).toBe(1);
    expect(report.selectedImmediateNextLane).toBe(
      'BRANCH_CLASH_CROSS_METHODOLOGY_MINIMUM_INTERACTION_DIMENSION_RECONCILIATION_REVIEW',
    );
    expect(report.recommendedNextGate).toBe(
      'BRANCH_CLASH_CROSS_METHODOLOGY_MINIMUM_INTERACTION_DIMENSION_RECONCILIATION_REVIEW',
    );
  });

  test('preserves the authority hold and forbids dependency dropping stitching and blind search restart', () => {
    const report = buildCareerPersonalizationT8ResearchReopenTriggerActivationEvidence(acceptedB44());
    expect(report.globalAuthorityResearchHoldPreserved).toBe(true);
    expect(report.currentMethodScopeMutationAuthorized).toBe(false);
    expect(report.sourceMandatoryDependencyDroppingAuthorized).toBe(false);
    expect(report.broadSearchRestartAuthorized).toBe(false);
    expect(report.repeatedUnchangedSurfaceSearchAuthorized).toBe(false);
    expect(report.crossSourceRequirementStitchingAuthorized).toBe(false);
  });

  test('preserves one Position component and all six historical gaps', () => {
    const report = buildCareerPersonalizationT8ResearchReopenTriggerActivationEvidence(acceptedB44());
    expect(report.admittedBoundedAuthorityComponentCountPreserved).toBe(1);
    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.authorityAdmittedByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
  });

  test('does not authorize T5 T6 T8 or production effects', () => {
    const report = buildCareerPersonalizationT8ResearchReopenTriggerActivationEvidence(acceptedB44());
    expect(report.t5RuleAuthoringAuthorized).toBe(false);
    expect(report.t6RuleAuthoringAuthorized).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.t8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.productionImpact).toBe('NONE');
  });

  test('freezes the activation-evidence controls', () => {
    const report = buildCareerPersonalizationT8ResearchReopenTriggerActivationEvidence(acceptedB44());
    expect(report.controlIds).toEqual(CAREER_T8_B45_REOPEN_TRIGGER_ACTIVATION_CONTROL_IDS);
    expect(report.controlCount).toBe(14);
    expect(report.controlsFrozen).toBe(true);
  });

  test('fails closed when the B44 content-addressed identity is tampered', () => {
    const b44 = acceptedB44();
    const tampered: CareerPersonalizationT8PostB43GlobalResearchHoldReviewReport = {
      ...b44,
      reviewId: `${b44.reviewId}_tampered`,
    };
    const report = buildCareerPersonalizationT8ResearchReopenTriggerActivationEvidence(tampered);
    expect(report.status).toBe('UPSTREAM_B44_BOUNDARY_INVALID');
    expect(report.decision).toBe('RESEARCH_REOPEN_TRIGGER_ACTIVATION_EVIDENCE_NOT_ESTABLISHED');
    expect(report.evidenceRecordCount).toBe(0);
    expect(report.qualifyingFrozenSignalChangeCount).toBe(0);
    expect(report.boundedGovernanceGateExecutableCount).toBe(0);
    expect(report.branchB41SignalMateriallyChanged).toBe(false);
    expect(report.globalAuthorityResearchHoldPreserved).toBe(false);
    expect(report.controlCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
    expect(report.selectedImmediateNextLane).toBeNull();
  });
});
