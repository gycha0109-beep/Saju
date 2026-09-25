import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const DATASET_ID = 'kpdkpcs8zb';
const DATASET_VERSION = 4;
const DATASET_REF = 'doi:10.17632/kpdkpcs8zb.4';
const PUBLIC_API_BASE = 'https://data.mendeley.com/public-api';
const ACCEPT = 'application/vnd.mendeley-public-dataset.1+json';
const USER_AGENT = 'MyeongHa-FR300-R1O/1';
const MAX_JSON_BYTES = 4 * 1024 * 1024;
const DATABASE_FILENAME = 'database.json';
const EXPECTED_DATABASE_SIZE = 273_343;
const EXPECTED_DATABASE_SHA256 =
  '1366f0496078a250b43bafffc3483d3f949c33afb32520a041d92d353598e3ea';
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

async function inspectOfficialV4Root() {
  const folders = requireObjectList(
    await fetchJson(
      `${PUBLIC_API_BASE}/datasets/${DATASET_ID}/folders/${DATASET_VERSION}`,
    ),
    'publisher folders response',
  );
  const roots = folders.filter(
    (folder) =>
      String(folder.name ?? '') === 'V2' &&
      !folder.parent_id &&
      String(folder.id ?? '').length > 0,
  );
  if (roots.length !== 1) {
    throw new Error('publisher metadata has no unique V2 root folder');
  }

  const rootId = String(roots[0].id);
  const metadataUrl =
    `${PUBLIC_API_BASE}/datasets/${DATASET_ID}/files` +
    `?folder_id=${encodeURIComponent(rootId)}&version=${DATASET_VERSION}`;
  const files = requireObjectList(
    await fetchJson(metadataUrl),
    'publisher V2 root files response',
  )
    .map((record) => compactFile(record, metadataUrl))
    .filter((record) => record !== null);

  const databaseMatches = files.filter(
    (file) =>
      file.filename === DATABASE_FILENAME &&
      file.sizeBytes === EXPECTED_DATABASE_SIZE &&
      file.sha256 === EXPECTED_DATABASE_SHA256,
  );
  const archiveMatches = files.filter(
    (file) =>
      file.sizeBytes === EXPECTED_ARCHIVE_SIZE &&
      file.sha256 === EXPECTED_ARCHIVE_SHA256,
  );

  return {
    rootId,
    metadataUrl,
    validRootFileCount: files.length,
    databaseMatches,
    archiveMatches,
  };
}

async function main() {
  const outputPath = resolve(
    globalThis.process.env.FR300_R1O_OUTPUT ??
      '.fr300-r1o-evidence/rap3df-v2-official-archive.json',
  );

  const inspected = await inspectOfficialV4Root();
  const databaseIdentityBound =
    inspected.databaseMatches.length === 1;
  const archiveDigestRepresentedInRootMetadata =
    inspected.archiveMatches.length === 1;

  const report = {
    schemaVersion:
      'fr300-r1o-v2-official-archive-evidence-v1',
    watchtowerTrack: 'face-engine',
    datasetRef: DATASET_REF,
    datasetVersion: DATASET_VERSION,
    publisherMetadataActuallyFetched: true,
    v2RootFolderId: inspected.rootId,
    v2RootMetadataEvidenceRef: inspected.metadataUrl,
    validRootFileCount: inspected.validRootFileCount,
    expectedPriorArchive: {
      sizeBytes: EXPECTED_ARCHIVE_SIZE,
      sha256: `sha256:${EXPECTED_ARCHIVE_SHA256}`,
    },
    expectedPinnedDatabase: {
      filename: DATABASE_FILENAME,
      sizeBytes: EXPECTED_DATABASE_SIZE,
      sha256: `sha256:${EXPECTED_DATABASE_SHA256}`,
    },
    databaseIdentityMatchCount:
      inspected.databaseMatches.length,
    databaseIdentity:
      inspected.databaseMatches.length === 1
        ? {
            ...inspected.databaseMatches[0],
            sha256:
              `sha256:${inspected.databaseMatches[0].sha256}`,
          }
        : null,
    archiveDigestRootMetadataMatchCount:
      inspected.archiveMatches.length,
    archiveDigestRepresentedInV2RootMetadata:
      archiveDigestRepresentedInRootMetadata,
    status:
      databaseIdentityBound
        ? archiveDigestRepresentedInRootMetadata
          ? 'official_v4_archive_and_database_identity_bound'
          : 'official_v4_database_identity_bound_archive_container_digest_not_root_metadata_bound'
        : 'official_v4_database_identity_not_bound',
    v4DatasetContentAnchorBound: databaseIdentityBound,
    priorArchiveDigestPublisherMetadataBound:
      archiveDigestRepresentedInRootMetadata,
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

  if (!databaseIdentityBound) {
    throw new Error(
      `official V4 database identity match count: ${inspected.databaseMatches.length}`,
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
