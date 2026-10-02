import { describe, expect, it } from 'vitest';
import {
  NEUTRAL_EAR_GNM_CROSS_SOURCE_GEOMETRIC_FIXTURE_EVIDENCE_FR104,
} from './neutral-ear-gnm-cross-source-geometric-fixture-evidence-fr104.js';

describe('FR104 U5B-B render-only GNM fixture evidence', () => {
  it('pins the first provider-blind GNM rendered fixture exactly', () => {
    const evidence =
      NEUTRAL_EAR_GNM_CROSS_SOURCE_GEOMETRIC_FIXTURE_EVIDENCE_FR104;

    expect(evidence.preregistrationMergeSha).toBe(
      'dca237437d170ef03f8d15d370726a82c68345c3',
    );
    expect(evidence.firstRenderExecutionHeadSha).toBe(
      '0c39be93bad5fbc8cb08a99d3a9f41fed9786710',
    );
    expect(evidence.firstRenderWorkflowRunId).toBe(37001698584);
    expect(evidence.renderedFixture.pngSha256).toBe(
      '1af28c1677375f5551e3613bbc7e0d78bfba83e74df2438c0819a343252cc325',
    );
    expect(evidence.renderedFixture.repeatRenderByteEqual).toBe(true);
    expect(evidence.renderedFixture.repeatRenderSha256Equal).toBe(true);
  });

  it('pins exact GNM geometry and frozen camera values', () => {
    const evidence =
      NEUTRAL_EAR_GNM_CROSS_SOURCE_GEOMETRIC_FIXTURE_EVIDENCE_FR104;

    expect(evidence.geometry.vertexCount).toBe(17821);
    expect(evidence.geometry.triangleCount).toBe(35324);
    expect(evidence.geometry.bounds.center).toEqual([
      -0.00006895512342453003,
      0.23633597418665886,
      0.0271456316113472,
    ]);
    expect(evidence.camera.span).toBe(0.4235199674963951);
    expect(evidence.camera.halfSpan).toBe(0.21175998374819754);
    expect(evidence.camera.spanRule).toBe(
      'max(full_template_span_y_times_1_24,full_template_span_x_times_1_34)',
    );
  });

  it('pins projected direct-source semantic anchors without provider authority', () => {
    const evidence =
      NEUTRAL_EAR_GNM_CROSS_SOURCE_GEOMETRIC_FIXTURE_EVIDENCE_FR104;

    expect(
      evidence.anatomicalGroundTruth.anatomicalLeftEye
        .normalizedImageCoordinate,
    ).toEqual({
      x:0.5729788313318006,
      y:0.34220589324293194,
    });
    expect(
      evidence.anatomicalGroundTruth.anatomicalRightEye
        .normalizedImageCoordinate,
    ).toEqual({
      x:0.4272826083862617,
      y:0.342327489429743,
    });
    expect(
      evidence.anatomicalGroundTruth.directVsMatrixProjectionMaximumError,
    ).toBe(5.551115123125783e-17);
    expect(
      evidence.anatomicalGroundTruth.providerLandmarkDerived,
    ).toBe(false);
    expect(
      evidence.anatomicalGroundTruth.providerLabelDerived,
    ).toBe(false);
    expect(
      evidence.anatomicalGroundTruth.imageSpaceXSignDefinesAnatomicalSide,
    ).toBe(false);
    expect(
      evidence.anatomicalGroundTruth.gnmAxisOrderingDefinesAnatomicalSide,
    ).toBe(false);
  });

  it('admits only the render digest and keeps provider/geometric authority closed', () => {
    const evidence =
      NEUTRAL_EAR_GNM_CROSS_SOURCE_GEOMETRIC_FIXTURE_EVIDENCE_FR104;

    expect(evidence.execution.renderExecuted).toBe(true);
    expect(evidence.execution.providerExecuted).toBe(false);
    expect(evidence.execution.providerResultObserved).toBe(false);
    expect(evidence.execution.renderDigestAdmitted).toBe(true);
    expect(evidence.authority.gnmCrossSourceSemanticWitnessAudited).toBe(true);
    expect(evidence.authority.gnmCrossSourceFixtureDigestPinned).toBe(true);
    expect(
      evidence.authority.gnmCrossSourceGeometricValidationExecuted,
    ).toBe(false);
    expect(
      evidence.authority.gnmCrossSourceGeometricMappingValidated,
    ).toBe(false);
    expect(evidence.authority.providerLabelMappedToAnatomicalSide).toBe(false);
    expect(
      evidence.authority.globalProviderAnatomicalSemanticsEstablished,
    ).toBe(false);
    expect(evidence.authority.anatomicalLateralityAuthorized).toBe(false);
    expect(evidence.authority.traditionalBindingAuthorized).toBe(false);
    expect(evidence.authority.productionAuthorization).toBe(false);
  });
});
