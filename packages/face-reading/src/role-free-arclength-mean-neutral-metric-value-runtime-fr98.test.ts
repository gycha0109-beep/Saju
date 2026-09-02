import { describe, expect, it } from 'vitest';
import type { GovernedCertifiedRoleFreeSymmetricArclengthMeanFR96V1 } from './certified-role-free-symmetric-arclength-mean-runtime-fr96.js';
import {
  assertIssuedGovernedRoleFreeArclengthMeanNeutralMetricFR98,
  bindIssuedFR96ToNeutralMetricValueFR98,
  type GovernedRoleFreeArclengthMeanNeutralMetricFR98V1,
} from './role-free-arclength-mean-neutral-metric-value-runtime-fr98.js';
import { reviewRoleFreeArclengthMeanNeutralMetricDefinitionFR97 } from './role-free-arclength-mean-neutral-metric-definition-review-fr97.js';

describe('FR98 role-free arclength mean neutral metric value binding', () => {
  it('requires an actually issued governed FR96 source rather than a structural lookalike', () => {
    const forged = {
      schemaVersion: 'fr96-governed-certified-role-free-symmetric-arclength-mean-v1',
      authorityState: 'governed_certified_role_free_symmetric_arclength_mean_geometry_functional_only',
    } as unknown as GovernedCertifiedRoleFreeSymmetricArclengthMeanFR96V1;

    expect(() => bindIssuedFR96ToNeutralMetricValueFR98(forged))
      .toThrow(/not issued by the active FR-96 governed boundary/u);
  });

  it('requires the FR97 definition-only gate before value issuance', () => {
    const review = reviewRoleFreeArclengthMeanNeutralMetricDefinitionFR97();

    expect(review.metricDefinition.metricRef)
      .toBe('neutral.mouth.contour_set.symmetric_arclength_mean_nearest_set_distance@0.1.0');
    expect(review.reviewDecision.neutralMetricDefinitionAdmitted).toBe(true);
    expect(review.reviewDecision.neutralMetricValueBindingAdmitted).toBe(false);
    expect(review.reviewDecision.certifiedFR96ValueMayBeWrappedNext).toBe(true);
    expect(review.neutralMetricDefinitionsIssued).toBe(1);
    expect(review.neutralMetricValuesIssued).toBe(0);
    expect(review.recommendedNextFrontier.frontierKey)
      .toBe('role_free_arclength_mean_separation_neutral_metric_value_binding_runtime');
  });

  it('rejects structurally plausible but unissued FR98 outputs', () => {
    const forged = {
      schemaVersion: 'fr98-governed-role-free-arclength-mean-neutral-metric-v1',
      authorityState: 'governed_role_free_arclength_mean_neutral_metric_value_only',
      neutralMetricDefinitionRefsConsumed: 1,
      neutralMetricDefinitionsIssued: 0,
      neutralMetricValuesIssued: 1,
      runtimeGeometryRecomputationPerformed: false,
      anatomicalRolesIssued: 0,
      crossContourCorrespondencePairsIssued: 0,
      thicknessMetricIssued: false,
      physicalAnthropometricInterpretationAuthorized: false,
      morphologyProduced: false,
      criterionStatesIssued: 0,
      claimsIssued: 0,
      traditionalSemanticAuthority: false,
    } as unknown as GovernedRoleFreeArclengthMeanNeutralMetricFR98V1;

    expect(() => assertIssuedGovernedRoleFreeArclengthMeanNeutralMetricFR98(forged))
      .toThrow(/not issued by the active FR-98 metric binding boundary/u);
  });
});
