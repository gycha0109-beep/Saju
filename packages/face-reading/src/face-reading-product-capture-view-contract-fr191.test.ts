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
    assertIssuedFaceReadingProductCaptureViewContractFR191(issued);

    expect(issued.requiredCaptureCount).toBe(2);
    expect(issued.requiredViewRoles).toEqual(['frontal', 'profile']);
    expect(issued.requiredViewRoles).toBe(FR191_REQUIRED_VIEW_ROLES);
    expect(issued.capturesPerRole).toEqual({ frontal: 1, profile: 1 });
    expect(issued.profileRole).toEqual({
      sideSemantics: 'side_agnostic_profile',
      anatomicalSideRequired: false,
      anatomicalSideBindingAuthorized: false,
      bilateralCaptureRequired: false,
    });
  });

  it('pins the current FR19 fail-closed mirror/laterality boundary', () => {
    const issued = issueFaceReadingProductCaptureViewContractFR191();

    expect(issued.orientationBoundary.fr19AuthorityVersion)
      .toBe(CAPTURE_ORIENTATION_AUTHORITY_FR19.authorityVersion);
    expect(issued.orientationBoundary.canonicalPixelOrientationState).toBe('exif_transform_normalized');
    expect(issued.orientationBoundary.anatomicalMirrorState).toBe('unresolved_source_pixels');
    expect(issued.orientationBoundary.imageXAxisMayDefineAnatomicalSide).toBe(false);
    expect(issued.orientationBoundary.productionLateralityBindingAllowed).toBe(false);
  });

  it('preserves organ-specific authority and FR188 research capture semantics as separate', () => {
    const issued = issueFaceReadingProductCaptureViewContractFR191();

    expect(issued.downstreamMethodPackBoundary.eyePairXiChangResearchCaptureProtocolRef)
      .toBe(FR188_CAPTURE_PROTOCOL_REF);
    expect(issued.downstreamMethodPackBoundary.supersedesEyePairXiChangResearchCaptureProtocol).toBe(false);
    expect(issued.downstreamMethodPackBoundary.sharedViewsProveSufficiencyForEveryOrgan).toBe(false);
    expect(issued.authorityBoundary.organSpecificViewSufficiencyIssued).toBe(false);
    expect(issued.authorityBoundary.organSpecificCaptureProtocolIssued).toBe(false);
    expect(issued.authorityBoundary.organSpecificLandmarkAuthorityIssued).toBe(false);
    expect(issued.authorityBoundary.organSpecificMetricAuthorityIssued).toBe(false);
    expect(issued.authorityBoundary.organSpecificConfoundAuthorityIssued).toBe(false);
  });

  it('rejects bilateral or oblique role widening', () => {
    const issued = issueFaceReadingProductCaptureViewContractFR191();

    expect(() => assertFaceReadingProductCaptureViewContractFR191({
      ...issued,
      requiredCaptureCount: 3,
      requiredViewRoles: ['frontal', 'profile', 'left_profile'],
    } as never)).toThrow(/capture-view role contract drift/i);

    expect(() => assertFaceReadingProductCaptureViewContractFR191({
      ...issued,
      authorityBoundary: {
        ...issued.authorityBoundary,
        bilateralProfileRequired: true,
      },
    } as never)).toThrow(/authority widening/i);

    expect(() => assertFaceReadingProductCaptureViewContractFR191({
      ...issued,
      authorityBoundary: {
        ...issued.authorityBoundary,
        obliqueViewRequired: true,
      },
    } as never)).toThrow(/authority widening/i);
  });

  it('rejects anatomical-side binding from the one profile view', () => {
    const issued = issueFaceReadingProductCaptureViewContractFR191();

    expect(() => assertFaceReadingProductCaptureViewContractFR191({
      ...issued,
      profileRole: {
        ...issued.profileRole,
        sideSemantics: 'anatomical_left' as never,
        anatomicalSideRequired: true as never,
        anatomicalSideBindingAuthorized: true as never,
      },
    } as never)).toThrow(/profile role/i);
  });

  it('rejects organ-specific, participant, evidence, semantic, or Production widening', () => {
    const issued = issueFaceReadingProductCaptureViewContractFR191();

    for (const key of [
      'organSpecificViewSufficiencyIssued',
      'organSpecificCaptureProtocolIssued',
      'organSpecificLandmarkAuthorityIssued',
      'organSpecificMetricAuthorityIssued',
      'organSpecificConfoundAuthorityIssued',
      'participantCaptureAuthorized',
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
        authorityBoundary: {
          ...issued.authorityBoundary,
          [key]: true,
        },
      } as never)).toThrow(/authority widening/i);
    }
  });

  it('rejects participant data execution or persistence widening', () => {
    const issued = issueFaceReadingProductCaptureViewContractFR191();

    expect(() => assertFaceReadingProductCaptureViewContractFR191({
      ...issued,
      privacyAndExecutionBoundary: {
        ...issued.privacyAndExecutionBoundary,
        participantImageAccepted: true,
      },
    } as never)).toThrow(/participant\/evidence execution widening/i);
  });

  it('rejects caller-constructed copies as issued authority', () => {
    const issued = issueFaceReadingProductCaptureViewContractFR191();
    const clone = { ...issued };

    expect(() => assertIssuedFaceReadingProductCaptureViewContractFR191(clone))
      .toThrow(/actively issued/i);
  });
});
