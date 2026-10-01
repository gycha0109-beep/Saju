import { describe, expect, it } from 'vitest';
import {
  NEUTRAL_EAR_PROSPECTIVE_INDEPENDENT_GEOMETRY_FIXTURE_EVIDENCE_FR104,
} from './neutral-ear-prospective-independent-geometry-fixture-evidence-fr104.js';

describe('FR104 U4B-B render-only fixture evidence', () => {
  it('pins the first provider-blind rendered fixture', () => {
    const evidence =
      NEUTRAL_EAR_PROSPECTIVE_INDEPENDENT_GEOMETRY_FIXTURE_EVIDENCE_FR104;

    expect(evidence.preregistrationMergeSha).toBe(
      'bec91cd06b682e26ad9d0f7d6721591235031a34',
    );
    expect(evidence.firstRenderExecutionHeadSha).toBe(
      '686a328caadfe3ceed5241cb6b9f2c2d41844a7b',
    );
    expect(evidence.firstRenderWorkflowRunId).toBe(36833595821);
    expect(evidence.renderedFixture.pngSha256).toBe(
      '91a481011618f7a74aed7380185d640c604dcde587eff69b6f44654c97585b33',
    );
    expect(evidence.renderedFixture.repeatRenderByteEqual).toBe(true);
    expect(evidence.renderedFixture.repeatRenderSha256Equal).toBe(true);
  });

  it('pins morphed anatomical ground truth without provider authority', () => {
    const evidence =
      NEUTRAL_EAR_PROSPECTIVE_INDEPENDENT_GEOMETRY_FIXTURE_EVIDENCE_FR104;

    expect(
      evidence.anatomicalGroundTruth
        .anatomicalLeftEye.normalizedImageCoordinate,
    ).toEqual({
      x:0.6081000875693314,
      y:0.5,
    });
    expect(
      evidence.anatomicalGroundTruth
        .anatomicalRightEye.normalizedImageCoordinate,
    ).toEqual({
      x:0.3918999124306686,
      y:0.5,
    });
    expect(
      evidence.anatomicalGroundTruth.providerLandmarkDerived,
    ).toBe(false);
    expect(
      evidence.anatomicalGroundTruth.providerLabelDerived,
    ).toBe(false);
  });

  it('keeps provider execution and downstream authority closed', () => {
    const evidence =
      NEUTRAL_EAR_PROSPECTIVE_INDEPENDENT_GEOMETRY_FIXTURE_EVIDENCE_FR104;

    expect(evidence.execution.renderExecuted).toBe(true);
    expect(evidence.execution.providerExecuted).toBe(false);
    expect(evidence.execution.providerResultObserved).toBe(false);
    expect(evidence.execution.renderDigestAdmitted).toBe(true);
    expect(evidence.authority.u4bFixtureDigestPinned).toBe(true);
    expect(
      evidence.authority
        .prospectiveIndependentGeometryValidationExecuted,
    ).toBe(false);
    expect(
      evidence.authority
        .prospectiveIndependentGeometryMappingValidated,
    ).toBe(false);
    expect(
      evidence.authority.globalProviderAnatomicalSemanticsEstablished,
    ).toBe(false);
    expect(evidence.authority.anatomicalLateralityAuthorized).toBe(false);
    expect(evidence.authority.productionAuthorization).toBe(false);
  });
});
