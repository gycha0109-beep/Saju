import { describe, expect, it } from 'vitest';
import { FR293_PRODUCT_COLUMN_MAP } from './rgb-selfie-product-column-map-fr293.js';
import {
  FR300_R1L_CREATOR_SERIALIZATION_EVIDENCE,
  FR300_R1L_CURRENT_SERIALIZATION_AUTHORITY,
  adjudicateFR300R1LV1Serialization,
} from './rap3df-v1-creator-serialization-fr300-r1l.js';

describe('FR300-R1L V1 historical creator serialization', () => {
  it('binds the 2017 V1 filename to a uint16 writer/reader pair', () => {
    expect(FR300_R1L_CREATOR_SERIALIZATION_EVIDENCE).toMatchObject({
      collectionDirectory: 'rap3df_data',
      exactDepthFilename: 'k1_box_xyz_depth.data',
      preCollectionWriterBlobSha:
        'e9676d1999e588026be7571a1307771f125ae0f2',
      postCollectionWriterBlobSha:
        'e9676d1999e588026be7571a1307771f125ae0f2',
      preCollectionFilenameContractBlobSha:
        'dbbdc2243ff82be71f449e175149dc28998b8124',
      postCollectionFilenameContractBlobSha:
        'dbbdc2243ff82be71f449e175149dc28998b8124',
      postCollectionSnapshotCommit:
        '2331937776e532ac67d049415b852498aa2a9cc8',
      postCollectionSnapshotDate: '2017-11-16T23:11:35Z',
      postCollectionExactDepthBlobCount: 267,
      postCollectionExactDepthBlobByteLength: 35462,
      postCollectionAllExactDepthBlobsSameByteLength: true,
      writerInputType: 'std::vector<uint16_t>',
      writerScalarType: 'uint16_t',
      writerByteOrderSemantics: 'host_native_unspecified',
      saveSourceVector: 'context->depthInBoxXYZ',
      sourceExtractionExpression: 'context->depth2->data[i+2]',
      readerContainerType: 'std::vector<uint16_t>',
      readerScalarType: 'uint16_t',
      publisherSampleCount: 12,
      publisherSampleByteLength: 35462,
      publisherSampleValueCountAtTwoBytes: 17731,
      everyPublisherSampleDigestAndSizeBound: true,
      articleProseScalarClaim: '8-byte floating point',
      articleBoundExpectedByteLength: 141848,
    });
  });

  it('records the historical commit immediately before the reported V1 collection start', () => {
    expect(
      FR300_R1L_CREATOR_SERIALIZATION_EVIDENCE
        .historicalCreatorCommitDate,
    ).toBe('2017-10-09T23:32:49Z');
    expect(
      FR300_R1L_CREATOR_SERIALIZATION_EVIDENCE
        .articleReportedCollectionStart,
    ).toBe('2017-10-10');
  });


  it('binds the unchanged writer/filename contract across the reported collection window and the post-collection corpus', () => {
    const evidence = FR300_R1L_CREATOR_SERIALIZATION_EVIDENCE;
    const findings = FR300_R1L_CURRENT_SERIALIZATION_AUTHORITY.findings;

    expect(evidence.preCollectionWriterBlobSha).toBe(
      evidence.postCollectionWriterBlobSha,
    );
    expect(evidence.preCollectionFilenameContractBlobSha).toBe(
      evidence.postCollectionFilenameContractBlobSha,
    );
    expect(evidence.postCollectionExactDepthBlobCount).toBe(267);
    expect(evidence.postCollectionExactDepthBlobByteLength).toBe(35_462);
    expect(findings.writerAndFilenameContractStableAcrossCollectionWindow).toBe(true);
    expect(findings.postCollectionTreeContains267ExactDepthArtifacts).toBe(true);
    expect(findings.postCollectionTreeAllExactDepthArtifactsAre35462Bytes).toBe(true);
  });

  it('treats the 12 publisher artifacts as corroboration of two-byte storage, not endian or unit authority', () => {
    const receipt = adjudicateFR300R1LV1Serialization();

    expect(receipt.status).toBe(
      'uint16_container_bound_endian_and_metric_authority_blocked',
    );
    expect(receipt.findings.publisherSampleCount).toBe(12);
    expect(
      receipt.findings
        .everyPublisherSampleExactlyTwoBytesPerArticlePixel,
    ).toBe(true);
    expect(
      receipt.findings
        .publisherBytesCorroborateCreatorContainerWidth,
    ).toBe(true);
    expect(receipt.serializationAuthority).toEqual({
      scalarContainerType: 'uint16_t',
      scalarContainerWidthBytes: 2,
      byteOrder: 'blocked_host_native_unspecified',
      physicalUnit: 'blocked',
      valuesBoundToNativeKinectDepthDistance: false,
    });
  });

  it('records the article conflict without promoting the 8-byte-float prose over creator and publisher bytes', () => {
    expect(
      FR300_R1L_CURRENT_SERIALIZATION_AUTHORITY.findings
        .articleEightByteFloatClaimConflictsWithReleasedArtifact,
    ).toBe(true);
    expect(
      FR300_R1L_CURRENT_SERIALIZATION_AUTHORITY.blockers,
    ).toContain(
      'article_prose_conflicts_with_creator_and_publisher_bytes',
    );
  });

  it('keeps FR299, FR300-R2, production and commerce blocked', () => {
    const authority =
      FR300_R1L_CURRENT_SERIALIZATION_AUTHORITY.authority;

    expect(authority.canonicalRegistrationIssued).toBe(false);
    expect(authority.realFR299BundleEligible).toBe(false);
    expect(authority.fr300R2Eligible).toBe(false);
    expect(authority.productColumnMaterialized).toBe(false);
    expect(authority.productionActivated).toBe(false);
    expect(authority.commerceActivated).toBe(false);
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
