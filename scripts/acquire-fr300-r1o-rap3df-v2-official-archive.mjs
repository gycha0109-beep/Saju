import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const DATASET_ID = 'kpdkpcs8zb';
const DATASET_VERSION = 4;
const DATASET_REF = 'doi:10.17632/kpdkpcs8zb.4';
const PUBLIC_API_BASE = 'https://data.mendeley.com/public-api';
const ACCEPT = 'application/vnd.mendeley-public-dataset.1+json';
const USER_AGENT = 'MyeongHa-FR300-R1O/1';
const MAX_JSON_BYTES = 4 * 1024 * 1024;
const MAX_FOLDER_REQUESTS = 200;
const EXPECTED_ARCHIVE_SIZE = 66_792_678;
const EXPECTED_ARCHIVE_SHA256 =
  '92a967bdacba4a7e5d387232f2d3308ad656022953c0139f615def2f607ccc5e';
const UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;
const SHA256 = /^[0-9a-f]{64}$/u;

async function fetchBounded(url) {
  const response = await globalThis.fetch(url, {
    headers: {
      Accept: ACCEPT,
      'User-Agent': USER_AGENT,
    },
    redirect: 'follow',
    signal: globalThis.AbortSignal.timeout(30_000),
  });
  if (!response.ok) {
    throw new Error(`publisher request failed: ${response.status}`);
  }
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.byteLength > MAX_JSON_BYTES) {
    throw new Error('publisher metadata response exceeds safety limit');
  }
  return bytes;
}

async function fetchJson(url) {
  const bytes = await fetchBounded(url);
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
  const recordSize = record.size;
  const status = String(record.status ?? '');

  if (
    !UUID.test(id) ||
    filename.length === 0 ||
    !SHA256.test(digest) ||
    !Number.isSafeInteger(size) ||
    size <= 0 ||
    size !== recordSize ||
    status !== 'COMPLETED'
  ) {
    return null;
  }

  return {
    fileId: id,
    filename,
    sha256: digest,
    sizeBytes: size,
    metadataEvidenceRef: metadataUrl,
  };
}

async function findArchiveIdentity() {
  const folders = requireObjectList(
    await fetchJson(
      `${PUBLIC_API_BASE}/datasets/${DATASET_ID}/folders/${DATASET_VERSION}`,
    ),
    'publisher folders response',
  );

  let folderRequests = 0;
  const candidates = [];

  for (const folderId of folderIds(folders)) {
    folderRequests += 1;
    if (folderRequests > MAX_FOLDER_REQUESTS) {
      throw new Error('folder scan exceeded bounded request limit');
    }
    const metadataUrl =
      `${PUBLIC_API_BASE}/datasets/${DATASET_ID}/files` +
      `?folder_id=${encodeURIComponent(folderId)}&version=${DATASET_VERSION}`;
    const files = requireObjectList(
      await fetchJson(metadataUrl),
      'publisher files response',
    );

    for (const record of files) {
      const file = compactFile(record, metadataUrl);
      if (
        file !== null &&
        (file.sizeBytes === EXPECTED_ARCHIVE_SIZE ||
          file.sha256 === EXPECTED_ARCHIVE_SHA256)
      ) {
        candidates.push(file);
      }
    }
  }

  return { folderRequests, candidates };
}

async function main() {
  const outputPath = resolve(
    globalThis.process.env.FR300_R1O_OUTPUT ??
      '.fr300-r1o-evidence/rap3df-v2-official-archive.json',
  );

  const found = await findArchiveIdentity();
  const exactMatches = found.candidates.filter(
    (file) =>
      file.sizeBytes === EXPECTED_ARCHIVE_SIZE &&
      file.sha256 === EXPECTED_ARCHIVE_SHA256,
  );

  const status =
    exactMatches.length === 1
      ? 'official_v4_archive_identity_bound'
      : exactMatches.length === 0
        ? 'official_v4_archive_identity_not_matched'
        : 'official_v4_archive_identity_ambiguous';

  const report = {
    schemaVersion:
      'fr300-r1o-v2-official-archive-evidence-v1',
    watchtowerTrack: 'face-engine',
    datasetRef: DATASET_REF,
    datasetVersion: DATASET_VERSION,
    publisherMetadataActuallyFetched: true,
    folderRequests: found.folderRequests,
    expectedPriorArchive: {
      sizeBytes: EXPECTED_ARCHIVE_SIZE,
      sha256: `sha256:${EXPECTED_ARCHIVE_SHA256}`,
    },
    candidateCount: found.candidates.length,
    candidates: found.candidates.map((file) => ({
      ...file,
      sha256: `sha256:${file.sha256}`,
    })),
    exactMatchCount: exactMatches.length,
    exactMatch:
      exactMatches.length === 1
        ? {
            ...exactMatches[0],
            sha256: `sha256:${exactMatches[0].sha256}`,
          }
        : null,
    status,
    archiveIdentityBound: exactMatches.length === 1,
    creatorPipelineMetricConflictResolved: false,
    participantCommercialProductUseScopeEstablished: false,
    realFR299BundleEligible: false,
    fr300R2Eligible: false,
    productMaterialization: '18/29',
  };

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(
    outputPath,
    `${JSON.stringify(report, null, 2)}\n`,
    'utf8',
  );

  globalThis.console.log('FR300_R1O_EVIDENCE_BEGIN');
  globalThis.console.log(JSON.stringify(report));
  globalThis.console.log('FR300_R1O_EVIDENCE_END');

  if (exactMatches.length !== 1) {
    throw new Error(
      `official V4 archive identity match count: ${exactMatches.length}`,
    );
  }
}

main().catch((error) => {
  globalThis.console.error(
    `FR300-R1O failed closed: ${
      error instanceof Error ? error.message : String(error)
    }`,
  );
  globalThis.process.exitCode = 1;
});
