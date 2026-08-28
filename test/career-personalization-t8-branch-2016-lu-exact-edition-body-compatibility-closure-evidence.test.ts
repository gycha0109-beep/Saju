import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  buildCareerPersonalizationT8Branch2004ExactEditionBodyCompatibilityClosureEvidence,
} from '../src/research/career-personalization-t8-branch-2004-exact-edition-body-compatibility-closure-evidence.js';
import {
  CAREER_PERSONALIZATION_T8_BRANCH_2016_LU_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE_VERSION,
  CAREER_T8_B50_2016_EXACT_BODY_CLOSURE_CONTROL_IDS,
  CAREER_T8_B50_LU_ZHIJI_2016_EXACT_BODY_EVIDENCE,
  buildCareerPersonalizationT8Branch2016LuExactEditionBodyCompatibilityClosureEvidence,
} from '../src/research/career-personalization-t8-branch-2016-lu-exact-edition-body-compatibility-closure-evidence.js';
import {
  buildCareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidence,
} from '../src/research/career-personalization-t8-branch-source-or-method-authority-trigger-activation-evidence.js';
import {
  CAREER_PERSONALIZATION_T8_BRANCH_TRIGGER_GATED_POST_P0_REMEDIATION_REVIEW_VERSION,
  CAREER_T8_B47_AUDITED_BASE_MAIN_COMMIT,
  CAREER_T8_B47_CONTROL_IDS,
  CAREER_T8_B47_REMEDIATION_TRIGGER_RECORDS,
  CAREER_T8_B47_TARGETED_SOURCE_RECHECK,
  type CareerPersonalizationT8BranchTriggerGatedPostP0RemediationReviewReport,
} from '../src/research/career-personalization-t8-branch-trigger-gated-post-p0-remediation-review.js';

function acceptedB47(): CareerPersonalizationT8BranchTriggerGatedPostP0RemediationReviewReport {
  const material: Omit<CareerPersonalizationT8BranchTriggerGatedPostP0RemediationReviewReport, 'reviewId'> = {
    reviewVersion: CAREER_PERSONALIZATION_T8_BRANCH_TRIGGER_GATED_POST_P0_REMEDIATION_REVIEW_VERSION,
    status: 'RESOLVED_BRANCH_TRIGGER_GATED_POST_P0_REMEDIATION_REVIEW',
    decision: 'ONE_INFRASTRUCTURE_TRIGGER_CLOSED_TWO_AUTHORITY_TRIGGERS_OPEN_ZERO_SEMANTIC_LANES',
    upstreamB46ReviewId: 'b46_fixture_for_b50',
    exactB46BoundaryAccepted: true,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    auditedBaseMainCommit: CAREER_T8_B47_AUDITED_BASE_MAIN_COMMIT,
    repositoryAuditAccepted: true,
    targetedSourceRecheckPerformed: true,
    targetedSourceRecheckDisposition: CAREER_T8_B47_TARGETED_SOURCE_RECHECK.disposition,
    remediationTriggerRecords: CAREER_T8_B47_REMEDIATION_TRIGGER_RECORDS,
    remediationTriggerCount: 3,
    satisfiedRemediationTriggerCount: 1,
    unsatisfiedRemediationTriggerCount: 2,
    sourceSpecificDependencySeparabilityOrCompletePathTriggerSatisfied: false,
    methodSpecificInputContractAndUpstreamAuthorityTriggerSatisfied: false,
    methodologyRequiredInputCoverageValidationTriggerSatisfied: true,
    exact2015PrintedTargetPassageBindingEstablished: false,
    independentSingleSourceCompletePathEstablished: false,
    sourceSpecificDependencySeparabilityEstablished: false,
    methodSpecificUpstreamAuthorityEstablished: false,
    branch2015TriggerSatisfied: false,
    branchIndependentCompletePathTriggerSatisfied: false,
    existingArchitectureCanHostMethodSpecificContracts: true,
    activeRuleSetRequiredInputCoverageValidationPresent: true,
    activeRuleSetRequiredInputCoverageValidationFailClosed: true,
    methodologyDefinitionCreatedByThisGate: false,
    methodSpecificContractAuthoringAuthorized: false,
    flatUnaryClashModifierAuthorized: false,
    crossSourceStitchingAuthorized: false,
    sourceMandatoryDependencyDroppingAuthorized: false,
    immediatelyExecutableAuthorityAdmissionLaneCount: 0,
    immediatelyExecutableSemanticRuleLaneCount: 0,
    selectedImmediateNextLane: null,
    broadUnchangedSurfaceSearchRestartAuthorized: false,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    t5RuleAuthoringAuthorized: false,
    t6RuleAuthoringAuthorized: false,
    t8RuleAuthoringAuthorized: false,
    claimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: CAREER_T8_B47_CONTROL_IDS,
    controlCount: 16,
    controlsFrozen: true,
    recommendedNextGate: 'BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE',
  };

  return {
    reviewId: `career_personalization_t8_branch_trigger_gated_post_p0_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function acceptedB49() {
  const b48 = buildCareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidence(acceptedB47());
  return buildCareerPersonalizationT8Branch2004ExactEditionBodyCompatibilityClosureEvidence(b48);
}

describe('Career T8 Branch 2016 Lu exact-body compatibility closure evidence', () => {
  test('accepts exact B49 and resolves one new published-source negative closure', () => {
    const report = buildCareerPersonalizationT8Branch2016LuExactEditionBodyCompatibilityClosureEvidence(acceptedB49());

    expect(report.evidenceVersion).toBe(
      CAREER_PERSONALIZATION_T8_BRANCH_2016_LU_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE_VERSION,
    );
    expect(report.status).toBe('RESOLVED_BRANCH_2016_LU_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE');
    expect(report.decision).toBe(
      'EXACT_2016_LU_BODY_ACQUIRED_SOURCE_DEPENDENCIES_CONFIRMED_CURRENT_METHOD_INCOMPATIBLE_ZERO_AUTHORITY_TRIGGER_ACTIVATIONS',
    );
    expect(report.exactB49BoundaryAccepted).toBe(true);
    expect(report.prior2004NegativeClosurePreserved).toBe(true);
    expect(report.sourceEvidenceStateChangedSinceB49).toBe(true);
    expect(report.sourceAcquisitionPerformed).toBe(true);
  });

  test('pins exact Lu 2016 publication identity and directly inspected pp.147-149 body', () => {
    const report = buildCareerPersonalizationT8Branch2016LuExactEditionBodyCompatibilityClosureEvidence(acceptedB49());
    const source = report.sourceEvidence;

    expect(source).toEqual(CAREER_T8_B50_LU_ZHIJI_2016_EXACT_BODY_EVIDENCE);
    expect(source?.sourceIdentity).toContain('陸致極');
    expect(source?.sourceIdentity).toContain('9789621459978');
    expect(source?.inspectedBodySurface).toContain('pp.147-149');
    expect(source?.exactEditionBindingEstablished).toBe(true);
    expect(source?.targetBodyDirectlyInspected).toBe(true);
  });

  test('preserves exact Zhengguan formal-responsibility material without broad semantic promotion', () => {
    const source = buildCareerPersonalizationT8Branch2016LuExactEditionBodyCompatibilityClosureEvidence(
      acceptedB49(),
    ).sourceEvidence;

    expect(source?.exactTenGod).toBe('정관');
    expect(source?.currentT5SemanticKey).toBe('TEN_GOD_JEONG_GWAN_FORMAL_RESPONSIBILITY');
    expect(source?.currentT5Facet).toBe('formal_responsibility');
    expect(source?.semanticTermsObserved).toContain('discipline_and_self_restraint');
    expect(source?.semanticTermsObserved).toContain('rule_following_and_public_duty');
    expect(source?.semanticTermsObserved).toContain('carrying_out_superior_instructions');
  });

  test('records natal clash pattern-root damage but refuses to relabel it as flat attenuation', () => {
    const source = buildCareerPersonalizationT8Branch2016LuExactEditionBodyCompatibilityClosureEvidence(
      acceptedB49(),
    ).sourceEvidence;

    expect(source?.natalZhengguanClashConditionObserved).toBe(true);
    expect(source?.patternRootDamageObserved).toBe(true);
    expect(source?.sourceQualitativeEffectClass).toBe('PATTERN_ROOT_DAMAGED_OR_BROKEN');
    expect(source?.qualitativeAttenuationModeDirectlyEstablished).toBe(false);
  });

  test('preserves same-source strength pattern and month-command dependencies as compatibility blockers', () => {
    const report = buildCareerPersonalizationT8Branch2016LuExactEditionBodyCompatibilityClosureEvidence(acceptedB49());
    const source = report.sourceEvidence;

    expect(source?.sourceSpecificDayMasterStrengthDependencyObserved).toBe(true);
    expect(source?.sourceSpecificPatternDependencyObserved).toBe(true);
    expect(source?.sourceSpecificMonthCommandRootDependencyObserved).toBe(true);
    expect(source?.sourceSpecificDependencySeparabilityEstablished).toBe(false);
    expect(source?.currentMethodCompatibilityEstablished).toBe(false);
    expect(source?.independentSingleSourceCompletePathEstablished).toBe(false);
    expect(source?.mayDropSourceDependenciesToForceCompatibility).toBe(false);
    expect(report.currentMethodIncompatibilityForFlatModifierEstablished).toBe(true);
  });

  test('activates no authority trigger and opens no semantic or admission lane', () => {
    const report = buildCareerPersonalizationT8Branch2016LuExactEditionBodyCompatibilityClosureEvidence(acceptedB49());

    expect(report.sourceSpecificDependencySeparabilityOrCompletePathTriggerActivated).toBe(false);
    expect(report.methodSpecificInputContractAndUpstreamAuthorityTriggerActivated).toBe(false);
    expect(report.satisfiedOpenAuthorityTriggerCount).toBe(0);
    expect(report.authorityResearchLaneReopenedCount).toBe(0);
    expect(report.immediatelyExecutableAuthorityAdmissionLaneCount).toBe(0);
    expect(report.immediatelyExecutableSemanticRuleLaneCount).toBe(0);
    expect(report.selectedImmediateNextLane).toBeNull();
    expect(report.branchAuthorityHoldActive).toBe(true);
  });

  test('freezes both known negative published paths and forbids repeated-path progress claims', () => {
    const report = buildCareerPersonalizationT8Branch2016LuExactEditionBodyCompatibilityClosureEvidence(acceptedB49());

    expect(report.prior2004NegativeClosurePreserved).toBe(true);
    expect(report.repeat2004PathSearchAuthorized).toBe(false);
    expect(report.repeat2016PathSearchAuthorized).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.sourceMandatoryDependencyDroppingAuthorized).toBe(false);
    expect(report.implementationEffects.cumulativeNegativelyClosedIndependentPublishedBranchPaths).toBe(2);
  });

  test('preserves all six gaps personalized preview hold and production boundary', () => {
    const report = buildCareerPersonalizationT8Branch2016LuExactEditionBodyCompatibilityClosureEvidence(acceptedB49());

    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
    expect(report.authorityAdmittedByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
    expect(report.methodologyDefinitionCreatedByThisGate).toBe(false);
    expect(report.t5RuleAuthoringAuthorized).toBe(false);
    expect(report.t6RuleAuthoringAuthorized).toBe(false);
    expect(report.t8RuleAuthoringAuthorized).toBe(false);
    expect(report.claimTypeCreationAuthorized).toBe(false);
    expect(report.personalizedT8PackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.productionImpact).toBe('NONE');
  });

  test('freezes B50 controls and routes only to future distinct source or method signal activation', () => {
    const report = buildCareerPersonalizationT8Branch2016LuExactEditionBodyCompatibilityClosureEvidence(acceptedB49());

    expect(report.controlIds).toEqual(CAREER_T8_B50_2016_EXACT_BODY_CLOSURE_CONTROL_IDS);
    expect(report.controlCount).toBe(14);
    expect(report.controlsFrozen).toBe(true);
    expect(report.implementationEffects).toEqual({
      exactEditionSourceBodiesAcquired: 1,
      sourcePathsNegativelyClosedForCurrentMethod: 1,
      cumulativeNegativelyClosedIndependentPublishedBranchPaths: 2,
      authorityTriggersActivated: 0,
      authorityResearchLanesReopened: 0,
      authorityComponentsAdmitted: 0,
      authorityGapsClosed: 0,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    });
    expect(report.recommendedNextGate).toBe('BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE');
  });

  test('is deterministic for the exact same B49 boundary', () => {
    const first = buildCareerPersonalizationT8Branch2016LuExactEditionBodyCompatibilityClosureEvidence(acceptedB49());
    const second = buildCareerPersonalizationT8Branch2016LuExactEditionBodyCompatibilityClosureEvidence(acceptedB49());

    expect(first.evidenceId).toBe(second.evidenceId);
    expect(first).toEqual(second);
  });

  test('fails closed when B49 content-addressed identity is tampered', () => {
    const b49 = acceptedB49();
    const tampered = { ...b49, evidenceId: `${b49.evidenceId}_tampered` };
    const report = buildCareerPersonalizationT8Branch2016LuExactEditionBodyCompatibilityClosureEvidence(tampered);

    expect(report.status).toBe('UPSTREAM_B49_BOUNDARY_INVALID');
    expect(report.decision).toBe('BRANCH_2016_LU_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_NOT_ESTABLISHED');
    expect(report.exactB49BoundaryAccepted).toBe(false);
    expect(report.prior2004NegativeClosurePreserved).toBe(false);
    expect(report.sourceEvidenceStateChangedSinceB49).toBe(false);
    expect(report.sourceAcquisitionPerformed).toBe(false);
    expect(report.sourceEvidence).toBeNull();
    expect(report.branchAuthorityHoldActive).toBe(false);
    expect(report.controlCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'BRANCH_2016_LU_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE',
    );
  });
});
