import { describe, expect, it } from 'vitest';
import type { GovernedCertifiedRoleFreeSymmetricArclengthMeanFR96V1 } from './certified-role-free-symmetric-arclength-mean-runtime-fr96.js';
import {
  bindIssuedFR96ToNeutralMetricValueFR98,
} from './role-free-arclength-mean-neutral-metric-value-runtime-fr98.js';
import { reviewRoleFreeArclengthMeanNeutralMetricDefinitionFR97 } from './role-free-arclength-mean-neutral-metric-definition-review-fr97.js';

describe('FR98 neutral metric value binding hardening', () => {
  it('cannot bypass FR96 issuance by supplying complete-looking geometry and metric fields', () => {
    const forged = {
      schemaVersion: 'fr96-governed-certified-role-free-symmetric-arclength-mean-v1',
      artifactVersion: '0.1.0',
      authorityState: 'governed_certified_role_free_symmetric_arclength_mean_geometry_functional_only',
      source: {
        coordinateFrame: 'pose_normalized_face_2d',
        coordinateUnit: 'centimeter',
        contourCount: 2,
        contourPointCounts: [20, 20],
        contourConsumptionState: 'unordered_set_no_outer_inner_role',
      },
      computation: {
        functionalRef: 'fr96:role-free-symmetric-arclength-mean-nearest-set-distance@0.1.0',
        functional: 'symmetric_arclength_mean_nearest_set_distance',
        exactTruthContainedInInterval: true,
        fr91SymmetricBudgetCertified: true,
      },
      runtimeGeometryFunctionalDefinitionsIssued: 1,
      runtimeGeometryValuesIssued: 1,
      neutralMetricDefinitionsIssued: 0,
      neutralMetricValuesIssued: 0,
      anatomicalRolesIssued: 0,
      crossContourCorrespondencePairsIssued: 0,
      thicknessMetricIssued: false,
      physicalAnthropometricInterpretationAuthorized: false,
      morphologyProduced: false,
      criterionStatesIssued: 0,
      claimsIssued: 0,
      traditionalSemanticAuthority: false,
    } as unknown as GovernedCertifiedRoleFreeSymmetricArclengthMeanFR96V1;

    expect(() => bindIssuedFR96ToNeutralMetricValueFR98(forged))
      .toThrow(/not issued by the active FR-96 governed boundary/u);
  });

  it('inherits FR97 prohibitions against anatomy, thickness, anthropometry and traditional shortcuts', () => {
    const review = reviewRoleFreeArclengthMeanNeutralMetricDefinitionFR97();

    expect(review.authorityBoundary.neutralSeparationMetricMeansLipThickness).toBe(false);
    expect(review.authorityBoundary.canonicalMetricPlaneDistanceMeansPhysicalSoftTissueAnthropometry).toBe(false);
    expect(review.authorityBoundary.nearestSetDistanceMeansPointCorrespondence).toBe(false);
    expect(review.authorityBoundary.neutralMetricDefinitionMeansMorphologyState).toBe(false);
    expect(review.authorityBoundary.neutralMetricDefinitionMeansTraditionalDuanHou).toBe(false);
    expect(review.authorityBoundary.numericalCertificateMeansCalibrationThreshold).toBe(false);
    expect(review.prohibitedShortcuts).toEqual(expect.arrayContaining([
      'neutral_arclength_mean_separation_to_lip_thickness',
      'canonical_metric_plane_distance_to_physical_soft_tissue_anthropometry',
      'nearest_set_distance_to_cross_contour_correspondence_pair',
      'neutral_metric_definition_to_morphology_state',
      'neutral_metric_definition_to_traditional_duan_hou_semantics',
      'certified_numerical_error_to_calibration_threshold',
    ]));
  });
});
