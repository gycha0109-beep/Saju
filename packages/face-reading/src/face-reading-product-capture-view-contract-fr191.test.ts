import { describe, expect, it } from 'vitest';
import { CAPTURE_ORIENTATION_AUTHORITY_FR19 } from './capture-orientation-authority-fr19.js';
import { FR188_CAPTURE_PROTOCOL_REF } from './eye-pair-xi-chang-repeat-capture-dataset-split-protocol-fr188.js';
import {
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
    expect(issued.requiredViewRoles).toEqual(['frontal', 'profile']);
    expect(issued.requiredViewRoles).toBe(FR191_REQUIRED_VIEW_ROLES);
    expect(issued.capturesPerRole).toEqual({ frontal: 1, profile: 1 });
    expect(issued.profileRole.sideSemantics).toBe('side_agnostic_profile');
    expect(issued.profileRole.anatomicalSideRequired).toBe(false);
    expect(issued.profileRole.anatomicalSideBindingAuthorized).toBe(false);
    expect(issued.profileRole.bilateralCaptureRequired).toBe(false);
  });

  it('preserves FR19 laterality fail-closed state and FR188 study separation', () => {
    const issued = issueFaceReadingProductCaptureViewContractFR191();

    expect(issued.orientationBoundary.fr19AuthorityVersion)
      .toBe(CAPTURE_ORIENTATION_AUTHORITY_FR19.authorityVersion);
    expect(issued.orientationBoundary.canonicalPixelOrientationState).toBe('exif_transform_normalized');
    expect(issued.orientationBoundary.anatomicalMirrorState).toBe('unresolved_source_pixels');
    expect(issued.orientationBoundary.imageXAxisMayDefineAnatomicalSide).toBe(false);
    expect(issued.orientationBoundary.productionLateralityBindingAllowed).toBe(false);
    expect(issued.downstreamMethodPackBoundary.eyePairXiChangResearchCaptureProtocolRef)
      .toBe(FR188_CAPTURE_PROTOCOL_REF);
    expect(issued.downstreamMethodPackBoundary.supersedesEyePairXiChangResearchCaptureProtocol).toBe(false);
    expect(issued.downstreamMethodPackBoundary.sharedViewsProveSufficiencyForEveryOrgan).toBe(false);
  });

  it('rejects any expansion beyond frontal plus one profile view', () => {
    const issued = issueFaceReadingProductCaptureViewContractFR191();

    expect(() => assertFaceReadingProductCaptureViewContractFR191({
      ...issued,
      requiredCaptureCount: 3,
      requiredViewRoles: ['frontal', 'profile', 'oblique'],
    } as never)).toThrow();

    expect(() => assertFaceReadingProductCaptureViewContractFR191({
      ...issued,
      authorityBoundary: {
        ...issued.authorityBoundary,
        bilateralProfileRequired: true,
      },
    } as never)).toThrow();

    expect(() => assertFaceReadingProductCaptureViewContractFR191({
      ...issued,
      authorityBoundary: {
        ...issued.authorityBoundary,
        obliqueViewRequired: true,
      },
    } as never)).toThrow();
  });

  it('rejects anatomical-side binding and organ-specific authority widening', () => {
    const issued = issueFaceReadingProductCaptureViewContractFR191();

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
      authorityBoundary: {
        ...issued.authorityBoundary,
        organSpecificViewSufficiencyIssued: true,
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

  it('rejects execution, traditional-semantic, Production, and forged issuance widening', () => {
    const issued = issueFaceReadingProductCaptureViewContractFR191();

    expect(() => assertFaceReadingProductCaptureViewContractFR191({
      ...issued,
      privacyAndExecutionBoundary: {
        ...issued.privacyAndExecutionBoundary,
        participantImageAccepted: true,
      },
    } as never)).toThrow();

    expect(() => assertFaceReadingProductCaptureViewContractFR191({
      ...issued,
      authorityBoundary: {
        ...issued.authorityBoundary,
        traditionalSemanticAuthorityPromoted: true,
      },
    } as never)).toThrow();

    expect(() => assertFaceReadingProductCaptureViewContractFR191({
      ...issued,
      authorityBoundary: {
        ...issued.authorityBoundary,
        productionActivationAuthorized: true,
      },
    } as never)).toThrow();

    expect(() => assertIssuedFaceReadingProductCaptureViewContractFR191({ ...issued })).toThrow();
  });
});
