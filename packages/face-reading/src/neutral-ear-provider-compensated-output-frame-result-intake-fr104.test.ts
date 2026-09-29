import { describe, expect, it } from 'vitest';
import { FaceAuthorityValidationError } from './validation.js';
import {
  admitNeutralEarProviderCompensatedOutputFrameResultFR104,
} from './neutral-ear-provider-compensated-output-frame-result-intake-fr104.js';

function candidate() {
  return {
    schemaVersion:
      'fr104-provider-compensated-output-frame-result-v1',
    authorityState:
      'bounded_coordinate_frame_candidate_no_anatomical_mapping',
    studyKind: 'retrospective_coordinate_frame_audit',
    predecessor: {
      resultSha256:
        '9b278cf355ec497f5978ce3ae22f5cf94a84bc0ce94908990157e04322a14a0c',
      liveReplayVerified: true,
      repositoryPersistence: false,
    },
    summary: {
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
      providerLabelsUsedToChooseFrame: false,
      anatomicalInterpretationUsed: false,
      anatomicalMappingReviewOutcome: 'hold',
    },
    authority: {
      providerCompensatedOutputFrameAudited: false,
      providerCompensatedOutputFrame: 'unresolved',
      composedProviderOrientationNormalizationAvailableForExactFixture:
        false,
      providerLabelMappedToAnatomicalSide: false,
      globalProviderAnatomicalSemanticsEstablished: false,
      anatomicalReferenceAdmitted: false,
      anatomicalLateralityAuthorized: false,
      validatedExternalEarObservationAuthorized: false,
      traditionalBindingAuthorized: false,
      productionAuthorization: false,
    },
  };
}

describe('FR104 U3.2.1 compensated output-frame intake', () => {
  it('admits original input frame while keeping anatomy closed', () => {
    const evidence =
      admitNeutralEarProviderCompensatedOutputFrameResultFR104(
        candidate(),
        '732268b973592f70f606000ffcbd0219e67afcc20b920e57906d14978f5cbb05',
      );

    expect(evidence.state).toBe(
      'original_input_frame_supported',
    );
    expect(evidence.providerCompensatedOutputFrame)
      .toBe('original_input_image_frame');
    expect(
      evidence
        .composedProviderOrientationNormalizationAvailableForExactFixture,
    ).toBe(true);
    expect(evidence.anatomicalLateralityAuthorized).toBe(false);
    expect(evidence.productionAuthorization).toBe(false);
  });

  it('rejects authority promotion in the candidate result', () => {
    const mutated =
      structuredClone(candidate()) as Record<string, unknown>;
    const authority =
      mutated.authority as Record<string, unknown>;
    authority.anatomicalLateralityAuthorized = true;

    expect(() =>
      admitNeutralEarProviderCompensatedOutputFrameResultFR104(
        mutated,
        '732268b973592f70f606000ffcbd0219e67afcc20b920e57906d14978f5cbb05',
      ),
    ).toThrow(FaceAuthorityValidationError);
  });
});
