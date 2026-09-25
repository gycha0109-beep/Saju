import {
  FR300_R1E_REAL_DEPTH_BYTE_INTAKE_CONTRACT_VERSION,
  type FR300R1ERawDepthByteIntakeReceipt,
} from './rap3df-v2-real-depth-byte-intake-fr300-r1e.js';
import {
  FR300_R1_RAP3DF_V2_DATASET_REF,
  FR300_R1_RAP3DF_V2_OFFICIAL_SOURCE_REF,
} from './rap3df-v2-qualification-fr300-r1.js';
import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
} from './rgb-selfie-product-column-map-fr293.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR300_R1F_SOURCE_PROVENANCE_BINDING_CONTRACT_VERSION =
  'FR300-R1F-SOURCE-PROVENANCE-BINDING-v1' as const;

export const FR300_R1F_RESEARCH_NOTE_REF =
  'repo:research/face-reading/fr300-r1f-source-provenance-binding.md' as const;

export const FR300_R1F_MENDELEY_API_DOCS_REF =
  'https://data.mendeley.com/api/docs/' as const;

export const FR300_R1F_EXECUTION_STATE = Object.freeze({
  realRap3dfV2BytesRetrievedInCurrentExecution: false as const,
  realRap3dfV2PublicFileMetadataCaptured: false as const,
  realRap3dfV2SourceBindingIssued: false as const,
  realRap3dfV2MetricScaleIssued: false as const,
  realRap3dfV2CanonicalRegistrationIssued: false as const,
  realFR299BundleIssued: false as const,
});

export interface FR300R1FMendeleyPublicFileMetadataReceipt {
  readonly schemaVersion:
    'fr300-r1f-mendeley-public-file-metadata-receipt-v1';
  readonly datasetRef: string;
  readonly datasetVersion: number;
  readonly datasetPageEvidenceRef: string;
  readonly fileMetadataEvidenceRef: string;
  readonly metadataActuallyFetched: boolean;
  readonly fileId: string;
  readonly filename: string;
  readonly contentSha256: string;
  readonly sizeBytes: number;
}

export type FR300R1FSourceBindingBlocker =
  | 'byte_intake_contract_mismatch'
  | 'metadata_not_actually_fetched'
  | 'dataset_ref_mismatch'
  | 'dataset_version_mismatch'
  | 'dataset_page_evidence_not_official'
  | 'file_metadata_evidence_not_official'
  | 'file_id_invalid'
  | 'depth_filename_mismatch'
  | 'source_sha256_invalid'
  | 'artifact_digest_mismatch'
  | 'source_size_invalid'
  | 'artifact_size_mismatch';

export interface FR300R1FSourceBindingInput {
  readonly schemaVersion:
    'fr300-r1f-source-binding-input-v1';
  readonly byteIntake:
    FR300R1ERawDepthByteIntakeReceipt;
  readonly sourceMetadata:
    FR300R1FMendeleyPublicFileMetadataReceipt;
}

export interface FR300R1FSourceBindingReceipt {
  readonly schemaVersion:
    'fr300-r1f-source-binding-receipt-v1';
  readonly contractVersion:
    typeof FR300_R1F_SOURCE_PROVENANCE_BINDING_CONTRACT_VERSION;
  readonly watchtowerTrack: 'face-engine';
  readonly datasetRef:
    typeof FR300_R1_RAP3DF_V2_DATASET_REF;
  readonly datasetVersion: 4;
  readonly artifactRef: string;
  readonly artifactDigest: string;
  readonly byteLength: number;
  readonly fileId: string;
  readonly filename: string;
  readonly provenanceStatus: 'source_bound' | 'blocked';
  readonly metricEvidenceStatus:
    | 'ready_for_metric_scale_adjudication'
    | 'blocked';
  readonly status:
    | 'source_bound_ready_for_metric_scale_adjudication'
    | 'source_bound_metric_evidence_blocked'
    | 'blocked';
  readonly blockers:
    readonly FR300R1FSourceBindingBlocker[];
  readonly authorityBoundary: {
    readonly urlStringAloneIsFetchProof: false;
    readonly publicFileMetadataIsSerializationProof: false;
    readonly publicFileMetadataIsValueUnitProof: false;
    readonly v1ArticleEncodingPromotedToV2: false;
    readonly personalityPrivacyClearanceIssued: false;
    readonly participantConsentClearanceIssued: false;
    readonly canonicalRegistrationIssued: false;
    readonly realFR299BundleIssued: false;
    readonly productColumnMaterialized: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly researchNoteRef: typeof FR300_R1F_RESEARCH_NOTE_REF;
}

const SHA256_HEX = /^[0-9a-f]{64}$/u;
const SHA256_PREFIXED = /^sha256:[0-9a-f]{64}$/u;
const UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FR-300-R1F ${message}`,
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

function isOfficialDatasetPage(value: string): boolean {
  try {
    const url = new URL(value);
    return (
      url.protocol === 'https:' &&
      url.hostname === 'data.mendeley.com' &&
      url.pathname.startsWith('/datasets/kpdkpcs8zb')
    );
  } catch {
    return false;
  }
}

function isOfficialPublicFileMetadataRef(
  value: string,
): boolean {
  try {
    const url = new URL(value);
    return (
      url.protocol === 'https:' &&
      url.hostname === 'api.data.mendeley.com' &&
      url.pathname.includes('/datasets/') &&
      url.pathname.includes('/files/')
    );
  } catch {
    return false;
  }
}

export function bindFR300R1FSourceProvenance(
  input: FR300R1FSourceBindingInput,
): FR300R1FSourceBindingReceipt {
  if (
    input.schemaVersion !==
      'fr300-r1f-source-binding-input-v1'
  ) {
    fail('source binding input schemaVersion drift.');
  }

  const blockers: FR300R1FSourceBindingBlocker[] = [];
  const byteIntake = input.byteIntake;
  const source = input.sourceMetadata;

  if (
    byteIntake.schemaVersion !==
      'fr300-r1e-raw-depth-byte-intake-receipt-v1' ||
    byteIntake.contractVersion !==
      FR300_R1E_REAL_DEPTH_BYTE_INTAKE_CONTRACT_VERSION ||
    byteIntake.watchtowerTrack !== 'face-engine'
  ) {
    blockers.push('byte_intake_contract_mismatch');
  }

  if (
    source.schemaVersion !==
      'fr300-r1f-mendeley-public-file-metadata-receipt-v1'
  ) {
    fail('source metadata receipt schemaVersion drift.');
  }

  if (!source.metadataActuallyFetched) {
    blockers.push('metadata_not_actually_fetched');
  }

  if (source.datasetRef !== FR300_R1_RAP3DF_V2_DATASET_REF) {
    blockers.push('dataset_ref_mismatch');
  }

  if (source.datasetVersion !== 4) {
    blockers.push('dataset_version_mismatch');
  }

  if (!isOfficialDatasetPage(source.datasetPageEvidenceRef)) {
    blockers.push('dataset_page_evidence_not_official');
  }

  if (
    !isOfficialPublicFileMetadataRef(
      source.fileMetadataEvidenceRef,
    )
  ) {
    blockers.push('file_metadata_evidence_not_official');
  }

  if (!UUID.test(source.fileId)) {
    blockers.push('file_id_invalid');
  }

  if (source.filename !== 'depth_.data') {
    blockers.push('depth_filename_mismatch');
  }

  const sourceDigest = normalizeSha256(source.contentSha256);
  if (sourceDigest === null) {
    blockers.push('source_sha256_invalid');
  } else if (sourceDigest !== byteIntake.artifactDigest) {
    blockers.push('artifact_digest_mismatch');
  }

  if (
    !Number.isSafeInteger(source.sizeBytes) ||
    source.sizeBytes <= 0
  ) {
    blockers.push('source_size_invalid');
  } else if (source.sizeBytes !== byteIntake.byteLength) {
    blockers.push('artifact_size_mismatch');
  }

  const provenanceStatus =
    blockers.length === 0 ? 'source_bound' : 'blocked';

  const metricEvidenceStatus =
    byteIntake.status ===
      'ready_for_metric_scale_adjudication'
      ? 'ready_for_metric_scale_adjudication'
      : 'blocked';

  const status =
    provenanceStatus === 'blocked'
      ? 'blocked'
      : metricEvidenceStatus ===
          'ready_for_metric_scale_adjudication'
        ? 'source_bound_ready_for_metric_scale_adjudication'
        : 'source_bound_metric_evidence_blocked';

  return Object.freeze({
    schemaVersion:
      'fr300-r1f-source-binding-receipt-v1' as const,
    contractVersion:
      FR300_R1F_SOURCE_PROVENANCE_BINDING_CONTRACT_VERSION,
    watchtowerTrack: 'face-engine' as const,
    datasetRef: FR300_R1_RAP3DF_V2_DATASET_REF,
    datasetVersion: 4 as const,
    artifactRef: byteIntake.artifactRef,
    artifactDigest: byteIntake.artifactDigest,
    byteLength: byteIntake.byteLength,
    fileId: source.fileId,
    filename: source.filename,
    provenanceStatus,
    metricEvidenceStatus,
    status,
    blockers: Object.freeze(blockers),
    authorityBoundary: Object.freeze({
      urlStringAloneIsFetchProof: false as const,
      publicFileMetadataIsSerializationProof: false as const,
      publicFileMetadataIsValueUnitProof: false as const,
      v1ArticleEncodingPromotedToV2: false as const,
      personalityPrivacyClearanceIssued: false as const,
      participantConsentClearanceIssued: false as const,
      canonicalRegistrationIssued: false as const,
      realFR299BundleIssued: false as const,
      productColumnMaterialized: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
    researchNoteRef: FR300_R1F_RESEARCH_NOTE_REF,
  });
}

export function assertFR300R1FSourceProvenanceBindingContract():
void {
  if (
    FR300_R1E_REAL_DEPTH_BYTE_INTAKE_CONTRACT_VERSION !==
      'FR300-R1E-REAL-DEPTH-BYTE-INTAKE-v1'
  ) {
    fail('FR300-R1E predecessor contract drift.');
  }

  if (
    FR300_R1_RAP3DF_V2_OFFICIAL_SOURCE_REF !==
      'https://data.mendeley.com/datasets/kpdkpcs8zb'
  ) {
    fail('RAP3DF V2 official source ref drift.');
  }

  assertFR293ProductColumnMap();

  const materializedCount = FR293_PRODUCT_COLUMN_MAP.filter(
    (candidate) =>
      candidate.implementationState ===
        'canonical_extractor_materialized',
  ).length;

  if (materializedCount !== 18) {
    fail(
      'FR300-R1F must preserve 18/29 product materialization.',
    );
  }
}

assertFR300R1FSourceProvenanceBindingContract();
