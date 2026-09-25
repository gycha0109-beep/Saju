import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import {
  FR300_R1I_EXPECTED_BYTE_LENGTH,
  FR300_R1I_V1_DATASET_REF,
  inspectFR300R1IV1Float64Artifact,
} from '../.face-reading-dist/rap3df-v1-float64-artifact-fr300-r1i.js';

const DATASET_ID = 'kpdkpcs8zb';
const DATASET_VERSION = 3;
const PUBLIC_API_BASE = 'https://data.mendeley.com/public-api';
const ACCEPT = 'application/vnd.mendeley-public-dataset.1+json';
const USER_AGENT = 'MyeongHa-FR300-R1J/1';
const MAX_JSON_BYTES = 4 * 1024 * 1024;
const MAX_DEPTH_BYTES = 1024 * 1024;
const MAX_FOLDER_REQUESTS = 160;
const DEPTH_FILENAME = /^k1_box_xyz_depth\.(?:raw|data)$/iu;
const UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;
const SHA256 = /^[0-9a-f]{64}$/u;

function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

async function fetchBounded(url, maxBytes, accept) {
  const response = await fetch(url, {
    headers: {
      Accept: accept,
      'User-Agent': USER_AGENT,
    },
    redirect: 'follow',
    signal: AbortSignal.timeout(30_000),
  });
  if (!response.ok) {
    throw new Error(`publisher request failed: ${response.status}`);
  }
  const declaredLength = Number(response.headers.get('content-length'));
  if (
    Number.isFinite(declaredLength) &&
    declaredLength > maxBytes
  ) {
    throw new Error('publisher response exceeds safety limit');
  }
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.byteLength > maxBytes) {
    throw new Error('publisher response exceeds safety limit');
  }
  return bytes;
}

async function fetchJson(url) {
  const bytes = await fetchBounded(url, MAX_JSON_BYTES, ACCEPT);
  let parsed;
  try {
    parsed = JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    throw new Error('publisher response is not strict JSON');
  }
  return parsed;
}

function requireObjectList(value, label) {
  if (
    !Array.isArray(value) ||
    value.some(
      (entry) =>
        entry === null ||
        typeof entry !== 'object' ||
        Array.isArray(entry),
    )
  ) {
    throw new Error(`${label} must be a list of objects`);
  }
  return value;
}

function folderIds(folders) {
  const ids = new Set(['root']);
  for (const folder of folders) {
    const id = String(folder.id ?? '');
    if (id) ids.add(id);
  }
  return [...ids].sort();
}

function fileMetadata(record, metadataUrl) {
  const details = record.content_details;
  if (
    details === null ||
    typeof details !== 'object' ||
    Array.isArray(details)
  ) {
    throw new Error('depth file metadata lacks content_details');
  }

  const id = String(record.id ?? '');
  const filename = String(record.filename ?? '');
  const digest = String(details.sha256_hash ?? '').toLowerCase();
  const detailSize = details.size;
  const recordSize = record.size;
  const status = String(record.status ?? '');
  const downloadUrl = String(details.download_url ?? '');

  if (!UUID.test(id)) {
    throw new Error('depth file metadata has invalid file UUID');
  }
  if (!DEPTH_FILENAME.test(filename)) {
    throw new Error('depth file metadata has unexpected filename');
  }
  if (!SHA256.test(digest)) {
    throw new Error('depth file metadata has invalid SHA-256');
  }
  if (
    !Number.isSafeInteger(detailSize) ||
    detailSize <= 0 ||
    detailSize !== recordSize
  ) {
    throw new Error('depth file metadata has invalid size');
  }
  if (detailSize > MAX_DEPTH_BYTES) {
    throw new Error('depth artifact exceeds bounded acquisition limit');
  }
  if (status !== 'COMPLETED') {
    throw new Error('depth file metadata is not COMPLETED');
  }

  let parsedDownload;
  try {
    parsedDownload = new URL(downloadUrl);
  } catch {
    throw new Error('depth file download URL is invalid');
  }
  const legacyDownloadHost =
    parsedDownload.hostname === 'downloads.mendeley.com';
  const currentPublicFilePath =
    parsedDownload.hostname === 'data.mendeley.com' &&
    parsedDownload.pathname ===
      `/public-files/datasets/${DATASET_ID}/files/${id}/file_downloaded`;
  if (
    parsedDownload.protocol !== 'https:' ||
    (!legacyDownloadHost && !currentPublicFilePath)
  ) {
    throw new Error(
      `depth file download route is not admitted: ${parsedDownload.hostname}${parsedDownload.pathname}`,
    );
  }

  return {
    id,
    filename,
    digest,
    size: detailSize,
    downloadUrl,
    metadataUrl,
  };
}

async function findDepthArtifact() {
  const foldersUrl =
    `${PUBLIC_API_BASE}/datasets/${DATASET_ID}/folders/${DATASET_VERSION}`;
  const folders = requireObjectList(
    await fetchJson(foldersUrl),
    'publisher folders response',
  );

  let requestCount = 0;
  for (const folderId of folderIds(folders)) {
    requestCount += 1;
    if (requestCount > MAX_FOLDER_REQUESTS) {
      throw new Error('folder scan exceeded bounded request limit');
    }

    const metadataUrl =
      `${PUBLIC_API_BASE}/datasets/${DATASET_ID}/files` +
      `?folder_id=${encodeURIComponent(folderId)}&version=${DATASET_VERSION}`;
    const files = requireObjectList(
      await fetchJson(metadataUrl),
      'publisher files response',
    );
    const candidates = files
      .filter((record) =>
        DEPTH_FILENAME.test(String(record.filename ?? '')),
      )
      .sort((left, right) =>
        String(left.id ?? '').localeCompare(String(right.id ?? '')),
      );

    if (candidates.length > 0) {
      return {
        metadata: fileMetadata(candidates[0], metadataUrl),
        folderRequests: requestCount,
      };
    }
  }

  return {
    metadata: null,
    folderRequests: requestCount,
  };
}

async function main() {
  const outputPath = resolve(
    process.env.FR300_R1J_OUTPUT ??
      '.fr300-r1j-evidence/rap3df-v1-publisher-artifact.json',
  );

  const discovered = await findDepthArtifact();
  if (discovered.metadata === null) {
    const report = {
      schemaVersion: 'fr300-r1j-v1-publisher-artifact-evidence-v1',
      watchtowerTrack: 'face-engine',
      datasetRef: FR300_R1I_V1_DATASET_REF,
      datasetVersion: DATASET_VERSION,
      status: 'blocked_no_exact_depth_artifact_found',
      publisherMetadataActuallyFetched: true,
      folderRequests: discovered.folderRequests,
      realArtifactDownloaded: false,
      sourceBound: false,
      fr300R2Authorized: false,
      productMaterialization: '18/29',
    };
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(
      outputPath,
      `${JSON.stringify(report, null, 2)}\n`,
      'utf8',
    );
    console.log('FR300_R1J_EVIDENCE_BEGIN');
    console.log(JSON.stringify(report));
    console.log('FR300_R1J_EVIDENCE_END');
    return;
  }

  const metadata = discovered.metadata;
  const bytes = await fetchBounded(
    metadata.downloadUrl,
    MAX_DEPTH_BYTES,
    'application/octet-stream',
  );
  const localDigest = sha256(bytes);
  const digestMatches = localDigest === metadata.digest;
  const sizeMatches = bytes.byteLength === metadata.size;

  const receipt = inspectFR300R1IV1Float64Artifact({
    schemaVersion: 'fr300-r1i-v1-float64-artifact-input-v1',
    artifactRef: `mendeley:file:${metadata.id}`,
    bytes,
    sourceMetadata: {
      schemaVersion:
        'fr300-r1i-v1-public-file-metadata-receipt-v1',
      datasetRef: FR300_R1I_V1_DATASET_REF,
      datasetVersion: DATASET_VERSION,
      fileMetadataEvidenceRef: metadata.metadataUrl,
      metadataActuallyFetched: true,
      fileId: metadata.id,
      filename: metadata.filename,
      contentSha256: metadata.digest,
      sizeBytes: metadata.size,
    },
    declaredEndianness: 'unknown',
    endiannessEvidenceRef: null,
    declaredPhysicalUnit: 'unknown',
    physicalUnitEvidenceRef: null,
  });

  const report = {
    schemaVersion: 'fr300-r1j-v1-publisher-artifact-evidence-v1',
    watchtowerTrack: 'face-engine',
    datasetRef: FR300_R1I_V1_DATASET_REF,
    datasetVersion: DATASET_VERSION,
    status:
      receipt.sourceProvenanceStatus === 'source_bound'
        ? 'source_bound_metric_authority_blocked'
        : 'blocked_source_provenance',
    publisherMetadataActuallyFetched: true,
    folderRequests: discovered.folderRequests,
    realArtifactDownloaded: true,
    selectedArtifact: {
      fileId: metadata.id,
      filename: metadata.filename,
      metadataEvidenceRef: metadata.metadataUrl,
      publisherSha256: `sha256:${metadata.digest}`,
      localSha256: `sha256:${localDigest}`,
      publisherSizeBytes: metadata.size,
      localSizeBytes: bytes.byteLength,
      digestMatches,
      sizeMatches,
      expectedArticleBoundByteLength:
        FR300_R1I_EXPECTED_BYTE_LENGTH,
      expectedArticleBoundShapeMatches:
        bytes.byteLength === FR300_R1I_EXPECTED_BYTE_LENGTH,
    },
    r1iReceipt: {
      sourceProvenanceStatus: receipt.sourceProvenanceStatus,
      serializationStatus: receipt.serializationStatus,
      endiannessStatus: receipt.endiannessStatus,
      physicalUnitStatus: receipt.physicalUnitStatus,
      metricAdjudicationStatus:
        receipt.metricAdjudicationStatus,
      blockers: receipt.blockers,
      littleEndianStatistics: receipt.littleEndianStatistics,
      bigEndianStatistics: receipt.bigEndianStatistics,
      selectedStatistics: receipt.selectedStatistics,
      authorityBoundary: receipt.authorityBoundary,
    },
    participantCommercialProductUseScopeEstablished: false,
    realFR299BundleIssued: false,
    fr300R2Authorized: false,
    productMaterialization: '18/29',
  };

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(
    outputPath,
    `${JSON.stringify(report, null, 2)}\n`,
    'utf8',
  );

  console.log('FR300_R1J_EVIDENCE_BEGIN');
  console.log(JSON.stringify(report));
  console.log('FR300_R1J_EVIDENCE_END');
}

main().catch((error) => {
  console.error(
    `FR300-R1J acquisition failed closed: ${
      error instanceof Error ? error.message : String(error)
    }`,
  );
  process.exitCode = 1;
});
