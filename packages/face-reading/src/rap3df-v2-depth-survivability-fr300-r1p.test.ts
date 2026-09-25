import { describe, expect, it } from 'vitest';
import { FR293_PRODUCT_COLUMN_MAP } from './rgb-selfie-product-column-map-fr293.js';
import {
  FR300_R1P_CURRENT_DEPTH_AUTHORITY,
  FR300_R1P_EXACT_ARTIFACT_RECEIPTS,
  assertFR300R1PV2DepthSurvivabilityContract,
} from './rap3df-v2-depth-survivability-fr300-r1p.js';

describe('FR300-R1P RAP3DF V2 official depth survivability', () => {
  it('binds five official V4 depth artifacts exactly to creator bytes', () => {
    expect(FR300_R1P_EXACT_ARTIFACT_RECEIPTS).toHaveLength(5);
    for (const receipt of FR300_R1P_EXACT_ARTIFACT_RECEIPTS) {
      expect(receipt.sizeBytes).toBe(35462);
      expect(receipt.exactByteIdentity).toBe(true);
      expect(receipt.sha256).toMatch(/^sha256:[0-9a-f]{64}$/u);
    }
    expect(
      FR300_R1P_CURRENT_DEPTH_AUTHORITY.exactArtifactMatchCount,
    ).toBe(5);
  });

  it('binds the official V4 artifacts to the creator single-byte projection lineage', () => {
    expect(FR300_R1P_CURRENT_DEPTH_AUTHORITY).toMatchObject({
      status: 'official_v4_creator_bytes_exactly_bound',
      creatorSingleByteProjectionLineageBound: true,
      metricDepthRecoverability:
        'destroyed_by_single_byte_projection',
      metricReferenceDisposition: 'rejected_for_metric_reference',
    });
  });

  it('keeps metric scale, FR299 and FR300-R2 blocked', () => {
    expect(FR300_R1P_CURRENT_DEPTH_AUTHORITY.authority).toMatchObject({
      metricScaleAdmitted: false,
      realFR299BundleEligible: false,
      fr300R2Eligible: false,
      productColumnMaterialized: false,
      productionActivated: false,
      commerceActivated: false,
    });
  });

  it('passes the frozen contract assertion', () => {
    expect(() =>
      assertFR300R1PV2DepthSurvivabilityContract(),
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
