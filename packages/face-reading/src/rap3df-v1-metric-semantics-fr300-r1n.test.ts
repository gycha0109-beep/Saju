import { describe, expect, it } from 'vitest';
import { FR293_PRODUCT_COLUMN_MAP } from './rgb-selfie-product-column-map-fr293.js';
import {
  FR300_R1N_CURRENT_METRIC_AUTHORITY,
  FR300_R1N_EVIDENCE,
  assertFR300R1NV1MetricSemanticsContract,
} from './rap3df-v1-metric-semantics-fr300-r1n.js';

describe('FR300-R1N RAP3DF V1 stored metric semantics', () => {
  it('separates upstream float millimeter semantics from creator byte selection', () => {
    expect(FR300_R1N_EVIDENCE).toMatchObject({
      creatorFrameAccessExpression:
        'context->depth2->data[i+2]',
      creatorDestinationScalarType: 'uint16_t',
      creatorPerformsTypedFloatDereference: false,
      creatorPerformsNumericFloatToUint16Conversion: false,
      creatorSelectsOneFrameStorageByte: true,
      upstreamDepthLogicalPixelType: 'float',
      upstreamDepthBytesPerPixel: 4,
      upstreamDepthUnit: 'millimeter',
      upstreamFrameDataStaticType: 'unsigned char*',
      creatorPinsExactLibfreenect2Revision: false,
    });
  });

  it('rejects the released V1 scalar as a metric reference', () => {
    expect(FR300_R1N_CURRENT_METRIC_AUTHORITY).toMatchObject({
      releasedScalarContainer: 'uint16_t',
      releasedByteOrder: 'little',
      creatorStoredOperation:
        'single_representation_byte_selection_then_zero_extension_to_uint16',
      storedScalarPreservesSourceNumericValue: false,
      storedScalarPreservesSourcePhysicalUnit: false,
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
