import { describe, expect, it } from 'vitest';
import {
  NEUTRAL_EAR_PROVIDER_COMPENSATED_OUTPUT_FRAME_FR104,
} from './neutral-ear-provider-compensated-output-frame-fr104.js';

describe('FR104 U3.2.1 compensated output frame protocol', () => {
  it('is explicitly retrospective and requires exact U3.2 live replay', () => {
    const protocol =
      NEUTRAL_EAR_PROVIDER_COMPENSATED_OUTPUT_FRAME_FR104;

    expect(protocol.studyKind).toBe(
      'retrospective_coordinate_frame_audit',
    );
    expect(protocol.predecessor.resultSha256).toBe(
      '9b278cf355ec497f5978ce3ae22f5cf94a84bc0ce94908990157e04322a14a0c',
    );
    expect(protocol.predecessor.liveReplayRequiredBeforeAnalysis)
      .toBe(true);
    expect(protocol.predecessor.repositoryPersistence).toBe(false);
  });

  it('pre-registers three coordinate-frame hypotheses', () => {
    expect(
      Object.keys(
        NEUTRAL_EAR_PROVIDER_COMPENSATED_OUTPUT_FRAME_FR104
          .hypotheses,
      ),
    ).toEqual([
      'canonical_output_frame',
      'original_input_image_frame',
      'opposite_rotated_output_frame',
    ]);
  });

  it('chooses frame from unordered geometry before provider labels', () => {
    const rule =
      NEUTRAL_EAR_PROVIDER_COMPENSATED_OUTPUT_FRAME_FR104
        .decisionRule;

    expect(rule.labelIndependentPrimaryMetric).toBe(
      'unordered_pair_cost_min_same_cross',
    );
    expect(rule.providerLabelRelationEvaluatedOnlyAfterFrameChoice)
      .toBe(true);
    expect(rule.numericAcceptanceThresholdAuthorized).toBe(false);
  });

  it('keeps anatomical and production authority closed before admission', () => {
    const authority =
      NEUTRAL_EAR_PROVIDER_COMPENSATED_OUTPUT_FRAME_FR104
        .authority;

    expect(authority.providerCompensatedOutputFrameAudited)
      .toBe(true);
    expect(authority.providerCompensatedOutputFrame)
      .toBe('original_input_image_frame');
    expect(
      authority
        .composedProviderOrientationNormalizationAvailableForExactFixture,
    ).toBe(true);
    expect(authority.providerLabelMappedToAnatomicalSide)
      .toBe(false);
    expect(authority.anatomicalLateralityAuthorized).toBe(false);
    expect(authority.productionAuthorization).toBe(false);
    expect(
      NEUTRAL_EAR_PROVIDER_COMPENSATED_OUTPUT_FRAME_FR104
        .admittedOutcome,
    ).toEqual({
      state: 'original_input_frame_supported',
      selectedHypothesis: 'original_input_image_frame',
      quarterTurnOriginalInputFrameStrictDominance: true,
      halfTurnIdentityRejected: true,
      aggregateUnorderedPairCost: {
        canonical_output_frame: 1.1000092040019644,
        original_input_image_frame: 0.017798602734814976,
        opposite_rotated_output_frame: 0.2062558418317363,
      },
      selectedSameLabelCaseIds: [
        'R0','R90','R180','R270',
        'M0','M90','M180','M270',
      ],
      selectedCrossLabelCaseIds: [],
      anatomicalMappingReviewOutcome: 'hold',
    });
  });
});
