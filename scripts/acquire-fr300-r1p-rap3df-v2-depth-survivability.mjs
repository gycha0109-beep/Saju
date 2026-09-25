import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const DATASET_ID = 'kpdkpcs8zb';
const DATASET_VERSION = 4;
const DATASET_REF = 'doi:10.17632/kpdkpcs8zb.4';
const PUBLIC_API_BASE = 'https://data.mendeley.com/public-api';
const ACCEPT = 'application/vnd.mendeley-public-dataset.1+json';
const USER_AGENT = 'MyeongHa-FR300-R1P/1';
const CREATOR_REPO = 'Piemontez/rap3df-database';
const CREATOR_COMMIT = '460b8873ab9a13e67ae82e0264d6dfbf10461e07';
const EXPECTED_DATABASE_SIZE = 273_343;
const EXPECTED_DATABASE_SHA256 =
  '1366f0496078a250b43bafffc3483d3f949c33afb32520a041d92d353598e3ea';
const EXPECTED_DEPTH_BYTES = 35_462;
const MAX_METADATA_BYTES = 4 * 1024 * 1024;
const MAX_CREATOR_DEPTH_BYTES = 64 * 1024;
const UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;
const SHA256 = /^[0-9a-f]{64}$/u;

const SAMPLES = Object.freeze([
  Object.freeze({
    subject: 'P6HF7NR',
    filename: 'depth_bgRm_VRO.data',
    gitBlobSha: '09e922073030f713dc24b33c2eecbebb9369edb7',
  }),
  Object.freeze({
    subject: 'M8D6FNE',
    filename: 'depth_bgRm_XQ2.data',
    gitBlobSha: '1bdf3a802eae33d03839d3788fadc797edd85d90',
  }),
  Object.freeze({
    subject: '5SSCKOW',
    filename: 'depth_bgRm_S5F.data',
    gitBlobSha: '3823e9fce02049806ab1adc79d9c395b48c0d007',
  }),
  Object.freeze({
    subject: 'FC6KAXU',
    filename: 'depth_bgRm_2XS.data',
    gitBlobSha: 'd07c7c91d3c28639221ae0d4491a980d2ad17185',
  }),
  Object.freeze({
    subject: 'CPUR8VH',
    filename: 'depth_bgRm_V5J.data',
    gitBlobSha: '4f015141e9f704118d159e3f95a57eb35d92992a',
  }),
]);

async function fetchBytes(url, maxBytes, accept = '*/*') {
  const response = await globalThis.fetch(url, {
    headers: {
      Accept: accept,
      'User-Agent': USER_AGENT,
    },
    redirect: 'follow',
    signal: globalThis.AbortSignal.timeout(30_000),
  });
  if (!response.ok) {
    throw new Error(`request failed: ${response.status} ${url}`);
  }
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.byteLength > maxBytes) {
    throw new Error(`response exceeds safety limit: ${url}`);
  }
  return bytes;
}

async function fetchJson(url) {
  const bytes = await fetchBytes(url, MAX_METADATA_BYTES, ACCEPT);
  try {
    return JSON.parse(new globalThis.TextDecoder().decode(bytes));
  } catch {
    throw new Error(`publisher response is not strict JSON: ${url}`);
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

function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

function gitBlobSha1(bytes) {
  const header = new globalThis.TextEncoder().encode(
    `blob ${bytes.byteLength}` + String.fromCharCode(0),
  );
  return createHash('sha1')
    .update(header)
    .update(bytes)
    .digest('hex');
}

function compactFile(record, metadataUrl) {
  const details = record.content_details;
  if (
    details === null ||
    typeof details !== 'object' ||
    Array.isArray(details)
  ) {
    return null;
  }
  const id = String(record.id ?? '');
  const filename = String(record.filename ?? '');
  const digest = String(details.sha256_hash ?? '').toLowerCase();
  const size = details.size;
  if (
    !UUID.test(id) ||
    filename.length === 0 ||
    !SHA256.test(digest) ||
    !Number.isSafeInteger(size) ||
    size <= 0 ||
    size !== record.size ||
    String(record.status ?? '') !== 'COMPLETED'
  ) {
    return null;
  }
  return {
    fileId: id,
    filename,
    sizeBytes: size,
    sha256: digest,
    metadataEvidenceRef: metadataUrl,
  };
}

function isDescendantOf(folder, rootId, byId) {
  let current = folder;
  const visited = new Set();
  while (current) {
    const id = String(current.id ?? '');
    if (!id || visited.has(id)) return false;
    if (id === rootId) return true;
    visited.add(id);
    const parentId = String(current.parent_id ?? '');
    if (!parentId) return false;
    current = byId.get(parentId);
  }
  return false;
}

async function creatorReceipt(sample) {
  const path =
    `rap3df_data_02/${sample.subject}/${sample.filename}`;
  const rawUrl =
    `https://raw.githubusercontent.com/${CREATOR_REPO}/${CREATOR_COMMIT}/${path}`;
  const bytes = await fetchBytes(rawUrl, MAX_CREATOR_DEPTH_BYTES);
  const observedGitBlobSha = gitBlobSha1(bytes);
  if (
    bytes.byteLength !== EXPECTED_DEPTH_BYTES ||
    observedGitBlobSha !== sample.gitBlobSha
  ) {
    throw new Error(
      `creator artifact identity drift: ${sample.subject}/${sample.filename}`,
    );
  }
  return {
    subject: sample.subject,
    filename: sample.filename,
    creatorPath: path,
    creatorGitBlobSha: observedGitBlobSha,
    creatorSizeBytes: bytes.byteLength,
    creatorSha256: sha256(bytes),
  };
}

async function main() {
  const outputPath = resolve(
    globalThis.process.env.FR300_R1P_OUTPUT ??
      '.fr300-r1p-evidence/rap3df-v2-depth-survivability.json',
  );

  const foldersUrl =
    `${PUBLIC_API_BASE}/datasets/${DATASET_ID}/folders/${DATASET_VERSION}`;
  const folders = requireObjectList(
    await fetchJson(foldersUrl),
    'publisher folders response',
  );
  const byId = new Map(
    folders.map((folder) => [String(folder.id ?? ''), folder]),
  );
  const v2Roots = folders.filter(
    (folder) =>
      String(folder.name ?? '') === 'V2' &&
      !folder.parent_id &&
      UUID.test(String(folder.id ?? '')),
  );
  if (v2Roots.length !== 1) {
    throw new Error('publisher metadata has no unique V2 root');
  }
  const v2RootId = String(v2Roots[0].id);

  const rootMetadataUrl =
    `${PUBLIC_API_BASE}/datasets/${DATASET_ID}/files?folder_id=` +
    `${encodeURIComponent(v2RootId)}&version=${DATASET_VERSION}`;
  const rootFiles = requireObjectList(
    await fetchJson(rootMetadataUrl),
    'publisher V2 root files response',
  )
    .map((record) => compactFile(record, rootMetadataUrl))
    .filter((record) => record !== null);
  const databaseMatches = rootFiles.filter(
    (file) =>
      file.filename === 'database.json' &&
      file.sizeBytes === EXPECTED_DATABASE_SIZE &&
      file.sha256 === EXPECTED_DATABASE_SHA256,
  );
  if (databaseMatches.length !== 1) {
    throw new Error(
      `official V4 database content anchor match count: ${databaseMatches.length}`,
    );
  }

  const receipts = [];
  for (const sample of SAMPLES) {
    const creator = await creatorReceipt(sample);
    const subjectFolders = folders.filter(
      (folder) =>
        String(folder.name ?? '') === sample.subject &&
        UUID.test(String(folder.id ?? '')) &&
        isDescendantOf(folder, v2RootId, byId),
    );
    if (subjectFolders.length !== 1) {
      throw new Error(
        `official subject folder match count for ${sample.subject}: ${subjectFolders.length}`,
      );
    }
    const folderId = String(subjectFolders[0].id);
    const metadataUrl =
      `${PUBLIC_API_BASE}/datasets/${DATASET_ID}/files?folder_id=` +
      `${encodeURIComponent(folderId)}&version=${DATASET_VERSION}`;
    const publisherFiles = requireObjectList(
      await fetchJson(metadataUrl),
      `publisher files for ${sample.subject}`,
    )
      .map((record) => compactFile(record, metadataUrl))
      .filter((record) => record !== null);
    const filenameMatches = publisherFiles.filter(
      (file) => file.filename === sample.filename,
    );
    if (filenameMatches.length !== 1) {
      throw new Error(
        `publisher file match count for ${sample.subject}/${sample.filename}: ${filenameMatches.length}`,
      );
    }
    const publisher = filenameMatches[0];
    receipts.push({
      ...creator,
      publisherFileId: publisher.fileId,
      publisherSizeBytes: publisher.sizeBytes,
      publisherSha256: publisher.sha256,
      publisherMetadataEvidenceRef: publisher.metadataEvidenceRef,
      exactByteIdentity:
        publisher.sizeBytes === creator.creatorSizeBytes &&
        publisher.sha256 === creator.creatorSha256,
    });
  }

  const exactMatchCount = receipts.filter(
    (receipt) => receipt.exactByteIdentity,
  ).length;
  const allExact = exactMatchCount === SAMPLES.length;
  const status = allExact
    ? 'official_v4_creator_bytes_exactly_bound'
    : exactMatchCount === 0
      ? 'official_v4_metric_semantics_unresolved'
      : 'official_v4_creator_serialization_bound';

  const report = {
    schemaVersion:
      'fr300-r1p-v2-depth-survivability-evidence-v1',
    watchtowerTrack: 'face-engine',
    datasetRef: DATASET_REF,
    datasetVersion: DATASET_VERSION,
    predecessorContentAnchor: {
      filename: 'database.json',
      sizeBytes: EXPECTED_DATABASE_SIZE,
      sha256: `sha256:${EXPECTED_DATABASE_SHA256}`,
      publisherFileId: databaseMatches[0].fileId,
      exactMatch: true,
    },
    creatorCommit: CREATOR_COMMIT,
    inspectedSampleCount: SAMPLES.length,
    exactArtifactMatchCount: exactMatchCount,
    samples: receipts.map((receipt) => ({
      ...receipt,
      creatorSha256: `sha256:${receipt.creatorSha256}`,
      publisherSha256: `sha256:${receipt.publisherSha256}`,
    })),
    status,
    creatorSingleByteProjectionLineageBound: allExact,
    metricDepthRecoverability: allExact
      ? 'destroyed_by_single_byte_projection'
      : 'unresolved',
    metricReferenceDisposition: allExact
      ? 'rejected_for_metric_reference'
      : 'blocked_pending_more_evidence',
    participantCommercialProductUseScopeEstablished: false,
    realFR299BundleEligible: false,
    fr300R2Eligible: false,
    productMaterialization: '18/29',
  };

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(
    outputPath,
    `${JSON.stringify(report, null, 2)}\\n`,
    'utf8',
  );

  globalThis.console.log('FR300_R1P_EVIDENCE_BEGIN');
  globalThis.console.log(JSON.stringify(report));
  globalThis.console.log('FR300_R1P_EVIDENCE_END');

  if (!allExact) {
    throw new Error(
      `official V4 exact creator depth match count: ${exactMatchCount}/${SAMPLES.length}`,
    );
  }
}

main().catch((error) => {
  globalThis.console.error(
    `FR300-R1P failed closed: ${
      error instanceof Error ? error.message : String(error)
    }`,
  );
  globalThis.process.exitCode = 1;
});
