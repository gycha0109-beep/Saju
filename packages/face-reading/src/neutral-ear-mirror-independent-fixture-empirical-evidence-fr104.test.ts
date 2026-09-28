import { describe, expect, it } from 'vitest';
import {
  NEUTRAL_EAR_MIRROR_INDEPENDENT_FIXTURE_EMPIRICAL_DECISION_FR104,
  NEUTRAL_EAR_MIRROR_INDEPENDENT_FIXTURE_EMPIRICAL_EVIDENCE_FR104,
} from './neutral-ear-mirror-independent-fixture-empirical-evidence-fr104.js';

describe('FR104 independent public fixture empirical evidence', () => {
  it('recomputes the exact controlled reflection result', () => {
    const evidence =
      NEUTRAL_EAR_MIRROR_INDEPENDENT_FIXTURE_EMPIRICAL_EVIDENCE_FR104;

    expect(evidence.status).toBe('paired_scalar_evidence');
    expect(evidence.fixture).toEqual({
      fixtureRef: 'skimage_astronaut_public_domain',
      sha256:
        '88431cd9653ccd539741b555fb0a46b61558b301d4110412b5bc28b5e3ea6cb5',
      width: 512,
      height: 512,
    });
    expect(evidence.scalarEvidence).toEqual({
      original: {
        leftEyeCentroidX: 0.48118495009839535,
        rightEyeCentroidX: 0.39833978191018105,
      },
      mirrored: {
        leftEyeCentroidX: 0.5995679348707199,
        rightEyeCentroidX: 0.5179052278399467,
      },
      sameLabelReflectionTotalAbsoluteError:
        0.16450787521898746,
      crossLabelReflectionTotalAbsoluteError:
        0.0030021052807569504,
      closerPattern: 'cross_label_reflection_closer',
    });
  });

  it('records independent-source reproduction without anatomical promotion', () => {
    const decision =
      NEUTRAL_EAR_MIRROR_INDEPENDENT_FIXTURE_EMPIRICAL_DECISION_FR104;

    expect(
      decision.interpretation
        .independentSourceFixtureReproducesCrossLabelReflection,
    ).toBe(true);
    expect(
      decision.interpretation
        .resultAloneMayBeCalledGeneralProviderMirrorSemantics,
    ).toBe(false);
    expect(
      decision.interpretation
        .providerLabelMayBeCalledAnatomicalSide,
    ).toBe(false);
    expect(
      decision.authority.anatomicalLateralityAuthorized,
    ).toBe(false);
    expect(
      decision.authority.productionAuthorization,
    ).toBe(false);
  });
});
