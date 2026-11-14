import { describe, expect, it, vi } from 'vitest';
import {
  consumePhotoMetricEvidence,
  type PhotoMetricEvidenceInput,
} from './photo-metric-evidence.js';
import { materializeRealLocalHairlineMetricReferenceFR318 } from './hairline-real-local-metric-receipt-fr318.js';
import { assembleExactCaptureSevenReferenceCommonFrameBundleFR319 } from './seven-reference-common-frame-bundle-fr319.js';

vi.mock('./hairline-real-local-metric-receipt-fr318.js', () => ({
  materializeRealLocalHairlineMetricReferenceFR318: vi.fn(),
}));
vi.mock('./seven-reference-common-frame-bundle-fr319.js', () => ({
  assembleExactCaptureSevenReferenceCommonFrameBundleFR319: vi.fn(),
}));
const digest = `sha256:${'a'.repeat(64)}`;
// Minimal synthetic protocol stubs test orchestration, never admitted real evidence.
const input = () =>
  ({
    schemaVersion: 'fr318-fr319-local-private-execution-input-v1',
    fr318: {
      registrationInput: {
        evidence: { rgbCaptureDigest: digest, metricSupportSourceImageDigest: digest },
        hairlineMaterialization: { status: 'unavailable' },
      },
    },
    fr319: null,
  }) as unknown as PhotoMetricEvidenceInput;

describe('photo bytes -> existing metric evidence execution', () => {
  it('rejects cross-photo evidence before invoking the materializer', () => {
    vi.clearAllMocks();
    expect(() => consumePhotoMetricEvidence(input(), `sha256:${'b'.repeat(64)}`)).toThrow(
      /not bound/u,
    );
    expect(materializeRealLocalHairlineMetricReferenceFR318).not.toHaveBeenCalled();
  });
  it('propagates actual FR318 blockers without accepting a success flag', () => {
    vi.mocked(materializeRealLocalHairlineMetricReferenceFR318).mockReturnValue({
      status: 'unavailable',
      reason: 'real_review_missing',
      repoSafeReceipt: {},
    } as never);
    expect(consumePhotoMetricEvidence(input(), digest)).toMatchObject({
      status: 'blocked_at_fr318',
      blockedReasons: ['real_review_missing'],
      measurementAuthorized: false,
    });
  });
  it('executes the common-frame assembler and retains its neutral authority limit', () => {
    vi.mocked(materializeRealLocalHairlineMetricReferenceFR318).mockReturnValue({
      status: 'available',
      repoSafeReceipt: {},
    } as never);
    const selected = input();
    expect(consumePhotoMetricEvidence(selected, digest).status).toBe(
      'fr318_available_fr319_missing',
    );
    const stage = {
      schemaVersion: 'fr318-fr319-local-fr319-stage-input-v1',
      exactCaptureProvenance: { bindings: { brow: { sourceCaptureDigest: digest } } },
    };
    vi.mocked(assembleExactCaptureSevenReferenceCommonFrameBundleFR319).mockReturnValue({
      status: 'available',
      repoSafeReceipt: {},
      runtimeOnlyBundle: { references: [{ value: 12 }], threeDivisionsSpanExecutionReady: false },
    } as never);
    const result = consumePhotoMetricEvidence(
      { ...selected, fr319: stage } as unknown as PhotoMetricEvidenceInput,
      digest,
    );
    expect(assembleExactCaptureSevenReferenceCommonFrameBundleFR319).toHaveBeenCalled();
    expect(result).toMatchObject({
      status: 'common_frame_references_available',
      measurementAuthorized: false,
    });
    expect(result.blockedReasons).toContain('fr319_cross_reference_subtraction_not_authorized');
    stage.exactCaptureProvenance.bindings.brow.sourceCaptureDigest = `sha256:${'b'.repeat(64)}`;
    expect(() =>
      consumePhotoMetricEvidence(
        { ...selected, fr319: stage } as unknown as PhotoMetricEvidenceInput,
        digest,
      ),
    ).toThrow(/not bound/u);
  });
});
