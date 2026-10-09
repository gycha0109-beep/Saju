import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const DATASET_ID = 'kpdkpcs8zb';
const DATASET_VERSION = 3;
const DATASET_REF = 'doi:10.17632/kpdkpcs8zb.3';
const PUBLIC_API_BASE = 'https://data.mendeley.com/public-api';
const ACCEPT = 'application/vnd.mendeley-public-dataset.1+json';
const USER_AGENT = 'MyeongHa-FR300-R1M/1';
const MAX_JSON_BYTES = 4 * 1024 * 1024;
const MAX_FILE_BYTES = 2 * 1024 * 1024;
const MAX_FOLDER_REQUESTS = 160;
const WIDTH = 119;
const HEIGHT = 149;
const RAW_FILENAME = 'k1_box_xyz_depth.data';
const VIEW_FILENAME = 'k1_box_xyz_depth_view.bmp';
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

function metadata(record, expectedFilename, metadataUrl) {
  const details = record.content_details;
  if (
    details === null ||
    typeof details !== 'object' ||
    Array.isArray(details)
  ) {
    throw new Error('file metadata lacks content_details');
  }

  const id = String(record.id ?? '');
  const filename = String(record.filename ?? '');
  const digest = String(details.sha256_hash ?? '').toLowerCase();
  const size = details.size;
  const recordSize = record.size;
  const status = String(record.status ?? '');
  const downloadUrl = String(details.download_url ?? '');

  if (!UUID.test(id)) throw new Error('invalid publisher file UUID');
  if (filename !== expectedFilename) {
    throw new Error('publisher filename mismatch');
  }
  if (!SHA256.test(digest)) throw new Error('invalid publisher SHA-256');
  if (
    !Number.isSafeInteger(size) ||
    size <= 0 ||
    size !== recordSize ||
    size > MAX_FILE_BYTES
  ) {
    throw new Error('invalid publisher file size');
  }
  if (status !== 'COMPLETED') {
    throw new Error('publisher file is not COMPLETED');
  }

  let parsed;
  try {
    parsed = new globalThis.URL(downloadUrl);
  } catch {
    throw new Error('publisher download URL invalid');
  }
  const legacy = parsed.hostname === 'downloads.mendeley.com';
  const current =
    parsed.hostname === 'data.mendeley.com' &&
    parsed.pathname ===
      `/public-files/datasets/${DATASET_ID}/files/${id}/file_downloaded`;
  if (
    parsed.protocol !== 'https:' ||
    (!legacy && !current)
  ) {
    throw new Error('publisher download route not admitted');
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

async function discoverMatchedPair() {
  const folders = requireObjectList(
    await fetchJson(
      `${PUBLIC_API_BASE}/datasets/${DATASET_ID}/folders/${DATASET_VERSION}`,
    ),
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
    const raw = files.find(
      (record) => String(record.filename ?? '') === RAW_FILENAME,
    );
    const view = files.find(
      (record) => String(record.filename ?? '') === VIEW_FILENAME,
    );
    if (raw && view) {
      return {
        folderRequests: requestCount,
        raw: metadata(raw, RAW_FILENAME, metadataUrl),
        view: metadata(view, VIEW_FILENAME, metadataUrl),
      };
    }
  }
  throw new Error('no exact matched raw/view pair found');
}

async function authenticate(meta) {
  const bytes = await fetchBounded(
    meta.downloadUrl,
    MAX_FILE_BYTES,
    'application/octet-stream',
  );
  const localDigest = sha256(bytes);
  if (
    localDigest !== meta.digest ||
    bytes.byteLength !== meta.size
  ) {
    throw new Error('publisher digest/size authentication failed');
  }
  return {
    bytes,
    receipt: {
      fileId: meta.id,
      filename: meta.filename,
      metadataEvidenceRef: meta.metadataUrl,
      publisherSha256: `sha256:${meta.digest}`,
      localSha256: `sha256:${localDigest}`,
      publisherSizeBytes: meta.size,
      localSizeBytes: bytes.byteLength,
      digestMatches: true,
      sizeMatches: true,
    },
  };
}

function readUint16LE(bytes, offset) {
  return bytes[offset] | (bytes[offset + 1] << 8);
}

function readUint32LE(bytes, offset) {
  return (
    bytes[offset] |
    (bytes[offset + 1] << 8) |
    (bytes[offset + 2] << 16) |
    (bytes[offset + 3] << 24)
  ) >>> 0;
}

function readInt32LE(bytes, offset) {
  return (
    bytes[offset] |
    (bytes[offset + 1] << 8) |
    (bytes[offset + 2] << 16) |
    (bytes[offset + 3] << 24)
  );
}

function parseBmp24(bytes) {
  if (
    bytes.byteLength < 54 ||
    bytes[0] !== 0x42 ||
    bytes[1] !== 0x4d
  ) {
    throw new Error('depth view is not a BMP');
  }
  const pixelOffset = readUint32LE(bytes, 10);
  const dibSize = readUint32LE(bytes, 14);
  const width = readInt32LE(bytes, 18);
  const signedHeight = readInt32LE(bytes, 22);
  const planes = readUint16LE(bytes, 26);
  const bitsPerPixel = readUint16LE(bytes, 28);
  const compression = readUint32LE(bytes, 30);
  const height = Math.abs(signedHeight);
  if (
    dibSize < 40 ||
    width !== WIDTH ||
    height !== HEIGHT ||
    planes !== 1 ||
    bitsPerPixel !== 24 ||
    compression !== 0
  ) {
    throw new Error('depth view BMP contract mismatch');
  }
  const rowStride = Math.ceil((width * 3) / 4) * 4;
  const required = pixelOffset + rowStride * height;
  if (required > bytes.byteLength) {
    throw new Error('depth view BMP pixel array truncated');
  }
  return {
    pixelOffset,
    width,
    height,
    signedHeight,
    rowStride,
    bottomUp: signedHeight > 0,
  };
}

function compareRender(rawBytes, bmpBytes, bmp, byteOrder) {
  if (rawBytes.byteLength !== WIDTH * HEIGHT * 2) {
    throw new Error('raw depth byte length mismatch');
  }

  let exactPixelMatches = 0;
  let informativePixels = 0;
  let informativeMatches = 0;

  for (let y = 0; y < HEIGHT; y += 1) {
    const storageY = bmp.bottomUp ? HEIGHT - 1 - y : y;
    for (let x = 0; x < WIDTH; x += 1) {
      const index = y * WIDTH + x;
      const raw0 = rawBytes[index * 2];
      const raw1 = rawBytes[index * 2 + 1];
      const low = byteOrder === 'little' ? raw0 : raw1;
      const high = byteOrder === 'little' ? raw1 : raw0;

      const bmpOffset =
        bmp.pixelOffset + storageY * bmp.rowStride + x * 3;
      const actualB = bmpBytes[bmpOffset];
      const actualG = bmpBytes[bmpOffset + 1];
      const actualR = bmpBytes[bmpOffset + 2];

      // Creator WriteBMPFile swaps RGB input into BGR raw bits.
      // depthImageInBoxXYZ supplies [lowByte, highByte, 0].
      const matches =
        actualB === 0 &&
        actualG === high &&
        actualR === low;
      if (matches) exactPixelMatches += 1;

      if (low !== 0 || high !== 0) {
        informativePixels += 1;
        if (matches) informativeMatches += 1;
      }
    }
  }

  return {
    byteOrder,
    pixelCount: WIDTH * HEIGHT,
    exactPixelMatches,
    exactPixelMatchRatio:
      exactPixelMatches / (WIDTH * HEIGHT),
    informativePixels,
    informativeMatches,
    informativeMatchRatio:
      informativePixels === 0
        ? 0
        : informativeMatches / informativePixels,
  };
}

async function main() {
  const outputPath = resolve(
    globalThis.process.env.FR300_R1M_OUTPUT ??
      '.fr300-r1m-evidence/rap3df-v1-render-endian.json',
  );

  const pair = await discoverMatchedPair();
  const raw = await authenticate(pair.raw);
  const view = await authenticate(pair.view);
  const bmp = parseBmp24(view.bytes);

  const little = compareRender(
    raw.bytes,
    view.bytes,
    bmp,
    'little',
  );
  const big = compareRender(
    raw.bytes,
    view.bytes,
    bmp,
    'big',
  );

  const exactLittle =
    little.exactPixelMatches === little.pixelCount &&
    little.informativePixels > 0;
  const exactBig =
    big.exactPixelMatches === big.pixelCount &&
    big.informativePixels > 0;

  const selectedByteOrder =
    exactLittle !== exactBig
      ? exactLittle
        ? 'little'
        : 'big'
      : null;

  const report = {
    schemaVersion:
      'fr300-r1m-v1-render-endian-evidence-v1',
    watchtowerTrack: 'face-engine',
    datasetRef: DATASET_REF,
    datasetVersion: DATASET_VERSION,
    status:
      selectedByteOrder === null
        ? 'render_relationship_did_not_uniquely_resolve_endian'
        : 'render_relationship_uniquely_resolved_endian',
    folderRequests: pair.folderRequests,
    rawArtifact: raw.receipt,
    viewArtifact: view.receipt,
    bmpContract: {
      width: bmp.width,
      height: bmp.height,
      signedHeight: bmp.signedHeight,
      bitsPerPixel: 24,
      compression: 0,
      rowStride: bmp.rowStride,
      bottomUp: bmp.bottomUp,
    },
    creatorRenderContract: {
      rawScalarContainer: 'uint16_t',
      depthViewInputChannels: [
        'depth & 0xff',
        'depth >> 8',
        '0',
      ],
      writeBmpFileRawSwap: [
        'pixels[i+2] = pixelVec[i+0]',
        'pixels[i+1] = pixelVec[i+1]',
        'pixels[i+0] = pixelVec[i+2]',
      ],
      expectedBmpStorageBgr: '[0, highByte, lowByte]',
    },
    hypotheses: {
      little,
      big,
    },
    selectedByteOrder,
    selectionAuthority:
      selectedByteOrder === null
        ? 'blocked'
        : 'matched_creator_render_relationship',
    numericPlausibilityUsedForSelection: false,
    physicalUnitStatus: 'blocked',
    nativeKinectMetricEquivalence: false,
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

  globalThis.console.log('FR300_R1M_EVIDENCE_BEGIN');
  globalThis.console.log(JSON.stringify(report));
  globalThis.console.log('FR300_R1M_EVIDENCE_END');

  if (selectedByteOrder === null) {
    throw new Error(
      'matched creator render did not uniquely resolve byte order',
    );
  }
}

main().catch((error) => {
  globalThis.console.error(
    `FR300-R1M failed closed: ${
      error instanceof Error ? error.message : String(error)
    }`,
  );
  globalThis.process.exitCode = 1;
});
