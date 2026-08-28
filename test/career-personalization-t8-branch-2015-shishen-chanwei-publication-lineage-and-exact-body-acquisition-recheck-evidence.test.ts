import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from '../src/research/career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  buildCareerPersonalizationT8Branch2004ExactEditionBodyCompatibilityClosureEvidence,
} from '../src/research/career-personalization-t8-branch-2004-exact-edition-body-compatibility-closure-evidence.js';
import {
  buildCareerPersonalizationT8Branch2016LuExactEditionBodyCompatibilityClosureEvidence,
} from '../src/research/career-personalization-t8-branch-2016-lu-exact-edition-body-compatibility-closure-evidence.js';
import {
  CAREER_PERSONALIZATION_T8_BRANCH_2015_SHISHEN_CHANWEI_PUBLICATION_LINEAGE_AND_EXACT_BODY_ACQUISITION_RECHECK_EVIDENCE_VERSION,
  CAREER_T8_B51_2015_LINEAGE_RECHECK_CONTROL_IDS,
  CAREER_T8_B51_SHISHEN_CHANWEI_2015_LINEAGE_RECHECK_EVIDENCE,
  buildCareerPersonalizationT8Branch2015ShishenChanweiPublicationLineageAndExactBodyAcquisitionRecheckEvidence,
} from '../src/research/career-personalization-t8-branch-2015-shishen-chanwei-publication-lineage-and-exact-body-acquisition-recheck-evidence.js';
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
    upstreamB46ReviewId: 'b46_fixture_for_b51',
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

function acceptedB50() {
  const b48 = buildCareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidence(acceptedB47());
  const b49 = buildCareerPersonalizationT8Branch2004ExactEditionBodyCompatibilityClosureEvidence(b48);
  return buildCareerPersonalizationT8Branch2016LuExactEditionBodyCompatibilityClosureEvidence(b49);
}

describe('Career T8 Branch 2015 Shishen Chanwei publication-lineage and exact-body acquisition recheck evidence', () => {
  test('accepts exact B50 and records a provenance-state change without claiming exact printed-body acquisition', () => {
    const report = buildCareerPersonalizationT8Branch2015ShishenChanweiPublicationLineageAndExactBodyAcquisitionRecheckEvidence(
      acceptedB50(),
    );

    expect(report.evidenceVersion).toBe(
      CAREER_PERSONALIZATION_T8_BRANCH_2015_SHISHEN_CHANWEI_PUBLICATION_LINEAGE_AND_EXACT_BODY_ACQUISITION_RECHECK_EVIDENCE_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_BRANCH_2015_SHISHEN_CHANWEI_PUBLICATION_LINEAGE_AND_EXACT_BODY_ACQUISITION_RECHECK_EVIDENCE',
    );
    expect(report.decision).toBe(
      '2015_PUBLICATION_AUTHOR_ORGANIZER_LINEAGE_STRENGTHENED_EXACT_PRINTED_TARGET_BODY_STILL_UNACQUIRED_ZERO_AUTHORITY_TRIGGER_ACTIVATIONS',
    );
    expect(report.exactB50BoundaryAccepted).toBe(true);
    expect(report.sourceEvidenceStateChangedSinceB50).toBe(true);
    expect(report.publicationLineageResearchPerformed).toBe(true);
    expect(report.exact2015PrintedTargetPassageBindingEstablished).toBe(false);
    expect(report.exact2015PrintedTargetBodyDirectlyInspected).toBe(false);
  });

  test('pins the 2015 publication identity and author-organizer lineage', () => {
    const source = buildCareerPersonalizationT8Branch2015ShishenChanweiPublicationLineageAndExactBodyAcquisitionRecheckEvidence(
      acceptedB50(),
    ).sourceEvidence;

    expect(source).toEqual(CAREER_T8_B51_SHISHEN_CHANWEI_2015_LINEAGE_RECHECK_EVIDENCE);
    expect(source?.publicationIdentity).toContain('楊逸雲');
    expect(source?.publicationIdentity).toContain('李修梵');
    expect(source?.publicationIdentity).toContain('9789881412041');
    expect(source?.publicationIdentity).toContain('108 pages');
    expect(source?.underlyingAuthorAttribution).toBe('楊逸雲');
    expect(source?.organizerAttribution).toBe('李修梵');
    expect(source?.authorOrganizerLineageStrengthened).toBe(true);
  });

  test('does not infer independent normative provenance from publisher ISBN or organizer metadata', () => {
    const report = buildCareerPersonalizationT8Branch2015ShishenChanweiPublicationLineageAndExactBodyAcquisitionRecheckEvidence(
      acceptedB50(),
    );
    const source = report.sourceEvidence;

    expect(source?.organizerPublicationMetadataMayCreateIndependentNormativeAuthority).toBe(false);
    expect(source?.mayTreatDistinct2015PublicationMetadataAsIndependentNormativeSource).toBe(false);
    expect(report.publicationMetadataIndependenceInferenceAuthorized).toBe(false);
    expect(report.independentSingleSourceCompletePathEstablished).toBe(false);
  });

  test('keeps underlying attributed full text separate from an exact 2015 printed witness', () => {
    const report = buildCareerPersonalizationT8Branch2015ShishenChanweiPublicationLineageAndExactBodyAcquisitionRecheckEvidence(
      acceptedB50(),
    );
    const source = report.sourceEvidence;

    expect(source?.underlyingAttributedFullTextWitnessObserved).toBe(true);
    expect(source?.exact2015PrintedTargetPassageBindingEstablished).toBe(false);
    expect(source?.exact2015PrintedTargetBodyDirectlyInspected).toBe(false);
    expect(source?.editionToUnderlyingTextExactTargetContinuityEstablished).toBe(false);
    expect(source?.maySubstituteUnderlyingWebTextForExact2015PrintedTargetWitness).toBe(false);
    expect(report.webTextSubstitutionForExactPrintedWitnessAuthorized).toBe(false);
  });

  test('preserves Zhengguan relevance and mandatory strength xiji dependencies without compatibility promotion', () => {
    const report = buildCareerPersonalizationT8Branch2015ShishenChanweiPublicationLineageAndExactBodyAcquisitionRecheckEvidence(
      acceptedB50(),
    );
    const source = report.sourceEvidence;

    expect(source?.exactTenGod).toBe('정관');
    expect(source?.currentT5SemanticKey).toBe('TEN_GOD_JEONG_GWAN_FORMAL_RESPONSIBILITY');
    expect(source?.targetMechanismMaterialObservedInUnderlyingLineage).toBe(true);
    expect(source?.underlyingLineageStrengthOrWangshuaiDependencyObserved).toBe(true);
    expect(source?.underlyingLineageXijiDependencyObserved).toBe(true);
    expect(source?.sourceSpecificDependencySeparabilityEstablished).toBe(false);
    expect(source?.qualitativeAttenuationModeExact2015PrintedBodyEstablished).toBe(false);
    expect(source?.currentMethodCompatibilityEstablished).toBe(false);
    expect(report.currentMethodIncompatibilityEstablishedByThisGate).toBe(false);
  });

  test('activates neither open authority trigger and opens no semantic lane', () => {
    const report = buildCareerPersonalizationT8Branch2015ShishenChanweiPublicationLineageAndExactBodyAcquisitionRecheckEvidence(
      acceptedB50(),
    );

    expect(report.sourceSpecificDependencySeparabilityOrCompletePathTriggerActivated).toBe(false);
    expect(report.methodSpecificInputContractAndUpstreamAuthorityTriggerActivated).toBe(false);
    expect(report.satisfiedOpenAuthorityTriggerCount).toBe(0);
    expect(report.authorityResearchLaneReopenedCount).toBe(0);
    expect(report.immediatelyExecutableAuthorityAdmissionLaneCount).toBe(0);
    expect(report.immediatelyExecutableSemanticRuleLaneCount).toBe(0);
    expect(report.selectedImmediateNextLane).toBeNull();
    expect(report.branchAuthorityHoldActive).toBe(true);
  });

  test('preserves B49 and B50 negative closures while keeping only materially new 2015 acquisition eligible', () => {
    const report = buildCareerPersonalizationT8Branch2015ShishenChanweiPublicationLineageAndExactBodyAcquisitionRecheckEvidence(
      acceptedB50(),
    );

    expect(report.prior2004And2016NegativeClosuresPreserved).toBe(true);
    expect(report.repeat2004PathSearchAuthorized).toBe(false);
    expect(report.repeat2016PathSearchAuthorized).toBe(false);
    expect(report.repeat2015LineageOnlySearchAuthorized).toBe(false);
    expect(report.exact2015FacsimileOrPageWitnessAcquisitionRemainsEligible).toBe(true);
    expect(report.differentQualifyingSourceSignalRemainsEligible).toBe(true);
    expect(report.governedMethodAuthoritySignalRemainsEligible).toBe(true);
    expect(report.implementationEffects.cumulativeNegativelyClosedIndependentPublishedBranchPaths).toBe(2);
  });

  test('preserves all six gaps personalized preview hold and production boundary', () => {
    const report = buildCareerPersonalizationT8Branch2015ShishenChanweiPublicationLineageAndExactBodyAcquisitionRecheckEvidence(
      acceptedB50(),
    );

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

  test('freezes B51 controls and records zero authority or runtime implementation effects', () => {
    const report = buildCareerPersonalizationT8Branch2015ShishenChanweiPublicationLineageAndExactBodyAcquisitionRecheckEvidence(
      acceptedB50(),
    );

    expect(report.controlIds).toEqual(CAREER_T8_B51_2015_LINEAGE_RECHECK_CONTROL_IDS);
    expect(report.controlCount).toBe(15);
    expect(report.controlsFrozen).toBe(true);
    expect(report.implementationEffects).toEqual({
      publicationLineagesStrengthened: 1,
      exactPrintedTargetBodiesAcquired: 0,
      newlyNegativelyClosedSourcePaths: 0,
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

  test('is deterministic for the exact same B50 boundary', () => {
    const first = buildCareerPersonalizationT8Branch2015ShishenChanweiPublicationLineageAndExactBodyAcquisitionRecheckEvidence(
      acceptedB50(),
    );
    const second = buildCareerPersonalizationT8Branch2015ShishenChanweiPublicationLineageAndExactBodyAcquisitionRecheckEvidence(
      acceptedB50(),
    );

    expect(first.evidenceId).toBe(second.evidenceId);
    expect(first).toEqual(second);
  });

  test('fails closed when B50 content-addressed identity is tampered', () => {
    const b50 = acceptedB50();
    const tampered = { ...b50, evidenceId: `${b50.evidenceId}_tampered` };
    const report = buildCareerPersonalizationT8Branch2015ShishenChanweiPublicationLineageAndExactBodyAcquisitionRecheckEvidence(
      tampered,
    );

    expect(report.status).toBe('UPSTREAM_B50_BOUNDARY_INVALID');
    expect(report.decision).toBe('BRANCH_2015_SHISHEN_CHANWEI_PUBLICATION_LINEAGE_RECHECK_NOT_ESTABLISHED');
    expect(report.exactB50BoundaryAccepted).toBe(false);
    expect(report.sourceEvidenceStateChangedSinceB50).toBe(false);
    expect(report.publicationLineageResearchPerformed).toBe(false);
    expect(report.sourceEvidence).toBeNull();
    expect(report.branchAuthorityHoldActive).toBe(false);
    expect(report.controlCount).toBe(0);
    expect(report.controlsFrozen).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'BRANCH_2015_SHISHEN_CHANWEI_PUBLICATION_LINEAGE_AND_EXACT_BODY_ACQUISITION_RECHECK_EVIDENCE',
    );
  });
});
