import { describe, expect, it } from 'vitest';
import type { GovernedCertifiedRoleFreeSymmetricArclengthMeanFR96V1 } from './certified-role-free-symmetric-arclength-mean-runtime-fr96.js';
import {
  bindIssuedFR96ToNeutralMetricValueFR98,
} from './role-free-arclength-mean-neutral-metric-value-runtime-fr98.js';

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

  it('does not offer a structural path from metric binding to anatomy, thickness or traditional authority', async () => {
    const sourceText = await import('node:fs/promises').then(async ({ readFile }) =>
      readFile(new URL('./role-free-arclength-mean-neutral-metric-value-runtime-fr98.ts', import.meta.url), 'utf8')
        .catch(() => ''),
    );

    if (sourceText.length > 0) {
      expect(sourceText).toContain('neutralMetricValueMeansLipThickness: false');
      expect(sourceText).toContain('neutralMetricValueMeansPhysicalSoftTissueAnthropometry: false');
      expect(sourceText).toContain('nearestSetMetricMeansPointCorrespondence: false');
      expect(sourceText).toContain('metricValueBindingMeansMorphologyState: false');
      expect(sourceText).toContain('metricValueBindingMeansTraditionalDuanHou: false');
      expect(sourceText).toContain('sourceRuntimeValueMayBeRecomputedDuringBinding: false');
    }
  });
});
