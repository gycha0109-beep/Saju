import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import {
  FR300_R1I_EXPECTED_VALUE_COUNT,
  FR300_R1I_V1_DATASET_REF,
} from '../.face-reading-dist/rap3df-v1-float64-artifact-fr300-r1i.js';

const DATASET_ID = 'kpdkpcs8zb';
const DATASET_VERSION = 3;
const PUBLIC_API_BASE = 'https://data.mendeley.com/public-api';
const ACCEPT = 'application/vnd.mendeley-public-dataset.1+json';
const USER_AGENT = 'MyeongHa-FR300-R1K/1';
const MAX_JSON_BYTES = 4 * 1024 * 1024;
const MAX_DEPTH_BYTES = 1024 * 1024;
const MAX_FOLDER_REQUESTS = 160;
const SAMPLE_TARGET = 12;
const MINIMUM_SAMPLE = 8;
const DEPTH_FILENAME = /^k1_box_xyz_depth\.(?:raw|data)$/iu;
const UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;
const SHA256 = /^[0-9a-f]{64}$/u;

function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

async function fetchBounded(url, maxBytes, accept) {
  const response = await globalThis.fetch(url, {
    headers: {
      Accept: accept,
      'User-Agent': USER_AGENT,
    },
    redirect: 'follow',
    signal: globalThis.AbortSignal.timeout(30_000),
  });
  if (!response.ok) {
    throw new Error(`publisher request failed: ${response.status}`);
  }
  const declaredLength = Number(response.headers.get('content-length'));
  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
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
  try {
    return JSON.parse(new globalThis.TextDecoder().decode(bytes));
  } catch {
    throw new Error('publisher response is not strict JSON');
  }
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
  const size = details.size;
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
    !Number.isSafeInteger(size) ||
    size <= 0 ||
    size !== recordSize
  ) {
    throw new Error('depth file metadata has invalid size');
  }
  if (size > MAX_DEPTH_BYTES) {
    throw new Error('depth artifact exceeds bounded acquisition limit');
  }
  if (status !== 'COMPLETED') {
    throw new Error('depth file metadata is not COMPLETED');
  }

  let parsedDownload;
  try {
    parsedDownload = new globalThis.URL(downloadUrl);
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
    size,
    downloadUrl,
    metadataUrl,
  };
}

async function discoverSample() {
  const foldersUrl =
    `${PUBLIC_API_BASE}/datasets/${DATASET_ID}/folders/${DATASET_VERSION}`;
  const folders = requireObjectList(
    await fetchJson(foldersUrl),
    'publisher folders response',
  );

  const sample = [];
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
      sample.push(fileMetadata(candidates[0], metadataUrl));
      if (sample.length >= SAMPLE_TARGET) break;
    }
  }

  return { sample, requestCount };
}

function histogram(values) {
  const counts = new Map();
  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((left, right) => Number(left[0]) - Number(right[0]))
    .map(([value, count]) => ({ value, count }));
}

async function authenticateArtifact(metadata) {
  const bytes = await fetchBounded(
    metadata.downloadUrl,
    MAX_DEPTH_BYTES,
    'application/octet-stream',
  );
  const localDigest = sha256(bytes);
  const digestMatches = localDigest === metadata.digest;
  const sizeMatches = bytes.byteLength === metadata.size;
  if (!digestMatches || !sizeMatches) {
    throw new Error('publisher artifact digest/size verification failed');
  }

  const bytesPerArticlePixel =
    bytes.byteLength % FR300_R1I_EXPECTED_VALUE_COUNT === 0
      ? bytes.byteLength / FR300_R1I_EXPECTED_VALUE_COUNT
      : null;

  return {
    fileId: metadata.id,
    filename: metadata.filename,
    metadataEvidenceRef: metadata.metadataUrl,
    publisherSha256: `sha256:${metadata.digest}`,
    localSha256: `sha256:${localDigest}`,
    publisherSizeBytes: metadata.size,
    localSizeBytes: bytes.byteLength,
    digestMatches,
    sizeMatches,
    bytesPerArticlePixel,
    float64TrailingByteCount: bytes.byteLength % 8,
  };
}

async function main() {
  const outputPath = resolve(
    globalThis.process.env.FR300_R1K_OUTPUT ??
      '.fr300-r1k-evidence/rap3df-v1-serialization-sample.json',
  );

  const discovered = await discoverSample();
  if (discovered.sample.length < MINIMUM_SAMPLE) {
    throw new Error(
      `bounded sample too small: ${discovered.sample.length}/${MINIMUM_SAMPLE}`,
    );
  }

  const receipts = [];
  for (const metadata of discovered.sample) {
    receipts.push(await authenticateArtifact(metadata));
  }

  const byteLengths = receipts.map((receipt) => receipt.localSizeBytes);
  const bytesPerPixel = receipts.map(
    (receipt) => receipt.bytesPerArticlePixel,
  );
  const uniqueSizes = new Set(byteLengths);
  const uniqueBytesPerPixel = new Set(bytesPerPixel);
  const reproduced35462Count = byteLengths.filter(
    (size) => size === 35_462,
  ).length;

  const report = {
    schemaVersion: 'fr300-r1k-v1-serialization-sample-evidence-v1',
    watchtowerTrack: 'face-engine',
    datasetRef: FR300_R1I_V1_DATASET_REF,
    datasetVersion: DATASET_VERSION,
    status: 'bounded_publisher_sample_authenticated_authority_blocked',
    publisherMetadataActuallyFetched: true,
    sampleTarget: SAMPLE_TARGET,
    minimumSample: MINIMUM_SAMPLE,
    sampleCount: receipts.length,
    folderRequests: discovered.requestCount,
    allPublisherBindingsValid: receipts.every(
      (receipt) => receipt.digestMatches && receipt.sizeMatches,
    ),
    structure: {
      articlePixelCount: FR300_R1I_EXPECTED_VALUE_COUNT,
      byteLengthHistogram: histogram(byteLengths),
      bytesPerArticlePixelHistogram: histogram(bytesPerPixel),
      allSameByteLength: uniqueSizes.size === 1,
      allSameBytesPerArticlePixel: uniqueBytesPerPixel.size === 1,
      reproduced35462Count,
      reproduced35462AcrossEntireSample:
        reproduced35462Count === receipts.length,
    },
    receipts,
    authorityBoundary: {
      twoBytesPerPixelAuthorizesUint16: false,
      numericRangeSelectsEndianness: false,
      numericRangeSelectsPhysicalUnit: false,
      articleCcByEqualsParticipantCommercialConsent: false,
      canonicalRegistrationIssued: false,
      realFR299BundleIssued: false,
      fr300R2Authorized: false,
      productColumnMaterialized: false,
      productionActivated: false,
      commerceActivated: false,
    },
    participantCommercialProductUseScopeEstablished: false,
    productMaterialization: '18/29',
  };

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(
    outputPath,
    `${JSON.stringify(report, null, 2)}\n`,
    'utf8',
  );

  globalThis.console.log('FR300_R1K_EVIDENCE_BEGIN');
  globalThis.console.log(JSON.stringify(report));
  globalThis.console.log('FR300_R1K_EVIDENCE_END');
}

main().catch((error) => {
  globalThis.console.error(
    `FR300-R1K acquisition failed closed: ${
      error instanceof Error ? error.message : String(error)
    }`,
  );
  globalThis.process.exitCode = 1;
});
