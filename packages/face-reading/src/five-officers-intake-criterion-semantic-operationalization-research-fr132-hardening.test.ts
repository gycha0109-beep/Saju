import { describe, expect, it } from 'vitest';
import {
  assessFiveOfficerIntakeCriterionSemanticOperationalizationResearchFR132,
  assertIssuedFiveOfficerIntakeCriterionSemanticOperationalizationResearchFR132,
  type FiveOfficerIntakeCriterionSemanticOperationalizationResearchFR132V1,
} from './five-officers-intake-criterion-semantic-operationalization-research-fr132.js';

describe('FR132 intake criterion semantic operationalization research hardening', () => {
  it('rejects a forged artifact even when visible fields are copied', () => {
    const issued = assessFiveOfficerIntakeCriterionSemanticOperationalizationResearchFR132();
    const forged = structuredClone(issued) as FiveOfficerIntakeCriterionSemanticOperationalizationResearchFR132V1;
    expect(() => assertIssuedFiveOfficerIntakeCriterionSemanticOperationalizationResearchFR132(forged)).toThrow(/FR-132/);
  });

  it('does not convert external research comparanda into governed source authority', () => {
    const value = assessFiveOfficerIntakeCriterionSemanticOperationalizationResearchFR132();
    expect(value.researchComparanda.every((item) => item.authorityStatus === 'research_only_unverified_for_project_authority')).toBe(true);
    expect(value.authorityBoundary.contextualComparandumMeansGovernedSourceAuthority).toBe(false);
    expect(value.governedSource.verificationStatus).toBe('scan_checked');
    expect(value.governedSource.passageRef).toBe('passage.shenxiang.five_officers.intake.nlc_1925');
  });

  it('does not treat analytical token decomposition as authoritative historical punctuation or segmentation', () => {
    const value = assessFiveOfficerIntakeCriterionSemanticOperationalizationResearchFR132();
    expect(value.semanticFindings.compoundSegmentationAuthoritative).toBe(false);
    expect(value.authorityBoundary.lexicalDecompositionMeansTraditionalMetricBinding).toBe(false);
  });

  it('blocks all current neutral-metric semantic shortcuts', () => {
    const value = assessFiveOfficerIntakeCriterionSemanticOperationalizationResearchFR132();
    expect(value.neutralMetricAssessment.fr80CanProveTraditionalFang).toBe(false);
    expect(value.neutralMetricAssessment.fr82CanProveTraditionalDa).toBe(false);
    expect(value.neutralMetricAssessment.fr82DenominatorHasAnatomicalFaceWidthRole).toBe(false);
    expect(value.neutralMetricAssessment.fr97CanBeInterpretedAsLipThickness).toBe(false);
    expect(value.neutralMetricAssessment.existingNeutralMetricsSufficientForAnyTraditionalCriterionState).toBe(false);
    expect(value.authorityBoundary.candidateNeutralMetricMeansTraditionalConstruct).toBe(false);
    expect(value.authorityBoundary.imageObservabilityMeansConstructValidity).toBe(false);
  });

  it('keeps approval, threshold, state, claim and narrative authority closed', () => {
    const value = assessFiveOfficerIntakeCriterionSemanticOperationalizationResearchFR132();
    expect(value.promotionStatus.targetSpecificApprovalExplicitlyDeferred).toBe(true);
    expect(value.promotionStatus.methodologyReviewDecisionRecordsIssued).toBe(0);
    expect(value.promotionStatus.reviewedMethodologyDefinitionsIssued).toBe(0);
    expect(value.execution.traditionalMetricBindingsIssued).toBe(0);
    expect(value.execution.calibrationProtocolsIssued).toBe(0);
    expect(value.execution.thresholdsIssued).toBe(0);
    expect(value.execution.criterionStatesIssued).toBe(0);
    expect(value.execution.structuredClaimsIssued).toBe(0);
    expect(value.execution.boundedNarrativesIssued).toBe(0);
    expect(value.execution.traditionalSemanticAuthority).toBe(false);
    expect(value.authorityBoundary.semanticResearchMeansReviewedPromotion).toBe(false);
    expect(value.authorityBoundary.researchFindingMeansThreshold).toBe(false);
    expect(value.authorityBoundary.researchFindingMeansCriterionState).toBe(false);
  });
});
