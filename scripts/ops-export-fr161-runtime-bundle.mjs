import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';

import { runPhotoToLipsContourNeutralSurfaceFR66 } from '../.face-reading-dist/lips-contour-neutral-surface-fr66.js';
import { assessLipsPoseNormalizationRequirementsFR67 } from '../.face-reading-dist/lips-pose-normalization-requirements-fr67.js';
import { admitMediaPipeFaceGeometryTransformSemanticsFR68 } from '../.face-reading-dist/mediapipe-face-geometry-transform-semantics-fr68.js';
import { admitMediaPipeWebMetricGeometryGapFR69 } from '../.face-reading-dist/mediapipe-web-metric-geometry-gap-fr69.js';
import { admitMediaPipeReleaseExactMetricGeometryFR75 } from '../.face-reading-dist/mediapipe-release-exact-metric-geometry-admission-fr75.js';
import {
  admitMediaPipeScreenToMetricReimplementationParityFR76,
  validateMediaPipeScreenToMetricReimplementationParityFR76,
} from '../.face-reading-dist/mediapipe-screen-to-metric-reimplementation-parity-fr76.js';
import {
  FR26_MEDIAPIPE_FACE_LANDMARKER_MODEL,
} from '../.face-reading-dist/mediapipe-face-landmarker-runtime-fr26.js';

const RELEASE_COMMIT = 'f8ef212d5c962c0e853db7e59d217056b187084b';
const RAW_ROOT = `https://raw.githubusercontent.com/google-ai-edge/mediapipe/${RELEASE_COMMIT}`;
const OUT = path.resolve('fr161-local-runtime-bundle');
const PROVIDER_LANDMARK_COUNT = 478;
const DIGEST = `sha256:${'8'.repeat(64)}`;
const WITNESSES = Object.freeze({
  input: Object.freeze({
    path: 'mediapipe/tasks/testdata/vision/face_blendshapes_in_landmarks.prototxt',
    blobSha: 'ea2e60eefaf6a5c13aee4bb468384edab7e7d5d7',
  }),
  metadata: Object.freeze({
    path: 'mediapipe/tasks/cc/vision/face_geometry/data/geometry_pipeline_metadata_landmarks.pbtxt',
    blobSha: '252a7b05b24c5c43c5b94179393639f7c9a2fe8f',
  }),
});

function gitBlobSha(bytes) {
  const prefix = Buffer.from(`blob ${bytes.length}\0`, 'utf8');
  return createHash('sha1').update(prefix).update(bytes).digest('hex');
}

async function fetchExact(witness) {
  const response = await fetch(`${RAW_ROOT}/${witness.path}`, {
    headers: { 'user-agent': 'myeongha-fr161-local-runtime-export' },
  });
  if (!response.ok) throw new Error(`failed to fetch ${witness.path}: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  const actual = gitBlobSha(bytes);
  if (actual !== witness.blobSha) {
    throw new Error(`Git blob SHA mismatch for ${witness.path}: expected=${witness.blobSha} actual=${actual}`);
  }
  return bytes;
}

function parseProviderLandmarks(text) {
  const landmarks = [];
  for (const match of text.matchAll(/landmark\s*\{([\s\S]*?)\}/g)) {
    const block = match[1];
    const x = Number(/\bx:\s*([-+0-9.eE]+)/.exec(block)?.[1]);
    const y = Number(/\by:\s*([-+0-9.eE]+)/.exec(block)?.[1]);
    const z = Number(/\bz:\s*([-+0-9.eE]+)/.exec(block)?.[1]);
    const visibilityMatch = /\bvisibility:\s*([-+0-9.eE]+)/.exec(block)?.[1];
    if (![x, y, z].every(Number.isFinite)) throw new Error('provider fixture contains non-finite XYZ');
    landmarks.push({
      x,
      y,
      z,
      ...(visibilityMatch === undefined ? {} : { visibility: Number(visibilityMatch) }),
    });
  }
  if (landmarks.length !== PROVIDER_LANDMARK_COUNT) {
    throw new Error(`expected ${PROVIDER_LANDMARK_COUNT} provider landmarks; got ${landmarks.length}`);
  }
  return landmarks;
}

function factory(providerLandmarks) {
  return {
    async create() {
      return {
        detect() {
          return {
            faceLandmarks: [providerLandmarks],
            faceBlendshapes: [],
            facialTransformationMatrixes: [],
          };
        },
        close() {},
      };
    },
  };
}

async function downloadModel() {
  const response = await fetch(FR26_MEDIAPIPE_FACE_LANDMARKER_MODEL, {
    headers: { 'user-agent': 'myeongha-fr161-local-runtime-export' },
  });
  if (!response.ok) throw new Error(`failed to fetch face landmarker model: HTTP ${response.status}`);
  return Buffer.from(await response.arrayBuffer());
}

await fs.rm(OUT, { recursive: true, force: true });
await fs.mkdir(OUT, { recursive: true });

const [inputBytes, metadataBytes, modelBytes] = await Promise.all([
  fetchExact(WITNESSES.input),
  fetchExact(WITNESSES.metadata),
  downloadModel(),
]);

const providerLandmarks = parseProviderLandmarks(inputBytes.toString('utf8'));
const runtimeFactory = factory(providerLandmarks);
const fr66 = await runPhotoToLipsContourNeutralSurfaceFR66({
  schemaVersion: 'fr61-production-neutral-observation-provider-request-v1',
  providerRunRef: 'fr161:runtime-export:parity-fixture',
  canonicalAssetDigest: DIGEST,
  image: Object.freeze({ fixture: true }),
}, runtimeFactory);
const fr67 = assessLipsPoseNormalizationRequirementsFR67(fr66);
const fr68 = admitMediaPipeFaceGeometryTransformSemanticsFR68(fr67);
const fr69 = admitMediaPipeWebMetricGeometryGapFR69(fr68);
const fr75 = admitMediaPipeReleaseExactMetricGeometryFR75(fr69);
const fr76 = admitMediaPipeScreenToMetricReimplementationParityFR76(fr75);
validateMediaPipeScreenToMetricReimplementationParityFR76(fr76);

const packageJson = JSON.parse(await fs.readFile('node_modules/@mediapipe/tasks-vision/package.json', 'utf8'));
if (packageJson.version !== '0.10.35') {
  throw new Error(`tasks-vision version drift: expected=0.10.35 actual=${packageJson.version}`);
}

await Promise.all([
  fs.cp('.face-reading-dist', path.join(OUT, 'face-dist'), { recursive: true }),
  fs.cp('node_modules/@mediapipe/tasks-vision', path.join(OUT, 'tasks-vision'), { recursive: true }),
  fs.copyFile('scripts/ops-fr161-local-runner.mjs', path.join(OUT, 'runner.mjs')),
  fs.copyFile('scripts/ops-fr161-local-runner.html', path.join(OUT, 'index.html')),
  fs.writeFile(path.join(OUT, 'geometry_metadata.pbtxt'), metadataBytes),
  fs.writeFile(path.join(OUT, 'fr76-parity.json'), `${JSON.stringify(fr76)}\n`, 'utf8'),
  fs.writeFile(path.join(OUT, 'face_landmarker.task'), modelBytes),
]);

const manifest = Object.freeze({
  schemaVersion: 'fr161-local-runtime-export-manifest-v1',
  sourceMergedSha: '77708f79969f026e2aa81413f8cffddc8932ee74',
  sourceTreeSha: 'f9e7f6f06b6c943d6d13e861d64c4172741010da',
  mediaPipeTasksVisionVersion: packageJson.version,
  mediaPipeReleaseCommit: RELEASE_COMMIT,
  metadataGitBlobSha: WITNESSES.metadata.blobSha,
  parityInputGitBlobSha: WITNESSES.input.blobSha,
  modelRef: FR26_MEDIAPIPE_FACE_LANDMARKER_MODEL,
  modelSha256: createHash('sha256').update(modelBytes).digest('hex'),
  modelBytes: modelBytes.length,
  userCaptureBytesBundled: false,
  userFaceDerivedMetricsBundled: false,
  purpose: 'local_private_execution_only',
});
await fs.writeFile(path.join(OUT, 'export-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

process.stdout.write(`${JSON.stringify({
  status: 'FR161_LOCAL_RUNTIME_EXPORT_PASS',
  modelBytes: modelBytes.length,
  modelSha256: manifest.modelSha256,
  tasksVisionVersion: packageJson.version,
  userCaptureBytesBundled: false,
})}\n`);
