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
  'fe040b-canonical-registry-consumer-handoff-manifest-v1';
const EXPECTED_PACKAGE = '@myeongha/face-reading';
const EXPECTED_VERSION = '0.0.0';
const EXPECTED_EXPORTS = [
  './preview-engine',
  './product-neutral-observation-contract-fe035b',
];
const EXPECTED_FE023 =
  'FE023-DIGEST-BOUND-DIRECT-BLOB-PRODUCT-PREVIEW-SESSION-v1';
const EXPECTED_FE035B =
  'FE035B-PRODUCT-NEUTRAL-OBSERVATION-CONTRACT-v1';
const EXPECTED_SOURCE_COMMIT =
  '0f7de13b18a9dd9966074f371cbfd9554490f0ef';
const EXPECTED_SOURCE_BLOB =
  'c9ed7dfb347144759694056e89d571c433d4dfc8';
const EXPECTED_MEDIAPIPE = '0.10.35';

function assert(condition, message) {
  if (!condition) {
    throw new Error(`FE040B handoff verification failed: ${message}`);
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
  process.argv[2] ?? '.artifacts/fe040b-canonical-registry-consumer-handoff',
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
assert(
  JSON.stringify(manifest.package?.publicExports) ===
    JSON.stringify(EXPECTED_EXPORTS),
  'public export list drift.',
);
assert(manifest.package?.private === true, 'package must remain private.');
assert(
  manifest.artifact?.filename === basename(tarball),
  'manifest filename mismatch.',
);
assert(manifest.artifact?.sha256 === sha256, 'tarball SHA-256 mismatch.');
assert(manifest.contracts?.fe023 === EXPECTED_FE023, 'FE023 contract drift.');
assert(manifest.contracts?.fe035b === EXPECTED_FE035B, 'FE035B contract drift.');
assert(
  manifest.canonicalRegistry?.sourceRepository === 'gycha0109-beep/Saju' &&
    manifest.canonicalRegistry?.sourceCommit === EXPECTED_SOURCE_COMMIT &&
    manifest.canonicalRegistry?.sourceBlobSha === EXPECTED_SOURCE_BLOB,
  'canonical registry source identity drift.',
);
assert(
  manifest.canonicalRegistry?.regionCount === 4 &&
    manifest.canonicalRegistry?.metricCount === 13 &&
    manifest.canonicalRegistry?.requiredMetricCount === 8 &&
    manifest.canonicalRegistry?.conditionalMetricCount === 5 &&
    manifest.canonicalRegistry?.semanticAuthorityIssued === false,
  'canonical registry cardinality or authority drift.',
);
assert(
  manifest.runtimeDependency?.package === '@mediapipe/tasks-vision' &&
    manifest.runtimeDependency?.version === EXPECTED_MEDIAPIPE,
  'MediaPipe dependency pin drift.',
);
assert(
  manifest.distribution?.registryPublished === true &&
    manifest.distribution?.handoffOnly === true &&
    manifest.distribution?.productionInterpretationAuthorityIssued === false,
  'distribution authority boundary drift.',
);

const tempRoot = mkdtempSync(join(tmpdir(), 'myeongha-fe040b-'));
try {
  writeFileSync(
    join(tempRoot, 'package.json'),
    JSON.stringify(
      {
        name: 'fe040b-handoff-consumer',
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
        './product-neutral-observation-contract-fe035b': {
          types: './dist/product-neutral-observation-contract-fe035b.d.ts',
          default: './dist/product-neutral-observation-contract-fe035b.js',
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
    if (preview.FE023_CONTRACT_VERSION !== ${JSON.stringify(EXPECTED_FE023)}) {
      throw new Error('FE023 contract missing from FE040B handoff.');
    }
    if (typeof preview.openDigestBoundProductPreviewSessionFE023 !== 'function') {
      throw new Error('FE023 open function missing from FE040B handoff.');
    }

    const registry = await import(
      '@myeongha/face-reading/product-neutral-observation-contract-fe035b'
    );
    if (
      registry.FE035B_PRODUCT_NEUTRAL_OBSERVATION_CONTRACT_VERSION !==
      ${JSON.stringify(EXPECTED_FE035B)}
    ) {
      throw new Error('FE035B contract version missing from FE040B handoff.');
    }
    if (
      typeof registry.assertProductNeutralObservationContractFE035B !==
      'function'
    ) {
      throw new Error('FE035B assertion function missing from FE040B handoff.');
    }

    const contract = registry.FE035B_PRODUCT_NEUTRAL_OBSERVATION_CONTRACT;
    registry.assertProductNeutralObservationContractFE035B(contract);
    if (contract.regions.length !== 4 || contract.metrics.length !== 13) {
      throw new Error('FE035B canonical registry cardinality drift.');
    }
    const required = contract.metrics.filter(
      (entry) => entry.presence === 'required'
    ).length;
    const conditional = contract.metrics.filter(
      (entry) => entry.presence === 'conditional'
    ).length;
    if (required !== 8 || conditional !== 5) {
      throw new Error('FE035B required/conditional cardinality drift.');
    }
    if (
      contract.metrics.some((entry) =>
        Object.values(entry.semanticBoundary).some((value) => value !== false)
      )
    ) {
      throw new Error('FE035B metric semantic authority widened.');
    }
    if (
      contract.authorityBoundary.freezesExistingNeutralObservationSurface !==
        true ||
      Object.entries(contract.authorityBoundary)
        .filter(([key]) => key !== 'freezesExistingNeutralObservationSurface')
        .some(([, value]) => value !== false)
    ) {
      throw new Error('FE035B contract authority widened.');
    }

    async function blocked(specifier) {
      try {
        await import(specifier);
      } catch (error) {
        if (
          error &&
          typeof error === 'object' &&
          error.code === 'ERR_PACKAGE_PATH_NOT_EXPORTED'
        ) return;
        throw error;
      }
      throw new Error('Expected blocked path: ' + specifier);
    }

    await blocked('@myeongha/face-reading');
    await blocked('@myeongha/face-reading/validation');
    await blocked(
      '@myeongha/face-reading/product-neutral-observation-contract-fe035b.js'
    );
  `;
  run('node', ['--input-type=module', '-e', consumerCheck], tempRoot);
} finally {
  rmSync(tempRoot, { recursive: true, force: true });
}

process.stdout.write(
  `${JSON.stringify({
    status: 'FE040B_CANONICAL_REGISTRY_CONSUMER_HANDOFF_PASS',
    artifact: tarball,
    sha256,
    fe023ImportVerified: true,
    fe035bImportVerified: true,
    canonicalCardinalityVerified: true,
    semanticAuthorityClosed: true,
    internalPathsBlocked: true,
    registryPublished: true,
  })}\n`,
);
