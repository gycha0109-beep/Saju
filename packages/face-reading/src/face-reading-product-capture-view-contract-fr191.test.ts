import { describe, expect, it } from 'vitest';
import {
  FR191_FR188_CAPTURE_PROTOCOL_REF,
  FR191_FR19_AUTHORITY_VERSION,
  FR191_FR19_MODULE_REF,
  FR191_REQUIRED_VIEW_ROLES,
  assertFaceReadingProductCaptureViewContractFR191,
  assertIssuedFaceReadingProductCaptureViewContractFR191,
  issueFaceReadingProductCaptureViewContractFR191,
} from './face-reading-product-capture-view-contract-fr191.js';

describe('FR191 frontal + profile product capture-view contract', () => {
  it('issues exactly one frontal and one side-agnostic profile role', () => {
    const issued = issueFaceReadingProductCaptureViewContractFR191();

    expect(() => assertIssuedFaceReadingProductCaptureViewContractFR191(issued)).not.toThrow();
    expect(issued.requiredCaptureCount).toBe(2);
    expect(issued.requiredViewRoles).toBe(FR191_REQUIRED_VIEW_ROLES);
    expect(issued.requiredViewRoles).toEqual(['frontal', 'profile']);
    expect(issued.capturesPerRole).toEqual({ frontal: 1, profile: 1 });
    expect(issued.profileRole).toEqual({
      sideSemantics: 'side_agnostic_profile',
      anatomicalSideRequired: false,
      anatomicalSideBindingAuthorized: false,
      bilateralCaptureRequired: false,
    });
  });

  it('pins FR19 fail-closed laterality facts and the FR188 eye research protocol by provenance', () => {
    const issued = issueFaceReadingProductCaptureViewContractFR191();

    expect(issued.upstreamAuthority.fr19ModuleRef).toBe(FR191_FR19_MODULE_REF);
    expect(issued.upstreamAuthority.fr19AuthorityVersion).toBe(FR191_FR19_AUTHORITY_VERSION);
    expect(issued.upstreamAuthority.canonicalPixelOrientationState).toBe('exif_transform_normalized');
    expect(issued.upstreamAuthority.anatomicalMirrorState).toBe('unresolved_source_pixels');
    expect(issued.upstreamAuthority.imageXAxisMayDefineAnatomicalSide).toBe(false);
    expect(issued.upstreamAuthority.productionLateralityBindingAllowed).toBe(false);
    expect(issued.upstreamAuthority.fr188EyePairCaptureProtocolRef).toBe(FR191_FR188_CAPTURE_PROTOCOL_REF);
    expect(issued.downstreamMethodPackBoundary.supersedesEyePairXiChangResearchCaptureProtocol).toBe(false);
  });

  it('rejects bilateral, oblique, anatomical-side, or organ-specific widening', () => {
    const issued = issueFaceReadingProductCaptureViewContractFR191();

    expect(() => assertFaceReadingProductCaptureViewContractFR191({
      ...issued,
      requiredCaptureCount: 3,
      requiredViewRoles: ['frontal', 'profile', 'oblique'],
    } as never)).toThrow();

    expect(() => assertFaceReadingProductCaptureViewContractFR191({
      ...issued,
      authorityBoundary: { ...issued.authorityBoundary, bilateralProfileRequired: true },
    } as never)).toThrow();

    expect(() => assertFaceReadingProductCaptureViewContractFR191({
      ...issued,
      profileRole: {
        ...issued.profileRole,
        anatomicalSideRequired: true,
        anatomicalSideBindingAuthorized: true,
      },
    } as never)).toThrow();

    expect(() => assertFaceReadingProductCaptureViewContractFR191({
      ...issued,
      authorityBoundary: { ...issued.authorityBoundary, organSpecificMetricAuthorityIssued: true },
    } as never)).toThrow();
  });

  it('rejects upstream provenance drift and FR188 supersession', () => {
    const issued = issueFaceReadingProductCaptureViewContractFR191();

    expect(() => assertFaceReadingProductCaptureViewContractFR191({
      ...issued,
      upstreamAuthority: {
        ...issued.upstreamAuthority,
        fr19AuthorityVersion: 'invented' as never,
      },
    } as never)).toThrow();

    expect(() => assertFaceReadingProductCaptureViewContractFR191({
      ...issued,
      downstreamMethodPackBoundary: {
        ...issued.downstreamMethodPackBoundary,
        supersedesEyePairXiChangResearchCaptureProtocol: true,
      },
    } as never)).toThrow();
  });

  it('rejects participant, evidence, semantic, calibration, and Production widening', () => {
    const issued = issueFaceReadingProductCaptureViewContractFR191();

    expect(() => assertFaceReadingProductCaptureViewContractFR191({
      ...issued,
      privacyAndExecutionBoundary: {
        ...issued.privacyAndExecutionBoundary,
        participantImageAccepted: true,
      },
    } as never)).toThrow();

    for (const key of [
      'evidenceCollectionAuthorized',
      'traditionalRegionMappingAuthorized',
      'traditionalSemanticAuthorityPromoted',
      'thresholdIssued',
      'calibrationEvidenceIssued',
      'classifierIssued',
      'productionActivationAuthorized',
    ] as const) {
      expect(() => assertFaceReadingProductCaptureViewContractFR191({
        ...issued,
        authorityBoundary: { ...issued.authorityBoundary, [key]: true },
      } as never)).toThrow();
    }

    expect(() => assertIssuedFaceReadingProductCaptureViewContractFR191({ ...issued })).toThrow();
  });
});
