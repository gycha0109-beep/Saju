import { describe, expect, it } from 'vitest';
import { FR293_PRODUCT_COLUMN_MAP } from './rgb-selfie-product-column-map-fr293.js';
import {
  FR300_R1G_CREATOR_PIPELINE_EVIDENCE,
  FR300_R1G_CREATOR_SAMPLE_EVIDENCE,
  FR300_R1G_CURRENT_METRIC_AUTHORITY,
  adjudicateFR300R1GCurrentMetricAuthority,
} from './rap3df-v2-creator-pipeline-metric-audit-fr300-r1g.js';

describe('FR300-R1G creator-pipeline metric audit', () => {
  it('freezes the creator acquisition mismatch instead of treating V2 storage as native Kinect depth', () => {
    expect(FR300_R1G_CREATOR_PIPELINE_EVIDENCE).toMatchObject({
      collectionDirectory: 'rap3df_data_02',
      creatorSnapshotFaceIdCount: 80,
      acquisitionLibrary: 'libfreenect2',
      nativeDepthFrameBytesPerPixel: 4,
      nativeDepthFrameInterpretation: 'float32',
      creatorExtractionExpression:
        'context->_depth->data[i+2]',
      extractedSourceWidthBits: 8,
      storedContainerType: 'uint16_t',
      storedBytesPerValue: 2,
      consumerWidth: 119,
      consumerHeight: 149,
      expectedStoredValueCount: 17731,
      expectedStoredByteLength: 35462,
      exactMendeleyV4ByteIdentityVerified: false,
    });
  });

  it('records five cross-subject creator samples with a one-byte payload surface inside two-byte words', () => {
    expect(FR300_R1G_CREATOR_SAMPLE_EVIDENCE).toHaveLength(5);
    expect(
      new Set(
        FR300_R1G_CREATOR_SAMPLE_EVIDENCE.map(
          (sample) => sample.subjectRef,
        ),
      ).size,
    ).toBe(5);

    for (const sample of FR300_R1G_CREATOR_SAMPLE_EVIDENCE) {
      expect(sample.byteLength).toBe(119 * 149 * 2);
      expect(sample.decodedWordCount).toBe(119 * 149);
      expect(sample.secondByteNonzeroCount).toBe(0);
      expect(sample.maximumLittleEndianWord).toBeLessThan(256);
    }
  });

  it('blocks current metric authority and FR300-R2 eligibility', () => {
    const receipt =
      adjudicateFR300R1GCurrentMetricAuthority();

    expect(receipt.status).toBe(
      'blocked_pending_exact_v4_metric_export_evidence',
    );
    expect(receipt.blockers).toEqual(
      expect.arrayContaining([
        'creator_pipeline_reads_one_byte_from_four_byte_depth_frame',
        'creator_pipeline_widens_extracted_byte_into_uint16_storage',
        'creator_samples_show_single_byte_payload_in_two_byte_words',
        'exact_mendeley_v4_byte_identity_unverified',
        'v4_specific_metric_export_spec_missing',
      ]),
    );
    expect(
      receipt.authority
        .valuesBoundToNativeKinectDepthDistanceMillimeters,
    ).toBe(false);
    expect(receipt.authority.metricScaleAdmitted).toBe(false);
    expect(receipt.authority.fr300R2Eligible).toBe(false);
    expect(receipt.authority.realFR299BundleEligible).toBe(false);
  });

  it('requires exact V4 evidence to reopen rather than promoting the older V1 article or generic Kinect semantics', () => {
    expect(
      FR300_R1G_CURRENT_METRIC_AUTHORITY.reopenRequirements,
    ).toEqual([
      'exact_mendeley_v4_depth_bytes_inspected',
      'v4_specific_serialization_evidence',
      'v4_specific_metric_unit_evidence',
      'evidence_resolving_creator_pipeline_vs_published_v4_semantics',
    ]);
  });

  it('preserves product materialization at 18/29', () => {
    expect(
      FR293_PRODUCT_COLUMN_MAP.filter(
        (candidate) =>
          candidate.implementationState ===
            'canonical_extractor_materialized',
      ),
    ).toHaveLength(18);
  });
});
