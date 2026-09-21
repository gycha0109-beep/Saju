import {
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import process from 'node:process';

const EXPECTED_PACKAGE = '@myeongha/face-reading';
const EXPECTED_VERSION = '0.0.0';
const EXPECTED_MEDIAPIPE_VERSION = '0.10.35';
const EXPECTED_FE019 =
  'FE019-DIRECT-BLOB-PRODUCT-SAFE-BROWSER-PREVIEW-SESSION-v1';

function run(command, args, options = {}) {
  return execFileSync(command, args, {
    cwd: options.cwd ?? process.cwd(),
    encoding: 'utf8',
    stdio: options.capture ? ['ignore', 'pipe', 'pipe'] : 'pipe',
    env: process.env,
  }).trim();
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(`FE020 isolated artifact verification failed: ${message}`);
  }
}

const tempRoot = mkdtempSync(join(tmpdir(), 'myeongha-fe020-'));
const packDir = join(tempRoot, 'pack');
const consumerDir = join(tempRoot, 'consumer');

try {
  run('node', ['-e', `
    const fs = require('node:fs');
    fs.mkdirSync(${JSON.stringify(packDir)}, { recursive: true });
    fs.mkdirSync(${JSON.stringify(consumerDir)}, { recursive: true });
  `]);

  const packedJson = run(
    'npm',
    [
      'pack',
      '--workspace',
      EXPECTED_PACKAGE,
      '--pack-destination',
      packDir,
      '--json',
    ],
    { capture: true },
  );
  const packed = JSON.parse(packedJson);
  assert(Array.isArray(packed) && packed.length === 1, 'npm pack must emit one artifact.');

  const artifact = packed[0];
  assert(artifact.name === EXPECTED_PACKAGE, 'packed package name drift.');
  assert(artifact.version === EXPECTED_VERSION, 'packed package version drift.');
  assert(typeof artifact.filename === 'string' && artifact.filename.endsWith('.tgz'), 'missing tarball filename.');

  const filePaths = new Set((artifact.files ?? []).map((entry) => entry.path));
  assert(filePaths.has('package.json'), 'tarball is missing package.json.');
  assert(filePaths.has('dist/preview-engine.js'), 'tarball is missing dist/preview-engine.js.');
  assert(filePaths.has('dist/preview-engine.d.ts'), 'tarball is missing dist/preview-engine.d.ts.');
  assert(
    ![...filePaths].some((path) => path.startsWith('src/')),
    'tarball must not ship source files.',
  );

  writeFileSync(
    join(consumerDir, 'package.json'),
    JSON.stringify(
      {
        name: 'fe020-isolated-consumer',
        version: '0.0.0',
        private: true,
        type: 'module',
      },
      null,
      2,
    ) + '\n',
    'utf8',
  );

  const tarballPath = resolve(packDir, artifact.filename);
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
    { cwd: consumerDir },
  );

  const installedPackage = JSON.parse(
    readFileSync(
      join(consumerDir, 'node_modules', '@myeongha', 'face-reading', 'package.json'),
      'utf8',
    ),
  );
  assert(installedPackage.name === EXPECTED_PACKAGE, 'installed package name drift.');
  assert(installedPackage.version === EXPECTED_VERSION, 'installed package version drift.');
  assert(installedPackage.private === true, 'package must remain private.');
  assert(
    JSON.stringify(installedPackage.exports) ===
      JSON.stringify({
        './preview-engine': {
          types: './dist/preview-engine.d.ts',
          default: './dist/preview-engine.js',
        },
      }),
    'installed package export map widened or drifted.',
  );
  assert(
    installedPackage.dependencies?.['@mediapipe/tasks-vision'] === EXPECTED_MEDIAPIPE_VERSION,
    'MediaPipe dependency pin drift.',
  );

  const installedMediaPipe = JSON.parse(
    readFileSync(
      join(
        consumerDir,
        'node_modules',
        '@mediapipe',
        'tasks-vision',
        'package.json',
      ),
      'utf8',
    ),
  );
  assert(
    installedMediaPipe.version === EXPECTED_MEDIAPIPE_VERSION,
    'isolated consumer resolved unexpected MediaPipe version.',
  );

  const consumerCheck = `
    const preview = await import('@myeongha/face-reading/preview-engine');
    if (preview.FE019_CONTRACT_VERSION !== ${JSON.stringify(EXPECTED_FE019)}) {
      throw new Error('FE019 contract missing from isolated consumer.');
    }
    if (typeof preview.openDirectBlobProductPreviewSessionFE019 !== 'function') {
      throw new Error('FE019 open function missing from isolated consumer.');
    }

    async function expectBlocked(specifier) {
      try {
        await import(specifier);
      } catch (error) {
        if (error && typeof error === 'object' && error.code === 'ERR_PACKAGE_PATH_NOT_EXPORTED') {
          return;
        }
        throw error;
      }
      throw new Error('Expected blocked package path: ' + specifier);
    }

    await expectBlocked('@myeongha/face-reading');
    await expectBlocked('@myeongha/face-reading/direct-blob-product-preview-session-fe019');
    await expectBlocked('@myeongha/face-reading/browser-blob-preview-engine-fe010');
  `;
  run('node', ['--input-type=module', '-e', consumerCheck], { cwd: consumerDir });

  process.stdout.write(
    `${JSON.stringify({
      status: 'FE020_ISOLATED_PREVIEW_PACKAGE_ARTIFACT_PASS',
      package: EXPECTED_PACKAGE,
      version: EXPECTED_VERSION,
      tarball: artifact.filename,
      isolatedConsumerImport: true,
      fe019ContractVersion: EXPECTED_FE019,
      rootPathBlocked: true,
      internalPathsBlocked: true,
      mediaPipeVersion: installedMediaPipe.version,
      registryPublishPerformed: false,
    })}\n`,
  );
} finally {
  rmSync(tempRoot, { recursive: true, force: true });
}
