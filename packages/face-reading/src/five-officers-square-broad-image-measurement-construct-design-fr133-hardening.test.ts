import { describe, expect, it } from 'vitest';
import {
  assessSquareBroadImageMeasurementConstructDesignFR133,
  assertIssuedSquareBroadImageMeasurementConstructDesignFR133,
  type SquareBroadImageMeasurementConstructDesignFR133V1,
} from './five-officers-square-broad-image-measurement-construct-design-fr133.js';

describe('FR133 square-broad image measurement construct design hardening', () => {
  it('rejects forged artifacts even when visible fields are copied', () => {
    const issued = assessSquareBroadImageMeasurementConstructDesignFR133();
    const forged = structuredClone(issued) as SquareBroadImageMeasurementConstructDesignFR133V1;
    expect(() => assertIssuedSquareBroadImageMeasurementConstructDesignFR133(forged)).toThrow(/FR-133/);
  });

  it('does not reinterpret closed-cycle topology as an anatomical outer lip contour', () => {
    const value = assessSquareBroadImageMeasurementConstructDesignFR133();
    expect(value.geometryCapability.roleInvariantClosedCycleGeometryResearchPossible).toBe(true);
    expect(value.geometryCapability.outerInnerAnatomicalRoleAuthorized).toBe(false);
    expect(value.geometryCapability.externalMouthOutlineGovernedIdentificationAvailable).toBe(false);
    expect(value.authorityBoundary.closedCycleTopologyMeansOuterLipRole).toBe(false);
    const outline = value.observableCandidates.find((candidate) => candidate.candidateId === 'candidate.fang.external_outline_rectilinearity');
    expect(outline?.readiness).toBe('blocked_missing_outer_contour_anatomical_role');
  });

  it('does not turn role-invariant geometric candidates or aspect ratio into traditional 方', () => {
    const value = assessSquareBroadImageMeasurementConstructDesignFR133();
    const fang = value.observableCandidates.filter((candidate) => candidate.component === '方');
    expect(fang.every((candidate) => candidate.traditionalSemanticBindingAuthorized === false)).toBe(true);
    expect(fang.every((candidate) => candidate.thresholdAuthorized === false)).toBe(true);
    expect(value.findings.fangBoundingBoxAspectRatioAloneSufficient).toBe(false);
    expect(value.authorityBoundary.roleInvariantGeometryMeansTraditionalFang).toBe(false);
    expect(value.authorityBoundary.aspectRatioMeansTraditionalFang).toBe(false);
  });

  it('does not reinterpret the full 468-landmark X span as anatomical face width or traditional 大', () => {
    const value = assessSquareBroadImageMeasurementConstructDesignFR133();
    const meshRatio = value.observableCandidates.find((candidate) => candidate.candidateId === 'candidate.da.full_mesh_horizontal_span_ratio');
    expect(meshRatio?.doesNotEstablish).toContain('anatomical face width');
    expect(meshRatio?.doesNotEstablish).toContain('traditional 大');
    expect(value.findings.fr82FullMeshDenominatorIsAnatomicalFaceWidth).toBe(false);
    expect(value.authorityBoundary.fullMeshHorizontalSpanMeansAnatomicalFaceWidth).toBe(false);
    expect(value.authorityBoundary.fullMeshRelativeSpanMeansTraditionalDa).toBe(false);
  });

  it('does not fabricate a measurement for containment merely because source context mentions it', () => {
    const value = assessSquareBroadImageMeasurementConstructDesignFR133();
    const containment = value.observableCandidates.find((candidate) => candidate.candidateId === 'candidate.da.containment_geometry');
    expect(containment?.readiness).toBe('blocked_missing_source_grounded_geometric_definition');
    expect(containment?.existingMetricRef).toBeNull();
    expect(value.findings.daContainmentOperationalizationAvailable).toBe(false);
  });

  it('keeps approval, binding, calibration, threshold, state, claim and narrative authority closed', () => {
    const value = assessSquareBroadImageMeasurementConstructDesignFR133();
    expect(value.predecessor.targetSpecificApprovalExplicitlyDeferred).toBe(true);
    expect(value.observableCandidates.every((candidate) => candidate.constructValidityStatus === 'not_established')).toBe(true);
    expect(value.observableCandidates.every((candidate) => candidate.traditionalSemanticBindingAuthorized === false)).toBe(true);
    expect(value.observableCandidates.every((candidate) => candidate.calibrationAuthorized === false)).toBe(true);
    expect(value.observableCandidates.every((candidate) => candidate.criterionStateAuthorized === false)).toBe(true);
    expect(value.execution.traditionalMetricBindingsIssued).toBe(0);
    expect(value.execution.calibrationProtocolsIssued).toBe(0);
    expect(value.execution.thresholdsIssued).toBe(0);
    expect(value.execution.criterionStatesIssued).toBe(0);
    expect(value.execution.structuredClaimsIssued).toBe(0);
    expect(value.execution.boundedNarrativesIssued).toBe(0);
    expect(value.execution.traditionalSemanticAuthority).toBe(false);
    expect(value.authorityBoundary.imageMeasurableNeutralPropertyMeansConstructValidity).toBe(false);
    expect(value.authorityBoundary.constructDesignMeansReviewedPromotion).toBe(false);
    expect(value.authorityBoundary.historicalArtifactMutated).toBe(false);
  });
});
