import { createHash } from 'node:crypto';
import {
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { basename, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import process from 'node:process';

const PACKAGE_NAME = '@myeongha/face-reading';
const PACKAGE_VERSION = '0.0.0';
const PUBLIC_EXPORT_PATH = './preview-engine';
const FE023_CONTRACT_VERSION =
  'FE023-DIGEST-BOUND-DIRECT-BLOB-PRODUCT-PREVIEW-SESSION-v1';
const FE023_CONFIG_SCHEMA =
  'fe023-digest-bound-product-preview-config-v1';
const FE022_ASSET_CONFIG_SCHEMA =
  'fe022-digest-bound-mediapipe-model-config-v1';
const MEDIAPIPE_VERSION = '0.10.35';
const MANIFEST_SCHEMA =
  'fe024-digest-bound-preview-consumer-handoff-manifest-v1';

const outputDir = resolve(
  process.argv[2] ?? '.artifacts/fe024-digest-bound-preview-consumer-handoff',
);

rmSync(outputDir, { recursive: true, force: true });
mkdirSync(outputDir, { recursive: true });

const packedOutput = execFileSync(
  'npm',
  [
    'pack',
    '--workspace',
    PACKAGE_NAME,
    '--pack-destination',
    outputDir,
    '--json',
  ],
  { encoding: 'utf8' },
).trim();

const packed = JSON.parse(packedOutput);
if (!Array.isArray(packed) || packed.length !== 1) {
  throw new Error('FE024 expected npm pack to produce exactly one artifact.');
}

const artifact = packed[0];
if (
  artifact.name !== PACKAGE_NAME ||
  artifact.version !== PACKAGE_VERSION ||
  typeof artifact.filename !== 'string' ||
  !artifact.filename.endsWith('.tgz')
) {
  throw new Error('FE024 npm pack metadata drifted from the expected private package.');
}

const tarballPath = resolve(outputDir, basename(artifact.filename));
const tarballBytes = readFileSync(tarballPath);
const sha256 = createHash('sha256').update(tarballBytes).digest('hex');

const manifest = Object.freeze({
  schemaVersion: MANIFEST_SCHEMA,
  package: Object.freeze({
    name: PACKAGE_NAME,
    version: PACKAGE_VERSION,
    publicExportPath: PUBLIC_EXPORT_PATH,
    private: true,
  }),
  artifact: Object.freeze({
    filename: basename(artifact.filename),
    sha256,
  }),
  contract: Object.freeze({
    fe023: FE023_CONTRACT_VERSION,
    openFunction: 'openDigestBoundProductPreviewSessionFE023',
  }),
  runtimeConfiguration: Object.freeze({
    schemaVersion: FE023_CONFIG_SCHEMA,
    assetSchemaVersion: FE022_ASSET_CONFIG_SCHEMA,
    requiredAssetFields: Object.freeze([
      'wasmRoot',
      'modelAssetPath',
      'modelAssetSha256',
    ]),
    modelDigestAlgorithm: 'SHA-256',
    modelDigestRequired: true,
    wasmDigestVerifiedByEngine: false,
    assetValuesBundled: false,
  }),
  runtimeDependency: Object.freeze({
    package: '@mediapipe/tasks-vision',
    version: MEDIAPIPE_VERSION,
  }),
  source: Object.freeze({
    commit:
      process.env.FE024_SOURCE_COMMIT?.trim() ||
      process.env.GITHUB_SHA?.trim() ||
      null,
  }),
  distribution: Object.freeze({
    registryPublished: false,
    handoffOnly: true,
  }),
});

writeFileSync(
  resolve(outputDir, 'manifest.json'),
  JSON.stringify(manifest, null, 2) + '\n',
  'utf8',
);

process.stdout.write(
  `${JSON.stringify({
    status: 'FE024_DIGEST_BOUND_PREVIEW_CONSUMER_HANDOFF_BUILT',
    outputDir,
    artifact: manifest.artifact.filename,
    sha256,
    contract: manifest.contract.fe023,
    sourceCommit: manifest.source.commit,
    registryPublished: false,
  })}\n`,
);