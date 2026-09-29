import { describe, expect, it } from 'vitest';
import {
  NEUTRAL_EAR_MEDIAPIPE_ROTATION_API_AUDIT_EVIDENCE_FR104,
} from './neutral-ear-mediapipe-rotation-api-audit-evidence-fr104.js';

describe('FR104 U3.2A exact MediaPipe rotation API evidence', () => {
  it('pins exact installed 0.10.35 artifact bytes', () => {
    const evidence =
      NEUTRAL_EAR_MEDIAPIPE_ROTATION_API_AUDIT_EVIDENCE_FR104;

    expect(evidence.package).toEqual({
      name: '@mediapipe/tasks-vision',
      version: '0.10.35',
    });
    expect(evidence.artifacts.runtimeEntry).toEqual({
      relativePath: 'vision_bundle.mjs',
      sizeBytes: 136993,
      sha256:
        '55d7ab624fbb70dcc5adc4ae6d7ea9cfcb569139d3dbfbf2b1deafcb966bc0fe',
    });
  });

  it('records exact runtime probe semantics instead of assuming signed equivalence', () => {
    const runtime =
      NEUTRAL_EAR_MEDIAPIPE_ROTATION_API_AUDIT_EVIDENCE_FR104
        .runtimeBehavioralEvidence;

    expect(runtime.zeroDegreesVsUndefinedExactForR0).toBe(true);
    expect(runtime.zeroDegreesVsUndefinedExactForM0).toBe(true);
    expect(runtime.signedProbe).toEqual({
      positiveDegrees: 270,
      signedDegrees: -90,
      signedDegreesThrows: false,
      exactProviderResultEqual: false,
      canonicalRepresentation:
        'positive_0_90_180_270_only',
    });
    expect(runtime.invalidRotation).toEqual({
      degrees: 45,
      throws: true,
      resultProduced: false,
    });
  });

  it('keeps anatomical and production authority closed', () => {
    const evidence =
      NEUTRAL_EAR_MEDIAPIPE_ROTATION_API_AUDIT_EVIDENCE_FR104;

    expect(
      evidence.authority
        .providerRotationCompensationSemanticsAudited,
    ).toBe(true);
    expect(
      evidence.authority.providerLabelMappedToAnatomicalSide,
    ).toBe(false);
    expect(evidence.authority.anatomicalLateralityAuthorized)
      .toBe(false);
    expect(evidence.authority.productionAuthorization)
      .toBe(false);
  });
});
