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

const EXPECTED_EXPORTS = [
  './preview-engine',
  './product-neutral-observation-contract-fe035b',
  './square-broad-operationalization-readiness-fe041b',
];
const EXPECTED_COMMIT =
  '50fd5b511326033861b3cab48028b989c4499b3c';

function assert(condition, message) {
  if (!condition) throw new Error('FE041B verification failed: ' + message);
}
function run(command, args, cwd) {
  return execFileSync(command, args, {
    cwd,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    env: process.env,
  }).trim();
}

const dir = resolve(
  process.argv[2] ??
    '.artifacts/fe041b-operationalization-readiness-handoff',
);
const files = readdirSync(dir).sort();
assert(files.length === 2, 'handoff directory must contain two files.');
assert(files.includes('manifest.json'), 'manifest missing.');
const tarballs = files.filter((file) => file.endsWith('.tgz'));
assert(tarballs.length === 1, 'exactly one tarball required.');

const manifest = JSON.parse(readFileSync(resolve(dir, 'manifest.json'), 'utf8'));
const tarball = tarballs[0];
const tarballPath = resolve(dir, tarball);
const digest = createHash('sha256')
  .update(readFileSync(tarballPath))
  .digest('hex');

assert(
  manifest.schemaVersion ===
    'fe041b-square-broad-operationalization-readiness-handoff-manifest-v1',
  'manifest schema drift.',
);
assert(manifest.package?.name === '@myeongha/face-reading', 'package drift.');
assert(
  JSON.stringify(manifest.package?.publicExports) ===
    JSON.stringify(EXPECTED_EXPORTS),
  'export surface drift.',
);
assert(manifest.artifact?.filename === basename(tarball), 'filename drift.');
assert(manifest.artifact?.sha256 === digest, 'artifact digest drift.');
assert(
  manifest.operationalizationReadiness?.authoritySnapshotCommit ===
    EXPECTED_COMMIT,
  'authority snapshot commit drift.',
);
assert(
  manifest.operationalizationReadiness?.sourcePassageVerificationStatus ===
    'scan_checked' &&
    manifest.operationalizationReadiness?.methodologyReviewStatus ===
      'reviewed',
  'positive source/methodology authority drift.',
);
for (const key of [
  'canonicalMetricBindingAuthorized',
  'constructValidityEstablished',
  'calibrationAuthorityIssued',
  'numericThresholdAuthorityIssued',
  'classificationBandsIssued',
  'criterionStateIssued',
  'structuredClaimIssued',
  'narrativeAuthorityIssued',
  'productionSemanticExecutionAuthorized',
]) {
  assert(
    manifest.operationalizationReadiness?.[key] === false,
    key + ' must remain false.',
  );
}
assert(
  manifest.distribution?.handoffOnly === true &&
    manifest.distribution?.productionInterpretationAuthorityIssued === false,
  'distribution authority widened.',
);

const temp = mkdtempSync(join(tmpdir(), 'myeongha-fe041b-'));
try {
  writeFileSync(
    join(temp, 'package.json'),
    JSON.stringify({
      name: 'fe041b-consumer',
      version: '0.0.0',
      private: true,
      type: 'module',
    }),
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
    temp,
  );

  const installed = JSON.parse(
    readFileSync(
      join(temp, 'node_modules', '@myeongha', 'face-reading', 'package.json'),
      'utf8',
    ),
  );
  assert(
    JSON.stringify(Object.keys(installed.exports)) ===
      JSON.stringify(EXPECTED_EXPORTS),
    'installed export map drift.',
  );

  const check = `
    const readiness = await import(
      '@myeongha/face-reading/square-broad-operationalization-readiness-fe041b'
    );
    if (
      readiness.FE041B_SQUARE_BROAD_OPERATIONALIZATION_READINESS_VERSION !==
      'FE041B-SQUARE-BROAD-OPERATIONALIZATION-READINESS-v1'
    ) throw new Error('FE041B contract missing.');
    const issued = readiness.issueSquareBroadOperationalizationReadinessFE041B();
    readiness.assertIssuedSquareBroadOperationalizationReadinessFE041B(issued);
    if (
      issued.target.methodologyReviewStatus !== 'reviewed' ||
      issued.operationalization.canonicalInputMetricRefs.length !== 0 ||
      issued.operationalization.classificationBands !== null ||
      issued.operationalization.numericThresholds !== null ||
      issued.operationalization.calibrationRef !== null ||
      issued.operationalization.ruleRef !== null ||
      issued.authorityBoundary.productionSemanticExecutionAuthorized !== false
    ) throw new Error('FE041B readiness boundary drift.');

    const preview = await import('@myeongha/face-reading/preview-engine');
    if (typeof preview.openDigestBoundProductPreviewSessionFE023 !== 'function') {
      throw new Error('FE023 export regressed.');
    }
    const registry = await import(
      '@myeongha/face-reading/product-neutral-observation-contract-fe035b'
    );
    registry.assertProductNeutralObservationContractFE035B(
      registry.FE035B_PRODUCT_NEUTRAL_OBSERVATION_CONTRACT
    );

    async function blocked(specifier) {
      try { await import(specifier); }
      catch (error) {
        if (error && typeof error === 'object' &&
            error.code === 'ERR_PACKAGE_PATH_NOT_EXPORTED') return;
        throw error;
      }
      throw new Error('Expected blocked path: ' + specifier);
    }
    await blocked('@myeongha/face-reading');
    await blocked('@myeongha/face-reading/validation');
    await blocked(
      '@myeongha/face-reading/five-officers-square-broad-fang-approved-governance-materialization-fr140'
    );
  `;
  run('node', ['--input-type=module', '-e', check], temp);
} finally {
  rmSync(temp, { recursive: true, force: true });
}

process.stdout.write(
  JSON.stringify({
    status: 'FE041B_OPERATIONALIZATION_READINESS_HANDOFF_PASS',
    artifact: tarball,
    sha256: digest,
    reviewedMethodologyVerified: true,
    operationalizationAuthorityClosed: true,
    existingExportsPreserved: true,
    internalAuthorityModulesBlocked: true,
  }) + '\n',
);
