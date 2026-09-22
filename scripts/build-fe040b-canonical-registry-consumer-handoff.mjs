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
const PREVIEW_EXPORT = './preview-engine';
const REGISTRY_EXPORT = './product-neutral-observation-contract-fe035b';
const FE023_CONTRACT_VERSION =
  'FE023-DIGEST-BOUND-DIRECT-BLOB-PRODUCT-PREVIEW-SESSION-v1';
const FE035B_CONTRACT_VERSION =
  'FE035B-PRODUCT-NEUTRAL-OBSERVATION-CONTRACT-v1';
const FE035B_SOURCE_COMMIT =
  '0f7de13b18a9dd9966074f371cbfd9554490f0ef';
const FE035B_SOURCE_BLOB =
  'c9ed7dfb347144759694056e89d571c433d4dfc8';
const MEDIAPIPE_VERSION = '0.10.35';
const MANIFEST_SCHEMA =
  'fe040b-canonical-registry-consumer-handoff-manifest-v1';

const outputDir = resolve(
  process.argv[2] ?? '.artifacts/fe040b-canonical-registry-consumer-handoff',
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
  throw new Error('FE040B expected npm pack to produce exactly one artifact.');
}

const artifact = packed[0];
if (
  artifact.name !== PACKAGE_NAME ||
  artifact.version !== PACKAGE_VERSION ||
  typeof artifact.filename !== 'string' ||
  !artifact.filename.endsWith('.tgz')
) {
  throw new Error(
    'FE040B npm pack metadata drifted from the expected private package.',
  );
}

const tarballPath = resolve(outputDir, basename(artifact.filename));
const tarballBytes = readFileSync(tarballPath);
const sha256 = createHash('sha256').update(tarballBytes).digest('hex');

const manifest = Object.freeze({
  schemaVersion: MANIFEST_SCHEMA,
  package: Object.freeze({
    name: PACKAGE_NAME,
    version: PACKAGE_VERSION,
    publicExports: Object.freeze([
      PREVIEW_EXPORT,
      REGISTRY_EXPORT,
    ]),
    private: true,
  }),
  artifact: Object.freeze({
    filename: basename(artifact.filename),
    sha256,
  }),
  contracts: Object.freeze({
    fe023: FE023_CONTRACT_VERSION,
    fe035b: FE035B_CONTRACT_VERSION,
  }),
  canonicalRegistry: Object.freeze({
    sourceRepository: 'gycha0109-beep/Saju',
    sourceCommit: FE035B_SOURCE_COMMIT,
    sourcePath:
      'packages/face-reading/src/product-neutral-observation-contract-fe035b.ts',
    sourceBlobSha: FE035B_SOURCE_BLOB,
    regionCount: 4,
    metricCount: 13,
    requiredMetricCount: 8,
    conditionalMetricCount: 5,
    semanticAuthorityIssued: false,
  }),
  runtimeDependency: Object.freeze({
    package: '@mediapipe/tasks-vision',
    version: MEDIAPIPE_VERSION,
  }),
  distribution: Object.freeze({
    registryPublished: true,
    handoffOnly: true,
    productionInterpretationAuthorityIssued: false,
  }),
});

writeFileSync(
  resolve(outputDir, 'manifest.json'),
  JSON.stringify(manifest, null, 2) + '\n',
  'utf8',
);

process.stdout.write(
  `${JSON.stringify({
    status: 'FE040B_CANONICAL_REGISTRY_CONSUMER_HANDOFF_BUILT',
    outputDir,
    artifact: manifest.artifact.filename,
    sha256,
    fe035b: manifest.contracts.fe035b,
    sourceCommit: manifest.canonicalRegistry.sourceCommit,
    sourceBlobSha: manifest.canonicalRegistry.sourceBlobSha,
    registryPublished: true,
  })}\n`,
);
