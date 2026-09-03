import { describe, expect, it } from 'vitest';
import { validateFaceCalibrationProtocolRegistry } from './calibration-protocol.js';
import { FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0 } from './five-officers-six-fus-research-v0.js';
import {
  FACE_LIPS_SUBSTANTIAL_CONSTRUCT_VALIDITY_PROTOCOL_RESEARCH_FR101,
  assertIssuedLipsSubstantialRoleFreeSeparationConstructValidityProtocolReviewFR101,
  reviewLipsSubstantialRoleFreeSeparationConstructValidityProtocolFR101,
} from './lips-substantial-role-free-separation-construct-validity-protocol-review-fr101.js';

const METRIC_REF = 'neutral.mouth.contour_set.symmetric_arclength_mean_nearest_set_distance@0.1.0';

describe('FR101 lips substantial construct-validity protocol review', () => {
  it('issues the criterion-specific blocked research protocol through the active registry validator', () => {
    const review = reviewLipsSubstantialRoleFreeSeparationConstructValidityProtocolFR101();
    assertIssuedLipsSubstantialRoleFreeSeparationConstructValidityProtocolReviewFR101(review);

    expect(review.authorityState).toBe(
      'lips_substantial_role_free_separation_construct_validity_protocol_review_completed_blocked_research_protocol_issued_no_collection_authority',
    );
    expect(review.protocolMaterialization.supportArtifactsIssued).toBe(3);
    expect(review.protocolMaterialization.captureProtocolsIssued).toBe(1);
    expect(review.protocolMaterialization.labelingProtocolsIssued).toBe(1);
    expect(review.protocolMaterialization.splitPoliciesIssued).toBe(1);
    expect(review.protocolMaterialization.blockedResearchStudiesIssued).toBe(1);
    expect(review.protocolMaterialization.criterionSpecificLabelingInstructionIssued).toBe(true);

    validateFaceCalibrationProtocolRegistry(review.issuedProtocolRegistry, {
      faceAuthorityRegistry: FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0,
      knownNeutralMetricRefs: new Set([METRIC_REF]),
    });
  });

  it('keeps the study blocked by current source, methodology, and linked protocol gates', () => {
    const review = reviewLipsSubstantialRoleFreeSeparationConstructValidityProtocolFR101();
    const study = review.issuedProtocolRegistry.studies[0]!;

    expect(study.executionState).toBe('blocked');
    expect(study.status).toBe('research');
    expect(review.executionGate.currentSourceGateOpen).toBe(false);
    expect(review.executionGate.currentMethodologyGateOpen).toBe(false);
    expect(review.executionGate.currentProtocolGateOpen).toBe(false);
    expect(review.humanDataCollectionAuthorized).toBe(false);
  });

  it('materializes blinded criterion-specific labeling and participant-level holdout separation', () => {
    const registry = FACE_LIPS_SUBSTANTIAL_CONSTRUCT_VALIDITY_PROTOCOL_RESEARCH_FR101;
    const instruction = registry.supportArtifacts.find((item) => item.kind === 'labeling_instruction');
    const labeling = registry.labelingProtocols[0]!;
    const split = registry.splitPolicies[0]!;

    expect(instruction?.criterionId).toBe('criterion.intake.lips_substantial');
    expect(instruction?.traditionalSourceRefs).toEqual(['passage.shenxiang.five_officers.intake']);
    expect(instruction?.reviewerMustNotSee).toEqual([
      'metric_values',
      'candidate_threshold',
      'peer_labels',
      'fortune_output',
    ]);
    expect(labeling.labelSet).toEqual(['met', 'not_met', 'abstain']);
    expect(labeling.reviewerPlan.independentInitialLabels).toBe(true);
    expect(labeling.reviewerPlan.allowAbstain).toBe(true);
    expect(split.splitUnit).toBe('participant');
    expect(split.participantLeakageAllowed).toBe(false);
    expect(split.captureFamilyLeakageAllowed).toBe(false);
    expect(split.thresholdSelectionMayReadHoldout).toBe(false);
  });

  it('classifies numeric research design parameters separately from traditional and calibration thresholds', () => {
    const review = reviewLipsSubstantialRoleFreeSeparationConstructValidityProtocolFR101();

    expect(review.researchDesignParameters).toMatchObject({
      sessionsPerParticipant: 2,
      acceptedCapturesPerSession: 2,
      reviewersPerItem: 3,
      minNonAbstainLabels: 2,
      status: 'research_framework_design_parameters_not_traditional_or_calibration_thresholds',
      traditionalSourceDerived: false,
      anatomicalThicknessDerived: false,
      calibrationThresholds: false,
      productCriterionThresholds: false,
    });
    expect(review.researchDesignParameters.minAgreementFraction).toBeCloseTo(2 / 3);
    expect(review.thresholdRefsIssued).toBe(0);
  });

  it('issues no evidence, thickness semantics, traditional binding, criterion state, or claims', () => {
    const review = reviewLipsSubstantialRoleFreeSeparationConstructValidityProtocolFR101();

    expect(review.constructValidityEvidenceIssued).toBe(0);
    expect(review.calibrationEvidenceIssued).toBe(0);
    expect(review.calibrationRefsIssued).toBe(0);
    expect(review.thresholdRefsIssued).toBe(0);
    expect(review.traditionalMetricBindingsIssued).toBe(0);
    expect(review.thicknessMetricIssued).toBe(false);
    expect(review.physicalAnthropometricInterpretationAuthorized).toBe(false);
    expect(review.criterionStatesIssued).toBe(0);
    expect(review.claimsIssued).toBe(0);
    expect(review.traditionalSemanticAuthority).toBe(false);
  });
});
