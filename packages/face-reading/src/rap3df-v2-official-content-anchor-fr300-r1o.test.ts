import { describe, expect, it } from 'vitest';
import { FR293_PRODUCT_COLUMN_MAP } from './rgb-selfie-product-column-map-fr293.js';
import {
  FR300_R1O_CURRENT_CONTENT_AUTHORITY,
  assertFR300R1OV2OfficialContentAnchorContract,
} from './rap3df-v2-official-content-anchor-fr300-r1o.js';

describe('FR300-R1O RAP3DF V2 official content anchor', () => {
  it('binds the official V4 database.json content anchor', () => {
    expect(FR300_R1O_CURRENT_CONTENT_AUTHORITY).toMatchObject({
      datasetRef: 'doi:10.17632/kpdkpcs8zb.4',
      datasetVersion: 4,
      v4DatasetContentAnchorBound: true,
      rootFileCount: 1,
      databaseIdentity: {
        filename: 'database.json',
        sizeBytes: 273343,
        sha256:
          'sha256:1366f0496078a250b43bafffc3483d3f949c33afb32520a041d92d353598e3ea',
      },
    });
  });

  it('does not pretend the generated archive digest is a V2-root publisher file identity', () => {
    expect(
      FR300_R1O_CURRENT_CONTENT_AUTHORITY.convenienceArchive,
    ).toMatchObject({
      observedSizeBytes: 66792678,
      observedSha256:
        'sha256:92a967bdacba4a7e5d387232f2d3308ad656022953c0139f615def2f607ccc5e',
      digestRepresentedInV2RootPublisherMetadata: false,
      publisherMetadataBound: false,
    });
  });

  it('keeps the creator metric conflict and FR300-R2 blocked', () => {
    const current = FR300_R1O_CURRENT_CONTENT_AUTHORITY;
    expect(current.creatorPipelineMetricConflictResolved).toBe(false);
    expect(current.authority.realFR299BundleEligible).toBe(false);
    expect(current.authority.fr300R2Eligible).toBe(false);
  });

  it('passes the frozen contract assertion', () => {
    expect(() =>
      assertFR300R1OV2OfficialContentAnchorContract(),
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
