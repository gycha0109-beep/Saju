import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { FR293_PRODUCT_COLUMN_MAP } from './rgb-selfie-product-column-map-fr293.js';
import {
  FR300_R1E_EXECUTION_STATE,
  inspectFR300R1ERawDepthBytes,
} from './rap3df-v2-real-depth-byte-intake-fr300-r1e.js';

function float64Fixture(values: readonly number[]): Uint8Array {
  const bytes = new Uint8Array(values.length * 8);
  const view = new DataView(bytes.buffer);
  values.forEach((value, index) => {
    view.setFloat64(index * 8, value, true);
  });
  return bytes;
}

describe('FR300-R1E real depth byte intake', () => {
  it('derives digest and statistics from supplied bytes instead of caller-authored values', () => {
    const bytes = float64Fixture([500, 600]);

    const receipt = inspectFR300R1ERawDepthBytes({
      schemaVersion:
        'fr300-r1e-raw-depth-byte-intake-input-v1',
      artifactRef: 'artifact:fixture:depth',
      bytes,
      width: 2,
      height: 1,
      byteWidthPerValue: 8,
      numericEncoding: 'float64_le',
      datasetSerializationEvidenceRef:
        'evidence:fixture:serialization',
      datasetValueUnitEvidenceRef:
        'evidence:fixture:unit',
      valuesBoundToNativeKinectDepthDistanceMillimeters:
        true,
    });

    const expectedDigest = `sha256:${createHash('sha256')
      .update(bytes)
      .digest('hex')}`;

    expect(receipt.artifactDigest).toBe(expectedDigest);
    expect(receipt.decodedStatistics).toEqual({
      completeValueCount: 2,
      finiteValueCount: 2,
      minimumFiniteValue: 500,
      maximumFiniteValue: 600,
    });
    expect(receipt.intakeBlockers).toEqual([]);
    expect(receipt.status).toBe(
      'ready_for_metric_scale_adjudication',
    );
    expect(receipt.inspectionReport.status).toBe(
      'ready_for_metric_scale_adjudication',
    );
  });

  it('supports uint16 little-endian without inferring that RAP3DF V2 uses it', () => {
    const bytes = new Uint8Array(4);
    const view = new DataView(bytes.buffer);
    view.setUint16(0, 0, true);
    view.setUint16(2, 1000, true);

    const receipt = inspectFR300R1ERawDepthBytes({
      schemaVersion:
        'fr300-r1e-raw-depth-byte-intake-input-v1',
      artifactRef: 'artifact:fixture:uint16-depth',
      bytes,
      width: 2,
      height: 1,
      byteWidthPerValue: 2,
      numericEncoding: 'uint16_le',
      datasetSerializationEvidenceRef:
        'evidence:fixture:serialization',
      datasetValueUnitEvidenceRef:
        'evidence:fixture:unit',
      valuesBoundToNativeKinectDepthDistanceMillimeters:
        true,
    });

    expect(receipt.decodedStatistics).toEqual({
      completeValueCount: 2,
      finiteValueCount: 2,
      minimumFiniteValue: 0,
      maximumFiniteValue: 1000,
    });
    expect(
      receipt.authorityBoundary.encodingInferredFromBytes,
    ).toBe(false);
  });

  it('fails closed when encoding and declared byte width disagree', () => {
    const receipt = inspectFR300R1ERawDepthBytes({
      schemaVersion:
        'fr300-r1e-raw-depth-byte-intake-input-v1',
      artifactRef: 'artifact:fixture:mismatch',
      bytes: new Uint8Array(8),
      width: 1,
      height: 1,
      byteWidthPerValue: 8,
      numericEncoding: 'float32_le',
      datasetSerializationEvidenceRef:
        'evidence:fixture:serialization',
      datasetValueUnitEvidenceRef:
        'evidence:fixture:unit',
      valuesBoundToNativeKinectDepthDistanceMillimeters:
        true,
    });

    expect(receipt.status).toBe('blocked');
    expect(receipt.intakeBlockers).toContain(
      'encoding_byte_width_mismatch',
    );
    expect(
      receipt.inspectionReport.blockers,
    ).toContain('numeric_encoding_not_established');
  });

  it('fails closed on trailing partial values', () => {
    const receipt = inspectFR300R1ERawDepthBytes({
      schemaVersion:
        'fr300-r1e-raw-depth-byte-intake-input-v1',
      artifactRef: 'artifact:fixture:trailing',
      bytes: new Uint8Array(10),
      width: 1,
      height: 1,
      byteWidthPerValue: 8,
      numericEncoding: 'float64_le',
      datasetSerializationEvidenceRef:
        'evidence:fixture:serialization',
      datasetValueUnitEvidenceRef:
        'evidence:fixture:unit',
      valuesBoundToNativeKinectDepthDistanceMillimeters:
        true,
    });

    expect(receipt.status).toBe('blocked');
    expect(receipt.intakeBlockers).toContain(
      'partial_trailing_value_bytes',
    );
    expect(receipt.inspectionReport.blockers).toContain(
      'byte_length_not_equal_to_grid_times_value_width',
    );
  });

  it('does not guess an unknown encoding from byte patterns or numeric range', () => {
    const receipt = inspectFR300R1ERawDepthBytes({
      schemaVersion:
        'fr300-r1e-raw-depth-byte-intake-input-v1',
      artifactRef: 'artifact:fixture:unknown',
      bytes: new Uint8Array(16),
      width: 2,
      height: 1,
      byteWidthPerValue: 8,
      numericEncoding: 'unknown',
      datasetSerializationEvidenceRef: null,
      datasetValueUnitEvidenceRef: null,
      valuesBoundToNativeKinectDepthDistanceMillimeters:
        false,
    });

    expect(receipt.status).toBe('blocked');
    expect(receipt.decodedStatistics).toEqual({
      completeValueCount: 0,
      finiteValueCount: 0,
      minimumFiniteValue: null,
      maximumFiniteValue: null,
    });
    expect(receipt.inspectionReport.blockers).toEqual(
      expect.arrayContaining([
        'numeric_encoding_not_established',
        'finite_value_coverage_incomplete',
        'dataset_serialization_evidence_missing',
        'dataset_value_unit_evidence_missing',
        'dataset_values_not_bound_to_native_kinect_depth_semantics',
      ]),
    );
    expect(
      receipt.authorityBoundary.datasetUnitInferredFromNumericRange,
    ).toBe(false);
  });

  it('records that current static execution still contains no real RAP3DF V2 bytes or authority', () => {
    expect(FR300_R1E_EXECUTION_STATE).toEqual({
      realRap3dfV2BytesRetrievedInCurrentExecution: false,
      realRap3dfV2DigestIssued: false,
      realRap3dfV2MetricScaleIssued: false,
      realRap3dfV2CanonicalRegistrationIssued: false,
      realFR299BundleIssued: false,
    });
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
