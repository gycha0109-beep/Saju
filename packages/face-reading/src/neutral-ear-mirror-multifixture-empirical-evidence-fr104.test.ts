import { describe, expect, it } from 'vitest';
import {
  NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_EMPIRICAL_DECISION_FR104,
  NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_EMPIRICAL_EVIDENCE_FR104,
} from './neutral-ear-mirror-multifixture-empirical-evidence-fr104.js';

describe('FR104 multi-fixture empirical mirror evidence', () => {
  it('admits two successful and two unavailable fixtures', () => {
    expect(
      NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_EMPIRICAL_EVIDENCE_FR104
        .aggregate,
    ).toEqual({
      fixtureCount: 4,
      successfulFixtureCount: 2,
      unavailableFixtureCount: 2,
      closerPatternCounts: {
        same_label_reflection_closer: 0,
        cross_label_reflection_closer: 2,
        equal: 0,
      },
    });
  });

  it('recomputes the two successful reflection relations exactly', () => {
    const [portrait, small] =
      NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_EMPIRICAL_EVIDENCE_FR104
        .successfulFixtures;

    expect(portrait).toMatchObject({
      fixtureRef: 'portrait_baseline',
      scalarEvidence: {
        sameLabelReflectionTotalAbsoluteError:
          0.2042770180851221,
        crossLabelReflectionTotalAbsoluteError:
          0.001415284350514412,
        closerPattern: 'cross_label_reflection_closer',
      },
    });
    expect(small).toMatchObject({
      fixtureRef: 'portrait_small_candidate',
      scalarEvidence: {
        sameLabelReflectionTotalAbsoluteError:
          0.20350541360676289,
        crossLabelReflectionTotalAbsoluteError:
          0.008334586396813393,
        closerPattern: 'cross_label_reflection_closer',
      },
    });
    expect(
      NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_EMPIRICAL_EVIDENCE_FR104
        .integrity.successfulScalarErrorsRecomputed,
    ).toBe(true);
  });

  it('retains both zero-face cases as bounded unavailable evidence', () => {
    expect(
      NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_EMPIRICAL_EVIDENCE_FR104
        .unavailableFixtures,
    ).toEqual([
      {
        fixtureRef: 'male_full_height_hands_candidate',
        status: 'unavailable_pair',
        digestVerified: true,
        originalFaceCount: 0,
        mirroredFaceCount: 0,
      },
      {
        fixtureRef: 'pose_candidate',
        status: 'unavailable_pair',
        digestVerified: true,
        originalFaceCount: 0,
        mirroredFaceCount: 0,
      },
    ]);
  });

  it('does not overstate fixture diversity or general semantics', () => {
    const limit =
      NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_EMPIRICAL_DECISION_FR104
        .evidenceLimit;

    expect(limit.independentIdentityDiversityEstablished)
      .toBe(false);
    expect(
      limit.portraitSmallIndependenceFromPortraitEstablished,
    ).toBe(false);
    expect(
      limit.generalProviderMirrorSemanticsEstablished,
    ).toBe(false);
  });

  it('keeps anatomy and Production unauthorized', () => {
    const authority =
      NEUTRAL_EAR_MIRROR_MULTI_FIXTURE_EMPIRICAL_DECISION_FR104
        .authority;

    expect(authority.providerLabelMayBeCalledAnatomicalSide)
      .toBe(false);
    expect(authority.anatomicalLateralityAuthorized)
      .toBe(false);
    expect(authority.validatedExternalEarObservationAuthorized)
      .toBe(false);
    expect(authority.traditionalBindingAuthorized).toBe(false);
    expect(authority.productionAuthorization).toBe(false);
  });
});
