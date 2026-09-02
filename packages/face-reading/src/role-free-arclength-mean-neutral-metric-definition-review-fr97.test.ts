import { describe, expect, it } from 'vitest';
import {
  assertIssuedRoleFreeArclengthMeanNeutralMetricDefinitionReviewFR97,
  reviewRoleFreeArclengthMeanNeutralMetricDefinitionFR97,
  type RoleFreeArclengthMeanNeutralMetricDefinitionReviewFR97V1,
} from './role-free-arclength-mean-neutral-metric-definition-review-fr97.js';

describe('FR97 role-free arclength mean neutral metric definition review', () => {
  it('admits one neutral whole-contour separation definition but no metric value', () => {
    const result = reviewRoleFreeArclengthMeanNeutralMetricDefinitionFR97();
    assertIssuedRoleFreeArclengthMeanNeutralMetricDefinitionReviewFR97(result);

    expect(result.metricDefinition).toMatchObject({
      metricKey: 'neutral.mouth.contour_set.symmetric_arclength_mean_nearest_set_distance',
      metricVersion: '0.1.0',
      metricRef: 'neutral.mouth.contour_set.symmetric_arclength_mean_nearest_set_distance@0.1.0',
      region: 'mouth',
      sourceFunctionalRef: 'fr96:role-free-symmetric-arclength-mean-nearest-set-distance@0.1.0',
      coordinateFrame: 'pose_normalized_face_2d',
      unit: 'canonical_metric_plane_distance',
      contourRoleSemantics: 'unordered_role_free_contour_pair',
      providerComponentOrderRequired: false,
      outerInnerAnatomicalRoleRequired: false,
      explicitPointPairCorrespondenceRequired: false,
      physicalAnthropometricInterpretationAllowed: false,
      thicknessInterpretationAllowed: false,
      traditionalCriterionBindingRef: null,
      calibrationRef: null,
      thresholdRef: null,
    });
    expect(result.neutralMetricDefinitionsIssued).toBe(1);
    expect(result.neutralMetricValuesIssued).toBe(0);
  });

  it('requires the FR96 certified role-free functional contract', () => {
    const result = reviewRoleFreeArclengthMeanNeutralMetricDefinitionFR97();

    expect(result.sourceFunctionalContract).toEqual({
      fr96FunctionalRef: 'fr96:role-free-symmetric-arclength-mean-nearest-set-distance@0.1.0',
      functional: 'symmetric_arclength_mean_nearest_set_distance',
      mathematicalDefinition: '0.5*((1/L_A)*integral_A d(x,B)ds+(1/L_B)*integral_B d(y,A)ds)',
      certifiedIntervalRequired: true,
      symmetricUnderContourSwap: true,
      cycleStartIndexInvariant: true,
      cycleOrientationInvariant: true,
      explicitPointPairCorrespondenceRequired: false,
      anatomicalRolesRequired: false,
      empiricalToleranceApplied: false,
      calibrationThresholdApplied: false,
      sourceValueCoordinateUnit: 'source_coordinate_unit',
    });
    expect(result.contractValidationWitness).toMatchObject({
      kind: 'synthetic_role_free_geometry_contract_fixture_only',
      exactTruthContainedInInterval: true,
      fr91SymmetricBudgetCertified: true,
      productionObservationIssuedByWitness: false,
      metricValueIssuedByWitness: false,
    });
  });

  it('admits reuse of FR96 only through a separate value-binding runtime', () => {
    const result = reviewRoleFreeArclengthMeanNeutralMetricDefinitionFR97();

    expect(result.reviewDecision).toEqual({
      sourceGeometryFunctionalReviewed: true,
      neutralMetricDefinitionAdmitted: true,
      neutralMetricValueBindingAdmitted: false,
      runtimeReimplementationRequiredForValueBinding: false,
      certifiedFR96ValueMayBeWrappedNext: true,
      anatomicalRoleAssignmentAuthorized: false,
      correspondencePairIssuanceAuthorized: false,
      thicknessSemanticAssignmentAuthorized: false,
      physicalAnthropometricInterpretationAuthorized: false,
      morphologyClassificationAuthorized: false,
      traditionalSemanticAssignmentAuthorized: false,
    });
    expect(result.newlyExposedPrerequisiteBlockers).toEqual([
      'role_free_arclength_mean_neutral_metric_value_binding_not_issued',
    ]);
    expect(result.recommendedNextFrontier.frontierKey)
      .toBe('role_free_arclength_mean_separation_neutral_metric_value_binding_runtime');
  });

  it('issues no anatomy, thickness, morphology, criterion or traditional authority', () => {
    const result = reviewRoleFreeArclengthMeanNeutralMetricDefinitionFR97();

    expect(result.anatomicalRolesIssued).toBe(0);
    expect(result.crossContourCorrespondencePairsIssued).toBe(0);
    expect(result.thicknessMetricIssued).toBe(false);
    expect(result.physicalAnthropometricInterpretationAuthorized).toBe(false);
    expect(result.morphologyProduced).toBe(false);
    expect(result.criterionStatesIssued).toBe(0);
    expect(result.claimsIssued).toBe(0);
    expect(result.traditionalSemanticAuthority).toBe(false);
  });

  it('rejects structurally plausible but unissued review artifacts', () => {
    const forged = {
      schemaVersion: 'fr97-role-free-arclength-mean-neutral-metric-definition-review-v1',
      reviewDecision: { neutralMetricDefinitionAdmitted: true, neutralMetricValueBindingAdmitted: false },
      neutralMetricDefinitionsIssued: 1,
      neutralMetricValuesIssued: 0,
      thicknessMetricIssued: false,
      traditionalSemanticAuthority: false,
    } as unknown as RoleFreeArclengthMeanNeutralMetricDefinitionReviewFR97V1;

    expect(() => assertIssuedRoleFreeArclengthMeanNeutralMetricDefinitionReviewFR97(forged))
      .toThrow(/not issued by the active FR-97 boundary/u);
  });
});
