import { createHash } from 'node:crypto';
import {
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import process from 'node:process';

const EXPECTED_SCHEMA =
  'fe021-preview-consumer-handoff-manifest-v1';
const EXPECTED_PACKAGE = '@myeongha/face-reading';
const EXPECTED_VERSION = '0.0.0';
const EXPECTED_EXPORT = './preview-engine';
const EXPECTED_FE019 =
  'FE019-DIRECT-BLOB-PRODUCT-SAFE-BROWSER-PREVIEW-SESSION-v1';
const EXPECTED_MEDIAPIPE = '0.10.35';

function assert(condition, message) {
  if (!condition) {
    throw new Error(`FE021 handoff verification failed: ${message}`);
  }
}

function run(command, args, cwd) {
  return execFileSync(command, args, {
    cwd,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    env: process.env,
  }).trim();
}

const handoffDir = resolve(
  process.argv[2] ?? '.artifacts/fe021-preview-consumer-handoff',
);
const files = readdirSync(handoffDir).sort();
assert(files.length === 2, 'handoff directory must contain exactly two files.');
assert(files.includes('manifest.json'), 'manifest.json is missing.');

const tarballs = files.filter((file) => file.endsWith('.tgz'));
assert(tarballs.length === 1, 'handoff directory must contain exactly one tarball.');

const manifest = JSON.parse(
  readFileSync(resolve(handoffDir, 'manifest.json'), 'utf8'),
);
const tarball = tarballs[0];
const tarballPath = resolve(handoffDir, tarball);
const sha256 = createHash('sha256')
  .update(readFileSync(tarballPath))
  .digest('hex');

assert(manifest.schemaVersion === EXPECTED_SCHEMA, 'manifest schema drift.');
assert(manifest.package?.name === EXPECTED_PACKAGE, 'package name drift.');
assert(manifest.package?.version === EXPECTED_VERSION, 'package version drift.');
assert(manifest.package?.publicExportPath === EXPECTED_EXPORT, 'public export path drift.');
assert(manifest.package?.private === true, 'package must remain private.');
assert(manifest.artifact?.filename === basename(tarball), 'manifest filename mismatch.');
assert(manifest.artifact?.sha256 === sha256, 'tarball SHA-256 mismatch.');
assert(manifest.contract?.fe019 === EXPECTED_FE019, 'FE019 contract drift.');
assert(
  manifest.runtimeDependency?.package === '@mediapipe/tasks-vision' &&
    manifest.runtimeDependency?.version === EXPECTED_MEDIAPIPE,
  'MediaPipe dependency pin drift.',
);
assert(
  manifest.distribution?.registryPublished === false &&
    manifest.distribution?.handoffOnly === true,
  'distribution boundary drift.',
);

const tempRoot = mkdtempSync(join(tmpdir(), 'myeongha-fe021-'));
try {
  writeFileSync(
    join(tempRoot, 'package.json'),
    JSON.stringify(
      {
        name: 'fe021-handoff-consumer',
        version: '0.0.0',
        private: true,
        type: 'module',
      },
      null,
      2,
    ) + '\n',
    'utf8',
  );

  run(
    'npm',
    [
      'install',
      '--ignore-scripts',
      '--no-audit',
      '--no-fund',
      '--package-lock=false',
      tarballPath,
    ],
    tempRoot,
  );

  const installed = JSON.parse(
    readFileSync(
      join(tempRoot, 'node_modules', '@myeongha', 'face-reading', 'package.json'),
      'utf8',
    ),
  );
  assert(installed.name === EXPECTED_PACKAGE, 'installed package name drift.');
  assert(installed.version === EXPECTED_VERSION, 'installed package version drift.');
  assert(installed.private === true, 'installed package must remain private.');
  assert(
    JSON.stringify(installed.exports) ===
      JSON.stringify({
        './preview-engine': {
          types: './dist/preview-engine.d.ts',
          default: './dist/preview-engine.js',
        },
      }),
    'installed export map widened or drifted.',
  );
  assert(
    installed.dependencies?.['@mediapipe/tasks-vision'] === EXPECTED_MEDIAPIPE,
    'installed MediaPipe dependency pin drift.',
  );

  const consumerCheck = `
    const preview = await import('@myeongha/face-reading/preview-engine');
    if (preview.FE019_CONTRACT_VERSION !== ${JSON.stringify(EXPECTED_FE019)}) {
      throw new Error('FE019 contract missing from FE021 handoff.');
    }
    if (typeof preview.openDirectBlobProductPreviewSessionFE019 !== 'function') {
      throw new Error('FE019 open function missing from FE021 handoff.');
    }
    async function blocked(specifier) {
      try {
        await import(specifier);
      } catch (error) {
        if (error && typeof error === 'object' && error.code === 'ERR_PACKAGE_PATH_NOT_EXPORTED') return;
        throw error;
      }
      throw new Error('Expected blocked path: ' + specifier);
    }
    await blocked('@myeongha/face-reading');
    await blocked('@myeongha/face-reading/direct-blob-product-preview-session-fe019');
  `;
  run('node', ['--input-type=module', '-e', consumerCheck], tempRoot);
} finally {
  rmSync(tempRoot, { recursive: true, force: true });
}

process.stdout.write(
  `${JSON.stringify({
    status: 'FE021_PREVIEW_CONSUMER_HANDOFF_PASS',
    artifact: tarball,
    sha256,
    isolatedConsumerImport: true,
    internalPathsBlocked: true,
    registryPublished: false,
  })}\n`,
);
