import { describe, expect, it } from 'vitest';
import {
  getSquareBroadNeutralShapeMetricDefinitionsFR134,
  type SquareBroadNeutralShapeMetricRuntimeFR134V1,
  assertIssuedSquareBroadNeutralShapeMetricRuntimeFR134,
} from './five-officers-square-broad-neutral-shape-metric-runtime-fr134.js';
import {
  assessSquareBroadImageMeasurementConstructDesignFR133,
  assertIssuedSquareBroadImageMeasurementConstructDesignFR133,
} from './five-officers-square-broad-image-measurement-construct-design-fr133.js';

describe('FR134 square-broad neutral shape metric hardening', () => {
  it('does not reinterpret neutral orientation or turning metrics as traditional 方', () => {
    const definitions = getSquareBroadNeutralShapeMetricDefinitionsFR134();
    const axis = definitions.find((definition) => definition.metricRef.includes('axis_alignment'));
    const turn = definitions.find((definition) => definition.metricRef.includes('turning_angle'));
    expect(axis?.interpretationBoundary).toContain('no_external_outline_or_traditional_fang_classification');
    expect(turn?.interpretationBoundary).toContain('no_named_corners_or_traditional_fang_classification');
    expect(definitions.every((definition) => definition.traditionalCriterionBindingRef === null)).toBe(true);
    expect(definitions.every((definition) => definition.physicalAnthropometricInterpretationAllowed === false)).toBe(true);
  });

  it('preserves outer/inner anatomical-role absence and the ungoverned external-outline blocker', () => {
    const predecessor = assessSquareBroadImageMeasurementConstructDesignFR133();
    assertIssuedSquareBroadImageMeasurementConstructDesignFR133(predecessor);
    expect(predecessor.geometryCapability.outerInnerAnatomicalRoleAuthorized).toBe(false);
    expect(predecessor.geometryCapability.providerComponentOrderSemanticUseAuthorized).toBe(false);
    expect(predecessor.geometryCapability.externalMouthOutlineGovernedIdentificationAvailable).toBe(false);
    expect(predecessor.findings.fangExternalOutlineSquarenessCurrentlyGoverned).toBe(false);
  });

  it('keeps calibration, threshold and criterion-state authority closed at the predecessor boundary', () => {
    const predecessor = assessSquareBroadImageMeasurementConstructDesignFR133();
    expect(predecessor.constructValidityPlan.numericThresholdProposed).toBe(false);
    expect(predecessor.constructValidityPlan.calibrationDatasetSizeInvented).toBe(false);
    expect(predecessor.constructValidityPlan.reviewerCountInvented).toBe(false);
    expect(predecessor.execution.traditionalMetricBindingsIssued).toBe(0);
    expect(predecessor.execution.calibrationProtocolsIssued).toBe(0);
    expect(predecessor.execution.thresholdsIssued).toBe(0);
    expect(predecessor.execution.criterionStatesIssued).toBe(0);
    expect(predecessor.execution.traditionalSemanticAuthority).toBe(false);
  });

  it('rejects copied runtime-shaped objects even when visible authority fields look plausible', () => {
    const forged = {
      schemaVersion: 'fr134-square-broad-neutral-shape-metric-runtime-v1',
      artifactVersion: '0.1.0',
      authorityState: 'square_broad_role_invariant_neutral_shape_metrics_implemented_construct_validity_pending',
      execution: {
        traditionalMetricBindingsIssued: 0,
        thresholdsIssued: 0,
        criterionStatesIssued: 0,
        traditionalSemanticAuthority: false,
      },
    } as unknown as SquareBroadNeutralShapeMetricRuntimeFR134V1;
    expect(() => assertIssuedSquareBroadNeutralShapeMetricRuntimeFR134(forged)).toThrow(/FR-134/u);
  });
});
