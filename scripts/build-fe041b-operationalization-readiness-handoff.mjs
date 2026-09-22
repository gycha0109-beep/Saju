import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import process from 'node:process';

const PACKAGE_NAME = '@myeongha/face-reading';
const PACKAGE_VERSION = '0.0.0';
const EXPECTED_EXPORTS = Object.freeze([
  './preview-engine',
  './product-neutral-observation-contract-fe035b',
  './square-broad-operationalization-readiness-fe041b',
]);
const FE023 =
  'FE023-DIGEST-BOUND-DIRECT-BLOB-PRODUCT-PREVIEW-SESSION-v1';
const FE035B =
  'FE035B-PRODUCT-NEUTRAL-OBSERVATION-CONTRACT-v1';
const FE041B =
  'FE041B-SQUARE-BROAD-OPERATIONALIZATION-READINESS-v1';
const AUTHORITY_COMMIT =
  '50fd5b511326033861b3cab48028b989c4499b3c';
const FR140_BLOB =
  'c6ebcb9213db11dfdd2abda5dd723911355f3859';
const FR141_BLOB =
  'a2a621bb2088f9002480caf6a89bbc0a40e50538';
const APPROVAL_BLOB =
  'ad9ea864092dd5f70a691c842ba8ef4ca618f971';
const outputDir = resolve(
  process.argv[2] ??
    '.artifacts/fe041b-operationalization-readiness-handoff',
);

rmSync(outputDir, { recursive: true, force: true });
mkdirSync(outputDir, { recursive: true });

const packed = JSON.parse(
  execFileSync(
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
  ).trim(),
);
if (!Array.isArray(packed) || packed.length !== 1) {
  throw new Error('FE041B expected exactly one npm-pack artifact.');
}
const artifact = packed[0];
if (
  artifact.name !== PACKAGE_NAME ||
  artifact.version !== PACKAGE_VERSION ||
  typeof artifact.filename !== 'string'
) {
  throw new Error('FE041B npm-pack metadata drift.');
}
const tarballPath = resolve(outputDir, basename(artifact.filename));
const sha256 = createHash('sha256')
  .update(readFileSync(tarballPath))
  .digest('hex');

const manifest = Object.freeze({
  schemaVersion:
    'fe041b-square-broad-operationalization-readiness-handoff-manifest-v1',
  package: Object.freeze({
    name: PACKAGE_NAME,
    version: PACKAGE_VERSION,
    publicExports: EXPECTED_EXPORTS,
    private: true,
  }),
  artifact: Object.freeze({
    filename: basename(artifact.filename),
    sha256,
  }),
  contracts: Object.freeze({ fe023: FE023, fe035b: FE035B, fe041b: FE041B }),
  operationalizationReadiness: Object.freeze({
    authorityRepository: 'gycha0109-beep/Saju',
    authoritySnapshotCommit: AUTHORITY_COMMIT,
    fr140SourceBlob: FR140_BLOB,
    fr141SourceBlob: FR141_BLOB,
    methodologyApprovalBlob: APPROVAL_BLOB,
    criterionRef: 'criterion.intake.square_broad',
    sourceConcept: '方大',
    sourcePassageRef: 'passage.shenxiang.five_officers.intake.nlc_1925',
    sourcePassageVerificationStatus: 'scan_checked',
    reviewedMethodologyRef:
      'method.shenxiang.five_officers.intake_criteria@0.3.0',
    methodologyReviewStatus: 'reviewed',
    canonicalMetricBindingAuthorized: false,
    constructValidityEstablished: false,
    calibrationAuthorityIssued: false,
    numericThresholdAuthorityIssued: false,
    classificationBandsIssued: false,
    criterionStateIssued: false,
    structuredClaimIssued: false,
    narrativeAuthorityIssued: false,
    productionSemanticExecutionAuthorized: false,
  }),
  distribution: Object.freeze({
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
  JSON.stringify({
    status: 'FE041B_OPERATIONALIZATION_READINESS_HANDOFF_BUILT',
    artifact: manifest.artifact.filename,
    sha256,
    authoritySnapshotCommit: AUTHORITY_COMMIT,
  }) + '\n',
);
