import { describe, expect, it } from 'vitest';
import {
  assertIssuedLipsSubstantialRoleFreeSeparationConstructValidityRequirementsReviewFR100,
  reviewLipsSubstantialRoleFreeSeparationConstructValidityRequirementsFR100,
  type LipsSubstantialRoleFreeSeparationConstructValidityRequirementsReviewFR100V1,
} from './lips-substantial-role-free-separation-construct-validity-requirements-review-fr100.js';

describe('FR100 lips-substantial construct-validity requirements hardening', () => {
  it('rejects structurally plausible but unissued requirements artifacts', () => {
    const forged = {
      schemaVersion: 'fr100-lips-substantial-role-free-separation-construct-validity-requirements-review-v1',
      authorityState: 'lips_substantial_role_free_separation_construct_validity_requirements_review_completed_no_protocol_or_evidence_issued',
      upstreamAuthority: {
        candidateMetricRef: 'neutral.mouth.contour_set.symmetric_arclength_mean_nearest_set_distance@0.1.0',
        traditionalMetricBindingAdmitted: false,
      },
      targetConstruct: {
        anatomicalLipThicknessConstructIssued: false,
        monotonicMetricDirectionAuthorized: false,
      },
      requirementsReviewed: true,
      protocolDefinitionsIssued: 0,
      humanDataCollectionAuthorized: false,
      constructValidityEvidenceIssued: 0,
      calibrationRefsIssued: 0,
      thresholdRefsIssued: 0,
      traditionalMetricBindingsIssued: 0,
      thicknessMetricIssued: false,
      criterionStatesIssued: 0,
      claimsIssued: 0,
      traditionalSemanticAuthority: false,
      recommendedNextFrontier: {
        frontierKey: 'lips_substantial_role_free_separation_metric_construct_validity_protocol_review',
      },
    } as unknown as LipsSubstantialRoleFreeSeparationConstructValidityRequirementsReviewFR100V1;

    expect(() => assertIssuedLipsSubstantialRoleFreeSeparationConstructValidityRequirementsReviewFR100(forged))
      .toThrow(/not issued by the active FR-100 boundary/u);
  });

  it('does not turn requirements or protocol design into human collection authority', () => {
    const review = reviewLipsSubstantialRoleFreeSeparationConstructValidityRequirementsFR100();

    expect(review.authorityBoundary.requirementsReviewMeansProtocolIssued).toBe(false);
    expect(review.authorityBoundary.protocolDesignMeansHumanCollectionAuthorized).toBe(false);
    expect(review.humanDataCollectionAuthorized).toBe(false);
    expect(review.frameworkAlignment.thisReviewCreatesCalibrationRegistryEntry).toBe(false);
    expect(review.protocolDefinitionsIssued).toBe(0);
    expect(review.supportArtifactsIssued).toBe(0);
    expect(review.newlyExposedPrerequisiteBlockers).toEqual([
      'lips_substantial_role_free_separation_metric_construct_validity_protocol_not_issued',
      'lips_substantial_criterion_labeling_instruction_not_issued',
    ]);
  });

  it('keeps proxy validation separate from anatomical, physical, traditional and threshold semantics', () => {
    const review = reviewLipsSubstantialRoleFreeSeparationConstructValidityRequirementsFR100();

    expect(review.authorityBoundary.researchProxyValidationMeansAnatomicalThicknessValidation).toBe(false);
    expect(review.authorityBoundary.researchProxyValidationMeansPhysicalAnthropometry).toBe(false);
    expect(review.authorityBoundary.repeatCaptureStabilityMeansTraditionalConstructValidity).toBe(false);
    expect(review.authorityBoundary.blindedExpertLabelsMeanTraditionalBinding).toBe(false);
    expect(review.authorityBoundary.empiricalAssociationMeansCausalOrAnatomicalIdentity).toBe(false);
    expect(review.authorityBoundary.constructValidityEvidenceMeansThreshold).toBe(false);
    expect(review.authorityBoundary.constructValidityEvidenceMeansCriterionState).toBe(false);
    expect(review.targetConstruct.monotonicMetricDirectionAuthorized).toBe(false);
    expect(review.constructValidityEvidenceRequirements.metricDirectionMayBeChosenPostHocOnHoldout).toBe(false);
    expect(review.calibrationSeparation.thresholdSelectionAuthorizedNow).toBe(false);
    expect(review.calibrationSeparation.calibrationDefinitionAuthorizedNow).toBe(false);
    expect(review.calibrationSeparation.criterionStateIssuanceAuthorizedNow).toBe(false);
  });

  it('fails authority closed while the source and methodology gates remain unopened', () => {
    const review = reviewLipsSubstantialRoleFreeSeparationConstructValidityRequirementsFR100();

    expect(review.upstreamAuthority.sourceVerificationStatus).toBe('unverified_ocr');
    expect(review.upstreamAuthority.methodologyReviewStatus).toBe('research');
    expect(review.labelingRequirements.sourceScanCheckedBeforeHumanCollectionAuthorizationRequired).toBe(true);
    expect(review.labelingRequirements.methodologyReviewedBeforeHumanCollectionAuthorizationRequired).toBe(true);
    expect(review.authorityBoundary.unverifiedOcrMayAuthorizeHumanCalibrationCollection).toBe(false);
    expect(review.remainingBlockers).toContain('five_officers_source_not_scan_checked');
    expect(review.remainingBlockers).toContain('five_officers_methodology_research_only');
    expect(review.remainingBlockers).toContain(
      'lips_substantial_role_free_separation_metric_construct_validity_evidence_absent',
    );
  });

  it('pins the anti-shortcut set and leaves every downstream output unissued', () => {
    const review = reviewLipsSubstantialRoleFreeSeparationConstructValidityRequirementsFR100();

    expect(review.prohibitedShortcuts).toEqual([
      'construct_validity_requirements_to_protocol_issuance',
      'protocol_design_to_human_data_collection_authority',
      'repeat_capture_stability_to_traditional_construct_validity',
      'blinded_expert_labels_to_traditional_binding',
      'role_free_metric_association_to_anatomical_lip_thickness',
      'role_free_metric_association_to_physical_lip_thickness',
      'empirical_association_to_metric_direction_without_preregistered_rule',
      'construct_validity_evidence_to_calibration_threshold',
      'construct_validity_evidence_to_criterion_state',
      'unverified_ocr_to_human_calibration_collection_authority',
    ]);
    expect(review.constructValidityEvidenceIssued).toBe(0);
    expect(review.calibrationEvidenceIssued).toBe(0);
    expect(review.calibrationRefsIssued).toBe(0);
    expect(review.thresholdRefsIssued).toBe(0);
    expect(review.traditionalMetricBindingsIssued).toBe(0);
    expect(review.anatomicalRolesIssued).toBe(0);
    expect(review.crossContourCorrespondencePairsIssued).toBe(0);
    expect(review.thicknessMetricIssued).toBe(false);
    expect(review.morphologyProduced).toBe(false);
    expect(review.criterionStatesIssued).toBe(0);
    expect(review.claimsIssued).toBe(0);
    expect(review.traditionalSemanticAuthority).toBe(false);
  });
});
