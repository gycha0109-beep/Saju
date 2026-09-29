import { describe, expect, it } from 'vitest';
import {
  NEUTRAL_EAR_MEDIAPIPE_ROTATION_API_AUDIT_FR104,
} from './neutral-ear-mediapipe-rotation-api-audit-fr104.js';

describe('FR104 U3.2A MediaPipe rotation API audit', () => {
  it('pins exact package identity and installed-artifact authority', () => {
    const protocol =
      NEUTRAL_EAR_MEDIAPIPE_ROTATION_API_AUDIT_FR104;

    expect(protocol.packageIdentity).toEqual({
      packageName: '@mediapipe/tasks-vision',
      packageVersion: '0.10.35',
      lockfileExactVersionRequired: true,
      installedPackageExactVersionRequired: true,
    });
    expect(
      protocol.interpretationBoundary
        .exactInstalledArtifactIsPrimaryAuthority,
    ).toBe(true);
    expect(
      protocol.interpretationBoundary
        .upstreamMasterMayDefineExactPackageSemantics,
    ).toBe(false);
  });

  it('requires detect ImageProcessingOptions and rotationDegrees evidence', () => {
    const declaration =
      NEUTRAL_EAR_MEDIAPIPE_ROTATION_API_AUDIT_FR104
        .declarationContract;

    expect(
      declaration.faceLandmarkerDetectAcceptsImageProcessingOptions,
    ).toBe(true);
    expect(declaration.rotationDegreesPropertyRequired).toBe(true);
    expect(declaration.publicClockwiseSemanticsEvidenceRequired)
      .toBe(true);
  });

  it('pre-registers zero/signed/invalid/opposite runtime probes', () => {
    const probes =
      NEUTRAL_EAR_MEDIAPIPE_ROTATION_API_AUDIT_FR104
        .runtimeProbeContract;

    expect(probes.zeroDegreesVsUndefinedProbeRequired).toBe(true);
    expect(probes.signedEquivalentProbe).toEqual({
      physicalCaseId: 'R90',
      positiveDegrees: 270,
      signedDegrees: -90,
    });
    expect(probes.invalidRotationProbe).toEqual({
      degrees: 45,
      mustThrow: true,
      resultMustNotBeProduced: true,
    });
    expect(probes.oppositeDirectionProbe).toEqual({
      physicalCaseId: 'R90',
      compensationDegrees: 270,
      oppositeDegrees: 90,
    });
  });

  it('keeps all semantic and production authority closed', () => {
    const authority =
      NEUTRAL_EAR_MEDIAPIPE_ROTATION_API_AUDIT_FR104
        .authority;

    expect(authority.providerRotationCompensationSemanticsAudited)
      .toBe(false);
    expect(
      authority.providerRotationCompensationEffectiveForExactFixture,
    ).toBe(false);
    expect(
      authority.canonicalProviderOrientationNormalizationAvailable,
    ).toBe(false);
    expect(authority.anatomicalLateralityAuthorized).toBe(false);
    expect(authority.traditionalBindingAuthorized).toBe(false);
    expect(authority.productionAuthorization).toBe(false);
  });
});
