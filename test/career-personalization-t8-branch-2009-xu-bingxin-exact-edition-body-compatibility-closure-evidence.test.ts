import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import { buildCareerPersonalizationT8Branch2004ExactEditionBodyCompatibilityClosureEvidence } from '../src/research/career-personalization-t8-branch-2004-exact-edition-body-compatibility-closure-evidence.js';
import {
  CAREER_PERSONALIZATION_T8_BRANCH_2009_XU_BINGXIN_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE_VERSION,
  CAREER_T8_B52_2009_EXACT_BODY_CLOSURE_CONTROL_IDS,
  CAREER_T8_B52_XU_BINGXIN_2009_EXACT_BODY_EVIDENCE,
  buildCareerPersonalizationT8Branch2009XuBingxinExactEditionBodyCompatibilityClosureEvidence,
} from '../src/research/career-personalization-t8-branch-2009-xu-bingxin-exact-edition-body-compatibility-closure-evidence.js';
import { buildCareerPersonalizationT8Branch2015ShishenChanweiPublicationLineageAndExactBodyAcquisitionRecheckEvidence } from '../src/research/career-personalization-t8-branch-2015-shishen-chanwei-publication-lineage-and-exact-body-acquisition-recheck-evidence.js';
import { buildCareerPersonalizationT8Branch2016LuExactEditionBodyCompatibilityClosureEvidence } from '../src/research/career-personalization-t8-branch-2016-lu-exact-edition-body-compatibility-closure-evidence.js';
import { buildCareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidence } from '../src/research/career-personalization-t8-branch-source-or-method-authority-trigger-activation-evidence.js';
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
    upstreamB46ReviewId: 'b46_fixture_for_b52',
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

function acceptedB51() {
  const b48 = buildCareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidence(acceptedB47());
  const b49 = buildCareerPersonalizationT8Branch2004ExactEditionBodyCompatibilityClosureEvidence(b48);
  const b50 = buildCareerPersonalizationT8Branch2016LuExactEditionBodyCompatibilityClosureEvidence(b49);
  return buildCareerPersonalizationT8Branch2015ShishenChanweiPublicationLineageAndExactBodyAcquisitionRecheckEvidence(b50);
}

describe('Career T8 Branch Xu Bingxin 2009 exact-edition body compatibility closure evidence', () => {
  test('accepts exact B51 and closes the 2009 path as current-method incompatible', () => {
    const report = buildCareerPersonalizationT8Branch2009XuBingxinExactEditionBodyCompatibilityClosureEvidence(acceptedB51());

    expect(report.evidenceVersion).toBe(
      CAREER_PERSONALIZATION_T8_BRANCH_2009_XU_BINGXIN_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE_VERSION,
    );
    expect(report.status).toBe('RESOLVED_BRANCH_2009_XU_BINGXIN_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE');
    expect(report.decision).toBe(
      'EXACT_2009_XU_BINGXIN_BODY_ACQUIRED_SOURCE_DEPENDENCIES_CONFIRMED_CURRENT_METHOD_INCOMPATIBLE_ZERO_AUTHORITY_TRIGGER_ACTIVATIONS',
    );
    expect(report.exactB51BoundaryAccepted).toBe(true);
    expect(report.sourceEvidenceStateChangedSinceB51).toBe(true);
    expect(report.currentMethodIncompatibilityForFlatModifierEstablished).toBe(true);
  });

  test('binds the exact 2009 publication identity and inspected target body', () => {
    const report = buildCareerPersonalizationT8Branch2009XuBingxinExactEditionBodyCompatibilityClosureEvidence(acceptedB51());
    const source = report.sourceEvidence;

    expect(source).toEqual(CAREER_T8_B52_XU_BINGXIN_2009_EXACT_BODY_EVIDENCE);
    expect(source?.sourceIdentity).toContain('徐丙昕');
    expect(source?.sourceIdentity).toContain('四柱学教程');
    expect(source?.sourceIdentity).toContain('中国商业出版社');
    expect(source?.sourceIdentity).toContain('9787504464903');
    expect(source?.sourceIdentity).toContain('368 pages');
    expect(report.exact2009EditionBindingEstablished).toBe(true);
    expect(report.exact2009TargetBodyDirectlyInspected).toBe(true);
  });

  test('records Zhengguan formal-responsibility and career semantics without broadening the T5 facet', () => {
    const source = buildCareerPersonalizationT8Branch2009XuBingxinExactEditionBodyCompatibilityClosureEvidence(acceptedB51()).sourceEvidence;

    expect(source?.exactTenGod).toBe('정관');
    expect(source?.currentT5SemanticKey).toBe('TEN_GOD_JEONG_GWAN_FORMAL_RESPONSIBILITY');
    expect(source?.currentT5Facet).toBe('formal_responsibility');
    expect(source?.semanticTermsObserved).toEqual([
      'task_and_responsibility',
      'law_and_control',
      'administrative_coordination',
      'position_or_office_promotion',
    ]);
    expect(source?.targetCareerSemanticCorrespondenceObserved).toBe(true);
  });

  test('preserves the exact source effect class rather than inventing a flat attenuation delta', () => {
    const report = buildCareerPersonalizationT8Branch2009XuBingxinExactEditionBodyCompatibilityClosureEvidence(acceptedB51());
    const source = report.sourceEvidence;

    expect(source?.natalGuanshaXingChongKePoConditionObserved).toBe(true);
    expect(source?.sourceQualitativeEffectClass).toBe('OFFICIAL_OR_CAREER_ELIGIBILITY_FAILURE_WHEN_USED_GUANSHA_IS_DAMAGED');
    expect(source?.governedFlatAttenuationModeDirectlyEstablished).toBe(false);
    expect(source?.mayConvertCareerEligibilityFailureIntoFlatAttenuation).toBe(false);
    expect(report.careerEligibilityFailureToFlatAttenuationConversionAuthorized).toBe(false);
  });

  test('retains Yongshen strength and configuration dependencies and refuses dependency stripping', () => {
    const report = buildCareerPersonalizationT8Branch2009XuBingxinExactEditionBodyCompatibilityClosureEvidence(acceptedB51());
    const source = report.sourceEvidence;

    expect(source?.sourceSpecificYongshenDependencyObserved).toBe(true);
    expect(source?.sourceSpecificDayMasterStrengthDependencyObserved).toBe(true);
    expect(source?.sourceSpecificConfigurationDependencyObserved).toBe(true);
    expect(source?.sourceSpecificDependencySeparabilityEstablished).toBe(false);
    expect(source?.currentMethodCompatibilityEstablished).toBe(false);
    expect(source?.mayDropYongshenStrengthOrConfigurationDependenciesToForceCompatibility).toBe(false);
    expect(report.sourceMandatoryDependencyDroppingAuthorized).toBe(false);
  });

  test('does not infer normative authority from distinct publication identity', () => {
    const report = buildCareerPersonalizationT8Branch2009XuBingxinExactEditionBodyCompatibilityClosureEvidence(acceptedB51());
    const source = report.sourceEvidence;

    expect(source?.normativeProvenanceIndependenceClaimedByThisGate).toBe(false);
    expect(source?.independentSingleSourceCompletePathEstablished).toBe(false);
    expect(report.normativeProvenanceIndependenceClaimedByThisGate).toBe(false);
    expect(report.publicationMetadataIndependenceInferenceAuthorized).toBe(false);
    expect(report.independentSingleSourceCompletePathEstablished).toBe(false);
  });

  test('preserves all previous closures and the unresolved 2015 exact-body hold', () => {
    const report = buildCareerPersonalizationT8Branch2009XuBingxinExactEditionBodyCompatibilityClosureEvidence(acceptedB51());

    expect(report.prior2004And2016NegativeClosuresPreserved).toBe(true);
    expect(report.prior2015ExactBodyHoldPreserved).toBe(true);
    expect(report.exact2015PrintedTargetPassageBindingEstablished).toBe(false);
    expect(report.exact2015PrintedTargetBodyDirectlyInspected).toBe(false);
    expect(report.repeat2004PathSearchAuthorized).toBe(false);
    expect(report.repeat2016PathSearchAuthorized).toBe(false);
    expect(report.repeat2009XuBingxinPathSearchAuthorized).toBe(false);
    expect(report.repeat2015LineageOnlySearchAuthorized).toBe(false);
    expect(report.exact2015FacsimileOrPageWitnessAcquisitionRemainsEligible).toBe(true);
  });

  test('activates no source or method authority trigger and opens no semantic lane', () => {
    const report = buildCareerPersonalizationT8Branch2009XuBingxinExactEditionBodyCompatibilityClosureEvidence(acceptedB51());

    expect(report.sourceSpecificDependencySeparabilityOrCompletePathTriggerActivated).toBe(false);
    expect(report.methodSpecificInputContractAndUpstreamAuthorityTriggerActivated).toBe(false);
    expect(report.satisfiedOpenAuthorityTriggerCount).toBe(0);
    expect(report.authorityResearchLaneReopenedCount).toBe(0);
    expect(report.immediatelyExecutableAuthorityAdmissionLaneCount).toBe(0);
    expect(report.immediatelyExecutableSemanticRuleLaneCount).toBe(0);
    expect(report.selectedImmediateNextLane).toBeNull();
    expect(report.branchAuthorityHoldActive).toBe(true);
  });

  test('records the third negative published path with zero authority and runtime effects', () => {
    const report = buildCareerPersonalizationT8Branch2009XuBingxinExactEditionBodyCompatibilityClosureEvidence(acceptedB51());

    expect(report.implementationEffects).toEqual({
      exactEditionSourceBodiesAcquired: 1,
      sourcePathsNegativelyClosedForCurrentMethod: 1,
      cumulativeNegativelyClosedIndependentPublishedBranchPaths: 3,
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
    expect(report.controlIds).toEqual(CAREER_T8_B52_2009_EXACT_BODY_CLOSURE_CONTROL_IDS);
    expect(report.controlCount).toBe(16);
    expect(report.controlsFrozen).toBe(true);
  });

  test('preserves all six gaps and prohibits T5 T6 T8 preview and production promotion', () => {
    const report = buildCareerPersonalizationT8Branch2009XuBingxinExactEditionBodyCompatibilityClosureEvidence(acceptedB51());

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
    expect(report.recommendedNextGate).toBe('BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE');
  });

  test('is deterministic for the exact same B51 boundary', () => {
    const first = buildCareerPersonalizationT8Branch2009XuBingxinExactEditionBodyCompatibilityClosureEvidence(acceptedB51());
    const second = buildCareerPersonalizationT8Branch2009XuBingxinExactEditionBodyCompatibilityClosureEvidence(acceptedB51());

    expect(first.evidenceId).toBe(second.evidenceId);
    expect(first).toEqual(second);
  });

  test('fails closed when the B51 content-addressed identity is tampered', () => {
    const b51 = acceptedB51();
    const tampered = { ...b51, evidenceId: `${b51.evidenceId}_tampered` };
    const report = buildCareerPersonalizationT8Branch2009XuBingxinExactEditionBodyCompatibilityClosureEvidence(tampered);

    expect(report.status).toBe('UPSTREAM_B51_BOUNDARY_INVALID');
    expect(report.decision).toBe('BRANCH_2009_XU_BINGXIN_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_NOT_ESTABLISHED');
    expect(report.exactB51BoundaryAccepted).toBe(false);
    expect(report.sourceEvidenceStateChangedSinceB51).toBe(false);
    expect(report.sourceAcquisitionPerformed).toBe(false);
    expect(report.sourceEvidence).toBeNull();
    expect(report.currentMethodIncompatibilityForFlatModifierEstablished).toBe(false);
    expect(report.branchAuthorityHoldActive).toBe(false);
    expect(report.controlCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
    expect(report.recommendedNextGate).toBe('BRANCH_2009_XU_BINGXIN_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE');
  });
});
