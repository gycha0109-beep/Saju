import { describe, expect, it } from 'vitest';
import {
  NEUTRAL_EAR_MAKEHUMAN_ANATOMICAL_REFERENCE_PROTOCOL_FR104,
} from './neutral-ear-makehuman-anatomical-reference-protocol-fr104.js';
import {
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_PREFLIGHT_FR104,
} from './neutral-ear-makehuman-provider-preflight-fr104.js';

describe('FR104 U2 MakeHuman provider preflight protocol', () => {
  it('consumes only the pinned U1.2 deterministic fixture', () => {
    const protocol =
      NEUTRAL_EAR_MAKEHUMAN_PROVIDER_PREFLIGHT_FR104;

    expect(protocol.fixture.expectedSha256).toBe(
      NEUTRAL_EAR_MAKEHUMAN_ANATOMICAL_REFERENCE_PROTOCOL_FR104
        .deterministicRenderContract.renderedFixtureSha256,
    );
    expect(protocol.fixture.width).toBe(1024);
    expect(protocol.fixture.height).toBe(1024);
    expect(protocol.fixture.repositoryPersistence).toBe(false);
  });

  it('keeps anatomical ground truth independent from provider labels', () => {
    const groundTruth =
      NEUTRAL_EAR_MAKEHUMAN_PROVIDER_PREFLIGHT_FR104
        .independentAnatomicalGroundTruth;

    expect(groundTruth.providerLandmarkDerived).toBe(false);
    expect(groundTruth.providerLabelDerived).toBe(false);
    expect(groundTruth.imageSpaceXSignDefinesAnatomicalSide)
      .toBe(false);
    expect(groundTruth.anatomicalLeftEye.x)
      .toBeGreaterThan(groundTruth.anatomicalRightEye.x);
  });

  it('pins exact provider runtime and fail-closed eligibility', () => {
    const protocol =
      NEUTRAL_EAR_MAKEHUMAN_PROVIDER_PREFLIGHT_FR104;

    expect(protocol.runtime.packageVersion).toBe('0.10.35');
    expect(protocol.runtime.runningMode).toBe('IMAGE');
    expect(protocol.runtime.numFaces).toBe(1);
    expect(protocol.providerEligibility.exactlyOneFaceRequired)
      .toBe(true);
    expect(protocol.providerEligibility.expectedLandmarkCount)
      .toBe(478);
    expect(
      protocol.boundedComparison.numericAcceptanceThresholdAuthorized,
    ).toBe(false);
  });

  it('does not authorize anatomical semantics before empirical admission', () => {
    const authority =
      NEUTRAL_EAR_MAKEHUMAN_PROVIDER_PREFLIGHT_FR104.authority;

    expect(authority.providerPreflightExecuted).toBe(false);
    expect(authority.providerFaceDetectabilityVerified).toBe(false);
    expect(authority.providerLabelMappedToAnatomicalSide).toBe(false);
    expect(authority.anatomicalReferenceAdmitted).toBe(false);
    expect(authority.anatomicalLateralityAuthorized).toBe(false);
    expect(authority.validatedExternalEarObservationAuthorized)
      .toBe(false);
    expect(authority.traditionalBindingAuthorized).toBe(false);
    expect(authority.productionAuthorization).toBe(false);
  });
});
