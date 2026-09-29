import { describe, expect, it } from 'vitest';
import { FaceAuthorityValidationError } from './validation.js';
import {
  admitNeutralEarMakeHumanProviderPreflightResultFR104,
} from './neutral-ear-makehuman-provider-preflight-result-intake-fr104.js';
import {
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_PREFLIGHT_EMPIRICAL_DECISION_FR104,
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_PREFLIGHT_EMPIRICAL_EVIDENCE_FR104,
  NEUTRAL_EAR_MAKEHUMAN_PROVIDER_PREFLIGHT_EMPIRICAL_SOURCE_FR104,
} from './neutral-ear-makehuman-provider-preflight-empirical-evidence-fr104.js';

describe('FR104 U2 MakeHuman provider preflight empirical evidence', () => {
  it('admits the exact pinned fixture one-face 478-landmark result', () => {
    const evidence =
      NEUTRAL_EAR_MAKEHUMAN_PROVIDER_PREFLIGHT_EMPIRICAL_EVIDENCE_FR104;

    expect(evidence.providerEligibility).toEqual({
      faceCount: 1,
      landmarkCount: 478,
      exactlyOneFaceVerified: true,
    });
    expect(evidence.providerEyeCentroids).toEqual({
      providerLeft: {
        x: 0.5904278568923473,
        y: 0.512873537838459,
      },
      providerRight: {
        x: 0.4134050067514181,
        y: 0.5108402445912361,
      },
      topologyLabelAuthority:
        'provider_label_only_no_anatomical_meaning',
    });
    expect(evidence.comparison).toEqual({
      directCost: 0.02456967216060714,
      swappedCost: 0.35972525227214214,
      relation: 'direct_assignment_closer',
      numericAcceptanceThresholdApplied: false,
    });
  });

  it('admits only exact-fixture detectability and keeps anatomical semantics closed', () => {
    const decision =
      NEUTRAL_EAR_MAKEHUMAN_PROVIDER_PREFLIGHT_EMPIRICAL_DECISION_FR104;

    expect(
      decision.interpretation
        .providerFaceDetectabilityVerifiedForExactPinnedFixture,
    ).toBe(true);
    expect(
      decision.interpretation
        .exactFixtureDirectAssignmentRelationObserved,
    ).toBe(true);
    expect(
      decision.interpretation
        .providerLabelMayBeCalledAnatomicalSide,
    ).toBe(false);
    expect(
      decision.interpretation
        .resultMayEstablishGlobalProviderAnatomicalSemantics,
    ).toBe(false);
    expect(
      decision.interpretation.anatomicalReferenceAdmitted,
    ).toBe(false);
    expect(
      decision.authority.anatomicalLateralityAuthorized,
    ).toBe(false);
    expect(
      decision.authority.productionAuthorization,
    ).toBe(false);
  });

  it('rejects semantic promotion in a copied empirical result', () => {
    const mutated = structuredClone(
      NEUTRAL_EAR_MAKEHUMAN_PROVIDER_PREFLIGHT_EMPIRICAL_SOURCE_FR104,
    ) as unknown as Record<string, unknown>;
    const authority =
      mutated.authority as Record<string, unknown>;
    authority.providerLabelMappedToAnatomicalSide = true;

    expect(() =>
      admitNeutralEarMakeHumanProviderPreflightResultFR104(mutated),
    ).toThrow(FaceAuthorityValidationError);
  });
});
