import { describe, expect, it } from 'vitest';
import {
  inspectFR300R1ERawDepthBytes,
  type FR300R1ERawDepthByteIntakeReceipt,
} from './rap3df-v2-real-depth-byte-intake-fr300-r1e.js';
import {
  FR300_R1_RAP3DF_V2_DATASET_REF,
} from './rap3df-v2-qualification-fr300-r1.js';
import {
  FR300_R1F_EXECUTION_STATE,
  bindFR300R1FSourceProvenance,
  type FR300R1FMendeleyPublicFileMetadataReceipt,
} from './rap3df-v2-source-provenance-binding-fr300-r1f.js';
import { FR293_PRODUCT_COLUMN_MAP } from './rgb-selfie-product-column-map-fr293.js';

const FILE_ID = '123e4567-e89b-42d3-a456-426614174000';

function bytes(): Uint8Array {
  const result = new Uint8Array(16);
  const view = new DataView(result.buffer);
  view.setFloat64(0, 500, true);
  view.setFloat64(8, 600, true);
  return result;
}

function byteReceipt(
  metricReady: boolean,
): FR300R1ERawDepthByteIntakeReceipt {
  return inspectFR300R1ERawDepthBytes({
    schemaVersion:
      'fr300-r1e-raw-depth-byte-intake-input-v1',
    artifactRef: 'artifact:fixture:depth_.data',
    bytes: bytes(),
    width: 2,
    height: 1,
    byteWidthPerValue: 8,
    numericEncoding: 'float64_le',
    datasetSerializationEvidenceRef: metricReady
      ? 'evidence:fixture:v2-serialization'
      : null,
    datasetValueUnitEvidenceRef: metricReady
      ? 'evidence:fixture:v2-unit'
      : null,
    valuesBoundToNativeKinectDepthDistanceMillimeters:
      metricReady,
  });
}

function sourceMetadata(
  receipt: FR300R1ERawDepthByteIntakeReceipt,
): FR300R1FMendeleyPublicFileMetadataReceipt {
  return {
    schemaVersion:
      'fr300-r1f-mendeley-public-file-metadata-receipt-v1',
    datasetRef: FR300_R1_RAP3DF_V2_DATASET_REF,
    datasetVersion: 4,
    datasetPageEvidenceRef:
      'https://data.mendeley.com/datasets/kpdkpcs8zb',
    fileMetadataEvidenceRef:
      `https://api.data.mendeley.com/datasets/kpdkpcs8zb/files/${FILE_ID}`,
    metadataActuallyFetched: true,
    fileId: FILE_ID,
    filename: 'depth_.data',
    contentSha256: receipt.artifactDigest,
    sizeBytes: receipt.byteLength,
  };
}

describe('FR300-R1F source provenance binding', () => {
  it('source-binds matching byte-derived digest and public metadata without overclaiming metric evidence', () => {
    const byteIntake = byteReceipt(false);
    const receipt = bindFR300R1FSourceProvenance({
      schemaVersion: 'fr300-r1f-source-binding-input-v1',
      byteIntake,
      sourceMetadata: sourceMetadata(byteIntake),
    });

    expect(receipt.provenanceStatus).toBe('source_bound');
    expect(receipt.metricEvidenceStatus).toBe('blocked');
    expect(receipt.status).toBe(
      'source_bound_metric_evidence_blocked',
    );
    expect(receipt.blockers).toEqual([]);
    expect(
      receipt.authorityBoundary
        .publicFileMetadataIsSerializationProof,
    ).toBe(false);
    expect(
      receipt.authorityBoundary.publicFileMetadataIsValueUnitProof,
    ).toBe(false);
  });

  it('reaches metric-adjudication readiness only when FR300-R1E is independently ready', () => {
    const byteIntake = byteReceipt(true);
    const receipt = bindFR300R1FSourceProvenance({
      schemaVersion: 'fr300-r1f-source-binding-input-v1',
      byteIntake,
      sourceMetadata: sourceMetadata(byteIntake),
    });

    expect(receipt.status).toBe(
      'source_bound_ready_for_metric_scale_adjudication',
    );
    expect(receipt.provenanceStatus).toBe('source_bound');
    expect(receipt.metricEvidenceStatus).toBe(
      'ready_for_metric_scale_adjudication',
    );
  });

  it('accepts the anonymous Mendeley public-api files route when version 4 metadata was actually fetched', () => {
    const byteIntake = byteReceipt(false);
    const metadata = sourceMetadata(byteIntake);
    const receipt = bindFR300R1FSourceProvenance({
      schemaVersion: 'fr300-r1f-source-binding-input-v1',
      byteIntake,
      sourceMetadata: {
        ...metadata,
        fileMetadataEvidenceRef:
          'https://data.mendeley.com/public-api/datasets/kpdkpcs8zb/files?folder_id=fixture-folder&version=4',
      },
    });

    expect(receipt.provenanceStatus).toBe('source_bound');
    expect(receipt.blockers).toEqual([]);
  });

  it('rejects public-api near-match hosts, wrong dataset ids and wrong versions', () => {
    const byteIntake = byteReceipt(false);
    const metadata = sourceMetadata(byteIntake);

    for (const fileMetadataEvidenceRef of [
      'https://evil.data.mendeley.com/public-api/datasets/kpdkpcs8zb/files?version=4',
      'https://data.mendeley.com/public-api/datasets/not-rap3df/files?version=4',
      'https://data.mendeley.com/public-api/datasets/kpdkpcs8zb/files?version=3',
      'http://data.mendeley.com/public-api/datasets/kpdkpcs8zb/files?version=4',
    ]) {
      const receipt = bindFR300R1FSourceProvenance({
        schemaVersion: 'fr300-r1f-source-binding-input-v1',
        byteIntake,
        sourceMetadata: {
          ...metadata,
          fileMetadataEvidenceRef,
        },
      });

      expect(receipt.status).toBe('blocked');
      expect(receipt.blockers).toContain(
        'file_metadata_evidence_not_official',
      );
    }
  });

  it('fails closed when metadata was not actually fetched even if the URL looks official', () => {
    const byteIntake = byteReceipt(false);
    const metadata = sourceMetadata(byteIntake);
    const receipt = bindFR300R1FSourceProvenance({
      schemaVersion: 'fr300-r1f-source-binding-input-v1',
      byteIntake,
      sourceMetadata: {
        ...metadata,
        metadataActuallyFetched: false,
      },
    });

    expect(receipt.status).toBe('blocked');
    expect(receipt.blockers).toContain(
      'metadata_not_actually_fetched',
    );
    expect(
      receipt.authorityBoundary.urlStringAloneIsFetchProof,
    ).toBe(false);
  });

  it('fails closed when public metadata digest does not match actual byte-derived digest', () => {
    const byteIntake = byteReceipt(false);
    const metadata = sourceMetadata(byteIntake);
    const receipt = bindFR300R1FSourceProvenance({
      schemaVersion: 'fr300-r1f-source-binding-input-v1',
      byteIntake,
      sourceMetadata: {
        ...metadata,
        contentSha256: `sha256:${'0'.repeat(64)}`,
      },
    });

    expect(receipt.status).toBe('blocked');
    expect(receipt.blockers).toContain(
      'artifact_digest_mismatch',
    );
  });

  it('accepts an unprefixed public metadata SHA-256 after normalization', () => {
    const byteIntake = byteReceipt(false);
    const metadata = sourceMetadata(byteIntake);
    const receipt = bindFR300R1FSourceProvenance({
      schemaVersion: 'fr300-r1f-source-binding-input-v1',
      byteIntake,
      sourceMetadata: {
        ...metadata,
        contentSha256:
          byteIntake.artifactDigest.slice('sha256:'.length),
      },
    });

    expect(receipt.provenanceStatus).toBe('source_bound');
    expect(receipt.blockers).toEqual([]);
  });

  it('fails closed on wrong dataset version, filename, host, file id and size', () => {
    const byteIntake = byteReceipt(false);
    const metadata = sourceMetadata(byteIntake);
    const receipt = bindFR300R1FSourceProvenance({
      schemaVersion: 'fr300-r1f-source-binding-input-v1',
      byteIntake,
      sourceMetadata: {
        ...metadata,
        datasetVersion: 3,
        datasetPageEvidenceRef:
          'https://example.com/datasets/kpdkpcs8zb',
        fileMetadataEvidenceRef:
          'https://example.com/datasets/example/files/not-a-file',
        fileId: 'not-a-uuid',
        filename: 'depth_.bmp',
        sizeBytes: byteIntake.byteLength + 1,
      },
    });

    expect(receipt.status).toBe('blocked');
    expect(receipt.blockers).toEqual(
      expect.arrayContaining([
        'dataset_version_mismatch',
        'dataset_page_evidence_not_official',
        'file_metadata_evidence_not_official',
        'file_id_invalid',
        'depth_filename_mismatch',
        'artifact_size_mismatch',
      ]),
    );
  });

  it('records that no real RAP3DF source binding is fabricated by static contract tests', () => {
    expect(FR300_R1F_EXECUTION_STATE).toEqual({
      realRap3dfV2BytesRetrievedInCurrentExecution: false,
      realRap3dfV2PublicFileMetadataCaptured: false,
      realRap3dfV2SourceBindingIssued: false,
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
