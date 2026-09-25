import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { FR293_PRODUCT_COLUMN_MAP } from './rgb-selfie-product-column-map-fr293.js';
import {
  FR300_R1I_EXECUTION_STATE,
  FR300_R1I_EXPECTED_BYTE_LENGTH,
  FR300_R1I_EXPECTED_VALUE_COUNT,
  FR300_R1I_PUBLIC_EVIDENCE,
  FR300_R1I_V1_DATASET_REF,
  inspectFR300R1IV1Float64Artifact,
  type FR300R1IV1Float64ArtifactInput,
} from './rap3df-v1-float64-artifact-fr300-r1i.js';

const FILE_ID = '123e4567-e89b-42d3-a456-426614174000';

function fixtureBytes(
  endianness: 'little' | 'big',
): Uint8Array {
  const bytes = new Uint8Array(
    FR300_R1I_EXPECTED_BYTE_LENGTH,
  );
  const view = new DataView(bytes.buffer);
  for (
    let index = 0;
    index < FR300_R1I_EXPECTED_VALUE_COUNT;
    index += 1
  ) {
    view.setFloat64(
      index * 8,
      500 + (index % 250),
      endianness === 'little',
    );
  }
  return bytes;
}

function digest(bytes: Uint8Array): string {
  return `sha256:${createHash('sha256')
    .update(bytes)
    .digest('hex')}`;
}

function input(
  bytes: Uint8Array,
): FR300R1IV1Float64ArtifactInput {
  return {
    schemaVersion:
      'fr300-r1i-v1-float64-artifact-input-v1',
    artifactRef: 'artifact:fixture:k1_box_xyz_depth.data',
    bytes,
    sourceMetadata: {
      schemaVersion:
        'fr300-r1i-v1-public-file-metadata-receipt-v1',
      datasetRef: FR300_R1I_V1_DATASET_REF,
      datasetVersion: 3,
      fileMetadataEvidenceRef:
        `https://api.data.mendeley.com/datasets/kpdkpcs8zb/files/${FILE_ID}?version=3`,
      metadataActuallyFetched: true,
      fileId: FILE_ID,
      filename: 'k1_box_xyz_depth.data',
      contentSha256: digest(bytes),
      sizeBytes: bytes.byteLength,
    },
    declaredEndianness: 'unknown',
    endiannessEvidenceRef: null,
    declaredPhysicalUnit: 'unknown',
    physicalUnitEvidenceRef: null,
  };
}

describe('FR300-R1I RAP3DF V1 float64 artifact gate', () => {
  it('freezes the article-bound 119x149 eight-byte shape without inventing endianness or units', () => {
    expect(FR300_R1I_EXPECTED_VALUE_COUNT).toBe(17_731);
    expect(FR300_R1I_EXPECTED_BYTE_LENGTH).toBe(141_848);
    expect(
      FR300_R1I_PUBLIC_EVIDENCE
        .articleStatesDepthDataUsesEightByteFloatingPointValues,
    ).toBe(true);
    expect(
      FR300_R1I_PUBLIC_EVIDENCE.articleStatesExactEndianness,
    ).toBe(false);
    expect(
      FR300_R1I_PUBLIC_EVIDENCE.articleStatesExactPhysicalUnit,
    ).toBe(false);
  });

  it('source-binds an exact V1-shaped artifact but keeps metric adjudication blocked when endianness and unit evidence are absent', () => {
    const bytes = fixtureBytes('little');
    const receipt = inspectFR300R1IV1Float64Artifact(
      input(bytes),
    );

    expect(receipt.sourceProvenanceStatus).toBe(
      'source_bound',
    );
    expect(receipt.serializationStatus).toBe(
      'article_bound_float64_shape',
    );
    expect(receipt.endiannessStatus).toBe('blocked');
    expect(receipt.physicalUnitStatus).toBe('blocked');
    expect(receipt.metricAdjudicationStatus).toBe('blocked');
    expect(receipt.blockers).toEqual([
      'endianness_evidence_missing',
      'physical_unit_evidence_missing',
    ]);
  });

  it('decodes both endian interpretations but does not select one from numeric plausibility', () => {
    const bytes = fixtureBytes('little');
    const receipt = inspectFR300R1IV1Float64Artifact(
      input(bytes),
    );

    expect(
      receipt.littleEndianStatistics.finiteValueCount,
    ).toBe(FR300_R1I_EXPECTED_VALUE_COUNT);
    expect(
      receipt.littleEndianStatistics.minimumFiniteValue,
    ).toBe(500);
    expect(receipt.selectedStatistics).toBeNull();
    expect(
      receipt.authorityBoundary.numericRangeSelectsEndianness,
    ).toBe(false);
    expect(
      receipt.authorityBoundary.numericRangeSelectsPhysicalUnit,
    ).toBe(false);
  });

  it('can select big-endian statistics only when an explicit endianness evidence reference is supplied', () => {
    const bytes = fixtureBytes('big');
    const base = input(bytes);
    const receipt = inspectFR300R1IV1Float64Artifact({
      ...base,
      declaredEndianness: 'big',
      endiannessEvidenceRef:
        'evidence:fixture:v1-big-endian-contract',
    });

    expect(receipt.endiannessStatus).toBe('evidence_bound');
    expect(receipt.selectedStatistics?.endianness).toBe('big');
    expect(receipt.selectedStatistics?.minimumFiniteValue).toBe(
      500,
    );
    expect(receipt.metricAdjudicationStatus).toBe('blocked');
    expect(receipt.blockers).toContain(
      'physical_unit_evidence_missing',
    );
  });

  it('reaches only metric-adjudication readiness when independent endian and physical-unit evidence are both supplied', () => {
    const bytes = fixtureBytes('little');
    const base = input(bytes);
    const receipt = inspectFR300R1IV1Float64Artifact({
      ...base,
      declaredEndianness: 'little',
      endiannessEvidenceRef:
        'evidence:fixture:v1-little-endian-contract',
      declaredPhysicalUnit: 'millimeter',
      physicalUnitEvidenceRef:
        'evidence:fixture:v1-millimeter-contract',
    });

    expect(receipt.metricAdjudicationStatus).toBe(
      'ready_for_metric_adjudication',
    );
    expect(receipt.blockers).toEqual([]);
    expect(receipt.authorityBoundary.fr300R2Authorized).toBe(
      false,
    );
    expect(
      receipt.authorityBoundary
        .articleCcByEqualsParticipantCommercialConsent,
    ).toBe(false);
  });

  it('fails closed on unauthenticated bytes, wrong version, wrong depth filename and wrong byte length', () => {
    const bytes = fixtureBytes('little');
    const base = input(bytes);
    const shortBytes = bytes.slice(0, bytes.byteLength - 8);
    const receipt = inspectFR300R1IV1Float64Artifact({
      ...base,
      bytes: shortBytes,
      sourceMetadata: {
        ...base.sourceMetadata,
        metadataActuallyFetched: false,
        datasetVersion: 4,
        filename: 'rgb.bmp',
        contentSha256: digest(bytes),
        sizeBytes: bytes.byteLength,
      },
    });

    expect(receipt.sourceProvenanceStatus).toBe('blocked');
    expect(receipt.serializationStatus).toBe('blocked');
    expect(receipt.blockers).toEqual(
      expect.arrayContaining([
        'metadata_not_actually_fetched',
        'dataset_version_mismatch',
        'depth_artifact_filename_unqualified',
        'artifact_digest_mismatch',
        'artifact_size_mismatch',
        'expected_float64_shape_mismatch',
      ]),
    );
  });

  it('accepts the anonymous Mendeley public-api route only for V1 version 3', () => {
    const bytes = fixtureBytes('little');
    const base = input(bytes);
    const accepted = inspectFR300R1IV1Float64Artifact({
      ...base,
      sourceMetadata: {
        ...base.sourceMetadata,
        fileMetadataEvidenceRef:
          'https://data.mendeley.com/public-api/datasets/kpdkpcs8zb/files?folder_id=fixture&version=3',
      },
    });
    expect(accepted.sourceProvenanceStatus).toBe(
      'source_bound',
    );

    const rejected = inspectFR300R1IV1Float64Artifact({
      ...base,
      sourceMetadata: {
        ...base.sourceMetadata,
        fileMetadataEvidenceRef:
          'https://data.mendeley.com/public-api/datasets/kpdkpcs8zb/files?version=4',
      },
    });
    expect(rejected.blockers).toContain(
      'file_metadata_evidence_not_official',
    );
  });

  it('records that static tests do not fabricate a real V1 artifact receipt', () => {
    expect(FR300_R1I_EXECUTION_STATE).toEqual({
      realRap3dfV1BytesRetrievedInCurrentExecution: false,
      realRap3dfV1PublicFileMetadataCaptured: false,
      realRap3dfV1ArtifactBindingIssued: false,
      realRap3dfV1EndiannessIssued: false,
      realRap3dfV1PhysicalUnitIssued: false,
      realRap3dfV1MetricAdjudicationIssued: false,
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
