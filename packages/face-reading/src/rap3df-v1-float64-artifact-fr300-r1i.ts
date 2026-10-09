import { createHash } from 'node:crypto';
import {
  FR300_R1H_CURRENT_GATE,
  FR300_R1H_INDEPENDENT_3D_CANDIDATE_GATE_CONTRACT_VERSION,
} from './independent-3d-reference-candidate-gate-fr300-r1h.js';
import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR300_R1I_RAP3DF_V1_FLOAT64_ARTIFACT_CONTRACT_VERSION =
  'FR300-R1I-RAP3DF-V1-FLOAT64-ARTIFACT-v1' as const;

export const FR300_R1I_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr300-r1i-rap3df-v1-float64-artifact.md' as const;

export const FR300_R1I_V1_DATASET_REF =
  'doi:10.17632/kpdkpcs8zb.3' as const;
export const FR300_R1I_V1_DATASET_PAGE_REF =
  'https://data.mendeley.com/datasets/kpdkpcs8zb/3' as const;
export const FR300_R1I_V1_ARTICLE_REF =
  'doi:10.1016/j.dib.2020.106281' as const;

export const FR300_R1I_EXPECTED_WIDTH = 119 as const;
export const FR300_R1I_EXPECTED_HEIGHT = 149 as const;
export const FR300_R1I_EXPECTED_VALUE_COUNT =
  FR300_R1I_EXPECTED_WIDTH * FR300_R1I_EXPECTED_HEIGHT;
export const FR300_R1I_FLOAT64_BYTES_PER_VALUE = 8 as const;
export const FR300_R1I_EXPECTED_BYTE_LENGTH =
  FR300_R1I_EXPECTED_VALUE_COUNT *
  FR300_R1I_FLOAT64_BYTES_PER_VALUE;

export const FR300_R1I_PUBLIC_EVIDENCE = Object.freeze({
  releasedVolunteerCount: 64 as const,
  sampleCount: 267 as const,
  visibleInfraredDepthCollectedTogether: true as const,
  articleStatesKinectOne: true as const,
  articleStatesDataSavedWithoutManipulation: true as const,
  articleStatesDepthDataUsesEightByteFloatingPointValues:
    true as const,
  articleStatesImageWidth: FR300_R1I_EXPECTED_WIDTH,
  articleStatesImageHeight: FR300_R1I_EXPECTED_HEIGHT,
  articleStatesDepthRepresentsDistanceToCameraColocatedVirtualSurface:
    true as const,
  articleStatesExactEndianness: false as const,
  articleStatesExactPhysicalUnit: false as const,
  releasedSubjectsAgreedToImageAvailability: true as const,
  signedConsentAndImageUseTermReported: true as const,
  participantCommercialProductUseScopeEstablished:
    false as const,
  ethicsApprovalCaae: '97615018.9.0000.012' as const,
  datasetLicense: 'CC BY 4.0' as const,
});

export const FR300_R1I_EXECUTION_STATE = Object.freeze({
  realRap3dfV1BytesRetrievedInCurrentExecution: false as const,
  realRap3dfV1PublicFileMetadataCaptured: false as const,
  realRap3dfV1ArtifactBindingIssued: false as const,
  realRap3dfV1EndiannessIssued: false as const,
  realRap3dfV1PhysicalUnitIssued: false as const,
  realRap3dfV1MetricAdjudicationIssued: false as const,
  realFR299BundleIssued: false as const,
});

export type FR300R1IEndianness =
  | 'little'
  | 'big'
  | 'unknown';

export type FR300R1IPhysicalUnit =
  | 'millimeter'
  | 'centimeter'
  | 'meter'
  | 'unknown';

export interface FR300R1IV1PublicFileMetadataReceipt {
  readonly schemaVersion:
    'fr300-r1i-v1-public-file-metadata-receipt-v1';
  readonly datasetRef: string;
  readonly datasetVersion: number;
  readonly fileMetadataEvidenceRef: string;
  readonly metadataActuallyFetched: boolean;
  readonly fileId: string;
  readonly filename: string;
  readonly contentSha256: string;
  readonly sizeBytes: number;
}

export interface FR300R1IV1Float64ArtifactInput {
  readonly schemaVersion:
    'fr300-r1i-v1-float64-artifact-input-v1';
  readonly artifactRef: string;
  readonly bytes: Uint8Array;
  readonly sourceMetadata:
    FR300R1IV1PublicFileMetadataReceipt;
  readonly declaredEndianness: FR300R1IEndianness;
  readonly endiannessEvidenceRef: string | null;
  readonly declaredPhysicalUnit: FR300R1IPhysicalUnit;
  readonly physicalUnitEvidenceRef: string | null;
}

export type FR300R1IBlocker =
  | 'metadata_not_actually_fetched'
  | 'dataset_ref_mismatch'
  | 'dataset_version_mismatch'
  | 'file_metadata_evidence_not_official'
  | 'file_id_invalid'
  | 'depth_artifact_filename_unqualified'
  | 'source_sha256_invalid'
  | 'artifact_digest_mismatch'
  | 'source_size_invalid'
  | 'artifact_size_mismatch'
  | 'expected_float64_shape_mismatch'
  | 'endianness_evidence_missing'
  | 'physical_unit_evidence_missing';

export interface FR300R1IFloat64Statistics {
  readonly endianness: 'little' | 'big';
  readonly valueCount: number;
  readonly finiteValueCount: number;
  readonly positiveFiniteValueCount: number;
  readonly zeroValueCount: number;
  readonly negativeFiniteValueCount: number;
  readonly nonFiniteValueCount: number;
  readonly minimumFiniteValue: number | null;
  readonly maximumFiniteValue: number | null;
}

export interface FR300R1IV1Float64ArtifactReceipt {
  readonly schemaVersion:
    'fr300-r1i-v1-float64-artifact-receipt-v1';
  readonly contractVersion:
    typeof FR300_R1I_RAP3DF_V1_FLOAT64_ARTIFACT_CONTRACT_VERSION;
  readonly watchtowerTrack: 'face-engine';
  readonly datasetRef: typeof FR300_R1I_V1_DATASET_REF;
  readonly datasetVersion: 3;
  readonly artifactRef: string;
  readonly artifactDigest: string;
  readonly byteLength: number;
  readonly expectedByteLength:
    typeof FR300_R1I_EXPECTED_BYTE_LENGTH;
  readonly littleEndianStatistics:
    FR300R1IFloat64Statistics;
  readonly bigEndianStatistics:
    FR300R1IFloat64Statistics;
  readonly selectedStatistics:
    FR300R1IFloat64Statistics | null;
  readonly sourceProvenanceStatus: 'source_bound' | 'blocked';
  readonly serializationStatus:
    | 'article_bound_float64_shape'
    | 'blocked';
  readonly endiannessStatus: 'evidence_bound' | 'blocked';
  readonly physicalUnitStatus: 'evidence_bound' | 'blocked';
  readonly metricAdjudicationStatus:
    | 'ready_for_metric_adjudication'
    | 'blocked';
  readonly blockers: readonly FR300R1IBlocker[];
  readonly authorityBoundary: {
    readonly numericRangeSelectsEndianness: false;
    readonly numericRangeSelectsPhysicalUnit: false;
    readonly articleCcByEqualsParticipantCommercialConsent:
      false;
    readonly ethicsApprovalEqualsParticipantCommercialConsent:
      false;
    readonly canonicalRegistrationIssued: false;
    readonly realFR299BundleIssued: false;
    readonly fr300R2Authorized: false;
    readonly productColumnMaterialized: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly researchNoteRef: typeof FR300_R1I_RESEARCH_NOTE_REF;
}

const SHA256_HEX = /^[0-9a-f]{64}$/u;
const SHA256_PREFIXED = /^sha256:[0-9a-f]{64}$/u;
const UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;
const V1_DEPTH_FILENAME =
  /^k1_box_xyz_depth(?:_[a-z0-9-]+)?\.(?:data|raw)$/iu;

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-300-R1I ${message}`,
  );
}

function normalizeSha256(value: string): string | null {
  const normalized = value.trim().toLowerCase();
  if (SHA256_PREFIXED.test(normalized)) {
    return normalized;
  }
  if (SHA256_HEX.test(normalized)) {
    return `sha256:${normalized}`;
  }
  return null;
}

function sha256(bytes: Uint8Array): string {
  return `sha256:${createHash('sha256')
    .update(bytes)
    .digest('hex')}`;
}

function isOfficialV1FileMetadataRef(value: string): boolean {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') return false;

    const currentApiPath =
      /^\/datasets\/(?:publics\/)?kpdkpcs8zb\/files(?:\/[^/]+)?\/?$/u;
    if (
      url.hostname === 'api.data.mendeley.com' &&
      currentApiPath.test(url.pathname) &&
      url.searchParams.get('version') === '3'
    ) {
      return true;
    }

    return (
      url.hostname === 'data.mendeley.com' &&
      url.pathname ===
        '/public-api/datasets/kpdkpcs8zb/files' &&
      url.searchParams.get('version') === '3'
    );
  } catch {
    return false;
  }
}

function inspectFloat64(
  bytes: Uint8Array,
  endianness: 'little' | 'big',
): FR300R1IFloat64Statistics {
  const completeValueCount = Math.floor(
    bytes.byteLength / FR300_R1I_FLOAT64_BYTES_PER_VALUE,
  );
  const view = new DataView(
    bytes.buffer,
    bytes.byteOffset,
    bytes.byteLength,
  );

  let finiteValueCount = 0;
  let positiveFiniteValueCount = 0;
  let zeroValueCount = 0;
  let negativeFiniteValueCount = 0;
  let nonFiniteValueCount = 0;
  let minimumFiniteValue: number | null = null;
  let maximumFiniteValue: number | null = null;

  for (
    let index = 0;
    index < completeValueCount;
    index += 1
  ) {
    const value = view.getFloat64(
      index * FR300_R1I_FLOAT64_BYTES_PER_VALUE,
      endianness === 'little',
    );

    if (!Number.isFinite(value)) {
      nonFiniteValueCount += 1;
      continue;
    }

    finiteValueCount += 1;
    if (value > 0) positiveFiniteValueCount += 1;
    else if (value === 0) zeroValueCount += 1;
    else negativeFiniteValueCount += 1;

    minimumFiniteValue =
      minimumFiniteValue === null
        ? value
        : Math.min(minimumFiniteValue, value);
    maximumFiniteValue =
      maximumFiniteValue === null
        ? value
        : Math.max(maximumFiniteValue, value);
  }

  return Object.freeze({
    endianness,
    valueCount: completeValueCount,
    finiteValueCount,
    positiveFiniteValueCount,
    zeroValueCount,
    negativeFiniteValueCount,
    nonFiniteValueCount,
    minimumFiniteValue,
    maximumFiniteValue,
  });
}

export function inspectFR300R1IV1Float64Artifact(
  input: FR300R1IV1Float64ArtifactInput,
): FR300R1IV1Float64ArtifactReceipt {
  if (
    input.schemaVersion !==
      'fr300-r1i-v1-float64-artifact-input-v1'
  ) {
    fail('input schemaVersion drift.');
  }
  if (!(input.bytes instanceof Uint8Array)) {
    fail('bytes must be a Uint8Array.');
  }
  if (
    input.sourceMetadata.schemaVersion !==
      'fr300-r1i-v1-public-file-metadata-receipt-v1'
  ) {
    fail('source metadata schemaVersion drift.');
  }

  const blockers: FR300R1IBlocker[] = [];
  const source = input.sourceMetadata;
  const artifactDigest = sha256(input.bytes);

  if (!source.metadataActuallyFetched) {
    blockers.push('metadata_not_actually_fetched');
  }
  if (source.datasetRef !== FR300_R1I_V1_DATASET_REF) {
    blockers.push('dataset_ref_mismatch');
  }
  if (source.datasetVersion !== 3) {
    blockers.push('dataset_version_mismatch');
  }
  if (!isOfficialV1FileMetadataRef(source.fileMetadataEvidenceRef)) {
    blockers.push('file_metadata_evidence_not_official');
  }
  if (!UUID.test(source.fileId)) {
    blockers.push('file_id_invalid');
  }
  if (!V1_DEPTH_FILENAME.test(source.filename)) {
    blockers.push('depth_artifact_filename_unqualified');
  }

  const sourceDigest = normalizeSha256(source.contentSha256);
  if (sourceDigest === null) {
    blockers.push('source_sha256_invalid');
  } else if (sourceDigest !== artifactDigest) {
    blockers.push('artifact_digest_mismatch');
  }

  if (
    !Number.isSafeInteger(source.sizeBytes) ||
    source.sizeBytes <= 0
  ) {
    blockers.push('source_size_invalid');
  } else if (source.sizeBytes !== input.bytes.byteLength) {
    blockers.push('artifact_size_mismatch');
  }

  if (
    input.bytes.byteLength !== FR300_R1I_EXPECTED_BYTE_LENGTH
  ) {
    blockers.push('expected_float64_shape_mismatch');
  }

  const endiannessBound =
    input.declaredEndianness !== 'unknown' &&
    input.endiannessEvidenceRef !== null &&
    input.endiannessEvidenceRef.trim().length > 0;
  if (!endiannessBound) {
    blockers.push('endianness_evidence_missing');
  }

  const physicalUnitBound =
    input.declaredPhysicalUnit !== 'unknown' &&
    input.physicalUnitEvidenceRef !== null &&
    input.physicalUnitEvidenceRef.trim().length > 0;
  if (!physicalUnitBound) {
    blockers.push('physical_unit_evidence_missing');
  }

  const littleEndianStatistics = inspectFloat64(
    input.bytes,
    'little',
  );
  const bigEndianStatistics = inspectFloat64(
    input.bytes,
    'big',
  );
  const selectedStatistics =
    input.declaredEndianness === 'little'
      ? littleEndianStatistics
      : input.declaredEndianness === 'big'
        ? bigEndianStatistics
        : null;

  const provenanceBlockers: readonly FR300R1IBlocker[] = [
    'metadata_not_actually_fetched',
    'dataset_ref_mismatch',
    'dataset_version_mismatch',
    'file_metadata_evidence_not_official',
    'file_id_invalid',
    'depth_artifact_filename_unqualified',
    'source_sha256_invalid',
    'artifact_digest_mismatch',
    'source_size_invalid',
    'artifact_size_mismatch',
  ];
  const sourceProvenanceStatus = blockers.some((blocker) =>
    provenanceBlockers.includes(blocker),
  )
    ? 'blocked'
    : 'source_bound';

  const serializationStatus =
    sourceProvenanceStatus === 'source_bound' &&
    !blockers.includes('expected_float64_shape_mismatch')
      ? 'article_bound_float64_shape'
      : 'blocked';

  const metricAdjudicationStatus =
    serializationStatus === 'article_bound_float64_shape' &&
    endiannessBound &&
    physicalUnitBound &&
    selectedStatistics !== null &&
    selectedStatistics.finiteValueCount > 0
      ? 'ready_for_metric_adjudication'
      : 'blocked';

  return Object.freeze({
    schemaVersion:
      'fr300-r1i-v1-float64-artifact-receipt-v1' as const,
    contractVersion:
      FR300_R1I_RAP3DF_V1_FLOAT64_ARTIFACT_CONTRACT_VERSION,
    watchtowerTrack: 'face-engine' as const,
    datasetRef: FR300_R1I_V1_DATASET_REF,
    datasetVersion: 3 as const,
    artifactRef: input.artifactRef,
    artifactDigest,
    byteLength: input.bytes.byteLength,
    expectedByteLength: FR300_R1I_EXPECTED_BYTE_LENGTH,
    littleEndianStatistics,
    bigEndianStatistics,
    selectedStatistics,
    sourceProvenanceStatus,
    serializationStatus,
    endiannessStatus: endiannessBound
      ? 'evidence_bound'
      : 'blocked',
    physicalUnitStatus: physicalUnitBound
      ? 'evidence_bound'
      : 'blocked',
    metricAdjudicationStatus,
    blockers: Object.freeze(blockers),
    authorityBoundary: Object.freeze({
      numericRangeSelectsEndianness: false as const,
      numericRangeSelectsPhysicalUnit: false as const,
      articleCcByEqualsParticipantCommercialConsent:
        false as const,
      ethicsApprovalEqualsParticipantCommercialConsent:
        false as const,
      canonicalRegistrationIssued: false as const,
      realFR299BundleIssued: false as const,
      fr300R2Authorized: false as const,
      productColumnMaterialized: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
    researchNoteRef: FR300_R1I_RESEARCH_NOTE_REF,
  });
}

export function assertFR300R1IV1Float64ArtifactContract():
void {
  if (
    FR300_R1H_INDEPENDENT_3D_CANDIDATE_GATE_CONTRACT_VERSION !==
      'FR300-R1H-INDEPENDENT-3D-CANDIDATE-GATE-v1'
  ) {
    fail('FR300-R1H predecessor contract drift.');
  }

  if (
    !FR300_R1H_CURRENT_GATE
      .permissiveRightsButTechnicalOrConsentBlocked.includes(
        'rap3df_v1',
      )
  ) {
    fail('RAP3DF V1 predecessor candidate state drift.');
  }

  if (
    FR300_R1I_EXPECTED_VALUE_COUNT !== 17_731 ||
    FR300_R1I_EXPECTED_BYTE_LENGTH !== 141_848
  ) {
    fail('V1 article-bound float64 shape drift.');
  }

  assertFR293ProductColumnMap();
  const materializedCount = FR293_PRODUCT_COLUMN_MAP.filter(
    (candidate) =>
      candidate.implementationState ===
        'canonical_extractor_materialized',
  ).length;
  if (materializedCount !== 18) {
    fail(
      'FR300-R1I must preserve 18/29 product materialization.',
    );
  }
}

assertFR300R1IV1Float64ArtifactContract();
