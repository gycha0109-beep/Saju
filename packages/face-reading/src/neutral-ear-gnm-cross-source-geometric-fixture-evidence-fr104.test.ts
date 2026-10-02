import { describe, expect, it } from 'vitest';
import {
  NEUTRAL_EAR_GNM_CROSS_SOURCE_GEOMETRIC_FIXTURE_EVIDENCE_FR104,
} from './neutral-ear-gnm-cross-source-geometric-fixture-evidence-fr104.js';

describe('FR104 U5B-B GNM render-only fixture evidence', () => {
  it('pins the first provider-blind GNM render execution', () => {
    const evidence =
      NEUTRAL_EAR_GNM_CROSS_SOURCE_GEOMETRIC_FIXTURE_EVIDENCE_FR104;

    expect(evidence.preregistrationMergeSha).toBe(
      'dca237437d170ef03f8d15d370726a82c68345c3',
    );
    expect(evidence.firstRenderExecutionHeadSha).toBe(
      'bd9618c826f6c4c51007614f0cb9d59370bc297f',
    );
    expect(evidence.firstRenderWorkflowRunId).toBe(37005790974);
    expect(evidence.firstRenderCandidateResultSha256).toBe(
      'a994a3708cb4247d93f2a9ddda46129a55c3a9ba0e3d9f86853fab4d53469528',
    );
    expect(evidence.renderedFixture.pngSha256).toBe(
      '1af28c1677375f5551e3613bbc7e0d78bfba83e74df2438c0819a343252cc325',
    );
    expect(evidence.renderedFixture.repeatRenderByteEqual).toBe(true);
    expect(evidence.renderedFixture.repeatRenderSha256Equal).toBe(true);
  });

  it('pins exact GNM staging and frozen full-head camera evidence', () => {
    const evidence =
      NEUTRAL_EAR_GNM_CROSS_SOURCE_GEOMETRIC_FIXTURE_EVIDENCE_FR104;

    expect(evidence.source.vertexCount).toBe(17821);
    expect(evidence.source.triangleCount).toBe(35324);
    expect(evidence.source.stagedVerticesSha256).toBe(
      '8dce4419d465a79a13ecc6286d75891ce5730d8292bfbedae977bda004cdbf45',
    );
    expect(evidence.source.stagedTrianglesSha256).toBe(
      '8340922b49e0a8a5520748e4f42e02a48ed5ab3c8441d0f1d4c06893cf30dd0d',
    );
    expect(evidence.camera.spanRule).toBe(
      'max(full_template_span_y_times_1_24,full_template_span_x_times_1_34)',
    );
    expect(evidence.camera.orthographicSpan).toBe(
      0.4235199674963951,
    );
  });

  it('pins exact projected semantic anchors without provider authority', () => {
    const evidence =
      NEUTRAL_EAR_GNM_CROSS_SOURCE_GEOMETRIC_FIXTURE_EVIDENCE_FR104;

    expect(
      evidence.anatomicalGroundTruth
        .anatomicalLeftEye.normalizedImageCoordinate,
    ).toEqual({
      x:0.5729788313318006,
      y:0.34220589324293194,
    });
    expect(
      evidence.anatomicalGroundTruth
        .anatomicalRightEye.normalizedImageCoordinate,
    ).toEqual({
      x:0.4272826083862617,
      y:0.342327489429743,
    });
    expect(
      evidence.anatomicalGroundTruth
        .directVsMatrixProjectionMaximumError,
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

  it('admits only the fixture digest and keeps provider validation closed', () => {
    const evidence =
      NEUTRAL_EAR_GNM_CROSS_SOURCE_GEOMETRIC_FIXTURE_EVIDENCE_FR104;

    expect(evidence.execution.renderExecuted).toBe(true);
    expect(evidence.execution.providerExecuted).toBe(false);
    expect(evidence.execution.providerPackageImported).toBe(false);
    expect(evidence.execution.providerResultObserved).toBe(false);
    expect(evidence.execution.renderDigestAdmitted).toBe(true);
    expect(
      evidence.authority.gnmCrossSourceSemanticWitnessAudited,
    ).toBe(true);
    expect(
      evidence.authority.gnmCrossSourceFixtureDigestPinned,
    ).toBe(true);
    expect(
      evidence.authority.gnmCrossSourceGeometricValidationExecuted,
    ).toBe(false);
    expect(
      evidence.authority.gnmCrossSourceGeometricMappingValidated,
    ).toBe(false);
    expect(
      evidence.authority.globalProviderAnatomicalSemanticsEstablished,
    ).toBe(false);
    expect(evidence.authority.anatomicalLateralityAuthorized).toBe(false);
    expect(evidence.authority.traditionalBindingAuthorized).toBe(false);
    expect(evidence.authority.productionAuthorization).toBe(false);
  });
});
