import { describe, expect, it } from 'vitest';
import { FR293_PRODUCT_COLUMN_MAP } from './rgb-selfie-product-column-map-fr293.js';
import {
  FR300_R1N_CURRENT_METRIC_AUTHORITY,
  FR300_R1N_EVIDENCE,
  assertFR300R1NV1MetricSemanticsContract,
  projectFR300R1NCreatorDepthByte,
} from './rap3df-v1-metric-semantics-fr300-r1n.js';

describe('FR300-R1N RAP3DF V1 stored metric semantics', () => {
  it('separates upstream float millimeter semantics from creator byte selection', () => {
    expect(FR300_R1N_EVIDENCE).toMatchObject({
      creatorFrameAccessExpression:
        'context->depth2->data[i+2]',
      creatorDepthFrameBindingExpression:
        'depth2 = frames[libfreenect2::Frame::Depth]',
      creatorDestinationScalarType: 'uint16_t',
      creatorPerformsTypedFloatDereference: false,
      creatorPerformsNumericFloatToUint16Conversion: false,
      creatorSelectsOneFrameStorageByte: true,
      upstreamDepthLogicalPixelType: 'float',
      upstreamDepthBytesPerPixel: 4,
      upstreamDepthUnit: 'millimeter',
      upstreamFrameDataStaticType: 'unsigned char*',
      upstreamRegistrationDepthCast:
        'const float *depth_data = (float*)depth->data',
      upstreamMetricConversionExpression:
        'undistorted_data[512*r+c]/1000.0f',
      creatorPinsExactLibfreenect2Revision: false,
    });
  });

  it('proves the creator projection is many-to-one before uint16 serialization', () => {
    const sourceA = Uint8Array.from([0x00, 0x00, 0x7a, 0x44]);
    const sourceB = Uint8Array.from([0x00, 0x40, 0x7a, 0x44]);
    const sourceC = Uint8Array.from([0x00, 0x80, 0x7a, 0x44]);

    expect(sourceA).not.toEqual(sourceB);
    expect(sourceB).not.toEqual(sourceC);
    expect(projectFR300R1NCreatorDepthByte(sourceA)).toBe(0x7a);
    expect(projectFR300R1NCreatorDepthByte(sourceB)).toBe(0x7a);
    expect(projectFR300R1NCreatorDepthByte(sourceC)).toBe(0x7a);
    expect(
      FR300_R1N_CURRENT_METRIC_AUTHORITY.metricDepthRecoverability,
    ).toBe('destroyed_by_single_byte_projection');
  });

  it('fails closed when the creator projection is not given exactly one four-byte source pixel', () => {
    expect(() =>
      projectFR300R1NCreatorDepthByte(Uint8Array.from([1, 2, 3])),
    ).toThrow();
  });

  it('rejects the released V1 scalar as a metric reference', () => {
    expect(FR300_R1N_CURRENT_METRIC_AUTHORITY).toMatchObject({
      releasedScalarContainer: 'uint16_t',
      releasedByteOrder: 'little',
      creatorStoredOperation:
        'single_representation_byte_selection_then_zero_extension_to_uint16',
      storedScalarPreservesSourceNumericValue: false,
      storedScalarPreservesSourcePhysicalUnit: false,
      creatorProjectionInformationBitsUpperBound: 8,
      sourceFloatRepresentationBits: 32,
      metricDepthRecoverability:
        'destroyed_by_single_byte_projection',
      physicalUnitStatus:
        'not_applicable_to_released_scalar_as_metric_distance',
      metricReferenceDisposition:
        'rejected_for_metric_reference',
      nonMetricStructuralResearchEligible: true,
    });
  });

  it('keeps FR299 and FR300-R2 blocked and directs the metric path to another candidate', () => {
    const current = FR300_R1N_CURRENT_METRIC_AUTHORITY;
    expect(current.authority.realFR299BundleEligible).toBe(false);
    expect(current.authority.fr300R2Eligible).toBe(false);
    expect(current.nextAction).toBe(
      'remove_rap3df_v1_from_metric_reference_path_and_pivot_to_next_independent_3d_candidate',
    );
  });

  it('passes the frozen contract assertion', () => {
    expect(() =>
      assertFR300R1NV1MetricSemanticsContract(),
    ).not.toThrow();
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
