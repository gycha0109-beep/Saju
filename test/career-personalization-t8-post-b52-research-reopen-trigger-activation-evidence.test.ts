import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import { buildCareerPersonalizationT8Branch2004ExactEditionBodyCompatibilityClosureEvidence } from '../src/research/career-personalization-t8-branch-2004-exact-edition-body-compatibility-closure-evidence.js';
import { buildCareerPersonalizationT8Branch2009XuBingxinExactEditionBodyCompatibilityClosureEvidence } from '../src/research/career-personalization-t8-branch-2009-xu-bingxin-exact-edition-body-compatibility-closure-evidence.js';
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
import { buildCareerPersonalizationT8PostB52GlobalResearchHoldReview } from '../src/research/career-personalization-t8-post-b52-global-research-hold-review.js';
import {
  CAREER_PERSONALIZATION_T8_POST_B52_RESEARCH_REOPEN_TRIGGER_ACTIVATION_EVIDENCE_VERSION,
  CAREER_T8_B54_CHEN_ZEZHEN_2023_CANDIDATE_EVIDENCE,
  CAREER_T8_B54_REOPEN_SIGNAL_RECORDS,
  CAREER_T8_B54_REOPEN_TRIGGER_CONTROL_IDS,
  buildCareerPersonalizationT8PostB52ResearchReopenTriggerActivationEvidence,
} from '../src/research/career-personalization-t8-post-b52-research-reopen-trigger-activation-evidence.js';

function acceptedB47(): CareerPersonalizationT8BranchTriggerGatedPostP0RemediationReviewReport {
  const material: Omit<CareerPersonalizationT8BranchTriggerGatedPostP0RemediationReviewReport, 'reviewId'> = {
    reviewVersion: CAREER_PERSONALIZATION_T8_BRANCH_TRIGGER_GATED_POST_P0_REMEDIATION_REVIEW_VERSION,
    status: 'RESOLVED_BRANCH_TRIGGER_GATED_POST_P0_REMEDIATION_REVIEW',
    decision: 'ONE_INFRASTRUCTURE_TRIGGER_CLOSED_TWO_AUTHORITY_TRIGGERS_OPEN_ZERO_SEMANTIC_LANES',
    upstreamB46ReviewId: 'b46_fixture_for_b54',
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

function acceptedB53() {
  const b48 = buildCareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidence(acceptedB47());
  const b49 = buildCareerPersonalizationT8Branch2004ExactEditionBodyCompatibilityClosureEvidence(b48);
  const b50 = buildCareerPersonalizationT8Branch2016LuExactEditionBodyCompatibilityClosureEvidence(b49);
  const b51 = buildCareerPersonalizationT8Branch2015ShishenChanweiPublicationLineageAndExactBodyAcquisitionRecheckEvidence(b50);
  const b52 = buildCareerPersonalizationT8Branch2009XuBingxinExactEditionBodyCompatibilityClosureEvidence(b51);
  return buildCareerPersonalizationT8PostB52GlobalResearchHoldReview(b52);
}

describe('Career T8 post-B52 research reopen trigger activation evidence', () => {
  test('accepts exact B53 and opens one targeted acquisition lane from one material signal change', () => {
    const report = buildCareerPersonalizationT8PostB52ResearchReopenTriggerActivationEvidence(acceptedB53());

    expect(report.evidenceVersion).toBe(
      CAREER_PERSONALIZATION_T8_POST_B52_RESEARCH_REOPEN_TRIGGER_ACTIVATION_EVIDENCE_VERSION,
    );
    expect(report.status).toBe('RESOLVED_CAREER_PERSONALIZATION_T8_POST_B52_RESEARCH_REOPEN_TRIGGER_ACTIVATION_EVIDENCE');
    expect(report.decision).toBe(
      'ONE_BRANCH_DIFFERENT_SOURCE_REOPEN_SIGNAL_MATERIALLY_CHANGED_TARGETED_2023_CLASH_BODY_ACQUISITION_LANE_OPENED_ZERO_AUTHORITY_TRIGGER_ACTIVATIONS',
    );
    expect(report.exactB53BoundaryAccepted).toBe(true);
    expect(report.materiallyChangedReopenSignalCount).toBe(1);
    expect(report.changedSignalClass).toBe('BRANCH_DIFFERENT_QUALIFYING_SOURCE_COMPLETE_PATH_SIGNAL');
    expect(report.targetedSourceAcquisitionLaneReopenedCount).toBe(1);
    expect(report.selectedImmediateNextLane).toBe('BRANCH_CHEN_ZEZHEN_2023_TARGET_CLASH_BODY_ACQUISITION');
  });

  test('binds Chen Zezhen 2023 publication identity and directly inspected Zhengguan semantic body', () => {
    const report = buildCareerPersonalizationT8PostB52ResearchReopenTriggerActivationEvidence(acceptedB53());
    const source = report.candidateEvidence;

    expect(source).toEqual(CAREER_T8_B54_CHEN_ZEZHEN_2023_CANDIDATE_EVIDENCE);
    expect(source?.sourceIdentity).toContain('陳澤眞');
    expect(source?.sourceIdentity).toContain('八字命理900問');
    expect(source?.sourceIdentity).toContain('白象文化');
    expect(source?.sourceIdentity).toContain('9786263640641');
    expect(source?.sourceIdentity).toContain('560 pages');
    expect(report.chenZezhen2023ExactPublicationIdentityBound).toBe(true);
    expect(report.chenZezhen2023ZhengguanSemanticBodyDirectlyInspected).toBe(true);
    expect(source?.exactTenGod).toBe('정관');
    expect(source?.currentT5SemanticKey).toBe('TEN_GOD_JEONG_GWAN_FORMAL_RESPONSIBILITY');
    expect(source?.currentT5Facet).toBe('formal_responsibility');
  });

  test('records the same-work Q407-Q422 clash-method acquisition target without treating TOC as normative body', () => {
    const report = buildCareerPersonalizationT8PostB52ResearchReopenTriggerActivationEvidence(acceptedB53());
    const source = report.candidateEvidence;

    expect(source?.sameWorkInteractionChapterObserved).toBe(true);
    expect(source?.interactionChapterTitle).toBe('第十一篇 詳論生剋刑沖會合');
    expect(source?.targetedQuestionNumbers).toEqual([407, 408, 409, 415, 418, 420, 421, 422]);
    expect(source?.targetedQuestionTitles).toContain('相沖一定是兩敗俱傷？');
    expect(source?.targetedQuestionTitles).toContain('「沖去忌神」與「沖去用神」的不同結果如何？');
    expect(source?.targetedQuestionTitles).toContain('相沖有吉有凶，關鍵在何處？');
    expect(report.chenZezhen2023TargetedClashQuestionSequenceObserved).toBe(true);
    expect(report.chenZezhen2023TargetedClashAnswerBodyDirectlyInspected).toBe(false);
    expect(report.tableOfContentsAsNormativeBodyAuthorized).toBe(false);
  });

  test('keeps the independent complete-path authority trigger unsatisfied until same-source answer body is acquired', () => {
    const report = buildCareerPersonalizationT8PostB52ResearchReopenTriggerActivationEvidence(acceptedB53());
    const source = report.candidateEvidence;

    expect(source?.targetedClashMethodBodyAcquired).toBe(false);
    expect(source?.sameSourceQualitativeModificationModeEstablished).toBe(false);
    expect(source?.sameSourceExplicitLimitsAndContextEstablished).toBe(false);
    expect(source?.sameSourceCurrentMethodCompatibilityEstablished).toBe(false);
    expect(source?.independentCompleteSingleSourcePathEstablished).toBe(false);
    expect(report.independentCompleteSingleSourcePathEstablished).toBe(false);
    expect(report.sourceSpecificDependencySeparabilityEstablished).toBe(false);
    expect(report.currentMethodCompatibilityEstablished).toBe(false);
    expect(report.branchSourceSpecificDependencySeparabilityOrCompletePathAuthorityTriggerSatisfied).toBe(false);
    expect(report.branchAuthorityTriggerActivationCount).toBe(0);
  });

  test('changes only the different-source signal while preserving 2015 and method-authority signals', () => {
    const report = buildCareerPersonalizationT8PostB52ResearchReopenTriggerActivationEvidence(acceptedB53());

    expect(report.reopenSignalRecords).toEqual(CAREER_T8_B54_REOPEN_SIGNAL_RECORDS);
    expect(report.reopenSignalRecordCount).toBe(3);
    expect(report.branch2015ExactPrintedTargetBodySignalChanged).toBe(false);
    expect(report.governedMethodAuthoritySignalChanged).toBe(false);
    expect(report.branchMethodSpecificInputContractAndUpstreamAuthorityTriggerSatisfied).toBe(false);
  });

  test('reopens acquisition only, not authority research admission or semantic rule lanes', () => {
    const report = buildCareerPersonalizationT8PostB52ResearchReopenTriggerActivationEvidence(acceptedB53());

    expect(report.targetedSourceAcquisitionLaneReopenedCount).toBe(1);
    expect(report.authorityResearchLaneReopenedCount).toBe(0);
    expect(report.immediatelyExecutableAuthorityAdmissionLaneCount).toBe(0);
    expect(report.immediatelyExecutableSemanticRuleLaneCount).toBe(0);
    expect(report.authorityAdmittedByThisGate).toBe(false);
    expect(report.authorityGapClosedByThisGate).toBe(false);
  });

  test('forbids broad search stitching dependency dropping and effect flattening', () => {
    const report = buildCareerPersonalizationT8PostB52ResearchReopenTriggerActivationEvidence(acceptedB53());

    expect(report.broadBranchSourceSearchRestartAuthorized).toBe(false);
    expect(report.repeatedClosedBranchSurfaceSearchAuthorized).toBe(false);
    expect(report.tableOfContentsAsNormativeBodyAuthorized).toBe(false);
    expect(report.crossSourceStitchingAuthorized).toBe(false);
    expect(report.sourceMandatoryDependencyDroppingAuthorized).toBe(false);
    expect(report.effectClassFlatteningAuthorized).toBe(false);
  });

  test('preserves all six historical gaps and all runtime boundaries', () => {
    const report = buildCareerPersonalizationT8PostB52ResearchReopenTriggerActivationEvidence(acceptedB53());

    expect(report.allSixHistoricalGapsRemainOpen).toBe(true);
    expect(report.unresolvedGapIds).toEqual(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS);
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

  test('freezes B54 controls and records only candidate-signal and targeted-acquisition effects', () => {
    const report = buildCareerPersonalizationT8PostB52ResearchReopenTriggerActivationEvidence(acceptedB53());

    expect(report.controlIds).toEqual(CAREER_T8_B54_REOPEN_TRIGGER_CONTROL_IDS);
    expect(report.controlCount).toBe(14);
    expect(report.controlsFrozen).toBe(true);
    expect(report.implementationEffects).toEqual({
      candidateSourceSignalsRecorded: 1,
      targetedSourceAcquisitionLanesOpened: 1,
      sourceBodiesAcquired: 0,
      authorityTriggersActivated: 0,
      authorityResearchLanesOpened: 0,
      authorityComponentsAdmitted: 0,
      authorityGapsClosed: 0,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
      productionBehaviorsChanged: 0,
    });
    expect(report.recommendedNextGate).toBe('BRANCH_2023_CHEN_ZEZHEN_TARGET_CLASH_BODY_ACQUISITION_EVIDENCE');
  });

  test('is deterministic for the exact same B53 boundary', () => {
    const first = buildCareerPersonalizationT8PostB52ResearchReopenTriggerActivationEvidence(acceptedB53());
    const second = buildCareerPersonalizationT8PostB52ResearchReopenTriggerActivationEvidence(acceptedB53());

    expect(first.evidenceId).toBe(second.evidenceId);
    expect(first).toEqual(second);
  });

  test('fails closed when the B53 content-addressed identity is tampered', () => {
    const b53 = acceptedB53();
    const tampered = { ...b53, reviewId: `${b53.reviewId}_tampered` };
    const report = buildCareerPersonalizationT8PostB52ResearchReopenTriggerActivationEvidence(tampered);

    expect(report.status).toBe('UPSTREAM_B53_BOUNDARY_INVALID');
    expect(report.decision).toBe('POST_B52_RESEARCH_REOPEN_TRIGGER_ACTIVATION_NOT_ESTABLISHED');
    expect(report.exactB53BoundaryAccepted).toBe(false);
    expect(report.candidateEvidence).toBeNull();
    expect(report.reopenSignalRecordCount).toBe(0);
    expect(report.materiallyChangedReopenSignalCount).toBe(0);
    expect(report.targetedSourceAcquisitionLaneReopenedCount).toBe(0);
    expect(report.selectedImmediateNextLane).toBeNull();
    expect(report.controlCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
    expect(report.implementationEffects.candidateSourceSignalsRecorded).toBe(0);
    expect(report.implementationEffects.targetedSourceAcquisitionLanesOpened).toBe(0);
    expect(report.recommendedNextGate).toBe('CAREER_PERSONALIZATION_T8_POST_B52_RESEARCH_REOPEN_TRIGGER_ACTIVATION_EVIDENCE');
  });
});
