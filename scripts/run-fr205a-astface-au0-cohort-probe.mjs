import { createHash } from 'node:crypto';
import { inflateRawSync } from 'node:zlib';
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
      'user-agent': 'myeongha-fr205a-astface-au0-probe',
    },
    signal: globalThis.AbortSignal.timeout(120000),
  });
  if (!(response.status === 206 || response.status === 200)) {
    throw new Error(`FR205A range fetch failed ${response.status}`);
  }
  return {
    bytes: Buffer.from(await response.arrayBuffer()),
    contentRange: response.headers.get('content-range'),
    contentLength: response.headers.get('content-length'),
  };
}

async function discoverSize() {
  const probe = await fetchRange(0, 0);
  const match = probe.contentRange?.match(/bytes\s+\d+-\d+\/(\d+)/u);
  if (match) return Number(match[1]);
  const length = Number(probe.contentLength);
  if (Number.isFinite(length) && length > 1) return length;
  throw new Error('FR205A could not determine ZIP size.');
}

function findLastSignature(buffer, signature) {
  for (let offset = buffer.length - 4; offset >= 0; offset -= 1) {
    if (buffer.readUInt32LE(offset) === signature) return offset;
  }
  return -1;
}

async function readCentralDirectory() {
  const size = await discoverSize();
  const tailStart = Math.max(0, size - TAIL_BYTES);
  const tail = await fetchRange(tailStart, size - 1);
  const eocdOffset = findLastSignature(tail.bytes, 0x06054b50);
  if (eocdOffset < 0) throw new Error('FR205A EOCD missing.');
  const entryCount = tail.bytes.readUInt16LE(eocdOffset + 10);
  const centralSize = tail.bytes.readUInt32LE(eocdOffset + 12);
  const centralOffset = tail.bytes.readUInt32LE(eocdOffset + 16);
  const central = await fetchRange(centralOffset, centralOffset + centralSize - 1);
  const entries = [];
  let cursor = 0;
  while (cursor < central.bytes.length) {
    if (central.bytes.readUInt32LE(cursor) !== 0x02014b50) {
      throw new Error(`FR205A bad central signature at ${cursor}`);
    }
    const flags = central.bytes.readUInt16LE(cursor + 8);
    const compressionMethod = central.bytes.readUInt16LE(cursor + 10);
    const compressedSize = central.bytes.readUInt32LE(cursor + 20);
    const uncompressedSize = central.bytes.readUInt32LE(cursor + 24);
    const nameLength = central.bytes.readUInt16LE(cursor + 28);
    const extraLength = central.bytes.readUInt16LE(cursor + 30);
    const commentLength = central.bytes.readUInt16LE(cursor + 32);
    const localHeaderOffset = central.bytes.readUInt32LE(cursor + 42);
    const nameStart = cursor + 46;
    const name = central.bytes
      .subarray(nameStart, nameStart + nameLength)
      .toString('utf8');
    entries.push({
      name,
      flags,
      compressionMethod,
      compressedSize,
      uncompressedSize,
      localHeaderOffset,
    });
    cursor = nameStart + nameLength + extraLength + commentLength;
  }
  if (entries.length !== entryCount) {
    throw new Error(`FR205A entry count mismatch ${entries.length}/${entryCount}`);
  }
  return { size, entries, centralDigest: sha256(central.bytes) };
}

async function extractEntry(entry) {
  const header = await fetchRange(entry.localHeaderOffset, entry.localHeaderOffset + 29);
  if (header.bytes.readUInt32LE(0) !== 0x04034b50) {
    throw new Error(`FR205A local header missing for ${entry.name}`);
  }
  const nameLength = header.bytes.readUInt16LE(26);
  const extraLength = header.bytes.readUInt16LE(28);
  const dataStart = entry.localHeaderOffset + 30 + nameLength + extraLength;
  const compressed = await fetchRange(
    dataStart,
    dataStart + entry.compressedSize - 1,
  );
  let bytes;
  if (entry.compressionMethod === 0) bytes = compressed.bytes;
  else if (entry.compressionMethod === 8) bytes = inflateRawSync(compressed.bytes);
  else {
    throw new Error(
      `FR205A unsupported ZIP compression ${entry.compressionMethod} for ${entry.name}`,
    );
  }
  if (bytes.length !== entry.uncompressedSize) {
    throw new Error(
      `FR205A size mismatch for ${entry.name}: ${bytes.length}/${entry.uncompressedSize}`,
    );
  }
  return bytes;
}

const { size, entries, centralDigest } = await readCentralDirectory();
const byName = new Map(entries.map((entry) => [entry.name, entry]));
const subjects = [...new Set(
  entries
    .map((entry) => entry.name.match(/^ASTFace_Public\/(ast\d{3})\//u)?.[1])
    .filter(Boolean),
)].sort();

const cohort = [];
const missing = [];
for (const subject of subjects) {
  const meshName =
    `ASTFace_Public/${subject}/Standardized Meshes/${subject}_au0.obj`;
  const landmarkName =
    `ASTFace_Public/${subject}/landmarks/${subject}_au0.txt`;
  const mesh = byName.get(meshName);
  const landmarks = byName.get(landmarkName);
  if (mesh && landmarks) {
    cohort.push({ subject, mesh, landmarks });
  } else {
    missing.push({
      subject,
      meshPresent: Boolean(mesh),
      landmarksPresent: Boolean(landmarks),
    });
  }
}

if (subjects.length !== 98) {
  throw new Error(`FR205A expected 98 AST-Face identities, found ${subjects.length}`);
}

const totalCompressedBytes = cohort.reduce(
  (sum, row) => sum + row.mesh.compressedSize + row.landmarks.compressedSize,
  0,
);
const totalUncompressedBytes = cohort.reduce(
  (sum, row) => sum + row.mesh.uncompressedSize + row.landmarks.uncompressedSize,
  0,
);

const sampleReceipts = [];
for (const row of cohort.slice(0, 3)) {
  const [meshBytes, landmarkBytes] = await Promise.all([
    extractEntry(row.mesh),
    extractEntry(row.landmarks),
  ]);
  const meshText = meshBytes.toString('utf8');
  const landmarkText = landmarkBytes.toString('utf8');
  const vertexRows = meshText
    .split(/\r?\n/u)
    .filter((line) => line.startsWith('v '));
  const vertices = vertexRows.map((line) => {
    const parts = line.trim().split(/\s+/u);
    return [Number(parts[1]), Number(parts[2]), Number(parts[3])];
  });
  const faces = meshText
    .split(/\r?\n/u)
    .filter((line) => line.startsWith('f '));
  const landmarks = landmarkText
    .split(/\r?\n/u)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.split(/\s+/u).map(Number));
  if (
    vertices.length === 0 ||
    faces.length === 0 ||
    landmarks.length !== 84 ||
    !landmarks.every(
      (point) => point.length === 3 && point.every(Number.isFinite),
    )
  ) {
    throw new Error(`FR205A invalid sample payload for ${row.subject}`);
  }
  const xs = landmarks.map((point) => point[0]);
  sampleReceipts.push({
    subject: row.subject,
    mesh: {
      name: row.mesh.name,
      compressionMethod: row.mesh.compressionMethod,
      compressedSize: row.mesh.compressedSize,
      uncompressedSize: row.mesh.uncompressedSize,
      digest: sha256(meshBytes),
      vertexCount: vertices.length,
      faceCount: faces.length,
      bounds: {
        minX: Math.min(...vertices.map((point) => point[0])),
        maxX: Math.max(...vertices.map((point) => point[0])),
        minY: Math.min(...vertices.map((point) => point[1])),
        maxY: Math.max(...vertices.map((point) => point[1])),
        minZ: Math.min(...vertices.map((point) => point[2])),
        maxZ: Math.max(...vertices.map((point) => point[2])),
      },
    },
    landmarks: {
      name: row.landmarks.name,
      compressedSize: row.landmarks.compressedSize,
      uncompressedSize: row.landmarks.uncompressedSize,
      digest: sha256(landmarkBytes),
      pointCount: landmarks.length,
      fullXSpan: Math.max(...xs) - Math.min(...xs),
      bounds: {
        minX: Math.min(...landmarks.map((point) => point[0])),
        maxX: Math.max(...landmarks.map((point) => point[0])),
        minY: Math.min(...landmarks.map((point) => point[1])),
        maxY: Math.max(...landmarks.map((point) => point[1])),
        minZ: Math.min(...landmarks.map((point) => point[2])),
        maxZ: Math.max(...landmarks.map((point) => point[2])),
      },
    },
  });
}

const artifact = {
  schemaVersion: 'fr205a-astface-au0-cohort-probe-v1',
  authorityState: 'public_geometry_probe_only',
  archive: {
    url: ZIP_URL,
    size,
    centralDigest,
  },
  identityCount: subjects.length,
  au0PairCount: cohort.length,
  missing,
  transferEstimate: {
    compressedBytes: totalCompressedBytes,
    uncompressedBytes: totalUncompressedBytes,
  },
  compressionMethods: [...new Set(
    cohort.flatMap((row) => [
      row.mesh.compressionMethod,
      row.landmarks.compressionMethod,
    ]),
  )].sort(),
  sampleReceipts,
  cohort: cohort.map((row) => ({
    subject: row.subject,
    mesh: {
      name: row.mesh.name,
      compressedSize: row.mesh.compressedSize,
      uncompressedSize: row.mesh.uncompressedSize,
      localHeaderOffset: row.mesh.localHeaderOffset,
      compressionMethod: row.mesh.compressionMethod,
    },
    landmarks: {
      name: row.landmarks.name,
      compressedSize: row.landmarks.compressedSize,
      uncompressedSize: row.landmarks.uncompressedSize,
      localHeaderOffset: row.landmarks.localHeaderOffset,
      compressionMethod: row.landmarks.compressionMethod,
    },
  })),
  full98PublicGeometryHoldoutExecutable:
    cohort.length === 98 && missing.length === 0,
  independentIdentityValidationComplete: false,
  productionAuthorized: false,
  commerceAuthorized: false,
};

const outDir = resolve(ROOT, 'artifacts', 'face-reading');
await mkdir(outDir, { recursive: true });
await writeFile(
  resolve(outDir, 'fr205a-astface-au0-cohort-probe.json'),
  `${JSON.stringify(artifact, null, 2)}\n`,
  'utf8',
);

globalThis.console.log(
  JSON.stringify({
    status: 'au0_cohort_probe_complete',
    identityCount: subjects.length,
    au0PairCount: cohort.length,
    missing,
    compressedMB: totalCompressedBytes / (1024 * 1024),
    uncompressedMB: totalUncompressedBytes / (1024 * 1024),
    compressionMethods: artifact.compressionMethods,
    sampleReceipts,
    full98PublicGeometryHoldoutExecutable:
      artifact.full98PublicGeometryHoldoutExecutable,
  }),
);
