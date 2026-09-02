import { describe, expect, it } from 'vitest';
import {
  assertIssuedLipsSubstantialRoleFreeSeparationConstructValidityRequirementsReviewFR100,
  reviewLipsSubstantialRoleFreeSeparationConstructValidityRequirementsFR100,
} from './lips-substantial-role-free-separation-construct-validity-requirements-review-fr100.js';

describe('FR100 lips-substantial construct-validity requirements review', () => {
  it('pins the research target and upstream candidate without admitting traditional binding', () => {
    const review = reviewLipsSubstantialRoleFreeSeparationConstructValidityRequirementsFR100();
    assertIssuedLipsSubstantialRoleFreeSeparationConstructValidityRequirementsReviewFR100(review);

    expect(review.upstreamAuthority).toMatchObject({
      candidateMetricRef: 'neutral.mouth.contour_set.symmetric_arclength_mean_nearest_set_distance@0.1.0',
      candidateRelationClass: 'role_free_whole_contour_separation_proxy_candidate_only',
      researchCandidateInventoryAdmitted: true,
      traditionalMetricBindingAdmitted: false,
      directTraditionalConstructMatchEstablished: false,
      constructValidityEvidenceRequiredBeforeProxyBinding: true,
      sourceVerificationStatus: 'unverified_ocr',
      methodologyReviewStatus: 'research',
    });
    expect(review.targetConstruct).toMatchObject({
      criterionId: 'criterion.intake.lips_substantial',
      sourceConcept: '端厚',
      methodologyRef: 'method.shenxiang.five_officers@0.1.0',
      traditionalSourceRef: 'passage.shenxiang.five_officers.intake',
      operationalizationScope: 'criterion_specific_research_proxy_validation_only',
      anatomicalLipThicknessConstructIssued: false,
      physicalLipThicknessConstructIssued: false,
      monotonicMetricDirectionAuthorized: false,
    });
  });

  it('requires blinded criterion-specific labeling without metric-derived labels', () => {
    const review = reviewLipsSubstantialRoleFreeSeparationConstructValidityRequirementsFR100();
    const labeling = review.labelingRequirements;

    expect(labeling.criterionSpecificInstructionArtifactRequired).toBe(true);
    expect(labeling.instructionMustReferenceTraditionalSourceAndMethodology).toBe(true);
    expect(labeling.labelSetRequired).toEqual(['met', 'not_met', 'abstain']);
    expect(labeling.independentInitialLabelsRequired).toBe(true);
    expect(labeling.abstentionRequired).toBe(true);
    expect(labeling.reviewersBlindToMetricValuesRequired).toBe(true);
    expect(labeling.reviewersBlindToCandidateThresholdRequired).toBe(true);
    expect(labeling.reviewersBlindToPeerLabelsRequired).toBe(true);
    expect(labeling.reviewersBlindToFortuneOutputRequired).toBe(true);
    expect(labeling.metricDerivedLabelsForbidden).toBe(true);
    expect(labeling.sourceScanCheckedBeforeHumanCollectionAuthorizationRequired).toBe(true);
    expect(labeling.methodologyReviewedBeforeHumanCollectionAuthorizationRequired).toBe(true);
  });

  it('requires repeat-capture stability and participant-level holdout separation without physical-thickness authority', () => {
    const review = reviewLipsSubstantialRoleFreeSeparationConstructValidityRequirementsFR100();

    expect(review.captureAndStabilityRequirements).toMatchObject({
      governedPoseNormalizedGeometryRequired: true,
      captureQualityPolicyRequired: true,
      repeatCaptureStabilityEvidenceRequired: true,
      independentRecaptureRequired: true,
      participantPolicy: 'consented_pseudonymous',
      sourceImageTrainingReuseAllowed: false,
      identityEmbeddingAllowed: false,
      physicalAnthropometricReferenceMeasurementRequired: false,
      physicalAnthropometricReferenceMeasurementAuthorizedByThisReview: false,
      newCaptureAcceptanceThresholdIssued: false,
    });
    expect(review.datasetSeparationRequirements).toEqual({
      participantLevelSelectionHoldoutSplitRequired: true,
      participantLeakageAllowed: false,
      captureFamilyLeakageAllowed: false,
      thresholdSelectionMayReadHoldout: false,
      finalHoldoutEvaluationRequiredBeforeAnyFutureThresholdPromotion: true,
    });
  });

  it('requires stability plus blinded-expert evidence while leaving numerical acceptance choices unissued', () => {
    const review = reviewLipsSubstantialRoleFreeSeparationConstructValidityRequirementsFR100();
    const evidence = review.constructValidityEvidenceRequirements;

    expect(evidence.requiredBeforeProxyBinding).toEqual([
      'repeat_capture_stability',
      'blinded_expert_operationalization',
    ]);
    expect(evidence.repeatCaptureStabilityMustUseSameMetricDefinition).toBe(true);
    expect(evidence.blindedExpertOperationalizationMustUseCriterionSpecificLabels).toBe(true);
    expect(evidence.candidateMetricMustRemainHiddenDuringLabeling).toBe(true);
    expect(evidence.evidenceMustLinkMetricRefAndCriterionId).toBe(true);
    expect(evidence.evidenceMustCarryDatasetAndProvenanceRefs).toBe(true);
    expect(evidence.empiricalAssociationMustBeEvaluatedWithoutAssumingThicknessSemantics).toBe(true);
    expect(evidence.metricDirectionMayBeChosenFromTraditionalTextWithoutEvidence).toBe(false);
    expect(evidence.metricDirectionMayBeChosenPostHocOnHoldout).toBe(false);
    expect(evidence.numericAssociationAcceptanceThresholdIssued).toBe(false);
    expect(evidence.minimumSampleSizeIssued).toBe(false);
    expect(evidence.effectSizeRequirementIssued).toBe(false);
    expect(evidence.proxyConstructValidityEvidenceIssued).toBe(false);
  });

  it('issues requirements only and recommends a blocked protocol review next', () => {
    const review = reviewLipsSubstantialRoleFreeSeparationConstructValidityRequirementsFR100();

    expect(review.requirementsReviewed).toBe(true);
    expect(review.protocolDefinitionsIssued).toBe(0);
    expect(review.supportArtifactsIssued).toBe(0);
    expect(review.humanDataCollectionAuthorized).toBe(false);
    expect(review.constructValidityEvidenceIssued).toBe(0);
    expect(review.calibrationEvidenceIssued).toBe(0);
    expect(review.calibrationRefsIssued).toBe(0);
    expect(review.thresholdRefsIssued).toBe(0);
    expect(review.traditionalMetricBindingsIssued).toBe(0);
    expect(review.anatomicalRolesIssued).toBe(0);
    expect(review.crossContourCorrespondencePairsIssued).toBe(0);
    expect(review.thicknessMetricIssued).toBe(false);
    expect(review.physicalAnthropometricInterpretationAuthorized).toBe(false);
    expect(review.morphologyProduced).toBe(false);
    expect(review.criterionStatesIssued).toBe(0);
    expect(review.claimsIssued).toBe(0);
    expect(review.traditionalSemanticAuthority).toBe(false);
    expect(review.resolvedProcessGap).toBe(
      'lips_substantial_role_free_separation_metric_construct_validity_requirements_not_reviewed',
    );
    expect(review.recommendedNextFrontier.frontierKey).toBe(
      'lips_substantial_role_free_separation_metric_construct_validity_protocol_review',
    );
    expect(review.recommendedNextFrontier.blockedResearchProtocolMayBeReviewedNext).toBe(true);
    expect(review.recommendedNextFrontier.humanDataCollectionAuthorizationAllowed).toBe(false);
  });
});
