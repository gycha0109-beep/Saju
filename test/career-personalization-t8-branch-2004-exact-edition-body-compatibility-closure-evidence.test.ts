import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_BRANCH_2004_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE_VERSION,
  CAREER_T8_B49_2004_EXACT_BODY_CLOSURE_CONTROL_IDS,
  CAREER_T8_B49_LI_SHUNXIANG_2004_EXACT_BODY_EVIDENCE,
  buildCareerPersonalizationT8Branch2004ExactEditionBodyCompatibilityClosureEvidence,
} from '../src/research/career-personalization-t8-branch-2004-exact-edition-body-compatibility-closure-evidence.js';
import {
  CAREER_PERSONALIZATION_T8_BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE_VERSION,
  CAREER_T8_B48_AUTHORITY_TRIGGER_ACTIVATION_CONTROL_IDS,
  CAREER_T8_B48_AUTHORITY_TRIGGER_ACTIVATION_RECORDS,
  type CareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidenceReport,
} from '../src/research/career-personalization-t8-branch-source-or-method-authority-trigger-activation-evidence.js';

function acceptedB48(): CareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidenceReport {
  const material: Omit<
    CareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidenceReport,
    'evidenceId'
  > = {
    evidenceVersion: CAREER_PERSONALIZATION_T8_BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE_VERSION,
    status: 'RESOLVED_BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE',
    decision: 'ZERO_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATIONS_BRANCH_AUTHORITY_HOLD_PRESERVED',
    upstreamB47ReviewId: 'b47_fixture_for_b49',
    exactB47BoundaryAccepted: true,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    activationRecords: CAREER_T8_B48_AUTHORITY_TRIGGER_ACTIVATION_RECORDS,
    activationRecordCount: 2,
    evidenceStateChangedTriggerCount: 0,
    qualifyingActivationCount: 0,
    satisfiedOpenAuthorityTriggerCount: 0,
    sourceSpecificDependencySeparabilityOrCompletePathTriggerActivated: false,
    methodSpecificInputContractAndUpstreamAuthorityTriggerActivated: false,
    methodologyRequiredInputCoverageValidationTriggerRemainsClosed: true,
    existingArchitectureCanHostMethodSpecificContracts: true,
    activeRuleSetRequiredInputCoverageValidationPresent: true,
    activeRuleSetRequiredInputCoverageValidationFailClosed: true,
    exact2015PrintedTargetPassageBindingEstablished: false,
    independentSingleSourceCompletePathEstablished: false,
    sourceSpecificDependencySeparabilityEstablished: false,
    methodSpecificUpstreamAuthorityEstablished: false,
    authorityResearchLaneReopenedCount: 0,
    immediatelyExecutableAuthorityAdmissionLaneCount: 0,
    immediatelyExecutableSemanticRuleLaneCount: 0,
    selectedImmediateNextLane: null,
    branchAuthorityHoldActive: true,
    broadUnchangedSurfaceSearchRestartAuthorized: false,
    crossSourceStitchingAuthorized: false,
    sourceMandatoryDependencyDroppingAuthorized: false,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    methodologyDefinitionCreatedByThisGate: false,
    t5RuleAuthoringAuthorized: false,
    t6RuleAuthoringAuthorized: false,
    t8RuleAuthoringAuthorized: false,
    claimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: CAREER_T8_B48_AUTHORITY_TRIGGER_ACTIVATION_CONTROL_IDS,
    controlCount: 14,
    controlsFrozen: true,
    implementationEffects: {
      openAuthorityTriggersEvaluated: 2,
      authorityTriggersActivated: 0,
      authorityResearchLanesReopened: 0,
      sourceAcquisitionsPerformed: 0,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate: 'BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE',
  };

  return {
    evidenceId: `career_personalization_t8_branch_source_or_method_authority_trigger_activation_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

describe('Career T8 B49 Branch 2004 exact-edition body compatibility closure evidence', () => {
  test('accepts the exact content-addressed B48 hold boundary', () => {
    const report = buildCareerPersonalizationT8Branch2004ExactEditionBodyCompatibilityClosureEvidence(acceptedB48());
    expect(report.evidenceVersion).toBe(
      CAREER_PERSONALIZATION_T8_BRANCH_2004_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE_VERSION,
    );
    expect(report.status).toBe('RESOLVED_BRANCH_2004_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE');
    expect(report.decision).toBe(
      'EXACT_2004_FIRST_EDITION_BODY_ACQUIRED_SOURCE_DEPENDENCIES_CONFIRMED_CURRENT_METHOD_INCOMPATIBLE_ZERO_AUTHORITY_TRIGGER_ACTIVATIONS',
    );
    expect(report.exactB48BoundaryAccepted).toBe(true);
  });

  test('binds the 2004 first edition and directly inspected body without claiming the 2015 target', () => {
    const report = buildCareerPersonalizationT8Branch2004ExactEditionBodyCompatibilityClosureEvidence(acceptedB48());
    expect(report.sourceEvidence).toEqual(CAREER_T8_B49_LI_SHUNXIANG_2004_EXACT_BODY_EVIDENCE);
    expect(report.sourceEvidence?.sourceIdentity).toContain('9787228087822');
    expect(report.sourceEvidence?.sourceIdentity).toContain('2004-06 first edition');
    expect(report.sourceEvidenceStateChangedSinceB48).toBe(true);
    expect(report.sourceAcquisitionPerformed).toBe(true);
    expect(report.exact2004EditionBindingEstablished).toBe(true);
    expect(report.exact2004TargetBodyDirectlyInspected).toBe(true);
    expect(report.exact2015PrintedTargetPassageBindingEstablished).toBe(false);
  });

  test('preserves exact Zhengguan formal-responsibility correspondence and natal clash observation', () => {
    const report = buildCareerPersonalizationT8Branch2004ExactEditionBodyCompatibilityClosureEvidence(acceptedB48());
    expect(report.sourceEvidence?.exactTenGod).toBe('정관');
    expect(report.sourceEvidence?.currentT5SemanticKey).toBe('TEN_GOD_JEONG_GWAN_FORMAL_RESPONSIBILITY');
    expect(report.sourceEvidence?.currentT5Facet).toBe('formal_responsibility');
    expect(report.sourceEvidence?.semanticTermsObserved).toEqual([
      'constraint_or_regulation',
      'self_control',
      'responsibility',
    ]);
    expect(report.exactZhengguanSemanticCorrespondenceObserved).toBe(true);
    expect(report.natalZhengguanClashConditionObserved).toBe(true);
  });

  test('does not invent ATTENUATES_OR_REDUCES_EXPRESSION from an unbroken-condition rule', () => {
    const report = buildCareerPersonalizationT8Branch2004ExactEditionBodyCompatibilityClosureEvidence(acceptedB48());
    expect(report.qualitativeAttenuationModeDirectlyEstablished).toBe(false);
    expect(report.sourceEvidence?.qualitativeAttenuationModeDirectlyEstablished).toBe(false);
  });

  test('confirms source-mandatory strength Xiji Yongshen and structural dependencies', () => {
    const report = buildCareerPersonalizationT8Branch2004ExactEditionBodyCompatibilityClosureEvidence(acceptedB48());
    expect(report.sourceSpecificStrengthDependencyObserved).toBe(true);
    expect(report.sourceSpecificXijiYongshenDependencyObserved).toBe(true);
    expect(report.sourceSpecificStructuralDependencyObserved).toBe(true);
    expect(report.sourceSpecificDependencySeparabilityEstablished).toBe(false);
    expect(report.currentMethodCompatibilityEstablished).toBe(false);
    expect(report.currentMethodIncompatibilityForFlatModifierEstablished).toBe(true);
  });

  test('negatively closes the 2004 path instead of manufacturing an independent complete path', () => {
    const report = buildCareerPersonalizationT8Branch2004ExactEditionBodyCompatibilityClosureEvidence(acceptedB48());
    expect(report.sourceEvidence?.disposition).toBe(
      'EXACT_EDITION_BODY_ACQUIRED_CURRENT_METHOD_INCOMPATIBLE_FOR_BOUNDED_FLAT_MODIFIER',
    );
    expect(report.independentSingleSourceCompletePathEstablished).toBe(false);
    expect(report.sourceEvidence?.mayDropSourceDependenciesToForceCompatibility).toBe(false);
    expect(report.sourceEvidence?.mayBorrowModifierOrCompatibilityFromAnotherSource).toBe(false);
    expect(report.repeat2004PathSearchAuthorized).toBe(false);
  });

  test('activates neither B48 authority trigger and opens no semantic or admission lane', () => {
    const report = buildCareerPersonalizationT8Branch2004ExactEditionBodyCompatibilityClosureEvidence(acceptedB48());
    expect(report.sourceSpecificDependencySeparabilityOrCompletePathTriggerActivated).toBe(false);
    expect(report.methodSpecificInputContractAndUpstreamAuthorityTriggerActivated).toBe(false);
    expect(report.satisfiedOpenAuthorityTriggerCount).toBe(0);
    expect(report.authorityResearchLaneReopenedCount).toBe(0);
    expect(report.immediatelyExecutableAuthorityAdmissionLaneCount).toBe(0);
    expect(report.immediatelyExecutableSemanticRuleLaneCount).toBe(0);
    expect(report.selectedImmediateNextLane).toBeNull();
    expect(report.branchAuthorityHoldActive).toBe(true);
  });

  test('preserves every authority and production boundary', () => {
    const report = buildCareerPersonalizationT8Branch2004ExactEditionBodyCompatibilityClosureEvidence(acceptedB48());
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.sourceMandatoryDependencyDroppingAuthorized).toBe(false);
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

  test('records one exact-body acquisition and one negative path closure with zero runtime effects', () => {
    const report = buildCareerPersonalizationT8Branch2004ExactEditionBodyCompatibilityClosureEvidence(acceptedB48());
    expect(report.implementationEffects).toEqual({
      exactEditionSourceBodiesAcquired: 1,
      sourcePathsNegativelyClosedForCurrentMethod: 1,
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
    expect(report.controlIds).toEqual(CAREER_T8_B49_2004_EXACT_BODY_CLOSURE_CONTROL_IDS);
    expect(report.controlCount).toBe(14);
    expect(report.controlsFrozen).toBe(true);
    expect(report.recommendedNextGate).toBe('BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE');
  });

  test('is deterministic for the same exact B48 boundary', () => {
    const first = buildCareerPersonalizationT8Branch2004ExactEditionBodyCompatibilityClosureEvidence(acceptedB48());
    const second = buildCareerPersonalizationT8Branch2004ExactEditionBodyCompatibilityClosureEvidence(acceptedB48());
    expect(first.evidenceId).toBe(second.evidenceId);
    expect(first).toEqual(second);
  });

  test('fails closed on a tampered B48 content-addressed identity', () => {
    const b48 = acceptedB48();
    const tampered: CareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidenceReport = {
      ...b48,
      evidenceId: `${b48.evidenceId}_tampered`,
    };
    const report = buildCareerPersonalizationT8Branch2004ExactEditionBodyCompatibilityClosureEvidence(tampered);
    expect(report.status).toBe('UPSTREAM_B48_BOUNDARY_INVALID');
    expect(report.decision).toBe('BRANCH_2004_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_NOT_ESTABLISHED');
    expect(report.exactB48BoundaryAccepted).toBe(false);
    expect(report.sourceEvidence).toBeNull();
    expect(report.sourceEvidenceStateChangedSinceB48).toBe(false);
    expect(report.sourceAcquisitionPerformed).toBe(false);
    expect(report.currentMethodIncompatibilityForFlatModifierEstablished).toBe(false);
    expect(report.branchAuthorityHoldActive).toBe(false);
    expect(report.controlCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
    expect(report.recommendedNextGate).toBe('BRANCH_2004_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE');
  });
});
