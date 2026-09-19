import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';
import { inflateRawSync } from 'node:zlib';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ZIP_URL = 'https://osf.io/download/ym24q/';
const AST_REPO = 'zhaopu99/AST-face';
const AST_COMMIT = '02132155adda9fba6853f0c154cc33b57b31fed9';
const LANDMARK_ID_84 = Object.freeze([
  21,25,35,31,83,40,41,43,4,3,1,0,7,5,8,9,11,12,13,15,
  60,49,50,51,52,53,64,55,57,59,61,62,63,65,66,67,
]);
const LANDMARK_ID_68 = Object.freeze([
  17,21,22,26,30,31,33,35,36,37,38,39,40,41,42,43,44,45,
  46,47,48,49,50,51,52,53,54,55,57,59,61,62,63,65,66,67,
]);
const SUBJECTS = Object.freeze(['ast001','ast002','ast003']);

const sha256 = (bytes) =>
  `sha256:${createHash('sha256').update(bytes).digest('hex')}`;

async function fetchBytes(url) {
  const response = await globalThis.fetch(url, {
    redirect: 'follow',
    headers: { 'user-agent': 'myeongha-fr205a-frame-alignment-probe' },
    signal: globalThis.AbortSignal.timeout(120000),
  });
  if (!response.ok) throw new Error(`FR205A fetch failed ${response.status}: ${url}`);
  return Buffer.from(await response.arrayBuffer());
}

async function fetchRaw(path) {
  const encoded = path.split('/').map(encodeURIComponent).join('/');
  return fetchBytes(
    `https://raw.githubusercontent.com/${AST_REPO}/${AST_COMMIT}/${encoded}`,
  );
}

async function fetchRange(start, end) {
  const response = await globalThis.fetch(ZIP_URL, {
    redirect: 'follow',
    headers: {
      Range: `bytes=${start}-${end}`,
      'user-agent': 'myeongha-fr205a-frame-alignment-probe',
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

async function discoverZipSize() {
  const probe = await fetchRange(0, 0);
  const match = probe.contentRange?.match(/bytes\s+\d+-\d+\/(\d+)/u);
  if (match) return Number(match[1]);
  const length = Number(probe.contentLength);
  if (Number.isFinite(length) && length > 1) return length;
  throw new Error('FR205A ZIP size unavailable.');
}

function findLastSignature(buffer, signature) {
  for (let offset = buffer.length - 4; offset >= 0; offset -= 1) {
    if (buffer.readUInt32LE(offset) === signature) return offset;
  }
  return -1;
}

async function readCentralDirectory() {
  const size = await discoverZipSize();
  const tail = await fetchRange(Math.max(0, size - 128 * 1024), size - 1);
  const eocd = findLastSignature(tail.bytes, 0x06054b50);
  if (eocd < 0) throw new Error('FR205A EOCD missing.');
  const entryCount = tail.bytes.readUInt16LE(eocd + 10);
  const centralSize = tail.bytes.readUInt32LE(eocd + 12);
  const centralOffset = tail.bytes.readUInt32LE(eocd + 16);
  const central = await fetchRange(centralOffset, centralOffset + centralSize - 1);
  const entries = [];
  let cursor = 0;
  while (cursor < central.bytes.length) {
    if (central.bytes.readUInt32LE(cursor) !== 0x02014b50) {
      throw new Error(`FR205A bad central signature at ${cursor}`);
    }
    const compressionMethod = central.bytes.readUInt16LE(cursor + 10);
    const compressedSize = central.bytes.readUInt32LE(cursor + 20);
    const uncompressedSize = central.bytes.readUInt32LE(cursor + 24);
    const nameLength = central.bytes.readUInt16LE(cursor + 28);
    const extraLength = central.bytes.readUInt16LE(cursor + 30);
    const commentLength = central.bytes.readUInt16LE(cursor + 32);
    const localHeaderOffset = central.bytes.readUInt32LE(cursor + 42);
    const nameStart = cursor + 46;
    const name = central.bytes.subarray(nameStart, nameStart + nameLength).toString('utf8');
    entries.push({name,compressionMethod,compressedSize,uncompressedSize,localHeaderOffset});
    cursor = nameStart + nameLength + extraLength + commentLength;
  }
  if (entries.length !== entryCount) {
    throw new Error(`FR205A central count mismatch ${entries.length}/${entryCount}`);
  }
  return entries;
}

async function extractEntry(entry) {
  const header = await fetchRange(entry.localHeaderOffset, entry.localHeaderOffset + 29);
  if (header.bytes.readUInt32LE(0) !== 0x04034b50) {
    throw new Error(`FR205A local header missing for ${entry.name}`);
  }
  const nameLength = header.bytes.readUInt16LE(26);
  const extraLength = header.bytes.readUInt16LE(28);
  const start = entry.localHeaderOffset + 30 + nameLength + extraLength;
  const compressed = await fetchRange(start, start + entry.compressedSize - 1);
  let bytes;
  if (entry.compressionMethod === 0) bytes = compressed.bytes;
  else if (entry.compressionMethod === 8) bytes = inflateRawSync(compressed.bytes);
  else throw new Error(`FR205A unsupported compression ${entry.compressionMethod}`);
  if (bytes.length !== entry.uncompressedSize) {
    throw new Error(`FR205A extracted size mismatch for ${entry.name}`);
  }
  return bytes;
}

function parseVertices(text) {
  return text
    .split(/\r?\n/u)
    .filter((line) => line.startsWith('v '))
    .map((line) => {
      const parts = line.trim().split(/\s+/u);
      return [Number(parts[1]), Number(parts[2]), Number(parts[3])];
    });
}

function parseLandmarks(text) {
  const rows = text
    .split(/\r?\n/u)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.split(/\s+/u).map(Number));
  if (
    rows.length !== 84 ||
    !rows.every((row) => row.length === 3 && row.every(Number.isFinite))
  ) {
    throw new Error(`FR205A invalid 84-point landmark file: ${rows.length}`);
  }
  return rows;
}

function solveLinear4(matrix, vector) {
  const a = matrix.map((row, index) => [...row, vector[index]]);
  for (let col = 0; col < 4; col += 1) {
    let pivot = col;
    for (let row = col + 1; row < 4; row += 1) {
      if (Math.abs(a[row][col]) > Math.abs(a[pivot][col])) pivot = row;
    }
    if (Math.abs(a[pivot][col]) < 1e-12) throw new Error('FR205A singular affine fit.');
    [a[col], a[pivot]] = [a[pivot], a[col]];
    const divisor = a[col][col];
    for (let k = col; k <= 4; k += 1) a[col][k] /= divisor;
    for (let row = 0; row < 4; row += 1) {
      if (row === col) continue;
      const factor = a[row][col];
      for (let k = col; k <= 4; k += 1) a[row][k] -= factor * a[col][k];
    }
  }
  return a.map((row) => row[4]);
}

function fitAffine(source, target) {
  if (source.length !== target.length || source.length < 4) {
    throw new Error('FR205A affine fit requires corresponding point sets.');
  }
  const ata = Array.from({length:4},()=>Array(4).fill(0));
  const atb = Array.from({length:3},()=>Array(4).fill(0));
  for (let i = 0; i < source.length; i += 1) {
    const row = [source[i][0],source[i][1],source[i][2],1];
    for (let r = 0; r < 4; r += 1) {
      for (let c = 0; c < 4; c += 1) ata[r][c] += row[r] * row[c];
      for (let axis = 0; axis < 3; axis += 1) {
        atb[axis][r] += row[r] * target[i][axis];
      }
    }
  }
  const coeff = atb.map((vector)=>solveLinear4(ata.map((row)=>[...row]),vector));
  const transform = (point) => coeff.map(
    (axis) => axis[0]*point[0] + axis[1]*point[1] + axis[2]*point[2] + axis[3],
  );
  const residuals = source.map((point,index)=>{
    const out=transform(point);
    const tgt=target[index];
    return Math.hypot(out[0]-tgt[0],out[1]-tgt[1],out[2]-tgt[2]);
  });
  const rmse=Math.sqrt(residuals.reduce((s,v)=>s+v*v,0)/residuals.length);
  return {coeff,transform,rmse,maxResidual:Math.max(...residuals)};
}

function bounds(points) {
  return {
    minX:Math.min(...points.map((p)=>p[0])),
    maxX:Math.max(...points.map((p)=>p[0])),
    minY:Math.min(...points.map((p)=>p[1])),
    maxY:Math.max(...points.map((p)=>p[1])),
    minZ:Math.min(...points.map((p)=>p[2])),
    maxZ:Math.max(...points.map((p)=>p[2])),
  };
}

const [cutBytes,kptBytes,entries] = await Promise.all([
  fetchRaw('ASTFace Pipline/data/cut_bfm.txt'),
  fetchRaw('ASTFace Pipline/05_edge_nicp/BFM/bfm_landmarks_withear.txt'),
  readCentralDirectory(),
]);
const byName=new Map(entries.map((entry)=>[entry.name,entry]));
const firstLine=cutBytes.toString('utf8').split(/\r?\n/u)[0] ?? '';
const kept=(firstLine.split(':')[1] ?? '')
  .split(',')
  .map((value)=>Number(value.trim()))
  .filter(Number.isFinite);
if (kept.length !== 33390) throw new Error(`FR205A expected 33390 cropped indices, got ${kept.length}`);
const cropMap=new Map(kept.map((oldIndex,newZeroIndex)=>[oldIndex,newZeroIndex]));
const kpt68=kptBytes
  .toString('utf8')
  .split(/\r?\n/u)
  .map((line)=>line.trim())
  .filter(Boolean)
  .map(Number);
if (kpt68.length !== 68 || !kpt68.every(Number.isFinite)) {
  throw new Error(`FR205A expected 68 BFM landmark indices, got ${kpt68.length}`);
}
const rawSelected=LANDMARK_ID_68.map((index)=>kpt68[index]);
const conventions = Object.freeze({
  asIs: (value)=>value,
  plus1: (value)=>value+1,
  minus1: (value)=>value-1,
});

const receipts=[];
for (const subject of SUBJECTS) {
  const meshName=`ASTFace_Public/${subject}/Standardized Meshes/${subject}_au0.obj`;
  const landmarkName=`ASTFace_Public/${subject}/landmarks/${subject}_au0.txt`;
  const meshEntry=byName.get(meshName);
  const landmarkEntry=byName.get(landmarkName);
  if (!meshEntry || !landmarkEntry) throw new Error(`FR205A missing AU0 pair for ${subject}`);
  const [meshBytes,landmarkBytes]=await Promise.all([
    extractEntry(meshEntry),
    extractEntry(landmarkEntry),
  ]);
  const vertices=parseVertices(meshBytes.toString('utf8'));
  const landmarks=parseLandmarks(landmarkBytes.toString('utf8'));
  const source36=LANDMARK_ID_84.map((index)=>landmarks[index]);
  const conventionReceipts={};
  for (const [name,adjust] of Object.entries(conventions)) {
    const mapped=rawSelected.map((raw)=>{
      const croppedZeroIndex=cropMap.get(adjust(raw));
      if (croppedZeroIndex === undefined) {
        throw new Error(`FR205A unmapped BFM keypoint ${raw} under ${name}`);
      }
      const point=vertices[croppedZeroIndex];
      if (!point) throw new Error(`FR205A mapped vertex missing ${croppedZeroIndex}`);
      return point;
    });
    const fit=fitAffine(source36,mapped);
    const meshBounds=bounds(vertices);
    const meshSpan=Math.max(
      meshBounds.maxX-meshBounds.minX,
      meshBounds.maxY-meshBounds.minY,
      meshBounds.maxZ-meshBounds.minZ,
    );
    const transformed84=landmarks.map(fit.transform);
    conventionReceipts[name]={
      rmse:fit.rmse,
      normalizedRmse:fit.rmse/meshSpan,
      maxResidual:fit.maxResidual,
      coeff:fit.coeff,
      mappedVertexZeroIndices:rawSelected.map((raw)=>cropMap.get(adjust(raw))),
      transformed84Bounds:bounds(transformed84),
      transformed84FullXSpan:
        Math.max(...transformed84.map((p)=>p[0]))-
        Math.min(...transformed84.map((p)=>p[0])),
    };
  }
  receipts.push({
    subject,
    meshDigest:sha256(meshBytes),
    landmarkDigest:sha256(landmarkBytes),
    meshBounds:bounds(vertices),
    landmarkBounds:bounds(landmarks),
    conventions:conventionReceipts,
  });
}

const aggregate={};
for (const name of Object.keys(conventions)) {
  const values=receipts.map((receipt)=>receipt.conventions[name].normalizedRmse);
  aggregate[name]={
    meanNormalizedRmse:values.reduce((a,b)=>a+b,0)/values.length,
    maxNormalizedRmse:Math.max(...values),
  };
}
const ordered=Object.entries(aggregate).sort(
  (a,b)=>a[1].meanNormalizedRmse-b[1].meanNormalizedRmse || a[0].localeCompare(b[0]),
);
const selectedConvention=ordered[0][0];

const artifact={
  schemaVersion:'fr205a-astface-frame-alignment-probe-v1',
  authorityState:'coordinate_frame_alignment_probe_only',
  astFaceRepository:AST_REPO,
  astFaceCommit:AST_COMMIT,
  subjects:SUBJECTS,
  sourceMappings:{
    landmarkId84:LANDMARK_ID_84,
    landmarkId68:LANDMARK_ID_68,
    bfmLandmarkDigest:sha256(kptBytes),
    cutBfmDigest:sha256(cutBytes),
    cropIndexCount:kept.length,
    bfmLandmarkCount:kpt68.length,
  },
  aggregate,
  selectedConvention,
  selectionBasis:
    'lowest mean normalized 36-correspondence affine RMSE across ast001-ast003; no MediaPipe output or width error consulted',
  receipts,
  providerExecuted:false,
  calibrationRefitAuthorized:false,
  productionAuthorized:false,
  commerceAuthorized:false,
};

const outDir=resolve(ROOT,'artifacts','face-reading');
await mkdir(outDir,{recursive:true});
await writeFile(
  resolve(outDir,'fr205a-astface-frame-alignment-probe.json'),
  `${JSON.stringify(artifact,null,2)}\n`,
  'utf8',
);
globalThis.console.log(JSON.stringify({
  status:'frame_alignment_probe_complete',
  aggregate,
  selectedConvention,
  subjects:receipts.map((receipt)=>({
    subject:receipt.subject,
    selected:receipt.conventions[selectedConvention],
  })),
}));
