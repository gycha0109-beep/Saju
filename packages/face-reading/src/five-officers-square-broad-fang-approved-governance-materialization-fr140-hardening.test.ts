import { describe, expect, it } from 'vitest';
import type { SquareBroadFangApprovedGovernanceMaterializationFR140V1 } from './five-officers-square-broad-fang-approved-governance-materialization-fr140.js';
import {
  FACE_AUTHORITY_FR140_INTAKE_CRITERION_METHODOLOGY_REVIEWED_REGISTRY,
  assertIssuedSquareBroadFangApprovedGovernanceFR140,
  materializeSquareBroadFangApprovedGovernanceFR140,
} from './five-officers-square-broad-fang-approved-governance-materialization-fr140.js';
import { FaceAuthorityValidationError } from './validation.js';

describe('FR140 square-broad 方 approved governance hardening', () => {
  it('rejects a forged issued artifact', () => {
    const issued = materializeSquareBroadFangApprovedGovernanceFR140();
    const forged = {
      ...issued,
      target: { ...issued.target },
    } as SquareBroadFangApprovedGovernanceMaterializationFR140V1;

    expect(() => assertIssuedSquareBroadFangApprovedGovernanceFR140(forged)).toThrow(
      FaceAuthorityValidationError,
    );
  });

  it('does not collapse reviewed methodology status into semantic or numeric authority', () => {
    const result = materializeSquareBroadFangApprovedGovernanceFR140();

    expect(result.authorityBoundary.reviewedMethodologyMeansMetricBinding).toBe(false);
    expect(result.authorityBoundary.reviewedMethodologyMeansConstructValidityEstablished).toBe(false);
    expect(result.execution.traditionalMetricBindingsIssued).toBe(0);
    expect(result.execution.calibrationProtocolsIssued).toBe(0);
    expect(result.execution.thresholdsIssued).toBe(0);
    expect(result.execution.criterionStatesIssued).toBe(0);
  });

  it('does not collapse annotation-role designation into reviewer assignment, self-annotation, or collection', () => {
    const result = materializeSquareBroadFangApprovedGovernanceFR140();

    expect(result.authorityBoundary.annotationRoleDesignationMeansConcreteReviewerAssigned).toBe(false);
    expect(result.authorityBoundary.annotationRoleDesignationMeansTraditionalSemanticAuthority).toBe(false);
    expect(result.authorityBoundary.projectOwnerDesignationAuthorityMeansProjectOwnerMaySelfAnnotate).toBe(false);
    expect(result.annotationGovernance.projectOwnerMayActAsSemanticReviewerByThisDesignation).toBe(false);
    expect(result.annotationGovernance.concreteReviewerActorAssignmentSatisfied).toBe(false);
    expect(result.collectionGate.collectionAuthorizationPresent).toBe(false);
    expect(result.collectionGate.humanSemanticCollectionAuthorized).toBe(false);
  });

  it('keeps FR101-style reviewer numbers unmaterialized', () => {
    const result = materializeSquareBroadFangApprovedGovernanceFR140();

    expect(result.authorityBoundary.reviewerPolicyMayBeInventedFromFR101).toBe(false);
    expect(result.annotationGovernance.reviewerCount).toBeNull();
    expect(result.annotationGovernance.quorum).toBeNull();
    expect(result.annotationGovernance.consensusThreshold).toBeNull();
  });

  it('retains exactly one reviewed successor with the exact source snapshot', () => {
    const reviewed = FACE_AUTHORITY_FR140_INTAKE_CRITERION_METHODOLOGY_REVIEWED_REGISTRY.methodologies.filter(
      (methodology) =>
        `${methodology.methodologyId}@${methodology.version}` ===
        'method.shenxiang.five_officers.intake_criteria@0.3.0',
    );

    expect(reviewed).toHaveLength(1);
    expect(reviewed[0]?.reviewStatus).toBe('reviewed');
    expect(reviewed[0]?.sourceRefs).toEqual(['passage.shenxiang.five_officers.intake.nlc_1925']);
  });
});
