import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ZIP_URL = 'https://osf.io/download/ym24q/';
const TAIL_BYTES = 128 * 1024;

const sha256 = (bytes) =>
  `sha256:${createHash('sha256').update(bytes).digest('hex')}`;

async function fetchRange(start, end) {
  const response = await globalThis.fetch(ZIP_URL, {
    redirect: 'follow',
    headers: {
      Range: `bytes=${start}-${end}`,
      'user-agent': 'myeongha-fr205a-astface-remote-zip-index',
    },
    signal: globalThis.AbortSignal.timeout(120000),
  });
  if (!(response.status === 206 || response.status === 200)) {
    throw new Error(`FR205A range fetch failed ${response.status}`);
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  const range = response.headers.get('content-range');
  return {
    bytes,
    status: response.status,
    contentRange: range,
    contentLength: response.headers.get('content-length'),
    acceptRanges: response.headers.get('accept-ranges'),
    finalUrl: response.url,
  };
}

async function discoverSize() {
  const probe = await fetchRange(0, 0);
  if (probe.contentRange) {
    const match = probe.contentRange.match(/bytes\s+\d+-\d+\/(\d+)/u);
    if (match) return { size: Number(match[1]), probe };
  }
  const length = Number(probe.contentLength);
  if (Number.isFinite(length) && length > 1) return { size: length, probe };
  throw new Error('FR205A could not determine remote ZIP size.');
}

function findLastSignature(buffer, signature) {
  for (let offset = buffer.length - 4; offset >= 0; offset -= 1) {
    if (buffer.readUInt32LE(offset) === signature) return offset;
  }
  return -1;
}

const { size, probe } = await discoverSize();
const tailStart = Math.max(0, size - TAIL_BYTES);
const tail = await fetchRange(tailStart, size - 1);
const eocdOffset = findLastSignature(tail.bytes, 0x06054b50);
if (eocdOffset < 0) throw new Error('FR205A ZIP EOCD not found.');

const disk = tail.bytes.readUInt16LE(eocdOffset + 4);
const centralDisk = tail.bytes.readUInt16LE(eocdOffset + 6);
const entriesOnDisk = tail.bytes.readUInt16LE(eocdOffset + 8);
const entryCount = tail.bytes.readUInt16LE(eocdOffset + 10);
const centralSize = tail.bytes.readUInt32LE(eocdOffset + 12);
const centralOffset = tail.bytes.readUInt32LE(eocdOffset + 16);
const commentLength = tail.bytes.readUInt16LE(eocdOffset + 20);

if (
  disk !== 0 ||
  centralDisk !== 0 ||
  entriesOnDisk !== entryCount ||
  entryCount === 0xffff ||
  centralSize === 0xffffffff ||
  centralOffset === 0xffffffff
) {
  throw new Error(
    'FR205A ZIP64/multi-disk archive requires an extended parser; simple EOCD values are not usable.',
  );
}

const central = await fetchRange(centralOffset, centralOffset + centralSize - 1);
const entries = [];
let cursor = 0;
while (cursor < central.bytes.length) {
  if (central.bytes.readUInt32LE(cursor) !== 0x02014b50) {
    throw new Error(`FR205A invalid central directory signature at ${cursor}`);
  }
  const flags = central.bytes.readUInt16LE(cursor + 8);
  const compressionMethod = central.bytes.readUInt16LE(cursor + 10);
  const crc32 = central.bytes.readUInt32LE(cursor + 16);
  const compressedSize = central.bytes.readUInt32LE(cursor + 20);
  const uncompressedSize = central.bytes.readUInt32LE(cursor + 24);
  const nameLength = central.bytes.readUInt16LE(cursor + 28);
  const extraLength = central.bytes.readUInt16LE(cursor + 30);
  const entryCommentLength = central.bytes.readUInt16LE(cursor + 32);
  const localHeaderOffset = central.bytes.readUInt32LE(cursor + 42);
  const nameStart = cursor + 46;
  const name = central.bytes
    .subarray(nameStart, nameStart + nameLength)
    .toString((flags & 0x800) !== 0 ? 'utf8' : 'utf8');
  entries.push({
    name,
    compressionMethod,
    crc32,
    compressedSize,
    uncompressedSize,
    localHeaderOffset,
    flags,
  });
  cursor =
    nameStart +
    nameLength +
    extraLength +
    entryCommentLength;
}

if (entries.length !== entryCount) {
  throw new Error(
    `FR205A central entry count mismatch: parsed=${entries.length} eocd=${entryCount}`,
  );
}

const files = entries.filter((entry) => !entry.name.endsWith('/'));
const extensionCounts = {};
for (const entry of files) {
  const ext = entry.name.toLowerCase().match(/(\.[^./]+)$/u)?.[1] ?? '';
  extensionCounts[ext] = (extensionCounts[ext] ?? 0) + 1;
}

const neutralLike = files.filter((entry) =>
  /neutral|neut|baseline|normal/i.test(entry.name),
);
const landmarkLike = files.filter((entry) =>
  /landmark/i.test(entry.name),
);
const meshLike = files.filter((entry) =>
  /\.(?:obj|ply|stl)$/iu.test(entry.name),
);

const topLevel = [...new Set(files.map((entry) => entry.name.split('/')[0]))].sort();

const artifact = {
  schemaVersion: 'fr205a-astface-remote-zip-index-v1',
  authorityState: 'public_archive_index_only',
  zipUrl: ZIP_URL,
  remoteSize: size,
  remoteProbe: {
    status: probe.status,
    contentRange: probe.contentRange,
    acceptRanges: probe.acceptRanges,
    finalUrl: probe.finalUrl,
  },
  tailDigest: sha256(tail.bytes),
  centralDirectory: {
    entryCount,
    size: centralSize,
    offset: centralOffset,
    digest: sha256(central.bytes),
    commentLength,
  },
  fileCount: files.length,
  extensionCounts,
  topLevel,
  meshCount: meshLike.length,
  neutralLikeCount: neutralLike.length,
  landmarkLikeCount: landmarkLike.length,
  neutralLike: neutralLike.slice(0, 300),
  landmarkLike: landmarkLike.slice(0, 300),
  sampleFiles: files.slice(0, 300),
  entries,
  productionAuthorized: false,
  commerceAuthorized: false,
};

const outDir = resolve(ROOT, 'artifacts', 'face-reading');
await mkdir(outDir, { recursive: true });
await writeFile(
  resolve(outDir, 'fr205a-astface-remote-zip-index.json'),
  `${JSON.stringify(artifact, null, 2)}\n`,
  'utf8',
);

globalThis.console.log(
  JSON.stringify({
    status: 'remote_zip_index_complete',
    remoteSize: size,
    entryCount,
    fileCount: files.length,
    extensionCounts,
    topLevel,
    meshCount: meshLike.length,
    neutralLikeCount: neutralLike.length,
    landmarkLikeCount: landmarkLike.length,
    sampleNeutral: neutralLike.slice(0, 30).map((entry) => entry.name),
    sampleLandmarks: landmarkLike.slice(0, 30).map((entry) => entry.name),
    sampleFiles: files.slice(0, 40).map((entry) => entry.name),
  }),
);
