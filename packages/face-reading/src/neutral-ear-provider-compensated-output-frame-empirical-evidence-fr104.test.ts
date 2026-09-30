import { describe, expect, it } from 'vitest';
import {
  NEUTRAL_EAR_PROVIDER_COMPENSATED_OUTPUT_FRAME_EMPIRICAL_EVIDENCE_FR104,
} from './neutral-ear-provider-compensated-output-frame-empirical-evidence-fr104.js';

describe('FR104 U3.2.1 compensated output frame evidence', () => {
  it('pins predecessor and derived result digests', () => {
    const evidence =
      NEUTRAL_EAR_PROVIDER_COMPENSATED_OUTPUT_FRAME_EMPIRICAL_EVIDENCE_FR104;

    expect(evidence.predecessorResultSha256).toBe(
      '9b278cf355ec497f5978ce3ae22f5cf94a84bc0ce94908990157e04322a14a0c',
    );
    expect(evidence.derivedResultSha256).toBe(
      '732268b973592f70f606000ffcbd0219e67afcc20b920e57906d14978f5cbb05',
    );
  });

  it('admits original input frame and composed normalization only for exact fixture', () => {
    const evidence =
      NEUTRAL_EAR_PROVIDER_COMPENSATED_OUTPUT_FRAME_EMPIRICAL_EVIDENCE_FR104;

    expect(evidence.summary.state)
      .toBe('original_input_frame_supported');
    expect(
      evidence.interpretation.providerCompensatedOutputFrame,
    ).toBe('original_input_image_frame');
    expect(
      evidence.interpretation
        .composedProviderOrientationNormalizationAvailableForExactFixture,
    ).toBe(true);
    expect(
      evidence.interpretation.prospectiveValidationStillRequired,
    ).toBe(true);
  });

  it('keeps anatomical/traditional/production authority closed', () => {
    const authority =
      NEUTRAL_EAR_PROVIDER_COMPENSATED_OUTPUT_FRAME_EMPIRICAL_EVIDENCE_FR104
        .authority;

    expect(authority.providerLabelMappedToAnatomicalSide)
      .toBe(false);
    expect(authority.anatomicalLateralityAuthorized).toBe(false);
    expect(authority.traditionalBindingAuthorized).toBe(false);
    expect(authority.productionAuthorization).toBe(false);
  });
});
