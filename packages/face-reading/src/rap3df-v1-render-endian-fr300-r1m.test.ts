import { describe, expect, it } from 'vitest';
import { FR293_PRODUCT_COLUMN_MAP } from './rgb-selfie-product-column-map-fr293.js';
import {
  FR300_R1M_CURRENT_ENDIAN_AUTHORITY,
  assertFR300R1MV1RenderEndianContract,
} from './rap3df-v1-render-endian-fr300-r1m.js';

describe('FR300-R1M V1 matched creator-render endian authority', () => {
  it('binds little-endian from the authenticated render relationship', () => {
    expect(FR300_R1M_CURRENT_ENDIAN_AUTHORITY).toMatchObject({
      status: 'little_endian_render_relationship_bound',
      scalarContainerType: 'uint16_t',
      scalarContainerWidthBytes: 2,
      byteOrder: 'little',
      byteOrderStatus: 'evidence_bound',
      evidenceMethod:
        'publisher_authenticated_matched_creator_render_relationship',
      pixelCount: 17731,
      informativePixelCount: 8574,
      littleEndianExactPixelMatches: 17731,
      littleEndianInformativeMatches: 8574,
      bigEndianExactPixelMatches: 9157,
      bigEndianInformativeMatches: 0,
      numericPlausibilityUsedForSelection: false,
    });
  });

  it('keeps metric semantics and FR299/R2 blocked', () => {
    const current = FR300_R1M_CURRENT_ENDIAN_AUTHORITY;
    expect(current.physicalUnitStatus).toBe('blocked');
    expect(current.nativeKinectMetricEquivalence).toBe(false);
    expect(current.authority.realFR299BundleEligible).toBe(false);
    expect(current.authority.fr300R2Eligible).toBe(false);
    expect(current.authority.productColumnMaterialized).toBe(false);
  });

  it('passes the frozen contract assertion', () => {
    expect(() =>
      assertFR300R1MV1RenderEndianContract(),
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
